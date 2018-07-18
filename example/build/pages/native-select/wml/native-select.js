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
var select_1 = require("../../../../../lib/control/native/select");
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
                        }, [___wml.text("You selected: "), ___wml.node('b', {
                                html: {},
                                wml: {
                                    'id': "select-content"
                                }
                            }, [___wml.text("(None)")], ___view), ___wml.text(".")], ___view), ___wml.node('p', {
                            html: {},
                            wml: {}
                        }, [___wml.widget(select_1.Select, {
                                html: {},
                                wml: {
                                    'id': "select"
                                },
                                ww: {
                                    'name': "select",
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
//# sourceMappingURL=native-select.js.map