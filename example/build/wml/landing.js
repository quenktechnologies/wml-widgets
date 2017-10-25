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
var Panel_1 = require("@package/self/layout/panel/Panel");
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
                            size: 4
                        }
                    }, [$wml.widget(Panel_1.Panel, {
                            html: {},
                            wml: {}
                        }, [$wml.widget(Panel_1.Header, {
                                html: {},
                                wml: {}
                            }, [$wml.text("Funding")], ___view), $wml.widget(Panel_1.Body, {
                                html: {},
                                wml: {}
                            }, [$wml.text("$742.00")], ___view)], ___view)], ___view), $wml.widget(Grid_1.Column, {
                        html: {},
                        wml: {},
                        ww: {
                            size: 4
                        }
                    }, [$wml.widget(Panel_1.Panel, {
                            html: {},
                            wml: {}
                        }, [$wml.widget(Panel_1.Header, {
                                html: {},
                                wml: {}
                            }, [$wml.text("Clients")], ___view), $wml.widget(Panel_1.Body, {
                                html: {},
                                wml: {}
                            }, [$wml.text("3")], ___view)], ___view)], ___view)], ___view)], ___view);
        };
        return _this;
    }
    return Main;
}($wml.AppView));
exports.Main = Main;
//# sourceMappingURL=landing.js.map