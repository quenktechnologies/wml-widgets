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
var views = require("./wml/breadcrumb");
var wml_1 = require("@quenk/wml");
var util_1 = require("../../../util");
///classNames:begin
exports.BREADCRUMB = 'ww-breadcrumb'; //@todo un-bootstrap
///classNames:end
var item_1 = require("../item");
exports.Item = item_1.Item;
var link_1 = require("../link");
exports.Link = link_1.Link;
/**
 * Breadcrumb
 */
var Breadcrumb = /** @class */ (function (_super) {
    __extends(Breadcrumb, _super);
    function Breadcrumb() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.values = {
            root: {
                class: util_1.concat(exports.BREADCRUMB, _this.attrs.ww ? _this.attrs.ww.class : '')
            }
        };
        return _this;
    }
    return Breadcrumb;
}(wml_1.Component));
exports.Breadcrumb = Breadcrumb;
//# sourceMappingURL=index.js.map