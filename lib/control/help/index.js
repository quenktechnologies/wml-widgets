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
exports.Help = exports.HELP = void 0;
var wml_1 = require("@quenk/wml");
var util_1 = require("../../util");
var feedback_1 = require("../feedback");
var __1 = require("../../");
var help_1 = require("./wml/help");
///classNames:begin
exports.HELP = 'ww-help';
/**
 * Help
 */
var Help = /** @class */ (function (_super) {
    __extends(Help, _super);
    function Help() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new help_1.Main(_this);
        _this.values = {
            help: {
                wml: {
                    id: 'help'
                },
                id: (_this.attrs.ww && _this.attrs.ww.id) ?
                    _this.attrs.ww.id : '',
                className: util_1.concat(exports.HELP, __1.getClassName(_this.attrs)),
                text: (_this.attrs.ww && _this.attrs.ww.text) ?
                    [document.createTextNode(_this.attrs.ww.text)] : _this.children
            }
        };
        return _this;
    }
    Help.prototype.setMessage = function (msg) {
        feedback_1.setMessage(this.view, this.values.help.wml.id, msg);
        return this;
    };
    Help.prototype.removeMessage = function () {
        feedback_1.removeMessage(this.view, this.values.help.wml.id);
        return this;
    };
    return Help;
}(wml_1.Component));
exports.Help = Help;
//# sourceMappingURL=index.js.map