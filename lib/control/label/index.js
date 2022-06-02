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
exports.Label = exports.LABEL = void 0;
var document = require("@quenk/wml/lib/dom");
var wml_1 = require("@quenk/wml");
var util_1 = require("../../util");
var __1 = require("../../");
var label_1 = require("./wml/label");
///classNames:begin
exports.LABEL = 'ww-label';
/**
 * Label
 */
var Label = /** @class */ (function (_super) {
    __extends(Label, _super);
    function Label() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new label_1.Main(_this);
        _this.values = {
            label: {
                className: util_1.concat(exports.LABEL, __1.getClassName(_this.attrs)),
                for: (_this.attrs.ww && _this.attrs.ww.for) ?
                    _this.attrs.ww.for : '',
                text: (_this.attrs.ww && _this.attrs.ww.text) ?
                    [document.createTextNode(_this.attrs.ww.text)] : _this.children
            }
        };
        return _this;
    }
    return Label;
}(wml_1.Component));
exports.Label = Label;
//# sourceMappingURL=index.js.map