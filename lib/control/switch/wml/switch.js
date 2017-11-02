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
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(context) {
        var _this = _super.call(this, context) || this;
        _this.template = function (___context, ___view) {
            return $wml.node('label', {
                html: {
                    'class': ___context.values.class.label
                },
                wml: {}
            }, [$wml.node('input', {
                    html: {
                        'type': "checkbox",
                        'name': ___context.values.input.name,
                        'checked': (___context.values.input.on || null),
                        'disabled': ___context.values.input.disabled,
                        'onchange': ___context.values.input.onChange
                    },
                    wml: {}
                }, [], ___view), $wml.node('div', {
                    html: {
                        'class': ___context.values.class.slider
                    },
                    wml: {}
                }, [], ___view)], ___view);
        };
        return _this;
    }
    return Main;
}($wml.AppView));
exports.Main = Main;
//# sourceMappingURL=switch.js.map