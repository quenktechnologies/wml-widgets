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
            return ___wml.node('select', {
                html: {
                    'class': ___context.values.className,
                    'onchange': ___context.values.onchange,
                    'value': ___context.values.selected
                },
                wml: {}
            }, [___wml.node('option', {
                    html: {
                        'disabled': "true",
                        'selected': true
                    },
                    wml: {}
                }, [___wml.domify(___context.values.instruction)], ___view), ___wml.map(___context.values.options, function _map(opt, index) {
                    return ___wml.node('option', {
                        html: {
                            'value': ("" + index)
                        },
                        wml: {}
                    }, [___wml.domify(opt.title)], ___view);
                }, function otherwise() {
                    return document.createDocumentFragment();
                })], ___view);
        };
        return _this;
    }
    return Main;
}(___wml.AppView));
exports.Main = Main;
//# sourceMappingURL=select.js.map