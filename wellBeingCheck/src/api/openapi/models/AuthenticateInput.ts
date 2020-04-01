/* tslint:disable */
/* eslint-disable */
/**
 * Pilot Mobile App API
 * API to support retreiving config data, submit app paradata and obtain graphs to be used by the WellBeringCheck mobile app.
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface AuthenticateInput
 */
export interface AuthenticateInput {
    /**
     * Unique Id generated when setting up the mobile app
     * @type {string}
     * @memberof AuthenticateInput
     */
    deviceId: string;
    /**
     * Secure Access Code distributed from EQ confirmation page
     * @type {string}
     * @memberof AuthenticateInput
     */
    sac: string;
    /**
     * Hashed password
     * @type {string}
     * @memberof AuthenticateInput
     */
    password: string;
}

export function AuthenticateInputFromJSON(json: any): AuthenticateInput {
    return AuthenticateInputFromJSONTyped(json, false);
}

export function AuthenticateInputFromJSONTyped(json: any, ignoreDiscriminator: boolean): AuthenticateInput {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'deviceId': json['deviceId'],
        'sac': json['sac'],
        'password': json['password'],
    };
}

export function AuthenticateInputToJSON(value?: AuthenticateInput | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'deviceId': value.deviceId,
        'sac': value.sac,
        'password': value.password,
    };
}

