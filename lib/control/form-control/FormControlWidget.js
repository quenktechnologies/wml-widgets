"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var control_1 = require("../../control");
var feedback_control_1 = require("../../control/feedback-control");
/**
 * FormControlWidget implements the minimumn API required for a FormControl.
 */
var FormControlWidget = /** @class */ (function (_super) {
    __extends(FormControlWidget, _super);
    function FormControlWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * delegate is read from the attrs passed to the FormControlWidget.
         *
         * If no delegate is found, an instance of DefaultDelegate is generated.
         */
        _this.delegate = (_this.attrs.ww && _this.attrs.ww.delegate) ?
            _this.attrs.ww.delegate : new control_1.DefaultDelegate(_this.attrs.ww);
        return _this;
    }
    return FormControlWidget;
}(feedback_control_1.FeedbackControlWidget));
exports.FormControlWidget = FormControlWidget;
//# sourceMappingURL=FormControlWidget.js.map