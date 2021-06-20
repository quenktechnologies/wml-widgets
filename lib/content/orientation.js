"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlockClassName = exports.BOTTOM = exports.MIDDLE = exports.HORIZONTAL = exports.RIGHT = exports.LEFT = exports.JUSTIFIED = exports.CLEARFIX = exports.BLOCK = exports.POSITIONED = exports.PUSHABLE = exports.VERTICAL = void 0;
///classNames:begin
/**
 * VERTICAL indicates an element is vertical rendererd.
 */
exports.VERTICAL = '-vertical';
/**
 * PUSHABLE indicates an element supports being pushed
 * and can have styles added to it around the concept.
 */
exports.PUSHABLE = '-pushable';
/**
 * POSITIONED indicates an element is positioned and responds
 * to the left,right etc. properties.
 */
exports.POSITIONED = '-positioned';
/**
 * BLOCK indicates an element should be block displayed.
 */
exports.BLOCK = '-block';
/**
 * CLEARFIX hack.
 */
exports.CLEARFIX = '-clearfix';
/**
 * JUSTIFIED content.
 */
exports.JUSTIFIED = '-justified';
/**
 * LEFT indicates content floated or positioned to the left.
 */
exports.LEFT = '-left';
/**
 * RIGHT indicates content floated or positioned to the right.
 */
exports.RIGHT = '-right';
/**
 * HORIZONTAL indicates a horizontal alignment.
 */
exports.HORIZONTAL = '-horizontal';
exports.MIDDLE = '-middle';
exports.BOTTOM = '-bottom';
///classNames:end
/**
 * getBlockClassName provides the __BLOCK__ class name if the attribute
 * value is set to true.
 */
exports.getBlockClassName = function (attrs) {
    return (attrs.ww && (attrs.ww.block === true)) ? exports.BLOCK : '';
};
//# sourceMappingURL=orientation.js.map