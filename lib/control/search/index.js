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
            className: (0, util_1.concat)(exports.SEARCH_INPUT, (0, __1.getClassName)(this.attrs)),
            placeholder: (this.attrs && this.attrs.placeholder) ?
                this.attrs.placeholder : '',
            readOnly: (this.attrs && this.attrs.readOnly) || undefined,
            disabled: (this.attrs && this.attrs.disabled) || undefined,
            autocomplete: 'do not enable please',
            autofocus: (this.attrs && this.attrs.autofocus) ?
                true : undefined,
            size: String((this.attrs && this.attrs.size) ?
                this.attrs.size : 20),
            value: (this.attrs && this.attrs.value) ?
                this.attrs.value : '',
            onfocus: (e) => {
                let target = e.target;
                if (this.attrs && this.attrs.onFocus)
                    this.attrs.onFocus(new FocusGainedEvent(this.attrs && this.attrs.name || ''));
                target.value = target.value;
            },
            onkeyup: (e) => {
                if (e.keyCode === exports.ESCAPE) {
                    if (this.attrs && this.attrs.onEscape)
                        this.attrs.onEscape(new EscapeEvent(this.attrs.name || ''));
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
                if (this.attrs && this.attrs.onBlur)
                    this.attrs.onBlur(new FocusLostEvent(this.attrs && this.attrs.name || ''));
            }
        };
    }
    fireSearch(e) {
        if (this.attrs && this.attrs.onSearch) {
            let name = '' + this.attrs.name;
            let value = e.target.value;
            this.attrs.onSearch(new TermChangedEvent(name, value));
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
        (0, timer_1.tick)(() => getInput(this).map(i => i.focus()));
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
                id: (0, __1.getId)(this.attrs),
                className: (0, util_1.concat)(exports.SEARCH, (0, __1.getClassName)(this.attrs), (0, orientation_1.getBlockClassName)(this.attrs))
            },
            input: {
                wml: {
                    id: 'input'
                },
                name: (0, __2.getName)(this.attrs),
                placeholder: (this.attrs && this.attrs.placeholder) ?
                    this.attrs.placeholder : '',
                autofocus: (this.attrs && this.attrs.autofocus) ?
                    true : undefined,
                readOnly: (this.attrs && this.attrs.readOnly) || undefined,
                disabled: (this.attrs && this.attrs.disabled) || undefined,
                value: (this.attrs && this.attrs.term) ?
                    this.attrs.term :
                    (this.attrs &&
                        this.attrs.stringifier &&
                        this.attrs.value) ?
                        this.attrs.stringifier(this.attrs.value) : '',
                onFocus: this.attrs && this.attrs.onFocus || undefined,
                onSearch: (this.attrs && this.attrs.onSearch) ?
                    this.attrs.onSearch : undefined,
                onEscape: () => this.close(),
                onBlur: (this.attrs && this.attrs.onBlur) ?
                    this.attrs.onBlur : undefined
            },
            menu: {
                wml: {
                    id: 'menu'
                },
                name: (this.attrs && this.attrs.name) ?
                    this.attrs.name : '',
                block: (this.attrs && this.attrs.block) ?
                    this.attrs.block : false,
                onSelect: (e) => {
                    this.close();
                    if (this.attrs && this.attrs.onSelect)
                        this.attrs.onSelect(e);
                },
                itemTemplate: (this.attrs && this.attrs.itemTemplate) ?
                    this.attrs.itemTemplate : undefined,
                noItemsTemplate: (this.attrs && this.attrs.noItemsTemplate) ?
                    this.attrs.noItemsTemplate : undefined,
                stringifier: (this.attrs && this.attrs.stringifier) ?
                    this.attrs.stringifier : undefined
            }
        };
    }
    set(value) {
        (0, util_1.getById)(this.view, this.values.root.wml.id)
            .map((e) => { e.value = value; });
        return this;
    }
    /**
     * focus gives focus to the input.
     */
    focus() {
        (0, util_1.getById)(this.view, this.values.input.wml.id)
            .map(i => i.focus());
        return this;
    }
    /**
     * update the Select with new item options to
     * present to the user.
     */
    update(results) {
        (0, exports.updateMenu)(this.view, this.values.menu.wml.id, results);
        return this;
    }
    /**
     * open the results menu.
     */
    open() {
        (0, exports.openMenu)(this.view, this.values.menu.wml.id);
        return this;
    }
    /**
     * close the results menu.
     */
    close() {
        (0, exports.closeMenu)(this.view, this.values.menu.wml.id);
        return this;
    }
}
exports.Search = Search;
const getInput = (i) => (0, util_1.getById)(i.view, i.values.wml.id);
/**
 * updateMenu will cause the menu to be displayed with new items.
 */
const updateMenu = (view, id, results) => {
    let mMenu = (0, util_1.getById)(view, id);
    if (mMenu.isJust())
        mMenu.get().update(results);
};
exports.updateMenu = updateMenu;
/**
 * openMenu will cause the menu to be displayed with whatever contents
 * were previously set.
 */
const openMenu = (view, id) => {
    (0, util_1.getById)(view, id)
        .map((m) => m.open());
};
exports.openMenu = openMenu;
/**
 * closeMenu will cause the menu to no longer be displayed.
 */
const closeMenu = (view, id) => {
    (0, util_1.getById)(view, id)
        .map((m) => m.close());
};
exports.closeMenu = closeMenu;
/**
 * toggleMenu
 */
const toggleMenu = (view, id) => {
    (0, util_1.getById)(view, id)
        .map((m) => m.toggle());
};
exports.toggleMenu = toggleMenu;
//# sourceMappingURL=index.js.map