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
exports.Caret = exports.CARET = void 0;
var views = require("./wml/caret");
var wml_1 = require("@quenk/wml");
var util_1 = require("../../util");
///classNames:begin
exports.CARET = 'ww-caret';
/**
 * Caret
 */
var Caret = /** @class */ (function (_super) {
    __extends(Caret, _super);
    function Caret() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.values = {
            root: {
                id: (_this.attrs.ww && _this.attrs.ww.id) ? _this.attrs.ww.id : '',
                className: util_1.concat(exports.CARET, (_this.attrs.ww && _this.attrs.ww.className) ?
                    _this.attrs.ww.className : '')
            }
        };
        return _this;
    }
    return Caret;
}(wml_1.Component));
exports.Caret = Caret;
//# sourceMappingURL=index.js.map