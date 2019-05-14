"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SCREEN_SMALL = '320px';
exports.SCREEN_MEDIUM = '720px';
/**
 * screenNotSmall determines whether the window passed matches our
 * standard for considering a screen small.
 */
exports.screenNotSmall = function (w) {
    return w.matchMedia("(min-width: " + exports.SCREEN_SMALL + ")").matches;
};
//# sourceMappingURL=index.js.map