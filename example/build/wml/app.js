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
var Drawer_1 = require("@package/self/layout/drawer/Drawer");
;
var ActionBar_1 = require("@package/self/app/action-bar/ActionBar");
;
;
var IconButton_1 = require("@package/self/control/icon-button/IconButton");
;
var dash_1 = require("@package/self/app/dash");
;
var Main_1 = require("@package/self/layout/main/Main");
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(___context) {
        var _this = _super.call(this, ___context) || this;
        _this.template = function (___view) {
            return ___wml.widget(Drawer_1.Drawer, {
                html: {},
                wml: {
                    'id': ___context.values.id.layout
                },
                ww: {
                    'drawer': ___context.navigation
                }
            }, [___wml.widget(ActionBar_1.ActionBar, {
                    html: {},
                    wml: {}
                }, [___wml.widget(IconButton_1.IconButton, {
                        html: {},
                        wml: {},
                        ww: {
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
                        }, [], ___view)], ___view)], ___view), ___wml.widget(Main_1.Main, {
                    html: {},
                    wml: {}
                }, [___wml.domify(___context.content.render())], ___view)], ___view);
        };
        return _this;
    }
    return Main;
}(___wml.AppView));
exports.Main = Main;
//# sourceMappingURL=app.js.map