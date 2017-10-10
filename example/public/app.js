(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./wml/app");
var App = /** @class */ (function () {
    function App() {
        /**
         * values used within the template.
         */
        this.values = {
            id: {
                layout: 'layout'
            }
        };
        /**
         * view is the current application view.
         */
        this.view = new app_1.Main(this);
    }
    /**
     * run the application.
     */
    App.prototype.run = function () {
        var root = document.getElementById('app');
        while (root.lastChild)
            root.removeChild(root.lastChild);
        root.appendChild(this.view.render());
        this.layout = this.view.findById(this.values.id.layout);
    };
    App.main = function () {
        return new App();
    };
    return App;
}());
exports.App = App;
var w = window;
w.app = App.main();
w.app.run();

},{"./wml/app":2}],2:[function(require,module,exports){
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
var wml_runtime_1 = require("@quenk/wml-runtime");
var Drawer_1 = require("@package/self/layout/drawer/Drawer");
var ActionBar_1 = require("@package/self/app/action-bar/ActionBar");
var MenuButton_1 = require("@package/self/app/menu-button/MenuButton");
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(context) {
        var _this = _super.call(this, context) || this;
        var view = _this;
        _this.template = function ($$view, $$ctx) {
            return wml_runtime_1.widget(Drawer_1.Drawer, {
                html: {},
                wml: {
                    'id': $$ctx.values.id.layout
                }
            }, [wml_runtime_1.widget(ActionBar_1.ActionBar, {
                    html: {},
                    wml: {}
                }, [wml_runtime_1.widget(MenuButton_1.MenuButton, {
                        html: {},
                        wml: {},
                        ww: {
                            'onClick': function function_literal_1() {
                                return $$ctx.view.findById($$ctx.values.id.layout).map(function function_literal_2(d) {
                                    return d.toggleDrawer();
                                });
                            }
                        }
                    }, [], $$view)], $$view)], $$view);
        };
        return _this;
    }
    return Main;
}(wml_runtime_1.AppView));
exports.Main = Main;

},{"@package/self/app/action-bar/ActionBar":3,"@package/self/app/menu-button/MenuButton":5,"@package/self/layout/drawer/Drawer":12,"@quenk/wml-runtime":14}],3:[function(require,module,exports){
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
var util = require("@package/self/common/util");
var content_1 = require("@package/self/content");
var action_bar_1 = require("./wml/action_bar");
/**
 * ActionBar provides a bar across the screen that can be
 * used as a toolbar, navigation menu or something simillar.
 */
var ActionBar = /** @class */ (function (_super) {
    __extends(ActionBar, _super);
    function ActionBar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new action_bar_1.Main(_this);
        _this.values = {
            id: {
                content: 'content'
            },
            class: {
                root: util.combine([names.ACTION_BAR, names.FIXED_PUSHABLE]),
                content: names.ACTION_BAR_CONTENT
            }
        };
        return _this;
    }
    return ActionBar;
}(content_1.Group));
exports.ActionBar = ActionBar;

},{"./wml/action_bar":4,"@package/self/common/names":7,"@package/self/common/util":8,"@package/self/content":9}],4:[function(require,module,exports){
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
var wml_runtime_1 = require("@quenk/wml-runtime");
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(context) {
        var _this = _super.call(this, context) || this;
        var view = _this;
        _this.template = function ($$view, $$ctx) {
            return wml_runtime_1.node('div', { html: { 'class': $$ctx.values.class.root }, wml: {} }, [wml_runtime_1.node('div', { html: { 'class': $$ctx.values.class.content }, wml: { 'id': $$ctx.values.id.content } }, [wml_runtime_1.domify($$ctx.children)], $$view)], $$view);
        };
        return _this;
    }
    return Main;
}(wml_runtime_1.AppView));
exports.Main = Main;

},{"@quenk/wml-runtime":14}],5:[function(require,module,exports){
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
var wml_runtime_1 = require("@quenk/wml-runtime");
var menu_button_1 = require("./wml/menu_button");
/**
 * MenuButton provides a 'hamburger' menu button.
 */
var MenuButton = /** @class */ (function (_super) {
    __extends(MenuButton, _super);
    function MenuButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new menu_button_1.Main(_this);
        _this.values = {
            class: {
                button: names.MENU_BUTTON
            }
        };
        return _this;
    }
    return MenuButton;
}(wml_runtime_1.Component));
exports.MenuButton = MenuButton;

},{"./wml/menu_button":6,"@package/self/common/names":7,"@quenk/wml-runtime":14}],6:[function(require,module,exports){
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
var wml_runtime_1 = require("@quenk/wml-runtime");
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(context) {
        var _this = _super.call(this, context) || this;
        var view = _this;
        _this.template = function ($$view, $$ctx) {
            return wml_runtime_1.node('button', { html: { 'class': $$ctx.values.class.button, 'onclick': wml_runtime_1.read('ww:onClick', $$ctx.attrs) }, wml: {} }, [wml_runtime_1.node('span', { html: { 'class': "" }, wml: {} }, [], $$view), wml_runtime_1.node('span', { html: { 'class': "" }, wml: {} }, [], $$view), wml_runtime_1.node('span', { html: { 'class': "" }, wml: {} }, [], $$view)], $$view);
        };
        return _this;
    }
    return Main;
}(wml_runtime_1.AppView));
exports.Main = Main;

},{"@quenk/wml-runtime":14}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * HIDDEN indicates an element should be hidden from sight.
 */
exports.HIDDEN = '-hidden';
/**
 * DISABLED indicates an element should appear to be inaccesible
 */
exports.DISABLED = '-disabled';
/**
 * ON indicates an 'on' state.
 */
exports.ON = '-on';
/**
 * OFF indicates an 'off' state.
 */
exports.OFF = '-off';
/**
 * PUSHABLE is used by other styles to move an element around.
 */
exports.PUSHABLE = '-pushable';
/**
 * FIXED_PUSHABLE is like PUSHABLE but used for fixed elements.
 */
exports.FIXED_PUSHABLE = '-fixed-pushable';
exports.SPACED = '-spaced';
exports.DEFAULT = '-default';
exports.PRIMARY = '-primary';
exports.SUCCESS = '-success';
exports.INFO = '-info';
exports.WARNING = '-warning';
exports.DANGER = '-danger';
exports.LARGE = '-large';
exports.SMALL = '-small';
exports.EXTRA_SMALL = '-extra-small';
exports.ACTIVE = 'active'; //@todo: refactor to flag syntax
exports.DRAWER = 'ww-drawer-layout';
exports.ASIDE = 'ww-drawer';
exports.ASIDE_CONTENT = 'ww-drawer__content';
exports.ASIDE_PUSHABLE = '-drawer-pushable';
exports.ASIDE_PUSHABLE_FIXED = '-drawer-pushable-fixed';
/**
 * ACTION_BAR classes for the ActionBar root.
 */
exports.ACTION_BAR = 'ww-action-bar';
/**
 * ACTION_BAR_CONTENT classes for the ActionBar wrapped content.
 */
exports.ACTION_BAR_CONTENT = 'ww-action-bar__content';
exports.MAIN_VIEW = 'ww-main-view';
/**
 * MENU_BUTTON clasess for the MenuButton.
 */
exports.MENU_BUTTON = 'ww-menu-button';
exports.BUTTON = 'ww-button';
exports.BUTTON_GROUP = 'ww-button-group';
//@todo: refactor this to be inline with other class names
exports.GRID_CONTAINER = 'container-fluid';
exports.GRID_COLUMN = '';
exports.GRID_ROW = 'row';
exports.PANEL = 'ww-panel';
exports.PANEL_HEADER = 'ww-panel__header';
exports.PANEL_BODY = 'ww-panel__body';
exports.PANEL_FOOTER = 'ww-panel__footer';
exports.MODAL = 'ww-modal';
exports.MODAL_DIALOG = 'ww-modal__dialog';
exports.MODAL_CONTENT = 'ww-modal__content';
exports.MODAL_HEADER = 'ww-modal__header';
exports.MODAL_BODY = 'ww-modal__body';
exports.MODAL_FOOTER = 'ww-moadl__footer';
exports.FORM_GROUP = 'form-group';
exports.CONTROL_LABEL = 'control-label';
exports.INPUT = 'form-control';
exports.TEXTAREA = 'form-control';
exports.SELECT = 'form-control';
exports.TABS = 'nav nav-tabs'; //@todo un-bootstrap
exports.SWITCH = 'ww-switch';
exports.SWITCH_SLIDER = 'ww-switch__slider';
exports.TABLE = 'table'; //@todo un-bootstrap
exports.TREE_NAV = 'tree-nav';
exports.TREE_NAV_LIST = 'tree-nav__list';
exports.TREE_NAV_LIST_ITEM = 'tree-nav__item';
exports.BREAD_CRUMBS = 'breadcrumb'; //@todo un-bootstrap
exports.BREAD_CRUMBS_CRUMB = exports.BREAD_CRUMBS + "__crumb";
exports.LIST = 'ww-list';
exports.LIST_ITEM = 'ww-list__item';
exports.SEARCH_INPUT = 'ww-search__input';
exports.FINDER = 'ww-finder';

},{}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * combine the members of an array into one string.
 */
exports.combine = function (str, joiner) {
    if (joiner === void 0) { joiner = ' '; }
    return str.filter(function (s) { return ((s != null) || s != ''); }).join(joiner);
};
/**
 * concat joins various strings together to form an html class attribute value.
 *
 * Removes empty strings, null and undefined values.
 */
exports.concat = function () {
    var str = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        str[_i] = arguments[_i];
    }
    return str.filter(function (s) { return ((s != null) || s != ''); }).join(' ');
};
/**
 * noop
 */
exports.noop = function () { };
/**
 * replaceContent
 */
exports.replaceContent = function (r, node) {
    while (node.lastChild)
        node.removeChild(node.lastChild);
    node.appendChild(r.render());
};

},{}],9:[function(require,module,exports){
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
var wml_runtime_1 = require("@quenk/wml-runtime");
/**
 * Group is an abstract class providing an api for
 * widgets whose primary purpose is displaying content.
 */
var Group = /** @class */ (function (_super) {
    __extends(Group, _super);
    function Group() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * setContent changes the content value.
     */
    Group.prototype.setContent = function (content) {
        this.content = content;
        this.view.invalidate();
        return this;
    };
    /**
     * removeContent removes existing content.
     */
    Group.prototype.removeContent = function () {
        this.content = null;
        return this;
    };
    return Group;
}(wml_runtime_1.Component));
exports.Group = Group;

},{"@quenk/wml-runtime":14}],10:[function(require,module,exports){
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
var content = require("@package/self/content");
var names = require("@package/self/common/names");
var aside_1 = require("./wml/aside");
/**
 * Aside provides a widget for displaying navigation and other sidebar content.
 *
 * It's api allows for toggling between hidden and shown states as well as querying the
 * current state.
 *
 * This widget's style intentionally gives it a high z-index so that it appears in-front
 * of other content. Adjust the respective style variables to change.
 */
var Aside = /** @class */ (function (_super) {
    __extends(Aside, _super);
    function Aside() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * values is a hash of values used in the template
         */
        _this.values = {
            id: {
                root: 'aside',
            },
            class: {
                root: names.ASIDE,
                content: names.ASIDE_CONTENT
            },
            attrs: {
                content: 'ww:content'
            }
        };
        _this.view = new aside_1.Main(_this);
        return _this;
    }
    Aside.prototype._getDrawerDOM = function (f) {
        return this.view.findById(this.values.id.root).cata(function () { return null; }, f);
    };
    /**
     * visible queries whether the Drawer is visible or not.
     */
    Aside.prototype.visible = function () {
        return !this._getDrawerDOM(function (e) { return e.classList.contains(names.HIDDEN); });
    };
    /**
     * hide the drawer.
     */
    Aside.prototype.hide = function () {
        if (this.visible())
            this._getDrawerDOM(function (e) { return e.classList.add(names.HIDDEN); });
    };
    /**
     * showDrawer shows the drawer
     */
    Aside.prototype.show = function () {
        if (!this.visible())
            this._getDrawerDOM(function (e) { return e.classList.remove(names.HIDDEN); });
    };
    /**
     * toggle the visibility of this Drawer
     */
    Aside.prototype.toggle = function () {
        this._getDrawerDOM(function (e) { return e.classList.toggle(names.HIDDEN); });
    };
    return Aside;
}(content.Group));
exports.Aside = Aside;

},{"./wml/aside":11,"@package/self/common/names":7,"@package/self/content":9}],11:[function(require,module,exports){
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
var wml_runtime_1 = require("@quenk/wml-runtime");
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(context) {
        var _this = _super.call(this, context) || this;
        var view = _this;
        _this.template = function ($$view, $$ctx) {
            return wml_runtime_1.node('div', { html: { 'class': $$ctx.values.class.root }, wml: { 'id': $$ctx.values.id.root } }, [wml_runtime_1.node('div', { html: { 'class': $$ctx.values.class.content }, wml: {} }, [wml_runtime_1.ifE(wml_runtime_1.read('ww:content', $$ctx.attrs), function if0() { return wml_runtime_1.domify(wml_runtime_1.read('ww:content', $$ctx.attrs).render()); }, function else_clause0() { return wml_runtime_1.domify($$ctx.children); })], $$view)], $$view);
        };
        return _this;
    }
    return Main;
}(wml_runtime_1.AppView));
exports.Main = Main;

},{"@quenk/wml-runtime":14}],12:[function(require,module,exports){
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
var content = require("@package/self/content");
var names = require("@package/self/common/names");
var drawer_1 = require("./wml/drawer");
;
/**
 * Drawer provides a 2 column application layout with the first typically used as navaigation
 * and the second main application content.
 *
 * ```wml
 *
 *  <Drawer
 *   wml:id="layout"
 *   content={{this.getContent()}} />
 *
 * ```
 */
var Drawer = /** @class */ (function (_super) {
    __extends(Drawer, _super);
    function Drawer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new drawer_1.Main(_this);
        /**
         * values is a hash of values used in the template.
         */
        _this.values = {
            id: {
                root: 'content',
                drawer: 'drawer'
            },
            class: {
                root: names.DRAWER,
            },
            attrs: {
                DRAWER: 'ww:drawer',
                CONTENT: 'ww:content'
            }
        };
        return _this;
    }
    Drawer.prototype._getAside = function (f) {
        return this.view.findById(this.values.id.drawer).cata(function () { return null; }, f);
    };
    Drawer.prototype._combine = function (classes) {
        return classes.join(' ');
    };
    /**
     * drawerVisible queries whether the Aside is visible or not.
     */
    Drawer.prototype.drawerVisible = function () {
        return this._getAside(function (a) { return a.visible(); });
    };
    /**
     * hideDrawer hides the drawer.
     */
    Drawer.prototype.hideDrawer = function () {
        return this._getAside(function (a) { return a.hide(); });
    };
    /**
     * showDrawer shows the drawer
     */
    Drawer.prototype.showDrawer = function () {
        return this._getAside(function (a) { return a.show(); });
    };
    /**
     * toggle the visibility of the Aside.
     */
    Drawer.prototype.toggleDrawer = function () {
        return this._getAside(function (a) { return a.toggle(); });
    };
    return Drawer;
}(content.Group));
exports.Drawer = Drawer;

},{"./wml/drawer":13,"@package/self/common/names":7,"@package/self/content":9}],13:[function(require,module,exports){
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
var wml_runtime_1 = require("@quenk/wml-runtime");
var Aside_1 = require("@package/self/layout/aside/Aside");
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(context) {
        var _this = _super.call(this, context) || this;
        var view = _this;
        _this.template = function ($$view, $$ctx) {
            return wml_runtime_1.node('div', { html: { 'class': $$ctx.values.class.root }, wml: { 'id': $$ctx.values.id.root } }, [wml_runtime_1.widget(Aside_1.Aside, { html: {}, wml: { 'id': $$ctx.values.id.drawer }, ww: { 'content': wml_runtime_1.read('ww:drawer', $$ctx.attrs) } }, [], $$view), wml_runtime_1.ifE($$ctx.content, function if1() { return wml_runtime_1.domify($$ctx.content); }, function elseif0() { return wml_runtime_1.ifE(wml_runtime_1.read('ww:content', $$ctx.attrs), function if0() { return wml_runtime_1.domify($$ctx.attrs.ww.content.render()); }, function else_clause1() { return wml_runtime_1.domify($$ctx.children); }); })], $$view);
        };
        return _this;
    }
    return Main;
}(wml_runtime_1.AppView));
exports.Main = Main;

},{"@package/self/layout/aside/Aside":10,"@quenk/wml-runtime":14}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var property = require("property-seek");
var Maybe_1 = require("afpl/lib/monad/Maybe");
;
/**
 * Component is an abstract Widget implementation
 * that can be used instead of manually implementing the whole interface.
 *
 */
