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
var control_1 = require("@package/self/control");
/**
 * TermChangedEvent signals the search term has changed.
 */
var TermChangedEvent = /** @class */ (function (_super) {
    __extends(TermChangedEvent, _super);
    function TermChangedEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TermChangedEvent;
}(control_1.Event));
exports.TermChangedEvent = TermChangedEvent;
//# sourceMappingURL=TermChangedEvent.js.map