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
var form_control_1 = require("../../control/form-control");
/**
 * StackChangedEvent is generated when the user removes an item from the stack.
 */
var StackChangedEvent = /** @class */ (function (_super) {
    __extends(StackChangedEvent, _super);
    function StackChangedEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return StackChangedEvent;
}(form_control_1.FormControlEvent));
exports.StackChangedEvent = StackChangedEvent;
//# sourceMappingURL=StackChangedEvent.js.map