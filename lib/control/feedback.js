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
var style = require("../content/style");
var Maybe_1 = require("afpl/lib/monad/Maybe");
var control_1 = require("../control");
exports.NEUTRAL = 0x0;
exports.ERROR = 0x1;
exports.SUCCESS = 0x2;
exports.WARNING = 0x3;
/**
 * ValidationState
 */
var ValidationState;
(function (ValidationState) {
    ValidationState[ValidationState["NEUTRAL"] = 0] = "NEUTRAL";
    ValidationState[ValidationState["ERROR"] = 1] = "ERROR";
    ValidationState[ValidationState["SUCCESS"] = 2] = "SUCCESS";
    ValidationState[ValidationState["WARNING"] = 3] = "WARNING";
})(ValidationState = exports.ValidationState || (exports.ValidationState = {}));
/**
 * GenericFeedbackControl provides a base implementation of a FeedbackControl.
 */
var GenericFeedbackControl = /** @class */ (function (_super) {
    __extends(GenericFeedbackControl, _super);
    function GenericFeedbackControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.setMessage = exports.setMessage(_this)(_root(_this));
        _this.success = exports.success(_this)(_root(_this));
        _this.warning = exports.warning(_this)(_root(_this));
        _this.error = exports.error(_this)(_root(_this));
        _this.neutral = exports.neutral(_this)(_root(_this));
        _this.getValidationState = exports.getValidationState(_root(_this));
        return _this;
    }
    return GenericFeedbackControl;
}(control_1.GenericControl));
exports.GenericFeedbackControl = GenericFeedbackControl;
var _root = function (c) { return function () { return c.view.findById(c.values.root.id); }; };
/**
 * setState helper.
 */
exports.setState = function (c) { return function (fn) { return function (state) { return function (m) {
    if (m === void 0) { m = ''; }
    return Maybe_1.Maybe
        .fromAny(c.neutral())
        .map(function (c) { return c.setMessage(m); })
        .chain(function () { return fn(); })
        .map(function (e) { return e.classList.add(state); })
        .map(function () { return c; })
        .get();
}; }; }; };
/**
 * success helper.
 */
exports.success = function (c) { return function (fn) { return exports.setState(c)(fn)(style.SUCCESS); }; };
/**
 * warning helper.
 */
exports.warning = function (c) { return function (fn) { return exports.setState(c)(fn)(style.WARNING); }; };
/**
 * error helper.
 */
exports.error = function (c) { return function (fn) { return exports.setState(c)(fn)(style.ERROR); }; };
/**
 * setMessage helper.
 */
exports.setMessage = function (c) { return function (fn) { return function (msg) {
    return fn()
        .map(function (message) {
        var node = document.createTextNode(msg);
        if (message.firstChild) {
            message.replaceChild(node, message.firstChild);
        }
        else {
            message.appendChild(node);
        }
    })
        .map(function () { return c; })
        .orJust(function () { return c; })
        .get();
}; }; };
/**
 * neutral clears validation states from a control.
 */
exports.neutral = function (c) { return function (fn) { return function () {
    return fn()
        .map(function (h) {
        h.classList.remove(style.SUCCESS);
        h.classList.remove(style.ERROR);
        h.classList.remove(style.WARNING);
    })
        .map(function () { return c.setMessage(''); })
        .orJust(function () { return c; })
        .get();
}; }; };
/**
 * getValidationState default.
 */
exports.getValidationState = function (fn) { return function () {
    return fn()
        .map(function (h) { return h.classList.contains(style.SUCCESS) ?
        exports.SUCCESS :
        h.classList.contains(style.WARNING) ?
            exports.WARNING :
            h.classList.contains(style.ERROR) ?
                exports.ERROR : exports.NEUTRAL; })
        .get();
}; };
/**
 * selectState from an attribute list.
 */
exports.selectState = function (attrs) {
    return attrs.success ? style.SUCCESS :
        attrs.error ? style.ERROR :
            attrs.warning ? style.WARNING : '';
};
//# sourceMappingURL=feedback.js.map