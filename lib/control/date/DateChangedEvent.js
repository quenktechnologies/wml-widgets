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
var Event_1 = require("@package/self/control/Event");
/**
 * DateChangedEvent is generated when the date has
 * been changed to a valid date.
 */
var DateChangedEvent = /** @class */ (function (_super) {
    __extends(DateChangedEvent, _super);
    function DateChangedEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DateChangedEvent;
}(Event_1.Event));
exports.DateChangedEvent = DateChangedEvent;
//# sourceMappingURL=DateChangedEvent.js.map