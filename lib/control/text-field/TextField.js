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
var views = require("./wml/text-field");
var util_1 = require("@package/self/common/util");
var control_1 = require("@package/self/control");
var TextChangedEvent_1 = require("./TextChangedEvent");
/**
 * TextField
 */
var TextField = /** @class */ (function (_super) {
    __extends(TextField, _super);
    function TextField() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.values = {
            root: {
                id: 'root',
                class: util_1.concat('form-group', _this.attrs.ww.class, _this.state()),
            },
            help: {
                id: 'message',
                success: _this.attrs.ww.success,
                error: _this.attrs.ww.error,
                warning: _this.attrs.ww.warning
            },
            label: {
                id: _this.attrs.ww.name,
                text: _this.attrs.ww.label || ''
            },
            input: {
                id: 'input',
                class: 'form-control',
                name: _this.attrs.ww.name,
                type: _this.attrs.ww.type || 'text',
                focus: _this.attrs.ww.focus,
                placeholder: _this.attrs.ww.placeholder || '',
                value: _this.attrs.ww.value || '',
                disabled: (_this.attrs.ww.disabled === true) ? true : null,
                readOnly: (_this.attrs.ww.readOnly === true) ? true : null,
                rows: _this.attrs.ww.rows || 1,
                onInput: function (e) { return _this.delegate.onChange(new TextChangedEvent_1.TextChangedEvent(_this.attrs.ww.name, e.target.value)); }
            }
        };
        return _this;
    }
    return TextField;
}(control_1.FormControl));
exports.TextField = TextField;
//# sourceMappingURL=TextField.js.map