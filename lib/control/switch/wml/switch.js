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
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(___context) {
        var _this = _super.call(this, ___context) || this;
        _this.template = function (___view) {
            return ___wml.node('label', {
                html: {
                    'class': ___context.values.root.class
                },
                wml: {}
            }, [___wml.node('input', {
                    html: {
                        'type': "checkbox",
                        'name': ___context.values.input.name,
                        'checked': ___context.values.input.value,
                        'disabled': ___context.values.input.disabled,
                        'onchange': ___context.values.input.onChange
                    },
                    wml: {}
                }, [], ___view), ___wml.node('div', {
                    html: {
                        'class': ___context.values.slider.class
                    },
                    wml: {}
                }, [], ___view)], ___view);
        };
        return _this;
    }
    return Main;
}(___wml.AppView));
exports.Main = Main;
//# sourceMappingURL=switch.js.map