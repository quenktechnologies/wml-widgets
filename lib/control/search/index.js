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
var orientation_1 = require("../../content/orientation");
var util_1 = require("../../util");
var __1 = require("../../");
var __2 = require("../");
/**
 * ESCAPE key code.
 */
exports.ESCAPE = 27;
///classNames:begin
exports.SEARCH = 'ww-search';
/**
 * TermChangedEvent signals the search term has changed.
 */
var TermChangedEvent = /** @class */ (function (_super) {
    __extends(TermChangedEvent, _super);
    function TermChangedEvent(name, value) {
        return _super.call(this, name, value) || this;
    }
    return TermChangedEvent;
}(__2.Event));
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
                wml: {
                    id: 'root'
                },
                id: __1.getId(_this.attrs),
                className: util_1.concat(exports.SEARCH, __1.getClassName(_this.attrs), (_this.attrs.ww && _this.attrs.ww.block) ? orientation_1.BLOCK : ''),
                placeholder: (_this.attrs.ww && _this.attrs.ww.placeholder) ?
                    _this.attrs.ww.placeholder : '',
                readOnly: (_this.attrs.ww && _this.attrs.ww.readOnly) || null,
                value: (_this.attrs.ww && _this.attrs.ww.value) ?
                    _this.attrs.ww.value : '',
                onfocus: function (e) {
                    var target = e.target;
                    if (_this.attrs.ww && _this.attrs.ww.onFocus)
                        _this.attrs.ww.onFocus();
                    target.value = target.value;
                },
                onkeydown: function (e) {
                    if (e.keyCode === exports.ESCAPE) {
                        if (_this.attrs.ww && _this.attrs.ww.onEscape)
                            _this.attrs.ww.onEscape();
                    }
                    else {
                        if (_this.attrs.ww && _this.attrs.ww.onSearch) {
                            var name_1 = '' + _this.attrs.ww.name;
                            var value = e.target.value;
                            _this.attrs.ww.onSearch(new TermChangedEvent(name_1, value));
                        }
                    }
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
        util_1.getById(this.view, this.values.root.wml.id)
            .map(function (e) { e.value = value; });
        return this;
    };
    Search.prototype.get = function () {
        return util_1.getById(this.view, this.values.root.wml.id)
            .map(function (e) { return e.value; })
            .get();
    };
    return Search;
}(__2.AbstractControl));
exports.Search = Search;
//# sourceMappingURL=index.js.map