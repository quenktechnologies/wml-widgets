"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.close = exports.open = exports.Select = exports.SearchSection = exports.InputSection = exports.LabelSection = exports.MessagesSection = exports.ControlSection = exports.RootSection = exports.ItemUnsetEvent = exports.ItemChangedEvent = exports.SELECT = exports.ItemSelectedEvent = exports.TermChangedEvent = void 0;
const views = require("./wml/select");
const maybe_1 = require("@quenk/noni/lib/data/maybe");
const orientation_1 = require("../../content/orientation");
const util_1 = require("../../util");
const feedback_1 = require("../feedback");
const form_1 = require("../form");
const __1 = require("../../");
const __2 = require("../");
const search_1 = require("../search");
Object.defineProperty(exports, "TermChangedEvent", { enumerable: true, get: function () { return search_1.TermChangedEvent; } });
Object.defineProperty(exports, "ItemSelectedEvent", { enumerable: true, get: function () { return search_1.ItemSelectedEvent; } });
///classNames:begin
exports.SELECT = 'ww-select';
/**
 * ItemChangedEvent
 */
class ItemChangedEvent extends __2.Event {
}
exports.ItemChangedEvent = ItemChangedEvent;
/**
 * ItemUnsetEvent
 */
class ItemUnsetEvent extends __2.Event {
    constructor(name) {
        super(name, undefined);
        this.name = name;
    }
}
exports.ItemUnsetEvent = ItemUnsetEvent;
/**
 * RootSection
 */
class RootSection {
    constructor(attrs) {
        this.attrs = attrs;
        this.wml = { id: 'root' };
        this.id = (0, __1.getId)(this.attrs);
        this.className = (0, util_1.concat)(exports.SELECT, (0, __1.getClassName)(this.attrs), (0, feedback_1.getValidityClassName)(this.attrs), (0, orientation_1.getBlockClassName)(this.attrs));
    }
}
exports.RootSection = RootSection;
/**
 * ControlSection
 */
class ControlSection {
    constructor() {
        this.wml = { id: 'root' };
    }
}
exports.ControlSection = ControlSection;
/**
 * MessagesSection
 */
class MessagesSection {
    constructor(attrs) {
        this.attrs = attrs;
        this.wml = { id: 'message' };
        this.text = (0, feedback_1.getMessage)(this.attrs);
    }
}
exports.MessagesSection = MessagesSection;
/**
 * LabelSection
 */
class LabelSection {
    constructor(attrs) {
        this.attrs = attrs;
        this.id = (0, __2.getName)(this.attrs);
        this.text = (0, form_1.getLabel)(this.attrs);
    }
}
exports.LabelSection = LabelSection;
/**
 * InputSection
 */
class InputSection {
    constructor(attrs) {
        this.attrs = attrs;
        this.wml = { id: 'input' };
    }
}
exports.InputSection = InputSection;
/**
 * SearchSection
 */
class SearchSection {
    constructor(attrs, close, onSelect) {
        this.attrs = attrs;
        this.close = close;
        this.onSelect = onSelect;
        this.wml = { id: 'search' };
        this.name = (0, __2.getName)(this.attrs);
        this.className = (this.attrs && this.attrs.inputClassName) ?
            this.attrs.inputClassName : '';
        this.placeholder = (this.attrs && this.attrs.placeholder) ?
            this.attrs.placeholder : '';
        this.block = (this.attrs && this.attrs.block) ?
            this.attrs.block : false;
        this.value = (this.attrs && this.attrs.value) ?
            this.attrs.value : undefined;
        this.readOnly = (this.attrs && this.attrs.readOnly);
        this.disabled = (this.attrs && this.attrs.disabled);
        this.itemTemplate = (this.attrs && this.attrs.itemTemplate) ?
            this.attrs.itemTemplate : undefined;
        this.noItemsTemplate = (this.attrs && this.attrs.noItemsTemplate) ?
            this.attrs.noItemsTemplate : undefined;
        this.stringifier = (this.attrs && this.attrs.stringifier) ?
            this.attrs.stringifier : undefined;
        this.onSearch = (this.attrs && this.attrs.onSearch) ?
            this.attrs.onSearch : () => { };
    }
}
exports.SearchSection = SearchSection;
/**
 * Select provides an control for selecting an item from a
 * list.
 */
class Select extends form_1.AbstractFormControl {
    constructor() {
        super(...arguments);
        this.view = new views.Main(this);
        this.values = {
            root: new RootSection(this.attrs),
            control: new ControlSection(),
            messages: new MessagesSection(this.attrs),
            label: new LabelSection(this.attrs),
            input: new InputSection(this.attrs),
            search: new SearchSection(this.attrs, () => this.close(), (e) => {
                this.close();
                this.values.tag.value = (0, maybe_1.just)(e.value);
                if (this.attrs && this.attrs.onChange)
                    this.attrs.onChange(new ItemChangedEvent('' + this.attrs.name, e.value));
                this.view.invalidate();
            }),
            tag: {
                className: (0, feedback_1.getValidityClassName)(this.attrs),
                value: ((this.attrs &&
                    (this.attrs.value != undefined)) ?
                    (0, maybe_1.just)(this.attrs.value) : (0, maybe_1.nothing)()),
                disabled: (this.attrs && this.attrs.disabled) ?
                    this.attrs.disabled : false,
                isSet: () => this.values.tag.value.isJust(),
                getText: () => {
                    if (this.attrs && this.attrs.stringifier)
                        return this.attrs.stringifier(this.values.tag.value.get());
                    return '';
                },
                dismiss: () => {
                    this.values.tag.value = (0, maybe_1.nothing)();
                    if (this.attrs && this.attrs.onUnset)
                        this.attrs.onUnset(new ItemUnsetEvent(this.attrs.name + ''));
                    this.view.invalidate();
                }
            }
        };
    }
    open() {
        (0, exports.open)(this.view, this.values.search.wml.id);
        return this;
    }
    close() {
        (0, exports.close)(this.view, this.values.search.wml.id);
        return this;
    }
    setMessage(msg) {
        this.values.messages.text = msg;
        (0, form_1.setMessage)(this.view, this.values.messages.wml.id, msg);
        return this;
    }
    removeMessage() {
        this.values.messages.text = '';
        (0, form_1.removeMessage)(this.view, this.values.messages.wml.id);
        return this;
    }
    /**
     * update the Select with new item options to
     * present to the user.
     */
    update(results) {
        (0, exports.update)(this.view, this.values.search.wml.id, results);
        return this;
    }
}
exports.Select = Select;
/**
 * open helper.
 *
 * Invokes the open method on the Search widget.
 */
const open = (view, id) => {
    (0, util_1.getById)(view, id)
        .map((m) => m.open());
};
exports.open = open;
/**
 * close helper.
 *
 * Invokes the close method on the Search widget.
 */
const close = (view, id) => {
    (0, util_1.getById)(view, id)
        .map((m) => m.close());
};
exports.close = close;
/**
 * update helper.
 *
 * Invokes the update method on the Search widget.
 */
const update = (view, id, results) => {
    let mSearch = (0, util_1.getById)(view, id);
    if (mSearch.isJust())
        mSearch.get().update(results);
};
exports.update = update;
//# sourceMappingURL=index.js.map