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
var stack_1 = require("@package/wml-widgets/control/stack");
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
                            'size': 4
                        }
                    }, [___wml.node('p', {
                            html: {},
                            wml: {}
                        }, [___wml.text("Members: "), ___wml.node('b', {
                                html: {},
                                wml: {
                                    'id': "selected"
                                }
                            }, [___wml.domify(___context.values.text)], ___view), ___wml.text(".")], ___view), ___wml.node('p', {
                            html: {},
                            wml: {}
                        }, [___wml.widget(stack_1.Stack, {
                                html: {},
                                wml: {},
                                ww: {
                                    'name': "stack",
                                    'value': ___context.values.values,
                                    'decorator': ___context.values.decorator,
                                    'onChange': ___context.onChange
                                }
                            }, [], ___view)], ___view)], ___view)], ___view)], ___view);
        };
        return _this;
    }
    return Main;
}(___wml.AppView));
exports.Main = Main;
//# sourceMappingURL=stack.js.map