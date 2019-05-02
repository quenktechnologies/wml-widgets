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
var views = require("./wml/drop-down");
var hidden = require("../../content/state/hidden");
var style = require("../../content/style");
var wml_1 = require("@quenk/wml");
var util_1 = require("../../util");
var __1 = require("../../");
///classNames:begin
exports.DROP_DOWN = 'ww-drop-down-menu';
exports.DROP_DOWN_TOGGLE = 'ww-drop-down-menu__toggle';
exports.DROP_DOWN_CONTENT = 'ww-drop-down__content';
/**
 * DropDown provides a component for displaying a pop up menu.
 *
 *
 *    +--------+
 *    |  Menu  |
 *    +--------+
 *    +-------------------------+
 *    |                         |
 *    | ----------------------- |
 *    |                         |
 *    | ----------------------- |
 *    |                         |
 *    | ----------------------- |
 *    |                         |
 *    +-------------------------+
 */
var DropDown = /** @class */ (function (_super) {
    __extends(DropDown, _super);
    function DropDown() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.values = {
            root: {
                wml: {
                    id: 'root'
                },
                id: __1.getId(_this.attrs),
                className: util_1.concat(exports.DROP_DOWN, __1.getClassName(_this.attrs))
            },
            button: {
                text: (_this.attrs.ww && _this.attrs.ww.buttonText) ?
                    _this.attrs.ww.buttonText : '',
                className: util_1.concat(exports.DROP_DOWN_TOGGLE, style.DEFAULT, (_this.attrs.ww && _this.attrs.ww.buttonClassName) ?
                    _this.attrs.ww.buttonClassName : ''),
                template: function () {
                    return (_this.attrs.ww && _this.attrs.ww.buttonTemplate) ?
                        _this.attrs.ww.buttonTemplate : views.button;
                },
                onClick: function () {
                    var mayRoot = util_1.getById(_this.view, _this.values.root.wml.id);
                    if (mayRoot.isJust()) {
                        var e = mayRoot.get();
                        if (_this.values.content.autoClose) {
                            var hide = _this.values.content.hide;
                            //intercept clicks on button and content sections
                            for (var i = 0; i < e.children.length; i++) {
                                //prevent doubling up handlers.
                                e.children[i]
                                    .removeEventListener('click', hide);
                                e.children[i].addEventListener('click', hide);
                            }
                        }
                        _this.toggle();
                        window.addEventListener('click', _this);
                    }
                }
            },
            content: {
                wml: {
                    id: 'content'
                },
                className: util_1.concat(exports.DROP_DOWN_CONTENT, hidden.HIDDEN),
                autoClose: (_this.attrs.ww && _this.attrs.ww.autoClose === false) ?
                    false : true,
                render: function () { return _this.children; },
                hide: function () { return _this.hide(); }
            }
        };
        return _this;
    }
    DropDown.prototype.isHidden = function () {
        return hidden.isHidden(this.view, this.values.content.wml.id);
    };
    DropDown.prototype.hide = function () {
        hidden.hide(this.view, this.values.content.wml.id);
        return this;
    };
    DropDown.prototype.show = function () {
        hidden.show(this.view, this.values.content.wml.id);
        return this;
    };
    DropDown.prototype.toggle = function () {
        hidden.toggle(this.view, this.values.content.wml.id);
        return this;
    };
    DropDown.prototype.handleEvent = function (e) {
        var _this = this;
        util_1.getById(this.view, this.values.root.wml.id)
            .map(function (root) {
            if (!document.body.contains(root))
                document.removeEventListener('click', _this);
            if ((!root.contains(e.target)))
                _this.hide();
        });
    };
    return DropDown;
}(wml_1.Component));
exports.DropDown = DropDown;
//# sourceMappingURL=index.js.map