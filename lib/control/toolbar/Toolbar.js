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
var views = require("./wml/toolbar");
var names = require("../../common/names");
var util_1 = require("../../common/util");
/**
 * Toolbar provides a widget for grouping related controls into a
 * single row.
 */
var Toolbar = /** @class */ (function (_super) {
    __extends(Toolbar, _super);
    function Toolbar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.values = {
            root: {
                class: util_1.concat(names.TOOLBAR, _this.attrs.ww && _this.attrs.ww.class)
            }
        };
        return _this;
    }
    return Toolbar;
}(wml.Component));
exports.Toolbar = Toolbar;
//# sourceMappingURL=Toolbar.js.map