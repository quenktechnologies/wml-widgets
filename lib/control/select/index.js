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
var views = require("./wml/select");
var maybe_1 = require("@quenk/noni/lib/data/maybe");
var orientation_1 = require("../../content/orientation");
var util_1 = require("../../util");
var feedback_1 = require("../feedback");
var form_1 = require("../form");
var __1 = require("../../");
var __2 = require("../");
var search_1 = require("../search");
exports.TermChangedEvent = search_1.TermChangedEvent;
exports.ItemSelectedEvent = search_1.ItemSelectedEvent;
///classNames:begin
exports.SELECT = 'ww-select';
/**
 * ItemChangedEvent
 */
var ItemChangedEvent = /** @class */ (function (_super) {
    __extends(ItemChangedEvent, _super);
    function ItemChangedEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ItemChangedEvent;
}(__2.Event));
exports.ItemChangedEvent = ItemChangedEvent;
/**
 * ItemUnsetEvent
 */
var ItemUnsetEvent = /** @class */ (function (_super) {
    __extends(ItemUnsetEvent, _super);
    function ItemUnsetEvent(name) {
        var _this = _super.call(this, name, undefined) || this;
        _this.name = name;
        return _this;
    }
    return ItemUnsetEvent;
}(__2.Event));
exports.ItemUnsetEvent = ItemUnsetEvent;
/**
 * RootSection
 */
var RootSection = /** @class */ (function () {
    function RootSection(attrs) {
        this.attrs = attrs;
        this.wml = { id: 'root' };
        this.id = __1.getId(this.attrs);
        this.className = util_1.concat(exports.SELECT, __1.getClassName(this.attrs), feedback_1.getValidityClassName(this.attrs), orientation_1.getBlockClassName(this.attrs));
    }
    return RootSection;
}());
exports.RootSection = RootSection;
/**
 * ControlSection
 */
var ControlSection = /** @class */ (function () {
    function ControlSection() {
        this.wml = { id: 'root' };
    }
    return ControlSection;
}());
exports.ControlSection = ControlSection;
/**
 * MessagesSection
 */
var MessagesSection = /** @class */ (function () {
    function MessagesSection(attrs) {
        this.attrs = attrs;
        this.wml = { id: 'message' };
        this.text = feedback_1.getMessage(this.attrs);
    }
    return MessagesSection;
}());
exports.MessagesSection = MessagesSection;
/**
 * LabelSection
 */
var LabelSection = /** @class */ (function () {
    function LabelSection(attrs) {
        this.attrs = attrs;
        this.id = __2.getName(this.attrs);
        this.text = form_1.getLabel(this.attrs);
    }
    return LabelSection;
}());
exports.LabelSection = LabelSection;
/**
 * InputSection
 */
var InputSection = /** @class */ (function () {
    function InputSection(attrs) {
        this.attrs = attrs;
        this.wml = { id: 'input' };
    }
    return InputSection;
}());
exports.InputSection = InputSection;
/**
 * SearchSection
 */
var SearchSection = /** @class */ (function () {
    function SearchSection(attrs, close, onSelect) {
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
        this.itemTemplate = (this.attrs.ww && this.attrs.ww.itemTemplate) ?
            this.attrs.ww.itemTemplate : undefined;
        this.noItemsTemplate = (this.attrs.ww && this.attrs.ww.noItemsTemplate) ?
            this.attrs.ww.noItemsTemplate : undefined;
        this.stringifier = (this.attrs.ww && this.attrs.ww.stringifier) ?
            this.attrs.ww.stringifier : undefined;
        this.onSearch = (this.attrs.ww && this.attrs.ww.onSearch) ?
            this.attrs.ww.onSearch : function () { };
    }
    return SearchSection;
}());
exports.SearchSection = SearchSection;
/**
 * Select provides an control for selecting an item from a
 * list.
 */
var Select = /** @class */ (function (_super) {
    __extends(Select, _super);
    function Select() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.values = {
            root: new RootSection(_this.attrs),
            control: new ControlSection(),
            messages: new MessagesSection(_this.attrs),
            label: new LabelSection(_this.attrs),
            input: new InputSection(_this.attrs),
            search: new SearchSection(_this.attrs, function () { return _this.close(); }, function (e) {
                _this.close();
                _this.values.tag.value = maybe_1.just(e.value);
                if (_this.attrs.ww && _this.attrs.ww.onChange)
                    _this.attrs.ww.onChange(new ItemChangedEvent('' + _this.attrs.ww.name, e.value));
                _this.view.invalidate();
            }),
            tag: {
                className: feedback_1.getValidityClassName(_this.attrs),
                value: ((_this.attrs.ww &&
                    (_this.attrs.ww.value != undefined)) ?
                    maybe_1.just(_this.attrs.ww.value) : maybe_1.nothing()),
                isSet: function () { return _this.values.tag.value.isJust(); },
                getText: function () {
                    if (_this.attrs.ww && _this.attrs.ww.stringifier)
                        return _this.attrs.ww.stringifier(_this.values.tag.value.get());
                    return '';
                },
                dismiss: function () {
                    _this.values.tag.value = maybe_1.nothing();
                    if (_this.attrs.ww && _this.attrs.ww.onUnset)
                        _this.attrs.ww.onUnset(new ItemUnsetEvent(_this.attrs.ww.name + ''));
                    _this.view.invalidate();
                }
            }
        };
        return _this;
    }
    Select.prototype.open = function () {
        exports.open(this.view, this.values.search.wml.id);
        return this;
    };
    Select.prototype.close = function () {
        exports.close(this.view, this.values.search.wml.id);
        return this;
    };
    Select.prototype.setMessage = function (msg) {
        this.values.messages.text = msg;
        form_1.setMessage(this.view, this.values.messages.wml.id, msg);
        return this;
    };
    Select.prototype.removeMessage = function () {
        this.values.messages.text = '';
        form_1.removeMessage(this.view, this.values.messages.wml.id);
        return this;
    };
    /**
     * update the Select with new item options to
     * present to the user.
     */
    Select.prototype.update = function (results) {
        exports.update(this.view, this.values.search.wml.id, results);
        return this;
    };
    return Select;
}(form_1.AbstractFormControl));
exports.Select = Select;
/**
 * open helper.
 *
 * Invokes the open method on the Search widget.
 */
exports.open = function (view, id) {
    util_1.getById(view, id)
        .map(function (m) { return m.open(); });
};
/**
 * close helper.
 *
 * Invokes the close method on the Search widget.
 */
exports.close = function (view, id) {
    util_1.getById(view, id)
        .map(function (m) { return m.close(); });
};
/**
 * update helper.
 *
 * Invokes the update method on the Search widget.
 */
exports.update = function (view, id, results) {
    var mSearch = util_1.getById(view, id);
    if (mSearch.isJust())
        mSearch.get().update(results);
};
//# sourceMappingURL=index.js.map