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
 * @interface ResetPasswordInput
 */
export interface ResetPasswordInput {
    /**
     * Id of the device from the mobile app
     * @type {string}
     * @memberof ResetPasswordInput
     */
    deviceId: string;
    /**
     * SAC associated to the device
     * @type {string}
     * @memberof ResetPasswordInput
     */
    sac: string;
    /**
     * Salt used to hash the new password
     * @type {string}
     * @memberof ResetPasswordInput
     */
    newSalt: string;
    /**
     * Hashed password
     * @type {string}
     * @memberof ResetPasswordInput
     */
    newPasswordHash: string;
    /**
     * Hashed security question answer to match against what is stored on the server
     * @type {string}
     * @memberof ResetPasswordInput
     */
    securityAnswerHash: string;
    /**
     * Id of the new security question chosen by the respondent
     * @type {number}
     * @memberof ResetPasswordInput
     */
    newSecurityQuestionId: number;
    /**
     * Salt used to hash the new security answer
     * @type {string}
     * @memberof ResetPasswordInput
     */
    newSecurityAnswerSalt: string;
    /**
     * Hashed new security question answer
     * @type {string}
     * @memberof ResetPasswordInput
     */
    newSecurityAnswerHash: string;
}

export function ResetPasswordInputFromJSON(json: any): ResetPasswordInput {
    return ResetPasswordInputFromJSONTyped(json, false);
}

export function ResetPasswordInputFromJSONTyped(json: any, ignoreDiscriminator: boolean): ResetPasswordInput {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'deviceId': json['deviceId'],
        'sac': json['sac'],
        'newSalt': json['newSalt'],
        'newPasswordHash': json['newPasswordHash'],
        'securityAnswerHash': json['securityAnswerHash'],
        'newSecurityQuestionId': json['newSecurityQuestionId'],
        'newSecurityAnswerSalt': json['newSecurityAnswerSalt'],
        'newSecurityAnswerHash': json['newSecurityAnswerHash'],
    };
}

export function ResetPasswordInputToJSON(value?: ResetPasswordInput | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'deviceId': value.deviceId,
        'sac': value.sac,
        'newSalt': value.newSalt,
        'newPasswordHash': value.newPasswordHash,
        'securityAnswerHash': value.securityAnswerHash,
        'newSecurityQuestionId': value.newSecurityQuestionId,
        'newSecurityAnswerSalt': value.newSecurityAnswerSalt,
        'newSecurityAnswerHash': value.newSecurityAnswerHash,
    };
}


