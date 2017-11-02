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
var wml_1 = require("@package/self/control/wml");
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
            }, [$wml.domify(wml_1.label($wml.read("ww:id", ___context.attrs), $wml.read("ww:label", ___context.attrs))(___view)), $wml.node('select', {
                    html: {
                        'name': ___context.values.select.name,
                        'onchange': ___context.values.select.onChange,
                        'value': ___context.values.select.value,
                        'disabled': ___context.values.select.disabled,
                        'readonly': ___context.values.select.readOnly,
                        'class': ___context.values.select.class
                    },
                    wml: {
                        'id': ___context.values.select.id
                    }
                }, [$wml.node('option', {
                        html: {
                            'value': "",
                            'disabeld': true
                        },
                        wml: {}
                    }, [$wml.domify(___context.values.select.placeholder)], ___view), $wml.map(___context.values.select.options, function _map(opt) {
                        return $wml.node('option', {
                            html: {
                                'value': ___context.values.select.optValue(opt),
                                'selected': ___context.values.select.isSelected(___context.values.select.optValue(opt))
                            },
                            wml: {}
                        }, [$wml.domify(___context.values.select.optLabel(opt))], ___view);
                    }, function otherwise() {
                        return document.createDocumentFragment();
                    })], ___view), $wml.domify(wml_1.message(___context.values.help.id, ___context.values.help)(___view))], ___view);
        };
        return _this;
    }
    return Main;
}($wml.AppView));
exports.Main = Main;
//# sourceMappingURL=select.js.map