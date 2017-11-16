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
var Grid_1 = require("@package/self/layout/grid/Grid");
;
var button_menu_1 = require("@package/self/menu/button-menu");
;
var menu_1 = require("@package/self/menu");
;
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
                        wml: {},
                        ww: {
                            'size': 6
                        }
                    }, [___wml.node('p', {
                            html: {},
                            wml: {}
                        }, [___wml.widget(button_menu_1.ButtonMenu, {
                                html: {},
                                wml: {},
                                ww: {
                                    'text': "Click Me"
                                }
                            }, [___wml.widget(menu_1.MenuItem, {
                                    html: {},
                                    wml: {}
                                }, [___wml.node('a', {
                                        html: {
                                            'href': "#",
                                            'onclick': ___context.onClick("You clicked one")
                                        },
                                        wml: {}
                                    }, [___wml.text("One")], ___view)], ___view), ___wml.widget(menu_1.MenuItem, {
                                    html: {},
                                    wml: {}
                                }, [___wml.node('a', {
                                        html: {
                                            'href': "#",
                                            'onclick': ___context.onClick("You clicked two")
                                        },
                                        wml: {}
                                    }, [___wml.text("Two")], ___view)], ___view), ___wml.widget(menu_1.MenuItem, {
                                    html: {},
                                    wml: {}
                                }, [___wml.node('a', {
                                        html: {
                                            'href': "#",
                                            'onclick': ___context.onClick("You clicked three")
                                        },
                                        wml: {}
                                    }, [___wml.text("Three")], ___view)], ___view)], ___view)], ___view)], ___view)], ___view)], ___view);
        };
        return _this;
    }
    return Main;
}(___wml.AppView));
exports.Main = Main;
//# sourceMappingURL=button-menu.js.map