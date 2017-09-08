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
var Styles = require("wml-widgets-common/Styles");
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

},{"./wml/button":14,"wml-widgets-common":5,"wml-widgets-common/Styles":4}],14:[function(require,module,exports){
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
            return wml_runtime_1.node('div', { html: { 'class': this.getClass(), 'role': "group" }, wml: {} }, [wml_runtime_1.domify(this.children)], view);
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
            return wml_runtime_1.widget(_1.Fragment, { html: {}, wml: {} }, [wml_runtime_1.ifE(this.attributes.read('ww:href'), function if0() { return wml_runtime_1.node('a', { html: { 'href': this.attributes.read('ww:href'), 'class': util_1.combine([Styles.BUTTON, this.attributes.read('ww:variant', ''), this.attributes.read('ww:size', ''), this.attributes.read('ww:style', Styles.DEFAULT), this.attributes.read('ww:class')]), 'onclick': this.attributes.read('ww:onClick', util_1.noop) }, wml: { 'id': "button" } }, [wml_runtime_1.domify(this.attributes.read('ww:text')), wml_runtime_1.domify(this.children)], view); }.bind(this), function else_clause0() { return wml_runtime_1.node('button', { html: { 'type': this.attributes.read('ww:type', 'button'), 'name': this.attributes.read('ww:name', ''), 'disabled': (this.attributes.read('ww:disabled')) ? "true" : null, 'class': util_1.combine([Styles.BUTTON, this.attributes.read('ww:variant', ''), this.attributes.read('ww:size', ''), this.attributes.read('ww:style', Styles.DEFAULT), this.attributes.read('ww:class')]), 'onclick': this.attributes.read('ww:onClick', util_1.noop) }, wml: { 'id': "button" } }, [wml_runtime_1.domify(this.attributes.read('ww:text')), wml_runtime_1.domify(this.children)], view); }.bind(this))], view);
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
            return wml_runtime_1.node('div', { html: { 'class': Styles.DRAWER_LAYOUT }, wml: { 'id': "content" } }, [wml_runtime_1.widget(Drawer_1.Drawer, { html: {}, wml: { 'id': "drawer" }, ww: { 'content': this.attributes.read("ww:drawer") } }, [], view), wml_runtime_1.ifE(this.content, function if1() { return wml_runtime_1.domify(this.content); }.bind(this), function elseif0() { return wml_runtime_1.ifE(this.attributes.read("ww:content"), function if0() { return this.attributes.read("ww.content").call(this, view); }.bind(this), function else_clause1() { return wml_runtime_1.domify(this.children); }.bind(this)); }.bind(this))], view);
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
            return wml_runtime_1.node('div', { html: { 'class': Styles.DRAWER }, wml: { 'id': "drawer" } }, [wml_runtime_1.node('div', { html: { 'class': Styles.DRAWER_CONTENT }, wml: {} }, [wml_runtime_1.ifE(this.attributes.read('ww:content'), function if2() { return this.attributes.read('ww:content').call(this, view); }.bind(this), function else_clause2() { return wml_runtime_1.domify(this.children); }.bind(this))], view)], view);
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
        var input = this.view.ids.input;
        return ((input.value != null) || (input.value !== ''));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi93bWwtcnVudGltZS9ub2RlX21vZHVsZXMvcHJvcGVydHktc2Vlay9pbmRleC5qcyIsIi4uL3dtbC1ydW50aW1lL3NyYy9pbmRleC5qcyIsImxpYi9jb21wb25lbnRzL3dtbC13aWRnZXRzLWNvbW1vbi9Db250YWluZXIuanMiLCJsaWIvY29tcG9uZW50cy93bWwtd2lkZ2V0cy1jb21tb24vU3R5bGVzLmpzIiwibGliL2NvbXBvbmVudHMvd21sLXdpZGdldHMtY29tbW9uL2luZGV4LmpzIiwibGliL2NvbXBvbmVudHMvd21sLXdpZGdldHMtY29tbW9uL3V0aWwuanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL2FjdGlvbi1hcmVhL0FjdGlvbkFyZWEuanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL2FjdGlvbi1hcmVhL3dtbC9hY3Rpb25fYXJlYS5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvYnJlYWRjcnVtYnMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL2JyZWFkY3J1bWJzL3dtbC9icmVhZGNydW1icy5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvYnVzeS1pbmRpY2F0b3IvQnVzeUluZGljYXRvci5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvYnVzeS1pbmRpY2F0b3Ivd21sL2J1c3lfaW5kaWNhdG9yLmpzIiwibm9kZV9tb2R1bGVzL0BxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50cy9idXR0b24vQnV0dG9uLmpzIiwibm9kZV9tb2R1bGVzL0BxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50cy9idXR0b24vd21sL2J1dHRvbi5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvY2FyZC9DYXJkLmpzIiwibm9kZV9tb2R1bGVzL0BxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50cy9jYXJkL3dtbC9jYXJkLmpzIiwibm9kZV9tb2R1bGVzL0BxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50cy9kcmF3ZXItbGF5b3V0L0RyYXdlckxheW91dC5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvZHJhd2VyLWxheW91dC93bWwvZHJhd2VyLWxheW91dC5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvZHJhd2VyL0RyYXdlci5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvZHJhd2VyL3dtbC9kcmF3ZXIuanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL2ZyYWdtZW50L0ZyYWdtZW50LmpzIiwibm9kZV9tb2R1bGVzL0BxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50cy9ncmlkL0dyaWQuanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL2dyaWQvd21sL2dyaWQuanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL0BxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50cy9pbnB1dC9JbnB1dC5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvaW5wdXQvd21sL2lucHV0LmpzIiwibm9kZV9tb2R1bGVzL0BxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50cy9tYWluLXZpZXcvTWFpblZpZXcuanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL21haW4tdmlldy93bWwvbWFpbi12aWV3LmpzIiwibm9kZV9tb2R1bGVzL0BxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50cy9tZW51LWJ1dHRvbi9NZW51QnV0dG9uLmpzIiwibm9kZV9tb2R1bGVzL0BxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50cy9tZW51LWJ1dHRvbi93bWwvbWVudV9idXR0b24uanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL21vZGFsL01vZGFsLmpzIiwibm9kZV9tb2R1bGVzL0BxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50cy9tb2RhbC93bWwvbW9kYWwuanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL3BhbmVsL1BhbmVsLmpzIiwibm9kZV9tb2R1bGVzL0BxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50cy9wYW5lbC93bWwvcGFuZWwuanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL3N3aXRjaC9Td2l0Y2guanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL3N3aXRjaC93bWwvc3dpdGNoLmpzIiwibm9kZV9tb2R1bGVzL0BxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50cy90YWJsZS9UYWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvdGFibGUvd21sL3RhYmxlLmpzIiwibm9kZV9tb2R1bGVzL0BxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50cy90YWJzL1RhYnMuanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL3RhYnMvd21sL3RhYnMuanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL3RyZWUtbmF2L1RyZWVOYXYuanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL3RyZWUtbmF2L3dtbC90cmVlLW5hdi5qcyIsIm5vZGVfbW9kdWxlcy9wcm9wZXJ0eS1zZWVrL2luZGV4LmpzIiwidGVzdC9hcHAvYXBwLmpzIiwidGVzdC9hcHAvdmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6UEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZnVuY3Rpb24gYm91bmRhcnlfdG9fZG90KHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlLnNwbGl0KCddWycpLmpvaW4oJy4nKS5zcGxpdCgnWycpLmpvaW4oJy4nKTtcbn1cbmZ1bmN0aW9uIHN0cmlwX2JyYWNlcyh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZS5zcGxpdCgnWycpLmpvaW4oJy4nKS5zcGxpdCgnXScpLmpvaW4oJycpO1xufVxuZnVuY3Rpb24gZXNjYXBlX2RvdHModmFsdWUpIHtcbiAgICB2YWx1ZSA9IHZhbHVlLnNwbGl0KCdcXCcnKTtcbiAgICByZXR1cm4gKHZhbHVlLmxlbmd0aCA8IDMpID8gdmFsdWUuam9pbignXFwnJykgOiB2YWx1ZS5tYXAoZnVuY3Rpb24gKHNlZykge1xuICAgICAgICBpZiAoc2VnLmxlbmd0aCA8IDMpXG4gICAgICAgICAgICByZXR1cm4gc2VnO1xuICAgICAgICBpZiAoKHNlZ1swXSA9PT0gJy4nKSB8fCAoc2VnW3NlZy5sZW5ndGggLSAxXSA9PT0gJy4nKSlcbiAgICAgICAgICAgIHJldHVybiBzZWc7XG4gICAgICAgIHJldHVybiBzZWcuc3BsaXQoJy4nKS5qb2luKCcmJicpO1xuICAgIH0pLmpvaW4oJycpO1xufVxuZnVuY3Rpb24gdW5lc2NhcGVfZG90cyh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZS5zcGxpdCgnJiYnKS5qb2luKCcuJyk7XG59XG5mdW5jdGlvbiBwYXJ0aWZ5KHZhbHVlKSB7XG4gICAgaWYgKCF2YWx1ZSlcbiAgICAgICAgcmV0dXJuO1xuICAgIHJldHVybiBlc2NhcGVfZG90cyhzdHJpcF9icmFjZXMoYm91bmRhcnlfdG9fZG90KCcnICsgdmFsdWUpKSkuc3BsaXQoJy4nKTtcbn1cbmZ1bmN0aW9uIGNsb25lKG8pIHtcbiAgICBpZiAoKHR5cGVvZiBvICE9PSAnb2JqZWN0JykgfHwgKG8gPT09IG51bGwpKVxuICAgICAgICByZXR1cm4gbztcbiAgICBpZiAoQXJyYXkuaXNBcnJheShvKSlcbiAgICAgICAgcmV0dXJuIG8ubWFwKGNsb25lKTtcbiAgICByZXR1cm4gKHR5cGVvZiBvLl9fQ0xPTkVfXyA9PT0gJ2Z1bmN0aW9uJykgP1xuICAgICAgICBvLl9fQ0xPTkVfXyhjbG9uZSkgOiAoby5jb25zdHJ1Y3RvciAhPT0gT2JqZWN0KSA/IG8gOlxuICAgICAgICBPYmplY3Qua2V5cyhvKS5yZWR1Y2UoZnVuY3Rpb24gKHByZSwgaykge1xuICAgICAgICAgICAgcHJlW2tdID0gKHR5cGVvZiBvW2tdID09PSAnb2JqZWN0JykgPyBjbG9uZShvW2tdKSA6IG9ba107XG4gICAgICAgICAgICByZXR1cm4gcHJlO1xuICAgICAgICB9LCB7fSk7XG59XG47XG5mdW5jdGlvbiBnZXQocGF0aCwgbykge1xuICAgIHZhciBwYXJ0cyA9IHBhcnRpZnkocGF0aCk7XG4gICAgdmFyIGZpcnN0O1xuICAgIGlmICh0eXBlb2YgbyAhPT0gJ29iamVjdCcpXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2dldCgpOiBleHBlY3RzIGFuIG9iamVjdCBnb3QgJyArIHR5cGVvZiBvKTtcbiAgICBpZiAocGFydHMubGVuZ3RoID09PSAxKVxuICAgICAgICByZXR1cm4gb1t1bmVzY2FwZV9kb3RzKHBhcnRzWzBdKV07XG4gICAgaWYgKHBhcnRzLmxlbmd0aCA9PT0gMClcbiAgICAgICAgcmV0dXJuO1xuICAgIGZpcnN0ID0gb1twYXJ0cy5zaGlmdCgpXTtcbiAgICByZXR1cm4gKCh0eXBlb2YgbyA9PT0gJ29iamVjdCcpICYmIChvICE9PSBudWxsKSkgP1xuICAgICAgICBwYXJ0cy5yZWR1Y2UoZnVuY3Rpb24gKHRhcmdldCwgcHJvcCkge1xuICAgICAgICAgICAgaWYgKHRhcmdldCA9PSBudWxsKVxuICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgICAgICAgICByZXR1cm4gdGFyZ2V0W3VuZXNjYXBlX2RvdHMocHJvcCldO1xuICAgICAgICB9LCBmaXJzdCkgOiBudWxsO1xufVxuZXhwb3J0cy5nZXQgPSBnZXQ7XG47XG5mdW5jdGlvbiBzZXQocGF0aCwgdmFsdWUsIG9iaikge1xuICAgIHZhciBwYXJ0cyA9IHBhcnRpZnkocGF0aCk7XG4gICAgaWYgKCh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0JykgfHwgKG9iaiA9PSBudWxsKSkge1xuICAgICAgICByZXR1cm4gb2JqO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIF9zZXQob2JqLCB2YWx1ZSwgcGFydHMpO1xuICAgIH1cbn1cbmV4cG9ydHMuc2V0ID0gc2V0O1xuO1xuZnVuY3Rpb24gX3NldChvYmosIHZhbHVlLCBwYXJ0cykge1xuICAgIHZhciBvO1xuICAgIHZhciBrO1xuICAgIGlmIChwYXJ0cy5sZW5ndGggPT09IDApXG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICBvID0gKCh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0JykgfHwgKG9iaiA9PT0gbnVsbCkpID8ge30gOiBjbG9uZShvYmopO1xuICAgIGsgPSB1bmVzY2FwZV9kb3RzKHBhcnRzWzBdKTtcbiAgICBvW2tdID0gX3NldChvW2tdLCB2YWx1ZSwgcGFydHMuc2xpY2UoMSkpO1xuICAgIHJldHVybiBvO1xufVxuZnVuY3Rpb24gZGVmYXVsdF8xKGssIHYsIG8pIHtcbiAgICBpZiAobyA9PSBudWxsKVxuICAgICAgICByZXR1cm4gZ2V0KGssIHYpO1xuICAgIGVsc2VcbiAgICAgICAgcmV0dXJuIHNldChrLCB2LCBvKTtcbn1cbmV4cG9ydHMuZGVmYXVsdCA9IGRlZmF1bHRfMTtcbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHByb3BlcnR5X3NlZWtfMSA9IHJlcXVpcmUoXCJwcm9wZXJ0eS1zZWVrXCIpO1xuO1xudmFyIENvbXBvbmVudCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ29tcG9uZW50KGF0dHJpYnV0ZXMsIGNoaWxkcmVuKSB7XG4gICAgICAgIHRoaXMuYXR0cmlidXRlcyA9IGF0dHJpYnV0ZXM7XG4gICAgICAgIHRoaXMuY2hpbGRyZW4gPSBjaGlsZHJlbjtcbiAgICB9XG4gICAgQ29tcG9uZW50LnByb3RvdHlwZS5yZW5kZXJlZCA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICBDb21wb25lbnQucHJvdG90eXBlLnJlbW92ZWQgPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgQ29tcG9uZW50LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLnZpZXcucmVuZGVyKCk7IH07XG4gICAgcmV0dXJuIENvbXBvbmVudDtcbn0oKSk7XG5leHBvcnRzLkNvbXBvbmVudCA9IENvbXBvbmVudDtcbjtcbi8qKlxuICogQXR0cmlidXRlcyBwcm92aWRlcyBhbiBBUEkgZm9yIHJlYWRpbmcgdGhlXG4gKiBhdHRyaWJ1dGVzIHN1cHBsaWVkIHRvIGFuIEVsZW1lbnQuXG4gKi9cbnZhciBBdHRyaWJ1dGVzID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBBdHRyaWJ1dGVzKGF0dHJzKSB7XG4gICAgICAgIHRoaXMuYXR0cnMgPSBhdHRycztcbiAgICB9XG4gICAgQXR0cmlidXRlcy5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gKHBhdGgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVhZChwYXRoLCBudWxsKSAhPSBudWxsO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogcmVhZCBhIHZhbHVlIGZvcm0gdGhlIGludGVybmFsIGxpc3QuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGhcbiAgICAgKiBAcGFyYW0geyp9IGRlZmF1bHRWYWx1ZSAtIFRoaXMgdmFsdWUgaXMgcmV0dXJuZWQgaWYgdGhlIHZhbHVlIGlzIG5vdCBzZXQuXG4gICAgICovXG4gICAgQXR0cmlidXRlcy5wcm90b3R5cGUucmVhZCA9IGZ1bmN0aW9uIChwYXRoLCBkZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgdmFyIHJldCA9IHByb3BlcnR5X3NlZWtfMS5kZWZhdWx0KHBhdGguc3BsaXQoJzonKS5qb2luKCcuJyksIHRoaXMuYXR0cnMpO1xuICAgICAgICByZXR1cm4gKHJldCAhPSBudWxsKSA/IHJldCA6IChkZWZhdWx0VmFsdWUgIT0gbnVsbCkgPyBkZWZhdWx0VmFsdWUgOiAnJztcbiAgICB9O1xuICAgIHJldHVybiBBdHRyaWJ1dGVzO1xufSgpKTtcbmV4cG9ydHMuQXR0cmlidXRlcyA9IEF0dHJpYnV0ZXM7XG52YXIgYWRvcHQgPSBmdW5jdGlvbiAoY2hpbGQsIGUpIHtcbiAgICAvLyBpZiAoY2hpbGQgaW5zdGFuY2VvZiBBcnJheSlcbiAgICAvLyByZXR1cm4gY2hpbGQuZm9yRWFjaChpbm5lckNoaWxkID0+IGFkb3B0KGlubmVyQ2hpbGQsIGUpKTtcbiAgICBzd2l0Y2ggKHR5cGVvZiBjaGlsZCkge1xuICAgICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgICAgIGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycgKyBjaGlsZCkpO1xuICAgICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICAgICAgZS5hcHBlbmRDaGlsZChjaGlsZCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW4gbm90IGFkb3B0IGNoaWxkIFwiICsgY2hpbGQgKyBcIiBvZiB0eXBlIFwiICsgdHlwZW9mIGNoaWxkKTtcbiAgICB9XG59O1xuZXhwb3J0cy5ib3ggPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNvbnRlbnQgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICBjb250ZW50W19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgfVxuICAgIHZhciBmcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgIGNvbnRlbnQuZm9yRWFjaChmdW5jdGlvbiAoYykgeyByZXR1cm4gZnJhZy5hcHBlbmRDaGlsZChjKTsgfSk7XG4gICAgcmV0dXJuIGZyYWc7XG59O1xuZXhwb3J0cy5kb21pZnkgPSBmdW5jdGlvbiAoYSkge1xuICAgIGlmIChhIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgcmV0dXJuIGV4cG9ydHMuYm94LmFwcGx5KG51bGwsIGEubWFwKGV4cG9ydHMuZG9taWZ5KSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKCh0eXBlb2YgYSA9PT0gJ3N0cmluZycpIHx8XG4gICAgICAgICh0eXBlb2YgYSA9PT0gJ251bWJlcicpIHx8XG4gICAgICAgICh0eXBlb2YgYSA9PT0gJ2Jvb2xlYW4nKSkge1xuICAgICAgICByZXR1cm4gZXhwb3J0cy50ZXh0KGEpO1xuICAgIH1cbiAgICBlbHNlIGlmIChhIGluc3RhbmNlb2YgTm9kZSkge1xuICAgICAgICByZXR1cm4gYTtcbiAgICB9XG4gICAgZWxzZSBpZiAoYSA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBfZW1wdHk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2FuIG5vdCB1c2UgJ1wiICsgYSArIFwiJyh0eXBlb2YgXCIgKyB0eXBlb2YgYSArIFwiKSBhcyBDb250ZW50IVwiKTtcbiAgICB9XG59O1xudmFyIF9lbXB0eSA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbmV4cG9ydHMuZW1wdHkgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBfZW1wdHk7IH07XG4vKipcbiAqIHRleHRcbiAqL1xuZXhwb3J0cy50ZXh0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnICsgdmFsdWUpO1xufTtcbi8qKlxuICogcmVzb2x2ZSBwcm9wZXJ0eSBhY2Nlc3MgZXhwcmVzc2lvbiB0byBhdm9pZFxuICogdGhvd2luZyBlcnJvcnMgaWYgaXQgZG9lcyBub3QgZXhpc3QuXG4gKi9cbmV4cG9ydHMucmVzb2x2ZSA9IGZ1bmN0aW9uIChoZWFkLCBwYXRoKSB7XG4gICAgaWYgKChoZWFkID09IG51bGwpIHx8IGhlYWQgPT0gJycpXG4gICAgICAgIHJldHVybiAnJztcbiAgICB2YXIgcmV0ID0gcHJvcGVydHlfc2Vla18xLmRlZmF1bHQocGF0aCwgaGVhZCk7XG4gICAgcmV0dXJuIChyZXQgPT0gbnVsbCkgPyAnJyA6IHJldDtcbn07XG4vKipcbiAqIG5vZGUgaXMgY2FsbGVkIHRvIGNyZWF0ZSBhIHJlZ3VsYXIgRE9NIG5vZGVcbiAqL1xuZXhwb3J0cy5ub2RlID0gZnVuY3Rpb24gKHRhZywgYXR0cmlidXRlcywgY2hpbGRyZW4sIHZpZXcpIHtcbiAgICB2YXIgZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgICBpZiAodHlwZW9mIGF0dHJpYnV0ZXNbJ2h0bWwnXSA9PT0gJ29iamVjdCcpXG4gICAgICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXNbJ2h0bWwnXSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBhdHRyaWJ1dGVzWydodG1sJ11ba2V5XTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBlW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgIT09ICcnKVxuICAgICAgICAgICAgICAgICAgICBlLnNldEF0dHJpYnV0ZShrZXksIHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICAgICAgZS5zZXRBdHRyaWJ1dGUoa2V5LCBcIlwiICsgdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICBjaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChjKSB7IHJldHVybiBhZG9wdChjLCBlKTsgfSk7XG4gICAgdmFyIGlkID0gYXR0cmlidXRlc1snd21sJ10uaWQ7XG4gICAgdmFyIGdyb3VwID0gYXR0cmlidXRlcy53bWwuZ3JvdXA7XG4gICAgaWYgKGlkKVxuICAgICAgICB2aWV3LnJlZ2lzdGVyKGlkLCBlKTtcbiAgICBpZiAoZ3JvdXApXG4gICAgICAgIHZpZXcucmVnaXN0ZXJHcm91cChncm91cCwgZSk7XG4gICAgcmV0dXJuIGU7XG59O1xuLyoqXG4gKiB3aWRnZXQgY3JlYXRlcyBhIHdtbCB3aWRnZXQuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBDb25zdHJ1dG9yXG4gKiBAcGFyYW0ge29iamVjdH0gYXR0cmlidXRlc1xuICogQHBhcmFtIHthcnJheTxzdHJpbmd8bnVtYmVyfFdpZGdldD59IGNoaWxkcmVuXG4gKiBAcGFyYW0ge1ZpZXd9IHZpZXdcbiAqIEByZXR1cm4ge1dpZGdldH1cbiAqL1xuZXhwb3J0cy53aWRnZXQgPSBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIGF0dHJpYnV0ZXMsIGNoaWxkcmVuLCB2aWV3KSB7XG4gICAgdmFyIGNoaWxkcyA9IFtdO1xuICAgIHZhciB3O1xuICAgIGNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKGNoaWxkKSB7IHJldHVybiAoY2hpbGQgaW5zdGFuY2VvZiBBcnJheSkgP1xuICAgICAgICBjaGlsZHMucHVzaC5hcHBseShjaGlsZHMsIGNoaWxkKSA6IGNoaWxkcy5wdXNoKGNoaWxkKTsgfSk7XG4gICAgdyA9IG5ldyBDb25zdHJ1Y3RvcihuZXcgQXR0cmlidXRlcyhhdHRyaWJ1dGVzKSwgY2hpbGRzKTtcbiAgICB2YXIgaWQgPSBhdHRyaWJ1dGVzLndtbC5pZDtcbiAgICB2YXIgZ3JvdXAgPSBhdHRyaWJ1dGVzLndtbC5ncm91cDtcbiAgICBpZiAoaWQpXG4gICAgICAgIHZpZXcucmVnaXN0ZXIoaWQsIHcpO1xuICAgIGlmIChncm91cClcbiAgICAgICAgdmlldy5yZWdpc3Rlckdyb3VwKGdyb3VwLCB3KTtcbiAgICB2aWV3LndpZGdldHMucHVzaCh3KTtcbiAgICByZXR1cm4gdy5yZW5kZXIoKTtcbn07XG4vKipcbiAqIGlmRSBwcm92aWRlcyBhbiBpZiB0aGVuIGV4cHJlc3Npb25cbiAqL1xuZXhwb3J0cy5pZkUgPSBmdW5jdGlvbiAocHJlZGljYXRlLCBwb3NpdGl2ZSwgbmVnYXRpdmUpIHtcbiAgICByZXR1cm4gKHByZWRpY2F0ZSkgPyBwb3NpdGl2ZSgpIDogbmVnYXRpdmUoKTtcbn07XG4vKipcbiAqIGZvckUgcHJvdmlkZXMgYSBmb3IgZXhwcmVzc2lvblxuICovXG5leHBvcnRzLmZvckUgPSBmdW5jdGlvbiAoY29sbGVjdGlvbiwgY2IsIGNiMikge1xuICAgIHZhciBmcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgIGlmIChjb2xsZWN0aW9uIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgaWYgKGNvbGxlY3Rpb24ubGVuZ3RoID4gMClcbiAgICAgICAgICAgIGNvbGxlY3Rpb24uZm9yRWFjaChmdW5jdGlvbiAodiwgaywgYSkgeyByZXR1cm4gZnJhZy5hcHBlbmRDaGlsZChjYih2LCBrLCBhKSk7IH0pO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBmcmFnLmFwcGVuZENoaWxkKGNiMigpKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGNvbGxlY3Rpb24gPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHZhciBsID0gT2JqZWN0LmtleXMoY29sbGVjdGlvbik7XG4gICAgICAgIGlmIChsLmxlbmd0aCA+IDApXG4gICAgICAgICAgICBsLmZvckVhY2goZnVuY3Rpb24gKGspIHsgcmV0dXJuIGZyYWcuYXBwZW5kQ2hpbGQoY2IoY29sbGVjdGlvbltrXSwgaywgY29sbGVjdGlvbikpOyB9KTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgZnJhZy5hcHBlbmRDaGlsZChjYjIoKSk7XG4gICAgfVxuICAgIHJldHVybiBmcmFnO1xufTtcbi8qKlxuICogc3dpdGNoRSBzaW11bGF0ZXMgYSBzd2l0Y2ggc3RhdGVtZW50XG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ8Ym9vbGVhbn0gdmFsdWVcbiAqIEBwYXJhbSB7b2JqZWN0fSBjYXNlc1xuICovXG5leHBvcnRzLnN3aXRjaEUgPSBmdW5jdGlvbiAodmFsdWUsIGNhc2VzKSB7XG4gICAgdmFyIHJlc3VsdCA9IGNhc2VzW3ZhbHVlXTtcbiAgICB2YXIgZGVmYXVsID0gY2FzZXNbJ2RlZmF1bHQnXTtcbiAgICBpZiAocmVzdWx0KVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIGlmIChkZWZhdWwpXG4gICAgICAgIHJldHVybiBkZWZhdWw7XG59O1xudmFyIEFwcFZpZXcgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEFwcFZpZXcoY29udGV4dCkge1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgICAgICB0aGlzLmlkcyA9IHt9O1xuICAgICAgICB0aGlzLmdyb3VwcyA9IHt9O1xuICAgICAgICB0aGlzLndpZGdldHMgPSBbXTtcbiAgICB9XG4gICAgQXBwVmlldy5wcm90b3R5cGUucmVnaXN0ZXIgPSBmdW5jdGlvbiAoaWQsIHcpIHtcbiAgICAgICAgaWYgKHRoaXMuaWRzLmhhc093blByb3BlcnR5KGlkKSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkR1cGxpY2F0ZSBpZCAnXCIgKyBpZCArIFwiJyBkZXRlY3RlZCFcIik7XG4gICAgICAgIHRoaXMuaWRzW2lkXSA9IHc7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgQXBwVmlldy5wcm90b3R5cGUucmVnaXN0ZXJHcm91cCA9IGZ1bmN0aW9uIChncm91cCwgZSkge1xuICAgICAgICB0aGlzLmdyb3Vwc1tncm91cF0gPSB0aGlzLmdyb3Vwc1tncm91cF0gfHwgW107XG4gICAgICAgIHRoaXMuZ3JvdXBzW2dyb3VwXS5wdXNoKGUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIEFwcFZpZXcucHJvdG90eXBlLmZpbmRCeUlkID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5pZHNbaWRdKSA/IHRoaXMuaWRzW2lkXSA6IG51bGw7XG4gICAgfTtcbiAgICBBcHBWaWV3LnByb3RvdHlwZS5maW5kR3JvdXBCeU5hbWUgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICByZXR1cm4gKHRoaXMuZ3JvdXBzLmhhc093blByb3BlcnR5KG5hbWUpKSA/IHRoaXMuZ3JvdXBzW25hbWVdIDogW107XG4gICAgfTtcbiAgICBBcHBWaWV3LnByb3RvdHlwZS5pbnZhbGlkYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY2hpbGRzO1xuICAgICAgICB2YXIgcmVhbEZpcnN0Q2hpbGQ7XG4gICAgICAgIHZhciByZWFsRmlyc3RDaGlsZEluZGV4O1xuICAgICAgICB2YXIgdHJlZSA9ICh0aGlzLl9mcmFnUm9vdCkgPyB0aGlzLl9mcmFnUm9vdCA6IHRoaXMudHJlZTtcbiAgICAgICAgdmFyIHBhcmVudCA9IHRyZWUucGFyZW50Tm9kZTtcbiAgICAgICAgaWYgKHRyZWUgPT0gbnVsbClcbiAgICAgICAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcignQ2Fubm90IGludmFsaWRhdGUgYSB2aWV3IHRoYXQgaGFzIG5vdCBiZWVuIHJlbmRlcmVkIScpO1xuICAgICAgICBpZiAodHJlZS5wYXJlbnROb2RlID09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoJ0F0dGVtcHQgdG8gaW52YWxpZGF0ZSBhIHZpZXcgdGhhdCBoYXMgbm90IGJlZW4gaW5zZXJ0ZWQgdG8gRE9NIScpO1xuICAgICAgICBjaGlsZHMgPSB0cmVlLnBhcmVudE5vZGUuY2hpbGRyZW47XG4gICAgICAgIC8vZm9yIHNvbWUgcmVhc29uIHRoZSByZWZlcmVuY2Ugc3RvcmVkIGRvZXMgbm90IGhhdmUgdGhlIGNvcnJlY3QgcGFyZW50IG5vZGUuXG4gICAgICAgIC8vd2UgZG8gdGhpcyB0byBnZXQgYSAnbGl2ZScgdmVyc2lvbiBvZiB0aGUgbm9kZS5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHMubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICBpZiAoY2hpbGRzW2ldID09PSB0cmVlKSB7XG4gICAgICAgICAgICAgICAgcmVhbEZpcnN0Q2hpbGQgPSBjaGlsZHNbaV07XG4gICAgICAgICAgICAgICAgcmVhbEZpcnN0Q2hpbGRJbmRleCA9IGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIHBhcmVudC5yZXBsYWNlQ2hpbGQodGhpcy5yZW5kZXIoKSwgcmVhbEZpcnN0Q2hpbGQpO1xuICAgIH07XG4gICAgQXBwVmlldy5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmlkcyA9IHt9O1xuICAgICAgICB0aGlzLndpZGdldHMuZm9yRWFjaChmdW5jdGlvbiAodykgeyByZXR1cm4gdy5yZW1vdmVkKCk7IH0pO1xuICAgICAgICB0aGlzLndpZGdldHMgPSBbXTtcbiAgICAgICAgdGhpcy5fZnJhZ1Jvb3QgPSBudWxsO1xuICAgICAgICB0aGlzLnRyZWUgPSB0aGlzLnRlbXBsYXRlLmNhbGwodGhpcy5jb250ZXh0KTtcbiAgICAgICAgdGhpcy5pZHNbJ3Jvb3QnXSA9ICh0aGlzLmlkc1sncm9vdCddKSA/IHRoaXMuaWRzWydyb290J10gOiB0aGlzLnRyZWU7XG4gICAgICAgIGlmICh0aGlzLnRyZWUubm9kZU5hbWUgPT09IChkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCkpLm5vZGVOYW1lKVxuICAgICAgICAgICAgdGhpcy5fZnJhZ1Jvb3QgPSB0aGlzLnRyZWUuZmlyc3RDaGlsZDtcbiAgICAgICAgdGhpcy53aWRnZXRzLmZvckVhY2goZnVuY3Rpb24gKHcpIHsgcmV0dXJuIHcucmVuZGVyZWQoKTsgfSk7XG4gICAgICAgIHJldHVybiB0aGlzLnRyZWU7XG4gICAgfTtcbiAgICByZXR1cm4gQXBwVmlldztcbn0oKSk7XG5leHBvcnRzLkFwcFZpZXcgPSBBcHBWaWV3O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB3bWxfcnVudGltZV8xID0gcmVxdWlyZShcIkBxdWVuay93bWwtcnVudGltZVwiKTtcbi8qKlxuICogQ29udGFpbmVyIGlzIGFuIGFic3RyYWN0IGNsYXNzIGltcGxlbWVudGluZyB3aWRnZXRzXG4gKiB0aGF0IGhvbGQgY29udGVudCBhcyB0aGVpciBwcmltYXJ5IHB1cnBvc2Ugc3VjaFxuICogYXMgYSBEcmF3ZXJMYXlvdXQgb3IgYW4gb2JqZWN0IGZvcm0gJ2dyaWQnLlxuICovXG52YXIgQ29udGFpbmVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQ29udGFpbmVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIENvbnRhaW5lcigpIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBzZXRDb250ZW50IGNoYW5nZXMgdGhlIGNvbnRlbnQgdmFsdWUuXG4gICAgICovXG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5zZXRDb250ZW50ID0gZnVuY3Rpb24gKGNvbnRlbnQpIHtcbiAgICAgICAgdmFyIHJvb3QgPSB0aGlzLnZpZXcuZmluZEJ5SWQoJ3Jvb3QnKTtcbiAgICAgICAgdmFyIHBhcmVudCA9IHJvb3QucGFyZW50Tm9kZTtcbiAgICAgICAgaWYgKCFyb290KVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHRoaXMuY29uc3RydWN0b3IubmFtZSArIFwiI3NldENvbnRlbnQ6XCIgK1xuICAgICAgICAgICAgICAgIFwiQ2Fubm90IHNldCBjb250ZW50IG9mIGEgd2lkZ2V0IFwiICtcbiAgICAgICAgICAgICAgICBcInRoYXQgaGFzIG5vIHJvb3QgaW4gaXQncyB0ZW1wbGF0ZSFcIik7XG4gICAgICAgIGlmICghcGFyZW50KVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHRoaXMuY29uc3RydWN0b3IubmFtZSArIFwiI3NldENvbnRlbnQ6XCIgK1xuICAgICAgICAgICAgICAgIFwiQ2Fubm90IHNldCBjb250ZW50IG9mIGEgd2lkZ2V0IHdpdGggbm8gcGFyZW50IVwiKTtcbiAgICAgICAgdGhpcy5jb250ZW50ID0gY29udGVudDtcbiAgICAgICAgcGFyZW50LnJlcGxhY2VDaGlsZCh0aGlzLnJlbmRlcigpLCByb290KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiByZW1vdmVDb250ZW50IHJlbW92ZXMgZXhpc3RpbmcgY29udGVudC5cbiAgICAgKi9cbiAgICBDb250YWluZXIucHJvdG90eXBlLnJlbW92ZUNvbnRlbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuY29udGVudCA9IG51bGw7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgcmV0dXJuIENvbnRhaW5lcjtcbn0od21sX3J1bnRpbWVfMS5Db21wb25lbnQpKTtcbmV4cG9ydHMuQ29udGFpbmVyID0gQ29udGFpbmVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Q29udGFpbmVyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5ISURERU4gPSAnLWhpZGRlbic7XG5leHBvcnRzLkRJU0FCTEVEID0gJy1kaXNhYmxlZCc7XG5leHBvcnRzLk9OID0gJy1vbic7XG5leHBvcnRzLk9GRiA9ICctb2ZmJztcbmV4cG9ydHMuU1BBQ0VEID0gJy1zcGFjZWQnO1xuZXhwb3J0cy5ERUZBVUxUID0gJy1kZWZhdWx0JztcbmV4cG9ydHMuUFJJTUFSWSA9ICctcHJpbWFyeSc7XG5leHBvcnRzLlNVQ0NFU1MgPSAnLXN1Y2Nlc3MnO1xuZXhwb3J0cy5JTkZPID0gJy1pbmZvJztcbmV4cG9ydHMuV0FSTklORyA9ICctd2FybmluZyc7XG5leHBvcnRzLkRBTkdFUiA9ICctZGFuZ2VyJztcbmV4cG9ydHMuTEFSR0UgPSAnLWxhcmdlJztcbmV4cG9ydHMuU01BTEwgPSAnLXNtYWxsJztcbmV4cG9ydHMuRVhUUkFfU01BTEwgPSAnLWV4dHJhLXNtYWxsJztcbmV4cG9ydHMuQUNUSVZFID0gJ2FjdGl2ZSc7IC8vQHRvZG86IHJlZmFjdG9yIHRvIGZsYWcgc3ludGF4XG5leHBvcnRzLkRSQVdFUl9MQVlPVVQgPSAnd3ctZHJhd2VyLWxheW91dCc7XG5leHBvcnRzLkRSQVdFUiA9ICd3dy1kcmF3ZXInO1xuZXhwb3J0cy5EUkFXRVJfQ09OVEVOVCA9ICd3dy1kcmF3ZXJfX2NvbnRlbnQnO1xuZXhwb3J0cy5EUkFXRVJfUFVTSEFCTEUgPSAnLWRyYXdlci1wdXNoYWJsZSc7XG5leHBvcnRzLkRSQVdFUl9QVVNIQUJMRV9GSVhFRCA9ICctZHJhd2VyLXB1c2hhYmxlLWZpeGVkJztcbmV4cG9ydHMuQUNUSU9OX0FSRUEgPSAnd3ctYWN0aW9uLWFyZWEnO1xuZXhwb3J0cy5BQ1RJT05fQVJFQV9DT05URU5UID0gJ3d3LWFjdGlvbi1hcmVhX19jb250ZW50JztcbmV4cG9ydHMuTUFJTl9WSUVXID0gJ3d3LW1haW4tdmlldyc7XG5leHBvcnRzLk1FTlVfQlVUVE9OID0gJ3d3LW1lbnUtYnV0dG9uJztcbmV4cG9ydHMuQlVUVE9OID0gJ3d3LWJ1dHRvbic7XG5leHBvcnRzLkJVVFRPTl9HUk9VUCA9ICd3dy1idXR0b24tZ3JvdXAnO1xuLy9AdG9kbzogcmVmYWN0b3IgdGhpcyB0byBiZSBpbmxpbmUgd2l0aCBvdGhlciBjbGFzcyBuYW1lc1xuZXhwb3J0cy5HUklEX0NPTlRBSU5FUiA9ICdjb250YWluZXItZmx1aWQnO1xuZXhwb3J0cy5HUklEX0NPTFVNTiA9ICcnO1xuZXhwb3J0cy5HUklEX1JPVyA9ICdyb3cnO1xuZXhwb3J0cy5QQU5FTCA9ICd3dy1wYW5lbCc7XG5leHBvcnRzLlBBTkVMX0hFQURFUiA9ICd3dy1wYW5lbF9faGVhZGVyJztcbmV4cG9ydHMuUEFORUxfQk9EWSA9ICd3dy1wYW5lbF9fYm9keSc7XG5leHBvcnRzLlBBTkVMX0ZPT1RFUiA9ICd3dy1wYW5lbF9fZm9vdGVyJztcbmV4cG9ydHMuTU9EQUwgPSAnd3ctbW9kYWwnO1xuZXhwb3J0cy5NT0RBTF9ESUFMT0cgPSAnd3ctbW9kYWxfX2RpYWxvZyc7XG5leHBvcnRzLk1PREFMX0NPTlRFTlQgPSAnd3ctbW9kYWxfX2NvbnRlbnQnO1xuZXhwb3J0cy5NT0RBTF9IRUFERVIgPSAnd3ctbW9kYWxfX2hlYWRlcic7XG5leHBvcnRzLk1PREFMX0JPRFkgPSAnd3ctbW9kYWxfX2JvZHknO1xuZXhwb3J0cy5NT0RBTF9GT09URVIgPSAnd3ctbW9hZGxfX2Zvb3Rlcic7XG5leHBvcnRzLkZPUk1fR1JPVVAgPSAnZm9ybS1ncm91cCc7XG5leHBvcnRzLkNPTlRST0xfTEFCRUwgPSAnY29udHJvbC1sYWJlbCc7XG5leHBvcnRzLklOUFVUID0gJ2Zvcm0tY29udHJvbCc7XG5leHBvcnRzLlRFWFRBUkVBID0gJ2Zvcm0tY29udHJvbCc7XG5leHBvcnRzLlNFTEVDVCA9ICdmb3JtLWNvbnRyb2wnO1xuZXhwb3J0cy5UQUJTID0gJ25hdiBuYXYtdGFicyc7IC8vQHRvZG8gdW4tYm9vdHN0cmFwXG5leHBvcnRzLlNXSVRDSCA9ICd3dy1zd2l0Y2gnO1xuZXhwb3J0cy5TV0lUQ0hfU0xJREVSID0gJ3d3LXN3aXRjaF9fc2xpZGVyJztcbmV4cG9ydHMuVEFCTEUgPSAndGFibGUnOyAvL0B0b2RvIHVuLWJvb3RzdHJhcFxuZXhwb3J0cy5UUkVFX05BViA9ICd0cmVlLW5hdic7XG5leHBvcnRzLlRSRUVfTkFWX0xJU1QgPSAndHJlZS1uYXZfX2xpc3QnO1xuZXhwb3J0cy5UUkVFX05BVl9MSVNUX0lURU0gPSAndHJlZS1uYXZfX2l0ZW0nO1xuZXhwb3J0cy5CUkVBRF9DUlVNQlMgPSAnYnJlYWRjcnVtYic7IC8vQHRvZG8gdW4tYm9vdHN0cmFwXG5leHBvcnRzLkJSRUFEX0NSVU1CU19DUlVNQiA9IGV4cG9ydHMuQlJFQURfQ1JVTUJTICsgXCJfX2NydW1iXCI7XG5leHBvcnRzLkFVVE9DT01QTEVURSA9ICd3YXQta2l0LWF1dG9jb21wbGV0ZSc7XG5leHBvcnRzLkFVVE9DT01QTEVURV9DT05UQUlORVIgPSAnd2F0LWtpdC1hdXRvY29tcGxldGUtY29udGFpbmVyJztcbmV4cG9ydHMuQVVUT0NPTVBMRVRFX0lOUFVUX0FSRUEgPSAnd2F0LWtpdC1hdXRvY29tcGxldGUtaW5wdXQtYXJlYSc7XG5leHBvcnRzLkFVVE9DT01QTEVURV9JTlBVVCA9ICd3YXQta2l0LWF1dG9jb21wbGV0ZS1pbnB1dCc7XG5leHBvcnRzLkFVVE9DT01QTEVURV9PUFRJT05TID0gJ3dhdC1raXQtYXV0b2NvbXBsZXRlLW9wdGlvbnMnO1xuZXhwb3J0cy5BVVRPQ09NUExFVEVfSVRFTV9XUkFQUEVSID0gJ3dhdC1raXQtYXV0by1jb21wbGV0ZS1pdGVtLXdyYXBwZXInO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9U3R5bGVzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHV0aWwgPSByZXF1aXJlKFwiLi91dGlsXCIpO1xuZXhwb3J0cy51dGlsID0gdXRpbDtcbnZhciBTdHlsZXMgPSByZXF1aXJlKFwiLi9TdHlsZXNcIik7XG5leHBvcnRzLlN0eWxlcyA9IFN0eWxlcztcbnZhciBDb250YWluZXJfMSA9IHJlcXVpcmUoXCIuL0NvbnRhaW5lclwiKTtcbmV4cG9ydHMuQ29udGFpbmVyID0gQ29udGFpbmVyXzEuQ29udGFpbmVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIGNvbWJpbmUgdGhlIG1lbWJlcnMgb2YgYW4gYXJyYXkgaW50byBvbmUgc3RyaW5nLlxuICovXG5leHBvcnRzLmNvbWJpbmUgPSBmdW5jdGlvbiAoc3RyLCBqb2luZXIpIHtcbiAgICBpZiAoam9pbmVyID09PSB2b2lkIDApIHsgam9pbmVyID0gJyAnOyB9XG4gICAgcmV0dXJuIHN0ci5maWx0ZXIoZnVuY3Rpb24gKHMpIHsgcmV0dXJuICgocyAhPSBudWxsKSB8fCBzICE9ICcnKTsgfSkuam9pbihqb2luZXIpO1xufTtcbi8qKlxuICogbm9vcFxuICovXG5leHBvcnRzLm5vb3AgPSBmdW5jdGlvbiAoKSB7IH07XG4vKipcbiAqIHJlYWQgYSB2YWx1ZSBmcm9tIHRoZSBjb250ZXh0IGF0dHJpYnV0ZXNcbiAqL1xuZXhwb3J0cy5yZWFkID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBfID0gW107XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgX1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5hdHRyaWJ1dGVzLnJlYWQuYXBwbHkodGhpcy5hdHRyaWJ1dGVzLCBhcmd1bWVudHMpO1xufTtcbi8qKlxuICogcmVwbGFjZUNvbnRlbnRcbiAqL1xuZXhwb3J0cy5yZXBsYWNlQ29udGVudCA9IGZ1bmN0aW9uIChyLCBub2RlKSB7XG4gICAgd2hpbGUgKG5vZGUubGFzdENoaWxkKVxuICAgICAgICBub2RlLnJlbW92ZUNoaWxkKG5vZGUubGFzdENoaWxkKTtcbiAgICBub2RlLmFwcGVuZENoaWxkKHIucmVuZGVyKCkpO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXV0aWwuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBjb21tb24gPSByZXF1aXJlKFwid21sLXdpZGdldHMtY29tbW9uXCIpO1xudmFyIGFjdGlvbl9hcmVhXzEgPSByZXF1aXJlKFwiLi93bWwvYWN0aW9uX2FyZWFcIik7XG4vKipcbiAqIEFjdGlvbkFyZWFcbiAqL1xudmFyIEFjdGlvbkFyZWEgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhBY3Rpb25BcmVhLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEFjdGlvbkFyZWEoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IGFjdGlvbl9hcmVhXzEuTWFpbihfdGhpcyk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIEFjdGlvbkFyZWE7XG59KGNvbW1vbi5Db250YWluZXIpKTtcbmV4cG9ydHMuQWN0aW9uQXJlYSA9IEFjdGlvbkFyZWE7XG5leHBvcnRzLmRlZmF1bHQgPSBBY3Rpb25BcmVhO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QWN0aW9uQXJlYS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHdtbF9ydW50aW1lXzEgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC1ydW50aW1lXCIpO1xudmFyIFN0eWxlcyA9IHJlcXVpcmUoXCJ3bWwtd2lkZ2V0cy1jb21tb24vU3R5bGVzXCIpO1xudmFyIHV0aWxfMSA9IHJlcXVpcmUoXCJ3bWwtd2lkZ2V0cy1jb21tb24vdXRpbFwiKTtcbnZhciBNYWluID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoTWFpbiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBNYWluKGNvbnRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29udGV4dCkgfHwgdGhpcztcbiAgICAgICAgdmFyIHZpZXcgPSBfdGhpcztcbiAgICAgICAgX3RoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogdXRpbF8xLmNvbWJpbmUoW1N0eWxlcy5BQ1RJT05fQVJFQSwgU3R5bGVzLkRSQVdFUl9QVVNIQUJMRV9GSVhFRF0pIH0sIHdtbDoge30gfSwgW3dtbF9ydW50aW1lXzEubm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6IFN0eWxlcy5BQ1RJT05fQVJFQV9DT05URU5UIH0sIHdtbDogeyAnaWQnOiBcImNvbnRlbnRcIiB9IH0sIFt3bWxfcnVudGltZV8xLmRvbWlmeSh0aGlzLmNoaWxkcmVuKV0sIHZpZXcpXSwgdmlldyk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIE1haW47XG59KHdtbF9ydW50aW1lXzEuQXBwVmlldykpO1xuZXhwb3J0cy5NYWluID0gTWFpbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFjdGlvbl9hcmVhLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgd21sX3J1bnRpbWVfMSA9IHJlcXVpcmUoXCJAcXVlbmsvd21sLXJ1bnRpbWVcIik7XG52YXIgbGF5b3V0ID0gcmVxdWlyZShcIi4vd21sL2JyZWFkY3J1bWJzXCIpO1xuO1xuLyoqXG4gKiBCcmVhZENydW1iXG4gKi9cbnZhciBCcmVhZENydW1icyA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEJyZWFkQ3J1bWJzLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEJyZWFkQ3J1bWJzKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMudmlldyA9IG5ldyBsYXlvdXQuQnJlYWRDcnVtYnMoX3RoaXMpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBCcmVhZENydW1icztcbn0od21sX3J1bnRpbWVfMS5Db21wb25lbnQpKTtcbmV4cG9ydHMuQnJlYWRDcnVtYnMgPSBCcmVhZENydW1icztcbi8qKlxuICogQ3J1bWJcbiAqL1xudmFyIENydW1iID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQ3J1bWIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQ3J1bWIoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IGxheW91dC5DcnVtYihfdGhpcyk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIENydW1iO1xufSh3bWxfcnVudGltZV8xLkNvbXBvbmVudCkpO1xuZXhwb3J0cy5DcnVtYiA9IENydW1iO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB3bWxfcnVudGltZV8xID0gcmVxdWlyZShcIkBxdWVuay93bWwtcnVudGltZVwiKTtcbnZhciB1dGlsXzEgPSByZXF1aXJlKFwid21sLXdpZGdldHMtY29tbW9uL3V0aWxcIik7XG52YXIgU3R5bGVzID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi9TdHlsZXNcIik7XG52YXIgQnJlYWRDcnVtYnMgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhCcmVhZENydW1icywgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBCcmVhZENydW1icyhjb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbnRleHQpIHx8IHRoaXM7XG4gICAgICAgIHZhciB2aWV3ID0gX3RoaXM7XG4gICAgICAgIF90aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgnb2wnLCB7IGh0bWw6IHsgJ2NsYXNzJzogdXRpbF8xLmNvbWJpbmUoW1N0eWxlcy5CUkVBRF9DUlVNQlMsIHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpjbGFzcycpXSkgfSwgd21sOiB7fSB9LCBbd21sX3J1bnRpbWVfMS5kb21pZnkodGhpcy5jaGlsZHJlbildLCB2aWV3KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gQnJlYWRDcnVtYnM7XG59KHdtbF9ydW50aW1lXzEuQXBwVmlldykpO1xuZXhwb3J0cy5CcmVhZENydW1icyA9IEJyZWFkQ3J1bWJzO1xudmFyIENydW1iID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQ3J1bWIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQ3J1bWIoY29udGV4dCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBjb250ZXh0KSB8fCB0aGlzO1xuICAgICAgICB2YXIgdmlldyA9IF90aGlzO1xuICAgICAgICBfdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB3bWxfcnVudGltZV8xLm5vZGUoJ2xpJywgeyBodG1sOiB7ICdjbGFzcyc6IHV0aWxfMS5jb21iaW5lKFtTdHlsZXMuQlJFQURfQ1JVTUJTX0NSVU1CLCB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6Y2xhc3MnKV0pIH0sIHdtbDoge30gfSwgW3dtbF9ydW50aW1lXzEubm9kZSgnYScsIHsgaHRtbDogeyAnY2xhc3MnOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6YW5jaG9yQ2xhc3MnLCBudWxsKSwgJ29uQ2xpY2snOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6b25DbGljaycsIG51bGwpLCAnaHJlZic6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpocmVmJykgfSwgd21sOiB7fSB9LCBbd21sX3J1bnRpbWVfMS5kb21pZnkodGhpcy5jaGlsZHJlbildLCB2aWV3KV0sIHZpZXcpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBDcnVtYjtcbn0od21sX3J1bnRpbWVfMS5BcHBWaWV3KSk7XG5leHBvcnRzLkNydW1iID0gQ3J1bWI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1icmVhZGNydW1icy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHdtbF9ydW50aW1lXzEgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC1ydW50aW1lXCIpO1xudmFyIGJ1c3lfaW5kaWNhdG9yXzEgPSByZXF1aXJlKFwiLi93bWwvYnVzeV9pbmRpY2F0b3JcIik7XG4vKipcbiAqIEJ1c3lJbmRpY2F0b3IgcHJvdmlkZXMgYSAnaGFtYnVyZ2VyJyBtZW51IGJ1dHRvbi5cbiAqL1xudmFyIEJ1c3lJbmRpY2F0b3IgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhCdXN5SW5kaWNhdG9yLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEJ1c3lJbmRpY2F0b3IoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IGJ1c3lfaW5kaWNhdG9yXzEuTWFpbihfdGhpcyk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIEJ1c3lJbmRpY2F0b3I7XG59KHdtbF9ydW50aW1lXzEuQ29tcG9uZW50KSk7XG5leHBvcnRzLkJ1c3lJbmRpY2F0b3IgPSBCdXN5SW5kaWNhdG9yO1xuZXhwb3J0cy5kZWZhdWx0ID0gQnVzeUluZGljYXRvcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUJ1c3lJbmRpY2F0b3IuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB3bWxfcnVudGltZV8xID0gcmVxdWlyZShcIkBxdWVuay93bWwtcnVudGltZVwiKTtcbnZhciBNYWluID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoTWFpbiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBNYWluKGNvbnRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29udGV4dCkgfHwgdGhpcztcbiAgICAgICAgdmFyIHZpZXcgPSBfdGhpcztcbiAgICAgICAgX3RoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogXCJsb2FkaW5nXCIgfSwgd21sOiB7fSB9LCBbXSwgdmlldyk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIE1haW47XG59KHdtbF9ydW50aW1lXzEuQXBwVmlldykpO1xuZXhwb3J0cy5NYWluID0gTWFpbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJ1c3lfaW5kaWNhdG9yLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgY29tbW9uID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vblwiKTtcbnZhciB2aWV3cyA9IHJlcXVpcmUoXCIuL3dtbC9idXR0b25cIik7XG52YXIgU3R5bGVzID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi9TdHlsZXNcIik7XG4vKipcbiAqIEdyb3VwIG11bHRpcGxlIGJ1dHRvbnMgaW50byBvbmUgZWxlbWVudC5cbiAqL1xudmFyIEdyb3VwID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoR3JvdXAsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gR3JvdXAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IHZpZXdzLkdyb3VwKF90aGlzKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBHcm91cC5wcm90b3R5cGUuZ2V0Q2xhc3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBsaXN0ID0gW1N0eWxlcy5CVVRUT05fR1JPVVBdO1xuICAgICAgICBpZiAodGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmNsYXNzJykpXG4gICAgICAgICAgICBsaXN0LnB1c2godGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmNsYXNzJykpO1xuICAgICAgICBpZiAodGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OnNwYWNlZCcpKVxuICAgICAgICAgICAgbGlzdC5wdXNoKFN0eWxlcy5TUEFDRUQpO1xuICAgICAgICByZXR1cm4gbGlzdC5qb2luKCcgJyk7XG4gICAgfTtcbiAgICByZXR1cm4gR3JvdXA7XG59KGNvbW1vbi5Db250YWluZXIpKTtcbmV4cG9ydHMuR3JvdXAgPSBHcm91cDtcbjtcbi8qKlxuICogQnV0dG9uIGlzIGFuIGltcHJvdmVtZW50IG92ZXIgSFRNTEJ1dHRpb25FbGVtZW50XG4gKi9cbnZhciBCdXR0b24gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhCdXR0b24sIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQnV0dG9uKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMudmlldyA9IG5ldyB2aWV3cy5CdXR0b24oX3RoaXMpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIGRpc2FibGUgdGhpcyBidXR0b24uXG4gICAgICovXG4gICAgQnV0dG9uLnByb3RvdHlwZS5kaXNhYmxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnZpZXcuZmluZEJ5SWQoJ2J1dHRvbicpLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIGVuYWJsZSB0aGlzIGJ1dHRvbi5cbiAgICAgKi9cbiAgICBCdXR0b24ucHJvdG90eXBlLmVuYWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy52aWV3LmZpbmRCeUlkKCdidXR0b24nKS5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG4gICAgfTtcbiAgICBCdXR0b24ucHJvdG90eXBlLnJlbmRlcmVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDpkaXNhYmxlZCcpKVxuICAgICAgICAgICAgdGhpcy52aWV3LmZpbmRCeUlkKCdidXR0b24nKS5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG4gICAgfTtcbiAgICByZXR1cm4gQnV0dG9uO1xufShjb21tb24uQ29udGFpbmVyKSk7XG5leHBvcnRzLkJ1dHRvbiA9IEJ1dHRvbjtcbmV4cG9ydHMuZGVmYXVsdCA9IEJ1dHRvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUJ1dHRvbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHdtbF9ydW50aW1lXzEgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC1ydW50aW1lXCIpO1xudmFyIFN0eWxlcyA9IHJlcXVpcmUoXCJ3bWwtd2lkZ2V0cy1jb21tb24vU3R5bGVzXCIpO1xudmFyIHV0aWxfMSA9IHJlcXVpcmUoXCJ3bWwtd2lkZ2V0cy1jb21tb24vdXRpbFwiKTtcbnZhciBfMSA9IHJlcXVpcmUoXCIuLi8uLi9cIik7XG52YXIgR3JvdXAgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhHcm91cCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBHcm91cChjb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbnRleHQpIHx8IHRoaXM7XG4gICAgICAgIHZhciB2aWV3ID0gX3RoaXM7XG4gICAgICAgIF90aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6IHRoaXMuZ2V0Q2xhc3MoKSwgJ3JvbGUnOiBcImdyb3VwXCIgfSwgd21sOiB7fSB9LCBbd21sX3J1bnRpbWVfMS5kb21pZnkodGhpcy5jaGlsZHJlbildLCB2aWV3KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gR3JvdXA7XG59KHdtbF9ydW50aW1lXzEuQXBwVmlldykpO1xuZXhwb3J0cy5Hcm91cCA9IEdyb3VwO1xudmFyIEJ1dHRvbiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEJ1dHRvbiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBCdXR0b24oY29udGV4dCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBjb250ZXh0KSB8fCB0aGlzO1xuICAgICAgICB2YXIgdmlldyA9IF90aGlzO1xuICAgICAgICBfdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB3bWxfcnVudGltZV8xLndpZGdldChfMS5GcmFnbWVudCwgeyBodG1sOiB7fSwgd21sOiB7fSB9LCBbd21sX3J1bnRpbWVfMS5pZkUodGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmhyZWYnKSwgZnVuY3Rpb24gaWYwKCkgeyByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCdhJywgeyBodG1sOiB7ICdocmVmJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmhyZWYnKSwgJ2NsYXNzJzogdXRpbF8xLmNvbWJpbmUoW1N0eWxlcy5CVVRUT04sIHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzp2YXJpYW50JywgJycpLCB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6c2l6ZScsICcnKSwgdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OnN0eWxlJywgU3R5bGVzLkRFRkFVTFQpLCB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6Y2xhc3MnKV0pLCAnb25jbGljayc6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpvbkNsaWNrJywgdXRpbF8xLm5vb3ApIH0sIHdtbDogeyAnaWQnOiBcImJ1dHRvblwiIH0gfSwgW3dtbF9ydW50aW1lXzEuZG9taWZ5KHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzp0ZXh0JykpLCB3bWxfcnVudGltZV8xLmRvbWlmeSh0aGlzLmNoaWxkcmVuKV0sIHZpZXcpOyB9LmJpbmQodGhpcyksIGZ1bmN0aW9uIGVsc2VfY2xhdXNlMCgpIHsgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgnYnV0dG9uJywgeyBodG1sOiB7ICd0eXBlJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OnR5cGUnLCAnYnV0dG9uJyksICduYW1lJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3Om5hbWUnLCAnJyksICdkaXNhYmxlZCc6ICh0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6ZGlzYWJsZWQnKSkgPyBcInRydWVcIiA6IG51bGwsICdjbGFzcyc6IHV0aWxfMS5jb21iaW5lKFtTdHlsZXMuQlVUVE9OLCB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6dmFyaWFudCcsICcnKSwgdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OnNpemUnLCAnJyksIHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpzdHlsZScsIFN0eWxlcy5ERUZBVUxUKSwgdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmNsYXNzJyldKSwgJ29uY2xpY2snOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6b25DbGljaycsIHV0aWxfMS5ub29wKSB9LCB3bWw6IHsgJ2lkJzogXCJidXR0b25cIiB9IH0sIFt3bWxfcnVudGltZV8xLmRvbWlmeSh0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6dGV4dCcpKSwgd21sX3J1bnRpbWVfMS5kb21pZnkodGhpcy5jaGlsZHJlbildLCB2aWV3KTsgfS5iaW5kKHRoaXMpKV0sIHZpZXcpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBCdXR0b247XG59KHdtbF9ydW50aW1lXzEuQXBwVmlldykpO1xuZXhwb3J0cy5CdXR0b24gPSBCdXR0b247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1idXR0b24uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB3bWxfcnVudGltZV8xID0gcmVxdWlyZShcIkBxdWVuay93bWwtcnVudGltZVwiKTtcbnZhciBsYXlvdXQgPSByZXF1aXJlKFwiLi93bWwvY2FyZFwiKTtcbjtcbi8qKlxuICogQ2FyZFxuICovXG52YXIgQ2FyZCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKENhcmQsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQ2FyZCgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnZpZXcgPSBuZXcgbGF5b3V0LkNhcmQoX3RoaXMpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBDYXJkO1xufSh3bWxfcnVudGltZV8xLkNvbXBvbmVudCkpO1xuZXhwb3J0cy5DYXJkID0gQ2FyZDtcbi8qKlxuICogQ2FyZEJvZHlcbiAqL1xudmFyIENhcmRCb2R5ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQ2FyZEJvZHksIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQ2FyZEJvZHkoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IGxheW91dC5DYXJkQm9keShfdGhpcyk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIENhcmRCb2R5O1xufSh3bWxfcnVudGltZV8xLkNvbXBvbmVudCkpO1xuZXhwb3J0cy5DYXJkQm9keSA9IENhcmRCb2R5O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Q2FyZC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHdtbF9ydW50aW1lXzEgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC1ydW50aW1lXCIpO1xudmFyIHV0aWxfMSA9IHJlcXVpcmUoXCJ3bWwtd2lkZ2V0cy1jb21tb24vdXRpbFwiKTtcbnZhciBDYXJkID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQ2FyZCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBDYXJkKGNvbnRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29udGV4dCkgfHwgdGhpcztcbiAgICAgICAgdmFyIHZpZXcgPSBfdGhpcztcbiAgICAgICAgX3RoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogdXRpbF8xLmNvbWJpbmUoW1wiY2FyZFwiLCB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6Y2xhc3MnKV0pIH0sIHdtbDoge30gfSwgW3dtbF9ydW50aW1lXzEuZG9taWZ5KHRoaXMuY2hpbGRyZW4pXSwgdmlldyk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIENhcmQ7XG59KHdtbF9ydW50aW1lXzEuQXBwVmlldykpO1xuZXhwb3J0cy5DYXJkID0gQ2FyZDtcbnZhciBDYXJkQm9keSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKENhcmRCb2R5LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIENhcmRCb2R5KGNvbnRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29udGV4dCkgfHwgdGhpcztcbiAgICAgICAgdmFyIHZpZXcgPSBfdGhpcztcbiAgICAgICAgX3RoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogdXRpbF8xLmNvbWJpbmUoW1wiY2FyZC1ib2R5XCIsIHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpjbGFzcycpXSkgfSwgd21sOiB7fSB9LCBbd21sX3J1bnRpbWVfMS5kb21pZnkodGhpcy5jaGlsZHJlbildLCB2aWV3KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gQ2FyZEJvZHk7XG59KHdtbF9ydW50aW1lXzEuQXBwVmlldykpO1xuZXhwb3J0cy5DYXJkQm9keSA9IENhcmRCb2R5O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y2FyZC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGNvbW1vbiA9IHJlcXVpcmUoXCJ3bWwtd2lkZ2V0cy1jb21tb25cIik7XG52YXIgZHJhd2VyX2xheW91dF8xID0gcmVxdWlyZShcIi4vd21sL2RyYXdlci1sYXlvdXRcIik7XG47XG4vKipcbiAqIERyYXdlckxheW91dCBwcm92aWRlcyBhIHRvcCBsZXZlbCBsYXlvdXQgY29uc2lzdGluZyBvZiBhIGRyYXdlciBhbmRcbiAqIGEgbWFpbiBjb250ZW50IHZpZXcuXG4gKi9cbnZhciBEcmF3ZXJMYXlvdXQgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhEcmF3ZXJMYXlvdXQsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gRHJhd2VyTGF5b3V0KCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMudmlldyA9IG5ldyBkcmF3ZXJfbGF5b3V0XzEuTWFpbihfdGhpcyk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgRHJhd2VyTGF5b3V0LnByb3RvdHlwZS5fZ2V0RHJhd2VyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52aWV3LmZpbmRCeUlkKCdkcmF3ZXInKTtcbiAgICB9O1xuICAgIERyYXdlckxheW91dC5wcm90b3R5cGUuX2NvbWJpbmUgPSBmdW5jdGlvbiAoY2xhc3Nlcykge1xuICAgICAgICByZXR1cm4gY2xhc3Nlcy5qb2luKCcgJyk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBkcmF3ZXJWaXNpYmxlIHF1ZXJpZXMgd2hldGhlciB0aGUgRHJhd2VyIGlzIHZpc2libGUgb3Igbm90LlxuICAgICAqL1xuICAgIERyYXdlckxheW91dC5wcm90b3R5cGUuZHJhd2VyVmlzaWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldERyYXdlcigpLnZpc2libGUoKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIGhpZGVEcmF3ZXIgaGlkZXMgdGhlIGRyYXdlci5cbiAgICAgKi9cbiAgICBEcmF3ZXJMYXlvdXQucHJvdG90eXBlLmhpZGVEcmF3ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXREcmF3ZXIoKS5oaWRlKCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBzaG93RHJhd2VyIHNob3dzIHRoZSBkcmF3ZXJcbiAgICAgKi9cbiAgICBEcmF3ZXJMYXlvdXQucHJvdG90eXBlLnNob3dEcmF3ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXREcmF3ZXIoKS5zaG93KCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiB0b2dnbGUgdGhlIHZpc2liaWxpdHkgb2YgdGhpcyBEcmF3ZXJcbiAgICAgKi9cbiAgICBEcmF3ZXJMYXlvdXQucHJvdG90eXBlLnRvZ2dsZURyYXdlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldERyYXdlcigpLnRvZ2dsZSgpO1xuICAgIH07XG4gICAgcmV0dXJuIERyYXdlckxheW91dDtcbn0oY29tbW9uLkNvbnRhaW5lcikpO1xuZXhwb3J0cy5EcmF3ZXJMYXlvdXQgPSBEcmF3ZXJMYXlvdXQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1EcmF3ZXJMYXlvdXQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB3bWxfcnVudGltZV8xID0gcmVxdWlyZShcIkBxdWVuay93bWwtcnVudGltZVwiKTtcbnZhciBTdHlsZXMgPSByZXF1aXJlKFwid21sLXdpZGdldHMtY29tbW9uL1N0eWxlc1wiKTtcbnZhciBEcmF3ZXJfMSA9IHJlcXVpcmUoXCIuLi8uLi9kcmF3ZXIvRHJhd2VyXCIpO1xudmFyIE1haW4gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhNYWluLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIE1haW4oY29udGV4dCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBjb250ZXh0KSB8fCB0aGlzO1xuICAgICAgICB2YXIgdmlldyA9IF90aGlzO1xuICAgICAgICBfdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB3bWxfcnVudGltZV8xLm5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiBTdHlsZXMuRFJBV0VSX0xBWU9VVCB9LCB3bWw6IHsgJ2lkJzogXCJjb250ZW50XCIgfSB9LCBbd21sX3J1bnRpbWVfMS53aWRnZXQoRHJhd2VyXzEuRHJhd2VyLCB7IGh0bWw6IHt9LCB3bWw6IHsgJ2lkJzogXCJkcmF3ZXJcIiB9LCB3dzogeyAnY29udGVudCc6IHRoaXMuYXR0cmlidXRlcy5yZWFkKFwid3c6ZHJhd2VyXCIpIH0gfSwgW10sIHZpZXcpLCB3bWxfcnVudGltZV8xLmlmRSh0aGlzLmNvbnRlbnQsIGZ1bmN0aW9uIGlmMSgpIHsgcmV0dXJuIHdtbF9ydW50aW1lXzEuZG9taWZ5KHRoaXMuY29udGVudCk7IH0uYmluZCh0aGlzKSwgZnVuY3Rpb24gZWxzZWlmMCgpIHsgcmV0dXJuIHdtbF9ydW50aW1lXzEuaWZFKHRoaXMuYXR0cmlidXRlcy5yZWFkKFwid3c6Y29udGVudFwiKSwgZnVuY3Rpb24gaWYwKCkgeyByZXR1cm4gdGhpcy5hdHRyaWJ1dGVzLnJlYWQoXCJ3dy5jb250ZW50XCIpLmNhbGwodGhpcywgdmlldyk7IH0uYmluZCh0aGlzKSwgZnVuY3Rpb24gZWxzZV9jbGF1c2UxKCkgeyByZXR1cm4gd21sX3J1bnRpbWVfMS5kb21pZnkodGhpcy5jaGlsZHJlbik7IH0uYmluZCh0aGlzKSk7IH0uYmluZCh0aGlzKSldLCB2aWV3KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gTWFpbjtcbn0od21sX3J1bnRpbWVfMS5BcHBWaWV3KSk7XG5leHBvcnRzLk1haW4gPSBNYWluO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZHJhd2VyLWxheW91dC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHdtbF9ydW50aW1lXzEgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC1ydW50aW1lXCIpO1xudmFyIFN0eWxlcyA9IHJlcXVpcmUoXCJ3bWwtd2lkZ2V0cy1jb21tb24vU3R5bGVzXCIpO1xudmFyIGRyYXdlcl8xID0gcmVxdWlyZShcIi4vd21sL2RyYXdlclwiKTtcbjtcbi8qKlxuICogRHJhd2VyIHByb3ZpZGVzIGFuIGFyZWEgZm9yIG5hdmlnYXRpb24gY29udGVudC5cbiAqL1xudmFyIERyYXdlciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKERyYXdlciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBEcmF3ZXIoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IGRyYXdlcl8xLk1haW4oX3RoaXMpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIERyYXdlci5wcm90b3R5cGUuX2dldERyYXdlckRPTSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmlldy5maW5kQnlJZCgnZHJhd2VyJyk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiB2aXNpYmxlIHF1ZXJpZXMgd2hldGhlciB0aGUgRHJhd2VyIGlzIHZpc2libGUgb3Igbm90LlxuICAgICAqL1xuICAgIERyYXdlci5wcm90b3R5cGUudmlzaWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLl9nZXREcmF3ZXJET00oKS5jbGFzc0xpc3QuY29udGFpbnMoU3R5bGVzLkhJRERFTik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBoaWRlIHRoZSBkcmF3ZXIuXG4gICAgICovXG4gICAgRHJhd2VyLnByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy52aXNpYmxlKCkpXG4gICAgICAgICAgICB0aGlzLl9nZXREcmF3ZXJET00oKS5jbGFzc0xpc3QuYWRkKFN0eWxlcy5ISURERU4pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogc2hvd0RyYXdlciBzaG93cyB0aGUgZHJhd2VyXG4gICAgICovXG4gICAgRHJhd2VyLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMudmlzaWJsZSgpKVxuICAgICAgICAgICAgdGhpcy5fZ2V0RHJhd2VyRE9NKCkuY2xhc3NMaXN0LnJlbW92ZShTdHlsZXMuSElEREVOKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIHRvZ2dsZSB0aGUgdmlzaWJpbGl0eSBvZiB0aGlzIERyYXdlclxuICAgICAqL1xuICAgIERyYXdlci5wcm90b3R5cGUudG9nZ2xlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9nZXREcmF3ZXJET00oKS5jbGFzc0xpc3QudG9nZ2xlKFN0eWxlcy5ISURERU4pO1xuICAgIH07XG4gICAgcmV0dXJuIERyYXdlcjtcbn0od21sX3J1bnRpbWVfMS5Db21wb25lbnQpKTtcbmV4cG9ydHMuRHJhd2VyID0gRHJhd2VyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RHJhd2VyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgd21sX3J1bnRpbWVfMSA9IHJlcXVpcmUoXCJAcXVlbmsvd21sLXJ1bnRpbWVcIik7XG52YXIgU3R5bGVzID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi9TdHlsZXNcIik7XG52YXIgTWFpbiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKE1haW4sIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gTWFpbihjb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbnRleHQpIHx8IHRoaXM7XG4gICAgICAgIHZhciB2aWV3ID0gX3RoaXM7XG4gICAgICAgIF90aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6IFN0eWxlcy5EUkFXRVIgfSwgd21sOiB7ICdpZCc6IFwiZHJhd2VyXCIgfSB9LCBbd21sX3J1bnRpbWVfMS5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogU3R5bGVzLkRSQVdFUl9DT05URU5UIH0sIHdtbDoge30gfSwgW3dtbF9ydW50aW1lXzEuaWZFKHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpjb250ZW50JyksIGZ1bmN0aW9uIGlmMigpIHsgcmV0dXJuIHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpjb250ZW50JykuY2FsbCh0aGlzLCB2aWV3KTsgfS5iaW5kKHRoaXMpLCBmdW5jdGlvbiBlbHNlX2NsYXVzZTIoKSB7IHJldHVybiB3bWxfcnVudGltZV8xLmRvbWlmeSh0aGlzLmNoaWxkcmVuKTsgfS5iaW5kKHRoaXMpKV0sIHZpZXcpXSwgdmlldyk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIE1haW47XG59KHdtbF9ydW50aW1lXzEuQXBwVmlldykpO1xuZXhwb3J0cy5NYWluID0gTWFpbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRyYXdlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHdtbF9ydW50aW1lXzEgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC1ydW50aW1lXCIpO1xudmFyIEZyYWdtZW50ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoRnJhZ21lbnQsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gRnJhZ21lbnQoKSB7XG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICB9XG4gICAgRnJhZ21lbnQucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoYykgeyByZXR1cm4gZnJhZy5hcHBlbmRDaGlsZChjKTsgfSk7XG4gICAgICAgIHJldHVybiBmcmFnO1xuICAgIH07XG4gICAgcmV0dXJuIEZyYWdtZW50O1xufSh3bWxfcnVudGltZV8xLkNvbXBvbmVudCkpO1xuZXhwb3J0cy5GcmFnbWVudCA9IEZyYWdtZW50O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RnJhZ21lbnQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB3bWxfcnVudGltZV8xID0gcmVxdWlyZShcIkBxdWVuay93bWwtcnVudGltZVwiKTtcbnZhciBTdHlsZXMgPSByZXF1aXJlKFwid21sLXdpZGdldHMtY29tbW9uL1N0eWxlc1wiKTtcbnZhciB2aWV3cyA9IHJlcXVpcmUoXCIuL3dtbC9ncmlkXCIpO1xuO1xuLyoqXG4gKiBDb250YWluZXJcbiAqL1xudmFyIENvbnRhaW5lciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKENvbnRhaW5lciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBDb250YWluZXIoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IHZpZXdzLkNvbnRhaW5lcihfdGhpcyk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIENvbnRhaW5lcjtcbn0od21sX3J1bnRpbWVfMS5Db21wb25lbnQpKTtcbmV4cG9ydHMuQ29udGFpbmVyID0gQ29udGFpbmVyO1xudmFyIFJvdyA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFJvdywgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBSb3coKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IHZpZXdzLlJvdyhfdGhpcyk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIFJvdztcbn0od21sX3J1bnRpbWVfMS5Db21wb25lbnQpKTtcbmV4cG9ydHMuUm93ID0gUm93O1xudmFyIENvbHVtbiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKENvbHVtbiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBDb2x1bW4oKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IHZpZXdzLkNvbHVtbihfdGhpcyk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgQ29sdW1uLnByb3RvdHlwZS5fZ2V0Q2xhc3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjbGFzc2VzID0gW1N0eWxlcy5HUklEX0NPTFVNTl07XG4gICAgICAgIHZhciBzaXplID0gdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OnNpemUnLCAnbWQnKTtcbiAgICAgICAgdmFyIHdpZHRoID0gdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OndpZHRoJywgMTIpO1xuICAgICAgICB2YXIgb2Zmc2V0ID0gdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3Om9mZnNldCcsIDApO1xuICAgICAgICBjbGFzc2VzLnB1c2goXCJjb2wtXCIgKyBzaXplICsgXCItXCIgKyB3aWR0aCk7XG4gICAgICAgIGlmIChvZmZzZXQpXG4gICAgICAgICAgICBjbGFzc2VzLnB1c2goXCJjb2wtXCIgKyBzaXplICsgXCItb2Zmc2V0LVwiICsgb2Zmc2V0KTtcbiAgICAgICAgY2xhc3Nlcy5wdXNoKHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpjbGFzcycpKTtcbiAgICAgICAgcmV0dXJuIGNsYXNzZXMuZmlsdGVyKGZ1bmN0aW9uICh2KSB7IHJldHVybiAhKHYgPT0gbnVsbCk7IH0pLmpvaW4oJyAnKTtcbiAgICB9O1xuICAgIHJldHVybiBDb2x1bW47XG59KHdtbF9ydW50aW1lXzEuQ29tcG9uZW50KSk7XG5leHBvcnRzLkNvbHVtbiA9IENvbHVtbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUdyaWQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB3bWxfcnVudGltZV8xID0gcmVxdWlyZShcIkBxdWVuay93bWwtcnVudGltZVwiKTtcbnZhciB1dGlsXzEgPSByZXF1aXJlKFwid21sLXdpZGdldHMtY29tbW9uL3V0aWxcIik7XG52YXIgU3R5bGVzID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi9TdHlsZXNcIik7XG52YXIgQ29udGFpbmVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQ29udGFpbmVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIENvbnRhaW5lcihjb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbnRleHQpIHx8IHRoaXM7XG4gICAgICAgIHZhciB2aWV3ID0gX3RoaXM7XG4gICAgICAgIF90aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgnc2VjdGlvbicsIHsgaHRtbDogeyAnY2xhc3MnOiB1dGlsXzEuY29tYmluZShbU3R5bGVzLkdSSURfQ09OVEFJTkVSLCB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6Y2xhc3MnLCAnJyldKSB9LCB3bWw6IHt9IH0sIFt3bWxfcnVudGltZV8xLmRvbWlmeSh0aGlzLmNoaWxkcmVuKV0sIHZpZXcpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBDb250YWluZXI7XG59KHdtbF9ydW50aW1lXzEuQXBwVmlldykpO1xuZXhwb3J0cy5Db250YWluZXIgPSBDb250YWluZXI7XG52YXIgUm93ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoUm93LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFJvdyhjb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbnRleHQpIHx8IHRoaXM7XG4gICAgICAgIHZhciB2aWV3ID0gX3RoaXM7XG4gICAgICAgIF90aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6IHV0aWxfMS5jb21iaW5lKFtTdHlsZXMuR1JJRF9ST1csIHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpjbGFzcycsICcnKV0pIH0sIHdtbDoge30gfSwgW3dtbF9ydW50aW1lXzEuZG9taWZ5KHRoaXMuY2hpbGRyZW4pXSwgdmlldyk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIFJvdztcbn0od21sX3J1bnRpbWVfMS5BcHBWaWV3KSk7XG5leHBvcnRzLlJvdyA9IFJvdztcbnZhciBDb2x1bW4gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhDb2x1bW4sIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQ29sdW1uKGNvbnRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29udGV4dCkgfHwgdGhpcztcbiAgICAgICAgdmFyIHZpZXcgPSBfdGhpcztcbiAgICAgICAgX3RoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogdGhpcy5fZ2V0Q2xhc3MoKSB9LCB3bWw6IHt9IH0sIFt3bWxfcnVudGltZV8xLmRvbWlmeSh0aGlzLmNoaWxkcmVuKV0sIHZpZXcpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBDb2x1bW47XG59KHdtbF9ydW50aW1lXzEuQXBwVmlldykpO1xuZXhwb3J0cy5Db2x1bW4gPSBDb2x1bW47XG4vLyMgc291cmNlTWFwcGluZ1VSTD1ncmlkLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHRhYmxlID0gcmVxdWlyZShcIi4vdGFibGUvVGFibGVcIik7XG5leHBvcnRzLnRhYmxlID0gdGFibGU7XG4vKiBqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG4vKlxuZXhwb3J0IEJyZWFkQ3J1bWJNZW51IGZyb20gJy4vYnJlYWRjcnVtYnMvQnJlYWRDcnVtYk1lbnUnO1xuZXhwb3J0IEJyZWFkQ3J1bWIgZnJvbSAnLi9icmVhZGNydW1icy9CcmVhZENydW1iJztcbmV4cG9ydCBBdXRvY29tcGxldGUgZnJvbSAnLi9hdXRvY29tcGxldGUvQXV0b2NvbXBsZXRlJztcbmV4cG9ydCBKdW1ib3Ryb24gZnJvbSAnLi9qdW1ib3Ryb24vSnVtYm90cm9uJztcbmV4cG9ydCBXZWxsIGZyb20gJy4vd2VsbC9XZWxsJztcbmV4cG9ydCBMaXN0R3JvdXAgZnJvbSAnLi9saXN0LWdyb3VwL0xpc3RHcm91cCc7XG5leHBvcnQgTGlzdEdyb3VwSXRlbSBmcm9tICcuL2xpc3QtZ3JvdXAvTGlzdEdyb3VwSXRlbSc7XG5leHBvcnQgU2VhcmNoIGZyb20gJy4vc2VhcmNoL1NlYXJjaCc7XG4qL1xudmFyIGJyZWFkY3J1bWJzXzEgPSByZXF1aXJlKFwiLi9icmVhZGNydW1ic1wiKTtcbmV4cG9ydHMuQnJlYWRDcnVtYnMgPSBicmVhZGNydW1ic18xLkJyZWFkQ3J1bWJzO1xuZXhwb3J0cy5DcnVtYiA9IGJyZWFkY3J1bWJzXzEuQ3J1bWI7XG52YXIgRnJhZ21lbnRfMSA9IHJlcXVpcmUoXCIuL2ZyYWdtZW50L0ZyYWdtZW50XCIpO1xuZXhwb3J0cy5GcmFnbWVudCA9IEZyYWdtZW50XzEuRnJhZ21lbnQ7XG52YXIgRHJhd2VyTGF5b3V0XzEgPSByZXF1aXJlKFwiLi9kcmF3ZXItbGF5b3V0L0RyYXdlckxheW91dFwiKTtcbmV4cG9ydHMuRHJhd2VyTGF5b3V0ID0gRHJhd2VyTGF5b3V0XzEuRHJhd2VyTGF5b3V0O1xudmFyIERyYXdlcl8xID0gcmVxdWlyZShcIi4vZHJhd2VyL0RyYXdlclwiKTtcbmV4cG9ydHMuRHJhd2VyID0gRHJhd2VyXzEuRHJhd2VyO1xudmFyIEFjdGlvbkFyZWFfMSA9IHJlcXVpcmUoXCIuL2FjdGlvbi1hcmVhL0FjdGlvbkFyZWFcIik7XG5leHBvcnRzLkFjdGlvbkFyZWEgPSBBY3Rpb25BcmVhXzEuQWN0aW9uQXJlYTtcbnZhciBNYWluVmlld18xID0gcmVxdWlyZShcIi4vbWFpbi12aWV3L01haW5WaWV3XCIpO1xuZXhwb3J0cy5NYWluVmlldyA9IE1haW5WaWV3XzEuTWFpblZpZXc7XG52YXIgTWVudUJ1dHRvbl8xID0gcmVxdWlyZShcIi4vbWVudS1idXR0b24vTWVudUJ1dHRvblwiKTtcbmV4cG9ydHMuTWVudUJ1dHRvbiA9IE1lbnVCdXR0b25fMS5NZW51QnV0dG9uO1xudmFyIEJ1dHRvbl8xID0gcmVxdWlyZShcIi4vYnV0dG9uL0J1dHRvblwiKTtcbmV4cG9ydHMuQnV0dG9uID0gQnV0dG9uXzEuQnV0dG9uO1xuZXhwb3J0cy5CdXR0b25Hcm91cCA9IEJ1dHRvbl8xLkdyb3VwO1xudmFyIEdyaWRfMSA9IHJlcXVpcmUoXCIuL2dyaWQvR3JpZFwiKTtcbmV4cG9ydHMuQ29udGFpbmVyID0gR3JpZF8xLkNvbnRhaW5lcjtcbmV4cG9ydHMuUm93ID0gR3JpZF8xLlJvdztcbmV4cG9ydHMuQ29sdW1uID0gR3JpZF8xLkNvbHVtbjtcbnZhciBQYW5lbF8xID0gcmVxdWlyZShcIi4vcGFuZWwvUGFuZWxcIik7XG5leHBvcnRzLlBhbmVsID0gUGFuZWxfMS5QYW5lbDtcbmV4cG9ydHMuUGFuZWxIZWFkZXIgPSBQYW5lbF8xLkhlYWRlcjtcbmV4cG9ydHMuUGFuZWxCb2R5ID0gUGFuZWxfMS5Cb2R5O1xuZXhwb3J0cy5QYW5lbEZvb3RlciA9IFBhbmVsXzEuRm9vdGVyO1xudmFyIE1vZGFsXzEgPSByZXF1aXJlKFwiLi9tb2RhbC9Nb2RhbFwiKTtcbmV4cG9ydHMuTW9kYWwgPSBNb2RhbF8xLk1vZGFsO1xuZXhwb3J0cy5Nb2RhbEhlYWRlciA9IE1vZGFsXzEuSGVhZGVyO1xuZXhwb3J0cy5Nb2RhbEJvZHkgPSBNb2RhbF8xLkJvZHk7XG5leHBvcnRzLk1vZGFsRm9vdGVyID0gTW9kYWxfMS5Gb290ZXI7XG52YXIgSW5wdXRfMSA9IHJlcXVpcmUoXCIuL2lucHV0L0lucHV0XCIpO1xuZXhwb3J0cy5JbnB1dCA9IElucHV0XzEuSW5wdXQ7XG5leHBvcnRzLlNlbGVjdCA9IElucHV0XzEuU2VsZWN0O1xudmFyIFN3aXRjaF8xID0gcmVxdWlyZShcIi4vc3dpdGNoL1N3aXRjaFwiKTtcbmV4cG9ydHMuU3dpdGNoID0gU3dpdGNoXzEuU3dpdGNoO1xudmFyIFRhYmxlXzEgPSByZXF1aXJlKFwiLi90YWJsZS9UYWJsZVwiKTtcbmV4cG9ydHMuVGFibGUgPSBUYWJsZV8xLlRhYmxlO1xuZXhwb3J0cy5Tb3J0VGFibGVNb2RlbCA9IFRhYmxlXzEuU29ydFRhYmxlTW9kZWw7XG52YXIgVGFic18xID0gcmVxdWlyZShcIi4vdGFicy9UYWJzXCIpO1xuZXhwb3J0cy5UYWIgPSBUYWJzXzEuVGFiO1xuZXhwb3J0cy5UYWJzID0gVGFic18xLlRhYnM7XG52YXIgQnVzeUluZGljYXRvcl8xID0gcmVxdWlyZShcIi4vYnVzeS1pbmRpY2F0b3IvQnVzeUluZGljYXRvclwiKTtcbmV4cG9ydHMuQnVzeUluZGljYXRvciA9IEJ1c3lJbmRpY2F0b3JfMS5CdXN5SW5kaWNhdG9yO1xudmFyIFRyZWVOYXZfMSA9IHJlcXVpcmUoXCIuL3RyZWUtbmF2L1RyZWVOYXZcIik7XG5leHBvcnRzLlRyZWVOYXYgPSBUcmVlTmF2XzEuVHJlZU5hdjtcbmV4cG9ydHMuVHJlZU5hdkl0ZW0gPSBUcmVlTmF2XzEuVHJlZU5hdkl0ZW07XG52YXIgQ2FyZF8xID0gcmVxdWlyZShcIi4vY2FyZC9DYXJkXCIpO1xuZXhwb3J0cy5DYXJkID0gQ2FyZF8xLkNhcmQ7XG5leHBvcnRzLkNhcmRCb2R5ID0gQ2FyZF8xLkNhcmRCb2R5O1xuLyoganNoaW50IGlnbm9yZTplbmQgKi9cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgd21sX3J1bnRpbWVfMSA9IHJlcXVpcmUoXCJAcXVlbmsvd21sLXJ1bnRpbWVcIik7XG52YXIgdXRpbF8xID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi91dGlsXCIpO1xudmFyIGlucHV0XzEgPSByZXF1aXJlKFwiLi93bWwvaW5wdXRcIik7XG52YXIgSU5QVVRfU1VDQ0VTUyA9ICdoYXMtc3VjY2Vzcyc7XG52YXIgSU5QVVRfRVJST1IgPSAnaGFzLWVycm9yJztcbnZhciBJTlBVVF9XQVJOSU5HID0gJ2hhcy13YXJuaW5nJztcbnZhciBEZWZhdWx0SW5wdXREZWxlZ2F0ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRGVmYXVsdElucHV0RGVsZWdhdGUoaW5wdXQpIHtcbiAgICAgICAgdGhpcy5pbnB1dCA9IGlucHV0O1xuICAgIH1cbiAgICBEZWZhdWx0SW5wdXREZWxlZ2F0ZS5wcm90b3R5cGUub25JbnB1dCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHRoaXMuaW5wdXQuYXR0cmlidXRlcy5yZWFkKCd3dzpvbklucHV0JywgdXRpbF8xLm5vb3ApKGUpO1xuICAgIH07XG4gICAgcmV0dXJuIERlZmF1bHRJbnB1dERlbGVnYXRlO1xufSgpKTtcbmV4cG9ydHMuRGVmYXVsdElucHV0RGVsZWdhdGUgPSBEZWZhdWx0SW5wdXREZWxlZ2F0ZTtcbi8qKlxuICogSW5wdXRcbiAqL1xudmFyIElucHV0ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoSW5wdXQsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gSW5wdXQoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IGlucHV0XzEuSW5wdXRWaWV3KF90aGlzKTtcbiAgICAgICAgX3RoaXMuZGVsZWdhdGUgPSBfdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmRlbGVnYXRlJywgbmV3IERlZmF1bHRJbnB1dERlbGVnYXRlKF90aGlzKSk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KElucHV0LnByb3RvdHlwZSwgXCJuYW1lXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy52aWV3Lmlkcy5pbnB1dC5uYW1lO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoSW5wdXQucHJvdG90eXBlLCBcInZhbHVlXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy52aWV3Lmlkcy5pbnB1dC52YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgSW5wdXQucHJvdG90eXBlLmluaXRpYWxWYWx1ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHJldCA9IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzp2YWx1ZScpO1xuICAgICAgICByZXR1cm4gKHR5cGVvZiByZXQgPT09ICdmdW5jdGlvbicpID8gcmV0KHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpuYW1lJykpIDogcmV0O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogZ2V0Q2xhc3NcbiAgICAgKi9cbiAgICBJbnB1dC5wcm90b3R5cGUuZ2V0Q2xhc3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjID0gXCJmb3JtLWdyb3VwIFwiICsgdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmNsYXNzJyk7XG4gICAgICAgIGlmICghdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3Om1lc3NhZ2UnKSlcbiAgICAgICAgICAgIHJldHVybiBjO1xuICAgICAgICByZXR1cm4gYyArIFwiIFwiICsgdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OnZhcmlhbnQnLCAnaGFzLWVycm9yJyk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBzZXRNZXNzYWdlIHNldHMgdGhlIG1lc3NhZ2UgZm9yIHRoZSBtZXNzYWdlIHBvcnRpb24gb2ZcbiAgICAgKiB0aGlzIGlucHV0LlxuICAgICAqL1xuICAgIElucHV0LnByb3RvdHlwZS5zZXRNZXNzYWdlID0gZnVuY3Rpb24gKG1zZykge1xuICAgICAgICBpZiAobXNnID09PSB2b2lkIDApIHsgbXNnID0gJyc7IH1cbiAgICAgICAgdmFyIG1lc3NhZ2UgPSB0aGlzLnZpZXcuaWRzLm1lc3NhZ2U7XG4gICAgICAgIHZhciBub2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUobXNnKTtcbiAgICAgICAgaWYgKG1lc3NhZ2UuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgbWVzc2FnZS5yZXBsYWNlQ2hpbGQobm9kZSwgbWVzc2FnZS5maXJzdENoaWxkKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG1lc3NhZ2UuYXBwZW5kQ2hpbGQobm9kZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIGlzRmlsbGVkIHRlbGxzIGlmIHRoaXMgSW5wdXQgaGFzIGEgZmlsbGVkIHZhbHVlLlxuICAgICAqL1xuICAgIElucHV0LnByb3RvdHlwZS5pc0ZpbGxlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGlucHV0ID0gdGhpcy52aWV3Lmlkcy5pbnB1dDtcbiAgICAgICAgcmV0dXJuICgoaW5wdXQudmFsdWUgIT0gbnVsbCkgfHwgKGlucHV0LnZhbHVlICE9PSAnJykpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogaXNSZXF1aXJlZCB0ZWxscyBpZiB0aGUgSW5wdXQgd2FzIHJlcXVpcmVkLlxuICAgICAqL1xuICAgIElucHV0LnByb3RvdHlwZS5pc1JlcXVpcmVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gKHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpyZXF1aXJlZCcpICE9IG51bGwpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogaXNWYWxpZCBxdWVyaWVzIHdoZXRoZXIgdGhlIElucHV0IGhhcyBiZWVuIGludmFsaWRhdGVkXG4gICAgICogb3Igbm90LlxuICAgICAqL1xuICAgIElucHV0LnByb3RvdHlwZS5pc1ZhbGlkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gKHRoaXMudmlldy5pZHMucm9vdC5jbGFzc05hbWUuc3BsaXQoJyAnKS5pbmRleE9mKElOUFVUX0VSUk9SKSA9PT0gLTEpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogcmVtb3ZlVmFsaWRhdGlvblN0YXRlIHJlbW92ZXMgdGhlIHN0YXRlIHZhbGlkYXRpb24gc3RhdGUgZnJvbSB0aGUgaW5wdXQuXG4gICAgICovXG4gICAgSW5wdXQucHJvdG90eXBlLnJlbW92ZVZhbGlkYXRpb25TdGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGggPSB0aGlzLnZpZXcuaWRzLnJvb3Q7XG4gICAgICAgIGguY2xhc3NMaXN0LnJlbW92ZShJTlBVVF9TVUNDRVNTKTtcbiAgICAgICAgaC5jbGFzc0xpc3QucmVtb3ZlKElOUFVUX0VSUk9SKTtcbiAgICAgICAgaC5jbGFzc0xpc3QucmVtb3ZlKElOUFVUX1dBUk5JTkcpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogaW52YWxpZGF0ZSB0aGlzIElucHV0IHdpdGggYW4gb3B0aW9uYWwgbWVzc2FnZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZVxuICAgICAqIEByZXR1cm5zIHtJbnB1dH1cbiAgICAgKi9cbiAgICBJbnB1dC5wcm90b3R5cGUuaW52YWxpZGF0ZSA9IGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gICAgICAgIGlmIChtZXNzYWdlID09PSB2b2lkIDApIHsgbWVzc2FnZSA9ICcnOyB9XG4gICAgICAgIHRoaXMucmVtb3ZlVmFsaWRhdGlvblN0YXRlKCk7XG4gICAgICAgIHRoaXMuc2V0TWVzc2FnZShtZXNzYWdlKTtcbiAgICAgICAgdGhpcy52aWV3Lmlkcy5yb290LmNsYXNzTGlzdC5hZGQoSU5QVVRfRVJST1IpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogdmFsaWRhdGUgdGhpcyBpbnB1dCB3aXRoIGFuIG9wdGlvbmFsIG1lc3NzYWdlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlXG4gICAgICogQHJldHVybnMge0lucHV0fVxuICAgICAqL1xuICAgIElucHV0LnByb3RvdHlwZS52YWxpZGF0ZSA9IGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gICAgICAgIGlmIChtZXNzYWdlID09PSB2b2lkIDApIHsgbWVzc2FnZSA9ICcnOyB9XG4gICAgICAgIHRoaXMucmVtb3ZlVmFsaWRhdGlvblN0YXRlKCk7XG4gICAgICAgIHRoaXMuc2V0TWVzc2FnZShtZXNzYWdlKTtcbiAgICAgICAgdGhpcy52aWV3Lmlkcy5yb290LmNsYXNzTGlzdC5hZGQoSU5QVVRfU1VDQ0VTUyk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiB3YXJuIHRoaXMgaW5wdXQgd2l0aCBhbiBvcHRpb25hbCBtZXNzYWdlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlXG4gICAgICogQHJldHVybnMge0lucHV0fVxuICAgICAqL1xuICAgIElucHV0LnByb3RvdHlwZS53YXJuID0gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcbiAgICAgICAgaWYgKG1lc3NhZ2UgPT09IHZvaWQgMCkgeyBtZXNzYWdlID0gJyc7IH1cbiAgICAgICAgdGhpcy5yZW1vdmVWYWxpZGF0aW9uU3RhdGUoKTtcbiAgICAgICAgdGhpcy5zZXRNZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgICB0aGlzLnZpZXcuaWRzLnJvb3QuY2xhc3NMaXN0LmFkZChJTlBVVF9XQVJOSU5HKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIHJlc2V0IHRoaXMgaW5wdXQgdG8gYSBjbGVhbiBzdGF0ZS5cbiAgICAgKiBSZW1vdmVzIG1lc3NhZ2VzLCB2YWxpZGF0aW9uIHN0YXRlIGV0Yy5cbiAgICAgKiBAcmV0dXJuIHtJbnB1dH1cbiAgICAgKi9cbiAgICBJbnB1dC5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciByb290ID0gdGhpcy52aWV3Lmlkcy5yb290O1xuICAgICAgICB2YXIgbSA9IHRoaXMudmlldy5pZHMubWVzc2FnZTtcbiAgICAgICAgdGhpcy5yZW1vdmVWYWxpZGF0aW9uU3RhdGUoKTtcbiAgICAgICAgd2hpbGUgKG0uZmlyc3RDaGlsZClcbiAgICAgICAgICAgIG0ucmVtb3ZlQ2hpbGQobS5maXJzdENoaWxkKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIHJlbmRlcmVkIGNoZWNrcyBpZiB0aGUgaW5wdXQgc2hvdWxkIGhhdmUgYSB2YWxpZGF0aW9uIHN0YXRlIHNldFxuICAgICAqL1xuICAgIElucHV0LnByb3RvdHlwZS5yZW5kZXJlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHZhbGlkYXRlID0gdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OnZhbGlkYXRlJyk7XG4gICAgICAgIHZhciBpbnZhbGlkYXRlID0gdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmludmFsaWRhdGUnKTtcbiAgICAgICAgdmFyIHdhcm4gPSB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6d2FybicpO1xuICAgICAgICB2YWxpZGF0ZSA/XG4gICAgICAgICAgICB0aGlzLnZhbGlkYXRlKHZhbGlkYXRlKSA6XG4gICAgICAgICAgICB3YXJuID9cbiAgICAgICAgICAgICAgICB0aGlzLndhcm4od2FybikgOlxuICAgICAgICAgICAgICAgIGludmFsaWRhdGUgP1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmludmFsaWRhdGUoaW52YWxpZGF0ZSkgOlxuICAgICAgICAgICAgICAgICAgICBudWxsO1xuICAgIH07XG4gICAgcmV0dXJuIElucHV0O1xufSh3bWxfcnVudGltZV8xLkNvbXBvbmVudCkpO1xuZXhwb3J0cy5JbnB1dCA9IElucHV0O1xudmFyIFNlbGVjdCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFNlbGVjdCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBTZWxlY3QoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IGlucHV0XzEuU2VsZWN0VmlldyhfdGhpcyk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIFNlbGVjdDtcbn0oSW5wdXQpKTtcbmV4cG9ydHMuU2VsZWN0ID0gU2VsZWN0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9SW5wdXQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB3bWxfcnVudGltZV8xID0gcmVxdWlyZShcIkBxdWVuay93bWwtcnVudGltZVwiKTtcbnZhciBTdHlsZXMgPSByZXF1aXJlKFwid21sLXdpZGdldHMtY29tbW9uL1N0eWxlc1wiKTtcbmZ1bmN0aW9uIGxhYmVsKHZpZXcpIHsgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgnbGFiZWwnLCB7IGh0bWw6IHsgJ2Zvcic6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzppZCcpLCAnY2xhc3MnOiBTdHlsZXMuQ09OVFJPTF9MQUJFTCB9LCB3bWw6IHt9IH0sIFt3bWxfcnVudGltZV8xLmRvbWlmeSh0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6bGFiZWwnKSldLCB2aWV3KTsgfVxuZXhwb3J0cy5sYWJlbCA9IGxhYmVsO1xuZnVuY3Rpb24gbWVzc2FnZSh2aWV3KSB7IHJldHVybiB3bWxfcnVudGltZV8xLm5vZGUoJ3NwYW4nLCB7IGh0bWw6IHsgJ2NsYXNzJzogXCJoZWxwLWJsb2NrXCIgfSwgd21sOiB7ICdpZCc6IFwibWVzc2FnZVwiIH0gfSwgW3dtbF9ydW50aW1lXzEuZG9taWZ5KHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzptZXNzYWdlJywgJycpKV0sIHZpZXcpOyB9XG5leHBvcnRzLm1lc3NhZ2UgPSBtZXNzYWdlO1xudmFyIFNlbGVjdFZpZXcgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhTZWxlY3RWaWV3LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFNlbGVjdFZpZXcoY29udGV4dCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBjb250ZXh0KSB8fCB0aGlzO1xuICAgICAgICB2YXIgdmlldyA9IF90aGlzO1xuICAgICAgICBfdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB3bWxfcnVudGltZV8xLm5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiBbU3R5bGVzLkZPUk1fR1JPVVAsIHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzp2YXJpYW50JywgJycpXS5qb2luKCcsJykgfSwgd21sOiB7fSB9LCBbbGFiZWwuY2FsbCh0aGlzLCB2aWV3KSwgd21sX3J1bnRpbWVfMS5ub2RlKCdzZWxlY3QnLCB7IGh0bWw6IHsgJ2lkJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmlkJywgJycpLCAndGl0bGUnOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6dGl0bGUnKSwgJ25hbWUnOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6bmFtZScsIHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzppZCcsICcnKSksICdvbmNoYW5nZSc6IHRoaXMuZGVsZWdhdGUub25JbnB1dC5iaW5kKHRoaXMuZGVsZWdhdGUpLCAndmFsdWUnOiB0aGlzLmluaXRpYWxWYWx1ZSgpLCAnZGlzYWJsZWQnOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6ZGlzYWJsZWQnLCBudWxsKSwgJ3JlYWRvbmx5JzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OnJlYWRvbmx5JywgbnVsbCksICdjbGFzcyc6IFN0eWxlcy5TRUxFQ1QgfSwgd21sOiB7ICdpZCc6IFwiaW5wdXRcIiB9IH0sIFt3bWxfcnVudGltZV8xLmZvckUodGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3Om9wdGlvbnMnLCBbXSksIGZ1bmN0aW9uIGZvcjEob3B0KSB7IHJldHVybiAoZnVuY3Rpb24gKCkgeyByZXR1cm4gKHR5cGVvZiBvcHQgPT09ICdzdHJpbmcnKSA/IHdtbF9ydW50aW1lXzEuYm94KHdtbF9ydW50aW1lXzEubm9kZSgnb3B0aW9uJywgeyBodG1sOiB7fSwgd21sOiB7fSB9LCBbd21sX3J1bnRpbWVfMS5kb21pZnkob3B0KV0sIHZpZXcpLCB3bWxfcnVudGltZV8xLm5vZGUoJ29wdGlvbicsIHsgaHRtbDoge30sIHdtbDoge30gfSwgW3dtbF9ydW50aW1lXzEuZG9taWZ5KG9wdCldLCB2aWV3KSwgd21sX3J1bnRpbWVfMS5ub2RlKCdvcHRpb24nLCB7IGh0bWw6IHt9LCB3bWw6IHt9IH0sIFt3bWxfcnVudGltZV8xLmRvbWlmeShvcHQpXSwgdmlldykpIDogd21sX3J1bnRpbWVfMS5ub2RlKCdvcHRpb24nLCB7IGh0bWw6IHsgJ3ZhbHVlJzogb3B0LnZhbHVlIH0sIHdtbDoge30gfSwgW3dtbF9ydW50aW1lXzEuZG9taWZ5KG9wdC5sYWJlbCldLCB2aWV3KTsgfSkuY2FsbCh0aGlzKTsgfS5iaW5kKHRoaXMpLCBmdW5jdGlvbiBmb3Jfb3RoZXJ3aXNlMSgpIHsgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgncCcsIHsgaHRtbDoge30sIHdtbDoge30gfSwgW10sIHZpZXcpOyB9LmJpbmQodGhpcykpXSwgdmlldyksIG1lc3NhZ2UuY2FsbCh0aGlzLCB2aWV3KV0sIHZpZXcpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBTZWxlY3RWaWV3O1xufSh3bWxfcnVudGltZV8xLkFwcFZpZXcpKTtcbmV4cG9ydHMuU2VsZWN0VmlldyA9IFNlbGVjdFZpZXc7XG52YXIgSW5wdXRWaWV3ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoSW5wdXRWaWV3LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIElucHV0Vmlldyhjb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbnRleHQpIHx8IHRoaXM7XG4gICAgICAgIHZhciB2aWV3ID0gX3RoaXM7XG4gICAgICAgIF90aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6IFtTdHlsZXMuRk9STV9HUk9VUCwgdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OnZhcmlhbnQnLCAnJyldLmpvaW4oJywnKSB9LCB3bWw6IHt9IH0sIFtsYWJlbC5jYWxsKHRoaXMsIHZpZXcpLCB3bWxfcnVudGltZV8xLmlmRSh0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6dHlwZScsICd0ZXh0JykgIT09ICd0ZXh0YXJlYScsIGZ1bmN0aW9uIGlmMygpIHsgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgnaW5wdXQnLCB7IGh0bWw6IHsgJ2lkJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmlkJywgJycpLCAndGl0bGUnOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6dGl0bGUnKSwgJ25hbWUnOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6bmFtZScsIHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzppZCcsICcnKSksICd0eXBlJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OnR5cGUnLCAndGV4dCcpLCAncGxhY2Vob2xkZXInOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6cGxhY2Vob2xkZXInKSwgJ29uaW5wdXQnOiB0aGlzLmRlbGVnYXRlLm9uSW5wdXQuYmluZCh0aGlzLmRlbGVnYXRlKSwgJ3ZhbHVlJzogdGhpcy5pbml0aWFsVmFsdWUoKSwgJ2Rpc2FibGVkJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmRpc2FibGVkJywgbnVsbCksICdyZWFkb25seSc6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpyZWFkb25seScsIG51bGwpLCAnY2xhc3MnOiBTdHlsZXMuSU5QVVQgfSwgd21sOiB7ICdpZCc6IFwiaW5wdXRcIiB9IH0sIFtdLCB2aWV3KTsgfS5iaW5kKHRoaXMpLCBmdW5jdGlvbiBlbHNlX2NsYXVzZTMoKSB7IHJldHVybiB3bWxfcnVudGltZV8xLm5vZGUoJ3RleHRhcmVhJywgeyBodG1sOiB7ICdpZCc6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzppZCcsICcnKSwgJ3RpdGxlJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OnRpdGxlJyksICduYW1lJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3Om5hbWUnLCB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6aWQnLCAnJykpLCAnY2xhc3MnOiBTdHlsZXMuVEVYVEFSRUEsICdwbGFjZWhvbGRlcic6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpwbGFjZWhvbGRlcicpLCAnb25pbnB1dCc6IHRoaXMuZGVsZWdhdGUub25JbnB1dC5iaW5kKHRoaXMuZGVsZWdhdGUpLCAnZGlzYWJsZWQnOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6ZGlzYWJsZWQnLCBudWxsKSwgJ3JlYWRvbmx5JzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OnJlYWRvbmx5JywgbnVsbCksICdyb3dzJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDpyb3dzJykgfSwgd21sOiB7ICdpZCc6IFwiaW5wdXRcIiB9IH0sIFt3bWxfcnVudGltZV8xLmRvbWlmeSh0aGlzLmluaXRpYWxWYWx1ZSgpKV0sIHZpZXcpOyB9LmJpbmQodGhpcykpLCBtZXNzYWdlLmNhbGwodGhpcywgdmlldyldLCB2aWV3KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gSW5wdXRWaWV3O1xufSh3bWxfcnVudGltZV8xLkFwcFZpZXcpKTtcbmV4cG9ydHMuSW5wdXRWaWV3ID0gSW5wdXRWaWV3O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5wdXQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBjb21tb24gPSByZXF1aXJlKFwid21sLXdpZGdldHMtY29tbW9uXCIpO1xudmFyIG1haW5fdmlld18xID0gcmVxdWlyZShcIi4vd21sL21haW4tdmlld1wiKTtcbi8qKlxuICogTWFpblZpZXcgcHJvdmlkZXMgYSBjb250YWluZXIgZm9yIHRoZSBtYWluIGNvbnRlbnQgb2YgYW4gYXBwbGljYXRpb24uXG4gKi9cbnZhciBNYWluVmlldyA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKE1haW5WaWV3LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIE1haW5WaWV3KCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMudmlldyA9IG5ldyBtYWluX3ZpZXdfMS5NYWluKF90aGlzKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gTWFpblZpZXc7XG59KGNvbW1vbi5Db250YWluZXIpKTtcbmV4cG9ydHMuTWFpblZpZXcgPSBNYWluVmlldztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPU1haW5WaWV3LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgd21sX3J1bnRpbWVfMSA9IHJlcXVpcmUoXCJAcXVlbmsvd21sLXJ1bnRpbWVcIik7XG52YXIgU3R5bGVzID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi9TdHlsZXNcIik7XG52YXIgdXRpbF8xID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi91dGlsXCIpO1xudmFyIE1haW4gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhNYWluLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIE1haW4oY29udGV4dCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBjb250ZXh0KSB8fCB0aGlzO1xuICAgICAgICB2YXIgdmlldyA9IF90aGlzO1xuICAgICAgICBfdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB3bWxfcnVudGltZV8xLm5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiB1dGlsXzEuY29tYmluZShbU3R5bGVzLk1BSU5fVklFVywgU3R5bGVzLkRSQVdFUl9QVVNIQUJMRSwgdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmNsYXNzJywgJycpXSkgfSwgd21sOiB7fSB9LCBbd21sX3J1bnRpbWVfMS5kb21pZnkodGhpcy5jaGlsZHJlbildLCB2aWV3KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gTWFpbjtcbn0od21sX3J1bnRpbWVfMS5BcHBWaWV3KSk7XG5leHBvcnRzLk1haW4gPSBNYWluO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFpbi12aWV3LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgd21sX3J1bnRpbWVfMSA9IHJlcXVpcmUoXCJAcXVlbmsvd21sLXJ1bnRpbWVcIik7XG52YXIgbWVudV9idXR0b25fMSA9IHJlcXVpcmUoXCIuL3dtbC9tZW51X2J1dHRvblwiKTtcbi8qKlxuICogTWVudUJ1dHRvbiBwcm92aWRlcyBhICdoYW1idXJnZXInIG1lbnUgYnV0dG9uLlxuICovXG52YXIgTWVudUJ1dHRvbiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKE1lbnVCdXR0b24sIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gTWVudUJ1dHRvbigpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnZpZXcgPSBuZXcgbWVudV9idXR0b25fMS5NYWluKF90aGlzKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gTWVudUJ1dHRvbjtcbn0od21sX3J1bnRpbWVfMS5Db21wb25lbnQpKTtcbmV4cG9ydHMuTWVudUJ1dHRvbiA9IE1lbnVCdXR0b247XG5leHBvcnRzLmRlZmF1bHQgPSBNZW51QnV0dG9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9TWVudUJ1dHRvbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHdtbF9ydW50aW1lXzEgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC1ydW50aW1lXCIpO1xudmFyIFN0eWxlID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi9TdHlsZXNcIik7XG52YXIgdXRpbF8xID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi91dGlsXCIpO1xudmFyIE1haW4gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhNYWluLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIE1haW4oY29udGV4dCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBjb250ZXh0KSB8fCB0aGlzO1xuICAgICAgICB2YXIgdmlldyA9IF90aGlzO1xuICAgICAgICBfdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB3bWxfcnVudGltZV8xLm5vZGUoJ2J1dHRvbicsIHsgaHRtbDogeyAnY2xhc3MnOiBTdHlsZS5NRU5VX0JVVFRPTiwgJ29uY2xpY2snOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6b25DbGljaycsIHV0aWxfMS5ub29wKSB9LCB3bWw6IHt9IH0sIFt3bWxfcnVudGltZV8xLm5vZGUoJ3NwYW4nLCB7IGh0bWw6IHsgJ2NsYXNzJzogXCJcIiB9LCB3bWw6IHt9IH0sIFtdLCB2aWV3KSwgd21sX3J1bnRpbWVfMS5ub2RlKCdzcGFuJywgeyBodG1sOiB7ICdjbGFzcyc6IFwiXCIgfSwgd21sOiB7fSB9LCBbXSwgdmlldyksIHdtbF9ydW50aW1lXzEubm9kZSgnc3BhbicsIHsgaHRtbDogeyAnY2xhc3MnOiBcIlwiIH0sIHdtbDoge30gfSwgW10sIHZpZXcpXSwgdmlldyk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIE1haW47XG59KHdtbF9ydW50aW1lXzEuQXBwVmlldykpO1xuZXhwb3J0cy5NYWluID0gTWFpbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1lbnVfYnV0dG9uLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgd21sX3J1bnRpbWVfMSA9IHJlcXVpcmUoXCJAcXVlbmsvd21sLXJ1bnRpbWVcIik7XG52YXIgdmlld3MgPSByZXF1aXJlKFwiLi93bWwvbW9kYWxcIik7XG4vKipcbiAqIE1vZGFsXG4gKi9cbnZhciBNb2RhbCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKE1vZGFsLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIE1vZGFsKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMudmlldyA9IG5ldyB2aWV3cy5Nb2RhbChfdGhpcyk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogY2xvc2UgdGhlIG1vZGFsLlxuICAgICAqL1xuICAgIE1vZGFsLnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG0gPSB0aGlzLnZpZXcuZmluZEJ5SWQoJ21vZGFsJyk7XG4gICAgICAgIG0ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChtKTtcbiAgICB9O1xuICAgIE1vZGFsLnByb3RvdHlwZS5wbGFjZSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHdoaWxlIChlLmZpcnN0Q2hpbGQgIT0gbnVsbClcbiAgICAgICAgICAgIGUucmVtb3ZlQ2hpbGQoZS5maXJzdENoaWxkKTtcbiAgICAgICAgZS5hcHBlbmRDaGlsZCh0aGlzLnJlbmRlcigpKTtcbiAgICB9O1xuICAgIHJldHVybiBNb2RhbDtcbn0od21sX3J1bnRpbWVfMS5Db21wb25lbnQpKTtcbmV4cG9ydHMuTW9kYWwgPSBNb2RhbDtcbi8qKlxuICogSGVhZGVyXG4gKi9cbnZhciBIZWFkZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhIZWFkZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gSGVhZGVyKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMudmlldyA9IG5ldyB2aWV3cy5IZWFkZXIoX3RoaXMpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBIZWFkZXI7XG59KHdtbF9ydW50aW1lXzEuQ29tcG9uZW50KSk7XG5leHBvcnRzLkhlYWRlciA9IEhlYWRlcjtcbi8qKlxuICogQm9keVxuICovXG52YXIgQm9keSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEJvZHksIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQm9keSgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnZpZXcgPSBuZXcgdmlld3MuQm9keShfdGhpcyk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIEJvZHk7XG59KHdtbF9ydW50aW1lXzEuQ29tcG9uZW50KSk7XG5leHBvcnRzLkJvZHkgPSBCb2R5O1xuLyoqXG4gKiBGb290ZXJcbiAqL1xudmFyIEZvb3RlciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEZvb3RlciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBGb290ZXIoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IHZpZXdzLkZvb3RlcihfdGhpcyk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIEZvb3Rlcjtcbn0od21sX3J1bnRpbWVfMS5Db21wb25lbnQpKTtcbmV4cG9ydHMuRm9vdGVyID0gRm9vdGVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9TW9kYWwuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB3bWxfcnVudGltZV8xID0gcmVxdWlyZShcIkBxdWVuay93bWwtcnVudGltZVwiKTtcbnZhciBTdHlsZXMgPSByZXF1aXJlKFwid21sLXdpZGdldHMtY29tbW9uL1N0eWxlc1wiKTtcbnZhciB1dGlsXzEgPSByZXF1aXJlKFwid21sLXdpZGdldHMtY29tbW9uL3V0aWxcIik7XG52YXIgTW9kYWwgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhNb2RhbCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBNb2RhbChjb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbnRleHQpIHx8IHRoaXM7XG4gICAgICAgIHZhciB2aWV3ID0gX3RoaXM7XG4gICAgICAgIF90aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6IFN0eWxlcy5NT0RBTCwgJ3RhYmluZGV4JzogXCItMVwiLCAncm9sZSc6IFwiZGlhbG9nXCIgfSwgd21sOiB7ICdpZCc6IFwibW9kYWxcIiB9IH0sIFt3bWxfcnVudGltZV8xLm5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiBTdHlsZXMuTU9EQUxfRElBTE9HLCAncm9sZSc6IFwiZG9jdW1lbnRcIiB9LCB3bWw6IHt9IH0sIFt3bWxfcnVudGltZV8xLm5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiBTdHlsZXMuTU9EQUxfQ09OVEVOVCB9LCB3bWw6IHsgJ2lkJzogXCJjb250ZW50XCIgfSB9LCBbd21sX3J1bnRpbWVfMS5kb21pZnkodGhpcy5jaGlsZHJlbildLCB2aWV3KV0sIHZpZXcpXSwgdmlldyk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIE1vZGFsO1xufSh3bWxfcnVudGltZV8xLkFwcFZpZXcpKTtcbmV4cG9ydHMuTW9kYWwgPSBNb2RhbDtcbnZhciBIZWFkZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhIZWFkZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gSGVhZGVyKGNvbnRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29udGV4dCkgfHwgdGhpcztcbiAgICAgICAgdmFyIHZpZXcgPSBfdGhpcztcbiAgICAgICAgX3RoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogU3R5bGVzLk1PREFMX0hFQURFUiB9LCB3bWw6IHt9IH0sIFt3bWxfcnVudGltZV8xLm5vZGUoJ2J1dHRvbicsIHsgaHRtbDogeyAndHlwZSc6IFwiYnV0dG9uXCIsICdjbGFzcyc6IFwiY2xvc2VcIiwgJ2FyaWEtbGFiZWwnOiBcIkNsb3NlXCIsICdvbmNsaWNrJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3Om9uQ2xvc2UnLCB1dGlsXzEubm9vcCkgfSwgd21sOiB7fSB9LCBbd21sX3J1bnRpbWVfMS5ub2RlKCdzcGFuJywgeyBodG1sOiB7ICdhcmlhLWhpZGRlbic6IFwidHJ1ZVwiIH0sIHdtbDoge30gfSwgW3dtbF9ydW50aW1lXzEudGV4dChcIlxcdTAwRDdcIildLCB2aWV3KV0sIHZpZXcpLCB3bWxfcnVudGltZV8xLmRvbWlmeSh0aGlzLmNoaWxkcmVuKV0sIHZpZXcpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBIZWFkZXI7XG59KHdtbF9ydW50aW1lXzEuQXBwVmlldykpO1xuZXhwb3J0cy5IZWFkZXIgPSBIZWFkZXI7XG52YXIgQm9keSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEJvZHksIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQm9keShjb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbnRleHQpIHx8IHRoaXM7XG4gICAgICAgIHZhciB2aWV3ID0gX3RoaXM7XG4gICAgICAgIF90aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6IFN0eWxlcy5NT0RBTF9CT0RZIH0sIHdtbDoge30gfSwgW3dtbF9ydW50aW1lXzEuZG9taWZ5KHRoaXMuY2hpbGRyZW4pXSwgdmlldyk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIEJvZHk7XG59KHdtbF9ydW50aW1lXzEuQXBwVmlldykpO1xuZXhwb3J0cy5Cb2R5ID0gQm9keTtcbnZhciBGb290ZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhGb290ZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gRm9vdGVyKGNvbnRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29udGV4dCkgfHwgdGhpcztcbiAgICAgICAgdmFyIHZpZXcgPSBfdGhpcztcbiAgICAgICAgX3RoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogU3R5bGVzLk1PREFMX0ZPT1RFUiB9LCB3bWw6IHt9IH0sIFt3bWxfcnVudGltZV8xLmRvbWlmeSh0aGlzLmNoaWxkcmVuKV0sIHZpZXcpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBGb290ZXI7XG59KHdtbF9ydW50aW1lXzEuQXBwVmlldykpO1xuZXhwb3J0cy5Gb290ZXIgPSBGb290ZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tb2RhbC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHdtbF9ydW50aW1lXzEgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC1ydW50aW1lXCIpO1xudmFyIHZpZXdzID0gcmVxdWlyZShcIi4vd21sL3BhbmVsXCIpO1xudmFyIFBhbmVsID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoUGFuZWwsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gUGFuZWwoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IHZpZXdzLlBhbmVsKF90aGlzKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gUGFuZWw7XG59KHdtbF9ydW50aW1lXzEuQ29tcG9uZW50KSk7XG5leHBvcnRzLlBhbmVsID0gUGFuZWw7XG52YXIgSGVhZGVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoSGVhZGVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEhlYWRlcigpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnZpZXcgPSBuZXcgdmlld3MuSGVhZGVyKF90aGlzKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gSGVhZGVyO1xufSh3bWxfcnVudGltZV8xLkNvbXBvbmVudCkpO1xuZXhwb3J0cy5IZWFkZXIgPSBIZWFkZXI7XG52YXIgQm9keSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEJvZHksIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQm9keSgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnZpZXcgPSBuZXcgdmlld3MuQm9keShfdGhpcyk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIEJvZHk7XG59KHdtbF9ydW50aW1lXzEuQ29tcG9uZW50KSk7XG5leHBvcnRzLkJvZHkgPSBCb2R5O1xudmFyIEZvb3RlciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEZvb3RlciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBGb290ZXIoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IHZpZXdzLkZvb3RlcihfdGhpcyk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIEZvb3Rlcjtcbn0od21sX3J1bnRpbWVfMS5Db21wb25lbnQpKTtcbmV4cG9ydHMuRm9vdGVyID0gRm9vdGVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9UGFuZWwuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB3bWxfcnVudGltZV8xID0gcmVxdWlyZShcIkBxdWVuay93bWwtcnVudGltZVwiKTtcbnZhciBTdHlsZXMgPSByZXF1aXJlKFwid21sLXdpZGdldHMtY29tbW9uL1N0eWxlc1wiKTtcbnZhciB1dGlsXzEgPSByZXF1aXJlKFwid21sLXdpZGdldHMtY29tbW9uL3V0aWxcIik7XG52YXIgUGFuZWwgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhQYW5lbCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBQYW5lbChjb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbnRleHQpIHx8IHRoaXM7XG4gICAgICAgIHZhciB2aWV3ID0gX3RoaXM7XG4gICAgICAgIF90aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6IHV0aWxfMS5jb21iaW5lKFtTdHlsZXMuUEFORUwsIHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpzdHlsZScsIFN0eWxlcy5ERUZBVUxUKV0pIH0sIHdtbDoge30gfSwgW3dtbF9ydW50aW1lXzEuZG9taWZ5KHRoaXMuY2hpbGRyZW4pXSwgdmlldyk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIFBhbmVsO1xufSh3bWxfcnVudGltZV8xLkFwcFZpZXcpKTtcbmV4cG9ydHMuUGFuZWwgPSBQYW5lbDtcbnZhciBIZWFkZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhIZWFkZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gSGVhZGVyKGNvbnRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29udGV4dCkgfHwgdGhpcztcbiAgICAgICAgdmFyIHZpZXcgPSBfdGhpcztcbiAgICAgICAgX3RoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogU3R5bGVzLlBBTkVMX0hFQURFUiB9LCB3bWw6IHt9IH0sIFt3bWxfcnVudGltZV8xLmRvbWlmeSh0aGlzLmNoaWxkcmVuKV0sIHZpZXcpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBIZWFkZXI7XG59KHdtbF9ydW50aW1lXzEuQXBwVmlldykpO1xuZXhwb3J0cy5IZWFkZXIgPSBIZWFkZXI7XG52YXIgQm9keSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEJvZHksIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQm9keShjb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbnRleHQpIHx8IHRoaXM7XG4gICAgICAgIHZhciB2aWV3ID0gX3RoaXM7XG4gICAgICAgIF90aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6IFN0eWxlcy5QQU5FTF9CT0RZIH0sIHdtbDoge30gfSwgW3dtbF9ydW50aW1lXzEuZG9taWZ5KHRoaXMuY2hpbGRyZW4pXSwgdmlldyk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIEJvZHk7XG59KHdtbF9ydW50aW1lXzEuQXBwVmlldykpO1xuZXhwb3J0cy5Cb2R5ID0gQm9keTtcbnZhciBGb290ZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhGb290ZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gRm9vdGVyKGNvbnRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29udGV4dCkgfHwgdGhpcztcbiAgICAgICAgdmFyIHZpZXcgPSBfdGhpcztcbiAgICAgICAgX3RoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogU3R5bGVzLlBBTkVMX0ZPT1RFUiB9LCB3bWw6IHt9IH0sIFt3bWxfcnVudGltZV8xLmRvbWlmeSh0aGlzLmNoaWxkcmVuKV0sIHZpZXcpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBGb290ZXI7XG59KHdtbF9ydW50aW1lXzEuQXBwVmlldykpO1xuZXhwb3J0cy5Gb290ZXIgPSBGb290ZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wYW5lbC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHdtbF9ydW50aW1lXzEgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC1ydW50aW1lXCIpO1xudmFyIHN3aXRjaF8xID0gcmVxdWlyZShcIi4vd21sL3N3aXRjaFwiKTtcbi8qKlxuICogU3dpdGNoXG4gKi9cbnZhciBTd2l0Y2ggPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhTd2l0Y2gsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gU3dpdGNoKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMudmlldyA9IG5ldyBzd2l0Y2hfMS5NYWluKF90aGlzKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gU3dpdGNoO1xufSh3bWxfcnVudGltZV8xLkNvbXBvbmVudCkpO1xuZXhwb3J0cy5Td2l0Y2ggPSBTd2l0Y2g7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Td2l0Y2guanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB3bWxfcnVudGltZV8xID0gcmVxdWlyZShcIkBxdWVuay93bWwtcnVudGltZVwiKTtcbnZhciBTdHlsZXMgPSByZXF1aXJlKFwid21sLXdpZGdldHMtY29tbW9uL1N0eWxlc1wiKTtcbnZhciB1dGlsXzEgPSByZXF1aXJlKFwid21sLXdpZGdldHMtY29tbW9uL3V0aWxcIik7XG52YXIgTWFpbiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKE1haW4sIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gTWFpbihjb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbnRleHQpIHx8IHRoaXM7XG4gICAgICAgIHZhciB2aWV3ID0gX3RoaXM7XG4gICAgICAgIF90aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgnbGFiZWwnLCB7IGh0bWw6IHsgJ2NsYXNzJzogU3R5bGVzLlNXSVRDSCB9LCB3bWw6IHt9IH0sIFt3bWxfcnVudGltZV8xLm5vZGUoJ2lucHV0JywgeyBodG1sOiB7ICd0eXBlJzogXCJjaGVja2JveFwiLCAnbmFtZSc6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpuYW1lJyksICd2YWx1ZSc6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzp2YWx1ZScpLCAnb25jaGFuZ2UnOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6b25DaGFuZ2UnLCB1dGlsXzEubm9vcCkgfSwgd21sOiB7fSB9LCBbXSwgdmlldyksIHdtbF9ydW50aW1lXzEubm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6IFN0eWxlcy5TV0lUQ0hfU0xJREVSIH0sIHdtbDoge30gfSwgW10sIHZpZXcpLCB3bWxfcnVudGltZV8xLmRvbWlmeSh0aGlzLmNoaWxkcmVuKV0sIHZpZXcpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBNYWluO1xufSh3bWxfcnVudGltZV8xLkFwcFZpZXcpKTtcbmV4cG9ydHMuTWFpbiA9IE1haW47XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zd2l0Y2guanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBwcm9wZXJ0eV9zZWVrXzEgPSByZXF1aXJlKFwicHJvcGVydHktc2Vla1wiKTtcbnZhciB3bWxfcnVudGltZV8xID0gcmVxdWlyZShcIkBxdWVuay93bWwtcnVudGltZVwiKTtcbnZhciB0YWJsZV8xID0gcmVxdWlyZShcIi4vd21sL3RhYmxlXCIpO1xudmFyIEFTQ19BUlJPVyA9ICdcXHUyMWU3JztcbnZhciBERVNDX0FSUk9XID0gJ1xcdTIxZTknO1xuZXhwb3J0cy5kYXRlU29ydCA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgdmFyIG5hID0gbmV3IERhdGUoYSkuZ2V0VGltZSgpO1xuICAgIHZhciBuYiA9IG5ldyBEYXRlKGIpLmdldFRpbWUoKTtcbiAgICByZXR1cm4gbmEgPiBuYiA/IC0xIDogbmEgPCBuYiA/IDEgOiAwO1xufTtcbmV4cG9ydHMuc3RyaW5nU29ydCA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgdmFyIGxhID0gYS5yZXBsYWNlKC9cXHMrLywgJycpLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFyIGxiID0gYi5yZXBsYWNlKC9cXHMrLywgJycpLnRvTG93ZXJDYXNlKCk7XG4gICAgcmV0dXJuIChsYSA+IGxiKSA/IC0xIDogKGxhIDwgbGIpID8gMSA6IDA7XG59O1xuZXhwb3J0cy5uYXR1cmFsU29ydCA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgLy9Tb3VyY2U6IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNDM0MDIyNy9zb3J0LW1peGVkLWFscGhhLW51bWVyaWMtYXJyYXlcbiAgICB2YXIgcmVBID0gL1teYS16QS1aXS9nO1xuICAgIHZhciByZU4gPSAvW14wLTldL2c7XG4gICAgdmFyIEFJbnQgPSBwYXJzZUludChhLCAxMCk7XG4gICAgdmFyIEJJbnQgPSBwYXJzZUludChiLCAxMCk7XG4gICAgaWYgKGlzTmFOKEFJbnQpICYmIGlzTmFOKEJJbnQpKSB7XG4gICAgICAgIHZhciBhQSA9IGEucmVwbGFjZShyZUEsICcnKTtcbiAgICAgICAgdmFyIGJBID0gYi5yZXBsYWNlKHJlQSwgJycpO1xuICAgICAgICBpZiAoYUEgPT09IGJBKSB7XG4gICAgICAgICAgICB2YXIgYU4gPSBwYXJzZUludChhLnJlcGxhY2UocmVOLCAnJyksIDEwKTtcbiAgICAgICAgICAgIHZhciBiTiA9IHBhcnNlSW50KGIucmVwbGFjZShyZU4sICcnKSwgMTApO1xuICAgICAgICAgICAgcmV0dXJuIGFOID09PSBiTiA/IDAgOiBhTiA+IGJOID8gLTEgOiAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGFBID4gYkEgPyAtMSA6IDE7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoaXNOYU4oQUludCkpIHtcbiAgICAgICAgcmV0dXJuIC0xOyAvL3RvIG1ha2UgYWxwaGFudW1lcmljIHNvcnQgZmlyc3QgcmV0dXJuIC0xIGhlcmVcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNOYU4oQkludCkpIHtcbiAgICAgICAgcmV0dXJuIDE7IC8vdG8gbWFrZSBhbHBoYW51bWVyaWMgc29ydCBmaXJzdCByZXR1cm4gMSBoZXJlXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gQUludCA+IEJJbnQgPyAtMSA6IDE7XG4gICAgfVxufTtcbmV4cG9ydHMubnVtYmVyU29ydCA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgdmFyIG5hID0gcGFyc2VGbG9hdChhKTtcbiAgICB2YXIgbmIgPSBwYXJzZUZsb2F0KGIpO1xuICAgIG5hID0gKGlzTmFOKGEpKSA/IC1JbmZpbml0eSA6IGE7XG4gICAgbmIgPSAoaXNOYU4oYikpID8gLUluZmluaXR5IDogYjtcbiAgICByZXR1cm4gKG5hID4gbmIpID8gLTEgOiAobmEgPCBuYikgPyAxIDogMDtcbn07XG52YXIgSGVhZGluZ0NsaWNrZWRFdmVudCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gSGVhZGluZ0NsaWNrZWRFdmVudChuYW1lLCBmaWVsZCwgdGFibGUpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5maWVsZCA9IGZpZWxkO1xuICAgICAgICB0aGlzLnRhYmxlID0gdGFibGU7XG4gICAgfVxuICAgIHJldHVybiBIZWFkaW5nQ2xpY2tlZEV2ZW50O1xufSgpKTtcbmV4cG9ydHMuSGVhZGluZ0NsaWNrZWRFdmVudCA9IEhlYWRpbmdDbGlja2VkRXZlbnQ7XG52YXIgUm93Q2xpY2tlZEV2ZW50ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBSb3dDbGlja2VkRXZlbnQodmFsdWUsIGluZGV4LCBkYXRhLCB0YWJsZSkge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICAgICAgdGhpcy50YWJsZSA9IHRhYmxlO1xuICAgIH1cbiAgICByZXR1cm4gUm93Q2xpY2tlZEV2ZW50O1xufSgpKTtcbmV4cG9ydHMuUm93Q2xpY2tlZEV2ZW50ID0gUm93Q2xpY2tlZEV2ZW50O1xudmFyIFJvd1NlbGVjdGVkRXZlbnQgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhSb3dTZWxlY3RlZEV2ZW50LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFJvd1NlbGVjdGVkRXZlbnQoKSB7XG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIFJvd1NlbGVjdGVkRXZlbnQ7XG59KFJvd0NsaWNrZWRFdmVudCkpO1xuZXhwb3J0cy5Sb3dTZWxlY3RlZEV2ZW50ID0gUm93U2VsZWN0ZWRFdmVudDtcbnZhciBDZWxsQ2xpY2tlZEV2ZW50ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDZWxsQ2xpY2tlZEV2ZW50KHZhbHVlLCBuYW1lLCBpbmRleCwgcm93LCB0YWJsZSkge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgICAgICAgdGhpcy5yb3cgPSByb3c7XG4gICAgICAgIHRoaXMudGFibGUgPSB0YWJsZTtcbiAgICB9XG4gICAgcmV0dXJuIENlbGxDbGlja2VkRXZlbnQ7XG59KCkpO1xuZXhwb3J0cy5DZWxsQ2xpY2tlZEV2ZW50ID0gQ2VsbENsaWNrZWRFdmVudDtcbnZhciBEZWZhdWx0VGFibGVNb2RlbCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRGVmYXVsdFRhYmxlTW9kZWwoKSB7XG4gICAgfVxuICAgIERlZmF1bHRUYWJsZU1vZGVsLnByb3RvdHlwZS5hbGxTZWxlY3RlZCA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICBEZWZhdWx0VGFibGVNb2RlbC5wcm90b3R5cGUuY2VsbENsaWNrZWQgPSBmdW5jdGlvbiAoX2UpIHsgfTtcbiAgICBEZWZhdWx0VGFibGVNb2RlbC5wcm90b3R5cGUuaGVhZGluZ0NsaWNrZWQgPSBmdW5jdGlvbiAoX2UpIHsgfTtcbiAgICBEZWZhdWx0VGFibGVNb2RlbC5wcm90b3R5cGUucm93Q2xpY2tlZCA9IGZ1bmN0aW9uIChfZSkgeyB9O1xuICAgIERlZmF1bHRUYWJsZU1vZGVsLnByb3RvdHlwZS5yb3dTZWxlY3RlZCA9IGZ1bmN0aW9uIChfZSkgeyB9O1xuICAgIHJldHVybiBEZWZhdWx0VGFibGVNb2RlbDtcbn0oKSk7XG5leHBvcnRzLkRlZmF1bHRUYWJsZU1vZGVsID0gRGVmYXVsdFRhYmxlTW9kZWw7XG52YXIgU29ydFRhYmxlTW9kZWwgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhTb3J0VGFibGVNb2RlbCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBTb3J0VGFibGVNb2RlbCgpIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgIH1cbiAgICBTb3J0VGFibGVNb2RlbC5wcm90b3R5cGUuaGVhZGluZ0NsaWNrZWQgPSBmdW5jdGlvbiAoZSkgeyBlLnRhYmxlLnNvcnQoZS5uYW1lKTsgfTtcbiAgICByZXR1cm4gU29ydFRhYmxlTW9kZWw7XG59KERlZmF1bHRUYWJsZU1vZGVsKSk7XG5leHBvcnRzLlNvcnRUYWJsZU1vZGVsID0gU29ydFRhYmxlTW9kZWw7XG52YXIgVGFibGUgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhUYWJsZSwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBUYWJsZSgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLm9yaWdpbmFsRGF0YSA9IF90aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6ZGF0YScsIFtdKTtcbiAgICAgICAgX3RoaXMuZGF0YSA9IF90aGlzLm9yaWdpbmFsRGF0YS5zbGljZSgpO1xuICAgICAgICBfdGhpcy5zb3J0ZWRPbiA9ICcnO1xuICAgICAgICBfdGhpcy5hcnJvdyA9ICcnO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IHRhYmxlXzEuVGFibGVWaWV3KF90aGlzKTtcbiAgICAgICAgX3RoaXMubW9kZWwgPSBfdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3Om1vZGVsJywgbmV3IERlZmF1bHRUYWJsZU1vZGVsKCkpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIFRhYmxlLnByb3RvdHlwZS5zb3J0ID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgdmFyIGRhdGE7XG4gICAgICAgIHZhciBib2R5ID0gdGhpcy52aWV3LmZpbmRCeUlkKCdib2R5Jyk7XG4gICAgICAgIHZhciBoZWFkID0gdGhpcy52aWV3LmZpbmRCeUlkKCdoZWFkJyk7XG4gICAgICAgIHZhciBmaWVsZCA9IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpmaWVsZHMnLCBbXSkucmVkdWNlKGZ1bmN0aW9uIChwLCBjKSB7IHJldHVybiBwID8gcCA6IChjLm5hbWUgPT09IG5hbWUgPyBjIDogbnVsbCk7IH0pO1xuICAgICAgICB2YXIgc29ydE9uO1xuICAgICAgICB2YXIgc3RyYXRlZ3k7XG4gICAgICAgIGlmICghZmllbGQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUYWJsZSNzb3J0OiB1bmtub3duIGZpZWxkICdcIiArIG5hbWUgKyBcIidcIik7XG4gICAgICAgIHNvcnRPbiA9IGZpZWxkLnNvcnRPbiB8fCBuYW1lO1xuICAgICAgICBzdHJhdGVneSA9IGZpZWxkLnN0cmF0ZWd5IHx8IGV4cG9ydHMuc3RyaW5nU29ydDtcbiAgICAgICAgaWYgKHRoaXMuc29ydGVkT24gPT09IG5hbWUpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IHRoaXMuZGF0YS5yZXZlcnNlKCk7XG4gICAgICAgICAgICB0aGlzLmFycm93ID0gKHRoaXMuYXJyb3cgPT09IEFTQ19BUlJPVykgPyBERVNDX0FSUk9XIDogQVNDX0FSUk9XO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hcnJvdyA9IERFU0NfQVJST1c7XG4gICAgICAgICAgICB0aGlzLmRhdGEgPSB0aGlzXG4gICAgICAgICAgICAgICAgLm9yaWdpbmFsRGF0YVxuICAgICAgICAgICAgICAgIC5zbGljZSgpXG4gICAgICAgICAgICAgICAgLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIHN0cmF0ZWd5KHByb3BlcnR5X3NlZWtfMS5kZWZhdWx0KHNvcnRPbiwgYSksIHByb3BlcnR5X3NlZWtfMS5kZWZhdWx0KHNvcnRPbiwgYikpOyB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNvcnRlZE9uID0gbmFtZTtcbiAgICAgICAgdGhpcy52aWV3LmludmFsaWRhdGUoKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIHVwZGF0ZSB0aGUgZGF0YSB0aGUgdGFibGUgZGlzcGxheXNcbiAgICAgKi9cbiAgICBUYWJsZS5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgdGhpcy5vcmlnaW5hbERhdGEgPSBkYXRhLnNsaWNlKCk7XG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGEuc2xpY2UoKTtcbiAgICAgICAgKHRoaXMuc29ydGVkT24gPT09ICcnKSA/IHRoaXMudmlldy5pbnZhbGlkYXRlKCkgOiB0aGlzLnNvcnQodGhpcy5zb3J0ZWRPbik7XG4gICAgfTtcbiAgICByZXR1cm4gVGFibGU7XG59KHdtbF9ydW50aW1lXzEuQ29tcG9uZW50KSk7XG5leHBvcnRzLlRhYmxlID0gVGFibGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1UYWJsZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHdtbF9ydW50aW1lXzEgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC1ydW50aW1lXCIpO1xudmFyIHByb3BlcnR5X3NlZWtfMSA9IHJlcXVpcmUoXCJwcm9wZXJ0eS1zZWVrXCIpO1xudmFyIFN0eWxlcyA9IHJlcXVpcmUoXCJ3bWwtd2lkZ2V0cy1jb21tb24vU3R5bGVzXCIpO1xudmFyIFRhYmxlXzEgPSByZXF1aXJlKFwiLi4vVGFibGVcIik7XG52YXIgXzEgPSByZXF1aXJlKFwiLi4vLi4vXCIpO1xuZnVuY3Rpb24gdGhlYWQodmlldywgZmllbGRzKSB7IHJldHVybiB3bWxfcnVudGltZV8xLm5vZGUoJ3RyJywgeyBodG1sOiB7fSwgd21sOiB7fSB9LCBbd21sX3J1bnRpbWVfMS5pZkUodGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OnNlbGVjdGFibGUnKSwgZnVuY3Rpb24gaWY0KCkgeyByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCd0aCcsIHsgaHRtbDoge30sIHdtbDoge30gfSwgW3dtbF9ydW50aW1lXzEubm9kZSgnaW5wdXQnLCB7IGh0bWw6IHsgJ3R5cGUnOiBcImNoZWNrYm94XCIsICdvbmNsaWNrJzogZnVuY3Rpb24gZnVuY3Rpb25fbGl0ZXJhbF8xKCkgeyByZXR1cm4gdGhpcy5tb2RlbC5hbGxSb3dzU2VsZWN0ZWQoKTsgfS5iaW5kKHRoaXMpIH0sIHdtbDoge30gfSwgW10sIHZpZXcpXSwgdmlldyk7IH0uYmluZCh0aGlzKSwgd21sX3J1bnRpbWVfMS5lbXB0eSksIHdtbF9ydW50aW1lXzEuZm9yRShmaWVsZHMsIGZ1bmN0aW9uIGZvcjIoZmllbGQpIHsgcmV0dXJuIHdtbF9ydW50aW1lXzEuaWZFKCFmaWVsZC5oaWRkZW4sIGZ1bmN0aW9uIGlmNSgpIHsgcmV0dXJuIHdtbF9ydW50aW1lXzEuaWZFKGZpZWxkLnNvcnRBcywgZnVuY3Rpb24gaWY2KCkgeyByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCd0aCcsIHsgaHRtbDogeyAnY2xhc3MnOiBbdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmhlYWRpbmdDbGFzcycpLCAodGhpcy5zb3J0ZWRPbiA9PT0gZmllbGQubmFtZSkgPyBTdHlsZXMuQUNUSVZFIDogJyddLmpvaW4oJyAnKSwgJ29uY2xpY2snOiBmdW5jdGlvbiBmdW5jdGlvbl9saXRlcmFsXzIoKSB7IHJldHVybiB0aGlzLm1vZGVsLmhlYWRpbmdDbGlja2VkKG5ldyBUYWJsZV8xLkhlYWRpbmdDbGlja2VkRXZlbnQoZmllbGQubmFtZSwgZmllbGQsIHRoaXMpKTsgfS5iaW5kKHRoaXMpIH0sIHdtbDoge30gfSwgW3dtbF9ydW50aW1lXzEuZG9taWZ5KGZpZWxkLmhlYWRpbmcpLCB3bWxfcnVudGltZV8xLmlmRSh0aGlzLnNvcnRlZE9uID09PSBmaWVsZC5uYW1lLCBmdW5jdGlvbiBpZjcoKSB7IHJldHVybiB3bWxfcnVudGltZV8xLmRvbWlmeSh0aGlzLmFycm93KTsgfS5iaW5kKHRoaXMpLCB3bWxfcnVudGltZV8xLmVtcHR5KV0sIHZpZXcpOyB9LmJpbmQodGhpcyksIGZ1bmN0aW9uIGVsc2VfY2xhdXNlNCgpIHsgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgndGgnLCB7IGh0bWw6IHsgJ2NsYXNzJzogW3RoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpoZWFkaW5nQ2xhc3MnKSwgKHRoaXMuc29ydGVkT24gPT09IGZpZWxkLm5hbWUpID8gU3R5bGVzLkFDVElWRSA6ICcnXS5qb2luKCcgJyksICdvbmNsaWNrJzogZnVuY3Rpb24gZnVuY3Rpb25fbGl0ZXJhbF8zKCkgeyByZXR1cm4gdGhpcy5tb2RlbC5oZWFkaW5nQ2xpY2tlZChuZXcgVGFibGVfMS5IZWFkaW5nQ2xpY2tlZEV2ZW50KGZpZWxkLm5hbWUsIGZpZWxkLCB0aGlzKSk7IH0uYmluZCh0aGlzKSB9LCB3bWw6IHt9IH0sIFt3bWxfcnVudGltZV8xLmRvbWlmeShmaWVsZC5oZWFkaW5nKSwgd21sX3J1bnRpbWVfMS5pZkUodGhpcy5zb3J0ZWRPbiA9PT0gZmllbGQubmFtZSwgZnVuY3Rpb24gaWY4KCkgeyByZXR1cm4gd21sX3J1bnRpbWVfMS5kb21pZnkodGhpcy5hcnJvdyk7IH0uYmluZCh0aGlzKSwgd21sX3J1bnRpbWVfMS5lbXB0eSldLCB2aWV3KTsgfS5iaW5kKHRoaXMpKTsgfS5iaW5kKHRoaXMpLCB3bWxfcnVudGltZV8xLmVtcHR5KTsgfS5iaW5kKHRoaXMpLCBmdW5jdGlvbiBmb3Jfb3RoZXJ3aXNlMigpIHsgcmV0dXJuIHdtbF9ydW50aW1lXzEuZW1wdHkoKTsgfS5iaW5kKHRoaXMpKV0sIHZpZXcpOyB9XG5leHBvcnRzLnRoZWFkID0gdGhlYWQ7XG5mdW5jdGlvbiB0Ym9keSh2aWV3LCBkYXRhLCBmaWVsZHMpIHsgcmV0dXJuIHdtbF9ydW50aW1lXzEud2lkZ2V0KF8xLkZyYWdtZW50LCB7IGh0bWw6IHt9LCB3bWw6IHt9IH0sIFt3bWxfcnVudGltZV8xLmZvckUoZGF0YSwgZnVuY3Rpb24gZm9yMyhyb3csIGluZGV4KSB7IHJldHVybiB3bWxfcnVudGltZV8xLm5vZGUoJ3RyJywgeyBodG1sOiB7ICdjbGFzcyc6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpyb3dDbGFzcycpLCAnb25jbGljayc6IGZ1bmN0aW9uIGZ1bmN0aW9uX2xpdGVyYWxfNCgpIHsgcmV0dXJuIHRoaXMubW9kZWwucm93Q2xpY2tlZChuZXcgVGFibGVfMS5Sb3dDbGlja2VkRXZlbnQocm93LCBpbmRleCwgZGF0YSwgdGhpcykpOyB9LmJpbmQodGhpcykgfSwgd21sOiB7fSB9LCBbd21sX3J1bnRpbWVfMS5pZkUodGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OnNlbGVjdGFibGUnKSwgZnVuY3Rpb24gaWY5KCkgeyByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCd0ZCcsIHsgaHRtbDoge30sIHdtbDoge30gfSwgW3dtbF9ydW50aW1lXzEubm9kZSgnaW5wdXQnLCB7IGh0bWw6IHsgJ3R5cGUnOiBcImNoZWNrYm94XCIsICdvbmNsaWNrJzogZnVuY3Rpb24gZnVuY3Rpb25fbGl0ZXJhbF81KCkgeyByZXR1cm4gdGhpcy5tb2RlbC5yb3dTZWxlY3RlZChuZXcgVGFibGVfMS5Sb3dTZWxlY3RlZEV2ZW50KHJvdywgaW5kZXgsIGRhdGEsIHRoaXMpKTsgfS5iaW5kKHRoaXMpIH0sIHdtbDoge30gfSwgW10sIHZpZXcpXSwgdmlldyk7IH0uYmluZCh0aGlzKSwgd21sX3J1bnRpbWVfMS5lbXB0eSksIHdtbF9ydW50aW1lXzEuZm9yRShmaWVsZHMsIGZ1bmN0aW9uIGZvcjQoZmllbGQpIHsgcmV0dXJuIHdtbF9ydW50aW1lXzEuaWZFKCFmaWVsZC5oaWRkZW4sIGZ1bmN0aW9uIGlmMTAoKSB7IHJldHVybiB3bWxfcnVudGltZV8xLm5vZGUoJ3RkJywgeyBodG1sOiB7ICdjbGFzcyc6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpjZWxsQ2xhc3MnKSwgJ29uY2xpY2snOiBmdW5jdGlvbiBmdW5jdGlvbl9saXRlcmFsXzYoKSB7IHJldHVybiB0aGlzLm1vZGVsLmNlbGxDbGlja2VkKG5ldyBUYWJsZV8xLkNlbGxDbGlja2VkRXZlbnQocHJvcGVydHlfc2Vla18xLmdldChmaWVsZC5uYW1lLCByb3cpLCBmaWVsZC5uYW1lLCBpbmRleCwgcm93LCB0aGlzKSk7IH0uYmluZCh0aGlzKSB9LCB3bWw6IHt9IH0sIFt3bWxfcnVudGltZV8xLmlmRShmaWVsZC5mcmFnbWVudCwgZnVuY3Rpb24gaWYxMSgpIHsgcmV0dXJuIGZpZWxkLmZyYWdtZW50LmNhbGwodGhpcywgdmlldywgcHJvcGVydHlfc2Vla18xLmdldChmaWVsZC5uYW1lLCByb3cpLCBmaWVsZC5uYW1lLCByb3csIGZpZWxkKTsgfS5iaW5kKHRoaXMpLCBmdW5jdGlvbiBlbHNlX2NsYXVzZTUoKSB7IHJldHVybiB3bWxfcnVudGltZV8xLmRvbWlmeShwcm9wZXJ0eV9zZWVrXzEuZ2V0KGZpZWxkLm5hbWUsIHJvdykpOyB9LmJpbmQodGhpcykpXSwgdmlldyk7IH0uYmluZCh0aGlzKSwgd21sX3J1bnRpbWVfMS5lbXB0eSk7IH0uYmluZCh0aGlzKSwgZnVuY3Rpb24gZm9yX290aGVyd2lzZTQoKSB7IHJldHVybiB3bWxfcnVudGltZV8xLmVtcHR5KCk7IH0uYmluZCh0aGlzKSldLCB2aWV3KTsgfS5iaW5kKHRoaXMpLCBmdW5jdGlvbiBmb3Jfb3RoZXJ3aXNlNCgpIHsgcmV0dXJuIHdtbF9ydW50aW1lXzEuZW1wdHkoKTsgfS5iaW5kKHRoaXMpKV0sIHZpZXcpOyB9XG5leHBvcnRzLnRib2R5ID0gdGJvZHk7XG5mdW5jdGlvbiB0YWJsZSh2aWV3KSB7IHJldHVybiB3bWxfcnVudGltZV8xLm5vZGUoJ3RhYmxlJywgeyBodG1sOiB7ICdjbGFzcyc6IFtTdHlsZXMuVEFCTEUsIHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpjbGFzcycsICcnKV0uam9pbignICcpIH0sIHdtbDogeyAnaWQnOiBcInJvb3RcIiB9IH0sIFt3bWxfcnVudGltZV8xLm5vZGUoJ3RoZWFkJywgeyBodG1sOiB7fSwgd21sOiB7ICdpZCc6IFwiaGVhZFwiIH0gfSwgW3RoZWFkLmNhbGwodGhpcywgdmlldywgdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmZpZWxkcycpKV0sIHZpZXcpLCB3bWxfcnVudGltZV8xLm5vZGUoJ3Rib2R5JywgeyBodG1sOiB7fSwgd21sOiB7ICdpZCc6IFwiYm9keVwiIH0gfSwgW3Rib2R5LmNhbGwodGhpcywgdmlldywgdGhpcy5kYXRhLCB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6ZmllbGRzJykpXSwgdmlldyldLCB2aWV3KTsgfVxuZXhwb3J0cy50YWJsZSA9IHRhYmxlO1xudmFyIFRhYmxlVmlldyA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFRhYmxlVmlldywgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBUYWJsZVZpZXcoY29udGV4dCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBjb250ZXh0KSB8fCB0aGlzO1xuICAgICAgICB2YXIgdmlldyA9IF90aGlzO1xuICAgICAgICBfdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB3bWxfcnVudGltZV8xLndpZGdldChfMS5GcmFnbWVudCwgeyBodG1sOiB7fSwgd21sOiB7fSB9LCBbd21sX3J1bnRpbWVfMS5pZkUodGhpcy5kYXRhLmxlbmd0aCA9PT0gMCwgZnVuY3Rpb24gaWYxMigpIHsgcmV0dXJuIHdtbF9ydW50aW1lXzEuaWZFKHRoaXMuYXR0cmlidXRlcy5yZWFkKCdlbXB0eU1hY3JvJyksIGZ1bmN0aW9uIGlmMTMoKSB7IHJldHVybiB0aGlzLmF0dHJpYnV0ZXMucmVhZC5jYWxsKHRoaXMsIHZpZXcsICdlbXB0eU1hY3JvJyk7IH0uYmluZCh0aGlzKSwgZnVuY3Rpb24gZWxzZV9jbGF1c2U2KCkgeyByZXR1cm4gdGFibGUuY2FsbCh0aGlzLCB2aWV3KTsgfS5iaW5kKHRoaXMpKTsgfS5iaW5kKHRoaXMpLCBmdW5jdGlvbiBlbHNlX2NsYXVzZTcoKSB7IHJldHVybiB0YWJsZS5jYWxsKHRoaXMsIHZpZXcpOyB9LmJpbmQodGhpcykpXSwgdmlldyk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIFRhYmxlVmlldztcbn0od21sX3J1bnRpbWVfMS5BcHBWaWV3KSk7XG5leHBvcnRzLlRhYmxlVmlldyA9IFRhYmxlVmlldztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRhYmxlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgd21sX3J1bnRpbWVfMSA9IHJlcXVpcmUoXCJAcXVlbmsvd21sLXJ1bnRpbWVcIik7XG52YXIgU3R5bGVzID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi9TdHlsZXNcIik7XG52YXIgdXRpbF8xID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi91dGlsXCIpO1xudmFyIHRhYnNfMSA9IHJlcXVpcmUoXCIuL3dtbC90YWJzXCIpO1xuLyoqXG4gKiBUYWJcbiAqL1xudmFyIFRhYiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFRhYiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBUYWIoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IHRhYnNfMS5UYWJWaWV3KF90aGlzKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBjbGljayB0aGlzIFRhYlxuICAgICAqL1xuICAgIFRhYi5wcm90b3R5cGUuY2xpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMudmlldy5pZHMubGluay5jbGljaygpO1xuICAgIH07XG4gICAgVGFiLnByb3RvdHlwZS5jbGlja2VkID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB2YXIgcGFyZW50ID0gdGhpcy52aWV3Lmlkcy5yb290LnBhcmVudE5vZGU7XG4gICAgICAgIHZhciB1cyA9IHBhcmVudC5jaGlsZHJlbjtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB1cy5sZW5ndGg7IGkrKylcbiAgICAgICAgICAgIHVzW2ldLmNsYXNzTGlzdC5yZW1vdmUoU3R5bGVzLkFDVElWRSk7XG4gICAgICAgIHRoaXMudmlldy5pZHMucm9vdC5jbGFzc0xpc3QuYWRkKFN0eWxlcy5BQ1RJVkUpO1xuICAgICAgICB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6b25DbGljaycsIHV0aWxfMS5ub29wKSh0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6bmFtZScpKTtcbiAgICB9O1xuICAgIHJldHVybiBUYWI7XG59KHdtbF9ydW50aW1lXzEuQ29tcG9uZW50KSk7XG5leHBvcnRzLlRhYiA9IFRhYjtcbi8qKlxuICogVGFic1xuICovXG52YXIgVGFicyA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFRhYnMsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gVGFicygpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnZpZXcgPSBuZXcgdGFic18xLlRhYnNWaWV3KF90aGlzKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gVGFicztcbn0od21sX3J1bnRpbWVfMS5Db21wb25lbnQpKTtcbmV4cG9ydHMuVGFicyA9IFRhYnM7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1UYWJzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgd21sX3J1bnRpbWVfMSA9IHJlcXVpcmUoXCJAcXVlbmsvd21sLXJ1bnRpbWVcIik7XG52YXIgU3R5bGVzID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi9TdHlsZXNcIik7XG52YXIgVGFiVmlldyA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFRhYlZpZXcsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gVGFiVmlldyhjb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbnRleHQpIHx8IHRoaXM7XG4gICAgICAgIHZhciB2aWV3ID0gX3RoaXM7XG4gICAgICAgIF90aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgnbGknLCB7IGh0bWw6IHsgJ3JvbGUnOiBcInByZXNlbnRhdGlvblwiLCAnY2xhc3MnOiAodGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmFjdGl2ZScpKSA/IFN0eWxlcy5BQ1RJVkUgOiBudWxsIH0sIHdtbDogeyAnaWQnOiBcInJvb3RcIiB9IH0sIFt3bWxfcnVudGltZV8xLm5vZGUoJ2EnLCB7IGh0bWw6IHsgJ2hyZWYnOiBcIiNcIiwgJ29uY2xpY2snOiB0aGlzLmNsaWNrZWQuYmluZCh0aGlzKSB9LCB3bWw6IHsgJ2lkJzogXCJsaW5rXCIgfSB9LCBbd21sX3J1bnRpbWVfMS5pZkUodGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OnRleHQnKSwgZnVuY3Rpb24gaWYxNCgpIHsgcmV0dXJuIHdtbF9ydW50aW1lXzEuZG9taWZ5KHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzp0ZXh0JykpOyB9LmJpbmQodGhpcyksIGZ1bmN0aW9uIGVsc2VfY2xhdXNlOCgpIHsgcmV0dXJuIHdtbF9ydW50aW1lXzEuZG9taWZ5KHRoaXMuY2hpbGRyZW4pOyB9LmJpbmQodGhpcykpXSwgdmlldyldLCB2aWV3KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gVGFiVmlldztcbn0od21sX3J1bnRpbWVfMS5BcHBWaWV3KSk7XG5leHBvcnRzLlRhYlZpZXcgPSBUYWJWaWV3O1xudmFyIFRhYnNWaWV3ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoVGFic1ZpZXcsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gVGFic1ZpZXcoY29udGV4dCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBjb250ZXh0KSB8fCB0aGlzO1xuICAgICAgICB2YXIgdmlldyA9IF90aGlzO1xuICAgICAgICBfdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB3bWxfcnVudGltZV8xLm5vZGUoJ3VsJywgeyBodG1sOiB7ICdjbGFzcyc6IFN0eWxlcy5UQUJTIH0sIHdtbDoge30gfSwgW3dtbF9ydW50aW1lXzEuZG9taWZ5KHRoaXMuY2hpbGRyZW4pXSwgdmlldyk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIFRhYnNWaWV3O1xufSh3bWxfcnVudGltZV8xLkFwcFZpZXcpKTtcbmV4cG9ydHMuVGFic1ZpZXcgPSBUYWJzVmlldztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRhYnMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB3bWxfcnVudGltZV8xID0gcmVxdWlyZShcIkBxdWVuay93bWwtcnVudGltZVwiKTtcbnZhciB0cmVlX25hdl8xID0gcmVxdWlyZShcIi4vd21sL3RyZWUtbmF2XCIpO1xudmFyIFN0eWxlcyA9IHJlcXVpcmUoXCJ3bWwtd2lkZ2V0cy1jb21tb24vU3R5bGVzXCIpO1xuLyoqXG4gKiBUcmVlTmF2SXRlbSBpcyB1c2VkIHRvIGluZGljYXRlIGFuIGl0ZW0gaW4gdGhlIHRyZWUuXG4gKi9cbnZhciBUcmVlTmF2SXRlbSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFRyZWVOYXZJdGVtLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFRyZWVOYXZJdGVtKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMudmlldyA9IG5ldyB0cmVlX25hdl8xLlRyZWVOYXZJdGVtVmlldyhfdGhpcyk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogYWN0aXZhdGUgdGhpcyBUcmVlSXRlbVxuICAgICAqL1xuICAgIFRyZWVOYXZJdGVtLnByb3RvdHlwZS5hY3RpdmF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGEgPSB0aGlzLnZpZXcuaWRzLmxpbms7XG4gICAgICAgIGlmIChhIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpXG4gICAgICAgICAgICBpZiAoYS5wYXJlbnROb2RlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2hpbGRyZW4gPSBhLnBhcmVudE5vZGUuY2hpbGRyZW47XG4gICAgICAgICAgICAgICAgYS5jbGFzc0xpc3QucmVtb3ZlKFN0eWxlcy5BQ1RJVkUpO1xuICAgICAgICAgICAgICAgIGEuY2xhc3NMaXN0LmFkZChTdHlsZXMuQUNUSVZFKTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKVxuICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGRyZW5baV0ubm9kZU5hbWUgPT09ICdBJylcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGlsZHJlbltpXSAhPT0gYSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbltpXS5jbGFzc0xpc3QucmVtb3ZlKFN0eWxlcy5BQ1RJVkUpO1xuICAgICAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogZGVhY3RpdmF0ZSB0aGlzIERyYXdlckxpbmtcbiAgICAgKi9cbiAgICBUcmVlTmF2SXRlbS5wcm90b3R5cGUuZGVhY3RpdmF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy52aWV3LmZpbmRCeUlkKCdhJykuY2xhc3NMaXN0LnJlbW92ZShTdHlsZXMuQUNUSVZFKTtcbiAgICB9O1xuICAgIHJldHVybiBUcmVlTmF2SXRlbTtcbn0od21sX3J1bnRpbWVfMS5Db21wb25lbnQpKTtcbmV4cG9ydHMuVHJlZU5hdkl0ZW0gPSBUcmVlTmF2SXRlbTtcbi8qKlxuICogVHJlZU5hdiBwcm92aWRlcyBhbiBhcGkgZm9yIGRpc3BsYXlpbmcgYSB0cmVlIG9mIGxpbmtzLlxuICovXG52YXIgVHJlZU5hdiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFRyZWVOYXYsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gVHJlZU5hdigpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnZpZXcgPSBuZXcgdHJlZV9uYXZfMS5UcmVlTmF2VmlldyhfdGhpcyk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgVHJlZU5hdi5wcm90b3R5cGUuaGFuZGxlRXZlbnQgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgIGlmIChjIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpXG4gICAgICAgICAgICAgICAgaWYgKGMgIT09IGUudGFyZ2V0KVxuICAgICAgICAgICAgICAgICAgICBjLmNsYXNzTGlzdC5yZW1vdmUoU3R5bGVzLkFDVElWRSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgVHJlZU5hdi5wcm90b3R5cGUucmVuZGVyZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoYykgeyByZXR1cm4gYy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF90aGlzKTsgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gVHJlZU5hdjtcbn0od21sX3J1bnRpbWVfMS5Db21wb25lbnQpKTtcbmV4cG9ydHMuVHJlZU5hdiA9IFRyZWVOYXY7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1UcmVlTmF2LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgd21sX3J1bnRpbWVfMSA9IHJlcXVpcmUoXCJAcXVlbmsvd21sLXJ1bnRpbWVcIik7XG52YXIgU3R5bGVzID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi9TdHlsZXNcIik7XG52YXIgdXRpbF8xID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi91dGlsXCIpO1xudmFyIFRyZWVOYXZJdGVtVmlldyA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFRyZWVOYXZJdGVtVmlldywgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBUcmVlTmF2SXRlbVZpZXcoY29udGV4dCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBjb250ZXh0KSB8fCB0aGlzO1xuICAgICAgICB2YXIgdmlldyA9IF90aGlzO1xuICAgICAgICBfdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB3bWxfcnVudGltZV8xLm5vZGUoJ2xpJywgeyBodG1sOiB7ICdjbGFzcyc6IFN0eWxlcy5UUkVFX05BVl9MSVNUX0lURU0gfSwgd21sOiB7fSB9LCBbd21sX3J1bnRpbWVfMS5ub2RlKCdhJywgeyBodG1sOiB7ICdjbGFzcyc6ICh0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6YWN0aXZlJywgZmFsc2UpKSA/IFN0eWxlcy5BQ1RJVkUgOiAnJywgJ2hyZWYnOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6aHJlZicsICcjJyksICdvbmNsaWNrJzogZnVuY3Rpb24gZnVuY3Rpb25fbGl0ZXJhbF83KCkgeyByZXR1cm4gdGhpcy5hY3RpdmF0ZSgpIHx8IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpvbkNsaWNrJywgdXRpbF8xLm5vb3ApKHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpuYW1lJykpOyB9LmJpbmQodGhpcykgfSwgd21sOiB7ICdpZCc6IFwibGlua1wiIH0gfSwgW3dtbF9ydW50aW1lXzEuZG9taWZ5KHRoaXMuY2hpbGRyZW4pXSwgdmlldyldLCB2aWV3KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gVHJlZU5hdkl0ZW1WaWV3O1xufSh3bWxfcnVudGltZV8xLkFwcFZpZXcpKTtcbmV4cG9ydHMuVHJlZU5hdkl0ZW1WaWV3ID0gVHJlZU5hdkl0ZW1WaWV3O1xudmFyIFRyZWVOYXZWaWV3ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoVHJlZU5hdlZpZXcsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gVHJlZU5hdlZpZXcoY29udGV4dCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBjb250ZXh0KSB8fCB0aGlzO1xuICAgICAgICB2YXIgdmlldyA9IF90aGlzO1xuICAgICAgICBfdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB3bWxfcnVudGltZV8xLm5vZGUoJ25hdicsIHsgaHRtbDogeyAnY2xhc3MnOiBTdHlsZXMuVFJFRV9OQVYgfSwgd21sOiB7ICdpZCc6IFwibmF2XCIgfSB9LCBbd21sX3J1bnRpbWVfMS5ub2RlKCd1bCcsIHsgaHRtbDogeyAnY2xhc3MnOiBTdHlsZXMuVFJFRV9OQVZfTElTVCB9LCB3bWw6IHsgJ2lkJzogXCJsaXN0XCIgfSB9LCBbd21sX3J1bnRpbWVfMS5kb21pZnkodGhpcy5jaGlsZHJlbildLCB2aWV3KV0sIHZpZXcpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBUcmVlTmF2Vmlldztcbn0od21sX3J1bnRpbWVfMS5BcHBWaWV3KSk7XG5leHBvcnRzLlRyZWVOYXZWaWV3ID0gVHJlZU5hdlZpZXc7XG4vLyMgc291cmNlTWFwcGluZ1VSTD10cmVlLW5hdi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmZ1bmN0aW9uIGJvdW5kYXJ5X3RvX2RvdCh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZS5zcGxpdCgnXVsnKS5qb2luKCcuJykuc3BsaXQoJ1snKS5qb2luKCcuJyk7XG59XG5mdW5jdGlvbiBzdHJpcF9icmFjZXModmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUuc3BsaXQoJ1snKS5qb2luKCcuJykuc3BsaXQoJ10nKS5qb2luKCcnKTtcbn1cbmZ1bmN0aW9uIGVzY2FwZV9kb3RzKHZhbHVlKSB7XG4gICAgdmFyIHZhbCA9IHZhbHVlLnNwbGl0KCdcXCcnKTtcbiAgICByZXR1cm4gKHZhbC5sZW5ndGggPCAzKSA/IHZhbC5qb2luKCdcXCcnKSA6IHZhbC5tYXAoZnVuY3Rpb24gKHNlZykge1xuICAgICAgICBpZiAoc2VnLmxlbmd0aCA8IDMpXG4gICAgICAgICAgICByZXR1cm4gc2VnO1xuICAgICAgICBpZiAoKHNlZ1swXSA9PT0gJy4nKSB8fCAoc2VnW3NlZy5sZW5ndGggLSAxXSA9PT0gJy4nKSlcbiAgICAgICAgICAgIHJldHVybiBzZWc7XG4gICAgICAgIHJldHVybiBzZWcuc3BsaXQoJy4nKS5qb2luKCcmJicpO1xuICAgIH0pLmpvaW4oJycpO1xufVxuZnVuY3Rpb24gdW5lc2NhcGVfZG90cyh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZS5zcGxpdCgnJiYnKS5qb2luKCcuJyk7XG59XG5mdW5jdGlvbiBwYXJ0aWZ5KHZhbHVlKSB7XG4gICAgaWYgKCF2YWx1ZSlcbiAgICAgICAgcmV0dXJuO1xuICAgIHJldHVybiBlc2NhcGVfZG90cyhzdHJpcF9icmFjZXMoYm91bmRhcnlfdG9fZG90KCcnICsgdmFsdWUpKSkuc3BsaXQoJy4nKTtcbn1cbmZ1bmN0aW9uIGNhbkNsb25lKG8pIHtcbiAgICByZXR1cm4gKHR5cGVvZiBvLl9fQ0xPTkVfXyA9PT0gJ2Z1bmN0aW9uJyk7XG59XG5mdW5jdGlvbiBjbG9uZShvKSB7XG4gICAgaWYgKCh0eXBlb2YgbyAhPT0gJ29iamVjdCcpIHx8IChvID09PSBudWxsKSlcbiAgICAgICAgcmV0dXJuIG87XG4gICAgaWYgKEFycmF5LmlzQXJyYXkobykpXG4gICAgICAgIHJldHVybiBvLm1hcChjbG9uZSk7XG4gICAgcmV0dXJuIChjYW5DbG9uZShvKSkgP1xuICAgICAgICBvLl9fQ0xPTkVfXyhjbG9uZSkgOiAoby5jb25zdHJ1Y3RvciAhPT0gT2JqZWN0KSA/IG8gOlxuICAgICAgICBPYmplY3Qua2V5cyhvKS5yZWR1Y2UoZnVuY3Rpb24gKHByZSwgaykge1xuICAgICAgICAgICAgcHJlW2tdID0gKHR5cGVvZiBvW2tdID09PSAnb2JqZWN0JykgP1xuICAgICAgICAgICAgICAgIGNsb25lKG9ba10pIDogb1trXTtcbiAgICAgICAgICAgIHJldHVybiBwcmU7XG4gICAgICAgIH0sIHt9KTtcbn1cbmZ1bmN0aW9uIGdldChwYXRoLCBvKSB7XG4gICAgdmFyIHBhcnRzID0gcGFydGlmeShwYXRoKTtcbiAgICB2YXIgZmlyc3Q7XG4gICAgaWYgKHR5cGVvZiBvID09PSAnb2JqZWN0Jykge1xuICAgICAgICBpZiAocGFydHMubGVuZ3RoID09PSAxKVxuICAgICAgICAgICAgcmV0dXJuIG9bdW5lc2NhcGVfZG90cyhwYXJ0c1swXSldO1xuICAgICAgICBpZiAocGFydHMubGVuZ3RoID09PSAwKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBmaXJzdCA9IG9bcGFydHMuc2hpZnQoKV07XG4gICAgICAgIHJldHVybiAoKHR5cGVvZiBvID09PSAnb2JqZWN0JykgJiYgKG8gIT09IG51bGwpKSA/XG4gICAgICAgICAgICBwYXJ0cy5yZWR1Y2UoZnVuY3Rpb24gKHRhcmdldCwgcHJvcCkge1xuICAgICAgICAgICAgICAgIGlmICh0YXJnZXQgPT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0W3VuZXNjYXBlX2RvdHMocHJvcCldO1xuICAgICAgICAgICAgfSwgZmlyc3QpIDogbnVsbDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2dldCgpOiBleHBlY3RzIGFuIG9iamVjdCBnb3QgJyArIHR5cGVvZiBvKTtcbiAgICB9XG59XG5leHBvcnRzLmdldCA9IGdldDtcbjtcbmZ1bmN0aW9uIHNldChwYXRoLCB2YWx1ZSwgb2JqKSB7XG4gICAgdmFyIHBhcnRzID0gcGFydGlmeShwYXRoKTtcbiAgICBpZiAoKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB8fCAob2JqID09IG51bGwpKSB7XG4gICAgICAgIHJldHVybiBjbG9uZShvYmopO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIF9zZXQob2JqLCB2YWx1ZSwgcGFydHMpO1xuICAgIH1cbn1cbmV4cG9ydHMuc2V0ID0gc2V0O1xuO1xuZnVuY3Rpb24gX3NldChvYmosIHZhbHVlLCBwYXJ0cykge1xuICAgIHZhciBvO1xuICAgIHZhciBrO1xuICAgIGlmIChwYXJ0cy5sZW5ndGggPT09IDApXG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICBvID0gKCh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0JykgfHwgKG9iaiA9PT0gbnVsbCkpID8ge30gOiBjbG9uZShvYmopO1xuICAgIGsgPSB1bmVzY2FwZV9kb3RzKHBhcnRzWzBdKTtcbiAgICBvW2tdID0gX3NldChvW2tdLCB2YWx1ZSwgcGFydHMuc2xpY2UoMSkpO1xuICAgIHJldHVybiBvO1xufVxuZnVuY3Rpb24gZGVmYXVsdF8xKGssIHYsIG8pIHtcbiAgICBpZiAobyA9PSBudWxsKVxuICAgICAgICByZXR1cm4gZ2V0KGssIHYpO1xuICAgIGVsc2VcbiAgICAgICAgcmV0dXJuIHNldChrLCB2LCBvKTtcbn1cbmV4cG9ydHMuZGVmYXVsdCA9IGRlZmF1bHRfMTtcbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIFN0eWxlcyA9IHJlcXVpcmUoXCJ3bWwtd2lkZ2V0cy1jb21tb24vU3R5bGVzXCIpO1xudmFyIHZpZXdfMSA9IHJlcXVpcmUoXCIuL3ZpZXdcIik7XG52YXIgVGFibGVfMSA9IHJlcXVpcmUoXCJAcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvdGFibGUvVGFibGVcIik7XG52YXIgY291bnQgPSAwO1xuO1xudmFyIE5leHQgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE5leHQobmFtZSwgYW1vdW50LCBzdGF0dXMsIHdhdGNoZXJzKSB7XG4gICAgICAgIGlmIChuYW1lID09PSB2b2lkIDApIHsgbmFtZSA9ICcnOyB9XG4gICAgICAgIGlmIChhbW91bnQgPT09IHZvaWQgMCkgeyBhbW91bnQgPSAwOyB9XG4gICAgICAgIGlmIChzdGF0dXMgPT09IHZvaWQgMCkgeyBzdGF0dXMgPSAnJzsgfVxuICAgICAgICBpZiAod2F0Y2hlcnMgPT09IHZvaWQgMCkgeyB3YXRjaGVycyA9IFtdOyB9XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuYW1vdW50ID0gYW1vdW50O1xuICAgICAgICB0aGlzLnN0YXR1cyA9IHN0YXR1cztcbiAgICAgICAgdGhpcy53YXRjaGVycyA9IHdhdGNoZXJzO1xuICAgIH1cbiAgICByZXR1cm4gTmV4dDtcbn0oKSk7XG5leHBvcnRzLk5leHQgPSBOZXh0O1xudmFyIGZpZWxkcyA9IFtcbiAgICB7IG5hbWU6ICdudW1iZXInLCBoZWFkaW5nOiAnTnVtYmVyJyB9LFxuICAgIHsgbmFtZTogJ25hbWUnLCBoZWFkaW5nOiAnTmFtZScgfSxcbiAgICB7IG5hbWU6ICdhbW91bnQnLCBoZWFkaW5nOiAnQW1vdW50JyB9LFxuICAgIHsgbmFtZTogJ3N0YXR1cycsIGhlYWRpbmc6ICdTdGF0dXMnIH0sXG4gICAgeyBuYW1lOiAnd2F0Y2hpbmcnLCBoZWFkaW5nOiAnV2F0Y2hpbmcnIH1cbl07XG52YXIgQXBwbGljYXRpb24gPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEFwcGxpY2F0aW9uKCkge1xuICAgICAgICB0aGlzLmZpZWxkcyA9IGZpZWxkcztcbiAgICAgICAgdGhpcy50YWJsZU1vZGVsID0gbmV3IFRhYmxlXzEuU29ydFRhYmxlTW9kZWwoKTtcbiAgICAgICAgdGhpcy5uZXh0ID0gbmV3IE5leHQoKTtcbiAgICAgICAgdGhpcy5yZWNvcmRzID0gW3sgbmFtZTogJ0pvemFpbiBIdWxkdW0nLCBhbW91bnQ6IDMyMDAwLCBzdGF0dXM6ICdhY3RpdmUnLCB3YXRjaGVyczogW10gfV07XG4gICAgICAgIHRoaXMudmlldyA9IG5ldyB2aWV3XzEuTWFpbih0aGlzKTtcbiAgICB9XG4gICAgQXBwbGljYXRpb24ucHJvdG90eXBlLnRvZ2dsZURyYXdlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy52aWV3LmZpbmRCeUlkKCdsYXlvdXQnKS50b2dnbGVEcmF3ZXIoKTtcbiAgICB9O1xuICAgIEFwcGxpY2F0aW9uLnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWwnKTtcbiAgICAgICAgdGhpcy5kaWFsb2cgPSBuZXcgdmlld18xLkNyZWF0ZURpYWxvZyh0aGlzKTtcbiAgICAgICAgd2hpbGUgKHRhcmdldC5maXJzdENoaWxkKVxuICAgICAgICAgICAgdGFyZ2V0LnJlbW92ZUNoaWxkKHRhcmdldC5maXJzdENoaWxkKTtcbiAgICAgICAgdGFyZ2V0LmFwcGVuZENoaWxkKHRoaXMuZGlhbG9nLnJlbmRlcigpKTtcbiAgICB9O1xuICAgIEFwcGxpY2F0aW9uLnByb3RvdHlwZS5zYXZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnJlY29yZHMucHVzaCh0aGlzLm5leHQpO1xuICAgICAgICB0aGlzLm5leHQgPSBuZXcgTmV4dCgpO1xuICAgICAgICB0aGlzLmRpYWxvZy5pZHMubW9kYWwuY2xvc2UoKTtcbiAgICAgICAgdGhpcy52aWV3LmludmFsaWRhdGUoKTtcbiAgICB9O1xuICAgIEFwcGxpY2F0aW9uLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHdpbmRvdy5hcHAgPSB0aGlzO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFpbicpLmFwcGVuZENoaWxkKHRoaXMudmlldy5yZW5kZXIoKSk7XG4gICAgICAgIHRoaXMuZHJhd2VyID0gdGhpcy52aWV3LmZpbmRCeUlkKCdsYXlvdXQnKTtcbiAgICB9O1xuICAgIEFwcGxpY2F0aW9uLm1haW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBuZXcgdGhpcygpO1xuICAgIH07XG4gICAgcmV0dXJuIEFwcGxpY2F0aW9uO1xufSgpKTtcbnZhciBhcHA7XG5hcHAgPSBBcHBsaWNhdGlvbi5tYWluKCk7XG5hcHAucnVuKCk7XG52YXIgbGF5b3V0ID0gYXBwLnZpZXcuZmluZEJ5SWQoJ2xheW91dCcpO1xudmFyIGRyYXdlciA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoU3R5bGVzLkRSQVdFUilbMF07XG5sYXlvdXQudG9nZ2xlRHJhd2VyKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB3bWxfcnVudGltZV8xID0gcmVxdWlyZShcIkBxdWVuay93bWwtcnVudGltZVwiKTtcbnZhciBjb21wb25lbnRzXzEgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzXCIpO1xudmFyIGNvbXBvbmVudHNfMiA9IHJlcXVpcmUoXCJAcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHNcIik7XG52YXIgY29tcG9uZW50c18zID0gcmVxdWlyZShcIkBxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50c1wiKTtcbnZhciBjb21wb25lbnRzXzQgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzXCIpO1xudmFyIGNvbXBvbmVudHNfNSA9IHJlcXVpcmUoXCJAcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHNcIik7XG52YXIgY29tcG9uZW50c182ID0gcmVxdWlyZShcIkBxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50c1wiKTtcbnZhciBDcmVhdGVEaWFsb2cgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhDcmVhdGVEaWFsb2csIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQ3JlYXRlRGlhbG9nKGNvbnRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29udGV4dCkgfHwgdGhpcztcbiAgICAgICAgdmFyIHZpZXcgPSBfdGhpcztcbiAgICAgICAgX3RoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gd21sX3J1bnRpbWVfMS53aWRnZXQoY29tcG9uZW50c181Lk1vZGFsLCB7XG4gICAgICAgICAgICAgICAgaHRtbDoge30sXG4gICAgICAgICAgICAgICAgd21sOiB7XG4gICAgICAgICAgICAgICAgICAgICdpZCc6IFwibW9kYWxcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIFt3bWxfcnVudGltZV8xLndpZGdldChjb21wb25lbnRzXzUuTW9kYWxIZWFkZXIsIHtcbiAgICAgICAgICAgICAgICAgICAgaHRtbDoge30sXG4gICAgICAgICAgICAgICAgICAgIHdtbDoge30sXG4gICAgICAgICAgICAgICAgICAgIHd3OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnb25DbG9zZSc6IGZ1bmN0aW9uIGZ1bmN0aW9uX2xpdGVyYWxfMSgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kaWFsb2cuaWRzLm1vZGFsLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LmJpbmQodGhpcylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIFt3bWxfcnVudGltZV8xLnRleHQoXCJcXG4gICAgICBDcmVhdGUgcmVjb3JkXFxuICAgIFwiKV0sIHZpZXcpLCB3bWxfcnVudGltZV8xLndpZGdldChjb21wb25lbnRzXzUuTW9kYWxCb2R5LCB7XG4gICAgICAgICAgICAgICAgICAgIGh0bWw6IHt9LFxuICAgICAgICAgICAgICAgICAgICB3bWw6IHt9XG4gICAgICAgICAgICAgICAgfSwgW3dtbF9ydW50aW1lXzEud2lkZ2V0KGNvbXBvbmVudHNfNi5JbnB1dCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDoge30sXG4gICAgICAgICAgICAgICAgICAgICAgICB3bWw6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgd3c6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaWQnOiBcIm5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbGFiZWwnOiBcIk5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnb25JbnB1dCc6IGZ1bmN0aW9uIGZ1bmN0aW9uX2xpdGVyYWxfMihlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm5leHQubmFtZSA9IGUudGFyZ2V0LnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCBbXSwgdmlldyksIHdtbF9ydW50aW1lXzEud2lkZ2V0KGNvbXBvbmVudHNfNi5JbnB1dCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDoge30sXG4gICAgICAgICAgICAgICAgICAgICAgICB3bWw6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgd3c6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaWQnOiBcImFtb3VudFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdsYWJlbCc6IFwiQW1vdW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3dhcm4nOiBcIkRvbid0IG92ZXIgZG8gaXQhXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3R5cGUnOiBcIm51bWJlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdvbklucHV0JzogZnVuY3Rpb24gZnVuY3Rpb25fbGl0ZXJhbF8zKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubmV4dC5hbW91bnQgPSBOdW1iZXIoZS50YXJnZXQudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCBbXSwgdmlldyksIHdtbF9ydW50aW1lXzEud2lkZ2V0KGNvbXBvbmVudHNfNi5TZWxlY3QsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGh0bWw6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgd21sOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHd3OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2lkJzogXCJzdGF0dXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbGFiZWwnOiBcIlN0YXR1c1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdvcHRpb25zJzogWydwYWlkJywgJ292ZXJkdWUnLCAnaGlzdG9yeSddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdvbklucHV0JzogZnVuY3Rpb24gZnVuY3Rpb25fbGl0ZXJhbF80KGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubmV4dC5zdGF0dXMgPSBlLnRhcmdldC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LmJpbmQodGhpcylcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwgW10sIHZpZXcpLCB3bWxfcnVudGltZV8xLm5vZGUoJ3NwYW4nLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBodG1sOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdtbDoge31cbiAgICAgICAgICAgICAgICAgICAgfSwgW3dtbF9ydW50aW1lXzEudGV4dChcIiBSZWNlaXZlIE5vdGlmaWNhdGlvbnM/IFwiKV0sIHZpZXcpLCB3bWxfcnVudGltZV8xLndpZGdldChjb21wb25lbnRzXzYuU3dpdGNoLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBodG1sOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdtbDoge30sXG4gICAgICAgICAgICAgICAgICAgICAgICB3dzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdvbkNoYW5nZSc6IGZ1bmN0aW9uIGZ1bmN0aW9uX2xpdGVyYWxfNShlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoZS50YXJnZXQudmFsdWUpID8gdGhpcy5uZXh0LndhdGNoZXJzLnB1c2goMSkgOiBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCBbXSwgdmlldyldLCB2aWV3KSwgd21sX3J1bnRpbWVfMS53aWRnZXQoY29tcG9uZW50c181Lk1vZGFsRm9vdGVyLCB7XG4gICAgICAgICAgICAgICAgICAgIGh0bWw6IHt9LFxuICAgICAgICAgICAgICAgICAgICB3bWw6IHt9XG4gICAgICAgICAgICAgICAgfSwgW3dtbF9ydW50aW1lXzEud2lkZ2V0KGNvbXBvbmVudHNfMS5CdXR0b24sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGh0bWw6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgd21sOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2lkJzogXCJjYW5jZWxCdXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHd3OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3RleHQnOiBcIkNhbmNlbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdvbkNsaWNrJzogZnVuY3Rpb24gZnVuY3Rpb25fbGl0ZXJhbF82KCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kaWFsb2cuaWRzLm1vZGFsLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIFtdLCB2aWV3KSwgd21sX3J1bnRpbWVfMS53aWRnZXQoY29tcG9uZW50c18xLkJ1dHRvbiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDoge30sXG4gICAgICAgICAgICAgICAgICAgICAgICB3bWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaWQnOiBcInNhdmVCdXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHd3OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3N0eWxlJzogXCItZGFuZ2VyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3RleHQnOiBcIlNhdmVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnY2xhc3MnOiBcIi1yaWdodFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdvbkNsaWNrJzogdGhpcy5zYXZlLmJpbmQodGhpcylcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwgW10sIHZpZXcpXSwgdmlldyldLCB2aWV3KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gQ3JlYXRlRGlhbG9nO1xufSh3bWxfcnVudGltZV8xLkFwcFZpZXcpKTtcbmV4cG9ydHMuQ3JlYXRlRGlhbG9nID0gQ3JlYXRlRGlhbG9nO1xuZnVuY3Rpb24gbmF2aWdhdGlvbih2aWV3KSB7XG4gICAgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgncCcsIHtcbiAgICAgICAgaHRtbDoge30sXG4gICAgICAgIHdtbDoge31cbiAgICB9LCBbd21sX3J1bnRpbWVfMS50ZXh0KFwiVGhpcyBpcyBpbiB0aGUgZHJhd2VyXCIpXSwgdmlldyk7XG59XG5leHBvcnRzLm5hdmlnYXRpb24gPSBuYXZpZ2F0aW9uO1xuZnVuY3Rpb24gY29udGVudCh2aWV3KSB7XG4gICAgcmV0dXJuIHdtbF9ydW50aW1lXzEuYm94KHdtbF9ydW50aW1lXzEud2lkZ2V0KGNvbXBvbmVudHNfMS5BY3Rpb25BcmVhLCB7XG4gICAgICAgIGh0bWw6IHt9LFxuICAgICAgICB3bWw6IHtcbiAgICAgICAgICAgICdpZCc6IFwiYWN0aW9uc1wiXG4gICAgICAgIH1cbiAgICB9LCBbd21sX3J1bnRpbWVfMS53aWRnZXQoY29tcG9uZW50c18xLk1lbnVCdXR0b24sIHtcbiAgICAgICAgICAgIGh0bWw6IHt9LFxuICAgICAgICAgICAgd21sOiB7fSxcbiAgICAgICAgICAgIHd3OiB7XG4gICAgICAgICAgICAgICAgJ29uQ2xpY2snOiB0aGlzLnRvZ2dsZURyYXdlci5iaW5kKHRoaXMpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIFtdLCB2aWV3KSwgd21sX3J1bnRpbWVfMS53aWRnZXQoY29tcG9uZW50c18xLkJ1dHRvbkdyb3VwLCB7XG4gICAgICAgICAgICBodG1sOiB7fSxcbiAgICAgICAgICAgIHdtbDoge30sXG4gICAgICAgICAgICB3dzoge1xuICAgICAgICAgICAgICAgICdjbGFzcyc6IFwiLXJpZ2h0XCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgW3dtbF9ydW50aW1lXzEud2lkZ2V0KGNvbXBvbmVudHNfMS5CdXR0b24sIHtcbiAgICAgICAgICAgICAgICBodG1sOiB7fSxcbiAgICAgICAgICAgICAgICB3bWw6IHtcbiAgICAgICAgICAgICAgICAgICAgJ2lkJzogXCJkaXNhYmxlZEJ1dHRvblwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB3dzoge1xuICAgICAgICAgICAgICAgICAgICAnc3R5bGUnOiBcIi1kZWZhdWx0XCIsXG4gICAgICAgICAgICAgICAgICAgICd0ZXh0JzogXCJEaXNhYmxlZFwiLFxuICAgICAgICAgICAgICAgICAgICAnZGlzYWJsZWQnOiB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgW10sIHZpZXcpLCB3bWxfcnVudGltZV8xLndpZGdldChjb21wb25lbnRzXzEuQnV0dG9uLCB7XG4gICAgICAgICAgICAgICAgaHRtbDoge30sXG4gICAgICAgICAgICAgICAgd21sOiB7XG4gICAgICAgICAgICAgICAgICAgICdpZCc6IFwiY3JlYXRlQnV0dG9uXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHd3OiB7XG4gICAgICAgICAgICAgICAgICAgICdzdHlsZSc6IFwiLWRhbmdlclwiLFxuICAgICAgICAgICAgICAgICAgICAndGV4dCc6IFwiQ3JlYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICdvbkNsaWNrJzogdGhpcy5jcmVhdGUuYmluZCh0aGlzKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIFtdLCB2aWV3KV0sIHZpZXcpXSwgdmlldyksIHdtbF9ydW50aW1lXzEud2lkZ2V0KGNvbXBvbmVudHNfMS5NYWluVmlldywge1xuICAgICAgICBodG1sOiB7fSxcbiAgICAgICAgd21sOiB7XG4gICAgICAgICAgICAnaWQnOiBcIm1haW5cIlxuICAgICAgICB9XG4gICAgfSwgW3dtbF9ydW50aW1lXzEud2lkZ2V0KGNvbXBvbmVudHNfMi5Db250YWluZXIsIHtcbiAgICAgICAgICAgIGh0bWw6IHt9LFxuICAgICAgICAgICAgd21sOiB7fVxuICAgICAgICB9LCBbd21sX3J1bnRpbWVfMS53aWRnZXQoY29tcG9uZW50c18yLlJvdywge1xuICAgICAgICAgICAgICAgIGh0bWw6IHt9LFxuICAgICAgICAgICAgICAgIHdtbDoge31cbiAgICAgICAgICAgIH0sIFt3bWxfcnVudGltZV8xLndpZGdldChjb21wb25lbnRzXzIuQ29sdW1uLCB7XG4gICAgICAgICAgICAgICAgICAgIGh0bWw6IHt9LFxuICAgICAgICAgICAgICAgICAgICB3bWw6IHt9XG4gICAgICAgICAgICAgICAgfSwgW3dtbF9ydW50aW1lXzEud2lkZ2V0KGNvbXBvbmVudHNfNC5QYW5lbCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDoge30sXG4gICAgICAgICAgICAgICAgICAgICAgICB3bWw6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgd3c6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnc3R5bGUnOiBcIi1pbmZvXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwgW3dtbF9ydW50aW1lXzEud2lkZ2V0KGNvbXBvbmVudHNfNC5QYW5lbEhlYWRlciwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGh0bWw6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdtbDoge31cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIFt3bWxfcnVudGltZV8xLnRleHQoXCJEZXRhaWxzXCIpXSwgdmlldyksIHdtbF9ydW50aW1lXzEud2lkZ2V0KGNvbXBvbmVudHNfNC5QYW5lbEJvZHksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBodG1sOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3bWw6IHt9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBbd21sX3J1bnRpbWVfMS50ZXh0KFwiUmVjb3JkczpcIildLCB2aWV3KSwgd21sX3J1bnRpbWVfMS53aWRnZXQoY29tcG9uZW50c18zLlRhYmxlLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDoge30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd21sOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3dzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZmllbGRzJzogdGhpcy5maWVsZHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdkYXRhJzogdGhpcy5yZWNvcmRzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbW9kZWwnOiB0aGlzLnRhYmxlTW9kZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBbXSwgdmlldyksIHdtbF9ydW50aW1lXzEud2lkZ2V0KGNvbXBvbmVudHNfNC5QYW5lbEZvb3Rlciwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGh0bWw6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdtbDoge31cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIFt3bWxfcnVudGltZV8xLmRvbWlmeSh0aGlzLnJlY29yZHMucmVkdWNlKGZ1bmN0aW9uIGZ1bmN0aW9uX2xpdGVyYWxfNyhwLCBjKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwICsgYy5hbW91bnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpLCAwKSldLCB2aWV3KV0sIHZpZXcpXSwgdmlldyldLCB2aWV3KV0sIHZpZXcpXSwgdmlldykpO1xufVxuZXhwb3J0cy5jb250ZW50ID0gY29udGVudDtcbnZhciBNYWluID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoTWFpbiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBNYWluKGNvbnRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29udGV4dCkgfHwgdGhpcztcbiAgICAgICAgdmFyIHZpZXcgPSBfdGhpcztcbiAgICAgICAgX3RoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gd21sX3J1bnRpbWVfMS53aWRnZXQoY29tcG9uZW50c18xLkRyYXdlckxheW91dCwge1xuICAgICAgICAgICAgICAgIGh0bWw6IHt9LFxuICAgICAgICAgICAgICAgIHdtbDoge1xuICAgICAgICAgICAgICAgICAgICAnaWQnOiBcImxheW91dFwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB3dzoge1xuICAgICAgICAgICAgICAgICAgICAnZHJhd2VyJzogbmF2aWdhdGlvbixcbiAgICAgICAgICAgICAgICAgICAgJ2NvbnRlbnQnOiBjb250ZW50LmJpbmQodGhpcylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBbXSwgdmlldyk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIE1haW47XG59KHdtbF9ydW50aW1lXzEuQXBwVmlldykpO1xuZXhwb3J0cy5NYWluID0gTWFpbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXZpZXcuanMubWFwIl19
