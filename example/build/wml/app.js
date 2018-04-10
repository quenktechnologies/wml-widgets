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
var drawer_layout_1 = require("../../../lib/layout/drawer-layout");
;
var action_bar_1 = require("../../../lib/app/action-bar");
;
;
var button_1 = require("../../../lib/control/button");
;
var dash_1 = require("../../../lib/app/dash");
;
var main_layout_1 = require("../../../lib/layout/main-layout");
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(___context) {
        var _this = _super.call(this, ___context) || this;
        _this.template = function (___view) {
            return ___wml.widget(drawer_layout_1.DrawerLayout, {
                html: {},
                wml: {
                    'id': ___context.values.id.layout
                },
                ww: {
                    'drawer': ___context.navigation
                }
            }, [___wml.widget(action_bar_1.ActionBar, {
                    html: {},
                    wml: {}
                }, [___wml.widget(button_1.Button, {
                        html: {},
                        wml: {},
                        ww: {
                            'name': "toggle",
                            'onClick': ___context.toggleDrawer
                        }
                    }, [___wml.widget(dash_1.Dash, {
                            html: {},
                            wml: {}
                        }, [], ___view), ___wml.widget(dash_1.Dash, {
                            html: {},
                            wml: {}
                        }, [], ___view), ___wml.widget(dash_1.Dash, {
                            html: {},
                            wml: {}
                        }, [], ___view)], ___view)], ___view), ___wml.widget(main_layout_1.MainLayout, {
                    html: {},
                    wml: {}
                }, [(___context.content) ? ___wml.domify(___context.content.render()) : ___wml.domify("")], ___view)], ___view);
        };
        return _this;
    }
    return Main;
}(___wml.AppView));
exports.Main = Main;
//# sourceMappingURL=app.js.map