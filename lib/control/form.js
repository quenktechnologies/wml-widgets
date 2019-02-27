"use strict";
/**
 * The form module deals with controls specifically for accepting user input.
 */
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
/** imports */
var feedback_1 = require("./feedback");
/**
 * AbstractFormControl provides a base implementation of a
 * FormControl.
 */
var AbstractFormControl = /** @class */ (function (_super) {
    __extends(AbstractFormControl, _super);
    function AbstractFormControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AbstractFormControl;
}(feedback_1.AbstractFeedbackControl));
exports.AbstractFormControl = AbstractFormControl;
//# sourceMappingURL=form.js.map