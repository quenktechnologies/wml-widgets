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
var button_1 = require("../../button");
;
var caret_1 = require("../../../content/x/caret");
;
exports.button = function (___context) { return function (___view) { return ___wml.box(___wml.widget(button_1.Button, {
    html: {},
    wml: {},
    ww: {
        'class': ___context.values.button.class,
        'onClick': ___context.values.toggle.onClick,
        'text': ___context.values.button.text
    }
}, [], ___view), ___wml.widget(button_1.Button, {
    html: {},
    wml: {},
    ww: {
        'class': ___context.values.toggle.class,
        'onClick': ___context.values.toggle.onClick
    }
}, [___wml.widget(caret_1.Caret, {
        html: {},
        wml: {}
    }, [], ___view)], ___view)); }; };
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(___context) {
        var _this = _super.call(this, ___context) || this;
        _this.template = function (___view) {
            return ___wml.node('div', {
                html: {
                    'class': ___context.values.root.class
                },
                wml: {
                    'id': ___context.values.root.id
                }
            }, [___wml.domify(___context.values.button.template()(___context)(___view)), ___wml.node('div', {
                    html: {
                        'class': ___context.values.content.class
                    },
                    wml: {
                        'id': ___context.values.content.id
                    }
                }, [___wml.domify(___context.values.content.render())], ___view)], ___view);
        };
        return _this;
    }
    return Main;
}(___wml.AppView));
exports.Main = Main;
//# sourceMappingURL=drop-down.js.map