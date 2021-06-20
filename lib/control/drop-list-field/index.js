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
exports.DropListField = exports.DROP_LIST_FIELD = exports.ItemChangedEvent = void 0;
var util_1 = require("../../util");
var feedback_1 = require("../feedback");
var select_1 = require("../select");
Object.defineProperty(exports, "ItemChangedEvent", { enumerable: true, get: function () { return select_1.ItemChangedEvent; } });
var form_1 = require("../form");
var __1 = require("../../");
var __2 = require("../");
var drop_list_field_1 = require("./wml/drop-list-field");
///classNames:begin
exports.DROP_LIST_FIELD = 'ww-drop-list-field';
/**
 * DropListField
 */
var DropListField = /** @class */ (function (_super) {
    __extends(DropListField, _super);
    function DropListField() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new drop_list_field_1.Main(_this);
        _this.values = {
            root: {
                wml: {
                    id: 'root'
                },
                id: __1.getId(_this.attrs),
                className: util_1.concat(exports.DROP_LIST_FIELD, __1.getClassName(_this.attrs), feedback_1.getValidityClassName(_this.attrs))
            },
            messages: {
                wml: {
                    id: 'message'
                },
                text: feedback_1.getMessage(_this.attrs)
            },
            label: {
                id: __2.getName(_this.attrs),
                text: form_1.getLabel(_this.attrs)
            },
            control: {
                wml: {
                    id: 'control'
                },
                name: __2.getName(_this.attrs),
                className: feedback_1.getValidityClassName(_this.attrs),
                block: true,
                placeholder: (_this.attrs.ww && _this.attrs.ww.placeholder),
                disabled: (_this.attrs.ww && _this.attrs.ww.disabled),
                value: (_this.attrs.ww && _this.attrs.ww.value),
                options: (_this.attrs.ww && _this.attrs.ww.options) ?
                    _this.attrs.ww.options : [],
                stringifier: _this.attrs.ww && _this.attrs.ww.stringifier,
                itemTemplate: (_this.attrs.ww && _this.attrs.ww.itemTemplate) ?
                    _this.attrs.ww.itemTemplate : undefined,
                noItemsTemplate: (_this.attrs.ww && _this.attrs.ww.noItemsTemplate) ?
                    _this.attrs.ww.noItemsTemplate : undefined,
                onSelect: function (e) {
                    if (_this.attrs.ww && _this.attrs.ww.onChange)
                        _this.attrs.ww.onChange(new select_1.ItemChangedEvent(e.name, e.value));
                },
            }
        };
        return _this;
    }
    DropListField.prototype.setMessage = function (msg) {
        getHelp(this).map(function (h) { return h.setMessage(msg); });
        return this;
    };
    DropListField.prototype.removeMessage = function () {
        getHelp(this).map(function (h) { return h.removeMessage(); });
        return this;
    };
    return DropListField;
}(form_1.AbstractFormControl));
exports.DropListField = DropListField;
var getHelp = function (t) {
    return util_1.getById(t.view, t.values.messages.wml.id);
};
//# sourceMappingURL=index.js.map