var Component = (function () {
    /**
     * attrs is the attributes this Component excepts.
     */
    /**
     * children is an array of content passed to this Component.
     */
    function Component(attrs, children) {
        this.attrs = attrs;
        this.children = children;
    }
    Component.prototype.rendered = function () { };
    Component.prototype.removed = function () { };
    Component.prototype.render = function () { return this.view.render(); };
    return Component;
}());
exports.Component = Component;
;
/**
 * read a value form an object.
 *
 * This is an alternative to regular property access that will throw exceptions
 * if any of the values in the part are null.
 * @param {string} path - The path to look up on the object.
 * @param {object} o - The object
 * @param {A} [defaultValue] - This value is returned if the value is not set.
 * @private
 */
exports.read = function (path, o, defaultValue) {
    var ret = property.get(path.split(':').join('.'), o);
    return (ret != null) ? ret : defaultValue;
};
/**
 * @private
 */
var adopt = function (child, e) {
    switch (typeof child) {
        case 'string':
        case 'number':
        case 'boolean':
            e.appendChild(document.createTextNode('' + child));
        case 'object':
            e.appendChild(child);
            break;
        default:
            throw new TypeError("Can not adopt child " + child + " of type " + typeof child);
    }
};
/**
 * @private
 */
exports.box = function () {
    var content = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        content[_i] = arguments[_i];
    }
    var frag = document.createDocumentFragment();
    content.forEach(function (c) { return frag.appendChild(c); });
    return frag;
};
/**
 * @private
 */
exports.domify = function (a) {
    if (a instanceof Array) {
        return exports.box.apply(null, a.map(exports.domify));
    }
    else if ((typeof a === 'string') ||
        (typeof a === 'number') ||
        (typeof a === 'boolean')) {
        return exports.text(a);
    }
    else if (a instanceof Node) {
        return a;
    }
    else if (a == null) {
        return _empty;
    }
    else {
        throw new TypeError("Can not use '" + a + "'(typeof " + typeof a + ") as Content!");
    }
};
/**
 * @private
 */
var _empty = document.createDocumentFragment();
/**
 * @private
 */
exports.empty = function () { return _empty; };
/**
 * text creates a new TextNode.
 * @private
 */
exports.text = function (value) {
    return document.createTextNode('' + value);
};
/**
 * node is called to create a regular DOM node
 * @private
 */
exports.node = function (tag, attributes, children, view) {
    var e = document.createElement(tag);
    if (typeof attributes['html'] === 'object')
        Object.keys(attributes['html']).forEach(function (key) {
            var value = attributes['html'][key];
            if (typeof value === 'function') {
                e[key] = value;
            }
            else if (typeof value === 'string') {
                if (value !== '')
                    e.setAttribute(key, value);
            }
            else if (typeof value === 'boolean') {
                e.setAttribute(key, "" + value);
            }
        });
    children.forEach(function (c) { return adopt(c, e); });
    var id = attributes['wml'].id;
    var group = attributes.wml.group;
    if (id)
        view.register(id, e);
    if (group)
        view.registerGroup(group, e);
    return e;
};
/**
 * widget creates and renders a new wml widget instance.
 * @param {function} Construtor
 * @param {object} attributes
 * @param {array<string|number|Widget>} children
 * @param {View} view
 * @private
 * @return {Widget}
 */
exports.widget = function (Constructor, attributes, children, view) {
    var childs = [];
    var w;
    children.forEach(function (child) { return (child instanceof Array) ?
        childs.push.apply(childs, child) : childs.push(child); });
    w = new Constructor(attributes, childs);
    var id = attributes.wml.id;
    var group = attributes.wml.group;
    if (id)
        view.register(id, w);
    if (group)
        view.registerGroup(group, w);
    view.widgets.push(w);
    return w.render();
};
/**
 * ifE provides an if then expression
 * @private
 */
exports.ifE = function (predicate, positive, negative) {
    return (predicate) ? positive() : negative();
};
/**
 * forE provides a for expression
 * @private
 */
exports.forE = function (collection, cb, cb2) {
    var frag = document.createDocumentFragment();
    if (collection instanceof Array) {
        if (collection.length > 0)
            collection.forEach(function (v, k, a) { return frag.appendChild(cb(v, k, a)); });
        else
            frag.appendChild(cb2());
    }
    else if (typeof collection === 'object') {
        var l = Object.keys(collection);
        if (l.length > 0)
            l.forEach(function (k) { return frag.appendChild(cb(collection[k], k, collection)); });
        else
            frag.appendChild(cb2());
    }
    return frag;
};
/**
 * switchE simulates a switch statement
 * @param {string|number|boolean} value
 * @param {object} cases
 * @private
 */
exports.switchE = function (value, cases) {
    var result = cases[value];
    var defaul = cases['default'];
    if (result)
        return result;
    if (defaul)
        return defaul;
};
/**
 * AppView is the concrete implementation of a View.
 *
 * @property {<C>} context - The context the view is rendered in.
 */
