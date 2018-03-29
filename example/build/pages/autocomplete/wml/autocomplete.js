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
var Grid_1 = require("@package/wml-widgets/layout/grid/Grid");
;
var autocomplete_1 = require("@package/wml-widgets/control/autocomplete");
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
                        }, [___wml.text("You selected: "), ___wml.node('b', {
                                html: {},
                                wml: {
                                    'id': "selected"
                                }
                            }, [___wml.text("(nothing)")], ___view), ___wml.text(".")], ___view), ___wml.node('p', {
                            html: {},
                            wml: {}
                        }, [___wml.widget(autocomplete_1.Autocomplete, {
                                html: {},
                                wml: {
                                    'id': ___context.values.id
                                },
                                ww: {
                                    'name': ___context.values.name,
                                    'stringifier': function (r) { return r.value; },
                                    'onSearch': ___context.onSearch,
                                    'onSelect': ___context.onSelect
                                }
                            }, [], ___view)], ___view)], ___view)], ___view)], ___view);
        };
        return _this;
    }
    return Main;
}(___wml.AppView));
exports.Main = Main;
//# sourceMappingURL=autocomplete.js.map