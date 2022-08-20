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
exports.getLabel = (attrs) => (attrs.ww && attrs.ww.label) ? attrs.ww.label : '';
/**
 * setMessage helper.
 *
 * Sets the message on the Help widget.
 */
exports.setMessage = (view, id, msg) => {
    util_1.getById(view, id).map(h => { h.setMessage(msg); });
};
/**
 * removeMessage helper.
 *
 * Removes the message from the Help widget.
 */
exports.removeMessage = (view, id) => {
    util_1.getById(view, id).map(h => { h.removeMessage(); });
};
//# sourceMappingURL=form.js.map