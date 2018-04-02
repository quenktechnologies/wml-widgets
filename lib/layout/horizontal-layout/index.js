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
var views = require("./wml/horizontal-layout");
var names = require("./classNames");
var util_1 = require("../../util");
/**
 * HorizontalLayout uses the css flexbox to provide a container
 * where all items are laid out in a single row.
 */
var HorizontalLayout = /** @class */ (function (_super) {
    __extends(HorizontalLayout, _super);
    function HorizontalLayout() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        /**
         * values
         */
        _this.values = {
            /**
             * root element values.
             */
            root: {
                /**
                 * class names of the root element.
                 */
                class: util_1.concat(names.HORIZONTAL_LAYOUT)
            }
        };
        return _this;
    }
    return HorizontalLayout;
}(wml.Component));
exports.HorizontalLayout = HorizontalLayout;
//# sourceMappingURL=index.js.map