"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isActive = exports.deactivate = exports.activate = exports.ACTIVE = void 0;
const util_1 = require("../../util");
///classNames:begin
/**
 * ACTIVE
 */
exports.ACTIVE = '-active';
/**
 * activate helper.
 *
 * Adds the ACTIVE class.
 */
const activate = (view, id) => (0, util_1.getById)(view, id)
    .map((e) => {
    e.classList.remove(exports.ACTIVE);
    e.classList.add(exports.ACTIVE);
});
exports.activate = activate;
/**
 * deactivate helper.
 *
 * Removes the ACTIVE class.
 */
const deactivate = (view, id) => (0, util_1.getById)(view, id)
    .map((e) => e.classList.remove(exports.ACTIVE));
exports.deactivate = deactivate;
/**
 * isActive helpder
 *
 * Queries whether the ACTIVE class is present.
 */
const isActive = (view, id) => (0, util_1.getById)(view, id)
    .map((e) => e.classList.contains(exports.ACTIVE))
    .orJust(() => false)
    .get();
exports.isActive = isActive;
//# sourceMappingURL=active.js.map