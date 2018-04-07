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
var afpl = require("afpl");
var view = require("./wml/tab");
var active = require("../../content/state/active");
var util_1 = require("../../util");
var TabClickedEvent_1 = require("./TabClickedEvent");
var __1 = require("..");
var _1 = require(".");
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
        _this.view = new view.Main(_this);
        _this.values = {
            root: {
                id: 'root',
                class: util_1.concat(_1.TAB, _this.attrs.ww.active ? active.ACTIVE : ''),
            },
            a: {
                id: 'link',
                text: _this.attrs.ww.text,
                clicked: function (e) {
                    e.preventDefault();
                    _this
                        .view
                        .findById(_this.values.root.id)
                        .chain(function (root) {
                        var parent = root.parentNode;
                        var us = parent.children;
                        for (var i = 0; i < us.length; i++)
                            us[i].classList.remove(active.ACTIVE);
                        return _this
                            .view
                            .findById(_this.values.root.id)
                            .map(function (el) { return el.classList.add(active.ACTIVE); })
                            .chain(function () { return afpl.Maybe.fromAny(_this.attrs.ww.onClick); })
                            .map(function (f) {
                            return f(new TabClickedEvent_1.TabClickedEvent(_this.attrs.ww.name));
                        });
                    });
                }
            }
        };
        return _this;
    }
    /**
     * click this Tab
     */
    Tab.prototype.click = function () {
        var _this = this;
        return this
            .view
            .findById(this.values.a.id)
            .map(function (e) { return e.click(); })
            .map(function () { return _this; })
            .get();
    };
    return Tab;
}(__1.GenericControl));
exports.Tab = Tab;
//# sourceMappingURL=Tab.js.map