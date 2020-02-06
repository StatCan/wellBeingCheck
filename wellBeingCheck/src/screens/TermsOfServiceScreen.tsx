import React, { memo, useState, useCallback } from 'react';
import { Picker, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AsyncStorage } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { newTheme } from '../core/theme';
import { DefaultTheme, Provider as PaperProvider, Title, Paragraph } from 'react-native-paper';
import Constants from 'expo-constants';

import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
  SafeAreaView,
  ScrollView,
} from 'react-navigation';
import BackgroundWide from '../components/BackgroundWide';
import LogoClearSmall from '../components/LogoClearSmall';

type TermsOfServiceState = {
  termsOfService: boolean,
}

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

class TermsOfServiceScreen extends React.Component<Props, TermsOfServiceState> {

  constructor(TermsOfServiceState) {
    super(TermsOfServiceState)
    this.state = {
      termsOfService: false,
    };
  }

  _onTermsAgree = () => {
    console.log("_onTermsAgree");
    let userTermsAndConditionsObj = {
      termsOfService: true,
    };

    AsyncStorage.setItem('user_terms_and_conditions', JSON.stringify(userTermsAndConditionsObj), () => {
      this.props.navigation.navigate('LaunchScreen');
    });
  }

  _onTermsDisagree = () => {
    console.log("_onTermsDisagree");
    let userTermsAndConditionsObj = {
      termsOfService: false,
    };

    AsyncStorage.setItem('user_terms_and_conditions', JSON.stringify(userTermsAndConditionsObj), () => {
      //handle disagree
      alert("We need to handle disagree as user cannot use application");
    });
  }

