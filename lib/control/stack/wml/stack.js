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
;
exports.content = function (m) { return function (___context) { return function (___view) { return $wml.node('span', {
    html: {
        'class': ___context.values.class.member
    },
    wml: {}
}, [$wml.domify(___context.values.item.decorator(m))], ___view); }; }; };
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(context) {
        var _this = _super.call(this, context) || this;
        _this.template = function (___context, ___view) {
            return $wml.node('ul', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [$wml.map(___context.values.value, function _map(m, index) {
                    return $wml.node('li', {
                        html: {},
                        wml: {}
                    }, [$wml.domify(___context.values.item.template(m, index, ___context.values.value)(___context)(___view)), $wml.node('button', {
                            html: {
                                'class': ___context.values.class.close,
                                'onclick': ___context.values.item.close(index)
                            },
                            wml: {}
                        }, [$wml.text("\u00D7")], ___view)], ___view);
                }, function otherwise() {
                    return document.createDocumentFragment();
                })], ___view);
        };
        return _this;
    }
    return Main;
}($wml.AppView));
exports.Main = Main;
//# sourceMappingURL=stack.js.map