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
var wml_1 = require("@quenk/wml");
var path_1 = require("@quenk/noni/lib/data/record/path");
var util_1 = require("../../util");
var __1 = require("../../");
var property_list_1 = require("./wml/property-list");
///classNames:begin
exports.PROPERTY_LIST = 'ww-property-list';
/**
 * PropertyList generates a description list using the properties of
 * an object.
 */
var PropertyList = /** @class */ (function (_super) {
    __extends(PropertyList, _super);
    function PropertyList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new property_list_1.Main(_this);
        _this.values = {
            root: {
                className: util_1.concat(exports.PROPERTY_LIST, __1.getClassName(_this.attrs))
            },
            fields: ((_this.attrs.ww && _this.attrs.ww.fields) ?
                _this.attrs.ww.fields : []),
            data: {
                value: ((_this.attrs.ww && _this.attrs.ww.data) ?
                    _this.attrs.ww.data : {}),
                get: function (f) {
                    var mData = path_1.get(f.name, _this.values.data.value);
                    if (mData.isNothing())
                        return [__1.text('')];
                    var d = mData.get();
                    if (f.dataFragment)
                        return f.dataFragment(d, f.name, _this.values.data.value)(_this.view);
                    if (f.format)
                        return [__1.text('' + f.format(d))];
                    return [__1.text('' + d)];
                }
            }
        };
        return _this;
    }
    /**
     * setData to be displayed.
     */
    PropertyList.prototype.setData = function (data) {
        this.values.data.value = data;
        this.view.invalidate();
        return this;
    };
    return PropertyList;
}(wml_1.Component));
exports.PropertyList = PropertyList;
//# sourceMappingURL=index.js.map