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
var ___wml = require("@quenk/wml");
;
var BreadCrumbs = /** @class */ (function (_super) {
    __extends(BreadCrumbs, _super);
    function BreadCrumbs(___context) {
        var _this = _super.call(this, ___context) || this;
        _this.template = function (___view) {
            return ___wml.node('ol', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [___wml.domify(___context.children)], ___view);
        };
        return _this;
    }
    return BreadCrumbs;
}(___wml.AppView));
exports.BreadCrumbs = BreadCrumbs;
;
var Item = /** @class */ (function (_super) {
    __extends(Item, _super);
    function Item(___context) {
        var _this = _super.call(this, ___context) || this;
        _this.template = function (___view) {
            return ___wml.node('li', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [___wml.domify(___context.children)], ___view);
        };
        return _this;
    }
    return Item;
}(___wml.AppView));
exports.Item = Item;
//# sourceMappingURL=breadcrumbs.js.map