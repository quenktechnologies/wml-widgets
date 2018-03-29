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
var button_1 = require("@package/wml-widgets/control/button");
;
var Menu_1 = require("@package/wml-widgets/menu/Menu");
;
exports.button = function (___context) { return function (___view) { return ___wml.widget(button_1.Button, {
    html: {},
    wml: {},
    ww: {
        'class': ___context.values.button.class,
        'onClick': ___context.values.button.onClick,
        'text': ___context.values.button.text
    }
}, [], ___view); }; };
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(___context) {
        var _this = _super.call(this, ___context) || this;
        _this.template = function (___view) {
            return ___wml.node('div', {
                html: {
                    'class': ___context.values.root.class
                },
                wml: {}
            }, [___wml.domify(___context.values.button.template(___context)(___view)), ___wml.widget(Menu_1.Menu, {
                    html: {},
                    wml: {
                        'id': ___context.values.menu.id
                    },
                    ww: {
                        'hidden': true
                    }
                }, [___wml.domify(___context.values.menu.content)], ___view)], ___view);
        };
        return _this;
    }
    return Main;
}(___wml.AppView));
exports.Main = Main;
//# sourceMappingURL=button-menu.js.map