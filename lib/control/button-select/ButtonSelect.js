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
var ButtonChangedEvent_1 = require("./ButtonChangedEvent");
var ButtonSelectGroup_1 = require("./ButtonSelectGroup");
var Maybe_1 = require("afpl/lib/monad/Maybe");
/**
 * ButtonSelect
 */
var ButtonSelect = /** @class */ (function (_super) {
    __extends(ButtonSelect, _super);
    function ButtonSelect() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ButtonSelect.prototype.initialize = function (value) {
        return Maybe_1.Maybe.fromAny(value);
    };
    ButtonSelect.prototype.click = function (value) {
        this.values.select.value = Maybe_1.Maybe.fromAny(value);
        this.delegate.onChange(new ButtonChangedEvent_1.ButtonChangedEvent(this.attrs.ww.name, value));
        this.view.invalidate();
    };
    ButtonSelect.prototype.isSelected = function (v) {
        return this.values.select.value.cata(function () { return false; }, function (value) { return value === v; });
    };
    return ButtonSelect;
}(ButtonSelectGroup_1.ButtonSelectGroup));
exports.ButtonSelect = ButtonSelect;
//# sourceMappingURL=ButtonSelect.js.map