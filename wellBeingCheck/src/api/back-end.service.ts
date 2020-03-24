import {
    Configuration,
    FetchAPI,
    Links,
    ConfigApi,
    SecurityApi,
    ConfigurationParameters
} from "./openapi";
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
 * The enumeration is listed in alphabetical order.
 */
export enum FailureType {

    /**
     * Application level failire. The respondent provided credentials do not match what is on the server. This is different
     * from credentials stored on the device and automatically sent to the server without the user providing it.
     */
    CredentialsFailure,

    /**
     * Communication level failure. It happened when querying the remote resource and failed to get any response from
     * the server.
     */
    FetchFailure,

    /**
     * Application level failure. The input parameters sent to the API endpoint are invalid
     */
    InputParametersFailure,

    /**
     * Application level failure. Indicates a security flow violation. This should prompt a reset of the whole application
     * because security may have been compromised. We should not allow the respondent to enter more data.
     */
    SecurityProtocolFailure,

    /**
     * Communication level failure. Internal server error.
     */
    ServerFailure,

    /**
     * Application level failure. It happened while decoding the JWT token.
     */
    TokenDecodingFailure,

    /**
     * Application level failure. We do our best to identify what can go wrong but sometimes we don't know.
     * This type of failure is the last resort that we can bubble up to the caller and plan for a UI logic to handle it.
     */
    UnknownFailure
}

export type Failure = {
    type: FailureType,
    context: string,
    exception?: Error
}

/**
 * For a reason that will be looked at at later time, the value of a json string retrieve from the server still
 * contains the double quotes from the server. It is not clear which fault is it? server or client but for now
 * the client will remove the two double quotes at the beginning and the end.
 *
 * @param token as obtained from the authentication webapi
 */
export function removeWrappingQuotes(token: string): string {
    if (token) {
        const regex = /\"(.*)\"/gm;
        let match = regex.exec(token);
        if (match !== null) {
            return match[1];
        }
    }

    return token;
}
/**
 * Class that handles the interaction with the WellBeingCheck WebApi.
 * This is a stateful service as it keeps track of the JWT token being used to allow conversational flow with the
 * server.
 * The operations listed here are rather logical/business operations than api operations in the sense that one operation
 * here may involve multiple REST api calls.
 */
export class BackEndService {

    // Defining HTTP status code constants
    private static readonly HTTP_BAD_REQUEST = (code) => code == 400;
    private static readonly HTTP_UNAUTHORIZED = (code) => code == 401;
    private static readonly HTTP_FORBIDDEN = (code) => code == 403;
    private static readonly HTTP_INTERNAL_SERVER_ERROR = (code) => code >=500 && code < 600;

    /**
     * Construct a new BackEndService
     * @param baseUrl  baseurl containing the server and base path to the web api.
     * eg. http://wellbeingcheck.canadacentral.cloudapp.azure.com/wellbeing-bienetre/api
     * @param language language of the respondent: en-CA or fr-CA
     * @param deviceId unique Id assigned to the device to identify a particular respondent
     * @param sac Secure Access Code retrieved from the confirmation page after questionnaire A&B
     * @param fetchAPI due to the fetch function availability on different environments (react-native, browswer, test)
     * and the fact that the openapi auto-generated client depends on it, the fetchApi has to be provided.
     * @param hashedPassword the respondent password hashed with the server salt
     */
    constructor(
        protected baseUrl: string,
        protected language: string,
        protected deviceId: string,
        protected sac: string,
        protected hashedPassword: string,
        private fetchAPI: FetchAPI) {}

