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
var feedback_1 = require("./feedback");
/**
 * GenericFormControl provides a base implementation of a
 * FormControl.
 */
var GenericFormControl = /** @class */ (function (_super) {
    __extends(GenericFormControl, _super);
    function GenericFormControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return GenericFormControl;
}(feedback_1.GenericFeedbackControl));
exports.GenericFormControl = GenericFormControl;
//# sourceMappingURL=form.js.map