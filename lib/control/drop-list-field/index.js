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
                id: (0, __1.getId)(this.attrs),
                className: (0, util_1.concat)(exports.DROP_LIST_FIELD, (0, __1.getClassName)(this.attrs), (0, feedback_1.getValidityClassName)(this.attrs))
            },
            messages: {
                wml: {
                    id: 'message'
                },
                text: (0, feedback_1.getMessage)(this.attrs)
            },
            label: {
                id: (0, __2.getName)(this.attrs),
                text: (0, form_1.getLabel)(this.attrs)
            },
            control: {
                wml: {
                    id: 'control'
                },
                name: (0, __2.getName)(this.attrs),
                className: (0, feedback_1.getValidityClassName)(this.attrs),
                block: true,
                placeholder: (this.attrs && this.attrs.placeholder),
                disabled: (this.attrs && this.attrs.disabled),
                value: (this.attrs && this.attrs.value),
                options: (this.attrs && this.attrs.options) ?
                    this.attrs.options : [],
                stringifier: this.attrs && this.attrs.stringifier,
                itemTemplate: (this.attrs && this.attrs.itemTemplate) ?
                    this.attrs.itemTemplate : undefined,
                noItemsTemplate: (this.attrs && this.attrs.noItemsTemplate) ?
                    this.attrs.noItemsTemplate : undefined,
                onSelect: (e) => {
                    if (this.attrs && this.attrs.onChange)
                        this.attrs.onChange(new select_1.ItemChangedEvent(e.name, e.value));
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
const getHelp = (t) => (0, util_1.getById)(t.view, t.values.messages.wml.id);
//# sourceMappingURL=index.js.map