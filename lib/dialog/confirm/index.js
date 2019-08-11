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
var confirm_1 = require("./wml/confirm");
///classNames:begin
exports.CONFIRM = 'ww-confirm';
exports.CONFIRM_NO = 'ww-confirm__no';
exports.CONFIRM_YES = 'ww-prompt__yes';
///classNames:end
/**
 * Primary indicates whether the yes or no button should be highlighted.
 */
var Primary;
(function (Primary) {
    Primary["No"] = "no";
    Primary["Yes"] = "yes";
})(Primary = exports.Primary || (exports.Primary = {}));
/**
 * Confirm displays a dialog for confirming an action.
 */
var Confirm = /** @class */ (function (_super) {
    __extends(Confirm, _super);
    function Confirm() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new confirm_1.Main(_this);
        _this.values = {
            id: __1.getId(_this.attrs),
            className: util_1.concat(exports.CONFIRM, __1.getClassName(_this.attrs)),
            wml: {
                id: 'modal'
            },
            header: {
                title: (_this.attrs.ww && _this.attrs.ww.title) ?
                    _this.attrs.ww.title : ''
            },
            footer: {
                no: {
                    text: (_this.attrs.ww && _this.attrs.ww.noText) ?
                        _this.attrs.ww.noText : 'No',
                    className: util_1.concat(exports.CONFIRM_NO, (_this.attrs.ww &&
                        _this.attrs.ww.primary &&
                        _this.attrs.ww.primary === Primary.No) ? '-primary' : ''),
                    onClick: function () {
                        if (_this.attrs.ww && _this.attrs.ww.onNo)
                            _this.attrs.ww.onNo();
                        _this.close();
                    }
                },
                yes: {
                    text: (_this.attrs.ww && _this.attrs.ww.yesText) ?
                        _this.attrs.ww.yesText : 'Yes',
                    wml: {
                        id: 'yes'
                    },
                    className: util_1.concat(exports.CONFIRM_YES, (_this.attrs.ww &&
                        _this.attrs.ww.primary &&
                        _this.attrs.ww.primary === Primary.No) ? '' : '-primary'),
                    onClick: function () {
                        if (_this.attrs.ww && _this.attrs.ww.onYes)
                            _this.attrs.ww.onYes();
                        _this.close();
                    }
                }
            }
        };
        return _this;
    }
    Confirm.prototype.close = function () {
        prompt_1.close(this.view, this.values.wml.id);
        return this;
    };
    return Confirm;
}(wml_1.Component));
exports.Confirm = Confirm;
//# sourceMappingURL=index.js.map