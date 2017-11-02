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
var Date_1 = require("@package/self/control/date/Date");
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
                        }, [$wml.text("The date is : "), $wml.node('b', {
                                html: {},
                                wml: {
                                    'id': "selected"
                                }
                            }, [$wml.text("(None selected)")], ___view), $wml.text(".")], ___view), $wml.node('p', {
                            html: {},
                            wml: {}
                        }, [$wml.widget(Date_1.Date, {
                                html: {},
                                wml: {
                                    'id': "date"
                                },
                                ww: {
                                    'name': "date",
                                    'onChange': ___context.onChange
                                }
                            }, [], ___view)], ___view)], ___view)], ___view)], ___view);
        };
        return _this;
    }
    return Main;
}($wml.AppView));
exports.Main = Main;
//# sourceMappingURL=date.js.map