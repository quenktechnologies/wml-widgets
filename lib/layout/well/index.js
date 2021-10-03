"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Well = exports.WELL = void 0;
var util_1 = require("../../util");
var __1 = require("..");
var well_1 = require("./wml/well");
///classNames:begin
exports.WELL = 'ww-well';
/**
 * Well provides a rectangular container for visually seperating
 * content by context.
 */
var Well = /** @class */ (function (_super) {
    __extends(Well, _super);
    function Well() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new well_1.WellView(_this);
        _this.values = {
            /**
             * root values.
             */
            content: {
                id: _this.attrs.ww && _this.attrs.ww.id,
                wml: {
                    id: 'well',
                },
                className: util_1.concat(exports.WELL, __1.LAYOUT, _this.attrs.ww && _this.attrs.ww.className ?
                    _this.attrs.ww.className : '')
            }
        };
        return _this;
    }
    return Well;
}(__1.AbstractLayout));
exports.Well = Well;
//# sourceMappingURL=index.js.map