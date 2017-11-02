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
var Group = /** @class */ (function (_super) {
    __extends(Group, _super);
    function Group(context) {
        var _this = _super.call(this, context) || this;
        _this.template = function (___context, ___view) {
            return $wml.node('div', {
                html: {
                    'class': ___context.getClass,
                    'role': "group"
                },
                wml: {}
            }, [$wml.domify(___context.children)], ___view);
        };
        return _this;
    }
    return Group;
}($wml.AppView));
exports.Group = Group;
;
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button(context) {
        var _this = _super.call(this, context) || this;
        _this.template = function (___context, ___view) {
            return $wml.node('button', {
                html: {
                    'type': $wml.read("ww:type", ___context.attrs, "button"),
                    'name': $wml.read("ww:name", ___context.attrs, ""),
                    'disabled': ($wml.read("ww:disabled", ___context.attrs)) ? "true" : null,
                    'class': ___context.values.class.button,
                    'onclick': $wml.read("ww:onClick", ___context.attrs)
                },
                wml: {
                    'id': "button"
                }
            }, [$wml.domify($wml.read("ww:text", ___context.attrs, "")), $wml.domify(___context.children)], ___view);
        };
        return _this;
    }
    return Button;
}($wml.AppView));
exports.Button = Button;
//# sourceMappingURL=button.js.map