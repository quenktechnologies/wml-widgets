"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextFieldPage = void 0;
const views = require("./wml/text-field");
const feedback_1 = require("../../../../../lib/control/feedback");
class TextFieldPage {
    constructor() {
        this.id = 'text';
        this.view = new views.Main(this);
        this.onChange = ({ name, value }) => {
            let maybeField = this.view.findById(name);
            if (maybeField.isJust()) {
                let t = maybeField.get();
                switch (value) {
                    case 'neutral':
                        t.setValidationState(feedback_1.ValidationState.Neutral);
                        break;
                    case 'error':
                        t.setValidationState(feedback_1.ValidationState.Error);
                        break;
                    case 'success':
                        t.setValidationState(feedback_1.ValidationState.Success);
                        break;
                    case 'warning':
                        t.setValidationState(feedback_1.ValidationState.Warning);
                        break;
                    default:
                        break;
                }
                t.setMessage(`Message: ${value}`);
            }
        };
    }
}
exports.TextFieldPage = TextFieldPage;
exports.default = new TextFieldPage();
//# sourceMappingURL=index.js.map