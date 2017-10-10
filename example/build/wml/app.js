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
var wml_runtime_1 = require("@quenk/wml-runtime");
var Drawer_1 = require("@package/self/layout/drawer/Drawer");
var ActionBar_1 = require("@package/self/app/action-bar/ActionBar");
var MenuButton_1 = require("@package/self/app/menu-button/MenuButton");
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(context) {
        var _this = _super.call(this, context) || this;
        var view = _this;
        _this.template = function ($$view, $$ctx) {
            return wml_runtime_1.widget(Drawer_1.Drawer, {
                html: {},
                wml: {
                    'id': $$ctx.values.id.layout
                }
            }, [wml_runtime_1.widget(ActionBar_1.ActionBar, {
                    html: {},
                    wml: {}
                }, [wml_runtime_1.widget(MenuButton_1.MenuButton, {
                        html: {},
                        wml: {},
                        ww: {
                            'onClick': function function_literal_1() {
                                return $$ctx.view.findById($$ctx.values.id.layout).map(function function_literal_2(d) {
                                    return d.toggleDrawer();
                                });
                            }
                        }
                    }, [], $$view)], $$view)], $$view);
        };
        return _this;
    }
    return Main;
}(wml_runtime_1.AppView));
exports.Main = Main;
//# sourceMappingURL=app.js.map