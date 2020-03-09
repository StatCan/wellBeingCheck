import {Configuration, FetchAPI, Links, ConfigApi} from "./openapi";
import base64 from 'react-native-base64';

/**
 * Claims stored in a JWT token that matter to the mobile app
 */
export type TokenClaims = {
    deviceId: string,
    sac: string,
    secured: string
}

/**
 * Enumeration for possible failures from the service. This is to provide a way to test which failure occurred and act
 * accordingly.
 */
export enum FailureType {
    /**
     * Communication level failure. It happened when querying the remote resource and failed to get any response from
     * the server.
     */
    FetchFailure,

    /**
     * Application level failure. It happened while decoding the JWT token.
     */
    TokenDecodingFailure,
}

export type Failure = {
    type: FailureType,
    context: string,
    exception: Error
}


/**
 * Class that handles the interaction with the WellBeingCheck WebApi.
 * This is a stateful service as it keeps track of the JWT token being used to allow conversational flow with the
 * server.
 * The operations listed here are rather logical/business operations than api operations in the sense that one operation
 * here may involve multiple REST api calls.
 */
export class BackEndService {

    /**
     * JWT token received after successful authentication
     */
    private accessToken: string;

    /**
     * Construct a new BackEndService
     * @param baseUrl  baseurl containing the server and base path to the web api.
     * eg. http://wellbeingcheck.canadacentral.cloudapp.azure.com/wellbeing-bienetre/api
     * @param deviceId unique Id assigned to the device to identify a particular respondent
     * @param fetchAPI due to the fetch function availability on different environments (react-native, browswer, test)
     * and the fact that the openapi auto-generated client depends on it, the fetchApi has to be provided.
     * @param hashedPassword the respondent password hashed with the server salt
     */
    constructor(
        protected baseUrl: string,
        protected deviceId: string,
        protected hashedPassword: string,
        private fetchAPI: FetchAPI) {}

    /**
     * Get where the various links point to from the server so that they don't have to be hardcoded in the application.
     * Note that this method doesn't rely on any access token since the corresponding api on the server does not
     * require authentication.
     */
    async getLinks(): Promise<Links | Failure> {
        let configApi = new ConfigApi(
            new Configuration(
                {
                    basePath: this.baseUrl,
                    fetchApi: this.fetchAPI
                }
            )
        );

        try {
            let response = await configApi.getLinksRaw();
            if (response.raw.ok) {
                return response.value();
            }
        } catch (e) {
            if (e instanceof Error) {
                return {type: FailureType.FetchFailure, context: 'configApi.getLinks', exception: e};
            }
        }
    }

    /**
     * Get any server controlled flags that the application can use so that some behavior can be controlled from the
     * server.
     * Note that this method doesn't rely on any access token since the corresponding api on the server does not
     * require authentication.
     */
    async getFlags(): Promise<{[key: string]: string} | Failure> {
        let configApi = new ConfigApi(
            new Configuration(
                {
                    basePath: this.baseUrl,
                    fetchApi: this.fetchAPI
                }
            )
        );

        try {
            let response = await configApi.getFlagsRaw();
            if (response.raw.ok) {
                return response.value();
            }
        } catch (e) {
            if (e instanceof Error) {
                return {type: FailureType.FetchFailure, context: 'configApi.getFlags', exception: e};
            }
        }
    }

    async setPassword(): Promise<string> {
        let configApi = new ConfigApi(
            new Configuration(
                {
                    basePath: this.baseUrl,
                    fetchApi: this.fetchAPI
                }
            )
        );
        return null;
    }

    /**
     * Decode a JWT from the server into understandable claims.
     * There is no validation whatsoever except for json parsing of the payload.
     * @param token JWT token from the server
     */
    decodeJwtToken(token: string): TokenClaims | Failure {
        if (token === null || token === '') {
            return {type: FailureType.TokenDecodingFailure, context: 'bad argument', exception: new Error('token is null or empty string')};
        }

        // JWT is made up of 3 parts separated by dot
        const parts = token.split('.');
        if (parts.length != 3) {
            return  {type: FailureType.TokenDecodingFailure, context: 'bad argument', exception: new Error('token format is invalid')};
        }

        let decoded = base64.decode(parts[1]);

        // For some reason that needs investigation, there is a strange character at the end ot the decoded string
        try {
            return JSON.parse(decoded.substr(0, decoded.length - 1));
        } catch (e) {
            return {type: FailureType.TokenDecodingFailure, context: 'base64 decoding', exception: new Error('JSON parsing error')};
        }
    }

    /**
     * Type guard to check if a service operation result is a failure.
     * @param result can be a proper result or a failure
     */
    isResultFailure<R>(result: R | Failure): result is Failure {
        return (result as Failure).exception !== undefined;
    }
}