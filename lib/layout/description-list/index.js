"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Data = exports.Title = exports.DescriptionList = exports.DESCRIPTION_LIST_DATA = exports.DESCRIPTION_LIST_TITLE = exports.DESCRIPTION_LIST = void 0;
const views = require("./wml/description-list");
const wml_1 = require("@quenk/wml");
const orientation_1 = require("../../content/orientation");
const util_1 = require("../../util");
const __1 = require("../../");
///classNames:begin
exports.DESCRIPTION_LIST = 'ww-description-list';
exports.DESCRIPTION_LIST_TITLE = 'ww-description-list__title';
exports.DESCRIPTION_LIST_DATA = 'ww-description-list__data';
/**
 * DescriptionList layout.
 */
class DescriptionList extends wml_1.Component {
    constructor() {
        super(...arguments);
        this.view = new views.DescriptionList(this);
        this.values = {
            id: (0, __1.getId)(this.attrs),
            className: (0, util_1.concat)(exports.DESCRIPTION_LIST, (0, __1.getClassName)(this.attrs), (this.attrs && this.attrs.horizontal) ? orientation_1.HORIZONTAL : '')
        };
    }
}
exports.DescriptionList = DescriptionList;
/**
 * Title
 */
class Title extends wml_1.Component {
    constructor() {
        super(...arguments);
        this.view = new views.Title(this);
        this.values = {
            id: (0, __1.getId)(this.attrs),
            className: (0, util_1.concat)(exports.DESCRIPTION_LIST_TITLE, (0, __1.getClassName)(this.attrs))
        };
    }
}
exports.Title = Title;
/**
 * Data
 */
class Data extends wml_1.Component {
    constructor() {
        super(...arguments);
        this.view = new views.Data(this);
        this.values = {
            id: (0, __1.getId)(this.attrs),
            className: (0, util_1.concat)(exports.DESCRIPTION_LIST_DATA, (0, __1.getClassName)(this.attrs))
        };
    }
}
exports.Data = Data;
//# sourceMappingURL=index.js.map