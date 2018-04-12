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
var util_1 = require("../../util");
var panel_header_1 = require("./wml/panel-header");
var _1 = require("../");
var _2 = require(".");
var PanelHeader = /** @class */ (function (_super) {
    __extends(PanelHeader, _super);
    function PanelHeader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new panel_header_1.Main(_this);
        /**
         * values
         */
        _this.values = {
            content: {
                id: 'header',
                /**
                 * class name for the root element.
                 */
                class: util_1.concat(_2.PANEL_HEADER, _1.LAYOUT, _this.attrs.ww ? _this.attrs.ww.class : '')
            }
        };
        return _this;
    }
    return PanelHeader;
}(_1.GenericLayout));
exports.PanelHeader = PanelHeader;
//# sourceMappingURL=PanelHeader.js.map