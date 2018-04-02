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
var wml_1 = require("@quenk/wml");
/**
 * Group is an abstract class providing an api for
 * widgets whose primary purpose is displaying content.
 */
var Group = /** @class */ (function (_super) {
    __extends(Group, _super);
    function Group() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * setContent changes the content value.
     */
    Group.prototype.setContent = function (content) {
        this.content = content;
        this.view.invalidate();
        return this;
    };
    /**
     * removeContent removes existing content.
     */
    Group.prototype.removeContent = function () {
        this.content = null;
        return this;
    };
    return Group;
}(wml_1.Component));
exports.Group = Group;
//# sourceMappingURL=Group.js.map