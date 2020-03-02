import * as DeviceIdService from './device-id.service';

test('The generated deviceId is not empty', () => {
   let deviceId: string = DeviceIdService.generateNewDeviceId();

   // Not null
   expect(deviceId).not.toBeNull();

   // Not empty
   expect((/^\s*$/).test(deviceId)).toBeFalsy();
});