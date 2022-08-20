"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Toolbar = exports.TOOLBAR_COMPAT = exports.TOOLBAR = void 0;
const views = require("./wml/toolbar");
const wml_1 = require("@quenk/wml");
const util_1 = require("../../util");
const __1 = require("../../");
///classNames:begin
exports.TOOLBAR = 'ww-toolbar';
exports.TOOLBAR_COMPAT = '-toolbar-compat';
/**
 * Toolbar provides a widget for grouping related controls into a
 * single row.
 */
class Toolbar extends wml_1.Component {
    constructor() {
        super(...arguments);
        this.view = new views.Main(this);
        this.values = {
            root: {
                id: __1.getId(this.attrs),
                className: util_1.concat(exports.TOOLBAR, __1.getClassName(this.attrs))
            }
        };
    }
}
exports.Toolbar = Toolbar;
//# sourceMappingURL=index.js.map