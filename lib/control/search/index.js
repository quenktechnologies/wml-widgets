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
var views = require("./wml/search");
var orientation_1 = require("../../content/orientation");
var util_1 = require("../../util");
var results_menu_1 = require("../results-menu");
exports.ItemSelectedEvent = results_menu_1.ItemSelectedEvent;
var __1 = require("../../");
var __2 = require("../");
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
var TermChangedEvent = /** @class */ (function (_super) {
    __extends(TermChangedEvent, _super);
    function TermChangedEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TermChangedEvent;
}(__2.Event));
exports.TermChangedEvent = TermChangedEvent;
/**
 * FocusGainedEvent signals the user as given focus to the control.
 */
var FocusGainedEvent = /** @class */ (function () {
    function FocusGainedEvent(name) {
        this.name = name;
    }
    return FocusGainedEvent;
}());
exports.FocusGainedEvent = FocusGainedEvent;
/**
 * FocusLostEvent signals the user has removed focus from the control.
 */
var FocusLostEvent = /** @class */ (function () {
    function FocusLostEvent(name) {
        this.name = name;
    }
    return FocusLostEvent;
}());
exports.FocusLostEvent = FocusLostEvent;
/**
 * EscapeEvent signals the user has pressed the escape key while typing.
 */
var EscapeEvent = /** @class */ (function () {
    function EscapeEvent(name) {
        this.name = name;
    }
    return EscapeEvent;
}());
exports.EscapeEvent = EscapeEvent;
/**
 * Input provides the input part of a Search control.
 *
 * This is here mostly for code re-use.
 */
var Input = /** @class */ (function (_super) {
    __extends(Input, _super);
    function Input() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.InputView(_this);
        _this.values = {
            wml: { id: 'root' },
            className: util_1.concat(exports.SEARCH_INPUT, __1.getClassName(_this.attrs)),
            placeholder: (_this.attrs.ww && _this.attrs.ww.placeholder) ?
                _this.attrs.ww.placeholder : '',
            readOnly: (_this.attrs.ww && _this.attrs.ww.readOnly) || undefined,
            disabled: (_this.attrs.ww && _this.attrs.ww.disabled) || undefined,
            autocomplete: 'do not enable please',
            autofocus: (_this.attrs.ww && _this.attrs.ww.autofocus) ?
                true : undefined,
            size: String((_this.attrs.ww && _this.attrs.ww.size) ?
                _this.attrs.ww.size : 20),
            value: (_this.attrs.ww && _this.attrs.ww.value) ?
                _this.attrs.ww.value : '',
            onfocus: function (e) {
                var target = e.target;
                if (_this.attrs.ww && _this.attrs.ww.onFocus)
                    _this.attrs.ww.onFocus(new FocusGainedEvent(_this.attrs.ww && _this.attrs.ww.name || ''));
                target.value = target.value;
            },
            onkeydown: function (e) {
                if (e.keyCode !== exports.ESCAPE)
                    if (_this.attrs.ww && _this.attrs.ww.onSearch) {
                        var name_1 = '' + _this.attrs.ww.name;
                        var value = e.target.value;
                        _this.attrs.ww.onSearch(new TermChangedEvent(name_1, value));
                    }
            },
            onkeyup: function (e) {
                if (e.keyCode === exports.ESCAPE)
                    if (_this.attrs.ww && _this.attrs.ww.onEscape)
                        _this.attrs.ww.onEscape(new EscapeEvent(_this.attrs.ww.name || ''));
            },
            oninput: function (e) {
                //For compatability reasons
                e.target.oninput = null;
                _this.values.onkeydown(e);
            },
            onblur: function () {
                if (_this.attrs.ww && _this.attrs.ww.onBlur)
                    _this.attrs.ww.onBlur(new FocusLostEvent(_this.attrs.ww && _this.attrs.ww.name || ''));
            }
        };
        return _this;
    }
    /**
     * focus steals user focus to the Input.
     */
    Input.prototype.focus = function () {
        getInput(this).map(function (i) { return i.focus(); });
        return this;
    };
    /**
     * setSize sets the size of the input.
     */
    Input.prototype.setSize = function (n) {
        this.values.size = String(n);
        getInput(this).map(function (i) { return i.setAttribute('size', String(n)); });
        return this;
    };
    /**
     * getSize returns the size of the (internally tracked) size
     * of the Input.
     */
    Input.prototype.getSize = function () {
        return Number(this.values.size);
    };
    return Input;
}(__2.AbstractControl));
exports.Input = Input;
/**
 * Search provides an input that can be used in the ui for a search engine.
 */
