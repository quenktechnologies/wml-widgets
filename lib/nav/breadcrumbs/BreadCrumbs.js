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
var views = require("./wml/breadcrumbs");
var util_1 = require("../../common/util");
var wml_1 = require("@quenk/wml");
;
/**
 * BreadCrumb
 */
var BreadCrumbs = /** @class */ (function (_super) {
    __extends(BreadCrumbs, _super);
    function BreadCrumbs() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.BreadCrumbs(_this);
        _this.values = {
            class: {
                root: util_1.concat(names.BREAD_CRUMBS, _this.attrs.ww ? _this.attrs.ww.class : '')
            }
        };
        return _this;
    }
    return BreadCrumbs;
}(wml_1.Component));
exports.BreadCrumbs = BreadCrumbs;
//# sourceMappingURL=BreadCrumbs.js.map