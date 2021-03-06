"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.screenNotSmall = exports.SCREEN_MEDIUM = exports.SCREEN_SMALL = void 0;
exports.SCREEN_SMALL = '320px';
exports.SCREEN_MEDIUM = '720px';
/**
 * screenNotSmall determines whether the window passed matches our
 * standard for considering a screen small.
 */
exports.screenNotSmall = function (w) {
    return w.matchMedia("(min-width: " + exports.SCREEN_MEDIUM + ")").matches;
};
//# sourceMappingURL=index.js.map