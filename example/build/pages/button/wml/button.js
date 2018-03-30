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
var Grid_1 = require("../../../../../lib/layout/grid/Grid");
;
var button_1 = require("../../../../../lib/control/button");
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
                        wml: {}
                    }, [___wml.node('h1', {
                            html: {},
                            wml: {}
                        }, [___wml.text("Buttons")], ___view), ___wml.node('p', {
                            html: {},
                            wml: {}
                        }, [___wml.node('h2', {
                                html: {},
                                wml: {}
                            }, [___wml.text("Style")], ___view), ___wml.map(___context.values.styles, function _map(v, k) {
                                return ___wml.box(___wml.widget(button_1.Button, {
                                    html: {},
                                    wml: {},
                                    ww: {
                                        'name': v,
                                        'style': v,
                                        'text': ___context.values.capitalize(k)
                                    }
                                }, [], ___view), ___wml.domify(" "));
                            }, function otherwise() {
                                return document.createDocumentFragment();
                            })], ___view)], ___view)], ___view), ___wml.widget(Grid_1.Row, {
                    html: {},
                    wml: {}
                }, [___wml.widget(Grid_1.Column, {
                        html: {},
                        wml: {}
                    }, [___wml.node('h2', {
                            html: {},
                            wml: {}
                        }, [___wml.text("Outline")], ___view), ___wml.map(___context.values.styles, function _map(style, text) {
                            return ___wml.box(___wml.widget(button_1.Button, {
                                html: {},
                                wml: {},
                                ww: {
                                    'style': style,
                                    'outline': true,
                                    'text': ___context.values.capitalize(text)
                                }
                            }, [], ___view), ___wml.domify(" "));
                        }, function otherwise() {
                            return document.createDocumentFragment();
                        })], ___view)], ___view), ___wml.widget(Grid_1.Row, {
                    html: {},
                    wml: {}
                }, [___wml.widget(Grid_1.Column, {
                        html: {},
                        wml: {}
                    }, [___wml.node('p', {
                            html: {},
                            wml: {}
                        }, [___wml.node('h2', {
                                html: {},
                                wml: {}
                            }, [___wml.text("Active")], ___view), ___wml.map(___context.values.styles, function _map(v, k) {
                                return ___wml.box(___wml.widget(button_1.Button, {
                                    html: {},
                                    wml: {},
                                    ww: {
                                        'name': v,
                                        'active': true,
                                        'style': v,
                                        'text': ___context.values.capitalize(k)
                                    }
                                }, [], ___view), ___wml.domify(" "));
                            }, function otherwise() {
                                return document.createDocumentFragment();
                            })], ___view)], ___view)], ___view), ___wml.widget(Grid_1.Row, {
                    html: {},
                    wml: {}
                }, [___wml.widget(Grid_1.Column, {
                        html: {},
                        wml: {}
                    }, [___wml.node('p', {
                            html: {},
                            wml: {}
                        }, [___wml.node('h2', {
                                html: {},
                                wml: {}
                            }, [___wml.text("Disabled")], ___view), ___wml.map(___context.values.styles, function _map(v, k) {
                                return ___wml.box(___wml.widget(button_1.Button, {
                                    html: {},
                                    wml: {},
                                    ww: {
                                        'name': v,
                                        'disabled': true,
                                        'style': v,
                                        'text': ___context.values.capitalize(k)
                                    }
                                }, [], ___view), ___wml.domify(" "));
                            }, function otherwise() {
                                return document.createDocumentFragment();
                            })], ___view)], ___view)], ___view), ___wml.widget(Grid_1.Row, {
                    html: {},
                    wml: {}
                }, [___wml.widget(Grid_1.Column, {
                        html: {},
                        wml: {}
                    }, [___wml.node('h2', {
                            html: {},
                            wml: {}
                        }, [___wml.text("Size")], ___view), ___wml.map(___context.values.styles, function _map(style, _) {
                            return ___wml.node('p', {
                                html: {},
                                wml: {}
                            }, [___wml.map(___context.values.sizes, function _map(sizeValue, size) {
                                    return ___wml.box(___wml.widget(button_1.Button, {
                                        html: {},
                                        wml: {},
                                        ww: {
                                            'name': size,
                                            'style': style,
                                            'size': sizeValue,
                                            'text': ___context.values.capitalize(size)
                                        }
                                    }, [], ___view), ___wml.domify(" "));
                                }, function otherwise() {
                                    return document.createDocumentFragment();
                                })], ___view);
                        }, function otherwise() {
                            return document.createDocumentFragment();
                        })], ___view)], ___view), ___wml.widget(Grid_1.Row, {
                    html: {},
                    wml: {}
                }, [___wml.widget(Grid_1.Column, {
                        html: {},
                        wml: {}
                    }, [___wml.node('h2', {
                            html: {},
                            wml: {}
                        }, [___wml.text("Block")], ___view), ___wml.map(___context.values.styles, function _map(style, text) {
                            return ___wml.box(___wml.widget(button_1.Button, {
                                html: {},
                                wml: {},
                                ww: {
                                    'style': style,
                                    'block': true,
                                    'text': ___context.values.capitalize(text)
                                }
                            }, [], ___view), ___wml.domify(" "));
                        }, function otherwise() {
                            return document.createDocumentFragment();
                        })], ___view)], ___view)], ___view);
        };
        return _this;
    }
    return Main;
}(___wml.AppView));
exports.Main = Main;
//# sourceMappingURL=button.js.map