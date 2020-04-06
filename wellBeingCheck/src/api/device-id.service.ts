import shortUUID from 'short-uuid';
import {Modulus2833Radix62} from './modulo-check-scheme';

const alphaNumericBase62 = shortUUID('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

/**
 * Generates a new device Id with two digits checksum.
 * The generated device Id should not exceed 24 characters in total.
 * @return a string not longer than 24 characters. Each character belongs to [0-9a-zA-Z]
 */
export function generateNewDeviceId(): string {
    let deviceId = '';

    // while it is not supposed to exceeds 22 characters, we have seen instances of where it did with flickBase58.
    // We just loop until we get one of the correct length
    do {
        deviceId = Modulus2833Radix62.generateFullCheckedForm(alphaNumericBase62.generate());
    } while (!isValidDeviceId(deviceId));

    return deviceId;
}

/**
 * Checks whether the given deviceId is valid based on the checksum algorithm.
 *
 * @param deviceId an alphanumeric case sensitive deviceId with a 2-digit checksum
 * @return true if the device Id and the checksum match and the total length does not exceed 24 characters
 */
export function isValidDeviceId(deviceId: string): boolean {
    return deviceId && deviceId.length <= 24 && Modulus2833Radix62.isCorrect(deviceId);
}