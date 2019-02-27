"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../../util");
///classNames:begin
/**
 * HIDDEN means an element should not be visible but not removed
 * from the DOM.
 */
exports.HIDDEN = '-ww-hidden';
/**
 * isHidden helper.
 *
 * Retrieves an HTMLElement by id and checks whether
 * it has the hidden class attached.
 */
exports.isHidden = function (view, id) {
    var m = view.findById(id);
    if (m.isNothing()) {
        util_1.warnMissing(view, id);
        return true;
    }
    else {
        return m.get().classList.contains(exports.HIDDEN);
    }
};
/**
 * hide helper.
 *
 * Attempts to add HIDDEN to the target elements class name.
 */
exports.hide = function (view, id) {
    var m = view.findById(id);
    if (m.isNothing()) {
        return util_1.warnMissing(view, id);
    }
    else {
        var e = m.get();
        e.classList.remove(exports.HIDDEN);
        e.classList.add(exports.HIDDEN);
    }
};
/**
 * show helper.
 *
 * Attempts to remove the HIDDEN class name from the target element.
 */
exports.show = function (view, id) {
    var m = view.findById(id);
    if (m.isNothing()) {
        return util_1.warnMissing(view, id);
    }
    else {
        m.get().classList.remove(exports.HIDDEN);
    }
};
/**
 * toggle helper.
 *
 * Attempts to toggle the HIDDEN class name from the target element
 * classList.
 */
exports.toggle = function (view, id) {
    var m = view.findById(id);
    if (m.isNothing()) {
        return util_1.warnMissing(view, id);
    }
    else {
        m.get().classList.toggle(exports.HIDDEN);
    }
};
//# sourceMappingURL=hidden.js.map