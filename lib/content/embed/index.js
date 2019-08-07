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
var wml_1 = require("@quenk/wml");
var util_1 = require("../../util");
var __1 = require("../../");
var embed_1 = require("./wml/embed");
///classNames:begin
exports.EMBED = 'ww-embed';
/**
 * Embed
 */
var Embed = /** @class */ (function (_super) {
    __extends(Embed, _super);
    function Embed() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new embed_1.Main(_this);
        _this.values = {
            wml: {
                id: 'embed'
            },
            id: __1.getId(_this.attrs),
            className: util_1.concat(exports.EMBED, __1.getClassName(_this.attrs)),
        };
        return _this;
    }
    return Embed;
}(wml_1.Component));
exports.Embed = Embed;
//# sourceMappingURL=index.js.map