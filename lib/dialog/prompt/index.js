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
var prompt_1 = require("./wml/prompt");
///classNames:begin
exports.PROMPT = 'ww-prompt';
exports.PROMPT_CLOSE = 'ww-prompt__close';
exports.PROMPT_SAVE = 'ww-prompt__save';
/**
 * Prompt displays a dialog to the user suitable for collecting data
 * input.
 */
var Prompt = /** @class */ (function (_super) {
    __extends(Prompt, _super);
    function Prompt() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new prompt_1.Main(_this);
        _this.values = {
            id: __1.getId(_this.attrs),
            className: util_1.concat(exports.PROMPT, __1.getClassName(_this.attrs)),
            wml: {
                id: 'modal'
            },
            header: {
                title: (_this.attrs.ww && _this.attrs.ww.title) ?
                    _this.attrs.ww.title : ''
            },
            footer: {
                close: {
                    text: (_this.attrs.ww && _this.attrs.ww.closeText) ?
                        _this.attrs.ww.closeText : 'Close',
                    className: exports.PROMPT_CLOSE,
                    onClick: function () {
                        if (_this.attrs.ww && _this.attrs.ww.onCancel)
                            _this.attrs.ww.onCancel();
                        _this.close();
                    }
                },
                save: {
                    text: (_this.attrs.ww && _this.attrs.ww.saveText) ?
                        _this.attrs.ww.saveText : 'Save',
                    wml: {
                        id: 'save'
                    },
                    className: util_1.concat('-primary', exports.PROMPT_SAVE),
                    disabled: (_this.attrs.ww && _this.attrs.ww.disabled) ?
                        true : false,
                    onClick: function () {
                        if (_this.attrs.ww && _this.attrs.ww.onSave)
                            _this.attrs.ww.onSave();
                        _this.close();
                    }
                }
            }
        };
        return _this;
    }
    Prompt.prototype.close = function () {
        exports.close(this.view, this.values.wml.id);
        return this;
    };
    /**
     * enable saving.
     */
    Prompt.prototype.enable = function () {
        getSave(this).map(function (b) { return b.enable(); });
        return this;
    };
    /**
     * disable saving.
     */
    Prompt.prototype.disable = function () {
        getSave(this).map(function (b) { return b.disable(); });
        return this;
    };
    return Prompt;
}(wml_1.Component));
exports.Prompt = Prompt;
var getSave = function (p) {
    return util_1.getById(p.view, p.values.footer.save.wml.id);
};
/**
 * close the Modal in a view.
 */
exports.close = function (view, id) {
    return util_1.getById(view, id).map(function (m) { return m.close(); });
};
//# sourceMappingURL=index.js.map