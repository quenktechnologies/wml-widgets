"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleMenu = exports.closeMenu = exports.openMenu = exports.updateMenu = exports.Search = exports.Input = exports.EscapeEvent = exports.FocusLostEvent = exports.FocusGainedEvent = exports.TermChangedEvent = exports.SEARCH_INPUT = exports.SEARCH = exports.ESCAPE = exports.ItemSelectedEvent = void 0;
const views = require("./wml/search");
const timer_1 = require("@quenk/noni/lib/control/timer");
const orientation_1 = require("../../content/orientation");
const util_1 = require("../../util");
const results_menu_1 = require("../results-menu");
Object.defineProperty(exports, "ItemSelectedEvent", { enumerable: true, get: function () { return results_menu_1.ItemSelectedEvent; } });
const __1 = require("../../");
const __2 = require("../");
/**
 * ESCAPE key code.
 */
exports.ESCAPE = 27;
///classNames:begin
exports.SEARCH = 'ww-search';
exports.SEARCH_INPUT = 'ww-search__input';
/**
 * TermChangedEvent signals the search term has changed.
 */
class TermChangedEvent extends __2.Event {
}
exports.TermChangedEvent = TermChangedEvent;
/**
 * FocusGainedEvent signals the user as given focus to the control.
 */
class FocusGainedEvent {
    constructor(name) {
        this.name = name;
    }
}
exports.FocusGainedEvent = FocusGainedEvent;
/**
 * FocusLostEvent signals the user has removed focus from the control.
 */
class FocusLostEvent {
    constructor(name) {
        this.name = name;
    }
}
exports.FocusLostEvent = FocusLostEvent;
/**
 * EscapeEvent signals the user has pressed the escape key while typing.
 */
class EscapeEvent {
    constructor(name) {
        this.name = name;
    }
}
exports.EscapeEvent = EscapeEvent;
/**
 * Input provides the input part of a Search control.
 *
 * This is here mostly for code re-use.
 */
class Input extends __2.AbstractControl {
    constructor() {
        super(...arguments);
        this.view = new views.InputView(this);
        this.values = {
            wml: { id: 'root' },
            className: util_1.concat(exports.SEARCH_INPUT, __1.getClassName(this.attrs)),
            placeholder: (this.attrs.ww && this.attrs.ww.placeholder) ?
                this.attrs.ww.placeholder : '',
            readOnly: (this.attrs.ww && this.attrs.ww.readOnly) || undefined,
            disabled: (this.attrs.ww && this.attrs.ww.disabled) || undefined,
            autocomplete: 'do not enable please',
            autofocus: (this.attrs.ww && this.attrs.ww.autofocus) ?
                true : undefined,
            size: String((this.attrs.ww && this.attrs.ww.size) ?
                this.attrs.ww.size : 20),
            value: (this.attrs.ww && this.attrs.ww.value) ?
                this.attrs.ww.value : '',
            onfocus: (e) => {
                let target = e.target;
                if (this.attrs.ww && this.attrs.ww.onFocus)
                    this.attrs.ww.onFocus(new FocusGainedEvent(this.attrs.ww && this.attrs.ww.name || ''));
                target.value = target.value;
            },
            onkeyup: (e) => {
                if (e.keyCode === exports.ESCAPE) {
                    if (this.attrs.ww && this.attrs.ww.onEscape)
                        this.attrs.ww.onEscape(new EscapeEvent(this.attrs.ww.name || ''));
                }
                else {
                    this.fireSearch(e);
                }
            },
            oninput: (e) => {
                //For compatability reasons
                e.target.oninput = null;
                this.values.onkeyup(e);
            },
            onblur: () => {
                if (this.attrs.ww && this.attrs.ww.onBlur)
                    this.attrs.ww.onBlur(new FocusLostEvent(this.attrs.ww && this.attrs.ww.name || ''));
            }
        };
    }
    fireSearch(e) {
        if (this.attrs.ww && this.attrs.ww.onSearch) {
            let name = '' + this.attrs.ww.name;
            let value = e.target.value;
            this.attrs.ww.onSearch(new TermChangedEvent(name, value));
        }
    }
    rendered() {
        if (this.values.autofocus === true)
            this.focus();
    }
    /**
     * focus steals user focus to the Input.
     */
    focus() {
        timer_1.tick(() => getInput(this).map(i => i.focus()));
        return this;
    }
    /**
     * setSize sets the size of the input.
     */
    setSize(n) {
        this.values.size = String(n);
        getInput(this).map(i => i.setAttribute('size', String(n)));
        return this;
    }
    /**
     * getSize returns the size of the (internally tracked) size
     * of the Input.
     */
    getSize() {
        return Number(this.values.size);
    }
}
exports.Input = Input;
/**
 * Search provides an input that can be used in the ui for a search engine.
 */
