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
var wml = require("@quenk/wml");
var names = require("../../common/names");
var views = require("./wml/button-menu");
var util_1 = require("../../common/util");
/**
 * ButtonMenu
 */
var ButtonMenu = /** @class */ (function (_super) {
    __extends(ButtonMenu, _super);
    function ButtonMenu() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this._buttonTemplate = _this.attrs.ww.buttonTemplate ?
            _this.attrs.ww.buttonTemplate : views.button;
        _this.values = {
            id: {
                root: 'root',
                target: 'menu'
            },
            root: {
                class: util_1.concat(names.BUTTON_MENU, (_this.attrs.ww && _this.attrs.ww.class) ?
                    _this.attrs.ww.class : '')
            },
            button: {
                text: _this.attrs.ww.text ? _this.attrs.ww.text : '',
                template: _this._buttonTemplate,
                class: names.BUTTON_MENU_BUTTON,
                onClick: function () { _this.view.findById(_this.values.menu.id).map(function (m) { return m.toggle(); }); }
            },
            menu: {
                id: 'menu',
                content: _this.attrs.ww.content ? _this.attrs.ww.content : _this.children
            }
        };
        return _this;
    }
    /**
     * hide the menu.
     */
    ButtonMenu.prototype.hide = function () {
        this.view.findById(this.values.menu.id)
            .map(function (m) { return m.hide(); });
        return this;
    };
    /**
     * show the menu.
     */
    ButtonMenu.prototype.show = function () {
        this.view.findById(this.values.menu.id)
            .map(function (m) { return m.show(); });
        return this;
    };
    /**
     * toggle the menu.
     */
    ButtonMenu.prototype.toggle = function () {
        this.view.findById(this.values.menu.id)
            .map(function (m) { return m.toggle(); });
        return this;
    };
    /**
     * setContent of this menu.
     */
    ButtonMenu.prototype.setContent = function (view) {
        this.values.menu.content = [view.render()];
        this.view.invalidate();
        return this;
    };
    return ButtonMenu;
}(wml.Component));
exports.ButtonMenu = ButtonMenu;
//# sourceMappingURL=ButtonMenu.js.map