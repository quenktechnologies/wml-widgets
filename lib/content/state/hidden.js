"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggle = exports.show = exports.hide = exports.isHidden = exports.HIDDEN = void 0;
const util_1 = require("../../util");
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
const isHidden = (view, id) => {
    let m = view.findById(id);
    if (m.isNothing()) {
        (0, util_1.warnMissing)(view, id);
        return true;
    }
    else {
        return m.get().classList.contains(exports.HIDDEN);
    }
};
exports.isHidden = isHidden;
/**
 * hide helper.
 *
 * Attempts to add HIDDEN to the target elements class name.
 */
const hide = (view, id) => {
    let m = view.findById(id);
    if (m.isNothing()) {
        return (0, util_1.warnMissing)(view, id);
    }
    else {
        let e = m.get();
        e.classList.remove(exports.HIDDEN);
        e.classList.add(exports.HIDDEN);
    }
};
exports.hide = hide;
/**
 * show helper.
 *
 * Attempts to remove the HIDDEN class name from the target element.
 */
const show = (view, id) => {
    let m = view.findById(id);
    if (m.isNothing()) {
        return (0, util_1.warnMissing)(view, id);
    }
    else {
        m.get().classList.remove(exports.HIDDEN);
    }
};
exports.show = show;
/**
 * toggle helper.
 *
 * Attempts to toggle the HIDDEN class name from the target element
 * classList.
 */
const toggle = (view, id) => {
    let m = view.findById(id);
    if (m.isNothing()) {
        return (0, util_1.warnMissing)(view, id);
    }
    else {
        m.get().classList.toggle(exports.HIDDEN);
    }
};
exports.toggle = toggle;
//# sourceMappingURL=hidden.js.map