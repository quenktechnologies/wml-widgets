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
var activity_indicator_1 = require("./wml/activity-indicator");
var util_1 = require("../../../util");
///classNames:begin
exports.ACTIVITY_INDICATOR = 'ww-activity-indicator';
/**
 * Busy provides a css driven animation that indicates
 * some action or activity is being carried out.
 */
var ActivityIndicator = /** @class */ (function (_super) {
    __extends(ActivityIndicator, _super);
    function ActivityIndicator() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new activity_indicator_1.Main(_this);
        _this.values = {
            root: {
                class: util_1.concat(exports.ACTIVITY_INDICATOR, _this.attrs.ww ? _this.attrs.ww.class : '')
            }
        };
        return _this;
    }
    return ActivityIndicator;
}(wml.Component));
exports.ActivityIndicator = ActivityIndicator;
//# sourceMappingURL=index.js.map