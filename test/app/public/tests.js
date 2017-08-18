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
        });
    children.forEach(function (c) { return adopt(c, e); });
    var id = attributes['wml'].id;
    if (id)
        view.register(id, e);
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
    if (id)
        view.register(id, w);
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
        this.widgets = [];
    }
    AppView.prototype.register = function (id, w) {
        if (this.ids.hasOwnProperty(id))
            throw new Error("Duplicate id '" + id + "' detected!");
        this.ids[id] = w;
        return this;
    };
    AppView.prototype.findById = function (id) {
        return (this.ids[id]) ? this.ids[id] : null;
    };
    AppView.prototype.invalidate = function () {
        var childs;
        var parent = this.tree.parentNode;
        var realFirstChild;
        var realFirstChildIndex;
        if (this.tree == null)
            throw new ReferenceError('Cannot invalidate a view that has not been rendered!');
        if (this.tree.parentNode == null)
            throw new ReferenceError('Attempt to invalidate a view that has not been inserted to DOM!');
        childs = this.tree.parentNode.children;
        //for some reason the reference stored does not have the correct parent node.
        //we do this to get a 'live' version of the node.
        for (var i = 0; i < childs.length; i++)
            if (childs[i] === this.tree) {
                realFirstChild = childs[i];
                realFirstChildIndex = i;
            }
        parent.replaceChild(this.render(), realFirstChild);
    };
    AppView.prototype.render = function () {
        this.ids = {};
        this.widgets.forEach(function (w) { return w.removed(); });
        this.widgets = [];
        this.tree = this.template.call(this.context);
        this.ids['root'] = (this.ids['root']) ? this.ids['root'] : this.tree;
        this.widgets.forEach(function (w) { return w.rendered(); });
        return this.tree;
    };
    return AppView;
}());
exports.AppView = AppView;

},{"property-seek":1}],3:[function(require,module,exports){
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
exports.TREE_NAV_LIST = 'tree-nav__list__item';
exports.TREE_NAV_LIST_ITEM = 'tree-nav__item';
exports.AUTOCOMPLETE = 'wat-kit-autocomplete';
exports.AUTOCOMPLETE_CONTAINER = 'wat-kit-autocomplete-container';
exports.AUTOCOMPLETE_INPUT_AREA = 'wat-kit-autocomplete-input-area';
exports.AUTOCOMPLETE_INPUT = 'wat-kit-autocomplete-input';
exports.AUTOCOMPLETE_OPTIONS = 'wat-kit-autocomplete-options';
exports.AUTOCOMPLETE_ITEM_WRAPPER = 'wat-kit-auto-complete-item-wrapper';

},{}],4:[function(require,module,exports){
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
var util_1 = require("wml-widgets-common/util");
var wml_runtime_1 = require("@quenk/wml-runtime");
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
    /**
     * setContent replaces the content of this view.
     */
    ActionArea.prototype.setContent = function (r) {
        util_1.replaceContent(r, this.view.findById('content'));
        return this;
    };
    return ActionArea;
}(wml_runtime_1.Component));
exports.ActionArea = ActionArea;
exports.default = ActionArea;

},{"./wml/action_area":6,"@quenk/wml-runtime":2,"wml-widgets-common/util":4}],6:[function(require,module,exports){
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

},{"@quenk/wml-runtime":2,"wml-widgets-common/Styles":3,"wml-widgets-common/util":4}],7:[function(require,module,exports){
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

},{"./wml/busy_indicator":8,"@quenk/wml-runtime":2}],8:[function(require,module,exports){
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

},{"@quenk/wml-runtime":2}],9:[function(require,module,exports){
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
var button_1 = require("./wml/button");
;
/**
 * Button is an improvement over HTMLButtionElement
 */
var Button = (function (_super) {
    __extends(Button, _super);
    function Button() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new button_1.Main(_this);
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
}(wml_runtime_1.Component));
exports.Button = Button;
exports.default = Button;

},{"./wml/button":10,"@quenk/wml-runtime":2}],10:[function(require,module,exports){
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
var Main = (function (_super) {
    __extends(Main, _super);
    function Main(context) {
        var _this = _super.call(this, context) || this;
        var view = _this;
        _this.template = function () {
            return wml_runtime_1.widget(_1.Fragment, { html: {}, wml: {} }, [wml_runtime_1.ifE(this.attributes.read('ww:href'), function if0() { return wml_runtime_1.node('a', { html: { 'href': this.attributes.read('ww:href'), 'class': util_1.combine([Styles.BUTTON, this.attributes.read('ww:variant', ''), this.attributes.read('ww:size', ''), this.attributes.read('ww:style', Styles.DEFAULT), this.attributes.read('ww:class')]), 'onclick': this.attributes.read('ww:onClick', util_1.noop) }, wml: { 'id': "button" } }, [wml_runtime_1.domify(this.attributes.read('ww:text')), wml_runtime_1.domify(this.children)], view); }.bind(this), function else_clause0() { return wml_runtime_1.node('button', { html: { 'type': this.attributes.read('ww:type', 'button'), 'name': this.attributes.read('ww:name', ''), 'class': util_1.combine([Styles.BUTTON, this.attributes.read('ww:variant', ''), this.attributes.read('ww:size', ''), this.attributes.read('ww:style', Styles.DEFAULT), this.attributes.read('ww:class')]), 'onclick': this.attributes.read('ww:onClick', util_1.noop) }, wml: { 'id': "button" } }, [wml_runtime_1.domify(this.attributes.read('ww:text')), wml_runtime_1.domify(this.children)], view); }.bind(this))], view);
        };
        return _this;
    }
    return Main;
}(wml_runtime_1.AppView));
exports.Main = Main;

},{"../../":16,"@quenk/wml-runtime":2,"wml-widgets-common/Styles":3,"wml-widgets-common/util":4}],11:[function(require,module,exports){
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
var drawer_layout_1 = require("./wml/drawer-layout");
var util_1 = require("wml-widgets-common/util");
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
    DrawerLayout.prototype._getDrawerDOM = function () {
        return this.view.findById('drawer');
    };
    DrawerLayout.prototype._combine = function (classes) {
        return classes.join(' ');
    };
    /**
     * drawerVisible queries whether the Drawer is visible or not.
     * @returns {Boolean}
     */
    DrawerLayout.prototype.drawerVisible = function () {
        return !this._getDrawerDOM().classList.contains(Styles.HIDDEN);
    };
    /**
     * hideDrawer hides the drawer.
     */
    DrawerLayout.prototype.hideDrawer = function () {
        if (this.drawerVisible())
            this._getDrawerDOM().classList.add(Styles.HIDDEN);
    };
    /**
     * showDrawer shows the drawer
     */
    DrawerLayout.prototype.showDrawer = function () {
        if (!this.drawerVisible())
            this._getDrawerDOM().classList.remove(Styles.HIDDEN);
    };
    /**
     * toggle the visibility of this Drawer
     */
    DrawerLayout.prototype.toggleDrawer = function () {
        this._getDrawerDOM().classList.toggle(Styles.HIDDEN);
    };
    /**
     * setContent replaces the content of this view.
     */
    DrawerLayout.prototype.setContent = function (r) {
        util_1.replaceContent(r, this.view.findById('content'));
        return this;
    };
    return DrawerLayout;
}(wml_runtime_1.Component));
exports.DrawerLayout = DrawerLayout;
exports.default = DrawerLayout;

},{"./wml/drawer-layout":12,"@quenk/wml-runtime":2,"wml-widgets-common/Styles":3,"wml-widgets-common/util":4}],12:[function(require,module,exports){
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
            return wml_runtime_1.node('div', { html: { 'class': Styles.DRAWER_LAYOUT }, wml: { 'id': "content" } }, [wml_runtime_1.node('div', { html: { 'class': Styles.DRAWER }, wml: { 'id': "drawer" } }, [wml_runtime_1.node('div', { html: { 'class': Styles.DRAWER_CONTENT }, wml: {} }, [wml_runtime_1.ifE(this.attributes.read('ww:navigation'), function if1() { return this.attributes.read('ww:navigation').call(this, view); }.bind(this), wml_runtime_1.empty)], view)], view), wml_runtime_1.ifE(this.attributes.read('ww:content'), function if2() { return this.attributes.read('ww.content').call(this, view); }.bind(this), function else_clause1() { return wml_runtime_1.domify(this.children); }.bind(this))], view);
        };
        return _this;
    }
    return Main;
}(wml_runtime_1.AppView));
exports.Main = Main;

},{"@quenk/wml-runtime":2,"wml-widgets-common/Styles":3}],13:[function(require,module,exports){
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

},{"@quenk/wml-runtime":2}],14:[function(require,module,exports){
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

},{"./wml/grid":15,"@quenk/wml-runtime":2,"wml-widgets-common/Styles":3}],15:[function(require,module,exports){
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

},{"@quenk/wml-runtime":2,"wml-widgets-common/Styles":3,"wml-widgets-common/util":4}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* jshint ignore:start */
/*
export BreadCrumbMenu from './breadcrumbs/BreadCrumbMenu';
export BreadCrumb from './breadcrumbs/BreadCrumb';
export Autocomplete from './autocomplete/Autocomplete';
export Jumbotron from './jumbotron/Jumbotron';
export Well from './well/Well';
export Card from './card/Card';
export CardImage from './card/CardImage';
export CardTitle from './card/CardTitle';
export CardBlock from './card/CardBlock';
export ListGroup from './list-group/ListGroup';
export ListGroupItem from './list-group/ListGroupItem';
export Search from './search/Search';
*/
var Fragment_1 = require("./fragment/Fragment");
exports.Fragment = Fragment_1.Fragment;
var DrawerLayout_1 = require("./drawer-layout/DrawerLayout");
exports.DrawerLayout = DrawerLayout_1.DrawerLayout;
var ActionArea_1 = require("./action-area/ActionArea");
exports.ActionArea = ActionArea_1.ActionArea;
var MainView_1 = require("./main-view/MainView");
exports.MainView = MainView_1.MainView;
var MenuButton_1 = require("./menu-button/MenuButton");
exports.MenuButton = MenuButton_1.MenuButton;
var Button_1 = require("./button/Button");
exports.Button = Button_1.Button;
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
var Tabs_1 = require("./tabs/Tabs");
exports.Tab = Tabs_1.Tab;
exports.Tabs = Tabs_1.Tabs;
var BusyIndicator_1 = require("./busy-indicator/BusyIndicator");
exports.BusyIndicator = BusyIndicator_1.BusyIndicator;
var TreeNav_1 = require("./tree-nav/TreeNav");
exports.TreeNav = TreeNav_1.TreeNav;
exports.TreeNavItem = TreeNav_1.TreeNavItem;
/* jshint ignore:end */

},{"./action-area/ActionArea":5,"./busy-indicator/BusyIndicator":7,"./button/Button":9,"./drawer-layout/DrawerLayout":11,"./fragment/Fragment":13,"./grid/Grid":14,"./input/Input":17,"./main-view/MainView":19,"./menu-button/MenuButton":21,"./modal/Modal":23,"./panel/Panel":25,"./switch/Switch":27,"./table/Table":29,"./tabs/Tabs":31,"./tree-nav/TreeNav":33}],17:[function(require,module,exports){
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
        var ret = this.attributes.read('wat:value');
        return (typeof ret === 'function') ? ret(this.attributes.read('wat:name')) : ret;
    };
    /**
     * getClass
     */
    Input.prototype.getClass = function () {
        var c = "form-group " + this.attributes.read('wat:class');
        if (!this.attributes.read('wat:message'))
            return c;
        return c + " " + this.attributes.read('wat:variant', 'has-error');
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

},{"./wml/input":18,"@quenk/wml-runtime":2,"wml-widgets-common/util":4}],18:[function(require,module,exports){
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
            return wml_runtime_1.node('div', { html: { 'class': [Styles.FORM_GROUP, this.attributes.read('ww:variant', '')].join(',') }, wml: {} }, [label.call(this, view), wml_runtime_1.ifE(this.attributes.read('ww:type', 'text') !== 'textarea', function if3() { return wml_runtime_1.node('input', { html: { 'id': this.attributes.read('ww:id', ''), 'title': this.attributes.read('ww:title'), 'name': this.attributes.read('ww:name', this.attributes.read('ww:id', '')), 'type': this.attributes.read('ww:type', 'text'), 'placeholder': this.attributes.read('ww:placeholder'), 'oninput': this.delegate.onInput.bind(this.delegate), 'value': this.initialValue(), 'disabled': this.attributes.read('ww:disabled', null), 'readonly': this.attributes.read('ww:readonly', null), 'class': Styles.INPUT }, wml: { 'id': "input" } }, [], view); }.bind(this), function else_clause2() { return wml_runtime_1.node('textarea', { html: { 'id': this.attributes.read('ww:id', ''), 'title': this.attributes.read('ww:title'), 'name': this.attributes.read('ww:name', this.attributes.read('ww:id', '')), 'class': Styles.TEXTAREA, 'placeholder': this.attributes.read('ww:placeholder'), 'oninput': this.delegate.onInput.bind(this.delegate), 'disabled': this.attributes.read('ww:disabled', null), 'readonly': this.attributes.read('ww:readonly', null), 'rows': this.attributes.read('wat:rows') }, wml: { 'id': "input" } }, [wml_runtime_1.domify(this.initialValue())], view); }.bind(this)), message.call(this, view)], view);
        };
        return _this;
    }
    return InputView;
}(wml_runtime_1.AppView));
exports.InputView = InputView;

},{"@quenk/wml-runtime":2,"wml-widgets-common/Styles":3}],19:[function(require,module,exports){
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
    /**
     * setContent replaces the content of this view.
     */
    MainView.prototype.setContent = function (r) {
        util_1.replaceContent(r, this.view.findById('content'));
        return this;
    };
    return MainView;
}(wml_runtime_1.Component));
exports.MainView = MainView;

},{"./wml/main-view":20,"@quenk/wml-runtime":2,"wml-widgets-common/util":4}],20:[function(require,module,exports){
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

},{"@quenk/wml-runtime":2,"wml-widgets-common/Styles":3,"wml-widgets-common/util":4}],21:[function(require,module,exports){
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

},{"./wml/menu_button":22,"@quenk/wml-runtime":2}],22:[function(require,module,exports){
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

},{"@quenk/wml-runtime":2,"wml-widgets-common/Styles":3,"wml-widgets-common/util":4}],23:[function(require,module,exports){
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

},{"./wml/modal":24,"@quenk/wml-runtime":2}],24:[function(require,module,exports){
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

},{"@quenk/wml-runtime":2,"wml-widgets-common/Styles":3,"wml-widgets-common/util":4}],25:[function(require,module,exports){
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

},{"./wml/panel":26,"@quenk/wml-runtime":2}],26:[function(require,module,exports){
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

},{"@quenk/wml-runtime":2,"wml-widgets-common/Styles":3,"wml-widgets-common/util":4}],27:[function(require,module,exports){
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

},{"./wml/switch":28,"@quenk/wml-runtime":2}],28:[function(require,module,exports){
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

},{"@quenk/wml-runtime":2,"wml-widgets-common/Styles":3,"wml-widgets-common/util":4}],29:[function(require,module,exports){
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
    return Table;
}(wml_runtime_1.Component));
exports.Table = Table;

},{"./wml/table":30,"@quenk/wml-runtime":2,"property-seek":35}],30:[function(require,module,exports){
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
function thead(view, fields) { return wml_runtime_1.node('tr', { html: {}, wml: {} }, [wml_runtime_1.ifE(this.attributes.read('ww:selectable'), function if4() { return wml_runtime_1.node('th', { html: {}, wml: {} }, [wml_runtime_1.node('input', { html: { 'type': "checkbox", 'onclick': function function_literal_1() { return this.model.allRowsSelected(); }.bind(this) }, wml: {} }, [], view)], view); }.bind(this), wml_runtime_1.empty), wml_runtime_1.forE(fields, function for2(field) { return wml_runtime_1.ifE(!field.hidden, function if5() { return wml_runtime_1.ifE(field.sortAs, function if6() { return wml_runtime_1.node('th', { html: { 'class': [this.attributes.read('ww:headingClass'), (this.sortedOn === field.name) ? Styles.ACTIVE : ''].join(' '), 'onclick': function function_literal_2() { return this.model.headingClicked(new Table_1.HeadingClickedEvent(field.name, field, this)); }.bind(this) }, wml: {} }, [wml_runtime_1.domify(field.heading), wml_runtime_1.ifE(this.sortedOn === field.name, function if7() { return wml_runtime_1.domify(this.arrow); }.bind(this), wml_runtime_1.empty)], view); }.bind(this), function else_clause3() { return wml_runtime_1.node('th', { html: { 'class': [this.attributes.read('ww:headingClass'), (this.sortedOn === field.name) ? Styles.ACTIVE : ''].join(' '), 'onclick': function function_literal_3() { return this.model.headingClicked(new Table_1.HeadingClickedEvent(field.name, field, this)); }.bind(this) }, wml: {} }, [wml_runtime_1.domify(field.heading), wml_runtime_1.ifE(this.sortedOn === field.name, function if8() { return wml_runtime_1.domify(this.arrow); }.bind(this), wml_runtime_1.empty)], view); }.bind(this)); }.bind(this), wml_runtime_1.empty); }.bind(this), function for_otherwise2() { return wml_runtime_1.empty(); }.bind(this))], view); }
exports.thead = thead;
function tbody(view, data, fields) { return wml_runtime_1.widget(_1.Fragment, { html: {}, wml: {} }, [wml_runtime_1.forE(data, function for3(row, index) { return wml_runtime_1.node('tr', { html: { 'class': this.attributes.read('ww:rowClass'), 'onclick': function function_literal_4() { return this.model.rowClicked(new Table_1.RowClickedEvent(row, index, data, this)); }.bind(this) }, wml: {} }, [wml_runtime_1.ifE(this.attributes.read('ww:selectable'), function if9() { return wml_runtime_1.node('td', { html: {}, wml: {} }, [wml_runtime_1.node('input', { html: { 'type': "checkbox", 'onclick': function function_literal_5() { return this.model.rowSelected(new Table_1.RowSelectedEvent(row, index, data, this)); }.bind(this) }, wml: {} }, [], view)], view); }.bind(this), wml_runtime_1.empty), wml_runtime_1.forE(fields, function for4(field) { return wml_runtime_1.ifE(!field.hidden, function if10() { return wml_runtime_1.node('td', { html: { 'class': this.attributes.read('ww:cellClass'), 'onclick': function function_literal_6() { return this.model.cellClicked(new Table_1.CellClickedEvent(property_seek_1.get(field.name, row), field.name, index, row, this)); }.bind(this) }, wml: {} }, [wml_runtime_1.ifE(field.fragment, function if11() { return field.fragment.call(this, view, property_seek_1.get(field.name, row), field.name, row, field); }.bind(this), function else_clause4() { return wml_runtime_1.domify(property_seek_1.get(field.name, row)); }.bind(this))], view); }.bind(this), wml_runtime_1.empty); }.bind(this), function for_otherwise4() { return wml_runtime_1.empty(); }.bind(this))], view); }.bind(this), function for_otherwise4() { return wml_runtime_1.empty(); }.bind(this))], view); }
exports.tbody = tbody;
var TableView = (function (_super) {
    __extends(TableView, _super);
    function TableView(context) {
        var _this = _super.call(this, context) || this;
        var view = _this;
        _this.template = function () {
            return wml_runtime_1.node('table', { html: { 'class': [Styles.TABLE, this.attributes.read('ww:class', '')].join(' ') }, wml: {} }, [wml_runtime_1.node('thead', { html: {}, wml: { 'id': "head" } }, [thead.call(this, view, this.attributes.read('ww:fields'))], view), wml_runtime_1.node('tbody', { html: {}, wml: { 'id': "body" } }, [tbody.call(this, view, this.data, this.attributes.read('ww:fields'))], view)], view);
        };
        return _this;
    }
    return TableView;
}(wml_runtime_1.AppView));
exports.TableView = TableView;

},{"../../":16,"../Table":29,"@quenk/wml-runtime":2,"property-seek":35,"wml-widgets-common/Styles":3}],31:[function(require,module,exports){
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

},{"./wml/tabs":32,"@quenk/wml-runtime":2,"wml-widgets-common/Styles":3,"wml-widgets-common/util":4}],32:[function(require,module,exports){
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
            return wml_runtime_1.node('li', { html: { 'role': "presentation", 'class': (this.attributes.read('ww:active')) ? Styles.ACTIVE : null }, wml: { 'id': "root" } }, [wml_runtime_1.node('a', { html: { 'href': "#", 'onclick': this.clicked.bind(this) }, wml: { 'id': "link" } }, [wml_runtime_1.ifE(this.attributes.read('ww:text'), function if12() { return wml_runtime_1.domify(this.attributes.read('ww:text')); }.bind(this), function else_clause5() { return wml_runtime_1.domify(this.children); }.bind(this))], view)], view);
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

},{"@quenk/wml-runtime":2,"wml-widgets-common/Styles":3}],33:[function(require,module,exports){
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

},{"./wml/tree-nav":34,"@quenk/wml-runtime":2,"wml-widgets-common/Styles":3}],34:[function(require,module,exports){
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

},{"@quenk/wml-runtime":2,"wml-widgets-common/Styles":3,"wml-widgets-common/util":4}],35:[function(require,module,exports){
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

},{}],36:[function(require,module,exports){
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

},{"./view":37,"@quenk/wml-widgets/lib/components/table/Table":29,"wml-widgets-common/Styles":3}],37:[function(require,module,exports){
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
        }, [], view), wml_runtime_1.widget(components_1.Button, {
            html: {},
            wml: {
                'id': "createButton"
            },
            ww: {
                'style': "-danger",
                'text': "Create",
                'class': "-right",
                'onClick': this.create.bind(this)
            }
        }, [], view)], view), wml_runtime_1.widget(components_1.MainView, {
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
                    'navigation': navigation,
                    'content': content.bind(this)
                }
            }, [], view);
        };
        return _this;
    }
    return Main;
}(wml_runtime_1.AppView));
exports.Main = Main;

},{"@quenk/wml-runtime":2,"@quenk/wml-widgets/lib/components":16}]},{},[36])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi93bWwtcnVudGltZS9ub2RlX21vZHVsZXMvcHJvcGVydHktc2Vlay9pbmRleC5qcyIsIi4uL3dtbC1ydW50aW1lL3NyYy9pbmRleC5qcyIsImxpYi9jb21wb25lbnRzL3dtbC13aWRnZXRzLWNvbW1vbi9TdHlsZXMuanMiLCJsaWIvY29tcG9uZW50cy93bWwtd2lkZ2V0cy1jb21tb24vdXRpbC5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvYWN0aW9uLWFyZWEvQWN0aW9uQXJlYS5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvYWN0aW9uLWFyZWEvd21sL2FjdGlvbl9hcmVhLmpzIiwibm9kZV9tb2R1bGVzL0BxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50cy9idXN5LWluZGljYXRvci9CdXN5SW5kaWNhdG9yLmpzIiwibm9kZV9tb2R1bGVzL0BxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50cy9idXN5LWluZGljYXRvci93bWwvYnVzeV9pbmRpY2F0b3IuanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL2J1dHRvbi9CdXR0b24uanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL2J1dHRvbi93bWwvYnV0dG9uLmpzIiwibm9kZV9tb2R1bGVzL0BxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50cy9kcmF3ZXItbGF5b3V0L0RyYXdlckxheW91dC5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvZHJhd2VyLWxheW91dC93bWwvZHJhd2VyLWxheW91dC5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvZnJhZ21lbnQvRnJhZ21lbnQuanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL2dyaWQvR3JpZC5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvZ3JpZC93bWwvZ3JpZC5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL2lucHV0L0lucHV0LmpzIiwibm9kZV9tb2R1bGVzL0BxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50cy9pbnB1dC93bWwvaW5wdXQuanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL21haW4tdmlldy9NYWluVmlldy5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvbWFpbi12aWV3L3dtbC9tYWluLXZpZXcuanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL21lbnUtYnV0dG9uL01lbnVCdXR0b24uanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL21lbnUtYnV0dG9uL3dtbC9tZW51X2J1dHRvbi5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvbW9kYWwvTW9kYWwuanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL21vZGFsL3dtbC9tb2RhbC5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvcGFuZWwvUGFuZWwuanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL3BhbmVsL3dtbC9wYW5lbC5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvc3dpdGNoL1N3aXRjaC5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvc3dpdGNoL3dtbC9zd2l0Y2guanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL3RhYmxlL1RhYmxlLmpzIiwibm9kZV9tb2R1bGVzL0BxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50cy90YWJsZS93bWwvdGFibGUuanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL3RhYnMvVGFicy5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvdGFicy93bWwvdGFicy5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvdHJlZS1uYXYvVHJlZU5hdi5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvdHJlZS1uYXYvd21sL3RyZWUtbmF2LmpzIiwibm9kZV9tb2R1bGVzL3Byb3BlcnR5LXNlZWsvaW5kZXguanMiLCJ0ZXN0L2FwcC9hcHAuanMiLCJ0ZXN0L2FwcC92aWV3LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdktBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmZ1bmN0aW9uIGJvdW5kYXJ5X3RvX2RvdCh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZS5zcGxpdCgnXVsnKS5qb2luKCcuJykuc3BsaXQoJ1snKS5qb2luKCcuJyk7XG59XG5mdW5jdGlvbiBzdHJpcF9icmFjZXModmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUuc3BsaXQoJ1snKS5qb2luKCcuJykuc3BsaXQoJ10nKS5qb2luKCcnKTtcbn1cbmZ1bmN0aW9uIGVzY2FwZV9kb3RzKHZhbHVlKSB7XG4gICAgdmFsdWUgPSB2YWx1ZS5zcGxpdCgnXFwnJyk7XG4gICAgcmV0dXJuICh2YWx1ZS5sZW5ndGggPCAzKSA/IHZhbHVlLmpvaW4oJ1xcJycpIDogdmFsdWUubWFwKGZ1bmN0aW9uIChzZWcpIHtcbiAgICAgICAgaWYgKHNlZy5sZW5ndGggPCAzKVxuICAgICAgICAgICAgcmV0dXJuIHNlZztcbiAgICAgICAgaWYgKChzZWdbMF0gPT09ICcuJykgfHwgKHNlZ1tzZWcubGVuZ3RoIC0gMV0gPT09ICcuJykpXG4gICAgICAgICAgICByZXR1cm4gc2VnO1xuICAgICAgICByZXR1cm4gc2VnLnNwbGl0KCcuJykuam9pbignJiYnKTtcbiAgICB9KS5qb2luKCcnKTtcbn1cbmZ1bmN0aW9uIHVuZXNjYXBlX2RvdHModmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUuc3BsaXQoJyYmJykuam9pbignLicpO1xufVxuZnVuY3Rpb24gcGFydGlmeSh2YWx1ZSkge1xuICAgIGlmICghdmFsdWUpXG4gICAgICAgIHJldHVybjtcbiAgICByZXR1cm4gZXNjYXBlX2RvdHMoc3RyaXBfYnJhY2VzKGJvdW5kYXJ5X3RvX2RvdCgnJyArIHZhbHVlKSkpLnNwbGl0KCcuJyk7XG59XG5mdW5jdGlvbiBjbG9uZShvKSB7XG4gICAgaWYgKCh0eXBlb2YgbyAhPT0gJ29iamVjdCcpIHx8IChvID09PSBudWxsKSlcbiAgICAgICAgcmV0dXJuIG87XG4gICAgaWYgKEFycmF5LmlzQXJyYXkobykpXG4gICAgICAgIHJldHVybiBvLm1hcChjbG9uZSk7XG4gICAgcmV0dXJuICh0eXBlb2Ygby5fX0NMT05FX18gPT09ICdmdW5jdGlvbicpID9cbiAgICAgICAgby5fX0NMT05FX18oY2xvbmUpIDogKG8uY29uc3RydWN0b3IgIT09IE9iamVjdCkgPyBvIDpcbiAgICAgICAgT2JqZWN0LmtleXMobykucmVkdWNlKGZ1bmN0aW9uIChwcmUsIGspIHtcbiAgICAgICAgICAgIHByZVtrXSA9ICh0eXBlb2Ygb1trXSA9PT0gJ29iamVjdCcpID8gY2xvbmUob1trXSkgOiBvW2tdO1xuICAgICAgICAgICAgcmV0dXJuIHByZTtcbiAgICAgICAgfSwge30pO1xufVxuO1xuZnVuY3Rpb24gZ2V0KHBhdGgsIG8pIHtcbiAgICB2YXIgcGFydHMgPSBwYXJ0aWZ5KHBhdGgpO1xuICAgIHZhciBmaXJzdDtcbiAgICBpZiAodHlwZW9mIG8gIT09ICdvYmplY3QnKVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdnZXQoKTogZXhwZWN0cyBhbiBvYmplY3QgZ290ICcgKyB0eXBlb2Ygbyk7XG4gICAgaWYgKHBhcnRzLmxlbmd0aCA9PT0gMSlcbiAgICAgICAgcmV0dXJuIG9bdW5lc2NhcGVfZG90cyhwYXJ0c1swXSldO1xuICAgIGlmIChwYXJ0cy5sZW5ndGggPT09IDApXG4gICAgICAgIHJldHVybjtcbiAgICBmaXJzdCA9IG9bcGFydHMuc2hpZnQoKV07XG4gICAgcmV0dXJuICgodHlwZW9mIG8gPT09ICdvYmplY3QnKSAmJiAobyAhPT0gbnVsbCkpID9cbiAgICAgICAgcGFydHMucmVkdWNlKGZ1bmN0aW9uICh0YXJnZXQsIHByb3ApIHtcbiAgICAgICAgICAgIGlmICh0YXJnZXQgPT0gbnVsbClcbiAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgICAgICAgICAgcmV0dXJuIHRhcmdldFt1bmVzY2FwZV9kb3RzKHByb3ApXTtcbiAgICAgICAgfSwgZmlyc3QpIDogbnVsbDtcbn1cbmV4cG9ydHMuZ2V0ID0gZ2V0O1xuO1xuZnVuY3Rpb24gc2V0KHBhdGgsIHZhbHVlLCBvYmopIHtcbiAgICB2YXIgcGFydHMgPSBwYXJ0aWZ5KHBhdGgpO1xuICAgIGlmICgodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHx8IChvYmogPT0gbnVsbCkpIHtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBfc2V0KG9iaiwgdmFsdWUsIHBhcnRzKTtcbiAgICB9XG59XG5leHBvcnRzLnNldCA9IHNldDtcbjtcbmZ1bmN0aW9uIF9zZXQob2JqLCB2YWx1ZSwgcGFydHMpIHtcbiAgICB2YXIgbztcbiAgICB2YXIgaztcbiAgICBpZiAocGFydHMubGVuZ3RoID09PSAwKVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgbyA9ICgodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHx8IChvYmogPT09IG51bGwpKSA/IHt9IDogY2xvbmUob2JqKTtcbiAgICBrID0gdW5lc2NhcGVfZG90cyhwYXJ0c1swXSk7XG4gICAgb1trXSA9IF9zZXQob1trXSwgdmFsdWUsIHBhcnRzLnNsaWNlKDEpKTtcbiAgICByZXR1cm4gbztcbn1cbmZ1bmN0aW9uIGRlZmF1bHRfMShrLCB2LCBvKSB7XG4gICAgaWYgKG8gPT0gbnVsbClcbiAgICAgICAgcmV0dXJuIGdldChrLCB2KTtcbiAgICBlbHNlXG4gICAgICAgIHJldHVybiBzZXQoaywgdiwgbyk7XG59XG5leHBvcnRzLmRlZmF1bHQgPSBkZWZhdWx0XzE7XG47XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBwcm9wZXJ0eV9zZWVrXzEgPSByZXF1aXJlKFwicHJvcGVydHktc2Vla1wiKTtcbjtcbnZhciBDb21wb25lbnQgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbXBvbmVudChhdHRyaWJ1dGVzLCBjaGlsZHJlbikge1xuICAgICAgICB0aGlzLmF0dHJpYnV0ZXMgPSBhdHRyaWJ1dGVzO1xuICAgICAgICB0aGlzLmNoaWxkcmVuID0gY2hpbGRyZW47XG4gICAgfVxuICAgIENvbXBvbmVudC5wcm90b3R5cGUucmVuZGVyZWQgPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgQ29tcG9uZW50LnByb3RvdHlwZS5yZW1vdmVkID0gZnVuY3Rpb24gKCkgeyB9O1xuICAgIENvbXBvbmVudC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy52aWV3LnJlbmRlcigpOyB9O1xuICAgIHJldHVybiBDb21wb25lbnQ7XG59KCkpO1xuZXhwb3J0cy5Db21wb25lbnQgPSBDb21wb25lbnQ7XG47XG4vKipcbiAqIEF0dHJpYnV0ZXMgcHJvdmlkZXMgYW4gQVBJIGZvciByZWFkaW5nIHRoZVxuICogYXR0cmlidXRlcyBzdXBwbGllZCB0byBhbiBFbGVtZW50LlxuICovXG52YXIgQXR0cmlidXRlcyA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQXR0cmlidXRlcyhhdHRycykge1xuICAgICAgICB0aGlzLmF0dHJzID0gYXR0cnM7XG4gICAgfVxuICAgIEF0dHJpYnV0ZXMucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uIChwYXRoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlYWQocGF0aCwgbnVsbCkgIT0gbnVsbDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIHJlYWQgYSB2YWx1ZSBmb3JtIHRoZSBpbnRlcm5hbCBsaXN0LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoXG4gICAgICogQHBhcmFtIHsqfSBkZWZhdWx0VmFsdWUgLSBUaGlzIHZhbHVlIGlzIHJldHVybmVkIGlmIHRoZSB2YWx1ZSBpcyBub3Qgc2V0LlxuICAgICAqL1xuICAgIEF0dHJpYnV0ZXMucHJvdG90eXBlLnJlYWQgPSBmdW5jdGlvbiAocGF0aCwgZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgIHZhciByZXQgPSBwcm9wZXJ0eV9zZWVrXzEuZGVmYXVsdChwYXRoLnNwbGl0KCc6Jykuam9pbignLicpLCB0aGlzLmF0dHJzKTtcbiAgICAgICAgcmV0dXJuIChyZXQgIT0gbnVsbCkgPyByZXQgOiAoZGVmYXVsdFZhbHVlICE9IG51bGwpID8gZGVmYXVsdFZhbHVlIDogJyc7XG4gICAgfTtcbiAgICByZXR1cm4gQXR0cmlidXRlcztcbn0oKSk7XG5leHBvcnRzLkF0dHJpYnV0ZXMgPSBBdHRyaWJ1dGVzO1xudmFyIGFkb3B0ID0gZnVuY3Rpb24gKGNoaWxkLCBlKSB7XG4gICAgLy8gaWYgKGNoaWxkIGluc3RhbmNlb2YgQXJyYXkpXG4gICAgLy8gcmV0dXJuIGNoaWxkLmZvckVhY2goaW5uZXJDaGlsZCA9PiBhZG9wdChpbm5lckNoaWxkLCBlKSk7XG4gICAgc3dpdGNoICh0eXBlb2YgY2hpbGQpIHtcbiAgICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgICAgICBlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnICsgY2hpbGQpKTtcbiAgICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgICAgIGUuYXBwZW5kQ2hpbGQoY2hpbGQpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2FuIG5vdCBhZG9wdCBjaGlsZCBcIiArIGNoaWxkICsgXCIgb2YgdHlwZSBcIiArIHR5cGVvZiBjaGlsZCk7XG4gICAgfVxufTtcbmV4cG9ydHMuYm94ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBjb250ZW50ID0gW107XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgY29udGVudFtfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgIH1cbiAgICB2YXIgZnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICBjb250ZW50LmZvckVhY2goZnVuY3Rpb24gKGMpIHsgcmV0dXJuIGZyYWcuYXBwZW5kQ2hpbGQoYyk7IH0pO1xuICAgIHJldHVybiBmcmFnO1xufTtcbmV4cG9ydHMuZG9taWZ5ID0gZnVuY3Rpb24gKGEpIHtcbiAgICBpZiAoYSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIHJldHVybiBleHBvcnRzLmJveC5hcHBseShudWxsLCBhLm1hcChleHBvcnRzLmRvbWlmeSkpO1xuICAgIH1cbiAgICBlbHNlIGlmICgodHlwZW9mIGEgPT09ICdzdHJpbmcnKSB8fFxuICAgICAgICAodHlwZW9mIGEgPT09ICdudW1iZXInKSB8fFxuICAgICAgICAodHlwZW9mIGEgPT09ICdib29sZWFuJykpIHtcbiAgICAgICAgcmV0dXJuIGV4cG9ydHMudGV4dChhKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoYSBpbnN0YW5jZW9mIE5vZGUpIHtcbiAgICAgICAgcmV0dXJuIGE7XG4gICAgfVxuICAgIGVsc2UgaWYgKGEgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gX2VtcHR5O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbiBub3QgdXNlICdcIiArIGEgKyBcIicodHlwZW9mIFwiICsgdHlwZW9mIGEgKyBcIikgYXMgQ29udGVudCFcIik7XG4gICAgfVxufTtcbnZhciBfZW1wdHkgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5leHBvcnRzLmVtcHR5ID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gX2VtcHR5OyB9O1xuLyoqXG4gKiB0ZXh0XG4gKi9cbmV4cG9ydHMudGV4dCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJyArIHZhbHVlKTtcbn07XG4vKipcbiAqIHJlc29sdmUgcHJvcGVydHkgYWNjZXNzIGV4cHJlc3Npb24gdG8gYXZvaWRcbiAqIHRob3dpbmcgZXJyb3JzIGlmIGl0IGRvZXMgbm90IGV4aXN0LlxuICovXG5leHBvcnRzLnJlc29sdmUgPSBmdW5jdGlvbiAoaGVhZCwgcGF0aCkge1xuICAgIGlmICgoaGVhZCA9PSBudWxsKSB8fCBoZWFkID09ICcnKVxuICAgICAgICByZXR1cm4gJyc7XG4gICAgdmFyIHJldCA9IHByb3BlcnR5X3NlZWtfMS5kZWZhdWx0KHBhdGgsIGhlYWQpO1xuICAgIHJldHVybiAocmV0ID09IG51bGwpID8gJycgOiByZXQ7XG59O1xuLyoqXG4gKiBub2RlIGlzIGNhbGxlZCB0byBjcmVhdGUgYSByZWd1bGFyIERPTSBub2RlXG4gKi9cbmV4cG9ydHMubm9kZSA9IGZ1bmN0aW9uICh0YWcsIGF0dHJpYnV0ZXMsIGNoaWxkcmVuLCB2aWV3KSB7XG4gICAgdmFyIGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XG4gICAgaWYgKHR5cGVvZiBhdHRyaWJ1dGVzWydodG1sJ10gPT09ICdvYmplY3QnKVxuICAgICAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzWydodG1sJ10pLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgdmFyIHZhbHVlID0gYXR0cmlidXRlc1snaHRtbCddW2tleV07XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgZVtrZXldID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlICE9PSAnJylcbiAgICAgICAgICAgICAgICAgICAgZS5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIGNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKGMpIHsgcmV0dXJuIGFkb3B0KGMsIGUpOyB9KTtcbiAgICB2YXIgaWQgPSBhdHRyaWJ1dGVzWyd3bWwnXS5pZDtcbiAgICBpZiAoaWQpXG4gICAgICAgIHZpZXcucmVnaXN0ZXIoaWQsIGUpO1xuICAgIHJldHVybiBlO1xufTtcbi8qKlxuICogd2lkZ2V0IGNyZWF0ZXMgYSB3bWwgd2lkZ2V0LlxuICogQHBhcmFtIHtmdW5jdGlvbn0gQ29uc3RydXRvclxuICogQHBhcmFtIHtvYmplY3R9IGF0dHJpYnV0ZXNcbiAqIEBwYXJhbSB7YXJyYXk8c3RyaW5nfG51bWJlcnxXaWRnZXQ+fSBjaGlsZHJlblxuICogQHBhcmFtIHtWaWV3fSB2aWV3XG4gKiBAcmV0dXJuIHtXaWRnZXR9XG4gKi9cbmV4cG9ydHMud2lkZ2V0ID0gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBhdHRyaWJ1dGVzLCBjaGlsZHJlbiwgdmlldykge1xuICAgIHZhciBjaGlsZHMgPSBbXTtcbiAgICB2YXIgdztcbiAgICBjaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChjaGlsZCkgeyByZXR1cm4gKGNoaWxkIGluc3RhbmNlb2YgQXJyYXkpID9cbiAgICAgICAgY2hpbGRzLnB1c2guYXBwbHkoY2hpbGRzLCBjaGlsZCkgOiBjaGlsZHMucHVzaChjaGlsZCk7IH0pO1xuICAgIHcgPSBuZXcgQ29uc3RydWN0b3IobmV3IEF0dHJpYnV0ZXMoYXR0cmlidXRlcyksIGNoaWxkcyk7XG4gICAgdmFyIGlkID0gYXR0cmlidXRlcy53bWwuaWQ7XG4gICAgaWYgKGlkKVxuICAgICAgICB2aWV3LnJlZ2lzdGVyKGlkLCB3KTtcbiAgICB2aWV3LndpZGdldHMucHVzaCh3KTtcbiAgICByZXR1cm4gdy5yZW5kZXIoKTtcbn07XG4vKipcbiAqIGlmRSBwcm92aWRlcyBhbiBpZiB0aGVuIGV4cHJlc3Npb25cbiAqL1xuZXhwb3J0cy5pZkUgPSBmdW5jdGlvbiAocHJlZGljYXRlLCBwb3NpdGl2ZSwgbmVnYXRpdmUpIHtcbiAgICByZXR1cm4gKHByZWRpY2F0ZSkgPyBwb3NpdGl2ZSgpIDogbmVnYXRpdmUoKTtcbn07XG4vKipcbiAqIGZvckUgcHJvdmlkZXMgYSBmb3IgZXhwcmVzc2lvblxuICovXG5leHBvcnRzLmZvckUgPSBmdW5jdGlvbiAoY29sbGVjdGlvbiwgY2IsIGNiMikge1xuICAgIHZhciBmcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgIGlmIChjb2xsZWN0aW9uIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgaWYgKGNvbGxlY3Rpb24ubGVuZ3RoID4gMClcbiAgICAgICAgICAgIGNvbGxlY3Rpb24uZm9yRWFjaChmdW5jdGlvbiAodiwgaywgYSkgeyByZXR1cm4gZnJhZy5hcHBlbmRDaGlsZChjYih2LCBrLCBhKSk7IH0pO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBmcmFnLmFwcGVuZENoaWxkKGNiMigpKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGNvbGxlY3Rpb24gPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHZhciBsID0gT2JqZWN0LmtleXMoY29sbGVjdGlvbik7XG4gICAgICAgIGlmIChsLmxlbmd0aCA+IDApXG4gICAgICAgICAgICBsLmZvckVhY2goZnVuY3Rpb24gKGspIHsgcmV0dXJuIGZyYWcuYXBwZW5kQ2hpbGQoY2IoY29sbGVjdGlvbltrXSwgaywgY29sbGVjdGlvbikpOyB9KTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgZnJhZy5hcHBlbmRDaGlsZChjYjIoKSk7XG4gICAgfVxuICAgIHJldHVybiBmcmFnO1xufTtcbi8qKlxuICogc3dpdGNoRSBzaW11bGF0ZXMgYSBzd2l0Y2ggc3RhdGVtZW50XG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ8Ym9vbGVhbn0gdmFsdWVcbiAqIEBwYXJhbSB7b2JqZWN0fSBjYXNlc1xuICovXG5leHBvcnRzLnN3aXRjaEUgPSBmdW5jdGlvbiAodmFsdWUsIGNhc2VzKSB7XG4gICAgdmFyIHJlc3VsdCA9IGNhc2VzW3ZhbHVlXTtcbiAgICB2YXIgZGVmYXVsID0gY2FzZXNbJ2RlZmF1bHQnXTtcbiAgICBpZiAocmVzdWx0KVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIGlmIChkZWZhdWwpXG4gICAgICAgIHJldHVybiBkZWZhdWw7XG59O1xudmFyIEFwcFZpZXcgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEFwcFZpZXcoY29udGV4dCkge1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgICAgICB0aGlzLmlkcyA9IHt9O1xuICAgICAgICB0aGlzLndpZGdldHMgPSBbXTtcbiAgICB9XG4gICAgQXBwVmlldy5wcm90b3R5cGUucmVnaXN0ZXIgPSBmdW5jdGlvbiAoaWQsIHcpIHtcbiAgICAgICAgaWYgKHRoaXMuaWRzLmhhc093blByb3BlcnR5KGlkKSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkR1cGxpY2F0ZSBpZCAnXCIgKyBpZCArIFwiJyBkZXRlY3RlZCFcIik7XG4gICAgICAgIHRoaXMuaWRzW2lkXSA9IHc7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgQXBwVmlldy5wcm90b3R5cGUuZmluZEJ5SWQgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmlkc1tpZF0pID8gdGhpcy5pZHNbaWRdIDogbnVsbDtcbiAgICB9O1xuICAgIEFwcFZpZXcucHJvdG90eXBlLmludmFsaWRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjaGlsZHM7XG4gICAgICAgIHZhciBwYXJlbnQgPSB0aGlzLnRyZWUucGFyZW50Tm9kZTtcbiAgICAgICAgdmFyIHJlYWxGaXJzdENoaWxkO1xuICAgICAgICB2YXIgcmVhbEZpcnN0Q2hpbGRJbmRleDtcbiAgICAgICAgaWYgKHRoaXMudHJlZSA9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKCdDYW5ub3QgaW52YWxpZGF0ZSBhIHZpZXcgdGhhdCBoYXMgbm90IGJlZW4gcmVuZGVyZWQhJyk7XG4gICAgICAgIGlmICh0aGlzLnRyZWUucGFyZW50Tm9kZSA9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKCdBdHRlbXB0IHRvIGludmFsaWRhdGUgYSB2aWV3IHRoYXQgaGFzIG5vdCBiZWVuIGluc2VydGVkIHRvIERPTSEnKTtcbiAgICAgICAgY2hpbGRzID0gdGhpcy50cmVlLnBhcmVudE5vZGUuY2hpbGRyZW47XG4gICAgICAgIC8vZm9yIHNvbWUgcmVhc29uIHRoZSByZWZlcmVuY2Ugc3RvcmVkIGRvZXMgbm90IGhhdmUgdGhlIGNvcnJlY3QgcGFyZW50IG5vZGUuXG4gICAgICAgIC8vd2UgZG8gdGhpcyB0byBnZXQgYSAnbGl2ZScgdmVyc2lvbiBvZiB0aGUgbm9kZS5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHMubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICBpZiAoY2hpbGRzW2ldID09PSB0aGlzLnRyZWUpIHtcbiAgICAgICAgICAgICAgICByZWFsRmlyc3RDaGlsZCA9IGNoaWxkc1tpXTtcbiAgICAgICAgICAgICAgICByZWFsRmlyc3RDaGlsZEluZGV4ID0gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgcGFyZW50LnJlcGxhY2VDaGlsZCh0aGlzLnJlbmRlcigpLCByZWFsRmlyc3RDaGlsZCk7XG4gICAgfTtcbiAgICBBcHBWaWV3LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuaWRzID0ge307XG4gICAgICAgIHRoaXMud2lkZ2V0cy5mb3JFYWNoKGZ1bmN0aW9uICh3KSB7IHJldHVybiB3LnJlbW92ZWQoKTsgfSk7XG4gICAgICAgIHRoaXMud2lkZ2V0cyA9IFtdO1xuICAgICAgICB0aGlzLnRyZWUgPSB0aGlzLnRlbXBsYXRlLmNhbGwodGhpcy5jb250ZXh0KTtcbiAgICAgICAgdGhpcy5pZHNbJ3Jvb3QnXSA9ICh0aGlzLmlkc1sncm9vdCddKSA/IHRoaXMuaWRzWydyb290J10gOiB0aGlzLnRyZWU7XG4gICAgICAgIHRoaXMud2lkZ2V0cy5mb3JFYWNoKGZ1bmN0aW9uICh3KSB7IHJldHVybiB3LnJlbmRlcmVkKCk7IH0pO1xuICAgICAgICByZXR1cm4gdGhpcy50cmVlO1xuICAgIH07XG4gICAgcmV0dXJuIEFwcFZpZXc7XG59KCkpO1xuZXhwb3J0cy5BcHBWaWV3ID0gQXBwVmlldztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5ISURERU4gPSAnLWhpZGRlbic7XG5leHBvcnRzLkRJU0FCTEVEID0gJy1kaXNhYmxlZCc7XG5leHBvcnRzLk9OID0gJy1vbic7XG5leHBvcnRzLk9GRiA9ICctb2ZmJztcbmV4cG9ydHMuREVGQVVMVCA9ICctZGVmYXVsdCc7XG5leHBvcnRzLlBSSU1BUlkgPSAnLXByaW1hcnknO1xuZXhwb3J0cy5TVUNDRVNTID0gJy1zdWNjZXNzJztcbmV4cG9ydHMuSU5GTyA9ICctaW5mbyc7XG5leHBvcnRzLldBUk5JTkcgPSAnLXdhcm5pbmcnO1xuZXhwb3J0cy5EQU5HRVIgPSAnLWRhbmdlcic7XG5leHBvcnRzLkxBUkdFID0gJy1sYXJnZSc7XG5leHBvcnRzLlNNQUxMID0gJy1zbWFsbCc7XG5leHBvcnRzLkVYVFJBX1NNQUxMID0gJy1leHRyYS1zbWFsbCc7XG5leHBvcnRzLkFDVElWRSA9ICdhY3RpdmUnOyAvL0B0b2RvOiByZWZhY3RvciB0byBmbGFnIHN5bnRheFxuZXhwb3J0cy5EUkFXRVJfTEFZT1VUID0gJ3d3LWRyYXdlci1sYXlvdXQnO1xuZXhwb3J0cy5EUkFXRVIgPSAnd3ctZHJhd2VyJztcbmV4cG9ydHMuRFJBV0VSX0NPTlRFTlQgPSAnd3ctZHJhd2VyX19jb250ZW50JztcbmV4cG9ydHMuRFJBV0VSX1BVU0hBQkxFID0gJy1kcmF3ZXItcHVzaGFibGUnO1xuZXhwb3J0cy5EUkFXRVJfUFVTSEFCTEVfRklYRUQgPSAnLWRyYXdlci1wdXNoYWJsZS1maXhlZCc7XG5leHBvcnRzLkFDVElPTl9BUkVBID0gJ3d3LWFjdGlvbi1hcmVhJztcbmV4cG9ydHMuQUNUSU9OX0FSRUFfQ09OVEVOVCA9ICd3dy1hY3Rpb24tYXJlYV9fY29udGVudCc7XG5leHBvcnRzLk1BSU5fVklFVyA9ICd3dy1tYWluLXZpZXcnO1xuZXhwb3J0cy5NRU5VX0JVVFRPTiA9ICd3dy1tZW51LWJ1dHRvbic7XG5leHBvcnRzLkJVVFRPTiA9ICd3dy1idXR0b24nO1xuLy9AdG9kbzogcmVmYWN0b3IgdGhpcyB0byBiZSBpbmxpbmUgd2l0aCBvdGhlciBjbGFzcyBuYW1lc1xuZXhwb3J0cy5HUklEX0NPTlRBSU5FUiA9ICdjb250YWluZXItZmx1aWQnO1xuZXhwb3J0cy5HUklEX0NPTFVNTiA9ICcnO1xuZXhwb3J0cy5HUklEX1JPVyA9ICdyb3cnO1xuZXhwb3J0cy5QQU5FTCA9ICd3dy1wYW5lbCc7XG5leHBvcnRzLlBBTkVMX0hFQURFUiA9ICd3dy1wYW5lbF9faGVhZGVyJztcbmV4cG9ydHMuUEFORUxfQk9EWSA9ICd3dy1wYW5lbF9fYm9keSc7XG5leHBvcnRzLlBBTkVMX0ZPT1RFUiA9ICd3dy1wYW5lbF9fZm9vdGVyJztcbmV4cG9ydHMuTU9EQUwgPSAnd3ctbW9kYWwnO1xuZXhwb3J0cy5NT0RBTF9ESUFMT0cgPSAnd3ctbW9kYWxfX2RpYWxvZyc7XG5leHBvcnRzLk1PREFMX0NPTlRFTlQgPSAnd3ctbW9kYWxfX2NvbnRlbnQnO1xuZXhwb3J0cy5NT0RBTF9IRUFERVIgPSAnd3ctbW9kYWxfX2hlYWRlcic7XG5leHBvcnRzLk1PREFMX0JPRFkgPSAnd3ctbW9kYWxfX2JvZHknO1xuZXhwb3J0cy5NT0RBTF9GT09URVIgPSAnd3ctbW9hZGxfX2Zvb3Rlcic7XG5leHBvcnRzLkZPUk1fR1JPVVAgPSAnZm9ybS1ncm91cCc7XG5leHBvcnRzLkNPTlRST0xfTEFCRUwgPSAnY29udHJvbC1sYWJlbCc7XG5leHBvcnRzLklOUFVUID0gJ2Zvcm0tY29udHJvbCc7XG5leHBvcnRzLlRFWFRBUkVBID0gJ2Zvcm0tY29udHJvbCc7XG5leHBvcnRzLlNFTEVDVCA9ICdmb3JtLWNvbnRyb2wnO1xuZXhwb3J0cy5UQUJTID0gJ25hdiBuYXYtdGFicyc7IC8vQHRvZG8gdW4tYm9vdHN0cmFwXG5leHBvcnRzLlNXSVRDSCA9ICd3dy1zd2l0Y2gnO1xuZXhwb3J0cy5TV0lUQ0hfU0xJREVSID0gJ3d3LXN3aXRjaF9fc2xpZGVyJztcbmV4cG9ydHMuVEFCTEUgPSAndGFibGUnOyAvL0B0b2RvIHVuLWJvb3RzdHJhcFxuZXhwb3J0cy5UUkVFX05BViA9ICd0cmVlLW5hdic7XG5leHBvcnRzLlRSRUVfTkFWX0xJU1QgPSAndHJlZS1uYXZfX2xpc3RfX2l0ZW0nO1xuZXhwb3J0cy5UUkVFX05BVl9MSVNUX0lURU0gPSAndHJlZS1uYXZfX2l0ZW0nO1xuZXhwb3J0cy5BVVRPQ09NUExFVEUgPSAnd2F0LWtpdC1hdXRvY29tcGxldGUnO1xuZXhwb3J0cy5BVVRPQ09NUExFVEVfQ09OVEFJTkVSID0gJ3dhdC1raXQtYXV0b2NvbXBsZXRlLWNvbnRhaW5lcic7XG5leHBvcnRzLkFVVE9DT01QTEVURV9JTlBVVF9BUkVBID0gJ3dhdC1raXQtYXV0b2NvbXBsZXRlLWlucHV0LWFyZWEnO1xuZXhwb3J0cy5BVVRPQ09NUExFVEVfSU5QVVQgPSAnd2F0LWtpdC1hdXRvY29tcGxldGUtaW5wdXQnO1xuZXhwb3J0cy5BVVRPQ09NUExFVEVfT1BUSU9OUyA9ICd3YXQta2l0LWF1dG9jb21wbGV0ZS1vcHRpb25zJztcbmV4cG9ydHMuQVVUT0NPTVBMRVRFX0lURU1fV1JBUFBFUiA9ICd3YXQta2l0LWF1dG8tY29tcGxldGUtaXRlbS13cmFwcGVyJztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVN0eWxlcy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogY29tYmluZSB0aGUgbWVtYmVycyBvZiBhbiBhcnJheSBpbnRvIG9uZSBzdHJpbmcuXG4gKi9cbmV4cG9ydHMuY29tYmluZSA9IGZ1bmN0aW9uIChzdHIsIGpvaW5lcikge1xuICAgIGlmIChqb2luZXIgPT09IHZvaWQgMCkgeyBqb2luZXIgPSAnICc7IH1cbiAgICByZXR1cm4gc3RyLmZpbHRlcihmdW5jdGlvbiAocykgeyByZXR1cm4gKChzICE9IG51bGwpIHx8IHMgIT0gJycpOyB9KS5qb2luKGpvaW5lcik7XG59O1xuLyoqXG4gKiBub29wXG4gKi9cbmV4cG9ydHMubm9vcCA9IGZ1bmN0aW9uICgpIHsgfTtcbi8qKlxuICogcmVhZCBhIHZhbHVlIGZyb20gdGhlIGNvbnRleHQgYXR0cmlidXRlc1xuICovXG5leHBvcnRzLnJlYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIF8gPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICBfW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmF0dHJpYnV0ZXMucmVhZC5hcHBseSh0aGlzLmF0dHJpYnV0ZXMsIGFyZ3VtZW50cyk7XG59O1xuLyoqXG4gKiByZXBsYWNlQ29udGVudFxuICovXG5leHBvcnRzLnJlcGxhY2VDb250ZW50ID0gZnVuY3Rpb24gKHIsIG5vZGUpIHtcbiAgICB3aGlsZSAobm9kZS5sYXN0Q2hpbGQpXG4gICAgICAgIG5vZGUucmVtb3ZlQ2hpbGQobm9kZS5sYXN0Q2hpbGQpO1xuICAgIG5vZGUuYXBwZW5kQ2hpbGQoci5yZW5kZXIoKSk7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dXRpbC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHV0aWxfMSA9IHJlcXVpcmUoXCJ3bWwtd2lkZ2V0cy1jb21tb24vdXRpbFwiKTtcbnZhciB3bWxfcnVudGltZV8xID0gcmVxdWlyZShcIkBxdWVuay93bWwtcnVudGltZVwiKTtcbnZhciBhY3Rpb25fYXJlYV8xID0gcmVxdWlyZShcIi4vd21sL2FjdGlvbl9hcmVhXCIpO1xuLyoqXG4gKiBBY3Rpb25BcmVhXG4gKi9cbnZhciBBY3Rpb25BcmVhID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQWN0aW9uQXJlYSwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBBY3Rpb25BcmVhKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMudmlldyA9IG5ldyBhY3Rpb25fYXJlYV8xLk1haW4oX3RoaXMpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIHNldENvbnRlbnQgcmVwbGFjZXMgdGhlIGNvbnRlbnQgb2YgdGhpcyB2aWV3LlxuICAgICAqL1xuICAgIEFjdGlvbkFyZWEucHJvdG90eXBlLnNldENvbnRlbnQgPSBmdW5jdGlvbiAocikge1xuICAgICAgICB1dGlsXzEucmVwbGFjZUNvbnRlbnQociwgdGhpcy52aWV3LmZpbmRCeUlkKCdjb250ZW50JykpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIHJldHVybiBBY3Rpb25BcmVhO1xufSh3bWxfcnVudGltZV8xLkNvbXBvbmVudCkpO1xuZXhwb3J0cy5BY3Rpb25BcmVhID0gQWN0aW9uQXJlYTtcbmV4cG9ydHMuZGVmYXVsdCA9IEFjdGlvbkFyZWE7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1BY3Rpb25BcmVhLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgd21sX3J1bnRpbWVfMSA9IHJlcXVpcmUoXCJAcXVlbmsvd21sLXJ1bnRpbWVcIik7XG52YXIgU3R5bGVzID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi9TdHlsZXNcIik7XG52YXIgdXRpbF8xID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi91dGlsXCIpO1xudmFyIE1haW4gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhNYWluLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIE1haW4oY29udGV4dCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBjb250ZXh0KSB8fCB0aGlzO1xuICAgICAgICB2YXIgdmlldyA9IF90aGlzO1xuICAgICAgICBfdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB3bWxfcnVudGltZV8xLm5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiB1dGlsXzEuY29tYmluZShbU3R5bGVzLkFDVElPTl9BUkVBLCBTdHlsZXMuRFJBV0VSX1BVU0hBQkxFX0ZJWEVEXSkgfSwgd21sOiB7fSB9LCBbd21sX3J1bnRpbWVfMS5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogU3R5bGVzLkFDVElPTl9BUkVBX0NPTlRFTlQgfSwgd21sOiB7ICdpZCc6IFwiY29udGVudFwiIH0gfSwgW3dtbF9ydW50aW1lXzEuZG9taWZ5KHRoaXMuY2hpbGRyZW4pXSwgdmlldyldLCB2aWV3KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gTWFpbjtcbn0od21sX3J1bnRpbWVfMS5BcHBWaWV3KSk7XG5leHBvcnRzLk1haW4gPSBNYWluO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YWN0aW9uX2FyZWEuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB3bWxfcnVudGltZV8xID0gcmVxdWlyZShcIkBxdWVuay93bWwtcnVudGltZVwiKTtcbnZhciBidXN5X2luZGljYXRvcl8xID0gcmVxdWlyZShcIi4vd21sL2J1c3lfaW5kaWNhdG9yXCIpO1xuLyoqXG4gKiBCdXN5SW5kaWNhdG9yIHByb3ZpZGVzIGEgJ2hhbWJ1cmdlcicgbWVudSBidXR0b24uXG4gKi9cbnZhciBCdXN5SW5kaWNhdG9yID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQnVzeUluZGljYXRvciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBCdXN5SW5kaWNhdG9yKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMudmlldyA9IG5ldyBidXN5X2luZGljYXRvcl8xLk1haW4oX3RoaXMpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBCdXN5SW5kaWNhdG9yO1xufSh3bWxfcnVudGltZV8xLkNvbXBvbmVudCkpO1xuZXhwb3J0cy5CdXN5SW5kaWNhdG9yID0gQnVzeUluZGljYXRvcjtcbmV4cG9ydHMuZGVmYXVsdCA9IEJ1c3lJbmRpY2F0b3I7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1CdXN5SW5kaWNhdG9yLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgd21sX3J1bnRpbWVfMSA9IHJlcXVpcmUoXCJAcXVlbmsvd21sLXJ1bnRpbWVcIik7XG52YXIgTWFpbiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKE1haW4sIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gTWFpbihjb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbnRleHQpIHx8IHRoaXM7XG4gICAgICAgIHZhciB2aWV3ID0gX3RoaXM7XG4gICAgICAgIF90aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6IFwibG9hZGluZ1wiIH0sIHdtbDoge30gfSwgW10sIHZpZXcpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBNYWluO1xufSh3bWxfcnVudGltZV8xLkFwcFZpZXcpKTtcbmV4cG9ydHMuTWFpbiA9IE1haW47XG4vLyMgc291cmNlTWFwcGluZ1VSTD1idXN5X2luZGljYXRvci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHdtbF9ydW50aW1lXzEgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC1ydW50aW1lXCIpO1xudmFyIGJ1dHRvbl8xID0gcmVxdWlyZShcIi4vd21sL2J1dHRvblwiKTtcbjtcbi8qKlxuICogQnV0dG9uIGlzIGFuIGltcHJvdmVtZW50IG92ZXIgSFRNTEJ1dHRpb25FbGVtZW50XG4gKi9cbnZhciBCdXR0b24gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhCdXR0b24sIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQnV0dG9uKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMudmlldyA9IG5ldyBidXR0b25fMS5NYWluKF90aGlzKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBkaXNhYmxlIHRoaXMgYnV0dG9uLlxuICAgICAqL1xuICAgIEJ1dHRvbi5wcm90b3R5cGUuZGlzYWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy52aWV3LmZpbmRCeUlkKCdidXR0b24nKS5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBlbmFibGUgdGhpcyBidXR0b24uXG4gICAgICovXG4gICAgQnV0dG9uLnByb3RvdHlwZS5lbmFibGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMudmlldy5maW5kQnlJZCgnYnV0dG9uJykucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuICAgIH07XG4gICAgQnV0dG9uLnByb3RvdHlwZS5yZW5kZXJlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3YXQ6ZGlzYWJsZWQnKSlcbiAgICAgICAgICAgIHRoaXMudmlldy5maW5kQnlJZCgnYnV0dG9uJykuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAgIH07XG4gICAgcmV0dXJuIEJ1dHRvbjtcbn0od21sX3J1bnRpbWVfMS5Db21wb25lbnQpKTtcbmV4cG9ydHMuQnV0dG9uID0gQnV0dG9uO1xuZXhwb3J0cy5kZWZhdWx0ID0gQnV0dG9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QnV0dG9uLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgd21sX3J1bnRpbWVfMSA9IHJlcXVpcmUoXCJAcXVlbmsvd21sLXJ1bnRpbWVcIik7XG52YXIgU3R5bGVzID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi9TdHlsZXNcIik7XG52YXIgdXRpbF8xID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi91dGlsXCIpO1xudmFyIF8xID0gcmVxdWlyZShcIi4uLy4uL1wiKTtcbnZhciBNYWluID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoTWFpbiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBNYWluKGNvbnRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29udGV4dCkgfHwgdGhpcztcbiAgICAgICAgdmFyIHZpZXcgPSBfdGhpcztcbiAgICAgICAgX3RoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gd21sX3J1bnRpbWVfMS53aWRnZXQoXzEuRnJhZ21lbnQsIHsgaHRtbDoge30sIHdtbDoge30gfSwgW3dtbF9ydW50aW1lXzEuaWZFKHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpocmVmJyksIGZ1bmN0aW9uIGlmMCgpIHsgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgnYScsIHsgaHRtbDogeyAnaHJlZic6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpocmVmJyksICdjbGFzcyc6IHV0aWxfMS5jb21iaW5lKFtTdHlsZXMuQlVUVE9OLCB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6dmFyaWFudCcsICcnKSwgdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OnNpemUnLCAnJyksIHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpzdHlsZScsIFN0eWxlcy5ERUZBVUxUKSwgdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmNsYXNzJyldKSwgJ29uY2xpY2snOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6b25DbGljaycsIHV0aWxfMS5ub29wKSB9LCB3bWw6IHsgJ2lkJzogXCJidXR0b25cIiB9IH0sIFt3bWxfcnVudGltZV8xLmRvbWlmeSh0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6dGV4dCcpKSwgd21sX3J1bnRpbWVfMS5kb21pZnkodGhpcy5jaGlsZHJlbildLCB2aWV3KTsgfS5iaW5kKHRoaXMpLCBmdW5jdGlvbiBlbHNlX2NsYXVzZTAoKSB7IHJldHVybiB3bWxfcnVudGltZV8xLm5vZGUoJ2J1dHRvbicsIHsgaHRtbDogeyAndHlwZSc6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzp0eXBlJywgJ2J1dHRvbicpLCAnbmFtZSc6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpuYW1lJywgJycpLCAnY2xhc3MnOiB1dGlsXzEuY29tYmluZShbU3R5bGVzLkJVVFRPTiwgdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OnZhcmlhbnQnLCAnJyksIHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpzaXplJywgJycpLCB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6c3R5bGUnLCBTdHlsZXMuREVGQVVMVCksIHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpjbGFzcycpXSksICdvbmNsaWNrJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3Om9uQ2xpY2snLCB1dGlsXzEubm9vcCkgfSwgd21sOiB7ICdpZCc6IFwiYnV0dG9uXCIgfSB9LCBbd21sX3J1bnRpbWVfMS5kb21pZnkodGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OnRleHQnKSksIHdtbF9ydW50aW1lXzEuZG9taWZ5KHRoaXMuY2hpbGRyZW4pXSwgdmlldyk7IH0uYmluZCh0aGlzKSldLCB2aWV3KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gTWFpbjtcbn0od21sX3J1bnRpbWVfMS5BcHBWaWV3KSk7XG5leHBvcnRzLk1haW4gPSBNYWluO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YnV0dG9uLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgd21sX3J1bnRpbWVfMSA9IHJlcXVpcmUoXCJAcXVlbmsvd21sLXJ1bnRpbWVcIik7XG52YXIgU3R5bGVzID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi9TdHlsZXNcIik7XG52YXIgZHJhd2VyX2xheW91dF8xID0gcmVxdWlyZShcIi4vd21sL2RyYXdlci1sYXlvdXRcIik7XG52YXIgdXRpbF8xID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi91dGlsXCIpO1xuO1xuLyoqXG4gKiBEcmF3ZXJMYXlvdXQgcHJvdmlkZXMgYSB0b3AgbGV2ZWwgbGF5b3V0IGNvbnNpc3Rpbmcgb2YgYSBkcmF3ZXIgYW5kXG4gKiBhIG1haW4gY29udGVudCB2aWV3LlxuICovXG52YXIgRHJhd2VyTGF5b3V0ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoRHJhd2VyTGF5b3V0LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIERyYXdlckxheW91dCgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnZpZXcgPSBuZXcgZHJhd2VyX2xheW91dF8xLk1haW4oX3RoaXMpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIERyYXdlckxheW91dC5wcm90b3R5cGUuX2dldERyYXdlckRPTSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmlldy5maW5kQnlJZCgnZHJhd2VyJyk7XG4gICAgfTtcbiAgICBEcmF3ZXJMYXlvdXQucHJvdG90eXBlLl9jb21iaW5lID0gZnVuY3Rpb24gKGNsYXNzZXMpIHtcbiAgICAgICAgcmV0dXJuIGNsYXNzZXMuam9pbignICcpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogZHJhd2VyVmlzaWJsZSBxdWVyaWVzIHdoZXRoZXIgdGhlIERyYXdlciBpcyB2aXNpYmxlIG9yIG5vdC5cbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBEcmF3ZXJMYXlvdXQucHJvdG90eXBlLmRyYXdlclZpc2libGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAhdGhpcy5fZ2V0RHJhd2VyRE9NKCkuY2xhc3NMaXN0LmNvbnRhaW5zKFN0eWxlcy5ISURERU4pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogaGlkZURyYXdlciBoaWRlcyB0aGUgZHJhd2VyLlxuICAgICAqL1xuICAgIERyYXdlckxheW91dC5wcm90b3R5cGUuaGlkZURyYXdlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuZHJhd2VyVmlzaWJsZSgpKVxuICAgICAgICAgICAgdGhpcy5fZ2V0RHJhd2VyRE9NKCkuY2xhc3NMaXN0LmFkZChTdHlsZXMuSElEREVOKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIHNob3dEcmF3ZXIgc2hvd3MgdGhlIGRyYXdlclxuICAgICAqL1xuICAgIERyYXdlckxheW91dC5wcm90b3R5cGUuc2hvd0RyYXdlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRyYXdlclZpc2libGUoKSlcbiAgICAgICAgICAgIHRoaXMuX2dldERyYXdlckRPTSgpLmNsYXNzTGlzdC5yZW1vdmUoU3R5bGVzLkhJRERFTik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiB0b2dnbGUgdGhlIHZpc2liaWxpdHkgb2YgdGhpcyBEcmF3ZXJcbiAgICAgKi9cbiAgICBEcmF3ZXJMYXlvdXQucHJvdG90eXBlLnRvZ2dsZURyYXdlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fZ2V0RHJhd2VyRE9NKCkuY2xhc3NMaXN0LnRvZ2dsZShTdHlsZXMuSElEREVOKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIHNldENvbnRlbnQgcmVwbGFjZXMgdGhlIGNvbnRlbnQgb2YgdGhpcyB2aWV3LlxuICAgICAqL1xuICAgIERyYXdlckxheW91dC5wcm90b3R5cGUuc2V0Q29udGVudCA9IGZ1bmN0aW9uIChyKSB7XG4gICAgICAgIHV0aWxfMS5yZXBsYWNlQ29udGVudChyLCB0aGlzLnZpZXcuZmluZEJ5SWQoJ2NvbnRlbnQnKSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgcmV0dXJuIERyYXdlckxheW91dDtcbn0od21sX3J1bnRpbWVfMS5Db21wb25lbnQpKTtcbmV4cG9ydHMuRHJhd2VyTGF5b3V0ID0gRHJhd2VyTGF5b3V0O1xuZXhwb3J0cy5kZWZhdWx0ID0gRHJhd2VyTGF5b3V0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RHJhd2VyTGF5b3V0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgd21sX3J1bnRpbWVfMSA9IHJlcXVpcmUoXCJAcXVlbmsvd21sLXJ1bnRpbWVcIik7XG52YXIgU3R5bGVzID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi9TdHlsZXNcIik7XG52YXIgTWFpbiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKE1haW4sIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gTWFpbihjb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbnRleHQpIHx8IHRoaXM7XG4gICAgICAgIHZhciB2aWV3ID0gX3RoaXM7XG4gICAgICAgIF90aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6IFN0eWxlcy5EUkFXRVJfTEFZT1VUIH0sIHdtbDogeyAnaWQnOiBcImNvbnRlbnRcIiB9IH0sIFt3bWxfcnVudGltZV8xLm5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiBTdHlsZXMuRFJBV0VSIH0sIHdtbDogeyAnaWQnOiBcImRyYXdlclwiIH0gfSwgW3dtbF9ydW50aW1lXzEubm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6IFN0eWxlcy5EUkFXRVJfQ09OVEVOVCB9LCB3bWw6IHt9IH0sIFt3bWxfcnVudGltZV8xLmlmRSh0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6bmF2aWdhdGlvbicpLCBmdW5jdGlvbiBpZjEoKSB7IHJldHVybiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6bmF2aWdhdGlvbicpLmNhbGwodGhpcywgdmlldyk7IH0uYmluZCh0aGlzKSwgd21sX3J1bnRpbWVfMS5lbXB0eSldLCB2aWV3KV0sIHZpZXcpLCB3bWxfcnVudGltZV8xLmlmRSh0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6Y29udGVudCcpLCBmdW5jdGlvbiBpZjIoKSB7IHJldHVybiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3cuY29udGVudCcpLmNhbGwodGhpcywgdmlldyk7IH0uYmluZCh0aGlzKSwgZnVuY3Rpb24gZWxzZV9jbGF1c2UxKCkgeyByZXR1cm4gd21sX3J1bnRpbWVfMS5kb21pZnkodGhpcy5jaGlsZHJlbik7IH0uYmluZCh0aGlzKSldLCB2aWV3KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gTWFpbjtcbn0od21sX3J1bnRpbWVfMS5BcHBWaWV3KSk7XG5leHBvcnRzLk1haW4gPSBNYWluO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZHJhd2VyLWxheW91dC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHdtbF9ydW50aW1lXzEgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC1ydW50aW1lXCIpO1xudmFyIEZyYWdtZW50ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoRnJhZ21lbnQsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gRnJhZ21lbnQoKSB7XG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICB9XG4gICAgRnJhZ21lbnQucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoYykgeyByZXR1cm4gZnJhZy5hcHBlbmRDaGlsZChjKTsgfSk7XG4gICAgICAgIHJldHVybiBmcmFnO1xuICAgIH07XG4gICAgcmV0dXJuIEZyYWdtZW50O1xufSh3bWxfcnVudGltZV8xLkNvbXBvbmVudCkpO1xuZXhwb3J0cy5GcmFnbWVudCA9IEZyYWdtZW50O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RnJhZ21lbnQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB3bWxfcnVudGltZV8xID0gcmVxdWlyZShcIkBxdWVuay93bWwtcnVudGltZVwiKTtcbnZhciBTdHlsZXMgPSByZXF1aXJlKFwid21sLXdpZGdldHMtY29tbW9uL1N0eWxlc1wiKTtcbnZhciB2aWV3cyA9IHJlcXVpcmUoXCIuL3dtbC9ncmlkXCIpO1xuO1xuLyoqXG4gKiBDb250YWluZXJcbiAqL1xudmFyIENvbnRhaW5lciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKENvbnRhaW5lciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBDb250YWluZXIoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IHZpZXdzLkNvbnRhaW5lcihfdGhpcyk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIENvbnRhaW5lcjtcbn0od21sX3J1bnRpbWVfMS5Db21wb25lbnQpKTtcbmV4cG9ydHMuQ29udGFpbmVyID0gQ29udGFpbmVyO1xudmFyIFJvdyA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFJvdywgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBSb3coKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IHZpZXdzLlJvdyhfdGhpcyk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIFJvdztcbn0od21sX3J1bnRpbWVfMS5Db21wb25lbnQpKTtcbmV4cG9ydHMuUm93ID0gUm93O1xudmFyIENvbHVtbiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKENvbHVtbiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBDb2x1bW4oKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IHZpZXdzLkNvbHVtbihfdGhpcyk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgQ29sdW1uLnByb3RvdHlwZS5fZ2V0Q2xhc3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjbGFzc2VzID0gW1N0eWxlcy5HUklEX0NPTFVNTl07XG4gICAgICAgIHZhciBzaXplID0gdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OnNpemUnLCAnbWQnKTtcbiAgICAgICAgdmFyIHdpZHRoID0gdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OndpZHRoJywgMTIpO1xuICAgICAgICB2YXIgb2Zmc2V0ID0gdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3Om9mZnNldCcsIDApO1xuICAgICAgICBjbGFzc2VzLnB1c2goXCJjb2wtXCIgKyBzaXplICsgXCItXCIgKyB3aWR0aCk7XG4gICAgICAgIGlmIChvZmZzZXQpXG4gICAgICAgICAgICBjbGFzc2VzLnB1c2goXCJjb2wtXCIgKyBzaXplICsgXCItb2Zmc2V0LVwiICsgb2Zmc2V0KTtcbiAgICAgICAgY2xhc3Nlcy5wdXNoKHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpjbGFzcycpKTtcbiAgICAgICAgcmV0dXJuIGNsYXNzZXMuZmlsdGVyKGZ1bmN0aW9uICh2KSB7IHJldHVybiAhKHYgPT0gbnVsbCk7IH0pLmpvaW4oJyAnKTtcbiAgICB9O1xuICAgIHJldHVybiBDb2x1bW47XG59KHdtbF9ydW50aW1lXzEuQ29tcG9uZW50KSk7XG5leHBvcnRzLkNvbHVtbiA9IENvbHVtbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUdyaWQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB3bWxfcnVudGltZV8xID0gcmVxdWlyZShcIkBxdWVuay93bWwtcnVudGltZVwiKTtcbnZhciB1dGlsXzEgPSByZXF1aXJlKFwid21sLXdpZGdldHMtY29tbW9uL3V0aWxcIik7XG52YXIgU3R5bGVzID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi9TdHlsZXNcIik7XG52YXIgQ29udGFpbmVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQ29udGFpbmVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIENvbnRhaW5lcihjb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbnRleHQpIHx8IHRoaXM7XG4gICAgICAgIHZhciB2aWV3ID0gX3RoaXM7XG4gICAgICAgIF90aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgnc2VjdGlvbicsIHsgaHRtbDogeyAnY2xhc3MnOiB1dGlsXzEuY29tYmluZShbU3R5bGVzLkdSSURfQ09OVEFJTkVSLCB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6Y2xhc3MnLCAnJyldKSB9LCB3bWw6IHt9IH0sIFt3bWxfcnVudGltZV8xLmRvbWlmeSh0aGlzLmNoaWxkcmVuKV0sIHZpZXcpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBDb250YWluZXI7XG59KHdtbF9ydW50aW1lXzEuQXBwVmlldykpO1xuZXhwb3J0cy5Db250YWluZXIgPSBDb250YWluZXI7XG52YXIgUm93ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoUm93LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFJvdyhjb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbnRleHQpIHx8IHRoaXM7XG4gICAgICAgIHZhciB2aWV3ID0gX3RoaXM7XG4gICAgICAgIF90aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6IHV0aWxfMS5jb21iaW5lKFtTdHlsZXMuR1JJRF9ST1csIHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpjbGFzcycsICcnKV0pIH0sIHdtbDoge30gfSwgW3dtbF9ydW50aW1lXzEuZG9taWZ5KHRoaXMuY2hpbGRyZW4pXSwgdmlldyk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIFJvdztcbn0od21sX3J1bnRpbWVfMS5BcHBWaWV3KSk7XG5leHBvcnRzLlJvdyA9IFJvdztcbnZhciBDb2x1bW4gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhDb2x1bW4sIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQ29sdW1uKGNvbnRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29udGV4dCkgfHwgdGhpcztcbiAgICAgICAgdmFyIHZpZXcgPSBfdGhpcztcbiAgICAgICAgX3RoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogdGhpcy5fZ2V0Q2xhc3MoKSB9LCB3bWw6IHt9IH0sIFt3bWxfcnVudGltZV8xLmRvbWlmeSh0aGlzLmNoaWxkcmVuKV0sIHZpZXcpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBDb2x1bW47XG59KHdtbF9ydW50aW1lXzEuQXBwVmlldykpO1xuZXhwb3J0cy5Db2x1bW4gPSBDb2x1bW47XG4vLyMgc291cmNlTWFwcGluZ1VSTD1ncmlkLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoganNoaW50IGlnbm9yZTpzdGFydCAqL1xuLypcbmV4cG9ydCBCcmVhZENydW1iTWVudSBmcm9tICcuL2JyZWFkY3J1bWJzL0JyZWFkQ3J1bWJNZW51JztcbmV4cG9ydCBCcmVhZENydW1iIGZyb20gJy4vYnJlYWRjcnVtYnMvQnJlYWRDcnVtYic7XG5leHBvcnQgQXV0b2NvbXBsZXRlIGZyb20gJy4vYXV0b2NvbXBsZXRlL0F1dG9jb21wbGV0ZSc7XG5leHBvcnQgSnVtYm90cm9uIGZyb20gJy4vanVtYm90cm9uL0p1bWJvdHJvbic7XG5leHBvcnQgV2VsbCBmcm9tICcuL3dlbGwvV2VsbCc7XG5leHBvcnQgQ2FyZCBmcm9tICcuL2NhcmQvQ2FyZCc7XG5leHBvcnQgQ2FyZEltYWdlIGZyb20gJy4vY2FyZC9DYXJkSW1hZ2UnO1xuZXhwb3J0IENhcmRUaXRsZSBmcm9tICcuL2NhcmQvQ2FyZFRpdGxlJztcbmV4cG9ydCBDYXJkQmxvY2sgZnJvbSAnLi9jYXJkL0NhcmRCbG9jayc7XG5leHBvcnQgTGlzdEdyb3VwIGZyb20gJy4vbGlzdC1ncm91cC9MaXN0R3JvdXAnO1xuZXhwb3J0IExpc3RHcm91cEl0ZW0gZnJvbSAnLi9saXN0LWdyb3VwL0xpc3RHcm91cEl0ZW0nO1xuZXhwb3J0IFNlYXJjaCBmcm9tICcuL3NlYXJjaC9TZWFyY2gnO1xuKi9cbnZhciBGcmFnbWVudF8xID0gcmVxdWlyZShcIi4vZnJhZ21lbnQvRnJhZ21lbnRcIik7XG5leHBvcnRzLkZyYWdtZW50ID0gRnJhZ21lbnRfMS5GcmFnbWVudDtcbnZhciBEcmF3ZXJMYXlvdXRfMSA9IHJlcXVpcmUoXCIuL2RyYXdlci1sYXlvdXQvRHJhd2VyTGF5b3V0XCIpO1xuZXhwb3J0cy5EcmF3ZXJMYXlvdXQgPSBEcmF3ZXJMYXlvdXRfMS5EcmF3ZXJMYXlvdXQ7XG52YXIgQWN0aW9uQXJlYV8xID0gcmVxdWlyZShcIi4vYWN0aW9uLWFyZWEvQWN0aW9uQXJlYVwiKTtcbmV4cG9ydHMuQWN0aW9uQXJlYSA9IEFjdGlvbkFyZWFfMS5BY3Rpb25BcmVhO1xudmFyIE1haW5WaWV3XzEgPSByZXF1aXJlKFwiLi9tYWluLXZpZXcvTWFpblZpZXdcIik7XG5leHBvcnRzLk1haW5WaWV3ID0gTWFpblZpZXdfMS5NYWluVmlldztcbnZhciBNZW51QnV0dG9uXzEgPSByZXF1aXJlKFwiLi9tZW51LWJ1dHRvbi9NZW51QnV0dG9uXCIpO1xuZXhwb3J0cy5NZW51QnV0dG9uID0gTWVudUJ1dHRvbl8xLk1lbnVCdXR0b247XG52YXIgQnV0dG9uXzEgPSByZXF1aXJlKFwiLi9idXR0b24vQnV0dG9uXCIpO1xuZXhwb3J0cy5CdXR0b24gPSBCdXR0b25fMS5CdXR0b247XG52YXIgR3JpZF8xID0gcmVxdWlyZShcIi4vZ3JpZC9HcmlkXCIpO1xuZXhwb3J0cy5Db250YWluZXIgPSBHcmlkXzEuQ29udGFpbmVyO1xuZXhwb3J0cy5Sb3cgPSBHcmlkXzEuUm93O1xuZXhwb3J0cy5Db2x1bW4gPSBHcmlkXzEuQ29sdW1uO1xudmFyIFBhbmVsXzEgPSByZXF1aXJlKFwiLi9wYW5lbC9QYW5lbFwiKTtcbmV4cG9ydHMuUGFuZWwgPSBQYW5lbF8xLlBhbmVsO1xuZXhwb3J0cy5QYW5lbEhlYWRlciA9IFBhbmVsXzEuSGVhZGVyO1xuZXhwb3J0cy5QYW5lbEJvZHkgPSBQYW5lbF8xLkJvZHk7XG5leHBvcnRzLlBhbmVsRm9vdGVyID0gUGFuZWxfMS5Gb290ZXI7XG52YXIgTW9kYWxfMSA9IHJlcXVpcmUoXCIuL21vZGFsL01vZGFsXCIpO1xuZXhwb3J0cy5Nb2RhbCA9IE1vZGFsXzEuTW9kYWw7XG5leHBvcnRzLk1vZGFsSGVhZGVyID0gTW9kYWxfMS5IZWFkZXI7XG5leHBvcnRzLk1vZGFsQm9keSA9IE1vZGFsXzEuQm9keTtcbmV4cG9ydHMuTW9kYWxGb290ZXIgPSBNb2RhbF8xLkZvb3RlcjtcbnZhciBJbnB1dF8xID0gcmVxdWlyZShcIi4vaW5wdXQvSW5wdXRcIik7XG5leHBvcnRzLklucHV0ID0gSW5wdXRfMS5JbnB1dDtcbmV4cG9ydHMuU2VsZWN0ID0gSW5wdXRfMS5TZWxlY3Q7XG52YXIgU3dpdGNoXzEgPSByZXF1aXJlKFwiLi9zd2l0Y2gvU3dpdGNoXCIpO1xuZXhwb3J0cy5Td2l0Y2ggPSBTd2l0Y2hfMS5Td2l0Y2g7XG52YXIgVGFibGVfMSA9IHJlcXVpcmUoXCIuL3RhYmxlL1RhYmxlXCIpO1xuZXhwb3J0cy5UYWJsZSA9IFRhYmxlXzEuVGFibGU7XG52YXIgVGFic18xID0gcmVxdWlyZShcIi4vdGFicy9UYWJzXCIpO1xuZXhwb3J0cy5UYWIgPSBUYWJzXzEuVGFiO1xuZXhwb3J0cy5UYWJzID0gVGFic18xLlRhYnM7XG52YXIgQnVzeUluZGljYXRvcl8xID0gcmVxdWlyZShcIi4vYnVzeS1pbmRpY2F0b3IvQnVzeUluZGljYXRvclwiKTtcbmV4cG9ydHMuQnVzeUluZGljYXRvciA9IEJ1c3lJbmRpY2F0b3JfMS5CdXN5SW5kaWNhdG9yO1xudmFyIFRyZWVOYXZfMSA9IHJlcXVpcmUoXCIuL3RyZWUtbmF2L1RyZWVOYXZcIik7XG5leHBvcnRzLlRyZWVOYXYgPSBUcmVlTmF2XzEuVHJlZU5hdjtcbmV4cG9ydHMuVHJlZU5hdkl0ZW0gPSBUcmVlTmF2XzEuVHJlZU5hdkl0ZW07XG4vKiBqc2hpbnQgaWdub3JlOmVuZCAqL1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB3bWxfcnVudGltZV8xID0gcmVxdWlyZShcIkBxdWVuay93bWwtcnVudGltZVwiKTtcbnZhciB1dGlsXzEgPSByZXF1aXJlKFwid21sLXdpZGdldHMtY29tbW9uL3V0aWxcIik7XG52YXIgaW5wdXRfMSA9IHJlcXVpcmUoXCIuL3dtbC9pbnB1dFwiKTtcbnZhciBJTlBVVF9TVUNDRVNTID0gJ2hhcy1zdWNjZXNzJztcbnZhciBJTlBVVF9FUlJPUiA9ICdoYXMtZXJyb3InO1xudmFyIElOUFVUX1dBUk5JTkcgPSAnaGFzLXdhcm5pbmcnO1xudmFyIERlZmF1bHRJbnB1dERlbGVnYXRlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEZWZhdWx0SW5wdXREZWxlZ2F0ZShpbnB1dCkge1xuICAgICAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XG4gICAgfVxuICAgIERlZmF1bHRJbnB1dERlbGVnYXRlLnByb3RvdHlwZS5vbklucHV0ID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgdGhpcy5pbnB1dC5hdHRyaWJ1dGVzLnJlYWQoJ3d3Om9uSW5wdXQnLCB1dGlsXzEubm9vcCkoZSk7XG4gICAgfTtcbiAgICByZXR1cm4gRGVmYXVsdElucHV0RGVsZWdhdGU7XG59KCkpO1xuZXhwb3J0cy5EZWZhdWx0SW5wdXREZWxlZ2F0ZSA9IERlZmF1bHRJbnB1dERlbGVnYXRlO1xuLyoqXG4gKiBJbnB1dFxuICovXG52YXIgSW5wdXQgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhJbnB1dCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBJbnB1dCgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnZpZXcgPSBuZXcgaW5wdXRfMS5JbnB1dFZpZXcoX3RoaXMpO1xuICAgICAgICBfdGhpcy5kZWxlZ2F0ZSA9IF90aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6ZGVsZWdhdGUnLCBuZXcgRGVmYXVsdElucHV0RGVsZWdhdGUoX3RoaXMpKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoSW5wdXQucHJvdG90eXBlLCBcIm5hbWVcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZpZXcuaWRzLmlucHV0Lm5hbWU7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShJbnB1dC5wcm90b3R5cGUsIFwidmFsdWVcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZpZXcuaWRzLmlucHV0LnZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBJbnB1dC5wcm90b3R5cGUuaW5pdGlhbFZhbHVlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcmV0ID0gdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDp2YWx1ZScpO1xuICAgICAgICByZXR1cm4gKHR5cGVvZiByZXQgPT09ICdmdW5jdGlvbicpID8gcmV0KHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3YXQ6bmFtZScpKSA6IHJldDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIGdldENsYXNzXG4gICAgICovXG4gICAgSW5wdXQucHJvdG90eXBlLmdldENsYXNzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYyA9IFwiZm9ybS1ncm91cCBcIiArIHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3YXQ6Y2xhc3MnKTtcbiAgICAgICAgaWYgKCF0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd2F0Om1lc3NhZ2UnKSlcbiAgICAgICAgICAgIHJldHVybiBjO1xuICAgICAgICByZXR1cm4gYyArIFwiIFwiICsgdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDp2YXJpYW50JywgJ2hhcy1lcnJvcicpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogc2V0TWVzc2FnZSBzZXRzIHRoZSBtZXNzYWdlIGZvciB0aGUgbWVzc2FnZSBwb3J0aW9uIG9mXG4gICAgICogdGhpcyBpbnB1dC5cbiAgICAgKi9cbiAgICBJbnB1dC5wcm90b3R5cGUuc2V0TWVzc2FnZSA9IGZ1bmN0aW9uIChtc2cpIHtcbiAgICAgICAgaWYgKG1zZyA9PT0gdm9pZCAwKSB7IG1zZyA9ICcnOyB9XG4gICAgICAgIHZhciBtZXNzYWdlID0gdGhpcy52aWV3Lmlkcy5tZXNzYWdlO1xuICAgICAgICB2YXIgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKG1zZyk7XG4gICAgICAgIGlmIChtZXNzYWdlLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgIG1lc3NhZ2UucmVwbGFjZUNoaWxkKG5vZGUsIG1lc3NhZ2UuZmlyc3RDaGlsZCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBtZXNzYWdlLmFwcGVuZENoaWxkKG5vZGUpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBpc0ZpbGxlZCB0ZWxscyBpZiB0aGlzIElucHV0IGhhcyBhIGZpbGxlZCB2YWx1ZS5cbiAgICAgKi9cbiAgICBJbnB1dC5wcm90b3R5cGUuaXNGaWxsZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAodGhpcy52aWV3Lmlkcy5pbnB1dC52YWx1ZSAhPSBudWxsKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIGlzUmVxdWlyZWQgdGVsbHMgaWYgdGhlIElucHV0IHdhcyByZXF1aXJlZC5cbiAgICAgKi9cbiAgICBJbnB1dC5wcm90b3R5cGUuaXNSZXF1aXJlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6cmVxdWlyZWQnKSAhPSBudWxsKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIGlzVmFsaWQgcXVlcmllcyB3aGV0aGVyIHRoZSBJbnB1dCBoYXMgYmVlbiBpbnZhbGlkYXRlZFxuICAgICAqIG9yIG5vdC5cbiAgICAgKi9cbiAgICBJbnB1dC5wcm90b3R5cGUuaXNWYWxpZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLnZpZXcuaWRzLnJvb3QuY2xhc3NOYW1lLnNwbGl0KCcgJykuaW5kZXhPZihJTlBVVF9FUlJPUikgPT09IC0xKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIHJlbW92ZVZhbGlkYXRpb25TdGF0ZSByZW1vdmVzIHRoZSBzdGF0ZSB2YWxpZGF0aW9uIHN0YXRlIGZyb20gdGhlIGlucHV0LlxuICAgICAqL1xuICAgIElucHV0LnByb3RvdHlwZS5yZW1vdmVWYWxpZGF0aW9uU3RhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBoID0gdGhpcy52aWV3Lmlkcy5yb290O1xuICAgICAgICBoLmNsYXNzTGlzdC5yZW1vdmUoSU5QVVRfU1VDQ0VTUyk7XG4gICAgICAgIGguY2xhc3NMaXN0LnJlbW92ZShJTlBVVF9FUlJPUik7XG4gICAgICAgIGguY2xhc3NMaXN0LnJlbW92ZShJTlBVVF9XQVJOSU5HKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIGludmFsaWRhdGUgdGhpcyBJbnB1dCB3aXRoIGFuIG9wdGlvbmFsIG1lc3NhZ2UuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2VcbiAgICAgKiBAcmV0dXJucyB7SW5wdXR9XG4gICAgICovXG4gICAgSW5wdXQucHJvdG90eXBlLmludmFsaWRhdGUgPSBmdW5jdGlvbiAobWVzc2FnZSkge1xuICAgICAgICBpZiAobWVzc2FnZSA9PT0gdm9pZCAwKSB7IG1lc3NhZ2UgPSAnJzsgfVxuICAgICAgICB0aGlzLnJlbW92ZVZhbGlkYXRpb25TdGF0ZSgpO1xuICAgICAgICB0aGlzLnNldE1lc3NhZ2UobWVzc2FnZSk7XG4gICAgICAgIHRoaXMudmlldy5pZHMucm9vdC5jbGFzc0xpc3QuYWRkKElOUFVUX0VSUk9SKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIHZhbGlkYXRlIHRoaXMgaW5wdXQgd2l0aCBhbiBvcHRpb25hbCBtZXNzc2FnZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZVxuICAgICAqIEByZXR1cm5zIHtJbnB1dH1cbiAgICAgKi9cbiAgICBJbnB1dC5wcm90b3R5cGUudmFsaWRhdGUgPSBmdW5jdGlvbiAobWVzc2FnZSkge1xuICAgICAgICBpZiAobWVzc2FnZSA9PT0gdm9pZCAwKSB7IG1lc3NhZ2UgPSAnJzsgfVxuICAgICAgICB0aGlzLnJlbW92ZVZhbGlkYXRpb25TdGF0ZSgpO1xuICAgICAgICB0aGlzLnNldE1lc3NhZ2UobWVzc2FnZSk7XG4gICAgICAgIHRoaXMudmlldy5pZHMucm9vdC5jbGFzc0xpc3QuYWRkKElOUFVUX1NVQ0NFU1MpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogd2FybiB0aGlzIGlucHV0IHdpdGggYW4gb3B0aW9uYWwgbWVzc2FnZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZVxuICAgICAqIEByZXR1cm5zIHtJbnB1dH1cbiAgICAgKi9cbiAgICBJbnB1dC5wcm90b3R5cGUud2FybiA9IGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gICAgICAgIGlmIChtZXNzYWdlID09PSB2b2lkIDApIHsgbWVzc2FnZSA9ICcnOyB9XG4gICAgICAgIHRoaXMucmVtb3ZlVmFsaWRhdGlvblN0YXRlKCk7XG4gICAgICAgIHRoaXMuc2V0TWVzc2FnZShtZXNzYWdlKTtcbiAgICAgICAgdGhpcy52aWV3Lmlkcy5yb290LmNsYXNzTGlzdC5hZGQoSU5QVVRfV0FSTklORyk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiByZXNldCB0aGlzIGlucHV0IHRvIGEgY2xlYW4gc3RhdGUuXG4gICAgICogUmVtb3ZlcyBtZXNzYWdlcywgdmFsaWRhdGlvbiBzdGF0ZSBldGMuXG4gICAgICogQHJldHVybiB7SW5wdXR9XG4gICAgICovXG4gICAgSW5wdXQucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcm9vdCA9IHRoaXMudmlldy5pZHMucm9vdDtcbiAgICAgICAgdmFyIG0gPSB0aGlzLnZpZXcuaWRzLm1lc3NhZ2U7XG4gICAgICAgIHRoaXMucmVtb3ZlVmFsaWRhdGlvblN0YXRlKCk7XG4gICAgICAgIHdoaWxlIChtLmZpcnN0Q2hpbGQpXG4gICAgICAgICAgICBtLnJlbW92ZUNoaWxkKG0uZmlyc3RDaGlsZCk7XG4gICAgfTtcbiAgICByZXR1cm4gSW5wdXQ7XG59KHdtbF9ydW50aW1lXzEuQ29tcG9uZW50KSk7XG5leHBvcnRzLklucHV0ID0gSW5wdXQ7XG52YXIgU2VsZWN0ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoU2VsZWN0LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFNlbGVjdCgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnZpZXcgPSBuZXcgaW5wdXRfMS5TZWxlY3RWaWV3KF90aGlzKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gU2VsZWN0O1xufShJbnB1dCkpO1xuZXhwb3J0cy5TZWxlY3QgPSBTZWxlY3Q7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1JbnB1dC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHdtbF9ydW50aW1lXzEgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC1ydW50aW1lXCIpO1xudmFyIFN0eWxlcyA9IHJlcXVpcmUoXCJ3bWwtd2lkZ2V0cy1jb21tb24vU3R5bGVzXCIpO1xuZnVuY3Rpb24gbGFiZWwodmlldykgeyByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCdsYWJlbCcsIHsgaHRtbDogeyAnZm9yJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmlkJyksICdjbGFzcyc6IFN0eWxlcy5DT05UUk9MX0xBQkVMIH0sIHdtbDoge30gfSwgW3dtbF9ydW50aW1lXzEuZG9taWZ5KHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpsYWJlbCcpKV0sIHZpZXcpOyB9XG5leHBvcnRzLmxhYmVsID0gbGFiZWw7XG5mdW5jdGlvbiBtZXNzYWdlKHZpZXcpIHsgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgnc3BhbicsIHsgaHRtbDogeyAnY2xhc3MnOiBcImhlbHAtYmxvY2tcIiB9LCB3bWw6IHsgJ2lkJzogXCJtZXNzYWdlXCIgfSB9LCBbd21sX3J1bnRpbWVfMS5kb21pZnkodGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3Om1lc3NhZ2UnLCAnJykpXSwgdmlldyk7IH1cbmV4cG9ydHMubWVzc2FnZSA9IG1lc3NhZ2U7XG52YXIgU2VsZWN0VmlldyA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFNlbGVjdFZpZXcsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gU2VsZWN0Vmlldyhjb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbnRleHQpIHx8IHRoaXM7XG4gICAgICAgIHZhciB2aWV3ID0gX3RoaXM7XG4gICAgICAgIF90aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6IFtTdHlsZXMuRk9STV9HUk9VUCwgdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OnZhcmlhbnQnLCAnJyldLmpvaW4oJywnKSB9LCB3bWw6IHt9IH0sIFtsYWJlbC5jYWxsKHRoaXMsIHZpZXcpLCB3bWxfcnVudGltZV8xLm5vZGUoJ3NlbGVjdCcsIHsgaHRtbDogeyAnaWQnOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6aWQnLCAnJyksICd0aXRsZSc6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzp0aXRsZScpLCAnbmFtZSc6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpuYW1lJywgdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmlkJywgJycpKSwgJ29uY2hhbmdlJzogdGhpcy5kZWxlZ2F0ZS5vbklucHV0LmJpbmQodGhpcy5kZWxlZ2F0ZSksICd2YWx1ZSc6IHRoaXMuaW5pdGlhbFZhbHVlKCksICdkaXNhYmxlZCc6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpkaXNhYmxlZCcsIG51bGwpLCAncmVhZG9ubHknOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6cmVhZG9ubHknLCBudWxsKSwgJ2NsYXNzJzogU3R5bGVzLlNFTEVDVCB9LCB3bWw6IHsgJ2lkJzogXCJpbnB1dFwiIH0gfSwgW3dtbF9ydW50aW1lXzEuZm9yRSh0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6b3B0aW9ucycsIFtdKSwgZnVuY3Rpb24gZm9yMShvcHQpIHsgcmV0dXJuIChmdW5jdGlvbiAoKSB7IHJldHVybiAodHlwZW9mIG9wdCA9PT0gJ3N0cmluZycpID8gd21sX3J1bnRpbWVfMS5ib3god21sX3J1bnRpbWVfMS5ub2RlKCdvcHRpb24nLCB7IGh0bWw6IHt9LCB3bWw6IHt9IH0sIFt3bWxfcnVudGltZV8xLmRvbWlmeShvcHQpXSwgdmlldyksIHdtbF9ydW50aW1lXzEubm9kZSgnb3B0aW9uJywgeyBodG1sOiB7fSwgd21sOiB7fSB9LCBbd21sX3J1bnRpbWVfMS5kb21pZnkob3B0KV0sIHZpZXcpLCB3bWxfcnVudGltZV8xLm5vZGUoJ29wdGlvbicsIHsgaHRtbDoge30sIHdtbDoge30gfSwgW3dtbF9ydW50aW1lXzEuZG9taWZ5KG9wdCldLCB2aWV3KSkgOiB3bWxfcnVudGltZV8xLm5vZGUoJ29wdGlvbicsIHsgaHRtbDogeyAndmFsdWUnOiBvcHQudmFsdWUgfSwgd21sOiB7fSB9LCBbd21sX3J1bnRpbWVfMS5kb21pZnkob3B0LmxhYmVsKV0sIHZpZXcpOyB9KS5jYWxsKHRoaXMpOyB9LmJpbmQodGhpcyksIGZ1bmN0aW9uIGZvcl9vdGhlcndpc2UxKCkgeyByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCdwJywgeyBodG1sOiB7fSwgd21sOiB7fSB9LCBbXSwgdmlldyk7IH0uYmluZCh0aGlzKSldLCB2aWV3KSwgbWVzc2FnZS5jYWxsKHRoaXMsIHZpZXcpXSwgdmlldyk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIFNlbGVjdFZpZXc7XG59KHdtbF9ydW50aW1lXzEuQXBwVmlldykpO1xuZXhwb3J0cy5TZWxlY3RWaWV3ID0gU2VsZWN0VmlldztcbnZhciBJbnB1dFZpZXcgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhJbnB1dFZpZXcsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gSW5wdXRWaWV3KGNvbnRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29udGV4dCkgfHwgdGhpcztcbiAgICAgICAgdmFyIHZpZXcgPSBfdGhpcztcbiAgICAgICAgX3RoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogW1N0eWxlcy5GT1JNX0dST1VQLCB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6dmFyaWFudCcsICcnKV0uam9pbignLCcpIH0sIHdtbDoge30gfSwgW2xhYmVsLmNhbGwodGhpcywgdmlldyksIHdtbF9ydW50aW1lXzEuaWZFKHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzp0eXBlJywgJ3RleHQnKSAhPT0gJ3RleHRhcmVhJywgZnVuY3Rpb24gaWYzKCkgeyByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCdpbnB1dCcsIHsgaHRtbDogeyAnaWQnOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6aWQnLCAnJyksICd0aXRsZSc6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzp0aXRsZScpLCAnbmFtZSc6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpuYW1lJywgdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmlkJywgJycpKSwgJ3R5cGUnOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6dHlwZScsICd0ZXh0JyksICdwbGFjZWhvbGRlcic6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpwbGFjZWhvbGRlcicpLCAnb25pbnB1dCc6IHRoaXMuZGVsZWdhdGUub25JbnB1dC5iaW5kKHRoaXMuZGVsZWdhdGUpLCAndmFsdWUnOiB0aGlzLmluaXRpYWxWYWx1ZSgpLCAnZGlzYWJsZWQnOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6ZGlzYWJsZWQnLCBudWxsKSwgJ3JlYWRvbmx5JzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OnJlYWRvbmx5JywgbnVsbCksICdjbGFzcyc6IFN0eWxlcy5JTlBVVCB9LCB3bWw6IHsgJ2lkJzogXCJpbnB1dFwiIH0gfSwgW10sIHZpZXcpOyB9LmJpbmQodGhpcyksIGZ1bmN0aW9uIGVsc2VfY2xhdXNlMigpIHsgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgndGV4dGFyZWEnLCB7IGh0bWw6IHsgJ2lkJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmlkJywgJycpLCAndGl0bGUnOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6dGl0bGUnKSwgJ25hbWUnOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6bmFtZScsIHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzppZCcsICcnKSksICdjbGFzcyc6IFN0eWxlcy5URVhUQVJFQSwgJ3BsYWNlaG9sZGVyJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OnBsYWNlaG9sZGVyJyksICdvbmlucHV0JzogdGhpcy5kZWxlZ2F0ZS5vbklucHV0LmJpbmQodGhpcy5kZWxlZ2F0ZSksICdkaXNhYmxlZCc6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpkaXNhYmxlZCcsIG51bGwpLCAncmVhZG9ubHknOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6cmVhZG9ubHknLCBudWxsKSwgJ3Jvd3MnOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd2F0OnJvd3MnKSB9LCB3bWw6IHsgJ2lkJzogXCJpbnB1dFwiIH0gfSwgW3dtbF9ydW50aW1lXzEuZG9taWZ5KHRoaXMuaW5pdGlhbFZhbHVlKCkpXSwgdmlldyk7IH0uYmluZCh0aGlzKSksIG1lc3NhZ2UuY2FsbCh0aGlzLCB2aWV3KV0sIHZpZXcpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBJbnB1dFZpZXc7XG59KHdtbF9ydW50aW1lXzEuQXBwVmlldykpO1xuZXhwb3J0cy5JbnB1dFZpZXcgPSBJbnB1dFZpZXc7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbnB1dC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHdtbF9ydW50aW1lXzEgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC1ydW50aW1lXCIpO1xudmFyIHV0aWxfMSA9IHJlcXVpcmUoXCJ3bWwtd2lkZ2V0cy1jb21tb24vdXRpbFwiKTtcbnZhciBtYWluX3ZpZXdfMSA9IHJlcXVpcmUoXCIuL3dtbC9tYWluLXZpZXdcIik7XG4vKipcbiAqIE1haW5WaWV3IHByb3ZpZGVzIGEgY29udGFpbmVyIGZvciB0aGUgbWFpbiBjb250ZW50IG9mIGFuIGFwcGxpY2F0aW9uLlxuICovXG52YXIgTWFpblZpZXcgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhNYWluVmlldywgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBNYWluVmlldygpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnZpZXcgPSBuZXcgbWFpbl92aWV3XzEuTWFpbihfdGhpcyk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogc2V0Q29udGVudCByZXBsYWNlcyB0aGUgY29udGVudCBvZiB0aGlzIHZpZXcuXG4gICAgICovXG4gICAgTWFpblZpZXcucHJvdG90eXBlLnNldENvbnRlbnQgPSBmdW5jdGlvbiAocikge1xuICAgICAgICB1dGlsXzEucmVwbGFjZUNvbnRlbnQociwgdGhpcy52aWV3LmZpbmRCeUlkKCdjb250ZW50JykpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIHJldHVybiBNYWluVmlldztcbn0od21sX3J1bnRpbWVfMS5Db21wb25lbnQpKTtcbmV4cG9ydHMuTWFpblZpZXcgPSBNYWluVmlldztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPU1haW5WaWV3LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgd21sX3J1bnRpbWVfMSA9IHJlcXVpcmUoXCJAcXVlbmsvd21sLXJ1bnRpbWVcIik7XG52YXIgU3R5bGVzID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi9TdHlsZXNcIik7XG52YXIgdXRpbF8xID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi91dGlsXCIpO1xudmFyIE1haW4gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhNYWluLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIE1haW4oY29udGV4dCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBjb250ZXh0KSB8fCB0aGlzO1xuICAgICAgICB2YXIgdmlldyA9IF90aGlzO1xuICAgICAgICBfdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB3bWxfcnVudGltZV8xLm5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiB1dGlsXzEuY29tYmluZShbU3R5bGVzLk1BSU5fVklFVywgU3R5bGVzLkRSQVdFUl9QVVNIQUJMRSwgdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmNsYXNzJywgJycpXSkgfSwgd21sOiB7fSB9LCBbd21sX3J1bnRpbWVfMS5kb21pZnkodGhpcy5jaGlsZHJlbildLCB2aWV3KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gTWFpbjtcbn0od21sX3J1bnRpbWVfMS5BcHBWaWV3KSk7XG5leHBvcnRzLk1haW4gPSBNYWluO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFpbi12aWV3LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgd21sX3J1bnRpbWVfMSA9IHJlcXVpcmUoXCJAcXVlbmsvd21sLXJ1bnRpbWVcIik7XG52YXIgbWVudV9idXR0b25fMSA9IHJlcXVpcmUoXCIuL3dtbC9tZW51X2J1dHRvblwiKTtcbi8qKlxuICogTWVudUJ1dHRvbiBwcm92aWRlcyBhICdoYW1idXJnZXInIG1lbnUgYnV0dG9uLlxuICovXG52YXIgTWVudUJ1dHRvbiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKE1lbnVCdXR0b24sIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gTWVudUJ1dHRvbigpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnZpZXcgPSBuZXcgbWVudV9idXR0b25fMS5NYWluKF90aGlzKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gTWVudUJ1dHRvbjtcbn0od21sX3J1bnRpbWVfMS5Db21wb25lbnQpKTtcbmV4cG9ydHMuTWVudUJ1dHRvbiA9IE1lbnVCdXR0b247XG5leHBvcnRzLmRlZmF1bHQgPSBNZW51QnV0dG9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9TWVudUJ1dHRvbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHdtbF9ydW50aW1lXzEgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC1ydW50aW1lXCIpO1xudmFyIFN0eWxlID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi9TdHlsZXNcIik7XG52YXIgdXRpbF8xID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi91dGlsXCIpO1xudmFyIE1haW4gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhNYWluLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIE1haW4oY29udGV4dCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBjb250ZXh0KSB8fCB0aGlzO1xuICAgICAgICB2YXIgdmlldyA9IF90aGlzO1xuICAgICAgICBfdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB3bWxfcnVudGltZV8xLm5vZGUoJ2J1dHRvbicsIHsgaHRtbDogeyAnY2xhc3MnOiBTdHlsZS5NRU5VX0JVVFRPTiwgJ29uY2xpY2snOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6b25DbGljaycsIHV0aWxfMS5ub29wKSB9LCB3bWw6IHt9IH0sIFt3bWxfcnVudGltZV8xLm5vZGUoJ3NwYW4nLCB7IGh0bWw6IHsgJ2NsYXNzJzogXCJcIiB9LCB3bWw6IHt9IH0sIFtdLCB2aWV3KSwgd21sX3J1bnRpbWVfMS5ub2RlKCdzcGFuJywgeyBodG1sOiB7ICdjbGFzcyc6IFwiXCIgfSwgd21sOiB7fSB9LCBbXSwgdmlldyksIHdtbF9ydW50aW1lXzEubm9kZSgnc3BhbicsIHsgaHRtbDogeyAnY2xhc3MnOiBcIlwiIH0sIHdtbDoge30gfSwgW10sIHZpZXcpXSwgdmlldyk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIE1haW47XG59KHdtbF9ydW50aW1lXzEuQXBwVmlldykpO1xuZXhwb3J0cy5NYWluID0gTWFpbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1lbnVfYnV0dG9uLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgd21sX3J1bnRpbWVfMSA9IHJlcXVpcmUoXCJAcXVlbmsvd21sLXJ1bnRpbWVcIik7XG52YXIgdmlld3MgPSByZXF1aXJlKFwiLi93bWwvbW9kYWxcIik7XG4vKipcbiAqIE1vZGFsXG4gKi9cbnZhciBNb2RhbCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKE1vZGFsLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIE1vZGFsKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMudmlldyA9IG5ldyB2aWV3cy5Nb2RhbChfdGhpcyk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogY2xvc2UgdGhlIG1vZGFsLlxuICAgICAqL1xuICAgIE1vZGFsLnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG0gPSB0aGlzLnZpZXcuZmluZEJ5SWQoJ21vZGFsJyk7XG4gICAgICAgIG0ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChtKTtcbiAgICB9O1xuICAgIE1vZGFsLnByb3RvdHlwZS5wbGFjZSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHdoaWxlIChlLmZpcnN0Q2hpbGQgIT0gbnVsbClcbiAgICAgICAgICAgIGUucmVtb3ZlQ2hpbGQoZS5maXJzdENoaWxkKTtcbiAgICAgICAgZS5hcHBlbmRDaGlsZCh0aGlzLnJlbmRlcigpKTtcbiAgICB9O1xuICAgIHJldHVybiBNb2RhbDtcbn0od21sX3J1bnRpbWVfMS5Db21wb25lbnQpKTtcbmV4cG9ydHMuTW9kYWwgPSBNb2RhbDtcbi8qKlxuICogSGVhZGVyXG4gKi9cbnZhciBIZWFkZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhIZWFkZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gSGVhZGVyKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMudmlldyA9IG5ldyB2aWV3cy5IZWFkZXIoX3RoaXMpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBIZWFkZXI7XG59KHdtbF9ydW50aW1lXzEuQ29tcG9uZW50KSk7XG5leHBvcnRzLkhlYWRlciA9IEhlYWRlcjtcbi8qKlxuICogQm9keVxuICovXG52YXIgQm9keSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEJvZHksIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQm9keSgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnZpZXcgPSBuZXcgdmlld3MuQm9keShfdGhpcyk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIEJvZHk7XG59KHdtbF9ydW50aW1lXzEuQ29tcG9uZW50KSk7XG5leHBvcnRzLkJvZHkgPSBCb2R5O1xuLyoqXG4gKiBGb290ZXJcbiAqL1xudmFyIEZvb3RlciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEZvb3RlciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBGb290ZXIoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IHZpZXdzLkZvb3RlcihfdGhpcyk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIEZvb3Rlcjtcbn0od21sX3J1bnRpbWVfMS5Db21wb25lbnQpKTtcbmV4cG9ydHMuRm9vdGVyID0gRm9vdGVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9TW9kYWwuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB3bWxfcnVudGltZV8xID0gcmVxdWlyZShcIkBxdWVuay93bWwtcnVudGltZVwiKTtcbnZhciBTdHlsZXMgPSByZXF1aXJlKFwid21sLXdpZGdldHMtY29tbW9uL1N0eWxlc1wiKTtcbnZhciB1dGlsXzEgPSByZXF1aXJlKFwid21sLXdpZGdldHMtY29tbW9uL3V0aWxcIik7XG52YXIgTW9kYWwgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhNb2RhbCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBNb2RhbChjb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbnRleHQpIHx8IHRoaXM7XG4gICAgICAgIHZhciB2aWV3ID0gX3RoaXM7XG4gICAgICAgIF90aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6IFN0eWxlcy5NT0RBTCwgJ3RhYmluZGV4JzogXCItMVwiLCAncm9sZSc6IFwiZGlhbG9nXCIgfSwgd21sOiB7ICdpZCc6IFwibW9kYWxcIiB9IH0sIFt3bWxfcnVudGltZV8xLm5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiBTdHlsZXMuTU9EQUxfRElBTE9HLCAncm9sZSc6IFwiZG9jdW1lbnRcIiB9LCB3bWw6IHt9IH0sIFt3bWxfcnVudGltZV8xLm5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiBTdHlsZXMuTU9EQUxfQ09OVEVOVCB9LCB3bWw6IHsgJ2lkJzogXCJjb250ZW50XCIgfSB9LCBbd21sX3J1bnRpbWVfMS5kb21pZnkodGhpcy5jaGlsZHJlbildLCB2aWV3KV0sIHZpZXcpXSwgdmlldyk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIE1vZGFsO1xufSh3bWxfcnVudGltZV8xLkFwcFZpZXcpKTtcbmV4cG9ydHMuTW9kYWwgPSBNb2RhbDtcbnZhciBIZWFkZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhIZWFkZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gSGVhZGVyKGNvbnRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29udGV4dCkgfHwgdGhpcztcbiAgICAgICAgdmFyIHZpZXcgPSBfdGhpcztcbiAgICAgICAgX3RoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogU3R5bGVzLk1PREFMX0hFQURFUiB9LCB3bWw6IHt9IH0sIFt3bWxfcnVudGltZV8xLm5vZGUoJ2J1dHRvbicsIHsgaHRtbDogeyAndHlwZSc6IFwiYnV0dG9uXCIsICdjbGFzcyc6IFwiY2xvc2VcIiwgJ2FyaWEtbGFiZWwnOiBcIkNsb3NlXCIsICdvbmNsaWNrJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3Om9uQ2xvc2UnLCB1dGlsXzEubm9vcCkgfSwgd21sOiB7fSB9LCBbd21sX3J1bnRpbWVfMS5ub2RlKCdzcGFuJywgeyBodG1sOiB7ICdhcmlhLWhpZGRlbic6IFwidHJ1ZVwiIH0sIHdtbDoge30gfSwgW3dtbF9ydW50aW1lXzEudGV4dChcIlxcdTAwRDdcIildLCB2aWV3KV0sIHZpZXcpLCB3bWxfcnVudGltZV8xLmRvbWlmeSh0aGlzLmNoaWxkcmVuKV0sIHZpZXcpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBIZWFkZXI7XG59KHdtbF9ydW50aW1lXzEuQXBwVmlldykpO1xuZXhwb3J0cy5IZWFkZXIgPSBIZWFkZXI7XG52YXIgQm9keSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEJvZHksIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQm9keShjb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbnRleHQpIHx8IHRoaXM7XG4gICAgICAgIHZhciB2aWV3ID0gX3RoaXM7XG4gICAgICAgIF90aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6IFN0eWxlcy5NT0RBTF9CT0RZIH0sIHdtbDoge30gfSwgW3dtbF9ydW50aW1lXzEuZG9taWZ5KHRoaXMuY2hpbGRyZW4pXSwgdmlldyk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIEJvZHk7XG59KHdtbF9ydW50aW1lXzEuQXBwVmlldykpO1xuZXhwb3J0cy5Cb2R5ID0gQm9keTtcbnZhciBGb290ZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhGb290ZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gRm9vdGVyKGNvbnRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29udGV4dCkgfHwgdGhpcztcbiAgICAgICAgdmFyIHZpZXcgPSBfdGhpcztcbiAgICAgICAgX3RoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogU3R5bGVzLk1PREFMX0ZPT1RFUiB9LCB3bWw6IHt9IH0sIFt3bWxfcnVudGltZV8xLmRvbWlmeSh0aGlzLmNoaWxkcmVuKV0sIHZpZXcpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBGb290ZXI7XG59KHdtbF9ydW50aW1lXzEuQXBwVmlldykpO1xuZXhwb3J0cy5Gb290ZXIgPSBGb290ZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tb2RhbC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHdtbF9ydW50aW1lXzEgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC1ydW50aW1lXCIpO1xudmFyIHZpZXdzID0gcmVxdWlyZShcIi4vd21sL3BhbmVsXCIpO1xudmFyIFBhbmVsID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoUGFuZWwsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gUGFuZWwoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IHZpZXdzLlBhbmVsKF90aGlzKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gUGFuZWw7XG59KHdtbF9ydW50aW1lXzEuQ29tcG9uZW50KSk7XG5leHBvcnRzLlBhbmVsID0gUGFuZWw7XG52YXIgSGVhZGVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoSGVhZGVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEhlYWRlcigpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnZpZXcgPSBuZXcgdmlld3MuSGVhZGVyKF90aGlzKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gSGVhZGVyO1xufSh3bWxfcnVudGltZV8xLkNvbXBvbmVudCkpO1xuZXhwb3J0cy5IZWFkZXIgPSBIZWFkZXI7XG52YXIgQm9keSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEJvZHksIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQm9keSgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnZpZXcgPSBuZXcgdmlld3MuQm9keShfdGhpcyk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIEJvZHk7XG59KHdtbF9ydW50aW1lXzEuQ29tcG9uZW50KSk7XG5leHBvcnRzLkJvZHkgPSBCb2R5O1xudmFyIEZvb3RlciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEZvb3RlciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBGb290ZXIoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IHZpZXdzLkZvb3RlcihfdGhpcyk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIEZvb3Rlcjtcbn0od21sX3J1bnRpbWVfMS5Db21wb25lbnQpKTtcbmV4cG9ydHMuRm9vdGVyID0gRm9vdGVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9UGFuZWwuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB3bWxfcnVudGltZV8xID0gcmVxdWlyZShcIkBxdWVuay93bWwtcnVudGltZVwiKTtcbnZhciBTdHlsZXMgPSByZXF1aXJlKFwid21sLXdpZGdldHMtY29tbW9uL1N0eWxlc1wiKTtcbnZhciB1dGlsXzEgPSByZXF1aXJlKFwid21sLXdpZGdldHMtY29tbW9uL3V0aWxcIik7XG52YXIgUGFuZWwgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhQYW5lbCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBQYW5lbChjb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbnRleHQpIHx8IHRoaXM7XG4gICAgICAgIHZhciB2aWV3ID0gX3RoaXM7XG4gICAgICAgIF90aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6IHV0aWxfMS5jb21iaW5lKFtTdHlsZXMuUEFORUwsIHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpzdHlsZScsIFN0eWxlcy5ERUZBVUxUKV0pIH0sIHdtbDoge30gfSwgW3dtbF9ydW50aW1lXzEuZG9taWZ5KHRoaXMuY2hpbGRyZW4pXSwgdmlldyk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIFBhbmVsO1xufSh3bWxfcnVudGltZV8xLkFwcFZpZXcpKTtcbmV4cG9ydHMuUGFuZWwgPSBQYW5lbDtcbnZhciBIZWFkZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhIZWFkZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gSGVhZGVyKGNvbnRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29udGV4dCkgfHwgdGhpcztcbiAgICAgICAgdmFyIHZpZXcgPSBfdGhpcztcbiAgICAgICAgX3RoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogU3R5bGVzLlBBTkVMX0hFQURFUiB9LCB3bWw6IHt9IH0sIFt3bWxfcnVudGltZV8xLmRvbWlmeSh0aGlzLmNoaWxkcmVuKV0sIHZpZXcpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBIZWFkZXI7XG59KHdtbF9ydW50aW1lXzEuQXBwVmlldykpO1xuZXhwb3J0cy5IZWFkZXIgPSBIZWFkZXI7XG52YXIgQm9keSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEJvZHksIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQm9keShjb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbnRleHQpIHx8IHRoaXM7XG4gICAgICAgIHZhciB2aWV3ID0gX3RoaXM7XG4gICAgICAgIF90aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6IFN0eWxlcy5QQU5FTF9CT0RZIH0sIHdtbDoge30gfSwgW3dtbF9ydW50aW1lXzEuZG9taWZ5KHRoaXMuY2hpbGRyZW4pXSwgdmlldyk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIEJvZHk7XG59KHdtbF9ydW50aW1lXzEuQXBwVmlldykpO1xuZXhwb3J0cy5Cb2R5ID0gQm9keTtcbnZhciBGb290ZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhGb290ZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gRm9vdGVyKGNvbnRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29udGV4dCkgfHwgdGhpcztcbiAgICAgICAgdmFyIHZpZXcgPSBfdGhpcztcbiAgICAgICAgX3RoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogU3R5bGVzLlBBTkVMX0ZPT1RFUiB9LCB3bWw6IHt9IH0sIFt3bWxfcnVudGltZV8xLmRvbWlmeSh0aGlzLmNoaWxkcmVuKV0sIHZpZXcpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBGb290ZXI7XG59KHdtbF9ydW50aW1lXzEuQXBwVmlldykpO1xuZXhwb3J0cy5Gb290ZXIgPSBGb290ZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wYW5lbC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHdtbF9ydW50aW1lXzEgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC1ydW50aW1lXCIpO1xudmFyIHN3aXRjaF8xID0gcmVxdWlyZShcIi4vd21sL3N3aXRjaFwiKTtcbi8qKlxuICogU3dpdGNoXG4gKi9cbnZhciBTd2l0Y2ggPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhTd2l0Y2gsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gU3dpdGNoKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMudmlldyA9IG5ldyBzd2l0Y2hfMS5NYWluKF90aGlzKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gU3dpdGNoO1xufSh3bWxfcnVudGltZV8xLkNvbXBvbmVudCkpO1xuZXhwb3J0cy5Td2l0Y2ggPSBTd2l0Y2g7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Td2l0Y2guanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB3bWxfcnVudGltZV8xID0gcmVxdWlyZShcIkBxdWVuay93bWwtcnVudGltZVwiKTtcbnZhciBTdHlsZXMgPSByZXF1aXJlKFwid21sLXdpZGdldHMtY29tbW9uL1N0eWxlc1wiKTtcbnZhciB1dGlsXzEgPSByZXF1aXJlKFwid21sLXdpZGdldHMtY29tbW9uL3V0aWxcIik7XG52YXIgTWFpbiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKE1haW4sIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gTWFpbihjb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbnRleHQpIHx8IHRoaXM7XG4gICAgICAgIHZhciB2aWV3ID0gX3RoaXM7XG4gICAgICAgIF90aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgnbGFiZWwnLCB7IGh0bWw6IHsgJ2NsYXNzJzogU3R5bGVzLlNXSVRDSCB9LCB3bWw6IHt9IH0sIFt3bWxfcnVudGltZV8xLm5vZGUoJ2lucHV0JywgeyBodG1sOiB7ICd0eXBlJzogXCJjaGVja2JveFwiLCAnbmFtZSc6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpuYW1lJyksICd2YWx1ZSc6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzp2YWx1ZScpLCAnb25jaGFuZ2UnOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6b25DaGFuZ2UnLCB1dGlsXzEubm9vcCkgfSwgd21sOiB7fSB9LCBbXSwgdmlldyksIHdtbF9ydW50aW1lXzEubm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6IFN0eWxlcy5TV0lUQ0hfU0xJREVSIH0sIHdtbDoge30gfSwgW10sIHZpZXcpLCB3bWxfcnVudGltZV8xLmRvbWlmeSh0aGlzLmNoaWxkcmVuKV0sIHZpZXcpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBNYWluO1xufSh3bWxfcnVudGltZV8xLkFwcFZpZXcpKTtcbmV4cG9ydHMuTWFpbiA9IE1haW47XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zd2l0Y2guanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBwcm9wZXJ0eV9zZWVrXzEgPSByZXF1aXJlKFwicHJvcGVydHktc2Vla1wiKTtcbnZhciB3bWxfcnVudGltZV8xID0gcmVxdWlyZShcIkBxdWVuay93bWwtcnVudGltZVwiKTtcbnZhciB0YWJsZV8xID0gcmVxdWlyZShcIi4vd21sL3RhYmxlXCIpO1xudmFyIEFTQ19BUlJPVyA9ICdcXHUyMWU3JztcbnZhciBERVNDX0FSUk9XID0gJ1xcdTIxZTknO1xuZXhwb3J0cy5kYXRlU29ydCA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgdmFyIG5hID0gbmV3IERhdGUoYSkuZ2V0VGltZSgpO1xuICAgIHZhciBuYiA9IG5ldyBEYXRlKGIpLmdldFRpbWUoKTtcbiAgICByZXR1cm4gbmEgPiBuYiA/IC0xIDogbmEgPCBuYiA/IDEgOiAwO1xufTtcbmV4cG9ydHMuc3RyaW5nU29ydCA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgdmFyIGxhID0gYS5yZXBsYWNlKC9cXHMrLywgJycpLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFyIGxiID0gYi5yZXBsYWNlKC9cXHMrLywgJycpLnRvTG93ZXJDYXNlKCk7XG4gICAgcmV0dXJuIChsYSA+IGxiKSA/IC0xIDogKGxhIDwgbGIpID8gMSA6IDA7XG59O1xuZXhwb3J0cy5uYXR1cmFsU29ydCA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgLy9Tb3VyY2U6IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNDM0MDIyNy9zb3J0LW1peGVkLWFscGhhLW51bWVyaWMtYXJyYXlcbiAgICB2YXIgcmVBID0gL1teYS16QS1aXS9nO1xuICAgIHZhciByZU4gPSAvW14wLTldL2c7XG4gICAgdmFyIEFJbnQgPSBwYXJzZUludChhLCAxMCk7XG4gICAgdmFyIEJJbnQgPSBwYXJzZUludChiLCAxMCk7XG4gICAgaWYgKGlzTmFOKEFJbnQpICYmIGlzTmFOKEJJbnQpKSB7XG4gICAgICAgIHZhciBhQSA9IGEucmVwbGFjZShyZUEsICcnKTtcbiAgICAgICAgdmFyIGJBID0gYi5yZXBsYWNlKHJlQSwgJycpO1xuICAgICAgICBpZiAoYUEgPT09IGJBKSB7XG4gICAgICAgICAgICB2YXIgYU4gPSBwYXJzZUludChhLnJlcGxhY2UocmVOLCAnJyksIDEwKTtcbiAgICAgICAgICAgIHZhciBiTiA9IHBhcnNlSW50KGIucmVwbGFjZShyZU4sICcnKSwgMTApO1xuICAgICAgICAgICAgcmV0dXJuIGFOID09PSBiTiA/IDAgOiBhTiA+IGJOID8gLTEgOiAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGFBID4gYkEgPyAtMSA6IDE7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoaXNOYU4oQUludCkpIHtcbiAgICAgICAgcmV0dXJuIC0xOyAvL3RvIG1ha2UgYWxwaGFudW1lcmljIHNvcnQgZmlyc3QgcmV0dXJuIC0xIGhlcmVcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNOYU4oQkludCkpIHtcbiAgICAgICAgcmV0dXJuIDE7IC8vdG8gbWFrZSBhbHBoYW51bWVyaWMgc29ydCBmaXJzdCByZXR1cm4gMSBoZXJlXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gQUludCA+IEJJbnQgPyAtMSA6IDE7XG4gICAgfVxufTtcbmV4cG9ydHMubnVtYmVyU29ydCA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgdmFyIG5hID0gcGFyc2VGbG9hdChhKTtcbiAgICB2YXIgbmIgPSBwYXJzZUZsb2F0KGIpO1xuICAgIG5hID0gKGlzTmFOKGEpKSA/IC1JbmZpbml0eSA6IGE7XG4gICAgbmIgPSAoaXNOYU4oYikpID8gLUluZmluaXR5IDogYjtcbiAgICByZXR1cm4gKG5hID4gbmIpID8gLTEgOiAobmEgPCBuYikgPyAxIDogMDtcbn07XG52YXIgSGVhZGluZ0NsaWNrZWRFdmVudCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gSGVhZGluZ0NsaWNrZWRFdmVudChuYW1lLCBmaWVsZCwgdGFibGUpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5maWVsZCA9IGZpZWxkO1xuICAgICAgICB0aGlzLnRhYmxlID0gdGFibGU7XG4gICAgfVxuICAgIHJldHVybiBIZWFkaW5nQ2xpY2tlZEV2ZW50O1xufSgpKTtcbmV4cG9ydHMuSGVhZGluZ0NsaWNrZWRFdmVudCA9IEhlYWRpbmdDbGlja2VkRXZlbnQ7XG52YXIgUm93Q2xpY2tlZEV2ZW50ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBSb3dDbGlja2VkRXZlbnQodmFsdWUsIGluZGV4LCBkYXRhLCB0YWJsZSkge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICAgICAgdGhpcy50YWJsZSA9IHRhYmxlO1xuICAgIH1cbiAgICByZXR1cm4gUm93Q2xpY2tlZEV2ZW50O1xufSgpKTtcbmV4cG9ydHMuUm93Q2xpY2tlZEV2ZW50ID0gUm93Q2xpY2tlZEV2ZW50O1xudmFyIFJvd1NlbGVjdGVkRXZlbnQgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhSb3dTZWxlY3RlZEV2ZW50LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFJvd1NlbGVjdGVkRXZlbnQoKSB7XG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIFJvd1NlbGVjdGVkRXZlbnQ7XG59KFJvd0NsaWNrZWRFdmVudCkpO1xuZXhwb3J0cy5Sb3dTZWxlY3RlZEV2ZW50ID0gUm93U2VsZWN0ZWRFdmVudDtcbnZhciBDZWxsQ2xpY2tlZEV2ZW50ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDZWxsQ2xpY2tlZEV2ZW50KHZhbHVlLCBuYW1lLCBpbmRleCwgcm93LCB0YWJsZSkge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgICAgICAgdGhpcy5yb3cgPSByb3c7XG4gICAgICAgIHRoaXMudGFibGUgPSB0YWJsZTtcbiAgICB9XG4gICAgcmV0dXJuIENlbGxDbGlja2VkRXZlbnQ7XG59KCkpO1xuZXhwb3J0cy5DZWxsQ2xpY2tlZEV2ZW50ID0gQ2VsbENsaWNrZWRFdmVudDtcbnZhciBEZWZhdWx0VGFibGVNb2RlbCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRGVmYXVsdFRhYmxlTW9kZWwoKSB7XG4gICAgfVxuICAgIERlZmF1bHRUYWJsZU1vZGVsLnByb3RvdHlwZS5hbGxTZWxlY3RlZCA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICBEZWZhdWx0VGFibGVNb2RlbC5wcm90b3R5cGUuaGVhZGluZ0NsaWNrZWQgPSBmdW5jdGlvbiAoX2UpIHsgfTtcbiAgICBEZWZhdWx0VGFibGVNb2RlbC5wcm90b3R5cGUucm93Q2xpY2tlZCA9IGZ1bmN0aW9uIChfZSkgeyB9O1xuICAgIERlZmF1bHRUYWJsZU1vZGVsLnByb3RvdHlwZS5yb3dTZWxlY3RlZCA9IGZ1bmN0aW9uIChfZSkgeyB9O1xuICAgIHJldHVybiBEZWZhdWx0VGFibGVNb2RlbDtcbn0oKSk7XG5leHBvcnRzLkRlZmF1bHRUYWJsZU1vZGVsID0gRGVmYXVsdFRhYmxlTW9kZWw7XG52YXIgU29ydFRhYmxlTW9kZWwgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhTb3J0VGFibGVNb2RlbCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBTb3J0VGFibGVNb2RlbCgpIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgIH1cbiAgICBTb3J0VGFibGVNb2RlbC5wcm90b3R5cGUuaGVhZGluZ0NsaWNrZWQgPSBmdW5jdGlvbiAoZSkgeyBlLnRhYmxlLnNvcnQoZS5uYW1lKTsgfTtcbiAgICByZXR1cm4gU29ydFRhYmxlTW9kZWw7XG59KERlZmF1bHRUYWJsZU1vZGVsKSk7XG5leHBvcnRzLlNvcnRUYWJsZU1vZGVsID0gU29ydFRhYmxlTW9kZWw7XG52YXIgVGFibGUgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhUYWJsZSwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBUYWJsZSgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLm9yaWdpbmFsRGF0YSA9IF90aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6ZGF0YScsIFtdKTtcbiAgICAgICAgX3RoaXMuZGF0YSA9IF90aGlzLm9yaWdpbmFsRGF0YS5zbGljZSgpO1xuICAgICAgICBfdGhpcy5zb3J0ZWRPbiA9ICcnO1xuICAgICAgICBfdGhpcy5hcnJvdyA9ICcnO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IHRhYmxlXzEuVGFibGVWaWV3KF90aGlzKTtcbiAgICAgICAgX3RoaXMubW9kZWwgPSBfdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3Om1vZGVsJywgbmV3IERlZmF1bHRUYWJsZU1vZGVsKCkpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIFRhYmxlLnByb3RvdHlwZS5zb3J0ID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgdmFyIGRhdGE7XG4gICAgICAgIHZhciBib2R5ID0gdGhpcy52aWV3LmZpbmRCeUlkKCdib2R5Jyk7XG4gICAgICAgIHZhciBoZWFkID0gdGhpcy52aWV3LmZpbmRCeUlkKCdoZWFkJyk7XG4gICAgICAgIHZhciBmaWVsZCA9IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpmaWVsZHMnLCBbXSkucmVkdWNlKGZ1bmN0aW9uIChwLCBjKSB7IHJldHVybiBwID8gcCA6IChjLm5hbWUgPT09IG5hbWUgPyBjIDogbnVsbCk7IH0pO1xuICAgICAgICB2YXIgc29ydE9uO1xuICAgICAgICB2YXIgc3RyYXRlZ3k7XG4gICAgICAgIGlmICghZmllbGQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUYWJsZSNzb3J0OiB1bmtub3duIGZpZWxkICdcIiArIG5hbWUgKyBcIidcIik7XG4gICAgICAgIHNvcnRPbiA9IGZpZWxkLnNvcnRPbiB8fCBuYW1lO1xuICAgICAgICBzdHJhdGVneSA9IGZpZWxkLnN0cmF0ZWd5IHx8IGV4cG9ydHMuc3RyaW5nU29ydDtcbiAgICAgICAgaWYgKHRoaXMuc29ydGVkT24gPT09IG5hbWUpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IHRoaXMuZGF0YS5yZXZlcnNlKCk7XG4gICAgICAgICAgICB0aGlzLmFycm93ID0gKHRoaXMuYXJyb3cgPT09IEFTQ19BUlJPVykgPyBERVNDX0FSUk9XIDogQVNDX0FSUk9XO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hcnJvdyA9IERFU0NfQVJST1c7XG4gICAgICAgICAgICB0aGlzLmRhdGEgPSB0aGlzXG4gICAgICAgICAgICAgICAgLm9yaWdpbmFsRGF0YVxuICAgICAgICAgICAgICAgIC5zbGljZSgpXG4gICAgICAgICAgICAgICAgLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIHN0cmF0ZWd5KHByb3BlcnR5X3NlZWtfMS5kZWZhdWx0KHNvcnRPbiwgYSksIHByb3BlcnR5X3NlZWtfMS5kZWZhdWx0KHNvcnRPbiwgYikpOyB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNvcnRlZE9uID0gbmFtZTtcbiAgICAgICAgdGhpcy52aWV3LmludmFsaWRhdGUoKTtcbiAgICB9O1xuICAgIHJldHVybiBUYWJsZTtcbn0od21sX3J1bnRpbWVfMS5Db21wb25lbnQpKTtcbmV4cG9ydHMuVGFibGUgPSBUYWJsZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVRhYmxlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgd21sX3J1bnRpbWVfMSA9IHJlcXVpcmUoXCJAcXVlbmsvd21sLXJ1bnRpbWVcIik7XG52YXIgcHJvcGVydHlfc2Vla18xID0gcmVxdWlyZShcInByb3BlcnR5LXNlZWtcIik7XG52YXIgU3R5bGVzID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi9TdHlsZXNcIik7XG52YXIgVGFibGVfMSA9IHJlcXVpcmUoXCIuLi9UYWJsZVwiKTtcbnZhciBfMSA9IHJlcXVpcmUoXCIuLi8uLi9cIik7XG5mdW5jdGlvbiB0aGVhZCh2aWV3LCBmaWVsZHMpIHsgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgndHInLCB7IGh0bWw6IHt9LCB3bWw6IHt9IH0sIFt3bWxfcnVudGltZV8xLmlmRSh0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6c2VsZWN0YWJsZScpLCBmdW5jdGlvbiBpZjQoKSB7IHJldHVybiB3bWxfcnVudGltZV8xLm5vZGUoJ3RoJywgeyBodG1sOiB7fSwgd21sOiB7fSB9LCBbd21sX3J1bnRpbWVfMS5ub2RlKCdpbnB1dCcsIHsgaHRtbDogeyAndHlwZSc6IFwiY2hlY2tib3hcIiwgJ29uY2xpY2snOiBmdW5jdGlvbiBmdW5jdGlvbl9saXRlcmFsXzEoKSB7IHJldHVybiB0aGlzLm1vZGVsLmFsbFJvd3NTZWxlY3RlZCgpOyB9LmJpbmQodGhpcykgfSwgd21sOiB7fSB9LCBbXSwgdmlldyldLCB2aWV3KTsgfS5iaW5kKHRoaXMpLCB3bWxfcnVudGltZV8xLmVtcHR5KSwgd21sX3J1bnRpbWVfMS5mb3JFKGZpZWxkcywgZnVuY3Rpb24gZm9yMihmaWVsZCkgeyByZXR1cm4gd21sX3J1bnRpbWVfMS5pZkUoIWZpZWxkLmhpZGRlbiwgZnVuY3Rpb24gaWY1KCkgeyByZXR1cm4gd21sX3J1bnRpbWVfMS5pZkUoZmllbGQuc29ydEFzLCBmdW5jdGlvbiBpZjYoKSB7IHJldHVybiB3bWxfcnVudGltZV8xLm5vZGUoJ3RoJywgeyBodG1sOiB7ICdjbGFzcyc6IFt0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6aGVhZGluZ0NsYXNzJyksICh0aGlzLnNvcnRlZE9uID09PSBmaWVsZC5uYW1lKSA/IFN0eWxlcy5BQ1RJVkUgOiAnJ10uam9pbignICcpLCAnb25jbGljayc6IGZ1bmN0aW9uIGZ1bmN0aW9uX2xpdGVyYWxfMigpIHsgcmV0dXJuIHRoaXMubW9kZWwuaGVhZGluZ0NsaWNrZWQobmV3IFRhYmxlXzEuSGVhZGluZ0NsaWNrZWRFdmVudChmaWVsZC5uYW1lLCBmaWVsZCwgdGhpcykpOyB9LmJpbmQodGhpcykgfSwgd21sOiB7fSB9LCBbd21sX3J1bnRpbWVfMS5kb21pZnkoZmllbGQuaGVhZGluZyksIHdtbF9ydW50aW1lXzEuaWZFKHRoaXMuc29ydGVkT24gPT09IGZpZWxkLm5hbWUsIGZ1bmN0aW9uIGlmNygpIHsgcmV0dXJuIHdtbF9ydW50aW1lXzEuZG9taWZ5KHRoaXMuYXJyb3cpOyB9LmJpbmQodGhpcyksIHdtbF9ydW50aW1lXzEuZW1wdHkpXSwgdmlldyk7IH0uYmluZCh0aGlzKSwgZnVuY3Rpb24gZWxzZV9jbGF1c2UzKCkgeyByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCd0aCcsIHsgaHRtbDogeyAnY2xhc3MnOiBbdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmhlYWRpbmdDbGFzcycpLCAodGhpcy5zb3J0ZWRPbiA9PT0gZmllbGQubmFtZSkgPyBTdHlsZXMuQUNUSVZFIDogJyddLmpvaW4oJyAnKSwgJ29uY2xpY2snOiBmdW5jdGlvbiBmdW5jdGlvbl9saXRlcmFsXzMoKSB7IHJldHVybiB0aGlzLm1vZGVsLmhlYWRpbmdDbGlja2VkKG5ldyBUYWJsZV8xLkhlYWRpbmdDbGlja2VkRXZlbnQoZmllbGQubmFtZSwgZmllbGQsIHRoaXMpKTsgfS5iaW5kKHRoaXMpIH0sIHdtbDoge30gfSwgW3dtbF9ydW50aW1lXzEuZG9taWZ5KGZpZWxkLmhlYWRpbmcpLCB3bWxfcnVudGltZV8xLmlmRSh0aGlzLnNvcnRlZE9uID09PSBmaWVsZC5uYW1lLCBmdW5jdGlvbiBpZjgoKSB7IHJldHVybiB3bWxfcnVudGltZV8xLmRvbWlmeSh0aGlzLmFycm93KTsgfS5iaW5kKHRoaXMpLCB3bWxfcnVudGltZV8xLmVtcHR5KV0sIHZpZXcpOyB9LmJpbmQodGhpcykpOyB9LmJpbmQodGhpcyksIHdtbF9ydW50aW1lXzEuZW1wdHkpOyB9LmJpbmQodGhpcyksIGZ1bmN0aW9uIGZvcl9vdGhlcndpc2UyKCkgeyByZXR1cm4gd21sX3J1bnRpbWVfMS5lbXB0eSgpOyB9LmJpbmQodGhpcykpXSwgdmlldyk7IH1cbmV4cG9ydHMudGhlYWQgPSB0aGVhZDtcbmZ1bmN0aW9uIHRib2R5KHZpZXcsIGRhdGEsIGZpZWxkcykgeyByZXR1cm4gd21sX3J1bnRpbWVfMS53aWRnZXQoXzEuRnJhZ21lbnQsIHsgaHRtbDoge30sIHdtbDoge30gfSwgW3dtbF9ydW50aW1lXzEuZm9yRShkYXRhLCBmdW5jdGlvbiBmb3IzKHJvdywgaW5kZXgpIHsgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgndHInLCB7IGh0bWw6IHsgJ2NsYXNzJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OnJvd0NsYXNzJyksICdvbmNsaWNrJzogZnVuY3Rpb24gZnVuY3Rpb25fbGl0ZXJhbF80KCkgeyByZXR1cm4gdGhpcy5tb2RlbC5yb3dDbGlja2VkKG5ldyBUYWJsZV8xLlJvd0NsaWNrZWRFdmVudChyb3csIGluZGV4LCBkYXRhLCB0aGlzKSk7IH0uYmluZCh0aGlzKSB9LCB3bWw6IHt9IH0sIFt3bWxfcnVudGltZV8xLmlmRSh0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6c2VsZWN0YWJsZScpLCBmdW5jdGlvbiBpZjkoKSB7IHJldHVybiB3bWxfcnVudGltZV8xLm5vZGUoJ3RkJywgeyBodG1sOiB7fSwgd21sOiB7fSB9LCBbd21sX3J1bnRpbWVfMS5ub2RlKCdpbnB1dCcsIHsgaHRtbDogeyAndHlwZSc6IFwiY2hlY2tib3hcIiwgJ29uY2xpY2snOiBmdW5jdGlvbiBmdW5jdGlvbl9saXRlcmFsXzUoKSB7IHJldHVybiB0aGlzLm1vZGVsLnJvd1NlbGVjdGVkKG5ldyBUYWJsZV8xLlJvd1NlbGVjdGVkRXZlbnQocm93LCBpbmRleCwgZGF0YSwgdGhpcykpOyB9LmJpbmQodGhpcykgfSwgd21sOiB7fSB9LCBbXSwgdmlldyldLCB2aWV3KTsgfS5iaW5kKHRoaXMpLCB3bWxfcnVudGltZV8xLmVtcHR5KSwgd21sX3J1bnRpbWVfMS5mb3JFKGZpZWxkcywgZnVuY3Rpb24gZm9yNChmaWVsZCkgeyByZXR1cm4gd21sX3J1bnRpbWVfMS5pZkUoIWZpZWxkLmhpZGRlbiwgZnVuY3Rpb24gaWYxMCgpIHsgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgndGQnLCB7IGh0bWw6IHsgJ2NsYXNzJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmNlbGxDbGFzcycpLCAnb25jbGljayc6IGZ1bmN0aW9uIGZ1bmN0aW9uX2xpdGVyYWxfNigpIHsgcmV0dXJuIHRoaXMubW9kZWwuY2VsbENsaWNrZWQobmV3IFRhYmxlXzEuQ2VsbENsaWNrZWRFdmVudChwcm9wZXJ0eV9zZWVrXzEuZ2V0KGZpZWxkLm5hbWUsIHJvdyksIGZpZWxkLm5hbWUsIGluZGV4LCByb3csIHRoaXMpKTsgfS5iaW5kKHRoaXMpIH0sIHdtbDoge30gfSwgW3dtbF9ydW50aW1lXzEuaWZFKGZpZWxkLmZyYWdtZW50LCBmdW5jdGlvbiBpZjExKCkgeyByZXR1cm4gZmllbGQuZnJhZ21lbnQuY2FsbCh0aGlzLCB2aWV3LCBwcm9wZXJ0eV9zZWVrXzEuZ2V0KGZpZWxkLm5hbWUsIHJvdyksIGZpZWxkLm5hbWUsIHJvdywgZmllbGQpOyB9LmJpbmQodGhpcyksIGZ1bmN0aW9uIGVsc2VfY2xhdXNlNCgpIHsgcmV0dXJuIHdtbF9ydW50aW1lXzEuZG9taWZ5KHByb3BlcnR5X3NlZWtfMS5nZXQoZmllbGQubmFtZSwgcm93KSk7IH0uYmluZCh0aGlzKSldLCB2aWV3KTsgfS5iaW5kKHRoaXMpLCB3bWxfcnVudGltZV8xLmVtcHR5KTsgfS5iaW5kKHRoaXMpLCBmdW5jdGlvbiBmb3Jfb3RoZXJ3aXNlNCgpIHsgcmV0dXJuIHdtbF9ydW50aW1lXzEuZW1wdHkoKTsgfS5iaW5kKHRoaXMpKV0sIHZpZXcpOyB9LmJpbmQodGhpcyksIGZ1bmN0aW9uIGZvcl9vdGhlcndpc2U0KCkgeyByZXR1cm4gd21sX3J1bnRpbWVfMS5lbXB0eSgpOyB9LmJpbmQodGhpcykpXSwgdmlldyk7IH1cbmV4cG9ydHMudGJvZHkgPSB0Ym9keTtcbnZhciBUYWJsZVZpZXcgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhUYWJsZVZpZXcsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gVGFibGVWaWV3KGNvbnRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29udGV4dCkgfHwgdGhpcztcbiAgICAgICAgdmFyIHZpZXcgPSBfdGhpcztcbiAgICAgICAgX3RoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCd0YWJsZScsIHsgaHRtbDogeyAnY2xhc3MnOiBbU3R5bGVzLlRBQkxFLCB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6Y2xhc3MnLCAnJyldLmpvaW4oJyAnKSB9LCB3bWw6IHt9IH0sIFt3bWxfcnVudGltZV8xLm5vZGUoJ3RoZWFkJywgeyBodG1sOiB7fSwgd21sOiB7ICdpZCc6IFwiaGVhZFwiIH0gfSwgW3RoZWFkLmNhbGwodGhpcywgdmlldywgdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmZpZWxkcycpKV0sIHZpZXcpLCB3bWxfcnVudGltZV8xLm5vZGUoJ3Rib2R5JywgeyBodG1sOiB7fSwgd21sOiB7ICdpZCc6IFwiYm9keVwiIH0gfSwgW3Rib2R5LmNhbGwodGhpcywgdmlldywgdGhpcy5kYXRhLCB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6ZmllbGRzJykpXSwgdmlldyldLCB2aWV3KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gVGFibGVWaWV3O1xufSh3bWxfcnVudGltZV8xLkFwcFZpZXcpKTtcbmV4cG9ydHMuVGFibGVWaWV3ID0gVGFibGVWaWV3O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGFibGUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB3bWxfcnVudGltZV8xID0gcmVxdWlyZShcIkBxdWVuay93bWwtcnVudGltZVwiKTtcbnZhciBTdHlsZXMgPSByZXF1aXJlKFwid21sLXdpZGdldHMtY29tbW9uL1N0eWxlc1wiKTtcbnZhciB1dGlsXzEgPSByZXF1aXJlKFwid21sLXdpZGdldHMtY29tbW9uL3V0aWxcIik7XG52YXIgdGFic18xID0gcmVxdWlyZShcIi4vd21sL3RhYnNcIik7XG4vKipcbiAqIFRhYlxuICovXG52YXIgVGFiID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoVGFiLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFRhYigpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnZpZXcgPSBuZXcgdGFic18xLlRhYlZpZXcoX3RoaXMpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIGNsaWNrIHRoaXMgVGFiXG4gICAgICovXG4gICAgVGFiLnByb3RvdHlwZS5jbGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy52aWV3Lmlkcy5saW5rLmNsaWNrKCk7XG4gICAgfTtcbiAgICBUYWIucHJvdG90eXBlLmNsaWNrZWQgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHZhciBwYXJlbnQgPSB0aGlzLnZpZXcuaWRzLnJvb3QucGFyZW50Tm9kZTtcbiAgICAgICAgdmFyIHVzID0gcGFyZW50LmNoaWxkcmVuO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHVzLmxlbmd0aDsgaSsrKVxuICAgICAgICAgICAgdXNbaV0uY2xhc3NMaXN0LnJlbW92ZShTdHlsZXMuQUNUSVZFKTtcbiAgICAgICAgdGhpcy52aWV3Lmlkcy5yb290LmNsYXNzTGlzdC5hZGQoU3R5bGVzLkFDVElWRSk7XG4gICAgICAgIHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpvbkNsaWNrJywgdXRpbF8xLm5vb3ApKHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpuYW1lJykpO1xuICAgIH07XG4gICAgcmV0dXJuIFRhYjtcbn0od21sX3J1bnRpbWVfMS5Db21wb25lbnQpKTtcbmV4cG9ydHMuVGFiID0gVGFiO1xuLyoqXG4gKiBUYWJzXG4gKi9cbnZhciBUYWJzID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoVGFicywgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBUYWJzKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMudmlldyA9IG5ldyB0YWJzXzEuVGFic1ZpZXcoX3RoaXMpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBUYWJzO1xufSh3bWxfcnVudGltZV8xLkNvbXBvbmVudCkpO1xuZXhwb3J0cy5UYWJzID0gVGFicztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVRhYnMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB3bWxfcnVudGltZV8xID0gcmVxdWlyZShcIkBxdWVuay93bWwtcnVudGltZVwiKTtcbnZhciBTdHlsZXMgPSByZXF1aXJlKFwid21sLXdpZGdldHMtY29tbW9uL1N0eWxlc1wiKTtcbnZhciBUYWJWaWV3ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoVGFiVmlldywgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBUYWJWaWV3KGNvbnRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29udGV4dCkgfHwgdGhpcztcbiAgICAgICAgdmFyIHZpZXcgPSBfdGhpcztcbiAgICAgICAgX3RoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCdsaScsIHsgaHRtbDogeyAncm9sZSc6IFwicHJlc2VudGF0aW9uXCIsICdjbGFzcyc6ICh0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6YWN0aXZlJykpID8gU3R5bGVzLkFDVElWRSA6IG51bGwgfSwgd21sOiB7ICdpZCc6IFwicm9vdFwiIH0gfSwgW3dtbF9ydW50aW1lXzEubm9kZSgnYScsIHsgaHRtbDogeyAnaHJlZic6IFwiI1wiLCAnb25jbGljayc6IHRoaXMuY2xpY2tlZC5iaW5kKHRoaXMpIH0sIHdtbDogeyAnaWQnOiBcImxpbmtcIiB9IH0sIFt3bWxfcnVudGltZV8xLmlmRSh0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6dGV4dCcpLCBmdW5jdGlvbiBpZjEyKCkgeyByZXR1cm4gd21sX3J1bnRpbWVfMS5kb21pZnkodGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OnRleHQnKSk7IH0uYmluZCh0aGlzKSwgZnVuY3Rpb24gZWxzZV9jbGF1c2U1KCkgeyByZXR1cm4gd21sX3J1bnRpbWVfMS5kb21pZnkodGhpcy5jaGlsZHJlbik7IH0uYmluZCh0aGlzKSldLCB2aWV3KV0sIHZpZXcpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBUYWJWaWV3O1xufSh3bWxfcnVudGltZV8xLkFwcFZpZXcpKTtcbmV4cG9ydHMuVGFiVmlldyA9IFRhYlZpZXc7XG52YXIgVGFic1ZpZXcgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhUYWJzVmlldywgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBUYWJzVmlldyhjb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbnRleHQpIHx8IHRoaXM7XG4gICAgICAgIHZhciB2aWV3ID0gX3RoaXM7XG4gICAgICAgIF90aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgndWwnLCB7IGh0bWw6IHsgJ2NsYXNzJzogU3R5bGVzLlRBQlMgfSwgd21sOiB7fSB9LCBbd21sX3J1bnRpbWVfMS5kb21pZnkodGhpcy5jaGlsZHJlbildLCB2aWV3KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gVGFic1ZpZXc7XG59KHdtbF9ydW50aW1lXzEuQXBwVmlldykpO1xuZXhwb3J0cy5UYWJzVmlldyA9IFRhYnNWaWV3O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGFicy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHdtbF9ydW50aW1lXzEgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC1ydW50aW1lXCIpO1xudmFyIHRyZWVfbmF2XzEgPSByZXF1aXJlKFwiLi93bWwvdHJlZS1uYXZcIik7XG52YXIgU3R5bGVzID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi9TdHlsZXNcIik7XG4vKipcbiAqIFRyZWVOYXZJdGVtIGlzIHVzZWQgdG8gaW5kaWNhdGUgYW4gaXRlbSBpbiB0aGUgdHJlZS5cbiAqL1xudmFyIFRyZWVOYXZJdGVtID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoVHJlZU5hdkl0ZW0sIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gVHJlZU5hdkl0ZW0oKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IHRyZWVfbmF2XzEuVHJlZU5hdkl0ZW1WaWV3KF90aGlzKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBhY3RpdmF0ZSB0aGlzIFRyZWVJdGVtXG4gICAgICovXG4gICAgVHJlZU5hdkl0ZW0ucHJvdG90eXBlLmFjdGl2YXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYSA9IHRoaXMudmlldy5pZHMubGluaztcbiAgICAgICAgaWYgKGEgaW5zdGFuY2VvZiBIVE1MRWxlbWVudClcbiAgICAgICAgICAgIGlmIChhLnBhcmVudE5vZGUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHZhciBjaGlsZHJlbiA9IGEucGFyZW50Tm9kZS5jaGlsZHJlbjtcbiAgICAgICAgICAgICAgICBhLmNsYXNzTGlzdC5yZW1vdmUoU3R5bGVzLkFDVElWRSk7XG4gICAgICAgICAgICAgICAgYS5jbGFzc0xpc3QuYWRkKFN0eWxlcy5BQ1RJVkUpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGlsZHJlbltpXS5ub2RlTmFtZSA9PT0gJ0EnKVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoaWxkcmVuW2ldICE9PSBhKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuW2ldLmNsYXNzTGlzdC5yZW1vdmUoU3R5bGVzLkFDVElWRSk7XG4gICAgICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBkZWFjdGl2YXRlIHRoaXMgRHJhd2VyTGlua1xuICAgICAqL1xuICAgIFRyZWVOYXZJdGVtLnByb3RvdHlwZS5kZWFjdGl2YXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnZpZXcuZmluZEJ5SWQoJ2EnKS5jbGFzc0xpc3QucmVtb3ZlKFN0eWxlcy5BQ1RJVkUpO1xuICAgIH07XG4gICAgcmV0dXJuIFRyZWVOYXZJdGVtO1xufSh3bWxfcnVudGltZV8xLkNvbXBvbmVudCkpO1xuZXhwb3J0cy5UcmVlTmF2SXRlbSA9IFRyZWVOYXZJdGVtO1xuLyoqXG4gKiBUcmVlTmF2IHByb3ZpZGVzIGFuIGFwaSBmb3IgZGlzcGxheWluZyBhIHRyZWUgb2YgbGlua3MuXG4gKi9cbnZhciBUcmVlTmF2ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoVHJlZU5hdiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBUcmVlTmF2KCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMudmlldyA9IG5ldyB0cmVlX25hdl8xLlRyZWVOYXZWaWV3KF90aGlzKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBUcmVlTmF2LnByb3RvdHlwZS5oYW5kbGVFdmVudCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoYykge1xuICAgICAgICAgICAgaWYgKGMgaW5zdGFuY2VvZiBIVE1MRWxlbWVudClcbiAgICAgICAgICAgICAgICBpZiAoYyAhPT0gZS50YXJnZXQpXG4gICAgICAgICAgICAgICAgICAgIGMuY2xhc3NMaXN0LnJlbW92ZShTdHlsZXMuQUNUSVZFKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBUcmVlTmF2LnByb3RvdHlwZS5yZW5kZXJlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChjKSB7IHJldHVybiBjLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX3RoaXMpOyB9KTtcbiAgICB9O1xuICAgIHJldHVybiBUcmVlTmF2O1xufSh3bWxfcnVudGltZV8xLkNvbXBvbmVudCkpO1xuZXhwb3J0cy5UcmVlTmF2ID0gVHJlZU5hdjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVRyZWVOYXYuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB3bWxfcnVudGltZV8xID0gcmVxdWlyZShcIkBxdWVuay93bWwtcnVudGltZVwiKTtcbnZhciBTdHlsZXMgPSByZXF1aXJlKFwid21sLXdpZGdldHMtY29tbW9uL1N0eWxlc1wiKTtcbnZhciB1dGlsXzEgPSByZXF1aXJlKFwid21sLXdpZGdldHMtY29tbW9uL3V0aWxcIik7XG52YXIgVHJlZU5hdkl0ZW1WaWV3ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoVHJlZU5hdkl0ZW1WaWV3LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFRyZWVOYXZJdGVtVmlldyhjb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbnRleHQpIHx8IHRoaXM7XG4gICAgICAgIHZhciB2aWV3ID0gX3RoaXM7XG4gICAgICAgIF90aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgnbGknLCB7IGh0bWw6IHsgJ2NsYXNzJzogU3R5bGVzLlRSRUVfTkFWX0xJU1RfSVRFTSB9LCB3bWw6IHt9IH0sIFt3bWxfcnVudGltZV8xLm5vZGUoJ2EnLCB7IGh0bWw6IHsgJ2NsYXNzJzogKHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzphY3RpdmUnLCBmYWxzZSkpID8gU3R5bGVzLkFDVElWRSA6ICcnLCAnaHJlZic6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpocmVmJywgJyMnKSwgJ29uY2xpY2snOiBmdW5jdGlvbiBmdW5jdGlvbl9saXRlcmFsXzcoKSB7IHJldHVybiB0aGlzLmFjdGl2YXRlKCkgfHwgdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3Om9uQ2xpY2snLCB1dGlsXzEubm9vcCkodGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3Om5hbWUnKSk7IH0uYmluZCh0aGlzKSB9LCB3bWw6IHsgJ2lkJzogXCJsaW5rXCIgfSB9LCBbd21sX3J1bnRpbWVfMS5kb21pZnkodGhpcy5jaGlsZHJlbildLCB2aWV3KV0sIHZpZXcpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBUcmVlTmF2SXRlbVZpZXc7XG59KHdtbF9ydW50aW1lXzEuQXBwVmlldykpO1xuZXhwb3J0cy5UcmVlTmF2SXRlbVZpZXcgPSBUcmVlTmF2SXRlbVZpZXc7XG52YXIgVHJlZU5hdlZpZXcgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhUcmVlTmF2VmlldywgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBUcmVlTmF2Vmlldyhjb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbnRleHQpIHx8IHRoaXM7XG4gICAgICAgIHZhciB2aWV3ID0gX3RoaXM7XG4gICAgICAgIF90aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgnbmF2JywgeyBodG1sOiB7ICdjbGFzcyc6IFN0eWxlcy5UUkVFX05BViB9LCB3bWw6IHsgJ2lkJzogXCJuYXZcIiB9IH0sIFt3bWxfcnVudGltZV8xLm5vZGUoJ3VsJywgeyBodG1sOiB7ICdjbGFzcyc6IFN0eWxlcy5UUkVFX05BVl9MSVNUIH0sIHdtbDogeyAnaWQnOiBcImxpc3RcIiB9IH0sIFt3bWxfcnVudGltZV8xLmRvbWlmeSh0aGlzLmNoaWxkcmVuKV0sIHZpZXcpXSwgdmlldyk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIFRyZWVOYXZWaWV3O1xufSh3bWxfcnVudGltZV8xLkFwcFZpZXcpKTtcbmV4cG9ydHMuVHJlZU5hdlZpZXcgPSBUcmVlTmF2Vmlldztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRyZWUtbmF2LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZnVuY3Rpb24gYm91bmRhcnlfdG9fZG90KHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlLnNwbGl0KCddWycpLmpvaW4oJy4nKS5zcGxpdCgnWycpLmpvaW4oJy4nKTtcbn1cbmZ1bmN0aW9uIHN0cmlwX2JyYWNlcyh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZS5zcGxpdCgnWycpLmpvaW4oJy4nKS5zcGxpdCgnXScpLmpvaW4oJycpO1xufVxuZnVuY3Rpb24gZXNjYXBlX2RvdHModmFsdWUpIHtcbiAgICB2YXIgdmFsID0gdmFsdWUuc3BsaXQoJ1xcJycpO1xuICAgIHJldHVybiAodmFsLmxlbmd0aCA8IDMpID8gdmFsLmpvaW4oJ1xcJycpIDogdmFsLm1hcChmdW5jdGlvbiAoc2VnKSB7XG4gICAgICAgIGlmIChzZWcubGVuZ3RoIDwgMylcbiAgICAgICAgICAgIHJldHVybiBzZWc7XG4gICAgICAgIGlmICgoc2VnWzBdID09PSAnLicpIHx8IChzZWdbc2VnLmxlbmd0aCAtIDFdID09PSAnLicpKVxuICAgICAgICAgICAgcmV0dXJuIHNlZztcbiAgICAgICAgcmV0dXJuIHNlZy5zcGxpdCgnLicpLmpvaW4oJyYmJyk7XG4gICAgfSkuam9pbignJyk7XG59XG5mdW5jdGlvbiB1bmVzY2FwZV9kb3RzKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlLnNwbGl0KCcmJicpLmpvaW4oJy4nKTtcbn1cbmZ1bmN0aW9uIHBhcnRpZnkodmFsdWUpIHtcbiAgICBpZiAoIXZhbHVlKVxuICAgICAgICByZXR1cm47XG4gICAgcmV0dXJuIGVzY2FwZV9kb3RzKHN0cmlwX2JyYWNlcyhib3VuZGFyeV90b19kb3QoJycgKyB2YWx1ZSkpKS5zcGxpdCgnLicpO1xufVxuZnVuY3Rpb24gY2FuQ2xvbmUobykge1xuICAgIHJldHVybiAodHlwZW9mIG8uX19DTE9ORV9fID09PSAnZnVuY3Rpb24nKTtcbn1cbmZ1bmN0aW9uIGNsb25lKG8pIHtcbiAgICBpZiAoKHR5cGVvZiBvICE9PSAnb2JqZWN0JykgfHwgKG8gPT09IG51bGwpKVxuICAgICAgICByZXR1cm4gbztcbiAgICBpZiAoQXJyYXkuaXNBcnJheShvKSlcbiAgICAgICAgcmV0dXJuIG8ubWFwKGNsb25lKTtcbiAgICByZXR1cm4gKGNhbkNsb25lKG8pKSA/XG4gICAgICAgIG8uX19DTE9ORV9fKGNsb25lKSA6IChvLmNvbnN0cnVjdG9yICE9PSBPYmplY3QpID8gbyA6XG4gICAgICAgIE9iamVjdC5rZXlzKG8pLnJlZHVjZShmdW5jdGlvbiAocHJlLCBrKSB7XG4gICAgICAgICAgICBwcmVba10gPSAodHlwZW9mIG9ba10gPT09ICdvYmplY3QnKSA/XG4gICAgICAgICAgICAgICAgY2xvbmUob1trXSkgOiBvW2tdO1xuICAgICAgICAgICAgcmV0dXJuIHByZTtcbiAgICAgICAgfSwge30pO1xufVxuZnVuY3Rpb24gZ2V0KHBhdGgsIG8pIHtcbiAgICB2YXIgcGFydHMgPSBwYXJ0aWZ5KHBhdGgpO1xuICAgIHZhciBmaXJzdDtcbiAgICBpZiAodHlwZW9mIG8gPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGlmIChwYXJ0cy5sZW5ndGggPT09IDEpXG4gICAgICAgICAgICByZXR1cm4gb1t1bmVzY2FwZV9kb3RzKHBhcnRzWzBdKV07XG4gICAgICAgIGlmIChwYXJ0cy5sZW5ndGggPT09IDApXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGZpcnN0ID0gb1twYXJ0cy5zaGlmdCgpXTtcbiAgICAgICAgcmV0dXJuICgodHlwZW9mIG8gPT09ICdvYmplY3QnKSAmJiAobyAhPT0gbnVsbCkpID9cbiAgICAgICAgICAgIHBhcnRzLnJlZHVjZShmdW5jdGlvbiAodGFyZ2V0LCBwcm9wKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldCA9PSBudWxsKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXRbdW5lc2NhcGVfZG90cyhwcm9wKV07XG4gICAgICAgICAgICB9LCBmaXJzdCkgOiBudWxsO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZ2V0KCk6IGV4cGVjdHMgYW4gb2JqZWN0IGdvdCAnICsgdHlwZW9mIG8pO1xuICAgIH1cbn1cbmV4cG9ydHMuZ2V0ID0gZ2V0O1xuO1xuZnVuY3Rpb24gc2V0KHBhdGgsIHZhbHVlLCBvYmopIHtcbiAgICB2YXIgcGFydHMgPSBwYXJ0aWZ5KHBhdGgpO1xuICAgIGlmICgodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHx8IChvYmogPT0gbnVsbCkpIHtcbiAgICAgICAgcmV0dXJuIGNsb25lKG9iaik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gX3NldChvYmosIHZhbHVlLCBwYXJ0cyk7XG4gICAgfVxufVxuZXhwb3J0cy5zZXQgPSBzZXQ7XG47XG5mdW5jdGlvbiBfc2V0KG9iaiwgdmFsdWUsIHBhcnRzKSB7XG4gICAgdmFyIG87XG4gICAgdmFyIGs7XG4gICAgaWYgKHBhcnRzLmxlbmd0aCA9PT0gMClcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIG8gPSAoKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB8fCAob2JqID09PSBudWxsKSkgPyB7fSA6IGNsb25lKG9iaik7XG4gICAgayA9IHVuZXNjYXBlX2RvdHMocGFydHNbMF0pO1xuICAgIG9ba10gPSBfc2V0KG9ba10sIHZhbHVlLCBwYXJ0cy5zbGljZSgxKSk7XG4gICAgcmV0dXJuIG87XG59XG5mdW5jdGlvbiBkZWZhdWx0XzEoaywgdiwgbykge1xuICAgIGlmIChvID09IG51bGwpXG4gICAgICAgIHJldHVybiBnZXQoaywgdik7XG4gICAgZWxzZVxuICAgICAgICByZXR1cm4gc2V0KGssIHYsIG8pO1xufVxuZXhwb3J0cy5kZWZhdWx0ID0gZGVmYXVsdF8xO1xuO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgU3R5bGVzID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi9TdHlsZXNcIik7XG52YXIgdmlld18xID0gcmVxdWlyZShcIi4vdmlld1wiKTtcbnZhciBUYWJsZV8xID0gcmVxdWlyZShcIkBxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50cy90YWJsZS9UYWJsZVwiKTtcbnZhciBjb3VudCA9IDA7XG47XG52YXIgTmV4dCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTmV4dChuYW1lLCBhbW91bnQsIHN0YXR1cywgd2F0Y2hlcnMpIHtcbiAgICAgICAgaWYgKG5hbWUgPT09IHZvaWQgMCkgeyBuYW1lID0gJyc7IH1cbiAgICAgICAgaWYgKGFtb3VudCA9PT0gdm9pZCAwKSB7IGFtb3VudCA9IDA7IH1cbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gdm9pZCAwKSB7IHN0YXR1cyA9ICcnOyB9XG4gICAgICAgIGlmICh3YXRjaGVycyA9PT0gdm9pZCAwKSB7IHdhdGNoZXJzID0gW107IH1cbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5hbW91bnQgPSBhbW91bnQ7XG4gICAgICAgIHRoaXMuc3RhdHVzID0gc3RhdHVzO1xuICAgICAgICB0aGlzLndhdGNoZXJzID0gd2F0Y2hlcnM7XG4gICAgfVxuICAgIHJldHVybiBOZXh0O1xufSgpKTtcbmV4cG9ydHMuTmV4dCA9IE5leHQ7XG52YXIgZmllbGRzID0gW1xuICAgIHsgbmFtZTogJ251bWJlcicsIGhlYWRpbmc6ICdOdW1iZXInIH0sXG4gICAgeyBuYW1lOiAnbmFtZScsIGhlYWRpbmc6ICdOYW1lJyB9LFxuICAgIHsgbmFtZTogJ2Ftb3VudCcsIGhlYWRpbmc6ICdBbW91bnQnIH0sXG4gICAgeyBuYW1lOiAnc3RhdHVzJywgaGVhZGluZzogJ1N0YXR1cycgfSxcbiAgICB7IG5hbWU6ICd3YXRjaGluZycsIGhlYWRpbmc6ICdXYXRjaGluZycgfVxuXTtcbnZhciBBcHBsaWNhdGlvbiA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQXBwbGljYXRpb24oKSB7XG4gICAgICAgIHRoaXMuZmllbGRzID0gZmllbGRzO1xuICAgICAgICB0aGlzLnRhYmxlTW9kZWwgPSBuZXcgVGFibGVfMS5Tb3J0VGFibGVNb2RlbCgpO1xuICAgICAgICB0aGlzLm5leHQgPSBuZXcgTmV4dCgpO1xuICAgICAgICB0aGlzLnJlY29yZHMgPSBbeyBuYW1lOiAnSm96YWluIEh1bGR1bScsIGFtb3VudDogMzIwMDAsIHN0YXR1czogJ2FjdGl2ZScsIHdhdGNoZXJzOiBbXSB9XTtcbiAgICAgICAgdGhpcy52aWV3ID0gbmV3IHZpZXdfMS5NYWluKHRoaXMpO1xuICAgIH1cbiAgICBBcHBsaWNhdGlvbi5wcm90b3R5cGUudG9nZ2xlRHJhd2VyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnZpZXcuZmluZEJ5SWQoJ2xheW91dCcpLnRvZ2dsZURyYXdlcigpO1xuICAgIH07XG4gICAgQXBwbGljYXRpb24ucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbCcpO1xuICAgICAgICB0aGlzLmRpYWxvZyA9IG5ldyB2aWV3XzEuQ3JlYXRlRGlhbG9nKHRoaXMpO1xuICAgICAgICB3aGlsZSAodGFyZ2V0LmZpcnN0Q2hpbGQpXG4gICAgICAgICAgICB0YXJnZXQucmVtb3ZlQ2hpbGQodGFyZ2V0LmZpcnN0Q2hpbGQpO1xuICAgICAgICB0YXJnZXQuYXBwZW5kQ2hpbGQodGhpcy5kaWFsb2cucmVuZGVyKCkpO1xuICAgIH07XG4gICAgQXBwbGljYXRpb24ucHJvdG90eXBlLnNhdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMucmVjb3Jkcy5wdXNoKHRoaXMubmV4dCk7XG4gICAgICAgIHRoaXMubmV4dCA9IG5ldyBOZXh0KCk7XG4gICAgICAgIHRoaXMuZGlhbG9nLmlkcy5tb2RhbC5jbG9zZSgpO1xuICAgICAgICB0aGlzLnZpZXcuaW52YWxpZGF0ZSgpO1xuICAgIH07XG4gICAgQXBwbGljYXRpb24ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgd2luZG93LmFwcCA9IHRoaXM7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYWluJykuYXBwZW5kQ2hpbGQodGhpcy52aWV3LnJlbmRlcigpKTtcbiAgICAgICAgdGhpcy5kcmF3ZXIgPSB0aGlzLnZpZXcuZmluZEJ5SWQoJ2xheW91dCcpO1xuICAgIH07XG4gICAgQXBwbGljYXRpb24ubWFpbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyB0aGlzKCk7XG4gICAgfTtcbiAgICByZXR1cm4gQXBwbGljYXRpb247XG59KCkpO1xudmFyIGFwcDtcbmFwcCA9IEFwcGxpY2F0aW9uLm1haW4oKTtcbmFwcC5ydW4oKTtcbnZhciBsYXlvdXQgPSBhcHAudmlldy5maW5kQnlJZCgnbGF5b3V0Jyk7XG52YXIgZHJhd2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShTdHlsZXMuRFJBV0VSKVswXTtcbmxheW91dC50b2dnbGVEcmF3ZXIoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHdtbF9ydW50aW1lXzEgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC1ydW50aW1lXCIpO1xudmFyIGNvbXBvbmVudHNfMSA9IHJlcXVpcmUoXCJAcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHNcIik7XG52YXIgY29tcG9uZW50c18yID0gcmVxdWlyZShcIkBxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50c1wiKTtcbnZhciBjb21wb25lbnRzXzMgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzXCIpO1xudmFyIGNvbXBvbmVudHNfNCA9IHJlcXVpcmUoXCJAcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHNcIik7XG52YXIgY29tcG9uZW50c181ID0gcmVxdWlyZShcIkBxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50c1wiKTtcbnZhciBjb21wb25lbnRzXzYgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzXCIpO1xudmFyIENyZWF0ZURpYWxvZyA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKENyZWF0ZURpYWxvZywgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBDcmVhdGVEaWFsb2coY29udGV4dCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBjb250ZXh0KSB8fCB0aGlzO1xuICAgICAgICB2YXIgdmlldyA9IF90aGlzO1xuICAgICAgICBfdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB3bWxfcnVudGltZV8xLndpZGdldChjb21wb25lbnRzXzUuTW9kYWwsIHtcbiAgICAgICAgICAgICAgICBodG1sOiB7fSxcbiAgICAgICAgICAgICAgICB3bWw6IHtcbiAgICAgICAgICAgICAgICAgICAgJ2lkJzogXCJtb2RhbFwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgW3dtbF9ydW50aW1lXzEud2lkZ2V0KGNvbXBvbmVudHNfNS5Nb2RhbEhlYWRlciwge1xuICAgICAgICAgICAgICAgICAgICBodG1sOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgd21sOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgd3c6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdvbkNsb3NlJzogZnVuY3Rpb24gZnVuY3Rpb25fbGl0ZXJhbF8xKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRpYWxvZy5pZHMubW9kYWwuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgW3dtbF9ydW50aW1lXzEudGV4dChcIlxcbiAgICAgIENyZWF0ZSByZWNvcmRcXG4gICAgXCIpXSwgdmlldyksIHdtbF9ydW50aW1lXzEud2lkZ2V0KGNvbXBvbmVudHNfNS5Nb2RhbEJvZHksIHtcbiAgICAgICAgICAgICAgICAgICAgaHRtbDoge30sXG4gICAgICAgICAgICAgICAgICAgIHdtbDoge31cbiAgICAgICAgICAgICAgICB9LCBbd21sX3J1bnRpbWVfMS53aWRnZXQoY29tcG9uZW50c182LklucHV0LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBodG1sOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdtbDoge30sXG4gICAgICAgICAgICAgICAgICAgICAgICB3dzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdpZCc6IFwibmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdsYWJlbCc6IFwiTmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdvbklucHV0JzogZnVuY3Rpb24gZnVuY3Rpb25fbGl0ZXJhbF8yKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubmV4dC5uYW1lID0gZS50YXJnZXQudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIFtdLCB2aWV3KSwgd21sX3J1bnRpbWVfMS53aWRnZXQoY29tcG9uZW50c182LklucHV0LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBodG1sOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdtbDoge30sXG4gICAgICAgICAgICAgICAgICAgICAgICB3dzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdpZCc6IFwiYW1vdW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2xhYmVsJzogXCJBbW91bnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAndHlwZSc6IFwibnVtYmVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ29uSW5wdXQnOiBmdW5jdGlvbiBmdW5jdGlvbl9saXRlcmFsXzMoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5uZXh0LmFtb3VudCA9IE51bWJlcihlLnRhcmdldC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIFtdLCB2aWV3KSwgd21sX3J1bnRpbWVfMS53aWRnZXQoY29tcG9uZW50c182LlNlbGVjdCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDoge30sXG4gICAgICAgICAgICAgICAgICAgICAgICB3bWw6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgd3c6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaWQnOiBcInN0YXR1c1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdsYWJlbCc6IFwiU3RhdHVzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ29wdGlvbnMnOiBbJ3BhaWQnLCAnb3ZlcmR1ZScsICdoaXN0b3J5J10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ29uSW5wdXQnOiBmdW5jdGlvbiBmdW5jdGlvbl9saXRlcmFsXzQoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5uZXh0LnN0YXR1cyA9IGUudGFyZ2V0LnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCBbXSwgdmlldyksIHdtbF9ydW50aW1lXzEubm9kZSgnc3BhbicsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGh0bWw6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgd21sOiB7fVxuICAgICAgICAgICAgICAgICAgICB9LCBbd21sX3J1bnRpbWVfMS50ZXh0KFwiIFJlY2VpdmUgTm90aWZpY2F0aW9ucz8gXCIpXSwgdmlldyksIHdtbF9ydW50aW1lXzEud2lkZ2V0KGNvbXBvbmVudHNfNi5Td2l0Y2gsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGh0bWw6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgd21sOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHd3OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ29uQ2hhbmdlJzogZnVuY3Rpb24gZnVuY3Rpb25fbGl0ZXJhbF81KGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChlLnRhcmdldC52YWx1ZSkgPyB0aGlzLm5leHQud2F0Y2hlcnMucHVzaCgxKSA6IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIFtdLCB2aWV3KV0sIHZpZXcpLCB3bWxfcnVudGltZV8xLndpZGdldChjb21wb25lbnRzXzUuTW9kYWxGb290ZXIsIHtcbiAgICAgICAgICAgICAgICAgICAgaHRtbDoge30sXG4gICAgICAgICAgICAgICAgICAgIHdtbDoge31cbiAgICAgICAgICAgICAgICB9LCBbd21sX3J1bnRpbWVfMS53aWRnZXQoY29tcG9uZW50c18xLkJ1dHRvbiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDoge30sXG4gICAgICAgICAgICAgICAgICAgICAgICB3bWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaWQnOiBcImNhbmNlbEJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgd3c6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAndGV4dCc6IFwiQ2FuY2VsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ29uQ2xpY2snOiBmdW5jdGlvbiBmdW5jdGlvbl9saXRlcmFsXzYoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRpYWxvZy5pZHMubW9kYWwuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LmJpbmQodGhpcylcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwgW10sIHZpZXcpLCB3bWxfcnVudGltZV8xLndpZGdldChjb21wb25lbnRzXzEuQnV0dG9uLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBodG1sOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdtbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdpZCc6IFwic2F2ZUJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgd3c6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnc3R5bGUnOiBcIi1kYW5nZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAndGV4dCc6IFwiU2F2ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdjbGFzcyc6IFwiLXJpZ2h0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ29uQ2xpY2snOiB0aGlzLnNhdmUuYmluZCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCBbXSwgdmlldyldLCB2aWV3KV0sIHZpZXcpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBDcmVhdGVEaWFsb2c7XG59KHdtbF9ydW50aW1lXzEuQXBwVmlldykpO1xuZXhwb3J0cy5DcmVhdGVEaWFsb2cgPSBDcmVhdGVEaWFsb2c7XG5mdW5jdGlvbiBuYXZpZ2F0aW9uKHZpZXcpIHtcbiAgICByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCdwJywge1xuICAgICAgICBodG1sOiB7fSxcbiAgICAgICAgd21sOiB7fVxuICAgIH0sIFt3bWxfcnVudGltZV8xLnRleHQoXCJUaGlzIGlzIGluIHRoZSBkcmF3ZXJcIildLCB2aWV3KTtcbn1cbmV4cG9ydHMubmF2aWdhdGlvbiA9IG5hdmlnYXRpb247XG5mdW5jdGlvbiBjb250ZW50KHZpZXcpIHtcbiAgICByZXR1cm4gd21sX3J1bnRpbWVfMS5ib3god21sX3J1bnRpbWVfMS53aWRnZXQoY29tcG9uZW50c18xLkFjdGlvbkFyZWEsIHtcbiAgICAgICAgaHRtbDoge30sXG4gICAgICAgIHdtbDoge1xuICAgICAgICAgICAgJ2lkJzogXCJhY3Rpb25zXCJcbiAgICAgICAgfVxuICAgIH0sIFt3bWxfcnVudGltZV8xLndpZGdldChjb21wb25lbnRzXzEuTWVudUJ1dHRvbiwge1xuICAgICAgICAgICAgaHRtbDoge30sXG4gICAgICAgICAgICB3bWw6IHt9LFxuICAgICAgICAgICAgd3c6IHtcbiAgICAgICAgICAgICAgICAnb25DbGljayc6IHRoaXMudG9nZ2xlRHJhd2VyLmJpbmQodGhpcylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgW10sIHZpZXcpLCB3bWxfcnVudGltZV8xLndpZGdldChjb21wb25lbnRzXzEuQnV0dG9uLCB7XG4gICAgICAgICAgICBodG1sOiB7fSxcbiAgICAgICAgICAgIHdtbDoge1xuICAgICAgICAgICAgICAgICdpZCc6IFwiY3JlYXRlQnV0dG9uXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB3dzoge1xuICAgICAgICAgICAgICAgICdzdHlsZSc6IFwiLWRhbmdlclwiLFxuICAgICAgICAgICAgICAgICd0ZXh0JzogXCJDcmVhdGVcIixcbiAgICAgICAgICAgICAgICAnY2xhc3MnOiBcIi1yaWdodFwiLFxuICAgICAgICAgICAgICAgICdvbkNsaWNrJzogdGhpcy5jcmVhdGUuYmluZCh0aGlzKVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCBbXSwgdmlldyldLCB2aWV3KSwgd21sX3J1bnRpbWVfMS53aWRnZXQoY29tcG9uZW50c18xLk1haW5WaWV3LCB7XG4gICAgICAgIGh0bWw6IHt9LFxuICAgICAgICB3bWw6IHtcbiAgICAgICAgICAgICdpZCc6IFwibWFpblwiXG4gICAgICAgIH1cbiAgICB9LCBbd21sX3J1bnRpbWVfMS53aWRnZXQoY29tcG9uZW50c18yLkNvbnRhaW5lciwge1xuICAgICAgICAgICAgaHRtbDoge30sXG4gICAgICAgICAgICB3bWw6IHt9XG4gICAgICAgIH0sIFt3bWxfcnVudGltZV8xLndpZGdldChjb21wb25lbnRzXzIuUm93LCB7XG4gICAgICAgICAgICAgICAgaHRtbDoge30sXG4gICAgICAgICAgICAgICAgd21sOiB7fVxuICAgICAgICAgICAgfSwgW3dtbF9ydW50aW1lXzEud2lkZ2V0KGNvbXBvbmVudHNfMi5Db2x1bW4sIHtcbiAgICAgICAgICAgICAgICAgICAgaHRtbDoge30sXG4gICAgICAgICAgICAgICAgICAgIHdtbDoge31cbiAgICAgICAgICAgICAgICB9LCBbd21sX3J1bnRpbWVfMS53aWRnZXQoY29tcG9uZW50c180LlBhbmVsLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBodG1sOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdtbDoge30sXG4gICAgICAgICAgICAgICAgICAgICAgICB3dzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdzdHlsZSc6IFwiLWluZm9cIlxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCBbd21sX3J1bnRpbWVfMS53aWRnZXQoY29tcG9uZW50c180LlBhbmVsSGVhZGVyLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDoge30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd21sOiB7fVxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgW3dtbF9ydW50aW1lXzEudGV4dChcIkRldGFpbHNcIildLCB2aWV3KSwgd21sX3J1bnRpbWVfMS53aWRnZXQoY29tcG9uZW50c180LlBhbmVsQm9keSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGh0bWw6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdtbDoge31cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIFt3bWxfcnVudGltZV8xLnRleHQoXCJSZWNvcmRzOlwiKV0sIHZpZXcpLCB3bWxfcnVudGltZV8xLndpZGdldChjb21wb25lbnRzXzMuVGFibGUsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBodG1sOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3bWw6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd3OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdmaWVsZHMnOiB0aGlzLmZpZWxkcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2RhdGEnOiB0aGlzLnJlY29yZHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdtb2RlbCc6IHRoaXMudGFibGVNb2RlbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIFtdLCB2aWV3KSwgd21sX3J1bnRpbWVfMS53aWRnZXQoY29tcG9uZW50c180LlBhbmVsRm9vdGVyLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDoge30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd21sOiB7fVxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgW3dtbF9ydW50aW1lXzEuZG9taWZ5KHRoaXMucmVjb3Jkcy5yZWR1Y2UoZnVuY3Rpb24gZnVuY3Rpb25fbGl0ZXJhbF83KHAsIGMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHAgKyBjLmFtb3VudDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LmJpbmQodGhpcyksIDApKV0sIHZpZXcpXSwgdmlldyldLCB2aWV3KV0sIHZpZXcpXSwgdmlldyldLCB2aWV3KSk7XG59XG5leHBvcnRzLmNvbnRlbnQgPSBjb250ZW50O1xudmFyIE1haW4gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhNYWluLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIE1haW4oY29udGV4dCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBjb250ZXh0KSB8fCB0aGlzO1xuICAgICAgICB2YXIgdmlldyA9IF90aGlzO1xuICAgICAgICBfdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB3bWxfcnVudGltZV8xLndpZGdldChjb21wb25lbnRzXzEuRHJhd2VyTGF5b3V0LCB7XG4gICAgICAgICAgICAgICAgaHRtbDoge30sXG4gICAgICAgICAgICAgICAgd21sOiB7XG4gICAgICAgICAgICAgICAgICAgICdpZCc6IFwibGF5b3V0XCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHd3OiB7XG4gICAgICAgICAgICAgICAgICAgICduYXZpZ2F0aW9uJzogbmF2aWdhdGlvbixcbiAgICAgICAgICAgICAgICAgICAgJ2NvbnRlbnQnOiBjb250ZW50LmJpbmQodGhpcylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBbXSwgdmlldyk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIE1haW47XG59KHdtbF9ydW50aW1lXzEuQXBwVmlldykpO1xuZXhwb3J0cy5NYWluID0gTWFpbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXZpZXcuanMubWFwIl19
