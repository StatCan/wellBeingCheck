//Use our own localization component instead of i18n, because i18n will change users localization setting---Jiandong
resources={
culture:'en',
getString:function(key){
    return this.data[this.culture][key];
},
data: {
        en: {
            "create_password":"Create Password",
            "password" : "Password",
            "confirm_password":"Confirm Password",
            "the_answer_is:":"The answer is:",
            "btn_create" : "Create",
            "login":"Login",
            "start_survey":"Start Survey",
            "settings":"Settings",
            "result":"Result",
            "about_the_survey":"About the Survey",
            "term_and_condition":"Term & Condition",
            "contact_us":"Contact us",
            "warning":"Warning",
            "match_password_error":"You must provide matched password and secrity question and answer !",
            "ok":"Ok",
            "term_and condition_content":"When you continue use this app, that means you automatically agree on this Term and condition.",
        },
        fr: {
            "create_password":"Créer un mot de passe",
            "password" : "Mot de passe",
            "confirm_password":"Confirmez le mot de passe",
            "the_answer_is:":"La réponse est:",
            "btn_create" : "Créer",
            "login":"S'identifier",
            "start_survey":"Commencer l'enquête",
            "settings":"Paramètres",
            "result":"Résultat",
            "about_the_survey":"A propos de l'enquête",
            "term_and_condition":"Terme et condition",
            "contact_us":"Contactez nous",
            "warning":"Attention",
            "match_password_error":"Vous devez fournir un mot de passe, une question de sécurité et une réponse correspondants!",
            "ok":"D'accord",
            "term_and condition_content":"Lorsque vous continuez à utiliser cette application, cela signifie que vous acceptez automatiquement ces conditions générales.",
        }
    }
};