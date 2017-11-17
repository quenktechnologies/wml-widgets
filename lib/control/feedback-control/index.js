"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FeedbackControlWidget_1 = require("./FeedbackControlWidget");
exports.FeedbackControlWidget = FeedbackControlWidget_1.FeedbackControlWidget;
/**
 * hasClass queries whether a class exists on an element.
 *
 * This is how we distingush FeedbackControl states.
 */
exports.hasClass = function (cls, id, view) {
    return view
        .findById(id)
        .cata(function () { return false; }, (function (e) {
        return e.className.split(' ').indexOf(cls) === -1;
    }));
};
/**
 * state is a helper.
 */
exports.state = function (attrs) {
    return attrs.success ? 'has-success' :
        attrs.error ? 'has-error' :
            attrs.warning ? 'has-warning' : '';
};
//# sourceMappingURL=index.js.map