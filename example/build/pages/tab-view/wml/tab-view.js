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
var Grid_1 = require("@package/wml-widgets/layout/grid/Grid");
;
var tab_view_1 = require("@package/wml-widgets/layout/tab-view");
;
var FirstTab = /** @class */ (function (_super) {
    __extends(FirstTab, _super);
    function FirstTab(___context) {
        var _this = _super.call(this, ___context) || this;
        _this.template = function (___view) {
            return ___wml.node('p', {
                html: {},
                wml: {}
            }, [___wml.text("Click a tab to change content.")], ___view);
        };
        return _this;
    }
    return FirstTab;
}(___wml.AppView));
exports.FirstTab = FirstTab;
;
var SecondTab = /** @class */ (function (_super) {
    __extends(SecondTab, _super);
    function SecondTab(___context) {
        var _this = _super.call(this, ___context) || this;
        _this.template = function (___view) {
            return ___wml.node('p', {
                html: {},
                wml: {}
            }, [___wml.text("Second tab.")], ___view);
        };
        return _this;
    }
    return SecondTab;
}(___wml.AppView));
exports.SecondTab = SecondTab;
;
var ThirdTab = /** @class */ (function (_super) {
    __extends(ThirdTab, _super);
    function ThirdTab(___context) {
        var _this = _super.call(this, ___context) || this;
        _this.template = function (___view) {
            return ___wml.node('p', {
                html: {},
                wml: {}
            }, [___wml.text("Third tab.")], ___view);
        };
        return _this;
    }
    return ThirdTab;
}(___wml.AppView));
exports.ThirdTab = ThirdTab;
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(___context) {
        var _this = _super.call(this, ___context) || this;
        _this.template = function (___view) {
            return ___wml.widget(Grid_1.Grid, {
                html: {},
                wml: {}
            }, [___wml.widget(Grid_1.Row, {
                    html: {},
                    wml: {}
                }, [___wml.widget(Grid_1.Column, {
                        html: {},
                        wml: {}
                    }, [___wml.widget(tab_view_1.TabView, {
                            html: {},
                            wml: {},
                            ww: {
                                'tabs': ___context.tabs
                            }
                        }, [___wml.node('p', {
                                html: {},
                                wml: {}
                            }, [___wml.text("Click a tab to change content.")], ___view)], ___view)], ___view)], ___view)], ___view);
        };
        return _this;
    }
    return Main;
}(___wml.AppView));
exports.Main = Main;
//# sourceMappingURL=tab-view.js.map