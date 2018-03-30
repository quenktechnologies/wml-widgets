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
var names = require("../../common/names");
var views = require("./wml/button-select");
var form_control_1 = require("../../control/form-control");
var util_1 = require("../../common/util");
/**
 * ButtonSelectGroup
 */
var ButtonSelectGroup = /** @class */ (function (_super) {
    __extends(ButtonSelectGroup, _super);
    function ButtonSelectGroup() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.values = {
            root: {
                id: 'root',
                class: names.BUTTON_SELECT
            },
            help: {
                id: 'help',
                success: _this.attrs.ww.success,
                error: _this.attrs.ww.error,
                warning: _this.attrs.ww.warning
            },
            select: {
                value: _this.initialize(_this.attrs.ww.value),
                options: _this.attrs.ww.options,
                isSelected: function (v) { return _this.isSelected(v); }
            },
            click: function (v) { return function () { return _this.click(v); }; },
            calculateClass: function (_a) {
                var className = _a.className, value = _a.value;
                return util_1.concat(names.BUTTON_SELECT_OPTION, className, (_this.attrs.ww.variant) ? _this.attrs.ww.variant : names.DEFAULT, _this.values.select.isSelected(value) ? names.ACTIVE : '');
            },
        };
        return _this;
    }
    ButtonSelectGroup.prototype.value = function () {
        return this.values.select.value.cata(function () { return null; }, function (v) { return v; });
    };
    return ButtonSelectGroup;
}(form_control_1.FormControlWidget));
exports.ButtonSelectGroup = ButtonSelectGroup;
//# sourceMappingURL=ButtonSelectGroup.js.map