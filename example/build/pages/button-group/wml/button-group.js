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
var button_1 = require("@package/wml-widgets/control/button");
;
var button_group_1 = require("@package/wml-widgets/control/button-group");
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
                    }, [___wml.widget(button_group_1.ButtonGroup, {
                            html: {},
                            wml: {}
                        }, [___wml.widget(button_1.Button, {
                                html: {},
                                wml: {},
                                ww: {
                                    'text': "one"
                                }
                            }, [], ___view), ___wml.widget(button_1.Button, {
                                html: {},
                                wml: {},
                                ww: {
                                    'text': "three"
                                }
                            }, [], ___view), ___wml.widget(button_1.Button, {
                                html: {},
                                wml: {},
                                ww: {
                                    'text': "four"
                                }
                            }, [], ___view)], ___view)], ___view)], ___view)], ___view);
        };
        return _this;
    }
    return Main;
}(___wml.AppView));
exports.Main = Main;
//# sourceMappingURL=button-group.js.map