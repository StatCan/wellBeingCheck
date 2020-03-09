import {BackEndService} from "./back-end.service";
import {NavigationActions} from "react-navigation";
import back = NavigationActions.back;

/**
 * Points to the WebApi server to use for integration testing
 */
const WEB_API_BASE_URL = 'http://wellbeingcheck.canadacentral.cloudapp.azure.com/wellbeing-bienetre/api';

it('Retrieve Links', async () => {

   let backEndService = new BackEndService(
       WEB_API_BASE_URL,
       null,
       null,
       fetch
   );

   let result = await backEndService.getLinks();
   expect(backEndService.isResultFailure(result)).toBeFalsy();

   if (!backEndService.isResultFailure(result)) {
      // Questionnaire A
      expect(result.questionnaireA.enUrl)
          .toBe('http://wellbeingcheck.canadacentral.cloudapp.azure.com/anonymous-anonyme/en/login-connexion/load-charger/eqgs2g4d9121e0734541a5c0dbcb6e4713f7');
      expect(result.questionnaireA.frUrl)
          .toBe('http://wellbeingcheck.canadacentral.cloudapp.azure.com/anonymous-anonyme/fr/login-connexion/load-charger/eqgs2g4d9121e0734541a5c0dbcb6e4713f7');

      // Questionnaire B
      expect(result.questionnaireB.enUrl)
          .toBe('http://wellbeingcheck.canadacentral.cloudapp.azure.com/anonymous-anonyme/en/login-connexion/load-charger/eqgs2f4d9121e0738541a5c0dbcb6e4713z8');
      expect(result.questionnaireB.frUrl)
          .toBe('http://wellbeingcheck.canadacentral.cloudapp.azure.com/anonymous-anonyme/fr/login-connexion/load-charger/eqgs2f4d9121e0738541a5c0dbcb6e4713z8');

      // Confirmation Page
      expect(result.confirmationPage.enUrl)
          .toBe('http://wellbeingcheck.canadacentral.cloudapp.azure.com/anonymous-anonyme/en/operations/submitconfirmation-confirmationsoumission');

      expect(result.confirmationPage.frUrl)
          .toBeUndefined();

      // Exception Page
      expect(result.exceptionPage.enUrl)
          .toBe('http://wellbeingcheck.canadacentral.cloudapp.azure.com/anonymous-anonyme/en/exception/');
      expect(result.exceptionPage.frUrl)
          .toBe('http://wellbeingcheck.canadacentral.cloudapp.azure.com/anonymous-anonyme/fr/exception/');
   }
});

it('Retrieve Flags', async () => {
   let backEndService = new BackEndService(
       WEB_API_BASE_URL,
       null,
       null,
       fetch
   );

   let result = await backEndService.getFlags();
   expect(backEndService.isResultFailure(result)).toBeFalsy();

   if (!backEndService.isResultFailure(result)) {
      expect(result['enablePopulationDashboard']).toBe('false');
      expect(result['enableDarkMode']).toBe('false');
   }
});

test('Decode JWT token', () => {
   let backEndService = new BackEndService(
       WEB_API_BASE_URL,
       null,
       null,
       fetch
   );

   let result = backEndService.decodeJwtToken('"eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJkZXZpY2VJZCI6Im15SXBob25lNnNlTSIsImdyYXBoVG9rZW4iOiJOL0EiLCJzYWMiOiI2NDgwNzYwNTIxNzg1MzQ0Iiwic2VjdXJlZCI6IkZhbHNlIiwibmJmIjoxNTgzNjQ3NjQ0LCJleHAiOjE1ODM2NDg4NDQsImlhdCI6MTU4MzY0NzY0NH0.scvs3e44fEs4rkrYK9zwiNY0o_HVzTn0IYUj7fYbuPhWQx8FpBtXsAVm7i552uYEDstzoN6XtIVFRVTypwLZYQ"');
   expect(backEndService.isResultFailure(result)).toBeFalsy();

   if (!backEndService.isResultFailure(result)) {
      expect(result.deviceId).toBe('myIphone6seM')
      expect(result.sac).toBe('6480760521785344');
      expect(result.secured).toBe('False');
   }
});
