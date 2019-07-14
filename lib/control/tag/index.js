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
var style_1 = require("../../content/style");
var util_1 = require("../../util");
var __1 = require("../../");
var __2 = require("../");
var tag_1 = require("./wml/tag");
///classNames:begin
exports.TAG_CONTROL = 'ww-tag-control';
exports.TAG_CONTROL_TEXT = 'ww-tag-control__text';
exports.TAG_CONTROL_DISMISS = 'ww-tag-control__dismiss';
/**
 * DismissEvent is generated when the close button us clicked.
 */
var DismissEvent = /** @class */ (function (_super) {
    __extends(DismissEvent, _super);
    function DismissEvent(name) {
        var _this = _super.call(this, name, undefined) || this;
        _this.name = name;
        return _this;
    }
    return DismissEvent;
}(__2.Event));
exports.DismissEvent = DismissEvent;
/**
 * Tag displays some text in a dismissable tag.
 *
 * The difference between this Tag and the one from the content
 * module is that this one is primarily meant to be used as a control
 * or as part of a more complicated control.
 */
var Tag = /** @class */ (function (_super) {
    __extends(Tag, _super);
    function Tag() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new tag_1.Main(_this);
        _this.values = {
            id: __1.getId(_this.attrs),
            className: util_1.concat(exports.TAG_CONTROL, __1.getClassName(_this.attrs)),
            style: (_this.attrs.ww && _this.attrs.ww.style) ?
                _this.attrs.ww.style : style_1.Style.Default,
            text: {
                className: exports.TAG_CONTROL_TEXT,
                value: (_this.attrs.ww && _this.attrs.ww.text) ?
                    _this.attrs.ww.text : undefined,
            },
            dismiss: {
                className: exports.TAG_CONTROL_DISMISS,
                onClick: function () {
                    if (_this.attrs.ww && _this.attrs.ww.onDismiss)
                        _this.attrs.ww.onDismiss(new DismissEvent(_this.attrs.ww && _this.attrs.ww.name || ''));
                }
            }
        };
        return _this;
    }
    return Tag;
}(__2.AbstractControl));
exports.Tag = Tag;
//# sourceMappingURL=index.js.map