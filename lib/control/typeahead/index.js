"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Typeahead = exports.TYPEAHEAD = exports.ItemSelectedEvent = exports.TextChangedEvent = exports.TermChangedEvent = void 0;
const views = require("./wml/typeahead");
const util_1 = require("../../util");
const form_1 = require("../form");
const search_1 = require("../search");
Object.defineProperty(exports, "TermChangedEvent", { enumerable: true, get: function () { return search_1.TermChangedEvent; } });
const text_field_1 = require("../text-field");
Object.defineProperty(exports, "TextChangedEvent", { enumerable: true, get: function () { return text_field_1.TextChangedEvent; } });
const select_1 = require("../select");
Object.defineProperty(exports, "ItemSelectedEvent", { enumerable: true, get: function () { return select_1.ItemSelectedEvent; } });
///classNames:begin
exports.TYPEAHEAD = 'ww-typeahead';
/**
 * Typeahead provides an text input field that can suggests values
 * as the user types.
 */
class Typeahead extends form_1.AbstractFormControl {
    constructor() {
        super(...arguments);
        this.view = new views.Main(this);
        this.values = {
            root: new select_1.RootSection(this.attrs),
            control: new select_1.ControlSection(),
            messages: new select_1.MessagesSection(this.attrs),
            label: new select_1.LabelSection(this.attrs),
            search: new select_1.SearchSection(this.attrs, () => this.close(), (e) => {
                this.close();
                let mSearch = (0, util_1.getById)(this.view, this.values.search.wml.id);
                if (mSearch.isJust()) {
                    let s = mSearch.get();
                    let str = (this.values.search.stringifier) ?
                        this.values.search.stringifier(e.value) : e.value + '';
                    s.set(str);
                    if (this.attrs && this.attrs.onChange)
                        this.attrs.onChange(new text_field_1.TextChangedEvent('' + this.attrs.name, str));
                }
            })
        };
    }
    open() {
        (0, select_1.open)(this.view, this.values.search.wml.id);
        return this;
    }
    close() {
        (0, select_1.close)(this.view, this.values.search.wml.id);
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
    update(results) {
        (0, select_1.update)(this.view, this.values.search.wml.id, results);
        return this;
    }
}
exports.Typeahead = Typeahead;
//# sourceMappingURL=index.js.map