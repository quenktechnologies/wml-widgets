"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HorizontalLayout = exports.HorizontalLayoutOrientation = exports.HORIZONTAL_LAYOUT = void 0;
const wml = require("@quenk/wml");
const views = require("./wml/horizontal");
const orientation_1 = require("../../content/orientation");
const util_1 = require("../../util");
const __1 = require("../../");
///classNames:begin
exports.HORIZONTAL_LAYOUT = 'ww-horizontal-layout';
///classNames:end
/**
 * HorizontalLayoutOrientation
 */
var HorizontalLayoutOrientation;
(function (HorizontalLayoutOrientation) {
    HorizontalLayoutOrientation["Left"] = "left";
    HorizontalLayoutOrientation["Right"] = "right";
})(HorizontalLayoutOrientation = exports.HorizontalLayoutOrientation || (exports.HorizontalLayoutOrientation = {}));
/**
 * HorizontalLayout uses the css flexbox to provide a container
 * where all items are laid out in a single row.
 */
class HorizontalLayout extends wml.Component {
    constructor() {
        super(...arguments);
        this.view = new views.Main(this);
        this.values = {
            root: {
                id: (this.attrs.ww && this.attrs.ww.id) ? this.attrs.ww.id : '',
                className: util_1.concat(exports.HORIZONTAL_LAYOUT, __1.getClassName(this.attrs), getOrientation(this.attrs))
            }
        };
    }
}
exports.HorizontalLayout = HorizontalLayout;
const getOrientation = (attrs) => (attrs.ww && attrs.ww.orientation) ?
    attrs.ww.orientation === HorizontalLayoutOrientation.Right ?
        orientation_1.RIGHT : orientation_1.LEFT : '';
//# sourceMappingURL=index.js.map