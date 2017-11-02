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
 * MultiButtonSelect
 */
var MultiButtonSelect = /** @class */ (function (_super) {
    __extends(MultiButtonSelect, _super);
    function MultiButtonSelect() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MultiButtonSelect.prototype.initialize = function (v) {
        return Maybe_1.Maybe.fromAny(v).cata(function () { return Maybe_1.Maybe.fromArray([]); }, function (v) { return Maybe_1.Maybe.fromArray(v); });
    };
    MultiButtonSelect.prototype.click = function (v) {
        var _this = this;
        this.values.select.value = this
            .values
            .select
            .value
            .map(function (value) {
            var pos = value.indexOf(v);
            if (pos > -1)
                value.splice(pos, 1);
            else
                value.push(v);
            _this.delegate.onChange(new ButtonChangedEvent_1.ButtonChangedEvent(_this.attrs.ww.name, value.slice()));
            _this.view.invalidate();
            return value;
        })
            .orJust(function () { return [v]; });
    };
    MultiButtonSelect.prototype.isSelected = function (v) {
        return this.values.select.value.cata(function () { return false; }, function (value) { return value.indexOf(v) > -1; });
    };
    return MultiButtonSelect;
}(ButtonSelectGroup_1.ButtonSelectGroup));
exports.MultiButtonSelect = MultiButtonSelect;
//# sourceMappingURL=MultiButtonSelect.js.map