var Search = /** @class */ (function (_super) {
    __extends(Search, _super);
    function Search() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.values = {
            root: {
                wml: {
                    id: 'root'
                },
                id: __1.getId(_this.attrs),
                className: util_1.concat(exports.SEARCH, __1.getClassName(_this.attrs), orientation_1.getBlockClassName(_this.attrs))
            },
            input: {
                wml: {
                    id: 'input'
                },
                name: __2.getName(_this.attrs),
                placeholder: (_this.attrs.ww && _this.attrs.ww.placeholder) ?
                    _this.attrs.ww.placeholder : '',
                autofocus: (_this.attrs.ww && _this.attrs.ww.autofocus) ?
                    true : undefined,
                readOnly: (_this.attrs.ww && _this.attrs.ww.readOnly) || undefined,
                disabled: (_this.attrs.ww && _this.attrs.ww.disabled) || undefined,
                value: (_this.attrs.ww && _this.attrs.ww.term) ?
                    _this.attrs.ww.term :
                    (_this.attrs.ww &&
                        _this.attrs.ww.stringifier &&
                        _this.attrs.ww.value) ?
                        _this.attrs.ww.stringifier(_this.attrs.ww.value) : '',
                onFocus: _this.attrs.ww && _this.attrs.ww.onFocus || undefined,
                onSearch: (_this.attrs.ww && _this.attrs.ww.onSearch) ?
                    _this.attrs.ww.onSearch : undefined,
                onEscape: function () { return _this.close(); },
                onBlur: (_this.attrs.ww && _this.attrs.ww.onBlur) ?
                    _this.attrs.ww.onBlur : undefined
            },
            menu: {
                wml: {
                    id: 'menu'
                },
                name: (_this.attrs.ww && _this.attrs.ww.name) ?
                    _this.attrs.ww.name : '',
                block: (_this.attrs.ww && _this.attrs.ww.block) ?
                    _this.attrs.ww.block : false,
                onSelect: function (e) {
                    _this.close();
                    if (_this.attrs.ww && _this.attrs.ww.onSelect)
                        _this.attrs.ww.onSelect(e);
                },
                itemTemplate: (_this.attrs.ww && _this.attrs.ww.itemTemplate) ?
                    _this.attrs.ww.itemTemplate : undefined,
                noItemsTemplate: (_this.attrs.ww && _this.attrs.ww.noItemsTemplate) ?
                    _this.attrs.ww.noItemsTemplate : undefined,
                stringifier: (_this.attrs.ww && _this.attrs.ww.stringifier) ?
                    _this.attrs.ww.stringifier : undefined
            }
        };
        return _this;
    }
    Search.prototype.set = function (value) {
        util_1.getById(this.view, this.values.root.wml.id)
            .map(function (e) { e.value = value; });
        return this;
    };
    /**
     * focus gives focus to the input.
     */
    Search.prototype.focus = function () {
        util_1.getById(this.view, this.values.input.wml.id)
            .map(function (i) { return i.focus(); });
        return this;
    };
    /**
     * update the Select with new item options to
     * present to the user.
     */
    Search.prototype.update = function (results) {
        exports.updateMenu(this.view, this.values.menu.wml.id, results);
        return this;
    };
    /**
     * open the results menu.
     */
    Search.prototype.open = function () {
        exports.openMenu(this.view, this.values.menu.wml.id);
        return this;
    };
    /**
     * close the results menu.
     */
    Search.prototype.close = function () {
        exports.closeMenu(this.view, this.values.menu.wml.id);
        return this;
    };
    return Search;
}(__2.AbstractControl));
exports.Search = Search;
var getInput = function (i) {
    return util_1.getById(i.view, i.values.wml.id);
};
/**
 * updateMenu will cause the menu to be displayed with new items.
 */
exports.updateMenu = function (view, id, results) {
    var mMenu = util_1.getById(view, id);
    if (mMenu.isJust())
        mMenu.get().update(results);
};
/**
 * openMenu will cause the menu to be displayed with whatever contents
 * were previously set.
 */
exports.openMenu = function (view, id) {
    util_1.getById(view, id)
        .map(function (m) { return m.open(); });
};
/**
 * closeMenu will cause the menu to no longer be displayed.
 */
exports.closeMenu = function (view, id) {
    util_1.getById(view, id)
        .map(function (m) { return m.close(); });
};
/**
 * toggleMenu
 */
exports.toggleMenu = function (view, id) {
    util_1.getById(view, id)
        .map(function (m) { return m.toggle(); });
};
//# sourceMappingURL=index.js.map