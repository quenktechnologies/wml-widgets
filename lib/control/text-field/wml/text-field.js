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
var wml_2 = require("../../wml");
exports.label = wml_2.label;
exports.message = wml_2.message;
;
exports.input = function (___context) { return function (___view) { return ___wml.node('input', {
    html: {
        'name': ___context.values.control.name,
        'type': ___context.values.control.type,
        'focus': ___context.values.control.focus,
        'placeholder': ___context.values.control.placeholder,
        'oninput': ___context.values.control.oninput,
        'value': ___context.values.control.value,
        'disabled': ___context.values.control.disabled,
        'readonly': ___context.values.control.readOnly,
        'class': ___context.values.control.class
    },
    wml: {
        'id': "control"
    }
}, [], ___view); }; };
;
exports.textarea = function (___context) { return function (___view) { return ___wml.node('textarea', {
    html: {
        'name': ___context.values.control.name,
        'placeholder': ___context.values.control.placeholder,
        'oninput': ___context.values.control.oninput,
        'disabled': ___context.values.control.disabled,
        'readonly': ___context.values.control.readOnly,
        'rows': ___context.values.control.rows,
        'class': ___context.values.control.class
    },
    wml: {
        'id': "control"
    }
}, [___wml.domify(___context.values.control.value)], ___view); }; };
;
exports.control = function (___context) { return function (___view) { return ((___context.values.control.rows === 1)) ? ___wml.domify(exports.input(___context)(___view)) : ___wml.domify(exports.textarea(___context)(___view)); }; };
;
exports.group = function (___context) { return function (___view) { return ___wml.box(___wml.domify(wml_1.label(___context.values.label.id)(___context.values.label.text)(___view)), ___wml.domify(exports.control(___context)(___view)), ___wml.domify(wml_1.message(___context.values.messages.id)(___context.values.messages)(___view))); }; };
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(___context) {
        var _this = _super.call(this, ___context) || this;
        _this.template = function (___view) {
            return ___wml.node('div', {
                html: {
                    'class': ___context.values.root.class
                },
                wml: {
                    'id': ___context.values.root.id
                }
            }, [___wml.domify(___context.values.control.template()(___context)(___view))], ___view);
        };
        return _this;
    }
    return Main;
}(___wml.AppView));
exports.Main = Main;
//# sourceMappingURL=text-field.js.map