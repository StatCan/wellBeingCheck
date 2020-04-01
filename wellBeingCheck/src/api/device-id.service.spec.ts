import * as DeviceIdService from './device-id.service';

/**
 * Make sure that the generated device id is not null, empty and the length doesn't exceed 24 chars
 */
test('The generated deviceId is not empty and does not exceed 24 in length', () => {
   let deviceId: string = DeviceIdService.generateNewDeviceId();

   // Not null
   expect(deviceId).not.toBeNull();

   // Not empty
   expect((/^\s*$/).test(deviceId)).toBeFalsy();

   expect(deviceId.length).toBeLessThanOrEqual(24);
});

/**
 * Make sure that the generated device id complies with the checksum rules for validity
 */
test('The generated deviceId is correct', () => {
   let deviceId: string = DeviceIdService.generateNewDeviceId();

   // Not null
   expect(deviceId).not.toBeNull();

   // valid with checksum
   expect(DeviceIdService.isValidDeviceId(deviceId)).toBeTruthy();
});

/**
 * Make sure that the device id validity check spots invalid id
 */
test('Flag invalid device id', () => {
   // Not empty
   expect(DeviceIdService.isValidDeviceId('myIphone')).toBeFalsy();
});

/**
 * Make sure that successive calls to generated device id yields different values
 */
test('Generated device ids are unique', () => {
   let previousDeviceId = 'definitelyNotADeviceIdButWhoKnows';

   for (let i = 0; i < 10; i++) {
      let newDeviceId = DeviceIdService.generateNewDeviceId();
      expect(DeviceIdService.isValidDeviceId(newDeviceId)).toBeTruthy();
      expect(previousDeviceId == newDeviceId).toBeFalsy();
      previousDeviceId = newDeviceId;
   }
});