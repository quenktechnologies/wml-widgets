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
var names = require("@package/wml-widgets/common/names");
var view = require("./wml/tabs");
var util_1 = require("@package/wml-widgets/common/util");
var wml_1 = require("@quenk/wml");
/**
 * Tabs acts as a parent container for a group of Tab.
 *
 * Use it to create a tabbed navigation or view for main layout,
 * sub views or forms etc.
 */
var Tabs = /** @class */ (function (_super) {
    __extends(Tabs, _super);
    function Tabs() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new view.Tabs(_this);
        _this.values = {
            root: {
                class: util_1.concat(names.TABS, 'nav nav-tabs', _this.attrs.ww ? _this.attrs.ww.class : '')
            }
        };
        return _this;
    }
    return Tabs;
}(wml_1.Component));
exports.Tabs = Tabs;
//# sourceMappingURL=Tabs.js.map