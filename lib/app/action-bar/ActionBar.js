"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var names = require("@package/self/common/names");
var util = require("@package/self/common/util");
var Group_1 = require("@package/self/content/Group");
var action_bar_1 = require("./wml/action_bar");
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
            id: {
                content: 'content'
            },
            class: {
                root: util.combine([names.ACTION_BAR, names.FIXED_PUSHABLE]),
                content: names.ACTION_BAR_CONTENT
            }
        };
        return _this;
    }
    return ActionBar;
}(Group_1.Group));
exports.ActionBar = ActionBar;
//# sourceMappingURL=ActionBar.js.map