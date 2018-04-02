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
var names = require("./classNames");
var style = require("../../content/style/classNames");
var wml_1 = require("@quenk/wml");
var util_1 = require("../../util");
var panel_1 = require("./wml/panel");
/**
 * Panel provides a rectangular container for visually seperating
 * content by context.
 *
 * This class provides the containing, part that can be further
 * subdivided into a header, body and/or footer section.
 */
var Panel = /** @class */ (function (_super) {
    __extends(Panel, _super);
    function Panel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new panel_1.Main(_this);
        /**
         * values
         */
        _this.values = {
            /**
             * root values.
             */
            root: {
                /**
                 * class name for the root element.
                 */
                class: util_1.concat(names.PANEL, _this.attrs.ww ?
                    _this.attrs.ww.style : style.DEFAULT, _this.attrs.ww ?
                    _this.attrs.ww.class : '')
            }
        };
        return _this;
    }
    return Panel;
}(wml_1.Component));
exports.Panel = Panel;
//# sourceMappingURL=Panel.js.map