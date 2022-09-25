"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavBar = exports.NAV_BAR = void 0;
const wml_1 = require("@quenk/wml");
const type_1 = require("@quenk/noni/lib/data/type");
const record_1 = require("@quenk/noni/lib/data/record");
const __1 = require("../..");
const util_1 = require("../../util");
const nav_bar_1 = require("./views/nav-bar");
///classNames:begin
exports.NAV_BAR = 'ww-nav-bar';
/**
 * NavBar provides a vertical bar across the viewport that can be used for
 * displaying navigational links.
 */
class NavBar extends wml_1.Component {
    constructor() {
        super(...arguments);
        this.view = new nav_bar_1.NavBarView(this);
        this.values = {
            wml: {
                id: 'root'
            },
            id: (0, __1.getId)(this.attrs),
            className: (0, util_1.concat)(exports.NAV_BAR, (0, __1.getClassName)(this.attrs)),
            links: this.attrs.links ? normalize(this.attrs.links) : []
        };
    }
}
exports.NavBar = NavBar;
const normalize = (specs) => {
    if (Array.isArray(specs))
        return specs;
    else
        return (0, record_1.mapTo)(specs, (conf, title) => {
            if ((0, type_1.isString)(conf))
                return { name: title, title, href: conf };
            else if ((0, type_1.isFunction)(conf))
                return { name: title, title, onClick: conf };
            else
                return (0, record_1.merge)({ title, name: title }, conf);
        });
};
//# sourceMappingURL=index.js.map