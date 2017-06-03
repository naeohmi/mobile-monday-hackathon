import React, { Component } from 'react';
// import WatsonTranslate from 'watson-developer-cloud/language-translator/v2';
const WatsonTranslate = require('watson-developer-cloud/language-translator/v2');

class Translate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            txtToTrans: "",
            lang: "",
            txtTranslated: "",
            langTranslator: new WatsonTranslate({
                username: "03c873f2-9275-4f44-9517-e7aca0400674",
                password: "Oh8O37TadUu7",
                url: "https://gateway.watsonplatform.net/language-translator/api",
            })
        }
        this.componentDidMount = this.componentDidMount.bind(this);
        this.callWatson = this.callWatson.bind(this);

    }
    // this.translateText = this.translateText.bind(this);
    //initialize IMB Watson
    componentDidMount() {
        console.log(this.state.langTranslator)
        if (this.props.input) {
            console.log("componentDidMount is alive")
            this.state.langTranslator.translate({
                text: this.props.input,
                source: 'en',
                target: 'es'
            },

                function (err, translation) {
                    if (err) {
                        console.log('error:', err);
                    }
                    else {
                        console.log(JSON.stringify(translation, null, 2));
                    }
                }

            )
        } else {
            alert('not an input');
        }
    }

    callWatson() {

    }

    // translateText() {
    //   this.setState.langTranslator = new WatsonTranslate({

    //   })

    render() {

        return (
            <div>
                <h1 className="lang">{this.state.lang}</h1>
                <p className="translated-txt">{this.state.txtTranslated}</p>
            </div>

        )
    }
}
export default Translate;