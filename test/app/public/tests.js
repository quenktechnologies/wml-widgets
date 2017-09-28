(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
 * Container is an abstract class implementing widgets
 * that hold content as their primary purpose such
 * as a DrawerLayout or an object form 'grid'.
 */
var Container = /** @class */ (function (_super) {
    __extends(Container, _super);
    function Container() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * setContent changes the content value.
     */
    Container.prototype.setContent = function (content) {
        var root = this.view.findById('root');
        var parent = root.parentNode;
        if (!root)
            throw new Error(this.constructor.name + "#setContent:" +
                "Cannot set content of a widget " +
                "that has no root in it's template!");
        if (!parent)
            throw new Error(this.constructor.name + "#setContent:" +
                "Cannot set content of a widget with no parent!");
        this.content = content;
        parent.replaceChild(this.render(), root);
        return this;
    };
    /**
     * removeContent removes existing content.
     */
    Container.prototype.removeContent = function () {
        this.content = null;
        return this;
    };
    return Container;
}(wml_runtime_1.Component));
exports.Container = Container;

},{"@quenk/wml-runtime":5}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HIDDEN = '-hidden';
exports.DISABLED = '-disabled';
exports.ON = '-on';
exports.OFF = '-off';
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
exports.DRAWER_LAYOUT = 'ww-drawer-layout';
exports.DRAWER = 'ww-drawer';
exports.DRAWER_CONTENT = 'ww-drawer__content';
exports.DRAWER_PUSHABLE = '-drawer-pushable';
exports.DRAWER_PUSHABLE_FIXED = '-drawer-pushable-fixed';
exports.ACTION_AREA = 'ww-action-area';
exports.ACTION_AREA_CONTENT = 'ww-action-area__content';
exports.MAIN_VIEW = 'ww-main-view';
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
exports.AUTOCOMPLETE = 'wat-kit-autocomplete';
exports.AUTOCOMPLETE_CONTAINER = 'wat-kit-autocomplete-container';
exports.AUTOCOMPLETE_INPUT_AREA = 'wat-kit-autocomplete-input-area';
exports.AUTOCOMPLETE_INPUT = 'wat-kit-autocomplete-input';
exports.AUTOCOMPLETE_OPTIONS = 'wat-kit-autocomplete-options';
exports.AUTOCOMPLETE_ITEM_WRAPPER = 'wat-kit-auto-complete-item-wrapper';

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util = require("./util");
exports.util = util;
var Styles = require("./Styles");
exports.Styles = Styles;
var Container_1 = require("./Container");
exports.Container = Container_1.Container;

},{"./Container":1,"./Styles":2,"./util":4}],4:[function(require,module,exports){
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
 * noop
 */
exports.noop = function () { };
/**
 * read a value from the context attributes
 */
exports.read = function () {
    var _ = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        _[_i] = arguments[_i];
    }
    return this.attributes.read.apply(this.attributes, arguments);
};
/**
 * replaceContent
 */
exports.replaceContent = function (r, node) {
    while (node.lastChild)
        node.removeChild(node.lastChild);
    node.appendChild(r.render());
};

},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var property_seek_1 = require("property-seek");
;
var Component = (function () {
    function Component(attributes, children) {
        this.attributes = attributes;
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
 * Attributes provides an API for reading the
 * attributes supplied to an Element.
 */
var Attributes = (function () {
    function Attributes(attrs) {
        this.attrs = attrs;
    }
    Attributes.prototype.has = function (path) {
        return this.read(path, null) != null;
    };
    /**
     * read a value form the internal list.
     * @param {string} path
     * @param {*} defaultValue - This value is returned if the value is not set.
     */
    Attributes.prototype.read = function (path, defaultValue) {
        var ret = property_seek_1.default(path.split(':').join('.'), this.attrs);
        return (ret != null) ? ret : (defaultValue != null) ? defaultValue : '';
    };
    return Attributes;
}());
exports.Attributes = Attributes;
var adopt = function (child, e) {
    // if (child instanceof Array)
    // return child.forEach(innerChild => adopt(innerChild, e));
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
exports.box = function () {
    var content = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        content[_i] = arguments[_i];
    }
    var frag = document.createDocumentFragment();
    content.forEach(function (c) { return frag.appendChild(c); });
    return frag;
};
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
var _empty = document.createDocumentFragment();
exports.empty = function () { return _empty; };
/**
 * text
 */
exports.text = function (value) {
    return document.createTextNode('' + value);
};
/**
 * resolve property access expression to avoid
 * thowing errors if it does not exist.
 */
exports.resolve = function (head, path) {
    if ((head == null) || head == '')
        return '';
    var ret = property_seek_1.default(path, head);
    return (ret == null) ? '' : ret;
};
/**
 * node is called to create a regular DOM node
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
 * widget creates a wml widget.
 * @param {function} Construtor
 * @param {object} attributes
 * @param {array<string|number|Widget>} children
 * @param {View} view
 * @return {Widget}
 */
exports.widget = function (Constructor, attributes, children, view) {
    var childs = [];
    var w;
    children.forEach(function (child) { return (child instanceof Array) ?
        childs.push.apply(childs, child) : childs.push(child); });
    w = new Constructor(new Attributes(attributes), childs);
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
 */
exports.ifE = function (predicate, positive, negative) {
    return (predicate) ? positive() : negative();
};
/**
 * forE provides a for expression
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
 */
exports.switchE = function (value, cases) {
    var result = cases[value];
    var defaul = cases['default'];
    if (result)
        return result;
    if (defaul)
        return defaul;
};
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
        return (this.ids[id]) ? this.ids[id] : null;
    };
    AppView.prototype.findGroupByName = function (name) {
        return (this.groups.hasOwnProperty(name)) ? this.groups[name] : [];
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
        this.tree = this.template.call(this.context);
        this.ids['root'] = (this.ids['root']) ? this.ids['root'] : this.tree;
        if (this.tree.nodeName === (document.createDocumentFragment()).nodeName)
            this._fragRoot = this.tree.firstChild;
        this.widgets.forEach(function (w) { return w.rendered(); });
        return this.tree;
    };
    return AppView;
}());
exports.AppView = AppView;

},{"property-seek":42}],6:[function(require,module,exports){
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
var common = require("wml-widgets-common");
var action_area_1 = require("./wml/action_area");
/**
 * ActionArea
 */
var ActionArea = /** @class */ (function (_super) {
    __extends(ActionArea, _super);
    function ActionArea() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new action_area_1.Main(_this);
        return _this;
    }
    return ActionArea;
}(common.Container));
exports.ActionArea = ActionArea;
exports.default = ActionArea;

},{"./wml/action_area":7,"wml-widgets-common":3}],7:[function(require,module,exports){
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
var Styles = require("wml-widgets-common/Styles");
var util_1 = require("wml-widgets-common/util");
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(context) {
        var _this = _super.call(this, context) || this;
        var view = _this;
        _this.template = function () {
            return wml_runtime_1.node('div', { html: { 'class': util_1.combine([Styles.ACTION_AREA, Styles.DRAWER_PUSHABLE_FIXED]) }, wml: {} }, [wml_runtime_1.node('div', { html: { 'class': Styles.ACTION_AREA_CONTENT }, wml: { 'id': "content" } }, [wml_runtime_1.domify(this.children)], view)], view);
        };
        return _this;
    }
    return Main;
}(wml_runtime_1.AppView));
exports.Main = Main;

},{"@quenk/wml-runtime":5,"wml-widgets-common/Styles":2,"wml-widgets-common/util":4}],8:[function(require,module,exports){
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
var layout = require("./wml/breadcrumbs");
;
/**
 * BreadCrumb
 */
var BreadCrumbs = /** @class */ (function (_super) {
    __extends(BreadCrumbs, _super);
    function BreadCrumbs() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new layout.BreadCrumbs(_this);
        return _this;
    }
    return BreadCrumbs;
}(wml_runtime_1.Component));
exports.BreadCrumbs = BreadCrumbs;
/**
 * Crumb
 */
var Crumb = /** @class */ (function (_super) {
    __extends(Crumb, _super);
    function Crumb() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new layout.Crumb(_this);
        return _this;
    }
    return Crumb;
}(wml_runtime_1.Component));
exports.Crumb = Crumb;

},{"./wml/breadcrumbs":9,"@quenk/wml-runtime":5}],9:[function(require,module,exports){
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
var util_1 = require("wml-widgets-common/util");
var Styles = require("wml-widgets-common/Styles");
var BreadCrumbs = /** @class */ (function (_super) {
    __extends(BreadCrumbs, _super);
    function BreadCrumbs(context) {
        var _this = _super.call(this, context) || this;
        var view = _this;
        _this.template = function () {
            return wml_runtime_1.node('ol', { html: { 'class': util_1.combine([Styles.BREAD_CRUMBS, this.attributes.read('ww:class')]) }, wml: {} }, [wml_runtime_1.domify(this.children)], view);
        };
        return _this;
    }
    return BreadCrumbs;
}(wml_runtime_1.AppView));
exports.BreadCrumbs = BreadCrumbs;
var Crumb = /** @class */ (function (_super) {
    __extends(Crumb, _super);
    function Crumb(context) {
        var _this = _super.call(this, context) || this;
        var view = _this;
        _this.template = function () {
            return wml_runtime_1.node('li', { html: { 'class': util_1.combine([Styles.BREAD_CRUMBS_CRUMB, this.attributes.read('ww:class')]) }, wml: {} }, [wml_runtime_1.node('a', { html: { 'class': this.attributes.read('ww:anchorClass', null), 'onClick': this.attributes.read('ww:onClick', null), 'href': this.attributes.read('ww:href') }, wml: {} }, [wml_runtime_1.domify(this.children)], view)], view);
        };
        return _this;
    }
    return Crumb;
}(wml_runtime_1.AppView));
exports.Crumb = Crumb;

},{"@quenk/wml-runtime":5,"wml-widgets-common/Styles":2,"wml-widgets-common/util":4}],10:[function(require,module,exports){
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
var busy_indicator_1 = require("./wml/busy_indicator");
/**
 * BusyIndicator provides a 'hamburger' menu button.
 */
var BusyIndicator = /** @class */ (function (_super) {
    __extends(BusyIndicator, _super);
    function BusyIndicator() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new busy_indicator_1.Main(_this);
        return _this;
    }
    return BusyIndicator;
}(wml_runtime_1.Component));
exports.BusyIndicator = BusyIndicator;
exports.default = BusyIndicator;

},{"./wml/busy_indicator":11,"@quenk/wml-runtime":5}],11:[function(require,module,exports){
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
        _this.template = function () {
            return wml_runtime_1.node('div', { html: { 'class': "loading" }, wml: {} }, [], view);
        };
        return _this;
    }
    return Main;
}(wml_runtime_1.AppView));
exports.Main = Main;

},{"@quenk/wml-runtime":5}],12:[function(require,module,exports){
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
var common = require("wml-widgets-common");
var views = require("./wml/button");
var Styles = require("wml-widgets-common/Styles");
/**
 * Group multiple buttons into one element.
 */
var Group = /** @class */ (function (_super) {
    __extends(Group, _super);
    function Group() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Group(_this);
        return _this;
    }
    Group.prototype.getClass = function () {
        var list = [Styles.BUTTON_GROUP];
        if (this.attributes.read('ww:class'))
            list.push(this.attributes.read('ww:class'));
        if (this.attributes.read('ww:spaced'))
            list.push(Styles.SPACED);
        return list.join(' ');
    };
    return Group;
}(common.Container));
exports.Group = Group;
;
/**
 * Button is an improvement over HTMLButtionElement
 */
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Button(_this);
        return _this;
    }
    /**
     * disable this button.
     */
    Button.prototype.disable = function () {
        this.view.findById('button').setAttribute('disabled', 'disabled');
    };
    /**
     * enable this button.
     */
    Button.prototype.enable = function () {
        this.view.findById('button').removeAttribute('disabled');
    };
    Button.prototype.rendered = function () {
        if (this.attributes.read('wat:disabled'))
            this.view.findById('button').setAttribute('disabled', 'disabled');
    };
    return Button;
}(common.Container));
exports.Button = Button;
exports.default = Button;

},{"./wml/button":13,"wml-widgets-common":3,"wml-widgets-common/Styles":2}],13:[function(require,module,exports){
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
var Styles = require("wml-widgets-common/Styles");
var util_1 = require("wml-widgets-common/util");
var _1 = require("../../");
var Group = /** @class */ (function (_super) {
    __extends(Group, _super);
    function Group(context) {
        var _this = _super.call(this, context) || this;
        var view = _this;
        _this.template = function () {
            return wml_runtime_1.node('div', { html: { 'class': this.getClass(), 'role': "group" }, wml: {} }, [wml_runtime_1.domify(this.children)], view);
        };
        return _this;
    }
    return Group;
}(wml_runtime_1.AppView));
exports.Group = Group;
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button(context) {
        var _this = _super.call(this, context) || this;
        var view = _this;
        _this.template = function () {
            return wml_runtime_1.widget(_1.Fragment, { html: {}, wml: {} }, [wml_runtime_1.ifE(this.attributes.read('ww:href'), function if0() { return wml_runtime_1.node('a', { html: { 'href': this.attributes.read('ww:href'), 'class': util_1.combine([Styles.BUTTON, this.attributes.read('ww:variant', ''), this.attributes.read('ww:size', ''), this.attributes.read('ww:style', Styles.DEFAULT), this.attributes.read('ww:class')]), 'onclick': this.attributes.read('ww:onClick', util_1.noop) }, wml: { 'id': "button" } }, [wml_runtime_1.domify(this.attributes.read('ww:text')), wml_runtime_1.domify(this.children)], view); }.bind(this), function else_clause0() { return wml_runtime_1.node('button', { html: { 'type': this.attributes.read('ww:type', 'button'), 'name': this.attributes.read('ww:name', ''), 'disabled': (this.attributes.read('ww:disabled')) ? "true" : null, 'class': util_1.combine([Styles.BUTTON, this.attributes.read('ww:variant', ''), this.attributes.read('ww:size', ''), this.attributes.read('ww:style', Styles.DEFAULT), this.attributes.read('ww:class')]), 'onclick': this.attributes.read('ww:onClick', util_1.noop) }, wml: { 'id': "button" } }, [wml_runtime_1.domify(this.attributes.read('ww:text')), wml_runtime_1.domify(this.children)], view); }.bind(this))], view);
        };
        return _this;
    }
    return Button;
}(wml_runtime_1.AppView));
exports.Button = Button;

},{"../../":23,"@quenk/wml-runtime":5,"wml-widgets-common/Styles":2,"wml-widgets-common/util":4}],14:[function(require,module,exports){
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
var layout = require("./wml/card");
;
/**
 * Card
 */
var Card = /** @class */ (function (_super) {
    __extends(Card, _super);
    function Card() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new layout.Card(_this);
        return _this;
    }
    return Card;
}(wml_runtime_1.Component));
exports.Card = Card;
/**
 * CardBody
 */
var CardBody = /** @class */ (function (_super) {
    __extends(CardBody, _super);
    function CardBody() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new layout.CardBody(_this);
        return _this;
    }
    return CardBody;
}(wml_runtime_1.Component));
exports.CardBody = CardBody;

},{"./wml/card":15,"@quenk/wml-runtime":5}],15:[function(require,module,exports){
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
var util_1 = require("wml-widgets-common/util");
var Card = /** @class */ (function (_super) {
    __extends(Card, _super);
    function Card(context) {
        var _this = _super.call(this, context) || this;
        var view = _this;
        _this.template = function () {
            return wml_runtime_1.node('div', { html: { 'class': util_1.combine(["card", this.attributes.read('ww:class')]) }, wml: {} }, [wml_runtime_1.domify(this.children)], view);
        };
        return _this;
    }
    return Card;
}(wml_runtime_1.AppView));
exports.Card = Card;
var CardBody = /** @class */ (function (_super) {
    __extends(CardBody, _super);
    function CardBody(context) {
        var _this = _super.call(this, context) || this;
        var view = _this;
        _this.template = function () {
            return wml_runtime_1.node('div', { html: { 'class': util_1.combine(["card-body", this.attributes.read('ww:class')]) }, wml: {} }, [wml_runtime_1.domify(this.children)], view);
        };
        return _this;
    }
    return CardBody;
}(wml_runtime_1.AppView));
exports.CardBody = CardBody;

},{"@quenk/wml-runtime":5,"wml-widgets-common/util":4}],16:[function(require,module,exports){
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
var common = require("wml-widgets-common");
var drawer_layout_1 = require("./wml/drawer-layout");
;
/**
 * DrawerLayout provides a top level layout consisting of a drawer and
 * a main content view.
 */
var DrawerLayout = /** @class */ (function (_super) {
    __extends(DrawerLayout, _super);
    function DrawerLayout() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new drawer_layout_1.Main(_this);
        return _this;
    }
    DrawerLayout.prototype._getDrawer = function () {
        return this.view.findById('drawer');
    };
    DrawerLayout.prototype._combine = function (classes) {
        return classes.join(' ');
    };
    /**
     * drawerVisible queries whether the Drawer is visible or not.
     */
    DrawerLayout.prototype.drawerVisible = function () {
        return this._getDrawer().visible();
    };
    /**
     * hideDrawer hides the drawer.
     */
    DrawerLayout.prototype.hideDrawer = function () {
        return this._getDrawer().hide();
    };
    /**
     * showDrawer shows the drawer
     */
    DrawerLayout.prototype.showDrawer = function () {
        return this._getDrawer().show();
    };
    /**
     * toggle the visibility of this Drawer
     */
    DrawerLayout.prototype.toggleDrawer = function () {
        return this._getDrawer().toggle();
    };
    return DrawerLayout;
}(common.Container));
exports.DrawerLayout = DrawerLayout;

},{"./wml/drawer-layout":17,"wml-widgets-common":3}],17:[function(require,module,exports){
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
var Styles = require("wml-widgets-common/Styles");
var Drawer_1 = require("../../drawer/Drawer");
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(context) {
        var _this = _super.call(this, context) || this;
        var view = _this;
        _this.template = function () {
            return wml_runtime_1.node('div', { html: { 'class': Styles.DRAWER_LAYOUT }, wml: { 'id': "content" } }, [wml_runtime_1.widget(Drawer_1.Drawer, { html: {}, wml: { 'id': "drawer" }, ww: { 'content': this.attributes.read("ww:drawer") } }, [], view), wml_runtime_1.ifE(this.content, function if2() { return wml_runtime_1.domify(this.content); }.bind(this), function elseif0() { return wml_runtime_1.ifE(this.attributes.read("ww:content"), function if0() { return this.attributes.read("ww.content").call(this, view); }.bind(this), function else_clause2() { return wml_runtime_1.domify(this.children); }.bind(this)); }.bind(this))], view);
        };
        return _this;
    }
    return Main;
}(wml_runtime_1.AppView));
exports.Main = Main;

},{"../../drawer/Drawer":18,"@quenk/wml-runtime":5,"wml-widgets-common/Styles":2}],18:[function(require,module,exports){
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
var Styles = require("wml-widgets-common/Styles");
var drawer_1 = require("./wml/drawer");
;
/**
 * Drawer provides an area for navigation content.
 */
var Drawer = /** @class */ (function (_super) {
    __extends(Drawer, _super);
    function Drawer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new drawer_1.Main(_this);
        return _this;
    }
    Drawer.prototype._getDrawerDOM = function () {
        return this.view.findById('drawer');
    };
    /**
     * visible queries whether the Drawer is visible or not.
     */
    Drawer.prototype.visible = function () {
        return !this._getDrawerDOM().classList.contains(Styles.HIDDEN);
    };
    /**
     * hide the drawer.
     */
    Drawer.prototype.hide = function () {
        if (this.visible())
            this._getDrawerDOM().classList.add(Styles.HIDDEN);
    };
    /**
     * showDrawer shows the drawer
     */
    Drawer.prototype.show = function () {
        if (!this.visible())
            this._getDrawerDOM().classList.remove(Styles.HIDDEN);
    };
    /**
     * toggle the visibility of this Drawer
     */
    Drawer.prototype.toggle = function () {
        this._getDrawerDOM().classList.toggle(Styles.HIDDEN);
    };
    return Drawer;
}(wml_runtime_1.Component));
exports.Drawer = Drawer;

},{"./wml/drawer":19,"@quenk/wml-runtime":5,"wml-widgets-common/Styles":2}],19:[function(require,module,exports){
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
var Styles = require("wml-widgets-common/Styles");
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(context) {
        var _this = _super.call(this, context) || this;
        var view = _this;
        _this.template = function () {
            return wml_runtime_1.node('div', { html: { 'class': Styles.DRAWER }, wml: { 'id': "drawer" } }, [wml_runtime_1.node('div', { html: { 'class': Styles.DRAWER_CONTENT }, wml: {} }, [wml_runtime_1.ifE(this.attributes.read('ww:content'), function if1() { return this.attributes.read('ww:content').call(this, view); }.bind(this), function else_clause1() { return wml_runtime_1.domify(this.children); }.bind(this))], view)], view);
        };
        return _this;
    }
    return Main;
}(wml_runtime_1.AppView));
exports.Main = Main;

},{"@quenk/wml-runtime":5,"wml-widgets-common/Styles":2}],20:[function(require,module,exports){
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
var Fragment = /** @class */ (function (_super) {
    __extends(Fragment, _super);
    function Fragment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Fragment.prototype.render = function () {
        var frag = document.createDocumentFragment();
        this.children.forEach(function (c) { return frag.appendChild(c); });
        return frag;
    };
    return Fragment;
}(wml_runtime_1.Component));
exports.Fragment = Fragment;

},{"@quenk/wml-runtime":5}],21:[function(require,module,exports){
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
var Styles = require("wml-widgets-common/Styles");
var views = require("./wml/grid");
;
/**
 * Container
 */
var Container = /** @class */ (function (_super) {
    __extends(Container, _super);
    function Container() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Container(_this);
        return _this;
    }
    return Container;
}(wml_runtime_1.Component));
exports.Container = Container;
var Row = /** @class */ (function (_super) {
    __extends(Row, _super);
    function Row() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Row(_this);
        return _this;
    }
    return Row;
}(wml_runtime_1.Component));
exports.Row = Row;
var Column = /** @class */ (function (_super) {
    __extends(Column, _super);
    function Column() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Column(_this);
        return _this;
    }
    Column.prototype._getClass = function () {
        var classes = [Styles.GRID_COLUMN];
        var size = this.attributes.read('ww:size', 'md');
        var width = this.attributes.read('ww:width', 12);
        var offset = this.attributes.read('ww:offset', 0);
        classes.push("col-" + size + "-" + width);
        if (offset)
            classes.push("col-" + size + "-offset-" + offset);
        classes.push(this.attributes.read('ww:class'));
        return classes.filter(function (v) { return !(v == null); }).join(' ');
    };
    return Column;
}(wml_runtime_1.Component));
exports.Column = Column;

},{"./wml/grid":22,"@quenk/wml-runtime":5,"wml-widgets-common/Styles":2}],22:[function(require,module,exports){
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
var util_1 = require("wml-widgets-common/util");
var Styles = require("wml-widgets-common/Styles");
var Container = /** @class */ (function (_super) {
    __extends(Container, _super);
    function Container(context) {
        var _this = _super.call(this, context) || this;
        var view = _this;
        _this.template = function () {
            return wml_runtime_1.node('section', { html: { 'class': util_1.combine([Styles.GRID_CONTAINER, this.attributes.read('ww:class', '')]) }, wml: {} }, [wml_runtime_1.domify(this.children)], view);
        };
        return _this;
    }
    return Container;
}(wml_runtime_1.AppView));
exports.Container = Container;
var Row = /** @class */ (function (_super) {
    __extends(Row, _super);
    function Row(context) {
        var _this = _super.call(this, context) || this;
        var view = _this;
        _this.template = function () {
            return wml_runtime_1.node('div', { html: { 'class': util_1.combine([Styles.GRID_ROW, this.attributes.read('ww:class', '')]) }, wml: {} }, [wml_runtime_1.domify(this.children)], view);
        };
        return _this;
    }
    return Row;
}(wml_runtime_1.AppView));
exports.Row = Row;
var Column = /** @class */ (function (_super) {
    __extends(Column, _super);
    function Column(context) {
        var _this = _super.call(this, context) || this;
        var view = _this;
        _this.template = function () {
            return wml_runtime_1.node('div', { html: { 'class': this._getClass() }, wml: {} }, [wml_runtime_1.domify(this.children)], view);
        };
        return _this;
    }
    return Column;
}(wml_runtime_1.AppView));
exports.Column = Column;

},{"@quenk/wml-runtime":5,"wml-widgets-common/Styles":2,"wml-widgets-common/util":4}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var table = require("./table/Table");
exports.table = table;
/* jshint ignore:start */
/*
export BreadCrumbMenu from './breadcrumbs/BreadCrumbMenu';
export BreadCrumb from './breadcrumbs/BreadCrumb';
export Autocomplete from './autocomplete/Autocomplete';
export Jumbotron from './jumbotron/Jumbotron';
export Well from './well/Well';
export ListGroup from './list-group/ListGroup';
export ListGroupItem from './list-group/ListGroupItem';
export Search from './search/Search';
*/
var breadcrumbs_1 = require("./breadcrumbs");
exports.BreadCrumbs = breadcrumbs_1.BreadCrumbs;
exports.Crumb = breadcrumbs_1.Crumb;
var Fragment_1 = require("./fragment/Fragment");
exports.Fragment = Fragment_1.Fragment;
var DrawerLayout_1 = require("./drawer-layout/DrawerLayout");
exports.DrawerLayout = DrawerLayout_1.DrawerLayout;
var Drawer_1 = require("./drawer/Drawer");
exports.Drawer = Drawer_1.Drawer;
var ActionArea_1 = require("./action-area/ActionArea");
exports.ActionArea = ActionArea_1.ActionArea;
var MainView_1 = require("./main-view/MainView");
exports.MainView = MainView_1.MainView;
var MenuButton_1 = require("./menu-button/MenuButton");
exports.MenuButton = MenuButton_1.MenuButton;
var Button_1 = require("./button/Button");
exports.Button = Button_1.Button;
exports.ButtonGroup = Button_1.Group;
var Grid_1 = require("./grid/Grid");
exports.Container = Grid_1.Container;
exports.Row = Grid_1.Row;
exports.Column = Grid_1.Column;
var Panel_1 = require("./panel/Panel");
exports.Panel = Panel_1.Panel;
exports.PanelHeader = Panel_1.Header;
exports.PanelBody = Panel_1.Body;
exports.PanelFooter = Panel_1.Footer;
var Modal_1 = require("./modal/Modal");
exports.Modal = Modal_1.Modal;
exports.ModalHeader = Modal_1.Header;
exports.ModalBody = Modal_1.Body;
exports.ModalFooter = Modal_1.Footer;
var Input_1 = require("./input/Input");
exports.Input = Input_1.Input;
exports.Select = Input_1.Select;
var Switch_1 = require("./switch/Switch");
exports.Switch = Switch_1.Switch;
var Table_1 = require("./table/Table");
exports.Table = Table_1.Table;
exports.SortTableModel = Table_1.SortTableModel;
var Tabs_1 = require("./tabs/Tabs");
exports.Tab = Tabs_1.Tab;
exports.Tabs = Tabs_1.Tabs;
var BusyIndicator_1 = require("./busy-indicator/BusyIndicator");
exports.BusyIndicator = BusyIndicator_1.BusyIndicator;
var TreeNav_1 = require("./tree-nav/TreeNav");
exports.TreeNav = TreeNav_1.TreeNav;
exports.TreeNavItem = TreeNav_1.TreeNavItem;
var Card_1 = require("./card/Card");
exports.Card = Card_1.Card;
exports.CardBody = Card_1.CardBody;
/* jshint ignore:end */

},{"./action-area/ActionArea":6,"./breadcrumbs":8,"./busy-indicator/BusyIndicator":10,"./button/Button":12,"./card/Card":14,"./drawer-layout/DrawerLayout":16,"./drawer/Drawer":18,"./fragment/Fragment":20,"./grid/Grid":21,"./input/Input":24,"./main-view/MainView":26,"./menu-button/MenuButton":28,"./modal/Modal":30,"./panel/Panel":32,"./switch/Switch":34,"./table/Table":36,"./tabs/Tabs":38,"./tree-nav/TreeNav":40}],24:[function(require,module,exports){
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
var util_1 = require("wml-widgets-common/util");
var input_1 = require("./wml/input");
var INPUT_SUCCESS = 'has-success';
var INPUT_ERROR = 'has-error';
var INPUT_WARNING = 'has-warning';
var DefaultInputDelegate = /** @class */ (function () {
    function DefaultInputDelegate(input) {
        this.input = input;
    }
    DefaultInputDelegate.prototype.onInput = function (e) {
        this.input.attributes.read('ww:onInput', util_1.noop)(e);
    };
    return DefaultInputDelegate;
}());
exports.DefaultInputDelegate = DefaultInputDelegate;
/**
 * Input
 */
var Input = /** @class */ (function (_super) {
    __extends(Input, _super);
    function Input() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new input_1.InputView(_this);
        _this.delegate = _this.attributes.read('ww:delegate', new DefaultInputDelegate(_this));
        return _this;
    }
    Object.defineProperty(Input.prototype, "name", {
        get: function () {
            return this.view.ids.input.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Input.prototype, "value", {
        get: function () {
            return this.view.ids.input.value;
        },
        enumerable: true,
        configurable: true
    });
    Input.prototype.initialValue = function () {
        var ret = this.attributes.read('ww:value');
        return (typeof ret === 'function') ? ret(this.attributes.read('ww:name')) : ret;
    };
    /**
     * getClass
     */
    Input.prototype.getClass = function () {
        var c = "form-group " + this.attributes.read('ww:class');
        if (!this.attributes.read('ww:message'))
            return c;
        return c + " " + this.attributes.read('ww:variant', 'has-error');
    };
    /**
     * setMessage sets the message for the message portion of
     * this input.
     */
    Input.prototype.setMessage = function (msg) {
        if (msg === void 0) { msg = ''; }
        var message = this.view.ids.message;
        var node = document.createTextNode(msg);
        if (message.firstChild) {
            message.replaceChild(node, message.firstChild);
        }
        else {
            message.appendChild(node);
        }
    };
    /**
     * isFilled tells if this Input has a filled value.
     */
    Input.prototype.isFilled = function () {
        var input = this.view.ids.input;
        return ((input.value != null) && (input.value.trim() !== ''));
    };
    /**
     * isRequired tells if the Input was required.
     */
    Input.prototype.isRequired = function () {
        return (this.attributes.read('ww:required') != null);
    };
    /**
     * isValid queries whether the Input has been invalidated
     * or not.
     */
    Input.prototype.isValid = function () {
        return (this.view.ids.root.className.split(' ').indexOf(INPUT_ERROR) === -1);
    };
    /**
     * removeValidationState removes the state validation state from the input.
     */
    Input.prototype.removeValidationState = function () {
        var h = this.view.ids.root;
        h.classList.remove(INPUT_SUCCESS);
        h.classList.remove(INPUT_ERROR);
        h.classList.remove(INPUT_WARNING);
    };
    /**
     * invalidate this Input with an optional message.
     * @param {string} message
     * @returns {Input}
     */
    Input.prototype.invalidate = function (message) {
        if (message === void 0) { message = ''; }
        this.removeValidationState();
        this.setMessage(message);
        this.view.ids.root.classList.add(INPUT_ERROR);
    };
    /**
     * validate this input with an optional messsage.
     * @param {string} message
     * @returns {Input}
     */
    Input.prototype.validate = function (message) {
        if (message === void 0) { message = ''; }
        this.removeValidationState();
        this.setMessage(message);
        this.view.ids.root.classList.add(INPUT_SUCCESS);
    };
    /**
     * warn this input with an optional message.
     * @param {string} message
     * @returns {Input}
     */
    Input.prototype.warn = function (message) {
        if (message === void 0) { message = ''; }
        this.removeValidationState();
        this.setMessage(message);
        this.view.ids.root.classList.add(INPUT_WARNING);
    };
    /**
     * reset this input to a clean state.
     * Removes messages, validation state etc.
     * @return {Input}
     */
    Input.prototype.reset = function () {
        var root = this.view.ids.root;
        var m = this.view.ids.message;
        this.removeValidationState();
        while (m.firstChild)
            m.removeChild(m.firstChild);
    };
    /**
     * rendered checks if the input should have a validation state set
     */
    Input.prototype.rendered = function () {
        var validate = this.attributes.read('ww:validate');
        var invalidate = this.attributes.read('ww:invalidate');
        var warn = this.attributes.read('ww:warn');
        validate ?
            this.validate(validate) :
            warn ?
                this.warn(warn) :
                invalidate ?
                    this.invalidate(invalidate) :
                    null;
    };
    return Input;
}(wml_runtime_1.Component));
exports.Input = Input;
var Select = /** @class */ (function (_super) {
    __extends(Select, _super);
    function Select() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new input_1.SelectView(_this);
        return _this;
    }
    return Select;
}(Input));
exports.Select = Select;

},{"./wml/input":25,"@quenk/wml-runtime":5,"wml-widgets-common/util":4}],25:[function(require,module,exports){
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
var Styles = require("wml-widgets-common/Styles");
function label(view) { return wml_runtime_1.node('label', { html: { 'for': this.attributes.read('ww:id'), 'class': Styles.CONTROL_LABEL }, wml: {} }, [wml_runtime_1.domify(this.attributes.read('ww:label'))], view); }
exports.label = label;
function message(view) { return wml_runtime_1.node('span', { html: { 'class': "help-block" }, wml: { 'id': "message" } }, [wml_runtime_1.domify(this.attributes.read('ww:message', ''))], view); }
exports.message = message;
var SelectView = /** @class */ (function (_super) {
    __extends(SelectView, _super);
    function SelectView(context) {
        var _this = _super.call(this, context) || this;
        var view = _this;
        _this.template = function () {
            return wml_runtime_1.node('div', { html: { 'class': [Styles.FORM_GROUP, this.attributes.read('ww:variant', '')].join(',') }, wml: {} }, [label.call(this, view), wml_runtime_1.node('select', { html: { 'id': this.attributes.read('ww:id', ''), 'title': this.attributes.read('ww:title'), 'name': this.attributes.read('ww:name', this.attributes.read('ww:id', '')), 'onchange': this.delegate.onInput.bind(this.delegate), 'value': this.initialValue(), 'disabled': this.attributes.read('ww:disabled', null), 'readonly': this.attributes.read('ww:readonly', null), 'class': Styles.SELECT }, wml: { 'id': "input" } }, [wml_runtime_1.forE(this.attributes.read('ww:options', []), function for1(opt) { return (function () { return (typeof opt === 'string') ? wml_runtime_1.box(wml_runtime_1.node('option', { html: {}, wml: {} }, [wml_runtime_1.domify(opt)], view), wml_runtime_1.node('option', { html: {}, wml: {} }, [wml_runtime_1.domify(opt)], view), wml_runtime_1.node('option', { html: {}, wml: {} }, [wml_runtime_1.domify(opt)], view)) : wml_runtime_1.node('option', { html: { 'value': opt.value }, wml: {} }, [wml_runtime_1.domify(opt.label)], view); }).call(this); }.bind(this), function for_otherwise1() { return wml_runtime_1.node('p', { html: {}, wml: {} }, [], view); }.bind(this))], view), message.call(this, view)], view);
        };
        return _this;
    }
    return SelectView;
}(wml_runtime_1.AppView));
exports.SelectView = SelectView;
var InputView = /** @class */ (function (_super) {
    __extends(InputView, _super);
    function InputView(context) {
        var _this = _super.call(this, context) || this;
        var view = _this;
        _this.template = function () {
            return wml_runtime_1.node('div', { html: { 'class': [Styles.FORM_GROUP, this.attributes.read('ww:variant', '')].join(',') }, wml: {} }, [label.call(this, view), wml_runtime_1.ifE(this.attributes.read('ww:type', 'text') !== 'textarea', function if3() { return wml_runtime_1.node('input', { html: { 'id': this.attributes.read('ww:id', ''), 'title': this.attributes.read('ww:title'), 'name': this.attributes.read('ww:name', this.attributes.read('ww:id', '')), 'type': this.attributes.read('ww:type', 'text'), 'placeholder': this.attributes.read('ww:placeholder'), 'oninput': this.delegate.onInput.bind(this.delegate), 'value': this.initialValue(), 'disabled': this.attributes.read('ww:disabled', null), 'readonly': this.attributes.read('ww:readonly', null), 'class': Styles.INPUT }, wml: { 'id': "input" } }, [], view); }.bind(this), function else_clause3() { return wml_runtime_1.node('textarea', { html: { 'id': this.attributes.read('ww:id', ''), 'title': this.attributes.read('ww:title'), 'name': this.attributes.read('ww:name', this.attributes.read('ww:id', '')), 'class': Styles.TEXTAREA, 'placeholder': this.attributes.read('ww:placeholder'), 'oninput': this.delegate.onInput.bind(this.delegate), 'disabled': this.attributes.read('ww:disabled', null), 'readonly': this.attributes.read('ww:readonly', null), 'rows': this.attributes.read('wat:rows') }, wml: { 'id': "input" } }, [wml_runtime_1.domify(this.initialValue())], view); }.bind(this)), message.call(this, view)], view);
        };
        return _this;
    }
    return InputView;
}(wml_runtime_1.AppView));
exports.InputView = InputView;

},{"@quenk/wml-runtime":5,"wml-widgets-common/Styles":2}],26:[function(require,module,exports){
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
var common = require("wml-widgets-common");
var main_view_1 = require("./wml/main-view");
/**
 * MainView provides a container for the main content of an application.
 */
var MainView = /** @class */ (function (_super) {
    __extends(MainView, _super);
    function MainView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new main_view_1.Main(_this);
        return _this;
    }
    return MainView;
}(common.Container));
exports.MainView = MainView;

},{"./wml/main-view":27,"wml-widgets-common":3}],27:[function(require,module,exports){
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
var Styles = require("wml-widgets-common/Styles");
var util_1 = require("wml-widgets-common/util");
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(context) {
        var _this = _super.call(this, context) || this;
        var view = _this;
        _this.template = function () {
            return wml_runtime_1.node('div', { html: { 'class': util_1.combine([Styles.MAIN_VIEW, Styles.DRAWER_PUSHABLE, this.attributes.read('ww:class', '')]) }, wml: {} }, [wml_runtime_1.domify(this.children)], view);
        };
        return _this;
    }
    return Main;
}(wml_runtime_1.AppView));
exports.Main = Main;

},{"@quenk/wml-runtime":5,"wml-widgets-common/Styles":2,"wml-widgets-common/util":4}],28:[function(require,module,exports){
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
var menu_button_1 = require("./wml/menu_button");
/**
 * MenuButton provides a 'hamburger' menu button.
 */
var MenuButton = /** @class */ (function (_super) {
    __extends(MenuButton, _super);
    function MenuButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new menu_button_1.Main(_this);
        return _this;
    }
    return MenuButton;
}(wml_runtime_1.Component));
exports.MenuButton = MenuButton;
exports.default = MenuButton;

},{"./wml/menu_button":29,"@quenk/wml-runtime":5}],29:[function(require,module,exports){
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
var Style = require("wml-widgets-common/Styles");
var util_1 = require("wml-widgets-common/util");
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(context) {
        var _this = _super.call(this, context) || this;
        var view = _this;
        _this.template = function () {
            return wml_runtime_1.node('button', { html: { 'class': Style.MENU_BUTTON, 'onclick': this.attributes.read('ww:onClick', util_1.noop) }, wml: {} }, [wml_runtime_1.node('span', { html: { 'class': "" }, wml: {} }, [], view), wml_runtime_1.node('span', { html: { 'class': "" }, wml: {} }, [], view), wml_runtime_1.node('span', { html: { 'class': "" }, wml: {} }, [], view)], view);
        };
        return _this;
    }
    return Main;
}(wml_runtime_1.AppView));
exports.Main = Main;

},{"@quenk/wml-runtime":5,"wml-widgets-common/Styles":2,"wml-widgets-common/util":4}],30:[function(require,module,exports){
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
var views = require("./wml/modal");
/**
 * Modal
 */
var Modal = /** @class */ (function (_super) {
    __extends(Modal, _super);
    function Modal() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Modal(_this);
        return _this;
    }
    /**
     * close the modal.
     */
    Modal.prototype.close = function () {
        var m = this.view.findById('modal');
        m.parentNode.removeChild(m);
    };
    Modal.prototype.place = function (e) {
        while (e.firstChild != null)
            e.removeChild(e.firstChild);
        e.appendChild(this.render());
    };
    return Modal;
}(wml_runtime_1.Component));
exports.Modal = Modal;
/**
 * Header
 */
var Header = /** @class */ (function (_super) {
    __extends(Header, _super);
    function Header() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Header(_this);
        return _this;
    }
    return Header;
}(wml_runtime_1.Component));
exports.Header = Header;
/**
 * Body
 */
