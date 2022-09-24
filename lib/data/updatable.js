"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = void 0;
const util_1 = require("../util");
/**
 * update an Updatable Widget in a view with the data provided.
 */
const update = (view, id, data) => (0, util_1.getById)(view, id).map(w => w.update(data));
exports.update = update;
//# sourceMappingURL=updatable.js.map