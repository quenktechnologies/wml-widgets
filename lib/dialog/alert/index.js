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
exports.Alert = exports.ALERT = exports.Style = void 0;
var dom_1 = require("@quenk/wml/lib/dom");
var wml_1 = require("@quenk/wml");
var style_1 = require("../../content/style");
Object.defineProperty(exports, "Style", { enumerable: true, get: function () { return style_1.Style; } });
var util_1 = require("../../util");
var __1 = require("../../");
var alert_1 = require("./wml/alert");
///classNames:begin
exports.ALERT = 'ww-alert';
/**
 * Alert is used for displaying important messages to users.
 */
var Alert = /** @class */ (function (_super) {
    __extends(Alert, _super);
    function Alert() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new alert_1.Main(_this);
        _this.values = {
            wml: {
                id: 'alert'
            },
            id: __1.getId(_this.attrs),
            className: util_1.concat(exports.ALERT, __1.getClassName(_this.attrs), (_this.attrs.ww && _this.attrs.ww.style) ?
                style_1.getStyleClassName(_this.attrs.ww.style) :
                style_1.DEFAULT),
            closable: (_this.attrs.ww && _this.attrs.ww.closable) ?
                _this.attrs.ww.closable : false,
            content: (_this.attrs.ww && _this.attrs.ww.text) ?
                [dom_1.text(_this.attrs.ww.text)] : _this.children
        };
        return _this;
    }
    /**
     * close the alert.
     */
    Alert.prototype.close = function () {
        var mRoot = util_1.getById(this.view, this.values.wml.id);
        if (mRoot.isJust()) {
            var root = mRoot.get();
            if (root.parentNode)
                root.parentNode.removeChild(root);
        }
    };
    return Alert;
}(wml_1.Component));
exports.Alert = Alert;
//# sourceMappingURL=index.js.map