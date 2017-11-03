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
var wml_1 = require("@package/self/control/wml");
;
var select_1 = require("@package/self/control/select");
;
var text_field_1 = require("@package/self/control/text-field");
;
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
            }, [$wml.widget(select_1.Select, {
                    html: {},
                    wml: {
                        'id': ___context.values.month.id
                    },
                    ww: {
                        'name': ___context.values.month.id,
                        'onChange': ___context.values.month.onInput,
                        'disabled': ___context.values.month.disabled,
                        'readOnly': ___context.values.month.readOnly,
                        'class': ___context.values.month.class,
                        'options': ___context.values.date.months
                    }
                }, [$wml.node('option', {
                        html: {
                            'selected': true,
                            'value': "",
                            'disabled': true
                        },
                        wml: {}
                    }, [$wml.text("Month")], ___view)], ___view), $wml.widget(text_field_1.TextField, {
                    html: {},
                    wml: {
                        'id': ___context.values.day.id
                    },
                    ww: {
                        'name': ___context.values.day.id,
                        'onChange': ___context.values.day.onInput,
                        'value': ___context.values.day.value,
                        'disabled': ___context.values.day.disabled,
                        'readOnly': ___context.values.day.readOnly,
                        'class': ___context.values.day.class,
                        'placeholder': "DD"
                    }
                }, [], ___view), $wml.widget(text_field_1.TextField, {
                    html: {},
                    wml: {
                        'id': ___context.values.year.id
                    },
                    ww: {
                        'name': ___context.values.year.id,
                        'onChange': ___context.values.year.onInput,
                        'value': ___context.values.year.value,
                        'disabled': ___context.values.year.disabled,
                        'readOnly': ___context.values.year.readOnly,
                        'class': ___context.values.year.class,
                        'placeholder': "YYYY"
                    }
                }, [], ___view), $wml.domify(wml_1.message(___context.values.help.id, ___context.values.help)(___view))], ___view);
        };
        return _this;
    }
    return Main;
}($wml.AppView));
exports.Main = Main;
//# sourceMappingURL=date.js.map