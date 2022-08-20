"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.focus = exports.FocusLostEvent = exports.FocusGainedEvent = void 0;
const util_1 = require("../util");
/**
 * FocusGainedEvent
 */
class FocusGainedEvent {
    constructor(name) {
        this.name = name;
    }
}
exports.FocusGainedEvent = FocusGainedEvent;
/**
 * FocusLostEvent
 */
class FocusLostEvent {
    constructor(name) {
        this.name = name;
    }
}
exports.FocusLostEvent = FocusLostEvent;
/**
 * focus DOM helper.
 */
exports.focus = (view, id) => {
    util_1.getById(view, id)
        .map(e => e.focus());
};
//# sourceMappingURL=focus.js.map