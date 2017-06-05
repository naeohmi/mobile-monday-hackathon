//imported in package.json
const WatsonTranslate = require('watson-developer-cloud/language-translator/v2');

export default {
    //inits watson translate
    watson: new WatsonTranslate({
        username: "03c873f2-9275-4f44-9517-e7aca0400674",
        password: "Oh8O37TadUu7",
        url: "https://gateway.watsonplatform.net/language-translator/api",
    }),
    //translates the text input
    changeText: (inputText, Nativelang, ForiegnLang) => {
        console.log(inputText, Nativelang, ForiegnLang);
        let promise = new Promise((resolve) => {
            this.a.watson.translate({
                text: inputText,
                source: Nativelang, //TODO: change from user pref
                target: ForiegnLang //TODO: need to change this from user data
            },
                function (err, translation) {
                    if (err) {
                        console.log('error:', err);
                    }
                    else {
                        console.log(JSON.stringify(translation, null, 2));
                        resolve(translation)
                    }
                }
            )
        })
        return promise
    },












}
