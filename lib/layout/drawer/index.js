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
var views = require("./wml/drawer");
var wml_1 = require("@quenk/wml");
var hidden_1 = require("../../content/state/hidden");
var util_1 = require("../../util");
var __1 = require("../");
///classNames:begin
/**
 * DRAWER_LAYOUT
 */
exports.DRAWER_LAYOUT = 'ww-drawer-layout';
;
/**
 * DrawerLayout provides a 1 column application layout with a drawer that can
 * be shown or hidden upon requests.
 *
 * The drawer takes up most of the screen on mobile and about roughly 1/6 - 1/8
 * on a desktop (not fact checked yet).
 *
 *  Mobile:
 *  +---------------------------------------------------------------------+
 *  |                                            |                        |
 *  |                                            |                        |
 *  |                                            |                        |
 *  |   <drawer>                                 |                        |
 *  |                                            |                        |
 *  |                                            |                        |
 *  |                                            |                        |
 *  |                                            |                        |
 *  |                                            |                        |
 *  |                                            |                        |
 *  |                                            |                        |
 *  |                                            |                        |
 *  |                                            |                        |
 *  |                                            |                        |
 *  +---------------------------------------------------------------------+
 *
 *  Desktop:
 *  +---------------------------------------------------------------------+
 *  |             |                                                       |
 *  |             |                                                       |
 *  |             |                                                       |
 *  |             |                                                       |
 *  |             |                                                       |
 *  |   <drawer>  |                                                       |
 *  |             |                                                       |
 *  |             |                                                       |
 *  |             |                                                       |
 *  |             |                                                       |
 *  |             |                                                       |
 *  |             |                                                       |
 *  |             |                                                       |
 *  |             |                                                       |
 *  |             |                                                       |
 *  +---------------------------------------------------------------------+
 */
var DrawerLayout = /** @class */ (function (_super) {
    __extends(DrawerLayout, _super);
    function DrawerLayout() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.DrawerLayout(_this);
        /**
         * values is a hash of values used in the template.
         */
        _this.values = {
            root: {
                wml: {
                    id: 'layout'
                },
                id: _this.attrs.ww && _this.attrs.ww.id,
                className: util_1.concat(exports.DRAWER_LAYOUT, __1.LAYOUT, (_this.attrs.ww && _this.attrs.ww.className) ?
                    _this.attrs.ww.className : '')
            },
            drawer: {
                wml: {
                    id: 'drawer'
                },
                hidden: (_this.attrs.ww && _this.attrs.ww.drawerHidden) ?
                    _this.attrs.ww.drawerHidden : false,
                content: (_this.attrs.ww && _this.attrs.ww.drawerContent) ?
                    _this.attrs.ww.drawerContent : []
            },
            content: {
                id: 'content',
                value: _this.children
            }
        };
        return _this;
    }
    DrawerLayout.prototype.isHidden = function () {
        var m = getDrawer(this);
        if (m.isNothing())
            return true;
        return m.get().isHidden();
    };
    DrawerLayout.prototype.hide = function () {
        var m = getDrawer(this);
        if (m.isJust()) {
            m.get().hide();
            hidden_1.hide(this.view, this.values.root.wml.id);
        }
        return this;
    };
    DrawerLayout.prototype.show = function () {
        var m = getDrawer(this);
        if (m.isJust()) {
            m.get().show();
            hidden_1.show(this.view, this.values.root.wml.id);
        }
        return this;
    };
    DrawerLayout.prototype.toggle = function () {
        var m = getDrawer(this);
        if (m.isJust()) {
            m.get().toggle();
            hidden_1.toggle(this.view, this.values.root.wml.id);
        }
        return this;
    };
    DrawerLayout.prototype.setContent = function (c) {
        this.values.content.value = c;
        this.view.invalidate();
        return this;
    };
    DrawerLayout.prototype.removeContent = function () {
        this.values.content.value = [];
        return this;
    };
    return DrawerLayout;
}(wml_1.Component));
exports.DrawerLayout = DrawerLayout;
var getDrawer = function (dl) {
    var m = dl.view.findById(dl.values.drawer.wml.id);
    if (m.isNothing())
        util_1.warnMissing(dl.view, dl.values.drawer.wml.id);
    return m;
};
//# sourceMappingURL=index.js.map