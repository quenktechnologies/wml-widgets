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
var names = require("@package/self/common/names");
var views = require("./wml/autocomplete");
var util_1 = require("@package/self/common/util");
var lurch_1 = require("@package/self/control/lurch");
exports.ESCAPE = 27;
exports.INPUT_ID = 'input';
/**
 * Autocomplate provides an input with a dropdown menu that allows
 * the user to search and select form a list of options.
 */
var Autocomplete = /** @class */ (function (_super) {
    __extends(Autocomplete, _super);
    function Autocomplete() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.template = {
            populated: (_this.attrs.ww.populated) ?
                _this.attrs.ww.populated : views.populated,
            empty: (_this.attrs.ww.empty) ?
                _this.attrs.ww.empty : views.empty
        };
        _this.values = {
            id: {
                root: 'root',
                input: 'input',
                menu: 'menu',
                message: 'mesage',
            },
            class: {
                root: '',
                input: ''
            },
            root: {
                id: 'root',
                class: util_1.concat(names.SEARCH, _this.attrs.ww.class)
            },
            help: {
                id: 'message',
                success: _this.attrs.ww.success,
                error: _this.attrs.ww.error,
                warning: _this.attrs.ww.warning
            },
            menu: {
                id: 'menu'
            },
            label: {
                id: _this.attrs.ww.name,
                text: _this.attrs.ww.label || ''
            },
            input: {
                id: 'input',
                class: util_1.concat('form-control', _this.attrs.ww.inputClass),
                placeholder: _this.attrs.ww.placeholder ?
                    _this.attrs.ww.placeholder : null,
                onKeyDown: _this.onKeyDown,
                onKeyUp: _this.onKeyUp,
                onInput: _this.onInput
            },
            search: {
                delay: _this.attrs.ww.debounce ?
                    _this.attrs.ww.debounce : _this.DEFAULT_DEBOUNCE_TIME,
                results: []
            },
            item: {
                template: _this.template,
                stringify: _this.attrs.ww.stringifier ?
                    _this.attrs.ww.stringifier : _this.stringify,
                click: function (index) {
                    _this
                        .close()
                        .delegate
                        .onSelect(new lurch_1.ItemSelectedEvent(_this.attrs.ww.name, _this.values.search.results[Number(index)]));
                }
            }
        };
        return _this;
    }
    Autocomplete.prototype.clear = function () {
        return this;
    };
    Autocomplete.prototype.open = function () {
        this
            .view
            .findById(this.values.id.menu)
            .map(function (m) { return m.show(); });
        return this;
    };
    Autocomplete.prototype.close = function () {
        this
            .view
            .findById(this.values.id.menu)
            .map(function (m) { return m.hide(); });
        return this;
    };
    Autocomplete.prototype.update = function (results) {
        var _this = this;
        this.values.search.results = results;
        this
            .view
            .findById(this.values.id.menu)
            .map(function (m) { return m.setContent(new views.Results(_this)).show(); });
        return this;
    };
    return Autocomplete;
}(lurch_1.SearchControl));
exports.Autocomplete = Autocomplete;
//# sourceMappingURL=Autocomplete.js.map