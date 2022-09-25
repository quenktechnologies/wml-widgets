"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BreadcrumbMenu = exports.Link = exports.Item = exports.BREADCRUMB_MENU = void 0;
const views = require("./wml/breadcrumb");
const wml_1 = require("@quenk/wml");
const util_1 = require("../../util");
///classNames:begin
exports.BREADCRUMB_MENU = 'ww-breadcrumb-menu';
///classNames:end
var item_1 = require("../item");
Object.defineProperty(exports, "Item", { enumerable: true, get: function () { return item_1.Item; } });
var link_1 = require("../../content/link");
Object.defineProperty(exports, "Link", { enumerable: true, get: function () { return link_1.Link; } });
/**
 * BreadcrumbMenu
 */
class BreadcrumbMenu extends wml_1.Component {
    constructor() {
        super(...arguments);
        this.view = new views.Main(this);
        this.values = {
            root: {
                id: (this.attrs && this.attrs.id) ? this.attrs.id : '',
                className: (0, util_1.concat)(exports.BREADCRUMB_MENU, (this.attrs && this.attrs.className) ?
                    this.attrs.className : '')
            }
        };
    }
}
exports.BreadcrumbMenu = BreadcrumbMenu;
//# sourceMappingURL=index.js.map