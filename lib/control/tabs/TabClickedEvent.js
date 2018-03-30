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
var control_1 = require("../../control");
/**
 * TabClickedEvent is fired when a user clicks on a tab.
 *
 * It contains information about the tab that was clicked.
 */
var TabClickedEvent = /** @class */ (function (_super) {
    __extends(TabClickedEvent, _super);
    function TabClickedEvent(name) {
        var _this = _super.call(this, name, name) || this;
        _this.name = name;
        return _this;
    }
    return TabClickedEvent;
}(control_1.Event));
exports.TabClickedEvent = TabClickedEvent;
//# sourceMappingURL=TabClickedEvent.js.map