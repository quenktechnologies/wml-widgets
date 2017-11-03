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
var button_select_1 = require("@package/self/control/button-select");
;
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(context) {
        var _this = _super.call(this, context) || this;
        _this.template = function (___context, ___view) {
            return ___wml.widget(Grid_1.Grid, {
                html: {},
                wml: {}
            }, [___wml.widget(Grid_1.Row, {
                    html: {},
                    wml: {}
                }, [___wml.widget(Grid_1.Column, {
                        html: {},
                        wml: {}
                    }, [___wml.node('p', {
                            html: {},
                            wml: {}
                        }, [___wml.text("You selected: "), ___wml.node('b', {
                                html: {},
                                wml: {
                                    'id': "select-content"
                                }
                            }, [___wml.text("(None)")], ___view), ___wml.text(".")], ___view), ___wml.node('p', {
                            html: {},
                            wml: {}
                        }, [___wml.widget(button_select_1.ButtonSelect, {
                                html: {},
                                wml: {
                                    'id': "select"
                                },
                                ww: {
                                    'name': "select",
                                    'variant': "-primary",
                                    'options': ___context.values.options,
                                    'onChange': ___context.onChange
                                }
                            }, [], ___view)], ___view)], ___view)], ___view), ___wml.widget(Grid_1.Row, {
                    html: {},
                    wml: {}
                }, [___wml.widget(Grid_1.Column, {
                        html: {},
                        wml: {}
                    }, [___wml.node('p', {
                            html: {},
                            wml: {}
                        }, [___wml.text("You can also use MultiButtonSelect instead: "), ___wml.node('b', {
                                html: {},
                                wml: {
                                    'id': "multi-content"
                                }
                            }, [___wml.text("(None)")], ___view), ___wml.text(".")], ___view), ___wml.node('p', {
                            html: {},
                            wml: {}
                        }, [___wml.widget(button_select_1.MultiButtonSelect, {
                                html: {},
                                wml: {
                                    'id': "multi"
                                },
                                ww: {
                                    'name': "multi",
                                    'variant': "-primary",
                                    'options': ___context.values.options,
                                    'onChange': ___context.onChange
                                }
                            }, [], ___view)], ___view)], ___view)], ___view)], ___view);
        };
        return _this;
    }
    return Main;
}(___wml.AppView));
exports.Main = Main;
//# sourceMappingURL=button-select.js.map