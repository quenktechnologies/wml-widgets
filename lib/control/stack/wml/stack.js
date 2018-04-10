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
exports.content = function (___context) { return function (v) { return function (_) { return function (___view) { return ___wml.node('div', {
    html: {
        'class': ___context.values.element.content.class
    },
    wml: {}
}, [___wml.domify(___context.values.element.decorator(v))], ___view); }; }; }; };
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(___context) {
        var _this = _super.call(this, ___context) || this;
        _this.template = function (___view) {
            return ___wml.node('ul', {
                html: {
                    'class': ___context.values.root.class
                },
                wml: {}
            }, [___wml.map(___context.values.root.value, function _map(v, index) {
                    return ___wml.node('li', {
                        html: {
                            'class': ___context.values.element.class
                        },
                        wml: {}
                    }, [___wml.domify(___context.values.element.template()(v)(index)(___view)), ___wml.node('button', {
                            html: {
                                'class': ___context.values.close.class,
                                'onclick': ___context.values.element.close(index)
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