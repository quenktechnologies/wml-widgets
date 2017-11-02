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
var TextField_1 = require("@package/self/control/text-field/TextField");
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
                        wml: {}
                    }, [$wml.node('p', {
                            html: {},
                            wml: {}
                        }, [$wml.text("The value of the input is:")], ___view), $wml.node('p', {
                            html: {},
                            wml: {
                                'id': "content"
                            }
                        }, [$wml.domify("(Nothing)")], ___view), $wml.node('p', {
                            html: {},
                            wml: {}
                        }, [$wml.widget(TextField_1.TextField, {
                                html: {},
                                wml: {
                                    'id': "text"
                                },
                                ww: {
                                    'name': "text",
                                    'onChange': ___context.onChange
                                }
                            }, [], ___view)], ___view)], ___view)], ___view), $wml.widget(Grid_1.Row, {
                    html: {},
                    wml: {}
                }, [$wml.widget(Grid_1.Column, {
                        html: {},
                        wml: {}
                    }, [$wml.node('p', {
                            html: {},
                            wml: {}
                        }, [$wml.text("The one uses rows to render a text area:")], ___view), $wml.node('p', {
                            html: {},
                            wml: {}
                        }, [$wml.widget(TextField_1.TextField, {
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
}($wml.AppView));
exports.Main = Main;
//# sourceMappingURL=text-field.js.map