  render() {
    return (
      <PaperProvider theme={newTheme}>
        <BackgroundWide>

          <LogoClearSmall />

          <Title style={styles.title}>Terms and conditions</Title>

          <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
              <Paragraph style={styles.paragraph}>
                Whya are we conducting this study?

                The following Terms and Conditions arise from Statistics Canada's character as a public institution that must operate transparently and in conformity with the provisions of federal legislation, notably, but not exclusively, the Statistics Act, the Privacy Act, the Access to Information Act and the Communications Policy of the Government of Canada. In addition, Statistics Canada operates transparently and in conformity with its internal management framework, notably, but not exclusively, Statistics Canada's Quality Assurance Framework and Standards of Service to the Public. Statistics Canada's principal objective is to increase the range and depth of statistical information on Canada's population, society and economy available to the Canadian public.

Please note that only Terms and Conditions no. 1 to 12 will apply for Custom Requests and Workshops' projects. All of the Terms and Conditions will apply for Statistical Surveys and Related Services' projects.

1. General Definitions
In these Terms and Conditions and in the Agreement:

"Agreement" means the Purchase Confirmation or the Letter of Agreement, these Terms and Conditions and any other document specified or referred to as forming part of the Agreements, all as amended by agreement of the parties from time to time.

"Actual Costs" means that the parties acknowledge that because of the nature of the services to be provided, some or all of the costs expressed above are a best estimate only. The final charge shall be determined by the actual costs incurred.

"Fixed Costs"means that the parties acknowledge that because of the nature of the services to be provided, all of the costs expressed above represent the final charge, excluding shipping and taxes.

"Purchase Confirmation" means the Purchase Confirmation provided by Statistics Canada and accepted by the client by the confirmation of its order when the total amount of the transaction is under $20,000 CAN.

"Letter of Agreement" means the Letter of Agreement provided by Statistics Canada and signed by Statistics Canada and the client by the confirmation of its order when the total amount of the transaction is $20,000 CAN and over.

"Custom Requests and Workshops"means a custom-designed product which requires manipulation of existing data and all value added activities related to the product such as access to information agreements and technical support. This also includes various workshops, symposiums, conferences, language trainings, seminars, etc. provided by Statistics Canada.

"Statistical Surveys and Related Services" means a statistical survey which is custom-designed in order to answer specific information needs of one or multiple clients, and the related services. This includes all essential activities to produce a statistical survey such as: the collection of survey data, data processing, compilation, analysis, writing and dissemination. The related services include all services related to statistical survey methods and development such as feasibility studies, questionnaire design, exchange of information with other international organisations, etc.

"Survey Sponsor" means an organization external to Statistics Canada contributing 50% or more of total survey costs for a survey being conducted in the framework of a project.

"Survey Contributor" means an organization external to Statistics Canada contributing less than 50% of total survey costs for a survey being conducted in the framework of a project in order to increase sample sizes in specific domains or add questions to a survey instrument.

"Sponsored Survey" means any survey being conducted in the framework of a project where either a Survey Sponsor or a Survey Contributor, has contributed financially to defraying its cost.

"Information" means any data files, databases, tables, graphs, maps and text for which Statistics Canada is the owner or a licensee of all intellectual property rights and made available to the client in accordance with this Agreement, at cost or no cost, either on the Statistics Canada website or by other means as a result of a contract for goods or services.

2. Interest on Overdue Accounts (non-federal clients)
For the purpose of this section
"Average Rate" means the simple arithmetic mean of the Bank Rates in effect at 4:00 p.m. Eastern Standard Time each day during the calendar month immediately before the calendar month in which payment is made;
"Bank Rate" means the rate of interest established from time to time by the Bank of Canada as the minimum rate at which the Bank of Canada makes short term advances to members of the Canadian payments Association;
"Date of payment" means the date of the negotiable instrument drawn by the Receiver General for Canada to pay any amount under the Agreement; and,
An amount becomes"overdue" when it is unpaid on the first day following the day on which it is due and payable according to the Agreement.
The client shall pay to Statistics Canada simple interest at the Average Rate plus 3 percent per year on any amount that is overdue, from the date that amount becomes overdue until the day before the date of payment, inclusive. Statistics Canada is not required to provide notice to the client for interest to be payable.
The client shall pay interest in accordance with this section only if the client is responsible for the delay in paying Statistics Canada. The client will not pay interest on overdue advance payments.
3. Pre-payment
Individuals: pre-payment is required for all purchases
Registered legal entities: Statistics Canada reserves the right to apply a pre-payment requirement to all purchases
4. Methods of payment
The following methods of payment are accepted:

Cheque / Money Order (non-federal clients);
Credit Card (MasterCard, Visa or American Express) (non-federal clients);
Federal Government of Canada Interdepartmental Settlement (federal clients).
5. Currency
All payments shall be made in Canadian dollars. Clients outside Canada pay in Canadian dollars drawn on a Canadian bank or pay in equivalent US dollars, converted at the prevailing daily exchange rate, drawn on a US bank.

6. Credit Verification
All orders that are not prepaid are subject to Statistics Canada's credit verification (non-federal clients).

7. Delivery timeline
Delivery timeline may differ from original agreement and will be confirmed upon receipt of the client's acceptance of this Agreement.

8. Shipping charges
Shipping charges
Shipping Destination	Standard Rate
Canada	$6.00
USA	$6.00
International	$15.00
9. Frequency:
Annual = 1, Quarterly = 4, Monthly = 12.

10. Taxes (non-governmental clients)
Canadian clients add either 5% GST and applicable PST or HST (GST Registration No. R121491807).

11. Use of Information
The client's use of the Information shall be governed by the appropriate agreement. The Statistics Canada Open Licence Agreement governs the use of most data products and other materials that are published by Statistics Canada (see list of exceptions).

12. Privacy Statement
Statistics Canada will only use the client's information to complete the transaction governed by this Agreement, deliver the client's product(s), provide the service(s) ordered, announce product updates and administer the client's account. From time to time, we may also offer the client other Statistics Canada products and services.

If the client does not wish to be contacted again for promotional purposes, the client shall advise his/her Statistics Canada representative.

13. Rights ceded to the Survey Sponsor and the Survey Contributors
The Survey Sponsors and Survey Contributors have the unlimited right to re-disseminate any information produced in the development, execution and dissemination of a Sponsored Survey, except as otherwise noted in these Terms and Conditions. Use of Information is governed by the Statistics Canada Open Licence Agreement.

Survey Sponsors and Survey Contributors hold exclusive rights to any product or service derived from such Information produced through the Survey Sponsor's or Survey Contributor's own efforts.

14. Rights reserved to Statistics Canada
Statistics Canada reserves the right to disseminate, in any form, results of any Sponsored Surveys it conducts. This reservation extends to analysis based on results of Sponsored Surveys.

Statistics Canada retains its intellectual property rights to all Information produced in the development, execution and dissemination of a Sponsored Survey, survey feasibility study or survey planning report. Statistics Canada may make any use of such Information as it sees fit.

15. Reciprocal recognition
Statistics Canada and the Survey Sponsor and Survey Contributors undertake to recognize, in significant public communications, each other's contribution to any Sponsored Survey.

16. Data confidential under the Statistics Act
Unless otherwise stipulated in a separate Agreement under data-sharing provisions of the Statistics Act, filled questionnaires, unscreened microdata files and all other information identifying or potentially identifying respondents and their individual information remain the property of Statistics Canada and will not be divulged to the Survey Sponsor or Survey Contributors. In general, no information that is confidential under the provisions of the Statistics Act will be divulged.

17. Public use microdata files
As provided in this Agreement or at its discretion, Statistics Canada may produce a screened microdata file for public distribution from any survey undertaken. Defining and applying the criteria and procedures for screening, approving and disseminating microdata files for public release is the exclusive right of Statistics Canada.

18. Record linkages
Linkages between Sponsored Survey records and other data sources at the level of individual personal records may only be conducted in conformity with Statistics Canada's policies and procedures.

19. Employment of Survey Sponsor's staff
At the discretion of Statistics Canada and subject to its regulations and procedures, employees of the Survey Sponsor and other persons designated by the Survey Sponsor may be employed, as "Deemed Employees" by Statistics Canada, to perform elements of the work described in this Agreement as agreed to with the Survey Sponsor. Employees of the Survey Sponsor requiring access to confidential data will undergo a security clearance and take the oath of office pursuant to section 6 of the Statistics Act, subject to the respondents not having objected to share their information.

20. Public dissemination of survey results
Results of Sponsored Surveys remain protected and may not be disseminated to third parties or the public at large, by either Statistics Canada or the Survey Sponsor, until officially released by Statistics Canada in accordance with the Statistics Canada's policies. The official release date will be established jointly with the Survey Sponsor, but must not unreasonably delay release of finalized results. If agreed to by the Statistics Canada's project manager, Survey Sponsors may involve third parties in quality assurance of survey results or in peer review of analytical text. When the Survey Sponsor or a third party has access to the information prior to official release, an Advance Release Submission has to be established between Statistics Canada and the Survey Sponsor or the third party, as per the Policy on Official Release. Persons under contract to the Survey Sponsor are deemed equivalent to the Survey Sponsor and have the same rights and obligations.

Statistics Canada will consult with the Survey Sponsor in the development of communication materials to be used at the time of official release. If requested by the Survey Sponsor, Statistics Canada will identify the Survey Sponsor as a contact in any public communication at the time of release.

21. Data-sharing agreement
Under certain conditions, the Statistics Act allows Statistics Canada to share unscreened survey microdata with the Survey Sponsor. Data sharing requires the consent of the individual respondents and a separate agreement between Statistics Canada and the Survey Sponsor.

22. Retention of records
Unless agreed to with the Survey Sponsor and specified in this Agreement, Statistics Canada ordinarily retains Information, files and records up to a maximum period of seven years from the date of origin. It is understood, however, that Statistics Canada, unless specifically agreed to the contrary, is not obligated in any way to retain such files and records for any specific period and may dispose of them at such times and in such manner as it may determine appropriate.

23. Termination
Either party may terminate this Agreement at any time by giving 60 days written notice to the other party (in this section, "Termination Period"). Unless otherwise agreed, the terminating party shall compensate the other for any work put in place up to receipt of the notice of termination.

On the final day of the Termination Period, Statistics Canada will calculate and present to the client a report of all costs incurred. The client shall reimburse Statistics Canada for all costs incurred inclusive of the Termination Period.

24. Dispute Resolution
If a dispute arises out of, or in connection with this Agreement, the parties agree to meet to pursue resolution through negotiation or other appropriate dispute resolution process before resorting to litigation.

All information exchanged during this meeting or any subsequent dispute resolution process, shall be regarded as "without prejudice" communication for the purpose of settlement negotiations and shall be treated as confidential by the parties and their representatives, unless otherwise required by law. However, evidence that is independently admissible or discoverable shall not be rendered inadmissible or non-discoverable by virtue of its use during the dispute resolution process.

25. Amendments
No amendment to this Agreement or waiver of any of the terms and provisions shall be valid unless effected in writing and confirmed by email in the case of a Purchase Confirmation, and unless effected in writing and signed in the case of a Letter of Agreement, by the parties hereto.

26. Entire Agreement
This Agreement constitutes the entire agreement between the parties with respect to the subject matter of the within agreement and supersedes all previous negotiations, communications and other arrangements whether verbal or in writing relating to it unless they are incorporated by reference in this Agreement.

GST: R121491807
Dept.: 054
              </Paragraph>
            </ScrollView>
          </SafeAreaView>

        </BackgroundWide>

        <View style={styles.footer}>
          <Button style={styles.btnDecline}
            mode="contained"
            onPress={this._onTermsDisagree}>
            <Text style={styles.whiteText}>Decline</Text>
          </Button>

          <Button style={styles.btnAgree}
            mode="contained"
            onPress={this._onTermsAgree}>
            <Text style={styles.whiteText}>Agree</Text>
          </Button>
        </View>

      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: "flex-end",
    justifyContent: 'flex-end',
    paddingRight: 20,
  },
  btnDecline: {
    width: 120,
    backgroundColor: newTheme.colors.secondary,
    marginRight: 20,
  },
  btnAgree: {
    width: 120,
    backgroundColor: newTheme.colors.primary,
    alignSelf: "flex-end",
  },
  title: {
    alignSelf: 'baseline',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  label: {
    color: newTheme.colors.secondary,
  },
  whiteText: {
    color: newTheme.colors.whiteText
  },
  container: {
    flex: 1,
    width: '100%',
  },
  paragraph: {
    alignSelf: 'baseline',
    fontSize: 15,
    width: '100%',
    end: 0,
    direction: "ltr"
  },
  scrollView: {
    width: '100%',
    marginHorizontal: 20,
  },
  text: {
  },
});

export default memo(TermsOfServiceScreen);