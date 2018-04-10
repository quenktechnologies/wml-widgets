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
            return ___wml.node('input', {
                html: {
                    'class': ___context.values.root.class,
                    'onkeydown': ___context.values.root.onkeydown,
                    'onkeyup': ___context.values.root.onkeyup,
                    'oninput': ___context.values.root.oninput,
                    'onfocus': ___context.values.root.onfocus,
                    'placeholder': ___context.values.root.placeholder,
                    'readOnly': ___context.values.root.readOnly,
                    'value': ___context.values.root.value
                },
                wml: {
                    'id': ___context.values.root.id
                }
            }, [], ___view);
        };
        return _this;
    }
    return Main;
}(___wml.AppView));
exports.Main = Main;
//# sourceMappingURL=search.js.map