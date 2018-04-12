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
var page_example_1 = require("../../../page-example");
;
var tab_layout_1 = require("../../../../../lib/layout/tab-layout");
;
exports.firstTab = function (_) { return function (___view) { return ___wml.node('p', {
    html: {},
    wml: {}
}, [___wml.text("Click a tab to change content.")], ___view); }; };
;
exports.secondTab = function (_) { return function (___view) { return ___wml.node('p', {
    html: {},
    wml: {}
}, [___wml.text("Second tab.")], ___view); }; };
;
exports.thirdTab = function (_) { return function (___view) { return ___wml.node('p', {
    html: {},
    wml: {}
}, [___wml.text("Third tab.")], ___view); }; };
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(___context) {
        var _this = _super.call(this, ___context) || this;
        _this.template = function (___view) {
            return ___wml.widget(page_example_1.PageExample, {
                html: {},
                wml: {}
            }, [___wml.widget(tab_layout_1.TabLayout, {
                    html: {},
                    wml: {},
                    ww: {
                        'tabs': ___context.tabs
                    }
                }, [___wml.node('p', {
                        html: {},
                        wml: {}
                    }, [___wml.text("Click a tab to change content.")], ___view)], ___view)], ___view);
        };
        return _this;
    }
    return Main;
}(___wml.AppView));
exports.Main = Main;
//# sourceMappingURL=tab-layout.js.map