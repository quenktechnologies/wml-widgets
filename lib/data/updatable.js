"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = void 0;
const util_1 = require("../util");
/**
 * update an Updatable Widget in a view with the data provided.
 */
exports.update = (view, id, data) => util_1.getById(view, id).map(w => w.update(data));
//# sourceMappingURL=updatable.js.map