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
var grid_layout_1 = require("../../../../../lib/layout/grid-layout");
;
var select_1 = require("../../../../../lib/control/select");
;
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(___context) {
        var _this = _super.call(this, ___context) || this;
        _this.template = function (___view) {
            return ___wml.widget(grid_layout_1.GridLayout, {
                html: {},
                wml: {}
            }, [___wml.widget(grid_layout_1.Row, {
                    html: {},
                    wml: {}
                }, [___wml.widget(grid_layout_1.Column, {
                        html: {},
                        wml: {},
                        ww: {
                            'span': 6
                        }
                    }, [___wml.node('p', {
                            html: {},
                            wml: {}
                        }, [___wml.text("You selected: "), ___wml.node('b', {
                                html: {},
                                wml: {
                                    'id': ___context.values.autocomplete.name
                                }
                            }, [___wml.text("(nothing)")], ___view), ___wml.text(".")], ___view), ___wml.node('p', {
                            html: {},
                            wml: {}
                        }, [___wml.widget(select_1.Select, {
                                html: {},
                                wml: {
                                    'id': ___context.values.autocomplete.id
                                },
                                ww: {
                                    'name': ___context.values.autocomplete.name,
                                    'stringifier': function (r) { return r.value; },
                                    'onSearch': ___context.values.autocomplete.onSearch,
                                    'onChange': ___context.values.autocomplete.onChange
                                }
                            }, [], ___view)], ___view)], ___view)], ___view), ___wml.widget(grid_layout_1.Row, {
                    html: {},
                    wml: {}
                }, [___wml.widget(grid_layout_1.Column, {
                        html: {},
                        wml: {},
                        ww: {
                            'span': 6
                        }
                    }, [___wml.node('p', {
                            html: {},
                            wml: {}
                        }, [___wml.text("You selected: "), ___wml.node('b', {
                                html: {},
                                wml: {
                                    'id': ___context.values.native.name
                                }
                            }, [___wml.text("(nothing)")], ___view), ___wml.text(".")], ___view), ___wml.node('p', {
                            html: {},
                            wml: {}
                        }, [___wml.widget(select_1.Select, {
                                html: {},
                                wml: {
                                    'id': ___context.values.native.id
                                },
                                ww: {
                                    'name': ___context.values.native.name,
                                    'readOnly': true,
                                    'stringifier': function (r) { return r.value; },
                                    'options': ___context.values.native.options,
                                    'onSearch': ___context.values.native.onSearch,
                                    'onChange': ___context.values.native.onChange
                                }
                            }, [], ___view)], ___view)], ___view)], ___view)], ___view);
        };
        return _this;
    }
    return Main;
}(___wml.AppView));
exports.Main = Main;
//# sourceMappingURL=select.js.map