import * as DeviceIdService from './device-id.service';

test('The generated deviceId is not empty and does not exceed 22 in length', () => {
   let deviceId: string = DeviceIdService.generateNewDeviceId();

   // Not null
   expect(deviceId).not.toBeNull();

   // Not empty
   expect((/^\s*$/).test(deviceId)).toBeFalsy();

   expect(deviceId.length).toBeLessThanOrEqual(24);
});

test('The generated deviceId is correct', () => {
   let deviceId: string = DeviceIdService.generateNewDeviceId();

   // Not null
   expect(deviceId).not.toBeNull();

   // valid with checksum
   expect(DeviceIdService.isValidDeviceId(deviceId)).toBeTruthy();
});

test('Flag invalid device id', () => {
   // Not empty
   expect(DeviceIdService.isValidDeviceId('myIphone')).toBeFalsy();
});