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
var Menu_1 = require("@package/self/menu/Menu");
;
var MenuItem_1 = require("@package/self/menu/MenuItem");
;
var Fragment_1 = require("@package/self/layout/fragment/Fragment");
;
;
var wml_1 = require("@package/self/control/wml");
exports.populated = function (option, _index, _options) { return function (___context) { return function (___view) { return ___wml.domify(___context.values.item.stringify(option)); }; }; };
;
exports.empty = function () { return function (___context) { return function (___view) { return ___wml.domify("No results to display."); }; }; };
;
var Results = /** @class */ (function (_super) {
    __extends(Results, _super);
    function Results(context) {
        var _this = _super.call(this, context) || this;
        _this.template = function (___context, ___view) {
            return ___wml.widget(Fragment_1.Fragment, {
                html: {},
                wml: {}
            }, [___wml.map(___context.values.search.results, function _map(option, index) {
                    return ___wml.widget(MenuItem_1.MenuItem, {
                        html: {},
                        wml: {},
                        ww: {
                            'name': ("" + index),
                            'onClick': function () { return ___context.values.item.click(index); }
                        }
                    }, [___wml.domify(___context.values.item.template.populated(option, index, ___context.values.search.results)(___context)(___view))], ___view);
                }, function otherwise() {
                    return ___wml.domify(___context.values.item.template.empty()(___context)(___view));
                })], ___view);
        };
        return _this;
    }
    return Results;
}(___wml.AppView));
exports.Results = Results;
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(context) {
        var _this = _super.call(this, context) || this;
        _this.template = function (___context, ___view) {
            return ___wml.node('div', {
                html: {
                    'class': ___context.values.root.class
                },
                wml: {}
            }, [___wml.domify(wml_1.label(___context.values.label.id, ___context.values.label.text)(___view)), ___wml.node('input', {
                    html: {
                        'type': "text",
                        'class': ___context.values.input.class,
                        'onkeydown': ___context.values.input.onKeyDown,
                        'onkeyup': ___context.values.input.onKeyUp,
                        'oninput': ___context.values.input.onInput,
                        'placeholder': ___context.values.input.placeholder
                    },
                    wml: {
                        'id': ___context.values.input.id
                    }
                }, [], ___view), ___wml.widget(Menu_1.Menu, {
                    html: {},
                    wml: {
                        'id': ___context.values.menu.id
                    },
                    ww: {
                        'hidden': true
                    }
                }, [], ___view), ___wml.domify(wml_1.message(___context.values.help.id, ___context.values.help)(___view))], ___view);
        };
        return _this;
    }
    return Main;
}(___wml.AppView));
exports.Main = Main;
//# sourceMappingURL=autocomplete.js.map