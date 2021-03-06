"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValue = exports.getDisabled = exports.getName = exports.AbstractControl = exports.Event = void 0;
/**
 * This module provides the parent interfaces for most of the
 * widgets considered 'controls'.
 *
 * Controls allow users to manipulate the state of an application
 * by interacting with widgets on screen. In simpler terms,
 * they are the widgets that accept user input or trigger
 * reactions when the user manipulates them.
 *
 * Generally, we use a streaming based workflow, that is
 * as the user preforms a supported action and event is generated
 * each and every time and some handler is applied to the event.
 */
/** @imports */
var wml_1 = require("@quenk/wml");
var maybe_1 = require("@quenk/noni/lib/data/maybe");
/**
 * Event is the parent class of all events generated by controls.
 */
var Event = /** @class */ (function () {
    function Event(name, value) {
        this.name = name;
        this.value = value;
    }
    return Event;
}());
exports.Event = Event;
/**
 * AbstractControl implements the methods of the Control interface.
 */
var AbstractControl = /** @class */ (function (_super) {
    __extends(AbstractControl, _super);
    function AbstractControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AbstractControl;
}(wml_1.Component));
exports.AbstractControl = AbstractControl;
/**
 * getName
 */
exports.getName = function (attrs) {
    return (attrs.ww && attrs.ww.name) ? attrs.ww.name : '';
};
/**
 * getDisabled
 */
exports.getDisabled = function (attrs) {
    return (attrs.ww && attrs.ww.disabled) ? attrs.ww.disabled : undefined;
};
/**
 * getValue
 */
exports.getValue = function (attrs) {
    return (attrs.ww && attrs.ww.value) ? maybe_1.just(attrs.ww.value) : maybe_1.nothing();
};
//# sourceMappingURL=index.js.map