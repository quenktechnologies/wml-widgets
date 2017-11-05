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
var view = require("./wml/tabs");
var afpl = require("afpl");
var util_1 = require("@package/self/common/util");
var TabClickedEvent_1 = require("./TabClickedEvent");
var wml_1 = require("@quenk/wml");
var _unknown = function (id) {
    return console.warn("Missing element with id " + id + ".");
};
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
        _this.view = new view.Tab(_this);
        _this.values = {
            id: {
                root: 'root',
                a: 'link'
            },
            class: {
                li: util_1.concat(names.TABS_TAB, _this.attrs.ww.active ? names.ACTIVE : '')
            },
            tab: {
                text: _this.attrs.ww.text
            }
        };
        _this.clicked = function (e) {
            e.preventDefault();
            _this
                .view
                .findById(_this.values.id.root)
                .chain(function (root) {
                var parent = root.parentNode;
                var us = parent.children;
                for (var i = 0; i < us.length; i++)
                    us[i].classList.remove(names.ACTIVE);
                return _this
                    .view
                    .findById(_this.values.id.root)
                    .map(function (el) { return el.classList.add(names.ACTIVE); })
                    .orJust(function () { return _unknown(_this.values.id.root); })
                    .chain(function () { return afpl.Maybe.fromAny(_this.attrs.ww.onClick); })
                    .map(function (f) {
                    return f(new TabClickedEvent_1.TabClickedEvent(_this.attrs.ww.name));
                });
            });
        };
        return _this;
    }
    /**
     * click this Tab
     */
    Tab.prototype.click = function () {
        var _this = this;
        this
            .view
            .findById(this.values.id.a)
            .cata(function () { return _unknown(_this.values.id.a); }, function (e) { return e.click(); });
    };
    return Tab;
}(wml_1.Component));
exports.Tab = Tab;
//# sourceMappingURL=Tab.js.map