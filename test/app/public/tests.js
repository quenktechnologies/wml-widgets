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
        return this.read(path) != null;
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
    if (child instanceof Array)
        return child.forEach(function (innerChild) { return adopt(innerChild, e); });
    if (child)
        e.appendChild((typeof child === 'object') ?
            child : document.createTextNode(child == null ? '' : child));
};
var _textOrNode = function (c) {
    if (c instanceof Node)
        return c;
    if (typeof c === 'object')
        throw new TypeError("Cannot use type '" + typeof c + "' as a Text node!");
    return document.createTextNode('' + (c == null ? '' : c));
};
exports.box = function (list) {
    if (list.length === 1) {
        return _textOrNode(list[0]);
    }
    else {
        var frag_1 = document.createDocumentFragment();
        list.forEach(function (c) { return frag_1.appendChild(_textOrNode(c)); });
        return frag_1;
    }
};
var _empty = document.createDocumentFragment();
exports.empty = function () { return _empty; };
/**
 * text
 */
exports.text = function (value) {
    return document.createTextNode(value == null ? '' : value);
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
 * @param {string} tag
 * @param {object} attributes
 * @param {array<string|number|Widget>} children
 * @param {View} view
 */
exports.node = function (tag, attributes, children, view) {
    var e = document.createElement(tag);
    if (typeof attributes['html'] === 'object')
        Object.keys(attributes['html']).forEach(function (key) {
            if (typeof attributes['html'][key] === 'function') {
                e[key] = attributes['html'][key];
            }
            else if ((attributes['html'][key] != null) && (attributes['html'][key] != '')) {
                e.setAttribute(key, attributes['html'][key]);
            }
        });
    children.forEach(function (c) { return adopt(c, e); });
    if (attributes['wml'])
        if (attributes['wml']['id'])
            view.register(attributes['wml']['id'], e);
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
    if (attributes['wml'])
        if (attributes['wml']['id'])
            view.register(attributes['wml']['id'], w);
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
exports.LAYOUT = 'ww-layout';
exports.LAYOUT_DRAWER_NAVIGATION = 'wat-layout-drawer-navigation';
exports.LAYOUT_DRAWER_NAVIGATION_TITLE = 'wat-layout-drawer-navigation-title';
exports.LAYOUT_ACCOUNT_AREA = 'wat-layout-account-area';
exports.LAYOUT_ACCOUNT_AREA_TITLE = 'wat-layout-account-area-title';
exports.LAYOUT_ACCOUNT_AREA_TOGGLE = 'wat-layout-account-area-toggle';
exports.LAYOUT_NOTIFICATION = 'wat-layout-notification';
exports.LAYOUT_OVERLAY = 'way-layout-overlay';
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
            return wml_runtime_1.node('div', { html: { 'class': util_1.combine([Styles.ACTION_AREA, Styles.DRAWER_PUSHABLE_FIXED]) } }, [wml_runtime_1.node('div', { html: { 'class': Styles.ACTION_AREA_CONTENT }, wml: { 'id': "content" } }, [this.children], view)], view);
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
            return wml_runtime_1.node('div', { html: { 'class': "loading" } }, [], view);
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
            return wml_runtime_1.widget(_1.Fragment, { html: {} }, [wml_runtime_1.ifE(this.attributes.read('ww:href'), function if0() { return wml_runtime_1.box([wml_runtime_1.node('a', { html: { 'href': this.attributes.read('ww:href'), 'class': util_1.combine([Styles.BUTTON, this.attributes.read('ww:variant', ''), this.attributes.read('ww:size', ''), this.attributes.read('ww:style', Styles.DEFAULT), this.attributes.read('ww:class')]), 'onclick': this.attributes.read('ww:onClick', util_1.noop) }, wml: { 'id': "button" } }, [this.attributes.read('ww:text'), this.children], view)]); }.bind(this), function else_clause0() { return wml_runtime_1.box([wml_runtime_1.node('button', { html: { 'type': this.attributes.read('ww:type', 'button'), 'name': this.attributes.read('ww:name', ''), 'class': util_1.combine([Styles.BUTTON, this.attributes.read('ww:variant', ''), this.attributes.read('ww:size', ''), this.attributes.read('ww:style', Styles.DEFAULT), this.attributes.read('ww:class')]), 'onclick': this.attributes.read('ww:onClick', util_1.noop) }, wml: { 'id': "button" } }, [this.attributes.read('ww:text'), this.children], view)]); }.bind(this))], view);
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
            return wml_runtime_1.node('div', { html: { 'class': Styles.DRAWER_LAYOUT }, wml: { 'id': "content" } }, [wml_runtime_1.node('div', { html: { 'class': Styles.DRAWER }, wml: { 'id': "drawer" } }, [wml_runtime_1.node('div', { html: { 'class': Styles.DRAWER_CONTENT } }, [wml_runtime_1.ifE(this.attributes.read('ww:navigation'), function if3() { return wml_runtime_1.box([this.attributes.read('ww:navigation').apply(this, [view,])]); }.bind(this), wml_runtime_1.empty)], view)], view), wml_runtime_1.ifE(this.attributes.has('ww:content'), function if4() { return wml_runtime_1.box([this.attributes.read('ww:content').apply(this, [view,])]); }.bind(this), function else_clause3() { return wml_runtime_1.box([this.children]); }.bind(this))], view);
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
            return wml_runtime_1.node('section', { html: { 'class': util_1.combine([Styles.GRID_CONTAINER, this.attributes.read('ww:class', '')]) } }, [this.children], view);
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
            return wml_runtime_1.node('div', { html: { 'class': util_1.combine([Styles.GRID_ROW, this.attributes.read('ww:class', '')]) } }, [this.children], view);
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
            return wml_runtime_1.node('div', { html: { 'class': this._getClass() } }, [this.children], view);
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
/* jshint ignore:end */

},{"./action-area/ActionArea":5,"./busy-indicator/BusyIndicator":7,"./button/Button":9,"./drawer-layout/DrawerLayout":11,"./fragment/Fragment":13,"./grid/Grid":14,"./input/Input":17,"./main-view/MainView":19,"./menu-button/MenuButton":21,"./modal/Modal":23,"./panel/Panel":25,"./switch/Switch":27,"./table/Table":29,"./tabs/Tabs":31}],17:[function(require,module,exports){
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
function label(view) {
    return wml_runtime_1.box([wml_runtime_1.node('label', { html: { 'for': this.attributes.read('ww:id'), 'class': Styles.CONTROL_LABEL } }, [this.attributes.read('ww:label')], view)]);
}
exports.label = label;
function message(view) {
    return wml_runtime_1.box([wml_runtime_1.node('span', { html: { 'class': "help-block" }, wml: { 'id': "message" } }, [this.attributes.read('ww:message', '')], view)]);
}
exports.message = message;
var SelectView = (function (_super) {
    __extends(SelectView, _super);
    function SelectView(context) {
        var _this = _super.call(this, context) || this;
        var view = _this;
        _this.template = function () {
            return wml_runtime_1.node('div', { html: { 'class': [Styles.FORM_GROUP, this.attributes.read('ww:variant', '')].join(',') } }, [label.apply(this, [view,]), wml_runtime_1.node('select', { html: { 'id': this.attributes.read('ww:id', ''), 'title': this.attributes.read('ww:title'), 'name': this.attributes.read('ww:name', this.attributes.read('ww:id', '')), 'onchange': this.delegate.onInput.bind(this.delegate), 'value': this.initialValue(), 'disabled': this.attributes.read('ww:disabled', null), 'readonly': this.attributes.read('ww:readonly', null), 'class': Styles.SELECT }, wml: { 'id': "input" } }, [wml_runtime_1.forE(this.attributes.read('ww:options', []), function for1(opt, _, __) { return wml_runtime_1.box([wml_runtime_1.ifE(typeof (opt) === 'string', function if1() { return wml_runtime_1.box([wml_runtime_1.node('option', { html: {} }, [opt], view)]); }.bind(this), function else_clause1() { return wml_runtime_1.box([wml_runtime_1.node('option', { html: { 'value': opt.value } }, [opt.label], view)]); }.bind(this))]); }.bind(this), function otherwise1() { return wml_runtime_1.box([wml_runtime_1.node('p', { html: {} }, [], view)]); }.bind(this))], view), message.apply(this, [view,])], view);
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
            return wml_runtime_1.node('div', { html: { 'class': [Styles.FORM_GROUP, this.attributes.read('ww:variant', '')].join(',') } }, [label.apply(this, [view,]), wml_runtime_1.ifE(this.attributes.read('ww:type', 'text') !== 'textarea', function if2() { return wml_runtime_1.box([wml_runtime_1.node('input', { html: { 'id': this.attributes.read('ww:id', ''), 'title': this.attributes.read('ww:title'), 'name': this.attributes.read('ww:name', this.attributes.read('ww:id', '')), 'type': this.attributes.read('ww:type', 'text'), 'placeholder': this.attributes.read('ww:placeholder'), 'oninput': this.delegate.onInput.bind(this.delegate), 'value': this.initialValue(), 'disabled': this.attributes.read('ww:disabled', null), 'readonly': this.attributes.read('ww:readonly', null), 'class': Styles.INPUT }, wml: { 'id': "input" } }, [], view)]); }.bind(this), function else_clause2() { return wml_runtime_1.box([wml_runtime_1.node('textarea', { html: { 'id': this.attributes.read('ww:id', ''), 'title': this.attributes.read('ww:title'), 'name': this.attributes.read('ww:name', this.attributes.read('ww:id', '')), 'class': Styles.TEXTAREA, 'placeholder': this.attributes.read('ww:placeholder'), 'oninput': this.delegate.onInput.bind(this.delegate), 'disabled': this.attributes.read('ww:disabled', null), 'readonly': this.attributes.read('ww:readonly', null), 'rows': this.attributes.read('wat:rows') }, wml: { 'id': "input" } }, [this.initialValue()], view)]); }.bind(this)), message.apply(this, [view,])], view);
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
            return wml_runtime_1.node('div', { html: { 'class': util_1.combine([Styles.MAIN_VIEW, Styles.DRAWER_PUSHABLE, this.attributes.read('ww:class', '')]) } }, [this.children], view);
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
            return wml_runtime_1.node('button', { html: { 'class': Style.MENU_BUTTON, 'onclick': this.attributes.read('ww:onClick', util_1.noop) } }, [wml_runtime_1.node('span', { html: { 'class': "" } }, [], view), wml_runtime_1.node('span', { html: { 'class': "" } }, [], view), wml_runtime_1.node('span', { html: { 'class': "" } }, [], view)], view);
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
            return wml_runtime_1.node('div', { html: { 'class': Styles.MODAL, 'tabindex': "-1", 'role': "dialog" }, wml: { 'id': "modal" } }, [wml_runtime_1.node('div', { html: { 'class': Styles.MODAL_DIALOG, 'role': "document" } }, [wml_runtime_1.node('div', { html: { 'class': Styles.MODAL_CONTENT }, wml: { 'id': "content" } }, [this.children], view)], view)], view);
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
            return wml_runtime_1.node('div', { html: { 'class': Styles.MODAL_HEADER } }, [wml_runtime_1.node('button', { html: { 'type': "button", 'class': "close", 'aria-label': "Close", 'onclick': this.attributes.read('ww:onClose', util_1.noop) } }, [wml_runtime_1.node('span', { html: { 'aria-hidden': "true" } }, [wml_runtime_1.text("\u00D7")], view)], view), this.children], view);
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
            return wml_runtime_1.node('div', { html: { 'class': Styles.MODAL_BODY } }, [this.children], view);
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
            return wml_runtime_1.node('div', { html: { 'class': Styles.MODAL_FOOTER } }, [this.children], view);
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
            return wml_runtime_1.node('div', { html: { 'class': util_1.combine([Styles.PANEL, this.attributes.read('ww:style', Styles.DEFAULT)]) } }, [this.children], view);
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
            return wml_runtime_1.node('div', { html: { 'class': Styles.PANEL_HEADER } }, [this.children], view);
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
            return wml_runtime_1.node('div', { html: { 'class': Styles.PANEL_BODY } }, [this.children], view);
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
            return wml_runtime_1.node('div', { html: { 'class': Styles.PANEL_FOOTER } }, [this.children], view);
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
            return wml_runtime_1.node('label', { html: { 'class': Styles.SWITCH } }, [wml_runtime_1.node('input', { html: { 'type': "checkbox", 'name': this.attributes.read('ww:name'), 'value': this.attributes.read('ww:value'), 'onchange': this.attributes.read('ww:onChange', util_1.noop) } }, [], view), wml_runtime_1.node('div', { html: { 'class': Styles.SWITCH_SLIDER } }, [], view), this.children], view);
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
    a = new Date(a).getTime();
    b = new Date(b).getTime();
    return a > b ? -1 : a < b ? 1 : 0;
};
exports.stringSort = function (a, b) {
    if (typeof a === 'string')
        a = a.replace(/\s+/, '').toLowerCase();
    if (typeof b === 'string')
        b = b.replace(/\s+/, '').toLowerCase();
    return (a > b) ? -1 : (a < b) ? 1 : 0;
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
    a = parseFloat(a);
    b = parseFloat(b);
    a = (isNaN(a)) ? -Infinity : a;
    b = (isNaN(b)) ? -Infinity : b;
    return (a > b) ? -1 : (a < b) ? 1 : 0;
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
    function CellClickedEvent(value, name, index, object, table) {
        this.value = value;
        this.name = name;
        this.index = index;
        this.object = object;
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
    function Table(a, c) {
        var _this = _super.call(this, a, c) || this;
        _this.sortedOn = '';
        _this.arrow = '';
        _this.view = new table_1.TableView(_this);
        _this.originalData = a.read('ww:data', []);
        _this.data = _this.originalData.slice();
        _this.model = a.read('ww:model', new DefaultTableModel());
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

},{"./wml/table":30,"@quenk/wml-runtime":2,"property-seek":49}],30:[function(require,module,exports){
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
function thead(view, fields) {
    return wml_runtime_1.box([wml_runtime_1.node('tr', { html: {} }, [wml_runtime_1.ifE(this.attributes.read('ww:selectable'), function if5() { return wml_runtime_1.box([wml_runtime_1.node('th', { html: {} }, [wml_runtime_1.node('input', { html: { 'type': "checkbox", 'onclick': function function_literal_1(_) { return this.model.allRowsSelected(); }.bind(this) } }, [], view)], view)]); }.bind(this), wml_runtime_1.empty), wml_runtime_1.forE(fields, function for2(field, _, __) { return wml_runtime_1.box([wml_runtime_1.ifE(!field.hidden, function if6() { return wml_runtime_1.box([wml_runtime_1.ifE(field.sortAs, function if7() { return wml_runtime_1.box([wml_runtime_1.node('th', { html: { 'class': [this.attributes.read('ww:headingClass'), (this.sortedOn === field.name) ? Styles.ACTIVE : ''].join(' '), 'onclick': function function_literal_2(_) { return this.model.headingClicked(new Table_1.HeadingClickedEvent(field.name, field, this)); }.bind(this) } }, [field.heading, wml_runtime_1.ifE(this.sortedOn === field.name, function if8() { return wml_runtime_1.box([this.arrow]); }.bind(this), wml_runtime_1.empty)], view)]); }.bind(this), function else_clause4() { return wml_runtime_1.box([wml_runtime_1.node('th', { html: { 'class': [this.attributes.read('ww:headingClass'), (this.sortedOn === field.name) ? Styles.ACTIVE : ''].join(' '), 'onclick': function function_literal_3(_) { return this.model.headingClicked(new Table_1.HeadingClickedEvent(field.name, field, this)); }.bind(this) } }, [field.heading, wml_runtime_1.ifE(this.sortedOn === field.name, function if9() { return wml_runtime_1.box([this.arrow]); }.bind(this), wml_runtime_1.empty)], view)]); }.bind(this))]); }.bind(this), wml_runtime_1.empty)]); }.bind(this), function otherwise2() { return wml_runtime_1.box([]); }.bind(this))], view)]);
}
exports.thead = thead;
function tbody(view, data, fields) {
    return wml_runtime_1.box([wml_runtime_1.widget(_1.Fragment, { html: {} }, [wml_runtime_1.forE(data, function for3(row, index, __) { return wml_runtime_1.box([wml_runtime_1.node('tr', { html: { 'class': this.attributes.read('ww:rowClass'), 'onclick': function function_literal_4(_) { return this.model.rowClicked(new Table_1.RowClickedEvent(row, index, data, this)); }.bind(this) } }, [wml_runtime_1.ifE(this.attributes.read('ww:selectable'), function if10() { return wml_runtime_1.box([wml_runtime_1.node('td', { html: {} }, [wml_runtime_1.node('input', { html: { 'type': "checkbox", 'onclick': function function_literal_5(_) { return this.model.rowSelected(new Table_1.RowSelectedEvent(row, index, data, this)); }.bind(this) } }, [], view)], view)]); }.bind(this), wml_runtime_1.empty), wml_runtime_1.forE(fields, function for4(field, _, __) { return wml_runtime_1.box([wml_runtime_1.ifE(!field.hidden, function if11() { return wml_runtime_1.box([wml_runtime_1.node('td', { html: { 'class': this.attributes.read('ww:cellClass'), 'onclick': function function_literal_6(_) { return this.model.cellClicked(new Table_1.CellClickedEvent(property_seek_1.get(field.name, row), field.name, index, row, this)); }.bind(this) } }, [wml_runtime_1.ifE(field.fragment, function if12() { return wml_runtime_1.box([field.fragment.apply(this, [view, property_seek_1.get(field.name, row), field.name, row, field])]); }.bind(this), function else_clause5() { return wml_runtime_1.box([property_seek_1.get(field.name, row)]); }.bind(this))], view)]); }.bind(this), wml_runtime_1.empty)]); }.bind(this), function otherwise4() { return wml_runtime_1.box([]); }.bind(this))], view)]); }.bind(this), function otherwise4() { return wml_runtime_1.box([]); }.bind(this))], view)]);
}
exports.tbody = tbody;
var TableView = (function (_super) {
    __extends(TableView, _super);
    function TableView(context) {
        var _this = _super.call(this, context) || this;
        var view = _this;
        _this.template = function () {
            return wml_runtime_1.node('table', { html: { 'class': [Styles.TABLE, this.attributes.read('ww:class', '')].join(' ') } }, [wml_runtime_1.node('thead', { html: {}, wml: { 'id': "head" } }, [thead.apply(this, [view, this.attributes.read('ww:fields')])], view), wml_runtime_1.node('tbody', { html: {}, wml: { 'id': "body" } }, [tbody.apply(this, [view, this.data, this.attributes.read('ww:fields')])], view)], view);
        };
        return _this;
    }
    return TableView;
}(wml_runtime_1.AppView));
exports.TableView = TableView;

},{"../../":16,"../Table":29,"@quenk/wml-runtime":2,"property-seek":49,"wml-widgets-common/Styles":3}],31:[function(require,module,exports){
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
            return wml_runtime_1.node('li', { html: { 'role': "presentation", 'class': (this.attributes.read('ww:active')) ? Styles.ACTIVE : null }, wml: { 'id': "root" } }, [wml_runtime_1.node('a', { html: { 'href': "#", 'onclick': this.clicked.bind(this) }, wml: { 'id': "link" } }, [wml_runtime_1.ifE(this.attributes.read('ww:text'), function if13() { return wml_runtime_1.box([this.attributes.read('ww:text')]); }.bind(this), function else_clause6() { return wml_runtime_1.box([this.children]); }.bind(this))], view)], view);
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
            return wml_runtime_1.node('ul', { html: { 'class': Styles.TABS } }, [this.children], view);
        };
        return _this;
    }
    return TabsView;
}(wml_runtime_1.AppView));
exports.TabsView = TabsView;

},{"@quenk/wml-runtime":2,"wml-widgets-common/Styles":3}],33:[function(require,module,exports){
var kindof = require("kindof")
exports = module.exports = egal
exports.deepEgal = deepEgal

function egal(a, b) {
  if (a === b) return true

  var type
  switch (type = kindofPlain(a)) {
    case "date":
      if (type !== kindof(b)) return false
      return a.valueOf() === b.valueOf()

    case "regexp":
      if (type !== kindof(b)) return false
      return a.toString() === b.toString()

    case "object":
      if (type !== kindofPlain(b)) return false

      var constructor = getConstructorOf(a)
      if (constructor !== getConstructorOf(b)) return false
      if (!hasValueOf(a) || !hasValueOf(b)) return false
      return deepEgal(a.valueOf(), b.valueOf())

    default: return false
  }
}

function maybeEgal(a, b) {
  if (egal(a, b)) return true

  var type = kindofPlain(a)
  switch (type) {
    case "array":
    case "plain": return type === kindofPlain(b) ? null : false
    default: return false
  }
}

function deepEgal(a, b, egal) {
  return deepEgalWith(typeof egal === "function" ? egal : maybeEgal, a, b)
}

function deepEgalWith(egal, a, b, aStack, bStack) {
  var equal = egal(a, b)
  if (equal != null) return Boolean(equal)

  var type = kindof(a)
  switch (type) {
    /* eslint no-fallthrough: 0 */
    case "array":
    case "object": if (type === kindof(b)) break
    default: return false
  }

  var aPos = aStack && aStack.indexOf(a)
  var bPos = bStack && bStack.indexOf(b)
  if (aPos !== bPos) return false
  if (aPos != null && aPos >= 0) return true

  aStack = aStack ? aStack.concat([a]) : [a]
  bStack = bStack ? bStack.concat([b]) : [b]

  var i
  switch (type) {
    case "array":
      if (a.length !== b.length) return false
      if (a.length === 0) return true

      for (i = 0; i < a.length; ++i)
        if (!deepEgalWith(egal, a[i], b[i], aStack, bStack)) return false

      return true

    case "object":
      var aKeys = keys(a)
      var bKeys = keys(b)
      if (aKeys.length !== bKeys.length) return false
      if (aKeys.length === 0) return true

      aKeys.sort()
      bKeys.sort()
      for (i = 0; i < aKeys.length; ++i) if (aKeys[i] !== bKeys[i]) return false

      for (var key in a)
        if (!deepEgalWith(egal, a[key], b[key], aStack, bStack)) return false

      return true
  }
}

function kindofPlain(obj) {
  var type = kindof(obj)
  if (type === "object" && isObjectPlain(obj)) return "plain"
  return type
}

function isObjectPlain(obj) {
  var prototype = Object.getPrototypeOf(obj)
  if (prototype === null) return true
  if (!("constructor" in prototype)) return true
  return prototype.constructor === Object
}

function getConstructorOf(obj) {
  var prototype = Object.getPrototypeOf(obj)
  return prototype === null ? undefined : prototype.constructor
}

function hasValueOf(obj) {
  var valueOf = obj.valueOf
  return typeof valueOf === "function" && valueOf !== Object.prototype.valueOf
}

function keys(obj) {
  var all = []
  for (var key in obj) all.push(key)
  return all
}

},{"kindof":35}],34:[function(require,module,exports){
exports = module.exports = stringify
exports.getSerialize = serializer

function stringify(obj, replacer, spaces, cycleReplacer) {
  return JSON.stringify(obj, serializer(replacer, cycleReplacer), spaces)
}

function serializer(replacer, cycleReplacer) {
  var stack = [], keys = []

  if (cycleReplacer == null) cycleReplacer = function(key, value) {
    if (stack[0] === value) return "[Circular ~]"
    return "[Circular ~." + keys.slice(0, stack.indexOf(value)).join(".") + "]"
  }

  return function(key, value) {
    if (stack.length > 0) {
      var thisPos = stack.indexOf(this)
      ~thisPos ? stack.splice(thisPos + 1) : stack.push(this)
      ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key)
      if (~stack.indexOf(value)) value = cycleReplacer.call(this, key, value)
    }
    else stack.push(value)

    return replacer == null ? value : replacer.call(this, key, value)
  }
}

},{}],35:[function(require,module,exports){
if (typeof module != "undefined") module.exports = kindof

function kindof(obj) {
  var type
  if (obj === undefined) return "undefined"
  if (obj === null) return "null"

  switch (type = typeof obj) {
    case "object":
      switch (Object.prototype.toString.call(obj)) {
        case "[object RegExp]": return "regexp"
        case "[object Date]": return "date"
        case "[object Array]": return "array"
      }

    default: return type
  }
}

},{}],36:[function(require,module,exports){
/**
 * lodash 3.2.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var root = require('lodash._root');

/** Used to compose bitmasks for wrapper metadata. */
var BIND_FLAG = 1,
    BIND_KEY_FLAG = 2,
    CURRY_BOUND_FLAG = 4,
    CURRY_FLAG = 8,
    CURRY_RIGHT_FLAG = 16,
    PARTIAL_FLAG = 32,
    PARTIAL_RIGHT_FLAG = 64,
    ARY_FLAG = 128,
    FLIP_FLAG = 512;

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_SAFE_INTEGER = 9007199254740991,
    MAX_INTEGER = 1.7976931348623157e+308,
    NAN = 0 / 0;

/** Used as the internal argument placeholder. */
var PLACEHOLDER = '__lodash_placeholder__';

/** `Object#toString` result references. */
var funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {...*} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  var length = args.length;
  switch (length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return value > -1 && value % 1 == 0 && value < length;
}

/**
 * Replaces all `placeholder` elements in `array` with an internal placeholder
 * and returns an array of their indexes.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {*} placeholder The placeholder to replace.
 * @returns {Array} Returns the new array of placeholder indexes.
 */
function replaceHolders(array, placeholder) {
  var index = -1,
      length = array.length,
      resIndex = -1,
      result = [];

  while (++index < length) {
    if (array[index] === placeholder) {
      array[index] = PLACEHOLDER;
      result[++resIndex] = index;
    }
  }
  return result;
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} prototype The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate = (function() {
  function object() {}
  return function(prototype) {
    if (isObject(prototype)) {
      object.prototype = prototype;
      var result = new object;
      object.prototype = undefined;
    }
    return result || {};
  };
}());

/**
 * Creates an array that is the composition of partially applied arguments,
 * placeholders, and provided arguments into a single array of arguments.
 *
 * @private
 * @param {Array|Object} args The provided arguments.
 * @param {Array} partials The arguments to prepend to those provided.
 * @param {Array} holders The `partials` placeholder indexes.
 * @returns {Array} Returns the new array of composed arguments.
 */
function composeArgs(args, partials, holders) {
  var holdersLength = holders.length,
      argsIndex = -1,
      argsLength = nativeMax(args.length - holdersLength, 0),
      leftIndex = -1,
      leftLength = partials.length,
      result = Array(leftLength + argsLength);

  while (++leftIndex < leftLength) {
    result[leftIndex] = partials[leftIndex];
  }
  while (++argsIndex < holdersLength) {
    result[holders[argsIndex]] = args[argsIndex];
  }
  while (argsLength--) {
    result[leftIndex++] = args[argsIndex++];
  }
  return result;
}

/**
 * This function is like `composeArgs` except that the arguments composition
 * is tailored for `_.partialRight`.
 *
 * @private
 * @param {Array|Object} args The provided arguments.
 * @param {Array} partials The arguments to append to those provided.
 * @param {Array} holders The `partials` placeholder indexes.
 * @returns {Array} Returns the new array of composed arguments.
 */
function composeArgsRight(args, partials, holders) {
  var holdersIndex = -1,
      holdersLength = holders.length,
      argsIndex = -1,
      argsLength = nativeMax(args.length - holdersLength, 0),
      rightIndex = -1,
      rightLength = partials.length,
      result = Array(argsLength + rightLength);

  while (++argsIndex < argsLength) {
    result[argsIndex] = args[argsIndex];
  }
  var offset = argsIndex;
  while (++rightIndex < rightLength) {
    result[offset + rightIndex] = partials[rightIndex];
  }
  while (++holdersIndex < holdersLength) {
    result[offset + holders[holdersIndex]] = args[argsIndex++];
  }
  return result;
}

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

/**
 * Creates a function that wraps `func` to invoke it with the optional `this`
 * binding of `thisArg`.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask of wrapper flags. See `createWrapper` for more details.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createBaseWrapper(func, bitmask, thisArg) {
  var isBind = bitmask & BIND_FLAG,
      Ctor = createCtorWrapper(func);

  function wrapper() {
    var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
    return fn.apply(isBind ? thisArg : this, arguments);
  }
  return wrapper;
}

/**
 * Creates a function that produces an instance of `Ctor` regardless of
 * whether it was invoked as part of a `new` expression or by `call` or `apply`.
 *
 * @private
 * @param {Function} Ctor The constructor to wrap.
 * @returns {Function} Returns the new wrapped function.
 */
function createCtorWrapper(Ctor) {
  return function() {
    // Use a `switch` statement to work with class constructors.
    // See http://ecma-international.org/ecma-262/6.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
    // for more details.
    var args = arguments;
    switch (args.length) {
      case 0: return new Ctor;
      case 1: return new Ctor(args[0]);
      case 2: return new Ctor(args[0], args[1]);
      case 3: return new Ctor(args[0], args[1], args[2]);
      case 4: return new Ctor(args[0], args[1], args[2], args[3]);
      case 5: return new Ctor(args[0], args[1], args[2], args[3], args[4]);
      case 6: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
      case 7: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
    }
    var thisBinding = baseCreate(Ctor.prototype),
        result = Ctor.apply(thisBinding, args);

    // Mimic the constructor's `return` behavior.
    // See https://es5.github.io/#x13.2.2 for more details.
    return isObject(result) ? result : thisBinding;
  };
}

/**
 * Creates a function that wraps `func` to enable currying.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask of wrapper flags. See `createWrapper` for more details.
 * @param {number} arity The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createCurryWrapper(func, bitmask, arity) {
  var Ctor = createCtorWrapper(func);

  function wrapper() {
    var length = arguments.length,
        index = length,
        args = Array(length),
        fn = (this && this !== root && this instanceof wrapper) ? Ctor : func,
        placeholder = wrapper.placeholder;

    while (index--) {
      args[index] = arguments[index];
    }
    var holders = (length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder)
      ? []
      : replaceHolders(args, placeholder);

    length -= holders.length;
    return length < arity
      ? createRecurryWrapper(func, bitmask, createHybridWrapper, placeholder, undefined, args, holders, undefined, undefined, arity - length)
      : apply(fn, this, args);
  }
  return wrapper;
}

/**
 * Creates a function that wraps `func` to invoke it with optional `this`
 * binding of `thisArg`, partial application, and currying.
 *
 * @private
 * @param {Function|string} func The function or method name to wrap.
 * @param {number} bitmask The bitmask of wrapper flags. See `createWrapper` for more details.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {Array} [partials] The arguments to prepend to those provided to the new function.
 * @param {Array} [holders] The `partials` placeholder indexes.
 * @param {Array} [partialsRight] The arguments to append to those provided to the new function.
 * @param {Array} [holdersRight] The `partialsRight` placeholder indexes.
 * @param {Array} [argPos] The argument positions of the new function.
 * @param {number} [ary] The arity cap of `func`.
 * @param {number} [arity] The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createHybridWrapper(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
  var isAry = bitmask & ARY_FLAG,
      isBind = bitmask & BIND_FLAG,
      isBindKey = bitmask & BIND_KEY_FLAG,
      isCurry = bitmask & CURRY_FLAG,
      isCurryRight = bitmask & CURRY_RIGHT_FLAG,
      isFlip = bitmask & FLIP_FLAG,
      Ctor = isBindKey ? undefined : createCtorWrapper(func);

  function wrapper() {
    var length = arguments.length,
        index = length,
        args = Array(length);

    while (index--) {
      args[index] = arguments[index];
    }
    if (partials) {
      args = composeArgs(args, partials, holders);
    }
    if (partialsRight) {
      args = composeArgsRight(args, partialsRight, holdersRight);
    }
    if (isCurry || isCurryRight) {
      var placeholder = wrapper.placeholder,
          argsHolders = replaceHolders(args, placeholder);

      length -= argsHolders.length;
      if (length < arity) {
        return createRecurryWrapper(func, bitmask, createHybridWrapper, placeholder, thisArg, args, argsHolders, argPos, ary, arity - length);
      }
    }
    var thisBinding = isBind ? thisArg : this,
        fn = isBindKey ? thisBinding[func] : func;

    if (argPos) {
      args = reorder(args, argPos);
    } else if (isFlip && args.length > 1) {
      args.reverse();
    }
    if (isAry && ary < args.length) {
      args.length = ary;
    }
    if (this && this !== root && this instanceof wrapper) {
      fn = Ctor || createCtorWrapper(fn);
    }
    return fn.apply(thisBinding, args);
  }
  return wrapper;
}

/**
 * Creates a function that wraps `func` to invoke it with the optional `this`
 * binding of `thisArg` and the `partials` prepended to those provided to
 * the wrapper.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask of wrapper flags. See `createWrapper` for more details.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} partials The arguments to prepend to those provided to the new function.
 * @returns {Function} Returns the new wrapped function.
 */
function createPartialWrapper(func, bitmask, thisArg, partials) {
  var isBind = bitmask & BIND_FLAG,
      Ctor = createCtorWrapper(func);

  function wrapper() {
    var argsIndex = -1,
        argsLength = arguments.length,
        leftIndex = -1,
        leftLength = partials.length,
        args = Array(leftLength + argsLength),
        fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;

    while (++leftIndex < leftLength) {
      args[leftIndex] = partials[leftIndex];
    }
    while (argsLength--) {
      args[leftIndex++] = arguments[++argsIndex];
    }
    return apply(fn, isBind ? thisArg : this, args);
  }
  return wrapper;
}

/**
 * Creates a function that wraps `func` to continue currying.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask of wrapper flags. See `createWrapper` for more details.
 * @param {Function} wrapFunc The function to create the `func` wrapper.
 * @param {*} placeholder The placeholder to replace.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {Array} [partials] The arguments to prepend to those provided to the new function.
 * @param {Array} [holders] The `partials` placeholder indexes.
 * @param {Array} [argPos] The argument positions of the new function.
 * @param {number} [ary] The arity cap of `func`.
 * @param {number} [arity] The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createRecurryWrapper(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary, arity) {
  var isCurry = bitmask & CURRY_FLAG,
      newArgPos = argPos ? copyArray(argPos) : undefined,
      newsHolders = isCurry ? holders : undefined,
      newHoldersRight = isCurry ? undefined : holders,
      newPartials = isCurry ? partials : undefined,
      newPartialsRight = isCurry ? undefined : partials;

  bitmask |= (isCurry ? PARTIAL_FLAG : PARTIAL_RIGHT_FLAG);
  bitmask &= ~(isCurry ? PARTIAL_RIGHT_FLAG : PARTIAL_FLAG);

  if (!(bitmask & CURRY_BOUND_FLAG)) {
    bitmask &= ~(BIND_FLAG | BIND_KEY_FLAG);
  }
  var result = wrapFunc(func, bitmask, thisArg, newPartials, newsHolders, newPartialsRight, newHoldersRight, newArgPos, ary, arity);

  result.placeholder = placeholder;
  return result;
}

/**
 * Creates a function that either curries or invokes `func` with optional
 * `this` binding and partially applied arguments.
 *
 * @private
 * @param {Function|string} func The function or method name to wrap.
 * @param {number} bitmask The bitmask of wrapper flags.
 *  The bitmask may be composed of the following flags:
 *     1 - `_.bind`
 *     2 - `_.bindKey`
 *     4 - `_.curry` or `_.curryRight` of a bound function
 *     8 - `_.curry`
 *    16 - `_.curryRight`
 *    32 - `_.partial`
 *    64 - `_.partialRight`
 *   128 - `_.rearg`
 *   256 - `_.ary`
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {Array} [partials] The arguments to be partially applied.
 * @param {Array} [holders] The `partials` placeholder indexes.
 * @param {Array} [argPos] The argument positions of the new function.
 * @param {number} [ary] The arity cap of `func`.
 * @param {number} [arity] The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createWrapper(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
  var isBindKey = bitmask & BIND_KEY_FLAG;
  if (!isBindKey && typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var length = partials ? partials.length : 0;
  if (!length) {
    bitmask &= ~(PARTIAL_FLAG | PARTIAL_RIGHT_FLAG);
    partials = holders = undefined;
  }
  ary = ary === undefined ? ary : nativeMax(toInteger(ary), 0);
  arity = arity === undefined ? arity : toInteger(arity);
  length -= holders ? holders.length : 0;

  if (bitmask & PARTIAL_RIGHT_FLAG) {
    var partialsRight = partials,
        holdersRight = holders;

    partials = holders = undefined;
  }
  var newData = [func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity];

  func = newData[0];
  bitmask = newData[1];
  thisArg = newData[2];
  partials = newData[3];
  holders = newData[4];
  arity = newData[9] = newData[9] == null
    ? (isBindKey ? 0 : func.length)
    : nativeMax(newData[9] - length, 0);

  if (!arity && bitmask & (CURRY_FLAG | CURRY_RIGHT_FLAG)) {
    bitmask &= ~(CURRY_FLAG | CURRY_RIGHT_FLAG);
  }
  if (!bitmask || bitmask == BIND_FLAG) {
    var result = createBaseWrapper(func, bitmask, thisArg);
  } else if (bitmask == CURRY_FLAG || bitmask == CURRY_RIGHT_FLAG) {
    result = createCurryWrapper(func, bitmask, arity);
  } else if ((bitmask == PARTIAL_FLAG || bitmask == (BIND_FLAG | PARTIAL_FLAG)) && !holders.length) {
    result = createPartialWrapper(func, bitmask, thisArg, partials);
  } else {
    result = createHybridWrapper.apply(undefined, newData);
  }
  return result;
}

/**
 * Reorder `array` according to the specified indexes where the element at
 * the first index is assigned as the first element, the element at
 * the second index is assigned as the second element, and so on.
 *
 * @private
 * @param {Array} array The array to reorder.
 * @param {Array} indexes The arranged array indexes.
 * @returns {Array} Returns `array`.
 */
function reorder(array, indexes) {
  var arrLength = array.length,
      length = nativeMin(indexes.length, arrLength),
      oldArray = copyArray(array);

  while (length--) {
    var index = indexes[length];
    array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined;
  }
  return array;
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8 which returns 'object' for typed array constructors, and
  // PhantomJS 1.9 which returns 'function' for `NodeList` instances.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Converts `value` to an integer.
 *
 * **Note:** This function is loosely based on [`ToInteger`](http://www.ecma-international.org/ecma-262/6.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3');
 * // => 3
 */
function toInteger(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = (value < 0 ? -1 : 1);
    return sign * MAX_INTEGER;
  }
  var remainder = value % 1;
  return value === value ? (remainder ? value - remainder : value) : 0;
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3);
 * // => 3
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3');
 * // => 3
 */
function toNumber(value) {
  if (isObject(value)) {
    var other = isFunction(value.valueOf) ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = createWrapper;

},{"lodash._root":37}],37:[function(require,module,exports){
(function (global){
/**
 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** Used to determine if values are of the language type `Object`. */
var objectTypes = {
  'function': true,
  'object': true
};

/** Detect free variable `exports`. */
var freeExports = (objectTypes[typeof exports] && exports && !exports.nodeType)
  ? exports
  : undefined;

/** Detect free variable `module`. */
var freeModule = (objectTypes[typeof module] && module && !module.nodeType)
  ? module
  : undefined;

/** Detect free variable `global` from Node.js. */
var freeGlobal = checkGlobal(freeExports && freeModule && typeof global == 'object' && global);

/** Detect free variable `self`. */
var freeSelf = checkGlobal(objectTypes[typeof self] && self);

/** Detect free variable `window`. */
var freeWindow = checkGlobal(objectTypes[typeof window] && window);

/** Detect `this` as the global object. */
var thisGlobal = checkGlobal(objectTypes[typeof this] && this);

/**
 * Used as a reference to the global object.
 *
 * The `this` value is used if it's the global object to avoid Greasemonkey's
 * restricted `window` object, otherwise the `window` object is used.
 */
var root = freeGlobal ||
  ((freeWindow !== (thisGlobal && thisGlobal.window)) && freeWindow) ||
    freeSelf || thisGlobal || Function('return this')();

/**
 * Checks if `value` is a global object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {null|Object} Returns `value` if it's a global object, else `null`.
 */
function checkGlobal(value) {
  return (value && value.Object === Object) ? value : null;
}

module.exports = root;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],38:[function(require,module,exports){
/**
 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var createWrapper = require('lodash._createwrapper');

/** Used to compose bitmasks for wrapper metadata. */
var PARTIAL_FLAG = 32;

/**
 * Creates a function that provides `value` to the wrapper function as its
 * first argument. Any additional arguments provided to the function are
 * appended to those provided to the wrapper function. The wrapper is invoked
 * with the `this` binding of the created function.
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {*} value The value to wrap.
 * @param {Function} wrapper The wrapper function.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var p = _.wrap(_.escape, function(func, text) {
 *   return '<p>' + func(text) + '</p>';
 * });
 *
 * p('fred, barney, & pebbles');
 * // => '<p>fred, barney, &amp; pebbles</p>'
 */
function wrap(value, wrapper) {
  wrapper = wrapper == null ? identity : wrapper;
  return createWrapper(wrapper, PARTIAL_FLAG, undefined, [value], []);
}

/**
 * This method returns the first argument provided to it.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'user': 'fred' };
 *
 * _.identity(object) === object;
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = wrap;

},{"lodash._createwrapper":36}],39:[function(require,module,exports){
var O = require("oolong")
var FIRST_LINE = /^.*$/m
module.exports = AssertionError

/**
 * Error object thrown when an assertion fails.
 *
 * @class AssertionError
 * @constructor
 * @param message
 * @param [options]
 */
function AssertionError(msg, opts) {
  this.message = msg

  /**
   * The asserted object.
   *
   * @property actual
   */
  if (opts && "actual" in opts) this.actual = opts.actual

  /**
   * If the matcher took an argument or asserted against something (like
   * `foo.must.be.true()`), then this is the expected value.
   *
   * @property expected
   */
  if (opts && "expected" in opts) this.expected = opts.expected

  /**
   * Whether it makes sense to compare objects granularly or even show a diff
   * view of the objects involved.  
   *
   * Most matchers (e.g. [`empty`](#Must.prototype.empty) and
   * [`string`](#Must.prototype.string)) are concrete, strict and atomic and
   * don't lend themselves to be compared property by property.  Others however,
   * like [`eql`](#Must.prototype.eql), are more granular and comparing them
   * line by line helps understand how they differ.
   *
   * @property diffable
   */
  if (opts && "diffable" in opts) this.diffable = opts.diffable

  /**
   * The stack trace starting from the code that called `must`.
   *
   * @property stack
   */
  if (opts && opts.stack != null) Object.defineProperty(this, "stack", {
    value: opts.stack.replace(FIRST_LINE, this),
    configurable: true, writable: true
  })
  else if (Error.captureStackTrace)
    Error.captureStackTrace(this, opts && opts.caller || this.constructor)
}

AssertionError.prototype = Object.create(Error.prototype, {
  constructor: {value: AssertionError, configurable: true, writable: true}
})

AssertionError.prototype.name = "AssertionError"

/**
 * Some test runners (like [Mocha](http://visionmedia.github.io/mocha/)) expect
 * this property instead.
 *
 * @property showDiff
 * @alias diffable
 */
O.defineGetter(AssertionError.prototype, "showDiff", function() {
  return this.diffable
})

},{"oolong":47}],40:[function(require,module,exports){
exports.setPrototypeOf = Object.setPrototypeOf || function(obj, prototype) {
  /* eslint no-proto: 0 */
  obj.__proto__ = prototype
  return obj
}

exports.startsWith = String.prototype.startsWith ?
  Function.call.bind(String.prototype.startsWith) :
  function(haystack, needle) {
  return haystack.lastIndexOf(needle, 0) === 0
}

exports.endsWith = String.prototype.endsWith ?
  Function.call.bind(String.prototype.endsWith) :
  function(haystack, needle) {
  return haystack.indexOf(needle, haystack.length - needle.length) >= 0
}

},{}],41:[function(require,module,exports){
var kindof = require("kindof")
var jsonify = require("json-stringify-safe")
var setPrototypeOf = require("./es6").setPrototypeOf
var INDENT = null

exports.chain = function(self, fn) {
  if (typeof fn != "function") throw new TypeError("Not a function: " + fn)

  // Don't set toString as it seems to break "source-map-support". This is
  // a function with an Object prototype, after all.
  return Object.defineProperties(setPrototypeOf(fn.bind(self), self), {
    bind: {value: Function.prototype.apply, configurable: true, writable: true},
    call: {value: Function.prototype.apply, configurable: true, writable: true},
    apply: {value: Function.prototype.apply, configurable: true, writable: true}
  })
}

exports.stringify = function stringify(obj) {
  var root = obj

  switch (kindof(obj)) {
    // Allow falling through:
    /* jshint -W086 */
    /* eslint no-fallthrough: 0 */
    case "null": return "null"
    case "undefined": return "undefined"
    case "number": return obj.toString()
    case "string": return JSON.stringify(obj)
    case "symbol": return obj.toString()
    case "regexp": return obj.toString()
    case "date": return obj.toISOString()
    case "function": return obj.toString()

    case "object":
      obj = clone(obj)
      if (root instanceof Error) obj.message = root.message
      // Fall through.

    default: return jsonify(obj, stringifyValue, INDENT)
  }
}

function clone(obj) {
  var clone = {}, value
  for (var key in obj) clone[key] = (value = obj[key]) === obj ? clone : value
  return clone
}

function stringifyValue(key, value) {
  switch (kindof(value)) {
    case "undefined": return "[Undefined]"
    case "number": return isNaN(value) ? "[NaN]" : value
    case "symbol": return value.toString()
    case "regexp": return value.toString()
    default: return value
  }
}

},{"./es6":40,"json-stringify-safe":34,"kindof":35}],42:[function(require,module,exports){
var AssertionError = require("./assertion_error")
var Thenable = require("./thenable")
var then = Thenable.prototype.then

module.exports = function(must) {
  return Thenable(must, promisify)
}

function promisify(fn) {
  return function matcher() {
    var must = Object.create(this)
    if (Error.captureStackTrace) Error.captureStackTrace(must, matcher)
    return this.actual.then(raise, then.bind(must, fn, arguments))
  }
}

function raise() { throw new AssertionError("Resolved") }

},{"./assertion_error":39,"./thenable":44}],43:[function(require,module,exports){
var Thenable = require("./thenable")

module.exports = function(must) {
  return Thenable(must, promisify)
}

function promisify(fn) {
  return function matcher() {
    var must = Object.create(this)
    if (Error.captureStackTrace) Error.captureStackTrace(must, matcher)
    return this.actual.then(Thenable.prototype.then.bind(must, fn, arguments))
  }
}

},{"./thenable":44}],44:[function(require,module,exports){
var wrap = require("lodash.wrap")
var lookupGetter = require("oolong").lookupGetter

exports = module.exports = function(must, promisify) {
  must = Object.create(must)

  for (var name in must)
    if (hasFunction(must, name)) must[name] = promisify(must[name])

  Object.defineProperty(must, "assert", {
    value: wrap(must.assert, exports.prototype.assert),
    configurable: true, writable: true
  })

  return must
}

exports.prototype.assert = function assert(orig, ok, msg, opts) {
  opts = opts ? Object.create(opts) : {}
  if ("stack" in this) opts.stack = this.stack
  orig.call(this, ok, msg, opts)
}

exports.prototype.then = function(fn, args, actual) {
  this.actual = actual
  fn.apply(this, args)
}

function hasFunction(obj, name) {
  return !lookupGetter(obj, name) && typeof obj[name] == "function"
}

},{"lodash.wrap":38,"oolong":47}],45:[function(require,module,exports){
var O = require("oolong")
var AssertionError = require("./lib/assertion_error")
var Resolvable = require("./lib/resolvable")
var Rejectable = require("./lib/rejectable")
var kindof = require("kindof")
var egal = require("egal")
var deepEgal = egal.deepEgal
var stringify = require("./lib").stringify
var chain = require("./lib").chain
var defineGetter = O.defineGetter
var lookupGetter = O.lookupGetter
var startsWith = require("./lib/es6").startsWith
var endsWith = require("./lib/es6").endsWith
var hasOwn = Function.call.bind(Object.hasOwnProperty)
var ANY = {}
exports = module.exports = Must
exports.AssertionError = AssertionError
exports.stringify = stringify
exports.chain = chain

/**
 * The main class that wraps the asserted object and that you call matchers on.
 *
 * To include a custom error message for failure cases, pass a string as the
 * second argument.
 *
 * Most of the time you'll be using
 * [`Object.prototype.must`](#Object.prototype.must) to create this wrapper, but
 * occasionally you might want to assert `null`s or `undefined`s and in those
 * cases assigning `Must` to something like `expect` or `demand` works nicely.
 *
 * @example
 * true.must.be.true()
 * [].must.be.empty()
 *
 * var expect = require("must")
 * expect(null).to.be.null()
 *
 * var demand = require("must")
 * demand(undefined, "The undefined undefineds").be.undefined()
 *
 * @class Must
 * @constructor
 * @param actual
 * @param [message]
 */
function Must(actual, message) {
  if (!(this instanceof Must)) return new Must(actual, message)
  this.actual = actual
  if (message != null) this.message = message
}

/**
  * Can also be used a pass-through property for a fluent chain.
  *
  * @example
  * "Hello".must.be.a.string()
  * new Date().must.be.a(Date)
  *
  * @method a
  * @alias instanceof
  */
defineGetter(Must.prototype, "a", function() {
  return chain(this, this.instanceof)
})

/**
  * Can also be used a pass-through property for a fluent chain.
  *
  * @example
  * [1, 2].must.be.an.array()
  * new AwesomeClass().must.be.an(AwesomeClass)
  *
  * @method an
  * @alias instanceof
  */
defineGetter(Must.prototype, "an", lookupGetter(Must.prototype, "a"))

/**
  * Pass-through property for a fluent chain.
  *
  * @example
  * (42).must.be.at.most(69)
  * (1337).must.be.at.least(1337)
  *
  * @property at
  * @on prototype
  */
defineGetter(Must.prototype, "at", passthrough)

/**
  * Can also be used as a pass-through property for a fluent chain.
  *
  * @example
  * true.must.be.true()
  * (42).must.be(42)
  *
  * @method be
  * @alias equal
  */
defineGetter(Must.prototype, "be", function() {
  return chain(this, this.equal)
})

/**
  * Pass-through property for a fluent chain.
  *
  * @example
  * [1, 2].must.have.length(2)
  *
  * @property have
  * @on prototype
  */
defineGetter(Must.prototype, "have", passthrough)

/**
  * Inverse the assertion.  
  * Use it multiple times to create lots of fun!
  * `true.must.not.not.be.true()` :-)
  *
  * @example
  * true.must.not.be.true()
  * [].must.not.be.empty()
  *
  * @property not
  * @on prototype
  */
defineGetter(Must.prototype, "not", function() {
  // NOTE: Dear reader or plugin author, please don't depend on this property
  // name will remain as-is. If you really need to, let me know how you'd like
  // to use it. XO.
  var self = Object.create(this)
  self.negative = !self.negative
  return self
})

/**
  * Pass-through property for a fluent chain.
  *
  * @example
  * var expect = require("must")
  * expect(true).to.be.true()
  *
  * var wish = require("must")
  * wish(life).to.be.truthy()
  *
  * @property to
  * @on prototype
  */
defineGetter(Must.prototype, "to", passthrough)

/**
 * Assert object is `true`.  
 * A boxed boolean object (`new Boolean(true`) is _not_ considered true.
 *
 * @example
 * true.must.be.true()
 *
 * @method true
 */
Must.prototype.true = function() {
  this.assert(this.actual === true, "be", {expected: true})
}

/**
 * Assert object is `false`.  
 * A boxed boolean object (`new Boolean(false`) is _not_ considered false.
 *
 * @example
 * false.must.be.false()
 * @method false
 *
 */
Must.prototype.false = function() {
  this.assert(this.actual === false, "be", {expected: false})
}

/**
 * Assert object is `NaN`.
 *
 * @example
 * NaN.must.be.nan()
 *
 * @method nan
 */
Must.prototype.nan = function() {
  this.assert(this.actual !== this.actual, "be", {expected: NaN})
}

/**
 * Assert object is `null`.
 *
 * Because JavaScript does not allow method calls on `null`, you'll have to
 * wrap an expected null with [`Must`](#Must). Assigning `require("must")` to
 * `expect` or `demand` works well.
 *
 * If you want to assert that an object's property is `null`, see
 * [`property`](#Must.prototype.property).
 *
 * @example
 * var demand = require("must")
 * demand(null).be.null()
 *
 * @method null
 */
Must.prototype.null = function() {
  this.assert(this.actual === null, "be", {expected: null})
}

/**
 * Assert object is `undefined`.
 *
 * Because JavaScript does not allow method calls on `undefined`, you'll have to
 * wrap an expected undefined with [`Must`](#Must). Assigning `require("must")`
 * to `expect` or `demand` works well.
 *
 * If you want to assert that an object's property is `undefined`, see
 * [`property`](#Must.prototype.property).
 *
 * @example
 * var demand = require("must")
 * demand(undefined).be.undefined()
 *
 * @method undefined
 */
Must.prototype.undefined = function() {
  this.assert(this.actual === undefined, "be", {expected: undefined})
}

/**
 * Assert object is a boolean (`true` or `false`).  
 * Boxed boolean objects (`new Boolean`) are _not_ considered booleans.
 *
 * @example
 * true.must.be.a.boolean()
 *
 * @method boolean
 */
Must.prototype.boolean = function() {
  this.assert(typeof this.actual == "boolean", "be a boolean")
}

/**
 * Assert object is a number.  
 * Boxed number objects (`new Number`) are _not_ considered numbers.
 *
 * @example
 * (42).must.be.a.number()
 *
 * @method number
 */
Must.prototype.number = function() {
  this.assert(typeof this.actual == "number", "be a number")
}

/**
 * Assert object is a string.  
 * Boxed string objects (`new String`) are _not_ considered strings.
 *
 * @example
 * "Hello".must.be.a.string()
 *
 * @method string
 */
Must.prototype.string = function() {
  this.assert(typeof this.actual == "string", "be a string")
}

/**
 * Assert object is a symbol.
 *
 * @example
 * Symbol().must.be.a.symbol()
 *
 * @method symbol
 */
Must.prototype.symbol = function() {
  this.assert(typeof this.actual == "symbol", "be a symbol")
}

/**
 * Assert object is a date.
 *
 * @example
 * new Date().must.be.a.date()
 *
 * @method date
 */
Must.prototype.date = function() {
  this.assert(kindof(this.actual) == "date", "be a date")
}

/**
 * Assert object is a regular expression.
 *
 * @example
 * /[a-z]/.must.be.a.regexp()
 *
 * @method regexp
 */
Must.prototype.regexp = function() {
  this.assert(kindof(this.actual) == "regexp", "be a regular expression")
}

/**
 * Assert object is an array.
 *
 * @example
 * [42, 69].must.be.an.array()
 *
 * @method array
 */
Must.prototype.array = function() {
  this.assert(Array.isArray(this.actual), "be an array")
}

/**
 * Assert object is a function.
 *
 * @example
 * (function() {}).must.be.a.function()
 *
 * @method function
 */
Must.prototype.function = function() {
  this.assert(typeof this.actual == "function", "be a function")
}

/**
 * Assert object is an.. object.
 *
 * @example
 * ({}).must.be.an.object()
 *
 * @method object
 */
Must.prototype.object = function() {
  var ok = this.actual && typeof this.actual == "object"
  this.assert(ok, "be an object")
}

/**
 * Assert object is truthy (`!!obj`).
 *
 * Only `null`, `undefined`, `0`, `false` and `""` are falsy in JavaScript.
 * Everything else is truthy.
 *
 * @example
 * (42).must.be.truthy()
 * "Hello".must.be.truthy()
 *
 * @method truthy
 */
Must.prototype.truthy = function() {
  this.assert(this.actual, "be truthy")
}

/**
 * Assert object is falsy (`!obj`).
 *
 * Only `null`, `undefined`, `0`, `false` and `""` are falsy in JavaScript.
 * Everything else is truthy.
 *
 * @example
 * 0.must.be.falsy()
 * "".must.be.falsy()
 *
 * @method falsy
 */
Must.prototype.falsy = function() {
  this.assert(!this.actual, "be falsy")
}

/**
 * Assert object is exists and thereby is not null or undefined.
 *
 * @example
 * 0.must.exist()
 * "".must.exist()
 * ({}).must.exist()
 *
 * @method exist
 */
Must.prototype.exist = function() {
  this.assert(this.actual != null, "exist")
}

/**
 * Assert that an object is an instance of something.  
 * Uses `obj instanceof expected`.
 *
 * @example
 * new Date().must.be.an.instanceof(Date)
 *
 * @method instanceof
 * @param class
 */
Must.prototype.instanceof = function(expected) {
  var ok = this.actual instanceof expected
  this.assert(ok, instanceofMessage.bind(this, expected), {expected: expected})
}

function instanceofMessage(expected) {
  var type = expected.displayName || expected.name || stringify(expected)
  return "be an instance of " + type
}

/**
 * @method instanceOf
 * @alias instanceof
 */
Must.prototype.instanceOf = Must.prototype.instanceof

/**
 * Assert that an object is empty.  
 * Checks either the `length` for arrays and strings or the count of
 * enumerable keys. Inherited keys also counted.
 *
 * @example
 * "".must.be.empty()
 * [].must.be.empty()
 * ({}).must.be.empty()
 *
 * @method empty
 */
Must.prototype.empty = function() {
  var ok = false
  if (typeof this.actual === "string" || Array.isArray(this.actual))
    ok = this.actual.length === 0
  else if (typeof this.actual == "object" || typeof this.actual == "function")
    ok = O.isEmpty(this.actual)

  this.assert(ok, "be empty")
}

/**
 * Assert a string ends with the given string.
 *
 * @example
 * "Hello, John".must.endWith("John")
 *
 * @method endWith
 * @param expected
 */
Must.prototype.endWith = function(expected) {
  this.assert(endsWith(this.actual, expected), "end with", {expected: expected})
}

/**
 * Assert object strict equality or identity (`===`).
 *
 * To compare value objects (like `Date` or `RegExp`) by their value rather
 * than identity, use [`eql`](#Must.prototype.eql).  
 * To compare arrays and objects by content, also use
 * [`eql`](#Must.prototype.eql).
 *
 * @example
 * (42).must.equal(42)
 *
 * var date = new Date
 * date.must.equal(date)
 *
 * @method equal
 * @param expected
 */
Must.prototype.equal = function(expected) {
  this.assert(this.actual === expected, "equal", {expected: expected})
}

/**
 * Assert that an object is an error (instance of `Error` by default).  
 * Optionally assert it matches `expected` (and/or is of instance
 * `constructor`).  
 * When you have a function that's supposed to throw, use
 * [`throw`](#Must.prototype.throw).
 *
 * Given `expected`, the error is asserted as follows:
 * - A **string** is compared with the exception's `message` property.
 * - A **regular expression** is matched against the exception's `message`
 *   property.
 * - A **function** (a.k.a. constructor) is used to check if the error
 *   is an `instanceof` that constructor.
 * - All other cases of `expected` are left unspecified for now.
 *
 * @example
 * var err = throw new RangeError("Everything's amazing and nobody's happy") }
 * err.must.be.an.error()
 * err.must.be.an.error("Everything's amazing and nobody's happy")
 * err.must.be.an.error(/amazing/)
 * err.must.be.an.error(Error)
 * err.must.be.an.error(RangeError)
 * err.must.be.an.error(RangeError, "Everything's amazing and nobody's happy")
 * err.must.be.an.error(RangeError, /amazing/)
 *
 * @method error
 * @param [constructor]
 * @param [expected]
 */
Must.prototype.error = function(type, expected) {
  if (arguments.length <= 1) expected = ANY
  if (arguments.length == 1 && !isFn(type)) { expected = type; type = null }

  var ok = isError(this.actual, type || Error, expected)
  var msg = expected !== ANY ? "be an error matching" : "be an error"
  var opts = expected !== ANY ? {expected: expected} : null
  this.assert(ok, msg, opts)
}

/**
  * Can also be used as a pass-through property for a fluent chain.
  *
  * @example
  * var claim = require("must")
  * claim(true).is.true()
  * claim(42).is(42)
  *
  * @method is
  * @alias equal
  */
defineGetter(Must.prototype, "is", lookupGetter(Must.prototype, "be"))

/**
 * Assert object equality by content and if possible, recursively.  
 * Also handles circular and self-referential objects.
 *
 * For most parts it asserts strict equality (`===`), but:
 * - `RegExp` objects are compared by their pattern and flags.
 * - `Date` objects are compared by their value.
 * - `Array` objects are compared recursively.
 * - `NaN`s are considered equivalent.
 * - Instances of the same class with a `valueOf` function are compared by its
 *   output.
 * - Plain objects and instances of the same class are compared recursively.
 *
 * **Does not coerce types** so **mismatching types fail**.  
 * Inherited enumerable properties are also taken into account.
 *
 * **Instances** are objects whose prototype's `constructor` property is set.
 * E.g. `new MyClass`.  
 * Others, like `{}` or `Object.create({})`, are **plain objects**.
 *
 * @example
 * /[a-z]/.must.eql(/[a-z]/)
 * new Date(1987, 5, 18).must.eql(new Date(1987, 5, 18))
 * ["Lisp", 42].must.eql(["Lisp", 42])
 * ({life: 42, love: 69}).must.eql({life: 42, love: 69})
 * NaN.must.eql(NaN)
 *
 * function Answer(answer) { this.answer = answer }
 * new Answer(42).must.eql(new Answer(42))
 *
 * @method eql
 * @param expected
 */
Must.prototype.eql = function(expected) {
  var ok = deepEgal(this.actual, expected, eql)
  this.assert(ok, "be equivalent to", {expected: expected, diffable: true})
}

/**
 * Assert object includes `expected`.
 *
 * For strings it checks the text, for arrays it checks elements and for
 * objects the property values. Everything is checked with strict equals
 * (`===`).
 *
 * @example
 * "Hello, John!".must.include("John")
 * [1, 42, 3].must.include(42)
 * ({life: 42, love: 69}).must.include(42)
 *
 * @method include
 * @param expected
 */
Must.prototype.include = function(expected) {
  var found
  if (typeof this.actual === "string" || Array.isArray(this.actual))
    found = this.actual.indexOf(expected) >= 0
  else
    for (var key in this.actual)
      if (this.actual[key] === expected) { found = true; break }

  this.assert(found, "include", {expected: expected})
}

/**
 * @method contain
 * @alias include
 */
Must.prototype.contain = Must.prototype.include

/**
 * Assert that an array is a permutation of the given array.
 *
 * An array is a permutation of another if they both have the same elements
 * (including the same number of duplicates) regardless of their order.
 * Elements are checked with strict equals (`===`).
 *
 * @example
 * [1, 1, 2, 3].must.be.a.permutationOf([3, 2, 1, 1])
 * [7, 8, 8, 9].must.not.be.a.permutationOf([9, 8, 7])
 *
 * @method permutationOf
 * @param expected
 */
Must.prototype.permutationOf = function(expected) {
  var ok = isPermutationOf(this.actual, expected)
  this.assert(ok, "be a permutation of", {expected: expected, diffable: true})
}

function isPermutationOf(actual, expected) {
  if (!Array.isArray(actual) || !Array.isArray(expected)) return false
  if (actual.length !== expected.length) return false

  actual = actual.slice().sort()
  expected = expected.slice().sort()
  for (var i = 0; i < actual.length; i++) {
    if (actual[i] !== expected[i]) return false
  }

  return true
}

/**
 * Assert object matches the given regular expression.
 *
 * If you pass in a non regular expression object, it'll be converted to one
 * via `new RegExp(regexp)`.
 *
 * @example
 * "Hello, John!".must.match(/john/i)
 * "Wei wu wei".must.match("wu")
 *
 * @method match
 * @param regexp
 */
Must.prototype.match = function(expected) {
  var regexp = expected instanceof RegExp ? expected : new RegExp(expected)
  this.assert(regexp.exec(this.actual), "match", {expected: regexp})
}

/**
  * Pass-through property for a fluent chain.
  *
  * @example
  * (42).must.must.must.must.equal(42)
  *
  * @property must
  * @on prototype
  */
defineGetter(Must.prototype, "must", passthrough)

/**
  * Pass-through property for a fluent chain.
  *
  * @example
  * (42).must.be.the.number()
  *
  * @property the
  * @on prototype
  */
defineGetter(Must.prototype, "the", passthrough)

/**
 * Assert that a function throws.  
 * Optionally assert it throws `expected` (and/or is of instance
 * `constructor`).  
 * When you already have an error reference, use
 * [`error`](#Must.prototype.error).
 *
 * Given `expected`, the error is asserted as follows:
 * - A **string** is compared with the exception's `message` property.
 * - A **regular expression** is matched against the exception's `message`
 *   property.
 * - A **function** (a.k.a. constructor) is used to check if the error
 *   is an `instanceof` that constructor.
 * - All other cases of `expected` are left unspecified for now.
 *
 * Because of how JavaScript works, the function will be called in `null`
 * context (`this`). If you want to test an instance method, bind it:
 * `obj.method.bind(obj).must.throw()`.
 *
 * @example
 * function omg() {
 *   throw new RangeError("Everything's amazing and nobody's happy")
 * }
 *
 * omg.must.throw()
 * omg.must.throw("Everything's amazing and nobody's happy")
 * omg.must.throw(/amazing/)
 * omg.must.throw(Error)
 * omg.must.throw(RangeError)
 * omg.must.throw(RangeError, "Everything's amazing and nobody's happy")
 * omg.must.throw(RangeError, /amazing/)
 *
 * @method throw
 * @param [constructor]
 * @param [expected]
 */
Must.prototype.throw = function(type, expected) {
  if (arguments.length <= 1) expected = ANY
  if (arguments.length == 1 && !isFn(type)) { expected = type; type = null }

  var ok = false, exception
  try { this.actual.call(null) } catch (ex) { ok = true; exception = ex }
  ok = ok && isError(exception, type, expected)

  var opts = {actual: exception}
  if (expected !== ANY) opts.expected = expected
  this.assert(ok, "throw", opts)
}

/**
 * Assert that an object has a length property equal to `expected`.
 *
 * @example
 * "Something or other".must.have.length(18)
 * [1, 2, 3, "Four o'clock rock"].must.have.length(4)
 *
 * @method length
 * @param expected
 */
Must.prototype.length = function(expected) {
  var ok = this.actual.length == expected
  this.assert(ok, "have length of", {expected: expected})
}

/**
 * Assert that an object is frozen with `Object.isFrozen`.
 *
 * @example
 * Object.freeze({}).must.be.frozen()
 *
 * @method frozen
 */
Must.prototype.frozen = function() {
  this.assert(Object.isFrozen(this.actual), "be frozen")
}

/**
 * Assert that an object has all of the properties given in `properties` with
 * equal (`===`) values.  In other words, asserts that the given object is
 * a subset of the one asserted against.
 *
 * Takes **inherited properties** into account. To not do so, see
 * [`ownProperties`](#Must.prototype.ownProperties).
 *
 * @example
 * var john = {name: "John", age: 42, sex: "male"}
 * john.must.have.properties({name: "John", sex: "male"})
 *
 * @method properties
 * @param properties
 */
Must.prototype.properties = function(props) {
  var obj = this.actual
  var ok = this.actual != null

  if (ok) for (var key in props) {
    ok = key in obj && obj[key] === props[key]
    if (!ok) break
  }

  this.assert(ok, "have properties", {expected: props, diffable: true})
}

/**
 * Assert that an object has all of the properties given in `properties` with
 * equal (`===`) values and that they're own properties.  In other words,
 * asserts that the given object is a subset of the one asserted against.
 *
 * **Does not** take **inherited properties** into account. To do so, see
 * [`properties`](#Must.prototype.properties).
 *
 * @example
 * var john = {name: "John", age: 42, sex: "male"}
 * john.must.have.ownProperties({name: "John", sex: "male"})
 *
 * @method ownProperties
 * @param properties
 */
Must.prototype.ownProperties = function(props) {
  var obj = this.actual
  var ok = this.actual != null

  if (ok) for (var key in props) {
    ok = key in obj && hasOwn(obj, key) && obj[key] === props[key]
    if (!ok) break
  }

  this.assert(ok, "have own properties", {expected: props, diffable: true})
}

/**
 * Assert that an object has property `property`.  
 * Optionally assert it *equals* (`===`) to `value`.
 *
 * Takes **inherited properties** into account. To not do so, see
 * [`ownProperty`](#Must.prototype.ownProperty).
 *
 * @example
 * (function() {}).must.have.property("call")
 * ({life: 42, love: 69}).must.have.property("love", 69)
 *
 * @method property
 * @param property
 * @param [value]
 */
Must.prototype.property = function(property, expected) {
  var ok = this.actual != null && property in Object(this.actual)
  if (ok && arguments.length > 1) ok = this.actual[property] === expected

  var msg = "have property \"" + property + "\"", opts
  if (arguments.length > 1) { msg += " equal to"; opts = {expected: expected} }
  this.assert(ok, msg, opts)
}

/**
 * Assert that an object has own property `property`.  
 * Optionally assert it *equals* (`===`) to `value`.
 *
 * **Does not** take **inherited properties** into account. To do so, see
 * [`property`](#Must.prototype.property).
 *
 * @example
 * ({life: 42, love: 69}).must.have.ownProperty("love", 69)
 *
 * @method ownProperty
 * @param property
 * @param [value]
 */
Must.prototype.ownProperty = function(property, expected) {
  var ok = this.actual != null
  ok = ok && hasOwn(this.actual, property)
  if (ok && arguments.length > 1) ok = this.actual[property] === expected

  var msg = "have own property \"" + property + "\"", opts
  if (arguments.length > 1) { msg += " equal to"; opts = {expected: expected} }
  this.assert(ok, msg, opts)
}

/**
 * @method own
 * @alias ownProperty
 */
Must.prototype.own = Must.prototype.ownProperty

/**
 * Assert that an object has only the expected enumerable `keys`.  
 * Pass an array of strings as `keys`.
 *
 * Takes **inherited properties** into account. To not do so, see
 * [`ownKeys`](#Must.prototype.ownKeys).
 *
 * @example
 * ({life: 42, love: 69}).must.have.keys(["life", "love"])
 * Object.create({life: 42}).must.have.keys(["life"])
 *
 * @method keys
 * @param keys
 */
Must.prototype.keys = function(expected) {
  var ok = this.actual != null
  ok = ok && isPermutationOf(O.keys(Object(this.actual)), expected)
  this.assert(ok, "have keys", {expected: expected})
}

/**
 * Assert that an object has only the expected enumerable `keys` of its own.  
 * Pass an array of strings as `keys`.
 *
 * **Does not** take **inherited properties** into account. To do so, see
 * [`keys`](#Must.prototype.keys).
 *
 * @example
 * ({life: 42, love: 69}).must.have.ownKeys(["life", "love"])
 *
 * @method ownKeys
 * @param keys
 */
Must.prototype.ownKeys = function(expected) {
  var ok = this.actual != null
  ok = ok && isPermutationOf(Object.keys(Object(this.actual)), expected)
  this.assert(ok, "have own keys", {expected: expected})
}

/**
 * Assert that an object has an enumerable property `property`.  
 * It will fail if the object lacks the property entirely.
 *
 * This also checks inherited properties in the prototype chain, something which
 * `Object.prototype.propertyIsEnumerable` itself does not do.
 *
 * For checking if a property exists *and* is non-enumerable, see
 * [`nonenumerable`](#Must.prototype.nonenumerable).
 *
 * @example
 * ({life: 42, love: 69}).must.have.enumerable("love")
 *
 * @method enumerable
 * @param property
 */
Must.prototype.enumerable = function(property) {
  var ok = this.actual != null
  ok = ok && isEnumerable(Object(this.actual), property)
  this.assert(ok, "have enumerable property \"" + property + "\"")
}

/**
 * @method enumerableProperty
 * @alias enumerable
 */
Must.prototype.enumerableProperty = Must.prototype.enumerable

/**
 * Assert that an object has a non-enumerable property `property`.  
 * It will fail if the object lacks the property entirely.
 *
 * This also checks inherited properties in the prototype chain, something which
 * `Object.prototype.propertyIsEnumerable` itself does not do.
 *
 * It's the inverse of [`enumerable`](#Must.prototype.enumerable).
 *
 * @example
 * (function() {}).must.have.nonenumerable("call")
 * Object.create({}, {love: {enumerable: 0}}).must.have.nonenumerable("love")
 *
 * @method nonenumerable
 * @param property
 */
Must.prototype.nonenumerable = function(property) {
  var ok = this.actual != null
  ok = ok && property in Object(this.actual)
  ok = ok && !isEnumerable(Object(this.actual), property)
  this.assert(ok, "have nonenumerable property \"" + property + "\"")
}

function isEnumerable(obj, name) {
  // Using propertyIsEnumerable saves a possible looping of all keys.
  if (Object.prototype.propertyIsEnumerable.call(obj, name)) return true
  for (var key in obj) if (key == name) return true
  return false
}

/**
 * @method nonenumerableProperty
 * @alias nonenumerable
 */
Must.prototype.nonenumerableProperty = Must.prototype.nonenumerable

/**
 * Assert that an object is below and less than (`<`) `expected`.  
 * Uses `<` for comparison, so it'll also work with value objects (those
 * implementing [`valueOf`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf)) like `Date`.
 *
 * @example
 * (42).must.be.below(69)
 *
 * @method below
 * @param expected
 */
Must.prototype.below = function(expected) {
  this.assert(this.actual < expected, "be below", {expected: expected})
}

/**
 * @method lt
 * @alias below
 */
Must.prototype.lt = Must.prototype.below

/**
 * Works well with dates where saying *before* is more natural than *below* or
 * *less than*.
 *
 * To assert that a date is equivalent to another date, use
 * [`eql`](#Must.prototype.eql). For regular numbers,
 * [`equal`](#Must.prototype.equal) is fine.
 *
 * @example
 * (42).must.be.before(1337)
 * new Date(2000, 5, 18).must.be.before(new Date(2001, 0, 1))
 *
 * @method before
 * @alias below
 */
Must.prototype.before = Must.prototype.below

/**
 * Assert that an object is at most, less than or equal to (`<=`), `expected`.  
 * Uses `<=` for comparison, so it'll also work with value objects (those
 * implementing [`valueOf`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf)) like `Date`.
 *
 * @example
 * (42).must.be.at.most(69)
 * (42).must.be.at.most(42)
 *
 * @method most
 * @param expected
 */
Must.prototype.most = function(expected) {
  this.assert(this.actual <= expected, "be at most", {expected: expected})
}

/**
 * @method lte
 * @alias most
 */
Must.prototype.lte = Must.prototype.most

/**
 * Assert that an object is above and greater than (`>`) `expected`.  
 * Uses `>` for comparison, so it'll also work with value objects (those
 * implementing [`valueOf`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf)) like `Date`.
 *
 * @example
 * (69).must.be.above(42)
 *
 * @method above
 * @param expected
 */
Must.prototype.above = function(expected) {
  this.assert(this.actual > expected, "be above", {expected: expected})
}

/**
 * @method gt
 * @alias above
 */
Must.prototype.gt = Must.prototype.above

/**
 * Works well with dates where saying *after* is more natural than *above* or
 * *greater than*.
 *
 * To assert that a date is equivalent to another date, use
 * [`eql`](#Must.prototype.eql). For regular numbers,
 * [`equal`](#Must.prototype.equal) is fine.
 *
 * @example
 * (1337).must.be.after(42)
 * new Date(2030, 5, 18).must.be.after(new Date(2013, 9, 23))
 *
 * @method after
 * @alias above
 */
Must.prototype.after = Must.prototype.above

/**
 * Assert that an object is at least, greater than or equal to (`>=`),
 * `expected`.  
 * Uses `>=` for comparison, so it'll also work with value objects (those
 * implementing [`valueOf`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf)) like `Date`.
 *
 * @example
 * (69).must.be.at.least(42)
 * (42).must.be.at.least(42)
 *
 * @method least
 * @param expected
 */
Must.prototype.least = function(expected) {
  this.assert(this.actual >= expected, "be at least", {expected: expected})
}

/**
 * @method gte
 * @alias least
 */
Must.prototype.gte = Must.prototype.least

/**
 * Assert that an object is between `begin` and `end` (inclusive).  
 * Uses `<` for comparison, so it'll also work with value objects (those
 * implementing [`valueOf`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf)) like `Date`.
 *
 * @example
 * (13).must.be.between(13, 69)
 * (42).must.be.between(13, 69)
 * (69).must.be.between(13, 69)
 *
 * @method between
 * @param begin
 * @param end
 */
Must.prototype.between = function(begin, end) {
  this.assert(begin <= this.actual && this.actual <= end, function() {
    return "be between " + stringify(begin) + " and " + stringify(end)
  })
}
/**
 * Makes any matcher following the use of `resolve` wait till a promise
 * resolves before asserting.  
 * Returns a new promise that will either resolve if the assertion passed or
 * fail with `AssertionError`.
 *
 * Promises are transparent to matchers, so everything will also work with
 * customer matchers you've added to `Must.prototype`. Internally Must just
 * waits on the promise and calls the matcher function once it's resolved.
 *
 * With [Mocha](http://mochajs.org), using this will look something like:
 *
 * ```javascript
 * it("must pass", function() {
 *   return Promise.resolve(42).must.resolve.to.equal(42)
 * })
 * ```
 *
 * Using [CoMocha](https://github.com/blakeembrey/co-mocha), it'll look like:
 * ```javascript
 * it("must pass", function*() {
 *   yield Promise.resolve(42).must.resolve.to.equal(42)
 *   yield Promise.resolve([1, 2, 3]).must.resolve.to.not.include(42)
 * })
 * ```
 *
 * @example
 * Promise.resolve(42).must.resolve.to.equal(42)
 * Promise.resolve([1, 2, 3]).must.resolve.to.not.include(42)
 *
 * @property resolve
 * @on prototype
 */
defineGetter(Must.prototype, "resolve", function() {
  return Resolvable(this)
})

/**
 * @example
 * Promise.resolve(42).must.then.equal(42)
 *
 * @property then
 * @on prototype
 * @alias resolve
 */
defineGetter(Must.prototype, "then", lookupGetter(Must.prototype, "resolve"))

/**
 * @example
 * Promise.resolve(42).must.eventually.equal(42)
 *
 * @property eventually
 * @on prototype
 * @alias resolve
 */
defineGetter(Must.prototype, "eventually",
             lookupGetter(Must.prototype, "resolve"))

/**
 * Makes any matcher following the use of `reject` wait till a promise
 * is rejected before asserting.  
 * Returns a new promise that will either resolve if the assertion passed or
 * fail with `AssertionError`.
 *
 * Promises are transparent to matchers, so everything will also work with
 * customer matchers you've added to `Must.prototype`. Internally Must just
 * waits on the promise and calls the matcher function once it's rejected.
 *
 * With [Mocha](http://mochajs.org), using this will look something like:
 *
 * ```javascript
 * it("must pass", function() {
 *   return Promise.reject(42).must.reject.to.equal(42)
 * })
 * ```
 *
 * Using [CoMocha](https://github.com/blakeembrey/co-mocha), it'll look like:
 * ```javascript
 * it("must pass", function*() {
 *   yield Promise.reject(42).must.reject.to.equal(42)
 *   yield Promise.reject([1, 2, 3]).must.reject.to.not.include(42)
 * })
 * ```
 *
 * @example
 * Promise.reject(42).must.reject.to.equal(42)
 * Promise.reject([1, 2, 3]).must.reject.to.not.include(42)
 *
 * @property reject
 * @on prototype
 */
defineGetter(Must.prototype, "reject", function() {
  return Rejectable(this)
})

/**
 * Assert a string starts with the given string.
 *
 * @example
 * "Hello, John".must.startWith("Hello")
 *
 * @method startWith
 * @param expected
 */
Must.prototype.startWith = function(expected) {
  var ok = startsWith(this.actual, expected)
  this.assert(ok, "start with", {expected: expected})
}

/**
  * Pass-through property for a fluent chain.
  *
  * @example
  * Promise.resolve(42).must.resolve.with.number()
  *
  * @property with
  * @on prototype
  */
defineGetter(Must.prototype, "with", passthrough)

Must.prototype.assert = function assert(ok, message, opts) {
  if (!this.negative ? ok : !ok) return

  opts = opts ? Object.create(opts) : {}
  if (!("actual" in opts)) opts.actual = this.actual

  if (!("caller" in opts)) {
    // Accessing caller in strict mode throws TypeError.
    try { opts.caller = assert.caller }
    catch (ex) { opts.caller = assert }
  }

  var msg = stringify(this.actual) + " must " + (this.negative ? "not " : "")
  if (typeof message == "function") msg += message.call(this)
  else msg += message + ("expected" in opts ? " "+stringify(opts.expected) : "")
  if (this.message != null) msg = this.message + ": " + msg

  throw new AssertionError(msg, opts)
}

Object.defineProperty(Must.prototype, "assert", {enumerable: false})

function eql(a, b) {
  if (egal(a, b)) return true

  var type = kindofPlain(a)
  if (type !== kindofPlain(b)) return false
  if (isNumber(a) && isNumber(b) && isNaN(+a) && isNaN(+b)) return true

  switch (type) {
    case "array":
    case "plain":
      return null

    case "object":
      if (getConstructorOf(a) !== getConstructorOf(b)) return false
      if (hasValueOf(a) && hasValueOf(b)) return false
      return null

    default: return false
  }
}

function getConstructorOf(obj) {
  var prototype = Object.getPrototypeOf(obj)
  return prototype === null ? undefined : prototype.constructor
}

function hasValueOf(obj) {
  var valueOf = obj.valueOf
  return typeof valueOf === "function" && valueOf !== Object.prototype.valueOf
}

function kindofPlain(obj) {
  var type = kindof(obj)
  if (type === "object" && O.isPlainObject(obj)) return "plain"
  return type
}

function isError(err, constructor, expected) {
  if (constructor != null && !(err instanceof constructor)) return false
  if (expected === ANY) return true

  switch (kindof(expected)) {
    case "string": return messageFromError(err) === expected
    case "regexp": return expected.exec(messageFromError(err))
    default: return err === expected
  }
}

function messageFromError(err) {
  // The message in new Error(message) gets converted to a string.
  return err == null || typeof err == "string" ? err : err.message
}

function isFn(fn) { return typeof fn === "function" }
function isNumber(n) { return typeof n === "number" || n instanceof Number }
function passthrough() { return this }

},{"./lib":41,"./lib/assertion_error":39,"./lib/es6":40,"./lib/rejectable":42,"./lib/resolvable":43,"egal":33,"kindof":35,"oolong":47}],46:[function(require,module,exports){
var Must = module.exports = require("./must")
/* eslint no-extend-native: 0 */

/**
 * Creates an instance of [`Must`](#Must) with the current object for asserting
 * and calling matchers on.
 *
 * This property is non-enumerable just like built-in properties, so
 * it'll never interfere with any regular usage of objects.
 *
 * Please note that JavaScript does not allow method calls on `null` or
 * `undefined`, so you'll sometimes have to call [`Must`](#Must) on them by
 * hand.  Assigning `require("must")` to `expect` or `demand` works well with
 * those cases.
 *
 * @example
 * true.must.be.true()
 * [].must.be.empty()
 *
 * @property must
 * @for Object
 * @on prototype
 */
Object.defineProperty(Object.prototype, "must", {
  get: function() { "use strict"; return new Must(this) },

  set: function(value) {
    Object.defineProperty(this, "must", {
      value: value,
      configurable: true,
      enumrable: true,
      writable: true
    })
  },

  // Without configurable, can't redefine it when reloading this file, e.g.
  configurable: true
})

},{"./must":45}],47:[function(require,module,exports){
var hasOwn = Function.call.bind(Object.hasOwnProperty)
var isEnumerable = Function.call.bind(Object.propertyIsEnumerable)
var getPropertyDescriptor = require("./lib/es6").getPropertyDescriptor
var lookupGetter = Object.prototype.__lookupGetter__
var lookupSetter = Object.prototype.__lookupSetter__
var isArray = Array.isArray
var SET_PROTO_OF_NULL = "Oolong.setPrototypeOf called on null or undefined"

/**
 * @class Oolong
 */

/**
 * Assigns all enumerable properties on `source` objects to `target`.  
 * Similar to `Object.assign`, but takes inherited properties into account.
 * Does not modify anything in the source objects.  
 * Returns `target`.
 *
 * Think of it as _extending_ the first object step by step with others.
 *
 * @example
 * Oolong.assign({name: "John"}, {age: 32}, {shirt: "blue"})
 * // => {name: "John", age: 32, shirt: "blue"}
 *
 * @static
 * @method assign
 * @param target
 * @param source...
 */
exports.assign = function assign(target) {
  if (target != null) for (var i = 1; i < arguments.length; ++i) {
    var source = arguments[i]
    for (var key in source) target[key] = source[key]
  }

  return target
}

/**
 * Assigns all own enumerable properties on `source` objects to `target`.  
 * Like `Object.assign`. Does not modify anything in the source objects.  
 * Returns `target`.
 *
 * Think of it as _extending_ the first object step by step with others.
 *
 * @example
 * Oolong.assignOwn({name: "John"}, {age: 32}, Object.create({shirt: "blue"}))
 * // => {name: "John", age: 32}
 *
 * @static
 * @method assignOwn
 * @param target
 * @param source...
 */
exports.assignOwn = function assignOwn(target) {
  if (target != null) for (var i = 1; i < arguments.length; ++i) {
    var source = arguments[i]
    for (var key in source) if (hasOwn(source, key)) target[key] = source[key]
  }

  return target
}

/**
 * Creates a shallow clone of the given object, taking all enumerable
 * properties into account.  
 * Shallow means if you've got nested objects, those will be shared.
 *
 * @example
 * Oolong.clone({name: "John", age: 32})
 * // => {name: "John", age: 32}
 *
 * @static
 * @method clone
 * @param object
 */
exports.clone = function clone(obj) {
  return obj == null ? obj : exports.assign({}, obj)
}

/**
 * Creates a deep clone of the given object, taking all enumerable properties
 * into account.
 *
 * @example
 * Oolong.cloneDeep({name: "John", attributes: {age: 42}})
 * // => {name: "John", attributes: {age: 42}}
 *
 * @static
 * @method cloneDeep
 * @param object
 */
exports.cloneDeep = function cloneDeep(obj) {
  return obj == null ? obj : exports.merge({}, obj)
}

/**
 * Creates and returns an object inheriting from `prototype` and, optionally,
 * assigns enumerable properties from `source` objects to the new object.  
 * Uses `Object.create` and [`Oolong.assign`](#Oolong.assign)
 * internally.  
 * Does not modify the given `prototype` nor source objects.
 *
 * @example
 * var PERSON = {name: "Unknown", age: 0}
 * Oolong.create(PERSON, {name: "John"}, {shirt: "blue"})
 * // => {name: "John", age: 0, shirt: "blue"}
 *
 * @static
 * @method create
 * @param prototype
 * @param [source...]
 */
exports.create = function create(obj) {
  obj = arguments[0] = Object.create(obj)
  return arguments.length == 1 ? obj : exports.assign.apply(this, arguments)
}

/**
 * Assigns all enumerable properties on `source` objects to `target` that the
 * `target` already _doesn't_ have. Uses `key in obj` to check for existence.  
 * Does not modify anything in the source objects.  
 * Returns `target`.
 *
 * Note that because **inherited properties** on `target` are checked, any
 * property that exists on `Object.prototype` (e.g. `toString`, `valueOf`)
 * will be skipped. Usually that's not a problem, but if you want to use
 * `Oolong.defaults` for hashmaps/dictionaries with unknown keys, ensure
 * `target` inherits from `null` instead (use `Object.create(null)`).
 *
 * @example
 * var PERSON = {name: "Unknown", age: 0, shirt: "blue"}
 * Oolong.defaults({name: "John", age: 42}, PERSON)
 * // => {name: "John", age: 42, shirt: "blue"}
 *
 * @static
 * @method defaults
 * @param target
 * @param source...
 */
exports.defaults = function defaults(target) {
  if (target != null) for (var i = 1; i < arguments.length; ++i) {
    var source = arguments[i]
    for (var key in source) if (!(key in target)) target[key] = source[key]
  }

  return target
}

/**
 * Defines a getter on an object.  
 * Similar to [`Object.prototype.__defineGetter__`][__defineGetter__], but
 * works in a standards compliant way.  
 * Returns `object`.
 *
 * The property is by default made *configurable* and *enumerable*. Should the
 * property exist before, it's enumerability will be left as is.
 *
 * [__defineGetter__]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/__defineGetter__
 *
 * @example
 * var person = {birthyear: 1987}
 *
 * Oolong.defineGetter(person, "age", function() {
 *   return new Date().getFullYear() - this.birthyear
 * })
 *
 * person.age // => 28 as of today in 2015.
 *
 * @static
 * @method defineGetter
 * @param object
 * @param property
 * @param fn
 */
exports.defineGetter = function defineGetter(obj, name, fn) {
  return Object.defineProperty(obj, name, {
    get: fn,
    configurable: true,
    enumerable: !hasOwn(obj, name) || isEnumerable(obj, name)
  })
}

/**
 * Defines a setter on an object.  
 * Similar to [`Object.prototype.__defineSetter__`][__defineSetter__], but
 * works in a standards compliant way.  
 * Returns `object`.
 *
 * The property is by default made *configurable* and *enumerable*. Should the
 * property exist before, it's enumerability will be left as is.
 *
 * [__defineSetter__]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/__defineSetter__
 *
 * @example
 * var person = {}
 *
 * Oolong.defineSetter(person, "age", function(age) {
 *   this.birthyear = new Date().getFullYear() - age
 * })
 *
 * person.age = 28
 * person.birthyear // => 1987 as of today in 2015.
 *
 * @static
 * @method defineSetter
 * @param object
 * @param property
 * @param fn
 */
exports.defineSetter = function defineSetter(obj, name, fn) {
  return Object.defineProperty(obj, name, {
    set: fn,
    configurable: true,
    enumerable: !hasOwn(obj, name) || isEnumerable(obj, name)
  })
}

/**
 * Calls the given function for all enumerable properties.  
 * Returns the given object.
 *
 * The function will be called with arguments `value`, `key` and `object` and
 * bound to `thisArg`.
 *
 * @example
 * var obj = {name: "John", age: 42}
 * Oolong.each(obj, function(val, key) { console.log(key + "=" + val) })
 *
 * @static
 * @method each
 * @param object
 * @param callback
 * @param [thisArg]
 */
exports.each = function each(obj, fn, context) {
  for (var key in obj) fn.call(context, obj[key], key, obj)
  return obj
}

/**
 * Calls the given function for all _own_ enumerable properties.  
 * Returns the given object.
 *
 * The function will be called with arguments `value`, `key` and `object` and
 * bound to `thisArg`.
 *
 * @example
 * var obj = {name: "John", age: 42}
 * Oolong.eachOwn(obj, function(val, key) { console.log(key + "=" + val) })
 *
 * @static
 * @method eachOwn
 * @param object
 * @param callback
 * @param [thisArg]
 */
exports.eachOwn = function eachOwn(obj, fn, context) {
  for (var key in obj)
    if (hasOwn(obj, key)) fn.call(context, obj[key], key, obj)

  return obj
}

/**
 * Filters all enumerable properties and returns a new object with only those
 * properties for which the given function returned truthy for.
 *
 * The function will be called with arguments `value`, `key` and `object` and
 * bound to `thisArg`.
 *
 * @example
 * var obj = {a: 1, b: 2, c: 3, d: 4}
 * Oolong.filter(obj, function(value, key) { return value % 2 == 0 })
 * // => {b: 2, d: 4}
 *
 * @static
 * @method filter
 * @param object
 * @param callback
 * @param [thisArg]
 */
exports.filter = function filter(obj, fn, context) {
  var filtered = {}

  for (var key in obj) {
    var value = obj[key]
    if (fn.call(context, value, key, obj)) filtered[key] = value
  }

  return filtered
}

/**
 * @static
 * @method forEach
 * @alias each
 */
exports.forEach = exports.each

/**
 * @static
 * @method forEachOwn
 * @alias eachOwn
 */
exports.forEachOwn = exports.eachOwn

/**
 * Checks whether the given object has the given property, inherited or not.  
 * Given a set, but `undefined` property will still return `true`.
 *
 * @example
 * Oolong.has({name: "John"}) // => true
 * Oolong.has(Object.create({name: "John"}), "name") // => true
 * Oolong.has({}, "name") // => false
 *
 * @static
 * @method has
 * @param object
 * @param key
 */
exports.has = function has(obj, key) {
  return key in obj
}

/**
 * Checks whether the given object has the given property as an own property.  
 * Given a set, but `undefined` property will still return `true`.
 *
 * @example
 * Oolong.hasOwn({name: "John"}) // => true
 * Oolong.hasOwn(Object.create({name: "John"}), "name") // => false
 * Oolong.hasOwn({}, "name") // => false
 *
 * @static
 * @method hasOwn
 * @param object
 * @param key
 */
exports.hasOwn = hasOwn

/**
 * Checks whether the given object has any enumerable properties, inherited
 * or not.
 *
 * @example
 * Oolong.isEmpty({name: "John"}) // => false
 * Oolong.isEmpty(Object.create({name: "John"})) // => false
 * Oolong.isEmpty({}) // => true
 *
 * @static
 * @method isEmpty
 * @param object
 */
exports.isEmpty = function isEmpty(obj) {
  for (obj in obj) return false
  return true
}

/**
 * @static
 * @method isIn
 * @alias has
 */
exports.isIn = exports.has

/**
 * @static
 * @method isInOwn
 * @alias hasOwn
 */
exports.isInOwn = exports.hasOwn

/**
 * Checks whether the given object is of type object and is not null.
 *
 * @example
 * Oolong.isObject({name: "John"}) // => true
 * Oolong.isObject(new Date) // => true
 * Oolong.isObject(42) // => false
 * Oolong.isObject(null) // => false
 *
 * @static
 * @method isObject
 * @param object
 */
exports.isObject = function isObject(obj) {
  return obj != null && typeof obj == "object"
}

/**
 * Checks whether the given object has any _own_ enumerable properties.
 *
 * @example
 * Oolong.isOwnEmpty({name: "John"}) // => false
 * Oolong.isOwnEmpty(Object.create({name: "John"})) // => true
 * Oolong.isOwnEmpty({}) // => true
 *
 * @static
 * @method isOwnEmpty
 * @param object
 */
exports.isOwnEmpty = function isOwnEmpty(obj) {
  for (var key in obj) if (hasOwn(obj, key)) return false
  return true
}

/**
 * Checks whether the given object is one constructed by `Object` or inheriting
 * from `null`.
 *
 * A non-plain object has a `constructor` property set to anything but `Object`.
 * That's the case when you do, for example, `new MyModel`, `new Date`.
 *
 * `Array.prototype` is not considered a plain object just like an array isn't
 * a plain object. JavaScript is a prototypical language and the prototype of
 * an array should be considered an array.
 *
 * @example
 * Oolong.isPlainObject({name: "John", age: 42}) // => true
 * Oolong.isPlainObject(Object.create(null)) // => true
 * Oolong.isPlainObject(Math) // => true
 * Oolong.isPlainObject([]) // => false
 * Oolong.isPlainObject(Array.prototype) // => false
 * Oolong.isPlainObject(new Date) // => false
 * Oolong.isPlainObject("John") // => false
 *
 * @static
 * @method isPlainObject
 * @param object
 */
exports.isPlainObject = function isPlainObject(obj) {
  if (obj == null) return false
  if (typeof obj != "object") return false
  if (isArray(obj)) return false

  var prototype = Object.getPrototypeOf(obj)
  if (prototype === null) return true
  if (!("constructor" in prototype)) return true
  return prototype.constructor === Object
}

/**
 * Returns all enumerable keys of an object as an array.
 * Similar to `Object.keys`, but takes inherited properties into account.
 *
 * @example
 * Oolong.keys({name: "John", age: 32}) // => ["name", "age"]
 *
 * @static
 * @method keys
 * @param object
 */
exports.keys = function keys(obj) {
  var keys = []
  for (var key in obj) keys.push(key)
  return keys
}

/**
 * Looks up and returns a getter on an object.  
 * Similar to [`Object.prototype.__lookupGetter__`][__lookupGetter__], but
 * works in a standards compliant way.  
 * Takes inherited getters into account, just like `__lookupGetter__`.  
 *
 * [__lookupGetter__]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/__lookupGetter__
 *
 * @example
 * var person = {birthyear: 1987}
 *
 * Oolong.defineGetter(person, "age", function() {
 *   return new Date().getFullYear() - this.birthyear
 * })
 *
 * Oolong.lookupGetter(person, "age") // Returns the function above.
 *
 * @static
 * @method lookupGetter
 * @param object
 * @param property
 */
exports.lookupGetter = lookupGetter ? Function.call.bind(lookupGetter) :
  function lookupSetter(obj, name) {
  var desc = getPropertyDescriptor(obj, name)
  return desc && desc.get
}

/**
 * Looks up and returns a setter on an object.  
 * Similar to [`Object.prototype.__lookupSetter__`][__lookupSetter__], but
 * works in a standards compliant way.  
 * Takes inherited setters into account, just like `__lookupSetter__`.  
 *
 * [__lookupSetter__]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/__lookupSetter__
 *
 * @example
 * var person = {birthyear: 1987}
 *
 * Oolong.defineSetter(person, "age", function(age) {
 *   this.birthyear = new Date().getFullYear() - age
 * })
 *
 * Oolong.lookupSetter(person, "age") // Returns the function above.
 *
 * @static
 * @method lookupSetter
 * @param object
 * @param property
 */
exports.lookupSetter = lookupSetter ? Function.call.bind(lookupSetter) :
  function lookupSetter(obj, name) {
  var desc = getPropertyDescriptor(obj, name)
  return desc && desc.set
}

/**
 * Maps all enumerable property values and returns a new object.
 *
 * The function will be called with arguments `value`, `key` and `object` and
 * bound to `thisArg`.
 *
 * @example
 * var obj = {a: 1, b: 2, c: 3}
 * Oolong.map(obj, function(value, key) { return value * 2 })
 * // => {a: 2, b: 4, c: 6}
 *
 * @static
 * @method map
 * @param object
 * @param callback
 * @param [thisArg]
 */
exports.map = function map(obj, fn, context) {
  var mapped = {}
  for (var key in obj) mapped[key] = fn.call(context, obj[key], key, obj)
  return mapped
}

/**
 * Transforms all enumerable keys and returns a new object.
 *
 * The function will be called with arguments `key`, `value` and `object` and
 * bound to `thisArg`.
 *
 * @example
 * var person = {name: "John", age: 32}
 * Oolong.mapKeys(person, function(key) { return key.toUpperCase() })
 * // => {NAME: "John", AGE: 32}
 *
 * @static
 * @method mapKeys
 * @param object
 * @param callback
 * @param [thisArg]
 */
exports.mapKeys = function mapKeys(obj, fn, context) {
	var result = {}

	for (var key in obj) {
    var value = obj[key]
    result[fn.call(context, key, value, obj)] = value
  }

	return result
}

/**
 * Assigns all enumerable properties on `source` objects to `target`
 * recursively.  
 * Only plain objects a merged. Refer to
 * [`Oolong.isPlainObject`](#Oolong.isPlainObject) for the definition of
 * a plain object. Does not modify anything in the source objects.
 *
 * Think of it as _extending_ the first object step by step with others.
 *
 * @example
 * var person = {name: "John", attributes: {age: 42}}
 * Oolong.merge(person, {attributes: {height: 190}})
 * person // => {name: "John", attributes: {age: 42, height: 190}}
 *
 * @static
 * @method merge
 * @param target
 * @param source...
 */
exports.merge = function merge(target) {
  if (target != null) for (var i = 1; i < arguments.length; ++i) {
    var source = arguments[i]

    for (var key in source) {
      var a = target[key]
      var b = source[key]
      var aIsObject = exports.isPlainObject(a)
      var bIsObject = exports.isPlainObject(b)

      if (aIsObject && bIsObject) merge(a, b)
      else if (bIsObject) target[key] = merge({}, b)
      else target[key] = b
    }
  }

  return target
}

/**
 * Returns a new object with keys taken from the array `keys` and values
 * from the result of calling the given function with `key`, `index` and
 * `keys`.  
 * It's like the reverse of indexing an array.
 *
 * @example
 * var names = ["Alice", "Bob", "Charlie"]
 * var lengths = Oolong.object(names, function(name) { return name.length })
 * lengths // => {Alice: 5, Bob: 3, Charlie: 7}
 *
 * @static
 * @method object
 * @param keys
 * @param callback
 * @param [thisArg]
 */
exports.object = function object(keys, fn, thisArg) {
  var obj = {}

  for (var i = 0; i < keys.length; ++i) {
    var key = keys[i]
    obj[key] = fn.call(thisArg, key, i, keys)
  }

  return obj
}

/**
 * Returns all enumerable _own_ keys of an object as an array.  
 * Same as `Object.keys`, really.
 *
 * @example
 * var person = Object.create({name: "John"})
 * person.age = 42
 * Oolong.ownKeys(person) // => ["age"]
 *
 * @static
 * @method ownKeys
 * @param object
 */
exports.ownKeys = Object.keys

/**
 * Filters the keys of an object to only those given as `keys...`.  
 * Only keys that exist in `object` are included.
 *
 * @example
 * var person = {name: "Alice", email: "alice@example.com", age: 42}
 * Oolong.pick(person, "name", "age") // => {name: "Alice", age: 42}
 *
 * @static
 * @method pick
 * @param object
 * @param keys...
 *
 */
exports.pick = function pick(obj) {
  var target = {}

  for (var i = 1; i < arguments.length; ++i) {
    var key = arguments[i]
    if (key in obj) target[key] = obj[key]
  }

  return target
}

/**
 * Filters the keys of an object to only those given as `keys...` with support
 * for nested keys in an array (`["a", "b", "c"]`).  
 * Only keys that exist in `object` are included.
 *
 * If you'd like to use some other path syntax, feel free to preprocess your
 * keys before passing them to `pickDeep`. For example, for a period-separated
 * syntax (`a.b.c`), use a helper:
 *
 * ```javascript
 * function path(s) { return s.split(".") }
 * Oolong.pickDeep(person, "name", path("address.country"))
 * ```
 *
 * @example
 * var person = {name: "Alice", address: {country: "UK", street: "Downing"}}
 * var obj = Oolong.pickDeep(person, "name", ["address", "country"])
 * obj // => {name: "Alice", address: {country: "UK"}}
 *
 * @static
 * @method pickDeep
 * @param object
 * @param keys...
 *
 */
exports.pickDeep = function pickDeep(obj) {
  var target = {}

  for (var i = 1; i < arguments.length; ++i) {
    var keys = arrayify(arguments[i]), length = keys.length
    var key, value = obj, t = target, j

    for (j = 0; j < length && (key = keys[j]) in value; ++j) value = value[key]
    if (j !== length) continue
    for (j = 0; j < length - 1; ++j) t = t[keys[j]] || (t[keys[j]] = {})
    t[keys[j]] = value
  }

  return target
}

/**
 * Returns a new object with the same keys, but with values being the value's
 * property `key`.  
 * In other words, it's the same as `Oolong.map(obj, Oolong.property(key))`.
 *
 * @example
 * var people = {
 *   a: {name: "Alice"},
 *   b: {name: "Bob"},
 *   c: {name: "Charlie"}
 * }
 *
 * Oolong.pluck(people, "name") // => {a: "Alice", b: "Bob", c: "Charlie"}
 *
 * @static
 * @method pluck
 * @param object
 * @param key
 */
exports.pluck = function pluck(obj, key) {
  return exports.map(obj, exports.property(key))
}

/**
 * Returns a function that returns the given property of an object.
 *
 * @example
 * var getName = Oolong.property("name")
 * getName({name: "John"}) // => "John
 *
 * @static
 * @method property
 * @param key
 */
exports.property = function property(key) {
  return function(obj) { return obj[key] }
}

/**
 * Rejects all enumerable properties and returns a new object without those
 * properties for which the given function returned truthy for.  
 * Opposite of [`filter`](#Oolong.filter).
 *
 * The function will be called with arguments `value`, `key` and `object` and
 * bound to `thisArg`.
 *
 * @example
 * var obj = {a: 1, b: 2, c: 3, d: 4}
 * Oolong.reject(obj, function(value, key) { return value % 2 == 0 })
 * // => {a: 1, c: 3}
 *
 * @static
 * @method reject
 * @param object
 * @param callback
 * @param [thisArg]
 */
exports.reject = function reject(obj, fn, context) {
  return exports.filter(obj, not(fn), context)
}

/**
 * Set the prototype of the given object to the given prototype.  
 * Pass `null` or another object for the prototype.  
 * Returns `object`.
 *
 * Uses `Object.setPrototypeOf` if it exists. Otherwise uses a polyfill.
 *
 * @example
 * var person = {name: "Unnamed", age: 42}
 * var mike = Oolong.setPrototypeOf({name: "Mike"}, person)
 * mike.name // => "Mike
 * mike.age  // => 42
 *
 * @static
 * @method setPrototypeOf
 * @param object
 * @param prototype
 */
exports.setPrototypeOf = Object.setPrototypeOf ||
  function setPrototypeOf(obj, prototype) {
  /* eslint no-proto: 0 */
  if (obj == null) throw new TypeError(SET_PROTO_OF_NULL)
  if (typeof obj == "object") obj.__proto__ = prototype
  return obj
}

/**
 * Returns all enumerable property values as an array.
 *
 * @example
 * Oolong.values({name: "John", age: 32}) // => ["John", 32]
 *
 * @static
 * @method values
 * @param object
 */
exports.values = function values(obj) {
  var values = []
  for (var key in obj) values.push(obj[key])
  return values
}

/**
 * Wraps a given value in an object under the specified key.  
 * Works also with [ECMAScript 6 Symbol](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Symbol).
 *
 * @example
 * Oolong.wrap("John", "name") // => {name: "John"}
 *
 * @static
 * @method wrap
 * @param value
 * @param key
 */
exports.wrap = function wrap(value, key) {
  var obj = {}
  obj[key] = value
  return obj
}

function not(fn) { return function() { return !fn.apply(this, arguments) }}
function arrayify(value) { return isArray(value) ? value : [value] }

},{"./lib/es6":48}],48:[function(require,module,exports){
exports.getPropertyDescriptor = Object.getPropertyDescriptor ||
  function(obj, name) {
  if (!(name in obj)) return

  var desc
  do { if (desc = Object.getOwnPropertyDescriptor(obj, name)) return desc }
  while (obj = Object.getPrototypeOf(obj))
}

},{}],49:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}],50:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var must = require("must/register");
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
describe('Application', function () {
    before('should render', function () {
        app = Application.main();
        app.run();
    });
    describe('DrawerLayout', function () {
        describe('DrawerLayout#toggleDrawer()', function () {
            it('should hide and show the drawer', function (done) {
                var layout = app.view.findById('layout');
                var drawer = document.getElementsByClassName(Styles.DRAWER)[0];
                must(drawer.clientWidth).not.be(0);
                layout.toggleDrawer();
                setTimeout(function () {
                    must(drawer.clientWidth).be(0);
                    layout.toggleDrawer();
                    setTimeout(function () {
                        must(drawer.clientWidth).not.be(0);
                        done();
                    }, 1000);
                }, 1000);
            });
        });
    });
});

},{"./view":51,"@quenk/wml-widgets/lib/components/table/Table":29,"must/register":46,"wml-widgets-common/Styles":3}],51:[function(require,module,exports){
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
exports.__esModule = true;
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
                    ww: {
                        'onClose': function function_literal_1(_) {
                            return this.dialog.ids.modal.close();
                        }.bind(this)
                    }
                }, [wml_runtime_1.text("\n      Create record\n    ")], view), wml_runtime_1.widget(components_5.ModalBody, {
                    html: {}
                }, [wml_runtime_1.widget(components_6.Input, {
                        html: {},
                        ww: {
                            'id': "name",
                            'label': "Name",
                            'onInput': function function_literal_2(e) {
                                return this.next.name = e.target.value;
                            }.bind(this)
                        }
                    }, [], view), wml_runtime_1.widget(components_6.Input, {
                        html: {},
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
                        ww: {
                            'id': "status",
                            'label': "Status",
                            'options': ['paid', 'overdue', 'history'],
                            'onInput': function function_literal_4(e) {
                                return this.next.status = e.target.value;
                            }.bind(this)
                        }
                    }, [], view), wml_runtime_1.node('span', {
                        html: {}
                    }, [wml_runtime_1.text(" Receive Notifications? ")], view), wml_runtime_1.widget(components_6.Switch, {
                        html: {},
                        ww: {
                            'onChange': function function_literal_5(e) {
                                return (e.target.value) ? this.next.watchers.push(1) : null;
                            }.bind(this)
                        }
                    }, [], view)], view), wml_runtime_1.widget(components_5.ModalFooter, {
                    html: {}
                }, [wml_runtime_1.widget(components_1.Button, {
                        html: {},
                        wml: {
                            'id': "cancelButton"
                        },
                        ww: {
                            'text': "Cancel",
                            'onClick': function function_literal_6(e) {
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
    return wml_runtime_1.box([wml_runtime_1.node('p', {
            html: {}
        }, [wml_runtime_1.text("This is in the drawer")], view)]);
}
exports.navigation = navigation;
function content(view) {
    return wml_runtime_1.box([wml_runtime_1.widget(components_1.ActionArea, {
            html: {},
            wml: {
                'id': "actions"
            }
        }, [wml_runtime_1.widget(components_1.MenuButton, {
                html: {},
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
                html: {}
            }, [wml_runtime_1.widget(components_2.Row, {
                    html: {}
                }, [wml_runtime_1.widget(components_2.Column, {
                        html: {}
                    }, [wml_runtime_1.widget(components_4.Panel, {
                            html: {},
                            ww: {
                                'style': "-info"
                            }
                        }, [wml_runtime_1.widget(components_4.PanelHeader, {
                                html: {}
                            }, [wml_runtime_1.text("Details")], view), wml_runtime_1.widget(components_4.PanelBody, {
                                html: {}
                            }, [wml_runtime_1.text("Records:")], view), wml_runtime_1.widget(components_3.Table, {
                                html: {},
                                ww: {
                                    'fields': this.fields,
                                    'data': this.records,
                                    'model': this.tableModel
                                }
                            }, [], view), wml_runtime_1.widget(components_4.PanelFooter, {
                                html: {}
                            }, [this.records.reduce(function function_literal_7(p, c) {
                                    return p + c.amount;
                                }.bind(this), 0)], view)], view)], view)], view)], view)], view)]);
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
                    'content': function function_literal_8(v) {
                        return content.call(this, v);
                    }.bind(this)
                }
            }, [], view);
        };
        return _this;
    }
    return Main;
}(wml_runtime_1.AppView));
exports.Main = Main;

},{"@quenk/wml-runtime":2,"@quenk/wml-widgets/lib/components":16}]},{},[50])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi93bWwtcnVudGltZS9ub2RlX21vZHVsZXMvcHJvcGVydHktc2Vlay9pbmRleC5qcyIsIi4uL3dtbC1ydW50aW1lL3NyYy9pbmRleC5qcyIsImxpYi9jb21wb25lbnRzL3dtbC13aWRnZXRzLWNvbW1vbi9TdHlsZXMuanMiLCJsaWIvY29tcG9uZW50cy93bWwtd2lkZ2V0cy1jb21tb24vdXRpbC5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvYWN0aW9uLWFyZWEvQWN0aW9uQXJlYS5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvYWN0aW9uLWFyZWEvd21sL2FjdGlvbl9hcmVhLmpzIiwibm9kZV9tb2R1bGVzL0BxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50cy9idXN5LWluZGljYXRvci9CdXN5SW5kaWNhdG9yLmpzIiwibm9kZV9tb2R1bGVzL0BxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50cy9idXN5LWluZGljYXRvci93bWwvYnVzeV9pbmRpY2F0b3IuanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL2J1dHRvbi9CdXR0b24uanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL2J1dHRvbi93bWwvYnV0dG9uLmpzIiwibm9kZV9tb2R1bGVzL0BxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50cy9kcmF3ZXItbGF5b3V0L0RyYXdlckxheW91dC5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvZHJhd2VyLWxheW91dC93bWwvZHJhd2VyLWxheW91dC5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvZnJhZ21lbnQvRnJhZ21lbnQuanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL2dyaWQvR3JpZC5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvZ3JpZC93bWwvZ3JpZC5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL2lucHV0L0lucHV0LmpzIiwibm9kZV9tb2R1bGVzL0BxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50cy9pbnB1dC93bWwvaW5wdXQuanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL21haW4tdmlldy9NYWluVmlldy5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvbWFpbi12aWV3L3dtbC9tYWluLXZpZXcuanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL21lbnUtYnV0dG9uL01lbnVCdXR0b24uanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL21lbnUtYnV0dG9uL3dtbC9tZW51X2J1dHRvbi5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvbW9kYWwvTW9kYWwuanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL21vZGFsL3dtbC9tb2RhbC5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvcGFuZWwvUGFuZWwuanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL3BhbmVsL3dtbC9wYW5lbC5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvc3dpdGNoL1N3aXRjaC5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvc3dpdGNoL3dtbC9zd2l0Y2guanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL3RhYmxlL1RhYmxlLmpzIiwibm9kZV9tb2R1bGVzL0BxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50cy90YWJsZS93bWwvdGFibGUuanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL3RhYnMvVGFicy5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvdGFicy93bWwvdGFicy5qcyIsIm5vZGVfbW9kdWxlcy9lZ2FsL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2pzb24tc3RyaW5naWZ5LXNhZmUvc3RyaW5naWZ5LmpzIiwibm9kZV9tb2R1bGVzL2tpbmRvZi9raW5kb2YuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLl9jcmVhdGV3cmFwcGVyL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5fcm9vdC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gud3JhcC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9tdXN0L2xpYi9hc3NlcnRpb25fZXJyb3IuanMiLCJub2RlX21vZHVsZXMvbXVzdC9saWIvZXM2LmpzIiwibm9kZV9tb2R1bGVzL211c3QvbGliL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL211c3QvbGliL3JlamVjdGFibGUuanMiLCJub2RlX21vZHVsZXMvbXVzdC9saWIvcmVzb2x2YWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9tdXN0L2xpYi90aGVuYWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9tdXN0L211c3QuanMiLCJub2RlX21vZHVsZXMvbXVzdC9yZWdpc3Rlci5qcyIsIm5vZGVfbW9kdWxlcy9vb2xvbmcvaW5kZXguanMiLCJub2RlX21vZHVsZXMvb29sb25nL2xpYi9lczYuanMiLCJ0ZXN0L2FwcC9hcHAuanMiLCJ0ZXN0L2FwcC92aWV3LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdktBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ25xQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDM0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeHdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwMEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5mdW5jdGlvbiBib3VuZGFyeV90b19kb3QodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUuc3BsaXQoJ11bJykuam9pbignLicpLnNwbGl0KCdbJykuam9pbignLicpO1xufVxuZnVuY3Rpb24gc3RyaXBfYnJhY2VzKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlLnNwbGl0KCdbJykuam9pbignLicpLnNwbGl0KCddJykuam9pbignJyk7XG59XG5mdW5jdGlvbiBlc2NhcGVfZG90cyh2YWx1ZSkge1xuICAgIHZhbHVlID0gdmFsdWUuc3BsaXQoJ1xcJycpO1xuICAgIHJldHVybiAodmFsdWUubGVuZ3RoIDwgMykgPyB2YWx1ZS5qb2luKCdcXCcnKSA6IHZhbHVlLm1hcChmdW5jdGlvbiAoc2VnKSB7XG4gICAgICAgIGlmIChzZWcubGVuZ3RoIDwgMylcbiAgICAgICAgICAgIHJldHVybiBzZWc7XG4gICAgICAgIGlmICgoc2VnWzBdID09PSAnLicpIHx8IChzZWdbc2VnLmxlbmd0aCAtIDFdID09PSAnLicpKVxuICAgICAgICAgICAgcmV0dXJuIHNlZztcbiAgICAgICAgcmV0dXJuIHNlZy5zcGxpdCgnLicpLmpvaW4oJyYmJyk7XG4gICAgfSkuam9pbignJyk7XG59XG5mdW5jdGlvbiB1bmVzY2FwZV9kb3RzKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlLnNwbGl0KCcmJicpLmpvaW4oJy4nKTtcbn1cbmZ1bmN0aW9uIHBhcnRpZnkodmFsdWUpIHtcbiAgICBpZiAoIXZhbHVlKVxuICAgICAgICByZXR1cm47XG4gICAgcmV0dXJuIGVzY2FwZV9kb3RzKHN0cmlwX2JyYWNlcyhib3VuZGFyeV90b19kb3QoJycgKyB2YWx1ZSkpKS5zcGxpdCgnLicpO1xufVxuZnVuY3Rpb24gY2xvbmUobykge1xuICAgIGlmICgodHlwZW9mIG8gIT09ICdvYmplY3QnKSB8fCAobyA9PT0gbnVsbCkpXG4gICAgICAgIHJldHVybiBvO1xuICAgIGlmIChBcnJheS5pc0FycmF5KG8pKVxuICAgICAgICByZXR1cm4gby5tYXAoY2xvbmUpO1xuICAgIHJldHVybiAodHlwZW9mIG8uX19DTE9ORV9fID09PSAnZnVuY3Rpb24nKSA/XG4gICAgICAgIG8uX19DTE9ORV9fKGNsb25lKSA6IChvLmNvbnN0cnVjdG9yICE9PSBPYmplY3QpID8gbyA6XG4gICAgICAgIE9iamVjdC5rZXlzKG8pLnJlZHVjZShmdW5jdGlvbiAocHJlLCBrKSB7XG4gICAgICAgICAgICBwcmVba10gPSAodHlwZW9mIG9ba10gPT09ICdvYmplY3QnKSA/IGNsb25lKG9ba10pIDogb1trXTtcbiAgICAgICAgICAgIHJldHVybiBwcmU7XG4gICAgICAgIH0sIHt9KTtcbn1cbjtcbmZ1bmN0aW9uIGdldChwYXRoLCBvKSB7XG4gICAgdmFyIHBhcnRzID0gcGFydGlmeShwYXRoKTtcbiAgICB2YXIgZmlyc3Q7XG4gICAgaWYgKHR5cGVvZiBvICE9PSAnb2JqZWN0JylcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZ2V0KCk6IGV4cGVjdHMgYW4gb2JqZWN0IGdvdCAnICsgdHlwZW9mIG8pO1xuICAgIGlmIChwYXJ0cy5sZW5ndGggPT09IDEpXG4gICAgICAgIHJldHVybiBvW3VuZXNjYXBlX2RvdHMocGFydHNbMF0pXTtcbiAgICBpZiAocGFydHMubGVuZ3RoID09PSAwKVxuICAgICAgICByZXR1cm47XG4gICAgZmlyc3QgPSBvW3BhcnRzLnNoaWZ0KCldO1xuICAgIHJldHVybiAoKHR5cGVvZiBvID09PSAnb2JqZWN0JykgJiYgKG8gIT09IG51bGwpKSA/XG4gICAgICAgIHBhcnRzLnJlZHVjZShmdW5jdGlvbiAodGFyZ2V0LCBwcm9wKSB7XG4gICAgICAgICAgICBpZiAodGFyZ2V0ID09IG51bGwpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICAgICAgICAgIHJldHVybiB0YXJnZXRbdW5lc2NhcGVfZG90cyhwcm9wKV07XG4gICAgICAgIH0sIGZpcnN0KSA6IG51bGw7XG59XG5leHBvcnRzLmdldCA9IGdldDtcbjtcbmZ1bmN0aW9uIHNldChwYXRoLCB2YWx1ZSwgb2JqKSB7XG4gICAgdmFyIHBhcnRzID0gcGFydGlmeShwYXRoKTtcbiAgICBpZiAoKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB8fCAob2JqID09IG51bGwpKSB7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gX3NldChvYmosIHZhbHVlLCBwYXJ0cyk7XG4gICAgfVxufVxuZXhwb3J0cy5zZXQgPSBzZXQ7XG47XG5mdW5jdGlvbiBfc2V0KG9iaiwgdmFsdWUsIHBhcnRzKSB7XG4gICAgdmFyIG87XG4gICAgdmFyIGs7XG4gICAgaWYgKHBhcnRzLmxlbmd0aCA9PT0gMClcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIG8gPSAoKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB8fCAob2JqID09PSBudWxsKSkgPyB7fSA6IGNsb25lKG9iaik7XG4gICAgayA9IHVuZXNjYXBlX2RvdHMocGFydHNbMF0pO1xuICAgIG9ba10gPSBfc2V0KG9ba10sIHZhbHVlLCBwYXJ0cy5zbGljZSgxKSk7XG4gICAgcmV0dXJuIG87XG59XG5mdW5jdGlvbiBkZWZhdWx0XzEoaywgdiwgbykge1xuICAgIGlmIChvID09IG51bGwpXG4gICAgICAgIHJldHVybiBnZXQoaywgdik7XG4gICAgZWxzZVxuICAgICAgICByZXR1cm4gc2V0KGssIHYsIG8pO1xufVxuZXhwb3J0cy5kZWZhdWx0ID0gZGVmYXVsdF8xO1xuO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgcHJvcGVydHlfc2Vla18xID0gcmVxdWlyZShcInByb3BlcnR5LXNlZWtcIik7XG47XG52YXIgQ29tcG9uZW50ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDb21wb25lbnQoYXR0cmlidXRlcywgY2hpbGRyZW4pIHtcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVzID0gYXR0cmlidXRlcztcbiAgICAgICAgdGhpcy5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICAgIH1cbiAgICBDb21wb25lbnQucHJvdG90eXBlLnJlbmRlcmVkID0gZnVuY3Rpb24gKCkgeyB9O1xuICAgIENvbXBvbmVudC5wcm90b3R5cGUucmVtb3ZlZCA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICBDb21wb25lbnQucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMudmlldy5yZW5kZXIoKTsgfTtcbiAgICByZXR1cm4gQ29tcG9uZW50O1xufSgpKTtcbmV4cG9ydHMuQ29tcG9uZW50ID0gQ29tcG9uZW50O1xuO1xuLyoqXG4gKiBBdHRyaWJ1dGVzIHByb3ZpZGVzIGFuIEFQSSBmb3IgcmVhZGluZyB0aGVcbiAqIGF0dHJpYnV0ZXMgc3VwcGxpZWQgdG8gYW4gRWxlbWVudC5cbiAqL1xudmFyIEF0dHJpYnV0ZXMgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEF0dHJpYnV0ZXMoYXR0cnMpIHtcbiAgICAgICAgdGhpcy5hdHRycyA9IGF0dHJzO1xuICAgIH1cbiAgICBBdHRyaWJ1dGVzLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAocGF0aCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWFkKHBhdGgpICE9IG51bGw7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiByZWFkIGEgdmFsdWUgZm9ybSB0aGUgaW50ZXJuYWwgbGlzdC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aFxuICAgICAqIEBwYXJhbSB7Kn0gZGVmYXVsdFZhbHVlIC0gVGhpcyB2YWx1ZSBpcyByZXR1cm5lZCBpZiB0aGUgdmFsdWUgaXMgbm90IHNldC5cbiAgICAgKi9cbiAgICBBdHRyaWJ1dGVzLnByb3RvdHlwZS5yZWFkID0gZnVuY3Rpb24gKHBhdGgsIGRlZmF1bHRWYWx1ZSkge1xuICAgICAgICB2YXIgcmV0ID0gcHJvcGVydHlfc2Vla18xLmRlZmF1bHQocGF0aC5zcGxpdCgnOicpLmpvaW4oJy4nKSwgdGhpcy5hdHRycyk7XG4gICAgICAgIHJldHVybiAocmV0ICE9IG51bGwpID8gcmV0IDogKGRlZmF1bHRWYWx1ZSAhPSBudWxsKSA/IGRlZmF1bHRWYWx1ZSA6ICcnO1xuICAgIH07XG4gICAgcmV0dXJuIEF0dHJpYnV0ZXM7XG59KCkpO1xuZXhwb3J0cy5BdHRyaWJ1dGVzID0gQXR0cmlidXRlcztcbnZhciBhZG9wdCA9IGZ1bmN0aW9uIChjaGlsZCwgZSkge1xuICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIEFycmF5KVxuICAgICAgICByZXR1cm4gY2hpbGQuZm9yRWFjaChmdW5jdGlvbiAoaW5uZXJDaGlsZCkgeyByZXR1cm4gYWRvcHQoaW5uZXJDaGlsZCwgZSk7IH0pO1xuICAgIGlmIChjaGlsZClcbiAgICAgICAgZS5hcHBlbmRDaGlsZCgodHlwZW9mIGNoaWxkID09PSAnb2JqZWN0JykgP1xuICAgICAgICAgICAgY2hpbGQgOiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjaGlsZCA9PSBudWxsID8gJycgOiBjaGlsZCkpO1xufTtcbnZhciBfdGV4dE9yTm9kZSA9IGZ1bmN0aW9uIChjKSB7XG4gICAgaWYgKGMgaW5zdGFuY2VvZiBOb2RlKVxuICAgICAgICByZXR1cm4gYztcbiAgICBpZiAodHlwZW9mIGMgPT09ICdvYmplY3QnKVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHVzZSB0eXBlICdcIiArIHR5cGVvZiBjICsgXCInIGFzIGEgVGV4dCBub2RlIVwiKTtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycgKyAoYyA9PSBudWxsID8gJycgOiBjKSk7XG59O1xuZXhwb3J0cy5ib3ggPSBmdW5jdGlvbiAobGlzdCkge1xuICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgICByZXR1cm4gX3RleHRPck5vZGUobGlzdFswXSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB2YXIgZnJhZ18xID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgICAgICBsaXN0LmZvckVhY2goZnVuY3Rpb24gKGMpIHsgcmV0dXJuIGZyYWdfMS5hcHBlbmRDaGlsZChfdGV4dE9yTm9kZShjKSk7IH0pO1xuICAgICAgICByZXR1cm4gZnJhZ18xO1xuICAgIH1cbn07XG52YXIgX2VtcHR5ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuZXhwb3J0cy5lbXB0eSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9lbXB0eTsgfTtcbi8qKlxuICogdGV4dFxuICovXG5leHBvcnRzLnRleHQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodmFsdWUgPT0gbnVsbCA/ICcnIDogdmFsdWUpO1xufTtcbi8qKlxuICogcmVzb2x2ZSBwcm9wZXJ0eSBhY2Nlc3MgZXhwcmVzc2lvbiB0byBhdm9pZFxuICogdGhvd2luZyBlcnJvcnMgaWYgaXQgZG9lcyBub3QgZXhpc3QuXG4gKi9cbmV4cG9ydHMucmVzb2x2ZSA9IGZ1bmN0aW9uIChoZWFkLCBwYXRoKSB7XG4gICAgaWYgKChoZWFkID09IG51bGwpIHx8IGhlYWQgPT0gJycpXG4gICAgICAgIHJldHVybiAnJztcbiAgICB2YXIgcmV0ID0gcHJvcGVydHlfc2Vla18xLmRlZmF1bHQocGF0aCwgaGVhZCk7XG4gICAgcmV0dXJuIChyZXQgPT0gbnVsbCkgPyAnJyA6IHJldDtcbn07XG4vKipcbiAqIG5vZGUgaXMgY2FsbGVkIHRvIGNyZWF0ZSBhIHJlZ3VsYXIgRE9NIG5vZGVcbiAqIEBwYXJhbSB7c3RyaW5nfSB0YWdcbiAqIEBwYXJhbSB7b2JqZWN0fSBhdHRyaWJ1dGVzXG4gKiBAcGFyYW0ge2FycmF5PHN0cmluZ3xudW1iZXJ8V2lkZ2V0Pn0gY2hpbGRyZW5cbiAqIEBwYXJhbSB7Vmlld30gdmlld1xuICovXG5leHBvcnRzLm5vZGUgPSBmdW5jdGlvbiAodGFnLCBhdHRyaWJ1dGVzLCBjaGlsZHJlbiwgdmlldykge1xuICAgIHZhciBlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xuICAgIGlmICh0eXBlb2YgYXR0cmlidXRlc1snaHRtbCddID09PSAnb2JqZWN0JylcbiAgICAgICAgT2JqZWN0LmtleXMoYXR0cmlidXRlc1snaHRtbCddKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgYXR0cmlidXRlc1snaHRtbCddW2tleV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBlW2tleV0gPSBhdHRyaWJ1dGVzWydodG1sJ11ba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKChhdHRyaWJ1dGVzWydodG1sJ11ba2V5XSAhPSBudWxsKSAmJiAoYXR0cmlidXRlc1snaHRtbCddW2tleV0gIT0gJycpKSB7XG4gICAgICAgICAgICAgICAgZS5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyaWJ1dGVzWydodG1sJ11ba2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIGNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKGMpIHsgcmV0dXJuIGFkb3B0KGMsIGUpOyB9KTtcbiAgICBpZiAoYXR0cmlidXRlc1snd21sJ10pXG4gICAgICAgIGlmIChhdHRyaWJ1dGVzWyd3bWwnXVsnaWQnXSlcbiAgICAgICAgICAgIHZpZXcucmVnaXN0ZXIoYXR0cmlidXRlc1snd21sJ11bJ2lkJ10sIGUpO1xuICAgIHJldHVybiBlO1xufTtcbi8qKlxuICogd2lkZ2V0IGNyZWF0ZXMgYSB3bWwgd2lkZ2V0LlxuICogQHBhcmFtIHtmdW5jdGlvbn0gQ29uc3RydXRvclxuICogQHBhcmFtIHtvYmplY3R9IGF0dHJpYnV0ZXNcbiAqIEBwYXJhbSB7YXJyYXk8c3RyaW5nfG51bWJlcnxXaWRnZXQ+fSBjaGlsZHJlblxuICogQHBhcmFtIHtWaWV3fSB2aWV3XG4gKiBAcmV0dXJuIHtXaWRnZXR9XG4gKi9cbmV4cG9ydHMud2lkZ2V0ID0gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBhdHRyaWJ1dGVzLCBjaGlsZHJlbiwgdmlldykge1xuICAgIHZhciBjaGlsZHMgPSBbXTtcbiAgICB2YXIgdztcbiAgICBjaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChjaGlsZCkgeyByZXR1cm4gKGNoaWxkIGluc3RhbmNlb2YgQXJyYXkpID9cbiAgICAgICAgY2hpbGRzLnB1c2guYXBwbHkoY2hpbGRzLCBjaGlsZCkgOiBjaGlsZHMucHVzaChjaGlsZCk7IH0pO1xuICAgIHcgPSBuZXcgQ29uc3RydWN0b3IobmV3IEF0dHJpYnV0ZXMoYXR0cmlidXRlcyksIGNoaWxkcyk7XG4gICAgaWYgKGF0dHJpYnV0ZXNbJ3dtbCddKVxuICAgICAgICBpZiAoYXR0cmlidXRlc1snd21sJ11bJ2lkJ10pXG4gICAgICAgICAgICB2aWV3LnJlZ2lzdGVyKGF0dHJpYnV0ZXNbJ3dtbCddWydpZCddLCB3KTtcbiAgICB2aWV3LndpZGdldHMucHVzaCh3KTtcbiAgICByZXR1cm4gdy5yZW5kZXIoKTtcbn07XG4vKipcbiAqIGlmRSBwcm92aWRlcyBhbiBpZiB0aGVuIGV4cHJlc3Npb25cbiAqL1xuZXhwb3J0cy5pZkUgPSBmdW5jdGlvbiAocHJlZGljYXRlLCBwb3NpdGl2ZSwgbmVnYXRpdmUpIHtcbiAgICByZXR1cm4gKHByZWRpY2F0ZSkgPyBwb3NpdGl2ZSgpIDogbmVnYXRpdmUoKTtcbn07XG4vKipcbiAqIGZvckUgcHJvdmlkZXMgYSBmb3IgZXhwcmVzc2lvblxuICovXG5leHBvcnRzLmZvckUgPSBmdW5jdGlvbiAoY29sbGVjdGlvbiwgY2IsIGNiMikge1xuICAgIHZhciBmcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgIGlmIChjb2xsZWN0aW9uIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgaWYgKGNvbGxlY3Rpb24ubGVuZ3RoID4gMClcbiAgICAgICAgICAgIGNvbGxlY3Rpb24uZm9yRWFjaChmdW5jdGlvbiAodiwgaywgYSkgeyByZXR1cm4gZnJhZy5hcHBlbmRDaGlsZChjYih2LCBrLCBhKSk7IH0pO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBmcmFnLmFwcGVuZENoaWxkKGNiMigpKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGNvbGxlY3Rpb24gPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHZhciBsID0gT2JqZWN0LmtleXMoY29sbGVjdGlvbik7XG4gICAgICAgIGlmIChsLmxlbmd0aCA+IDApXG4gICAgICAgICAgICBsLmZvckVhY2goZnVuY3Rpb24gKGspIHsgcmV0dXJuIGZyYWcuYXBwZW5kQ2hpbGQoY2IoY29sbGVjdGlvbltrXSwgaywgY29sbGVjdGlvbikpOyB9KTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgZnJhZy5hcHBlbmRDaGlsZChjYjIoKSk7XG4gICAgfVxuICAgIHJldHVybiBmcmFnO1xufTtcbi8qKlxuICogc3dpdGNoRSBzaW11bGF0ZXMgYSBzd2l0Y2ggc3RhdGVtZW50XG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ8Ym9vbGVhbn0gdmFsdWVcbiAqIEBwYXJhbSB7b2JqZWN0fSBjYXNlc1xuICovXG5leHBvcnRzLnN3aXRjaEUgPSBmdW5jdGlvbiAodmFsdWUsIGNhc2VzKSB7XG4gICAgdmFyIHJlc3VsdCA9IGNhc2VzW3ZhbHVlXTtcbiAgICB2YXIgZGVmYXVsID0gY2FzZXNbJ2RlZmF1bHQnXTtcbiAgICBpZiAocmVzdWx0KVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIGlmIChkZWZhdWwpXG4gICAgICAgIHJldHVybiBkZWZhdWw7XG59O1xudmFyIEFwcFZpZXcgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEFwcFZpZXcoY29udGV4dCkge1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgICAgICB0aGlzLmlkcyA9IHt9O1xuICAgICAgICB0aGlzLndpZGdldHMgPSBbXTtcbiAgICB9XG4gICAgQXBwVmlldy5wcm90b3R5cGUucmVnaXN0ZXIgPSBmdW5jdGlvbiAoaWQsIHcpIHtcbiAgICAgICAgaWYgKHRoaXMuaWRzLmhhc093blByb3BlcnR5KGlkKSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkR1cGxpY2F0ZSBpZCAnXCIgKyBpZCArIFwiJyBkZXRlY3RlZCFcIik7XG4gICAgICAgIHRoaXMuaWRzW2lkXSA9IHc7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgQXBwVmlldy5wcm90b3R5cGUuZmluZEJ5SWQgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmlkc1tpZF0pID8gdGhpcy5pZHNbaWRdIDogbnVsbDtcbiAgICB9O1xuICAgIEFwcFZpZXcucHJvdG90eXBlLmludmFsaWRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjaGlsZHM7XG4gICAgICAgIHZhciBwYXJlbnQgPSB0aGlzLnRyZWUucGFyZW50Tm9kZTtcbiAgICAgICAgdmFyIHJlYWxGaXJzdENoaWxkO1xuICAgICAgICB2YXIgcmVhbEZpcnN0Q2hpbGRJbmRleDtcbiAgICAgICAgaWYgKHRoaXMudHJlZSA9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKCdDYW5ub3QgaW52YWxpZGF0ZSBhIHZpZXcgdGhhdCBoYXMgbm90IGJlZW4gcmVuZGVyZWQhJyk7XG4gICAgICAgIGlmICh0aGlzLnRyZWUucGFyZW50Tm9kZSA9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKCdBdHRlbXB0IHRvIGludmFsaWRhdGUgYSB2aWV3IHRoYXQgaGFzIG5vdCBiZWVuIGluc2VydGVkIHRvIERPTSEnKTtcbiAgICAgICAgY2hpbGRzID0gdGhpcy50cmVlLnBhcmVudE5vZGUuY2hpbGRyZW47XG4gICAgICAgIC8vZm9yIHNvbWUgcmVhc29uIHRoZSByZWZlcmVuY2Ugc3RvcmVkIGRvZXMgbm90IGhhdmUgdGhlIGNvcnJlY3QgcGFyZW50IG5vZGUuXG4gICAgICAgIC8vd2UgZG8gdGhpcyB0byBnZXQgYSAnbGl2ZScgdmVyc2lvbiBvZiB0aGUgbm9kZS5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHMubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICBpZiAoY2hpbGRzW2ldID09PSB0aGlzLnRyZWUpIHtcbiAgICAgICAgICAgICAgICByZWFsRmlyc3RDaGlsZCA9IGNoaWxkc1tpXTtcbiAgICAgICAgICAgICAgICByZWFsRmlyc3RDaGlsZEluZGV4ID0gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgcGFyZW50LnJlcGxhY2VDaGlsZCh0aGlzLnJlbmRlcigpLCByZWFsRmlyc3RDaGlsZCk7XG4gICAgfTtcbiAgICBBcHBWaWV3LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuaWRzID0ge307XG4gICAgICAgIHRoaXMud2lkZ2V0cy5mb3JFYWNoKGZ1bmN0aW9uICh3KSB7IHJldHVybiB3LnJlbW92ZWQoKTsgfSk7XG4gICAgICAgIHRoaXMud2lkZ2V0cyA9IFtdO1xuICAgICAgICB0aGlzLnRyZWUgPSB0aGlzLnRlbXBsYXRlLmNhbGwodGhpcy5jb250ZXh0KTtcbiAgICAgICAgdGhpcy5pZHNbJ3Jvb3QnXSA9ICh0aGlzLmlkc1sncm9vdCddKSA/IHRoaXMuaWRzWydyb290J10gOiB0aGlzLnRyZWU7XG4gICAgICAgIHRoaXMud2lkZ2V0cy5mb3JFYWNoKGZ1bmN0aW9uICh3KSB7IHJldHVybiB3LnJlbmRlcmVkKCk7IH0pO1xuICAgICAgICByZXR1cm4gdGhpcy50cmVlO1xuICAgIH07XG4gICAgcmV0dXJuIEFwcFZpZXc7XG59KCkpO1xuZXhwb3J0cy5BcHBWaWV3ID0gQXBwVmlldztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5ISURERU4gPSAnLWhpZGRlbic7XG5leHBvcnRzLkRJU0FCTEVEID0gJy1kaXNhYmxlZCc7XG5leHBvcnRzLk9OID0gJy1vbic7XG5leHBvcnRzLk9GRiA9ICctb2ZmJztcbmV4cG9ydHMuREVGQVVMVCA9ICctZGVmYXVsdCc7XG5leHBvcnRzLlBSSU1BUlkgPSAnLXByaW1hcnknO1xuZXhwb3J0cy5TVUNDRVNTID0gJy1zdWNjZXNzJztcbmV4cG9ydHMuSU5GTyA9ICctaW5mbyc7XG5leHBvcnRzLldBUk5JTkcgPSAnLXdhcm5pbmcnO1xuZXhwb3J0cy5EQU5HRVIgPSAnLWRhbmdlcic7XG5leHBvcnRzLkxBUkdFID0gJy1sYXJnZSc7XG5leHBvcnRzLlNNQUxMID0gJy1zbWFsbCc7XG5leHBvcnRzLkVYVFJBX1NNQUxMID0gJy1leHRyYS1zbWFsbCc7XG5leHBvcnRzLkFDVElWRSA9ICdhY3RpdmUnOyAvL0B0b2RvOiByZWZhY3RvciB0byBmbGFnIHN5bnRheFxuZXhwb3J0cy5EUkFXRVJfTEFZT1VUID0gJ3d3LWRyYXdlci1sYXlvdXQnO1xuZXhwb3J0cy5EUkFXRVIgPSAnd3ctZHJhd2VyJztcbmV4cG9ydHMuRFJBV0VSX0NPTlRFTlQgPSAnd3ctZHJhd2VyX19jb250ZW50JztcbmV4cG9ydHMuRFJBV0VSX1BVU0hBQkxFID0gJy1kcmF3ZXItcHVzaGFibGUnO1xuZXhwb3J0cy5EUkFXRVJfUFVTSEFCTEVfRklYRUQgPSAnLWRyYXdlci1wdXNoYWJsZS1maXhlZCc7XG5leHBvcnRzLkFDVElPTl9BUkVBID0gJ3d3LWFjdGlvbi1hcmVhJztcbmV4cG9ydHMuQUNUSU9OX0FSRUFfQ09OVEVOVCA9ICd3dy1hY3Rpb24tYXJlYV9fY29udGVudCc7XG5leHBvcnRzLk1BSU5fVklFVyA9ICd3dy1tYWluLXZpZXcnO1xuZXhwb3J0cy5NRU5VX0JVVFRPTiA9ICd3dy1tZW51LWJ1dHRvbic7XG5leHBvcnRzLkJVVFRPTiA9ICd3dy1idXR0b24nO1xuLy9AdG9kbzogcmVmYWN0b3IgdGhpcyB0byBiZSBpbmxpbmUgd2l0aCBvdGhlciBjbGFzcyBuYW1lc1xuZXhwb3J0cy5HUklEX0NPTlRBSU5FUiA9ICdjb250YWluZXItZmx1aWQnO1xuZXhwb3J0cy5HUklEX0NPTFVNTiA9ICcnO1xuZXhwb3J0cy5HUklEX1JPVyA9ICdyb3cnO1xuZXhwb3J0cy5QQU5FTCA9ICd3dy1wYW5lbCc7XG5leHBvcnRzLlBBTkVMX0hFQURFUiA9ICd3dy1wYW5lbF9faGVhZGVyJztcbmV4cG9ydHMuUEFORUxfQk9EWSA9ICd3dy1wYW5lbF9fYm9keSc7XG5leHBvcnRzLlBBTkVMX0ZPT1RFUiA9ICd3dy1wYW5lbF9fZm9vdGVyJztcbmV4cG9ydHMuTU9EQUwgPSAnd3ctbW9kYWwnO1xuZXhwb3J0cy5NT0RBTF9ESUFMT0cgPSAnd3ctbW9kYWxfX2RpYWxvZyc7XG5leHBvcnRzLk1PREFMX0NPTlRFTlQgPSAnd3ctbW9kYWxfX2NvbnRlbnQnO1xuZXhwb3J0cy5NT0RBTF9IRUFERVIgPSAnd3ctbW9kYWxfX2hlYWRlcic7XG5leHBvcnRzLk1PREFMX0JPRFkgPSAnd3ctbW9kYWxfX2JvZHknO1xuZXhwb3J0cy5NT0RBTF9GT09URVIgPSAnd3ctbW9hZGxfX2Zvb3Rlcic7XG5leHBvcnRzLkZPUk1fR1JPVVAgPSAnZm9ybS1ncm91cCc7XG5leHBvcnRzLkNPTlRST0xfTEFCRUwgPSAnY29udHJvbC1sYWJlbCc7XG5leHBvcnRzLklOUFVUID0gJ2Zvcm0tY29udHJvbCc7XG5leHBvcnRzLlRFWFRBUkVBID0gJ2Zvcm0tY29udHJvbCc7XG5leHBvcnRzLlNFTEVDVCA9ICdmb3JtLWNvbnRyb2wnO1xuZXhwb3J0cy5UQUJTID0gJ25hdiBuYXYtdGFicyc7IC8vQHRvZG8gdW4tYm9vdHN0cmFwXG5leHBvcnRzLlNXSVRDSCA9ICd3dy1zd2l0Y2gnO1xuZXhwb3J0cy5TV0lUQ0hfU0xJREVSID0gJ3d3LXN3aXRjaF9fc2xpZGVyJztcbmV4cG9ydHMuVEFCTEUgPSAndGFibGUnOyAvL0B0b2RvIHVuLWJvb3RzdHJhcFxuZXhwb3J0cy5MQVlPVVQgPSAnd3ctbGF5b3V0JztcbmV4cG9ydHMuTEFZT1VUX0RSQVdFUl9OQVZJR0FUSU9OID0gJ3dhdC1sYXlvdXQtZHJhd2VyLW5hdmlnYXRpb24nO1xuZXhwb3J0cy5MQVlPVVRfRFJBV0VSX05BVklHQVRJT05fVElUTEUgPSAnd2F0LWxheW91dC1kcmF3ZXItbmF2aWdhdGlvbi10aXRsZSc7XG5leHBvcnRzLkxBWU9VVF9BQ0NPVU5UX0FSRUEgPSAnd2F0LWxheW91dC1hY2NvdW50LWFyZWEnO1xuZXhwb3J0cy5MQVlPVVRfQUNDT1VOVF9BUkVBX1RJVExFID0gJ3dhdC1sYXlvdXQtYWNjb3VudC1hcmVhLXRpdGxlJztcbmV4cG9ydHMuTEFZT1VUX0FDQ09VTlRfQVJFQV9UT0dHTEUgPSAnd2F0LWxheW91dC1hY2NvdW50LWFyZWEtdG9nZ2xlJztcbmV4cG9ydHMuTEFZT1VUX05PVElGSUNBVElPTiA9ICd3YXQtbGF5b3V0LW5vdGlmaWNhdGlvbic7XG5leHBvcnRzLkxBWU9VVF9PVkVSTEFZID0gJ3dheS1sYXlvdXQtb3ZlcmxheSc7XG5leHBvcnRzLkFVVE9DT01QTEVURSA9ICd3YXQta2l0LWF1dG9jb21wbGV0ZSc7XG5leHBvcnRzLkFVVE9DT01QTEVURV9DT05UQUlORVIgPSAnd2F0LWtpdC1hdXRvY29tcGxldGUtY29udGFpbmVyJztcbmV4cG9ydHMuQVVUT0NPTVBMRVRFX0lOUFVUX0FSRUEgPSAnd2F0LWtpdC1hdXRvY29tcGxldGUtaW5wdXQtYXJlYSc7XG5leHBvcnRzLkFVVE9DT01QTEVURV9JTlBVVCA9ICd3YXQta2l0LWF1dG9jb21wbGV0ZS1pbnB1dCc7XG5leHBvcnRzLkFVVE9DT01QTEVURV9PUFRJT05TID0gJ3dhdC1raXQtYXV0b2NvbXBsZXRlLW9wdGlvbnMnO1xuZXhwb3J0cy5BVVRPQ09NUExFVEVfSVRFTV9XUkFQUEVSID0gJ3dhdC1raXQtYXV0by1jb21wbGV0ZS1pdGVtLXdyYXBwZXInO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9U3R5bGVzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBjb21iaW5lIHRoZSBtZW1iZXJzIG9mIGFuIGFycmF5IGludG8gb25lIHN0cmluZy5cbiAqL1xuZXhwb3J0cy5jb21iaW5lID0gZnVuY3Rpb24gKHN0ciwgam9pbmVyKSB7XG4gICAgaWYgKGpvaW5lciA9PT0gdm9pZCAwKSB7IGpvaW5lciA9ICcgJzsgfVxuICAgIHJldHVybiBzdHIuZmlsdGVyKGZ1bmN0aW9uIChzKSB7IHJldHVybiAoKHMgIT0gbnVsbCkgfHwgcyAhPSAnJyk7IH0pLmpvaW4oam9pbmVyKTtcbn07XG4vKipcbiAqIG5vb3BcbiAqL1xuZXhwb3J0cy5ub29wID0gZnVuY3Rpb24gKCkgeyB9O1xuLyoqXG4gKiByZWFkIGEgdmFsdWUgZnJvbSB0aGUgY29udGV4dCBhdHRyaWJ1dGVzXG4gKi9cbmV4cG9ydHMucmVhZCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgXyA9IFtdO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIF9bX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuYXR0cmlidXRlcy5yZWFkLmFwcGx5KHRoaXMuYXR0cmlidXRlcywgYXJndW1lbnRzKTtcbn07XG4vKipcbiAqIHJlcGxhY2VDb250ZW50XG4gKi9cbmV4cG9ydHMucmVwbGFjZUNvbnRlbnQgPSBmdW5jdGlvbiAociwgbm9kZSkge1xuICAgIHdoaWxlIChub2RlLmxhc3RDaGlsZClcbiAgICAgICAgbm9kZS5yZW1vdmVDaGlsZChub2RlLmxhc3RDaGlsZCk7XG4gICAgbm9kZS5hcHBlbmRDaGlsZChyLnJlbmRlcigpKTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD11dGlsLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgdXRpbF8xID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi91dGlsXCIpO1xudmFyIHdtbF9ydW50aW1lXzEgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC1ydW50aW1lXCIpO1xudmFyIGFjdGlvbl9hcmVhXzEgPSByZXF1aXJlKFwiLi93bWwvYWN0aW9uX2FyZWFcIik7XG4vKipcbiAqIEFjdGlvbkFyZWFcbiAqL1xudmFyIEFjdGlvbkFyZWEgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhBY3Rpb25BcmVhLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEFjdGlvbkFyZWEoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IGFjdGlvbl9hcmVhXzEuTWFpbihfdGhpcyk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogc2V0Q29udGVudCByZXBsYWNlcyB0aGUgY29udGVudCBvZiB0aGlzIHZpZXcuXG4gICAgICovXG4gICAgQWN0aW9uQXJlYS5wcm90b3R5cGUuc2V0Q29udGVudCA9IGZ1bmN0aW9uIChyKSB7XG4gICAgICAgIHV0aWxfMS5yZXBsYWNlQ29udGVudChyLCB0aGlzLnZpZXcuZmluZEJ5SWQoJ2NvbnRlbnQnKSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgcmV0dXJuIEFjdGlvbkFyZWE7XG59KHdtbF9ydW50aW1lXzEuQ29tcG9uZW50KSk7XG5leHBvcnRzLkFjdGlvbkFyZWEgPSBBY3Rpb25BcmVhO1xuZXhwb3J0cy5kZWZhdWx0ID0gQWN0aW9uQXJlYTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUFjdGlvbkFyZWEuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB3bWxfcnVudGltZV8xID0gcmVxdWlyZShcIkBxdWVuay93bWwtcnVudGltZVwiKTtcbnZhciBTdHlsZXMgPSByZXF1aXJlKFwid21sLXdpZGdldHMtY29tbW9uL1N0eWxlc1wiKTtcbnZhciB1dGlsXzEgPSByZXF1aXJlKFwid21sLXdpZGdldHMtY29tbW9uL3V0aWxcIik7XG52YXIgTWFpbiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKE1haW4sIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gTWFpbihjb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbnRleHQpIHx8IHRoaXM7XG4gICAgICAgIHZhciB2aWV3ID0gX3RoaXM7XG4gICAgICAgIF90aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6IHV0aWxfMS5jb21iaW5lKFtTdHlsZXMuQUNUSU9OX0FSRUEsIFN0eWxlcy5EUkFXRVJfUFVTSEFCTEVfRklYRURdKSB9IH0sIFt3bWxfcnVudGltZV8xLm5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiBTdHlsZXMuQUNUSU9OX0FSRUFfQ09OVEVOVCB9LCB3bWw6IHsgJ2lkJzogXCJjb250ZW50XCIgfSB9LCBbdGhpcy5jaGlsZHJlbl0sIHZpZXcpXSwgdmlldyk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIE1haW47XG59KHdtbF9ydW50aW1lXzEuQXBwVmlldykpO1xuZXhwb3J0cy5NYWluID0gTWFpbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFjdGlvbl9hcmVhLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgd21sX3J1bnRpbWVfMSA9IHJlcXVpcmUoXCJAcXVlbmsvd21sLXJ1bnRpbWVcIik7XG52YXIgYnVzeV9pbmRpY2F0b3JfMSA9IHJlcXVpcmUoXCIuL3dtbC9idXN5X2luZGljYXRvclwiKTtcbi8qKlxuICogQnVzeUluZGljYXRvciBwcm92aWRlcyBhICdoYW1idXJnZXInIG1lbnUgYnV0dG9uLlxuICovXG52YXIgQnVzeUluZGljYXRvciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEJ1c3lJbmRpY2F0b3IsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQnVzeUluZGljYXRvcigpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnZpZXcgPSBuZXcgYnVzeV9pbmRpY2F0b3JfMS5NYWluKF90aGlzKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gQnVzeUluZGljYXRvcjtcbn0od21sX3J1bnRpbWVfMS5Db21wb25lbnQpKTtcbmV4cG9ydHMuQnVzeUluZGljYXRvciA9IEJ1c3lJbmRpY2F0b3I7XG5leHBvcnRzLmRlZmF1bHQgPSBCdXN5SW5kaWNhdG9yO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QnVzeUluZGljYXRvci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHdtbF9ydW50aW1lXzEgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC1ydW50aW1lXCIpO1xudmFyIE1haW4gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhNYWluLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIE1haW4oY29udGV4dCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBjb250ZXh0KSB8fCB0aGlzO1xuICAgICAgICB2YXIgdmlldyA9IF90aGlzO1xuICAgICAgICBfdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB3bWxfcnVudGltZV8xLm5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiBcImxvYWRpbmdcIiB9IH0sIFtdLCB2aWV3KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gTWFpbjtcbn0od21sX3J1bnRpbWVfMS5BcHBWaWV3KSk7XG5leHBvcnRzLk1haW4gPSBNYWluO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YnVzeV9pbmRpY2F0b3IuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB3bWxfcnVudGltZV8xID0gcmVxdWlyZShcIkBxdWVuay93bWwtcnVudGltZVwiKTtcbnZhciBidXR0b25fMSA9IHJlcXVpcmUoXCIuL3dtbC9idXR0b25cIik7XG47XG4vKipcbiAqIEJ1dHRvbiBpcyBhbiBpbXByb3ZlbWVudCBvdmVyIEhUTUxCdXR0aW9uRWxlbWVudFxuICovXG52YXIgQnV0dG9uID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQnV0dG9uLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEJ1dHRvbigpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnZpZXcgPSBuZXcgYnV0dG9uXzEuTWFpbihfdGhpcyk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogZGlzYWJsZSB0aGlzIGJ1dHRvbi5cbiAgICAgKi9cbiAgICBCdXR0b24ucHJvdG90eXBlLmRpc2FibGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMudmlldy5maW5kQnlJZCgnYnV0dG9uJykuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogZW5hYmxlIHRoaXMgYnV0dG9uLlxuICAgICAqL1xuICAgIEJ1dHRvbi5wcm90b3R5cGUuZW5hYmxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnZpZXcuZmluZEJ5SWQoJ2J1dHRvbicpLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcbiAgICB9O1xuICAgIEJ1dHRvbi5wcm90b3R5cGUucmVuZGVyZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd2F0OmRpc2FibGVkJykpXG4gICAgICAgICAgICB0aGlzLnZpZXcuZmluZEJ5SWQoJ2J1dHRvbicpLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcbiAgICB9O1xuICAgIHJldHVybiBCdXR0b247XG59KHdtbF9ydW50aW1lXzEuQ29tcG9uZW50KSk7XG5leHBvcnRzLkJ1dHRvbiA9IEJ1dHRvbjtcbmV4cG9ydHMuZGVmYXVsdCA9IEJ1dHRvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUJ1dHRvbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHdtbF9ydW50aW1lXzEgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC1ydW50aW1lXCIpO1xudmFyIFN0eWxlcyA9IHJlcXVpcmUoXCJ3bWwtd2lkZ2V0cy1jb21tb24vU3R5bGVzXCIpO1xudmFyIHV0aWxfMSA9IHJlcXVpcmUoXCJ3bWwtd2lkZ2V0cy1jb21tb24vdXRpbFwiKTtcbnZhciBfMSA9IHJlcXVpcmUoXCIuLi8uLi9cIik7XG52YXIgTWFpbiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKE1haW4sIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gTWFpbihjb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbnRleHQpIHx8IHRoaXM7XG4gICAgICAgIHZhciB2aWV3ID0gX3RoaXM7XG4gICAgICAgIF90aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHdtbF9ydW50aW1lXzEud2lkZ2V0KF8xLkZyYWdtZW50LCB7IGh0bWw6IHt9IH0sIFt3bWxfcnVudGltZV8xLmlmRSh0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6aHJlZicpLCBmdW5jdGlvbiBpZjAoKSB7IHJldHVybiB3bWxfcnVudGltZV8xLmJveChbd21sX3J1bnRpbWVfMS5ub2RlKCdhJywgeyBodG1sOiB7ICdocmVmJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmhyZWYnKSwgJ2NsYXNzJzogdXRpbF8xLmNvbWJpbmUoW1N0eWxlcy5CVVRUT04sIHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzp2YXJpYW50JywgJycpLCB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6c2l6ZScsICcnKSwgdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OnN0eWxlJywgU3R5bGVzLkRFRkFVTFQpLCB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6Y2xhc3MnKV0pLCAnb25jbGljayc6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpvbkNsaWNrJywgdXRpbF8xLm5vb3ApIH0sIHdtbDogeyAnaWQnOiBcImJ1dHRvblwiIH0gfSwgW3RoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzp0ZXh0JyksIHRoaXMuY2hpbGRyZW5dLCB2aWV3KV0pOyB9LmJpbmQodGhpcyksIGZ1bmN0aW9uIGVsc2VfY2xhdXNlMCgpIHsgcmV0dXJuIHdtbF9ydW50aW1lXzEuYm94KFt3bWxfcnVudGltZV8xLm5vZGUoJ2J1dHRvbicsIHsgaHRtbDogeyAndHlwZSc6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzp0eXBlJywgJ2J1dHRvbicpLCAnbmFtZSc6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpuYW1lJywgJycpLCAnY2xhc3MnOiB1dGlsXzEuY29tYmluZShbU3R5bGVzLkJVVFRPTiwgdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OnZhcmlhbnQnLCAnJyksIHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpzaXplJywgJycpLCB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6c3R5bGUnLCBTdHlsZXMuREVGQVVMVCksIHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpjbGFzcycpXSksICdvbmNsaWNrJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3Om9uQ2xpY2snLCB1dGlsXzEubm9vcCkgfSwgd21sOiB7ICdpZCc6IFwiYnV0dG9uXCIgfSB9LCBbdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OnRleHQnKSwgdGhpcy5jaGlsZHJlbl0sIHZpZXcpXSk7IH0uYmluZCh0aGlzKSldLCB2aWV3KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gTWFpbjtcbn0od21sX3J1bnRpbWVfMS5BcHBWaWV3KSk7XG5leHBvcnRzLk1haW4gPSBNYWluO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YnV0dG9uLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgd21sX3J1bnRpbWVfMSA9IHJlcXVpcmUoXCJAcXVlbmsvd21sLXJ1bnRpbWVcIik7XG52YXIgU3R5bGVzID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi9TdHlsZXNcIik7XG52YXIgZHJhd2VyX2xheW91dF8xID0gcmVxdWlyZShcIi4vd21sL2RyYXdlci1sYXlvdXRcIik7XG52YXIgdXRpbF8xID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi91dGlsXCIpO1xuO1xuLyoqXG4gKiBEcmF3ZXJMYXlvdXQgcHJvdmlkZXMgYSB0b3AgbGV2ZWwgbGF5b3V0IGNvbnNpc3Rpbmcgb2YgYSBkcmF3ZXIgYW5kXG4gKiBhIG1haW4gY29udGVudCB2aWV3LlxuICovXG52YXIgRHJhd2VyTGF5b3V0ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoRHJhd2VyTGF5b3V0LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIERyYXdlckxheW91dCgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnZpZXcgPSBuZXcgZHJhd2VyX2xheW91dF8xLk1haW4oX3RoaXMpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIERyYXdlckxheW91dC5wcm90b3R5cGUuX2dldERyYXdlckRPTSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmlldy5maW5kQnlJZCgnZHJhd2VyJyk7XG4gICAgfTtcbiAgICBEcmF3ZXJMYXlvdXQucHJvdG90eXBlLl9jb21iaW5lID0gZnVuY3Rpb24gKGNsYXNzZXMpIHtcbiAgICAgICAgcmV0dXJuIGNsYXNzZXMuam9pbignICcpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogZHJhd2VyVmlzaWJsZSBxdWVyaWVzIHdoZXRoZXIgdGhlIERyYXdlciBpcyB2aXNpYmxlIG9yIG5vdC5cbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBEcmF3ZXJMYXlvdXQucHJvdG90eXBlLmRyYXdlclZpc2libGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAhdGhpcy5fZ2V0RHJhd2VyRE9NKCkuY2xhc3NMaXN0LmNvbnRhaW5zKFN0eWxlcy5ISURERU4pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogaGlkZURyYXdlciBoaWRlcyB0aGUgZHJhd2VyLlxuICAgICAqL1xuICAgIERyYXdlckxheW91dC5wcm90b3R5cGUuaGlkZURyYXdlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuZHJhd2VyVmlzaWJsZSgpKVxuICAgICAgICAgICAgdGhpcy5fZ2V0RHJhd2VyRE9NKCkuY2xhc3NMaXN0LmFkZChTdHlsZXMuSElEREVOKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIHNob3dEcmF3ZXIgc2hvd3MgdGhlIGRyYXdlclxuICAgICAqL1xuICAgIERyYXdlckxheW91dC5wcm90b3R5cGUuc2hvd0RyYXdlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRyYXdlclZpc2libGUoKSlcbiAgICAgICAgICAgIHRoaXMuX2dldERyYXdlckRPTSgpLmNsYXNzTGlzdC5yZW1vdmUoU3R5bGVzLkhJRERFTik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiB0b2dnbGUgdGhlIHZpc2liaWxpdHkgb2YgdGhpcyBEcmF3ZXJcbiAgICAgKi9cbiAgICBEcmF3ZXJMYXlvdXQucHJvdG90eXBlLnRvZ2dsZURyYXdlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fZ2V0RHJhd2VyRE9NKCkuY2xhc3NMaXN0LnRvZ2dsZShTdHlsZXMuSElEREVOKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIHNldENvbnRlbnQgcmVwbGFjZXMgdGhlIGNvbnRlbnQgb2YgdGhpcyB2aWV3LlxuICAgICAqL1xuICAgIERyYXdlckxheW91dC5wcm90b3R5cGUuc2V0Q29udGVudCA9IGZ1bmN0aW9uIChyKSB7XG4gICAgICAgIHV0aWxfMS5yZXBsYWNlQ29udGVudChyLCB0aGlzLnZpZXcuZmluZEJ5SWQoJ2NvbnRlbnQnKSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgcmV0dXJuIERyYXdlckxheW91dDtcbn0od21sX3J1bnRpbWVfMS5Db21wb25lbnQpKTtcbmV4cG9ydHMuRHJhd2VyTGF5b3V0ID0gRHJhd2VyTGF5b3V0O1xuZXhwb3J0cy5kZWZhdWx0ID0gRHJhd2VyTGF5b3V0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RHJhd2VyTGF5b3V0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgd21sX3J1bnRpbWVfMSA9IHJlcXVpcmUoXCJAcXVlbmsvd21sLXJ1bnRpbWVcIik7XG52YXIgU3R5bGVzID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi9TdHlsZXNcIik7XG52YXIgTWFpbiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKE1haW4sIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gTWFpbihjb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbnRleHQpIHx8IHRoaXM7XG4gICAgICAgIHZhciB2aWV3ID0gX3RoaXM7XG4gICAgICAgIF90aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6IFN0eWxlcy5EUkFXRVJfTEFZT1VUIH0sIHdtbDogeyAnaWQnOiBcImNvbnRlbnRcIiB9IH0sIFt3bWxfcnVudGltZV8xLm5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiBTdHlsZXMuRFJBV0VSIH0sIHdtbDogeyAnaWQnOiBcImRyYXdlclwiIH0gfSwgW3dtbF9ydW50aW1lXzEubm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6IFN0eWxlcy5EUkFXRVJfQ09OVEVOVCB9IH0sIFt3bWxfcnVudGltZV8xLmlmRSh0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6bmF2aWdhdGlvbicpLCBmdW5jdGlvbiBpZjMoKSB7IHJldHVybiB3bWxfcnVudGltZV8xLmJveChbdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3Om5hdmlnYXRpb24nKS5hcHBseSh0aGlzLCBbdmlldyxdKV0pOyB9LmJpbmQodGhpcyksIHdtbF9ydW50aW1lXzEuZW1wdHkpXSwgdmlldyldLCB2aWV3KSwgd21sX3J1bnRpbWVfMS5pZkUodGhpcy5hdHRyaWJ1dGVzLmhhcygnd3c6Y29udGVudCcpLCBmdW5jdGlvbiBpZjQoKSB7IHJldHVybiB3bWxfcnVudGltZV8xLmJveChbdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmNvbnRlbnQnKS5hcHBseSh0aGlzLCBbdmlldyxdKV0pOyB9LmJpbmQodGhpcyksIGZ1bmN0aW9uIGVsc2VfY2xhdXNlMygpIHsgcmV0dXJuIHdtbF9ydW50aW1lXzEuYm94KFt0aGlzLmNoaWxkcmVuXSk7IH0uYmluZCh0aGlzKSldLCB2aWV3KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gTWFpbjtcbn0od21sX3J1bnRpbWVfMS5BcHBWaWV3KSk7XG5leHBvcnRzLk1haW4gPSBNYWluO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZHJhd2VyLWxheW91dC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHdtbF9ydW50aW1lXzEgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC1ydW50aW1lXCIpO1xudmFyIEZyYWdtZW50ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoRnJhZ21lbnQsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gRnJhZ21lbnQoKSB7XG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICB9XG4gICAgRnJhZ21lbnQucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoYykgeyByZXR1cm4gZnJhZy5hcHBlbmRDaGlsZChjKTsgfSk7XG4gICAgICAgIHJldHVybiBmcmFnO1xuICAgIH07XG4gICAgcmV0dXJuIEZyYWdtZW50O1xufSh3bWxfcnVudGltZV8xLkNvbXBvbmVudCkpO1xuZXhwb3J0cy5GcmFnbWVudCA9IEZyYWdtZW50O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RnJhZ21lbnQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB3bWxfcnVudGltZV8xID0gcmVxdWlyZShcIkBxdWVuay93bWwtcnVudGltZVwiKTtcbnZhciBTdHlsZXMgPSByZXF1aXJlKFwid21sLXdpZGdldHMtY29tbW9uL1N0eWxlc1wiKTtcbnZhciB2aWV3cyA9IHJlcXVpcmUoXCIuL3dtbC9ncmlkXCIpO1xuO1xuLyoqXG4gKiBDb250YWluZXJcbiAqL1xudmFyIENvbnRhaW5lciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKENvbnRhaW5lciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBDb250YWluZXIoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IHZpZXdzLkNvbnRhaW5lcihfdGhpcyk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIENvbnRhaW5lcjtcbn0od21sX3J1bnRpbWVfMS5Db21wb25lbnQpKTtcbmV4cG9ydHMuQ29udGFpbmVyID0gQ29udGFpbmVyO1xudmFyIFJvdyA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFJvdywgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBSb3coKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IHZpZXdzLlJvdyhfdGhpcyk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIFJvdztcbn0od21sX3J1bnRpbWVfMS5Db21wb25lbnQpKTtcbmV4cG9ydHMuUm93ID0gUm93O1xudmFyIENvbHVtbiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKENvbHVtbiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBDb2x1bW4oKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IHZpZXdzLkNvbHVtbihfdGhpcyk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgQ29sdW1uLnByb3RvdHlwZS5fZ2V0Q2xhc3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjbGFzc2VzID0gW1N0eWxlcy5HUklEX0NPTFVNTl07XG4gICAgICAgIHZhciBzaXplID0gdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OnNpemUnLCAnbWQnKTtcbiAgICAgICAgdmFyIHdpZHRoID0gdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OndpZHRoJywgMTIpO1xuICAgICAgICB2YXIgb2Zmc2V0ID0gdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3Om9mZnNldCcsIDApO1xuICAgICAgICBjbGFzc2VzLnB1c2goXCJjb2wtXCIgKyBzaXplICsgXCItXCIgKyB3aWR0aCk7XG4gICAgICAgIGlmIChvZmZzZXQpXG4gICAgICAgICAgICBjbGFzc2VzLnB1c2goXCJjb2wtXCIgKyBzaXplICsgXCItb2Zmc2V0LVwiICsgb2Zmc2V0KTtcbiAgICAgICAgY2xhc3Nlcy5wdXNoKHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpjbGFzcycpKTtcbiAgICAgICAgcmV0dXJuIGNsYXNzZXMuZmlsdGVyKGZ1bmN0aW9uICh2KSB7IHJldHVybiAhKHYgPT0gbnVsbCk7IH0pLmpvaW4oJyAnKTtcbiAgICB9O1xuICAgIHJldHVybiBDb2x1bW47XG59KHdtbF9ydW50aW1lXzEuQ29tcG9uZW50KSk7XG5leHBvcnRzLkNvbHVtbiA9IENvbHVtbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUdyaWQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB3bWxfcnVudGltZV8xID0gcmVxdWlyZShcIkBxdWVuay93bWwtcnVudGltZVwiKTtcbnZhciB1dGlsXzEgPSByZXF1aXJlKFwid21sLXdpZGdldHMtY29tbW9uL3V0aWxcIik7XG52YXIgU3R5bGVzID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi9TdHlsZXNcIik7XG52YXIgQ29udGFpbmVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQ29udGFpbmVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIENvbnRhaW5lcihjb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbnRleHQpIHx8IHRoaXM7XG4gICAgICAgIHZhciB2aWV3ID0gX3RoaXM7XG4gICAgICAgIF90aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgnc2VjdGlvbicsIHsgaHRtbDogeyAnY2xhc3MnOiB1dGlsXzEuY29tYmluZShbU3R5bGVzLkdSSURfQ09OVEFJTkVSLCB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6Y2xhc3MnLCAnJyldKSB9IH0sIFt0aGlzLmNoaWxkcmVuXSwgdmlldyk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIENvbnRhaW5lcjtcbn0od21sX3J1bnRpbWVfMS5BcHBWaWV3KSk7XG5leHBvcnRzLkNvbnRhaW5lciA9IENvbnRhaW5lcjtcbnZhciBSb3cgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhSb3csIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gUm93KGNvbnRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29udGV4dCkgfHwgdGhpcztcbiAgICAgICAgdmFyIHZpZXcgPSBfdGhpcztcbiAgICAgICAgX3RoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogdXRpbF8xLmNvbWJpbmUoW1N0eWxlcy5HUklEX1JPVywgdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmNsYXNzJywgJycpXSkgfSB9LCBbdGhpcy5jaGlsZHJlbl0sIHZpZXcpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBSb3c7XG59KHdtbF9ydW50aW1lXzEuQXBwVmlldykpO1xuZXhwb3J0cy5Sb3cgPSBSb3c7XG52YXIgQ29sdW1uID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQ29sdW1uLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIENvbHVtbihjb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbnRleHQpIHx8IHRoaXM7XG4gICAgICAgIHZhciB2aWV3ID0gX3RoaXM7XG4gICAgICAgIF90aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6IHRoaXMuX2dldENsYXNzKCkgfSB9LCBbdGhpcy5jaGlsZHJlbl0sIHZpZXcpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBDb2x1bW47XG59KHdtbF9ydW50aW1lXzEuQXBwVmlldykpO1xuZXhwb3J0cy5Db2x1bW4gPSBDb2x1bW47XG4vLyMgc291cmNlTWFwcGluZ1VSTD1ncmlkLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoganNoaW50IGlnbm9yZTpzdGFydCAqL1xuLypcbmV4cG9ydCBCcmVhZENydW1iTWVudSBmcm9tICcuL2JyZWFkY3J1bWJzL0JyZWFkQ3J1bWJNZW51JztcbmV4cG9ydCBCcmVhZENydW1iIGZyb20gJy4vYnJlYWRjcnVtYnMvQnJlYWRDcnVtYic7XG5leHBvcnQgQXV0b2NvbXBsZXRlIGZyb20gJy4vYXV0b2NvbXBsZXRlL0F1dG9jb21wbGV0ZSc7XG5leHBvcnQgSnVtYm90cm9uIGZyb20gJy4vanVtYm90cm9uL0p1bWJvdHJvbic7XG5leHBvcnQgV2VsbCBmcm9tICcuL3dlbGwvV2VsbCc7XG5leHBvcnQgQ2FyZCBmcm9tICcuL2NhcmQvQ2FyZCc7XG5leHBvcnQgQ2FyZEltYWdlIGZyb20gJy4vY2FyZC9DYXJkSW1hZ2UnO1xuZXhwb3J0IENhcmRUaXRsZSBmcm9tICcuL2NhcmQvQ2FyZFRpdGxlJztcbmV4cG9ydCBDYXJkQmxvY2sgZnJvbSAnLi9jYXJkL0NhcmRCbG9jayc7XG5leHBvcnQgTGlzdEdyb3VwIGZyb20gJy4vbGlzdC1ncm91cC9MaXN0R3JvdXAnO1xuZXhwb3J0IExpc3RHcm91cEl0ZW0gZnJvbSAnLi9saXN0LWdyb3VwL0xpc3RHcm91cEl0ZW0nO1xuZXhwb3J0IFNlYXJjaCBmcm9tICcuL3NlYXJjaC9TZWFyY2gnO1xuKi9cbnZhciBGcmFnbWVudF8xID0gcmVxdWlyZShcIi4vZnJhZ21lbnQvRnJhZ21lbnRcIik7XG5leHBvcnRzLkZyYWdtZW50ID0gRnJhZ21lbnRfMS5GcmFnbWVudDtcbnZhciBEcmF3ZXJMYXlvdXRfMSA9IHJlcXVpcmUoXCIuL2RyYXdlci1sYXlvdXQvRHJhd2VyTGF5b3V0XCIpO1xuZXhwb3J0cy5EcmF3ZXJMYXlvdXQgPSBEcmF3ZXJMYXlvdXRfMS5EcmF3ZXJMYXlvdXQ7XG52YXIgQWN0aW9uQXJlYV8xID0gcmVxdWlyZShcIi4vYWN0aW9uLWFyZWEvQWN0aW9uQXJlYVwiKTtcbmV4cG9ydHMuQWN0aW9uQXJlYSA9IEFjdGlvbkFyZWFfMS5BY3Rpb25BcmVhO1xudmFyIE1haW5WaWV3XzEgPSByZXF1aXJlKFwiLi9tYWluLXZpZXcvTWFpblZpZXdcIik7XG5leHBvcnRzLk1haW5WaWV3ID0gTWFpblZpZXdfMS5NYWluVmlldztcbnZhciBNZW51QnV0dG9uXzEgPSByZXF1aXJlKFwiLi9tZW51LWJ1dHRvbi9NZW51QnV0dG9uXCIpO1xuZXhwb3J0cy5NZW51QnV0dG9uID0gTWVudUJ1dHRvbl8xLk1lbnVCdXR0b247XG52YXIgQnV0dG9uXzEgPSByZXF1aXJlKFwiLi9idXR0b24vQnV0dG9uXCIpO1xuZXhwb3J0cy5CdXR0b24gPSBCdXR0b25fMS5CdXR0b247XG52YXIgR3JpZF8xID0gcmVxdWlyZShcIi4vZ3JpZC9HcmlkXCIpO1xuZXhwb3J0cy5Db250YWluZXIgPSBHcmlkXzEuQ29udGFpbmVyO1xuZXhwb3J0cy5Sb3cgPSBHcmlkXzEuUm93O1xuZXhwb3J0cy5Db2x1bW4gPSBHcmlkXzEuQ29sdW1uO1xudmFyIFBhbmVsXzEgPSByZXF1aXJlKFwiLi9wYW5lbC9QYW5lbFwiKTtcbmV4cG9ydHMuUGFuZWwgPSBQYW5lbF8xLlBhbmVsO1xuZXhwb3J0cy5QYW5lbEhlYWRlciA9IFBhbmVsXzEuSGVhZGVyO1xuZXhwb3J0cy5QYW5lbEJvZHkgPSBQYW5lbF8xLkJvZHk7XG5leHBvcnRzLlBhbmVsRm9vdGVyID0gUGFuZWxfMS5Gb290ZXI7XG52YXIgTW9kYWxfMSA9IHJlcXVpcmUoXCIuL21vZGFsL01vZGFsXCIpO1xuZXhwb3J0cy5Nb2RhbCA9IE1vZGFsXzEuTW9kYWw7XG5leHBvcnRzLk1vZGFsSGVhZGVyID0gTW9kYWxfMS5IZWFkZXI7XG5leHBvcnRzLk1vZGFsQm9keSA9IE1vZGFsXzEuQm9keTtcbmV4cG9ydHMuTW9kYWxGb290ZXIgPSBNb2RhbF8xLkZvb3RlcjtcbnZhciBJbnB1dF8xID0gcmVxdWlyZShcIi4vaW5wdXQvSW5wdXRcIik7XG5leHBvcnRzLklucHV0ID0gSW5wdXRfMS5JbnB1dDtcbmV4cG9ydHMuU2VsZWN0ID0gSW5wdXRfMS5TZWxlY3Q7XG52YXIgU3dpdGNoXzEgPSByZXF1aXJlKFwiLi9zd2l0Y2gvU3dpdGNoXCIpO1xuZXhwb3J0cy5Td2l0Y2ggPSBTd2l0Y2hfMS5Td2l0Y2g7XG52YXIgVGFibGVfMSA9IHJlcXVpcmUoXCIuL3RhYmxlL1RhYmxlXCIpO1xuZXhwb3J0cy5UYWJsZSA9IFRhYmxlXzEuVGFibGU7XG52YXIgVGFic18xID0gcmVxdWlyZShcIi4vdGFicy9UYWJzXCIpO1xuZXhwb3J0cy5UYWIgPSBUYWJzXzEuVGFiO1xuZXhwb3J0cy5UYWJzID0gVGFic18xLlRhYnM7XG52YXIgQnVzeUluZGljYXRvcl8xID0gcmVxdWlyZShcIi4vYnVzeS1pbmRpY2F0b3IvQnVzeUluZGljYXRvclwiKTtcbmV4cG9ydHMuQnVzeUluZGljYXRvciA9IEJ1c3lJbmRpY2F0b3JfMS5CdXN5SW5kaWNhdG9yO1xuLyoganNoaW50IGlnbm9yZTplbmQgKi9cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgd21sX3J1bnRpbWVfMSA9IHJlcXVpcmUoXCJAcXVlbmsvd21sLXJ1bnRpbWVcIik7XG52YXIgdXRpbF8xID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi91dGlsXCIpO1xudmFyIGlucHV0XzEgPSByZXF1aXJlKFwiLi93bWwvaW5wdXRcIik7XG52YXIgSU5QVVRfU1VDQ0VTUyA9ICdoYXMtc3VjY2Vzcyc7XG52YXIgSU5QVVRfRVJST1IgPSAnaGFzLWVycm9yJztcbnZhciBJTlBVVF9XQVJOSU5HID0gJ2hhcy13YXJuaW5nJztcbnZhciBEZWZhdWx0SW5wdXREZWxlZ2F0ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRGVmYXVsdElucHV0RGVsZWdhdGUoaW5wdXQpIHtcbiAgICAgICAgdGhpcy5pbnB1dCA9IGlucHV0O1xuICAgIH1cbiAgICBEZWZhdWx0SW5wdXREZWxlZ2F0ZS5wcm90b3R5cGUub25JbnB1dCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHRoaXMuaW5wdXQuYXR0cmlidXRlcy5yZWFkKCd3dzpvbklucHV0JywgdXRpbF8xLm5vb3ApKGUpO1xuICAgIH07XG4gICAgcmV0dXJuIERlZmF1bHRJbnB1dERlbGVnYXRlO1xufSgpKTtcbmV4cG9ydHMuRGVmYXVsdElucHV0RGVsZWdhdGUgPSBEZWZhdWx0SW5wdXREZWxlZ2F0ZTtcbi8qKlxuICogSW5wdXRcbiAqL1xudmFyIElucHV0ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoSW5wdXQsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gSW5wdXQoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IGlucHV0XzEuSW5wdXRWaWV3KF90aGlzKTtcbiAgICAgICAgX3RoaXMuZGVsZWdhdGUgPSBfdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmRlbGVnYXRlJywgbmV3IERlZmF1bHRJbnB1dERlbGVnYXRlKF90aGlzKSk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KElucHV0LnByb3RvdHlwZSwgXCJuYW1lXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy52aWV3Lmlkcy5pbnB1dC5uYW1lO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoSW5wdXQucHJvdG90eXBlLCBcInZhbHVlXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy52aWV3Lmlkcy5pbnB1dC52YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgSW5wdXQucHJvdG90eXBlLmluaXRpYWxWYWx1ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHJldCA9IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3YXQ6dmFsdWUnKTtcbiAgICAgICAgcmV0dXJuICh0eXBlb2YgcmV0ID09PSAnZnVuY3Rpb24nKSA/IHJldCh0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd2F0Om5hbWUnKSkgOiByZXQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBnZXRDbGFzc1xuICAgICAqL1xuICAgIElucHV0LnByb3RvdHlwZS5nZXRDbGFzcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGMgPSBcImZvcm0tZ3JvdXAgXCIgKyB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd2F0OmNsYXNzJyk7XG4gICAgICAgIGlmICghdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDptZXNzYWdlJykpXG4gICAgICAgICAgICByZXR1cm4gYztcbiAgICAgICAgcmV0dXJuIGMgKyBcIiBcIiArIHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3YXQ6dmFyaWFudCcsICdoYXMtZXJyb3InKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIHNldE1lc3NhZ2Ugc2V0cyB0aGUgbWVzc2FnZSBmb3IgdGhlIG1lc3NhZ2UgcG9ydGlvbiBvZlxuICAgICAqIHRoaXMgaW5wdXQuXG4gICAgICovXG4gICAgSW5wdXQucHJvdG90eXBlLnNldE1lc3NhZ2UgPSBmdW5jdGlvbiAobXNnKSB7XG4gICAgICAgIGlmIChtc2cgPT09IHZvaWQgMCkgeyBtc2cgPSAnJzsgfVxuICAgICAgICB2YXIgbWVzc2FnZSA9IHRoaXMudmlldy5pZHMubWVzc2FnZTtcbiAgICAgICAgdmFyIG5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShtc2cpO1xuICAgICAgICBpZiAobWVzc2FnZS5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICBtZXNzYWdlLnJlcGxhY2VDaGlsZChub2RlLCBtZXNzYWdlLmZpcnN0Q2hpbGQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbWVzc2FnZS5hcHBlbmRDaGlsZChub2RlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogaXNGaWxsZWQgdGVsbHMgaWYgdGhpcyBJbnB1dCBoYXMgYSBmaWxsZWQgdmFsdWUuXG4gICAgICovXG4gICAgSW5wdXQucHJvdG90eXBlLmlzRmlsbGVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gKHRoaXMudmlldy5pZHMuaW5wdXQudmFsdWUgIT0gbnVsbCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBpc1JlcXVpcmVkIHRlbGxzIGlmIHRoZSBJbnB1dCB3YXMgcmVxdWlyZWQuXG4gICAgICovXG4gICAgSW5wdXQucHJvdG90eXBlLmlzUmVxdWlyZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OnJlcXVpcmVkJykgIT0gbnVsbCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBpc1ZhbGlkIHF1ZXJpZXMgd2hldGhlciB0aGUgSW5wdXQgaGFzIGJlZW4gaW52YWxpZGF0ZWRcbiAgICAgKiBvciBub3QuXG4gICAgICovXG4gICAgSW5wdXQucHJvdG90eXBlLmlzVmFsaWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAodGhpcy52aWV3Lmlkcy5yb290LmNsYXNzTmFtZS5zcGxpdCgnICcpLmluZGV4T2YoSU5QVVRfRVJST1IpID09PSAtMSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiByZW1vdmVWYWxpZGF0aW9uU3RhdGUgcmVtb3ZlcyB0aGUgc3RhdGUgdmFsaWRhdGlvbiBzdGF0ZSBmcm9tIHRoZSBpbnB1dC5cbiAgICAgKi9cbiAgICBJbnB1dC5wcm90b3R5cGUucmVtb3ZlVmFsaWRhdGlvblN0YXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgaCA9IHRoaXMudmlldy5pZHMucm9vdDtcbiAgICAgICAgaC5jbGFzc0xpc3QucmVtb3ZlKElOUFVUX1NVQ0NFU1MpO1xuICAgICAgICBoLmNsYXNzTGlzdC5yZW1vdmUoSU5QVVRfRVJST1IpO1xuICAgICAgICBoLmNsYXNzTGlzdC5yZW1vdmUoSU5QVVRfV0FSTklORyk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBpbnZhbGlkYXRlIHRoaXMgSW5wdXQgd2l0aCBhbiBvcHRpb25hbCBtZXNzYWdlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlXG4gICAgICogQHJldHVybnMge0lucHV0fVxuICAgICAqL1xuICAgIElucHV0LnByb3RvdHlwZS5pbnZhbGlkYXRlID0gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcbiAgICAgICAgaWYgKG1lc3NhZ2UgPT09IHZvaWQgMCkgeyBtZXNzYWdlID0gJyc7IH1cbiAgICAgICAgdGhpcy5yZW1vdmVWYWxpZGF0aW9uU3RhdGUoKTtcbiAgICAgICAgdGhpcy5zZXRNZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgICB0aGlzLnZpZXcuaWRzLnJvb3QuY2xhc3NMaXN0LmFkZChJTlBVVF9FUlJPUik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiB2YWxpZGF0ZSB0aGlzIGlucHV0IHdpdGggYW4gb3B0aW9uYWwgbWVzc3NhZ2UuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2VcbiAgICAgKiBAcmV0dXJucyB7SW5wdXR9XG4gICAgICovXG4gICAgSW5wdXQucHJvdG90eXBlLnZhbGlkYXRlID0gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcbiAgICAgICAgaWYgKG1lc3NhZ2UgPT09IHZvaWQgMCkgeyBtZXNzYWdlID0gJyc7IH1cbiAgICAgICAgdGhpcy5yZW1vdmVWYWxpZGF0aW9uU3RhdGUoKTtcbiAgICAgICAgdGhpcy5zZXRNZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgICB0aGlzLnZpZXcuaWRzLnJvb3QuY2xhc3NMaXN0LmFkZChJTlBVVF9TVUNDRVNTKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIHdhcm4gdGhpcyBpbnB1dCB3aXRoIGFuIG9wdGlvbmFsIG1lc3NhZ2UuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2VcbiAgICAgKiBAcmV0dXJucyB7SW5wdXR9XG4gICAgICovXG4gICAgSW5wdXQucHJvdG90eXBlLndhcm4gPSBmdW5jdGlvbiAobWVzc2FnZSkge1xuICAgICAgICBpZiAobWVzc2FnZSA9PT0gdm9pZCAwKSB7IG1lc3NhZ2UgPSAnJzsgfVxuICAgICAgICB0aGlzLnJlbW92ZVZhbGlkYXRpb25TdGF0ZSgpO1xuICAgICAgICB0aGlzLnNldE1lc3NhZ2UobWVzc2FnZSk7XG4gICAgICAgIHRoaXMudmlldy5pZHMucm9vdC5jbGFzc0xpc3QuYWRkKElOUFVUX1dBUk5JTkcpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogcmVzZXQgdGhpcyBpbnB1dCB0byBhIGNsZWFuIHN0YXRlLlxuICAgICAqIFJlbW92ZXMgbWVzc2FnZXMsIHZhbGlkYXRpb24gc3RhdGUgZXRjLlxuICAgICAqIEByZXR1cm4ge0lucHV0fVxuICAgICAqL1xuICAgIElucHV0LnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHJvb3QgPSB0aGlzLnZpZXcuaWRzLnJvb3Q7XG4gICAgICAgIHZhciBtID0gdGhpcy52aWV3Lmlkcy5tZXNzYWdlO1xuICAgICAgICB0aGlzLnJlbW92ZVZhbGlkYXRpb25TdGF0ZSgpO1xuICAgICAgICB3aGlsZSAobS5maXJzdENoaWxkKVxuICAgICAgICAgICAgbS5yZW1vdmVDaGlsZChtLmZpcnN0Q2hpbGQpO1xuICAgIH07XG4gICAgcmV0dXJuIElucHV0O1xufSh3bWxfcnVudGltZV8xLkNvbXBvbmVudCkpO1xuZXhwb3J0cy5JbnB1dCA9IElucHV0O1xudmFyIFNlbGVjdCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFNlbGVjdCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBTZWxlY3QoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IGlucHV0XzEuU2VsZWN0VmlldyhfdGhpcyk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIFNlbGVjdDtcbn0oSW5wdXQpKTtcbmV4cG9ydHMuU2VsZWN0ID0gU2VsZWN0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9SW5wdXQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB3bWxfcnVudGltZV8xID0gcmVxdWlyZShcIkBxdWVuay93bWwtcnVudGltZVwiKTtcbnZhciBTdHlsZXMgPSByZXF1aXJlKFwid21sLXdpZGdldHMtY29tbW9uL1N0eWxlc1wiKTtcbmZ1bmN0aW9uIGxhYmVsKHZpZXcpIHtcbiAgICByZXR1cm4gd21sX3J1bnRpbWVfMS5ib3goW3dtbF9ydW50aW1lXzEubm9kZSgnbGFiZWwnLCB7IGh0bWw6IHsgJ2Zvcic6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzppZCcpLCAnY2xhc3MnOiBTdHlsZXMuQ09OVFJPTF9MQUJFTCB9IH0sIFt0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6bGFiZWwnKV0sIHZpZXcpXSk7XG59XG5leHBvcnRzLmxhYmVsID0gbGFiZWw7XG5mdW5jdGlvbiBtZXNzYWdlKHZpZXcpIHtcbiAgICByZXR1cm4gd21sX3J1bnRpbWVfMS5ib3goW3dtbF9ydW50aW1lXzEubm9kZSgnc3BhbicsIHsgaHRtbDogeyAnY2xhc3MnOiBcImhlbHAtYmxvY2tcIiB9LCB3bWw6IHsgJ2lkJzogXCJtZXNzYWdlXCIgfSB9LCBbdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3Om1lc3NhZ2UnLCAnJyldLCB2aWV3KV0pO1xufVxuZXhwb3J0cy5tZXNzYWdlID0gbWVzc2FnZTtcbnZhciBTZWxlY3RWaWV3ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoU2VsZWN0VmlldywgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBTZWxlY3RWaWV3KGNvbnRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29udGV4dCkgfHwgdGhpcztcbiAgICAgICAgdmFyIHZpZXcgPSBfdGhpcztcbiAgICAgICAgX3RoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogW1N0eWxlcy5GT1JNX0dST1VQLCB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6dmFyaWFudCcsICcnKV0uam9pbignLCcpIH0gfSwgW2xhYmVsLmFwcGx5KHRoaXMsIFt2aWV3LF0pLCB3bWxfcnVudGltZV8xLm5vZGUoJ3NlbGVjdCcsIHsgaHRtbDogeyAnaWQnOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6aWQnLCAnJyksICd0aXRsZSc6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzp0aXRsZScpLCAnbmFtZSc6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpuYW1lJywgdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmlkJywgJycpKSwgJ29uY2hhbmdlJzogdGhpcy5kZWxlZ2F0ZS5vbklucHV0LmJpbmQodGhpcy5kZWxlZ2F0ZSksICd2YWx1ZSc6IHRoaXMuaW5pdGlhbFZhbHVlKCksICdkaXNhYmxlZCc6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpkaXNhYmxlZCcsIG51bGwpLCAncmVhZG9ubHknOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6cmVhZG9ubHknLCBudWxsKSwgJ2NsYXNzJzogU3R5bGVzLlNFTEVDVCB9LCB3bWw6IHsgJ2lkJzogXCJpbnB1dFwiIH0gfSwgW3dtbF9ydW50aW1lXzEuZm9yRSh0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6b3B0aW9ucycsIFtdKSwgZnVuY3Rpb24gZm9yMShvcHQsIF8sIF9fKSB7IHJldHVybiB3bWxfcnVudGltZV8xLmJveChbd21sX3J1bnRpbWVfMS5pZkUodHlwZW9mIChvcHQpID09PSAnc3RyaW5nJywgZnVuY3Rpb24gaWYxKCkgeyByZXR1cm4gd21sX3J1bnRpbWVfMS5ib3goW3dtbF9ydW50aW1lXzEubm9kZSgnb3B0aW9uJywgeyBodG1sOiB7fSB9LCBbb3B0XSwgdmlldyldKTsgfS5iaW5kKHRoaXMpLCBmdW5jdGlvbiBlbHNlX2NsYXVzZTEoKSB7IHJldHVybiB3bWxfcnVudGltZV8xLmJveChbd21sX3J1bnRpbWVfMS5ub2RlKCdvcHRpb24nLCB7IGh0bWw6IHsgJ3ZhbHVlJzogb3B0LnZhbHVlIH0gfSwgW29wdC5sYWJlbF0sIHZpZXcpXSk7IH0uYmluZCh0aGlzKSldKTsgfS5iaW5kKHRoaXMpLCBmdW5jdGlvbiBvdGhlcndpc2UxKCkgeyByZXR1cm4gd21sX3J1bnRpbWVfMS5ib3goW3dtbF9ydW50aW1lXzEubm9kZSgncCcsIHsgaHRtbDoge30gfSwgW10sIHZpZXcpXSk7IH0uYmluZCh0aGlzKSldLCB2aWV3KSwgbWVzc2FnZS5hcHBseSh0aGlzLCBbdmlldyxdKV0sIHZpZXcpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBTZWxlY3RWaWV3O1xufSh3bWxfcnVudGltZV8xLkFwcFZpZXcpKTtcbmV4cG9ydHMuU2VsZWN0VmlldyA9IFNlbGVjdFZpZXc7XG52YXIgSW5wdXRWaWV3ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoSW5wdXRWaWV3LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIElucHV0Vmlldyhjb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbnRleHQpIHx8IHRoaXM7XG4gICAgICAgIHZhciB2aWV3ID0gX3RoaXM7XG4gICAgICAgIF90aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6IFtTdHlsZXMuRk9STV9HUk9VUCwgdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OnZhcmlhbnQnLCAnJyldLmpvaW4oJywnKSB9IH0sIFtsYWJlbC5hcHBseSh0aGlzLCBbdmlldyxdKSwgd21sX3J1bnRpbWVfMS5pZkUodGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OnR5cGUnLCAndGV4dCcpICE9PSAndGV4dGFyZWEnLCBmdW5jdGlvbiBpZjIoKSB7IHJldHVybiB3bWxfcnVudGltZV8xLmJveChbd21sX3J1bnRpbWVfMS5ub2RlKCdpbnB1dCcsIHsgaHRtbDogeyAnaWQnOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6aWQnLCAnJyksICd0aXRsZSc6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzp0aXRsZScpLCAnbmFtZSc6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpuYW1lJywgdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmlkJywgJycpKSwgJ3R5cGUnOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6dHlwZScsICd0ZXh0JyksICdwbGFjZWhvbGRlcic6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpwbGFjZWhvbGRlcicpLCAnb25pbnB1dCc6IHRoaXMuZGVsZWdhdGUub25JbnB1dC5iaW5kKHRoaXMuZGVsZWdhdGUpLCAndmFsdWUnOiB0aGlzLmluaXRpYWxWYWx1ZSgpLCAnZGlzYWJsZWQnOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6ZGlzYWJsZWQnLCBudWxsKSwgJ3JlYWRvbmx5JzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OnJlYWRvbmx5JywgbnVsbCksICdjbGFzcyc6IFN0eWxlcy5JTlBVVCB9LCB3bWw6IHsgJ2lkJzogXCJpbnB1dFwiIH0gfSwgW10sIHZpZXcpXSk7IH0uYmluZCh0aGlzKSwgZnVuY3Rpb24gZWxzZV9jbGF1c2UyKCkgeyByZXR1cm4gd21sX3J1bnRpbWVfMS5ib3goW3dtbF9ydW50aW1lXzEubm9kZSgndGV4dGFyZWEnLCB7IGh0bWw6IHsgJ2lkJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmlkJywgJycpLCAndGl0bGUnOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6dGl0bGUnKSwgJ25hbWUnOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6bmFtZScsIHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzppZCcsICcnKSksICdjbGFzcyc6IFN0eWxlcy5URVhUQVJFQSwgJ3BsYWNlaG9sZGVyJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OnBsYWNlaG9sZGVyJyksICdvbmlucHV0JzogdGhpcy5kZWxlZ2F0ZS5vbklucHV0LmJpbmQodGhpcy5kZWxlZ2F0ZSksICdkaXNhYmxlZCc6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpkaXNhYmxlZCcsIG51bGwpLCAncmVhZG9ubHknOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6cmVhZG9ubHknLCBudWxsKSwgJ3Jvd3MnOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd2F0OnJvd3MnKSB9LCB3bWw6IHsgJ2lkJzogXCJpbnB1dFwiIH0gfSwgW3RoaXMuaW5pdGlhbFZhbHVlKCldLCB2aWV3KV0pOyB9LmJpbmQodGhpcykpLCBtZXNzYWdlLmFwcGx5KHRoaXMsIFt2aWV3LF0pXSwgdmlldyk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIElucHV0Vmlldztcbn0od21sX3J1bnRpbWVfMS5BcHBWaWV3KSk7XG5leHBvcnRzLklucHV0VmlldyA9IElucHV0Vmlldztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlucHV0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgd21sX3J1bnRpbWVfMSA9IHJlcXVpcmUoXCJAcXVlbmsvd21sLXJ1bnRpbWVcIik7XG52YXIgdXRpbF8xID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi91dGlsXCIpO1xudmFyIG1haW5fdmlld18xID0gcmVxdWlyZShcIi4vd21sL21haW4tdmlld1wiKTtcbi8qKlxuICogTWFpblZpZXcgcHJvdmlkZXMgYSBjb250YWluZXIgZm9yIHRoZSBtYWluIGNvbnRlbnQgb2YgYW4gYXBwbGljYXRpb24uXG4gKi9cbnZhciBNYWluVmlldyA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKE1haW5WaWV3LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIE1haW5WaWV3KCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMudmlldyA9IG5ldyBtYWluX3ZpZXdfMS5NYWluKF90aGlzKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBzZXRDb250ZW50IHJlcGxhY2VzIHRoZSBjb250ZW50IG9mIHRoaXMgdmlldy5cbiAgICAgKi9cbiAgICBNYWluVmlldy5wcm90b3R5cGUuc2V0Q29udGVudCA9IGZ1bmN0aW9uIChyKSB7XG4gICAgICAgIHV0aWxfMS5yZXBsYWNlQ29udGVudChyLCB0aGlzLnZpZXcuZmluZEJ5SWQoJ2NvbnRlbnQnKSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgcmV0dXJuIE1haW5WaWV3O1xufSh3bWxfcnVudGltZV8xLkNvbXBvbmVudCkpO1xuZXhwb3J0cy5NYWluVmlldyA9IE1haW5WaWV3O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9TWFpblZpZXcuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB3bWxfcnVudGltZV8xID0gcmVxdWlyZShcIkBxdWVuay93bWwtcnVudGltZVwiKTtcbnZhciBTdHlsZXMgPSByZXF1aXJlKFwid21sLXdpZGdldHMtY29tbW9uL1N0eWxlc1wiKTtcbnZhciB1dGlsXzEgPSByZXF1aXJlKFwid21sLXdpZGdldHMtY29tbW9uL3V0aWxcIik7XG52YXIgTWFpbiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKE1haW4sIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gTWFpbihjb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbnRleHQpIHx8IHRoaXM7XG4gICAgICAgIHZhciB2aWV3ID0gX3RoaXM7XG4gICAgICAgIF90aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6IHV0aWxfMS5jb21iaW5lKFtTdHlsZXMuTUFJTl9WSUVXLCBTdHlsZXMuRFJBV0VSX1BVU0hBQkxFLCB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6Y2xhc3MnLCAnJyldKSB9IH0sIFt0aGlzLmNoaWxkcmVuXSwgdmlldyk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIE1haW47XG59KHdtbF9ydW50aW1lXzEuQXBwVmlldykpO1xuZXhwb3J0cy5NYWluID0gTWFpbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1haW4tdmlldy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHdtbF9ydW50aW1lXzEgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC1ydW50aW1lXCIpO1xudmFyIG1lbnVfYnV0dG9uXzEgPSByZXF1aXJlKFwiLi93bWwvbWVudV9idXR0b25cIik7XG4vKipcbiAqIE1lbnVCdXR0b24gcHJvdmlkZXMgYSAnaGFtYnVyZ2VyJyBtZW51IGJ1dHRvbi5cbiAqL1xudmFyIE1lbnVCdXR0b24gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhNZW51QnV0dG9uLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIE1lbnVCdXR0b24oKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IG1lbnVfYnV0dG9uXzEuTWFpbihfdGhpcyk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIE1lbnVCdXR0b247XG59KHdtbF9ydW50aW1lXzEuQ29tcG9uZW50KSk7XG5leHBvcnRzLk1lbnVCdXR0b24gPSBNZW51QnV0dG9uO1xuZXhwb3J0cy5kZWZhdWx0ID0gTWVudUJ1dHRvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPU1lbnVCdXR0b24uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB3bWxfcnVudGltZV8xID0gcmVxdWlyZShcIkBxdWVuay93bWwtcnVudGltZVwiKTtcbnZhciBTdHlsZSA9IHJlcXVpcmUoXCJ3bWwtd2lkZ2V0cy1jb21tb24vU3R5bGVzXCIpO1xudmFyIHV0aWxfMSA9IHJlcXVpcmUoXCJ3bWwtd2lkZ2V0cy1jb21tb24vdXRpbFwiKTtcbnZhciBNYWluID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoTWFpbiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBNYWluKGNvbnRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29udGV4dCkgfHwgdGhpcztcbiAgICAgICAgdmFyIHZpZXcgPSBfdGhpcztcbiAgICAgICAgX3RoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCdidXR0b24nLCB7IGh0bWw6IHsgJ2NsYXNzJzogU3R5bGUuTUVOVV9CVVRUT04sICdvbmNsaWNrJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3Om9uQ2xpY2snLCB1dGlsXzEubm9vcCkgfSB9LCBbd21sX3J1bnRpbWVfMS5ub2RlKCdzcGFuJywgeyBodG1sOiB7ICdjbGFzcyc6IFwiXCIgfSB9LCBbXSwgdmlldyksIHdtbF9ydW50aW1lXzEubm9kZSgnc3BhbicsIHsgaHRtbDogeyAnY2xhc3MnOiBcIlwiIH0gfSwgW10sIHZpZXcpLCB3bWxfcnVudGltZV8xLm5vZGUoJ3NwYW4nLCB7IGh0bWw6IHsgJ2NsYXNzJzogXCJcIiB9IH0sIFtdLCB2aWV3KV0sIHZpZXcpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBNYWluO1xufSh3bWxfcnVudGltZV8xLkFwcFZpZXcpKTtcbmV4cG9ydHMuTWFpbiA9IE1haW47XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tZW51X2J1dHRvbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHdtbF9ydW50aW1lXzEgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC1ydW50aW1lXCIpO1xudmFyIHZpZXdzID0gcmVxdWlyZShcIi4vd21sL21vZGFsXCIpO1xuLyoqXG4gKiBNb2RhbFxuICovXG52YXIgTW9kYWwgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhNb2RhbCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBNb2RhbCgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnZpZXcgPSBuZXcgdmlld3MuTW9kYWwoX3RoaXMpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIGNsb3NlIHRoZSBtb2RhbC5cbiAgICAgKi9cbiAgICBNb2RhbC5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBtID0gdGhpcy52aWV3LmZpbmRCeUlkKCdtb2RhbCcpO1xuICAgICAgICBtLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobSk7XG4gICAgfTtcbiAgICBNb2RhbC5wcm90b3R5cGUucGxhY2UgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICB3aGlsZSAoZS5maXJzdENoaWxkICE9IG51bGwpXG4gICAgICAgICAgICBlLnJlbW92ZUNoaWxkKGUuZmlyc3RDaGlsZCk7XG4gICAgICAgIGUuYXBwZW5kQ2hpbGQodGhpcy5yZW5kZXIoKSk7XG4gICAgfTtcbiAgICByZXR1cm4gTW9kYWw7XG59KHdtbF9ydW50aW1lXzEuQ29tcG9uZW50KSk7XG5leHBvcnRzLk1vZGFsID0gTW9kYWw7XG4vKipcbiAqIEhlYWRlclxuICovXG52YXIgSGVhZGVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoSGVhZGVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEhlYWRlcigpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnZpZXcgPSBuZXcgdmlld3MuSGVhZGVyKF90aGlzKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gSGVhZGVyO1xufSh3bWxfcnVudGltZV8xLkNvbXBvbmVudCkpO1xuZXhwb3J0cy5IZWFkZXIgPSBIZWFkZXI7XG4vKipcbiAqIEJvZHlcbiAqL1xudmFyIEJvZHkgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhCb2R5LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEJvZHkoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IHZpZXdzLkJvZHkoX3RoaXMpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBCb2R5O1xufSh3bWxfcnVudGltZV8xLkNvbXBvbmVudCkpO1xuZXhwb3J0cy5Cb2R5ID0gQm9keTtcbi8qKlxuICogRm9vdGVyXG4gKi9cbnZhciBGb290ZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhGb290ZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gRm9vdGVyKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMudmlldyA9IG5ldyB2aWV3cy5Gb290ZXIoX3RoaXMpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBGb290ZXI7XG59KHdtbF9ydW50aW1lXzEuQ29tcG9uZW50KSk7XG5leHBvcnRzLkZvb3RlciA9IEZvb3Rlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPU1vZGFsLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgd21sX3J1bnRpbWVfMSA9IHJlcXVpcmUoXCJAcXVlbmsvd21sLXJ1bnRpbWVcIik7XG52YXIgU3R5bGVzID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi9TdHlsZXNcIik7XG52YXIgdXRpbF8xID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi91dGlsXCIpO1xudmFyIE1vZGFsID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoTW9kYWwsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gTW9kYWwoY29udGV4dCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBjb250ZXh0KSB8fCB0aGlzO1xuICAgICAgICB2YXIgdmlldyA9IF90aGlzO1xuICAgICAgICBfdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB3bWxfcnVudGltZV8xLm5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiBTdHlsZXMuTU9EQUwsICd0YWJpbmRleCc6IFwiLTFcIiwgJ3JvbGUnOiBcImRpYWxvZ1wiIH0sIHdtbDogeyAnaWQnOiBcIm1vZGFsXCIgfSB9LCBbd21sX3J1bnRpbWVfMS5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogU3R5bGVzLk1PREFMX0RJQUxPRywgJ3JvbGUnOiBcImRvY3VtZW50XCIgfSB9LCBbd21sX3J1bnRpbWVfMS5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogU3R5bGVzLk1PREFMX0NPTlRFTlQgfSwgd21sOiB7ICdpZCc6IFwiY29udGVudFwiIH0gfSwgW3RoaXMuY2hpbGRyZW5dLCB2aWV3KV0sIHZpZXcpXSwgdmlldyk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIE1vZGFsO1xufSh3bWxfcnVudGltZV8xLkFwcFZpZXcpKTtcbmV4cG9ydHMuTW9kYWwgPSBNb2RhbDtcbnZhciBIZWFkZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhIZWFkZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gSGVhZGVyKGNvbnRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29udGV4dCkgfHwgdGhpcztcbiAgICAgICAgdmFyIHZpZXcgPSBfdGhpcztcbiAgICAgICAgX3RoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogU3R5bGVzLk1PREFMX0hFQURFUiB9IH0sIFt3bWxfcnVudGltZV8xLm5vZGUoJ2J1dHRvbicsIHsgaHRtbDogeyAndHlwZSc6IFwiYnV0dG9uXCIsICdjbGFzcyc6IFwiY2xvc2VcIiwgJ2FyaWEtbGFiZWwnOiBcIkNsb3NlXCIsICdvbmNsaWNrJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3Om9uQ2xvc2UnLCB1dGlsXzEubm9vcCkgfSB9LCBbd21sX3J1bnRpbWVfMS5ub2RlKCdzcGFuJywgeyBodG1sOiB7ICdhcmlhLWhpZGRlbic6IFwidHJ1ZVwiIH0gfSwgW3dtbF9ydW50aW1lXzEudGV4dChcIlxcdTAwRDdcIildLCB2aWV3KV0sIHZpZXcpLCB0aGlzLmNoaWxkcmVuXSwgdmlldyk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIEhlYWRlcjtcbn0od21sX3J1bnRpbWVfMS5BcHBWaWV3KSk7XG5leHBvcnRzLkhlYWRlciA9IEhlYWRlcjtcbnZhciBCb2R5ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQm9keSwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBCb2R5KGNvbnRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29udGV4dCkgfHwgdGhpcztcbiAgICAgICAgdmFyIHZpZXcgPSBfdGhpcztcbiAgICAgICAgX3RoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogU3R5bGVzLk1PREFMX0JPRFkgfSB9LCBbdGhpcy5jaGlsZHJlbl0sIHZpZXcpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBCb2R5O1xufSh3bWxfcnVudGltZV8xLkFwcFZpZXcpKTtcbmV4cG9ydHMuQm9keSA9IEJvZHk7XG52YXIgRm9vdGVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoRm9vdGVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEZvb3Rlcihjb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbnRleHQpIHx8IHRoaXM7XG4gICAgICAgIHZhciB2aWV3ID0gX3RoaXM7XG4gICAgICAgIF90aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6IFN0eWxlcy5NT0RBTF9GT09URVIgfSB9LCBbdGhpcy5jaGlsZHJlbl0sIHZpZXcpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBGb290ZXI7XG59KHdtbF9ydW50aW1lXzEuQXBwVmlldykpO1xuZXhwb3J0cy5Gb290ZXIgPSBGb290ZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tb2RhbC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHdtbF9ydW50aW1lXzEgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC1ydW50aW1lXCIpO1xudmFyIHZpZXdzID0gcmVxdWlyZShcIi4vd21sL3BhbmVsXCIpO1xudmFyIFBhbmVsID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoUGFuZWwsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gUGFuZWwoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IHZpZXdzLlBhbmVsKF90aGlzKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gUGFuZWw7XG59KHdtbF9ydW50aW1lXzEuQ29tcG9uZW50KSk7XG5leHBvcnRzLlBhbmVsID0gUGFuZWw7XG52YXIgSGVhZGVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoSGVhZGVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEhlYWRlcigpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnZpZXcgPSBuZXcgdmlld3MuSGVhZGVyKF90aGlzKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gSGVhZGVyO1xufSh3bWxfcnVudGltZV8xLkNvbXBvbmVudCkpO1xuZXhwb3J0cy5IZWFkZXIgPSBIZWFkZXI7XG52YXIgQm9keSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEJvZHksIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQm9keSgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnZpZXcgPSBuZXcgdmlld3MuQm9keShfdGhpcyk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIEJvZHk7XG59KHdtbF9ydW50aW1lXzEuQ29tcG9uZW50KSk7XG5leHBvcnRzLkJvZHkgPSBCb2R5O1xudmFyIEZvb3RlciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEZvb3RlciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBGb290ZXIoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IHZpZXdzLkZvb3RlcihfdGhpcyk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIEZvb3Rlcjtcbn0od21sX3J1bnRpbWVfMS5Db21wb25lbnQpKTtcbmV4cG9ydHMuRm9vdGVyID0gRm9vdGVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9UGFuZWwuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB3bWxfcnVudGltZV8xID0gcmVxdWlyZShcIkBxdWVuay93bWwtcnVudGltZVwiKTtcbnZhciBTdHlsZXMgPSByZXF1aXJlKFwid21sLXdpZGdldHMtY29tbW9uL1N0eWxlc1wiKTtcbnZhciB1dGlsXzEgPSByZXF1aXJlKFwid21sLXdpZGdldHMtY29tbW9uL3V0aWxcIik7XG52YXIgUGFuZWwgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhQYW5lbCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBQYW5lbChjb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbnRleHQpIHx8IHRoaXM7XG4gICAgICAgIHZhciB2aWV3ID0gX3RoaXM7XG4gICAgICAgIF90aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6IHV0aWxfMS5jb21iaW5lKFtTdHlsZXMuUEFORUwsIHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpzdHlsZScsIFN0eWxlcy5ERUZBVUxUKV0pIH0gfSwgW3RoaXMuY2hpbGRyZW5dLCB2aWV3KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gUGFuZWw7XG59KHdtbF9ydW50aW1lXzEuQXBwVmlldykpO1xuZXhwb3J0cy5QYW5lbCA9IFBhbmVsO1xudmFyIEhlYWRlciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEhlYWRlciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBIZWFkZXIoY29udGV4dCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBjb250ZXh0KSB8fCB0aGlzO1xuICAgICAgICB2YXIgdmlldyA9IF90aGlzO1xuICAgICAgICBfdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB3bWxfcnVudGltZV8xLm5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiBTdHlsZXMuUEFORUxfSEVBREVSIH0gfSwgW3RoaXMuY2hpbGRyZW5dLCB2aWV3KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gSGVhZGVyO1xufSh3bWxfcnVudGltZV8xLkFwcFZpZXcpKTtcbmV4cG9ydHMuSGVhZGVyID0gSGVhZGVyO1xudmFyIEJvZHkgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhCb2R5LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEJvZHkoY29udGV4dCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBjb250ZXh0KSB8fCB0aGlzO1xuICAgICAgICB2YXIgdmlldyA9IF90aGlzO1xuICAgICAgICBfdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB3bWxfcnVudGltZV8xLm5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiBTdHlsZXMuUEFORUxfQk9EWSB9IH0sIFt0aGlzLmNoaWxkcmVuXSwgdmlldyk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIEJvZHk7XG59KHdtbF9ydW50aW1lXzEuQXBwVmlldykpO1xuZXhwb3J0cy5Cb2R5ID0gQm9keTtcbnZhciBGb290ZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhGb290ZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gRm9vdGVyKGNvbnRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29udGV4dCkgfHwgdGhpcztcbiAgICAgICAgdmFyIHZpZXcgPSBfdGhpcztcbiAgICAgICAgX3RoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogU3R5bGVzLlBBTkVMX0ZPT1RFUiB9IH0sIFt0aGlzLmNoaWxkcmVuXSwgdmlldyk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIEZvb3Rlcjtcbn0od21sX3J1bnRpbWVfMS5BcHBWaWV3KSk7XG5leHBvcnRzLkZvb3RlciA9IEZvb3Rlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBhbmVsLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgd21sX3J1bnRpbWVfMSA9IHJlcXVpcmUoXCJAcXVlbmsvd21sLXJ1bnRpbWVcIik7XG52YXIgc3dpdGNoXzEgPSByZXF1aXJlKFwiLi93bWwvc3dpdGNoXCIpO1xuLyoqXG4gKiBTd2l0Y2hcbiAqL1xudmFyIFN3aXRjaCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFN3aXRjaCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBTd2l0Y2goKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IHN3aXRjaF8xLk1haW4oX3RoaXMpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBTd2l0Y2g7XG59KHdtbF9ydW50aW1lXzEuQ29tcG9uZW50KSk7XG5leHBvcnRzLlN3aXRjaCA9IFN3aXRjaDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVN3aXRjaC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHdtbF9ydW50aW1lXzEgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC1ydW50aW1lXCIpO1xudmFyIFN0eWxlcyA9IHJlcXVpcmUoXCJ3bWwtd2lkZ2V0cy1jb21tb24vU3R5bGVzXCIpO1xudmFyIHV0aWxfMSA9IHJlcXVpcmUoXCJ3bWwtd2lkZ2V0cy1jb21tb24vdXRpbFwiKTtcbnZhciBNYWluID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoTWFpbiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBNYWluKGNvbnRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29udGV4dCkgfHwgdGhpcztcbiAgICAgICAgdmFyIHZpZXcgPSBfdGhpcztcbiAgICAgICAgX3RoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCdsYWJlbCcsIHsgaHRtbDogeyAnY2xhc3MnOiBTdHlsZXMuU1dJVENIIH0gfSwgW3dtbF9ydW50aW1lXzEubm9kZSgnaW5wdXQnLCB7IGh0bWw6IHsgJ3R5cGUnOiBcImNoZWNrYm94XCIsICduYW1lJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3Om5hbWUnKSwgJ3ZhbHVlJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OnZhbHVlJyksICdvbmNoYW5nZSc6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpvbkNoYW5nZScsIHV0aWxfMS5ub29wKSB9IH0sIFtdLCB2aWV3KSwgd21sX3J1bnRpbWVfMS5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogU3R5bGVzLlNXSVRDSF9TTElERVIgfSB9LCBbXSwgdmlldyksIHRoaXMuY2hpbGRyZW5dLCB2aWV3KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gTWFpbjtcbn0od21sX3J1bnRpbWVfMS5BcHBWaWV3KSk7XG5leHBvcnRzLk1haW4gPSBNYWluO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3dpdGNoLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgcHJvcGVydHlfc2Vla18xID0gcmVxdWlyZShcInByb3BlcnR5LXNlZWtcIik7XG52YXIgd21sX3J1bnRpbWVfMSA9IHJlcXVpcmUoXCJAcXVlbmsvd21sLXJ1bnRpbWVcIik7XG52YXIgdGFibGVfMSA9IHJlcXVpcmUoXCIuL3dtbC90YWJsZVwiKTtcbnZhciBBU0NfQVJST1cgPSAnXFx1MjFlNyc7XG52YXIgREVTQ19BUlJPVyA9ICdcXHUyMWU5JztcbmV4cG9ydHMuZGF0ZVNvcnQgPSBmdW5jdGlvbiAoYSwgYikge1xuICAgIGEgPSBuZXcgRGF0ZShhKS5nZXRUaW1lKCk7XG4gICAgYiA9IG5ldyBEYXRlKGIpLmdldFRpbWUoKTtcbiAgICByZXR1cm4gYSA+IGIgPyAtMSA6IGEgPCBiID8gMSA6IDA7XG59O1xuZXhwb3J0cy5zdHJpbmdTb3J0ID0gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICBpZiAodHlwZW9mIGEgPT09ICdzdHJpbmcnKVxuICAgICAgICBhID0gYS5yZXBsYWNlKC9cXHMrLywgJycpLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKHR5cGVvZiBiID09PSAnc3RyaW5nJylcbiAgICAgICAgYiA9IGIucmVwbGFjZSgvXFxzKy8sICcnKS50b0xvd2VyQ2FzZSgpO1xuICAgIHJldHVybiAoYSA+IGIpID8gLTEgOiAoYSA8IGIpID8gMSA6IDA7XG59O1xuZXhwb3J0cy5uYXR1cmFsU29ydCA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgLy9Tb3VyY2U6IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNDM0MDIyNy9zb3J0LW1peGVkLWFscGhhLW51bWVyaWMtYXJyYXlcbiAgICB2YXIgcmVBID0gL1teYS16QS1aXS9nO1xuICAgIHZhciByZU4gPSAvW14wLTldL2c7XG4gICAgdmFyIEFJbnQgPSBwYXJzZUludChhLCAxMCk7XG4gICAgdmFyIEJJbnQgPSBwYXJzZUludChiLCAxMCk7XG4gICAgaWYgKGlzTmFOKEFJbnQpICYmIGlzTmFOKEJJbnQpKSB7XG4gICAgICAgIHZhciBhQSA9IGEucmVwbGFjZShyZUEsICcnKTtcbiAgICAgICAgdmFyIGJBID0gYi5yZXBsYWNlKHJlQSwgJycpO1xuICAgICAgICBpZiAoYUEgPT09IGJBKSB7XG4gICAgICAgICAgICB2YXIgYU4gPSBwYXJzZUludChhLnJlcGxhY2UocmVOLCAnJyksIDEwKTtcbiAgICAgICAgICAgIHZhciBiTiA9IHBhcnNlSW50KGIucmVwbGFjZShyZU4sICcnKSwgMTApO1xuICAgICAgICAgICAgcmV0dXJuIGFOID09PSBiTiA/IDAgOiBhTiA+IGJOID8gLTEgOiAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGFBID4gYkEgPyAtMSA6IDE7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoaXNOYU4oQUludCkpIHtcbiAgICAgICAgcmV0dXJuIC0xOyAvL3RvIG1ha2UgYWxwaGFudW1lcmljIHNvcnQgZmlyc3QgcmV0dXJuIC0xIGhlcmVcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNOYU4oQkludCkpIHtcbiAgICAgICAgcmV0dXJuIDE7IC8vdG8gbWFrZSBhbHBoYW51bWVyaWMgc29ydCBmaXJzdCByZXR1cm4gMSBoZXJlXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gQUludCA+IEJJbnQgPyAtMSA6IDE7XG4gICAgfVxufTtcbmV4cG9ydHMubnVtYmVyU29ydCA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgYSA9IHBhcnNlRmxvYXQoYSk7XG4gICAgYiA9IHBhcnNlRmxvYXQoYik7XG4gICAgYSA9IChpc05hTihhKSkgPyAtSW5maW5pdHkgOiBhO1xuICAgIGIgPSAoaXNOYU4oYikpID8gLUluZmluaXR5IDogYjtcbiAgICByZXR1cm4gKGEgPiBiKSA/IC0xIDogKGEgPCBiKSA/IDEgOiAwO1xufTtcbnZhciBIZWFkaW5nQ2xpY2tlZEV2ZW50ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBIZWFkaW5nQ2xpY2tlZEV2ZW50KG5hbWUsIGZpZWxkLCB0YWJsZSkge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLmZpZWxkID0gZmllbGQ7XG4gICAgICAgIHRoaXMudGFibGUgPSB0YWJsZTtcbiAgICB9XG4gICAgcmV0dXJuIEhlYWRpbmdDbGlja2VkRXZlbnQ7XG59KCkpO1xuZXhwb3J0cy5IZWFkaW5nQ2xpY2tlZEV2ZW50ID0gSGVhZGluZ0NsaWNrZWRFdmVudDtcbnZhciBSb3dDbGlja2VkRXZlbnQgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFJvd0NsaWNrZWRFdmVudCh2YWx1ZSwgaW5kZXgsIGRhdGEsIHRhYmxlKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5pbmRleCA9IGluZGV4O1xuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgICAgICB0aGlzLnRhYmxlID0gdGFibGU7XG4gICAgfVxuICAgIHJldHVybiBSb3dDbGlja2VkRXZlbnQ7XG59KCkpO1xuZXhwb3J0cy5Sb3dDbGlja2VkRXZlbnQgPSBSb3dDbGlja2VkRXZlbnQ7XG52YXIgUm93U2VsZWN0ZWRFdmVudCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFJvd1NlbGVjdGVkRXZlbnQsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gUm93U2VsZWN0ZWRFdmVudCgpIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgIH1cbiAgICByZXR1cm4gUm93U2VsZWN0ZWRFdmVudDtcbn0oUm93Q2xpY2tlZEV2ZW50KSk7XG5leHBvcnRzLlJvd1NlbGVjdGVkRXZlbnQgPSBSb3dTZWxlY3RlZEV2ZW50O1xudmFyIENlbGxDbGlja2VkRXZlbnQgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENlbGxDbGlja2VkRXZlbnQodmFsdWUsIG5hbWUsIGluZGV4LCBvYmplY3QsIHRhYmxlKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5pbmRleCA9IGluZGV4O1xuICAgICAgICB0aGlzLm9iamVjdCA9IG9iamVjdDtcbiAgICAgICAgdGhpcy50YWJsZSA9IHRhYmxlO1xuICAgIH1cbiAgICByZXR1cm4gQ2VsbENsaWNrZWRFdmVudDtcbn0oKSk7XG5leHBvcnRzLkNlbGxDbGlja2VkRXZlbnQgPSBDZWxsQ2xpY2tlZEV2ZW50O1xudmFyIERlZmF1bHRUYWJsZU1vZGVsID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEZWZhdWx0VGFibGVNb2RlbCgpIHtcbiAgICB9XG4gICAgRGVmYXVsdFRhYmxlTW9kZWwucHJvdG90eXBlLmFsbFNlbGVjdGVkID0gZnVuY3Rpb24gKCkgeyB9O1xuICAgIERlZmF1bHRUYWJsZU1vZGVsLnByb3RvdHlwZS5oZWFkaW5nQ2xpY2tlZCA9IGZ1bmN0aW9uIChfZSkgeyB9O1xuICAgIERlZmF1bHRUYWJsZU1vZGVsLnByb3RvdHlwZS5yb3dDbGlja2VkID0gZnVuY3Rpb24gKF9lKSB7IH07XG4gICAgRGVmYXVsdFRhYmxlTW9kZWwucHJvdG90eXBlLnJvd1NlbGVjdGVkID0gZnVuY3Rpb24gKF9lKSB7IH07XG4gICAgcmV0dXJuIERlZmF1bHRUYWJsZU1vZGVsO1xufSgpKTtcbmV4cG9ydHMuRGVmYXVsdFRhYmxlTW9kZWwgPSBEZWZhdWx0VGFibGVNb2RlbDtcbnZhciBTb3J0VGFibGVNb2RlbCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFNvcnRUYWJsZU1vZGVsLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFNvcnRUYWJsZU1vZGVsKCkge1xuICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgfVxuICAgIFNvcnRUYWJsZU1vZGVsLnByb3RvdHlwZS5oZWFkaW5nQ2xpY2tlZCA9IGZ1bmN0aW9uIChlKSB7IGUudGFibGUuc29ydChlLm5hbWUpOyB9O1xuICAgIHJldHVybiBTb3J0VGFibGVNb2RlbDtcbn0oRGVmYXVsdFRhYmxlTW9kZWwpKTtcbmV4cG9ydHMuU29ydFRhYmxlTW9kZWwgPSBTb3J0VGFibGVNb2RlbDtcbnZhciBUYWJsZSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFRhYmxlLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFRhYmxlKGEsIGMpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgYSwgYykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuc29ydGVkT24gPSAnJztcbiAgICAgICAgX3RoaXMuYXJyb3cgPSAnJztcbiAgICAgICAgX3RoaXMudmlldyA9IG5ldyB0YWJsZV8xLlRhYmxlVmlldyhfdGhpcyk7XG4gICAgICAgIF90aGlzLm9yaWdpbmFsRGF0YSA9IGEucmVhZCgnd3c6ZGF0YScsIFtdKTtcbiAgICAgICAgX3RoaXMuZGF0YSA9IF90aGlzLm9yaWdpbmFsRGF0YS5zbGljZSgpO1xuICAgICAgICBfdGhpcy5tb2RlbCA9IGEucmVhZCgnd3c6bW9kZWwnLCBuZXcgRGVmYXVsdFRhYmxlTW9kZWwoKSk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgVGFibGUucHJvdG90eXBlLnNvcnQgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICB2YXIgZGF0YTtcbiAgICAgICAgdmFyIGJvZHkgPSB0aGlzLnZpZXcuZmluZEJ5SWQoJ2JvZHknKTtcbiAgICAgICAgdmFyIGhlYWQgPSB0aGlzLnZpZXcuZmluZEJ5SWQoJ2hlYWQnKTtcbiAgICAgICAgdmFyIGZpZWxkID0gdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmZpZWxkcycsIFtdKS5yZWR1Y2UoZnVuY3Rpb24gKHAsIGMpIHsgcmV0dXJuIHAgPyBwIDogKGMubmFtZSA9PT0gbmFtZSA/IGMgOiBudWxsKTsgfSk7XG4gICAgICAgIHZhciBzb3J0T247XG4gICAgICAgIHZhciBzdHJhdGVneTtcbiAgICAgICAgaWYgKCFmaWVsZClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRhYmxlI3NvcnQ6IHVua25vd24gZmllbGQgJ1wiICsgbmFtZSArIFwiJ1wiKTtcbiAgICAgICAgc29ydE9uID0gZmllbGQuc29ydE9uIHx8IG5hbWU7XG4gICAgICAgIHN0cmF0ZWd5ID0gZmllbGQuc3RyYXRlZ3kgfHwgZXhwb3J0cy5zdHJpbmdTb3J0O1xuICAgICAgICBpZiAodGhpcy5zb3J0ZWRPbiA9PT0gbmFtZSkge1xuICAgICAgICAgICAgdGhpcy5kYXRhID0gdGhpcy5kYXRhLnJldmVyc2UoKTtcbiAgICAgICAgICAgIHRoaXMuYXJyb3cgPSAodGhpcy5hcnJvdyA9PT0gQVNDX0FSUk9XKSA/IERFU0NfQVJST1cgOiBBU0NfQVJST1c7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmFycm93ID0gREVTQ19BUlJPVztcbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IHRoaXNcbiAgICAgICAgICAgICAgICAub3JpZ2luYWxEYXRhXG4gICAgICAgICAgICAgICAgLnNsaWNlKClcbiAgICAgICAgICAgICAgICAuc29ydChmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gc3RyYXRlZ3kocHJvcGVydHlfc2Vla18xLmRlZmF1bHQoc29ydE9uLCBhKSwgcHJvcGVydHlfc2Vla18xLmRlZmF1bHQoc29ydE9uLCBiKSk7IH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc29ydGVkT24gPSBuYW1lO1xuICAgICAgICB0aGlzLnZpZXcuaW52YWxpZGF0ZSgpO1xuICAgIH07XG4gICAgcmV0dXJuIFRhYmxlO1xufSh3bWxfcnVudGltZV8xLkNvbXBvbmVudCkpO1xuZXhwb3J0cy5UYWJsZSA9IFRhYmxlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9VGFibGUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB3bWxfcnVudGltZV8xID0gcmVxdWlyZShcIkBxdWVuay93bWwtcnVudGltZVwiKTtcbnZhciBwcm9wZXJ0eV9zZWVrXzEgPSByZXF1aXJlKFwicHJvcGVydHktc2Vla1wiKTtcbnZhciBTdHlsZXMgPSByZXF1aXJlKFwid21sLXdpZGdldHMtY29tbW9uL1N0eWxlc1wiKTtcbnZhciBUYWJsZV8xID0gcmVxdWlyZShcIi4uL1RhYmxlXCIpO1xudmFyIF8xID0gcmVxdWlyZShcIi4uLy4uL1wiKTtcbmZ1bmN0aW9uIHRoZWFkKHZpZXcsIGZpZWxkcykge1xuICAgIHJldHVybiB3bWxfcnVudGltZV8xLmJveChbd21sX3J1bnRpbWVfMS5ub2RlKCd0cicsIHsgaHRtbDoge30gfSwgW3dtbF9ydW50aW1lXzEuaWZFKHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpzZWxlY3RhYmxlJyksIGZ1bmN0aW9uIGlmNSgpIHsgcmV0dXJuIHdtbF9ydW50aW1lXzEuYm94KFt3bWxfcnVudGltZV8xLm5vZGUoJ3RoJywgeyBodG1sOiB7fSB9LCBbd21sX3J1bnRpbWVfMS5ub2RlKCdpbnB1dCcsIHsgaHRtbDogeyAndHlwZSc6IFwiY2hlY2tib3hcIiwgJ29uY2xpY2snOiBmdW5jdGlvbiBmdW5jdGlvbl9saXRlcmFsXzEoXykgeyByZXR1cm4gdGhpcy5tb2RlbC5hbGxSb3dzU2VsZWN0ZWQoKTsgfS5iaW5kKHRoaXMpIH0gfSwgW10sIHZpZXcpXSwgdmlldyldKTsgfS5iaW5kKHRoaXMpLCB3bWxfcnVudGltZV8xLmVtcHR5KSwgd21sX3J1bnRpbWVfMS5mb3JFKGZpZWxkcywgZnVuY3Rpb24gZm9yMihmaWVsZCwgXywgX18pIHsgcmV0dXJuIHdtbF9ydW50aW1lXzEuYm94KFt3bWxfcnVudGltZV8xLmlmRSghZmllbGQuaGlkZGVuLCBmdW5jdGlvbiBpZjYoKSB7IHJldHVybiB3bWxfcnVudGltZV8xLmJveChbd21sX3J1bnRpbWVfMS5pZkUoZmllbGQuc29ydEFzLCBmdW5jdGlvbiBpZjcoKSB7IHJldHVybiB3bWxfcnVudGltZV8xLmJveChbd21sX3J1bnRpbWVfMS5ub2RlKCd0aCcsIHsgaHRtbDogeyAnY2xhc3MnOiBbdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmhlYWRpbmdDbGFzcycpLCAodGhpcy5zb3J0ZWRPbiA9PT0gZmllbGQubmFtZSkgPyBTdHlsZXMuQUNUSVZFIDogJyddLmpvaW4oJyAnKSwgJ29uY2xpY2snOiBmdW5jdGlvbiBmdW5jdGlvbl9saXRlcmFsXzIoXykgeyByZXR1cm4gdGhpcy5tb2RlbC5oZWFkaW5nQ2xpY2tlZChuZXcgVGFibGVfMS5IZWFkaW5nQ2xpY2tlZEV2ZW50KGZpZWxkLm5hbWUsIGZpZWxkLCB0aGlzKSk7IH0uYmluZCh0aGlzKSB9IH0sIFtmaWVsZC5oZWFkaW5nLCB3bWxfcnVudGltZV8xLmlmRSh0aGlzLnNvcnRlZE9uID09PSBmaWVsZC5uYW1lLCBmdW5jdGlvbiBpZjgoKSB7IHJldHVybiB3bWxfcnVudGltZV8xLmJveChbdGhpcy5hcnJvd10pOyB9LmJpbmQodGhpcyksIHdtbF9ydW50aW1lXzEuZW1wdHkpXSwgdmlldyldKTsgfS5iaW5kKHRoaXMpLCBmdW5jdGlvbiBlbHNlX2NsYXVzZTQoKSB7IHJldHVybiB3bWxfcnVudGltZV8xLmJveChbd21sX3J1bnRpbWVfMS5ub2RlKCd0aCcsIHsgaHRtbDogeyAnY2xhc3MnOiBbdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmhlYWRpbmdDbGFzcycpLCAodGhpcy5zb3J0ZWRPbiA9PT0gZmllbGQubmFtZSkgPyBTdHlsZXMuQUNUSVZFIDogJyddLmpvaW4oJyAnKSwgJ29uY2xpY2snOiBmdW5jdGlvbiBmdW5jdGlvbl9saXRlcmFsXzMoXykgeyByZXR1cm4gdGhpcy5tb2RlbC5oZWFkaW5nQ2xpY2tlZChuZXcgVGFibGVfMS5IZWFkaW5nQ2xpY2tlZEV2ZW50KGZpZWxkLm5hbWUsIGZpZWxkLCB0aGlzKSk7IH0uYmluZCh0aGlzKSB9IH0sIFtmaWVsZC5oZWFkaW5nLCB3bWxfcnVudGltZV8xLmlmRSh0aGlzLnNvcnRlZE9uID09PSBmaWVsZC5uYW1lLCBmdW5jdGlvbiBpZjkoKSB7IHJldHVybiB3bWxfcnVudGltZV8xLmJveChbdGhpcy5hcnJvd10pOyB9LmJpbmQodGhpcyksIHdtbF9ydW50aW1lXzEuZW1wdHkpXSwgdmlldyldKTsgfS5iaW5kKHRoaXMpKV0pOyB9LmJpbmQodGhpcyksIHdtbF9ydW50aW1lXzEuZW1wdHkpXSk7IH0uYmluZCh0aGlzKSwgZnVuY3Rpb24gb3RoZXJ3aXNlMigpIHsgcmV0dXJuIHdtbF9ydW50aW1lXzEuYm94KFtdKTsgfS5iaW5kKHRoaXMpKV0sIHZpZXcpXSk7XG59XG5leHBvcnRzLnRoZWFkID0gdGhlYWQ7XG5mdW5jdGlvbiB0Ym9keSh2aWV3LCBkYXRhLCBmaWVsZHMpIHtcbiAgICByZXR1cm4gd21sX3J1bnRpbWVfMS5ib3goW3dtbF9ydW50aW1lXzEud2lkZ2V0KF8xLkZyYWdtZW50LCB7IGh0bWw6IHt9IH0sIFt3bWxfcnVudGltZV8xLmZvckUoZGF0YSwgZnVuY3Rpb24gZm9yMyhyb3csIGluZGV4LCBfXykgeyByZXR1cm4gd21sX3J1bnRpbWVfMS5ib3goW3dtbF9ydW50aW1lXzEubm9kZSgndHInLCB7IGh0bWw6IHsgJ2NsYXNzJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OnJvd0NsYXNzJyksICdvbmNsaWNrJzogZnVuY3Rpb24gZnVuY3Rpb25fbGl0ZXJhbF80KF8pIHsgcmV0dXJuIHRoaXMubW9kZWwucm93Q2xpY2tlZChuZXcgVGFibGVfMS5Sb3dDbGlja2VkRXZlbnQocm93LCBpbmRleCwgZGF0YSwgdGhpcykpOyB9LmJpbmQodGhpcykgfSB9LCBbd21sX3J1bnRpbWVfMS5pZkUodGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OnNlbGVjdGFibGUnKSwgZnVuY3Rpb24gaWYxMCgpIHsgcmV0dXJuIHdtbF9ydW50aW1lXzEuYm94KFt3bWxfcnVudGltZV8xLm5vZGUoJ3RkJywgeyBodG1sOiB7fSB9LCBbd21sX3J1bnRpbWVfMS5ub2RlKCdpbnB1dCcsIHsgaHRtbDogeyAndHlwZSc6IFwiY2hlY2tib3hcIiwgJ29uY2xpY2snOiBmdW5jdGlvbiBmdW5jdGlvbl9saXRlcmFsXzUoXykgeyByZXR1cm4gdGhpcy5tb2RlbC5yb3dTZWxlY3RlZChuZXcgVGFibGVfMS5Sb3dTZWxlY3RlZEV2ZW50KHJvdywgaW5kZXgsIGRhdGEsIHRoaXMpKTsgfS5iaW5kKHRoaXMpIH0gfSwgW10sIHZpZXcpXSwgdmlldyldKTsgfS5iaW5kKHRoaXMpLCB3bWxfcnVudGltZV8xLmVtcHR5KSwgd21sX3J1bnRpbWVfMS5mb3JFKGZpZWxkcywgZnVuY3Rpb24gZm9yNChmaWVsZCwgXywgX18pIHsgcmV0dXJuIHdtbF9ydW50aW1lXzEuYm94KFt3bWxfcnVudGltZV8xLmlmRSghZmllbGQuaGlkZGVuLCBmdW5jdGlvbiBpZjExKCkgeyByZXR1cm4gd21sX3J1bnRpbWVfMS5ib3goW3dtbF9ydW50aW1lXzEubm9kZSgndGQnLCB7IGh0bWw6IHsgJ2NsYXNzJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmNlbGxDbGFzcycpLCAnb25jbGljayc6IGZ1bmN0aW9uIGZ1bmN0aW9uX2xpdGVyYWxfNihfKSB7IHJldHVybiB0aGlzLm1vZGVsLmNlbGxDbGlja2VkKG5ldyBUYWJsZV8xLkNlbGxDbGlja2VkRXZlbnQocHJvcGVydHlfc2Vla18xLmdldChmaWVsZC5uYW1lLCByb3cpLCBmaWVsZC5uYW1lLCBpbmRleCwgcm93LCB0aGlzKSk7IH0uYmluZCh0aGlzKSB9IH0sIFt3bWxfcnVudGltZV8xLmlmRShmaWVsZC5mcmFnbWVudCwgZnVuY3Rpb24gaWYxMigpIHsgcmV0dXJuIHdtbF9ydW50aW1lXzEuYm94KFtmaWVsZC5mcmFnbWVudC5hcHBseSh0aGlzLCBbdmlldywgcHJvcGVydHlfc2Vla18xLmdldChmaWVsZC5uYW1lLCByb3cpLCBmaWVsZC5uYW1lLCByb3csIGZpZWxkXSldKTsgfS5iaW5kKHRoaXMpLCBmdW5jdGlvbiBlbHNlX2NsYXVzZTUoKSB7IHJldHVybiB3bWxfcnVudGltZV8xLmJveChbcHJvcGVydHlfc2Vla18xLmdldChmaWVsZC5uYW1lLCByb3cpXSk7IH0uYmluZCh0aGlzKSldLCB2aWV3KV0pOyB9LmJpbmQodGhpcyksIHdtbF9ydW50aW1lXzEuZW1wdHkpXSk7IH0uYmluZCh0aGlzKSwgZnVuY3Rpb24gb3RoZXJ3aXNlNCgpIHsgcmV0dXJuIHdtbF9ydW50aW1lXzEuYm94KFtdKTsgfS5iaW5kKHRoaXMpKV0sIHZpZXcpXSk7IH0uYmluZCh0aGlzKSwgZnVuY3Rpb24gb3RoZXJ3aXNlNCgpIHsgcmV0dXJuIHdtbF9ydW50aW1lXzEuYm94KFtdKTsgfS5iaW5kKHRoaXMpKV0sIHZpZXcpXSk7XG59XG5leHBvcnRzLnRib2R5ID0gdGJvZHk7XG52YXIgVGFibGVWaWV3ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoVGFibGVWaWV3LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFRhYmxlVmlldyhjb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbnRleHQpIHx8IHRoaXM7XG4gICAgICAgIHZhciB2aWV3ID0gX3RoaXM7XG4gICAgICAgIF90aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgndGFibGUnLCB7IGh0bWw6IHsgJ2NsYXNzJzogW1N0eWxlcy5UQUJMRSwgdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmNsYXNzJywgJycpXS5qb2luKCcgJykgfSB9LCBbd21sX3J1bnRpbWVfMS5ub2RlKCd0aGVhZCcsIHsgaHRtbDoge30sIHdtbDogeyAnaWQnOiBcImhlYWRcIiB9IH0sIFt0aGVhZC5hcHBseSh0aGlzLCBbdmlldywgdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmZpZWxkcycpXSldLCB2aWV3KSwgd21sX3J1bnRpbWVfMS5ub2RlKCd0Ym9keScsIHsgaHRtbDoge30sIHdtbDogeyAnaWQnOiBcImJvZHlcIiB9IH0sIFt0Ym9keS5hcHBseSh0aGlzLCBbdmlldywgdGhpcy5kYXRhLCB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6ZmllbGRzJyldKV0sIHZpZXcpXSwgdmlldyk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIFRhYmxlVmlldztcbn0od21sX3J1bnRpbWVfMS5BcHBWaWV3KSk7XG5leHBvcnRzLlRhYmxlVmlldyA9IFRhYmxlVmlldztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRhYmxlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgd21sX3J1bnRpbWVfMSA9IHJlcXVpcmUoXCJAcXVlbmsvd21sLXJ1bnRpbWVcIik7XG52YXIgU3R5bGVzID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi9TdHlsZXNcIik7XG52YXIgdXRpbF8xID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi91dGlsXCIpO1xudmFyIHRhYnNfMSA9IHJlcXVpcmUoXCIuL3dtbC90YWJzXCIpO1xuLyoqXG4gKiBUYWJcbiAqL1xudmFyIFRhYiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFRhYiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBUYWIoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IHRhYnNfMS5UYWJWaWV3KF90aGlzKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBjbGljayB0aGlzIFRhYlxuICAgICAqL1xuICAgIFRhYi5wcm90b3R5cGUuY2xpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMudmlldy5pZHMubGluay5jbGljaygpO1xuICAgIH07XG4gICAgVGFiLnByb3RvdHlwZS5jbGlja2VkID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB2YXIgcGFyZW50ID0gdGhpcy52aWV3Lmlkcy5yb290LnBhcmVudE5vZGU7XG4gICAgICAgIHZhciB1cyA9IHBhcmVudC5jaGlsZHJlbjtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB1cy5sZW5ndGg7IGkrKylcbiAgICAgICAgICAgIHVzW2ldLmNsYXNzTGlzdC5yZW1vdmUoU3R5bGVzLkFDVElWRSk7XG4gICAgICAgIHRoaXMudmlldy5pZHMucm9vdC5jbGFzc0xpc3QuYWRkKFN0eWxlcy5BQ1RJVkUpO1xuICAgICAgICB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6b25DbGljaycsIHV0aWxfMS5ub29wKSh0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6bmFtZScpKTtcbiAgICB9O1xuICAgIHJldHVybiBUYWI7XG59KHdtbF9ydW50aW1lXzEuQ29tcG9uZW50KSk7XG5leHBvcnRzLlRhYiA9IFRhYjtcbi8qKlxuICogVGFic1xuICovXG52YXIgVGFicyA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFRhYnMsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gVGFicygpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnZpZXcgPSBuZXcgdGFic18xLlRhYnNWaWV3KF90aGlzKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gVGFicztcbn0od21sX3J1bnRpbWVfMS5Db21wb25lbnQpKTtcbmV4cG9ydHMuVGFicyA9IFRhYnM7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1UYWJzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgd21sX3J1bnRpbWVfMSA9IHJlcXVpcmUoXCJAcXVlbmsvd21sLXJ1bnRpbWVcIik7XG52YXIgU3R5bGVzID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi9TdHlsZXNcIik7XG52YXIgVGFiVmlldyA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFRhYlZpZXcsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gVGFiVmlldyhjb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbnRleHQpIHx8IHRoaXM7XG4gICAgICAgIHZhciB2aWV3ID0gX3RoaXM7XG4gICAgICAgIF90aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHdtbF9ydW50aW1lXzEubm9kZSgnbGknLCB7IGh0bWw6IHsgJ3JvbGUnOiBcInByZXNlbnRhdGlvblwiLCAnY2xhc3MnOiAodGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmFjdGl2ZScpKSA/IFN0eWxlcy5BQ1RJVkUgOiBudWxsIH0sIHdtbDogeyAnaWQnOiBcInJvb3RcIiB9IH0sIFt3bWxfcnVudGltZV8xLm5vZGUoJ2EnLCB7IGh0bWw6IHsgJ2hyZWYnOiBcIiNcIiwgJ29uY2xpY2snOiB0aGlzLmNsaWNrZWQuYmluZCh0aGlzKSB9LCB3bWw6IHsgJ2lkJzogXCJsaW5rXCIgfSB9LCBbd21sX3J1bnRpbWVfMS5pZkUodGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OnRleHQnKSwgZnVuY3Rpb24gaWYxMygpIHsgcmV0dXJuIHdtbF9ydW50aW1lXzEuYm94KFt0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6dGV4dCcpXSk7IH0uYmluZCh0aGlzKSwgZnVuY3Rpb24gZWxzZV9jbGF1c2U2KCkgeyByZXR1cm4gd21sX3J1bnRpbWVfMS5ib3goW3RoaXMuY2hpbGRyZW5dKTsgfS5iaW5kKHRoaXMpKV0sIHZpZXcpXSwgdmlldyk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIFRhYlZpZXc7XG59KHdtbF9ydW50aW1lXzEuQXBwVmlldykpO1xuZXhwb3J0cy5UYWJWaWV3ID0gVGFiVmlldztcbnZhciBUYWJzVmlldyA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFRhYnNWaWV3LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFRhYnNWaWV3KGNvbnRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29udGV4dCkgfHwgdGhpcztcbiAgICAgICAgdmFyIHZpZXcgPSBfdGhpcztcbiAgICAgICAgX3RoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gd21sX3J1bnRpbWVfMS5ub2RlKCd1bCcsIHsgaHRtbDogeyAnY2xhc3MnOiBTdHlsZXMuVEFCUyB9IH0sIFt0aGlzLmNoaWxkcmVuXSwgdmlldyk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIFRhYnNWaWV3O1xufSh3bWxfcnVudGltZV8xLkFwcFZpZXcpKTtcbmV4cG9ydHMuVGFic1ZpZXcgPSBUYWJzVmlldztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRhYnMuanMubWFwIiwidmFyIGtpbmRvZiA9IHJlcXVpcmUoXCJraW5kb2ZcIilcbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGVnYWxcbmV4cG9ydHMuZGVlcEVnYWwgPSBkZWVwRWdhbFxuXG5mdW5jdGlvbiBlZ2FsKGEsIGIpIHtcbiAgaWYgKGEgPT09IGIpIHJldHVybiB0cnVlXG5cbiAgdmFyIHR5cGVcbiAgc3dpdGNoICh0eXBlID0ga2luZG9mUGxhaW4oYSkpIHtcbiAgICBjYXNlIFwiZGF0ZVwiOlxuICAgICAgaWYgKHR5cGUgIT09IGtpbmRvZihiKSkgcmV0dXJuIGZhbHNlXG4gICAgICByZXR1cm4gYS52YWx1ZU9mKCkgPT09IGIudmFsdWVPZigpXG5cbiAgICBjYXNlIFwicmVnZXhwXCI6XG4gICAgICBpZiAodHlwZSAhPT0ga2luZG9mKGIpKSByZXR1cm4gZmFsc2VcbiAgICAgIHJldHVybiBhLnRvU3RyaW5nKCkgPT09IGIudG9TdHJpbmcoKVxuXG4gICAgY2FzZSBcIm9iamVjdFwiOlxuICAgICAgaWYgKHR5cGUgIT09IGtpbmRvZlBsYWluKGIpKSByZXR1cm4gZmFsc2VcblxuICAgICAgdmFyIGNvbnN0cnVjdG9yID0gZ2V0Q29uc3RydWN0b3JPZihhKVxuICAgICAgaWYgKGNvbnN0cnVjdG9yICE9PSBnZXRDb25zdHJ1Y3Rvck9mKGIpKSByZXR1cm4gZmFsc2VcbiAgICAgIGlmICghaGFzVmFsdWVPZihhKSB8fCAhaGFzVmFsdWVPZihiKSkgcmV0dXJuIGZhbHNlXG4gICAgICByZXR1cm4gZGVlcEVnYWwoYS52YWx1ZU9mKCksIGIudmFsdWVPZigpKVxuXG4gICAgZGVmYXVsdDogcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuZnVuY3Rpb24gbWF5YmVFZ2FsKGEsIGIpIHtcbiAgaWYgKGVnYWwoYSwgYikpIHJldHVybiB0cnVlXG5cbiAgdmFyIHR5cGUgPSBraW5kb2ZQbGFpbihhKVxuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlIFwiYXJyYXlcIjpcbiAgICBjYXNlIFwicGxhaW5cIjogcmV0dXJuIHR5cGUgPT09IGtpbmRvZlBsYWluKGIpID8gbnVsbCA6IGZhbHNlXG4gICAgZGVmYXVsdDogcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuZnVuY3Rpb24gZGVlcEVnYWwoYSwgYiwgZWdhbCkge1xuICByZXR1cm4gZGVlcEVnYWxXaXRoKHR5cGVvZiBlZ2FsID09PSBcImZ1bmN0aW9uXCIgPyBlZ2FsIDogbWF5YmVFZ2FsLCBhLCBiKVxufVxuXG5mdW5jdGlvbiBkZWVwRWdhbFdpdGgoZWdhbCwgYSwgYiwgYVN0YWNrLCBiU3RhY2spIHtcbiAgdmFyIGVxdWFsID0gZWdhbChhLCBiKVxuICBpZiAoZXF1YWwgIT0gbnVsbCkgcmV0dXJuIEJvb2xlYW4oZXF1YWwpXG5cbiAgdmFyIHR5cGUgPSBraW5kb2YoYSlcbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgLyogZXNsaW50IG5vLWZhbGx0aHJvdWdoOiAwICovXG4gICAgY2FzZSBcImFycmF5XCI6XG4gICAgY2FzZSBcIm9iamVjdFwiOiBpZiAodHlwZSA9PT0ga2luZG9mKGIpKSBicmVha1xuICAgIGRlZmF1bHQ6IHJldHVybiBmYWxzZVxuICB9XG5cbiAgdmFyIGFQb3MgPSBhU3RhY2sgJiYgYVN0YWNrLmluZGV4T2YoYSlcbiAgdmFyIGJQb3MgPSBiU3RhY2sgJiYgYlN0YWNrLmluZGV4T2YoYilcbiAgaWYgKGFQb3MgIT09IGJQb3MpIHJldHVybiBmYWxzZVxuICBpZiAoYVBvcyAhPSBudWxsICYmIGFQb3MgPj0gMCkgcmV0dXJuIHRydWVcblxuICBhU3RhY2sgPSBhU3RhY2sgPyBhU3RhY2suY29uY2F0KFthXSkgOiBbYV1cbiAgYlN0YWNrID0gYlN0YWNrID8gYlN0YWNrLmNvbmNhdChbYl0pIDogW2JdXG5cbiAgdmFyIGlcbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSBcImFycmF5XCI6XG4gICAgICBpZiAoYS5sZW5ndGggIT09IGIubGVuZ3RoKSByZXR1cm4gZmFsc2VcbiAgICAgIGlmIChhLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHRydWVcblxuICAgICAgZm9yIChpID0gMDsgaSA8IGEubGVuZ3RoOyArK2kpXG4gICAgICAgIGlmICghZGVlcEVnYWxXaXRoKGVnYWwsIGFbaV0sIGJbaV0sIGFTdGFjaywgYlN0YWNrKSkgcmV0dXJuIGZhbHNlXG5cbiAgICAgIHJldHVybiB0cnVlXG5cbiAgICBjYXNlIFwib2JqZWN0XCI6XG4gICAgICB2YXIgYUtleXMgPSBrZXlzKGEpXG4gICAgICB2YXIgYktleXMgPSBrZXlzKGIpXG4gICAgICBpZiAoYUtleXMubGVuZ3RoICE9PSBiS2V5cy5sZW5ndGgpIHJldHVybiBmYWxzZVxuICAgICAgaWYgKGFLZXlzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHRydWVcblxuICAgICAgYUtleXMuc29ydCgpXG4gICAgICBiS2V5cy5zb3J0KClcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBhS2V5cy5sZW5ndGg7ICsraSkgaWYgKGFLZXlzW2ldICE9PSBiS2V5c1tpXSkgcmV0dXJuIGZhbHNlXG5cbiAgICAgIGZvciAodmFyIGtleSBpbiBhKVxuICAgICAgICBpZiAoIWRlZXBFZ2FsV2l0aChlZ2FsLCBhW2tleV0sIGJba2V5XSwgYVN0YWNrLCBiU3RhY2spKSByZXR1cm4gZmFsc2VcblxuICAgICAgcmV0dXJuIHRydWVcbiAgfVxufVxuXG5mdW5jdGlvbiBraW5kb2ZQbGFpbihvYmopIHtcbiAgdmFyIHR5cGUgPSBraW5kb2Yob2JqKVxuICBpZiAodHlwZSA9PT0gXCJvYmplY3RcIiAmJiBpc09iamVjdFBsYWluKG9iaikpIHJldHVybiBcInBsYWluXCJcbiAgcmV0dXJuIHR5cGVcbn1cblxuZnVuY3Rpb24gaXNPYmplY3RQbGFpbihvYmopIHtcbiAgdmFyIHByb3RvdHlwZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopXG4gIGlmIChwcm90b3R5cGUgPT09IG51bGwpIHJldHVybiB0cnVlXG4gIGlmICghKFwiY29uc3RydWN0b3JcIiBpbiBwcm90b3R5cGUpKSByZXR1cm4gdHJ1ZVxuICByZXR1cm4gcHJvdG90eXBlLmNvbnN0cnVjdG9yID09PSBPYmplY3Rcbn1cblxuZnVuY3Rpb24gZ2V0Q29uc3RydWN0b3JPZihvYmopIHtcbiAgdmFyIHByb3RvdHlwZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopXG4gIHJldHVybiBwcm90b3R5cGUgPT09IG51bGwgPyB1bmRlZmluZWQgOiBwcm90b3R5cGUuY29uc3RydWN0b3Jcbn1cblxuZnVuY3Rpb24gaGFzVmFsdWVPZihvYmopIHtcbiAgdmFyIHZhbHVlT2YgPSBvYmoudmFsdWVPZlxuICByZXR1cm4gdHlwZW9mIHZhbHVlT2YgPT09IFwiZnVuY3Rpb25cIiAmJiB2YWx1ZU9mICE9PSBPYmplY3QucHJvdG90eXBlLnZhbHVlT2Zcbn1cblxuZnVuY3Rpb24ga2V5cyhvYmopIHtcbiAgdmFyIGFsbCA9IFtdXG4gIGZvciAodmFyIGtleSBpbiBvYmopIGFsbC5wdXNoKGtleSlcbiAgcmV0dXJuIGFsbFxufVxuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gc3RyaW5naWZ5XG5leHBvcnRzLmdldFNlcmlhbGl6ZSA9IHNlcmlhbGl6ZXJcblxuZnVuY3Rpb24gc3RyaW5naWZ5KG9iaiwgcmVwbGFjZXIsIHNwYWNlcywgY3ljbGVSZXBsYWNlcikge1xuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqLCBzZXJpYWxpemVyKHJlcGxhY2VyLCBjeWNsZVJlcGxhY2VyKSwgc3BhY2VzKVxufVxuXG5mdW5jdGlvbiBzZXJpYWxpemVyKHJlcGxhY2VyLCBjeWNsZVJlcGxhY2VyKSB7XG4gIHZhciBzdGFjayA9IFtdLCBrZXlzID0gW11cblxuICBpZiAoY3ljbGVSZXBsYWNlciA9PSBudWxsKSBjeWNsZVJlcGxhY2VyID0gZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuICAgIGlmIChzdGFja1swXSA9PT0gdmFsdWUpIHJldHVybiBcIltDaXJjdWxhciB+XVwiXG4gICAgcmV0dXJuIFwiW0NpcmN1bGFyIH4uXCIgKyBrZXlzLnNsaWNlKDAsIHN0YWNrLmluZGV4T2YodmFsdWUpKS5qb2luKFwiLlwiKSArIFwiXVwiXG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuICAgIGlmIChzdGFjay5sZW5ndGggPiAwKSB7XG4gICAgICB2YXIgdGhpc1BvcyA9IHN0YWNrLmluZGV4T2YodGhpcylcbiAgICAgIH50aGlzUG9zID8gc3RhY2suc3BsaWNlKHRoaXNQb3MgKyAxKSA6IHN0YWNrLnB1c2godGhpcylcbiAgICAgIH50aGlzUG9zID8ga2V5cy5zcGxpY2UodGhpc1BvcywgSW5maW5pdHksIGtleSkgOiBrZXlzLnB1c2goa2V5KVxuICAgICAgaWYgKH5zdGFjay5pbmRleE9mKHZhbHVlKSkgdmFsdWUgPSBjeWNsZVJlcGxhY2VyLmNhbGwodGhpcywga2V5LCB2YWx1ZSlcbiAgICB9XG4gICAgZWxzZSBzdGFjay5wdXNoKHZhbHVlKVxuXG4gICAgcmV0dXJuIHJlcGxhY2VyID09IG51bGwgPyB2YWx1ZSA6IHJlcGxhY2VyLmNhbGwodGhpcywga2V5LCB2YWx1ZSlcbiAgfVxufVxuIiwiaWYgKHR5cGVvZiBtb2R1bGUgIT0gXCJ1bmRlZmluZWRcIikgbW9kdWxlLmV4cG9ydHMgPSBraW5kb2ZcblxuZnVuY3Rpb24ga2luZG9mKG9iaikge1xuICB2YXIgdHlwZVxuICBpZiAob2JqID09PSB1bmRlZmluZWQpIHJldHVybiBcInVuZGVmaW5lZFwiXG4gIGlmIChvYmogPT09IG51bGwpIHJldHVybiBcIm51bGxcIlxuXG4gIHN3aXRjaCAodHlwZSA9IHR5cGVvZiBvYmopIHtcbiAgICBjYXNlIFwib2JqZWN0XCI6XG4gICAgICBzd2l0Y2ggKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopKSB7XG4gICAgICAgIGNhc2UgXCJbb2JqZWN0IFJlZ0V4cF1cIjogcmV0dXJuIFwicmVnZXhwXCJcbiAgICAgICAgY2FzZSBcIltvYmplY3QgRGF0ZV1cIjogcmV0dXJuIFwiZGF0ZVwiXG4gICAgICAgIGNhc2UgXCJbb2JqZWN0IEFycmF5XVwiOiByZXR1cm4gXCJhcnJheVwiXG4gICAgICB9XG5cbiAgICBkZWZhdWx0OiByZXR1cm4gdHlwZVxuICB9XG59XG4iLCIvKipcbiAqIGxvZGFzaCAzLjIuMCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNiBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE2IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG52YXIgcm9vdCA9IHJlcXVpcmUoJ2xvZGFzaC5fcm9vdCcpO1xuXG4vKiogVXNlZCB0byBjb21wb3NlIGJpdG1hc2tzIGZvciB3cmFwcGVyIG1ldGFkYXRhLiAqL1xudmFyIEJJTkRfRkxBRyA9IDEsXG4gICAgQklORF9LRVlfRkxBRyA9IDIsXG4gICAgQ1VSUllfQk9VTkRfRkxBRyA9IDQsXG4gICAgQ1VSUllfRkxBRyA9IDgsXG4gICAgQ1VSUllfUklHSFRfRkxBRyA9IDE2LFxuICAgIFBBUlRJQUxfRkxBRyA9IDMyLFxuICAgIFBBUlRJQUxfUklHSFRfRkxBRyA9IDY0LFxuICAgIEFSWV9GTEFHID0gMTI4LFxuICAgIEZMSVBfRkxBRyA9IDUxMjtcblxuLyoqIFVzZWQgYXMgdGhlIGBUeXBlRXJyb3JgIG1lc3NhZ2UgZm9yIFwiRnVuY3Rpb25zXCIgbWV0aG9kcy4gKi9cbnZhciBGVU5DX0VSUk9SX1RFWFQgPSAnRXhwZWN0ZWQgYSBmdW5jdGlvbic7XG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIElORklOSVRZID0gMSAvIDAsXG4gICAgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTEsXG4gICAgTUFYX0lOVEVHRVIgPSAxLjc5NzY5MzEzNDg2MjMxNTdlKzMwOCxcbiAgICBOQU4gPSAwIC8gMDtcblxuLyoqIFVzZWQgYXMgdGhlIGludGVybmFsIGFyZ3VtZW50IHBsYWNlaG9sZGVyLiAqL1xudmFyIFBMQUNFSE9MREVSID0gJ19fbG9kYXNoX3BsYWNlaG9sZGVyX18nO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXScsXG4gICAgZ2VuVGFnID0gJ1tvYmplY3QgR2VuZXJhdG9yRnVuY3Rpb25dJztcblxuLyoqIFVzZWQgdG8gbWF0Y2ggbGVhZGluZyBhbmQgdHJhaWxpbmcgd2hpdGVzcGFjZS4gKi9cbnZhciByZVRyaW0gPSAvXlxccyt8XFxzKyQvZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGJhZCBzaWduZWQgaGV4YWRlY2ltYWwgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUlzQmFkSGV4ID0gL15bLStdMHhbMC05YS1mXSskL2k7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBiaW5hcnkgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUlzQmluYXJ5ID0gL14wYlswMV0rJC9pO1xuXG4vKiogVXNlZCB0byBkZXRlY3Qgb2N0YWwgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUlzT2N0YWwgPSAvXjBvWzAtN10rJC9pO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgdW5zaWduZWQgaW50ZWdlciB2YWx1ZXMuICovXG52YXIgcmVJc1VpbnQgPSAvXig/OjB8WzEtOV1cXGQqKSQvO1xuXG4vKiogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgd2l0aG91dCBhIGRlcGVuZGVuY3kgb24gYHJvb3RgLiAqL1xudmFyIGZyZWVQYXJzZUludCA9IHBhcnNlSW50O1xuXG4vKipcbiAqIEEgZmFzdGVyIGFsdGVybmF0aXZlIHRvIGBGdW5jdGlvbiNhcHBseWAsIHRoaXMgZnVuY3Rpb24gaW52b2tlcyBgZnVuY2BcbiAqIHdpdGggdGhlIGB0aGlzYCBiaW5kaW5nIG9mIGB0aGlzQXJnYCBhbmQgdGhlIGFyZ3VtZW50cyBvZiBgYXJnc2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGludm9rZS5cbiAqIEBwYXJhbSB7Kn0gdGhpc0FyZyBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGZ1bmNgLlxuICogQHBhcmFtIHsuLi4qfSBhcmdzIFRoZSBhcmd1bWVudHMgdG8gaW52b2tlIGBmdW5jYCB3aXRoLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHJlc3VsdCBvZiBgZnVuY2AuXG4gKi9cbmZ1bmN0aW9uIGFwcGx5KGZ1bmMsIHRoaXNBcmcsIGFyZ3MpIHtcbiAgdmFyIGxlbmd0aCA9IGFyZ3MubGVuZ3RoO1xuICBzd2l0Y2ggKGxlbmd0aCkge1xuICAgIGNhc2UgMDogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnKTtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgYXJnc1swXSk7XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIGFyZ3NbMF0sIGFyZ3NbMV0pO1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKTtcbiAgfVxuICByZXR1cm4gZnVuYy5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgaW5kZXguXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHBhcmFtIHtudW1iZXJ9IFtsZW5ndGg9TUFYX1NBRkVfSU5URUdFUl0gVGhlIHVwcGVyIGJvdW5kcyBvZiBhIHZhbGlkIGluZGV4LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBpbmRleCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0luZGV4KHZhbHVlLCBsZW5ndGgpIHtcbiAgdmFsdWUgPSAodHlwZW9mIHZhbHVlID09ICdudW1iZXInIHx8IHJlSXNVaW50LnRlc3QodmFsdWUpKSA/ICt2YWx1ZSA6IC0xO1xuICBsZW5ndGggPSBsZW5ndGggPT0gbnVsbCA/IE1BWF9TQUZFX0lOVEVHRVIgOiBsZW5ndGg7XG4gIHJldHVybiB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDwgbGVuZ3RoO1xufVxuXG4vKipcbiAqIFJlcGxhY2VzIGFsbCBgcGxhY2Vob2xkZXJgIGVsZW1lbnRzIGluIGBhcnJheWAgd2l0aCBhbiBpbnRlcm5hbCBwbGFjZWhvbGRlclxuICogYW5kIHJldHVybnMgYW4gYXJyYXkgb2YgdGhlaXIgaW5kZXhlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7Kn0gcGxhY2Vob2xkZXIgVGhlIHBsYWNlaG9sZGVyIHRvIHJlcGxhY2UuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBhcnJheSBvZiBwbGFjZWhvbGRlciBpbmRleGVzLlxuICovXG5mdW5jdGlvbiByZXBsYWNlSG9sZGVycyhhcnJheSwgcGxhY2Vob2xkZXIpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheS5sZW5ndGgsXG4gICAgICByZXNJbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gW107XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBpZiAoYXJyYXlbaW5kZXhdID09PSBwbGFjZWhvbGRlcikge1xuICAgICAgYXJyYXlbaW5kZXhdID0gUExBQ0VIT0xERVI7XG4gICAgICByZXN1bHRbKytyZXNJbmRleF0gPSBpbmRleDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZU1heCA9IE1hdGgubWF4LFxuICAgIG5hdGl2ZU1pbiA9IE1hdGgubWluO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmNyZWF0ZWAgd2l0aG91dCBzdXBwb3J0IGZvciBhc3NpZ25pbmdcbiAqIHByb3BlcnRpZXMgdG8gdGhlIGNyZWF0ZWQgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gcHJvdG90eXBlIFRoZSBvYmplY3QgdG8gaW5oZXJpdCBmcm9tLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbmV3IG9iamVjdC5cbiAqL1xudmFyIGJhc2VDcmVhdGUgPSAoZnVuY3Rpb24oKSB7XG4gIGZ1bmN0aW9uIG9iamVjdCgpIHt9XG4gIHJldHVybiBmdW5jdGlvbihwcm90b3R5cGUpIHtcbiAgICBpZiAoaXNPYmplY3QocHJvdG90eXBlKSkge1xuICAgICAgb2JqZWN0LnByb3RvdHlwZSA9IHByb3RvdHlwZTtcbiAgICAgIHZhciByZXN1bHQgPSBuZXcgb2JqZWN0O1xuICAgICAgb2JqZWN0LnByb3RvdHlwZSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdCB8fCB7fTtcbiAgfTtcbn0oKSk7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSB0aGF0IGlzIHRoZSBjb21wb3NpdGlvbiBvZiBwYXJ0aWFsbHkgYXBwbGllZCBhcmd1bWVudHMsXG4gKiBwbGFjZWhvbGRlcnMsIGFuZCBwcm92aWRlZCBhcmd1bWVudHMgaW50byBhIHNpbmdsZSBhcnJheSBvZiBhcmd1bWVudHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBhcmdzIFRoZSBwcm92aWRlZCBhcmd1bWVudHMuXG4gKiBAcGFyYW0ge0FycmF5fSBwYXJ0aWFscyBUaGUgYXJndW1lbnRzIHRvIHByZXBlbmQgdG8gdGhvc2UgcHJvdmlkZWQuXG4gKiBAcGFyYW0ge0FycmF5fSBob2xkZXJzIFRoZSBgcGFydGlhbHNgIHBsYWNlaG9sZGVyIGluZGV4ZXMuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBhcnJheSBvZiBjb21wb3NlZCBhcmd1bWVudHMuXG4gKi9cbmZ1bmN0aW9uIGNvbXBvc2VBcmdzKGFyZ3MsIHBhcnRpYWxzLCBob2xkZXJzKSB7XG4gIHZhciBob2xkZXJzTGVuZ3RoID0gaG9sZGVycy5sZW5ndGgsXG4gICAgICBhcmdzSW5kZXggPSAtMSxcbiAgICAgIGFyZ3NMZW5ndGggPSBuYXRpdmVNYXgoYXJncy5sZW5ndGggLSBob2xkZXJzTGVuZ3RoLCAwKSxcbiAgICAgIGxlZnRJbmRleCA9IC0xLFxuICAgICAgbGVmdExlbmd0aCA9IHBhcnRpYWxzLmxlbmd0aCxcbiAgICAgIHJlc3VsdCA9IEFycmF5KGxlZnRMZW5ndGggKyBhcmdzTGVuZ3RoKTtcblxuICB3aGlsZSAoKytsZWZ0SW5kZXggPCBsZWZ0TGVuZ3RoKSB7XG4gICAgcmVzdWx0W2xlZnRJbmRleF0gPSBwYXJ0aWFsc1tsZWZ0SW5kZXhdO1xuICB9XG4gIHdoaWxlICgrK2FyZ3NJbmRleCA8IGhvbGRlcnNMZW5ndGgpIHtcbiAgICByZXN1bHRbaG9sZGVyc1thcmdzSW5kZXhdXSA9IGFyZ3NbYXJnc0luZGV4XTtcbiAgfVxuICB3aGlsZSAoYXJnc0xlbmd0aC0tKSB7XG4gICAgcmVzdWx0W2xlZnRJbmRleCsrXSA9IGFyZ3NbYXJnc0luZGV4KytdO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogVGhpcyBmdW5jdGlvbiBpcyBsaWtlIGBjb21wb3NlQXJnc2AgZXhjZXB0IHRoYXQgdGhlIGFyZ3VtZW50cyBjb21wb3NpdGlvblxuICogaXMgdGFpbG9yZWQgZm9yIGBfLnBhcnRpYWxSaWdodGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBhcmdzIFRoZSBwcm92aWRlZCBhcmd1bWVudHMuXG4gKiBAcGFyYW0ge0FycmF5fSBwYXJ0aWFscyBUaGUgYXJndW1lbnRzIHRvIGFwcGVuZCB0byB0aG9zZSBwcm92aWRlZC5cbiAqIEBwYXJhbSB7QXJyYXl9IGhvbGRlcnMgVGhlIGBwYXJ0aWFsc2AgcGxhY2Vob2xkZXIgaW5kZXhlcy5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGFycmF5IG9mIGNvbXBvc2VkIGFyZ3VtZW50cy5cbiAqL1xuZnVuY3Rpb24gY29tcG9zZUFyZ3NSaWdodChhcmdzLCBwYXJ0aWFscywgaG9sZGVycykge1xuICB2YXIgaG9sZGVyc0luZGV4ID0gLTEsXG4gICAgICBob2xkZXJzTGVuZ3RoID0gaG9sZGVycy5sZW5ndGgsXG4gICAgICBhcmdzSW5kZXggPSAtMSxcbiAgICAgIGFyZ3NMZW5ndGggPSBuYXRpdmVNYXgoYXJncy5sZW5ndGggLSBob2xkZXJzTGVuZ3RoLCAwKSxcbiAgICAgIHJpZ2h0SW5kZXggPSAtMSxcbiAgICAgIHJpZ2h0TGVuZ3RoID0gcGFydGlhbHMubGVuZ3RoLFxuICAgICAgcmVzdWx0ID0gQXJyYXkoYXJnc0xlbmd0aCArIHJpZ2h0TGVuZ3RoKTtcblxuICB3aGlsZSAoKythcmdzSW5kZXggPCBhcmdzTGVuZ3RoKSB7XG4gICAgcmVzdWx0W2FyZ3NJbmRleF0gPSBhcmdzW2FyZ3NJbmRleF07XG4gIH1cbiAgdmFyIG9mZnNldCA9IGFyZ3NJbmRleDtcbiAgd2hpbGUgKCsrcmlnaHRJbmRleCA8IHJpZ2h0TGVuZ3RoKSB7XG4gICAgcmVzdWx0W29mZnNldCArIHJpZ2h0SW5kZXhdID0gcGFydGlhbHNbcmlnaHRJbmRleF07XG4gIH1cbiAgd2hpbGUgKCsraG9sZGVyc0luZGV4IDwgaG9sZGVyc0xlbmd0aCkge1xuICAgIHJlc3VsdFtvZmZzZXQgKyBob2xkZXJzW2hvbGRlcnNJbmRleF1dID0gYXJnc1thcmdzSW5kZXgrK107XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDb3BpZXMgdGhlIHZhbHVlcyBvZiBgc291cmNlYCB0byBgYXJyYXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBzb3VyY2UgVGhlIGFycmF5IHRvIGNvcHkgdmFsdWVzIGZyb20uXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXk9W11dIFRoZSBhcnJheSB0byBjb3B5IHZhbHVlcyB0by5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBgYXJyYXlgLlxuICovXG5mdW5jdGlvbiBjb3B5QXJyYXkoc291cmNlLCBhcnJheSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHNvdXJjZS5sZW5ndGg7XG5cbiAgYXJyYXkgfHwgKGFycmF5ID0gQXJyYXkobGVuZ3RoKSk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgYXJyYXlbaW5kZXhdID0gc291cmNlW2luZGV4XTtcbiAgfVxuICByZXR1cm4gYXJyYXk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgd3JhcHMgYGZ1bmNgIHRvIGludm9rZSBpdCB3aXRoIHRoZSBvcHRpb25hbCBgdGhpc2BcbiAqIGJpbmRpbmcgb2YgYHRoaXNBcmdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byB3cmFwLlxuICogQHBhcmFtIHtudW1iZXJ9IGJpdG1hc2sgVGhlIGJpdG1hc2sgb2Ygd3JhcHBlciBmbGFncy4gU2VlIGBjcmVhdGVXcmFwcGVyYCBmb3IgbW9yZSBkZXRhaWxzLlxuICogQHBhcmFtIHsqfSBbdGhpc0FyZ10gVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBmdW5jYC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IHdyYXBwZWQgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUJhc2VXcmFwcGVyKGZ1bmMsIGJpdG1hc2ssIHRoaXNBcmcpIHtcbiAgdmFyIGlzQmluZCA9IGJpdG1hc2sgJiBCSU5EX0ZMQUcsXG4gICAgICBDdG9yID0gY3JlYXRlQ3RvcldyYXBwZXIoZnVuYyk7XG5cbiAgZnVuY3Rpb24gd3JhcHBlcigpIHtcbiAgICB2YXIgZm4gPSAodGhpcyAmJiB0aGlzICE9PSByb290ICYmIHRoaXMgaW5zdGFuY2VvZiB3cmFwcGVyKSA/IEN0b3IgOiBmdW5jO1xuICAgIHJldHVybiBmbi5hcHBseShpc0JpbmQgPyB0aGlzQXJnIDogdGhpcywgYXJndW1lbnRzKTtcbiAgfVxuICByZXR1cm4gd3JhcHBlcjtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBwcm9kdWNlcyBhbiBpbnN0YW5jZSBvZiBgQ3RvcmAgcmVnYXJkbGVzcyBvZlxuICogd2hldGhlciBpdCB3YXMgaW52b2tlZCBhcyBwYXJ0IG9mIGEgYG5ld2AgZXhwcmVzc2lvbiBvciBieSBgY2FsbGAgb3IgYGFwcGx5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gQ3RvciBUaGUgY29uc3RydWN0b3IgdG8gd3JhcC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IHdyYXBwZWQgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUN0b3JXcmFwcGVyKEN0b3IpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIC8vIFVzZSBhIGBzd2l0Y2hgIHN0YXRlbWVudCB0byB3b3JrIHdpdGggY2xhc3MgY29uc3RydWN0b3JzLlxuICAgIC8vIFNlZSBodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1lY21hc2NyaXB0LWZ1bmN0aW9uLW9iamVjdHMtY2FsbC10aGlzYXJndW1lbnQtYXJndW1lbnRzbGlzdFxuICAgIC8vIGZvciBtb3JlIGRldGFpbHMuXG4gICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgICAgY2FzZSAwOiByZXR1cm4gbmV3IEN0b3I7XG4gICAgICBjYXNlIDE6IHJldHVybiBuZXcgQ3RvcihhcmdzWzBdKTtcbiAgICAgIGNhc2UgMjogcmV0dXJuIG5ldyBDdG9yKGFyZ3NbMF0sIGFyZ3NbMV0pO1xuICAgICAgY2FzZSAzOiByZXR1cm4gbmV3IEN0b3IoYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSk7XG4gICAgICBjYXNlIDQ6IHJldHVybiBuZXcgQ3RvcihhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdKTtcbiAgICAgIGNhc2UgNTogcmV0dXJuIG5ldyBDdG9yKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10sIGFyZ3NbNF0pO1xuICAgICAgY2FzZSA2OiByZXR1cm4gbmV3IEN0b3IoYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSwgYXJnc1s0XSwgYXJnc1s1XSk7XG4gICAgICBjYXNlIDc6IHJldHVybiBuZXcgQ3RvcihhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdLCBhcmdzWzRdLCBhcmdzWzVdLCBhcmdzWzZdKTtcbiAgICB9XG4gICAgdmFyIHRoaXNCaW5kaW5nID0gYmFzZUNyZWF0ZShDdG9yLnByb3RvdHlwZSksXG4gICAgICAgIHJlc3VsdCA9IEN0b3IuYXBwbHkodGhpc0JpbmRpbmcsIGFyZ3MpO1xuXG4gICAgLy8gTWltaWMgdGhlIGNvbnN0cnVjdG9yJ3MgYHJldHVybmAgYmVoYXZpb3IuXG4gICAgLy8gU2VlIGh0dHBzOi8vZXM1LmdpdGh1Yi5pby8jeDEzLjIuMiBmb3IgbW9yZSBkZXRhaWxzLlxuICAgIHJldHVybiBpc09iamVjdChyZXN1bHQpID8gcmVzdWx0IDogdGhpc0JpbmRpbmc7XG4gIH07XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgd3JhcHMgYGZ1bmNgIHRvIGVuYWJsZSBjdXJyeWluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gd3JhcC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBiaXRtYXNrIFRoZSBiaXRtYXNrIG9mIHdyYXBwZXIgZmxhZ3MuIFNlZSBgY3JlYXRlV3JhcHBlcmAgZm9yIG1vcmUgZGV0YWlscy5cbiAqIEBwYXJhbSB7bnVtYmVyfSBhcml0eSBUaGUgYXJpdHkgb2YgYGZ1bmNgLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgd3JhcHBlZCBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlQ3VycnlXcmFwcGVyKGZ1bmMsIGJpdG1hc2ssIGFyaXR5KSB7XG4gIHZhciBDdG9yID0gY3JlYXRlQ3RvcldyYXBwZXIoZnVuYyk7XG5cbiAgZnVuY3Rpb24gd3JhcHBlcigpIHtcbiAgICB2YXIgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aCxcbiAgICAgICAgaW5kZXggPSBsZW5ndGgsXG4gICAgICAgIGFyZ3MgPSBBcnJheShsZW5ndGgpLFxuICAgICAgICBmbiA9ICh0aGlzICYmIHRoaXMgIT09IHJvb3QgJiYgdGhpcyBpbnN0YW5jZW9mIHdyYXBwZXIpID8gQ3RvciA6IGZ1bmMsXG4gICAgICAgIHBsYWNlaG9sZGVyID0gd3JhcHBlci5wbGFjZWhvbGRlcjtcblxuICAgIHdoaWxlIChpbmRleC0tKSB7XG4gICAgICBhcmdzW2luZGV4XSA9IGFyZ3VtZW50c1tpbmRleF07XG4gICAgfVxuICAgIHZhciBob2xkZXJzID0gKGxlbmd0aCA8IDMgJiYgYXJnc1swXSAhPT0gcGxhY2Vob2xkZXIgJiYgYXJnc1tsZW5ndGggLSAxXSAhPT0gcGxhY2Vob2xkZXIpXG4gICAgICA/IFtdXG4gICAgICA6IHJlcGxhY2VIb2xkZXJzKGFyZ3MsIHBsYWNlaG9sZGVyKTtcblxuICAgIGxlbmd0aCAtPSBob2xkZXJzLmxlbmd0aDtcbiAgICByZXR1cm4gbGVuZ3RoIDwgYXJpdHlcbiAgICAgID8gY3JlYXRlUmVjdXJyeVdyYXBwZXIoZnVuYywgYml0bWFzaywgY3JlYXRlSHlicmlkV3JhcHBlciwgcGxhY2Vob2xkZXIsIHVuZGVmaW5lZCwgYXJncywgaG9sZGVycywgdW5kZWZpbmVkLCB1bmRlZmluZWQsIGFyaXR5IC0gbGVuZ3RoKVxuICAgICAgOiBhcHBseShmbiwgdGhpcywgYXJncyk7XG4gIH1cbiAgcmV0dXJuIHdyYXBwZXI7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgd3JhcHMgYGZ1bmNgIHRvIGludm9rZSBpdCB3aXRoIG9wdGlvbmFsIGB0aGlzYFxuICogYmluZGluZyBvZiBgdGhpc0FyZ2AsIHBhcnRpYWwgYXBwbGljYXRpb24sIGFuZCBjdXJyeWluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbnxzdHJpbmd9IGZ1bmMgVGhlIGZ1bmN0aW9uIG9yIG1ldGhvZCBuYW1lIHRvIHdyYXAuXG4gKiBAcGFyYW0ge251bWJlcn0gYml0bWFzayBUaGUgYml0bWFzayBvZiB3cmFwcGVyIGZsYWdzLiBTZWUgYGNyZWF0ZVdyYXBwZXJgIGZvciBtb3JlIGRldGFpbHMuXG4gKiBAcGFyYW0geyp9IFt0aGlzQXJnXSBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGZ1bmNgLlxuICogQHBhcmFtIHtBcnJheX0gW3BhcnRpYWxzXSBUaGUgYXJndW1lbnRzIHRvIHByZXBlbmQgdG8gdGhvc2UgcHJvdmlkZWQgdG8gdGhlIG5ldyBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7QXJyYXl9IFtob2xkZXJzXSBUaGUgYHBhcnRpYWxzYCBwbGFjZWhvbGRlciBpbmRleGVzLlxuICogQHBhcmFtIHtBcnJheX0gW3BhcnRpYWxzUmlnaHRdIFRoZSBhcmd1bWVudHMgdG8gYXBwZW5kIHRvIHRob3NlIHByb3ZpZGVkIHRvIHRoZSBuZXcgZnVuY3Rpb24uXG4gKiBAcGFyYW0ge0FycmF5fSBbaG9sZGVyc1JpZ2h0XSBUaGUgYHBhcnRpYWxzUmlnaHRgIHBsYWNlaG9sZGVyIGluZGV4ZXMuXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJnUG9zXSBUaGUgYXJndW1lbnQgcG9zaXRpb25zIG9mIHRoZSBuZXcgZnVuY3Rpb24uXG4gKiBAcGFyYW0ge251bWJlcn0gW2FyeV0gVGhlIGFyaXR5IGNhcCBvZiBgZnVuY2AuXG4gKiBAcGFyYW0ge251bWJlcn0gW2FyaXR5XSBUaGUgYXJpdHkgb2YgYGZ1bmNgLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgd3JhcHBlZCBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlSHlicmlkV3JhcHBlcihmdW5jLCBiaXRtYXNrLCB0aGlzQXJnLCBwYXJ0aWFscywgaG9sZGVycywgcGFydGlhbHNSaWdodCwgaG9sZGVyc1JpZ2h0LCBhcmdQb3MsIGFyeSwgYXJpdHkpIHtcbiAgdmFyIGlzQXJ5ID0gYml0bWFzayAmIEFSWV9GTEFHLFxuICAgICAgaXNCaW5kID0gYml0bWFzayAmIEJJTkRfRkxBRyxcbiAgICAgIGlzQmluZEtleSA9IGJpdG1hc2sgJiBCSU5EX0tFWV9GTEFHLFxuICAgICAgaXNDdXJyeSA9IGJpdG1hc2sgJiBDVVJSWV9GTEFHLFxuICAgICAgaXNDdXJyeVJpZ2h0ID0gYml0bWFzayAmIENVUlJZX1JJR0hUX0ZMQUcsXG4gICAgICBpc0ZsaXAgPSBiaXRtYXNrICYgRkxJUF9GTEFHLFxuICAgICAgQ3RvciA9IGlzQmluZEtleSA/IHVuZGVmaW5lZCA6IGNyZWF0ZUN0b3JXcmFwcGVyKGZ1bmMpO1xuXG4gIGZ1bmN0aW9uIHdyYXBwZXIoKSB7XG4gICAgdmFyIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGgsXG4gICAgICAgIGluZGV4ID0gbGVuZ3RoLFxuICAgICAgICBhcmdzID0gQXJyYXkobGVuZ3RoKTtcblxuICAgIHdoaWxlIChpbmRleC0tKSB7XG4gICAgICBhcmdzW2luZGV4XSA9IGFyZ3VtZW50c1tpbmRleF07XG4gICAgfVxuICAgIGlmIChwYXJ0aWFscykge1xuICAgICAgYXJncyA9IGNvbXBvc2VBcmdzKGFyZ3MsIHBhcnRpYWxzLCBob2xkZXJzKTtcbiAgICB9XG4gICAgaWYgKHBhcnRpYWxzUmlnaHQpIHtcbiAgICAgIGFyZ3MgPSBjb21wb3NlQXJnc1JpZ2h0KGFyZ3MsIHBhcnRpYWxzUmlnaHQsIGhvbGRlcnNSaWdodCk7XG4gICAgfVxuICAgIGlmIChpc0N1cnJ5IHx8IGlzQ3VycnlSaWdodCkge1xuICAgICAgdmFyIHBsYWNlaG9sZGVyID0gd3JhcHBlci5wbGFjZWhvbGRlcixcbiAgICAgICAgICBhcmdzSG9sZGVycyA9IHJlcGxhY2VIb2xkZXJzKGFyZ3MsIHBsYWNlaG9sZGVyKTtcblxuICAgICAgbGVuZ3RoIC09IGFyZ3NIb2xkZXJzLmxlbmd0aDtcbiAgICAgIGlmIChsZW5ndGggPCBhcml0eSkge1xuICAgICAgICByZXR1cm4gY3JlYXRlUmVjdXJyeVdyYXBwZXIoZnVuYywgYml0bWFzaywgY3JlYXRlSHlicmlkV3JhcHBlciwgcGxhY2Vob2xkZXIsIHRoaXNBcmcsIGFyZ3MsIGFyZ3NIb2xkZXJzLCBhcmdQb3MsIGFyeSwgYXJpdHkgLSBsZW5ndGgpO1xuICAgICAgfVxuICAgIH1cbiAgICB2YXIgdGhpc0JpbmRpbmcgPSBpc0JpbmQgPyB0aGlzQXJnIDogdGhpcyxcbiAgICAgICAgZm4gPSBpc0JpbmRLZXkgPyB0aGlzQmluZGluZ1tmdW5jXSA6IGZ1bmM7XG5cbiAgICBpZiAoYXJnUG9zKSB7XG4gICAgICBhcmdzID0gcmVvcmRlcihhcmdzLCBhcmdQb3MpO1xuICAgIH0gZWxzZSBpZiAoaXNGbGlwICYmIGFyZ3MubGVuZ3RoID4gMSkge1xuICAgICAgYXJncy5yZXZlcnNlKCk7XG4gICAgfVxuICAgIGlmIChpc0FyeSAmJiBhcnkgPCBhcmdzLmxlbmd0aCkge1xuICAgICAgYXJncy5sZW5ndGggPSBhcnk7XG4gICAgfVxuICAgIGlmICh0aGlzICYmIHRoaXMgIT09IHJvb3QgJiYgdGhpcyBpbnN0YW5jZW9mIHdyYXBwZXIpIHtcbiAgICAgIGZuID0gQ3RvciB8fCBjcmVhdGVDdG9yV3JhcHBlcihmbik7XG4gICAgfVxuICAgIHJldHVybiBmbi5hcHBseSh0aGlzQmluZGluZywgYXJncyk7XG4gIH1cbiAgcmV0dXJuIHdyYXBwZXI7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgd3JhcHMgYGZ1bmNgIHRvIGludm9rZSBpdCB3aXRoIHRoZSBvcHRpb25hbCBgdGhpc2BcbiAqIGJpbmRpbmcgb2YgYHRoaXNBcmdgIGFuZCB0aGUgYHBhcnRpYWxzYCBwcmVwZW5kZWQgdG8gdGhvc2UgcHJvdmlkZWQgdG9cbiAqIHRoZSB3cmFwcGVyLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byB3cmFwLlxuICogQHBhcmFtIHtudW1iZXJ9IGJpdG1hc2sgVGhlIGJpdG1hc2sgb2Ygd3JhcHBlciBmbGFncy4gU2VlIGBjcmVhdGVXcmFwcGVyYCBmb3IgbW9yZSBkZXRhaWxzLlxuICogQHBhcmFtIHsqfSB0aGlzQXJnIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgZnVuY2AuXG4gKiBAcGFyYW0ge0FycmF5fSBwYXJ0aWFscyBUaGUgYXJndW1lbnRzIHRvIHByZXBlbmQgdG8gdGhvc2UgcHJvdmlkZWQgdG8gdGhlIG5ldyBmdW5jdGlvbi5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IHdyYXBwZWQgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZVBhcnRpYWxXcmFwcGVyKGZ1bmMsIGJpdG1hc2ssIHRoaXNBcmcsIHBhcnRpYWxzKSB7XG4gIHZhciBpc0JpbmQgPSBiaXRtYXNrICYgQklORF9GTEFHLFxuICAgICAgQ3RvciA9IGNyZWF0ZUN0b3JXcmFwcGVyKGZ1bmMpO1xuXG4gIGZ1bmN0aW9uIHdyYXBwZXIoKSB7XG4gICAgdmFyIGFyZ3NJbmRleCA9IC0xLFxuICAgICAgICBhcmdzTGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aCxcbiAgICAgICAgbGVmdEluZGV4ID0gLTEsXG4gICAgICAgIGxlZnRMZW5ndGggPSBwYXJ0aWFscy5sZW5ndGgsXG4gICAgICAgIGFyZ3MgPSBBcnJheShsZWZ0TGVuZ3RoICsgYXJnc0xlbmd0aCksXG4gICAgICAgIGZuID0gKHRoaXMgJiYgdGhpcyAhPT0gcm9vdCAmJiB0aGlzIGluc3RhbmNlb2Ygd3JhcHBlcikgPyBDdG9yIDogZnVuYztcblxuICAgIHdoaWxlICgrK2xlZnRJbmRleCA8IGxlZnRMZW5ndGgpIHtcbiAgICAgIGFyZ3NbbGVmdEluZGV4XSA9IHBhcnRpYWxzW2xlZnRJbmRleF07XG4gICAgfVxuICAgIHdoaWxlIChhcmdzTGVuZ3RoLS0pIHtcbiAgICAgIGFyZ3NbbGVmdEluZGV4KytdID0gYXJndW1lbnRzWysrYXJnc0luZGV4XTtcbiAgICB9XG4gICAgcmV0dXJuIGFwcGx5KGZuLCBpc0JpbmQgPyB0aGlzQXJnIDogdGhpcywgYXJncyk7XG4gIH1cbiAgcmV0dXJuIHdyYXBwZXI7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgd3JhcHMgYGZ1bmNgIHRvIGNvbnRpbnVlIGN1cnJ5aW5nLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byB3cmFwLlxuICogQHBhcmFtIHtudW1iZXJ9IGJpdG1hc2sgVGhlIGJpdG1hc2sgb2Ygd3JhcHBlciBmbGFncy4gU2VlIGBjcmVhdGVXcmFwcGVyYCBmb3IgbW9yZSBkZXRhaWxzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gd3JhcEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNyZWF0ZSB0aGUgYGZ1bmNgIHdyYXBwZXIuXG4gKiBAcGFyYW0geyp9IHBsYWNlaG9sZGVyIFRoZSBwbGFjZWhvbGRlciB0byByZXBsYWNlLlxuICogQHBhcmFtIHsqfSBbdGhpc0FyZ10gVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBmdW5jYC5cbiAqIEBwYXJhbSB7QXJyYXl9IFtwYXJ0aWFsc10gVGhlIGFyZ3VtZW50cyB0byBwcmVwZW5kIHRvIHRob3NlIHByb3ZpZGVkIHRvIHRoZSBuZXcgZnVuY3Rpb24uXG4gKiBAcGFyYW0ge0FycmF5fSBbaG9sZGVyc10gVGhlIGBwYXJ0aWFsc2AgcGxhY2Vob2xkZXIgaW5kZXhlcy5cbiAqIEBwYXJhbSB7QXJyYXl9IFthcmdQb3NdIFRoZSBhcmd1bWVudCBwb3NpdGlvbnMgb2YgdGhlIG5ldyBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbYXJ5XSBUaGUgYXJpdHkgY2FwIG9mIGBmdW5jYC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbYXJpdHldIFRoZSBhcml0eSBvZiBgZnVuY2AuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyB3cmFwcGVkIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBjcmVhdGVSZWN1cnJ5V3JhcHBlcihmdW5jLCBiaXRtYXNrLCB3cmFwRnVuYywgcGxhY2Vob2xkZXIsIHRoaXNBcmcsIHBhcnRpYWxzLCBob2xkZXJzLCBhcmdQb3MsIGFyeSwgYXJpdHkpIHtcbiAgdmFyIGlzQ3VycnkgPSBiaXRtYXNrICYgQ1VSUllfRkxBRyxcbiAgICAgIG5ld0FyZ1BvcyA9IGFyZ1BvcyA/IGNvcHlBcnJheShhcmdQb3MpIDogdW5kZWZpbmVkLFxuICAgICAgbmV3c0hvbGRlcnMgPSBpc0N1cnJ5ID8gaG9sZGVycyA6IHVuZGVmaW5lZCxcbiAgICAgIG5ld0hvbGRlcnNSaWdodCA9IGlzQ3VycnkgPyB1bmRlZmluZWQgOiBob2xkZXJzLFxuICAgICAgbmV3UGFydGlhbHMgPSBpc0N1cnJ5ID8gcGFydGlhbHMgOiB1bmRlZmluZWQsXG4gICAgICBuZXdQYXJ0aWFsc1JpZ2h0ID0gaXNDdXJyeSA/IHVuZGVmaW5lZCA6IHBhcnRpYWxzO1xuXG4gIGJpdG1hc2sgfD0gKGlzQ3VycnkgPyBQQVJUSUFMX0ZMQUcgOiBQQVJUSUFMX1JJR0hUX0ZMQUcpO1xuICBiaXRtYXNrICY9IH4oaXNDdXJyeSA/IFBBUlRJQUxfUklHSFRfRkxBRyA6IFBBUlRJQUxfRkxBRyk7XG5cbiAgaWYgKCEoYml0bWFzayAmIENVUlJZX0JPVU5EX0ZMQUcpKSB7XG4gICAgYml0bWFzayAmPSB+KEJJTkRfRkxBRyB8IEJJTkRfS0VZX0ZMQUcpO1xuICB9XG4gIHZhciByZXN1bHQgPSB3cmFwRnVuYyhmdW5jLCBiaXRtYXNrLCB0aGlzQXJnLCBuZXdQYXJ0aWFscywgbmV3c0hvbGRlcnMsIG5ld1BhcnRpYWxzUmlnaHQsIG5ld0hvbGRlcnNSaWdodCwgbmV3QXJnUG9zLCBhcnksIGFyaXR5KTtcblxuICByZXN1bHQucGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlcjtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBlaXRoZXIgY3VycmllcyBvciBpbnZva2VzIGBmdW5jYCB3aXRoIG9wdGlvbmFsXG4gKiBgdGhpc2AgYmluZGluZyBhbmQgcGFydGlhbGx5IGFwcGxpZWQgYXJndW1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufHN0cmluZ30gZnVuYyBUaGUgZnVuY3Rpb24gb3IgbWV0aG9kIG5hbWUgdG8gd3JhcC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBiaXRtYXNrIFRoZSBiaXRtYXNrIG9mIHdyYXBwZXIgZmxhZ3MuXG4gKiAgVGhlIGJpdG1hc2sgbWF5IGJlIGNvbXBvc2VkIG9mIHRoZSBmb2xsb3dpbmcgZmxhZ3M6XG4gKiAgICAgMSAtIGBfLmJpbmRgXG4gKiAgICAgMiAtIGBfLmJpbmRLZXlgXG4gKiAgICAgNCAtIGBfLmN1cnJ5YCBvciBgXy5jdXJyeVJpZ2h0YCBvZiBhIGJvdW5kIGZ1bmN0aW9uXG4gKiAgICAgOCAtIGBfLmN1cnJ5YFxuICogICAgMTYgLSBgXy5jdXJyeVJpZ2h0YFxuICogICAgMzIgLSBgXy5wYXJ0aWFsYFxuICogICAgNjQgLSBgXy5wYXJ0aWFsUmlnaHRgXG4gKiAgIDEyOCAtIGBfLnJlYXJnYFxuICogICAyNTYgLSBgXy5hcnlgXG4gKiBAcGFyYW0geyp9IFt0aGlzQXJnXSBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGZ1bmNgLlxuICogQHBhcmFtIHtBcnJheX0gW3BhcnRpYWxzXSBUaGUgYXJndW1lbnRzIHRvIGJlIHBhcnRpYWxseSBhcHBsaWVkLlxuICogQHBhcmFtIHtBcnJheX0gW2hvbGRlcnNdIFRoZSBgcGFydGlhbHNgIHBsYWNlaG9sZGVyIGluZGV4ZXMuXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJnUG9zXSBUaGUgYXJndW1lbnQgcG9zaXRpb25zIG9mIHRoZSBuZXcgZnVuY3Rpb24uXG4gKiBAcGFyYW0ge251bWJlcn0gW2FyeV0gVGhlIGFyaXR5IGNhcCBvZiBgZnVuY2AuXG4gKiBAcGFyYW0ge251bWJlcn0gW2FyaXR5XSBUaGUgYXJpdHkgb2YgYGZ1bmNgLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgd3JhcHBlZCBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlV3JhcHBlcihmdW5jLCBiaXRtYXNrLCB0aGlzQXJnLCBwYXJ0aWFscywgaG9sZGVycywgYXJnUG9zLCBhcnksIGFyaXR5KSB7XG4gIHZhciBpc0JpbmRLZXkgPSBiaXRtYXNrICYgQklORF9LRVlfRkxBRztcbiAgaWYgKCFpc0JpbmRLZXkgJiYgdHlwZW9mIGZ1bmMgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoRlVOQ19FUlJPUl9URVhUKTtcbiAgfVxuICB2YXIgbGVuZ3RoID0gcGFydGlhbHMgPyBwYXJ0aWFscy5sZW5ndGggOiAwO1xuICBpZiAoIWxlbmd0aCkge1xuICAgIGJpdG1hc2sgJj0gfihQQVJUSUFMX0ZMQUcgfCBQQVJUSUFMX1JJR0hUX0ZMQUcpO1xuICAgIHBhcnRpYWxzID0gaG9sZGVycyA9IHVuZGVmaW5lZDtcbiAgfVxuICBhcnkgPSBhcnkgPT09IHVuZGVmaW5lZCA/IGFyeSA6IG5hdGl2ZU1heCh0b0ludGVnZXIoYXJ5KSwgMCk7XG4gIGFyaXR5ID0gYXJpdHkgPT09IHVuZGVmaW5lZCA/IGFyaXR5IDogdG9JbnRlZ2VyKGFyaXR5KTtcbiAgbGVuZ3RoIC09IGhvbGRlcnMgPyBob2xkZXJzLmxlbmd0aCA6IDA7XG5cbiAgaWYgKGJpdG1hc2sgJiBQQVJUSUFMX1JJR0hUX0ZMQUcpIHtcbiAgICB2YXIgcGFydGlhbHNSaWdodCA9IHBhcnRpYWxzLFxuICAgICAgICBob2xkZXJzUmlnaHQgPSBob2xkZXJzO1xuXG4gICAgcGFydGlhbHMgPSBob2xkZXJzID0gdW5kZWZpbmVkO1xuICB9XG4gIHZhciBuZXdEYXRhID0gW2Z1bmMsIGJpdG1hc2ssIHRoaXNBcmcsIHBhcnRpYWxzLCBob2xkZXJzLCBwYXJ0aWFsc1JpZ2h0LCBob2xkZXJzUmlnaHQsIGFyZ1BvcywgYXJ5LCBhcml0eV07XG5cbiAgZnVuYyA9IG5ld0RhdGFbMF07XG4gIGJpdG1hc2sgPSBuZXdEYXRhWzFdO1xuICB0aGlzQXJnID0gbmV3RGF0YVsyXTtcbiAgcGFydGlhbHMgPSBuZXdEYXRhWzNdO1xuICBob2xkZXJzID0gbmV3RGF0YVs0XTtcbiAgYXJpdHkgPSBuZXdEYXRhWzldID0gbmV3RGF0YVs5XSA9PSBudWxsXG4gICAgPyAoaXNCaW5kS2V5ID8gMCA6IGZ1bmMubGVuZ3RoKVxuICAgIDogbmF0aXZlTWF4KG5ld0RhdGFbOV0gLSBsZW5ndGgsIDApO1xuXG4gIGlmICghYXJpdHkgJiYgYml0bWFzayAmIChDVVJSWV9GTEFHIHwgQ1VSUllfUklHSFRfRkxBRykpIHtcbiAgICBiaXRtYXNrICY9IH4oQ1VSUllfRkxBRyB8IENVUlJZX1JJR0hUX0ZMQUcpO1xuICB9XG4gIGlmICghYml0bWFzayB8fCBiaXRtYXNrID09IEJJTkRfRkxBRykge1xuICAgIHZhciByZXN1bHQgPSBjcmVhdGVCYXNlV3JhcHBlcihmdW5jLCBiaXRtYXNrLCB0aGlzQXJnKTtcbiAgfSBlbHNlIGlmIChiaXRtYXNrID09IENVUlJZX0ZMQUcgfHwgYml0bWFzayA9PSBDVVJSWV9SSUdIVF9GTEFHKSB7XG4gICAgcmVzdWx0ID0gY3JlYXRlQ3VycnlXcmFwcGVyKGZ1bmMsIGJpdG1hc2ssIGFyaXR5KTtcbiAgfSBlbHNlIGlmICgoYml0bWFzayA9PSBQQVJUSUFMX0ZMQUcgfHwgYml0bWFzayA9PSAoQklORF9GTEFHIHwgUEFSVElBTF9GTEFHKSkgJiYgIWhvbGRlcnMubGVuZ3RoKSB7XG4gICAgcmVzdWx0ID0gY3JlYXRlUGFydGlhbFdyYXBwZXIoZnVuYywgYml0bWFzaywgdGhpc0FyZywgcGFydGlhbHMpO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdCA9IGNyZWF0ZUh5YnJpZFdyYXBwZXIuYXBwbHkodW5kZWZpbmVkLCBuZXdEYXRhKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFJlb3JkZXIgYGFycmF5YCBhY2NvcmRpbmcgdG8gdGhlIHNwZWNpZmllZCBpbmRleGVzIHdoZXJlIHRoZSBlbGVtZW50IGF0XG4gKiB0aGUgZmlyc3QgaW5kZXggaXMgYXNzaWduZWQgYXMgdGhlIGZpcnN0IGVsZW1lbnQsIHRoZSBlbGVtZW50IGF0XG4gKiB0aGUgc2Vjb25kIGluZGV4IGlzIGFzc2lnbmVkIGFzIHRoZSBzZWNvbmQgZWxlbWVudCwgYW5kIHNvIG9uLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gcmVvcmRlci5cbiAqIEBwYXJhbSB7QXJyYXl9IGluZGV4ZXMgVGhlIGFycmFuZ2VkIGFycmF5IGluZGV4ZXMuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYGFycmF5YC5cbiAqL1xuZnVuY3Rpb24gcmVvcmRlcihhcnJheSwgaW5kZXhlcykge1xuICB2YXIgYXJyTGVuZ3RoID0gYXJyYXkubGVuZ3RoLFxuICAgICAgbGVuZ3RoID0gbmF0aXZlTWluKGluZGV4ZXMubGVuZ3RoLCBhcnJMZW5ndGgpLFxuICAgICAgb2xkQXJyYXkgPSBjb3B5QXJyYXkoYXJyYXkpO1xuXG4gIHdoaWxlIChsZW5ndGgtLSkge1xuICAgIHZhciBpbmRleCA9IGluZGV4ZXNbbGVuZ3RoXTtcbiAgICBhcnJheVtsZW5ndGhdID0gaXNJbmRleChpbmRleCwgYXJyTGVuZ3RoKSA/IG9sZEFycmF5W2luZGV4XSA6IHVuZGVmaW5lZDtcbiAgfVxuICByZXR1cm4gYXJyYXk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBGdW5jdGlvbmAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBjb3JyZWN0bHkgY2xhc3NpZmllZCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oXyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0Z1bmN0aW9uKC9hYmMvKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsdWUpIHtcbiAgLy8gVGhlIHVzZSBvZiBgT2JqZWN0I3RvU3RyaW5nYCBhdm9pZHMgaXNzdWVzIHdpdGggdGhlIGB0eXBlb2ZgIG9wZXJhdG9yXG4gIC8vIGluIFNhZmFyaSA4IHdoaWNoIHJldHVybnMgJ29iamVjdCcgZm9yIHR5cGVkIGFycmF5IGNvbnN0cnVjdG9ycywgYW5kXG4gIC8vIFBoYW50b21KUyAxLjkgd2hpY2ggcmV0dXJucyAnZnVuY3Rpb24nIGZvciBgTm9kZUxpc3RgIGluc3RhbmNlcy5cbiAgdmFyIHRhZyA9IGlzT2JqZWN0KHZhbHVlKSA/IG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpIDogJyc7XG4gIHJldHVybiB0YWcgPT0gZnVuY1RhZyB8fCB0YWcgPT0gZ2VuVGFnO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZSBbbGFuZ3VhZ2UgdHlwZV0oaHR0cHM6Ly9lczUuZ2l0aHViLmlvLyN4OCkgb2YgYE9iamVjdGAuXG4gKiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gISF2YWx1ZSAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYW4gaW50ZWdlci5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBpcyBsb29zZWx5IGJhc2VkIG9uIFtgVG9JbnRlZ2VyYF0oaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLXRvaW50ZWdlcikuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb252ZXJ0LlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgY29udmVydGVkIGludGVnZXIuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udG9JbnRlZ2VyKDMpO1xuICogLy8gPT4gM1xuICpcbiAqIF8udG9JbnRlZ2VyKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gMFxuICpcbiAqIF8udG9JbnRlZ2VyKEluZmluaXR5KTtcbiAqIC8vID0+IDEuNzk3NjkzMTM0ODYyMzE1N2UrMzA4XG4gKlxuICogXy50b0ludGVnZXIoJzMnKTtcbiAqIC8vID0+IDNcbiAqL1xuZnVuY3Rpb24gdG9JbnRlZ2VyKHZhbHVlKSB7XG4gIGlmICghdmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IDAgPyB2YWx1ZSA6IDA7XG4gIH1cbiAgdmFsdWUgPSB0b051bWJlcih2YWx1ZSk7XG4gIGlmICh2YWx1ZSA9PT0gSU5GSU5JVFkgfHwgdmFsdWUgPT09IC1JTkZJTklUWSkge1xuICAgIHZhciBzaWduID0gKHZhbHVlIDwgMCA/IC0xIDogMSk7XG4gICAgcmV0dXJuIHNpZ24gKiBNQVhfSU5URUdFUjtcbiAgfVxuICB2YXIgcmVtYWluZGVyID0gdmFsdWUgJSAxO1xuICByZXR1cm4gdmFsdWUgPT09IHZhbHVlID8gKHJlbWFpbmRlciA/IHZhbHVlIC0gcmVtYWluZGVyIDogdmFsdWUpIDogMDtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgbnVtYmVyLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIG51bWJlci5cbiAqIEBleGFtcGxlXG4gKlxuICogXy50b051bWJlcigzKTtcbiAqIC8vID0+IDNcbiAqXG4gKiBfLnRvTnVtYmVyKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gNWUtMzI0XG4gKlxuICogXy50b051bWJlcihJbmZpbml0eSk7XG4gKiAvLyA9PiBJbmZpbml0eVxuICpcbiAqIF8udG9OdW1iZXIoJzMnKTtcbiAqIC8vID0+IDNcbiAqL1xuZnVuY3Rpb24gdG9OdW1iZXIodmFsdWUpIHtcbiAgaWYgKGlzT2JqZWN0KHZhbHVlKSkge1xuICAgIHZhciBvdGhlciA9IGlzRnVuY3Rpb24odmFsdWUudmFsdWVPZikgPyB2YWx1ZS52YWx1ZU9mKCkgOiB2YWx1ZTtcbiAgICB2YWx1ZSA9IGlzT2JqZWN0KG90aGVyKSA/IChvdGhlciArICcnKSA6IG90aGVyO1xuICB9XG4gIGlmICh0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IDAgPyB2YWx1ZSA6ICt2YWx1ZTtcbiAgfVxuICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UocmVUcmltLCAnJyk7XG4gIHZhciBpc0JpbmFyeSA9IHJlSXNCaW5hcnkudGVzdCh2YWx1ZSk7XG4gIHJldHVybiAoaXNCaW5hcnkgfHwgcmVJc09jdGFsLnRlc3QodmFsdWUpKVxuICAgID8gZnJlZVBhcnNlSW50KHZhbHVlLnNsaWNlKDIpLCBpc0JpbmFyeSA/IDIgOiA4KVxuICAgIDogKHJlSXNCYWRIZXgudGVzdCh2YWx1ZSkgPyBOQU4gOiArdmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZVdyYXBwZXI7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuMSAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNiBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE2IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG5cbi8qKiBVc2VkIHRvIGRldGVybWluZSBpZiB2YWx1ZXMgYXJlIG9mIHRoZSBsYW5ndWFnZSB0eXBlIGBPYmplY3RgLiAqL1xudmFyIG9iamVjdFR5cGVzID0ge1xuICAnZnVuY3Rpb24nOiB0cnVlLFxuICAnb2JqZWN0JzogdHJ1ZVxufTtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBleHBvcnRzYC4gKi9cbnZhciBmcmVlRXhwb3J0cyA9IChvYmplY3RUeXBlc1t0eXBlb2YgZXhwb3J0c10gJiYgZXhwb3J0cyAmJiAhZXhwb3J0cy5ub2RlVHlwZSlcbiAgPyBleHBvcnRzXG4gIDogdW5kZWZpbmVkO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYG1vZHVsZWAuICovXG52YXIgZnJlZU1vZHVsZSA9IChvYmplY3RUeXBlc1t0eXBlb2YgbW9kdWxlXSAmJiBtb2R1bGUgJiYgIW1vZHVsZS5ub2RlVHlwZSlcbiAgPyBtb2R1bGVcbiAgOiB1bmRlZmluZWQ7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZUdsb2JhbCA9IGNoZWNrR2xvYmFsKGZyZWVFeHBvcnRzICYmIGZyZWVNb2R1bGUgJiYgdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwpO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHNlbGZgLiAqL1xudmFyIGZyZWVTZWxmID0gY2hlY2tHbG9iYWwob2JqZWN0VHlwZXNbdHlwZW9mIHNlbGZdICYmIHNlbGYpO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHdpbmRvd2AuICovXG52YXIgZnJlZVdpbmRvdyA9IGNoZWNrR2xvYmFsKG9iamVjdFR5cGVzW3R5cGVvZiB3aW5kb3ddICYmIHdpbmRvdyk7XG5cbi8qKiBEZXRlY3QgYHRoaXNgIGFzIHRoZSBnbG9iYWwgb2JqZWN0LiAqL1xudmFyIHRoaXNHbG9iYWwgPSBjaGVja0dsb2JhbChvYmplY3RUeXBlc1t0eXBlb2YgdGhpc10gJiYgdGhpcyk7XG5cbi8qKlxuICogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC5cbiAqXG4gKiBUaGUgYHRoaXNgIHZhbHVlIGlzIHVzZWQgaWYgaXQncyB0aGUgZ2xvYmFsIG9iamVjdCB0byBhdm9pZCBHcmVhc2Vtb25rZXknc1xuICogcmVzdHJpY3RlZCBgd2luZG93YCBvYmplY3QsIG90aGVyd2lzZSB0aGUgYHdpbmRvd2Agb2JqZWN0IGlzIHVzZWQuXG4gKi9cbnZhciByb290ID0gZnJlZUdsb2JhbCB8fFxuICAoKGZyZWVXaW5kb3cgIT09ICh0aGlzR2xvYmFsICYmIHRoaXNHbG9iYWwud2luZG93KSkgJiYgZnJlZVdpbmRvdykgfHxcbiAgICBmcmVlU2VsZiB8fCB0aGlzR2xvYmFsIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBnbG9iYWwgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtudWxsfE9iamVjdH0gUmV0dXJucyBgdmFsdWVgIGlmIGl0J3MgYSBnbG9iYWwgb2JqZWN0LCBlbHNlIGBudWxsYC5cbiAqL1xuZnVuY3Rpb24gY2hlY2tHbG9iYWwodmFsdWUpIHtcbiAgcmV0dXJuICh2YWx1ZSAmJiB2YWx1ZS5PYmplY3QgPT09IE9iamVjdCkgPyB2YWx1ZSA6IG51bGw7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcm9vdDtcbiIsIi8qKlxuICogbG9kYXNoIDMuMC4xIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG52YXIgY3JlYXRlV3JhcHBlciA9IHJlcXVpcmUoJ2xvZGFzaC5fY3JlYXRld3JhcHBlcicpO1xuXG4vKiogVXNlZCB0byBjb21wb3NlIGJpdG1hc2tzIGZvciB3cmFwcGVyIG1ldGFkYXRhLiAqL1xudmFyIFBBUlRJQUxfRkxBRyA9IDMyO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IHByb3ZpZGVzIGB2YWx1ZWAgdG8gdGhlIHdyYXBwZXIgZnVuY3Rpb24gYXMgaXRzXG4gKiBmaXJzdCBhcmd1bWVudC4gQW55IGFkZGl0aW9uYWwgYXJndW1lbnRzIHByb3ZpZGVkIHRvIHRoZSBmdW5jdGlvbiBhcmVcbiAqIGFwcGVuZGVkIHRvIHRob3NlIHByb3ZpZGVkIHRvIHRoZSB3cmFwcGVyIGZ1bmN0aW9uLiBUaGUgd3JhcHBlciBpcyBpbnZva2VkXG4gKiB3aXRoIHRoZSBgdGhpc2AgYmluZGluZyBvZiB0aGUgY3JlYXRlZCBmdW5jdGlvbi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byB3cmFwLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gd3JhcHBlciBUaGUgd3JhcHBlciBmdW5jdGlvbi5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgcCA9IF8ud3JhcChfLmVzY2FwZSwgZnVuY3Rpb24oZnVuYywgdGV4dCkge1xuICogICByZXR1cm4gJzxwPicgKyBmdW5jKHRleHQpICsgJzwvcD4nO1xuICogfSk7XG4gKlxuICogcCgnZnJlZCwgYmFybmV5LCAmIHBlYmJsZXMnKTtcbiAqIC8vID0+ICc8cD5mcmVkLCBiYXJuZXksICZhbXA7IHBlYmJsZXM8L3A+J1xuICovXG5mdW5jdGlvbiB3cmFwKHZhbHVlLCB3cmFwcGVyKSB7XG4gIHdyYXBwZXIgPSB3cmFwcGVyID09IG51bGwgPyBpZGVudGl0eSA6IHdyYXBwZXI7XG4gIHJldHVybiBjcmVhdGVXcmFwcGVyKHdyYXBwZXIsIFBBUlRJQUxfRkxBRywgdW5kZWZpbmVkLCBbdmFsdWVdLCBbXSk7XG59XG5cbi8qKlxuICogVGhpcyBtZXRob2QgcmV0dXJucyB0aGUgZmlyc3QgYXJndW1lbnQgcHJvdmlkZWQgdG8gaXQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBVdGlsaXR5XG4gKiBAcGFyYW0geyp9IHZhbHVlIEFueSB2YWx1ZS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIGB2YWx1ZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICd1c2VyJzogJ2ZyZWQnIH07XG4gKlxuICogXy5pZGVudGl0eShvYmplY3QpID09PSBvYmplY3Q7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlkZW50aXR5KHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB3cmFwO1xuIiwidmFyIE8gPSByZXF1aXJlKFwib29sb25nXCIpXG52YXIgRklSU1RfTElORSA9IC9eLiokL21cbm1vZHVsZS5leHBvcnRzID0gQXNzZXJ0aW9uRXJyb3JcblxuLyoqXG4gKiBFcnJvciBvYmplY3QgdGhyb3duIHdoZW4gYW4gYXNzZXJ0aW9uIGZhaWxzLlxuICpcbiAqIEBjbGFzcyBBc3NlcnRpb25FcnJvclxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0gbWVzc2FnZVxuICogQHBhcmFtIFtvcHRpb25zXVxuICovXG5mdW5jdGlvbiBBc3NlcnRpb25FcnJvcihtc2csIG9wdHMpIHtcbiAgdGhpcy5tZXNzYWdlID0gbXNnXG5cbiAgLyoqXG4gICAqIFRoZSBhc3NlcnRlZCBvYmplY3QuXG4gICAqXG4gICAqIEBwcm9wZXJ0eSBhY3R1YWxcbiAgICovXG4gIGlmIChvcHRzICYmIFwiYWN0dWFsXCIgaW4gb3B0cykgdGhpcy5hY3R1YWwgPSBvcHRzLmFjdHVhbFxuXG4gIC8qKlxuICAgKiBJZiB0aGUgbWF0Y2hlciB0b29rIGFuIGFyZ3VtZW50IG9yIGFzc2VydGVkIGFnYWluc3Qgc29tZXRoaW5nIChsaWtlXG4gICAqIGBmb28ubXVzdC5iZS50cnVlKClgKSwgdGhlbiB0aGlzIGlzIHRoZSBleHBlY3RlZCB2YWx1ZS5cbiAgICpcbiAgICogQHByb3BlcnR5IGV4cGVjdGVkXG4gICAqL1xuICBpZiAob3B0cyAmJiBcImV4cGVjdGVkXCIgaW4gb3B0cykgdGhpcy5leHBlY3RlZCA9IG9wdHMuZXhwZWN0ZWRcblxuICAvKipcbiAgICogV2hldGhlciBpdCBtYWtlcyBzZW5zZSB0byBjb21wYXJlIG9iamVjdHMgZ3JhbnVsYXJseSBvciBldmVuIHNob3cgYSBkaWZmXG4gICAqIHZpZXcgb2YgdGhlIG9iamVjdHMgaW52b2x2ZWQuICBcbiAgICpcbiAgICogTW9zdCBtYXRjaGVycyAoZS5nLiBbYGVtcHR5YF0oI011c3QucHJvdG90eXBlLmVtcHR5KSBhbmRcbiAgICogW2BzdHJpbmdgXSgjTXVzdC5wcm90b3R5cGUuc3RyaW5nKSkgYXJlIGNvbmNyZXRlLCBzdHJpY3QgYW5kIGF0b21pYyBhbmRcbiAgICogZG9uJ3QgbGVuZCB0aGVtc2VsdmVzIHRvIGJlIGNvbXBhcmVkIHByb3BlcnR5IGJ5IHByb3BlcnR5LiAgT3RoZXJzIGhvd2V2ZXIsXG4gICAqIGxpa2UgW2BlcWxgXSgjTXVzdC5wcm90b3R5cGUuZXFsKSwgYXJlIG1vcmUgZ3JhbnVsYXIgYW5kIGNvbXBhcmluZyB0aGVtXG4gICAqIGxpbmUgYnkgbGluZSBoZWxwcyB1bmRlcnN0YW5kIGhvdyB0aGV5IGRpZmZlci5cbiAgICpcbiAgICogQHByb3BlcnR5IGRpZmZhYmxlXG4gICAqL1xuICBpZiAob3B0cyAmJiBcImRpZmZhYmxlXCIgaW4gb3B0cykgdGhpcy5kaWZmYWJsZSA9IG9wdHMuZGlmZmFibGVcblxuICAvKipcbiAgICogVGhlIHN0YWNrIHRyYWNlIHN0YXJ0aW5nIGZyb20gdGhlIGNvZGUgdGhhdCBjYWxsZWQgYG11c3RgLlxuICAgKlxuICAgKiBAcHJvcGVydHkgc3RhY2tcbiAgICovXG4gIGlmIChvcHRzICYmIG9wdHMuc3RhY2sgIT0gbnVsbCkgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwic3RhY2tcIiwge1xuICAgIHZhbHVlOiBvcHRzLnN0YWNrLnJlcGxhY2UoRklSU1RfTElORSwgdGhpcyksXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLCB3cml0YWJsZTogdHJ1ZVxuICB9KVxuICBlbHNlIGlmIChFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSlcbiAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCBvcHRzICYmIG9wdHMuY2FsbGVyIHx8IHRoaXMuY29uc3RydWN0b3IpXG59XG5cbkFzc2VydGlvbkVycm9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRXJyb3IucHJvdG90eXBlLCB7XG4gIGNvbnN0cnVjdG9yOiB7dmFsdWU6IEFzc2VydGlvbkVycm9yLCBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlfVxufSlcblxuQXNzZXJ0aW9uRXJyb3IucHJvdG90eXBlLm5hbWUgPSBcIkFzc2VydGlvbkVycm9yXCJcblxuLyoqXG4gKiBTb21lIHRlc3QgcnVubmVycyAobGlrZSBbTW9jaGFdKGh0dHA6Ly92aXNpb25tZWRpYS5naXRodWIuaW8vbW9jaGEvKSkgZXhwZWN0XG4gKiB0aGlzIHByb3BlcnR5IGluc3RlYWQuXG4gKlxuICogQHByb3BlcnR5IHNob3dEaWZmXG4gKiBAYWxpYXMgZGlmZmFibGVcbiAqL1xuTy5kZWZpbmVHZXR0ZXIoQXNzZXJ0aW9uRXJyb3IucHJvdG90eXBlLCBcInNob3dEaWZmXCIsIGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5kaWZmYWJsZVxufSlcbiIsImV4cG9ydHMuc2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24ob2JqLCBwcm90b3R5cGUpIHtcbiAgLyogZXNsaW50IG5vLXByb3RvOiAwICovXG4gIG9iai5fX3Byb3RvX18gPSBwcm90b3R5cGVcbiAgcmV0dXJuIG9ialxufVxuXG5leHBvcnRzLnN0YXJ0c1dpdGggPSBTdHJpbmcucHJvdG90eXBlLnN0YXJ0c1dpdGggP1xuICBGdW5jdGlvbi5jYWxsLmJpbmQoU3RyaW5nLnByb3RvdHlwZS5zdGFydHNXaXRoKSA6XG4gIGZ1bmN0aW9uKGhheXN0YWNrLCBuZWVkbGUpIHtcbiAgcmV0dXJuIGhheXN0YWNrLmxhc3RJbmRleE9mKG5lZWRsZSwgMCkgPT09IDBcbn1cblxuZXhwb3J0cy5lbmRzV2l0aCA9IFN0cmluZy5wcm90b3R5cGUuZW5kc1dpdGggP1xuICBGdW5jdGlvbi5jYWxsLmJpbmQoU3RyaW5nLnByb3RvdHlwZS5lbmRzV2l0aCkgOlxuICBmdW5jdGlvbihoYXlzdGFjaywgbmVlZGxlKSB7XG4gIHJldHVybiBoYXlzdGFjay5pbmRleE9mKG5lZWRsZSwgaGF5c3RhY2subGVuZ3RoIC0gbmVlZGxlLmxlbmd0aCkgPj0gMFxufVxuIiwidmFyIGtpbmRvZiA9IHJlcXVpcmUoXCJraW5kb2ZcIilcbnZhciBqc29uaWZ5ID0gcmVxdWlyZShcImpzb24tc3RyaW5naWZ5LXNhZmVcIilcbnZhciBzZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoXCIuL2VzNlwiKS5zZXRQcm90b3R5cGVPZlxudmFyIElOREVOVCA9IG51bGxcblxuZXhwb3J0cy5jaGFpbiA9IGZ1bmN0aW9uKHNlbGYsIGZuKSB7XG4gIGlmICh0eXBlb2YgZm4gIT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiTm90IGEgZnVuY3Rpb246IFwiICsgZm4pXG5cbiAgLy8gRG9uJ3Qgc2V0IHRvU3RyaW5nIGFzIGl0IHNlZW1zIHRvIGJyZWFrIFwic291cmNlLW1hcC1zdXBwb3J0XCIuIFRoaXMgaXNcbiAgLy8gYSBmdW5jdGlvbiB3aXRoIGFuIE9iamVjdCBwcm90b3R5cGUsIGFmdGVyIGFsbC5cbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHNldFByb3RvdHlwZU9mKGZuLmJpbmQoc2VsZiksIHNlbGYpLCB7XG4gICAgYmluZDoge3ZhbHVlOiBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHksIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWV9LFxuICAgIGNhbGw6IHt2YWx1ZTogRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LCBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlfSxcbiAgICBhcHBseToge3ZhbHVlOiBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHksIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWV9XG4gIH0pXG59XG5cbmV4cG9ydHMuc3RyaW5naWZ5ID0gZnVuY3Rpb24gc3RyaW5naWZ5KG9iaikge1xuICB2YXIgcm9vdCA9IG9ialxuXG4gIHN3aXRjaCAoa2luZG9mKG9iaikpIHtcbiAgICAvLyBBbGxvdyBmYWxsaW5nIHRocm91Z2g6XG4gICAgLyoganNoaW50IC1XMDg2ICovXG4gICAgLyogZXNsaW50IG5vLWZhbGx0aHJvdWdoOiAwICovXG4gICAgY2FzZSBcIm51bGxcIjogcmV0dXJuIFwibnVsbFwiXG4gICAgY2FzZSBcInVuZGVmaW5lZFwiOiByZXR1cm4gXCJ1bmRlZmluZWRcIlxuICAgIGNhc2UgXCJudW1iZXJcIjogcmV0dXJuIG9iai50b1N0cmluZygpXG4gICAgY2FzZSBcInN0cmluZ1wiOiByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqKVxuICAgIGNhc2UgXCJzeW1ib2xcIjogcmV0dXJuIG9iai50b1N0cmluZygpXG4gICAgY2FzZSBcInJlZ2V4cFwiOiByZXR1cm4gb2JqLnRvU3RyaW5nKClcbiAgICBjYXNlIFwiZGF0ZVwiOiByZXR1cm4gb2JqLnRvSVNPU3RyaW5nKClcbiAgICBjYXNlIFwiZnVuY3Rpb25cIjogcmV0dXJuIG9iai50b1N0cmluZygpXG5cbiAgICBjYXNlIFwib2JqZWN0XCI6XG4gICAgICBvYmogPSBjbG9uZShvYmopXG4gICAgICBpZiAocm9vdCBpbnN0YW5jZW9mIEVycm9yKSBvYmoubWVzc2FnZSA9IHJvb3QubWVzc2FnZVxuICAgICAgLy8gRmFsbCB0aHJvdWdoLlxuXG4gICAgZGVmYXVsdDogcmV0dXJuIGpzb25pZnkob2JqLCBzdHJpbmdpZnlWYWx1ZSwgSU5ERU5UKVxuICB9XG59XG5cbmZ1bmN0aW9uIGNsb25lKG9iaikge1xuICB2YXIgY2xvbmUgPSB7fSwgdmFsdWVcbiAgZm9yICh2YXIga2V5IGluIG9iaikgY2xvbmVba2V5XSA9ICh2YWx1ZSA9IG9ialtrZXldKSA9PT0gb2JqID8gY2xvbmUgOiB2YWx1ZVxuICByZXR1cm4gY2xvbmVcbn1cblxuZnVuY3Rpb24gc3RyaW5naWZ5VmFsdWUoa2V5LCB2YWx1ZSkge1xuICBzd2l0Y2ggKGtpbmRvZih2YWx1ZSkpIHtcbiAgICBjYXNlIFwidW5kZWZpbmVkXCI6IHJldHVybiBcIltVbmRlZmluZWRdXCJcbiAgICBjYXNlIFwibnVtYmVyXCI6IHJldHVybiBpc05hTih2YWx1ZSkgPyBcIltOYU5dXCIgOiB2YWx1ZVxuICAgIGNhc2UgXCJzeW1ib2xcIjogcmV0dXJuIHZhbHVlLnRvU3RyaW5nKClcbiAgICBjYXNlIFwicmVnZXhwXCI6IHJldHVybiB2YWx1ZS50b1N0cmluZygpXG4gICAgZGVmYXVsdDogcmV0dXJuIHZhbHVlXG4gIH1cbn1cbiIsInZhciBBc3NlcnRpb25FcnJvciA9IHJlcXVpcmUoXCIuL2Fzc2VydGlvbl9lcnJvclwiKVxudmFyIFRoZW5hYmxlID0gcmVxdWlyZShcIi4vdGhlbmFibGVcIilcbnZhciB0aGVuID0gVGhlbmFibGUucHJvdG90eXBlLnRoZW5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihtdXN0KSB7XG4gIHJldHVybiBUaGVuYWJsZShtdXN0LCBwcm9taXNpZnkpXG59XG5cbmZ1bmN0aW9uIHByb21pc2lmeShmbikge1xuICByZXR1cm4gZnVuY3Rpb24gbWF0Y2hlcigpIHtcbiAgICB2YXIgbXVzdCA9IE9iamVjdC5jcmVhdGUodGhpcylcbiAgICBpZiAoRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UpIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKG11c3QsIG1hdGNoZXIpXG4gICAgcmV0dXJuIHRoaXMuYWN0dWFsLnRoZW4ocmFpc2UsIHRoZW4uYmluZChtdXN0LCBmbiwgYXJndW1lbnRzKSlcbiAgfVxufVxuXG5mdW5jdGlvbiByYWlzZSgpIHsgdGhyb3cgbmV3IEFzc2VydGlvbkVycm9yKFwiUmVzb2x2ZWRcIikgfVxuIiwidmFyIFRoZW5hYmxlID0gcmVxdWlyZShcIi4vdGhlbmFibGVcIilcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihtdXN0KSB7XG4gIHJldHVybiBUaGVuYWJsZShtdXN0LCBwcm9taXNpZnkpXG59XG5cbmZ1bmN0aW9uIHByb21pc2lmeShmbikge1xuICByZXR1cm4gZnVuY3Rpb24gbWF0Y2hlcigpIHtcbiAgICB2YXIgbXVzdCA9IE9iamVjdC5jcmVhdGUodGhpcylcbiAgICBpZiAoRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UpIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKG11c3QsIG1hdGNoZXIpXG4gICAgcmV0dXJuIHRoaXMuYWN0dWFsLnRoZW4oVGhlbmFibGUucHJvdG90eXBlLnRoZW4uYmluZChtdXN0LCBmbiwgYXJndW1lbnRzKSlcbiAgfVxufVxuIiwidmFyIHdyYXAgPSByZXF1aXJlKFwibG9kYXNoLndyYXBcIilcbnZhciBsb29rdXBHZXR0ZXIgPSByZXF1aXJlKFwib29sb25nXCIpLmxvb2t1cEdldHRlclxuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihtdXN0LCBwcm9taXNpZnkpIHtcbiAgbXVzdCA9IE9iamVjdC5jcmVhdGUobXVzdClcblxuICBmb3IgKHZhciBuYW1lIGluIG11c3QpXG4gICAgaWYgKGhhc0Z1bmN0aW9uKG11c3QsIG5hbWUpKSBtdXN0W25hbWVdID0gcHJvbWlzaWZ5KG11c3RbbmFtZV0pXG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG11c3QsIFwiYXNzZXJ0XCIsIHtcbiAgICB2YWx1ZTogd3JhcChtdXN0LmFzc2VydCwgZXhwb3J0cy5wcm90b3R5cGUuYXNzZXJ0KSxcbiAgICBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlXG4gIH0pXG5cbiAgcmV0dXJuIG11c3Rcbn1cblxuZXhwb3J0cy5wcm90b3R5cGUuYXNzZXJ0ID0gZnVuY3Rpb24gYXNzZXJ0KG9yaWcsIG9rLCBtc2csIG9wdHMpIHtcbiAgb3B0cyA9IG9wdHMgPyBPYmplY3QuY3JlYXRlKG9wdHMpIDoge31cbiAgaWYgKFwic3RhY2tcIiBpbiB0aGlzKSBvcHRzLnN0YWNrID0gdGhpcy5zdGFja1xuICBvcmlnLmNhbGwodGhpcywgb2ssIG1zZywgb3B0cylcbn1cblxuZXhwb3J0cy5wcm90b3R5cGUudGhlbiA9IGZ1bmN0aW9uKGZuLCBhcmdzLCBhY3R1YWwpIHtcbiAgdGhpcy5hY3R1YWwgPSBhY3R1YWxcbiAgZm4uYXBwbHkodGhpcywgYXJncylcbn1cblxuZnVuY3Rpb24gaGFzRnVuY3Rpb24ob2JqLCBuYW1lKSB7XG4gIHJldHVybiAhbG9va3VwR2V0dGVyKG9iaiwgbmFtZSkgJiYgdHlwZW9mIG9ialtuYW1lXSA9PSBcImZ1bmN0aW9uXCJcbn1cbiIsInZhciBPID0gcmVxdWlyZShcIm9vbG9uZ1wiKVxudmFyIEFzc2VydGlvbkVycm9yID0gcmVxdWlyZShcIi4vbGliL2Fzc2VydGlvbl9lcnJvclwiKVxudmFyIFJlc29sdmFibGUgPSByZXF1aXJlKFwiLi9saWIvcmVzb2x2YWJsZVwiKVxudmFyIFJlamVjdGFibGUgPSByZXF1aXJlKFwiLi9saWIvcmVqZWN0YWJsZVwiKVxudmFyIGtpbmRvZiA9IHJlcXVpcmUoXCJraW5kb2ZcIilcbnZhciBlZ2FsID0gcmVxdWlyZShcImVnYWxcIilcbnZhciBkZWVwRWdhbCA9IGVnYWwuZGVlcEVnYWxcbnZhciBzdHJpbmdpZnkgPSByZXF1aXJlKFwiLi9saWJcIikuc3RyaW5naWZ5XG52YXIgY2hhaW4gPSByZXF1aXJlKFwiLi9saWJcIikuY2hhaW5cbnZhciBkZWZpbmVHZXR0ZXIgPSBPLmRlZmluZUdldHRlclxudmFyIGxvb2t1cEdldHRlciA9IE8ubG9va3VwR2V0dGVyXG52YXIgc3RhcnRzV2l0aCA9IHJlcXVpcmUoXCIuL2xpYi9lczZcIikuc3RhcnRzV2l0aFxudmFyIGVuZHNXaXRoID0gcmVxdWlyZShcIi4vbGliL2VzNlwiKS5lbmRzV2l0aFxudmFyIGhhc093biA9IEZ1bmN0aW9uLmNhbGwuYmluZChPYmplY3QuaGFzT3duUHJvcGVydHkpXG52YXIgQU5ZID0ge31cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IE11c3RcbmV4cG9ydHMuQXNzZXJ0aW9uRXJyb3IgPSBBc3NlcnRpb25FcnJvclxuZXhwb3J0cy5zdHJpbmdpZnkgPSBzdHJpbmdpZnlcbmV4cG9ydHMuY2hhaW4gPSBjaGFpblxuXG4vKipcbiAqIFRoZSBtYWluIGNsYXNzIHRoYXQgd3JhcHMgdGhlIGFzc2VydGVkIG9iamVjdCBhbmQgdGhhdCB5b3UgY2FsbCBtYXRjaGVycyBvbi5cbiAqXG4gKiBUbyBpbmNsdWRlIGEgY3VzdG9tIGVycm9yIG1lc3NhZ2UgZm9yIGZhaWx1cmUgY2FzZXMsIHBhc3MgYSBzdHJpbmcgYXMgdGhlXG4gKiBzZWNvbmQgYXJndW1lbnQuXG4gKlxuICogTW9zdCBvZiB0aGUgdGltZSB5b3UnbGwgYmUgdXNpbmdcbiAqIFtgT2JqZWN0LnByb3RvdHlwZS5tdXN0YF0oI09iamVjdC5wcm90b3R5cGUubXVzdCkgdG8gY3JlYXRlIHRoaXMgd3JhcHBlciwgYnV0XG4gKiBvY2Nhc2lvbmFsbHkgeW91IG1pZ2h0IHdhbnQgdG8gYXNzZXJ0IGBudWxsYHMgb3IgYHVuZGVmaW5lZGBzIGFuZCBpbiB0aG9zZVxuICogY2FzZXMgYXNzaWduaW5nIGBNdXN0YCB0byBzb21ldGhpbmcgbGlrZSBgZXhwZWN0YCBvciBgZGVtYW5kYCB3b3JrcyBuaWNlbHkuXG4gKlxuICogQGV4YW1wbGVcbiAqIHRydWUubXVzdC5iZS50cnVlKClcbiAqIFtdLm11c3QuYmUuZW1wdHkoKVxuICpcbiAqIHZhciBleHBlY3QgPSByZXF1aXJlKFwibXVzdFwiKVxuICogZXhwZWN0KG51bGwpLnRvLmJlLm51bGwoKVxuICpcbiAqIHZhciBkZW1hbmQgPSByZXF1aXJlKFwibXVzdFwiKVxuICogZGVtYW5kKHVuZGVmaW5lZCwgXCJUaGUgdW5kZWZpbmVkIHVuZGVmaW5lZHNcIikuYmUudW5kZWZpbmVkKClcbiAqXG4gKiBAY2xhc3MgTXVzdFxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0gYWN0dWFsXG4gKiBAcGFyYW0gW21lc3NhZ2VdXG4gKi9cbmZ1bmN0aW9uIE11c3QoYWN0dWFsLCBtZXNzYWdlKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBNdXN0KSkgcmV0dXJuIG5ldyBNdXN0KGFjdHVhbCwgbWVzc2FnZSlcbiAgdGhpcy5hY3R1YWwgPSBhY3R1YWxcbiAgaWYgKG1lc3NhZ2UgIT0gbnVsbCkgdGhpcy5tZXNzYWdlID0gbWVzc2FnZVxufVxuXG4vKipcbiAgKiBDYW4gYWxzbyBiZSB1c2VkIGEgcGFzcy10aHJvdWdoIHByb3BlcnR5IGZvciBhIGZsdWVudCBjaGFpbi5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogXCJIZWxsb1wiLm11c3QuYmUuYS5zdHJpbmcoKVxuICAqIG5ldyBEYXRlKCkubXVzdC5iZS5hKERhdGUpXG4gICpcbiAgKiBAbWV0aG9kIGFcbiAgKiBAYWxpYXMgaW5zdGFuY2VvZlxuICAqL1xuZGVmaW5lR2V0dGVyKE11c3QucHJvdG90eXBlLCBcImFcIiwgZnVuY3Rpb24oKSB7XG4gIHJldHVybiBjaGFpbih0aGlzLCB0aGlzLmluc3RhbmNlb2YpXG59KVxuXG4vKipcbiAgKiBDYW4gYWxzbyBiZSB1c2VkIGEgcGFzcy10aHJvdWdoIHByb3BlcnR5IGZvciBhIGZsdWVudCBjaGFpbi5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogWzEsIDJdLm11c3QuYmUuYW4uYXJyYXkoKVxuICAqIG5ldyBBd2Vzb21lQ2xhc3MoKS5tdXN0LmJlLmFuKEF3ZXNvbWVDbGFzcylcbiAgKlxuICAqIEBtZXRob2QgYW5cbiAgKiBAYWxpYXMgaW5zdGFuY2VvZlxuICAqL1xuZGVmaW5lR2V0dGVyKE11c3QucHJvdG90eXBlLCBcImFuXCIsIGxvb2t1cEdldHRlcihNdXN0LnByb3RvdHlwZSwgXCJhXCIpKVxuXG4vKipcbiAgKiBQYXNzLXRocm91Z2ggcHJvcGVydHkgZm9yIGEgZmx1ZW50IGNoYWluLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiAoNDIpLm11c3QuYmUuYXQubW9zdCg2OSlcbiAgKiAoMTMzNykubXVzdC5iZS5hdC5sZWFzdCgxMzM3KVxuICAqXG4gICogQHByb3BlcnR5IGF0XG4gICogQG9uIHByb3RvdHlwZVxuICAqL1xuZGVmaW5lR2V0dGVyKE11c3QucHJvdG90eXBlLCBcImF0XCIsIHBhc3N0aHJvdWdoKVxuXG4vKipcbiAgKiBDYW4gYWxzbyBiZSB1c2VkIGFzIGEgcGFzcy10aHJvdWdoIHByb3BlcnR5IGZvciBhIGZsdWVudCBjaGFpbi5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogdHJ1ZS5tdXN0LmJlLnRydWUoKVxuICAqICg0MikubXVzdC5iZSg0MilcbiAgKlxuICAqIEBtZXRob2QgYmVcbiAgKiBAYWxpYXMgZXF1YWxcbiAgKi9cbmRlZmluZUdldHRlcihNdXN0LnByb3RvdHlwZSwgXCJiZVwiLCBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIGNoYWluKHRoaXMsIHRoaXMuZXF1YWwpXG59KVxuXG4vKipcbiAgKiBQYXNzLXRocm91Z2ggcHJvcGVydHkgZm9yIGEgZmx1ZW50IGNoYWluLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBbMSwgMl0ubXVzdC5oYXZlLmxlbmd0aCgyKVxuICAqXG4gICogQHByb3BlcnR5IGhhdmVcbiAgKiBAb24gcHJvdG90eXBlXG4gICovXG5kZWZpbmVHZXR0ZXIoTXVzdC5wcm90b3R5cGUsIFwiaGF2ZVwiLCBwYXNzdGhyb3VnaClcblxuLyoqXG4gICogSW52ZXJzZSB0aGUgYXNzZXJ0aW9uLiAgXG4gICogVXNlIGl0IG11bHRpcGxlIHRpbWVzIHRvIGNyZWF0ZSBsb3RzIG9mIGZ1biFcbiAgKiBgdHJ1ZS5tdXN0Lm5vdC5ub3QuYmUudHJ1ZSgpYCA6LSlcbiAgKlxuICAqIEBleGFtcGxlXG4gICogdHJ1ZS5tdXN0Lm5vdC5iZS50cnVlKClcbiAgKiBbXS5tdXN0Lm5vdC5iZS5lbXB0eSgpXG4gICpcbiAgKiBAcHJvcGVydHkgbm90XG4gICogQG9uIHByb3RvdHlwZVxuICAqL1xuZGVmaW5lR2V0dGVyKE11c3QucHJvdG90eXBlLCBcIm5vdFwiLCBmdW5jdGlvbigpIHtcbiAgLy8gTk9URTogRGVhciByZWFkZXIgb3IgcGx1Z2luIGF1dGhvciwgcGxlYXNlIGRvbid0IGRlcGVuZCBvbiB0aGlzIHByb3BlcnR5XG4gIC8vIG5hbWUgd2lsbCByZW1haW4gYXMtaXMuIElmIHlvdSByZWFsbHkgbmVlZCB0bywgbGV0IG1lIGtub3cgaG93IHlvdSdkIGxpa2VcbiAgLy8gdG8gdXNlIGl0LiBYTy5cbiAgdmFyIHNlbGYgPSBPYmplY3QuY3JlYXRlKHRoaXMpXG4gIHNlbGYubmVnYXRpdmUgPSAhc2VsZi5uZWdhdGl2ZVxuICByZXR1cm4gc2VsZlxufSlcblxuLyoqXG4gICogUGFzcy10aHJvdWdoIHByb3BlcnR5IGZvciBhIGZsdWVudCBjaGFpbi5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogdmFyIGV4cGVjdCA9IHJlcXVpcmUoXCJtdXN0XCIpXG4gICogZXhwZWN0KHRydWUpLnRvLmJlLnRydWUoKVxuICAqXG4gICogdmFyIHdpc2ggPSByZXF1aXJlKFwibXVzdFwiKVxuICAqIHdpc2gobGlmZSkudG8uYmUudHJ1dGh5KClcbiAgKlxuICAqIEBwcm9wZXJ0eSB0b1xuICAqIEBvbiBwcm90b3R5cGVcbiAgKi9cbmRlZmluZUdldHRlcihNdXN0LnByb3RvdHlwZSwgXCJ0b1wiLCBwYXNzdGhyb3VnaClcblxuLyoqXG4gKiBBc3NlcnQgb2JqZWN0IGlzIGB0cnVlYC4gIFxuICogQSBib3hlZCBib29sZWFuIG9iamVjdCAoYG5ldyBCb29sZWFuKHRydWVgKSBpcyBfbm90XyBjb25zaWRlcmVkIHRydWUuXG4gKlxuICogQGV4YW1wbGVcbiAqIHRydWUubXVzdC5iZS50cnVlKClcbiAqXG4gKiBAbWV0aG9kIHRydWVcbiAqL1xuTXVzdC5wcm90b3R5cGUudHJ1ZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmFzc2VydCh0aGlzLmFjdHVhbCA9PT0gdHJ1ZSwgXCJiZVwiLCB7ZXhwZWN0ZWQ6IHRydWV9KVxufVxuXG4vKipcbiAqIEFzc2VydCBvYmplY3QgaXMgYGZhbHNlYC4gIFxuICogQSBib3hlZCBib29sZWFuIG9iamVjdCAoYG5ldyBCb29sZWFuKGZhbHNlYCkgaXMgX25vdF8gY29uc2lkZXJlZCBmYWxzZS5cbiAqXG4gKiBAZXhhbXBsZVxuICogZmFsc2UubXVzdC5iZS5mYWxzZSgpXG4gKiBAbWV0aG9kIGZhbHNlXG4gKlxuICovXG5NdXN0LnByb3RvdHlwZS5mYWxzZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmFzc2VydCh0aGlzLmFjdHVhbCA9PT0gZmFsc2UsIFwiYmVcIiwge2V4cGVjdGVkOiBmYWxzZX0pXG59XG5cbi8qKlxuICogQXNzZXJ0IG9iamVjdCBpcyBgTmFOYC5cbiAqXG4gKiBAZXhhbXBsZVxuICogTmFOLm11c3QuYmUubmFuKClcbiAqXG4gKiBAbWV0aG9kIG5hblxuICovXG5NdXN0LnByb3RvdHlwZS5uYW4gPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5hc3NlcnQodGhpcy5hY3R1YWwgIT09IHRoaXMuYWN0dWFsLCBcImJlXCIsIHtleHBlY3RlZDogTmFOfSlcbn1cblxuLyoqXG4gKiBBc3NlcnQgb2JqZWN0IGlzIGBudWxsYC5cbiAqXG4gKiBCZWNhdXNlIEphdmFTY3JpcHQgZG9lcyBub3QgYWxsb3cgbWV0aG9kIGNhbGxzIG9uIGBudWxsYCwgeW91J2xsIGhhdmUgdG9cbiAqIHdyYXAgYW4gZXhwZWN0ZWQgbnVsbCB3aXRoIFtgTXVzdGBdKCNNdXN0KS4gQXNzaWduaW5nIGByZXF1aXJlKFwibXVzdFwiKWAgdG9cbiAqIGBleHBlY3RgIG9yIGBkZW1hbmRgIHdvcmtzIHdlbGwuXG4gKlxuICogSWYgeW91IHdhbnQgdG8gYXNzZXJ0IHRoYXQgYW4gb2JqZWN0J3MgcHJvcGVydHkgaXMgYG51bGxgLCBzZWVcbiAqIFtgcHJvcGVydHlgXSgjTXVzdC5wcm90b3R5cGUucHJvcGVydHkpLlxuICpcbiAqIEBleGFtcGxlXG4gKiB2YXIgZGVtYW5kID0gcmVxdWlyZShcIm11c3RcIilcbiAqIGRlbWFuZChudWxsKS5iZS5udWxsKClcbiAqXG4gKiBAbWV0aG9kIG51bGxcbiAqL1xuTXVzdC5wcm90b3R5cGUubnVsbCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmFzc2VydCh0aGlzLmFjdHVhbCA9PT0gbnVsbCwgXCJiZVwiLCB7ZXhwZWN0ZWQ6IG51bGx9KVxufVxuXG4vKipcbiAqIEFzc2VydCBvYmplY3QgaXMgYHVuZGVmaW5lZGAuXG4gKlxuICogQmVjYXVzZSBKYXZhU2NyaXB0IGRvZXMgbm90IGFsbG93IG1ldGhvZCBjYWxscyBvbiBgdW5kZWZpbmVkYCwgeW91J2xsIGhhdmUgdG9cbiAqIHdyYXAgYW4gZXhwZWN0ZWQgdW5kZWZpbmVkIHdpdGggW2BNdXN0YF0oI011c3QpLiBBc3NpZ25pbmcgYHJlcXVpcmUoXCJtdXN0XCIpYFxuICogdG8gYGV4cGVjdGAgb3IgYGRlbWFuZGAgd29ya3Mgd2VsbC5cbiAqXG4gKiBJZiB5b3Ugd2FudCB0byBhc3NlcnQgdGhhdCBhbiBvYmplY3QncyBwcm9wZXJ0eSBpcyBgdW5kZWZpbmVkYCwgc2VlXG4gKiBbYHByb3BlcnR5YF0oI011c3QucHJvdG90eXBlLnByb3BlcnR5KS5cbiAqXG4gKiBAZXhhbXBsZVxuICogdmFyIGRlbWFuZCA9IHJlcXVpcmUoXCJtdXN0XCIpXG4gKiBkZW1hbmQodW5kZWZpbmVkKS5iZS51bmRlZmluZWQoKVxuICpcbiAqIEBtZXRob2QgdW5kZWZpbmVkXG4gKi9cbk11c3QucHJvdG90eXBlLnVuZGVmaW5lZCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmFzc2VydCh0aGlzLmFjdHVhbCA9PT0gdW5kZWZpbmVkLCBcImJlXCIsIHtleHBlY3RlZDogdW5kZWZpbmVkfSlcbn1cblxuLyoqXG4gKiBBc3NlcnQgb2JqZWN0IGlzIGEgYm9vbGVhbiAoYHRydWVgIG9yIGBmYWxzZWApLiAgXG4gKiBCb3hlZCBib29sZWFuIG9iamVjdHMgKGBuZXcgQm9vbGVhbmApIGFyZSBfbm90XyBjb25zaWRlcmVkIGJvb2xlYW5zLlxuICpcbiAqIEBleGFtcGxlXG4gKiB0cnVlLm11c3QuYmUuYS5ib29sZWFuKClcbiAqXG4gKiBAbWV0aG9kIGJvb2xlYW5cbiAqL1xuTXVzdC5wcm90b3R5cGUuYm9vbGVhbiA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmFzc2VydCh0eXBlb2YgdGhpcy5hY3R1YWwgPT0gXCJib29sZWFuXCIsIFwiYmUgYSBib29sZWFuXCIpXG59XG5cbi8qKlxuICogQXNzZXJ0IG9iamVjdCBpcyBhIG51bWJlci4gIFxuICogQm94ZWQgbnVtYmVyIG9iamVjdHMgKGBuZXcgTnVtYmVyYCkgYXJlIF9ub3RfIGNvbnNpZGVyZWQgbnVtYmVycy5cbiAqXG4gKiBAZXhhbXBsZVxuICogKDQyKS5tdXN0LmJlLmEubnVtYmVyKClcbiAqXG4gKiBAbWV0aG9kIG51bWJlclxuICovXG5NdXN0LnByb3RvdHlwZS5udW1iZXIgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5hc3NlcnQodHlwZW9mIHRoaXMuYWN0dWFsID09IFwibnVtYmVyXCIsIFwiYmUgYSBudW1iZXJcIilcbn1cblxuLyoqXG4gKiBBc3NlcnQgb2JqZWN0IGlzIGEgc3RyaW5nLiAgXG4gKiBCb3hlZCBzdHJpbmcgb2JqZWN0cyAoYG5ldyBTdHJpbmdgKSBhcmUgX25vdF8gY29uc2lkZXJlZCBzdHJpbmdzLlxuICpcbiAqIEBleGFtcGxlXG4gKiBcIkhlbGxvXCIubXVzdC5iZS5hLnN0cmluZygpXG4gKlxuICogQG1ldGhvZCBzdHJpbmdcbiAqL1xuTXVzdC5wcm90b3R5cGUuc3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuYXNzZXJ0KHR5cGVvZiB0aGlzLmFjdHVhbCA9PSBcInN0cmluZ1wiLCBcImJlIGEgc3RyaW5nXCIpXG59XG5cbi8qKlxuICogQXNzZXJ0IG9iamVjdCBpcyBhIHN5bWJvbC5cbiAqXG4gKiBAZXhhbXBsZVxuICogU3ltYm9sKCkubXVzdC5iZS5hLnN5bWJvbCgpXG4gKlxuICogQG1ldGhvZCBzeW1ib2xcbiAqL1xuTXVzdC5wcm90b3R5cGUuc3ltYm9sID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuYXNzZXJ0KHR5cGVvZiB0aGlzLmFjdHVhbCA9PSBcInN5bWJvbFwiLCBcImJlIGEgc3ltYm9sXCIpXG59XG5cbi8qKlxuICogQXNzZXJ0IG9iamVjdCBpcyBhIGRhdGUuXG4gKlxuICogQGV4YW1wbGVcbiAqIG5ldyBEYXRlKCkubXVzdC5iZS5hLmRhdGUoKVxuICpcbiAqIEBtZXRob2QgZGF0ZVxuICovXG5NdXN0LnByb3RvdHlwZS5kYXRlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuYXNzZXJ0KGtpbmRvZih0aGlzLmFjdHVhbCkgPT0gXCJkYXRlXCIsIFwiYmUgYSBkYXRlXCIpXG59XG5cbi8qKlxuICogQXNzZXJ0IG9iamVjdCBpcyBhIHJlZ3VsYXIgZXhwcmVzc2lvbi5cbiAqXG4gKiBAZXhhbXBsZVxuICogL1thLXpdLy5tdXN0LmJlLmEucmVnZXhwKClcbiAqXG4gKiBAbWV0aG9kIHJlZ2V4cFxuICovXG5NdXN0LnByb3RvdHlwZS5yZWdleHAgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5hc3NlcnQoa2luZG9mKHRoaXMuYWN0dWFsKSA9PSBcInJlZ2V4cFwiLCBcImJlIGEgcmVndWxhciBleHByZXNzaW9uXCIpXG59XG5cbi8qKlxuICogQXNzZXJ0IG9iamVjdCBpcyBhbiBhcnJheS5cbiAqXG4gKiBAZXhhbXBsZVxuICogWzQyLCA2OV0ubXVzdC5iZS5hbi5hcnJheSgpXG4gKlxuICogQG1ldGhvZCBhcnJheVxuICovXG5NdXN0LnByb3RvdHlwZS5hcnJheSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmFzc2VydChBcnJheS5pc0FycmF5KHRoaXMuYWN0dWFsKSwgXCJiZSBhbiBhcnJheVwiKVxufVxuXG4vKipcbiAqIEFzc2VydCBvYmplY3QgaXMgYSBmdW5jdGlvbi5cbiAqXG4gKiBAZXhhbXBsZVxuICogKGZ1bmN0aW9uKCkge30pLm11c3QuYmUuYS5mdW5jdGlvbigpXG4gKlxuICogQG1ldGhvZCBmdW5jdGlvblxuICovXG5NdXN0LnByb3RvdHlwZS5mdW5jdGlvbiA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmFzc2VydCh0eXBlb2YgdGhpcy5hY3R1YWwgPT0gXCJmdW5jdGlvblwiLCBcImJlIGEgZnVuY3Rpb25cIilcbn1cblxuLyoqXG4gKiBBc3NlcnQgb2JqZWN0IGlzIGFuLi4gb2JqZWN0LlxuICpcbiAqIEBleGFtcGxlXG4gKiAoe30pLm11c3QuYmUuYW4ub2JqZWN0KClcbiAqXG4gKiBAbWV0aG9kIG9iamVjdFxuICovXG5NdXN0LnByb3RvdHlwZS5vYmplY3QgPSBmdW5jdGlvbigpIHtcbiAgdmFyIG9rID0gdGhpcy5hY3R1YWwgJiYgdHlwZW9mIHRoaXMuYWN0dWFsID09IFwib2JqZWN0XCJcbiAgdGhpcy5hc3NlcnQob2ssIFwiYmUgYW4gb2JqZWN0XCIpXG59XG5cbi8qKlxuICogQXNzZXJ0IG9iamVjdCBpcyB0cnV0aHkgKGAhIW9iamApLlxuICpcbiAqIE9ubHkgYG51bGxgLCBgdW5kZWZpbmVkYCwgYDBgLCBgZmFsc2VgIGFuZCBgXCJcImAgYXJlIGZhbHN5IGluIEphdmFTY3JpcHQuXG4gKiBFdmVyeXRoaW5nIGVsc2UgaXMgdHJ1dGh5LlxuICpcbiAqIEBleGFtcGxlXG4gKiAoNDIpLm11c3QuYmUudHJ1dGh5KClcbiAqIFwiSGVsbG9cIi5tdXN0LmJlLnRydXRoeSgpXG4gKlxuICogQG1ldGhvZCB0cnV0aHlcbiAqL1xuTXVzdC5wcm90b3R5cGUudHJ1dGh5ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuYXNzZXJ0KHRoaXMuYWN0dWFsLCBcImJlIHRydXRoeVwiKVxufVxuXG4vKipcbiAqIEFzc2VydCBvYmplY3QgaXMgZmFsc3kgKGAhb2JqYCkuXG4gKlxuICogT25seSBgbnVsbGAsIGB1bmRlZmluZWRgLCBgMGAsIGBmYWxzZWAgYW5kIGBcIlwiYCBhcmUgZmFsc3kgaW4gSmF2YVNjcmlwdC5cbiAqIEV2ZXJ5dGhpbmcgZWxzZSBpcyB0cnV0aHkuXG4gKlxuICogQGV4YW1wbGVcbiAqIDAubXVzdC5iZS5mYWxzeSgpXG4gKiBcIlwiLm11c3QuYmUuZmFsc3koKVxuICpcbiAqIEBtZXRob2QgZmFsc3lcbiAqL1xuTXVzdC5wcm90b3R5cGUuZmFsc3kgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5hc3NlcnQoIXRoaXMuYWN0dWFsLCBcImJlIGZhbHN5XCIpXG59XG5cbi8qKlxuICogQXNzZXJ0IG9iamVjdCBpcyBleGlzdHMgYW5kIHRoZXJlYnkgaXMgbm90IG51bGwgb3IgdW5kZWZpbmVkLlxuICpcbiAqIEBleGFtcGxlXG4gKiAwLm11c3QuZXhpc3QoKVxuICogXCJcIi5tdXN0LmV4aXN0KClcbiAqICh7fSkubXVzdC5leGlzdCgpXG4gKlxuICogQG1ldGhvZCBleGlzdFxuICovXG5NdXN0LnByb3RvdHlwZS5leGlzdCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmFzc2VydCh0aGlzLmFjdHVhbCAhPSBudWxsLCBcImV4aXN0XCIpXG59XG5cbi8qKlxuICogQXNzZXJ0IHRoYXQgYW4gb2JqZWN0IGlzIGFuIGluc3RhbmNlIG9mIHNvbWV0aGluZy4gIFxuICogVXNlcyBgb2JqIGluc3RhbmNlb2YgZXhwZWN0ZWRgLlxuICpcbiAqIEBleGFtcGxlXG4gKiBuZXcgRGF0ZSgpLm11c3QuYmUuYW4uaW5zdGFuY2VvZihEYXRlKVxuICpcbiAqIEBtZXRob2QgaW5zdGFuY2VvZlxuICogQHBhcmFtIGNsYXNzXG4gKi9cbk11c3QucHJvdG90eXBlLmluc3RhbmNlb2YgPSBmdW5jdGlvbihleHBlY3RlZCkge1xuICB2YXIgb2sgPSB0aGlzLmFjdHVhbCBpbnN0YW5jZW9mIGV4cGVjdGVkXG4gIHRoaXMuYXNzZXJ0KG9rLCBpbnN0YW5jZW9mTWVzc2FnZS5iaW5kKHRoaXMsIGV4cGVjdGVkKSwge2V4cGVjdGVkOiBleHBlY3RlZH0pXG59XG5cbmZ1bmN0aW9uIGluc3RhbmNlb2ZNZXNzYWdlKGV4cGVjdGVkKSB7XG4gIHZhciB0eXBlID0gZXhwZWN0ZWQuZGlzcGxheU5hbWUgfHwgZXhwZWN0ZWQubmFtZSB8fCBzdHJpbmdpZnkoZXhwZWN0ZWQpXG4gIHJldHVybiBcImJlIGFuIGluc3RhbmNlIG9mIFwiICsgdHlwZVxufVxuXG4vKipcbiAqIEBtZXRob2QgaW5zdGFuY2VPZlxuICogQGFsaWFzIGluc3RhbmNlb2ZcbiAqL1xuTXVzdC5wcm90b3R5cGUuaW5zdGFuY2VPZiA9IE11c3QucHJvdG90eXBlLmluc3RhbmNlb2ZcblxuLyoqXG4gKiBBc3NlcnQgdGhhdCBhbiBvYmplY3QgaXMgZW1wdHkuICBcbiAqIENoZWNrcyBlaXRoZXIgdGhlIGBsZW5ndGhgIGZvciBhcnJheXMgYW5kIHN0cmluZ3Mgb3IgdGhlIGNvdW50IG9mXG4gKiBlbnVtZXJhYmxlIGtleXMuIEluaGVyaXRlZCBrZXlzIGFsc28gY291bnRlZC5cbiAqXG4gKiBAZXhhbXBsZVxuICogXCJcIi5tdXN0LmJlLmVtcHR5KClcbiAqIFtdLm11c3QuYmUuZW1wdHkoKVxuICogKHt9KS5tdXN0LmJlLmVtcHR5KClcbiAqXG4gKiBAbWV0aG9kIGVtcHR5XG4gKi9cbk11c3QucHJvdG90eXBlLmVtcHR5ID0gZnVuY3Rpb24oKSB7XG4gIHZhciBvayA9IGZhbHNlXG4gIGlmICh0eXBlb2YgdGhpcy5hY3R1YWwgPT09IFwic3RyaW5nXCIgfHwgQXJyYXkuaXNBcnJheSh0aGlzLmFjdHVhbCkpXG4gICAgb2sgPSB0aGlzLmFjdHVhbC5sZW5ndGggPT09IDBcbiAgZWxzZSBpZiAodHlwZW9mIHRoaXMuYWN0dWFsID09IFwib2JqZWN0XCIgfHwgdHlwZW9mIHRoaXMuYWN0dWFsID09IFwiZnVuY3Rpb25cIilcbiAgICBvayA9IE8uaXNFbXB0eSh0aGlzLmFjdHVhbClcblxuICB0aGlzLmFzc2VydChvaywgXCJiZSBlbXB0eVwiKVxufVxuXG4vKipcbiAqIEFzc2VydCBhIHN0cmluZyBlbmRzIHdpdGggdGhlIGdpdmVuIHN0cmluZy5cbiAqXG4gKiBAZXhhbXBsZVxuICogXCJIZWxsbywgSm9oblwiLm11c3QuZW5kV2l0aChcIkpvaG5cIilcbiAqXG4gKiBAbWV0aG9kIGVuZFdpdGhcbiAqIEBwYXJhbSBleHBlY3RlZFxuICovXG5NdXN0LnByb3RvdHlwZS5lbmRXaXRoID0gZnVuY3Rpb24oZXhwZWN0ZWQpIHtcbiAgdGhpcy5hc3NlcnQoZW5kc1dpdGgodGhpcy5hY3R1YWwsIGV4cGVjdGVkKSwgXCJlbmQgd2l0aFwiLCB7ZXhwZWN0ZWQ6IGV4cGVjdGVkfSlcbn1cblxuLyoqXG4gKiBBc3NlcnQgb2JqZWN0IHN0cmljdCBlcXVhbGl0eSBvciBpZGVudGl0eSAoYD09PWApLlxuICpcbiAqIFRvIGNvbXBhcmUgdmFsdWUgb2JqZWN0cyAobGlrZSBgRGF0ZWAgb3IgYFJlZ0V4cGApIGJ5IHRoZWlyIHZhbHVlIHJhdGhlclxuICogdGhhbiBpZGVudGl0eSwgdXNlIFtgZXFsYF0oI011c3QucHJvdG90eXBlLmVxbCkuICBcbiAqIFRvIGNvbXBhcmUgYXJyYXlzIGFuZCBvYmplY3RzIGJ5IGNvbnRlbnQsIGFsc28gdXNlXG4gKiBbYGVxbGBdKCNNdXN0LnByb3RvdHlwZS5lcWwpLlxuICpcbiAqIEBleGFtcGxlXG4gKiAoNDIpLm11c3QuZXF1YWwoNDIpXG4gKlxuICogdmFyIGRhdGUgPSBuZXcgRGF0ZVxuICogZGF0ZS5tdXN0LmVxdWFsKGRhdGUpXG4gKlxuICogQG1ldGhvZCBlcXVhbFxuICogQHBhcmFtIGV4cGVjdGVkXG4gKi9cbk11c3QucHJvdG90eXBlLmVxdWFsID0gZnVuY3Rpb24oZXhwZWN0ZWQpIHtcbiAgdGhpcy5hc3NlcnQodGhpcy5hY3R1YWwgPT09IGV4cGVjdGVkLCBcImVxdWFsXCIsIHtleHBlY3RlZDogZXhwZWN0ZWR9KVxufVxuXG4vKipcbiAqIEFzc2VydCB0aGF0IGFuIG9iamVjdCBpcyBhbiBlcnJvciAoaW5zdGFuY2Ugb2YgYEVycm9yYCBieSBkZWZhdWx0KS4gIFxuICogT3B0aW9uYWxseSBhc3NlcnQgaXQgbWF0Y2hlcyBgZXhwZWN0ZWRgIChhbmQvb3IgaXMgb2YgaW5zdGFuY2VcbiAqIGBjb25zdHJ1Y3RvcmApLiAgXG4gKiBXaGVuIHlvdSBoYXZlIGEgZnVuY3Rpb24gdGhhdCdzIHN1cHBvc2VkIHRvIHRocm93LCB1c2VcbiAqIFtgdGhyb3dgXSgjTXVzdC5wcm90b3R5cGUudGhyb3cpLlxuICpcbiAqIEdpdmVuIGBleHBlY3RlZGAsIHRoZSBlcnJvciBpcyBhc3NlcnRlZCBhcyBmb2xsb3dzOlxuICogLSBBICoqc3RyaW5nKiogaXMgY29tcGFyZWQgd2l0aCB0aGUgZXhjZXB0aW9uJ3MgYG1lc3NhZ2VgIHByb3BlcnR5LlxuICogLSBBICoqcmVndWxhciBleHByZXNzaW9uKiogaXMgbWF0Y2hlZCBhZ2FpbnN0IHRoZSBleGNlcHRpb24ncyBgbWVzc2FnZWBcbiAqICAgcHJvcGVydHkuXG4gKiAtIEEgKipmdW5jdGlvbioqIChhLmsuYS4gY29uc3RydWN0b3IpIGlzIHVzZWQgdG8gY2hlY2sgaWYgdGhlIGVycm9yXG4gKiAgIGlzIGFuIGBpbnN0YW5jZW9mYCB0aGF0IGNvbnN0cnVjdG9yLlxuICogLSBBbGwgb3RoZXIgY2FzZXMgb2YgYGV4cGVjdGVkYCBhcmUgbGVmdCB1bnNwZWNpZmllZCBmb3Igbm93LlxuICpcbiAqIEBleGFtcGxlXG4gKiB2YXIgZXJyID0gdGhyb3cgbmV3IFJhbmdlRXJyb3IoXCJFdmVyeXRoaW5nJ3MgYW1hemluZyBhbmQgbm9ib2R5J3MgaGFwcHlcIikgfVxuICogZXJyLm11c3QuYmUuYW4uZXJyb3IoKVxuICogZXJyLm11c3QuYmUuYW4uZXJyb3IoXCJFdmVyeXRoaW5nJ3MgYW1hemluZyBhbmQgbm9ib2R5J3MgaGFwcHlcIilcbiAqIGVyci5tdXN0LmJlLmFuLmVycm9yKC9hbWF6aW5nLylcbiAqIGVyci5tdXN0LmJlLmFuLmVycm9yKEVycm9yKVxuICogZXJyLm11c3QuYmUuYW4uZXJyb3IoUmFuZ2VFcnJvcilcbiAqIGVyci5tdXN0LmJlLmFuLmVycm9yKFJhbmdlRXJyb3IsIFwiRXZlcnl0aGluZydzIGFtYXppbmcgYW5kIG5vYm9keSdzIGhhcHB5XCIpXG4gKiBlcnIubXVzdC5iZS5hbi5lcnJvcihSYW5nZUVycm9yLCAvYW1hemluZy8pXG4gKlxuICogQG1ldGhvZCBlcnJvclxuICogQHBhcmFtIFtjb25zdHJ1Y3Rvcl1cbiAqIEBwYXJhbSBbZXhwZWN0ZWRdXG4gKi9cbk11c3QucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24odHlwZSwgZXhwZWN0ZWQpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPD0gMSkgZXhwZWN0ZWQgPSBBTllcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT0gMSAmJiAhaXNGbih0eXBlKSkgeyBleHBlY3RlZCA9IHR5cGU7IHR5cGUgPSBudWxsIH1cblxuICB2YXIgb2sgPSBpc0Vycm9yKHRoaXMuYWN0dWFsLCB0eXBlIHx8IEVycm9yLCBleHBlY3RlZClcbiAgdmFyIG1zZyA9IGV4cGVjdGVkICE9PSBBTlkgPyBcImJlIGFuIGVycm9yIG1hdGNoaW5nXCIgOiBcImJlIGFuIGVycm9yXCJcbiAgdmFyIG9wdHMgPSBleHBlY3RlZCAhPT0gQU5ZID8ge2V4cGVjdGVkOiBleHBlY3RlZH0gOiBudWxsXG4gIHRoaXMuYXNzZXJ0KG9rLCBtc2csIG9wdHMpXG59XG5cbi8qKlxuICAqIENhbiBhbHNvIGJlIHVzZWQgYXMgYSBwYXNzLXRocm91Z2ggcHJvcGVydHkgZm9yIGEgZmx1ZW50IGNoYWluLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiB2YXIgY2xhaW0gPSByZXF1aXJlKFwibXVzdFwiKVxuICAqIGNsYWltKHRydWUpLmlzLnRydWUoKVxuICAqIGNsYWltKDQyKS5pcyg0MilcbiAgKlxuICAqIEBtZXRob2QgaXNcbiAgKiBAYWxpYXMgZXF1YWxcbiAgKi9cbmRlZmluZUdldHRlcihNdXN0LnByb3RvdHlwZSwgXCJpc1wiLCBsb29rdXBHZXR0ZXIoTXVzdC5wcm90b3R5cGUsIFwiYmVcIikpXG5cbi8qKlxuICogQXNzZXJ0IG9iamVjdCBlcXVhbGl0eSBieSBjb250ZW50IGFuZCBpZiBwb3NzaWJsZSwgcmVjdXJzaXZlbHkuICBcbiAqIEFsc28gaGFuZGxlcyBjaXJjdWxhciBhbmQgc2VsZi1yZWZlcmVudGlhbCBvYmplY3RzLlxuICpcbiAqIEZvciBtb3N0IHBhcnRzIGl0IGFzc2VydHMgc3RyaWN0IGVxdWFsaXR5IChgPT09YCksIGJ1dDpcbiAqIC0gYFJlZ0V4cGAgb2JqZWN0cyBhcmUgY29tcGFyZWQgYnkgdGhlaXIgcGF0dGVybiBhbmQgZmxhZ3MuXG4gKiAtIGBEYXRlYCBvYmplY3RzIGFyZSBjb21wYXJlZCBieSB0aGVpciB2YWx1ZS5cbiAqIC0gYEFycmF5YCBvYmplY3RzIGFyZSBjb21wYXJlZCByZWN1cnNpdmVseS5cbiAqIC0gYE5hTmBzIGFyZSBjb25zaWRlcmVkIGVxdWl2YWxlbnQuXG4gKiAtIEluc3RhbmNlcyBvZiB0aGUgc2FtZSBjbGFzcyB3aXRoIGEgYHZhbHVlT2ZgIGZ1bmN0aW9uIGFyZSBjb21wYXJlZCBieSBpdHNcbiAqICAgb3V0cHV0LlxuICogLSBQbGFpbiBvYmplY3RzIGFuZCBpbnN0YW5jZXMgb2YgdGhlIHNhbWUgY2xhc3MgYXJlIGNvbXBhcmVkIHJlY3Vyc2l2ZWx5LlxuICpcbiAqICoqRG9lcyBub3QgY29lcmNlIHR5cGVzKiogc28gKiptaXNtYXRjaGluZyB0eXBlcyBmYWlsKiouICBcbiAqIEluaGVyaXRlZCBlbnVtZXJhYmxlIHByb3BlcnRpZXMgYXJlIGFsc28gdGFrZW4gaW50byBhY2NvdW50LlxuICpcbiAqICoqSW5zdGFuY2VzKiogYXJlIG9iamVjdHMgd2hvc2UgcHJvdG90eXBlJ3MgYGNvbnN0cnVjdG9yYCBwcm9wZXJ0eSBpcyBzZXQuXG4gKiBFLmcuIGBuZXcgTXlDbGFzc2AuICBcbiAqIE90aGVycywgbGlrZSBge31gIG9yIGBPYmplY3QuY3JlYXRlKHt9KWAsIGFyZSAqKnBsYWluIG9iamVjdHMqKi5cbiAqXG4gKiBAZXhhbXBsZVxuICogL1thLXpdLy5tdXN0LmVxbCgvW2Etel0vKVxuICogbmV3IERhdGUoMTk4NywgNSwgMTgpLm11c3QuZXFsKG5ldyBEYXRlKDE5ODcsIDUsIDE4KSlcbiAqIFtcIkxpc3BcIiwgNDJdLm11c3QuZXFsKFtcIkxpc3BcIiwgNDJdKVxuICogKHtsaWZlOiA0MiwgbG92ZTogNjl9KS5tdXN0LmVxbCh7bGlmZTogNDIsIGxvdmU6IDY5fSlcbiAqIE5hTi5tdXN0LmVxbChOYU4pXG4gKlxuICogZnVuY3Rpb24gQW5zd2VyKGFuc3dlcikgeyB0aGlzLmFuc3dlciA9IGFuc3dlciB9XG4gKiBuZXcgQW5zd2VyKDQyKS5tdXN0LmVxbChuZXcgQW5zd2VyKDQyKSlcbiAqXG4gKiBAbWV0aG9kIGVxbFxuICogQHBhcmFtIGV4cGVjdGVkXG4gKi9cbk11c3QucHJvdG90eXBlLmVxbCA9IGZ1bmN0aW9uKGV4cGVjdGVkKSB7XG4gIHZhciBvayA9IGRlZXBFZ2FsKHRoaXMuYWN0dWFsLCBleHBlY3RlZCwgZXFsKVxuICB0aGlzLmFzc2VydChvaywgXCJiZSBlcXVpdmFsZW50IHRvXCIsIHtleHBlY3RlZDogZXhwZWN0ZWQsIGRpZmZhYmxlOiB0cnVlfSlcbn1cblxuLyoqXG4gKiBBc3NlcnQgb2JqZWN0IGluY2x1ZGVzIGBleHBlY3RlZGAuXG4gKlxuICogRm9yIHN0cmluZ3MgaXQgY2hlY2tzIHRoZSB0ZXh0LCBmb3IgYXJyYXlzIGl0IGNoZWNrcyBlbGVtZW50cyBhbmQgZm9yXG4gKiBvYmplY3RzIHRoZSBwcm9wZXJ0eSB2YWx1ZXMuIEV2ZXJ5dGhpbmcgaXMgY2hlY2tlZCB3aXRoIHN0cmljdCBlcXVhbHNcbiAqIChgPT09YCkuXG4gKlxuICogQGV4YW1wbGVcbiAqIFwiSGVsbG8sIEpvaG4hXCIubXVzdC5pbmNsdWRlKFwiSm9oblwiKVxuICogWzEsIDQyLCAzXS5tdXN0LmluY2x1ZGUoNDIpXG4gKiAoe2xpZmU6IDQyLCBsb3ZlOiA2OX0pLm11c3QuaW5jbHVkZSg0MilcbiAqXG4gKiBAbWV0aG9kIGluY2x1ZGVcbiAqIEBwYXJhbSBleHBlY3RlZFxuICovXG5NdXN0LnByb3RvdHlwZS5pbmNsdWRlID0gZnVuY3Rpb24oZXhwZWN0ZWQpIHtcbiAgdmFyIGZvdW5kXG4gIGlmICh0eXBlb2YgdGhpcy5hY3R1YWwgPT09IFwic3RyaW5nXCIgfHwgQXJyYXkuaXNBcnJheSh0aGlzLmFjdHVhbCkpXG4gICAgZm91bmQgPSB0aGlzLmFjdHVhbC5pbmRleE9mKGV4cGVjdGVkKSA+PSAwXG4gIGVsc2VcbiAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5hY3R1YWwpXG4gICAgICBpZiAodGhpcy5hY3R1YWxba2V5XSA9PT0gZXhwZWN0ZWQpIHsgZm91bmQgPSB0cnVlOyBicmVhayB9XG5cbiAgdGhpcy5hc3NlcnQoZm91bmQsIFwiaW5jbHVkZVwiLCB7ZXhwZWN0ZWQ6IGV4cGVjdGVkfSlcbn1cblxuLyoqXG4gKiBAbWV0aG9kIGNvbnRhaW5cbiAqIEBhbGlhcyBpbmNsdWRlXG4gKi9cbk11c3QucHJvdG90eXBlLmNvbnRhaW4gPSBNdXN0LnByb3RvdHlwZS5pbmNsdWRlXG5cbi8qKlxuICogQXNzZXJ0IHRoYXQgYW4gYXJyYXkgaXMgYSBwZXJtdXRhdGlvbiBvZiB0aGUgZ2l2ZW4gYXJyYXkuXG4gKlxuICogQW4gYXJyYXkgaXMgYSBwZXJtdXRhdGlvbiBvZiBhbm90aGVyIGlmIHRoZXkgYm90aCBoYXZlIHRoZSBzYW1lIGVsZW1lbnRzXG4gKiAoaW5jbHVkaW5nIHRoZSBzYW1lIG51bWJlciBvZiBkdXBsaWNhdGVzKSByZWdhcmRsZXNzIG9mIHRoZWlyIG9yZGVyLlxuICogRWxlbWVudHMgYXJlIGNoZWNrZWQgd2l0aCBzdHJpY3QgZXF1YWxzIChgPT09YCkuXG4gKlxuICogQGV4YW1wbGVcbiAqIFsxLCAxLCAyLCAzXS5tdXN0LmJlLmEucGVybXV0YXRpb25PZihbMywgMiwgMSwgMV0pXG4gKiBbNywgOCwgOCwgOV0ubXVzdC5ub3QuYmUuYS5wZXJtdXRhdGlvbk9mKFs5LCA4LCA3XSlcbiAqXG4gKiBAbWV0aG9kIHBlcm11dGF0aW9uT2ZcbiAqIEBwYXJhbSBleHBlY3RlZFxuICovXG5NdXN0LnByb3RvdHlwZS5wZXJtdXRhdGlvbk9mID0gZnVuY3Rpb24oZXhwZWN0ZWQpIHtcbiAgdmFyIG9rID0gaXNQZXJtdXRhdGlvbk9mKHRoaXMuYWN0dWFsLCBleHBlY3RlZClcbiAgdGhpcy5hc3NlcnQob2ssIFwiYmUgYSBwZXJtdXRhdGlvbiBvZlwiLCB7ZXhwZWN0ZWQ6IGV4cGVjdGVkLCBkaWZmYWJsZTogdHJ1ZX0pXG59XG5cbmZ1bmN0aW9uIGlzUGVybXV0YXRpb25PZihhY3R1YWwsIGV4cGVjdGVkKSB7XG4gIGlmICghQXJyYXkuaXNBcnJheShhY3R1YWwpIHx8ICFBcnJheS5pc0FycmF5KGV4cGVjdGVkKSkgcmV0dXJuIGZhbHNlXG4gIGlmIChhY3R1YWwubGVuZ3RoICE9PSBleHBlY3RlZC5sZW5ndGgpIHJldHVybiBmYWxzZVxuXG4gIGFjdHVhbCA9IGFjdHVhbC5zbGljZSgpLnNvcnQoKVxuICBleHBlY3RlZCA9IGV4cGVjdGVkLnNsaWNlKCkuc29ydCgpXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYWN0dWFsLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGFjdHVhbFtpXSAhPT0gZXhwZWN0ZWRbaV0pIHJldHVybiBmYWxzZVxuICB9XG5cbiAgcmV0dXJuIHRydWVcbn1cblxuLyoqXG4gKiBBc3NlcnQgb2JqZWN0IG1hdGNoZXMgdGhlIGdpdmVuIHJlZ3VsYXIgZXhwcmVzc2lvbi5cbiAqXG4gKiBJZiB5b3UgcGFzcyBpbiBhIG5vbiByZWd1bGFyIGV4cHJlc3Npb24gb2JqZWN0LCBpdCdsbCBiZSBjb252ZXJ0ZWQgdG8gb25lXG4gKiB2aWEgYG5ldyBSZWdFeHAocmVnZXhwKWAuXG4gKlxuICogQGV4YW1wbGVcbiAqIFwiSGVsbG8sIEpvaG4hXCIubXVzdC5tYXRjaCgvam9obi9pKVxuICogXCJXZWkgd3Ugd2VpXCIubXVzdC5tYXRjaChcInd1XCIpXG4gKlxuICogQG1ldGhvZCBtYXRjaFxuICogQHBhcmFtIHJlZ2V4cFxuICovXG5NdXN0LnByb3RvdHlwZS5tYXRjaCA9IGZ1bmN0aW9uKGV4cGVjdGVkKSB7XG4gIHZhciByZWdleHAgPSBleHBlY3RlZCBpbnN0YW5jZW9mIFJlZ0V4cCA/IGV4cGVjdGVkIDogbmV3IFJlZ0V4cChleHBlY3RlZClcbiAgdGhpcy5hc3NlcnQocmVnZXhwLmV4ZWModGhpcy5hY3R1YWwpLCBcIm1hdGNoXCIsIHtleHBlY3RlZDogcmVnZXhwfSlcbn1cblxuLyoqXG4gICogUGFzcy10aHJvdWdoIHByb3BlcnR5IGZvciBhIGZsdWVudCBjaGFpbi5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogKDQyKS5tdXN0Lm11c3QubXVzdC5tdXN0LmVxdWFsKDQyKVxuICAqXG4gICogQHByb3BlcnR5IG11c3RcbiAgKiBAb24gcHJvdG90eXBlXG4gICovXG5kZWZpbmVHZXR0ZXIoTXVzdC5wcm90b3R5cGUsIFwibXVzdFwiLCBwYXNzdGhyb3VnaClcblxuLyoqXG4gICogUGFzcy10aHJvdWdoIHByb3BlcnR5IGZvciBhIGZsdWVudCBjaGFpbi5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogKDQyKS5tdXN0LmJlLnRoZS5udW1iZXIoKVxuICAqXG4gICogQHByb3BlcnR5IHRoZVxuICAqIEBvbiBwcm90b3R5cGVcbiAgKi9cbmRlZmluZUdldHRlcihNdXN0LnByb3RvdHlwZSwgXCJ0aGVcIiwgcGFzc3Rocm91Z2gpXG5cbi8qKlxuICogQXNzZXJ0IHRoYXQgYSBmdW5jdGlvbiB0aHJvd3MuICBcbiAqIE9wdGlvbmFsbHkgYXNzZXJ0IGl0IHRocm93cyBgZXhwZWN0ZWRgIChhbmQvb3IgaXMgb2YgaW5zdGFuY2VcbiAqIGBjb25zdHJ1Y3RvcmApLiAgXG4gKiBXaGVuIHlvdSBhbHJlYWR5IGhhdmUgYW4gZXJyb3IgcmVmZXJlbmNlLCB1c2VcbiAqIFtgZXJyb3JgXSgjTXVzdC5wcm90b3R5cGUuZXJyb3IpLlxuICpcbiAqIEdpdmVuIGBleHBlY3RlZGAsIHRoZSBlcnJvciBpcyBhc3NlcnRlZCBhcyBmb2xsb3dzOlxuICogLSBBICoqc3RyaW5nKiogaXMgY29tcGFyZWQgd2l0aCB0aGUgZXhjZXB0aW9uJ3MgYG1lc3NhZ2VgIHByb3BlcnR5LlxuICogLSBBICoqcmVndWxhciBleHByZXNzaW9uKiogaXMgbWF0Y2hlZCBhZ2FpbnN0IHRoZSBleGNlcHRpb24ncyBgbWVzc2FnZWBcbiAqICAgcHJvcGVydHkuXG4gKiAtIEEgKipmdW5jdGlvbioqIChhLmsuYS4gY29uc3RydWN0b3IpIGlzIHVzZWQgdG8gY2hlY2sgaWYgdGhlIGVycm9yXG4gKiAgIGlzIGFuIGBpbnN0YW5jZW9mYCB0aGF0IGNvbnN0cnVjdG9yLlxuICogLSBBbGwgb3RoZXIgY2FzZXMgb2YgYGV4cGVjdGVkYCBhcmUgbGVmdCB1bnNwZWNpZmllZCBmb3Igbm93LlxuICpcbiAqIEJlY2F1c2Ugb2YgaG93IEphdmFTY3JpcHQgd29ya3MsIHRoZSBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBpbiBgbnVsbGBcbiAqIGNvbnRleHQgKGB0aGlzYCkuIElmIHlvdSB3YW50IHRvIHRlc3QgYW4gaW5zdGFuY2UgbWV0aG9kLCBiaW5kIGl0OlxuICogYG9iai5tZXRob2QuYmluZChvYmopLm11c3QudGhyb3coKWAuXG4gKlxuICogQGV4YW1wbGVcbiAqIGZ1bmN0aW9uIG9tZygpIHtcbiAqICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoXCJFdmVyeXRoaW5nJ3MgYW1hemluZyBhbmQgbm9ib2R5J3MgaGFwcHlcIilcbiAqIH1cbiAqXG4gKiBvbWcubXVzdC50aHJvdygpXG4gKiBvbWcubXVzdC50aHJvdyhcIkV2ZXJ5dGhpbmcncyBhbWF6aW5nIGFuZCBub2JvZHkncyBoYXBweVwiKVxuICogb21nLm11c3QudGhyb3coL2FtYXppbmcvKVxuICogb21nLm11c3QudGhyb3coRXJyb3IpXG4gKiBvbWcubXVzdC50aHJvdyhSYW5nZUVycm9yKVxuICogb21nLm11c3QudGhyb3coUmFuZ2VFcnJvciwgXCJFdmVyeXRoaW5nJ3MgYW1hemluZyBhbmQgbm9ib2R5J3MgaGFwcHlcIilcbiAqIG9tZy5tdXN0LnRocm93KFJhbmdlRXJyb3IsIC9hbWF6aW5nLylcbiAqXG4gKiBAbWV0aG9kIHRocm93XG4gKiBAcGFyYW0gW2NvbnN0cnVjdG9yXVxuICogQHBhcmFtIFtleHBlY3RlZF1cbiAqL1xuTXVzdC5wcm90b3R5cGUudGhyb3cgPSBmdW5jdGlvbih0eXBlLCBleHBlY3RlZCkge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8PSAxKSBleHBlY3RlZCA9IEFOWVxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PSAxICYmICFpc0ZuKHR5cGUpKSB7IGV4cGVjdGVkID0gdHlwZTsgdHlwZSA9IG51bGwgfVxuXG4gIHZhciBvayA9IGZhbHNlLCBleGNlcHRpb25cbiAgdHJ5IHsgdGhpcy5hY3R1YWwuY2FsbChudWxsKSB9IGNhdGNoIChleCkgeyBvayA9IHRydWU7IGV4Y2VwdGlvbiA9IGV4IH1cbiAgb2sgPSBvayAmJiBpc0Vycm9yKGV4Y2VwdGlvbiwgdHlwZSwgZXhwZWN0ZWQpXG5cbiAgdmFyIG9wdHMgPSB7YWN0dWFsOiBleGNlcHRpb259XG4gIGlmIChleHBlY3RlZCAhPT0gQU5ZKSBvcHRzLmV4cGVjdGVkID0gZXhwZWN0ZWRcbiAgdGhpcy5hc3NlcnQob2ssIFwidGhyb3dcIiwgb3B0cylcbn1cblxuLyoqXG4gKiBBc3NlcnQgdGhhdCBhbiBvYmplY3QgaGFzIGEgbGVuZ3RoIHByb3BlcnR5IGVxdWFsIHRvIGBleHBlY3RlZGAuXG4gKlxuICogQGV4YW1wbGVcbiAqIFwiU29tZXRoaW5nIG9yIG90aGVyXCIubXVzdC5oYXZlLmxlbmd0aCgxOClcbiAqIFsxLCAyLCAzLCBcIkZvdXIgbydjbG9jayByb2NrXCJdLm11c3QuaGF2ZS5sZW5ndGgoNClcbiAqXG4gKiBAbWV0aG9kIGxlbmd0aFxuICogQHBhcmFtIGV4cGVjdGVkXG4gKi9cbk11c3QucHJvdG90eXBlLmxlbmd0aCA9IGZ1bmN0aW9uKGV4cGVjdGVkKSB7XG4gIHZhciBvayA9IHRoaXMuYWN0dWFsLmxlbmd0aCA9PSBleHBlY3RlZFxuICB0aGlzLmFzc2VydChvaywgXCJoYXZlIGxlbmd0aCBvZlwiLCB7ZXhwZWN0ZWQ6IGV4cGVjdGVkfSlcbn1cblxuLyoqXG4gKiBBc3NlcnQgdGhhdCBhbiBvYmplY3QgaXMgZnJvemVuIHdpdGggYE9iamVjdC5pc0Zyb3plbmAuXG4gKlxuICogQGV4YW1wbGVcbiAqIE9iamVjdC5mcmVlemUoe30pLm11c3QuYmUuZnJvemVuKClcbiAqXG4gKiBAbWV0aG9kIGZyb3plblxuICovXG5NdXN0LnByb3RvdHlwZS5mcm96ZW4gPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5hc3NlcnQoT2JqZWN0LmlzRnJvemVuKHRoaXMuYWN0dWFsKSwgXCJiZSBmcm96ZW5cIilcbn1cblxuLyoqXG4gKiBBc3NlcnQgdGhhdCBhbiBvYmplY3QgaGFzIGFsbCBvZiB0aGUgcHJvcGVydGllcyBnaXZlbiBpbiBgcHJvcGVydGllc2Agd2l0aFxuICogZXF1YWwgKGA9PT1gKSB2YWx1ZXMuICBJbiBvdGhlciB3b3JkcywgYXNzZXJ0cyB0aGF0IHRoZSBnaXZlbiBvYmplY3QgaXNcbiAqIGEgc3Vic2V0IG9mIHRoZSBvbmUgYXNzZXJ0ZWQgYWdhaW5zdC5cbiAqXG4gKiBUYWtlcyAqKmluaGVyaXRlZCBwcm9wZXJ0aWVzKiogaW50byBhY2NvdW50LiBUbyBub3QgZG8gc28sIHNlZVxuICogW2Bvd25Qcm9wZXJ0aWVzYF0oI011c3QucHJvdG90eXBlLm93blByb3BlcnRpZXMpLlxuICpcbiAqIEBleGFtcGxlXG4gKiB2YXIgam9obiA9IHtuYW1lOiBcIkpvaG5cIiwgYWdlOiA0Miwgc2V4OiBcIm1hbGVcIn1cbiAqIGpvaG4ubXVzdC5oYXZlLnByb3BlcnRpZXMoe25hbWU6IFwiSm9oblwiLCBzZXg6IFwibWFsZVwifSlcbiAqXG4gKiBAbWV0aG9kIHByb3BlcnRpZXNcbiAqIEBwYXJhbSBwcm9wZXJ0aWVzXG4gKi9cbk11c3QucHJvdG90eXBlLnByb3BlcnRpZXMgPSBmdW5jdGlvbihwcm9wcykge1xuICB2YXIgb2JqID0gdGhpcy5hY3R1YWxcbiAgdmFyIG9rID0gdGhpcy5hY3R1YWwgIT0gbnVsbFxuXG4gIGlmIChvaykgZm9yICh2YXIga2V5IGluIHByb3BzKSB7XG4gICAgb2sgPSBrZXkgaW4gb2JqICYmIG9ialtrZXldID09PSBwcm9wc1trZXldXG4gICAgaWYgKCFvaykgYnJlYWtcbiAgfVxuXG4gIHRoaXMuYXNzZXJ0KG9rLCBcImhhdmUgcHJvcGVydGllc1wiLCB7ZXhwZWN0ZWQ6IHByb3BzLCBkaWZmYWJsZTogdHJ1ZX0pXG59XG5cbi8qKlxuICogQXNzZXJ0IHRoYXQgYW4gb2JqZWN0IGhhcyBhbGwgb2YgdGhlIHByb3BlcnRpZXMgZ2l2ZW4gaW4gYHByb3BlcnRpZXNgIHdpdGhcbiAqIGVxdWFsIChgPT09YCkgdmFsdWVzIGFuZCB0aGF0IHRoZXkncmUgb3duIHByb3BlcnRpZXMuICBJbiBvdGhlciB3b3JkcyxcbiAqIGFzc2VydHMgdGhhdCB0aGUgZ2l2ZW4gb2JqZWN0IGlzIGEgc3Vic2V0IG9mIHRoZSBvbmUgYXNzZXJ0ZWQgYWdhaW5zdC5cbiAqXG4gKiAqKkRvZXMgbm90KiogdGFrZSAqKmluaGVyaXRlZCBwcm9wZXJ0aWVzKiogaW50byBhY2NvdW50LiBUbyBkbyBzbywgc2VlXG4gKiBbYHByb3BlcnRpZXNgXSgjTXVzdC5wcm90b3R5cGUucHJvcGVydGllcykuXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBqb2huID0ge25hbWU6IFwiSm9oblwiLCBhZ2U6IDQyLCBzZXg6IFwibWFsZVwifVxuICogam9obi5tdXN0LmhhdmUub3duUHJvcGVydGllcyh7bmFtZTogXCJKb2huXCIsIHNleDogXCJtYWxlXCJ9KVxuICpcbiAqIEBtZXRob2Qgb3duUHJvcGVydGllc1xuICogQHBhcmFtIHByb3BlcnRpZXNcbiAqL1xuTXVzdC5wcm90b3R5cGUub3duUHJvcGVydGllcyA9IGZ1bmN0aW9uKHByb3BzKSB7XG4gIHZhciBvYmogPSB0aGlzLmFjdHVhbFxuICB2YXIgb2sgPSB0aGlzLmFjdHVhbCAhPSBudWxsXG5cbiAgaWYgKG9rKSBmb3IgKHZhciBrZXkgaW4gcHJvcHMpIHtcbiAgICBvayA9IGtleSBpbiBvYmogJiYgaGFzT3duKG9iaiwga2V5KSAmJiBvYmpba2V5XSA9PT0gcHJvcHNba2V5XVxuICAgIGlmICghb2spIGJyZWFrXG4gIH1cblxuICB0aGlzLmFzc2VydChvaywgXCJoYXZlIG93biBwcm9wZXJ0aWVzXCIsIHtleHBlY3RlZDogcHJvcHMsIGRpZmZhYmxlOiB0cnVlfSlcbn1cblxuLyoqXG4gKiBBc3NlcnQgdGhhdCBhbiBvYmplY3QgaGFzIHByb3BlcnR5IGBwcm9wZXJ0eWAuICBcbiAqIE9wdGlvbmFsbHkgYXNzZXJ0IGl0ICplcXVhbHMqIChgPT09YCkgdG8gYHZhbHVlYC5cbiAqXG4gKiBUYWtlcyAqKmluaGVyaXRlZCBwcm9wZXJ0aWVzKiogaW50byBhY2NvdW50LiBUbyBub3QgZG8gc28sIHNlZVxuICogW2Bvd25Qcm9wZXJ0eWBdKCNNdXN0LnByb3RvdHlwZS5vd25Qcm9wZXJ0eSkuXG4gKlxuICogQGV4YW1wbGVcbiAqIChmdW5jdGlvbigpIHt9KS5tdXN0LmhhdmUucHJvcGVydHkoXCJjYWxsXCIpXG4gKiAoe2xpZmU6IDQyLCBsb3ZlOiA2OX0pLm11c3QuaGF2ZS5wcm9wZXJ0eShcImxvdmVcIiwgNjkpXG4gKlxuICogQG1ldGhvZCBwcm9wZXJ0eVxuICogQHBhcmFtIHByb3BlcnR5XG4gKiBAcGFyYW0gW3ZhbHVlXVxuICovXG5NdXN0LnByb3RvdHlwZS5wcm9wZXJ0eSA9IGZ1bmN0aW9uKHByb3BlcnR5LCBleHBlY3RlZCkge1xuICB2YXIgb2sgPSB0aGlzLmFjdHVhbCAhPSBudWxsICYmIHByb3BlcnR5IGluIE9iamVjdCh0aGlzLmFjdHVhbClcbiAgaWYgKG9rICYmIGFyZ3VtZW50cy5sZW5ndGggPiAxKSBvayA9IHRoaXMuYWN0dWFsW3Byb3BlcnR5XSA9PT0gZXhwZWN0ZWRcblxuICB2YXIgbXNnID0gXCJoYXZlIHByb3BlcnR5IFxcXCJcIiArIHByb3BlcnR5ICsgXCJcXFwiXCIsIG9wdHNcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7IG1zZyArPSBcIiBlcXVhbCB0b1wiOyBvcHRzID0ge2V4cGVjdGVkOiBleHBlY3RlZH0gfVxuICB0aGlzLmFzc2VydChvaywgbXNnLCBvcHRzKVxufVxuXG4vKipcbiAqIEFzc2VydCB0aGF0IGFuIG9iamVjdCBoYXMgb3duIHByb3BlcnR5IGBwcm9wZXJ0eWAuICBcbiAqIE9wdGlvbmFsbHkgYXNzZXJ0IGl0ICplcXVhbHMqIChgPT09YCkgdG8gYHZhbHVlYC5cbiAqXG4gKiAqKkRvZXMgbm90KiogdGFrZSAqKmluaGVyaXRlZCBwcm9wZXJ0aWVzKiogaW50byBhY2NvdW50LiBUbyBkbyBzbywgc2VlXG4gKiBbYHByb3BlcnR5YF0oI011c3QucHJvdG90eXBlLnByb3BlcnR5KS5cbiAqXG4gKiBAZXhhbXBsZVxuICogKHtsaWZlOiA0MiwgbG92ZTogNjl9KS5tdXN0LmhhdmUub3duUHJvcGVydHkoXCJsb3ZlXCIsIDY5KVxuICpcbiAqIEBtZXRob2Qgb3duUHJvcGVydHlcbiAqIEBwYXJhbSBwcm9wZXJ0eVxuICogQHBhcmFtIFt2YWx1ZV1cbiAqL1xuTXVzdC5wcm90b3R5cGUub3duUHJvcGVydHkgPSBmdW5jdGlvbihwcm9wZXJ0eSwgZXhwZWN0ZWQpIHtcbiAgdmFyIG9rID0gdGhpcy5hY3R1YWwgIT0gbnVsbFxuICBvayA9IG9rICYmIGhhc093bih0aGlzLmFjdHVhbCwgcHJvcGVydHkpXG4gIGlmIChvayAmJiBhcmd1bWVudHMubGVuZ3RoID4gMSkgb2sgPSB0aGlzLmFjdHVhbFtwcm9wZXJ0eV0gPT09IGV4cGVjdGVkXG5cbiAgdmFyIG1zZyA9IFwiaGF2ZSBvd24gcHJvcGVydHkgXFxcIlwiICsgcHJvcGVydHkgKyBcIlxcXCJcIiwgb3B0c1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHsgbXNnICs9IFwiIGVxdWFsIHRvXCI7IG9wdHMgPSB7ZXhwZWN0ZWQ6IGV4cGVjdGVkfSB9XG4gIHRoaXMuYXNzZXJ0KG9rLCBtc2csIG9wdHMpXG59XG5cbi8qKlxuICogQG1ldGhvZCBvd25cbiAqIEBhbGlhcyBvd25Qcm9wZXJ0eVxuICovXG5NdXN0LnByb3RvdHlwZS5vd24gPSBNdXN0LnByb3RvdHlwZS5vd25Qcm9wZXJ0eVxuXG4vKipcbiAqIEFzc2VydCB0aGF0IGFuIG9iamVjdCBoYXMgb25seSB0aGUgZXhwZWN0ZWQgZW51bWVyYWJsZSBga2V5c2AuICBcbiAqIFBhc3MgYW4gYXJyYXkgb2Ygc3RyaW5ncyBhcyBga2V5c2AuXG4gKlxuICogVGFrZXMgKippbmhlcml0ZWQgcHJvcGVydGllcyoqIGludG8gYWNjb3VudC4gVG8gbm90IGRvIHNvLCBzZWVcbiAqIFtgb3duS2V5c2BdKCNNdXN0LnByb3RvdHlwZS5vd25LZXlzKS5cbiAqXG4gKiBAZXhhbXBsZVxuICogKHtsaWZlOiA0MiwgbG92ZTogNjl9KS5tdXN0LmhhdmUua2V5cyhbXCJsaWZlXCIsIFwibG92ZVwiXSlcbiAqIE9iamVjdC5jcmVhdGUoe2xpZmU6IDQyfSkubXVzdC5oYXZlLmtleXMoW1wibGlmZVwiXSlcbiAqXG4gKiBAbWV0aG9kIGtleXNcbiAqIEBwYXJhbSBrZXlzXG4gKi9cbk11c3QucHJvdG90eXBlLmtleXMgPSBmdW5jdGlvbihleHBlY3RlZCkge1xuICB2YXIgb2sgPSB0aGlzLmFjdHVhbCAhPSBudWxsXG4gIG9rID0gb2sgJiYgaXNQZXJtdXRhdGlvbk9mKE8ua2V5cyhPYmplY3QodGhpcy5hY3R1YWwpKSwgZXhwZWN0ZWQpXG4gIHRoaXMuYXNzZXJ0KG9rLCBcImhhdmUga2V5c1wiLCB7ZXhwZWN0ZWQ6IGV4cGVjdGVkfSlcbn1cblxuLyoqXG4gKiBBc3NlcnQgdGhhdCBhbiBvYmplY3QgaGFzIG9ubHkgdGhlIGV4cGVjdGVkIGVudW1lcmFibGUgYGtleXNgIG9mIGl0cyBvd24uICBcbiAqIFBhc3MgYW4gYXJyYXkgb2Ygc3RyaW5ncyBhcyBga2V5c2AuXG4gKlxuICogKipEb2VzIG5vdCoqIHRha2UgKippbmhlcml0ZWQgcHJvcGVydGllcyoqIGludG8gYWNjb3VudC4gVG8gZG8gc28sIHNlZVxuICogW2BrZXlzYF0oI011c3QucHJvdG90eXBlLmtleXMpLlxuICpcbiAqIEBleGFtcGxlXG4gKiAoe2xpZmU6IDQyLCBsb3ZlOiA2OX0pLm11c3QuaGF2ZS5vd25LZXlzKFtcImxpZmVcIiwgXCJsb3ZlXCJdKVxuICpcbiAqIEBtZXRob2Qgb3duS2V5c1xuICogQHBhcmFtIGtleXNcbiAqL1xuTXVzdC5wcm90b3R5cGUub3duS2V5cyA9IGZ1bmN0aW9uKGV4cGVjdGVkKSB7XG4gIHZhciBvayA9IHRoaXMuYWN0dWFsICE9IG51bGxcbiAgb2sgPSBvayAmJiBpc1Blcm11dGF0aW9uT2YoT2JqZWN0LmtleXMoT2JqZWN0KHRoaXMuYWN0dWFsKSksIGV4cGVjdGVkKVxuICB0aGlzLmFzc2VydChvaywgXCJoYXZlIG93biBrZXlzXCIsIHtleHBlY3RlZDogZXhwZWN0ZWR9KVxufVxuXG4vKipcbiAqIEFzc2VydCB0aGF0IGFuIG9iamVjdCBoYXMgYW4gZW51bWVyYWJsZSBwcm9wZXJ0eSBgcHJvcGVydHlgLiAgXG4gKiBJdCB3aWxsIGZhaWwgaWYgdGhlIG9iamVjdCBsYWNrcyB0aGUgcHJvcGVydHkgZW50aXJlbHkuXG4gKlxuICogVGhpcyBhbHNvIGNoZWNrcyBpbmhlcml0ZWQgcHJvcGVydGllcyBpbiB0aGUgcHJvdG90eXBlIGNoYWluLCBzb21ldGhpbmcgd2hpY2hcbiAqIGBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlYCBpdHNlbGYgZG9lcyBub3QgZG8uXG4gKlxuICogRm9yIGNoZWNraW5nIGlmIGEgcHJvcGVydHkgZXhpc3RzICphbmQqIGlzIG5vbi1lbnVtZXJhYmxlLCBzZWVcbiAqIFtgbm9uZW51bWVyYWJsZWBdKCNNdXN0LnByb3RvdHlwZS5ub25lbnVtZXJhYmxlKS5cbiAqXG4gKiBAZXhhbXBsZVxuICogKHtsaWZlOiA0MiwgbG92ZTogNjl9KS5tdXN0LmhhdmUuZW51bWVyYWJsZShcImxvdmVcIilcbiAqXG4gKiBAbWV0aG9kIGVudW1lcmFibGVcbiAqIEBwYXJhbSBwcm9wZXJ0eVxuICovXG5NdXN0LnByb3RvdHlwZS5lbnVtZXJhYmxlID0gZnVuY3Rpb24ocHJvcGVydHkpIHtcbiAgdmFyIG9rID0gdGhpcy5hY3R1YWwgIT0gbnVsbFxuICBvayA9IG9rICYmIGlzRW51bWVyYWJsZShPYmplY3QodGhpcy5hY3R1YWwpLCBwcm9wZXJ0eSlcbiAgdGhpcy5hc3NlcnQob2ssIFwiaGF2ZSBlbnVtZXJhYmxlIHByb3BlcnR5IFxcXCJcIiArIHByb3BlcnR5ICsgXCJcXFwiXCIpXG59XG5cbi8qKlxuICogQG1ldGhvZCBlbnVtZXJhYmxlUHJvcGVydHlcbiAqIEBhbGlhcyBlbnVtZXJhYmxlXG4gKi9cbk11c3QucHJvdG90eXBlLmVudW1lcmFibGVQcm9wZXJ0eSA9IE11c3QucHJvdG90eXBlLmVudW1lcmFibGVcblxuLyoqXG4gKiBBc3NlcnQgdGhhdCBhbiBvYmplY3QgaGFzIGEgbm9uLWVudW1lcmFibGUgcHJvcGVydHkgYHByb3BlcnR5YC4gIFxuICogSXQgd2lsbCBmYWlsIGlmIHRoZSBvYmplY3QgbGFja3MgdGhlIHByb3BlcnR5IGVudGlyZWx5LlxuICpcbiAqIFRoaXMgYWxzbyBjaGVja3MgaW5oZXJpdGVkIHByb3BlcnRpZXMgaW4gdGhlIHByb3RvdHlwZSBjaGFpbiwgc29tZXRoaW5nIHdoaWNoXG4gKiBgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZWAgaXRzZWxmIGRvZXMgbm90IGRvLlxuICpcbiAqIEl0J3MgdGhlIGludmVyc2Ugb2YgW2BlbnVtZXJhYmxlYF0oI011c3QucHJvdG90eXBlLmVudW1lcmFibGUpLlxuICpcbiAqIEBleGFtcGxlXG4gKiAoZnVuY3Rpb24oKSB7fSkubXVzdC5oYXZlLm5vbmVudW1lcmFibGUoXCJjYWxsXCIpXG4gKiBPYmplY3QuY3JlYXRlKHt9LCB7bG92ZToge2VudW1lcmFibGU6IDB9fSkubXVzdC5oYXZlLm5vbmVudW1lcmFibGUoXCJsb3ZlXCIpXG4gKlxuICogQG1ldGhvZCBub25lbnVtZXJhYmxlXG4gKiBAcGFyYW0gcHJvcGVydHlcbiAqL1xuTXVzdC5wcm90b3R5cGUubm9uZW51bWVyYWJsZSA9IGZ1bmN0aW9uKHByb3BlcnR5KSB7XG4gIHZhciBvayA9IHRoaXMuYWN0dWFsICE9IG51bGxcbiAgb2sgPSBvayAmJiBwcm9wZXJ0eSBpbiBPYmplY3QodGhpcy5hY3R1YWwpXG4gIG9rID0gb2sgJiYgIWlzRW51bWVyYWJsZShPYmplY3QodGhpcy5hY3R1YWwpLCBwcm9wZXJ0eSlcbiAgdGhpcy5hc3NlcnQob2ssIFwiaGF2ZSBub25lbnVtZXJhYmxlIHByb3BlcnR5IFxcXCJcIiArIHByb3BlcnR5ICsgXCJcXFwiXCIpXG59XG5cbmZ1bmN0aW9uIGlzRW51bWVyYWJsZShvYmosIG5hbWUpIHtcbiAgLy8gVXNpbmcgcHJvcGVydHlJc0VudW1lcmFibGUgc2F2ZXMgYSBwb3NzaWJsZSBsb29waW5nIG9mIGFsbCBrZXlzLlxuICBpZiAoT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKG9iaiwgbmFtZSkpIHJldHVybiB0cnVlXG4gIGZvciAodmFyIGtleSBpbiBvYmopIGlmIChrZXkgPT0gbmFtZSkgcmV0dXJuIHRydWVcbiAgcmV0dXJuIGZhbHNlXG59XG5cbi8qKlxuICogQG1ldGhvZCBub25lbnVtZXJhYmxlUHJvcGVydHlcbiAqIEBhbGlhcyBub25lbnVtZXJhYmxlXG4gKi9cbk11c3QucHJvdG90eXBlLm5vbmVudW1lcmFibGVQcm9wZXJ0eSA9IE11c3QucHJvdG90eXBlLm5vbmVudW1lcmFibGVcblxuLyoqXG4gKiBBc3NlcnQgdGhhdCBhbiBvYmplY3QgaXMgYmVsb3cgYW5kIGxlc3MgdGhhbiAoYDxgKSBgZXhwZWN0ZWRgLiAgXG4gKiBVc2VzIGA8YCBmb3IgY29tcGFyaXNvbiwgc28gaXQnbGwgYWxzbyB3b3JrIHdpdGggdmFsdWUgb2JqZWN0cyAodGhvc2VcbiAqIGltcGxlbWVudGluZyBbYHZhbHVlT2ZgXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QvdmFsdWVPZikpIGxpa2UgYERhdGVgLlxuICpcbiAqIEBleGFtcGxlXG4gKiAoNDIpLm11c3QuYmUuYmVsb3coNjkpXG4gKlxuICogQG1ldGhvZCBiZWxvd1xuICogQHBhcmFtIGV4cGVjdGVkXG4gKi9cbk11c3QucHJvdG90eXBlLmJlbG93ID0gZnVuY3Rpb24oZXhwZWN0ZWQpIHtcbiAgdGhpcy5hc3NlcnQodGhpcy5hY3R1YWwgPCBleHBlY3RlZCwgXCJiZSBiZWxvd1wiLCB7ZXhwZWN0ZWQ6IGV4cGVjdGVkfSlcbn1cblxuLyoqXG4gKiBAbWV0aG9kIGx0XG4gKiBAYWxpYXMgYmVsb3dcbiAqL1xuTXVzdC5wcm90b3R5cGUubHQgPSBNdXN0LnByb3RvdHlwZS5iZWxvd1xuXG4vKipcbiAqIFdvcmtzIHdlbGwgd2l0aCBkYXRlcyB3aGVyZSBzYXlpbmcgKmJlZm9yZSogaXMgbW9yZSBuYXR1cmFsIHRoYW4gKmJlbG93KiBvclxuICogKmxlc3MgdGhhbiouXG4gKlxuICogVG8gYXNzZXJ0IHRoYXQgYSBkYXRlIGlzIGVxdWl2YWxlbnQgdG8gYW5vdGhlciBkYXRlLCB1c2VcbiAqIFtgZXFsYF0oI011c3QucHJvdG90eXBlLmVxbCkuIEZvciByZWd1bGFyIG51bWJlcnMsXG4gKiBbYGVxdWFsYF0oI011c3QucHJvdG90eXBlLmVxdWFsKSBpcyBmaW5lLlxuICpcbiAqIEBleGFtcGxlXG4gKiAoNDIpLm11c3QuYmUuYmVmb3JlKDEzMzcpXG4gKiBuZXcgRGF0ZSgyMDAwLCA1LCAxOCkubXVzdC5iZS5iZWZvcmUobmV3IERhdGUoMjAwMSwgMCwgMSkpXG4gKlxuICogQG1ldGhvZCBiZWZvcmVcbiAqIEBhbGlhcyBiZWxvd1xuICovXG5NdXN0LnByb3RvdHlwZS5iZWZvcmUgPSBNdXN0LnByb3RvdHlwZS5iZWxvd1xuXG4vKipcbiAqIEFzc2VydCB0aGF0IGFuIG9iamVjdCBpcyBhdCBtb3N0LCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gKGA8PWApLCBgZXhwZWN0ZWRgLiAgXG4gKiBVc2VzIGA8PWAgZm9yIGNvbXBhcmlzb24sIHNvIGl0J2xsIGFsc28gd29yayB3aXRoIHZhbHVlIG9iamVjdHMgKHRob3NlXG4gKiBpbXBsZW1lbnRpbmcgW2B2YWx1ZU9mYF0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvT2JqZWN0L3ZhbHVlT2YpKSBsaWtlIGBEYXRlYC5cbiAqXG4gKiBAZXhhbXBsZVxuICogKDQyKS5tdXN0LmJlLmF0Lm1vc3QoNjkpXG4gKiAoNDIpLm11c3QuYmUuYXQubW9zdCg0MilcbiAqXG4gKiBAbWV0aG9kIG1vc3RcbiAqIEBwYXJhbSBleHBlY3RlZFxuICovXG5NdXN0LnByb3RvdHlwZS5tb3N0ID0gZnVuY3Rpb24oZXhwZWN0ZWQpIHtcbiAgdGhpcy5hc3NlcnQodGhpcy5hY3R1YWwgPD0gZXhwZWN0ZWQsIFwiYmUgYXQgbW9zdFwiLCB7ZXhwZWN0ZWQ6IGV4cGVjdGVkfSlcbn1cblxuLyoqXG4gKiBAbWV0aG9kIGx0ZVxuICogQGFsaWFzIG1vc3RcbiAqL1xuTXVzdC5wcm90b3R5cGUubHRlID0gTXVzdC5wcm90b3R5cGUubW9zdFxuXG4vKipcbiAqIEFzc2VydCB0aGF0IGFuIG9iamVjdCBpcyBhYm92ZSBhbmQgZ3JlYXRlciB0aGFuIChgPmApIGBleHBlY3RlZGAuICBcbiAqIFVzZXMgYD5gIGZvciBjb21wYXJpc29uLCBzbyBpdCdsbCBhbHNvIHdvcmsgd2l0aCB2YWx1ZSBvYmplY3RzICh0aG9zZVxuICogaW1wbGVtZW50aW5nIFtgdmFsdWVPZmBdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC92YWx1ZU9mKSkgbGlrZSBgRGF0ZWAuXG4gKlxuICogQGV4YW1wbGVcbiAqICg2OSkubXVzdC5iZS5hYm92ZSg0MilcbiAqXG4gKiBAbWV0aG9kIGFib3ZlXG4gKiBAcGFyYW0gZXhwZWN0ZWRcbiAqL1xuTXVzdC5wcm90b3R5cGUuYWJvdmUgPSBmdW5jdGlvbihleHBlY3RlZCkge1xuICB0aGlzLmFzc2VydCh0aGlzLmFjdHVhbCA+IGV4cGVjdGVkLCBcImJlIGFib3ZlXCIsIHtleHBlY3RlZDogZXhwZWN0ZWR9KVxufVxuXG4vKipcbiAqIEBtZXRob2QgZ3RcbiAqIEBhbGlhcyBhYm92ZVxuICovXG5NdXN0LnByb3RvdHlwZS5ndCA9IE11c3QucHJvdG90eXBlLmFib3ZlXG5cbi8qKlxuICogV29ya3Mgd2VsbCB3aXRoIGRhdGVzIHdoZXJlIHNheWluZyAqYWZ0ZXIqIGlzIG1vcmUgbmF0dXJhbCB0aGFuICphYm92ZSogb3JcbiAqICpncmVhdGVyIHRoYW4qLlxuICpcbiAqIFRvIGFzc2VydCB0aGF0IGEgZGF0ZSBpcyBlcXVpdmFsZW50IHRvIGFub3RoZXIgZGF0ZSwgdXNlXG4gKiBbYGVxbGBdKCNNdXN0LnByb3RvdHlwZS5lcWwpLiBGb3IgcmVndWxhciBudW1iZXJzLFxuICogW2BlcXVhbGBdKCNNdXN0LnByb3RvdHlwZS5lcXVhbCkgaXMgZmluZS5cbiAqXG4gKiBAZXhhbXBsZVxuICogKDEzMzcpLm11c3QuYmUuYWZ0ZXIoNDIpXG4gKiBuZXcgRGF0ZSgyMDMwLCA1LCAxOCkubXVzdC5iZS5hZnRlcihuZXcgRGF0ZSgyMDEzLCA5LCAyMykpXG4gKlxuICogQG1ldGhvZCBhZnRlclxuICogQGFsaWFzIGFib3ZlXG4gKi9cbk11c3QucHJvdG90eXBlLmFmdGVyID0gTXVzdC5wcm90b3R5cGUuYWJvdmVcblxuLyoqXG4gKiBBc3NlcnQgdGhhdCBhbiBvYmplY3QgaXMgYXQgbGVhc3QsIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAoYD49YCksXG4gKiBgZXhwZWN0ZWRgLiAgXG4gKiBVc2VzIGA+PWAgZm9yIGNvbXBhcmlzb24sIHNvIGl0J2xsIGFsc28gd29yayB3aXRoIHZhbHVlIG9iamVjdHMgKHRob3NlXG4gKiBpbXBsZW1lbnRpbmcgW2B2YWx1ZU9mYF0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvT2JqZWN0L3ZhbHVlT2YpKSBsaWtlIGBEYXRlYC5cbiAqXG4gKiBAZXhhbXBsZVxuICogKDY5KS5tdXN0LmJlLmF0LmxlYXN0KDQyKVxuICogKDQyKS5tdXN0LmJlLmF0LmxlYXN0KDQyKVxuICpcbiAqIEBtZXRob2QgbGVhc3RcbiAqIEBwYXJhbSBleHBlY3RlZFxuICovXG5NdXN0LnByb3RvdHlwZS5sZWFzdCA9IGZ1bmN0aW9uKGV4cGVjdGVkKSB7XG4gIHRoaXMuYXNzZXJ0KHRoaXMuYWN0dWFsID49IGV4cGVjdGVkLCBcImJlIGF0IGxlYXN0XCIsIHtleHBlY3RlZDogZXhwZWN0ZWR9KVxufVxuXG4vKipcbiAqIEBtZXRob2QgZ3RlXG4gKiBAYWxpYXMgbGVhc3RcbiAqL1xuTXVzdC5wcm90b3R5cGUuZ3RlID0gTXVzdC5wcm90b3R5cGUubGVhc3RcblxuLyoqXG4gKiBBc3NlcnQgdGhhdCBhbiBvYmplY3QgaXMgYmV0d2VlbiBgYmVnaW5gIGFuZCBgZW5kYCAoaW5jbHVzaXZlKS4gIFxuICogVXNlcyBgPGAgZm9yIGNvbXBhcmlzb24sIHNvIGl0J2xsIGFsc28gd29yayB3aXRoIHZhbHVlIG9iamVjdHMgKHRob3NlXG4gKiBpbXBsZW1lbnRpbmcgW2B2YWx1ZU9mYF0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvT2JqZWN0L3ZhbHVlT2YpKSBsaWtlIGBEYXRlYC5cbiAqXG4gKiBAZXhhbXBsZVxuICogKDEzKS5tdXN0LmJlLmJldHdlZW4oMTMsIDY5KVxuICogKDQyKS5tdXN0LmJlLmJldHdlZW4oMTMsIDY5KVxuICogKDY5KS5tdXN0LmJlLmJldHdlZW4oMTMsIDY5KVxuICpcbiAqIEBtZXRob2QgYmV0d2VlblxuICogQHBhcmFtIGJlZ2luXG4gKiBAcGFyYW0gZW5kXG4gKi9cbk11c3QucHJvdG90eXBlLmJldHdlZW4gPSBmdW5jdGlvbihiZWdpbiwgZW5kKSB7XG4gIHRoaXMuYXNzZXJ0KGJlZ2luIDw9IHRoaXMuYWN0dWFsICYmIHRoaXMuYWN0dWFsIDw9IGVuZCwgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIFwiYmUgYmV0d2VlbiBcIiArIHN0cmluZ2lmeShiZWdpbikgKyBcIiBhbmQgXCIgKyBzdHJpbmdpZnkoZW5kKVxuICB9KVxufVxuLyoqXG4gKiBNYWtlcyBhbnkgbWF0Y2hlciBmb2xsb3dpbmcgdGhlIHVzZSBvZiBgcmVzb2x2ZWAgd2FpdCB0aWxsIGEgcHJvbWlzZVxuICogcmVzb2x2ZXMgYmVmb3JlIGFzc2VydGluZy4gIFxuICogUmV0dXJucyBhIG5ldyBwcm9taXNlIHRoYXQgd2lsbCBlaXRoZXIgcmVzb2x2ZSBpZiB0aGUgYXNzZXJ0aW9uIHBhc3NlZCBvclxuICogZmFpbCB3aXRoIGBBc3NlcnRpb25FcnJvcmAuXG4gKlxuICogUHJvbWlzZXMgYXJlIHRyYW5zcGFyZW50IHRvIG1hdGNoZXJzLCBzbyBldmVyeXRoaW5nIHdpbGwgYWxzbyB3b3JrIHdpdGhcbiAqIGN1c3RvbWVyIG1hdGNoZXJzIHlvdSd2ZSBhZGRlZCB0byBgTXVzdC5wcm90b3R5cGVgLiBJbnRlcm5hbGx5IE11c3QganVzdFxuICogd2FpdHMgb24gdGhlIHByb21pc2UgYW5kIGNhbGxzIHRoZSBtYXRjaGVyIGZ1bmN0aW9uIG9uY2UgaXQncyByZXNvbHZlZC5cbiAqXG4gKiBXaXRoIFtNb2NoYV0oaHR0cDovL21vY2hhanMub3JnKSwgdXNpbmcgdGhpcyB3aWxsIGxvb2sgc29tZXRoaW5nIGxpa2U6XG4gKlxuICogYGBgamF2YXNjcmlwdFxuICogaXQoXCJtdXN0IHBhc3NcIiwgZnVuY3Rpb24oKSB7XG4gKiAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoNDIpLm11c3QucmVzb2x2ZS50by5lcXVhbCg0MilcbiAqIH0pXG4gKiBgYGBcbiAqXG4gKiBVc2luZyBbQ29Nb2NoYV0oaHR0cHM6Ly9naXRodWIuY29tL2JsYWtlZW1icmV5L2NvLW1vY2hhKSwgaXQnbGwgbG9vayBsaWtlOlxuICogYGBgamF2YXNjcmlwdFxuICogaXQoXCJtdXN0IHBhc3NcIiwgZnVuY3Rpb24qKCkge1xuICogICB5aWVsZCBQcm9taXNlLnJlc29sdmUoNDIpLm11c3QucmVzb2x2ZS50by5lcXVhbCg0MilcbiAqICAgeWllbGQgUHJvbWlzZS5yZXNvbHZlKFsxLCAyLCAzXSkubXVzdC5yZXNvbHZlLnRvLm5vdC5pbmNsdWRlKDQyKVxuICogfSlcbiAqIGBgYFxuICpcbiAqIEBleGFtcGxlXG4gKiBQcm9taXNlLnJlc29sdmUoNDIpLm11c3QucmVzb2x2ZS50by5lcXVhbCg0MilcbiAqIFByb21pc2UucmVzb2x2ZShbMSwgMiwgM10pLm11c3QucmVzb2x2ZS50by5ub3QuaW5jbHVkZSg0MilcbiAqXG4gKiBAcHJvcGVydHkgcmVzb2x2ZVxuICogQG9uIHByb3RvdHlwZVxuICovXG5kZWZpbmVHZXR0ZXIoTXVzdC5wcm90b3R5cGUsIFwicmVzb2x2ZVwiLCBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIFJlc29sdmFibGUodGhpcylcbn0pXG5cbi8qKlxuICogQGV4YW1wbGVcbiAqIFByb21pc2UucmVzb2x2ZSg0MikubXVzdC50aGVuLmVxdWFsKDQyKVxuICpcbiAqIEBwcm9wZXJ0eSB0aGVuXG4gKiBAb24gcHJvdG90eXBlXG4gKiBAYWxpYXMgcmVzb2x2ZVxuICovXG5kZWZpbmVHZXR0ZXIoTXVzdC5wcm90b3R5cGUsIFwidGhlblwiLCBsb29rdXBHZXR0ZXIoTXVzdC5wcm90b3R5cGUsIFwicmVzb2x2ZVwiKSlcblxuLyoqXG4gKiBAZXhhbXBsZVxuICogUHJvbWlzZS5yZXNvbHZlKDQyKS5tdXN0LmV2ZW50dWFsbHkuZXF1YWwoNDIpXG4gKlxuICogQHByb3BlcnR5IGV2ZW50dWFsbHlcbiAqIEBvbiBwcm90b3R5cGVcbiAqIEBhbGlhcyByZXNvbHZlXG4gKi9cbmRlZmluZUdldHRlcihNdXN0LnByb3RvdHlwZSwgXCJldmVudHVhbGx5XCIsXG4gICAgICAgICAgICAgbG9va3VwR2V0dGVyKE11c3QucHJvdG90eXBlLCBcInJlc29sdmVcIikpXG5cbi8qKlxuICogTWFrZXMgYW55IG1hdGNoZXIgZm9sbG93aW5nIHRoZSB1c2Ugb2YgYHJlamVjdGAgd2FpdCB0aWxsIGEgcHJvbWlzZVxuICogaXMgcmVqZWN0ZWQgYmVmb3JlIGFzc2VydGluZy4gIFxuICogUmV0dXJucyBhIG5ldyBwcm9taXNlIHRoYXQgd2lsbCBlaXRoZXIgcmVzb2x2ZSBpZiB0aGUgYXNzZXJ0aW9uIHBhc3NlZCBvclxuICogZmFpbCB3aXRoIGBBc3NlcnRpb25FcnJvcmAuXG4gKlxuICogUHJvbWlzZXMgYXJlIHRyYW5zcGFyZW50IHRvIG1hdGNoZXJzLCBzbyBldmVyeXRoaW5nIHdpbGwgYWxzbyB3b3JrIHdpdGhcbiAqIGN1c3RvbWVyIG1hdGNoZXJzIHlvdSd2ZSBhZGRlZCB0byBgTXVzdC5wcm90b3R5cGVgLiBJbnRlcm5hbGx5IE11c3QganVzdFxuICogd2FpdHMgb24gdGhlIHByb21pc2UgYW5kIGNhbGxzIHRoZSBtYXRjaGVyIGZ1bmN0aW9uIG9uY2UgaXQncyByZWplY3RlZC5cbiAqXG4gKiBXaXRoIFtNb2NoYV0oaHR0cDovL21vY2hhanMub3JnKSwgdXNpbmcgdGhpcyB3aWxsIGxvb2sgc29tZXRoaW5nIGxpa2U6XG4gKlxuICogYGBgamF2YXNjcmlwdFxuICogaXQoXCJtdXN0IHBhc3NcIiwgZnVuY3Rpb24oKSB7XG4gKiAgIHJldHVybiBQcm9taXNlLnJlamVjdCg0MikubXVzdC5yZWplY3QudG8uZXF1YWwoNDIpXG4gKiB9KVxuICogYGBgXG4gKlxuICogVXNpbmcgW0NvTW9jaGFdKGh0dHBzOi8vZ2l0aHViLmNvbS9ibGFrZWVtYnJleS9jby1tb2NoYSksIGl0J2xsIGxvb2sgbGlrZTpcbiAqIGBgYGphdmFzY3JpcHRcbiAqIGl0KFwibXVzdCBwYXNzXCIsIGZ1bmN0aW9uKigpIHtcbiAqICAgeWllbGQgUHJvbWlzZS5yZWplY3QoNDIpLm11c3QucmVqZWN0LnRvLmVxdWFsKDQyKVxuICogICB5aWVsZCBQcm9taXNlLnJlamVjdChbMSwgMiwgM10pLm11c3QucmVqZWN0LnRvLm5vdC5pbmNsdWRlKDQyKVxuICogfSlcbiAqIGBgYFxuICpcbiAqIEBleGFtcGxlXG4gKiBQcm9taXNlLnJlamVjdCg0MikubXVzdC5yZWplY3QudG8uZXF1YWwoNDIpXG4gKiBQcm9taXNlLnJlamVjdChbMSwgMiwgM10pLm11c3QucmVqZWN0LnRvLm5vdC5pbmNsdWRlKDQyKVxuICpcbiAqIEBwcm9wZXJ0eSByZWplY3RcbiAqIEBvbiBwcm90b3R5cGVcbiAqL1xuZGVmaW5lR2V0dGVyKE11c3QucHJvdG90eXBlLCBcInJlamVjdFwiLCBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIFJlamVjdGFibGUodGhpcylcbn0pXG5cbi8qKlxuICogQXNzZXJ0IGEgc3RyaW5nIHN0YXJ0cyB3aXRoIHRoZSBnaXZlbiBzdHJpbmcuXG4gKlxuICogQGV4YW1wbGVcbiAqIFwiSGVsbG8sIEpvaG5cIi5tdXN0LnN0YXJ0V2l0aChcIkhlbGxvXCIpXG4gKlxuICogQG1ldGhvZCBzdGFydFdpdGhcbiAqIEBwYXJhbSBleHBlY3RlZFxuICovXG5NdXN0LnByb3RvdHlwZS5zdGFydFdpdGggPSBmdW5jdGlvbihleHBlY3RlZCkge1xuICB2YXIgb2sgPSBzdGFydHNXaXRoKHRoaXMuYWN0dWFsLCBleHBlY3RlZClcbiAgdGhpcy5hc3NlcnQob2ssIFwic3RhcnQgd2l0aFwiLCB7ZXhwZWN0ZWQ6IGV4cGVjdGVkfSlcbn1cblxuLyoqXG4gICogUGFzcy10aHJvdWdoIHByb3BlcnR5IGZvciBhIGZsdWVudCBjaGFpbi5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogUHJvbWlzZS5yZXNvbHZlKDQyKS5tdXN0LnJlc29sdmUud2l0aC5udW1iZXIoKVxuICAqXG4gICogQHByb3BlcnR5IHdpdGhcbiAgKiBAb24gcHJvdG90eXBlXG4gICovXG5kZWZpbmVHZXR0ZXIoTXVzdC5wcm90b3R5cGUsIFwid2l0aFwiLCBwYXNzdGhyb3VnaClcblxuTXVzdC5wcm90b3R5cGUuYXNzZXJ0ID0gZnVuY3Rpb24gYXNzZXJ0KG9rLCBtZXNzYWdlLCBvcHRzKSB7XG4gIGlmICghdGhpcy5uZWdhdGl2ZSA/IG9rIDogIW9rKSByZXR1cm5cblxuICBvcHRzID0gb3B0cyA/IE9iamVjdC5jcmVhdGUob3B0cykgOiB7fVxuICBpZiAoIShcImFjdHVhbFwiIGluIG9wdHMpKSBvcHRzLmFjdHVhbCA9IHRoaXMuYWN0dWFsXG5cbiAgaWYgKCEoXCJjYWxsZXJcIiBpbiBvcHRzKSkge1xuICAgIC8vIEFjY2Vzc2luZyBjYWxsZXIgaW4gc3RyaWN0IG1vZGUgdGhyb3dzIFR5cGVFcnJvci5cbiAgICB0cnkgeyBvcHRzLmNhbGxlciA9IGFzc2VydC5jYWxsZXIgfVxuICAgIGNhdGNoIChleCkgeyBvcHRzLmNhbGxlciA9IGFzc2VydCB9XG4gIH1cblxuICB2YXIgbXNnID0gc3RyaW5naWZ5KHRoaXMuYWN0dWFsKSArIFwiIG11c3QgXCIgKyAodGhpcy5uZWdhdGl2ZSA/IFwibm90IFwiIDogXCJcIilcbiAgaWYgKHR5cGVvZiBtZXNzYWdlID09IFwiZnVuY3Rpb25cIikgbXNnICs9IG1lc3NhZ2UuY2FsbCh0aGlzKVxuICBlbHNlIG1zZyArPSBtZXNzYWdlICsgKFwiZXhwZWN0ZWRcIiBpbiBvcHRzID8gXCIgXCIrc3RyaW5naWZ5KG9wdHMuZXhwZWN0ZWQpIDogXCJcIilcbiAgaWYgKHRoaXMubWVzc2FnZSAhPSBudWxsKSBtc2cgPSB0aGlzLm1lc3NhZ2UgKyBcIjogXCIgKyBtc2dcblxuICB0aHJvdyBuZXcgQXNzZXJ0aW9uRXJyb3IobXNnLCBvcHRzKVxufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoTXVzdC5wcm90b3R5cGUsIFwiYXNzZXJ0XCIsIHtlbnVtZXJhYmxlOiBmYWxzZX0pXG5cbmZ1bmN0aW9uIGVxbChhLCBiKSB7XG4gIGlmIChlZ2FsKGEsIGIpKSByZXR1cm4gdHJ1ZVxuXG4gIHZhciB0eXBlID0ga2luZG9mUGxhaW4oYSlcbiAgaWYgKHR5cGUgIT09IGtpbmRvZlBsYWluKGIpKSByZXR1cm4gZmFsc2VcbiAgaWYgKGlzTnVtYmVyKGEpICYmIGlzTnVtYmVyKGIpICYmIGlzTmFOKCthKSAmJiBpc05hTigrYikpIHJldHVybiB0cnVlXG5cbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSBcImFycmF5XCI6XG4gICAgY2FzZSBcInBsYWluXCI6XG4gICAgICByZXR1cm4gbnVsbFxuXG4gICAgY2FzZSBcIm9iamVjdFwiOlxuICAgICAgaWYgKGdldENvbnN0cnVjdG9yT2YoYSkgIT09IGdldENvbnN0cnVjdG9yT2YoYikpIHJldHVybiBmYWxzZVxuICAgICAgaWYgKGhhc1ZhbHVlT2YoYSkgJiYgaGFzVmFsdWVPZihiKSkgcmV0dXJuIGZhbHNlXG4gICAgICByZXR1cm4gbnVsbFxuXG4gICAgZGVmYXVsdDogcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0Q29uc3RydWN0b3JPZihvYmopIHtcbiAgdmFyIHByb3RvdHlwZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopXG4gIHJldHVybiBwcm90b3R5cGUgPT09IG51bGwgPyB1bmRlZmluZWQgOiBwcm90b3R5cGUuY29uc3RydWN0b3Jcbn1cblxuZnVuY3Rpb24gaGFzVmFsdWVPZihvYmopIHtcbiAgdmFyIHZhbHVlT2YgPSBvYmoudmFsdWVPZlxuICByZXR1cm4gdHlwZW9mIHZhbHVlT2YgPT09IFwiZnVuY3Rpb25cIiAmJiB2YWx1ZU9mICE9PSBPYmplY3QucHJvdG90eXBlLnZhbHVlT2Zcbn1cblxuZnVuY3Rpb24ga2luZG9mUGxhaW4ob2JqKSB7XG4gIHZhciB0eXBlID0ga2luZG9mKG9iailcbiAgaWYgKHR5cGUgPT09IFwib2JqZWN0XCIgJiYgTy5pc1BsYWluT2JqZWN0KG9iaikpIHJldHVybiBcInBsYWluXCJcbiAgcmV0dXJuIHR5cGVcbn1cblxuZnVuY3Rpb24gaXNFcnJvcihlcnIsIGNvbnN0cnVjdG9yLCBleHBlY3RlZCkge1xuICBpZiAoY29uc3RydWN0b3IgIT0gbnVsbCAmJiAhKGVyciBpbnN0YW5jZW9mIGNvbnN0cnVjdG9yKSkgcmV0dXJuIGZhbHNlXG4gIGlmIChleHBlY3RlZCA9PT0gQU5ZKSByZXR1cm4gdHJ1ZVxuXG4gIHN3aXRjaCAoa2luZG9mKGV4cGVjdGVkKSkge1xuICAgIGNhc2UgXCJzdHJpbmdcIjogcmV0dXJuIG1lc3NhZ2VGcm9tRXJyb3IoZXJyKSA9PT0gZXhwZWN0ZWRcbiAgICBjYXNlIFwicmVnZXhwXCI6IHJldHVybiBleHBlY3RlZC5leGVjKG1lc3NhZ2VGcm9tRXJyb3IoZXJyKSlcbiAgICBkZWZhdWx0OiByZXR1cm4gZXJyID09PSBleHBlY3RlZFxuICB9XG59XG5cbmZ1bmN0aW9uIG1lc3NhZ2VGcm9tRXJyb3IoZXJyKSB7XG4gIC8vIFRoZSBtZXNzYWdlIGluIG5ldyBFcnJvcihtZXNzYWdlKSBnZXRzIGNvbnZlcnRlZCB0byBhIHN0cmluZy5cbiAgcmV0dXJuIGVyciA9PSBudWxsIHx8IHR5cGVvZiBlcnIgPT0gXCJzdHJpbmdcIiA/IGVyciA6IGVyci5tZXNzYWdlXG59XG5cbmZ1bmN0aW9uIGlzRm4oZm4pIHsgcmV0dXJuIHR5cGVvZiBmbiA9PT0gXCJmdW5jdGlvblwiIH1cbmZ1bmN0aW9uIGlzTnVtYmVyKG4pIHsgcmV0dXJuIHR5cGVvZiBuID09PSBcIm51bWJlclwiIHx8IG4gaW5zdGFuY2VvZiBOdW1iZXIgfVxuZnVuY3Rpb24gcGFzc3Rocm91Z2goKSB7IHJldHVybiB0aGlzIH1cbiIsInZhciBNdXN0ID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi9tdXN0XCIpXG4vKiBlc2xpbnQgbm8tZXh0ZW5kLW5hdGl2ZTogMCAqL1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgW2BNdXN0YF0oI011c3QpIHdpdGggdGhlIGN1cnJlbnQgb2JqZWN0IGZvciBhc3NlcnRpbmdcbiAqIGFuZCBjYWxsaW5nIG1hdGNoZXJzIG9uLlxuICpcbiAqIFRoaXMgcHJvcGVydHkgaXMgbm9uLWVudW1lcmFibGUganVzdCBsaWtlIGJ1aWx0LWluIHByb3BlcnRpZXMsIHNvXG4gKiBpdCdsbCBuZXZlciBpbnRlcmZlcmUgd2l0aCBhbnkgcmVndWxhciB1c2FnZSBvZiBvYmplY3RzLlxuICpcbiAqIFBsZWFzZSBub3RlIHRoYXQgSmF2YVNjcmlwdCBkb2VzIG5vdCBhbGxvdyBtZXRob2QgY2FsbHMgb24gYG51bGxgIG9yXG4gKiBgdW5kZWZpbmVkYCwgc28geW91J2xsIHNvbWV0aW1lcyBoYXZlIHRvIGNhbGwgW2BNdXN0YF0oI011c3QpIG9uIHRoZW0gYnlcbiAqIGhhbmQuICBBc3NpZ25pbmcgYHJlcXVpcmUoXCJtdXN0XCIpYCB0byBgZXhwZWN0YCBvciBgZGVtYW5kYCB3b3JrcyB3ZWxsIHdpdGhcbiAqIHRob3NlIGNhc2VzLlxuICpcbiAqIEBleGFtcGxlXG4gKiB0cnVlLm11c3QuYmUudHJ1ZSgpXG4gKiBbXS5tdXN0LmJlLmVtcHR5KClcbiAqXG4gKiBAcHJvcGVydHkgbXVzdFxuICogQGZvciBPYmplY3RcbiAqIEBvbiBwcm90b3R5cGVcbiAqL1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KE9iamVjdC5wcm90b3R5cGUsIFwibXVzdFwiLCB7XG4gIGdldDogZnVuY3Rpb24oKSB7IFwidXNlIHN0cmljdFwiOyByZXR1cm4gbmV3IE11c3QodGhpcykgfSxcblxuICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwibXVzdFwiLCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICBlbnVtcmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pXG4gIH0sXG5cbiAgLy8gV2l0aG91dCBjb25maWd1cmFibGUsIGNhbid0IHJlZGVmaW5lIGl0IHdoZW4gcmVsb2FkaW5nIHRoaXMgZmlsZSwgZS5nLlxuICBjb25maWd1cmFibGU6IHRydWVcbn0pXG4iLCJ2YXIgaGFzT3duID0gRnVuY3Rpb24uY2FsbC5iaW5kKE9iamVjdC5oYXNPd25Qcm9wZXJ0eSlcbnZhciBpc0VudW1lcmFibGUgPSBGdW5jdGlvbi5jYWxsLmJpbmQoT2JqZWN0LnByb3BlcnR5SXNFbnVtZXJhYmxlKVxudmFyIGdldFByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoXCIuL2xpYi9lczZcIikuZ2V0UHJvcGVydHlEZXNjcmlwdG9yXG52YXIgbG9va3VwR2V0dGVyID0gT2JqZWN0LnByb3RvdHlwZS5fX2xvb2t1cEdldHRlcl9fXG52YXIgbG9va3VwU2V0dGVyID0gT2JqZWN0LnByb3RvdHlwZS5fX2xvb2t1cFNldHRlcl9fXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXlcbnZhciBTRVRfUFJPVE9fT0ZfTlVMTCA9IFwiT29sb25nLnNldFByb3RvdHlwZU9mIGNhbGxlZCBvbiBudWxsIG9yIHVuZGVmaW5lZFwiXG5cbi8qKlxuICogQGNsYXNzIE9vbG9uZ1xuICovXG5cbi8qKlxuICogQXNzaWducyBhbGwgZW51bWVyYWJsZSBwcm9wZXJ0aWVzIG9uIGBzb3VyY2VgIG9iamVjdHMgdG8gYHRhcmdldGAuICBcbiAqIFNpbWlsYXIgdG8gYE9iamVjdC5hc3NpZ25gLCBidXQgdGFrZXMgaW5oZXJpdGVkIHByb3BlcnRpZXMgaW50byBhY2NvdW50LlxuICogRG9lcyBub3QgbW9kaWZ5IGFueXRoaW5nIGluIHRoZSBzb3VyY2Ugb2JqZWN0cy4gIFxuICogUmV0dXJucyBgdGFyZ2V0YC5cbiAqXG4gKiBUaGluayBvZiBpdCBhcyBfZXh0ZW5kaW5nXyB0aGUgZmlyc3Qgb2JqZWN0IHN0ZXAgYnkgc3RlcCB3aXRoIG90aGVycy5cbiAqXG4gKiBAZXhhbXBsZVxuICogT29sb25nLmFzc2lnbih7bmFtZTogXCJKb2huXCJ9LCB7YWdlOiAzMn0sIHtzaGlydDogXCJibHVlXCJ9KVxuICogLy8gPT4ge25hbWU6IFwiSm9oblwiLCBhZ2U6IDMyLCBzaGlydDogXCJibHVlXCJ9XG4gKlxuICogQHN0YXRpY1xuICogQG1ldGhvZCBhc3NpZ25cbiAqIEBwYXJhbSB0YXJnZXRcbiAqIEBwYXJhbSBzb3VyY2UuLi5cbiAqL1xuZXhwb3J0cy5hc3NpZ24gPSBmdW5jdGlvbiBhc3NpZ24odGFyZ2V0KSB7XG4gIGlmICh0YXJnZXQgIT0gbnVsbCkgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldXG4gICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldFxufVxuXG4vKipcbiAqIEFzc2lnbnMgYWxsIG93biBlbnVtZXJhYmxlIHByb3BlcnRpZXMgb24gYHNvdXJjZWAgb2JqZWN0cyB0byBgdGFyZ2V0YC4gIFxuICogTGlrZSBgT2JqZWN0LmFzc2lnbmAuIERvZXMgbm90IG1vZGlmeSBhbnl0aGluZyBpbiB0aGUgc291cmNlIG9iamVjdHMuICBcbiAqIFJldHVybnMgYHRhcmdldGAuXG4gKlxuICogVGhpbmsgb2YgaXQgYXMgX2V4dGVuZGluZ18gdGhlIGZpcnN0IG9iamVjdCBzdGVwIGJ5IHN0ZXAgd2l0aCBvdGhlcnMuXG4gKlxuICogQGV4YW1wbGVcbiAqIE9vbG9uZy5hc3NpZ25Pd24oe25hbWU6IFwiSm9oblwifSwge2FnZTogMzJ9LCBPYmplY3QuY3JlYXRlKHtzaGlydDogXCJibHVlXCJ9KSlcbiAqIC8vID0+IHtuYW1lOiBcIkpvaG5cIiwgYWdlOiAzMn1cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWV0aG9kIGFzc2lnbk93blxuICogQHBhcmFtIHRhcmdldFxuICogQHBhcmFtIHNvdXJjZS4uLlxuICovXG5leHBvcnRzLmFzc2lnbk93biA9IGZ1bmN0aW9uIGFzc2lnbk93bih0YXJnZXQpIHtcbiAgaWYgKHRhcmdldCAhPSBudWxsKSBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7ICsraSkge1xuICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV1cbiAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSBpZiAoaGFzT3duKHNvdXJjZSwga2V5KSkgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldFxufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBzaGFsbG93IGNsb25lIG9mIHRoZSBnaXZlbiBvYmplY3QsIHRha2luZyBhbGwgZW51bWVyYWJsZVxuICogcHJvcGVydGllcyBpbnRvIGFjY291bnQuICBcbiAqIFNoYWxsb3cgbWVhbnMgaWYgeW91J3ZlIGdvdCBuZXN0ZWQgb2JqZWN0cywgdGhvc2Ugd2lsbCBiZSBzaGFyZWQuXG4gKlxuICogQGV4YW1wbGVcbiAqIE9vbG9uZy5jbG9uZSh7bmFtZTogXCJKb2huXCIsIGFnZTogMzJ9KVxuICogLy8gPT4ge25hbWU6IFwiSm9oblwiLCBhZ2U6IDMyfVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZXRob2QgY2xvbmVcbiAqIEBwYXJhbSBvYmplY3RcbiAqL1xuZXhwb3J0cy5jbG9uZSA9IGZ1bmN0aW9uIGNsb25lKG9iaikge1xuICByZXR1cm4gb2JqID09IG51bGwgPyBvYmogOiBleHBvcnRzLmFzc2lnbih7fSwgb2JqKVxufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBkZWVwIGNsb25lIG9mIHRoZSBnaXZlbiBvYmplY3QsIHRha2luZyBhbGwgZW51bWVyYWJsZSBwcm9wZXJ0aWVzXG4gKiBpbnRvIGFjY291bnQuXG4gKlxuICogQGV4YW1wbGVcbiAqIE9vbG9uZy5jbG9uZURlZXAoe25hbWU6IFwiSm9oblwiLCBhdHRyaWJ1dGVzOiB7YWdlOiA0Mn19KVxuICogLy8gPT4ge25hbWU6IFwiSm9oblwiLCBhdHRyaWJ1dGVzOiB7YWdlOiA0Mn19XG4gKlxuICogQHN0YXRpY1xuICogQG1ldGhvZCBjbG9uZURlZXBcbiAqIEBwYXJhbSBvYmplY3RcbiAqL1xuZXhwb3J0cy5jbG9uZURlZXAgPSBmdW5jdGlvbiBjbG9uZURlZXAob2JqKSB7XG4gIHJldHVybiBvYmogPT0gbnVsbCA/IG9iaiA6IGV4cG9ydHMubWVyZ2Uoe30sIG9iailcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGFuZCByZXR1cm5zIGFuIG9iamVjdCBpbmhlcml0aW5nIGZyb20gYHByb3RvdHlwZWAgYW5kLCBvcHRpb25hbGx5LFxuICogYXNzaWducyBlbnVtZXJhYmxlIHByb3BlcnRpZXMgZnJvbSBgc291cmNlYCBvYmplY3RzIHRvIHRoZSBuZXcgb2JqZWN0LiAgXG4gKiBVc2VzIGBPYmplY3QuY3JlYXRlYCBhbmQgW2BPb2xvbmcuYXNzaWduYF0oI09vbG9uZy5hc3NpZ24pXG4gKiBpbnRlcm5hbGx5LiAgXG4gKiBEb2VzIG5vdCBtb2RpZnkgdGhlIGdpdmVuIGBwcm90b3R5cGVgIG5vciBzb3VyY2Ugb2JqZWN0cy5cbiAqXG4gKiBAZXhhbXBsZVxuICogdmFyIFBFUlNPTiA9IHtuYW1lOiBcIlVua25vd25cIiwgYWdlOiAwfVxuICogT29sb25nLmNyZWF0ZShQRVJTT04sIHtuYW1lOiBcIkpvaG5cIn0sIHtzaGlydDogXCJibHVlXCJ9KVxuICogLy8gPT4ge25hbWU6IFwiSm9oblwiLCBhZ2U6IDAsIHNoaXJ0OiBcImJsdWVcIn1cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWV0aG9kIGNyZWF0ZVxuICogQHBhcmFtIHByb3RvdHlwZVxuICogQHBhcmFtIFtzb3VyY2UuLi5dXG4gKi9cbmV4cG9ydHMuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKG9iaikge1xuICBvYmogPSBhcmd1bWVudHNbMF0gPSBPYmplY3QuY3JlYXRlKG9iailcbiAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPT0gMSA/IG9iaiA6IGV4cG9ydHMuYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbn1cblxuLyoqXG4gKiBBc3NpZ25zIGFsbCBlbnVtZXJhYmxlIHByb3BlcnRpZXMgb24gYHNvdXJjZWAgb2JqZWN0cyB0byBgdGFyZ2V0YCB0aGF0IHRoZVxuICogYHRhcmdldGAgYWxyZWFkeSBfZG9lc24ndF8gaGF2ZS4gVXNlcyBga2V5IGluIG9iamAgdG8gY2hlY2sgZm9yIGV4aXN0ZW5jZS4gIFxuICogRG9lcyBub3QgbW9kaWZ5IGFueXRoaW5nIGluIHRoZSBzb3VyY2Ugb2JqZWN0cy4gIFxuICogUmV0dXJucyBgdGFyZ2V0YC5cbiAqXG4gKiBOb3RlIHRoYXQgYmVjYXVzZSAqKmluaGVyaXRlZCBwcm9wZXJ0aWVzKiogb24gYHRhcmdldGAgYXJlIGNoZWNrZWQsIGFueVxuICogcHJvcGVydHkgdGhhdCBleGlzdHMgb24gYE9iamVjdC5wcm90b3R5cGVgIChlLmcuIGB0b1N0cmluZ2AsIGB2YWx1ZU9mYClcbiAqIHdpbGwgYmUgc2tpcHBlZC4gVXN1YWxseSB0aGF0J3Mgbm90IGEgcHJvYmxlbSwgYnV0IGlmIHlvdSB3YW50IHRvIHVzZVxuICogYE9vbG9uZy5kZWZhdWx0c2AgZm9yIGhhc2htYXBzL2RpY3Rpb25hcmllcyB3aXRoIHVua25vd24ga2V5cywgZW5zdXJlXG4gKiBgdGFyZ2V0YCBpbmhlcml0cyBmcm9tIGBudWxsYCBpbnN0ZWFkICh1c2UgYE9iamVjdC5jcmVhdGUobnVsbClgKS5cbiAqXG4gKiBAZXhhbXBsZVxuICogdmFyIFBFUlNPTiA9IHtuYW1lOiBcIlVua25vd25cIiwgYWdlOiAwLCBzaGlydDogXCJibHVlXCJ9XG4gKiBPb2xvbmcuZGVmYXVsdHMoe25hbWU6IFwiSm9oblwiLCBhZ2U6IDQyfSwgUEVSU09OKVxuICogLy8gPT4ge25hbWU6IFwiSm9oblwiLCBhZ2U6IDQyLCBzaGlydDogXCJibHVlXCJ9XG4gKlxuICogQHN0YXRpY1xuICogQG1ldGhvZCBkZWZhdWx0c1xuICogQHBhcmFtIHRhcmdldFxuICogQHBhcmFtIHNvdXJjZS4uLlxuICovXG5leHBvcnRzLmRlZmF1bHRzID0gZnVuY3Rpb24gZGVmYXVsdHModGFyZ2V0KSB7XG4gIGlmICh0YXJnZXQgIT0gbnVsbCkgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldXG4gICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgaWYgKCEoa2V5IGluIHRhcmdldCkpIHRhcmdldFtrZXldID0gc291cmNlW2tleV1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXRcbn1cblxuLyoqXG4gKiBEZWZpbmVzIGEgZ2V0dGVyIG9uIGFuIG9iamVjdC4gIFxuICogU2ltaWxhciB0byBbYE9iamVjdC5wcm90b3R5cGUuX19kZWZpbmVHZXR0ZXJfX2BdW19fZGVmaW5lR2V0dGVyX19dLCBidXRcbiAqIHdvcmtzIGluIGEgc3RhbmRhcmRzIGNvbXBsaWFudCB3YXkuICBcbiAqIFJldHVybnMgYG9iamVjdGAuXG4gKlxuICogVGhlIHByb3BlcnR5IGlzIGJ5IGRlZmF1bHQgbWFkZSAqY29uZmlndXJhYmxlKiBhbmQgKmVudW1lcmFibGUqLiBTaG91bGQgdGhlXG4gKiBwcm9wZXJ0eSBleGlzdCBiZWZvcmUsIGl0J3MgZW51bWVyYWJpbGl0eSB3aWxsIGJlIGxlZnQgYXMgaXMuXG4gKlxuICogW19fZGVmaW5lR2V0dGVyX19dOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QvX19kZWZpbmVHZXR0ZXJfX1xuICpcbiAqIEBleGFtcGxlXG4gKiB2YXIgcGVyc29uID0ge2JpcnRoeWVhcjogMTk4N31cbiAqXG4gKiBPb2xvbmcuZGVmaW5lR2V0dGVyKHBlcnNvbiwgXCJhZ2VcIiwgZnVuY3Rpb24oKSB7XG4gKiAgIHJldHVybiBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkgLSB0aGlzLmJpcnRoeWVhclxuICogfSlcbiAqXG4gKiBwZXJzb24uYWdlIC8vID0+IDI4IGFzIG9mIHRvZGF5IGluIDIwMTUuXG4gKlxuICogQHN0YXRpY1xuICogQG1ldGhvZCBkZWZpbmVHZXR0ZXJcbiAqIEBwYXJhbSBvYmplY3RcbiAqIEBwYXJhbSBwcm9wZXJ0eVxuICogQHBhcmFtIGZuXG4gKi9cbmV4cG9ydHMuZGVmaW5lR2V0dGVyID0gZnVuY3Rpb24gZGVmaW5lR2V0dGVyKG9iaiwgbmFtZSwgZm4pIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIG5hbWUsIHtcbiAgICBnZXQ6IGZuLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBlbnVtZXJhYmxlOiAhaGFzT3duKG9iaiwgbmFtZSkgfHwgaXNFbnVtZXJhYmxlKG9iaiwgbmFtZSlcbiAgfSlcbn1cblxuLyoqXG4gKiBEZWZpbmVzIGEgc2V0dGVyIG9uIGFuIG9iamVjdC4gIFxuICogU2ltaWxhciB0byBbYE9iamVjdC5wcm90b3R5cGUuX19kZWZpbmVTZXR0ZXJfX2BdW19fZGVmaW5lU2V0dGVyX19dLCBidXRcbiAqIHdvcmtzIGluIGEgc3RhbmRhcmRzIGNvbXBsaWFudCB3YXkuICBcbiAqIFJldHVybnMgYG9iamVjdGAuXG4gKlxuICogVGhlIHByb3BlcnR5IGlzIGJ5IGRlZmF1bHQgbWFkZSAqY29uZmlndXJhYmxlKiBhbmQgKmVudW1lcmFibGUqLiBTaG91bGQgdGhlXG4gKiBwcm9wZXJ0eSBleGlzdCBiZWZvcmUsIGl0J3MgZW51bWVyYWJpbGl0eSB3aWxsIGJlIGxlZnQgYXMgaXMuXG4gKlxuICogW19fZGVmaW5lU2V0dGVyX19dOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QvX19kZWZpbmVTZXR0ZXJfX1xuICpcbiAqIEBleGFtcGxlXG4gKiB2YXIgcGVyc29uID0ge31cbiAqXG4gKiBPb2xvbmcuZGVmaW5lU2V0dGVyKHBlcnNvbiwgXCJhZ2VcIiwgZnVuY3Rpb24oYWdlKSB7XG4gKiAgIHRoaXMuYmlydGh5ZWFyID0gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpIC0gYWdlXG4gKiB9KVxuICpcbiAqIHBlcnNvbi5hZ2UgPSAyOFxuICogcGVyc29uLmJpcnRoeWVhciAvLyA9PiAxOTg3IGFzIG9mIHRvZGF5IGluIDIwMTUuXG4gKlxuICogQHN0YXRpY1xuICogQG1ldGhvZCBkZWZpbmVTZXR0ZXJcbiAqIEBwYXJhbSBvYmplY3RcbiAqIEBwYXJhbSBwcm9wZXJ0eVxuICogQHBhcmFtIGZuXG4gKi9cbmV4cG9ydHMuZGVmaW5lU2V0dGVyID0gZnVuY3Rpb24gZGVmaW5lU2V0dGVyKG9iaiwgbmFtZSwgZm4pIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIG5hbWUsIHtcbiAgICBzZXQ6IGZuLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBlbnVtZXJhYmxlOiAhaGFzT3duKG9iaiwgbmFtZSkgfHwgaXNFbnVtZXJhYmxlKG9iaiwgbmFtZSlcbiAgfSlcbn1cblxuLyoqXG4gKiBDYWxscyB0aGUgZ2l2ZW4gZnVuY3Rpb24gZm9yIGFsbCBlbnVtZXJhYmxlIHByb3BlcnRpZXMuICBcbiAqIFJldHVybnMgdGhlIGdpdmVuIG9iamVjdC5cbiAqXG4gKiBUaGUgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgd2l0aCBhcmd1bWVudHMgYHZhbHVlYCwgYGtleWAgYW5kIGBvYmplY3RgIGFuZFxuICogYm91bmQgdG8gYHRoaXNBcmdgLlxuICpcbiAqIEBleGFtcGxlXG4gKiB2YXIgb2JqID0ge25hbWU6IFwiSm9oblwiLCBhZ2U6IDQyfVxuICogT29sb25nLmVhY2gob2JqLCBmdW5jdGlvbih2YWwsIGtleSkgeyBjb25zb2xlLmxvZyhrZXkgKyBcIj1cIiArIHZhbCkgfSlcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWV0aG9kIGVhY2hcbiAqIEBwYXJhbSBvYmplY3RcbiAqIEBwYXJhbSBjYWxsYmFja1xuICogQHBhcmFtIFt0aGlzQXJnXVxuICovXG5leHBvcnRzLmVhY2ggPSBmdW5jdGlvbiBlYWNoKG9iaiwgZm4sIGNvbnRleHQpIHtcbiAgZm9yICh2YXIga2V5IGluIG9iaikgZm4uY2FsbChjb250ZXh0LCBvYmpba2V5XSwga2V5LCBvYmopXG4gIHJldHVybiBvYmpcbn1cblxuLyoqXG4gKiBDYWxscyB0aGUgZ2l2ZW4gZnVuY3Rpb24gZm9yIGFsbCBfb3duXyBlbnVtZXJhYmxlIHByb3BlcnRpZXMuICBcbiAqIFJldHVybnMgdGhlIGdpdmVuIG9iamVjdC5cbiAqXG4gKiBUaGUgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgd2l0aCBhcmd1bWVudHMgYHZhbHVlYCwgYGtleWAgYW5kIGBvYmplY3RgIGFuZFxuICogYm91bmQgdG8gYHRoaXNBcmdgLlxuICpcbiAqIEBleGFtcGxlXG4gKiB2YXIgb2JqID0ge25hbWU6IFwiSm9oblwiLCBhZ2U6IDQyfVxuICogT29sb25nLmVhY2hPd24ob2JqLCBmdW5jdGlvbih2YWwsIGtleSkgeyBjb25zb2xlLmxvZyhrZXkgKyBcIj1cIiArIHZhbCkgfSlcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWV0aG9kIGVhY2hPd25cbiAqIEBwYXJhbSBvYmplY3RcbiAqIEBwYXJhbSBjYWxsYmFja1xuICogQHBhcmFtIFt0aGlzQXJnXVxuICovXG5leHBvcnRzLmVhY2hPd24gPSBmdW5jdGlvbiBlYWNoT3duKG9iaiwgZm4sIGNvbnRleHQpIHtcbiAgZm9yICh2YXIga2V5IGluIG9iailcbiAgICBpZiAoaGFzT3duKG9iaiwga2V5KSkgZm4uY2FsbChjb250ZXh0LCBvYmpba2V5XSwga2V5LCBvYmopXG5cbiAgcmV0dXJuIG9ialxufVxuXG4vKipcbiAqIEZpbHRlcnMgYWxsIGVudW1lcmFibGUgcHJvcGVydGllcyBhbmQgcmV0dXJucyBhIG5ldyBvYmplY3Qgd2l0aCBvbmx5IHRob3NlXG4gKiBwcm9wZXJ0aWVzIGZvciB3aGljaCB0aGUgZ2l2ZW4gZnVuY3Rpb24gcmV0dXJuZWQgdHJ1dGh5IGZvci5cbiAqXG4gKiBUaGUgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgd2l0aCBhcmd1bWVudHMgYHZhbHVlYCwgYGtleWAgYW5kIGBvYmplY3RgIGFuZFxuICogYm91bmQgdG8gYHRoaXNBcmdgLlxuICpcbiAqIEBleGFtcGxlXG4gKiB2YXIgb2JqID0ge2E6IDEsIGI6IDIsIGM6IDMsIGQ6IDR9XG4gKiBPb2xvbmcuZmlsdGVyKG9iaiwgZnVuY3Rpb24odmFsdWUsIGtleSkgeyByZXR1cm4gdmFsdWUgJSAyID09IDAgfSlcbiAqIC8vID0+IHtiOiAyLCBkOiA0fVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZXRob2QgZmlsdGVyXG4gKiBAcGFyYW0gb2JqZWN0XG4gKiBAcGFyYW0gY2FsbGJhY2tcbiAqIEBwYXJhbSBbdGhpc0FyZ11cbiAqL1xuZXhwb3J0cy5maWx0ZXIgPSBmdW5jdGlvbiBmaWx0ZXIob2JqLCBmbiwgY29udGV4dCkge1xuICB2YXIgZmlsdGVyZWQgPSB7fVxuXG4gIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICB2YXIgdmFsdWUgPSBvYmpba2V5XVxuICAgIGlmIChmbi5jYWxsKGNvbnRleHQsIHZhbHVlLCBrZXksIG9iaikpIGZpbHRlcmVkW2tleV0gPSB2YWx1ZVxuICB9XG5cbiAgcmV0dXJuIGZpbHRlcmVkXG59XG5cbi8qKlxuICogQHN0YXRpY1xuICogQG1ldGhvZCBmb3JFYWNoXG4gKiBAYWxpYXMgZWFjaFxuICovXG5leHBvcnRzLmZvckVhY2ggPSBleHBvcnRzLmVhY2hcblxuLyoqXG4gKiBAc3RhdGljXG4gKiBAbWV0aG9kIGZvckVhY2hPd25cbiAqIEBhbGlhcyBlYWNoT3duXG4gKi9cbmV4cG9ydHMuZm9yRWFjaE93biA9IGV4cG9ydHMuZWFjaE93blxuXG4vKipcbiAqIENoZWNrcyB3aGV0aGVyIHRoZSBnaXZlbiBvYmplY3QgaGFzIHRoZSBnaXZlbiBwcm9wZXJ0eSwgaW5oZXJpdGVkIG9yIG5vdC4gIFxuICogR2l2ZW4gYSBzZXQsIGJ1dCBgdW5kZWZpbmVkYCBwcm9wZXJ0eSB3aWxsIHN0aWxsIHJldHVybiBgdHJ1ZWAuXG4gKlxuICogQGV4YW1wbGVcbiAqIE9vbG9uZy5oYXMoe25hbWU6IFwiSm9oblwifSkgLy8gPT4gdHJ1ZVxuICogT29sb25nLmhhcyhPYmplY3QuY3JlYXRlKHtuYW1lOiBcIkpvaG5cIn0pLCBcIm5hbWVcIikgLy8gPT4gdHJ1ZVxuICogT29sb25nLmhhcyh7fSwgXCJuYW1lXCIpIC8vID0+IGZhbHNlXG4gKlxuICogQHN0YXRpY1xuICogQG1ldGhvZCBoYXNcbiAqIEBwYXJhbSBvYmplY3RcbiAqIEBwYXJhbSBrZXlcbiAqL1xuZXhwb3J0cy5oYXMgPSBmdW5jdGlvbiBoYXMob2JqLCBrZXkpIHtcbiAgcmV0dXJuIGtleSBpbiBvYmpcbn1cblxuLyoqXG4gKiBDaGVja3Mgd2hldGhlciB0aGUgZ2l2ZW4gb2JqZWN0IGhhcyB0aGUgZ2l2ZW4gcHJvcGVydHkgYXMgYW4gb3duIHByb3BlcnR5LiAgXG4gKiBHaXZlbiBhIHNldCwgYnV0IGB1bmRlZmluZWRgIHByb3BlcnR5IHdpbGwgc3RpbGwgcmV0dXJuIGB0cnVlYC5cbiAqXG4gKiBAZXhhbXBsZVxuICogT29sb25nLmhhc093bih7bmFtZTogXCJKb2huXCJ9KSAvLyA9PiB0cnVlXG4gKiBPb2xvbmcuaGFzT3duKE9iamVjdC5jcmVhdGUoe25hbWU6IFwiSm9oblwifSksIFwibmFtZVwiKSAvLyA9PiBmYWxzZVxuICogT29sb25nLmhhc093bih7fSwgXCJuYW1lXCIpIC8vID0+IGZhbHNlXG4gKlxuICogQHN0YXRpY1xuICogQG1ldGhvZCBoYXNPd25cbiAqIEBwYXJhbSBvYmplY3RcbiAqIEBwYXJhbSBrZXlcbiAqL1xuZXhwb3J0cy5oYXNPd24gPSBoYXNPd25cblxuLyoqXG4gKiBDaGVja3Mgd2hldGhlciB0aGUgZ2l2ZW4gb2JqZWN0IGhhcyBhbnkgZW51bWVyYWJsZSBwcm9wZXJ0aWVzLCBpbmhlcml0ZWRcbiAqIG9yIG5vdC5cbiAqXG4gKiBAZXhhbXBsZVxuICogT29sb25nLmlzRW1wdHkoe25hbWU6IFwiSm9oblwifSkgLy8gPT4gZmFsc2VcbiAqIE9vbG9uZy5pc0VtcHR5KE9iamVjdC5jcmVhdGUoe25hbWU6IFwiSm9oblwifSkpIC8vID0+IGZhbHNlXG4gKiBPb2xvbmcuaXNFbXB0eSh7fSkgLy8gPT4gdHJ1ZVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZXRob2QgaXNFbXB0eVxuICogQHBhcmFtIG9iamVjdFxuICovXG5leHBvcnRzLmlzRW1wdHkgPSBmdW5jdGlvbiBpc0VtcHR5KG9iaikge1xuICBmb3IgKG9iaiBpbiBvYmopIHJldHVybiBmYWxzZVxuICByZXR1cm4gdHJ1ZVxufVxuXG4vKipcbiAqIEBzdGF0aWNcbiAqIEBtZXRob2QgaXNJblxuICogQGFsaWFzIGhhc1xuICovXG5leHBvcnRzLmlzSW4gPSBleHBvcnRzLmhhc1xuXG4vKipcbiAqIEBzdGF0aWNcbiAqIEBtZXRob2QgaXNJbk93blxuICogQGFsaWFzIGhhc093blxuICovXG5leHBvcnRzLmlzSW5Pd24gPSBleHBvcnRzLmhhc093blxuXG4vKipcbiAqIENoZWNrcyB3aGV0aGVyIHRoZSBnaXZlbiBvYmplY3QgaXMgb2YgdHlwZSBvYmplY3QgYW5kIGlzIG5vdCBudWxsLlxuICpcbiAqIEBleGFtcGxlXG4gKiBPb2xvbmcuaXNPYmplY3Qoe25hbWU6IFwiSm9oblwifSkgLy8gPT4gdHJ1ZVxuICogT29sb25nLmlzT2JqZWN0KG5ldyBEYXRlKSAvLyA9PiB0cnVlXG4gKiBPb2xvbmcuaXNPYmplY3QoNDIpIC8vID0+IGZhbHNlXG4gKiBPb2xvbmcuaXNPYmplY3QobnVsbCkgLy8gPT4gZmFsc2VcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWV0aG9kIGlzT2JqZWN0XG4gKiBAcGFyYW0gb2JqZWN0XG4gKi9cbmV4cG9ydHMuaXNPYmplY3QgPSBmdW5jdGlvbiBpc09iamVjdChvYmopIHtcbiAgcmV0dXJuIG9iaiAhPSBudWxsICYmIHR5cGVvZiBvYmogPT0gXCJvYmplY3RcIlxufVxuXG4vKipcbiAqIENoZWNrcyB3aGV0aGVyIHRoZSBnaXZlbiBvYmplY3QgaGFzIGFueSBfb3duXyBlbnVtZXJhYmxlIHByb3BlcnRpZXMuXG4gKlxuICogQGV4YW1wbGVcbiAqIE9vbG9uZy5pc093bkVtcHR5KHtuYW1lOiBcIkpvaG5cIn0pIC8vID0+IGZhbHNlXG4gKiBPb2xvbmcuaXNPd25FbXB0eShPYmplY3QuY3JlYXRlKHtuYW1lOiBcIkpvaG5cIn0pKSAvLyA9PiB0cnVlXG4gKiBPb2xvbmcuaXNPd25FbXB0eSh7fSkgLy8gPT4gdHJ1ZVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZXRob2QgaXNPd25FbXB0eVxuICogQHBhcmFtIG9iamVjdFxuICovXG5leHBvcnRzLmlzT3duRW1wdHkgPSBmdW5jdGlvbiBpc093bkVtcHR5KG9iaikge1xuICBmb3IgKHZhciBrZXkgaW4gb2JqKSBpZiAoaGFzT3duKG9iaiwga2V5KSkgcmV0dXJuIGZhbHNlXG4gIHJldHVybiB0cnVlXG59XG5cbi8qKlxuICogQ2hlY2tzIHdoZXRoZXIgdGhlIGdpdmVuIG9iamVjdCBpcyBvbmUgY29uc3RydWN0ZWQgYnkgYE9iamVjdGAgb3IgaW5oZXJpdGluZ1xuICogZnJvbSBgbnVsbGAuXG4gKlxuICogQSBub24tcGxhaW4gb2JqZWN0IGhhcyBhIGBjb25zdHJ1Y3RvcmAgcHJvcGVydHkgc2V0IHRvIGFueXRoaW5nIGJ1dCBgT2JqZWN0YC5cbiAqIFRoYXQncyB0aGUgY2FzZSB3aGVuIHlvdSBkbywgZm9yIGV4YW1wbGUsIGBuZXcgTXlNb2RlbGAsIGBuZXcgRGF0ZWAuXG4gKlxuICogYEFycmF5LnByb3RvdHlwZWAgaXMgbm90IGNvbnNpZGVyZWQgYSBwbGFpbiBvYmplY3QganVzdCBsaWtlIGFuIGFycmF5IGlzbid0XG4gKiBhIHBsYWluIG9iamVjdC4gSmF2YVNjcmlwdCBpcyBhIHByb3RvdHlwaWNhbCBsYW5ndWFnZSBhbmQgdGhlIHByb3RvdHlwZSBvZlxuICogYW4gYXJyYXkgc2hvdWxkIGJlIGNvbnNpZGVyZWQgYW4gYXJyYXkuXG4gKlxuICogQGV4YW1wbGVcbiAqIE9vbG9uZy5pc1BsYWluT2JqZWN0KHtuYW1lOiBcIkpvaG5cIiwgYWdlOiA0Mn0pIC8vID0+IHRydWVcbiAqIE9vbG9uZy5pc1BsYWluT2JqZWN0KE9iamVjdC5jcmVhdGUobnVsbCkpIC8vID0+IHRydWVcbiAqIE9vbG9uZy5pc1BsYWluT2JqZWN0KE1hdGgpIC8vID0+IHRydWVcbiAqIE9vbG9uZy5pc1BsYWluT2JqZWN0KFtdKSAvLyA9PiBmYWxzZVxuICogT29sb25nLmlzUGxhaW5PYmplY3QoQXJyYXkucHJvdG90eXBlKSAvLyA9PiBmYWxzZVxuICogT29sb25nLmlzUGxhaW5PYmplY3QobmV3IERhdGUpIC8vID0+IGZhbHNlXG4gKiBPb2xvbmcuaXNQbGFpbk9iamVjdChcIkpvaG5cIikgLy8gPT4gZmFsc2VcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWV0aG9kIGlzUGxhaW5PYmplY3RcbiAqIEBwYXJhbSBvYmplY3RcbiAqL1xuZXhwb3J0cy5pc1BsYWluT2JqZWN0ID0gZnVuY3Rpb24gaXNQbGFpbk9iamVjdChvYmopIHtcbiAgaWYgKG9iaiA9PSBudWxsKSByZXR1cm4gZmFsc2VcbiAgaWYgKHR5cGVvZiBvYmogIT0gXCJvYmplY3RcIikgcmV0dXJuIGZhbHNlXG4gIGlmIChpc0FycmF5KG9iaikpIHJldHVybiBmYWxzZVxuXG4gIHZhciBwcm90b3R5cGUgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKVxuICBpZiAocHJvdG90eXBlID09PSBudWxsKSByZXR1cm4gdHJ1ZVxuICBpZiAoIShcImNvbnN0cnVjdG9yXCIgaW4gcHJvdG90eXBlKSkgcmV0dXJuIHRydWVcbiAgcmV0dXJuIHByb3RvdHlwZS5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0XG59XG5cbi8qKlxuICogUmV0dXJucyBhbGwgZW51bWVyYWJsZSBrZXlzIG9mIGFuIG9iamVjdCBhcyBhbiBhcnJheS5cbiAqIFNpbWlsYXIgdG8gYE9iamVjdC5rZXlzYCwgYnV0IHRha2VzIGluaGVyaXRlZCBwcm9wZXJ0aWVzIGludG8gYWNjb3VudC5cbiAqXG4gKiBAZXhhbXBsZVxuICogT29sb25nLmtleXMoe25hbWU6IFwiSm9oblwiLCBhZ2U6IDMyfSkgLy8gPT4gW1wibmFtZVwiLCBcImFnZVwiXVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZXRob2Qga2V5c1xuICogQHBhcmFtIG9iamVjdFxuICovXG5leHBvcnRzLmtleXMgPSBmdW5jdGlvbiBrZXlzKG9iaikge1xuICB2YXIga2V5cyA9IFtdXG4gIGZvciAodmFyIGtleSBpbiBvYmopIGtleXMucHVzaChrZXkpXG4gIHJldHVybiBrZXlzXG59XG5cbi8qKlxuICogTG9va3MgdXAgYW5kIHJldHVybnMgYSBnZXR0ZXIgb24gYW4gb2JqZWN0LiAgXG4gKiBTaW1pbGFyIHRvIFtgT2JqZWN0LnByb3RvdHlwZS5fX2xvb2t1cEdldHRlcl9fYF1bX19sb29rdXBHZXR0ZXJfX10sIGJ1dFxuICogd29ya3MgaW4gYSBzdGFuZGFyZHMgY29tcGxpYW50IHdheS4gIFxuICogVGFrZXMgaW5oZXJpdGVkIGdldHRlcnMgaW50byBhY2NvdW50LCBqdXN0IGxpa2UgYF9fbG9va3VwR2V0dGVyX19gLiAgXG4gKlxuICogW19fbG9va3VwR2V0dGVyX19dOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QvX19sb29rdXBHZXR0ZXJfX1xuICpcbiAqIEBleGFtcGxlXG4gKiB2YXIgcGVyc29uID0ge2JpcnRoeWVhcjogMTk4N31cbiAqXG4gKiBPb2xvbmcuZGVmaW5lR2V0dGVyKHBlcnNvbiwgXCJhZ2VcIiwgZnVuY3Rpb24oKSB7XG4gKiAgIHJldHVybiBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkgLSB0aGlzLmJpcnRoeWVhclxuICogfSlcbiAqXG4gKiBPb2xvbmcubG9va3VwR2V0dGVyKHBlcnNvbiwgXCJhZ2VcIikgLy8gUmV0dXJucyB0aGUgZnVuY3Rpb24gYWJvdmUuXG4gKlxuICogQHN0YXRpY1xuICogQG1ldGhvZCBsb29rdXBHZXR0ZXJcbiAqIEBwYXJhbSBvYmplY3RcbiAqIEBwYXJhbSBwcm9wZXJ0eVxuICovXG5leHBvcnRzLmxvb2t1cEdldHRlciA9IGxvb2t1cEdldHRlciA/IEZ1bmN0aW9uLmNhbGwuYmluZChsb29rdXBHZXR0ZXIpIDpcbiAgZnVuY3Rpb24gbG9va3VwU2V0dGVyKG9iaiwgbmFtZSkge1xuICB2YXIgZGVzYyA9IGdldFByb3BlcnR5RGVzY3JpcHRvcihvYmosIG5hbWUpXG4gIHJldHVybiBkZXNjICYmIGRlc2MuZ2V0XG59XG5cbi8qKlxuICogTG9va3MgdXAgYW5kIHJldHVybnMgYSBzZXR0ZXIgb24gYW4gb2JqZWN0LiAgXG4gKiBTaW1pbGFyIHRvIFtgT2JqZWN0LnByb3RvdHlwZS5fX2xvb2t1cFNldHRlcl9fYF1bX19sb29rdXBTZXR0ZXJfX10sIGJ1dFxuICogd29ya3MgaW4gYSBzdGFuZGFyZHMgY29tcGxpYW50IHdheS4gIFxuICogVGFrZXMgaW5oZXJpdGVkIHNldHRlcnMgaW50byBhY2NvdW50LCBqdXN0IGxpa2UgYF9fbG9va3VwU2V0dGVyX19gLiAgXG4gKlxuICogW19fbG9va3VwU2V0dGVyX19dOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QvX19sb29rdXBTZXR0ZXJfX1xuICpcbiAqIEBleGFtcGxlXG4gKiB2YXIgcGVyc29uID0ge2JpcnRoeWVhcjogMTk4N31cbiAqXG4gKiBPb2xvbmcuZGVmaW5lU2V0dGVyKHBlcnNvbiwgXCJhZ2VcIiwgZnVuY3Rpb24oYWdlKSB7XG4gKiAgIHRoaXMuYmlydGh5ZWFyID0gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpIC0gYWdlXG4gKiB9KVxuICpcbiAqIE9vbG9uZy5sb29rdXBTZXR0ZXIocGVyc29uLCBcImFnZVwiKSAvLyBSZXR1cm5zIHRoZSBmdW5jdGlvbiBhYm92ZS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWV0aG9kIGxvb2t1cFNldHRlclxuICogQHBhcmFtIG9iamVjdFxuICogQHBhcmFtIHByb3BlcnR5XG4gKi9cbmV4cG9ydHMubG9va3VwU2V0dGVyID0gbG9va3VwU2V0dGVyID8gRnVuY3Rpb24uY2FsbC5iaW5kKGxvb2t1cFNldHRlcikgOlxuICBmdW5jdGlvbiBsb29rdXBTZXR0ZXIob2JqLCBuYW1lKSB7XG4gIHZhciBkZXNjID0gZ2V0UHJvcGVydHlEZXNjcmlwdG9yKG9iaiwgbmFtZSlcbiAgcmV0dXJuIGRlc2MgJiYgZGVzYy5zZXRcbn1cblxuLyoqXG4gKiBNYXBzIGFsbCBlbnVtZXJhYmxlIHByb3BlcnR5IHZhbHVlcyBhbmQgcmV0dXJucyBhIG5ldyBvYmplY3QuXG4gKlxuICogVGhlIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIHdpdGggYXJndW1lbnRzIGB2YWx1ZWAsIGBrZXlgIGFuZCBgb2JqZWN0YCBhbmRcbiAqIGJvdW5kIHRvIGB0aGlzQXJnYC5cbiAqXG4gKiBAZXhhbXBsZVxuICogdmFyIG9iaiA9IHthOiAxLCBiOiAyLCBjOiAzfVxuICogT29sb25nLm1hcChvYmosIGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHsgcmV0dXJuIHZhbHVlICogMiB9KVxuICogLy8gPT4ge2E6IDIsIGI6IDQsIGM6IDZ9XG4gKlxuICogQHN0YXRpY1xuICogQG1ldGhvZCBtYXBcbiAqIEBwYXJhbSBvYmplY3RcbiAqIEBwYXJhbSBjYWxsYmFja1xuICogQHBhcmFtIFt0aGlzQXJnXVxuICovXG5leHBvcnRzLm1hcCA9IGZ1bmN0aW9uIG1hcChvYmosIGZuLCBjb250ZXh0KSB7XG4gIHZhciBtYXBwZWQgPSB7fVxuICBmb3IgKHZhciBrZXkgaW4gb2JqKSBtYXBwZWRba2V5XSA9IGZuLmNhbGwoY29udGV4dCwgb2JqW2tleV0sIGtleSwgb2JqKVxuICByZXR1cm4gbWFwcGVkXG59XG5cbi8qKlxuICogVHJhbnNmb3JtcyBhbGwgZW51bWVyYWJsZSBrZXlzIGFuZCByZXR1cm5zIGEgbmV3IG9iamVjdC5cbiAqXG4gKiBUaGUgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgd2l0aCBhcmd1bWVudHMgYGtleWAsIGB2YWx1ZWAgYW5kIGBvYmplY3RgIGFuZFxuICogYm91bmQgdG8gYHRoaXNBcmdgLlxuICpcbiAqIEBleGFtcGxlXG4gKiB2YXIgcGVyc29uID0ge25hbWU6IFwiSm9oblwiLCBhZ2U6IDMyfVxuICogT29sb25nLm1hcEtleXMocGVyc29uLCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIGtleS50b1VwcGVyQ2FzZSgpIH0pXG4gKiAvLyA9PiB7TkFNRTogXCJKb2huXCIsIEFHRTogMzJ9XG4gKlxuICogQHN0YXRpY1xuICogQG1ldGhvZCBtYXBLZXlzXG4gKiBAcGFyYW0gb2JqZWN0XG4gKiBAcGFyYW0gY2FsbGJhY2tcbiAqIEBwYXJhbSBbdGhpc0FyZ11cbiAqL1xuZXhwb3J0cy5tYXBLZXlzID0gZnVuY3Rpb24gbWFwS2V5cyhvYmosIGZuLCBjb250ZXh0KSB7XG5cdHZhciByZXN1bHQgPSB7fVxuXG5cdGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICB2YXIgdmFsdWUgPSBvYmpba2V5XVxuICAgIHJlc3VsdFtmbi5jYWxsKGNvbnRleHQsIGtleSwgdmFsdWUsIG9iaildID0gdmFsdWVcbiAgfVxuXG5cdHJldHVybiByZXN1bHRcbn1cblxuLyoqXG4gKiBBc3NpZ25zIGFsbCBlbnVtZXJhYmxlIHByb3BlcnRpZXMgb24gYHNvdXJjZWAgb2JqZWN0cyB0byBgdGFyZ2V0YFxuICogcmVjdXJzaXZlbHkuICBcbiAqIE9ubHkgcGxhaW4gb2JqZWN0cyBhIG1lcmdlZC4gUmVmZXIgdG9cbiAqIFtgT29sb25nLmlzUGxhaW5PYmplY3RgXSgjT29sb25nLmlzUGxhaW5PYmplY3QpIGZvciB0aGUgZGVmaW5pdGlvbiBvZlxuICogYSBwbGFpbiBvYmplY3QuIERvZXMgbm90IG1vZGlmeSBhbnl0aGluZyBpbiB0aGUgc291cmNlIG9iamVjdHMuXG4gKlxuICogVGhpbmsgb2YgaXQgYXMgX2V4dGVuZGluZ18gdGhlIGZpcnN0IG9iamVjdCBzdGVwIGJ5IHN0ZXAgd2l0aCBvdGhlcnMuXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBwZXJzb24gPSB7bmFtZTogXCJKb2huXCIsIGF0dHJpYnV0ZXM6IHthZ2U6IDQyfX1cbiAqIE9vbG9uZy5tZXJnZShwZXJzb24sIHthdHRyaWJ1dGVzOiB7aGVpZ2h0OiAxOTB9fSlcbiAqIHBlcnNvbiAvLyA9PiB7bmFtZTogXCJKb2huXCIsIGF0dHJpYnV0ZXM6IHthZ2U6IDQyLCBoZWlnaHQ6IDE5MH19XG4gKlxuICogQHN0YXRpY1xuICogQG1ldGhvZCBtZXJnZVxuICogQHBhcmFtIHRhcmdldFxuICogQHBhcmFtIHNvdXJjZS4uLlxuICovXG5leHBvcnRzLm1lcmdlID0gZnVuY3Rpb24gbWVyZ2UodGFyZ2V0KSB7XG4gIGlmICh0YXJnZXQgIT0gbnVsbCkgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldXG5cbiAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICB2YXIgYSA9IHRhcmdldFtrZXldXG4gICAgICB2YXIgYiA9IHNvdXJjZVtrZXldXG4gICAgICB2YXIgYUlzT2JqZWN0ID0gZXhwb3J0cy5pc1BsYWluT2JqZWN0KGEpXG4gICAgICB2YXIgYklzT2JqZWN0ID0gZXhwb3J0cy5pc1BsYWluT2JqZWN0KGIpXG5cbiAgICAgIGlmIChhSXNPYmplY3QgJiYgYklzT2JqZWN0KSBtZXJnZShhLCBiKVxuICAgICAgZWxzZSBpZiAoYklzT2JqZWN0KSB0YXJnZXRba2V5XSA9IG1lcmdlKHt9LCBiKVxuICAgICAgZWxzZSB0YXJnZXRba2V5XSA9IGJcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0XG59XG5cbi8qKlxuICogUmV0dXJucyBhIG5ldyBvYmplY3Qgd2l0aCBrZXlzIHRha2VuIGZyb20gdGhlIGFycmF5IGBrZXlzYCBhbmQgdmFsdWVzXG4gKiBmcm9tIHRoZSByZXN1bHQgb2YgY2FsbGluZyB0aGUgZ2l2ZW4gZnVuY3Rpb24gd2l0aCBga2V5YCwgYGluZGV4YCBhbmRcbiAqIGBrZXlzYC4gIFxuICogSXQncyBsaWtlIHRoZSByZXZlcnNlIG9mIGluZGV4aW5nIGFuIGFycmF5LlxuICpcbiAqIEBleGFtcGxlXG4gKiB2YXIgbmFtZXMgPSBbXCJBbGljZVwiLCBcIkJvYlwiLCBcIkNoYXJsaWVcIl1cbiAqIHZhciBsZW5ndGhzID0gT29sb25nLm9iamVjdChuYW1lcywgZnVuY3Rpb24obmFtZSkgeyByZXR1cm4gbmFtZS5sZW5ndGggfSlcbiAqIGxlbmd0aHMgLy8gPT4ge0FsaWNlOiA1LCBCb2I6IDMsIENoYXJsaWU6IDd9XG4gKlxuICogQHN0YXRpY1xuICogQG1ldGhvZCBvYmplY3RcbiAqIEBwYXJhbSBrZXlzXG4gKiBAcGFyYW0gY2FsbGJhY2tcbiAqIEBwYXJhbSBbdGhpc0FyZ11cbiAqL1xuZXhwb3J0cy5vYmplY3QgPSBmdW5jdGlvbiBvYmplY3Qoa2V5cywgZm4sIHRoaXNBcmcpIHtcbiAgdmFyIG9iaiA9IHt9XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIGtleSA9IGtleXNbaV1cbiAgICBvYmpba2V5XSA9IGZuLmNhbGwodGhpc0FyZywga2V5LCBpLCBrZXlzKVxuICB9XG5cbiAgcmV0dXJuIG9ialxufVxuXG4vKipcbiAqIFJldHVybnMgYWxsIGVudW1lcmFibGUgX293bl8ga2V5cyBvZiBhbiBvYmplY3QgYXMgYW4gYXJyYXkuICBcbiAqIFNhbWUgYXMgYE9iamVjdC5rZXlzYCwgcmVhbGx5LlxuICpcbiAqIEBleGFtcGxlXG4gKiB2YXIgcGVyc29uID0gT2JqZWN0LmNyZWF0ZSh7bmFtZTogXCJKb2huXCJ9KVxuICogcGVyc29uLmFnZSA9IDQyXG4gKiBPb2xvbmcub3duS2V5cyhwZXJzb24pIC8vID0+IFtcImFnZVwiXVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZXRob2Qgb3duS2V5c1xuICogQHBhcmFtIG9iamVjdFxuICovXG5leHBvcnRzLm93bktleXMgPSBPYmplY3Qua2V5c1xuXG4vKipcbiAqIEZpbHRlcnMgdGhlIGtleXMgb2YgYW4gb2JqZWN0IHRvIG9ubHkgdGhvc2UgZ2l2ZW4gYXMgYGtleXMuLi5gLiAgXG4gKiBPbmx5IGtleXMgdGhhdCBleGlzdCBpbiBgb2JqZWN0YCBhcmUgaW5jbHVkZWQuXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBwZXJzb24gPSB7bmFtZTogXCJBbGljZVwiLCBlbWFpbDogXCJhbGljZUBleGFtcGxlLmNvbVwiLCBhZ2U6IDQyfVxuICogT29sb25nLnBpY2socGVyc29uLCBcIm5hbWVcIiwgXCJhZ2VcIikgLy8gPT4ge25hbWU6IFwiQWxpY2VcIiwgYWdlOiA0Mn1cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWV0aG9kIHBpY2tcbiAqIEBwYXJhbSBvYmplY3RcbiAqIEBwYXJhbSBrZXlzLi4uXG4gKlxuICovXG5leHBvcnRzLnBpY2sgPSBmdW5jdGlvbiBwaWNrKG9iaikge1xuICB2YXIgdGFyZ2V0ID0ge31cblxuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7ICsraSkge1xuICAgIHZhciBrZXkgPSBhcmd1bWVudHNbaV1cbiAgICBpZiAoa2V5IGluIG9iaikgdGFyZ2V0W2tleV0gPSBvYmpba2V5XVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldFxufVxuXG4vKipcbiAqIEZpbHRlcnMgdGhlIGtleXMgb2YgYW4gb2JqZWN0IHRvIG9ubHkgdGhvc2UgZ2l2ZW4gYXMgYGtleXMuLi5gIHdpdGggc3VwcG9ydFxuICogZm9yIG5lc3RlZCBrZXlzIGluIGFuIGFycmF5IChgW1wiYVwiLCBcImJcIiwgXCJjXCJdYCkuICBcbiAqIE9ubHkga2V5cyB0aGF0IGV4aXN0IGluIGBvYmplY3RgIGFyZSBpbmNsdWRlZC5cbiAqXG4gKiBJZiB5b3UnZCBsaWtlIHRvIHVzZSBzb21lIG90aGVyIHBhdGggc3ludGF4LCBmZWVsIGZyZWUgdG8gcHJlcHJvY2VzcyB5b3VyXG4gKiBrZXlzIGJlZm9yZSBwYXNzaW5nIHRoZW0gdG8gYHBpY2tEZWVwYC4gRm9yIGV4YW1wbGUsIGZvciBhIHBlcmlvZC1zZXBhcmF0ZWRcbiAqIHN5bnRheCAoYGEuYi5jYCksIHVzZSBhIGhlbHBlcjpcbiAqXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiBmdW5jdGlvbiBwYXRoKHMpIHsgcmV0dXJuIHMuc3BsaXQoXCIuXCIpIH1cbiAqIE9vbG9uZy5waWNrRGVlcChwZXJzb24sIFwibmFtZVwiLCBwYXRoKFwiYWRkcmVzcy5jb3VudHJ5XCIpKVxuICogYGBgXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBwZXJzb24gPSB7bmFtZTogXCJBbGljZVwiLCBhZGRyZXNzOiB7Y291bnRyeTogXCJVS1wiLCBzdHJlZXQ6IFwiRG93bmluZ1wifX1cbiAqIHZhciBvYmogPSBPb2xvbmcucGlja0RlZXAocGVyc29uLCBcIm5hbWVcIiwgW1wiYWRkcmVzc1wiLCBcImNvdW50cnlcIl0pXG4gKiBvYmogLy8gPT4ge25hbWU6IFwiQWxpY2VcIiwgYWRkcmVzczoge2NvdW50cnk6IFwiVUtcIn19XG4gKlxuICogQHN0YXRpY1xuICogQG1ldGhvZCBwaWNrRGVlcFxuICogQHBhcmFtIG9iamVjdFxuICogQHBhcmFtIGtleXMuLi5cbiAqXG4gKi9cbmV4cG9ydHMucGlja0RlZXAgPSBmdW5jdGlvbiBwaWNrRGVlcChvYmopIHtcbiAgdmFyIHRhcmdldCA9IHt9XG5cbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIga2V5cyA9IGFycmF5aWZ5KGFyZ3VtZW50c1tpXSksIGxlbmd0aCA9IGtleXMubGVuZ3RoXG4gICAgdmFyIGtleSwgdmFsdWUgPSBvYmosIHQgPSB0YXJnZXQsIGpcblxuICAgIGZvciAoaiA9IDA7IGogPCBsZW5ndGggJiYgKGtleSA9IGtleXNbal0pIGluIHZhbHVlOyArK2opIHZhbHVlID0gdmFsdWVba2V5XVxuICAgIGlmIChqICE9PSBsZW5ndGgpIGNvbnRpbnVlXG4gICAgZm9yIChqID0gMDsgaiA8IGxlbmd0aCAtIDE7ICsraikgdCA9IHRba2V5c1tqXV0gfHwgKHRba2V5c1tqXV0gPSB7fSlcbiAgICB0W2tleXNbal1dID0gdmFsdWVcbiAgfVxuXG4gIHJldHVybiB0YXJnZXRcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgbmV3IG9iamVjdCB3aXRoIHRoZSBzYW1lIGtleXMsIGJ1dCB3aXRoIHZhbHVlcyBiZWluZyB0aGUgdmFsdWUnc1xuICogcHJvcGVydHkgYGtleWAuICBcbiAqIEluIG90aGVyIHdvcmRzLCBpdCdzIHRoZSBzYW1lIGFzIGBPb2xvbmcubWFwKG9iaiwgT29sb25nLnByb3BlcnR5KGtleSkpYC5cbiAqXG4gKiBAZXhhbXBsZVxuICogdmFyIHBlb3BsZSA9IHtcbiAqICAgYToge25hbWU6IFwiQWxpY2VcIn0sXG4gKiAgIGI6IHtuYW1lOiBcIkJvYlwifSxcbiAqICAgYzoge25hbWU6IFwiQ2hhcmxpZVwifVxuICogfVxuICpcbiAqIE9vbG9uZy5wbHVjayhwZW9wbGUsIFwibmFtZVwiKSAvLyA9PiB7YTogXCJBbGljZVwiLCBiOiBcIkJvYlwiLCBjOiBcIkNoYXJsaWVcIn1cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWV0aG9kIHBsdWNrXG4gKiBAcGFyYW0gb2JqZWN0XG4gKiBAcGFyYW0ga2V5XG4gKi9cbmV4cG9ydHMucGx1Y2sgPSBmdW5jdGlvbiBwbHVjayhvYmosIGtleSkge1xuICByZXR1cm4gZXhwb3J0cy5tYXAob2JqLCBleHBvcnRzLnByb3BlcnR5KGtleSkpXG59XG5cbi8qKlxuICogUmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgZ2l2ZW4gcHJvcGVydHkgb2YgYW4gb2JqZWN0LlxuICpcbiAqIEBleGFtcGxlXG4gKiB2YXIgZ2V0TmFtZSA9IE9vbG9uZy5wcm9wZXJ0eShcIm5hbWVcIilcbiAqIGdldE5hbWUoe25hbWU6IFwiSm9oblwifSkgLy8gPT4gXCJKb2huXG4gKlxuICogQHN0YXRpY1xuICogQG1ldGhvZCBwcm9wZXJ0eVxuICogQHBhcmFtIGtleVxuICovXG5leHBvcnRzLnByb3BlcnR5ID0gZnVuY3Rpb24gcHJvcGVydHkoa2V5KSB7XG4gIHJldHVybiBmdW5jdGlvbihvYmopIHsgcmV0dXJuIG9ialtrZXldIH1cbn1cblxuLyoqXG4gKiBSZWplY3RzIGFsbCBlbnVtZXJhYmxlIHByb3BlcnRpZXMgYW5kIHJldHVybnMgYSBuZXcgb2JqZWN0IHdpdGhvdXQgdGhvc2VcbiAqIHByb3BlcnRpZXMgZm9yIHdoaWNoIHRoZSBnaXZlbiBmdW5jdGlvbiByZXR1cm5lZCB0cnV0aHkgZm9yLiAgXG4gKiBPcHBvc2l0ZSBvZiBbYGZpbHRlcmBdKCNPb2xvbmcuZmlsdGVyKS5cbiAqXG4gKiBUaGUgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgd2l0aCBhcmd1bWVudHMgYHZhbHVlYCwgYGtleWAgYW5kIGBvYmplY3RgIGFuZFxuICogYm91bmQgdG8gYHRoaXNBcmdgLlxuICpcbiAqIEBleGFtcGxlXG4gKiB2YXIgb2JqID0ge2E6IDEsIGI6IDIsIGM6IDMsIGQ6IDR9XG4gKiBPb2xvbmcucmVqZWN0KG9iaiwgZnVuY3Rpb24odmFsdWUsIGtleSkgeyByZXR1cm4gdmFsdWUgJSAyID09IDAgfSlcbiAqIC8vID0+IHthOiAxLCBjOiAzfVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZXRob2QgcmVqZWN0XG4gKiBAcGFyYW0gb2JqZWN0XG4gKiBAcGFyYW0gY2FsbGJhY2tcbiAqIEBwYXJhbSBbdGhpc0FyZ11cbiAqL1xuZXhwb3J0cy5yZWplY3QgPSBmdW5jdGlvbiByZWplY3Qob2JqLCBmbiwgY29udGV4dCkge1xuICByZXR1cm4gZXhwb3J0cy5maWx0ZXIob2JqLCBub3QoZm4pLCBjb250ZXh0KVxufVxuXG4vKipcbiAqIFNldCB0aGUgcHJvdG90eXBlIG9mIHRoZSBnaXZlbiBvYmplY3QgdG8gdGhlIGdpdmVuIHByb3RvdHlwZS4gIFxuICogUGFzcyBgbnVsbGAgb3IgYW5vdGhlciBvYmplY3QgZm9yIHRoZSBwcm90b3R5cGUuICBcbiAqIFJldHVybnMgYG9iamVjdGAuXG4gKlxuICogVXNlcyBgT2JqZWN0LnNldFByb3RvdHlwZU9mYCBpZiBpdCBleGlzdHMuIE90aGVyd2lzZSB1c2VzIGEgcG9seWZpbGwuXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBwZXJzb24gPSB7bmFtZTogXCJVbm5hbWVkXCIsIGFnZTogNDJ9XG4gKiB2YXIgbWlrZSA9IE9vbG9uZy5zZXRQcm90b3R5cGVPZih7bmFtZTogXCJNaWtlXCJ9LCBwZXJzb24pXG4gKiBtaWtlLm5hbWUgLy8gPT4gXCJNaWtlXG4gKiBtaWtlLmFnZSAgLy8gPT4gNDJcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWV0aG9kIHNldFByb3RvdHlwZU9mXG4gKiBAcGFyYW0gb2JqZWN0XG4gKiBAcGFyYW0gcHJvdG90eXBlXG4gKi9cbmV4cG9ydHMuc2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgZnVuY3Rpb24gc2V0UHJvdG90eXBlT2Yob2JqLCBwcm90b3R5cGUpIHtcbiAgLyogZXNsaW50IG5vLXByb3RvOiAwICovXG4gIGlmIChvYmogPT0gbnVsbCkgdGhyb3cgbmV3IFR5cGVFcnJvcihTRVRfUFJPVE9fT0ZfTlVMTClcbiAgaWYgKHR5cGVvZiBvYmogPT0gXCJvYmplY3RcIikgb2JqLl9fcHJvdG9fXyA9IHByb3RvdHlwZVxuICByZXR1cm4gb2JqXG59XG5cbi8qKlxuICogUmV0dXJucyBhbGwgZW51bWVyYWJsZSBwcm9wZXJ0eSB2YWx1ZXMgYXMgYW4gYXJyYXkuXG4gKlxuICogQGV4YW1wbGVcbiAqIE9vbG9uZy52YWx1ZXMoe25hbWU6IFwiSm9oblwiLCBhZ2U6IDMyfSkgLy8gPT4gW1wiSm9oblwiLCAzMl1cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWV0aG9kIHZhbHVlc1xuICogQHBhcmFtIG9iamVjdFxuICovXG5leHBvcnRzLnZhbHVlcyA9IGZ1bmN0aW9uIHZhbHVlcyhvYmopIHtcbiAgdmFyIHZhbHVlcyA9IFtdXG4gIGZvciAodmFyIGtleSBpbiBvYmopIHZhbHVlcy5wdXNoKG9ialtrZXldKVxuICByZXR1cm4gdmFsdWVzXG59XG5cbi8qKlxuICogV3JhcHMgYSBnaXZlbiB2YWx1ZSBpbiBhbiBvYmplY3QgdW5kZXIgdGhlIHNwZWNpZmllZCBrZXkuICBcbiAqIFdvcmtzIGFsc28gd2l0aCBbRUNNQVNjcmlwdCA2IFN5bWJvbF0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvU3ltYm9sKS5cbiAqXG4gKiBAZXhhbXBsZVxuICogT29sb25nLndyYXAoXCJKb2huXCIsIFwibmFtZVwiKSAvLyA9PiB7bmFtZTogXCJKb2huXCJ9XG4gKlxuICogQHN0YXRpY1xuICogQG1ldGhvZCB3cmFwXG4gKiBAcGFyYW0gdmFsdWVcbiAqIEBwYXJhbSBrZXlcbiAqL1xuZXhwb3J0cy53cmFwID0gZnVuY3Rpb24gd3JhcCh2YWx1ZSwga2V5KSB7XG4gIHZhciBvYmogPSB7fVxuICBvYmpba2V5XSA9IHZhbHVlXG4gIHJldHVybiBvYmpcbn1cblxuZnVuY3Rpb24gbm90KGZuKSB7IHJldHVybiBmdW5jdGlvbigpIHsgcmV0dXJuICFmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpIH19XG5mdW5jdGlvbiBhcnJheWlmeSh2YWx1ZSkgeyByZXR1cm4gaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZSA6IFt2YWx1ZV0gfVxuIiwiZXhwb3J0cy5nZXRQcm9wZXJ0eURlc2NyaXB0b3IgPSBPYmplY3QuZ2V0UHJvcGVydHlEZXNjcmlwdG9yIHx8XG4gIGZ1bmN0aW9uKG9iaiwgbmFtZSkge1xuICBpZiAoIShuYW1lIGluIG9iaikpIHJldHVyblxuXG4gIHZhciBkZXNjXG4gIGRvIHsgaWYgKGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwgbmFtZSkpIHJldHVybiBkZXNjIH1cbiAgd2hpbGUgKG9iaiA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopKVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xudmFyIG11c3QgPSByZXF1aXJlKFwibXVzdC9yZWdpc3RlclwiKTtcbnZhciBTdHlsZXMgPSByZXF1aXJlKFwid21sLXdpZGdldHMtY29tbW9uL1N0eWxlc1wiKTtcbnZhciB2aWV3XzEgPSByZXF1aXJlKFwiLi92aWV3XCIpO1xudmFyIFRhYmxlXzEgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL3RhYmxlL1RhYmxlXCIpO1xudmFyIGNvdW50ID0gMDtcbjtcbnZhciBOZXh0ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBOZXh0KG5hbWUsIGFtb3VudCwgc3RhdHVzLCB3YXRjaGVycykge1xuICAgICAgICBpZiAobmFtZSA9PT0gdm9pZCAwKSB7IG5hbWUgPSAnJzsgfVxuICAgICAgICBpZiAoYW1vdW50ID09PSB2b2lkIDApIHsgYW1vdW50ID0gMDsgfVxuICAgICAgICBpZiAoc3RhdHVzID09PSB2b2lkIDApIHsgc3RhdHVzID0gJyc7IH1cbiAgICAgICAgaWYgKHdhdGNoZXJzID09PSB2b2lkIDApIHsgd2F0Y2hlcnMgPSBbXTsgfVxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLmFtb3VudCA9IGFtb3VudDtcbiAgICAgICAgdGhpcy5zdGF0dXMgPSBzdGF0dXM7XG4gICAgICAgIHRoaXMud2F0Y2hlcnMgPSB3YXRjaGVycztcbiAgICB9XG4gICAgcmV0dXJuIE5leHQ7XG59KCkpO1xudmFyIGZpZWxkcyA9IFtcbiAgICB7IG5hbWU6ICdudW1iZXInLCBoZWFkaW5nOiAnTnVtYmVyJyB9LFxuICAgIHsgbmFtZTogJ25hbWUnLCBoZWFkaW5nOiAnTmFtZScgfSxcbiAgICB7IG5hbWU6ICdhbW91bnQnLCBoZWFkaW5nOiAnQW1vdW50JyB9LFxuICAgIHsgbmFtZTogJ3N0YXR1cycsIGhlYWRpbmc6ICdTdGF0dXMnIH0sXG4gICAgeyBuYW1lOiAnd2F0Y2hpbmcnLCBoZWFkaW5nOiAnV2F0Y2hpbmcnIH1cbl07XG52YXIgQXBwbGljYXRpb24gPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEFwcGxpY2F0aW9uKCkge1xuICAgICAgICB0aGlzLmZpZWxkcyA9IGZpZWxkcztcbiAgICAgICAgdGhpcy50YWJsZU1vZGVsID0gbmV3IFRhYmxlXzEuU29ydFRhYmxlTW9kZWwoKTtcbiAgICAgICAgdGhpcy5uZXh0ID0gbmV3IE5leHQoKTtcbiAgICAgICAgdGhpcy5yZWNvcmRzID0gW3sgbmFtZTogJ0pvemFpbiBIdWxkdW0nLCBhbW91bnQ6IDMyMDAwLCBzdGF0dXM6ICdhY3RpdmUnLCB3YXRjaGVyczogW10gfV07XG4gICAgICAgIHRoaXMudmlldyA9IG5ldyB2aWV3XzEuTWFpbih0aGlzKTtcbiAgICB9XG4gICAgQXBwbGljYXRpb24ucHJvdG90eXBlLnRvZ2dsZURyYXdlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy52aWV3LmZpbmRCeUlkKCdsYXlvdXQnKS50b2dnbGVEcmF3ZXIoKTtcbiAgICB9O1xuICAgIEFwcGxpY2F0aW9uLnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWwnKTtcbiAgICAgICAgdGhpcy5kaWFsb2cgPSBuZXcgdmlld18xLkNyZWF0ZURpYWxvZyh0aGlzKTtcbiAgICAgICAgd2hpbGUgKHRhcmdldC5maXJzdENoaWxkKVxuICAgICAgICAgICAgdGFyZ2V0LnJlbW92ZUNoaWxkKHRhcmdldC5maXJzdENoaWxkKTtcbiAgICAgICAgdGFyZ2V0LmFwcGVuZENoaWxkKHRoaXMuZGlhbG9nLnJlbmRlcigpKTtcbiAgICB9O1xuICAgIEFwcGxpY2F0aW9uLnByb3RvdHlwZS5zYXZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnJlY29yZHMucHVzaCh0aGlzLm5leHQpO1xuICAgICAgICB0aGlzLm5leHQgPSBuZXcgTmV4dCgpO1xuICAgICAgICB0aGlzLmRpYWxvZy5pZHMubW9kYWwuY2xvc2UoKTtcbiAgICAgICAgdGhpcy52aWV3LmludmFsaWRhdGUoKTtcbiAgICB9O1xuICAgIEFwcGxpY2F0aW9uLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHdpbmRvdy5hcHAgPSB0aGlzO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFpbicpLmFwcGVuZENoaWxkKHRoaXMudmlldy5yZW5kZXIoKSk7XG4gICAgICAgIHRoaXMuZHJhd2VyID0gdGhpcy52aWV3LmZpbmRCeUlkKCdsYXlvdXQnKTtcbiAgICB9O1xuICAgIEFwcGxpY2F0aW9uLm1haW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBuZXcgdGhpcygpO1xuICAgIH07XG4gICAgcmV0dXJuIEFwcGxpY2F0aW9uO1xufSgpKTtcbnZhciBhcHA7XG5kZXNjcmliZSgnQXBwbGljYXRpb24nLCBmdW5jdGlvbiAoKSB7XG4gICAgYmVmb3JlKCdzaG91bGQgcmVuZGVyJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBhcHAgPSBBcHBsaWNhdGlvbi5tYWluKCk7XG4gICAgICAgIGFwcC5ydW4oKTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnRHJhd2VyTGF5b3V0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICBkZXNjcmliZSgnRHJhd2VyTGF5b3V0I3RvZ2dsZURyYXdlcigpJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaXQoJ3Nob3VsZCBoaWRlIGFuZCBzaG93IHRoZSBkcmF3ZXInLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgICAgIHZhciBsYXlvdXQgPSBhcHAudmlldy5maW5kQnlJZCgnbGF5b3V0Jyk7XG4gICAgICAgICAgICAgICAgdmFyIGRyYXdlciA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoU3R5bGVzLkRSQVdFUilbMF07XG4gICAgICAgICAgICAgICAgbXVzdChkcmF3ZXIuY2xpZW50V2lkdGgpLm5vdC5iZSgwKTtcbiAgICAgICAgICAgICAgICBsYXlvdXQudG9nZ2xlRHJhd2VyKCk7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIG11c3QoZHJhd2VyLmNsaWVudFdpZHRoKS5iZSgwKTtcbiAgICAgICAgICAgICAgICAgICAgbGF5b3V0LnRvZ2dsZURyYXdlcigpO1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG11c3QoZHJhd2VyLmNsaWVudFdpZHRoKS5ub3QuYmUoMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG52YXIgd21sX3J1bnRpbWVfMSA9IHJlcXVpcmUoXCJAcXVlbmsvd21sLXJ1bnRpbWVcIik7XG52YXIgY29tcG9uZW50c18xID0gcmVxdWlyZShcIkBxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50c1wiKTtcbnZhciBjb21wb25lbnRzXzIgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzXCIpO1xudmFyIGNvbXBvbmVudHNfMyA9IHJlcXVpcmUoXCJAcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHNcIik7XG52YXIgY29tcG9uZW50c180ID0gcmVxdWlyZShcIkBxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50c1wiKTtcbnZhciBjb21wb25lbnRzXzUgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzXCIpO1xudmFyIGNvbXBvbmVudHNfNiA9IHJlcXVpcmUoXCJAcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHNcIik7XG52YXIgQ3JlYXRlRGlhbG9nID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQ3JlYXRlRGlhbG9nLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIENyZWF0ZURpYWxvZyhjb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbnRleHQpIHx8IHRoaXM7XG4gICAgICAgIHZhciB2aWV3ID0gX3RoaXM7XG4gICAgICAgIF90aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHdtbF9ydW50aW1lXzEud2lkZ2V0KGNvbXBvbmVudHNfNS5Nb2RhbCwge1xuICAgICAgICAgICAgICAgIGh0bWw6IHt9LFxuICAgICAgICAgICAgICAgIHdtbDoge1xuICAgICAgICAgICAgICAgICAgICAnaWQnOiBcIm1vZGFsXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBbd21sX3J1bnRpbWVfMS53aWRnZXQoY29tcG9uZW50c181Lk1vZGFsSGVhZGVyLCB7XG4gICAgICAgICAgICAgICAgICAgIGh0bWw6IHt9LFxuICAgICAgICAgICAgICAgICAgICB3dzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ29uQ2xvc2UnOiBmdW5jdGlvbiBmdW5jdGlvbl9saXRlcmFsXzEoXykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRpYWxvZy5pZHMubW9kYWwuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgW3dtbF9ydW50aW1lXzEudGV4dChcIlxcbiAgICAgIENyZWF0ZSByZWNvcmRcXG4gICAgXCIpXSwgdmlldyksIHdtbF9ydW50aW1lXzEud2lkZ2V0KGNvbXBvbmVudHNfNS5Nb2RhbEJvZHksIHtcbiAgICAgICAgICAgICAgICAgICAgaHRtbDoge31cbiAgICAgICAgICAgICAgICB9LCBbd21sX3J1bnRpbWVfMS53aWRnZXQoY29tcG9uZW50c182LklucHV0LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBodG1sOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHd3OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2lkJzogXCJuYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2xhYmVsJzogXCJOYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ29uSW5wdXQnOiBmdW5jdGlvbiBmdW5jdGlvbl9saXRlcmFsXzIoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5uZXh0Lm5hbWUgPSBlLnRhcmdldC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LmJpbmQodGhpcylcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwgW10sIHZpZXcpLCB3bWxfcnVudGltZV8xLndpZGdldChjb21wb25lbnRzXzYuSW5wdXQsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGh0bWw6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgd3c6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaWQnOiBcImFtb3VudFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdsYWJlbCc6IFwiQW1vdW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3R5cGUnOiBcIm51bWJlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdvbklucHV0JzogZnVuY3Rpb24gZnVuY3Rpb25fbGl0ZXJhbF8zKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubmV4dC5hbW91bnQgPSBOdW1iZXIoZS50YXJnZXQudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCBbXSwgdmlldyksIHdtbF9ydW50aW1lXzEud2lkZ2V0KGNvbXBvbmVudHNfNi5TZWxlY3QsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGh0bWw6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgd3c6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaWQnOiBcInN0YXR1c1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdsYWJlbCc6IFwiU3RhdHVzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ29wdGlvbnMnOiBbJ3BhaWQnLCAnb3ZlcmR1ZScsICdoaXN0b3J5J10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ29uSW5wdXQnOiBmdW5jdGlvbiBmdW5jdGlvbl9saXRlcmFsXzQoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5uZXh0LnN0YXR1cyA9IGUudGFyZ2V0LnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCBbXSwgdmlldyksIHdtbF9ydW50aW1lXzEubm9kZSgnc3BhbicsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGh0bWw6IHt9XG4gICAgICAgICAgICAgICAgICAgIH0sIFt3bWxfcnVudGltZV8xLnRleHQoXCIgUmVjZWl2ZSBOb3RpZmljYXRpb25zPyBcIildLCB2aWV3KSwgd21sX3J1bnRpbWVfMS53aWRnZXQoY29tcG9uZW50c182LlN3aXRjaCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDoge30sXG4gICAgICAgICAgICAgICAgICAgICAgICB3dzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdvbkNoYW5nZSc6IGZ1bmN0aW9uIGZ1bmN0aW9uX2xpdGVyYWxfNShlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoZS50YXJnZXQudmFsdWUpID8gdGhpcy5uZXh0LndhdGNoZXJzLnB1c2goMSkgOiBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCBbXSwgdmlldyldLCB2aWV3KSwgd21sX3J1bnRpbWVfMS53aWRnZXQoY29tcG9uZW50c181Lk1vZGFsRm9vdGVyLCB7XG4gICAgICAgICAgICAgICAgICAgIGh0bWw6IHt9XG4gICAgICAgICAgICAgICAgfSwgW3dtbF9ydW50aW1lXzEud2lkZ2V0KGNvbXBvbmVudHNfMS5CdXR0b24sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGh0bWw6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgd21sOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2lkJzogXCJjYW5jZWxCdXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHd3OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3RleHQnOiBcIkNhbmNlbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdvbkNsaWNrJzogZnVuY3Rpb24gZnVuY3Rpb25fbGl0ZXJhbF82KGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlhbG9nLmlkcy5tb2RhbC5jbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCBbXSwgdmlldyksIHdtbF9ydW50aW1lXzEud2lkZ2V0KGNvbXBvbmVudHNfMS5CdXR0b24sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGh0bWw6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgd21sOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2lkJzogXCJzYXZlQnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB3dzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdzdHlsZSc6IFwiLWRhbmdlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd0ZXh0JzogXCJTYXZlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2NsYXNzJzogXCItcmlnaHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnb25DbGljayc6IHRoaXMuc2F2ZS5iaW5kKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIFtdLCB2aWV3KV0sIHZpZXcpXSwgdmlldyk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIENyZWF0ZURpYWxvZztcbn0od21sX3J1bnRpbWVfMS5BcHBWaWV3KSk7XG5leHBvcnRzLkNyZWF0ZURpYWxvZyA9IENyZWF0ZURpYWxvZztcbmZ1bmN0aW9uIG5hdmlnYXRpb24odmlldykge1xuICAgIHJldHVybiB3bWxfcnVudGltZV8xLmJveChbd21sX3J1bnRpbWVfMS5ub2RlKCdwJywge1xuICAgICAgICAgICAgaHRtbDoge31cbiAgICAgICAgfSwgW3dtbF9ydW50aW1lXzEudGV4dChcIlRoaXMgaXMgaW4gdGhlIGRyYXdlclwiKV0sIHZpZXcpXSk7XG59XG5leHBvcnRzLm5hdmlnYXRpb24gPSBuYXZpZ2F0aW9uO1xuZnVuY3Rpb24gY29udGVudCh2aWV3KSB7XG4gICAgcmV0dXJuIHdtbF9ydW50aW1lXzEuYm94KFt3bWxfcnVudGltZV8xLndpZGdldChjb21wb25lbnRzXzEuQWN0aW9uQXJlYSwge1xuICAgICAgICAgICAgaHRtbDoge30sXG4gICAgICAgICAgICB3bWw6IHtcbiAgICAgICAgICAgICAgICAnaWQnOiBcImFjdGlvbnNcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9LCBbd21sX3J1bnRpbWVfMS53aWRnZXQoY29tcG9uZW50c18xLk1lbnVCdXR0b24sIHtcbiAgICAgICAgICAgICAgICBodG1sOiB7fSxcbiAgICAgICAgICAgICAgICB3dzoge1xuICAgICAgICAgICAgICAgICAgICAnb25DbGljayc6IHRoaXMudG9nZ2xlRHJhd2VyLmJpbmQodGhpcylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBbXSwgdmlldyksIHdtbF9ydW50aW1lXzEud2lkZ2V0KGNvbXBvbmVudHNfMS5CdXR0b24sIHtcbiAgICAgICAgICAgICAgICBodG1sOiB7fSxcbiAgICAgICAgICAgICAgICB3bWw6IHtcbiAgICAgICAgICAgICAgICAgICAgJ2lkJzogXCJjcmVhdGVCdXR0b25cIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgd3c6IHtcbiAgICAgICAgICAgICAgICAgICAgJ3N0eWxlJzogXCItZGFuZ2VyXCIsXG4gICAgICAgICAgICAgICAgICAgICd0ZXh0JzogXCJDcmVhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgJ2NsYXNzJzogXCItcmlnaHRcIixcbiAgICAgICAgICAgICAgICAgICAgJ29uQ2xpY2snOiB0aGlzLmNyZWF0ZS5iaW5kKHRoaXMpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgW10sIHZpZXcpXSwgdmlldyksIHdtbF9ydW50aW1lXzEud2lkZ2V0KGNvbXBvbmVudHNfMS5NYWluVmlldywge1xuICAgICAgICAgICAgaHRtbDoge30sXG4gICAgICAgICAgICB3bWw6IHtcbiAgICAgICAgICAgICAgICAnaWQnOiBcIm1haW5cIlxuICAgICAgICAgICAgfVxuICAgICAgICB9LCBbd21sX3J1bnRpbWVfMS53aWRnZXQoY29tcG9uZW50c18yLkNvbnRhaW5lciwge1xuICAgICAgICAgICAgICAgIGh0bWw6IHt9XG4gICAgICAgICAgICB9LCBbd21sX3J1bnRpbWVfMS53aWRnZXQoY29tcG9uZW50c18yLlJvdywge1xuICAgICAgICAgICAgICAgICAgICBodG1sOiB7fVxuICAgICAgICAgICAgICAgIH0sIFt3bWxfcnVudGltZV8xLndpZGdldChjb21wb25lbnRzXzIuQ29sdW1uLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBodG1sOiB7fVxuICAgICAgICAgICAgICAgICAgICB9LCBbd21sX3J1bnRpbWVfMS53aWRnZXQoY29tcG9uZW50c180LlBhbmVsLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDoge30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd3c6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3N0eWxlJzogXCItaW5mb1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgW3dtbF9ydW50aW1lXzEud2lkZ2V0KGNvbXBvbmVudHNfNC5QYW5lbEhlYWRlciwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBodG1sOiB7fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIFt3bWxfcnVudGltZV8xLnRleHQoXCJEZXRhaWxzXCIpXSwgdmlldyksIHdtbF9ydW50aW1lXzEud2lkZ2V0KGNvbXBvbmVudHNfNC5QYW5lbEJvZHksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDoge31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBbd21sX3J1bnRpbWVfMS50ZXh0KFwiUmVjb3JkczpcIildLCB2aWV3KSwgd21sX3J1bnRpbWVfMS53aWRnZXQoY29tcG9uZW50c18zLlRhYmxlLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGh0bWw6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3dzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2ZpZWxkcyc6IHRoaXMuZmllbGRzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2RhdGEnOiB0aGlzLnJlY29yZHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbW9kZWwnOiB0aGlzLnRhYmxlTW9kZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIFtdLCB2aWV3KSwgd21sX3J1bnRpbWVfMS53aWRnZXQoY29tcG9uZW50c180LlBhbmVsRm9vdGVyLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGh0bWw6IHt9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgW3RoaXMucmVjb3Jkcy5yZWR1Y2UoZnVuY3Rpb24gZnVuY3Rpb25fbGl0ZXJhbF83KHAsIGMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwICsgYy5hbW91bnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSwgMCldLCB2aWV3KV0sIHZpZXcpXSwgdmlldyldLCB2aWV3KV0sIHZpZXcpXSwgdmlldyldKTtcbn1cbmV4cG9ydHMuY29udGVudCA9IGNvbnRlbnQ7XG52YXIgTWFpbiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKE1haW4sIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gTWFpbihjb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbnRleHQpIHx8IHRoaXM7XG4gICAgICAgIHZhciB2aWV3ID0gX3RoaXM7XG4gICAgICAgIF90aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHdtbF9ydW50aW1lXzEud2lkZ2V0KGNvbXBvbmVudHNfMS5EcmF3ZXJMYXlvdXQsIHtcbiAgICAgICAgICAgICAgICBodG1sOiB7fSxcbiAgICAgICAgICAgICAgICB3bWw6IHtcbiAgICAgICAgICAgICAgICAgICAgJ2lkJzogXCJsYXlvdXRcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgd3c6IHtcbiAgICAgICAgICAgICAgICAgICAgJ25hdmlnYXRpb24nOiBuYXZpZ2F0aW9uLFxuICAgICAgICAgICAgICAgICAgICAnY29udGVudCc6IGZ1bmN0aW9uIGZ1bmN0aW9uX2xpdGVyYWxfOCh2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29udGVudC5jYWxsKHRoaXMsIHYpO1xuICAgICAgICAgICAgICAgICAgICB9LmJpbmQodGhpcylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBbXSwgdmlldyk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIE1haW47XG59KHdtbF9ydW50aW1lXzEuQXBwVmlldykpO1xuZXhwb3J0cy5NYWluID0gTWFpbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXZpZXcuanMubWFwIl19
