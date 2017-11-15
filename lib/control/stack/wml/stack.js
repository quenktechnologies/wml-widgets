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
;
exports.content = function (___context) { return function (m) { return function (_) { return function (__) { return function (___view) { return ___wml.node('span', {
    html: {
        'class': ___context.values.class.member
    },
    wml: {}
}, [___wml.domify(___context.values.item.decorator(m))], ___view); }; }; }; }; };
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(context) {
        var _this = _super.call(this, context) || this;
        _this.template = function (___context, ___view) {
            return ___wml.node('ul', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [___wml.map(___context.values.value, function _map(m, index) {
                    return ___wml.node('li', {
                        html: {},
                        wml: {}
                    }, [___wml.domify(___context.values.item.template(___context)(m)(index)(___context.values.value)(___view)), ___wml.node('button', {
                            html: {
                                'class': ___context.values.class.close,
                                'onclick': ___context.values.item.close(index)
                            },
                            wml: {}
                        }, [___wml.text("\u00D7")], ___view)], ___view);
                }, function otherwise() {
                    return document.createDocumentFragment();
                })], ___view);
        };
        return _this;
    }
    return Main;
}(___wml.AppView));
exports.Main = Main;
//# sourceMappingURL=stack.js.map