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
var views = require("./wml/tab-bar");
var wml_1 = require("@quenk/wml");
var active_1 = require("../../content/state/active");
var orientation_1 = require("../../content/orientation");
var util_1 = require("../../util");
var __1 = require("../../");
var __2 = require("../");
///classNames:begin
/**
 * TAB
 */
exports.TAB = 'ww-tab';
/**
 * TAB_BAR
 */
exports.TAB_BAR = 'ww-tab-bar';
/**
 * TabClickedEvent is fired when a user clicks on a tab.
 *
 * It contains information about the tab that was clicked.
 */
var TabClickedEvent = /** @class */ (function (_super) {
    __extends(TabClickedEvent, _super);
    function TabClickedEvent(name) {
        var _this = _super.call(this, name, name) || this;
        _this.name = name;
        return _this;
    }
    return TabClickedEvent;
}(__2.Event));
exports.TabClickedEvent = TabClickedEvent;
/**
 * Tab provides a single tab item.
 *
 * When a tab is clicked, it attempts to remove the active class from
 * it's siblings and apply it to itself. Therefore the sibling of a
 * tab should always be a Tab.
 */
var Tab = /** @class */ (function (_super) {
    __extends(Tab, _super);
    function Tab() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Tab(_this);
        _this.values = {
            root: {
                wml: {
                    id: 'root'
                },
                id: __1.getId(_this.attrs),
                className: util_1.concat(exports.TAB, __1.getClassName(_this.attrs), (_this.attrs.ww && _this.attrs.ww.active) ? active_1.ACTIVE : ''),
            },
            a: {
                wml: {
                    id: 'link'
                },
                content: (_this.attrs.ww && _this.attrs.ww.text) ?
                    [__1.text(_this.attrs.ww.text)] : _this.children,
                clicked: function (e) {
                    e.preventDefault();
                    var maybeRoot = util_1.getById(_this.view, _this.values.root.wml.id);
                    if (maybeRoot.isNothing())
                        return;
                    var root = maybeRoot.get();
                    var parent = root.parentNode;
                    var sibs = parent.children;
                    for (var i = 0; i < sibs.length; i++)
                        sibs[i].classList.remove(active_1.ACTIVE);
                    root.classList.add(active_1.ACTIVE);
                    if (_this.attrs.ww && _this.attrs.ww.onClick)
                        _this.attrs.ww.onClick(new TabClickedEvent("" + _this.attrs.ww.name));
                }
            }
        };
        return _this;
    }
    /**
     * click this Tab
     */
    Tab.prototype.click = function () {
        util_1.getById(this.view, this.values.root.wml.id)
            .map(function (e) { return e.click(); });
        return this;
    };
    return Tab;
}(__2.AbstractControl));
exports.Tab = Tab;
/**
 * TabBar acts as a parent container for a group of Tab.
 *
 * Use it to create a tabbed navigation or view for main layout,
 * sub views or forms etc.
 */
var TabBar = /** @class */ (function (_super) {
    __extends(TabBar, _super);
    function TabBar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.TabBar(_this);
        _this.values = {
            root: {
                id: __1.getId(_this.attrs),
                className: util_1.concat(exports.TAB_BAR, __1.getClassName(_this.attrs), (_this.attrs.ww && _this.attrs.ww.justify) ? orientation_1.JUSTIFIED : '')
            }
        };
        return _this;
    }
    return TabBar;
}(wml_1.Component));
exports.TabBar = TabBar;
//# sourceMappingURL=index.js.map