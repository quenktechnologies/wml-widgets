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
exports.ResultsMenu = exports.ItemSelectedEvent = exports.RESULTS_MENU = void 0;
var maybe_1 = require("@quenk/noni/lib/data/maybe");
var wml_1 = require("@quenk/wml");
var __1 = require("../../");
var util_1 = require("../../util");
var __2 = require("../");
var results_menu_1 = require("./wml/results-menu");
///classNames:begin
exports.RESULTS_MENU = 'ww-results-menu';
/**
 * ItemSelectedEvent
 */
var ItemSelectedEvent = /** @class */ (function (_super) {
    __extends(ItemSelectedEvent, _super);
    function ItemSelectedEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ItemSelectedEvent;
}(__2.Event));
exports.ItemSelectedEvent = ItemSelectedEvent;
/**
 * ResultsMenu used to display results in select styled controls.
 */
var ResultsMenu = /** @class */ (function (_super) {
    __extends(ResultsMenu, _super);
    function ResultsMenu() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new results_menu_1.Main(_this);
        _this.values = {
            wml: {
                id: 'menu'
            },
            tree: maybe_1.nothing(),
            results: (_this.attrs.ww && _this.attrs.ww.results) ?
                _this.attrs.ww.results : [],
            name: (_this.attrs.ww && _this.attrs.ww.name) ?
                _this.attrs.ww.name : '',
            className: util_1.concat(exports.RESULTS_MENU, __1.getClassName(_this.attrs)),
            block: (_this.attrs.ww && _this.attrs.ww.block) ?
                _this.attrs.ww.block : false,
            hidden: (_this.attrs.ww && _this.attrs.ww.hidden) ?
                _this.attrs.ww.hidden : false,
            item: {
                stringifier: (_this.attrs.ww && _this.attrs.ww.stringifier) ?
                    _this.attrs.ww.stringifier : function (v) { return Object.toString.call(v); },
                click: function (index) {
                    if (_this.attrs.ww && _this.attrs.ww.onSelect)
                        _this.attrs.ww.onSelect(new ItemSelectedEvent(_this.attrs.ww && _this.attrs.ww.name || '', _this.values.results[index]));
                },
                template: function (result, index) {
                    return (_this.attrs.ww && _this.attrs.ww.itemTemplate) ?
                        _this.attrs.ww.itemTemplate(result, index, _this) :
                        new results_menu_1.ItemTemplateView({
                            option: _this.values.item.stringifier(result)
                        });
                },
                noItemsTemplate: function () {
                    return (_this.attrs.ww && _this.attrs.ww.noItemsTemplate) ?
                        _this.attrs.ww.noItemsTemplate : new results_menu_1.NoItemsTemplateView({});
                },
            }
        };
        return _this;
    }
    ResultsMenu.prototype.open = function () {
        util_1.getById(this.view, this.values.wml.id)
            .map(function (m) { return m.show(); });
        this.values.hidden = false;
        if (this.attrs.ww && this.attrs.ww.onOpen)
            this.attrs.ww.onOpen();
        return this;
    };
    ResultsMenu.prototype.close = function () {
        util_1.getById(this.view, this.values.wml.id)
            .map(function (m) { return m.hide(); });
        this.values.hidden = true;
        if (this.attrs.ww && this.attrs.ww.onClose)
            this.attrs.ww.onClose();
        return this;
    };
    ResultsMenu.prototype.toggle = function () {
        util_1.getById(this.view, this.values.wml.id)
            .map(function (m) { return m.toggle(); });
        this.values.hidden = !this.values.hidden;
        if (this.values.hidden === true &&
            this.attrs.ww &&
            this.attrs.ww.onClose)
            this.attrs.ww.onClose();
        else if (this.values.hidden === false &&
            this.attrs.ww &&
            this.attrs.ww.onOpen)
            this.attrs.ww.onOpen();
        return this;
    };
    ResultsMenu.prototype.handleEvent = function (e) {
        if (this.values.tree.isJust()) {
            var root = this.values.tree.get();
            if (!document.body.contains(root))
                document.removeEventListener('click', this);
            if ((!root.contains(e.target)))
                this.close();
        }
    };
    /**
     * update will cause the menu to be displayed.
     */
    ResultsMenu.prototype.update = function (results) {
        this.values.results = results;
        this.values.hidden = false;
        this.view.invalidate();
        return this;
    };
    ResultsMenu.prototype.render = function () {
        this.values.tree = maybe_1.just(this.view.render());
        window.removeEventListener('click', this);
        window.addEventListener('click', this);
        return this.values.tree.get();
    };
    return ResultsMenu;
}(wml_1.Component));
exports.ResultsMenu = ResultsMenu;
//# sourceMappingURL=index.js.map