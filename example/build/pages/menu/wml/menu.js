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
var menu_1 = require("@package/self/menu");
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
                    }, [$wml.widget(menu_1.Menu, {
                            html: {},
                            wml: {}
                        }, [$wml.widget(menu_1.Header, {
                                html: {},
                                wml: {},
                                ww: {
                                    'text': "Heading"
                                }
                            }, [], ___view), $wml.widget(menu_1.MenuItem, {
                                html: {},
                                wml: {},
                                ww: {
                                    'disabled': true,
                                    'text': "Back"
                                }
                            }, [], ___view), $wml.widget(menu_1.MenuItem, {
                                html: {},
                                wml: {},
                                ww: {
                                    'text': "Refresh"
                                }
                            }, [], ___view), $wml.widget(menu_1.Divider, {
                                html: {},
                                wml: {}
                            }, [], ___view), $wml.widget(menu_1.MenuItem, {
                                html: {},
                                wml: {}
                            }, [$wml.node('a', {
                                    html: {
                                        'href': "#/menu"
                                    },
                                    wml: {}
                                }, [$wml.text("Quit")], ___view)], ___view)], ___view)], ___view)], ___view)], ___view);
        };
        return _this;
    }
    return Main;
}($wml.AppView));
exports.Main = Main;
//# sourceMappingURL=menu.js.map