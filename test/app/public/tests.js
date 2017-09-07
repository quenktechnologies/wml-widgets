(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function boundary_to_dot(value) {
    return value.split('][').join('.').split('[').join('.');
}
function strip_braces(value) {
    return value.split('[').join('.').split(']').join('');
}
function escape_dots(value) {
    value = value.split('\'');
    return (value.length < 3) ? value.join('\'') : value.map(function (seg) {
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
function clone(o) {
    if ((typeof o !== 'object') || (o === null))
        return o;
    if (Array.isArray(o))
        return o.map(clone);
    return (typeof o.__CLONE__ === 'function') ?
        o.__CLONE__(clone) : (o.constructor !== Object) ? o :
        Object.keys(o).reduce(function (pre, k) {
            pre[k] = (typeof o[k] === 'object') ? clone(o[k]) : o[k];
            return pre;
        }, {});
}
;
function get(path, o) {
    var parts = partify(path);
    var first;
    if (typeof o !== 'object')
        throw new TypeError('get(): expects an object got ' + typeof o);
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
exports.get = get;
;
function set(path, value, obj) {
    var parts = partify(path);
    if ((typeof obj !== 'object') || (obj == null)) {
        return obj;
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

},{}],2:[function(require,module,exports){
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

},{"property-seek":1}],3:[function(require,module,exports){
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
var Container = (function (_super) {
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

},{"@quenk/wml-runtime":2}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HIDDEN = '-hidden';
exports.DISABLED = '-disabled';
exports.ON = '-on';
exports.OFF = '-off';
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

},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util = require("./util");
exports.util = util;
var Styles = require("./Styles");
exports.Styles = Styles;
var Container_1 = require("./Container");
exports.Container = Container_1.Container;

},{"./Container":3,"./Styles":4,"./util":6}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
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
var ActionArea = (function (_super) {
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

},{"./wml/action_area":8,"wml-widgets-common":5}],8:[function(require,module,exports){
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
var Main = (function (_super) {
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

},{"@quenk/wml-runtime":2,"wml-widgets-common/Styles":4,"wml-widgets-common/util":6}],9:[function(require,module,exports){
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
var BreadCrumbs = (function (_super) {
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
var Crumb = (function (_super) {
    __extends(Crumb, _super);
    function Crumb() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new layout.Crumb(_this);
        return _this;
    }
    return Crumb;
}(wml_runtime_1.Component));
exports.Crumb = Crumb;

},{"./wml/breadcrumbs":10,"@quenk/wml-runtime":2}],10:[function(require,module,exports){
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
var BreadCrumbs = (function (_super) {
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
var Crumb = (function (_super) {
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

},{"@quenk/wml-runtime":2,"wml-widgets-common/Styles":4,"wml-widgets-common/util":6}],11:[function(require,module,exports){
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
var BusyIndicator = (function (_super) {
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

},{"./wml/busy_indicator":12,"@quenk/wml-runtime":2}],12:[function(require,module,exports){
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
var Main = (function (_super) {
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

},{"@quenk/wml-runtime":2}],13:[function(require,module,exports){
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
/**
 * Group multiple buttons into one element.
 */
var Group = (function (_super) {
    __extends(Group, _super);
    function Group() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Group(_this);
        return _this;
    }
    return Group;
}(common.Container));
exports.Group = Group;
;
/**
 * Button is an improvement over HTMLButtionElement
 */
var Button = (function (_super) {
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

},{"./wml/button":14,"wml-widgets-common":5}],14:[function(require,module,exports){
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
var Group = (function (_super) {
    __extends(Group, _super);
    function Group(context) {
        var _this = _super.call(this, context) || this;
        var view = _this;
        _this.template = function () {
            return wml_runtime_1.node('div', { html: { 'class': util_1.combine([Styles.BUTTON_GROUP, this.attributes.read('ww:class')]), 'role': "group" }, wml: {} }, [wml_runtime_1.domify(this.children)], view);
        };
        return _this;
    }
    return Group;
}(wml_runtime_1.AppView));
exports.Group = Group;
var Button = (function (_super) {
    __extends(Button, _super);
    function Button(context) {
        var _this = _super.call(this, context) || this;
        var view = _this;
        _this.template = function () {
            return wml_runtime_1.widget(_1.Fragment, { html: {}, wml: {} }, [wml_runtime_1.ifE(this.attributes.read('ww:href'), function if1() { return wml_runtime_1.node('a', { html: { 'href': this.attributes.read('ww:href'), 'class': util_1.combine([Styles.BUTTON, this.attributes.read('ww:variant', ''), this.attributes.read('ww:size', ''), this.attributes.read('ww:style', Styles.DEFAULT), this.attributes.read('ww:class')]), 'onclick': this.attributes.read('ww:onClick', util_1.noop) }, wml: { 'id': "button" } }, [wml_runtime_1.domify(this.attributes.read('ww:text')), wml_runtime_1.domify(this.children)], view); }.bind(this), function else_clause1() { return wml_runtime_1.node('button', { html: { 'type': this.attributes.read('ww:type', 'button'), 'name': this.attributes.read('ww:name', ''), 'disabled': (this.attributes.read('ww:disabled')) ? "true" : null, 'class': util_1.combine([Styles.BUTTON, this.attributes.read('ww:variant', ''), this.attributes.read('ww:size', ''), this.attributes.read('ww:style', Styles.DEFAULT), this.attributes.read('ww:class')]), 'onclick': this.attributes.read('ww:onClick', util_1.noop) }, wml: { 'id': "button" } }, [wml_runtime_1.domify(this.attributes.read('ww:text')), wml_runtime_1.domify(this.children)], view); }.bind(this))], view);
        };
        return _this;
    }
    return Button;
}(wml_runtime_1.AppView));
exports.Button = Button;

},{"../../":24,"@quenk/wml-runtime":2,"wml-widgets-common/Styles":4,"wml-widgets-common/util":6}],15:[function(require,module,exports){
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
var Card = (function (_super) {
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
var CardBody = (function (_super) {
    __extends(CardBody, _super);
    function CardBody() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new layout.CardBody(_this);
        return _this;
    }
    return CardBody;
}(wml_runtime_1.Component));
exports.CardBody = CardBody;

},{"./wml/card":16,"@quenk/wml-runtime":2}],16:[function(require,module,exports){
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
var Card = (function (_super) {
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
var CardBody = (function (_super) {
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

},{"@quenk/wml-runtime":2,"wml-widgets-common/util":6}],17:[function(require,module,exports){
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
var DrawerLayout = (function (_super) {
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

},{"./wml/drawer-layout":18,"wml-widgets-common":5}],18:[function(require,module,exports){
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
var Main = (function (_super) {
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

},{"../../drawer/Drawer":19,"@quenk/wml-runtime":2,"wml-widgets-common/Styles":4}],19:[function(require,module,exports){
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
var Drawer = (function (_super) {
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

},{"./wml/drawer":20,"@quenk/wml-runtime":2,"wml-widgets-common/Styles":4}],20:[function(require,module,exports){
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
var Main = (function (_super) {
    __extends(Main, _super);
    function Main(context) {
        var _this = _super.call(this, context) || this;
        var view = _this;
        _this.template = function () {
            return wml_runtime_1.node('div', { html: { 'class': Styles.DRAWER }, wml: { 'id': "drawer" } }, [wml_runtime_1.node('div', { html: { 'class': Styles.DRAWER_CONTENT }, wml: {} }, [wml_runtime_1.ifE(this.attributes.read('ww:content'), function if0() { return this.attributes.read('ww:content').call(this, view); }.bind(this), function else_clause0() { return wml_runtime_1.domify(this.children); }.bind(this))], view)], view);
        };
        return _this;
    }
    return Main;
}(wml_runtime_1.AppView));
exports.Main = Main;

},{"@quenk/wml-runtime":2,"wml-widgets-common/Styles":4}],21:[function(require,module,exports){
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
var Fragment = (function (_super) {
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

},{"@quenk/wml-runtime":2}],22:[function(require,module,exports){
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
var Container = (function (_super) {
    __extends(Container, _super);
    function Container() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Container(_this);
        return _this;
    }
    return Container;
}(wml_runtime_1.Component));
exports.Container = Container;
var Row = (function (_super) {
    __extends(Row, _super);
    function Row() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Row(_this);
        return _this;
    }
    return Row;
}(wml_runtime_1.Component));
exports.Row = Row;
var Column = (function (_super) {
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

},{"./wml/grid":23,"@quenk/wml-runtime":2,"wml-widgets-common/Styles":4}],23:[function(require,module,exports){
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
var Container = (function (_super) {
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
var Row = (function (_super) {
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
var Column = (function (_super) {
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

},{"@quenk/wml-runtime":2,"wml-widgets-common/Styles":4,"wml-widgets-common/util":6}],24:[function(require,module,exports){
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

},{"./action-area/ActionArea":7,"./breadcrumbs":9,"./busy-indicator/BusyIndicator":11,"./button/Button":13,"./card/Card":15,"./drawer-layout/DrawerLayout":17,"./drawer/Drawer":19,"./fragment/Fragment":21,"./grid/Grid":22,"./input/Input":25,"./main-view/MainView":27,"./menu-button/MenuButton":29,"./modal/Modal":31,"./panel/Panel":33,"./switch/Switch":35,"./table/Table":37,"./tabs/Tabs":39,"./tree-nav/TreeNav":41}],25:[function(require,module,exports){
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
var DefaultInputDelegate = (function () {
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
var Input = (function (_super) {
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
        return (this.view.ids.input.value != null);
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
var Select = (function (_super) {
    __extends(Select, _super);
    function Select() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new input_1.SelectView(_this);
        return _this;
    }
    return Select;
}(Input));
exports.Select = Select;

},{"./wml/input":26,"@quenk/wml-runtime":2,"wml-widgets-common/util":6}],26:[function(require,module,exports){
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
var SelectView = (function (_super) {
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
var InputView = (function (_super) {
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

},{"@quenk/wml-runtime":2,"wml-widgets-common/Styles":4}],27:[function(require,module,exports){
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
var MainView = (function (_super) {
    __extends(MainView, _super);
    function MainView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new main_view_1.Main(_this);
        return _this;
    }
    return MainView;
}(common.Container));
exports.MainView = MainView;

},{"./wml/main-view":28,"wml-widgets-common":5}],28:[function(require,module,exports){
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
var Main = (function (_super) {
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

},{"@quenk/wml-runtime":2,"wml-widgets-common/Styles":4,"wml-widgets-common/util":6}],29:[function(require,module,exports){
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
var MenuButton = (function (_super) {
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

},{"./wml/menu_button":30,"@quenk/wml-runtime":2}],30:[function(require,module,exports){
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
var Main = (function (_super) {
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

},{"@quenk/wml-runtime":2,"wml-widgets-common/Styles":4,"wml-widgets-common/util":6}],31:[function(require,module,exports){
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
var Modal = (function (_super) {
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
var Header = (function (_super) {
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
var Body = (function (_super) {
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
var Footer = (function (_super) {
    __extends(Footer, _super);
    function Footer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Footer(_this);
        return _this;
    }
    return Footer;
}(wml_runtime_1.Component));
exports.Footer = Footer;

},{"./wml/modal":32,"@quenk/wml-runtime":2}],32:[function(require,module,exports){
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
var Modal = (function (_super) {
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
var Header = (function (_super) {
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
var Body = (function (_super) {
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
var Footer = (function (_super) {
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

},{"@quenk/wml-runtime":2,"wml-widgets-common/Styles":4,"wml-widgets-common/util":6}],33:[function(require,module,exports){
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
var Panel = (function (_super) {
    __extends(Panel, _super);
    function Panel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Panel(_this);
        return _this;
    }
    return Panel;
}(wml_runtime_1.Component));
exports.Panel = Panel;
var Header = (function (_super) {
    __extends(Header, _super);
    function Header() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Header(_this);
        return _this;
    }
    return Header;
}(wml_runtime_1.Component));
exports.Header = Header;
var Body = (function (_super) {
    __extends(Body, _super);
    function Body() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Body(_this);
        return _this;
    }
    return Body;
}(wml_runtime_1.Component));
exports.Body = Body;
var Footer = (function (_super) {
    __extends(Footer, _super);
    function Footer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Footer(_this);
        return _this;
    }
    return Footer;
}(wml_runtime_1.Component));
exports.Footer = Footer;

},{"./wml/panel":34,"@quenk/wml-runtime":2}],34:[function(require,module,exports){
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
var Panel = (function (_super) {
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
var Header = (function (_super) {
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
var Body = (function (_super) {
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
var Footer = (function (_super) {
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

},{"@quenk/wml-runtime":2,"wml-widgets-common/Styles":4,"wml-widgets-common/util":6}],35:[function(require,module,exports){
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
var Switch = (function (_super) {
    __extends(Switch, _super);
    function Switch() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new switch_1.Main(_this);
        return _this;
    }
    return Switch;
}(wml_runtime_1.Component));
exports.Switch = Switch;

},{"./wml/switch":36,"@quenk/wml-runtime":2}],36:[function(require,module,exports){
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
var Main = (function (_super) {
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

},{"@quenk/wml-runtime":2,"wml-widgets-common/Styles":4,"wml-widgets-common/util":6}],37:[function(require,module,exports){
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
var HeadingClickedEvent = (function () {
    function HeadingClickedEvent(name, field, table) {
        this.name = name;
        this.field = field;
        this.table = table;
    }
    return HeadingClickedEvent;
}());
exports.HeadingClickedEvent = HeadingClickedEvent;
var RowClickedEvent = (function () {
    function RowClickedEvent(value, index, data, table) {
        this.value = value;
        this.index = index;
        this.data = data;
        this.table = table;
    }
    return RowClickedEvent;
}());
exports.RowClickedEvent = RowClickedEvent;
var RowSelectedEvent = (function (_super) {
    __extends(RowSelectedEvent, _super);
    function RowSelectedEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RowSelectedEvent;
}(RowClickedEvent));
exports.RowSelectedEvent = RowSelectedEvent;
var CellClickedEvent = (function () {
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
var DefaultTableModel = (function () {
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
var SortTableModel = (function (_super) {
    __extends(SortTableModel, _super);
    function SortTableModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SortTableModel.prototype.headingClicked = function (e) { e.table.sort(e.name); };
    return SortTableModel;
}(DefaultTableModel));
exports.SortTableModel = SortTableModel;
var Table = (function (_super) {
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

},{"./wml/table":38,"@quenk/wml-runtime":2,"property-seek":43}],38:[function(require,module,exports){
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
var TableView = (function (_super) {
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

},{"../../":24,"../Table":37,"@quenk/wml-runtime":2,"property-seek":43,"wml-widgets-common/Styles":4}],39:[function(require,module,exports){
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
var Tab = (function (_super) {
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
var Tabs = (function (_super) {
    __extends(Tabs, _super);
    function Tabs() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new tabs_1.TabsView(_this);
        return _this;
    }
    return Tabs;
}(wml_runtime_1.Component));
exports.Tabs = Tabs;

},{"./wml/tabs":40,"@quenk/wml-runtime":2,"wml-widgets-common/Styles":4,"wml-widgets-common/util":6}],40:[function(require,module,exports){
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
var TabView = (function (_super) {
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
var TabsView = (function (_super) {
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

},{"@quenk/wml-runtime":2,"wml-widgets-common/Styles":4}],41:[function(require,module,exports){
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
var TreeNavItem = (function (_super) {
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
var TreeNav = (function (_super) {
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

},{"./wml/tree-nav":42,"@quenk/wml-runtime":2,"wml-widgets-common/Styles":4}],42:[function(require,module,exports){
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
var TreeNavItemView = (function (_super) {
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
var TreeNavView = (function (_super) {
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

},{"@quenk/wml-runtime":2,"wml-widgets-common/Styles":4,"wml-widgets-common/util":6}],43:[function(require,module,exports){
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

},{}],44:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Styles = require("wml-widgets-common/Styles");
var view_1 = require("./view");
var Table_1 = require("@quenk/wml-widgets/lib/components/table/Table");
var count = 0;
;
var Next = (function () {
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
var Application = (function () {
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

},{"./view":45,"@quenk/wml-widgets/lib/components/table/Table":37,"wml-widgets-common/Styles":4}],45:[function(require,module,exports){
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
var CreateDialog = (function (_super) {
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
var Main = (function (_super) {
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

},{"@quenk/wml-runtime":2,"@quenk/wml-widgets/lib/components":24}]},{},[44])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi93bWwtcnVudGltZS9ub2RlX21vZHVsZXMvcHJvcGVydHktc2Vlay9pbmRleC5qcyIsIi4uL3dtbC1ydW50aW1lL3NyYy9pbmRleC5qcyIsImxpYi9jb21wb25lbnRzL3dtbC13aWRnZXRzLWNvbW1vbi9Db250YWluZXIuanMiLCJsaWIvY29tcG9uZW50cy93bWwtd2lkZ2V0cy1jb21tb24vU3R5bGVzLmpzIiwibGliL2NvbXBvbmVudHMvd21sLXdpZGdldHMtY29tbW9uL2luZGV4LmpzIiwibGliL2NvbXBvbmVudHMvd21sLXdpZGdldHMtY29tbW9uL3V0aWwuanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL2FjdGlvbi1hcmVhL0FjdGlvbkFyZWEuanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL2FjdGlvbi1hcmVhL3dtbC9hY3Rpb25fYXJlYS5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvYnJlYWRjcnVtYnMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL2JyZWFkY3J1bWJzL3dtbC9icmVhZGNydW1icy5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvYnVzeS1pbmRpY2F0b3IvQnVzeUluZGljYXRvci5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvYnVzeS1pbmRpY2F0b3Ivd21sL2J1c3lfaW5kaWNhdG9yLmpzIiwibm9kZV9tb2R1bGVzL0BxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50cy9idXR0b24vQnV0dG9uLmpzIiwibm9kZV9tb2R1bGVzL0BxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50cy9idXR0b24vd21sL2J1dHRvbi5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvY2FyZC9DYXJkLmpzIiwibm9kZV9tb2R1bGVzL0BxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50cy9jYXJkL3dtbC9jYXJkLmpzIiwibm9kZV9tb2R1bGVzL0BxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50cy9kcmF3ZXItbGF5b3V0L0RyYXdlckxheW91dC5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvZHJhd2VyLWxheW91dC93bWwvZHJhd2VyLWxheW91dC5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvZHJhd2VyL0RyYXdlci5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvZHJhd2VyL3dtbC9kcmF3ZXIuanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL2ZyYWdtZW50L0ZyYWdtZW50LmpzIiwibm9kZV9tb2R1bGVzL0BxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50cy9ncmlkL0dyaWQuanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL2dyaWQvd21sL2dyaWQuanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL0BxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50cy9pbnB1dC9JbnB1dC5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvaW5wdXQvd21sL2lucHV0LmpzIiwibm9kZV9tb2R1bGVzL0BxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50cy9tYWluLXZpZXcvTWFpblZpZXcuanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL21haW4tdmlldy93bWwvbWFpbi12aWV3LmpzIiwibm9kZV9tb2R1bGVzL0BxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50cy9tZW51LWJ1dHRvbi9NZW51QnV0dG9uLmpzIiwibm9kZV9tb2R1bGVzL0BxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50cy9tZW51LWJ1dHRvbi93bWwvbWVudV9idXR0b24uanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL21vZGFsL01vZGFsLmpzIiwibm9kZV9tb2R1bGVzL0BxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50cy9tb2RhbC93bWwvbW9kYWwuanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL3BhbmVsL1BhbmVsLmpzIiwibm9kZV9tb2R1bGVzL0BxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50cy9wYW5lbC93bWwvcGFuZWwuanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL3N3aXRjaC9Td2l0Y2guanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL3N3aXRjaC93bWwvc3dpdGNoLmpzIiwibm9kZV9tb2R1bGVzL0BxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50cy90YWJsZS9UYWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvdGFibGUvd21sL3RhYmxlLmpzIiwibm9kZV9tb2R1bGVzL0BxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50cy90YWJzL1RhYnMuanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL3RhYnMvd21sL3RhYnMuanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL3RyZWUtbmF2L1RyZWVOYXYuanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL3RyZWUtbmF2L3dtbC90cmVlLW5hdi5qcyIsIm5vZGVfbW9kdWxlcy9wcm9wZXJ0eS1zZWVrL2luZGV4LmpzIiwidGVzdC9hcHAvYXBwLmpzIiwidGVzdC9hcHAvdmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6UEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3REQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5mdW5jdGlvbiBib3VuZGFyeV90b19kb3QodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUuc3BsaXQoJ11bJykuam9pbignLicpLnNwbGl0KCdbJykuam9pbignLicpO1xufVxuZnVuY3Rpb24gc3RyaXBfYnJhY2VzKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlLnNwbGl0KCdbJykuam9pbignLicpLnNwbGl0KCddJykuam9pbignJyk7XG59XG5mdW5jdGlvbiBlc2NhcGVfZG90cyh2YWx1ZSkge1xuICAgIHZhbHVlID0gdmFsdWUuc3BsaXQoJ1xcJycpO1xuICAgIHJldHVybiAodmFsdWUubGVuZ3RoIDwgMykgPyB2YWx1ZS5qb2luKCdcXCcnKSA6IHZhbHVlLm1hcChmdW5jdGlvbiAoc2VnKSB7XG4gICAgICAgIGlmIChzZWcubGVuZ3RoIDwgMylcbiAgICAgICAgICAgIHJldHVybiBzZWc7XG4gICAgICAgIGlmICgoc2VnWzBdID09PSAnLicpIHx8IChzZWdbc2VnLmxlbmd0aCAtIDFdID09PSAnLicpKVxuICAgICAgICAgICAgcmV0dXJuIHNlZztcbiAgICAgICAgcmV0dXJuIHNlZy5zcGxpdCgnLicpLmpvaW4oJyYmJyk7XG4gICAgfSkuam9pbignJyk7XG59XG5mdW5jdGlvbiB1bmVzY2FwZV9kb3RzKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlLnNwbGl0KCcmJicpLmpvaW4oJy4nKTtcbn1cbmZ1bmN0aW9uIHBhcnRpZnkodmFsdWUpIHtcbiAgICBpZiAoIXZhbHVlKVxuICAgICAgICByZXR1cm47XG4gICAgcmV0dXJuIGVzY2FwZV9kb3RzKHN0cmlwX2JyYWNlcyhib3VuZGFyeV90b19kb3QoJycgKyB2YWx1ZSkpKS5zcGxpdCgnLicpO1xufVxuZnVuY3Rpb24gY2xvbmUobykge1xuICAgIGlmICgodHlwZW9mIG8gIT09ICdvYmplY3QnKSB8fCAobyA9PT0gbnVsbCkpXG4gICAgICAgIHJldHVybiBvO1xuICAgIGlmIChBcnJheS5pc0FycmF5KG8pKVxuICAgICAgICByZXR1cm4gby5tYXAoY2xvbmUpO1xuICAgIHJldHVybiAodHlwZW9mIG8uX19DTE9ORV9fID09PSAnZnVuY3Rpb24nKSA/XG4gICAgICAgIG8uX19DTE9ORV9fKGNsb25lKSA6IChvLmNvbnN0cnVjdG9yICE9PSBPYmplY3QpID8gbyA6XG4gICAgICAgIE9iamVjdC5rZXlzKG8pLnJlZHVjZShmdW5jdGlvbiAocHJlLCBrKSB7XG4gICAgICAgICAgICBwcmVba10gPSAodHlwZW9mIG9ba10gPT09ICdvYmplY3QnKSA/IGNsb25lKG9ba10pIDogb1trXTtcbiAgICAgICAgICAgIHJldHVybiBwcmU7XG4gICAgICAgIH0sIHt9KTtcbn1cbjtcbmZ1bmN0aW9uIGdldChwYXRoLCBvKSB7XG4gICAgdmFyIHBhcnRzID0gcGFydGlmeShwYXRoKTtcbiAgICB2YXIgZmlyc3Q7XG4gICAgaWYgKHR5cGVvZiBvICE9PSAnb2JqZWN0JylcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZ2V0KCk6IGV4cGVjdHMgYW4gb2JqZWN0IGdvdCAnICsgdHlwZW9mIG8pO1xuICAgIGlmIChwYXJ0cy5sZW5ndGggPT09IDEpXG4gICAgICAgIHJldHVybiBvW3VuZXNjYXBlX2RvdHMocGFydHNbMF0pXTtcbiAgICBpZiAocGFydHMubGVuZ3RoID09PSAwKVxuICAgICAgICByZXR1cm47XG4gICAgZmlyc3QgPSBvW3BhcnRzLnNoaWZ0KCldO1xuICAgIHJldHVybiAoKHR5cGVvZiBvID09PSAnb2JqZWN0JykgJiYgKG8gIT09IG51bGwpKSA/XG4gICAgICAgIHBhcnRzLnJlZHVjZShmdW5jdGlvbiAodGFyZ2V0LCBwcm9wKSB7XG4gICAgICAgICAgICBpZiAodGFyZ2V0ID09IG51bGwpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICAgICAgICAgIHJldHVybiB0YXJnZXRbdW5lc2NhcGVfZG90cyhwcm9wKV07XG4gICAgICAgIH0sIGZpcnN0KSA6IG51bGw7XG59XG5leHBvcnRzLmdldCA9IGdldDtcbjtcbmZ1bmN0aW9uIHNldChwYXRoLCB2YWx1ZSwgb2JqKSB7XG4gICAgdmFyIHBhcnRzID0gcGFydGlmeShwYXRoKTtcbiAgICBpZiAoKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB8fCAob2JqID09IG51bGwpKSB7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gX3NldChvYmosIHZhbHVlLCBwYXJ0cyk7XG4gICAgfVxufVxuZXhwb3J0cy5zZXQgPSBzZXQ7XG47XG5mdW5jdGlvbiBfc2V0KG9iaiwgdmFsdWUsIHBhcnRzKSB7XG4gICAgdmFyIG87XG4gICAgdmFyIGs7XG4gICAgaWYgKHBhcnRzLmxlbmd0aCA9PT0gMClcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIG8gPSAoKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB8fCAob2JqID09PSBudWxsKSkgPyB7fSA6IGNsb25lKG9iaik7XG4gICAgayA9IHVuZXNjYXBlX2RvdHMocGFydHNbMF0pO1xuICAgIG9ba10gPSBfc2V0KG9ba10sIHZhbHVlLCBwYXJ0cy5zbGljZSgxKSk7XG4gICAgcmV0dXJuIG87XG59XG5mdW5jdGlvbiBkZWZhdWx0XzEoaywgdiwgbykge1xuICAgIGlmIChvID09IG51bGwpXG4gICAgICAgIHJldHVybiBnZXQoaywgdik7XG4gICAgZWxzZVxuICAgICAgICByZXR1cm4gc2V0KGssIHYsIG8pO1xufVxuZXhwb3J0cy5kZWZhdWx0ID0gZGVmYXVsdF8xO1xuO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgcHJvcGVydHlfc2Vla18xID0gcmVxdWlyZShcInByb3BlcnR5LXNlZWtcIik7XG47XG52YXIgQ29tcG9uZW50ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDb21wb25lbnQoYXR0cmlidXRlcywgY2hpbGRyZW4pIHtcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVzID0gYXR0cmlidXRlcztcbiAgICAgICAgdGhpcy5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICAgIH1cbiAgICBDb21wb25lbnQucHJvdG90eXBlLnJlbmRlcmVkID0gZnVuY3Rpb24gKCkgeyB9O1xuICAgIENvbXBvbmVudC5wcm90b3R5cGUucmVtb3ZlZCA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICBDb21wb25lbnQucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMudmlldy5yZW5kZXIoKTsgfTtcbiAgICByZXR1cm4gQ29tcG9uZW50O1xufSgpKTtcbmV4cG9ydHMuQ29tcG9uZW50ID0gQ29tcG9uZW50O1xuO1xuLyoqXG4gKiBBdHRyaWJ1dGVzIHByb3ZpZGVzIGFuIEFQSSBmb3IgcmVhZGluZyB0aGVcbiAqIGF0dHJpYnV0ZXMgc3VwcGxpZWQgdG8gYW4gRWxlbWVudC5cbiAqL1xudmFyIEF0dHJpYnV0ZXMgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEF0dHJpYnV0ZXMoYXR0cnMpIHtcbiAgICAgICAgdGhpcy5hdHRycyA9IGF0dHJzO1xuICAgIH1cbiAgICBBdHRyaWJ1dGVzLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAocGF0aCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWFkKHBhdGgsIG51bGwpICE9IG51bGw7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiByZWFkIGEgdmFsdWUgZm9ybSB0aGUgaW50ZXJuYWwgbGlzdC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aFxuICAgICAqIEBwYXJhbSB7Kn0gZGVmYXVsdFZhbHVlIC0gVGhpcyB2YWx1ZSBpcyByZXR1cm5lZCBpZiB0aGUgdmFsdWUgaXMgbm90IHNldC5cbiAgICAgKi9cbiAgICBBdHRyaWJ1dGVzLnByb3RvdHlwZS5yZWFkID0gZnVuY3Rpb24gKHBhdGgsIGRlZmF1bHRWYWx1ZSkge1xuICAgICAgICB2YXIgcmV0ID0gcHJvcGVydHlfc2Vla18xLmRlZmF1bHQocGF0aC5zcGxpdCgnOicpLmpvaW4oJy4nKSwgdGhpcy5hdHRycyk7XG4gICAgICAgIHJldHVybiAocmV0ICE9IG51bGwpID8gcmV0IDogKGRlZmF1bHRWYWx1ZSAhPSBudWxsKSA/IGRlZmF1bHRWYWx1ZSA6ICcnO1xuICAgIH07XG4gICAgcmV0dXJuIEF0dHJpYnV0ZXM7XG59KCkpO1xuZXhwb3J0cy5BdHRyaWJ1dGVzID0gQXR0cmlidXRlcztcbnZhciBhZG9wdCA9IGZ1bmN0aW9uIChjaGlsZCwgZSkge1xuICAgIC8vIGlmIChjaGlsZCBpbnN0YW5jZW9mIEFycmF5KVxuICAgIC8vIHJldHVybiBjaGlsZC5mb3JFYWNoKGlubmVyQ2hpbGQgPT4gYWRvcHQoaW5uZXJDaGlsZCwgZSkpO1xuICAgIHN3aXRjaCAodHlwZW9mIGNoaWxkKSB7XG4gICAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICAgICAgZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJyArIGNoaWxkKSk7XG4gICAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgICAgICBlLmFwcGVuZENoaWxkKGNoaWxkKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbiBub3QgYWRvcHQgY2hpbGQgXCIgKyBjaGlsZCArIFwiIG9mIHR5cGUgXCIgKyB0eXBlb2YgY2hpbGQpO1xuICAgIH1cbn07XG5leHBvcnRzLmJveCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY29udGVudCA9IFtdO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIGNvbnRlbnRbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgdmFyIGZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgY29udGVudC5mb3JFYWNoKGZ1bmN0aW9uIChjKSB7IHJldHVybiBmcmFnLmFwcGVuZENoaWxkKGMpOyB9KTtcbiAgICByZXR1cm4gZnJhZztcbn07XG5leHBvcnRzLmRvbWlmeSA9IGZ1bmN0aW9uIChhKSB7XG4gICAgaWYgKGEgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICByZXR1cm4gZXhwb3J0cy5ib3guYXBwbHkobnVsbCwgYS5tYXAoZXhwb3J0cy5kb21pZnkpKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoKHR5cGVvZiBhID09PSAnc3RyaW5nJykgfHxcbiAgICAgICAgKHR5cGVvZiBhID09PSAnbnVtYmVyJykgfHxcbiAgICAgICAgKHR5cGVvZiBhID09PSAnYm9vbGVhbicpKSB7XG4gICAgICAgIHJldHVybiBleHBvcnRzLnRleHQoYSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGEgaW5zdGFuY2VvZiBOb2RlKSB7XG4gICAgICAgIHJldHVybiBhO1xuICAgIH1cbiAgICBlbHNlIGlmIChhID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIF9lbXB0eTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW4gbm90IHVzZSAnXCIgKyBhICsgXCInKHR5cGVvZiBcIiArIHR5cGVvZiBhICsgXCIpIGFzIENvbnRlbnQhXCIpO1xuICAgIH1cbn07XG52YXIgX2VtcHR5ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuZXhwb3J0cy5lbXB0eSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9lbXB0eTsgfTtcbi8qKlxuICogdGV4dFxuICovXG5leHBvcnRzLnRleHQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycgKyB2YWx1ZSk7XG59O1xuLyoqXG4gKiByZXNvbHZlIHByb3BlcnR5IGFjY2VzcyBleHByZXNzaW9uIHRvIGF2b2lkXG4gKiB0aG93aW5nIGVycm9ycyBpZiBpdCBkb2VzIG5vdCBleGlzdC5cbiAqL1xuZXhwb3J0cy5yZXNvbHZlID0gZnVuY3Rpb24gKGhlYWQsIHBhdGgpIHtcbiAgICBpZiAoKGhlYWQgPT0gbnVsbCkgfHwgaGVhZCA9PSAnJylcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIHZhciByZXQgPSBwcm9wZXJ0eV9zZWVrXzEuZGVmYXVsdChwYXRoLCBoZWFkKTtcbiAgICByZXR1cm4gKHJldCA9PSBudWxsKSA/ICcnIDogcmV0O1xufTtcbi8qKlxuICogbm9kZSBpcyBjYWxsZWQgdG8gY3JlYXRlIGEgcmVndWxhciBET00gbm9kZVxuICovXG5leHBvcnRzLm5vZGUgPSBmdW5jdGlvbiAodGFnLCBhdHRyaWJ1dGVzLCBjaGlsZHJlbiwgdmlldykge1xuICAgIHZhciBlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xuICAgIGlmICh0eXBlb2YgYXR0cmlidXRlc1snaHRtbCddID09PSAnb2JqZWN0JylcbiAgICAgICAgT2JqZWN0LmtleXMoYXR0cmlidXRlc1snaHRtbCddKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IGF0dHJpYnV0ZXNbJ2h0bWwnXVtrZXldO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIGVba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gJycpXG4gICAgICAgICAgICAgICAgICAgIGUuc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgICAgICBlLnNldEF0dHJpYnV0ZShrZXksIFwiXCIgKyB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIGNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKGMpIHsgcmV0dXJuIGFkb3B0KGMsIGUpOyB9KTtcbiAgICB2YXIgaWQgPSBhdHRyaWJ1dGVzWyd3bWwnXS5pZDtcbiAgICB2YXIgZ3JvdXAgPSBhdHRyaWJ1dGVzLndtbC5ncm91cDtcbiAgICBpZiAoaWQpXG4gICAgICAgIHZpZXcucmVnaXN0ZXIoaWQsIGUpO1xuICAgIGlmIChncm91cClcbiAgICAgICAgdmlldy5yZWdpc3Rlckdyb3VwKGdyb3VwLCBlKTtcbiAgICByZXR1cm4gZTtcbn07XG4vKipcbiAqIHdpZGdldCBjcmVhdGVzIGEgd21sIHdpZGdldC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IENvbnN0cnV0b3JcbiAqIEBwYXJhbSB7b2JqZWN0fSBhdHRyaWJ1dGVzXG4gKiBAcGFyYW0ge2FycmF5PHN0cmluZ3xudW1iZXJ8V2lkZ2V0Pn0gY2hpbGRyZW5cbiAqIEBwYXJhbSB7Vmlld30gdmlld1xuICogQHJldHVybiB7V2lkZ2V0fVxuICovXG5leHBvcnRzLndpZGdldCA9IGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgYXR0cmlidXRlcywgY2hpbGRyZW4sIHZpZXcpIHtcbiAgICB2YXIgY2hpbGRzID0gW107XG4gICAgdmFyIHc7XG4gICAgY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoY2hpbGQpIHsgcmV0dXJuIChjaGlsZCBpbnN0YW5jZW9mIEFycmF5KSA/XG4gICAgICAgIGNoaWxkcy5wdXNoLmFwcGx5KGNoaWxkcywgY2hpbGQpIDogY2hpbGRzLnB1c2goY2hpbGQpOyB9KTtcbiAgICB3ID0gbmV3IENvbnN0cnVjdG9yKG5ldyBBdHRyaWJ1dGVzKGF0dHJpYnV0ZXMpLCBjaGlsZHMpO1xuICAgIHZhciBpZCA9IGF0dHJpYnV0ZXMud21sLmlkO1xuICAgIHZhciBncm91cCA9IGF0dHJpYnV0ZXMud21sLmdyb3VwO1xuICAgIGlmIChpZClcbiAgICAgICAgdmlldy5yZWdpc3RlcihpZCwgdyk7XG4gICAgaWYgKGdyb3VwKVxuICAgICAgICB2aWV3LnJlZ2lzdGVyR3JvdXAoZ3JvdXAsIHcpO1xuICAgIHZpZXcud2lkZ2V0cy5wdXNoKHcpO1xuICAgIHJldHVybiB3LnJlbmRlcigpO1xufTtcbi8qKlxuICogaWZFIHByb3ZpZGVzIGFuIGlmIHRoZW4gZXhwcmVzc2lvblxuICovXG5leHBvcnRzLmlmRSA9IGZ1bmN0aW9uIChwcmVkaWNhdGUsIHBvc2l0aXZlLCBuZWdhdGl2ZSkge1xuICAgIHJldHVybiAocHJlZGljYXRlKSA/IHBvc2l0aXZlKCkgOiBuZWdhdGl2ZSgpO1xufTtcbi8qKlxuICogZm9yRSBwcm92aWRlcyBhIGZvciBleHByZXNzaW9uXG4gKi9cbmV4cG9ydHMuZm9yRSA9IGZ1bmN0aW9uIChjb2xsZWN0aW9uLCBjYiwgY2IyKSB7XG4gICAgdmFyIGZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgaWYgKGNvbGxlY3Rpb24gaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICBpZiAoY29sbGVjdGlvbi5sZW5ndGggPiAwKVxuICAgICAgICAgICAgY29sbGVjdGlvbi5mb3JFYWNoKGZ1bmN0aW9uICh2LCBrLCBhKSB7IHJldHVybiBmcmFnLmFwcGVuZENoaWxkKGNiKHYsIGssIGEpKTsgfSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGZyYWcuYXBwZW5kQ2hpbGQoY2IyKCkpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgY29sbGVjdGlvbiA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgdmFyIGwgPSBPYmplY3Qua2V5cyhjb2xsZWN0aW9uKTtcbiAgICAgICAgaWYgKGwubGVuZ3RoID4gMClcbiAgICAgICAgICAgIGwuZm9yRWFjaChmdW5jdGlvbiAoaykgeyByZXR1cm4gZnJhZy5hcHBlbmRDaGlsZChjYihjb2xsZWN0aW9uW2tdLCBrLCBjb2xsZWN0aW9uKSk7IH0pO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBmcmFnLmFwcGVuZENoaWxkKGNiMigpKTtcbiAgICB9XG4gICAgcmV0dXJuIGZyYWc7XG59O1xuLyoqXG4gKiBzd2l0Y2hFIHNpbXVsYXRlcyBhIHN3aXRjaCBzdGF0ZW1lbnRcbiAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcnxib29sZWFufSB2YWx1ZVxuICogQHBhcmFtIHtvYmplY3R9IGNhc2VzXG4gKi9cbmV4cG9ydHMuc3dpdGNoRSA9IGZ1bmN0aW9uICh2YWx1ZSwgY2FzZXMpIHtcbiAgICB2YXIgcmVzdWx0ID0gY2FzZXNbdmFsdWVdO1xuICAgIHZhciBkZWZhdWwgPSBjYXNlc1snZGVmYXVsdCddO1xuICAgIGlmIChyZXN1bHQpXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgaWYgKGRlZmF1bClcbiAgICAgICAgcmV0dXJuIGRlZmF1bDtcbn07XG52YXIgQXBwVmlldyA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQXBwVmlldyhjb250ZXh0KSB7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgICAgIHRoaXMuaWRzID0ge307XG4gICAgICAgIHRoaXMuZ3JvdXBzID0ge307XG4gICAgICAgIHRoaXMud2lkZ2V0cyA9IFtdO1xuICAgIH1cbiAgICBBcHBWaWV3LnByb3RvdHlwZS5yZWdpc3RlciA9IGZ1bmN0aW9uIChpZCwgdykge1xuICAgICAgICBpZiAodGhpcy5pZHMuaGFzT3duUHJvcGVydHkoaWQpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRHVwbGljYXRlIGlkICdcIiArIGlkICsgXCInIGRldGVjdGVkIVwiKTtcbiAgICAgICAgdGhpcy5pZHNbaWRdID0gdztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBBcHBWaWV3LnByb3RvdHlwZS5yZWdpc3Rlckdyb3VwID0gZnVuY3Rpb24gKGdyb3VwLCBlKSB7XG4gICAgICAgIHRoaXMuZ3JvdXBzW2dyb3VwXSA9IHRoaXMuZ3JvdXBzW2dyb3VwXSB8fCBbXTtcbiAgICAgICAgdGhpcy5ncm91cHNbZ3JvdXBdLnB1c2goZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgQXBwVmlldy5wcm90b3R5cGUuZmluZEJ5SWQgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmlkc1tpZF0pID8gdGhpcy5pZHNbaWRdIDogbnVsbDtcbiAgICB9O1xuICAgIEFwcFZpZXcucHJvdG90eXBlLmZpbmRHcm91cEJ5TmFtZSA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5ncm91cHMuaGFzT3duUHJvcGVydHkobmFtZSkpID8gdGhpcy5ncm91cHNbbmFtZV0gOiBbXTtcbiAgICB9O1xuICAgIEFwcFZpZXcucHJvdG90eXBlLmludmFsaWRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjaGlsZHM7XG4gICAgICAgIHZhciByZWFsRmlyc3RDaGlsZDtcbiAgICAgICAgdmFyIHJlYWxGaXJzdENoaWxkSW5kZXg7XG4gICAgICAgIHZhciB0cmVlID0gKHRoaXMuX2ZyYWdSb290KSA/IHRoaXMuX2ZyYWdSb290IDogdGhpcy50cmVlO1xuICAgICAgICB2YXIgcGFyZW50ID0gdHJlZS5wYXJlbnROb2RlO1xuICAgICAgICBpZiAodHJlZSA9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKCdDYW5ub3QgaW52YWxpZGF0ZSBhIHZpZXcgdGhhdCBoYXMgbm90IGJlZW4gcmVuZGVyZWQhJyk7XG4gICAgICAgIGlmICh0cmVlLnBhcmVudE5vZGUgPT0gbnVsbClcbiAgICAgICAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcignQXR0ZW1wdCB0byBpbnZhbGlkYXRlIGEgdmlldyB0aGF0IGhhcyBub3QgYmVlbiBpbnNlcnRlZCB0byBET00hJyk7XG4gICAgICAgIGNoaWxkcyA9IHRyZWUucGFyZW50Tm9kZS5jaGlsZHJlbjtcbiAgICAgICAgLy9mb3Igc29tZSByZWFzb24gdGhlIHJlZmVyZW5jZSBzdG9yZWQgZG9lcyBub3QgaGF2ZSB0aGUgY29ycmVjdCBwYXJlbnQgbm9kZS5cbiAgICAgICAgLy93ZSBkbyB0aGlzIHRvIGdldCBhICdsaXZlJyB2ZXJzaW9uIG9mIHRoZSBub2RlLlxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcy5sZW5ndGg7IGkrKylcbiAgICAgICAgICAgIGlmIChjaGlsZHNbaV0gPT09IHRyZWUpIHtcbiAgICAgICAgICAgICAgICByZWFsRmlyc3RDaGlsZCA9IGNoaWxkc1tpXTtcbiAgICAgICAgICAgICAgICByZWFsRmlyc3RDaGlsZEluZGV4ID0gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgcGFyZW50LnJlcGxhY2VDaGlsZCh0aGlzLnJlbmRlcigpLCByZWFsRmlyc3RDaGlsZCk7XG4gICAgfTtcbiAgICBBcHBWaWV3LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuaWRzID0ge307XG4gICAgICAgIHRoaXMud2lkZ2V0cy5mb3JFYWNoKGZ1bmN0aW9uICh3KSB7IHJldHVybiB3LnJlbW92ZWQoKTsgfSk7XG4gICAgICAgIHRoaXMud2lkZ2V0cyA9IFtdO1xuICAgICAgICB0aGlzLl9mcmFnUm9vdCA9IG51bGw7XG4gICAgICAgIHRoaXMudHJlZSA9IHRoaXMudGVtcGxhdGUuY2FsbCh0aGlzLmNvbnRleHQpO1xuICAgICAgICB0aGlzLmlkc1sncm9vdCddID0gKHRoaXMuaWRzWydyb290J10pID8gdGhpcy5pZHNbJ3Jvb3QnXSA6IHRoaXMudHJlZTtcbiAgICAgICAgaWYgKHRoaXMudHJlZS5ub2RlTmFtZSA9PT0gKGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSkubm9kZU5hbWUpXG4gICAgICAgICAgICB0aGlzLl9mcmFnUm9vdCA9IHRoaXMudHJlZS5maXJzdENoaWxkO1xuICAgICAgICB0aGlzLndpZGdldHMuZm9yRWFjaChmdW5jdGlvbiAodykgeyByZXR1cm4gdy5yZW5kZXJlZCgpOyB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJlZTtcbiAgICB9O1xuICAgIHJldHVybiBBcHBWaWV3O1xufSgpKTtcbmV4cG9ydHMuQXBwVmlldyA9IEFwcFZpZXc7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHdtbF9ydW50aW1lXzEgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC1ydW50aW1lXCIpO1xuLyoqXG4gKiBDb250YWluZXIgaXMgYW4gYWJzdHJhY3QgY2xhc3MgaW1wbGVtZW50aW5nIHdpZGdldHNcbiAqIHRoYXQgaG9sZCBjb250ZW50IGFzIHRoZWlyIHByaW1hcnkgcHVycG9zZSBzdWNoXG4gKiBhcyBhIERyYXdlckxheW91dCBvciBhbiBvYmplY3QgZm9ybSAnZ3JpZCcuXG4gKi9cbnZhciBDb250YWluZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhDb250YWluZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQ29udGFpbmVyKCkge1xuICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIHNldENvbnRlbnQgY2hhbmdlcyB0aGUgY29udGVudCB2YWx1ZS5cbiAgICAgKi9cbiAgICBDb250YWluZXIucHJvdG90eXBlLnNldENvbnRlbnQgPSBmdW5jdGlvbiAoY29udGVudCkge1xuICAgICAgICB2YXIgcm9vdCA9IHRoaXMudmlldy5maW5kQnlJZCgncm9vdCcpO1xuICAgICAgICB2YXIgcGFyZW50ID0gcm9vdC5wYXJlbnROb2RlO1xuICAgICAgICBpZiAoIXJvb3QpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5jb25zdHJ1Y3Rvci5uYW1lICsgXCIjc2V0Q29udGVudDpcIiArXG4gICAgICAgICAgICAgICAgXCJDYW5ub3Qgc2V0IGNvbnRlbnQgb2YgYSB3aWRnZXQgXCIgK1xuICAgICAgICAgICAgICAgIFwidGhhdCBoYXMgbm8gcm9vdCBpbiBpdCdzIHRlbXBsYXRlIVwiKTtcbiAgICAgICAgaWYgKCFwYXJlbnQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5jb25zdHJ1Y3Rvci5uYW1lICsgXCIjc2V0Q29udGVudDpcIiArXG4gICAgICAgICAgICAgICAgXCJDYW5ub3Qgc2V0IGNvbnRlbnQgb2YgYSB3aWRnZXQgd2l0aCBubyBwYXJlbnQhXCIpO1xuICAgICAgICB0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xuICAgICAgICBwYXJlbnQucmVwbGFjZUNoaWxkKHRoaXMucmVuZGVyKCksIHJvb3QpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIHJlbW92ZUNvbnRlbnQgcmVtb3ZlcyBleGlzdGluZyBjb250ZW50LlxuICAgICAqL1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUucmVtb3ZlQ29udGVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5jb250ZW50ID0gbnVsbDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICByZXR1cm4gQ29udGFpbmVyO1xufSh3bWxfcnVudGltZV8xLkNvbXBvbmVudCkpO1xuZXhwb3J0cy5Db250YWluZXIgPSBDb250YWluZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Db250YWluZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkhJRERFTiA9ICctaGlkZGVuJztcbmV4cG9ydHMuRElTQUJMRUQgPSAnLWRpc2FibGVkJztcbmV4cG9ydHMuT04gPSAnLW9uJztcbmV4cG9ydHMuT0ZGID0gJy1vZmYnO1xuZXhwb3J0cy5ERUZBVUxUID0gJy1kZWZhdWx0JztcbmV4cG9ydHMuUFJJTUFSWSA9ICctcHJpbWFyeSc7XG5leHBvcnRzLlNVQ0NFU1MgPSAnLXN1Y2Nlc3MnO1xuZXhwb3J0cy5JTkZPID0gJy1pbmZvJztcbmV4cG9ydHMuV0FSTklORyA9ICctd2FybmluZyc7XG5leHBvcnRzLkRBTkdFUiA9ICctZGFuZ2VyJztcbmV4cG9ydHMuTEFSR0UgPSAnLWxhcmdlJztcbmV4cG9ydHMuU01BTEwgPSAnLXNtYWxsJztcbmV4cG9ydHMuRVhUUkFfU01BTEwgPSAnLWV4dHJhLXNtYWxsJztcbmV4cG9ydHMuQUNUSVZFID0gJ2FjdGl2ZSc7IC8vQHRvZG86IHJlZmFjdG9yIHRvIGZsYWcgc3ludGF4XG5leHBvcnRzLkRSQVdFUl9MQVlPVVQgPSAnd3ctZHJhd2VyLWxheW91dCc7XG5leHBvcnRzLkRSQVdFUiA9ICd3dy1kcmF3ZXInO1xuZXhwb3J0cy5EUkFXRVJfQ09OVEVOVCA9ICd3dy1kcmF3ZXJfX2NvbnRlbnQnO1xuZXhwb3J0cy5EUkFXRVJfUFVTSEFCTEUgPSAnLWRyYXdlci1wdXNoYWJsZSc7XG5leHBvcnRzLkRSQVdFUl9QVVNIQUJMRV9GSVhFRCA9ICctZHJhd2VyLXB1c2hhYmxlLWZpeGVkJztcbmV4cG9ydHMuQUNUSU9OX0FSRUEgPSAnd3ctYWN0aW9uLWFyZWEnO1xuZXhwb3J0cy5BQ1RJT05fQVJFQV9DT05URU5UID0gJ3d3LWFjdGlvbi1hcmVhX19jb250ZW50JztcbmV4cG9ydHMuTUFJTl9WSUVXID0gJ3d3LW1haW4tdmlldyc7XG5leHBvcnRzLk1FTlVfQlVUVE9OID0gJ3d3LW1lbnUtYnV0dG9uJztcbmV4cG9ydHMuQlVUVE9OID0gJ3d3LWJ1dHRvbic7XG5leHBvcnRzLkJVVFRPTl9HUk9VUCA9ICd3dy1idXR0b24tZ3JvdXAnO1xuLy9AdG9kbzogcmVmYWN0b3IgdGhpcyB0byBiZSBpbmxpbmUgd2l0aCBvdGhlciBjbGFzcyBuYW1lc1xuZXhwb3J0cy5HUklEX0NPTlRBSU5FUiA9ICdjb250YWluZXItZmx1aWQnO1xuZXhwb3J0cy5HUklEX0NPTFVNTiA9ICcnO1xuZXhwb3J0cy5HUklEX1JPVyA9ICdyb3cnO1xuZXhwb3J0cy5QQU5FTCA9ICd3dy1wYW5lbCc7XG5leHBvcnRzLlBBTkVMX0hFQURFUiA9ICd3dy1wYW5lbF9faGVhZGVyJztcbmV4cG9ydHMuUEFORUxfQk9EWSA9ICd3dy1wYW5lbF9fYm9keSc7XG5leHBvcnRzLlBBTkVMX0ZPT1RFUiA9ICd3dy1wYW5lbF9fZm9vdGVyJztcbmV4cG9ydHMuTU9EQUwgPSAnd3ctbW9kYWwnO1xuZXhwb3J0cy5NT0RBTF9ESUFMT0cgPSAnd3ctbW9kYWxfX2RpYWxvZyc7XG5leHBvcnRzLk1PREFMX0NPTlRFTlQgPSAnd3ctbW9kYWxfX2NvbnRlbnQnO1xuZXhwb3J0cy5NT0RBTF9IRUFERVIgPSAnd3ctbW9kYWxfX2hlYWRlcic7XG5leHBvcnRzLk1PREFMX0JPRFkgPSAnd3ctbW9kYWxfX2JvZHknO1xuZXhwb3J0cy5NT0RBTF9GT09URVIgPSAnd3ctbW9hZGxfX2Zvb3Rlcic7XG5leHBvcnRzLkZPUk1fR1JPVVAgPSAnZm9ybS1ncm91cCc7XG5leHBvcnRzLkNPTlRST0xfTEFCRUwgPSAnY29udHJvbC1sYWJlbCc7XG5leHBvcnRzLklOUFVUID0gJ2Zvcm0tY29udHJvbCc7XG5leHBvcnRzLlRFWFRBUkVBID0gJ2Zvcm0tY29udHJvbCc7XG5leHBvcnRzLlNFTEVDVCA9ICdmb3JtLWNvbnRyb2wnO1xuZXhwb3J0cy5UQUJTID0gJ25hdiBuYXYtdGFicyc7IC8vQHRvZG8gdW4tYm9vdHN0cmFwXG5leHBvcnRzLlNXSVRDSCA9ICd3dy1zd2l0Y2gnO1xuZXhwb3J0cy5TV0lUQ0hfU0xJREVSID0gJ3d3LXN3aXRjaF9fc2xpZGVyJztcbmV4cG9ydHMuVEFCTEUgPSAndGFibGUnOyAvL0B0b2RvIHVuLWJvb3RzdHJhcFxuZXhwb3J0cy5UUkVFX05BViA9ICd0cmVlLW5hdic7XG5leHBvcnRzLlRSRUVfTkFWX0xJU1QgPSAndHJlZS1uYXZfX2xpc3QnO1xuZXhwb3J0cy5UUkVFX05BVl9MSVNUX0lURU0gPSAndHJlZS1uYXZfX2l0ZW0nO1xuZXhwb3J0cy5CUkVBRF9DUlVNQlMgPSAnYnJlYWRjcnVtYic7IC8vQHRvZG8gdW4tYm9vdHN0cmFwXG5leHBvcnRzLkJSRUFEX0NSVU1CU19DUlVNQiA9IGV4cG9ydHMuQlJFQURfQ1JVTUJTICsgXCJfX2NydW1iXCI7XG5leHBvcnRzLkFVVE9DT01QTEVURSA9ICd3YXQta2l0LWF1dG9jb21wbGV0ZSc7XG5leHBvcnRzLkFVVE9DT01QTEVURV9DT05UQUlORVIgPSAnd2F0LWtpdC1hdXRvY29tcGxldGUtY29udGFpbmVyJztcbmV4cG9ydHMuQVVUT0NPTVBMRVRFX0lOUFVUX0FSRUEgPSAnd2F0LWtpdC1hdXRvY29tcGxldGUtaW5wdXQtYXJlYSc7XG5leHBvcnRzLkFVVE9DT01QTEVURV9JTlBVVCA9ICd3YXQta2l0LWF1dG9jb21wbGV0ZS1pbnB1dCc7XG5leHBvcnRzLkFVVE9DT01QTEVURV9PUFRJT05TID0gJ3dhdC1raXQtYXV0b2NvbXBsZXRlLW9wdGlvbnMnO1xuZXhwb3J0cy5BVVRPQ09NUExFVEVfSVRFTV9XUkFQUEVSID0gJ3dhdC1raXQtYXV0by1jb21wbGV0ZS1pdGVtLXdyYXBwZXInO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9U3R5bGVzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHV0aWwgPSByZXF1aXJlKFwiLi91dGlsXCIpO1xuZXhwb3J0cy51dGlsID0gdXRpbDtcbnZhciBTdHlsZXMgPSByZXF1aXJlKFwiLi9TdHlsZXNcIik7XG5leHBvcnRzLlN0eWxlcyA9IFN0eWxlcztcbnZhciBDb250YWluZXJfMSA9IHJlcXVpcmUoXCIuL0NvbnRhaW5lclwiKTtcbmV4cG9ydHMuQ29udGFpbmVyID0gQ29udGFpbmVyXzEuQ29udGFpbmVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIGNvbWJpbmUgdGhlIG1lbWJlcnMgb2YgYW4gYXJyYXkgaW50byBvbmUgc3RyaW5nLlxuICovXG5leHBvcnRzLmNvbWJpbmUgPSBmdW5jdGlvbiAoc3RyLCBqb2luZXIpIHtcbiAgICBpZiAoam9pbmVyID09PSB2b2lkIDApIHsgam9pbmVyID0gJyAnOyB9XG4gICAgcmV0dXJuIHN0ci5maWx0ZXIoZnVuY3Rpb24gKHMpIHsgcmV0dXJuICgocyAhPSBudWxsKSB8fCBzICE9ICcnKTsgfSkuam9pbihqb2luZXIpO1xufTtcbi8qKlxuICogbm9vcFxuICovXG5leHBvcnRzLm5vb3AgPSBmdW5jdGlvbiAoKSB7IH07XG4vKipcbiAqIHJlYWQgYSB2YWx1ZSBmcm9tIHRoZSBjb250ZXh0IGF0dHJpYnV0ZXNcbiAqL1xuZXhwb3J0cy5yZWFkID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBfID0gW107XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgX1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5hdHRyaWJ1dGVzLnJlYWQuYXBwbHkodGhpcy5hdHRyaWJ1dGVzLCBhcmd1bWVudHMpO1xufTtcbi8qKlxuICogcmVwbGFjZUNvbnRlbnRcbiAqL1xuZXhwb3J0cy5yZXBsYWNlQ29udGVudCA9IGZ1bmN0aW9uIChyLCBub2RlKSB7XG4gICAgd2hpbGUgKG5vZGUubGFzdENoaWxkKVxuICAgICAgICBub2RlLnJlbW92ZUNoaWxkKG5vZGUubGFzdENoaWxkKTtcbiAgICBub2RlLmFwcGVuZENoaWxkKHIucmVuZGVyKCkpO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXV0aWwuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBjb21tb24gPSByZXF1aXJlKFwid21sLXdpZGdldHMtY29tbW9uXCIpO1xudmFyIGFjdGlvbl9hcmVhXzEgPSByZXF1aXJlKFwiLi93bWwvYWN0aW9uX2FyZWFcIik7XG4vKipcbiAqIEFjdGlvbkFyZWFcbiAqL1xudmFyIEFjdGlvbkFyZWEgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhBY3Rpb25BcmVhLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEFjdGlvbkFyZWEoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IGFjdGlvbl9hcmVhXzEuTWFpbihfdGhpcyk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIEFjdGlvbkFyZWE7XG59KGNvbW1vbi5Db250YWluZXIpKTtcbmV4cG9ydHMuQWN0aW9uQXJlYSA9IEFjdGlvbkFyZWE7XG5leHBvcnRzLmRlZmF1bHQgPSBBY3Rpb25BcmVhO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QWN0aW9uQXJlYS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHdtbF9ydW50aW1lXzEgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC1ydW50aW1lXCIpO1xudmFyIFN0eWxlcyA9IHJlcXVpcmUoXCJ3bWwtd2lkZ2V0cy1jb21tb24vU3R5bGVzXCIpO1xudmFyIHV0aWxfMSA9IHJlcXVpcmUoXCJ3bWwtd2lkZ2V0cy1jb21tb24vdXRpbFwiKTtcbnZhciBNYWluID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoTWFpbiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBNYWluKGNvbnRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29udGV4dCkgfHwgdGhpcztcbiAgICAgICAgdmFyIHZpZXcgPSBfdGhpcztcbiAgICAgICAgX3RoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogdXRpbF8xLmNvbWJpbmUoW1N0eWxlcy5BQ1RJT05fQVJFQSwgU3R5bGVzLkRSQVdFUl9QVVNIQUJMRV9GSVhFRF0pIH0sIHdtbDoge30gfSwgW3dtbF9ydW50aW1lXzEubm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6IFN0eWxlcy5BQ1RJT05fQVJFQV9DT05URU5UIH0sIHdtbDogeyAnaWQnOiBcImNvbnRlbnRcIiB9IH0sIFt3bWxfcnVudGltZV8xLmRvbWlmeSh0aGlzLmNoaWxkcmVuKV0sIHZpZXcpXSwgdmlldyk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIE1haW47XG59KHdtbF9ydW50aW1lXzEuQXBwVmlldykpO1xuZXhwb3J0cy5NYWluID0gTWFpbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFjdGlvbl9hcmVhLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgd21sX3J1bnRpbWVfMSA9IHJlcXVpcmUoXCJAcXVlbmsvd21sLXJ1bnRpbWVcIik7XG52YXIgbGF5b3V0ID0gcmVxdWlyZShcIi4vd21sL2JyZWFkY3J1bWJzXCIpO1xuO1xuLyoqXG4gKiBCcmVhZENydW1iXG4gKi9cbnZhciBCcmVhZENydW1icyA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEJyZWFkQ3J1bWJzLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEJyZWFkQ3J1bWJzKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMudmlldyA9IG5ldyBsYXlvdXQuQnJlYWRDcnVtYnMoX3RoaXMpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBCcmVhZENydW1icztcbn0od21sX3J1bnRpbWVfMS5Db21wb25lbnQpKTtcbmV4cG9ydHMuQnJlYWRDcnVtYnMgPSBCcmVhZENydW1icztcbi8qKlxuICogQ3J1bWJcbiAqL1xudmFyIENydW1iID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQ3J1bWIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQ3J1bWIoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IGxheW91dC5DcnVtYihfdGhpcyk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIENydW1iO1xufSh3bWxfcnVudGltZV8xLkNvbXBvbmVudCkpO1xuZXhwb3J0cy5DcnVtYiA9IENydW1iO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB3bWxfcnVudGltZV8xID0gcmVxdWlyZShcIkBxdWVuay93bWwtcnVudGltZVwiKTtcbnZhciB1dGlsXzEgPSByZXF1aXJlKFwid21sLXdpZGdldHMtY29tbW9uL3V0aWxcIik7XG52YXIgU3R5bGVzID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi9TdHlsZXNcIik7XG52YXIgQnJlYWRDcnVtYnMgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhCcmVhZENydW1icywgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBCcmVhZENydW1icyhjb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbnRleHQpIHx8IHRoaXM7XG4gICAgICAgIHZhciB2aWV3ID0gX3RoaXM7XG4gICAgICAgIF90aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgnb2wnLCB7IGh0bWw6IHsgJ2NsYXNzJzogdXRpbF8xLmNvbWJpbmUoW1N0eWxlcy5CUkVBRF9DUlVNQlMsIHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpjbGFzcycpXSkgfSwgd21sOiB7fSB9LCBbd21sX3J1bnRpbWVfMS5kb21pZnkodGhpcy5jaGlsZHJlbildLCB2aWV3KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gQnJlYWRDcnVtYnM7XG59KHdtbF9ydW50aW1lXzEuQXBwVmlldykpO1xuZXhwb3J0cy5CcmVhZENydW1icyA9IEJyZWFkQ3J1bWJzO1xudmFyIENydW1iID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQ3J1bWIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQ3J1bWIoY29udGV4dCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBjb250ZXh0KSB8fCB0aGlzO1xuICAgICAgICB2YXIgdmlldyA9IF90aGlzO1xuICAgICAgICBfdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB3bWxfcnVudGltZV8xLm5vZGUoJ2xpJywgeyBodG1sOiB7ICdjbGFzcyc6IHV0aWxfMS5jb21iaW5lKFtTdHlsZXMuQlJFQURfQ1JVTUJTX0NSVU1CLCB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6Y2xhc3MnKV0pIH0sIHdtbDoge30gfSwgW3dtbF9ydW50aW1lXzEubm9kZSgnYScsIHsgaHRtbDogeyAnY2xhc3MnOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6YW5jaG9yQ2xhc3MnLCBudWxsKSwgJ29uQ2xpY2snOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6b25DbGljaycsIG51bGwpLCAnaHJlZic6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpocmVmJykgfSwgd21sOiB7fSB9LCBbd21sX3J1bnRpbWVfMS5kb21pZnkodGhpcy5jaGlsZHJlbildLCB2aWV3KV0sIHZpZXcpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBDcnVtYjtcbn0od21sX3J1bnRpbWVfMS5BcHBWaWV3KSk7XG5leHBvcnRzLkNydW1iID0gQ3J1bWI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1icmVhZGNydW1icy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHdtbF9ydW50aW1lXzEgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC1ydW50aW1lXCIpO1xudmFyIGJ1c3lfaW5kaWNhdG9yXzEgPSByZXF1aXJlKFwiLi93bWwvYnVzeV9pbmRpY2F0b3JcIik7XG4vKipcbiAqIEJ1c3lJbmRpY2F0b3IgcHJvdmlkZXMgYSAnaGFtYnVyZ2VyJyBtZW51IGJ1dHRvbi5cbiAqL1xudmFyIEJ1c3lJbmRpY2F0b3IgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhCdXN5SW5kaWNhdG9yLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEJ1c3lJbmRpY2F0b3IoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IGJ1c3lfaW5kaWNhdG9yXzEuTWFpbihfdGhpcyk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIEJ1c3lJbmRpY2F0b3I7XG59KHdtbF9ydW50aW1lXzEuQ29tcG9uZW50KSk7XG5leHBvcnRzLkJ1c3lJbmRpY2F0b3IgPSBCdXN5SW5kaWNhdG9yO1xuZXhwb3J0cy5kZWZhdWx0ID0gQnVzeUluZGljYXRvcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUJ1c3lJbmRpY2F0b3IuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB3bWxfcnVudGltZV8xID0gcmVxdWlyZShcIkBxdWVuay93bWwtcnVudGltZVwiKTtcbnZhciBNYWluID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoTWFpbiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBNYWluKGNvbnRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29udGV4dCkgfHwgdGhpcztcbiAgICAgICAgdmFyIHZpZXcgPSBfdGhpcztcbiAgICAgICAgX3RoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogXCJsb2FkaW5nXCIgfSwgd21sOiB7fSB9LCBbXSwgdmlldyk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIE1haW47XG59KHdtbF9ydW50aW1lXzEuQXBwVmlldykpO1xuZXhwb3J0cy5NYWluID0gTWFpbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJ1c3lfaW5kaWNhdG9yLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgY29tbW9uID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vblwiKTtcbnZhciB2aWV3cyA9IHJlcXVpcmUoXCIuL3dtbC9idXR0b25cIik7XG4vKipcbiAqIEdyb3VwIG11bHRpcGxlIGJ1dHRvbnMgaW50byBvbmUgZWxlbWVudC5cbiAqL1xudmFyIEdyb3VwID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoR3JvdXAsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gR3JvdXAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IHZpZXdzLkdyb3VwKF90aGlzKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gR3JvdXA7XG59KGNvbW1vbi5Db250YWluZXIpKTtcbmV4cG9ydHMuR3JvdXAgPSBHcm91cDtcbjtcbi8qKlxuICogQnV0dG9uIGlzIGFuIGltcHJvdmVtZW50IG92ZXIgSFRNTEJ1dHRpb25FbGVtZW50XG4gKi9cbnZhciBCdXR0b24gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhCdXR0b24sIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQnV0dG9uKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMudmlldyA9IG5ldyB2aWV3cy5CdXR0b24oX3RoaXMpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIGRpc2FibGUgdGhpcyBidXR0b24uXG4gICAgICovXG4gICAgQnV0dG9uLnByb3RvdHlwZS5kaXNhYmxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnZpZXcuZmluZEJ5SWQoJ2J1dHRvbicpLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIGVuYWJsZSB0aGlzIGJ1dHRvbi5cbiAgICAgKi9cbiAgICBCdXR0b24ucHJvdG90eXBlLmVuYWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy52aWV3LmZpbmRCeUlkKCdidXR0b24nKS5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG4gICAgfTtcbiAgICBCdXR0b24ucHJvdG90eXBlLnJlbmRlcmVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDpkaXNhYmxlZCcpKVxuICAgICAgICAgICAgdGhpcy52aWV3LmZpbmRCeUlkKCdidXR0b24nKS5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG4gICAgfTtcbiAgICByZXR1cm4gQnV0dG9uO1xufShjb21tb24uQ29udGFpbmVyKSk7XG5leHBvcnRzLkJ1dHRvbiA9IEJ1dHRvbjtcbmV4cG9ydHMuZGVmYXVsdCA9IEJ1dHRvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUJ1dHRvbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHdtbF9ydW50aW1lXzEgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC1ydW50aW1lXCIpO1xudmFyIFN0eWxlcyA9IHJlcXVpcmUoXCJ3bWwtd2lkZ2V0cy1jb21tb24vU3R5bGVzXCIpO1xudmFyIHV0aWxfMSA9IHJlcXVpcmUoXCJ3bWwtd2lkZ2V0cy1jb21tb24vdXRpbFwiKTtcbnZhciBfMSA9IHJlcXVpcmUoXCIuLi8uLi9cIik7XG52YXIgR3JvdXAgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhHcm91cCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBHcm91cChjb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbnRleHQpIHx8IHRoaXM7XG4gICAgICAgIHZhciB2aWV3ID0gX3RoaXM7XG4gICAgICAgIF90aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6IHV0aWxfMS5jb21iaW5lKFtTdHlsZXMuQlVUVE9OX0dST1VQLCB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6Y2xhc3MnKV0pLCAncm9sZSc6IFwiZ3JvdXBcIiB9LCB3bWw6IHt9IH0sIFt3bWxfcnVudGltZV8xLmRvbWlmeSh0aGlzLmNoaWxkcmVuKV0sIHZpZXcpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBHcm91cDtcbn0od21sX3J1bnRpbWVfMS5BcHBWaWV3KSk7XG5leHBvcnRzLkdyb3VwID0gR3JvdXA7XG52YXIgQnV0dG9uID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQnV0dG9uLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEJ1dHRvbihjb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbnRleHQpIHx8IHRoaXM7XG4gICAgICAgIHZhciB2aWV3ID0gX3RoaXM7XG4gICAgICAgIF90aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHdtbF9ydW50aW1lXzEud2lkZ2V0KF8xLkZyYWdtZW50LCB7IGh0bWw6IHt9LCB3bWw6IHt9IH0sIFt3bWxfcnVudGltZV8xLmlmRSh0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6aHJlZicpLCBmdW5jdGlvbiBpZjEoKSB7IHJldHVybiB3bWxfcnVudGltZV8xLm5vZGUoJ2EnLCB7IGh0bWw6IHsgJ2hyZWYnOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6aHJlZicpLCAnY2xhc3MnOiB1dGlsXzEuY29tYmluZShbU3R5bGVzLkJVVFRPTiwgdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OnZhcmlhbnQnLCAnJyksIHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpzaXplJywgJycpLCB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6c3R5bGUnLCBTdHlsZXMuREVGQVVMVCksIHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpjbGFzcycpXSksICdvbmNsaWNrJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3Om9uQ2xpY2snLCB1dGlsXzEubm9vcCkgfSwgd21sOiB7ICdpZCc6IFwiYnV0dG9uXCIgfSB9LCBbd21sX3J1bnRpbWVfMS5kb21pZnkodGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OnRleHQnKSksIHdtbF9ydW50aW1lXzEuZG9taWZ5KHRoaXMuY2hpbGRyZW4pXSwgdmlldyk7IH0uYmluZCh0aGlzKSwgZnVuY3Rpb24gZWxzZV9jbGF1c2UxKCkgeyByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCdidXR0b24nLCB7IGh0bWw6IHsgJ3R5cGUnOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6dHlwZScsICdidXR0b24nKSwgJ25hbWUnOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6bmFtZScsICcnKSwgJ2Rpc2FibGVkJzogKHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpkaXNhYmxlZCcpKSA/IFwidHJ1ZVwiIDogbnVsbCwgJ2NsYXNzJzogdXRpbF8xLmNvbWJpbmUoW1N0eWxlcy5CVVRUT04sIHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzp2YXJpYW50JywgJycpLCB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6c2l6ZScsICcnKSwgdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OnN0eWxlJywgU3R5bGVzLkRFRkFVTFQpLCB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6Y2xhc3MnKV0pLCAnb25jbGljayc6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpvbkNsaWNrJywgdXRpbF8xLm5vb3ApIH0sIHdtbDogeyAnaWQnOiBcImJ1dHRvblwiIH0gfSwgW3dtbF9ydW50aW1lXzEuZG9taWZ5KHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzp0ZXh0JykpLCB3bWxfcnVudGltZV8xLmRvbWlmeSh0aGlzLmNoaWxkcmVuKV0sIHZpZXcpOyB9LmJpbmQodGhpcykpXSwgdmlldyk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIEJ1dHRvbjtcbn0od21sX3J1bnRpbWVfMS5BcHBWaWV3KSk7XG5leHBvcnRzLkJ1dHRvbiA9IEJ1dHRvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJ1dHRvbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHdtbF9ydW50aW1lXzEgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC1ydW50aW1lXCIpO1xudmFyIGxheW91dCA9IHJlcXVpcmUoXCIuL3dtbC9jYXJkXCIpO1xuO1xuLyoqXG4gKiBDYXJkXG4gKi9cbnZhciBDYXJkID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQ2FyZCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBDYXJkKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMudmlldyA9IG5ldyBsYXlvdXQuQ2FyZChfdGhpcyk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIENhcmQ7XG59KHdtbF9ydW50aW1lXzEuQ29tcG9uZW50KSk7XG5leHBvcnRzLkNhcmQgPSBDYXJkO1xuLyoqXG4gKiBDYXJkQm9keVxuICovXG52YXIgQ2FyZEJvZHkgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhDYXJkQm9keSwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBDYXJkQm9keSgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnZpZXcgPSBuZXcgbGF5b3V0LkNhcmRCb2R5KF90aGlzKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gQ2FyZEJvZHk7XG59KHdtbF9ydW50aW1lXzEuQ29tcG9uZW50KSk7XG5leHBvcnRzLkNhcmRCb2R5ID0gQ2FyZEJvZHk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1DYXJkLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgd21sX3J1bnRpbWVfMSA9IHJlcXVpcmUoXCJAcXVlbmsvd21sLXJ1bnRpbWVcIik7XG52YXIgdXRpbF8xID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi91dGlsXCIpO1xudmFyIENhcmQgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhDYXJkLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIENhcmQoY29udGV4dCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBjb250ZXh0KSB8fCB0aGlzO1xuICAgICAgICB2YXIgdmlldyA9IF90aGlzO1xuICAgICAgICBfdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB3bWxfcnVudGltZV8xLm5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiB1dGlsXzEuY29tYmluZShbXCJjYXJkXCIsIHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpjbGFzcycpXSkgfSwgd21sOiB7fSB9LCBbd21sX3J1bnRpbWVfMS5kb21pZnkodGhpcy5jaGlsZHJlbildLCB2aWV3KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gQ2FyZDtcbn0od21sX3J1bnRpbWVfMS5BcHBWaWV3KSk7XG5leHBvcnRzLkNhcmQgPSBDYXJkO1xudmFyIENhcmRCb2R5ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQ2FyZEJvZHksIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQ2FyZEJvZHkoY29udGV4dCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBjb250ZXh0KSB8fCB0aGlzO1xuICAgICAgICB2YXIgdmlldyA9IF90aGlzO1xuICAgICAgICBfdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB3bWxfcnVudGltZV8xLm5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiB1dGlsXzEuY29tYmluZShbXCJjYXJkLWJvZHlcIiwgdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmNsYXNzJyldKSB9LCB3bWw6IHt9IH0sIFt3bWxfcnVudGltZV8xLmRvbWlmeSh0aGlzLmNoaWxkcmVuKV0sIHZpZXcpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBDYXJkQm9keTtcbn0od21sX3J1bnRpbWVfMS5BcHBWaWV3KSk7XG5leHBvcnRzLkNhcmRCb2R5ID0gQ2FyZEJvZHk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jYXJkLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgY29tbW9uID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vblwiKTtcbnZhciBkcmF3ZXJfbGF5b3V0XzEgPSByZXF1aXJlKFwiLi93bWwvZHJhd2VyLWxheW91dFwiKTtcbjtcbi8qKlxuICogRHJhd2VyTGF5b3V0IHByb3ZpZGVzIGEgdG9wIGxldmVsIGxheW91dCBjb25zaXN0aW5nIG9mIGEgZHJhd2VyIGFuZFxuICogYSBtYWluIGNvbnRlbnQgdmlldy5cbiAqL1xudmFyIERyYXdlckxheW91dCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKERyYXdlckxheW91dCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBEcmF3ZXJMYXlvdXQoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IGRyYXdlcl9sYXlvdXRfMS5NYWluKF90aGlzKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBEcmF3ZXJMYXlvdXQucHJvdG90eXBlLl9nZXREcmF3ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZpZXcuZmluZEJ5SWQoJ2RyYXdlcicpO1xuICAgIH07XG4gICAgRHJhd2VyTGF5b3V0LnByb3RvdHlwZS5fY29tYmluZSA9IGZ1bmN0aW9uIChjbGFzc2VzKSB7XG4gICAgICAgIHJldHVybiBjbGFzc2VzLmpvaW4oJyAnKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIGRyYXdlclZpc2libGUgcXVlcmllcyB3aGV0aGVyIHRoZSBEcmF3ZXIgaXMgdmlzaWJsZSBvciBub3QuXG4gICAgICovXG4gICAgRHJhd2VyTGF5b3V0LnByb3RvdHlwZS5kcmF3ZXJWaXNpYmxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0RHJhd2VyKCkudmlzaWJsZSgpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogaGlkZURyYXdlciBoaWRlcyB0aGUgZHJhd2VyLlxuICAgICAqL1xuICAgIERyYXdlckxheW91dC5wcm90b3R5cGUuaGlkZURyYXdlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldERyYXdlcigpLmhpZGUoKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIHNob3dEcmF3ZXIgc2hvd3MgdGhlIGRyYXdlclxuICAgICAqL1xuICAgIERyYXdlckxheW91dC5wcm90b3R5cGUuc2hvd0RyYXdlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldERyYXdlcigpLnNob3coKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIHRvZ2dsZSB0aGUgdmlzaWJpbGl0eSBvZiB0aGlzIERyYXdlclxuICAgICAqL1xuICAgIERyYXdlckxheW91dC5wcm90b3R5cGUudG9nZ2xlRHJhd2VyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0RHJhd2VyKCkudG9nZ2xlKCk7XG4gICAgfTtcbiAgICByZXR1cm4gRHJhd2VyTGF5b3V0O1xufShjb21tb24uQ29udGFpbmVyKSk7XG5leHBvcnRzLkRyYXdlckxheW91dCA9IERyYXdlckxheW91dDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPURyYXdlckxheW91dC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHdtbF9ydW50aW1lXzEgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC1ydW50aW1lXCIpO1xudmFyIFN0eWxlcyA9IHJlcXVpcmUoXCJ3bWwtd2lkZ2V0cy1jb21tb24vU3R5bGVzXCIpO1xudmFyIERyYXdlcl8xID0gcmVxdWlyZShcIi4uLy4uL2RyYXdlci9EcmF3ZXJcIik7XG52YXIgTWFpbiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKE1haW4sIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gTWFpbihjb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbnRleHQpIHx8IHRoaXM7XG4gICAgICAgIHZhciB2aWV3ID0gX3RoaXM7XG4gICAgICAgIF90aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6IFN0eWxlcy5EUkFXRVJfTEFZT1VUIH0sIHdtbDogeyAnaWQnOiBcImNvbnRlbnRcIiB9IH0sIFt3bWxfcnVudGltZV8xLndpZGdldChEcmF3ZXJfMS5EcmF3ZXIsIHsgaHRtbDoge30sIHdtbDogeyAnaWQnOiBcImRyYXdlclwiIH0sIHd3OiB7ICdjb250ZW50JzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoXCJ3dzpkcmF3ZXJcIikgfSB9LCBbXSwgdmlldyksIHdtbF9ydW50aW1lXzEuaWZFKHRoaXMuY29udGVudCwgZnVuY3Rpb24gaWYyKCkgeyByZXR1cm4gd21sX3J1bnRpbWVfMS5kb21pZnkodGhpcy5jb250ZW50KTsgfS5iaW5kKHRoaXMpLCBmdW5jdGlvbiBlbHNlaWYwKCkgeyByZXR1cm4gd21sX3J1bnRpbWVfMS5pZkUodGhpcy5hdHRyaWJ1dGVzLnJlYWQoXCJ3dzpjb250ZW50XCIpLCBmdW5jdGlvbiBpZjAoKSB7IHJldHVybiB0aGlzLmF0dHJpYnV0ZXMucmVhZChcInd3LmNvbnRlbnRcIikuY2FsbCh0aGlzLCB2aWV3KTsgfS5iaW5kKHRoaXMpLCBmdW5jdGlvbiBlbHNlX2NsYXVzZTIoKSB7IHJldHVybiB3bWxfcnVudGltZV8xLmRvbWlmeSh0aGlzLmNoaWxkcmVuKTsgfS5iaW5kKHRoaXMpKTsgfS5iaW5kKHRoaXMpKV0sIHZpZXcpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBNYWluO1xufSh3bWxfcnVudGltZV8xLkFwcFZpZXcpKTtcbmV4cG9ydHMuTWFpbiA9IE1haW47XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kcmF3ZXItbGF5b3V0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgd21sX3J1bnRpbWVfMSA9IHJlcXVpcmUoXCJAcXVlbmsvd21sLXJ1bnRpbWVcIik7XG52YXIgU3R5bGVzID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi9TdHlsZXNcIik7XG52YXIgZHJhd2VyXzEgPSByZXF1aXJlKFwiLi93bWwvZHJhd2VyXCIpO1xuO1xuLyoqXG4gKiBEcmF3ZXIgcHJvdmlkZXMgYW4gYXJlYSBmb3IgbmF2aWdhdGlvbiBjb250ZW50LlxuICovXG52YXIgRHJhd2VyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoRHJhd2VyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIERyYXdlcigpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnZpZXcgPSBuZXcgZHJhd2VyXzEuTWFpbihfdGhpcyk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgRHJhd2VyLnByb3RvdHlwZS5fZ2V0RHJhd2VyRE9NID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52aWV3LmZpbmRCeUlkKCdkcmF3ZXInKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIHZpc2libGUgcXVlcmllcyB3aGV0aGVyIHRoZSBEcmF3ZXIgaXMgdmlzaWJsZSBvciBub3QuXG4gICAgICovXG4gICAgRHJhd2VyLnByb3RvdHlwZS52aXNpYmxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gIXRoaXMuX2dldERyYXdlckRPTSgpLmNsYXNzTGlzdC5jb250YWlucyhTdHlsZXMuSElEREVOKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIGhpZGUgdGhlIGRyYXdlci5cbiAgICAgKi9cbiAgICBEcmF3ZXIucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLnZpc2libGUoKSlcbiAgICAgICAgICAgIHRoaXMuX2dldERyYXdlckRPTSgpLmNsYXNzTGlzdC5hZGQoU3R5bGVzLkhJRERFTik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBzaG93RHJhd2VyIHNob3dzIHRoZSBkcmF3ZXJcbiAgICAgKi9cbiAgICBEcmF3ZXIucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy52aXNpYmxlKCkpXG4gICAgICAgICAgICB0aGlzLl9nZXREcmF3ZXJET00oKS5jbGFzc0xpc3QucmVtb3ZlKFN0eWxlcy5ISURERU4pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogdG9nZ2xlIHRoZSB2aXNpYmlsaXR5IG9mIHRoaXMgRHJhd2VyXG4gICAgICovXG4gICAgRHJhd2VyLnByb3RvdHlwZS50b2dnbGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2dldERyYXdlckRPTSgpLmNsYXNzTGlzdC50b2dnbGUoU3R5bGVzLkhJRERFTik7XG4gICAgfTtcbiAgICByZXR1cm4gRHJhd2VyO1xufSh3bWxfcnVudGltZV8xLkNvbXBvbmVudCkpO1xuZXhwb3J0cy5EcmF3ZXIgPSBEcmF3ZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1EcmF3ZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB3bWxfcnVudGltZV8xID0gcmVxdWlyZShcIkBxdWVuay93bWwtcnVudGltZVwiKTtcbnZhciBTdHlsZXMgPSByZXF1aXJlKFwid21sLXdpZGdldHMtY29tbW9uL1N0eWxlc1wiKTtcbnZhciBNYWluID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoTWFpbiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBNYWluKGNvbnRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29udGV4dCkgfHwgdGhpcztcbiAgICAgICAgdmFyIHZpZXcgPSBfdGhpcztcbiAgICAgICAgX3RoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogU3R5bGVzLkRSQVdFUiB9LCB3bWw6IHsgJ2lkJzogXCJkcmF3ZXJcIiB9IH0sIFt3bWxfcnVudGltZV8xLm5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiBTdHlsZXMuRFJBV0VSX0NPTlRFTlQgfSwgd21sOiB7fSB9LCBbd21sX3J1bnRpbWVfMS5pZkUodGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmNvbnRlbnQnKSwgZnVuY3Rpb24gaWYwKCkgeyByZXR1cm4gdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmNvbnRlbnQnKS5jYWxsKHRoaXMsIHZpZXcpOyB9LmJpbmQodGhpcyksIGZ1bmN0aW9uIGVsc2VfY2xhdXNlMCgpIHsgcmV0dXJuIHdtbF9ydW50aW1lXzEuZG9taWZ5KHRoaXMuY2hpbGRyZW4pOyB9LmJpbmQodGhpcykpXSwgdmlldyldLCB2aWV3KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gTWFpbjtcbn0od21sX3J1bnRpbWVfMS5BcHBWaWV3KSk7XG5leHBvcnRzLk1haW4gPSBNYWluO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZHJhd2VyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgd21sX3J1bnRpbWVfMSA9IHJlcXVpcmUoXCJAcXVlbmsvd21sLXJ1bnRpbWVcIik7XG52YXIgRnJhZ21lbnQgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhGcmFnbWVudCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBGcmFnbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgIH1cbiAgICBGcmFnbWVudC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChjKSB7IHJldHVybiBmcmFnLmFwcGVuZENoaWxkKGMpOyB9KTtcbiAgICAgICAgcmV0dXJuIGZyYWc7XG4gICAgfTtcbiAgICByZXR1cm4gRnJhZ21lbnQ7XG59KHdtbF9ydW50aW1lXzEuQ29tcG9uZW50KSk7XG5leHBvcnRzLkZyYWdtZW50ID0gRnJhZ21lbnQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1GcmFnbWVudC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHdtbF9ydW50aW1lXzEgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC1ydW50aW1lXCIpO1xudmFyIFN0eWxlcyA9IHJlcXVpcmUoXCJ3bWwtd2lkZ2V0cy1jb21tb24vU3R5bGVzXCIpO1xudmFyIHZpZXdzID0gcmVxdWlyZShcIi4vd21sL2dyaWRcIik7XG47XG4vKipcbiAqIENvbnRhaW5lclxuICovXG52YXIgQ29udGFpbmVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQ29udGFpbmVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIENvbnRhaW5lcigpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnZpZXcgPSBuZXcgdmlld3MuQ29udGFpbmVyKF90aGlzKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gQ29udGFpbmVyO1xufSh3bWxfcnVudGltZV8xLkNvbXBvbmVudCkpO1xuZXhwb3J0cy5Db250YWluZXIgPSBDb250YWluZXI7XG52YXIgUm93ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoUm93LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFJvdygpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnZpZXcgPSBuZXcgdmlld3MuUm93KF90aGlzKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gUm93O1xufSh3bWxfcnVudGltZV8xLkNvbXBvbmVudCkpO1xuZXhwb3J0cy5Sb3cgPSBSb3c7XG52YXIgQ29sdW1uID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQ29sdW1uLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIENvbHVtbigpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnZpZXcgPSBuZXcgdmlld3MuQ29sdW1uKF90aGlzKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBDb2x1bW4ucHJvdG90eXBlLl9nZXRDbGFzcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNsYXNzZXMgPSBbU3R5bGVzLkdSSURfQ09MVU1OXTtcbiAgICAgICAgdmFyIHNpemUgPSB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6c2l6ZScsICdtZCcpO1xuICAgICAgICB2YXIgd2lkdGggPSB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6d2lkdGgnLCAxMik7XG4gICAgICAgIHZhciBvZmZzZXQgPSB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6b2Zmc2V0JywgMCk7XG4gICAgICAgIGNsYXNzZXMucHVzaChcImNvbC1cIiArIHNpemUgKyBcIi1cIiArIHdpZHRoKTtcbiAgICAgICAgaWYgKG9mZnNldClcbiAgICAgICAgICAgIGNsYXNzZXMucHVzaChcImNvbC1cIiArIHNpemUgKyBcIi1vZmZzZXQtXCIgKyBvZmZzZXQpO1xuICAgICAgICBjbGFzc2VzLnB1c2godGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmNsYXNzJykpO1xuICAgICAgICByZXR1cm4gY2xhc3Nlcy5maWx0ZXIoZnVuY3Rpb24gKHYpIHsgcmV0dXJuICEodiA9PSBudWxsKTsgfSkuam9pbignICcpO1xuICAgIH07XG4gICAgcmV0dXJuIENvbHVtbjtcbn0od21sX3J1bnRpbWVfMS5Db21wb25lbnQpKTtcbmV4cG9ydHMuQ29sdW1uID0gQ29sdW1uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9R3JpZC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHdtbF9ydW50aW1lXzEgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC1ydW50aW1lXCIpO1xudmFyIHV0aWxfMSA9IHJlcXVpcmUoXCJ3bWwtd2lkZ2V0cy1jb21tb24vdXRpbFwiKTtcbnZhciBTdHlsZXMgPSByZXF1aXJlKFwid21sLXdpZGdldHMtY29tbW9uL1N0eWxlc1wiKTtcbnZhciBDb250YWluZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhDb250YWluZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQ29udGFpbmVyKGNvbnRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29udGV4dCkgfHwgdGhpcztcbiAgICAgICAgdmFyIHZpZXcgPSBfdGhpcztcbiAgICAgICAgX3RoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCdzZWN0aW9uJywgeyBodG1sOiB7ICdjbGFzcyc6IHV0aWxfMS5jb21iaW5lKFtTdHlsZXMuR1JJRF9DT05UQUlORVIsIHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpjbGFzcycsICcnKV0pIH0sIHdtbDoge30gfSwgW3dtbF9ydW50aW1lXzEuZG9taWZ5KHRoaXMuY2hpbGRyZW4pXSwgdmlldyk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIENvbnRhaW5lcjtcbn0od21sX3J1bnRpbWVfMS5BcHBWaWV3KSk7XG5leHBvcnRzLkNvbnRhaW5lciA9IENvbnRhaW5lcjtcbnZhciBSb3cgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhSb3csIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gUm93KGNvbnRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29udGV4dCkgfHwgdGhpcztcbiAgICAgICAgdmFyIHZpZXcgPSBfdGhpcztcbiAgICAgICAgX3RoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogdXRpbF8xLmNvbWJpbmUoW1N0eWxlcy5HUklEX1JPVywgdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmNsYXNzJywgJycpXSkgfSwgd21sOiB7fSB9LCBbd21sX3J1bnRpbWVfMS5kb21pZnkodGhpcy5jaGlsZHJlbildLCB2aWV3KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gUm93O1xufSh3bWxfcnVudGltZV8xLkFwcFZpZXcpKTtcbmV4cG9ydHMuUm93ID0gUm93O1xudmFyIENvbHVtbiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKENvbHVtbiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBDb2x1bW4oY29udGV4dCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBjb250ZXh0KSB8fCB0aGlzO1xuICAgICAgICB2YXIgdmlldyA9IF90aGlzO1xuICAgICAgICBfdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB3bWxfcnVudGltZV8xLm5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiB0aGlzLl9nZXRDbGFzcygpIH0sIHdtbDoge30gfSwgW3dtbF9ydW50aW1lXzEuZG9taWZ5KHRoaXMuY2hpbGRyZW4pXSwgdmlldyk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIENvbHVtbjtcbn0od21sX3J1bnRpbWVfMS5BcHBWaWV3KSk7XG5leHBvcnRzLkNvbHVtbiA9IENvbHVtbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWdyaWQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgdGFibGUgPSByZXF1aXJlKFwiLi90YWJsZS9UYWJsZVwiKTtcbmV4cG9ydHMudGFibGUgPSB0YWJsZTtcbi8qIGpzaGludCBpZ25vcmU6c3RhcnQgKi9cbi8qXG5leHBvcnQgQnJlYWRDcnVtYk1lbnUgZnJvbSAnLi9icmVhZGNydW1icy9CcmVhZENydW1iTWVudSc7XG5leHBvcnQgQnJlYWRDcnVtYiBmcm9tICcuL2JyZWFkY3J1bWJzL0JyZWFkQ3J1bWInO1xuZXhwb3J0IEF1dG9jb21wbGV0ZSBmcm9tICcuL2F1dG9jb21wbGV0ZS9BdXRvY29tcGxldGUnO1xuZXhwb3J0IEp1bWJvdHJvbiBmcm9tICcuL2p1bWJvdHJvbi9KdW1ib3Ryb24nO1xuZXhwb3J0IFdlbGwgZnJvbSAnLi93ZWxsL1dlbGwnO1xuZXhwb3J0IExpc3RHcm91cCBmcm9tICcuL2xpc3QtZ3JvdXAvTGlzdEdyb3VwJztcbmV4cG9ydCBMaXN0R3JvdXBJdGVtIGZyb20gJy4vbGlzdC1ncm91cC9MaXN0R3JvdXBJdGVtJztcbmV4cG9ydCBTZWFyY2ggZnJvbSAnLi9zZWFyY2gvU2VhcmNoJztcbiovXG52YXIgYnJlYWRjcnVtYnNfMSA9IHJlcXVpcmUoXCIuL2JyZWFkY3J1bWJzXCIpO1xuZXhwb3J0cy5CcmVhZENydW1icyA9IGJyZWFkY3J1bWJzXzEuQnJlYWRDcnVtYnM7XG5leHBvcnRzLkNydW1iID0gYnJlYWRjcnVtYnNfMS5DcnVtYjtcbnZhciBGcmFnbWVudF8xID0gcmVxdWlyZShcIi4vZnJhZ21lbnQvRnJhZ21lbnRcIik7XG5leHBvcnRzLkZyYWdtZW50ID0gRnJhZ21lbnRfMS5GcmFnbWVudDtcbnZhciBEcmF3ZXJMYXlvdXRfMSA9IHJlcXVpcmUoXCIuL2RyYXdlci1sYXlvdXQvRHJhd2VyTGF5b3V0XCIpO1xuZXhwb3J0cy5EcmF3ZXJMYXlvdXQgPSBEcmF3ZXJMYXlvdXRfMS5EcmF3ZXJMYXlvdXQ7XG52YXIgRHJhd2VyXzEgPSByZXF1aXJlKFwiLi9kcmF3ZXIvRHJhd2VyXCIpO1xuZXhwb3J0cy5EcmF3ZXIgPSBEcmF3ZXJfMS5EcmF3ZXI7XG52YXIgQWN0aW9uQXJlYV8xID0gcmVxdWlyZShcIi4vYWN0aW9uLWFyZWEvQWN0aW9uQXJlYVwiKTtcbmV4cG9ydHMuQWN0aW9uQXJlYSA9IEFjdGlvbkFyZWFfMS5BY3Rpb25BcmVhO1xudmFyIE1haW5WaWV3XzEgPSByZXF1aXJlKFwiLi9tYWluLXZpZXcvTWFpblZpZXdcIik7XG5leHBvcnRzLk1haW5WaWV3ID0gTWFpblZpZXdfMS5NYWluVmlldztcbnZhciBNZW51QnV0dG9uXzEgPSByZXF1aXJlKFwiLi9tZW51LWJ1dHRvbi9NZW51QnV0dG9uXCIpO1xuZXhwb3J0cy5NZW51QnV0dG9uID0gTWVudUJ1dHRvbl8xLk1lbnVCdXR0b247XG52YXIgQnV0dG9uXzEgPSByZXF1aXJlKFwiLi9idXR0b24vQnV0dG9uXCIpO1xuZXhwb3J0cy5CdXR0b24gPSBCdXR0b25fMS5CdXR0b247XG5leHBvcnRzLkJ1dHRvbkdyb3VwID0gQnV0dG9uXzEuR3JvdXA7XG52YXIgR3JpZF8xID0gcmVxdWlyZShcIi4vZ3JpZC9HcmlkXCIpO1xuZXhwb3J0cy5Db250YWluZXIgPSBHcmlkXzEuQ29udGFpbmVyO1xuZXhwb3J0cy5Sb3cgPSBHcmlkXzEuUm93O1xuZXhwb3J0cy5Db2x1bW4gPSBHcmlkXzEuQ29sdW1uO1xudmFyIFBhbmVsXzEgPSByZXF1aXJlKFwiLi9wYW5lbC9QYW5lbFwiKTtcbmV4cG9ydHMuUGFuZWwgPSBQYW5lbF8xLlBhbmVsO1xuZXhwb3J0cy5QYW5lbEhlYWRlciA9IFBhbmVsXzEuSGVhZGVyO1xuZXhwb3J0cy5QYW5lbEJvZHkgPSBQYW5lbF8xLkJvZHk7XG5leHBvcnRzLlBhbmVsRm9vdGVyID0gUGFuZWxfMS5Gb290ZXI7XG52YXIgTW9kYWxfMSA9IHJlcXVpcmUoXCIuL21vZGFsL01vZGFsXCIpO1xuZXhwb3J0cy5Nb2RhbCA9IE1vZGFsXzEuTW9kYWw7XG5leHBvcnRzLk1vZGFsSGVhZGVyID0gTW9kYWxfMS5IZWFkZXI7XG5leHBvcnRzLk1vZGFsQm9keSA9IE1vZGFsXzEuQm9keTtcbmV4cG9ydHMuTW9kYWxGb290ZXIgPSBNb2RhbF8xLkZvb3RlcjtcbnZhciBJbnB1dF8xID0gcmVxdWlyZShcIi4vaW5wdXQvSW5wdXRcIik7XG5leHBvcnRzLklucHV0ID0gSW5wdXRfMS5JbnB1dDtcbmV4cG9ydHMuU2VsZWN0ID0gSW5wdXRfMS5TZWxlY3Q7XG52YXIgU3dpdGNoXzEgPSByZXF1aXJlKFwiLi9zd2l0Y2gvU3dpdGNoXCIpO1xuZXhwb3J0cy5Td2l0Y2ggPSBTd2l0Y2hfMS5Td2l0Y2g7XG52YXIgVGFibGVfMSA9IHJlcXVpcmUoXCIuL3RhYmxlL1RhYmxlXCIpO1xuZXhwb3J0cy5UYWJsZSA9IFRhYmxlXzEuVGFibGU7XG5leHBvcnRzLlNvcnRUYWJsZU1vZGVsID0gVGFibGVfMS5Tb3J0VGFibGVNb2RlbDtcbnZhciBUYWJzXzEgPSByZXF1aXJlKFwiLi90YWJzL1RhYnNcIik7XG5leHBvcnRzLlRhYiA9IFRhYnNfMS5UYWI7XG5leHBvcnRzLlRhYnMgPSBUYWJzXzEuVGFicztcbnZhciBCdXN5SW5kaWNhdG9yXzEgPSByZXF1aXJlKFwiLi9idXN5LWluZGljYXRvci9CdXN5SW5kaWNhdG9yXCIpO1xuZXhwb3J0cy5CdXN5SW5kaWNhdG9yID0gQnVzeUluZGljYXRvcl8xLkJ1c3lJbmRpY2F0b3I7XG52YXIgVHJlZU5hdl8xID0gcmVxdWlyZShcIi4vdHJlZS1uYXYvVHJlZU5hdlwiKTtcbmV4cG9ydHMuVHJlZU5hdiA9IFRyZWVOYXZfMS5UcmVlTmF2O1xuZXhwb3J0cy5UcmVlTmF2SXRlbSA9IFRyZWVOYXZfMS5UcmVlTmF2SXRlbTtcbnZhciBDYXJkXzEgPSByZXF1aXJlKFwiLi9jYXJkL0NhcmRcIik7XG5leHBvcnRzLkNhcmQgPSBDYXJkXzEuQ2FyZDtcbmV4cG9ydHMuQ2FyZEJvZHkgPSBDYXJkXzEuQ2FyZEJvZHk7XG4vKiBqc2hpbnQgaWdub3JlOmVuZCAqL1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB3bWxfcnVudGltZV8xID0gcmVxdWlyZShcIkBxdWVuay93bWwtcnVudGltZVwiKTtcbnZhciB1dGlsXzEgPSByZXF1aXJlKFwid21sLXdpZGdldHMtY29tbW9uL3V0aWxcIik7XG52YXIgaW5wdXRfMSA9IHJlcXVpcmUoXCIuL3dtbC9pbnB1dFwiKTtcbnZhciBJTlBVVF9TVUNDRVNTID0gJ2hhcy1zdWNjZXNzJztcbnZhciBJTlBVVF9FUlJPUiA9ICdoYXMtZXJyb3InO1xudmFyIElOUFVUX1dBUk5JTkcgPSAnaGFzLXdhcm5pbmcnO1xudmFyIERlZmF1bHRJbnB1dERlbGVnYXRlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEZWZhdWx0SW5wdXREZWxlZ2F0ZShpbnB1dCkge1xuICAgICAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XG4gICAgfVxuICAgIERlZmF1bHRJbnB1dERlbGVnYXRlLnByb3RvdHlwZS5vbklucHV0ID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgdGhpcy5pbnB1dC5hdHRyaWJ1dGVzLnJlYWQoJ3d3Om9uSW5wdXQnLCB1dGlsXzEubm9vcCkoZSk7XG4gICAgfTtcbiAgICByZXR1cm4gRGVmYXVsdElucHV0RGVsZWdhdGU7XG59KCkpO1xuZXhwb3J0cy5EZWZhdWx0SW5wdXREZWxlZ2F0ZSA9IERlZmF1bHRJbnB1dERlbGVnYXRlO1xuLyoqXG4gKiBJbnB1dFxuICovXG52YXIgSW5wdXQgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhJbnB1dCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBJbnB1dCgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnZpZXcgPSBuZXcgaW5wdXRfMS5JbnB1dFZpZXcoX3RoaXMpO1xuICAgICAgICBfdGhpcy5kZWxlZ2F0ZSA9IF90aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6ZGVsZWdhdGUnLCBuZXcgRGVmYXVsdElucHV0RGVsZWdhdGUoX3RoaXMpKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoSW5wdXQucHJvdG90eXBlLCBcIm5hbWVcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZpZXcuaWRzLmlucHV0Lm5hbWU7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShJbnB1dC5wcm90b3R5cGUsIFwidmFsdWVcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZpZXcuaWRzLmlucHV0LnZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBJbnB1dC5wcm90b3R5cGUuaW5pdGlhbFZhbHVlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcmV0ID0gdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OnZhbHVlJyk7XG4gICAgICAgIHJldHVybiAodHlwZW9mIHJldCA9PT0gJ2Z1bmN0aW9uJykgPyByZXQodGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3Om5hbWUnKSkgOiByZXQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBnZXRDbGFzc1xuICAgICAqL1xuICAgIElucHV0LnByb3RvdHlwZS5nZXRDbGFzcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGMgPSBcImZvcm0tZ3JvdXAgXCIgKyB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6Y2xhc3MnKTtcbiAgICAgICAgaWYgKCF0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6bWVzc2FnZScpKVxuICAgICAgICAgICAgcmV0dXJuIGM7XG4gICAgICAgIHJldHVybiBjICsgXCIgXCIgKyB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6dmFyaWFudCcsICdoYXMtZXJyb3InKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIHNldE1lc3NhZ2Ugc2V0cyB0aGUgbWVzc2FnZSBmb3IgdGhlIG1lc3NhZ2UgcG9ydGlvbiBvZlxuICAgICAqIHRoaXMgaW5wdXQuXG4gICAgICovXG4gICAgSW5wdXQucHJvdG90eXBlLnNldE1lc3NhZ2UgPSBmdW5jdGlvbiAobXNnKSB7XG4gICAgICAgIGlmIChtc2cgPT09IHZvaWQgMCkgeyBtc2cgPSAnJzsgfVxuICAgICAgICB2YXIgbWVzc2FnZSA9IHRoaXMudmlldy5pZHMubWVzc2FnZTtcbiAgICAgICAgdmFyIG5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShtc2cpO1xuICAgICAgICBpZiAobWVzc2FnZS5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICBtZXNzYWdlLnJlcGxhY2VDaGlsZChub2RlLCBtZXNzYWdlLmZpcnN0Q2hpbGQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbWVzc2FnZS5hcHBlbmRDaGlsZChub2RlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogaXNGaWxsZWQgdGVsbHMgaWYgdGhpcyBJbnB1dCBoYXMgYSBmaWxsZWQgdmFsdWUuXG4gICAgICovXG4gICAgSW5wdXQucHJvdG90eXBlLmlzRmlsbGVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gKHRoaXMudmlldy5pZHMuaW5wdXQudmFsdWUgIT0gbnVsbCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBpc1JlcXVpcmVkIHRlbGxzIGlmIHRoZSBJbnB1dCB3YXMgcmVxdWlyZWQuXG4gICAgICovXG4gICAgSW5wdXQucHJvdG90eXBlLmlzUmVxdWlyZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OnJlcXVpcmVkJykgIT0gbnVsbCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBpc1ZhbGlkIHF1ZXJpZXMgd2hldGhlciB0aGUgSW5wdXQgaGFzIGJlZW4gaW52YWxpZGF0ZWRcbiAgICAgKiBvciBub3QuXG4gICAgICovXG4gICAgSW5wdXQucHJvdG90eXBlLmlzVmFsaWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAodGhpcy52aWV3Lmlkcy5yb290LmNsYXNzTmFtZS5zcGxpdCgnICcpLmluZGV4T2YoSU5QVVRfRVJST1IpID09PSAtMSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiByZW1vdmVWYWxpZGF0aW9uU3RhdGUgcmVtb3ZlcyB0aGUgc3RhdGUgdmFsaWRhdGlvbiBzdGF0ZSBmcm9tIHRoZSBpbnB1dC5cbiAgICAgKi9cbiAgICBJbnB1dC5wcm90b3R5cGUucmVtb3ZlVmFsaWRhdGlvblN0YXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgaCA9IHRoaXMudmlldy5pZHMucm9vdDtcbiAgICAgICAgaC5jbGFzc0xpc3QucmVtb3ZlKElOUFVUX1NVQ0NFU1MpO1xuICAgICAgICBoLmNsYXNzTGlzdC5yZW1vdmUoSU5QVVRfRVJST1IpO1xuICAgICAgICBoLmNsYXNzTGlzdC5yZW1vdmUoSU5QVVRfV0FSTklORyk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBpbnZhbGlkYXRlIHRoaXMgSW5wdXQgd2l0aCBhbiBvcHRpb25hbCBtZXNzYWdlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlXG4gICAgICogQHJldHVybnMge0lucHV0fVxuICAgICAqL1xuICAgIElucHV0LnByb3RvdHlwZS5pbnZhbGlkYXRlID0gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcbiAgICAgICAgaWYgKG1lc3NhZ2UgPT09IHZvaWQgMCkgeyBtZXNzYWdlID0gJyc7IH1cbiAgICAgICAgdGhpcy5yZW1vdmVWYWxpZGF0aW9uU3RhdGUoKTtcbiAgICAgICAgdGhpcy5zZXRNZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgICB0aGlzLnZpZXcuaWRzLnJvb3QuY2xhc3NMaXN0LmFkZChJTlBVVF9FUlJPUik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiB2YWxpZGF0ZSB0aGlzIGlucHV0IHdpdGggYW4gb3B0aW9uYWwgbWVzc3NhZ2UuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2VcbiAgICAgKiBAcmV0dXJucyB7SW5wdXR9XG4gICAgICovXG4gICAgSW5wdXQucHJvdG90eXBlLnZhbGlkYXRlID0gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcbiAgICAgICAgaWYgKG1lc3NhZ2UgPT09IHZvaWQgMCkgeyBtZXNzYWdlID0gJyc7IH1cbiAgICAgICAgdGhpcy5yZW1vdmVWYWxpZGF0aW9uU3RhdGUoKTtcbiAgICAgICAgdGhpcy5zZXRNZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgICB0aGlzLnZpZXcuaWRzLnJvb3QuY2xhc3NMaXN0LmFkZChJTlBVVF9TVUNDRVNTKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIHdhcm4gdGhpcyBpbnB1dCB3aXRoIGFuIG9wdGlvbmFsIG1lc3NhZ2UuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2VcbiAgICAgKiBAcmV0dXJucyB7SW5wdXR9XG4gICAgICovXG4gICAgSW5wdXQucHJvdG90eXBlLndhcm4gPSBmdW5jdGlvbiAobWVzc2FnZSkge1xuICAgICAgICBpZiAobWVzc2FnZSA9PT0gdm9pZCAwKSB7IG1lc3NhZ2UgPSAnJzsgfVxuICAgICAgICB0aGlzLnJlbW92ZVZhbGlkYXRpb25TdGF0ZSgpO1xuICAgICAgICB0aGlzLnNldE1lc3NhZ2UobWVzc2FnZSk7XG4gICAgICAgIHRoaXMudmlldy5pZHMucm9vdC5jbGFzc0xpc3QuYWRkKElOUFVUX1dBUk5JTkcpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogcmVzZXQgdGhpcyBpbnB1dCB0byBhIGNsZWFuIHN0YXRlLlxuICAgICAqIFJlbW92ZXMgbWVzc2FnZXMsIHZhbGlkYXRpb24gc3RhdGUgZXRjLlxuICAgICAqIEByZXR1cm4ge0lucHV0fVxuICAgICAqL1xuICAgIElucHV0LnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHJvb3QgPSB0aGlzLnZpZXcuaWRzLnJvb3Q7XG4gICAgICAgIHZhciBtID0gdGhpcy52aWV3Lmlkcy5tZXNzYWdlO1xuICAgICAgICB0aGlzLnJlbW92ZVZhbGlkYXRpb25TdGF0ZSgpO1xuICAgICAgICB3aGlsZSAobS5maXJzdENoaWxkKVxuICAgICAgICAgICAgbS5yZW1vdmVDaGlsZChtLmZpcnN0Q2hpbGQpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogcmVuZGVyZWQgY2hlY2tzIGlmIHRoZSBpbnB1dCBzaG91bGQgaGF2ZSBhIHZhbGlkYXRpb24gc3RhdGUgc2V0XG4gICAgICovXG4gICAgSW5wdXQucHJvdG90eXBlLnJlbmRlcmVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdmFsaWRhdGUgPSB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6dmFsaWRhdGUnKTtcbiAgICAgICAgdmFyIGludmFsaWRhdGUgPSB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6aW52YWxpZGF0ZScpO1xuICAgICAgICB2YXIgd2FybiA9IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzp3YXJuJyk7XG4gICAgICAgIHZhbGlkYXRlID9cbiAgICAgICAgICAgIHRoaXMudmFsaWRhdGUodmFsaWRhdGUpIDpcbiAgICAgICAgICAgIHdhcm4gP1xuICAgICAgICAgICAgICAgIHRoaXMud2Fybih3YXJuKSA6XG4gICAgICAgICAgICAgICAgaW52YWxpZGF0ZSA/XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW52YWxpZGF0ZShpbnZhbGlkYXRlKSA6XG4gICAgICAgICAgICAgICAgICAgIG51bGw7XG4gICAgfTtcbiAgICByZXR1cm4gSW5wdXQ7XG59KHdtbF9ydW50aW1lXzEuQ29tcG9uZW50KSk7XG5leHBvcnRzLklucHV0ID0gSW5wdXQ7XG52YXIgU2VsZWN0ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoU2VsZWN0LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFNlbGVjdCgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnZpZXcgPSBuZXcgaW5wdXRfMS5TZWxlY3RWaWV3KF90aGlzKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gU2VsZWN0O1xufShJbnB1dCkpO1xuZXhwb3J0cy5TZWxlY3QgPSBTZWxlY3Q7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1JbnB1dC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHdtbF9ydW50aW1lXzEgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC1ydW50aW1lXCIpO1xudmFyIFN0eWxlcyA9IHJlcXVpcmUoXCJ3bWwtd2lkZ2V0cy1jb21tb24vU3R5bGVzXCIpO1xuZnVuY3Rpb24gbGFiZWwodmlldykgeyByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCdsYWJlbCcsIHsgaHRtbDogeyAnZm9yJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmlkJyksICdjbGFzcyc6IFN0eWxlcy5DT05UUk9MX0xBQkVMIH0sIHdtbDoge30gfSwgW3dtbF9ydW50aW1lXzEuZG9taWZ5KHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpsYWJlbCcpKV0sIHZpZXcpOyB9XG5leHBvcnRzLmxhYmVsID0gbGFiZWw7XG5mdW5jdGlvbiBtZXNzYWdlKHZpZXcpIHsgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgnc3BhbicsIHsgaHRtbDogeyAnY2xhc3MnOiBcImhlbHAtYmxvY2tcIiB9LCB3bWw6IHsgJ2lkJzogXCJtZXNzYWdlXCIgfSB9LCBbd21sX3J1bnRpbWVfMS5kb21pZnkodGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3Om1lc3NhZ2UnLCAnJykpXSwgdmlldyk7IH1cbmV4cG9ydHMubWVzc2FnZSA9IG1lc3NhZ2U7XG52YXIgU2VsZWN0VmlldyA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFNlbGVjdFZpZXcsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gU2VsZWN0Vmlldyhjb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbnRleHQpIHx8IHRoaXM7XG4gICAgICAgIHZhciB2aWV3ID0gX3RoaXM7XG4gICAgICAgIF90aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6IFtTdHlsZXMuRk9STV9HUk9VUCwgdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OnZhcmlhbnQnLCAnJyldLmpvaW4oJywnKSB9LCB3bWw6IHt9IH0sIFtsYWJlbC5jYWxsKHRoaXMsIHZpZXcpLCB3bWxfcnVudGltZV8xLm5vZGUoJ3NlbGVjdCcsIHsgaHRtbDogeyAnaWQnOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6aWQnLCAnJyksICd0aXRsZSc6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzp0aXRsZScpLCAnbmFtZSc6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpuYW1lJywgdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmlkJywgJycpKSwgJ29uY2hhbmdlJzogdGhpcy5kZWxlZ2F0ZS5vbklucHV0LmJpbmQodGhpcy5kZWxlZ2F0ZSksICd2YWx1ZSc6IHRoaXMuaW5pdGlhbFZhbHVlKCksICdkaXNhYmxlZCc6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpkaXNhYmxlZCcsIG51bGwpLCAncmVhZG9ubHknOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6cmVhZG9ubHknLCBudWxsKSwgJ2NsYXNzJzogU3R5bGVzLlNFTEVDVCB9LCB3bWw6IHsgJ2lkJzogXCJpbnB1dFwiIH0gfSwgW3dtbF9ydW50aW1lXzEuZm9yRSh0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6b3B0aW9ucycsIFtdKSwgZnVuY3Rpb24gZm9yMShvcHQpIHsgcmV0dXJuIChmdW5jdGlvbiAoKSB7IHJldHVybiAodHlwZW9mIG9wdCA9PT0gJ3N0cmluZycpID8gd21sX3J1bnRpbWVfMS5ib3god21sX3J1bnRpbWVfMS5ub2RlKCdvcHRpb24nLCB7IGh0bWw6IHt9LCB3bWw6IHt9IH0sIFt3bWxfcnVudGltZV8xLmRvbWlmeShvcHQpXSwgdmlldyksIHdtbF9ydW50aW1lXzEubm9kZSgnb3B0aW9uJywgeyBodG1sOiB7fSwgd21sOiB7fSB9LCBbd21sX3J1bnRpbWVfMS5kb21pZnkob3B0KV0sIHZpZXcpLCB3bWxfcnVudGltZV8xLm5vZGUoJ29wdGlvbicsIHsgaHRtbDoge30sIHdtbDoge30gfSwgW3dtbF9ydW50aW1lXzEuZG9taWZ5KG9wdCldLCB2aWV3KSkgOiB3bWxfcnVudGltZV8xLm5vZGUoJ29wdGlvbicsIHsgaHRtbDogeyAndmFsdWUnOiBvcHQudmFsdWUgfSwgd21sOiB7fSB9LCBbd21sX3J1bnRpbWVfMS5kb21pZnkob3B0LmxhYmVsKV0sIHZpZXcpOyB9KS5jYWxsKHRoaXMpOyB9LmJpbmQodGhpcyksIGZ1bmN0aW9uIGZvcl9vdGhlcndpc2UxKCkgeyByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCdwJywgeyBodG1sOiB7fSwgd21sOiB7fSB9LCBbXSwgdmlldyk7IH0uYmluZCh0aGlzKSldLCB2aWV3KSwgbWVzc2FnZS5jYWxsKHRoaXMsIHZpZXcpXSwgdmlldyk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIFNlbGVjdFZpZXc7XG59KHdtbF9ydW50aW1lXzEuQXBwVmlldykpO1xuZXhwb3J0cy5TZWxlY3RWaWV3ID0gU2VsZWN0VmlldztcbnZhciBJbnB1dFZpZXcgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhJbnB1dFZpZXcsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gSW5wdXRWaWV3KGNvbnRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29udGV4dCkgfHwgdGhpcztcbiAgICAgICAgdmFyIHZpZXcgPSBfdGhpcztcbiAgICAgICAgX3RoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogW1N0eWxlcy5GT1JNX0dST1VQLCB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6dmFyaWFudCcsICcnKV0uam9pbignLCcpIH0sIHdtbDoge30gfSwgW2xhYmVsLmNhbGwodGhpcywgdmlldyksIHdtbF9ydW50aW1lXzEuaWZFKHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzp0eXBlJywgJ3RleHQnKSAhPT0gJ3RleHRhcmVhJywgZnVuY3Rpb24gaWYzKCkgeyByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCdpbnB1dCcsIHsgaHRtbDogeyAnaWQnOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6aWQnLCAnJyksICd0aXRsZSc6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzp0aXRsZScpLCAnbmFtZSc6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpuYW1lJywgdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmlkJywgJycpKSwgJ3R5cGUnOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6dHlwZScsICd0ZXh0JyksICdwbGFjZWhvbGRlcic6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpwbGFjZWhvbGRlcicpLCAnb25pbnB1dCc6IHRoaXMuZGVsZWdhdGUub25JbnB1dC5iaW5kKHRoaXMuZGVsZWdhdGUpLCAndmFsdWUnOiB0aGlzLmluaXRpYWxWYWx1ZSgpLCAnZGlzYWJsZWQnOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6ZGlzYWJsZWQnLCBudWxsKSwgJ3JlYWRvbmx5JzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OnJlYWRvbmx5JywgbnVsbCksICdjbGFzcyc6IFN0eWxlcy5JTlBVVCB9LCB3bWw6IHsgJ2lkJzogXCJpbnB1dFwiIH0gfSwgW10sIHZpZXcpOyB9LmJpbmQodGhpcyksIGZ1bmN0aW9uIGVsc2VfY2xhdXNlMygpIHsgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgndGV4dGFyZWEnLCB7IGh0bWw6IHsgJ2lkJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmlkJywgJycpLCAndGl0bGUnOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6dGl0bGUnKSwgJ25hbWUnOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6bmFtZScsIHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzppZCcsICcnKSksICdjbGFzcyc6IFN0eWxlcy5URVhUQVJFQSwgJ3BsYWNlaG9sZGVyJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OnBsYWNlaG9sZGVyJyksICdvbmlucHV0JzogdGhpcy5kZWxlZ2F0ZS5vbklucHV0LmJpbmQodGhpcy5kZWxlZ2F0ZSksICdkaXNhYmxlZCc6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpkaXNhYmxlZCcsIG51bGwpLCAncmVhZG9ubHknOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6cmVhZG9ubHknLCBudWxsKSwgJ3Jvd3MnOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd2F0OnJvd3MnKSB9LCB3bWw6IHsgJ2lkJzogXCJpbnB1dFwiIH0gfSwgW3dtbF9ydW50aW1lXzEuZG9taWZ5KHRoaXMuaW5pdGlhbFZhbHVlKCkpXSwgdmlldyk7IH0uYmluZCh0aGlzKSksIG1lc3NhZ2UuY2FsbCh0aGlzLCB2aWV3KV0sIHZpZXcpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBJbnB1dFZpZXc7XG59KHdtbF9ydW50aW1lXzEuQXBwVmlldykpO1xuZXhwb3J0cy5JbnB1dFZpZXcgPSBJbnB1dFZpZXc7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbnB1dC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGNvbW1vbiA9IHJlcXVpcmUoXCJ3bWwtd2lkZ2V0cy1jb21tb25cIik7XG52YXIgbWFpbl92aWV3XzEgPSByZXF1aXJlKFwiLi93bWwvbWFpbi12aWV3XCIpO1xuLyoqXG4gKiBNYWluVmlldyBwcm92aWRlcyBhIGNvbnRhaW5lciBmb3IgdGhlIG1haW4gY29udGVudCBvZiBhbiBhcHBsaWNhdGlvbi5cbiAqL1xudmFyIE1haW5WaWV3ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoTWFpblZpZXcsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gTWFpblZpZXcoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IG1haW5fdmlld18xLk1haW4oX3RoaXMpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBNYWluVmlldztcbn0oY29tbW9uLkNvbnRhaW5lcikpO1xuZXhwb3J0cy5NYWluVmlldyA9IE1haW5WaWV3O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9TWFpblZpZXcuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB3bWxfcnVudGltZV8xID0gcmVxdWlyZShcIkBxdWVuay93bWwtcnVudGltZVwiKTtcbnZhciBTdHlsZXMgPSByZXF1aXJlKFwid21sLXdpZGdldHMtY29tbW9uL1N0eWxlc1wiKTtcbnZhciB1dGlsXzEgPSByZXF1aXJlKFwid21sLXdpZGdldHMtY29tbW9uL3V0aWxcIik7XG52YXIgTWFpbiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKE1haW4sIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gTWFpbihjb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbnRleHQpIHx8IHRoaXM7XG4gICAgICAgIHZhciB2aWV3ID0gX3RoaXM7XG4gICAgICAgIF90aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6IHV0aWxfMS5jb21iaW5lKFtTdHlsZXMuTUFJTl9WSUVXLCBTdHlsZXMuRFJBV0VSX1BVU0hBQkxFLCB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6Y2xhc3MnLCAnJyldKSB9LCB3bWw6IHt9IH0sIFt3bWxfcnVudGltZV8xLmRvbWlmeSh0aGlzLmNoaWxkcmVuKV0sIHZpZXcpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBNYWluO1xufSh3bWxfcnVudGltZV8xLkFwcFZpZXcpKTtcbmV4cG9ydHMuTWFpbiA9IE1haW47XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYWluLXZpZXcuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB3bWxfcnVudGltZV8xID0gcmVxdWlyZShcIkBxdWVuay93bWwtcnVudGltZVwiKTtcbnZhciBtZW51X2J1dHRvbl8xID0gcmVxdWlyZShcIi4vd21sL21lbnVfYnV0dG9uXCIpO1xuLyoqXG4gKiBNZW51QnV0dG9uIHByb3ZpZGVzIGEgJ2hhbWJ1cmdlcicgbWVudSBidXR0b24uXG4gKi9cbnZhciBNZW51QnV0dG9uID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoTWVudUJ1dHRvbiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBNZW51QnV0dG9uKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMudmlldyA9IG5ldyBtZW51X2J1dHRvbl8xLk1haW4oX3RoaXMpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBNZW51QnV0dG9uO1xufSh3bWxfcnVudGltZV8xLkNvbXBvbmVudCkpO1xuZXhwb3J0cy5NZW51QnV0dG9uID0gTWVudUJ1dHRvbjtcbmV4cG9ydHMuZGVmYXVsdCA9IE1lbnVCdXR0b247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1NZW51QnV0dG9uLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgd21sX3J1bnRpbWVfMSA9IHJlcXVpcmUoXCJAcXVlbmsvd21sLXJ1bnRpbWVcIik7XG52YXIgU3R5bGUgPSByZXF1aXJlKFwid21sLXdpZGdldHMtY29tbW9uL1N0eWxlc1wiKTtcbnZhciB1dGlsXzEgPSByZXF1aXJlKFwid21sLXdpZGdldHMtY29tbW9uL3V0aWxcIik7XG52YXIgTWFpbiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKE1haW4sIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gTWFpbihjb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbnRleHQpIHx8IHRoaXM7XG4gICAgICAgIHZhciB2aWV3ID0gX3RoaXM7XG4gICAgICAgIF90aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgnYnV0dG9uJywgeyBodG1sOiB7ICdjbGFzcyc6IFN0eWxlLk1FTlVfQlVUVE9OLCAnb25jbGljayc6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpvbkNsaWNrJywgdXRpbF8xLm5vb3ApIH0sIHdtbDoge30gfSwgW3dtbF9ydW50aW1lXzEubm9kZSgnc3BhbicsIHsgaHRtbDogeyAnY2xhc3MnOiBcIlwiIH0sIHdtbDoge30gfSwgW10sIHZpZXcpLCB3bWxfcnVudGltZV8xLm5vZGUoJ3NwYW4nLCB7IGh0bWw6IHsgJ2NsYXNzJzogXCJcIiB9LCB3bWw6IHt9IH0sIFtdLCB2aWV3KSwgd21sX3J1bnRpbWVfMS5ub2RlKCdzcGFuJywgeyBodG1sOiB7ICdjbGFzcyc6IFwiXCIgfSwgd21sOiB7fSB9LCBbXSwgdmlldyldLCB2aWV3KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gTWFpbjtcbn0od21sX3J1bnRpbWVfMS5BcHBWaWV3KSk7XG5leHBvcnRzLk1haW4gPSBNYWluO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWVudV9idXR0b24uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB3bWxfcnVudGltZV8xID0gcmVxdWlyZShcIkBxdWVuay93bWwtcnVudGltZVwiKTtcbnZhciB2aWV3cyA9IHJlcXVpcmUoXCIuL3dtbC9tb2RhbFwiKTtcbi8qKlxuICogTW9kYWxcbiAqL1xudmFyIE1vZGFsID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoTW9kYWwsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gTW9kYWwoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IHZpZXdzLk1vZGFsKF90aGlzKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBjbG9zZSB0aGUgbW9kYWwuXG4gICAgICovXG4gICAgTW9kYWwucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbSA9IHRoaXMudmlldy5maW5kQnlJZCgnbW9kYWwnKTtcbiAgICAgICAgbS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG0pO1xuICAgIH07XG4gICAgTW9kYWwucHJvdG90eXBlLnBsYWNlID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgd2hpbGUgKGUuZmlyc3RDaGlsZCAhPSBudWxsKVxuICAgICAgICAgICAgZS5yZW1vdmVDaGlsZChlLmZpcnN0Q2hpbGQpO1xuICAgICAgICBlLmFwcGVuZENoaWxkKHRoaXMucmVuZGVyKCkpO1xuICAgIH07XG4gICAgcmV0dXJuIE1vZGFsO1xufSh3bWxfcnVudGltZV8xLkNvbXBvbmVudCkpO1xuZXhwb3J0cy5Nb2RhbCA9IE1vZGFsO1xuLyoqXG4gKiBIZWFkZXJcbiAqL1xudmFyIEhlYWRlciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEhlYWRlciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBIZWFkZXIoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IHZpZXdzLkhlYWRlcihfdGhpcyk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIEhlYWRlcjtcbn0od21sX3J1bnRpbWVfMS5Db21wb25lbnQpKTtcbmV4cG9ydHMuSGVhZGVyID0gSGVhZGVyO1xuLyoqXG4gKiBCb2R5XG4gKi9cbnZhciBCb2R5ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQm9keSwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBCb2R5KCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMudmlldyA9IG5ldyB2aWV3cy5Cb2R5KF90aGlzKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gQm9keTtcbn0od21sX3J1bnRpbWVfMS5Db21wb25lbnQpKTtcbmV4cG9ydHMuQm9keSA9IEJvZHk7XG4vKipcbiAqIEZvb3RlclxuICovXG52YXIgRm9vdGVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoRm9vdGVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEZvb3RlcigpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnZpZXcgPSBuZXcgdmlld3MuRm9vdGVyKF90aGlzKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gRm9vdGVyO1xufSh3bWxfcnVudGltZV8xLkNvbXBvbmVudCkpO1xuZXhwb3J0cy5Gb290ZXIgPSBGb290ZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Nb2RhbC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHdtbF9ydW50aW1lXzEgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC1ydW50aW1lXCIpO1xudmFyIFN0eWxlcyA9IHJlcXVpcmUoXCJ3bWwtd2lkZ2V0cy1jb21tb24vU3R5bGVzXCIpO1xudmFyIHV0aWxfMSA9IHJlcXVpcmUoXCJ3bWwtd2lkZ2V0cy1jb21tb24vdXRpbFwiKTtcbnZhciBNb2RhbCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKE1vZGFsLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIE1vZGFsKGNvbnRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29udGV4dCkgfHwgdGhpcztcbiAgICAgICAgdmFyIHZpZXcgPSBfdGhpcztcbiAgICAgICAgX3RoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogU3R5bGVzLk1PREFMLCAndGFiaW5kZXgnOiBcIi0xXCIsICdyb2xlJzogXCJkaWFsb2dcIiB9LCB3bWw6IHsgJ2lkJzogXCJtb2RhbFwiIH0gfSwgW3dtbF9ydW50aW1lXzEubm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6IFN0eWxlcy5NT0RBTF9ESUFMT0csICdyb2xlJzogXCJkb2N1bWVudFwiIH0sIHdtbDoge30gfSwgW3dtbF9ydW50aW1lXzEubm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6IFN0eWxlcy5NT0RBTF9DT05URU5UIH0sIHdtbDogeyAnaWQnOiBcImNvbnRlbnRcIiB9IH0sIFt3bWxfcnVudGltZV8xLmRvbWlmeSh0aGlzLmNoaWxkcmVuKV0sIHZpZXcpXSwgdmlldyldLCB2aWV3KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gTW9kYWw7XG59KHdtbF9ydW50aW1lXzEuQXBwVmlldykpO1xuZXhwb3J0cy5Nb2RhbCA9IE1vZGFsO1xudmFyIEhlYWRlciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEhlYWRlciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBIZWFkZXIoY29udGV4dCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBjb250ZXh0KSB8fCB0aGlzO1xuICAgICAgICB2YXIgdmlldyA9IF90aGlzO1xuICAgICAgICBfdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB3bWxfcnVudGltZV8xLm5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiBTdHlsZXMuTU9EQUxfSEVBREVSIH0sIHdtbDoge30gfSwgW3dtbF9ydW50aW1lXzEubm9kZSgnYnV0dG9uJywgeyBodG1sOiB7ICd0eXBlJzogXCJidXR0b25cIiwgJ2NsYXNzJzogXCJjbG9zZVwiLCAnYXJpYS1sYWJlbCc6IFwiQ2xvc2VcIiwgJ29uY2xpY2snOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6b25DbG9zZScsIHV0aWxfMS5ub29wKSB9LCB3bWw6IHt9IH0sIFt3bWxfcnVudGltZV8xLm5vZGUoJ3NwYW4nLCB7IGh0bWw6IHsgJ2FyaWEtaGlkZGVuJzogXCJ0cnVlXCIgfSwgd21sOiB7fSB9LCBbd21sX3J1bnRpbWVfMS50ZXh0KFwiXFx1MDBEN1wiKV0sIHZpZXcpXSwgdmlldyksIHdtbF9ydW50aW1lXzEuZG9taWZ5KHRoaXMuY2hpbGRyZW4pXSwgdmlldyk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIEhlYWRlcjtcbn0od21sX3J1bnRpbWVfMS5BcHBWaWV3KSk7XG5leHBvcnRzLkhlYWRlciA9IEhlYWRlcjtcbnZhciBCb2R5ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQm9keSwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBCb2R5KGNvbnRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29udGV4dCkgfHwgdGhpcztcbiAgICAgICAgdmFyIHZpZXcgPSBfdGhpcztcbiAgICAgICAgX3RoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogU3R5bGVzLk1PREFMX0JPRFkgfSwgd21sOiB7fSB9LCBbd21sX3J1bnRpbWVfMS5kb21pZnkodGhpcy5jaGlsZHJlbildLCB2aWV3KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gQm9keTtcbn0od21sX3J1bnRpbWVfMS5BcHBWaWV3KSk7XG5leHBvcnRzLkJvZHkgPSBCb2R5O1xudmFyIEZvb3RlciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEZvb3RlciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBGb290ZXIoY29udGV4dCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBjb250ZXh0KSB8fCB0aGlzO1xuICAgICAgICB2YXIgdmlldyA9IF90aGlzO1xuICAgICAgICBfdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB3bWxfcnVudGltZV8xLm5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiBTdHlsZXMuTU9EQUxfRk9PVEVSIH0sIHdtbDoge30gfSwgW3dtbF9ydW50aW1lXzEuZG9taWZ5KHRoaXMuY2hpbGRyZW4pXSwgdmlldyk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIEZvb3Rlcjtcbn0od21sX3J1bnRpbWVfMS5BcHBWaWV3KSk7XG5leHBvcnRzLkZvb3RlciA9IEZvb3Rlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1vZGFsLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgd21sX3J1bnRpbWVfMSA9IHJlcXVpcmUoXCJAcXVlbmsvd21sLXJ1bnRpbWVcIik7XG52YXIgdmlld3MgPSByZXF1aXJlKFwiLi93bWwvcGFuZWxcIik7XG52YXIgUGFuZWwgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhQYW5lbCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBQYW5lbCgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnZpZXcgPSBuZXcgdmlld3MuUGFuZWwoX3RoaXMpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBQYW5lbDtcbn0od21sX3J1bnRpbWVfMS5Db21wb25lbnQpKTtcbmV4cG9ydHMuUGFuZWwgPSBQYW5lbDtcbnZhciBIZWFkZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhIZWFkZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gSGVhZGVyKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMudmlldyA9IG5ldyB2aWV3cy5IZWFkZXIoX3RoaXMpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBIZWFkZXI7XG59KHdtbF9ydW50aW1lXzEuQ29tcG9uZW50KSk7XG5leHBvcnRzLkhlYWRlciA9IEhlYWRlcjtcbnZhciBCb2R5ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQm9keSwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBCb2R5KCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMudmlldyA9IG5ldyB2aWV3cy5Cb2R5KF90aGlzKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gQm9keTtcbn0od21sX3J1bnRpbWVfMS5Db21wb25lbnQpKTtcbmV4cG9ydHMuQm9keSA9IEJvZHk7XG52YXIgRm9vdGVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoRm9vdGVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEZvb3RlcigpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnZpZXcgPSBuZXcgdmlld3MuRm9vdGVyKF90aGlzKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gRm9vdGVyO1xufSh3bWxfcnVudGltZV8xLkNvbXBvbmVudCkpO1xuZXhwb3J0cy5Gb290ZXIgPSBGb290ZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1QYW5lbC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHdtbF9ydW50aW1lXzEgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC1ydW50aW1lXCIpO1xudmFyIFN0eWxlcyA9IHJlcXVpcmUoXCJ3bWwtd2lkZ2V0cy1jb21tb24vU3R5bGVzXCIpO1xudmFyIHV0aWxfMSA9IHJlcXVpcmUoXCJ3bWwtd2lkZ2V0cy1jb21tb24vdXRpbFwiKTtcbnZhciBQYW5lbCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFBhbmVsLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFBhbmVsKGNvbnRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29udGV4dCkgfHwgdGhpcztcbiAgICAgICAgdmFyIHZpZXcgPSBfdGhpcztcbiAgICAgICAgX3RoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogdXRpbF8xLmNvbWJpbmUoW1N0eWxlcy5QQU5FTCwgdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OnN0eWxlJywgU3R5bGVzLkRFRkFVTFQpXSkgfSwgd21sOiB7fSB9LCBbd21sX3J1bnRpbWVfMS5kb21pZnkodGhpcy5jaGlsZHJlbildLCB2aWV3KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gUGFuZWw7XG59KHdtbF9ydW50aW1lXzEuQXBwVmlldykpO1xuZXhwb3J0cy5QYW5lbCA9IFBhbmVsO1xudmFyIEhlYWRlciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEhlYWRlciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBIZWFkZXIoY29udGV4dCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBjb250ZXh0KSB8fCB0aGlzO1xuICAgICAgICB2YXIgdmlldyA9IF90aGlzO1xuICAgICAgICBfdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB3bWxfcnVudGltZV8xLm5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiBTdHlsZXMuUEFORUxfSEVBREVSIH0sIHdtbDoge30gfSwgW3dtbF9ydW50aW1lXzEuZG9taWZ5KHRoaXMuY2hpbGRyZW4pXSwgdmlldyk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIEhlYWRlcjtcbn0od21sX3J1bnRpbWVfMS5BcHBWaWV3KSk7XG5leHBvcnRzLkhlYWRlciA9IEhlYWRlcjtcbnZhciBCb2R5ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQm9keSwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBCb2R5KGNvbnRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29udGV4dCkgfHwgdGhpcztcbiAgICAgICAgdmFyIHZpZXcgPSBfdGhpcztcbiAgICAgICAgX3RoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogU3R5bGVzLlBBTkVMX0JPRFkgfSwgd21sOiB7fSB9LCBbd21sX3J1bnRpbWVfMS5kb21pZnkodGhpcy5jaGlsZHJlbildLCB2aWV3KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gQm9keTtcbn0od21sX3J1bnRpbWVfMS5BcHBWaWV3KSk7XG5leHBvcnRzLkJvZHkgPSBCb2R5O1xudmFyIEZvb3RlciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEZvb3RlciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBGb290ZXIoY29udGV4dCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBjb250ZXh0KSB8fCB0aGlzO1xuICAgICAgICB2YXIgdmlldyA9IF90aGlzO1xuICAgICAgICBfdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB3bWxfcnVudGltZV8xLm5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiBTdHlsZXMuUEFORUxfRk9PVEVSIH0sIHdtbDoge30gfSwgW3dtbF9ydW50aW1lXzEuZG9taWZ5KHRoaXMuY2hpbGRyZW4pXSwgdmlldyk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIEZvb3Rlcjtcbn0od21sX3J1bnRpbWVfMS5BcHBWaWV3KSk7XG5leHBvcnRzLkZvb3RlciA9IEZvb3Rlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBhbmVsLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgd21sX3J1bnRpbWVfMSA9IHJlcXVpcmUoXCJAcXVlbmsvd21sLXJ1bnRpbWVcIik7XG52YXIgc3dpdGNoXzEgPSByZXF1aXJlKFwiLi93bWwvc3dpdGNoXCIpO1xuLyoqXG4gKiBTd2l0Y2hcbiAqL1xudmFyIFN3aXRjaCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFN3aXRjaCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBTd2l0Y2goKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IHN3aXRjaF8xLk1haW4oX3RoaXMpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBTd2l0Y2g7XG59KHdtbF9ydW50aW1lXzEuQ29tcG9uZW50KSk7XG5leHBvcnRzLlN3aXRjaCA9IFN3aXRjaDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVN3aXRjaC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHdtbF9ydW50aW1lXzEgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC1ydW50aW1lXCIpO1xudmFyIFN0eWxlcyA9IHJlcXVpcmUoXCJ3bWwtd2lkZ2V0cy1jb21tb24vU3R5bGVzXCIpO1xudmFyIHV0aWxfMSA9IHJlcXVpcmUoXCJ3bWwtd2lkZ2V0cy1jb21tb24vdXRpbFwiKTtcbnZhciBNYWluID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoTWFpbiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBNYWluKGNvbnRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29udGV4dCkgfHwgdGhpcztcbiAgICAgICAgdmFyIHZpZXcgPSBfdGhpcztcbiAgICAgICAgX3RoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCdsYWJlbCcsIHsgaHRtbDogeyAnY2xhc3MnOiBTdHlsZXMuU1dJVENIIH0sIHdtbDoge30gfSwgW3dtbF9ydW50aW1lXzEubm9kZSgnaW5wdXQnLCB7IGh0bWw6IHsgJ3R5cGUnOiBcImNoZWNrYm94XCIsICduYW1lJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3Om5hbWUnKSwgJ3ZhbHVlJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OnZhbHVlJyksICdvbmNoYW5nZSc6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpvbkNoYW5nZScsIHV0aWxfMS5ub29wKSB9LCB3bWw6IHt9IH0sIFtdLCB2aWV3KSwgd21sX3J1bnRpbWVfMS5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogU3R5bGVzLlNXSVRDSF9TTElERVIgfSwgd21sOiB7fSB9LCBbXSwgdmlldyksIHdtbF9ydW50aW1lXzEuZG9taWZ5KHRoaXMuY2hpbGRyZW4pXSwgdmlldyk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIE1haW47XG59KHdtbF9ydW50aW1lXzEuQXBwVmlldykpO1xuZXhwb3J0cy5NYWluID0gTWFpbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXN3aXRjaC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHByb3BlcnR5X3NlZWtfMSA9IHJlcXVpcmUoXCJwcm9wZXJ0eS1zZWVrXCIpO1xudmFyIHdtbF9ydW50aW1lXzEgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC1ydW50aW1lXCIpO1xudmFyIHRhYmxlXzEgPSByZXF1aXJlKFwiLi93bWwvdGFibGVcIik7XG52YXIgQVNDX0FSUk9XID0gJ1xcdTIxZTcnO1xudmFyIERFU0NfQVJST1cgPSAnXFx1MjFlOSc7XG5leHBvcnRzLmRhdGVTb3J0ID0gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICB2YXIgbmEgPSBuZXcgRGF0ZShhKS5nZXRUaW1lKCk7XG4gICAgdmFyIG5iID0gbmV3IERhdGUoYikuZ2V0VGltZSgpO1xuICAgIHJldHVybiBuYSA+IG5iID8gLTEgOiBuYSA8IG5iID8gMSA6IDA7XG59O1xuZXhwb3J0cy5zdHJpbmdTb3J0ID0gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICB2YXIgbGEgPSBhLnJlcGxhY2UoL1xccysvLCAnJykudG9Mb3dlckNhc2UoKTtcbiAgICB2YXIgbGIgPSBiLnJlcGxhY2UoL1xccysvLCAnJykudG9Mb3dlckNhc2UoKTtcbiAgICByZXR1cm4gKGxhID4gbGIpID8gLTEgOiAobGEgPCBsYikgPyAxIDogMDtcbn07XG5leHBvcnRzLm5hdHVyYWxTb3J0ID0gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAvL1NvdXJjZTogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy80MzQwMjI3L3NvcnQtbWl4ZWQtYWxwaGEtbnVtZXJpYy1hcnJheVxuICAgIHZhciByZUEgPSAvW15hLXpBLVpdL2c7XG4gICAgdmFyIHJlTiA9IC9bXjAtOV0vZztcbiAgICB2YXIgQUludCA9IHBhcnNlSW50KGEsIDEwKTtcbiAgICB2YXIgQkludCA9IHBhcnNlSW50KGIsIDEwKTtcbiAgICBpZiAoaXNOYU4oQUludCkgJiYgaXNOYU4oQkludCkpIHtcbiAgICAgICAgdmFyIGFBID0gYS5yZXBsYWNlKHJlQSwgJycpO1xuICAgICAgICB2YXIgYkEgPSBiLnJlcGxhY2UocmVBLCAnJyk7XG4gICAgICAgIGlmIChhQSA9PT0gYkEpIHtcbiAgICAgICAgICAgIHZhciBhTiA9IHBhcnNlSW50KGEucmVwbGFjZShyZU4sICcnKSwgMTApO1xuICAgICAgICAgICAgdmFyIGJOID0gcGFyc2VJbnQoYi5yZXBsYWNlKHJlTiwgJycpLCAxMCk7XG4gICAgICAgICAgICByZXR1cm4gYU4gPT09IGJOID8gMCA6IGFOID4gYk4gPyAtMSA6IDE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gYUEgPiBiQSA/IC0xIDogMTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChpc05hTihBSW50KSkge1xuICAgICAgICByZXR1cm4gLTE7IC8vdG8gbWFrZSBhbHBoYW51bWVyaWMgc29ydCBmaXJzdCByZXR1cm4gLTEgaGVyZVxuICAgIH1cbiAgICBlbHNlIGlmIChpc05hTihCSW50KSkge1xuICAgICAgICByZXR1cm4gMTsgLy90byBtYWtlIGFscGhhbnVtZXJpYyBzb3J0IGZpcnN0IHJldHVybiAxIGhlcmVcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBBSW50ID4gQkludCA/IC0xIDogMTtcbiAgICB9XG59O1xuZXhwb3J0cy5udW1iZXJTb3J0ID0gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICB2YXIgbmEgPSBwYXJzZUZsb2F0KGEpO1xuICAgIHZhciBuYiA9IHBhcnNlRmxvYXQoYik7XG4gICAgbmEgPSAoaXNOYU4oYSkpID8gLUluZmluaXR5IDogYTtcbiAgICBuYiA9IChpc05hTihiKSkgPyAtSW5maW5pdHkgOiBiO1xuICAgIHJldHVybiAobmEgPiBuYikgPyAtMSA6IChuYSA8IG5iKSA/IDEgOiAwO1xufTtcbnZhciBIZWFkaW5nQ2xpY2tlZEV2ZW50ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBIZWFkaW5nQ2xpY2tlZEV2ZW50KG5hbWUsIGZpZWxkLCB0YWJsZSkge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLmZpZWxkID0gZmllbGQ7XG4gICAgICAgIHRoaXMudGFibGUgPSB0YWJsZTtcbiAgICB9XG4gICAgcmV0dXJuIEhlYWRpbmdDbGlja2VkRXZlbnQ7XG59KCkpO1xuZXhwb3J0cy5IZWFkaW5nQ2xpY2tlZEV2ZW50ID0gSGVhZGluZ0NsaWNrZWRFdmVudDtcbnZhciBSb3dDbGlja2VkRXZlbnQgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFJvd0NsaWNrZWRFdmVudCh2YWx1ZSwgaW5kZXgsIGRhdGEsIHRhYmxlKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5pbmRleCA9IGluZGV4O1xuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgICAgICB0aGlzLnRhYmxlID0gdGFibGU7XG4gICAgfVxuICAgIHJldHVybiBSb3dDbGlja2VkRXZlbnQ7XG59KCkpO1xuZXhwb3J0cy5Sb3dDbGlja2VkRXZlbnQgPSBSb3dDbGlja2VkRXZlbnQ7XG52YXIgUm93U2VsZWN0ZWRFdmVudCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFJvd1NlbGVjdGVkRXZlbnQsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gUm93U2VsZWN0ZWRFdmVudCgpIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgIH1cbiAgICByZXR1cm4gUm93U2VsZWN0ZWRFdmVudDtcbn0oUm93Q2xpY2tlZEV2ZW50KSk7XG5leHBvcnRzLlJvd1NlbGVjdGVkRXZlbnQgPSBSb3dTZWxlY3RlZEV2ZW50O1xudmFyIENlbGxDbGlja2VkRXZlbnQgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENlbGxDbGlja2VkRXZlbnQodmFsdWUsIG5hbWUsIGluZGV4LCByb3csIHRhYmxlKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5pbmRleCA9IGluZGV4O1xuICAgICAgICB0aGlzLnJvdyA9IHJvdztcbiAgICAgICAgdGhpcy50YWJsZSA9IHRhYmxlO1xuICAgIH1cbiAgICByZXR1cm4gQ2VsbENsaWNrZWRFdmVudDtcbn0oKSk7XG5leHBvcnRzLkNlbGxDbGlja2VkRXZlbnQgPSBDZWxsQ2xpY2tlZEV2ZW50O1xudmFyIERlZmF1bHRUYWJsZU1vZGVsID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEZWZhdWx0VGFibGVNb2RlbCgpIHtcbiAgICB9XG4gICAgRGVmYXVsdFRhYmxlTW9kZWwucHJvdG90eXBlLmFsbFNlbGVjdGVkID0gZnVuY3Rpb24gKCkgeyB9O1xuICAgIERlZmF1bHRUYWJsZU1vZGVsLnByb3RvdHlwZS5jZWxsQ2xpY2tlZCA9IGZ1bmN0aW9uIChfZSkgeyB9O1xuICAgIERlZmF1bHRUYWJsZU1vZGVsLnByb3RvdHlwZS5oZWFkaW5nQ2xpY2tlZCA9IGZ1bmN0aW9uIChfZSkgeyB9O1xuICAgIERlZmF1bHRUYWJsZU1vZGVsLnByb3RvdHlwZS5yb3dDbGlja2VkID0gZnVuY3Rpb24gKF9lKSB7IH07XG4gICAgRGVmYXVsdFRhYmxlTW9kZWwucHJvdG90eXBlLnJvd1NlbGVjdGVkID0gZnVuY3Rpb24gKF9lKSB7IH07XG4gICAgcmV0dXJuIERlZmF1bHRUYWJsZU1vZGVsO1xufSgpKTtcbmV4cG9ydHMuRGVmYXVsdFRhYmxlTW9kZWwgPSBEZWZhdWx0VGFibGVNb2RlbDtcbnZhciBTb3J0VGFibGVNb2RlbCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFNvcnRUYWJsZU1vZGVsLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFNvcnRUYWJsZU1vZGVsKCkge1xuICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgfVxuICAgIFNvcnRUYWJsZU1vZGVsLnByb3RvdHlwZS5oZWFkaW5nQ2xpY2tlZCA9IGZ1bmN0aW9uIChlKSB7IGUudGFibGUuc29ydChlLm5hbWUpOyB9O1xuICAgIHJldHVybiBTb3J0VGFibGVNb2RlbDtcbn0oRGVmYXVsdFRhYmxlTW9kZWwpKTtcbmV4cG9ydHMuU29ydFRhYmxlTW9kZWwgPSBTb3J0VGFibGVNb2RlbDtcbnZhciBUYWJsZSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFRhYmxlLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFRhYmxlKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMub3JpZ2luYWxEYXRhID0gX3RoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpkYXRhJywgW10pO1xuICAgICAgICBfdGhpcy5kYXRhID0gX3RoaXMub3JpZ2luYWxEYXRhLnNsaWNlKCk7XG4gICAgICAgIF90aGlzLnNvcnRlZE9uID0gJyc7XG4gICAgICAgIF90aGlzLmFycm93ID0gJyc7XG4gICAgICAgIF90aGlzLnZpZXcgPSBuZXcgdGFibGVfMS5UYWJsZVZpZXcoX3RoaXMpO1xuICAgICAgICBfdGhpcy5tb2RlbCA9IF90aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6bW9kZWwnLCBuZXcgRGVmYXVsdFRhYmxlTW9kZWwoKSk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgVGFibGUucHJvdG90eXBlLnNvcnQgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICB2YXIgZGF0YTtcbiAgICAgICAgdmFyIGJvZHkgPSB0aGlzLnZpZXcuZmluZEJ5SWQoJ2JvZHknKTtcbiAgICAgICAgdmFyIGhlYWQgPSB0aGlzLnZpZXcuZmluZEJ5SWQoJ2hlYWQnKTtcbiAgICAgICAgdmFyIGZpZWxkID0gdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmZpZWxkcycsIFtdKS5yZWR1Y2UoZnVuY3Rpb24gKHAsIGMpIHsgcmV0dXJuIHAgPyBwIDogKGMubmFtZSA9PT0gbmFtZSA/IGMgOiBudWxsKTsgfSk7XG4gICAgICAgIHZhciBzb3J0T247XG4gICAgICAgIHZhciBzdHJhdGVneTtcbiAgICAgICAgaWYgKCFmaWVsZClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRhYmxlI3NvcnQ6IHVua25vd24gZmllbGQgJ1wiICsgbmFtZSArIFwiJ1wiKTtcbiAgICAgICAgc29ydE9uID0gZmllbGQuc29ydE9uIHx8IG5hbWU7XG4gICAgICAgIHN0cmF0ZWd5ID0gZmllbGQuc3RyYXRlZ3kgfHwgZXhwb3J0cy5zdHJpbmdTb3J0O1xuICAgICAgICBpZiAodGhpcy5zb3J0ZWRPbiA9PT0gbmFtZSkge1xuICAgICAgICAgICAgdGhpcy5kYXRhID0gdGhpcy5kYXRhLnJldmVyc2UoKTtcbiAgICAgICAgICAgIHRoaXMuYXJyb3cgPSAodGhpcy5hcnJvdyA9PT0gQVNDX0FSUk9XKSA/IERFU0NfQVJST1cgOiBBU0NfQVJST1c7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmFycm93ID0gREVTQ19BUlJPVztcbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IHRoaXNcbiAgICAgICAgICAgICAgICAub3JpZ2luYWxEYXRhXG4gICAgICAgICAgICAgICAgLnNsaWNlKClcbiAgICAgICAgICAgICAgICAuc29ydChmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gc3RyYXRlZ3kocHJvcGVydHlfc2Vla18xLmRlZmF1bHQoc29ydE9uLCBhKSwgcHJvcGVydHlfc2Vla18xLmRlZmF1bHQoc29ydE9uLCBiKSk7IH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc29ydGVkT24gPSBuYW1lO1xuICAgICAgICB0aGlzLnZpZXcuaW52YWxpZGF0ZSgpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogdXBkYXRlIHRoZSBkYXRhIHRoZSB0YWJsZSBkaXNwbGF5c1xuICAgICAqL1xuICAgIFRhYmxlLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICB0aGlzLm9yaWdpbmFsRGF0YSA9IGRhdGEuc2xpY2UoKTtcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YS5zbGljZSgpO1xuICAgICAgICAodGhpcy5zb3J0ZWRPbiA9PT0gJycpID8gdGhpcy52aWV3LmludmFsaWRhdGUoKSA6IHRoaXMuc29ydCh0aGlzLnNvcnRlZE9uKTtcbiAgICB9O1xuICAgIHJldHVybiBUYWJsZTtcbn0od21sX3J1bnRpbWVfMS5Db21wb25lbnQpKTtcbmV4cG9ydHMuVGFibGUgPSBUYWJsZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVRhYmxlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgd21sX3J1bnRpbWVfMSA9IHJlcXVpcmUoXCJAcXVlbmsvd21sLXJ1bnRpbWVcIik7XG52YXIgcHJvcGVydHlfc2Vla18xID0gcmVxdWlyZShcInByb3BlcnR5LXNlZWtcIik7XG52YXIgU3R5bGVzID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi9TdHlsZXNcIik7XG52YXIgVGFibGVfMSA9IHJlcXVpcmUoXCIuLi9UYWJsZVwiKTtcbnZhciBfMSA9IHJlcXVpcmUoXCIuLi8uLi9cIik7XG5mdW5jdGlvbiB0aGVhZCh2aWV3LCBmaWVsZHMpIHsgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgndHInLCB7IGh0bWw6IHt9LCB3bWw6IHt9IH0sIFt3bWxfcnVudGltZV8xLmlmRSh0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6c2VsZWN0YWJsZScpLCBmdW5jdGlvbiBpZjQoKSB7IHJldHVybiB3bWxfcnVudGltZV8xLm5vZGUoJ3RoJywgeyBodG1sOiB7fSwgd21sOiB7fSB9LCBbd21sX3J1bnRpbWVfMS5ub2RlKCdpbnB1dCcsIHsgaHRtbDogeyAndHlwZSc6IFwiY2hlY2tib3hcIiwgJ29uY2xpY2snOiBmdW5jdGlvbiBmdW5jdGlvbl9saXRlcmFsXzEoKSB7IHJldHVybiB0aGlzLm1vZGVsLmFsbFJvd3NTZWxlY3RlZCgpOyB9LmJpbmQodGhpcykgfSwgd21sOiB7fSB9LCBbXSwgdmlldyldLCB2aWV3KTsgfS5iaW5kKHRoaXMpLCB3bWxfcnVudGltZV8xLmVtcHR5KSwgd21sX3J1bnRpbWVfMS5mb3JFKGZpZWxkcywgZnVuY3Rpb24gZm9yMihmaWVsZCkgeyByZXR1cm4gd21sX3J1bnRpbWVfMS5pZkUoIWZpZWxkLmhpZGRlbiwgZnVuY3Rpb24gaWY1KCkgeyByZXR1cm4gd21sX3J1bnRpbWVfMS5pZkUoZmllbGQuc29ydEFzLCBmdW5jdGlvbiBpZjYoKSB7IHJldHVybiB3bWxfcnVudGltZV8xLm5vZGUoJ3RoJywgeyBodG1sOiB7ICdjbGFzcyc6IFt0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6aGVhZGluZ0NsYXNzJyksICh0aGlzLnNvcnRlZE9uID09PSBmaWVsZC5uYW1lKSA/IFN0eWxlcy5BQ1RJVkUgOiAnJ10uam9pbignICcpLCAnb25jbGljayc6IGZ1bmN0aW9uIGZ1bmN0aW9uX2xpdGVyYWxfMigpIHsgcmV0dXJuIHRoaXMubW9kZWwuaGVhZGluZ0NsaWNrZWQobmV3IFRhYmxlXzEuSGVhZGluZ0NsaWNrZWRFdmVudChmaWVsZC5uYW1lLCBmaWVsZCwgdGhpcykpOyB9LmJpbmQodGhpcykgfSwgd21sOiB7fSB9LCBbd21sX3J1bnRpbWVfMS5kb21pZnkoZmllbGQuaGVhZGluZyksIHdtbF9ydW50aW1lXzEuaWZFKHRoaXMuc29ydGVkT24gPT09IGZpZWxkLm5hbWUsIGZ1bmN0aW9uIGlmNygpIHsgcmV0dXJuIHdtbF9ydW50aW1lXzEuZG9taWZ5KHRoaXMuYXJyb3cpOyB9LmJpbmQodGhpcyksIHdtbF9ydW50aW1lXzEuZW1wdHkpXSwgdmlldyk7IH0uYmluZCh0aGlzKSwgZnVuY3Rpb24gZWxzZV9jbGF1c2U0KCkgeyByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCd0aCcsIHsgaHRtbDogeyAnY2xhc3MnOiBbdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmhlYWRpbmdDbGFzcycpLCAodGhpcy5zb3J0ZWRPbiA9PT0gZmllbGQubmFtZSkgPyBTdHlsZXMuQUNUSVZFIDogJyddLmpvaW4oJyAnKSwgJ29uY2xpY2snOiBmdW5jdGlvbiBmdW5jdGlvbl9saXRlcmFsXzMoKSB7IHJldHVybiB0aGlzLm1vZGVsLmhlYWRpbmdDbGlja2VkKG5ldyBUYWJsZV8xLkhlYWRpbmdDbGlja2VkRXZlbnQoZmllbGQubmFtZSwgZmllbGQsIHRoaXMpKTsgfS5iaW5kKHRoaXMpIH0sIHdtbDoge30gfSwgW3dtbF9ydW50aW1lXzEuZG9taWZ5KGZpZWxkLmhlYWRpbmcpLCB3bWxfcnVudGltZV8xLmlmRSh0aGlzLnNvcnRlZE9uID09PSBmaWVsZC5uYW1lLCBmdW5jdGlvbiBpZjgoKSB7IHJldHVybiB3bWxfcnVudGltZV8xLmRvbWlmeSh0aGlzLmFycm93KTsgfS5iaW5kKHRoaXMpLCB3bWxfcnVudGltZV8xLmVtcHR5KV0sIHZpZXcpOyB9LmJpbmQodGhpcykpOyB9LmJpbmQodGhpcyksIHdtbF9ydW50aW1lXzEuZW1wdHkpOyB9LmJpbmQodGhpcyksIGZ1bmN0aW9uIGZvcl9vdGhlcndpc2UyKCkgeyByZXR1cm4gd21sX3J1bnRpbWVfMS5lbXB0eSgpOyB9LmJpbmQodGhpcykpXSwgdmlldyk7IH1cbmV4cG9ydHMudGhlYWQgPSB0aGVhZDtcbmZ1bmN0aW9uIHRib2R5KHZpZXcsIGRhdGEsIGZpZWxkcykgeyByZXR1cm4gd21sX3J1bnRpbWVfMS53aWRnZXQoXzEuRnJhZ21lbnQsIHsgaHRtbDoge30sIHdtbDoge30gfSwgW3dtbF9ydW50aW1lXzEuZm9yRShkYXRhLCBmdW5jdGlvbiBmb3IzKHJvdywgaW5kZXgpIHsgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgndHInLCB7IGh0bWw6IHsgJ2NsYXNzJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OnJvd0NsYXNzJyksICdvbmNsaWNrJzogZnVuY3Rpb24gZnVuY3Rpb25fbGl0ZXJhbF80KCkgeyByZXR1cm4gdGhpcy5tb2RlbC5yb3dDbGlja2VkKG5ldyBUYWJsZV8xLlJvd0NsaWNrZWRFdmVudChyb3csIGluZGV4LCBkYXRhLCB0aGlzKSk7IH0uYmluZCh0aGlzKSB9LCB3bWw6IHt9IH0sIFt3bWxfcnVudGltZV8xLmlmRSh0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6c2VsZWN0YWJsZScpLCBmdW5jdGlvbiBpZjkoKSB7IHJldHVybiB3bWxfcnVudGltZV8xLm5vZGUoJ3RkJywgeyBodG1sOiB7fSwgd21sOiB7fSB9LCBbd21sX3J1bnRpbWVfMS5ub2RlKCdpbnB1dCcsIHsgaHRtbDogeyAndHlwZSc6IFwiY2hlY2tib3hcIiwgJ29uY2xpY2snOiBmdW5jdGlvbiBmdW5jdGlvbl9saXRlcmFsXzUoKSB7IHJldHVybiB0aGlzLm1vZGVsLnJvd1NlbGVjdGVkKG5ldyBUYWJsZV8xLlJvd1NlbGVjdGVkRXZlbnQocm93LCBpbmRleCwgZGF0YSwgdGhpcykpOyB9LmJpbmQodGhpcykgfSwgd21sOiB7fSB9LCBbXSwgdmlldyldLCB2aWV3KTsgfS5iaW5kKHRoaXMpLCB3bWxfcnVudGltZV8xLmVtcHR5KSwgd21sX3J1bnRpbWVfMS5mb3JFKGZpZWxkcywgZnVuY3Rpb24gZm9yNChmaWVsZCkgeyByZXR1cm4gd21sX3J1bnRpbWVfMS5pZkUoIWZpZWxkLmhpZGRlbiwgZnVuY3Rpb24gaWYxMCgpIHsgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgndGQnLCB7IGh0bWw6IHsgJ2NsYXNzJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmNlbGxDbGFzcycpLCAnb25jbGljayc6IGZ1bmN0aW9uIGZ1bmN0aW9uX2xpdGVyYWxfNigpIHsgcmV0dXJuIHRoaXMubW9kZWwuY2VsbENsaWNrZWQobmV3IFRhYmxlXzEuQ2VsbENsaWNrZWRFdmVudChwcm9wZXJ0eV9zZWVrXzEuZ2V0KGZpZWxkLm5hbWUsIHJvdyksIGZpZWxkLm5hbWUsIGluZGV4LCByb3csIHRoaXMpKTsgfS5iaW5kKHRoaXMpIH0sIHdtbDoge30gfSwgW3dtbF9ydW50aW1lXzEuaWZFKGZpZWxkLmZyYWdtZW50LCBmdW5jdGlvbiBpZjExKCkgeyByZXR1cm4gZmllbGQuZnJhZ21lbnQuY2FsbCh0aGlzLCB2aWV3LCBwcm9wZXJ0eV9zZWVrXzEuZ2V0KGZpZWxkLm5hbWUsIHJvdyksIGZpZWxkLm5hbWUsIHJvdywgZmllbGQpOyB9LmJpbmQodGhpcyksIGZ1bmN0aW9uIGVsc2VfY2xhdXNlNSgpIHsgcmV0dXJuIHdtbF9ydW50aW1lXzEuZG9taWZ5KHByb3BlcnR5X3NlZWtfMS5nZXQoZmllbGQubmFtZSwgcm93KSk7IH0uYmluZCh0aGlzKSldLCB2aWV3KTsgfS5iaW5kKHRoaXMpLCB3bWxfcnVudGltZV8xLmVtcHR5KTsgfS5iaW5kKHRoaXMpLCBmdW5jdGlvbiBmb3Jfb3RoZXJ3aXNlNCgpIHsgcmV0dXJuIHdtbF9ydW50aW1lXzEuZW1wdHkoKTsgfS5iaW5kKHRoaXMpKV0sIHZpZXcpOyB9LmJpbmQodGhpcyksIGZ1bmN0aW9uIGZvcl9vdGhlcndpc2U0KCkgeyByZXR1cm4gd21sX3J1bnRpbWVfMS5lbXB0eSgpOyB9LmJpbmQodGhpcykpXSwgdmlldyk7IH1cbmV4cG9ydHMudGJvZHkgPSB0Ym9keTtcbmZ1bmN0aW9uIHRhYmxlKHZpZXcpIHsgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgndGFibGUnLCB7IGh0bWw6IHsgJ2NsYXNzJzogW1N0eWxlcy5UQUJMRSwgdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmNsYXNzJywgJycpXS5qb2luKCcgJykgfSwgd21sOiB7ICdpZCc6IFwicm9vdFwiIH0gfSwgW3dtbF9ydW50aW1lXzEubm9kZSgndGhlYWQnLCB7IGh0bWw6IHt9LCB3bWw6IHsgJ2lkJzogXCJoZWFkXCIgfSB9LCBbdGhlYWQuY2FsbCh0aGlzLCB2aWV3LCB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6ZmllbGRzJykpXSwgdmlldyksIHdtbF9ydW50aW1lXzEubm9kZSgndGJvZHknLCB7IGh0bWw6IHt9LCB3bWw6IHsgJ2lkJzogXCJib2R5XCIgfSB9LCBbdGJvZHkuY2FsbCh0aGlzLCB2aWV3LCB0aGlzLmRhdGEsIHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpmaWVsZHMnKSldLCB2aWV3KV0sIHZpZXcpOyB9XG5leHBvcnRzLnRhYmxlID0gdGFibGU7XG52YXIgVGFibGVWaWV3ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoVGFibGVWaWV3LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFRhYmxlVmlldyhjb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbnRleHQpIHx8IHRoaXM7XG4gICAgICAgIHZhciB2aWV3ID0gX3RoaXM7XG4gICAgICAgIF90aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHdtbF9ydW50aW1lXzEud2lkZ2V0KF8xLkZyYWdtZW50LCB7IGh0bWw6IHt9LCB3bWw6IHt9IH0sIFt3bWxfcnVudGltZV8xLmlmRSh0aGlzLmRhdGEubGVuZ3RoID09PSAwLCBmdW5jdGlvbiBpZjEyKCkgeyByZXR1cm4gd21sX3J1bnRpbWVfMS5pZkUodGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ2VtcHR5TWFjcm8nKSwgZnVuY3Rpb24gaWYxMygpIHsgcmV0dXJuIHRoaXMuYXR0cmlidXRlcy5yZWFkLmNhbGwodGhpcywgdmlldywgJ2VtcHR5TWFjcm8nKTsgfS5iaW5kKHRoaXMpLCBmdW5jdGlvbiBlbHNlX2NsYXVzZTYoKSB7IHJldHVybiB0YWJsZS5jYWxsKHRoaXMsIHZpZXcpOyB9LmJpbmQodGhpcykpOyB9LmJpbmQodGhpcyksIGZ1bmN0aW9uIGVsc2VfY2xhdXNlNygpIHsgcmV0dXJuIHRhYmxlLmNhbGwodGhpcywgdmlldyk7IH0uYmluZCh0aGlzKSldLCB2aWV3KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gVGFibGVWaWV3O1xufSh3bWxfcnVudGltZV8xLkFwcFZpZXcpKTtcbmV4cG9ydHMuVGFibGVWaWV3ID0gVGFibGVWaWV3O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGFibGUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB3bWxfcnVudGltZV8xID0gcmVxdWlyZShcIkBxdWVuay93bWwtcnVudGltZVwiKTtcbnZhciBTdHlsZXMgPSByZXF1aXJlKFwid21sLXdpZGdldHMtY29tbW9uL1N0eWxlc1wiKTtcbnZhciB1dGlsXzEgPSByZXF1aXJlKFwid21sLXdpZGdldHMtY29tbW9uL3V0aWxcIik7XG52YXIgdGFic18xID0gcmVxdWlyZShcIi4vd21sL3RhYnNcIik7XG4vKipcbiAqIFRhYlxuICovXG52YXIgVGFiID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoVGFiLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFRhYigpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnZpZXcgPSBuZXcgdGFic18xLlRhYlZpZXcoX3RoaXMpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIGNsaWNrIHRoaXMgVGFiXG4gICAgICovXG4gICAgVGFiLnByb3RvdHlwZS5jbGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy52aWV3Lmlkcy5saW5rLmNsaWNrKCk7XG4gICAgfTtcbiAgICBUYWIucHJvdG90eXBlLmNsaWNrZWQgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHZhciBwYXJlbnQgPSB0aGlzLnZpZXcuaWRzLnJvb3QucGFyZW50Tm9kZTtcbiAgICAgICAgdmFyIHVzID0gcGFyZW50LmNoaWxkcmVuO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHVzLmxlbmd0aDsgaSsrKVxuICAgICAgICAgICAgdXNbaV0uY2xhc3NMaXN0LnJlbW92ZShTdHlsZXMuQUNUSVZFKTtcbiAgICAgICAgdGhpcy52aWV3Lmlkcy5yb290LmNsYXNzTGlzdC5hZGQoU3R5bGVzLkFDVElWRSk7XG4gICAgICAgIHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpvbkNsaWNrJywgdXRpbF8xLm5vb3ApKHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpuYW1lJykpO1xuICAgIH07XG4gICAgcmV0dXJuIFRhYjtcbn0od21sX3J1bnRpbWVfMS5Db21wb25lbnQpKTtcbmV4cG9ydHMuVGFiID0gVGFiO1xuLyoqXG4gKiBUYWJzXG4gKi9cbnZhciBUYWJzID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoVGFicywgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBUYWJzKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMudmlldyA9IG5ldyB0YWJzXzEuVGFic1ZpZXcoX3RoaXMpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBUYWJzO1xufSh3bWxfcnVudGltZV8xLkNvbXBvbmVudCkpO1xuZXhwb3J0cy5UYWJzID0gVGFicztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVRhYnMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB3bWxfcnVudGltZV8xID0gcmVxdWlyZShcIkBxdWVuay93bWwtcnVudGltZVwiKTtcbnZhciBTdHlsZXMgPSByZXF1aXJlKFwid21sLXdpZGdldHMtY29tbW9uL1N0eWxlc1wiKTtcbnZhciBUYWJWaWV3ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoVGFiVmlldywgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBUYWJWaWV3KGNvbnRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29udGV4dCkgfHwgdGhpcztcbiAgICAgICAgdmFyIHZpZXcgPSBfdGhpcztcbiAgICAgICAgX3RoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCdsaScsIHsgaHRtbDogeyAncm9sZSc6IFwicHJlc2VudGF0aW9uXCIsICdjbGFzcyc6ICh0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6YWN0aXZlJykpID8gU3R5bGVzLkFDVElWRSA6IG51bGwgfSwgd21sOiB7ICdpZCc6IFwicm9vdFwiIH0gfSwgW3dtbF9ydW50aW1lXzEubm9kZSgnYScsIHsgaHRtbDogeyAnaHJlZic6IFwiI1wiLCAnb25jbGljayc6IHRoaXMuY2xpY2tlZC5iaW5kKHRoaXMpIH0sIHdtbDogeyAnaWQnOiBcImxpbmtcIiB9IH0sIFt3bWxfcnVudGltZV8xLmlmRSh0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6dGV4dCcpLCBmdW5jdGlvbiBpZjE0KCkgeyByZXR1cm4gd21sX3J1bnRpbWVfMS5kb21pZnkodGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OnRleHQnKSk7IH0uYmluZCh0aGlzKSwgZnVuY3Rpb24gZWxzZV9jbGF1c2U4KCkgeyByZXR1cm4gd21sX3J1bnRpbWVfMS5kb21pZnkodGhpcy5jaGlsZHJlbik7IH0uYmluZCh0aGlzKSldLCB2aWV3KV0sIHZpZXcpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBUYWJWaWV3O1xufSh3bWxfcnVudGltZV8xLkFwcFZpZXcpKTtcbmV4cG9ydHMuVGFiVmlldyA9IFRhYlZpZXc7XG52YXIgVGFic1ZpZXcgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhUYWJzVmlldywgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBUYWJzVmlldyhjb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbnRleHQpIHx8IHRoaXM7XG4gICAgICAgIHZhciB2aWV3ID0gX3RoaXM7XG4gICAgICAgIF90aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgndWwnLCB7IGh0bWw6IHsgJ2NsYXNzJzogU3R5bGVzLlRBQlMgfSwgd21sOiB7fSB9LCBbd21sX3J1bnRpbWVfMS5kb21pZnkodGhpcy5jaGlsZHJlbildLCB2aWV3KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gVGFic1ZpZXc7XG59KHdtbF9ydW50aW1lXzEuQXBwVmlldykpO1xuZXhwb3J0cy5UYWJzVmlldyA9IFRhYnNWaWV3O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGFicy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHdtbF9ydW50aW1lXzEgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC1ydW50aW1lXCIpO1xudmFyIHRyZWVfbmF2XzEgPSByZXF1aXJlKFwiLi93bWwvdHJlZS1uYXZcIik7XG52YXIgU3R5bGVzID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi9TdHlsZXNcIik7XG4vKipcbiAqIFRyZWVOYXZJdGVtIGlzIHVzZWQgdG8gaW5kaWNhdGUgYW4gaXRlbSBpbiB0aGUgdHJlZS5cbiAqL1xudmFyIFRyZWVOYXZJdGVtID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoVHJlZU5hdkl0ZW0sIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gVHJlZU5hdkl0ZW0oKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IHRyZWVfbmF2XzEuVHJlZU5hdkl0ZW1WaWV3KF90aGlzKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBhY3RpdmF0ZSB0aGlzIFRyZWVJdGVtXG4gICAgICovXG4gICAgVHJlZU5hdkl0ZW0ucHJvdG90eXBlLmFjdGl2YXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYSA9IHRoaXMudmlldy5pZHMubGluaztcbiAgICAgICAgaWYgKGEgaW5zdGFuY2VvZiBIVE1MRWxlbWVudClcbiAgICAgICAgICAgIGlmIChhLnBhcmVudE5vZGUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHZhciBjaGlsZHJlbiA9IGEucGFyZW50Tm9kZS5jaGlsZHJlbjtcbiAgICAgICAgICAgICAgICBhLmNsYXNzTGlzdC5yZW1vdmUoU3R5bGVzLkFDVElWRSk7XG4gICAgICAgICAgICAgICAgYS5jbGFzc0xpc3QuYWRkKFN0eWxlcy5BQ1RJVkUpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGlsZHJlbltpXS5ub2RlTmFtZSA9PT0gJ0EnKVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoaWxkcmVuW2ldICE9PSBhKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuW2ldLmNsYXNzTGlzdC5yZW1vdmUoU3R5bGVzLkFDVElWRSk7XG4gICAgICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBkZWFjdGl2YXRlIHRoaXMgRHJhd2VyTGlua1xuICAgICAqL1xuICAgIFRyZWVOYXZJdGVtLnByb3RvdHlwZS5kZWFjdGl2YXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnZpZXcuZmluZEJ5SWQoJ2EnKS5jbGFzc0xpc3QucmVtb3ZlKFN0eWxlcy5BQ1RJVkUpO1xuICAgIH07XG4gICAgcmV0dXJuIFRyZWVOYXZJdGVtO1xufSh3bWxfcnVudGltZV8xLkNvbXBvbmVudCkpO1xuZXhwb3J0cy5UcmVlTmF2SXRlbSA9IFRyZWVOYXZJdGVtO1xuLyoqXG4gKiBUcmVlTmF2IHByb3ZpZGVzIGFuIGFwaSBmb3IgZGlzcGxheWluZyBhIHRyZWUgb2YgbGlua3MuXG4gKi9cbnZhciBUcmVlTmF2ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoVHJlZU5hdiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBUcmVlTmF2KCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMudmlldyA9IG5ldyB0cmVlX25hdl8xLlRyZWVOYXZWaWV3KF90aGlzKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBUcmVlTmF2LnByb3RvdHlwZS5oYW5kbGVFdmVudCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoYykge1xuICAgICAgICAgICAgaWYgKGMgaW5zdGFuY2VvZiBIVE1MRWxlbWVudClcbiAgICAgICAgICAgICAgICBpZiAoYyAhPT0gZS50YXJnZXQpXG4gICAgICAgICAgICAgICAgICAgIGMuY2xhc3NMaXN0LnJlbW92ZShTdHlsZXMuQUNUSVZFKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBUcmVlTmF2LnByb3RvdHlwZS5yZW5kZXJlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChjKSB7IHJldHVybiBjLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX3RoaXMpOyB9KTtcbiAgICB9O1xuICAgIHJldHVybiBUcmVlTmF2O1xufSh3bWxfcnVudGltZV8xLkNvbXBvbmVudCkpO1xuZXhwb3J0cy5UcmVlTmF2ID0gVHJlZU5hdjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVRyZWVOYXYuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB3bWxfcnVudGltZV8xID0gcmVxdWlyZShcIkBxdWVuay93bWwtcnVudGltZVwiKTtcbnZhciBTdHlsZXMgPSByZXF1aXJlKFwid21sLXdpZGdldHMtY29tbW9uL1N0eWxlc1wiKTtcbnZhciB1dGlsXzEgPSByZXF1aXJlKFwid21sLXdpZGdldHMtY29tbW9uL3V0aWxcIik7XG52YXIgVHJlZU5hdkl0ZW1WaWV3ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoVHJlZU5hdkl0ZW1WaWV3LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFRyZWVOYXZJdGVtVmlldyhjb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbnRleHQpIHx8IHRoaXM7XG4gICAgICAgIHZhciB2aWV3ID0gX3RoaXM7XG4gICAgICAgIF90aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgnbGknLCB7IGh0bWw6IHsgJ2NsYXNzJzogU3R5bGVzLlRSRUVfTkFWX0xJU1RfSVRFTSB9LCB3bWw6IHt9IH0sIFt3bWxfcnVudGltZV8xLm5vZGUoJ2EnLCB7IGh0bWw6IHsgJ2NsYXNzJzogKHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzphY3RpdmUnLCBmYWxzZSkpID8gU3R5bGVzLkFDVElWRSA6ICcnLCAnaHJlZic6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpocmVmJywgJyMnKSwgJ29uY2xpY2snOiBmdW5jdGlvbiBmdW5jdGlvbl9saXRlcmFsXzcoKSB7IHJldHVybiB0aGlzLmFjdGl2YXRlKCkgfHwgdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3Om9uQ2xpY2snLCB1dGlsXzEubm9vcCkodGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3Om5hbWUnKSk7IH0uYmluZCh0aGlzKSB9LCB3bWw6IHsgJ2lkJzogXCJsaW5rXCIgfSB9LCBbd21sX3J1bnRpbWVfMS5kb21pZnkodGhpcy5jaGlsZHJlbildLCB2aWV3KV0sIHZpZXcpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBUcmVlTmF2SXRlbVZpZXc7XG59KHdtbF9ydW50aW1lXzEuQXBwVmlldykpO1xuZXhwb3J0cy5UcmVlTmF2SXRlbVZpZXcgPSBUcmVlTmF2SXRlbVZpZXc7XG52YXIgVHJlZU5hdlZpZXcgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhUcmVlTmF2VmlldywgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBUcmVlTmF2Vmlldyhjb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbnRleHQpIHx8IHRoaXM7XG4gICAgICAgIHZhciB2aWV3ID0gX3RoaXM7XG4gICAgICAgIF90aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgnbmF2JywgeyBodG1sOiB7ICdjbGFzcyc6IFN0eWxlcy5UUkVFX05BViB9LCB3bWw6IHsgJ2lkJzogXCJuYXZcIiB9IH0sIFt3bWxfcnVudGltZV8xLm5vZGUoJ3VsJywgeyBodG1sOiB7ICdjbGFzcyc6IFN0eWxlcy5UUkVFX05BVl9MSVNUIH0sIHdtbDogeyAnaWQnOiBcImxpc3RcIiB9IH0sIFt3bWxfcnVudGltZV8xLmRvbWlmeSh0aGlzLmNoaWxkcmVuKV0sIHZpZXcpXSwgdmlldyk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIFRyZWVOYXZWaWV3O1xufSh3bWxfcnVudGltZV8xLkFwcFZpZXcpKTtcbmV4cG9ydHMuVHJlZU5hdlZpZXcgPSBUcmVlTmF2Vmlldztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRyZWUtbmF2LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZnVuY3Rpb24gYm91bmRhcnlfdG9fZG90KHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlLnNwbGl0KCddWycpLmpvaW4oJy4nKS5zcGxpdCgnWycpLmpvaW4oJy4nKTtcbn1cbmZ1bmN0aW9uIHN0cmlwX2JyYWNlcyh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZS5zcGxpdCgnWycpLmpvaW4oJy4nKS5zcGxpdCgnXScpLmpvaW4oJycpO1xufVxuZnVuY3Rpb24gZXNjYXBlX2RvdHModmFsdWUpIHtcbiAgICB2YXIgdmFsID0gdmFsdWUuc3BsaXQoJ1xcJycpO1xuICAgIHJldHVybiAodmFsLmxlbmd0aCA8IDMpID8gdmFsLmpvaW4oJ1xcJycpIDogdmFsLm1hcChmdW5jdGlvbiAoc2VnKSB7XG4gICAgICAgIGlmIChzZWcubGVuZ3RoIDwgMylcbiAgICAgICAgICAgIHJldHVybiBzZWc7XG4gICAgICAgIGlmICgoc2VnWzBdID09PSAnLicpIHx8IChzZWdbc2VnLmxlbmd0aCAtIDFdID09PSAnLicpKVxuICAgICAgICAgICAgcmV0dXJuIHNlZztcbiAgICAgICAgcmV0dXJuIHNlZy5zcGxpdCgnLicpLmpvaW4oJyYmJyk7XG4gICAgfSkuam9pbignJyk7XG59XG5mdW5jdGlvbiB1bmVzY2FwZV9kb3RzKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlLnNwbGl0KCcmJicpLmpvaW4oJy4nKTtcbn1cbmZ1bmN0aW9uIHBhcnRpZnkodmFsdWUpIHtcbiAgICBpZiAoIXZhbHVlKVxuICAgICAgICByZXR1cm47XG4gICAgcmV0dXJuIGVzY2FwZV9kb3RzKHN0cmlwX2JyYWNlcyhib3VuZGFyeV90b19kb3QoJycgKyB2YWx1ZSkpKS5zcGxpdCgnLicpO1xufVxuZnVuY3Rpb24gY2FuQ2xvbmUobykge1xuICAgIHJldHVybiAodHlwZW9mIG8uX19DTE9ORV9fID09PSAnZnVuY3Rpb24nKTtcbn1cbmZ1bmN0aW9uIGNsb25lKG8pIHtcbiAgICBpZiAoKHR5cGVvZiBvICE9PSAnb2JqZWN0JykgfHwgKG8gPT09IG51bGwpKVxuICAgICAgICByZXR1cm4gbztcbiAgICBpZiAoQXJyYXkuaXNBcnJheShvKSlcbiAgICAgICAgcmV0dXJuIG8ubWFwKGNsb25lKTtcbiAgICByZXR1cm4gKGNhbkNsb25lKG8pKSA/XG4gICAgICAgIG8uX19DTE9ORV9fKGNsb25lKSA6IChvLmNvbnN0cnVjdG9yICE9PSBPYmplY3QpID8gbyA6XG4gICAgICAgIE9iamVjdC5rZXlzKG8pLnJlZHVjZShmdW5jdGlvbiAocHJlLCBrKSB7XG4gICAgICAgICAgICBwcmVba10gPSAodHlwZW9mIG9ba10gPT09ICdvYmplY3QnKSA/XG4gICAgICAgICAgICAgICAgY2xvbmUob1trXSkgOiBvW2tdO1xuICAgICAgICAgICAgcmV0dXJuIHByZTtcbiAgICAgICAgfSwge30pO1xufVxuZnVuY3Rpb24gZ2V0KHBhdGgsIG8pIHtcbiAgICB2YXIgcGFydHMgPSBwYXJ0aWZ5KHBhdGgpO1xuICAgIHZhciBmaXJzdDtcbiAgICBpZiAodHlwZW9mIG8gPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGlmIChwYXJ0cy5sZW5ndGggPT09IDEpXG4gICAgICAgICAgICByZXR1cm4gb1t1bmVzY2FwZV9kb3RzKHBhcnRzWzBdKV07XG4gICAgICAgIGlmIChwYXJ0cy5sZW5ndGggPT09IDApXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGZpcnN0ID0gb1twYXJ0cy5zaGlmdCgpXTtcbiAgICAgICAgcmV0dXJuICgodHlwZW9mIG8gPT09ICdvYmplY3QnKSAmJiAobyAhPT0gbnVsbCkpID9cbiAgICAgICAgICAgIHBhcnRzLnJlZHVjZShmdW5jdGlvbiAodGFyZ2V0LCBwcm9wKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldCA9PSBudWxsKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXRbdW5lc2NhcGVfZG90cyhwcm9wKV07XG4gICAgICAgICAgICB9LCBmaXJzdCkgOiBudWxsO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZ2V0KCk6IGV4cGVjdHMgYW4gb2JqZWN0IGdvdCAnICsgdHlwZW9mIG8pO1xuICAgIH1cbn1cbmV4cG9ydHMuZ2V0ID0gZ2V0O1xuO1xuZnVuY3Rpb24gc2V0KHBhdGgsIHZhbHVlLCBvYmopIHtcbiAgICB2YXIgcGFydHMgPSBwYXJ0aWZ5KHBhdGgpO1xuICAgIGlmICgodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHx8IChvYmogPT0gbnVsbCkpIHtcbiAgICAgICAgcmV0dXJuIGNsb25lKG9iaik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gX3NldChvYmosIHZhbHVlLCBwYXJ0cyk7XG4gICAgfVxufVxuZXhwb3J0cy5zZXQgPSBzZXQ7XG47XG5mdW5jdGlvbiBfc2V0KG9iaiwgdmFsdWUsIHBhcnRzKSB7XG4gICAgdmFyIG87XG4gICAgdmFyIGs7XG4gICAgaWYgKHBhcnRzLmxlbmd0aCA9PT0gMClcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIG8gPSAoKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB8fCAob2JqID09PSBudWxsKSkgPyB7fSA6IGNsb25lKG9iaik7XG4gICAgayA9IHVuZXNjYXBlX2RvdHMocGFydHNbMF0pO1xuICAgIG9ba10gPSBfc2V0KG9ba10sIHZhbHVlLCBwYXJ0cy5zbGljZSgxKSk7XG4gICAgcmV0dXJuIG87XG59XG5mdW5jdGlvbiBkZWZhdWx0XzEoaywgdiwgbykge1xuICAgIGlmIChvID09IG51bGwpXG4gICAgICAgIHJldHVybiBnZXQoaywgdik7XG4gICAgZWxzZVxuICAgICAgICByZXR1cm4gc2V0KGssIHYsIG8pO1xufVxuZXhwb3J0cy5kZWZhdWx0ID0gZGVmYXVsdF8xO1xuO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgU3R5bGVzID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi9TdHlsZXNcIik7XG52YXIgdmlld18xID0gcmVxdWlyZShcIi4vdmlld1wiKTtcbnZhciBUYWJsZV8xID0gcmVxdWlyZShcIkBxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50cy90YWJsZS9UYWJsZVwiKTtcbnZhciBjb3VudCA9IDA7XG47XG52YXIgTmV4dCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTmV4dChuYW1lLCBhbW91bnQsIHN0YXR1cywgd2F0Y2hlcnMpIHtcbiAgICAgICAgaWYgKG5hbWUgPT09IHZvaWQgMCkgeyBuYW1lID0gJyc7IH1cbiAgICAgICAgaWYgKGFtb3VudCA9PT0gdm9pZCAwKSB7IGFtb3VudCA9IDA7IH1cbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gdm9pZCAwKSB7IHN0YXR1cyA9ICcnOyB9XG4gICAgICAgIGlmICh3YXRjaGVycyA9PT0gdm9pZCAwKSB7IHdhdGNoZXJzID0gW107IH1cbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5hbW91bnQgPSBhbW91bnQ7XG4gICAgICAgIHRoaXMuc3RhdHVzID0gc3RhdHVzO1xuICAgICAgICB0aGlzLndhdGNoZXJzID0gd2F0Y2hlcnM7XG4gICAgfVxuICAgIHJldHVybiBOZXh0O1xufSgpKTtcbmV4cG9ydHMuTmV4dCA9IE5leHQ7XG52YXIgZmllbGRzID0gW1xuICAgIHsgbmFtZTogJ251bWJlcicsIGhlYWRpbmc6ICdOdW1iZXInIH0sXG4gICAgeyBuYW1lOiAnbmFtZScsIGhlYWRpbmc6ICdOYW1lJyB9LFxuICAgIHsgbmFtZTogJ2Ftb3VudCcsIGhlYWRpbmc6ICdBbW91bnQnIH0sXG4gICAgeyBuYW1lOiAnc3RhdHVzJywgaGVhZGluZzogJ1N0YXR1cycgfSxcbiAgICB7IG5hbWU6ICd3YXRjaGluZycsIGhlYWRpbmc6ICdXYXRjaGluZycgfVxuXTtcbnZhciBBcHBsaWNhdGlvbiA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQXBwbGljYXRpb24oKSB7XG4gICAgICAgIHRoaXMuZmllbGRzID0gZmllbGRzO1xuICAgICAgICB0aGlzLnRhYmxlTW9kZWwgPSBuZXcgVGFibGVfMS5Tb3J0VGFibGVNb2RlbCgpO1xuICAgICAgICB0aGlzLm5leHQgPSBuZXcgTmV4dCgpO1xuICAgICAgICB0aGlzLnJlY29yZHMgPSBbeyBuYW1lOiAnSm96YWluIEh1bGR1bScsIGFtb3VudDogMzIwMDAsIHN0YXR1czogJ2FjdGl2ZScsIHdhdGNoZXJzOiBbXSB9XTtcbiAgICAgICAgdGhpcy52aWV3ID0gbmV3IHZpZXdfMS5NYWluKHRoaXMpO1xuICAgIH1cbiAgICBBcHBsaWNhdGlvbi5wcm90b3R5cGUudG9nZ2xlRHJhd2VyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnZpZXcuZmluZEJ5SWQoJ2xheW91dCcpLnRvZ2dsZURyYXdlcigpO1xuICAgIH07XG4gICAgQXBwbGljYXRpb24ucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbCcpO1xuICAgICAgICB0aGlzLmRpYWxvZyA9IG5ldyB2aWV3XzEuQ3JlYXRlRGlhbG9nKHRoaXMpO1xuICAgICAgICB3aGlsZSAodGFyZ2V0LmZpcnN0Q2hpbGQpXG4gICAgICAgICAgICB0YXJnZXQucmVtb3ZlQ2hpbGQodGFyZ2V0LmZpcnN0Q2hpbGQpO1xuICAgICAgICB0YXJnZXQuYXBwZW5kQ2hpbGQodGhpcy5kaWFsb2cucmVuZGVyKCkpO1xuICAgIH07XG4gICAgQXBwbGljYXRpb24ucHJvdG90eXBlLnNhdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMucmVjb3Jkcy5wdXNoKHRoaXMubmV4dCk7XG4gICAgICAgIHRoaXMubmV4dCA9IG5ldyBOZXh0KCk7XG4gICAgICAgIHRoaXMuZGlhbG9nLmlkcy5tb2RhbC5jbG9zZSgpO1xuICAgICAgICB0aGlzLnZpZXcuaW52YWxpZGF0ZSgpO1xuICAgIH07XG4gICAgQXBwbGljYXRpb24ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgd2luZG93LmFwcCA9IHRoaXM7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYWluJykuYXBwZW5kQ2hpbGQodGhpcy52aWV3LnJlbmRlcigpKTtcbiAgICAgICAgdGhpcy5kcmF3ZXIgPSB0aGlzLnZpZXcuZmluZEJ5SWQoJ2xheW91dCcpO1xuICAgIH07XG4gICAgQXBwbGljYXRpb24ubWFpbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyB0aGlzKCk7XG4gICAgfTtcbiAgICByZXR1cm4gQXBwbGljYXRpb247XG59KCkpO1xudmFyIGFwcDtcbmFwcCA9IEFwcGxpY2F0aW9uLm1haW4oKTtcbmFwcC5ydW4oKTtcbnZhciBsYXlvdXQgPSBhcHAudmlldy5maW5kQnlJZCgnbGF5b3V0Jyk7XG52YXIgZHJhd2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShTdHlsZXMuRFJBV0VSKVswXTtcbmxheW91dC50b2dnbGVEcmF3ZXIoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHdtbF9ydW50aW1lXzEgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC1ydW50aW1lXCIpO1xudmFyIGNvbXBvbmVudHNfMSA9IHJlcXVpcmUoXCJAcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHNcIik7XG52YXIgY29tcG9uZW50c18yID0gcmVxdWlyZShcIkBxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50c1wiKTtcbnZhciBjb21wb25lbnRzXzMgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzXCIpO1xudmFyIGNvbXBvbmVudHNfNCA9IHJlcXVpcmUoXCJAcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHNcIik7XG52YXIgY29tcG9uZW50c181ID0gcmVxdWlyZShcIkBxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50c1wiKTtcbnZhciBjb21wb25lbnRzXzYgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzXCIpO1xudmFyIENyZWF0ZURpYWxvZyA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKENyZWF0ZURpYWxvZywgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBDcmVhdGVEaWFsb2coY29udGV4dCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBjb250ZXh0KSB8fCB0aGlzO1xuICAgICAgICB2YXIgdmlldyA9IF90aGlzO1xuICAgICAgICBfdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB3bWxfcnVudGltZV8xLndpZGdldChjb21wb25lbnRzXzUuTW9kYWwsIHtcbiAgICAgICAgICAgICAgICBodG1sOiB7fSxcbiAgICAgICAgICAgICAgICB3bWw6IHtcbiAgICAgICAgICAgICAgICAgICAgJ2lkJzogXCJtb2RhbFwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgW3dtbF9ydW50aW1lXzEud2lkZ2V0KGNvbXBvbmVudHNfNS5Nb2RhbEhlYWRlciwge1xuICAgICAgICAgICAgICAgICAgICBodG1sOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgd21sOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgd3c6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdvbkNsb3NlJzogZnVuY3Rpb24gZnVuY3Rpb25fbGl0ZXJhbF8xKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRpYWxvZy5pZHMubW9kYWwuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgW3dtbF9ydW50aW1lXzEudGV4dChcIlxcbiAgICAgIENyZWF0ZSByZWNvcmRcXG4gICAgXCIpXSwgdmlldyksIHdtbF9ydW50aW1lXzEud2lkZ2V0KGNvbXBvbmVudHNfNS5Nb2RhbEJvZHksIHtcbiAgICAgICAgICAgICAgICAgICAgaHRtbDoge30sXG4gICAgICAgICAgICAgICAgICAgIHdtbDoge31cbiAgICAgICAgICAgICAgICB9LCBbd21sX3J1bnRpbWVfMS53aWRnZXQoY29tcG9uZW50c182LklucHV0LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBodG1sOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdtbDoge30sXG4gICAgICAgICAgICAgICAgICAgICAgICB3dzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdpZCc6IFwibmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdsYWJlbCc6IFwiTmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdvbklucHV0JzogZnVuY3Rpb24gZnVuY3Rpb25fbGl0ZXJhbF8yKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubmV4dC5uYW1lID0gZS50YXJnZXQudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIFtdLCB2aWV3KSwgd21sX3J1bnRpbWVfMS53aWRnZXQoY29tcG9uZW50c182LklucHV0LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBodG1sOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdtbDoge30sXG4gICAgICAgICAgICAgICAgICAgICAgICB3dzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdpZCc6IFwiYW1vdW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2xhYmVsJzogXCJBbW91bnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnd2Fybic6IFwiRG9uJ3Qgb3ZlciBkbyBpdCFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAndHlwZSc6IFwibnVtYmVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ29uSW5wdXQnOiBmdW5jdGlvbiBmdW5jdGlvbl9saXRlcmFsXzMoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5uZXh0LmFtb3VudCA9IE51bWJlcihlLnRhcmdldC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIFtdLCB2aWV3KSwgd21sX3J1bnRpbWVfMS53aWRnZXQoY29tcG9uZW50c182LlNlbGVjdCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDoge30sXG4gICAgICAgICAgICAgICAgICAgICAgICB3bWw6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgd3c6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaWQnOiBcInN0YXR1c1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdsYWJlbCc6IFwiU3RhdHVzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ29wdGlvbnMnOiBbJ3BhaWQnLCAnb3ZlcmR1ZScsICdoaXN0b3J5J10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ29uSW5wdXQnOiBmdW5jdGlvbiBmdW5jdGlvbl9saXRlcmFsXzQoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5uZXh0LnN0YXR1cyA9IGUudGFyZ2V0LnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCBbXSwgdmlldyksIHdtbF9ydW50aW1lXzEubm9kZSgnc3BhbicsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGh0bWw6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgd21sOiB7fVxuICAgICAgICAgICAgICAgICAgICB9LCBbd21sX3J1bnRpbWVfMS50ZXh0KFwiIFJlY2VpdmUgTm90aWZpY2F0aW9ucz8gXCIpXSwgdmlldyksIHdtbF9ydW50aW1lXzEud2lkZ2V0KGNvbXBvbmVudHNfNi5Td2l0Y2gsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGh0bWw6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgd21sOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHd3OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ29uQ2hhbmdlJzogZnVuY3Rpb24gZnVuY3Rpb25fbGl0ZXJhbF81KGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChlLnRhcmdldC52YWx1ZSkgPyB0aGlzLm5leHQud2F0Y2hlcnMucHVzaCgxKSA6IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIFtdLCB2aWV3KV0sIHZpZXcpLCB3bWxfcnVudGltZV8xLndpZGdldChjb21wb25lbnRzXzUuTW9kYWxGb290ZXIsIHtcbiAgICAgICAgICAgICAgICAgICAgaHRtbDoge30sXG4gICAgICAgICAgICAgICAgICAgIHdtbDoge31cbiAgICAgICAgICAgICAgICB9LCBbd21sX3J1bnRpbWVfMS53aWRnZXQoY29tcG9uZW50c18xLkJ1dHRvbiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDoge30sXG4gICAgICAgICAgICAgICAgICAgICAgICB3bWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaWQnOiBcImNhbmNlbEJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgd3c6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAndGV4dCc6IFwiQ2FuY2VsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ29uQ2xpY2snOiBmdW5jdGlvbiBmdW5jdGlvbl9saXRlcmFsXzYoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRpYWxvZy5pZHMubW9kYWwuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LmJpbmQodGhpcylcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwgW10sIHZpZXcpLCB3bWxfcnVudGltZV8xLndpZGdldChjb21wb25lbnRzXzEuQnV0dG9uLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBodG1sOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdtbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdpZCc6IFwic2F2ZUJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgd3c6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnc3R5bGUnOiBcIi1kYW5nZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAndGV4dCc6IFwiU2F2ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdjbGFzcyc6IFwiLXJpZ2h0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ29uQ2xpY2snOiB0aGlzLnNhdmUuYmluZCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCBbXSwgdmlldyldLCB2aWV3KV0sIHZpZXcpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBDcmVhdGVEaWFsb2c7XG59KHdtbF9ydW50aW1lXzEuQXBwVmlldykpO1xuZXhwb3J0cy5DcmVhdGVEaWFsb2cgPSBDcmVhdGVEaWFsb2c7XG5mdW5jdGlvbiBuYXZpZ2F0aW9uKHZpZXcpIHtcbiAgICByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCdwJywge1xuICAgICAgICBodG1sOiB7fSxcbiAgICAgICAgd21sOiB7fVxuICAgIH0sIFt3bWxfcnVudGltZV8xLnRleHQoXCJUaGlzIGlzIGluIHRoZSBkcmF3ZXJcIildLCB2aWV3KTtcbn1cbmV4cG9ydHMubmF2aWdhdGlvbiA9IG5hdmlnYXRpb247XG5mdW5jdGlvbiBjb250ZW50KHZpZXcpIHtcbiAgICByZXR1cm4gd21sX3J1bnRpbWVfMS5ib3god21sX3J1bnRpbWVfMS53aWRnZXQoY29tcG9uZW50c18xLkFjdGlvbkFyZWEsIHtcbiAgICAgICAgaHRtbDoge30sXG4gICAgICAgIHdtbDoge1xuICAgICAgICAgICAgJ2lkJzogXCJhY3Rpb25zXCJcbiAgICAgICAgfVxuICAgIH0sIFt3bWxfcnVudGltZV8xLndpZGdldChjb21wb25lbnRzXzEuTWVudUJ1dHRvbiwge1xuICAgICAgICAgICAgaHRtbDoge30sXG4gICAgICAgICAgICB3bWw6IHt9LFxuICAgICAgICAgICAgd3c6IHtcbiAgICAgICAgICAgICAgICAnb25DbGljayc6IHRoaXMudG9nZ2xlRHJhd2VyLmJpbmQodGhpcylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgW10sIHZpZXcpLCB3bWxfcnVudGltZV8xLndpZGdldChjb21wb25lbnRzXzEuQnV0dG9uR3JvdXAsIHtcbiAgICAgICAgICAgIGh0bWw6IHt9LFxuICAgICAgICAgICAgd21sOiB7fSxcbiAgICAgICAgICAgIHd3OiB7XG4gICAgICAgICAgICAgICAgJ2NsYXNzJzogXCItcmlnaHRcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9LCBbd21sX3J1bnRpbWVfMS53aWRnZXQoY29tcG9uZW50c18xLkJ1dHRvbiwge1xuICAgICAgICAgICAgICAgIGh0bWw6IHt9LFxuICAgICAgICAgICAgICAgIHdtbDoge1xuICAgICAgICAgICAgICAgICAgICAnaWQnOiBcImRpc2FibGVkQnV0dG9uXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHd3OiB7XG4gICAgICAgICAgICAgICAgICAgICdzdHlsZSc6IFwiLWRlZmF1bHRcIixcbiAgICAgICAgICAgICAgICAgICAgJ3RleHQnOiBcIkRpc2FibGVkXCIsXG4gICAgICAgICAgICAgICAgICAgICdkaXNhYmxlZCc6IHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBbXSwgdmlldyksIHdtbF9ydW50aW1lXzEud2lkZ2V0KGNvbXBvbmVudHNfMS5CdXR0b24sIHtcbiAgICAgICAgICAgICAgICBodG1sOiB7fSxcbiAgICAgICAgICAgICAgICB3bWw6IHtcbiAgICAgICAgICAgICAgICAgICAgJ2lkJzogXCJjcmVhdGVCdXR0b25cIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgd3c6IHtcbiAgICAgICAgICAgICAgICAgICAgJ3N0eWxlJzogXCItZGFuZ2VyXCIsXG4gICAgICAgICAgICAgICAgICAgICd0ZXh0JzogXCJDcmVhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgJ29uQ2xpY2snOiB0aGlzLmNyZWF0ZS5iaW5kKHRoaXMpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgW10sIHZpZXcpXSwgdmlldyldLCB2aWV3KSwgd21sX3J1bnRpbWVfMS53aWRnZXQoY29tcG9uZW50c18xLk1haW5WaWV3LCB7XG4gICAgICAgIGh0bWw6IHt9LFxuICAgICAgICB3bWw6IHtcbiAgICAgICAgICAgICdpZCc6IFwibWFpblwiXG4gICAgICAgIH1cbiAgICB9LCBbd21sX3J1bnRpbWVfMS53aWRnZXQoY29tcG9uZW50c18yLkNvbnRhaW5lciwge1xuICAgICAgICAgICAgaHRtbDoge30sXG4gICAgICAgICAgICB3bWw6IHt9XG4gICAgICAgIH0sIFt3bWxfcnVudGltZV8xLndpZGdldChjb21wb25lbnRzXzIuUm93LCB7XG4gICAgICAgICAgICAgICAgaHRtbDoge30sXG4gICAgICAgICAgICAgICAgd21sOiB7fVxuICAgICAgICAgICAgfSwgW3dtbF9ydW50aW1lXzEud2lkZ2V0KGNvbXBvbmVudHNfMi5Db2x1bW4sIHtcbiAgICAgICAgICAgICAgICAgICAgaHRtbDoge30sXG4gICAgICAgICAgICAgICAgICAgIHdtbDoge31cbiAgICAgICAgICAgICAgICB9LCBbd21sX3J1bnRpbWVfMS53aWRnZXQoY29tcG9uZW50c180LlBhbmVsLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBodG1sOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdtbDoge30sXG4gICAgICAgICAgICAgICAgICAgICAgICB3dzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdzdHlsZSc6IFwiLWluZm9cIlxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCBbd21sX3J1bnRpbWVfMS53aWRnZXQoY29tcG9uZW50c180LlBhbmVsSGVhZGVyLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDoge30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd21sOiB7fVxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgW3dtbF9ydW50aW1lXzEudGV4dChcIkRldGFpbHNcIildLCB2aWV3KSwgd21sX3J1bnRpbWVfMS53aWRnZXQoY29tcG9uZW50c180LlBhbmVsQm9keSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGh0bWw6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdtbDoge31cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIFt3bWxfcnVudGltZV8xLnRleHQoXCJSZWNvcmRzOlwiKV0sIHZpZXcpLCB3bWxfcnVudGltZV8xLndpZGdldChjb21wb25lbnRzXzMuVGFibGUsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBodG1sOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3bWw6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd3OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdmaWVsZHMnOiB0aGlzLmZpZWxkcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2RhdGEnOiB0aGlzLnJlY29yZHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdtb2RlbCc6IHRoaXMudGFibGVNb2RlbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIFtdLCB2aWV3KSwgd21sX3J1bnRpbWVfMS53aWRnZXQoY29tcG9uZW50c180LlBhbmVsRm9vdGVyLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDoge30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd21sOiB7fVxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgW3dtbF9ydW50aW1lXzEuZG9taWZ5KHRoaXMucmVjb3Jkcy5yZWR1Y2UoZnVuY3Rpb24gZnVuY3Rpb25fbGl0ZXJhbF83KHAsIGMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHAgKyBjLmFtb3VudDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LmJpbmQodGhpcyksIDApKV0sIHZpZXcpXSwgdmlldyldLCB2aWV3KV0sIHZpZXcpXSwgdmlldyldLCB2aWV3KSk7XG59XG5leHBvcnRzLmNvbnRlbnQgPSBjb250ZW50O1xudmFyIE1haW4gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhNYWluLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIE1haW4oY29udGV4dCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBjb250ZXh0KSB8fCB0aGlzO1xuICAgICAgICB2YXIgdmlldyA9IF90aGlzO1xuICAgICAgICBfdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB3bWxfcnVudGltZV8xLndpZGdldChjb21wb25lbnRzXzEuRHJhd2VyTGF5b3V0LCB7XG4gICAgICAgICAgICAgICAgaHRtbDoge30sXG4gICAgICAgICAgICAgICAgd21sOiB7XG4gICAgICAgICAgICAgICAgICAgICdpZCc6IFwibGF5b3V0XCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHd3OiB7XG4gICAgICAgICAgICAgICAgICAgICdkcmF3ZXInOiBuYXZpZ2F0aW9uLFxuICAgICAgICAgICAgICAgICAgICAnY29udGVudCc6IGNvbnRlbnQuYmluZCh0aGlzKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIFtdLCB2aWV3KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gTWFpbjtcbn0od21sX3J1bnRpbWVfMS5BcHBWaWV3KSk7XG5leHBvcnRzLk1haW4gPSBNYWluO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dmlldy5qcy5tYXAiXX0=
