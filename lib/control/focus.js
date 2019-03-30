"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../util");
/**
 * FocusGainedEvent
 */
var FocusGainedEvent = /** @class */ (function () {
    function FocusGainedEvent(name) {
        this.name = name;
    }
    return FocusGainedEvent;
}());
exports.FocusGainedEvent = FocusGainedEvent;
/**
 * FocusLostEvent
 */
var FocusLostEvent = /** @class */ (function () {
    function FocusLostEvent(name) {
        this.name = name;
    }
    return FocusLostEvent;
}());
exports.FocusLostEvent = FocusLostEvent;
/**
 * focus DOM helper.
 */
exports.focus = function (view, id) {
    util_1.getById(view, id)
        .map(function (e) { return e.focus(); });
};
//# sourceMappingURL=focus.js.map