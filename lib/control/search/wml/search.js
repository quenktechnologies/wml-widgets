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
var Menu_1 = require("@package/self/menu/Menu");
;
var MenuItem_1 = require("@package/self/menu/MenuItem");
;
var Fragment_1 = require("@package/self/layout/fragment/Fragment");
;
;
exports.populated = function (option, _index, _options) { return function (___context) { return function (___view) { return $wml.domify(___context.values.item.decorator(option)); }; }; };
;
exports.empty = function () { return function (___context) { return function (___view) { return $wml.domify("No results to display."); }; }; };
;
var Results = /** @class */ (function (_super) {
    __extends(Results, _super);
    function Results(context) {
        var _this = _super.call(this, context) || this;
        _this.template = function (___context, ___view) {
            return $wml.widget(Fragment_1.Fragment, {
                html: {},
                wml: {}
            }, [$wml.map(___context.values.search.results, function _map(option, index) {
                    return $wml.widget(MenuItem_1.MenuItem, {
                        html: {},
                        wml: {},
                        ww: {
                            'name': ("" + index),
                            'onClick': ___context.values.item.clicked
                        }
                    }, [$wml.domify(___context.values.item.template.populated(option, index, ___context.values.search.results)(___context)(___view))], ___view);
                }, function otherwise() {
                    return $wml.domify(___context.values.item.template.empty()(___context)(___view));
                })], ___view);
        };
        return _this;
    }
    return Results;
}($wml.AppView));
exports.Results = Results;
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(context) {
        var _this = _super.call(this, context) || this;
        _this.template = function (___context, ___view) {
            return $wml.node('div', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [$wml.node('input', {
                    html: {
                        'type': "text",
                        'class': ___context.values.class.input,
                        'onkeydown': ___context.values.input.onKeyDown,
                        'onkeyup': ___context.values.input.onKeyUp,
                        'oninput': ___context.values.input.onInput,
                        'placeholder': ___context.values.input.placeholder
                    },
                    wml: {
                        'id': ___context.values.id.input
                    }
                }, [], ___view), $wml.widget(Menu_1.Menu, {
                    html: {},
                    wml: {
                        'id': ___context.values.id.menu
                    },
                    ww: {
                        'hidden': true
                    }
                }, [], ___view)], ___view);
        };
        return _this;
    }
    return Main;
}($wml.AppView));
exports.Main = Main;
//# sourceMappingURL=search.js.map