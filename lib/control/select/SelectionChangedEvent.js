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
var form_control_1 = require("@package/self/control/form-control");
var SelectionChangedEvent = /** @class */ (function (_super) {
    __extends(SelectionChangedEvent, _super);
    function SelectionChangedEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SelectionChangedEvent;
}(form_control_1.FormControlEvent));
exports.SelectionChangedEvent = SelectionChangedEvent;
//# sourceMappingURL=SelectionChangedEvent.js.map