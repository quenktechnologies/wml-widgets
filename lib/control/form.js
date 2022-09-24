"use strict";
/**
 * The form module deals with controls specifically for accepting user input.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeMessage = exports.setMessage = exports.getLabel = exports.AbstractFormControl = void 0;
const util_1 = require("../util");
const feedback_1 = require("./feedback");
/**
 * AbstractFormControl provides a base implementation of a
 * FormControl.
 */
class AbstractFormControl extends feedback_1.AbstractFeedbackControl {
}
exports.AbstractFormControl = AbstractFormControl;
/**
 * getLabel extracts the label value from FromControlAttrs.
 */
const getLabel = (attrs) => (attrs && attrs.label) ? attrs.label : '';
exports.getLabel = getLabel;
/**
 * setMessage helper.
 *
 * Sets the message on the Help widget.
 */
const setMessage = (view, id, msg) => {
    (0, util_1.getById)(view, id).map(h => { h.setMessage(msg); });
};
exports.setMessage = setMessage;
/**
 * removeMessage helper.
 *
 * Removes the message from the Help widget.
 */
const removeMessage = (view, id) => {
    (0, util_1.getById)(view, id).map(h => { h.removeMessage(); });
};
exports.removeMessage = removeMessage;
//# sourceMappingURL=form.js.map