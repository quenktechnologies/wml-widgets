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
var SearchStack_1 = require("@package/self/control/search-stack/SearchStack");
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
                        wml: {},
                        ww: {
                            'size': 6
                        }
                    }, [$wml.node('p', {
                            html: {},
                            wml: {}
                        }, [$wml.text("You selected: "), $wml.node('b', {
                                html: {},
                                wml: {
                                    'id': "text"
                                }
                            }, [$wml.domify(___context.values.text())], ___view), $wml.text(".")], ___view), $wml.node('p', {
                            html: {},
                            wml: {}
                        }, [$wml.widget(SearchStack_1.SearchStack, {
                                html: {},
                                wml: {
                                    'id': ___context.values.id
                                },
                                ww: {
                                    'name': ___context.values.name,
                                    'value': ___context.values.selected,
                                    'decorator': function (r) { return r.label; },
                                    'onChange': ___context.onChange,
                                    'onSearch': ___context.onSearch
                                }
                            }, [], ___view)], ___view)], ___view)], ___view)], ___view);
        };
        return _this;
    }
    return Main;
}($wml.AppView));
exports.Main = Main;
//# sourceMappingURL=search-stack.js.map