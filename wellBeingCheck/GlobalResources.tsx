export const resources = {
    culture: 'en',
    getString: function (key) {
        let obj=this.data[this.culture];
        if(!obj.hasOwnProperty(key))return key;
        return this.data[this.culture][key];
    },
    data: {
        en: {
            //global
            "app.name": "Well-being Check",
            "gl.next": "Next",
            "gl.cancel": "Cancel",
            "gl.decline": "Decline",
            "gl.agree": "Accept",
            "gl.return": "Return",
            "answer": "Answer",
            //getting started
            "getting_started": "Getting Started\n",
            "getting_started_content": `Why we are conducting this study\n`+
            `The purpose of this study is to better understand the everyday well-being of Canadians by asking about activities and feelings as they are happening. To do this, participants will download an app on their smartphones and answer a few questions at different intervals throughout the day, over a short period of time. The results will help us to find connections between activities and well-being, and be used to develop programs that enhance people’s lives. In the future, an app could be used as a faster and more convenient way to complete other Statistics Canada surveys. \n\n`+
            `Information may also be used by Statistics Canada for other statistical and research purposes. \n\n`+
           
            `Notifications \n`+
            `This app will notify you to complete a Well-being Check 2 to 5 times daily. You can customize these parameters, including when we should not disturb you, at any time in the settings menu on the app’s home page. If you do not customize the parameters, you will receive a default of 2 daily notifications at various times between 08:00 and 22:00. If you do not allow notifications, you can still complete a Well-being Check whenever you like, but the quality of your results may be impacted. \n\n` +
            `Authorization and confidentiality\n`+
            `Data are collected under the authority of the Statistics Act, Revised Statutes of Canada, 1985, Chapter S-19. Your information will be kept strictly confidential. \n\n`+
            `Although voluntary, your participation is important so that the information collected is as accurate and complete as possible. \n\n`+
           
            `Record linkages \n`+
            `To enhance the data from this survey and to reduce the reporting burden, Statistics Canada may combine the information you provide with other survey or administrative data sources. \n\n`+
            `Time required to complete this questionnaire\n`+
            `This questionnaire will take about 2 minutes to complete. \n\n`+
            `Please note that you will not be able to change any information you reported once you have submitted the questionnaire. \n\n`+
            `To navigate the questionnaire \n`+
            `Use the Previous and Next buttons located at the bottom right of each page. \n\n`+
            `Session timeout\n`+
            `After 2 hours of inactivity, your session will time out. You will not be able to access any unsaved information.\n\n`+
            `After 7 minutes of inactivity, Well-Being Check will lock. You will need to enter your password to continue. \n\n`+
            `Definitions and explanations\n`+
            `A help button is available for certain questions. Press this button for additional information or clarification.\n\n`,
            
          
            //terms & conditions
            "terms_and_conditions": "Terms and conditions \n",
            "terms_and_conditions_disagree": "You must accept Terms and Conditions to use this app. Select “OK” to revise your preferences, or call us at 1-877-949-9492 for more information.",
            "terms_and_conditions_content": `Disclaimer   \n` +
                `Information collected through the use of the Well-being Check App falls under the authority of the Statistics Act which ensures that any information provided will be kept confidential and will only be used for statistical and research purposes.  It is your responsibility to keep your phone and access to the App secure. We do not recommend removing software restrictions and limitations imposed by the official operating system of your device. Doing so could compromise your phone’s security features and the security/confidentiality of the information collected by this App. \n\n` +

                `General terms and conditions \n` +
                `The following Terms and Conditions arise from Statistics Canada's character as a public institution that must operate transparently and in conformity with the provisions of federal legislation, notably, but not exclusively, the Statistics Act, the Privacy Act and the Access to Information Act. Statistics Canada's principal objective is to increase the range and depth of statistical information on Canada's population, society and economy available to the Canadian public. \n` +
                `http://www.statcan.gc.ca/eng/reference/terms-conditions/general \n\n` +

                `Modification of Terms and Conditions \n` +
                `Statistics Canada reserves the right to change these Terms and Conditions in its sole discretion.  Modification of these Terms and Conditions by Statistics Canada will require they are accepted prior to using the App. \n\n` +

                `Privacy notice \n` +
                `Statistics Canada is committed to respecting the privacy of individuals and businesses—whether they are responding to one of our surveys, providing personal information, purchasing a product or service or using our website. To fulfill this commitment, Statistics Canada has created a Privacy Framework that describes the Approved practices, procedures and governance related to privacy. All personal information collected, used, disclosed or retained by Statistics Canada is protected by the Privacy Act and by the Statistics Act whether it was provided by a respondent or received from a third party.  Privacy and confidentiality of personal information \n` +
                `http://www.statcan.gc.ca/eng/reference/privacy \n\n` +

                `Confidentiality statement \n` +
                `Information collected through the use of the App falls under the authority of the Statistics Act, which ensures that any information provided will be kept confidential and will only be used for statistical and research purposes. \n\n` +

                `Official language notice \n` +
                `Statistics Canada respects the Official Languages Act and is committed to ensuring that information products of equal quality are available in both English and French. \n` +
                `http://www.statcan.gc.ca/eng/sc/blog2 \n\n` +

                `Accessibility notice \n` +
                `The Government of Canada is committed to achieving a high standard of accessibility as defined in the Standard on Optimizing Website and Applications for Mobile Devices.  In the event of difficulty using our web pages, Applications or device-based mobile Applications, please contact us for assistance or to obtain alternative formats such as regular print, Braille or another appropriate format. \n` +
                `http://www.statcan.gc.ca/eng/reference/accessnotice \n\n` +

                `Use of content\n` +
                `The App is not for providing content, but is used to assist in the collection of information. You may not alter the App or the content, or use it for commercial purposes. \n\n` +

                `Unique identifier \n` +
                `A randomly generated unique identifier will be placed on your device as part of downloading the App. The unique identifier will be used each time you complete a submission, as a method to combine your data with previous submissions. It will be removed from your device if you delete the Application. \n\n` +

                `Applicable law  \n` +
                `Disclaimer This App and its Terms and Conditions are governed by the laws of the province of Ontario and Applicable laws of Canada. Legal proceedings related to this App and its Terms and Conditions may only be brought in the courts of Ontario or the Federal Court of Canada. \n\n` +

                `Limitation of liability \n` +
                `The Government of Canada, its officers, servants, employees and/or agents shall not be held liable for any injury to any person, including death, or for any loss or damage to any person’s property, incurred or suffered arising out of or in connection with the use of the App. By downloading, accessing or using this App or any page of this App, you signify your assent to this disclaimer. Mobile phone use while driving is widely considered dangerous due to its potential for causing distracted driving and accidents. Activities such as voice calling, texting, web browsing, playing video games, mobile App use or phone use in general can increase the risk of an accident. Use of this App should only be done when appropriate and safe to do so. \n\n` +

                `Disclosure statement \n` +
                `Statistics Canada is allowed to disclose identifiable information when the respondent has given written consent to release it. \n\n` +

                `Copyright notice \n` +
                `Information presented by Statistics Canada in this App is subject to the Copyright Act of Canada. \n\n` +

                `Trademark notice \n` +
                `The official symbols of the Government of Canada, including the Canada Wordmark, the Arms of Canada, and the flag symbol may not be reproduced whether for commercial or non-commercial purposes, without prior written authorization. \n` +
                `http://www.statcan.gc.ca/eng/reference/copyright \n\n` +

                `No warranties \n` +
                `The information in this App is provided ‘as is’, and Statistics Canada makes no representations or warranties whatsoever with respect to the information, whether express or implied, in relation to the information and expressly disclaims any implied warranty of merchantability or fitness for a particular purpose of the information. \n\n` +

                `Indemnity \n` +
                `Users of the App hereby indemnify and hold harmless Statistics Canada, its officers, servants, employees and/or agents and contractors, from any and all losses, conditions, whether express, implied or statutory, including implied warranties and implied conditions of merchantability, fitness for a particular purpose, and non-infringement. \n\n` +

                `Restrictions \n` +
                `Use of this App is strictly in accordance with its Terms and Conditions. Users shall not: decompile, reverse engineer, disassemble or attempt to derive the source code from the App; remove, alter or obscure any proprietary notice from any portion of the App; reproduce, modify, improve, enhance or make derivative works based upon the App; distribute, license, lease, sell, resell, transfer, publicly display, transmit or otherwise exploit the App; link to, mirror or frame any portion of the App for any illegal and unauthorized purpose, and agree to comply with all laws, rules and regulations applicable to their use of the App. \n\n` +

                `Modifications and access \n` +
                `Statistics Canada reserves the right to modify or discontinue this App for any reason and without notice. \n\n` +

                `Ownership \n` +
                `Statistics Canada warrants that it is the rightful owner of the App and related documentation that is the subject of this Agreement. \n\n` +

                `Maintenance and support \n` +
                `Statistics Canada may not provide any maintenance or support for this App. Statistics Canada may provide periodic updates to the App which may include bug fixes and enhancements.`,
            //Register screen
            "reg.pass.validation.empty": "Password cannot be empty",
            "reg.pass.validation.min_eight": "Password must be at least 8 characters",
            "reg.pass.validation.upper": "Password must contain at least 1 upper case",
            "reg.pass.validation.special": "Password must contain at least 1 special character",
            "reg.pass.validation.lower": "Password must contain at least 1 lower case",
            "reg.pass.validation.number": "Password must contain at least 1 number",
            "reg.ques.select": "Select question",
            "reg.ques.mother": "What is your mother’s maiden name?\n",
            "reg.ques.school": "What primary school did you go to?\n",
            "reg.ques.car": "What was your first car?\n",
            "reg.ques.sport": "What is your favourite game or sport?\n",
            "reg.ques.job": "What was your first job?",
            "reg.action.create": "CREATE",
            "Password Requirements": "Password Requirements",
            "reg.pass.hint_length": "8 Characters minimum",
            "reg.pass.hint_upper": "1 Upper case",
            "reg.pass.hint_special": "1 Special character",
            "reg.pass.hint_lower": "1 Lower case",
            "reg.pass.hint_number": "1 Number",
            "reg.pass_conf.empty": "Password cannot be empty",
            "reg.pass_conf.match": "Passwords do not match",
            "reg.securityQuestion.validation":"Security question is required",
            "reg.securityQuestionAnswer.validation":"Security answer is required",
            "reg.securityQuestionAnswerlength.validation":"Security answer must be at least 4 characters",


            //password recovery
            "password_recovery.title": "Password recovery",
            "password_recovery_change.title": "Enter New Password",
            "password_recovery_change.enter_password": "Enter password",
            "password_recovery_change.confirm_password": "Confirm password",
            "password.recovery.incorrectAnswer":"incorrect answer",
            //home screen
            "home_first_time_login_content": "Customize the number of notifications and the window of time you receive them in the Settings menu.",
            //about
            "about_title": "",
            "about_content": `Why we are conducting this study\n`+
                `The purpose of this study is to better understand the everyday well-being of Canadians by asking about activities and feelings as they are happening. To do this, participants will download an app on their smartphones and answer a few questions at different intervals throughout the day, over a short period of time. The results will help us to find connections between activities and well-being, and be used to develop programs that enhance people’s lives. In the future, an app could be used as a faster and more convenient way to complete other Statistics Canada surveys.  \n\n` +

                `Information may also be used by Statistics Canada for other statistical and research purposes.  \n\n` +

                `Notifications \n` +
                `This app will notify you to complete a Well-being Check 2 to 5 times daily. You can customize these parameters, including when we should not disturb you, at any time in the settings menu on the app’s home page. If you do not customize the parameters, you will receive a default of 2 daily notifications at various times between 08:00 and 22:00. If you do not allow notifications, you can still complete a Well-being Check whenever you like, but the quality of your results may be impacted. \n\n`+
                
                `Authorization and confidentiality  \n` +
                `Data are collected under the authority of the Statistics Act, Revised Statutes of Canada, 1985, Chapter S-19. Your information will be kept strictly confidential.  \n\n` +

                `Record linkages  \n` +
                `To enhance the data from this survey and to reduce the reporting burden, Statistics Canada may combine the information you provide with other survey or administrative data sources.  \n\n` +

                `Time required to complete this questionnaire  \n` +
                `This questionnaire will take about 2 minutes to complete.  \n\n` +

                `Please note that you will not be able to change any information you reported once you have submitted the questionnaire.  \n\n` +

                `To navigate the questionnaire  \n` +
                `Use the Previous and Next buttons located at the bottom right of each page.  \n\n` +

                `Session timeout  \n` +
                `After 2 hours of inactivity, your session will time out. You will not be able to access any unsaved information. \n\n` +

                `After 7 minutes of inactivity, Well-Being Check will lock. You will need to enter your password to continue.  \n\n` +

                `Definitions and explanations  \n` +
                `A help button is available for certain questions. Press this button for additional information or clarification.\n\n` +
                `Version`,

            "about_title_two": "Authorization and confidentiality",
            "about_content_two": "Data are collected under the authority Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
            "create_password": "Create Password",
            "password": "Password",
            "confirm_password": "Confirm Password",
            "the_answer_is:": "Answer",
            "btn_create": "Create",
            "login": "Login",
            "start_survey": "START",
            "settings": "Settings",
            "result": "Results",
            "about_the_survey": "About the Survey",
            "term_and_condition": "Term & Condition",
            "contact_us": "Contact us",
            "warning": "Warning",
            "match_password_error": "You must provide matched password and secrity question and answer !",
            "ok": "Ok",
            "term_and condition_content": "When you continue use this app, that means you automatically agree on this Term and condition.",

            "Your feeling this week": "Your feeling this week",
            "Your feelings": "Your feelings: a snapshot",
            "Detail": "Detail",
            "Summary": "Summary",
            "How you are feeling by location": "Your feelings: by location",
            "How you are feeling with others": "Your feelings: alone or with others",
            "How you are feeling by activity": "Your feelings: by activity",
            "How you are feeling by location help": "This is your feeling by location",
            "How you are feeling with others help": "This is your feeling with others",
            "How you are feeling by activity help": "This is your feeling by activity",
            "Your feeling help": "These results have not been validated by Statistics Canada. For more information and help interpreting your results, please see the FAQ on the help page.",

            "notifications": "Notifications",
            "wake_time": "Do not disturb before",
            "sleep_time": "Do not disturb after",
            "number_notifications": "Number of daily notifications",
            "language": "Language",
            "about": "Information",
            "num_pings_dialog_title": "Number of notifications per day",
            "ThankYouA": "Thank you for checking in!",
            "ThankYouB": "Thank you, now check out your results!",
            "NoDataAlert": "Results will become available once you complete two well-being checks.",
            "Enter password": "Enter password",
            "Well-Being Check": "Well-being Check",

            //Login screen
            "login.forgot_password": "Forgot password?",
            "login.login": "Login",
            "Language": "Français",
            "Secure your account": "Secure your account",
            "login.Wrongpassword.message":"incorrect password",

            //information screen
            "contactus_title": "Contact Us",
            "contactus_email": "Email",
            "contactus_telephone": "Telephone",
            "contactus_website": "Website",
            "contactus_mail": "Mail",
            "contactus_text": `Statistics Canada\nAttention of Director Jean Labbé\n150 Tunney’s Pasture Driveway\nOttawa, ON\nK1A 0T6`,

            //FAQ
            "faq.title": "FAQ",
            //---------------category1---------------
            "faq.category1": "General",
            
            //category1-Question1
            "faq.c1.q1": "Is this a legitimate Statistics Canada study?",
            "faq.c1.q1.a": `Yes. More information can be found on Statistics Canada’s website: [tobe updated] http://www.statcan.gc.ca`,
            
            //category1-Question2
            "faq.c1.q2": "Am I required to complete this study?",
            "faq.c1.q2.a": "No. Participation is voluntary.",

            //category1-Question3
            "faq.c1.q3": "Who is participating in this study? ",
            "faq.c1.q3.a": "Anyone in Canada over 15 years of age with a compatible smartphone or tablet can download Well-being Check from GooglePlay or the App Store to participate. You can participate with or without an invitation code. Please share this information with your friends so they can download the app too!",
            
            //category1-Question4
            "faq.c1.q4": "Why are you conducting this study?",
            "faq.c1.q4.a": "The purpose of this study is to better understand the everyday well-being of Canadians by asking in the moment questions about their activities and feelings. For more information about this study, please visit [tobe updated] http://www.statcan.gc.ca",

            //category1-Question5
            "faq.c1.q5": "How long will it take me to complete the study?",
            "faq.c1.q5.a": "Daily Well-being Checks should take less than a minute to complete. You can choose how many times to participate each day by customizing the number of notifications you will receive in the settings menu. We are asking you to participate in the study for one month.",

            //---------------category2---------------
            "faq.category2": "Privacy and confidentiality",

            //category2-Question1
            "faq.c2.q1": "Why do I need a password and security question?",
            "faq.c2.q1.a": "Well-being Check requests users to respond to daily questionnaires to identify how their feelings change in different settings. By password protecting the app, we can ensure your data trend has not been impacted by others who may use your phone and access the app. Also, Well-being Check provides users with a Results menu, which displays a trend of your self-assessed feelings and how they relate to what you are doing, who you are with, and where you are. By password protecting the app, we can ensure your trend is not viewed by others unless you log into the app and choose to share it with them.\n\n"+
            "Statistics Canada does not collect your password when you create it, and therefore will not be able to assist you in resetting your password if required. The security question provides a second tier of security which you can use to reset your password.",
             
            //category2-Question2
            "faq.c2.q2": "Can I change my password?",
            "faq.c2.q2.a": "You can change your password through the ‘Forgot password?’ option on the login screen. You will need to answer your security question in order to access the password reset function.",
            
            //category2-Question3
            "faq.c2.q3": "What if I forgot my password or security question?",
            "faq.c2.q3.a": "You can change your password through the ‘Forgot password?’ option on the login screen. You will need to answer your security question in order to access the password reset function. If you have forgotten the answer to your security question, you will need to delete the app and download it again. Your previous responses will no longer be accessible to you through your My Results menu, as the app will identify you as a new user for security purposes.",
            
            //category2-Question4
            "faq.c2.q4": "Is the information I provide confidential?",
            "faq.c2.q4.a": "Yes, Statistics Canada guarantees the confidentiality of your responses under the Statistics Act.\n\n"+
            "Any research, reports or publications based on this study will use aggregated data only and will not identify you or any individual as being affiliated with this study.",

             //category2-Question5
            "faq.c2.q5": "What data does Well-being Check collect?",
            "faq.c2.q5.a": "The Well-being Check app collects the responses you provide to questionnaires, as well as the number of notifications you receive each day. It does not collect your password, your security question and answer, or data from your device such as location and app usage.",
            
            //category2-Question6
            "faq.c2.q6": "How is my data stored and transmitted? How will my data be protected?",
            "faq.c2.q6.a": "The Well-being Check app fully complies with all privacy and security regulations in place to protect Canadians’ information.\n\n"+
            "Well-being Check uses Statistics Canada’s Electronic Collection Portal to collect your responses. No data from the app is stored on your device after you submit it. For more information about the security features in place to protect your data, please visit [tobe updated] http://www.statcan.gc.ca.",
            
            //category2-Question7
            "faq.c2.q7": "I want to stop participating in this study",
            "faq.c2.q7.a": "If you want to stop participating in the study at any point, you can turn off notifications in the settings menu or delete the app from your device.",
          
            
            //---------------category3--------------- 
            "faq.category3": "Settings and notifications",

             //category3-Question1
             "faq.c3.q1": "What notifications will I receive?",
             "faq.c3.q1.a": "The app will send you a notification when it is time to complete a Well-being Check. These notifications are sent at random times based on the parameters you have chosen in your settings menu. You can change your settings at any time.",
              
             //category3-Question2
             "faq.c3.q2": "Can I disable notifications?",
             "faq.c3.q2.a": "Notifications are an essential part of this study as they let you know when a Well-being Check is available to be completed. If you need to turn off notifications, you can do it through the Settings page.",
             
             //category3-Question3
             "faq.c3.q3": "How do I change my settings?",
             "faq.c3.q3.a": "You can change your settings at any time through the Settings menu, located on the app homepage. ",
             
             //category3-Question4
             "faq.c3.q4": "Can I complete a Well-being Check if I have not received a notification?",
             "faq.c3.q4.a": "Of course! You can complete a Well-being Check at any time by pressing START, located on the app homepage.",
 
             //category3-Question5
             "faq.c3.q5": "What if I have missed a notification and have now received another?",
             "faq.c3.q5.a": "Not a problem! While our goal is for you to respond to all notifications, we understand life can be busy and sometimes a notification will be missed. Respond once based on what you are doing and who you are with when you receive the second notification. ",
             
             //category3-Question6
             "faq.c3.q6": "Why am I no longer receiving notifications?",
             "faq.c3.q6.a": "If you have not completed a Well-being Check in the past 4 days, the app will stop sending you notifications. You can start receiving notifications again by pressing START, located on the app homepage, and completing a Well-being Check.\n\n"+
             "Well-being Check will send you notifications for up to 30 days total. After this period is complete, your participation in the study has ended and you will no longer receive notifications.\n\n"+
             "If neither of these scenarios reflect your situation, please contact us at 1-877-949-9492.",

            //---------------category4---------------
            "faq.category4": "The Results menu",

            //category4-Question1
            "faq.c4.q1": "What does the Results menu tell me? How can I interpret my results?",
            "faq.c4.q1.a": "The data visualizations on the Results menu display a snapshot of your self-assessed feelings and how they relate to what you are doing, who you are with, and where you are.\n\n"+
            "For ease of interpretation, your activities and companions have been grouped. Please note, all questions about feelings are based on a scale of 1 meaning ‘not at all’, and 10 meaning ’very’. Based on this, a high rating of feeling happy compared to a high rating of feeling anxious would be interpreted quite differently.\n\n"+
            "These results are reported in real time and have not been validated by Statistics Canada. Caution should be exercised when interpreting the data.",
           
            //---------------category5---------------
            "faq.category5": "Technical difficulties",
             
            //category5-Question1
            "faq.c5.q1": "I cannot access the questionnaires or my results",
            "faq.c5.q1.a": "The questionnaire portal and Results menu require a connection to data or wi-fi to function. If the problem persists after checking your connection, please contact us at 1-877-949-9492.",
            
            //category5-Question3
            "faq.c5.q2": "I am experiencing other technical difficulties",
            "faq.c5.q2.a": "If you are experiencing display issues, crashes, or other bugs please contact us at 1-877-949-9492.",
            
            //category5-Question4
            "faq.c5.q3": "Can I download the app on multiple devices and sync it?",
            "faq.c5.q3.a": "The app does not have syncing capabilities.\n\n"+
            "Your participation in the study is based on the device you first downloaded the Well-being Check app on. If you download the app on a different device, you will be identified as a new user for security purposes and your previous responses will no longer be accessible to you through the Results menu.",

            //category5-Question5
            "faq.c5.q4": "How much memory does the app require?",
            "faq.c5.q4.a": "Well-being Check requires 53 MB on Apple devices, and 90 MB on Android devices. ",

            //category5-Question5
            "faq.c5.q5": "How much data does the app require?",
            "faq.c5.q5.a": "[tbd]",

            "offline":"You are offline, try it later.",
            "securityIssue":"Internal server error, Try again, if same thing would happen again contact StatCan",

            //Session
            "session.modal.title": "",
            "session.modal.message": "Your session has timed out. Please sign in again.",
            "session.modal.sign_in": "Sign in",

            //internet connection
            "internet.offline":"No Internet connection is available, please check to ensure you are connected.",

            //Network error jwt
            "network.error.jwt":"Internal server error(token), Try again, if same thing would happen again contact StatCan",
            "network.error.pwd":"Error to set password, please try again later",
            "network.error.general":"Network Error, please try again later",

            //Notification request
            "notification.resquest.title":"",
            "notification.resquest.message":"Visit your device settings to enable notifications?",

            //Notification messages
            "notification.scheduleTitle":"Scheduled Notification",
            "notification.scheduleMessage":"How are you feeling right now? Sign in for a Well-being Check!",
            "notification.lastAttemptMessage":"We haven’t heard from you in a while. Sign in for a Well-being Check!",
          
             //time picker title
             "timepicker.title":"Pick a time",
             "timepicker.canceltext":"Cancel",
             "timepicker.confirmtext":"Confirm",
            "scheduleTitle":"Scheduled Notification",
            "scheduleMessage":"How are you feeling right now? Sign in for a Well-being Check!",
            "scheduleMessage1":"We haven’t heard from you in a while. Sign in for a Well-being Check!",
             "cancel":"Cancel",
             "continue":"Continue",
             "settingValidation":"There needs to be a minimum of 3 hours between the 'Do not disturb before' and 'Do not disturb after' time settings",
             "donotdisturbbetween":"Do not disturb between",
             "from":"From:",
             "to":"To:",
             "rateAppMsg":"Tell us how we’re doing by rating us on the",
             "feedback":"We love feedback!",
             "ratenow":"RATE NOW",
             "later":"No thanks",
        },
        fr: {
            //global
            "app.name": "Bilan bien-être",
            "gl.next": "Suivant",
            "gl.cancel": "Annuler",
            "gl.decline": "Décliner",
            "gl.agree": "Accepter",
            "gl.return": "Retour",
            "answer": "Répondre",
            //getting started
            "getting_started": "Pour commencer\n",
            "getting_started_content": `Pourquoi nous menons cette étude\n` +
                `L’objectif de cette enquête est de mieux comprendre le bien-être au quotidien des Canadiens et des Canadiennes en leur demandant de répondre à des questions sur les activités qu’ils entreprennent et les sentiments qu’ils éprouvent en temps réel. Pour ce faire, les participants devront télécharger une application sur leur téléphone intelligent et répondre à quelques questions à divers intervalles au cours de la journée, sur une courte période de temps. Les résultats obtenus nous aideront à établir des liens entre certaines activités et le bien-être, et nous permettront de développer des programmes qui amélioreront la vie des gens. À l’avenir, ce genre d’application pourrait servir à répondre à d’autres enquêtes de Statistique Canada de façon plus rapide et pratique. \n\n` +

                `Les renseignements recueillis pourraient aussi être utilisés par Statistique Canada à d’autres fins statistiques et de recherche. \n\n` +

                `Notifications \n` +
                `Cette application vous enverra une notification pour remplir un Bilan bien-être de 2 à 5 fois par jour. Vous pouvez personnaliser ces paramètres, y compris les moments où vous ne souhaitez pas être dérangé, à tout moment dans le menu des paramètres sur la page d’accueil de l’application. Si vous ne personnalisez pas les paramètres, vous recevrez par défaut 2 notifications à divers moments entre 8 h et 22 h. Si vous n’acceptez pas les notifications, vous pourrez tout de même remplir un Bilan bien-être quand vous le voudrez, mais la qualité de vos résultats pourrait en être affectée. \n\n` +
               
                `Autorisation et confidentialité \n` +
                `Ces données sont recueillies en vertu de la Loi sur la statistique, Lois revisees du Canada \(1985\), chapitre S-19. V os renseignements demeureront strictement confidentiels. \n\n` +

                `Bien qu’elle soit volontaire, votre participation est importante afin que les renseignements recueillis soient les plus exacts et les plus complets possible. \n\n` +

                `Couplages d’enregistrements \n` +
                `Afin d’améliorer la qualité des données tirées de cette enquête et de réduire le fardeau de réponse, Statistique Canada pourrait combiner les renseignements que vous fournissez avec ceux provenant d’autres enquêtes ou sources de données administratives. \n\n` +

                `Temps requis pour remplir ce questionnaire \n` +
                `Ce questionnaire prendra 2 minutes à remplir. Veuillez noter que vous ne serez pas en mesure de modifier les renseignements déclarés une fois votre questionnaire soumis. \n\n` +

                `Pour parcourir le questionnaire \n` +
                `Utilisez les boutons Précédent et Suivant situés dans le coin inférieur droit de chaque page. \n\n` +

                `Délai d’inactivité d’une session \n` +
                `Après 2 heures d’inactivité, votre session sera interrompue. Vous ne pourrez accéder à aucun renseignement qui n’a pas été sauvegardé. \n\n` +

                `Après 7 minutes d’inactivité, Bilan bien-être se verrouille. Vous devrez entrer votre mot de passe pour continuer. \n\n` +

                `Définitions et explications \n` +
                `Un bouton d’aide est disponible pour certaines questions. Appuyez sur ce bouton pour obtenir plus de renseignements ou des précisions.\n\n`,
                
            //terms & conditions
            "terms_and_conditions": "Conditions générales\n",
            "terms_and_conditions_content": `Désistement \n` +
                `La collecte des renseignements effectuée au moyen de l’application Bilan bien-être est régie par la Loi sur la statistique, en vertu de laquelle tout renseignement fourni demeure confidentiel et n’est utilisé qu’à des fins statistiques et de recherche. Il vous incombe de protéger votre téléphone et votre accès à l’application. Nous vous recommandons de ne pas supprimer les restrictions et les limites imposées par le système d’exploitation officiel de votre appareil quant à l’utilisation des logiciels. Cela pourrait compromettre les fonctions de sécurité de votre téléphone ainsi que la sécurité et la confidentialité des renseignements recueillis par l’application. \n\n` +

                `Conditions générales  \n` +
                `Les Conditions générales énoncées ci-dessous résultent du fait que Statistique Canada, à titre d'organisme public, doit faire preuve de transparence et se conformer aux dispositions des lois fédérales, notamment, mais non exclusivement, la Loi sur la statistiques, la Loi sur la protection des renseignements personnels et la Loi sur l'accès à l'information. L'objectif principal de Statistique Canada est d'accroître la portée et la précision de l'information statistique sur la population, la société et l'économie du Canada mise à la disposition du public canadien. \n` +
                `http://www.statcan.gc.ca/fra/reference/avis/conditions-generales \n\n` +

                `Modification des conditions générales \n` +
                `Statistique Canada se réserve le droit de modifier les présentes conditions générales à sa seule discrétion. Le cas échéant, il vous faudra accepter toute modification avant de pouvoir utiliser l’application. \n\n` +

                `Avis de confidentialité \n` +
                `Statistique Canada s’est engagé à protéger les renseignements personnels de toutes les personnes et entreprises, et ce, qu’elles répondent à l’une de ses enquêtes, fournissent des renseignements personnels, achètent un produit ou un service ou utilisent notre site Web. Afin de respecter cet engagement, nous avons élaboré un cadre de protection des renseignements personnels qui décrit les pratiques, les procédures et les mesures de gouvernance approuvées en matière de protection de la vie privée. \n\n` +

                `Tous les renseignements personnels recueillis, utilisés, divulgués ou conservés par Statistique Canada sont protégés en vertu de la Loi sur la protection des renseignements personnels et de la Loi sur la statistique, qu’ils aient été fournis par un répondant ou reçus d’une tierce partie. La protection des renseignements personnels et la confidentialité \n` +
                `http://www.statcan.gc.ca/fra/reference/privee \n\n` +

                `Énoncé de confidentialité \n` +
                `La collecte des renseignements effectuée au moyen de l’application est régie par la Loi sur la statistique, en vertu de laquelle tout renseignement fourni demeure confidentiel et n’est utilisé qu’à des fins statistiques et de recherche. \n\n` +

                `Langues officielles  \n` +
                `Statistique Canada respecte la Loi sur les langues officielles et s'engage à ce que les produits d'information disponibles soient d'égale qualité en français et en anglais. \n` +
                `http://www.statcan.gc.ca/fra/rb/blogue2 \n\n` +

                `Avis de l’accessibilité \n` +
                `Le gouvernement du Canada est déterminé à maintenir une norme d'accessibilité élevée conformément à la Norme sur l’optimisation des sites Web et des applications pour appareils mobiles. Veuillez communiquer avec nous si vous éprouvez des difficultés à utiliser nos pages Web, les applications ou les applications mobiles axées sur l'appareil, ou si vous désirez obtenir des formats de substitution comme le caractère ordinaire, le Braille ou un autre format approprié. \n` +
                `http://www.statcan.gc.ca/fra/reference/avisaccess \n\n` +

                `Utilisation du contenu \n` +
                `L’application sert non pas à fournir du contenu, mais bien à recueillir des renseignements. Vous ne pouvez pas modifier l’application ou le contenu ni l’utiliser à des fins commerciales. \n\n` +

                `Code d’identification unique \n` +
                `Un code d’identification unique, généré de façon aléatoire, sera intégré à votre appareil lors du téléchargement de l’application. Il sera utilisé chaque fois que vous soumettrez des renseignements, ce qui permettra à vos données d’être combinées à celles soumises précédemment. Ce code d’identification sera retiré de votre appareil si vous supprimez l’application. \n\n` +

                `Lois applicables \n` +
                `La présente application et ses conditions générales sont régies par les lois de la province de l’Ontario et les lois applicables du Canada. \n\n` +

                `Toute procédure judiciaire se rapportant à la présente application et à ses conditions générales ne pourra être portée que devant les tribunaux de l’Ontario ou la Cour fédérale du Canada. \n\n` +

                `Limitation de la responsabilité \n` +
                `Le gouvernement du Canada, ses représentants, fonctionnaires, employés et/ou mandataires ne peuvent être tenus responsables d’une blessure subie par une personne, y compris son décès, ou d’une perte ou d’un dommage causé aux biens d’une personne, par suite de l’utilisation de l’application. En téléchargeant ou en utilisant cette application ou toute page de cette application ou en y accédant, vous indiquez que vous consentez au présent avis de non-responsabilité. L’utilisation d’un téléphone mobile au volant est généralement considérée comme dangereuse en raison de son potentiel de distraction et des risques d’accidents qu’elle entraîne. L’usage du téléphone en général ou les activités telles que les appels vocaux, l’échange de messages texte, la navigation sur le Web, les jeux vidéo et l’utilisation d’applications mobiles peuvent accroître le risque d’accident. L’utilisation de cette application ne doit se faire que lorsque cela est approprié et sûr. \n\n` +

                `Avis de divulgations \n` +
                `Statistique Canada peut divulguer des renseignements identificatoires lorsque le répondant a donné son consentement par écrit. \n\n` +

                `Droit d’auteur \n` +
                `L’information publiée par Statistique Canada sur l’application est assujettie à la Loi sur le droit d'auteur du Canada. \n\n` +

                `Avis concernant l'image de marque \n` +
                `La reproduction des symboles officiels du gouvernement du Canada, y compris le mot-symbole « Canada », les armoiries du Canada et le symbole du drapeau, à des fins commerciales ou non commerciales, est interdite sans autorisation écrite au préalable. \n` +
                `http://www.statcan.gc.ca/fra/reference/droit-auteur \n\n` +

                `Aucune garantie \n` +
                `Les renseignements contenus dans cette application sont fournis « tels quels », et Statistique Canada n’en fait aucune représentation et ne donne aucune garantie à leur égard, que ce soit de manière explicite ou implicite, et rejette expressément toute garantie implicite de qualité marchande ou d’adéquation de ces renseignements à une fin particulière. \n\n` +

                `Indemnité \n` +
                `Les utilisateurs de l’application indemnisent et dégagent Statistique Canada, ses représentants, fonctionnaires, employés et/ou mandataires et entrepreneurs de toute perte ou condition, qu’elle soit expresse, implicite ou légale, y compris les garanties et conditions implicites de qualité marchande, d’adéquation à une fin particulière, et de non-infraction. \n\n` +

                `Restrictions \n` +
                `L’utilisation de cette application est strictement assujettie à ses conditions générales. Les utilisateurs ne doivent pas : décompiler, réinventer, démonter ou tenter de détourner le code source de l’application; retirer, altérer ou obscurcir tout avis de propriété intellectuelle d’une partie de l’application; reproduire, modifier, améliorer l’application ou en obtenir des résultats altérés; distribuer, louer, vendre, revendre, transférer, afficher publiquement, transmettre ou exploiter l’application, ou en octroyer une licence; établir un lien avec une partie de l’application, en faire une image miroir ou la structurer à des fins illégales et non autorisées. Les utilisateurs doivent accepter de se conformer à toutes les lois, toutes les règles et tous les règlements applicables à l’utilisation de l’application. \n\n` +

                `Modification et accès \n` +
                `Statistique Canada se réserve le droit de modifier ou d’interrompre l’application pour quelque raison que ce soit et sans préavis. \n\n` +

                `Propriété \n` +
                `Statistique Canada garantit qu’il est le propriétaire légitime de l’application et des documents qui s’y rapportent, et qui font l’objet de la présente entente. \n\n` +

                `Maintenance et soutien \n` +
                `Statistique Canada pourrait ne pas offrir ni maintenance ni soutien pour l’application. Statistique Canada pourrait fournir des mises à jour périodiques de l’application, y compris la réparation d’erreurs du système et des améliorations.`,
            //Register screen
            "reg.pass.validation.empty": "Le mot de passe ne peut pas être vide",
            "reg.pass.validation.min_eight": "Le mot de passe doit comporter au moins 8 caractères",
            "reg.pass.validation.upper": " Le mot de passe doit contenir au moins une majuscule",
            "reg.pass.validation.special": "Le mot de passe doit contenir au moins un caractère spécial",
            "reg.pass.validation.lower": "Le mot de passe doit contenir au moins une minuscule",
            "reg.pass.validation.number": "Le mot de passe doit contenir au moins une minuscule",
            "reg.ques.select": "Choisir une question",
            "reg.ques.mother": "Quel est le nom de jeune fille de votre mère?\n",
            "reg.ques.school": "Quel était le nom de votre école primaire?\n",
            "reg.ques.car": "Quelle a été votre première voiture?\n",
            "reg.ques.sport": "Quel est votre jeu ou sport préféré?\n",
            "reg.ques.job": "Quel a été votre premier emploi?",
            "reg.action.create": "Créer",
            "Password Requirements": "Exigences de mot de passe",
            "reg.pass.hint_length": "8 caractères minimum",
            "reg.pass.hint_upper": "une majuscule",
            "reg.pass.hint_special": "un caractère spécial",
            "reg.pass.hint_lower": "une minuscule",
            "reg.pass.hint_number": "un chiffre",
            "reg.pass_conf.empty": "Le mot de passe ne peut pas être vide",
            "reg.pass_conf.match": "Les mots de passe ne correspondent pas",
            "reg.securityQuestion.validation":"la question sécrete est necessaire",
            "reg.securityQuestionAnswer.validation":"la réponse à la question secrète est necessaire",
            "reg.securityQuestionAnswerlength.validation":"la reponse doit etre au moins 4 characteres",

            //password recovery
            "password_recovery.title": "Récupération de mot de passe",
            "password_recovery_change.title": "Entrez un nouveau mot de passe",
            "password_recovery_change.enter_password": "Entrer le mot de passe",
            "password_recovery_change.confirm_password": "Confirmez le mot de passe",
            "password.recovery.incorrectAnswer":"Mauvaise réponse",
            //home screen
            "home_first_time_login_content": "Personnalisez le nombre de notifications et l’intervalle de temps  durant lequel vous les recevrez dans le menu des Paramètres.",
            //about
            "about_title": "",
            "about_content": `Pourquoi nous menons cette étude\n`+
                `L’objectif de cette enquête est de mieux comprendre le bien-être au quotidien des Canadiens et des Canadiennes en leur demandant de répondre à des questions sur les activités qu’ils entreprennent et les sentiments qu’ils éprouvent en temps réel. Pour ce faire, les participants devront télécharger une application sur leur téléphone intelligent et répondre à quelques questions à divers intervalles au cours de la journée, sur une courte période de temps. Les résultats obtenus nous aideront à établir des liens entre certaines activités et le bien-être, et nous permettront de développer des programmes qui amélioreront la vie des gens. À l’avenir, ce genre d’application pourrait servir à répondre à d’autres enquêtes de Statistique Canada de façon plus rapide et pratique.  \n\n` +

                `Les renseignements recueillis pourraient aussi être utilisés par Statistique Canada à d’autres fins statistiques et de recherche.  \n\n` +

                `Notifications \n` +
                `Cette application vous enverra une notification pour remplir un Bilan bien-être de 2 à 5 fois par jour. Vous pouvez personnaliser ces paramètres, y compris les moments où vous ne souhaitez pas être dérangé, à tout moment dans le menu des paramètres sur la page d’accueil de l’application. Si vous ne personnalisez pas les paramètres, vous recevrez par défaut 2 notifications à divers moments entre 8 h et 22 h. Si vous n’acceptez pas les notifications, vous pourrez tout de même remplir un Bilan bien-être quand vous le voudrez, mais la qualité de vos résultats pourrait en être affectée. \n\n` +
               
                `Autorisation et confidentialité  \n` +
                `Ces données sont recueillies en vertu de la Loi sur la statistique, Lois révisées du Canada (1985), chapitre S-19. Vos renseignements demeureront strictement confidentiels.  \n\n` +
               
                `Couplages d’enregistrements  \n` +
                `Afin d’améliorer la qualité des données tirées de cette enquête et de réduire le fardeau de réponse, Statistique Canada pourrait combiner les renseignements que vous fournissez avec ceux provenant d’autres enquêtes ou sources de données administratives.  \n\n` +

                `Temps requis pour remplir ce questionnaire  \n` +
                `Ce questionnaire prendra 2 minutes à remplir. Veuillez noter que vous ne serez pas en mesure de modifier les renseignements déclarés une fois votre questionnaire soumis.  \n\n` +

                `Pour parcourir le questionnaire \n` +
                `Utilisez les boutons Précédent et Suivant situés dans le coin inférieur droit de chaque page.  \n\n` +

                `Délai d’inactivité d’une session \n` +
                `Après 2 heures d’inactivité, votre session sera interrompue. Vous ne pourrez accéder à aucun renseignement qui n’a pas été sauvegardé.  \n\n` +

                `Après 7 minutes d’inactivité, Bilan bien-être se verrouille. Vous devrez entrer votre mot de passe pour continuer.  \n\n` +

                `Définitions et explications \n` +
                `Un bouton d’aide est disponible pour certaines questions. Appuyez sur ce bouton pour obtenir plus de renseignements ou des précisions. \n\n`+
                `Version`,
                
            "about_title_two": "FR_Authorization and confidentiality",
            "about_content_two": "FR_Data are collected under the authority Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
            "create_password": "Créer un mot de passe",
            "password": "Mot de passe",
            "confirm_password": "Confirmez le mot de passe",
            "the_answer_is:": "Réponse",
            "btn_create": "Créer",
            "login": "S'identifier",
            "start_survey": "COMMENCER",
            "settings": "Paramètres",
            "result": "Résultats",
            "about_the_survey": "A propos de l'enquête",
            "term_and_condition": "Terme et condition",
            "contact_us": "Contactez-nous",
            "warning": "Attention",
            "match_password_error": "Vous devez fournir un mot de passe, une question de sécurité et une réponse correspondants!",
            "ok": "D'accord",
            "terms_and_conditions_disagree": "Vous devez accepter les Conditions générales pour utiliser cette application. Sélectionnez « OK » pour modifier vos préférences, ou appelez-nous au 1-877-949-9492 pour obtenir plus de renseignements.",
            "term_and condition_content": "Lorsque vous continuez à utiliser cette application, cela signifie que vous acceptez automatiquement ces conditions générales.",

            "Your feeling this week": "Votre ressenti cette semaine",
            "Your feelings": "Aperçu de vos sentiments",
            "Detail": "Détail",
            "Summary": "Sommaire",
            "How you are feeling by location": "Vos sentiments:selon l’emplacement",
            "How you are feeling with others": "Vos sentiments:seul(e) ou avec d’autres",
            "How you are feeling by activity": "Vos sentiments:selon l’activité",
            "How you are feeling by location help": "C'est votre sentiment par emplacement",
            "How you are feeling with others help": "C'est votre sentiment avec les autres",
            "How you are feeling by activity help": "C'est votre sentiment par activité",
            "Your feeling help": "Ces résultats n’ont pas été validés par Statistique Canada. Pour plus d’informations et pour vous aider à interpréter vos résultats, veuillez consulter la Foire aux questions sur la page d’aide.",

            //Login screen
            "login.forgot_password": "Mot de passe oublié?",
            "login.login": "Entrer",
            "login.Wrongpassword.message":"mot de passe incorrect",
            

            "notifications": "Notifications",
            "wake_time": "Ne pas déranger avant",
            "sleep_time": "Ne pas déranger après",
            "number_notifications": "Nombre de notifications par jour",
            "language": "Langue",
            "about": "Information",
            "num_pings_dialog_title": "Nombre de notifications par jour",
            "ThankYouA": "Merci d’avoir rempli le bilan!",
            "ThankYouB": "Merci, voyez maintenant vos résultats!",
            "NoDataAlert": "Les résultats seront disponibles lorsque vous aurez rempli deux bilans bien-être.",
            "Enter password": "Entrer un mot de passe",
            "Well-Being Check": "Bilan bien-être",
            "Forgot your password": "Mot de passe oublié?",
            "Language": "English",
            "Secure your account": "Sécuriser votre compte",
            "contactus_title": "Nous Contacter",
            "contactus_email": "Courriel",
            "contactus_telephone": "Téléphone",
            "contactus_website": "Site Web",
            "contactus_mail": "Courrier",
            "contactus_text": `Statistique Canada\nÀ l’attention du directeur Jean Labbé\n150, promenade Tunney’s Pasture\nOttawa (Ontario)\nK1A 0T6`,

            
            //FAQ
            "faq.title": "FAQ",
            //---------------category1---------------
            "faq.category1": "Questions générales",
            
            //category1-Question1
            "faq.c1.q1": "Est-ce une enquête légitime de Statistique Canada?",
            "faq.c1.q1.a": "Oui. Vous trouverez de plus amples informations sur le site Web de Statistique Canada [à mettre à jour] http://www.statcan.gc.ca",
            
            //category1-Question2
            "faq.c1.q2": "Suis-je obligé de répondre à cette enquête?",
            "faq.c1.q2.a": "Non. La participation est volontaire.",

            //category1-Question3
            "faq.c1.q3": "Qui participe à cette enquête?  ",
            "faq.c1.q3.a": "Toute personne au Canada de plus de 15 ans qui possède un téléphone intelligent ou une tablette compatible peut télécharger l’application Bilan bien-être sur Google Play ou sur l’App Store pour participer à l’enquête. Vous pouvez participer avec ou sans code d’invitation.\n"+
             "Veuillez partager cette information avec vos amis afin qu’ils puissent eux aussi télécharger l’application.",
            
            //category1-Question4
            "faq.c1.q4": "Pourquoi menez-vous cette enquête?",
            "faq.c1.q4.a": "L’objectif de cette enquête est de mieux comprendre le bien-être au quotidien des Canadiens. Pour ce faire, nous leur avons posé des questions sur leurs activités et leurs sentiments au moment présent. Pour plus d’informations sur cette enquête, veuillez consulter [à mettre à jour] http://www.statcan.gc.ca.",

            //category1-Question5
            "faq.c1.q5": "Combien de temps me faudra-t-il pour terminer l’enquête?",
            "faq.c1.q5.a": "Le Bilan bien-être devrait prendre quotidiennement moins d’une minute à remplir. Vous pouvez choisir le nombre de fois que vous souhaitez participer chaque jour en personnalisant le nombre de notifications que vous recevrez dans le menu des paramètres. Nous vous demandons de participer à l’étude pendant un mois.",

            //---------------category2---------------
            "faq.category2": "Vie privée et confidentialité",

            //category2-Question1
            "faq.c2.q1": "Pourquoi ai-je besoin d’un mot de passe et d’une question de sécurité?",
            "faq.c2.q1.a": "Le Bilan bien-être demande aux utilisateurs de répondre quotidiennement à des questionnaires afin de déterminer la façon dont leurs sentiments changent dans différents contextes. En protégeant l’application par un mot de passe, nous pouvons nous assurer que la tendance de vos données n’a pas été influencée par d’autres personnes qui pourraient utiliser votre téléphone et accéder à l’application. De plus, le Bilan bien-être fournit aux utilisateurs un menu Résultats, qui affiche la tendance de vos sentiments autoévalués et de la façon dont ils sont liés à ce que vous faites, aux gens avec qui vous êtes et à l’endroit où vous vous trouvez. En protégeant l’application par un mot de passe, nous pouvons nous assurer que cette tendance n’est pas vue par d’autres personnes, à moins que vous vous connectiez à l’application et que vous choisissiez de la partager avec eux.\n\n"+
            "Statistique Canada ne recueille pas votre mot de passe lorsque vous le créez, et ne pourra donc pas vous aider à le réinitialiser si nécessaire. La question de sécurité fournit un deuxième niveau de sécurité, que vous pouvez utiliser pour réinitialiser votre mot de passe.",
             
            //category2-Question2
            "faq.c2.q2": "Puis-je changer mon mot de passe?",
            "faq.c2.q2.a": "Vous pouvez changer votre mot de passe en utilisant l’option « Mot de passe oublié » à l’écran d’ouverture de session. Vous devrez répondre à votre question de sécurité afin d’accéder à la fonction de réinitialisation du mot de passe.",
            
            //category2-Question3
            "faq.c2.q3": "Que faire si j’ai oublié mon mot de passe ou ma question de sécurité?",
            "faq.c2.q3.a": "Vous pouvez changer votre mot de passe en utilisant l’option « Mot de passe oublié » à l’écran d’ouverture de session. Vous devrez répondre à votre question de sécurité afin d’accéder à la fonction de réinitialisation du mot de passe. Si vous avez oublié la réponse à votre question de sécurité, vous devrez supprimer l’application et la télécharger à nouveau. Vos réponses précédentes ne seront plus accessibles dans votre menu Résultats, car l’application vous identifiera comme un nouvel utilisateur pour des raisons de sécurité.",
            
            //category2-Question4
            "faq.c2.q4": "Les informations que je fournis sont-elles confidentielles?",
            "faq.c2.q4.a": "Oui, Statistique Canada garantit la confidentialité de vos réponses en vertu de la Loi sur la statistique.\n\n"+
            "Les recherches, rapports ou publications basés sur cette enquête utiliseront uniquement des données agrégées et ne vous identifieront pas, ni aucune autre personne, comme étant affilié à cette enquête.",

             //category2-Question5
            "faq.c2.q5": "Quelles sont les données recueillies par le Bilan bien-être?",
            "faq.c2.q5.a": "L’application Bilan bien-être recueille les réponses que vous fournissez aux questionnaires, ainsi que le nombre de notifications que vous recevez chaque jour. Elle ne recueille pas votre mot de passe, votre question de sécurité et sa réponse, ni les données de votre appareil telles que l’emplacement et l’utilisation de l’application.",
            
            //category2-Question6
            "faq.c2.q6": "Comment mes données sont-elles stockées et transmises? Comment mes données seront-elles protégées?",
            "faq.c2.q6.a": "L’application Bilan bien-être est entièrement conforme à toutes les réglementations en matière de protection de la vie privée et de sécurité mises en place pour protéger les informations des Canadiens.\n\n"+
            "Le Bilan bien-être utilise le portail de collecte électronique de Statistique Canada pour recueillir vos réponses. Aucune donnée de l’application n’est stockée sur votre appareil après que vous les avez soumises. Pour plus d’informations sur les dispositifs de sécurité mis en place pour protéger vos données, veuillez consulter [à mettre à jour] http://www.statcan.gc.ca.",
            
            //category2-Question7
            "faq.c2.q7": "Je ne veux plus participer à cette enquête",
            "faq.c2.q7.a": "Si vous souhaitez, à tout moment, cesser de participer à l’enquête, vous pouvez désactiver les notifications dans le menu des paramètres ou supprimer l’application de votre appareil.",
          
            
            //---------------category3--------------- 
            "faq.category3": "Paramètres et notifications",

             //category3-Question1
             "faq.c3.q1": "Quelles notifications vais-je recevoir?",
             "faq.c3.q1.a": "L’application vous enverra une notification lorsqu’il sera temps de remplir un Bilan bien-être. Ces notifications sont envoyées à des moments aléatoires en fonction des paramètres que vous avez choisis dans votre menu de configuration. Vous pouvez modifier vos paramètres à tout moment.",
              
             //category3-Question2
             "faq.c3.q2": "Puis-je désactiver les notifications?",
             "faq.c3.q2.a": "Les notifications sont un élément essentiel de cette enquête, car elles vous permettent de savoir quand un Bilan bien-être peut être réalisé. Si vous avez besoin de désactiver les notifications, vous pouvez le faire dans le menu Paramètres.",
             
             //category3-Question3
             "faq.c3.q3": "Comment puis-je modifier mes paramètres?",
             "faq.c3.q3.a": "Vous pouvez modifier vos paramètres à tout moment dans le menu Paramètres, situé sur la page d’accueil de l’application.",
             
             //category3-Question4
             "faq.c3.q4": "Puis-je effectuer un Bilan bien-être si je n’ai pas reçu de notification?",
             "faq.c3.q4.a": "Bien sûr! Vous pouvez effectuer un Bilan bien-être à tout moment en appuyant sur COMMENCER, situé sur la page d’accueil de l’application.",
 
             //category3-Question5
             "faq.c3.q5": "Que se passe-t-il si j’ai manqué une notification et que j’en ai reçu une autre?",
             "faq.c3.q5.a": "Pas de problème! Bien que notre objectif soit que vous répondiez à toutes les notifications, nous comprenons que la vie peut être chargée et qu’il arrive parfois qu’une notification soit manquée. Répondez une fois en fonction de ce que vous faites et des personnes qui sont avec vous lorsque vous recevez la deuxième notification.",
             
             //category3-Question6
             "faq.c3.q6": "Pourquoi ne reçois-je plus de notifications?",
             "faq.c3.q6.a": "Si vous n’avez pas effectué de Bilan bien-être au cours des quatre derniers jours, l’application cessera de vous envoyer des notifications. Vous pouvez recommencer à recevoir des notifications en appuyant sur COMMENCER, situé sur la page d’accueil de l’application, et en remplissant un Bilan bien-être.\n\n"+
             "Le Bilan bien-être vous enverra des notifications pour une durée totale de 30 jours maximum. Au terme de cette période, votre participation à l’enquête est terminée et vous ne recevrez plus de notifications.\n\n"+
             "Si aucun de ces scénarios ne correspond à votre situation, veuillez nous contacter au 1-877-949-9492.",

            //---------------category4---------------
            "faq.category4": "Le menu Résultats",

            //category4-Question1
            "faq.c4.q1": "Que me dit le menu Résultats? Comment puis-je interpréter mes résultats?",
            "faq.c4.q1.a": "Les visualisations de données du menu Résultats donnent un aperçu de vos sentiments autoévalués et de leur lien avec ce que vous faites, les personnes avec qui vous êtes et l’endroit où vous vous trouvez.\n\n"+
            "Pour faciliter l’interprétation, vos activités et vos compagnons ont été regroupés. Veuillez noter que toutes les questions relatives aux sentiments sont évaluées sur une échelle de 1 à 10, où 1 signifie « pas du tout » et 10 signifie « très ». En fonction de cette échelle, une cote élevée de sentiment de bonheur par rapport à une cote élevée de sentiment d’anxiété serait interprétée de manière très différente.\n\n"+
            "Ces résultats sont communiqués en temps réel et n’ont pas été validés par Statistique Canada. Il convient d’être prudent lors de l’interprétation des données.",
           
            //---------------category5---------------
            "faq.category5": "Difficultés techniques",
             
            //category5-Question1
            "faq.c5.q1": "Je ne peux pas accéder aux questionnaires ou à mes résultats",
            "faq.c5.q1.a": "Le portail du questionnaire et le menu Résultats nécessitent une connexion aux données ou une connexion Wi-Fi pour fonctionner. Si le problème persiste après avoir vérifié votre connexion, veuillez nous contacter au 1-877-949-9492.",
            
            //category5-Question3
            "faq.c5.q2": "Je rencontre d’autres difficultés techniques",
            "faq.c5.q2.a": "Si vous rencontrez des problèmes d’affichage, des pannes ou d’autres bogues, veuillez nous contacter au 1-877-949-9492.",
            
            //category5-Question4
            "faq.c5.q3": "Puis-je télécharger l’application sur plusieurs appareils et la synchroniser?",
            "faq.c5.q3.a": "L’application n’a pas de capacités de synchronisation.\n\n"+
            "Votre participation à l’enquête est basée sur l’appareil sur lequel vous avez téléchargé l’application Bilan bien-être pour la première fois. Si vous téléchargez l’application sur un autre appareil, vous serez identifié comme un nouvel utilisateur pour des raisons de sécurité, et vos réponses précédentes ne seront plus accessibles dans le menu Résultats.",

            //category5-Question5
            "faq.c5.q4": "Quelle est la quantité de mémoire requise par l’application?",
            "faq.c5.q4.a": "L’application Bilan bien-être nécessite 53 Mo sur les appareils Apple et 90 Mo sur les appareils Android.",

            //category5-Question5
            "faq.c5.q5": "Combien de données l’application nécessite-t-elle?",
            "faq.c5.q5.a": "[tbd]",

            "offline":"Vous êtes hors ligne, essayez-le plus tard.",
            "securityIssue":"Erreur de serveur interne, essayez à nouveau, si la même chose se reproduit, contactez StatCan",
            //Session
            "session.modal.title": "",
            "session.modal.message": "Votre session a expiré. Veuillez vous connecter à nouveau.",
            "session.modal.sign_in": "Ouvrir une session",

            //Internet connection
            "internet.offline":"Aucune connexion à Internet. Veuillez vérifier que vous êtes bien connecté.",

            //Network error jwt
            "network.error.jwt":"Erreur d'initialisation JSON Web Token , s'il vous plaît réessayer plus tard.",
            "network.error.pwd":"Erreur d'initialisation de mot de passe, s'il vous plaît reéssayer plus tard.",
            "network.error.general":"Erreur de reseau, s'il vous plaît réessayer plus tard.",
           
            //Notification Request
            "notification.resquest.title":"",
            "notification.resquest.message":"Accédez aux paramètres de votre appareil pour activer les notifications?",

            //Notification messages
            "notification.scheduleTitle":"Notification planifiée",
            "notification.scheduleMessage":"Comment vous sentez-vous en ce moment? Connectez-vous pour obtenir un Bilan bien-être!",
            "notification.lastAttemptMessage":"Nous n’avons pas eu de vos nouvelles depuis un certain temps. Connectez-vous pour obtenir un Bilan bien-être!",
          
            //time picker title
            "timepicker.title":"Choisir une heure",
            "timepicker.canceltext":"Annuler",
            "timepicker.confirmtext":"Confirmer",
            
              "scheduleTitle":"Notification planifiée",
              "scheduleMessage":"Comment vous sentez-vous en ce moment? Connectez-vous pour obtenir un Bilan bien-être!",
              "scheduleMessage1":"Nous n’avons pas eu de vos nouvelles depuis un certain temps. Connectez-vous pour obtenir un Bilan bien-être!",
              "cancel":"Annuler",
              "continue":"Continuer",
              "settingValidation":"Il doit avoir un minimum de 3 heures entre les réglages « Ne pas déranger avant » et « Ne pas déranger après »",
              "donotdisturbbetween":"Ne dérangez pas entre",
              "from":"De:",
              "to":"À:",
              "rateAppMsg":"Dites-nous ce que vous pensez de l’application en l’évaluant sur",
              "feedback":"Nous aimons votre rétroaction!",
              "ratenow":"Évaluez maintenant",
              "later":"Non merci",
        }
    }
};
