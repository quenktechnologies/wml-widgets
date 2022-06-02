"use strict";
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
exports.validationState2ClassName = exports.getMessage = exports.getValidityClassName = exports.getValidationState = exports.removeValidationState = exports.setValidationState = exports.removeMessage = exports.setMessage = exports.AbstractFeedbackControl = exports.ValidationState = void 0;
var style = require("../content/style");
var document = require("@quenk/wml/lib/dom");
var util_1 = require("../util");
var control_1 = require("../control");
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
var AbstractFeedbackControl = /** @class */ (function (_super) {
    __extends(AbstractFeedbackControl, _super);
    function AbstractFeedbackControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AbstractFeedbackControl.prototype.setMessage = function (msg) {
        exports.setMessage(this.view, this.values.messages.wml.id, msg);
        return this;
    };
    AbstractFeedbackControl.prototype.removeMessage = function () {
        exports.removeMessage(this.view, this.values.messages.wml.id);
        return this;
    };
    AbstractFeedbackControl.prototype.setValidationState = function (state) {
        exports.setValidationState(this.view, this.values.control.wml.id, state);
        return this;
    };
    AbstractFeedbackControl.prototype.removeValidationState = function () {
        exports.removeValidationState(this.view, this.values.control.wml.id);
        return this;
    };
    AbstractFeedbackControl.prototype.getValidationState = function () {
        return exports.getValidationState(this.view, this.values.control.wml.id);
    };
    return AbstractFeedbackControl;
}(control_1.AbstractControl));
exports.AbstractFeedbackControl = AbstractFeedbackControl;
/**
 * setMessage helper.
 */
exports.setMessage = function (view, id, msg) {
    return util_1.getById(view, id)
        .map(function (messages) {
        var node = document.createTextNode(msg);
        while (messages.lastChild)
            messages.removeChild(messages.lastChild);
        messages.appendChild(node);
    });
};
/**
 * removeMessage
 */
exports.removeMessage = function (view, id) {
    return util_1.getById(view, id)
        .map(function (messages) {
        while (messages.lastChild)
            messages.removeChild(messages.lastChild);
    });
};
/**
 * setValidationState helper.
 */
exports.setValidationState = function (view, id, state) {
    exports.removeValidationState(view, id);
    if (state !== ValidationState.Neutral)
        util_1.getById(view, id)
            .map(function (e) { return e.classList.add(exports.validationState2ClassName(state)); });
};
/**
 * removeValidationState helper.
 */
exports.removeValidationState = function (view, id) {
    util_1.getById(view, id)
        .map(function (h) {
        h.classList.remove(style.SUCCESS);
        h.classList.remove(style.ERROR);
        h.classList.remove(style.WARNING);
    });
};
/**
 * getValidationState calculates the ValidationState of an HTMLElement
 * (identified by id) by analysing its class list.
 */
exports.getValidationState = function (view, id) {
    return util_1.getById(view, id)
        .map(function (h) {
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
};
/**
 * getValidityClassName provides the applicable style class by checking
 * the validity properties of FeedbackControAttrs.
 */
exports.getValidityClassName = function (attrs) {
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
exports.getMessage = function (attrs) {
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
exports.validationState2ClassName = function (state) {
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