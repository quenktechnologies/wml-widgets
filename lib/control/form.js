"use strict";
/**
 * The form module deals with controls specifically for accepting user input.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeMessage = exports.setMessage = exports.getLabel = exports.AbstractFormControl = void 0;
var util_1 = require("../util");
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
/**
 * getLabel extracts the label value from FromControlAttrs.
 */
exports.getLabel = function (attrs) { return (attrs.ww && attrs.ww.label) ? attrs.ww.label : ''; };
/**
 * setMessage helper.
 *
 * Sets the message on the Help widget.
 */
exports.setMessage = function (view, id, msg) {
    util_1.getById(view, id).map(function (h) { h.setMessage(msg); });
};
/**
 * removeMessage helper.
 *
 * Removes the message from the Help widget.
 */
exports.removeMessage = function (view, id) {
    util_1.getById(view, id).map(function (h) { h.removeMessage(); });
};
//# sourceMappingURL=form.js.map