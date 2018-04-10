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
var wml_1 = require("../../wml");
;
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(___context) {
        var _this = _super.call(this, ___context) || this;
        _this.template = function (___view) {
            return ___wml.node('div', {
                html: {
                    'class': ___context.values.root.class
                },
                wml: {}
            }, [___wml.domify(wml_1.label(___context.values.label.id)(___context.values.label.text)(___view)), ___wml.node('div', {
                    html: {
                        'class': ___context.values.inline.class
                    },
                    wml: {}
                }, [___wml.node('select', {
                        html: {
                            'name': ___context.values.month.id,
                            'onchange': ___context.values.month.onchange,
                            'disabled': ___context.values.month.disabled,
                            'class': ___context.values.month.class
                        },
                        wml: {
                            'id': ___context.values.month.id
                        }
                    }, [___wml.node('option', {
                            html: {
                                'selected': true,
                                'value': "",
                                'disabled': true
                            },
                            wml: {}
                        }, [___wml.text("Month")], ___view), ___wml.map(___context.values.date.months, function _map(opt) {
                            return ___wml.node('option', {
                                html: {
                                    'value': opt.value
                                },
                                wml: {}
                            }, [___wml.domify(opt.label)], ___view);
                        }, function otherwise() {
                            return document.createDocumentFragment();
                        })], ___view), ___wml.node('input', {
                        html: {
                            'name': ___context.values.day.id,
                            'oninput': ___context.values.day.oninput,
                            'onkeyup': ___context.values.day.onkeyup,
                            'value': ___context.values.day.value(),
                            'disabled': ___context.values.day.disabled,
                            'class': ___context.values.day.class,
                            'size': "2",
                            'placeholder': "DD"
                        },
                        wml: {
                            'id': ___context.values.day.id
                        }
                    }, [], ___view), ___wml.node('input', {
                        html: {
                            'name': ___context.values.year.id,
                            'oninput': ___context.values.year.oninput,
                            'onkeyup': ___context.values.year.onkeyup,
                            'value': ___context.values.year.value(),
                            'disabled': ___context.values.year.disabled,
                            'class': ___context.values.year.class,
                            'placeholder': "YYYY",
                            'size': "4"
                        },
                        wml: {
                            'id': ___context.values.year.id
                        }
                    }, [], ___view), ___wml.domify(wml_1.message(___context.values.messages.id)(___context.values.messages)(___view))], ___view)], ___view);
        };
        return _this;
    }
    return Main;
}(___wml.AppView));
exports.Main = Main;
//# sourceMappingURL=date.js.map