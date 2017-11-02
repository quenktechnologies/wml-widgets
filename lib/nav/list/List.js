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
var names = require("@package/self/common/names");
var util = require("@package/self/common/util");
var views = require("./wml/list");
var wml = require("@quenk/wml");
/**
 * List of navigation links.
 */
var List = /** @class */ (function (_super) {
    __extends(List, _super);
    function List() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.values = {
            class: {
                root: util.concat(names.NAV_LIST, _this.attrs.ww ? _this.attrs.ww.class : '')
            }
        };
        return _this;
    }
    return List;
}(wml.Component));
exports.List = List;
//# sourceMappingURL=List.js.map