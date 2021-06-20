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
exports.doRemoveContent = exports.doSetContent = exports.AbstractLayout = exports.LAYOUT = void 0;
var wml_1 = require("@quenk/wml");
var util_1 = require("../util");
///classNames:begin
exports.LAYOUT = '-layout';
/**
 * AbstractLayout provides an implementation of Layout.
 */
var AbstractLayout = /** @class */ (function (_super) {
    __extends(AbstractLayout, _super);
    function AbstractLayout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AbstractLayout.prototype.setContent = function (c) {
        exports.doSetContent(this.view, this.values.content.wml.id, c);
        return this;
    };
    AbstractLayout.prototype.removeContent = function () {
        exports.doRemoveContent(this.view, this.values.content.wml.id);
        return this;
    };
    return AbstractLayout;
}(wml_1.Component));
exports.AbstractLayout = AbstractLayout;
/**
 * doSetContent on a Node found in a view.
 */
exports.doSetContent = function (view, id, content) {
    var maybeRoot = view.findById(id);
    if (maybeRoot.isNothing())
        return util_1.warnMissing(view, id);
    var n = maybeRoot.get();
    while (n.firstChild)
        n.removeChild(n.firstChild);
    for (var i = 0; i < content.length; i++)
        n.appendChild(content[i]);
};
/**
 * doRemoveContent from a View.
 */
exports.doRemoveContent = function (view, id) {
    var maybeNode = view.findById(id);
    if (maybeNode.isNothing())
        return util_1.warnMissing(view, id);
    var n = maybeNode.get();
    while (n.firstChild)
        n.removeChild(n.firstChild);
};
//# sourceMappingURL=index.js.map