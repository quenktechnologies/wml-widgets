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
var content = function (dm) { return function () {
    return dm.view.findById(dm.values.content.id);
}; };
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
        _this.isHidden = hidden.isHidden(content(_this));
        _this.hide = hidden.hide(_this)(content(_this));
        _this.show = hidden.show(_this)(content(_this));
        _this.toggle = hidden.toggle(_this)(content(_this));
        _this.values = {
            root: {
                id: 'root',
                class: util_1.concat(exports.DROP_DOWN, (_this.attrs.ww && _this.attrs.ww.class) ?
                    _this.attrs.ww.class : '')
            },
            button: {
                text: _this.attrs.ww.buttonText ? _this.attrs.ww.buttonText : '',
                class: style.DEFAULT,
                template: function () { return _this.attrs.ww.buttonTemplate ?
                    _this.attrs.ww.buttonTemplate : views.button; },
            },
            toggle: {
                class: util_1.concat(exports.DROP_DOWN_TOGGLE, style.PRIMARY),
                onClick: function () {
                    _this
                        .view
                        .findById(_this.values.root.id)
                        .map(function (e) {
                        if (_this.values.content.autoClose) {
                            for (var i = 0; i < e.children.length; i++) {
                                e.children[i].removeEventListener('click', _this.hide);
                                e.children[i].addEventListener('click', _this.hide);
                            }
                        }
                    })
                        .map(_this.toggle)
                        .map(function () { return window.addEventListener('click', _this); });
                }
            },
            content: {
                id: 'content',
                class: util_1.concat(exports.DROP_DOWN_CONTENT, hidden.HIDDEN),
                autoClose: (_this.attrs.ww.autoClose === false) ? false : true,
                render: function () { return _this.children; }
            }
        };
        return _this;
    }
    DropDown.prototype.handleEvent = function (e) {
        var _this = this;
        this
            .view
            .findById(this.values.root.id)
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