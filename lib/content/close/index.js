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
var views = require("./wml/close");
var wml_1 = require("@quenk/wml");
var util_1 = require("../../util");
///classNames:begin
exports.CLOSE = 'ww-close';
/**
 * Close
 */
var Close = /** @class */ (function (_super) {
    __extends(Close, _super);
    function Close() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.values = {
            root: {
                id: (_this.attrs.ww && _this.attrs.ww.id) ?
                    _this.attrs.ww.id : '',
                className: util_1.concat(exports.CLOSE, (_this.attrs.ww && _this.attrs.ww.className) ?
                    _this.attrs.ww.className : '')
            }
        };
        return _this;
    }
    return Close;
}(wml_1.Component));
exports.Close = Close;
//# sourceMappingURL=index.js.map