class Search extends __2.AbstractControl {
    constructor() {
        super(...arguments);
        this.view = new views.Main(this);
        this.values = {
            root: {
                wml: {
                    id: 'root'
                },
                id: __1.getId(this.attrs),
                className: util_1.concat(exports.SEARCH, __1.getClassName(this.attrs), orientation_1.getBlockClassName(this.attrs))
            },
            input: {
                wml: {
                    id: 'input'
                },
                name: __2.getName(this.attrs),
                placeholder: (this.attrs.ww && this.attrs.ww.placeholder) ?
                    this.attrs.ww.placeholder : '',
                autofocus: (this.attrs.ww && this.attrs.ww.autofocus) ?
                    true : undefined,
                readOnly: (this.attrs.ww && this.attrs.ww.readOnly) || undefined,
                disabled: (this.attrs.ww && this.attrs.ww.disabled) || undefined,
                value: (this.attrs.ww && this.attrs.ww.term) ?
                    this.attrs.ww.term :
                    (this.attrs.ww &&
                        this.attrs.ww.stringifier &&
                        this.attrs.ww.value) ?
                        this.attrs.ww.stringifier(this.attrs.ww.value) : '',
                onFocus: this.attrs.ww && this.attrs.ww.onFocus || undefined,
                onSearch: (this.attrs.ww && this.attrs.ww.onSearch) ?
                    this.attrs.ww.onSearch : undefined,
                onEscape: () => this.close(),
                onBlur: (this.attrs.ww && this.attrs.ww.onBlur) ?
                    this.attrs.ww.onBlur : undefined
            },
            menu: {
                wml: {
                    id: 'menu'
                },
                name: (this.attrs.ww && this.attrs.ww.name) ?
                    this.attrs.ww.name : '',
                block: (this.attrs.ww && this.attrs.ww.block) ?
                    this.attrs.ww.block : false,
                onSelect: (e) => {
                    this.close();
                    if (this.attrs.ww && this.attrs.ww.onSelect)
                        this.attrs.ww.onSelect(e);
                },
                itemTemplate: (this.attrs.ww && this.attrs.ww.itemTemplate) ?
                    this.attrs.ww.itemTemplate : undefined,
                noItemsTemplate: (this.attrs.ww && this.attrs.ww.noItemsTemplate) ?
                    this.attrs.ww.noItemsTemplate : undefined,
                stringifier: (this.attrs.ww && this.attrs.ww.stringifier) ?
                    this.attrs.ww.stringifier : undefined
            }
        };
    }
    set(value) {
        util_1.getById(this.view, this.values.root.wml.id)
            .map((e) => { e.value = value; });
        return this;
    }
    /**
     * focus gives focus to the input.
     */
    focus() {
        util_1.getById(this.view, this.values.input.wml.id)
            .map(i => i.focus());
        return this;
    }
    /**
     * update the Select with new item options to
     * present to the user.
     */
    update(results) {
        exports.updateMenu(this.view, this.values.menu.wml.id, results);
        return this;
    }
    /**
     * open the results menu.
     */
    open() {
        exports.openMenu(this.view, this.values.menu.wml.id);
        return this;
    }
    /**
     * close the results menu.
     */
    close() {
        exports.closeMenu(this.view, this.values.menu.wml.id);
        return this;
    }
}
exports.Search = Search;
const getInput = (i) => util_1.getById(i.view, i.values.wml.id);
/**
 * updateMenu will cause the menu to be displayed with new items.
 */
exports.updateMenu = (view, id, results) => {
    let mMenu = util_1.getById(view, id);
    if (mMenu.isJust())
        mMenu.get().update(results);
};
/**
 * openMenu will cause the menu to be displayed with whatever contents
 * were previously set.
 */
exports.openMenu = (view, id) => {
    util_1.getById(view, id)
        .map((m) => m.open());
};
/**
 * closeMenu will cause the menu to no longer be displayed.
 */
exports.closeMenu = (view, id) => {
    util_1.getById(view, id)
        .map((m) => m.close());
};
/**
 * toggleMenu
 */
exports.toggleMenu = (view, id) => {
    util_1.getById(view, id)
        .map((m) => m.toggle());
};
//# sourceMappingURL=index.js.map