var AppView = (function () {
    function AppView(context) {
        this.context = context;
        this.ids = {};
        this.groups = {};
        this.widgets = [];
    }
    AppView.prototype.register = function (id, w) {
        if (this.ids.hasOwnProperty(id))
            throw new Error("Duplicate id '" + id + "' detected!");
        this.ids[id] = w;
        return this;
    };
    AppView.prototype.registerGroup = function (group, e) {
        this.groups[group] = this.groups[group] || [];
        this.groups[group].push(e);
        return this;
    };
    AppView.prototype.findById = function (id) {
        return Maybe_1.Maybe.fromAny(this.ids[id]);
    };
    AppView.prototype.findGroupByName = function (name) {
        return Maybe_1.Maybe.fromArray(this.groups[name]);
    };
    AppView.prototype.invalidate = function () {
        var childs;
        var realFirstChild;
        var realFirstChildIndex;
        var tree = (this._fragRoot) ? this._fragRoot : this.tree;
        var parent = tree.parentNode;
        if (tree == null)
            throw new ReferenceError('Cannot invalidate a view that has not been rendered!');
        if (tree.parentNode == null)
            throw new ReferenceError('Attempt to invalidate a view that has not been inserted to DOM!');
        childs = tree.parentNode.children;
        //for some reason the reference stored does not have the correct parent node.
        //we do this to get a 'live' version of the node.
        for (var i = 0; i < childs.length; i++)
            if (childs[i] === tree) {
                realFirstChild = childs[i];
                realFirstChildIndex = i;
            }
        parent.replaceChild(this.render(), realFirstChild);
    };
    AppView.prototype.render = function () {
        this.ids = {};
        this.widgets.forEach(function (w) { return w.removed(); });
        this.widgets = [];
        this._fragRoot = null;
        this.tree = this.template(this, this.context);
        this.ids['root'] = (this.ids['root']) ? this.ids['root'] : this.tree;
        if (this.tree.nodeName === (document.createDocumentFragment()).nodeName)
            this._fragRoot = this.tree.firstChild;
        this.widgets.forEach(function (w) { return w.rendered(); });
        return this.tree;
    };
    return AppView;
}());
exports.AppView = AppView;

},{"afpl/lib/monad/Maybe":16,"property-seek":17}],15:[function(require,module,exports){
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
/**
 * left wraps a value on the left side.
 */
exports.left = function (a) { return new Left(a); };
/**
 * right wraps a value on the right side.
 */
exports.right = function (b) { return new Right(b); };
/**
 * fromBoolean constructs an Either using a boolean value.
 */
exports.fromBoolean = function (b) {
    return b ? exports.right(true) : exports.left(false);
};
/**
 * Either monad implementation
 */
var Either = (function () {
    function Either() {
    }
    Either.prototype.of = function (v) {
        return new Right(v);
    };
    Either.left = exports.left;
    Either.right = exports.right;
    Either.fromBoolean = exports.fromBoolean;
    return Either;
}());
exports.Either = Either;
var Left = (function (_super) {
    __extends(Left, _super);
    function Left(l) {
        var _this = _super.call(this) || this;
        _this.l = l;
        return _this;
    }
    Left.prototype.map = function (_) {
        return new Left(this.l);
    };
    Left.prototype.mapLeft = function (f) {
        return new Left(f(this.l));
    };
    Left.prototype.bimap = function (f, _) {
        return exports.left(f(this.l));
    };
    Left.prototype.chain = function (_) {
        return new Left(this.l);
    };
    Left.prototype.orElse = function (f) {
        return f(this.l);
    };
    Left.prototype.orRight = function (f) {
        return new Right(f(this.l));
    };
    Left.prototype.ap = function (_) {
        return new Left(this.l);
    };
    Left.prototype.takeLeft = function () {
        return this.l;
    };
    Left.prototype.takeRight = function () {
        throw new TypeError("Not right!");
    };
    Left.prototype.cata = function (f, _) {
        return f(this.l);
    };
    return Left;
}(Either));
exports.Left = Left;
var Right = (function (_super) {
    __extends(Right, _super);
    function Right(r) {
        var _this = _super.call(this) || this;
        _this.r = r;
        return _this;
    }
    Right.prototype.map = function (f) {
        return new Right(f(this.r));
    };
    Right.prototype.mapLeft = function (_) {
        return new Right(this.r);
    };
    Right.prototype.bimap = function (_, g) {
        return exports.right(g(this.r));
    };
    Right.prototype.chain = function (f) {
        return f(this.r);
    };
    /**
     * orElse returns the result of f if the Either is left.
     */
    Right.prototype.orElse = function (_) {
        return this;
    };
    Right.prototype.orRight = function (_) {
        return this;
    };
    /**
     * ap
     */
    Right.prototype.ap = function (e) {
        var _this = this;
        return e.map(function (f) { return f(_this.r); });
    };
    /**
      * takeLeft extracts the left value of an Either, throwing an error if the Either is right.
      */
    Right.prototype.takeLeft = function () {
        throw new TypeError("Not left!");
    };
    Right.prototype.takeRight = function () {
        return this.r;
    };
    /**
     * cata
     */
    Right.prototype.cata = function (_, g) {
        return g(this.r);
    };
    return Right;
}(Either));
exports.Right = Right;

},{}],16:[function(require,module,exports){
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
var Either_1 = require("./Either");
/**
 * just wraps a value in a Just
 */
exports.just = function (a) { return new Just(a); };
;
/**
 * nothing constructs nothing
 */
exports.nothing = function () { return new Nothing(); };
/**
 * fromAny constructs a Maybe from a value that may be null.
 */
exports.fromAny = function (a) { return a == null ? exports.nothing() : exports.just(a); };
/**
 * fromArray checks an array to see if it's empty (or full of nulls)
 * and returns a Maybe.
 */
exports.fromArray = function (a) {
    return ((a.length === 0) || (a.reduce(function (c, v) { return (v == null) ? c + 1 : c; }, 0) === a.length)) ?
        exports.nothing() : exports.just(a);
};
/**
 * fromOBject uses Object.keys to turn see if an object has any own properties.
 */
exports.fromObject = function (o) {
    return Object.keys(o).length === 0 ? exports.nothing() : exports.just(o);
};
/**
 * fromString constructs nothing if the string is empty or just otherwise.
 */
exports.fromString = function (s) {
    return (s === '') ? exports.nothing() : exports.just(s);
};
/**
 * fromBoolean constructs nothing if b is false, just otherwise
 */
exports.fromBoolean = function (b) {
    return (b === false) ? exports.nothing() : exports.just(b);
};
/**
 * fromNumber constructs nothing if n is 0 just otherwise.
 */
exports.fromNumber = function (n) {
    return (n === 0) ? exports.nothing() : exports.just(n);
};
/**
 * Maybe
 */
var Maybe = (function () {
    function Maybe() {
    }
    Maybe.prototype.of = function (a) {
        return new Just(a);
    };
    Maybe.just = exports.just;
    Maybe.nothing = exports.nothing;
    Maybe.fromAny = exports.fromAny;
    Maybe.fromObject = exports.fromObject;
    Maybe.fromArray = exports.fromArray;
    Maybe.fromString = exports.fromString;
    Maybe.fromBoolean = exports.fromBoolean;
    Maybe.fromNumber = exports.fromNumber;
    return Maybe;
}());
exports.Maybe = Maybe;
/**
 * Nothing
 */
var Nothing = (function (_super) {
    __extends(Nothing, _super);
    function Nothing() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Nothing.prototype.map = function (_) {
        return new Nothing();
    };
    Nothing.prototype.chain = function (_) {
        return new Nothing();
    };
    Nothing.prototype.get = function () {
        throw new TypeError('Cannot get anything from Nothing!');
    };
    Nothing.prototype.orElse = function (f) {
        return f();
    };
    /**
     * orJust will turn Nothing into Just, wrapping the value specified.
     */
    Nothing.prototype.orJust = function (f) {
        return exports.just(f());
    };
    /**
     * cata applies the corresponding function to the Maybe
     */
    Nothing.prototype.cata = function (f, _g) {
        return f();
    };
    Nothing.prototype.toEither = function () {
        return Either_1.left(undefined);
    };
    return Nothing;
}(Maybe));
exports.Nothing = Nothing;
/**
 * Just
 */
var Just = (function (_super) {
    __extends(Just, _super);
    function Just(a) {
        var _this = _super.call(this) || this;
        _this.a = a;
        return _this;
    }
    Just.prototype.map = function (f) {
        return new Just(f(this.a));
    };
    Just.prototype.join = function () {
        return this.a;
    };
    Just.prototype.chain = function (f) {
        return f(this.a);
    };
    Just.prototype.get = function () {
        return this.a;
    };
    Just.prototype.orElse = function (_f) {
        return this;
    };
    Just.prototype.orJust = function (_f) {
        return this;
    };
    Just.prototype.cata = function (_f, g) {
        return g(this.a);
    };
    Just.prototype.toEither = function () {
        return Either_1.right(this.a);
    };
    return Just;
}(Maybe));
exports.Just = Just;

},{"./Either":15}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function boundary_to_dot(value) {
    return value.split('][').join('.').split('[').join('.');
}
function strip_braces(value) {
    return value.split('[').join('.').split(']').join('');
}
function escape_dots(value) {
    var val = value.split('\'');
    return (val.length < 3) ? val.join('\'') : val.map(function (seg) {
        if (seg.length < 3)
            return seg;
        if ((seg[0] === '.') || (seg[seg.length - 1] === '.'))
            return seg;
        return seg.split('.').join('&&');
    }).join('');
}
function unescape_dots(value) {
    return value.split('&&').join('.');
}
function partify(value) {
    if (!value)
        return;
    return escape_dots(strip_braces(boundary_to_dot('' + value))).split('.');
}
function canClone(o) {
    return (typeof o.__CLONE__ === 'function');
}
function clone(o) {
    if ((typeof o !== 'object') || (o === null))
        return o;
    if (Array.isArray(o))
        return o.map(clone);
    return (canClone(o)) ?
        o.__CLONE__(clone) : (o.constructor !== Object) ? o :
        Object.keys(o).reduce(function (pre, k) {
            pre[k] = (typeof o[k] === 'object') ?
                clone(o[k]) : o[k];
            return pre;
        }, {});
}
function get(path, o) {
    var parts = partify(path);
    var first;
    if (typeof o === 'object') {
        if (parts.length === 1)
            return o[unescape_dots(parts[0])];
        if (parts.length === 0)
            return;
        first = o[parts.shift()];
        return ((typeof o === 'object') && (o !== null)) ?
            parts.reduce(function (target, prop) {
                if (target == null)
                    return target;
                return target[unescape_dots(prop)];
            }, first) : null;
    }
    else {
        throw new TypeError('get(): expects an object got ' + typeof o);
    }
}
exports.get = get;
;
function set(path, value, obj) {
    var parts = partify(path);
    if ((typeof obj !== 'object') || (obj == null)) {
        return clone(obj);
    }
    else {
        return _set(obj, value, parts);
    }
}
exports.set = set;
;
function _set(obj, value, parts) {
    var o;
    var k;
    if (parts.length === 0)
        return value;
    o = ((typeof obj !== 'object') || (obj === null)) ? {} : clone(obj);
    k = unescape_dots(parts[0]);
    o[k] = _set(o[k], value, parts.slice(1));
    return o;
}
function default_1(k, v, o) {
    if (o == null)
        return get(k, v);
    else
        return set(k, v, o);
}
exports.default = default_1;
;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJleGFtcGxlL2J1aWxkL2FwcC5qcyIsImV4YW1wbGUvYnVpbGQvd21sL2FwcC5qcyIsImxpYi9hcHAvYWN0aW9uLWJhci9BY3Rpb25CYXIuanMiLCJsaWIvYXBwL2FjdGlvbi1iYXIvd21sL2FjdGlvbl9iYXIuanMiLCJsaWIvYXBwL21lbnUtYnV0dG9uL01lbnVCdXR0b24uanMiLCJsaWIvYXBwL21lbnUtYnV0dG9uL3dtbC9tZW51X2J1dHRvbi5qcyIsImxpYi9jb21tb24vbmFtZXMuanMiLCJsaWIvY29tbW9uL3V0aWwuanMiLCJsaWIvY29udGVudC9pbmRleC5qcyIsImxpYi9sYXlvdXQvYXNpZGUvQXNpZGUuanMiLCJsaWIvbGF5b3V0L2FzaWRlL3dtbC9hc2lkZS5qcyIsImxpYi9sYXlvdXQvZHJhd2VyL0RyYXdlci5qcyIsImxpYi9sYXlvdXQvZHJhd2VyL3dtbC9kcmF3ZXIuanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC1ydW50aW1lL3NyYy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9hZnBsL2xpYi9tb25hZC9FaXRoZXIuanMiLCJub2RlX21vZHVsZXMvYWZwbC9saWIvbW9uYWQvTWF5YmUuanMiLCJub2RlX21vZHVsZXMvcHJvcGVydHktc2Vlay9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGFwcF8xID0gcmVxdWlyZShcIi4vd21sL2FwcFwiKTtcbnZhciBBcHAgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQXBwKCkge1xuICAgICAgICAvKipcbiAgICAgICAgICogdmFsdWVzIHVzZWQgd2l0aGluIHRoZSB0ZW1wbGF0ZS5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMudmFsdWVzID0ge1xuICAgICAgICAgICAgaWQ6IHtcbiAgICAgICAgICAgICAgICBsYXlvdXQ6ICdsYXlvdXQnXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiB2aWV3IGlzIHRoZSBjdXJyZW50IGFwcGxpY2F0aW9uIHZpZXcuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnZpZXcgPSBuZXcgYXBwXzEuTWFpbih0aGlzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogcnVuIHRoZSBhcHBsaWNhdGlvbi5cbiAgICAgKi9cbiAgICBBcHAucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHJvb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJyk7XG4gICAgICAgIHdoaWxlIChyb290Lmxhc3RDaGlsZClcbiAgICAgICAgICAgIHJvb3QucmVtb3ZlQ2hpbGQocm9vdC5sYXN0Q2hpbGQpO1xuICAgICAgICByb290LmFwcGVuZENoaWxkKHRoaXMudmlldy5yZW5kZXIoKSk7XG4gICAgICAgIHRoaXMubGF5b3V0ID0gdGhpcy52aWV3LmZpbmRCeUlkKHRoaXMudmFsdWVzLmlkLmxheW91dCk7XG4gICAgfTtcbiAgICBBcHAubWFpbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBBcHAoKTtcbiAgICB9O1xuICAgIHJldHVybiBBcHA7XG59KCkpO1xuZXhwb3J0cy5BcHAgPSBBcHA7XG52YXIgdyA9IHdpbmRvdztcbncuYXBwID0gQXBwLm1haW4oKTtcbncuYXBwLnJ1bigpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgd21sX3J1bnRpbWVfMSA9IHJlcXVpcmUoXCJAcXVlbmsvd21sLXJ1bnRpbWVcIik7XG52YXIgRHJhd2VyXzEgPSByZXF1aXJlKFwiQHBhY2thZ2Uvc2VsZi9sYXlvdXQvZHJhd2VyL0RyYXdlclwiKTtcbnZhciBBY3Rpb25CYXJfMSA9IHJlcXVpcmUoXCJAcGFja2FnZS9zZWxmL2FwcC9hY3Rpb24tYmFyL0FjdGlvbkJhclwiKTtcbnZhciBNZW51QnV0dG9uXzEgPSByZXF1aXJlKFwiQHBhY2thZ2Uvc2VsZi9hcHAvbWVudS1idXR0b24vTWVudUJ1dHRvblwiKTtcbnZhciBNYWluID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhNYWluLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIE1haW4oY29udGV4dCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBjb250ZXh0KSB8fCB0aGlzO1xuICAgICAgICB2YXIgdmlldyA9IF90aGlzO1xuICAgICAgICBfdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uICgkJHZpZXcsICQkY3R4KSB7XG4gICAgICAgICAgICByZXR1cm4gd21sX3J1bnRpbWVfMS53aWRnZXQoRHJhd2VyXzEuRHJhd2VyLCB7XG4gICAgICAgICAgICAgICAgaHRtbDoge30sXG4gICAgICAgICAgICAgICAgd21sOiB7XG4gICAgICAgICAgICAgICAgICAgICdpZCc6ICQkY3R4LnZhbHVlcy5pZC5sYXlvdXRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBbd21sX3J1bnRpbWVfMS53aWRnZXQoQWN0aW9uQmFyXzEuQWN0aW9uQmFyLCB7XG4gICAgICAgICAgICAgICAgICAgIGh0bWw6IHt9LFxuICAgICAgICAgICAgICAgICAgICB3bWw6IHt9XG4gICAgICAgICAgICAgICAgfSwgW3dtbF9ydW50aW1lXzEud2lkZ2V0KE1lbnVCdXR0b25fMS5NZW51QnV0dG9uLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBodG1sOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdtbDoge30sXG4gICAgICAgICAgICAgICAgICAgICAgICB3dzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdvbkNsaWNrJzogZnVuY3Rpb24gZnVuY3Rpb25fbGl0ZXJhbF8xKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJCRjdHgudmlldy5maW5kQnlJZCgkJGN0eC52YWx1ZXMuaWQubGF5b3V0KS5tYXAoZnVuY3Rpb24gZnVuY3Rpb25fbGl0ZXJhbF8yKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkLnRvZ2dsZURyYXdlcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIFtdLCAkJHZpZXcpXSwgJCR2aWV3KV0sICQkdmlldyk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIE1haW47XG59KHdtbF9ydW50aW1lXzEuQXBwVmlldykpO1xuZXhwb3J0cy5NYWluID0gTWFpbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIG5hbWVzID0gcmVxdWlyZShcIkBwYWNrYWdlL3NlbGYvY29tbW9uL25hbWVzXCIpO1xudmFyIHV0aWwgPSByZXF1aXJlKFwiQHBhY2thZ2Uvc2VsZi9jb21tb24vdXRpbFwiKTtcbnZhciBjb250ZW50XzEgPSByZXF1aXJlKFwiQHBhY2thZ2Uvc2VsZi9jb250ZW50XCIpO1xudmFyIGFjdGlvbl9iYXJfMSA9IHJlcXVpcmUoXCIuL3dtbC9hY3Rpb25fYmFyXCIpO1xuLyoqXG4gKiBBY3Rpb25CYXIgcHJvdmlkZXMgYSBiYXIgYWNyb3NzIHRoZSBzY3JlZW4gdGhhdCBjYW4gYmVcbiAqIHVzZWQgYXMgYSB0b29sYmFyLCBuYXZpZ2F0aW9uIG1lbnUgb3Igc29tZXRoaW5nIHNpbWlsbGFyLlxuICovXG52YXIgQWN0aW9uQmFyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhBY3Rpb25CYXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQWN0aW9uQmFyKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMudmlldyA9IG5ldyBhY3Rpb25fYmFyXzEuTWFpbihfdGhpcyk7XG4gICAgICAgIF90aGlzLnZhbHVlcyA9IHtcbiAgICAgICAgICAgIGlkOiB7XG4gICAgICAgICAgICAgICAgY29udGVudDogJ2NvbnRlbnQnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAgICAgICByb290OiB1dGlsLmNvbWJpbmUoW25hbWVzLkFDVElPTl9CQVIsIG5hbWVzLkZJWEVEX1BVU0hBQkxFXSksXG4gICAgICAgICAgICAgICAgY29udGVudDogbmFtZXMuQUNUSU9OX0JBUl9DT05URU5UXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIEFjdGlvbkJhcjtcbn0oY29udGVudF8xLkdyb3VwKSk7XG5leHBvcnRzLkFjdGlvbkJhciA9IEFjdGlvbkJhcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUFjdGlvbkJhci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHdtbF9ydW50aW1lXzEgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC1ydW50aW1lXCIpO1xudmFyIE1haW4gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKE1haW4sIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gTWFpbihjb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbnRleHQpIHx8IHRoaXM7XG4gICAgICAgIHZhciB2aWV3ID0gX3RoaXM7XG4gICAgICAgIF90aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCQkdmlldywgJCRjdHgpIHtcbiAgICAgICAgICAgIHJldHVybiB3bWxfcnVudGltZV8xLm5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiAkJGN0eC52YWx1ZXMuY2xhc3Mucm9vdCB9LCB3bWw6IHt9IH0sIFt3bWxfcnVudGltZV8xLm5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiAkJGN0eC52YWx1ZXMuY2xhc3MuY29udGVudCB9LCB3bWw6IHsgJ2lkJzogJCRjdHgudmFsdWVzLmlkLmNvbnRlbnQgfSB9LCBbd21sX3J1bnRpbWVfMS5kb21pZnkoJCRjdHguY2hpbGRyZW4pXSwgJCR2aWV3KV0sICQkdmlldyk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIE1haW47XG59KHdtbF9ydW50aW1lXzEuQXBwVmlldykpO1xuZXhwb3J0cy5NYWluID0gTWFpbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFjdGlvbl9iYXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBuYW1lcyA9IHJlcXVpcmUoXCJAcGFja2FnZS9zZWxmL2NvbW1vbi9uYW1lc1wiKTtcbnZhciB3bWxfcnVudGltZV8xID0gcmVxdWlyZShcIkBxdWVuay93bWwtcnVudGltZVwiKTtcbnZhciBtZW51X2J1dHRvbl8xID0gcmVxdWlyZShcIi4vd21sL21lbnVfYnV0dG9uXCIpO1xuLyoqXG4gKiBNZW51QnV0dG9uIHByb3ZpZGVzIGEgJ2hhbWJ1cmdlcicgbWVudSBidXR0b24uXG4gKi9cbnZhciBNZW51QnV0dG9uID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhNZW51QnV0dG9uLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIE1lbnVCdXR0b24oKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IG1lbnVfYnV0dG9uXzEuTWFpbihfdGhpcyk7XG4gICAgICAgIF90aGlzLnZhbHVlcyA9IHtcbiAgICAgICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgICAgICAgYnV0dG9uOiBuYW1lcy5NRU5VX0JVVFRPTlxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBNZW51QnV0dG9uO1xufSh3bWxfcnVudGltZV8xLkNvbXBvbmVudCkpO1xuZXhwb3J0cy5NZW51QnV0dG9uID0gTWVudUJ1dHRvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPU1lbnVCdXR0b24uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB3bWxfcnVudGltZV8xID0gcmVxdWlyZShcIkBxdWVuay93bWwtcnVudGltZVwiKTtcbnZhciBNYWluID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhNYWluLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIE1haW4oY29udGV4dCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBjb250ZXh0KSB8fCB0aGlzO1xuICAgICAgICB2YXIgdmlldyA9IF90aGlzO1xuICAgICAgICBfdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uICgkJHZpZXcsICQkY3R4KSB7XG4gICAgICAgICAgICByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCdidXR0b24nLCB7IGh0bWw6IHsgJ2NsYXNzJzogJCRjdHgudmFsdWVzLmNsYXNzLmJ1dHRvbiwgJ29uY2xpY2snOiB3bWxfcnVudGltZV8xLnJlYWQoJ3d3Om9uQ2xpY2snLCAkJGN0eC5hdHRycykgfSwgd21sOiB7fSB9LCBbd21sX3J1bnRpbWVfMS5ub2RlKCdzcGFuJywgeyBodG1sOiB7ICdjbGFzcyc6IFwiXCIgfSwgd21sOiB7fSB9LCBbXSwgJCR2aWV3KSwgd21sX3J1bnRpbWVfMS5ub2RlKCdzcGFuJywgeyBodG1sOiB7ICdjbGFzcyc6IFwiXCIgfSwgd21sOiB7fSB9LCBbXSwgJCR2aWV3KSwgd21sX3J1bnRpbWVfMS5ub2RlKCdzcGFuJywgeyBodG1sOiB7ICdjbGFzcyc6IFwiXCIgfSwgd21sOiB7fSB9LCBbXSwgJCR2aWV3KV0sICQkdmlldyk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIE1haW47XG59KHdtbF9ydW50aW1lXzEuQXBwVmlldykpO1xuZXhwb3J0cy5NYWluID0gTWFpbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1lbnVfYnV0dG9uLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBISURERU4gaW5kaWNhdGVzIGFuIGVsZW1lbnQgc2hvdWxkIGJlIGhpZGRlbiBmcm9tIHNpZ2h0LlxuICovXG5leHBvcnRzLkhJRERFTiA9ICctaGlkZGVuJztcbi8qKlxuICogRElTQUJMRUQgaW5kaWNhdGVzIGFuIGVsZW1lbnQgc2hvdWxkIGFwcGVhciB0byBiZSBpbmFjY2VzaWJsZVxuICovXG5leHBvcnRzLkRJU0FCTEVEID0gJy1kaXNhYmxlZCc7XG4vKipcbiAqIE9OIGluZGljYXRlcyBhbiAnb24nIHN0YXRlLlxuICovXG5leHBvcnRzLk9OID0gJy1vbic7XG4vKipcbiAqIE9GRiBpbmRpY2F0ZXMgYW4gJ29mZicgc3RhdGUuXG4gKi9cbmV4cG9ydHMuT0ZGID0gJy1vZmYnO1xuLyoqXG4gKiBQVVNIQUJMRSBpcyB1c2VkIGJ5IG90aGVyIHN0eWxlcyB0byBtb3ZlIGFuIGVsZW1lbnQgYXJvdW5kLlxuICovXG5leHBvcnRzLlBVU0hBQkxFID0gJy1wdXNoYWJsZSc7XG4vKipcbiAqIEZJWEVEX1BVU0hBQkxFIGlzIGxpa2UgUFVTSEFCTEUgYnV0IHVzZWQgZm9yIGZpeGVkIGVsZW1lbnRzLlxuICovXG5leHBvcnRzLkZJWEVEX1BVU0hBQkxFID0gJy1maXhlZC1wdXNoYWJsZSc7XG5leHBvcnRzLlNQQUNFRCA9ICctc3BhY2VkJztcbmV4cG9ydHMuREVGQVVMVCA9ICctZGVmYXVsdCc7XG5leHBvcnRzLlBSSU1BUlkgPSAnLXByaW1hcnknO1xuZXhwb3J0cy5TVUNDRVNTID0gJy1zdWNjZXNzJztcbmV4cG9ydHMuSU5GTyA9ICctaW5mbyc7XG5leHBvcnRzLldBUk5JTkcgPSAnLXdhcm5pbmcnO1xuZXhwb3J0cy5EQU5HRVIgPSAnLWRhbmdlcic7XG5leHBvcnRzLkxBUkdFID0gJy1sYXJnZSc7XG5leHBvcnRzLlNNQUxMID0gJy1zbWFsbCc7XG5leHBvcnRzLkVYVFJBX1NNQUxMID0gJy1leHRyYS1zbWFsbCc7XG5leHBvcnRzLkFDVElWRSA9ICdhY3RpdmUnOyAvL0B0b2RvOiByZWZhY3RvciB0byBmbGFnIHN5bnRheFxuZXhwb3J0cy5EUkFXRVIgPSAnd3ctZHJhd2VyLWxheW91dCc7XG5leHBvcnRzLkFTSURFID0gJ3d3LWRyYXdlcic7XG5leHBvcnRzLkFTSURFX0NPTlRFTlQgPSAnd3ctZHJhd2VyX19jb250ZW50JztcbmV4cG9ydHMuQVNJREVfUFVTSEFCTEUgPSAnLWRyYXdlci1wdXNoYWJsZSc7XG5leHBvcnRzLkFTSURFX1BVU0hBQkxFX0ZJWEVEID0gJy1kcmF3ZXItcHVzaGFibGUtZml4ZWQnO1xuLyoqXG4gKiBBQ1RJT05fQkFSIGNsYXNzZXMgZm9yIHRoZSBBY3Rpb25CYXIgcm9vdC5cbiAqL1xuZXhwb3J0cy5BQ1RJT05fQkFSID0gJ3d3LWFjdGlvbi1iYXInO1xuLyoqXG4gKiBBQ1RJT05fQkFSX0NPTlRFTlQgY2xhc3NlcyBmb3IgdGhlIEFjdGlvbkJhciB3cmFwcGVkIGNvbnRlbnQuXG4gKi9cbmV4cG9ydHMuQUNUSU9OX0JBUl9DT05URU5UID0gJ3d3LWFjdGlvbi1iYXJfX2NvbnRlbnQnO1xuZXhwb3J0cy5NQUlOX1ZJRVcgPSAnd3ctbWFpbi12aWV3Jztcbi8qKlxuICogTUVOVV9CVVRUT04gY2xhc2VzcyBmb3IgdGhlIE1lbnVCdXR0b24uXG4gKi9cbmV4cG9ydHMuTUVOVV9CVVRUT04gPSAnd3ctbWVudS1idXR0b24nO1xuZXhwb3J0cy5CVVRUT04gPSAnd3ctYnV0dG9uJztcbmV4cG9ydHMuQlVUVE9OX0dST1VQID0gJ3d3LWJ1dHRvbi1ncm91cCc7XG4vL0B0b2RvOiByZWZhY3RvciB0aGlzIHRvIGJlIGlubGluZSB3aXRoIG90aGVyIGNsYXNzIG5hbWVzXG5leHBvcnRzLkdSSURfQ09OVEFJTkVSID0gJ2NvbnRhaW5lci1mbHVpZCc7XG5leHBvcnRzLkdSSURfQ09MVU1OID0gJyc7XG5leHBvcnRzLkdSSURfUk9XID0gJ3Jvdyc7XG5leHBvcnRzLlBBTkVMID0gJ3d3LXBhbmVsJztcbmV4cG9ydHMuUEFORUxfSEVBREVSID0gJ3d3LXBhbmVsX19oZWFkZXInO1xuZXhwb3J0cy5QQU5FTF9CT0RZID0gJ3d3LXBhbmVsX19ib2R5JztcbmV4cG9ydHMuUEFORUxfRk9PVEVSID0gJ3d3LXBhbmVsX19mb290ZXInO1xuZXhwb3J0cy5NT0RBTCA9ICd3dy1tb2RhbCc7XG5leHBvcnRzLk1PREFMX0RJQUxPRyA9ICd3dy1tb2RhbF9fZGlhbG9nJztcbmV4cG9ydHMuTU9EQUxfQ09OVEVOVCA9ICd3dy1tb2RhbF9fY29udGVudCc7XG5leHBvcnRzLk1PREFMX0hFQURFUiA9ICd3dy1tb2RhbF9faGVhZGVyJztcbmV4cG9ydHMuTU9EQUxfQk9EWSA9ICd3dy1tb2RhbF9fYm9keSc7XG5leHBvcnRzLk1PREFMX0ZPT1RFUiA9ICd3dy1tb2FkbF9fZm9vdGVyJztcbmV4cG9ydHMuRk9STV9HUk9VUCA9ICdmb3JtLWdyb3VwJztcbmV4cG9ydHMuQ09OVFJPTF9MQUJFTCA9ICdjb250cm9sLWxhYmVsJztcbmV4cG9ydHMuSU5QVVQgPSAnZm9ybS1jb250cm9sJztcbmV4cG9ydHMuVEVYVEFSRUEgPSAnZm9ybS1jb250cm9sJztcbmV4cG9ydHMuU0VMRUNUID0gJ2Zvcm0tY29udHJvbCc7XG5leHBvcnRzLlRBQlMgPSAnbmF2IG5hdi10YWJzJzsgLy9AdG9kbyB1bi1ib290c3RyYXBcbmV4cG9ydHMuU1dJVENIID0gJ3d3LXN3aXRjaCc7XG5leHBvcnRzLlNXSVRDSF9TTElERVIgPSAnd3ctc3dpdGNoX19zbGlkZXInO1xuZXhwb3J0cy5UQUJMRSA9ICd0YWJsZSc7IC8vQHRvZG8gdW4tYm9vdHN0cmFwXG5leHBvcnRzLlRSRUVfTkFWID0gJ3RyZWUtbmF2JztcbmV4cG9ydHMuVFJFRV9OQVZfTElTVCA9ICd0cmVlLW5hdl9fbGlzdCc7XG5leHBvcnRzLlRSRUVfTkFWX0xJU1RfSVRFTSA9ICd0cmVlLW5hdl9faXRlbSc7XG5leHBvcnRzLkJSRUFEX0NSVU1CUyA9ICdicmVhZGNydW1iJzsgLy9AdG9kbyB1bi1ib290c3RyYXBcbmV4cG9ydHMuQlJFQURfQ1JVTUJTX0NSVU1CID0gZXhwb3J0cy5CUkVBRF9DUlVNQlMgKyBcIl9fY3J1bWJcIjtcbmV4cG9ydHMuTElTVCA9ICd3dy1saXN0JztcbmV4cG9ydHMuTElTVF9JVEVNID0gJ3d3LWxpc3RfX2l0ZW0nO1xuZXhwb3J0cy5TRUFSQ0hfSU5QVVQgPSAnd3ctc2VhcmNoX19pbnB1dCc7XG5leHBvcnRzLkZJTkRFUiA9ICd3dy1maW5kZXInO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bmFtZXMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIGNvbWJpbmUgdGhlIG1lbWJlcnMgb2YgYW4gYXJyYXkgaW50byBvbmUgc3RyaW5nLlxuICovXG5leHBvcnRzLmNvbWJpbmUgPSBmdW5jdGlvbiAoc3RyLCBqb2luZXIpIHtcbiAgICBpZiAoam9pbmVyID09PSB2b2lkIDApIHsgam9pbmVyID0gJyAnOyB9XG4gICAgcmV0dXJuIHN0ci5maWx0ZXIoZnVuY3Rpb24gKHMpIHsgcmV0dXJuICgocyAhPSBudWxsKSB8fCBzICE9ICcnKTsgfSkuam9pbihqb2luZXIpO1xufTtcbi8qKlxuICogY29uY2F0IGpvaW5zIHZhcmlvdXMgc3RyaW5ncyB0b2dldGhlciB0byBmb3JtIGFuIGh0bWwgY2xhc3MgYXR0cmlidXRlIHZhbHVlLlxuICpcbiAqIFJlbW92ZXMgZW1wdHkgc3RyaW5ncywgbnVsbCBhbmQgdW5kZWZpbmVkIHZhbHVlcy5cbiAqL1xuZXhwb3J0cy5jb25jYXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHN0ciA9IFtdO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHN0cltfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgIH1cbiAgICByZXR1cm4gc3RyLmZpbHRlcihmdW5jdGlvbiAocykgeyByZXR1cm4gKChzICE9IG51bGwpIHx8IHMgIT0gJycpOyB9KS5qb2luKCcgJyk7XG59O1xuLyoqXG4gKiBub29wXG4gKi9cbmV4cG9ydHMubm9vcCA9IGZ1bmN0aW9uICgpIHsgfTtcbi8qKlxuICogcmVwbGFjZUNvbnRlbnRcbiAqL1xuZXhwb3J0cy5yZXBsYWNlQ29udGVudCA9IGZ1bmN0aW9uIChyLCBub2RlKSB7XG4gICAgd2hpbGUgKG5vZGUubGFzdENoaWxkKVxuICAgICAgICBub2RlLnJlbW92ZUNoaWxkKG5vZGUubGFzdENoaWxkKTtcbiAgICBub2RlLmFwcGVuZENoaWxkKHIucmVuZGVyKCkpO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXV0aWwuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB3bWxfcnVudGltZV8xID0gcmVxdWlyZShcIkBxdWVuay93bWwtcnVudGltZVwiKTtcbi8qKlxuICogR3JvdXAgaXMgYW4gYWJzdHJhY3QgY2xhc3MgcHJvdmlkaW5nIGFuIGFwaSBmb3JcbiAqIHdpZGdldHMgd2hvc2UgcHJpbWFyeSBwdXJwb3NlIGlzIGRpc3BsYXlpbmcgY29udGVudC5cbiAqL1xudmFyIEdyb3VwID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhHcm91cCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBHcm91cCgpIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBzZXRDb250ZW50IGNoYW5nZXMgdGhlIGNvbnRlbnQgdmFsdWUuXG4gICAgICovXG4gICAgR3JvdXAucHJvdG90eXBlLnNldENvbnRlbnQgPSBmdW5jdGlvbiAoY29udGVudCkge1xuICAgICAgICB0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xuICAgICAgICB0aGlzLnZpZXcuaW52YWxpZGF0ZSgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIHJlbW92ZUNvbnRlbnQgcmVtb3ZlcyBleGlzdGluZyBjb250ZW50LlxuICAgICAqL1xuICAgIEdyb3VwLnByb3RvdHlwZS5yZW1vdmVDb250ZW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmNvbnRlbnQgPSBudWxsO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIHJldHVybiBHcm91cDtcbn0od21sX3J1bnRpbWVfMS5Db21wb25lbnQpKTtcbmV4cG9ydHMuR3JvdXAgPSBHcm91cDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgY29udGVudCA9IHJlcXVpcmUoXCJAcGFja2FnZS9zZWxmL2NvbnRlbnRcIik7XG52YXIgbmFtZXMgPSByZXF1aXJlKFwiQHBhY2thZ2Uvc2VsZi9jb21tb24vbmFtZXNcIik7XG52YXIgYXNpZGVfMSA9IHJlcXVpcmUoXCIuL3dtbC9hc2lkZVwiKTtcbi8qKlxuICogQXNpZGUgcHJvdmlkZXMgYSB3aWRnZXQgZm9yIGRpc3BsYXlpbmcgbmF2aWdhdGlvbiBhbmQgb3RoZXIgc2lkZWJhciBjb250ZW50LlxuICpcbiAqIEl0J3MgYXBpIGFsbG93cyBmb3IgdG9nZ2xpbmcgYmV0d2VlbiBoaWRkZW4gYW5kIHNob3duIHN0YXRlcyBhcyB3ZWxsIGFzIHF1ZXJ5aW5nIHRoZVxuICogY3VycmVudCBzdGF0ZS5cbiAqXG4gKiBUaGlzIHdpZGdldCdzIHN0eWxlIGludGVudGlvbmFsbHkgZ2l2ZXMgaXQgYSBoaWdoIHotaW5kZXggc28gdGhhdCBpdCBhcHBlYXJzIGluLWZyb250XG4gKiBvZiBvdGhlciBjb250ZW50LiBBZGp1c3QgdGhlIHJlc3BlY3RpdmUgc3R5bGUgdmFyaWFibGVzIHRvIGNoYW5nZS5cbiAqL1xudmFyIEFzaWRlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhBc2lkZSwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBBc2lkZSgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiB2YWx1ZXMgaXMgYSBoYXNoIG9mIHZhbHVlcyB1c2VkIGluIHRoZSB0ZW1wbGF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgX3RoaXMudmFsdWVzID0ge1xuICAgICAgICAgICAgaWQ6IHtcbiAgICAgICAgICAgICAgICByb290OiAnYXNpZGUnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgICAgICAgcm9vdDogbmFtZXMuQVNJREUsXG4gICAgICAgICAgICAgICAgY29udGVudDogbmFtZXMuQVNJREVfQ09OVEVOVFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgY29udGVudDogJ3d3OmNvbnRlbnQnXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIF90aGlzLnZpZXcgPSBuZXcgYXNpZGVfMS5NYWluKF90aGlzKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBBc2lkZS5wcm90b3R5cGUuX2dldERyYXdlckRPTSA9IGZ1bmN0aW9uIChmKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZpZXcuZmluZEJ5SWQodGhpcy52YWx1ZXMuaWQucm9vdCkuY2F0YShmdW5jdGlvbiAoKSB7IHJldHVybiBudWxsOyB9LCBmKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIHZpc2libGUgcXVlcmllcyB3aGV0aGVyIHRoZSBEcmF3ZXIgaXMgdmlzaWJsZSBvciBub3QuXG4gICAgICovXG4gICAgQXNpZGUucHJvdG90eXBlLnZpc2libGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAhdGhpcy5fZ2V0RHJhd2VyRE9NKGZ1bmN0aW9uIChlKSB7IHJldHVybiBlLmNsYXNzTGlzdC5jb250YWlucyhuYW1lcy5ISURERU4pOyB9KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIGhpZGUgdGhlIGRyYXdlci5cbiAgICAgKi9cbiAgICBBc2lkZS5wcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMudmlzaWJsZSgpKVxuICAgICAgICAgICAgdGhpcy5fZ2V0RHJhd2VyRE9NKGZ1bmN0aW9uIChlKSB7IHJldHVybiBlLmNsYXNzTGlzdC5hZGQobmFtZXMuSElEREVOKTsgfSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBzaG93RHJhd2VyIHNob3dzIHRoZSBkcmF3ZXJcbiAgICAgKi9cbiAgICBBc2lkZS5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnZpc2libGUoKSlcbiAgICAgICAgICAgIHRoaXMuX2dldERyYXdlckRPTShmdW5jdGlvbiAoZSkgeyByZXR1cm4gZS5jbGFzc0xpc3QucmVtb3ZlKG5hbWVzLkhJRERFTik7IH0pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogdG9nZ2xlIHRoZSB2aXNpYmlsaXR5IG9mIHRoaXMgRHJhd2VyXG4gICAgICovXG4gICAgQXNpZGUucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fZ2V0RHJhd2VyRE9NKGZ1bmN0aW9uIChlKSB7IHJldHVybiBlLmNsYXNzTGlzdC50b2dnbGUobmFtZXMuSElEREVOKTsgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gQXNpZGU7XG59KGNvbnRlbnQuR3JvdXApKTtcbmV4cG9ydHMuQXNpZGUgPSBBc2lkZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUFzaWRlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgd21sX3J1bnRpbWVfMSA9IHJlcXVpcmUoXCJAcXVlbmsvd21sLXJ1bnRpbWVcIik7XG52YXIgTWFpbiA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoTWFpbiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBNYWluKGNvbnRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29udGV4dCkgfHwgdGhpcztcbiAgICAgICAgdmFyIHZpZXcgPSBfdGhpcztcbiAgICAgICAgX3RoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoJCR2aWV3LCAkJGN0eCkge1xuICAgICAgICAgICAgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6ICQkY3R4LnZhbHVlcy5jbGFzcy5yb290IH0sIHdtbDogeyAnaWQnOiAkJGN0eC52YWx1ZXMuaWQucm9vdCB9IH0sIFt3bWxfcnVudGltZV8xLm5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiAkJGN0eC52YWx1ZXMuY2xhc3MuY29udGVudCB9LCB3bWw6IHt9IH0sIFt3bWxfcnVudGltZV8xLmlmRSh3bWxfcnVudGltZV8xLnJlYWQoJ3d3OmNvbnRlbnQnLCAkJGN0eC5hdHRycyksIGZ1bmN0aW9uIGlmMCgpIHsgcmV0dXJuIHdtbF9ydW50aW1lXzEuZG9taWZ5KHdtbF9ydW50aW1lXzEucmVhZCgnd3c6Y29udGVudCcsICQkY3R4LmF0dHJzKS5yZW5kZXIoKSk7IH0sIGZ1bmN0aW9uIGVsc2VfY2xhdXNlMCgpIHsgcmV0dXJuIHdtbF9ydW50aW1lXzEuZG9taWZ5KCQkY3R4LmNoaWxkcmVuKTsgfSldLCAkJHZpZXcpXSwgJCR2aWV3KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gTWFpbjtcbn0od21sX3J1bnRpbWVfMS5BcHBWaWV3KSk7XG5leHBvcnRzLk1haW4gPSBNYWluO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXNpZGUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIkBwYWNrYWdlL3NlbGYvY29udGVudFwiKTtcbnZhciBuYW1lcyA9IHJlcXVpcmUoXCJAcGFja2FnZS9zZWxmL2NvbW1vbi9uYW1lc1wiKTtcbnZhciBkcmF3ZXJfMSA9IHJlcXVpcmUoXCIuL3dtbC9kcmF3ZXJcIik7XG47XG4vKipcbiAqIERyYXdlciBwcm92aWRlcyBhIDIgY29sdW1uIGFwcGxpY2F0aW9uIGxheW91dCB3aXRoIHRoZSBmaXJzdCB0eXBpY2FsbHkgdXNlZCBhcyBuYXZhaWdhdGlvblxuICogYW5kIHRoZSBzZWNvbmQgbWFpbiBhcHBsaWNhdGlvbiBjb250ZW50LlxuICpcbiAqIGBgYHdtbFxuICpcbiAqICA8RHJhd2VyXG4gKiAgIHdtbDppZD1cImxheW91dFwiXG4gKiAgIGNvbnRlbnQ9e3t0aGlzLmdldENvbnRlbnQoKX19IC8+XG4gKlxuICogYGBgXG4gKi9cbnZhciBEcmF3ZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKERyYXdlciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBEcmF3ZXIoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IGRyYXdlcl8xLk1haW4oX3RoaXMpO1xuICAgICAgICAvKipcbiAgICAgICAgICogdmFsdWVzIGlzIGEgaGFzaCBvZiB2YWx1ZXMgdXNlZCBpbiB0aGUgdGVtcGxhdGUuXG4gICAgICAgICAqL1xuICAgICAgICBfdGhpcy52YWx1ZXMgPSB7XG4gICAgICAgICAgICBpZDoge1xuICAgICAgICAgICAgICAgIHJvb3Q6ICdjb250ZW50JyxcbiAgICAgICAgICAgICAgICBkcmF3ZXI6ICdkcmF3ZXInXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAgICAgICByb290OiBuYW1lcy5EUkFXRVIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICBEUkFXRVI6ICd3dzpkcmF3ZXInLFxuICAgICAgICAgICAgICAgIENPTlRFTlQ6ICd3dzpjb250ZW50J1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIERyYXdlci5wcm90b3R5cGUuX2dldEFzaWRlID0gZnVuY3Rpb24gKGYpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmlldy5maW5kQnlJZCh0aGlzLnZhbHVlcy5pZC5kcmF3ZXIpLmNhdGEoZnVuY3Rpb24gKCkgeyByZXR1cm4gbnVsbDsgfSwgZik7XG4gICAgfTtcbiAgICBEcmF3ZXIucHJvdG90eXBlLl9jb21iaW5lID0gZnVuY3Rpb24gKGNsYXNzZXMpIHtcbiAgICAgICAgcmV0dXJuIGNsYXNzZXMuam9pbignICcpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogZHJhd2VyVmlzaWJsZSBxdWVyaWVzIHdoZXRoZXIgdGhlIEFzaWRlIGlzIHZpc2libGUgb3Igbm90LlxuICAgICAqL1xuICAgIERyYXdlci5wcm90b3R5cGUuZHJhd2VyVmlzaWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldEFzaWRlKGZ1bmN0aW9uIChhKSB7IHJldHVybiBhLnZpc2libGUoKTsgfSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBoaWRlRHJhd2VyIGhpZGVzIHRoZSBkcmF3ZXIuXG4gICAgICovXG4gICAgRHJhd2VyLnByb3RvdHlwZS5oaWRlRHJhd2VyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0QXNpZGUoZnVuY3Rpb24gKGEpIHsgcmV0dXJuIGEuaGlkZSgpOyB9KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIHNob3dEcmF3ZXIgc2hvd3MgdGhlIGRyYXdlclxuICAgICAqL1xuICAgIERyYXdlci5wcm90b3R5cGUuc2hvd0RyYXdlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldEFzaWRlKGZ1bmN0aW9uIChhKSB7IHJldHVybiBhLnNob3coKTsgfSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiB0b2dnbGUgdGhlIHZpc2liaWxpdHkgb2YgdGhlIEFzaWRlLlxuICAgICAqL1xuICAgIERyYXdlci5wcm90b3R5cGUudG9nZ2xlRHJhd2VyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0QXNpZGUoZnVuY3Rpb24gKGEpIHsgcmV0dXJuIGEudG9nZ2xlKCk7IH0pO1xuICAgIH07XG4gICAgcmV0dXJuIERyYXdlcjtcbn0oY29udGVudC5Hcm91cCkpO1xuZXhwb3J0cy5EcmF3ZXIgPSBEcmF3ZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1EcmF3ZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB3bWxfcnVudGltZV8xID0gcmVxdWlyZShcIkBxdWVuay93bWwtcnVudGltZVwiKTtcbnZhciBBc2lkZV8xID0gcmVxdWlyZShcIkBwYWNrYWdlL3NlbGYvbGF5b3V0L2FzaWRlL0FzaWRlXCIpO1xudmFyIE1haW4gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKE1haW4sIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gTWFpbihjb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbnRleHQpIHx8IHRoaXM7XG4gICAgICAgIHZhciB2aWV3ID0gX3RoaXM7XG4gICAgICAgIF90aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCQkdmlldywgJCRjdHgpIHtcbiAgICAgICAgICAgIHJldHVybiB3bWxfcnVudGltZV8xLm5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiAkJGN0eC52YWx1ZXMuY2xhc3Mucm9vdCB9LCB3bWw6IHsgJ2lkJzogJCRjdHgudmFsdWVzLmlkLnJvb3QgfSB9LCBbd21sX3J1bnRpbWVfMS53aWRnZXQoQXNpZGVfMS5Bc2lkZSwgeyBodG1sOiB7fSwgd21sOiB7ICdpZCc6ICQkY3R4LnZhbHVlcy5pZC5kcmF3ZXIgfSwgd3c6IHsgJ2NvbnRlbnQnOiB3bWxfcnVudGltZV8xLnJlYWQoJ3d3OmRyYXdlcicsICQkY3R4LmF0dHJzKSB9IH0sIFtdLCAkJHZpZXcpLCB3bWxfcnVudGltZV8xLmlmRSgkJGN0eC5jb250ZW50LCBmdW5jdGlvbiBpZjEoKSB7IHJldHVybiB3bWxfcnVudGltZV8xLmRvbWlmeSgkJGN0eC5jb250ZW50KTsgfSwgZnVuY3Rpb24gZWxzZWlmMCgpIHsgcmV0dXJuIHdtbF9ydW50aW1lXzEuaWZFKHdtbF9ydW50aW1lXzEucmVhZCgnd3c6Y29udGVudCcsICQkY3R4LmF0dHJzKSwgZnVuY3Rpb24gaWYwKCkgeyByZXR1cm4gd21sX3J1bnRpbWVfMS5kb21pZnkoJCRjdHguYXR0cnMud3cuY29udGVudC5yZW5kZXIoKSk7IH0sIGZ1bmN0aW9uIGVsc2VfY2xhdXNlMSgpIHsgcmV0dXJuIHdtbF9ydW50aW1lXzEuZG9taWZ5KCQkY3R4LmNoaWxkcmVuKTsgfSk7IH0pXSwgJCR2aWV3KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gTWFpbjtcbn0od21sX3J1bnRpbWVfMS5BcHBWaWV3KSk7XG5leHBvcnRzLk1haW4gPSBNYWluO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZHJhd2VyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHByb3BlcnR5ID0gcmVxdWlyZShcInByb3BlcnR5LXNlZWtcIik7XG52YXIgTWF5YmVfMSA9IHJlcXVpcmUoXCJhZnBsL2xpYi9tb25hZC9NYXliZVwiKTtcbjtcbi8qKlxuICogQ29tcG9uZW50IGlzIGFuIGFic3RyYWN0IFdpZGdldCBpbXBsZW1lbnRhdGlvblxuICogdGhhdCBjYW4gYmUgdXNlZCBpbnN0ZWFkIG9mIG1hbnVhbGx5IGltcGxlbWVudGluZyB0aGUgd2hvbGUgaW50ZXJmYWNlLlxuICpcbiAqL1xudmFyIENvbXBvbmVudCA9IChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogYXR0cnMgaXMgdGhlIGF0dHJpYnV0ZXMgdGhpcyBDb21wb25lbnQgZXhjZXB0cy5cbiAgICAgKi9cbiAgICAvKipcbiAgICAgKiBjaGlsZHJlbiBpcyBhbiBhcnJheSBvZiBjb250ZW50IHBhc3NlZCB0byB0aGlzIENvbXBvbmVudC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBDb21wb25lbnQoYXR0cnMsIGNoaWxkcmVuKSB7XG4gICAgICAgIHRoaXMuYXR0cnMgPSBhdHRycztcbiAgICAgICAgdGhpcy5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICAgIH1cbiAgICBDb21wb25lbnQucHJvdG90eXBlLnJlbmRlcmVkID0gZnVuY3Rpb24gKCkgeyB9O1xuICAgIENvbXBvbmVudC5wcm90b3R5cGUucmVtb3ZlZCA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICBDb21wb25lbnQucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMudmlldy5yZW5kZXIoKTsgfTtcbiAgICByZXR1cm4gQ29tcG9uZW50O1xufSgpKTtcbmV4cG9ydHMuQ29tcG9uZW50ID0gQ29tcG9uZW50O1xuO1xuLyoqXG4gKiByZWFkIGEgdmFsdWUgZm9ybSBhbiBvYmplY3QuXG4gKlxuICogVGhpcyBpcyBhbiBhbHRlcm5hdGl2ZSB0byByZWd1bGFyIHByb3BlcnR5IGFjY2VzcyB0aGF0IHdpbGwgdGhyb3cgZXhjZXB0aW9uc1xuICogaWYgYW55IG9mIHRoZSB2YWx1ZXMgaW4gdGhlIHBhcnQgYXJlIG51bGwuXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0aCAtIFRoZSBwYXRoIHRvIGxvb2sgdXAgb24gdGhlIG9iamVjdC5cbiAqIEBwYXJhbSB7b2JqZWN0fSBvIC0gVGhlIG9iamVjdFxuICogQHBhcmFtIHtBfSBbZGVmYXVsdFZhbHVlXSAtIFRoaXMgdmFsdWUgaXMgcmV0dXJuZWQgaWYgdGhlIHZhbHVlIGlzIG5vdCBzZXQuXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnRzLnJlYWQgPSBmdW5jdGlvbiAocGF0aCwgbywgZGVmYXVsdFZhbHVlKSB7XG4gICAgdmFyIHJldCA9IHByb3BlcnR5LmdldChwYXRoLnNwbGl0KCc6Jykuam9pbignLicpLCBvKTtcbiAgICByZXR1cm4gKHJldCAhPSBudWxsKSA/IHJldCA6IGRlZmF1bHRWYWx1ZTtcbn07XG4vKipcbiAqIEBwcml2YXRlXG4gKi9cbnZhciBhZG9wdCA9IGZ1bmN0aW9uIChjaGlsZCwgZSkge1xuICAgIHN3aXRjaCAodHlwZW9mIGNoaWxkKSB7XG4gICAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICAgICAgZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJyArIGNoaWxkKSk7XG4gICAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgICAgICBlLmFwcGVuZENoaWxkKGNoaWxkKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbiBub3QgYWRvcHQgY2hpbGQgXCIgKyBjaGlsZCArIFwiIG9mIHR5cGUgXCIgKyB0eXBlb2YgY2hpbGQpO1xuICAgIH1cbn07XG4vKipcbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydHMuYm94ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBjb250ZW50ID0gW107XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgY29udGVudFtfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgIH1cbiAgICB2YXIgZnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICBjb250ZW50LmZvckVhY2goZnVuY3Rpb24gKGMpIHsgcmV0dXJuIGZyYWcuYXBwZW5kQ2hpbGQoYyk7IH0pO1xuICAgIHJldHVybiBmcmFnO1xufTtcbi8qKlxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0cy5kb21pZnkgPSBmdW5jdGlvbiAoYSkge1xuICAgIGlmIChhIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgcmV0dXJuIGV4cG9ydHMuYm94LmFwcGx5KG51bGwsIGEubWFwKGV4cG9ydHMuZG9taWZ5KSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKCh0eXBlb2YgYSA9PT0gJ3N0cmluZycpIHx8XG4gICAgICAgICh0eXBlb2YgYSA9PT0gJ251bWJlcicpIHx8XG4gICAgICAgICh0eXBlb2YgYSA9PT0gJ2Jvb2xlYW4nKSkge1xuICAgICAgICByZXR1cm4gZXhwb3J0cy50ZXh0KGEpO1xuICAgIH1cbiAgICBlbHNlIGlmIChhIGluc3RhbmNlb2YgTm9kZSkge1xuICAgICAgICByZXR1cm4gYTtcbiAgICB9XG4gICAgZWxzZSBpZiAoYSA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBfZW1wdHk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2FuIG5vdCB1c2UgJ1wiICsgYSArIFwiJyh0eXBlb2YgXCIgKyB0eXBlb2YgYSArIFwiKSBhcyBDb250ZW50IVwiKTtcbiAgICB9XG59O1xuLyoqXG4gKiBAcHJpdmF0ZVxuICovXG52YXIgX2VtcHR5ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuLyoqXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnRzLmVtcHR5ID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gX2VtcHR5OyB9O1xuLyoqXG4gKiB0ZXh0IGNyZWF0ZXMgYSBuZXcgVGV4dE5vZGUuXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnRzLnRleHQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycgKyB2YWx1ZSk7XG59O1xuLyoqXG4gKiBub2RlIGlzIGNhbGxlZCB0byBjcmVhdGUgYSByZWd1bGFyIERPTSBub2RlXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnRzLm5vZGUgPSBmdW5jdGlvbiAodGFnLCBhdHRyaWJ1dGVzLCBjaGlsZHJlbiwgdmlldykge1xuICAgIHZhciBlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xuICAgIGlmICh0eXBlb2YgYXR0cmlidXRlc1snaHRtbCddID09PSAnb2JqZWN0JylcbiAgICAgICAgT2JqZWN0LmtleXMoYXR0cmlidXRlc1snaHRtbCddKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IGF0dHJpYnV0ZXNbJ2h0bWwnXVtrZXldO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIGVba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gJycpXG4gICAgICAgICAgICAgICAgICAgIGUuc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgICAgICBlLnNldEF0dHJpYnV0ZShrZXksIFwiXCIgKyB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIGNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKGMpIHsgcmV0dXJuIGFkb3B0KGMsIGUpOyB9KTtcbiAgICB2YXIgaWQgPSBhdHRyaWJ1dGVzWyd3bWwnXS5pZDtcbiAgICB2YXIgZ3JvdXAgPSBhdHRyaWJ1dGVzLndtbC5ncm91cDtcbiAgICBpZiAoaWQpXG4gICAgICAgIHZpZXcucmVnaXN0ZXIoaWQsIGUpO1xuICAgIGlmIChncm91cClcbiAgICAgICAgdmlldy5yZWdpc3Rlckdyb3VwKGdyb3VwLCBlKTtcbiAgICByZXR1cm4gZTtcbn07XG4vKipcbiAqIHdpZGdldCBjcmVhdGVzIGFuZCByZW5kZXJzIGEgbmV3IHdtbCB3aWRnZXQgaW5zdGFuY2UuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBDb25zdHJ1dG9yXG4gKiBAcGFyYW0ge29iamVjdH0gYXR0cmlidXRlc1xuICogQHBhcmFtIHthcnJheTxzdHJpbmd8bnVtYmVyfFdpZGdldD59IGNoaWxkcmVuXG4gKiBAcGFyYW0ge1ZpZXd9IHZpZXdcbiAqIEBwcml2YXRlXG4gKiBAcmV0dXJuIHtXaWRnZXR9XG4gKi9cbmV4cG9ydHMud2lkZ2V0ID0gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBhdHRyaWJ1dGVzLCBjaGlsZHJlbiwgdmlldykge1xuICAgIHZhciBjaGlsZHMgPSBbXTtcbiAgICB2YXIgdztcbiAgICBjaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChjaGlsZCkgeyByZXR1cm4gKGNoaWxkIGluc3RhbmNlb2YgQXJyYXkpID9cbiAgICAgICAgY2hpbGRzLnB1c2guYXBwbHkoY2hpbGRzLCBjaGlsZCkgOiBjaGlsZHMucHVzaChjaGlsZCk7IH0pO1xuICAgIHcgPSBuZXcgQ29uc3RydWN0b3IoYXR0cmlidXRlcywgY2hpbGRzKTtcbiAgICB2YXIgaWQgPSBhdHRyaWJ1dGVzLndtbC5pZDtcbiAgICB2YXIgZ3JvdXAgPSBhdHRyaWJ1dGVzLndtbC5ncm91cDtcbiAgICBpZiAoaWQpXG4gICAgICAgIHZpZXcucmVnaXN0ZXIoaWQsIHcpO1xuICAgIGlmIChncm91cClcbiAgICAgICAgdmlldy5yZWdpc3Rlckdyb3VwKGdyb3VwLCB3KTtcbiAgICB2aWV3LndpZGdldHMucHVzaCh3KTtcbiAgICByZXR1cm4gdy5yZW5kZXIoKTtcbn07XG4vKipcbiAqIGlmRSBwcm92aWRlcyBhbiBpZiB0aGVuIGV4cHJlc3Npb25cbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydHMuaWZFID0gZnVuY3Rpb24gKHByZWRpY2F0ZSwgcG9zaXRpdmUsIG5lZ2F0aXZlKSB7XG4gICAgcmV0dXJuIChwcmVkaWNhdGUpID8gcG9zaXRpdmUoKSA6IG5lZ2F0aXZlKCk7XG59O1xuLyoqXG4gKiBmb3JFIHByb3ZpZGVzIGEgZm9yIGV4cHJlc3Npb25cbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydHMuZm9yRSA9IGZ1bmN0aW9uIChjb2xsZWN0aW9uLCBjYiwgY2IyKSB7XG4gICAgdmFyIGZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgaWYgKGNvbGxlY3Rpb24gaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICBpZiAoY29sbGVjdGlvbi5sZW5ndGggPiAwKVxuICAgICAgICAgICAgY29sbGVjdGlvbi5mb3JFYWNoKGZ1bmN0aW9uICh2LCBrLCBhKSB7IHJldHVybiBmcmFnLmFwcGVuZENoaWxkKGNiKHYsIGssIGEpKTsgfSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGZyYWcuYXBwZW5kQ2hpbGQoY2IyKCkpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgY29sbGVjdGlvbiA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgdmFyIGwgPSBPYmplY3Qua2V5cyhjb2xsZWN0aW9uKTtcbiAgICAgICAgaWYgKGwubGVuZ3RoID4gMClcbiAgICAgICAgICAgIGwuZm9yRWFjaChmdW5jdGlvbiAoaykgeyByZXR1cm4gZnJhZy5hcHBlbmRDaGlsZChjYihjb2xsZWN0aW9uW2tdLCBrLCBjb2xsZWN0aW9uKSk7IH0pO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBmcmFnLmFwcGVuZENoaWxkKGNiMigpKTtcbiAgICB9XG4gICAgcmV0dXJuIGZyYWc7XG59O1xuLyoqXG4gKiBzd2l0Y2hFIHNpbXVsYXRlcyBhIHN3aXRjaCBzdGF0ZW1lbnRcbiAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcnxib29sZWFufSB2YWx1ZVxuICogQHBhcmFtIHtvYmplY3R9IGNhc2VzXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnRzLnN3aXRjaEUgPSBmdW5jdGlvbiAodmFsdWUsIGNhc2VzKSB7XG4gICAgdmFyIHJlc3VsdCA9IGNhc2VzW3ZhbHVlXTtcbiAgICB2YXIgZGVmYXVsID0gY2FzZXNbJ2RlZmF1bHQnXTtcbiAgICBpZiAocmVzdWx0KVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIGlmIChkZWZhdWwpXG4gICAgICAgIHJldHVybiBkZWZhdWw7XG59O1xuLyoqXG4gKiBBcHBWaWV3IGlzIHRoZSBjb25jcmV0ZSBpbXBsZW1lbnRhdGlvbiBvZiBhIFZpZXcuXG4gKlxuICogQHByb3BlcnR5IHs8Qz59IGNvbnRleHQgLSBUaGUgY29udGV4dCB0aGUgdmlldyBpcyByZW5kZXJlZCBpbi5cbiAqL1xudmFyIEFwcFZpZXcgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEFwcFZpZXcoY29udGV4dCkge1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgICAgICB0aGlzLmlkcyA9IHt9O1xuICAgICAgICB0aGlzLmdyb3VwcyA9IHt9O1xuICAgICAgICB0aGlzLndpZGdldHMgPSBbXTtcbiAgICB9XG4gICAgQXBwVmlldy5wcm90b3R5cGUucmVnaXN0ZXIgPSBmdW5jdGlvbiAoaWQsIHcpIHtcbiAgICAgICAgaWYgKHRoaXMuaWRzLmhhc093blByb3BlcnR5KGlkKSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkR1cGxpY2F0ZSBpZCAnXCIgKyBpZCArIFwiJyBkZXRlY3RlZCFcIik7XG4gICAgICAgIHRoaXMuaWRzW2lkXSA9IHc7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgQXBwVmlldy5wcm90b3R5cGUucmVnaXN0ZXJHcm91cCA9IGZ1bmN0aW9uIChncm91cCwgZSkge1xuICAgICAgICB0aGlzLmdyb3Vwc1tncm91cF0gPSB0aGlzLmdyb3Vwc1tncm91cF0gfHwgW107XG4gICAgICAgIHRoaXMuZ3JvdXBzW2dyb3VwXS5wdXNoKGUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIEFwcFZpZXcucHJvdG90eXBlLmZpbmRCeUlkID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHJldHVybiBNYXliZV8xLk1heWJlLmZyb21BbnkodGhpcy5pZHNbaWRdKTtcbiAgICB9O1xuICAgIEFwcFZpZXcucHJvdG90eXBlLmZpbmRHcm91cEJ5TmFtZSA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHJldHVybiBNYXliZV8xLk1heWJlLmZyb21BcnJheSh0aGlzLmdyb3Vwc1tuYW1lXSk7XG4gICAgfTtcbiAgICBBcHBWaWV3LnByb3RvdHlwZS5pbnZhbGlkYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY2hpbGRzO1xuICAgICAgICB2YXIgcmVhbEZpcnN0Q2hpbGQ7XG4gICAgICAgIHZhciByZWFsRmlyc3RDaGlsZEluZGV4O1xuICAgICAgICB2YXIgdHJlZSA9ICh0aGlzLl9mcmFnUm9vdCkgPyB0aGlzLl9mcmFnUm9vdCA6IHRoaXMudHJlZTtcbiAgICAgICAgdmFyIHBhcmVudCA9IHRyZWUucGFyZW50Tm9kZTtcbiAgICAgICAgaWYgKHRyZWUgPT0gbnVsbClcbiAgICAgICAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcignQ2Fubm90IGludmFsaWRhdGUgYSB2aWV3IHRoYXQgaGFzIG5vdCBiZWVuIHJlbmRlcmVkIScpO1xuICAgICAgICBpZiAodHJlZS5wYXJlbnROb2RlID09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoJ0F0dGVtcHQgdG8gaW52YWxpZGF0ZSBhIHZpZXcgdGhhdCBoYXMgbm90IGJlZW4gaW5zZXJ0ZWQgdG8gRE9NIScpO1xuICAgICAgICBjaGlsZHMgPSB0cmVlLnBhcmVudE5vZGUuY2hpbGRyZW47XG4gICAgICAgIC8vZm9yIHNvbWUgcmVhc29uIHRoZSByZWZlcmVuY2Ugc3RvcmVkIGRvZXMgbm90IGhhdmUgdGhlIGNvcnJlY3QgcGFyZW50IG5vZGUuXG4gICAgICAgIC8vd2UgZG8gdGhpcyB0byBnZXQgYSAnbGl2ZScgdmVyc2lvbiBvZiB0aGUgbm9kZS5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHMubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICBpZiAoY2hpbGRzW2ldID09PSB0cmVlKSB7XG4gICAgICAgICAgICAgICAgcmVhbEZpcnN0Q2hpbGQgPSBjaGlsZHNbaV07XG4gICAgICAgICAgICAgICAgcmVhbEZpcnN0Q2hpbGRJbmRleCA9IGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIHBhcmVudC5yZXBsYWNlQ2hpbGQodGhpcy5yZW5kZXIoKSwgcmVhbEZpcnN0Q2hpbGQpO1xuICAgIH07XG4gICAgQXBwVmlldy5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmlkcyA9IHt9O1xuICAgICAgICB0aGlzLndpZGdldHMuZm9yRWFjaChmdW5jdGlvbiAodykgeyByZXR1cm4gdy5yZW1vdmVkKCk7IH0pO1xuICAgICAgICB0aGlzLndpZGdldHMgPSBbXTtcbiAgICAgICAgdGhpcy5fZnJhZ1Jvb3QgPSBudWxsO1xuICAgICAgICB0aGlzLnRyZWUgPSB0aGlzLnRlbXBsYXRlKHRoaXMsIHRoaXMuY29udGV4dCk7XG4gICAgICAgIHRoaXMuaWRzWydyb290J10gPSAodGhpcy5pZHNbJ3Jvb3QnXSkgPyB0aGlzLmlkc1sncm9vdCddIDogdGhpcy50cmVlO1xuICAgICAgICBpZiAodGhpcy50cmVlLm5vZGVOYW1lID09PSAoZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpKS5ub2RlTmFtZSlcbiAgICAgICAgICAgIHRoaXMuX2ZyYWdSb290ID0gdGhpcy50cmVlLmZpcnN0Q2hpbGQ7XG4gICAgICAgIHRoaXMud2lkZ2V0cy5mb3JFYWNoKGZ1bmN0aW9uICh3KSB7IHJldHVybiB3LnJlbmRlcmVkKCk7IH0pO1xuICAgICAgICByZXR1cm4gdGhpcy50cmVlO1xuICAgIH07XG4gICAgcmV0dXJuIEFwcFZpZXc7XG59KCkpO1xuZXhwb3J0cy5BcHBWaWV3ID0gQXBwVmlldztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIGxlZnQgd3JhcHMgYSB2YWx1ZSBvbiB0aGUgbGVmdCBzaWRlLlxuICovXG5leHBvcnRzLmxlZnQgPSBmdW5jdGlvbiAoYSkgeyByZXR1cm4gbmV3IExlZnQoYSk7IH07XG4vKipcbiAqIHJpZ2h0IHdyYXBzIGEgdmFsdWUgb24gdGhlIHJpZ2h0IHNpZGUuXG4gKi9cbmV4cG9ydHMucmlnaHQgPSBmdW5jdGlvbiAoYikgeyByZXR1cm4gbmV3IFJpZ2h0KGIpOyB9O1xuLyoqXG4gKiBmcm9tQm9vbGVhbiBjb25zdHJ1Y3RzIGFuIEVpdGhlciB1c2luZyBhIGJvb2xlYW4gdmFsdWUuXG4gKi9cbmV4cG9ydHMuZnJvbUJvb2xlYW4gPSBmdW5jdGlvbiAoYikge1xuICAgIHJldHVybiBiID8gZXhwb3J0cy5yaWdodCh0cnVlKSA6IGV4cG9ydHMubGVmdChmYWxzZSk7XG59O1xuLyoqXG4gKiBFaXRoZXIgbW9uYWQgaW1wbGVtZW50YXRpb25cbiAqL1xudmFyIEVpdGhlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRWl0aGVyKCkge1xuICAgIH1cbiAgICBFaXRoZXIucHJvdG90eXBlLm9mID0gZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBSaWdodCh2KTtcbiAgICB9O1xuICAgIEVpdGhlci5sZWZ0ID0gZXhwb3J0cy5sZWZ0O1xuICAgIEVpdGhlci5yaWdodCA9IGV4cG9ydHMucmlnaHQ7XG4gICAgRWl0aGVyLmZyb21Cb29sZWFuID0gZXhwb3J0cy5mcm9tQm9vbGVhbjtcbiAgICByZXR1cm4gRWl0aGVyO1xufSgpKTtcbmV4cG9ydHMuRWl0aGVyID0gRWl0aGVyO1xudmFyIExlZnQgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhMZWZ0LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIExlZnQobCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5sID0gbDtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBMZWZ0LnByb3RvdHlwZS5tYXAgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICByZXR1cm4gbmV3IExlZnQodGhpcy5sKTtcbiAgICB9O1xuICAgIExlZnQucHJvdG90eXBlLm1hcExlZnQgPSBmdW5jdGlvbiAoZikge1xuICAgICAgICByZXR1cm4gbmV3IExlZnQoZih0aGlzLmwpKTtcbiAgICB9O1xuICAgIExlZnQucHJvdG90eXBlLmJpbWFwID0gZnVuY3Rpb24gKGYsIF8pIHtcbiAgICAgICAgcmV0dXJuIGV4cG9ydHMubGVmdChmKHRoaXMubCkpO1xuICAgIH07XG4gICAgTGVmdC5wcm90b3R5cGUuY2hhaW4gPSBmdW5jdGlvbiAoXykge1xuICAgICAgICByZXR1cm4gbmV3IExlZnQodGhpcy5sKTtcbiAgICB9O1xuICAgIExlZnQucHJvdG90eXBlLm9yRWxzZSA9IGZ1bmN0aW9uIChmKSB7XG4gICAgICAgIHJldHVybiBmKHRoaXMubCk7XG4gICAgfTtcbiAgICBMZWZ0LnByb3RvdHlwZS5vclJpZ2h0ID0gZnVuY3Rpb24gKGYpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBSaWdodChmKHRoaXMubCkpO1xuICAgIH07XG4gICAgTGVmdC5wcm90b3R5cGUuYXAgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICByZXR1cm4gbmV3IExlZnQodGhpcy5sKTtcbiAgICB9O1xuICAgIExlZnQucHJvdG90eXBlLnRha2VMZWZ0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sO1xuICAgIH07XG4gICAgTGVmdC5wcm90b3R5cGUudGFrZVJpZ2h0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiTm90IHJpZ2h0IVwiKTtcbiAgICB9O1xuICAgIExlZnQucHJvdG90eXBlLmNhdGEgPSBmdW5jdGlvbiAoZiwgXykge1xuICAgICAgICByZXR1cm4gZih0aGlzLmwpO1xuICAgIH07XG4gICAgcmV0dXJuIExlZnQ7XG59KEVpdGhlcikpO1xuZXhwb3J0cy5MZWZ0ID0gTGVmdDtcbnZhciBSaWdodCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFJpZ2h0LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFJpZ2h0KHIpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuciA9IHI7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgUmlnaHQucHJvdG90eXBlLm1hcCA9IGZ1bmN0aW9uIChmKSB7XG4gICAgICAgIHJldHVybiBuZXcgUmlnaHQoZih0aGlzLnIpKTtcbiAgICB9O1xuICAgIFJpZ2h0LnByb3RvdHlwZS5tYXBMZWZ0ID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBSaWdodCh0aGlzLnIpO1xuICAgIH07XG4gICAgUmlnaHQucHJvdG90eXBlLmJpbWFwID0gZnVuY3Rpb24gKF8sIGcpIHtcbiAgICAgICAgcmV0dXJuIGV4cG9ydHMucmlnaHQoZyh0aGlzLnIpKTtcbiAgICB9O1xuICAgIFJpZ2h0LnByb3RvdHlwZS5jaGFpbiA9IGZ1bmN0aW9uIChmKSB7XG4gICAgICAgIHJldHVybiBmKHRoaXMucik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBvckVsc2UgcmV0dXJucyB0aGUgcmVzdWx0IG9mIGYgaWYgdGhlIEVpdGhlciBpcyBsZWZ0LlxuICAgICAqL1xuICAgIFJpZ2h0LnByb3RvdHlwZS5vckVsc2UgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIFJpZ2h0LnByb3RvdHlwZS5vclJpZ2h0ID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBhcFxuICAgICAqL1xuICAgIFJpZ2h0LnByb3RvdHlwZS5hcCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHJldHVybiBlLm1hcChmdW5jdGlvbiAoZikgeyByZXR1cm4gZihfdGhpcy5yKTsgfSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgICogdGFrZUxlZnQgZXh0cmFjdHMgdGhlIGxlZnQgdmFsdWUgb2YgYW4gRWl0aGVyLCB0aHJvd2luZyBhbiBlcnJvciBpZiB0aGUgRWl0aGVyIGlzIHJpZ2h0LlxuICAgICAgKi9cbiAgICBSaWdodC5wcm90b3R5cGUudGFrZUxlZnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJOb3QgbGVmdCFcIik7XG4gICAgfTtcbiAgICBSaWdodC5wcm90b3R5cGUudGFrZVJpZ2h0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogY2F0YVxuICAgICAqL1xuICAgIFJpZ2h0LnByb3RvdHlwZS5jYXRhID0gZnVuY3Rpb24gKF8sIGcpIHtcbiAgICAgICAgcmV0dXJuIGcodGhpcy5yKTtcbiAgICB9O1xuICAgIHJldHVybiBSaWdodDtcbn0oRWl0aGVyKSk7XG5leHBvcnRzLlJpZ2h0ID0gUmlnaHQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1FaXRoZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBFaXRoZXJfMSA9IHJlcXVpcmUoXCIuL0VpdGhlclwiKTtcbi8qKlxuICoganVzdCB3cmFwcyBhIHZhbHVlIGluIGEgSnVzdFxuICovXG5leHBvcnRzLmp1c3QgPSBmdW5jdGlvbiAoYSkgeyByZXR1cm4gbmV3IEp1c3QoYSk7IH07XG47XG4vKipcbiAqIG5vdGhpbmcgY29uc3RydWN0cyBub3RoaW5nXG4gKi9cbmV4cG9ydHMubm90aGluZyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBOb3RoaW5nKCk7IH07XG4vKipcbiAqIGZyb21BbnkgY29uc3RydWN0cyBhIE1heWJlIGZyb20gYSB2YWx1ZSB0aGF0IG1heSBiZSBudWxsLlxuICovXG5leHBvcnRzLmZyb21BbnkgPSBmdW5jdGlvbiAoYSkgeyByZXR1cm4gYSA9PSBudWxsID8gZXhwb3J0cy5ub3RoaW5nKCkgOiBleHBvcnRzLmp1c3QoYSk7IH07XG4vKipcbiAqIGZyb21BcnJheSBjaGVja3MgYW4gYXJyYXkgdG8gc2VlIGlmIGl0J3MgZW1wdHkgKG9yIGZ1bGwgb2YgbnVsbHMpXG4gKiBhbmQgcmV0dXJucyBhIE1heWJlLlxuICovXG5leHBvcnRzLmZyb21BcnJheSA9IGZ1bmN0aW9uIChhKSB7XG4gICAgcmV0dXJuICgoYS5sZW5ndGggPT09IDApIHx8IChhLnJlZHVjZShmdW5jdGlvbiAoYywgdikgeyByZXR1cm4gKHYgPT0gbnVsbCkgPyBjICsgMSA6IGM7IH0sIDApID09PSBhLmxlbmd0aCkpID9cbiAgICAgICAgZXhwb3J0cy5ub3RoaW5nKCkgOiBleHBvcnRzLmp1c3QoYSk7XG59O1xuLyoqXG4gKiBmcm9tT0JqZWN0IHVzZXMgT2JqZWN0LmtleXMgdG8gdHVybiBzZWUgaWYgYW4gb2JqZWN0IGhhcyBhbnkgb3duIHByb3BlcnRpZXMuXG4gKi9cbmV4cG9ydHMuZnJvbU9iamVjdCA9IGZ1bmN0aW9uIChvKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKG8pLmxlbmd0aCA9PT0gMCA/IGV4cG9ydHMubm90aGluZygpIDogZXhwb3J0cy5qdXN0KG8pO1xufTtcbi8qKlxuICogZnJvbVN0cmluZyBjb25zdHJ1Y3RzIG5vdGhpbmcgaWYgdGhlIHN0cmluZyBpcyBlbXB0eSBvciBqdXN0IG90aGVyd2lzZS5cbiAqL1xuZXhwb3J0cy5mcm9tU3RyaW5nID0gZnVuY3Rpb24gKHMpIHtcbiAgICByZXR1cm4gKHMgPT09ICcnKSA/IGV4cG9ydHMubm90aGluZygpIDogZXhwb3J0cy5qdXN0KHMpO1xufTtcbi8qKlxuICogZnJvbUJvb2xlYW4gY29uc3RydWN0cyBub3RoaW5nIGlmIGIgaXMgZmFsc2UsIGp1c3Qgb3RoZXJ3aXNlXG4gKi9cbmV4cG9ydHMuZnJvbUJvb2xlYW4gPSBmdW5jdGlvbiAoYikge1xuICAgIHJldHVybiAoYiA9PT0gZmFsc2UpID8gZXhwb3J0cy5ub3RoaW5nKCkgOiBleHBvcnRzLmp1c3QoYik7XG59O1xuLyoqXG4gKiBmcm9tTnVtYmVyIGNvbnN0cnVjdHMgbm90aGluZyBpZiBuIGlzIDAganVzdCBvdGhlcndpc2UuXG4gKi9cbmV4cG9ydHMuZnJvbU51bWJlciA9IGZ1bmN0aW9uIChuKSB7XG4gICAgcmV0dXJuIChuID09PSAwKSA/IGV4cG9ydHMubm90aGluZygpIDogZXhwb3J0cy5qdXN0KG4pO1xufTtcbi8qKlxuICogTWF5YmVcbiAqL1xudmFyIE1heWJlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBNYXliZSgpIHtcbiAgICB9XG4gICAgTWF5YmUucHJvdG90eXBlLm9mID0gZnVuY3Rpb24gKGEpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBKdXN0KGEpO1xuICAgIH07XG4gICAgTWF5YmUuanVzdCA9IGV4cG9ydHMuanVzdDtcbiAgICBNYXliZS5ub3RoaW5nID0gZXhwb3J0cy5ub3RoaW5nO1xuICAgIE1heWJlLmZyb21BbnkgPSBleHBvcnRzLmZyb21Bbnk7XG4gICAgTWF5YmUuZnJvbU9iamVjdCA9IGV4cG9ydHMuZnJvbU9iamVjdDtcbiAgICBNYXliZS5mcm9tQXJyYXkgPSBleHBvcnRzLmZyb21BcnJheTtcbiAgICBNYXliZS5mcm9tU3RyaW5nID0gZXhwb3J0cy5mcm9tU3RyaW5nO1xuICAgIE1heWJlLmZyb21Cb29sZWFuID0gZXhwb3J0cy5mcm9tQm9vbGVhbjtcbiAgICBNYXliZS5mcm9tTnVtYmVyID0gZXhwb3J0cy5mcm9tTnVtYmVyO1xuICAgIHJldHVybiBNYXliZTtcbn0oKSk7XG5leHBvcnRzLk1heWJlID0gTWF5YmU7XG4vKipcbiAqIE5vdGhpbmdcbiAqL1xudmFyIE5vdGhpbmcgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhOb3RoaW5nLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIE5vdGhpbmcoKSB7XG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICB9XG4gICAgTm90aGluZy5wcm90b3R5cGUubWFwID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBOb3RoaW5nKCk7XG4gICAgfTtcbiAgICBOb3RoaW5nLnByb3RvdHlwZS5jaGFpbiA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIHJldHVybiBuZXcgTm90aGluZygpO1xuICAgIH07XG4gICAgTm90aGluZy5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgZ2V0IGFueXRoaW5nIGZyb20gTm90aGluZyEnKTtcbiAgICB9O1xuICAgIE5vdGhpbmcucHJvdG90eXBlLm9yRWxzZSA9IGZ1bmN0aW9uIChmKSB7XG4gICAgICAgIHJldHVybiBmKCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBvckp1c3Qgd2lsbCB0dXJuIE5vdGhpbmcgaW50byBKdXN0LCB3cmFwcGluZyB0aGUgdmFsdWUgc3BlY2lmaWVkLlxuICAgICAqL1xuICAgIE5vdGhpbmcucHJvdG90eXBlLm9ySnVzdCA9IGZ1bmN0aW9uIChmKSB7XG4gICAgICAgIHJldHVybiBleHBvcnRzLmp1c3QoZigpKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIGNhdGEgYXBwbGllcyB0aGUgY29ycmVzcG9uZGluZyBmdW5jdGlvbiB0byB0aGUgTWF5YmVcbiAgICAgKi9cbiAgICBOb3RoaW5nLnByb3RvdHlwZS5jYXRhID0gZnVuY3Rpb24gKGYsIF9nKSB7XG4gICAgICAgIHJldHVybiBmKCk7XG4gICAgfTtcbiAgICBOb3RoaW5nLnByb3RvdHlwZS50b0VpdGhlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIEVpdGhlcl8xLmxlZnQodW5kZWZpbmVkKTtcbiAgICB9O1xuICAgIHJldHVybiBOb3RoaW5nO1xufShNYXliZSkpO1xuZXhwb3J0cy5Ob3RoaW5nID0gTm90aGluZztcbi8qKlxuICogSnVzdFxuICovXG52YXIgSnVzdCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEp1c3QsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gSnVzdChhKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLmEgPSBhO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIEp1c3QucHJvdG90eXBlLm1hcCA9IGZ1bmN0aW9uIChmKSB7XG4gICAgICAgIHJldHVybiBuZXcgSnVzdChmKHRoaXMuYSkpO1xuICAgIH07XG4gICAgSnVzdC5wcm90b3R5cGUuam9pbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYTtcbiAgICB9O1xuICAgIEp1c3QucHJvdG90eXBlLmNoYWluID0gZnVuY3Rpb24gKGYpIHtcbiAgICAgICAgcmV0dXJuIGYodGhpcy5hKTtcbiAgICB9O1xuICAgIEp1c3QucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYTtcbiAgICB9O1xuICAgIEp1c3QucHJvdG90eXBlLm9yRWxzZSA9IGZ1bmN0aW9uIChfZikge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIEp1c3QucHJvdG90eXBlLm9ySnVzdCA9IGZ1bmN0aW9uIChfZikge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIEp1c3QucHJvdG90eXBlLmNhdGEgPSBmdW5jdGlvbiAoX2YsIGcpIHtcbiAgICAgICAgcmV0dXJuIGcodGhpcy5hKTtcbiAgICB9O1xuICAgIEp1c3QucHJvdG90eXBlLnRvRWl0aGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gRWl0aGVyXzEucmlnaHQodGhpcy5hKTtcbiAgICB9O1xuICAgIHJldHVybiBKdXN0O1xufShNYXliZSkpO1xuZXhwb3J0cy5KdXN0ID0gSnVzdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPU1heWJlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZnVuY3Rpb24gYm91bmRhcnlfdG9fZG90KHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlLnNwbGl0KCddWycpLmpvaW4oJy4nKS5zcGxpdCgnWycpLmpvaW4oJy4nKTtcbn1cbmZ1bmN0aW9uIHN0cmlwX2JyYWNlcyh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZS5zcGxpdCgnWycpLmpvaW4oJy4nKS5zcGxpdCgnXScpLmpvaW4oJycpO1xufVxuZnVuY3Rpb24gZXNjYXBlX2RvdHModmFsdWUpIHtcbiAgICB2YXIgdmFsID0gdmFsdWUuc3BsaXQoJ1xcJycpO1xuICAgIHJldHVybiAodmFsLmxlbmd0aCA8IDMpID8gdmFsLmpvaW4oJ1xcJycpIDogdmFsLm1hcChmdW5jdGlvbiAoc2VnKSB7XG4gICAgICAgIGlmIChzZWcubGVuZ3RoIDwgMylcbiAgICAgICAgICAgIHJldHVybiBzZWc7XG4gICAgICAgIGlmICgoc2VnWzBdID09PSAnLicpIHx8IChzZWdbc2VnLmxlbmd0aCAtIDFdID09PSAnLicpKVxuICAgICAgICAgICAgcmV0dXJuIHNlZztcbiAgICAgICAgcmV0dXJuIHNlZy5zcGxpdCgnLicpLmpvaW4oJyYmJyk7XG4gICAgfSkuam9pbignJyk7XG59XG5mdW5jdGlvbiB1bmVzY2FwZV9kb3RzKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlLnNwbGl0KCcmJicpLmpvaW4oJy4nKTtcbn1cbmZ1bmN0aW9uIHBhcnRpZnkodmFsdWUpIHtcbiAgICBpZiAoIXZhbHVlKVxuICAgICAgICByZXR1cm47XG4gICAgcmV0dXJuIGVzY2FwZV9kb3RzKHN0cmlwX2JyYWNlcyhib3VuZGFyeV90b19kb3QoJycgKyB2YWx1ZSkpKS5zcGxpdCgnLicpO1xufVxuZnVuY3Rpb24gY2FuQ2xvbmUobykge1xuICAgIHJldHVybiAodHlwZW9mIG8uX19DTE9ORV9fID09PSAnZnVuY3Rpb24nKTtcbn1cbmZ1bmN0aW9uIGNsb25lKG8pIHtcbiAgICBpZiAoKHR5cGVvZiBvICE9PSAnb2JqZWN0JykgfHwgKG8gPT09IG51bGwpKVxuICAgICAgICByZXR1cm4gbztcbiAgICBpZiAoQXJyYXkuaXNBcnJheShvKSlcbiAgICAgICAgcmV0dXJuIG8ubWFwKGNsb25lKTtcbiAgICByZXR1cm4gKGNhbkNsb25lKG8pKSA/XG4gICAgICAgIG8uX19DTE9ORV9fKGNsb25lKSA6IChvLmNvbnN0cnVjdG9yICE9PSBPYmplY3QpID8gbyA6XG4gICAgICAgIE9iamVjdC5rZXlzKG8pLnJlZHVjZShmdW5jdGlvbiAocHJlLCBrKSB7XG4gICAgICAgICAgICBwcmVba10gPSAodHlwZW9mIG9ba10gPT09ICdvYmplY3QnKSA/XG4gICAgICAgICAgICAgICAgY2xvbmUob1trXSkgOiBvW2tdO1xuICAgICAgICAgICAgcmV0dXJuIHByZTtcbiAgICAgICAgfSwge30pO1xufVxuZnVuY3Rpb24gZ2V0KHBhdGgsIG8pIHtcbiAgICB2YXIgcGFydHMgPSBwYXJ0aWZ5KHBhdGgpO1xuICAgIHZhciBmaXJzdDtcbiAgICBpZiAodHlwZW9mIG8gPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGlmIChwYXJ0cy5sZW5ndGggPT09IDEpXG4gICAgICAgICAgICByZXR1cm4gb1t1bmVzY2FwZV9kb3RzKHBhcnRzWzBdKV07XG4gICAgICAgIGlmIChwYXJ0cy5sZW5ndGggPT09IDApXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGZpcnN0ID0gb1twYXJ0cy5zaGlmdCgpXTtcbiAgICAgICAgcmV0dXJuICgodHlwZW9mIG8gPT09ICdvYmplY3QnKSAmJiAobyAhPT0gbnVsbCkpID9cbiAgICAgICAgICAgIHBhcnRzLnJlZHVjZShmdW5jdGlvbiAodGFyZ2V0LCBwcm9wKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldCA9PSBudWxsKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXRbdW5lc2NhcGVfZG90cyhwcm9wKV07XG4gICAgICAgICAgICB9LCBmaXJzdCkgOiBudWxsO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZ2V0KCk6IGV4cGVjdHMgYW4gb2JqZWN0IGdvdCAnICsgdHlwZW9mIG8pO1xuICAgIH1cbn1cbmV4cG9ydHMuZ2V0ID0gZ2V0O1xuO1xuZnVuY3Rpb24gc2V0KHBhdGgsIHZhbHVlLCBvYmopIHtcbiAgICB2YXIgcGFydHMgPSBwYXJ0aWZ5KHBhdGgpO1xuICAgIGlmICgodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHx8IChvYmogPT0gbnVsbCkpIHtcbiAgICAgICAgcmV0dXJuIGNsb25lKG9iaik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gX3NldChvYmosIHZhbHVlLCBwYXJ0cyk7XG4gICAgfVxufVxuZXhwb3J0cy5zZXQgPSBzZXQ7XG47XG5mdW5jdGlvbiBfc2V0KG9iaiwgdmFsdWUsIHBhcnRzKSB7XG4gICAgdmFyIG87XG4gICAgdmFyIGs7XG4gICAgaWYgKHBhcnRzLmxlbmd0aCA9PT0gMClcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIG8gPSAoKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB8fCAob2JqID09PSBudWxsKSkgPyB7fSA6IGNsb25lKG9iaik7XG4gICAgayA9IHVuZXNjYXBlX2RvdHMocGFydHNbMF0pO1xuICAgIG9ba10gPSBfc2V0KG9ba10sIHZhbHVlLCBwYXJ0cy5zbGljZSgxKSk7XG4gICAgcmV0dXJuIG87XG59XG5mdW5jdGlvbiBkZWZhdWx0XzEoaywgdiwgbykge1xuICAgIGlmIChvID09IG51bGwpXG4gICAgICAgIHJldHVybiBnZXQoaywgdik7XG4gICAgZWxzZVxuICAgICAgICByZXR1cm4gc2V0KGssIHYsIG8pO1xufVxuZXhwb3J0cy5kZWZhdWx0ID0gZGVmYXVsdF8xO1xuO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIl19
