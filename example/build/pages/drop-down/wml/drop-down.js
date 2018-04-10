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
var drop_down_1 = require("../../../../../lib/control/drop-down");
;
var menu_1 = require("../../../../../lib/control/menu");
;
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(___context) {
        var _this = _super.call(this, ___context) || this;
        _this.template = function (___view) {
            return ___wml.widget(page_example_1.PageExample, {
                html: {},
                wml: {}
            }, [___wml.node('p', {
                    html: {},
                    wml: {}
                }, [___wml.widget(drop_down_1.DropDown, {
                        html: {},
                        wml: {},
                        ww: {
                            'buttonText': "Click Me"
                        }
                    }, [___wml.widget(menu_1.Menu, {
                            html: {},
                            wml: {}
                        }, [___wml.widget(menu_1.Item, {
                                html: {},
                                wml: {}
                            }, [___wml.node('a', {
                                    html: {
                                        'href': "#",
                                        'onclick': ___context.onClick("You clicked one")
                                    },
                                    wml: {}
                                }, [___wml.text("One")], ___view)], ___view), ___wml.widget(menu_1.Item, {
                                html: {},
                                wml: {}
                            }, [___wml.node('a', {
                                    html: {
                                        'href': "#",
                                        'onclick': ___context.onClick("You clicked two")
                                    },
                                    wml: {}
                                }, [___wml.text("Two")], ___view)], ___view), ___wml.widget(menu_1.Item, {
                                html: {},
                                wml: {}
                            }, [___wml.node('a', {
                                    html: {
                                        'href': "#",
                                        'onclick': ___context.onClick("You clicked three")
                                    },
                                    wml: {}
                                }, [___wml.text("Three")], ___view)], ___view)], ___view)], ___view), ___wml.widget(drop_down_1.DropDown, {
                        html: {},
                        wml: {},
                        ww: {
                            'buttonText': "Me Too",
                            'autoClose': false
                        }
                    }, [___wml.node('h1', {
                            html: {},
                            wml: {}
                        }, [___wml.text("Any flow content can go here!")], ___view)], ___view)], ___view)], ___view);
        };
        return _this;
    }
    return Main;
}(___wml.AppView));
exports.Main = Main;
//# sourceMappingURL=drop-down.js.map