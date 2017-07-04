(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HIDDEN = '--ww-hidden';
exports.DISABLED = '--ww-disabled';
exports.DEFAULT = '--ww-default';
exports.PRIMARY = '--ww-primary';
exports.SUCCESS = '--ww-success';
exports.INFO = '--ww-info';
exports.WARNING = '--ww-warning';
exports.DANGER = '--ww-danger';
exports.LARGE = '--ww-large';
exports.SMALL = '--ww-small';
exports.EXTRA_SMALL = '--ww-extra-small';
exports.DRAWER_LAYOUT = 'ww-drawer-layout';
exports.DRAWER = 'ww-drawer';
exports.DRAWER_CONTENT = 'ww-drawer__content';
exports.DRAWER_PUSHABLE = '--ww-drawer-pushable';
exports.DRAWER_PUSHABLE_FIXED = '--ww-drawer-pushable-fixed';
exports.ACTION_AREA = 'ww-action-area';
exports.ACTION_AREA_CONTENT = 'ww-action-area__content';
exports.MAIN_VIEW = 'ww-main-view';
exports.MENU_BUTTON = 'ww-menu-button';
exports.BUTTON = 'ww-button';
exports.LAYOUT = 'ww-layout';
exports.VISIBLE = 'wat-visible';
exports.ACTIVE = 'wat-active';
exports.DOWN_ARROW = 'arrow-down';
exports.UP_ARROW = 'arrow-up';
exports.LAYOUT_MAIN_CONTENT = 'wat-layout-main-content';
exports.LAYOUT_ACTION_AREA_CONTENT = 'wat-layout-action-area-content';
exports.LAYOUT_BANNER = 'wat-layout-banner';
exports.LAYOUT_BANNER_IMAGE = 'wat-layout-banner-image';
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
exports.SWITCH = 'wat-components-switch';
exports.SWITCH_SLIDER = 'wat-components-switch-slider';

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * combine the members of an array into one string.
 */
exports.combine = function (str, joiner) {
    if (joiner === void 0) { joiner = ' '; }
    return str.join(joiner);
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

},{}],3:[function(require,module,exports){
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
var runtime_1 = require("@quenk/wml/lib/runtime");
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
}(runtime_1.AbstractWidget));
exports.ActionArea = ActionArea;
exports.default = ActionArea;

},{"./wml/action_area":4,"@quenk/wml/lib/runtime":15,"wml-widgets-common/util":2}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Styles = require("wml-widgets-common/Styles");
var util_1 = require("wml-widgets-common/util");
function $$boundary_to_dot(value) {
    return value.split('][').join('.').split('[').join('.');
}
function $$strip_braces(value) {
    return value.split('[').join('.').split(']').join('');
}
function $$escape_dots(value) {
    value = value.split('\'');
    return (value.length < 3) ? value.join('\'') : value.map(function (seg) {
        if (seg.length < 3)
            return seg;
        if ((seg[0] === '.') || (seg[seg.length - 1] === '.'))
            return seg;
        return seg.split('.').join('&&');
    }).join('');
}
function $$unescape_dots(value) {
    return value.split('&&').join('.');
}
function $$partify(value) {
    if (!value)
        return;
    return $$escape_dots($$strip_braces($$boundary_to_dot('' + value))).split('.');
}
function $$property(path, o) {
    var parts = $$partify(path);
    var first;
    if (typeof o !== 'object')
        throw new TypeError('get(): expects an object got ' + typeof o);
    if (parts.length === 1)
        return o[$$unescape_dots(parts[0])];
    if (parts.length === 0)
        return;
    first = o[parts.shift()];
    return ((typeof o === 'object') && (o !== null)) ?
        parts.reduce(function (target, prop) {
            if (target == null)
                return target;
            return target[$$unescape_dots(prop)];
        }, first) : null;
}
function $$adopt(child, e) {
    if (Array.isArray(child))
        return child.forEach(function (innerChild) { return $$adopt(innerChild, e); });
    if (child)
        e.appendChild((typeof child === 'object') ?
            child : document.createTextNode(child == null ? '' : child));
}
/**
 * $$text creates a DOMTextNode
 * @param {string} value
 */
function $$text(value) {
    return document.createTextNode(value == null ? '' : value);
}
/**
 * $$resolve property access expression to avoid
 * thowing errors if it does not exist.
 * @param {object} head
 * @param {string} path
 */
function $$resolve(head, path) {
    var ret = $$property(path, head);
    return (ret == null) ? '' : ret;
}
/**
 * $$node is called to create a regular DOM node
 * @param {string} tag
 * @param {object} attributes
 * @param {array<string|number|Widget>} children
 * @param {View} view
 */
function $$node(tag, attributes, children, view) {
    var e = (tag === 'fragment') ? document.createDocumentFragment() : document.createElement(tag);
    if (typeof attributes.html === 'object')
        Object.keys(attributes.html).forEach(function (key) {
            if (typeof attributes.html[key] === 'function') {
                e[key] = attributes.html[key];
            }
            else {
                e.setAttribute(key, attributes.html[key]);
            }
        });
    children.forEach(function (c) { return $$adopt(c, e); });
    if (attributes.wml)
        if (attributes.wml.id)
            view.register(attributes.wml.id, e);
    return e;
}
/**
 * Attributes provides an API for reading the
 * attributes supplied to an Element.
 * @param {object} attrs
 */
var Attributes = (function () {
    function Attributes(_attrs) {
        this._attrs = _attrs;
        this._attrs = _attrs;
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
        var ret = $$property(path.split(':').join('.'), this._attrs);
        return (ret != null) ? ret : (defaultValue != null) ? defaultValue : '';
    };
    return Attributes;
}());
/**
 * $$widget creates a wml widget.
 * @param {function} Construtor
 * @param {object} attributes
 * @param {array<string|number|Widget>} children
 * @param {View} view
 * @return {Widget}
 */
function $$widget(Constructor, attributes, children, view) {
    var childs = [];
    var w;
    children.forEach(function (child) { return Array.isArray(child) ?
        childs.push.apply(childs, child) : childs.push(child); });
    w = new Constructor(new Attributes(attributes), childs);
    if (attributes.wml)
        if (attributes.wml.id)
            view.register(attributes.wml.id, w);
    view.widgets.push(w);
    return w.render();
}
/**
 * $$if is called to create an if conditional construct
 * @param {*} predicate
 * @param {function} positive
 * @param {function} negative
 */
function $$if(predicate, positive, negative) {
    return (predicate) ? positive() : negative();
}
/**
 * $$for is called to create a for loop construct
 * @param {Iterable} collection
 * @param {function} cb
 */
function $$for(collection, cb) {
    if (Array.isArray(collection)) {
        return collection.map(cb);
    }
    else if (typeof collection === 'object') {
        return Object.keys(collection).map(function (key, _, all) { return cb(collection[key], key, all); });
    }
    return [];
}
/**
 * $$switch simulates a switch statement
 * @param {string|number|boolean} value
 * @param {object} cases
 */
function $$switch(value, cases) {
    var result = cases[value];
    var defaul = cases.default;
    if (result)
        return result;
    if (defaul)
        return defaul;
}
var Main = (function () {
    function Main(context) {
        var view = this;
        this.ids = {};
        this.widgets = [];
        this.tree = null;
        this.context = context;
        this.template = function () {
            return $$node('div', { html: { 'class': util_1.combine([$$resolve(Styles, 'ACTION_AREA'), $$resolve(Styles, 'DRAWER_PUSHABLE_FIXED')]) } }, [$$node('div', { html: { 'class': $$resolve(Styles, 'ACTION_AREA_CONTENT') }, wml: { 'id': "content" } }, [$$resolve(this, 'children')], view)], view);
        };
    }
    Main.render = function (context) {
        return (new Main(context)).render();
    };
    Main.prototype.register = function (id, w) {
        if (this.ids.hasOwnProperty(id))
            throw new Error('Duplicate id \'' + id + '\' detected!');
        this.ids[id] = w;
        return this;
    };
    Main.prototype.findById = function (id) {
        return (this.ids[id]) ? this.ids[id] : null;
    };
    Main.prototype.invalidate = function () {
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
    Main.prototype.render = function () {
        this.ids = {};
        this.widgets.forEach(function (w) { return w.removed(); });
        this.widgets = [];
        this.tree = this.template.call(this.context);
        this.ids['root'] = (this.ids['root']) ? this.ids['root'] : this.tree;
        this.widgets.forEach(function (w) { return w.rendered(); });
        return this.tree;
    };
    return Main;
}());
exports.Main = Main;
exports.default = Main;

},{"wml-widgets-common/Styles":1,"wml-widgets-common/util":2}],5:[function(require,module,exports){
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
var runtime_1 = require("@quenk/wml/lib/runtime");
var button_1 = require("./wml/button");
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
}(runtime_1.AbstractWidget));
exports.Button = Button;
exports.default = Button;

},{"./wml/button":6,"@quenk/wml/lib/runtime":15}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Styles = require("wml-widgets-common/Styles");
var util_1 = require("wml-widgets-common/util");
function $$boundary_to_dot(value) {
    return value.split('][').join('.').split('[').join('.');
}
function $$strip_braces(value) {
    return value.split('[').join('.').split(']').join('');
}
function $$escape_dots(value) {
    value = value.split('\'');
    return (value.length < 3) ? value.join('\'') : value.map(function (seg) {
        if (seg.length < 3)
            return seg;
        if ((seg[0] === '.') || (seg[seg.length - 1] === '.'))
            return seg;
        return seg.split('.').join('&&');
    }).join('');
}
function $$unescape_dots(value) {
    return value.split('&&').join('.');
}
function $$partify(value) {
    if (!value)
        return;
    return $$escape_dots($$strip_braces($$boundary_to_dot('' + value))).split('.');
}
function $$property(path, o) {
    var parts = $$partify(path);
    var first;
    if (typeof o !== 'object')
        throw new TypeError('get(): expects an object got ' + typeof o);
    if (parts.length === 1)
        return o[$$unescape_dots(parts[0])];
    if (parts.length === 0)
        return;
    first = o[parts.shift()];
    return ((typeof o === 'object') && (o !== null)) ?
        parts.reduce(function (target, prop) {
            if (target == null)
                return target;
            return target[$$unescape_dots(prop)];
        }, first) : null;
}
function $$adopt(child, e) {
    if (Array.isArray(child))
        return child.forEach(function (innerChild) { return $$adopt(innerChild, e); });
    if (child)
        e.appendChild((typeof child === 'object') ?
            child : document.createTextNode(child == null ? '' : child));
}
/**
 * $$text creates a DOMTextNode
 * @param {string} value
 */
function $$text(value) {
    return document.createTextNode(value == null ? '' : value);
}
/**
 * $$resolve property access expression to avoid
 * thowing errors if it does not exist.
 * @param {object} head
 * @param {string} path
 */
function $$resolve(head, path) {
    var ret = $$property(path, head);
    return (ret == null) ? '' : ret;
}
/**
 * $$node is called to create a regular DOM node
 * @param {string} tag
 * @param {object} attributes
 * @param {array<string|number|Widget>} children
 * @param {View} view
 */
function $$node(tag, attributes, children, view) {
    var e = (tag === 'fragment') ? document.createDocumentFragment() : document.createElement(tag);
    if (typeof attributes.html === 'object')
        Object.keys(attributes.html).forEach(function (key) {
            if (typeof attributes.html[key] === 'function') {
                e[key] = attributes.html[key];
            }
            else {
                e.setAttribute(key, attributes.html[key]);
            }
        });
    children.forEach(function (c) { return $$adopt(c, e); });
    if (attributes.wml)
        if (attributes.wml.id)
            view.register(attributes.wml.id, e);
    return e;
}
/**
 * Attributes provides an API for reading the
 * attributes supplied to an Element.
 * @param {object} attrs
 */
var Attributes = (function () {
    function Attributes(_attrs) {
        this._attrs = _attrs;
        this._attrs = _attrs;
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
        var ret = $$property(path.split(':').join('.'), this._attrs);
        return (ret != null) ? ret : (defaultValue != null) ? defaultValue : '';
    };
    return Attributes;
}());
/**
 * $$widget creates a wml widget.
 * @param {function} Construtor
 * @param {object} attributes
 * @param {array<string|number|Widget>} children
 * @param {View} view
 * @return {Widget}
 */
function $$widget(Constructor, attributes, children, view) {
    var childs = [];
    var w;
    children.forEach(function (child) { return Array.isArray(child) ?
        childs.push.apply(childs, child) : childs.push(child); });
    w = new Constructor(new Attributes(attributes), childs);
    if (attributes.wml)
        if (attributes.wml.id)
            view.register(attributes.wml.id, w);
    view.widgets.push(w);
    return w.render();
}
/**
 * $$if is called to create an if conditional construct
 * @param {*} predicate
 * @param {function} positive
 * @param {function} negative
 */
function $$if(predicate, positive, negative) {
    return (predicate) ? positive() : negative();
}
/**
 * $$for is called to create a for loop construct
 * @param {Iterable} collection
 * @param {function} cb
 */
function $$for(collection, cb) {
    if (Array.isArray(collection)) {
        return collection.map(cb);
    }
    else if (typeof collection === 'object') {
        return Object.keys(collection).map(function (key, _, all) { return cb(collection[key], key, all); });
    }
    return [];
}
/**
 * $$switch simulates a switch statement
 * @param {string|number|boolean} value
 * @param {object} cases
 */
function $$switch(value, cases) {
    var result = cases[value];
    var defaul = cases.default;
    if (result)
        return result;
    if (defaul)
        return defaul;
}
var Main = (function () {
    function Main(context) {
        var view = this;
        this.ids = {};
        this.widgets = [];
        this.tree = null;
        this.context = context;
        this.template = function () {
            return $$node('fragment', { html: {} }, [$$if(this.attributes.read('ww:href'), function if0() { return [$$node('a', { html: { 'href': this.attributes.read('ww:href'), 'class': util_1.combine([$$resolve(Styles, 'BUTTON'), this.attributes.read('ww:variant', ''), this.attributes.read('ww:size', ''), this.attributes.read('ww:style', $$resolve(Styles, 'DEFAULT'))]), 'onclick': this.attributes.read('ww:onClick', util_1.noop) }, wml: { 'id': "button" } }, [this.attributes.read('ww:text'), $$resolve(this, 'children')], view)]; }.bind(this), function else_clause0() { return [$$node('button', { html: { 'type': this.attributes.read('ww:type', 'button'), 'name': this.attributes.read('ww:name', ''), 'class': util_1.combine([$$resolve(Styles, 'BUTTON'), this.attributes.read('ww:variant', ''), this.attributes.read('ww:size', ''), this.attributes.read('ww:style', $$resolve(Styles, 'DEFAULT'))]), 'onclick': this.attributes.read('ww:onClick', util_1.noop) }, wml: { 'id': "button" } }, [this.attributes.read('ww:text'), $$resolve(this, 'children')], view)]; }.bind(this))], view);
        };
    }
    Main.render = function (context) {
        return (new Main(context)).render();
    };
    Main.prototype.register = function (id, w) {
        if (this.ids.hasOwnProperty(id))
            throw new Error('Duplicate id \'' + id + '\' detected!');
        this.ids[id] = w;
        return this;
    };
    Main.prototype.findById = function (id) {
        return (this.ids[id]) ? this.ids[id] : null;
    };
    Main.prototype.invalidate = function () {
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
    Main.prototype.render = function () {
        this.ids = {};
        this.widgets.forEach(function (w) { return w.removed(); });
        this.widgets = [];
        this.tree = this.template.call(this.context);
        this.ids['root'] = (this.ids['root']) ? this.ids['root'] : this.tree;
        this.widgets.forEach(function (w) { return w.rendered(); });
        return this.tree;
    };
    return Main;
}());
exports.Main = Main;
exports.default = Main;

},{"wml-widgets-common/Styles":1,"wml-widgets-common/util":2}],7:[function(require,module,exports){
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
var runtime_1 = require("@quenk/wml/lib/runtime");
var Styles = require("wml-widgets-common/Styles");
var drawer_layout_1 = require("./wml/drawer-layout");
var util_1 = require("wml-widgets-common/util");
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
    DrawerLayout.prototype.rendered = function () {
        if (window.matchMedia('(max-width: 480px').matches)
            window.addEventListener('click', this);
    };
    DrawerLayout.prototype.handleEvent = function (e) {
        if (e instanceof MouseEvent) {
            var drawer = this.view.findById('drawer');
            var target = e.target;
            if ((target !== drawer) && (!drawer.contains(target)))
                if (!window.document.contains(drawer))
                    window.removeEventListener('click', this);
                else
                    this.hideDrawer();
        }
    };
    return DrawerLayout;
}(runtime_1.AbstractWidget));
exports.DrawerLayout = DrawerLayout;
exports.default = DrawerLayout;

},{"./wml/drawer-layout":8,"@quenk/wml/lib/runtime":15,"wml-widgets-common/Styles":1,"wml-widgets-common/util":2}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Styles = require("wml-widgets-common/Styles");
function $$boundary_to_dot(value) {
    return value.split('][').join('.').split('[').join('.');
}
function $$strip_braces(value) {
    return value.split('[').join('.').split(']').join('');
}
function $$escape_dots(value) {
    value = value.split('\'');
    return (value.length < 3) ? value.join('\'') : value.map(function (seg) {
        if (seg.length < 3)
            return seg;
        if ((seg[0] === '.') || (seg[seg.length - 1] === '.'))
            return seg;
        return seg.split('.').join('&&');
    }).join('');
}
function $$unescape_dots(value) {
    return value.split('&&').join('.');
}
function $$partify(value) {
    if (!value)
        return;
    return $$escape_dots($$strip_braces($$boundary_to_dot('' + value))).split('.');
}
function $$property(path, o) {
    var parts = $$partify(path);
    var first;
    if (typeof o !== 'object')
        throw new TypeError('get(): expects an object got ' + typeof o);
    if (parts.length === 1)
        return o[$$unescape_dots(parts[0])];
    if (parts.length === 0)
        return;
    first = o[parts.shift()];
    return ((typeof o === 'object') && (o !== null)) ?
        parts.reduce(function (target, prop) {
            if (target == null)
                return target;
            return target[$$unescape_dots(prop)];
        }, first) : null;
}
function $$adopt(child, e) {
    if (Array.isArray(child))
        return child.forEach(function (innerChild) { return $$adopt(innerChild, e); });
    if (child)
        e.appendChild((typeof child === 'object') ?
            child : document.createTextNode(child == null ? '' : child));
}
/**
 * $$text creates a DOMTextNode
 * @param {string} value
 */
function $$text(value) {
    return document.createTextNode(value == null ? '' : value);
}
/**
 * $$resolve property access expression to avoid
 * thowing errors if it does not exist.
 * @param {object} head
 * @param {string} path
 */
function $$resolve(head, path) {
    var ret = $$property(path, head);
    return (ret == null) ? '' : ret;
}
/**
 * $$node is called to create a regular DOM node
 * @param {string} tag
 * @param {object} attributes
 * @param {array<string|number|Widget>} children
 * @param {View} view
 */
function $$node(tag, attributes, children, view) {
    var e = (tag === 'fragment') ? document.createDocumentFragment() : document.createElement(tag);
    if (typeof attributes.html === 'object')
        Object.keys(attributes.html).forEach(function (key) {
            if (typeof attributes.html[key] === 'function') {
                e[key] = attributes.html[key];
            }
            else {
                e.setAttribute(key, attributes.html[key]);
            }
        });
    children.forEach(function (c) { return $$adopt(c, e); });
    if (attributes.wml)
        if (attributes.wml.id)
            view.register(attributes.wml.id, e);
    return e;
}
/**
 * Attributes provides an API for reading the
 * attributes supplied to an Element.
 * @param {object} attrs
 */
var Attributes = (function () {
    function Attributes(_attrs) {
        this._attrs = _attrs;
        this._attrs = _attrs;
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
        var ret = $$property(path.split(':').join('.'), this._attrs);
        return (ret != null) ? ret : (defaultValue != null) ? defaultValue : '';
    };
    return Attributes;
}());
/**
 * $$widget creates a wml widget.
 * @param {function} Construtor
 * @param {object} attributes
 * @param {array<string|number|Widget>} children
 * @param {View} view
 * @return {Widget}
 */
function $$widget(Constructor, attributes, children, view) {
    var childs = [];
    var w;
    children.forEach(function (child) { return Array.isArray(child) ?
        childs.push.apply(childs, child) : childs.push(child); });
    w = new Constructor(new Attributes(attributes), childs);
    if (attributes.wml)
        if (attributes.wml.id)
            view.register(attributes.wml.id, w);
    view.widgets.push(w);
    return w.render();
}
/**
 * $$if is called to create an if conditional construct
 * @param {*} predicate
 * @param {function} positive
 * @param {function} negative
 */
function $$if(predicate, positive, negative) {
    return (predicate) ? positive() : negative();
}
/**
 * $$for is called to create a for loop construct
 * @param {Iterable} collection
 * @param {function} cb
 */
function $$for(collection, cb) {
    if (Array.isArray(collection)) {
        return collection.map(cb);
    }
    else if (typeof collection === 'object') {
        return Object.keys(collection).map(function (key, _, all) { return cb(collection[key], key, all); });
    }
    return [];
}
/**
 * $$switch simulates a switch statement
 * @param {string|number|boolean} value
 * @param {object} cases
 */
function $$switch(value, cases) {
    var result = cases[value];
    var defaul = cases.default;
    if (result)
        return result;
    if (defaul)
        return defaul;
}
var Main = (function () {
    function Main(context) {
        var view = this;
        this.ids = {};
        this.widgets = [];
        this.tree = null;
        this.context = context;
        this.template = function () {
            return $$node('div', { html: { 'class': $$resolve(Styles, 'DRAWER_LAYOUT') }, wml: { 'id': "content" } }, [$$node('div', { html: { 'class': $$resolve(Styles, 'DRAWER') }, wml: { 'id': "drawer" } }, [$$node('div', { html: { 'class': $$resolve(Styles, 'DRAWER_CONTENT') } }, [$$if(this.attributes.read('ww:navigation'), function if0() { return [this.attributes.read('ww:navigation').apply(this, [view].concat([]))]; }.bind(this), function () { })], view)], view), $$if(this.attributes.has('ww:content'), function if0() { return [this.attributes.read('ww:content').apply(this, [view].concat([]))]; }.bind(this), function else_clause1() { return [$$resolve(this, 'children')]; }.bind(this))], view);
        };
    }
    Main.render = function (context) {
        return (new Main(context)).render();
    };
    Main.prototype.register = function (id, w) {
        if (this.ids.hasOwnProperty(id))
            throw new Error('Duplicate id \'' + id + '\' detected!');
        this.ids[id] = w;
        return this;
    };
    Main.prototype.findById = function (id) {
        return (this.ids[id]) ? this.ids[id] : null;
    };
    Main.prototype.invalidate = function () {
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
    Main.prototype.render = function () {
        this.ids = {};
        this.widgets.forEach(function (w) { return w.removed(); });
        this.widgets = [];
        this.tree = this.template.call(this.context);
        this.ids['root'] = (this.ids['root']) ? this.ids['root'] : this.tree;
        this.widgets.forEach(function (w) { return w.rendered(); });
        return this.tree;
    };
    return Main;
}());
exports.Main = Main;
exports.default = Main;

},{"wml-widgets-common/Styles":1}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* jshint ignore:start */
/*
export BreadCrumbMenu from './breadcrumbs/BreadCrumbMenu';
export BreadCrumb from './breadcrumbs/BreadCrumb';
export Button from './button/Button';
export Modal from './modal/Modal';
export ModalHeader from './modal/ModalHeader';
export ModalBody from './modal/ModalBody';
export ModalFooter from './modal/ModalFooter';
export Container from './container/Container';
export Column from './column/Column';
export Row from './row/Row';
export Table from './table/Table';
export Autocomplete from './autocomplete/Autocomplete';
export Input from './input/Input';
export Select from './select/Select';
export Switch from './switch/Switch';
export Jumbotron from './jumbotron/Jumbotron';
export Well from './well/Well';
export Panel from './panel/Panel';
export PanelHeader from './panel/Header';
export PanelBody from './panel/Body';
export PanelFooter from './panel/Footer';
export Card from './card/Card';
export CardImage from './card/CardImage';
export CardTitle from './card/CardTitle';
export CardBlock from './card/CardBlock';
export Tab from './tabs/Tab';
export Tabs from './tabs/Tabs';
export ListGroup from './list-group/ListGroup';
export ListGroupItem from './list-group/ListGroupItem';
export Search from './search/Search';
*/
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
/* jshint ignore:end */

},{"./action-area/ActionArea":3,"./button/Button":5,"./drawer-layout/DrawerLayout":7,"./main-view/MainView":10,"./menu-button/MenuButton":12}],10:[function(require,module,exports){
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
var runtime_1 = require("@quenk/wml/lib/runtime");
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
}(runtime_1.AbstractWidget));
exports.MainView = MainView;

},{"./wml/main-view":11,"@quenk/wml/lib/runtime":15,"wml-widgets-common/util":2}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Styles = require("wml-widgets-common/Styles");
var util_1 = require("wml-widgets-common/util");
function $$boundary_to_dot(value) {
    return value.split('][').join('.').split('[').join('.');
}
function $$strip_braces(value) {
    return value.split('[').join('.').split(']').join('');
}
function $$escape_dots(value) {
    value = value.split('\'');
    return (value.length < 3) ? value.join('\'') : value.map(function (seg) {
        if (seg.length < 3)
            return seg;
        if ((seg[0] === '.') || (seg[seg.length - 1] === '.'))
            return seg;
        return seg.split('.').join('&&');
    }).join('');
}
function $$unescape_dots(value) {
    return value.split('&&').join('.');
}
function $$partify(value) {
    if (!value)
        return;
    return $$escape_dots($$strip_braces($$boundary_to_dot('' + value))).split('.');
}
function $$property(path, o) {
    var parts = $$partify(path);
    var first;
    if (typeof o !== 'object')
        throw new TypeError('get(): expects an object got ' + typeof o);
    if (parts.length === 1)
        return o[$$unescape_dots(parts[0])];
    if (parts.length === 0)
        return;
    first = o[parts.shift()];
    return ((typeof o === 'object') && (o !== null)) ?
        parts.reduce(function (target, prop) {
            if (target == null)
                return target;
            return target[$$unescape_dots(prop)];
        }, first) : null;
}
function $$adopt(child, e) {
    if (Array.isArray(child))
        return child.forEach(function (innerChild) { return $$adopt(innerChild, e); });
    if (child)
        e.appendChild((typeof child === 'object') ?
            child : document.createTextNode(child == null ? '' : child));
}
/**
 * $$text creates a DOMTextNode
 * @param {string} value
 */
