"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.close = exports.open = exports.OPEN = void 0;
///classNames:begin
/**
 * OPEN state.
 */
exports.OPEN = '-open';
/**
 * open the widget.
 */
const open = (w) => (fn) => () => fn()
    .map((e) => e.classList.add(exports.OPEN))
    .map(() => w)
    .orJust(() => w)
    .get();
exports.open = open;
/**
 * close this widget.
 */
const close = (w) => (fn) => () => fn()
    .map((e) => e.classList.remove(exports.OPEN))
    .map(() => w)
    .orJust(() => w)
    .get();
exports.close = close;
//# sourceMappingURL=open.js.map