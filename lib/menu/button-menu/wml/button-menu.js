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
var Menu_1 = require("@package/self/menu/Menu");
;
exports.button = function () { return function (___context) { return function (___view) { return $wml.node('button', {
    html: {
        'class': ___context.values.button.class,
        'type': "button",
        'onclick': ___context.values.button.onClick
    },
    wml: {}
}, [$wml.domify(___context.values.button.text)], ___view); }; }; };
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(context) {
        var _this = _super.call(this, context) || this;
        _this.template = function (___context, ___view) {
            return $wml.node('div', {
                html: {
                    'class': ___context.values.root.class
                },
                wml: {}
            }, [$wml.domify(___context.values.button.template()(___context)(___view)), $wml.widget(Menu_1.Menu, {
                    html: {},
                    wml: {
                        'id': ___context.values.menu.id
                    },
                    ww: {
                        'hidden': true
                    }
                }, [$wml.domify(___context.values.menu.content)], ___view)], ___view);
        };
        return _this;
    }
    return Main;
}($wml.AppView));
exports.Main = Main;
//# sourceMappingURL=button-menu.js.map