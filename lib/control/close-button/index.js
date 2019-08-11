"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var wml_1 = require("@quenk/wml");
var util_1 = require("../../util");
var __1 = require("../../");
var close_button_1 = require("./wml/close-button");
///classNames:begin
exports.CLOSE_BUTTON = 'ww-close-button';
;
/**
 * CloseButton used to display the "x" on dialogs etc.
 */
var CloseButton = /** @class */ (function (_super) {
    __extends(CloseButton, _super);
    function CloseButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new close_button_1.Main(_this);
        _this.values = {
            id: __1.getId(_this.attrs),
            className: util_1.concat(exports.CLOSE_BUTTON, __1.getClassName(_this.attrs)),
            wml: {
                id: 'close-button'
            },
            onclick: function () {
                if (_this.attrs.ww && _this.attrs.ww.onClick)
                    _this.attrs.ww.onClick();
            }
        };
        return _this;
    }
    return CloseButton;
}(wml_1.Component));
exports.CloseButton = CloseButton;
//# sourceMappingURL=index.js.map