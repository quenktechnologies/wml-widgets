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
var maybe_1 = require("@quenk/noni/lib/data/maybe");
var wml_1 = require("@quenk/wml");
var util_1 = require("../../util");
var __1 = require("../");
var menu_1 = require("./wml/menu");
/**
 * ItemSelectedEvent
 */
var ItemSelectedEvent = /** @class */ (function (_super) {
    __extends(ItemSelectedEvent, _super);
    function ItemSelectedEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ItemSelectedEvent;
}(__1.Event));
exports.ItemSelectedEvent = ItemSelectedEvent;
/**
 * ResultsMenu used to display results in select styled controls.
 */
var ResultsMenu = /** @class */ (function (_super) {
    __extends(ResultsMenu, _super);
    function ResultsMenu() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new menu_1.Main(_this);
        _this.values = {
            wml: {
                id: 'menu'
            },
            tree: maybe_1.nothing(),
            results: [],
            name: (_this.attrs.ww && _this.attrs.ww.name) ?
                _this.attrs.ww.name : '',
            block: (_this.attrs.ww && _this.attrs.ww.block) ?
                _this.attrs.ww.block : false,
            hidden: true,
            item: {
                stringifier: (_this.attrs.ww && _this.attrs.ww.stringifier) ?
                    _this.attrs.ww.stringifier : function (v) { return Object.toString.call(v); },
                click: function (index) {
                    if (_this.attrs.ww && _this.attrs.ww.onSelect)
                        _this.attrs.ww.onSelect(new ItemSelectedEvent(_this.attrs.ww && _this.attrs.ww.name || '', _this.values.results[index]));
                },
                template: function () {
                    return (_this.attrs.ww && _this.attrs.ww.itemTemplate) ?
                        _this.attrs.ww.itemTemplate : menu_1.itemTemplate(_this);
                },
                noItemsTemplate: function () {
                    return (_this.attrs.ww && _this.attrs.ww.noItemsTemplate) ?
                        _this.attrs.ww.noItemsTemplate : menu_1.noItemsTemplate();
                },
            }
        };
        return _this;
    }
    ResultsMenu.prototype.open = function () {
        util_1.getById(this.view, this.values.wml.id)
            .map(function (m) { return m.show(); });
        this.values.hidden = false;
        return this;
    };
    ResultsMenu.prototype.close = function () {
        util_1.getById(this.view, this.values.wml.id)
            .map(function (m) { return m.hide(); });
        this.values.hidden = true;
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
        window.removeEventListener('click', this);
        window.addEventListener('click', this);
        this.values.hidden = false;
        this.view.invalidate();
        return this;
    };
    ResultsMenu.prototype.render = function () {
        this.values.tree = maybe_1.just(this.view.render());
        return this.values.tree.get();
    };
    return ResultsMenu;
}(wml_1.Component));
exports.ResultsMenu = ResultsMenu;
//# sourceMappingURL=index.js.map