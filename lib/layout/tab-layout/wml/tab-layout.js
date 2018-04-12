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
var fragment_1 = require("../../fragment");
;
var tab_bar_1 = require("../../../control/tab-bar");
;
exports.empty = function (___context) { return function (___view) { return ___wml.widget(fragment_1.Fragment, {
    html: {},
    wml: {}
}, [], ___view); }; };
;
exports.content = function (c) { return function (_) { return function (___view) { return ___wml.domify(c); }; }; };
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(___context) {
        var _this = _super.call(this, ___context) || this;
        _this.template = function (___view) {
            return ___wml.node('div', {
                html: {
                    'class': ___context.values.root.class
                },
                wml: {}
            }, [___wml.widget(tab_bar_1.TabBar, {
                    html: {},
                    wml: {}
                }, [___wml.map(___context.values.tabs, function _map(tab, name) {
                        return ___wml.widget(tab_bar_1.Tab, {
                            html: {},
                            wml: {},
                            ww: {
                                'name': name,
                                'active': (___context.values.tab === name),
                                'onClick': ___context.values.onClick
                            }
                        }, [(tab.tabTemplate) ? ___wml.domify(tab.tabTemplate(___context)(___view)) : (tab.text) ? ___wml.domify(tab.text) : ___wml.domify(name)], ___view);
                    }, function otherwise() {
                        return document.createDocumentFragment();
                    })], ___view), (___context.values.content) ? ___wml.domify(___context.values.content(___context)(___view)) : ___wml.domify(___context.children)], ___view);
        };
        return _this;
    }
    return Main;
}(___wml.AppView));
exports.Main = Main;
//# sourceMappingURL=tab-layout.js.map