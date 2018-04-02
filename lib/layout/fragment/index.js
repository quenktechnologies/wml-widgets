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
var views = require("./wml/fragment");
var wml_1 = require("@quenk/wml");
/**
 * Fragment allows for the grouping of widgets in a DocumentFragment.
 *
 * This is intended to facilitate view templates that do not have a single
 * root but instead generated multiple sibling content.
 */
var Fragment = /** @class */ (function (_super) {
    __extends(Fragment, _super);
    function Fragment() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(undefined);
        return _this;
    }
    Fragment.prototype.render = function () {
        var frag = document.createDocumentFragment();
        this.children.forEach(function (c) { return frag.appendChild(c); });
        return frag;
    };
    return Fragment;
}(wml_1.Component));
exports.Fragment = Fragment;
//# sourceMappingURL=index.js.map