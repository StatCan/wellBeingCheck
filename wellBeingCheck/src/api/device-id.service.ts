/**
 * Generates a new device Id with two digits checksum.
 * The generated device Id should not exceed 20 characters in total.
 * @return a string not longer than 20 characters. Each character belongs to [0-9a-zA-Z]
 */
export function generateNewDeviceId(): string {
    return "";
}

/**
 * Checks whether the given deviceId is valid based on the checksum algorithm.
 *
 * @param deviceId an alphanumeric case sensitive deviceId with a 2-digit checksum
 * @return true if the device Id and the checksum match
 */
export function isValidDeviceId(deviceId: string): boolean {
    return false;
}