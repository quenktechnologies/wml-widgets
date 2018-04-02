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
var names = require("./classNames");
var wml_1 = require("@quenk/wml");
var util_1 = require("../../util");
var _1 = require("../");
var icon_button_1 = require("./wml/icon-button");
/**
 * IconButtonClickedEvent triggered when an icon button is clicked.
 */
var IconButtonClickedEvent = /** @class */ (function (_super) {
    __extends(IconButtonClickedEvent, _super);
    function IconButtonClickedEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return IconButtonClickedEvent;
}(_1.Event));
exports.IconButtonClickedEvent = IconButtonClickedEvent;
/**
 * IconButton provides a button with limited styling that displays
 * an icon for its UI.
 *
 *  +---------+
 *  | <= * => |
 *  +---------+
 */
var IconButton = /** @class */ (function (_super) {
    __extends(IconButton, _super);
    function IconButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new icon_button_1.Main(_this);
        _this.values = {
            class: {
                root: names.ICON_BUTTON
            },
            button: {
                class: util_1.concat(names.ICON_BUTTON, (_this.attrs.ww && _this.attrs.ww.class) ?
                    _this.attrs.ww.class : ''),
                onClick: function () {
                    if (_this.attrs.ww && _this.attrs.ww.onClick)
                        _this.attrs.ww.onClick(new IconButtonClickedEvent(_this.attrs.ww.name, undefined));
                }
            }
        };
        return _this;
    }
    return IconButton;
}(wml_1.Component));
exports.IconButton = IconButton;
//# sourceMappingURL=index.js.map