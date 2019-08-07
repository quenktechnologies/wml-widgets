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
var views = require("./wml/typeahead");
var util_1 = require("../../util");
var form_1 = require("../form");
var search_1 = require("../search");
exports.TermChangedEvent = search_1.TermChangedEvent;
var text_field_1 = require("../text-field");
exports.TextChangedEvent = text_field_1.TextChangedEvent;
var select_1 = require("../select");
exports.ItemSelectedEvent = select_1.ItemSelectedEvent;
///classNames:begin
exports.TYPEAHEAD = 'ww-typeahead';
/**
 * Typeahead provides an text input field that can suggests values
 * as the user types.
 */
var Typeahead = /** @class */ (function (_super) {
    __extends(Typeahead, _super);
    function Typeahead() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.values = {
            root: new select_1.RootSection(_this.attrs),
            control: new select_1.ControlSection(),
            messages: new select_1.MessagesSection(_this.attrs),
            label: new select_1.LabelSection(_this.attrs),
            search: new select_1.SearchSection(_this.attrs, function () { return _this.close(); }, function (e) {
                _this.close();
                var mSearch = util_1.getById(_this.view, _this.values.search.wml.id);
                if (mSearch.isJust()) {
                    var s = mSearch.get();
                    var str = (_this.values.search.stringifier) ?
                        _this.values.search.stringifier(e.value) : e.value + '';
                    s.set(str);
                    if (_this.attrs.ww && _this.attrs.ww.onChange)
                        _this.attrs.ww.onChange(new text_field_1.TextChangedEvent('' + _this.attrs.ww.name, str));
                }
            })
        };
        return _this;
    }
    Typeahead.prototype.open = function () {
        select_1.open(this.view, this.values.search.wml.id);
        return this;
    };
    Typeahead.prototype.close = function () {
        select_1.close(this.view, this.values.search.wml.id);
        return this;
    };
    Typeahead.prototype.setMessage = function (msg) {
        this.values.messages.text = msg;
        form_1.setMessage(this.view, this.values.messages.wml.id, msg);
        return this;
    };
    Typeahead.prototype.removeMessage = function () {
        this.values.messages.text = '';
        form_1.removeMessage(this.view, this.values.messages.wml.id);
        return this;
    };
    Typeahead.prototype.update = function (results) {
        select_1.update(this.view, this.values.search.wml.id, results);
        return this;
    };
    return Typeahead;
}(form_1.AbstractFormControl));
exports.Typeahead = Typeahead;
//# sourceMappingURL=index.js.map