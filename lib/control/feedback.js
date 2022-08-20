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
        exports.setMessage(this.view, this.values.messages.wml.id, msg);
        return this;
    }
    removeMessage() {
        exports.removeMessage(this.view, this.values.messages.wml.id);
        return this;
    }
    setValidationState(state) {
        exports.setValidationState(this.view, this.values.control.wml.id, state);
        return this;
    }
    removeValidationState() {
        exports.removeValidationState(this.view, this.values.control.wml.id);
        return this;
    }
    getValidationState() {
        return exports.getValidationState(this.view, this.values.control.wml.id);
    }
}
exports.AbstractFeedbackControl = AbstractFeedbackControl;
/**
 * setMessage helper.
 */
exports.setMessage = (view, id, msg) => util_1.getById(view, id)
    .map(messages => {
    let node = document.createTextNode(msg);
    while (messages.lastChild)
        messages.removeChild(messages.lastChild);
    messages.appendChild(node);
});
/**
 * removeMessage
 */
exports.removeMessage = (view, id) => util_1.getById(view, id)
    .map(messages => {
    while (messages.lastChild)
        messages.removeChild(messages.lastChild);
});
/**
 * setValidationState helper.
 */
exports.setValidationState = (view, id, state) => {
    exports.removeValidationState(view, id);
    if (state !== ValidationState.Neutral)
        util_1.getById(view, id)
            .map(e => e.classList.add(exports.validationState2ClassName(state)));
};
/**
 * removeValidationState helper.
 */
exports.removeValidationState = (view, id) => {
    util_1.getById(view, id)
        .map((h) => {
        h.classList.remove(style.SUCCESS);
        h.classList.remove(style.ERROR);
        h.classList.remove(style.WARNING);
    });
};
/**
 * getValidationState calculates the ValidationState of an HTMLElement
 * (identified by id) by analysing its class list.
 */
exports.getValidationState = (view, id) => util_1.getById(view, id)
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
/**
 * getValidityClassName provides the applicable style class by checking
 * the validity properties of FeedbackControAttrs.
 */
exports.getValidityClassName = (attrs) => {
    if (attrs.ww) {
        if (attrs.ww.error && (attrs.ww.error != ''))
            return style.ERROR;
        if (attrs.ww.warning && (attrs.ww.warning != ''))
            return style.WARNING;
        if (attrs.ww.success && (attrs.ww.success != ''))
            return style.SUCCESS;
    }
    return '';
};
/**
 * getMessage
 */
exports.getMessage = (attrs) => {
    if (attrs.ww) {
        if (attrs.ww.error && (attrs.ww.error != ''))
            return attrs.ww.error;
        if (attrs.ww.warning && (attrs.ww.warning != ''))
            return attrs.ww.warning;
        if (attrs.ww.success && (attrs.ww.success != ''))
            return attrs.ww.success;
        if (attrs.ww.message && (attrs.ww.message != ''))
            return attrs.ww.message;
    }
    return '';
};
/**
 * validationState2ClassName transforms a ValidationState into
 * the corresponding class name (if any).
 */
exports.validationState2ClassName = (state) => {
    if (state === ValidationState.Success)
        return style.SUCCESS;
    else if (state === ValidationState.Warning)
        return style.WARNING;
    else if (state === ValidationState.Error)
        return style.ERROR;
    else
        return '';
};
//# sourceMappingURL=feedback.js.map