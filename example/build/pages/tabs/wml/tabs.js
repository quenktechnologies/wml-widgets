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
var Grid_1 = require("@package/self/layout/grid/Grid");
;
var Tabs_1 = require("@package/self/control/tabs/Tabs");
;
var Tab_1 = require("@package/self/control/tabs/Tab");
;
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(context) {
        var _this = _super.call(this, context) || this;
        _this.template = function (___context, ___view) {
            return $wml.widget(Grid_1.Grid, {
                html: {},
                wml: {}
            }, [$wml.widget(Grid_1.Row, {
                    html: {},
                    wml: {}
                }, [$wml.widget(Grid_1.Column, {
                        html: {},
                        wml: {}
                    }, [$wml.widget(Tabs_1.Tabs, {
                            html: {},
                            wml: {}
                        }, [$wml.widget(Tab_1.Tab, {
                                html: {},
                                wml: {},
                                ww: {
                                    'active': (___context.tab === "First"),
                                    'text': "First",
                                    'name': "First",
                                    'onClick': ___context.clicked
                                }
                            }, [], ___view), $wml.widget(Tab_1.Tab, {
                                html: {},
                                wml: {},
                                ww: {
                                    'active': (___context.tab === "Second"),
                                    'text': "Second",
                                    'name': "Second",
                                    'onClick': ___context.clicked
                                }
                            }, [], ___view), $wml.widget(Tab_1.Tab, {
                                html: {},
                                wml: {},
                                ww: {
                                    'active': (___context.tab === "Third"),
                                    'text': "Third",
                                    'name': "Third",
                                    'onClick': ___context.clicked
                                }
                            }, [], ___view)], ___view), $wml.node('p', {
                            html: {},
                            wml: {
                                'id': "content"
                            }
                        }, [$wml.domify(___context.content)], ___view)], ___view)], ___view)], ___view);
        };
        return _this;
    }
    return Main;
}($wml.AppView));
exports.Main = Main;
//# sourceMappingURL=tabs.js.map