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
var util_1 = require("@package/wml-widgets/common/util");
var feedback_control_1 = require("@package/wml-widgets/control/feedback-control");
var form_control_1 = require("@package/wml-widgets/control/form-control");
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
                class: util_1.concat('form-group', _this.attrs.ww.class, feedback_control_1.state(_this.attrs.ww))
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
            control: {
                id: 'control',
                template: _this.attrs.ww.control || views.group,
                class: 'form-control',
                name: _this.attrs.ww.name,
                type: _this.attrs.ww.type || 'text',
                focus: _this.attrs.ww.focus,
                placeholder: _this.attrs.ww.placeholder || '',
                value: _this.attrs.ww.value || '',
                disabled: (_this.attrs.ww.disabled === true) ? true : null,
                readOnly: (_this.attrs.ww.readOnly === true) ? true : null,
                rows: _this.attrs.ww.rows || 1,
                oninput: function (e) { return _this.delegate.onChange(new TextChangedEvent_1.TextChangedEvent(_this.attrs.ww.name, e.target.value)); }
            }
        };
        return _this;
    }
    TextField.prototype.value = function () {
        return this.view.findById(this.values.control.id).cata(function () { return ''; }, function (e) { return e.value; });
    };
    return TextField;
}(form_control_1.FormControlWidget));
exports.TextField = TextField;
//# sourceMappingURL=TextField.js.map