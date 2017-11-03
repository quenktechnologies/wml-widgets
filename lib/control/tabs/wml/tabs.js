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
var Tab = /** @class */ (function (_super) {
    __extends(Tab, _super);
    function Tab(context) {
        var _this = _super.call(this, context) || this;
        _this.template = function (___context, ___view) {
            return ___wml.node('li', {
                html: {
                    'class': ___context.values.class.li
                },
                wml: {
                    'id': ___context.values.id.root
                }
            }, [___wml.node('a', {
                    html: {
                        'href': "#",
                        'onclick': ___context.clicked
                    },
                    wml: {
                        'id': ___context.values.id.a
                    }
                }, [___wml.ifthen(___context.values.tab.text, function then() {
                        return ___wml.domify(___context.values.tab.text);
                    }, function else_clause() {
                        return ___wml.domify(___context.children);
                    })], ___view)], ___view);
        };
        return _this;
    }
    return Tab;
}(___wml.AppView));
exports.Tab = Tab;
;
var Tabs = /** @class */ (function (_super) {
    __extends(Tabs, _super);
    function Tabs(context) {
        var _this = _super.call(this, context) || this;
        _this.template = function (___context, ___view) {
            return ___wml.node('ul', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [___wml.domify(___context.children)], ___view);
        };
        return _this;
    }
    return Tabs;
}(___wml.AppView));
exports.Tabs = Tabs;
//# sourceMappingURL=tabs.js.map