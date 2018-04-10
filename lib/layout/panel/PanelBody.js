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
var util_1 = require("../../util");
var panel_body_1 = require("./wml/panel-body");
var _1 = require(".");
/**
 * PanelBody part of a Panel for containing the main content.
 */
var PanelBody = /** @class */ (function (_super) {
    __extends(PanelBody, _super);
    function PanelBody() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new panel_body_1.Main(_this);
        /**
         * values
         */
        _this.values = {
            /**
             * root element values.
             */
            root: {
                /**
                 * class for the root element.
                 */
                class: util_1.concat(_1.PANEL_BODY, _this.attrs.ww ? _this.attrs.ww.class : '')
            }
        };
        return _this;
    }
    return PanelBody;
}(wml_1.Component));
exports.PanelBody = PanelBody;
//# sourceMappingURL=PanelBody.js.map