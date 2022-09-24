"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationState2ClassName = exports.getMessage = exports.getValidityClassName = exports.getValidationState = exports.removeValidationState = exports.setValidationState = exports.removeMessage = exports.setMessage = exports.AbstractFeedbackControl = exports.ValidationState = void 0;
const style = require("../content/style");
const document = require("@quenk/wml/lib/dom");
const util_1 = require("../util");
const control_1 = require("../control");
/**
 * ValidationState
 */
var ValidationState;
(function (ValidationState) {
    ValidationState["Neutral"] = "neutral";
    ValidationState["Error"] = "error";
    ValidationState["Success"] = "success";
    ValidationState["Warning"] = "warning";
})(ValidationState = exports.ValidationState || (exports.ValidationState = {}));
/**
 * AbstractFeedbackControl
 *
 * Provides a default implementaion of the interface methods.
 */
class AbstractFeedbackControl extends control_1.AbstractControl {
    setMessage(msg) {
        (0, exports.setMessage)(this.view, this.values.messages.wml.id, msg);
        return this;
    }
    removeMessage() {
        (0, exports.removeMessage)(this.view, this.values.messages.wml.id);
        return this;
    }
    setValidationState(state) {
        (0, exports.setValidationState)(this.view, this.values.control.wml.id, state);
        return this;
    }
    removeValidationState() {
        (0, exports.removeValidationState)(this.view, this.values.control.wml.id);
        return this;
    }
    getValidationState() {
        return (0, exports.getValidationState)(this.view, this.values.control.wml.id);
    }
}
exports.AbstractFeedbackControl = AbstractFeedbackControl;
/**
 * setMessage helper.
 */
const setMessage = (view, id, msg) => (0, util_1.getById)(view, id)
    .map(messages => {
    let node = document.createTextNode(msg);
    while (messages.lastChild)
        messages.removeChild(messages.lastChild);
    messages.appendChild(node);
});
exports.setMessage = setMessage;
/**
 * removeMessage
 */
const removeMessage = (view, id) => (0, util_1.getById)(view, id)
    .map(messages => {
    while (messages.lastChild)
        messages.removeChild(messages.lastChild);
});
exports.removeMessage = removeMessage;
/**
 * setValidationState helper.
 */
const setValidationState = (view, id, state) => {
    (0, exports.removeValidationState)(view, id);
    if (state !== ValidationState.Neutral)
        (0, util_1.getById)(view, id)
            .map(e => e.classList.add((0, exports.validationState2ClassName)(state)));
};
exports.setValidationState = setValidationState;
/**
 * removeValidationState helper.
 */
const removeValidationState = (view, id) => {
    (0, util_1.getById)(view, id)
        .map((h) => {
        h.classList.remove(style.SUCCESS);
        h.classList.remove(style.ERROR);
        h.classList.remove(style.WARNING);
    });
};
exports.removeValidationState = removeValidationState;
/**
 * getValidationState calculates the ValidationState of an HTMLElement
 * (identified by id) by analysing its class list.
 */
const getValidationState = (view, id) => (0, util_1.getById)(view, id)
    .map(h => {
    if (h.classList.contains(style.SUCCESS))
        return ValidationState.Success;
    else if (h.classList.contains(style.WARNING))
        return ValidationState.Warning;
    else if (h.classList.contains(style.ERROR))
        return ValidationState.Error;
    else
        return ValidationState.Neutral;
})
    .get();
exports.getValidationState = getValidationState;
/**
 * getValidityClassName provides the applicable style class by checking
 * the validity properties of FeedbackControAttrs.
 */
const getValidityClassName = (attrs) => {
    if (attrs) {
        if (attrs.error && (attrs.error != ''))
            return style.ERROR;
        if (attrs.warning && (attrs.warning != ''))
            return style.WARNING;
        if (attrs.success && (attrs.success != ''))
            return style.SUCCESS;
    }
    return '';
};
exports.getValidityClassName = getValidityClassName;
/**
 * getMessage
 */
const getMessage = (attrs) => {
    if (attrs) {
        if (attrs.error && (attrs.error != ''))
            return attrs.error;
        if (attrs.warning && (attrs.warning != ''))
            return attrs.warning;
        if (attrs.success && (attrs.success != ''))
            return attrs.success;
        if (attrs.message && (attrs.message != ''))
            return attrs.message;
    }
    return '';
};
exports.getMessage = getMessage;
/**
 * validationState2ClassName transforms a ValidationState into
 * the corresponding class name (if any).
 */
const validationState2ClassName = (state) => {
    if (state === ValidationState.Success)
        return style.SUCCESS;
    else if (state === ValidationState.Warning)
        return style.WARNING;
    else if (state === ValidationState.Error)
        return style.ERROR;
    else
        return '';
};
exports.validationState2ClassName = validationState2ClassName;
//# sourceMappingURL=feedback.js.map