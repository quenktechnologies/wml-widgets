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
var $wml = require("@quenk/wml");
;
var Tab = /** @class */ (function (_super) {
    __extends(Tab, _super);
    function Tab(context) {
        var _this = _super.call(this, context) || this;
        _this.template = function (___context, ___view) {
            return $wml.node('li', {
                html: {
                    'class': ___context.values.class.li
                },
                wml: {
                    'id': ___context.values.id.root
                }
            }, [$wml.node('a', {
                    html: {
                        'href': "#",
                        'onclick': ___context.clicked
                    },
                    wml: {
                        'id': ___context.values.id.a
                    }
                }, [$wml.ifthen($wml.read("ww:text", ___context.attrs), function then() {
                        return $wml.domify(___context.attrs.ww.text);
                    }, function else_clause() {
                        return $wml.domify(___context.children);
                    })], ___view)], ___view);
        };
        return _this;
    }
    return Tab;
}($wml.AppView));
exports.Tab = Tab;
;
var Tabs = /** @class */ (function (_super) {
    __extends(Tabs, _super);
    function Tabs(context) {
        var _this = _super.call(this, context) || this;
        _this.template = function (___context, ___view) {
            return $wml.node('ul', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [$wml.domify(___context.children)], ___view);
        };
        return _this;
    }
    return Tabs;
}($wml.AppView));
exports.Tabs = Tabs;
//# sourceMappingURL=tabs.js.map