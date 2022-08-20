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
exports.activate = (view, id) => util_1.getById(view, id)
    .map((e) => {
    e.classList.remove(exports.ACTIVE);
    e.classList.add(exports.ACTIVE);
});
/**
 * deactivate helper.
 *
 * Removes the ACTIVE class.
 */
exports.deactivate = (view, id) => util_1.getById(view, id)
    .map((e) => e.classList.remove(exports.ACTIVE));
/**
 * isActive helpder
 *
 * Queries whether the ACTIVE class is present.
 */
exports.isActive = (view, id) => util_1.getById(view, id)
    .map((e) => e.classList.contains(exports.ACTIVE))
    .orJust(() => false)
    .get();
//# sourceMappingURL=active.js.map