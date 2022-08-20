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
        this.id = __1.getId(this.attrs);
        this.className = util_1.concat(exports.SELECT, __1.getClassName(this.attrs), feedback_1.getValidityClassName(this.attrs), orientation_1.getBlockClassName(this.attrs));
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
        this.text = feedback_1.getMessage(this.attrs);
    }
}
exports.MessagesSection = MessagesSection;
/**
 * LabelSection
 */
class LabelSection {
    constructor(attrs) {
        this.attrs = attrs;
        this.id = __2.getName(this.attrs);
        this.text = form_1.getLabel(this.attrs);
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
        this.name = __2.getName(this.attrs);
        this.className = (this.attrs.ww && this.attrs.ww.inputClassName) ?
            this.attrs.ww.inputClassName : '';
        this.placeholder = (this.attrs.ww && this.attrs.ww.placeholder) ?
            this.attrs.ww.placeholder : '';
        this.block = (this.attrs.ww && this.attrs.ww.block) ?
            this.attrs.ww.block : false;
        this.value = (this.attrs.ww && this.attrs.ww.value) ?
            this.attrs.ww.value : undefined;
        this.readOnly = (this.attrs.ww && this.attrs.ww.readOnly);
        this.disabled = (this.attrs.ww && this.attrs.ww.disabled);
        this.itemTemplate = (this.attrs.ww && this.attrs.ww.itemTemplate) ?
            this.attrs.ww.itemTemplate : undefined;
        this.noItemsTemplate = (this.attrs.ww && this.attrs.ww.noItemsTemplate) ?
            this.attrs.ww.noItemsTemplate : undefined;
        this.stringifier = (this.attrs.ww && this.attrs.ww.stringifier) ?
            this.attrs.ww.stringifier : undefined;
        this.onSearch = (this.attrs.ww && this.attrs.ww.onSearch) ?
            this.attrs.ww.onSearch : () => { };
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
                this.values.tag.value = maybe_1.just(e.value);
                if (this.attrs.ww && this.attrs.ww.onChange)
                    this.attrs.ww.onChange(new ItemChangedEvent('' + this.attrs.ww.name, e.value));
                this.view.invalidate();
            }),
            tag: {
                className: feedback_1.getValidityClassName(this.attrs),
                value: ((this.attrs.ww &&
                    (this.attrs.ww.value != undefined)) ?
                    maybe_1.just(this.attrs.ww.value) : maybe_1.nothing()),
                disabled: (this.attrs.ww && this.attrs.ww.disabled) ?
                    this.attrs.ww.disabled : false,
                isSet: () => this.values.tag.value.isJust(),
                getText: () => {
                    if (this.attrs.ww && this.attrs.ww.stringifier)
                        return this.attrs.ww.stringifier(this.values.tag.value.get());
                    return '';
                },
                dismiss: () => {
                    this.values.tag.value = maybe_1.nothing();
                    if (this.attrs.ww && this.attrs.ww.onUnset)
                        this.attrs.ww.onUnset(new ItemUnsetEvent(this.attrs.ww.name + ''));
                    this.view.invalidate();
                }
            }
        };
    }
    open() {
        exports.open(this.view, this.values.search.wml.id);
        return this;
    }
    close() {
        exports.close(this.view, this.values.search.wml.id);
        return this;
    }
    setMessage(msg) {
        this.values.messages.text = msg;
        form_1.setMessage(this.view, this.values.messages.wml.id, msg);
        return this;
    }
    removeMessage() {
        this.values.messages.text = '';
        form_1.removeMessage(this.view, this.values.messages.wml.id);
        return this;
    }
    /**
     * update the Select with new item options to
     * present to the user.
     */
    update(results) {
        exports.update(this.view, this.values.search.wml.id, results);
        return this;
    }
}
exports.Select = Select;
/**
 * open helper.
 *
 * Invokes the open method on the Search widget.
 */
exports.open = (view, id) => {
    util_1.getById(view, id)
        .map((m) => m.open());
};
/**
 * close helper.
 *
 * Invokes the close method on the Search widget.
 */
exports.close = (view, id) => {
    util_1.getById(view, id)
        .map((m) => m.close());
};
/**
 * update helper.
 *
 * Invokes the update method on the Search widget.
 */
exports.update = (view, id, results) => {
    let mSearch = util_1.getById(view, id);
    if (mSearch.isJust())
        mSearch.get().update(results);
};
//# sourceMappingURL=index.js.map