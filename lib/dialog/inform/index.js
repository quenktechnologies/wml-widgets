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
var prompt_1 = require("../prompt");
var inform_1 = require("./wml/inform");
///classNames:begin
exports.INFORM = 'ww-inform';
exports.INFORM_OK = 'ww-inform__ok';
/**
 * Inform displays a message to the user.
 */
var Inform = /** @class */ (function (_super) {
    __extends(Inform, _super);
    function Inform() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new inform_1.Main(_this);
        _this.values = {
            id: __1.getId(_this.attrs),
            className: util_1.concat(exports.INFORM, __1.getClassName(_this.attrs)),
            wml: {
                id: 'modal'
            },
            header: {
                title: (_this.attrs.ww && _this.attrs.ww.title) ?
                    _this.attrs.ww.title : ''
            },
            footer: {
                ok: {
                    text: (_this.attrs.ww && _this.attrs.ww.buttonText) ?
                        _this.attrs.ww.buttonText : 'Ok',
                    wml: {
                        id: 'ok'
                    },
                    className: util_1.concat(exports.INFORM_OK, '-primary'),
                    onClick: function () {
                        if (_this.attrs.ww && _this.attrs.ww.onClose)
                            _this.attrs.ww.onClose();
                        _this.close();
                    }
                }
            }
        };
        return _this;
    }
    Inform.prototype.close = function () {
        prompt_1.close(this.view, this.values.wml.id);
        return this;
    };
    return Inform;
}(wml_1.Component));
exports.Inform = Inform;
//# sourceMappingURL=index.js.map