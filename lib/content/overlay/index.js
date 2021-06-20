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
exports.Overlay = exports.OVERLAY = void 0;
var wml_1 = require("@quenk/wml");
var util_1 = require("../../util");
var __1 = require("../../");
var overlay_1 = require("./wml/overlay");
///classNames:begin
exports.OVERLAY = 'ww-overlay';
/**
 * Overlay
 */
var Overlay = /** @class */ (function (_super) {
    __extends(Overlay, _super);
    function Overlay() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new overlay_1.Main(_this);
        _this.values = {
            wml: {
                id: 'root'
            },
            id: __1.getId(_this.attrs),
            className: util_1.concat(exports.OVERLAY, __1.getClassName(_this.attrs)),
            onclick: function () {
                if (_this.attrs.ww && _this.attrs.ww.onClick)
                    _this.attrs.ww.onClick();
            }
        };
        return _this;
    }
    /**
     * close the overlay.
     */
    Overlay.prototype.close = function () {
        var mO = util_1.getById(this.view, this.values.wml.id);
        if (mO.isJust()) {
            var n = mO.get();
            if (n.parentNode)
                n.parentNode.removeChild(n);
        }
    };
    return Overlay;
}(wml_1.Component));
exports.Overlay = Overlay;
//# sourceMappingURL=index.js.map