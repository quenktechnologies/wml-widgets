(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var landing = require("./wml/landing");
var views = require("./wml/views");
var app_1 = require("./wml/app");
var navigation_1 = require("./wml/navigation");
var App = /** @class */ (function () {
    function App() {
        var _this = this;
        /**
         * page currently displayed.
         */
        this.page = '';
        /**
         * views to show the user.
         */
        this.views = {
            panels: new views.PanelScreen(this)
        };
        /**
         * navigation view
         */
        this.navigation = new navigation_1.Navigation(this);
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
        this.content = new landing.Main(this);
        /**
         * toggleDrawer
         */
        this.toggleDrawer = function () {
            _this
                .view
                .findById(_this.values.id.layout)
                .map(function (d) { return d.toggleDrawer(); });
        };
        this.navigate = function (_a) {
            var name = _a.name;
            _this.page = name;
            if (_this.views.hasOwnProperty(name))
                _this.content = _this.views[name];
            _this.view.invalidate();
            _this.navigation.invalidate();
        };
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

},{"./wml/app":2,"./wml/landing":3,"./wml/navigation":4,"./wml/views":5}],2:[function(require,module,exports){
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
var $wml = require("@quenk/wml");
var Drawer_1 = require("@package/self/layout/drawer/Drawer");
;
var ActionBar_1 = require("@package/self/app/action-bar/ActionBar");
;
;
var IconButton_1 = require("@package/self/control/icon-button/IconButton");
;
var Dash_1 = require("@package/self/control/dash/Dash");
;
var Main_1 = require("@package/self/layout/main/Main");
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(context) {
        var _this = _super.call(this, context) || this;
        _this.template = function (___context, ___view) {
            return $wml.widget(Drawer_1.Drawer, {
                html: {},
                wml: {
                    id: ___context.values.id.layout
                },
                ww: {
                    drawer: ___context.navigation
                }
            }, [$wml.widget(ActionBar_1.ActionBar, {
                    html: {},
                    wml: {}
                }, [$wml.widget(IconButton_1.IconButton, {
                        html: {},
                        wml: {},
                        ww: {
                            onClick: ___context.toggleDrawer
                        }
                    }, [$wml.widget(Dash_1.Dash, {
                            html: {},
                            wml: {}
                        }, [], ___view), $wml.widget(Dash_1.Dash, {
                            html: {},
                            wml: {}
                        }, [], ___view), $wml.widget(Dash_1.Dash, {
                            html: {},
                            wml: {}
                        }, [], ___view)], ___view)], ___view), $wml.widget(Main_1.Main, {
                    html: {},
                    wml: {}
                }, [$wml.domify(___context.content.render())], ___view)], ___view);
        };
        return _this;
    }
    return Main;
}($wml.AppView));
exports.Main = Main;

},{"@package/self/app/action-bar/ActionBar":6,"@package/self/control/dash/Dash":11,"@package/self/control/icon-button/IconButton":13,"@package/self/layout/drawer/Drawer":17,"@package/self/layout/main/Main":21,"@quenk/wml":39}],3:[function(require,module,exports){
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
var $wml = require("@quenk/wml");
var Grid_1 = require("@package/self/layout/grid/Grid");
;
var Panel_1 = require("@package/self/layout/panel/Panel");
;
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(context) {
        var _this = _super.call(this, context) || this;
        _this.template = function (___context, ___view) {
            return $wml.widget(Grid_1.Grid, {
                html: {},
                wml: {}
            }, [$wml.widget(Grid_1.Row, {
                    html: {},
                    wml: {}
                }, [$wml.widget(Grid_1.Column, {
                        html: {},
                        wml: {},
                        ww: {
                            size: 4
                        }
                    }, [$wml.widget(Panel_1.Panel, {
                            html: {},
                            wml: {}
                        }, [$wml.widget(Panel_1.Header, {
                                html: {},
                                wml: {}
                            }, [$wml.text("Funding")], ___view), $wml.widget(Panel_1.Body, {
                                html: {},
                                wml: {}
                            }, [$wml.text("$742.00")], ___view)], ___view)], ___view), $wml.widget(Grid_1.Column, {
                        html: {},
                        wml: {},
                        ww: {
                            size: 4
                        }
                    }, [$wml.widget(Panel_1.Panel, {
                            html: {},
                            wml: {}
                        }, [$wml.widget(Panel_1.Header, {
                                html: {},
                                wml: {}
                            }, [$wml.text("Clients")], ___view), $wml.widget(Panel_1.Body, {
                                html: {},
                                wml: {}
                            }, [$wml.text("3")], ___view)], ___view)], ___view)], ___view)], ___view);
        };
        return _this;
    }
    return Main;
}($wml.AppView));
exports.Main = Main;

},{"@package/self/layout/grid/Grid":19,"@package/self/layout/panel/Panel":23,"@quenk/wml":39}],4:[function(require,module,exports){
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
var $wml = require("@quenk/wml");
;
var List_1 = require("@package/self/nav/list/List");
;
var Item_1 = require("@package/self/nav/list/Item");
;
var Link_1 = require("@package/self/nav/link/Link");
;
var Text_1 = require("@package/self/nav/list/Text");
var Navigation = /** @class */ (function (_super) {
    __extends(Navigation, _super);
    function Navigation(context) {
        var _this = _super.call(this, context) || this;
        _this.template = function (___context, ___view) {
            return $wml.widget(List_1.List, {
                html: {},
                wml: {}
            }, [$wml.widget(Item_1.Item, {
                    html: {},
                    wml: {}
                }, [$wml.widget(Link_1.Link, {
                        html: {},
                        wml: {
                            group: "links"
                        },
                        ww: {
                            active: (___context.page === "home"),
                            name: "home",
                            onClick: ___context.navigate,
                            text: "Home"
                        }
                    }, [], ___view)], ___view), $wml.widget(Item_1.Item, {
                    html: {},
                    wml: {}
                }, [$wml.widget(Text_1.Text, {
                        html: {},
                        wml: {},
                        ww: {
                            text: "Layout"
                        }
                    }, [], ___view), $wml.widget(List_1.List, {
                        html: {},
                        wml: {}
                    }, [$wml.widget(Item_1.Item, {
                            html: {},
                            wml: {}
                        }, [$wml.widget(Link_1.Link, {
                                html: {},
                                wml: {
                                    group: "links"
                                },
                                ww: {
                                    name: "panels",
                                    onClick: ___context.navigate,
                                    active: (___context.page === "panels"),
                                    text: "Panels"
                                }
                            }, [], ___view)], ___view)], ___view)], ___view), $wml.widget(Item_1.Item, {
                    html: {},
                    wml: {}
                }, [$wml.widget(Link_1.Link, {
                        html: {},
                        wml: {
                            group: "links"
                        },
                        ww: {
                            name: "tables",
                            onClick: ___context.navigate,
                            active: (___context.page === "tables"),
                            text: "Tables"
                        }
                    }, [], ___view)], ___view)], ___view);
        };
        return _this;
    }
    return Navigation;
}($wml.AppView));
exports.Navigation = Navigation;

},{"@package/self/nav/link/Link":25,"@package/self/nav/list/Item":28,"@package/self/nav/list/List":29,"@package/self/nav/list/Text":30,"@quenk/wml":39}],5:[function(require,module,exports){
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
var $wml = require("@quenk/wml");
var PanelScreen = /** @class */ (function (_super) {
    __extends(PanelScreen, _super);
    function PanelScreen(context) {
        var _this = _super.call(this, context) || this;
        _this.template = function (___context, ___view) {
            return $wml.node('b', {
                html: {},
                wml: {}
            }, [$wml.text("Panel")], ___view);
        };
        return _this;
    }
    return PanelScreen;
}($wml.AppView));
exports.PanelScreen = PanelScreen;

},{"@quenk/wml":39}],6:[function(require,module,exports){
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
var Group_1 = require("@package/self/content/Group");
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
}(Group_1.Group));
exports.ActionBar = ActionBar;

},{"./wml/action_bar":7,"@package/self/common/names":8,"@package/self/common/util":9,"@package/self/content/Group":10}],7:[function(require,module,exports){
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
var $wml = require("@quenk/wml");
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(context) {
        var _this = _super.call(this, context) || this;
        _this.template = function (___context, ___view) {
            return $wml.node('div', {
                html: {
                    class: ___context.values.class.root
                },
                wml: {}
            }, [$wml.node('div', {
                    html: {
                        class: ___context.values.class.content
                    },
                    wml: {
                        id: ___context.values.id.content
                    }
                }, [$wml.domify(___context.children)], ___view)], ___view);
        };
        return _this;
    }
    return Main;
}($wml.AppView));
exports.Main = Main;

},{"@quenk/wml":39}],8:[function(require,module,exports){
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
 * open indicates an open state in collapsable widgets
 */
exports.OPEN = '-open';
/**
 * PUSHABLE is used by other styles to move an element around.
 */
exports.PUSHABLE = '-pushable';
/**
 * FIXED_PUSHABLE is like PUSHABLE but used for fixed elements.
 */
exports.FIXED_PUSHABLE = '-fixed-pushable';
/**
 * NO_HOVER indicates hover effects should be disabled.
 */
exports.NO_HOVER = '-no-hover';
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
 * ACTION_BAR_CONTENT classes
 */
exports.ACTION_BAR_CONTENT = 'ww-action-bar__content';
/**
 * BUTTON_MENU classes
 */
exports.BUTTON_MENU = 'ww-button-menu';
/**
 * BUTTON_MENU_BUTTON classes
 */
exports.BUTTON_MENU_BUTTON = exports.BUTTON_MENU + "__button";
/**
 * BUTTON_MENU_MENU classes
 */
exports.BUTTON_MENU_MENU = exports.BUTTON_MENU_BUTTON + "__menu";
exports.MAIN_VIEW = 'ww-main-view';
/**
 * MENU classes
 */
exports.MENU = 'ww-menu';
/**
 * MENU_BUTTON clasess for the MenuButton.
 */
exports.MENU_BUTTON = 'ww-menu-button';
/**
 * DASH classes
 */
exports.DASH = 'ww-dash';
/**
 * NAV classes
 */
exports.NAV = 'ww-nav';
/**
 * NAV_LINK classes
 */
exports.NAV_LINK = 'ww-nav-link';
/**
 * NAV_LIST classes
 */
exports.NAV_LIST = 'ww-nav-list';
/**
 * NAV_LIST_ITEM classes
 */
exports.NAV_LIST_ITEM = 'ww-nav-list__item';
/**
 * NAV_LIST_ITEM_TEXT classes
 */
exports.NAV_LIST_ITEM_TEXT = 'ww-nav-list__item__text';
exports.BUTTON = 'ww-button';
exports.BUTTON_GROUP = 'ww-button-group';
//@todo: refactor this to be inline with other class names
exports.GRID = 'container-fluid';
exports.GRID_COL = '';
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

},{}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
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

},{"@quenk/wml-runtime":34}],11:[function(require,module,exports){
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
var dash_1 = require("./wml/dash");
/**
 * Dash are literal horizontal dashes.
 *
 * These can be used with app/menu/Button to create 'hamburger' menus.
 */
var Dash = /** @class */ (function (_super) {
    __extends(Dash, _super);
    function Dash() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new dash_1.Main(_this);
        _this.values = {
            class: {
                root: names.DASH
            }
        };
        return _this;
    }
    return Dash;
}(wml_runtime_1.Component));
exports.Dash = Dash;

},{"./wml/dash":12,"@package/self/common/names":8,"@quenk/wml-runtime":34}],12:[function(require,module,exports){
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
var $wml = require("@quenk/wml");
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(context) {
        var _this = _super.call(this, context) || this;
        _this.template = function (___context, ___view) {
            return $wml.node('div', {
                html: {
                    class: ___context.values.class.root
                },
                wml: {}
            }, [], ___view);
        };
        return _this;
    }
    return Main;
}($wml.AppView));
exports.Main = Main;

},{"@quenk/wml":39}],13:[function(require,module,exports){
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
var icon_button_1 = require("./wml/icon-button");
/**
 * IconButton provides a 'hamburger' menu button.
 */
var IconButton = /** @class */ (function (_super) {
    __extends(IconButton, _super);
    function IconButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new icon_button_1.Main(_this);
        _this.values = {
            class: {
                root: names.MENU_BUTTON
            }
        };
        return _this;
    }
    return IconButton;
}(wml_runtime_1.Component));
exports.IconButton = IconButton;

},{"./wml/icon-button":14,"@package/self/common/names":8,"@quenk/wml-runtime":34}],14:[function(require,module,exports){
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
var $wml = require("@quenk/wml");
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(context) {
        var _this = _super.call(this, context) || this;
        _this.template = function (___context, ___view) {
            return $wml.node('button', {
                html: {
                    class: ___context.values.class.root,
                    onclick: $wml.read("ww:onClick", ___context.attrs)
                },
                wml: {}
            }, [$wml.domify(___context.children)], ___view);
        };
        return _this;
    }
    return Main;
}($wml.AppView));
exports.Main = Main;

},{"@quenk/wml":39}],15:[function(require,module,exports){
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
var Group_1 = require("@package/self/content/Group");
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
}(Group_1.Group));
exports.Aside = Aside;

},{"./wml/aside":16,"@package/self/common/names":8,"@package/self/content/Group":10}],16:[function(require,module,exports){
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
var $wml = require("@quenk/wml");
;
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(context) {
        var _this = _super.call(this, context) || this;
        _this.template = function (___context, ___view) {
            return $wml.node('div', {
                html: {
                    class: ___context.values.class.root
                },
                wml: {
                    id: ___context.values.id.root
                }
            }, [$wml.node('div', {
                    html: {
                        class: ___context.values.class.content
                    },
                    wml: {}
                }, [$wml.ifthen($wml.read("ww:content", ___context.attrs), function then() {
                        return $wml.domify($wml.read("ww:content", ___context.attrs).render());
                    }, function else_clause() {
                        return $wml.domify(___context.children);
                    })], ___view)], ___view);
        };
        return _this;
    }
    return Main;
}($wml.AppView));
exports.Main = Main;

},{"@quenk/wml":39}],17:[function(require,module,exports){
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
var Group_1 = require("@package/self/content/Group");
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
}(Group_1.Group));
exports.Drawer = Drawer;

},{"./wml/drawer":18,"@package/self/common/names":8,"@package/self/content/Group":10}],18:[function(require,module,exports){
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
var $wml = require("@quenk/wml");
var Aside_1 = require("@package/self/layout/aside/Aside");
;
;
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(context) {
        var _this = _super.call(this, context) || this;
        _this.template = function (___context, ___view) {
            return $wml.node('div', {
                html: {
                    class: ___context.values.class.root
                },
                wml: {
                    id: ___context.values.id.root
                }
            }, [$wml.widget(Aside_1.Aside, {
                    html: {},
                    wml: {
                        id: ___context.values.id.drawer
                    },
                    ww: {
                        content: $wml.read("ww:drawer", ___context.attrs)
                    }
                }, [], ___view), $wml.ifthen(___context.content, function then() {
                    return $wml.domify(___context.content);
                }, function elseif() {
                    return $wml.ifthen($wml.read("ww:content", ___context.attrs), function then() {
                        return $wml.domify(___context.attrs.ww.content.render());
                    }, function else_clause() {
                        return $wml.domify(___context.children);
                    });
                })], ___view);
        };
        return _this;
    }
    return Main;
}($wml.AppView));
exports.Main = Main;

},{"@package/self/layout/aside/Aside":15,"@quenk/wml":39}],19:[function(require,module,exports){
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
var views = require("./wml/grid");
var wml_1 = require("@quenk/wml");
var util_1 = require("@package/self/common/util");
;
/**
 * Grid
 */
var Grid = /** @class */ (function (_super) {
    __extends(Grid, _super);
    function Grid() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Grid(_this);
        _this.values = {
            class: {
                root: names.GRID
            }
        };
        return _this;
    }
    return Grid;
}(wml_1.Component));
exports.Grid = Grid;
var Row = /** @class */ (function (_super) {
    __extends(Row, _super);
    function Row() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Row(_this);
        _this.values = {
            class: {
                root: names.GRID_ROW
            }
        };
        return _this;
    }
    return Row;
}(wml_1.Component));
exports.Row = Row;
var Column = /** @class */ (function (_super) {
    __extends(Column, _super);
    function Column() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Column(_this);
        _this.values = {
            class: {
                root: _this.attrs.ww ? util_1.concat(_this.attrs.ww.size ?
                    "col-md-" + _this.attrs.ww.size : 'col-md-12', _this.attrs.ww.class) : 'col-md-12'
            }
        };
        return _this;
    }
    return Column;
}(wml_1.Component));
exports.Column = Column;

},{"./wml/grid":20,"@package/self/common/names":8,"@package/self/common/util":9,"@quenk/wml":39}],20:[function(require,module,exports){
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
var $wml = require("@quenk/wml");
var Grid = /** @class */ (function (_super) {
    __extends(Grid, _super);
    function Grid(context) {
        var _this = _super.call(this, context) || this;
        _this.template = function (___context, ___view) {
            return $wml.node('section', {
                html: {
                    class: ___context.values.class.root
                },
                wml: {}
            }, [$wml.domify(___context.children)], ___view);
        };
        return _this;
    }
    return Grid;
}($wml.AppView));
exports.Grid = Grid;
;
var Row = /** @class */ (function (_super) {
    __extends(Row, _super);
    function Row(context) {
        var _this = _super.call(this, context) || this;
        _this.template = function (___context, ___view) {
            return $wml.node('div', {
                html: {
                    class: ___context.values.class.root
                },
                wml: {}
            }, [$wml.domify(___context.children)], ___view);
        };
        return _this;
    }
    return Row;
}($wml.AppView));
exports.Row = Row;
;
var Column = /** @class */ (function (_super) {
    __extends(Column, _super);
    function Column(context) {
        var _this = _super.call(this, context) || this;
        _this.template = function (___context, ___view) {
            return $wml.node('div', {
                html: {
                    class: ___context.values.class.root
                },
                wml: {}
            }, [$wml.domify(___context.children)], ___view);
        };
        return _this;
    }
    return Column;
}($wml.AppView));
exports.Column = Column;

},{"@quenk/wml":39}],21:[function(require,module,exports){
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
var views = require("./wml/main");
var names = require("@package/self/common/names");
var util_1 = require("@package/self/common/util");
var Group_1 = require("@package/self/content/Group");
/**
 * Main provides a container for the main content of an application.
 */
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.values = {
            class: {
                root: util_1.concat(names.MAIN_VIEW, names.PUSHABLE, _this.attrs.ww ? _this.attrs.ww.class : '')
            }
        };
        return _this;
    }
    return Main;
}(Group_1.Group));
exports.Main = Main;

},{"./wml/main":22,"@package/self/common/names":8,"@package/self/common/util":9,"@package/self/content/Group":10}],22:[function(require,module,exports){
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
var $wml = require("@quenk/wml");
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(context) {
        var _this = _super.call(this, context) || this;
        _this.template = function (___context, ___view) {
            return $wml.node('div', {
                html: {
                    class: ___context.values.class.root
                },
                wml: {}
            }, [$wml.domify(___context.children)], ___view);
        };
        return _this;
    }
    return Main;
}($wml.AppView));
exports.Main = Main;

},{"@quenk/wml":39}],23:[function(require,module,exports){
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
var views = require("./wml/panel");
var wml_1 = require("@quenk/wml");
var util_1 = require("@package/self/common/util");
var Panel = /** @class */ (function (_super) {
    __extends(Panel, _super);
    function Panel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Panel(_this);
        _this.values = {
            class: {
                root: util_1.concat(names.PANEL, _this.attrs.ww ?
                    _this.attrs.ww.style : names.DEFAULT)
            }
        };
        return _this;
    }
    return Panel;
}(wml_1.Component));
exports.Panel = Panel;
var Header = /** @class */ (function (_super) {
    __extends(Header, _super);
    function Header() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Header(_this);
        _this.values = {
            class: {
                root: names.PANEL_HEADER
            }
        };
        return _this;
    }
    return Header;
}(wml_1.Component));
exports.Header = Header;
var Body = /** @class */ (function (_super) {
    __extends(Body, _super);
    function Body() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Body(_this);
        _this.values = {
            class: {
                root: names.PANEL_BODY
            }
        };
        return _this;
    }
    return Body;
}(wml_1.Component));
exports.Body = Body;
var Footer = /** @class */ (function (_super) {
    __extends(Footer, _super);
    function Footer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Footer(_this);
        _this.values = {
            class: {
                root: names.PANEL_FOOTER
            }
        };
        return _this;
    }
    return Footer;
}(wml_1.Component));
exports.Footer = Footer;

},{"./wml/panel":24,"@package/self/common/names":8,"@package/self/common/util":9,"@quenk/wml":39}],24:[function(require,module,exports){
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
var $wml = require("@quenk/wml");
var Panel = /** @class */ (function (_super) {
    __extends(Panel, _super);
    function Panel(context) {
        var _this = _super.call(this, context) || this;
        _this.template = function (___context, ___view) {
            return $wml.node('div', {
                html: {
                    class: ___context.values.class.root
                },
                wml: {}
            }, [$wml.domify(___context.children)], ___view);
        };
        return _this;
    }
    return Panel;
}($wml.AppView));
exports.Panel = Panel;
;
var Header = /** @class */ (function (_super) {
    __extends(Header, _super);
    function Header(context) {
        var _this = _super.call(this, context) || this;
        _this.template = function (___context, ___view) {
            return $wml.node('div', {
                html: {
                    class: ___context.values.class.root
                },
                wml: {}
            }, [$wml.domify(___context.children)], ___view);
        };
        return _this;
    }
    return Header;
}($wml.AppView));
exports.Header = Header;
;
var Body = /** @class */ (function (_super) {
    __extends(Body, _super);
    function Body(context) {
        var _this = _super.call(this, context) || this;
        _this.template = function (___context, ___view) {
            return $wml.node('div', {
                html: {
                    class: ___context.values.class.root
                },
                wml: {}
            }, [$wml.domify(___context.children)], ___view);
        };
        return _this;
    }
    return Body;
}($wml.AppView));
exports.Body = Body;
;
var Footer = /** @class */ (function (_super) {
    __extends(Footer, _super);
    function Footer(context) {
        var _this = _super.call(this, context) || this;
        _this.template = function (___context, ___view) {
            return $wml.node('div', {
                html: {
                    class: ___context.values.class.root
                },
                wml: {}
            }, [$wml.domify(___context.children)], ___view);
        };
        return _this;
    }
    return Footer;
}($wml.AppView));
exports.Footer = Footer;

},{"@quenk/wml":39}],25:[function(require,module,exports){
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
var wml = require("@quenk/wml");
var names = require("@package/self/common/names");
var views = require("./wml/link");
var LinkClickedEvent_1 = require("./LinkClickedEvent");
var util_1 = require("@package/self/common/util");
/**
 * Link generates an <a> element.
 */
var Link = /** @class */ (function (_super) {
    __extends(Link, _super);
    function Link() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        /**
         * name assigned to this Link.
         */
        _this.name = (_this.attrs.ww && _this.attrs.ww.name) ?
            _this.attrs.ww.name : '';
        /**
         * title assigned to this Link.
         */
        _this.title = (_this.attrs.ww && _this.attrs.ww.title) ?
            _this.attrs.ww.title : '';
        /**
         * href assigned to this link
         */
        _this.href = (_this.attrs.ww && _this.attrs.ww.href) ?
            _this.attrs.ww.href : '';
        _this.values = {
            id: {
                root: 'root'
            },
            class: {
                root: util_1.concat(names.NAV_LINK, _this.attrs.ww ? _this.attrs.ww.class : '', (_this.attrs.ww && _this.attrs.ww.active) ?
                    names.ACTIVE : '')
            },
            a: {
                title: (_this.attrs.ww && _this.attrs.ww.title) ?
                    _this.attrs.ww.title : null,
                name: (_this.attrs.ww && _this.attrs.ww.name) ?
                    _this.attrs.ww.name : null,
                href: (_this.attrs.ww && _this.attrs.ww.href) ?
                    _this.attrs.ww.href : '#',
                active: (_this.attrs.ww && _this.attrs.ww.active) ?
                    _this.attrs.ww.active : false
            }
        };
        _this.clicked = function (e) {
            if (_this.attrs.ww) {
                var _a = _this.attrs.ww, name_1 = _a.name, href = _a.href, onClick = _a.onClick;
                if (!href)
                    e.preventDefault();
                if (onClick)
                    onClick(new LinkClickedEvent_1.LinkClickedEvent(name_1, href));
            }
        };
        return _this;
    }
    /**
      * activate this nav list Item.
      */
    Link.prototype.activate = function () {
        this.view.findById(this.values.id.root)
            .map(function (w) {
            w.classList.remove(names.ACTIVE);
            w.classList.add(names.ACTIVE);
        });
    };
    /**
     * inactivate this nav list item.
     */
    Link.prototype.inactivate = function () {
        this.view.findById(this.values.id.root)
            .map(function (w) { return w.classList.remove(names.ACTIVE); });
    };
    return Link;
}(wml.Component));
exports.Link = Link;

},{"./LinkClickedEvent":26,"./wml/link":27,"@package/self/common/names":8,"@package/self/common/util":9,"@quenk/wml":39}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * LinkClickedEvent indicates a link has been clicked.
 */
var LinkClickedEvent = /** @class */ (function () {
    function LinkClickedEvent(name, href) {
        this.name = name;
        this.href = href;
    }
    return LinkClickedEvent;
}());
exports.LinkClickedEvent = LinkClickedEvent;

},{}],27:[function(require,module,exports){
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
var $wml = require("@quenk/wml");
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(context) {
        var _this = _super.call(this, context) || this;
        _this.template = function (___context, ___view) {
            return $wml.node('a', {
                html: {
                    class: ___context.values.class.root,
                    href: ___context.values.a.href,
                    name: ___context.values.a.name,
                    title: ___context.values.a.title,
                    onclick: ___context.clicked
                },
                wml: {}
            }, [$wml.ifthen($wml.read("ww:text", ___context.attrs), function then() {
                    return $wml.domify($wml.read("ww:text", ___context.attrs));
                }, function else_clause() {
                    return $wml.domify(___context.children);
                })], ___view);
        };
        return _this;
    }
    return Main;
}($wml.AppView));
exports.Main = Main;

},{"@quenk/wml":39}],28:[function(require,module,exports){
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
var views = require("./wml/item");
var wml = require("@quenk/wml");
var util_1 = require("@package/self/common/util");
/**
 * Item wraps content in a navigation list.
 *
 * Items should not have any siblings that are not other Items.
 */
var Item = /** @class */ (function (_super) {
    __extends(Item, _super);
    function Item() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.values = {
            id: {
                root: 'root'
            },
            class: {
                root: util_1.concat(names.NAV_LIST_ITEM, (_this.attrs.ww && _this.attrs.ww.active) ? names.ACTIVE : null)
            }
        };
        return _this;
    }
    /**
     * activate this nav list Item.
     */
    Item.prototype.activate = function () {
        this.view.findById(this.values.id.root)
            .map(function (w) {
            w.classList.remove(names.ACTIVE);
            w.classList.add(names.ACTIVE);
        });
    };
    /**
     * inactivate this nav list item.
     */
    Item.prototype.inactivate = function () {
        this.view.findById(this.values.id.root)
            .map(function (w) { return w.classList.remove(names.ACTIVE); });
    };
    return Item;
}(wml.Component));
exports.Item = Item;

},{"./wml/item":31,"@package/self/common/names":8,"@package/self/common/util":9,"@quenk/wml":39}],29:[function(require,module,exports){
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
var views = require("./wml/list");
var wml = require("@quenk/wml");
/**
 * List of navigation links.
 */
var List = /** @class */ (function (_super) {
    __extends(List, _super);
    function List() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.values = {
            class: {
                root: util.concat(names.NAV_LIST, _this.attrs.ww ? _this.attrs.ww.class : '')
            }
        };
        return _this;
    }
    return List;
}(wml.Component));
exports.List = List;

},{"./wml/list":32,"@package/self/common/names":8,"@package/self/common/util":9,"@quenk/wml":39}],30:[function(require,module,exports){
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
var views = require("./wml/text");
var wml = require("@quenk/wml");
var util_1 = require("@package/self/common/util");
/**
 * Text can be used to display non-clickable heading text in a nav list.
 */
var Text = /** @class */ (function (_super) {
    __extends(Text, _super);
    function Text() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.values = {
            class: {
                root: util_1.concat(names.NAV_LIST_ITEM_TEXT, _this.attrs.ww ? _this.attrs.ww.class : '')
            },
            text: (_this.attrs.ww && _this.attrs.ww.text) ?
                _this.attrs.ww.text : null
        };
        return _this;
    }
    return Text;
}(wml.Component));
exports.Text = Text;

},{"./wml/text":33,"@package/self/common/names":8,"@package/self/common/util":9,"@quenk/wml":39}],31:[function(require,module,exports){
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
var $wml = require("@quenk/wml");
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(context) {
        var _this = _super.call(this, context) || this;
        _this.template = function (___context, ___view) {
            return $wml.node('li', {
                html: {
                    class: ___context.values.class.root
                },
                wml: {}
            }, [$wml.domify(___context.children)], ___view);
        };
        return _this;
    }
    return Main;
}($wml.AppView));
exports.Main = Main;

},{"@quenk/wml":39}],32:[function(require,module,exports){
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
var $wml = require("@quenk/wml");
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(context) {
        var _this = _super.call(this, context) || this;
        _this.template = function (___context, ___view) {
            return $wml.node('ul', {
                html: {
                    class: ___context.values.class.root
                },
                wml: {}
            }, [$wml.domify(___context.children)], ___view);
        };
        return _this;
    }
    return Main;
}($wml.AppView));
exports.Main = Main;

},{"@quenk/wml":39}],33:[function(require,module,exports){
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
var $wml = require("@quenk/wml");
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(context) {
        var _this = _super.call(this, context) || this;
        _this.template = function (___context, ___view) {
            return $wml.node('span', {
                html: {
                    class: ___context.values.class.root
                },
                wml: {}
            }, [$wml.ifthen(___context.values.text, function then() {
                    return $wml.domify(___context.values.text);
                }, function else_clause() {
                    return $wml.domify(___context.children);
                })], ___view);
        };
        return _this;
    }
    return Main;
}($wml.AppView));
exports.Main = Main;

},{"@quenk/wml":39}],34:[function(require,module,exports){
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

},{"afpl/lib/monad/Maybe":50,"property-seek":55}],35:[function(require,module,exports){
"use strict";
/**
 * Types corresponding to the WML AST.
 */
Object.defineProperty(exports, "__esModule", { value: true });
;
/**
 * Module is what a wml file compiles to.
 *
 * A module contains a list of imports and exported symbols.
 * All declarations in wml are exported. There is no such thing
 * as private here.
 */
var Module = /** @class */ (function () {
    function Module(imports, exports, main, location) {
        this.imports = imports;
        this.exports = exports;
        this.main = main;
        this.location = location;
        this.type = 'module';
    }
    return Module;
}());
exports.Module = Module;
/**
 * ImportStatement
 */
var ImportStatement = /** @class */ (function () {
    function ImportStatement(member, module, location) {
        this.member = member;
        this.module = module;
        this.location = location;
        this.type = 'import-statement';
    }
    return ImportStatement;
}());
exports.ImportStatement = ImportStatement;
/**
 * AliasedMember
 * @property {Identifier} alias - The identifier introduced to scope.
 * @property {Identifier} member - The identifier that is aliased.
 */
var AliasedMember = /** @class */ (function () {
    function AliasedMember(member, alias, location) {
        this.member = member;
        this.alias = alias;
        this.location = location;
        this.type = 'aliased-member';
    }
    return AliasedMember;
}());
exports.AliasedMember = AliasedMember;
/**
 * AggregateMember
 */
var AggregateMember = /** @class */ (function () {
    function AggregateMember(id, location) {
        this.id = id;
        this.location = location;
        this.type = 'qualified-member';
    }
    return AggregateMember;
}());
exports.AggregateMember = AggregateMember;
/**
 * CompositeMember
 * @property {...Identifier|Aliased_Member} members
 */
var CompositeMember = /** @class */ (function () {
    function CompositeMember(members, location) {
        this.members = members;
        this.location = location;
        this.type = 'composite-member';
    }
    return CompositeMember;
}());
exports.CompositeMember = CompositeMember;
var TypedMain = /** @class */ (function () {
    function TypedMain(id, typeClasses, context, parameters, tag, location) {
        this.id = id;
        this.typeClasses = typeClasses;
        this.context = context;
        this.parameters = parameters;
        this.tag = tag;
        this.location = location;
        this.type = 'typed-main';
    }
    return TypedMain;
}());
exports.TypedMain = TypedMain;
var UntypedMain = /** @class */ (function () {
    function UntypedMain(tag, location) {
        this.tag = tag;
        this.location = location;
        this.type = 'untyped-main';
    }
    return UntypedMain;
}());
exports.UntypedMain = UntypedMain;
var ExportStatement = /** @class */ (function () {
    function ExportStatement(members, module, location) {
        this.members = members;
        this.module = module;
        this.location = location;
        this.type = 'export-statement';
    }
    return ExportStatement;
}());
exports.ExportStatement = ExportStatement;
/**
 * ViewStatement
 */
var ViewStatement = /** @class */ (function () {
    function ViewStatement(id, typeClasses, context, parameters, tag, location) {
        this.id = id;
        this.typeClasses = typeClasses;
        this.context = context;
        this.parameters = parameters;
        this.tag = tag;
        this.location = location;
        this.type = 'view-statement';
    }
    return ViewStatement;
}());
exports.ViewStatement = ViewStatement;
var FunStatement = /** @class */ (function () {
    function FunStatement(id, typeClasses, context, parameters, body, location) {
        this.id = id;
        this.typeClasses = typeClasses;
        this.context = context;
        this.parameters = parameters;
        this.body = body;
        this.location = location;
        this.type = 'fun-statement';
    }
    return FunStatement;
}());
exports.FunStatement = FunStatement;
/**
 * TypeClass
 */
var TypeClass = /** @class */ (function () {
    function TypeClass(id, constraint, location) {
        this.id = id;
        this.constraint = constraint;
        this.location = location;
        this.type = 'type-class';
    }
    return TypeClass;
}());
exports.TypeClass = TypeClass;
var Type = /** @class */ (function () {
    function Type(id, typeClasses, list, location) {
        this.id = id;
        this.typeClasses = typeClasses;
        this.list = list;
        this.location = location;
        this.type = 'type';
    }
    return Type;
}());
exports.Type = Type;
var TypedParameter = /** @class */ (function () {
    function TypedParameter(id, hint, location) {
        this.id = id;
        this.hint = hint;
        this.location = location;
        this.type = 'typed-parameter';
    }
    return TypedParameter;
}());
exports.TypedParameter = TypedParameter;
var UntypedParameter = /** @class */ (function () {
    function UntypedParameter(id, location) {
        this.id = id;
        this.location = location;
        this.type = 'untyped-parameter';
    }
    return UntypedParameter;
}());
exports.UntypedParameter = UntypedParameter;
var Node = /** @class */ (function () {
    function Node(open, attributes, children, close) {
        this.open = open;
        this.attributes = attributes;
        this.children = children;
        this.close = close;
        this.type = 'node';
    }
    return Node;
}());
exports.Node = Node;
var Widget = /** @class */ (function () {
    function Widget(open, attributes, children, close) {
        this.open = open;
        this.attributes = attributes;
        this.children = children;
        this.close = close;
        this.type = 'widget';
    }
    return Widget;
}());
exports.Widget = Widget;
var Attribute = /** @class */ (function () {
    function Attribute(namespace, name, value, location) {
        this.namespace = namespace;
        this.name = name;
        this.value = value;
        this.location = location;
        this.type = 'attribute';
    }
    return Attribute;
}());
exports.Attribute = Attribute;
var Interpolation = /** @class */ (function () {
    function Interpolation(expression, filters, location) {
        this.expression = expression;
        this.filters = filters;
        this.location = location;
        this.type = 'interpolation';
    }
    return Interpolation;
}());
exports.Interpolation = Interpolation;
var ForStatement = /** @class */ (function () {
    function ForStatement(variable, index, all, list, body, otherwise, location) {
        this.variable = variable;
        this.index = index;
        this.all = all;
        this.list = list;
        this.body = body;
        this.otherwise = otherwise;
        this.location = location;
        this.type = 'for-statement';
    }
    return ForStatement;
}());
exports.ForStatement = ForStatement;
var IfStatement = /** @class */ (function () {
    function IfStatement(condition, then, elseClause, location) {
        this.condition = condition;
        this.then = then;
        this.elseClause = elseClause;
        this.location = location;
        this.type = 'if-statement';
    }
    return IfStatement;
}());
exports.IfStatement = IfStatement;
var ElseClause = /** @class */ (function () {
    function ElseClause(children, location) {
        this.children = children;
        this.location = location;
        this.type = 'else-clause';
    }
    return ElseClause;
}());
exports.ElseClause = ElseClause;
var ElseIfClause = /** @class */ (function () {
    function ElseIfClause(condition, then, elseClause, location) {
        this.condition = condition;
        this.then = then;
        this.elseClause = elseClause;
        this.location = location;
        this.type = 'else-if-clause';
    }
    return ElseIfClause;
}());
exports.ElseIfClause = ElseIfClause;
var Characters = /** @class */ (function () {
    function Characters(value, location) {
        this.value = value;
        this.location = location;
        this.type = 'characters';
    }
    return Characters;
}());
exports.Characters = Characters;
var IfThenExpression = /** @class */ (function () {
    function IfThenExpression(condition, iftrue, iffalse, location) {
        this.condition = condition;
        this.iftrue = iftrue;
        this.iffalse = iffalse;
        this.location = location;
        this.type = 'if-then-expression';
    }
    return IfThenExpression;
}());
exports.IfThenExpression = IfThenExpression;
var BinaryExpression = /** @class */ (function () {
    function BinaryExpression(left, operator, right, location) {
        this.left = left;
        this.operator = operator;
        this.right = right;
        this.location = location;
        this.type = 'binary-expression';
    }
    return BinaryExpression;
}());
exports.BinaryExpression = BinaryExpression;
var UnaryExpression = /** @class */ (function () {
    function UnaryExpression(operator, expression) {
        this.operator = operator;
        this.expression = expression;
        this.type = 'unary-expression';
    }
    return UnaryExpression;
}());
exports.UnaryExpression = UnaryExpression;
var ViewConstruction = /** @class */ (function () {
    function ViewConstruction(cons, context, location) {
        this.cons = cons;
        this.context = context;
        this.location = location;
        this.type = 'view-construction';
    }
    return ViewConstruction;
}());
exports.ViewConstruction = ViewConstruction;
var FunApplication = /** @class */ (function () {
    function FunApplication(target, typeArgs, context, args, location) {
        this.target = target;
        this.typeArgs = typeArgs;
        this.context = context;
        this.args = args;
        this.location = location;
        this.type = 'fun-application';
    }
    return FunApplication;
}());
exports.FunApplication = FunApplication;
var ConstructExpression = /** @class */ (function () {
    function ConstructExpression(cons, args, location) {
        this.cons = cons;
        this.args = args;
        this.location = location;
        this.type = 'construct-expression';
    }
    return ConstructExpression;
}());
exports.ConstructExpression = ConstructExpression;
var CallExpression = /** @class */ (function () {
    function CallExpression(target, typeArgs, args, location) {
        this.target = target;
        this.typeArgs = typeArgs;
        this.args = args;
        this.location = location;
        this.type = 'call-expression';
    }
    return CallExpression;
}());
exports.CallExpression = CallExpression;
/**
 * MemberExpression
 */
var MemberExpression = /** @class */ (function () {
    function MemberExpression(target, member, location) {
        this.target = target;
        this.member = member;
        this.location = location;
    }
    return MemberExpression;
}());
exports.MemberExpression = MemberExpression;
var ReadExpression = /** @class */ (function () {
    function ReadExpression(target, path, hint, defaults, location) {
        this.target = target;
        this.path = path;
        this.hint = hint;
        this.defaults = defaults;
        this.location = location;
        this.type = 'read-expression';
    }
    return ReadExpression;
}());
exports.ReadExpression = ReadExpression;
var FunctionExpression = /** @class */ (function () {
    function FunctionExpression(parameters, body, location) {
        this.parameters = parameters;
        this.body = body;
        this.location = location;
        this.type = 'function-expression';
    }
    return FunctionExpression;
}());
exports.FunctionExpression = FunctionExpression;
var List = /** @class */ (function () {
    function List(members, location) {
        this.members = members;
        this.location = location;
        this.type = 'list';
    }
    return List;
}());
exports.List = List;
var Record = /** @class */ (function () {
    function Record(properties, location) {
        this.properties = properties;
        this.location = location;
        this.type = 'record';
    }
    return Record;
}());
exports.Record = Record;
var Property = /** @class */ (function () {
    function Property(key, value, location) {
        this.key = key;
        this.value = value;
        this.location = location;
        this.type = 'property';
    }
    return Property;
}());
exports.Property = Property;
var StringLiteral = /** @class */ (function () {
    function StringLiteral(value, location) {
        this.value = value;
        this.location = location;
        this.type = 'string';
    }
    return StringLiteral;
}());
exports.StringLiteral = StringLiteral;
var NumberLiteral = /** @class */ (function () {
    function NumberLiteral(value, location) {
        this.value = value;
        this.location = location;
        this.type = 'number-literal';
    }
    return NumberLiteral;
}());
exports.NumberLiteral = NumberLiteral;
var BooleanLiteral = /** @class */ (function () {
    function BooleanLiteral(value, location) {
        this.value = value;
        this.location = location;
        this.type = 'boolean-literal';
    }
    return BooleanLiteral;
}());
exports.BooleanLiteral = BooleanLiteral;
var ContextProperty = /** @class */ (function () {
    function ContextProperty(member, location) {
        this.member = member;
        this.location = location;
        this.type = 'context-property';
    }
    return ContextProperty;
}());
exports.ContextProperty = ContextProperty;
var ContextVariable = /** @class */ (function () {
    function ContextVariable(location) {
        this.location = location;
        this.type = 'context-variable';
    }
    return ContextVariable;
}());
exports.ContextVariable = ContextVariable;
var UnqualifiedConstructor = /** @class */ (function () {
    function UnqualifiedConstructor(id, location) {
        this.id = id;
        this.location = location;
        this.type = 'unqualified-constructor';
    }
    return UnqualifiedConstructor;
}());
exports.UnqualifiedConstructor = UnqualifiedConstructor;
var QualifiedConstructor = /** @class */ (function () {
    function QualifiedConstructor(qualifier, member, location) {
        this.qualifier = qualifier;
        this.member = member;
        this.location = location;
        this.type = 'qualified-constructor';
    }
    return QualifiedConstructor;
}());
exports.QualifiedConstructor = QualifiedConstructor;
var UnqualifiedIdentifier = /** @class */ (function () {
    function UnqualifiedIdentifier(id, location) {
        this.id = id;
        this.location = location;
        this.type = 'unqualified-identifier';
    }
    return UnqualifiedIdentifier;
}());
exports.UnqualifiedIdentifier = UnqualifiedIdentifier;
/**
 * QualifiedIdentifier
 */
var QualifiedIdentifier = /** @class */ (function () {
    function QualifiedIdentifier(qualifier, member, location) {
        this.qualifier = qualifier;
        this.member = member;
        this.location = location;
        this.type = 'qualified-identifier';
    }
    return QualifiedIdentifier;
}());
exports.QualifiedIdentifier = QualifiedIdentifier;

},{}],36:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path='Parser.d.ts' />
var Parser = require("./Parser");
var nodes = require("./AST");
var afpl = require("afpl");
var jsfmt = require("js-beautify");
var TypeScript = require("./TypeScript");
var afpl_1 = require("afpl");
var defaultOptions = {
    debug: false,
    main: 'Main',
    module: '@quenk/wml',
};
/**
 * parse a string as WML returning either an error or an AST.
 */
exports.parse = function (str, ast) {
    if (ast === void 0) { ast = nodes; }
    Parser.parser.yy = { ast: ast };
    try {
        return afpl_1.Either.right(Parser.parser.parse(str));
    }
    catch (e) {
        return afpl_1.Either.left(e);
    }
};
/**
 * pretty up the output.
 */
exports.pretty = function (doit) { return function (s) {
    return doit ? jsfmt(s, {}) : s;
}; };
/**
 * compile a string of WML turning it into typescript code.
 */
exports.compile = function (src, options) {
    if (options === void 0) { options = {}; }
    var opts = afpl.util.merge(defaultOptions, options);
    return exports.parse(src)
        .map(function (m) { return TypeScript.code(m, opts); })
        .map(exports.pretty(options.pretty));
};

},{"./AST":35,"./Parser":37,"./TypeScript":38,"afpl":41,"js-beautify":51}],37:[function(require,module,exports){

/* parser generated by jison 0.6.1-203 */

/*
 * Returns a Parser object of the following structure:
 *
 *  Parser: {
 *    yy: {}     The so-called "shared state" or rather the *source* of it;
 *               the real "shared state" `yy` passed around to
 *               the rule actions, etc. is a derivative/copy of this one,
 *               not a direct reference!
 *  }
 *
 *  Parser.prototype: {
 *    yy: {},
 *    EOF: 1,
 *    TERROR: 2,
 *
 *    trace: function(errorMessage, ...),
 *
 *    JisonParserError: function(msg, hash),
 *
 *    quoteName: function(name),
 *               Helper function which can be overridden by user code later on: put suitable
 *               quotes around literal IDs in a description string.
 *
 *    originalQuoteName: function(name),
 *               The basic quoteName handler provided by JISON.
 *               `cleanupAfterParse()` will clean up and reset `quoteName()` to reference this function
 *               at the end of the `parse()`.
 *
 *    describeSymbol: function(symbol),
 *               Return a more-or-less human-readable description of the given symbol, when
 *               available, or the symbol itself, serving as its own 'description' for lack
 *               of something better to serve up.
 *
 *               Return NULL when the symbol is unknown to the parser.
 *
 *    symbols_: {associative list: name ==> number},
 *    terminals_: {associative list: number ==> name},
 *    nonterminals: {associative list: rule-name ==> {associative list: number ==> rule-alt}},
 *    terminal_descriptions_: (if there are any) {associative list: number ==> description},
 *    productions_: [...],
 *
 *    performAction: function parser__performAction(yytext, yyleng, yylineno, yyloc, yystate, yysp, yyvstack, yylstack, yystack, yysstack),
 *
 *               The function parameters and `this` have the following value/meaning:
 *               - `this`    : reference to the `yyval` internal object, which has members (`$` and `_$`)
 *                             to store/reference the rule value `$$` and location info `@$`.
 *
 *                 One important thing to note about `this` a.k.a. `yyval`: every *reduce* action gets
 *                 to see the same object via the `this` reference, i.e. if you wish to carry custom
 *                 data from one reduce action through to the next within a single parse run, then you
 *                 may get nasty and use `yyval` a.k.a. `this` for storing you own semi-permanent data.
 *
 *                 `this.yy` is a direct reference to the `yy` shared state object.
 *
 *                 `%parse-param`-specified additional `parse()` arguments have been added to this `yy`
 *                 object at `parse()` start and are therefore available to the action code via the
 *                 same named `yy.xxxx` attributes (where `xxxx` represents a identifier name from
 *                 the %parse-param` list.
 *
 *               - `yytext`  : reference to the lexer value which belongs to the last lexer token used
 *                             to match this rule. This is *not* the look-ahead token, but the last token
 *                             that's actually part of this rule.
 *
 *                 Formulated another way, `yytext` is the value of the token immediately preceeding
 *                 the current look-ahead token.
 *                 Caveats apply for rules which don't require look-ahead, such as epsilon rules.
 *
 *               - `yyleng`  : ditto as `yytext`, only now for the lexer.yyleng value.
 *
 *               - `yylineno`: ditto as `yytext`, only now for the lexer.yylineno value.
 *
 *               - `yyloc`   : ditto as `yytext`, only now for the lexer.yylloc lexer token location info.
 *
 *                               WARNING: since jison 0.4.18-186 this entry may be NULL/UNDEFINED instead
 *                               of an empty object when no suitable location info can be provided.
 *
 *               - `yystate` : the current parser state number, used internally for dispatching and
 *                               executing the action code chunk matching the rule currently being reduced.
 *
 *               - `yysp`    : the current state stack position (a.k.a. 'stack pointer')
 *
 *                 This one comes in handy when you are going to do advanced things to the parser
 *                 stacks, all of which are accessible from your action code (see the next entries below).
 *
 *                 Also note that you can access this and other stack index values using the new double-hash
 *                 syntax, i.e. `##$ === ##0 === yysp`, while `##1` is the stack index for all things
 *                 related to the first rule term, just like you have `$1`, `@1` and `#1`.
 *                 This is made available to write very advanced grammar action rules, e.g. when you want
 *                 to investigate the parse state stack in your action code, which would, for example,
 *                 be relevant when you wish to implement error diagnostics and reporting schemes similar
 *                 to the work described here:
 *
 *                 + Pottier, F., 2016. Reachability and error diagnosis in LR(1) automata.
 *                   In Journées Francophones des Languages Applicatifs.
 *
 *                 + Jeffery, C.L., 2003. Generating LR syntax error messages from examples.
 *                   ACM Transactions on Programming Languages and Systems (TOPLAS), 25(5), pp.631–640.
 *
 *               - `yyrulelength`: the current rule's term count, i.e. the number of entries occupied on the stack.
 *
 *                 This one comes in handy when you are going to do advanced things to the parser
 *                 stacks, all of which are accessible from your action code (see the next entries below).
 *
 *               - `yyvstack`: reference to the parser value stack. Also accessed via the `$1` etc.
 *                             constructs.
 *
 *               - `yylstack`: reference to the parser token location stack. Also accessed via
 *                             the `@1` etc. constructs.
 *
 *                             WARNING: since jison 0.4.18-186 this array MAY contain slots which are
 *                             UNDEFINED rather than an empty (location) object, when the lexer/parser
 *                             action code did not provide a suitable location info object when such a
 *                             slot was filled!
 *
 *               - `yystack` : reference to the parser token id stack. Also accessed via the
 *                             `#1` etc. constructs.
 *
 *                 Note: this is a bit of a **white lie** as we can statically decode any `#n` reference to
 *                 its numeric token id value, hence that code wouldn't need the `yystack` but *you* might
 *                 want access this array for your own purposes, such as error analysis as mentioned above!
 *
 *                 Note that this stack stores the current stack of *tokens*, that is the sequence of
 *                 already parsed=reduced *nonterminals* (tokens representing rules) and *terminals*
 *                 (lexer tokens *shifted* onto the stack until the rule they belong to is found and
 *                 *reduced*.
 *
 *               - `yysstack`: reference to the parser state stack. This one carries the internal parser
 *                             *states* such as the one in `yystate`, which are used to represent
 *                             the parser state machine in the *parse table*. *Very* *internal* stuff,
 *                             what can I say? If you access this one, you're clearly doing wicked things
 *
 *               - `...`     : the extra arguments you specified in the `%parse-param` statement in your
 *                             grammar definition file.
 *
 *    table: [...],
 *               State transition table
 *               ----------------------
 *
 *               index levels are:
 *               - `state`  --> hash table
 *               - `symbol` --> action (number or array)
 *
 *                 If the `action` is an array, these are the elements' meaning:
 *                 - index [0]: 1 = shift, 2 = reduce, 3 = accept
 *                 - index [1]: GOTO `state`
 *
 *                 If the `action` is a number, it is the GOTO `state`
 *
 *    defaultActions: {...},
 *
 *    parseError: function(str, hash, ExceptionClass),
 *    yyError: function(str, ...),
 *    yyRecovering: function(),
 *    yyErrOk: function(),
 *    yyClearIn: function(),
 *
 *    constructParseErrorInfo: function(error_message, exception_object, expected_token_set, is_recoverable),
 *               Helper function **which will be set up during the first invocation of the `parse()` method**.
 *               Produces a new errorInfo 'hash object' which can be passed into `parseError()`.
 *               See it's use in this parser kernel in many places; example usage:
 *
 *                   var infoObj = parser.constructParseErrorInfo('fail!', null,
 *                                     parser.collect_expected_token_set(state), true);
 *                   var retVal = parser.parseError(infoObj.errStr, infoObj, parser.JisonParserError);
 *
 *    originalParseError: function(str, hash, ExceptionClass),
 *               The basic `parseError` handler provided by JISON.
 *               `cleanupAfterParse()` will clean up and reset `parseError()` to reference this function
 *               at the end of the `parse()`.
 *
 *    options: { ... parser %options ... },
 *
 *    parse: function(input[, args...]),
 *               Parse the given `input` and return the parsed value (or `true` when none was provided by
 *               the root action, in which case the parser is acting as a *matcher*).
 *               You MAY use the additional `args...` parameters as per `%parse-param` spec of this grammar:
 *               these extra `args...` are added verbatim to the `yy` object reference as member variables.
 *
 *               WARNING:
 *               Parser's additional `args...` parameters (via `%parse-param`) MAY conflict with
 *               any attributes already added to `yy` by the jison run-time;
 *               when such a collision is detected an exception is thrown to prevent the generated run-time
 *               from silently accepting this confusing and potentially hazardous situation!
 *
 *               The lexer MAY add its own set of additional parameters (via the `%parse-param` line in
 *               the lexer section of the grammar spec): these will be inserted in the `yy` shared state
 *               object and any collision with those will be reported by the lexer via a thrown exception.
 *
 *    cleanupAfterParse: function(resultValue, invoke_post_methods, do_not_nuke_errorinfos),
 *               Helper function **which will be set up during the first invocation of the `parse()` method**.
 *               This helper API is invoked at the end of the `parse()` call, unless an exception was thrown
 *               and `%options no-try-catch` has been defined for this grammar: in that case this helper MAY
 *               be invoked by calling user code to ensure the `post_parse` callbacks are invoked and
 *               the internal parser gets properly garbage collected under these particular circumstances.
 *
 *    yyMergeLocationInfo: function(first_index, last_index, first_yylloc, last_yylloc, dont_look_back),
 *               Helper function **which will be set up during the first invocation of the `parse()` method**.
 *               This helper API can be invoked to calculate a spanning `yylloc` location info object.
 *
 *               Note: %epsilon rules MAY specify no `first_index` and `first_yylloc`, in which case
 *               this function will attempt to obtain a suitable location marker by inspecting the location stack
 *               backwards.
 *
 *               For more info see the documentation comment further below, immediately above this function's
 *               implementation.
 *
 *    lexer: {
 *        yy: {...},           A reference to the so-called "shared state" `yy` once
 *                             received via a call to the `.setInput(input, yy)` lexer API.
 *        EOF: 1,
 *        ERROR: 2,
 *        JisonLexerError: function(msg, hash),
 *        parseError: function(str, hash, ExceptionClass),
 *        setInput: function(input, [yy]),
 *        input: function(),
 *        unput: function(str),
 *        more: function(),
 *        reject: function(),
 *        less: function(n),
 *        pastInput: function(n),
 *        upcomingInput: function(n),
 *        showPosition: function(),
 *        test_match: function(regex_match_array, rule_index, ...),
 *        next: function(...),
 *        lex: function(...),
 *        begin: function(condition),
 *        pushState: function(condition),
 *        popState: function(),
 *        topState: function(),
 *        _currentRules: function(),
 *        stateStackSize: function(),
 *        cleanupAfterLex: function()
 *
 *        options: { ... lexer %options ... },
 *
 *        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START, ...),
 *        rules: [...],
 *        conditions: {associative list: name ==> set},
 *    }
 *  }
 *
 *
 *  token location info (@$, _$, etc.): {
 *    first_line: n,
 *    last_line: n,
 *    first_column: n,
 *    last_column: n,
 *    range: [start_number, end_number]
 *               (where the numbers are indexes into the input string, zero-based)
 *  }
 *
 * ---
 *
 * The `parseError` function receives a 'hash' object with these members for lexer and
 * parser errors:
 *
 *  {
 *    text:        (matched text)
 *    token:       (the produced terminal token, if any)
 *    token_id:    (the produced terminal token numeric ID, if any)
 *    line:        (yylineno)
 *    loc:         (yylloc)
 *  }
 *
 * parser (grammar) errors will also provide these additional members:
 *
 *  {
 *    expected:    (array describing the set of expected tokens;
 *                  may be UNDEFINED when we cannot easily produce such a set)
 *    state:       (integer (or array when the table includes grammar collisions);
 *                  represents the current internal state of the parser kernel.
 *                  can, for example, be used to pass to the `collect_expected_token_set()`
 *                  API to obtain the expected token set)
 *    action:      (integer; represents the current internal action which will be executed)
 *    new_state:   (integer; represents the next/planned internal state, once the current
 *                  action has executed)
 *    recoverable: (boolean: TRUE when the parser MAY have an error recovery rule
 *                  available for this particular error)
 *    state_stack: (array: the current parser LALR/LR internal state stack; this can be used,
 *                  for instance, for advanced error analysis and reporting)
 *    value_stack: (array: the current parser LALR/LR internal `$$` value stack; this can be used,
 *                  for instance, for advanced error analysis and reporting)
 *    location_stack: (array: the current parser LALR/LR internal location stack; this can be used,
 *                  for instance, for advanced error analysis and reporting)
 *    yy:          (object: the current parser internal "shared state" `yy`
 *                  as is also available in the rule actions; this can be used,
 *                  for instance, for advanced error analysis and reporting)
 *    lexer:       (reference to the current lexer instance used by the parser)
 *    parser:      (reference to the current parser instance)
 *  }
 *
 * while `this` will reference the current parser instance.
 *
 * When `parseError` is invoked by the lexer, `this` will still reference the related *parser*
 * instance, while these additional `hash` fields will also be provided:
 *
 *  {
 *    lexer:       (reference to the current lexer instance which reported the error)
 *  }
 *
 * When `parseError` is invoked by the parser due to a **JavaScript exception** being fired
 * from either the parser or lexer, `this` will still reference the related *parser*
 * instance, while these additional `hash` fields will also be provided:
 *
 *  {
 *    exception:   (reference to the exception thrown)
 *  }
 *
 * Please do note that in the latter situation, the `expected` field will be omitted as
 * this type of failure is assumed not to be due to *parse errors* but rather due to user
 * action code in either parser or lexer failing unexpectedly.
 *
 * ---
 *
 * You can specify parser options by setting / modifying the `.yy` object of your Parser instance.
 * These options are available:
 *
 * ### options which are global for all parser instances
 *
 *  Parser.pre_parse: function(yy)
 *                 optional: you can specify a pre_parse() function in the chunk following
 *                 the grammar, i.e. after the last `%%`.
 *  Parser.post_parse: function(yy, retval, parseInfo) { return retval; }
 *                 optional: you can specify a post_parse() function in the chunk following
 *                 the grammar, i.e. after the last `%%`. When it does not return any value,
 *                 the parser will return the original `retval`.
 *
 * ### options which can be set up per parser instance
 *
 *  yy: {
 *      pre_parse:  function(yy)
 *                 optional: is invoked before the parse cycle starts (and before the first
 *                 invocation of `lex()`) but immediately after the invocation of
 *                 `parser.pre_parse()`).
 *      post_parse: function(yy, retval, parseInfo) { return retval; }
 *                 optional: is invoked when the parse terminates due to success ('accept')
 *                 or failure (even when exceptions are thrown).
 *                 `retval` contains the return value to be produced by `Parser.parse()`;
 *                 this function can override the return value by returning another.
 *                 When it does not return any value, the parser will return the original
 *                 `retval`.
 *                 This function is invoked immediately before `parser.post_parse()`.
 *
 *      parseError: function(str, hash, ExceptionClass)
 *                 optional: overrides the default `parseError` function.
 *      quoteName: function(name),
 *                 optional: overrides the default `quoteName` function.
 *  }
 *
 *  parser.lexer.options: {
 *      pre_lex:  function()
 *                 optional: is invoked before the lexer is invoked to produce another token.
 *                 `this` refers to the Lexer object.
 *      post_lex: function(token) { return token; }
 *                 optional: is invoked when the lexer has produced a token `token`;
 *                 this function can override the returned token value by returning another.
 *                 When it does not return any (truthy) value, the lexer will return
 *                 the original `token`.
 *                 `this` refers to the Lexer object.
 *
 *      ranges: boolean
 *                 optional: `true` ==> token location info will include a .range[] member.
 *      flex: boolean
 *                 optional: `true` ==> flex-like lexing behaviour where the rules are tested
 *                 exhaustively to find the longest match.
 *      backtrack_lexer: boolean
 *                 optional: `true` ==> lexer regexes are tested in order and for invoked;
 *                 the lexer terminates the scan when a token is returned by the action code.
 *      xregexp: boolean
 *                 optional: `true` ==> lexer rule regexes are "extended regex format" requiring the
 *                 `XRegExp` library. When this `%option` has not been specified at compile time, all lexer
 *                 rule regexes have been written as standard JavaScript RegExp expressions.
 *  }
 */

        
    
            var Parser = (function () {

// See also:
// http://stackoverflow.com/questions/1382107/whats-a-good-way-to-extend-error-in-javascript/#35881508
// but we keep the prototype.constructor and prototype.name assignment lines too for compatibility
// with userland code which might access the derived class in a 'classic' way.
function JisonParserError(msg, hash) {
    Object.defineProperty(this, 'name', {
        enumerable: false,
        writable: false,
        value: 'JisonParserError'
    });

    if (msg == null) msg = '???';

    Object.defineProperty(this, 'message', {
        enumerable: false,
        writable: true,
        value: msg
    });

    this.hash = hash;

    var stacktrace;
    if (hash && hash.exception instanceof Error) {
        var ex2 = hash.exception;
        this.message = ex2.message || msg;
        stacktrace = ex2.stack;
    }
    if (!stacktrace) {
        if (Error.hasOwnProperty('captureStackTrace')) {        // V8/Chrome engine
            Error.captureStackTrace(this, this.constructor);
        } else {
            stacktrace = (new Error(msg)).stack;
        }
    }
    if (stacktrace) {
        Object.defineProperty(this, 'stack', {
            enumerable: false,
            writable: false,
            value: stacktrace
        });
    }
}

if (typeof Object.setPrototypeOf === 'function') {
    Object.setPrototypeOf(JisonParserError.prototype, Error.prototype);
} else {
    JisonParserError.prototype = Object.create(Error.prototype);
}
JisonParserError.prototype.constructor = JisonParserError;
JisonParserError.prototype.name = 'JisonParserError';



        // helper: reconstruct the productions[] table
        function bp(s) {
            var rv = [];
            var p = s.pop;
            var r = s.rule;
            for (var i = 0, l = p.length; i < l; i++) {
                rv.push([
                    p[i],
                    r[i]
                ]);
            }
            return rv;
        }
    


        // helper: reconstruct the defaultActions[] table
        function bda(s) {
            var rv = {};
            var d = s.idx;
            var g = s.goto;
            for (var i = 0, l = d.length; i < l; i++) {
                var j = d[i];
                rv[j] = g[i];
            }
            return rv;
        }
    


        // helper: reconstruct the 'goto' table
        function bt(s) {
            var rv = [];
            var d = s.len;
            var y = s.symbol;
            var t = s.type;
            var a = s.state;
            var m = s.mode;
            var g = s.goto;
            for (var i = 0, l = d.length; i < l; i++) {
                var n = d[i];
                var q = {};
                for (var j = 0; j < n; j++) {
                    var z = y.shift();
                    switch (t.shift()) {
                    case 2:
                        q[z] = [
                            m.shift(),
                            g.shift()
                        ];
                        break;

                    case 0:
                        q[z] = a.shift();
                        break;

                    default:
                        // type === 1: accept
                        q[z] = [
                            3
                        ];
                    }
                }
                rv.push(q);
            }
            return rv;
        }
    


        // helper: runlength encoding with increment step: code, length: step (default step = 0)
        // `this` references an array
        function s(c, l, a) {
            a = a || 0;
            for (var i = 0; i < l; i++) {
                this.push(c);
                c += a;
            }
        }

        // helper: duplicate sequence from *relative* offset and length.
        // `this` references an array
        function c(i, l) {
            i = this.length - i;
            for (l += i; i < l; i++) {
                this.push(this[i]);
            }
        }

        // helper: unpack an array using helpers and data, all passed in an array argument 'a'.
        function u(a) {
            var rv = [];
            for (var i = 0, l = a.length; i < l; i++) {
                var e = a[i];
                // Is this entry a helper function?
                if (typeof e === 'function') {
                    i++;
                    e.apply(rv, a[i]);
                } else {
                    rv.push(e);
                }
            }
            return rv;
        }
    

var parser = {
    // Code Generator Information Report
    // ---------------------------------
    //
    // Options:
    //
    //   default action mode: ............. classic,merge
    //   no try..catch: ................... false
    //   no default resolve on conflict:    false
    //   on-demand look-ahead: ............ false
    //   error recovery token skip maximum: 3
    //   yyerror in parse actions is: ..... NOT recoverable,
    //   yyerror in lexer actions and other non-fatal lexer are:
    //   .................................. NOT recoverable,
    //   debug grammar/output: ............ false
    //   has partial LR conflict upgrade:   true
    //   rudimentary token-stack support:   false
    //   parser table compression mode: ... 2
    //   export debug tables: ............. false
    //   export *all* tables: ............. false
    //   module type: ..................... commonjs
    //   parser engine type: .............. lalr
    //   output main() in the module: ..... true
    //   has user-specified main(): ....... false
    //   has user-specified require()/import modules for main(): 
    //   .................................. false
    //   number of expected conflicts: .... 0
    //
    //
    // Parser Analysis flags:
    //
    //   no significant actions (parser is a language matcher only):
    //   .................................. false
    //   uses yyleng: ..................... false
    //   uses yylineno: ................... false
    //   uses yytext: ..................... false
    //   uses yylloc: ..................... false
    //   uses ParseError API: ............. false
    //   uses YYERROR: .................... false
    //   uses YYRECOVERING: ............... false
    //   uses YYERROK: .................... false
    //   uses YYCLEARIN: .................. false
    //   tracks rule values: .............. true
    //   assigns rule values: ............. true
    //   uses location tracking: .......... true
    //   assigns location: ................ true
    //   uses yystack: .................... false
    //   uses yysstack: ................... false
    //   uses yysp: ....................... true
    //   uses yyrulelength: ............... false
    //   uses yyMergeLocationInfo API: .... true
    //   has error recovery: .............. false
    //   has error reporting: ............. false
    //
    // --------- END OF REPORT -----------

trace: function no_op_trace() {},
JisonParserError: JisonParserError,
yy: {},
options: {
  type: "lalr",
  hasPartialLrUpgradeOnConflict: true,
  errorRecoveryTokenDiscardCount: 3,
  ebnf: true
},
symbols_: {
  "!": 16,
  "!=": 60,
  "$accept": 0,
  "$end": 1,
  "%}": 30,
  "&&": 61,
  "(": 7,
  ")": 8,
  "*": 3,
  "+": 21,
  ",": 6,
  "-": 23,
  ".": 17,
  "/": 22,
  "/>": 37,
  ":": 12,
  ";": 20,
  "<": 13,
  "</": 36,
  "<=": 58,
  "=": 9,
  "==": 59,
  "=>": 50,
  ">": 14,
  ">=": 57,
  "?": 18,
  "@": 19,
  "AS": 27,
  "CHARACTERS": 47,
  "CONSTRUCTOR": 56,
  "ELSE": 45,
  "ENDFOR": 42,
  "ENDFUN": 35,
  "ENDIF": 46,
  "ENDVIEW": 33,
  "EOF": 1,
  "EXPORT": 31,
  "FALSE": 54,
  "FOR": 40,
  "FROM": 26,
  "FUN": 34,
  "IDENTIFIER": 55,
  "IF": 44,
  "IMPORT": 25,
  "IN": 41,
  "INSTANCEOF": 63,
  "MAIN": 29,
  "NUMBER_LITERAL": 52,
  "OTHERWISE": 43,
  "STRING_LITERAL": 51,
  "THEN": 48,
  "TRUE": 53,
  "VIEW": 32,
  "[": 10,
  "\\\\": 49,
  "]": 11,
  "^": 24,
  "aggregate_member": 69,
  "aliased_member": 68,
  "argument_list": 104,
  "arguments": 103,
  "attribute": 93,
  "attribute_value": 94,
  "attribute_value_group": 153,
  "attributes": 92,
  "binary_expression": 107,
  "binary_operator": 137,
  "binary_operator_group": 159,
  "boolean_literal": 128,
  "call_expression": 116,
  "characters": 102,
  "child": 88,
  "child_group": 148,
  "children": 87,
  "composite_member": 70,
  "cons": 131,
  "construct_expression": 115,
  "context_property": 129,
  "context_type": 79,
  "context_variable": 130,
  "control": 98,
  "control_group": 154,
  "else_clause": 101,
  "error": 2,
  "export": 75,
  "export_statement": 76,
  "exports": 74,
  "expression": 105,
  "filter": 97,
  "filters": 96,
  "for_statement": 99,
  "fun_application": 111,
  "fun_statement": 78,
  "fun_target": 112,
  "function_expression": 120,
  "identifier": 134,
  "if_expression": 106,
  "if_statement": 100,
  "import_member": 67,
  "import_statement": 66,
  "import_statement_option": 138,
  "imports": 65,
  "interpolation": 95,
  "list": 125,
  "literal": 121,
  "literal_group": 157,
  "main": 73,
  "main_option": 142,
  "main_option2": 143,
  "main_option3": 144,
  "member": 72,
  "member_expression": 117,
  "member_group": 141,
  "member_list": 71,
  "member_list_group": 139,
  "member_list_group2": 140,
  "module": 64,
  "node": 90,
  "node_option": 149,
  "node_option2": 150,
  "number_literal": 127,
  "parameter": 86,
  "parameter_list": 85,
  "parameters": 84,
  "properties": 123,
  "property": 124,
  "property_group": 158,
  "qualified_constructor": 132,
  "qualified_identifier": 135,
  "read_expression": 118,
  "readable_expression": 119,
  "readable_expression_group": 156,
  "record": 122,
  "simple_expression": 109,
  "simple_expression_group": 155,
  "string_literal": 126,
  "tag": 89,
  "type": 83,
  "type_arg_list": 114,
  "type_arguments": 113,
  "type_class": 82,
  "type_class_list": 81,
  "type_classes": 80,
  "type_option": 147,
  "unary_expression": 108,
  "unqualified_constructor": 133,
  "unqualified_identifier": 136,
  "view_construction": 110,
  "view_statement": 77,
  "view_statement_option": 145,
  "view_statement_option2": 146,
  "widget": 91,
  "widget_option": 151,
  "widget_option2": 152,
  "{": 4,
  "{%": 28,
  "{{": 38,
  "|": 15,
  "||": 62,
  "}": 5,
  "}}": 39
},
terminals_: {
  1: "EOF",
  2: "error",
  3: "*",
  4: "{",
  5: "}",
  6: ",",
  7: "(",
  8: ")",
  9: "=",
  10: "[",
  11: "]",
  12: ":",
  13: "<",
  14: ">",
  15: "|",
  16: "!",
  17: ".",
  18: "?",
  19: "@",
  20: ";",
  21: "+",
  22: "/",
  23: "-",
  24: "^",
  25: "IMPORT",
  26: "FROM",
  27: "AS",
  28: "{%",
  29: "MAIN",
  30: "%}",
  31: "EXPORT",
  32: "VIEW",
  33: "ENDVIEW",
  34: "FUN",
  35: "ENDFUN",
  36: "</",
  37: "/>",
  38: "{{",
  39: "}}",
  40: "FOR",
  41: "IN",
  42: "ENDFOR",
  43: "OTHERWISE",
  44: "IF",
  45: "ELSE",
  46: "ENDIF",
  47: "CHARACTERS",
  48: "THEN",
  49: "\\\\",
  50: "=>",
  51: "STRING_LITERAL",
  52: "NUMBER_LITERAL",
  53: "TRUE",
  54: "FALSE",
  55: "IDENTIFIER",
  56: "CONSTRUCTOR",
  57: ">=",
  58: "<=",
  59: "==",
  60: "!=",
  61: "&&",
  62: "||",
  63: "INSTANCEOF"
},
TERROR: 2,
EOF: 1,

// internals: defined here so the object *structure* doesn't get modified by parse() et al,
// thus helping JIT compilers like Chrome V8.
originalQuoteName: null,
originalParseError: null,
cleanupAfterParse: null,
constructParseErrorInfo: null,
yyMergeLocationInfo: null,

__reentrant_call_depth: 0, // INTERNAL USE ONLY
__error_infos: [], // INTERNAL USE ONLY: the set of parseErrorInfo objects created since the last cleanup
__error_recovery_infos: [], // INTERNAL USE ONLY: the set of parseErrorInfo objects created since the last cleanup

// APIs which will be set up depending on user action code analysis:
//yyRecovering: 0,
//yyErrOk: 0,
//yyClearIn: 0,

// Helper APIs
// -----------

// Helper function which can be overridden by user code later on: put suitable quotes around
// literal IDs in a description string.
quoteName: function parser_quoteName(id_str) {
    return '"' + id_str + '"';
},

// Return the name of the given symbol (terminal or non-terminal) as a string, when available.
//
// Return NULL when the symbol is unknown to the parser.
getSymbolName: function parser_getSymbolName(symbol) {
    if (this.terminals_[symbol]) {
        return this.terminals_[symbol];
    }

    // Otherwise... this might refer to a RULE token i.e. a non-terminal: see if we can dig that one up.
    //
    // An example of this may be where a rule's action code contains a call like this:
    //
    //      parser.getSymbolName(#$)
    //
    // to obtain a human-readable name of the current grammar rule.
    var s = this.symbols_;
    for (var key in s) {
        if (s[key] === symbol) {
            return key;
        }
    }
    return null;
},

// Return a more-or-less human-readable description of the given symbol, when available,
// or the symbol itself, serving as its own 'description' for lack of something better to serve up.
//
// Return NULL when the symbol is unknown to the parser.
describeSymbol: function parser_describeSymbol(symbol) {
    if (symbol !== this.EOF && this.terminal_descriptions_ && this.terminal_descriptions_[symbol]) {
        return this.terminal_descriptions_[symbol];
    } else if (symbol === this.EOF) {
        return 'end of input';
    }
    var id = this.getSymbolName(symbol);
    if (id) {
        return this.quoteName(id);
    }
    return null;
},

// Produce a (more or less) human-readable list of expected tokens at the point of failure.
//
// The produced list may contain token or token set descriptions instead of the tokens
// themselves to help turning this output into something that easier to read by humans
// unless `do_not_describe` parameter is set, in which case a list of the raw, *numeric*,
// expected terminals and nonterminals is produced.
//
// The returned list (array) will not contain any duplicate entries.
collect_expected_token_set: function parser_collect_expected_token_set(state, do_not_describe) {
    var TERROR = this.TERROR;
    var tokenset = [];
    var check = {};
    // Has this (error?) state been outfitted with a custom expectations description text for human consumption?
    // If so, use that one instead of the less palatable token set.
    if (!do_not_describe && this.state_descriptions_ && this.state_descriptions_[state]) {
        return [this.state_descriptions_[state]];
    }
    for (var p in this.table[state]) {
        p = +p;
        if (p !== TERROR) {
            var d = do_not_describe ? p : this.describeSymbol(p);
            if (d && !check[d]) {
                tokenset.push(d);
                check[d] = true; // Mark this token description as already mentioned to prevent outputting duplicate entries.
            }
        }
    }
    return tokenset;
},
productions_: bp({
  pop: u([
  s,
  [64, 7],
  65,
  65,
  66,
  s,
  [67, 3],
  s,
  [68, 4, 1],
  71,
  72,
  73,
  73,
  74,
  74,
  s,
  [75, 3],
  76,
  77,
  s,
  [78, 16],
  79,
  80,
  81,
  81,
  s,
  [82, 4],
  s,
  [83, 3],
  84,
  84,
  85,
  85,
  86,
  86,
  87,
  87,
  88,
  89,
  89,
  s,
  [90, 4],
  s,
  [91, 4],
  92,
  92,
  s,
  [93, 4],
  94,
  95,
  95,
  96,
  s,
  [96, 4, 1],
  s,
  [99, 5],
  100,
  101,
  101,
  102,
  103,
  103,
  104,
  104,
  s,
  [105, 7],
  106,
  s,
  [107, 4],
  108,
  s,
  [108, 4, 1],
  s,
  [111, 3],
  s,
  [112, 3],
  113,
  114,
  114,
  115,
  s,
  [116, 8],
  s,
  [117, 10],
  s,
  [118, 10],
  119,
  119,
  120,
  120,
  121,
  122,
  122,
  123,
  123,
  124,
  125,
  s,
  [125, 4, 1],
  s,
  [128, 4, 1],
  131,
  132,
  132,
  133,
  134,
  134,
  135,
  s,
  [135, 4, 1],
  138,
  139,
  139,
  140,
  140,
  141,
  141,
  142,
  142,
  143,
  143,
  144,
  144,
  145,
  145,
  146,
  146,
  147,
  147,
  s,
  [148, 5],
  149,
  149,
  150,
  150,
  151,
  151,
  152,
  152,
  153,
  153,
  154,
  154,
  s,
  [155, 10],
  s,
  [156, 4],
  s,
  [157, 5],
  158,
  158,
  s,
  [159, 14]
]),
  rule: u([
  4,
  3,
  3,
  2,
  3,
  2,
  2,
  1,
  2,
  5,
  s,
  [1, 3],
  s,
  [3, 3],
  1,
  3,
  1,
  10,
  1,
  1,
  2,
  s,
  [1, 3],
  6,
  13,
  11,
  10,
  10,
  9,
  10,
  9,
  9,
  8,
  9,
  8,
  8,
  7,
  8,
  7,
  7,
  6,
  c,
  [30, 5],
  c,
  [4, 3],
  2,
  4,
  c,
  [52, 3],
  c,
  [45, 3],
  c,
  [40, 6],
  8,
  7,
  4,
  3,
  c,
  [4, 4],
  c,
  [67, 3],
  c,
  [19, 4],
  3,
  4,
  1,
  c,
  [79, 3],
  10,
  12,
  14,
  14,
  16,
  18,
  6,
  7,
  7,
  1,
  c,
  [42, 4],
  s,
  [1, 6],
  3,
  6,
  3,
  5,
  5,
  7,
  2,
  4,
  1,
  4,
  6,
  5,
  5,
  4,
  c,
  [110, 4],
  c,
  [75, 3],
  c,
  [126, 4],
  3,
  2,
  5,
  c,
  [135, 3],
  s,
  [3, 6],
  5,
  3,
  6,
  8,
  6,
  8,
  c,
  [4, 4],
  10,
  8,
  c,
  [76, 3],
  c,
  [153, 3],
  c,
  [106, 4],
  c,
  [5, 3],
  s,
  [1, 3],
  c,
  [110, 4],
  c,
  [99, 4],
  c,
  [5, 5],
  0,
  s,
  [1, 7],
  0,
  c,
  [10, 3],
  c,
  [4, 8],
  c,
  [17, 13],
  s,
  [1, 39]
])
}),
performAction: function parser__PerformAction(yyloc, yystate /* action[1] */, yysp, yyvstack, yylstack) {

          /* this == yyval */

          // the JS engine itself can go and remove these statements when `yy` turns out to be unused in any action code!
          var yy = this.yy;
          var yyparser = yy.parser;
          var yylexer = yy.lexer;

          

          switch (yystate) {
case 0:
    /*! Production::    $accept : module $end */

    // default action (generated by JISON mode classic/merge :: VT,VA,-,-,LT,LA,-,-):
    this.$ = yyvstack[yysp - 1];
    this._$ = yylstack[yysp - 1];
    // END of default action (generated by JISON mode classic/merge :: VT,VA,-,-,LT,LA,-,-)
    break;

case 1:
    /*! Production::    module : imports exports main EOF */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 3, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ =
    new yy.ast.Module(yyvstack[yysp - 3], yyvstack[yysp - 2], yyvstack[yysp - 1], this._$); 
    return this.$;
    break;

case 2:
    /*! Production::    module : imports exports EOF */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 2, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ =
    new yy.ast.Module(yyvstack[yysp - 2], yyvstack[yysp - 1], null, this._$); 
    return this.$;
    break;

case 3:
    /*! Production::    module : imports main EOF */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 2, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ =
    new yy.ast.Module(yyvstack[yysp - 2], [], yyvstack[yysp - 1], this._$); 
    return this.$;
    break;

case 4:
    /*! Production::    module : imports EOF */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 1, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ =
    new yy.ast.Module(yyvstack[yysp - 1], [], null, this._$); 
    return this.$;
    break;

case 5:
    /*! Production::    module : exports main EOF */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 2, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ =
    new yy.ast.Module([], yyvstack[yysp - 2], yyvstack[yysp - 1], this._$); 
    return this.$;
    break;

case 6:
    /*! Production::    module : exports EOF */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 1, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ =
    new yy.ast.Module([], yyvstack[yysp - 1], null, this._$); 
    return this.$;
    break;

case 7:
    /*! Production::    module : main EOF */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 1, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ =
    new yy.ast.Module([], [], yyvstack[yysp - 1], this._$); 
    return this.$;
    break;

case 8:
    /*! Production::    imports : import_statement */
case 84:
    /*! Production::    filters : filter */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,-,-):
    this._$ = yylstack[yysp];
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,-,-)
    
    
    this.$ =  [yyvstack[yysp]];
    break;

case 9:
    /*! Production::    imports : imports import_statement */
case 23:
    /*! Production::    exports : exports export */
case 63:
    /*! Production::    children : children child */
case 76:
    /*! Production::    attributes : attributes attribute */
case 85:
    /*! Production::    filters : filters filter */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,-,-):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 1, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,-,-)
    
    
    this.$ = yyvstack[yysp - 1].concat(yyvstack[yysp]);
    break;

case 10:
    /*! Production::    import_statement : IMPORT import_member FROM string_literal import_statement_option */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 4, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.ImportStatement(yyvstack[yysp - 3], yyvstack[yysp - 1], this._$);
    break;

case 11:
    /*! Production::    import_member : aggregate_member */
case 12:
    /*! Production::    import_member : aliased_member */
case 13:
    /*! Production::    import_member : composite_member */
case 19:
    /*! Production::    member : member_group */
case 24:
    /*! Production::    export : export_statement */
case 25:
    /*! Production::    export : view_statement */
case 161:
    /*! Production::    literal : literal_group */

    // default action (generated by JISON mode classic/merge :: VT,VA,-,-,LT,LA,-,-):
    this.$ = yyvstack[yysp];
    this._$ = yylstack[yysp];
    // END of default action (generated by JISON mode classic/merge :: VT,VA,-,-,LT,LA,-,-)
    break;

case 14:
    /*! Production::    aliased_member : member AS member */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 2, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.AliasedMember(yyvstack[yysp - 2], yyvstack[yysp], this._$);
    break;

case 15:
    /*! Production::    aggregate_member : "*" AS member */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 2, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.AggregateMember(yyvstack[yysp], this._$);
    break;

case 16:
    /*! Production::    composite_member : "{" member_list "}" */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 2, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.CompositeMember(yyvstack[yysp - 1], this._$);
    break;

case 17:
    /*! Production::    member_list : member_list_group */
case 22:
    /*! Production::    exports : export */
case 47:
    /*! Production::    type_class_list : type_class */
case 58:
    /*! Production::    parameter_list : parameter */
case 62:
    /*! Production::    children : child */
case 75:
    /*! Production::    attributes : attribute */
case 100:
    /*! Production::    argument_list : expression */
case 126:
    /*! Production::    type_arg_list : type */
case 164:
    /*! Production::    properties : property */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,-,-):
    this._$ = yylstack[yysp];
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,-,-)
    
    
    this.$ = [yyvstack[yysp]];
    break;

case 18:
    /*! Production::    member_list : member_list "," member_list_group2 */
case 48:
    /*! Production::    type_class_list : type_class_list "," type_class */
case 59:
    /*! Production::    parameter_list : parameter_list "," parameter */
case 101:
    /*! Production::    argument_list : argument_list "," expression */
case 127:
    /*! Production::    type_arg_list : type_arg_list "," type */
case 165:
    /*! Production::    properties : properties "," property */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,-,-):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 2, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,-,-)
    
    
    this.$ = yyvstack[yysp - 2].concat(yyvstack[yysp]);
    break;

case 20:
    /*! Production::    main : "{%" MAIN main_option main_option2 "(" type ")" main_option3 "%}" tag */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 9, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.TypedMain(yyvstack[yysp - 7], yyvstack[yysp - 6]||[], yyvstack[yysp - 4], yyvstack[yysp - 2]||[], yyvstack[yysp], this._$);
    break;

case 21:
    /*! Production::    main : tag */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yylstack[yysp];
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.UntypedMain(yyvstack[yysp], this._$);
    break;

case 26:
    /*! Production::    export : fun_statement */
case 64:
    /*! Production::    child : child_group */
case 65:
    /*! Production::    tag : node */
case 66:
    /*! Production::    tag : widget */
case 81:
    /*! Production::    attribute_value : attribute_value_group */
case 87:
    /*! Production::    control : control_group */
case 102:
    /*! Production::    expression : if_expression */
case 103:
    /*! Production::    expression : binary_expression */
case 105:
    /*! Production::    expression : simple_expression */
case 106:
    /*! Production::    expression : read_expression */
case 107:
    /*! Production::    expression : function_expression */
case 116:
    /*! Production::    simple_expression : simple_expression_group */
case 122:
    /*! Production::    fun_target : identifier */
case 123:
    /*! Production::    fun_target : context_property */
case 157:
    /*! Production::    readable_expression : readable_expression_group */
case 175:
    /*! Production::    cons : qualified_constructor */
case 176:
    /*! Production::    cons : unqualified_constructor */
case 180:
    /*! Production::    identifier : qualified_identifier */
case 181:
    /*! Production::    identifier : unqualified_identifier */
case 185:
    /*! Production::    binary_operator : binary_operator_group */
case 187:
    /*! Production::    import_statement_option : ";" */
case 188:
    /*! Production::    member_list_group : member */
case 189:
    /*! Production::    member_list_group : aliased_member */
case 190:
    /*! Production::    member_list_group2 : member */
case 191:
    /*! Production::    member_list_group2 : aliased_member */
case 192:
    /*! Production::    member_group : unqualified_identifier */
case 193:
    /*! Production::    member_group : unqualified_constructor */
case 195:
    /*! Production::    main_option : unqualified_constructor */
case 197:
    /*! Production::    main_option2 : type_classes */
case 199:
    /*! Production::    main_option3 : parameters */
case 201:
    /*! Production::    view_statement_option : type_classes */
case 203:
    /*! Production::    view_statement_option2 : parameters */
case 205:
    /*! Production::    type_option : type_classes */
case 206:
    /*! Production::    child_group : tag */
case 207:
    /*! Production::    child_group : interpolation */
case 208:
    /*! Production::    child_group : control */
case 209:
    /*! Production::    child_group : characters */
case 210:
    /*! Production::    child_group : identifier */
case 212:
    /*! Production::    node_option : children */
case 214:
    /*! Production::    node_option2 : children */
case 216:
    /*! Production::    widget_option : children */
case 218:
    /*! Production::    widget_option2 : children */
case 219:
    /*! Production::    attribute_value_group : interpolation */
case 220:
    /*! Production::    attribute_value_group : literal */
case 221:
    /*! Production::    control_group : for_statement */
case 222:
    /*! Production::    control_group : if_statement */
case 223:
    /*! Production::    simple_expression_group : view_construction */
case 224:
    /*! Production::    simple_expression_group : fun_application */
case 225:
    /*! Production::    simple_expression_group : construct_expression */
case 226:
    /*! Production::    simple_expression_group : call_expression */
case 227:
    /*! Production::    simple_expression_group : member_expression */
case 228:
    /*! Production::    simple_expression_group : literal */
case 229:
    /*! Production::    simple_expression_group : context_property */
case 230:
    /*! Production::    simple_expression_group : cons */
case 231:
    /*! Production::    simple_expression_group : identifier */
case 232:
    /*! Production::    simple_expression_group : context_variable */
case 233:
    /*! Production::    readable_expression_group : string_literal */
case 234:
    /*! Production::    readable_expression_group : member_expression */
case 235:
    /*! Production::    readable_expression_group : context_property */
case 236:
    /*! Production::    readable_expression_group : call_expression */
case 237:
    /*! Production::    literal_group : record */
case 238:
    /*! Production::    literal_group : list */
case 239:
    /*! Production::    literal_group : string_literal */
case 240:
    /*! Production::    literal_group : number_literal */
case 241:
    /*! Production::    literal_group : boolean_literal */
case 242:
    /*! Production::    property_group : unqualified_identifier */
case 243:
    /*! Production::    property_group : string_literal */
case 244:
    /*! Production::    binary_operator_group : ">" */
case 245:
    /*! Production::    binary_operator_group : ">=" */
case 246:
    /*! Production::    binary_operator_group : "<" */
case 247:
    /*! Production::    binary_operator_group : "<=" */
case 248:
    /*! Production::    binary_operator_group : "==" */
case 249:
    /*! Production::    binary_operator_group : "!=" */
case 250:
    /*! Production::    binary_operator_group : "+" */
case 251:
    /*! Production::    binary_operator_group : "/" */
case 252:
    /*! Production::    binary_operator_group : "-" */
case 253:
    /*! Production::    binary_operator_group : "=" */
case 254:
    /*! Production::    binary_operator_group : "&&" */
case 255:
    /*! Production::    binary_operator_group : "||" */
case 256:
    /*! Production::    binary_operator_group : "^" */
case 257:
    /*! Production::    binary_operator_group : INSTANCEOF */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,-,-):
    this._$ = yylstack[yysp];
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,-,-)
    
    
    this.$ = yyvstack[yysp];
    break;

case 27:
    /*! Production::    export_statement : "{%" EXPORT composite_member FROM string_literal "%}" */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 5, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.ExportStatement(yyvstack[yysp - 3], yyvstack[yysp - 1], this._$);
    break;

case 28:
    /*! Production::    view_statement : "{%" VIEW unqualified_constructor view_statement_option "(" type ")" view_statement_option2 "%}" tag "{%" ENDVIEW "%}" */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 12, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.ViewStatement(yyvstack[yysp - 10], yyvstack[yysp - 9]||[], yyvstack[yysp - 7], yyvstack[yysp - 5]||[], yyvstack[yysp - 3], this._$);
    break;

case 29:
    /*! Production::    fun_statement : "{%" FUN unqualified_identifier type_classes context_type parameters "%}" children "{%" ENDFUN "%}" */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 10, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.FunStatement(yyvstack[yysp - 8], yyvstack[yysp - 7], yyvstack[yysp - 6], yyvstack[yysp - 5], yyvstack[yysp - 3], this._$);
    break;

case 30:
    /*! Production::    fun_statement : "{%" FUN unqualified_identifier type_classes context_type "%}" children "{%" ENDFUN "%}" */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 9, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.FunStatement(yyvstack[yysp - 7], yyvstack[yysp - 6], yyvstack[yysp - 5], [], yyvstack[yysp - 3], this._$);
    break;

case 31:
    /*! Production::    fun_statement : "{%" FUN unqualified_identifier type_classes parameters "%}" children "{%" ENDFUN "%}" */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 9, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.FunStatement(yyvstack[yysp - 7], yyvstack[yysp - 6], null, yyvstack[yysp - 5], yyvstack[yysp - 3], this._$);
    break;

case 32:
    /*! Production::    fun_statement : "{%" FUN unqualified_identifier type_classes "%}" children "{%" ENDFUN "%}" */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 8, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.FunStatement(yyvstack[yysp - 6], yyvstack[yysp - 5], null, [], yyvstack[yysp - 3], this._$);
    break;

case 33:
    /*! Production::    fun_statement : "{%" FUN unqualified_identifier context_type parameters "%}" children "{%" ENDFUN "%}" */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 9, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.FunStatement(yyvstack[yysp - 7], [], yyvstack[yysp - 6], yyvstack[yysp - 5], yyvstack[yysp - 3], this._$);
    break;

case 34:
    /*! Production::    fun_statement : "{%" FUN unqualified_identifier context_type "%}" children "{%" ENDFUN "%}" */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 8, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.FunStatement(yyvstack[yysp - 6], [], yyvstack[yysp - 5], [], yyvstack[yysp - 3], this._$);
    break;

case 35:
    /*! Production::    fun_statement : "{%" FUN unqualified_identifier parameters "%}" children "{%" ENDFUN "%}" */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 8, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.FunStatement(yyvstack[yysp - 6],[],null,yyvstack[yysp - 5],yyvstack[yysp - 3],this._$);
    break;

case 36:
    /*! Production::    fun_statement : "{%" FUN unqualified_identifier "%}" children "{%" ENDFUN "%}" */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 7, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.FunStatement(yyvstack[yysp - 5],[],null,[],yyvstack[yysp - 3],this._$);
    break;

case 37:
    /*! Production::    fun_statement : "{%" FUN unqualified_identifier type_classes context_type parameters "=" child "%}" */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 8, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.FunStatement(yyvstack[yysp - 6], yyvstack[yysp - 5], yyvstack[yysp - 4], yyvstack[yysp - 3], yyvstack[yysp - 1], this._$);
    break;

case 38:
    /*! Production::    fun_statement : "{%" FUN unqualified_identifier type_classes context_type "=" child "%}" */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 7, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.FunStatement(yyvstack[yysp - 5], yyvstack[yysp - 4], yyvstack[yysp - 3], [], yyvstack[yysp - 1], this._$);
    break;

case 39:
    /*! Production::    fun_statement : "{%" FUN unqualified_identifier type_classes parameters "=" child "%}" */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 7, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.FunStatement(yyvstack[yysp - 5], yyvstack[yysp - 4], null, yyvstack[yysp - 3], yyvstack[yysp - 1], this._$);
    break;

case 40:
    /*! Production::    fun_statement : "{%" FUN unqualified_identifier type_classes "=" child "%}" */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 6, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.FunStatement(yyvstack[yysp - 4], yyvstack[yysp - 3], null, [], yyvstack[yysp - 1], this._$);
    break;

case 41:
    /*! Production::    fun_statement : "{%" FUN unqualified_identifier context_type parameters "=" child "%}" */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 7, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.FunStatement(yyvstack[yysp - 5], [], yyvstack[yysp - 4], yyvstack[yysp - 3], yyvstack[yysp - 1], this._$);
    break;

case 42:
    /*! Production::    fun_statement : "{%" FUN unqualified_identifier context_type "=" child "%}" */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 6, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.FunStatement(yyvstack[yysp - 4], [], yyvstack[yysp - 3], [], yyvstack[yysp - 1], this._$);
    break;

case 43:
    /*! Production::    fun_statement : "{%" FUN unqualified_identifier parameters "=" child "%}" */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 6, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.FunStatement(yyvstack[yysp - 4],[],null,yyvstack[yysp - 3],yyvstack[yysp - 1],this._$);
    break;

case 44:
    /*! Production::    fun_statement : "{%" FUN unqualified_identifier "=" child "%}" */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 5, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.FunStatement(yyvstack[yysp - 3],[],null,[],yyvstack[yysp - 1],this._$);
    break;

case 45:
    /*! Production::    context_type : "(" type ")" */
case 46:
    /*! Production::    type_classes : "[" type_class_list "]" */
case 57:
    /*! Production::    parameters : "(" parameter_list ")" */
case 99:
    /*! Production::    arguments : "(" argument_list ")" */
case 108:
    /*! Production::    expression : "(" expression ")" */
case 124:
    /*! Production::    fun_target : "(" expression ")" */
case 125:
    /*! Production::    type_arguments : "[" type_arg_list "]" */
case 158:
    /*! Production::    readable_expression : "(" expression ")" */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,-,-):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 2, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,-,-)
    
    
    this.$ = yyvstack[yysp - 1];
    break;

case 49:
    /*! Production::    type_class : unqualified_identifier */
case 51:
    /*! Production::    type_class : unqualified_constructor */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yylstack[yysp];
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.TypeClass(yyvstack[yysp], null, this._$);
    break;

case 50:
    /*! Production::    type_class : unqualified_identifier ":" type */
case 52:
    /*! Production::    type_class : unqualified_constructor ":" type */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 2, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.TypeClass(yyvstack[yysp - 2], yyvstack[yysp], this._$);
    break;

case 53:
    /*! Production::    type : cons type_option */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 1, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.Type(yyvstack[yysp - 1], yyvstack[yysp]||[], false, this._$);
    break;

case 54:
    /*! Production::    type : cons type_classes "[" "]" */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 3, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.Type(yyvstack[yysp - 3], yyvstack[yysp - 2], true, this._$);
    break;

case 55:
    /*! Production::    type : cons "[" "]" */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 2, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.Type(yyvstack[yysp - 2], [], true, this._$);
    break;

case 56:
    /*! Production::    parameters : "(" ")" */
case 98:
    /*! Production::    arguments : "(" ")" */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,-,-):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 1, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,-,-)
    
    
    this.$ = [];
    break;

case 60:
    /*! Production::    parameter : unqualified_identifier ":" type */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 2, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.TypedParameter(yyvstack[yysp - 2], yyvstack[yysp], this._$);
    break;

case 61:
    /*! Production::    parameter : unqualified_identifier */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yylstack[yysp];
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.UntypedParameter(yyvstack[yysp], this._$);
    break;

case 67:
    /*! Production::    node : "<" identifier attributes ">" node_option "</" identifier ">" */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 7, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.Node(yyvstack[yysp - 6], yyvstack[yysp - 5], yyvstack[yysp - 3]||[], yyvstack[yysp - 1], this._$);
    break;

case 68:
    /*! Production::    node : "<" identifier ">" node_option2 "</" identifier ">" */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 6, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.Node(yyvstack[yysp - 5], [], yyvstack[yysp - 3]||[], yyvstack[yysp - 1], this._$);
    break;

case 69:
    /*! Production::    node : "<" identifier attributes "/>" */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 3, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.Node(yyvstack[yysp - 2], yyvstack[yysp - 1], [], yyvstack[yysp - 2], this._$);
    break;

case 70:
    /*! Production::    node : "<" identifier "/>" */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 2, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.Node(yyvstack[yysp - 1], [], [], yyvstack[yysp - 1], this._$);
    break;

case 71:
    /*! Production::    widget : "<" cons attributes ">" widget_option "</" cons ">" */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 7, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.Widget(yyvstack[yysp - 6], yyvstack[yysp - 5], yyvstack[yysp - 3]||[], yyvstack[yysp - 1], this._$);
    break;

case 72:
    /*! Production::    widget : "<" cons ">" widget_option2 "</" cons ">" */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 6, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.Widget(yyvstack[yysp - 5], [], yyvstack[yysp - 3]||[], yyvstack[yysp - 1], this._$);
    break;

case 73:
    /*! Production::    widget : "<" cons attributes "/>" */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 3, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.Widget(yyvstack[yysp - 2], yyvstack[yysp - 1], [], yyvstack[yysp - 2], this._$);
    break;

case 74:
    /*! Production::    widget : "<" cons "/>" */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 2, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.Widget(yyvstack[yysp - 1], [], [], yyvstack[yysp - 1], this._$);
    break;

case 77:
    /*! Production::    attribute : unqualified_identifier ":" unqualified_identifier "=" attribute_value */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 4, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.Attribute(yyvstack[yysp - 4], yyvstack[yysp - 2], yyvstack[yysp], this._$);
    break;

case 78:
    /*! Production::    attribute : unqualified_identifier "=" attribute_value */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 2, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ =
    new yy.ast.Attribute(new yy.ast.UnqualifiedIdentifier('html', this._$),
    yyvstack[yysp - 2], yyvstack[yysp], this._$);
    break;

case 79:
    /*! Production::    attribute : unqualified_identifier ":" unqualified_identifier */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 2, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.Attribute(yyvstack[yysp - 2], yyvstack[yysp], new yy.ast.BooleanLiteral(true, this._$), this._$);
    break;

case 80:
    /*! Production::    attribute : unqualified_identifier */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yylstack[yysp];
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.Attribute(
    new yy.ast.UnqualifiedIdentifier('html', this._$),
    yyvstack[yysp], new yy.ast.BooleanLiteral(true, this._$), this._$);
    break;

case 82:
    /*! Production::    interpolation : "{{" expression "}}" */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 2, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.Interpolation(yyvstack[yysp - 1], [], this._$);
    break;

case 83:
    /*! Production::    interpolation : "{{" expression filters "}}" */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 3, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.Interpolation(yyvstack[yysp - 2], yyvstack[yysp - 1], this._$);
    break;

case 86:
    /*! Production::    filter : "|" expression */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,-,-):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 1, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,-,-)
    
    
    this.$ = yyvstack[yysp]
    break;

case 88:
    /*! Production::    for_statement : "{%" FOR parameter IN expression "%}" children "{%" ENDFOR "%}" */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 9, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.ForStatement(yyvstack[yysp - 7], null, null, yyvstack[yysp - 5], yyvstack[yysp - 3], [], this._$);
    break;

case 89:
    /*! Production::    for_statement : "{%" FOR parameter "," parameter IN expression "%}" children "{%" ENDFOR "%}" */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 11, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.ForStatement(yyvstack[yysp - 9], yyvstack[yysp - 7], null, yyvstack[yysp - 5], yyvstack[yysp - 3], [], this._$);
    break;

case 90:
    /*! Production::    for_statement : "{%" FOR parameter "," parameter "," parameter IN expression "%}" children "{%" ENDFOR "%}" */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 13, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.ForStatement(yyvstack[yysp - 11], yyvstack[yysp - 9], yyvstack[yysp - 7], yyvstack[yysp - 5], yyvstack[yysp - 3], [], this._$);
    break;

case 91:
    /*! Production::    for_statement : "{%" FOR parameter IN expression "%}" children "{%" OTHERWISE "%}" children "{%" ENDFOR "%}" */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 13, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.ForStatement(yyvstack[yysp - 11], null, null, yyvstack[yysp - 9], yyvstack[yysp - 7], yyvstack[yysp - 3], this._$);
    break;

case 92:
    /*! Production::    for_statement : "{%" FOR parameter "," parameter IN expression "%}" children "{%" OTHERWISE "%}" children "{%" ENDFOR "%}" */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 15, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.ForStatement(yyvstack[yysp - 13], yyvstack[yysp - 11], null, yyvstack[yysp - 9], yyvstack[yysp - 7], yyvstack[yysp - 3], this._$);
    break;

case 93:
    /*! Production::    for_statement : "{%" FOR parameter "," parameter "," parameter IN expression "%}" children "{%" OTHERWISE "%}" children "{%" ENDFOR "%}" */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 17, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.ForStatement(yyvstack[yysp - 15], yyvstack[yysp - 13], null, yyvstack[yysp - 11], yyvstack[yysp - 9], yyvstack[yysp - 3], this._$);
    break;

case 94:
    /*! Production::    if_statement : "{%" IF expression "%}" children else_clause */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 5, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.IfStatement(yyvstack[yysp - 3], yyvstack[yysp - 1], yyvstack[yysp], this._$);
    break;

case 95:
    /*! Production::    else_clause : "{%" ELSE "%}" children "{%" ENDIF "%}" */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 6, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.ElseClause(yyvstack[yysp - 3], this._$);
    break;

case 96:
    /*! Production::    else_clause : "{%" ELSE IF expression "%}" children else_clause */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 6, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.ElseIfClause(yyvstack[yysp - 3], yyvstack[yysp - 1], yyvstack[yysp], this._$);
    break;

case 97:
    /*! Production::    characters : CHARACTERS */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yylstack[yysp];
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.Characters(yyvstack[yysp], this._$);
    break;

case 104:
    /*! Production::    expression : unary_expression */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,-,-):
    this._$ = yylstack[yysp];
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,-,-)
    
    
    this.$ =yyvstack[yysp];
    break;

case 109:
    /*! Production::    if_expression : IF expression THEN expression ELSE expression */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 5, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.IfThenExpression(yyvstack[yysp - 4], yyvstack[yysp - 2], yyvstack[yysp], this._$);
    break;

case 110:
    /*! Production::    binary_expression : simple_expression binary_operator simple_expression */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 2, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.BinaryExpression(yyvstack[yysp - 2], yyvstack[yysp - 1], yyvstack[yysp], this._$);
    break;

case 111:
    /*! Production::    binary_expression : simple_expression binary_operator "(" expression ")" */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 4, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.BinaryExpression(yyvstack[yysp - 4], yyvstack[yysp - 3], yyvstack[yysp - 1], this._$);
    break;

case 112:
    /*! Production::    binary_expression : "(" expression ")" binary_operator simple_expression */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 4, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.BinaryExpression(yyvstack[yysp - 3], yyvstack[yysp - 1], yyvstack[yysp], this._$);
    break;

case 113:
    /*! Production::    binary_expression : "(" expression ")" binary_operator "(" expression ")" */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 6, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.BinaryExpression(yyvstack[yysp - 5], yyvstack[yysp - 3], yyvstack[yysp - 1], this._$);
    break;

case 114:
    /*! Production::    unary_expression : "!" simple_expression */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 1, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.UnaryExpression(yyvstack[yysp - 1], yyvstack[yysp], this._$);
    break;

case 115:
    /*! Production::    unary_expression : "!" "(" expression ")" */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 3, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.UnaryExpression(yyvstack[yysp - 3], yyvstack[yysp - 1], this._$);
    break;

case 117:
    /*! Production::    view_construction : "<" cons arguments ">" */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 3, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.ViewConstruction(yyvstack[yysp - 2], yyvstack[yysp - 1], this._$);
    break;

case 118:
    /*! Production::    fun_application : "<" fun_target type_arguments arguments arguments ">" */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 5, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.FunApplication(yyvstack[yysp - 4], yyvstack[yysp - 3], yyvstack[yysp - 2], yyvstack[yysp - 1], this._$);
    break;

case 119:
    /*! Production::    fun_application : "<" fun_target type_arguments arguments ">" */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 4, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.FunApplication(yyvstack[yysp - 3], yyvstack[yysp - 2], [], yyvstack[yysp - 1], this._$);
    break;

case 120:
    /*! Production::    fun_application : "<" fun_target arguments arguments ">" */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 4, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.FunApplication(yyvstack[yysp - 3], [], yyvstack[yysp - 2], yyvstack[yysp - 1], this._$);
    break;

case 121:
    /*! Production::    fun_application : "<" fun_target arguments ">" */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 3, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.FunApplication(yyvstack[yysp - 2], [], [], yyvstack[yysp - 1], this._$);
    break;

case 128:
    /*! Production::    construct_expression : cons arguments */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 1, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.ConstructExpression(yyvstack[yysp - 1], yyvstack[yysp], this._$);
    break;

case 129:
    /*! Production::    call_expression : identifier type_arguments arguments */
case 131:
    /*! Production::    call_expression : context_property type_arguments arguments */
case 133:
    /*! Production::    call_expression : member_expression type_arguments arguments */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 2, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.CallExpression(yyvstack[yysp - 2], yyvstack[yysp - 1], yyvstack[yysp], this._$);
    break;

case 130:
    /*! Production::    call_expression : identifier arguments */
case 132:
    /*! Production::    call_expression : context_property arguments */
case 134:
    /*! Production::    call_expression : member_expression arguments */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 1, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.CallExpression(yyvstack[yysp - 1], [], yyvstack[yysp], this._$);
    break;

case 135:
    /*! Production::    call_expression : "(" expression ")" type_arguments arguments */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 4, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.CallExpression(yyvstack[yysp - 3], yyvstack[yysp - 1], yyvstack[yysp], this._$);
    break;

case 136:
    /*! Production::    call_expression : "(" expression ")" arguments */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 3, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.CallExpression(yyvstack[yysp - 2], [], yyvstack[yysp], this._$);
    break;

case 137:
    /*! Production::    member_expression : qualified_identifier "." unqualified_identifier */
case 138:
    /*! Production::    member_expression : qualified_constructor "." unqualified_identifier */
case 139:
    /*! Production::    member_expression : context_variable "." unqualified_identifier */
case 140:
    /*! Production::    member_expression : context_property "." unqualified_identifier */
case 141:
    /*! Production::    member_expression : list "." unqualified_identifier */
case 142:
    /*! Production::    member_expression : record "." unqualified_identifier */
case 143:
    /*! Production::    member_expression : string_literal "." unqualified_identifier */
case 144:
    /*! Production::    member_expression : call_expression "." unqualified_identifier */
case 146:
    /*! Production::    member_expression : member_expression "." unqualified_identifier */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 2, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.MemberExpression(yyvstack[yysp - 2], yyvstack[yysp], this._$);
    break;

case 145:
    /*! Production::    member_expression : "(" expression ")" "." unqualified_identifier */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 4, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.MemberExpression(yyvstack[yysp - 3], yyvstack[yysp], this._$);
    break;

case 147:
    /*! Production::    read_expression : identifier "[" readable_expression AS type "]" */
case 149:
    /*! Production::    read_expression : context_variable "[" readable_expression AS type "]" */
case 151:
    /*! Production::    read_expression : context_property "[" readable_expression AS type "]" */
case 153:
    /*! Production::    read_expression : member_expression "[" readable_expression AS type "]" */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 5, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.ReadExpression(yyvstack[yysp - 5], yyvstack[yysp - 3], yyvstack[yysp - 1], null, this._$);
    break;

case 148:
    /*! Production::    read_expression : identifier "[" readable_expression AS type "?" expression "]" */
case 150:
    /*! Production::    read_expression : context_variable "[" readable_expression AS type "?" expression "]" */
case 152:
    /*! Production::    read_expression : context_property "[" readable_expression AS type "?" expression "]" */
case 154:
    /*! Production::    read_expression : member_expression "[" readable_expression AS type "?" expression "]" */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 7, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.ReadExpression(yyvstack[yysp - 7], yyvstack[yysp - 5], yyvstack[yysp - 3], yyvstack[yysp - 1], this._$);
    break;

case 155:
    /*! Production::    read_expression : "(" expression ")" "[" expression AS type "?" expression "]" */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 9, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.ReadExpression(yyvstack[yysp - 9], yyvstack[yysp - 7], yyvstack[yysp - 5], yyvstack[yysp - 3], this._$);
    break;

case 156:
    /*! Production::    read_expression : "(" expression ")" "[" expression AS type "]" */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 7, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.ReadExpression(yyvstack[yysp - 7], yyvstack[yysp - 5], yyvstack[yysp - 3], null, this._$);
    break;

case 159:
    /*! Production::    function_expression : "\\" parameter_list "=>" expression */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 3, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.FunctionExpression(yyvstack[yysp - 2], yyvstack[yysp], this._$);
    break;

case 160:
    /*! Production::    function_expression : "=>" expression */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 1, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.FunctionExpression([], yyvstack[yysp], this._$);
    break;

case 162:
    /*! Production::    record : "{" "}" */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 1, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.Record([], this._$);
    break;

case 163:
    /*! Production::    record : "{" properties "}" */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 2, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.Record(yyvstack[yysp - 1], this._$);
    break;

case 166:
    /*! Production::    property : property_group ":" expression */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 2, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.Property(yyvstack[yysp - 2], yyvstack[yysp], this._$);
    break;

case 167:
    /*! Production::    list : "[" "]" */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 1, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.List([], this._$);
    break;

case 168:
    /*! Production::    list : "[" argument_list "]" */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 2, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.List(yyvstack[yysp - 1], this._$);
    break;

case 169:
    /*! Production::    string_literal : STRING_LITERAL */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yylstack[yysp];
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.StringLiteral(yyvstack[yysp].slice(1, yyvstack[yysp].length - 1, this._$));
    break;

case 170:
    /*! Production::    number_literal : NUMBER_LITERAL */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yylstack[yysp];
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.NumberLiteral(yyvstack[yysp], this._$);
    break;

case 171:
    /*! Production::    boolean_literal : TRUE */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yylstack[yysp];
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.BooleanLiteral(true, this._$);
    break;

case 172:
    /*! Production::    boolean_literal : FALSE */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yylstack[yysp];
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.BooleanLiteral(false, this._$);
    break;

case 173:
    /*! Production::    context_property : "@" unqualified_identifier */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 1, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.ContextProperty(yyvstack[yysp], this._$)
    break;

case 174:
    /*! Production::    context_variable : "@" */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yylstack[yysp];
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.ContextVariable(this._$);
    break;

case 177:
    /*! Production::    qualified_constructor : IDENTIFIER "." CONSTRUCTOR */
case 178:
    /*! Production::    qualified_constructor : CONSTRUCTOR "." CONSTRUCTOR */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 2, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.QualifiedConstructor(yyvstack[yysp - 2], yyvstack[yysp], this._$);
    break;

case 179:
    /*! Production::    unqualified_constructor : CONSTRUCTOR */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yylstack[yysp];
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.UnqualifiedConstructor(yyvstack[yysp], this._$);
    break;

case 182:
    /*! Production::    qualified_identifier : IDENTIFIER "." IDENTIFIER */
case 183:
    /*! Production::    qualified_identifier : CONSTRUCTOR "." IDENTIFIER */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yyparser.yyMergeLocationInfo(yysp - 2, yysp);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.QualifiedIdentifier(yyvstack[yysp - 2], yyvstack[yysp], this._$);
    break;

case 184:
    /*! Production::    unqualified_identifier : IDENTIFIER */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA):
    this._$ = yylstack[yysp];
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,LU,LUbA)
    
    
    this.$ = new yy.ast.UnqualifiedIdentifier(yyvstack[yysp], this._$);
    break;

case 186:
    /*! Production::    import_statement_option : %epsilon */
case 194:
    /*! Production::    main_option : %epsilon */
case 196:
    /*! Production::    main_option2 : %epsilon */
case 198:
    /*! Production::    main_option3 : %epsilon */
case 200:
    /*! Production::    view_statement_option : %epsilon */
case 202:
    /*! Production::    view_statement_option2 : %epsilon */
case 204:
    /*! Production::    type_option : %epsilon */
case 211:
    /*! Production::    node_option : %epsilon */
case 213:
    /*! Production::    node_option2 : %epsilon */
case 215:
    /*! Production::    widget_option : %epsilon */
case 217:
    /*! Production::    widget_option2 : %epsilon */

    // default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,-,-):
    this._$ = yyparser.yyMergeLocationInfo(null, null, null, null, true);
    // END of default action (generated by JISON mode classic/merge :: VT,VA,VU,-,LT,LA,-,-)
    
    
    this.$ = undefined;
    break;

}
},
table: bt({
  len: u([
  15,
  1,
  14,
  11,
  1,
  0,
  0,
  4,
  0,
  12,
  s,
  [0, 5],
  8,
  c,
  [13, 4],
  c,
  [3, 3],
  0,
  5,
  s,
  [2, 3],
  c,
  [8, 4],
  1,
  1,
  9,
  s,
  [0, 5],
  6,
  6,
  s,
  [0, 4],
  29,
  29,
  c,
  [20, 4],
  4,
  0,
  1,
  4,
  7,
  2,
  6,
  6,
  2,
  0,
  3,
  0,
  5,
  23,
  c,
  [44, 3],
  c,
  [5, 3],
  2,
  2,
  c,
  [55, 3],
  6,
  c,
  [51, 3],
  5,
  4,
  2,
  21,
  20,
  10,
  c,
  [46, 5],
  8,
  c,
  [28, 3],
  1,
  21,
  s,
  [0, 7],
  43,
  s,
  [0, 4],
  10,
  1,
  2,
  2,
  17,
  23,
  c,
  [21, 7],
  c,
  [64, 4],
  3,
  1,
  6,
  c,
  [48, 4],
  c,
  [3, 3],
  5,
  21,
  20,
  20,
  1,
  1,
  0,
  2,
  9,
  c,
  [66, 3],
  c,
  [115, 4],
  3,
  c,
  [38, 3],
  5,
  c,
  [107, 3],
  0,
  0,
  26,
  c,
  [61, 3],
  43,
  33,
  0,
  28,
  26,
  29,
  29,
  4,
  c,
  [70, 4],
  25,
  0,
  26,
  27,
  28,
  27,
  s,
  [25, 3],
  12,
  0,
  45,
  8,
  s,
  [0, 5],
  1,
  1,
  3,
  43,
  c,
  [42, 4],
  c,
  [12, 5],
  21,
  5,
  c,
  [71, 3],
  5,
  c,
  [176, 3],
  1,
  c,
  [86, 3],
  c,
  [85, 4],
  c,
  [4, 4],
  20,
  1,
  3,
  c,
  [84, 5],
  7,
  7,
  6,
  1,
  1,
  5,
  1,
  c,
  [10, 3],
  c,
  [82, 3],
  s,
  [0, 14],
  c,
  [54, 3],
  43,
  15,
  15,
  14,
  11,
  24,
  2,
  0,
  45,
  20,
  2,
  24,
  c,
  [209, 3],
  c,
  [4, 4],
  2,
  0,
  c,
  [4, 5],
  s,
  [2, 4],
  c,
  [98, 3],
  43,
  c,
  [13, 4],
  c,
  [3, 3],
  c,
  [262, 3],
  2,
  1,
  17,
  5,
  1,
  c,
  [117, 4],
  4,
  c,
  [96, 8],
  c,
  [4, 4],
  c,
  [182, 3],
  c,
  [29, 4],
  c,
  [294, 4],
  c,
  [46, 3],
  31,
  43,
  1,
  7,
  1,
  2,
  c,
  [251, 3],
  c,
  [301, 4],
  s,
  [1, 3],
  c,
  [47, 3],
  c,
  [7, 4],
  c,
  [34, 7],
  c,
  [274, 5],
  c,
  [10, 3],
  2,
  3,
  c,
  [122, 3],
  0,
  6,
  43,
  43,
  3,
  21,
  c,
  [62, 5],
  1,
  c,
  [74, 8],
  c,
  [3, 3],
  c,
  [387, 5],
  33,
  45,
  c,
  [350, 4],
  15,
  6,
  0,
  6,
  c,
  [355, 3],
  c,
  [393, 4],
  c,
  [49, 3],
  c,
  [58, 6],
  21,
  0,
  4,
  4,
  c,
  [38, 5],
  c,
  [17, 3],
  15,
  0,
  43,
  1,
  22,
  c,
  [163, 5],
  6,
  c,
  [444, 6],
  21,
  43,
  c,
  [70, 5],
  c,
  [67, 5],
  c,
  [53, 3],
  43,
  c,
  [101, 3],
  c,
  [4, 4],
  c,
  [358, 3],
  c,
  [30, 3],
  15,
  c,
  [137, 4],
  1,
  4,
  21,
  43,
  21,
  43,
  1,
  c,
  [137, 6],
  1,
  c,
  [197, 3],
  20,
  c,
  [74, 4],
  21,
  4,
  21,
  c,
  [138, 3],
  c,
  [39, 3],
  c,
  [315, 3],
  3,
  c,
  [14, 3],
  c,
  [27, 3],
  c,
  [410, 4],
  c,
  [11, 3],
  1,
  20,
  c,
  [123, 4]
]),
  symbol: u([
  13,
  25,
  28,
  64,
  65,
  66,
  s,
  [73, 6, 1],
  89,
  90,
  91,
  1,
  1,
  c,
  [17, 3],
  c,
  [15, 11],
  13,
  28,
  73,
  c,
  [11, 8],
  29,
  31,
  32,
  34,
  3,
  4,
  55,
  56,
  s,
  [67, 4, 1],
  72,
  133,
  136,
  141,
  55,
  56,
  s,
  [131, 6, 1],
  c,
  [36, 12],
  1,
  7,
  10,
  56,
  133,
  142,
  4,
  70,
  56,
  133,
  55,
  136,
  26,
  27,
  27,
  55,
  56,
  68,
  71,
  c,
  [43, 3],
  139,
  141,
  14,
  37,
  55,
  92,
  93,
  136,
  c,
  [6, 6],
  s,
  [5, 7, 1],
  13,
  14,
  15,
  17,
  s,
  [21, 4, 1],
  27,
  30,
  37,
  39,
  45,
  48,
  55,
  s,
  [57, 7, 1],
  c,
  [29, 29],
  c,
  [94, 3],
  80,
  143,
  26,
  c,
  [5, 3],
  145,
  7,
  9,
  10,
  30,
  79,
  80,
  84,
  51,
  126,
  55,
  56,
  c,
  [139, 6],
  c,
  [6, 4],
  5,
  6,
  5,
  6,
  27,
  c,
  [100, 3],
  93,
  136,
  13,
  28,
  36,
  38,
  47,
  55,
  56,
  s,
  [87, 5, 1],
  95,
  98,
  99,
  100,
  102,
  c,
  [167, 3],
  148,
  150,
  154,
  9,
  12,
  c,
  [30, 3],
  c,
  [33, 26],
  152,
  154,
  55,
  56,
  55,
  56,
  7,
  55,
  56,
  81,
  82,
  133,
  136,
  51,
  126,
  7,
  7,
  9,
  30,
  79,
  84,
  c,
  [5, 3],
  84,
  9,
  30,
  13,
  28,
  c,
  [47, 18],
  154,
  c,
  [21, 6],
  c,
  [20, 14],
  8,
  55,
  56,
  83,
  85,
  86,
  c,
  [281, 3],
  c,
  [279, 3],
  20,
  25,
  28,
  138,
  c,
  [258, 3],
  c,
  [155, 3],
  140,
  141,
  c,
  [113, 21],
  149,
  154,
  36,
  c,
  [24, 7],
  c,
  [69, 14],
  s,
  [4, 6, 3],
  44,
  s,
  [49, 8, 1],
  s,
  [105, 7, 1],
  s,
  [115, 4, 1],
  120,
  121,
  122,
  s,
  [125, 12, 1],
  155,
  157,
  13,
  14,
  17,
  28,
  30,
  c,
  [67, 5],
  17,
  40,
  44,
  55,
  136,
  4,
  10,
  38,
  c,
  [52, 4],
  94,
  95,
  c,
  [40, 6],
  153,
  157,
  c,
  [120, 21],
  151,
  c,
  [120, 23],
  c,
  [188, 3],
  c,
  [88, 3],
  6,
  11,
  6,
  11,
  12,
  c,
  [3, 3],
  30,
  c,
  [15, 6],
  c,
  [257, 47],
  c,
  [300, 45],
  85,
  86,
  c,
  [394, 3],
  c,
  [46, 39],
  c,
  [20, 20],
  30,
  8,
  6,
  8,
  6,
  8,
  10,
  11,
  18,
  41,
  50,
  80,
  147,
  6,
  8,
  12,
  41,
  50,
  c,
  [5, 3],
  17,
  c,
  [18, 4],
  14,
  17,
  c,
  [20, 3],
  c,
  [527, 3],
  c,
  [233, 24],
  c,
  [7, 3],
  15,
  39,
  96,
  97,
  5,
  6,
  8,
  9,
  c,
  [621, 4],
  c,
  [620, 6],
  c,
  [619, 3],
  c,
  [618, 7],
  137,
  159,
  c,
  [388, 43],
  c,
  [43, 47],
  19,
  c,
  [39, 6],
  c,
  [35, 6],
  c,
  [33, 16],
  c,
  [768, 10],
  c,
  [147, 16],
  103,
  113,
  c,
  [173, 4],
  c,
  [795, 12],
  c,
  [28, 10],
  c,
  [822, 17],
  c,
  [55, 14],
  c,
  [29, 27],
  c,
  [387, 4],
  c,
  [192, 43],
  c,
  [304, 8],
  c,
  [130, 22],
  c,
  [183, 21],
  c,
  [127, 27],
  c,
  [209, 19],
  c,
  [1003, 8],
  c,
  [1062, 18],
  c,
  [55, 14],
  c,
  [25, 71],
  7,
  19,
  55,
  56,
  112,
  129,
  c,
  [222, 6],
  c,
  [263, 3],
  11,
  c,
  [264, 12],
  s,
  [104, 8, 1],
  c,
  [265, 22],
  51,
  55,
  123,
  124,
  126,
  136,
  158,
  s,
  [55, 3],
  c,
  [321, 45],
  9,
  c,
  [1151, 3],
  c,
  [660, 24],
  c,
  [36, 3],
  8,
  17,
  55,
  56,
  c,
  [1149, 3],
  c,
  [890, 6],
  c,
  [6, 6],
  8,
  c,
  [850, 43],
  c,
  [845, 62],
  c,
  [62, 68],
  c,
  [21, 15],
  35,
  c,
  [1173, 3],
  86,
  136,
  c,
  [931, 7],
  11,
  c,
  [1370, 6],
  c,
  [215, 6],
  56,
  c,
  [1387, 3],
  c,
  [36, 3],
  14,
  15,
  39,
  97,
  c,
  [832, 76],
  8,
  48,
  c,
  [718, 45],
  7,
  c,
  [154, 3],
  15,
  17,
  c,
  [530, 5],
  c,
  [809, 6],
  c,
  [15, 18],
  c,
  [14, 9],
  8,
  c,
  [27, 8],
  c,
  [98, 3],
  19,
  51,
  c,
  [198, 3],
  114,
  116,
  117,
  119,
  c,
  [82, 3],
  c,
  [80, 8],
  156,
  7,
  103,
  4,
  c,
  [50, 3],
  c,
  [579, 41],
  c,
  [71, 7],
  c,
  [69, 8],
  132,
  c,
  [67, 4],
  c,
  [1474, 3],
  c,
  [93, 23],
  55,
  136,
  c,
  [95, 4],
  c,
  [28, 26],
  6,
  50,
  55,
  136,
  55,
  136,
  c,
  [4, 8],
  7,
  103,
  7,
  10,
  103,
  113,
  c,
  [267, 43],
  55,
  136,
  6,
  11,
  5,
  6,
  12,
  6,
  41,
  30,
  c,
  [1603, 17],
  c,
  [665, 5],
  14,
  7,
  30,
  84,
  144,
  c,
  [4, 3],
  146,
  c,
  [549, 86],
  c,
  [24, 24],
  c,
  [3, 3],
  30,
  11,
  14,
  c,
  [467, 47],
  c,
  [1261, 25],
  c,
  [1494, 45],
  c,
  [1994, 4],
  114,
  c,
  [13, 3],
  27,
  6,
  11,
  c,
  [54, 43],
  17,
  27,
  7,
  10,
  17,
  27,
  103,
  113,
  c,
  [6, 6],
  17,
  27,
  s,
  [17, 3],
  c,
  [394, 4],
  6,
  8,
  c,
  [10, 3],
  27,
  27,
  c,
  [73, 43],
  14,
  c,
  [451, 3],
  14,
  103,
  8,
  c,
  [50, 43],
  51,
  55,
  c,
  [1169, 4],
  c,
  [1720, 86],
  c,
  [965, 3],
  c,
  [505, 21],
  14,
  30,
  c,
  [467, 25],
  c,
  [443, 4],
  c,
  [4, 4],
  30,
  c,
  [196, 5],
  c,
  [949, 29],
  c,
  [137, 15],
  83,
  c,
  [138, 7],
  s,
  [114, 5, 1],
  c,
  [682, 19],
  7,
  103,
  45,
  c,
  [939, 15],
  c,
  [1328, 13],
  c,
  [13, 12],
  c,
  [2243, 7],
  14,
  103,
  14,
  30,
  6,
  41,
  c,
  [170, 14],
  101,
  c,
  [679, 7],
  c,
  [15, 3],
  c,
  [4, 4],
  c,
  [171, 5],
  30,
  c,
  [88, 15],
  c,
  [290, 43],
  27,
  6,
  c,
  [2708, 3],
  c,
  [632, 3],
  c,
  [630, 5],
  c,
  [626, 7],
  80,
  103,
  147,
  c,
  [66, 43],
  11,
  18,
  c,
  [565, 6],
  11,
  18,
  11,
  18,
  11,
  18,
  14,
  c,
  [368, 21],
  c,
  [435, 46],
  40,
  44,
  45,
  28,
  30,
  c,
  [272, 7],
  c,
  [2256, 90],
  c,
  [43, 82],
  c,
  [595, 21],
  41,
  30,
  44,
  33,
  c,
  [415, 15],
  c,
  [296, 3],
  s,
  [11, 3],
  40,
  42,
  43,
  c,
  [1088, 7],
  c,
  [301, 58],
  c,
  [64, 64],
  30,
  c,
  [44, 44],
  c,
  [819, 22],
  c,
  [21, 21],
  11,
  c,
  [153, 21],
  c,
  [242, 25],
  40,
  44,
  46,
  c,
  [1440, 41],
  c,
  [135, 37],
  c,
  [805, 7],
  40,
  42,
  c,
  [112, 23],
  c,
  [137, 3],
  c,
  [71, 22],
  30,
  c,
  [51, 24],
  c,
  [47, 21],
  c,
  [45, 3],
  30
]),
  type: u([
  s,
  [2, 3],
  s,
  [0, 12],
  1,
  s,
  [2, 4],
  s,
  [0, 10],
  c,
  [13, 11],
  s,
  [2, 9],
  c,
  [17, 10],
  c,
  [36, 22],
  c,
  [7, 3],
  0,
  2,
  c,
  [4, 4],
  c,
  [45, 11],
  c,
  [10, 6],
  c,
  [6, 9],
  s,
  [2, 58],
  c,
  [69, 7],
  c,
  [91, 7],
  c,
  [101, 4],
  c,
  [139, 10],
  c,
  [36, 13],
  c,
  [200, 14],
  c,
  [195, 14],
  c,
  [33, 32],
  c,
  [11, 5],
  c,
  [100, 7],
  c,
  [5, 4],
  c,
  [250, 16],
  c,
  [46, 13],
  c,
  [20, 17],
  c,
  [268, 13],
  c,
  [293, 11],
  c,
  [146, 30],
  c,
  [22, 20],
  c,
  [53, 23],
  c,
  [43, 26],
  c,
  [103, 18],
  c,
  [120, 47],
  c,
  [83, 15],
  c,
  [210, 8],
  c,
  [257, 46],
  c,
  [43, 42],
  c,
  [25, 23],
  c,
  [89, 27],
  c,
  [254, 25],
  c,
  [600, 31],
  c,
  [122, 21],
  c,
  [52, 26],
  c,
  [388, 59],
  c,
  [43, 40],
  c,
  [76, 37],
  c,
  [225, 42],
  c,
  [55, 53],
  c,
  [743, 4],
  c,
  [235, 60],
  c,
  [128, 36],
  c,
  [1000, 55],
  s,
  [2, 106],
  c,
  [220, 24],
  s,
  [0, 29],
  c,
  [32, 8],
  c,
  [556, 60],
  c,
  [782, 23],
  c,
  [905, 11],
  c,
  [1400, 21],
  c,
  [804, 47],
  c,
  [845, 48],
  c,
  [62, 76],
  c,
  [642, 17],
  c,
  [215, 14],
  c,
  [1118, 15],
  c,
  [832, 85],
  c,
  [718, 41],
  c,
  [15, 29],
  c,
  [762, 20],
  c,
  [79, 18],
  c,
  [579, 49],
  c,
  [36, 17],
  c,
  [1474, 19],
  c,
  [26, 10],
  c,
  [28, 32],
  c,
  [1912, 8],
  c,
  [16, 7],
  c,
  [664, 46],
  c,
  [45, 26],
  c,
  [1979, 10],
  c,
  [84, 10],
  c,
  [549, 81],
  c,
  [1798, 34],
  c,
  [1185, 65],
  c,
  [1451, 50],
  c,
  [82, 23],
  c,
  [128, 34],
  c,
  [735, 8],
  c,
  [1412, 31],
  c,
  [73, 30],
  c,
  [3, 6],
  c,
  [50, 45],
  c,
  [1485, 61],
  c,
  [543, 30],
  c,
  [505, 28],
  c,
  [443, 64],
  c,
  [822, 44],
  c,
  [777, 12],
  c,
  [351, 11],
  c,
  [257, 13],
  c,
  [13, 12],
  c,
  [332, 9],
  c,
  [1351, 24],
  c,
  [4, 8],
  c,
  [2053, 78],
  c,
  [48, 8],
  c,
  [571, 55],
  c,
  [1525, 30],
  c,
  [435, 46],
  c,
  [536, 93],
  c,
  [43, 91],
  c,
  [352, 32],
  c,
  [1970, 33],
  c,
  [114, 63],
  c,
  [510, 60],
  c,
  [44, 36],
  c,
  [1307, 43],
  c,
  [110, 25],
  c,
  [911, 38],
  c,
  [2985, 43],
  c,
  [88, 52],
  c,
  [2969, 32],
  c,
  [232, 38]
]),
  state: u([
  1,
  2,
  5,
  4,
  3,
  6,
  10,
  11,
  12,
  8,
  13,
  14,
  19,
  17,
  16,
  c,
  [10, 7],
  20,
  22,
  c,
  [8, 6],
  28,
  30,
  29,
  31,
  33,
  37,
  36,
  35,
  41,
  44,
  45,
  40,
  42,
  43,
  48,
  c,
  [22, 7],
  53,
  52,
  54,
  55,
  56,
  63,
  60,
  62,
  37,
  36,
  61,
  35,
  64,
  67,
  68,
  69,
  67,
  68,
  76,
  75,
  80,
  79,
  82,
  81,
  83,
  87,
  89,
  c,
  [44, 3],
  90,
  c,
  [4, 3],
  95,
  68,
  97,
  98,
  100,
  13,
  14,
  101,
  102,
  108,
  109,
  103,
  104,
  42,
  43,
  99,
  96,
  106,
  95,
  68,
  118,
  c,
  [18, 13],
  117,
  106,
  124,
  125,
  127,
  126,
  128,
  130,
  131,
  134,
  140,
  c,
  [24, 13],
  106,
  141,
  c,
  [14, 13],
  142,
  144,
  146,
  145,
  44,
  45,
  147,
  150,
  154,
  153,
  37,
  36,
  152,
  35,
  156,
  c,
  [43, 13],
  155,
  106,
  158,
  c,
  [44, 13],
  s,
  [159, 5, 1],
  s,
  [176, 4, 1],
  173,
  164,
  165,
  180,
  186,
  185,
  187,
  192,
  193,
  172,
  171,
  181,
  184,
  45,
  170,
  182,
  43,
  169,
  189,
  201,
  202,
  s,
  [204, 5, 1],
  192,
  193,
  203,
  189,
  210,
  c,
  [69, 13],
  209,
  c,
  [69, 15],
  212,
  c,
  [111, 3],
  219,
  c,
  [4, 3],
  220,
  225,
  c,
  [151, 14],
  226,
  c,
  [14, 13],
  229,
  c,
  [29, 14],
  230,
  c,
  [14, 13],
  144,
  146,
  147,
  231,
  c,
  [32, 14],
  232,
  c,
  [14, 13],
  c,
  [113, 14],
  239,
  238,
  c,
  [16, 14],
  245,
  42,
  43,
  247,
  248,
  250,
  251,
  266,
  c,
  [205, 27],
  267,
  c,
  [28, 27],
  268,
  c,
  [24, 4],
  270,
  c,
  [22, 6],
  271,
  273,
  c,
  [22, 3],
  272,
  c,
  [22, 4],
  276,
  275,
  283,
  282,
  287,
  286,
  288,
  146,
  147,
  289,
  c,
  [59, 27],
  291,
  293,
  299,
  301,
  298,
  44,
  45,
  300,
  42,
  43,
  305,
  306,
  c,
  [39, 27],
  308,
  309,
  312,
  311,
  310,
  313,
  147,
  314,
  c,
  [35, 27],
  c,
  [210, 14],
  317,
  44,
  45,
  319,
  127,
  126,
  320,
  c,
  [341, 3],
  321,
  c,
  [4, 3],
  325,
  c,
  [283, 14],
  326,
  c,
  [14, 13],
  327,
  c,
  [29, 14],
  328,
  c,
  [312, 27],
  331,
  c,
  [43, 14],
  332,
  c,
  [43, 27],
  c,
  [14, 14],
  338,
  147,
  c,
  [634, 4],
  341,
  c,
  [139, 3],
  342,
  42,
  43,
  345,
  346,
  c,
  [199, 27],
  347,
  c,
  [332, 21],
  351,
  c,
  [50, 27],
  287,
  286,
  283,
  282,
  276,
  275,
  357,
  354,
  361,
  359,
  353,
  364,
  363,
  358,
  360,
  362,
  145,
  184,
  45,
  365,
  182,
  43,
  355,
  366,
  368,
  c,
  [337, 28],
  361,
  359,
  369,
  c,
  [45, 5],
  370,
  c,
  [43, 4],
  372,
  c,
  [61, 4],
  373,
  c,
  [61, 12],
  374,
  375,
  c,
  [19, 4],
  376,
  c,
  [19, 12],
  377,
  378,
  s,
  [380, 7, 1],
  388,
  387,
  389,
  c,
  [89, 27],
  293,
  398,
  c,
  [757, 9],
  399,
  44,
  45,
  402,
  401,
  404,
  403,
  405,
  c,
  [309, 14],
  406,
  c,
  [309, 41],
  c,
  [14, 14],
  419,
  c,
  [117, 27],
  424,
  423,
  420,
  251,
  425,
  c,
  [32, 27],
  357,
  354,
  c,
  [378, 3],
  430,
  c,
  [324, 33],
  435,
  c,
  [34, 27],
  437,
  438,
  441,
  c,
  [30, 27],
  442,
  c,
  [671, 3],
  443,
  c,
  [32, 27],
  444,
  c,
  [28, 27],
  445,
  147,
  446,
  c,
  [290, 14],
  c,
  [248, 14],
  459,
  c,
  [529, 21],
  357,
  461,
  c,
  [82, 6],
  354,
  c,
  [83, 13],
  462,
  c,
  [83, 7],
  463,
  464,
  424,
  423,
  466,
  c,
  [243, 3],
  467,
  c,
  [4, 3],
  469,
  c,
  [4, 3],
  470,
  c,
  [4, 3],
  471,
  c,
  [4, 3],
  472,
  c,
  [91, 8],
  478,
  c,
  [92, 6],
  480,
  13,
  14,
  481,
  13,
  14,
  424,
  423,
  486,
  c,
  [159, 27],
  239,
  291,
  238,
  488,
  c,
  [379, 29],
  498,
  c,
  [190, 14],
  499,
  c,
  [45, 27],
  500,
  147,
  505,
  c,
  [134, 3],
  506,
  c,
  [34, 27],
  507,
  c,
  [28, 27],
  508,
  c,
  [28, 27],
  509,
  c,
  [1050, 41],
  424,
  423,
  524,
  c,
  [177, 14],
  525,
  c,
  [59, 27],
  526,
  c,
  [43, 14],
  527,
  c,
  [43, 27],
  529,
  c,
  [130, 41],
  c,
  [14, 14],
  537,
  c,
  [99, 14],
  540,
  c,
  [15, 14],
  542,
  c,
  [539, 28],
  c,
  [14, 22],
  548,
  c,
  [15, 6],
  550,
  c,
  [58, 28],
  558,
  c,
  [29, 28]
]),
  mode: u([
  s,
  [1, 26],
  2,
  2,
  c,
  [17, 17],
  s,
  [2, 8],
  c,
  [11, 11],
  s,
  [2, 18],
  c,
  [29, 19],
  1,
  c,
  [75, 3],
  c,
  [78, 13],
  c,
  [92, 8],
  c,
  [7, 8],
  c,
  [16, 7],
  c,
  [114, 16],
  c,
  [152, 24],
  c,
  [47, 6],
  c,
  [46, 8],
  c,
  [54, 20],
  c,
  [135, 10],
  c,
  [23, 14],
  c,
  [51, 16],
  c,
  [77, 9],
  s,
  [1, 55],
  c,
  [104, 9],
  c,
  [7, 6],
  c,
  [6, 13],
  c,
  [104, 14],
  c,
  [261, 10],
  c,
  [151, 18],
  c,
  [246, 41],
  c,
  [372, 29],
  c,
  [377, 21],
  c,
  [27, 50],
  c,
  [122, 18],
  c,
  [472, 27],
  s,
  [2, 31],
  c,
  [33, 33],
  c,
  [36, 21],
  c,
  [231, 30],
  c,
  [25, 62],
  c,
  [370, 44],
  c,
  [45, 4],
  c,
  [541, 60],
  c,
  [560, 26],
  c,
  [62, 59],
  c,
  [731, 12],
  c,
  [13, 17],
  c,
  [249, 16],
  s,
  [1, 96],
  c,
  [725, 5],
  c,
  [270, 62],
  c,
  [355, 5],
  c,
  [1023, 7],
  c,
  [179, 48],
  c,
  [417, 8],
  c,
  [135, 63],
  c,
  [483, 82],
  c,
  [408, 9],
  c,
  [44, 60],
  c,
  [467, 16],
  c,
  [79, 23],
  c,
  [251, 109],
  c,
  [221, 44],
  s,
  [1, 142]
]),
  goto: u([
  15,
  9,
  7,
  18,
  c,
  [4, 3],
  21,
  15,
  7,
  s,
  [23, 5, 1],
  32,
  34,
  38,
  39,
  46,
  47,
  49,
  15,
  7,
  50,
  51,
  194,
  194,
  39,
  34,
  39,
  38,
  57,
  58,
  59,
  38,
  39,
  65,
  66,
  38,
  70,
  71,
  38,
  s,
  [184, 10],
  72,
  s,
  [184, 18],
  s,
  [179, 10],
  73,
  s,
  [179, 18],
  74,
  196,
  77,
  78,
  200,
  77,
  86,
  85,
  77,
  84,
  88,
  38,
  39,
  38,
  39,
  91,
  92,
  188,
  188,
  59,
  93,
  94,
  38,
  15,
  112,
  213,
  105,
  107,
  110,
  111,
  114,
  113,
  s,
  [80, 3],
  115,
  116,
  c,
  [15, 3],
  217,
  c,
  [15, 4],
  s,
  [119, 5, 1],
  38,
  39,
  88,
  129,
  86,
  133,
  132,
  137,
  136,
  135,
  139,
  138,
  15,
  112,
  c,
  [23, 4],
  c,
  [6, 6],
  143,
  148,
  149,
  186,
  186,
  151,
  186,
  186,
  38,
  39,
  15,
  112,
  211,
  c,
  [17, 4],
  157,
  15,
  112,
  214,
  c,
  [8, 4],
  191,
  166,
  190,
  188,
  168,
  183,
  167,
  174,
  175,
  88,
  194,
  195,
  196,
  46,
  47,
  184,
  184,
  197,
  s,
  [184, 7],
  198,
  199,
  200,
  38,
  191,
  190,
  105,
  c,
  [23, 4],
  15,
  112,
  215,
  c,
  [43, 4],
  211,
  15,
  112,
  218,
  c,
  [8, 4],
  213,
  149,
  215,
  214,
  49,
  49,
  216,
  51,
  51,
  217,
  218,
  213,
  149,
  137,
  222,
  221,
  224,
  223,
  c,
  [106, 12],
  228,
  227,
  c,
  [120, 13],
  c,
  [158, 3],
  c,
  [14, 10],
  15,
  233,
  c,
  [6, 4],
  234,
  235,
  237,
  236,
  204,
  204,
  240,
  s,
  [204, 4],
  61,
  61,
  241,
  61,
  61,
  s,
  [184, 3],
  242,
  s,
  [179, 5],
  243,
  s,
  [179, 3],
  190,
  190,
  59,
  244,
  15,
  112,
  212,
  c,
  [40, 4],
  110,
  111,
  249,
  246,
  s,
  [105, 3],
  261,
  105,
  254,
  252,
  105,
  258,
  259,
  260,
  264,
  s,
  [105, 5],
  253,
  255,
  256,
  257,
  262,
  263,
  265,
  c,
  [183, 15],
  c,
  [15, 16],
  269,
  190,
  188,
  183,
  c,
  [11, 6],
  231,
  231,
  277,
  231,
  231,
  274,
  s,
  [231, 20],
  s,
  [232, 4],
  278,
  s,
  [232, 4],
  279,
  s,
  [232, 16],
  229,
  229,
  277,
  229,
  229,
  280,
  s,
  [229, 4],
  281,
  s,
  [229, 16],
  227,
  227,
  277,
  227,
  227,
  284,
  s,
  [227, 4],
  285,
  s,
  [227, 16],
  38,
  c,
  [133, 15],
  s,
  [226, 8],
  290,
  s,
  [226, 16],
  230,
  230,
  277,
  s,
  [230, 22],
  s,
  [180, 10],
  292,
  s,
  [180, 16],
  s,
  [174, 19],
  38,
  s,
  [174, 7],
  s,
  [175, 10],
  294,
  s,
  [175, 16],
  s,
  [238, 8],
  295,
  s,
  [238, 16],
  s,
  [237, 8],
  296,
  s,
  [237, 16],
  s,
  [239, 8],
  297,
  s,
  [239, 16],
  302,
  303,
  c,
  [358, 5],
  304,
  c,
  [226, 12],
  307,
  88,
  38,
  119,
  121,
  c,
  [247, 16],
  315,
  s,
  [79, 3],
  316,
  15,
  112,
  216,
  c,
  [554, 6],
  318,
  242,
  38,
  39,
  213,
  149,
  213,
  149,
  322,
  324,
  323,
  c,
  [521, 13],
  c,
  [6, 12],
  329,
  c,
  [6, 4],
  330,
  c,
  [19, 13],
  333,
  c,
  [6, 4],
  334,
  15,
  335,
  c,
  [7, 4],
  336,
  337,
  c,
  [650, 3],
  205,
  205,
  339,
  s,
  [205, 4],
  340,
  c,
  [78, 4],
  120,
  122,
  110,
  111,
  343,
  249,
  344,
  c,
  [500, 16],
  348,
  c,
  [500, 9],
  349,
  350,
  c,
  [28, 15],
  c,
  [438, 4],
  352,
  c,
  [435, 8],
  c,
  [478, 4],
  352,
  c,
  [475, 8],
  c,
  [543, 4],
  352,
  c,
  [529, 11],
  c,
  [525, 7],
  191,
  356,
  190,
  183,
  88,
  46,
  47,
  277,
  191,
  166,
  367,
  c,
  [101, 14],
  c,
  [24, 5],
  371,
  38,
  c,
  [32, 7],
  38,
  277,
  c,
  [9, 9],
  237,
  379,
  s,
  [38, 6],
  277,
  277,
  352,
  c,
  [125, 15],
  38,
  391,
  390,
  392,
  393,
  394,
  396,
  395,
  397,
  c,
  [846, 7],
  213,
  149,
  400,
  137,
  198,
  137,
  202,
  c,
  [240, 13],
  407,
  c,
  [6, 4],
  408,
  15,
  409,
  c,
  [7, 4],
  410,
  411,
  199,
  200,
  15,
  412,
  c,
  [10, 4],
  413,
  414,
  199,
  200,
  415,
  199,
  200,
  416,
  417,
  418,
  c,
  [83, 15],
  108,
  108,
  277,
  108,
  261,
  421,
  108,
  254,
  252,
  108,
  422,
  c,
  [793, 4],
  s,
  [108, 5],
  c,
  [793, 22],
  426,
  213,
  149,
  427,
  429,
  428,
  c,
  [21, 15],
  297,
  233,
  277,
  352,
  285,
  234,
  277,
  352,
  281,
  235,
  290,
  236,
  279,
  295,
  296,
  277,
  352,
  391,
  431,
  432,
  294,
  73,
  433,
  434,
  c,
  [39, 15],
  436,
  277,
  277,
  439,
  440,
  c,
  [20, 15],
  88,
  c,
  [495, 16],
  c,
  [237, 16],
  c,
  [209, 6],
  447,
  448,
  449,
  15,
  450,
  c,
  [9, 4],
  451,
  452,
  199,
  200,
  453,
  199,
  200,
  454,
  455,
  199,
  200,
  456,
  457,
  458,
  191,
  460,
  c,
  [420, 9],
  c,
  [56, 16],
  277,
  465,
  115,
  115,
  277,
  115,
  352,
  115,
  115,
  422,
  s,
  [115, 5],
  c,
  [564, 4],
  468,
  c,
  [5, 4],
  213,
  149,
  277,
  473,
  474,
  475,
  477,
  476,
  15,
  479,
  c,
  [297, 5],
  15,
  482,
  199,
  200,
  483,
  484,
  485,
  111,
  111,
  277,
  111,
  352,
  111,
  111,
  422,
  s,
  [111, 5],
  c,
  [75, 15],
  487,
  204,
  277,
  230,
  240,
  204,
  s,
  [230, 14],
  c,
  [35, 15],
  489,
  490,
  277,
  352,
  422,
  158,
  s,
  [491, 7, 1],
  c,
  [178, 6],
  c,
  [144, 16],
  199,
  200,
  s,
  [501, 4, 1],
  213,
  149,
  c,
  [1129, 31],
  c,
  [15, 29],
  15,
  510,
  c,
  [90, 4],
  s,
  [511, 5, 1],
  113,
  113,
  277,
  113,
  352,
  113,
  113,
  422,
  s,
  [113, 5],
  517,
  516,
  s,
  [518, 4, 1],
  199,
  522,
  523,
  200,
  c,
  [124, 21],
  c,
  [21, 21],
  528,
  c,
  [16, 15],
  530,
  531,
  15,
  532,
  c,
  [39, 4],
  533,
  15,
  534,
  c,
  [7, 4],
  535,
  536,
  c,
  [54, 6],
  199,
  538,
  539,
  c,
  [85, 7],
  199,
  200,
  541,
  c,
  [605, 7],
  543,
  c,
  [6, 4],
  544,
  545,
  15,
  546,
  c,
  [8, 4],
  547,
  c,
  [329, 6],
  199,
  549,
  c,
  [39, 8],
  551,
  552,
  200,
  553,
  15,
  554,
  c,
  [11, 4],
  555,
  556,
  199,
  557,
  c,
  [22, 7],
  559,
  15,
  560,
  c,
  [29, 5],
  561,
  200,
  562
])
}),
defaultActions: bda({
  idx: u([
  5,
  6,
  8,
  s,
  [10, 5, 1],
  18,
  19,
  21,
  22,
  23,
  29,
  30,
  31,
  s,
  [35, 5, 1],
  s,
  [42, 4, 1],
  49,
  50,
  51,
  53,
  61,
  63,
  66,
  67,
  71,
  74,
  76,
  80,
  s,
  [88, 4, 1],
  94,
  95,
  s,
  [98, 7, 1],
  s,
  [106, 4, 1],
  116,
  s,
  [119, 4, 1],
  125,
  143,
  146,
  150,
  151,
  152,
  154,
  158,
  160,
  161,
  162,
  164,
  165,
  169,
  176,
  177,
  178,
  180,
  189,
  s,
  [192, 5, 1],
  s,
  [202, 7, 1],
  214,
  218,
  234,
  235,
  236,
  238,
  246,
  248,
  s,
  [251, 15, 1],
  268,
  276,
  283,
  s,
  [287, 4, 2],
  300,
  301,
  304,
  306,
  307,
  309,
  311,
  312,
  319,
  320,
  321,
  330,
  s,
  [334, 4, 2],
  341,
  s,
  [343, 5, 1],
  355,
  357,
  366,
  367,
  372,
  374,
  375,
  377,
  378,
  s,
  [380, 6, 1],
  390,
  392,
  s,
  [398, 4, 2],
  408,
  410,
  413,
  416,
  417,
  418,
  424,
  428,
  431,
  435,
  436,
  s,
  [439, 5, 1],
  447,
  451,
  454,
  456,
  457,
  459,
  463,
  464,
  467,
  473,
  474,
  478,
  480,
  483,
  484,
  485,
  488,
  s,
  [489, 5, 2],
  503,
  s,
  [517, 5, 1],
  528,
  530,
  536,
  544,
  547,
  548,
  553,
  555,
  559,
  562
]),
  goto: u([
  8,
  22,
  21,
  24,
  25,
  26,
  65,
  66,
  4,
  9,
  6,
  23,
  7,
  11,
  12,
  13,
  19,
  192,
  193,
  184,
  179,
  180,
  181,
  175,
  176,
  2,
  3,
  5,
  195,
  17,
  189,
  70,
  75,
  74,
  1,
  197,
  201,
  169,
  15,
  14,
  16,
  69,
  76,
  62,
  64,
  s,
  [206, 5, 1],
  87,
  97,
  221,
  222,
  73,
  182,
  177,
  183,
  178,
  47,
  56,
  58,
  10,
  187,
  18,
  191,
  63,
  102,
  103,
  104,
  106,
  107,
  116,
  223,
  224,
  225,
  228,
  161,
  240,
  241,
  170,
  171,
  172,
  78,
  81,
  219,
  220,
  237,
  238,
  239,
  46,
  27,
  44,
  45,
  57,
  53,
  82,
  84,
  185,
  s,
  [244, 14, 1],
  114,
  130,
  132,
  134,
  160,
  128,
  173,
  122,
  123,
  167,
  100,
  162,
  164,
  242,
  243,
  48,
  50,
  52,
  40,
  42,
  43,
  59,
  55,
  60,
  68,
  83,
  85,
  86,
  110,
  157,
  126,
  129,
  98,
  139,
  140,
  131,
  146,
  133,
  144,
  137,
  138,
  141,
  142,
  143,
  168,
  163,
  77,
  72,
  199,
  203,
  38,
  39,
  41,
  36,
  54,
  67,
  136,
  125,
  99,
  159,
  117,
  121,
  124,
  101,
  165,
  166,
  71,
  37,
  32,
  34,
  35,
  112,
  145,
  135,
  127,
  119,
  120,
  94,
  20,
  30,
  31,
  33,
  109,
  s,
  [147, 4, 2],
  118,
  29,
  156,
  s,
  [148, 4, 2],
  28,
  88,
  155,
  89,
  95,
  96,
  91,
  90,
  92,
  93
])
}),
parseError: function parseError(str, hash, ExceptionClass) {
    if (hash.recoverable && typeof this.trace === 'function') {
        this.trace(str);
        hash.destroy(); // destroy... well, *almost*!
    } else {
        if (!ExceptionClass) {
            ExceptionClass = this.JisonParserError;
        }
        throw new ExceptionClass(str, hash);
    }
},
parse: function parse(input) {
    var self = this;
    var stack = new Array(128);         // token stack: stores token which leads to state at the same index (column storage)
    var sstack = new Array(128);        // state stack: stores states (column storage)

    var vstack = new Array(128);        // semantic value stack
    var lstack = new Array(128);        // location stack
    var table = this.table;
    var sp = 0;                         // 'stack pointer': index into the stacks
    var yyloc;

    var yylineno;


    var symbol = 0;



    var TERROR = this.TERROR;
    var EOF = this.EOF;
    var ERROR_RECOVERY_TOKEN_DISCARD_COUNT = (this.options.errorRecoveryTokenDiscardCount | 0) || 3;
    var NO_ACTION = [0, 563 /* === table.length :: ensures that anyone using this new state will fail dramatically! */];

    var lexer;
    if (this.__lexer__) {
        lexer = this.__lexer__;
    } else {
        lexer = this.__lexer__ = Object.create(this.lexer);
    }

    var sharedState_yy = {
        parseError: undefined,
        quoteName: undefined,
        lexer: undefined,
        parser: undefined,
        pre_parse: undefined,
        post_parse: undefined,
        pre_lex: undefined,
        post_lex: undefined      // WARNING: must be written this way for the code expanders to work correctly in both ES5 and ES6 modes!
    };

    var ASSERT;
    if (typeof assert !== 'function') {
        ASSERT = function JisonAssert(cond, msg) {
            if (!cond) {
                throw new Error('assertion failed: ' + (msg || '***'));
            }
        };
    } else {
        ASSERT = assert;
    }

    this.yyGetSharedState = function yyGetSharedState() {
        return sharedState_yy;
    };


    // shallow clone objects, straight copy of simple `src` values
    // e.g. `lexer.yytext` MAY be a complex value object,
    // rather than a simple string/value.
    function shallow_copy(src) {
        if (typeof src === 'object') {
            var dst = {};
            for (var k in src) {
                if (Object.prototype.hasOwnProperty.call(src, k)) {
                    dst[k] = src[k];
                }
            }
            return dst;
        }
        return src;
    }
    function shallow_copy_noclobber(dst, src) {
        for (var k in src) {
            if (typeof dst[k] === 'undefined' && Object.prototype.hasOwnProperty.call(src, k)) {
                dst[k] = src[k];
            }
        }
    }
    function copy_yylloc(loc) {
        var rv = shallow_copy(loc);
        if (rv && rv.range) {
            rv.range = rv.range.slice(0);
        }
        return rv;
    }

    // copy state
    shallow_copy_noclobber(sharedState_yy, this.yy);

    sharedState_yy.lexer = lexer;
    sharedState_yy.parser = this;






    // Does the shared state override the default `parseError` that already comes with this instance?
    if (typeof sharedState_yy.parseError === 'function') {
        this.parseError = function parseErrorAlt(str, hash, ExceptionClass) {
            if (!ExceptionClass) {
                ExceptionClass = this.JisonParserError;
            }
            return sharedState_yy.parseError.call(this, str, hash, ExceptionClass);
        };
    } else {
        this.parseError = this.originalParseError;
    }

    // Does the shared state override the default `quoteName` that already comes with this instance?
    if (typeof sharedState_yy.quoteName === 'function') {
        this.quoteName = function quoteNameAlt(id_str) {
            return sharedState_yy.quoteName.call(this, id_str);
        };
    } else {
        this.quoteName = this.originalQuoteName;
    }

    // set up the cleanup function; make it an API so that external code can re-use this one in case of
    // calamities or when the `%options no-try-catch` option has been specified for the grammar, in which
    // case this parse() API method doesn't come with a `finally { ... }` block any more!
    //
    // NOTE: as this API uses parse() as a closure, it MUST be set again on every parse() invocation,
    //       or else your `sharedState`, etc. references will be *wrong*!
    this.cleanupAfterParse = function parser_cleanupAfterParse(resultValue, invoke_post_methods, do_not_nuke_errorinfos) {
        var rv;

        if (invoke_post_methods) {
            var hash;

            if (sharedState_yy.post_parse || this.post_parse) {
                // create an error hash info instance: we re-use this API in a **non-error situation**
                // as this one delivers all parser internals ready for access by userland code.
                hash = this.constructParseErrorInfo(null /* no error! */, null /* no exception! */, null, false);
            }

            if (sharedState_yy.post_parse) {
                rv = sharedState_yy.post_parse.call(this, sharedState_yy, resultValue, hash);
                if (typeof rv !== 'undefined') resultValue = rv;
            }
            if (this.post_parse) {
                rv = this.post_parse.call(this, sharedState_yy, resultValue, hash);
                if (typeof rv !== 'undefined') resultValue = rv;
            }

            // cleanup:
            if (hash && hash.destroy) {
                hash.destroy();
            }
        }

        if (this.__reentrant_call_depth > 1) return resultValue;        // do not (yet) kill the sharedState when this is a reentrant run.

        // clean up the lingering lexer structures as well:
        if (lexer.cleanupAfterLex) {
            lexer.cleanupAfterLex(do_not_nuke_errorinfos);
        }

        // prevent lingering circular references from causing memory leaks:
        if (sharedState_yy) {
            sharedState_yy.lexer = undefined;
            sharedState_yy.parser = undefined;
            if (lexer.yy === sharedState_yy) {
                lexer.yy = undefined;
            }
        }
        sharedState_yy = undefined;
        this.parseError = this.originalParseError;
        this.quoteName = this.originalQuoteName;

        // nuke the vstack[] array at least as that one will still reference obsoleted user values.
        // To be safe, we nuke the other internal stack columns as well...
        stack.length = 0;               // fastest way to nuke an array without overly bothering the GC
        sstack.length = 0;
        lstack.length = 0;
        vstack.length = 0;
        sp = 0;

        // nuke the error hash info instances created during this run.
        // Userland code must COPY any data/references
        // in the error hash instance(s) it is more permanently interested in.
        if (!do_not_nuke_errorinfos) {
            for (var i = this.__error_infos.length - 1; i >= 0; i--) {
                var el = this.__error_infos[i];
                if (el && typeof el.destroy === 'function') {
                    el.destroy();
                }
            }
            this.__error_infos.length = 0;


        }

        return resultValue;
    };

    // merge yylloc info into a new yylloc instance.
    //
    // `first_index` and `last_index` MAY be UNDEFINED/NULL or these are indexes into the `lstack[]` location stack array.
    //
    // `first_yylloc` and `last_yylloc` MAY be UNDEFINED/NULL or explicit (custom or regular) `yylloc` instances, in which
    // case these override the corresponding first/last indexes.
    //
    // `dont_look_back` is an optional flag (default: FALSE), which instructs this merge operation NOT to search
    // through the parse location stack for a location, which would otherwise be used to construct the new (epsilon!)
    // yylloc info.
    //
    // Note: epsilon rule's yylloc situation is detected by passing both `first_index` and `first_yylloc` as UNDEFINED/NULL.
    this.yyMergeLocationInfo = function parser_yyMergeLocationInfo(first_index, last_index, first_yylloc, last_yylloc, dont_look_back) {
        var i1 = first_index | 0,
            i2 = last_index | 0;
        var l1 = first_yylloc,
            l2 = last_yylloc;
        var rv;

        // rules:
        // - first/last yylloc entries override first/last indexes

        if (!l1) {
            if (first_index != null) {
                for (var i = i1; i <= i2; i++) {
                    l1 = lstack[i];
                    if (l1) {
                        break;
                    }
                }
            }
        }

        if (!l2) {
            if (last_index != null) {
                for (var i = i2; i >= i1; i--) {
                    l2 = lstack[i];
                    if (l2) {
                        break;
                    }
                }
            }
        }

        // - detect if an epsilon rule is being processed and act accordingly:
        if (!l1 && first_index == null) {
            // epsilon rule span merger. With optional look-ahead in l2.
            if (!dont_look_back) {
                for (var i = (i1 || sp) - 1; i >= 0; i--) {
                    l1 = lstack[i];
                    if (l1) {
                        break;
                    }
                }
            }
            if (!l1) {
                if (!l2) {
                    // when we still don't have any valid yylloc info, we're looking at an epsilon rule
                    // without look-ahead and no preceding terms and/or `dont_look_back` set:
                    // in that case we ca do nothing but return NULL/UNDEFINED:
                    return undefined;
                } else {
                    // shallow-copy L2: after all, we MAY be looking
                    // at unconventional yylloc info objects...
                    rv = shallow_copy(l2);
                    if (rv.range) {
                        // shallow copy the yylloc ranges info to prevent us from modifying the original arguments' entries:
                        rv.range = rv.range.slice(0);
                    }
                    return rv;
                }
            } else {
                // shallow-copy L1, then adjust first col/row 1 column past the end.
                rv = shallow_copy(l1);
                rv.first_line = rv.last_line;
                rv.first_column = rv.last_column;
                if (rv.range) {
                    // shallow copy the yylloc ranges info to prevent us from modifying the original arguments' entries:
                    rv.range = rv.range.slice(0);
                    rv.range[0] = rv.range[1];
                }

                if (l2) {
                    // shallow-mixin L2, then adjust last col/row accordingly.
                    shallow_copy_noclobber(rv, l2);
                    rv.last_line = l2.last_line;
                    rv.last_column = l2.last_column;
                    if (rv.range && l2.range) {
                        rv.range[1] = l2.range[1];
                    }
                }
                return rv;
            }
        }

        if (!l1) {
            l1 = l2;
            l2 = null;
        }
        if (!l1) {
            return undefined;
        }

        // shallow-copy L1|L2, before we try to adjust the yylloc values: after all, we MAY be looking
        // at unconventional yylloc info objects...
        rv = shallow_copy(l1);

        // first_line: ...,
        // first_column: ...,
        // last_line: ...,
        // last_column: ...,
        if (rv.range) {
            // shallow copy the yylloc ranges info to prevent us from modifying the original arguments' entries:
            rv.range = rv.range.slice(0);
        }

        if (l2) {
            shallow_copy_noclobber(rv, l2);
            rv.last_line = l2.last_line;
            rv.last_column = l2.last_column;
            if (rv.range && l2.range) {
                rv.range[1] = l2.range[1];
            }
        }

        return rv;
    };

    // NOTE: as this API uses parse() as a closure, it MUST be set again on every parse() invocation,
    //       or else your `lexer`, `sharedState`, etc. references will be *wrong*!
    this.constructParseErrorInfo = function parser_constructParseErrorInfo(msg, ex, expected, recoverable) {
        var pei = {
            errStr: msg,
            exception: ex,
            text: lexer.match,
            value: lexer.yytext,
            token: this.describeSymbol(symbol) || symbol,
            token_id: symbol,
            line: lexer.yylineno,
            loc: copy_yylloc(lexer.yylloc),
            expected: expected,
            recoverable: recoverable,
            state: state,
            action: action,
            new_state: newState,
            symbol_stack: stack,
            state_stack: sstack,
            value_stack: vstack,
            location_stack: lstack,
            stack_pointer: sp,
            yy: sharedState_yy,
            lexer: lexer,
            parser: this,

            // and make sure the error info doesn't stay due to potential
            // ref cycle via userland code manipulations.
            // These would otherwise all be memory leak opportunities!
            //
            // Note that only array and object references are nuked as those
            // constitute the set of elements which can produce a cyclic ref.
            // The rest of the members is kept intact as they are harmless.
            destroy: function destructParseErrorInfo() {
                // remove cyclic references added to error info:
                // info.yy = null;
                // info.lexer = null;
                // info.value = null;
                // info.value_stack = null;
                // ...
                var rec = !!this.recoverable;
                for (var key in this) {
                    if (this.hasOwnProperty(key) && typeof key === 'object') {
                        this[key] = undefined;
                    }
                }
                this.recoverable = rec;
            }
        };
        // track this instance so we can `destroy()` it once we deem it superfluous and ready for garbage collection!
        this.__error_infos.push(pei);
        return pei;
    };













    function getNonTerminalFromCode(symbol) {
        var tokenName = self.getSymbolName(symbol);
        if (!tokenName) {
            tokenName = symbol;
        }
        return tokenName;
    }


    function lex() {
        var token = lexer.lex();
        // if token isn't its numeric value, convert
        if (typeof token !== 'number') {
            token = self.symbols_[token] || token;
        }

        return token || EOF;
    }


    var state, action, r, t;
    var yyval = {
        $: true,
        _$: undefined,
        yy: sharedState_yy
    };
    var p;
    var yyrulelen;
    var this_production;
    var newState;
    var retval = false;


    try {
        this.__reentrant_call_depth++;

        lexer.setInput(input, sharedState_yy);

        yyloc = lexer.yylloc;
        lstack[sp] = yyloc;
        vstack[sp] = null;
        sstack[sp] = 0;
        stack[sp] = 0;
        ++sp;





        if (this.pre_parse) {
            this.pre_parse.call(this, sharedState_yy);
        }
        if (sharedState_yy.pre_parse) {
            sharedState_yy.pre_parse.call(this, sharedState_yy);
        }

        newState = sstack[sp - 1];
        for (;;) {
            // retrieve state number from top of stack
            state = newState;               // sstack[sp - 1];

            // use default actions if available
            if (this.defaultActions[state]) {
                action = 2;
                newState = this.defaultActions[state];
            } else {
                // The single `==` condition below covers both these `===` comparisons in a single
                // operation:
                //
                //     if (symbol === null || typeof symbol === 'undefined') ...
                if (!symbol) {
                    symbol = lex();
                }
                // read action for current state and first input
                t = (table[state] && table[state][symbol]) || NO_ACTION;
                newState = t[1];
                action = t[0];











                // handle parse error
                if (!action) {
                    var errStr;
                    var errSymbolDescr = (this.describeSymbol(symbol) || symbol);
                    var expected = this.collect_expected_token_set(state);

                    // Report error
                    if (typeof lexer.yylineno === 'number') {
                        errStr = 'Parse error on line ' + (lexer.yylineno + 1) + ': ';
                    } else {
                        errStr = 'Parse error: ';
                    }
                    if (typeof lexer.showPosition === 'function') {
                        errStr += '\n' + lexer.showPosition(79 - 10, 10) + '\n';
                    }
                    if (expected.length) {
                        errStr += 'Expecting ' + expected.join(', ') + ', got unexpected ' + errSymbolDescr;
                    } else {
                        errStr += 'Unexpected ' + errSymbolDescr;
                    }
                    // we cannot recover from the error!
                    p = this.constructParseErrorInfo(errStr, null, expected, false);
                    retval = this.parseError(p.errStr, p, this.JisonParserError);
                    break;
                }


            }










            switch (action) {
            // catch misc. parse failures:
            default:
                // this shouldn't happen, unless resolve defaults are off
                if (action instanceof Array) {
                    p = this.constructParseErrorInfo('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol, null, null, false);
                    retval = this.parseError(p.errStr, p, this.JisonParserError);
                    break;
                }
                // Another case of better safe than sorry: in case state transitions come out of another error recovery process
                // or a buggy LUT (LookUp Table):
                p = this.constructParseErrorInfo('Parsing halted. No viable error recovery approach available due to internal system failure.', null, null, false);
                retval = this.parseError(p.errStr, p, this.JisonParserError);
                break;

            // shift:
            case 1:
                stack[sp] = symbol;
                vstack[sp] = lexer.yytext;
                lstack[sp] = copy_yylloc(lexer.yylloc);
                sstack[sp] = newState; // push state

                ++sp;
                symbol = 0;


                    // Pick up the lexer details for the current symbol as that one is not 'look-ahead' any more:



                    yyloc = lexer.yylloc;






                




                continue;

            // reduce:
            case 2:
                this_production = this.productions_[newState - 1];  // `this.productions_[]` is zero-based indexed while states start from 1 upwards...
                yyrulelen = this_production[1];










                r = this.performAction.call(yyval, yyloc, newState, sp - 1, vstack, lstack);

                if (typeof r !== 'undefined') {
                    retval = r;
                    break;
                }

                // pop off stack
                sp -= yyrulelen;

                // don't overwrite the `symbol` variable: use a local var to speed things up:
                var ntsymbol = this_production[0];    // push nonterminal (reduce)
                stack[sp] = ntsymbol;
                vstack[sp] = yyval.$;
                lstack[sp] = yyval._$;
                // goto new state = table[STATE][NONTERMINAL]
                newState = table[sstack[sp - 1]][ntsymbol];
                sstack[sp] = newState;
                ++sp;









                continue;

            // accept:
            case 3:
                retval = true;
                // Return the `$accept` rule's `$$` result, if available.
                //
                // Also note that JISON always adds this top-most `$accept` rule (with implicit,
                // default, action):
                //
                //     $accept: <startSymbol> $end
                //                  %{ $$ = $1; @$ = @1; %}
                //
                // which, combined with the parse kernel's `$accept` state behaviour coded below,
                // will produce the `$$` value output of the <startSymbol> rule as the parse result,
                // IFF that result is *not* `undefined`. (See also the parser kernel code.)
                //
                // In code:
                //
                //                  %{
                //                      @$ = @1;            // if location tracking support is included
                //                      if (typeof $1 !== 'undefined')
                //                          return $1;
                //                      else
                //                          return true;           // the default parse result if the rule actions don't produce anything
                //                  %}
                sp--;
                if (typeof vstack[sp] !== 'undefined') {
                    retval = vstack[sp];
                }

                break;
            }

            // break out of loop: we accept or fail with error
            break;
        }
    } catch (ex) {
        // report exceptions through the parseError callback too, but keep the exception intact
        // if it is a known parser or lexer error which has been thrown by parseError() already:
        if (ex instanceof this.JisonParserError) {
            throw ex;
        }
        else if (lexer && typeof lexer.JisonLexerError === 'function' && ex instanceof lexer.JisonLexerError) {
            throw ex;
        }
        else {
            p = this.constructParseErrorInfo('Parsing aborted due to exception.', ex, null, false);
            retval = this.parseError(p.errStr, p, this.JisonParserError);
        }
    } finally {
        retval = this.cleanupAfterParse(retval, true, true);
        this.__reentrant_call_depth--;
    }   // /finally

    return retval;
}
};
parser.originalParseError = parser.parseError;
parser.originalQuoteName = parser.quoteName;


/* lexer generated by jison-lex 0.6.1-203 */

/*
 * Returns a Lexer object of the following structure:
 *
 *  Lexer: {
 *    yy: {}     The so-called "shared state" or rather the *source* of it;
 *               the real "shared state" `yy` passed around to
 *               the rule actions, etc. is a direct reference!
 *
 *               This "shared context" object was passed to the lexer by way of 
 *               the `lexer.setInput(str, yy)` API before you may use it.
 *
 *               This "shared context" object is passed to the lexer action code in `performAction()`
 *               so userland code in the lexer actions may communicate with the outside world 
 *               and/or other lexer rules' actions in more or less complex ways.
 *
 *  }
 *
 *  Lexer.prototype: {
 *    EOF: 1,
 *    ERROR: 2,
 *
 *    yy:        The overall "shared context" object reference.
 *
 *    JisonLexerError: function(msg, hash),
 *
 *    performAction: function lexer__performAction(yy, yyrulenumber, YY_START),
 *
 *               The function parameters and `this` have the following value/meaning:
 *               - `this`    : reference to the `lexer` instance. 
 *                               `yy_` is an alias for `this` lexer instance reference used internally.
 *
 *               - `yy`      : a reference to the `yy` "shared state" object which was passed to the lexer
 *                             by way of the `lexer.setInput(str, yy)` API before.
 *
 *                             Note:
 *                             The extra arguments you specified in the `%parse-param` statement in your
 *                             **parser** grammar definition file are passed to the lexer via this object
 *                             reference as member variables.
 *
 *               - `yyrulenumber`   : index of the matched lexer rule (regex), used internally.
 *
 *               - `YY_START`: the current lexer "start condition" state.
 *
 *    parseError: function(str, hash, ExceptionClass),
 *
 *    constructLexErrorInfo: function(error_message, is_recoverable),
 *               Helper function.
 *               Produces a new errorInfo 'hash object' which can be passed into `parseError()`.
 *               See it's use in this lexer kernel in many places; example usage:
 *
 *                   var infoObj = lexer.constructParseErrorInfo('fail!', true);
 *                   var retVal = lexer.parseError(infoObj.errStr, infoObj, lexer.JisonLexerError);
 *
 *    options: { ... lexer %options ... },
 *
 *    lex: function(),
 *               Produce one token of lexed input, which was passed in earlier via the `lexer.setInput()` API.
 *               You MAY use the additional `args...` parameters as per `%parse-param` spec of the **lexer** grammar:
 *               these extra `args...` are added verbatim to the `yy` object reference as member variables.
 *
 *               WARNING:
 *               Lexer's additional `args...` parameters (via lexer's `%parse-param`) MAY conflict with
 *               any attributes already added to `yy` by the **parser** or the jison run-time; 
 *               when such a collision is detected an exception is thrown to prevent the generated run-time 
 *               from silently accepting this confusing and potentially hazardous situation! 
 *
 *    cleanupAfterLex: function(do_not_nuke_errorinfos),
 *               Helper function.
 *
 *               This helper API is invoked when the **parse process** has completed: it is the responsibility
 *               of the **parser** (or the calling userland code) to invoke this method once cleanup is desired. 
 *
 *               This helper may be invoked by user code to ensure the internal lexer gets properly garbage collected.
 *
 *    setInput: function(input, [yy]),
 *
 *
 *    input: function(),
 *
 *
 *    unput: function(str),
 *
 *
 *    more: function(),
 *
 *
 *    reject: function(),
 *
 *
 *    less: function(n),
 *
 *
 *    pastInput: function(n),
 *
 *
 *    upcomingInput: function(n),
 *
 *
 *    showPosition: function(),
 *
 *
 *    test_match: function(regex_match_array, rule_index),
 *
 *
 *    next: function(),
 *
 *
 *    begin: function(condition),
 *
 *
 *    pushState: function(condition),
 *
 *
 *    popState: function(),
 *
 *
 *    topState: function(),
 *
 *
 *    _currentRules: function(),
 *
 *
 *    stateStackSize: function(),
 *
 *
 *    performAction: function(yy, yy_, yyrulenumber, YY_START),
 *
 *
 *    rules: [...],
 *
 *
 *    conditions: {associative list: name ==> set},
 *  }
 *
 *
 *  token location info (`yylloc`): {
 *    first_line: n,
 *    last_line: n,
 *    first_column: n,
 *    last_column: n,
 *    range: [start_number, end_number]
 *               (where the numbers are indexes into the input string, zero-based)
 *  }
 *
 * ---
 *
 * The `parseError` function receives a 'hash' object with these members for lexer errors:
 *
 *  {
 *    text:        (matched text)
 *    token:       (the produced terminal token, if any)
 *    token_id:    (the produced terminal token numeric ID, if any)
 *    line:        (yylineno)
 *    loc:         (yylloc)
 *    recoverable: (boolean: TRUE when the parser MAY have an error recovery rule
 *                  available for this particular error)
 *    yy:          (object: the current parser internal "shared state" `yy`
 *                  as is also available in the rule actions; this can be used,
 *                  for instance, for advanced error analysis and reporting)
 *    lexer:       (reference to the current lexer instance used by the parser)
 *  }
 *
 * while `this` will reference the current lexer instance.
 *
 * When `parseError` is invoked by the lexer, the default implementation will
 * attempt to invoke `yy.parser.parseError()`; when this callback is not provided
 * it will try to invoke `yy.parseError()` instead. When that callback is also not
 * provided, a `JisonLexerError` exception will be thrown containing the error
 * message and `hash`, as constructed by the `constructLexErrorInfo()` API.
 *
 * Note that the lexer's `JisonLexerError` error class is passed via the
 * `ExceptionClass` argument, which is invoked to construct the exception
 * instance to be thrown, so technically `parseError` will throw the object
 * produced by the `new ExceptionClass(str, hash)` JavaScript expression.
 *
 * ---
 *
 * You can specify lexer options by setting / modifying the `.options` object of your Lexer instance.
 * These options are available:
 *
 * (Options are permanent.)
 *  
 *  yy: {
 *      parseError: function(str, hash, ExceptionClass)
 *                 optional: overrides the default `parseError` function.
 *  }
 *
 *  lexer.options: {
 *      pre_lex:  function()
 *                 optional: is invoked before the lexer is invoked to produce another token.
 *                 `this` refers to the Lexer object.
 *      post_lex: function(token) { return token; }
 *                 optional: is invoked when the lexer has produced a token `token`;
 *                 this function can override the returned token value by returning another.
 *                 When it does not return any (truthy) value, the lexer will return
 *                 the original `token`.
 *                 `this` refers to the Lexer object.
 *
 * WARNING: the next set of options are not meant to be changed. They echo the abilities of
 * the lexer as per when it was compiled!
 *
 *      ranges: boolean
 *                 optional: `true` ==> token location info will include a .range[] member.
 *      flex: boolean
 *                 optional: `true` ==> flex-like lexing behaviour where the rules are tested
 *                 exhaustively to find the longest match.
 *      backtrack_lexer: boolean
 *                 optional: `true` ==> lexer regexes are tested in order and for invoked;
 *                 the lexer terminates the scan when a token is returned by the action code.
 *      xregexp: boolean
 *                 optional: `true` ==> lexer rule regexes are "extended regex format" requiring the
 *                 `XRegExp` library. When this %option has not been specified at compile time, all lexer
 *                 rule regexes have been written as standard JavaScript RegExp expressions.
 *  }
 */


var lexer = function() {
  /**
   * See also:
   * http://stackoverflow.com/questions/1382107/whats-a-good-way-to-extend-error-in-javascript/#35881508
   * but we keep the prototype.constructor and prototype.name assignment lines too for compatibility
   * with userland code which might access the derived class in a 'classic' way.
   *
   * @public
   * @constructor
   * @nocollapse
   */
  function JisonLexerError(msg, hash) {
    Object.defineProperty(this, 'name', {
      enumerable: false,
      writable: false,
      value: 'JisonLexerError'
    });

    if (msg == null)
      msg = '???';

    Object.defineProperty(this, 'message', {
      enumerable: false,
      writable: true,
      value: msg
    });

    this.hash = hash;
    var stacktrace;

    if (hash && hash.exception instanceof Error) {
      var ex2 = hash.exception;
      this.message = ex2.message || msg;
      stacktrace = ex2.stack;
    }

    if (!stacktrace) {
      if (Error.hasOwnProperty('captureStackTrace')) {
        // V8
        Error.captureStackTrace(this, this.constructor);
      } else {
        stacktrace = new Error(msg).stack;
      }
    }

    if (stacktrace) {
      Object.defineProperty(this, 'stack', {
        enumerable: false,
        writable: false,
        value: stacktrace
      });
    }
  }

  if (typeof Object.setPrototypeOf === 'function') {
    Object.setPrototypeOf(JisonLexerError.prototype, Error.prototype);
  } else {
    JisonLexerError.prototype = Object.create(Error.prototype);
  }

  JisonLexerError.prototype.constructor = JisonLexerError;
  JisonLexerError.prototype.name = 'JisonLexerError';

  var lexer = {
    
// Code Generator Information Report
// ---------------------------------
//
// Options:
//
//   backtracking: .................... false
//   location.ranges: ................. false
//   location line+column tracking: ... true
//
//
// Forwarded Parser Analysis flags:
//
//   uses yyleng: ..................... false
//   uses yylineno: ................... false
//   uses yytext: ..................... false
//   uses yylloc: ..................... false
//   uses lexer values: ............... true / true
//   location tracking: ............... true
//   location assignment: ............. true
//
//
// Lexer Analysis flags:
//
//   uses yyleng: ..................... ???
//   uses yylineno: ................... ???
//   uses yytext: ..................... ???
//   uses yylloc: ..................... ???
//   uses ParseError API: ............. ???
//   uses yyerror: .................... ???
//   uses location tracking & editing:  ???
//   uses more() API: ................. ???
//   uses unput() API: ................ ???
//   uses reject() API: ............... ???
//   uses less() API: ................. ???
//   uses display APIs pastInput(), upcomingInput(), showPosition():
//        ............................. ???
//   uses describeYYLLOC() API: ....... ???
//
// --------- END OF REPORT -----------

EOF: 1,
    ERROR: 2,

    // JisonLexerError: JisonLexerError,        /// <-- injected by the code generator

    // options: {},                             /// <-- injected by the code generator

    // yy: ...,                                 /// <-- injected by setInput()

    __currentRuleSet__: null,                   /// INTERNAL USE ONLY: internal rule set cache for the current lexer state  

    __error_infos: [],                          /// INTERNAL USE ONLY: the set of lexErrorInfo objects created since the last cleanup  
    __decompressed: false,                      /// INTERNAL USE ONLY: mark whether the lexer instance has been 'unfolded' completely and is now ready for use  
    done: false,                                /// INTERNAL USE ONLY  
    _backtrack: false,                          /// INTERNAL USE ONLY  
    _input: '',                                 /// INTERNAL USE ONLY  
    _more: false,                               /// INTERNAL USE ONLY  
    _signaled_error_token: false,               /// INTERNAL USE ONLY  
    conditionStack: [],                         /// INTERNAL USE ONLY; managed via `pushState()`, `popState()`, `topState()` and `stateStackSize()`  
    match: '',                                  /// READ-ONLY EXTERNAL ACCESS - ADVANCED USE ONLY: tracks input which has been matched so far for the lexer token under construction. `match` is identical to `yytext` except that this one still contains the matched input string after `lexer.performAction()` has been invoked, where userland code MAY have changed/replaced the `yytext` value entirely!  
    matched: '',                                /// READ-ONLY EXTERNAL ACCESS - ADVANCED USE ONLY: tracks entire input which has been matched so far  
    matches: false,                             /// READ-ONLY EXTERNAL ACCESS - ADVANCED USE ONLY: tracks RE match result for last (successful) match attempt  
    yytext: '',                                 /// ADVANCED USE ONLY: tracks input which has been matched so far for the lexer token under construction; this value is transferred to the parser as the 'token value' when the parser consumes the lexer token produced through a call to the `lex()` API.  
    offset: 0,                                  /// READ-ONLY EXTERNAL ACCESS - ADVANCED USE ONLY: tracks the 'cursor position' in the input string, i.e. the number of characters matched so far  
    yyleng: 0,                                  /// READ-ONLY EXTERNAL ACCESS - ADVANCED USE ONLY: length of matched input for the token under construction (`yytext`)  
    yylineno: 0,                                /// READ-ONLY EXTERNAL ACCESS - ADVANCED USE ONLY: 'line number' at which the token under construction is located  
    yylloc: null,                               /// READ-ONLY EXTERNAL ACCESS - ADVANCED USE ONLY: tracks location info (lines + columns) for the token under construction  

    /**
     * INTERNAL USE: construct a suitable error info hash object instance for `parseError`.
     * 
     * @public
     * @this {RegExpLexer}
     */
    constructLexErrorInfo: function lexer_constructLexErrorInfo(msg, recoverable) {
      /** @constructor */
      var pei = {
        errStr: msg,
        recoverable: !!recoverable,
        text: this.match,           // This one MAY be empty; userland code should use the `upcomingInput` API to obtain more text which follows the 'lexer cursor position'...  
        token: null,
        line: this.yylineno,
        loc: this.yylloc,
        yy: this.yy,
        lexer: this,

        /**
         * and make sure the error info doesn't stay due to potential
         * ref cycle via userland code manipulations.
         * These would otherwise all be memory leak opportunities!
         * 
         * Note that only array and object references are nuked as those
         * constitute the set of elements which can produce a cyclic ref.
         * The rest of the members is kept intact as they are harmless.
         * 
         * @public
         * @this {LexErrorInfo}
         */
        destroy: function destructLexErrorInfo() {
          // remove cyclic references added to error info:
          // info.yy = null;
          // info.lexer = null;
          // ...
          var rec = !!this.recoverable;

          for (var key in this) {
            if (this.hasOwnProperty(key) && typeof key === 'object') {
              this[key] = undefined;
            }
          }

          this.recoverable = rec;
        }
      };

      // track this instance so we can `destroy()` it once we deem it superfluous and ready for garbage collection!
      this.__error_infos.push(pei);

      return pei;
    },

    /**
     * handler which is invoked when a lexer error occurs.
     * 
     * @public
     * @this {RegExpLexer}
     */
    parseError: function lexer_parseError(str, hash, ExceptionClass) {
      if (!ExceptionClass) {
        ExceptionClass = this.JisonLexerError;
      }

      if (this.yy) {
        if (this.yy.parser && typeof this.yy.parser.parseError === 'function') {
          return this.yy.parser.parseError.call(this, str, hash, ExceptionClass) || this.ERROR;
        } else if (typeof this.yy.parseError === 'function') {
          return this.yy.parseError.call(this, str, hash, ExceptionClass) || this.ERROR;
        }
      }

      throw new ExceptionClass(str, hash);
    },

    /**
     * method which implements `yyerror(str, ...args)` functionality for use inside lexer actions.
     * 
     * @public
     * @this {RegExpLexer}
     */
    yyerror: function yyError(str /*, ...args */) {
      var lineno_msg = '';

      if (this.options.trackPosition) {
        lineno_msg = ' on line ' + (this.yylineno + 1);
      }

      var p = this.constructLexErrorInfo(
        'Lexical error' + lineno_msg + ': ' + str,
        this.options.lexerErrorsAreRecoverable
      );

      // Add any extra args to the hash under the name `extra_error_attributes`:
      var args = Array.prototype.slice.call(arguments, 1);

      if (args.length) {
        p.extra_error_attributes = args;
      }

      return this.parseError(p.errStr, p, this.JisonLexerError) || this.ERROR;
    },

    /**
     * final cleanup function for when we have completed lexing the input;
     * make it an API so that external code can use this one once userland
     * code has decided it's time to destroy any lingering lexer error
     * hash object instances and the like: this function helps to clean
     * up these constructs, which *may* carry cyclic references which would
     * otherwise prevent the instances from being properly and timely
     * garbage-collected, i.e. this function helps prevent memory leaks!
     * 
     * @public
     * @this {RegExpLexer}
     */
    cleanupAfterLex: function lexer_cleanupAfterLex(do_not_nuke_errorinfos) {
      // prevent lingering circular references from causing memory leaks:
      this.setInput('', {});

      // nuke the error hash info instances created during this run.
      // Userland code must COPY any data/references
      // in the error hash instance(s) it is more permanently interested in.
      if (!do_not_nuke_errorinfos) {
        for (var i = this.__error_infos.length - 1; i >= 0; i--) {
          var el = this.__error_infos[i];

          if (el && typeof el.destroy === 'function') {
            el.destroy();
          }
        }

        this.__error_infos.length = 0;
      }

      return this;
    },

    /**
     * clear the lexer token context; intended for internal use only
     * 
     * @public
     * @this {RegExpLexer}
     */
    clear: function lexer_clear() {
      this.yytext = '';
      this.yyleng = 0;
      this.match = '';

      // - DO NOT reset `this.matched`
      this.matches = false;

      this._more = false;
      this._backtrack = false;
      var col = (this.yylloc ? this.yylloc.last_column : 0);

      this.yylloc = {
        first_line: this.yylineno + 1,
        first_column: col,
        last_line: this.yylineno + 1,
        last_column: col,
        range: [this.offset, this.offset]
      };
    },

    /**
     * resets the lexer, sets new input
     * 
     * @public
     * @this {RegExpLexer}
     */
    setInput: function lexer_setInput(input, yy) {
      this.yy = yy || this.yy || {};

      // also check if we've fully initialized the lexer instance,
      // including expansion work to be done to go from a loaded
      // lexer to a usable lexer:
      if (!this.__decompressed) {
        // step 1: decompress the regex list:
        var rules = this.rules;

        for (var i = 0, len = rules.length; i < len; i++) {
          var rule_re = rules[i];

          // compression: is the RE an xref to another RE slot in the rules[] table?
          if (typeof rule_re === 'number') {
            rules[i] = rules[rule_re];
          }
        }

        // step 2: unfold the conditions[] set to make these ready for use:
        var conditions = this.conditions;

        for (var k in conditions) {
          var spec = conditions[k];
          var rule_ids = spec.rules;
          var len = rule_ids.length;
          var rule_regexes = new Array(len + 1);             // slot 0 is unused; we use a 1-based index approach here to keep the hottest code in `lexer_next()` fast and simple! 
          var rule_new_ids = new Array(len + 1);

          for (var i = 0; i < len; i++) {
            var idx = rule_ids[i];
            var rule_re = rules[idx];
            rule_regexes[i + 1] = rule_re;
            rule_new_ids[i + 1] = idx;
          }

          spec.rules = rule_new_ids;
          spec.__rule_regexes = rule_regexes;
          spec.__rule_count = len;
        }

        this.__decompressed = true;
      }

      this._input = input || '';
      this.clear();
      this._signaled_error_token = false;
      this.done = false;
      this.yylineno = 0;
      this.matched = '';
      this.conditionStack = ['INITIAL'];
      this.__currentRuleSet__ = null;

      this.yylloc = {
        first_line: 1,
        first_column: 0,
        last_line: 1,
        last_column: 0,
        range: [0, 0]
      };

      this.offset = 0;
      return this;
    },

    /**
     * edit the remaining input via user-specified callback.
     * This can be used to forward-adjust the input-to-parse, 
     * e.g. inserting macro expansions and alike in the
     * input which has yet to be lexed.
     * The behaviour of this API contrasts the `unput()` et al
     * APIs as those act on the *consumed* input, while this
     * one allows one to manipulate the future, without impacting
     * the current `yyloc` cursor location or any history. 
     * 
     * Use this API to help implement C-preprocessor-like
     * `#include` statements, etc.
     * 
     * The provided callback must be synchronous and is
     * expected to return the edited input (string).
     *
     * The `cpsArg` argument value is passed to the callback
     * as-is.
     *
     * `callback` interface: 
     * `function callback(input, cpsArg)`
     * 
     * - `input` will carry the remaining-input-to-lex string
     *   from the lexer.
     * - `cpsArg` is `cpsArg` passed into this API.
     * 
     * The `this` reference for the callback will be set to
     * reference this lexer instance so that userland code
     * in the callback can easily and quickly access any lexer
     * API. 
     *
     * When the callback returns a non-string-type falsey value,
     * we assume the callback did not edit the input and we
     * will using the input as-is.
     *
     * When the callback returns a non-string-type value, it
     * is converted to a string for lexing via the `"" + retval`
     * operation. (See also why: http://2ality.com/2012/03/converting-to-string.html 
     * -- that way any returned object's `toValue()` and `toString()`
     * methods will be invoked in a proper/desirable order.)
     * 
     * @public
     * @this {RegExpLexer}
     */
    editRemainingInput: function lexer_editRemainingInput(callback, cpsArg) {
      var rv = callback.call(this, this._input, cpsArg);

      if (typeof rv !== 'string') {
        if (rv) {
          this._input = '' + rv;
        } 
        // else: keep `this._input` as is.  
      } else {
        this._input = rv;
      }

      return this;
    },

    /**
     * consumes and returns one char from the input
     * 
     * @public
     * @this {RegExpLexer}
     */
    input: function lexer_input() {
      if (!this._input) {
        //this.done = true;    -- don't set `done` as we want the lex()/next() API to be able to produce one custom EOF token match after this anyhow. (lexer can match special <<EOF>> tokens and perform user action code for a <<EOF>> match, but only does so *once*)
        return null;
      }

      var ch = this._input[0];
      this.yytext += ch;
      this.yyleng++;
      this.offset++;
      this.match += ch;
      this.matched += ch;

      // Count the linenumber up when we hit the LF (or a stand-alone CR).
      // On CRLF, the linenumber is incremented when you fetch the CR or the CRLF combo
      // and we advance immediately past the LF as well, returning both together as if
      // it was all a single 'character' only.
      var slice_len = 1;

      var lines = false;

      if (ch === '\n') {
        lines = true;
      } else if (ch === '\r') {
        lines = true;
        var ch2 = this._input[1];

        if (ch2 === '\n') {
          slice_len++;
          ch += ch2;
          this.yytext += ch2;
          this.yyleng++;
          this.offset++;
          this.match += ch2;
          this.matched += ch2;
          this.yylloc.range[1]++;
        }
      }

      if (lines) {
        this.yylineno++;
        this.yylloc.last_line++;
        this.yylloc.last_column = 0;
      } else {
        this.yylloc.last_column++;
      }

      this.yylloc.range[1]++;
      this._input = this._input.slice(slice_len);
      return ch;
    },

    /**
     * unshifts one char (or an entire string) into the input
     * 
     * @public
     * @this {RegExpLexer}
     */
    unput: function lexer_unput(ch) {
      var len = ch.length;
      var lines = ch.split(/(?:\r\n?|\n)/g);
      this._input = ch + this._input;
      this.yytext = this.yytext.substr(0, this.yytext.length - len);
      this.yyleng = this.yytext.length;
      this.offset -= len;
      this.match = this.match.substr(0, this.match.length - len);
      this.matched = this.matched.substr(0, this.matched.length - len);

      if (lines.length > 1) {
        this.yylineno -= lines.length - 1;
        this.yylloc.last_line = this.yylineno + 1;
        var pre = this.match;
        var pre_lines = pre.split(/(?:\r\n?|\n)/g);

        if (pre_lines.length === 1) {
          pre = this.matched;
          pre_lines = pre.split(/(?:\r\n?|\n)/g);
        }

        this.yylloc.last_column = pre_lines[pre_lines.length - 1].length;
      } else {
        this.yylloc.last_column -= len;
      }

      this.yylloc.range[1] = this.yylloc.range[0] + this.yyleng;
      this.done = false;
      return this;
    },

    /**
     * cache matched text and append it on next action
     * 
     * @public
     * @this {RegExpLexer}
     */
    more: function lexer_more() {
      this._more = true;
      return this;
    },

    /**
     * signal the lexer that this rule fails to match the input, so the
     * next matching rule (regex) should be tested instead.
     * 
     * @public
     * @this {RegExpLexer}
     */
    reject: function lexer_reject() {
      if (this.options.backtrack_lexer) {
        this._backtrack = true;
      } else {
        // when the `parseError()` call returns, we MUST ensure that the error is registered.
        // We accomplish this by signaling an 'error' token to be produced for the current
        // `.lex()` run.
        var lineno_msg = '';

        if (this.options.trackPosition) {
          lineno_msg = ' on line ' + (this.yylineno + 1);
        }

        var pos_str = '';

        if (typeof this.showPosition === 'function') {
          pos_str = this.showPosition();

          if (pos_str && pos_str[0] !== '\n') {
            pos_str = '\n' + pos_str;
          }
        }

        var p = this.constructLexErrorInfo(
          'Lexical error' + lineno_msg + ': You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).' + pos_str,
          false
        );

        this._signaled_error_token = this.parseError(p.errStr, p, this.JisonLexerError) || this.ERROR;
      }

      return this;
    },

    /**
     * retain first n characters of the match
     * 
     * @public
     * @this {RegExpLexer}
     */
    less: function lexer_less(n) {
      return this.unput(this.match.slice(n));
    },

    /**
     * return (part of the) already matched input, i.e. for error
     * messages.
     * 
     * Limit the returned string length to `maxSize` (default: 20).
     * 
     * Limit the returned string to the `maxLines` number of lines of
     * input (default: 1).
     * 
     * Negative limit values equal *unlimited*.
     * 
     * @public
     * @this {RegExpLexer}
     */
    pastInput: function lexer_pastInput(maxSize, maxLines) {
      var past = this.matched.substring(0, this.matched.length - this.match.length);

      if (maxSize < 0)
        maxSize = past.length;
      else if (!maxSize)
        maxSize = 20;

      if (maxLines < 0)
        maxLines = past.length;          // can't ever have more input lines than this! 
      else if (!maxLines)
        maxLines = 1;

      // `substr` anticipation: treat \r\n as a single character and take a little
      // more than necessary so that we can still properly check against maxSize
      // after we've transformed and limited the newLines in here:
      past = past.substr(-maxSize * 2 - 2);

      // now that we have a significantly reduced string to process, transform the newlines
      // and chop them, then limit them:
      var a = past.replace(/\r\n|\r/g, '\n').split('\n');

      a = a.slice(-maxLines);
      past = a.join('\n');

      // When, after limiting to maxLines, we still have too much to return,
      // do add an ellipsis prefix...
      if (past.length > maxSize) {
        past = '...' + past.substr(-maxSize);
      }

      return past;
    },

    /**
     * return (part of the) upcoming input, i.e. for error messages.
     * 
     * Limit the returned string length to `maxSize` (default: 20).
     * 
     * Limit the returned string to the `maxLines` number of lines of input (default: 1).
     * 
     * Negative limit values equal *unlimited*.
     *
     * > ### NOTE ###
     * >
     * > *"upcoming input"* is defined as the whole of the both
     * > the *currently lexed* input, together with any remaining input
     * > following that. *"currently lexed"* input is the input 
     * > already recognized by the lexer but not yet returned with
     * > the lexer token. This happens when you are invoking this API
     * > from inside any lexer rule action code block. 
     * >
     * 
     * @public
     * @this {RegExpLexer}
     */
    upcomingInput: function lexer_upcomingInput(maxSize, maxLines) {
      var next = this.match;

      if (maxSize < 0)
        maxSize = next.length + this._input.length;
      else if (!maxSize)
        maxSize = 20;

      if (maxLines < 0)
        maxLines = maxSize;          // can't ever have more input lines than this! 
      else if (!maxLines)
        maxLines = 1;

      // `substring` anticipation: treat \r\n as a single character and take a little
      // more than necessary so that we can still properly check against maxSize
      // after we've transformed and limited the newLines in here:
      if (next.length < maxSize * 2 + 2) {
        next += this._input.substring(0, maxSize * 2 + 2);   // substring is faster on Chrome/V8 
      }

      // now that we have a significantly reduced string to process, transform the newlines
      // and chop them, then limit them:
      var a = next.replace(/\r\n|\r/g, '\n').split('\n');

      a = a.slice(0, maxLines);
      next = a.join('\n');

      // When, after limiting to maxLines, we still have too much to return,
      // do add an ellipsis postfix...
      if (next.length > maxSize) {
        next = next.substring(0, maxSize) + '...';
      }

      return next;
    },

    /**
     * return a string which displays the character position where the
     * lexing error occurred, i.e. for error messages
     * 
     * @public
     * @this {RegExpLexer}
     */
    showPosition: function lexer_showPosition(maxPrefix, maxPostfix) {
      var pre = this.pastInput(maxPrefix).replace(/\s/g, ' ');
      var c = new Array(pre.length + 1).join('-');
      return pre + this.upcomingInput(maxPostfix).replace(/\s/g, ' ') + '\n' + c + '^';
    },

    /**
     * return a string which displays the lines & columns of input which are referenced 
     * by the given location info range, plus a few lines of context.
     * 
     * This function pretty-prints the indicated section of the input, with line numbers 
     * and everything!
     * 
     * This function is very useful to provide highly readable error reports, while
     * the location range may be specified in various flexible ways:
     * 
     * - `loc` is the location info object which references the area which should be
     *   displayed and 'marked up': these lines & columns of text are marked up by `^`
     *   characters below each character in the entire input range.
     * 
     * - `context_loc` is the *optional* location info object which instructs this
     *   pretty-printer how much *leading* context should be displayed alongside
     *   the area referenced by `loc`. This can help provide context for the displayed
     *   error, etc.
     * 
     *   When this location info is not provided, a default context of 3 lines is
     *   used.
     * 
     * - `context_loc2` is another *optional* location info object, which serves
     *   a similar purpose to `context_loc`: it specifies the amount of *trailing*
     *   context lines to display in the pretty-print output.
     * 
     *   When this location info is not provided, a default context of 1 line only is
     *   used.
     * 
     * Special Notes:
     * 
     * - when the `loc`-indicated range is very large (about 5 lines or more), then
     *   only the first and last few lines of this block are printed while a
     *   `...continued...` message will be printed between them.
     * 
     *   This serves the purpose of not printing a huge amount of text when the `loc`
     *   range happens to be huge: this way a manageable & readable output results
     *   for arbitrary large ranges.
     * 
     * - this function can display lines of input which whave not yet been lexed.
     *   `prettyPrintRange()` can access the entire input!
     * 
     * @public
     * @this {RegExpLexer}
     */
    prettyPrintRange: function lexer_prettyPrintRange(loc, context_loc, context_loc2) {
      var error_size = loc.last_line - loc.first_line;
      const CONTEXT = 3;
      const CONTEXT_TAIL = 1;
      const MINIMUM_VISIBLE_NONEMPTY_LINE_COUNT = 2;
      var input = this.matched + this._input;
      var lines = input.split('\n');

      //var show_context = (error_size < 5 || context_loc);
      var l0 = Math.max(1, (context_loc ? context_loc.first_line : loc.first_line - CONTEXT));

      var l1 = Math.max(1, (context_loc2 ? context_loc2.last_line : loc.last_line + CONTEXT_TAIL));
      var lineno_display_width = 1 + Math.log10(l1 | 1) | 0;
      var ws_prefix = new Array(lineno_display_width).join(' ');
      var nonempty_line_indexes = [];

      var rv = lines.slice(l0 - 1, l1 + 1).map(function injectLineNumber(line, index) {
        var lno = index + l0;
        var lno_pfx = (ws_prefix + lno).substr(-lineno_display_width);
        var rv = lno_pfx + ': ' + line;
        var errpfx = new Array(lineno_display_width + 1).join('^');

        if (lno === loc.first_line) {
          var offset = loc.first_column + 2;

          var len = Math.max(
            2,
            ((lno === loc.last_line ? loc.last_column : line.length)) - loc.first_column + 1
          );

          var lead = new Array(offset).join('.');
          var mark = new Array(len).join('^');
          rv += '\n' + errpfx + lead + mark;

          if (line.trim().length > 0) {
            nonempty_line_indexes.push(index);
          }
        } else if (lno === loc.last_line) {
          var offset = 2 + 1;
          var len = Math.max(2, loc.last_column + 1);
          var lead = new Array(offset).join('.');
          var mark = new Array(len).join('^');
          rv += '\n' + errpfx + lead + mark;

          if (line.trim().length > 0) {
            nonempty_line_indexes.push(index);
          }
        } else if (lno > loc.first_line && lno < loc.last_line) {
          var offset = 2 + 1;
          var len = Math.max(2, line.length + 1);
          var lead = new Array(offset).join('.');
          var mark = new Array(len).join('^');
          rv += '\n' + errpfx + lead + mark;

          if (line.trim().length > 0) {
            nonempty_line_indexes.push(index);
          }
        }

        rv = rv.replace(/\t/g, ' ');
        return rv;
      });

      // now make sure we don't print an overly large amount of error area: limit it 
      // to the top and bottom line count:
      if (nonempty_line_indexes.length > 2 * MINIMUM_VISIBLE_NONEMPTY_LINE_COUNT) {
        var clip_start = nonempty_line_indexes[MINIMUM_VISIBLE_NONEMPTY_LINE_COUNT - 1] + 1;
        var clip_end = nonempty_line_indexes[nonempty_line_indexes.length - MINIMUM_VISIBLE_NONEMPTY_LINE_COUNT] - 1;

        console.log('clip off: ', {
          start: clip_start,
          end: clip_end,
          len: clip_end - clip_start + 1,
          arr: nonempty_line_indexes,
          rv
        });

        var intermediate_line = new Array(lineno_display_width + 1).join(' ') + '  (...continued...)';
        intermediate_line += '\n' + new Array(lineno_display_width + 1).join('-') + '  (---------------)';
        rv.splice(clip_start, clip_end - clip_start + 1, intermediate_line);
      }

      return rv.join('\n');
    },

    /**
     * helper function, used to produce a human readable description as a string, given
     * the input `yylloc` location object.
     * 
     * Set `display_range_too` to TRUE to include the string character index position(s)
     * in the description if the `yylloc.range` is available.
     * 
     * @public
     * @this {RegExpLexer}
     */
    describeYYLLOC: function lexer_describe_yylloc(yylloc, display_range_too) {
      var l1 = yylloc.first_line;
      var l2 = yylloc.last_line;
      var c1 = yylloc.first_column;
      var c2 = yylloc.last_column;
      var dl = l2 - l1;
      var dc = c2 - c1;
      var rv;

      if (dl === 0) {
        rv = 'line ' + l1 + ', ';

        if (dc <= 1) {
          rv += 'column ' + c1;
        } else {
          rv += 'columns ' + c1 + ' .. ' + c2;
        }
      } else {
        rv = 'lines ' + l1 + '(column ' + c1 + ') .. ' + l2 + '(column ' + c2 + ')';
      }

      if (yylloc.range && display_range_too) {
        var r1 = yylloc.range[0];
        var r2 = yylloc.range[1] - 1;

        if (r2 <= r1) {
          rv += ' {String Offset: ' + r1 + '}';
        } else {
          rv += ' {String Offset range: ' + r1 + ' .. ' + r2 + '}';
        }
      }

      return rv;
    },

    /**
     * test the lexed token: return FALSE when not a match, otherwise return token.
     * 
     * `match` is supposed to be an array coming out of a regex match, i.e. `match[0]`
     * contains the actually matched text string.
     * 
     * Also move the input cursor forward and update the match collectors:
     * 
     * - `yytext`
     * - `yyleng`
     * - `match`
     * - `matches`
     * - `yylloc`
     * - `offset`
     * 
     * @public
     * @this {RegExpLexer}
     */
    test_match: function lexer_test_match(match, indexed_rule) {
      var token, lines, backup, match_str, match_str_len;

      if (this.options.backtrack_lexer) {
        // save context
        backup = {
          yylineno: this.yylineno,

          yylloc: {
            first_line: this.yylloc.first_line,
            last_line: this.yylloc.last_line,
            first_column: this.yylloc.first_column,
            last_column: this.yylloc.last_column,
            range: this.yylloc.range.slice(0)
          },

          yytext: this.yytext,
          match: this.match,
          matches: this.matches,
          matched: this.matched,
          yyleng: this.yyleng,
          offset: this.offset,
          _more: this._more,
          _input: this._input,

          //_signaled_error_token: this._signaled_error_token,
          yy: this.yy,

          conditionStack: this.conditionStack.slice(0),
          done: this.done
        };
      }

      match_str = match[0];
      match_str_len = match_str.length;

      // if (match_str.indexOf('\n') !== -1 || match_str.indexOf('\r') !== -1) {
      lines = match_str.split(/(?:\r\n?|\n)/g);

      if (lines.length > 1) {
        this.yylineno += lines.length - 1;
        this.yylloc.last_line = this.yylineno + 1;
        this.yylloc.last_column = lines[lines.length - 1].length;
      } else {
        this.yylloc.last_column += match_str_len;
      }

      // }
      this.yytext += match_str;

      this.match += match_str;
      this.matched += match_str;
      this.matches = match;
      this.yyleng = this.yytext.length;
      this.yylloc.range[1] += match_str_len;

      // previous lex rules MAY have invoked the `more()` API rather than producing a token:
      // those rules will already have moved this `offset` forward matching their match lengths,
      // hence we must only add our own match length now:
      this.offset += match_str_len;

      this._more = false;
      this._backtrack = false;
      this._input = this._input.slice(match_str_len);

      // calling this method:
      //
      //   function lexer__performAction(yy, yyrulenumber, YY_START) {...}
      token = this.performAction.call(
        this,
        this.yy,
        indexed_rule,
        this.conditionStack[this.conditionStack.length - 1] /* = YY_START */
      );

      // otherwise, when the action codes are all simple return token statements:
      //token = this.simpleCaseActionClusters[indexed_rule];

      if (this.done && this._input) {
        this.done = false;
      }

      if (token) {
        return token;
      } else if (this._backtrack) {
        // recover context
        for (var k in backup) {
          this[k] = backup[k];
        }

        this.__currentRuleSet__ = null;
        return false;  // rule action called reject() implying the next rule should be tested instead. 
      } else if (this._signaled_error_token) {
        // produce one 'error' token as `.parseError()` in `reject()`
        // did not guarantee a failure signal by throwing an exception!
        token = this._signaled_error_token;

        this._signaled_error_token = false;
        return token;
      }

      return false;
    },

    /**
     * return next match in input
     * 
     * @public
     * @this {RegExpLexer}
     */
    next: function lexer_next() {
      if (this.done) {
        this.clear();
        return this.EOF;
      }

      if (!this._input) {
        this.done = true;
      }

      var token, match, tempMatch, index;

      if (!this._more) {
        this.clear();
      }

      var spec = this.__currentRuleSet__;

      if (!spec) {
        // Update the ruleset cache as we apparently encountered a state change or just started lexing.
        // The cache is set up for fast lookup -- we assume a lexer will switch states much less often than it will
        // invoke the `lex()` token-producing API and related APIs, hence caching the set for direct access helps
        // speed up those activities a tiny bit.
        spec = this.__currentRuleSet__ = this._currentRules();

        // Check whether a *sane* condition has been pushed before: this makes the lexer robust against
        // user-programmer bugs such as https://github.com/zaach/jison-lex/issues/19
        if (!spec || !spec.rules) {
          var lineno_msg = '';

          if (this.options.trackPosition) {
            lineno_msg = ' on line ' + (this.yylineno + 1);
          }

          var pos_str = '';

          if (typeof this.showPosition === 'function') {
            pos_str = this.showPosition();

            if (pos_str && pos_str[0] !== '\n') {
              pos_str = '\n' + pos_str;
            }
          }

          var p = this.constructLexErrorInfo(
            'Internal lexer engine error' + lineno_msg + ': The lex grammar programmer pushed a non-existing condition name "' + this.topState() + '"; this is a fatal error and should be reported to the application programmer team!' + pos_str,
            false
          );

          // produce one 'error' token until this situation has been resolved, most probably by parse termination!
          return this.parseError(p.errStr, p, this.JisonLexerError) || this.ERROR;
        }
      }

      var rule_ids = spec.rules;
      var regexes = spec.__rule_regexes;
      var len = spec.__rule_count;

      // Note: the arrays are 1-based, while `len` itself is a valid index,
      // hence the non-standard less-or-equal check in the next loop condition!
      for (var i = 1; i <= len; i++) {
        tempMatch = this._input.match(regexes[i]);

        if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
          match = tempMatch;
          index = i;

          if (this.options.backtrack_lexer) {
            token = this.test_match(tempMatch, rule_ids[i]);

            if (token !== false) {
              return token;
            } else if (this._backtrack) {
              match = undefined;
              continue;  // rule action called reject() implying a rule MISmatch. 
            } else {
              // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
              return false;
            }
          } else if (!this.options.flex) {
            break;
          }
        }
      }

      if (match) {
        token = this.test_match(match, rule_ids[index]);

        if (token !== false) {
          return token;
        }

        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
        return false;
      }

      if (!this._input) {
        this.done = true;
        this.clear();
        return this.EOF;
      } else {
        var lineno_msg = '';

        if (this.options.trackPosition) {
          lineno_msg = ' on line ' + (this.yylineno + 1);
        }

        var pos_str = '';

        if (typeof this.showPosition === 'function') {
          pos_str = this.showPosition();

          if (pos_str && pos_str[0] !== '\n') {
            pos_str = '\n' + pos_str;
          }
        }

        var p = this.constructLexErrorInfo(
          'Lexical error' + lineno_msg + ': Unrecognized text.' + pos_str,
          this.options.lexerErrorsAreRecoverable
        );

        token = this.parseError(p.errStr, p, this.JisonLexerError) || this.ERROR;

        if (token === this.ERROR) {
          // we can try to recover from a lexer error that `parseError()` did not 'recover' for us
          // by moving forward at least one character at a time:
          if (!this.match.length) {
            this.input();
          }
        }

        return token;
      }
    },

    /**
     * return next match that has a token
     * 
     * @public
     * @this {RegExpLexer}
     */
    lex: function lexer_lex() {
      var r;

      // allow the PRE/POST handlers set/modify the return token for maximum flexibility of the generated lexer:
      if (typeof this.options.pre_lex === 'function') {
        r = this.options.pre_lex.call(this);
      }

      while (!r) {
        r = this.next();
      }

      if (typeof this.options.post_lex === 'function') {
        // (also account for a userdef function which does not return any value: keep the token as is)
        r = this.options.post_lex.call(this, r) || r;
      }

      return r;
    },

    /**
     * backwards compatible alias for `pushState()`;
     * the latter is symmetrical with `popState()` and we advise to use
     * those APIs in any modern lexer code, rather than `begin()`.
     * 
     * @public
     * @this {RegExpLexer}
     */
    begin: function lexer_begin(condition) {
      return this.pushState(condition);
    },

    /**
     * activates a new lexer condition state (pushes the new lexer
     * condition state onto the condition stack)
     * 
     * @public
     * @this {RegExpLexer}
     */
    pushState: function lexer_pushState(condition) {
      this.conditionStack.push(condition);
      this.__currentRuleSet__ = null;
      return this;
    },

    /**
     * pop the previously active lexer condition state off the condition
     * stack
     * 
     * @public
     * @this {RegExpLexer}
     */
    popState: function lexer_popState() {
      var n = this.conditionStack.length - 1;

      if (n > 0) {
        this.__currentRuleSet__ = null;
        return this.conditionStack.pop();
      } else {
        return this.conditionStack[0];
      }
    },

    /**
     * return the currently active lexer condition state; when an index
     * argument is provided it produces the N-th previous condition state,
     * if available
     * 
     * @public
     * @this {RegExpLexer}
     */
    topState: function lexer_topState(n) {
      n = this.conditionStack.length - 1 - Math.abs(n || 0);

      if (n >= 0) {
        return this.conditionStack[n];
      } else {
        return 'INITIAL';
      }
    },

    /**
     * (internal) determine the lexer rule set which is active for the
     * currently active lexer condition state
     * 
     * @public
     * @this {RegExpLexer}
     */
    _currentRules: function lexer__currentRules() {
      if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
        return this.conditions[this.conditionStack[this.conditionStack.length - 1]];
      } else {
        return this.conditions['INITIAL'];
      }
    },

    /**
     * return the number of states currently on the stack
     * 
     * @public
     * @this {RegExpLexer}
     */
    stateStackSize: function lexer_stateStackSize() {
      return this.conditionStack.length;
    },

    options: {
      flex: true,
      trackPosition: true,
      parseActionsUseYYMERGELOCATIONINFO: true
    },

    JisonLexerError: JisonLexerError,

    performAction: function lexer__performAction(yy, yyrulenumber, YY_START) {
      var yy_ = this;
      var YYSTATE = YY_START;

      switch (yyrulenumber) {
      case 0:
        /*! Conditions:: * */
        /*! Rule::       \s+ */
        return;

        break;

      case 5:
        /*! Conditions:: INITIAL */
        /*! Rule::       \{% */
        this.begin('CONTROL');

        return 28;
        break;

      case 6:
        /*! Conditions:: INITIAL */
        /*! Rule::       <!-- */
        this.begin('COMMENT');

        return;
        break;

      case 7:
        /*! Conditions:: INITIAL */
        /*! Rule::       < */
        this.begin('TAG');

        return 13;
        break;

      case 8:
        /*! Conditions:: INITIAL */
        /*! Rule::       \{\{ */
        this.begin('EXPRESSION');

        return 38;
        break;

      case 15:
        /*! Conditions:: TAG */
        /*! Rule::       \/> */
        this.popState();

        return 37;
        break;

      case 17:
        /*! Conditions:: TAG */
        /*! Rule::       > */
        this.begin('CHILDREN');

        return 14;
        break;

      case 18:
        /*! Conditions:: TAG */
        /*! Rule::       \{\{ */
        this.begin('EXPRESSION');

        return 38;
        break;

      case 19:
        /*! Conditions:: CHILDREN */
        /*! Rule::       \{\{ */
        this.begin('EXPRESSION');

        return 38;
        break;

      case 20:
        /*! Conditions:: CHILDREN */
        /*! Rule::       \{% */
        this.begin('CONTROL');

        return 28;
        break;

      case 21:
        /*! Conditions:: CHILDREN */
        /*! Rule::       <!-- */
        this.begin('COMMENT');

        return;
        break;

      case 22:
        /*! Conditions:: CHILDREN */
        /*! Rule::       <\/ */
        this.begin('TAG');

        return 36;
        break;

      case 23:
        /*! Conditions:: CHILDREN */
        /*! Rule::       < */
        this.begin('TAG');

        return 13;
        break;

      case 54:
        /*! Conditions:: CONTROL */
        /*! Rule::       = */
        this.begin('CONTROL_CHILD');

        return 9;
        break;

      case 57:
        /*! Conditions:: CONTROL */
        /*! Rule::       %\} */
        this.popState();

        return 30;
        break;

      case 58:
        /*! Conditions:: CONTROL_CHILD */
        /*! Rule::       < */
        this.begin('TAG');

        return 13;
        break;

      case 59:
        /*! Conditions:: CONTROL_CHILD */
        /*! Rule::       \{\{ */
        this.begin('EXPRESSION');

        return 38;
        break;

      case 60:
        /*! Conditions:: CONTROL_CHILD */
        /*! Rule::       %\} */
        this.popState();

        return 30;
        break;

      case 76:
        /*! Conditions:: EXPRESSION */
        /*! Rule::       \}\} */
        this.popState();

        return 39;
        break;

      case 77:
        /*! Conditions:: COMMENT */
        /*! Rule::       (.|\r|\n)*?--> */
        this.popState();

        return;
        break;

      case 108:
        /*! Conditions:: INITIAL */
        /*! Rule::       . */
        console.log('', yy_.yytext);

        /* `flex` lexing mode: the last resort rule! */
        break;

      default:
        return this.simpleCaseActionClusters[yyrulenumber];
      }
    },

    simpleCaseActionClusters: {
      /*! Conditions:: INITIAL */
      /*! Rule::       import */
      1: 25,

      /*! Conditions:: INITIAL */
      /*! Rule::       from */
      2: 26,

      /*! Conditions:: INITIAL */
      /*! Rule::       using */
      3: 'USING',

      /*! Conditions:: INITIAL */
      /*! Rule::       as */
      4: 27,

      /*! Conditions:: INITIAL */
      /*! Rule::       {Constructor} */
      9: 56,

      /*! Conditions:: INITIAL */
      /*! Rule::       {Identifier} */
      10: 55,

      /*! Conditions:: TAG */
      /*! Rule::       true */
      11: 53,

      /*! Conditions:: TAG */
      /*! Rule::       false */
      12: 54,

      /*! Conditions:: TAG */
      /*! Rule::       {Constructor} */
      13: 56,

      /*! Conditions:: TAG */
      /*! Rule::       {Identifier} */
      14: 55,

      /*! Conditions:: TAG */
      /*! Rule::       \/ */
      16: 'NOSE',

      /*! Conditions:: CHILDREN */
      /*! Rule::       [^/<>{%}]+ */
      24: 47,

      /*! Conditions:: CONTROL */
      /*! Rule::       main */
      25: 29,

      /*! Conditions:: CONTROL */
      /*! Rule::       endmain */
      26: 'ENDMAIN',

      /*! Conditions:: CONTROL */
      /*! Rule::       macro */
      27: 'MACRO',

      /*! Conditions:: CONTROL */
      /*! Rule::       endmacro */
      28: 'ENDMACRO',

      /*! Conditions:: CONTROL */
      /*! Rule::       for */
      29: 40,

      /*! Conditions:: CONTROL */
      /*! Rule::       endfor */
      30: 42,

      /*! Conditions:: CONTROL */
      /*! Rule::       if */
      31: 44,

      /*! Conditions:: CONTROL */
      /*! Rule::       endif */
      32: 46,

      /*! Conditions:: CONTROL */
      /*! Rule::       else */
      33: 45,

      /*! Conditions:: CONTROL */
      /*! Rule::       elseif */
      34: 'ELSEIF',

      /*! Conditions:: CONTROL */
      /*! Rule::       in */
      35: 41,

      /*! Conditions:: CONTROL */
      /*! Rule::       case */
      36: 'CASE',

      /*! Conditions:: CONTROL */
      /*! Rule::       endcase */
      37: 'ENDCASE',

      /*! Conditions:: CONTROL */
      /*! Rule::       export */
      38: 31,

      /*! Conditions:: CONTROL */
      /*! Rule::       from */
      39: 26,

      /*! Conditions:: CONTROL */
      /*! Rule::       view */
      40: 32,

      /*! Conditions:: CONTROL */
      /*! Rule::       using */
      41: 'USING',

      /*! Conditions:: CONTROL */
      /*! Rule::       endview */
      42: 33,

      /*! Conditions:: CONTROL */
      /*! Rule::       match */
      43: 'MATCH',

      /*! Conditions:: CONTROL */
      /*! Rule::       endmatch */
      44: 'ENDMATCH',

      /*! Conditions:: CONTROL */
      /*! Rule::       instanceof */
      45: 63,

      /*! Conditions:: CONTROL */
      /*! Rule::       typeof */
      46: 'TYPEOF',

      /*! Conditions:: CONTROL */
      /*! Rule::       this */
      47: 'THIS',

      /*! Conditions:: CONTROL */
      /*! Rule::       fun */
      48: 34,

      /*! Conditions:: CONTROL */
      /*! Rule::       endfun */
      49: 35,

      /*! Conditions:: CONTROL */
      /*! Rule::       as */
      50: 27,

      /*! Conditions:: CONTROL */
      /*! Rule::       :: */
      51: '::',

      /*! Conditions:: CONTROL */
      /*! Rule::       @ */
      52: 19,

      /*! Conditions:: CONTROL */
      /*! Rule::       \(\) */
      53: '()',

      /*! Conditions:: CONTROL */
      /*! Rule::       {Constructor} */
      55: 56,

      /*! Conditions:: CONTROL */
      /*! Rule::       {Identifier} */
      56: 55,

      /*! Conditions:: CONTROL_CHILD */
      /*! Rule::       {Constructor} */
      61: 56,

      /*! Conditions:: CONTROL_CHILD */
      /*! Rule::       {Identifier} */
      62: 55,

      /*! Conditions:: EXPRESSION */
      /*! Rule::       \| */
      63: 15,

      /*! Conditions:: EXPRESSION */
      /*! Rule::       => */
      64: 50,

      /*! Conditions:: EXPRESSION */
      /*! Rule::       -> */
      65: '->',

      /*! Conditions:: EXPRESSION */
      /*! Rule::       @ */
      66: 19,

      /*! Conditions:: EXPRESSION */
      /*! Rule::       instanceof */
      67: 63,

      /*! Conditions:: EXPRESSION */
      /*! Rule::       true */
      68: 53,

      /*! Conditions:: EXPRESSION */
      /*! Rule::       false */
      69: 54,

      /*! Conditions:: EXPRESSION */
      /*! Rule::       if */
      70: 44,

      /*! Conditions:: EXPRESSION */
      /*! Rule::       then */
      71: 48,

      /*! Conditions:: EXPRESSION */
      /*! Rule::       else */
      72: 45,

      /*! Conditions:: EXPRESSION */
      /*! Rule::       as */
      73: 27,

      /*! Conditions:: EXPRESSION */
      /*! Rule::       {Constructor} */
      74: 56,

      /*! Conditions:: EXPRESSION */
      /*! Rule::       {Identifier} */
      75: 55,

      /*! Conditions:: * */
      /*! Rule::       {NumberLiteral} */
      78: 52,

      /*! Conditions:: * */
      /*! Rule::       {StringLiteral} */
      79: 51,

      /*! Conditions:: * */
      /*! Rule::       > */
      80: 14,

      /*! Conditions:: * */
      /*! Rule::       < */
      81: 13,

      /*! Conditions:: * */
      /*! Rule::       \( */
      82: 7,

      /*! Conditions:: * */
      /*! Rule::       \) */
      83: 8,

      /*! Conditions:: * */
      /*! Rule::       \[ */
      84: 10,

      /*! Conditions:: * */
      /*! Rule::       \] */
      85: 11,

      /*! Conditions:: * */
      /*! Rule::       ; */
      86: 20,

      /*! Conditions:: * */
      /*! Rule::       : */
      87: 12,

      /*! Conditions:: * */
      /*! Rule::       = */
      88: 9,

      /*! Conditions:: * */
      /*! Rule::       == */
      89: 59,

      /*! Conditions:: * */
      /*! Rule::       != */
      90: 60,

      /*! Conditions:: * */
      /*! Rule::       >= */
      91: 57,

      /*! Conditions:: * */
      /*! Rule::       <= */
      92: 58,

      /*! Conditions:: * */
      /*! Rule::       \+ */
      93: 21,

      /*! Conditions:: * */
      /*! Rule::       - */
      94: 23,

      /*! Conditions:: * */
      /*! Rule::       \* */
      95: 3,

      /*! Conditions:: * */
      /*! Rule::       \/ */
      96: 22,

      /*! Conditions:: * */
      /*! Rule::       \\ */
      97: 49,

      /*! Conditions:: * */
      /*! Rule::       && */
      98: 61,

      /*! Conditions:: * */
      /*! Rule::       \|\| */
      99: 62,

      /*! Conditions:: * */
      /*! Rule::       \^ */
      100: 24,

      /*! Conditions:: * */
      /*! Rule::       ! */
      101: 16,

      /*! Conditions:: * */
      /*! Rule::       , */
      102: 6,

      /*! Conditions:: * */
      /*! Rule::       \? */
      103: 18,

      /*! Conditions:: * */
      /*! Rule::       \. */
      104: 17,

      /*! Conditions:: * */
      /*! Rule::       \{ */
      105: 4,

      /*! Conditions:: * */
      /*! Rule::       \} */
      106: 5,

      /*! Conditions:: * */
      /*! Rule::       $ */
      107: 1
    },

    rules: [
      /*   0: */  /^(?:\s+)/,
      /*   1: */  /^(?:import)/,
      /*   2: */  /^(?:from)/,
      /*   3: */  /^(?:using)/,
      /*   4: */  /^(?:as)/,
      /*   5: */  /^(?:\{%)/,
      /*   6: */  /^(?:<!--)/,
      /*   7: */  /^(?:<)/,
      /*   8: */  /^(?:\{\{)/,
      /*   9: */  /^(?:([A-Z][\w$\-]*))/,
      /*  10: */  /^(?:([$_a-z][\w$\-]*))/,
      /*  11: */  /^(?:true)/,
      /*  12: */  /^(?:false)/,
      /*  13: */  /^(?:([A-Z][\w$\-]*))/,
      /*  14: */  /^(?:([$_a-z][\w$\-]*))/,
      /*  15: */  /^(?:\/>)/,
      /*  16: */  /^(?:\/)/,
      /*  17: */  /^(?:>)/,
      /*  18: */  /^(?:\{\{)/,
      /*  19: */  /^(?:\{\{)/,
      /*  20: */  /^(?:\{%)/,
      /*  21: */  /^(?:<!--)/,
      /*  22: */  /^(?:<\/)/,
      /*  23: */  /^(?:<)/,
      /*  24: */  /^(?:[^\/<>{%}]+)/,
      /*  25: */  /^(?:main)/,
      /*  26: */  /^(?:endmain)/,
      /*  27: */  /^(?:macro)/,
      /*  28: */  /^(?:endmacro)/,
      /*  29: */  /^(?:for)/,
      /*  30: */  /^(?:endfor)/,
      /*  31: */  /^(?:if)/,
      /*  32: */  /^(?:endif)/,
      /*  33: */  /^(?:else)/,
      /*  34: */  /^(?:elseif)/,
      /*  35: */  /^(?:in)/,
      /*  36: */  /^(?:case)/,
      /*  37: */  /^(?:endcase)/,
      /*  38: */  /^(?:export)/,
      /*  39: */  /^(?:from)/,
      /*  40: */  /^(?:view)/,
      /*  41: */  /^(?:using)/,
      /*  42: */  /^(?:endview)/,
      /*  43: */  /^(?:match)/,
      /*  44: */  /^(?:endmatch)/,
      /*  45: */  /^(?:instanceof)/,
      /*  46: */  /^(?:typeof)/,
      /*  47: */  /^(?:this)/,
      /*  48: */  /^(?:fun)/,
      /*  49: */  /^(?:endfun)/,
      /*  50: */  /^(?:as)/,
      /*  51: */  /^(?:::)/,
      /*  52: */  /^(?:@)/,
      /*  53: */  /^(?:\(\))/,
      /*  54: */  /^(?:=)/,
      /*  55: */  /^(?:([A-Z][\w$\-]*))/,
      /*  56: */  /^(?:([$_a-z][\w$\-]*))/,
      /*  57: */  /^(?:%\})/,
      /*  58: */  /^(?:<)/,
      /*  59: */  /^(?:\{\{)/,
      /*  60: */  /^(?:%\})/,
      /*  61: */  /^(?:([A-Z][\w$\-]*))/,
      /*  62: */  /^(?:([$_a-z][\w$\-]*))/,
      /*  63: */  /^(?:\|)/,
      /*  64: */  /^(?:=>)/,
      /*  65: */  /^(?:->)/,
      /*  66: */  /^(?:@)/,
      /*  67: */  /^(?:instanceof)/,
      /*  68: */  /^(?:true)/,
      /*  69: */  /^(?:false)/,
      /*  70: */  /^(?:if)/,
      /*  71: */  /^(?:then)/,
      /*  72: */  /^(?:else)/,
      /*  73: */  /^(?:as)/,
      /*  74: */  /^(?:([A-Z][\w$\-]*))/,
      /*  75: */  /^(?:([$_a-z][\w$\-]*))/,
      /*  76: */  /^(?:\}\})/,
      /*  77: */  /^(?:(.|\r|\n)*?-->)/,
      /*  78: */  /^(?:((?:([-]?(?:[-]?([0]|((?:[1-9])(?:\d+)*)))\.(?:\d+)*(?:(?:[Ee])(?:[+-]?\d+))?)|(\.(?:\d+)(?:(?:[Ee])(?:[+-]?\d+))?)|((?:[-]?([0]|((?:[1-9])(?:\d+)*)))(?:(?:[Ee])(?:[+-]?\d+))?))|(?:[0][Xx](?:[\dA-Fa-f])+)|(?:[0](?:[0-7])+)))/,
      /*  79: */  /^(?:(("(?:([^\n\r"\\]+)|(\\(?:(?:(?:["'\\bfnrtv])|(?:[^\d"'\\bfnrt-vx]))|(?:(?:[1-7][0-7]{0,2}|[0-7]{2,3}))|(?:[x](?:[\dA-Fa-f]){2})|(?:[u](?:[\dA-Fa-f]){4})))|(?:\\(\r\n|\r|\n)))*")|('(?:([^\n\r'\\]+)|(\\(?:(?:(?:["'\\bfnrtv])|(?:[^\d"'\\bfnrt-vx]))|(?:(?:[1-7][0-7]{0,2}|[0-7]{2,3}))|(?:[x](?:[\dA-Fa-f]){2})|(?:[u](?:[\dA-Fa-f]){4})))|(?:\\(\r\n|\r|\n)))*')|(`(?:([^\n\r\\`]+)|(\\(?:(?:(?:["'\\bfnrtv])|(?:[^\d"'\\bfnrt-vx]))|(?:(?:[1-7][0-7]{0,2}|[0-7]{2,3}))|(?:[x](?:[\dA-Fa-f]){2})|(?:[u](?:[\dA-Fa-f]){4})))|(?:\\(\r\n|\r|\n)))*`)))/,
      /*  80: */  /^(?:>)/,
      /*  81: */  /^(?:<)/,
      /*  82: */  /^(?:\()/,
      /*  83: */  /^(?:\))/,
      /*  84: */  /^(?:\[)/,
      /*  85: */  /^(?:\])/,
      /*  86: */  /^(?:;)/,
      /*  87: */  /^(?::)/,
      /*  88: */  /^(?:=)/,
      /*  89: */  /^(?:==)/,
      /*  90: */  /^(?:!=)/,
      /*  91: */  /^(?:>=)/,
      /*  92: */  /^(?:<=)/,
      /*  93: */  /^(?:\+)/,
      /*  94: */  /^(?:-)/,
      /*  95: */  /^(?:\*)/,
      /*  96: */  /^(?:\/)/,
      /*  97: */  /^(?:\\)/,
      /*  98: */  /^(?:&&)/,
      /*  99: */  /^(?:\|\|)/,
      /* 100: */  /^(?:\^)/,
      /* 101: */  /^(?:!)/,
      /* 102: */  /^(?:,)/,
      /* 103: */  /^(?:\?)/,
      /* 104: */  /^(?:\.)/,
      /* 105: */  /^(?:\{)/,
      /* 106: */  /^(?:\})/,
      /* 107: */  /^(?:$)/,
      /* 108: */  /^(?:.)/
    ],

    conditions: {
      'CHILDREN': {
        rules: [
          0,
          19,
          20,
          21,
          22,
          23,
          24,
          78,
          79,
          80,
          81,
          82,
          83,
          84,
          85,
          86,
          87,
          88,
          89,
          90,
          91,
          92,
          93,
          94,
          95,
          96,
          97,
          98,
          99,
          100,
          101,
          102,
          103,
          104,
          105,
          106,
          107
        ],

        inclusive: false
      },

      'COMMENT': {
        rules: [
          0,
          77,
          78,
          79,
          80,
          81,
          82,
          83,
          84,
          85,
          86,
          87,
          88,
          89,
          90,
          91,
          92,
          93,
          94,
          95,
          96,
          97,
          98,
          99,
          100,
          101,
          102,
          103,
          104,
          105,
          106,
          107
        ],

        inclusive: false
      },

      'CONTROL': {
        rules: [
          0,
          25,
          26,
          27,
          28,
          29,
          30,
          31,
          32,
          33,
          34,
          35,
          36,
          37,
          38,
          39,
          40,
          41,
          42,
          43,
          44,
          45,
          46,
          47,
          48,
          49,
          50,
          51,
          52,
          53,
          54,
          55,
          56,
          57,
          78,
          79,
          80,
          81,
          82,
          83,
          84,
          85,
          86,
          87,
          88,
          89,
          90,
          91,
          92,
          93,
          94,
          95,
          96,
          97,
          98,
          99,
          100,
          101,
          102,
          103,
          104,
          105,
          106,
          107
        ],

        inclusive: false
      },

      'EXPRESSION': {
        rules: [
          0,
          63,
          64,
          65,
          66,
          67,
          68,
          69,
          70,
          71,
          72,
          73,
          74,
          75,
          76,
          78,
          79,
          80,
          81,
          82,
          83,
          84,
          85,
          86,
          87,
          88,
          89,
          90,
          91,
          92,
          93,
          94,
          95,
          96,
          97,
          98,
          99,
          100,
          101,
          102,
          103,
          104,
          105,
          106,
          107
        ],

        inclusive: false
      },

      'CONTROL_CHILD': {
        rules: [
          0,
          58,
          59,
          60,
          61,
          62,
          78,
          79,
          80,
          81,
          82,
          83,
          84,
          85,
          86,
          87,
          88,
          89,
          90,
          91,
          92,
          93,
          94,
          95,
          96,
          97,
          98,
          99,
          100,
          101,
          102,
          103,
          104,
          105,
          106,
          107
        ],

        inclusive: false
      },

      'TAG': {
        rules: [
          0,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          78,
          79,
          80,
          81,
          82,
          83,
          84,
          85,
          86,
          87,
          88,
          89,
          90,
          91,
          92,
          93,
          94,
          95,
          96,
          97,
          98,
          99,
          100,
          101,
          102,
          103,
          104,
          105,
          106,
          107
        ],

        inclusive: false
      },

      'INITIAL': {
        rules: [
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          78,
          79,
          80,
          81,
          82,
          83,
          84,
          85,
          86,
          87,
          88,
          89,
          90,
          91,
          92,
          93,
          94,
          95,
          96,
          97,
          98,
          99,
          100,
          101,
          102,
          103,
          104,
          105,
          106,
          107,
          108
        ],

        inclusive: true
      }
    }
  };

  return lexer;
}();
parser.lexer = lexer;

function Parser() {
  this.yy = {};
}
Parser.prototype = parser;
parser.Parser = Parser;

return new Parser();
})();

        


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
  exports.parser = Parser;
  exports.Parser = Parser.Parser;
  exports.parse = function () {
    return Parser.parse.apply(Parser, arguments);
  };
  
}

},{}],38:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nodes = require("./AST");
var afpl = require("afpl");
var CONTEXT = '___context';
var VIEW = '___view';
var prims = ['String', 'Boolean', 'Number', 'Object', 'Undefined', 'Null', 'Void', 'Never', 'Any'];
/**
 * Types and functions for generating typescript program text.
 */
var _throwNotKnown = function (n) {
    throw new Error("Unsupported AST node " + (typeof n === 'object' ? n.constructor.name : n) + "!");
};
var noop = function () { return "function () {}"; };
/**
 * view template.
 */
exports.view = function (id, typeClasses, params, ctx, tag) {
    return "export class " + id + typeClasses + " extends $wml.AppView<" + ctx + "> {\n\n    constructor(context: " + ctx + (params ? ',' + params : '') + ") {\n\n        super(context);\n\n        this.template = (" + CONTEXT + ":" + ctx + ", " + VIEW + ":$wml.AppView<" + ctx + ">) =>\n          " + (tag ? tag : '<Node>document.createDocumentFragment()') + ";\n\n       }\n\n     }\n";
};
/**
 * code turns an AST into typescript code.
 */
exports.code = function (n, o) { return exports.module2TS(n, o); };
/**
 * module2TS converts a module to a typescript module.
 */
exports.module2TS = function (n, _a) {
    var module = _a.module;
    return "\nimport * as $wml from '" + module + "';\n" + n.imports.map(exports.importStatement2TS).join(';\n') + "\n\n" + n.exports.map(exports.exports2TS).join(';\n') + "\n\n" + (n.main ? exports.main2TS(n.main) : '') + "\n";
};
/**
 * exports2TS converts various exports to typescript.
 */
exports.exports2TS = function (n) {
    if (n instanceof nodes.ExportStatement)
        return exports.exportStatement2TS(n);
    else if (n instanceof nodes.FunStatement)
        return exports.funStatement2TS(n);
    else if (n instanceof nodes.ViewStatement)
        return exports.viewStatement2TS(n);
    else
        return _throwNotKnown(n);
};
/**
 * importStatement2TS converts an import statement.
 */
exports.importStatement2TS = function (n) {
    return "import " + exports.importMember2TS(n.member) + " from '" + n.module.value + "'; ";
};
/**
 * importMember2TS converts the members of an import to typescript.
 */
exports.importMember2TS = function (n) {
    if (n instanceof nodes.AggregateMember)
        return exports.aggregateMember2TS(n);
    else if (n instanceof nodes.AliasedMember)
        return exports.aliasedMember2TS(n);
    else if (n instanceof nodes.CompositeMember)
        return exports.compositeMember2TS(n);
    else
        return _throwNotKnown;
};
/**
 * aliasedMember2TS converts a member alias to typescript.
 */
exports.aliasedMember2TS = function (n) {
    return exports.identifierOrConstructor2TS(n.member) + " as " + exports.identifierOrConstructor2TS(n.alias) + " ";
};
/**
 * aggregateMember2TS converts a qualified member to typescript.
 */
exports.aggregateMember2TS = function (n) {
    return "* as " + exports.identifierOrConstructor2TS(n.id) + " ";
};
/**
 * compositeMember2TS coverts to typescript.
 */
exports.compositeMember2TS = function (n) {
    return '{' + (n.members.map(function (m) { return (m instanceof nodes.AliasedMember) ?
        exports.aliasedMember2TS(m) :
        exports.identifierOrConstructor2TS(m); }).join(',')) + '}';
};
/**
 * main2TS converts to typescript.
 */
exports.main2TS = function (n) {
    return (n instanceof nodes.TypedMain) ?
        exports.typedMain2TS(n) :
        exports.untypedMain2TS(n);
};
/**
 * typedMain2TS converts a typed main file to typescript.
 */
exports.typedMain2TS = function (n) {
    return exports.view(n.id ? exports.unqualifiedIdentifier2TS(n.id) : 'Main', exports.typeClasses2TS(n.typeClasses), n.parameters.map(exports.parameter2TS).join(','), exports.type2TS(n.context), exports.tag2TS(n.tag));
};
/**
 * untypedMain2TS converts an untyped main file to typescript.
 */
exports.untypedMain2TS = function (n) {
    return exports.view('Main', '', '', 'void', exports.tag2TS(n.tag));
};
/**
 * exportStatement2TS converts an export statement to typescript.
 */
exports.exportStatement2TS = function (n) {
    return "export " + exports.compositeMember2TS(n.members) + " from '" + n.module.value + "';\n";
};
/**
 * viewStatement2TS converts a view statement into a typescript class.
 */
exports.viewStatement2TS = function (n) {
    return exports.view(exports.constructor2TS(n.id), exports.typeClasses2TS(n.typeClasses), n.parameters.map(exports.parameter2TS).join(','), exports.type2TS(n.context), exports.tag2TS(n.tag));
};
var _funContext = function (n) { return "(" + CONTEXT + ":" + exports.type2TS(n) + ")=>"; };
var _funView = function () { return "(" + VIEW + ":$wml.View)=>"; };
/**
 * funStatement2TS converts a function statement to typescript.
 */
exports.funStatement2TS = function (n) {
    return "export const " + exports.unqualifiedIdentifier2TS(n.id) + " = " +
        (exports.typeClasses2TS(n.typeClasses) + "(" + n.parameters.map(exports.parameter2TS).join(',') + ")=>") +
        ((n.context != null) ? _funContext(n.context) : '') +
        _funView() +
        ((Array.isArray(n.body) ? exports.children2TS(n.body) : exports.child2TS(n.body)) + ";");
};
/**
 * typeClasses2TS converts a list of typeclasses into the a list of typescript typeclasses.
 */
exports.typeClasses2TS = function (ns) {
    return (ns.length === 0) ? '' : "< " + ns.map(exports.typeClass2TS).join(',') + ">";
};
/**
 * typeClass2TS converts a typeclass into a typescript typeclass.
 */
exports.typeClass2TS = function (n) {
    return exports.identifierOrConstructor2TS(n.id) + " " +
        ((n.constraint ? 'extends ' + exports.type2TS(n.constraint) : '') + " ");
};
var _toPrim = function (typ) {
    return prims.indexOf(typ) > -1 ? typ.toLowerCase() : typ;
};
/**
 * type2TS converts a type hint to a typescript type hint.
 */
exports.type2TS = function (n) {
    return _toPrim(exports.identifierOrConstructor2TS(n.id)) + " " +
        (exports.typeClasses2TS(n.typeClasses) + " " + (n.list ? '[]' : ''));
};
/**
 * parameter2TS converts a parameter to a typescript parameter.
 */
exports.parameter2TS = function (n) {
    return (n instanceof nodes.TypedParameter) ? exports.typedParameter2TS(n) :
        (n instanceof nodes.UntypedParameter) ? exports.untypedParameter2TS(n) :
            _throwNotKnown;
};
/**
 * typedParameter2TS converts a typed parameter into a non-any typescript parameter.
 */
exports.typedParameter2TS = function (n) {
    return exports.identifier2TS(n.id) + ":" + exports.type2TS(n.hint) + " ";
};
/**
 * untypedParameter2TS converts an type inferred parameter to a typescript parameter.
 */
exports.untypedParameter2TS = function (n) {
    return exports.identifier2TS(n.id) + " ";
};
/**
 * children2TS converts a list of children to typescript.
 */
exports.children2TS = function (list) {
    return (list.length === 0) ? 'document.createDocumentFragment();' :
        (list.length === 1) ? exports.child2TS(list[0]) :
            "$wml.box(" + list.map(function (l) { return exports.child2TS(l); }).join(',') + ") ";
};
/**
 * child2TS converts children to typescript.
 */
exports.child2TS = function (n) {
    if ((n instanceof nodes.Node) || (n instanceof nodes.Widget))
        return exports.tag2TS(n);
    else if (n instanceof nodes.Interpolation)
        return "$wml.domify(" + exports.interpolation2TS(n) + ") ";
    else if (n instanceof nodes.IfStatement)
        return exports.ifStatement2TS(n);
    else if (n instanceof nodes.ForStatement)
        return exports.forStatement2TS(n);
    else if (n instanceof nodes.Characters)
        return exports.characters2TS(n);
    else if (n instanceof nodes.ContextProperty)
        return exports.contextProperty2TS(n);
    else if (n instanceof nodes.QualifiedConstructor)
        return exports.qualifiedConstructor2TS(n);
    else if (n instanceof nodes.UnqualifiedConstructor)
        return exports.unqualifiedConstructor2TS(n);
    else if (n instanceof nodes.UnqualifiedIdentifier)
        return exports.unqualifiedIdentifier2TS(n);
    else if (n instanceof nodes.QualifiedIdentifier)
        return exports.qualifiedIdentifier2TS(n);
    else
        return _throwNotKnown(n);
};
/**
 * tag2TS converts a tag (node/widget) to typescript.
 */
exports.tag2TS = function (n) {
    var children = n.children.map(exports.child2TS);
    var attrs = exports.attrs2String(exports.groupAttrs(n.attributes));
    var name = exports.identifierOrConstructor2TS(n.open);
    return (n.type === 'widget') ? "$wml.widget(" + name + ", " + attrs + ", [" + children + "], " + VIEW + ")" :
        "$wml.node('" + name + "', " + attrs + ", [" + children + "], " + VIEW + ") ";
};
/**
 * attrs2String
 */
exports.attrs2String = function (attrs) { return '{' +
    (Object.keys(attrs).map(function (ns) { return ns + " : { " + attrs[ns].join(',') + " } "; })) + '}'; };
/**
 * groupAttrs groups attributes according to their namespace.
 */
exports.groupAttrs = function (ns) { return ns.reduce(function (p, c) {
    return afpl.util.merge(p, (_a = {},
        _a[c.namespace.id || 'html'] = (p[c.namespace.id || 'html'] || []).concat(exports.attribute2TS(c)),
        _a));
    var _a;
}, { html: [], wml: [] }); };
/**
 * attribute2Value
 */
exports.attribute2TS = function (n) {
    return exports.unqualifiedIdentifier2TS(n.name) + " : " + exports.attributeValue2TS(n.value) + " ";
};
/**
 * attributeValue2TS converts an attribute value to typescript.
 */
exports.attributeValue2TS = function (n) {
    return (n instanceof nodes.Interpolation) ? exports.interpolation2TS(n) : exports.literal2TS(n);
};
/**
 * interpolation2TS converts interpolation expressions to typescript.
 */
exports.interpolation2TS = function (n) {
    return n.filters.reduce(function (p, c) { return exports.expression2TS(c) + " (" + p + ")"; }, exports.expression2TS(n.expression));
};
/**
 * forStatement2TS converts a for statement to typescript.
 */
exports.forStatement2TS = function (n) {
    return "$wml.map(" + exports.expression2TS(n.list) + ", function _map" +
        ("(" + [n.variable, n.index, n.all].filter(function (x) { return x; }).map(exports.parameter2TS).join(',') + ") ") +
        ("{ return " + exports.children2TS(n.body) + " }, ") +
        ("function otherwise() { return " + exports.children2TS(n.otherwise) + " }) ");
};
/**
 * ifStatement2TS converts an if statement to typescript.
 */
exports.ifStatement2TS = function (n) {
    return "$wml.ifthen(" + exports.expression2TS(n.condition) + ", " +
        "function then()" +
        ("{ return " + exports.children2TS(n.then) + " }, " + (n.elseClause ? else2TS(n.elseClause) : noop()) + ") ");
};
var else2TS = function (n) {
    return (n instanceof nodes.ElseClause) ? exports.elseClause2TS(n) :
        (n instanceof nodes.ElseIfClause) ? exports.elseIfClause2TS(n) :
            _throwNotKnown(n);
};
/**
 * elseClause2TS converts the else clause of an if statement to typescript.
 */
exports.elseClause2TS = function (n) {
    return "function else_clause() { return " + exports.children2TS(n.children) + " } ";
};
/**
 * elseIfClause2TS converts an else if clause to typescript.
 */
exports.elseIfClause2TS = function (n) {
    return "function elseif()" +
        ("{ return $wml.ifthen(" + exports.expression2TS(n.condition) + ", ") +
        "function then() " +
        ("{ return " + exports.children2TS(n.then) + "; }, ") +
        (else2TS(n.elseClause) + ");}");
};
/**
 * characters2TS converts character text to a typescript string.
 */
exports.characters2TS = function (n) { return "$wml.text(`" + n.value + "`)"; };
/**
 * expression2TS converts a wml expression to a typescript expression.
 */
exports.expression2TS = function (n) {
    if (n instanceof nodes.IfThenExpression)
        return exports.ifThenExpression2TS(n);
    else if (n instanceof nodes.BinaryExpression)
        return exports.binaryExpression2TS(n);
    else if (n instanceof nodes.UnaryExpression)
        return exports.unaryExpression2TS(n);
    else if (n instanceof nodes.ViewConstruction)
        return exports.viewConstruction2TS(n);
    else if (n instanceof nodes.FunApplication)
        return exports.funApplication2TS(n);
    else if (n instanceof nodes.ConstructExpression)
        return exports.constructExpression2TS(n);
    else if (n instanceof nodes.CallExpression)
        return exports.callExpression2TS(n);
    else if (n instanceof nodes.MemberExpression)
        return exports.memberExpression2TS(n);
    else if (n instanceof nodes.ReadExpression)
        return exports.readExpression2TS(n);
    else if (n instanceof nodes.FunctionExpression)
        return exports.functionExpression2TS(n);
    else if (n instanceof nodes.Record)
        return exports.record2TS(n);
    else if (n instanceof nodes.List)
        return exports.list2TS(n);
    else if (n instanceof nodes.BooleanLiteral)
        return exports.boolean2TS(n);
    else if (n instanceof nodes.NumberLiteral)
        return exports.number2TS(n);
    else if (n instanceof nodes.StringLiteral)
        return exports.string2TS(n);
    else if (n instanceof nodes.ContextProperty)
        return exports.contextProperty2TS(n);
    else if (n instanceof nodes.QualifiedConstructor)
        return exports.qualifiedConstructor2TS(n);
    else if (n instanceof nodes.UnqualifiedConstructor)
        return exports.unqualifiedConstructor2TS(n);
    else if (n instanceof nodes.UnqualifiedIdentifier)
        return exports.unqualifiedIdentifier2TS(n);
    else if (n instanceof nodes.QualifiedIdentifier)
        return exports.qualifiedIdentifier2TS(n);
    else if (n instanceof nodes.ContextVariable)
        return exports.contextVariable2TS(n);
    else
        _throwNotKnown(n);
};
/**
 * ifThenExpression2TS converts an if-then-else expression to typescript.
 */
exports.ifThenExpression2TS = function (n) {
    return "(" + exports.expression2TS(n.condition) + ") ? " + exports.expression2TS(n.iftrue) + " : " + exports.expression2TS(n.iffalse) + " ";
};
/**
 * binaryExpression2TS converts a binary expression to typescript.
 */
exports.binaryExpression2TS = function (n) {
    return "(" + exports.expression2TS(n.left) + " " + exports.convertOperator(n.operator) + " " + exports.expression2TS(n.right) + ") ";
};
/**
 * convertOperator for strictness.
 */
exports.convertOperator = function (op) {
    return (op === '==') ? '===' :
        (op === '!=') ? '!==' :
            op;
};
/**
 * unaryExpression2TS converts a unary expression to typescript.
 */
exports.unaryExpression2TS = function (n) {
    return n.operator + " (" + exports.expression2TS(n.expression) + ")";
};
/**
 * viewConstruction2TS convers a view construction to typescript.
 */
exports.viewConstruction2TS = function (n) {
    return "(new " + exports.constructor2TS(n.cons) + "(" + exports.args2TS(n.context) + ")).render()";
};
var _applyFun = function (context) {
    return (context.length > 0 ? "(" + exports.args2TS(context) + ")" : '') + ("(" + VIEW + ")");
};
/**
 * funApplication2TS converts a fun application to typescript.
 */
exports.funApplication2TS = function (n) {
    return exports.expression2TS(n.target) + " " + exports.typeArgs2TS(n.typeArgs) + " " +
        ("(" + exports.args2TS(n.args) + ")" + _applyFun(n.context));
};
/**
 * constructExpression2TS converts a construct expression to a typescript new expression.
 */
exports.constructExpression2TS = function (n) {
    return "new " + exports.constructor2TS(n.cons) + " (" + exports.args2TS(n.args) + ")";
};
/**
 * callExpression2TS converts a call expression (apply) to a typescript invocation.
 */
exports.callExpression2TS = function (n) {
    return exports.expression2TS(n.target) + " " + exports.typeArgs2TS(n.typeArgs) + " (" + exports.args2TS(n.args) + ")";
};
/**
 * typeArgs2TS converts passed type arguments to typescript
 */
exports.typeArgs2TS = function (ns) {
    return ns.length === 0 ? '' : "< " + ns.map(exports.type2TS).join(',') + ">";
};
/**
 * args2TS converts a list of arguments to a typescript argument tupple.
 */
exports.args2TS = function (ns) {
    return (ns.length === 0) ? '' : ns.map(exports.expression2TS).join(',');
};
/**
 * memberExpression2TS converts a member expression into a typescript member expression.
 */
exports.memberExpression2TS = function (n) {
    return exports.expression2TS(n.target) + "." + exports.identifier2TS(n.member) + " ";
};
/**
 * readExpression2TS converts a read expression to side effect full property look up.
 *
 * NOTE: this part of the language is most likely to change.
 */
exports.readExpression2TS = function (n) {
    return "$wml.read < " + exports.type2TS(n.hint) + ">(" + exports.expression2TS(n.path) + ", " + exports.expression2TS(n.target) + " " +
        ((n.defaults ? ',' + exports.expression2TS(n.defaults) : '') + ")");
};
/**
 * functionExpression2TS converts a function expression to a typescript function expression.
 */
exports.functionExpression2TS = function (n) {
    return "(" + n.parameters.map(exports.parameter2TS).join(',') + ")=>" +
        ("" + exports.expression2TS(n.body));
};
/**
 * literal2TS converts literals.
 */
exports.literal2TS = function (n) {
    return (n instanceof nodes.BooleanLiteral) ? exports.boolean2TS(n) :
        (n instanceof nodes.StringLiteral) ? exports.string2TS(n) :
            (n instanceof nodes.NumberLiteral) ? exports.number2TS(n) :
                (n instanceof nodes.Record) ? exports.record2TS(n) :
                    (n instanceof nodes.List) ? exports.list2TS(n) :
                        _throwNotKnown(n);
};
/**
 * boolean2TS converts a boolean literal to a typescript boolean literal.
 */
exports.boolean2TS = function (n) { return n.value + " "; };
/**
 * string2TS converts a string literal to a typescript string literal.
 */
exports.string2TS = function (n) { return "`" + n.value + "`"; };
/**
 * number2TS converts a number literal to a typecript number literal.
 */
exports.number2TS = function (n) { return "" + parseFloat(n.value); };
/**
 * record2TS converts a record to a typescript object literal.
 */
exports.record2TS = function (n) {
    return "{" + n.properties.map(exports.property2TS).join(',') + "}";
};
/**
 * list2TS converts a list to a typescript array literal.
 */
exports.list2TS = function (n) {
    return "[" + n.members.map(exports.expression2TS).join(',') + "]";
};
/**
 * property2TS converts a property of a a record to typescript.
 */
exports.property2TS = function (n) {
    return "'" + exports.key2TS(n.key) + "' : " + exports.expression2TS(n.value);
};
/**
 * key2TS converts a single key on a record.
 */
exports.key2TS = function (n) {
    return (n instanceof nodes.StringLiteral) ? exports.string2TS(n) : exports.identifier2TS(n);
};
/**
 * contextProperty2TS turns property access on the context to regular TS
 * property access.
 */
exports.contextProperty2TS = function (n) {
    return CONTEXT + "." + exports.identifier2TS(n.member);
};
/**
 * contextVariable2TS turns the context variable into the context identifier.
 */
exports.contextVariable2TS = function (_) { return "" + CONTEXT; };
/**
 * identifierOrConstructor2TS
 */
exports.identifierOrConstructor2TS = function (n) {
    if ((n instanceof nodes.UnqualifiedIdentifier) ||
        (n instanceof nodes.QualifiedIdentifier))
        return exports.identifier2TS(n);
    else if ((n instanceof nodes.UnqualifiedConstructor) ||
        (n instanceof nodes.QualifiedConstructor))
        return exports.constructor2TS(n);
    else
        return _throwNotKnown(n);
};
/**
 * constructor2TS turns a constructor to a typescript identifier.
 *
 * Remember constructors are proper cased.
 */
exports.constructor2TS = function (n) {
    return (n instanceof nodes.QualifiedConstructor) ? exports.qualifiedConstructor2TS(n) :
        (n instanceof nodes.UnqualifiedConstructor) ? exports.unqualifiedConstructor2TS(n) :
            _throwNotKnown(n);
};
/**
 * unqualifiedConstructor2TS converts an unqualified constructor to typescript
 */
exports.unqualifiedConstructor2TS = function (n) { return "" + n.id; };
/**
 * qualifiedConstructor converts a qualified constructor to typescript.
 */
exports.qualifiedConstructor2TS = function (n) {
    return n.qualifier + "." + n.member;
};
/**
 * identifier2TS turns an identifier to a typescript identifier.
 */
exports.identifier2TS = function (n) {
    return (n instanceof nodes.QualifiedIdentifier) ? exports.qualifiedIdentifier2TS(n) :
        (n instanceof nodes.UnqualifiedIdentifier) ? exports.unqualifiedIdentifier2TS(n) :
            _throwNotKnown(n);
};
/**
 * qualifiedIdentifier2TS converts a qualified identifier to typescript
 */
exports.qualifiedIdentifier2TS = function (n) {
    return n.qualifier + "." + n.member;
};
/**
 * unqualifiedIdentifier2TS converts an unqualified identifier to typescript
 */
exports.unqualifiedIdentifier2TS = function (n) { return "" + n.id; };

},{"./AST":35,"afpl":41}],39:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var property = require("property-seek");
var Maybe_1 = require("afpl/lib/monad/Maybe");
var Compiler_1 = require("./Compiler");
exports.parse = Compiler_1.parse;
exports.compile = Compiler_1.compile;
;
/**
 * Component is an abstract Widget implementation
 * that can be used instead of manually implementing the whole interface.
 *
 */
var Component = /** @class */ (function () {
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
        return document.createDocumentFragment();
    }
    else {
        throw new TypeError("Can not use '" + a + "'(typeof " + typeof a + ") as Content!");
    }
};
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
        view.registerById(id, e);
    if (group)
        view.registerByGroup(group, e);
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
        view.registerById(id, w);
    if (group)
        view.registerByGroup(group, w);
    view.registerWidget(w);
    return w.render();
};
/**
 * ifthen provides an if then expression
 * @private
 */
exports.ifthen = function (predicate, positive, negative) {
    return (predicate) ? positive() : negative();
};
/**
 * forE provides a for expression
 * @private
 */
exports.map = function (collection, cb, cb2) {
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
 * AppView is the concrete implementation of a View.
 *
 * @property {<C>} context - The context the view is rendered in.
 */
var AppView = /** @class */ (function () {
    function AppView(context) {
        this.context = context;
        this.ids = {};
        this.groups = {};
        this.widgets = [];
    }
    AppView.prototype.registerWidget = function (w) {
        this.widgets.push(w);
        return this;
    };
    AppView.prototype.registerById = function (id, w) {
        if (this.ids.hasOwnProperty(id))
            throw new Error("Duplicate id '" + id + "' detected!");
        this.ids[id] = w;
        return this;
    };
    AppView.prototype.registerByGroup = function (group, e) {
        this.groups[group] = this.groups[group] || [];
        this.groups[group].push(e);
        return this;
    };
    AppView.prototype.findById = function (id) {
        return Maybe_1.Maybe.fromAny(this.ids[id]);
    };
    AppView.prototype.findGroupByName = function (name) {
        return Maybe_1.Maybe.fromArray(this.groups.hasOwnProperty(name) ? this.groups[name] : []);
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
        this.tree = this.template(this.context, this);
        this.ids['root'] = (this.ids['root']) ? this.ids['root'] : this.tree;
        if (this.tree.nodeName === (document.createDocumentFragment()).nodeName)
            this._fragRoot = this.tree.firstChild;
        this.widgets.forEach(function (w) { return w.rendered(); });
        return this.tree;
    };
    return AppView;
}());
exports.AppView = AppView;

},{"./Compiler":36,"afpl/lib/monad/Maybe":46,"property-seek":55}],40:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.f1 = function (f) { return f; };
exports.f2 = function (f) { return function (a) { return function (b) { return f(a, b); }; }; };
exports.f3 = function (f) {
    return function (a) { return function (b) { return function (c) { return f(a, b, c); }; }; };
};
exports.f4 = function (f) {
    return function (a) { return function (b) { return function (c) { return function (d) { return f(a, b, c, d); }; }; }; };
};
exports.f5 = function (f) {
    return function (a) { return function (b) { return function (c) { return function (d) { return function (e) { return f(a, b, c, d, e); }; }; }; }; };
};
exports.f6 = function (f) {
    return function (a) { return function (b) { return function (c) { return function (d) { return function (e) { return function (_f) { return f(a, b, c, d, e, _f); }; }; }; }; }; };
};

},{}],41:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util = require("./util");
exports.util = util;
var curry = require("./curry");
exports.curry = curry;
var Identity_1 = require("./monad/Identity");
exports.Identity = Identity_1.Identity;
var Maybe_1 = require("./monad/Maybe");
exports.Maybe = Maybe_1.Maybe;
var Either_1 = require("./monad/Either");
exports.Either = Either_1.Either;
var State_1 = require("./monad/State");
exports.State = State_1.State;
var Free_1 = require("./monad/Free");
exports.Free = Free_1.Free;
var IO_1 = require("./monad/IO");
exports.IO = IO_1.IO;

},{"./curry":40,"./monad/Either":42,"./monad/Free":43,"./monad/IO":44,"./monad/Identity":45,"./monad/Maybe":46,"./monad/State":47,"./util":48}],42:[function(require,module,exports){
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

},{}],43:[function(require,module,exports){
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
var util_1 = require("../util");
var Either_1 = require("./Either");
/**
 * free wraps a value in a free
 */
exports.free = function (a) { return new Return(a); };
/**
 * suspend lifts a function into a Free monad to mimic tail call recursion.
 */
exports.suspend = function (f) { return new Suspend(util_1.compose(exports.free, f)); };
/**
 * liftF lifts a Functor into a Free.
 */
exports.liftF = function (f) { return new Suspend(f.map(exports.free)); };
/**
 * Free is a Free monad that also implements a Free Applicative (almost).
 *
 * Inspired by https://cwmyers.github.io/monet.js/#free
 */
var Free = (function () {
    function Free() {
    }
    /**
     * of
     */
    Free.prototype.of = function (a) {
        return new Return(a);
    };
    /**
     * map
     */
    Free.prototype.map = function (f) {
        return this.chain(function (a) { return exports.free(f(a)); });
    };
    /**
     * chain
     */
    Free.prototype.chain = function (g) {
        if (this instanceof Suspend) {
            var f_1 = this.f;
            return (typeof f_1 === 'function') ?
                new Suspend(function (x) { return f_1(x).chain(g); }) :
                new Suspend(f_1.map(function (free) { return free.chain(g); }));
        }
        else if (this instanceof Return) {
            g(this.a);
        }
    };
    /**
     * resume the next stage of the computation
     */
    Free.prototype.resume = function () {
        if (this instanceof Suspend) {
            return Either_1.left(this.f);
        }
        else if (this instanceof Return) {
            return Either_1.right(this.a);
        }
    };
    /**
     * hoist
    hoist<B>(func: (fb: Functor<B>) => Functor<B>): Free<F, A> {

        if (this instanceof Suspend) {

            return new Suspend((func(this.f))
                .map((fr: Free<F, B>) => fr.hoist<any>(func)))
        } else {

            return this;

        }

    }
    */
    /**
     * cata
     */
    Free.prototype.cata = function (f, g) {
        return this.resume().cata(f, g);
    };
    /**
     * go runs the computation to completion using f to extract each stage.
     * @summmary go :: Free<F<*>, A> →  (F<Free<F,A>> →  Free<F,A>) →  A
     */
    Free.prototype.go = function (f) {
        if (this instanceof Suspend) {
            var r = this.resume();
            while (r instanceof Either_1.Left)
                r = (f(r.takeLeft())).resume();
            return r.takeRight();
        }
        else if (this instanceof Return) {
            return this.a;
        }
    };
    /**
     * run the Free chain to completion
     * @summary run :: Free<A→ A,A> →  A
     */
    Free.prototype.run = function () {
        return this.go(function (next) { return next(); });
    };
    Free.free = exports.free;
    Free.suspend = exports.suspend;
    Free.liftF = exports.liftF;
    return Free;
}());
exports.Free = Free;
var Suspend = (function (_super) {
    __extends(Suspend, _super);
    function Suspend(f) {
        var _this = _super.call(this) || this;
        _this.f = f;
        return _this;
    }
    return Suspend;
}(Free));
exports.Suspend = Suspend;
var Return = (function (_super) {
    __extends(Return, _super);
    function Return(a) {
        var _this = _super.call(this) || this;
        _this.a = a;
        return _this;
    }
    return Return;
}(Free));
exports.Return = Return;

},{"../util":48,"./Either":42}],44:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * wrapIO a value in the IO monad
 */
exports.wrapIO = function (a) { return new IO(function () { return a; }); };
/**
 * safeIO accepts a function that has side effects and wrapIOs it in an IO Monad.
 */
exports.safeIO = function (f) { return new IO(f); };
exports.pure = exports.wrapIO;
exports.suspend = exports.safeIO;
/**
 * IO monadic type for containing interactions with the 'real world'.
 */
var IO = (function () {
    function IO(effect) {
        this.effect = effect;
    }
    IO.prototype.of = function (v) {
        return new IO(function () { return v; });
    };
    IO.prototype.map = function (f) {
        var _this = this;
        return new IO(function () { return f(_this.effect()); });
    };
    IO.prototype.mapIn = function (b) {
        return this.map(function () { return b; });
    };
    /**
     * chain
     */
    IO.prototype.chain = function (f) {
        var _this = this;
        return new IO(function () { return f(_this.effect()).run(); });
    };
    IO.prototype.chainIn = function (b) {
        return this.chain(function () { return exports.wrapIO(b); });
    };
    /**
     * run
     */
    IO.prototype.run = function () {
        return this.effect();
    };
    IO.safeIO = exports.safeIO;
    IO.pure = exports.pure;
    IO.suspend = exports.suspend;
    IO.chain = function (f) { return function (m) { return m.chain(f); }; };
    return IO;
}());
exports.IO = IO;

},{}],45:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Identity
 */
var Identity = (function () {
    function Identity(a) {
        this.a = a;
    }
    /**
     * of
     */
    Identity.prototype.of = function (a) {
        return new Identity(a);
    };
    /**
     * map
     */
    Identity.prototype.map = function (f) {
        return new Identity(f(this.get()));
    };
    /**
     * chain
     */
    Identity.prototype.chain = function (f) {
        return f(this.get());
    };
    /**
     * ap
     */
    Identity.prototype.ap = function (i) {
        var _this = this;
        return i.map(function (f) { return f(_this.get()); });
    };
    /**
     * get the value of an Identity
     * @summary get :: Identity<A> →  A
     */
    Identity.prototype.get = function () {
        return this.a;
    };
    return Identity;
}());
exports.Identity = Identity;

},{}],46:[function(require,module,exports){
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

},{"./Either":42}],47:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * get the state from the internals of the monad
 */
exports.get = function () { return new State(function (s) { return ([s, s]); }); };
/**
 * put
 */
exports.put = function (s) { return new State(function () { return ([null, s]); }); };
/**
 * modify the state
 * @summary  (S →  S) →  State<S →  {A, S} >
 */
exports.modify = function (f) { return exports.get().chain(function (s) { return exports.put(f(s)); }); };
/**
 * gets applies a function to the state putting using the result
 * as the result of the computation.
 * @summary (S →  A) →  State<S →  {A, S}>
 */
exports.gets = function (f) { return exports.get().chain(function (s) { return exports.state(f(s)); }); };
/**
 * state create a new State monad
 */
exports.state = function (a) { return new State(function (s) { return ([a, s]); }); };
/**
 * State is a monadic class that we use to hold information that changes
 * during computation.
 *
 * This implementation is influenced by:
 * @link https://en.wikipedia.org/wiki/Monad_(functional_programming)#State_monads
 * @property {s →  (a, s)} a
 */
var State = (function () {
    function State(f) {
        this.f = f;
    }
    /**
     * of wraps a value in the State monad.
     * @summary A →  State<S→ {A,S}>
     */
    State.prototype.of = function (a) {
        return new State(function (s) { return ([a, s]); });
    };
    /**
     * map
     * @summary State<S → {A,S}> →  (A →  B) →  State<S →  {C, S}>
     */
    State.prototype.map = function (f) {
        var _this = this;
        return new State(function (xs) {
            var _a = _this.run(xs), a = _a[0], s = _a[1];
            return [f(a), s];
        });
    };
    /**
     * join replaces the outer State with an inner State
     */
    State.prototype.join = function () {
        var _this = this;
        return new State(function (xs) {
            var _a = _this.run(xs), a = _a[0], s = _a[1];
            return a.run(s);
        });
    };
    /**
     * chain
     */
    State.prototype.chain = function (f) {
        return this.map(f).join();
    };
    /**
     * evaluate the State returning the final value
     */
    State.prototype.evaluate = function (s) {
        return this.run(s)[0];
    };
    /**
     * execute the State returning the final state.
     */
    State.prototype.execute = function (s) {
        return this.run(s)[1];
    };
    /**
     * run the State yielding the final value and state.
     * @summary State<S→ {A<S}> →  S →  {A,S}
     */
    State.prototype.run = function (s) {
        return this.f(s);
    };
    State.get = exports.get;
    State.put = exports.put;
    State.modify = exports.modify;
    State.gets = exports.gets;
    State.state = exports.state;
    return State;
}());
exports.State = State;

},{}],48:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
/**
 * identity is the famed identity function.
 */
exports.identity = function (a) { return a; };
/**
 * merge two objects easily
 */
exports.merge = function () {
    var o = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        o[_i] = arguments[_i];
    }
    return Object.assign.apply(Object, [{}].concat(o));
};
/**
 * fuse is the deep version of merge
 */
exports.fuse = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return args.reduce(function (o, c) {
        if (c === void 0) { c = {}; }
        return exports.reduce(c, function (co, cc, k) {
            return Array.isArray(cc) ?
                (Array.isArray(co[k]) ?
                    exports.merge(co, (_a = {}, _a[k] = (co[k]).map(exports.copy).concat(cc.map(exports.copy)), _a)) :
                    exports.merge(co, (_b = {}, _b[k] = cc.map(exports.copy), _b))) :
                typeof cc !== 'object' ?
                    exports.merge(co, (_c = {}, _c[k] = cc, _c)) :
                    exports.merge(co, (_d = {},
                        _d[k] = (typeof co[k] !== 'object') ?
                            exports.merge(co[k], cc) :
                            exports.fuse(co[k], cc),
                        _d));
            var _a, _b, _c, _d;
        }, o);
    }, {});
};
exports.copy = function (o) {
    return (Array.isArray(o)) ?
        o.map(exports.copy) :
        (typeof o === 'object') ?
            exports.reduce(o, function (p, c, k) {
                return exports.merge(p, (_a = {}, _a[k] = exports.copy(c), _a));
                var _a;
            }, {}) : o;
};
/**
 * reduce an object's keys (in no guaranteed order)
 */
exports.reduce = function (o, f, accum) {
    return Object.keys(o).reduce(function (p, k) { return f(p, o[k], k, o); }, accum);
};
/**
 * map over an object (in no guaranteed oreder)
 */
exports.map = function (o, f) {
    return Object.keys(o).map((function (k) { return f(o[k], k, o); }));
};
/**
 * compose two functions into one.
 */
exports.compose = function (f, g) { return function (x) { return f(g(x)); }; };
/**
 * fling removes a key from an object
 * @param {string} key
 * @param {object} object
 * @return {Object}
 * @summary {(string,Object) →  Object}
 */
exports.fling = function (s, o) {
    if ((o == null) || (o.constructor !== Object))
        throw new TypeError('fling(): only works with object literals!');
    return Object.keys(o).reduce(function (o2, k) {
        return k === s ? o2 : exports.merge(o2, (_a = {},
            _a[k] = o[k],
            _a));
        var _a;
    }, {});
};
/**
 * head returns the item at index 0 of an array
 * @param {Array} list
 * @return {*}
 * @summary { Array →  * }
 */
exports.head = function (list) { return list[0]; };
/**
 * tail returns the last item in an array
 * @param {Array} list
 * @return {*}
 * @summary {Array →  *}
 */
exports.tail = function (list) { return list[list.length - 1]; };
/**
 * constant given a value, return a function that always returns this value.
 * @summary constant X →  * →  X
 *
 */
exports.constant = function (a) { return function () { return a; }; };
/**
 * f1 partial application.
 */
exports.f1 = function (f) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return function (a) { return f.apply(null, args.concat(a)); };
};
/**
 * f2 partial application
 */
exports.f2 = function (f) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return function (a) { return function (aa) { return f.apply(null, args.concat(a, aa)); }; };
};
/**
 * f3 partial application
 */
exports.f3 = function (f) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return function (a) { return function (aa) { return function (aaa) { return f.apply(null, args.concat(a, aa, aaa)); }; }; };
};
/**
 * f4 partial application
 */
exports.f4 = function (f) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return function (a) { return function (aa) { return function (aaa) { return function (aaaa) {
        return f.apply(null, args.concat(a, aa, aaa, aaaa));
    }; }; }; };
};
/**
 * f5 partial application
 */
exports.f5 = function (f) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return function (a) { return function (aa) { return function (aaa) { return function (aaaa) { return function (aaaaa) {
        return f.apply(null, args.concat(a, aa, aaa, aaaa, aaaaa));
    }; }; }; }; };
};
/**
 * except copies an object removing a single key.
 */
exports.except = function (keys, o) {
    return exports.reduce(o, function (p, c, k) {
        return keys.indexOf(k) > -1 ? p : exports.merge(p, (_a = {}, _a[k] = c, _a));
        var _a;
    }, {});
};

},{}],49:[function(require,module,exports){
arguments[4][42][0].apply(exports,arguments)
},{"dup":42}],50:[function(require,module,exports){
arguments[4][46][0].apply(exports,arguments)
},{"./Either":49,"dup":46}],51:[function(require,module,exports){
/*
  The MIT License (MIT)

  Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.

*/

/**
The following batches are equivalent:

var beautify_js = require('js-beautify');
var beautify_js = require('js-beautify').js;
var beautify_js = require('js-beautify').js_beautify;

var beautify_css = require('js-beautify').css;
var beautify_css = require('js-beautify').css_beautify;

var beautify_html = require('js-beautify').html;
var beautify_html = require('js-beautify').html_beautify;

All methods returned accept two arguments, the source string and an options object.
**/

function get_beautify(js_beautify, css_beautify, html_beautify) {
    // the default is js
    var beautify = function(src, config) {
        return js_beautify.js_beautify(src, config);
    };

    // short aliases
    beautify.js = js_beautify.js_beautify;
    beautify.css = css_beautify.css_beautify;
    beautify.html = html_beautify.html_beautify;

    // legacy aliases
    beautify.js_beautify = js_beautify.js_beautify;
    beautify.css_beautify = css_beautify.css_beautify;
    beautify.html_beautify = html_beautify.html_beautify;

    return beautify;
}

if (typeof define === "function" && define.amd) {
    // Add support for AMD ( https://github.com/amdjs/amdjs-api/wiki/AMD#defineamd-property- )
    define([
        "./lib/beautify",
        "./lib/beautify-css",
        "./lib/beautify-html"
    ], function(js_beautify, css_beautify, html_beautify) {
        return get_beautify(js_beautify, css_beautify, html_beautify);
    });
} else {
    (function(mod) {
        var js_beautify = require('./lib/beautify');
        var css_beautify = require('./lib/beautify-css');
        var html_beautify = require('./lib/beautify-html');

        mod.exports = get_beautify(js_beautify, css_beautify, html_beautify);

    })(module);
}
},{"./lib/beautify":54,"./lib/beautify-css":52,"./lib/beautify-html":53}],52:[function(require,module,exports){
(function (global){
/*jshint curly:false, eqeqeq:true, laxbreak:true, noempty:false */
/* AUTO-GENERATED. DO NOT MODIFY. */
/*

  The MIT License (MIT)

  Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.


 CSS Beautifier
---------------

    Written by Harutyun Amirjanyan, (amirjanyan@gmail.com)

    Based on code initially developed by: Einar Lielmanis, <einar@jsbeautifier.org>
        http://jsbeautifier.org/

    Usage:
        css_beautify(source_text);
        css_beautify(source_text, options);

    The options are (default in brackets):
        indent_size (4)                         — indentation size,
        indent_char (space)                     — character to indent with,
        selector_separator_newline (true)       - separate selectors with newline or
                                                  not (e.g. "a,\nbr" or "a, br")
        end_with_newline (false)                - end with a newline
        newline_between_rules (true)            - add a new line after every css rule
        space_around_selector_separator (false) - ensure space around selector separators:
                                                  '>', '+', '~' (e.g. "a>b" -> "a > b")
    e.g

    css_beautify(css_source_text, {
      'indent_size': 1,
      'indent_char': '\t',
      'selector_separator': ' ',
      'end_with_newline': false,
      'newline_between_rules': true,
      'space_around_selector_separator': true
    });
*/

// http://www.w3.org/TR/CSS21/syndata.html#tokenization
// http://www.w3.org/TR/css3-syntax/

(function() {
var legacy_beautify_css =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
/*

  The MIT License (MIT)

  Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

var mergeOpts = __webpack_require__(2).mergeOpts;
var acorn = __webpack_require__(1);
var Output = __webpack_require__(3).Output;


var lineBreak = acorn.lineBreak;
var allLineBreaks = acorn.allLineBreaks;

function Beautifier(source_text, options) {
    options = options || {};

    // Allow the setting of language/file-type specific options
    // with inheritance of overall settings
    options = mergeOpts(options, 'css');

    source_text = source_text || '';

    var newlinesFromLastWSEat = 0;
    var indentSize = options.indent_size ? parseInt(options.indent_size, 10) : 4;
    var indentCharacter = options.indent_char || ' ';
    var preserve_newlines = (options.preserve_newlines === undefined) ? false : options.preserve_newlines;
    var selectorSeparatorNewline = (options.selector_separator_newline === undefined) ? true : options.selector_separator_newline;
    var end_with_newline = (options.end_with_newline === undefined) ? false : options.end_with_newline;
    var newline_between_rules = (options.newline_between_rules === undefined) ? true : options.newline_between_rules;
    var space_around_combinator = (options.space_around_combinator === undefined) ? false : options.space_around_combinator;
    space_around_combinator = space_around_combinator || ((options.space_around_selector_separator === undefined) ? false : options.space_around_selector_separator);
    var eol = options.eol ? options.eol : 'auto';

    if (options.indent_with_tabs) {
        indentCharacter = '\t';
        indentSize = 1;
    }

    if (eol === 'auto') {
        eol = '\n';
        if (source_text && lineBreak.test(source_text || '')) {
            eol = source_text.match(lineBreak)[0];
        }
    }

    eol = eol.replace(/\\r/, '\r').replace(/\\n/, '\n');

    // HACK: newline parsing inconsistent. This brute force normalizes the input.
    source_text = source_text.replace(allLineBreaks, '\n');

    // tokenizer
    var whiteRe = /^\s+$/;

    var pos = -1,
        ch;
    var parenLevel = 0;

    function next() {
        ch = source_text.charAt(++pos);
        return ch || '';
    }

    function peek(skipWhitespace) {
        var result = '';
        var prev_pos = pos;
        if (skipWhitespace) {
            eatWhitespace();
        }
        result = source_text.charAt(pos + 1) || '';
        pos = prev_pos - 1;
        next();
        return result;
    }

    function eatString(endChars) {
        var start = pos;
        while (next()) {
            if (ch === "\\") {
                next();
            } else if (endChars.indexOf(ch) !== -1) {
                break;
            } else if (ch === "\n") {
                break;
            }
        }
        return source_text.substring(start, pos + 1);
    }

    function peekString(endChar) {
        var prev_pos = pos;
        var str = eatString(endChar);
        pos = prev_pos - 1;
        next();
        return str;
    }

    function eatWhitespace(preserve_newlines_local) {
        var result = 0;
        while (whiteRe.test(peek())) {
            next();
            if (ch === '\n' && preserve_newlines_local && preserve_newlines) {
                output.add_new_line(true);
                result++;
            }
        }
        newlinesFromLastWSEat = result;
        return result;
    }

    function skipWhitespace() {
        var result = '';
        if (ch && whiteRe.test(ch)) {
            result = ch;
        }
        while (whiteRe.test(next())) {
            result += ch;
        }
        return result;
    }

    function eatComment() {
        var start = pos;
        var singleLine = peek() === "/";
        next();
        while (next()) {
            if (!singleLine && ch === "*" && peek() === "/") {
                next();
                break;
            } else if (singleLine && ch === "\n") {
                return source_text.substring(start, pos);
            }
        }

        return source_text.substring(start, pos) + ch;
    }


    function lookBack(str) {
        return source_text.substring(pos - str.length, pos).toLowerCase() ===
            str;
    }

    // Nested pseudo-class if we are insideRule
    // and the next special character found opens
    // a new block
    function foundNestedPseudoClass() {
        var openParen = 0;
        for (var i = pos + 1; i < source_text.length; i++) {
            var ch = source_text.charAt(i);
            if (ch === "{") {
                return true;
            } else if (ch === '(') {
                // pseudoclasses can contain ()
                openParen += 1;
            } else if (ch === ')') {
                if (openParen === 0) {
                    return false;
                }
                openParen -= 1;
            } else if (ch === ";" || ch === "}") {
                return false;
            }
        }
        return false;
    }

    // printer
    var baseIndentString = '';
    var preindent_index = 0;
    if (source_text && source_text.length) {
        while ((source_text.charAt(preindent_index) === ' ' ||
                source_text.charAt(preindent_index) === '\t')) {
            preindent_index += 1;
        }
        baseIndentString = source_text.substring(0, preindent_index);
        js_source_text = source_text.substring(preindent_index);
    }


    var singleIndent = new Array(indentSize + 1).join(indentCharacter);
    var indentLevel;
    var nestedLevel;
    var output;

    function print_string(output_string) {
        if (output.just_added_newline()) {
            output.set_indent(indentLevel);
        }
        output.add_token(output_string);
    }

    function preserveSingleSpace(isAfterSpace) {
        if (isAfterSpace) {
            output.space_before_token = true;
        }
    }

    function indent() {
        indentLevel++;
    }

    function outdent() {
        if (indentLevel > 0) {
            indentLevel--;
        }
    }

    /*_____________________--------------------_____________________*/

    this.beautify = function() {
        // reset
        output = new Output(singleIndent, baseIndentString);
        indentLevel = 0;
        nestedLevel = 0;

        pos = -1;
        ch = null;
        parenLevel = 0;

        var insideRule = false;
        var insidePropertyValue = false;
        var enteringConditionalGroup = false;
        var top_ch = '';
        var last_top_ch = '';

        while (true) {
            var whitespace = skipWhitespace();
            var isAfterSpace = whitespace !== '';
            var isAfterNewline = whitespace.indexOf('\n') !== -1;
            last_top_ch = top_ch;
            top_ch = ch;

            if (!ch) {
                break;
            } else if (ch === '/' && peek() === '*') { /* css comment */
                var header = indentLevel === 0;

                if (isAfterNewline || header) {
                    output.add_new_line();
                }

                print_string(eatComment());
                output.add_new_line();
                if (header) {
                    output.add_new_line(true);
                }
            } else if (ch === '/' && peek() === '/') { // single line comment
                if (!isAfterNewline && last_top_ch !== '{') {
                    output.trim(true);
                }
                output.space_before_token = true;
                print_string(eatComment());
                output.add_new_line();
            } else if (ch === '@') {
                preserveSingleSpace(isAfterSpace);

                // deal with less propery mixins @{...}
                if (peek() === '{') {
                    print_string(eatString('}'));
                } else {
                    print_string(ch);

                    // strip trailing space, if present, for hash property checks
                    var variableOrRule = peekString(": ,;{}()[]/='\"");

                    if (variableOrRule.match(/[ :]$/)) {
                        // we have a variable or pseudo-class, add it and insert one space before continuing
                        next();
                        variableOrRule = eatString(": ").replace(/\s$/, '');
                        print_string(variableOrRule);
                        output.space_before_token = true;
                    }

                    variableOrRule = variableOrRule.replace(/\s$/, '');

                    // might be a nesting at-rule
                    if (variableOrRule in this.NESTED_AT_RULE) {
                        nestedLevel += 1;
                        if (variableOrRule in this.CONDITIONAL_GROUP_RULE) {
                            enteringConditionalGroup = true;
                        }
                    }
                }
            } else if (ch === '#' && peek() === '{') {
                preserveSingleSpace(isAfterSpace);
                print_string(eatString('}'));
            } else if (ch === '{') {
                if (peek(true) === '}') {
                    eatWhitespace();
                    next();
                    output.space_before_token = true;
                    print_string("{}");
                    if (!eatWhitespace(true)) {
                        output.add_new_line();
                    }

                    if (newlinesFromLastWSEat < 2 && newline_between_rules && indentLevel === 0) {
                        output.add_new_line(true);
                    }
                } else {
                    indent();
                    output.space_before_token = true;
                    print_string(ch);
                    if (!eatWhitespace(true)) {
                        output.add_new_line();
                    }

                    // when entering conditional groups, only rulesets are allowed
                    if (enteringConditionalGroup) {
                        enteringConditionalGroup = false;
                        insideRule = (indentLevel > nestedLevel);
                    } else {
                        // otherwise, declarations are also allowed
                        insideRule = (indentLevel >= nestedLevel);
                    }
                }
            } else if (ch === '}') {
                outdent();
                output.add_new_line();
                print_string(ch);
                insideRule = false;
                insidePropertyValue = false;
                if (nestedLevel) {
                    nestedLevel--;
                }

                if (!eatWhitespace(true)) {
                    output.add_new_line();
                }

                if (newlinesFromLastWSEat < 2 && newline_between_rules && indentLevel === 0) {
                    output.add_new_line(true);
                }
            } else if (ch === ":") {
                eatWhitespace();
                if ((insideRule || enteringConditionalGroup) &&
                    !(lookBack("&") || foundNestedPseudoClass()) &&
                    !lookBack("(")) {
                    // 'property: value' delimiter
                    // which could be in a conditional group query
                    print_string(':');
                    if (!insidePropertyValue) {
                        insidePropertyValue = true;
                        output.space_before_token = true;
                    }
                } else {
                    // sass/less parent reference don't use a space
                    // sass nested pseudo-class don't use a space

                    // preserve space before pseudoclasses/pseudoelements, as it means "in any child"
                    if (lookBack(" ")) {
                        output.space_before_token = true;
                    }
                    if (peek() === ":") {
                        // pseudo-element
                        next();
                        print_string("::");
                    } else {
                        // pseudo-class
                        print_string(':');
                    }
                }
            } else if (ch === '"' || ch === '\'') {
                preserveSingleSpace(isAfterSpace);
                print_string(eatString(ch));
            } else if (ch === ';') {
                insidePropertyValue = false;
                print_string(ch);
                if (!eatWhitespace(true)) {
                    output.add_new_line();
                }
            } else if (ch === '(') { // may be a url
                if (lookBack("url")) {
                    print_string(ch);
                    eatWhitespace();
                    if (next()) {
                        if (ch !== ')' && ch !== '"' && ch !== '\'') {
                            print_string(eatString(')'));
                        } else {
                            pos--;
                        }
                    }
                } else {
                    parenLevel++;
                    preserveSingleSpace(isAfterSpace);
                    print_string(ch);
                    eatWhitespace();
                }
            } else if (ch === ')') {
                print_string(ch);
                parenLevel--;
            } else if (ch === ',') {
                print_string(ch);
                if (!eatWhitespace(true) && selectorSeparatorNewline && !insidePropertyValue && parenLevel < 1) {
                    output.add_new_line();
                } else {
                    output.space_before_token = true;
                }
            } else if ((ch === '>' || ch === '+' || ch === '~') &&
                !insidePropertyValue && parenLevel < 1) {
                //handle combinator spacing
                if (space_around_combinator) {
                    output.space_before_token = true;
                    print_string(ch);
                    output.space_before_token = true;
                } else {
                    print_string(ch);
                    eatWhitespace();
                    // squash extra whitespace
                    if (ch && whiteRe.test(ch)) {
                        ch = '';
                    }
                }
            } else if (ch === ']') {
                print_string(ch);
            } else if (ch === '[') {
                preserveSingleSpace(isAfterSpace);
                print_string(ch);
            } else if (ch === '=') { // no whitespace before or after
                eatWhitespace();
                print_string('=');
                if (whiteRe.test(ch)) {
                    ch = '';
                }

            } else {
                preserveSingleSpace(isAfterSpace);
                print_string(ch);
            }
        }

        var sweetCode = output.get_code(end_with_newline, eol);

        return sweetCode;
    };

    // https://developer.mozilla.org/en-US/docs/Web/CSS/At-rule
    this.NESTED_AT_RULE = {
        "@page": true,
        "@font-face": true,
        "@keyframes": true,
        // also in CONDITIONAL_GROUP_RULE below
        "@media": true,
        "@supports": true,
        "@document": true
    };
    this.CONDITIONAL_GROUP_RULE = {
        "@media": true,
        "@supports": true,
        "@document": true
    };
}

module.exports.Beautifier = Beautifier;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

/* jshint curly: false */
// This section of code is taken from acorn.
//
// Acorn was written by Marijn Haverbeke and released under an MIT
// license. The Unicode regexps (for identifiers and whitespace) were
// taken from [Esprima](http://esprima.org) by Ariya Hidayat.
//
// Git repositories for Acorn are available at
//
//     http://marijnhaverbeke.nl/git/acorn
//     https://github.com/marijnh/acorn.git

// ## Character categories

// Big ugly regular expressions that match characters in the
// whitespace, identifier, and identifier-start categories. These
// are only applied when a character is found to actually have a
// code point above 128.

var nonASCIIwhitespace = /[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/; // jshint ignore:line
var nonASCIIidentifierStartChars = "\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc";
var nonASCIIidentifierChars = "\u0300-\u036f\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u0620-\u0649\u0672-\u06d3\u06e7-\u06e8\u06fb-\u06fc\u0730-\u074a\u0800-\u0814\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0840-\u0857\u08e4-\u08fe\u0900-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962-\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09d7\u09df-\u09e0\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2-\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b5f-\u0b60\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62-\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2-\u0ce3\u0ce6-\u0cef\u0d02\u0d03\u0d46-\u0d48\u0d57\u0d62-\u0d63\u0d66-\u0d6f\u0d82\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e34-\u0e3a\u0e40-\u0e45\u0e50-\u0e59\u0eb4-\u0eb9\u0ec8-\u0ecd\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f41-\u0f47\u0f71-\u0f84\u0f86-\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u1000-\u1029\u1040-\u1049\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u170e-\u1710\u1720-\u1730\u1740-\u1750\u1772\u1773\u1780-\u17b2\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u1920-\u192b\u1930-\u193b\u1951-\u196d\u19b0-\u19c0\u19c8-\u19c9\u19d0-\u19d9\u1a00-\u1a15\u1a20-\u1a53\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1b46-\u1b4b\u1b50-\u1b59\u1b6b-\u1b73\u1bb0-\u1bb9\u1be6-\u1bf3\u1c00-\u1c22\u1c40-\u1c49\u1c5b-\u1c7d\u1cd0-\u1cd2\u1d00-\u1dbe\u1e01-\u1f15\u200c\u200d\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2d81-\u2d96\u2de0-\u2dff\u3021-\u3028\u3099\u309a\ua640-\ua66d\ua674-\ua67d\ua69f\ua6f0-\ua6f1\ua7f8-\ua800\ua806\ua80b\ua823-\ua827\ua880-\ua881\ua8b4-\ua8c4\ua8d0-\ua8d9\ua8f3-\ua8f7\ua900-\ua909\ua926-\ua92d\ua930-\ua945\ua980-\ua983\ua9b3-\ua9c0\uaa00-\uaa27\uaa40-\uaa41\uaa4c-\uaa4d\uaa50-\uaa59\uaa7b\uaae0-\uaae9\uaaf2-\uaaf3\uabc0-\uabe1\uabec\uabed\uabf0-\uabf9\ufb20-\ufb28\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f";
var nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
var nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");

// Whether a single character denotes a newline.

exports.newline = /[\n\r\u2028\u2029]/;

// Matches a whole line break (where CRLF is considered a single
// line break). Used to count lines.

// in javascript, these two differ
// in python they are the same, different methods are called on them
exports.lineBreak = new RegExp('\r\n|' + exports.newline.source);
exports.allLineBreaks = new RegExp(exports.lineBreak.source, 'g');


// Test whether a given character code starts an identifier.

exports.isIdentifierStart = function(code) {
    // permit $ (36) and @ (64). @ is used in ES7 decorators.
    if (code < 65) return code === 36 || code === 64;
    // 65 through 91 are uppercase letters.
    if (code < 91) return true;
    // permit _ (95).
    if (code < 97) return code === 95;
    // 97 through 123 are lowercase letters.
    if (code < 123) return true;
    return code >= 0xaa && nonASCIIidentifierStart.test(String.fromCharCode(code));
};

// Test whether a given character is part of an identifier.

exports.isIdentifierChar = function(code) {
    if (code < 48) return code === 36;
    if (code < 58) return true;
    if (code < 65) return false;
    if (code < 91) return true;
    if (code < 97) return code === 95;
    if (code < 123) return true;
    return code >= 0xaa && nonASCIIidentifier.test(String.fromCharCode(code));
};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
/*

    The MIT License (MIT)

    Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

    Permission is hereby granted, free of charge, to any person
    obtaining a copy of this software and associated documentation files
    (the "Software"), to deal in the Software without restriction,
    including without limitation the rights to use, copy, modify, merge,
    publish, distribute, sublicense, and/or sell copies of the Software,
    and to permit persons to whom the Software is furnished to do so,
    subject to the following conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
    BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
    ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
    CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/

function mergeOpts(allOptions, targetType) {
    var finalOpts = {};
    var name;

    for (name in allOptions) {
        if (name !== targetType) {
            finalOpts[name] = allOptions[name];
        }
    }

    //merge in the per type settings for the targetType
    if (targetType in allOptions) {
        for (name in allOptions[targetType]) {
            finalOpts[name] = allOptions[targetType][name];
        }
    }
    return finalOpts;
}

module.exports.mergeOpts = mergeOpts;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
/*

  The MIT License (MIT)

  Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

function OutputLine(parent) {
    var _character_count = 0;
    // use indent_count as a marker for lines that have preserved indentation
    var _indent_count = -1;

    var _items = [];
    var _empty = true;

    this.set_indent = function(level) {
        _character_count = parent.baseIndentLength + level * parent.indent_length;
        _indent_count = level;
    };

    this.get_character_count = function() {
        return _character_count;
    };

    this.is_empty = function() {
        return _empty;
    };

    this.last = function() {
        if (!this._empty) {
            return _items[_items.length - 1];
        } else {
            return null;
        }
    };

    this.push = function(input) {
        _items.push(input);
        _character_count += input.length;
        _empty = false;
    };

    this.pop = function() {
        var item = null;
        if (!_empty) {
            item = _items.pop();
            _character_count -= item.length;
            _empty = _items.length === 0;
        }
        return item;
    };

    this.remove_indent = function() {
        if (_indent_count > 0) {
            _indent_count -= 1;
            _character_count -= parent.indent_length;
        }
    };

    this.trim = function() {
        while (this.last() === ' ') {
            _items.pop();
            _character_count -= 1;
        }
        _empty = _items.length === 0;
    };

    this.toString = function() {
        var result = '';
        if (!this._empty) {
            if (_indent_count >= 0) {
                result = parent.indent_cache[_indent_count];
            }
            result += _items.join('');
        }
        return result;
    };
}

function Output(indent_string, baseIndentString) {
    baseIndentString = baseIndentString || '';
    this.indent_cache = [baseIndentString];
    this.baseIndentLength = baseIndentString.length;
    this.indent_length = indent_string.length;
    this.raw = false;

    var lines = [];
    this.baseIndentString = baseIndentString;
    this.indent_string = indent_string;
    this.previous_line = null;
    this.current_line = null;
    this.space_before_token = false;

    this.add_outputline = function() {
        this.previous_line = this.current_line;
        this.current_line = new OutputLine(this);
        lines.push(this.current_line);
    };

    // initialize
    this.add_outputline();


    this.get_line_number = function() {
        return lines.length;
    };

    // Using object instead of string to allow for later expansion of info about each line
    this.add_new_line = function(force_newline) {
        if (this.get_line_number() === 1 && this.just_added_newline()) {
            return false; // no newline on start of file
        }

        if (force_newline || !this.just_added_newline()) {
            if (!this.raw) {
                this.add_outputline();
            }
            return true;
        }

        return false;
    };

    this.get_code = function(end_with_newline, eol) {
        var sweet_code = lines.join('\n').replace(/[\r\n\t ]+$/, '');

        if (end_with_newline) {
            sweet_code += '\n';
        }

        if (eol !== '\n') {
            sweet_code = sweet_code.replace(/[\n]/g, eol);
        }

        return sweet_code;
    };

    this.set_indent = function(level) {
        // Never indent your first output indent at the start of the file
        if (lines.length > 1) {
            while (level >= this.indent_cache.length) {
                this.indent_cache.push(this.indent_cache[this.indent_cache.length - 1] + this.indent_string);
            }

            this.current_line.set_indent(level);
            return true;
        }
        this.current_line.set_indent(0);
        return false;
    };

    this.add_raw_token = function(token) {
        for (var x = 0; x < token.newlines; x++) {
            this.add_outputline();
        }
        this.current_line.push(token.whitespace_before);
        this.current_line.push(token.text);
        this.space_before_token = false;
    };

    this.add_token = function(printable_token) {
        this.add_space_before_token();
        this.current_line.push(printable_token);
    };

    this.add_space_before_token = function() {
        if (this.space_before_token && !this.just_added_newline()) {
            this.current_line.push(' ');
        }
        this.space_before_token = false;
    };

    this.remove_indent = function(index) {
        var output_length = lines.length;
        while (index < output_length) {
            lines[index].remove_indent();
            index++;
        }
    };

    this.trim = function(eat_newlines) {
        eat_newlines = (eat_newlines === undefined) ? false : eat_newlines;

        this.current_line.trim(indent_string, baseIndentString);

        while (eat_newlines && lines.length > 1 &&
            this.current_line.is_empty()) {
            lines.pop();
            this.current_line = lines[lines.length - 1];
            this.current_line.trim();
        }

        this.previous_line = lines.length > 1 ? lines[lines.length - 2] : null;
    };

    this.just_added_newline = function() {
        return this.current_line.is_empty();
    };

    this.just_added_blankline = function() {
        if (this.just_added_newline()) {
            if (lines.length === 1) {
                return true; // start of the file and newline = blank
            }

            var line = lines[lines.length - 2];
            return line.is_empty();
        }
        return false;
    };
}

module.exports.Output = Output;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
/*

    The MIT License (MIT)

    Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

    Permission is hereby granted, free of charge, to any person
    obtaining a copy of this software and associated documentation files
    (the "Software"), to deal in the Software without restriction,
    including without limitation the rights to use, copy, modify, merge,
    publish, distribute, sublicense, and/or sell copies of the Software,
    and to permit persons to whom the Software is furnished to do so,
    subject to the following conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
    BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
    ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
    CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/

var Beautifier = __webpack_require__(0).Beautifier;

function css_beautify(source_text, options) {
    var beautifier = new Beautifier(source_text, options);
    return beautifier.beautify();
}

module.exports = css_beautify;

/***/ })
/******/ ]);
var css_beautify = legacy_beautify_css;
/* Footer */
if (typeof define === "function" && define.amd) {
    // Add support for AMD ( https://github.com/amdjs/amdjs-api/wiki/AMD#defineamd-property- )
    define([], function() {
        return {
            css_beautify: css_beautify
        };
    });
} else if (typeof exports !== "undefined") {
    // Add support for CommonJS. Just put this file somewhere on your require.paths
    // and you will be able to `var html_beautify = require("beautify").html_beautify`.
    exports.css_beautify = css_beautify;
} else if (typeof window !== "undefined") {
    // If we're running a web page and don't have either of the above, add our one global
    window.css_beautify = css_beautify;
} else if (typeof global !== "undefined") {
    // If we don't even have window, try global.
    global.css_beautify = css_beautify;
}

}());

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],53:[function(require,module,exports){
(function (global){
/*jshint curly:false, eqeqeq:true, laxbreak:true, noempty:false */
/* AUTO-GENERATED. DO NOT MODIFY. */
/*

  The MIT License (MIT)

  Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.


 Style HTML
---------------

  Written by Nochum Sossonko, (nsossonko@hotmail.com)

  Based on code initially developed by: Einar Lielmanis, <einar@jsbeautifier.org>
    http://jsbeautifier.org/

  Usage:
    style_html(html_source);

    style_html(html_source, options);

  The options are:
    indent_inner_html (default false)  — indent <head> and <body> sections,
    indent_size (default 4)          — indentation size,
    indent_char (default space)      — character to indent with,
    wrap_line_length (default 250)            -  maximum amount of characters per line (0 = disable)
    brace_style (default "collapse") - "collapse" | "expand" | "end-expand" | "none"
            put braces on the same line as control statements (default), or put braces on own line (Allman / ANSI style), or just put end braces on own line, or attempt to keep them where they are.
    unformatted (defaults to inline tags) - list of tags, that shouldn't be reformatted
    content_unformatted (defaults to pre tag) - list of tags, whose content shouldn't be reformatted
    indent_scripts (default normal)  - "keep"|"separate"|"normal"
    preserve_newlines (default true) - whether existing line breaks before elements should be preserved
                                        Only works before elements, not inside tags or for text.
    max_preserve_newlines (default unlimited) - maximum number of line breaks to be preserved in one chunk
    indent_handlebars (default false) - format and indent {{#foo}} and {{/foo}}
    end_with_newline (false)          - end with a newline
    extra_liners (default [head,body,/html]) -List of tags that should have an extra newline before them.

    e.g.

    style_html(html_source, {
      'indent_inner_html': false,
      'indent_size': 2,
      'indent_char': ' ',
      'wrap_line_length': 78,
      'brace_style': 'expand',
      'preserve_newlines': true,
      'max_preserve_newlines': 5,
      'indent_handlebars': false,
      'extra_liners': ['/html']
    });
*/

(function() {
var legacy_beautify_html =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
/*

  The MIT License (MIT)

  Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

var mergeOpts = __webpack_require__(2).mergeOpts;
var acorn = __webpack_require__(1);


var lineBreak = acorn.lineBreak;
var allLineBreaks = acorn.allLineBreaks;

// function trim(s) {
//     return s.replace(/^\s+|\s+$/g, '');
// }

function ltrim(s) {
    return s.replace(/^\s+/g, '');
}

function rtrim(s) {
    return s.replace(/\s+$/g, '');
}

function Beautifier(html_source, options, js_beautify, css_beautify) {
    //Wrapper function to invoke all the necessary constructors and deal with the output.
    html_source = html_source || '';

    var multi_parser,
        indent_inner_html,
        indent_body_inner_html,
        indent_head_inner_html,
        indent_size,
        indent_character,
        wrap_line_length,
        brace_style,
        unformatted,
        content_unformatted,
        preserve_newlines,
        max_preserve_newlines,
        indent_handlebars,
        wrap_attributes,
        wrap_attributes_indent_size,
        is_wrap_attributes_force,
        is_wrap_attributes_force_expand_multiline,
        is_wrap_attributes_force_aligned,
        end_with_newline,
        extra_liners,
        eol;

    options = options || {};

    // Allow the setting of language/file-type specific options
    // with inheritance of overall settings
    options = mergeOpts(options, 'html');

    // backwards compatibility to 1.3.4
    if ((options.wrap_line_length === undefined || parseInt(options.wrap_line_length, 10) === 0) &&
        (options.max_char !== undefined && parseInt(options.max_char, 10) !== 0)) {
        options.wrap_line_length = options.max_char;
    }

    indent_inner_html = (options.indent_inner_html === undefined) ? false : options.indent_inner_html;
    indent_body_inner_html = (options.indent_body_inner_html === undefined) ? true : options.indent_body_inner_html;
    indent_head_inner_html = (options.indent_head_inner_html === undefined) ? true : options.indent_head_inner_html;
    indent_size = (options.indent_size === undefined) ? 4 : parseInt(options.indent_size, 10);
    indent_character = (options.indent_char === undefined) ? ' ' : options.indent_char;
    brace_style = (options.brace_style === undefined) ? 'collapse' : options.brace_style;
    wrap_line_length = parseInt(options.wrap_line_length, 10) === 0 ? 32786 : parseInt(options.wrap_line_length || 250, 10);
    unformatted = options.unformatted || [
        // https://www.w3.org/TR/html5/dom.html#phrasing-content
        'a', 'abbr', 'area', 'audio', 'b', 'bdi', 'bdo', 'br', 'button', 'canvas', 'cite',
        'code', 'data', 'datalist', 'del', 'dfn', 'em', 'embed', 'i', 'iframe', 'img',
        'input', 'ins', 'kbd', 'keygen', 'label', 'map', 'mark', 'math', 'meter', 'noscript',
        'object', 'output', 'progress', 'q', 'ruby', 's', 'samp', /* 'script', */ 'select', 'small',
        'span', 'strong', 'sub', 'sup', 'svg', 'template', 'textarea', 'time', 'u', 'var',
        'video', 'wbr', 'text',
        // prexisting - not sure of full effect of removing, leaving in
        'acronym', 'address', 'big', 'dt', 'ins', 'strike', 'tt',
    ];
    content_unformatted = options.content_unformatted || [
        'pre',
    ];
    preserve_newlines = (options.preserve_newlines === undefined) ? true : options.preserve_newlines;
    max_preserve_newlines = preserve_newlines ?
        (isNaN(parseInt(options.max_preserve_newlines, 10)) ? 32786 : parseInt(options.max_preserve_newlines, 10)) :
        0;
    indent_handlebars = (options.indent_handlebars === undefined) ? false : options.indent_handlebars;
    wrap_attributes = (options.wrap_attributes === undefined) ? 'auto' : options.wrap_attributes;
    wrap_attributes_indent_size = (isNaN(parseInt(options.wrap_attributes_indent_size, 10))) ? indent_size : parseInt(options.wrap_attributes_indent_size, 10);
    is_wrap_attributes_force = wrap_attributes.substr(0, 'force'.length) === 'force';
    is_wrap_attributes_force_expand_multiline = (wrap_attributes === 'force-expand-multiline');
    is_wrap_attributes_force_aligned = (wrap_attributes === 'force-aligned');
    end_with_newline = (options.end_with_newline === undefined) ? false : options.end_with_newline;
    extra_liners = (typeof options.extra_liners === 'object') && options.extra_liners ?
        options.extra_liners.concat() : (typeof options.extra_liners === 'string') ?
        options.extra_liners.split(',') : 'head,body,/html'.split(',');
    eol = options.eol ? options.eol : 'auto';

    if (options.indent_with_tabs) {
        indent_character = '\t';
        indent_size = 1;
    }

    if (eol === 'auto') {
        eol = '\n';
        if (html_source && lineBreak.test(html_source || '')) {
            eol = html_source.match(lineBreak)[0];
        }
    }

    eol = eol.replace(/\\r/, '\r').replace(/\\n/, '\n');

    // HACK: newline parsing inconsistent. This brute force normalizes the input.
    html_source = html_source.replace(allLineBreaks, '\n');

    function Parser() {

        this.pos = 0; //Parser position
        this.token = '';
        this.current_mode = 'CONTENT'; //reflects the current Parser mode: TAG/CONTENT
        this.tags = { //An object to hold tags, their position, and their parent-tags, initiated with default values
            parent: 'parent1',
            parentcount: 1,
            parent1: ''
        };
        this.tag_type = '';
        this.token_text = this.last_token = this.last_text = this.token_type = '';
        this.newlines = 0;
        this.indent_content = indent_inner_html;
        this.indent_body_inner_html = indent_body_inner_html;
        this.indent_head_inner_html = indent_head_inner_html;

        this.Utils = { //Uilities made available to the various functions
            whitespace: "\n\r\t ".split(''),

            single_token: options.void_elements || [
                // HTLM void elements - aka self-closing tags - aka singletons
                // https://www.w3.org/html/wg/drafts/html/master/syntax.html#void-elements
                'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'keygen',
                'link', 'menuitem', 'meta', 'param', 'source', 'track', 'wbr',
                // NOTE: Optional tags - are not understood.
                // https://www.w3.org/TR/html5/syntax.html#optional-tags
                // The rules for optional tags are too complex for a simple list
                // Also, the content of these tags should still be indented in many cases.
                // 'li' is a good exmple.

                // Doctype and xml elements
                '!doctype', '?xml',
                // ?php tag
                '?php',
                // other tags that were in this list, keeping just in case
                'basefont', 'isindex'
            ],
            extra_liners: extra_liners, //for tags that need a line of whitespace before them
            in_array: function(what, arr) {
                for (var i = 0; i < arr.length; i++) {
                    if (what === arr[i]) {
                        return true;
                    }
                }
                return false;
            }
        };

        // Return true if the given text is composed entirely of whitespace.
        this.is_whitespace = function(text) {
            for (var n = 0; n < text.length; n++) {
                if (!this.Utils.in_array(text.charAt(n), this.Utils.whitespace)) {
                    return false;
                }
            }
            return true;
        };

        this.traverse_whitespace = function() {
            var input_char = '';

            input_char = this.input.charAt(this.pos);
            if (this.Utils.in_array(input_char, this.Utils.whitespace)) {
                this.newlines = 0;
                while (this.Utils.in_array(input_char, this.Utils.whitespace)) {
                    if (preserve_newlines && input_char === '\n' && this.newlines <= max_preserve_newlines) {
                        this.newlines += 1;
                    }

                    this.pos++;
                    input_char = this.input.charAt(this.pos);
                }
                return true;
            }
            return false;
        };

        // Append a space to the given content (string array) or, if we are
        // at the wrap_line_length, append a newline/indentation.
        // return true if a newline was added, false if a space was added
        this.space_or_wrap = function(content) {
            if (this.line_char_count >= this.wrap_line_length) { //insert a line when the wrap_line_length is reached
                this.print_newline(false, content);
                this.print_indentation(content);
                return true;
            } else {
                this.line_char_count++;
                content.push(' ');
                return false;
            }
        };

        this.get_content = function() { //function to capture regular content between tags
            var input_char = '',
                content = [],
                handlebarsStarted = 0;

            while (this.input.charAt(this.pos) !== '<' || handlebarsStarted === 2) {
                if (this.pos >= this.input.length) {
                    return content.length ? content.join('') : ['', 'TK_EOF'];
                }

                if (handlebarsStarted < 2 && this.traverse_whitespace()) {
                    this.space_or_wrap(content);
                    continue;
                }

                input_char = this.input.charAt(this.pos);

                if (indent_handlebars) {
                    if (input_char === '{') {
                        handlebarsStarted += 1;
                    } else if (handlebarsStarted < 2) {
                        handlebarsStarted = 0;
                    }

                    if (input_char === '}' && handlebarsStarted > 0) {
                        if (handlebarsStarted-- === 0) {
                            break;
                        }
                    }
                    // Handlebars parsing is complicated.
                    // {{#foo}} and {{/foo}} are formatted tags.
                    // {{something}} should get treated as content, except:
                    // {{else}} specifically behaves like {{#if}} and {{/if}}
                    var peek3 = this.input.substr(this.pos, 3);
                    if (peek3 === '{{#' || peek3 === '{{/') {
                        // These are tags and not content.
                        break;
                    } else if (peek3 === '{{!') {
                        return [this.get_tag(), 'TK_TAG_HANDLEBARS_COMMENT'];
                    } else if (this.input.substr(this.pos, 2) === '{{') {
                        if (this.get_tag(true) === '{{else}}') {
                            break;
                        }
                    }
                }

                this.pos++;
                this.line_char_count++;
                content.push(input_char); //letter at-a-time (or string) inserted to an array
            }
            return content.length ? content.join('') : '';
        };

        this.get_contents_to = function(name) { //get the full content of a script or style to pass to js_beautify
            if (this.pos === this.input.length) {
                return ['', 'TK_EOF'];
            }
            var content = '';
            var reg_match = new RegExp('</' + name + '\\s*>', 'igm');
            reg_match.lastIndex = this.pos;
            var reg_array = reg_match.exec(this.input);
            var end_script = reg_array ? reg_array.index : this.input.length; //absolute end of script
            if (this.pos < end_script) { //get everything in between the script tags
                content = this.input.substring(this.pos, end_script);
                this.pos = end_script;
            }
            return content;
        };

        this.record_tag = function(tag) { //function to record a tag and its parent in this.tags Object
            if (this.tags[tag + 'count']) { //check for the existence of this tag type
                this.tags[tag + 'count']++;
                this.tags[tag + this.tags[tag + 'count']] = this.indent_level; //and record the present indent level
            } else { //otherwise initialize this tag type
                this.tags[tag + 'count'] = 1;
                this.tags[tag + this.tags[tag + 'count']] = this.indent_level; //and record the present indent level
            }
            this.tags[tag + this.tags[tag + 'count'] + 'parent'] = this.tags.parent; //set the parent (i.e. in the case of a div this.tags.div1parent)
            this.tags.parent = tag + this.tags[tag + 'count']; //and make this the current parent (i.e. in the case of a div 'div1')
        };

        this.retrieve_tag = function(tag) { //function to retrieve the opening tag to the corresponding closer
            if (this.tags[tag + 'count']) { //if the openener is not in the Object we ignore it
                var temp_parent = this.tags.parent; //check to see if it's a closable tag.
                while (temp_parent) { //till we reach '' (the initial value);
                    if (tag + this.tags[tag + 'count'] === temp_parent) { //if this is it use it
                        break;
                    }
                    temp_parent = this.tags[temp_parent + 'parent']; //otherwise keep on climbing up the DOM Tree
                }
                if (temp_parent) { //if we caught something
                    this.indent_level = this.tags[tag + this.tags[tag + 'count']]; //set the indent_level accordingly
                    this.tags.parent = this.tags[temp_parent + 'parent']; //and set the current parent
                }
                delete this.tags[tag + this.tags[tag + 'count'] + 'parent']; //delete the closed tags parent reference...
                delete this.tags[tag + this.tags[tag + 'count']]; //...and the tag itself
                if (this.tags[tag + 'count'] === 1) {
                    delete this.tags[tag + 'count'];
                } else {
                    this.tags[tag + 'count']--;
                }
            }
        };

        this.indent_to_tag = function(tag) {
            // Match the indentation level to the last use of this tag, but don't remove it.
            if (!this.tags[tag + 'count']) {
                return;
            }
            var temp_parent = this.tags.parent;
            while (temp_parent) {
                if (tag + this.tags[tag + 'count'] === temp_parent) {
                    break;
                }
                temp_parent = this.tags[temp_parent + 'parent'];
            }
            if (temp_parent) {
                this.indent_level = this.tags[tag + this.tags[tag + 'count']];
            }
        };

        this.get_tag = function(peek) { //function to get a full tag and parse its type
            var input_char = '',
                content = [],
                comment = '',
                space = false,
                first_attr = true,
                has_wrapped_attrs = false,
                tag_start, tag_end,
                tag_start_char,
                orig_pos = this.pos,
                orig_line_char_count = this.line_char_count,
                is_tag_closed = false,
                tail;

            peek = peek !== undefined ? peek : false;

            do {
                if (this.pos >= this.input.length) {
                    if (peek) {
                        this.pos = orig_pos;
                        this.line_char_count = orig_line_char_count;
                    }
                    return content.length ? content.join('') : ['', 'TK_EOF'];
                }

                input_char = this.input.charAt(this.pos);
                this.pos++;

                if (this.Utils.in_array(input_char, this.Utils.whitespace)) { //don't want to insert unnecessary space
                    space = true;
                    continue;
                }

                if (input_char === "'" || input_char === '"') {
                    input_char += this.get_unformatted(input_char);
                    space = true;
                }

                if (input_char === '=') { //no space before =
                    space = false;
                }
                tail = this.input.substr(this.pos - 1);
                if (is_wrap_attributes_force_expand_multiline && has_wrapped_attrs && !is_tag_closed && (input_char === '>' || input_char === '/')) {
                    if (tail.match(/^\/?\s*>/)) {
                        space = false;
                        is_tag_closed = true;
                        this.print_newline(false, content);
                        this.print_indentation(content);
                    }
                }
                if (content.length && content[content.length - 1] !== '=' && input_char !== '>' && space) {
                    //no space after = or before >
                    var wrapped = this.space_or_wrap(content);
                    var indentAttrs = wrapped && input_char !== '/' && !is_wrap_attributes_force;
                    space = false;

                    if (is_wrap_attributes_force && input_char !== '/') {
                        var force_first_attr_wrap = false;
                        if (is_wrap_attributes_force_expand_multiline && first_attr) {
                            var is_only_attribute = tail.match(/^\S*(="([^"]|\\")*")?\s*\/?\s*>/) !== null;
                            force_first_attr_wrap = !is_only_attribute;
                        }
                        if (!first_attr || force_first_attr_wrap) {
                            this.print_newline(false, content);
                            this.print_indentation(content);
                            indentAttrs = true;
                        }
                    }
                    if (indentAttrs) {
                        has_wrapped_attrs = true;

                        //indent attributes an auto, forced, or forced-align line-wrap
                        var alignment_size = wrap_attributes_indent_size;
                        if (is_wrap_attributes_force_aligned) {
                            alignment_size = content.indexOf(' ') + 1;
                        }

                        for (var count = 0; count < alignment_size; count++) {
                            // only ever further indent with spaces since we're trying to align characters
                            content.push(' ');
                        }
                    }
                    if (first_attr) {
                        for (var i = 0; i < content.length; i++) {
                            if (content[i] === ' ') {
                                first_attr = false;
                                break;
                            }
                        }
                    }
                }

                if (indent_handlebars && tag_start_char === '<') {
                    // When inside an angle-bracket tag, put spaces around
                    // handlebars not inside of strings.
                    if ((input_char + this.input.charAt(this.pos)) === '{{') {
                        input_char += this.get_unformatted('}}');
                        if (content.length && content[content.length - 1] !== ' ' && content[content.length - 1] !== '<') {
                            input_char = ' ' + input_char;
                        }
                        space = true;
                    }
                }

                if (input_char === '<' && !tag_start_char) {
                    tag_start = this.pos - 1;
                    tag_start_char = '<';
                }

                if (indent_handlebars && !tag_start_char) {
                    if (content.length >= 2 && content[content.length - 1] === '{' && content[content.length - 2] === '{') {
                        if (input_char === '#' || input_char === '/' || input_char === '!') {
                            tag_start = this.pos - 3;
                        } else {
                            tag_start = this.pos - 2;
                        }
                        tag_start_char = '{';
                    }
                }

                this.line_char_count++;
                content.push(input_char); //inserts character at-a-time (or string)

                if (content[1] && (content[1] === '!' || content[1] === '?' || content[1] === '%')) { //if we're in a comment, do something special
                    // We treat all comments as literals, even more than preformatted tags
                    // we just look for the appropriate close tag
                    content = [this.get_comment(tag_start)];
                    break;
                }

                if (indent_handlebars && content[1] && content[1] === '{' && content[2] && content[2] === '!') { //if we're in a comment, do something special
                    // We treat all comments as literals, even more than preformatted tags
                    // we just look for the appropriate close tag
                    content = [this.get_comment(tag_start)];
                    break;
                }

                if (indent_handlebars && tag_start_char === '{' && content.length > 2 && content[content.length - 2] === '}' && content[content.length - 1] === '}') {
                    break;
                }
            } while (input_char !== '>');

            var tag_complete = content.join('');
            var tag_index;
            var tag_offset;

            // must check for space first otherwise the tag could have the first attribute included, and
            // then not un-indent correctly
            if (tag_complete.indexOf(' ') !== -1) { //if there's whitespace, thats where the tag name ends
                tag_index = tag_complete.indexOf(' ');
            } else if (tag_complete.indexOf('\n') !== -1) { //if there's a line break, thats where the tag name ends
                tag_index = tag_complete.indexOf('\n');
            } else if (tag_complete.charAt(0) === '{') {
                tag_index = tag_complete.indexOf('}');
            } else { //otherwise go with the tag ending
                tag_index = tag_complete.indexOf('>');
            }
            if (tag_complete.charAt(0) === '<' || !indent_handlebars) {
                tag_offset = 1;
            } else {
                tag_offset = tag_complete.charAt(2) === '#' ? 3 : 2;
            }
            var tag_check = tag_complete.substring(tag_offset, tag_index).toLowerCase();
            if (tag_complete.charAt(tag_complete.length - 2) === '/' ||
                this.Utils.in_array(tag_check, this.Utils.single_token)) { //if this tag name is a single tag type (either in the list or has a closing /)
                if (!peek) {
                    this.tag_type = 'SINGLE';
                }
            } else if (indent_handlebars && tag_complete.charAt(0) === '{' && tag_check === 'else') {
                if (!peek) {
                    this.indent_to_tag('if');
                    this.tag_type = 'HANDLEBARS_ELSE';
                    this.indent_content = true;
                    this.traverse_whitespace();
                }
            } else if (this.is_unformatted(tag_check, unformatted) ||
                this.is_unformatted(tag_check, content_unformatted)) {
                // do not reformat the "unformatted" or "content_unformatted" tags
                comment = this.get_unformatted('</' + tag_check + '>', tag_complete); //...delegate to get_unformatted function
                content.push(comment);
                tag_end = this.pos - 1;
                this.tag_type = 'SINGLE';
            } else if (tag_check === 'script' &&
                (tag_complete.search('type') === -1 ||
                    (tag_complete.search('type') > -1 &&
                        tag_complete.search(/\b(text|application|dojo)\/(x-)?(javascript|ecmascript|jscript|livescript|(ld\+)?json|method|aspect)/) > -1))) {
                if (!peek) {
                    this.record_tag(tag_check);
                    this.tag_type = 'SCRIPT';
                }
            } else if (tag_check === 'style' &&
                (tag_complete.search('type') === -1 ||
                    (tag_complete.search('type') > -1 && tag_complete.search('text/css') > -1))) {
                if (!peek) {
                    this.record_tag(tag_check);
                    this.tag_type = 'STYLE';
                }
            } else if (tag_check.charAt(0) === '!') { //peek for <! comment
                // for comments content is already correct.
                if (!peek) {
                    this.tag_type = 'SINGLE';
                    this.traverse_whitespace();
                }
            } else if (!peek) {
                if (tag_check.charAt(0) === '/') { //this tag is a double tag so check for tag-ending
                    this.retrieve_tag(tag_check.substring(1)); //remove it and all ancestors
                    this.tag_type = 'END';
                } else { //otherwise it's a start-tag
                    this.record_tag(tag_check); //push it on the tag stack
                    if (tag_check.toLowerCase() !== 'html') {
                        this.indent_content = true;
                    }
                    this.tag_type = 'START';
                }

                // Allow preserving of newlines after a start or end tag
                if (this.traverse_whitespace()) {
                    this.space_or_wrap(content);
                }

                if (this.Utils.in_array(tag_check, this.Utils.extra_liners)) { //check if this double needs an extra line
                    this.print_newline(false, this.output);
                    if (this.output.length && this.output[this.output.length - 2] !== '\n') {
                        this.print_newline(true, this.output);
                    }
                }
            }

            if (peek) {
                this.pos = orig_pos;
                this.line_char_count = orig_line_char_count;
            }

            return content.join(''); //returns fully formatted tag
        };

        this.get_comment = function(start_pos) { //function to return comment content in its entirety
            // this is will have very poor perf, but will work for now.
            var comment = '',
                delimiter = '>',
                matched = false;

            this.pos = start_pos;
            var input_char = this.input.charAt(this.pos);
            this.pos++;

            while (this.pos <= this.input.length) {
                comment += input_char;

                // only need to check for the delimiter if the last chars match
                if (comment.charAt(comment.length - 1) === delimiter.charAt(delimiter.length - 1) &&
                    comment.indexOf(delimiter) !== -1) {
                    break;
                }

                // only need to search for custom delimiter for the first few characters
                if (!matched && comment.length < 10) {
                    if (comment.indexOf('<![if') === 0) { //peek for <![if conditional comment
                        delimiter = '<![endif]>';
                        matched = true;
                    } else if (comment.indexOf('<![cdata[') === 0) { //if it's a <[cdata[ comment...
                        delimiter = ']]>';
                        matched = true;
                    } else if (comment.indexOf('<![') === 0) { // some other ![ comment? ...
                        delimiter = ']>';
                        matched = true;
                    } else if (comment.indexOf('<!--') === 0) { // <!-- comment ...
                        delimiter = '-->';
                        matched = true;
                    } else if (comment.indexOf('{{!--') === 0) { // {{!-- handlebars comment
                        delimiter = '--}}';
                        matched = true;
                    } else if (comment.indexOf('{{!') === 0) { // {{! handlebars comment
                        if (comment.length === 5 && comment.indexOf('{{!--') === -1) {
                            delimiter = '}}';
                            matched = true;
                        }
                    } else if (comment.indexOf('<?') === 0) { // {{! handlebars comment
                        delimiter = '?>';
                        matched = true;
                    } else if (comment.indexOf('<%') === 0) { // {{! handlebars comment
                        delimiter = '%>';
                        matched = true;
                    }
                }

                input_char = this.input.charAt(this.pos);
                this.pos++;
            }

            return comment;
        };

        function tokenMatcher(delimiter) {
            var token = '';

            var add = function(str) {
                var newToken = token + str.toLowerCase();
                token = newToken.length <= delimiter.length ? newToken : newToken.substr(newToken.length - delimiter.length, delimiter.length);
            };

            var doesNotMatch = function() {
                return token.indexOf(delimiter) === -1;
            };

            return {
                add: add,
                doesNotMatch: doesNotMatch
            };
        }

        this.get_unformatted = function(delimiter, orig_tag) { //function to return unformatted content in its entirety
            if (orig_tag && orig_tag.toLowerCase().indexOf(delimiter) !== -1) {
                return '';
            }
            var input_char = '';
            var content = '';
            var space = true;

            var delimiterMatcher = tokenMatcher(delimiter);

            do {

                if (this.pos >= this.input.length) {
                    return content;
                }

                input_char = this.input.charAt(this.pos);
                this.pos++;

                if (this.Utils.in_array(input_char, this.Utils.whitespace)) {
                    if (!space) {
                        this.line_char_count--;
                        continue;
                    }
                    if (input_char === '\n' || input_char === '\r') {
                        content += '\n';
                        /*  Don't change tab indention for unformatted blocks.  If using code for html editing, this will greatly affect <pre> tags if they are specified in the 'unformatted array'
            for (var i=0; i<this.indent_level; i++) {
              content += this.indent_string;
            }
            space = false; //...and make sure other indentation is erased
            */
                        this.line_char_count = 0;
                        continue;
                    }
                }
                content += input_char;
                delimiterMatcher.add(input_char);
                this.line_char_count++;
                space = true;

                if (indent_handlebars && input_char === '{' && content.length && content.charAt(content.length - 2) === '{') {
                    // Handlebars expressions in strings should also be unformatted.
                    content += this.get_unformatted('}}');
                    // Don't consider when stopping for delimiters.
                }
            } while (delimiterMatcher.doesNotMatch());

            return content;
        };

        this.get_token = function() { //initial handler for token-retrieval
            var token;

            if (this.last_token === 'TK_TAG_SCRIPT' || this.last_token === 'TK_TAG_STYLE') { //check if we need to format javascript
                var type = this.last_token.substr(7);
                token = this.get_contents_to(type);
                if (typeof token !== 'string') {
                    return token;
                }
                return [token, 'TK_' + type];
            }
            if (this.current_mode === 'CONTENT') {
                token = this.get_content();
                if (typeof token !== 'string') {
                    return token;
                } else {
                    return [token, 'TK_CONTENT'];
                }
            }

            if (this.current_mode === 'TAG') {
                token = this.get_tag();
                if (typeof token !== 'string') {
                    return token;
                } else {
                    var tag_name_type = 'TK_TAG_' + this.tag_type;
                    return [token, tag_name_type];
                }
            }
        };

        this.get_full_indent = function(level) {
            level = this.indent_level + level || 0;
            if (level < 1) {
                return '';
            }

            return Array(level + 1).join(this.indent_string);
        };

        this.is_unformatted = function(tag_check, unformatted) {
            //is this an HTML5 block-level link?
            if (!this.Utils.in_array(tag_check, unformatted)) {
                return false;
            }

            if (tag_check.toLowerCase() !== 'a' || !this.Utils.in_array('a', unformatted)) {
                return true;
            }

            //at this point we have an  tag; is its first child something we want to remain
            //unformatted?
            var next_tag = this.get_tag(true /* peek. */ );

            // test next_tag to see if it is just html tag (no external content)
            var tag = (next_tag || "").match(/^\s*<\s*\/?([a-z]*)\s*[^>]*>\s*$/);

            // if next_tag comes back but is not an isolated tag, then
            // let's treat the 'a' tag as having content
            // and respect the unformatted option
            if (!tag || this.Utils.in_array(tag[1], unformatted)) {
                return true;
            } else {
                return false;
            }
        };

        this.printer = function(js_source, indent_character, indent_size, wrap_line_length, brace_style) { //handles input/output and some other printing functions

            this.input = js_source || ''; //gets the input for the Parser

            // HACK: newline parsing inconsistent. This brute force normalizes the input.
            this.input = this.input.replace(/\r\n|[\r\u2028\u2029]/g, '\n');

            this.output = [];
            this.indent_character = indent_character;
            this.indent_string = '';
            this.indent_size = indent_size;
            this.brace_style = brace_style;
            this.indent_level = 0;
            this.wrap_line_length = wrap_line_length;
            this.line_char_count = 0; //count to see if wrap_line_length was exceeded

            for (var i = 0; i < this.indent_size; i++) {
                this.indent_string += this.indent_character;
            }

            this.print_newline = function(force, arr) {
                this.line_char_count = 0;
                if (!arr || !arr.length) {
                    return;
                }
                if (force || (arr[arr.length - 1] !== '\n')) { //we might want the extra line
                    if ((arr[arr.length - 1] !== '\n')) {
                        arr[arr.length - 1] = rtrim(arr[arr.length - 1]);
                    }
                    arr.push('\n');
                }
            };

            this.print_indentation = function(arr) {
                for (var i = 0; i < this.indent_level; i++) {
                    arr.push(this.indent_string);
                    this.line_char_count += this.indent_string.length;
                }
            };

            this.print_token = function(text) {
                // Avoid printing initial whitespace.
                if (this.is_whitespace(text) && !this.output.length) {
                    return;
                }
                if (text || text !== '') {
                    if (this.output.length && this.output[this.output.length - 1] === '\n') {
                        this.print_indentation(this.output);
                        text = ltrim(text);
                    }
                }
                this.print_token_raw(text);
            };

            this.print_token_raw = function(text) {
                // If we are going to print newlines, truncate trailing
                // whitespace, as the newlines will represent the space.
                if (this.newlines > 0) {
                    text = rtrim(text);
                }

                if (text && text !== '') {
                    if (text.length > 1 && text.charAt(text.length - 1) === '\n') {
                        // unformatted tags can grab newlines as their last character
                        this.output.push(text.slice(0, -1));
                        this.print_newline(false, this.output);
                    } else {
                        this.output.push(text);
                    }
                }

                for (var n = 0; n < this.newlines; n++) {
                    this.print_newline(n > 0, this.output);
                }
                this.newlines = 0;
            };

            this.indent = function() {
                this.indent_level++;
            };

            this.unindent = function() {
                if (this.indent_level > 0) {
                    this.indent_level--;
                }
            };
        };
        return this;
    }

    /*_____________________--------------------_____________________*/

    this.beautify = function() {
        multi_parser = new Parser(); //wrapping functions Parser
        multi_parser.printer(html_source, indent_character, indent_size, wrap_line_length, brace_style); //initialize starting values
        while (true) {
            var t = multi_parser.get_token();
            multi_parser.token_text = t[0];
            multi_parser.token_type = t[1];

            if (multi_parser.token_type === 'TK_EOF') {
                break;
            }

            switch (multi_parser.token_type) {
                case 'TK_TAG_START':
                    multi_parser.print_newline(false, multi_parser.output);
                    multi_parser.print_token(multi_parser.token_text);
                    if (multi_parser.indent_content) {
                        if ((multi_parser.indent_body_inner_html || !multi_parser.token_text.match(/<body(?:.*)>/)) &&
                            (multi_parser.indent_head_inner_html || !multi_parser.token_text.match(/<head(?:.*)>/))) {

                            multi_parser.indent();
                        }

                        multi_parser.indent_content = false;
                    }
                    multi_parser.current_mode = 'CONTENT';
                    break;
                case 'TK_TAG_STYLE':
                case 'TK_TAG_SCRIPT':
                    multi_parser.print_newline(false, multi_parser.output);
                    multi_parser.print_token(multi_parser.token_text);
                    multi_parser.current_mode = 'CONTENT';
                    break;
                case 'TK_TAG_END':
                    //Print new line only if the tag has no content and has child
                    if (multi_parser.last_token === 'TK_CONTENT' && multi_parser.last_text === '') {
                        var tag_name = (multi_parser.token_text.match(/\w+/) || [])[0];
                        var tag_extracted_from_last_output = null;
                        if (multi_parser.output.length) {
                            tag_extracted_from_last_output = multi_parser.output[multi_parser.output.length - 1].match(/(?:<|{{#)\s*(\w+)/);
                        }
                        if (tag_extracted_from_last_output === null ||
                            (tag_extracted_from_last_output[1] !== tag_name && !multi_parser.Utils.in_array(tag_extracted_from_last_output[1], unformatted))) {
                            multi_parser.print_newline(false, multi_parser.output);
                        }
                    }
                    multi_parser.print_token(multi_parser.token_text);
                    multi_parser.current_mode = 'CONTENT';
                    break;
                case 'TK_TAG_SINGLE':
                    // Don't add a newline before elements that should remain unformatted.
                    var tag_check = multi_parser.token_text.match(/^\s*<([a-z-]+)/i);
                    if (!tag_check || !multi_parser.Utils.in_array(tag_check[1], unformatted)) {
                        multi_parser.print_newline(false, multi_parser.output);
                    }
                    multi_parser.print_token(multi_parser.token_text);
                    multi_parser.current_mode = 'CONTENT';
                    break;
                case 'TK_TAG_HANDLEBARS_ELSE':
                    // Don't add a newline if opening {{#if}} tag is on the current line
                    var foundIfOnCurrentLine = false;
                    for (var lastCheckedOutput = multi_parser.output.length - 1; lastCheckedOutput >= 0; lastCheckedOutput--) {
                        if (multi_parser.output[lastCheckedOutput] === '\n') {
                            break;
                        } else {
                            if (multi_parser.output[lastCheckedOutput].match(/{{#if/)) {
                                foundIfOnCurrentLine = true;
                                break;
                            }
                        }
                    }
                    if (!foundIfOnCurrentLine) {
                        multi_parser.print_newline(false, multi_parser.output);
                    }
                    multi_parser.print_token(multi_parser.token_text);
                    if (multi_parser.indent_content) {
                        multi_parser.indent();
                        multi_parser.indent_content = false;
                    }
                    multi_parser.current_mode = 'CONTENT';
                    break;
                case 'TK_TAG_HANDLEBARS_COMMENT':
                    multi_parser.print_token(multi_parser.token_text);
                    multi_parser.current_mode = 'TAG';
                    break;
                case 'TK_CONTENT':
                    multi_parser.print_token(multi_parser.token_text);
                    multi_parser.current_mode = 'TAG';
                    break;
                case 'TK_STYLE':
                case 'TK_SCRIPT':
                    if (multi_parser.token_text !== '') {
                        multi_parser.print_newline(false, multi_parser.output);
                        var text = multi_parser.token_text,
                            _beautifier,
                            script_indent_level = 1;
                        if (multi_parser.token_type === 'TK_SCRIPT') {
                            _beautifier = typeof js_beautify === 'function' && js_beautify;
                        } else if (multi_parser.token_type === 'TK_STYLE') {
                            _beautifier = typeof css_beautify === 'function' && css_beautify;
                        }

                        if (options.indent_scripts === "keep") {
                            script_indent_level = 0;
                        } else if (options.indent_scripts === "separate") {
                            script_indent_level = -multi_parser.indent_level;
                        }

                        var indentation = multi_parser.get_full_indent(script_indent_level);
                        if (_beautifier) {

                            // call the Beautifier if avaliable
                            var Child_options = function() {
                                this.eol = '\n';
                            };
                            Child_options.prototype = options;
                            var child_options = new Child_options();
                            text = _beautifier(text.replace(/^\s*/, indentation), child_options);
                        } else {
                            // simply indent the string otherwise
                            var white = text.match(/^\s*/)[0];
                            var _level = white.match(/[^\n\r]*$/)[0].split(multi_parser.indent_string).length - 1;
                            var reindent = multi_parser.get_full_indent(script_indent_level - _level);
                            text = text.replace(/^\s*/, indentation)
                                .replace(/\r\n|\r|\n/g, '\n' + reindent)
                                .replace(/\s+$/, '');
                        }
                        if (text) {
                            multi_parser.print_token_raw(text);
                            multi_parser.print_newline(true, multi_parser.output);
                        }
                    }
                    multi_parser.current_mode = 'TAG';
                    break;
                default:
                    // We should not be getting here but we don't want to drop input on the floor
                    // Just output the text and move on
                    if (multi_parser.token_text !== '') {
                        multi_parser.print_token(multi_parser.token_text);
                    }
                    break;
            }
            multi_parser.last_token = multi_parser.token_type;
            multi_parser.last_text = multi_parser.token_text;
        }
        var sweet_code = multi_parser.output.join('').replace(/[\r\n\t ]+$/, '');

        // establish end_with_newline
        if (end_with_newline) {
            sweet_code += '\n';
        }

        if (eol !== '\n') {
            sweet_code = sweet_code.replace(/[\n]/g, eol);
        }

        return sweet_code;
    };
}

module.exports.Beautifier = Beautifier;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

/* jshint curly: false */
// This section of code is taken from acorn.
//
// Acorn was written by Marijn Haverbeke and released under an MIT
// license. The Unicode regexps (for identifiers and whitespace) were
// taken from [Esprima](http://esprima.org) by Ariya Hidayat.
//
// Git repositories for Acorn are available at
//
//     http://marijnhaverbeke.nl/git/acorn
//     https://github.com/marijnh/acorn.git

// ## Character categories

// Big ugly regular expressions that match characters in the
// whitespace, identifier, and identifier-start categories. These
// are only applied when a character is found to actually have a
// code point above 128.

var nonASCIIwhitespace = /[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/; // jshint ignore:line
var nonASCIIidentifierStartChars = "\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc";
var nonASCIIidentifierChars = "\u0300-\u036f\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u0620-\u0649\u0672-\u06d3\u06e7-\u06e8\u06fb-\u06fc\u0730-\u074a\u0800-\u0814\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0840-\u0857\u08e4-\u08fe\u0900-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962-\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09d7\u09df-\u09e0\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2-\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b5f-\u0b60\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62-\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2-\u0ce3\u0ce6-\u0cef\u0d02\u0d03\u0d46-\u0d48\u0d57\u0d62-\u0d63\u0d66-\u0d6f\u0d82\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e34-\u0e3a\u0e40-\u0e45\u0e50-\u0e59\u0eb4-\u0eb9\u0ec8-\u0ecd\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f41-\u0f47\u0f71-\u0f84\u0f86-\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u1000-\u1029\u1040-\u1049\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u170e-\u1710\u1720-\u1730\u1740-\u1750\u1772\u1773\u1780-\u17b2\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u1920-\u192b\u1930-\u193b\u1951-\u196d\u19b0-\u19c0\u19c8-\u19c9\u19d0-\u19d9\u1a00-\u1a15\u1a20-\u1a53\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1b46-\u1b4b\u1b50-\u1b59\u1b6b-\u1b73\u1bb0-\u1bb9\u1be6-\u1bf3\u1c00-\u1c22\u1c40-\u1c49\u1c5b-\u1c7d\u1cd0-\u1cd2\u1d00-\u1dbe\u1e01-\u1f15\u200c\u200d\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2d81-\u2d96\u2de0-\u2dff\u3021-\u3028\u3099\u309a\ua640-\ua66d\ua674-\ua67d\ua69f\ua6f0-\ua6f1\ua7f8-\ua800\ua806\ua80b\ua823-\ua827\ua880-\ua881\ua8b4-\ua8c4\ua8d0-\ua8d9\ua8f3-\ua8f7\ua900-\ua909\ua926-\ua92d\ua930-\ua945\ua980-\ua983\ua9b3-\ua9c0\uaa00-\uaa27\uaa40-\uaa41\uaa4c-\uaa4d\uaa50-\uaa59\uaa7b\uaae0-\uaae9\uaaf2-\uaaf3\uabc0-\uabe1\uabec\uabed\uabf0-\uabf9\ufb20-\ufb28\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f";
var nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
var nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");

// Whether a single character denotes a newline.

exports.newline = /[\n\r\u2028\u2029]/;

// Matches a whole line break (where CRLF is considered a single
// line break). Used to count lines.

// in javascript, these two differ
// in python they are the same, different methods are called on them
exports.lineBreak = new RegExp('\r\n|' + exports.newline.source);
exports.allLineBreaks = new RegExp(exports.lineBreak.source, 'g');


// Test whether a given character code starts an identifier.

exports.isIdentifierStart = function(code) {
    // permit $ (36) and @ (64). @ is used in ES7 decorators.
    if (code < 65) return code === 36 || code === 64;
    // 65 through 91 are uppercase letters.
    if (code < 91) return true;
    // permit _ (95).
    if (code < 97) return code === 95;
    // 97 through 123 are lowercase letters.
    if (code < 123) return true;
    return code >= 0xaa && nonASCIIidentifierStart.test(String.fromCharCode(code));
};

// Test whether a given character is part of an identifier.

exports.isIdentifierChar = function(code) {
    if (code < 48) return code === 36;
    if (code < 58) return true;
    if (code < 65) return false;
    if (code < 91) return true;
    if (code < 97) return code === 95;
    if (code < 123) return true;
    return code >= 0xaa && nonASCIIidentifier.test(String.fromCharCode(code));
};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
/*

    The MIT License (MIT)

    Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

    Permission is hereby granted, free of charge, to any person
    obtaining a copy of this software and associated documentation files
    (the "Software"), to deal in the Software without restriction,
    including without limitation the rights to use, copy, modify, merge,
    publish, distribute, sublicense, and/or sell copies of the Software,
    and to permit persons to whom the Software is furnished to do so,
    subject to the following conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
    BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
    ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
    CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/

function mergeOpts(allOptions, targetType) {
    var finalOpts = {};
    var name;

    for (name in allOptions) {
        if (name !== targetType) {
            finalOpts[name] = allOptions[name];
        }
    }

    //merge in the per type settings for the targetType
    if (targetType in allOptions) {
        for (name in allOptions[targetType]) {
            finalOpts[name] = allOptions[targetType][name];
        }
    }
    return finalOpts;
}

module.exports.mergeOpts = mergeOpts;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
/*

    The MIT License (MIT)

    Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

    Permission is hereby granted, free of charge, to any person
    obtaining a copy of this software and associated documentation files
    (the "Software"), to deal in the Software without restriction,
    including without limitation the rights to use, copy, modify, merge,
    publish, distribute, sublicense, and/or sell copies of the Software,
    and to permit persons to whom the Software is furnished to do so,
    subject to the following conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
    BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
    ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
    CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/

var Beautifier = __webpack_require__(0).Beautifier;

function style_html(html_source, options, js_beautify, css_beautify) {
    var beautifier = new Beautifier(html_source, options, js_beautify, css_beautify);
    return beautifier.beautify();
}

module.exports = style_html;

/***/ })
/******/ ]);
var style_html = legacy_beautify_html;
/* Footer */
if (typeof define === "function" && define.amd) {
    // Add support for AMD ( https://github.com/amdjs/amdjs-api/wiki/AMD#defineamd-property- )
    define(["require", "./beautify", "./beautify-css"], function(requireamd) {
        var js_beautify = requireamd("./beautify");
        var css_beautify = requireamd("./beautify-css");

        return {
            html_beautify: function(html_source, options) {
                return style_html(html_source, options, js_beautify.js_beautify, css_beautify.css_beautify);
            }
        };
    });
} else if (typeof exports !== "undefined") {
    // Add support for CommonJS. Just put this file somewhere on your require.paths
    // and you will be able to `var html_beautify = require("beautify").html_beautify`.
    var js_beautify = require('./beautify.js');
    var css_beautify = require('./beautify-css.js');

    exports.html_beautify = function(html_source, options) {
        return style_html(html_source, options, js_beautify.js_beautify, css_beautify.css_beautify);
    };
} else if (typeof window !== "undefined") {
    // If we're running a web page and don't have either of the above, add our one global
    window.html_beautify = function(html_source, options) {
        return style_html(html_source, options, window.js_beautify, window.css_beautify);
    };
} else if (typeof global !== "undefined") {
    // If we don't even have window, try global.
    global.html_beautify = function(html_source, options) {
        return style_html(html_source, options, global.js_beautify, global.css_beautify);
    };
}

}());

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./beautify-css.js":52,"./beautify.js":54}],54:[function(require,module,exports){
(function (global){
/*jshint curly:false, eqeqeq:true, laxbreak:true, noempty:false */
/* AUTO-GENERATED. DO NOT MODIFY. */
/* see js/src/javascript/index.js */
/*

  The MIT License (MIT)

  Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.

 JS Beautifier
---------------


  Written by Einar Lielmanis, <einar@jsbeautifier.org>
      http://jsbeautifier.org/

  Originally converted to javascript by Vital, <vital76@gmail.com>
  "End braces on own line" added by Chris J. Shull, <chrisjshull@gmail.com>
  Parsing improvements for brace-less statements by Liam Newman <bitwiseman@gmail.com>


  Usage:
    js_beautify(js_source_text);
    js_beautify(js_source_text, options);

  The options are:
    indent_size (default 4)          - indentation size,
    indent_char (default space)      - character to indent with,
    preserve_newlines (default true) - whether existing line breaks should be preserved,
    max_preserve_newlines (default unlimited) - maximum number of line breaks to be preserved in one chunk,

    jslint_happy (default false) - if true, then jslint-stricter mode is enforced.

            jslint_happy        !jslint_happy
            ---------------------------------
            function ()         function()

            switch () {         switch() {
            case 1:               case 1:
              break;                break;
            }                   }

    space_after_anon_function (default false) - should the space before an anonymous function's parens be added, "function()" vs "function ()",
          NOTE: This option is overriden by jslint_happy (i.e. if jslint_happy is true, space_after_anon_function is true by design)

    brace_style (default "collapse") - "collapse" | "expand" | "end-expand" | "none" | any of the former + ",preserve-inline"
            put braces on the same line as control statements (default), or put braces on own line (Allman / ANSI style), or just put end braces on own line, or attempt to keep them where they are.
            preserve-inline will try to preserve inline blocks of curly braces

    space_before_conditional (default true) - should the space before conditional statement be added, "if(true)" vs "if (true)",

    unescape_strings (default false) - should printable characters in strings encoded in \xNN notation be unescaped, "example" vs "\x65\x78\x61\x6d\x70\x6c\x65"

    wrap_line_length (default unlimited) - lines should wrap at next opportunity after this number of characters.
          NOTE: This is not a hard limit. Lines will continue until a point where a newline would
                be preserved if it were present.

    end_with_newline (default false)  - end output with a newline


    e.g

    js_beautify(js_source_text, {
      'indent_size': 1,
      'indent_char': '\t'
    });

*/

(function() {
var legacy_beautify_js =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/* jshint curly: false */
// This section of code is taken from acorn.
//
// Acorn was written by Marijn Haverbeke and released under an MIT
// license. The Unicode regexps (for identifiers and whitespace) were
// taken from [Esprima](http://esprima.org) by Ariya Hidayat.
//
// Git repositories for Acorn are available at
//
//     http://marijnhaverbeke.nl/git/acorn
//     https://github.com/marijnh/acorn.git

// ## Character categories

// Big ugly regular expressions that match characters in the
// whitespace, identifier, and identifier-start categories. These
// are only applied when a character is found to actually have a
// code point above 128.

var nonASCIIwhitespace = /[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/; // jshint ignore:line
var nonASCIIidentifierStartChars = "\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc";
var nonASCIIidentifierChars = "\u0300-\u036f\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u0620-\u0649\u0672-\u06d3\u06e7-\u06e8\u06fb-\u06fc\u0730-\u074a\u0800-\u0814\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0840-\u0857\u08e4-\u08fe\u0900-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962-\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09d7\u09df-\u09e0\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2-\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b5f-\u0b60\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62-\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2-\u0ce3\u0ce6-\u0cef\u0d02\u0d03\u0d46-\u0d48\u0d57\u0d62-\u0d63\u0d66-\u0d6f\u0d82\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e34-\u0e3a\u0e40-\u0e45\u0e50-\u0e59\u0eb4-\u0eb9\u0ec8-\u0ecd\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f41-\u0f47\u0f71-\u0f84\u0f86-\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u1000-\u1029\u1040-\u1049\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u170e-\u1710\u1720-\u1730\u1740-\u1750\u1772\u1773\u1780-\u17b2\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u1920-\u192b\u1930-\u193b\u1951-\u196d\u19b0-\u19c0\u19c8-\u19c9\u19d0-\u19d9\u1a00-\u1a15\u1a20-\u1a53\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1b46-\u1b4b\u1b50-\u1b59\u1b6b-\u1b73\u1bb0-\u1bb9\u1be6-\u1bf3\u1c00-\u1c22\u1c40-\u1c49\u1c5b-\u1c7d\u1cd0-\u1cd2\u1d00-\u1dbe\u1e01-\u1f15\u200c\u200d\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2d81-\u2d96\u2de0-\u2dff\u3021-\u3028\u3099\u309a\ua640-\ua66d\ua674-\ua67d\ua69f\ua6f0-\ua6f1\ua7f8-\ua800\ua806\ua80b\ua823-\ua827\ua880-\ua881\ua8b4-\ua8c4\ua8d0-\ua8d9\ua8f3-\ua8f7\ua900-\ua909\ua926-\ua92d\ua930-\ua945\ua980-\ua983\ua9b3-\ua9c0\uaa00-\uaa27\uaa40-\uaa41\uaa4c-\uaa4d\uaa50-\uaa59\uaa7b\uaae0-\uaae9\uaaf2-\uaaf3\uabc0-\uabe1\uabec\uabed\uabf0-\uabf9\ufb20-\ufb28\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f";
var nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
var nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");

// Whether a single character denotes a newline.

exports.newline = /[\n\r\u2028\u2029]/;

// Matches a whole line break (where CRLF is considered a single
// line break). Used to count lines.

// in javascript, these two differ
// in python they are the same, different methods are called on them
exports.lineBreak = new RegExp('\r\n|' + exports.newline.source);
exports.allLineBreaks = new RegExp(exports.lineBreak.source, 'g');


// Test whether a given character code starts an identifier.

exports.isIdentifierStart = function(code) {
    // permit $ (36) and @ (64). @ is used in ES7 decorators.
    if (code < 65) return code === 36 || code === 64;
    // 65 through 91 are uppercase letters.
    if (code < 91) return true;
    // permit _ (95).
    if (code < 97) return code === 95;
    // 97 through 123 are lowercase letters.
    if (code < 123) return true;
    return code >= 0xaa && nonASCIIidentifierStart.test(String.fromCharCode(code));
};

// Test whether a given character is part of an identifier.

exports.isIdentifierChar = function(code) {
    if (code < 48) return code === 36;
    if (code < 58) return true;
    if (code < 65) return false;
    if (code < 91) return true;
    if (code < 97) return code === 95;
    if (code < 123) return true;
    return code >= 0xaa && nonASCIIidentifier.test(String.fromCharCode(code));
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
/*

    The MIT License (MIT)

    Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

    Permission is hereby granted, free of charge, to any person
    obtaining a copy of this software and associated documentation files
    (the "Software"), to deal in the Software without restriction,
    including without limitation the rights to use, copy, modify, merge,
    publish, distribute, sublicense, and/or sell copies of the Software,
    and to permit persons to whom the Software is furnished to do so,
    subject to the following conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
    BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
    ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
    CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/

var mergeOpts = __webpack_require__(3).mergeOpts;
var acorn = __webpack_require__(0);
var Output = __webpack_require__(4).Output;
var Tokenizer = __webpack_require__(7).Tokenizer;

function remove_redundant_indentation(output, frame) {
    // This implementation is effective but has some issues:
    //     - can cause line wrap to happen too soon due to indent removal
    //           after wrap points are calculated
    // These issues are minor compared to ugly indentation.

    if (frame.multiline_frame ||
        frame.mode === MODE.ForInitializer ||
        frame.mode === MODE.Conditional) {
        return;
    }

    // remove one indent from each line inside this section
    var start_index = frame.start_line_index;

    output.remove_indent(start_index);
}

function in_array(what, arr) {
    for (var i = 0; i < arr.length; i += 1) {
        if (arr[i] === what) {
            return true;
        }
    }
    return false;
}

function trim(s) {
    return s.replace(/^\s+|\s+$/g, '');
}

function ltrim(s) {
    return s.replace(/^\s+/g, '');
}

// function rtrim(s) {
//     return s.replace(/\s+$/g, '');
// }


function generateMapFromStrings(list) {
    var result = {};
    for (var x = 0; x < list.length; x++) {
        // make the mapped names underscored instead of dash
        result[list[x].replace(/-/g, '_')] = list[x];
    }
    return result;
}

function sanitizeOperatorPosition(opPosition) {
    opPosition = opPosition || OPERATOR_POSITION.before_newline;

    if (!in_array(opPosition, validPositionValues)) {
        throw new Error("Invalid Option Value: The option 'operator_position' must be one of the following values\n" +
            validPositionValues +
            "\nYou passed in: '" + opPosition + "'");
    }

    return opPosition;
}

var validPositionValues = ['before-newline', 'after-newline', 'preserve-newline'];

// Generate map from array
var OPERATOR_POSITION = generateMapFromStrings(validPositionValues);

var OPERATOR_POSITION_BEFORE_OR_PRESERVE = [OPERATOR_POSITION.before_newline, OPERATOR_POSITION.preserve_newline];

var MODE = {
    BlockStatement: 'BlockStatement', // 'BLOCK'
    Statement: 'Statement', // 'STATEMENT'
    ObjectLiteral: 'ObjectLiteral', // 'OBJECT',
    ArrayLiteral: 'ArrayLiteral', //'[EXPRESSION]',
    ForInitializer: 'ForInitializer', //'(FOR-EXPRESSION)',
    Conditional: 'Conditional', //'(COND-EXPRESSION)',
    Expression: 'Expression' //'(EXPRESSION)'
};

function Beautifier(js_source_text, options) {
    "use strict";
    var output;
    var tokens = [],
        token_pos;
    var tokenizer;
    var current_token;
    var last_type, last_last_text, indent_string;
    var flags, previous_flags, flag_store;
    var prefix;

    var handlers, opt;
    var baseIndentString = '';

    handlers = {
        'TK_START_EXPR': handle_start_expr,
        'TK_END_EXPR': handle_end_expr,
        'TK_START_BLOCK': handle_start_block,
        'TK_END_BLOCK': handle_end_block,
        'TK_WORD': handle_word,
        'TK_RESERVED': handle_word,
        'TK_SEMICOLON': handle_semicolon,
        'TK_STRING': handle_string,
        'TK_EQUALS': handle_equals,
        'TK_OPERATOR': handle_operator,
        'TK_COMMA': handle_comma,
        'TK_BLOCK_COMMENT': handle_block_comment,
        'TK_COMMENT': handle_comment,
        'TK_DOT': handle_dot,
        'TK_UNKNOWN': handle_unknown,
        'TK_EOF': handle_eof
    };

    function create_flags(flags_base, mode) {
        var next_indent_level = 0;
        if (flags_base) {
            next_indent_level = flags_base.indentation_level;
            if (!output.just_added_newline() &&
                flags_base.line_indent_level > next_indent_level) {
                next_indent_level = flags_base.line_indent_level;
            }
        }

        var next_flags = {
            mode: mode,
            parent: flags_base,
            last_text: flags_base ? flags_base.last_text : '', // last token text
            last_word: flags_base ? flags_base.last_word : '', // last 'TK_WORD' passed
            declaration_statement: false,
            declaration_assignment: false,
            multiline_frame: false,
            inline_frame: false,
            if_block: false,
            else_block: false,
            do_block: false,
            do_while: false,
            import_block: false,
            in_case_statement: false, // switch(..){ INSIDE HERE }
            in_case: false, // we're on the exact line with "case 0:"
            case_body: false, // the indented case-action block
            indentation_level: next_indent_level,
            line_indent_level: flags_base ? flags_base.line_indent_level : next_indent_level,
            start_line_index: output.get_line_number(),
            ternary_depth: 0
        };
        return next_flags;
    }

    // Some interpreters have unexpected results with foo = baz || bar;
    options = options ? options : {};

    // Allow the setting of language/file-type specific options
    // with inheritance of overall settings
    options = mergeOpts(options, 'js');

    opt = {};

    // compatibility, re
    if (options.brace_style === "expand-strict") { //graceful handling of deprecated option
        options.brace_style = "expand";
    } else if (options.brace_style === "collapse-preserve-inline") { //graceful handling of deprecated option
        options.brace_style = "collapse,preserve-inline";
    } else if (options.braces_on_own_line !== undefined) { //graceful handling of deprecated option
        options.brace_style = options.braces_on_own_line ? "expand" : "collapse";
    } else if (!options.brace_style) //Nothing exists to set it
    {
        options.brace_style = "collapse";
    }


    var brace_style_split = options.brace_style.split(/[^a-zA-Z0-9_\-]+/);
    opt.brace_style = brace_style_split[0];
    opt.brace_preserve_inline = brace_style_split[1] ? brace_style_split[1] : false;

    opt.indent_size = options.indent_size ? parseInt(options.indent_size, 10) : 4;
    opt.indent_char = options.indent_char ? options.indent_char : ' ';
    opt.eol = options.eol ? options.eol : 'auto';
    opt.preserve_newlines = (options.preserve_newlines === undefined) ? true : options.preserve_newlines;
    opt.unindent_chained_methods = (options.unindent_chained_methods === undefined) ? false : options.unindent_chained_methods;
    opt.break_chained_methods = (options.break_chained_methods === undefined) ? false : options.break_chained_methods;
    opt.max_preserve_newlines = (options.max_preserve_newlines === undefined) ? 0 : parseInt(options.max_preserve_newlines, 10);
    opt.space_in_paren = (options.space_in_paren === undefined) ? false : options.space_in_paren;
    opt.space_in_empty_paren = (options.space_in_empty_paren === undefined) ? false : options.space_in_empty_paren;
    opt.jslint_happy = (options.jslint_happy === undefined) ? false : options.jslint_happy;
    opt.space_after_anon_function = (options.space_after_anon_function === undefined) ? false : options.space_after_anon_function;
    opt.keep_array_indentation = (options.keep_array_indentation === undefined) ? false : options.keep_array_indentation;
    opt.space_before_conditional = (options.space_before_conditional === undefined) ? true : options.space_before_conditional;
    opt.unescape_strings = (options.unescape_strings === undefined) ? false : options.unescape_strings;
    opt.wrap_line_length = (options.wrap_line_length === undefined) ? 0 : parseInt(options.wrap_line_length, 10);
    opt.e4x = (options.e4x === undefined) ? false : options.e4x;
    opt.end_with_newline = (options.end_with_newline === undefined) ? false : options.end_with_newline;
    opt.comma_first = (options.comma_first === undefined) ? false : options.comma_first;
    opt.operator_position = sanitizeOperatorPosition(options.operator_position);

    // For testing of beautify ignore:start directive
    opt.test_output_raw = (options.test_output_raw === undefined) ? false : options.test_output_raw;

    // force opt.space_after_anon_function to true if opt.jslint_happy
    if (opt.jslint_happy) {
        opt.space_after_anon_function = true;
    }

    if (options.indent_with_tabs) {
        opt.indent_char = '\t';
        opt.indent_size = 1;
    }

    if (opt.eol === 'auto') {
        opt.eol = '\n';
        if (js_source_text && acorn.lineBreak.test(js_source_text || '')) {
            opt.eol = js_source_text.match(acorn.lineBreak)[0];
        }
    }

    opt.eol = opt.eol.replace(/\\r/, '\r').replace(/\\n/, '\n');

    //----------------------------------
    indent_string = '';
    while (opt.indent_size > 0) {
        indent_string += opt.indent_char;
        opt.indent_size -= 1;
    }

    var preindent_index = 0;
    if (js_source_text && js_source_text.length) {
        while ((js_source_text.charAt(preindent_index) === ' ' ||
                js_source_text.charAt(preindent_index) === '\t')) {
            preindent_index += 1;
        }
        baseIndentString = js_source_text.substring(0, preindent_index);
        js_source_text = js_source_text.substring(preindent_index);
    }

    last_type = 'TK_START_BLOCK'; // last token type
    last_last_text = ''; // pre-last token text
    output = new Output(indent_string, baseIndentString);

    // If testing the ignore directive, start with output disable set to true
    output.raw = opt.test_output_raw;


    // Stack of parsing/formatting states, including MODE.
    // We tokenize, parse, and output in an almost purely a forward-only stream of token input
    // and formatted output.  This makes the beautifier less accurate than full parsers
    // but also far more tolerant of syntax errors.
    //
    // For example, the default mode is MODE.BlockStatement. If we see a '{' we push a new frame of type
    // MODE.BlockStatement on the the stack, even though it could be object literal.  If we later
    // encounter a ":", we'll switch to to MODE.ObjectLiteral.  If we then see a ";",
    // most full parsers would die, but the beautifier gracefully falls back to
    // MODE.BlockStatement and continues on.
    flag_store = [];
    set_mode(MODE.BlockStatement);

    this.beautify = function() {

        /*jshint onevar:true */
        var sweet_code;
        tokenizer = new Tokenizer(js_source_text, opt, indent_string);
        tokens = tokenizer.tokenize();
        token_pos = 0;

        current_token = get_token();
        while (current_token) {
            handlers[current_token.type]();

            last_last_text = flags.last_text;
            last_type = current_token.type;
            flags.last_text = current_token.text;

            token_pos += 1;
            current_token = get_token();
        }

        sweet_code = output.get_code(opt.end_with_newline, opt.eol);

        return sweet_code;
    };

    function handle_whitespace_and_comments(local_token, preserve_statement_flags) {
        var newlines = local_token.newlines;
        var keep_whitespace = opt.keep_array_indentation && is_array(flags.mode);
        var temp_token = current_token;

        for (var h = 0; h < local_token.comments_before.length; h++) {
            // The cleanest handling of inline comments is to treat them as though they aren't there.
            // Just continue formatting and the behavior should be logical.
            // Also ignore unknown tokens.  Again, this should result in better behavior.
            current_token = local_token.comments_before[h];
            handle_whitespace_and_comments(current_token, preserve_statement_flags);
            handlers[current_token.type](preserve_statement_flags);
        }
        current_token = temp_token;

        if (keep_whitespace) {
            for (var i = 0; i < newlines; i += 1) {
                print_newline(i > 0, preserve_statement_flags);
            }
        } else {
            if (opt.max_preserve_newlines && newlines > opt.max_preserve_newlines) {
                newlines = opt.max_preserve_newlines;
            }

            if (opt.preserve_newlines) {
                if (local_token.newlines > 1) {
                    print_newline(false, preserve_statement_flags);
                    for (var j = 1; j < newlines; j += 1) {
                        print_newline(true, preserve_statement_flags);
                    }
                }
            }
        }

    }

    // we could use just string.split, but
    // IE doesn't like returning empty strings
    function split_linebreaks(s) {
        //return s.split(/\x0d\x0a|\x0a/);

        s = s.replace(acorn.allLineBreaks, '\n');
        var out = [],
            idx = s.indexOf("\n");
        while (idx !== -1) {
            out.push(s.substring(0, idx));
            s = s.substring(idx + 1);
            idx = s.indexOf("\n");
        }
        if (s.length) {
            out.push(s);
        }
        return out;
    }

    var newline_restricted_tokens = ['break', 'continue', 'return', 'throw', 'yield'];

    function allow_wrap_or_preserved_newline(force_linewrap) {
        force_linewrap = (force_linewrap === undefined) ? false : force_linewrap;

        // Never wrap the first token on a line
        if (output.just_added_newline()) {
            return;
        }

        var shouldPreserveOrForce = (opt.preserve_newlines && current_token.wanted_newline) || force_linewrap;
        var operatorLogicApplies = in_array(flags.last_text, tokenizer.positionable_operators) || in_array(current_token.text, tokenizer.positionable_operators);

        if (operatorLogicApplies) {
            var shouldPrintOperatorNewline = (
                    in_array(flags.last_text, tokenizer.positionable_operators) &&
                    in_array(opt.operator_position, OPERATOR_POSITION_BEFORE_OR_PRESERVE)
                ) ||
                in_array(current_token.text, tokenizer.positionable_operators);
            shouldPreserveOrForce = shouldPreserveOrForce && shouldPrintOperatorNewline;
        }

        if (shouldPreserveOrForce) {
            print_newline(false, true);
        } else if (opt.wrap_line_length) {
            if (last_type === 'TK_RESERVED' && in_array(flags.last_text, newline_restricted_tokens)) {
                // These tokens should never have a newline inserted
                // between them and the following expression.
                return;
            }
            var proposed_line_length = output.current_line.get_character_count() + current_token.text.length +
                (output.space_before_token ? 1 : 0);
            if (proposed_line_length >= opt.wrap_line_length) {
                print_newline(false, true);
            }
        }
    }

    function print_newline(force_newline, preserve_statement_flags) {
        if (!preserve_statement_flags) {
            if (flags.last_text !== ';' && flags.last_text !== ',' && flags.last_text !== '=' && last_type !== 'TK_OPERATOR') {
                var next_token = get_token(1);
                while (flags.mode === MODE.Statement &&
                    !(flags.if_block && next_token && next_token.type === 'TK_RESERVED' && next_token.text === 'else') &&
                    !flags.do_block) {
                    restore_mode();
                }
            }
        }

        if (output.add_new_line(force_newline)) {
            flags.multiline_frame = true;
        }
    }

    function print_token_line_indentation() {
        if (output.just_added_newline()) {
            if (opt.keep_array_indentation && is_array(flags.mode) && current_token.wanted_newline) {
                output.current_line.push(current_token.whitespace_before);
                output.space_before_token = false;
            } else if (output.set_indent(flags.indentation_level)) {
                flags.line_indent_level = flags.indentation_level;
            }
        }
    }

    function print_token(printable_token) {
        if (output.raw) {
            output.add_raw_token(current_token);
            return;
        }

        if (opt.comma_first && last_type === 'TK_COMMA' &&
            output.just_added_newline()) {
            if (output.previous_line.last() === ',') {
                var popped = output.previous_line.pop();
                // if the comma was already at the start of the line,
                // pull back onto that line and reprint the indentation
                if (output.previous_line.is_empty()) {
                    output.previous_line.push(popped);
                    output.trim(true);
                    output.current_line.pop();
                    output.trim();
                }

                // add the comma in front of the next token
                print_token_line_indentation();
                output.add_token(',');
                output.space_before_token = true;
            }
        }

        printable_token = printable_token || current_token.text;
        print_token_line_indentation();
        output.add_token(printable_token);
    }

    function indent() {
        flags.indentation_level += 1;
    }

    function deindent() {
        if (flags.indentation_level > 0 &&
            ((!flags.parent) || flags.indentation_level > flags.parent.indentation_level)) {
            flags.indentation_level -= 1;

        }
    }

    function set_mode(mode) {
        if (flags) {
            flag_store.push(flags);
            previous_flags = flags;
        } else {
            previous_flags = create_flags(null, mode);
        }

        flags = create_flags(previous_flags, mode);
    }

    function is_array(mode) {
        return mode === MODE.ArrayLiteral;
    }

    function is_expression(mode) {
        return in_array(mode, [MODE.Expression, MODE.ForInitializer, MODE.Conditional]);
    }

    function restore_mode() {
        if (flag_store.length > 0) {
            previous_flags = flags;
            flags = flag_store.pop();
            if (previous_flags.mode === MODE.Statement && !opt.unindent_chained_methods) {
                remove_redundant_indentation(output, previous_flags);
            }
        }
    }

    function start_of_object_property() {
        return flags.parent.mode === MODE.ObjectLiteral && flags.mode === MODE.Statement && (
            (flags.last_text === ':' && flags.ternary_depth === 0) || (last_type === 'TK_RESERVED' && in_array(flags.last_text, ['get', 'set'])));
    }

    function start_of_statement() {
        if (
            (last_type === 'TK_RESERVED' && in_array(flags.last_text, ['var', 'let', 'const']) && current_token.type === 'TK_WORD') ||
            (last_type === 'TK_RESERVED' && flags.last_text === 'do') ||
            (last_type === 'TK_RESERVED' && in_array(flags.last_text, newline_restricted_tokens) && !current_token.wanted_newline) ||
            (last_type === 'TK_RESERVED' && flags.last_text === 'else' &&
                !(current_token.type === 'TK_RESERVED' && current_token.text === 'if' && !current_token.comments_before.length)) ||
            (last_type === 'TK_END_EXPR' && (previous_flags.mode === MODE.ForInitializer || previous_flags.mode === MODE.Conditional)) ||
            (last_type === 'TK_WORD' && flags.mode === MODE.BlockStatement &&
                !flags.in_case &&
                !(current_token.text === '--' || current_token.text === '++') &&
                last_last_text !== 'function' &&
                current_token.type !== 'TK_WORD' && current_token.type !== 'TK_RESERVED') ||
            (flags.mode === MODE.ObjectLiteral && (
                (flags.last_text === ':' && flags.ternary_depth === 0) || (last_type === 'TK_RESERVED' && in_array(flags.last_text, ['get', 'set']))))
        ) {

            set_mode(MODE.Statement);
            if (!opt.unindent_chained_methods) {
                indent();
            }

            handle_whitespace_and_comments(current_token, true);

            // Issue #276:
            // If starting a new statement with [if, for, while, do], push to a new line.
            // if (a) if (b) if(c) d(); else e(); else f();
            if (!start_of_object_property()) {
                allow_wrap_or_preserved_newline(
                    current_token.type === 'TK_RESERVED' && in_array(current_token.text, ['do', 'for', 'if', 'while']));
            }

            return true;
        }
        return false;
    }

    function all_lines_start_with(lines, c) {
        for (var i = 0; i < lines.length; i++) {
            var line = trim(lines[i]);
            if (line.charAt(0) !== c) {
                return false;
            }
        }
        return true;
    }

    function each_line_matches_indent(lines, indent) {
        var i = 0,
            len = lines.length,
            line;
        for (; i < len; i++) {
            line = lines[i];
            // allow empty lines to pass through
            if (line && line.indexOf(indent) !== 0) {
                return false;
            }
        }
        return true;
    }

    function is_special_word(word) {
        return in_array(word, ['case', 'return', 'do', 'if', 'throw', 'else']);
    }

    function get_token(offset) {
        var index = token_pos + (offset || 0);
        return (index < 0 || index >= tokens.length) ? null : tokens[index];
    }

    function handle_start_expr() {
        // The conditional starts the statement if appropriate.
        if (!start_of_statement()) {
            handle_whitespace_and_comments(current_token);
        }

        var next_mode = MODE.Expression;
        if (current_token.text === '[') {

            if (last_type === 'TK_WORD' || flags.last_text === ')') {
                // this is array index specifier, break immediately
                // a[x], fn()[x]
                if (last_type === 'TK_RESERVED' && in_array(flags.last_text, tokenizer.line_starters)) {
                    output.space_before_token = true;
                }
                set_mode(next_mode);
                print_token();
                indent();
                if (opt.space_in_paren) {
                    output.space_before_token = true;
                }
                return;
            }

            next_mode = MODE.ArrayLiteral;
            if (is_array(flags.mode)) {
                if (flags.last_text === '[' ||
                    (flags.last_text === ',' && (last_last_text === ']' || last_last_text === '}'))) {
                    // ], [ goes to new line
                    // }, [ goes to new line
                    if (!opt.keep_array_indentation) {
                        print_newline();
                    }
                }
            }

        } else {
            if (last_type === 'TK_RESERVED' && flags.last_text === 'for') {
                next_mode = MODE.ForInitializer;
            } else if (last_type === 'TK_RESERVED' && in_array(flags.last_text, ['if', 'while'])) {
                next_mode = MODE.Conditional;
            } else {
                // next_mode = MODE.Expression;
            }
        }

        if (flags.last_text === ';' || last_type === 'TK_START_BLOCK') {
            print_newline();
        } else if (last_type === 'TK_END_EXPR' || last_type === 'TK_START_EXPR' || last_type === 'TK_END_BLOCK' || flags.last_text === '.') {
            // TODO: Consider whether forcing this is required.  Review failing tests when removed.
            allow_wrap_or_preserved_newline(current_token.wanted_newline);
            // do nothing on (( and )( and ][ and ]( and .(
        } else if (!(last_type === 'TK_RESERVED' && current_token.text === '(') && last_type !== 'TK_WORD' && last_type !== 'TK_OPERATOR') {
            output.space_before_token = true;
        } else if ((last_type === 'TK_RESERVED' && (flags.last_word === 'function' || flags.last_word === 'typeof')) ||
            (flags.last_text === '*' &&
                (in_array(last_last_text, ['function', 'yield']) ||
                    (flags.mode === MODE.ObjectLiteral && in_array(last_last_text, ['{', ',']))))) {
            // function() vs function ()
            // yield*() vs yield* ()
            // function*() vs function* ()
            if (opt.space_after_anon_function) {
                output.space_before_token = true;
            }
        } else if (last_type === 'TK_RESERVED' && (in_array(flags.last_text, tokenizer.line_starters) || flags.last_text === 'catch')) {
            if (opt.space_before_conditional) {
                output.space_before_token = true;
            }
        }

        // Should be a space between await and an IIFE, or async and an arrow function
        if (current_token.text === '(' && last_type === 'TK_RESERVED' && in_array(flags.last_word, ['await', 'async'])) {
            output.space_before_token = true;
        }

        // Support of this kind of newline preservation.
        // a = (b &&
        //     (c || d));
        if (current_token.text === '(') {
            if (last_type === 'TK_EQUALS' || last_type === 'TK_OPERATOR') {
                if (!start_of_object_property()) {
                    allow_wrap_or_preserved_newline();
                }
            }
        }

        // Support preserving wrapped arrow function expressions
        // a.b('c',
        //     () => d.e
        // )
        if (current_token.text === '(' && last_type !== 'TK_WORD' && last_type !== 'TK_RESERVED') {
            allow_wrap_or_preserved_newline();
        }

        set_mode(next_mode);
        print_token();
        if (opt.space_in_paren) {
            output.space_before_token = true;
        }

        // In all cases, if we newline while inside an expression it should be indented.
        indent();
    }

    function handle_end_expr() {
        // statements inside expressions are not valid syntax, but...
        // statements must all be closed when their container closes
        while (flags.mode === MODE.Statement) {
            restore_mode();
        }

        handle_whitespace_and_comments(current_token);

        if (flags.multiline_frame) {
            allow_wrap_or_preserved_newline(current_token.text === ']' && is_array(flags.mode) && !opt.keep_array_indentation);
        }

        if (opt.space_in_paren) {
            if (last_type === 'TK_START_EXPR' && !opt.space_in_empty_paren) {
                // () [] no inner space in empty parens like these, ever, ref #320
                output.trim();
                output.space_before_token = false;
            } else {
                output.space_before_token = true;
            }
        }
        if (current_token.text === ']' && opt.keep_array_indentation) {
            print_token();
            restore_mode();
        } else {
            restore_mode();
            print_token();
        }
        remove_redundant_indentation(output, previous_flags);

        // do {} while () // no statement required after
        if (flags.do_while && previous_flags.mode === MODE.Conditional) {
            previous_flags.mode = MODE.Expression;
            flags.do_block = false;
            flags.do_while = false;

        }
    }

    function handle_start_block() {
        handle_whitespace_and_comments(current_token);

        // Check if this is should be treated as a ObjectLiteral
        var next_token = get_token(1);
        var second_token = get_token(2);
        if (second_token && (
                (in_array(second_token.text, [':', ',']) && in_array(next_token.type, ['TK_STRING', 'TK_WORD', 'TK_RESERVED'])) ||
                (in_array(next_token.text, ['get', 'set', '...']) && in_array(second_token.type, ['TK_WORD', 'TK_RESERVED']))
            )) {
            // We don't support TypeScript,but we didn't break it for a very long time.
            // We'll try to keep not breaking it.
            if (!in_array(last_last_text, ['class', 'interface'])) {
                set_mode(MODE.ObjectLiteral);
            } else {
                set_mode(MODE.BlockStatement);
            }
        } else if (last_type === 'TK_OPERATOR' && flags.last_text === '=>') {
            // arrow function: (param1, paramN) => { statements }
            set_mode(MODE.BlockStatement);
        } else if (in_array(last_type, ['TK_EQUALS', 'TK_START_EXPR', 'TK_COMMA', 'TK_OPERATOR']) ||
            (last_type === 'TK_RESERVED' && in_array(flags.last_text, ['return', 'throw', 'import', 'default']))
        ) {
            // Detecting shorthand function syntax is difficult by scanning forward,
            //     so check the surrounding context.
            // If the block is being returned, imported, export default, passed as arg,
            //     assigned with = or assigned in a nested object, treat as an ObjectLiteral.
            set_mode(MODE.ObjectLiteral);
        } else {
            set_mode(MODE.BlockStatement);
        }

        var empty_braces = !next_token.comments_before.length && next_token.text === '}';
        var empty_anonymous_function = empty_braces && flags.last_word === 'function' &&
            last_type === 'TK_END_EXPR';

        if (opt.brace_preserve_inline) // check for inline, set inline_frame if so
        {
            // search forward for a newline wanted inside this block
            var index = 0;
            var check_token = null;
            flags.inline_frame = true;
            do {
                index += 1;
                check_token = get_token(index);
                if (check_token.wanted_newline) {
                    flags.inline_frame = false;
                    break;
                }
            } while (check_token.type !== 'TK_EOF' &&
                !(check_token.type === 'TK_END_BLOCK' && check_token.opened === current_token));
        }

        if ((opt.brace_style === "expand" ||
                (opt.brace_style === "none" && current_token.wanted_newline)) &&
            !flags.inline_frame) {
            if (last_type !== 'TK_OPERATOR' &&
                (empty_anonymous_function ||
                    last_type === 'TK_EQUALS' ||
                    (last_type === 'TK_RESERVED' && is_special_word(flags.last_text) && flags.last_text !== 'else'))) {
                output.space_before_token = true;
            } else {
                print_newline(false, true);
            }
        } else { // collapse || inline_frame
            if (is_array(previous_flags.mode) && (last_type === 'TK_START_EXPR' || last_type === 'TK_COMMA')) {
                if (last_type === 'TK_COMMA' || opt.space_in_paren) {
                    output.space_before_token = true;
                }

                if (last_type === 'TK_COMMA' || (last_type === 'TK_START_EXPR' && flags.inline_frame)) {
                    allow_wrap_or_preserved_newline();
                    previous_flags.multiline_frame = previous_flags.multiline_frame || flags.multiline_frame;
                    flags.multiline_frame = false;
                }
            }
            if (last_type !== 'TK_OPERATOR' && last_type !== 'TK_START_EXPR') {
                if (last_type === 'TK_START_BLOCK' && !flags.inline_frame) {
                    print_newline();
                } else {
                    output.space_before_token = true;
                }
            }
        }
        print_token();
        indent();
    }

    function handle_end_block() {
        // statements must all be closed when their container closes
        handle_whitespace_and_comments(current_token);

        while (flags.mode === MODE.Statement) {
            restore_mode();
        }

        var empty_braces = last_type === 'TK_START_BLOCK';

        if (flags.inline_frame && !empty_braces) { // try inline_frame (only set if opt.braces-preserve-inline) first
            output.space_before_token = true;
        } else if (opt.brace_style === "expand") {
            if (!empty_braces) {
                print_newline();
            }
        } else {
            // skip {}
            if (!empty_braces) {
                if (is_array(flags.mode) && opt.keep_array_indentation) {
                    // we REALLY need a newline here, but newliner would skip that
                    opt.keep_array_indentation = false;
                    print_newline();
                    opt.keep_array_indentation = true;

                } else {
                    print_newline();
                }
            }
        }
        restore_mode();
        print_token();
    }

    function handle_word() {
        if (current_token.type === 'TK_RESERVED') {
            if (in_array(current_token.text, ['set', 'get']) && flags.mode !== MODE.ObjectLiteral) {
                current_token.type = 'TK_WORD';
            } else if (in_array(current_token.text, ['as', 'from']) && !flags.import_block) {
                current_token.type = 'TK_WORD';
            } else if (flags.mode === MODE.ObjectLiteral) {
                var next_token = get_token(1);
                if (next_token.text === ':') {
                    current_token.type = 'TK_WORD';
                }
            }
        }

        if (start_of_statement()) {
            // The conditional starts the statement if appropriate.
            if (last_type === 'TK_RESERVED' && in_array(flags.last_text, ['var', 'let', 'const']) && current_token.type === 'TK_WORD') {
                flags.declaration_statement = true;
            }
        } else if (current_token.wanted_newline && !is_expression(flags.mode) &&
            (last_type !== 'TK_OPERATOR' || (flags.last_text === '--' || flags.last_text === '++')) &&
            last_type !== 'TK_EQUALS' &&
            (opt.preserve_newlines || !(last_type === 'TK_RESERVED' && in_array(flags.last_text, ['var', 'let', 'const', 'set', 'get'])))) {
            handle_whitespace_and_comments(current_token);
            print_newline();
        } else {
            handle_whitespace_and_comments(current_token);
        }

        if (flags.do_block && !flags.do_while) {
            if (current_token.type === 'TK_RESERVED' && current_token.text === 'while') {
                // do {} ## while ()
                output.space_before_token = true;
                print_token();
                output.space_before_token = true;
                flags.do_while = true;
                return;
            } else {
                // do {} should always have while as the next word.
                // if we don't see the expected while, recover
                print_newline();
                flags.do_block = false;
            }
        }

        // if may be followed by else, or not
        // Bare/inline ifs are tricky
        // Need to unwind the modes correctly: if (a) if (b) c(); else d(); else e();
        if (flags.if_block) {
            if (!flags.else_block && (current_token.type === 'TK_RESERVED' && current_token.text === 'else')) {
                flags.else_block = true;
            } else {
                while (flags.mode === MODE.Statement) {
                    restore_mode();
                }
                flags.if_block = false;
                flags.else_block = false;
            }
        }

        if (current_token.type === 'TK_RESERVED' && (current_token.text === 'case' || (current_token.text === 'default' && flags.in_case_statement))) {
            print_newline();
            if (flags.case_body || opt.jslint_happy) {
                // switch cases following one another
                deindent();
                flags.case_body = false;
            }
            print_token();
            flags.in_case = true;
            flags.in_case_statement = true;
            return;
        }

        if (last_type === 'TK_COMMA' || last_type === 'TK_START_EXPR' || last_type === 'TK_EQUALS' || last_type === 'TK_OPERATOR') {
            if (!start_of_object_property()) {
                allow_wrap_or_preserved_newline();
            }
        }

        if (current_token.type === 'TK_RESERVED' && current_token.text === 'function') {
            if (in_array(flags.last_text, ['}', ';']) ||
                (output.just_added_newline() && !(in_array(flags.last_text, ['(', '[', '{', ':', '=', ',']) || last_type === 'TK_OPERATOR'))) {
                // make sure there is a nice clean space of at least one blank line
                // before a new function definition
                if (!output.just_added_blankline() && !current_token.comments_before.length) {
                    print_newline();
                    print_newline(true);
                }
            }
            if (last_type === 'TK_RESERVED' || last_type === 'TK_WORD') {
                if (last_type === 'TK_RESERVED' && (
                        in_array(flags.last_text, ['get', 'set', 'new', 'export', 'async']) ||
                        in_array(flags.last_text, newline_restricted_tokens))) {
                    output.space_before_token = true;
                } else if (last_type === 'TK_RESERVED' && flags.last_text === 'default' && last_last_text === 'export') {
                    output.space_before_token = true;
                } else {
                    print_newline();
                }
            } else if (last_type === 'TK_OPERATOR' || flags.last_text === '=') {
                // foo = function
                output.space_before_token = true;
            } else if (!flags.multiline_frame && (is_expression(flags.mode) || is_array(flags.mode))) {
                // (function
            } else {
                print_newline();
            }

            print_token();
            flags.last_word = current_token.text;
            return;
        }

        prefix = 'NONE';

        if (last_type === 'TK_END_BLOCK') {

            if (previous_flags.inline_frame) {
                prefix = 'SPACE';
            } else if (!(current_token.type === 'TK_RESERVED' && in_array(current_token.text, ['else', 'catch', 'finally', 'from']))) {
                prefix = 'NEWLINE';
            } else {
                if (opt.brace_style === "expand" ||
                    opt.brace_style === "end-expand" ||
                    (opt.brace_style === "none" && current_token.wanted_newline)) {
                    prefix = 'NEWLINE';
                } else {
                    prefix = 'SPACE';
                    output.space_before_token = true;
                }
            }
        } else if (last_type === 'TK_SEMICOLON' && flags.mode === MODE.BlockStatement) {
            // TODO: Should this be for STATEMENT as well?
            prefix = 'NEWLINE';
        } else if (last_type === 'TK_SEMICOLON' && is_expression(flags.mode)) {
            prefix = 'SPACE';
        } else if (last_type === 'TK_STRING') {
            prefix = 'NEWLINE';
        } else if (last_type === 'TK_RESERVED' || last_type === 'TK_WORD' ||
            (flags.last_text === '*' &&
                (in_array(last_last_text, ['function', 'yield']) ||
                    (flags.mode === MODE.ObjectLiteral && in_array(last_last_text, ['{', ',']))))) {
            prefix = 'SPACE';
        } else if (last_type === 'TK_START_BLOCK') {
            if (flags.inline_frame) {
                prefix = 'SPACE';
            } else {
                prefix = 'NEWLINE';
            }
        } else if (last_type === 'TK_END_EXPR') {
            output.space_before_token = true;
            prefix = 'NEWLINE';
        }

        if (current_token.type === 'TK_RESERVED' && in_array(current_token.text, tokenizer.line_starters) && flags.last_text !== ')') {
            if (flags.inline_frame || flags.last_text === 'else' || flags.last_text === 'export') {
                prefix = 'SPACE';
            } else {
                prefix = 'NEWLINE';
            }

        }

        if (current_token.type === 'TK_RESERVED' && in_array(current_token.text, ['else', 'catch', 'finally'])) {
            if ((!(last_type === 'TK_END_BLOCK' && previous_flags.mode === MODE.BlockStatement) ||
                    opt.brace_style === "expand" ||
                    opt.brace_style === "end-expand" ||
                    (opt.brace_style === "none" && current_token.wanted_newline)) &&
                !flags.inline_frame) {
                print_newline();
            } else {
                output.trim(true);
                var line = output.current_line;
                // If we trimmed and there's something other than a close block before us
                // put a newline back in.  Handles '} // comment' scenario.
                if (line.last() !== '}') {
                    print_newline();
                }
                output.space_before_token = true;
            }
        } else if (prefix === 'NEWLINE') {
            if (last_type === 'TK_RESERVED' && is_special_word(flags.last_text)) {
                // no newline between 'return nnn'
                output.space_before_token = true;
            } else if (last_type !== 'TK_END_EXPR') {
                if ((last_type !== 'TK_START_EXPR' || !(current_token.type === 'TK_RESERVED' && in_array(current_token.text, ['var', 'let', 'const']))) && flags.last_text !== ':') {
                    // no need to force newline on 'var': for (var x = 0...)
                    if (current_token.type === 'TK_RESERVED' && current_token.text === 'if' && flags.last_text === 'else') {
                        // no newline for } else if {
                        output.space_before_token = true;
                    } else {
                        print_newline();
                    }
                }
            } else if (current_token.type === 'TK_RESERVED' && in_array(current_token.text, tokenizer.line_starters) && flags.last_text !== ')') {
                print_newline();
            }
        } else if (flags.multiline_frame && is_array(flags.mode) && flags.last_text === ',' && last_last_text === '}') {
            print_newline(); // }, in lists get a newline treatment
        } else if (prefix === 'SPACE') {
            output.space_before_token = true;
        }
        print_token();
        flags.last_word = current_token.text;

        if (current_token.type === 'TK_RESERVED') {
            if (current_token.text === 'do') {
                flags.do_block = true;
            } else if (current_token.text === 'if') {
                flags.if_block = true;
            } else if (current_token.text === 'import') {
                flags.import_block = true;
            } else if (flags.import_block && current_token.type === 'TK_RESERVED' && current_token.text === 'from') {
                flags.import_block = false;
            }
        }
    }

    function handle_semicolon() {
        if (start_of_statement()) {
            // The conditional starts the statement if appropriate.
            // Semicolon can be the start (and end) of a statement
            output.space_before_token = false;
        } else {
            handle_whitespace_and_comments(current_token);
        }

        var next_token = get_token(1);
        while (flags.mode === MODE.Statement &&
            !(flags.if_block && next_token && next_token.type === 'TK_RESERVED' && next_token.text === 'else') &&
            !flags.do_block) {
            restore_mode();
        }

        // hacky but effective for the moment
        if (flags.import_block) {
            flags.import_block = false;
        }
        print_token();
    }

    function handle_string() {
        if (start_of_statement()) {
            // The conditional starts the statement if appropriate.
            // One difference - strings want at least a space before
            output.space_before_token = true;
        } else {
            handle_whitespace_and_comments(current_token);
            if (last_type === 'TK_RESERVED' || last_type === 'TK_WORD' || flags.inline_frame) {
                output.space_before_token = true;
            } else if (last_type === 'TK_COMMA' || last_type === 'TK_START_EXPR' || last_type === 'TK_EQUALS' || last_type === 'TK_OPERATOR') {
                if (!start_of_object_property()) {
                    allow_wrap_or_preserved_newline();
                }
            } else {
                print_newline();
            }
        }
        print_token();
    }

    function handle_equals() {
        if (start_of_statement()) {
            // The conditional starts the statement if appropriate.
        } else {
            handle_whitespace_and_comments(current_token);
        }

        if (flags.declaration_statement) {
            // just got an '=' in a var-line, different formatting/line-breaking, etc will now be done
            flags.declaration_assignment = true;
        }
        output.space_before_token = true;
        print_token();
        output.space_before_token = true;
    }

    function handle_comma() {
        handle_whitespace_and_comments(current_token, true);

        print_token();
        output.space_before_token = true;
        if (flags.declaration_statement) {
            if (is_expression(flags.parent.mode)) {
                // do not break on comma, for(var a = 1, b = 2)
                flags.declaration_assignment = false;
            }

            if (flags.declaration_assignment) {
                flags.declaration_assignment = false;
                print_newline(false, true);
            } else if (opt.comma_first) {
                // for comma-first, we want to allow a newline before the comma
                // to turn into a newline after the comma, which we will fixup later
                allow_wrap_or_preserved_newline();
            }
        } else if (flags.mode === MODE.ObjectLiteral ||
            (flags.mode === MODE.Statement && flags.parent.mode === MODE.ObjectLiteral)) {
            if (flags.mode === MODE.Statement) {
                restore_mode();
            }

            if (!flags.inline_frame) {
                print_newline();
            }
        } else if (opt.comma_first) {
            // EXPR or DO_BLOCK
            // for comma-first, we want to allow a newline before the comma
            // to turn into a newline after the comma, which we will fixup later
            allow_wrap_or_preserved_newline();
        }
    }

    function handle_operator() {
        var isGeneratorAsterisk = current_token.text === '*' &&
            ((last_type === 'TK_RESERVED' && in_array(flags.last_text, ['function', 'yield'])) ||
                (in_array(last_type, ['TK_START_BLOCK', 'TK_COMMA', 'TK_END_BLOCK', 'TK_SEMICOLON']))
            );
        var isUnary = in_array(current_token.text, ['-', '+']) && (
            in_array(last_type, ['TK_START_BLOCK', 'TK_START_EXPR', 'TK_EQUALS', 'TK_OPERATOR']) ||
            in_array(flags.last_text, tokenizer.line_starters) ||
            flags.last_text === ','
        );

        if (start_of_statement()) {
            // The conditional starts the statement if appropriate.
        } else {
            var preserve_statement_flags = !isGeneratorAsterisk;
            handle_whitespace_and_comments(current_token, preserve_statement_flags);
        }

        if (last_type === 'TK_RESERVED' && is_special_word(flags.last_text)) {
            // "return" had a special handling in TK_WORD. Now we need to return the favor
            output.space_before_token = true;
            print_token();
            return;
        }

        // hack for actionscript's import .*;
        if (current_token.text === '*' && last_type === 'TK_DOT') {
            print_token();
            return;
        }

        if (current_token.text === '::') {
            // no spaces around exotic namespacing syntax operator
            print_token();
            return;
        }

        // Allow line wrapping between operators when operator_position is
        //   set to before or preserve
        if (last_type === 'TK_OPERATOR' && in_array(opt.operator_position, OPERATOR_POSITION_BEFORE_OR_PRESERVE)) {
            allow_wrap_or_preserved_newline();
        }

        if (current_token.text === ':' && flags.in_case) {
            flags.case_body = true;
            indent();
            print_token();
            print_newline();
            flags.in_case = false;
            return;
        }

        var space_before = true;
        var space_after = true;
        var in_ternary = false;
        if (current_token.text === ':') {
            if (flags.ternary_depth === 0) {
                // Colon is invalid javascript outside of ternary and object, but do our best to guess what was meant.
                space_before = false;
            } else {
                flags.ternary_depth -= 1;
                in_ternary = true;
            }
        } else if (current_token.text === '?') {
            flags.ternary_depth += 1;
        }

        // let's handle the operator_position option prior to any conflicting logic
        if (!isUnary && !isGeneratorAsterisk && opt.preserve_newlines && in_array(current_token.text, tokenizer.positionable_operators)) {
            var isColon = current_token.text === ':';
            var isTernaryColon = (isColon && in_ternary);
            var isOtherColon = (isColon && !in_ternary);

            switch (opt.operator_position) {
                case OPERATOR_POSITION.before_newline:
                    // if the current token is : and it's not a ternary statement then we set space_before to false
                    output.space_before_token = !isOtherColon;

                    print_token();

                    if (!isColon || isTernaryColon) {
                        allow_wrap_or_preserved_newline();
                    }

                    output.space_before_token = true;
                    return;

                case OPERATOR_POSITION.after_newline:
                    // if the current token is anything but colon, or (via deduction) it's a colon and in a ternary statement,
                    //   then print a newline.

                    output.space_before_token = true;

                    if (!isColon || isTernaryColon) {
                        if (get_token(1).wanted_newline) {
                            print_newline(false, true);
                        } else {
                            allow_wrap_or_preserved_newline();
                        }
                    } else {
                        output.space_before_token = false;
                    }

                    print_token();

                    output.space_before_token = true;
                    return;

                case OPERATOR_POSITION.preserve_newline:
                    if (!isOtherColon) {
                        allow_wrap_or_preserved_newline();
                    }

                    // if we just added a newline, or the current token is : and it's not a ternary statement,
                    //   then we set space_before to false
                    space_before = !(output.just_added_newline() || isOtherColon);

                    output.space_before_token = space_before;
                    print_token();
                    output.space_before_token = true;
                    return;
            }
        }

        if (isGeneratorAsterisk) {
            allow_wrap_or_preserved_newline();
            space_before = false;
            var next_token = get_token(1);
            space_after = next_token && in_array(next_token.type, ['TK_WORD', 'TK_RESERVED']);
        } else if (current_token.text === '...') {
            allow_wrap_or_preserved_newline();
            space_before = last_type === 'TK_START_BLOCK';
            space_after = false;
        } else if (in_array(current_token.text, ['--', '++', '!', '~']) || isUnary) {
            // unary operators (and binary +/- pretending to be unary) special cases

            space_before = false;
            space_after = false;

            // http://www.ecma-international.org/ecma-262/5.1/#sec-7.9.1
            // if there is a newline between -- or ++ and anything else we should preserve it.
            if (current_token.wanted_newline && (current_token.text === '--' || current_token.text === '++')) {
                print_newline(false, true);
            }

            if (flags.last_text === ';' && is_expression(flags.mode)) {
                // for (;; ++i)
                //        ^^^
                space_before = true;
            }

            if (last_type === 'TK_RESERVED') {
                space_before = true;
            } else if (last_type === 'TK_END_EXPR') {
                space_before = !(flags.last_text === ']' && (current_token.text === '--' || current_token.text === '++'));
            } else if (last_type === 'TK_OPERATOR') {
                // a++ + ++b;
                // a - -b
                space_before = in_array(current_token.text, ['--', '-', '++', '+']) && in_array(flags.last_text, ['--', '-', '++', '+']);
                // + and - are not unary when preceeded by -- or ++ operator
                // a-- + b
                // a * +b
                // a - -b
                if (in_array(current_token.text, ['+', '-']) && in_array(flags.last_text, ['--', '++'])) {
                    space_after = true;
                }
            }


            if (((flags.mode === MODE.BlockStatement && !flags.inline_frame) || flags.mode === MODE.Statement) &&
                (flags.last_text === '{' || flags.last_text === ';')) {
                // { foo; --i }
                // foo(); --bar;
                print_newline();
            }
        }

        output.space_before_token = output.space_before_token || space_before;
        print_token();
        output.space_before_token = space_after;
    }

    function handle_block_comment(preserve_statement_flags) {
        if (output.raw) {
            output.add_raw_token(current_token);
            if (current_token.directives && current_token.directives.preserve === 'end') {
                // If we're testing the raw output behavior, do not allow a directive to turn it off.
                output.raw = opt.test_output_raw;
            }
            return;
        }

        if (current_token.directives) {
            print_newline(false, preserve_statement_flags);
            print_token();
            if (current_token.directives.preserve === 'start') {
                output.raw = true;
            }
            print_newline(false, true);
            return;
        }

        // inline block
        if (!acorn.newline.test(current_token.text) && !current_token.wanted_newline) {
            output.space_before_token = true;
            print_token();
            output.space_before_token = true;
            return;
        }

        var lines = split_linebreaks(current_token.text);
        var j; // iterator for this case
        var javadoc = false;
        var starless = false;
        var lastIndent = current_token.whitespace_before;
        var lastIndentLength = lastIndent.length;

        // block comment starts with a new line
        print_newline(false, preserve_statement_flags);
        if (lines.length > 1) {
            javadoc = all_lines_start_with(lines.slice(1), '*');
            starless = each_line_matches_indent(lines.slice(1), lastIndent);
        }

        // first line always indented
        print_token(lines[0]);
        for (j = 1; j < lines.length; j++) {
            print_newline(false, true);
            if (javadoc) {
                // javadoc: reformat and re-indent
                print_token(' ' + ltrim(lines[j]));
            } else if (starless && lines[j].length > lastIndentLength) {
                // starless: re-indent non-empty content, avoiding trim
                print_token(lines[j].substring(lastIndentLength));
            } else {
                // normal comments output raw
                output.add_token(lines[j]);
            }
        }

        // for comments of more than one line, make sure there's a new line after
        print_newline(false, preserve_statement_flags);
    }

    function handle_comment(preserve_statement_flags) {
        if (current_token.wanted_newline) {
            print_newline(false, preserve_statement_flags);
        } else {
            output.trim(true);
        }

        output.space_before_token = true;
        print_token();
        print_newline(false, preserve_statement_flags);
    }

    function handle_dot() {
        if (start_of_statement()) {
            // The conditional starts the statement if appropriate.
        } else {
            handle_whitespace_and_comments(current_token, true);
        }

        if (last_type === 'TK_RESERVED' && is_special_word(flags.last_text)) {
            output.space_before_token = true;
        } else {
            // allow preserved newlines before dots in general
            // force newlines on dots after close paren when break_chained - for bar().baz()
            allow_wrap_or_preserved_newline(flags.last_text === ')' && opt.break_chained_methods);
        }

        print_token();
    }

    function handle_unknown(preserve_statement_flags) {
        print_token();

        if (current_token.text[current_token.text.length - 1] === '\n') {
            print_newline(false, preserve_statement_flags);
        }
    }

    function handle_eof() {
        // Unwind any open statements
        while (flags.mode === MODE.Statement) {
            restore_mode();
        }
        handle_whitespace_and_comments(current_token);
    }
}

module.exports.Beautifier = Beautifier;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
/*

  The MIT License (MIT)

  Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

function InputScanner(input) {
    var _input = input;
    var _input_length = _input.length;
    var _position = 0;

    this.back = function() {
        _position -= 1;
    };

    this.hasNext = function() {
        return _position < _input_length;
    };

    this.next = function() {
        var val = null;
        if (this.hasNext()) {
            val = _input.charAt(_position);
            _position += 1;
        }
        return val;
    };

    this.peek = function(index) {
        var val = null;
        index = index || 0;
        index += _position;
        if (index >= 0 && index < _input_length) {
            val = _input.charAt(index);
        }
        return val;
    };

    this.peekCharCode = function(index) {
        var val = 0;
        index = index || 0;
        index += _position;
        if (index >= 0 && index < _input_length) {
            val = _input.charCodeAt(index);
        }
        return val;
    };

    this.test = function(pattern, index) {
        index = index || 0;
        pattern.lastIndex = _position + index;
        return pattern.test(_input);
    };

    this.testChar = function(pattern, index) {
        var val = this.peek(index);
        return val !== null && pattern.test(val);
    };

    this.match = function(pattern) {
        pattern.lastIndex = _position;
        var pattern_match = pattern.exec(_input);
        if (pattern_match && pattern_match.index === _position) {
            _position += pattern_match[0].length;
        } else {
            pattern_match = null;
        }
        return pattern_match;
    };
}


module.exports.InputScanner = InputScanner;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
/*

    The MIT License (MIT)

    Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

    Permission is hereby granted, free of charge, to any person
    obtaining a copy of this software and associated documentation files
    (the "Software"), to deal in the Software without restriction,
    including without limitation the rights to use, copy, modify, merge,
    publish, distribute, sublicense, and/or sell copies of the Software,
    and to permit persons to whom the Software is furnished to do so,
    subject to the following conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
    BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
    ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
    CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/

function mergeOpts(allOptions, targetType) {
    var finalOpts = {};
    var name;

    for (name in allOptions) {
        if (name !== targetType) {
            finalOpts[name] = allOptions[name];
        }
    }

    //merge in the per type settings for the targetType
    if (targetType in allOptions) {
        for (name in allOptions[targetType]) {
            finalOpts[name] = allOptions[targetType][name];
        }
    }
    return finalOpts;
}

module.exports.mergeOpts = mergeOpts;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
/*

  The MIT License (MIT)

  Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

function OutputLine(parent) {
    var _character_count = 0;
    // use indent_count as a marker for lines that have preserved indentation
    var _indent_count = -1;

    var _items = [];
    var _empty = true;

    this.set_indent = function(level) {
        _character_count = parent.baseIndentLength + level * parent.indent_length;
        _indent_count = level;
    };

    this.get_character_count = function() {
        return _character_count;
    };

    this.is_empty = function() {
        return _empty;
    };

    this.last = function() {
        if (!this._empty) {
            return _items[_items.length - 1];
        } else {
            return null;
        }
    };

    this.push = function(input) {
        _items.push(input);
        _character_count += input.length;
        _empty = false;
    };

    this.pop = function() {
        var item = null;
        if (!_empty) {
            item = _items.pop();
            _character_count -= item.length;
            _empty = _items.length === 0;
        }
        return item;
    };

    this.remove_indent = function() {
        if (_indent_count > 0) {
            _indent_count -= 1;
            _character_count -= parent.indent_length;
        }
    };

    this.trim = function() {
        while (this.last() === ' ') {
            _items.pop();
            _character_count -= 1;
        }
        _empty = _items.length === 0;
    };

    this.toString = function() {
        var result = '';
        if (!this._empty) {
            if (_indent_count >= 0) {
                result = parent.indent_cache[_indent_count];
            }
            result += _items.join('');
        }
        return result;
    };
}

function Output(indent_string, baseIndentString) {
    baseIndentString = baseIndentString || '';
    this.indent_cache = [baseIndentString];
    this.baseIndentLength = baseIndentString.length;
    this.indent_length = indent_string.length;
    this.raw = false;

    var lines = [];
    this.baseIndentString = baseIndentString;
    this.indent_string = indent_string;
    this.previous_line = null;
    this.current_line = null;
    this.space_before_token = false;

    this.add_outputline = function() {
        this.previous_line = this.current_line;
        this.current_line = new OutputLine(this);
        lines.push(this.current_line);
    };

    // initialize
    this.add_outputline();


    this.get_line_number = function() {
        return lines.length;
    };

    // Using object instead of string to allow for later expansion of info about each line
    this.add_new_line = function(force_newline) {
        if (this.get_line_number() === 1 && this.just_added_newline()) {
            return false; // no newline on start of file
        }

        if (force_newline || !this.just_added_newline()) {
            if (!this.raw) {
                this.add_outputline();
            }
            return true;
        }

        return false;
    };

    this.get_code = function(end_with_newline, eol) {
        var sweet_code = lines.join('\n').replace(/[\r\n\t ]+$/, '');

        if (end_with_newline) {
            sweet_code += '\n';
        }

        if (eol !== '\n') {
            sweet_code = sweet_code.replace(/[\n]/g, eol);
        }

        return sweet_code;
    };

    this.set_indent = function(level) {
        // Never indent your first output indent at the start of the file
        if (lines.length > 1) {
            while (level >= this.indent_cache.length) {
                this.indent_cache.push(this.indent_cache[this.indent_cache.length - 1] + this.indent_string);
            }

            this.current_line.set_indent(level);
            return true;
        }
        this.current_line.set_indent(0);
        return false;
    };

    this.add_raw_token = function(token) {
        for (var x = 0; x < token.newlines; x++) {
            this.add_outputline();
        }
        this.current_line.push(token.whitespace_before);
        this.current_line.push(token.text);
        this.space_before_token = false;
    };

    this.add_token = function(printable_token) {
        this.add_space_before_token();
        this.current_line.push(printable_token);
    };

    this.add_space_before_token = function() {
        if (this.space_before_token && !this.just_added_newline()) {
            this.current_line.push(' ');
        }
        this.space_before_token = false;
    };

    this.remove_indent = function(index) {
        var output_length = lines.length;
        while (index < output_length) {
            lines[index].remove_indent();
            index++;
        }
    };

    this.trim = function(eat_newlines) {
        eat_newlines = (eat_newlines === undefined) ? false : eat_newlines;

        this.current_line.trim(indent_string, baseIndentString);

        while (eat_newlines && lines.length > 1 &&
            this.current_line.is_empty()) {
            lines.pop();
            this.current_line = lines[lines.length - 1];
            this.current_line.trim();
        }

        this.previous_line = lines.length > 1 ? lines[lines.length - 2] : null;
    };

    this.just_added_newline = function() {
        return this.current_line.is_empty();
    };

    this.just_added_blankline = function() {
        if (this.just_added_newline()) {
            if (lines.length === 1) {
                return true; // start of the file and newline = blank
            }

            var line = lines[lines.length - 2];
            return line.is_empty();
        }
        return false;
    };
}

module.exports.Output = Output;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
/*

  The MIT License (MIT)

  Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

function Token(type, text, newlines, whitespace_before, parent) {
    this.type = type;
    this.text = text;

    // comments_before are
    // comments that have a new line before them
    // and may or may not have a newline after
    // this is a set of comments before
    this.comments_before = /* inline comment*/ [];


    this.comments_after = []; // no new line before and newline after
    this.newlines = newlines || 0;
    this.wanted_newline = newlines > 0;
    this.whitespace_before = whitespace_before || '';
    this.parent = parent || null;
    this.opened = null;
    this.directives = null;
}

module.exports.Token = Token;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
/*

    The MIT License (MIT)

    Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

    Permission is hereby granted, free of charge, to any person
    obtaining a copy of this software and associated documentation files
    (the "Software"), to deal in the Software without restriction,
    including without limitation the rights to use, copy, modify, merge,
    publish, distribute, sublicense, and/or sell copies of the Software,
    and to permit persons to whom the Software is furnished to do so,
    subject to the following conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
    BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
    ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
    CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/

var Beautifier = __webpack_require__(1).Beautifier;

function js_beautify(js_source_text, options) {
    var beautifier = new Beautifier(js_source_text, options);
    return beautifier.beautify();
}

module.exports = js_beautify;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
/*

    The MIT License (MIT)

    Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

    Permission is hereby granted, free of charge, to any person
    obtaining a copy of this software and associated documentation files
    (the "Software"), to deal in the Software without restriction,
    including without limitation the rights to use, copy, modify, merge,
    publish, distribute, sublicense, and/or sell copies of the Software,
    and to permit persons to whom the Software is furnished to do so,
    subject to the following conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
    BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
    ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
    CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/

var InputScanner = __webpack_require__(2).InputScanner;
var Token = __webpack_require__(5).Token;
var acorn = __webpack_require__(0);

function trim(s) {
    return s.replace(/^\s+|\s+$/g, '');
}

function in_array(what, arr) {
    for (var i = 0; i < arr.length; i += 1) {
        if (arr[i] === what) {
            return true;
        }
    }
    return false;
}

function Tokenizer(input_string, opts) {

    var whitespace = "\n\r\t ".split('');
    var digit = /[0-9]/;
    var digit_bin = /[01]/;
    var digit_oct = /[01234567]/;
    var digit_hex = /[0123456789abcdefABCDEF]/;

    this.positionable_operators = '!= !== % & && * ** + - / : < << <= == === > >= >> >>> ? ^ | ||'.split(' ');
    var punct = this.positionable_operators.concat(
        // non-positionable operators - these do not follow operator position settings
        '! %= &= *= **= ++ += , -- -= /= :: <<= = => >>= >>>= ^= |= ~ ...'.split(' '));

    // words which should always start on new line.
    this.line_starters = 'continue,try,throw,return,var,let,const,if,switch,case,default,for,while,break,function,import,export'.split(',');
    var reserved_words = this.line_starters.concat(['do', 'in', 'of', 'else', 'get', 'set', 'new', 'catch', 'finally', 'typeof', 'yield', 'async', 'await', 'from', 'as']);

    //  /* ... */ comment ends with nearest */ or end of file
    var block_comment_pattern = /([\s\S]*?)((?:\*\/)|$)/g;

    // comment ends just before nearest linefeed or end of file
    var comment_pattern = /([^\n\r\u2028\u2029]*)/g;

    var directives_block_pattern = /\/\* beautify( \w+[:]\w+)+ \*\//g;
    var directive_pattern = / (\w+)[:](\w+)/g;
    var directives_end_ignore_pattern = /([\s\S]*?)((?:\/\*\sbeautify\signore:end\s\*\/)|$)/g;

    var template_pattern = /((<\?php|<\?=)[\s\S]*?\?>)|(<%[\s\S]*?%>)/g;

    var n_newlines, whitespace_before_token, in_html_comment, tokens;
    var input;

    this.tokenize = function() {
        input = new InputScanner(input_string);
        in_html_comment = false;
        tokens = [];

        var next, last;
        var token_values;
        var open = null;
        var open_stack = [];
        var comments = [];

        while (!(last && last.type === 'TK_EOF')) {
            token_values = tokenize_next();
            next = new Token(token_values[1], token_values[0], n_newlines, whitespace_before_token);
            while (next.type === 'TK_COMMENT' || next.type === 'TK_BLOCK_COMMENT' || next.type === 'TK_UNKNOWN') {
                if (next.type === 'TK_BLOCK_COMMENT') {
                    next.directives = token_values[2];
                }
                comments.push(next);
                token_values = tokenize_next();
                next = new Token(token_values[1], token_values[0], n_newlines, whitespace_before_token);
            }

            if (comments.length) {
                next.comments_before = comments;
                comments = [];
            }

            if (next.type === 'TK_START_BLOCK' || next.type === 'TK_START_EXPR') {
                next.parent = last;
                open_stack.push(open);
                open = next;
            } else if ((next.type === 'TK_END_BLOCK' || next.type === 'TK_END_EXPR') &&
                (open && (
                    (next.text === ']' && open.text === '[') ||
                    (next.text === ')' && open.text === '(') ||
                    (next.text === '}' && open.text === '{')))) {
                next.parent = open.parent;
                next.opened = open;

                open = open_stack.pop();
            }

            tokens.push(next);
            last = next;
        }

        return tokens;
    };

    function get_directives(text) {
        if (!text.match(directives_block_pattern)) {
            return null;
        }

        var directives = {};
        directive_pattern.lastIndex = 0;
        var directive_match = directive_pattern.exec(text);

        while (directive_match) {
            directives[directive_match[1]] = directive_match[2];
            directive_match = directive_pattern.exec(text);
        }

        return directives;
    }

    function tokenize_next() {
        var resulting_string;
        var whitespace_on_this_line = [];

        n_newlines = 0;
        whitespace_before_token = '';

        var c = input.next();

        if (c === null) {
            return ['', 'TK_EOF'];
        }

        var last_token;
        if (tokens.length) {
            last_token = tokens[tokens.length - 1];
        } else {
            // For the sake of tokenizing we can pretend that there was on open brace to start
            last_token = new Token('TK_START_BLOCK', '{');
        }

        while (in_array(c, whitespace)) {

            if (acorn.newline.test(c)) {
                if (!(c === '\n' && input.peek(-2) === '\r')) {
                    n_newlines += 1;
                    whitespace_on_this_line = [];
                }
            } else {
                whitespace_on_this_line.push(c);
            }

            c = input.next();

            if (c === null) {
                return ['', 'TK_EOF'];
            }
        }

        if (whitespace_on_this_line.length) {
            whitespace_before_token = whitespace_on_this_line.join('');
        }

        if (digit.test(c) || (c === '.' && input.testChar(digit))) {
            var allow_decimal = true;
            var allow_e = true;
            var local_digit = digit;

            if (c === '0' && input.testChar(/[XxOoBb]/)) {
                // switch to hex/oct/bin number, no decimal or e, just hex/oct/bin digits
                allow_decimal = false;
                allow_e = false;
                if (input.testChar(/[Bb]/)) {
                    local_digit = digit_bin;
                } else if (input.testChar(/[Oo]/)) {
                    local_digit = digit_oct;
                } else {
                    local_digit = digit_hex;
                }
                c += input.next();
            } else if (c === '.') {
                // Already have a decimal for this literal, don't allow another
                allow_decimal = false;
            } else {
                // we know this first loop will run.  It keeps the logic simpler.
                c = '';
                input.back();
            }

            // Add the digits
            while (input.testChar(local_digit)) {
                c += input.next();

                if (allow_decimal && input.peek() === '.') {
                    c += input.next();
                    allow_decimal = false;
                }

                // a = 1.e-7 is valid, so we test for . then e in one loop
                if (allow_e && input.testChar(/[Ee]/)) {
                    c += input.next();

                    if (input.testChar(/[+-]/)) {
                        c += input.next();
                    }

                    allow_e = false;
                    allow_decimal = false;
                }
            }

            return [c, 'TK_WORD'];
        }

        if (acorn.isIdentifierStart(input.peekCharCode(-1))) {
            if (input.hasNext()) {
                while (acorn.isIdentifierChar(input.peekCharCode())) {
                    c += input.next();
                    if (!input.hasNext()) {
                        break;
                    }
                }
            }

            if (!(last_token.type === 'TK_DOT' ||
                    (last_token.type === 'TK_RESERVED' && in_array(last_token.text, ['set', 'get']))) &&
                in_array(c, reserved_words)) {
                if (c === 'in' || c === 'of') { // hack for 'in' and 'of' operators
                    return [c, 'TK_OPERATOR'];
                }
                return [c, 'TK_RESERVED'];
            }

            return [c, 'TK_WORD'];
        }

        if (c === '(' || c === '[') {
            return [c, 'TK_START_EXPR'];
        }

        if (c === ')' || c === ']') {
            return [c, 'TK_END_EXPR'];
        }

        if (c === '{') {
            return [c, 'TK_START_BLOCK'];
        }

        if (c === '}') {
            return [c, 'TK_END_BLOCK'];
        }

        if (c === ';') {
            return [c, 'TK_SEMICOLON'];
        }

        if (c === '/') {
            var comment = '';
            var comment_match;
            // peek for comment /* ... */
            if (input.peek() === '*') {
                input.next();
                comment_match = input.match(block_comment_pattern);
                comment = '/*' + comment_match[0];
                var directives = get_directives(comment);
                if (directives && directives.ignore === 'start') {
                    comment_match = input.match(directives_end_ignore_pattern);
                    comment += comment_match[0];
                }
                comment = comment.replace(acorn.allLineBreaks, '\n');
                return [comment, 'TK_BLOCK_COMMENT', directives];
            }
            // peek for comment // ...
            if (input.peek() === '/') {
                input.next();
                comment_match = input.match(comment_pattern);
                comment = '//' + comment_match[0];
                return [comment, 'TK_COMMENT'];
            }

        }

        var startXmlRegExp = /<()([-a-zA-Z:0-9_.]+|{[\s\S]+?}|!\[CDATA\[[\s\S]*?\]\])(\s+{[\s\S]+?}|\s+[-a-zA-Z:0-9_.]+|\s+[-a-zA-Z:0-9_.]+\s*=\s*('[^']*'|"[^"]*"|{[\s\S]+?}))*\s*(\/?)\s*>/g;

        if (c === '`' || c === "'" || c === '"' || // string
            (
                (c === '/') || // regexp
                (opts.e4x && c === "<" && input.test(startXmlRegExp, -1)) // xml
            ) && ( // regex and xml can only appear in specific locations during parsing
                (last_token.type === 'TK_RESERVED' && in_array(last_token.text, ['return', 'case', 'throw', 'else', 'do', 'typeof', 'yield'])) ||
                (last_token.type === 'TK_END_EXPR' && last_token.text === ')' &&
                    last_token.parent && last_token.parent.type === 'TK_RESERVED' && in_array(last_token.parent.text, ['if', 'while', 'for'])) ||
                (in_array(last_token.type, ['TK_COMMENT', 'TK_START_EXPR', 'TK_START_BLOCK',
                    'TK_END_BLOCK', 'TK_OPERATOR', 'TK_EQUALS', 'TK_EOF', 'TK_SEMICOLON', 'TK_COMMA'
                ]))
            )) {

            var sep = c,
                esc = false,
                has_char_escapes = false;

            resulting_string = c;

            if (sep === '/') {
                //
                // handle regexp
                //
                var in_char_class = false;
                while (input.hasNext() &&
                    ((esc || in_char_class || input.peek() !== sep) &&
                        !input.testChar(acorn.newline))) {
                    resulting_string += input.peek();
                    if (!esc) {
                        esc = input.peek() === '\\';
                        if (input.peek() === '[') {
                            in_char_class = true;
                        } else if (input.peek() === ']') {
                            in_char_class = false;
                        }
                    } else {
                        esc = false;
                    }
                    input.next();
                }
            } else if (opts.e4x && sep === '<') {
                //
                // handle e4x xml literals
                //

                var xmlRegExp = /[\s\S]*?<(\/?)([-a-zA-Z:0-9_.]+|{[\s\S]+?}|!\[CDATA\[[\s\S]*?\]\])(\s+{[\s\S]+?}|\s+[-a-zA-Z:0-9_.]+|\s+[-a-zA-Z:0-9_.]+\s*=\s*('[^']*'|"[^"]*"|{[\s\S]+?}))*\s*(\/?)\s*>/g;
                input.back();
                var xmlStr = '';
                var match = input.match(startXmlRegExp);
                if (match) {
                    // Trim root tag to attempt to
                    var rootTag = match[2].replace(/^{\s+/, '{').replace(/\s+}$/, '}');
                    var isCurlyRoot = rootTag.indexOf('{') === 0;
                    var depth = 0;
                    while (match) {
                        var isEndTag = !!match[1];
                        var tagName = match[2];
                        var isSingletonTag = (!!match[match.length - 1]) || (tagName.slice(0, 8) === "![CDATA[");
                        if (!isSingletonTag &&
                            (tagName === rootTag || (isCurlyRoot && tagName.replace(/^{\s+/, '{').replace(/\s+}$/, '}')))) {
                            if (isEndTag) {
                                --depth;
                            } else {
                                ++depth;
                            }
                        }
                        xmlStr += match[0];
                        if (depth <= 0) {
                            break;
                        }
                        match = input.match(xmlRegExp);
                    }
                    // if we didn't close correctly, keep unformatted.
                    if (!match) {
                        xmlStr += input.match(/[\s\S]*/g)[0];
                    }
                    xmlStr = xmlStr.replace(acorn.allLineBreaks, '\n');
                    return [xmlStr, "TK_STRING"];
                }
            } else {
                //
                // handle string
                //
                var parse_string = function(delimiter, allow_unescaped_newlines, start_sub) {
                    // Template strings can travers lines without escape characters.
                    // Other strings cannot
                    var current_char;
                    while (input.hasNext()) {
                        current_char = input.peek();
                        if (!(esc || (current_char !== delimiter &&
                                (allow_unescaped_newlines || !acorn.newline.test(current_char))))) {
                            break;
                        }

                        // Handle \r\n linebreaks after escapes or in template strings
                        if ((esc || allow_unescaped_newlines) && acorn.newline.test(current_char)) {
                            if (current_char === '\r' && input.peek(1) === '\n') {
                                input.next();
                                current_char = input.peek();
                            }
                            resulting_string += '\n';
                        } else {
                            resulting_string += current_char;
                        }

                        if (esc) {
                            if (current_char === 'x' || current_char === 'u') {
                                has_char_escapes = true;
                            }
                            esc = false;
                        } else {
                            esc = current_char === '\\';
                        }

                        input.next();

                        if (start_sub && resulting_string.indexOf(start_sub, resulting_string.length - start_sub.length) !== -1) {
                            if (delimiter === '`') {
                                parse_string('}', allow_unescaped_newlines, '`');
                            } else {
                                parse_string('`', allow_unescaped_newlines, '${');
                            }

                            if (input.hasNext()) {
                                resulting_string += input.next();
                            }
                        }
                    }
                };

                if (sep === '`') {
                    parse_string('`', true, '${');
                } else {
                    parse_string(sep);
                }
            }

            if (has_char_escapes && opts.unescape_strings) {
                resulting_string = unescape_string(resulting_string);
            }

            if (input.peek() === sep) {
                resulting_string += sep;
                input.next();

                if (sep === '/') {
                    // regexps may have modifiers /regexp/MOD , so fetch those, too
                    // Only [gim] are valid, but if the user puts in garbage, do what we can to take it.
                    while (input.hasNext() && acorn.isIdentifierStart(input.peekCharCode())) {
                        resulting_string += input.next();
                    }
                }
            }
            return [resulting_string, 'TK_STRING'];
        }

        if (c === '#') {

            if (tokens.length === 0 && input.peek() === '!') {
                // shebang
                resulting_string = c;
                while (input.hasNext() && c !== '\n') {
                    c = input.next();
                    resulting_string += c;
                }
                return [trim(resulting_string) + '\n', 'TK_UNKNOWN'];
            }



            // Spidermonkey-specific sharp variables for circular references
            // https://developer.mozilla.org/En/Sharp_variables_in_JavaScript
            // http://mxr.mozilla.org/mozilla-central/source/js/src/jsscan.cpp around line 1935
            var sharp = '#';
            if (input.hasNext() && input.testChar(digit)) {
                do {
                    c = input.next();
                    sharp += c;
                } while (input.hasNext() && c !== '#' && c !== '=');
                if (c === '#') {
                    //
                } else if (input.peek() === '[' && input.peek(1) === ']') {
                    sharp += '[]';
                    input.next();
                    input.next();
                } else if (input.peek() === '{' && input.peek(1) === '}') {
                    sharp += '{}';
                    input.next();
                    input.next();
                }
                return [sharp, 'TK_WORD'];
            }
        }

        if (c === '<' && (input.peek() === '?' || input.peek() === '%')) {
            input.back();
            var template_match = input.match(template_pattern);
            if (template_match) {
                c = template_match[0];
                c = c.replace(acorn.allLineBreaks, '\n');
                return [c, 'TK_STRING'];
            }
        }

        if (c === '<' && input.match(/\!--/g)) {
            c = '<!--';
            while (input.hasNext() && !input.testChar(acorn.newline)) {
                c += input.next();
            }
            in_html_comment = true;
            return [c, 'TK_COMMENT'];
        }

        if (c === '-' && in_html_comment && input.match(/->/g)) {
            in_html_comment = false;
            return ['-->', 'TK_COMMENT'];
        }

        if (c === '.') {
            if (input.peek() === '.' && input.peek(1) === '.') {
                c += input.next() + input.next();
                return [c, 'TK_OPERATOR'];
            }
            return [c, 'TK_DOT'];
        }

        if (in_array(c, punct)) {
            while (input.hasNext() && in_array(c + input.peek(), punct)) {
                c += input.next();
                if (!input.hasNext()) {
                    break;
                }
            }

            if (c === ',') {
                return [c, 'TK_COMMA'];
            } else if (c === '=') {
                return [c, 'TK_EQUALS'];
            } else {
                return [c, 'TK_OPERATOR'];
            }
        }

        return [c, 'TK_UNKNOWN'];
    }


    function unescape_string(s) {
        // You think that a regex would work for this
        // return s.replace(/\\x([0-9a-f]{2})/gi, function(match, val) {
        //         return String.fromCharCode(parseInt(val, 16));
        //     })
        // However, dealing with '\xff', '\\xff', '\\\xff' makes this more fun.
        var out = '',
            escaped = 0;

        var input_scan = new InputScanner(s);
        var matched = null;

        while (input_scan.hasNext()) {
            // Keep any whitespace, non-slash characters
            // also keep slash pairs.
            matched = input_scan.match(/([\s]|[^\\]|\\\\)+/g);

            if (matched) {
                out += matched[0];
            }

            if (input_scan.peek() === '\\') {
                input_scan.next();
                if (input_scan.peek() === 'x') {
                    matched = input_scan.match(/x([0-9A-Fa-f]{2})/g);
                } else if (input_scan.peek() === 'u') {
                    matched = input_scan.match(/u([0-9A-Fa-f]{4})/g);
                } else {
                    out += '\\';
                    if (input_scan.hasNext()) {
                        out += input_scan.next();
                    }
                    continue;
                }

                // If there's some error decoding, return the original string
                if (!matched) {
                    return s;
                }

                escaped = parseInt(matched[1], 16);

                if (escaped > 0x7e && escaped <= 0xff && matched[0].indexOf('x') === 0) {
                    // we bail out on \x7f..\xff,
                    // leaving whole string escaped,
                    // as it's probably completely binary
                    return s;
                } else if (escaped >= 0x00 && escaped < 0x20) {
                    // leave 0x00...0x1f escaped
                    out += '\\' + matched[0];
                    continue;
                } else if (escaped === 0x22 || escaped === 0x27 || escaped === 0x5c) {
                    // single-quote, apostrophe, backslash - escape these
                    out += '\\' + String.fromCharCode(escaped);
                } else {
                    out += String.fromCharCode(escaped);
                }
            }
        }

        return out;
    }
}

module.exports.Tokenizer = Tokenizer;

/***/ })
/******/ ]);
var js_beautify = legacy_beautify_js;
/* Footer */
if (typeof define === "function" && define.amd) {
    // Add support for AMD ( https://github.com/amdjs/amdjs-api/wiki/AMD#defineamd-property- )
    define([], function() {
        return { js_beautify: js_beautify };
    });
} else if (typeof exports !== "undefined") {
    // Add support for CommonJS. Just put this file somewhere on your require.paths
    // and you will be able to `var js_beautify = require("beautify").js_beautify`.
    exports.js_beautify = js_beautify;
} else if (typeof window !== "undefined") {
    // If we're running a web page and don't have either of the above, add our one global
    window.js_beautify = js_beautify;
} else if (typeof global !== "undefined") {
    // If we don't even have window, try global.
    global.js_beautify = js_beautify;
}

}());

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],55:[function(require,module,exports){
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