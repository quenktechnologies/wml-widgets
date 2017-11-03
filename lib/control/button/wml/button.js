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
var Group = /** @class */ (function (_super) {
    __extends(Group, _super);
    function Group(context) {
        var _this = _super.call(this, context) || this;
        _this.template = function (___context, ___view) {
            return ___wml.node('div', {
                html: {
                    'class': ___context.getClass,
                    'role': "group"
                },
                wml: {}
            }, [___wml.domify(___context.children)], ___view);
        };
        return _this;
    }
    return Group;
}(___wml.AppView));
exports.Group = Group;
;
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button(context) {
        var _this = _super.call(this, context) || this;
        _this.template = function (___context, ___view) {
            return ___wml.node('button', {
                html: {
                    'type': ___context.values.button.type,
                    'name': ___context.values.button.name,
                    'disabled': ___context.values.button.disabled,
                    'class': ___context.values.button.class,
                    'onclick': ___context.values.button.onclick
                },
                wml: {
                    'id': "button"
                }
            }, [___wml.domify(___context.values.button.text), ___wml.domify(___context.children)], ___view);
        };
        return _this;
    }
    return Button;
}(___wml.AppView));
exports.Button = Button;
//# sourceMappingURL=button.js.map