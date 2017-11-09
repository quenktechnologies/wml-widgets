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
var wml_1 = require("@package/self/control/wml");
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(context) {
        var _this = _super.call(this, context) || this;
        _this.template = function (___context, ___view) {
            return ___wml.node('div', {
                html: {
                    'class': ___context.values.root.class
                },
                wml: {}
            }, [___wml.domify(wml_1.label(___context.values.label.id, ___context.values.label.text)(___view)), ((___context.values.input.rows === 1)) ? ___wml.node('input', {
                    html: {
                        'name': ___context.values.input.name,
                        'type': ___context.values.input.type,
                        'placeholder': ___context.values.input.placeholder,
                        'oninput': ___context.values.input.onInput,
                        'value': ___context.values.input.value,
                        'disabled': ___context.values.input.disabled,
                        'readonly': ___context.values.input.readOnly,
                        'class': ___context.values.input.class
                    },
                    wml: {
                        'id': "input"
                    }
                }, [], ___view) : ___wml.node('textarea', {
                    html: {
                        'name': ___context.values.input.name,
                        'placeholder': ___context.values.input.placeholder,
                        'oninput': ___context.values.input.onInput,
                        'disabled': ___context.values.input.disabled,
                        'readonly': ___context.values.input.readOnly,
                        'rows': ___context.values.input.rows,
                        'class': ___context.values.input.class
                    },
                    wml: {
                        'id': "input"
                    }
                }, [___wml.domify(___context.values.input.value)], ___view), ___wml.domify(wml_1.message(___context.values.help.id, ___context.values.help)(___view))], ___view);
        };
        return _this;
    }
    return Main;
}(___wml.AppView));
exports.Main = Main;
//# sourceMappingURL=text-field.js.map