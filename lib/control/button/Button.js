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
var G = require("@package/self/content/Group");
var names = require("@package/self/common/names");
var views = require("./wml/button");
var util_1 = require("@package/self/common/util");
/**
 * Group multiple buttons into one element.
 */
var Group = /** @class */ (function (_super) {
    __extends(Group, _super);
    function Group() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Group(_this);
        _this.values = {
            root: {
                class: util_1.concat('btn-group', (_this.attrs.ww) ? _this.attrs.ww.class : '')
            }
        };
        return _this;
    }
    return Group;
}(G.Group));
exports.Group = Group;
;
/**
 * Button is an improvement over HTMLButtionElement
 */
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Button(_this);
        _this.values = {
            id: {
                button: 'button'
            },
            button: {
                class: _this.attrs.ww ?
                    util_1.concat(names.BUTTON, _this.attrs.ww.variant || names.DEFAULT, _this.attrs.ww.style, _this.attrs.ww.active ?
                        names.ACTIVE : '', _this.attrs.ww.class) :
                    names.BUTTON,
                type: (_this.attrs.ww && _this.attrs.ww.type) ? _this.attrs.ww.type : 'button',
                name: (_this.attrs.ww && _this.attrs.ww.name) ? _this.attrs.ww.name : '',
                disabled: (_this.attrs.ww && _this.attrs.ww.disabled) ? _this.attrs.ww.disabled : null,
                onclick: (_this.attrs.ww && _this.attrs.ww.onClick) ? _this.attrs.ww.onClick : function () { },
                text: (_this.attrs.ww && _this.attrs.ww.text) ? _this.attrs.ww.text : ''
            }
        };
        return _this;
    }
    /**
     * disable this button.
     */
    Button.prototype.disable = function () {
        this.view.findById(this.values.id.button)
            .map(function (b) { return b.setAttribute('disabled', 'disabled'); });
    };
    /**
     * enable this button.
     */
    Button.prototype.enable = function () {
        this.view.findById(this.values.id.button)
            .map(function (b) { return b.removeAttribute('disabled'); });
    };
    Button.prototype.rendered = function () {
        if (this.attrs.ww)
            if (this.attrs.ww.disabled)
                this.view.findById(this.values.id.button)
                    .map(function (b) { return b.setAttribute('disabled', 'disabled'); });
    };
    return Button;
}(G.Group));
exports.Button = Button;
//# sourceMappingURL=Button.js.map