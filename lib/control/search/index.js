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
var views = require("./wml/search");
var util_1 = require("../../util");
var _1 = require("../");
/**
 * ESCAPE key code.
 */
exports.ESCAPE = 27;
///className:begin
exports.SEARCH = 'ww-search form-control';
/**
 * TermChangedEvent signals the search term has changed.
 */
var TermChangedEvent = /** @class */ (function (_super) {
    __extends(TermChangedEvent, _super);
    function TermChangedEvent(name, value) {
        return _super.call(this, name, value) || this;
    }
    return TermChangedEvent;
}(_1.Event));
exports.TermChangedEvent = TermChangedEvent;
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
                id: 'input',
                class: util_1.concat(exports.SEARCH, _this.attrs.ww && _this.attrs.ww.class),
                placeholder: (_this.attrs.ww && _this.attrs.ww.placeholder) || '',
                readOnly: (_this.attrs.ww && _this.attrs.ww.readOnly) || null,
                value: (_this.attrs.ww && _this.attrs.ww.value) || '',
                onfocus: function (e) {
                    _this.attrs.ww && _this.attrs.ww.onFocus();
                    e.target.value = e.target.value;
                },
                onkeydown: function (e) {
                    (e.keyCode === exports.ESCAPE) ?
                        _this.attrs.ww &&
                            _this.attrs.ww.onEscape &&
                            _this.attrs.ww.onEscape() :
                        _this.attrs.ww &&
                            _this.attrs.ww.onSearch &&
                            _this.attrs.ww.onSearch(new TermChangedEvent(_this.attrs.ww.name, e.target.value));
                },
                onkeyup: function (e) {
                    if (e.keyCode === exports.ESCAPE)
                        e.target.blur();
                },
                oninput: function (e) {
                    //For compatability reasons
                    e.target.oninput = null;
                    _this.values.root.onkeydown(e);
                }
            }
        };
        return _this;
    }
    Search.prototype.set = function (value) {
        this
            .view
            .findById(this.values.root.id)
            .map(function (e) { e.value = value; });
        return this;
    };
    Search.prototype.get = function () {
        return this
            .view
            .findById(this.values.root.id)
            .map(function (e) { return e.value; })
            .get();
    };
    return Search;
}(_1.GenericControl));
exports.Search = Search;
//# sourceMappingURL=index.js.map