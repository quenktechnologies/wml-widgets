"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var wml_1 = require("@quenk/wml");
var _get = function (gen) { return function () {
    return gen
        .view
        .findById(gen.values.content.id);
}; };
///classNames:begin
exports.LAYOUT = '-layout';
/**
 * GenericLayout provides an implementation of Layout.
 */
var GenericLayout = /** @class */ (function (_super) {
    __extends(GenericLayout, _super);
    function GenericLayout() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.setContent = exports.setContent(_this)(_get(_this));
        _this.removeContent = exports.removeContent(_this)(_get(_this));
        return _this;
    }
    return GenericLayout;
}(wml_1.Component));
exports.GenericLayout = GenericLayout;
/**
 * setContent helper.
 */
exports.setContent = function (l) { return function (fn) { return function (content) {
    return fn()
        .map(function (e) {
        while (e.firstChild)
            e.removeChild(e.firstChild);
        e.appendChild(content);
    })
        .map(function () { return l; })
        .orJust(function () { return l; })
        .get();
}; }; };
/**
 * removeContent helper.
 */
exports.removeContent = function (l) { return function (fn) { return function () {
    return fn()
        .map(function (e) { while (e.firstChild)
        e.removeChild(e.firstChild); })
        .map(function () { return l; })
        .orJust(function () { return l; })
        .get();
}; }; };
//# sourceMappingURL=index.js.map