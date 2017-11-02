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
var views = require("./wml/stack");
var Page_1 = require("../Page");
var _getValues = function () { return [
    { label: 'Asus', value: 'Asus' },
    { label: 'MSI', value: 'MSI' },
    { label: 'MSI', value: 'MSI' },
    { label: 'Gigabyte', value: 'Gigabyte' }
]; };
var _getText = function (m) { return m.map(function (_a) {
    var label = _a.label;
    return label;
}).join(','); };
var StackPage = /** @class */ (function (_super) {
    __extends(StackPage, _super);
    function StackPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.values = {
            values: _getValues(),
            text: _getText(_getValues()),
            decorator: function (m) { return m.label; }
        };
        _this.onChange = function (_a) {
            var value = _a.value;
            if (value.length === 0)
                _this.values.values = _getValues();
            _this.values.text = _getText(_this.values.values);
            _this.view.invalidate();
        };
        return _this;
    }
    return StackPage;
}(Page_1.Page));
exports.StackPage = StackPage;
//# sourceMappingURL=index.js.map