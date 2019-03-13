"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var views = require("./wml/text-field");
var feedback_1 = require("../../../../../lib/control/feedback");
var TextFieldPage = /** @class */ (function () {
    function TextFieldPage() {
        var _this = this;
        this.id = 'text';
        this.view = new views.Main(this);
        this.onChange = function (_a) {
            var name = _a.name, value = _a.value;
            var maybeField = _this.view.findById(name);
            if (maybeField.isJust()) {
                var t = maybeField.get();
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
                t.setMessage("Message: " + value);
            }
        };
    }
    return TextFieldPage;
}());
exports.TextFieldPage = TextFieldPage;
exports.default = new TextFieldPage();
//# sourceMappingURL=index.js.map