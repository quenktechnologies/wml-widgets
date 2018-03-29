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
var Event_1 = require("../Event");
/**
 * ButtonClickedEvent
 */
var ButtonClickedEvent = /** @class */ (function (_super) {
    __extends(ButtonClickedEvent, _super);
    function ButtonClickedEvent(name) {
        var _this = _super.call(this, name, null) || this;
        _this.name = name;
        return _this;
    }
    return ButtonClickedEvent;
}(Event_1.Event));
exports.ButtonClickedEvent = ButtonClickedEvent;
//# sourceMappingURL=ButtonClickedEvent.js.map