function $$text(value) {
    return document.createTextNode(value == null ? '' : value);
}
/**
 * $$resolve property access expression to avoid
 * thowing errors if it does not exist.
 * @param {object} head
 * @param {string} path
 */
function $$resolve(head, path) {
    var ret = $$property(path, head);
    return (ret == null) ? '' : ret;
}
/**
 * $$node is called to create a regular DOM node
 * @param {string} tag
 * @param {object} attributes
 * @param {array<string|number|Widget>} children
 * @param {View} view
 */
function $$node(tag, attributes, children, view) {
    var e = (tag === 'fragment') ? document.createDocumentFragment() : document.createElement(tag);
    if (typeof attributes.html === 'object')
        Object.keys(attributes.html).forEach(function (key) {
            if (typeof attributes.html[key] === 'function') {
                e[key] = attributes.html[key];
            }
            else {
                e.setAttribute(key, attributes.html[key]);
            }
        });
    children.forEach(function (c) { return $$adopt(c, e); });
    if (attributes.wml)
        if (attributes.wml.id)
            view.register(attributes.wml.id, e);
    return e;
}
/**
 * Attributes provides an API for reading the
 * attributes supplied to an Element.
 * @param {object} attrs
 */
var Attributes = (function () {
    function Attributes(_attrs) {
        this._attrs = _attrs;
        this._attrs = _attrs;
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
        var ret = $$property(path.split(':').join('.'), this._attrs);
        return (ret != null) ? ret : (defaultValue != null) ? defaultValue : '';
    };
    return Attributes;
}());
/**
 * $$widget creates a wml widget.
 * @param {function} Construtor
 * @param {object} attributes
 * @param {array<string|number|Widget>} children
 * @param {View} view
 * @return {Widget}
 */
function $$widget(Constructor, attributes, children, view) {
    var childs = [];
    var w;
    children.forEach(function (child) { return Array.isArray(child) ?
        childs.push.apply(childs, child) : childs.push(child); });
    w = new Constructor(new Attributes(attributes), childs);
    if (attributes.wml)
        if (attributes.wml.id)
            view.register(attributes.wml.id, w);
    view.widgets.push(w);
    return w.render();
}
/**
 * $$if is called to create an if conditional construct
 * @param {*} predicate
 * @param {function} positive
 * @param {function} negative
 */
function $$if(predicate, positive, negative) {
    return (predicate) ? positive() : negative();
}
/**
 * $$for is called to create a for loop construct
 * @param {Iterable} collection
 * @param {function} cb
 */
function $$for(collection, cb) {
    if (Array.isArray(collection)) {
        return collection.map(cb);
    }
    else if (typeof collection === 'object') {
        return Object.keys(collection).map(function (key, _, all) { return cb(collection[key], key, all); });
    }
    return [];
}
/**
 * $$switch simulates a switch statement
 * @param {string|number|boolean} value
 * @param {object} cases
 */
function $$switch(value, cases) {
    var result = cases[value];
    var defaul = cases.default;
    if (result)
        return result;
    if (defaul)
        return defaul;
}
var Main = (function () {
    function Main(context) {
        var view = this;
        this.ids = {};
        this.widgets = [];
        this.tree = null;
        this.context = context;
        this.template = function () {
            return $$node('div', { html: { 'class': util_1.combine([$$resolve(Styles, 'MAIN_VIEW'), $$resolve(Styles, 'DRAWER_PUSHABLE')]) } }, [$$resolve(this, 'children')], view);
        };
    }
    Main.render = function (context) {
        return (new Main(context)).render();
    };
    Main.prototype.register = function (id, w) {
        if (this.ids.hasOwnProperty(id))
            throw new Error('Duplicate id \'' + id + '\' detected!');
        this.ids[id] = w;
        return this;
    };
    Main.prototype.findById = function (id) {
        return (this.ids[id]) ? this.ids[id] : null;
    };
    Main.prototype.invalidate = function () {
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
    Main.prototype.render = function () {
        this.ids = {};
        this.widgets.forEach(function (w) { return w.removed(); });
        this.widgets = [];
        this.tree = this.template.call(this.context);
        this.ids['root'] = (this.ids['root']) ? this.ids['root'] : this.tree;
        this.widgets.forEach(function (w) { return w.rendered(); });
        return this.tree;
    };
    return Main;
}());
exports.Main = Main;
exports.default = Main;

},{"wml-widgets-common/Styles":1,"wml-widgets-common/util":2}],12:[function(require,module,exports){
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
var runtime_1 = require("@quenk/wml/lib/runtime");
var menu_button_1 = require("./wml/menu_button");
/**
 * MenuButton provides a 'hamburger' menu button.
 */
var MenuButton = (function (_super) {
    __extends(MenuButton, _super);
    function MenuButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new menu_button_1.default(_this);
        return _this;
    }
    return MenuButton;
}(runtime_1.AbstractWidget));
exports.MenuButton = MenuButton;
exports.default = MenuButton;

},{"./wml/menu_button":13,"@quenk/wml/lib/runtime":15}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Style = require("wml-widgets-common/Styles");
var util_1 = require("wml-widgets-common/util");
function $$boundary_to_dot(value) {
    return value.split('][').join('.').split('[').join('.');
}
function $$strip_braces(value) {
    return value.split('[').join('.').split(']').join('');
}
function $$escape_dots(value) {
    value = value.split('\'');
    return (value.length < 3) ? value.join('\'') : value.map(function (seg) {
        if (seg.length < 3)
            return seg;
        if ((seg[0] === '.') || (seg[seg.length - 1] === '.'))
            return seg;
        return seg.split('.').join('&&');
    }).join('');
}
function $$unescape_dots(value) {
    return value.split('&&').join('.');
}
function $$partify(value) {
    if (!value)
        return;
    return $$escape_dots($$strip_braces($$boundary_to_dot('' + value))).split('.');
}
function $$property(path, o) {
    var parts = $$partify(path);
    var first;
    if (typeof o !== 'object')
        throw new TypeError('get(): expects an object got ' + typeof o);
    if (parts.length === 1)
        return o[$$unescape_dots(parts[0])];
    if (parts.length === 0)
        return;
    first = o[parts.shift()];
    return ((typeof o === 'object') && (o !== null)) ?
        parts.reduce(function (target, prop) {
            if (target == null)
                return target;
            return target[$$unescape_dots(prop)];
        }, first) : null;
}
function $$adopt(child, e) {
    if (Array.isArray(child))
        return child.forEach(function (innerChild) { return $$adopt(innerChild, e); });
    if (child)
        e.appendChild((typeof child === 'object') ?
            child : document.createTextNode(child == null ? '' : child));
}
/**
 * $$text creates a DOMTextNode
 * @param {string} value
 */
function $$text(value) {
    return document.createTextNode(value == null ? '' : value);
}
/**
 * $$resolve property access expression to avoid
 * thowing errors if it does not exist.
 * @param {object} head
 * @param {string} path
 */
function $$resolve(head, path) {
    var ret = $$property(path, head);
    return (ret == null) ? '' : ret;
}
/**
 * $$node is called to create a regular DOM node
 * @param {string} tag
 * @param {object} attributes
 * @param {array<string|number|Widget>} children
 * @param {View} view
 */
function $$node(tag, attributes, children, view) {
    var e = (tag === 'fragment') ? document.createDocumentFragment() : document.createElement(tag);
    if (typeof attributes.html === 'object')
        Object.keys(attributes.html).forEach(function (key) {
            if (typeof attributes.html[key] === 'function') {
                e[key] = attributes.html[key];
            }
            else {
                e.setAttribute(key, attributes.html[key]);
            }
        });
    children.forEach(function (c) { return $$adopt(c, e); });
    if (attributes.wml)
        if (attributes.wml.id)
            view.register(attributes.wml.id, e);
    return e;
}
/**
 * Attributes provides an API for reading the
 * attributes supplied to an Element.
 * @param {object} attrs
 */
var Attributes = (function () {
    function Attributes(_attrs) {
        this._attrs = _attrs;
        this._attrs = _attrs;
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
        var ret = $$property(path.split(':').join('.'), this._attrs);
        return (ret != null) ? ret : (defaultValue != null) ? defaultValue : '';
    };
    return Attributes;
}());
/**
 * $$widget creates a wml widget.
 * @param {function} Construtor
 * @param {object} attributes
 * @param {array<string|number|Widget>} children
 * @param {View} view
 * @return {Widget}
 */
function $$widget(Constructor, attributes, children, view) {
    var childs = [];
    var w;
    children.forEach(function (child) { return Array.isArray(child) ?
        childs.push.apply(childs, child) : childs.push(child); });
    w = new Constructor(new Attributes(attributes), childs);
    if (attributes.wml)
        if (attributes.wml.id)
            view.register(attributes.wml.id, w);
    view.widgets.push(w);
    return w.render();
}
/**
 * $$if is called to create an if conditional construct
 * @param {*} predicate
 * @param {function} positive
 * @param {function} negative
 */
function $$if(predicate, positive, negative) {
    return (predicate) ? positive() : negative();
}
/**
 * $$for is called to create a for loop construct
 * @param {Iterable} collection
 * @param {function} cb
 */
function $$for(collection, cb) {
    if (Array.isArray(collection)) {
        return collection.map(cb);
    }
    else if (typeof collection === 'object') {
        return Object.keys(collection).map(function (key, _, all) { return cb(collection[key], key, all); });
    }
    return [];
}
/**
 * $$switch simulates a switch statement
 * @param {string|number|boolean} value
 * @param {object} cases
 */
function $$switch(value, cases) {
    var result = cases[value];
    var defaul = cases.default;
    if (result)
        return result;
    if (defaul)
        return defaul;
}
var Main = (function () {
    function Main(context) {
        var view = this;
        this.ids = {};
        this.widgets = [];
        this.tree = null;
        this.context = context;
        this.template = function () {
            return $$node('button', { html: { 'class': $$resolve(Style, 'MENU_BUTTON'), 'onclick': this.attributes.read('ww:onClick', util_1.noop) } }, [$$node('span', { html: { 'class': "" } }, [], view), $$node('span', { html: { 'class': "" } }, [], view), $$node('span', { html: { 'class': "" } }, [], view)], view);
        };
    }
    Main.render = function (context) {
        return (new Main(context)).render();
    };
    Main.prototype.register = function (id, w) {
        if (this.ids.hasOwnProperty(id))
            throw new Error('Duplicate id \'' + id + '\' detected!');
        this.ids[id] = w;
        return this;
    };
    Main.prototype.findById = function (id) {
        return (this.ids[id]) ? this.ids[id] : null;
    };
    Main.prototype.invalidate = function () {
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
    Main.prototype.render = function () {
        this.ids = {};
        this.widgets.forEach(function (w) { return w.removed(); });
        this.widgets = [];
        this.tree = this.template.call(this.context);
        this.ids['root'] = (this.ids['root']) ? this.ids['root'] : this.tree;
        this.widgets.forEach(function (w) { return w.rendered(); });
        return this.tree;
    };
    return Main;
}());
exports.Main = Main;
exports.default = Main;

},{"wml-widgets-common/Styles":1,"wml-widgets-common/util":2}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * AbstractWidget
 */
var AbstractWidget = function () {
  function AbstractWidget(attrs, children) {
    _classCallCheck(this, AbstractWidget);

    this.attributes = attrs;
    this.children = children;
    this.view = null;
  }

  _createClass(AbstractWidget, [{
    key: "rendered",
    value: function rendered() {}
  }, {
    key: "removed",
    value: function removed() {}
  }, {
    key: "render",
    value: function render() {

      return this.view.render();
    }
  }]);

  return AbstractWidget;
}();

exports.default = AbstractWidget;

},{}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AbstractWidget = undefined;

var _AbstractWidget2 = require('./AbstractWidget');

var _AbstractWidget3 = _interopRequireDefault(_AbstractWidget2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.AbstractWidget = _AbstractWidget3.default;
/*jshint ignore:end */
/*jshint ignore:start */

},{"./AbstractWidget":14}],16:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var view_1 = require("./view");
;
var Application = (function () {
    function Application() {
        this.records = [{ name: 'Jozain Huldum', amount: 32000 }];
        this.view = new view_1.Main(this);
    }
    Application.prototype.toggleDrawer = function () {
        this.view.findById('layout').toggleDrawer();
    };
    Application.prototype.create = function () {
        this.records.push({
            name: prompt('Enter the name'),
            amount: parseFloat(prompt('Enter the amount.'))
        });
        this.view.invalidate();
    };
    Application.prototype.run = function () {
        window.app = this;
        document.getElementById('main').appendChild(this.view.render());
        this.drawer = this.view.findById('layout');
    };
    Application.main = function () {
        return (new this()).run();
    };
    return Application;
}());
describe('Application', function () {
    it('should render', function () {
        Application.main();
    });
});

},{"./view":17}],17:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var components_1 = require("@quenk/wml-widgets/lib/components");
function $$boundary_to_dot(value) {
    return value.split('][').join('.').split('[').join('.');
}
function $$strip_braces(value) {
    return value.split('[').join('.').split(']').join('');
}
function $$escape_dots(value) {
    value = value.split('\'');
    return (value.length < 3) ? value.join('\'') : value.map(function (seg) {
        if (seg.length < 3)
            return seg;
        if ((seg[0] === '.') || (seg[seg.length - 1] === '.'))
            return seg;
        return seg.split('.').join('&&');
    }).join('');
}
function $$unescape_dots(value) {
    return value.split('&&').join('.');
}
function $$partify(value) {
    if (!value)
        return;
    return $$escape_dots($$strip_braces($$boundary_to_dot('' + value))).split('.');
}
function $$property(path, o) {
    var parts = $$partify(path);
    var first;
    if (typeof o !== 'object')
        throw new TypeError('get(): expects an object got ' + typeof o);
    if (parts.length === 1)
        return o[$$unescape_dots(parts[0])];
    if (parts.length === 0)
        return;
    first = o[parts.shift()];
    return ((typeof o === 'object') && (o !== null)) ?
        parts.reduce(function (target, prop) {
            if (target == null)
                return target;
            return target[$$unescape_dots(prop)];
        }, first) : null;
}
function $$adopt(child, e) {
    if (Array.isArray(child))
        return child.forEach(function (innerChild) { return $$adopt(innerChild, e); });
    if (child)
        e.appendChild((typeof child === 'object') ?
            child : document.createTextNode(child == null ? '' : child));
}
/**
 * $$text creates a DOMTextNode
 * @param {string} value
 */
function $$text(value) {
    return document.createTextNode(value == null ? '' : value);
}
/**
 * $$resolve property access expression to avoid
 * thowing errors if it does not exist.
 * @param {object} head
 * @param {string} path
 */
function $$resolve(head, path) {
    var ret = $$property(path, head);
    return (ret == null) ? '' : ret;
}
/**
 * $$node is called to create a regular DOM node
 * @param {string} tag
 * @param {object} attributes
 * @param {array<string|number|Widget>} children
 * @param {View} view
 */
function $$node(tag, attributes, children, view) {
    var e = (tag === 'fragment') ? document.createDocumentFragment() : document.createElement(tag);
    if (typeof attributes.html === 'object')
        Object.keys(attributes.html).forEach(function (key) {
            if (typeof attributes.html[key] === 'function') {
                e[key] = attributes.html[key];
            }
            else {
                e.setAttribute(key, attributes.html[key]);
            }
        });
    children.forEach(function (c) { return $$adopt(c, e); });
    if (attributes.wml)
        if (attributes.wml.id)
            view.register(attributes.wml.id, e);
    return e;
}
/**
 * Attributes provides an API for reading the
 * attributes supplied to an Element.
 * @param {object} attrs
 */
var Attributes = (function () {
    function Attributes(_attrs) {
        this._attrs = _attrs;
        this._attrs = _attrs;
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
        var ret = $$property(path.split(':').join('.'), this._attrs);
        return (ret != null) ? ret : (defaultValue != null) ? defaultValue : '';
    };
    return Attributes;
}());
/**
 * $$widget creates a wml widget.
 * @param {function} Construtor
 * @param {object} attributes
 * @param {array<string|number|Widget>} children
 * @param {View} view
 * @return {Widget}
 */
function $$widget(Constructor, attributes, children, view) {
    var childs = [];
    var w;
    children.forEach(function (child) { return Array.isArray(child) ?
        childs.push.apply(childs, child) : childs.push(child); });
    w = new Constructor(new Attributes(attributes), childs);
    if (attributes.wml)
        if (attributes.wml.id)
            view.register(attributes.wml.id, w);
    view.widgets.push(w);
    return w.render();
}
/**
 * $$if is called to create an if conditional construct
 * @param {*} predicate
 * @param {function} positive
 * @param {function} negative
 */
function $$if(predicate, positive, negative) {
    return (predicate) ? positive() : negative();
}
/**
 * $$for is called to create a for loop construct
 * @param {Iterable} collection
 * @param {function} cb
 */
function $$for(collection, cb) {
    if (Array.isArray(collection)) {
        return collection.map(cb);
    }
    else if (typeof collection === 'object') {
        return Object.keys(collection).map(function (key, _, all) { return cb(collection[key], key, all); });
    }
    return [];
}
/**
 * $$switch simulates a switch statement
 * @param {string|number|boolean} value
 * @param {object} cases
 */
