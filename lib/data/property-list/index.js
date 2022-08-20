"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyList = exports.DataCtx = exports.PROPERTY_LIST = void 0;
const wml_1 = require("@quenk/wml");
const path_1 = require("@quenk/noni/lib/data/record/path");
const util_1 = require("../../util");
const __1 = require("../../");
const property_list_1 = require("./wml/property-list");
///classNames:begin
exports.PROPERTY_LIST = 'ww-property-list';
/**
 * DataCtx
 */
class DataCtx {
    constructor(data, name, value, format) {
        this.data = data;
        this.name = name;
        this.value = value;
        this.format = format;
    }
}
exports.DataCtx = DataCtx;
/**
 * PropertyList generates a description list using the properties of
 * an object.
 */
class PropertyList extends wml_1.Component {
    constructor() {
        super(...arguments);
        this.view = new property_list_1.PropertyListView(this);
        this.values = {
            root: {
                className: util_1.concat(exports.PROPERTY_LIST, __1.getClassName(this.attrs))
            },
            fields: ((this.attrs.ww && this.attrs.ww.fields) ?
                this.attrs.ww.fields : []),
            data: {
                value: ((this.attrs.ww && this.attrs.ww.data) ?
                    this.attrs.ww.data : {}),
                get: (f) => {
                    let mData = path_1.get(f.name, this.values.data.value);
                    if (mData.isNothing())
                        return new property_list_1.NothingView({}).render();
                    let d = mData.get();
                    let fmt = (f.format) ? f.format : (c) => '' + c;
                    let ctx = new DataCtx(d, f.name, this.values.data.value, fmt);
                    if (f.dataFragment)
                        return f.dataFragment(ctx).render();
                    else
                        return new property_list_1.DataView(ctx).render();
                }
            }
        };
    }
    /**
     * setData to be displayed.
     */
    setData(data) {
        this.values.data.value = data;
        this.view.invalidate();
        return this;
    }
}
exports.PropertyList = PropertyList;
//# sourceMappingURL=index.js.map