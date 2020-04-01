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
import {
    GraphType,
    GraphTypeFromJSON,
    GraphTypeFromJSONTyped,
    GraphTypeToJSON,
} from './';

/**
 * Link to a graph
 * @export
 * @interface GraphLink
 */
export interface GraphLink {
    /**
     * 
     * @type {GraphType}
     * @memberof GraphLink
     */
    type?: GraphType;
    /**
     * 
     * @type {string}
     * @memberof GraphLink
     */
    url?: string;
}

export function GraphLinkFromJSON(json: any): GraphLink {
    return GraphLinkFromJSONTyped(json, false);
}

export function GraphLinkFromJSONTyped(json: any, ignoreDiscriminator: boolean): GraphLink {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'type': !exists(json, 'type') ? undefined : GraphTypeFromJSON(json['type']),
        'url': !exists(json, 'url') ? undefined : json['url'],
    };
}

export function GraphLinkToJSON(value?: GraphLink | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'type': GraphTypeToJSON(value.type),
        'url': value.url,
    };
}

