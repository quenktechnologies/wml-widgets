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
var text_field_1 = require("../../../../../lib/control/text-field");
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
                        wml: {}
                    }, [___wml.node('p', {
                            html: {},
                            wml: {}
                        }, [___wml.text("The value of the input is:")], ___view), ___wml.node('p', {
                            html: {},
                            wml: {
                                'id': "content"
                            }
                        }, [___wml.domify("(Nothing)")], ___view), ___wml.node('p', {
                            html: {},
                            wml: {}
                        }, [___wml.widget(text_field_1.TextField, {
                                html: {},
                                wml: {
                                    'id': "text"
                                },
                                ww: {
                                    'name': "text",
                                    'onChange': ___context.onChange
                                }
                            }, [], ___view)], ___view)], ___view)], ___view), ___wml.widget(grid_layout_1.Row, {
                    html: {},
                    wml: {}
                }, [___wml.widget(grid_layout_1.Column, {
                        html: {},
                        wml: {}
                    }, [___wml.node('p', {
                            html: {},
                            wml: {}
                        }, [___wml.node('strong', {
                                html: {},
                                wml: {}
                            }, [___wml.text("Success")], ___view)], ___view), ___wml.node('p', {
                            html: {},
                            wml: {}
                        }, [___wml.widget(text_field_1.TextField, {
                                html: {},
                                wml: {},
                                ww: {
                                    'name': "text",
                                    'success': "This textfield has a success",
                                    'onChange': ___context.onChange
                                }
                            }, [], ___view)], ___view)], ___view)], ___view), ___wml.widget(grid_layout_1.Row, {
                    html: {},
                    wml: {}
                }, [___wml.widget(grid_layout_1.Column, {
                        html: {},
                        wml: {}
                    }, [___wml.node('p', {
                            html: {},
                            wml: {}
                        }, [___wml.node('strong', {
                                html: {},
                                wml: {}
                            }, [___wml.text("Warning")], ___view)], ___view), ___wml.node('p', {
                            html: {},
                            wml: {}
                        }, [___wml.widget(text_field_1.TextField, {
                                html: {},
                                wml: {},
                                ww: {
                                    'name': "text",
                                    'warning': "This textfield has a warning.",
                                    'onChange': ___context.onChange
                                }
                            }, [], ___view)], ___view)], ___view)], ___view), ___wml.widget(grid_layout_1.Row, {
                    html: {},
                    wml: {}
                }, [___wml.widget(grid_layout_1.Column, {
                        html: {},
                        wml: {}
                    }, [___wml.node('p', {
                            html: {},
                            wml: {}
                        }, [___wml.node('strong', {
                                html: {},
                                wml: {}
                            }, [___wml.text("Error")], ___view)], ___view), ___wml.node('p', {
                            html: {},
                            wml: {}
                        }, [___wml.widget(text_field_1.TextField, {
                                html: {},
                                wml: {},
                                ww: {
                                    'name': "text",
                                    'error': "This textfield has an error.",
                                    'onChange': ___context.onChange
                                }
                            }, [], ___view)], ___view)], ___view)], ___view), ___wml.widget(grid_layout_1.Row, {
                    html: {},
                    wml: {}
                }, [___wml.widget(grid_layout_1.Column, {
                        html: {},
                        wml: {}
                    }, [___wml.node('p', {
                            html: {},
                            wml: {}
                        }, [___wml.text("The one uses rows to render a text area:")], ___view), ___wml.node('p', {
                            html: {},
                            wml: {}
                        }, [___wml.widget(text_field_1.TextField, {
                                html: {},
                                wml: {},
                                ww: {
                                    'name': "text",
                                    'rows': 3,
                                    'onChange': ___context.onChange
                                }
                            }, [], ___view)], ___view)], ___view)], ___view)], ___view);
        };
        return _this;
    }
    return Main;
}(___wml.AppView));
exports.Main = Main;
//# sourceMappingURL=text-field.js.map