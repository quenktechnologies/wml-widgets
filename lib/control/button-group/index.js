"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonGroup = exports.BUTTON_GROUP_COMPAT = exports.BUTTON_GROUP_BUTTON = exports.BUTTON_GROUP = void 0;
const views = require("./wml/button-group");
const wml_1 = require("@quenk/wml");
const util_1 = require("../../util");
const toolbar_1 = require("../toolbar");
const __1 = require("../../");
///classNames:begin
exports.BUTTON_GROUP = 'ww-button-group';
exports.BUTTON_GROUP_BUTTON = 'ww-button-group__button';
exports.BUTTON_GROUP_COMPAT = 'ww-button-group-compat';
/**
 * ButtonGroup groups multiple buttons into one element.
 */
class ButtonGroup extends wml_1.Component {
    constructor() {
        super(...arguments);
        this.view = new views.Main(this);
        this.values = {
            root: {
                id: __1.getId(this.attrs),
                className: util_1.concat(exports.BUTTON_GROUP, toolbar_1.TOOLBAR_COMPAT, __1.getClassName(this.attrs))
            }
        };
    }
}
exports.ButtonGroup = ButtonGroup;
//# sourceMappingURL=index.js.map