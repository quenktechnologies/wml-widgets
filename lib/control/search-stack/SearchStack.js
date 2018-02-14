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
var names = require("@package/wml-widgets/common/names");
var views = require("./wml/search-stack");
var form_control_1 = require("@package/wml-widgets/control/form-control");
/**
 * SearchStack
 */
var SearchStack = /** @class */ (function (_super) {
    __extends(SearchStack, _super);
    function SearchStack() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.values = {
            id: {
                root: 'root',
                input: 'button',
                search: 'search',
                message: 'message'
            },
            root: {
                id: 'root',
                class: names.SEARCH_STACK
            },
            help: {
                id: 'help'
            },
            search: {
                id: 'search',
                name: _this.attrs.ww.name,
                value: '',
                onSearch: function (evt) { if (_this.attrs.ww.onSearch)
                    _this.attrs.ww.onSearch(evt); },
                onSelect: function (_a) {
                    var value = _a.value;
                    return _this.push(value);
                }
            },
            stack: {
                id: 'stack',
                name: _this.attrs.ww.name,
                value: _this.attrs.ww.value,
                decorator: _this.attrs.ww.decorator ? _this.attrs.ww.decorator : function (v) { return String(v); },
                onChange: function (evt) { return _this.delegate.onChange(evt); }
            }
        };
        return _this;
    }
    /**
     * update the list of available options displayed to the user.
     */
    SearchStack.prototype.update = function (list) {
        this
            .view
            .findById(this.values.search.id)
            .map(function (s) { return s.update(list); });
        return this;
    };
    /**
     * push a value onto the stack.
     */
    SearchStack.prototype.push = function (v) {
        this
            .view
            .findById(this.values.stack.id)
            .map(function (s) { return s.push(v); });
        return this;
    };
    SearchStack.prototype.value = function () {
        return this.values.stack.value.slice();
    };
    return SearchStack;
}(form_control_1.FormControlWidget));
exports.SearchStack = SearchStack;
//# sourceMappingURL=SearchStack.js.map