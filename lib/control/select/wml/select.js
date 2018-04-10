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
var search_1 = require("../../search");
;
var menu_1 = require("../../menu");
;
var link_1 = require("../../../content/nav/link");
;
var fragment_1 = require("../../../layout/fragment");
;
var wml_1 = require("../../wml");
;
exports.itemContentTemplate = function (___context) { return function (option) { return function (_index) { return function (___view) { return ___wml.domify(___context.values.item.stringify(option)); }; }; }; };
;
exports.noItemsTemplate = function (___context) { return function (___view) { return ___wml.domify("No results to display."); }; };
;
var Results = /** @class */ (function (_super) {
    __extends(Results, _super);
    function Results(___context) {
        var _this = _super.call(this, ___context) || this;
        _this.template = function (___view) {
            return ___wml.widget(fragment_1.Fragment, {
                html: {},
                wml: {}
            }, [___wml.map(___context.values.menu.options, function _map(option, index) {
                    return ___wml.widget(menu_1.Item, {
                        html: {},
                        wml: {},
                        ww: {
                            'name': ("" + index)
                        }
                    }, [___wml.widget(link_1.Link, {
                            html: {},
                            wml: {},
                            ww: {
                                'onClick': function () { return ___context.values.item.click(index); }
                            }
                        }, [___wml.domify(___context.values.item.itemContentTemplate()(___context)(option)(index)(___view))], ___view)], ___view);
                }, function otherwise() {
                    return ___wml.domify(___context.values.item.noItemsTemplate()(___context)(___view));
                })], ___view);
        };
        return _this;
    }
    return Results;
}(___wml.AppView));
exports.Results = Results;
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(___context) {
        var _this = _super.call(this, ___context) || this;
        _this.template = function (___view) {
            return ___wml.node('div', {
                html: {
                    'class': ___context.values.root.class
                },
                wml: {}
            }, [___wml.domify(wml_1.label(___context.values.label.id)(___context.values.label.text)(___view)), ___wml.widget(search_1.Search, {
                    html: {},
                    wml: {
                        'id': ___context.values.search.id
                    },
                    ww: {
                        'class': ___context.values.search.class,
                        'placeholder': ___context.values.search.placeholder,
                        'readOnly': ___context.values.search.readOnly,
                        'onEscape': ___context.values.search.onEscape,
                        'onFocus': ___context.values.search.onFocus,
                        'onSearch': ___context.values.search.onSearch
                    }
                }, [], ___view), ___wml.widget(menu_1.Menu, {
                    html: {},
                    wml: {
                        'id': ___context.values.menu.id
                    },
                    ww: {
                        'hidden': true
                    }
                }, [], ___view), ___wml.domify(wml_1.message(___context.values.help.id)(___context.values.help)(___view))], ___view);
        };
        return _this;
    }
    return Main;
}(___wml.AppView));
exports.Main = Main;
//# sourceMappingURL=select.js.map