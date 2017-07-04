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
var util_1 = require("common/util");
var runtime_1 = require("@quenk/wml/lib/runtime");
var action_area_1 = require("./wml/action_area");
/**
 * ActionArea
 */
var ActionArea = (function (_super) {
    __extends(ActionArea, _super);
    function ActionArea() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new action_area_1.Main(_this);
        return _this;
    }
    /**
     * setContent replaces the content of this view.
     */
    ActionArea.prototype.setContent = function (r) {
        util_1.replaceContent(r, this.view.findById('content'));
        return this;
    };
    return ActionArea;
}(runtime_1.AbstractWidget));
exports.ActionArea = ActionArea;
exports.default = ActionArea;
//# sourceMappingURL=ActionArea.js.map