var Body = /** @class */ (function (_super) {
    __extends(Body, _super);
    function Body() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Body(_this);
        return _this;
    }
    return Body;
}(wml_runtime_1.Component));
exports.Body = Body;
/**
 * Footer
 */
var Footer = /** @class */ (function (_super) {
    __extends(Footer, _super);
    function Footer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Footer(_this);
        return _this;
    }
    return Footer;
}(wml_runtime_1.Component));
exports.Footer = Footer;

},{"./wml/modal":31,"@quenk/wml-runtime":5}],31:[function(require,module,exports){
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
var Styles = require("wml-widgets-common/Styles");
var util_1 = require("wml-widgets-common/util");
var Modal = /** @class */ (function (_super) {
    __extends(Modal, _super);
    function Modal(context) {
        var _this = _super.call(this, context) || this;
        var view = _this;
        _this.template = function () {
            return wml_runtime_1.node('div', { html: { 'class': Styles.MODAL, 'tabindex': "-1", 'role': "dialog" }, wml: { 'id': "modal" } }, [wml_runtime_1.node('div', { html: { 'class': Styles.MODAL_DIALOG, 'role': "document" }, wml: {} }, [wml_runtime_1.node('div', { html: { 'class': Styles.MODAL_CONTENT }, wml: { 'id': "content" } }, [wml_runtime_1.domify(this.children)], view)], view)], view);
        };
        return _this;
    }
    return Modal;
}(wml_runtime_1.AppView));
exports.Modal = Modal;
var Header = /** @class */ (function (_super) {
    __extends(Header, _super);
    function Header(context) {
        var _this = _super.call(this, context) || this;
        var view = _this;
        _this.template = function () {
            return wml_runtime_1.node('div', { html: { 'class': Styles.MODAL_HEADER }, wml: {} }, [wml_runtime_1.node('button', { html: { 'type': "button", 'class': "close", 'aria-label': "Close", 'onclick': this.attributes.read('ww:onClose', util_1.noop) }, wml: {} }, [wml_runtime_1.node('span', { html: { 'aria-hidden': "true" }, wml: {} }, [wml_runtime_1.text("\u00D7")], view)], view), wml_runtime_1.domify(this.children)], view);
        };
        return _this;
    }
    return Header;
}(wml_runtime_1.AppView));
exports.Header = Header;
var Body = /** @class */ (function (_super) {
    __extends(Body, _super);
    function Body(context) {
        var _this = _super.call(this, context) || this;
        var view = _this;
        _this.template = function () {
            return wml_runtime_1.node('div', { html: { 'class': Styles.MODAL_BODY }, wml: {} }, [wml_runtime_1.domify(this.children)], view);
        };
        return _this;
    }
    return Body;
}(wml_runtime_1.AppView));
exports.Body = Body;
var Footer = /** @class */ (function (_super) {
    __extends(Footer, _super);
    function Footer(context) {
        var _this = _super.call(this, context) || this;
        var view = _this;
        _this.template = function () {
            return wml_runtime_1.node('div', { html: { 'class': Styles.MODAL_FOOTER }, wml: {} }, [wml_runtime_1.domify(this.children)], view);
        };
        return _this;
    }
    return Footer;
}(wml_runtime_1.AppView));
exports.Footer = Footer;

},{"@quenk/wml-runtime":5,"wml-widgets-common/Styles":2,"wml-widgets-common/util":4}],32:[function(require,module,exports){
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
var views = require("./wml/panel");
var Panel = /** @class */ (function (_super) {
    __extends(Panel, _super);
    function Panel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Panel(_this);
        return _this;
    }
    return Panel;
}(wml_runtime_1.Component));
exports.Panel = Panel;
var Header = /** @class */ (function (_super) {
    __extends(Header, _super);
    function Header() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Header(_this);
        return _this;
    }
    return Header;
}(wml_runtime_1.Component));
exports.Header = Header;
var Body = /** @class */ (function (_super) {
    __extends(Body, _super);
    function Body() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Body(_this);
        return _this;
    }
    return Body;
}(wml_runtime_1.Component));
exports.Body = Body;
var Footer = /** @class */ (function (_super) {
    __extends(Footer, _super);
    function Footer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Footer(_this);
        return _this;
    }
    return Footer;
}(wml_runtime_1.Component));
exports.Footer = Footer;

},{"./wml/panel":33,"@quenk/wml-runtime":5}],33:[function(require,module,exports){
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
var Styles = require("wml-widgets-common/Styles");
var util_1 = require("wml-widgets-common/util");
var Panel = /** @class */ (function (_super) {
    __extends(Panel, _super);
    function Panel(context) {
        var _this = _super.call(this, context) || this;
        var view = _this;
        _this.template = function () {
            return wml_runtime_1.node('div', { html: { 'class': util_1.combine([Styles.PANEL, this.attributes.read('ww:style', Styles.DEFAULT)]) }, wml: {} }, [wml_runtime_1.domify(this.children)], view);
        };
        return _this;
    }
    return Panel;
}(wml_runtime_1.AppView));
exports.Panel = Panel;
var Header = /** @class */ (function (_super) {
    __extends(Header, _super);
    function Header(context) {
        var _this = _super.call(this, context) || this;
        var view = _this;
        _this.template = function () {
            return wml_runtime_1.node('div', { html: { 'class': Styles.PANEL_HEADER }, wml: {} }, [wml_runtime_1.domify(this.children)], view);
        };
        return _this;
    }
    return Header;
}(wml_runtime_1.AppView));
exports.Header = Header;
var Body = /** @class */ (function (_super) {
    __extends(Body, _super);
    function Body(context) {
        var _this = _super.call(this, context) || this;
        var view = _this;
        _this.template = function () {
            return wml_runtime_1.node('div', { html: { 'class': Styles.PANEL_BODY }, wml: {} }, [wml_runtime_1.domify(this.children)], view);
        };
        return _this;
    }
    return Body;
}(wml_runtime_1.AppView));
exports.Body = Body;
var Footer = /** @class */ (function (_super) {
    __extends(Footer, _super);
    function Footer(context) {
        var _this = _super.call(this, context) || this;
        var view = _this;
        _this.template = function () {
            return wml_runtime_1.node('div', { html: { 'class': Styles.PANEL_FOOTER }, wml: {} }, [wml_runtime_1.domify(this.children)], view);
        };
        return _this;
    }
    return Footer;
}(wml_runtime_1.AppView));
exports.Footer = Footer;

},{"@quenk/wml-runtime":5,"wml-widgets-common/Styles":2,"wml-widgets-common/util":4}],34:[function(require,module,exports){
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
var switch_1 = require("./wml/switch");
/**
 * Switch
 */
var Switch = /** @class */ (function (_super) {
    __extends(Switch, _super);
    function Switch() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new switch_1.Main(_this);
        return _this;
    }
    return Switch;
}(wml_runtime_1.Component));
exports.Switch = Switch;

},{"./wml/switch":35,"@quenk/wml-runtime":5}],35:[function(require,module,exports){
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
var Styles = require("wml-widgets-common/Styles");
var util_1 = require("wml-widgets-common/util");
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(context) {
        var _this = _super.call(this, context) || this;
        var view = _this;
        _this.template = function () {
            return wml_runtime_1.node('label', { html: { 'class': Styles.SWITCH }, wml: {} }, [wml_runtime_1.node('input', { html: { 'type': "checkbox", 'name': this.attributes.read('ww:name'), 'value': this.attributes.read('ww:value'), 'onchange': this.attributes.read('ww:onChange', util_1.noop) }, wml: {} }, [], view), wml_runtime_1.node('div', { html: { 'class': Styles.SWITCH_SLIDER }, wml: {} }, [], view), wml_runtime_1.domify(this.children)], view);
        };
        return _this;
    }
    return Main;
}(wml_runtime_1.AppView));
exports.Main = Main;

},{"@quenk/wml-runtime":5,"wml-widgets-common/Styles":2,"wml-widgets-common/util":4}],36:[function(require,module,exports){
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
var property_seek_1 = require("property-seek");
var wml_runtime_1 = require("@quenk/wml-runtime");
var table_1 = require("./wml/table");
var ASC_ARROW = '\u21e7';
var DESC_ARROW = '\u21e9';
exports.dateSort = function (a, b) {
    var na = new Date(a).getTime();
    var nb = new Date(b).getTime();
    return na > nb ? -1 : na < nb ? 1 : 0;
};
exports.stringSort = function (a, b) {
    var la = a.replace(/\s+/, '').toLowerCase();
    var lb = b.replace(/\s+/, '').toLowerCase();
    return (la > lb) ? -1 : (la < lb) ? 1 : 0;
};
exports.naturalSort = function (a, b) {
    //Source: http://stackoverflow.com/questions/4340227/sort-mixed-alpha-numeric-array
    var reA = /[^a-zA-Z]/g;
    var reN = /[^0-9]/g;
    var AInt = parseInt(a, 10);
    var BInt = parseInt(b, 10);
    if (isNaN(AInt) && isNaN(BInt)) {
        var aA = a.replace(reA, '');
        var bA = b.replace(reA, '');
        if (aA === bA) {
            var aN = parseInt(a.replace(reN, ''), 10);
            var bN = parseInt(b.replace(reN, ''), 10);
            return aN === bN ? 0 : aN > bN ? -1 : 1;
        }
        else {
            return aA > bA ? -1 : 1;
        }
    }
    else if (isNaN(AInt)) {
        return -1; //to make alphanumeric sort first return -1 here
    }
    else if (isNaN(BInt)) {
        return 1; //to make alphanumeric sort first return 1 here
    }
    else {
        return AInt > BInt ? -1 : 1;
    }
};
exports.numberSort = function (a, b) {
    var na = parseFloat(a);
    var nb = parseFloat(b);
    na = (isNaN(a)) ? -Infinity : a;
    nb = (isNaN(b)) ? -Infinity : b;
    return (na > nb) ? -1 : (na < nb) ? 1 : 0;
};
var HeadingClickedEvent = /** @class */ (function () {
    function HeadingClickedEvent(name, field, table) {
        this.name = name;
        this.field = field;
        this.table = table;
    }
    return HeadingClickedEvent;
}());
exports.HeadingClickedEvent = HeadingClickedEvent;
var RowClickedEvent = /** @class */ (function () {
    function RowClickedEvent(value, index, data, table) {
        this.value = value;
        this.index = index;
        this.data = data;
        this.table = table;
    }
    return RowClickedEvent;
}());
exports.RowClickedEvent = RowClickedEvent;
var RowSelectedEvent = /** @class */ (function (_super) {
    __extends(RowSelectedEvent, _super);
    function RowSelectedEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RowSelectedEvent;
}(RowClickedEvent));
exports.RowSelectedEvent = RowSelectedEvent;
var CellClickedEvent = /** @class */ (function () {
    function CellClickedEvent(value, name, index, row, table) {
        this.value = value;
        this.name = name;
        this.index = index;
        this.row = row;
        this.table = table;
    }
    return CellClickedEvent;
}());
exports.CellClickedEvent = CellClickedEvent;
var DefaultTableModel = /** @class */ (function () {
    function DefaultTableModel() {
    }
    DefaultTableModel.prototype.allSelected = function () { };
    DefaultTableModel.prototype.cellClicked = function (_e) { };
    DefaultTableModel.prototype.headingClicked = function (_e) { };
    DefaultTableModel.prototype.rowClicked = function (_e) { };
    DefaultTableModel.prototype.rowSelected = function (_e) { };
    return DefaultTableModel;
}());
exports.DefaultTableModel = DefaultTableModel;
var SortTableModel = /** @class */ (function (_super) {
    __extends(SortTableModel, _super);
    function SortTableModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SortTableModel.prototype.headingClicked = function (e) { e.table.sort(e.name); };
    return SortTableModel;
}(DefaultTableModel));
exports.SortTableModel = SortTableModel;
var Table = /** @class */ (function (_super) {
    __extends(Table, _super);
    function Table() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.originalData = _this.attributes.read('ww:data', []);
        _this.data = _this.originalData.slice();
        _this.sortedOn = '';
        _this.arrow = '';
        _this.view = new table_1.TableView(_this);
        _this.model = _this.attributes.read('ww:model', new DefaultTableModel());
        return _this;
    }
    Table.prototype.sort = function (name) {
        var data;
        var body = this.view.findById('body');
        var head = this.view.findById('head');
        var field = this.attributes.read('ww:fields', []).reduce(function (p, c) { return p ? p : (c.name === name ? c : null); });
        var sortOn;
        var strategy;
        if (!field)
            throw new Error("Table#sort: unknown field '" + name + "'");
        sortOn = field.sortOn || name;
        strategy = field.strategy || exports.stringSort;
        if (this.sortedOn === name) {
            this.data = this.data.reverse();
            this.arrow = (this.arrow === ASC_ARROW) ? DESC_ARROW : ASC_ARROW;
        }
        else {
            this.arrow = DESC_ARROW;
            this.data = this
                .originalData
                .slice()
                .sort(function (a, b) { return strategy(property_seek_1.default(sortOn, a), property_seek_1.default(sortOn, b)); });
        }
        this.sortedOn = name;
        this.view.invalidate();
    };
    /**
     * update the data the table displays
     */
    Table.prototype.update = function (data) {
        this.originalData = data.slice();
        this.data = data.slice();
        (this.sortedOn === '') ? this.view.invalidate() : this.sort(this.sortedOn);
    };
    return Table;
}(wml_runtime_1.Component));
exports.Table = Table;

},{"./wml/table":37,"@quenk/wml-runtime":5,"property-seek":42}],37:[function(require,module,exports){
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
var property_seek_1 = require("property-seek");
var Styles = require("wml-widgets-common/Styles");
var Table_1 = require("../Table");
var _1 = require("../../");
function thead(view, fields) { return wml_runtime_1.node('tr', { html: {}, wml: {} }, [wml_runtime_1.ifE(this.attributes.read('ww:selectable'), function if4() { return wml_runtime_1.node('th', { html: {}, wml: {} }, [wml_runtime_1.node('input', { html: { 'type': "checkbox", 'onclick': function function_literal_1() { return this.model.allRowsSelected(); }.bind(this) }, wml: {} }, [], view)], view); }.bind(this), wml_runtime_1.empty), wml_runtime_1.forE(fields, function for2(field) { return wml_runtime_1.ifE(!field.hidden, function if5() { return wml_runtime_1.ifE(field.sortAs, function if6() { return wml_runtime_1.node('th', { html: { 'class': [this.attributes.read('ww:headingClass'), (this.sortedOn === field.name) ? Styles.ACTIVE : ''].join(' '), 'onclick': function function_literal_2() { return this.model.headingClicked(new Table_1.HeadingClickedEvent(field.name, field, this)); }.bind(this) }, wml: {} }, [wml_runtime_1.domify(field.heading), wml_runtime_1.ifE(this.sortedOn === field.name, function if7() { return wml_runtime_1.domify(this.arrow); }.bind(this), wml_runtime_1.empty)], view); }.bind(this), function else_clause4() { return wml_runtime_1.node('th', { html: { 'class': [this.attributes.read('ww:headingClass'), (this.sortedOn === field.name) ? Styles.ACTIVE : ''].join(' '), 'onclick': function function_literal_3() { return this.model.headingClicked(new Table_1.HeadingClickedEvent(field.name, field, this)); }.bind(this) }, wml: {} }, [wml_runtime_1.domify(field.heading), wml_runtime_1.ifE(this.sortedOn === field.name, function if8() { return wml_runtime_1.domify(this.arrow); }.bind(this), wml_runtime_1.empty)], view); }.bind(this)); }.bind(this), wml_runtime_1.empty); }.bind(this), function for_otherwise2() { return wml_runtime_1.empty(); }.bind(this))], view); }
exports.thead = thead;
function tbody(view, data, fields) { return wml_runtime_1.widget(_1.Fragment, { html: {}, wml: {} }, [wml_runtime_1.forE(data, function for3(row, index) { return wml_runtime_1.node('tr', { html: { 'class': this.attributes.read('ww:rowClass'), 'onclick': function function_literal_4() { return this.model.rowClicked(new Table_1.RowClickedEvent(row, index, data, this)); }.bind(this) }, wml: {} }, [wml_runtime_1.ifE(this.attributes.read('ww:selectable'), function if9() { return wml_runtime_1.node('td', { html: {}, wml: {} }, [wml_runtime_1.node('input', { html: { 'type': "checkbox", 'onclick': function function_literal_5() { return this.model.rowSelected(new Table_1.RowSelectedEvent(row, index, data, this)); }.bind(this) }, wml: {} }, [], view)], view); }.bind(this), wml_runtime_1.empty), wml_runtime_1.forE(fields, function for4(field) { return wml_runtime_1.ifE(!field.hidden, function if10() { return wml_runtime_1.node('td', { html: { 'class': this.attributes.read('ww:cellClass'), 'onclick': function function_literal_6() { return this.model.cellClicked(new Table_1.CellClickedEvent(property_seek_1.get(field.name, row), field.name, index, row, this)); }.bind(this) }, wml: {} }, [wml_runtime_1.ifE(field.fragment, function if11() { return field.fragment.call(this, view, property_seek_1.get(field.name, row), field.name, row, field); }.bind(this), function else_clause5() { return wml_runtime_1.domify(property_seek_1.get(field.name, row)); }.bind(this))], view); }.bind(this), wml_runtime_1.empty); }.bind(this), function for_otherwise4() { return wml_runtime_1.empty(); }.bind(this))], view); }.bind(this), function for_otherwise4() { return wml_runtime_1.empty(); }.bind(this))], view); }
exports.tbody = tbody;
function table(view) { return wml_runtime_1.node('table', { html: { 'class': [Styles.TABLE, this.attributes.read('ww:class', '')].join(' ') }, wml: { 'id': "root" } }, [wml_runtime_1.node('thead', { html: {}, wml: { 'id': "head" } }, [thead.call(this, view, this.attributes.read('ww:fields'))], view), wml_runtime_1.node('tbody', { html: {}, wml: { 'id': "body" } }, [tbody.call(this, view, this.data, this.attributes.read('ww:fields'))], view)], view); }
exports.table = table;
var TableView = /** @class */ (function (_super) {
    __extends(TableView, _super);
    function TableView(context) {
        var _this = _super.call(this, context) || this;
        var view = _this;
        _this.template = function () {
            return wml_runtime_1.widget(_1.Fragment, { html: {}, wml: {} }, [wml_runtime_1.ifE(this.data.length === 0, function if12() { return wml_runtime_1.ifE(this.attributes.read('emptyMacro'), function if13() { return this.attributes.read.call(this, view, 'emptyMacro'); }.bind(this), function else_clause6() { return table.call(this, view); }.bind(this)); }.bind(this), function else_clause7() { return table.call(this, view); }.bind(this))], view);
        };
        return _this;
    }
    return TableView;
}(wml_runtime_1.AppView));
exports.TableView = TableView;

},{"../../":23,"../Table":36,"@quenk/wml-runtime":5,"property-seek":42,"wml-widgets-common/Styles":2}],38:[function(require,module,exports){
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
var Styles = require("wml-widgets-common/Styles");
var util_1 = require("wml-widgets-common/util");
var tabs_1 = require("./wml/tabs");
/**
 * Tab
 */
var Tab = /** @class */ (function (_super) {
    __extends(Tab, _super);
    function Tab() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new tabs_1.TabView(_this);
        return _this;
    }
    /**
     * click this Tab
     */
    Tab.prototype.click = function () {
        this.view.ids.link.click();
    };
    Tab.prototype.clicked = function (e) {
        e.preventDefault();
        var parent = this.view.ids.root.parentNode;
        var us = parent.children;
        for (var i = 0; i < us.length; i++)
            us[i].classList.remove(Styles.ACTIVE);
        this.view.ids.root.classList.add(Styles.ACTIVE);
        this.attributes.read('ww:onClick', util_1.noop)(this.attributes.read('ww:name'));
    };
    return Tab;
}(wml_runtime_1.Component));
exports.Tab = Tab;
/**
 * Tabs
 */
var Tabs = /** @class */ (function (_super) {
    __extends(Tabs, _super);
    function Tabs() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new tabs_1.TabsView(_this);
        return _this;
    }
    return Tabs;
}(wml_runtime_1.Component));
exports.Tabs = Tabs;

},{"./wml/tabs":39,"@quenk/wml-runtime":5,"wml-widgets-common/Styles":2,"wml-widgets-common/util":4}],39:[function(require,module,exports){
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
var Styles = require("wml-widgets-common/Styles");
var TabView = /** @class */ (function (_super) {
    __extends(TabView, _super);
    function TabView(context) {
        var _this = _super.call(this, context) || this;
        var view = _this;
        _this.template = function () {
            return wml_runtime_1.node('li', { html: { 'role': "presentation", 'class': (this.attributes.read('ww:active')) ? Styles.ACTIVE : null }, wml: { 'id': "root" } }, [wml_runtime_1.node('a', { html: { 'href': "#", 'onclick': this.clicked.bind(this) }, wml: { 'id': "link" } }, [wml_runtime_1.ifE(this.attributes.read('ww:text'), function if14() { return wml_runtime_1.domify(this.attributes.read('ww:text')); }.bind(this), function else_clause8() { return wml_runtime_1.domify(this.children); }.bind(this))], view)], view);
        };
        return _this;
    }
    return TabView;
}(wml_runtime_1.AppView));
exports.TabView = TabView;
var TabsView = /** @class */ (function (_super) {
    __extends(TabsView, _super);
    function TabsView(context) {
        var _this = _super.call(this, context) || this;
        var view = _this;
        _this.template = function () {
            return wml_runtime_1.node('ul', { html: { 'class': Styles.TABS }, wml: {} }, [wml_runtime_1.domify(this.children)], view);
        };
        return _this;
    }
    return TabsView;
}(wml_runtime_1.AppView));
exports.TabsView = TabsView;

},{"@quenk/wml-runtime":5,"wml-widgets-common/Styles":2}],40:[function(require,module,exports){
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
var tree_nav_1 = require("./wml/tree-nav");
var Styles = require("wml-widgets-common/Styles");
/**
 * TreeNavItem is used to indicate an item in the tree.
 */
var TreeNavItem = /** @class */ (function (_super) {
    __extends(TreeNavItem, _super);
    function TreeNavItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new tree_nav_1.TreeNavItemView(_this);
        return _this;
    }
    /**
     * activate this TreeItem
     */
    TreeNavItem.prototype.activate = function () {
        var a = this.view.ids.link;
        if (a instanceof HTMLElement)
            if (a.parentNode instanceof HTMLElement) {
                var children = a.parentNode.children;
                a.classList.remove(Styles.ACTIVE);
                a.classList.add(Styles.ACTIVE);
                for (var i = 0; i < children.length; i++)
                    if (children[i].nodeName === 'A')
                        if (children[i] !== a)
                            children[i].classList.remove(Styles.ACTIVE);
            }
    };
    /**
     * deactivate this DrawerLink
     */
    TreeNavItem.prototype.deactivate = function () {
        this.view.findById('a').classList.remove(Styles.ACTIVE);
    };
    return TreeNavItem;
}(wml_runtime_1.Component));
exports.TreeNavItem = TreeNavItem;
/**
 * TreeNav provides an api for displaying a tree of links.
 */
var TreeNav = /** @class */ (function (_super) {
    __extends(TreeNav, _super);
    function TreeNav() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new tree_nav_1.TreeNavView(_this);
        return _this;
    }
    TreeNav.prototype.handleEvent = function (e) {
        this.children.forEach(function (c) {
            if (c instanceof HTMLElement)
                if (c !== e.target)
                    c.classList.remove(Styles.ACTIVE);
        });
    };
    TreeNav.prototype.rendered = function () {
        var _this = this;
        this.children.forEach(function (c) { return c.addEventListener('click', _this); });
    };
    return TreeNav;
}(wml_runtime_1.Component));
exports.TreeNav = TreeNav;

},{"./wml/tree-nav":41,"@quenk/wml-runtime":5,"wml-widgets-common/Styles":2}],41:[function(require,module,exports){
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
var Styles = require("wml-widgets-common/Styles");
var util_1 = require("wml-widgets-common/util");
var TreeNavItemView = /** @class */ (function (_super) {
    __extends(TreeNavItemView, _super);
    function TreeNavItemView(context) {
        var _this = _super.call(this, context) || this;
        var view = _this;
        _this.template = function () {
            return wml_runtime_1.node('li', { html: { 'class': Styles.TREE_NAV_LIST_ITEM }, wml: {} }, [wml_runtime_1.node('a', { html: { 'class': (this.attributes.read('ww:active', false)) ? Styles.ACTIVE : '', 'href': this.attributes.read('ww:href', '#'), 'onclick': function function_literal_7() { return this.activate() || this.attributes.read('ww:onClick', util_1.noop)(this.attributes.read('ww:name')); }.bind(this) }, wml: { 'id': "link" } }, [wml_runtime_1.domify(this.children)], view)], view);
        };
        return _this;
    }
    return TreeNavItemView;
}(wml_runtime_1.AppView));
exports.TreeNavItemView = TreeNavItemView;
var TreeNavView = /** @class */ (function (_super) {
    __extends(TreeNavView, _super);
    function TreeNavView(context) {
        var _this = _super.call(this, context) || this;
        var view = _this;
        _this.template = function () {
            return wml_runtime_1.node('nav', { html: { 'class': Styles.TREE_NAV }, wml: { 'id': "nav" } }, [wml_runtime_1.node('ul', { html: { 'class': Styles.TREE_NAV_LIST }, wml: { 'id': "list" } }, [wml_runtime_1.domify(this.children)], view)], view);
        };
        return _this;
    }
    return TreeNavView;
}(wml_runtime_1.AppView));
exports.TreeNavView = TreeNavView;

},{"@quenk/wml-runtime":5,"wml-widgets-common/Styles":2,"wml-widgets-common/util":4}],42:[function(require,module,exports){
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

},{}],43:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Styles = require("wml-widgets-common/Styles");
var view_1 = require("./view");
var Table_1 = require("@quenk/wml-widgets/lib/components/table/Table");
var count = 0;
;
var Next = /** @class */ (function () {
    function Next(name, amount, status, watchers) {
        if (name === void 0) { name = ''; }
        if (amount === void 0) { amount = 0; }
        if (status === void 0) { status = ''; }
        if (watchers === void 0) { watchers = []; }
        this.name = name;
        this.amount = amount;
        this.status = status;
        this.watchers = watchers;
    }
    return Next;
}());
exports.Next = Next;
var fields = [
    { name: 'number', heading: 'Number' },
    { name: 'name', heading: 'Name' },
    { name: 'amount', heading: 'Amount' },
    { name: 'status', heading: 'Status' },
    { name: 'watching', heading: 'Watching' }
];
var Application = /** @class */ (function () {
    function Application() {
        this.fields = fields;
        this.tableModel = new Table_1.SortTableModel();
        this.next = new Next();
        this.records = [{ name: 'Jozain Huldum', amount: 32000, status: 'active', watchers: [] }];
        this.view = new view_1.Main(this);
    }
    Application.prototype.toggleDrawer = function () {
        this.view.findById('layout').toggleDrawer();
    };
    Application.prototype.create = function () {
        var target = document.getElementById('modal');
        this.dialog = new view_1.CreateDialog(this);
        while (target.firstChild)
            target.removeChild(target.firstChild);
        target.appendChild(this.dialog.render());
    };
    Application.prototype.save = function () {
        this.records.push(this.next);
        this.next = new Next();
        this.dialog.ids.modal.close();
        this.view.invalidate();
    };
    Application.prototype.run = function () {
        window.app = this;
        document.getElementById('main').appendChild(this.view.render());
        this.drawer = this.view.findById('layout');
    };
    Application.main = function () {
        return new this();
    };
    return Application;
}());
var app;
app = Application.main();
app.run();
var layout = app.view.findById('layout');
var drawer = document.getElementsByClassName(Styles.DRAWER)[0];
layout.toggleDrawer();

},{"./view":44,"@quenk/wml-widgets/lib/components/table/Table":36,"wml-widgets-common/Styles":2}],44:[function(require,module,exports){
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
var components_1 = require("@quenk/wml-widgets/lib/components");
var components_2 = require("@quenk/wml-widgets/lib/components");
var components_3 = require("@quenk/wml-widgets/lib/components");
var components_4 = require("@quenk/wml-widgets/lib/components");
var components_5 = require("@quenk/wml-widgets/lib/components");
var components_6 = require("@quenk/wml-widgets/lib/components");
var CreateDialog = /** @class */ (function (_super) {
    __extends(CreateDialog, _super);
    function CreateDialog(context) {
        var _this = _super.call(this, context) || this;
        var view = _this;
        _this.template = function () {
            return wml_runtime_1.widget(components_5.Modal, {
                html: {},
                wml: {
                    'id': "modal"
                }
            }, [wml_runtime_1.widget(components_5.ModalHeader, {
                    html: {},
                    wml: {},
                    ww: {
                        'onClose': function function_literal_1() {
                            return this.dialog.ids.modal.close();
                        }.bind(this)
                    }
                }, [wml_runtime_1.text("\n      Create record\n    ")], view), wml_runtime_1.widget(components_5.ModalBody, {
                    html: {},
                    wml: {}
                }, [wml_runtime_1.widget(components_6.Input, {
                        html: {},
                        wml: {},
                        ww: {
                            'id': "name",
                            'label': "Name",
                            'onInput': function function_literal_2(e) {
                                return this.next.name = e.target.value;
                            }.bind(this)
                        }
                    }, [], view), wml_runtime_1.widget(components_6.Input, {
                        html: {},
                        wml: {},
                        ww: {
                            'id': "amount",
                            'label': "Amount",
                            'warn': "Don't over do it!",
                            'type': "number",
                            'onInput': function function_literal_3(e) {
                                return this.next.amount = Number(e.target.value);
                            }.bind(this)
                        }
                    }, [], view), wml_runtime_1.widget(components_6.Select, {
                        html: {},
                        wml: {},
                        ww: {
                            'id': "status",
                            'label': "Status",
                            'options': ['paid', 'overdue', 'history'],
                            'onInput': function function_literal_4(e) {
                                return this.next.status = e.target.value;
                            }.bind(this)
                        }
                    }, [], view), wml_runtime_1.node('span', {
                        html: {},
                        wml: {}
                    }, [wml_runtime_1.text(" Receive Notifications? ")], view), wml_runtime_1.widget(components_6.Switch, {
                        html: {},
                        wml: {},
                        ww: {
                            'onChange': function function_literal_5(e) {
                                return (e.target.value) ? this.next.watchers.push(1) : null;
                            }.bind(this)
                        }
                    }, [], view)], view), wml_runtime_1.widget(components_5.ModalFooter, {
                    html: {},
                    wml: {}
                }, [wml_runtime_1.widget(components_1.Button, {
                        html: {},
                        wml: {
                            'id': "cancelButton"
                        },
                        ww: {
                            'text': "Cancel",
                            'onClick': function function_literal_6() {
                                return this.dialog.ids.modal.close();
                            }.bind(this)
                        }
                    }, [], view), wml_runtime_1.widget(components_1.Button, {
                        html: {},
                        wml: {
                            'id': "saveButton"
                        },
                        ww: {
                            'style': "-danger",
                            'text': "Save",
                            'class': "-right",
                            'onClick': this.save.bind(this)
                        }
                    }, [], view)], view)], view);
        };
        return _this;
    }
    return CreateDialog;
}(wml_runtime_1.AppView));
exports.CreateDialog = CreateDialog;
function navigation(view) {
    return wml_runtime_1.node('p', {
        html: {},
        wml: {}
    }, [wml_runtime_1.text("This is in the drawer")], view);
}
exports.navigation = navigation;
function content(view) {
    return wml_runtime_1.box(wml_runtime_1.widget(components_1.ActionArea, {
        html: {},
        wml: {
            'id': "actions"
        }
    }, [wml_runtime_1.widget(components_1.MenuButton, {
            html: {},
            wml: {},
            ww: {
                'onClick': this.toggleDrawer.bind(this)
            }
        }, [], view), wml_runtime_1.widget(components_1.ButtonGroup, {
            html: {},
            wml: {},
            ww: {
                'class': "-right"
            }
        }, [wml_runtime_1.widget(components_1.Button, {
                html: {},
                wml: {
                    'id': "disabledButton"
                },
                ww: {
                    'style': "-default",
                    'text': "Disabled",
                    'disabled': true
                }
            }, [], view), wml_runtime_1.widget(components_1.Button, {
                html: {},
                wml: {
                    'id': "createButton"
                },
                ww: {
                    'style': "-danger",
                    'text': "Create",
                    'onClick': this.create.bind(this)
                }
            }, [], view)], view)], view), wml_runtime_1.widget(components_1.MainView, {
        html: {},
        wml: {
            'id': "main"
        }
    }, [wml_runtime_1.widget(components_2.Container, {
            html: {},
            wml: {}
        }, [wml_runtime_1.widget(components_2.Row, {
                html: {},
                wml: {}
            }, [wml_runtime_1.widget(components_2.Column, {
                    html: {},
                    wml: {}
                }, [wml_runtime_1.widget(components_4.Panel, {
                        html: {},
                        wml: {},
                        ww: {
                            'style': "-info"
                        }
                    }, [wml_runtime_1.widget(components_4.PanelHeader, {
                            html: {},
                            wml: {}
                        }, [wml_runtime_1.text("Details")], view), wml_runtime_1.widget(components_4.PanelBody, {
                            html: {},
                            wml: {}
                        }, [wml_runtime_1.text("Records:")], view), wml_runtime_1.widget(components_3.Table, {
                            html: {},
                            wml: {},
                            ww: {
                                'fields': this.fields,
                                'data': this.records,
                                'model': this.tableModel
                            }
                        }, [], view), wml_runtime_1.widget(components_4.PanelFooter, {
                            html: {},
                            wml: {}
                        }, [wml_runtime_1.domify(this.records.reduce(function function_literal_7(p, c) {
                                return p + c.amount;
                            }.bind(this), 0))], view)], view)], view)], view)], view)], view));
}
exports.content = content;
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(context) {
        var _this = _super.call(this, context) || this;
        var view = _this;
        _this.template = function () {
            return wml_runtime_1.widget(components_1.DrawerLayout, {
                html: {},
                wml: {
                    'id': "layout"
                },
                ww: {
                    'drawer': navigation,
                    'content': content.bind(this)
                }
            }, [], view);
        };
        return _this;
    }
    return Main;
}(wml_runtime_1.AppView));
exports.Main = Main;

},{"@quenk/wml-runtime":5,"@quenk/wml-widgets/lib/components":23}]},{},[43])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJsaWIvY29tcG9uZW50cy93bWwtd2lkZ2V0cy1jb21tb24vQ29udGFpbmVyLmpzIiwibGliL2NvbXBvbmVudHMvd21sLXdpZGdldHMtY29tbW9uL1N0eWxlcy5qcyIsImxpYi9jb21wb25lbnRzL3dtbC13aWRnZXRzLWNvbW1vbi9pbmRleC5qcyIsImxpYi9jb21wb25lbnRzL3dtbC13aWRnZXRzLWNvbW1vbi91dGlsLmpzIiwibm9kZV9tb2R1bGVzL0BxdWVuay93bWwtcnVudGltZS9zcmMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL2FjdGlvbi1hcmVhL0FjdGlvbkFyZWEuanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL2FjdGlvbi1hcmVhL3dtbC9hY3Rpb25fYXJlYS5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvYnJlYWRjcnVtYnMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL2JyZWFkY3J1bWJzL3dtbC9icmVhZGNydW1icy5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvYnVzeS1pbmRpY2F0b3IvQnVzeUluZGljYXRvci5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvYnVzeS1pbmRpY2F0b3Ivd21sL2J1c3lfaW5kaWNhdG9yLmpzIiwibm9kZV9tb2R1bGVzL0BxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50cy9idXR0b24vQnV0dG9uLmpzIiwibm9kZV9tb2R1bGVzL0BxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50cy9idXR0b24vd21sL2J1dHRvbi5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvY2FyZC9DYXJkLmpzIiwibm9kZV9tb2R1bGVzL0BxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50cy9jYXJkL3dtbC9jYXJkLmpzIiwibm9kZV9tb2R1bGVzL0BxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50cy9kcmF3ZXItbGF5b3V0L0RyYXdlckxheW91dC5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvZHJhd2VyLWxheW91dC93bWwvZHJhd2VyLWxheW91dC5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvZHJhd2VyL0RyYXdlci5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvZHJhd2VyL3dtbC9kcmF3ZXIuanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL2ZyYWdtZW50L0ZyYWdtZW50LmpzIiwibm9kZV9tb2R1bGVzL0BxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50cy9ncmlkL0dyaWQuanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL2dyaWQvd21sL2dyaWQuanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL0BxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50cy9pbnB1dC9JbnB1dC5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvaW5wdXQvd21sL2lucHV0LmpzIiwibm9kZV9tb2R1bGVzL0BxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50cy9tYWluLXZpZXcvTWFpblZpZXcuanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL21haW4tdmlldy93bWwvbWFpbi12aWV3LmpzIiwibm9kZV9tb2R1bGVzL0BxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50cy9tZW51LWJ1dHRvbi9NZW51QnV0dG9uLmpzIiwibm9kZV9tb2R1bGVzL0BxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50cy9tZW51LWJ1dHRvbi93bWwvbWVudV9idXR0b24uanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL21vZGFsL01vZGFsLmpzIiwibm9kZV9tb2R1bGVzL0BxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50cy9tb2RhbC93bWwvbW9kYWwuanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL3BhbmVsL1BhbmVsLmpzIiwibm9kZV9tb2R1bGVzL0BxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50cy9wYW5lbC93bWwvcGFuZWwuanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL3N3aXRjaC9Td2l0Y2guanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL3N3aXRjaC93bWwvc3dpdGNoLmpzIiwibm9kZV9tb2R1bGVzL0BxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50cy90YWJsZS9UYWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvdGFibGUvd21sL3RhYmxlLmpzIiwibm9kZV9tb2R1bGVzL0BxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50cy90YWJzL1RhYnMuanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL3RhYnMvd21sL3RhYnMuanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL3RyZWUtbmF2L1RyZWVOYXYuanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL3RyZWUtbmF2L3dtbC90cmVlLW5hdi5qcyIsIm5vZGVfbW9kdWxlcy9wcm9wZXJ0eS1zZWVrL2luZGV4LmpzIiwidGVzdC9hcHAvYXBwLmpzIiwidGVzdC9hcHAvdmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDelBBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3REQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3REQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB3bWxfcnVudGltZV8xID0gcmVxdWlyZShcIkBxdWVuay93bWwtcnVudGltZVwiKTtcbi8qKlxuICogQ29udGFpbmVyIGlzIGFuIGFic3RyYWN0IGNsYXNzIGltcGxlbWVudGluZyB3aWRnZXRzXG4gKiB0aGF0IGhvbGQgY29udGVudCBhcyB0aGVpciBwcmltYXJ5IHB1cnBvc2Ugc3VjaFxuICogYXMgYSBEcmF3ZXJMYXlvdXQgb3IgYW4gb2JqZWN0IGZvcm0gJ2dyaWQnLlxuICovXG52YXIgQ29udGFpbmVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhDb250YWluZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQ29udGFpbmVyKCkge1xuICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIHNldENvbnRlbnQgY2hhbmdlcyB0aGUgY29udGVudCB2YWx1ZS5cbiAgICAgKi9cbiAgICBDb250YWluZXIucHJvdG90eXBlLnNldENvbnRlbnQgPSBmdW5jdGlvbiAoY29udGVudCkge1xuICAgICAgICB2YXIgcm9vdCA9IHRoaXMudmlldy5maW5kQnlJZCgncm9vdCcpO1xuICAgICAgICB2YXIgcGFyZW50ID0gcm9vdC5wYXJlbnROb2RlO1xuICAgICAgICBpZiAoIXJvb3QpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5jb25zdHJ1Y3Rvci5uYW1lICsgXCIjc2V0Q29udGVudDpcIiArXG4gICAgICAgICAgICAgICAgXCJDYW5ub3Qgc2V0IGNvbnRlbnQgb2YgYSB3aWRnZXQgXCIgK1xuICAgICAgICAgICAgICAgIFwidGhhdCBoYXMgbm8gcm9vdCBpbiBpdCdzIHRlbXBsYXRlIVwiKTtcbiAgICAgICAgaWYgKCFwYXJlbnQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5jb25zdHJ1Y3Rvci5uYW1lICsgXCIjc2V0Q29udGVudDpcIiArXG4gICAgICAgICAgICAgICAgXCJDYW5ub3Qgc2V0IGNvbnRlbnQgb2YgYSB3aWRnZXQgd2l0aCBubyBwYXJlbnQhXCIpO1xuICAgICAgICB0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xuICAgICAgICBwYXJlbnQucmVwbGFjZUNoaWxkKHRoaXMucmVuZGVyKCksIHJvb3QpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIHJlbW92ZUNvbnRlbnQgcmVtb3ZlcyBleGlzdGluZyBjb250ZW50LlxuICAgICAqL1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUucmVtb3ZlQ29udGVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5jb250ZW50ID0gbnVsbDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICByZXR1cm4gQ29udGFpbmVyO1xufSh3bWxfcnVudGltZV8xLkNvbXBvbmVudCkpO1xuZXhwb3J0cy5Db250YWluZXIgPSBDb250YWluZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Db250YWluZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkhJRERFTiA9ICctaGlkZGVuJztcbmV4cG9ydHMuRElTQUJMRUQgPSAnLWRpc2FibGVkJztcbmV4cG9ydHMuT04gPSAnLW9uJztcbmV4cG9ydHMuT0ZGID0gJy1vZmYnO1xuZXhwb3J0cy5TUEFDRUQgPSAnLXNwYWNlZCc7XG5leHBvcnRzLkRFRkFVTFQgPSAnLWRlZmF1bHQnO1xuZXhwb3J0cy5QUklNQVJZID0gJy1wcmltYXJ5JztcbmV4cG9ydHMuU1VDQ0VTUyA9ICctc3VjY2Vzcyc7XG5leHBvcnRzLklORk8gPSAnLWluZm8nO1xuZXhwb3J0cy5XQVJOSU5HID0gJy13YXJuaW5nJztcbmV4cG9ydHMuREFOR0VSID0gJy1kYW5nZXInO1xuZXhwb3J0cy5MQVJHRSA9ICctbGFyZ2UnO1xuZXhwb3J0cy5TTUFMTCA9ICctc21hbGwnO1xuZXhwb3J0cy5FWFRSQV9TTUFMTCA9ICctZXh0cmEtc21hbGwnO1xuZXhwb3J0cy5BQ1RJVkUgPSAnYWN0aXZlJzsgLy9AdG9kbzogcmVmYWN0b3IgdG8gZmxhZyBzeW50YXhcbmV4cG9ydHMuRFJBV0VSX0xBWU9VVCA9ICd3dy1kcmF3ZXItbGF5b3V0JztcbmV4cG9ydHMuRFJBV0VSID0gJ3d3LWRyYXdlcic7XG5leHBvcnRzLkRSQVdFUl9DT05URU5UID0gJ3d3LWRyYXdlcl9fY29udGVudCc7XG5leHBvcnRzLkRSQVdFUl9QVVNIQUJMRSA9ICctZHJhd2VyLXB1c2hhYmxlJztcbmV4cG9ydHMuRFJBV0VSX1BVU0hBQkxFX0ZJWEVEID0gJy1kcmF3ZXItcHVzaGFibGUtZml4ZWQnO1xuZXhwb3J0cy5BQ1RJT05fQVJFQSA9ICd3dy1hY3Rpb24tYXJlYSc7XG5leHBvcnRzLkFDVElPTl9BUkVBX0NPTlRFTlQgPSAnd3ctYWN0aW9uLWFyZWFfX2NvbnRlbnQnO1xuZXhwb3J0cy5NQUlOX1ZJRVcgPSAnd3ctbWFpbi12aWV3JztcbmV4cG9ydHMuTUVOVV9CVVRUT04gPSAnd3ctbWVudS1idXR0b24nO1xuZXhwb3J0cy5CVVRUT04gPSAnd3ctYnV0dG9uJztcbmV4cG9ydHMuQlVUVE9OX0dST1VQID0gJ3d3LWJ1dHRvbi1ncm91cCc7XG4vL0B0b2RvOiByZWZhY3RvciB0aGlzIHRvIGJlIGlubGluZSB3aXRoIG90aGVyIGNsYXNzIG5hbWVzXG5leHBvcnRzLkdSSURfQ09OVEFJTkVSID0gJ2NvbnRhaW5lci1mbHVpZCc7XG5leHBvcnRzLkdSSURfQ09MVU1OID0gJyc7XG5leHBvcnRzLkdSSURfUk9XID0gJ3Jvdyc7XG5leHBvcnRzLlBBTkVMID0gJ3d3LXBhbmVsJztcbmV4cG9ydHMuUEFORUxfSEVBREVSID0gJ3d3LXBhbmVsX19oZWFkZXInO1xuZXhwb3J0cy5QQU5FTF9CT0RZID0gJ3d3LXBhbmVsX19ib2R5JztcbmV4cG9ydHMuUEFORUxfRk9PVEVSID0gJ3d3LXBhbmVsX19mb290ZXInO1xuZXhwb3J0cy5NT0RBTCA9ICd3dy1tb2RhbCc7XG5leHBvcnRzLk1PREFMX0RJQUxPRyA9ICd3dy1tb2RhbF9fZGlhbG9nJztcbmV4cG9ydHMuTU9EQUxfQ09OVEVOVCA9ICd3dy1tb2RhbF9fY29udGVudCc7XG5leHBvcnRzLk1PREFMX0hFQURFUiA9ICd3dy1tb2RhbF9faGVhZGVyJztcbmV4cG9ydHMuTU9EQUxfQk9EWSA9ICd3dy1tb2RhbF9fYm9keSc7XG5leHBvcnRzLk1PREFMX0ZPT1RFUiA9ICd3dy1tb2FkbF9fZm9vdGVyJztcbmV4cG9ydHMuRk9STV9HUk9VUCA9ICdmb3JtLWdyb3VwJztcbmV4cG9ydHMuQ09OVFJPTF9MQUJFTCA9ICdjb250cm9sLWxhYmVsJztcbmV4cG9ydHMuSU5QVVQgPSAnZm9ybS1jb250cm9sJztcbmV4cG9ydHMuVEVYVEFSRUEgPSAnZm9ybS1jb250cm9sJztcbmV4cG9ydHMuU0VMRUNUID0gJ2Zvcm0tY29udHJvbCc7XG5leHBvcnRzLlRBQlMgPSAnbmF2IG5hdi10YWJzJzsgLy9AdG9kbyB1bi1ib290c3RyYXBcbmV4cG9ydHMuU1dJVENIID0gJ3d3LXN3aXRjaCc7XG5leHBvcnRzLlNXSVRDSF9TTElERVIgPSAnd3ctc3dpdGNoX19zbGlkZXInO1xuZXhwb3J0cy5UQUJMRSA9ICd0YWJsZSc7IC8vQHRvZG8gdW4tYm9vdHN0cmFwXG5leHBvcnRzLlRSRUVfTkFWID0gJ3RyZWUtbmF2JztcbmV4cG9ydHMuVFJFRV9OQVZfTElTVCA9ICd0cmVlLW5hdl9fbGlzdCc7XG5leHBvcnRzLlRSRUVfTkFWX0xJU1RfSVRFTSA9ICd0cmVlLW5hdl9faXRlbSc7XG5leHBvcnRzLkJSRUFEX0NSVU1CUyA9ICdicmVhZGNydW1iJzsgLy9AdG9kbyB1bi1ib290c3RyYXBcbmV4cG9ydHMuQlJFQURfQ1JVTUJTX0NSVU1CID0gZXhwb3J0cy5CUkVBRF9DUlVNQlMgKyBcIl9fY3J1bWJcIjtcbmV4cG9ydHMuQVVUT0NPTVBMRVRFID0gJ3dhdC1raXQtYXV0b2NvbXBsZXRlJztcbmV4cG9ydHMuQVVUT0NPTVBMRVRFX0NPTlRBSU5FUiA9ICd3YXQta2l0LWF1dG9jb21wbGV0ZS1jb250YWluZXInO1xuZXhwb3J0cy5BVVRPQ09NUExFVEVfSU5QVVRfQVJFQSA9ICd3YXQta2l0LWF1dG9jb21wbGV0ZS1pbnB1dC1hcmVhJztcbmV4cG9ydHMuQVVUT0NPTVBMRVRFX0lOUFVUID0gJ3dhdC1raXQtYXV0b2NvbXBsZXRlLWlucHV0JztcbmV4cG9ydHMuQVVUT0NPTVBMRVRFX09QVElPTlMgPSAnd2F0LWtpdC1hdXRvY29tcGxldGUtb3B0aW9ucyc7XG5leHBvcnRzLkFVVE9DT01QTEVURV9JVEVNX1dSQVBQRVIgPSAnd2F0LWtpdC1hdXRvLWNvbXBsZXRlLWl0ZW0td3JhcHBlcic7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1TdHlsZXMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgdXRpbCA9IHJlcXVpcmUoXCIuL3V0aWxcIik7XG5leHBvcnRzLnV0aWwgPSB1dGlsO1xudmFyIFN0eWxlcyA9IHJlcXVpcmUoXCIuL1N0eWxlc1wiKTtcbmV4cG9ydHMuU3R5bGVzID0gU3R5bGVzO1xudmFyIENvbnRhaW5lcl8xID0gcmVxdWlyZShcIi4vQ29udGFpbmVyXCIpO1xuZXhwb3J0cy5Db250YWluZXIgPSBDb250YWluZXJfMS5Db250YWluZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogY29tYmluZSB0aGUgbWVtYmVycyBvZiBhbiBhcnJheSBpbnRvIG9uZSBzdHJpbmcuXG4gKi9cbmV4cG9ydHMuY29tYmluZSA9IGZ1bmN0aW9uIChzdHIsIGpvaW5lcikge1xuICAgIGlmIChqb2luZXIgPT09IHZvaWQgMCkgeyBqb2luZXIgPSAnICc7IH1cbiAgICByZXR1cm4gc3RyLmZpbHRlcihmdW5jdGlvbiAocykgeyByZXR1cm4gKChzICE9IG51bGwpIHx8IHMgIT0gJycpOyB9KS5qb2luKGpvaW5lcik7XG59O1xuLyoqXG4gKiBub29wXG4gKi9cbmV4cG9ydHMubm9vcCA9IGZ1bmN0aW9uICgpIHsgfTtcbi8qKlxuICogcmVhZCBhIHZhbHVlIGZyb20gdGhlIGNvbnRleHQgYXR0cmlidXRlc1xuICovXG5leHBvcnRzLnJlYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIF8gPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICBfW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmF0dHJpYnV0ZXMucmVhZC5hcHBseSh0aGlzLmF0dHJpYnV0ZXMsIGFyZ3VtZW50cyk7XG59O1xuLyoqXG4gKiByZXBsYWNlQ29udGVudFxuICovXG5leHBvcnRzLnJlcGxhY2VDb250ZW50ID0gZnVuY3Rpb24gKHIsIG5vZGUpIHtcbiAgICB3aGlsZSAobm9kZS5sYXN0Q2hpbGQpXG4gICAgICAgIG5vZGUucmVtb3ZlQ2hpbGQobm9kZS5sYXN0Q2hpbGQpO1xuICAgIG5vZGUuYXBwZW5kQ2hpbGQoci5yZW5kZXIoKSk7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dXRpbC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBwcm9wZXJ0eV9zZWVrXzEgPSByZXF1aXJlKFwicHJvcGVydHktc2Vla1wiKTtcbjtcbnZhciBDb21wb25lbnQgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbXBvbmVudChhdHRyaWJ1dGVzLCBjaGlsZHJlbikge1xuICAgICAgICB0aGlzLmF0dHJpYnV0ZXMgPSBhdHRyaWJ1dGVzO1xuICAgICAgICB0aGlzLmNoaWxkcmVuID0gY2hpbGRyZW47XG4gICAgfVxuICAgIENvbXBvbmVudC5wcm90b3R5cGUucmVuZGVyZWQgPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgQ29tcG9uZW50LnByb3RvdHlwZS5yZW1vdmVkID0gZnVuY3Rpb24gKCkgeyB9O1xuICAgIENvbXBvbmVudC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy52aWV3LnJlbmRlcigpOyB9O1xuICAgIHJldHVybiBDb21wb25lbnQ7XG59KCkpO1xuZXhwb3J0cy5Db21wb25lbnQgPSBDb21wb25lbnQ7XG47XG4vKipcbiAqIEF0dHJpYnV0ZXMgcHJvdmlkZXMgYW4gQVBJIGZvciByZWFkaW5nIHRoZVxuICogYXR0cmlidXRlcyBzdXBwbGllZCB0byBhbiBFbGVtZW50LlxuICovXG52YXIgQXR0cmlidXRlcyA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQXR0cmlidXRlcyhhdHRycykge1xuICAgICAgICB0aGlzLmF0dHJzID0gYXR0cnM7XG4gICAgfVxuICAgIEF0dHJpYnV0ZXMucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uIChwYXRoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlYWQocGF0aCwgbnVsbCkgIT0gbnVsbDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIHJlYWQgYSB2YWx1ZSBmb3JtIHRoZSBpbnRlcm5hbCBsaXN0LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoXG4gICAgICogQHBhcmFtIHsqfSBkZWZhdWx0VmFsdWUgLSBUaGlzIHZhbHVlIGlzIHJldHVybmVkIGlmIHRoZSB2YWx1ZSBpcyBub3Qgc2V0LlxuICAgICAqL1xuICAgIEF0dHJpYnV0ZXMucHJvdG90eXBlLnJlYWQgPSBmdW5jdGlvbiAocGF0aCwgZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgIHZhciByZXQgPSBwcm9wZXJ0eV9zZWVrXzEuZGVmYXVsdChwYXRoLnNwbGl0KCc6Jykuam9pbignLicpLCB0aGlzLmF0dHJzKTtcbiAgICAgICAgcmV0dXJuIChyZXQgIT0gbnVsbCkgPyByZXQgOiAoZGVmYXVsdFZhbHVlICE9IG51bGwpID8gZGVmYXVsdFZhbHVlIDogJyc7XG4gICAgfTtcbiAgICByZXR1cm4gQXR0cmlidXRlcztcbn0oKSk7XG5leHBvcnRzLkF0dHJpYnV0ZXMgPSBBdHRyaWJ1dGVzO1xudmFyIGFkb3B0ID0gZnVuY3Rpb24gKGNoaWxkLCBlKSB7XG4gICAgLy8gaWYgKGNoaWxkIGluc3RhbmNlb2YgQXJyYXkpXG4gICAgLy8gcmV0dXJuIGNoaWxkLmZvckVhY2goaW5uZXJDaGlsZCA9PiBhZG9wdChpbm5lckNoaWxkLCBlKSk7XG4gICAgc3dpdGNoICh0eXBlb2YgY2hpbGQpIHtcbiAgICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgICAgICBlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnICsgY2hpbGQpKTtcbiAgICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgICAgIGUuYXBwZW5kQ2hpbGQoY2hpbGQpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2FuIG5vdCBhZG9wdCBjaGlsZCBcIiArIGNoaWxkICsgXCIgb2YgdHlwZSBcIiArIHR5cGVvZiBjaGlsZCk7XG4gICAgfVxufTtcbmV4cG9ydHMuYm94ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBjb250ZW50ID0gW107XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgY29udGVudFtfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgIH1cbiAgICB2YXIgZnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICBjb250ZW50LmZvckVhY2goZnVuY3Rpb24gKGMpIHsgcmV0dXJuIGZyYWcuYXBwZW5kQ2hpbGQoYyk7IH0pO1xuICAgIHJldHVybiBmcmFnO1xufTtcbmV4cG9ydHMuZG9taWZ5ID0gZnVuY3Rpb24gKGEpIHtcbiAgICBpZiAoYSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIHJldHVybiBleHBvcnRzLmJveC5hcHBseShudWxsLCBhLm1hcChleHBvcnRzLmRvbWlmeSkpO1xuICAgIH1cbiAgICBlbHNlIGlmICgodHlwZW9mIGEgPT09ICdzdHJpbmcnKSB8fFxuICAgICAgICAodHlwZW9mIGEgPT09ICdudW1iZXInKSB8fFxuICAgICAgICAodHlwZW9mIGEgPT09ICdib29sZWFuJykpIHtcbiAgICAgICAgcmV0dXJuIGV4cG9ydHMudGV4dChhKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoYSBpbnN0YW5jZW9mIE5vZGUpIHtcbiAgICAgICAgcmV0dXJuIGE7XG4gICAgfVxuICAgIGVsc2UgaWYgKGEgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gX2VtcHR5O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbiBub3QgdXNlICdcIiArIGEgKyBcIicodHlwZW9mIFwiICsgdHlwZW9mIGEgKyBcIikgYXMgQ29udGVudCFcIik7XG4gICAgfVxufTtcbnZhciBfZW1wdHkgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5leHBvcnRzLmVtcHR5ID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gX2VtcHR5OyB9O1xuLyoqXG4gKiB0ZXh0XG4gKi9cbmV4cG9ydHMudGV4dCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJyArIHZhbHVlKTtcbn07XG4vKipcbiAqIHJlc29sdmUgcHJvcGVydHkgYWNjZXNzIGV4cHJlc3Npb24gdG8gYXZvaWRcbiAqIHRob3dpbmcgZXJyb3JzIGlmIGl0IGRvZXMgbm90IGV4aXN0LlxuICovXG5leHBvcnRzLnJlc29sdmUgPSBmdW5jdGlvbiAoaGVhZCwgcGF0aCkge1xuICAgIGlmICgoaGVhZCA9PSBudWxsKSB8fCBoZWFkID09ICcnKVxuICAgICAgICByZXR1cm4gJyc7XG4gICAgdmFyIHJldCA9IHByb3BlcnR5X3NlZWtfMS5kZWZhdWx0KHBhdGgsIGhlYWQpO1xuICAgIHJldHVybiAocmV0ID09IG51bGwpID8gJycgOiByZXQ7XG59O1xuLyoqXG4gKiBub2RlIGlzIGNhbGxlZCB0byBjcmVhdGUgYSByZWd1bGFyIERPTSBub2RlXG4gKi9cbmV4cG9ydHMubm9kZSA9IGZ1bmN0aW9uICh0YWcsIGF0dHJpYnV0ZXMsIGNoaWxkcmVuLCB2aWV3KSB7XG4gICAgdmFyIGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XG4gICAgaWYgKHR5cGVvZiBhdHRyaWJ1dGVzWydodG1sJ10gPT09ICdvYmplY3QnKVxuICAgICAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzWydodG1sJ10pLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgdmFyIHZhbHVlID0gYXR0cmlidXRlc1snaHRtbCddW2tleV07XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgZVtrZXldID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlICE9PSAnJylcbiAgICAgICAgICAgICAgICAgICAgZS5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgICAgIGUuc2V0QXR0cmlidXRlKGtleSwgXCJcIiArIHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoYykgeyByZXR1cm4gYWRvcHQoYywgZSk7IH0pO1xuICAgIHZhciBpZCA9IGF0dHJpYnV0ZXNbJ3dtbCddLmlkO1xuICAgIHZhciBncm91cCA9IGF0dHJpYnV0ZXMud21sLmdyb3VwO1xuICAgIGlmIChpZClcbiAgICAgICAgdmlldy5yZWdpc3RlcihpZCwgZSk7XG4gICAgaWYgKGdyb3VwKVxuICAgICAgICB2aWV3LnJlZ2lzdGVyR3JvdXAoZ3JvdXAsIGUpO1xuICAgIHJldHVybiBlO1xufTtcbi8qKlxuICogd2lkZ2V0IGNyZWF0ZXMgYSB3bWwgd2lkZ2V0LlxuICogQHBhcmFtIHtmdW5jdGlvbn0gQ29uc3RydXRvclxuICogQHBhcmFtIHtvYmplY3R9IGF0dHJpYnV0ZXNcbiAqIEBwYXJhbSB7YXJyYXk8c3RyaW5nfG51bWJlcnxXaWRnZXQ+fSBjaGlsZHJlblxuICogQHBhcmFtIHtWaWV3fSB2aWV3XG4gKiBAcmV0dXJuIHtXaWRnZXR9XG4gKi9cbmV4cG9ydHMud2lkZ2V0ID0gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBhdHRyaWJ1dGVzLCBjaGlsZHJlbiwgdmlldykge1xuICAgIHZhciBjaGlsZHMgPSBbXTtcbiAgICB2YXIgdztcbiAgICBjaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChjaGlsZCkgeyByZXR1cm4gKGNoaWxkIGluc3RhbmNlb2YgQXJyYXkpID9cbiAgICAgICAgY2hpbGRzLnB1c2guYXBwbHkoY2hpbGRzLCBjaGlsZCkgOiBjaGlsZHMucHVzaChjaGlsZCk7IH0pO1xuICAgIHcgPSBuZXcgQ29uc3RydWN0b3IobmV3IEF0dHJpYnV0ZXMoYXR0cmlidXRlcyksIGNoaWxkcyk7XG4gICAgdmFyIGlkID0gYXR0cmlidXRlcy53bWwuaWQ7XG4gICAgdmFyIGdyb3VwID0gYXR0cmlidXRlcy53bWwuZ3JvdXA7XG4gICAgaWYgKGlkKVxuICAgICAgICB2aWV3LnJlZ2lzdGVyKGlkLCB3KTtcbiAgICBpZiAoZ3JvdXApXG4gICAgICAgIHZpZXcucmVnaXN0ZXJHcm91cChncm91cCwgdyk7XG4gICAgdmlldy53aWRnZXRzLnB1c2godyk7XG4gICAgcmV0dXJuIHcucmVuZGVyKCk7XG59O1xuLyoqXG4gKiBpZkUgcHJvdmlkZXMgYW4gaWYgdGhlbiBleHByZXNzaW9uXG4gKi9cbmV4cG9ydHMuaWZFID0gZnVuY3Rpb24gKHByZWRpY2F0ZSwgcG9zaXRpdmUsIG5lZ2F0aXZlKSB7XG4gICAgcmV0dXJuIChwcmVkaWNhdGUpID8gcG9zaXRpdmUoKSA6IG5lZ2F0aXZlKCk7XG59O1xuLyoqXG4gKiBmb3JFIHByb3ZpZGVzIGEgZm9yIGV4cHJlc3Npb25cbiAqL1xuZXhwb3J0cy5mb3JFID0gZnVuY3Rpb24gKGNvbGxlY3Rpb24sIGNiLCBjYjIpIHtcbiAgICB2YXIgZnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICBpZiAoY29sbGVjdGlvbiBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIGlmIChjb2xsZWN0aW9uLmxlbmd0aCA+IDApXG4gICAgICAgICAgICBjb2xsZWN0aW9uLmZvckVhY2goZnVuY3Rpb24gKHYsIGssIGEpIHsgcmV0dXJuIGZyYWcuYXBwZW5kQ2hpbGQoY2IodiwgaywgYSkpOyB9KTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgZnJhZy5hcHBlbmRDaGlsZChjYjIoKSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBjb2xsZWN0aW9uID09PSAnb2JqZWN0Jykge1xuICAgICAgICB2YXIgbCA9IE9iamVjdC5rZXlzKGNvbGxlY3Rpb24pO1xuICAgICAgICBpZiAobC5sZW5ndGggPiAwKVxuICAgICAgICAgICAgbC5mb3JFYWNoKGZ1bmN0aW9uIChrKSB7IHJldHVybiBmcmFnLmFwcGVuZENoaWxkKGNiKGNvbGxlY3Rpb25ba10sIGssIGNvbGxlY3Rpb24pKTsgfSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGZyYWcuYXBwZW5kQ2hpbGQoY2IyKCkpO1xuICAgIH1cbiAgICByZXR1cm4gZnJhZztcbn07XG4vKipcbiAqIHN3aXRjaEUgc2ltdWxhdGVzIGEgc3dpdGNoIHN0YXRlbWVudFxuICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfGJvb2xlYW59IHZhbHVlXG4gKiBAcGFyYW0ge29iamVjdH0gY2FzZXNcbiAqL1xuZXhwb3J0cy5zd2l0Y2hFID0gZnVuY3Rpb24gKHZhbHVlLCBjYXNlcykge1xuICAgIHZhciByZXN1bHQgPSBjYXNlc1t2YWx1ZV07XG4gICAgdmFyIGRlZmF1bCA9IGNhc2VzWydkZWZhdWx0J107XG4gICAgaWYgKHJlc3VsdClcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICBpZiAoZGVmYXVsKVxuICAgICAgICByZXR1cm4gZGVmYXVsO1xufTtcbnZhciBBcHBWaWV3ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBBcHBWaWV3KGNvbnRleHQpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICAgICAgdGhpcy5pZHMgPSB7fTtcbiAgICAgICAgdGhpcy5ncm91cHMgPSB7fTtcbiAgICAgICAgdGhpcy53aWRnZXRzID0gW107XG4gICAgfVxuICAgIEFwcFZpZXcucHJvdG90eXBlLnJlZ2lzdGVyID0gZnVuY3Rpb24gKGlkLCB3KSB7XG4gICAgICAgIGlmICh0aGlzLmlkcy5oYXNPd25Qcm9wZXJ0eShpZCkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJEdXBsaWNhdGUgaWQgJ1wiICsgaWQgKyBcIicgZGV0ZWN0ZWQhXCIpO1xuICAgICAgICB0aGlzLmlkc1tpZF0gPSB3O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIEFwcFZpZXcucHJvdG90eXBlLnJlZ2lzdGVyR3JvdXAgPSBmdW5jdGlvbiAoZ3JvdXAsIGUpIHtcbiAgICAgICAgdGhpcy5ncm91cHNbZ3JvdXBdID0gdGhpcy5ncm91cHNbZ3JvdXBdIHx8IFtdO1xuICAgICAgICB0aGlzLmdyb3Vwc1tncm91cF0ucHVzaChlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBBcHBWaWV3LnByb3RvdHlwZS5maW5kQnlJZCA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICByZXR1cm4gKHRoaXMuaWRzW2lkXSkgPyB0aGlzLmlkc1tpZF0gOiBudWxsO1xuICAgIH07XG4gICAgQXBwVmlldy5wcm90b3R5cGUuZmluZEdyb3VwQnlOYW1lID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmdyb3Vwcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkgPyB0aGlzLmdyb3Vwc1tuYW1lXSA6IFtdO1xuICAgIH07XG4gICAgQXBwVmlldy5wcm90b3R5cGUuaW52YWxpZGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNoaWxkcztcbiAgICAgICAgdmFyIHJlYWxGaXJzdENoaWxkO1xuICAgICAgICB2YXIgcmVhbEZpcnN0Q2hpbGRJbmRleDtcbiAgICAgICAgdmFyIHRyZWUgPSAodGhpcy5fZnJhZ1Jvb3QpID8gdGhpcy5fZnJhZ1Jvb3QgOiB0aGlzLnRyZWU7XG4gICAgICAgIHZhciBwYXJlbnQgPSB0cmVlLnBhcmVudE5vZGU7XG4gICAgICAgIGlmICh0cmVlID09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoJ0Nhbm5vdCBpbnZhbGlkYXRlIGEgdmlldyB0aGF0IGhhcyBub3QgYmVlbiByZW5kZXJlZCEnKTtcbiAgICAgICAgaWYgKHRyZWUucGFyZW50Tm9kZSA9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKCdBdHRlbXB0IHRvIGludmFsaWRhdGUgYSB2aWV3IHRoYXQgaGFzIG5vdCBiZWVuIGluc2VydGVkIHRvIERPTSEnKTtcbiAgICAgICAgY2hpbGRzID0gdHJlZS5wYXJlbnROb2RlLmNoaWxkcmVuO1xuICAgICAgICAvL2ZvciBzb21lIHJlYXNvbiB0aGUgcmVmZXJlbmNlIHN0b3JlZCBkb2VzIG5vdCBoYXZlIHRoZSBjb3JyZWN0IHBhcmVudCBub2RlLlxuICAgICAgICAvL3dlIGRvIHRoaXMgdG8gZ2V0IGEgJ2xpdmUnIHZlcnNpb24gb2YgdGhlIG5vZGUuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRzLmxlbmd0aDsgaSsrKVxuICAgICAgICAgICAgaWYgKGNoaWxkc1tpXSA9PT0gdHJlZSkge1xuICAgICAgICAgICAgICAgIHJlYWxGaXJzdENoaWxkID0gY2hpbGRzW2ldO1xuICAgICAgICAgICAgICAgIHJlYWxGaXJzdENoaWxkSW5kZXggPSBpO1xuICAgICAgICAgICAgfVxuICAgICAgICBwYXJlbnQucmVwbGFjZUNoaWxkKHRoaXMucmVuZGVyKCksIHJlYWxGaXJzdENoaWxkKTtcbiAgICB9O1xuICAgIEFwcFZpZXcucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5pZHMgPSB7fTtcbiAgICAgICAgdGhpcy53aWRnZXRzLmZvckVhY2goZnVuY3Rpb24gKHcpIHsgcmV0dXJuIHcucmVtb3ZlZCgpOyB9KTtcbiAgICAgICAgdGhpcy53aWRnZXRzID0gW107XG4gICAgICAgIHRoaXMuX2ZyYWdSb290ID0gbnVsbDtcbiAgICAgICAgdGhpcy50cmVlID0gdGhpcy50ZW1wbGF0ZS5jYWxsKHRoaXMuY29udGV4dCk7XG4gICAgICAgIHRoaXMuaWRzWydyb290J10gPSAodGhpcy5pZHNbJ3Jvb3QnXSkgPyB0aGlzLmlkc1sncm9vdCddIDogdGhpcy50cmVlO1xuICAgICAgICBpZiAodGhpcy50cmVlLm5vZGVOYW1lID09PSAoZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpKS5ub2RlTmFtZSlcbiAgICAgICAgICAgIHRoaXMuX2ZyYWdSb290ID0gdGhpcy50cmVlLmZpcnN0Q2hpbGQ7XG4gICAgICAgIHRoaXMud2lkZ2V0cy5mb3JFYWNoKGZ1bmN0aW9uICh3KSB7IHJldHVybiB3LnJlbmRlcmVkKCk7IH0pO1xuICAgICAgICByZXR1cm4gdGhpcy50cmVlO1xuICAgIH07XG4gICAgcmV0dXJuIEFwcFZpZXc7XG59KCkpO1xuZXhwb3J0cy5BcHBWaWV3ID0gQXBwVmlldztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgY29tbW9uID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vblwiKTtcbnZhciBhY3Rpb25fYXJlYV8xID0gcmVxdWlyZShcIi4vd21sL2FjdGlvbl9hcmVhXCIpO1xuLyoqXG4gKiBBY3Rpb25BcmVhXG4gKi9cbnZhciBBY3Rpb25BcmVhID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhBY3Rpb25BcmVhLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEFjdGlvbkFyZWEoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IGFjdGlvbl9hcmVhXzEuTWFpbihfdGhpcyk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIEFjdGlvbkFyZWE7XG59KGNvbW1vbi5Db250YWluZXIpKTtcbmV4cG9ydHMuQWN0aW9uQXJlYSA9IEFjdGlvbkFyZWE7XG5leHBvcnRzLmRlZmF1bHQgPSBBY3Rpb25BcmVhO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QWN0aW9uQXJlYS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHdtbF9ydW50aW1lXzEgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC1ydW50aW1lXCIpO1xudmFyIFN0eWxlcyA9IHJlcXVpcmUoXCJ3bWwtd2lkZ2V0cy1jb21tb24vU3R5bGVzXCIpO1xudmFyIHV0aWxfMSA9IHJlcXVpcmUoXCJ3bWwtd2lkZ2V0cy1jb21tb24vdXRpbFwiKTtcbnZhciBNYWluID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhNYWluLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIE1haW4oY29udGV4dCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBjb250ZXh0KSB8fCB0aGlzO1xuICAgICAgICB2YXIgdmlldyA9IF90aGlzO1xuICAgICAgICBfdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB3bWxfcnVudGltZV8xLm5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiB1dGlsXzEuY29tYmluZShbU3R5bGVzLkFDVElPTl9BUkVBLCBTdHlsZXMuRFJBV0VSX1BVU0hBQkxFX0ZJWEVEXSkgfSwgd21sOiB7fSB9LCBbd21sX3J1bnRpbWVfMS5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogU3R5bGVzLkFDVElPTl9BUkVBX0NPTlRFTlQgfSwgd21sOiB7ICdpZCc6IFwiY29udGVudFwiIH0gfSwgW3dtbF9ydW50aW1lXzEuZG9taWZ5KHRoaXMuY2hpbGRyZW4pXSwgdmlldyldLCB2aWV3KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gTWFpbjtcbn0od21sX3J1bnRpbWVfMS5BcHBWaWV3KSk7XG5leHBvcnRzLk1haW4gPSBNYWluO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YWN0aW9uX2FyZWEuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB3bWxfcnVudGltZV8xID0gcmVxdWlyZShcIkBxdWVuay93bWwtcnVudGltZVwiKTtcbnZhciBsYXlvdXQgPSByZXF1aXJlKFwiLi93bWwvYnJlYWRjcnVtYnNcIik7XG47XG4vKipcbiAqIEJyZWFkQ3J1bWJcbiAqL1xudmFyIEJyZWFkQ3J1bWJzID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhCcmVhZENydW1icywgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBCcmVhZENydW1icygpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnZpZXcgPSBuZXcgbGF5b3V0LkJyZWFkQ3J1bWJzKF90aGlzKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gQnJlYWRDcnVtYnM7XG59KHdtbF9ydW50aW1lXzEuQ29tcG9uZW50KSk7XG5leHBvcnRzLkJyZWFkQ3J1bWJzID0gQnJlYWRDcnVtYnM7XG4vKipcbiAqIENydW1iXG4gKi9cbnZhciBDcnVtYiA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQ3J1bWIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQ3J1bWIoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IGxheW91dC5DcnVtYihfdGhpcyk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIENydW1iO1xufSh3bWxfcnVudGltZV8xLkNvbXBvbmVudCkpO1xuZXhwb3J0cy5DcnVtYiA9IENydW1iO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB3bWxfcnVudGltZV8xID0gcmVxdWlyZShcIkBxdWVuay93bWwtcnVudGltZVwiKTtcbnZhciB1dGlsXzEgPSByZXF1aXJlKFwid21sLXdpZGdldHMtY29tbW9uL3V0aWxcIik7XG52YXIgU3R5bGVzID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi9TdHlsZXNcIik7XG52YXIgQnJlYWRDcnVtYnMgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEJyZWFkQ3J1bWJzLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEJyZWFkQ3J1bWJzKGNvbnRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29udGV4dCkgfHwgdGhpcztcbiAgICAgICAgdmFyIHZpZXcgPSBfdGhpcztcbiAgICAgICAgX3RoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCdvbCcsIHsgaHRtbDogeyAnY2xhc3MnOiB1dGlsXzEuY29tYmluZShbU3R5bGVzLkJSRUFEX0NSVU1CUywgdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmNsYXNzJyldKSB9LCB3bWw6IHt9IH0sIFt3bWxfcnVudGltZV8xLmRvbWlmeSh0aGlzLmNoaWxkcmVuKV0sIHZpZXcpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBCcmVhZENydW1icztcbn0od21sX3J1bnRpbWVfMS5BcHBWaWV3KSk7XG5leHBvcnRzLkJyZWFkQ3J1bWJzID0gQnJlYWRDcnVtYnM7XG52YXIgQ3J1bWIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKENydW1iLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIENydW1iKGNvbnRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29udGV4dCkgfHwgdGhpcztcbiAgICAgICAgdmFyIHZpZXcgPSBfdGhpcztcbiAgICAgICAgX3RoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCdsaScsIHsgaHRtbDogeyAnY2xhc3MnOiB1dGlsXzEuY29tYmluZShbU3R5bGVzLkJSRUFEX0NSVU1CU19DUlVNQiwgdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmNsYXNzJyldKSB9LCB3bWw6IHt9IH0sIFt3bWxfcnVudGltZV8xLm5vZGUoJ2EnLCB7IGh0bWw6IHsgJ2NsYXNzJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmFuY2hvckNsYXNzJywgbnVsbCksICdvbkNsaWNrJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3Om9uQ2xpY2snLCBudWxsKSwgJ2hyZWYnOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6aHJlZicpIH0sIHdtbDoge30gfSwgW3dtbF9ydW50aW1lXzEuZG9taWZ5KHRoaXMuY2hpbGRyZW4pXSwgdmlldyldLCB2aWV3KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gQ3J1bWI7XG59KHdtbF9ydW50aW1lXzEuQXBwVmlldykpO1xuZXhwb3J0cy5DcnVtYiA9IENydW1iO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YnJlYWRjcnVtYnMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB3bWxfcnVudGltZV8xID0gcmVxdWlyZShcIkBxdWVuay93bWwtcnVudGltZVwiKTtcbnZhciBidXN5X2luZGljYXRvcl8xID0gcmVxdWlyZShcIi4vd21sL2J1c3lfaW5kaWNhdG9yXCIpO1xuLyoqXG4gKiBCdXN5SW5kaWNhdG9yIHByb3ZpZGVzIGEgJ2hhbWJ1cmdlcicgbWVudSBidXR0b24uXG4gKi9cbnZhciBCdXN5SW5kaWNhdG9yID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhCdXN5SW5kaWNhdG9yLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEJ1c3lJbmRpY2F0b3IoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IGJ1c3lfaW5kaWNhdG9yXzEuTWFpbihfdGhpcyk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIEJ1c3lJbmRpY2F0b3I7XG59KHdtbF9ydW50aW1lXzEuQ29tcG9uZW50KSk7XG5leHBvcnRzLkJ1c3lJbmRpY2F0b3IgPSBCdXN5SW5kaWNhdG9yO1xuZXhwb3J0cy5kZWZhdWx0ID0gQnVzeUluZGljYXRvcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUJ1c3lJbmRpY2F0b3IuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB3bWxfcnVudGltZV8xID0gcmVxdWlyZShcIkBxdWVuay93bWwtcnVudGltZVwiKTtcbnZhciBNYWluID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhNYWluLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIE1haW4oY29udGV4dCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBjb250ZXh0KSB8fCB0aGlzO1xuICAgICAgICB2YXIgdmlldyA9IF90aGlzO1xuICAgICAgICBfdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB3bWxfcnVudGltZV8xLm5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiBcImxvYWRpbmdcIiB9LCB3bWw6IHt9IH0sIFtdLCB2aWV3KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gTWFpbjtcbn0od21sX3J1bnRpbWVfMS5BcHBWaWV3KSk7XG5leHBvcnRzLk1haW4gPSBNYWluO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YnVzeV9pbmRpY2F0b3IuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBjb21tb24gPSByZXF1aXJlKFwid21sLXdpZGdldHMtY29tbW9uXCIpO1xudmFyIHZpZXdzID0gcmVxdWlyZShcIi4vd21sL2J1dHRvblwiKTtcbnZhciBTdHlsZXMgPSByZXF1aXJlKFwid21sLXdpZGdldHMtY29tbW9uL1N0eWxlc1wiKTtcbi8qKlxuICogR3JvdXAgbXVsdGlwbGUgYnV0dG9ucyBpbnRvIG9uZSBlbGVtZW50LlxuICovXG52YXIgR3JvdXAgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEdyb3VwLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEdyb3VwKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMudmlldyA9IG5ldyB2aWV3cy5Hcm91cChfdGhpcyk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgR3JvdXAucHJvdG90eXBlLmdldENsYXNzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbGlzdCA9IFtTdHlsZXMuQlVUVE9OX0dST1VQXTtcbiAgICAgICAgaWYgKHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpjbGFzcycpKVxuICAgICAgICAgICAgbGlzdC5wdXNoKHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpjbGFzcycpKTtcbiAgICAgICAgaWYgKHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpzcGFjZWQnKSlcbiAgICAgICAgICAgIGxpc3QucHVzaChTdHlsZXMuU1BBQ0VEKTtcbiAgICAgICAgcmV0dXJuIGxpc3Quam9pbignICcpO1xuICAgIH07XG4gICAgcmV0dXJuIEdyb3VwO1xufShjb21tb24uQ29udGFpbmVyKSk7XG5leHBvcnRzLkdyb3VwID0gR3JvdXA7XG47XG4vKipcbiAqIEJ1dHRvbiBpcyBhbiBpbXByb3ZlbWVudCBvdmVyIEhUTUxCdXR0aW9uRWxlbWVudFxuICovXG52YXIgQnV0dG9uID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhCdXR0b24sIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQnV0dG9uKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMudmlldyA9IG5ldyB2aWV3cy5CdXR0b24oX3RoaXMpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIGRpc2FibGUgdGhpcyBidXR0b24uXG4gICAgICovXG4gICAgQnV0dG9uLnByb3RvdHlwZS5kaXNhYmxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnZpZXcuZmluZEJ5SWQoJ2J1dHRvbicpLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIGVuYWJsZSB0aGlzIGJ1dHRvbi5cbiAgICAgKi9cbiAgICBCdXR0b24ucHJvdG90eXBlLmVuYWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy52aWV3LmZpbmRCeUlkKCdidXR0b24nKS5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG4gICAgfTtcbiAgICBCdXR0b24ucHJvdG90eXBlLnJlbmRlcmVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDpkaXNhYmxlZCcpKVxuICAgICAgICAgICAgdGhpcy52aWV3LmZpbmRCeUlkKCdidXR0b24nKS5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG4gICAgfTtcbiAgICByZXR1cm4gQnV0dG9uO1xufShjb21tb24uQ29udGFpbmVyKSk7XG5leHBvcnRzLkJ1dHRvbiA9IEJ1dHRvbjtcbmV4cG9ydHMuZGVmYXVsdCA9IEJ1dHRvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUJ1dHRvbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHdtbF9ydW50aW1lXzEgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC1ydW50aW1lXCIpO1xudmFyIFN0eWxlcyA9IHJlcXVpcmUoXCJ3bWwtd2lkZ2V0cy1jb21tb24vU3R5bGVzXCIpO1xudmFyIHV0aWxfMSA9IHJlcXVpcmUoXCJ3bWwtd2lkZ2V0cy1jb21tb24vdXRpbFwiKTtcbnZhciBfMSA9IHJlcXVpcmUoXCIuLi8uLi9cIik7XG52YXIgR3JvdXAgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEdyb3VwLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEdyb3VwKGNvbnRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29udGV4dCkgfHwgdGhpcztcbiAgICAgICAgdmFyIHZpZXcgPSBfdGhpcztcbiAgICAgICAgX3RoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogdGhpcy5nZXRDbGFzcygpLCAncm9sZSc6IFwiZ3JvdXBcIiB9LCB3bWw6IHt9IH0sIFt3bWxfcnVudGltZV8xLmRvbWlmeSh0aGlzLmNoaWxkcmVuKV0sIHZpZXcpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBHcm91cDtcbn0od21sX3J1bnRpbWVfMS5BcHBWaWV3KSk7XG5leHBvcnRzLkdyb3VwID0gR3JvdXA7XG52YXIgQnV0dG9uID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhCdXR0b24sIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQnV0dG9uKGNvbnRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29udGV4dCkgfHwgdGhpcztcbiAgICAgICAgdmFyIHZpZXcgPSBfdGhpcztcbiAgICAgICAgX3RoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gd21sX3J1bnRpbWVfMS53aWRnZXQoXzEuRnJhZ21lbnQsIHsgaHRtbDoge30sIHdtbDoge30gfSwgW3dtbF9ydW50aW1lXzEuaWZFKHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpocmVmJyksIGZ1bmN0aW9uIGlmMCgpIHsgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgnYScsIHsgaHRtbDogeyAnaHJlZic6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpocmVmJyksICdjbGFzcyc6IHV0aWxfMS5jb21iaW5lKFtTdHlsZXMuQlVUVE9OLCB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6dmFyaWFudCcsICcnKSwgdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OnNpemUnLCAnJyksIHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpzdHlsZScsIFN0eWxlcy5ERUZBVUxUKSwgdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmNsYXNzJyldKSwgJ29uY2xpY2snOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6b25DbGljaycsIHV0aWxfMS5ub29wKSB9LCB3bWw6IHsgJ2lkJzogXCJidXR0b25cIiB9IH0sIFt3bWxfcnVudGltZV8xLmRvbWlmeSh0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6dGV4dCcpKSwgd21sX3J1bnRpbWVfMS5kb21pZnkodGhpcy5jaGlsZHJlbildLCB2aWV3KTsgfS5iaW5kKHRoaXMpLCBmdW5jdGlvbiBlbHNlX2NsYXVzZTAoKSB7IHJldHVybiB3bWxfcnVudGltZV8xLm5vZGUoJ2J1dHRvbicsIHsgaHRtbDogeyAndHlwZSc6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzp0eXBlJywgJ2J1dHRvbicpLCAnbmFtZSc6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpuYW1lJywgJycpLCAnZGlzYWJsZWQnOiAodGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmRpc2FibGVkJykpID8gXCJ0cnVlXCIgOiBudWxsLCAnY2xhc3MnOiB1dGlsXzEuY29tYmluZShbU3R5bGVzLkJVVFRPTiwgdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OnZhcmlhbnQnLCAnJyksIHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpzaXplJywgJycpLCB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6c3R5bGUnLCBTdHlsZXMuREVGQVVMVCksIHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpjbGFzcycpXSksICdvbmNsaWNrJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3Om9uQ2xpY2snLCB1dGlsXzEubm9vcCkgfSwgd21sOiB7ICdpZCc6IFwiYnV0dG9uXCIgfSB9LCBbd21sX3J1bnRpbWVfMS5kb21pZnkodGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OnRleHQnKSksIHdtbF9ydW50aW1lXzEuZG9taWZ5KHRoaXMuY2hpbGRyZW4pXSwgdmlldyk7IH0uYmluZCh0aGlzKSldLCB2aWV3KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gQnV0dG9uO1xufSh3bWxfcnVudGltZV8xLkFwcFZpZXcpKTtcbmV4cG9ydHMuQnV0dG9uID0gQnV0dG9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YnV0dG9uLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgd21sX3J1bnRpbWVfMSA9IHJlcXVpcmUoXCJAcXVlbmsvd21sLXJ1bnRpbWVcIik7XG52YXIgbGF5b3V0ID0gcmVxdWlyZShcIi4vd21sL2NhcmRcIik7XG47XG4vKipcbiAqIENhcmRcbiAqL1xudmFyIENhcmQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKENhcmQsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQ2FyZCgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnZpZXcgPSBuZXcgbGF5b3V0LkNhcmQoX3RoaXMpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBDYXJkO1xufSh3bWxfcnVudGltZV8xLkNvbXBvbmVudCkpO1xuZXhwb3J0cy5DYXJkID0gQ2FyZDtcbi8qKlxuICogQ2FyZEJvZHlcbiAqL1xudmFyIENhcmRCb2R5ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhDYXJkQm9keSwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBDYXJkQm9keSgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnZpZXcgPSBuZXcgbGF5b3V0LkNhcmRCb2R5KF90aGlzKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gQ2FyZEJvZHk7XG59KHdtbF9ydW50aW1lXzEuQ29tcG9uZW50KSk7XG5leHBvcnRzLkNhcmRCb2R5ID0gQ2FyZEJvZHk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1DYXJkLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgd21sX3J1bnRpbWVfMSA9IHJlcXVpcmUoXCJAcXVlbmsvd21sLXJ1bnRpbWVcIik7XG52YXIgdXRpbF8xID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi91dGlsXCIpO1xudmFyIENhcmQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKENhcmQsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQ2FyZChjb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbnRleHQpIHx8IHRoaXM7XG4gICAgICAgIHZhciB2aWV3ID0gX3RoaXM7XG4gICAgICAgIF90aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6IHV0aWxfMS5jb21iaW5lKFtcImNhcmRcIiwgdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmNsYXNzJyldKSB9LCB3bWw6IHt9IH0sIFt3bWxfcnVudGltZV8xLmRvbWlmeSh0aGlzLmNoaWxkcmVuKV0sIHZpZXcpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBDYXJkO1xufSh3bWxfcnVudGltZV8xLkFwcFZpZXcpKTtcbmV4cG9ydHMuQ2FyZCA9IENhcmQ7XG52YXIgQ2FyZEJvZHkgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKENhcmRCb2R5LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIENhcmRCb2R5KGNvbnRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29udGV4dCkgfHwgdGhpcztcbiAgICAgICAgdmFyIHZpZXcgPSBfdGhpcztcbiAgICAgICAgX3RoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogdXRpbF8xLmNvbWJpbmUoW1wiY2FyZC1ib2R5XCIsIHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpjbGFzcycpXSkgfSwgd21sOiB7fSB9LCBbd21sX3J1bnRpbWVfMS5kb21pZnkodGhpcy5jaGlsZHJlbildLCB2aWV3KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gQ2FyZEJvZHk7XG59KHdtbF9ydW50aW1lXzEuQXBwVmlldykpO1xuZXhwb3J0cy5DYXJkQm9keSA9IENhcmRCb2R5O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y2FyZC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGNvbW1vbiA9IHJlcXVpcmUoXCJ3bWwtd2lkZ2V0cy1jb21tb25cIik7XG52YXIgZHJhd2VyX2xheW91dF8xID0gcmVxdWlyZShcIi4vd21sL2RyYXdlci1sYXlvdXRcIik7XG47XG4vKipcbiAqIERyYXdlckxheW91dCBwcm92aWRlcyBhIHRvcCBsZXZlbCBsYXlvdXQgY29uc2lzdGluZyBvZiBhIGRyYXdlciBhbmRcbiAqIGEgbWFpbiBjb250ZW50IHZpZXcuXG4gKi9cbnZhciBEcmF3ZXJMYXlvdXQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKERyYXdlckxheW91dCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBEcmF3ZXJMYXlvdXQoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IGRyYXdlcl9sYXlvdXRfMS5NYWluKF90aGlzKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBEcmF3ZXJMYXlvdXQucHJvdG90eXBlLl9nZXREcmF3ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZpZXcuZmluZEJ5SWQoJ2RyYXdlcicpO1xuICAgIH07XG4gICAgRHJhd2VyTGF5b3V0LnByb3RvdHlwZS5fY29tYmluZSA9IGZ1bmN0aW9uIChjbGFzc2VzKSB7XG4gICAgICAgIHJldHVybiBjbGFzc2VzLmpvaW4oJyAnKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIGRyYXdlclZpc2libGUgcXVlcmllcyB3aGV0aGVyIHRoZSBEcmF3ZXIgaXMgdmlzaWJsZSBvciBub3QuXG4gICAgICovXG4gICAgRHJhd2VyTGF5b3V0LnByb3RvdHlwZS5kcmF3ZXJWaXNpYmxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0RHJhd2VyKCkudmlzaWJsZSgpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogaGlkZURyYXdlciBoaWRlcyB0aGUgZHJhd2VyLlxuICAgICAqL1xuICAgIERyYXdlckxheW91dC5wcm90b3R5cGUuaGlkZURyYXdlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldERyYXdlcigpLmhpZGUoKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIHNob3dEcmF3ZXIgc2hvd3MgdGhlIGRyYXdlclxuICAgICAqL1xuICAgIERyYXdlckxheW91dC5wcm90b3R5cGUuc2hvd0RyYXdlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldERyYXdlcigpLnNob3coKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIHRvZ2dsZSB0aGUgdmlzaWJpbGl0eSBvZiB0aGlzIERyYXdlclxuICAgICAqL1xuICAgIERyYXdlckxheW91dC5wcm90b3R5cGUudG9nZ2xlRHJhd2VyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0RHJhd2VyKCkudG9nZ2xlKCk7XG4gICAgfTtcbiAgICByZXR1cm4gRHJhd2VyTGF5b3V0O1xufShjb21tb24uQ29udGFpbmVyKSk7XG5leHBvcnRzLkRyYXdlckxheW91dCA9IERyYXdlckxheW91dDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPURyYXdlckxheW91dC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHdtbF9ydW50aW1lXzEgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC1ydW50aW1lXCIpO1xudmFyIFN0eWxlcyA9IHJlcXVpcmUoXCJ3bWwtd2lkZ2V0cy1jb21tb24vU3R5bGVzXCIpO1xudmFyIERyYXdlcl8xID0gcmVxdWlyZShcIi4uLy4uL2RyYXdlci9EcmF3ZXJcIik7XG52YXIgTWFpbiA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoTWFpbiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBNYWluKGNvbnRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29udGV4dCkgfHwgdGhpcztcbiAgICAgICAgdmFyIHZpZXcgPSBfdGhpcztcbiAgICAgICAgX3RoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogU3R5bGVzLkRSQVdFUl9MQVlPVVQgfSwgd21sOiB7ICdpZCc6IFwiY29udGVudFwiIH0gfSwgW3dtbF9ydW50aW1lXzEud2lkZ2V0KERyYXdlcl8xLkRyYXdlciwgeyBodG1sOiB7fSwgd21sOiB7ICdpZCc6IFwiZHJhd2VyXCIgfSwgd3c6IHsgJ2NvbnRlbnQnOiB0aGlzLmF0dHJpYnV0ZXMucmVhZChcInd3OmRyYXdlclwiKSB9IH0sIFtdLCB2aWV3KSwgd21sX3J1bnRpbWVfMS5pZkUodGhpcy5jb250ZW50LCBmdW5jdGlvbiBpZjIoKSB7IHJldHVybiB3bWxfcnVudGltZV8xLmRvbWlmeSh0aGlzLmNvbnRlbnQpOyB9LmJpbmQodGhpcyksIGZ1bmN0aW9uIGVsc2VpZjAoKSB7IHJldHVybiB3bWxfcnVudGltZV8xLmlmRSh0aGlzLmF0dHJpYnV0ZXMucmVhZChcInd3OmNvbnRlbnRcIiksIGZ1bmN0aW9uIGlmMCgpIHsgcmV0dXJuIHRoaXMuYXR0cmlidXRlcy5yZWFkKFwid3cuY29udGVudFwiKS5jYWxsKHRoaXMsIHZpZXcpOyB9LmJpbmQodGhpcyksIGZ1bmN0aW9uIGVsc2VfY2xhdXNlMigpIHsgcmV0dXJuIHdtbF9ydW50aW1lXzEuZG9taWZ5KHRoaXMuY2hpbGRyZW4pOyB9LmJpbmQodGhpcykpOyB9LmJpbmQodGhpcykpXSwgdmlldyk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIE1haW47XG59KHdtbF9ydW50aW1lXzEuQXBwVmlldykpO1xuZXhwb3J0cy5NYWluID0gTWFpbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRyYXdlci1sYXlvdXQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB3bWxfcnVudGltZV8xID0gcmVxdWlyZShcIkBxdWVuay93bWwtcnVudGltZVwiKTtcbnZhciBTdHlsZXMgPSByZXF1aXJlKFwid21sLXdpZGdldHMtY29tbW9uL1N0eWxlc1wiKTtcbnZhciBkcmF3ZXJfMSA9IHJlcXVpcmUoXCIuL3dtbC9kcmF3ZXJcIik7XG47XG4vKipcbiAqIERyYXdlciBwcm92aWRlcyBhbiBhcmVhIGZvciBuYXZpZ2F0aW9uIGNvbnRlbnQuXG4gKi9cbnZhciBEcmF3ZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKERyYXdlciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBEcmF3ZXIoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IGRyYXdlcl8xLk1haW4oX3RoaXMpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIERyYXdlci5wcm90b3R5cGUuX2dldERyYXdlckRPTSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmlldy5maW5kQnlJZCgnZHJhd2VyJyk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiB2aXNpYmxlIHF1ZXJpZXMgd2hldGhlciB0aGUgRHJhd2VyIGlzIHZpc2libGUgb3Igbm90LlxuICAgICAqL1xuICAgIERyYXdlci5wcm90b3R5cGUudmlzaWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLl9nZXREcmF3ZXJET00oKS5jbGFzc0xpc3QuY29udGFpbnMoU3R5bGVzLkhJRERFTik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBoaWRlIHRoZSBkcmF3ZXIuXG4gICAgICovXG4gICAgRHJhd2VyLnByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy52aXNpYmxlKCkpXG4gICAgICAgICAgICB0aGlzLl9nZXREcmF3ZXJET00oKS5jbGFzc0xpc3QuYWRkKFN0eWxlcy5ISURERU4pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogc2hvd0RyYXdlciBzaG93cyB0aGUgZHJhd2VyXG4gICAgICovXG4gICAgRHJhd2VyLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMudmlzaWJsZSgpKVxuICAgICAgICAgICAgdGhpcy5fZ2V0RHJhd2VyRE9NKCkuY2xhc3NMaXN0LnJlbW92ZShTdHlsZXMuSElEREVOKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIHRvZ2dsZSB0aGUgdmlzaWJpbGl0eSBvZiB0aGlzIERyYXdlclxuICAgICAqL1xuICAgIERyYXdlci5wcm90b3R5cGUudG9nZ2xlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9nZXREcmF3ZXJET00oKS5jbGFzc0xpc3QudG9nZ2xlKFN0eWxlcy5ISURERU4pO1xuICAgIH07XG4gICAgcmV0dXJuIERyYXdlcjtcbn0od21sX3J1bnRpbWVfMS5Db21wb25lbnQpKTtcbmV4cG9ydHMuRHJhd2VyID0gRHJhd2VyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RHJhd2VyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgd21sX3J1bnRpbWVfMSA9IHJlcXVpcmUoXCJAcXVlbmsvd21sLXJ1bnRpbWVcIik7XG52YXIgU3R5bGVzID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi9TdHlsZXNcIik7XG52YXIgTWFpbiA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoTWFpbiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBNYWluKGNvbnRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29udGV4dCkgfHwgdGhpcztcbiAgICAgICAgdmFyIHZpZXcgPSBfdGhpcztcbiAgICAgICAgX3RoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogU3R5bGVzLkRSQVdFUiB9LCB3bWw6IHsgJ2lkJzogXCJkcmF3ZXJcIiB9IH0sIFt3bWxfcnVudGltZV8xLm5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiBTdHlsZXMuRFJBV0VSX0NPTlRFTlQgfSwgd21sOiB7fSB9LCBbd21sX3J1bnRpbWVfMS5pZkUodGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmNvbnRlbnQnKSwgZnVuY3Rpb24gaWYxKCkgeyByZXR1cm4gdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmNvbnRlbnQnKS5jYWxsKHRoaXMsIHZpZXcpOyB9LmJpbmQodGhpcyksIGZ1bmN0aW9uIGVsc2VfY2xhdXNlMSgpIHsgcmV0dXJuIHdtbF9ydW50aW1lXzEuZG9taWZ5KHRoaXMuY2hpbGRyZW4pOyB9LmJpbmQodGhpcykpXSwgdmlldyldLCB2aWV3KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gTWFpbjtcbn0od21sX3J1bnRpbWVfMS5BcHBWaWV3KSk7XG5leHBvcnRzLk1haW4gPSBNYWluO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZHJhd2VyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgd21sX3J1bnRpbWVfMSA9IHJlcXVpcmUoXCJAcXVlbmsvd21sLXJ1bnRpbWVcIik7XG52YXIgRnJhZ21lbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEZyYWdtZW50LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEZyYWdtZW50KCkge1xuICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgfVxuICAgIEZyYWdtZW50LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBmcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgICAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKGMpIHsgcmV0dXJuIGZyYWcuYXBwZW5kQ2hpbGQoYyk7IH0pO1xuICAgICAgICByZXR1cm4gZnJhZztcbiAgICB9O1xuICAgIHJldHVybiBGcmFnbWVudDtcbn0od21sX3J1bnRpbWVfMS5Db21wb25lbnQpKTtcbmV4cG9ydHMuRnJhZ21lbnQgPSBGcmFnbWVudDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUZyYWdtZW50LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgd21sX3J1bnRpbWVfMSA9IHJlcXVpcmUoXCJAcXVlbmsvd21sLXJ1bnRpbWVcIik7XG52YXIgU3R5bGVzID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi9TdHlsZXNcIik7XG52YXIgdmlld3MgPSByZXF1aXJlKFwiLi93bWwvZ3JpZFwiKTtcbjtcbi8qKlxuICogQ29udGFpbmVyXG4gKi9cbnZhciBDb250YWluZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKENvbnRhaW5lciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBDb250YWluZXIoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IHZpZXdzLkNvbnRhaW5lcihfdGhpcyk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIENvbnRhaW5lcjtcbn0od21sX3J1bnRpbWVfMS5Db21wb25lbnQpKTtcbmV4cG9ydHMuQ29udGFpbmVyID0gQ29udGFpbmVyO1xudmFyIFJvdyA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoUm93LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFJvdygpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnZpZXcgPSBuZXcgdmlld3MuUm93KF90aGlzKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gUm93O1xufSh3bWxfcnVudGltZV8xLkNvbXBvbmVudCkpO1xuZXhwb3J0cy5Sb3cgPSBSb3c7XG52YXIgQ29sdW1uID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhDb2x1bW4sIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQ29sdW1uKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMudmlldyA9IG5ldyB2aWV3cy5Db2x1bW4oX3RoaXMpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIENvbHVtbi5wcm90b3R5cGUuX2dldENsYXNzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY2xhc3NlcyA9IFtTdHlsZXMuR1JJRF9DT0xVTU5dO1xuICAgICAgICB2YXIgc2l6ZSA9IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpzaXplJywgJ21kJyk7XG4gICAgICAgIHZhciB3aWR0aCA9IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzp3aWR0aCcsIDEyKTtcbiAgICAgICAgdmFyIG9mZnNldCA9IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpvZmZzZXQnLCAwKTtcbiAgICAgICAgY2xhc3Nlcy5wdXNoKFwiY29sLVwiICsgc2l6ZSArIFwiLVwiICsgd2lkdGgpO1xuICAgICAgICBpZiAob2Zmc2V0KVxuICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKFwiY29sLVwiICsgc2l6ZSArIFwiLW9mZnNldC1cIiArIG9mZnNldCk7XG4gICAgICAgIGNsYXNzZXMucHVzaCh0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6Y2xhc3MnKSk7XG4gICAgICAgIHJldHVybiBjbGFzc2VzLmZpbHRlcihmdW5jdGlvbiAodikgeyByZXR1cm4gISh2ID09IG51bGwpOyB9KS5qb2luKCcgJyk7XG4gICAgfTtcbiAgICByZXR1cm4gQ29sdW1uO1xufSh3bWxfcnVudGltZV8xLkNvbXBvbmVudCkpO1xuZXhwb3J0cy5Db2x1bW4gPSBDb2x1bW47XG4vLyMgc291cmNlTWFwcGluZ1VSTD1HcmlkLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgd21sX3J1bnRpbWVfMSA9IHJlcXVpcmUoXCJAcXVlbmsvd21sLXJ1bnRpbWVcIik7XG52YXIgdXRpbF8xID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi91dGlsXCIpO1xudmFyIFN0eWxlcyA9IHJlcXVpcmUoXCJ3bWwtd2lkZ2V0cy1jb21tb24vU3R5bGVzXCIpO1xudmFyIENvbnRhaW5lciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQ29udGFpbmVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIENvbnRhaW5lcihjb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbnRleHQpIHx8IHRoaXM7XG4gICAgICAgIHZhciB2aWV3ID0gX3RoaXM7XG4gICAgICAgIF90aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgnc2VjdGlvbicsIHsgaHRtbDogeyAnY2xhc3MnOiB1dGlsXzEuY29tYmluZShbU3R5bGVzLkdSSURfQ09OVEFJTkVSLCB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6Y2xhc3MnLCAnJyldKSB9LCB3bWw6IHt9IH0sIFt3bWxfcnVudGltZV8xLmRvbWlmeSh0aGlzLmNoaWxkcmVuKV0sIHZpZXcpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBDb250YWluZXI7XG59KHdtbF9ydW50aW1lXzEuQXBwVmlldykpO1xuZXhwb3J0cy5Db250YWluZXIgPSBDb250YWluZXI7XG52YXIgUm93ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhSb3csIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gUm93KGNvbnRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29udGV4dCkgfHwgdGhpcztcbiAgICAgICAgdmFyIHZpZXcgPSBfdGhpcztcbiAgICAgICAgX3RoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogdXRpbF8xLmNvbWJpbmUoW1N0eWxlcy5HUklEX1JPVywgdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmNsYXNzJywgJycpXSkgfSwgd21sOiB7fSB9LCBbd21sX3J1bnRpbWVfMS5kb21pZnkodGhpcy5jaGlsZHJlbildLCB2aWV3KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gUm93O1xufSh3bWxfcnVudGltZV8xLkFwcFZpZXcpKTtcbmV4cG9ydHMuUm93ID0gUm93O1xudmFyIENvbHVtbiA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQ29sdW1uLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIENvbHVtbihjb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbnRleHQpIHx8IHRoaXM7XG4gICAgICAgIHZhciB2aWV3ID0gX3RoaXM7XG4gICAgICAgIF90aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6IHRoaXMuX2dldENsYXNzKCkgfSwgd21sOiB7fSB9LCBbd21sX3J1bnRpbWVfMS5kb21pZnkodGhpcy5jaGlsZHJlbildLCB2aWV3KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gQ29sdW1uO1xufSh3bWxfcnVudGltZV8xLkFwcFZpZXcpKTtcbmV4cG9ydHMuQ29sdW1uID0gQ29sdW1uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Z3JpZC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB0YWJsZSA9IHJlcXVpcmUoXCIuL3RhYmxlL1RhYmxlXCIpO1xuZXhwb3J0cy50YWJsZSA9IHRhYmxlO1xuLyoganNoaW50IGlnbm9yZTpzdGFydCAqL1xuLypcbmV4cG9ydCBCcmVhZENydW1iTWVudSBmcm9tICcuL2JyZWFkY3J1bWJzL0JyZWFkQ3J1bWJNZW51JztcbmV4cG9ydCBCcmVhZENydW1iIGZyb20gJy4vYnJlYWRjcnVtYnMvQnJlYWRDcnVtYic7XG5leHBvcnQgQXV0b2NvbXBsZXRlIGZyb20gJy4vYXV0b2NvbXBsZXRlL0F1dG9jb21wbGV0ZSc7XG5leHBvcnQgSnVtYm90cm9uIGZyb20gJy4vanVtYm90cm9uL0p1bWJvdHJvbic7XG5leHBvcnQgV2VsbCBmcm9tICcuL3dlbGwvV2VsbCc7XG5leHBvcnQgTGlzdEdyb3VwIGZyb20gJy4vbGlzdC1ncm91cC9MaXN0R3JvdXAnO1xuZXhwb3J0IExpc3RHcm91cEl0ZW0gZnJvbSAnLi9saXN0LWdyb3VwL0xpc3RHcm91cEl0ZW0nO1xuZXhwb3J0IFNlYXJjaCBmcm9tICcuL3NlYXJjaC9TZWFyY2gnO1xuKi9cbnZhciBicmVhZGNydW1ic18xID0gcmVxdWlyZShcIi4vYnJlYWRjcnVtYnNcIik7XG5leHBvcnRzLkJyZWFkQ3J1bWJzID0gYnJlYWRjcnVtYnNfMS5CcmVhZENydW1icztcbmV4cG9ydHMuQ3J1bWIgPSBicmVhZGNydW1ic18xLkNydW1iO1xudmFyIEZyYWdtZW50XzEgPSByZXF1aXJlKFwiLi9mcmFnbWVudC9GcmFnbWVudFwiKTtcbmV4cG9ydHMuRnJhZ21lbnQgPSBGcmFnbWVudF8xLkZyYWdtZW50O1xudmFyIERyYXdlckxheW91dF8xID0gcmVxdWlyZShcIi4vZHJhd2VyLWxheW91dC9EcmF3ZXJMYXlvdXRcIik7XG5leHBvcnRzLkRyYXdlckxheW91dCA9IERyYXdlckxheW91dF8xLkRyYXdlckxheW91dDtcbnZhciBEcmF3ZXJfMSA9IHJlcXVpcmUoXCIuL2RyYXdlci9EcmF3ZXJcIik7XG5leHBvcnRzLkRyYXdlciA9IERyYXdlcl8xLkRyYXdlcjtcbnZhciBBY3Rpb25BcmVhXzEgPSByZXF1aXJlKFwiLi9hY3Rpb24tYXJlYS9BY3Rpb25BcmVhXCIpO1xuZXhwb3J0cy5BY3Rpb25BcmVhID0gQWN0aW9uQXJlYV8xLkFjdGlvbkFyZWE7XG52YXIgTWFpblZpZXdfMSA9IHJlcXVpcmUoXCIuL21haW4tdmlldy9NYWluVmlld1wiKTtcbmV4cG9ydHMuTWFpblZpZXcgPSBNYWluVmlld18xLk1haW5WaWV3O1xudmFyIE1lbnVCdXR0b25fMSA9IHJlcXVpcmUoXCIuL21lbnUtYnV0dG9uL01lbnVCdXR0b25cIik7XG5leHBvcnRzLk1lbnVCdXR0b24gPSBNZW51QnV0dG9uXzEuTWVudUJ1dHRvbjtcbnZhciBCdXR0b25fMSA9IHJlcXVpcmUoXCIuL2J1dHRvbi9CdXR0b25cIik7XG5leHBvcnRzLkJ1dHRvbiA9IEJ1dHRvbl8xLkJ1dHRvbjtcbmV4cG9ydHMuQnV0dG9uR3JvdXAgPSBCdXR0b25fMS5Hcm91cDtcbnZhciBHcmlkXzEgPSByZXF1aXJlKFwiLi9ncmlkL0dyaWRcIik7XG5leHBvcnRzLkNvbnRhaW5lciA9IEdyaWRfMS5Db250YWluZXI7XG5leHBvcnRzLlJvdyA9IEdyaWRfMS5Sb3c7XG5leHBvcnRzLkNvbHVtbiA9IEdyaWRfMS5Db2x1bW47XG52YXIgUGFuZWxfMSA9IHJlcXVpcmUoXCIuL3BhbmVsL1BhbmVsXCIpO1xuZXhwb3J0cy5QYW5lbCA9IFBhbmVsXzEuUGFuZWw7XG5leHBvcnRzLlBhbmVsSGVhZGVyID0gUGFuZWxfMS5IZWFkZXI7XG5leHBvcnRzLlBhbmVsQm9keSA9IFBhbmVsXzEuQm9keTtcbmV4cG9ydHMuUGFuZWxGb290ZXIgPSBQYW5lbF8xLkZvb3RlcjtcbnZhciBNb2RhbF8xID0gcmVxdWlyZShcIi4vbW9kYWwvTW9kYWxcIik7XG5leHBvcnRzLk1vZGFsID0gTW9kYWxfMS5Nb2RhbDtcbmV4cG9ydHMuTW9kYWxIZWFkZXIgPSBNb2RhbF8xLkhlYWRlcjtcbmV4cG9ydHMuTW9kYWxCb2R5ID0gTW9kYWxfMS5Cb2R5O1xuZXhwb3J0cy5Nb2RhbEZvb3RlciA9IE1vZGFsXzEuRm9vdGVyO1xudmFyIElucHV0XzEgPSByZXF1aXJlKFwiLi9pbnB1dC9JbnB1dFwiKTtcbmV4cG9ydHMuSW5wdXQgPSBJbnB1dF8xLklucHV0O1xuZXhwb3J0cy5TZWxlY3QgPSBJbnB1dF8xLlNlbGVjdDtcbnZhciBTd2l0Y2hfMSA9IHJlcXVpcmUoXCIuL3N3aXRjaC9Td2l0Y2hcIik7XG5leHBvcnRzLlN3aXRjaCA9IFN3aXRjaF8xLlN3aXRjaDtcbnZhciBUYWJsZV8xID0gcmVxdWlyZShcIi4vdGFibGUvVGFibGVcIik7XG5leHBvcnRzLlRhYmxlID0gVGFibGVfMS5UYWJsZTtcbmV4cG9ydHMuU29ydFRhYmxlTW9kZWwgPSBUYWJsZV8xLlNvcnRUYWJsZU1vZGVsO1xudmFyIFRhYnNfMSA9IHJlcXVpcmUoXCIuL3RhYnMvVGFic1wiKTtcbmV4cG9ydHMuVGFiID0gVGFic18xLlRhYjtcbmV4cG9ydHMuVGFicyA9IFRhYnNfMS5UYWJzO1xudmFyIEJ1c3lJbmRpY2F0b3JfMSA9IHJlcXVpcmUoXCIuL2J1c3ktaW5kaWNhdG9yL0J1c3lJbmRpY2F0b3JcIik7XG5leHBvcnRzLkJ1c3lJbmRpY2F0b3IgPSBCdXN5SW5kaWNhdG9yXzEuQnVzeUluZGljYXRvcjtcbnZhciBUcmVlTmF2XzEgPSByZXF1aXJlKFwiLi90cmVlLW5hdi9UcmVlTmF2XCIpO1xuZXhwb3J0cy5UcmVlTmF2ID0gVHJlZU5hdl8xLlRyZWVOYXY7XG5leHBvcnRzLlRyZWVOYXZJdGVtID0gVHJlZU5hdl8xLlRyZWVOYXZJdGVtO1xudmFyIENhcmRfMSA9IHJlcXVpcmUoXCIuL2NhcmQvQ2FyZFwiKTtcbmV4cG9ydHMuQ2FyZCA9IENhcmRfMS5DYXJkO1xuZXhwb3J0cy5DYXJkQm9keSA9IENhcmRfMS5DYXJkQm9keTtcbi8qIGpzaGludCBpZ25vcmU6ZW5kICovXG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHdtbF9ydW50aW1lXzEgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC1ydW50aW1lXCIpO1xudmFyIHV0aWxfMSA9IHJlcXVpcmUoXCJ3bWwtd2lkZ2V0cy1jb21tb24vdXRpbFwiKTtcbnZhciBpbnB1dF8xID0gcmVxdWlyZShcIi4vd21sL2lucHV0XCIpO1xudmFyIElOUFVUX1NVQ0NFU1MgPSAnaGFzLXN1Y2Nlc3MnO1xudmFyIElOUFVUX0VSUk9SID0gJ2hhcy1lcnJvcic7XG52YXIgSU5QVVRfV0FSTklORyA9ICdoYXMtd2FybmluZyc7XG52YXIgRGVmYXVsdElucHV0RGVsZWdhdGUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRGVmYXVsdElucHV0RGVsZWdhdGUoaW5wdXQpIHtcbiAgICAgICAgdGhpcy5pbnB1dCA9IGlucHV0O1xuICAgIH1cbiAgICBEZWZhdWx0SW5wdXREZWxlZ2F0ZS5wcm90b3R5cGUub25JbnB1dCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHRoaXMuaW5wdXQuYXR0cmlidXRlcy5yZWFkKCd3dzpvbklucHV0JywgdXRpbF8xLm5vb3ApKGUpO1xuICAgIH07XG4gICAgcmV0dXJuIERlZmF1bHRJbnB1dERlbGVnYXRlO1xufSgpKTtcbmV4cG9ydHMuRGVmYXVsdElucHV0RGVsZWdhdGUgPSBEZWZhdWx0SW5wdXREZWxlZ2F0ZTtcbi8qKlxuICogSW5wdXRcbiAqL1xudmFyIElucHV0ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhJbnB1dCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBJbnB1dCgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnZpZXcgPSBuZXcgaW5wdXRfMS5JbnB1dFZpZXcoX3RoaXMpO1xuICAgICAgICBfdGhpcy5kZWxlZ2F0ZSA9IF90aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6ZGVsZWdhdGUnLCBuZXcgRGVmYXVsdElucHV0RGVsZWdhdGUoX3RoaXMpKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoSW5wdXQucHJvdG90eXBlLCBcIm5hbWVcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZpZXcuaWRzLmlucHV0Lm5hbWU7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShJbnB1dC5wcm90b3R5cGUsIFwidmFsdWVcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZpZXcuaWRzLmlucHV0LnZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBJbnB1dC5wcm90b3R5cGUuaW5pdGlhbFZhbHVlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcmV0ID0gdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OnZhbHVlJyk7XG4gICAgICAgIHJldHVybiAodHlwZW9mIHJldCA9PT0gJ2Z1bmN0aW9uJykgPyByZXQodGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3Om5hbWUnKSkgOiByZXQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBnZXRDbGFzc1xuICAgICAqL1xuICAgIElucHV0LnByb3RvdHlwZS5nZXRDbGFzcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGMgPSBcImZvcm0tZ3JvdXAgXCIgKyB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6Y2xhc3MnKTtcbiAgICAgICAgaWYgKCF0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6bWVzc2FnZScpKVxuICAgICAgICAgICAgcmV0dXJuIGM7XG4gICAgICAgIHJldHVybiBjICsgXCIgXCIgKyB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6dmFyaWFudCcsICdoYXMtZXJyb3InKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIHNldE1lc3NhZ2Ugc2V0cyB0aGUgbWVzc2FnZSBmb3IgdGhlIG1lc3NhZ2UgcG9ydGlvbiBvZlxuICAgICAqIHRoaXMgaW5wdXQuXG4gICAgICovXG4gICAgSW5wdXQucHJvdG90eXBlLnNldE1lc3NhZ2UgPSBmdW5jdGlvbiAobXNnKSB7XG4gICAgICAgIGlmIChtc2cgPT09IHZvaWQgMCkgeyBtc2cgPSAnJzsgfVxuICAgICAgICB2YXIgbWVzc2FnZSA9IHRoaXMudmlldy5pZHMubWVzc2FnZTtcbiAgICAgICAgdmFyIG5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShtc2cpO1xuICAgICAgICBpZiAobWVzc2FnZS5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICBtZXNzYWdlLnJlcGxhY2VDaGlsZChub2RlLCBtZXNzYWdlLmZpcnN0Q2hpbGQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbWVzc2FnZS5hcHBlbmRDaGlsZChub2RlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogaXNGaWxsZWQgdGVsbHMgaWYgdGhpcyBJbnB1dCBoYXMgYSBmaWxsZWQgdmFsdWUuXG4gICAgICovXG4gICAgSW5wdXQucHJvdG90eXBlLmlzRmlsbGVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgaW5wdXQgPSB0aGlzLnZpZXcuaWRzLmlucHV0O1xuICAgICAgICByZXR1cm4gKChpbnB1dC52YWx1ZSAhPSBudWxsKSAmJiAoaW5wdXQudmFsdWUudHJpbSgpICE9PSAnJykpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogaXNSZXF1aXJlZCB0ZWxscyBpZiB0aGUgSW5wdXQgd2FzIHJlcXVpcmVkLlxuICAgICAqL1xuICAgIElucHV0LnByb3RvdHlwZS5pc1JlcXVpcmVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gKHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpyZXF1aXJlZCcpICE9IG51bGwpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogaXNWYWxpZCBxdWVyaWVzIHdoZXRoZXIgdGhlIElucHV0IGhhcyBiZWVuIGludmFsaWRhdGVkXG4gICAgICogb3Igbm90LlxuICAgICAqL1xuICAgIElucHV0LnByb3RvdHlwZS5pc1ZhbGlkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gKHRoaXMudmlldy5pZHMucm9vdC5jbGFzc05hbWUuc3BsaXQoJyAnKS5pbmRleE9mKElOUFVUX0VSUk9SKSA9PT0gLTEpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogcmVtb3ZlVmFsaWRhdGlvblN0YXRlIHJlbW92ZXMgdGhlIHN0YXRlIHZhbGlkYXRpb24gc3RhdGUgZnJvbSB0aGUgaW5wdXQuXG4gICAgICovXG4gICAgSW5wdXQucHJvdG90eXBlLnJlbW92ZVZhbGlkYXRpb25TdGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGggPSB0aGlzLnZpZXcuaWRzLnJvb3Q7XG4gICAgICAgIGguY2xhc3NMaXN0LnJlbW92ZShJTlBVVF9TVUNDRVNTKTtcbiAgICAgICAgaC5jbGFzc0xpc3QucmVtb3ZlKElOUFVUX0VSUk9SKTtcbiAgICAgICAgaC5jbGFzc0xpc3QucmVtb3ZlKElOUFVUX1dBUk5JTkcpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogaW52YWxpZGF0ZSB0aGlzIElucHV0IHdpdGggYW4gb3B0aW9uYWwgbWVzc2FnZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZVxuICAgICAqIEByZXR1cm5zIHtJbnB1dH1cbiAgICAgKi9cbiAgICBJbnB1dC5wcm90b3R5cGUuaW52YWxpZGF0ZSA9IGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gICAgICAgIGlmIChtZXNzYWdlID09PSB2b2lkIDApIHsgbWVzc2FnZSA9ICcnOyB9XG4gICAgICAgIHRoaXMucmVtb3ZlVmFsaWRhdGlvblN0YXRlKCk7XG4gICAgICAgIHRoaXMuc2V0TWVzc2FnZShtZXNzYWdlKTtcbiAgICAgICAgdGhpcy52aWV3Lmlkcy5yb290LmNsYXNzTGlzdC5hZGQoSU5QVVRfRVJST1IpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogdmFsaWRhdGUgdGhpcyBpbnB1dCB3aXRoIGFuIG9wdGlvbmFsIG1lc3NzYWdlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlXG4gICAgICogQHJldHVybnMge0lucHV0fVxuICAgICAqL1xuICAgIElucHV0LnByb3RvdHlwZS52YWxpZGF0ZSA9IGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gICAgICAgIGlmIChtZXNzYWdlID09PSB2b2lkIDApIHsgbWVzc2FnZSA9ICcnOyB9XG4gICAgICAgIHRoaXMucmVtb3ZlVmFsaWRhdGlvblN0YXRlKCk7XG4gICAgICAgIHRoaXMuc2V0TWVzc2FnZShtZXNzYWdlKTtcbiAgICAgICAgdGhpcy52aWV3Lmlkcy5yb290LmNsYXNzTGlzdC5hZGQoSU5QVVRfU1VDQ0VTUyk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiB3YXJuIHRoaXMgaW5wdXQgd2l0aCBhbiBvcHRpb25hbCBtZXNzYWdlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlXG4gICAgICogQHJldHVybnMge0lucHV0fVxuICAgICAqL1xuICAgIElucHV0LnByb3RvdHlwZS53YXJuID0gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcbiAgICAgICAgaWYgKG1lc3NhZ2UgPT09IHZvaWQgMCkgeyBtZXNzYWdlID0gJyc7IH1cbiAgICAgICAgdGhpcy5yZW1vdmVWYWxpZGF0aW9uU3RhdGUoKTtcbiAgICAgICAgdGhpcy5zZXRNZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgICB0aGlzLnZpZXcuaWRzLnJvb3QuY2xhc3NMaXN0LmFkZChJTlBVVF9XQVJOSU5HKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIHJlc2V0IHRoaXMgaW5wdXQgdG8gYSBjbGVhbiBzdGF0ZS5cbiAgICAgKiBSZW1vdmVzIG1lc3NhZ2VzLCB2YWxpZGF0aW9uIHN0YXRlIGV0Yy5cbiAgICAgKiBAcmV0dXJuIHtJbnB1dH1cbiAgICAgKi9cbiAgICBJbnB1dC5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciByb290ID0gdGhpcy52aWV3Lmlkcy5yb290O1xuICAgICAgICB2YXIgbSA9IHRoaXMudmlldy5pZHMubWVzc2FnZTtcbiAgICAgICAgdGhpcy5yZW1vdmVWYWxpZGF0aW9uU3RhdGUoKTtcbiAgICAgICAgd2hpbGUgKG0uZmlyc3RDaGlsZClcbiAgICAgICAgICAgIG0ucmVtb3ZlQ2hpbGQobS5maXJzdENoaWxkKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIHJlbmRlcmVkIGNoZWNrcyBpZiB0aGUgaW5wdXQgc2hvdWxkIGhhdmUgYSB2YWxpZGF0aW9uIHN0YXRlIHNldFxuICAgICAqL1xuICAgIElucHV0LnByb3RvdHlwZS5yZW5kZXJlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHZhbGlkYXRlID0gdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OnZhbGlkYXRlJyk7XG4gICAgICAgIHZhciBpbnZhbGlkYXRlID0gdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmludmFsaWRhdGUnKTtcbiAgICAgICAgdmFyIHdhcm4gPSB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6d2FybicpO1xuICAgICAgICB2YWxpZGF0ZSA/XG4gICAgICAgICAgICB0aGlzLnZhbGlkYXRlKHZhbGlkYXRlKSA6XG4gICAgICAgICAgICB3YXJuID9cbiAgICAgICAgICAgICAgICB0aGlzLndhcm4od2FybikgOlxuICAgICAgICAgICAgICAgIGludmFsaWRhdGUgP1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmludmFsaWRhdGUoaW52YWxpZGF0ZSkgOlxuICAgICAgICAgICAgICAgICAgICBudWxsO1xuICAgIH07XG4gICAgcmV0dXJuIElucHV0O1xufSh3bWxfcnVudGltZV8xLkNvbXBvbmVudCkpO1xuZXhwb3J0cy5JbnB1dCA9IElucHV0O1xudmFyIFNlbGVjdCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoU2VsZWN0LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFNlbGVjdCgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnZpZXcgPSBuZXcgaW5wdXRfMS5TZWxlY3RWaWV3KF90aGlzKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gU2VsZWN0O1xufShJbnB1dCkpO1xuZXhwb3J0cy5TZWxlY3QgPSBTZWxlY3Q7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1JbnB1dC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHdtbF9ydW50aW1lXzEgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC1ydW50aW1lXCIpO1xudmFyIFN0eWxlcyA9IHJlcXVpcmUoXCJ3bWwtd2lkZ2V0cy1jb21tb24vU3R5bGVzXCIpO1xuZnVuY3Rpb24gbGFiZWwodmlldykgeyByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCdsYWJlbCcsIHsgaHRtbDogeyAnZm9yJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmlkJyksICdjbGFzcyc6IFN0eWxlcy5DT05UUk9MX0xBQkVMIH0sIHdtbDoge30gfSwgW3dtbF9ydW50aW1lXzEuZG9taWZ5KHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpsYWJlbCcpKV0sIHZpZXcpOyB9XG5leHBvcnRzLmxhYmVsID0gbGFiZWw7XG5mdW5jdGlvbiBtZXNzYWdlKHZpZXcpIHsgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgnc3BhbicsIHsgaHRtbDogeyAnY2xhc3MnOiBcImhlbHAtYmxvY2tcIiB9LCB3bWw6IHsgJ2lkJzogXCJtZXNzYWdlXCIgfSB9LCBbd21sX3J1bnRpbWVfMS5kb21pZnkodGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3Om1lc3NhZ2UnLCAnJykpXSwgdmlldyk7IH1cbmV4cG9ydHMubWVzc2FnZSA9IG1lc3NhZ2U7XG52YXIgU2VsZWN0VmlldyA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoU2VsZWN0VmlldywgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBTZWxlY3RWaWV3KGNvbnRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29udGV4dCkgfHwgdGhpcztcbiAgICAgICAgdmFyIHZpZXcgPSBfdGhpcztcbiAgICAgICAgX3RoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogW1N0eWxlcy5GT1JNX0dST1VQLCB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6dmFyaWFudCcsICcnKV0uam9pbignLCcpIH0sIHdtbDoge30gfSwgW2xhYmVsLmNhbGwodGhpcywgdmlldyksIHdtbF9ydW50aW1lXzEubm9kZSgnc2VsZWN0JywgeyBodG1sOiB7ICdpZCc6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzppZCcsICcnKSwgJ3RpdGxlJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OnRpdGxlJyksICduYW1lJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3Om5hbWUnLCB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6aWQnLCAnJykpLCAnb25jaGFuZ2UnOiB0aGlzLmRlbGVnYXRlLm9uSW5wdXQuYmluZCh0aGlzLmRlbGVnYXRlKSwgJ3ZhbHVlJzogdGhpcy5pbml0aWFsVmFsdWUoKSwgJ2Rpc2FibGVkJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmRpc2FibGVkJywgbnVsbCksICdyZWFkb25seSc6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpyZWFkb25seScsIG51bGwpLCAnY2xhc3MnOiBTdHlsZXMuU0VMRUNUIH0sIHdtbDogeyAnaWQnOiBcImlucHV0XCIgfSB9LCBbd21sX3J1bnRpbWVfMS5mb3JFKHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpvcHRpb25zJywgW10pLCBmdW5jdGlvbiBmb3IxKG9wdCkgeyByZXR1cm4gKGZ1bmN0aW9uICgpIHsgcmV0dXJuICh0eXBlb2Ygb3B0ID09PSAnc3RyaW5nJykgPyB3bWxfcnVudGltZV8xLmJveCh3bWxfcnVudGltZV8xLm5vZGUoJ29wdGlvbicsIHsgaHRtbDoge30sIHdtbDoge30gfSwgW3dtbF9ydW50aW1lXzEuZG9taWZ5KG9wdCldLCB2aWV3KSwgd21sX3J1bnRpbWVfMS5ub2RlKCdvcHRpb24nLCB7IGh0bWw6IHt9LCB3bWw6IHt9IH0sIFt3bWxfcnVudGltZV8xLmRvbWlmeShvcHQpXSwgdmlldyksIHdtbF9ydW50aW1lXzEubm9kZSgnb3B0aW9uJywgeyBodG1sOiB7fSwgd21sOiB7fSB9LCBbd21sX3J1bnRpbWVfMS5kb21pZnkob3B0KV0sIHZpZXcpKSA6IHdtbF9ydW50aW1lXzEubm9kZSgnb3B0aW9uJywgeyBodG1sOiB7ICd2YWx1ZSc6IG9wdC52YWx1ZSB9LCB3bWw6IHt9IH0sIFt3bWxfcnVudGltZV8xLmRvbWlmeShvcHQubGFiZWwpXSwgdmlldyk7IH0pLmNhbGwodGhpcyk7IH0uYmluZCh0aGlzKSwgZnVuY3Rpb24gZm9yX290aGVyd2lzZTEoKSB7IHJldHVybiB3bWxfcnVudGltZV8xLm5vZGUoJ3AnLCB7IGh0bWw6IHt9LCB3bWw6IHt9IH0sIFtdLCB2aWV3KTsgfS5iaW5kKHRoaXMpKV0sIHZpZXcpLCBtZXNzYWdlLmNhbGwodGhpcywgdmlldyldLCB2aWV3KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gU2VsZWN0Vmlldztcbn0od21sX3J1bnRpbWVfMS5BcHBWaWV3KSk7XG5leHBvcnRzLlNlbGVjdFZpZXcgPSBTZWxlY3RWaWV3O1xudmFyIElucHV0VmlldyA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoSW5wdXRWaWV3LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIElucHV0Vmlldyhjb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbnRleHQpIHx8IHRoaXM7XG4gICAgICAgIHZhciB2aWV3ID0gX3RoaXM7XG4gICAgICAgIF90aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6IFtTdHlsZXMuRk9STV9HUk9VUCwgdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OnZhcmlhbnQnLCAnJyldLmpvaW4oJywnKSB9LCB3bWw6IHt9IH0sIFtsYWJlbC5jYWxsKHRoaXMsIHZpZXcpLCB3bWxfcnVudGltZV8xLmlmRSh0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6dHlwZScsICd0ZXh0JykgIT09ICd0ZXh0YXJlYScsIGZ1bmN0aW9uIGlmMygpIHsgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgnaW5wdXQnLCB7IGh0bWw6IHsgJ2lkJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmlkJywgJycpLCAndGl0bGUnOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6dGl0bGUnKSwgJ25hbWUnOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6bmFtZScsIHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzppZCcsICcnKSksICd0eXBlJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OnR5cGUnLCAndGV4dCcpLCAncGxhY2Vob2xkZXInOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6cGxhY2Vob2xkZXInKSwgJ29uaW5wdXQnOiB0aGlzLmRlbGVnYXRlLm9uSW5wdXQuYmluZCh0aGlzLmRlbGVnYXRlKSwgJ3ZhbHVlJzogdGhpcy5pbml0aWFsVmFsdWUoKSwgJ2Rpc2FibGVkJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmRpc2FibGVkJywgbnVsbCksICdyZWFkb25seSc6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpyZWFkb25seScsIG51bGwpLCAnY2xhc3MnOiBTdHlsZXMuSU5QVVQgfSwgd21sOiB7ICdpZCc6IFwiaW5wdXRcIiB9IH0sIFtdLCB2aWV3KTsgfS5iaW5kKHRoaXMpLCBmdW5jdGlvbiBlbHNlX2NsYXVzZTMoKSB7IHJldHVybiB3bWxfcnVudGltZV8xLm5vZGUoJ3RleHRhcmVhJywgeyBodG1sOiB7ICdpZCc6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzppZCcsICcnKSwgJ3RpdGxlJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OnRpdGxlJyksICduYW1lJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3Om5hbWUnLCB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6aWQnLCAnJykpLCAnY2xhc3MnOiBTdHlsZXMuVEVYVEFSRUEsICdwbGFjZWhvbGRlcic6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpwbGFjZWhvbGRlcicpLCAnb25pbnB1dCc6IHRoaXMuZGVsZWdhdGUub25JbnB1dC5iaW5kKHRoaXMuZGVsZWdhdGUpLCAnZGlzYWJsZWQnOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6ZGlzYWJsZWQnLCBudWxsKSwgJ3JlYWRvbmx5JzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OnJlYWRvbmx5JywgbnVsbCksICdyb3dzJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDpyb3dzJykgfSwgd21sOiB7ICdpZCc6IFwiaW5wdXRcIiB9IH0sIFt3bWxfcnVudGltZV8xLmRvbWlmeSh0aGlzLmluaXRpYWxWYWx1ZSgpKV0sIHZpZXcpOyB9LmJpbmQodGhpcykpLCBtZXNzYWdlLmNhbGwodGhpcywgdmlldyldLCB2aWV3KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gSW5wdXRWaWV3O1xufSh3bWxfcnVudGltZV8xLkFwcFZpZXcpKTtcbmV4cG9ydHMuSW5wdXRWaWV3ID0gSW5wdXRWaWV3O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5wdXQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBjb21tb24gPSByZXF1aXJlKFwid21sLXdpZGdldHMtY29tbW9uXCIpO1xudmFyIG1haW5fdmlld18xID0gcmVxdWlyZShcIi4vd21sL21haW4tdmlld1wiKTtcbi8qKlxuICogTWFpblZpZXcgcHJvdmlkZXMgYSBjb250YWluZXIgZm9yIHRoZSBtYWluIGNvbnRlbnQgb2YgYW4gYXBwbGljYXRpb24uXG4gKi9cbnZhciBNYWluVmlldyA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoTWFpblZpZXcsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gTWFpblZpZXcoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IG1haW5fdmlld18xLk1haW4oX3RoaXMpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBNYWluVmlldztcbn0oY29tbW9uLkNvbnRhaW5lcikpO1xuZXhwb3J0cy5NYWluVmlldyA9IE1haW5WaWV3O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9TWFpblZpZXcuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB3bWxfcnVudGltZV8xID0gcmVxdWlyZShcIkBxdWVuay93bWwtcnVudGltZVwiKTtcbnZhciBTdHlsZXMgPSByZXF1aXJlKFwid21sLXdpZGdldHMtY29tbW9uL1N0eWxlc1wiKTtcbnZhciB1dGlsXzEgPSByZXF1aXJlKFwid21sLXdpZGdldHMtY29tbW9uL3V0aWxcIik7XG52YXIgTWFpbiA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoTWFpbiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBNYWluKGNvbnRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29udGV4dCkgfHwgdGhpcztcbiAgICAgICAgdmFyIHZpZXcgPSBfdGhpcztcbiAgICAgICAgX3RoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogdXRpbF8xLmNvbWJpbmUoW1N0eWxlcy5NQUlOX1ZJRVcsIFN0eWxlcy5EUkFXRVJfUFVTSEFCTEUsIHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpjbGFzcycsICcnKV0pIH0sIHdtbDoge30gfSwgW3dtbF9ydW50aW1lXzEuZG9taWZ5KHRoaXMuY2hpbGRyZW4pXSwgdmlldyk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIE1haW47XG59KHdtbF9ydW50aW1lXzEuQXBwVmlldykpO1xuZXhwb3J0cy5NYWluID0gTWFpbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1haW4tdmlldy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHdtbF9ydW50aW1lXzEgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC1ydW50aW1lXCIpO1xudmFyIG1lbnVfYnV0dG9uXzEgPSByZXF1aXJlKFwiLi93bWwvbWVudV9idXR0b25cIik7XG4vKipcbiAqIE1lbnVCdXR0b24gcHJvdmlkZXMgYSAnaGFtYnVyZ2VyJyBtZW51IGJ1dHRvbi5cbiAqL1xudmFyIE1lbnVCdXR0b24gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKE1lbnVCdXR0b24sIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gTWVudUJ1dHRvbigpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnZpZXcgPSBuZXcgbWVudV9idXR0b25fMS5NYWluKF90aGlzKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gTWVudUJ1dHRvbjtcbn0od21sX3J1bnRpbWVfMS5Db21wb25lbnQpKTtcbmV4cG9ydHMuTWVudUJ1dHRvbiA9IE1lbnVCdXR0b247XG5leHBvcnRzLmRlZmF1bHQgPSBNZW51QnV0dG9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9TWVudUJ1dHRvbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHdtbF9ydW50aW1lXzEgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC1ydW50aW1lXCIpO1xudmFyIFN0eWxlID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi9TdHlsZXNcIik7XG52YXIgdXRpbF8xID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi91dGlsXCIpO1xudmFyIE1haW4gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKE1haW4sIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gTWFpbihjb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbnRleHQpIHx8IHRoaXM7XG4gICAgICAgIHZhciB2aWV3ID0gX3RoaXM7XG4gICAgICAgIF90aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgnYnV0dG9uJywgeyBodG1sOiB7ICdjbGFzcyc6IFN0eWxlLk1FTlVfQlVUVE9OLCAnb25jbGljayc6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpvbkNsaWNrJywgdXRpbF8xLm5vb3ApIH0sIHdtbDoge30gfSwgW3dtbF9ydW50aW1lXzEubm9kZSgnc3BhbicsIHsgaHRtbDogeyAnY2xhc3MnOiBcIlwiIH0sIHdtbDoge30gfSwgW10sIHZpZXcpLCB3bWxfcnVudGltZV8xLm5vZGUoJ3NwYW4nLCB7IGh0bWw6IHsgJ2NsYXNzJzogXCJcIiB9LCB3bWw6IHt9IH0sIFtdLCB2aWV3KSwgd21sX3J1bnRpbWVfMS5ub2RlKCdzcGFuJywgeyBodG1sOiB7ICdjbGFzcyc6IFwiXCIgfSwgd21sOiB7fSB9LCBbXSwgdmlldyldLCB2aWV3KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gTWFpbjtcbn0od21sX3J1bnRpbWVfMS5BcHBWaWV3KSk7XG5leHBvcnRzLk1haW4gPSBNYWluO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWVudV9idXR0b24uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB3bWxfcnVudGltZV8xID0gcmVxdWlyZShcIkBxdWVuay93bWwtcnVudGltZVwiKTtcbnZhciB2aWV3cyA9IHJlcXVpcmUoXCIuL3dtbC9tb2RhbFwiKTtcbi8qKlxuICogTW9kYWxcbiAqL1xudmFyIE1vZGFsID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhNb2RhbCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBNb2RhbCgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnZpZXcgPSBuZXcgdmlld3MuTW9kYWwoX3RoaXMpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIGNsb3NlIHRoZSBtb2RhbC5cbiAgICAgKi9cbiAgICBNb2RhbC5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBtID0gdGhpcy52aWV3LmZpbmRCeUlkKCdtb2RhbCcpO1xuICAgICAgICBtLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobSk7XG4gICAgfTtcbiAgICBNb2RhbC5wcm90b3R5cGUucGxhY2UgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICB3aGlsZSAoZS5maXJzdENoaWxkICE9IG51bGwpXG4gICAgICAgICAgICBlLnJlbW92ZUNoaWxkKGUuZmlyc3RDaGlsZCk7XG4gICAgICAgIGUuYXBwZW5kQ2hpbGQodGhpcy5yZW5kZXIoKSk7XG4gICAgfTtcbiAgICByZXR1cm4gTW9kYWw7XG59KHdtbF9ydW50aW1lXzEuQ29tcG9uZW50KSk7XG5leHBvcnRzLk1vZGFsID0gTW9kYWw7XG4vKipcbiAqIEhlYWRlclxuICovXG52YXIgSGVhZGVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhIZWFkZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gSGVhZGVyKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMudmlldyA9IG5ldyB2aWV3cy5IZWFkZXIoX3RoaXMpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBIZWFkZXI7XG59KHdtbF9ydW50aW1lXzEuQ29tcG9uZW50KSk7XG5leHBvcnRzLkhlYWRlciA9IEhlYWRlcjtcbi8qKlxuICogQm9keVxuICovXG52YXIgQm9keSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQm9keSwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBCb2R5KCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMudmlldyA9IG5ldyB2aWV3cy5Cb2R5KF90aGlzKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gQm9keTtcbn0od21sX3J1bnRpbWVfMS5Db21wb25lbnQpKTtcbmV4cG9ydHMuQm9keSA9IEJvZHk7XG4vKipcbiAqIEZvb3RlclxuICovXG52YXIgRm9vdGVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhGb290ZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gRm9vdGVyKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMudmlldyA9IG5ldyB2aWV3cy5Gb290ZXIoX3RoaXMpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBGb290ZXI7XG59KHdtbF9ydW50aW1lXzEuQ29tcG9uZW50KSk7XG5leHBvcnRzLkZvb3RlciA9IEZvb3Rlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPU1vZGFsLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgd21sX3J1bnRpbWVfMSA9IHJlcXVpcmUoXCJAcXVlbmsvd21sLXJ1bnRpbWVcIik7XG52YXIgU3R5bGVzID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi9TdHlsZXNcIik7XG52YXIgdXRpbF8xID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi91dGlsXCIpO1xudmFyIE1vZGFsID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhNb2RhbCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBNb2RhbChjb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbnRleHQpIHx8IHRoaXM7XG4gICAgICAgIHZhciB2aWV3ID0gX3RoaXM7XG4gICAgICAgIF90aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6IFN0eWxlcy5NT0RBTCwgJ3RhYmluZGV4JzogXCItMVwiLCAncm9sZSc6IFwiZGlhbG9nXCIgfSwgd21sOiB7ICdpZCc6IFwibW9kYWxcIiB9IH0sIFt3bWxfcnVudGltZV8xLm5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiBTdHlsZXMuTU9EQUxfRElBTE9HLCAncm9sZSc6IFwiZG9jdW1lbnRcIiB9LCB3bWw6IHt9IH0sIFt3bWxfcnVudGltZV8xLm5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiBTdHlsZXMuTU9EQUxfQ09OVEVOVCB9LCB3bWw6IHsgJ2lkJzogXCJjb250ZW50XCIgfSB9LCBbd21sX3J1bnRpbWVfMS5kb21pZnkodGhpcy5jaGlsZHJlbildLCB2aWV3KV0sIHZpZXcpXSwgdmlldyk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIE1vZGFsO1xufSh3bWxfcnVudGltZV8xLkFwcFZpZXcpKTtcbmV4cG9ydHMuTW9kYWwgPSBNb2RhbDtcbnZhciBIZWFkZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEhlYWRlciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBIZWFkZXIoY29udGV4dCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBjb250ZXh0KSB8fCB0aGlzO1xuICAgICAgICB2YXIgdmlldyA9IF90aGlzO1xuICAgICAgICBfdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB3bWxfcnVudGltZV8xLm5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiBTdHlsZXMuTU9EQUxfSEVBREVSIH0sIHdtbDoge30gfSwgW3dtbF9ydW50aW1lXzEubm9kZSgnYnV0dG9uJywgeyBodG1sOiB7ICd0eXBlJzogXCJidXR0b25cIiwgJ2NsYXNzJzogXCJjbG9zZVwiLCAnYXJpYS1sYWJlbCc6IFwiQ2xvc2VcIiwgJ29uY2xpY2snOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6b25DbG9zZScsIHV0aWxfMS5ub29wKSB9LCB3bWw6IHt9IH0sIFt3bWxfcnVudGltZV8xLm5vZGUoJ3NwYW4nLCB7IGh0bWw6IHsgJ2FyaWEtaGlkZGVuJzogXCJ0cnVlXCIgfSwgd21sOiB7fSB9LCBbd21sX3J1bnRpbWVfMS50ZXh0KFwiXFx1MDBEN1wiKV0sIHZpZXcpXSwgdmlldyksIHdtbF9ydW50aW1lXzEuZG9taWZ5KHRoaXMuY2hpbGRyZW4pXSwgdmlldyk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIEhlYWRlcjtcbn0od21sX3J1bnRpbWVfMS5BcHBWaWV3KSk7XG5leHBvcnRzLkhlYWRlciA9IEhlYWRlcjtcbnZhciBCb2R5ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhCb2R5LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEJvZHkoY29udGV4dCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBjb250ZXh0KSB8fCB0aGlzO1xuICAgICAgICB2YXIgdmlldyA9IF90aGlzO1xuICAgICAgICBfdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB3bWxfcnVudGltZV8xLm5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiBTdHlsZXMuTU9EQUxfQk9EWSB9LCB3bWw6IHt9IH0sIFt3bWxfcnVudGltZV8xLmRvbWlmeSh0aGlzLmNoaWxkcmVuKV0sIHZpZXcpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBCb2R5O1xufSh3bWxfcnVudGltZV8xLkFwcFZpZXcpKTtcbmV4cG9ydHMuQm9keSA9IEJvZHk7XG52YXIgRm9vdGVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhGb290ZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gRm9vdGVyKGNvbnRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29udGV4dCkgfHwgdGhpcztcbiAgICAgICAgdmFyIHZpZXcgPSBfdGhpcztcbiAgICAgICAgX3RoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogU3R5bGVzLk1PREFMX0ZPT1RFUiB9LCB3bWw6IHt9IH0sIFt3bWxfcnVudGltZV8xLmRvbWlmeSh0aGlzLmNoaWxkcmVuKV0sIHZpZXcpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBGb290ZXI7XG59KHdtbF9ydW50aW1lXzEuQXBwVmlldykpO1xuZXhwb3J0cy5Gb290ZXIgPSBGb290ZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tb2RhbC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHdtbF9ydW50aW1lXzEgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC1ydW50aW1lXCIpO1xudmFyIHZpZXdzID0gcmVxdWlyZShcIi4vd21sL3BhbmVsXCIpO1xudmFyIFBhbmVsID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhQYW5lbCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBQYW5lbCgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnZpZXcgPSBuZXcgdmlld3MuUGFuZWwoX3RoaXMpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBQYW5lbDtcbn0od21sX3J1bnRpbWVfMS5Db21wb25lbnQpKTtcbmV4cG9ydHMuUGFuZWwgPSBQYW5lbDtcbnZhciBIZWFkZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEhlYWRlciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBIZWFkZXIoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IHZpZXdzLkhlYWRlcihfdGhpcyk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIEhlYWRlcjtcbn0od21sX3J1bnRpbWVfMS5Db21wb25lbnQpKTtcbmV4cG9ydHMuSGVhZGVyID0gSGVhZGVyO1xudmFyIEJvZHkgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEJvZHksIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQm9keSgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnZpZXcgPSBuZXcgdmlld3MuQm9keShfdGhpcyk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIEJvZHk7XG59KHdtbF9ydW50aW1lXzEuQ29tcG9uZW50KSk7XG5leHBvcnRzLkJvZHkgPSBCb2R5O1xudmFyIEZvb3RlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoRm9vdGVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEZvb3RlcigpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnZpZXcgPSBuZXcgdmlld3MuRm9vdGVyKF90aGlzKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gRm9vdGVyO1xufSh3bWxfcnVudGltZV8xLkNvbXBvbmVudCkpO1xuZXhwb3J0cy5Gb290ZXIgPSBGb290ZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1QYW5lbC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHdtbF9ydW50aW1lXzEgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC1ydW50aW1lXCIpO1xudmFyIFN0eWxlcyA9IHJlcXVpcmUoXCJ3bWwtd2lkZ2V0cy1jb21tb24vU3R5bGVzXCIpO1xudmFyIHV0aWxfMSA9IHJlcXVpcmUoXCJ3bWwtd2lkZ2V0cy1jb21tb24vdXRpbFwiKTtcbnZhciBQYW5lbCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoUGFuZWwsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gUGFuZWwoY29udGV4dCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBjb250ZXh0KSB8fCB0aGlzO1xuICAgICAgICB2YXIgdmlldyA9IF90aGlzO1xuICAgICAgICBfdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB3bWxfcnVudGltZV8xLm5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiB1dGlsXzEuY29tYmluZShbU3R5bGVzLlBBTkVMLCB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6c3R5bGUnLCBTdHlsZXMuREVGQVVMVCldKSB9LCB3bWw6IHt9IH0sIFt3bWxfcnVudGltZV8xLmRvbWlmeSh0aGlzLmNoaWxkcmVuKV0sIHZpZXcpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBQYW5lbDtcbn0od21sX3J1bnRpbWVfMS5BcHBWaWV3KSk7XG5leHBvcnRzLlBhbmVsID0gUGFuZWw7XG52YXIgSGVhZGVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhIZWFkZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gSGVhZGVyKGNvbnRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29udGV4dCkgfHwgdGhpcztcbiAgICAgICAgdmFyIHZpZXcgPSBfdGhpcztcbiAgICAgICAgX3RoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogU3R5bGVzLlBBTkVMX0hFQURFUiB9LCB3bWw6IHt9IH0sIFt3bWxfcnVudGltZV8xLmRvbWlmeSh0aGlzLmNoaWxkcmVuKV0sIHZpZXcpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBIZWFkZXI7XG59KHdtbF9ydW50aW1lXzEuQXBwVmlldykpO1xuZXhwb3J0cy5IZWFkZXIgPSBIZWFkZXI7XG52YXIgQm9keSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQm9keSwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBCb2R5KGNvbnRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29udGV4dCkgfHwgdGhpcztcbiAgICAgICAgdmFyIHZpZXcgPSBfdGhpcztcbiAgICAgICAgX3RoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogU3R5bGVzLlBBTkVMX0JPRFkgfSwgd21sOiB7fSB9LCBbd21sX3J1bnRpbWVfMS5kb21pZnkodGhpcy5jaGlsZHJlbildLCB2aWV3KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gQm9keTtcbn0od21sX3J1bnRpbWVfMS5BcHBWaWV3KSk7XG5leHBvcnRzLkJvZHkgPSBCb2R5O1xudmFyIEZvb3RlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoRm9vdGVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEZvb3Rlcihjb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbnRleHQpIHx8IHRoaXM7XG4gICAgICAgIHZhciB2aWV3ID0gX3RoaXM7XG4gICAgICAgIF90aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6IFN0eWxlcy5QQU5FTF9GT09URVIgfSwgd21sOiB7fSB9LCBbd21sX3J1bnRpbWVfMS5kb21pZnkodGhpcy5jaGlsZHJlbildLCB2aWV3KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gRm9vdGVyO1xufSh3bWxfcnVudGltZV8xLkFwcFZpZXcpKTtcbmV4cG9ydHMuRm9vdGVyID0gRm9vdGVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cGFuZWwuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB3bWxfcnVudGltZV8xID0gcmVxdWlyZShcIkBxdWVuay93bWwtcnVudGltZVwiKTtcbnZhciBzd2l0Y2hfMSA9IHJlcXVpcmUoXCIuL3dtbC9zd2l0Y2hcIik7XG4vKipcbiAqIFN3aXRjaFxuICovXG52YXIgU3dpdGNoID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhTd2l0Y2gsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gU3dpdGNoKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMudmlldyA9IG5ldyBzd2l0Y2hfMS5NYWluKF90aGlzKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gU3dpdGNoO1xufSh3bWxfcnVudGltZV8xLkNvbXBvbmVudCkpO1xuZXhwb3J0cy5Td2l0Y2ggPSBTd2l0Y2g7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Td2l0Y2guanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB3bWxfcnVudGltZV8xID0gcmVxdWlyZShcIkBxdWVuay93bWwtcnVudGltZVwiKTtcbnZhciBTdHlsZXMgPSByZXF1aXJlKFwid21sLXdpZGdldHMtY29tbW9uL1N0eWxlc1wiKTtcbnZhciB1dGlsXzEgPSByZXF1aXJlKFwid21sLXdpZGdldHMtY29tbW9uL3V0aWxcIik7XG52YXIgTWFpbiA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoTWFpbiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBNYWluKGNvbnRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29udGV4dCkgfHwgdGhpcztcbiAgICAgICAgdmFyIHZpZXcgPSBfdGhpcztcbiAgICAgICAgX3RoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCdsYWJlbCcsIHsgaHRtbDogeyAnY2xhc3MnOiBTdHlsZXMuU1dJVENIIH0sIHdtbDoge30gfSwgW3dtbF9ydW50aW1lXzEubm9kZSgnaW5wdXQnLCB7IGh0bWw6IHsgJ3R5cGUnOiBcImNoZWNrYm94XCIsICduYW1lJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3Om5hbWUnKSwgJ3ZhbHVlJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OnZhbHVlJyksICdvbmNoYW5nZSc6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpvbkNoYW5nZScsIHV0aWxfMS5ub29wKSB9LCB3bWw6IHt9IH0sIFtdLCB2aWV3KSwgd21sX3J1bnRpbWVfMS5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogU3R5bGVzLlNXSVRDSF9TTElERVIgfSwgd21sOiB7fSB9LCBbXSwgdmlldyksIHdtbF9ydW50aW1lXzEuZG9taWZ5KHRoaXMuY2hpbGRyZW4pXSwgdmlldyk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIE1haW47XG59KHdtbF9ydW50aW1lXzEuQXBwVmlldykpO1xuZXhwb3J0cy5NYWluID0gTWFpbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXN3aXRjaC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHByb3BlcnR5X3NlZWtfMSA9IHJlcXVpcmUoXCJwcm9wZXJ0eS1zZWVrXCIpO1xudmFyIHdtbF9ydW50aW1lXzEgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC1ydW50aW1lXCIpO1xudmFyIHRhYmxlXzEgPSByZXF1aXJlKFwiLi93bWwvdGFibGVcIik7XG52YXIgQVNDX0FSUk9XID0gJ1xcdTIxZTcnO1xudmFyIERFU0NfQVJST1cgPSAnXFx1MjFlOSc7XG5leHBvcnRzLmRhdGVTb3J0ID0gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICB2YXIgbmEgPSBuZXcgRGF0ZShhKS5nZXRUaW1lKCk7XG4gICAgdmFyIG5iID0gbmV3IERhdGUoYikuZ2V0VGltZSgpO1xuICAgIHJldHVybiBuYSA+IG5iID8gLTEgOiBuYSA8IG5iID8gMSA6IDA7XG59O1xuZXhwb3J0cy5zdHJpbmdTb3J0ID0gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICB2YXIgbGEgPSBhLnJlcGxhY2UoL1xccysvLCAnJykudG9Mb3dlckNhc2UoKTtcbiAgICB2YXIgbGIgPSBiLnJlcGxhY2UoL1xccysvLCAnJykudG9Mb3dlckNhc2UoKTtcbiAgICByZXR1cm4gKGxhID4gbGIpID8gLTEgOiAobGEgPCBsYikgPyAxIDogMDtcbn07XG5leHBvcnRzLm5hdHVyYWxTb3J0ID0gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAvL1NvdXJjZTogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy80MzQwMjI3L3NvcnQtbWl4ZWQtYWxwaGEtbnVtZXJpYy1hcnJheVxuICAgIHZhciByZUEgPSAvW15hLXpBLVpdL2c7XG4gICAgdmFyIHJlTiA9IC9bXjAtOV0vZztcbiAgICB2YXIgQUludCA9IHBhcnNlSW50KGEsIDEwKTtcbiAgICB2YXIgQkludCA9IHBhcnNlSW50KGIsIDEwKTtcbiAgICBpZiAoaXNOYU4oQUludCkgJiYgaXNOYU4oQkludCkpIHtcbiAgICAgICAgdmFyIGFBID0gYS5yZXBsYWNlKHJlQSwgJycpO1xuICAgICAgICB2YXIgYkEgPSBiLnJlcGxhY2UocmVBLCAnJyk7XG4gICAgICAgIGlmIChhQSA9PT0gYkEpIHtcbiAgICAgICAgICAgIHZhciBhTiA9IHBhcnNlSW50KGEucmVwbGFjZShyZU4sICcnKSwgMTApO1xuICAgICAgICAgICAgdmFyIGJOID0gcGFyc2VJbnQoYi5yZXBsYWNlKHJlTiwgJycpLCAxMCk7XG4gICAgICAgICAgICByZXR1cm4gYU4gPT09IGJOID8gMCA6IGFOID4gYk4gPyAtMSA6IDE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gYUEgPiBiQSA/IC0xIDogMTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChpc05hTihBSW50KSkge1xuICAgICAgICByZXR1cm4gLTE7IC8vdG8gbWFrZSBhbHBoYW51bWVyaWMgc29ydCBmaXJzdCByZXR1cm4gLTEgaGVyZVxuICAgIH1cbiAgICBlbHNlIGlmIChpc05hTihCSW50KSkge1xuICAgICAgICByZXR1cm4gMTsgLy90byBtYWtlIGFscGhhbnVtZXJpYyBzb3J0IGZpcnN0IHJldHVybiAxIGhlcmVcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBBSW50ID4gQkludCA/IC0xIDogMTtcbiAgICB9XG59O1xuZXhwb3J0cy5udW1iZXJTb3J0ID0gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICB2YXIgbmEgPSBwYXJzZUZsb2F0KGEpO1xuICAgIHZhciBuYiA9IHBhcnNlRmxvYXQoYik7XG4gICAgbmEgPSAoaXNOYU4oYSkpID8gLUluZmluaXR5IDogYTtcbiAgICBuYiA9IChpc05hTihiKSkgPyAtSW5maW5pdHkgOiBiO1xuICAgIHJldHVybiAobmEgPiBuYikgPyAtMSA6IChuYSA8IG5iKSA/IDEgOiAwO1xufTtcbnZhciBIZWFkaW5nQ2xpY2tlZEV2ZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEhlYWRpbmdDbGlja2VkRXZlbnQobmFtZSwgZmllbGQsIHRhYmxlKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuZmllbGQgPSBmaWVsZDtcbiAgICAgICAgdGhpcy50YWJsZSA9IHRhYmxlO1xuICAgIH1cbiAgICByZXR1cm4gSGVhZGluZ0NsaWNrZWRFdmVudDtcbn0oKSk7XG5leHBvcnRzLkhlYWRpbmdDbGlja2VkRXZlbnQgPSBIZWFkaW5nQ2xpY2tlZEV2ZW50O1xudmFyIFJvd0NsaWNrZWRFdmVudCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBSb3dDbGlja2VkRXZlbnQodmFsdWUsIGluZGV4LCBkYXRhLCB0YWJsZSkge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICAgICAgdGhpcy50YWJsZSA9IHRhYmxlO1xuICAgIH1cbiAgICByZXR1cm4gUm93Q2xpY2tlZEV2ZW50O1xufSgpKTtcbmV4cG9ydHMuUm93Q2xpY2tlZEV2ZW50ID0gUm93Q2xpY2tlZEV2ZW50O1xudmFyIFJvd1NlbGVjdGVkRXZlbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFJvd1NlbGVjdGVkRXZlbnQsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gUm93U2VsZWN0ZWRFdmVudCgpIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgIH1cbiAgICByZXR1cm4gUm93U2VsZWN0ZWRFdmVudDtcbn0oUm93Q2xpY2tlZEV2ZW50KSk7XG5leHBvcnRzLlJvd1NlbGVjdGVkRXZlbnQgPSBSb3dTZWxlY3RlZEV2ZW50O1xudmFyIENlbGxDbGlja2VkRXZlbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ2VsbENsaWNrZWRFdmVudCh2YWx1ZSwgbmFtZSwgaW5kZXgsIHJvdywgdGFibGUpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG4gICAgICAgIHRoaXMucm93ID0gcm93O1xuICAgICAgICB0aGlzLnRhYmxlID0gdGFibGU7XG4gICAgfVxuICAgIHJldHVybiBDZWxsQ2xpY2tlZEV2ZW50O1xufSgpKTtcbmV4cG9ydHMuQ2VsbENsaWNrZWRFdmVudCA9IENlbGxDbGlja2VkRXZlbnQ7XG52YXIgRGVmYXVsdFRhYmxlTW9kZWwgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRGVmYXVsdFRhYmxlTW9kZWwoKSB7XG4gICAgfVxuICAgIERlZmF1bHRUYWJsZU1vZGVsLnByb3RvdHlwZS5hbGxTZWxlY3RlZCA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICBEZWZhdWx0VGFibGVNb2RlbC5wcm90b3R5cGUuY2VsbENsaWNrZWQgPSBmdW5jdGlvbiAoX2UpIHsgfTtcbiAgICBEZWZhdWx0VGFibGVNb2RlbC5wcm90b3R5cGUuaGVhZGluZ0NsaWNrZWQgPSBmdW5jdGlvbiAoX2UpIHsgfTtcbiAgICBEZWZhdWx0VGFibGVNb2RlbC5wcm90b3R5cGUucm93Q2xpY2tlZCA9IGZ1bmN0aW9uIChfZSkgeyB9O1xuICAgIERlZmF1bHRUYWJsZU1vZGVsLnByb3RvdHlwZS5yb3dTZWxlY3RlZCA9IGZ1bmN0aW9uIChfZSkgeyB9O1xuICAgIHJldHVybiBEZWZhdWx0VGFibGVNb2RlbDtcbn0oKSk7XG5leHBvcnRzLkRlZmF1bHRUYWJsZU1vZGVsID0gRGVmYXVsdFRhYmxlTW9kZWw7XG52YXIgU29ydFRhYmxlTW9kZWwgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFNvcnRUYWJsZU1vZGVsLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFNvcnRUYWJsZU1vZGVsKCkge1xuICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgfVxuICAgIFNvcnRUYWJsZU1vZGVsLnByb3RvdHlwZS5oZWFkaW5nQ2xpY2tlZCA9IGZ1bmN0aW9uIChlKSB7IGUudGFibGUuc29ydChlLm5hbWUpOyB9O1xuICAgIHJldHVybiBTb3J0VGFibGVNb2RlbDtcbn0oRGVmYXVsdFRhYmxlTW9kZWwpKTtcbmV4cG9ydHMuU29ydFRhYmxlTW9kZWwgPSBTb3J0VGFibGVNb2RlbDtcbnZhciBUYWJsZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoVGFibGUsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gVGFibGUoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5vcmlnaW5hbERhdGEgPSBfdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmRhdGEnLCBbXSk7XG4gICAgICAgIF90aGlzLmRhdGEgPSBfdGhpcy5vcmlnaW5hbERhdGEuc2xpY2UoKTtcbiAgICAgICAgX3RoaXMuc29ydGVkT24gPSAnJztcbiAgICAgICAgX3RoaXMuYXJyb3cgPSAnJztcbiAgICAgICAgX3RoaXMudmlldyA9IG5ldyB0YWJsZV8xLlRhYmxlVmlldyhfdGhpcyk7XG4gICAgICAgIF90aGlzLm1vZGVsID0gX3RoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzptb2RlbCcsIG5ldyBEZWZhdWx0VGFibGVNb2RlbCgpKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBUYWJsZS5wcm90b3R5cGUuc29ydCA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHZhciBkYXRhO1xuICAgICAgICB2YXIgYm9keSA9IHRoaXMudmlldy5maW5kQnlJZCgnYm9keScpO1xuICAgICAgICB2YXIgaGVhZCA9IHRoaXMudmlldy5maW5kQnlJZCgnaGVhZCcpO1xuICAgICAgICB2YXIgZmllbGQgPSB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6ZmllbGRzJywgW10pLnJlZHVjZShmdW5jdGlvbiAocCwgYykgeyByZXR1cm4gcCA/IHAgOiAoYy5uYW1lID09PSBuYW1lID8gYyA6IG51bGwpOyB9KTtcbiAgICAgICAgdmFyIHNvcnRPbjtcbiAgICAgICAgdmFyIHN0cmF0ZWd5O1xuICAgICAgICBpZiAoIWZpZWxkKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGFibGUjc29ydDogdW5rbm93biBmaWVsZCAnXCIgKyBuYW1lICsgXCInXCIpO1xuICAgICAgICBzb3J0T24gPSBmaWVsZC5zb3J0T24gfHwgbmFtZTtcbiAgICAgICAgc3RyYXRlZ3kgPSBmaWVsZC5zdHJhdGVneSB8fCBleHBvcnRzLnN0cmluZ1NvcnQ7XG4gICAgICAgIGlmICh0aGlzLnNvcnRlZE9uID09PSBuYW1lKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGEgPSB0aGlzLmRhdGEucmV2ZXJzZSgpO1xuICAgICAgICAgICAgdGhpcy5hcnJvdyA9ICh0aGlzLmFycm93ID09PSBBU0NfQVJST1cpID8gREVTQ19BUlJPVyA6IEFTQ19BUlJPVztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYXJyb3cgPSBERVNDX0FSUk9XO1xuICAgICAgICAgICAgdGhpcy5kYXRhID0gdGhpc1xuICAgICAgICAgICAgICAgIC5vcmlnaW5hbERhdGFcbiAgICAgICAgICAgICAgICAuc2xpY2UoKVxuICAgICAgICAgICAgICAgIC5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiBzdHJhdGVneShwcm9wZXJ0eV9zZWVrXzEuZGVmYXVsdChzb3J0T24sIGEpLCBwcm9wZXJ0eV9zZWVrXzEuZGVmYXVsdChzb3J0T24sIGIpKTsgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zb3J0ZWRPbiA9IG5hbWU7XG4gICAgICAgIHRoaXMudmlldy5pbnZhbGlkYXRlKCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiB1cGRhdGUgdGhlIGRhdGEgdGhlIHRhYmxlIGRpc3BsYXlzXG4gICAgICovXG4gICAgVGFibGUucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHRoaXMub3JpZ2luYWxEYXRhID0gZGF0YS5zbGljZSgpO1xuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhLnNsaWNlKCk7XG4gICAgICAgICh0aGlzLnNvcnRlZE9uID09PSAnJykgPyB0aGlzLnZpZXcuaW52YWxpZGF0ZSgpIDogdGhpcy5zb3J0KHRoaXMuc29ydGVkT24pO1xuICAgIH07XG4gICAgcmV0dXJuIFRhYmxlO1xufSh3bWxfcnVudGltZV8xLkNvbXBvbmVudCkpO1xuZXhwb3J0cy5UYWJsZSA9IFRhYmxlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9VGFibGUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB3bWxfcnVudGltZV8xID0gcmVxdWlyZShcIkBxdWVuay93bWwtcnVudGltZVwiKTtcbnZhciBwcm9wZXJ0eV9zZWVrXzEgPSByZXF1aXJlKFwicHJvcGVydHktc2Vla1wiKTtcbnZhciBTdHlsZXMgPSByZXF1aXJlKFwid21sLXdpZGdldHMtY29tbW9uL1N0eWxlc1wiKTtcbnZhciBUYWJsZV8xID0gcmVxdWlyZShcIi4uL1RhYmxlXCIpO1xudmFyIF8xID0gcmVxdWlyZShcIi4uLy4uL1wiKTtcbmZ1bmN0aW9uIHRoZWFkKHZpZXcsIGZpZWxkcykgeyByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCd0cicsIHsgaHRtbDoge30sIHdtbDoge30gfSwgW3dtbF9ydW50aW1lXzEuaWZFKHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpzZWxlY3RhYmxlJyksIGZ1bmN0aW9uIGlmNCgpIHsgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgndGgnLCB7IGh0bWw6IHt9LCB3bWw6IHt9IH0sIFt3bWxfcnVudGltZV8xLm5vZGUoJ2lucHV0JywgeyBodG1sOiB7ICd0eXBlJzogXCJjaGVja2JveFwiLCAnb25jbGljayc6IGZ1bmN0aW9uIGZ1bmN0aW9uX2xpdGVyYWxfMSgpIHsgcmV0dXJuIHRoaXMubW9kZWwuYWxsUm93c1NlbGVjdGVkKCk7IH0uYmluZCh0aGlzKSB9LCB3bWw6IHt9IH0sIFtdLCB2aWV3KV0sIHZpZXcpOyB9LmJpbmQodGhpcyksIHdtbF9ydW50aW1lXzEuZW1wdHkpLCB3bWxfcnVudGltZV8xLmZvckUoZmllbGRzLCBmdW5jdGlvbiBmb3IyKGZpZWxkKSB7IHJldHVybiB3bWxfcnVudGltZV8xLmlmRSghZmllbGQuaGlkZGVuLCBmdW5jdGlvbiBpZjUoKSB7IHJldHVybiB3bWxfcnVudGltZV8xLmlmRShmaWVsZC5zb3J0QXMsIGZ1bmN0aW9uIGlmNigpIHsgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgndGgnLCB7IGh0bWw6IHsgJ2NsYXNzJzogW3RoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpoZWFkaW5nQ2xhc3MnKSwgKHRoaXMuc29ydGVkT24gPT09IGZpZWxkLm5hbWUpID8gU3R5bGVzLkFDVElWRSA6ICcnXS5qb2luKCcgJyksICdvbmNsaWNrJzogZnVuY3Rpb24gZnVuY3Rpb25fbGl0ZXJhbF8yKCkgeyByZXR1cm4gdGhpcy5tb2RlbC5oZWFkaW5nQ2xpY2tlZChuZXcgVGFibGVfMS5IZWFkaW5nQ2xpY2tlZEV2ZW50KGZpZWxkLm5hbWUsIGZpZWxkLCB0aGlzKSk7IH0uYmluZCh0aGlzKSB9LCB3bWw6IHt9IH0sIFt3bWxfcnVudGltZV8xLmRvbWlmeShmaWVsZC5oZWFkaW5nKSwgd21sX3J1bnRpbWVfMS5pZkUodGhpcy5zb3J0ZWRPbiA9PT0gZmllbGQubmFtZSwgZnVuY3Rpb24gaWY3KCkgeyByZXR1cm4gd21sX3J1bnRpbWVfMS5kb21pZnkodGhpcy5hcnJvdyk7IH0uYmluZCh0aGlzKSwgd21sX3J1bnRpbWVfMS5lbXB0eSldLCB2aWV3KTsgfS5iaW5kKHRoaXMpLCBmdW5jdGlvbiBlbHNlX2NsYXVzZTQoKSB7IHJldHVybiB3bWxfcnVudGltZV8xLm5vZGUoJ3RoJywgeyBodG1sOiB7ICdjbGFzcyc6IFt0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6aGVhZGluZ0NsYXNzJyksICh0aGlzLnNvcnRlZE9uID09PSBmaWVsZC5uYW1lKSA/IFN0eWxlcy5BQ1RJVkUgOiAnJ10uam9pbignICcpLCAnb25jbGljayc6IGZ1bmN0aW9uIGZ1bmN0aW9uX2xpdGVyYWxfMygpIHsgcmV0dXJuIHRoaXMubW9kZWwuaGVhZGluZ0NsaWNrZWQobmV3IFRhYmxlXzEuSGVhZGluZ0NsaWNrZWRFdmVudChmaWVsZC5uYW1lLCBmaWVsZCwgdGhpcykpOyB9LmJpbmQodGhpcykgfSwgd21sOiB7fSB9LCBbd21sX3J1bnRpbWVfMS5kb21pZnkoZmllbGQuaGVhZGluZyksIHdtbF9ydW50aW1lXzEuaWZFKHRoaXMuc29ydGVkT24gPT09IGZpZWxkLm5hbWUsIGZ1bmN0aW9uIGlmOCgpIHsgcmV0dXJuIHdtbF9ydW50aW1lXzEuZG9taWZ5KHRoaXMuYXJyb3cpOyB9LmJpbmQodGhpcyksIHdtbF9ydW50aW1lXzEuZW1wdHkpXSwgdmlldyk7IH0uYmluZCh0aGlzKSk7IH0uYmluZCh0aGlzKSwgd21sX3J1bnRpbWVfMS5lbXB0eSk7IH0uYmluZCh0aGlzKSwgZnVuY3Rpb24gZm9yX290aGVyd2lzZTIoKSB7IHJldHVybiB3bWxfcnVudGltZV8xLmVtcHR5KCk7IH0uYmluZCh0aGlzKSldLCB2aWV3KTsgfVxuZXhwb3J0cy50aGVhZCA9IHRoZWFkO1xuZnVuY3Rpb24gdGJvZHkodmlldywgZGF0YSwgZmllbGRzKSB7IHJldHVybiB3bWxfcnVudGltZV8xLndpZGdldChfMS5GcmFnbWVudCwgeyBodG1sOiB7fSwgd21sOiB7fSB9LCBbd21sX3J1bnRpbWVfMS5mb3JFKGRhdGEsIGZ1bmN0aW9uIGZvcjMocm93LCBpbmRleCkgeyByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCd0cicsIHsgaHRtbDogeyAnY2xhc3MnOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6cm93Q2xhc3MnKSwgJ29uY2xpY2snOiBmdW5jdGlvbiBmdW5jdGlvbl9saXRlcmFsXzQoKSB7IHJldHVybiB0aGlzLm1vZGVsLnJvd0NsaWNrZWQobmV3IFRhYmxlXzEuUm93Q2xpY2tlZEV2ZW50KHJvdywgaW5kZXgsIGRhdGEsIHRoaXMpKTsgfS5iaW5kKHRoaXMpIH0sIHdtbDoge30gfSwgW3dtbF9ydW50aW1lXzEuaWZFKHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpzZWxlY3RhYmxlJyksIGZ1bmN0aW9uIGlmOSgpIHsgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgndGQnLCB7IGh0bWw6IHt9LCB3bWw6IHt9IH0sIFt3bWxfcnVudGltZV8xLm5vZGUoJ2lucHV0JywgeyBodG1sOiB7ICd0eXBlJzogXCJjaGVja2JveFwiLCAnb25jbGljayc6IGZ1bmN0aW9uIGZ1bmN0aW9uX2xpdGVyYWxfNSgpIHsgcmV0dXJuIHRoaXMubW9kZWwucm93U2VsZWN0ZWQobmV3IFRhYmxlXzEuUm93U2VsZWN0ZWRFdmVudChyb3csIGluZGV4LCBkYXRhLCB0aGlzKSk7IH0uYmluZCh0aGlzKSB9LCB3bWw6IHt9IH0sIFtdLCB2aWV3KV0sIHZpZXcpOyB9LmJpbmQodGhpcyksIHdtbF9ydW50aW1lXzEuZW1wdHkpLCB3bWxfcnVudGltZV8xLmZvckUoZmllbGRzLCBmdW5jdGlvbiBmb3I0KGZpZWxkKSB7IHJldHVybiB3bWxfcnVudGltZV8xLmlmRSghZmllbGQuaGlkZGVuLCBmdW5jdGlvbiBpZjEwKCkgeyByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCd0ZCcsIHsgaHRtbDogeyAnY2xhc3MnOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6Y2VsbENsYXNzJyksICdvbmNsaWNrJzogZnVuY3Rpb24gZnVuY3Rpb25fbGl0ZXJhbF82KCkgeyByZXR1cm4gdGhpcy5tb2RlbC5jZWxsQ2xpY2tlZChuZXcgVGFibGVfMS5DZWxsQ2xpY2tlZEV2ZW50KHByb3BlcnR5X3NlZWtfMS5nZXQoZmllbGQubmFtZSwgcm93KSwgZmllbGQubmFtZSwgaW5kZXgsIHJvdywgdGhpcykpOyB9LmJpbmQodGhpcykgfSwgd21sOiB7fSB9LCBbd21sX3J1bnRpbWVfMS5pZkUoZmllbGQuZnJhZ21lbnQsIGZ1bmN0aW9uIGlmMTEoKSB7IHJldHVybiBmaWVsZC5mcmFnbWVudC5jYWxsKHRoaXMsIHZpZXcsIHByb3BlcnR5X3NlZWtfMS5nZXQoZmllbGQubmFtZSwgcm93KSwgZmllbGQubmFtZSwgcm93LCBmaWVsZCk7IH0uYmluZCh0aGlzKSwgZnVuY3Rpb24gZWxzZV9jbGF1c2U1KCkgeyByZXR1cm4gd21sX3J1bnRpbWVfMS5kb21pZnkocHJvcGVydHlfc2Vla18xLmdldChmaWVsZC5uYW1lLCByb3cpKTsgfS5iaW5kKHRoaXMpKV0sIHZpZXcpOyB9LmJpbmQodGhpcyksIHdtbF9ydW50aW1lXzEuZW1wdHkpOyB9LmJpbmQodGhpcyksIGZ1bmN0aW9uIGZvcl9vdGhlcndpc2U0KCkgeyByZXR1cm4gd21sX3J1bnRpbWVfMS5lbXB0eSgpOyB9LmJpbmQodGhpcykpXSwgdmlldyk7IH0uYmluZCh0aGlzKSwgZnVuY3Rpb24gZm9yX290aGVyd2lzZTQoKSB7IHJldHVybiB3bWxfcnVudGltZV8xLmVtcHR5KCk7IH0uYmluZCh0aGlzKSldLCB2aWV3KTsgfVxuZXhwb3J0cy50Ym9keSA9IHRib2R5O1xuZnVuY3Rpb24gdGFibGUodmlldykgeyByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCd0YWJsZScsIHsgaHRtbDogeyAnY2xhc3MnOiBbU3R5bGVzLlRBQkxFLCB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6Y2xhc3MnLCAnJyldLmpvaW4oJyAnKSB9LCB3bWw6IHsgJ2lkJzogXCJyb290XCIgfSB9LCBbd21sX3J1bnRpbWVfMS5ub2RlKCd0aGVhZCcsIHsgaHRtbDoge30sIHdtbDogeyAnaWQnOiBcImhlYWRcIiB9IH0sIFt0aGVhZC5jYWxsKHRoaXMsIHZpZXcsIHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpmaWVsZHMnKSldLCB2aWV3KSwgd21sX3J1bnRpbWVfMS5ub2RlKCd0Ym9keScsIHsgaHRtbDoge30sIHdtbDogeyAnaWQnOiBcImJvZHlcIiB9IH0sIFt0Ym9keS5jYWxsKHRoaXMsIHZpZXcsIHRoaXMuZGF0YSwgdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmZpZWxkcycpKV0sIHZpZXcpXSwgdmlldyk7IH1cbmV4cG9ydHMudGFibGUgPSB0YWJsZTtcbnZhciBUYWJsZVZpZXcgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFRhYmxlVmlldywgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBUYWJsZVZpZXcoY29udGV4dCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBjb250ZXh0KSB8fCB0aGlzO1xuICAgICAgICB2YXIgdmlldyA9IF90aGlzO1xuICAgICAgICBfdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB3bWxfcnVudGltZV8xLndpZGdldChfMS5GcmFnbWVudCwgeyBodG1sOiB7fSwgd21sOiB7fSB9LCBbd21sX3J1bnRpbWVfMS5pZkUodGhpcy5kYXRhLmxlbmd0aCA9PT0gMCwgZnVuY3Rpb24gaWYxMigpIHsgcmV0dXJuIHdtbF9ydW50aW1lXzEuaWZFKHRoaXMuYXR0cmlidXRlcy5yZWFkKCdlbXB0eU1hY3JvJyksIGZ1bmN0aW9uIGlmMTMoKSB7IHJldHVybiB0aGlzLmF0dHJpYnV0ZXMucmVhZC5jYWxsKHRoaXMsIHZpZXcsICdlbXB0eU1hY3JvJyk7IH0uYmluZCh0aGlzKSwgZnVuY3Rpb24gZWxzZV9jbGF1c2U2KCkgeyByZXR1cm4gdGFibGUuY2FsbCh0aGlzLCB2aWV3KTsgfS5iaW5kKHRoaXMpKTsgfS5iaW5kKHRoaXMpLCBmdW5jdGlvbiBlbHNlX2NsYXVzZTcoKSB7IHJldHVybiB0YWJsZS5jYWxsKHRoaXMsIHZpZXcpOyB9LmJpbmQodGhpcykpXSwgdmlldyk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIFRhYmxlVmlldztcbn0od21sX3J1bnRpbWVfMS5BcHBWaWV3KSk7XG5leHBvcnRzLlRhYmxlVmlldyA9IFRhYmxlVmlldztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRhYmxlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgd21sX3J1bnRpbWVfMSA9IHJlcXVpcmUoXCJAcXVlbmsvd21sLXJ1bnRpbWVcIik7XG52YXIgU3R5bGVzID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi9TdHlsZXNcIik7XG52YXIgdXRpbF8xID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi91dGlsXCIpO1xudmFyIHRhYnNfMSA9IHJlcXVpcmUoXCIuL3dtbC90YWJzXCIpO1xuLyoqXG4gKiBUYWJcbiAqL1xudmFyIFRhYiA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoVGFiLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFRhYigpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnZpZXcgPSBuZXcgdGFic18xLlRhYlZpZXcoX3RoaXMpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIGNsaWNrIHRoaXMgVGFiXG4gICAgICovXG4gICAgVGFiLnByb3RvdHlwZS5jbGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy52aWV3Lmlkcy5saW5rLmNsaWNrKCk7XG4gICAgfTtcbiAgICBUYWIucHJvdG90eXBlLmNsaWNrZWQgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHZhciBwYXJlbnQgPSB0aGlzLnZpZXcuaWRzLnJvb3QucGFyZW50Tm9kZTtcbiAgICAgICAgdmFyIHVzID0gcGFyZW50LmNoaWxkcmVuO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHVzLmxlbmd0aDsgaSsrKVxuICAgICAgICAgICAgdXNbaV0uY2xhc3NMaXN0LnJlbW92ZShTdHlsZXMuQUNUSVZFKTtcbiAgICAgICAgdGhpcy52aWV3Lmlkcy5yb290LmNsYXNzTGlzdC5hZGQoU3R5bGVzLkFDVElWRSk7XG4gICAgICAgIHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpvbkNsaWNrJywgdXRpbF8xLm5vb3ApKHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpuYW1lJykpO1xuICAgIH07XG4gICAgcmV0dXJuIFRhYjtcbn0od21sX3J1bnRpbWVfMS5Db21wb25lbnQpKTtcbmV4cG9ydHMuVGFiID0gVGFiO1xuLyoqXG4gKiBUYWJzXG4gKi9cbnZhciBUYWJzID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhUYWJzLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFRhYnMoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IHRhYnNfMS5UYWJzVmlldyhfdGhpcyk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIFRhYnM7XG59KHdtbF9ydW50aW1lXzEuQ29tcG9uZW50KSk7XG5leHBvcnRzLlRhYnMgPSBUYWJzO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9VGFicy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHdtbF9ydW50aW1lXzEgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC1ydW50aW1lXCIpO1xudmFyIFN0eWxlcyA9IHJlcXVpcmUoXCJ3bWwtd2lkZ2V0cy1jb21tb24vU3R5bGVzXCIpO1xudmFyIFRhYlZpZXcgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFRhYlZpZXcsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gVGFiVmlldyhjb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbnRleHQpIHx8IHRoaXM7XG4gICAgICAgIHZhciB2aWV3ID0gX3RoaXM7XG4gICAgICAgIF90aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgnbGknLCB7IGh0bWw6IHsgJ3JvbGUnOiBcInByZXNlbnRhdGlvblwiLCAnY2xhc3MnOiAodGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmFjdGl2ZScpKSA/IFN0eWxlcy5BQ1RJVkUgOiBudWxsIH0sIHdtbDogeyAnaWQnOiBcInJvb3RcIiB9IH0sIFt3bWxfcnVudGltZV8xLm5vZGUoJ2EnLCB7IGh0bWw6IHsgJ2hyZWYnOiBcIiNcIiwgJ29uY2xpY2snOiB0aGlzLmNsaWNrZWQuYmluZCh0aGlzKSB9LCB3bWw6IHsgJ2lkJzogXCJsaW5rXCIgfSB9LCBbd21sX3J1bnRpbWVfMS5pZkUodGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OnRleHQnKSwgZnVuY3Rpb24gaWYxNCgpIHsgcmV0dXJuIHdtbF9ydW50aW1lXzEuZG9taWZ5KHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzp0ZXh0JykpOyB9LmJpbmQodGhpcyksIGZ1bmN0aW9uIGVsc2VfY2xhdXNlOCgpIHsgcmV0dXJuIHdtbF9ydW50aW1lXzEuZG9taWZ5KHRoaXMuY2hpbGRyZW4pOyB9LmJpbmQodGhpcykpXSwgdmlldyldLCB2aWV3KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gVGFiVmlldztcbn0od21sX3J1bnRpbWVfMS5BcHBWaWV3KSk7XG5leHBvcnRzLlRhYlZpZXcgPSBUYWJWaWV3O1xudmFyIFRhYnNWaWV3ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhUYWJzVmlldywgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBUYWJzVmlldyhjb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbnRleHQpIHx8IHRoaXM7XG4gICAgICAgIHZhciB2aWV3ID0gX3RoaXM7XG4gICAgICAgIF90aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgndWwnLCB7IGh0bWw6IHsgJ2NsYXNzJzogU3R5bGVzLlRBQlMgfSwgd21sOiB7fSB9LCBbd21sX3J1bnRpbWVfMS5kb21pZnkodGhpcy5jaGlsZHJlbildLCB2aWV3KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gVGFic1ZpZXc7XG59KHdtbF9ydW50aW1lXzEuQXBwVmlldykpO1xuZXhwb3J0cy5UYWJzVmlldyA9IFRhYnNWaWV3O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGFicy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHdtbF9ydW50aW1lXzEgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC1ydW50aW1lXCIpO1xudmFyIHRyZWVfbmF2XzEgPSByZXF1aXJlKFwiLi93bWwvdHJlZS1uYXZcIik7XG52YXIgU3R5bGVzID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi9TdHlsZXNcIik7XG4vKipcbiAqIFRyZWVOYXZJdGVtIGlzIHVzZWQgdG8gaW5kaWNhdGUgYW4gaXRlbSBpbiB0aGUgdHJlZS5cbiAqL1xudmFyIFRyZWVOYXZJdGVtID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhUcmVlTmF2SXRlbSwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBUcmVlTmF2SXRlbSgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnZpZXcgPSBuZXcgdHJlZV9uYXZfMS5UcmVlTmF2SXRlbVZpZXcoX3RoaXMpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIGFjdGl2YXRlIHRoaXMgVHJlZUl0ZW1cbiAgICAgKi9cbiAgICBUcmVlTmF2SXRlbS5wcm90b3R5cGUuYWN0aXZhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhID0gdGhpcy52aWV3Lmlkcy5saW5rO1xuICAgICAgICBpZiAoYSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KVxuICAgICAgICAgICAgaWYgKGEucGFyZW50Tm9kZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgdmFyIGNoaWxkcmVuID0gYS5wYXJlbnROb2RlLmNoaWxkcmVuO1xuICAgICAgICAgICAgICAgIGEuY2xhc3NMaXN0LnJlbW92ZShTdHlsZXMuQUNUSVZFKTtcbiAgICAgICAgICAgICAgICBhLmNsYXNzTGlzdC5hZGQoU3R5bGVzLkFDVElWRSk7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKylcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoaWxkcmVuW2ldLm5vZGVOYW1lID09PSAnQScpXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGRyZW5baV0gIT09IGEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW5baV0uY2xhc3NMaXN0LnJlbW92ZShTdHlsZXMuQUNUSVZFKTtcbiAgICAgICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIGRlYWN0aXZhdGUgdGhpcyBEcmF3ZXJMaW5rXG4gICAgICovXG4gICAgVHJlZU5hdkl0ZW0ucHJvdG90eXBlLmRlYWN0aXZhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMudmlldy5maW5kQnlJZCgnYScpLmNsYXNzTGlzdC5yZW1vdmUoU3R5bGVzLkFDVElWRSk7XG4gICAgfTtcbiAgICByZXR1cm4gVHJlZU5hdkl0ZW07XG59KHdtbF9ydW50aW1lXzEuQ29tcG9uZW50KSk7XG5leHBvcnRzLlRyZWVOYXZJdGVtID0gVHJlZU5hdkl0ZW07XG4vKipcbiAqIFRyZWVOYXYgcHJvdmlkZXMgYW4gYXBpIGZvciBkaXNwbGF5aW5nIGEgdHJlZSBvZiBsaW5rcy5cbiAqL1xudmFyIFRyZWVOYXYgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFRyZWVOYXYsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gVHJlZU5hdigpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnZpZXcgPSBuZXcgdHJlZV9uYXZfMS5UcmVlTmF2VmlldyhfdGhpcyk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgVHJlZU5hdi5wcm90b3R5cGUuaGFuZGxlRXZlbnQgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgIGlmIChjIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpXG4gICAgICAgICAgICAgICAgaWYgKGMgIT09IGUudGFyZ2V0KVxuICAgICAgICAgICAgICAgICAgICBjLmNsYXNzTGlzdC5yZW1vdmUoU3R5bGVzLkFDVElWRSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgVHJlZU5hdi5wcm90b3R5cGUucmVuZGVyZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoYykgeyByZXR1cm4gYy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF90aGlzKTsgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gVHJlZU5hdjtcbn0od21sX3J1bnRpbWVfMS5Db21wb25lbnQpKTtcbmV4cG9ydHMuVHJlZU5hdiA9IFRyZWVOYXY7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1UcmVlTmF2LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgd21sX3J1bnRpbWVfMSA9IHJlcXVpcmUoXCJAcXVlbmsvd21sLXJ1bnRpbWVcIik7XG52YXIgU3R5bGVzID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi9TdHlsZXNcIik7XG52YXIgdXRpbF8xID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi91dGlsXCIpO1xudmFyIFRyZWVOYXZJdGVtVmlldyA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoVHJlZU5hdkl0ZW1WaWV3LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFRyZWVOYXZJdGVtVmlldyhjb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbnRleHQpIHx8IHRoaXM7XG4gICAgICAgIHZhciB2aWV3ID0gX3RoaXM7XG4gICAgICAgIF90aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgnbGknLCB7IGh0bWw6IHsgJ2NsYXNzJzogU3R5bGVzLlRSRUVfTkFWX0xJU1RfSVRFTSB9LCB3bWw6IHt9IH0sIFt3bWxfcnVudGltZV8xLm5vZGUoJ2EnLCB7IGh0bWw6IHsgJ2NsYXNzJzogKHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzphY3RpdmUnLCBmYWxzZSkpID8gU3R5bGVzLkFDVElWRSA6ICcnLCAnaHJlZic6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpocmVmJywgJyMnKSwgJ29uY2xpY2snOiBmdW5jdGlvbiBmdW5jdGlvbl9saXRlcmFsXzcoKSB7IHJldHVybiB0aGlzLmFjdGl2YXRlKCkgfHwgdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3Om9uQ2xpY2snLCB1dGlsXzEubm9vcCkodGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3Om5hbWUnKSk7IH0uYmluZCh0aGlzKSB9LCB3bWw6IHsgJ2lkJzogXCJsaW5rXCIgfSB9LCBbd21sX3J1bnRpbWVfMS5kb21pZnkodGhpcy5jaGlsZHJlbildLCB2aWV3KV0sIHZpZXcpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBUcmVlTmF2SXRlbVZpZXc7XG59KHdtbF9ydW50aW1lXzEuQXBwVmlldykpO1xuZXhwb3J0cy5UcmVlTmF2SXRlbVZpZXcgPSBUcmVlTmF2SXRlbVZpZXc7XG52YXIgVHJlZU5hdlZpZXcgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFRyZWVOYXZWaWV3LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFRyZWVOYXZWaWV3KGNvbnRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29udGV4dCkgfHwgdGhpcztcbiAgICAgICAgdmFyIHZpZXcgPSBfdGhpcztcbiAgICAgICAgX3RoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCduYXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogU3R5bGVzLlRSRUVfTkFWIH0sIHdtbDogeyAnaWQnOiBcIm5hdlwiIH0gfSwgW3dtbF9ydW50aW1lXzEubm9kZSgndWwnLCB7IGh0bWw6IHsgJ2NsYXNzJzogU3R5bGVzLlRSRUVfTkFWX0xJU1QgfSwgd21sOiB7ICdpZCc6IFwibGlzdFwiIH0gfSwgW3dtbF9ydW50aW1lXzEuZG9taWZ5KHRoaXMuY2hpbGRyZW4pXSwgdmlldyldLCB2aWV3KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gVHJlZU5hdlZpZXc7XG59KHdtbF9ydW50aW1lXzEuQXBwVmlldykpO1xuZXhwb3J0cy5UcmVlTmF2VmlldyA9IFRyZWVOYXZWaWV3O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dHJlZS1uYXYuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5mdW5jdGlvbiBib3VuZGFyeV90b19kb3QodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUuc3BsaXQoJ11bJykuam9pbignLicpLnNwbGl0KCdbJykuam9pbignLicpO1xufVxuZnVuY3Rpb24gc3RyaXBfYnJhY2VzKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlLnNwbGl0KCdbJykuam9pbignLicpLnNwbGl0KCddJykuam9pbignJyk7XG59XG5mdW5jdGlvbiBlc2NhcGVfZG90cyh2YWx1ZSkge1xuICAgIHZhciB2YWwgPSB2YWx1ZS5zcGxpdCgnXFwnJyk7XG4gICAgcmV0dXJuICh2YWwubGVuZ3RoIDwgMykgPyB2YWwuam9pbignXFwnJykgOiB2YWwubWFwKGZ1bmN0aW9uIChzZWcpIHtcbiAgICAgICAgaWYgKHNlZy5sZW5ndGggPCAzKVxuICAgICAgICAgICAgcmV0dXJuIHNlZztcbiAgICAgICAgaWYgKChzZWdbMF0gPT09ICcuJykgfHwgKHNlZ1tzZWcubGVuZ3RoIC0gMV0gPT09ICcuJykpXG4gICAgICAgICAgICByZXR1cm4gc2VnO1xuICAgICAgICByZXR1cm4gc2VnLnNwbGl0KCcuJykuam9pbignJiYnKTtcbiAgICB9KS5qb2luKCcnKTtcbn1cbmZ1bmN0aW9uIHVuZXNjYXBlX2RvdHModmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUuc3BsaXQoJyYmJykuam9pbignLicpO1xufVxuZnVuY3Rpb24gcGFydGlmeSh2YWx1ZSkge1xuICAgIGlmICghdmFsdWUpXG4gICAgICAgIHJldHVybjtcbiAgICByZXR1cm4gZXNjYXBlX2RvdHMoc3RyaXBfYnJhY2VzKGJvdW5kYXJ5X3RvX2RvdCgnJyArIHZhbHVlKSkpLnNwbGl0KCcuJyk7XG59XG5mdW5jdGlvbiBjYW5DbG9uZShvKSB7XG4gICAgcmV0dXJuICh0eXBlb2Ygby5fX0NMT05FX18gPT09ICdmdW5jdGlvbicpO1xufVxuZnVuY3Rpb24gY2xvbmUobykge1xuICAgIGlmICgodHlwZW9mIG8gIT09ICdvYmplY3QnKSB8fCAobyA9PT0gbnVsbCkpXG4gICAgICAgIHJldHVybiBvO1xuICAgIGlmIChBcnJheS5pc0FycmF5KG8pKVxuICAgICAgICByZXR1cm4gby5tYXAoY2xvbmUpO1xuICAgIHJldHVybiAoY2FuQ2xvbmUobykpID9cbiAgICAgICAgby5fX0NMT05FX18oY2xvbmUpIDogKG8uY29uc3RydWN0b3IgIT09IE9iamVjdCkgPyBvIDpcbiAgICAgICAgT2JqZWN0LmtleXMobykucmVkdWNlKGZ1bmN0aW9uIChwcmUsIGspIHtcbiAgICAgICAgICAgIHByZVtrXSA9ICh0eXBlb2Ygb1trXSA9PT0gJ29iamVjdCcpID9cbiAgICAgICAgICAgICAgICBjbG9uZShvW2tdKSA6IG9ba107XG4gICAgICAgICAgICByZXR1cm4gcHJlO1xuICAgICAgICB9LCB7fSk7XG59XG5mdW5jdGlvbiBnZXQocGF0aCwgbykge1xuICAgIHZhciBwYXJ0cyA9IHBhcnRpZnkocGF0aCk7XG4gICAgdmFyIGZpcnN0O1xuICAgIGlmICh0eXBlb2YgbyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgaWYgKHBhcnRzLmxlbmd0aCA9PT0gMSlcbiAgICAgICAgICAgIHJldHVybiBvW3VuZXNjYXBlX2RvdHMocGFydHNbMF0pXTtcbiAgICAgICAgaWYgKHBhcnRzLmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgZmlyc3QgPSBvW3BhcnRzLnNoaWZ0KCldO1xuICAgICAgICByZXR1cm4gKCh0eXBlb2YgbyA9PT0gJ29iamVjdCcpICYmIChvICE9PSBudWxsKSkgP1xuICAgICAgICAgICAgcGFydHMucmVkdWNlKGZ1bmN0aW9uICh0YXJnZXQsIHByb3ApIHtcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0ID09IG51bGwpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldFt1bmVzY2FwZV9kb3RzKHByb3ApXTtcbiAgICAgICAgICAgIH0sIGZpcnN0KSA6IG51bGw7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdnZXQoKTogZXhwZWN0cyBhbiBvYmplY3QgZ290ICcgKyB0eXBlb2Ygbyk7XG4gICAgfVxufVxuZXhwb3J0cy5nZXQgPSBnZXQ7XG47XG5mdW5jdGlvbiBzZXQocGF0aCwgdmFsdWUsIG9iaikge1xuICAgIHZhciBwYXJ0cyA9IHBhcnRpZnkocGF0aCk7XG4gICAgaWYgKCh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0JykgfHwgKG9iaiA9PSBudWxsKSkge1xuICAgICAgICByZXR1cm4gY2xvbmUob2JqKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBfc2V0KG9iaiwgdmFsdWUsIHBhcnRzKTtcbiAgICB9XG59XG5leHBvcnRzLnNldCA9IHNldDtcbjtcbmZ1bmN0aW9uIF9zZXQob2JqLCB2YWx1ZSwgcGFydHMpIHtcbiAgICB2YXIgbztcbiAgICB2YXIgaztcbiAgICBpZiAocGFydHMubGVuZ3RoID09PSAwKVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgbyA9ICgodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHx8IChvYmogPT09IG51bGwpKSA/IHt9IDogY2xvbmUob2JqKTtcbiAgICBrID0gdW5lc2NhcGVfZG90cyhwYXJ0c1swXSk7XG4gICAgb1trXSA9IF9zZXQob1trXSwgdmFsdWUsIHBhcnRzLnNsaWNlKDEpKTtcbiAgICByZXR1cm4gbztcbn1cbmZ1bmN0aW9uIGRlZmF1bHRfMShrLCB2LCBvKSB7XG4gICAgaWYgKG8gPT0gbnVsbClcbiAgICAgICAgcmV0dXJuIGdldChrLCB2KTtcbiAgICBlbHNlXG4gICAgICAgIHJldHVybiBzZXQoaywgdiwgbyk7XG59XG5leHBvcnRzLmRlZmF1bHQgPSBkZWZhdWx0XzE7XG47XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBTdHlsZXMgPSByZXF1aXJlKFwid21sLXdpZGdldHMtY29tbW9uL1N0eWxlc1wiKTtcbnZhciB2aWV3XzEgPSByZXF1aXJlKFwiLi92aWV3XCIpO1xudmFyIFRhYmxlXzEgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL3RhYmxlL1RhYmxlXCIpO1xudmFyIGNvdW50ID0gMDtcbjtcbnZhciBOZXh0ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE5leHQobmFtZSwgYW1vdW50LCBzdGF0dXMsIHdhdGNoZXJzKSB7XG4gICAgICAgIGlmIChuYW1lID09PSB2b2lkIDApIHsgbmFtZSA9ICcnOyB9XG4gICAgICAgIGlmIChhbW91bnQgPT09IHZvaWQgMCkgeyBhbW91bnQgPSAwOyB9XG4gICAgICAgIGlmIChzdGF0dXMgPT09IHZvaWQgMCkgeyBzdGF0dXMgPSAnJzsgfVxuICAgICAgICBpZiAod2F0Y2hlcnMgPT09IHZvaWQgMCkgeyB3YXRjaGVycyA9IFtdOyB9XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuYW1vdW50ID0gYW1vdW50O1xuICAgICAgICB0aGlzLnN0YXR1cyA9IHN0YXR1cztcbiAgICAgICAgdGhpcy53YXRjaGVycyA9IHdhdGNoZXJzO1xuICAgIH1cbiAgICByZXR1cm4gTmV4dDtcbn0oKSk7XG5leHBvcnRzLk5leHQgPSBOZXh0O1xudmFyIGZpZWxkcyA9IFtcbiAgICB7IG5hbWU6ICdudW1iZXInLCBoZWFkaW5nOiAnTnVtYmVyJyB9LFxuICAgIHsgbmFtZTogJ25hbWUnLCBoZWFkaW5nOiAnTmFtZScgfSxcbiAgICB7IG5hbWU6ICdhbW91bnQnLCBoZWFkaW5nOiAnQW1vdW50JyB9LFxuICAgIHsgbmFtZTogJ3N0YXR1cycsIGhlYWRpbmc6ICdTdGF0dXMnIH0sXG4gICAgeyBuYW1lOiAnd2F0Y2hpbmcnLCBoZWFkaW5nOiAnV2F0Y2hpbmcnIH1cbl07XG52YXIgQXBwbGljYXRpb24gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQXBwbGljYXRpb24oKSB7XG4gICAgICAgIHRoaXMuZmllbGRzID0gZmllbGRzO1xuICAgICAgICB0aGlzLnRhYmxlTW9kZWwgPSBuZXcgVGFibGVfMS5Tb3J0VGFibGVNb2RlbCgpO1xuICAgICAgICB0aGlzLm5leHQgPSBuZXcgTmV4dCgpO1xuICAgICAgICB0aGlzLnJlY29yZHMgPSBbeyBuYW1lOiAnSm96YWluIEh1bGR1bScsIGFtb3VudDogMzIwMDAsIHN0YXR1czogJ2FjdGl2ZScsIHdhdGNoZXJzOiBbXSB9XTtcbiAgICAgICAgdGhpcy52aWV3ID0gbmV3IHZpZXdfMS5NYWluKHRoaXMpO1xuICAgIH1cbiAgICBBcHBsaWNhdGlvbi5wcm90b3R5cGUudG9nZ2xlRHJhd2VyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnZpZXcuZmluZEJ5SWQoJ2xheW91dCcpLnRvZ2dsZURyYXdlcigpO1xuICAgIH07XG4gICAgQXBwbGljYXRpb24ucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbCcpO1xuICAgICAgICB0aGlzLmRpYWxvZyA9IG5ldyB2aWV3XzEuQ3JlYXRlRGlhbG9nKHRoaXMpO1xuICAgICAgICB3aGlsZSAodGFyZ2V0LmZpcnN0Q2hpbGQpXG4gICAgICAgICAgICB0YXJnZXQucmVtb3ZlQ2hpbGQodGFyZ2V0LmZpcnN0Q2hpbGQpO1xuICAgICAgICB0YXJnZXQuYXBwZW5kQ2hpbGQodGhpcy5kaWFsb2cucmVuZGVyKCkpO1xuICAgIH07XG4gICAgQXBwbGljYXRpb24ucHJvdG90eXBlLnNhdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMucmVjb3Jkcy5wdXNoKHRoaXMubmV4dCk7XG4gICAgICAgIHRoaXMubmV4dCA9IG5ldyBOZXh0KCk7XG4gICAgICAgIHRoaXMuZGlhbG9nLmlkcy5tb2RhbC5jbG9zZSgpO1xuICAgICAgICB0aGlzLnZpZXcuaW52YWxpZGF0ZSgpO1xuICAgIH07XG4gICAgQXBwbGljYXRpb24ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgd2luZG93LmFwcCA9IHRoaXM7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYWluJykuYXBwZW5kQ2hpbGQodGhpcy52aWV3LnJlbmRlcigpKTtcbiAgICAgICAgdGhpcy5kcmF3ZXIgPSB0aGlzLnZpZXcuZmluZEJ5SWQoJ2xheW91dCcpO1xuICAgIH07XG4gICAgQXBwbGljYXRpb24ubWFpbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyB0aGlzKCk7XG4gICAgfTtcbiAgICByZXR1cm4gQXBwbGljYXRpb247XG59KCkpO1xudmFyIGFwcDtcbmFwcCA9IEFwcGxpY2F0aW9uLm1haW4oKTtcbmFwcC5ydW4oKTtcbnZhciBsYXlvdXQgPSBhcHAudmlldy5maW5kQnlJZCgnbGF5b3V0Jyk7XG52YXIgZHJhd2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShTdHlsZXMuRFJBV0VSKVswXTtcbmxheW91dC50b2dnbGVEcmF3ZXIoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHdtbF9ydW50aW1lXzEgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC1ydW50aW1lXCIpO1xudmFyIGNvbXBvbmVudHNfMSA9IHJlcXVpcmUoXCJAcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHNcIik7XG52YXIgY29tcG9uZW50c18yID0gcmVxdWlyZShcIkBxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50c1wiKTtcbnZhciBjb21wb25lbnRzXzMgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzXCIpO1xudmFyIGNvbXBvbmVudHNfNCA9IHJlcXVpcmUoXCJAcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHNcIik7XG52YXIgY29tcG9uZW50c181ID0gcmVxdWlyZShcIkBxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50c1wiKTtcbnZhciBjb21wb25lbnRzXzYgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzXCIpO1xudmFyIENyZWF0ZURpYWxvZyA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQ3JlYXRlRGlhbG9nLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIENyZWF0ZURpYWxvZyhjb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbnRleHQpIHx8IHRoaXM7XG4gICAgICAgIHZhciB2aWV3ID0gX3RoaXM7XG4gICAgICAgIF90aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHdtbF9ydW50aW1lXzEud2lkZ2V0KGNvbXBvbmVudHNfNS5Nb2RhbCwge1xuICAgICAgICAgICAgICAgIGh0bWw6IHt9LFxuICAgICAgICAgICAgICAgIHdtbDoge1xuICAgICAgICAgICAgICAgICAgICAnaWQnOiBcIm1vZGFsXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBbd21sX3J1bnRpbWVfMS53aWRnZXQoY29tcG9uZW50c181Lk1vZGFsSGVhZGVyLCB7XG4gICAgICAgICAgICAgICAgICAgIGh0bWw6IHt9LFxuICAgICAgICAgICAgICAgICAgICB3bWw6IHt9LFxuICAgICAgICAgICAgICAgICAgICB3dzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ29uQ2xvc2UnOiBmdW5jdGlvbiBmdW5jdGlvbl9saXRlcmFsXzEoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlhbG9nLmlkcy5tb2RhbC5jbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCBbd21sX3J1bnRpbWVfMS50ZXh0KFwiXFxuICAgICAgQ3JlYXRlIHJlY29yZFxcbiAgICBcIildLCB2aWV3KSwgd21sX3J1bnRpbWVfMS53aWRnZXQoY29tcG9uZW50c181Lk1vZGFsQm9keSwge1xuICAgICAgICAgICAgICAgICAgICBodG1sOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgd21sOiB7fVxuICAgICAgICAgICAgICAgIH0sIFt3bWxfcnVudGltZV8xLndpZGdldChjb21wb25lbnRzXzYuSW5wdXQsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGh0bWw6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgd21sOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHd3OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2lkJzogXCJuYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2xhYmVsJzogXCJOYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ29uSW5wdXQnOiBmdW5jdGlvbiBmdW5jdGlvbl9saXRlcmFsXzIoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5uZXh0Lm5hbWUgPSBlLnRhcmdldC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LmJpbmQodGhpcylcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwgW10sIHZpZXcpLCB3bWxfcnVudGltZV8xLndpZGdldChjb21wb25lbnRzXzYuSW5wdXQsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGh0bWw6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgd21sOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHd3OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2lkJzogXCJhbW91bnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbGFiZWwnOiBcIkFtb3VudFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd3YXJuJzogXCJEb24ndCBvdmVyIGRvIGl0IVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd0eXBlJzogXCJudW1iZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnb25JbnB1dCc6IGZ1bmN0aW9uIGZ1bmN0aW9uX2xpdGVyYWxfMyhlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm5leHQuYW1vdW50ID0gTnVtYmVyKGUudGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LmJpbmQodGhpcylcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwgW10sIHZpZXcpLCB3bWxfcnVudGltZV8xLndpZGdldChjb21wb25lbnRzXzYuU2VsZWN0LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBodG1sOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdtbDoge30sXG4gICAgICAgICAgICAgICAgICAgICAgICB3dzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdpZCc6IFwic3RhdHVzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2xhYmVsJzogXCJTdGF0dXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnb3B0aW9ucyc6IFsncGFpZCcsICdvdmVyZHVlJywgJ2hpc3RvcnknXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnb25JbnB1dCc6IGZ1bmN0aW9uIGZ1bmN0aW9uX2xpdGVyYWxfNChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm5leHQuc3RhdHVzID0gZS50YXJnZXQudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIFtdLCB2aWV3KSwgd21sX3J1bnRpbWVfMS5ub2RlKCdzcGFuJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDoge30sXG4gICAgICAgICAgICAgICAgICAgICAgICB3bWw6IHt9XG4gICAgICAgICAgICAgICAgICAgIH0sIFt3bWxfcnVudGltZV8xLnRleHQoXCIgUmVjZWl2ZSBOb3RpZmljYXRpb25zPyBcIildLCB2aWV3KSwgd21sX3J1bnRpbWVfMS53aWRnZXQoY29tcG9uZW50c182LlN3aXRjaCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDoge30sXG4gICAgICAgICAgICAgICAgICAgICAgICB3bWw6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgd3c6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnb25DaGFuZ2UnOiBmdW5jdGlvbiBmdW5jdGlvbl9saXRlcmFsXzUoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKGUudGFyZ2V0LnZhbHVlKSA/IHRoaXMubmV4dC53YXRjaGVycy5wdXNoKDEpIDogbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LmJpbmQodGhpcylcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwgW10sIHZpZXcpXSwgdmlldyksIHdtbF9ydW50aW1lXzEud2lkZ2V0KGNvbXBvbmVudHNfNS5Nb2RhbEZvb3Rlciwge1xuICAgICAgICAgICAgICAgICAgICBodG1sOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgd21sOiB7fVxuICAgICAgICAgICAgICAgIH0sIFt3bWxfcnVudGltZV8xLndpZGdldChjb21wb25lbnRzXzEuQnV0dG9uLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBodG1sOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdtbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdpZCc6IFwiY2FuY2VsQnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB3dzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd0ZXh0JzogXCJDYW5jZWxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnb25DbGljayc6IGZ1bmN0aW9uIGZ1bmN0aW9uX2xpdGVyYWxfNigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlhbG9nLmlkcy5tb2RhbC5jbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCBbXSwgdmlldyksIHdtbF9ydW50aW1lXzEud2lkZ2V0KGNvbXBvbmVudHNfMS5CdXR0b24sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGh0bWw6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgd21sOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2lkJzogXCJzYXZlQnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB3dzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdzdHlsZSc6IFwiLWRhbmdlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd0ZXh0JzogXCJTYXZlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2NsYXNzJzogXCItcmlnaHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnb25DbGljayc6IHRoaXMuc2F2ZS5iaW5kKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIFtdLCB2aWV3KV0sIHZpZXcpXSwgdmlldyk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIENyZWF0ZURpYWxvZztcbn0od21sX3J1bnRpbWVfMS5BcHBWaWV3KSk7XG5leHBvcnRzLkNyZWF0ZURpYWxvZyA9IENyZWF0ZURpYWxvZztcbmZ1bmN0aW9uIG5hdmlnYXRpb24odmlldykge1xuICAgIHJldHVybiB3bWxfcnVudGltZV8xLm5vZGUoJ3AnLCB7XG4gICAgICAgIGh0bWw6IHt9LFxuICAgICAgICB3bWw6IHt9XG4gICAgfSwgW3dtbF9ydW50aW1lXzEudGV4dChcIlRoaXMgaXMgaW4gdGhlIGRyYXdlclwiKV0sIHZpZXcpO1xufVxuZXhwb3J0cy5uYXZpZ2F0aW9uID0gbmF2aWdhdGlvbjtcbmZ1bmN0aW9uIGNvbnRlbnQodmlldykge1xuICAgIHJldHVybiB3bWxfcnVudGltZV8xLmJveCh3bWxfcnVudGltZV8xLndpZGdldChjb21wb25lbnRzXzEuQWN0aW9uQXJlYSwge1xuICAgICAgICBodG1sOiB7fSxcbiAgICAgICAgd21sOiB7XG4gICAgICAgICAgICAnaWQnOiBcImFjdGlvbnNcIlxuICAgICAgICB9XG4gICAgfSwgW3dtbF9ydW50aW1lXzEud2lkZ2V0KGNvbXBvbmVudHNfMS5NZW51QnV0dG9uLCB7XG4gICAgICAgICAgICBodG1sOiB7fSxcbiAgICAgICAgICAgIHdtbDoge30sXG4gICAgICAgICAgICB3dzoge1xuICAgICAgICAgICAgICAgICdvbkNsaWNrJzogdGhpcy50b2dnbGVEcmF3ZXIuYmluZCh0aGlzKVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCBbXSwgdmlldyksIHdtbF9ydW50aW1lXzEud2lkZ2V0KGNvbXBvbmVudHNfMS5CdXR0b25Hcm91cCwge1xuICAgICAgICAgICAgaHRtbDoge30sXG4gICAgICAgICAgICB3bWw6IHt9LFxuICAgICAgICAgICAgd3c6IHtcbiAgICAgICAgICAgICAgICAnY2xhc3MnOiBcIi1yaWdodFwiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIFt3bWxfcnVudGltZV8xLndpZGdldChjb21wb25lbnRzXzEuQnV0dG9uLCB7XG4gICAgICAgICAgICAgICAgaHRtbDoge30sXG4gICAgICAgICAgICAgICAgd21sOiB7XG4gICAgICAgICAgICAgICAgICAgICdpZCc6IFwiZGlzYWJsZWRCdXR0b25cIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgd3c6IHtcbiAgICAgICAgICAgICAgICAgICAgJ3N0eWxlJzogXCItZGVmYXVsdFwiLFxuICAgICAgICAgICAgICAgICAgICAndGV4dCc6IFwiRGlzYWJsZWRcIixcbiAgICAgICAgICAgICAgICAgICAgJ2Rpc2FibGVkJzogdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIFtdLCB2aWV3KSwgd21sX3J1bnRpbWVfMS53aWRnZXQoY29tcG9uZW50c18xLkJ1dHRvbiwge1xuICAgICAgICAgICAgICAgIGh0bWw6IHt9LFxuICAgICAgICAgICAgICAgIHdtbDoge1xuICAgICAgICAgICAgICAgICAgICAnaWQnOiBcImNyZWF0ZUJ1dHRvblwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB3dzoge1xuICAgICAgICAgICAgICAgICAgICAnc3R5bGUnOiBcIi1kYW5nZXJcIixcbiAgICAgICAgICAgICAgICAgICAgJ3RleHQnOiBcIkNyZWF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAnb25DbGljayc6IHRoaXMuY3JlYXRlLmJpbmQodGhpcylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBbXSwgdmlldyldLCB2aWV3KV0sIHZpZXcpLCB3bWxfcnVudGltZV8xLndpZGdldChjb21wb25lbnRzXzEuTWFpblZpZXcsIHtcbiAgICAgICAgaHRtbDoge30sXG4gICAgICAgIHdtbDoge1xuICAgICAgICAgICAgJ2lkJzogXCJtYWluXCJcbiAgICAgICAgfVxuICAgIH0sIFt3bWxfcnVudGltZV8xLndpZGdldChjb21wb25lbnRzXzIuQ29udGFpbmVyLCB7XG4gICAgICAgICAgICBodG1sOiB7fSxcbiAgICAgICAgICAgIHdtbDoge31cbiAgICAgICAgfSwgW3dtbF9ydW50aW1lXzEud2lkZ2V0KGNvbXBvbmVudHNfMi5Sb3csIHtcbiAgICAgICAgICAgICAgICBodG1sOiB7fSxcbiAgICAgICAgICAgICAgICB3bWw6IHt9XG4gICAgICAgICAgICB9LCBbd21sX3J1bnRpbWVfMS53aWRnZXQoY29tcG9uZW50c18yLkNvbHVtbiwge1xuICAgICAgICAgICAgICAgICAgICBodG1sOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgd21sOiB7fVxuICAgICAgICAgICAgICAgIH0sIFt3bWxfcnVudGltZV8xLndpZGdldChjb21wb25lbnRzXzQuUGFuZWwsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGh0bWw6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgd21sOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHd3OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3N0eWxlJzogXCItaW5mb1wiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIFt3bWxfcnVudGltZV8xLndpZGdldChjb21wb25lbnRzXzQuUGFuZWxIZWFkZXIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBodG1sOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3bWw6IHt9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBbd21sX3J1bnRpbWVfMS50ZXh0KFwiRGV0YWlsc1wiKV0sIHZpZXcpLCB3bWxfcnVudGltZV8xLndpZGdldChjb21wb25lbnRzXzQuUGFuZWxCb2R5LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDoge30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd21sOiB7fVxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgW3dtbF9ydW50aW1lXzEudGV4dChcIlJlY29yZHM6XCIpXSwgdmlldyksIHdtbF9ydW50aW1lXzEud2lkZ2V0KGNvbXBvbmVudHNfMy5UYWJsZSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGh0bWw6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdtbDoge30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd3c6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2ZpZWxkcyc6IHRoaXMuZmllbGRzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZGF0YSc6IHRoaXMucmVjb3JkcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ21vZGVsJzogdGhpcy50YWJsZU1vZGVsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgW10sIHZpZXcpLCB3bWxfcnVudGltZV8xLndpZGdldChjb21wb25lbnRzXzQuUGFuZWxGb290ZXIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBodG1sOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3bWw6IHt9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBbd21sX3J1bnRpbWVfMS5kb21pZnkodGhpcy5yZWNvcmRzLnJlZHVjZShmdW5jdGlvbiBmdW5jdGlvbl9saXRlcmFsXzcocCwgYykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcCArIGMuYW1vdW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSwgMCkpXSwgdmlldyldLCB2aWV3KV0sIHZpZXcpXSwgdmlldyldLCB2aWV3KV0sIHZpZXcpKTtcbn1cbmV4cG9ydHMuY29udGVudCA9IGNvbnRlbnQ7XG52YXIgTWFpbiA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoTWFpbiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBNYWluKGNvbnRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29udGV4dCkgfHwgdGhpcztcbiAgICAgICAgdmFyIHZpZXcgPSBfdGhpcztcbiAgICAgICAgX3RoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gd21sX3J1bnRpbWVfMS53aWRnZXQoY29tcG9uZW50c18xLkRyYXdlckxheW91dCwge1xuICAgICAgICAgICAgICAgIGh0bWw6IHt9LFxuICAgICAgICAgICAgICAgIHdtbDoge1xuICAgICAgICAgICAgICAgICAgICAnaWQnOiBcImxheW91dFwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB3dzoge1xuICAgICAgICAgICAgICAgICAgICAnZHJhd2VyJzogbmF2aWdhdGlvbixcbiAgICAgICAgICAgICAgICAgICAgJ2NvbnRlbnQnOiBjb250ZW50LmJpbmQodGhpcylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBbXSwgdmlldyk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIE1haW47XG59KHdtbF9ydW50aW1lXzEuQXBwVmlldykpO1xuZXhwb3J0cy5NYWluID0gTWFpbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXZpZXcuanMubWFwIl19
