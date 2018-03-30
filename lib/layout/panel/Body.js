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
var names = require("../../common/names");
var views = require("./wml/panel");
var wml_1 = require("@quenk/wml");
var util_1 = require("../../common/util");
/**
 * Body part of a Panel for containing the main content.
 */
var Body = /** @class */ (function (_super) {
    __extends(Body, _super);
    function Body() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Body(_this);
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
                class: util_1.concat(names.PANEL_BODY, _this.attrs.ww ? _this.attrs.ww.class : '')
            }
        };
        return _this;
    }
    return Body;
}(wml_1.Component));
exports.Body = Body;
//# sourceMappingURL=Body.js.map