function $$switch(value, cases) {
    var result = cases[value];
    var defaul = cases["default"];
    if (result)
        return result;
    if (defaul)
        return defaul;
}
function navigation(view) {
    return $$node('p', {
        html: {}
    }, [$$text("This is in the drawer")], view);
}
exports.navigation = navigation;
function content(view) {
    return $$node('fragment', {
        html: {}
    }, [$$widget(components_1.ActionArea, {
            html: {},
            wml: {
                'id': "actions"
            }
        }, [$$widget(components_1.MenuButton, {
                html: {},
                ww: {
                    'onClick': this.toggleDrawer.bind(this)
                }
            }, [], view), $$widget(components_1.Button, {
                html: {},
                wml: {
                    'id': "createButton"
                },
                ww: {
                    'style': "--ww-danger",
                    'text': "Create",
                    'onClick': this.create.bind(this)
                }
            }, [], view)], view), $$widget(components_1.MainView, {
            html: {},
            wml: {
                'id': "main"
            }
        }, [$$node('table', {
                html: {
                    'class': "table table-stripe table-bordered"
                }
            }, [$$node('thead', {
                    html: {}
                }, [$$node('tr', {
                        html: {}
                    }, [$$node('th', {
                            html: {}
                        }, [$$text("Number")], view), $$node('th', {
                            html: {}
                        }, [$$text("Name")], view), $$node('th', {
                            html: {}
                        }, [$$text("Amount")], view)], view)], view), $$node('tbody', {
                    html: {}
                }, [$$for($$resolve(this, 'records'), function for_1(record, number, array) {
                        return [$$node('tr', {
                                html: {}
                            }, [$$node('td', {
                                    html: {}
                                }, [number], view), $$node('td', {
                                    html: {}
                                }, [$$resolve(record, 'name')], view), $$node('td', {
                                    html: {}
                                }, [$$resolve(record, 'amount')], view)], view)];
                    }.bind(this))], view)], view)], view)], view);
}
exports.content = content;
var Main = (function () {
    function Main(context) {
        var view = this;
        this.ids = {};
        this.widgets = [];
        this.tree = null;
        this.context = context;
        this.template = function () {
            return $$widget(components_1.DrawerLayout, {
                html: {},
                wml: {
                    'id': "layout"
                },
                ww: {
                    'navigation': navigation,
                    'content': function function_literal_1(v) {
                        return content.call(this, v);
                    }.bind(this)
                }
            }, [], view);
        };
    }
    Main.render = function (context) {
        return (new Main(context)).render();
    };
    Main.prototype.register = function (id, w) {
        if (this.ids.hasOwnProperty(id))
            throw new Error('Duplicate id \'' + id + '\' detected!');
        this.ids[id] = w;
        return this;
    };
    Main.prototype.findById = function (id) {
        return (this.ids[id]) ? this.ids[id] : null;
    };
    Main.prototype.invalidate = function () {
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
    Main.prototype.render = function () {
        this.ids = {};
        this.widgets.forEach(function (w) { return w.removed(); });
        this.widgets = [];
        this.tree = this.template.call(this.context);
        this.ids['root'] = (this.ids['root']) ? this.ids['root'] : this.tree;
        this.widgets.forEach(function (w) { return w.rendered(); });
        return this.tree;
    };
    return Main;
}());
exports.Main = Main;
exports["default"] = Main;

},{"@quenk/wml-widgets/lib/components":9}]},{},[16])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJsaWIvY29tcG9uZW50cy93bWwtd2lkZ2V0cy1jb21tb24vU3R5bGVzLmpzIiwibGliL2NvbXBvbmVudHMvd21sLXdpZGdldHMtY29tbW9uL3V0aWwuanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL2FjdGlvbi1hcmVhL0FjdGlvbkFyZWEuanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL2FjdGlvbi1hcmVhL3dtbC9hY3Rpb25fYXJlYS5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvYnV0dG9uL0J1dHRvbi5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvYnV0dG9uL3dtbC9idXR0b24uanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL2RyYXdlci1sYXlvdXQvRHJhd2VyTGF5b3V0LmpzIiwibm9kZV9tb2R1bGVzL0BxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50cy9kcmF3ZXItbGF5b3V0L3dtbC9kcmF3ZXItbGF5b3V0LmpzIiwibm9kZV9tb2R1bGVzL0BxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50cy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvbWFpbi12aWV3L01haW5WaWV3LmpzIiwibm9kZV9tb2R1bGVzL0BxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50cy9tYWluLXZpZXcvd21sL21haW4tdmlldy5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvbWVudS1idXR0b24vTWVudUJ1dHRvbi5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvbWVudS1idXR0b24vd21sL21lbnVfYnV0dG9uLmpzIiwibm9kZV9tb2R1bGVzL0BxdWVuay93bWwvc3JjL3J1bnRpbWUvQWJzdHJhY3RXaWRnZXQuanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC9zcmMvcnVudGltZS9pbmRleC5qcyIsInRlc3QvYXBwL2FwcC5qcyIsInRlc3QvYXBwL3ZpZXcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbk9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcE9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNwT0E7OztJQUdNLGM7QUFFSiwwQkFBWSxLQUFaLEVBQW1CLFFBQW5CLEVBQTZCO0FBQUE7O0FBRTNCLFNBQUssVUFBTCxHQUFrQixLQUFsQjtBQUNBLFNBQUssUUFBTCxHQUFnQixRQUFoQjtBQUNBLFNBQUssSUFBTCxHQUFZLElBQVo7QUFFRDs7OzsrQkFFVSxDQUVWOzs7OEJBRVMsQ0FFVDs7OzZCQUVROztBQUVQLGFBQU8sS0FBSyxJQUFMLENBQVUsTUFBVixFQUFQO0FBRUQ7Ozs7OztrQkFJWSxjOzs7Ozs7Ozs7Ozs7Ozs7O1FDNUJSLGM7QUFDUDtBQUZBOzs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5ISURERU4gPSAnLS13dy1oaWRkZW4nO1xuZXhwb3J0cy5ESVNBQkxFRCA9ICctLXd3LWRpc2FibGVkJztcbmV4cG9ydHMuREVGQVVMVCA9ICctLXd3LWRlZmF1bHQnO1xuZXhwb3J0cy5QUklNQVJZID0gJy0td3ctcHJpbWFyeSc7XG5leHBvcnRzLlNVQ0NFU1MgPSAnLS13dy1zdWNjZXNzJztcbmV4cG9ydHMuSU5GTyA9ICctLXd3LWluZm8nO1xuZXhwb3J0cy5XQVJOSU5HID0gJy0td3ctd2FybmluZyc7XG5leHBvcnRzLkRBTkdFUiA9ICctLXd3LWRhbmdlcic7XG5leHBvcnRzLkxBUkdFID0gJy0td3ctbGFyZ2UnO1xuZXhwb3J0cy5TTUFMTCA9ICctLXd3LXNtYWxsJztcbmV4cG9ydHMuRVhUUkFfU01BTEwgPSAnLS13dy1leHRyYS1zbWFsbCc7XG5leHBvcnRzLkRSQVdFUl9MQVlPVVQgPSAnd3ctZHJhd2VyLWxheW91dCc7XG5leHBvcnRzLkRSQVdFUiA9ICd3dy1kcmF3ZXInO1xuZXhwb3J0cy5EUkFXRVJfQ09OVEVOVCA9ICd3dy1kcmF3ZXJfX2NvbnRlbnQnO1xuZXhwb3J0cy5EUkFXRVJfUFVTSEFCTEUgPSAnLS13dy1kcmF3ZXItcHVzaGFibGUnO1xuZXhwb3J0cy5EUkFXRVJfUFVTSEFCTEVfRklYRUQgPSAnLS13dy1kcmF3ZXItcHVzaGFibGUtZml4ZWQnO1xuZXhwb3J0cy5BQ1RJT05fQVJFQSA9ICd3dy1hY3Rpb24tYXJlYSc7XG5leHBvcnRzLkFDVElPTl9BUkVBX0NPTlRFTlQgPSAnd3ctYWN0aW9uLWFyZWFfX2NvbnRlbnQnO1xuZXhwb3J0cy5NQUlOX1ZJRVcgPSAnd3ctbWFpbi12aWV3JztcbmV4cG9ydHMuTUVOVV9CVVRUT04gPSAnd3ctbWVudS1idXR0b24nO1xuZXhwb3J0cy5CVVRUT04gPSAnd3ctYnV0dG9uJztcbmV4cG9ydHMuTEFZT1VUID0gJ3d3LWxheW91dCc7XG5leHBvcnRzLlZJU0lCTEUgPSAnd2F0LXZpc2libGUnO1xuZXhwb3J0cy5BQ1RJVkUgPSAnd2F0LWFjdGl2ZSc7XG5leHBvcnRzLkRPV05fQVJST1cgPSAnYXJyb3ctZG93bic7XG5leHBvcnRzLlVQX0FSUk9XID0gJ2Fycm93LXVwJztcbmV4cG9ydHMuTEFZT1VUX01BSU5fQ09OVEVOVCA9ICd3YXQtbGF5b3V0LW1haW4tY29udGVudCc7XG5leHBvcnRzLkxBWU9VVF9BQ1RJT05fQVJFQV9DT05URU5UID0gJ3dhdC1sYXlvdXQtYWN0aW9uLWFyZWEtY29udGVudCc7XG5leHBvcnRzLkxBWU9VVF9CQU5ORVIgPSAnd2F0LWxheW91dC1iYW5uZXInO1xuZXhwb3J0cy5MQVlPVVRfQkFOTkVSX0lNQUdFID0gJ3dhdC1sYXlvdXQtYmFubmVyLWltYWdlJztcbmV4cG9ydHMuTEFZT1VUX0RSQVdFUl9OQVZJR0FUSU9OID0gJ3dhdC1sYXlvdXQtZHJhd2VyLW5hdmlnYXRpb24nO1xuZXhwb3J0cy5MQVlPVVRfRFJBV0VSX05BVklHQVRJT05fVElUTEUgPSAnd2F0LWxheW91dC1kcmF3ZXItbmF2aWdhdGlvbi10aXRsZSc7XG5leHBvcnRzLkxBWU9VVF9BQ0NPVU5UX0FSRUEgPSAnd2F0LWxheW91dC1hY2NvdW50LWFyZWEnO1xuZXhwb3J0cy5MQVlPVVRfQUNDT1VOVF9BUkVBX1RJVExFID0gJ3dhdC1sYXlvdXQtYWNjb3VudC1hcmVhLXRpdGxlJztcbmV4cG9ydHMuTEFZT1VUX0FDQ09VTlRfQVJFQV9UT0dHTEUgPSAnd2F0LWxheW91dC1hY2NvdW50LWFyZWEtdG9nZ2xlJztcbmV4cG9ydHMuTEFZT1VUX05PVElGSUNBVElPTiA9ICd3YXQtbGF5b3V0LW5vdGlmaWNhdGlvbic7XG5leHBvcnRzLkxBWU9VVF9PVkVSTEFZID0gJ3dheS1sYXlvdXQtb3ZlcmxheSc7XG5leHBvcnRzLkFVVE9DT01QTEVURSA9ICd3YXQta2l0LWF1dG9jb21wbGV0ZSc7XG5leHBvcnRzLkFVVE9DT01QTEVURV9DT05UQUlORVIgPSAnd2F0LWtpdC1hdXRvY29tcGxldGUtY29udGFpbmVyJztcbmV4cG9ydHMuQVVUT0NPTVBMRVRFX0lOUFVUX0FSRUEgPSAnd2F0LWtpdC1hdXRvY29tcGxldGUtaW5wdXQtYXJlYSc7XG5leHBvcnRzLkFVVE9DT01QTEVURV9JTlBVVCA9ICd3YXQta2l0LWF1dG9jb21wbGV0ZS1pbnB1dCc7XG5leHBvcnRzLkFVVE9DT01QTEVURV9PUFRJT05TID0gJ3dhdC1raXQtYXV0b2NvbXBsZXRlLW9wdGlvbnMnO1xuZXhwb3J0cy5BVVRPQ09NUExFVEVfSVRFTV9XUkFQUEVSID0gJ3dhdC1raXQtYXV0by1jb21wbGV0ZS1pdGVtLXdyYXBwZXInO1xuZXhwb3J0cy5TV0lUQ0ggPSAnd2F0LWNvbXBvbmVudHMtc3dpdGNoJztcbmV4cG9ydHMuU1dJVENIX1NMSURFUiA9ICd3YXQtY29tcG9uZW50cy1zd2l0Y2gtc2xpZGVyJztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVN0eWxlcy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogY29tYmluZSB0aGUgbWVtYmVycyBvZiBhbiBhcnJheSBpbnRvIG9uZSBzdHJpbmcuXG4gKi9cbmV4cG9ydHMuY29tYmluZSA9IGZ1bmN0aW9uIChzdHIsIGpvaW5lcikge1xuICAgIGlmIChqb2luZXIgPT09IHZvaWQgMCkgeyBqb2luZXIgPSAnICc7IH1cbiAgICByZXR1cm4gc3RyLmpvaW4oam9pbmVyKTtcbn07XG4vKipcbiAqIG5vb3BcbiAqL1xuZXhwb3J0cy5ub29wID0gZnVuY3Rpb24gKCkgeyB9O1xuLyoqXG4gKiByZWFkIGEgdmFsdWUgZnJvbSB0aGUgY29udGV4dCBhdHRyaWJ1dGVzXG4gKi9cbmV4cG9ydHMucmVhZCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgXyA9IFtdO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIF9bX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuYXR0cmlidXRlcy5yZWFkLmFwcGx5KHRoaXMuYXR0cmlidXRlcywgYXJndW1lbnRzKTtcbn07XG4vKipcbiAqIHJlcGxhY2VDb250ZW50XG4gKi9cbmV4cG9ydHMucmVwbGFjZUNvbnRlbnQgPSBmdW5jdGlvbiAociwgbm9kZSkge1xuICAgIHdoaWxlIChub2RlLmxhc3RDaGlsZClcbiAgICAgICAgbm9kZS5yZW1vdmVDaGlsZChub2RlLmxhc3RDaGlsZCk7XG4gICAgbm9kZS5hcHBlbmRDaGlsZChyLnJlbmRlcigpKTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD11dGlsLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgdXRpbF8xID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi91dGlsXCIpO1xudmFyIHJ1bnRpbWVfMSA9IHJlcXVpcmUoXCJAcXVlbmsvd21sL2xpYi9ydW50aW1lXCIpO1xudmFyIGFjdGlvbl9hcmVhXzEgPSByZXF1aXJlKFwiLi93bWwvYWN0aW9uX2FyZWFcIik7XG4vKipcbiAqIEFjdGlvbkFyZWFcbiAqL1xudmFyIEFjdGlvbkFyZWEgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhBY3Rpb25BcmVhLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEFjdGlvbkFyZWEoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IGFjdGlvbl9hcmVhXzEuTWFpbihfdGhpcyk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogc2V0Q29udGVudCByZXBsYWNlcyB0aGUgY29udGVudCBvZiB0aGlzIHZpZXcuXG4gICAgICovXG4gICAgQWN0aW9uQXJlYS5wcm90b3R5cGUuc2V0Q29udGVudCA9IGZ1bmN0aW9uIChyKSB7XG4gICAgICAgIHV0aWxfMS5yZXBsYWNlQ29udGVudChyLCB0aGlzLnZpZXcuZmluZEJ5SWQoJ2NvbnRlbnQnKSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgcmV0dXJuIEFjdGlvbkFyZWE7XG59KHJ1bnRpbWVfMS5BYnN0cmFjdFdpZGdldCkpO1xuZXhwb3J0cy5BY3Rpb25BcmVhID0gQWN0aW9uQXJlYTtcbmV4cG9ydHMuZGVmYXVsdCA9IEFjdGlvbkFyZWE7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1BY3Rpb25BcmVhLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIFN0eWxlcyA9IHJlcXVpcmUoXCJ3bWwtd2lkZ2V0cy1jb21tb24vU3R5bGVzXCIpO1xudmFyIHV0aWxfMSA9IHJlcXVpcmUoXCJ3bWwtd2lkZ2V0cy1jb21tb24vdXRpbFwiKTtcbmZ1bmN0aW9uICQkYm91bmRhcnlfdG9fZG90KHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlLnNwbGl0KCddWycpLmpvaW4oJy4nKS5zcGxpdCgnWycpLmpvaW4oJy4nKTtcbn1cbmZ1bmN0aW9uICQkc3RyaXBfYnJhY2VzKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlLnNwbGl0KCdbJykuam9pbignLicpLnNwbGl0KCddJykuam9pbignJyk7XG59XG5mdW5jdGlvbiAkJGVzY2FwZV9kb3RzKHZhbHVlKSB7XG4gICAgdmFsdWUgPSB2YWx1ZS5zcGxpdCgnXFwnJyk7XG4gICAgcmV0dXJuICh2YWx1ZS5sZW5ndGggPCAzKSA/IHZhbHVlLmpvaW4oJ1xcJycpIDogdmFsdWUubWFwKGZ1bmN0aW9uIChzZWcpIHtcbiAgICAgICAgaWYgKHNlZy5sZW5ndGggPCAzKVxuICAgICAgICAgICAgcmV0dXJuIHNlZztcbiAgICAgICAgaWYgKChzZWdbMF0gPT09ICcuJykgfHwgKHNlZ1tzZWcubGVuZ3RoIC0gMV0gPT09ICcuJykpXG4gICAgICAgICAgICByZXR1cm4gc2VnO1xuICAgICAgICByZXR1cm4gc2VnLnNwbGl0KCcuJykuam9pbignJiYnKTtcbiAgICB9KS5qb2luKCcnKTtcbn1cbmZ1bmN0aW9uICQkdW5lc2NhcGVfZG90cyh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZS5zcGxpdCgnJiYnKS5qb2luKCcuJyk7XG59XG5mdW5jdGlvbiAkJHBhcnRpZnkodmFsdWUpIHtcbiAgICBpZiAoIXZhbHVlKVxuICAgICAgICByZXR1cm47XG4gICAgcmV0dXJuICQkZXNjYXBlX2RvdHMoJCRzdHJpcF9icmFjZXMoJCRib3VuZGFyeV90b19kb3QoJycgKyB2YWx1ZSkpKS5zcGxpdCgnLicpO1xufVxuZnVuY3Rpb24gJCRwcm9wZXJ0eShwYXRoLCBvKSB7XG4gICAgdmFyIHBhcnRzID0gJCRwYXJ0aWZ5KHBhdGgpO1xuICAgIHZhciBmaXJzdDtcbiAgICBpZiAodHlwZW9mIG8gIT09ICdvYmplY3QnKVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdnZXQoKTogZXhwZWN0cyBhbiBvYmplY3QgZ290ICcgKyB0eXBlb2Ygbyk7XG4gICAgaWYgKHBhcnRzLmxlbmd0aCA9PT0gMSlcbiAgICAgICAgcmV0dXJuIG9bJCR1bmVzY2FwZV9kb3RzKHBhcnRzWzBdKV07XG4gICAgaWYgKHBhcnRzLmxlbmd0aCA9PT0gMClcbiAgICAgICAgcmV0dXJuO1xuICAgIGZpcnN0ID0gb1twYXJ0cy5zaGlmdCgpXTtcbiAgICByZXR1cm4gKCh0eXBlb2YgbyA9PT0gJ29iamVjdCcpICYmIChvICE9PSBudWxsKSkgP1xuICAgICAgICBwYXJ0cy5yZWR1Y2UoZnVuY3Rpb24gKHRhcmdldCwgcHJvcCkge1xuICAgICAgICAgICAgaWYgKHRhcmdldCA9PSBudWxsKVxuICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgICAgICAgICByZXR1cm4gdGFyZ2V0WyQkdW5lc2NhcGVfZG90cyhwcm9wKV07XG4gICAgICAgIH0sIGZpcnN0KSA6IG51bGw7XG59XG5mdW5jdGlvbiAkJGFkb3B0KGNoaWxkLCBlKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoY2hpbGQpKVxuICAgICAgICByZXR1cm4gY2hpbGQuZm9yRWFjaChmdW5jdGlvbiAoaW5uZXJDaGlsZCkgeyByZXR1cm4gJCRhZG9wdChpbm5lckNoaWxkLCBlKTsgfSk7XG4gICAgaWYgKGNoaWxkKVxuICAgICAgICBlLmFwcGVuZENoaWxkKCh0eXBlb2YgY2hpbGQgPT09ICdvYmplY3QnKSA/XG4gICAgICAgICAgICBjaGlsZCA6IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNoaWxkID09IG51bGwgPyAnJyA6IGNoaWxkKSk7XG59XG4vKipcbiAqICQkdGV4dCBjcmVhdGVzIGEgRE9NVGV4dE5vZGVcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICovXG5mdW5jdGlvbiAkJHRleHQodmFsdWUpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodmFsdWUgPT0gbnVsbCA/ICcnIDogdmFsdWUpO1xufVxuLyoqXG4gKiAkJHJlc29sdmUgcHJvcGVydHkgYWNjZXNzIGV4cHJlc3Npb24gdG8gYXZvaWRcbiAqIHRob3dpbmcgZXJyb3JzIGlmIGl0IGRvZXMgbm90IGV4aXN0LlxuICogQHBhcmFtIHtvYmplY3R9IGhlYWRcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoXG4gKi9cbmZ1bmN0aW9uICQkcmVzb2x2ZShoZWFkLCBwYXRoKSB7XG4gICAgdmFyIHJldCA9ICQkcHJvcGVydHkocGF0aCwgaGVhZCk7XG4gICAgcmV0dXJuIChyZXQgPT0gbnVsbCkgPyAnJyA6IHJldDtcbn1cbi8qKlxuICogJCRub2RlIGlzIGNhbGxlZCB0byBjcmVhdGUgYSByZWd1bGFyIERPTSBub2RlXG4gKiBAcGFyYW0ge3N0cmluZ30gdGFnXG4gKiBAcGFyYW0ge29iamVjdH0gYXR0cmlidXRlc1xuICogQHBhcmFtIHthcnJheTxzdHJpbmd8bnVtYmVyfFdpZGdldD59IGNoaWxkcmVuXG4gKiBAcGFyYW0ge1ZpZXd9IHZpZXdcbiAqL1xuZnVuY3Rpb24gJCRub2RlKHRhZywgYXR0cmlidXRlcywgY2hpbGRyZW4sIHZpZXcpIHtcbiAgICB2YXIgZSA9ICh0YWcgPT09ICdmcmFnbWVudCcpID8gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpIDogZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xuICAgIGlmICh0eXBlb2YgYXR0cmlidXRlcy5odG1sID09PSAnb2JqZWN0JylcbiAgICAgICAgT2JqZWN0LmtleXMoYXR0cmlidXRlcy5odG1sKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgYXR0cmlidXRlcy5odG1sW2tleV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBlW2tleV0gPSBhdHRyaWJ1dGVzLmh0bWxba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGUuc2V0QXR0cmlidXRlKGtleSwgYXR0cmlidXRlcy5odG1sW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICBjaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChjKSB7IHJldHVybiAkJGFkb3B0KGMsIGUpOyB9KTtcbiAgICBpZiAoYXR0cmlidXRlcy53bWwpXG4gICAgICAgIGlmIChhdHRyaWJ1dGVzLndtbC5pZClcbiAgICAgICAgICAgIHZpZXcucmVnaXN0ZXIoYXR0cmlidXRlcy53bWwuaWQsIGUpO1xuICAgIHJldHVybiBlO1xufVxuLyoqXG4gKiBBdHRyaWJ1dGVzIHByb3ZpZGVzIGFuIEFQSSBmb3IgcmVhZGluZyB0aGVcbiAqIGF0dHJpYnV0ZXMgc3VwcGxpZWQgdG8gYW4gRWxlbWVudC5cbiAqIEBwYXJhbSB7b2JqZWN0fSBhdHRyc1xuICovXG52YXIgQXR0cmlidXRlcyA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQXR0cmlidXRlcyhfYXR0cnMpIHtcbiAgICAgICAgdGhpcy5fYXR0cnMgPSBfYXR0cnM7XG4gICAgICAgIHRoaXMuX2F0dHJzID0gX2F0dHJzO1xuICAgIH1cbiAgICBBdHRyaWJ1dGVzLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAocGF0aCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWFkKHBhdGgpICE9IG51bGw7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiByZWFkIGEgdmFsdWUgZm9ybSB0aGUgaW50ZXJuYWwgbGlzdC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aFxuICAgICAqIEBwYXJhbSB7Kn0gZGVmYXVsdFZhbHVlIC0gVGhpcyB2YWx1ZSBpcyByZXR1cm5lZCBpZiB0aGUgdmFsdWUgaXMgbm90IHNldC5cbiAgICAgKi9cbiAgICBBdHRyaWJ1dGVzLnByb3RvdHlwZS5yZWFkID0gZnVuY3Rpb24gKHBhdGgsIGRlZmF1bHRWYWx1ZSkge1xuICAgICAgICB2YXIgcmV0ID0gJCRwcm9wZXJ0eShwYXRoLnNwbGl0KCc6Jykuam9pbignLicpLCB0aGlzLl9hdHRycyk7XG4gICAgICAgIHJldHVybiAocmV0ICE9IG51bGwpID8gcmV0IDogKGRlZmF1bHRWYWx1ZSAhPSBudWxsKSA/IGRlZmF1bHRWYWx1ZSA6ICcnO1xuICAgIH07XG4gICAgcmV0dXJuIEF0dHJpYnV0ZXM7XG59KCkpO1xuLyoqXG4gKiAkJHdpZGdldCBjcmVhdGVzIGEgd21sIHdpZGdldC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IENvbnN0cnV0b3JcbiAqIEBwYXJhbSB7b2JqZWN0fSBhdHRyaWJ1dGVzXG4gKiBAcGFyYW0ge2FycmF5PHN0cmluZ3xudW1iZXJ8V2lkZ2V0Pn0gY2hpbGRyZW5cbiAqIEBwYXJhbSB7Vmlld30gdmlld1xuICogQHJldHVybiB7V2lkZ2V0fVxuICovXG5mdW5jdGlvbiAkJHdpZGdldChDb25zdHJ1Y3RvciwgYXR0cmlidXRlcywgY2hpbGRyZW4sIHZpZXcpIHtcbiAgICB2YXIgY2hpbGRzID0gW107XG4gICAgdmFyIHc7XG4gICAgY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoY2hpbGQpIHsgcmV0dXJuIEFycmF5LmlzQXJyYXkoY2hpbGQpID9cbiAgICAgICAgY2hpbGRzLnB1c2guYXBwbHkoY2hpbGRzLCBjaGlsZCkgOiBjaGlsZHMucHVzaChjaGlsZCk7IH0pO1xuICAgIHcgPSBuZXcgQ29uc3RydWN0b3IobmV3IEF0dHJpYnV0ZXMoYXR0cmlidXRlcyksIGNoaWxkcyk7XG4gICAgaWYgKGF0dHJpYnV0ZXMud21sKVxuICAgICAgICBpZiAoYXR0cmlidXRlcy53bWwuaWQpXG4gICAgICAgICAgICB2aWV3LnJlZ2lzdGVyKGF0dHJpYnV0ZXMud21sLmlkLCB3KTtcbiAgICB2aWV3LndpZGdldHMucHVzaCh3KTtcbiAgICByZXR1cm4gdy5yZW5kZXIoKTtcbn1cbi8qKlxuICogJCRpZiBpcyBjYWxsZWQgdG8gY3JlYXRlIGFuIGlmIGNvbmRpdGlvbmFsIGNvbnN0cnVjdFxuICogQHBhcmFtIHsqfSBwcmVkaWNhdGVcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHBvc2l0aXZlXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBuZWdhdGl2ZVxuICovXG5mdW5jdGlvbiAkJGlmKHByZWRpY2F0ZSwgcG9zaXRpdmUsIG5lZ2F0aXZlKSB7XG4gICAgcmV0dXJuIChwcmVkaWNhdGUpID8gcG9zaXRpdmUoKSA6IG5lZ2F0aXZlKCk7XG59XG4vKipcbiAqICQkZm9yIGlzIGNhbGxlZCB0byBjcmVhdGUgYSBmb3IgbG9vcCBjb25zdHJ1Y3RcbiAqIEBwYXJhbSB7SXRlcmFibGV9IGNvbGxlY3Rpb25cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNiXG4gKi9cbmZ1bmN0aW9uICQkZm9yKGNvbGxlY3Rpb24sIGNiKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoY29sbGVjdGlvbikpIHtcbiAgICAgICAgcmV0dXJuIGNvbGxlY3Rpb24ubWFwKGNiKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGNvbGxlY3Rpb24gPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhjb2xsZWN0aW9uKS5tYXAoZnVuY3Rpb24gKGtleSwgXywgYWxsKSB7IHJldHVybiBjYihjb2xsZWN0aW9uW2tleV0sIGtleSwgYWxsKTsgfSk7XG4gICAgfVxuICAgIHJldHVybiBbXTtcbn1cbi8qKlxuICogJCRzd2l0Y2ggc2ltdWxhdGVzIGEgc3dpdGNoIHN0YXRlbWVudFxuICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfGJvb2xlYW59IHZhbHVlXG4gKiBAcGFyYW0ge29iamVjdH0gY2FzZXNcbiAqL1xuZnVuY3Rpb24gJCRzd2l0Y2godmFsdWUsIGNhc2VzKSB7XG4gICAgdmFyIHJlc3VsdCA9IGNhc2VzW3ZhbHVlXTtcbiAgICB2YXIgZGVmYXVsID0gY2FzZXMuZGVmYXVsdDtcbiAgICBpZiAocmVzdWx0KVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIGlmIChkZWZhdWwpXG4gICAgICAgIHJldHVybiBkZWZhdWw7XG59XG52YXIgTWFpbiA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTWFpbihjb250ZXh0KSB7XG4gICAgICAgIHZhciB2aWV3ID0gdGhpcztcbiAgICAgICAgdGhpcy5pZHMgPSB7fTtcbiAgICAgICAgdGhpcy53aWRnZXRzID0gW107XG4gICAgICAgIHRoaXMudHJlZSA9IG51bGw7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gJCRub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogdXRpbF8xLmNvbWJpbmUoWyQkcmVzb2x2ZShTdHlsZXMsICdBQ1RJT05fQVJFQScpLCAkJHJlc29sdmUoU3R5bGVzLCAnRFJBV0VSX1BVU0hBQkxFX0ZJWEVEJyldKSB9IH0sIFskJG5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiAkJHJlc29sdmUoU3R5bGVzLCAnQUNUSU9OX0FSRUFfQ09OVEVOVCcpIH0sIHdtbDogeyAnaWQnOiBcImNvbnRlbnRcIiB9IH0sIFskJHJlc29sdmUodGhpcywgJ2NoaWxkcmVuJyldLCB2aWV3KV0sIHZpZXcpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBNYWluLnJlbmRlciA9IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgICAgIHJldHVybiAobmV3IE1haW4oY29udGV4dCkpLnJlbmRlcigpO1xuICAgIH07XG4gICAgTWFpbi5wcm90b3R5cGUucmVnaXN0ZXIgPSBmdW5jdGlvbiAoaWQsIHcpIHtcbiAgICAgICAgaWYgKHRoaXMuaWRzLmhhc093blByb3BlcnR5KGlkKSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRHVwbGljYXRlIGlkIFxcJycgKyBpZCArICdcXCcgZGV0ZWN0ZWQhJyk7XG4gICAgICAgIHRoaXMuaWRzW2lkXSA9IHc7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgTWFpbi5wcm90b3R5cGUuZmluZEJ5SWQgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmlkc1tpZF0pID8gdGhpcy5pZHNbaWRdIDogbnVsbDtcbiAgICB9O1xuICAgIE1haW4ucHJvdG90eXBlLmludmFsaWRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjaGlsZHM7XG4gICAgICAgIHZhciBwYXJlbnQgPSB0aGlzLnRyZWUucGFyZW50Tm9kZTtcbiAgICAgICAgdmFyIHJlYWxGaXJzdENoaWxkO1xuICAgICAgICB2YXIgcmVhbEZpcnN0Q2hpbGRJbmRleDtcbiAgICAgICAgaWYgKHRoaXMudHJlZSA9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKCdDYW5ub3QgaW52YWxpZGF0ZSBhIHZpZXcgdGhhdCBoYXMgbm90IGJlZW4gcmVuZGVyZWQhJyk7XG4gICAgICAgIGlmICh0aGlzLnRyZWUucGFyZW50Tm9kZSA9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKCdBdHRlbXB0IHRvIGludmFsaWRhdGUgYSB2aWV3IHRoYXQgaGFzIG5vdCBiZWVuIGluc2VydGVkIHRvIERPTSEnKTtcbiAgICAgICAgY2hpbGRzID0gdGhpcy50cmVlLnBhcmVudE5vZGUuY2hpbGRyZW47XG4gICAgICAgIC8vZm9yIHNvbWUgcmVhc29uIHRoZSByZWZlcmVuY2Ugc3RvcmVkIGRvZXMgbm90IGhhdmUgdGhlIGNvcnJlY3QgcGFyZW50IG5vZGUuXG4gICAgICAgIC8vd2UgZG8gdGhpcyB0byBnZXQgYSAnbGl2ZScgdmVyc2lvbiBvZiB0aGUgbm9kZS5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHMubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICBpZiAoY2hpbGRzW2ldID09PSB0aGlzLnRyZWUpIHtcbiAgICAgICAgICAgICAgICByZWFsRmlyc3RDaGlsZCA9IGNoaWxkc1tpXTtcbiAgICAgICAgICAgICAgICByZWFsRmlyc3RDaGlsZEluZGV4ID0gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgcGFyZW50LnJlcGxhY2VDaGlsZCh0aGlzLnJlbmRlcigpLCByZWFsRmlyc3RDaGlsZCk7XG4gICAgfTtcbiAgICBNYWluLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuaWRzID0ge307XG4gICAgICAgIHRoaXMud2lkZ2V0cy5mb3JFYWNoKGZ1bmN0aW9uICh3KSB7IHJldHVybiB3LnJlbW92ZWQoKTsgfSk7XG4gICAgICAgIHRoaXMud2lkZ2V0cyA9IFtdO1xuICAgICAgICB0aGlzLnRyZWUgPSB0aGlzLnRlbXBsYXRlLmNhbGwodGhpcy5jb250ZXh0KTtcbiAgICAgICAgdGhpcy5pZHNbJ3Jvb3QnXSA9ICh0aGlzLmlkc1sncm9vdCddKSA/IHRoaXMuaWRzWydyb290J10gOiB0aGlzLnRyZWU7XG4gICAgICAgIHRoaXMud2lkZ2V0cy5mb3JFYWNoKGZ1bmN0aW9uICh3KSB7IHJldHVybiB3LnJlbmRlcmVkKCk7IH0pO1xuICAgICAgICByZXR1cm4gdGhpcy50cmVlO1xuICAgIH07XG4gICAgcmV0dXJuIE1haW47XG59KCkpO1xuZXhwb3J0cy5NYWluID0gTWFpbjtcbmV4cG9ydHMuZGVmYXVsdCA9IE1haW47XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hY3Rpb25fYXJlYS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJ1bnRpbWVfMSA9IHJlcXVpcmUoXCJAcXVlbmsvd21sL2xpYi9ydW50aW1lXCIpO1xudmFyIGJ1dHRvbl8xID0gcmVxdWlyZShcIi4vd21sL2J1dHRvblwiKTtcbi8qKlxuICogQnV0dG9uIGlzIGFuIGltcHJvdmVtZW50IG92ZXIgSFRNTEJ1dHRpb25FbGVtZW50XG4gKi9cbnZhciBCdXR0b24gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhCdXR0b24sIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQnV0dG9uKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMudmlldyA9IG5ldyBidXR0b25fMS5NYWluKF90aGlzKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBkaXNhYmxlIHRoaXMgYnV0dG9uLlxuICAgICAqL1xuICAgIEJ1dHRvbi5wcm90b3R5cGUuZGlzYWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy52aWV3LmZpbmRCeUlkKCdidXR0b24nKS5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBlbmFibGUgdGhpcyBidXR0b24uXG4gICAgICovXG4gICAgQnV0dG9uLnByb3RvdHlwZS5lbmFibGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMudmlldy5maW5kQnlJZCgnYnV0dG9uJykucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuICAgIH07XG4gICAgQnV0dG9uLnByb3RvdHlwZS5yZW5kZXJlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3YXQ6ZGlzYWJsZWQnKSlcbiAgICAgICAgICAgIHRoaXMudmlldy5maW5kQnlJZCgnYnV0dG9uJykuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAgIH07XG4gICAgcmV0dXJuIEJ1dHRvbjtcbn0ocnVudGltZV8xLkFic3RyYWN0V2lkZ2V0KSk7XG5leHBvcnRzLkJ1dHRvbiA9IEJ1dHRvbjtcbmV4cG9ydHMuZGVmYXVsdCA9IEJ1dHRvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUJ1dHRvbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBTdHlsZXMgPSByZXF1aXJlKFwid21sLXdpZGdldHMtY29tbW9uL1N0eWxlc1wiKTtcbnZhciB1dGlsXzEgPSByZXF1aXJlKFwid21sLXdpZGdldHMtY29tbW9uL3V0aWxcIik7XG5mdW5jdGlvbiAkJGJvdW5kYXJ5X3RvX2RvdCh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZS5zcGxpdCgnXVsnKS5qb2luKCcuJykuc3BsaXQoJ1snKS5qb2luKCcuJyk7XG59XG5mdW5jdGlvbiAkJHN0cmlwX2JyYWNlcyh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZS5zcGxpdCgnWycpLmpvaW4oJy4nKS5zcGxpdCgnXScpLmpvaW4oJycpO1xufVxuZnVuY3Rpb24gJCRlc2NhcGVfZG90cyh2YWx1ZSkge1xuICAgIHZhbHVlID0gdmFsdWUuc3BsaXQoJ1xcJycpO1xuICAgIHJldHVybiAodmFsdWUubGVuZ3RoIDwgMykgPyB2YWx1ZS5qb2luKCdcXCcnKSA6IHZhbHVlLm1hcChmdW5jdGlvbiAoc2VnKSB7XG4gICAgICAgIGlmIChzZWcubGVuZ3RoIDwgMylcbiAgICAgICAgICAgIHJldHVybiBzZWc7XG4gICAgICAgIGlmICgoc2VnWzBdID09PSAnLicpIHx8IChzZWdbc2VnLmxlbmd0aCAtIDFdID09PSAnLicpKVxuICAgICAgICAgICAgcmV0dXJuIHNlZztcbiAgICAgICAgcmV0dXJuIHNlZy5zcGxpdCgnLicpLmpvaW4oJyYmJyk7XG4gICAgfSkuam9pbignJyk7XG59XG5mdW5jdGlvbiAkJHVuZXNjYXBlX2RvdHModmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUuc3BsaXQoJyYmJykuam9pbignLicpO1xufVxuZnVuY3Rpb24gJCRwYXJ0aWZ5KHZhbHVlKSB7XG4gICAgaWYgKCF2YWx1ZSlcbiAgICAgICAgcmV0dXJuO1xuICAgIHJldHVybiAkJGVzY2FwZV9kb3RzKCQkc3RyaXBfYnJhY2VzKCQkYm91bmRhcnlfdG9fZG90KCcnICsgdmFsdWUpKSkuc3BsaXQoJy4nKTtcbn1cbmZ1bmN0aW9uICQkcHJvcGVydHkocGF0aCwgbykge1xuICAgIHZhciBwYXJ0cyA9ICQkcGFydGlmeShwYXRoKTtcbiAgICB2YXIgZmlyc3Q7XG4gICAgaWYgKHR5cGVvZiBvICE9PSAnb2JqZWN0JylcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZ2V0KCk6IGV4cGVjdHMgYW4gb2JqZWN0IGdvdCAnICsgdHlwZW9mIG8pO1xuICAgIGlmIChwYXJ0cy5sZW5ndGggPT09IDEpXG4gICAgICAgIHJldHVybiBvWyQkdW5lc2NhcGVfZG90cyhwYXJ0c1swXSldO1xuICAgIGlmIChwYXJ0cy5sZW5ndGggPT09IDApXG4gICAgICAgIHJldHVybjtcbiAgICBmaXJzdCA9IG9bcGFydHMuc2hpZnQoKV07XG4gICAgcmV0dXJuICgodHlwZW9mIG8gPT09ICdvYmplY3QnKSAmJiAobyAhPT0gbnVsbCkpID9cbiAgICAgICAgcGFydHMucmVkdWNlKGZ1bmN0aW9uICh0YXJnZXQsIHByb3ApIHtcbiAgICAgICAgICAgIGlmICh0YXJnZXQgPT0gbnVsbClcbiAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgICAgICAgICAgcmV0dXJuIHRhcmdldFskJHVuZXNjYXBlX2RvdHMocHJvcCldO1xuICAgICAgICB9LCBmaXJzdCkgOiBudWxsO1xufVxuZnVuY3Rpb24gJCRhZG9wdChjaGlsZCwgZSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGNoaWxkKSlcbiAgICAgICAgcmV0dXJuIGNoaWxkLmZvckVhY2goZnVuY3Rpb24gKGlubmVyQ2hpbGQpIHsgcmV0dXJuICQkYWRvcHQoaW5uZXJDaGlsZCwgZSk7IH0pO1xuICAgIGlmIChjaGlsZClcbiAgICAgICAgZS5hcHBlbmRDaGlsZCgodHlwZW9mIGNoaWxkID09PSAnb2JqZWN0JykgP1xuICAgICAgICAgICAgY2hpbGQgOiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjaGlsZCA9PSBudWxsID8gJycgOiBjaGlsZCkpO1xufVxuLyoqXG4gKiAkJHRleHQgY3JlYXRlcyBhIERPTVRleHROb2RlXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAqL1xuZnVuY3Rpb24gJCR0ZXh0KHZhbHVlKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlKTtcbn1cbi8qKlxuICogJCRyZXNvbHZlIHByb3BlcnR5IGFjY2VzcyBleHByZXNzaW9uIHRvIGF2b2lkXG4gKiB0aG93aW5nIGVycm9ycyBpZiBpdCBkb2VzIG5vdCBleGlzdC5cbiAqIEBwYXJhbSB7b2JqZWN0fSBoZWFkXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0aFxuICovXG5mdW5jdGlvbiAkJHJlc29sdmUoaGVhZCwgcGF0aCkge1xuICAgIHZhciByZXQgPSAkJHByb3BlcnR5KHBhdGgsIGhlYWQpO1xuICAgIHJldHVybiAocmV0ID09IG51bGwpID8gJycgOiByZXQ7XG59XG4vKipcbiAqICQkbm9kZSBpcyBjYWxsZWQgdG8gY3JlYXRlIGEgcmVndWxhciBET00gbm9kZVxuICogQHBhcmFtIHtzdHJpbmd9IHRhZ1xuICogQHBhcmFtIHtvYmplY3R9IGF0dHJpYnV0ZXNcbiAqIEBwYXJhbSB7YXJyYXk8c3RyaW5nfG51bWJlcnxXaWRnZXQ+fSBjaGlsZHJlblxuICogQHBhcmFtIHtWaWV3fSB2aWV3XG4gKi9cbmZ1bmN0aW9uICQkbm9kZSh0YWcsIGF0dHJpYnV0ZXMsIGNoaWxkcmVuLCB2aWV3KSB7XG4gICAgdmFyIGUgPSAodGFnID09PSAnZnJhZ21lbnQnKSA/IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSA6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgICBpZiAodHlwZW9mIGF0dHJpYnV0ZXMuaHRtbCA9PT0gJ29iamVjdCcpXG4gICAgICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMuaHRtbCkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGF0dHJpYnV0ZXMuaHRtbFtrZXldID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgZVtrZXldID0gYXR0cmlidXRlcy5odG1sW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBlLnNldEF0dHJpYnV0ZShrZXksIGF0dHJpYnV0ZXMuaHRtbFtrZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoYykgeyByZXR1cm4gJCRhZG9wdChjLCBlKTsgfSk7XG4gICAgaWYgKGF0dHJpYnV0ZXMud21sKVxuICAgICAgICBpZiAoYXR0cmlidXRlcy53bWwuaWQpXG4gICAgICAgICAgICB2aWV3LnJlZ2lzdGVyKGF0dHJpYnV0ZXMud21sLmlkLCBlKTtcbiAgICByZXR1cm4gZTtcbn1cbi8qKlxuICogQXR0cmlidXRlcyBwcm92aWRlcyBhbiBBUEkgZm9yIHJlYWRpbmcgdGhlXG4gKiBhdHRyaWJ1dGVzIHN1cHBsaWVkIHRvIGFuIEVsZW1lbnQuXG4gKiBAcGFyYW0ge29iamVjdH0gYXR0cnNcbiAqL1xudmFyIEF0dHJpYnV0ZXMgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEF0dHJpYnV0ZXMoX2F0dHJzKSB7XG4gICAgICAgIHRoaXMuX2F0dHJzID0gX2F0dHJzO1xuICAgICAgICB0aGlzLl9hdHRycyA9IF9hdHRycztcbiAgICB9XG4gICAgQXR0cmlidXRlcy5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gKHBhdGgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVhZChwYXRoKSAhPSBudWxsO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogcmVhZCBhIHZhbHVlIGZvcm0gdGhlIGludGVybmFsIGxpc3QuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGhcbiAgICAgKiBAcGFyYW0geyp9IGRlZmF1bHRWYWx1ZSAtIFRoaXMgdmFsdWUgaXMgcmV0dXJuZWQgaWYgdGhlIHZhbHVlIGlzIG5vdCBzZXQuXG4gICAgICovXG4gICAgQXR0cmlidXRlcy5wcm90b3R5cGUucmVhZCA9IGZ1bmN0aW9uIChwYXRoLCBkZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgdmFyIHJldCA9ICQkcHJvcGVydHkocGF0aC5zcGxpdCgnOicpLmpvaW4oJy4nKSwgdGhpcy5fYXR0cnMpO1xuICAgICAgICByZXR1cm4gKHJldCAhPSBudWxsKSA/IHJldCA6IChkZWZhdWx0VmFsdWUgIT0gbnVsbCkgPyBkZWZhdWx0VmFsdWUgOiAnJztcbiAgICB9O1xuICAgIHJldHVybiBBdHRyaWJ1dGVzO1xufSgpKTtcbi8qKlxuICogJCR3aWRnZXQgY3JlYXRlcyBhIHdtbCB3aWRnZXQuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBDb25zdHJ1dG9yXG4gKiBAcGFyYW0ge29iamVjdH0gYXR0cmlidXRlc1xuICogQHBhcmFtIHthcnJheTxzdHJpbmd8bnVtYmVyfFdpZGdldD59IGNoaWxkcmVuXG4gKiBAcGFyYW0ge1ZpZXd9IHZpZXdcbiAqIEByZXR1cm4ge1dpZGdldH1cbiAqL1xuZnVuY3Rpb24gJCR3aWRnZXQoQ29uc3RydWN0b3IsIGF0dHJpYnV0ZXMsIGNoaWxkcmVuLCB2aWV3KSB7XG4gICAgdmFyIGNoaWxkcyA9IFtdO1xuICAgIHZhciB3O1xuICAgIGNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKGNoaWxkKSB7IHJldHVybiBBcnJheS5pc0FycmF5KGNoaWxkKSA/XG4gICAgICAgIGNoaWxkcy5wdXNoLmFwcGx5KGNoaWxkcywgY2hpbGQpIDogY2hpbGRzLnB1c2goY2hpbGQpOyB9KTtcbiAgICB3ID0gbmV3IENvbnN0cnVjdG9yKG5ldyBBdHRyaWJ1dGVzKGF0dHJpYnV0ZXMpLCBjaGlsZHMpO1xuICAgIGlmIChhdHRyaWJ1dGVzLndtbClcbiAgICAgICAgaWYgKGF0dHJpYnV0ZXMud21sLmlkKVxuICAgICAgICAgICAgdmlldy5yZWdpc3RlcihhdHRyaWJ1dGVzLndtbC5pZCwgdyk7XG4gICAgdmlldy53aWRnZXRzLnB1c2godyk7XG4gICAgcmV0dXJuIHcucmVuZGVyKCk7XG59XG4vKipcbiAqICQkaWYgaXMgY2FsbGVkIHRvIGNyZWF0ZSBhbiBpZiBjb25kaXRpb25hbCBjb25zdHJ1Y3RcbiAqIEBwYXJhbSB7Kn0gcHJlZGljYXRlXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBwb3NpdGl2ZVxuICogQHBhcmFtIHtmdW5jdGlvbn0gbmVnYXRpdmVcbiAqL1xuZnVuY3Rpb24gJCRpZihwcmVkaWNhdGUsIHBvc2l0aXZlLCBuZWdhdGl2ZSkge1xuICAgIHJldHVybiAocHJlZGljYXRlKSA/IHBvc2l0aXZlKCkgOiBuZWdhdGl2ZSgpO1xufVxuLyoqXG4gKiAkJGZvciBpcyBjYWxsZWQgdG8gY3JlYXRlIGEgZm9yIGxvb3AgY29uc3RydWN0XG4gKiBAcGFyYW0ge0l0ZXJhYmxlfSBjb2xsZWN0aW9uXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYlxuICovXG5mdW5jdGlvbiAkJGZvcihjb2xsZWN0aW9uLCBjYikge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGNvbGxlY3Rpb24pKSB7XG4gICAgICAgIHJldHVybiBjb2xsZWN0aW9uLm1hcChjYik7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBjb2xsZWN0aW9uID09PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoY29sbGVjdGlvbikubWFwKGZ1bmN0aW9uIChrZXksIF8sIGFsbCkgeyByZXR1cm4gY2IoY29sbGVjdGlvbltrZXldLCBrZXksIGFsbCk7IH0pO1xuICAgIH1cbiAgICByZXR1cm4gW107XG59XG4vKipcbiAqICQkc3dpdGNoIHNpbXVsYXRlcyBhIHN3aXRjaCBzdGF0ZW1lbnRcbiAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcnxib29sZWFufSB2YWx1ZVxuICogQHBhcmFtIHtvYmplY3R9IGNhc2VzXG4gKi9cbmZ1bmN0aW9uICQkc3dpdGNoKHZhbHVlLCBjYXNlcykge1xuICAgIHZhciByZXN1bHQgPSBjYXNlc1t2YWx1ZV07XG4gICAgdmFyIGRlZmF1bCA9IGNhc2VzLmRlZmF1bHQ7XG4gICAgaWYgKHJlc3VsdClcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICBpZiAoZGVmYXVsKVxuICAgICAgICByZXR1cm4gZGVmYXVsO1xufVxudmFyIE1haW4gPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE1haW4oY29udGV4dCkge1xuICAgICAgICB2YXIgdmlldyA9IHRoaXM7XG4gICAgICAgIHRoaXMuaWRzID0ge307XG4gICAgICAgIHRoaXMud2lkZ2V0cyA9IFtdO1xuICAgICAgICB0aGlzLnRyZWUgPSBudWxsO1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuICQkbm9kZSgnZnJhZ21lbnQnLCB7IGh0bWw6IHt9IH0sIFskJGlmKHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpocmVmJyksIGZ1bmN0aW9uIGlmMCgpIHsgcmV0dXJuIFskJG5vZGUoJ2EnLCB7IGh0bWw6IHsgJ2hyZWYnOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6aHJlZicpLCAnY2xhc3MnOiB1dGlsXzEuY29tYmluZShbJCRyZXNvbHZlKFN0eWxlcywgJ0JVVFRPTicpLCB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6dmFyaWFudCcsICcnKSwgdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OnNpemUnLCAnJyksIHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpzdHlsZScsICQkcmVzb2x2ZShTdHlsZXMsICdERUZBVUxUJykpXSksICdvbmNsaWNrJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3Om9uQ2xpY2snLCB1dGlsXzEubm9vcCkgfSwgd21sOiB7ICdpZCc6IFwiYnV0dG9uXCIgfSB9LCBbdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OnRleHQnKSwgJCRyZXNvbHZlKHRoaXMsICdjaGlsZHJlbicpXSwgdmlldyldOyB9LmJpbmQodGhpcyksIGZ1bmN0aW9uIGVsc2VfY2xhdXNlMCgpIHsgcmV0dXJuIFskJG5vZGUoJ2J1dHRvbicsIHsgaHRtbDogeyAndHlwZSc6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzp0eXBlJywgJ2J1dHRvbicpLCAnbmFtZSc6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpuYW1lJywgJycpLCAnY2xhc3MnOiB1dGlsXzEuY29tYmluZShbJCRyZXNvbHZlKFN0eWxlcywgJ0JVVFRPTicpLCB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6dmFyaWFudCcsICcnKSwgdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OnNpemUnLCAnJyksIHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpzdHlsZScsICQkcmVzb2x2ZShTdHlsZXMsICdERUZBVUxUJykpXSksICdvbmNsaWNrJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3Om9uQ2xpY2snLCB1dGlsXzEubm9vcCkgfSwgd21sOiB7ICdpZCc6IFwiYnV0dG9uXCIgfSB9LCBbdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OnRleHQnKSwgJCRyZXNvbHZlKHRoaXMsICdjaGlsZHJlbicpXSwgdmlldyldOyB9LmJpbmQodGhpcykpXSwgdmlldyk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIE1haW4ucmVuZGVyID0gZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICAgICAgcmV0dXJuIChuZXcgTWFpbihjb250ZXh0KSkucmVuZGVyKCk7XG4gICAgfTtcbiAgICBNYWluLnByb3RvdHlwZS5yZWdpc3RlciA9IGZ1bmN0aW9uIChpZCwgdykge1xuICAgICAgICBpZiAodGhpcy5pZHMuaGFzT3duUHJvcGVydHkoaWQpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdEdXBsaWNhdGUgaWQgXFwnJyArIGlkICsgJ1xcJyBkZXRlY3RlZCEnKTtcbiAgICAgICAgdGhpcy5pZHNbaWRdID0gdztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBNYWluLnByb3RvdHlwZS5maW5kQnlJZCA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICByZXR1cm4gKHRoaXMuaWRzW2lkXSkgPyB0aGlzLmlkc1tpZF0gOiBudWxsO1xuICAgIH07XG4gICAgTWFpbi5wcm90b3R5cGUuaW52YWxpZGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNoaWxkcztcbiAgICAgICAgdmFyIHBhcmVudCA9IHRoaXMudHJlZS5wYXJlbnROb2RlO1xuICAgICAgICB2YXIgcmVhbEZpcnN0Q2hpbGQ7XG4gICAgICAgIHZhciByZWFsRmlyc3RDaGlsZEluZGV4O1xuICAgICAgICBpZiAodGhpcy50cmVlID09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoJ0Nhbm5vdCBpbnZhbGlkYXRlIGEgdmlldyB0aGF0IGhhcyBub3QgYmVlbiByZW5kZXJlZCEnKTtcbiAgICAgICAgaWYgKHRoaXMudHJlZS5wYXJlbnROb2RlID09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoJ0F0dGVtcHQgdG8gaW52YWxpZGF0ZSBhIHZpZXcgdGhhdCBoYXMgbm90IGJlZW4gaW5zZXJ0ZWQgdG8gRE9NIScpO1xuICAgICAgICBjaGlsZHMgPSB0aGlzLnRyZWUucGFyZW50Tm9kZS5jaGlsZHJlbjtcbiAgICAgICAgLy9mb3Igc29tZSByZWFzb24gdGhlIHJlZmVyZW5jZSBzdG9yZWQgZG9lcyBub3QgaGF2ZSB0aGUgY29ycmVjdCBwYXJlbnQgbm9kZS5cbiAgICAgICAgLy93ZSBkbyB0aGlzIHRvIGdldCBhICdsaXZlJyB2ZXJzaW9uIG9mIHRoZSBub2RlLlxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcy5sZW5ndGg7IGkrKylcbiAgICAgICAgICAgIGlmIChjaGlsZHNbaV0gPT09IHRoaXMudHJlZSkge1xuICAgICAgICAgICAgICAgIHJlYWxGaXJzdENoaWxkID0gY2hpbGRzW2ldO1xuICAgICAgICAgICAgICAgIHJlYWxGaXJzdENoaWxkSW5kZXggPSBpO1xuICAgICAgICAgICAgfVxuICAgICAgICBwYXJlbnQucmVwbGFjZUNoaWxkKHRoaXMucmVuZGVyKCksIHJlYWxGaXJzdENoaWxkKTtcbiAgICB9O1xuICAgIE1haW4ucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5pZHMgPSB7fTtcbiAgICAgICAgdGhpcy53aWRnZXRzLmZvckVhY2goZnVuY3Rpb24gKHcpIHsgcmV0dXJuIHcucmVtb3ZlZCgpOyB9KTtcbiAgICAgICAgdGhpcy53aWRnZXRzID0gW107XG4gICAgICAgIHRoaXMudHJlZSA9IHRoaXMudGVtcGxhdGUuY2FsbCh0aGlzLmNvbnRleHQpO1xuICAgICAgICB0aGlzLmlkc1sncm9vdCddID0gKHRoaXMuaWRzWydyb290J10pID8gdGhpcy5pZHNbJ3Jvb3QnXSA6IHRoaXMudHJlZTtcbiAgICAgICAgdGhpcy53aWRnZXRzLmZvckVhY2goZnVuY3Rpb24gKHcpIHsgcmV0dXJuIHcucmVuZGVyZWQoKTsgfSk7XG4gICAgICAgIHJldHVybiB0aGlzLnRyZWU7XG4gICAgfTtcbiAgICByZXR1cm4gTWFpbjtcbn0oKSk7XG5leHBvcnRzLk1haW4gPSBNYWluO1xuZXhwb3J0cy5kZWZhdWx0ID0gTWFpbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJ1dHRvbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJ1bnRpbWVfMSA9IHJlcXVpcmUoXCJAcXVlbmsvd21sL2xpYi9ydW50aW1lXCIpO1xudmFyIFN0eWxlcyA9IHJlcXVpcmUoXCJ3bWwtd2lkZ2V0cy1jb21tb24vU3R5bGVzXCIpO1xudmFyIGRyYXdlcl9sYXlvdXRfMSA9IHJlcXVpcmUoXCIuL3dtbC9kcmF3ZXItbGF5b3V0XCIpO1xudmFyIHV0aWxfMSA9IHJlcXVpcmUoXCJ3bWwtd2lkZ2V0cy1jb21tb24vdXRpbFwiKTtcbi8qKlxuICogRHJhd2VyTGF5b3V0IHByb3ZpZGVzIGEgdG9wIGxldmVsIGxheW91dCBjb25zaXN0aW5nIG9mIGEgZHJhd2VyIGFuZFxuICogYSBtYWluIGNvbnRlbnQgdmlldy5cbiAqL1xudmFyIERyYXdlckxheW91dCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKERyYXdlckxheW91dCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBEcmF3ZXJMYXlvdXQoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IGRyYXdlcl9sYXlvdXRfMS5NYWluKF90aGlzKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBEcmF3ZXJMYXlvdXQucHJvdG90eXBlLl9nZXREcmF3ZXJET00gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZpZXcuZmluZEJ5SWQoJ2RyYXdlcicpO1xuICAgIH07XG4gICAgRHJhd2VyTGF5b3V0LnByb3RvdHlwZS5fY29tYmluZSA9IGZ1bmN0aW9uIChjbGFzc2VzKSB7XG4gICAgICAgIHJldHVybiBjbGFzc2VzLmpvaW4oJyAnKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIGRyYXdlclZpc2libGUgcXVlcmllcyB3aGV0aGVyIHRoZSBEcmF3ZXIgaXMgdmlzaWJsZSBvciBub3QuXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAgICovXG4gICAgRHJhd2VyTGF5b3V0LnByb3RvdHlwZS5kcmF3ZXJWaXNpYmxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gIXRoaXMuX2dldERyYXdlckRPTSgpLmNsYXNzTGlzdC5jb250YWlucyhTdHlsZXMuSElEREVOKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIGhpZGVEcmF3ZXIgaGlkZXMgdGhlIGRyYXdlci5cbiAgICAgKi9cbiAgICBEcmF3ZXJMYXlvdXQucHJvdG90eXBlLmhpZGVEcmF3ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmRyYXdlclZpc2libGUoKSlcbiAgICAgICAgICAgIHRoaXMuX2dldERyYXdlckRPTSgpLmNsYXNzTGlzdC5hZGQoU3R5bGVzLkhJRERFTik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBzaG93RHJhd2VyIHNob3dzIHRoZSBkcmF3ZXJcbiAgICAgKi9cbiAgICBEcmF3ZXJMYXlvdXQucHJvdG90eXBlLnNob3dEcmF3ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5kcmF3ZXJWaXNpYmxlKCkpXG4gICAgICAgICAgICB0aGlzLl9nZXREcmF3ZXJET00oKS5jbGFzc0xpc3QucmVtb3ZlKFN0eWxlcy5ISURERU4pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogdG9nZ2xlIHRoZSB2aXNpYmlsaXR5IG9mIHRoaXMgRHJhd2VyXG4gICAgICovXG4gICAgRHJhd2VyTGF5b3V0LnByb3RvdHlwZS50b2dnbGVEcmF3ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2dldERyYXdlckRPTSgpLmNsYXNzTGlzdC50b2dnbGUoU3R5bGVzLkhJRERFTik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBzZXRDb250ZW50IHJlcGxhY2VzIHRoZSBjb250ZW50IG9mIHRoaXMgdmlldy5cbiAgICAgKi9cbiAgICBEcmF3ZXJMYXlvdXQucHJvdG90eXBlLnNldENvbnRlbnQgPSBmdW5jdGlvbiAocikge1xuICAgICAgICB1dGlsXzEucmVwbGFjZUNvbnRlbnQociwgdGhpcy52aWV3LmZpbmRCeUlkKCdjb250ZW50JykpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIERyYXdlckxheW91dC5wcm90b3R5cGUucmVuZGVyZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh3aW5kb3cubWF0Y2hNZWRpYSgnKG1heC13aWR0aDogNDgwcHgnKS5tYXRjaGVzKVxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcyk7XG4gICAgfTtcbiAgICBEcmF3ZXJMYXlvdXQucHJvdG90eXBlLmhhbmRsZUV2ZW50ID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKGUgaW5zdGFuY2VvZiBNb3VzZUV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgZHJhd2VyID0gdGhpcy52aWV3LmZpbmRCeUlkKCdkcmF3ZXInKTtcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICAgICAgICAgIGlmICgodGFyZ2V0ICE9PSBkcmF3ZXIpICYmICghZHJhd2VyLmNvbnRhaW5zKHRhcmdldCkpKVxuICAgICAgICAgICAgICAgIGlmICghd2luZG93LmRvY3VtZW50LmNvbnRhaW5zKGRyYXdlcikpXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMpO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlRHJhd2VyKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBEcmF3ZXJMYXlvdXQ7XG59KHJ1bnRpbWVfMS5BYnN0cmFjdFdpZGdldCkpO1xuZXhwb3J0cy5EcmF3ZXJMYXlvdXQgPSBEcmF3ZXJMYXlvdXQ7XG5leHBvcnRzLmRlZmF1bHQgPSBEcmF3ZXJMYXlvdXQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1EcmF3ZXJMYXlvdXQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgU3R5bGVzID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi9TdHlsZXNcIik7XG5mdW5jdGlvbiAkJGJvdW5kYXJ5X3RvX2RvdCh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZS5zcGxpdCgnXVsnKS5qb2luKCcuJykuc3BsaXQoJ1snKS5qb2luKCcuJyk7XG59XG5mdW5jdGlvbiAkJHN0cmlwX2JyYWNlcyh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZS5zcGxpdCgnWycpLmpvaW4oJy4nKS5zcGxpdCgnXScpLmpvaW4oJycpO1xufVxuZnVuY3Rpb24gJCRlc2NhcGVfZG90cyh2YWx1ZSkge1xuICAgIHZhbHVlID0gdmFsdWUuc3BsaXQoJ1xcJycpO1xuICAgIHJldHVybiAodmFsdWUubGVuZ3RoIDwgMykgPyB2YWx1ZS5qb2luKCdcXCcnKSA6IHZhbHVlLm1hcChmdW5jdGlvbiAoc2VnKSB7XG4gICAgICAgIGlmIChzZWcubGVuZ3RoIDwgMylcbiAgICAgICAgICAgIHJldHVybiBzZWc7XG4gICAgICAgIGlmICgoc2VnWzBdID09PSAnLicpIHx8IChzZWdbc2VnLmxlbmd0aCAtIDFdID09PSAnLicpKVxuICAgICAgICAgICAgcmV0dXJuIHNlZztcbiAgICAgICAgcmV0dXJuIHNlZy5zcGxpdCgnLicpLmpvaW4oJyYmJyk7XG4gICAgfSkuam9pbignJyk7XG59XG5mdW5jdGlvbiAkJHVuZXNjYXBlX2RvdHModmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUuc3BsaXQoJyYmJykuam9pbignLicpO1xufVxuZnVuY3Rpb24gJCRwYXJ0aWZ5KHZhbHVlKSB7XG4gICAgaWYgKCF2YWx1ZSlcbiAgICAgICAgcmV0dXJuO1xuICAgIHJldHVybiAkJGVzY2FwZV9kb3RzKCQkc3RyaXBfYnJhY2VzKCQkYm91bmRhcnlfdG9fZG90KCcnICsgdmFsdWUpKSkuc3BsaXQoJy4nKTtcbn1cbmZ1bmN0aW9uICQkcHJvcGVydHkocGF0aCwgbykge1xuICAgIHZhciBwYXJ0cyA9ICQkcGFydGlmeShwYXRoKTtcbiAgICB2YXIgZmlyc3Q7XG4gICAgaWYgKHR5cGVvZiBvICE9PSAnb2JqZWN0JylcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZ2V0KCk6IGV4cGVjdHMgYW4gb2JqZWN0IGdvdCAnICsgdHlwZW9mIG8pO1xuICAgIGlmIChwYXJ0cy5sZW5ndGggPT09IDEpXG4gICAgICAgIHJldHVybiBvWyQkdW5lc2NhcGVfZG90cyhwYXJ0c1swXSldO1xuICAgIGlmIChwYXJ0cy5sZW5ndGggPT09IDApXG4gICAgICAgIHJldHVybjtcbiAgICBmaXJzdCA9IG9bcGFydHMuc2hpZnQoKV07XG4gICAgcmV0dXJuICgodHlwZW9mIG8gPT09ICdvYmplY3QnKSAmJiAobyAhPT0gbnVsbCkpID9cbiAgICAgICAgcGFydHMucmVkdWNlKGZ1bmN0aW9uICh0YXJnZXQsIHByb3ApIHtcbiAgICAgICAgICAgIGlmICh0YXJnZXQgPT0gbnVsbClcbiAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgICAgICAgICAgcmV0dXJuIHRhcmdldFskJHVuZXNjYXBlX2RvdHMocHJvcCldO1xuICAgICAgICB9LCBmaXJzdCkgOiBudWxsO1xufVxuZnVuY3Rpb24gJCRhZG9wdChjaGlsZCwgZSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGNoaWxkKSlcbiAgICAgICAgcmV0dXJuIGNoaWxkLmZvckVhY2goZnVuY3Rpb24gKGlubmVyQ2hpbGQpIHsgcmV0dXJuICQkYWRvcHQoaW5uZXJDaGlsZCwgZSk7IH0pO1xuICAgIGlmIChjaGlsZClcbiAgICAgICAgZS5hcHBlbmRDaGlsZCgodHlwZW9mIGNoaWxkID09PSAnb2JqZWN0JykgP1xuICAgICAgICAgICAgY2hpbGQgOiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjaGlsZCA9PSBudWxsID8gJycgOiBjaGlsZCkpO1xufVxuLyoqXG4gKiAkJHRleHQgY3JlYXRlcyBhIERPTVRleHROb2RlXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAqL1xuZnVuY3Rpb24gJCR0ZXh0KHZhbHVlKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlKTtcbn1cbi8qKlxuICogJCRyZXNvbHZlIHByb3BlcnR5IGFjY2VzcyBleHByZXNzaW9uIHRvIGF2b2lkXG4gKiB0aG93aW5nIGVycm9ycyBpZiBpdCBkb2VzIG5vdCBleGlzdC5cbiAqIEBwYXJhbSB7b2JqZWN0fSBoZWFkXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0aFxuICovXG5mdW5jdGlvbiAkJHJlc29sdmUoaGVhZCwgcGF0aCkge1xuICAgIHZhciByZXQgPSAkJHByb3BlcnR5KHBhdGgsIGhlYWQpO1xuICAgIHJldHVybiAocmV0ID09IG51bGwpID8gJycgOiByZXQ7XG59XG4vKipcbiAqICQkbm9kZSBpcyBjYWxsZWQgdG8gY3JlYXRlIGEgcmVndWxhciBET00gbm9kZVxuICogQHBhcmFtIHtzdHJpbmd9IHRhZ1xuICogQHBhcmFtIHtvYmplY3R9IGF0dHJpYnV0ZXNcbiAqIEBwYXJhbSB7YXJyYXk8c3RyaW5nfG51bWJlcnxXaWRnZXQ+fSBjaGlsZHJlblxuICogQHBhcmFtIHtWaWV3fSB2aWV3XG4gKi9cbmZ1bmN0aW9uICQkbm9kZSh0YWcsIGF0dHJpYnV0ZXMsIGNoaWxkcmVuLCB2aWV3KSB7XG4gICAgdmFyIGUgPSAodGFnID09PSAnZnJhZ21lbnQnKSA/IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSA6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgICBpZiAodHlwZW9mIGF0dHJpYnV0ZXMuaHRtbCA9PT0gJ29iamVjdCcpXG4gICAgICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMuaHRtbCkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGF0dHJpYnV0ZXMuaHRtbFtrZXldID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgZVtrZXldID0gYXR0cmlidXRlcy5odG1sW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBlLnNldEF0dHJpYnV0ZShrZXksIGF0dHJpYnV0ZXMuaHRtbFtrZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoYykgeyByZXR1cm4gJCRhZG9wdChjLCBlKTsgfSk7XG4gICAgaWYgKGF0dHJpYnV0ZXMud21sKVxuICAgICAgICBpZiAoYXR0cmlidXRlcy53bWwuaWQpXG4gICAgICAgICAgICB2aWV3LnJlZ2lzdGVyKGF0dHJpYnV0ZXMud21sLmlkLCBlKTtcbiAgICByZXR1cm4gZTtcbn1cbi8qKlxuICogQXR0cmlidXRlcyBwcm92aWRlcyBhbiBBUEkgZm9yIHJlYWRpbmcgdGhlXG4gKiBhdHRyaWJ1dGVzIHN1cHBsaWVkIHRvIGFuIEVsZW1lbnQuXG4gKiBAcGFyYW0ge29iamVjdH0gYXR0cnNcbiAqL1xudmFyIEF0dHJpYnV0ZXMgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEF0dHJpYnV0ZXMoX2F0dHJzKSB7XG4gICAgICAgIHRoaXMuX2F0dHJzID0gX2F0dHJzO1xuICAgICAgICB0aGlzLl9hdHRycyA9IF9hdHRycztcbiAgICB9XG4gICAgQXR0cmlidXRlcy5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gKHBhdGgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVhZChwYXRoKSAhPSBudWxsO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogcmVhZCBhIHZhbHVlIGZvcm0gdGhlIGludGVybmFsIGxpc3QuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGhcbiAgICAgKiBAcGFyYW0geyp9IGRlZmF1bHRWYWx1ZSAtIFRoaXMgdmFsdWUgaXMgcmV0dXJuZWQgaWYgdGhlIHZhbHVlIGlzIG5vdCBzZXQuXG4gICAgICovXG4gICAgQXR0cmlidXRlcy5wcm90b3R5cGUucmVhZCA9IGZ1bmN0aW9uIChwYXRoLCBkZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgdmFyIHJldCA9ICQkcHJvcGVydHkocGF0aC5zcGxpdCgnOicpLmpvaW4oJy4nKSwgdGhpcy5fYXR0cnMpO1xuICAgICAgICByZXR1cm4gKHJldCAhPSBudWxsKSA/IHJldCA6IChkZWZhdWx0VmFsdWUgIT0gbnVsbCkgPyBkZWZhdWx0VmFsdWUgOiAnJztcbiAgICB9O1xuICAgIHJldHVybiBBdHRyaWJ1dGVzO1xufSgpKTtcbi8qKlxuICogJCR3aWRnZXQgY3JlYXRlcyBhIHdtbCB3aWRnZXQuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBDb25zdHJ1dG9yXG4gKiBAcGFyYW0ge29iamVjdH0gYXR0cmlidXRlc1xuICogQHBhcmFtIHthcnJheTxzdHJpbmd8bnVtYmVyfFdpZGdldD59IGNoaWxkcmVuXG4gKiBAcGFyYW0ge1ZpZXd9IHZpZXdcbiAqIEByZXR1cm4ge1dpZGdldH1cbiAqL1xuZnVuY3Rpb24gJCR3aWRnZXQoQ29uc3RydWN0b3IsIGF0dHJpYnV0ZXMsIGNoaWxkcmVuLCB2aWV3KSB7XG4gICAgdmFyIGNoaWxkcyA9IFtdO1xuICAgIHZhciB3O1xuICAgIGNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKGNoaWxkKSB7IHJldHVybiBBcnJheS5pc0FycmF5KGNoaWxkKSA/XG4gICAgICAgIGNoaWxkcy5wdXNoLmFwcGx5KGNoaWxkcywgY2hpbGQpIDogY2hpbGRzLnB1c2goY2hpbGQpOyB9KTtcbiAgICB3ID0gbmV3IENvbnN0cnVjdG9yKG5ldyBBdHRyaWJ1dGVzKGF0dHJpYnV0ZXMpLCBjaGlsZHMpO1xuICAgIGlmIChhdHRyaWJ1dGVzLndtbClcbiAgICAgICAgaWYgKGF0dHJpYnV0ZXMud21sLmlkKVxuICAgICAgICAgICAgdmlldy5yZWdpc3RlcihhdHRyaWJ1dGVzLndtbC5pZCwgdyk7XG4gICAgdmlldy53aWRnZXRzLnB1c2godyk7XG4gICAgcmV0dXJuIHcucmVuZGVyKCk7XG59XG4vKipcbiAqICQkaWYgaXMgY2FsbGVkIHRvIGNyZWF0ZSBhbiBpZiBjb25kaXRpb25hbCBjb25zdHJ1Y3RcbiAqIEBwYXJhbSB7Kn0gcHJlZGljYXRlXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBwb3NpdGl2ZVxuICogQHBhcmFtIHtmdW5jdGlvbn0gbmVnYXRpdmVcbiAqL1xuZnVuY3Rpb24gJCRpZihwcmVkaWNhdGUsIHBvc2l0aXZlLCBuZWdhdGl2ZSkge1xuICAgIHJldHVybiAocHJlZGljYXRlKSA/IHBvc2l0aXZlKCkgOiBuZWdhdGl2ZSgpO1xufVxuLyoqXG4gKiAkJGZvciBpcyBjYWxsZWQgdG8gY3JlYXRlIGEgZm9yIGxvb3AgY29uc3RydWN0XG4gKiBAcGFyYW0ge0l0ZXJhYmxlfSBjb2xsZWN0aW9uXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYlxuICovXG5mdW5jdGlvbiAkJGZvcihjb2xsZWN0aW9uLCBjYikge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGNvbGxlY3Rpb24pKSB7XG4gICAgICAgIHJldHVybiBjb2xsZWN0aW9uLm1hcChjYik7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBjb2xsZWN0aW9uID09PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoY29sbGVjdGlvbikubWFwKGZ1bmN0aW9uIChrZXksIF8sIGFsbCkgeyByZXR1cm4gY2IoY29sbGVjdGlvbltrZXldLCBrZXksIGFsbCk7IH0pO1xuICAgIH1cbiAgICByZXR1cm4gW107XG59XG4vKipcbiAqICQkc3dpdGNoIHNpbXVsYXRlcyBhIHN3aXRjaCBzdGF0ZW1lbnRcbiAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcnxib29sZWFufSB2YWx1ZVxuICogQHBhcmFtIHtvYmplY3R9IGNhc2VzXG4gKi9cbmZ1bmN0aW9uICQkc3dpdGNoKHZhbHVlLCBjYXNlcykge1xuICAgIHZhciByZXN1bHQgPSBjYXNlc1t2YWx1ZV07XG4gICAgdmFyIGRlZmF1bCA9IGNhc2VzLmRlZmF1bHQ7XG4gICAgaWYgKHJlc3VsdClcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICBpZiAoZGVmYXVsKVxuICAgICAgICByZXR1cm4gZGVmYXVsO1xufVxudmFyIE1haW4gPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE1haW4oY29udGV4dCkge1xuICAgICAgICB2YXIgdmlldyA9IHRoaXM7XG4gICAgICAgIHRoaXMuaWRzID0ge307XG4gICAgICAgIHRoaXMud2lkZ2V0cyA9IFtdO1xuICAgICAgICB0aGlzLnRyZWUgPSBudWxsO1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuICQkbm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6ICQkcmVzb2x2ZShTdHlsZXMsICdEUkFXRVJfTEFZT1VUJykgfSwgd21sOiB7ICdpZCc6IFwiY29udGVudFwiIH0gfSwgWyQkbm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6ICQkcmVzb2x2ZShTdHlsZXMsICdEUkFXRVInKSB9LCB3bWw6IHsgJ2lkJzogXCJkcmF3ZXJcIiB9IH0sIFskJG5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiAkJHJlc29sdmUoU3R5bGVzLCAnRFJBV0VSX0NPTlRFTlQnKSB9IH0sIFskJGlmKHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpuYXZpZ2F0aW9uJyksIGZ1bmN0aW9uIGlmMCgpIHsgcmV0dXJuIFt0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6bmF2aWdhdGlvbicpLmFwcGx5KHRoaXMsIFt2aWV3XS5jb25jYXQoW10pKV07IH0uYmluZCh0aGlzKSwgZnVuY3Rpb24gKCkgeyB9KV0sIHZpZXcpXSwgdmlldyksICQkaWYodGhpcy5hdHRyaWJ1dGVzLmhhcygnd3c6Y29udGVudCcpLCBmdW5jdGlvbiBpZjAoKSB7IHJldHVybiBbdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmNvbnRlbnQnKS5hcHBseSh0aGlzLCBbdmlld10uY29uY2F0KFtdKSldOyB9LmJpbmQodGhpcyksIGZ1bmN0aW9uIGVsc2VfY2xhdXNlMSgpIHsgcmV0dXJuIFskJHJlc29sdmUodGhpcywgJ2NoaWxkcmVuJyldOyB9LmJpbmQodGhpcykpXSwgdmlldyk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIE1haW4ucmVuZGVyID0gZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICAgICAgcmV0dXJuIChuZXcgTWFpbihjb250ZXh0KSkucmVuZGVyKCk7XG4gICAgfTtcbiAgICBNYWluLnByb3RvdHlwZS5yZWdpc3RlciA9IGZ1bmN0aW9uIChpZCwgdykge1xuICAgICAgICBpZiAodGhpcy5pZHMuaGFzT3duUHJvcGVydHkoaWQpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdEdXBsaWNhdGUgaWQgXFwnJyArIGlkICsgJ1xcJyBkZXRlY3RlZCEnKTtcbiAgICAgICAgdGhpcy5pZHNbaWRdID0gdztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBNYWluLnByb3RvdHlwZS5maW5kQnlJZCA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICByZXR1cm4gKHRoaXMuaWRzW2lkXSkgPyB0aGlzLmlkc1tpZF0gOiBudWxsO1xuICAgIH07XG4gICAgTWFpbi5wcm90b3R5cGUuaW52YWxpZGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNoaWxkcztcbiAgICAgICAgdmFyIHBhcmVudCA9IHRoaXMudHJlZS5wYXJlbnROb2RlO1xuICAgICAgICB2YXIgcmVhbEZpcnN0Q2hpbGQ7XG4gICAgICAgIHZhciByZWFsRmlyc3RDaGlsZEluZGV4O1xuICAgICAgICBpZiAodGhpcy50cmVlID09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoJ0Nhbm5vdCBpbnZhbGlkYXRlIGEgdmlldyB0aGF0IGhhcyBub3QgYmVlbiByZW5kZXJlZCEnKTtcbiAgICAgICAgaWYgKHRoaXMudHJlZS5wYXJlbnROb2RlID09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoJ0F0dGVtcHQgdG8gaW52YWxpZGF0ZSBhIHZpZXcgdGhhdCBoYXMgbm90IGJlZW4gaW5zZXJ0ZWQgdG8gRE9NIScpO1xuICAgICAgICBjaGlsZHMgPSB0aGlzLnRyZWUucGFyZW50Tm9kZS5jaGlsZHJlbjtcbiAgICAgICAgLy9mb3Igc29tZSByZWFzb24gdGhlIHJlZmVyZW5jZSBzdG9yZWQgZG9lcyBub3QgaGF2ZSB0aGUgY29ycmVjdCBwYXJlbnQgbm9kZS5cbiAgICAgICAgLy93ZSBkbyB0aGlzIHRvIGdldCBhICdsaXZlJyB2ZXJzaW9uIG9mIHRoZSBub2RlLlxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcy5sZW5ndGg7IGkrKylcbiAgICAgICAgICAgIGlmIChjaGlsZHNbaV0gPT09IHRoaXMudHJlZSkge1xuICAgICAgICAgICAgICAgIHJlYWxGaXJzdENoaWxkID0gY2hpbGRzW2ldO1xuICAgICAgICAgICAgICAgIHJlYWxGaXJzdENoaWxkSW5kZXggPSBpO1xuICAgICAgICAgICAgfVxuICAgICAgICBwYXJlbnQucmVwbGFjZUNoaWxkKHRoaXMucmVuZGVyKCksIHJlYWxGaXJzdENoaWxkKTtcbiAgICB9O1xuICAgIE1haW4ucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5pZHMgPSB7fTtcbiAgICAgICAgdGhpcy53aWRnZXRzLmZvckVhY2goZnVuY3Rpb24gKHcpIHsgcmV0dXJuIHcucmVtb3ZlZCgpOyB9KTtcbiAgICAgICAgdGhpcy53aWRnZXRzID0gW107XG4gICAgICAgIHRoaXMudHJlZSA9IHRoaXMudGVtcGxhdGUuY2FsbCh0aGlzLmNvbnRleHQpO1xuICAgICAgICB0aGlzLmlkc1sncm9vdCddID0gKHRoaXMuaWRzWydyb290J10pID8gdGhpcy5pZHNbJ3Jvb3QnXSA6IHRoaXMudHJlZTtcbiAgICAgICAgdGhpcy53aWRnZXRzLmZvckVhY2goZnVuY3Rpb24gKHcpIHsgcmV0dXJuIHcucmVuZGVyZWQoKTsgfSk7XG4gICAgICAgIHJldHVybiB0aGlzLnRyZWU7XG4gICAgfTtcbiAgICByZXR1cm4gTWFpbjtcbn0oKSk7XG5leHBvcnRzLk1haW4gPSBNYWluO1xuZXhwb3J0cy5kZWZhdWx0ID0gTWFpbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRyYXdlci1sYXlvdXQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKiBqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG4vKlxuZXhwb3J0IEJyZWFkQ3J1bWJNZW51IGZyb20gJy4vYnJlYWRjcnVtYnMvQnJlYWRDcnVtYk1lbnUnO1xuZXhwb3J0IEJyZWFkQ3J1bWIgZnJvbSAnLi9icmVhZGNydW1icy9CcmVhZENydW1iJztcbmV4cG9ydCBCdXR0b24gZnJvbSAnLi9idXR0b24vQnV0dG9uJztcbmV4cG9ydCBNb2RhbCBmcm9tICcuL21vZGFsL01vZGFsJztcbmV4cG9ydCBNb2RhbEhlYWRlciBmcm9tICcuL21vZGFsL01vZGFsSGVhZGVyJztcbmV4cG9ydCBNb2RhbEJvZHkgZnJvbSAnLi9tb2RhbC9Nb2RhbEJvZHknO1xuZXhwb3J0IE1vZGFsRm9vdGVyIGZyb20gJy4vbW9kYWwvTW9kYWxGb290ZXInO1xuZXhwb3J0IENvbnRhaW5lciBmcm9tICcuL2NvbnRhaW5lci9Db250YWluZXInO1xuZXhwb3J0IENvbHVtbiBmcm9tICcuL2NvbHVtbi9Db2x1bW4nO1xuZXhwb3J0IFJvdyBmcm9tICcuL3Jvdy9Sb3cnO1xuZXhwb3J0IFRhYmxlIGZyb20gJy4vdGFibGUvVGFibGUnO1xuZXhwb3J0IEF1dG9jb21wbGV0ZSBmcm9tICcuL2F1dG9jb21wbGV0ZS9BdXRvY29tcGxldGUnO1xuZXhwb3J0IElucHV0IGZyb20gJy4vaW5wdXQvSW5wdXQnO1xuZXhwb3J0IFNlbGVjdCBmcm9tICcuL3NlbGVjdC9TZWxlY3QnO1xuZXhwb3J0IFN3aXRjaCBmcm9tICcuL3N3aXRjaC9Td2l0Y2gnO1xuZXhwb3J0IEp1bWJvdHJvbiBmcm9tICcuL2p1bWJvdHJvbi9KdW1ib3Ryb24nO1xuZXhwb3J0IFdlbGwgZnJvbSAnLi93ZWxsL1dlbGwnO1xuZXhwb3J0IFBhbmVsIGZyb20gJy4vcGFuZWwvUGFuZWwnO1xuZXhwb3J0IFBhbmVsSGVhZGVyIGZyb20gJy4vcGFuZWwvSGVhZGVyJztcbmV4cG9ydCBQYW5lbEJvZHkgZnJvbSAnLi9wYW5lbC9Cb2R5JztcbmV4cG9ydCBQYW5lbEZvb3RlciBmcm9tICcuL3BhbmVsL0Zvb3Rlcic7XG5leHBvcnQgQ2FyZCBmcm9tICcuL2NhcmQvQ2FyZCc7XG5leHBvcnQgQ2FyZEltYWdlIGZyb20gJy4vY2FyZC9DYXJkSW1hZ2UnO1xuZXhwb3J0IENhcmRUaXRsZSBmcm9tICcuL2NhcmQvQ2FyZFRpdGxlJztcbmV4cG9ydCBDYXJkQmxvY2sgZnJvbSAnLi9jYXJkL0NhcmRCbG9jayc7XG5leHBvcnQgVGFiIGZyb20gJy4vdGFicy9UYWInO1xuZXhwb3J0IFRhYnMgZnJvbSAnLi90YWJzL1RhYnMnO1xuZXhwb3J0IExpc3RHcm91cCBmcm9tICcuL2xpc3QtZ3JvdXAvTGlzdEdyb3VwJztcbmV4cG9ydCBMaXN0R3JvdXBJdGVtIGZyb20gJy4vbGlzdC1ncm91cC9MaXN0R3JvdXBJdGVtJztcbmV4cG9ydCBTZWFyY2ggZnJvbSAnLi9zZWFyY2gvU2VhcmNoJztcbiovXG52YXIgRHJhd2VyTGF5b3V0XzEgPSByZXF1aXJlKFwiLi9kcmF3ZXItbGF5b3V0L0RyYXdlckxheW91dFwiKTtcbmV4cG9ydHMuRHJhd2VyTGF5b3V0ID0gRHJhd2VyTGF5b3V0XzEuRHJhd2VyTGF5b3V0O1xudmFyIEFjdGlvbkFyZWFfMSA9IHJlcXVpcmUoXCIuL2FjdGlvbi1hcmVhL0FjdGlvbkFyZWFcIik7XG5leHBvcnRzLkFjdGlvbkFyZWEgPSBBY3Rpb25BcmVhXzEuQWN0aW9uQXJlYTtcbnZhciBNYWluVmlld18xID0gcmVxdWlyZShcIi4vbWFpbi12aWV3L01haW5WaWV3XCIpO1xuZXhwb3J0cy5NYWluVmlldyA9IE1haW5WaWV3XzEuTWFpblZpZXc7XG52YXIgTWVudUJ1dHRvbl8xID0gcmVxdWlyZShcIi4vbWVudS1idXR0b24vTWVudUJ1dHRvblwiKTtcbmV4cG9ydHMuTWVudUJ1dHRvbiA9IE1lbnVCdXR0b25fMS5NZW51QnV0dG9uO1xudmFyIEJ1dHRvbl8xID0gcmVxdWlyZShcIi4vYnV0dG9uL0J1dHRvblwiKTtcbmV4cG9ydHMuQnV0dG9uID0gQnV0dG9uXzEuQnV0dG9uO1xuLyoganNoaW50IGlnbm9yZTplbmQgKi9cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgcnVudGltZV8xID0gcmVxdWlyZShcIkBxdWVuay93bWwvbGliL3J1bnRpbWVcIik7XG52YXIgdXRpbF8xID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi91dGlsXCIpO1xudmFyIG1haW5fdmlld18xID0gcmVxdWlyZShcIi4vd21sL21haW4tdmlld1wiKTtcbi8qKlxuICogTWFpblZpZXcgcHJvdmlkZXMgYSBjb250YWluZXIgZm9yIHRoZSBtYWluIGNvbnRlbnQgb2YgYW4gYXBwbGljYXRpb24uXG4gKi9cbnZhciBNYWluVmlldyA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKE1haW5WaWV3LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIE1haW5WaWV3KCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMudmlldyA9IG5ldyBtYWluX3ZpZXdfMS5NYWluKF90aGlzKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBzZXRDb250ZW50IHJlcGxhY2VzIHRoZSBjb250ZW50IG9mIHRoaXMgdmlldy5cbiAgICAgKi9cbiAgICBNYWluVmlldy5wcm90b3R5cGUuc2V0Q29udGVudCA9IGZ1bmN0aW9uIChyKSB7XG4gICAgICAgIHV0aWxfMS5yZXBsYWNlQ29udGVudChyLCB0aGlzLnZpZXcuZmluZEJ5SWQoJ2NvbnRlbnQnKSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgcmV0dXJuIE1haW5WaWV3O1xufShydW50aW1lXzEuQWJzdHJhY3RXaWRnZXQpKTtcbmV4cG9ydHMuTWFpblZpZXcgPSBNYWluVmlldztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPU1haW5WaWV3LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIFN0eWxlcyA9IHJlcXVpcmUoXCJ3bWwtd2lkZ2V0cy1jb21tb24vU3R5bGVzXCIpO1xudmFyIHV0aWxfMSA9IHJlcXVpcmUoXCJ3bWwtd2lkZ2V0cy1jb21tb24vdXRpbFwiKTtcbmZ1bmN0aW9uICQkYm91bmRhcnlfdG9fZG90KHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlLnNwbGl0KCddWycpLmpvaW4oJy4nKS5zcGxpdCgnWycpLmpvaW4oJy4nKTtcbn1cbmZ1bmN0aW9uICQkc3RyaXBfYnJhY2VzKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlLnNwbGl0KCdbJykuam9pbignLicpLnNwbGl0KCddJykuam9pbignJyk7XG59XG5mdW5jdGlvbiAkJGVzY2FwZV9kb3RzKHZhbHVlKSB7XG4gICAgdmFsdWUgPSB2YWx1ZS5zcGxpdCgnXFwnJyk7XG4gICAgcmV0dXJuICh2YWx1ZS5sZW5ndGggPCAzKSA/IHZhbHVlLmpvaW4oJ1xcJycpIDogdmFsdWUubWFwKGZ1bmN0aW9uIChzZWcpIHtcbiAgICAgICAgaWYgKHNlZy5sZW5ndGggPCAzKVxuICAgICAgICAgICAgcmV0dXJuIHNlZztcbiAgICAgICAgaWYgKChzZWdbMF0gPT09ICcuJykgfHwgKHNlZ1tzZWcubGVuZ3RoIC0gMV0gPT09ICcuJykpXG4gICAgICAgICAgICByZXR1cm4gc2VnO1xuICAgICAgICByZXR1cm4gc2VnLnNwbGl0KCcuJykuam9pbignJiYnKTtcbiAgICB9KS5qb2luKCcnKTtcbn1cbmZ1bmN0aW9uICQkdW5lc2NhcGVfZG90cyh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZS5zcGxpdCgnJiYnKS5qb2luKCcuJyk7XG59XG5mdW5jdGlvbiAkJHBhcnRpZnkodmFsdWUpIHtcbiAgICBpZiAoIXZhbHVlKVxuICAgICAgICByZXR1cm47XG4gICAgcmV0dXJuICQkZXNjYXBlX2RvdHMoJCRzdHJpcF9icmFjZXMoJCRib3VuZGFyeV90b19kb3QoJycgKyB2YWx1ZSkpKS5zcGxpdCgnLicpO1xufVxuZnVuY3Rpb24gJCRwcm9wZXJ0eShwYXRoLCBvKSB7XG4gICAgdmFyIHBhcnRzID0gJCRwYXJ0aWZ5KHBhdGgpO1xuICAgIHZhciBmaXJzdDtcbiAgICBpZiAodHlwZW9mIG8gIT09ICdvYmplY3QnKVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdnZXQoKTogZXhwZWN0cyBhbiBvYmplY3QgZ290ICcgKyB0eXBlb2Ygbyk7XG4gICAgaWYgKHBhcnRzLmxlbmd0aCA9PT0gMSlcbiAgICAgICAgcmV0dXJuIG9bJCR1bmVzY2FwZV9kb3RzKHBhcnRzWzBdKV07XG4gICAgaWYgKHBhcnRzLmxlbmd0aCA9PT0gMClcbiAgICAgICAgcmV0dXJuO1xuICAgIGZpcnN0ID0gb1twYXJ0cy5zaGlmdCgpXTtcbiAgICByZXR1cm4gKCh0eXBlb2YgbyA9PT0gJ29iamVjdCcpICYmIChvICE9PSBudWxsKSkgP1xuICAgICAgICBwYXJ0cy5yZWR1Y2UoZnVuY3Rpb24gKHRhcmdldCwgcHJvcCkge1xuICAgICAgICAgICAgaWYgKHRhcmdldCA9PSBudWxsKVxuICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgICAgICAgICByZXR1cm4gdGFyZ2V0WyQkdW5lc2NhcGVfZG90cyhwcm9wKV07XG4gICAgICAgIH0sIGZpcnN0KSA6IG51bGw7XG59XG5mdW5jdGlvbiAkJGFkb3B0KGNoaWxkLCBlKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoY2hpbGQpKVxuICAgICAgICByZXR1cm4gY2hpbGQuZm9yRWFjaChmdW5jdGlvbiAoaW5uZXJDaGlsZCkgeyByZXR1cm4gJCRhZG9wdChpbm5lckNoaWxkLCBlKTsgfSk7XG4gICAgaWYgKGNoaWxkKVxuICAgICAgICBlLmFwcGVuZENoaWxkKCh0eXBlb2YgY2hpbGQgPT09ICdvYmplY3QnKSA/XG4gICAgICAgICAgICBjaGlsZCA6IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNoaWxkID09IG51bGwgPyAnJyA6IGNoaWxkKSk7XG59XG4vKipcbiAqICQkdGV4dCBjcmVhdGVzIGEgRE9NVGV4dE5vZGVcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICovXG5mdW5jdGlvbiAkJHRleHQodmFsdWUpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodmFsdWUgPT0gbnVsbCA/ICcnIDogdmFsdWUpO1xufVxuLyoqXG4gKiAkJHJlc29sdmUgcHJvcGVydHkgYWNjZXNzIGV4cHJlc3Npb24gdG8gYXZvaWRcbiAqIHRob3dpbmcgZXJyb3JzIGlmIGl0IGRvZXMgbm90IGV4aXN0LlxuICogQHBhcmFtIHtvYmplY3R9IGhlYWRcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoXG4gKi9cbmZ1bmN0aW9uICQkcmVzb2x2ZShoZWFkLCBwYXRoKSB7XG4gICAgdmFyIHJldCA9ICQkcHJvcGVydHkocGF0aCwgaGVhZCk7XG4gICAgcmV0dXJuIChyZXQgPT0gbnVsbCkgPyAnJyA6IHJldDtcbn1cbi8qKlxuICogJCRub2RlIGlzIGNhbGxlZCB0byBjcmVhdGUgYSByZWd1bGFyIERPTSBub2RlXG4gKiBAcGFyYW0ge3N0cmluZ30gdGFnXG4gKiBAcGFyYW0ge29iamVjdH0gYXR0cmlidXRlc1xuICogQHBhcmFtIHthcnJheTxzdHJpbmd8bnVtYmVyfFdpZGdldD59IGNoaWxkcmVuXG4gKiBAcGFyYW0ge1ZpZXd9IHZpZXdcbiAqL1xuZnVuY3Rpb24gJCRub2RlKHRhZywgYXR0cmlidXRlcywgY2hpbGRyZW4sIHZpZXcpIHtcbiAgICB2YXIgZSA9ICh0YWcgPT09ICdmcmFnbWVudCcpID8gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpIDogZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xuICAgIGlmICh0eXBlb2YgYXR0cmlidXRlcy5odG1sID09PSAnb2JqZWN0JylcbiAgICAgICAgT2JqZWN0LmtleXMoYXR0cmlidXRlcy5odG1sKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgYXR0cmlidXRlcy5odG1sW2tleV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBlW2tleV0gPSBhdHRyaWJ1dGVzLmh0bWxba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGUuc2V0QXR0cmlidXRlKGtleSwgYXR0cmlidXRlcy5odG1sW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICBjaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChjKSB7IHJldHVybiAkJGFkb3B0KGMsIGUpOyB9KTtcbiAgICBpZiAoYXR0cmlidXRlcy53bWwpXG4gICAgICAgIGlmIChhdHRyaWJ1dGVzLndtbC5pZClcbiAgICAgICAgICAgIHZpZXcucmVnaXN0ZXIoYXR0cmlidXRlcy53bWwuaWQsIGUpO1xuICAgIHJldHVybiBlO1xufVxuLyoqXG4gKiBBdHRyaWJ1dGVzIHByb3ZpZGVzIGFuIEFQSSBmb3IgcmVhZGluZyB0aGVcbiAqIGF0dHJpYnV0ZXMgc3VwcGxpZWQgdG8gYW4gRWxlbWVudC5cbiAqIEBwYXJhbSB7b2JqZWN0fSBhdHRyc1xuICovXG52YXIgQXR0cmlidXRlcyA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQXR0cmlidXRlcyhfYXR0cnMpIHtcbiAgICAgICAgdGhpcy5fYXR0cnMgPSBfYXR0cnM7XG4gICAgICAgIHRoaXMuX2F0dHJzID0gX2F0dHJzO1xuICAgIH1cbiAgICBBdHRyaWJ1dGVzLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAocGF0aCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWFkKHBhdGgpICE9IG51bGw7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiByZWFkIGEgdmFsdWUgZm9ybSB0aGUgaW50ZXJuYWwgbGlzdC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aFxuICAgICAqIEBwYXJhbSB7Kn0gZGVmYXVsdFZhbHVlIC0gVGhpcyB2YWx1ZSBpcyByZXR1cm5lZCBpZiB0aGUgdmFsdWUgaXMgbm90IHNldC5cbiAgICAgKi9cbiAgICBBdHRyaWJ1dGVzLnByb3RvdHlwZS5yZWFkID0gZnVuY3Rpb24gKHBhdGgsIGRlZmF1bHRWYWx1ZSkge1xuICAgICAgICB2YXIgcmV0ID0gJCRwcm9wZXJ0eShwYXRoLnNwbGl0KCc6Jykuam9pbignLicpLCB0aGlzLl9hdHRycyk7XG4gICAgICAgIHJldHVybiAocmV0ICE9IG51bGwpID8gcmV0IDogKGRlZmF1bHRWYWx1ZSAhPSBudWxsKSA/IGRlZmF1bHRWYWx1ZSA6ICcnO1xuICAgIH07XG4gICAgcmV0dXJuIEF0dHJpYnV0ZXM7XG59KCkpO1xuLyoqXG4gKiAkJHdpZGdldCBjcmVhdGVzIGEgd21sIHdpZGdldC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IENvbnN0cnV0b3JcbiAqIEBwYXJhbSB7b2JqZWN0fSBhdHRyaWJ1dGVzXG4gKiBAcGFyYW0ge2FycmF5PHN0cmluZ3xudW1iZXJ8V2lkZ2V0Pn0gY2hpbGRyZW5cbiAqIEBwYXJhbSB7Vmlld30gdmlld1xuICogQHJldHVybiB7V2lkZ2V0fVxuICovXG5mdW5jdGlvbiAkJHdpZGdldChDb25zdHJ1Y3RvciwgYXR0cmlidXRlcywgY2hpbGRyZW4sIHZpZXcpIHtcbiAgICB2YXIgY2hpbGRzID0gW107XG4gICAgdmFyIHc7XG4gICAgY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoY2hpbGQpIHsgcmV0dXJuIEFycmF5LmlzQXJyYXkoY2hpbGQpID9cbiAgICAgICAgY2hpbGRzLnB1c2guYXBwbHkoY2hpbGRzLCBjaGlsZCkgOiBjaGlsZHMucHVzaChjaGlsZCk7IH0pO1xuICAgIHcgPSBuZXcgQ29uc3RydWN0b3IobmV3IEF0dHJpYnV0ZXMoYXR0cmlidXRlcyksIGNoaWxkcyk7XG4gICAgaWYgKGF0dHJpYnV0ZXMud21sKVxuICAgICAgICBpZiAoYXR0cmlidXRlcy53bWwuaWQpXG4gICAgICAgICAgICB2aWV3LnJlZ2lzdGVyKGF0dHJpYnV0ZXMud21sLmlkLCB3KTtcbiAgICB2aWV3LndpZGdldHMucHVzaCh3KTtcbiAgICByZXR1cm4gdy5yZW5kZXIoKTtcbn1cbi8qKlxuICogJCRpZiBpcyBjYWxsZWQgdG8gY3JlYXRlIGFuIGlmIGNvbmRpdGlvbmFsIGNvbnN0cnVjdFxuICogQHBhcmFtIHsqfSBwcmVkaWNhdGVcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHBvc2l0aXZlXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBuZWdhdGl2ZVxuICovXG5mdW5jdGlvbiAkJGlmKHByZWRpY2F0ZSwgcG9zaXRpdmUsIG5lZ2F0aXZlKSB7XG4gICAgcmV0dXJuIChwcmVkaWNhdGUpID8gcG9zaXRpdmUoKSA6IG5lZ2F0aXZlKCk7XG59XG4vKipcbiAqICQkZm9yIGlzIGNhbGxlZCB0byBjcmVhdGUgYSBmb3IgbG9vcCBjb25zdHJ1Y3RcbiAqIEBwYXJhbSB7SXRlcmFibGV9IGNvbGxlY3Rpb25cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNiXG4gKi9cbmZ1bmN0aW9uICQkZm9yKGNvbGxlY3Rpb24sIGNiKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoY29sbGVjdGlvbikpIHtcbiAgICAgICAgcmV0dXJuIGNvbGxlY3Rpb24ubWFwKGNiKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGNvbGxlY3Rpb24gPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhjb2xsZWN0aW9uKS5tYXAoZnVuY3Rpb24gKGtleSwgXywgYWxsKSB7IHJldHVybiBjYihjb2xsZWN0aW9uW2tleV0sIGtleSwgYWxsKTsgfSk7XG4gICAgfVxuICAgIHJldHVybiBbXTtcbn1cbi8qKlxuICogJCRzd2l0Y2ggc2ltdWxhdGVzIGEgc3dpdGNoIHN0YXRlbWVudFxuICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfGJvb2xlYW59IHZhbHVlXG4gKiBAcGFyYW0ge29iamVjdH0gY2FzZXNcbiAqL1xuZnVuY3Rpb24gJCRzd2l0Y2godmFsdWUsIGNhc2VzKSB7XG4gICAgdmFyIHJlc3VsdCA9IGNhc2VzW3ZhbHVlXTtcbiAgICB2YXIgZGVmYXVsID0gY2FzZXMuZGVmYXVsdDtcbiAgICBpZiAocmVzdWx0KVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIGlmIChkZWZhdWwpXG4gICAgICAgIHJldHVybiBkZWZhdWw7XG59XG52YXIgTWFpbiA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTWFpbihjb250ZXh0KSB7XG4gICAgICAgIHZhciB2aWV3ID0gdGhpcztcbiAgICAgICAgdGhpcy5pZHMgPSB7fTtcbiAgICAgICAgdGhpcy53aWRnZXRzID0gW107XG4gICAgICAgIHRoaXMudHJlZSA9IG51bGw7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gJCRub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogdXRpbF8xLmNvbWJpbmUoWyQkcmVzb2x2ZShTdHlsZXMsICdNQUlOX1ZJRVcnKSwgJCRyZXNvbHZlKFN0eWxlcywgJ0RSQVdFUl9QVVNIQUJMRScpXSkgfSB9LCBbJCRyZXNvbHZlKHRoaXMsICdjaGlsZHJlbicpXSwgdmlldyk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIE1haW4ucmVuZGVyID0gZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICAgICAgcmV0dXJuIChuZXcgTWFpbihjb250ZXh0KSkucmVuZGVyKCk7XG4gICAgfTtcbiAgICBNYWluLnByb3RvdHlwZS5yZWdpc3RlciA9IGZ1bmN0aW9uIChpZCwgdykge1xuICAgICAgICBpZiAodGhpcy5pZHMuaGFzT3duUHJvcGVydHkoaWQpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdEdXBsaWNhdGUgaWQgXFwnJyArIGlkICsgJ1xcJyBkZXRlY3RlZCEnKTtcbiAgICAgICAgdGhpcy5pZHNbaWRdID0gdztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBNYWluLnByb3RvdHlwZS5maW5kQnlJZCA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICByZXR1cm4gKHRoaXMuaWRzW2lkXSkgPyB0aGlzLmlkc1tpZF0gOiBudWxsO1xuICAgIH07XG4gICAgTWFpbi5wcm90b3R5cGUuaW52YWxpZGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNoaWxkcztcbiAgICAgICAgdmFyIHBhcmVudCA9IHRoaXMudHJlZS5wYXJlbnROb2RlO1xuICAgICAgICB2YXIgcmVhbEZpcnN0Q2hpbGQ7XG4gICAgICAgIHZhciByZWFsRmlyc3RDaGlsZEluZGV4O1xuICAgICAgICBpZiAodGhpcy50cmVlID09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoJ0Nhbm5vdCBpbnZhbGlkYXRlIGEgdmlldyB0aGF0IGhhcyBub3QgYmVlbiByZW5kZXJlZCEnKTtcbiAgICAgICAgaWYgKHRoaXMudHJlZS5wYXJlbnROb2RlID09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoJ0F0dGVtcHQgdG8gaW52YWxpZGF0ZSBhIHZpZXcgdGhhdCBoYXMgbm90IGJlZW4gaW5zZXJ0ZWQgdG8gRE9NIScpO1xuICAgICAgICBjaGlsZHMgPSB0aGlzLnRyZWUucGFyZW50Tm9kZS5jaGlsZHJlbjtcbiAgICAgICAgLy9mb3Igc29tZSByZWFzb24gdGhlIHJlZmVyZW5jZSBzdG9yZWQgZG9lcyBub3QgaGF2ZSB0aGUgY29ycmVjdCBwYXJlbnQgbm9kZS5cbiAgICAgICAgLy93ZSBkbyB0aGlzIHRvIGdldCBhICdsaXZlJyB2ZXJzaW9uIG9mIHRoZSBub2RlLlxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcy5sZW5ndGg7IGkrKylcbiAgICAgICAgICAgIGlmIChjaGlsZHNbaV0gPT09IHRoaXMudHJlZSkge1xuICAgICAgICAgICAgICAgIHJlYWxGaXJzdENoaWxkID0gY2hpbGRzW2ldO1xuICAgICAgICAgICAgICAgIHJlYWxGaXJzdENoaWxkSW5kZXggPSBpO1xuICAgICAgICAgICAgfVxuICAgICAgICBwYXJlbnQucmVwbGFjZUNoaWxkKHRoaXMucmVuZGVyKCksIHJlYWxGaXJzdENoaWxkKTtcbiAgICB9O1xuICAgIE1haW4ucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5pZHMgPSB7fTtcbiAgICAgICAgdGhpcy53aWRnZXRzLmZvckVhY2goZnVuY3Rpb24gKHcpIHsgcmV0dXJuIHcucmVtb3ZlZCgpOyB9KTtcbiAgICAgICAgdGhpcy53aWRnZXRzID0gW107XG4gICAgICAgIHRoaXMudHJlZSA9IHRoaXMudGVtcGxhdGUuY2FsbCh0aGlzLmNvbnRleHQpO1xuICAgICAgICB0aGlzLmlkc1sncm9vdCddID0gKHRoaXMuaWRzWydyb290J10pID8gdGhpcy5pZHNbJ3Jvb3QnXSA6IHRoaXMudHJlZTtcbiAgICAgICAgdGhpcy53aWRnZXRzLmZvckVhY2goZnVuY3Rpb24gKHcpIHsgcmV0dXJuIHcucmVuZGVyZWQoKTsgfSk7XG4gICAgICAgIHJldHVybiB0aGlzLnRyZWU7XG4gICAgfTtcbiAgICByZXR1cm4gTWFpbjtcbn0oKSk7XG5leHBvcnRzLk1haW4gPSBNYWluO1xuZXhwb3J0cy5kZWZhdWx0ID0gTWFpbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1haW4tdmlldy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJ1bnRpbWVfMSA9IHJlcXVpcmUoXCJAcXVlbmsvd21sL2xpYi9ydW50aW1lXCIpO1xudmFyIG1lbnVfYnV0dG9uXzEgPSByZXF1aXJlKFwiLi93bWwvbWVudV9idXR0b25cIik7XG4vKipcbiAqIE1lbnVCdXR0b24gcHJvdmlkZXMgYSAnaGFtYnVyZ2VyJyBtZW51IGJ1dHRvbi5cbiAqL1xudmFyIE1lbnVCdXR0b24gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhNZW51QnV0dG9uLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIE1lbnVCdXR0b24oKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IG1lbnVfYnV0dG9uXzEuZGVmYXVsdChfdGhpcyk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIE1lbnVCdXR0b247XG59KHJ1bnRpbWVfMS5BYnN0cmFjdFdpZGdldCkpO1xuZXhwb3J0cy5NZW51QnV0dG9uID0gTWVudUJ1dHRvbjtcbmV4cG9ydHMuZGVmYXVsdCA9IE1lbnVCdXR0b247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1NZW51QnV0dG9uLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIFN0eWxlID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi9TdHlsZXNcIik7XG52YXIgdXRpbF8xID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi91dGlsXCIpO1xuZnVuY3Rpb24gJCRib3VuZGFyeV90b19kb3QodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUuc3BsaXQoJ11bJykuam9pbignLicpLnNwbGl0KCdbJykuam9pbignLicpO1xufVxuZnVuY3Rpb24gJCRzdHJpcF9icmFjZXModmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUuc3BsaXQoJ1snKS5qb2luKCcuJykuc3BsaXQoJ10nKS5qb2luKCcnKTtcbn1cbmZ1bmN0aW9uICQkZXNjYXBlX2RvdHModmFsdWUpIHtcbiAgICB2YWx1ZSA9IHZhbHVlLnNwbGl0KCdcXCcnKTtcbiAgICByZXR1cm4gKHZhbHVlLmxlbmd0aCA8IDMpID8gdmFsdWUuam9pbignXFwnJykgOiB2YWx1ZS5tYXAoZnVuY3Rpb24gKHNlZykge1xuICAgICAgICBpZiAoc2VnLmxlbmd0aCA8IDMpXG4gICAgICAgICAgICByZXR1cm4gc2VnO1xuICAgICAgICBpZiAoKHNlZ1swXSA9PT0gJy4nKSB8fCAoc2VnW3NlZy5sZW5ndGggLSAxXSA9PT0gJy4nKSlcbiAgICAgICAgICAgIHJldHVybiBzZWc7XG4gICAgICAgIHJldHVybiBzZWcuc3BsaXQoJy4nKS5qb2luKCcmJicpO1xuICAgIH0pLmpvaW4oJycpO1xufVxuZnVuY3Rpb24gJCR1bmVzY2FwZV9kb3RzKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlLnNwbGl0KCcmJicpLmpvaW4oJy4nKTtcbn1cbmZ1bmN0aW9uICQkcGFydGlmeSh2YWx1ZSkge1xuICAgIGlmICghdmFsdWUpXG4gICAgICAgIHJldHVybjtcbiAgICByZXR1cm4gJCRlc2NhcGVfZG90cygkJHN0cmlwX2JyYWNlcygkJGJvdW5kYXJ5X3RvX2RvdCgnJyArIHZhbHVlKSkpLnNwbGl0KCcuJyk7XG59XG5mdW5jdGlvbiAkJHByb3BlcnR5KHBhdGgsIG8pIHtcbiAgICB2YXIgcGFydHMgPSAkJHBhcnRpZnkocGF0aCk7XG4gICAgdmFyIGZpcnN0O1xuICAgIGlmICh0eXBlb2YgbyAhPT0gJ29iamVjdCcpXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2dldCgpOiBleHBlY3RzIGFuIG9iamVjdCBnb3QgJyArIHR5cGVvZiBvKTtcbiAgICBpZiAocGFydHMubGVuZ3RoID09PSAxKVxuICAgICAgICByZXR1cm4gb1skJHVuZXNjYXBlX2RvdHMocGFydHNbMF0pXTtcbiAgICBpZiAocGFydHMubGVuZ3RoID09PSAwKVxuICAgICAgICByZXR1cm47XG4gICAgZmlyc3QgPSBvW3BhcnRzLnNoaWZ0KCldO1xuICAgIHJldHVybiAoKHR5cGVvZiBvID09PSAnb2JqZWN0JykgJiYgKG8gIT09IG51bGwpKSA/XG4gICAgICAgIHBhcnRzLnJlZHVjZShmdW5jdGlvbiAodGFyZ2V0LCBwcm9wKSB7XG4gICAgICAgICAgICBpZiAodGFyZ2V0ID09IG51bGwpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICAgICAgICAgIHJldHVybiB0YXJnZXRbJCR1bmVzY2FwZV9kb3RzKHByb3ApXTtcbiAgICAgICAgfSwgZmlyc3QpIDogbnVsbDtcbn1cbmZ1bmN0aW9uICQkYWRvcHQoY2hpbGQsIGUpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShjaGlsZCkpXG4gICAgICAgIHJldHVybiBjaGlsZC5mb3JFYWNoKGZ1bmN0aW9uIChpbm5lckNoaWxkKSB7IHJldHVybiAkJGFkb3B0KGlubmVyQ2hpbGQsIGUpOyB9KTtcbiAgICBpZiAoY2hpbGQpXG4gICAgICAgIGUuYXBwZW5kQ2hpbGQoKHR5cGVvZiBjaGlsZCA9PT0gJ29iamVjdCcpID9cbiAgICAgICAgICAgIGNoaWxkIDogZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY2hpbGQgPT0gbnVsbCA/ICcnIDogY2hpbGQpKTtcbn1cbi8qKlxuICogJCR0ZXh0IGNyZWF0ZXMgYSBET01UZXh0Tm9kZVxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gKi9cbmZ1bmN0aW9uICQkdGV4dCh2YWx1ZSkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh2YWx1ZSA9PSBudWxsID8gJycgOiB2YWx1ZSk7XG59XG4vKipcbiAqICQkcmVzb2x2ZSBwcm9wZXJ0eSBhY2Nlc3MgZXhwcmVzc2lvbiB0byBhdm9pZFxuICogdGhvd2luZyBlcnJvcnMgaWYgaXQgZG9lcyBub3QgZXhpc3QuXG4gKiBAcGFyYW0ge29iamVjdH0gaGVhZFxuICogQHBhcmFtIHtzdHJpbmd9IHBhdGhcbiAqL1xuZnVuY3Rpb24gJCRyZXNvbHZlKGhlYWQsIHBhdGgpIHtcbiAgICB2YXIgcmV0ID0gJCRwcm9wZXJ0eShwYXRoLCBoZWFkKTtcbiAgICByZXR1cm4gKHJldCA9PSBudWxsKSA/ICcnIDogcmV0O1xufVxuLyoqXG4gKiAkJG5vZGUgaXMgY2FsbGVkIHRvIGNyZWF0ZSBhIHJlZ3VsYXIgRE9NIG5vZGVcbiAqIEBwYXJhbSB7c3RyaW5nfSB0YWdcbiAqIEBwYXJhbSB7b2JqZWN0fSBhdHRyaWJ1dGVzXG4gKiBAcGFyYW0ge2FycmF5PHN0cmluZ3xudW1iZXJ8V2lkZ2V0Pn0gY2hpbGRyZW5cbiAqIEBwYXJhbSB7Vmlld30gdmlld1xuICovXG5mdW5jdGlvbiAkJG5vZGUodGFnLCBhdHRyaWJ1dGVzLCBjaGlsZHJlbiwgdmlldykge1xuICAgIHZhciBlID0gKHRhZyA9PT0gJ2ZyYWdtZW50JykgPyBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCkgOiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XG4gICAgaWYgKHR5cGVvZiBhdHRyaWJ1dGVzLmh0bWwgPT09ICdvYmplY3QnKVxuICAgICAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzLmh0bWwpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBhdHRyaWJ1dGVzLmh0bWxba2V5XSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIGVba2V5XSA9IGF0dHJpYnV0ZXMuaHRtbFtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZS5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyaWJ1dGVzLmh0bWxba2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIGNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKGMpIHsgcmV0dXJuICQkYWRvcHQoYywgZSk7IH0pO1xuICAgIGlmIChhdHRyaWJ1dGVzLndtbClcbiAgICAgICAgaWYgKGF0dHJpYnV0ZXMud21sLmlkKVxuICAgICAgICAgICAgdmlldy5yZWdpc3RlcihhdHRyaWJ1dGVzLndtbC5pZCwgZSk7XG4gICAgcmV0dXJuIGU7XG59XG4vKipcbiAqIEF0dHJpYnV0ZXMgcHJvdmlkZXMgYW4gQVBJIGZvciByZWFkaW5nIHRoZVxuICogYXR0cmlidXRlcyBzdXBwbGllZCB0byBhbiBFbGVtZW50LlxuICogQHBhcmFtIHtvYmplY3R9IGF0dHJzXG4gKi9cbnZhciBBdHRyaWJ1dGVzID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBBdHRyaWJ1dGVzKF9hdHRycykge1xuICAgICAgICB0aGlzLl9hdHRycyA9IF9hdHRycztcbiAgICAgICAgdGhpcy5fYXR0cnMgPSBfYXR0cnM7XG4gICAgfVxuICAgIEF0dHJpYnV0ZXMucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uIChwYXRoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlYWQocGF0aCkgIT0gbnVsbDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIHJlYWQgYSB2YWx1ZSBmb3JtIHRoZSBpbnRlcm5hbCBsaXN0LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoXG4gICAgICogQHBhcmFtIHsqfSBkZWZhdWx0VmFsdWUgLSBUaGlzIHZhbHVlIGlzIHJldHVybmVkIGlmIHRoZSB2YWx1ZSBpcyBub3Qgc2V0LlxuICAgICAqL1xuICAgIEF0dHJpYnV0ZXMucHJvdG90eXBlLnJlYWQgPSBmdW5jdGlvbiAocGF0aCwgZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgIHZhciByZXQgPSAkJHByb3BlcnR5KHBhdGguc3BsaXQoJzonKS5qb2luKCcuJyksIHRoaXMuX2F0dHJzKTtcbiAgICAgICAgcmV0dXJuIChyZXQgIT0gbnVsbCkgPyByZXQgOiAoZGVmYXVsdFZhbHVlICE9IG51bGwpID8gZGVmYXVsdFZhbHVlIDogJyc7XG4gICAgfTtcbiAgICByZXR1cm4gQXR0cmlidXRlcztcbn0oKSk7XG4vKipcbiAqICQkd2lkZ2V0IGNyZWF0ZXMgYSB3bWwgd2lkZ2V0LlxuICogQHBhcmFtIHtmdW5jdGlvbn0gQ29uc3RydXRvclxuICogQHBhcmFtIHtvYmplY3R9IGF0dHJpYnV0ZXNcbiAqIEBwYXJhbSB7YXJyYXk8c3RyaW5nfG51bWJlcnxXaWRnZXQ+fSBjaGlsZHJlblxuICogQHBhcmFtIHtWaWV3fSB2aWV3XG4gKiBAcmV0dXJuIHtXaWRnZXR9XG4gKi9cbmZ1bmN0aW9uICQkd2lkZ2V0KENvbnN0cnVjdG9yLCBhdHRyaWJ1dGVzLCBjaGlsZHJlbiwgdmlldykge1xuICAgIHZhciBjaGlsZHMgPSBbXTtcbiAgICB2YXIgdztcbiAgICBjaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChjaGlsZCkgeyByZXR1cm4gQXJyYXkuaXNBcnJheShjaGlsZCkgP1xuICAgICAgICBjaGlsZHMucHVzaC5hcHBseShjaGlsZHMsIGNoaWxkKSA6IGNoaWxkcy5wdXNoKGNoaWxkKTsgfSk7XG4gICAgdyA9IG5ldyBDb25zdHJ1Y3RvcihuZXcgQXR0cmlidXRlcyhhdHRyaWJ1dGVzKSwgY2hpbGRzKTtcbiAgICBpZiAoYXR0cmlidXRlcy53bWwpXG4gICAgICAgIGlmIChhdHRyaWJ1dGVzLndtbC5pZClcbiAgICAgICAgICAgIHZpZXcucmVnaXN0ZXIoYXR0cmlidXRlcy53bWwuaWQsIHcpO1xuICAgIHZpZXcud2lkZ2V0cy5wdXNoKHcpO1xuICAgIHJldHVybiB3LnJlbmRlcigpO1xufVxuLyoqXG4gKiAkJGlmIGlzIGNhbGxlZCB0byBjcmVhdGUgYW4gaWYgY29uZGl0aW9uYWwgY29uc3RydWN0XG4gKiBAcGFyYW0geyp9IHByZWRpY2F0ZVxuICogQHBhcmFtIHtmdW5jdGlvbn0gcG9zaXRpdmVcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IG5lZ2F0aXZlXG4gKi9cbmZ1bmN0aW9uICQkaWYocHJlZGljYXRlLCBwb3NpdGl2ZSwgbmVnYXRpdmUpIHtcbiAgICByZXR1cm4gKHByZWRpY2F0ZSkgPyBwb3NpdGl2ZSgpIDogbmVnYXRpdmUoKTtcbn1cbi8qKlxuICogJCRmb3IgaXMgY2FsbGVkIHRvIGNyZWF0ZSBhIGZvciBsb29wIGNvbnN0cnVjdFxuICogQHBhcmFtIHtJdGVyYWJsZX0gY29sbGVjdGlvblxuICogQHBhcmFtIHtmdW5jdGlvbn0gY2JcbiAqL1xuZnVuY3Rpb24gJCRmb3IoY29sbGVjdGlvbiwgY2IpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShjb2xsZWN0aW9uKSkge1xuICAgICAgICByZXR1cm4gY29sbGVjdGlvbi5tYXAoY2IpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgY29sbGVjdGlvbiA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGNvbGxlY3Rpb24pLm1hcChmdW5jdGlvbiAoa2V5LCBfLCBhbGwpIHsgcmV0dXJuIGNiKGNvbGxlY3Rpb25ba2V5XSwga2V5LCBhbGwpOyB9KTtcbiAgICB9XG4gICAgcmV0dXJuIFtdO1xufVxuLyoqXG4gKiAkJHN3aXRjaCBzaW11bGF0ZXMgYSBzd2l0Y2ggc3RhdGVtZW50XG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ8Ym9vbGVhbn0gdmFsdWVcbiAqIEBwYXJhbSB7b2JqZWN0fSBjYXNlc1xuICovXG5mdW5jdGlvbiAkJHN3aXRjaCh2YWx1ZSwgY2FzZXMpIHtcbiAgICB2YXIgcmVzdWx0ID0gY2FzZXNbdmFsdWVdO1xuICAgIHZhciBkZWZhdWwgPSBjYXNlcy5kZWZhdWx0O1xuICAgIGlmIChyZXN1bHQpXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgaWYgKGRlZmF1bClcbiAgICAgICAgcmV0dXJuIGRlZmF1bDtcbn1cbnZhciBNYWluID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBNYWluKGNvbnRleHQpIHtcbiAgICAgICAgdmFyIHZpZXcgPSB0aGlzO1xuICAgICAgICB0aGlzLmlkcyA9IHt9O1xuICAgICAgICB0aGlzLndpZGdldHMgPSBbXTtcbiAgICAgICAgdGhpcy50cmVlID0gbnVsbDtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAkJG5vZGUoJ2J1dHRvbicsIHsgaHRtbDogeyAnY2xhc3MnOiAkJHJlc29sdmUoU3R5bGUsICdNRU5VX0JVVFRPTicpLCAnb25jbGljayc6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpvbkNsaWNrJywgdXRpbF8xLm5vb3ApIH0gfSwgWyQkbm9kZSgnc3BhbicsIHsgaHRtbDogeyAnY2xhc3MnOiBcIlwiIH0gfSwgW10sIHZpZXcpLCAkJG5vZGUoJ3NwYW4nLCB7IGh0bWw6IHsgJ2NsYXNzJzogXCJcIiB9IH0sIFtdLCB2aWV3KSwgJCRub2RlKCdzcGFuJywgeyBodG1sOiB7ICdjbGFzcyc6IFwiXCIgfSB9LCBbXSwgdmlldyldLCB2aWV3KTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgTWFpbi5yZW5kZXIgPSBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgICAgICByZXR1cm4gKG5ldyBNYWluKGNvbnRleHQpKS5yZW5kZXIoKTtcbiAgICB9O1xuICAgIE1haW4ucHJvdG90eXBlLnJlZ2lzdGVyID0gZnVuY3Rpb24gKGlkLCB3KSB7XG4gICAgICAgIGlmICh0aGlzLmlkcy5oYXNPd25Qcm9wZXJ0eShpZCkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0R1cGxpY2F0ZSBpZCBcXCcnICsgaWQgKyAnXFwnIGRldGVjdGVkIScpO1xuICAgICAgICB0aGlzLmlkc1tpZF0gPSB3O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIE1haW4ucHJvdG90eXBlLmZpbmRCeUlkID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5pZHNbaWRdKSA/IHRoaXMuaWRzW2lkXSA6IG51bGw7XG4gICAgfTtcbiAgICBNYWluLnByb3RvdHlwZS5pbnZhbGlkYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY2hpbGRzO1xuICAgICAgICB2YXIgcGFyZW50ID0gdGhpcy50cmVlLnBhcmVudE5vZGU7XG4gICAgICAgIHZhciByZWFsRmlyc3RDaGlsZDtcbiAgICAgICAgdmFyIHJlYWxGaXJzdENoaWxkSW5kZXg7XG4gICAgICAgIGlmICh0aGlzLnRyZWUgPT0gbnVsbClcbiAgICAgICAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcignQ2Fubm90IGludmFsaWRhdGUgYSB2aWV3IHRoYXQgaGFzIG5vdCBiZWVuIHJlbmRlcmVkIScpO1xuICAgICAgICBpZiAodGhpcy50cmVlLnBhcmVudE5vZGUgPT0gbnVsbClcbiAgICAgICAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcignQXR0ZW1wdCB0byBpbnZhbGlkYXRlIGEgdmlldyB0aGF0IGhhcyBub3QgYmVlbiBpbnNlcnRlZCB0byBET00hJyk7XG4gICAgICAgIGNoaWxkcyA9IHRoaXMudHJlZS5wYXJlbnROb2RlLmNoaWxkcmVuO1xuICAgICAgICAvL2ZvciBzb21lIHJlYXNvbiB0aGUgcmVmZXJlbmNlIHN0b3JlZCBkb2VzIG5vdCBoYXZlIHRoZSBjb3JyZWN0IHBhcmVudCBub2RlLlxuICAgICAgICAvL3dlIGRvIHRoaXMgdG8gZ2V0IGEgJ2xpdmUnIHZlcnNpb24gb2YgdGhlIG5vZGUuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRzLmxlbmd0aDsgaSsrKVxuICAgICAgICAgICAgaWYgKGNoaWxkc1tpXSA9PT0gdGhpcy50cmVlKSB7XG4gICAgICAgICAgICAgICAgcmVhbEZpcnN0Q2hpbGQgPSBjaGlsZHNbaV07XG4gICAgICAgICAgICAgICAgcmVhbEZpcnN0Q2hpbGRJbmRleCA9IGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIHBhcmVudC5yZXBsYWNlQ2hpbGQodGhpcy5yZW5kZXIoKSwgcmVhbEZpcnN0Q2hpbGQpO1xuICAgIH07XG4gICAgTWFpbi5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmlkcyA9IHt9O1xuICAgICAgICB0aGlzLndpZGdldHMuZm9yRWFjaChmdW5jdGlvbiAodykgeyByZXR1cm4gdy5yZW1vdmVkKCk7IH0pO1xuICAgICAgICB0aGlzLndpZGdldHMgPSBbXTtcbiAgICAgICAgdGhpcy50cmVlID0gdGhpcy50ZW1wbGF0ZS5jYWxsKHRoaXMuY29udGV4dCk7XG4gICAgICAgIHRoaXMuaWRzWydyb290J10gPSAodGhpcy5pZHNbJ3Jvb3QnXSkgPyB0aGlzLmlkc1sncm9vdCddIDogdGhpcy50cmVlO1xuICAgICAgICB0aGlzLndpZGdldHMuZm9yRWFjaChmdW5jdGlvbiAodykgeyByZXR1cm4gdy5yZW5kZXJlZCgpOyB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJlZTtcbiAgICB9O1xuICAgIHJldHVybiBNYWluO1xufSgpKTtcbmV4cG9ydHMuTWFpbiA9IE1haW47XG5leHBvcnRzLmRlZmF1bHQgPSBNYWluO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWVudV9idXR0b24uanMubWFwIiwiLyoqXG4gKiBBYnN0cmFjdFdpZGdldFxuICovXG5jbGFzcyBBYnN0cmFjdFdpZGdldCB7XG5cbiAgY29uc3RydWN0b3IoYXR0cnMsIGNoaWxkcmVuKSB7XG5cbiAgICB0aGlzLmF0dHJpYnV0ZXMgPSBhdHRycztcbiAgICB0aGlzLmNoaWxkcmVuID0gY2hpbGRyZW47XG4gICAgdGhpcy52aWV3ID0gbnVsbDtcblxuICB9XG5cbiAgcmVuZGVyZWQoKSB7XG5cbiAgfVxuXG4gIHJlbW92ZWQoKSB7XG5cbiAgfVxuXG4gIHJlbmRlcigpIHtcblxuICAgIHJldHVybiB0aGlzLnZpZXcucmVuZGVyKCk7XG5cbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEFic3RyYWN0V2lkZ2V0XG5cbiIsIi8qanNoaW50IGlnbm9yZTpzdGFydCAqL1xuZXhwb3J0IEFic3RyYWN0V2lkZ2V0IGZyb20gJy4vQWJzdHJhY3RXaWRnZXQnO1xuLypqc2hpbnQgaWdub3JlOmVuZCAqL1xuXG4iLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG52YXIgdmlld18xID0gcmVxdWlyZShcIi4vdmlld1wiKTtcbjtcbnZhciBBcHBsaWNhdGlvbiA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQXBwbGljYXRpb24oKSB7XG4gICAgICAgIHRoaXMucmVjb3JkcyA9IFt7IG5hbWU6ICdKb3phaW4gSHVsZHVtJywgYW1vdW50OiAzMjAwMCB9XTtcbiAgICAgICAgdGhpcy52aWV3ID0gbmV3IHZpZXdfMS5NYWluKHRoaXMpO1xuICAgIH1cbiAgICBBcHBsaWNhdGlvbi5wcm90b3R5cGUudG9nZ2xlRHJhd2VyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnZpZXcuZmluZEJ5SWQoJ2xheW91dCcpLnRvZ2dsZURyYXdlcigpO1xuICAgIH07XG4gICAgQXBwbGljYXRpb24ucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5yZWNvcmRzLnB1c2goe1xuICAgICAgICAgICAgbmFtZTogcHJvbXB0KCdFbnRlciB0aGUgbmFtZScpLFxuICAgICAgICAgICAgYW1vdW50OiBwYXJzZUZsb2F0KHByb21wdCgnRW50ZXIgdGhlIGFtb3VudC4nKSlcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMudmlldy5pbnZhbGlkYXRlKCk7XG4gICAgfTtcbiAgICBBcHBsaWNhdGlvbi5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB3aW5kb3cuYXBwID0gdGhpcztcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21haW4nKS5hcHBlbmRDaGlsZCh0aGlzLnZpZXcucmVuZGVyKCkpO1xuICAgICAgICB0aGlzLmRyYXdlciA9IHRoaXMudmlldy5maW5kQnlJZCgnbGF5b3V0Jyk7XG4gICAgfTtcbiAgICBBcHBsaWNhdGlvbi5tYWluID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gKG5ldyB0aGlzKCkpLnJ1bigpO1xuICAgIH07XG4gICAgcmV0dXJuIEFwcGxpY2F0aW9uO1xufSgpKTtcbmRlc2NyaWJlKCdBcHBsaWNhdGlvbicsIGZ1bmN0aW9uICgpIHtcbiAgICBpdCgnc2hvdWxkIHJlbmRlcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgQXBwbGljYXRpb24ubWFpbigpO1xuICAgIH0pO1xufSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG52YXIgY29tcG9uZW50c18xID0gcmVxdWlyZShcIkBxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50c1wiKTtcbmZ1bmN0aW9uICQkYm91bmRhcnlfdG9fZG90KHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlLnNwbGl0KCddWycpLmpvaW4oJy4nKS5zcGxpdCgnWycpLmpvaW4oJy4nKTtcbn1cbmZ1bmN0aW9uICQkc3RyaXBfYnJhY2VzKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlLnNwbGl0KCdbJykuam9pbignLicpLnNwbGl0KCddJykuam9pbignJyk7XG59XG5mdW5jdGlvbiAkJGVzY2FwZV9kb3RzKHZhbHVlKSB7XG4gICAgdmFsdWUgPSB2YWx1ZS5zcGxpdCgnXFwnJyk7XG4gICAgcmV0dXJuICh2YWx1ZS5sZW5ndGggPCAzKSA/IHZhbHVlLmpvaW4oJ1xcJycpIDogdmFsdWUubWFwKGZ1bmN0aW9uIChzZWcpIHtcbiAgICAgICAgaWYgKHNlZy5sZW5ndGggPCAzKVxuICAgICAgICAgICAgcmV0dXJuIHNlZztcbiAgICAgICAgaWYgKChzZWdbMF0gPT09ICcuJykgfHwgKHNlZ1tzZWcubGVuZ3RoIC0gMV0gPT09ICcuJykpXG4gICAgICAgICAgICByZXR1cm4gc2VnO1xuICAgICAgICByZXR1cm4gc2VnLnNwbGl0KCcuJykuam9pbignJiYnKTtcbiAgICB9KS5qb2luKCcnKTtcbn1cbmZ1bmN0aW9uICQkdW5lc2NhcGVfZG90cyh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZS5zcGxpdCgnJiYnKS5qb2luKCcuJyk7XG59XG5mdW5jdGlvbiAkJHBhcnRpZnkodmFsdWUpIHtcbiAgICBpZiAoIXZhbHVlKVxuICAgICAgICByZXR1cm47XG4gICAgcmV0dXJuICQkZXNjYXBlX2RvdHMoJCRzdHJpcF9icmFjZXMoJCRib3VuZGFyeV90b19kb3QoJycgKyB2YWx1ZSkpKS5zcGxpdCgnLicpO1xufVxuZnVuY3Rpb24gJCRwcm9wZXJ0eShwYXRoLCBvKSB7XG4gICAgdmFyIHBhcnRzID0gJCRwYXJ0aWZ5KHBhdGgpO1xuICAgIHZhciBmaXJzdDtcbiAgICBpZiAodHlwZW9mIG8gIT09ICdvYmplY3QnKVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdnZXQoKTogZXhwZWN0cyBhbiBvYmplY3QgZ290ICcgKyB0eXBlb2Ygbyk7XG4gICAgaWYgKHBhcnRzLmxlbmd0aCA9PT0gMSlcbiAgICAgICAgcmV0dXJuIG9bJCR1bmVzY2FwZV9kb3RzKHBhcnRzWzBdKV07XG4gICAgaWYgKHBhcnRzLmxlbmd0aCA9PT0gMClcbiAgICAgICAgcmV0dXJuO1xuICAgIGZpcnN0ID0gb1twYXJ0cy5zaGlmdCgpXTtcbiAgICByZXR1cm4gKCh0eXBlb2YgbyA9PT0gJ29iamVjdCcpICYmIChvICE9PSBudWxsKSkgP1xuICAgICAgICBwYXJ0cy5yZWR1Y2UoZnVuY3Rpb24gKHRhcmdldCwgcHJvcCkge1xuICAgICAgICAgICAgaWYgKHRhcmdldCA9PSBudWxsKVxuICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgICAgICAgICByZXR1cm4gdGFyZ2V0WyQkdW5lc2NhcGVfZG90cyhwcm9wKV07XG4gICAgICAgIH0sIGZpcnN0KSA6IG51bGw7XG59XG5mdW5jdGlvbiAkJGFkb3B0KGNoaWxkLCBlKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoY2hpbGQpKVxuICAgICAgICByZXR1cm4gY2hpbGQuZm9yRWFjaChmdW5jdGlvbiAoaW5uZXJDaGlsZCkgeyByZXR1cm4gJCRhZG9wdChpbm5lckNoaWxkLCBlKTsgfSk7XG4gICAgaWYgKGNoaWxkKVxuICAgICAgICBlLmFwcGVuZENoaWxkKCh0eXBlb2YgY2hpbGQgPT09ICdvYmplY3QnKSA/XG4gICAgICAgICAgICBjaGlsZCA6IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNoaWxkID09IG51bGwgPyAnJyA6IGNoaWxkKSk7XG59XG4vKipcbiAqICQkdGV4dCBjcmVhdGVzIGEgRE9NVGV4dE5vZGVcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICovXG5mdW5jdGlvbiAkJHRleHQodmFsdWUpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodmFsdWUgPT0gbnVsbCA/ICcnIDogdmFsdWUpO1xufVxuLyoqXG4gKiAkJHJlc29sdmUgcHJvcGVydHkgYWNjZXNzIGV4cHJlc3Npb24gdG8gYXZvaWRcbiAqIHRob3dpbmcgZXJyb3JzIGlmIGl0IGRvZXMgbm90IGV4aXN0LlxuICogQHBhcmFtIHtvYmplY3R9IGhlYWRcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoXG4gKi9cbmZ1bmN0aW9uICQkcmVzb2x2ZShoZWFkLCBwYXRoKSB7XG4gICAgdmFyIHJldCA9ICQkcHJvcGVydHkocGF0aCwgaGVhZCk7XG4gICAgcmV0dXJuIChyZXQgPT0gbnVsbCkgPyAnJyA6IHJldDtcbn1cbi8qKlxuICogJCRub2RlIGlzIGNhbGxlZCB0byBjcmVhdGUgYSByZWd1bGFyIERPTSBub2RlXG4gKiBAcGFyYW0ge3N0cmluZ30gdGFnXG4gKiBAcGFyYW0ge29iamVjdH0gYXR0cmlidXRlc1xuICogQHBhcmFtIHthcnJheTxzdHJpbmd8bnVtYmVyfFdpZGdldD59IGNoaWxkcmVuXG4gKiBAcGFyYW0ge1ZpZXd9IHZpZXdcbiAqL1xuZnVuY3Rpb24gJCRub2RlKHRhZywgYXR0cmlidXRlcywgY2hpbGRyZW4sIHZpZXcpIHtcbiAgICB2YXIgZSA9ICh0YWcgPT09ICdmcmFnbWVudCcpID8gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpIDogZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xuICAgIGlmICh0eXBlb2YgYXR0cmlidXRlcy5odG1sID09PSAnb2JqZWN0JylcbiAgICAgICAgT2JqZWN0LmtleXMoYXR0cmlidXRlcy5odG1sKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgYXR0cmlidXRlcy5odG1sW2tleV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBlW2tleV0gPSBhdHRyaWJ1dGVzLmh0bWxba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGUuc2V0QXR0cmlidXRlKGtleSwgYXR0cmlidXRlcy5odG1sW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICBjaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChjKSB7IHJldHVybiAkJGFkb3B0KGMsIGUpOyB9KTtcbiAgICBpZiAoYXR0cmlidXRlcy53bWwpXG4gICAgICAgIGlmIChhdHRyaWJ1dGVzLndtbC5pZClcbiAgICAgICAgICAgIHZpZXcucmVnaXN0ZXIoYXR0cmlidXRlcy53bWwuaWQsIGUpO1xuICAgIHJldHVybiBlO1xufVxuLyoqXG4gKiBBdHRyaWJ1dGVzIHByb3ZpZGVzIGFuIEFQSSBmb3IgcmVhZGluZyB0aGVcbiAqIGF0dHJpYnV0ZXMgc3VwcGxpZWQgdG8gYW4gRWxlbWVudC5cbiAqIEBwYXJhbSB7b2JqZWN0fSBhdHRyc1xuICovXG52YXIgQXR0cmlidXRlcyA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQXR0cmlidXRlcyhfYXR0cnMpIHtcbiAgICAgICAgdGhpcy5fYXR0cnMgPSBfYXR0cnM7XG4gICAgICAgIHRoaXMuX2F0dHJzID0gX2F0dHJzO1xuICAgIH1cbiAgICBBdHRyaWJ1dGVzLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAocGF0aCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWFkKHBhdGgpICE9IG51bGw7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiByZWFkIGEgdmFsdWUgZm9ybSB0aGUgaW50ZXJuYWwgbGlzdC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aFxuICAgICAqIEBwYXJhbSB7Kn0gZGVmYXVsdFZhbHVlIC0gVGhpcyB2YWx1ZSBpcyByZXR1cm5lZCBpZiB0aGUgdmFsdWUgaXMgbm90IHNldC5cbiAgICAgKi9cbiAgICBBdHRyaWJ1dGVzLnByb3RvdHlwZS5yZWFkID0gZnVuY3Rpb24gKHBhdGgsIGRlZmF1bHRWYWx1ZSkge1xuICAgICAgICB2YXIgcmV0ID0gJCRwcm9wZXJ0eShwYXRoLnNwbGl0KCc6Jykuam9pbignLicpLCB0aGlzLl9hdHRycyk7XG4gICAgICAgIHJldHVybiAocmV0ICE9IG51bGwpID8gcmV0IDogKGRlZmF1bHRWYWx1ZSAhPSBudWxsKSA/IGRlZmF1bHRWYWx1ZSA6ICcnO1xuICAgIH07XG4gICAgcmV0dXJuIEF0dHJpYnV0ZXM7XG59KCkpO1xuLyoqXG4gKiAkJHdpZGdldCBjcmVhdGVzIGEgd21sIHdpZGdldC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IENvbnN0cnV0b3JcbiAqIEBwYXJhbSB7b2JqZWN0fSBhdHRyaWJ1dGVzXG4gKiBAcGFyYW0ge2FycmF5PHN0cmluZ3xudW1iZXJ8V2lkZ2V0Pn0gY2hpbGRyZW5cbiAqIEBwYXJhbSB7Vmlld30gdmlld1xuICogQHJldHVybiB7V2lkZ2V0fVxuICovXG5mdW5jdGlvbiAkJHdpZGdldChDb25zdHJ1Y3RvciwgYXR0cmlidXRlcywgY2hpbGRyZW4sIHZpZXcpIHtcbiAgICB2YXIgY2hpbGRzID0gW107XG4gICAgdmFyIHc7XG4gICAgY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoY2hpbGQpIHsgcmV0dXJuIEFycmF5LmlzQXJyYXkoY2hpbGQpID9cbiAgICAgICAgY2hpbGRzLnB1c2guYXBwbHkoY2hpbGRzLCBjaGlsZCkgOiBjaGlsZHMucHVzaChjaGlsZCk7IH0pO1xuICAgIHcgPSBuZXcgQ29uc3RydWN0b3IobmV3IEF0dHJpYnV0ZXMoYXR0cmlidXRlcyksIGNoaWxkcyk7XG4gICAgaWYgKGF0dHJpYnV0ZXMud21sKVxuICAgICAgICBpZiAoYXR0cmlidXRlcy53bWwuaWQpXG4gICAgICAgICAgICB2aWV3LnJlZ2lzdGVyKGF0dHJpYnV0ZXMud21sLmlkLCB3KTtcbiAgICB2aWV3LndpZGdldHMucHVzaCh3KTtcbiAgICByZXR1cm4gdy5yZW5kZXIoKTtcbn1cbi8qKlxuICogJCRpZiBpcyBjYWxsZWQgdG8gY3JlYXRlIGFuIGlmIGNvbmRpdGlvbmFsIGNvbnN0cnVjdFxuICogQHBhcmFtIHsqfSBwcmVkaWNhdGVcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHBvc2l0aXZlXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBuZWdhdGl2ZVxuICovXG5mdW5jdGlvbiAkJGlmKHByZWRpY2F0ZSwgcG9zaXRpdmUsIG5lZ2F0aXZlKSB7XG4gICAgcmV0dXJuIChwcmVkaWNhdGUpID8gcG9zaXRpdmUoKSA6IG5lZ2F0aXZlKCk7XG59XG4vKipcbiAqICQkZm9yIGlzIGNhbGxlZCB0byBjcmVhdGUgYSBmb3IgbG9vcCBjb25zdHJ1Y3RcbiAqIEBwYXJhbSB7SXRlcmFibGV9IGNvbGxlY3Rpb25cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNiXG4gKi9cbmZ1bmN0aW9uICQkZm9yKGNvbGxlY3Rpb24sIGNiKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoY29sbGVjdGlvbikpIHtcbiAgICAgICAgcmV0dXJuIGNvbGxlY3Rpb24ubWFwKGNiKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGNvbGxlY3Rpb24gPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhjb2xsZWN0aW9uKS5tYXAoZnVuY3Rpb24gKGtleSwgXywgYWxsKSB7IHJldHVybiBjYihjb2xsZWN0aW9uW2tleV0sIGtleSwgYWxsKTsgfSk7XG4gICAgfVxuICAgIHJldHVybiBbXTtcbn1cbi8qKlxuICogJCRzd2l0Y2ggc2ltdWxhdGVzIGEgc3dpdGNoIHN0YXRlbWVudFxuICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfGJvb2xlYW59IHZhbHVlXG4gKiBAcGFyYW0ge29iamVjdH0gY2FzZXNcbiAqL1xuZnVuY3Rpb24gJCRzd2l0Y2godmFsdWUsIGNhc2VzKSB7XG4gICAgdmFyIHJlc3VsdCA9IGNhc2VzW3ZhbHVlXTtcbiAgICB2YXIgZGVmYXVsID0gY2FzZXNbXCJkZWZhdWx0XCJdO1xuICAgIGlmIChyZXN1bHQpXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgaWYgKGRlZmF1bClcbiAgICAgICAgcmV0dXJuIGRlZmF1bDtcbn1cbmZ1bmN0aW9uIG5hdmlnYXRpb24odmlldykge1xuICAgIHJldHVybiAkJG5vZGUoJ3AnLCB7XG4gICAgICAgIGh0bWw6IHt9XG4gICAgfSwgWyQkdGV4dChcIlRoaXMgaXMgaW4gdGhlIGRyYXdlclwiKV0sIHZpZXcpO1xufVxuZXhwb3J0cy5uYXZpZ2F0aW9uID0gbmF2aWdhdGlvbjtcbmZ1bmN0aW9uIGNvbnRlbnQodmlldykge1xuICAgIHJldHVybiAkJG5vZGUoJ2ZyYWdtZW50Jywge1xuICAgICAgICBodG1sOiB7fVxuICAgIH0sIFskJHdpZGdldChjb21wb25lbnRzXzEuQWN0aW9uQXJlYSwge1xuICAgICAgICAgICAgaHRtbDoge30sXG4gICAgICAgICAgICB3bWw6IHtcbiAgICAgICAgICAgICAgICAnaWQnOiBcImFjdGlvbnNcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9LCBbJCR3aWRnZXQoY29tcG9uZW50c18xLk1lbnVCdXR0b24sIHtcbiAgICAgICAgICAgICAgICBodG1sOiB7fSxcbiAgICAgICAgICAgICAgICB3dzoge1xuICAgICAgICAgICAgICAgICAgICAnb25DbGljayc6IHRoaXMudG9nZ2xlRHJhd2VyLmJpbmQodGhpcylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBbXSwgdmlldyksICQkd2lkZ2V0KGNvbXBvbmVudHNfMS5CdXR0b24sIHtcbiAgICAgICAgICAgICAgICBodG1sOiB7fSxcbiAgICAgICAgICAgICAgICB3bWw6IHtcbiAgICAgICAgICAgICAgICAgICAgJ2lkJzogXCJjcmVhdGVCdXR0b25cIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgd3c6IHtcbiAgICAgICAgICAgICAgICAgICAgJ3N0eWxlJzogXCItLXd3LWRhbmdlclwiLFxuICAgICAgICAgICAgICAgICAgICAndGV4dCc6IFwiQ3JlYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICdvbkNsaWNrJzogdGhpcy5jcmVhdGUuYmluZCh0aGlzKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIFtdLCB2aWV3KV0sIHZpZXcpLCAkJHdpZGdldChjb21wb25lbnRzXzEuTWFpblZpZXcsIHtcbiAgICAgICAgICAgIGh0bWw6IHt9LFxuICAgICAgICAgICAgd21sOiB7XG4gICAgICAgICAgICAgICAgJ2lkJzogXCJtYWluXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgWyQkbm9kZSgndGFibGUnLCB7XG4gICAgICAgICAgICAgICAgaHRtbDoge1xuICAgICAgICAgICAgICAgICAgICAnY2xhc3MnOiBcInRhYmxlIHRhYmxlLXN0cmlwZSB0YWJsZS1ib3JkZXJlZFwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgWyQkbm9kZSgndGhlYWQnLCB7XG4gICAgICAgICAgICAgICAgICAgIGh0bWw6IHt9XG4gICAgICAgICAgICAgICAgfSwgWyQkbm9kZSgndHInLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBodG1sOiB7fVxuICAgICAgICAgICAgICAgICAgICB9LCBbJCRub2RlKCd0aCcsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBodG1sOiB7fVxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgWyQkdGV4dChcIk51bWJlclwiKV0sIHZpZXcpLCAkJG5vZGUoJ3RoJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGh0bWw6IHt9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBbJCR0ZXh0KFwiTmFtZVwiKV0sIHZpZXcpLCAkJG5vZGUoJ3RoJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGh0bWw6IHt9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBbJCR0ZXh0KFwiQW1vdW50XCIpXSwgdmlldyldLCB2aWV3KV0sIHZpZXcpLCAkJG5vZGUoJ3Rib2R5Jywge1xuICAgICAgICAgICAgICAgICAgICBodG1sOiB7fVxuICAgICAgICAgICAgICAgIH0sIFskJGZvcigkJHJlc29sdmUodGhpcywgJ3JlY29yZHMnKSwgZnVuY3Rpb24gZm9yXzEocmVjb3JkLCBudW1iZXIsIGFycmF5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWyQkbm9kZSgndHInLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGh0bWw6IHt9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgWyQkbm9kZSgndGQnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBodG1sOiB7fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBbbnVtYmVyXSwgdmlldyksICQkbm9kZSgndGQnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBodG1sOiB7fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBbJCRyZXNvbHZlKHJlY29yZCwgJ25hbWUnKV0sIHZpZXcpLCAkJG5vZGUoJ3RkJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDoge31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgWyQkcmVzb2x2ZShyZWNvcmQsICdhbW91bnQnKV0sIHZpZXcpXSwgdmlldyldO1xuICAgICAgICAgICAgICAgICAgICB9LmJpbmQodGhpcykpXSwgdmlldyldLCB2aWV3KV0sIHZpZXcpXSwgdmlldyk7XG59XG5leHBvcnRzLmNvbnRlbnQgPSBjb250ZW50O1xudmFyIE1haW4gPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE1haW4oY29udGV4dCkge1xuICAgICAgICB2YXIgdmlldyA9IHRoaXM7XG4gICAgICAgIHRoaXMuaWRzID0ge307XG4gICAgICAgIHRoaXMud2lkZ2V0cyA9IFtdO1xuICAgICAgICB0aGlzLnRyZWUgPSBudWxsO1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuICQkd2lkZ2V0KGNvbXBvbmVudHNfMS5EcmF3ZXJMYXlvdXQsIHtcbiAgICAgICAgICAgICAgICBodG1sOiB7fSxcbiAgICAgICAgICAgICAgICB3bWw6IHtcbiAgICAgICAgICAgICAgICAgICAgJ2lkJzogXCJsYXlvdXRcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgd3c6IHtcbiAgICAgICAgICAgICAgICAgICAgJ25hdmlnYXRpb24nOiBuYXZpZ2F0aW9uLFxuICAgICAgICAgICAgICAgICAgICAnY29udGVudCc6IGZ1bmN0aW9uIGZ1bmN0aW9uX2xpdGVyYWxfMSh2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29udGVudC5jYWxsKHRoaXMsIHYpO1xuICAgICAgICAgICAgICAgICAgICB9LmJpbmQodGhpcylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBbXSwgdmlldyk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIE1haW4ucmVuZGVyID0gZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICAgICAgcmV0dXJuIChuZXcgTWFpbihjb250ZXh0KSkucmVuZGVyKCk7XG4gICAgfTtcbiAgICBNYWluLnByb3RvdHlwZS5yZWdpc3RlciA9IGZ1bmN0aW9uIChpZCwgdykge1xuICAgICAgICBpZiAodGhpcy5pZHMuaGFzT3duUHJvcGVydHkoaWQpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdEdXBsaWNhdGUgaWQgXFwnJyArIGlkICsgJ1xcJyBkZXRlY3RlZCEnKTtcbiAgICAgICAgdGhpcy5pZHNbaWRdID0gdztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBNYWluLnByb3RvdHlwZS5maW5kQnlJZCA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICByZXR1cm4gKHRoaXMuaWRzW2lkXSkgPyB0aGlzLmlkc1tpZF0gOiBudWxsO1xuICAgIH07XG4gICAgTWFpbi5wcm90b3R5cGUuaW52YWxpZGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNoaWxkcztcbiAgICAgICAgdmFyIHBhcmVudCA9IHRoaXMudHJlZS5wYXJlbnROb2RlO1xuICAgICAgICB2YXIgcmVhbEZpcnN0Q2hpbGQ7XG4gICAgICAgIHZhciByZWFsRmlyc3RDaGlsZEluZGV4O1xuICAgICAgICBpZiAodGhpcy50cmVlID09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoJ0Nhbm5vdCBpbnZhbGlkYXRlIGEgdmlldyB0aGF0IGhhcyBub3QgYmVlbiByZW5kZXJlZCEnKTtcbiAgICAgICAgaWYgKHRoaXMudHJlZS5wYXJlbnROb2RlID09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoJ0F0dGVtcHQgdG8gaW52YWxpZGF0ZSBhIHZpZXcgdGhhdCBoYXMgbm90IGJlZW4gaW5zZXJ0ZWQgdG8gRE9NIScpO1xuICAgICAgICBjaGlsZHMgPSB0aGlzLnRyZWUucGFyZW50Tm9kZS5jaGlsZHJlbjtcbiAgICAgICAgLy9mb3Igc29tZSByZWFzb24gdGhlIHJlZmVyZW5jZSBzdG9yZWQgZG9lcyBub3QgaGF2ZSB0aGUgY29ycmVjdCBwYXJlbnQgbm9kZS5cbiAgICAgICAgLy93ZSBkbyB0aGlzIHRvIGdldCBhICdsaXZlJyB2ZXJzaW9uIG9mIHRoZSBub2RlLlxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcy5sZW5ndGg7IGkrKylcbiAgICAgICAgICAgIGlmIChjaGlsZHNbaV0gPT09IHRoaXMudHJlZSkge1xuICAgICAgICAgICAgICAgIHJlYWxGaXJzdENoaWxkID0gY2hpbGRzW2ldO1xuICAgICAgICAgICAgICAgIHJlYWxGaXJzdENoaWxkSW5kZXggPSBpO1xuICAgICAgICAgICAgfVxuICAgICAgICBwYXJlbnQucmVwbGFjZUNoaWxkKHRoaXMucmVuZGVyKCksIHJlYWxGaXJzdENoaWxkKTtcbiAgICB9O1xuICAgIE1haW4ucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5pZHMgPSB7fTtcbiAgICAgICAgdGhpcy53aWRnZXRzLmZvckVhY2goZnVuY3Rpb24gKHcpIHsgcmV0dXJuIHcucmVtb3ZlZCgpOyB9KTtcbiAgICAgICAgdGhpcy53aWRnZXRzID0gW107XG4gICAgICAgIHRoaXMudHJlZSA9IHRoaXMudGVtcGxhdGUuY2FsbCh0aGlzLmNvbnRleHQpO1xuICAgICAgICB0aGlzLmlkc1sncm9vdCddID0gKHRoaXMuaWRzWydyb290J10pID8gdGhpcy5pZHNbJ3Jvb3QnXSA6IHRoaXMudHJlZTtcbiAgICAgICAgdGhpcy53aWRnZXRzLmZvckVhY2goZnVuY3Rpb24gKHcpIHsgcmV0dXJuIHcucmVuZGVyZWQoKTsgfSk7XG4gICAgICAgIHJldHVybiB0aGlzLnRyZWU7XG4gICAgfTtcbiAgICByZXR1cm4gTWFpbjtcbn0oKSk7XG5leHBvcnRzLk1haW4gPSBNYWluO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBNYWluO1xuIl19
