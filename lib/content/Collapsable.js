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
var wml_runtime_1 = require("@quenk/wml-runtime");
var names = require("@package/self/common/names");
/**
 * Collapsable is an abstract api for creating widgets that show or hide
 * content when the user interacts with them.
 */
var Collapsable = /** @class */ (function (_super) {
    __extends(Collapsable, _super);
    function Collapsable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * open this Widget.
     */
    Collapsable.prototype.open = function () {
        this.view.findById(this.values.id.target)
            .map(function (e) { return e.classList.add(names.OPEN); });
    };
    /**
     * close this Widget.
     */
    Collapsable.prototype.close = function () {
        this.view.findById(this.values.id.target)
            .map(function (e) { return e.classList.remove(names.OPEN); });
    };
    /**
     * toggle between open and close.
     */
    Collapsable.prototype.toggle = function () {
        this.view.findById(this.values.id.target)
            .map(function (e) { return e.classList.toggle(names.OPEN); });
    };
    return Collapsable;
}(wml_runtime_1.Component));
exports.Collapsable = Collapsable;
//# sourceMappingURL=Collapsable.js.map