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
exports.PropertyList = exports.DataCtx = exports.PROPERTY_LIST = void 0;
var wml_1 = require("@quenk/wml");
var path_1 = require("@quenk/noni/lib/data/record/path");
var util_1 = require("../../util");
var __1 = require("../../");
var property_list_1 = require("./wml/property-list");
///classNames:begin
exports.PROPERTY_LIST = 'ww-property-list';
/**
 * DataCtx
 */
var DataCtx = /** @class */ (function () {
    function DataCtx(data, name, value, format) {
        this.data = data;
        this.name = name;
        this.value = value;
        this.format = format;
    }
    return DataCtx;
}());
exports.DataCtx = DataCtx;
/**
 * PropertyList generates a description list using the properties of
 * an object.
 */
var PropertyList = /** @class */ (function (_super) {
    __extends(PropertyList, _super);
    function PropertyList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new property_list_1.PropertyListView(_this);
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
                        return new property_list_1.NothingView({}).render();
                    var d = mData.get();
                    var fmt = (f.format) ? f.format : function (c) { return '' + c; };
                    var ctx = new DataCtx(d, f.name, _this.values.data.value, fmt);
                    if (f.dataFragment)
                        return f.dataFragment(ctx).render();
                    else
                        return new property_list_1.DataView(ctx).render();
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