    /**
     * Get where the various links point to from the server so that they don't have to be hardcoded in the application.
     * Note that this method doesn't rely on any access token since the corresponding api on the server does not
     * require authentication.
     */
    async getLinks(): Promise<Links | Failure> {
        let configApi = new ConfigApi(new Configuration(this.getCommonConfiguration()));

        try {
            return await configApi.getLinks();
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
        let configApi = new ConfigApi(new Configuration(this.getCommonConfiguration()));

        try {
            return await configApi.getFlags();
        } catch (e) {
            if (e instanceof Error) {
                return {type: FailureType.FetchFailure, context: 'configApi.getFlags', exception: e};
            }
        }
    }

    /**
     * Sets the password that protected the SAC right after filling Questionnaire A
     * @param salt Salt used to hash the password
     * @param hashedPassword the password used by the respondent in the hashed form
     * @param securityQuestionId the id of the security question the respondent chose to answer
     * @param securityAnswerSalt the salt used to hash the security question answer
     * @param hashedSecurityAnswer hashed form of the security question answer
     * @return {Promise<null>} Nothing unless there is a failure
     */
    async setPassword(
        salt: string,
        hashedPassword: string,
        securityQuestionId: number,
        securityAnswerSalt: string,
        hashedSecurityAnswer: string): Promise<void | Failure> {

        // We create a task to be executed once authentication is done
        let setPasswordTask = async function (jwtToken:string): Promise<void | Failure> {
            let configurationParameters = this.getCommonConfiguration();
            configurationParameters.accessToken = jwtToken;
            let securityApi = new SecurityApi(new Configuration(configurationParameters));

            try {
                return await securityApi.setPassword({
                    setPasswordInput: {
                        salt: salt,
                        passwordHash: hashedPassword,
                        securityQuestionId: securityQuestionId,
                        securityAnswerSalt: securityAnswerSalt,
                        securityAnswerHash: hashedSecurityAnswer
                    }
                });
            } catch(e) {
                if (e instanceof Error) {
                    return {type: FailureType.FetchFailure, context: 'securityApi.setPassword', exception: e};
                }
                if (this.isResponse(e)) {
                    if (BackEndService.HTTP_INTERNAL_SERVER_ERROR(e.status)) {
                        return {
                            type: FailureType.ServerFailure,
                            context: 'securityApi.setPassword',
                            exception: new Error(`SetPassword internal server error. HTTP status=${e.status} text=${e.statusText}`)
                        }
                    }

                    // The normal flow should allow for setting the password once. Setting the password a second time
                    // is not a normal flow so when this condition arises then the security may have been compromised.
                    // Since the respondent is locally authenticated before setting the password there should be no
                    // application level error from the server
                    return {
                        type: FailureType.SecurityProtocolFailure,
                        context: 'securityApi.setPassword',
                        exception: new Error(`Server did not set password due to input parameters. HTTP status=${e.status} text=${e.statusText}`)
                    }
                }

                return this.unknownFailure('securApi.setPassword', e);
            }
        };

        // We have to bind this instance as the this of the anonymous function as we reference this to access method of the class
        return await this.authenticateThen(setPasswordTask.bind(this));
    }

    /**
     * Reset the password and security on the server if the respondent forgot the password.
     * The server uses the hashed security question answer to allow the re-setting of the credentials.
     *
     * This is not an authenticated operation so no JWT token
     *
     * @param newSalt salt used to hash the new password
     * @param newHashedPassword hashed form of the new password
     * @param hashedSecurityAnswer hashed form of the current security question answer
     * @param newSecurityQuestionId the ide of the new security question chosen by the respondent
     * @param newSecurityAnswerSalt the salt used to hash the new security question answer
     * @param newHashedSecurityAnswer the hashed form of the new security question answer
     */
    async resetPassword(
        newSalt: string,
        newHashedPassword: string,
        hashedSecurityAnswer: string,
        newSecurityQuestionId: number,
        newSecurityAnswerSalt: string,
        newHashedSecurityAnswer: string):  Promise<void | Failure> {

        let securityApi = new SecurityApi(new Configuration(this.getCommonConfiguration()));
        try {
            return await securityApi.resetPassword({
                resetPasswordInput: {
                    deviceId: this.deviceId,
                    sac: this.sac,
                    newSalt: newSalt,
                    newPasswordHash: newHashedPassword,
                    securityAnswerHash: hashedSecurityAnswer,
                    newSecurityQuestionId: newSecurityQuestionId,
                    newSecurityAnswerSalt: newSecurityAnswerSalt,
                    newSecurityAnswerHash: newHashedSecurityAnswer
                }
            });
        } catch (e) {
            if (e instanceof Error) {
                return {type: FailureType.FetchFailure, context: 'securityApi.reSetPassword', exception: e};
            }
            if (this.isResponse(e)) {
                if (BackEndService.HTTP_INTERNAL_SERVER_ERROR(e.status)) {
                    return {
                        type: FailureType.ServerFailure,
                        context: 'securityApi.reSetPassword',
                        exception: new Error(`reSetPassword internal server error. HTTP status=${e.status} text=${e.statusText}`)
                    }
                }

                // Anything that is not internal server error is declined reset
                return {
                    type: FailureType.CredentialsFailure,
                    context: 'securityApi.reSetPassword',
                    exception: new Error(`Server did not reset password due to input parameters. HTTP status=${e.status} text=${e.statusText}`)
                }
            }

            return this.unknownFailure('secureApi.restPassword', e);
        }
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
        return result !== undefined && (result as Failure).exception !== undefined;
    }

    /**
     * Get the common API configuration based on the instance of the back-end service
     */
    private getCommonConfiguration() : ConfigurationParameters {
        return {
            basePath: this.baseUrl,
            fetchApi: this.fetchAPI,
            headers: {
                'Accept-Language': this.language
            }
        };
    }

    /**
     * Authenticate then execute the task that requires a JWT token
     * @param authenticatedTask a task that will make api calls requiring a security token
     */
    private async authenticateThen<R>(authenticatedTask: (jwtToken: string) => Promise<R | Failure>): Promise<R | Failure> {
        let securityApi = new SecurityApi(new Configuration(this.getCommonConfiguration()));

        try {
            // First step is to authenticate to get a JWT token
            let jwtToken = await securityApi.authenticate({
                authenticateInput: {
                    deviceId: this.deviceId,
                    sac: this.sac,
                    password: this.hashedPassword
                }
            });

            return await authenticatedTask(removeWrappingQuotes(jwtToken));
        } catch (e) {
            if (e instanceof Error) {
                return {type: FailureType.FetchFailure, context: 'securityApi.(authenticate | setPassword)', exception: e};
            }
            if (this.isResponse(e)) {
                if (BackEndService.HTTP_INTERNAL_SERVER_ERROR(e.status)) {
                    return {
                        type: FailureType.ServerFailure,
                        context: 'securityApi.authenticate',
                        exception: new Error(`Authentication failure. HTTP status=${e.status} text=${e.statusText}`)
                    }
                }

                // Since the respondent is locally authenticated anything other than server error is a security protocol violation
                return {
                    type: FailureType.SecurityProtocolFailure,
                    context: 'securityApi.authenticate',
                    exception: new Error(`Bad credentials sent to the server. HTTP status=${e.status} text=${e.statusText}`)
                }
            }

            return this.unknownFailure('secureApi.authenticate', e);
        }
    }

    /**
     * Type guard to detect if an exception is a fetch Response
     * @param response
     */
    private isResponse(response: any): response is {status:number, statusText?:string} {
        return "status" in response;
    }

    /**
     * Creates an unknown failure from available info
     * @param context the context of where it happened
     * @param o any object that can help understaning the error
     */
    private unknownFailure(context: string, o: any): Failure {
        return {
            type: FailureType.UnknownFailure,
            context: context,
            exception: new Error(`Unknown error from value=${o}`)
        };
    }
}