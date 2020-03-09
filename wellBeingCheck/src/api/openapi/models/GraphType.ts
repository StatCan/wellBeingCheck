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

/**
 * Type of graph that will be produced for the dashboard
 * @export
 * @enum {string}
 */
export enum GraphType {
    Mood = 'mood',
    Activity = 'activity',
    Location = 'location',
    People = 'people'
}

export function GraphTypeFromJSON(json: any): GraphType {
    return GraphTypeFromJSONTyped(json, false);
}

export function GraphTypeFromJSONTyped(json: any, ignoreDiscriminator: boolean): GraphType {
    return json as GraphType;
}

export function GraphTypeToJSON(value?: GraphType | null): any {
    return value as any;
}

