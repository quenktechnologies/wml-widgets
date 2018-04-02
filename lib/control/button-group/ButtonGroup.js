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
var wml = require("@quenk/wml");
var views = require("./wml/button-group");
var names = require("../../common/names");
var util_1 = require("../../util");
/**
 * ButtonGroup groups multiple buttons into one element.
 */
var ButtonGroup = /** @class */ (function (_super) {
    __extends(ButtonGroup, _super);
    function ButtonGroup() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.values = {
            root: {
                class: util_1.concat(names.BUTTON_GROUP, (_this.attrs.ww) ? _this.attrs.ww.class : '')
            }
        };
        return _this;
    }
    return ButtonGroup;
}(wml.Component));
exports.ButtonGroup = ButtonGroup;
//# sourceMappingURL=ButtonGroup.js.map