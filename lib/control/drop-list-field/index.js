"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropListField = exports.DROP_LIST_FIELD = exports.ItemChangedEvent = void 0;
const util_1 = require("../../util");
const feedback_1 = require("../feedback");
const select_1 = require("../select");
Object.defineProperty(exports, "ItemChangedEvent", { enumerable: true, get: function () { return select_1.ItemChangedEvent; } });
const form_1 = require("../form");
const __1 = require("../../");
const __2 = require("../");
const drop_list_field_1 = require("./wml/drop-list-field");
///classNames:begin
exports.DROP_LIST_FIELD = 'ww-drop-list-field';
/**
 * DropListField
 */
class DropListField extends form_1.AbstractFormControl {
    constructor() {
        super(...arguments);
        this.view = new drop_list_field_1.Main(this);
        this.values = {
            root: {
                wml: {
                    id: 'root'
                },
                id: __1.getId(this.attrs),
                className: util_1.concat(exports.DROP_LIST_FIELD, __1.getClassName(this.attrs), feedback_1.getValidityClassName(this.attrs))
            },
            messages: {
                wml: {
                    id: 'message'
                },
                text: feedback_1.getMessage(this.attrs)
            },
            label: {
                id: __2.getName(this.attrs),
                text: form_1.getLabel(this.attrs)
            },
            control: {
                wml: {
                    id: 'control'
                },
                name: __2.getName(this.attrs),
                className: feedback_1.getValidityClassName(this.attrs),
                block: true,
                placeholder: (this.attrs.ww && this.attrs.ww.placeholder),
                disabled: (this.attrs.ww && this.attrs.ww.disabled),
                value: (this.attrs.ww && this.attrs.ww.value),
                options: (this.attrs.ww && this.attrs.ww.options) ?
                    this.attrs.ww.options : [],
                stringifier: this.attrs.ww && this.attrs.ww.stringifier,
                itemTemplate: (this.attrs.ww && this.attrs.ww.itemTemplate) ?
                    this.attrs.ww.itemTemplate : undefined,
                noItemsTemplate: (this.attrs.ww && this.attrs.ww.noItemsTemplate) ?
                    this.attrs.ww.noItemsTemplate : undefined,
                onSelect: (e) => {
                    if (this.attrs.ww && this.attrs.ww.onChange)
                        this.attrs.ww.onChange(new select_1.ItemChangedEvent(e.name, e.value));
                },
            }
        };
    }
    setMessage(msg) {
        getHelp(this).map(h => h.setMessage(msg));
        return this;
    }
    removeMessage() {
        getHelp(this).map(h => h.removeMessage());
        return this;
    }
}
exports.DropListField = DropListField;
const getHelp = (t) => util_1.getById(t.view, t.values.messages.wml.id);
//# sourceMappingURL=index.js.map