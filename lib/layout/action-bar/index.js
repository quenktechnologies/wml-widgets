"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionBar = exports.ACTION_BAR_CONTENT = exports.ACTION_BAR = void 0;
const orientation = require("../../content/orientation");
const __1 = require("../..");
const util_1 = require("../../util");
const __2 = require("../");
const action_bar_1 = require("./wml/action-bar");
///classNames:begin
/**
 * ACTION_BAR class name. for the ActionBar root.
 */
exports.ACTION_BAR = 'ww-action-bar';
/**
 * ACTION_BAR_CONTENT class name.
 */
exports.ACTION_BAR_CONTENT = 'ww-action-bar__content';
/**
 * ActionBar provides a bar across the screen that can be
 * used as a toolbar, navigation menu or something simillar.
 */
class ActionBar extends __2.AbstractLayout {
    constructor() {
        super(...arguments);
        this.view = new action_bar_1.Main(this);
        this.values = {
            root: {
                wml: {
                    id: 'root',
                },
                id: (this.attrs && this.attrs.id) ?
                    this.attrs.id : '',
                className: (0, util_1.concat)(exports.ACTION_BAR, __2.LAYOUT, orientation.POSITIONED, (0, __1.getClassName)(this.attrs))
            },
            content: {
                wml: {
                    id: 'content'
                },
                class: exports.ACTION_BAR_CONTENT
            }
        };
    }
}
exports.ActionBar = ActionBar;
//# sourceMappingURL=index.js.map