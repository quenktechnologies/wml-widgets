"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var names = require("../../content/style");
/**
 * @module control/feedback
 */
exports.NEUTRAL = 0x0;
exports.ERROR = 0x1;
exports.SUCCESS = 0x2;
exports.WARNING = 0x3;
/**
 * setState helper for changing the state of the displayed DOM.
 */
exports.setState = function (c) { return function (state) {
    return c
        .clear()
        .view
        .findById(c.values.root.id)
        .map(function (e) { return e.classList.add(state); })
        .map(function () { return c; })
        .orJust(function () { return c; })
        .get();
}; };
/**
 * setSuccess helper.
 */
exports.setSuccess = function (c) { return function () { return exports.setState(c)(names.SUCCESS); }; };
/**
 * setWarning helper.
 */
exports.setWarning = function (c) { return function () { return exports.setState(c)(names.WARNING); }; };
/**
 * setError helper.
 */
exports.setError = function (c) { return function () { return exports.setState(c)(names.ERROR); }; };
/**
 * setMessage helper for setting a message on a FeedbackControl.
 */
exports.setMessage = function (c) { return function (msg) {
    return c
        .view
        .findById(c.values.messages.id)
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
}; };
/**
 * clear validation states from a control.
 */
exports.clear = function (c) { return function () {
    return c
        .view
        .findById(c.values.root.id)
        .map(function (h) {
        h.classList.remove(names.SUCCESS);
        h.classList.remove(names.ERROR);
        h.classList.remove(names.WARNING);
    })
        .map(function () { return c; })
        .orJust(function () { return c; })
        .get();
}; };
/**
 * selectState from an attribute list.
 */
exports.selectState = function (attrs) {
    return attrs.success ? names.SUCCESS :
        attrs.error ? names.ERROR :
            attrs.warning ? names.WARNING : '';
};
//# sourceMappingURL=index.js.map