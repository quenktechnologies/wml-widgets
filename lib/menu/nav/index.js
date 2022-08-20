"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavMenu = exports.NAV_MENU = void 0;
const wml = require("@quenk/wml");
const util = require("../../util");
const record_1 = require("@quenk/noni/lib/data/record");
const type_1 = require("@quenk/noni/lib/data/type");
const orientation_1 = require("../../content/orientation");
const view_1 = require("./view");
var item_1 = require("../item");
Object.defineProperty(exports, "Item", { enumerable: true, get: function () { return item_1.Item; } });
var link_1 = require("../../content/link");
Object.defineProperty(exports, "Link", { enumerable: true, get: function () { return link_1.Link; } });
///classNames:begin
exports.NAV_MENU = 'ww-nav-menu';
/**
 * NavMenu groups one or more navigational items together to form a menu.
 *
 * Items may be declared directly as child elements of this widgets or specified
 * via attributes for dynamic creation.
 */
class NavMenu extends wml.Component {
    constructor() {
        super(...arguments);
        this.view = new view_1.NavMenuView(this);
        this.values = {
            id: this.attrs.id,
            className: util.concat(exports.NAV_MENU, this.attrs.className, this.attrs.vertical ? orientation_1.VERTICAL : ''),
            items: expand(this.attrs.items || [])
        };
    }
}
exports.NavMenu = NavMenu;
const expand = (spec) => {
    let list = Array.isArray(spec) ? spec : [spec];
    return list.reduce((expanded, item) => {
        if (type_1.isString(item)) {
            return [...expanded, { type: 'header', text: item }];
        }
        else if (type_1.isObject(item)) {
            return [...expanded, record_1.mapTo(item, (val, text) => {
                    if (type_1.isFunction(val))
                        return { type: 'link', name: text, text, onClick: val };
                    else if (type_1.isObject(val))
                        return record_1.merge({ type: 'link', name: text, text }, val);
                    else
                        return { type: 'link', name: text, text, href: String(val) };
                })];
        }
        else if (Array.isArray(item)) {
            return [...expanded, { type: 'menu', items: item }];
        }
        else {
            return expanded;
        }
    }, []);
};
//# sourceMappingURL=index.js.map