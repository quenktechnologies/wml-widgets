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
var orientation = require("../../content/orientation");
var __1 = require("../..");
var util_1 = require("../../util");
var __2 = require("../");
var action_bar_1 = require("./wml/action-bar");
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
var ActionBar = /** @class */ (function (_super) {
    __extends(ActionBar, _super);
    function ActionBar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new action_bar_1.Main(_this);
        _this.values = {
            root: {
                wml: {
                    id: 'root',
                },
                id: (_this.attrs.ww && _this.attrs.ww.id) ?
                    _this.attrs.ww.id : '',
                className: util_1.concat(exports.ACTION_BAR, __2.LAYOUT, orientation.POSITIONED, __1.getClassName(_this.attrs))
            },
            content: {
                wml: {
                    id: 'content'
                },
                class: exports.ACTION_BAR_CONTENT
            }
        };
        return _this;
    }
    return ActionBar;
}(__2.AbstractLayout));
exports.ActionBar = ActionBar;
//# sourceMappingURL=index.js.map