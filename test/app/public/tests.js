(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
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

},{"./AbstractWidget":1}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CSS_CLASS = 'ww-class';
exports.HIDDEN = '-hidden';
exports.DISABLED = '-disabled';
exports.DEFAULT = '-default';
exports.PRIMARY = '-primary';
exports.SUCCESS = '-success';
exports.INFO = '-info';
exports.WARNING = '-warning';
exports.DANGER = '-danger';
exports.LARGE = '-large';
exports.SMALL = '-small';
exports.EXTRA_SMALL = '-extra-small';
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
exports.MODA_FOOTER = 'ww-moadl__footer';
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

},{"./wml/action_area":6,"@quenk/wml/lib/runtime":2,"wml-widgets-common/util":4}],6:[function(require,module,exports){
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

},{"wml-widgets-common/Styles":3,"wml-widgets-common/util":4}],7:[function(require,module,exports){
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

},{"./wml/button":8,"@quenk/wml/lib/runtime":2}],8:[function(require,module,exports){
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
            return $$node('fragment', { html: {} }, [$$if(this.attributes.read('ww:href'), function if0() { return [$$node('a', { html: { 'href': this.attributes.read('ww:href'), 'class': util_1.combine([$$resolve(Styles, 'BUTTON'), this.attributes.read('ww:variant', ''), this.attributes.read('ww:size', ''), this.attributes.read('ww:style', $$resolve(Styles, 'DEFAULT')), this.attributes.read('ww:class')]), 'onclick': this.attributes.read('ww:onClick', util_1.noop) }, wml: { 'id': "button" } }, [this.attributes.read('ww:text'), $$resolve(this, 'children')], view)]; }.bind(this), function else_clause0() { return [$$node('button', { html: { 'type': this.attributes.read('ww:type', 'button'), 'name': this.attributes.read('ww:name', ''), 'class': util_1.combine([$$resolve(Styles, 'BUTTON'), this.attributes.read('ww:variant', ''), this.attributes.read('ww:size', ''), this.attributes.read('ww:style', $$resolve(Styles, 'DEFAULT')), this.attributes.read('ww:class')]), 'onclick': this.attributes.read('ww:onClick', util_1.noop) }, wml: { 'id': "button" } }, [this.attributes.read('ww:text'), $$resolve(this, 'children')], view)]; }.bind(this))], view);
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

},{"wml-widgets-common/Styles":3,"wml-widgets-common/util":4}],9:[function(require,module,exports){
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
    return DrawerLayout;
}(runtime_1.AbstractWidget));
exports.DrawerLayout = DrawerLayout;
exports.default = DrawerLayout;

},{"./wml/drawer-layout":10,"@quenk/wml/lib/runtime":2,"wml-widgets-common/Styles":3,"wml-widgets-common/util":4}],10:[function(require,module,exports){
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

},{"wml-widgets-common/Styles":3}],11:[function(require,module,exports){
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
var views = require("./wml/grid");
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
}(runtime_1.AbstractWidget));
exports.Container = Container;
var Row = (function (_super) {
    __extends(Row, _super);
    function Row() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Row(_this);
        return _this;
    }
    return Row;
}(runtime_1.AbstractWidget));
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
        classes.push(this.attributes.read(Styles.CSS_CLASS));
        return classes.filter(function (v) { return !(v == null); }).join(' ');
    };
    return Column;
}(runtime_1.AbstractWidget));
exports.Column = Column;

},{"./wml/grid":12,"@quenk/wml/lib/runtime":2,"wml-widgets-common/Styles":3}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("wml-widgets-common/util");
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
var Container = (function () {
    function Container(context) {
        var view = this;
        this.ids = {};
        this.widgets = [];
        this.tree = null;
        this.context = context;
        this.template = function () {
            return $$node('section', { html: { 'class': util_1.combine([$$resolve(Styles, 'GRID_CONTAINER'), this.attributes.read($$resolve(Styles, 'CSS_CLASS'))]) } }, [$$resolve(this, 'children')], view);
        };
    }
    Container.render = function (context) {
        return (new Container(context)).render();
    };
    Container.prototype.register = function (id, w) {
        if (this.ids.hasOwnProperty(id))
            throw new Error('Duplicate id \'' + id + '\' detected!');
        this.ids[id] = w;
        return this;
    };
    Container.prototype.findById = function (id) {
        return (this.ids[id]) ? this.ids[id] : null;
    };
    Container.prototype.invalidate = function () {
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
    Container.prototype.render = function () {
        this.ids = {};
        this.widgets.forEach(function (w) { return w.removed(); });
        this.widgets = [];
        this.tree = this.template.call(this.context);
        this.ids['root'] = (this.ids['root']) ? this.ids['root'] : this.tree;
        this.widgets.forEach(function (w) { return w.rendered(); });
        return this.tree;
    };
    return Container;
}());
exports.Container = Container;
var Row = (function () {
    function Row(context) {
        var view = this;
        this.ids = {};
        this.widgets = [];
        this.tree = null;
        this.context = context;
        this.template = function () {
            return $$node('div', { html: { 'class': util_1.combine([$$resolve(Styles, 'GRID_ROW'), this.attributes.read($$resolve(Styles, 'CSS_CLASS'))]) } }, [$$resolve(this, 'children')], view);
        };
    }
    Row.render = function (context) {
        return (new Row(context)).render();
    };
    Row.prototype.register = function (id, w) {
        if (this.ids.hasOwnProperty(id))
            throw new Error('Duplicate id \'' + id + '\' detected!');
        this.ids[id] = w;
        return this;
    };
    Row.prototype.findById = function (id) {
        return (this.ids[id]) ? this.ids[id] : null;
    };
    Row.prototype.invalidate = function () {
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
    Row.prototype.render = function () {
        this.ids = {};
        this.widgets.forEach(function (w) { return w.removed(); });
        this.widgets = [];
        this.tree = this.template.call(this.context);
        this.ids['root'] = (this.ids['root']) ? this.ids['root'] : this.tree;
        this.widgets.forEach(function (w) { return w.rendered(); });
        return this.tree;
    };
    return Row;
}());
exports.Row = Row;
var Column = (function () {
    function Column(context) {
        var view = this;
        this.ids = {};
        this.widgets = [];
        this.tree = null;
        this.context = context;
        this.template = function () {
            return $$node('div', { html: { 'class': this._getClass() } }, [$$resolve(this, 'children')], view);
        };
    }
    Column.render = function (context) {
        return (new Column(context)).render();
    };
    Column.prototype.register = function (id, w) {
        if (this.ids.hasOwnProperty(id))
            throw new Error('Duplicate id \'' + id + '\' detected!');
        this.ids[id] = w;
        return this;
    };
    Column.prototype.findById = function (id) {
        return (this.ids[id]) ? this.ids[id] : null;
    };
    Column.prototype.invalidate = function () {
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
    Column.prototype.render = function () {
        this.ids = {};
        this.widgets.forEach(function (w) { return w.removed(); });
        this.widgets = [];
        this.tree = this.template.call(this.context);
        this.ids['root'] = (this.ids['root']) ? this.ids['root'] : this.tree;
        this.widgets.forEach(function (w) { return w.rendered(); });
        return this.tree;
    };
    return Column;
}());
exports.Column = Column;

},{"wml-widgets-common/Styles":3,"wml-widgets-common/util":4}],13:[function(require,module,exports){
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
/* jshint ignore:end */

},{"./action-area/ActionArea":5,"./button/Button":7,"./drawer-layout/DrawerLayout":9,"./grid/Grid":11,"./main-view/MainView":14,"./menu-button/MenuButton":16,"./modal/Modal":18,"./panel/Panel":20}],14:[function(require,module,exports){
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

},{"./wml/main-view":15,"@quenk/wml/lib/runtime":2,"wml-widgets-common/util":4}],15:[function(require,module,exports){
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
            return $$node('div', { html: { 'class': util_1.combine([$$resolve(Styles, 'MAIN_VIEW'), $$resolve(Styles, 'DRAWER_PUSHABLE'), this.attributes.read('ww:class')]) } }, [$$resolve(this, 'children')], view);
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

},{"wml-widgets-common/Styles":3,"wml-widgets-common/util":4}],16:[function(require,module,exports){
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
        _this.view = new menu_button_1.Main(_this);
        return _this;
    }
    return MenuButton;
}(runtime_1.AbstractWidget));
exports.MenuButton = MenuButton;
exports.default = MenuButton;

},{"./wml/menu_button":17,"@quenk/wml/lib/runtime":2}],17:[function(require,module,exports){
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

},{"wml-widgets-common/Styles":3,"wml-widgets-common/util":4}],18:[function(require,module,exports){
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
var views = require("./wml/modal");
/**
 * Modal
 */
var Modal = (function (_super) {
    __extends(Modal, _super);
    function Modal() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Nothing(_this);
        return _this;
    }
    return Modal;
}(runtime_1.AbstractWidget));
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
}(runtime_1.AbstractWidget));
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
}(runtime_1.AbstractWidget));
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
}(runtime_1.AbstractWidget));
exports.Footer = Footer;

},{"./wml/modal":19,"@quenk/wml/lib/runtime":2}],19:[function(require,module,exports){
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
var Modal = (function () {
    function Modal(context) {
        var view = this;
        this.ids = {};
        this.widgets = [];
        this.tree = null;
        this.context = context;
        this.template = function () {
            return $$node('div', { html: { 'class': $$resolve(Styles, 'MODAL'), 'tabindex': "-1", 'role': "dialog" } }, [$$node('div', { html: { 'class': $$resolve(Styles, 'MODAL_DIALOG'), 'role': "document" } }, [$$node('div', { html: { 'class': $$resolve(Styles, 'MODAL_CONTENT') }, wml: { 'id': "content" } }, [$$resolve(this, 'children')], view)], view)], view);
        };
    }
    Modal.render = function (context) {
        return (new Modal(context)).render();
    };
    Modal.prototype.register = function (id, w) {
        if (this.ids.hasOwnProperty(id))
            throw new Error('Duplicate id \'' + id + '\' detected!');
        this.ids[id] = w;
        return this;
    };
    Modal.prototype.findById = function (id) {
        return (this.ids[id]) ? this.ids[id] : null;
    };
    Modal.prototype.invalidate = function () {
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
    Modal.prototype.render = function () {
        this.ids = {};
        this.widgets.forEach(function (w) { return w.removed(); });
        this.widgets = [];
        this.tree = this.template.call(this.context);
        this.ids['root'] = (this.ids['root']) ? this.ids['root'] : this.tree;
        this.widgets.forEach(function (w) { return w.rendered(); });
        return this.tree;
    };
    return Modal;
}());
exports.Modal = Modal;
var Header = (function () {
    function Header(context) {
        var view = this;
        this.ids = {};
        this.widgets = [];
        this.tree = null;
        this.context = context;
        this.template = function () {
            return $$node('div', { html: { 'class': $$resolve(Styles, 'MODAL_HEADER') } }, [$$node('button', { html: { 'type': "button", 'class': "close", 'aria-label': "Close" } }, [$$node('span', { html: { 'aria-hidden': "true" } }, [$$text("\u00D7")], view)], view), $$resolve(this, 'children')], view);
        };
    }
    Header.render = function (context) {
        return (new Header(context)).render();
    };
    Header.prototype.register = function (id, w) {
        if (this.ids.hasOwnProperty(id))
            throw new Error('Duplicate id \'' + id + '\' detected!');
        this.ids[id] = w;
        return this;
    };
    Header.prototype.findById = function (id) {
        return (this.ids[id]) ? this.ids[id] : null;
    };
    Header.prototype.invalidate = function () {
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
    Header.prototype.render = function () {
        this.ids = {};
        this.widgets.forEach(function (w) { return w.removed(); });
        this.widgets = [];
        this.tree = this.template.call(this.context);
        this.ids['root'] = (this.ids['root']) ? this.ids['root'] : this.tree;
        this.widgets.forEach(function (w) { return w.rendered(); });
        return this.tree;
    };
    return Header;
}());
exports.Header = Header;
var Body = (function () {
    function Body(context) {
        var view = this;
        this.ids = {};
        this.widgets = [];
        this.tree = null;
        this.context = context;
        this.template = function () {
            return $$node('div', { html: { 'class': $$resolve(Styles, 'MODAL_BODY') } }, [$$resolve(this, 'children')], view);
        };
    }
    Body.render = function (context) {
        return (new Body(context)).render();
    };
    Body.prototype.register = function (id, w) {
        if (this.ids.hasOwnProperty(id))
            throw new Error('Duplicate id \'' + id + '\' detected!');
        this.ids[id] = w;
        return this;
    };
    Body.prototype.findById = function (id) {
        return (this.ids[id]) ? this.ids[id] : null;
    };
    Body.prototype.invalidate = function () {
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
    Body.prototype.render = function () {
        this.ids = {};
        this.widgets.forEach(function (w) { return w.removed(); });
        this.widgets = [];
        this.tree = this.template.call(this.context);
        this.ids['root'] = (this.ids['root']) ? this.ids['root'] : this.tree;
        this.widgets.forEach(function (w) { return w.rendered(); });
        return this.tree;
    };
    return Body;
}());
exports.Body = Body;
var Footer = (function () {
    function Footer(context) {
        var view = this;
        this.ids = {};
        this.widgets = [];
        this.tree = null;
        this.context = context;
        this.template = function () {
            return $$node('div', { html: { 'class': $$resolve(Styles, 'MODAL_FOOTER') } }, [$$resolve(this, 'children')], view);
        };
    }
    Footer.render = function (context) {
        return (new Footer(context)).render();
    };
    Footer.prototype.register = function (id, w) {
        if (this.ids.hasOwnProperty(id))
            throw new Error('Duplicate id \'' + id + '\' detected!');
        this.ids[id] = w;
        return this;
    };
    Footer.prototype.findById = function (id) {
        return (this.ids[id]) ? this.ids[id] : null;
    };
    Footer.prototype.invalidate = function () {
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
    Footer.prototype.render = function () {
        this.ids = {};
        this.widgets.forEach(function (w) { return w.removed(); });
        this.widgets = [];
        this.tree = this.template.call(this.context);
        this.ids['root'] = (this.ids['root']) ? this.ids['root'] : this.tree;
        this.widgets.forEach(function (w) { return w.rendered(); });
        return this.tree;
    };
    return Footer;
}());
exports.Footer = Footer;
var Nothing = (function () {
    function Nothing(context) {
        var view = this;
        this.ids = {};
        this.widgets = [];
        this.tree = null;
        this.context = context;
        this.template = function () {
            return $$node('fragment', { html: {} }, [], view);
        };
    }
    Nothing.render = function (context) {
        return (new Nothing(context)).render();
    };
    Nothing.prototype.register = function (id, w) {
        if (this.ids.hasOwnProperty(id))
            throw new Error('Duplicate id \'' + id + '\' detected!');
        this.ids[id] = w;
        return this;
    };
    Nothing.prototype.findById = function (id) {
        return (this.ids[id]) ? this.ids[id] : null;
    };
    Nothing.prototype.invalidate = function () {
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
    Nothing.prototype.render = function () {
        this.ids = {};
        this.widgets.forEach(function (w) { return w.removed(); });
        this.widgets = [];
        this.tree = this.template.call(this.context);
        this.ids['root'] = (this.ids['root']) ? this.ids['root'] : this.tree;
        this.widgets.forEach(function (w) { return w.rendered(); });
        return this.tree;
    };
    return Nothing;
}());
exports.Nothing = Nothing;

},{"wml-widgets-common/Styles":3}],20:[function(require,module,exports){
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
var views = require("./wml/panel");
var Panel = (function (_super) {
    __extends(Panel, _super);
    function Panel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Panel(_this);
        return _this;
    }
    return Panel;
}(runtime_1.AbstractWidget));
exports.Panel = Panel;
var Header = (function (_super) {
    __extends(Header, _super);
    function Header() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Header(_this);
        return _this;
    }
    return Header;
}(runtime_1.AbstractWidget));
exports.Header = Header;
var Body = (function (_super) {
    __extends(Body, _super);
    function Body() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Body(_this);
        return _this;
    }
    return Body;
}(runtime_1.AbstractWidget));
exports.Body = Body;
var Footer = (function (_super) {
    __extends(Footer, _super);
    function Footer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Footer(_this);
        return _this;
    }
    return Footer;
}(runtime_1.AbstractWidget));
exports.Footer = Footer;

},{"./wml/panel":21,"@quenk/wml/lib/runtime":2}],21:[function(require,module,exports){
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
var Panel = (function () {
    function Panel(context) {
        var view = this;
        this.ids = {};
        this.widgets = [];
        this.tree = null;
        this.context = context;
        this.template = function () {
            return $$node('div', { html: { 'class': util_1.combine([$$resolve(Styles, 'PANEL'), this.attributes.read('ww:style', $$resolve(Styles, 'DEFAULT'))]) } }, [$$resolve(this, 'children')], view);
        };
    }
    Panel.render = function (context) {
        return (new Panel(context)).render();
    };
    Panel.prototype.register = function (id, w) {
        if (this.ids.hasOwnProperty(id))
            throw new Error('Duplicate id \'' + id + '\' detected!');
        this.ids[id] = w;
        return this;
    };
    Panel.prototype.findById = function (id) {
        return (this.ids[id]) ? this.ids[id] : null;
    };
    Panel.prototype.invalidate = function () {
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
    Panel.prototype.render = function () {
        this.ids = {};
        this.widgets.forEach(function (w) { return w.removed(); });
        this.widgets = [];
        this.tree = this.template.call(this.context);
        this.ids['root'] = (this.ids['root']) ? this.ids['root'] : this.tree;
        this.widgets.forEach(function (w) { return w.rendered(); });
        return this.tree;
    };
    return Panel;
}());
exports.Panel = Panel;
var Header = (function () {
    function Header(context) {
        var view = this;
        this.ids = {};
        this.widgets = [];
        this.tree = null;
        this.context = context;
        this.template = function () {
            return $$node('div', { html: { 'class': $$resolve(Styles, 'PANEL_HEADER') } }, [$$resolve(this, 'children')], view);
        };
    }
    Header.render = function (context) {
        return (new Header(context)).render();
    };
    Header.prototype.register = function (id, w) {
        if (this.ids.hasOwnProperty(id))
            throw new Error('Duplicate id \'' + id + '\' detected!');
        this.ids[id] = w;
        return this;
    };
    Header.prototype.findById = function (id) {
        return (this.ids[id]) ? this.ids[id] : null;
    };
    Header.prototype.invalidate = function () {
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
    Header.prototype.render = function () {
        this.ids = {};
        this.widgets.forEach(function (w) { return w.removed(); });
        this.widgets = [];
        this.tree = this.template.call(this.context);
        this.ids['root'] = (this.ids['root']) ? this.ids['root'] : this.tree;
        this.widgets.forEach(function (w) { return w.rendered(); });
        return this.tree;
    };
    return Header;
}());
exports.Header = Header;
var Body = (function () {
    function Body(context) {
        var view = this;
        this.ids = {};
        this.widgets = [];
        this.tree = null;
        this.context = context;
        this.template = function () {
            return $$node('div', { html: { 'class': $$resolve(Styles, 'PANEL_BODY') } }, [$$resolve(this, 'children')], view);
        };
    }
    Body.render = function (context) {
        return (new Body(context)).render();
    };
    Body.prototype.register = function (id, w) {
        if (this.ids.hasOwnProperty(id))
            throw new Error('Duplicate id \'' + id + '\' detected!');
        this.ids[id] = w;
        return this;
    };
    Body.prototype.findById = function (id) {
        return (this.ids[id]) ? this.ids[id] : null;
    };
    Body.prototype.invalidate = function () {
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
    Body.prototype.render = function () {
        this.ids = {};
        this.widgets.forEach(function (w) { return w.removed(); });
        this.widgets = [];
        this.tree = this.template.call(this.context);
        this.ids['root'] = (this.ids['root']) ? this.ids['root'] : this.tree;
        this.widgets.forEach(function (w) { return w.rendered(); });
        return this.tree;
    };
    return Body;
}());
exports.Body = Body;
var Footer = (function () {
    function Footer(context) {
        var view = this;
        this.ids = {};
        this.widgets = [];
        this.tree = null;
        this.context = context;
        this.template = function () {
            return $$node('div', { html: { 'class': $$resolve(Styles, 'PANEL_FOOTER') } }, [$$resolve(this, 'children')], view);
        };
    }
    Footer.render = function (context) {
        return (new Footer(context)).render();
    };
    Footer.prototype.register = function (id, w) {
        if (this.ids.hasOwnProperty(id))
            throw new Error('Duplicate id \'' + id + '\' detected!');
        this.ids[id] = w;
        return this;
    };
    Footer.prototype.findById = function (id) {
        return (this.ids[id]) ? this.ids[id] : null;
    };
    Footer.prototype.invalidate = function () {
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
    Footer.prototype.render = function () {
        this.ids = {};
        this.widgets.forEach(function (w) { return w.removed(); });
        this.widgets = [];
        this.tree = this.template.call(this.context);
        this.ids['root'] = (this.ids['root']) ? this.ids['root'] : this.tree;
        this.widgets.forEach(function (w) { return w.rendered(); });
        return this.tree;
    };
    return Footer;
}());
exports.Footer = Footer;

},{"wml-widgets-common/Styles":3,"wml-widgets-common/util":4}],22:[function(require,module,exports){
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

},{"kindof":24}],23:[function(require,module,exports){
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

},{}],24:[function(require,module,exports){
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

},{}],25:[function(require,module,exports){
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

},{"lodash._root":26}],26:[function(require,module,exports){
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

},{}],27:[function(require,module,exports){
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

},{"lodash._createwrapper":25}],28:[function(require,module,exports){
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

},{"oolong":36}],29:[function(require,module,exports){
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

},{}],30:[function(require,module,exports){
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

},{"./es6":29,"json-stringify-safe":23,"kindof":24}],31:[function(require,module,exports){
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

},{"./assertion_error":28,"./thenable":33}],32:[function(require,module,exports){
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

},{"./thenable":33}],33:[function(require,module,exports){
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

},{"lodash.wrap":27,"oolong":36}],34:[function(require,module,exports){
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

},{"./lib":30,"./lib/assertion_error":28,"./lib/es6":29,"./lib/rejectable":31,"./lib/resolvable":32,"egal":22,"kindof":24,"oolong":36}],35:[function(require,module,exports){
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

},{"./must":34}],36:[function(require,module,exports){
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

},{"./lib/es6":37}],37:[function(require,module,exports){
exports.getPropertyDescriptor = Object.getPropertyDescriptor ||
  function(obj, name) {
  if (!(name in obj)) return

  var desc
  do { if (desc = Object.getOwnPropertyDescriptor(obj, name)) return desc }
  while (obj = Object.getPrototypeOf(obj))
}

},{}],38:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var must = require("must/register");
var Styles = require("wml-widgets-common/Styles");
var view_1 = require("./view");
var count = 0;
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
        //this.modal.put(new CreateDialog(this));
        //      this.view.invalidate();
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

},{"./view":39,"must/register":35,"wml-widgets-common/Styles":3}],39:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var components_1 = require("@quenk/wml-widgets/lib/components");
var components_2 = require("@quenk/wml-widgets/lib/components");
var components_3 = require("@quenk/wml-widgets/lib/components");
var components_4 = require("@quenk/wml-widgets/lib/components");
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
function CreateDialog(view) {
    return $$node('fragment', {
        html: {}
    }, [], view);
}
exports.CreateDialog = CreateDialog;
function navigation(view) {
    return $$node('p', {
        html: {}
    }, [$$text("This is in the drawer")], view);
}
exports.navigation = navigation;
function content(view) {
    return $$node('fragment', {
        html: {}
    }, [$$widget(components_4.Modal, {
            html: {},
            wml: {
                'id': "modal"
            }
        }, [$$widget(components_4.ModalHeader, {
                html: {}
            }, [$$text("Create record")], view), $$widget(components_4.ModalBody, {
                html: {}
            }, [], view)], view), $$widget(components_1.ActionArea, {
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
                    'style': "-danger",
                    'text': "Create",
                    'class': "-right",
                    'onClick': this.create.bind(this)
                }
            }, [], view)], view), $$widget(components_1.MainView, {
            html: {},
            wml: {
                'id': "main"
            }
        }, [$$widget(components_2.Container, {
                html: {}
            }, [$$widget(components_2.Row, {
                    html: {}
                }, [$$widget(components_2.Column, {
                        html: {}
                    }, [$$widget(components_3.Panel, {
                            html: {},
                            ww: {
                                'style': "-info"
                            }
                        }, [$$widget(components_3.PanelHeader, {
                                html: {}
                            }, [$$text("Details")], view), $$widget(components_3.PanelBody, {
                                html: {}
                            }, [$$text("Records:")], view), $$node('table', {
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
                                    }.bind(this))], view)], view), $$widget(components_3.PanelFooter, {
                                html: {}
                            }, [$$text("\n                0\n              ")], view)], view)], view)], view)], view)], view)], view);
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

},{"@quenk/wml-widgets/lib/components":13}]},{},[38])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi93bWwtY29yZS9zcmMvcnVudGltZS9BYnN0cmFjdFdpZGdldC5qcyIsIi4uL3dtbC1jb3JlL3NyYy9ydW50aW1lL2luZGV4LmpzIiwibGliL2NvbXBvbmVudHMvd21sLXdpZGdldHMtY29tbW9uL1N0eWxlcy5qcyIsImxpYi9jb21wb25lbnRzL3dtbC13aWRnZXRzLWNvbW1vbi91dGlsLmpzIiwibm9kZV9tb2R1bGVzL0BxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50cy9hY3Rpb24tYXJlYS9BY3Rpb25BcmVhLmpzIiwibm9kZV9tb2R1bGVzL0BxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50cy9hY3Rpb24tYXJlYS93bWwvYWN0aW9uX2FyZWEuanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL2J1dHRvbi9CdXR0b24uanMiLCJub2RlX21vZHVsZXMvQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzL2J1dHRvbi93bWwvYnV0dG9uLmpzIiwibm9kZV9tb2R1bGVzL0BxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50cy9kcmF3ZXItbGF5b3V0L0RyYXdlckxheW91dC5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvZHJhd2VyLWxheW91dC93bWwvZHJhd2VyLWxheW91dC5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvZ3JpZC9HcmlkLmpzIiwibm9kZV9tb2R1bGVzL0BxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50cy9ncmlkL3dtbC9ncmlkLmpzIiwibm9kZV9tb2R1bGVzL0BxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50cy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvbWFpbi12aWV3L01haW5WaWV3LmpzIiwibm9kZV9tb2R1bGVzL0BxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50cy9tYWluLXZpZXcvd21sL21haW4tdmlldy5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvbWVudS1idXR0b24vTWVudUJ1dHRvbi5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvbWVudS1idXR0b24vd21sL21lbnVfYnV0dG9uLmpzIiwibm9kZV9tb2R1bGVzL0BxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50cy9tb2RhbC9Nb2RhbC5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvbW9kYWwvd21sL21vZGFsLmpzIiwibm9kZV9tb2R1bGVzL0BxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50cy9wYW5lbC9QYW5lbC5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvcGFuZWwvd21sL3BhbmVsLmpzIiwibm9kZV9tb2R1bGVzL2VnYWwvaW5kZXguanMiLCJub2RlX21vZHVsZXMvanNvbi1zdHJpbmdpZnktc2FmZS9zdHJpbmdpZnkuanMiLCJub2RlX21vZHVsZXMva2luZG9mL2tpbmRvZi5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2guX2NyZWF0ZXdyYXBwZXIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLl9yb290L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC53cmFwL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL211c3QvbGliL2Fzc2VydGlvbl9lcnJvci5qcyIsIm5vZGVfbW9kdWxlcy9tdXN0L2xpYi9lczYuanMiLCJub2RlX21vZHVsZXMvbXVzdC9saWIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbXVzdC9saWIvcmVqZWN0YWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9tdXN0L2xpYi9yZXNvbHZhYmxlLmpzIiwibm9kZV9tb2R1bGVzL211c3QvbGliL3RoZW5hYmxlLmpzIiwibm9kZV9tb2R1bGVzL211c3QvbXVzdC5qcyIsIm5vZGVfbW9kdWxlcy9tdXN0L3JlZ2lzdGVyLmpzIiwibm9kZV9tb2R1bGVzL29vbG9uZy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9vb2xvbmcvbGliL2VzNi5qcyIsInRlc3QvYXBwL2FwcC5qcyIsInRlc3QvYXBwL3ZpZXcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7O0FDQUE7OztJQUdNLGM7QUFFSiwwQkFBWSxLQUFaLEVBQW1CLFFBQW5CLEVBQTZCO0FBQUE7O0FBRTNCLFNBQUssVUFBTCxHQUFrQixLQUFsQjtBQUNBLFNBQUssUUFBTCxHQUFnQixRQUFoQjtBQUNBLFNBQUssSUFBTCxHQUFZLElBQVo7QUFFRDs7OzsrQkFFVSxDQUVWOzs7OEJBRVMsQ0FFVDs7OzZCQUVROztBQUVQLGFBQU8sS0FBSyxJQUFMLENBQVUsTUFBVixFQUFQO0FBRUQ7Ozs7OztrQkFJWSxjOzs7Ozs7Ozs7Ozs7Ozs7O1FDNUJSLGM7QUFDUDtBQUZBOzs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbk9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25PQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbE9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9VQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbk9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMWJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3REQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcllBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNucUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3h3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcDBCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxuICogQWJzdHJhY3RXaWRnZXRcbiAqL1xuY2xhc3MgQWJzdHJhY3RXaWRnZXQge1xuXG4gIGNvbnN0cnVjdG9yKGF0dHJzLCBjaGlsZHJlbikge1xuXG4gICAgdGhpcy5hdHRyaWJ1dGVzID0gYXR0cnM7XG4gICAgdGhpcy5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICAgIHRoaXMudmlldyA9IG51bGw7XG5cbiAgfVxuXG4gIHJlbmRlcmVkKCkge1xuXG4gIH1cblxuICByZW1vdmVkKCkge1xuXG4gIH1cblxuICByZW5kZXIoKSB7XG5cbiAgICByZXR1cm4gdGhpcy52aWV3LnJlbmRlcigpO1xuXG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBBYnN0cmFjdFdpZGdldFxuXG4iLCIvKmpzaGludCBpZ25vcmU6c3RhcnQgKi9cbmV4cG9ydCBBYnN0cmFjdFdpZGdldCBmcm9tICcuL0Fic3RyYWN0V2lkZ2V0Jztcbi8qanNoaW50IGlnbm9yZTplbmQgKi9cblxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkNTU19DTEFTUyA9ICd3dy1jbGFzcyc7XG5leHBvcnRzLkhJRERFTiA9ICctaGlkZGVuJztcbmV4cG9ydHMuRElTQUJMRUQgPSAnLWRpc2FibGVkJztcbmV4cG9ydHMuREVGQVVMVCA9ICctZGVmYXVsdCc7XG5leHBvcnRzLlBSSU1BUlkgPSAnLXByaW1hcnknO1xuZXhwb3J0cy5TVUNDRVNTID0gJy1zdWNjZXNzJztcbmV4cG9ydHMuSU5GTyA9ICctaW5mbyc7XG5leHBvcnRzLldBUk5JTkcgPSAnLXdhcm5pbmcnO1xuZXhwb3J0cy5EQU5HRVIgPSAnLWRhbmdlcic7XG5leHBvcnRzLkxBUkdFID0gJy1sYXJnZSc7XG5leHBvcnRzLlNNQUxMID0gJy1zbWFsbCc7XG5leHBvcnRzLkVYVFJBX1NNQUxMID0gJy1leHRyYS1zbWFsbCc7XG5leHBvcnRzLkRSQVdFUl9MQVlPVVQgPSAnd3ctZHJhd2VyLWxheW91dCc7XG5leHBvcnRzLkRSQVdFUiA9ICd3dy1kcmF3ZXInO1xuZXhwb3J0cy5EUkFXRVJfQ09OVEVOVCA9ICd3dy1kcmF3ZXJfX2NvbnRlbnQnO1xuZXhwb3J0cy5EUkFXRVJfUFVTSEFCTEUgPSAnLWRyYXdlci1wdXNoYWJsZSc7XG5leHBvcnRzLkRSQVdFUl9QVVNIQUJMRV9GSVhFRCA9ICctZHJhd2VyLXB1c2hhYmxlLWZpeGVkJztcbmV4cG9ydHMuQUNUSU9OX0FSRUEgPSAnd3ctYWN0aW9uLWFyZWEnO1xuZXhwb3J0cy5BQ1RJT05fQVJFQV9DT05URU5UID0gJ3d3LWFjdGlvbi1hcmVhX19jb250ZW50JztcbmV4cG9ydHMuTUFJTl9WSUVXID0gJ3d3LW1haW4tdmlldyc7XG5leHBvcnRzLk1FTlVfQlVUVE9OID0gJ3d3LW1lbnUtYnV0dG9uJztcbmV4cG9ydHMuQlVUVE9OID0gJ3d3LWJ1dHRvbic7XG4vL0B0b2RvOiByZWZhY3RvciB0aGlzIHRvIGJlIGlubGluZSB3aXRoIG90aGVyIGNsYXNzIG5hbWVzXG5leHBvcnRzLkdSSURfQ09OVEFJTkVSID0gJ2NvbnRhaW5lci1mbHVpZCc7XG5leHBvcnRzLkdSSURfQ09MVU1OID0gJyc7XG5leHBvcnRzLkdSSURfUk9XID0gJ3Jvdyc7XG5leHBvcnRzLlBBTkVMID0gJ3d3LXBhbmVsJztcbmV4cG9ydHMuUEFORUxfSEVBREVSID0gJ3d3LXBhbmVsX19oZWFkZXInO1xuZXhwb3J0cy5QQU5FTF9CT0RZID0gJ3d3LXBhbmVsX19ib2R5JztcbmV4cG9ydHMuUEFORUxfRk9PVEVSID0gJ3d3LXBhbmVsX19mb290ZXInO1xuZXhwb3J0cy5NT0RBTCA9ICd3dy1tb2RhbCc7XG5leHBvcnRzLk1PREFMX0RJQUxPRyA9ICd3dy1tb2RhbF9fZGlhbG9nJztcbmV4cG9ydHMuTU9EQUxfQ09OVEVOVCA9ICd3dy1tb2RhbF9fY29udGVudCc7XG5leHBvcnRzLk1PREFMX0hFQURFUiA9ICd3dy1tb2RhbF9faGVhZGVyJztcbmV4cG9ydHMuTU9EQUxfQk9EWSA9ICd3dy1tb2RhbF9fYm9keSc7XG5leHBvcnRzLk1PREFfRk9PVEVSID0gJ3d3LW1vYWRsX19mb290ZXInO1xuZXhwb3J0cy5MQVlPVVQgPSAnd3ctbGF5b3V0JztcbmV4cG9ydHMuVklTSUJMRSA9ICd3YXQtdmlzaWJsZSc7XG5leHBvcnRzLkFDVElWRSA9ICd3YXQtYWN0aXZlJztcbmV4cG9ydHMuRE9XTl9BUlJPVyA9ICdhcnJvdy1kb3duJztcbmV4cG9ydHMuVVBfQVJST1cgPSAnYXJyb3ctdXAnO1xuZXhwb3J0cy5MQVlPVVRfTUFJTl9DT05URU5UID0gJ3dhdC1sYXlvdXQtbWFpbi1jb250ZW50JztcbmV4cG9ydHMuTEFZT1VUX0FDVElPTl9BUkVBX0NPTlRFTlQgPSAnd2F0LWxheW91dC1hY3Rpb24tYXJlYS1jb250ZW50JztcbmV4cG9ydHMuTEFZT1VUX0JBTk5FUiA9ICd3YXQtbGF5b3V0LWJhbm5lcic7XG5leHBvcnRzLkxBWU9VVF9CQU5ORVJfSU1BR0UgPSAnd2F0LWxheW91dC1iYW5uZXItaW1hZ2UnO1xuZXhwb3J0cy5MQVlPVVRfRFJBV0VSX05BVklHQVRJT04gPSAnd2F0LWxheW91dC1kcmF3ZXItbmF2aWdhdGlvbic7XG5leHBvcnRzLkxBWU9VVF9EUkFXRVJfTkFWSUdBVElPTl9USVRMRSA9ICd3YXQtbGF5b3V0LWRyYXdlci1uYXZpZ2F0aW9uLXRpdGxlJztcbmV4cG9ydHMuTEFZT1VUX0FDQ09VTlRfQVJFQSA9ICd3YXQtbGF5b3V0LWFjY291bnQtYXJlYSc7XG5leHBvcnRzLkxBWU9VVF9BQ0NPVU5UX0FSRUFfVElUTEUgPSAnd2F0LWxheW91dC1hY2NvdW50LWFyZWEtdGl0bGUnO1xuZXhwb3J0cy5MQVlPVVRfQUNDT1VOVF9BUkVBX1RPR0dMRSA9ICd3YXQtbGF5b3V0LWFjY291bnQtYXJlYS10b2dnbGUnO1xuZXhwb3J0cy5MQVlPVVRfTk9USUZJQ0FUSU9OID0gJ3dhdC1sYXlvdXQtbm90aWZpY2F0aW9uJztcbmV4cG9ydHMuTEFZT1VUX09WRVJMQVkgPSAnd2F5LWxheW91dC1vdmVybGF5JztcbmV4cG9ydHMuQVVUT0NPTVBMRVRFID0gJ3dhdC1raXQtYXV0b2NvbXBsZXRlJztcbmV4cG9ydHMuQVVUT0NPTVBMRVRFX0NPTlRBSU5FUiA9ICd3YXQta2l0LWF1dG9jb21wbGV0ZS1jb250YWluZXInO1xuZXhwb3J0cy5BVVRPQ09NUExFVEVfSU5QVVRfQVJFQSA9ICd3YXQta2l0LWF1dG9jb21wbGV0ZS1pbnB1dC1hcmVhJztcbmV4cG9ydHMuQVVUT0NPTVBMRVRFX0lOUFVUID0gJ3dhdC1raXQtYXV0b2NvbXBsZXRlLWlucHV0JztcbmV4cG9ydHMuQVVUT0NPTVBMRVRFX09QVElPTlMgPSAnd2F0LWtpdC1hdXRvY29tcGxldGUtb3B0aW9ucyc7XG5leHBvcnRzLkFVVE9DT01QTEVURV9JVEVNX1dSQVBQRVIgPSAnd2F0LWtpdC1hdXRvLWNvbXBsZXRlLWl0ZW0td3JhcHBlcic7XG5leHBvcnRzLlNXSVRDSCA9ICd3YXQtY29tcG9uZW50cy1zd2l0Y2gnO1xuZXhwb3J0cy5TV0lUQ0hfU0xJREVSID0gJ3dhdC1jb21wb25lbnRzLXN3aXRjaC1zbGlkZXInO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9U3R5bGVzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBjb21iaW5lIHRoZSBtZW1iZXJzIG9mIGFuIGFycmF5IGludG8gb25lIHN0cmluZy5cbiAqL1xuZXhwb3J0cy5jb21iaW5lID0gZnVuY3Rpb24gKHN0ciwgam9pbmVyKSB7XG4gICAgaWYgKGpvaW5lciA9PT0gdm9pZCAwKSB7IGpvaW5lciA9ICcgJzsgfVxuICAgIHJldHVybiBzdHIuZmlsdGVyKGZ1bmN0aW9uIChzKSB7IHJldHVybiAoKHMgIT0gbnVsbCkgfHwgcyAhPSAnJyk7IH0pLmpvaW4oam9pbmVyKTtcbn07XG4vKipcbiAqIG5vb3BcbiAqL1xuZXhwb3J0cy5ub29wID0gZnVuY3Rpb24gKCkgeyB9O1xuLyoqXG4gKiByZWFkIGEgdmFsdWUgZnJvbSB0aGUgY29udGV4dCBhdHRyaWJ1dGVzXG4gKi9cbmV4cG9ydHMucmVhZCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgXyA9IFtdO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIF9bX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuYXR0cmlidXRlcy5yZWFkLmFwcGx5KHRoaXMuYXR0cmlidXRlcywgYXJndW1lbnRzKTtcbn07XG4vKipcbiAqIHJlcGxhY2VDb250ZW50XG4gKi9cbmV4cG9ydHMucmVwbGFjZUNvbnRlbnQgPSBmdW5jdGlvbiAociwgbm9kZSkge1xuICAgIHdoaWxlIChub2RlLmxhc3RDaGlsZClcbiAgICAgICAgbm9kZS5yZW1vdmVDaGlsZChub2RlLmxhc3RDaGlsZCk7XG4gICAgbm9kZS5hcHBlbmRDaGlsZChyLnJlbmRlcigpKTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD11dGlsLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgdXRpbF8xID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi91dGlsXCIpO1xudmFyIHJ1bnRpbWVfMSA9IHJlcXVpcmUoXCJAcXVlbmsvd21sL2xpYi9ydW50aW1lXCIpO1xudmFyIGFjdGlvbl9hcmVhXzEgPSByZXF1aXJlKFwiLi93bWwvYWN0aW9uX2FyZWFcIik7XG4vKipcbiAqIEFjdGlvbkFyZWFcbiAqL1xudmFyIEFjdGlvbkFyZWEgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhBY3Rpb25BcmVhLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEFjdGlvbkFyZWEoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IGFjdGlvbl9hcmVhXzEuTWFpbihfdGhpcyk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogc2V0Q29udGVudCByZXBsYWNlcyB0aGUgY29udGVudCBvZiB0aGlzIHZpZXcuXG4gICAgICovXG4gICAgQWN0aW9uQXJlYS5wcm90b3R5cGUuc2V0Q29udGVudCA9IGZ1bmN0aW9uIChyKSB7XG4gICAgICAgIHV0aWxfMS5yZXBsYWNlQ29udGVudChyLCB0aGlzLnZpZXcuZmluZEJ5SWQoJ2NvbnRlbnQnKSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgcmV0dXJuIEFjdGlvbkFyZWE7XG59KHJ1bnRpbWVfMS5BYnN0cmFjdFdpZGdldCkpO1xuZXhwb3J0cy5BY3Rpb25BcmVhID0gQWN0aW9uQXJlYTtcbmV4cG9ydHMuZGVmYXVsdCA9IEFjdGlvbkFyZWE7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1BY3Rpb25BcmVhLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIFN0eWxlcyA9IHJlcXVpcmUoXCJ3bWwtd2lkZ2V0cy1jb21tb24vU3R5bGVzXCIpO1xudmFyIHV0aWxfMSA9IHJlcXVpcmUoXCJ3bWwtd2lkZ2V0cy1jb21tb24vdXRpbFwiKTtcbmZ1bmN0aW9uICQkYm91bmRhcnlfdG9fZG90KHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlLnNwbGl0KCddWycpLmpvaW4oJy4nKS5zcGxpdCgnWycpLmpvaW4oJy4nKTtcbn1cbmZ1bmN0aW9uICQkc3RyaXBfYnJhY2VzKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlLnNwbGl0KCdbJykuam9pbignLicpLnNwbGl0KCddJykuam9pbignJyk7XG59XG5mdW5jdGlvbiAkJGVzY2FwZV9kb3RzKHZhbHVlKSB7XG4gICAgdmFsdWUgPSB2YWx1ZS5zcGxpdCgnXFwnJyk7XG4gICAgcmV0dXJuICh2YWx1ZS5sZW5ndGggPCAzKSA/IHZhbHVlLmpvaW4oJ1xcJycpIDogdmFsdWUubWFwKGZ1bmN0aW9uIChzZWcpIHtcbiAgICAgICAgaWYgKHNlZy5sZW5ndGggPCAzKVxuICAgICAgICAgICAgcmV0dXJuIHNlZztcbiAgICAgICAgaWYgKChzZWdbMF0gPT09ICcuJykgfHwgKHNlZ1tzZWcubGVuZ3RoIC0gMV0gPT09ICcuJykpXG4gICAgICAgICAgICByZXR1cm4gc2VnO1xuICAgICAgICByZXR1cm4gc2VnLnNwbGl0KCcuJykuam9pbignJiYnKTtcbiAgICB9KS5qb2luKCcnKTtcbn1cbmZ1bmN0aW9uICQkdW5lc2NhcGVfZG90cyh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZS5zcGxpdCgnJiYnKS5qb2luKCcuJyk7XG59XG5mdW5jdGlvbiAkJHBhcnRpZnkodmFsdWUpIHtcbiAgICBpZiAoIXZhbHVlKVxuICAgICAgICByZXR1cm47XG4gICAgcmV0dXJuICQkZXNjYXBlX2RvdHMoJCRzdHJpcF9icmFjZXMoJCRib3VuZGFyeV90b19kb3QoJycgKyB2YWx1ZSkpKS5zcGxpdCgnLicpO1xufVxuZnVuY3Rpb24gJCRwcm9wZXJ0eShwYXRoLCBvKSB7XG4gICAgdmFyIHBhcnRzID0gJCRwYXJ0aWZ5KHBhdGgpO1xuICAgIHZhciBmaXJzdDtcbiAgICBpZiAodHlwZW9mIG8gIT09ICdvYmplY3QnKVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdnZXQoKTogZXhwZWN0cyBhbiBvYmplY3QgZ290ICcgKyB0eXBlb2Ygbyk7XG4gICAgaWYgKHBhcnRzLmxlbmd0aCA9PT0gMSlcbiAgICAgICAgcmV0dXJuIG9bJCR1bmVzY2FwZV9kb3RzKHBhcnRzWzBdKV07XG4gICAgaWYgKHBhcnRzLmxlbmd0aCA9PT0gMClcbiAgICAgICAgcmV0dXJuO1xuICAgIGZpcnN0ID0gb1twYXJ0cy5zaGlmdCgpXTtcbiAgICByZXR1cm4gKCh0eXBlb2YgbyA9PT0gJ29iamVjdCcpICYmIChvICE9PSBudWxsKSkgP1xuICAgICAgICBwYXJ0cy5yZWR1Y2UoZnVuY3Rpb24gKHRhcmdldCwgcHJvcCkge1xuICAgICAgICAgICAgaWYgKHRhcmdldCA9PSBudWxsKVxuICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgICAgICAgICByZXR1cm4gdGFyZ2V0WyQkdW5lc2NhcGVfZG90cyhwcm9wKV07XG4gICAgICAgIH0sIGZpcnN0KSA6IG51bGw7XG59XG5mdW5jdGlvbiAkJGFkb3B0KGNoaWxkLCBlKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoY2hpbGQpKVxuICAgICAgICByZXR1cm4gY2hpbGQuZm9yRWFjaChmdW5jdGlvbiAoaW5uZXJDaGlsZCkgeyByZXR1cm4gJCRhZG9wdChpbm5lckNoaWxkLCBlKTsgfSk7XG4gICAgaWYgKGNoaWxkKVxuICAgICAgICBlLmFwcGVuZENoaWxkKCh0eXBlb2YgY2hpbGQgPT09ICdvYmplY3QnKSA/XG4gICAgICAgICAgICBjaGlsZCA6IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNoaWxkID09IG51bGwgPyAnJyA6IGNoaWxkKSk7XG59XG4vKipcbiAqICQkdGV4dCBjcmVhdGVzIGEgRE9NVGV4dE5vZGVcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICovXG5mdW5jdGlvbiAkJHRleHQodmFsdWUpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodmFsdWUgPT0gbnVsbCA/ICcnIDogdmFsdWUpO1xufVxuLyoqXG4gKiAkJHJlc29sdmUgcHJvcGVydHkgYWNjZXNzIGV4cHJlc3Npb24gdG8gYXZvaWRcbiAqIHRob3dpbmcgZXJyb3JzIGlmIGl0IGRvZXMgbm90IGV4aXN0LlxuICogQHBhcmFtIHtvYmplY3R9IGhlYWRcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoXG4gKi9cbmZ1bmN0aW9uICQkcmVzb2x2ZShoZWFkLCBwYXRoKSB7XG4gICAgdmFyIHJldCA9ICQkcHJvcGVydHkocGF0aCwgaGVhZCk7XG4gICAgcmV0dXJuIChyZXQgPT0gbnVsbCkgPyAnJyA6IHJldDtcbn1cbi8qKlxuICogJCRub2RlIGlzIGNhbGxlZCB0byBjcmVhdGUgYSByZWd1bGFyIERPTSBub2RlXG4gKiBAcGFyYW0ge3N0cmluZ30gdGFnXG4gKiBAcGFyYW0ge29iamVjdH0gYXR0cmlidXRlc1xuICogQHBhcmFtIHthcnJheTxzdHJpbmd8bnVtYmVyfFdpZGdldD59IGNoaWxkcmVuXG4gKiBAcGFyYW0ge1ZpZXd9IHZpZXdcbiAqL1xuZnVuY3Rpb24gJCRub2RlKHRhZywgYXR0cmlidXRlcywgY2hpbGRyZW4sIHZpZXcpIHtcbiAgICB2YXIgZSA9ICh0YWcgPT09ICdmcmFnbWVudCcpID8gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpIDogZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xuICAgIGlmICh0eXBlb2YgYXR0cmlidXRlcy5odG1sID09PSAnb2JqZWN0JylcbiAgICAgICAgT2JqZWN0LmtleXMoYXR0cmlidXRlcy5odG1sKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgYXR0cmlidXRlcy5odG1sW2tleV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBlW2tleV0gPSBhdHRyaWJ1dGVzLmh0bWxba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGUuc2V0QXR0cmlidXRlKGtleSwgYXR0cmlidXRlcy5odG1sW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICBjaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChjKSB7IHJldHVybiAkJGFkb3B0KGMsIGUpOyB9KTtcbiAgICBpZiAoYXR0cmlidXRlcy53bWwpXG4gICAgICAgIGlmIChhdHRyaWJ1dGVzLndtbC5pZClcbiAgICAgICAgICAgIHZpZXcucmVnaXN0ZXIoYXR0cmlidXRlcy53bWwuaWQsIGUpO1xuICAgIHJldHVybiBlO1xufVxuLyoqXG4gKiBBdHRyaWJ1dGVzIHByb3ZpZGVzIGFuIEFQSSBmb3IgcmVhZGluZyB0aGVcbiAqIGF0dHJpYnV0ZXMgc3VwcGxpZWQgdG8gYW4gRWxlbWVudC5cbiAqIEBwYXJhbSB7b2JqZWN0fSBhdHRyc1xuICovXG52YXIgQXR0cmlidXRlcyA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQXR0cmlidXRlcyhfYXR0cnMpIHtcbiAgICAgICAgdGhpcy5fYXR0cnMgPSBfYXR0cnM7XG4gICAgICAgIHRoaXMuX2F0dHJzID0gX2F0dHJzO1xuICAgIH1cbiAgICBBdHRyaWJ1dGVzLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAocGF0aCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWFkKHBhdGgpICE9IG51bGw7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiByZWFkIGEgdmFsdWUgZm9ybSB0aGUgaW50ZXJuYWwgbGlzdC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aFxuICAgICAqIEBwYXJhbSB7Kn0gZGVmYXVsdFZhbHVlIC0gVGhpcyB2YWx1ZSBpcyByZXR1cm5lZCBpZiB0aGUgdmFsdWUgaXMgbm90IHNldC5cbiAgICAgKi9cbiAgICBBdHRyaWJ1dGVzLnByb3RvdHlwZS5yZWFkID0gZnVuY3Rpb24gKHBhdGgsIGRlZmF1bHRWYWx1ZSkge1xuICAgICAgICB2YXIgcmV0ID0gJCRwcm9wZXJ0eShwYXRoLnNwbGl0KCc6Jykuam9pbignLicpLCB0aGlzLl9hdHRycyk7XG4gICAgICAgIHJldHVybiAocmV0ICE9IG51bGwpID8gcmV0IDogKGRlZmF1bHRWYWx1ZSAhPSBudWxsKSA/IGRlZmF1bHRWYWx1ZSA6ICcnO1xuICAgIH07XG4gICAgcmV0dXJuIEF0dHJpYnV0ZXM7XG59KCkpO1xuLyoqXG4gKiAkJHdpZGdldCBjcmVhdGVzIGEgd21sIHdpZGdldC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IENvbnN0cnV0b3JcbiAqIEBwYXJhbSB7b2JqZWN0fSBhdHRyaWJ1dGVzXG4gKiBAcGFyYW0ge2FycmF5PHN0cmluZ3xudW1iZXJ8V2lkZ2V0Pn0gY2hpbGRyZW5cbiAqIEBwYXJhbSB7Vmlld30gdmlld1xuICogQHJldHVybiB7V2lkZ2V0fVxuICovXG5mdW5jdGlvbiAkJHdpZGdldChDb25zdHJ1Y3RvciwgYXR0cmlidXRlcywgY2hpbGRyZW4sIHZpZXcpIHtcbiAgICB2YXIgY2hpbGRzID0gW107XG4gICAgdmFyIHc7XG4gICAgY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoY2hpbGQpIHsgcmV0dXJuIEFycmF5LmlzQXJyYXkoY2hpbGQpID9cbiAgICAgICAgY2hpbGRzLnB1c2guYXBwbHkoY2hpbGRzLCBjaGlsZCkgOiBjaGlsZHMucHVzaChjaGlsZCk7IH0pO1xuICAgIHcgPSBuZXcgQ29uc3RydWN0b3IobmV3IEF0dHJpYnV0ZXMoYXR0cmlidXRlcyksIGNoaWxkcyk7XG4gICAgaWYgKGF0dHJpYnV0ZXMud21sKVxuICAgICAgICBpZiAoYXR0cmlidXRlcy53bWwuaWQpXG4gICAgICAgICAgICB2aWV3LnJlZ2lzdGVyKGF0dHJpYnV0ZXMud21sLmlkLCB3KTtcbiAgICB2aWV3LndpZGdldHMucHVzaCh3KTtcbiAgICByZXR1cm4gdy5yZW5kZXIoKTtcbn1cbi8qKlxuICogJCRpZiBpcyBjYWxsZWQgdG8gY3JlYXRlIGFuIGlmIGNvbmRpdGlvbmFsIGNvbnN0cnVjdFxuICogQHBhcmFtIHsqfSBwcmVkaWNhdGVcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHBvc2l0aXZlXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBuZWdhdGl2ZVxuICovXG5mdW5jdGlvbiAkJGlmKHByZWRpY2F0ZSwgcG9zaXRpdmUsIG5lZ2F0aXZlKSB7XG4gICAgcmV0dXJuIChwcmVkaWNhdGUpID8gcG9zaXRpdmUoKSA6IG5lZ2F0aXZlKCk7XG59XG4vKipcbiAqICQkZm9yIGlzIGNhbGxlZCB0byBjcmVhdGUgYSBmb3IgbG9vcCBjb25zdHJ1Y3RcbiAqIEBwYXJhbSB7SXRlcmFibGV9IGNvbGxlY3Rpb25cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNiXG4gKi9cbmZ1bmN0aW9uICQkZm9yKGNvbGxlY3Rpb24sIGNiKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoY29sbGVjdGlvbikpIHtcbiAgICAgICAgcmV0dXJuIGNvbGxlY3Rpb24ubWFwKGNiKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGNvbGxlY3Rpb24gPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhjb2xsZWN0aW9uKS5tYXAoZnVuY3Rpb24gKGtleSwgXywgYWxsKSB7IHJldHVybiBjYihjb2xsZWN0aW9uW2tleV0sIGtleSwgYWxsKTsgfSk7XG4gICAgfVxuICAgIHJldHVybiBbXTtcbn1cbi8qKlxuICogJCRzd2l0Y2ggc2ltdWxhdGVzIGEgc3dpdGNoIHN0YXRlbWVudFxuICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfGJvb2xlYW59IHZhbHVlXG4gKiBAcGFyYW0ge29iamVjdH0gY2FzZXNcbiAqL1xuZnVuY3Rpb24gJCRzd2l0Y2godmFsdWUsIGNhc2VzKSB7XG4gICAgdmFyIHJlc3VsdCA9IGNhc2VzW3ZhbHVlXTtcbiAgICB2YXIgZGVmYXVsID0gY2FzZXMuZGVmYXVsdDtcbiAgICBpZiAocmVzdWx0KVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIGlmIChkZWZhdWwpXG4gICAgICAgIHJldHVybiBkZWZhdWw7XG59XG52YXIgTWFpbiA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTWFpbihjb250ZXh0KSB7XG4gICAgICAgIHZhciB2aWV3ID0gdGhpcztcbiAgICAgICAgdGhpcy5pZHMgPSB7fTtcbiAgICAgICAgdGhpcy53aWRnZXRzID0gW107XG4gICAgICAgIHRoaXMudHJlZSA9IG51bGw7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gJCRub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogdXRpbF8xLmNvbWJpbmUoWyQkcmVzb2x2ZShTdHlsZXMsICdBQ1RJT05fQVJFQScpLCAkJHJlc29sdmUoU3R5bGVzLCAnRFJBV0VSX1BVU0hBQkxFX0ZJWEVEJyldKSB9IH0sIFskJG5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiAkJHJlc29sdmUoU3R5bGVzLCAnQUNUSU9OX0FSRUFfQ09OVEVOVCcpIH0sIHdtbDogeyAnaWQnOiBcImNvbnRlbnRcIiB9IH0sIFskJHJlc29sdmUodGhpcywgJ2NoaWxkcmVuJyldLCB2aWV3KV0sIHZpZXcpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBNYWluLnJlbmRlciA9IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgICAgIHJldHVybiAobmV3IE1haW4oY29udGV4dCkpLnJlbmRlcigpO1xuICAgIH07XG4gICAgTWFpbi5wcm90b3R5cGUucmVnaXN0ZXIgPSBmdW5jdGlvbiAoaWQsIHcpIHtcbiAgICAgICAgaWYgKHRoaXMuaWRzLmhhc093blByb3BlcnR5KGlkKSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRHVwbGljYXRlIGlkIFxcJycgKyBpZCArICdcXCcgZGV0ZWN0ZWQhJyk7XG4gICAgICAgIHRoaXMuaWRzW2lkXSA9IHc7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgTWFpbi5wcm90b3R5cGUuZmluZEJ5SWQgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmlkc1tpZF0pID8gdGhpcy5pZHNbaWRdIDogbnVsbDtcbiAgICB9O1xuICAgIE1haW4ucHJvdG90eXBlLmludmFsaWRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjaGlsZHM7XG4gICAgICAgIHZhciBwYXJlbnQgPSB0aGlzLnRyZWUucGFyZW50Tm9kZTtcbiAgICAgICAgdmFyIHJlYWxGaXJzdENoaWxkO1xuICAgICAgICB2YXIgcmVhbEZpcnN0Q2hpbGRJbmRleDtcbiAgICAgICAgaWYgKHRoaXMudHJlZSA9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKCdDYW5ub3QgaW52YWxpZGF0ZSBhIHZpZXcgdGhhdCBoYXMgbm90IGJlZW4gcmVuZGVyZWQhJyk7XG4gICAgICAgIGlmICh0aGlzLnRyZWUucGFyZW50Tm9kZSA9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKCdBdHRlbXB0IHRvIGludmFsaWRhdGUgYSB2aWV3IHRoYXQgaGFzIG5vdCBiZWVuIGluc2VydGVkIHRvIERPTSEnKTtcbiAgICAgICAgY2hpbGRzID0gdGhpcy50cmVlLnBhcmVudE5vZGUuY2hpbGRyZW47XG4gICAgICAgIC8vZm9yIHNvbWUgcmVhc29uIHRoZSByZWZlcmVuY2Ugc3RvcmVkIGRvZXMgbm90IGhhdmUgdGhlIGNvcnJlY3QgcGFyZW50IG5vZGUuXG4gICAgICAgIC8vd2UgZG8gdGhpcyB0byBnZXQgYSAnbGl2ZScgdmVyc2lvbiBvZiB0aGUgbm9kZS5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHMubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICBpZiAoY2hpbGRzW2ldID09PSB0aGlzLnRyZWUpIHtcbiAgICAgICAgICAgICAgICByZWFsRmlyc3RDaGlsZCA9IGNoaWxkc1tpXTtcbiAgICAgICAgICAgICAgICByZWFsRmlyc3RDaGlsZEluZGV4ID0gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgcGFyZW50LnJlcGxhY2VDaGlsZCh0aGlzLnJlbmRlcigpLCByZWFsRmlyc3RDaGlsZCk7XG4gICAgfTtcbiAgICBNYWluLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuaWRzID0ge307XG4gICAgICAgIHRoaXMud2lkZ2V0cy5mb3JFYWNoKGZ1bmN0aW9uICh3KSB7IHJldHVybiB3LnJlbW92ZWQoKTsgfSk7XG4gICAgICAgIHRoaXMud2lkZ2V0cyA9IFtdO1xuICAgICAgICB0aGlzLnRyZWUgPSB0aGlzLnRlbXBsYXRlLmNhbGwodGhpcy5jb250ZXh0KTtcbiAgICAgICAgdGhpcy5pZHNbJ3Jvb3QnXSA9ICh0aGlzLmlkc1sncm9vdCddKSA/IHRoaXMuaWRzWydyb290J10gOiB0aGlzLnRyZWU7XG4gICAgICAgIHRoaXMud2lkZ2V0cy5mb3JFYWNoKGZ1bmN0aW9uICh3KSB7IHJldHVybiB3LnJlbmRlcmVkKCk7IH0pO1xuICAgICAgICByZXR1cm4gdGhpcy50cmVlO1xuICAgIH07XG4gICAgcmV0dXJuIE1haW47XG59KCkpO1xuZXhwb3J0cy5NYWluID0gTWFpbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFjdGlvbl9hcmVhLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgcnVudGltZV8xID0gcmVxdWlyZShcIkBxdWVuay93bWwvbGliL3J1bnRpbWVcIik7XG52YXIgYnV0dG9uXzEgPSByZXF1aXJlKFwiLi93bWwvYnV0dG9uXCIpO1xuLyoqXG4gKiBCdXR0b24gaXMgYW4gaW1wcm92ZW1lbnQgb3ZlciBIVE1MQnV0dGlvbkVsZW1lbnRcbiAqL1xudmFyIEJ1dHRvbiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEJ1dHRvbiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBCdXR0b24oKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IGJ1dHRvbl8xLk1haW4oX3RoaXMpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIGRpc2FibGUgdGhpcyBidXR0b24uXG4gICAgICovXG4gICAgQnV0dG9uLnByb3RvdHlwZS5kaXNhYmxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnZpZXcuZmluZEJ5SWQoJ2J1dHRvbicpLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIGVuYWJsZSB0aGlzIGJ1dHRvbi5cbiAgICAgKi9cbiAgICBCdXR0b24ucHJvdG90eXBlLmVuYWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy52aWV3LmZpbmRCeUlkKCdidXR0b24nKS5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG4gICAgfTtcbiAgICBCdXR0b24ucHJvdG90eXBlLnJlbmRlcmVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDpkaXNhYmxlZCcpKVxuICAgICAgICAgICAgdGhpcy52aWV3LmZpbmRCeUlkKCdidXR0b24nKS5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG4gICAgfTtcbiAgICByZXR1cm4gQnV0dG9uO1xufShydW50aW1lXzEuQWJzdHJhY3RXaWRnZXQpKTtcbmV4cG9ydHMuQnV0dG9uID0gQnV0dG9uO1xuZXhwb3J0cy5kZWZhdWx0ID0gQnV0dG9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QnV0dG9uLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIFN0eWxlcyA9IHJlcXVpcmUoXCJ3bWwtd2lkZ2V0cy1jb21tb24vU3R5bGVzXCIpO1xudmFyIHV0aWxfMSA9IHJlcXVpcmUoXCJ3bWwtd2lkZ2V0cy1jb21tb24vdXRpbFwiKTtcbmZ1bmN0aW9uICQkYm91bmRhcnlfdG9fZG90KHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlLnNwbGl0KCddWycpLmpvaW4oJy4nKS5zcGxpdCgnWycpLmpvaW4oJy4nKTtcbn1cbmZ1bmN0aW9uICQkc3RyaXBfYnJhY2VzKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlLnNwbGl0KCdbJykuam9pbignLicpLnNwbGl0KCddJykuam9pbignJyk7XG59XG5mdW5jdGlvbiAkJGVzY2FwZV9kb3RzKHZhbHVlKSB7XG4gICAgdmFsdWUgPSB2YWx1ZS5zcGxpdCgnXFwnJyk7XG4gICAgcmV0dXJuICh2YWx1ZS5sZW5ndGggPCAzKSA/IHZhbHVlLmpvaW4oJ1xcJycpIDogdmFsdWUubWFwKGZ1bmN0aW9uIChzZWcpIHtcbiAgICAgICAgaWYgKHNlZy5sZW5ndGggPCAzKVxuICAgICAgICAgICAgcmV0dXJuIHNlZztcbiAgICAgICAgaWYgKChzZWdbMF0gPT09ICcuJykgfHwgKHNlZ1tzZWcubGVuZ3RoIC0gMV0gPT09ICcuJykpXG4gICAgICAgICAgICByZXR1cm4gc2VnO1xuICAgICAgICByZXR1cm4gc2VnLnNwbGl0KCcuJykuam9pbignJiYnKTtcbiAgICB9KS5qb2luKCcnKTtcbn1cbmZ1bmN0aW9uICQkdW5lc2NhcGVfZG90cyh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZS5zcGxpdCgnJiYnKS5qb2luKCcuJyk7XG59XG5mdW5jdGlvbiAkJHBhcnRpZnkodmFsdWUpIHtcbiAgICBpZiAoIXZhbHVlKVxuICAgICAgICByZXR1cm47XG4gICAgcmV0dXJuICQkZXNjYXBlX2RvdHMoJCRzdHJpcF9icmFjZXMoJCRib3VuZGFyeV90b19kb3QoJycgKyB2YWx1ZSkpKS5zcGxpdCgnLicpO1xufVxuZnVuY3Rpb24gJCRwcm9wZXJ0eShwYXRoLCBvKSB7XG4gICAgdmFyIHBhcnRzID0gJCRwYXJ0aWZ5KHBhdGgpO1xuICAgIHZhciBmaXJzdDtcbiAgICBpZiAodHlwZW9mIG8gIT09ICdvYmplY3QnKVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdnZXQoKTogZXhwZWN0cyBhbiBvYmplY3QgZ290ICcgKyB0eXBlb2Ygbyk7XG4gICAgaWYgKHBhcnRzLmxlbmd0aCA9PT0gMSlcbiAgICAgICAgcmV0dXJuIG9bJCR1bmVzY2FwZV9kb3RzKHBhcnRzWzBdKV07XG4gICAgaWYgKHBhcnRzLmxlbmd0aCA9PT0gMClcbiAgICAgICAgcmV0dXJuO1xuICAgIGZpcnN0ID0gb1twYXJ0cy5zaGlmdCgpXTtcbiAgICByZXR1cm4gKCh0eXBlb2YgbyA9PT0gJ29iamVjdCcpICYmIChvICE9PSBudWxsKSkgP1xuICAgICAgICBwYXJ0cy5yZWR1Y2UoZnVuY3Rpb24gKHRhcmdldCwgcHJvcCkge1xuICAgICAgICAgICAgaWYgKHRhcmdldCA9PSBudWxsKVxuICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgICAgICAgICByZXR1cm4gdGFyZ2V0WyQkdW5lc2NhcGVfZG90cyhwcm9wKV07XG4gICAgICAgIH0sIGZpcnN0KSA6IG51bGw7XG59XG5mdW5jdGlvbiAkJGFkb3B0KGNoaWxkLCBlKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoY2hpbGQpKVxuICAgICAgICByZXR1cm4gY2hpbGQuZm9yRWFjaChmdW5jdGlvbiAoaW5uZXJDaGlsZCkgeyByZXR1cm4gJCRhZG9wdChpbm5lckNoaWxkLCBlKTsgfSk7XG4gICAgaWYgKGNoaWxkKVxuICAgICAgICBlLmFwcGVuZENoaWxkKCh0eXBlb2YgY2hpbGQgPT09ICdvYmplY3QnKSA/XG4gICAgICAgICAgICBjaGlsZCA6IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNoaWxkID09IG51bGwgPyAnJyA6IGNoaWxkKSk7XG59XG4vKipcbiAqICQkdGV4dCBjcmVhdGVzIGEgRE9NVGV4dE5vZGVcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICovXG5mdW5jdGlvbiAkJHRleHQodmFsdWUpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodmFsdWUgPT0gbnVsbCA/ICcnIDogdmFsdWUpO1xufVxuLyoqXG4gKiAkJHJlc29sdmUgcHJvcGVydHkgYWNjZXNzIGV4cHJlc3Npb24gdG8gYXZvaWRcbiAqIHRob3dpbmcgZXJyb3JzIGlmIGl0IGRvZXMgbm90IGV4aXN0LlxuICogQHBhcmFtIHtvYmplY3R9IGhlYWRcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoXG4gKi9cbmZ1bmN0aW9uICQkcmVzb2x2ZShoZWFkLCBwYXRoKSB7XG4gICAgdmFyIHJldCA9ICQkcHJvcGVydHkocGF0aCwgaGVhZCk7XG4gICAgcmV0dXJuIChyZXQgPT0gbnVsbCkgPyAnJyA6IHJldDtcbn1cbi8qKlxuICogJCRub2RlIGlzIGNhbGxlZCB0byBjcmVhdGUgYSByZWd1bGFyIERPTSBub2RlXG4gKiBAcGFyYW0ge3N0cmluZ30gdGFnXG4gKiBAcGFyYW0ge29iamVjdH0gYXR0cmlidXRlc1xuICogQHBhcmFtIHthcnJheTxzdHJpbmd8bnVtYmVyfFdpZGdldD59IGNoaWxkcmVuXG4gKiBAcGFyYW0ge1ZpZXd9IHZpZXdcbiAqL1xuZnVuY3Rpb24gJCRub2RlKHRhZywgYXR0cmlidXRlcywgY2hpbGRyZW4sIHZpZXcpIHtcbiAgICB2YXIgZSA9ICh0YWcgPT09ICdmcmFnbWVudCcpID8gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpIDogZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xuICAgIGlmICh0eXBlb2YgYXR0cmlidXRlcy5odG1sID09PSAnb2JqZWN0JylcbiAgICAgICAgT2JqZWN0LmtleXMoYXR0cmlidXRlcy5odG1sKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgYXR0cmlidXRlcy5odG1sW2tleV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBlW2tleV0gPSBhdHRyaWJ1dGVzLmh0bWxba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGUuc2V0QXR0cmlidXRlKGtleSwgYXR0cmlidXRlcy5odG1sW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICBjaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChjKSB7IHJldHVybiAkJGFkb3B0KGMsIGUpOyB9KTtcbiAgICBpZiAoYXR0cmlidXRlcy53bWwpXG4gICAgICAgIGlmIChhdHRyaWJ1dGVzLndtbC5pZClcbiAgICAgICAgICAgIHZpZXcucmVnaXN0ZXIoYXR0cmlidXRlcy53bWwuaWQsIGUpO1xuICAgIHJldHVybiBlO1xufVxuLyoqXG4gKiBBdHRyaWJ1dGVzIHByb3ZpZGVzIGFuIEFQSSBmb3IgcmVhZGluZyB0aGVcbiAqIGF0dHJpYnV0ZXMgc3VwcGxpZWQgdG8gYW4gRWxlbWVudC5cbiAqIEBwYXJhbSB7b2JqZWN0fSBhdHRyc1xuICovXG52YXIgQXR0cmlidXRlcyA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQXR0cmlidXRlcyhfYXR0cnMpIHtcbiAgICAgICAgdGhpcy5fYXR0cnMgPSBfYXR0cnM7XG4gICAgICAgIHRoaXMuX2F0dHJzID0gX2F0dHJzO1xuICAgIH1cbiAgICBBdHRyaWJ1dGVzLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAocGF0aCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWFkKHBhdGgpICE9IG51bGw7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiByZWFkIGEgdmFsdWUgZm9ybSB0aGUgaW50ZXJuYWwgbGlzdC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aFxuICAgICAqIEBwYXJhbSB7Kn0gZGVmYXVsdFZhbHVlIC0gVGhpcyB2YWx1ZSBpcyByZXR1cm5lZCBpZiB0aGUgdmFsdWUgaXMgbm90IHNldC5cbiAgICAgKi9cbiAgICBBdHRyaWJ1dGVzLnByb3RvdHlwZS5yZWFkID0gZnVuY3Rpb24gKHBhdGgsIGRlZmF1bHRWYWx1ZSkge1xuICAgICAgICB2YXIgcmV0ID0gJCRwcm9wZXJ0eShwYXRoLnNwbGl0KCc6Jykuam9pbignLicpLCB0aGlzLl9hdHRycyk7XG4gICAgICAgIHJldHVybiAocmV0ICE9IG51bGwpID8gcmV0IDogKGRlZmF1bHRWYWx1ZSAhPSBudWxsKSA/IGRlZmF1bHRWYWx1ZSA6ICcnO1xuICAgIH07XG4gICAgcmV0dXJuIEF0dHJpYnV0ZXM7XG59KCkpO1xuLyoqXG4gKiAkJHdpZGdldCBjcmVhdGVzIGEgd21sIHdpZGdldC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IENvbnN0cnV0b3JcbiAqIEBwYXJhbSB7b2JqZWN0fSBhdHRyaWJ1dGVzXG4gKiBAcGFyYW0ge2FycmF5PHN0cmluZ3xudW1iZXJ8V2lkZ2V0Pn0gY2hpbGRyZW5cbiAqIEBwYXJhbSB7Vmlld30gdmlld1xuICogQHJldHVybiB7V2lkZ2V0fVxuICovXG5mdW5jdGlvbiAkJHdpZGdldChDb25zdHJ1Y3RvciwgYXR0cmlidXRlcywgY2hpbGRyZW4sIHZpZXcpIHtcbiAgICB2YXIgY2hpbGRzID0gW107XG4gICAgdmFyIHc7XG4gICAgY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoY2hpbGQpIHsgcmV0dXJuIEFycmF5LmlzQXJyYXkoY2hpbGQpID9cbiAgICAgICAgY2hpbGRzLnB1c2guYXBwbHkoY2hpbGRzLCBjaGlsZCkgOiBjaGlsZHMucHVzaChjaGlsZCk7IH0pO1xuICAgIHcgPSBuZXcgQ29uc3RydWN0b3IobmV3IEF0dHJpYnV0ZXMoYXR0cmlidXRlcyksIGNoaWxkcyk7XG4gICAgaWYgKGF0dHJpYnV0ZXMud21sKVxuICAgICAgICBpZiAoYXR0cmlidXRlcy53bWwuaWQpXG4gICAgICAgICAgICB2aWV3LnJlZ2lzdGVyKGF0dHJpYnV0ZXMud21sLmlkLCB3KTtcbiAgICB2aWV3LndpZGdldHMucHVzaCh3KTtcbiAgICByZXR1cm4gdy5yZW5kZXIoKTtcbn1cbi8qKlxuICogJCRpZiBpcyBjYWxsZWQgdG8gY3JlYXRlIGFuIGlmIGNvbmRpdGlvbmFsIGNvbnN0cnVjdFxuICogQHBhcmFtIHsqfSBwcmVkaWNhdGVcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHBvc2l0aXZlXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBuZWdhdGl2ZVxuICovXG5mdW5jdGlvbiAkJGlmKHByZWRpY2F0ZSwgcG9zaXRpdmUsIG5lZ2F0aXZlKSB7XG4gICAgcmV0dXJuIChwcmVkaWNhdGUpID8gcG9zaXRpdmUoKSA6IG5lZ2F0aXZlKCk7XG59XG4vKipcbiAqICQkZm9yIGlzIGNhbGxlZCB0byBjcmVhdGUgYSBmb3IgbG9vcCBjb25zdHJ1Y3RcbiAqIEBwYXJhbSB7SXRlcmFibGV9IGNvbGxlY3Rpb25cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNiXG4gKi9cbmZ1bmN0aW9uICQkZm9yKGNvbGxlY3Rpb24sIGNiKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoY29sbGVjdGlvbikpIHtcbiAgICAgICAgcmV0dXJuIGNvbGxlY3Rpb24ubWFwKGNiKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGNvbGxlY3Rpb24gPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhjb2xsZWN0aW9uKS5tYXAoZnVuY3Rpb24gKGtleSwgXywgYWxsKSB7IHJldHVybiBjYihjb2xsZWN0aW9uW2tleV0sIGtleSwgYWxsKTsgfSk7XG4gICAgfVxuICAgIHJldHVybiBbXTtcbn1cbi8qKlxuICogJCRzd2l0Y2ggc2ltdWxhdGVzIGEgc3dpdGNoIHN0YXRlbWVudFxuICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfGJvb2xlYW59IHZhbHVlXG4gKiBAcGFyYW0ge29iamVjdH0gY2FzZXNcbiAqL1xuZnVuY3Rpb24gJCRzd2l0Y2godmFsdWUsIGNhc2VzKSB7XG4gICAgdmFyIHJlc3VsdCA9IGNhc2VzW3ZhbHVlXTtcbiAgICB2YXIgZGVmYXVsID0gY2FzZXMuZGVmYXVsdDtcbiAgICBpZiAocmVzdWx0KVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIGlmIChkZWZhdWwpXG4gICAgICAgIHJldHVybiBkZWZhdWw7XG59XG52YXIgTWFpbiA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTWFpbihjb250ZXh0KSB7XG4gICAgICAgIHZhciB2aWV3ID0gdGhpcztcbiAgICAgICAgdGhpcy5pZHMgPSB7fTtcbiAgICAgICAgdGhpcy53aWRnZXRzID0gW107XG4gICAgICAgIHRoaXMudHJlZSA9IG51bGw7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gJCRub2RlKCdmcmFnbWVudCcsIHsgaHRtbDoge30gfSwgWyQkaWYodGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmhyZWYnKSwgZnVuY3Rpb24gaWYwKCkgeyByZXR1cm4gWyQkbm9kZSgnYScsIHsgaHRtbDogeyAnaHJlZic6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpocmVmJyksICdjbGFzcyc6IHV0aWxfMS5jb21iaW5lKFskJHJlc29sdmUoU3R5bGVzLCAnQlVUVE9OJyksIHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzp2YXJpYW50JywgJycpLCB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6c2l6ZScsICcnKSwgdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OnN0eWxlJywgJCRyZXNvbHZlKFN0eWxlcywgJ0RFRkFVTFQnKSksIHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpjbGFzcycpXSksICdvbmNsaWNrJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3Om9uQ2xpY2snLCB1dGlsXzEubm9vcCkgfSwgd21sOiB7ICdpZCc6IFwiYnV0dG9uXCIgfSB9LCBbdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OnRleHQnKSwgJCRyZXNvbHZlKHRoaXMsICdjaGlsZHJlbicpXSwgdmlldyldOyB9LmJpbmQodGhpcyksIGZ1bmN0aW9uIGVsc2VfY2xhdXNlMCgpIHsgcmV0dXJuIFskJG5vZGUoJ2J1dHRvbicsIHsgaHRtbDogeyAndHlwZSc6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzp0eXBlJywgJ2J1dHRvbicpLCAnbmFtZSc6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpuYW1lJywgJycpLCAnY2xhc3MnOiB1dGlsXzEuY29tYmluZShbJCRyZXNvbHZlKFN0eWxlcywgJ0JVVFRPTicpLCB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6dmFyaWFudCcsICcnKSwgdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OnNpemUnLCAnJyksIHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpzdHlsZScsICQkcmVzb2x2ZShTdHlsZXMsICdERUZBVUxUJykpLCB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6Y2xhc3MnKV0pLCAnb25jbGljayc6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpvbkNsaWNrJywgdXRpbF8xLm5vb3ApIH0sIHdtbDogeyAnaWQnOiBcImJ1dHRvblwiIH0gfSwgW3RoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzp0ZXh0JyksICQkcmVzb2x2ZSh0aGlzLCAnY2hpbGRyZW4nKV0sIHZpZXcpXTsgfS5iaW5kKHRoaXMpKV0sIHZpZXcpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBNYWluLnJlbmRlciA9IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgICAgIHJldHVybiAobmV3IE1haW4oY29udGV4dCkpLnJlbmRlcigpO1xuICAgIH07XG4gICAgTWFpbi5wcm90b3R5cGUucmVnaXN0ZXIgPSBmdW5jdGlvbiAoaWQsIHcpIHtcbiAgICAgICAgaWYgKHRoaXMuaWRzLmhhc093blByb3BlcnR5KGlkKSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRHVwbGljYXRlIGlkIFxcJycgKyBpZCArICdcXCcgZGV0ZWN0ZWQhJyk7XG4gICAgICAgIHRoaXMuaWRzW2lkXSA9IHc7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgTWFpbi5wcm90b3R5cGUuZmluZEJ5SWQgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmlkc1tpZF0pID8gdGhpcy5pZHNbaWRdIDogbnVsbDtcbiAgICB9O1xuICAgIE1haW4ucHJvdG90eXBlLmludmFsaWRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjaGlsZHM7XG4gICAgICAgIHZhciBwYXJlbnQgPSB0aGlzLnRyZWUucGFyZW50Tm9kZTtcbiAgICAgICAgdmFyIHJlYWxGaXJzdENoaWxkO1xuICAgICAgICB2YXIgcmVhbEZpcnN0Q2hpbGRJbmRleDtcbiAgICAgICAgaWYgKHRoaXMudHJlZSA9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKCdDYW5ub3QgaW52YWxpZGF0ZSBhIHZpZXcgdGhhdCBoYXMgbm90IGJlZW4gcmVuZGVyZWQhJyk7XG4gICAgICAgIGlmICh0aGlzLnRyZWUucGFyZW50Tm9kZSA9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKCdBdHRlbXB0IHRvIGludmFsaWRhdGUgYSB2aWV3IHRoYXQgaGFzIG5vdCBiZWVuIGluc2VydGVkIHRvIERPTSEnKTtcbiAgICAgICAgY2hpbGRzID0gdGhpcy50cmVlLnBhcmVudE5vZGUuY2hpbGRyZW47XG4gICAgICAgIC8vZm9yIHNvbWUgcmVhc29uIHRoZSByZWZlcmVuY2Ugc3RvcmVkIGRvZXMgbm90IGhhdmUgdGhlIGNvcnJlY3QgcGFyZW50IG5vZGUuXG4gICAgICAgIC8vd2UgZG8gdGhpcyB0byBnZXQgYSAnbGl2ZScgdmVyc2lvbiBvZiB0aGUgbm9kZS5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHMubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICBpZiAoY2hpbGRzW2ldID09PSB0aGlzLnRyZWUpIHtcbiAgICAgICAgICAgICAgICByZWFsRmlyc3RDaGlsZCA9IGNoaWxkc1tpXTtcbiAgICAgICAgICAgICAgICByZWFsRmlyc3RDaGlsZEluZGV4ID0gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgcGFyZW50LnJlcGxhY2VDaGlsZCh0aGlzLnJlbmRlcigpLCByZWFsRmlyc3RDaGlsZCk7XG4gICAgfTtcbiAgICBNYWluLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuaWRzID0ge307XG4gICAgICAgIHRoaXMud2lkZ2V0cy5mb3JFYWNoKGZ1bmN0aW9uICh3KSB7IHJldHVybiB3LnJlbW92ZWQoKTsgfSk7XG4gICAgICAgIHRoaXMud2lkZ2V0cyA9IFtdO1xuICAgICAgICB0aGlzLnRyZWUgPSB0aGlzLnRlbXBsYXRlLmNhbGwodGhpcy5jb250ZXh0KTtcbiAgICAgICAgdGhpcy5pZHNbJ3Jvb3QnXSA9ICh0aGlzLmlkc1sncm9vdCddKSA/IHRoaXMuaWRzWydyb290J10gOiB0aGlzLnRyZWU7XG4gICAgICAgIHRoaXMud2lkZ2V0cy5mb3JFYWNoKGZ1bmN0aW9uICh3KSB7IHJldHVybiB3LnJlbmRlcmVkKCk7IH0pO1xuICAgICAgICByZXR1cm4gdGhpcy50cmVlO1xuICAgIH07XG4gICAgcmV0dXJuIE1haW47XG59KCkpO1xuZXhwb3J0cy5NYWluID0gTWFpbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJ1dHRvbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJ1bnRpbWVfMSA9IHJlcXVpcmUoXCJAcXVlbmsvd21sL2xpYi9ydW50aW1lXCIpO1xudmFyIFN0eWxlcyA9IHJlcXVpcmUoXCJ3bWwtd2lkZ2V0cy1jb21tb24vU3R5bGVzXCIpO1xudmFyIGRyYXdlcl9sYXlvdXRfMSA9IHJlcXVpcmUoXCIuL3dtbC9kcmF3ZXItbGF5b3V0XCIpO1xudmFyIHV0aWxfMSA9IHJlcXVpcmUoXCJ3bWwtd2lkZ2V0cy1jb21tb24vdXRpbFwiKTtcbi8qKlxuICogRHJhd2VyTGF5b3V0IHByb3ZpZGVzIGEgdG9wIGxldmVsIGxheW91dCBjb25zaXN0aW5nIG9mIGEgZHJhd2VyIGFuZFxuICogYSBtYWluIGNvbnRlbnQgdmlldy5cbiAqL1xudmFyIERyYXdlckxheW91dCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKERyYXdlckxheW91dCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBEcmF3ZXJMYXlvdXQoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IGRyYXdlcl9sYXlvdXRfMS5NYWluKF90aGlzKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBEcmF3ZXJMYXlvdXQucHJvdG90eXBlLl9nZXREcmF3ZXJET00gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZpZXcuZmluZEJ5SWQoJ2RyYXdlcicpO1xuICAgIH07XG4gICAgRHJhd2VyTGF5b3V0LnByb3RvdHlwZS5fY29tYmluZSA9IGZ1bmN0aW9uIChjbGFzc2VzKSB7XG4gICAgICAgIHJldHVybiBjbGFzc2VzLmpvaW4oJyAnKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIGRyYXdlclZpc2libGUgcXVlcmllcyB3aGV0aGVyIHRoZSBEcmF3ZXIgaXMgdmlzaWJsZSBvciBub3QuXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAgICovXG4gICAgRHJhd2VyTGF5b3V0LnByb3RvdHlwZS5kcmF3ZXJWaXNpYmxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gIXRoaXMuX2dldERyYXdlckRPTSgpLmNsYXNzTGlzdC5jb250YWlucyhTdHlsZXMuSElEREVOKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIGhpZGVEcmF3ZXIgaGlkZXMgdGhlIGRyYXdlci5cbiAgICAgKi9cbiAgICBEcmF3ZXJMYXlvdXQucHJvdG90eXBlLmhpZGVEcmF3ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmRyYXdlclZpc2libGUoKSlcbiAgICAgICAgICAgIHRoaXMuX2dldERyYXdlckRPTSgpLmNsYXNzTGlzdC5hZGQoU3R5bGVzLkhJRERFTik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBzaG93RHJhd2VyIHNob3dzIHRoZSBkcmF3ZXJcbiAgICAgKi9cbiAgICBEcmF3ZXJMYXlvdXQucHJvdG90eXBlLnNob3dEcmF3ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5kcmF3ZXJWaXNpYmxlKCkpXG4gICAgICAgICAgICB0aGlzLl9nZXREcmF3ZXJET00oKS5jbGFzc0xpc3QucmVtb3ZlKFN0eWxlcy5ISURERU4pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogdG9nZ2xlIHRoZSB2aXNpYmlsaXR5IG9mIHRoaXMgRHJhd2VyXG4gICAgICovXG4gICAgRHJhd2VyTGF5b3V0LnByb3RvdHlwZS50b2dnbGVEcmF3ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2dldERyYXdlckRPTSgpLmNsYXNzTGlzdC50b2dnbGUoU3R5bGVzLkhJRERFTik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBzZXRDb250ZW50IHJlcGxhY2VzIHRoZSBjb250ZW50IG9mIHRoaXMgdmlldy5cbiAgICAgKi9cbiAgICBEcmF3ZXJMYXlvdXQucHJvdG90eXBlLnNldENvbnRlbnQgPSBmdW5jdGlvbiAocikge1xuICAgICAgICB1dGlsXzEucmVwbGFjZUNvbnRlbnQociwgdGhpcy52aWV3LmZpbmRCeUlkKCdjb250ZW50JykpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIHJldHVybiBEcmF3ZXJMYXlvdXQ7XG59KHJ1bnRpbWVfMS5BYnN0cmFjdFdpZGdldCkpO1xuZXhwb3J0cy5EcmF3ZXJMYXlvdXQgPSBEcmF3ZXJMYXlvdXQ7XG5leHBvcnRzLmRlZmF1bHQgPSBEcmF3ZXJMYXlvdXQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1EcmF3ZXJMYXlvdXQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgU3R5bGVzID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi9TdHlsZXNcIik7XG5mdW5jdGlvbiAkJGJvdW5kYXJ5X3RvX2RvdCh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZS5zcGxpdCgnXVsnKS5qb2luKCcuJykuc3BsaXQoJ1snKS5qb2luKCcuJyk7XG59XG5mdW5jdGlvbiAkJHN0cmlwX2JyYWNlcyh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZS5zcGxpdCgnWycpLmpvaW4oJy4nKS5zcGxpdCgnXScpLmpvaW4oJycpO1xufVxuZnVuY3Rpb24gJCRlc2NhcGVfZG90cyh2YWx1ZSkge1xuICAgIHZhbHVlID0gdmFsdWUuc3BsaXQoJ1xcJycpO1xuICAgIHJldHVybiAodmFsdWUubGVuZ3RoIDwgMykgPyB2YWx1ZS5qb2luKCdcXCcnKSA6IHZhbHVlLm1hcChmdW5jdGlvbiAoc2VnKSB7XG4gICAgICAgIGlmIChzZWcubGVuZ3RoIDwgMylcbiAgICAgICAgICAgIHJldHVybiBzZWc7XG4gICAgICAgIGlmICgoc2VnWzBdID09PSAnLicpIHx8IChzZWdbc2VnLmxlbmd0aCAtIDFdID09PSAnLicpKVxuICAgICAgICAgICAgcmV0dXJuIHNlZztcbiAgICAgICAgcmV0dXJuIHNlZy5zcGxpdCgnLicpLmpvaW4oJyYmJyk7XG4gICAgfSkuam9pbignJyk7XG59XG5mdW5jdGlvbiAkJHVuZXNjYXBlX2RvdHModmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUuc3BsaXQoJyYmJykuam9pbignLicpO1xufVxuZnVuY3Rpb24gJCRwYXJ0aWZ5KHZhbHVlKSB7XG4gICAgaWYgKCF2YWx1ZSlcbiAgICAgICAgcmV0dXJuO1xuICAgIHJldHVybiAkJGVzY2FwZV9kb3RzKCQkc3RyaXBfYnJhY2VzKCQkYm91bmRhcnlfdG9fZG90KCcnICsgdmFsdWUpKSkuc3BsaXQoJy4nKTtcbn1cbmZ1bmN0aW9uICQkcHJvcGVydHkocGF0aCwgbykge1xuICAgIHZhciBwYXJ0cyA9ICQkcGFydGlmeShwYXRoKTtcbiAgICB2YXIgZmlyc3Q7XG4gICAgaWYgKHR5cGVvZiBvICE9PSAnb2JqZWN0JylcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZ2V0KCk6IGV4cGVjdHMgYW4gb2JqZWN0IGdvdCAnICsgdHlwZW9mIG8pO1xuICAgIGlmIChwYXJ0cy5sZW5ndGggPT09IDEpXG4gICAgICAgIHJldHVybiBvWyQkdW5lc2NhcGVfZG90cyhwYXJ0c1swXSldO1xuICAgIGlmIChwYXJ0cy5sZW5ndGggPT09IDApXG4gICAgICAgIHJldHVybjtcbiAgICBmaXJzdCA9IG9bcGFydHMuc2hpZnQoKV07XG4gICAgcmV0dXJuICgodHlwZW9mIG8gPT09ICdvYmplY3QnKSAmJiAobyAhPT0gbnVsbCkpID9cbiAgICAgICAgcGFydHMucmVkdWNlKGZ1bmN0aW9uICh0YXJnZXQsIHByb3ApIHtcbiAgICAgICAgICAgIGlmICh0YXJnZXQgPT0gbnVsbClcbiAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgICAgICAgICAgcmV0dXJuIHRhcmdldFskJHVuZXNjYXBlX2RvdHMocHJvcCldO1xuICAgICAgICB9LCBmaXJzdCkgOiBudWxsO1xufVxuZnVuY3Rpb24gJCRhZG9wdChjaGlsZCwgZSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGNoaWxkKSlcbiAgICAgICAgcmV0dXJuIGNoaWxkLmZvckVhY2goZnVuY3Rpb24gKGlubmVyQ2hpbGQpIHsgcmV0dXJuICQkYWRvcHQoaW5uZXJDaGlsZCwgZSk7IH0pO1xuICAgIGlmIChjaGlsZClcbiAgICAgICAgZS5hcHBlbmRDaGlsZCgodHlwZW9mIGNoaWxkID09PSAnb2JqZWN0JykgP1xuICAgICAgICAgICAgY2hpbGQgOiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjaGlsZCA9PSBudWxsID8gJycgOiBjaGlsZCkpO1xufVxuLyoqXG4gKiAkJHRleHQgY3JlYXRlcyBhIERPTVRleHROb2RlXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAqL1xuZnVuY3Rpb24gJCR0ZXh0KHZhbHVlKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlKTtcbn1cbi8qKlxuICogJCRyZXNvbHZlIHByb3BlcnR5IGFjY2VzcyBleHByZXNzaW9uIHRvIGF2b2lkXG4gKiB0aG93aW5nIGVycm9ycyBpZiBpdCBkb2VzIG5vdCBleGlzdC5cbiAqIEBwYXJhbSB7b2JqZWN0fSBoZWFkXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0aFxuICovXG5mdW5jdGlvbiAkJHJlc29sdmUoaGVhZCwgcGF0aCkge1xuICAgIHZhciByZXQgPSAkJHByb3BlcnR5KHBhdGgsIGhlYWQpO1xuICAgIHJldHVybiAocmV0ID09IG51bGwpID8gJycgOiByZXQ7XG59XG4vKipcbiAqICQkbm9kZSBpcyBjYWxsZWQgdG8gY3JlYXRlIGEgcmVndWxhciBET00gbm9kZVxuICogQHBhcmFtIHtzdHJpbmd9IHRhZ1xuICogQHBhcmFtIHtvYmplY3R9IGF0dHJpYnV0ZXNcbiAqIEBwYXJhbSB7YXJyYXk8c3RyaW5nfG51bWJlcnxXaWRnZXQ+fSBjaGlsZHJlblxuICogQHBhcmFtIHtWaWV3fSB2aWV3XG4gKi9cbmZ1bmN0aW9uICQkbm9kZSh0YWcsIGF0dHJpYnV0ZXMsIGNoaWxkcmVuLCB2aWV3KSB7XG4gICAgdmFyIGUgPSAodGFnID09PSAnZnJhZ21lbnQnKSA/IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSA6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgICBpZiAodHlwZW9mIGF0dHJpYnV0ZXMuaHRtbCA9PT0gJ29iamVjdCcpXG4gICAgICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMuaHRtbCkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGF0dHJpYnV0ZXMuaHRtbFtrZXldID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgZVtrZXldID0gYXR0cmlidXRlcy5odG1sW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBlLnNldEF0dHJpYnV0ZShrZXksIGF0dHJpYnV0ZXMuaHRtbFtrZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoYykgeyByZXR1cm4gJCRhZG9wdChjLCBlKTsgfSk7XG4gICAgaWYgKGF0dHJpYnV0ZXMud21sKVxuICAgICAgICBpZiAoYXR0cmlidXRlcy53bWwuaWQpXG4gICAgICAgICAgICB2aWV3LnJlZ2lzdGVyKGF0dHJpYnV0ZXMud21sLmlkLCBlKTtcbiAgICByZXR1cm4gZTtcbn1cbi8qKlxuICogQXR0cmlidXRlcyBwcm92aWRlcyBhbiBBUEkgZm9yIHJlYWRpbmcgdGhlXG4gKiBhdHRyaWJ1dGVzIHN1cHBsaWVkIHRvIGFuIEVsZW1lbnQuXG4gKiBAcGFyYW0ge29iamVjdH0gYXR0cnNcbiAqL1xudmFyIEF0dHJpYnV0ZXMgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEF0dHJpYnV0ZXMoX2F0dHJzKSB7XG4gICAgICAgIHRoaXMuX2F0dHJzID0gX2F0dHJzO1xuICAgICAgICB0aGlzLl9hdHRycyA9IF9hdHRycztcbiAgICB9XG4gICAgQXR0cmlidXRlcy5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gKHBhdGgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVhZChwYXRoKSAhPSBudWxsO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogcmVhZCBhIHZhbHVlIGZvcm0gdGhlIGludGVybmFsIGxpc3QuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGhcbiAgICAgKiBAcGFyYW0geyp9IGRlZmF1bHRWYWx1ZSAtIFRoaXMgdmFsdWUgaXMgcmV0dXJuZWQgaWYgdGhlIHZhbHVlIGlzIG5vdCBzZXQuXG4gICAgICovXG4gICAgQXR0cmlidXRlcy5wcm90b3R5cGUucmVhZCA9IGZ1bmN0aW9uIChwYXRoLCBkZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgdmFyIHJldCA9ICQkcHJvcGVydHkocGF0aC5zcGxpdCgnOicpLmpvaW4oJy4nKSwgdGhpcy5fYXR0cnMpO1xuICAgICAgICByZXR1cm4gKHJldCAhPSBudWxsKSA/IHJldCA6IChkZWZhdWx0VmFsdWUgIT0gbnVsbCkgPyBkZWZhdWx0VmFsdWUgOiAnJztcbiAgICB9O1xuICAgIHJldHVybiBBdHRyaWJ1dGVzO1xufSgpKTtcbi8qKlxuICogJCR3aWRnZXQgY3JlYXRlcyBhIHdtbCB3aWRnZXQuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBDb25zdHJ1dG9yXG4gKiBAcGFyYW0ge29iamVjdH0gYXR0cmlidXRlc1xuICogQHBhcmFtIHthcnJheTxzdHJpbmd8bnVtYmVyfFdpZGdldD59IGNoaWxkcmVuXG4gKiBAcGFyYW0ge1ZpZXd9IHZpZXdcbiAqIEByZXR1cm4ge1dpZGdldH1cbiAqL1xuZnVuY3Rpb24gJCR3aWRnZXQoQ29uc3RydWN0b3IsIGF0dHJpYnV0ZXMsIGNoaWxkcmVuLCB2aWV3KSB7XG4gICAgdmFyIGNoaWxkcyA9IFtdO1xuICAgIHZhciB3O1xuICAgIGNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKGNoaWxkKSB7IHJldHVybiBBcnJheS5pc0FycmF5KGNoaWxkKSA/XG4gICAgICAgIGNoaWxkcy5wdXNoLmFwcGx5KGNoaWxkcywgY2hpbGQpIDogY2hpbGRzLnB1c2goY2hpbGQpOyB9KTtcbiAgICB3ID0gbmV3IENvbnN0cnVjdG9yKG5ldyBBdHRyaWJ1dGVzKGF0dHJpYnV0ZXMpLCBjaGlsZHMpO1xuICAgIGlmIChhdHRyaWJ1dGVzLndtbClcbiAgICAgICAgaWYgKGF0dHJpYnV0ZXMud21sLmlkKVxuICAgICAgICAgICAgdmlldy5yZWdpc3RlcihhdHRyaWJ1dGVzLndtbC5pZCwgdyk7XG4gICAgdmlldy53aWRnZXRzLnB1c2godyk7XG4gICAgcmV0dXJuIHcucmVuZGVyKCk7XG59XG4vKipcbiAqICQkaWYgaXMgY2FsbGVkIHRvIGNyZWF0ZSBhbiBpZiBjb25kaXRpb25hbCBjb25zdHJ1Y3RcbiAqIEBwYXJhbSB7Kn0gcHJlZGljYXRlXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBwb3NpdGl2ZVxuICogQHBhcmFtIHtmdW5jdGlvbn0gbmVnYXRpdmVcbiAqL1xuZnVuY3Rpb24gJCRpZihwcmVkaWNhdGUsIHBvc2l0aXZlLCBuZWdhdGl2ZSkge1xuICAgIHJldHVybiAocHJlZGljYXRlKSA/IHBvc2l0aXZlKCkgOiBuZWdhdGl2ZSgpO1xufVxuLyoqXG4gKiAkJGZvciBpcyBjYWxsZWQgdG8gY3JlYXRlIGEgZm9yIGxvb3AgY29uc3RydWN0XG4gKiBAcGFyYW0ge0l0ZXJhYmxlfSBjb2xsZWN0aW9uXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYlxuICovXG5mdW5jdGlvbiAkJGZvcihjb2xsZWN0aW9uLCBjYikge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGNvbGxlY3Rpb24pKSB7XG4gICAgICAgIHJldHVybiBjb2xsZWN0aW9uLm1hcChjYik7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBjb2xsZWN0aW9uID09PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoY29sbGVjdGlvbikubWFwKGZ1bmN0aW9uIChrZXksIF8sIGFsbCkgeyByZXR1cm4gY2IoY29sbGVjdGlvbltrZXldLCBrZXksIGFsbCk7IH0pO1xuICAgIH1cbiAgICByZXR1cm4gW107XG59XG4vKipcbiAqICQkc3dpdGNoIHNpbXVsYXRlcyBhIHN3aXRjaCBzdGF0ZW1lbnRcbiAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcnxib29sZWFufSB2YWx1ZVxuICogQHBhcmFtIHtvYmplY3R9IGNhc2VzXG4gKi9cbmZ1bmN0aW9uICQkc3dpdGNoKHZhbHVlLCBjYXNlcykge1xuICAgIHZhciByZXN1bHQgPSBjYXNlc1t2YWx1ZV07XG4gICAgdmFyIGRlZmF1bCA9IGNhc2VzLmRlZmF1bHQ7XG4gICAgaWYgKHJlc3VsdClcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICBpZiAoZGVmYXVsKVxuICAgICAgICByZXR1cm4gZGVmYXVsO1xufVxudmFyIE1haW4gPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE1haW4oY29udGV4dCkge1xuICAgICAgICB2YXIgdmlldyA9IHRoaXM7XG4gICAgICAgIHRoaXMuaWRzID0ge307XG4gICAgICAgIHRoaXMud2lkZ2V0cyA9IFtdO1xuICAgICAgICB0aGlzLnRyZWUgPSBudWxsO1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuICQkbm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6ICQkcmVzb2x2ZShTdHlsZXMsICdEUkFXRVJfTEFZT1VUJykgfSwgd21sOiB7ICdpZCc6IFwiY29udGVudFwiIH0gfSwgWyQkbm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6ICQkcmVzb2x2ZShTdHlsZXMsICdEUkFXRVInKSB9LCB3bWw6IHsgJ2lkJzogXCJkcmF3ZXJcIiB9IH0sIFskJG5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiAkJHJlc29sdmUoU3R5bGVzLCAnRFJBV0VSX0NPTlRFTlQnKSB9IH0sIFskJGlmKHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpuYXZpZ2F0aW9uJyksIGZ1bmN0aW9uIGlmMCgpIHsgcmV0dXJuIFt0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6bmF2aWdhdGlvbicpLmFwcGx5KHRoaXMsIFt2aWV3XS5jb25jYXQoW10pKV07IH0uYmluZCh0aGlzKSwgZnVuY3Rpb24gKCkgeyB9KV0sIHZpZXcpXSwgdmlldyksICQkaWYodGhpcy5hdHRyaWJ1dGVzLmhhcygnd3c6Y29udGVudCcpLCBmdW5jdGlvbiBpZjAoKSB7IHJldHVybiBbdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmNvbnRlbnQnKS5hcHBseSh0aGlzLCBbdmlld10uY29uY2F0KFtdKSldOyB9LmJpbmQodGhpcyksIGZ1bmN0aW9uIGVsc2VfY2xhdXNlMSgpIHsgcmV0dXJuIFskJHJlc29sdmUodGhpcywgJ2NoaWxkcmVuJyldOyB9LmJpbmQodGhpcykpXSwgdmlldyk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIE1haW4ucmVuZGVyID0gZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICAgICAgcmV0dXJuIChuZXcgTWFpbihjb250ZXh0KSkucmVuZGVyKCk7XG4gICAgfTtcbiAgICBNYWluLnByb3RvdHlwZS5yZWdpc3RlciA9IGZ1bmN0aW9uIChpZCwgdykge1xuICAgICAgICBpZiAodGhpcy5pZHMuaGFzT3duUHJvcGVydHkoaWQpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdEdXBsaWNhdGUgaWQgXFwnJyArIGlkICsgJ1xcJyBkZXRlY3RlZCEnKTtcbiAgICAgICAgdGhpcy5pZHNbaWRdID0gdztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBNYWluLnByb3RvdHlwZS5maW5kQnlJZCA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICByZXR1cm4gKHRoaXMuaWRzW2lkXSkgPyB0aGlzLmlkc1tpZF0gOiBudWxsO1xuICAgIH07XG4gICAgTWFpbi5wcm90b3R5cGUuaW52YWxpZGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNoaWxkcztcbiAgICAgICAgdmFyIHBhcmVudCA9IHRoaXMudHJlZS5wYXJlbnROb2RlO1xuICAgICAgICB2YXIgcmVhbEZpcnN0Q2hpbGQ7XG4gICAgICAgIHZhciByZWFsRmlyc3RDaGlsZEluZGV4O1xuICAgICAgICBpZiAodGhpcy50cmVlID09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoJ0Nhbm5vdCBpbnZhbGlkYXRlIGEgdmlldyB0aGF0IGhhcyBub3QgYmVlbiByZW5kZXJlZCEnKTtcbiAgICAgICAgaWYgKHRoaXMudHJlZS5wYXJlbnROb2RlID09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoJ0F0dGVtcHQgdG8gaW52YWxpZGF0ZSBhIHZpZXcgdGhhdCBoYXMgbm90IGJlZW4gaW5zZXJ0ZWQgdG8gRE9NIScpO1xuICAgICAgICBjaGlsZHMgPSB0aGlzLnRyZWUucGFyZW50Tm9kZS5jaGlsZHJlbjtcbiAgICAgICAgLy9mb3Igc29tZSByZWFzb24gdGhlIHJlZmVyZW5jZSBzdG9yZWQgZG9lcyBub3QgaGF2ZSB0aGUgY29ycmVjdCBwYXJlbnQgbm9kZS5cbiAgICAgICAgLy93ZSBkbyB0aGlzIHRvIGdldCBhICdsaXZlJyB2ZXJzaW9uIG9mIHRoZSBub2RlLlxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcy5sZW5ndGg7IGkrKylcbiAgICAgICAgICAgIGlmIChjaGlsZHNbaV0gPT09IHRoaXMudHJlZSkge1xuICAgICAgICAgICAgICAgIHJlYWxGaXJzdENoaWxkID0gY2hpbGRzW2ldO1xuICAgICAgICAgICAgICAgIHJlYWxGaXJzdENoaWxkSW5kZXggPSBpO1xuICAgICAgICAgICAgfVxuICAgICAgICBwYXJlbnQucmVwbGFjZUNoaWxkKHRoaXMucmVuZGVyKCksIHJlYWxGaXJzdENoaWxkKTtcbiAgICB9O1xuICAgIE1haW4ucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5pZHMgPSB7fTtcbiAgICAgICAgdGhpcy53aWRnZXRzLmZvckVhY2goZnVuY3Rpb24gKHcpIHsgcmV0dXJuIHcucmVtb3ZlZCgpOyB9KTtcbiAgICAgICAgdGhpcy53aWRnZXRzID0gW107XG4gICAgICAgIHRoaXMudHJlZSA9IHRoaXMudGVtcGxhdGUuY2FsbCh0aGlzLmNvbnRleHQpO1xuICAgICAgICB0aGlzLmlkc1sncm9vdCddID0gKHRoaXMuaWRzWydyb290J10pID8gdGhpcy5pZHNbJ3Jvb3QnXSA6IHRoaXMudHJlZTtcbiAgICAgICAgdGhpcy53aWRnZXRzLmZvckVhY2goZnVuY3Rpb24gKHcpIHsgcmV0dXJuIHcucmVuZGVyZWQoKTsgfSk7XG4gICAgICAgIHJldHVybiB0aGlzLnRyZWU7XG4gICAgfTtcbiAgICByZXR1cm4gTWFpbjtcbn0oKSk7XG5leHBvcnRzLk1haW4gPSBNYWluO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZHJhd2VyLWxheW91dC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJ1bnRpbWVfMSA9IHJlcXVpcmUoXCJAcXVlbmsvd21sL2xpYi9ydW50aW1lXCIpO1xudmFyIFN0eWxlcyA9IHJlcXVpcmUoXCJ3bWwtd2lkZ2V0cy1jb21tb24vU3R5bGVzXCIpO1xudmFyIHZpZXdzID0gcmVxdWlyZShcIi4vd21sL2dyaWRcIik7XG4vKipcbiAqIENvbnRhaW5lclxuICovXG52YXIgQ29udGFpbmVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQ29udGFpbmVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIENvbnRhaW5lcigpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnZpZXcgPSBuZXcgdmlld3MuQ29udGFpbmVyKF90aGlzKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gQ29udGFpbmVyO1xufShydW50aW1lXzEuQWJzdHJhY3RXaWRnZXQpKTtcbmV4cG9ydHMuQ29udGFpbmVyID0gQ29udGFpbmVyO1xudmFyIFJvdyA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFJvdywgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBSb3coKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IHZpZXdzLlJvdyhfdGhpcyk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIFJvdztcbn0ocnVudGltZV8xLkFic3RyYWN0V2lkZ2V0KSk7XG5leHBvcnRzLlJvdyA9IFJvdztcbnZhciBDb2x1bW4gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhDb2x1bW4sIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQ29sdW1uKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMudmlldyA9IG5ldyB2aWV3cy5Db2x1bW4oX3RoaXMpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIENvbHVtbi5wcm90b3R5cGUuX2dldENsYXNzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY2xhc3NlcyA9IFtTdHlsZXMuR1JJRF9DT0xVTU5dO1xuICAgICAgICB2YXIgc2l6ZSA9IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpzaXplJywgJ21kJyk7XG4gICAgICAgIHZhciB3aWR0aCA9IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzp3aWR0aCcsIDEyKTtcbiAgICAgICAgdmFyIG9mZnNldCA9IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3dzpvZmZzZXQnLCAwKTtcbiAgICAgICAgY2xhc3Nlcy5wdXNoKFwiY29sLVwiICsgc2l6ZSArIFwiLVwiICsgd2lkdGgpO1xuICAgICAgICBpZiAob2Zmc2V0KVxuICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKFwiY29sLVwiICsgc2l6ZSArIFwiLW9mZnNldC1cIiArIG9mZnNldCk7XG4gICAgICAgIGNsYXNzZXMucHVzaCh0aGlzLmF0dHJpYnV0ZXMucmVhZChTdHlsZXMuQ1NTX0NMQVNTKSk7XG4gICAgICAgIHJldHVybiBjbGFzc2VzLmZpbHRlcihmdW5jdGlvbiAodikgeyByZXR1cm4gISh2ID09IG51bGwpOyB9KS5qb2luKCcgJyk7XG4gICAgfTtcbiAgICByZXR1cm4gQ29sdW1uO1xufShydW50aW1lXzEuQWJzdHJhY3RXaWRnZXQpKTtcbmV4cG9ydHMuQ29sdW1uID0gQ29sdW1uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9R3JpZC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB1dGlsXzEgPSByZXF1aXJlKFwid21sLXdpZGdldHMtY29tbW9uL3V0aWxcIik7XG52YXIgU3R5bGVzID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi9TdHlsZXNcIik7XG5mdW5jdGlvbiAkJGJvdW5kYXJ5X3RvX2RvdCh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZS5zcGxpdCgnXVsnKS5qb2luKCcuJykuc3BsaXQoJ1snKS5qb2luKCcuJyk7XG59XG5mdW5jdGlvbiAkJHN0cmlwX2JyYWNlcyh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZS5zcGxpdCgnWycpLmpvaW4oJy4nKS5zcGxpdCgnXScpLmpvaW4oJycpO1xufVxuZnVuY3Rpb24gJCRlc2NhcGVfZG90cyh2YWx1ZSkge1xuICAgIHZhbHVlID0gdmFsdWUuc3BsaXQoJ1xcJycpO1xuICAgIHJldHVybiAodmFsdWUubGVuZ3RoIDwgMykgPyB2YWx1ZS5qb2luKCdcXCcnKSA6IHZhbHVlLm1hcChmdW5jdGlvbiAoc2VnKSB7XG4gICAgICAgIGlmIChzZWcubGVuZ3RoIDwgMylcbiAgICAgICAgICAgIHJldHVybiBzZWc7XG4gICAgICAgIGlmICgoc2VnWzBdID09PSAnLicpIHx8IChzZWdbc2VnLmxlbmd0aCAtIDFdID09PSAnLicpKVxuICAgICAgICAgICAgcmV0dXJuIHNlZztcbiAgICAgICAgcmV0dXJuIHNlZy5zcGxpdCgnLicpLmpvaW4oJyYmJyk7XG4gICAgfSkuam9pbignJyk7XG59XG5mdW5jdGlvbiAkJHVuZXNjYXBlX2RvdHModmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUuc3BsaXQoJyYmJykuam9pbignLicpO1xufVxuZnVuY3Rpb24gJCRwYXJ0aWZ5KHZhbHVlKSB7XG4gICAgaWYgKCF2YWx1ZSlcbiAgICAgICAgcmV0dXJuO1xuICAgIHJldHVybiAkJGVzY2FwZV9kb3RzKCQkc3RyaXBfYnJhY2VzKCQkYm91bmRhcnlfdG9fZG90KCcnICsgdmFsdWUpKSkuc3BsaXQoJy4nKTtcbn1cbmZ1bmN0aW9uICQkcHJvcGVydHkocGF0aCwgbykge1xuICAgIHZhciBwYXJ0cyA9ICQkcGFydGlmeShwYXRoKTtcbiAgICB2YXIgZmlyc3Q7XG4gICAgaWYgKHR5cGVvZiBvICE9PSAnb2JqZWN0JylcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZ2V0KCk6IGV4cGVjdHMgYW4gb2JqZWN0IGdvdCAnICsgdHlwZW9mIG8pO1xuICAgIGlmIChwYXJ0cy5sZW5ndGggPT09IDEpXG4gICAgICAgIHJldHVybiBvWyQkdW5lc2NhcGVfZG90cyhwYXJ0c1swXSldO1xuICAgIGlmIChwYXJ0cy5sZW5ndGggPT09IDApXG4gICAgICAgIHJldHVybjtcbiAgICBmaXJzdCA9IG9bcGFydHMuc2hpZnQoKV07XG4gICAgcmV0dXJuICgodHlwZW9mIG8gPT09ICdvYmplY3QnKSAmJiAobyAhPT0gbnVsbCkpID9cbiAgICAgICAgcGFydHMucmVkdWNlKGZ1bmN0aW9uICh0YXJnZXQsIHByb3ApIHtcbiAgICAgICAgICAgIGlmICh0YXJnZXQgPT0gbnVsbClcbiAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgICAgICAgICAgcmV0dXJuIHRhcmdldFskJHVuZXNjYXBlX2RvdHMocHJvcCldO1xuICAgICAgICB9LCBmaXJzdCkgOiBudWxsO1xufVxuZnVuY3Rpb24gJCRhZG9wdChjaGlsZCwgZSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGNoaWxkKSlcbiAgICAgICAgcmV0dXJuIGNoaWxkLmZvckVhY2goZnVuY3Rpb24gKGlubmVyQ2hpbGQpIHsgcmV0dXJuICQkYWRvcHQoaW5uZXJDaGlsZCwgZSk7IH0pO1xuICAgIGlmIChjaGlsZClcbiAgICAgICAgZS5hcHBlbmRDaGlsZCgodHlwZW9mIGNoaWxkID09PSAnb2JqZWN0JykgP1xuICAgICAgICAgICAgY2hpbGQgOiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjaGlsZCA9PSBudWxsID8gJycgOiBjaGlsZCkpO1xufVxuLyoqXG4gKiAkJHRleHQgY3JlYXRlcyBhIERPTVRleHROb2RlXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAqL1xuZnVuY3Rpb24gJCR0ZXh0KHZhbHVlKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlKTtcbn1cbi8qKlxuICogJCRyZXNvbHZlIHByb3BlcnR5IGFjY2VzcyBleHByZXNzaW9uIHRvIGF2b2lkXG4gKiB0aG93aW5nIGVycm9ycyBpZiBpdCBkb2VzIG5vdCBleGlzdC5cbiAqIEBwYXJhbSB7b2JqZWN0fSBoZWFkXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0aFxuICovXG5mdW5jdGlvbiAkJHJlc29sdmUoaGVhZCwgcGF0aCkge1xuICAgIHZhciByZXQgPSAkJHByb3BlcnR5KHBhdGgsIGhlYWQpO1xuICAgIHJldHVybiAocmV0ID09IG51bGwpID8gJycgOiByZXQ7XG59XG4vKipcbiAqICQkbm9kZSBpcyBjYWxsZWQgdG8gY3JlYXRlIGEgcmVndWxhciBET00gbm9kZVxuICogQHBhcmFtIHtzdHJpbmd9IHRhZ1xuICogQHBhcmFtIHtvYmplY3R9IGF0dHJpYnV0ZXNcbiAqIEBwYXJhbSB7YXJyYXk8c3RyaW5nfG51bWJlcnxXaWRnZXQ+fSBjaGlsZHJlblxuICogQHBhcmFtIHtWaWV3fSB2aWV3XG4gKi9cbmZ1bmN0aW9uICQkbm9kZSh0YWcsIGF0dHJpYnV0ZXMsIGNoaWxkcmVuLCB2aWV3KSB7XG4gICAgdmFyIGUgPSAodGFnID09PSAnZnJhZ21lbnQnKSA/IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSA6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgICBpZiAodHlwZW9mIGF0dHJpYnV0ZXMuaHRtbCA9PT0gJ29iamVjdCcpXG4gICAgICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMuaHRtbCkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGF0dHJpYnV0ZXMuaHRtbFtrZXldID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgZVtrZXldID0gYXR0cmlidXRlcy5odG1sW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBlLnNldEF0dHJpYnV0ZShrZXksIGF0dHJpYnV0ZXMuaHRtbFtrZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoYykgeyByZXR1cm4gJCRhZG9wdChjLCBlKTsgfSk7XG4gICAgaWYgKGF0dHJpYnV0ZXMud21sKVxuICAgICAgICBpZiAoYXR0cmlidXRlcy53bWwuaWQpXG4gICAgICAgICAgICB2aWV3LnJlZ2lzdGVyKGF0dHJpYnV0ZXMud21sLmlkLCBlKTtcbiAgICByZXR1cm4gZTtcbn1cbi8qKlxuICogQXR0cmlidXRlcyBwcm92aWRlcyBhbiBBUEkgZm9yIHJlYWRpbmcgdGhlXG4gKiBhdHRyaWJ1dGVzIHN1cHBsaWVkIHRvIGFuIEVsZW1lbnQuXG4gKiBAcGFyYW0ge29iamVjdH0gYXR0cnNcbiAqL1xudmFyIEF0dHJpYnV0ZXMgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEF0dHJpYnV0ZXMoX2F0dHJzKSB7XG4gICAgICAgIHRoaXMuX2F0dHJzID0gX2F0dHJzO1xuICAgICAgICB0aGlzLl9hdHRycyA9IF9hdHRycztcbiAgICB9XG4gICAgQXR0cmlidXRlcy5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gKHBhdGgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVhZChwYXRoKSAhPSBudWxsO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogcmVhZCBhIHZhbHVlIGZvcm0gdGhlIGludGVybmFsIGxpc3QuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGhcbiAgICAgKiBAcGFyYW0geyp9IGRlZmF1bHRWYWx1ZSAtIFRoaXMgdmFsdWUgaXMgcmV0dXJuZWQgaWYgdGhlIHZhbHVlIGlzIG5vdCBzZXQuXG4gICAgICovXG4gICAgQXR0cmlidXRlcy5wcm90b3R5cGUucmVhZCA9IGZ1bmN0aW9uIChwYXRoLCBkZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgdmFyIHJldCA9ICQkcHJvcGVydHkocGF0aC5zcGxpdCgnOicpLmpvaW4oJy4nKSwgdGhpcy5fYXR0cnMpO1xuICAgICAgICByZXR1cm4gKHJldCAhPSBudWxsKSA/IHJldCA6IChkZWZhdWx0VmFsdWUgIT0gbnVsbCkgPyBkZWZhdWx0VmFsdWUgOiAnJztcbiAgICB9O1xuICAgIHJldHVybiBBdHRyaWJ1dGVzO1xufSgpKTtcbi8qKlxuICogJCR3aWRnZXQgY3JlYXRlcyBhIHdtbCB3aWRnZXQuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBDb25zdHJ1dG9yXG4gKiBAcGFyYW0ge29iamVjdH0gYXR0cmlidXRlc1xuICogQHBhcmFtIHthcnJheTxzdHJpbmd8bnVtYmVyfFdpZGdldD59IGNoaWxkcmVuXG4gKiBAcGFyYW0ge1ZpZXd9IHZpZXdcbiAqIEByZXR1cm4ge1dpZGdldH1cbiAqL1xuZnVuY3Rpb24gJCR3aWRnZXQoQ29uc3RydWN0b3IsIGF0dHJpYnV0ZXMsIGNoaWxkcmVuLCB2aWV3KSB7XG4gICAgdmFyIGNoaWxkcyA9IFtdO1xuICAgIHZhciB3O1xuICAgIGNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKGNoaWxkKSB7IHJldHVybiBBcnJheS5pc0FycmF5KGNoaWxkKSA/XG4gICAgICAgIGNoaWxkcy5wdXNoLmFwcGx5KGNoaWxkcywgY2hpbGQpIDogY2hpbGRzLnB1c2goY2hpbGQpOyB9KTtcbiAgICB3ID0gbmV3IENvbnN0cnVjdG9yKG5ldyBBdHRyaWJ1dGVzKGF0dHJpYnV0ZXMpLCBjaGlsZHMpO1xuICAgIGlmIChhdHRyaWJ1dGVzLndtbClcbiAgICAgICAgaWYgKGF0dHJpYnV0ZXMud21sLmlkKVxuICAgICAgICAgICAgdmlldy5yZWdpc3RlcihhdHRyaWJ1dGVzLndtbC5pZCwgdyk7XG4gICAgdmlldy53aWRnZXRzLnB1c2godyk7XG4gICAgcmV0dXJuIHcucmVuZGVyKCk7XG59XG4vKipcbiAqICQkaWYgaXMgY2FsbGVkIHRvIGNyZWF0ZSBhbiBpZiBjb25kaXRpb25hbCBjb25zdHJ1Y3RcbiAqIEBwYXJhbSB7Kn0gcHJlZGljYXRlXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBwb3NpdGl2ZVxuICogQHBhcmFtIHtmdW5jdGlvbn0gbmVnYXRpdmVcbiAqL1xuZnVuY3Rpb24gJCRpZihwcmVkaWNhdGUsIHBvc2l0aXZlLCBuZWdhdGl2ZSkge1xuICAgIHJldHVybiAocHJlZGljYXRlKSA/IHBvc2l0aXZlKCkgOiBuZWdhdGl2ZSgpO1xufVxuLyoqXG4gKiAkJGZvciBpcyBjYWxsZWQgdG8gY3JlYXRlIGEgZm9yIGxvb3AgY29uc3RydWN0XG4gKiBAcGFyYW0ge0l0ZXJhYmxlfSBjb2xsZWN0aW9uXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYlxuICovXG5mdW5jdGlvbiAkJGZvcihjb2xsZWN0aW9uLCBjYikge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGNvbGxlY3Rpb24pKSB7XG4gICAgICAgIHJldHVybiBjb2xsZWN0aW9uLm1hcChjYik7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBjb2xsZWN0aW9uID09PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoY29sbGVjdGlvbikubWFwKGZ1bmN0aW9uIChrZXksIF8sIGFsbCkgeyByZXR1cm4gY2IoY29sbGVjdGlvbltrZXldLCBrZXksIGFsbCk7IH0pO1xuICAgIH1cbiAgICByZXR1cm4gW107XG59XG4vKipcbiAqICQkc3dpdGNoIHNpbXVsYXRlcyBhIHN3aXRjaCBzdGF0ZW1lbnRcbiAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcnxib29sZWFufSB2YWx1ZVxuICogQHBhcmFtIHtvYmplY3R9IGNhc2VzXG4gKi9cbmZ1bmN0aW9uICQkc3dpdGNoKHZhbHVlLCBjYXNlcykge1xuICAgIHZhciByZXN1bHQgPSBjYXNlc1t2YWx1ZV07XG4gICAgdmFyIGRlZmF1bCA9IGNhc2VzLmRlZmF1bHQ7XG4gICAgaWYgKHJlc3VsdClcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICBpZiAoZGVmYXVsKVxuICAgICAgICByZXR1cm4gZGVmYXVsO1xufVxudmFyIENvbnRhaW5lciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ29udGFpbmVyKGNvbnRleHQpIHtcbiAgICAgICAgdmFyIHZpZXcgPSB0aGlzO1xuICAgICAgICB0aGlzLmlkcyA9IHt9O1xuICAgICAgICB0aGlzLndpZGdldHMgPSBbXTtcbiAgICAgICAgdGhpcy50cmVlID0gbnVsbDtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAkJG5vZGUoJ3NlY3Rpb24nLCB7IGh0bWw6IHsgJ2NsYXNzJzogdXRpbF8xLmNvbWJpbmUoWyQkcmVzb2x2ZShTdHlsZXMsICdHUklEX0NPTlRBSU5FUicpLCB0aGlzLmF0dHJpYnV0ZXMucmVhZCgkJHJlc29sdmUoU3R5bGVzLCAnQ1NTX0NMQVNTJykpXSkgfSB9LCBbJCRyZXNvbHZlKHRoaXMsICdjaGlsZHJlbicpXSwgdmlldyk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIENvbnRhaW5lci5yZW5kZXIgPSBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgICAgICByZXR1cm4gKG5ldyBDb250YWluZXIoY29udGV4dCkpLnJlbmRlcigpO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5yZWdpc3RlciA9IGZ1bmN0aW9uIChpZCwgdykge1xuICAgICAgICBpZiAodGhpcy5pZHMuaGFzT3duUHJvcGVydHkoaWQpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdEdXBsaWNhdGUgaWQgXFwnJyArIGlkICsgJ1xcJyBkZXRlY3RlZCEnKTtcbiAgICAgICAgdGhpcy5pZHNbaWRdID0gdztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLmZpbmRCeUlkID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5pZHNbaWRdKSA/IHRoaXMuaWRzW2lkXSA6IG51bGw7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLmludmFsaWRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjaGlsZHM7XG4gICAgICAgIHZhciBwYXJlbnQgPSB0aGlzLnRyZWUucGFyZW50Tm9kZTtcbiAgICAgICAgdmFyIHJlYWxGaXJzdENoaWxkO1xuICAgICAgICB2YXIgcmVhbEZpcnN0Q2hpbGRJbmRleDtcbiAgICAgICAgaWYgKHRoaXMudHJlZSA9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKCdDYW5ub3QgaW52YWxpZGF0ZSBhIHZpZXcgdGhhdCBoYXMgbm90IGJlZW4gcmVuZGVyZWQhJyk7XG4gICAgICAgIGlmICh0aGlzLnRyZWUucGFyZW50Tm9kZSA9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKCdBdHRlbXB0IHRvIGludmFsaWRhdGUgYSB2aWV3IHRoYXQgaGFzIG5vdCBiZWVuIGluc2VydGVkIHRvIERPTSEnKTtcbiAgICAgICAgY2hpbGRzID0gdGhpcy50cmVlLnBhcmVudE5vZGUuY2hpbGRyZW47XG4gICAgICAgIC8vZm9yIHNvbWUgcmVhc29uIHRoZSByZWZlcmVuY2Ugc3RvcmVkIGRvZXMgbm90IGhhdmUgdGhlIGNvcnJlY3QgcGFyZW50IG5vZGUuXG4gICAgICAgIC8vd2UgZG8gdGhpcyB0byBnZXQgYSAnbGl2ZScgdmVyc2lvbiBvZiB0aGUgbm9kZS5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHMubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICBpZiAoY2hpbGRzW2ldID09PSB0aGlzLnRyZWUpIHtcbiAgICAgICAgICAgICAgICByZWFsRmlyc3RDaGlsZCA9IGNoaWxkc1tpXTtcbiAgICAgICAgICAgICAgICByZWFsRmlyc3RDaGlsZEluZGV4ID0gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgcGFyZW50LnJlcGxhY2VDaGlsZCh0aGlzLnJlbmRlcigpLCByZWFsRmlyc3RDaGlsZCk7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5pZHMgPSB7fTtcbiAgICAgICAgdGhpcy53aWRnZXRzLmZvckVhY2goZnVuY3Rpb24gKHcpIHsgcmV0dXJuIHcucmVtb3ZlZCgpOyB9KTtcbiAgICAgICAgdGhpcy53aWRnZXRzID0gW107XG4gICAgICAgIHRoaXMudHJlZSA9IHRoaXMudGVtcGxhdGUuY2FsbCh0aGlzLmNvbnRleHQpO1xuICAgICAgICB0aGlzLmlkc1sncm9vdCddID0gKHRoaXMuaWRzWydyb290J10pID8gdGhpcy5pZHNbJ3Jvb3QnXSA6IHRoaXMudHJlZTtcbiAgICAgICAgdGhpcy53aWRnZXRzLmZvckVhY2goZnVuY3Rpb24gKHcpIHsgcmV0dXJuIHcucmVuZGVyZWQoKTsgfSk7XG4gICAgICAgIHJldHVybiB0aGlzLnRyZWU7XG4gICAgfTtcbiAgICByZXR1cm4gQ29udGFpbmVyO1xufSgpKTtcbmV4cG9ydHMuQ29udGFpbmVyID0gQ29udGFpbmVyO1xudmFyIFJvdyA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUm93KGNvbnRleHQpIHtcbiAgICAgICAgdmFyIHZpZXcgPSB0aGlzO1xuICAgICAgICB0aGlzLmlkcyA9IHt9O1xuICAgICAgICB0aGlzLndpZGdldHMgPSBbXTtcbiAgICAgICAgdGhpcy50cmVlID0gbnVsbDtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAkJG5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiB1dGlsXzEuY29tYmluZShbJCRyZXNvbHZlKFN0eWxlcywgJ0dSSURfUk9XJyksIHRoaXMuYXR0cmlidXRlcy5yZWFkKCQkcmVzb2x2ZShTdHlsZXMsICdDU1NfQ0xBU1MnKSldKSB9IH0sIFskJHJlc29sdmUodGhpcywgJ2NoaWxkcmVuJyldLCB2aWV3KTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgUm93LnJlbmRlciA9IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgICAgIHJldHVybiAobmV3IFJvdyhjb250ZXh0KSkucmVuZGVyKCk7XG4gICAgfTtcbiAgICBSb3cucHJvdG90eXBlLnJlZ2lzdGVyID0gZnVuY3Rpb24gKGlkLCB3KSB7XG4gICAgICAgIGlmICh0aGlzLmlkcy5oYXNPd25Qcm9wZXJ0eShpZCkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0R1cGxpY2F0ZSBpZCBcXCcnICsgaWQgKyAnXFwnIGRldGVjdGVkIScpO1xuICAgICAgICB0aGlzLmlkc1tpZF0gPSB3O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIFJvdy5wcm90b3R5cGUuZmluZEJ5SWQgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmlkc1tpZF0pID8gdGhpcy5pZHNbaWRdIDogbnVsbDtcbiAgICB9O1xuICAgIFJvdy5wcm90b3R5cGUuaW52YWxpZGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNoaWxkcztcbiAgICAgICAgdmFyIHBhcmVudCA9IHRoaXMudHJlZS5wYXJlbnROb2RlO1xuICAgICAgICB2YXIgcmVhbEZpcnN0Q2hpbGQ7XG4gICAgICAgIHZhciByZWFsRmlyc3RDaGlsZEluZGV4O1xuICAgICAgICBpZiAodGhpcy50cmVlID09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoJ0Nhbm5vdCBpbnZhbGlkYXRlIGEgdmlldyB0aGF0IGhhcyBub3QgYmVlbiByZW5kZXJlZCEnKTtcbiAgICAgICAgaWYgKHRoaXMudHJlZS5wYXJlbnROb2RlID09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoJ0F0dGVtcHQgdG8gaW52YWxpZGF0ZSBhIHZpZXcgdGhhdCBoYXMgbm90IGJlZW4gaW5zZXJ0ZWQgdG8gRE9NIScpO1xuICAgICAgICBjaGlsZHMgPSB0aGlzLnRyZWUucGFyZW50Tm9kZS5jaGlsZHJlbjtcbiAgICAgICAgLy9mb3Igc29tZSByZWFzb24gdGhlIHJlZmVyZW5jZSBzdG9yZWQgZG9lcyBub3QgaGF2ZSB0aGUgY29ycmVjdCBwYXJlbnQgbm9kZS5cbiAgICAgICAgLy93ZSBkbyB0aGlzIHRvIGdldCBhICdsaXZlJyB2ZXJzaW9uIG9mIHRoZSBub2RlLlxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcy5sZW5ndGg7IGkrKylcbiAgICAgICAgICAgIGlmIChjaGlsZHNbaV0gPT09IHRoaXMudHJlZSkge1xuICAgICAgICAgICAgICAgIHJlYWxGaXJzdENoaWxkID0gY2hpbGRzW2ldO1xuICAgICAgICAgICAgICAgIHJlYWxGaXJzdENoaWxkSW5kZXggPSBpO1xuICAgICAgICAgICAgfVxuICAgICAgICBwYXJlbnQucmVwbGFjZUNoaWxkKHRoaXMucmVuZGVyKCksIHJlYWxGaXJzdENoaWxkKTtcbiAgICB9O1xuICAgIFJvdy5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmlkcyA9IHt9O1xuICAgICAgICB0aGlzLndpZGdldHMuZm9yRWFjaChmdW5jdGlvbiAodykgeyByZXR1cm4gdy5yZW1vdmVkKCk7IH0pO1xuICAgICAgICB0aGlzLndpZGdldHMgPSBbXTtcbiAgICAgICAgdGhpcy50cmVlID0gdGhpcy50ZW1wbGF0ZS5jYWxsKHRoaXMuY29udGV4dCk7XG4gICAgICAgIHRoaXMuaWRzWydyb290J10gPSAodGhpcy5pZHNbJ3Jvb3QnXSkgPyB0aGlzLmlkc1sncm9vdCddIDogdGhpcy50cmVlO1xuICAgICAgICB0aGlzLndpZGdldHMuZm9yRWFjaChmdW5jdGlvbiAodykgeyByZXR1cm4gdy5yZW5kZXJlZCgpOyB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJlZTtcbiAgICB9O1xuICAgIHJldHVybiBSb3c7XG59KCkpO1xuZXhwb3J0cy5Sb3cgPSBSb3c7XG52YXIgQ29sdW1uID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDb2x1bW4oY29udGV4dCkge1xuICAgICAgICB2YXIgdmlldyA9IHRoaXM7XG4gICAgICAgIHRoaXMuaWRzID0ge307XG4gICAgICAgIHRoaXMud2lkZ2V0cyA9IFtdO1xuICAgICAgICB0aGlzLnRyZWUgPSBudWxsO1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuICQkbm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6IHRoaXMuX2dldENsYXNzKCkgfSB9LCBbJCRyZXNvbHZlKHRoaXMsICdjaGlsZHJlbicpXSwgdmlldyk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIENvbHVtbi5yZW5kZXIgPSBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgICAgICByZXR1cm4gKG5ldyBDb2x1bW4oY29udGV4dCkpLnJlbmRlcigpO1xuICAgIH07XG4gICAgQ29sdW1uLnByb3RvdHlwZS5yZWdpc3RlciA9IGZ1bmN0aW9uIChpZCwgdykge1xuICAgICAgICBpZiAodGhpcy5pZHMuaGFzT3duUHJvcGVydHkoaWQpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdEdXBsaWNhdGUgaWQgXFwnJyArIGlkICsgJ1xcJyBkZXRlY3RlZCEnKTtcbiAgICAgICAgdGhpcy5pZHNbaWRdID0gdztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBDb2x1bW4ucHJvdG90eXBlLmZpbmRCeUlkID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5pZHNbaWRdKSA/IHRoaXMuaWRzW2lkXSA6IG51bGw7XG4gICAgfTtcbiAgICBDb2x1bW4ucHJvdG90eXBlLmludmFsaWRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjaGlsZHM7XG4gICAgICAgIHZhciBwYXJlbnQgPSB0aGlzLnRyZWUucGFyZW50Tm9kZTtcbiAgICAgICAgdmFyIHJlYWxGaXJzdENoaWxkO1xuICAgICAgICB2YXIgcmVhbEZpcnN0Q2hpbGRJbmRleDtcbiAgICAgICAgaWYgKHRoaXMudHJlZSA9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKCdDYW5ub3QgaW52YWxpZGF0ZSBhIHZpZXcgdGhhdCBoYXMgbm90IGJlZW4gcmVuZGVyZWQhJyk7XG4gICAgICAgIGlmICh0aGlzLnRyZWUucGFyZW50Tm9kZSA9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKCdBdHRlbXB0IHRvIGludmFsaWRhdGUgYSB2aWV3IHRoYXQgaGFzIG5vdCBiZWVuIGluc2VydGVkIHRvIERPTSEnKTtcbiAgICAgICAgY2hpbGRzID0gdGhpcy50cmVlLnBhcmVudE5vZGUuY2hpbGRyZW47XG4gICAgICAgIC8vZm9yIHNvbWUgcmVhc29uIHRoZSByZWZlcmVuY2Ugc3RvcmVkIGRvZXMgbm90IGhhdmUgdGhlIGNvcnJlY3QgcGFyZW50IG5vZGUuXG4gICAgICAgIC8vd2UgZG8gdGhpcyB0byBnZXQgYSAnbGl2ZScgdmVyc2lvbiBvZiB0aGUgbm9kZS5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHMubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICBpZiAoY2hpbGRzW2ldID09PSB0aGlzLnRyZWUpIHtcbiAgICAgICAgICAgICAgICByZWFsRmlyc3RDaGlsZCA9IGNoaWxkc1tpXTtcbiAgICAgICAgICAgICAgICByZWFsRmlyc3RDaGlsZEluZGV4ID0gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgcGFyZW50LnJlcGxhY2VDaGlsZCh0aGlzLnJlbmRlcigpLCByZWFsRmlyc3RDaGlsZCk7XG4gICAgfTtcbiAgICBDb2x1bW4ucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5pZHMgPSB7fTtcbiAgICAgICAgdGhpcy53aWRnZXRzLmZvckVhY2goZnVuY3Rpb24gKHcpIHsgcmV0dXJuIHcucmVtb3ZlZCgpOyB9KTtcbiAgICAgICAgdGhpcy53aWRnZXRzID0gW107XG4gICAgICAgIHRoaXMudHJlZSA9IHRoaXMudGVtcGxhdGUuY2FsbCh0aGlzLmNvbnRleHQpO1xuICAgICAgICB0aGlzLmlkc1sncm9vdCddID0gKHRoaXMuaWRzWydyb290J10pID8gdGhpcy5pZHNbJ3Jvb3QnXSA6IHRoaXMudHJlZTtcbiAgICAgICAgdGhpcy53aWRnZXRzLmZvckVhY2goZnVuY3Rpb24gKHcpIHsgcmV0dXJuIHcucmVuZGVyZWQoKTsgfSk7XG4gICAgICAgIHJldHVybiB0aGlzLnRyZWU7XG4gICAgfTtcbiAgICByZXR1cm4gQ29sdW1uO1xufSgpKTtcbmV4cG9ydHMuQ29sdW1uID0gQ29sdW1uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Z3JpZC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qIGpzaGludCBpZ25vcmU6c3RhcnQgKi9cbi8qXG5leHBvcnQgQnJlYWRDcnVtYk1lbnUgZnJvbSAnLi9icmVhZGNydW1icy9CcmVhZENydW1iTWVudSc7XG5leHBvcnQgQnJlYWRDcnVtYiBmcm9tICcuL2JyZWFkY3J1bWJzL0JyZWFkQ3J1bWInO1xuZXhwb3J0IEJ1dHRvbiBmcm9tICcuL2J1dHRvbi9CdXR0b24nO1xuZXhwb3J0IE1vZGFsIGZyb20gJy4vbW9kYWwvTW9kYWwnO1xuZXhwb3J0IE1vZGFsSGVhZGVyIGZyb20gJy4vbW9kYWwvTW9kYWxIZWFkZXInO1xuZXhwb3J0IE1vZGFsQm9keSBmcm9tICcuL21vZGFsL01vZGFsQm9keSc7XG5leHBvcnQgTW9kYWxGb290ZXIgZnJvbSAnLi9tb2RhbC9Nb2RhbEZvb3Rlcic7XG5leHBvcnQgQ29udGFpbmVyIGZyb20gJy4vY29udGFpbmVyL0NvbnRhaW5lcic7XG5leHBvcnQgQ29sdW1uIGZyb20gJy4vY29sdW1uL0NvbHVtbic7XG5leHBvcnQgUm93IGZyb20gJy4vcm93L1Jvdyc7XG5leHBvcnQgVGFibGUgZnJvbSAnLi90YWJsZS9UYWJsZSc7XG5leHBvcnQgQXV0b2NvbXBsZXRlIGZyb20gJy4vYXV0b2NvbXBsZXRlL0F1dG9jb21wbGV0ZSc7XG5leHBvcnQgSW5wdXQgZnJvbSAnLi9pbnB1dC9JbnB1dCc7XG5leHBvcnQgU2VsZWN0IGZyb20gJy4vc2VsZWN0L1NlbGVjdCc7XG5leHBvcnQgU3dpdGNoIGZyb20gJy4vc3dpdGNoL1N3aXRjaCc7XG5leHBvcnQgSnVtYm90cm9uIGZyb20gJy4vanVtYm90cm9uL0p1bWJvdHJvbic7XG5leHBvcnQgV2VsbCBmcm9tICcuL3dlbGwvV2VsbCc7XG5leHBvcnQgUGFuZWwgZnJvbSAnLi9wYW5lbC9QYW5lbCc7XG5leHBvcnQgUGFuZWxIZWFkZXIgZnJvbSAnLi9wYW5lbC9IZWFkZXInO1xuZXhwb3J0IFBhbmVsQm9keSBmcm9tICcuL3BhbmVsL0JvZHknO1xuZXhwb3J0IFBhbmVsRm9vdGVyIGZyb20gJy4vcGFuZWwvRm9vdGVyJztcbmV4cG9ydCBDYXJkIGZyb20gJy4vY2FyZC9DYXJkJztcbmV4cG9ydCBDYXJkSW1hZ2UgZnJvbSAnLi9jYXJkL0NhcmRJbWFnZSc7XG5leHBvcnQgQ2FyZFRpdGxlIGZyb20gJy4vY2FyZC9DYXJkVGl0bGUnO1xuZXhwb3J0IENhcmRCbG9jayBmcm9tICcuL2NhcmQvQ2FyZEJsb2NrJztcbmV4cG9ydCBUYWIgZnJvbSAnLi90YWJzL1RhYic7XG5leHBvcnQgVGFicyBmcm9tICcuL3RhYnMvVGFicyc7XG5leHBvcnQgTGlzdEdyb3VwIGZyb20gJy4vbGlzdC1ncm91cC9MaXN0R3JvdXAnO1xuZXhwb3J0IExpc3RHcm91cEl0ZW0gZnJvbSAnLi9saXN0LWdyb3VwL0xpc3RHcm91cEl0ZW0nO1xuZXhwb3J0IFNlYXJjaCBmcm9tICcuL3NlYXJjaC9TZWFyY2gnO1xuKi9cbnZhciBEcmF3ZXJMYXlvdXRfMSA9IHJlcXVpcmUoXCIuL2RyYXdlci1sYXlvdXQvRHJhd2VyTGF5b3V0XCIpO1xuZXhwb3J0cy5EcmF3ZXJMYXlvdXQgPSBEcmF3ZXJMYXlvdXRfMS5EcmF3ZXJMYXlvdXQ7XG52YXIgQWN0aW9uQXJlYV8xID0gcmVxdWlyZShcIi4vYWN0aW9uLWFyZWEvQWN0aW9uQXJlYVwiKTtcbmV4cG9ydHMuQWN0aW9uQXJlYSA9IEFjdGlvbkFyZWFfMS5BY3Rpb25BcmVhO1xudmFyIE1haW5WaWV3XzEgPSByZXF1aXJlKFwiLi9tYWluLXZpZXcvTWFpblZpZXdcIik7XG5leHBvcnRzLk1haW5WaWV3ID0gTWFpblZpZXdfMS5NYWluVmlldztcbnZhciBNZW51QnV0dG9uXzEgPSByZXF1aXJlKFwiLi9tZW51LWJ1dHRvbi9NZW51QnV0dG9uXCIpO1xuZXhwb3J0cy5NZW51QnV0dG9uID0gTWVudUJ1dHRvbl8xLk1lbnVCdXR0b247XG52YXIgQnV0dG9uXzEgPSByZXF1aXJlKFwiLi9idXR0b24vQnV0dG9uXCIpO1xuZXhwb3J0cy5CdXR0b24gPSBCdXR0b25fMS5CdXR0b247XG52YXIgR3JpZF8xID0gcmVxdWlyZShcIi4vZ3JpZC9HcmlkXCIpO1xuZXhwb3J0cy5Db250YWluZXIgPSBHcmlkXzEuQ29udGFpbmVyO1xuZXhwb3J0cy5Sb3cgPSBHcmlkXzEuUm93O1xuZXhwb3J0cy5Db2x1bW4gPSBHcmlkXzEuQ29sdW1uO1xudmFyIFBhbmVsXzEgPSByZXF1aXJlKFwiLi9wYW5lbC9QYW5lbFwiKTtcbmV4cG9ydHMuUGFuZWwgPSBQYW5lbF8xLlBhbmVsO1xuZXhwb3J0cy5QYW5lbEhlYWRlciA9IFBhbmVsXzEuSGVhZGVyO1xuZXhwb3J0cy5QYW5lbEJvZHkgPSBQYW5lbF8xLkJvZHk7XG5leHBvcnRzLlBhbmVsRm9vdGVyID0gUGFuZWxfMS5Gb290ZXI7XG52YXIgTW9kYWxfMSA9IHJlcXVpcmUoXCIuL21vZGFsL01vZGFsXCIpO1xuZXhwb3J0cy5Nb2RhbCA9IE1vZGFsXzEuTW9kYWw7XG5leHBvcnRzLk1vZGFsSGVhZGVyID0gTW9kYWxfMS5IZWFkZXI7XG5leHBvcnRzLk1vZGFsQm9keSA9IE1vZGFsXzEuQm9keTtcbmV4cG9ydHMuTW9kYWxGb290ZXIgPSBNb2RhbF8xLkZvb3Rlcjtcbi8qIGpzaGludCBpZ25vcmU6ZW5kICovXG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJ1bnRpbWVfMSA9IHJlcXVpcmUoXCJAcXVlbmsvd21sL2xpYi9ydW50aW1lXCIpO1xudmFyIHV0aWxfMSA9IHJlcXVpcmUoXCJ3bWwtd2lkZ2V0cy1jb21tb24vdXRpbFwiKTtcbnZhciBtYWluX3ZpZXdfMSA9IHJlcXVpcmUoXCIuL3dtbC9tYWluLXZpZXdcIik7XG4vKipcbiAqIE1haW5WaWV3IHByb3ZpZGVzIGEgY29udGFpbmVyIGZvciB0aGUgbWFpbiBjb250ZW50IG9mIGFuIGFwcGxpY2F0aW9uLlxuICovXG52YXIgTWFpblZpZXcgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhNYWluVmlldywgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBNYWluVmlldygpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnZpZXcgPSBuZXcgbWFpbl92aWV3XzEuTWFpbihfdGhpcyk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogc2V0Q29udGVudCByZXBsYWNlcyB0aGUgY29udGVudCBvZiB0aGlzIHZpZXcuXG4gICAgICovXG4gICAgTWFpblZpZXcucHJvdG90eXBlLnNldENvbnRlbnQgPSBmdW5jdGlvbiAocikge1xuICAgICAgICB1dGlsXzEucmVwbGFjZUNvbnRlbnQociwgdGhpcy52aWV3LmZpbmRCeUlkKCdjb250ZW50JykpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIHJldHVybiBNYWluVmlldztcbn0ocnVudGltZV8xLkFic3RyYWN0V2lkZ2V0KSk7XG5leHBvcnRzLk1haW5WaWV3ID0gTWFpblZpZXc7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1NYWluVmlldy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBTdHlsZXMgPSByZXF1aXJlKFwid21sLXdpZGdldHMtY29tbW9uL1N0eWxlc1wiKTtcbnZhciB1dGlsXzEgPSByZXF1aXJlKFwid21sLXdpZGdldHMtY29tbW9uL3V0aWxcIik7XG5mdW5jdGlvbiAkJGJvdW5kYXJ5X3RvX2RvdCh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZS5zcGxpdCgnXVsnKS5qb2luKCcuJykuc3BsaXQoJ1snKS5qb2luKCcuJyk7XG59XG5mdW5jdGlvbiAkJHN0cmlwX2JyYWNlcyh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZS5zcGxpdCgnWycpLmpvaW4oJy4nKS5zcGxpdCgnXScpLmpvaW4oJycpO1xufVxuZnVuY3Rpb24gJCRlc2NhcGVfZG90cyh2YWx1ZSkge1xuICAgIHZhbHVlID0gdmFsdWUuc3BsaXQoJ1xcJycpO1xuICAgIHJldHVybiAodmFsdWUubGVuZ3RoIDwgMykgPyB2YWx1ZS5qb2luKCdcXCcnKSA6IHZhbHVlLm1hcChmdW5jdGlvbiAoc2VnKSB7XG4gICAgICAgIGlmIChzZWcubGVuZ3RoIDwgMylcbiAgICAgICAgICAgIHJldHVybiBzZWc7XG4gICAgICAgIGlmICgoc2VnWzBdID09PSAnLicpIHx8IChzZWdbc2VnLmxlbmd0aCAtIDFdID09PSAnLicpKVxuICAgICAgICAgICAgcmV0dXJuIHNlZztcbiAgICAgICAgcmV0dXJuIHNlZy5zcGxpdCgnLicpLmpvaW4oJyYmJyk7XG4gICAgfSkuam9pbignJyk7XG59XG5mdW5jdGlvbiAkJHVuZXNjYXBlX2RvdHModmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUuc3BsaXQoJyYmJykuam9pbignLicpO1xufVxuZnVuY3Rpb24gJCRwYXJ0aWZ5KHZhbHVlKSB7XG4gICAgaWYgKCF2YWx1ZSlcbiAgICAgICAgcmV0dXJuO1xuICAgIHJldHVybiAkJGVzY2FwZV9kb3RzKCQkc3RyaXBfYnJhY2VzKCQkYm91bmRhcnlfdG9fZG90KCcnICsgdmFsdWUpKSkuc3BsaXQoJy4nKTtcbn1cbmZ1bmN0aW9uICQkcHJvcGVydHkocGF0aCwgbykge1xuICAgIHZhciBwYXJ0cyA9ICQkcGFydGlmeShwYXRoKTtcbiAgICB2YXIgZmlyc3Q7XG4gICAgaWYgKHR5cGVvZiBvICE9PSAnb2JqZWN0JylcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZ2V0KCk6IGV4cGVjdHMgYW4gb2JqZWN0IGdvdCAnICsgdHlwZW9mIG8pO1xuICAgIGlmIChwYXJ0cy5sZW5ndGggPT09IDEpXG4gICAgICAgIHJldHVybiBvWyQkdW5lc2NhcGVfZG90cyhwYXJ0c1swXSldO1xuICAgIGlmIChwYXJ0cy5sZW5ndGggPT09IDApXG4gICAgICAgIHJldHVybjtcbiAgICBmaXJzdCA9IG9bcGFydHMuc2hpZnQoKV07XG4gICAgcmV0dXJuICgodHlwZW9mIG8gPT09ICdvYmplY3QnKSAmJiAobyAhPT0gbnVsbCkpID9cbiAgICAgICAgcGFydHMucmVkdWNlKGZ1bmN0aW9uICh0YXJnZXQsIHByb3ApIHtcbiAgICAgICAgICAgIGlmICh0YXJnZXQgPT0gbnVsbClcbiAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgICAgICAgICAgcmV0dXJuIHRhcmdldFskJHVuZXNjYXBlX2RvdHMocHJvcCldO1xuICAgICAgICB9LCBmaXJzdCkgOiBudWxsO1xufVxuZnVuY3Rpb24gJCRhZG9wdChjaGlsZCwgZSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGNoaWxkKSlcbiAgICAgICAgcmV0dXJuIGNoaWxkLmZvckVhY2goZnVuY3Rpb24gKGlubmVyQ2hpbGQpIHsgcmV0dXJuICQkYWRvcHQoaW5uZXJDaGlsZCwgZSk7IH0pO1xuICAgIGlmIChjaGlsZClcbiAgICAgICAgZS5hcHBlbmRDaGlsZCgodHlwZW9mIGNoaWxkID09PSAnb2JqZWN0JykgP1xuICAgICAgICAgICAgY2hpbGQgOiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjaGlsZCA9PSBudWxsID8gJycgOiBjaGlsZCkpO1xufVxuLyoqXG4gKiAkJHRleHQgY3JlYXRlcyBhIERPTVRleHROb2RlXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAqL1xuZnVuY3Rpb24gJCR0ZXh0KHZhbHVlKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlKTtcbn1cbi8qKlxuICogJCRyZXNvbHZlIHByb3BlcnR5IGFjY2VzcyBleHByZXNzaW9uIHRvIGF2b2lkXG4gKiB0aG93aW5nIGVycm9ycyBpZiBpdCBkb2VzIG5vdCBleGlzdC5cbiAqIEBwYXJhbSB7b2JqZWN0fSBoZWFkXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0aFxuICovXG5mdW5jdGlvbiAkJHJlc29sdmUoaGVhZCwgcGF0aCkge1xuICAgIHZhciByZXQgPSAkJHByb3BlcnR5KHBhdGgsIGhlYWQpO1xuICAgIHJldHVybiAocmV0ID09IG51bGwpID8gJycgOiByZXQ7XG59XG4vKipcbiAqICQkbm9kZSBpcyBjYWxsZWQgdG8gY3JlYXRlIGEgcmVndWxhciBET00gbm9kZVxuICogQHBhcmFtIHtzdHJpbmd9IHRhZ1xuICogQHBhcmFtIHtvYmplY3R9IGF0dHJpYnV0ZXNcbiAqIEBwYXJhbSB7YXJyYXk8c3RyaW5nfG51bWJlcnxXaWRnZXQ+fSBjaGlsZHJlblxuICogQHBhcmFtIHtWaWV3fSB2aWV3XG4gKi9cbmZ1bmN0aW9uICQkbm9kZSh0YWcsIGF0dHJpYnV0ZXMsIGNoaWxkcmVuLCB2aWV3KSB7XG4gICAgdmFyIGUgPSAodGFnID09PSAnZnJhZ21lbnQnKSA/IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSA6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgICBpZiAodHlwZW9mIGF0dHJpYnV0ZXMuaHRtbCA9PT0gJ29iamVjdCcpXG4gICAgICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMuaHRtbCkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGF0dHJpYnV0ZXMuaHRtbFtrZXldID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgZVtrZXldID0gYXR0cmlidXRlcy5odG1sW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBlLnNldEF0dHJpYnV0ZShrZXksIGF0dHJpYnV0ZXMuaHRtbFtrZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoYykgeyByZXR1cm4gJCRhZG9wdChjLCBlKTsgfSk7XG4gICAgaWYgKGF0dHJpYnV0ZXMud21sKVxuICAgICAgICBpZiAoYXR0cmlidXRlcy53bWwuaWQpXG4gICAgICAgICAgICB2aWV3LnJlZ2lzdGVyKGF0dHJpYnV0ZXMud21sLmlkLCBlKTtcbiAgICByZXR1cm4gZTtcbn1cbi8qKlxuICogQXR0cmlidXRlcyBwcm92aWRlcyBhbiBBUEkgZm9yIHJlYWRpbmcgdGhlXG4gKiBhdHRyaWJ1dGVzIHN1cHBsaWVkIHRvIGFuIEVsZW1lbnQuXG4gKiBAcGFyYW0ge29iamVjdH0gYXR0cnNcbiAqL1xudmFyIEF0dHJpYnV0ZXMgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEF0dHJpYnV0ZXMoX2F0dHJzKSB7XG4gICAgICAgIHRoaXMuX2F0dHJzID0gX2F0dHJzO1xuICAgICAgICB0aGlzLl9hdHRycyA9IF9hdHRycztcbiAgICB9XG4gICAgQXR0cmlidXRlcy5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gKHBhdGgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVhZChwYXRoKSAhPSBudWxsO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogcmVhZCBhIHZhbHVlIGZvcm0gdGhlIGludGVybmFsIGxpc3QuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGhcbiAgICAgKiBAcGFyYW0geyp9IGRlZmF1bHRWYWx1ZSAtIFRoaXMgdmFsdWUgaXMgcmV0dXJuZWQgaWYgdGhlIHZhbHVlIGlzIG5vdCBzZXQuXG4gICAgICovXG4gICAgQXR0cmlidXRlcy5wcm90b3R5cGUucmVhZCA9IGZ1bmN0aW9uIChwYXRoLCBkZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgdmFyIHJldCA9ICQkcHJvcGVydHkocGF0aC5zcGxpdCgnOicpLmpvaW4oJy4nKSwgdGhpcy5fYXR0cnMpO1xuICAgICAgICByZXR1cm4gKHJldCAhPSBudWxsKSA/IHJldCA6IChkZWZhdWx0VmFsdWUgIT0gbnVsbCkgPyBkZWZhdWx0VmFsdWUgOiAnJztcbiAgICB9O1xuICAgIHJldHVybiBBdHRyaWJ1dGVzO1xufSgpKTtcbi8qKlxuICogJCR3aWRnZXQgY3JlYXRlcyBhIHdtbCB3aWRnZXQuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBDb25zdHJ1dG9yXG4gKiBAcGFyYW0ge29iamVjdH0gYXR0cmlidXRlc1xuICogQHBhcmFtIHthcnJheTxzdHJpbmd8bnVtYmVyfFdpZGdldD59IGNoaWxkcmVuXG4gKiBAcGFyYW0ge1ZpZXd9IHZpZXdcbiAqIEByZXR1cm4ge1dpZGdldH1cbiAqL1xuZnVuY3Rpb24gJCR3aWRnZXQoQ29uc3RydWN0b3IsIGF0dHJpYnV0ZXMsIGNoaWxkcmVuLCB2aWV3KSB7XG4gICAgdmFyIGNoaWxkcyA9IFtdO1xuICAgIHZhciB3O1xuICAgIGNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKGNoaWxkKSB7IHJldHVybiBBcnJheS5pc0FycmF5KGNoaWxkKSA/XG4gICAgICAgIGNoaWxkcy5wdXNoLmFwcGx5KGNoaWxkcywgY2hpbGQpIDogY2hpbGRzLnB1c2goY2hpbGQpOyB9KTtcbiAgICB3ID0gbmV3IENvbnN0cnVjdG9yKG5ldyBBdHRyaWJ1dGVzKGF0dHJpYnV0ZXMpLCBjaGlsZHMpO1xuICAgIGlmIChhdHRyaWJ1dGVzLndtbClcbiAgICAgICAgaWYgKGF0dHJpYnV0ZXMud21sLmlkKVxuICAgICAgICAgICAgdmlldy5yZWdpc3RlcihhdHRyaWJ1dGVzLndtbC5pZCwgdyk7XG4gICAgdmlldy53aWRnZXRzLnB1c2godyk7XG4gICAgcmV0dXJuIHcucmVuZGVyKCk7XG59XG4vKipcbiAqICQkaWYgaXMgY2FsbGVkIHRvIGNyZWF0ZSBhbiBpZiBjb25kaXRpb25hbCBjb25zdHJ1Y3RcbiAqIEBwYXJhbSB7Kn0gcHJlZGljYXRlXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBwb3NpdGl2ZVxuICogQHBhcmFtIHtmdW5jdGlvbn0gbmVnYXRpdmVcbiAqL1xuZnVuY3Rpb24gJCRpZihwcmVkaWNhdGUsIHBvc2l0aXZlLCBuZWdhdGl2ZSkge1xuICAgIHJldHVybiAocHJlZGljYXRlKSA/IHBvc2l0aXZlKCkgOiBuZWdhdGl2ZSgpO1xufVxuLyoqXG4gKiAkJGZvciBpcyBjYWxsZWQgdG8gY3JlYXRlIGEgZm9yIGxvb3AgY29uc3RydWN0XG4gKiBAcGFyYW0ge0l0ZXJhYmxlfSBjb2xsZWN0aW9uXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYlxuICovXG5mdW5jdGlvbiAkJGZvcihjb2xsZWN0aW9uLCBjYikge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGNvbGxlY3Rpb24pKSB7XG4gICAgICAgIHJldHVybiBjb2xsZWN0aW9uLm1hcChjYik7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBjb2xsZWN0aW9uID09PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoY29sbGVjdGlvbikubWFwKGZ1bmN0aW9uIChrZXksIF8sIGFsbCkgeyByZXR1cm4gY2IoY29sbGVjdGlvbltrZXldLCBrZXksIGFsbCk7IH0pO1xuICAgIH1cbiAgICByZXR1cm4gW107XG59XG4vKipcbiAqICQkc3dpdGNoIHNpbXVsYXRlcyBhIHN3aXRjaCBzdGF0ZW1lbnRcbiAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcnxib29sZWFufSB2YWx1ZVxuICogQHBhcmFtIHtvYmplY3R9IGNhc2VzXG4gKi9cbmZ1bmN0aW9uICQkc3dpdGNoKHZhbHVlLCBjYXNlcykge1xuICAgIHZhciByZXN1bHQgPSBjYXNlc1t2YWx1ZV07XG4gICAgdmFyIGRlZmF1bCA9IGNhc2VzLmRlZmF1bHQ7XG4gICAgaWYgKHJlc3VsdClcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICBpZiAoZGVmYXVsKVxuICAgICAgICByZXR1cm4gZGVmYXVsO1xufVxudmFyIE1haW4gPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE1haW4oY29udGV4dCkge1xuICAgICAgICB2YXIgdmlldyA9IHRoaXM7XG4gICAgICAgIHRoaXMuaWRzID0ge307XG4gICAgICAgIHRoaXMud2lkZ2V0cyA9IFtdO1xuICAgICAgICB0aGlzLnRyZWUgPSBudWxsO1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuICQkbm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6IHV0aWxfMS5jb21iaW5lKFskJHJlc29sdmUoU3R5bGVzLCAnTUFJTl9WSUVXJyksICQkcmVzb2x2ZShTdHlsZXMsICdEUkFXRVJfUFVTSEFCTEUnKSwgdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OmNsYXNzJyldKSB9IH0sIFskJHJlc29sdmUodGhpcywgJ2NoaWxkcmVuJyldLCB2aWV3KTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgTWFpbi5yZW5kZXIgPSBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgICAgICByZXR1cm4gKG5ldyBNYWluKGNvbnRleHQpKS5yZW5kZXIoKTtcbiAgICB9O1xuICAgIE1haW4ucHJvdG90eXBlLnJlZ2lzdGVyID0gZnVuY3Rpb24gKGlkLCB3KSB7XG4gICAgICAgIGlmICh0aGlzLmlkcy5oYXNPd25Qcm9wZXJ0eShpZCkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0R1cGxpY2F0ZSBpZCBcXCcnICsgaWQgKyAnXFwnIGRldGVjdGVkIScpO1xuICAgICAgICB0aGlzLmlkc1tpZF0gPSB3O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIE1haW4ucHJvdG90eXBlLmZpbmRCeUlkID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5pZHNbaWRdKSA/IHRoaXMuaWRzW2lkXSA6IG51bGw7XG4gICAgfTtcbiAgICBNYWluLnByb3RvdHlwZS5pbnZhbGlkYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY2hpbGRzO1xuICAgICAgICB2YXIgcGFyZW50ID0gdGhpcy50cmVlLnBhcmVudE5vZGU7XG4gICAgICAgIHZhciByZWFsRmlyc3RDaGlsZDtcbiAgICAgICAgdmFyIHJlYWxGaXJzdENoaWxkSW5kZXg7XG4gICAgICAgIGlmICh0aGlzLnRyZWUgPT0gbnVsbClcbiAgICAgICAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcignQ2Fubm90IGludmFsaWRhdGUgYSB2aWV3IHRoYXQgaGFzIG5vdCBiZWVuIHJlbmRlcmVkIScpO1xuICAgICAgICBpZiAodGhpcy50cmVlLnBhcmVudE5vZGUgPT0gbnVsbClcbiAgICAgICAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcignQXR0ZW1wdCB0byBpbnZhbGlkYXRlIGEgdmlldyB0aGF0IGhhcyBub3QgYmVlbiBpbnNlcnRlZCB0byBET00hJyk7XG4gICAgICAgIGNoaWxkcyA9IHRoaXMudHJlZS5wYXJlbnROb2RlLmNoaWxkcmVuO1xuICAgICAgICAvL2ZvciBzb21lIHJlYXNvbiB0aGUgcmVmZXJlbmNlIHN0b3JlZCBkb2VzIG5vdCBoYXZlIHRoZSBjb3JyZWN0IHBhcmVudCBub2RlLlxuICAgICAgICAvL3dlIGRvIHRoaXMgdG8gZ2V0IGEgJ2xpdmUnIHZlcnNpb24gb2YgdGhlIG5vZGUuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRzLmxlbmd0aDsgaSsrKVxuICAgICAgICAgICAgaWYgKGNoaWxkc1tpXSA9PT0gdGhpcy50cmVlKSB7XG4gICAgICAgICAgICAgICAgcmVhbEZpcnN0Q2hpbGQgPSBjaGlsZHNbaV07XG4gICAgICAgICAgICAgICAgcmVhbEZpcnN0Q2hpbGRJbmRleCA9IGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIHBhcmVudC5yZXBsYWNlQ2hpbGQodGhpcy5yZW5kZXIoKSwgcmVhbEZpcnN0Q2hpbGQpO1xuICAgIH07XG4gICAgTWFpbi5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmlkcyA9IHt9O1xuICAgICAgICB0aGlzLndpZGdldHMuZm9yRWFjaChmdW5jdGlvbiAodykgeyByZXR1cm4gdy5yZW1vdmVkKCk7IH0pO1xuICAgICAgICB0aGlzLndpZGdldHMgPSBbXTtcbiAgICAgICAgdGhpcy50cmVlID0gdGhpcy50ZW1wbGF0ZS5jYWxsKHRoaXMuY29udGV4dCk7XG4gICAgICAgIHRoaXMuaWRzWydyb290J10gPSAodGhpcy5pZHNbJ3Jvb3QnXSkgPyB0aGlzLmlkc1sncm9vdCddIDogdGhpcy50cmVlO1xuICAgICAgICB0aGlzLndpZGdldHMuZm9yRWFjaChmdW5jdGlvbiAodykgeyByZXR1cm4gdy5yZW5kZXJlZCgpOyB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJlZTtcbiAgICB9O1xuICAgIHJldHVybiBNYWluO1xufSgpKTtcbmV4cG9ydHMuTWFpbiA9IE1haW47XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYWluLXZpZXcuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBydW50aW1lXzEgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC9saWIvcnVudGltZVwiKTtcbnZhciBtZW51X2J1dHRvbl8xID0gcmVxdWlyZShcIi4vd21sL21lbnVfYnV0dG9uXCIpO1xuLyoqXG4gKiBNZW51QnV0dG9uIHByb3ZpZGVzIGEgJ2hhbWJ1cmdlcicgbWVudSBidXR0b24uXG4gKi9cbnZhciBNZW51QnV0dG9uID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoTWVudUJ1dHRvbiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBNZW51QnV0dG9uKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMudmlldyA9IG5ldyBtZW51X2J1dHRvbl8xLk1haW4oX3RoaXMpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBNZW51QnV0dG9uO1xufShydW50aW1lXzEuQWJzdHJhY3RXaWRnZXQpKTtcbmV4cG9ydHMuTWVudUJ1dHRvbiA9IE1lbnVCdXR0b247XG5leHBvcnRzLmRlZmF1bHQgPSBNZW51QnV0dG9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9TWVudUJ1dHRvbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBTdHlsZSA9IHJlcXVpcmUoXCJ3bWwtd2lkZ2V0cy1jb21tb24vU3R5bGVzXCIpO1xudmFyIHV0aWxfMSA9IHJlcXVpcmUoXCJ3bWwtd2lkZ2V0cy1jb21tb24vdXRpbFwiKTtcbmZ1bmN0aW9uICQkYm91bmRhcnlfdG9fZG90KHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlLnNwbGl0KCddWycpLmpvaW4oJy4nKS5zcGxpdCgnWycpLmpvaW4oJy4nKTtcbn1cbmZ1bmN0aW9uICQkc3RyaXBfYnJhY2VzKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlLnNwbGl0KCdbJykuam9pbignLicpLnNwbGl0KCddJykuam9pbignJyk7XG59XG5mdW5jdGlvbiAkJGVzY2FwZV9kb3RzKHZhbHVlKSB7XG4gICAgdmFsdWUgPSB2YWx1ZS5zcGxpdCgnXFwnJyk7XG4gICAgcmV0dXJuICh2YWx1ZS5sZW5ndGggPCAzKSA/IHZhbHVlLmpvaW4oJ1xcJycpIDogdmFsdWUubWFwKGZ1bmN0aW9uIChzZWcpIHtcbiAgICAgICAgaWYgKHNlZy5sZW5ndGggPCAzKVxuICAgICAgICAgICAgcmV0dXJuIHNlZztcbiAgICAgICAgaWYgKChzZWdbMF0gPT09ICcuJykgfHwgKHNlZ1tzZWcubGVuZ3RoIC0gMV0gPT09ICcuJykpXG4gICAgICAgICAgICByZXR1cm4gc2VnO1xuICAgICAgICByZXR1cm4gc2VnLnNwbGl0KCcuJykuam9pbignJiYnKTtcbiAgICB9KS5qb2luKCcnKTtcbn1cbmZ1bmN0aW9uICQkdW5lc2NhcGVfZG90cyh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZS5zcGxpdCgnJiYnKS5qb2luKCcuJyk7XG59XG5mdW5jdGlvbiAkJHBhcnRpZnkodmFsdWUpIHtcbiAgICBpZiAoIXZhbHVlKVxuICAgICAgICByZXR1cm47XG4gICAgcmV0dXJuICQkZXNjYXBlX2RvdHMoJCRzdHJpcF9icmFjZXMoJCRib3VuZGFyeV90b19kb3QoJycgKyB2YWx1ZSkpKS5zcGxpdCgnLicpO1xufVxuZnVuY3Rpb24gJCRwcm9wZXJ0eShwYXRoLCBvKSB7XG4gICAgdmFyIHBhcnRzID0gJCRwYXJ0aWZ5KHBhdGgpO1xuICAgIHZhciBmaXJzdDtcbiAgICBpZiAodHlwZW9mIG8gIT09ICdvYmplY3QnKVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdnZXQoKTogZXhwZWN0cyBhbiBvYmplY3QgZ290ICcgKyB0eXBlb2Ygbyk7XG4gICAgaWYgKHBhcnRzLmxlbmd0aCA9PT0gMSlcbiAgICAgICAgcmV0dXJuIG9bJCR1bmVzY2FwZV9kb3RzKHBhcnRzWzBdKV07XG4gICAgaWYgKHBhcnRzLmxlbmd0aCA9PT0gMClcbiAgICAgICAgcmV0dXJuO1xuICAgIGZpcnN0ID0gb1twYXJ0cy5zaGlmdCgpXTtcbiAgICByZXR1cm4gKCh0eXBlb2YgbyA9PT0gJ29iamVjdCcpICYmIChvICE9PSBudWxsKSkgP1xuICAgICAgICBwYXJ0cy5yZWR1Y2UoZnVuY3Rpb24gKHRhcmdldCwgcHJvcCkge1xuICAgICAgICAgICAgaWYgKHRhcmdldCA9PSBudWxsKVxuICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgICAgICAgICByZXR1cm4gdGFyZ2V0WyQkdW5lc2NhcGVfZG90cyhwcm9wKV07XG4gICAgICAgIH0sIGZpcnN0KSA6IG51bGw7XG59XG5mdW5jdGlvbiAkJGFkb3B0KGNoaWxkLCBlKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoY2hpbGQpKVxuICAgICAgICByZXR1cm4gY2hpbGQuZm9yRWFjaChmdW5jdGlvbiAoaW5uZXJDaGlsZCkgeyByZXR1cm4gJCRhZG9wdChpbm5lckNoaWxkLCBlKTsgfSk7XG4gICAgaWYgKGNoaWxkKVxuICAgICAgICBlLmFwcGVuZENoaWxkKCh0eXBlb2YgY2hpbGQgPT09ICdvYmplY3QnKSA/XG4gICAgICAgICAgICBjaGlsZCA6IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNoaWxkID09IG51bGwgPyAnJyA6IGNoaWxkKSk7XG59XG4vKipcbiAqICQkdGV4dCBjcmVhdGVzIGEgRE9NVGV4dE5vZGVcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICovXG5mdW5jdGlvbiAkJHRleHQodmFsdWUpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodmFsdWUgPT0gbnVsbCA/ICcnIDogdmFsdWUpO1xufVxuLyoqXG4gKiAkJHJlc29sdmUgcHJvcGVydHkgYWNjZXNzIGV4cHJlc3Npb24gdG8gYXZvaWRcbiAqIHRob3dpbmcgZXJyb3JzIGlmIGl0IGRvZXMgbm90IGV4aXN0LlxuICogQHBhcmFtIHtvYmplY3R9IGhlYWRcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoXG4gKi9cbmZ1bmN0aW9uICQkcmVzb2x2ZShoZWFkLCBwYXRoKSB7XG4gICAgdmFyIHJldCA9ICQkcHJvcGVydHkocGF0aCwgaGVhZCk7XG4gICAgcmV0dXJuIChyZXQgPT0gbnVsbCkgPyAnJyA6IHJldDtcbn1cbi8qKlxuICogJCRub2RlIGlzIGNhbGxlZCB0byBjcmVhdGUgYSByZWd1bGFyIERPTSBub2RlXG4gKiBAcGFyYW0ge3N0cmluZ30gdGFnXG4gKiBAcGFyYW0ge29iamVjdH0gYXR0cmlidXRlc1xuICogQHBhcmFtIHthcnJheTxzdHJpbmd8bnVtYmVyfFdpZGdldD59IGNoaWxkcmVuXG4gKiBAcGFyYW0ge1ZpZXd9IHZpZXdcbiAqL1xuZnVuY3Rpb24gJCRub2RlKHRhZywgYXR0cmlidXRlcywgY2hpbGRyZW4sIHZpZXcpIHtcbiAgICB2YXIgZSA9ICh0YWcgPT09ICdmcmFnbWVudCcpID8gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpIDogZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xuICAgIGlmICh0eXBlb2YgYXR0cmlidXRlcy5odG1sID09PSAnb2JqZWN0JylcbiAgICAgICAgT2JqZWN0LmtleXMoYXR0cmlidXRlcy5odG1sKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgYXR0cmlidXRlcy5odG1sW2tleV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBlW2tleV0gPSBhdHRyaWJ1dGVzLmh0bWxba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGUuc2V0QXR0cmlidXRlKGtleSwgYXR0cmlidXRlcy5odG1sW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICBjaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChjKSB7IHJldHVybiAkJGFkb3B0KGMsIGUpOyB9KTtcbiAgICBpZiAoYXR0cmlidXRlcy53bWwpXG4gICAgICAgIGlmIChhdHRyaWJ1dGVzLndtbC5pZClcbiAgICAgICAgICAgIHZpZXcucmVnaXN0ZXIoYXR0cmlidXRlcy53bWwuaWQsIGUpO1xuICAgIHJldHVybiBlO1xufVxuLyoqXG4gKiBBdHRyaWJ1dGVzIHByb3ZpZGVzIGFuIEFQSSBmb3IgcmVhZGluZyB0aGVcbiAqIGF0dHJpYnV0ZXMgc3VwcGxpZWQgdG8gYW4gRWxlbWVudC5cbiAqIEBwYXJhbSB7b2JqZWN0fSBhdHRyc1xuICovXG52YXIgQXR0cmlidXRlcyA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQXR0cmlidXRlcyhfYXR0cnMpIHtcbiAgICAgICAgdGhpcy5fYXR0cnMgPSBfYXR0cnM7XG4gICAgICAgIHRoaXMuX2F0dHJzID0gX2F0dHJzO1xuICAgIH1cbiAgICBBdHRyaWJ1dGVzLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAocGF0aCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWFkKHBhdGgpICE9IG51bGw7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiByZWFkIGEgdmFsdWUgZm9ybSB0aGUgaW50ZXJuYWwgbGlzdC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aFxuICAgICAqIEBwYXJhbSB7Kn0gZGVmYXVsdFZhbHVlIC0gVGhpcyB2YWx1ZSBpcyByZXR1cm5lZCBpZiB0aGUgdmFsdWUgaXMgbm90IHNldC5cbiAgICAgKi9cbiAgICBBdHRyaWJ1dGVzLnByb3RvdHlwZS5yZWFkID0gZnVuY3Rpb24gKHBhdGgsIGRlZmF1bHRWYWx1ZSkge1xuICAgICAgICB2YXIgcmV0ID0gJCRwcm9wZXJ0eShwYXRoLnNwbGl0KCc6Jykuam9pbignLicpLCB0aGlzLl9hdHRycyk7XG4gICAgICAgIHJldHVybiAocmV0ICE9IG51bGwpID8gcmV0IDogKGRlZmF1bHRWYWx1ZSAhPSBudWxsKSA/IGRlZmF1bHRWYWx1ZSA6ICcnO1xuICAgIH07XG4gICAgcmV0dXJuIEF0dHJpYnV0ZXM7XG59KCkpO1xuLyoqXG4gKiAkJHdpZGdldCBjcmVhdGVzIGEgd21sIHdpZGdldC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IENvbnN0cnV0b3JcbiAqIEBwYXJhbSB7b2JqZWN0fSBhdHRyaWJ1dGVzXG4gKiBAcGFyYW0ge2FycmF5PHN0cmluZ3xudW1iZXJ8V2lkZ2V0Pn0gY2hpbGRyZW5cbiAqIEBwYXJhbSB7Vmlld30gdmlld1xuICogQHJldHVybiB7V2lkZ2V0fVxuICovXG5mdW5jdGlvbiAkJHdpZGdldChDb25zdHJ1Y3RvciwgYXR0cmlidXRlcywgY2hpbGRyZW4sIHZpZXcpIHtcbiAgICB2YXIgY2hpbGRzID0gW107XG4gICAgdmFyIHc7XG4gICAgY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoY2hpbGQpIHsgcmV0dXJuIEFycmF5LmlzQXJyYXkoY2hpbGQpID9cbiAgICAgICAgY2hpbGRzLnB1c2guYXBwbHkoY2hpbGRzLCBjaGlsZCkgOiBjaGlsZHMucHVzaChjaGlsZCk7IH0pO1xuICAgIHcgPSBuZXcgQ29uc3RydWN0b3IobmV3IEF0dHJpYnV0ZXMoYXR0cmlidXRlcyksIGNoaWxkcyk7XG4gICAgaWYgKGF0dHJpYnV0ZXMud21sKVxuICAgICAgICBpZiAoYXR0cmlidXRlcy53bWwuaWQpXG4gICAgICAgICAgICB2aWV3LnJlZ2lzdGVyKGF0dHJpYnV0ZXMud21sLmlkLCB3KTtcbiAgICB2aWV3LndpZGdldHMucHVzaCh3KTtcbiAgICByZXR1cm4gdy5yZW5kZXIoKTtcbn1cbi8qKlxuICogJCRpZiBpcyBjYWxsZWQgdG8gY3JlYXRlIGFuIGlmIGNvbmRpdGlvbmFsIGNvbnN0cnVjdFxuICogQHBhcmFtIHsqfSBwcmVkaWNhdGVcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHBvc2l0aXZlXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBuZWdhdGl2ZVxuICovXG5mdW5jdGlvbiAkJGlmKHByZWRpY2F0ZSwgcG9zaXRpdmUsIG5lZ2F0aXZlKSB7XG4gICAgcmV0dXJuIChwcmVkaWNhdGUpID8gcG9zaXRpdmUoKSA6IG5lZ2F0aXZlKCk7XG59XG4vKipcbiAqICQkZm9yIGlzIGNhbGxlZCB0byBjcmVhdGUgYSBmb3IgbG9vcCBjb25zdHJ1Y3RcbiAqIEBwYXJhbSB7SXRlcmFibGV9IGNvbGxlY3Rpb25cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNiXG4gKi9cbmZ1bmN0aW9uICQkZm9yKGNvbGxlY3Rpb24sIGNiKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoY29sbGVjdGlvbikpIHtcbiAgICAgICAgcmV0dXJuIGNvbGxlY3Rpb24ubWFwKGNiKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGNvbGxlY3Rpb24gPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhjb2xsZWN0aW9uKS5tYXAoZnVuY3Rpb24gKGtleSwgXywgYWxsKSB7IHJldHVybiBjYihjb2xsZWN0aW9uW2tleV0sIGtleSwgYWxsKTsgfSk7XG4gICAgfVxuICAgIHJldHVybiBbXTtcbn1cbi8qKlxuICogJCRzd2l0Y2ggc2ltdWxhdGVzIGEgc3dpdGNoIHN0YXRlbWVudFxuICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfGJvb2xlYW59IHZhbHVlXG4gKiBAcGFyYW0ge29iamVjdH0gY2FzZXNcbiAqL1xuZnVuY3Rpb24gJCRzd2l0Y2godmFsdWUsIGNhc2VzKSB7XG4gICAgdmFyIHJlc3VsdCA9IGNhc2VzW3ZhbHVlXTtcbiAgICB2YXIgZGVmYXVsID0gY2FzZXMuZGVmYXVsdDtcbiAgICBpZiAocmVzdWx0KVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIGlmIChkZWZhdWwpXG4gICAgICAgIHJldHVybiBkZWZhdWw7XG59XG52YXIgTWFpbiA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTWFpbihjb250ZXh0KSB7XG4gICAgICAgIHZhciB2aWV3ID0gdGhpcztcbiAgICAgICAgdGhpcy5pZHMgPSB7fTtcbiAgICAgICAgdGhpcy53aWRnZXRzID0gW107XG4gICAgICAgIHRoaXMudHJlZSA9IG51bGw7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gJCRub2RlKCdidXR0b24nLCB7IGh0bWw6IHsgJ2NsYXNzJzogJCRyZXNvbHZlKFN0eWxlLCAnTUVOVV9CVVRUT04nKSwgJ29uY2xpY2snOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd3c6b25DbGljaycsIHV0aWxfMS5ub29wKSB9IH0sIFskJG5vZGUoJ3NwYW4nLCB7IGh0bWw6IHsgJ2NsYXNzJzogXCJcIiB9IH0sIFtdLCB2aWV3KSwgJCRub2RlKCdzcGFuJywgeyBodG1sOiB7ICdjbGFzcyc6IFwiXCIgfSB9LCBbXSwgdmlldyksICQkbm9kZSgnc3BhbicsIHsgaHRtbDogeyAnY2xhc3MnOiBcIlwiIH0gfSwgW10sIHZpZXcpXSwgdmlldyk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIE1haW4ucmVuZGVyID0gZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICAgICAgcmV0dXJuIChuZXcgTWFpbihjb250ZXh0KSkucmVuZGVyKCk7XG4gICAgfTtcbiAgICBNYWluLnByb3RvdHlwZS5yZWdpc3RlciA9IGZ1bmN0aW9uIChpZCwgdykge1xuICAgICAgICBpZiAodGhpcy5pZHMuaGFzT3duUHJvcGVydHkoaWQpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdEdXBsaWNhdGUgaWQgXFwnJyArIGlkICsgJ1xcJyBkZXRlY3RlZCEnKTtcbiAgICAgICAgdGhpcy5pZHNbaWRdID0gdztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBNYWluLnByb3RvdHlwZS5maW5kQnlJZCA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICByZXR1cm4gKHRoaXMuaWRzW2lkXSkgPyB0aGlzLmlkc1tpZF0gOiBudWxsO1xuICAgIH07XG4gICAgTWFpbi5wcm90b3R5cGUuaW52YWxpZGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNoaWxkcztcbiAgICAgICAgdmFyIHBhcmVudCA9IHRoaXMudHJlZS5wYXJlbnROb2RlO1xuICAgICAgICB2YXIgcmVhbEZpcnN0Q2hpbGQ7XG4gICAgICAgIHZhciByZWFsRmlyc3RDaGlsZEluZGV4O1xuICAgICAgICBpZiAodGhpcy50cmVlID09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoJ0Nhbm5vdCBpbnZhbGlkYXRlIGEgdmlldyB0aGF0IGhhcyBub3QgYmVlbiByZW5kZXJlZCEnKTtcbiAgICAgICAgaWYgKHRoaXMudHJlZS5wYXJlbnROb2RlID09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoJ0F0dGVtcHQgdG8gaW52YWxpZGF0ZSBhIHZpZXcgdGhhdCBoYXMgbm90IGJlZW4gaW5zZXJ0ZWQgdG8gRE9NIScpO1xuICAgICAgICBjaGlsZHMgPSB0aGlzLnRyZWUucGFyZW50Tm9kZS5jaGlsZHJlbjtcbiAgICAgICAgLy9mb3Igc29tZSByZWFzb24gdGhlIHJlZmVyZW5jZSBzdG9yZWQgZG9lcyBub3QgaGF2ZSB0aGUgY29ycmVjdCBwYXJlbnQgbm9kZS5cbiAgICAgICAgLy93ZSBkbyB0aGlzIHRvIGdldCBhICdsaXZlJyB2ZXJzaW9uIG9mIHRoZSBub2RlLlxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcy5sZW5ndGg7IGkrKylcbiAgICAgICAgICAgIGlmIChjaGlsZHNbaV0gPT09IHRoaXMudHJlZSkge1xuICAgICAgICAgICAgICAgIHJlYWxGaXJzdENoaWxkID0gY2hpbGRzW2ldO1xuICAgICAgICAgICAgICAgIHJlYWxGaXJzdENoaWxkSW5kZXggPSBpO1xuICAgICAgICAgICAgfVxuICAgICAgICBwYXJlbnQucmVwbGFjZUNoaWxkKHRoaXMucmVuZGVyKCksIHJlYWxGaXJzdENoaWxkKTtcbiAgICB9O1xuICAgIE1haW4ucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5pZHMgPSB7fTtcbiAgICAgICAgdGhpcy53aWRnZXRzLmZvckVhY2goZnVuY3Rpb24gKHcpIHsgcmV0dXJuIHcucmVtb3ZlZCgpOyB9KTtcbiAgICAgICAgdGhpcy53aWRnZXRzID0gW107XG4gICAgICAgIHRoaXMudHJlZSA9IHRoaXMudGVtcGxhdGUuY2FsbCh0aGlzLmNvbnRleHQpO1xuICAgICAgICB0aGlzLmlkc1sncm9vdCddID0gKHRoaXMuaWRzWydyb290J10pID8gdGhpcy5pZHNbJ3Jvb3QnXSA6IHRoaXMudHJlZTtcbiAgICAgICAgdGhpcy53aWRnZXRzLmZvckVhY2goZnVuY3Rpb24gKHcpIHsgcmV0dXJuIHcucmVuZGVyZWQoKTsgfSk7XG4gICAgICAgIHJldHVybiB0aGlzLnRyZWU7XG4gICAgfTtcbiAgICByZXR1cm4gTWFpbjtcbn0oKSk7XG5leHBvcnRzLk1haW4gPSBNYWluO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWVudV9idXR0b24uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBydW50aW1lXzEgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC9saWIvcnVudGltZVwiKTtcbnZhciB2aWV3cyA9IHJlcXVpcmUoXCIuL3dtbC9tb2RhbFwiKTtcbi8qKlxuICogTW9kYWxcbiAqL1xudmFyIE1vZGFsID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoTW9kYWwsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gTW9kYWwoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IHZpZXdzLk5vdGhpbmcoX3RoaXMpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBNb2RhbDtcbn0ocnVudGltZV8xLkFic3RyYWN0V2lkZ2V0KSk7XG5leHBvcnRzLk1vZGFsID0gTW9kYWw7XG4vKipcbiAqIEhlYWRlclxuICovXG52YXIgSGVhZGVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoSGVhZGVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEhlYWRlcigpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnZpZXcgPSBuZXcgdmlld3MuSGVhZGVyKF90aGlzKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gSGVhZGVyO1xufShydW50aW1lXzEuQWJzdHJhY3RXaWRnZXQpKTtcbmV4cG9ydHMuSGVhZGVyID0gSGVhZGVyO1xuLyoqXG4gKiBCb2R5XG4gKi9cbnZhciBCb2R5ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQm9keSwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBCb2R5KCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMudmlldyA9IG5ldyB2aWV3cy5Cb2R5KF90aGlzKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gQm9keTtcbn0ocnVudGltZV8xLkFic3RyYWN0V2lkZ2V0KSk7XG5leHBvcnRzLkJvZHkgPSBCb2R5O1xuLyoqXG4gKiBGb290ZXJcbiAqL1xudmFyIEZvb3RlciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEZvb3RlciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBGb290ZXIoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IHZpZXdzLkZvb3RlcihfdGhpcyk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIEZvb3Rlcjtcbn0ocnVudGltZV8xLkFic3RyYWN0V2lkZ2V0KSk7XG5leHBvcnRzLkZvb3RlciA9IEZvb3Rlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPU1vZGFsLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIFN0eWxlcyA9IHJlcXVpcmUoXCJ3bWwtd2lkZ2V0cy1jb21tb24vU3R5bGVzXCIpO1xuZnVuY3Rpb24gJCRib3VuZGFyeV90b19kb3QodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUuc3BsaXQoJ11bJykuam9pbignLicpLnNwbGl0KCdbJykuam9pbignLicpO1xufVxuZnVuY3Rpb24gJCRzdHJpcF9icmFjZXModmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUuc3BsaXQoJ1snKS5qb2luKCcuJykuc3BsaXQoJ10nKS5qb2luKCcnKTtcbn1cbmZ1bmN0aW9uICQkZXNjYXBlX2RvdHModmFsdWUpIHtcbiAgICB2YWx1ZSA9IHZhbHVlLnNwbGl0KCdcXCcnKTtcbiAgICByZXR1cm4gKHZhbHVlLmxlbmd0aCA8IDMpID8gdmFsdWUuam9pbignXFwnJykgOiB2YWx1ZS5tYXAoZnVuY3Rpb24gKHNlZykge1xuICAgICAgICBpZiAoc2VnLmxlbmd0aCA8IDMpXG4gICAgICAgICAgICByZXR1cm4gc2VnO1xuICAgICAgICBpZiAoKHNlZ1swXSA9PT0gJy4nKSB8fCAoc2VnW3NlZy5sZW5ndGggLSAxXSA9PT0gJy4nKSlcbiAgICAgICAgICAgIHJldHVybiBzZWc7XG4gICAgICAgIHJldHVybiBzZWcuc3BsaXQoJy4nKS5qb2luKCcmJicpO1xuICAgIH0pLmpvaW4oJycpO1xufVxuZnVuY3Rpb24gJCR1bmVzY2FwZV9kb3RzKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlLnNwbGl0KCcmJicpLmpvaW4oJy4nKTtcbn1cbmZ1bmN0aW9uICQkcGFydGlmeSh2YWx1ZSkge1xuICAgIGlmICghdmFsdWUpXG4gICAgICAgIHJldHVybjtcbiAgICByZXR1cm4gJCRlc2NhcGVfZG90cygkJHN0cmlwX2JyYWNlcygkJGJvdW5kYXJ5X3RvX2RvdCgnJyArIHZhbHVlKSkpLnNwbGl0KCcuJyk7XG59XG5mdW5jdGlvbiAkJHByb3BlcnR5KHBhdGgsIG8pIHtcbiAgICB2YXIgcGFydHMgPSAkJHBhcnRpZnkocGF0aCk7XG4gICAgdmFyIGZpcnN0O1xuICAgIGlmICh0eXBlb2YgbyAhPT0gJ29iamVjdCcpXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2dldCgpOiBleHBlY3RzIGFuIG9iamVjdCBnb3QgJyArIHR5cGVvZiBvKTtcbiAgICBpZiAocGFydHMubGVuZ3RoID09PSAxKVxuICAgICAgICByZXR1cm4gb1skJHVuZXNjYXBlX2RvdHMocGFydHNbMF0pXTtcbiAgICBpZiAocGFydHMubGVuZ3RoID09PSAwKVxuICAgICAgICByZXR1cm47XG4gICAgZmlyc3QgPSBvW3BhcnRzLnNoaWZ0KCldO1xuICAgIHJldHVybiAoKHR5cGVvZiBvID09PSAnb2JqZWN0JykgJiYgKG8gIT09IG51bGwpKSA/XG4gICAgICAgIHBhcnRzLnJlZHVjZShmdW5jdGlvbiAodGFyZ2V0LCBwcm9wKSB7XG4gICAgICAgICAgICBpZiAodGFyZ2V0ID09IG51bGwpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICAgICAgICAgIHJldHVybiB0YXJnZXRbJCR1bmVzY2FwZV9kb3RzKHByb3ApXTtcbiAgICAgICAgfSwgZmlyc3QpIDogbnVsbDtcbn1cbmZ1bmN0aW9uICQkYWRvcHQoY2hpbGQsIGUpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShjaGlsZCkpXG4gICAgICAgIHJldHVybiBjaGlsZC5mb3JFYWNoKGZ1bmN0aW9uIChpbm5lckNoaWxkKSB7IHJldHVybiAkJGFkb3B0KGlubmVyQ2hpbGQsIGUpOyB9KTtcbiAgICBpZiAoY2hpbGQpXG4gICAgICAgIGUuYXBwZW5kQ2hpbGQoKHR5cGVvZiBjaGlsZCA9PT0gJ29iamVjdCcpID9cbiAgICAgICAgICAgIGNoaWxkIDogZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY2hpbGQgPT0gbnVsbCA/ICcnIDogY2hpbGQpKTtcbn1cbi8qKlxuICogJCR0ZXh0IGNyZWF0ZXMgYSBET01UZXh0Tm9kZVxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gKi9cbmZ1bmN0aW9uICQkdGV4dCh2YWx1ZSkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh2YWx1ZSA9PSBudWxsID8gJycgOiB2YWx1ZSk7XG59XG4vKipcbiAqICQkcmVzb2x2ZSBwcm9wZXJ0eSBhY2Nlc3MgZXhwcmVzc2lvbiB0byBhdm9pZFxuICogdGhvd2luZyBlcnJvcnMgaWYgaXQgZG9lcyBub3QgZXhpc3QuXG4gKiBAcGFyYW0ge29iamVjdH0gaGVhZFxuICogQHBhcmFtIHtzdHJpbmd9IHBhdGhcbiAqL1xuZnVuY3Rpb24gJCRyZXNvbHZlKGhlYWQsIHBhdGgpIHtcbiAgICB2YXIgcmV0ID0gJCRwcm9wZXJ0eShwYXRoLCBoZWFkKTtcbiAgICByZXR1cm4gKHJldCA9PSBudWxsKSA/ICcnIDogcmV0O1xufVxuLyoqXG4gKiAkJG5vZGUgaXMgY2FsbGVkIHRvIGNyZWF0ZSBhIHJlZ3VsYXIgRE9NIG5vZGVcbiAqIEBwYXJhbSB7c3RyaW5nfSB0YWdcbiAqIEBwYXJhbSB7b2JqZWN0fSBhdHRyaWJ1dGVzXG4gKiBAcGFyYW0ge2FycmF5PHN0cmluZ3xudW1iZXJ8V2lkZ2V0Pn0gY2hpbGRyZW5cbiAqIEBwYXJhbSB7Vmlld30gdmlld1xuICovXG5mdW5jdGlvbiAkJG5vZGUodGFnLCBhdHRyaWJ1dGVzLCBjaGlsZHJlbiwgdmlldykge1xuICAgIHZhciBlID0gKHRhZyA9PT0gJ2ZyYWdtZW50JykgPyBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCkgOiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XG4gICAgaWYgKHR5cGVvZiBhdHRyaWJ1dGVzLmh0bWwgPT09ICdvYmplY3QnKVxuICAgICAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzLmh0bWwpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBhdHRyaWJ1dGVzLmh0bWxba2V5XSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIGVba2V5XSA9IGF0dHJpYnV0ZXMuaHRtbFtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZS5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyaWJ1dGVzLmh0bWxba2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIGNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKGMpIHsgcmV0dXJuICQkYWRvcHQoYywgZSk7IH0pO1xuICAgIGlmIChhdHRyaWJ1dGVzLndtbClcbiAgICAgICAgaWYgKGF0dHJpYnV0ZXMud21sLmlkKVxuICAgICAgICAgICAgdmlldy5yZWdpc3RlcihhdHRyaWJ1dGVzLndtbC5pZCwgZSk7XG4gICAgcmV0dXJuIGU7XG59XG4vKipcbiAqIEF0dHJpYnV0ZXMgcHJvdmlkZXMgYW4gQVBJIGZvciByZWFkaW5nIHRoZVxuICogYXR0cmlidXRlcyBzdXBwbGllZCB0byBhbiBFbGVtZW50LlxuICogQHBhcmFtIHtvYmplY3R9IGF0dHJzXG4gKi9cbnZhciBBdHRyaWJ1dGVzID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBBdHRyaWJ1dGVzKF9hdHRycykge1xuICAgICAgICB0aGlzLl9hdHRycyA9IF9hdHRycztcbiAgICAgICAgdGhpcy5fYXR0cnMgPSBfYXR0cnM7XG4gICAgfVxuICAgIEF0dHJpYnV0ZXMucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uIChwYXRoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlYWQocGF0aCkgIT0gbnVsbDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIHJlYWQgYSB2YWx1ZSBmb3JtIHRoZSBpbnRlcm5hbCBsaXN0LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoXG4gICAgICogQHBhcmFtIHsqfSBkZWZhdWx0VmFsdWUgLSBUaGlzIHZhbHVlIGlzIHJldHVybmVkIGlmIHRoZSB2YWx1ZSBpcyBub3Qgc2V0LlxuICAgICAqL1xuICAgIEF0dHJpYnV0ZXMucHJvdG90eXBlLnJlYWQgPSBmdW5jdGlvbiAocGF0aCwgZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgIHZhciByZXQgPSAkJHByb3BlcnR5KHBhdGguc3BsaXQoJzonKS5qb2luKCcuJyksIHRoaXMuX2F0dHJzKTtcbiAgICAgICAgcmV0dXJuIChyZXQgIT0gbnVsbCkgPyByZXQgOiAoZGVmYXVsdFZhbHVlICE9IG51bGwpID8gZGVmYXVsdFZhbHVlIDogJyc7XG4gICAgfTtcbiAgICByZXR1cm4gQXR0cmlidXRlcztcbn0oKSk7XG4vKipcbiAqICQkd2lkZ2V0IGNyZWF0ZXMgYSB3bWwgd2lkZ2V0LlxuICogQHBhcmFtIHtmdW5jdGlvbn0gQ29uc3RydXRvclxuICogQHBhcmFtIHtvYmplY3R9IGF0dHJpYnV0ZXNcbiAqIEBwYXJhbSB7YXJyYXk8c3RyaW5nfG51bWJlcnxXaWRnZXQ+fSBjaGlsZHJlblxuICogQHBhcmFtIHtWaWV3fSB2aWV3XG4gKiBAcmV0dXJuIHtXaWRnZXR9XG4gKi9cbmZ1bmN0aW9uICQkd2lkZ2V0KENvbnN0cnVjdG9yLCBhdHRyaWJ1dGVzLCBjaGlsZHJlbiwgdmlldykge1xuICAgIHZhciBjaGlsZHMgPSBbXTtcbiAgICB2YXIgdztcbiAgICBjaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChjaGlsZCkgeyByZXR1cm4gQXJyYXkuaXNBcnJheShjaGlsZCkgP1xuICAgICAgICBjaGlsZHMucHVzaC5hcHBseShjaGlsZHMsIGNoaWxkKSA6IGNoaWxkcy5wdXNoKGNoaWxkKTsgfSk7XG4gICAgdyA9IG5ldyBDb25zdHJ1Y3RvcihuZXcgQXR0cmlidXRlcyhhdHRyaWJ1dGVzKSwgY2hpbGRzKTtcbiAgICBpZiAoYXR0cmlidXRlcy53bWwpXG4gICAgICAgIGlmIChhdHRyaWJ1dGVzLndtbC5pZClcbiAgICAgICAgICAgIHZpZXcucmVnaXN0ZXIoYXR0cmlidXRlcy53bWwuaWQsIHcpO1xuICAgIHZpZXcud2lkZ2V0cy5wdXNoKHcpO1xuICAgIHJldHVybiB3LnJlbmRlcigpO1xufVxuLyoqXG4gKiAkJGlmIGlzIGNhbGxlZCB0byBjcmVhdGUgYW4gaWYgY29uZGl0aW9uYWwgY29uc3RydWN0XG4gKiBAcGFyYW0geyp9IHByZWRpY2F0ZVxuICogQHBhcmFtIHtmdW5jdGlvbn0gcG9zaXRpdmVcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IG5lZ2F0aXZlXG4gKi9cbmZ1bmN0aW9uICQkaWYocHJlZGljYXRlLCBwb3NpdGl2ZSwgbmVnYXRpdmUpIHtcbiAgICByZXR1cm4gKHByZWRpY2F0ZSkgPyBwb3NpdGl2ZSgpIDogbmVnYXRpdmUoKTtcbn1cbi8qKlxuICogJCRmb3IgaXMgY2FsbGVkIHRvIGNyZWF0ZSBhIGZvciBsb29wIGNvbnN0cnVjdFxuICogQHBhcmFtIHtJdGVyYWJsZX0gY29sbGVjdGlvblxuICogQHBhcmFtIHtmdW5jdGlvbn0gY2JcbiAqL1xuZnVuY3Rpb24gJCRmb3IoY29sbGVjdGlvbiwgY2IpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShjb2xsZWN0aW9uKSkge1xuICAgICAgICByZXR1cm4gY29sbGVjdGlvbi5tYXAoY2IpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgY29sbGVjdGlvbiA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGNvbGxlY3Rpb24pLm1hcChmdW5jdGlvbiAoa2V5LCBfLCBhbGwpIHsgcmV0dXJuIGNiKGNvbGxlY3Rpb25ba2V5XSwga2V5LCBhbGwpOyB9KTtcbiAgICB9XG4gICAgcmV0dXJuIFtdO1xufVxuLyoqXG4gKiAkJHN3aXRjaCBzaW11bGF0ZXMgYSBzd2l0Y2ggc3RhdGVtZW50XG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ8Ym9vbGVhbn0gdmFsdWVcbiAqIEBwYXJhbSB7b2JqZWN0fSBjYXNlc1xuICovXG5mdW5jdGlvbiAkJHN3aXRjaCh2YWx1ZSwgY2FzZXMpIHtcbiAgICB2YXIgcmVzdWx0ID0gY2FzZXNbdmFsdWVdO1xuICAgIHZhciBkZWZhdWwgPSBjYXNlcy5kZWZhdWx0O1xuICAgIGlmIChyZXN1bHQpXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgaWYgKGRlZmF1bClcbiAgICAgICAgcmV0dXJuIGRlZmF1bDtcbn1cbnZhciBNb2RhbCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTW9kYWwoY29udGV4dCkge1xuICAgICAgICB2YXIgdmlldyA9IHRoaXM7XG4gICAgICAgIHRoaXMuaWRzID0ge307XG4gICAgICAgIHRoaXMud2lkZ2V0cyA9IFtdO1xuICAgICAgICB0aGlzLnRyZWUgPSBudWxsO1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuICQkbm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6ICQkcmVzb2x2ZShTdHlsZXMsICdNT0RBTCcpLCAndGFiaW5kZXgnOiBcIi0xXCIsICdyb2xlJzogXCJkaWFsb2dcIiB9IH0sIFskJG5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiAkJHJlc29sdmUoU3R5bGVzLCAnTU9EQUxfRElBTE9HJyksICdyb2xlJzogXCJkb2N1bWVudFwiIH0gfSwgWyQkbm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6ICQkcmVzb2x2ZShTdHlsZXMsICdNT0RBTF9DT05URU5UJykgfSwgd21sOiB7ICdpZCc6IFwiY29udGVudFwiIH0gfSwgWyQkcmVzb2x2ZSh0aGlzLCAnY2hpbGRyZW4nKV0sIHZpZXcpXSwgdmlldyldLCB2aWV3KTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgTW9kYWwucmVuZGVyID0gZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICAgICAgcmV0dXJuIChuZXcgTW9kYWwoY29udGV4dCkpLnJlbmRlcigpO1xuICAgIH07XG4gICAgTW9kYWwucHJvdG90eXBlLnJlZ2lzdGVyID0gZnVuY3Rpb24gKGlkLCB3KSB7XG4gICAgICAgIGlmICh0aGlzLmlkcy5oYXNPd25Qcm9wZXJ0eShpZCkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0R1cGxpY2F0ZSBpZCBcXCcnICsgaWQgKyAnXFwnIGRldGVjdGVkIScpO1xuICAgICAgICB0aGlzLmlkc1tpZF0gPSB3O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIE1vZGFsLnByb3RvdHlwZS5maW5kQnlJZCA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICByZXR1cm4gKHRoaXMuaWRzW2lkXSkgPyB0aGlzLmlkc1tpZF0gOiBudWxsO1xuICAgIH07XG4gICAgTW9kYWwucHJvdG90eXBlLmludmFsaWRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjaGlsZHM7XG4gICAgICAgIHZhciBwYXJlbnQgPSB0aGlzLnRyZWUucGFyZW50Tm9kZTtcbiAgICAgICAgdmFyIHJlYWxGaXJzdENoaWxkO1xuICAgICAgICB2YXIgcmVhbEZpcnN0Q2hpbGRJbmRleDtcbiAgICAgICAgaWYgKHRoaXMudHJlZSA9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKCdDYW5ub3QgaW52YWxpZGF0ZSBhIHZpZXcgdGhhdCBoYXMgbm90IGJlZW4gcmVuZGVyZWQhJyk7XG4gICAgICAgIGlmICh0aGlzLnRyZWUucGFyZW50Tm9kZSA9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKCdBdHRlbXB0IHRvIGludmFsaWRhdGUgYSB2aWV3IHRoYXQgaGFzIG5vdCBiZWVuIGluc2VydGVkIHRvIERPTSEnKTtcbiAgICAgICAgY2hpbGRzID0gdGhpcy50cmVlLnBhcmVudE5vZGUuY2hpbGRyZW47XG4gICAgICAgIC8vZm9yIHNvbWUgcmVhc29uIHRoZSByZWZlcmVuY2Ugc3RvcmVkIGRvZXMgbm90IGhhdmUgdGhlIGNvcnJlY3QgcGFyZW50IG5vZGUuXG4gICAgICAgIC8vd2UgZG8gdGhpcyB0byBnZXQgYSAnbGl2ZScgdmVyc2lvbiBvZiB0aGUgbm9kZS5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHMubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICBpZiAoY2hpbGRzW2ldID09PSB0aGlzLnRyZWUpIHtcbiAgICAgICAgICAgICAgICByZWFsRmlyc3RDaGlsZCA9IGNoaWxkc1tpXTtcbiAgICAgICAgICAgICAgICByZWFsRmlyc3RDaGlsZEluZGV4ID0gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgcGFyZW50LnJlcGxhY2VDaGlsZCh0aGlzLnJlbmRlcigpLCByZWFsRmlyc3RDaGlsZCk7XG4gICAgfTtcbiAgICBNb2RhbC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmlkcyA9IHt9O1xuICAgICAgICB0aGlzLndpZGdldHMuZm9yRWFjaChmdW5jdGlvbiAodykgeyByZXR1cm4gdy5yZW1vdmVkKCk7IH0pO1xuICAgICAgICB0aGlzLndpZGdldHMgPSBbXTtcbiAgICAgICAgdGhpcy50cmVlID0gdGhpcy50ZW1wbGF0ZS5jYWxsKHRoaXMuY29udGV4dCk7XG4gICAgICAgIHRoaXMuaWRzWydyb290J10gPSAodGhpcy5pZHNbJ3Jvb3QnXSkgPyB0aGlzLmlkc1sncm9vdCddIDogdGhpcy50cmVlO1xuICAgICAgICB0aGlzLndpZGdldHMuZm9yRWFjaChmdW5jdGlvbiAodykgeyByZXR1cm4gdy5yZW5kZXJlZCgpOyB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJlZTtcbiAgICB9O1xuICAgIHJldHVybiBNb2RhbDtcbn0oKSk7XG5leHBvcnRzLk1vZGFsID0gTW9kYWw7XG52YXIgSGVhZGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBIZWFkZXIoY29udGV4dCkge1xuICAgICAgICB2YXIgdmlldyA9IHRoaXM7XG4gICAgICAgIHRoaXMuaWRzID0ge307XG4gICAgICAgIHRoaXMud2lkZ2V0cyA9IFtdO1xuICAgICAgICB0aGlzLnRyZWUgPSBudWxsO1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuICQkbm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6ICQkcmVzb2x2ZShTdHlsZXMsICdNT0RBTF9IRUFERVInKSB9IH0sIFskJG5vZGUoJ2J1dHRvbicsIHsgaHRtbDogeyAndHlwZSc6IFwiYnV0dG9uXCIsICdjbGFzcyc6IFwiY2xvc2VcIiwgJ2FyaWEtbGFiZWwnOiBcIkNsb3NlXCIgfSB9LCBbJCRub2RlKCdzcGFuJywgeyBodG1sOiB7ICdhcmlhLWhpZGRlbic6IFwidHJ1ZVwiIH0gfSwgWyQkdGV4dChcIlxcdTAwRDdcIildLCB2aWV3KV0sIHZpZXcpLCAkJHJlc29sdmUodGhpcywgJ2NoaWxkcmVuJyldLCB2aWV3KTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgSGVhZGVyLnJlbmRlciA9IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgICAgIHJldHVybiAobmV3IEhlYWRlcihjb250ZXh0KSkucmVuZGVyKCk7XG4gICAgfTtcbiAgICBIZWFkZXIucHJvdG90eXBlLnJlZ2lzdGVyID0gZnVuY3Rpb24gKGlkLCB3KSB7XG4gICAgICAgIGlmICh0aGlzLmlkcy5oYXNPd25Qcm9wZXJ0eShpZCkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0R1cGxpY2F0ZSBpZCBcXCcnICsgaWQgKyAnXFwnIGRldGVjdGVkIScpO1xuICAgICAgICB0aGlzLmlkc1tpZF0gPSB3O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIEhlYWRlci5wcm90b3R5cGUuZmluZEJ5SWQgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmlkc1tpZF0pID8gdGhpcy5pZHNbaWRdIDogbnVsbDtcbiAgICB9O1xuICAgIEhlYWRlci5wcm90b3R5cGUuaW52YWxpZGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNoaWxkcztcbiAgICAgICAgdmFyIHBhcmVudCA9IHRoaXMudHJlZS5wYXJlbnROb2RlO1xuICAgICAgICB2YXIgcmVhbEZpcnN0Q2hpbGQ7XG4gICAgICAgIHZhciByZWFsRmlyc3RDaGlsZEluZGV4O1xuICAgICAgICBpZiAodGhpcy50cmVlID09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoJ0Nhbm5vdCBpbnZhbGlkYXRlIGEgdmlldyB0aGF0IGhhcyBub3QgYmVlbiByZW5kZXJlZCEnKTtcbiAgICAgICAgaWYgKHRoaXMudHJlZS5wYXJlbnROb2RlID09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoJ0F0dGVtcHQgdG8gaW52YWxpZGF0ZSBhIHZpZXcgdGhhdCBoYXMgbm90IGJlZW4gaW5zZXJ0ZWQgdG8gRE9NIScpO1xuICAgICAgICBjaGlsZHMgPSB0aGlzLnRyZWUucGFyZW50Tm9kZS5jaGlsZHJlbjtcbiAgICAgICAgLy9mb3Igc29tZSByZWFzb24gdGhlIHJlZmVyZW5jZSBzdG9yZWQgZG9lcyBub3QgaGF2ZSB0aGUgY29ycmVjdCBwYXJlbnQgbm9kZS5cbiAgICAgICAgLy93ZSBkbyB0aGlzIHRvIGdldCBhICdsaXZlJyB2ZXJzaW9uIG9mIHRoZSBub2RlLlxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcy5sZW5ndGg7IGkrKylcbiAgICAgICAgICAgIGlmIChjaGlsZHNbaV0gPT09IHRoaXMudHJlZSkge1xuICAgICAgICAgICAgICAgIHJlYWxGaXJzdENoaWxkID0gY2hpbGRzW2ldO1xuICAgICAgICAgICAgICAgIHJlYWxGaXJzdENoaWxkSW5kZXggPSBpO1xuICAgICAgICAgICAgfVxuICAgICAgICBwYXJlbnQucmVwbGFjZUNoaWxkKHRoaXMucmVuZGVyKCksIHJlYWxGaXJzdENoaWxkKTtcbiAgICB9O1xuICAgIEhlYWRlci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmlkcyA9IHt9O1xuICAgICAgICB0aGlzLndpZGdldHMuZm9yRWFjaChmdW5jdGlvbiAodykgeyByZXR1cm4gdy5yZW1vdmVkKCk7IH0pO1xuICAgICAgICB0aGlzLndpZGdldHMgPSBbXTtcbiAgICAgICAgdGhpcy50cmVlID0gdGhpcy50ZW1wbGF0ZS5jYWxsKHRoaXMuY29udGV4dCk7XG4gICAgICAgIHRoaXMuaWRzWydyb290J10gPSAodGhpcy5pZHNbJ3Jvb3QnXSkgPyB0aGlzLmlkc1sncm9vdCddIDogdGhpcy50cmVlO1xuICAgICAgICB0aGlzLndpZGdldHMuZm9yRWFjaChmdW5jdGlvbiAodykgeyByZXR1cm4gdy5yZW5kZXJlZCgpOyB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJlZTtcbiAgICB9O1xuICAgIHJldHVybiBIZWFkZXI7XG59KCkpO1xuZXhwb3J0cy5IZWFkZXIgPSBIZWFkZXI7XG52YXIgQm9keSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQm9keShjb250ZXh0KSB7XG4gICAgICAgIHZhciB2aWV3ID0gdGhpcztcbiAgICAgICAgdGhpcy5pZHMgPSB7fTtcbiAgICAgICAgdGhpcy53aWRnZXRzID0gW107XG4gICAgICAgIHRoaXMudHJlZSA9IG51bGw7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gJCRub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogJCRyZXNvbHZlKFN0eWxlcywgJ01PREFMX0JPRFknKSB9IH0sIFskJHJlc29sdmUodGhpcywgJ2NoaWxkcmVuJyldLCB2aWV3KTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgQm9keS5yZW5kZXIgPSBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgICAgICByZXR1cm4gKG5ldyBCb2R5KGNvbnRleHQpKS5yZW5kZXIoKTtcbiAgICB9O1xuICAgIEJvZHkucHJvdG90eXBlLnJlZ2lzdGVyID0gZnVuY3Rpb24gKGlkLCB3KSB7XG4gICAgICAgIGlmICh0aGlzLmlkcy5oYXNPd25Qcm9wZXJ0eShpZCkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0R1cGxpY2F0ZSBpZCBcXCcnICsgaWQgKyAnXFwnIGRldGVjdGVkIScpO1xuICAgICAgICB0aGlzLmlkc1tpZF0gPSB3O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIEJvZHkucHJvdG90eXBlLmZpbmRCeUlkID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5pZHNbaWRdKSA/IHRoaXMuaWRzW2lkXSA6IG51bGw7XG4gICAgfTtcbiAgICBCb2R5LnByb3RvdHlwZS5pbnZhbGlkYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY2hpbGRzO1xuICAgICAgICB2YXIgcGFyZW50ID0gdGhpcy50cmVlLnBhcmVudE5vZGU7XG4gICAgICAgIHZhciByZWFsRmlyc3RDaGlsZDtcbiAgICAgICAgdmFyIHJlYWxGaXJzdENoaWxkSW5kZXg7XG4gICAgICAgIGlmICh0aGlzLnRyZWUgPT0gbnVsbClcbiAgICAgICAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcignQ2Fubm90IGludmFsaWRhdGUgYSB2aWV3IHRoYXQgaGFzIG5vdCBiZWVuIHJlbmRlcmVkIScpO1xuICAgICAgICBpZiAodGhpcy50cmVlLnBhcmVudE5vZGUgPT0gbnVsbClcbiAgICAgICAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcignQXR0ZW1wdCB0byBpbnZhbGlkYXRlIGEgdmlldyB0aGF0IGhhcyBub3QgYmVlbiBpbnNlcnRlZCB0byBET00hJyk7XG4gICAgICAgIGNoaWxkcyA9IHRoaXMudHJlZS5wYXJlbnROb2RlLmNoaWxkcmVuO1xuICAgICAgICAvL2ZvciBzb21lIHJlYXNvbiB0aGUgcmVmZXJlbmNlIHN0b3JlZCBkb2VzIG5vdCBoYXZlIHRoZSBjb3JyZWN0IHBhcmVudCBub2RlLlxuICAgICAgICAvL3dlIGRvIHRoaXMgdG8gZ2V0IGEgJ2xpdmUnIHZlcnNpb24gb2YgdGhlIG5vZGUuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRzLmxlbmd0aDsgaSsrKVxuICAgICAgICAgICAgaWYgKGNoaWxkc1tpXSA9PT0gdGhpcy50cmVlKSB7XG4gICAgICAgICAgICAgICAgcmVhbEZpcnN0Q2hpbGQgPSBjaGlsZHNbaV07XG4gICAgICAgICAgICAgICAgcmVhbEZpcnN0Q2hpbGRJbmRleCA9IGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIHBhcmVudC5yZXBsYWNlQ2hpbGQodGhpcy5yZW5kZXIoKSwgcmVhbEZpcnN0Q2hpbGQpO1xuICAgIH07XG4gICAgQm9keS5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmlkcyA9IHt9O1xuICAgICAgICB0aGlzLndpZGdldHMuZm9yRWFjaChmdW5jdGlvbiAodykgeyByZXR1cm4gdy5yZW1vdmVkKCk7IH0pO1xuICAgICAgICB0aGlzLndpZGdldHMgPSBbXTtcbiAgICAgICAgdGhpcy50cmVlID0gdGhpcy50ZW1wbGF0ZS5jYWxsKHRoaXMuY29udGV4dCk7XG4gICAgICAgIHRoaXMuaWRzWydyb290J10gPSAodGhpcy5pZHNbJ3Jvb3QnXSkgPyB0aGlzLmlkc1sncm9vdCddIDogdGhpcy50cmVlO1xuICAgICAgICB0aGlzLndpZGdldHMuZm9yRWFjaChmdW5jdGlvbiAodykgeyByZXR1cm4gdy5yZW5kZXJlZCgpOyB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJlZTtcbiAgICB9O1xuICAgIHJldHVybiBCb2R5O1xufSgpKTtcbmV4cG9ydHMuQm9keSA9IEJvZHk7XG52YXIgRm9vdGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBGb290ZXIoY29udGV4dCkge1xuICAgICAgICB2YXIgdmlldyA9IHRoaXM7XG4gICAgICAgIHRoaXMuaWRzID0ge307XG4gICAgICAgIHRoaXMud2lkZ2V0cyA9IFtdO1xuICAgICAgICB0aGlzLnRyZWUgPSBudWxsO1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuICQkbm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6ICQkcmVzb2x2ZShTdHlsZXMsICdNT0RBTF9GT09URVInKSB9IH0sIFskJHJlc29sdmUodGhpcywgJ2NoaWxkcmVuJyldLCB2aWV3KTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgRm9vdGVyLnJlbmRlciA9IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgICAgIHJldHVybiAobmV3IEZvb3Rlcihjb250ZXh0KSkucmVuZGVyKCk7XG4gICAgfTtcbiAgICBGb290ZXIucHJvdG90eXBlLnJlZ2lzdGVyID0gZnVuY3Rpb24gKGlkLCB3KSB7XG4gICAgICAgIGlmICh0aGlzLmlkcy5oYXNPd25Qcm9wZXJ0eShpZCkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0R1cGxpY2F0ZSBpZCBcXCcnICsgaWQgKyAnXFwnIGRldGVjdGVkIScpO1xuICAgICAgICB0aGlzLmlkc1tpZF0gPSB3O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIEZvb3Rlci5wcm90b3R5cGUuZmluZEJ5SWQgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmlkc1tpZF0pID8gdGhpcy5pZHNbaWRdIDogbnVsbDtcbiAgICB9O1xuICAgIEZvb3Rlci5wcm90b3R5cGUuaW52YWxpZGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNoaWxkcztcbiAgICAgICAgdmFyIHBhcmVudCA9IHRoaXMudHJlZS5wYXJlbnROb2RlO1xuICAgICAgICB2YXIgcmVhbEZpcnN0Q2hpbGQ7XG4gICAgICAgIHZhciByZWFsRmlyc3RDaGlsZEluZGV4O1xuICAgICAgICBpZiAodGhpcy50cmVlID09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoJ0Nhbm5vdCBpbnZhbGlkYXRlIGEgdmlldyB0aGF0IGhhcyBub3QgYmVlbiByZW5kZXJlZCEnKTtcbiAgICAgICAgaWYgKHRoaXMudHJlZS5wYXJlbnROb2RlID09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoJ0F0dGVtcHQgdG8gaW52YWxpZGF0ZSBhIHZpZXcgdGhhdCBoYXMgbm90IGJlZW4gaW5zZXJ0ZWQgdG8gRE9NIScpO1xuICAgICAgICBjaGlsZHMgPSB0aGlzLnRyZWUucGFyZW50Tm9kZS5jaGlsZHJlbjtcbiAgICAgICAgLy9mb3Igc29tZSByZWFzb24gdGhlIHJlZmVyZW5jZSBzdG9yZWQgZG9lcyBub3QgaGF2ZSB0aGUgY29ycmVjdCBwYXJlbnQgbm9kZS5cbiAgICAgICAgLy93ZSBkbyB0aGlzIHRvIGdldCBhICdsaXZlJyB2ZXJzaW9uIG9mIHRoZSBub2RlLlxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcy5sZW5ndGg7IGkrKylcbiAgICAgICAgICAgIGlmIChjaGlsZHNbaV0gPT09IHRoaXMudHJlZSkge1xuICAgICAgICAgICAgICAgIHJlYWxGaXJzdENoaWxkID0gY2hpbGRzW2ldO1xuICAgICAgICAgICAgICAgIHJlYWxGaXJzdENoaWxkSW5kZXggPSBpO1xuICAgICAgICAgICAgfVxuICAgICAgICBwYXJlbnQucmVwbGFjZUNoaWxkKHRoaXMucmVuZGVyKCksIHJlYWxGaXJzdENoaWxkKTtcbiAgICB9O1xuICAgIEZvb3Rlci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmlkcyA9IHt9O1xuICAgICAgICB0aGlzLndpZGdldHMuZm9yRWFjaChmdW5jdGlvbiAodykgeyByZXR1cm4gdy5yZW1vdmVkKCk7IH0pO1xuICAgICAgICB0aGlzLndpZGdldHMgPSBbXTtcbiAgICAgICAgdGhpcy50cmVlID0gdGhpcy50ZW1wbGF0ZS5jYWxsKHRoaXMuY29udGV4dCk7XG4gICAgICAgIHRoaXMuaWRzWydyb290J10gPSAodGhpcy5pZHNbJ3Jvb3QnXSkgPyB0aGlzLmlkc1sncm9vdCddIDogdGhpcy50cmVlO1xuICAgICAgICB0aGlzLndpZGdldHMuZm9yRWFjaChmdW5jdGlvbiAodykgeyByZXR1cm4gdy5yZW5kZXJlZCgpOyB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJlZTtcbiAgICB9O1xuICAgIHJldHVybiBGb290ZXI7XG59KCkpO1xuZXhwb3J0cy5Gb290ZXIgPSBGb290ZXI7XG52YXIgTm90aGluZyA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTm90aGluZyhjb250ZXh0KSB7XG4gICAgICAgIHZhciB2aWV3ID0gdGhpcztcbiAgICAgICAgdGhpcy5pZHMgPSB7fTtcbiAgICAgICAgdGhpcy53aWRnZXRzID0gW107XG4gICAgICAgIHRoaXMudHJlZSA9IG51bGw7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gJCRub2RlKCdmcmFnbWVudCcsIHsgaHRtbDoge30gfSwgW10sIHZpZXcpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBOb3RoaW5nLnJlbmRlciA9IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgICAgIHJldHVybiAobmV3IE5vdGhpbmcoY29udGV4dCkpLnJlbmRlcigpO1xuICAgIH07XG4gICAgTm90aGluZy5wcm90b3R5cGUucmVnaXN0ZXIgPSBmdW5jdGlvbiAoaWQsIHcpIHtcbiAgICAgICAgaWYgKHRoaXMuaWRzLmhhc093blByb3BlcnR5KGlkKSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRHVwbGljYXRlIGlkIFxcJycgKyBpZCArICdcXCcgZGV0ZWN0ZWQhJyk7XG4gICAgICAgIHRoaXMuaWRzW2lkXSA9IHc7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgTm90aGluZy5wcm90b3R5cGUuZmluZEJ5SWQgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmlkc1tpZF0pID8gdGhpcy5pZHNbaWRdIDogbnVsbDtcbiAgICB9O1xuICAgIE5vdGhpbmcucHJvdG90eXBlLmludmFsaWRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjaGlsZHM7XG4gICAgICAgIHZhciBwYXJlbnQgPSB0aGlzLnRyZWUucGFyZW50Tm9kZTtcbiAgICAgICAgdmFyIHJlYWxGaXJzdENoaWxkO1xuICAgICAgICB2YXIgcmVhbEZpcnN0Q2hpbGRJbmRleDtcbiAgICAgICAgaWYgKHRoaXMudHJlZSA9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKCdDYW5ub3QgaW52YWxpZGF0ZSBhIHZpZXcgdGhhdCBoYXMgbm90IGJlZW4gcmVuZGVyZWQhJyk7XG4gICAgICAgIGlmICh0aGlzLnRyZWUucGFyZW50Tm9kZSA9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKCdBdHRlbXB0IHRvIGludmFsaWRhdGUgYSB2aWV3IHRoYXQgaGFzIG5vdCBiZWVuIGluc2VydGVkIHRvIERPTSEnKTtcbiAgICAgICAgY2hpbGRzID0gdGhpcy50cmVlLnBhcmVudE5vZGUuY2hpbGRyZW47XG4gICAgICAgIC8vZm9yIHNvbWUgcmVhc29uIHRoZSByZWZlcmVuY2Ugc3RvcmVkIGRvZXMgbm90IGhhdmUgdGhlIGNvcnJlY3QgcGFyZW50IG5vZGUuXG4gICAgICAgIC8vd2UgZG8gdGhpcyB0byBnZXQgYSAnbGl2ZScgdmVyc2lvbiBvZiB0aGUgbm9kZS5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHMubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICBpZiAoY2hpbGRzW2ldID09PSB0aGlzLnRyZWUpIHtcbiAgICAgICAgICAgICAgICByZWFsRmlyc3RDaGlsZCA9IGNoaWxkc1tpXTtcbiAgICAgICAgICAgICAgICByZWFsRmlyc3RDaGlsZEluZGV4ID0gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgcGFyZW50LnJlcGxhY2VDaGlsZCh0aGlzLnJlbmRlcigpLCByZWFsRmlyc3RDaGlsZCk7XG4gICAgfTtcbiAgICBOb3RoaW5nLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuaWRzID0ge307XG4gICAgICAgIHRoaXMud2lkZ2V0cy5mb3JFYWNoKGZ1bmN0aW9uICh3KSB7IHJldHVybiB3LnJlbW92ZWQoKTsgfSk7XG4gICAgICAgIHRoaXMud2lkZ2V0cyA9IFtdO1xuICAgICAgICB0aGlzLnRyZWUgPSB0aGlzLnRlbXBsYXRlLmNhbGwodGhpcy5jb250ZXh0KTtcbiAgICAgICAgdGhpcy5pZHNbJ3Jvb3QnXSA9ICh0aGlzLmlkc1sncm9vdCddKSA/IHRoaXMuaWRzWydyb290J10gOiB0aGlzLnRyZWU7XG4gICAgICAgIHRoaXMud2lkZ2V0cy5mb3JFYWNoKGZ1bmN0aW9uICh3KSB7IHJldHVybiB3LnJlbmRlcmVkKCk7IH0pO1xuICAgICAgICByZXR1cm4gdGhpcy50cmVlO1xuICAgIH07XG4gICAgcmV0dXJuIE5vdGhpbmc7XG59KCkpO1xuZXhwb3J0cy5Ob3RoaW5nID0gTm90aGluZztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1vZGFsLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgcnVudGltZV8xID0gcmVxdWlyZShcIkBxdWVuay93bWwvbGliL3J1bnRpbWVcIik7XG52YXIgdmlld3MgPSByZXF1aXJlKFwiLi93bWwvcGFuZWxcIik7XG52YXIgUGFuZWwgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhQYW5lbCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBQYW5lbCgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnZpZXcgPSBuZXcgdmlld3MuUGFuZWwoX3RoaXMpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBQYW5lbDtcbn0ocnVudGltZV8xLkFic3RyYWN0V2lkZ2V0KSk7XG5leHBvcnRzLlBhbmVsID0gUGFuZWw7XG52YXIgSGVhZGVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoSGVhZGVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEhlYWRlcigpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnZpZXcgPSBuZXcgdmlld3MuSGVhZGVyKF90aGlzKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gSGVhZGVyO1xufShydW50aW1lXzEuQWJzdHJhY3RXaWRnZXQpKTtcbmV4cG9ydHMuSGVhZGVyID0gSGVhZGVyO1xudmFyIEJvZHkgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhCb2R5LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEJvZHkoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IHZpZXdzLkJvZHkoX3RoaXMpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBCb2R5O1xufShydW50aW1lXzEuQWJzdHJhY3RXaWRnZXQpKTtcbmV4cG9ydHMuQm9keSA9IEJvZHk7XG52YXIgRm9vdGVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoRm9vdGVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEZvb3RlcigpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnZpZXcgPSBuZXcgdmlld3MuRm9vdGVyKF90aGlzKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gRm9vdGVyO1xufShydW50aW1lXzEuQWJzdHJhY3RXaWRnZXQpKTtcbmV4cG9ydHMuRm9vdGVyID0gRm9vdGVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9UGFuZWwuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgU3R5bGVzID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi9TdHlsZXNcIik7XG52YXIgdXRpbF8xID0gcmVxdWlyZShcIndtbC13aWRnZXRzLWNvbW1vbi91dGlsXCIpO1xuZnVuY3Rpb24gJCRib3VuZGFyeV90b19kb3QodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUuc3BsaXQoJ11bJykuam9pbignLicpLnNwbGl0KCdbJykuam9pbignLicpO1xufVxuZnVuY3Rpb24gJCRzdHJpcF9icmFjZXModmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUuc3BsaXQoJ1snKS5qb2luKCcuJykuc3BsaXQoJ10nKS5qb2luKCcnKTtcbn1cbmZ1bmN0aW9uICQkZXNjYXBlX2RvdHModmFsdWUpIHtcbiAgICB2YWx1ZSA9IHZhbHVlLnNwbGl0KCdcXCcnKTtcbiAgICByZXR1cm4gKHZhbHVlLmxlbmd0aCA8IDMpID8gdmFsdWUuam9pbignXFwnJykgOiB2YWx1ZS5tYXAoZnVuY3Rpb24gKHNlZykge1xuICAgICAgICBpZiAoc2VnLmxlbmd0aCA8IDMpXG4gICAgICAgICAgICByZXR1cm4gc2VnO1xuICAgICAgICBpZiAoKHNlZ1swXSA9PT0gJy4nKSB8fCAoc2VnW3NlZy5sZW5ndGggLSAxXSA9PT0gJy4nKSlcbiAgICAgICAgICAgIHJldHVybiBzZWc7XG4gICAgICAgIHJldHVybiBzZWcuc3BsaXQoJy4nKS5qb2luKCcmJicpO1xuICAgIH0pLmpvaW4oJycpO1xufVxuZnVuY3Rpb24gJCR1bmVzY2FwZV9kb3RzKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlLnNwbGl0KCcmJicpLmpvaW4oJy4nKTtcbn1cbmZ1bmN0aW9uICQkcGFydGlmeSh2YWx1ZSkge1xuICAgIGlmICghdmFsdWUpXG4gICAgICAgIHJldHVybjtcbiAgICByZXR1cm4gJCRlc2NhcGVfZG90cygkJHN0cmlwX2JyYWNlcygkJGJvdW5kYXJ5X3RvX2RvdCgnJyArIHZhbHVlKSkpLnNwbGl0KCcuJyk7XG59XG5mdW5jdGlvbiAkJHByb3BlcnR5KHBhdGgsIG8pIHtcbiAgICB2YXIgcGFydHMgPSAkJHBhcnRpZnkocGF0aCk7XG4gICAgdmFyIGZpcnN0O1xuICAgIGlmICh0eXBlb2YgbyAhPT0gJ29iamVjdCcpXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2dldCgpOiBleHBlY3RzIGFuIG9iamVjdCBnb3QgJyArIHR5cGVvZiBvKTtcbiAgICBpZiAocGFydHMubGVuZ3RoID09PSAxKVxuICAgICAgICByZXR1cm4gb1skJHVuZXNjYXBlX2RvdHMocGFydHNbMF0pXTtcbiAgICBpZiAocGFydHMubGVuZ3RoID09PSAwKVxuICAgICAgICByZXR1cm47XG4gICAgZmlyc3QgPSBvW3BhcnRzLnNoaWZ0KCldO1xuICAgIHJldHVybiAoKHR5cGVvZiBvID09PSAnb2JqZWN0JykgJiYgKG8gIT09IG51bGwpKSA/XG4gICAgICAgIHBhcnRzLnJlZHVjZShmdW5jdGlvbiAodGFyZ2V0LCBwcm9wKSB7XG4gICAgICAgICAgICBpZiAodGFyZ2V0ID09IG51bGwpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICAgICAgICAgIHJldHVybiB0YXJnZXRbJCR1bmVzY2FwZV9kb3RzKHByb3ApXTtcbiAgICAgICAgfSwgZmlyc3QpIDogbnVsbDtcbn1cbmZ1bmN0aW9uICQkYWRvcHQoY2hpbGQsIGUpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShjaGlsZCkpXG4gICAgICAgIHJldHVybiBjaGlsZC5mb3JFYWNoKGZ1bmN0aW9uIChpbm5lckNoaWxkKSB7IHJldHVybiAkJGFkb3B0KGlubmVyQ2hpbGQsIGUpOyB9KTtcbiAgICBpZiAoY2hpbGQpXG4gICAgICAgIGUuYXBwZW5kQ2hpbGQoKHR5cGVvZiBjaGlsZCA9PT0gJ29iamVjdCcpID9cbiAgICAgICAgICAgIGNoaWxkIDogZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY2hpbGQgPT0gbnVsbCA/ICcnIDogY2hpbGQpKTtcbn1cbi8qKlxuICogJCR0ZXh0IGNyZWF0ZXMgYSBET01UZXh0Tm9kZVxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gKi9cbmZ1bmN0aW9uICQkdGV4dCh2YWx1ZSkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh2YWx1ZSA9PSBudWxsID8gJycgOiB2YWx1ZSk7XG59XG4vKipcbiAqICQkcmVzb2x2ZSBwcm9wZXJ0eSBhY2Nlc3MgZXhwcmVzc2lvbiB0byBhdm9pZFxuICogdGhvd2luZyBlcnJvcnMgaWYgaXQgZG9lcyBub3QgZXhpc3QuXG4gKiBAcGFyYW0ge29iamVjdH0gaGVhZFxuICogQHBhcmFtIHtzdHJpbmd9IHBhdGhcbiAqL1xuZnVuY3Rpb24gJCRyZXNvbHZlKGhlYWQsIHBhdGgpIHtcbiAgICB2YXIgcmV0ID0gJCRwcm9wZXJ0eShwYXRoLCBoZWFkKTtcbiAgICByZXR1cm4gKHJldCA9PSBudWxsKSA/ICcnIDogcmV0O1xufVxuLyoqXG4gKiAkJG5vZGUgaXMgY2FsbGVkIHRvIGNyZWF0ZSBhIHJlZ3VsYXIgRE9NIG5vZGVcbiAqIEBwYXJhbSB7c3RyaW5nfSB0YWdcbiAqIEBwYXJhbSB7b2JqZWN0fSBhdHRyaWJ1dGVzXG4gKiBAcGFyYW0ge2FycmF5PHN0cmluZ3xudW1iZXJ8V2lkZ2V0Pn0gY2hpbGRyZW5cbiAqIEBwYXJhbSB7Vmlld30gdmlld1xuICovXG5mdW5jdGlvbiAkJG5vZGUodGFnLCBhdHRyaWJ1dGVzLCBjaGlsZHJlbiwgdmlldykge1xuICAgIHZhciBlID0gKHRhZyA9PT0gJ2ZyYWdtZW50JykgPyBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCkgOiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XG4gICAgaWYgKHR5cGVvZiBhdHRyaWJ1dGVzLmh0bWwgPT09ICdvYmplY3QnKVxuICAgICAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzLmh0bWwpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBhdHRyaWJ1dGVzLmh0bWxba2V5XSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIGVba2V5XSA9IGF0dHJpYnV0ZXMuaHRtbFtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZS5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyaWJ1dGVzLmh0bWxba2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIGNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKGMpIHsgcmV0dXJuICQkYWRvcHQoYywgZSk7IH0pO1xuICAgIGlmIChhdHRyaWJ1dGVzLndtbClcbiAgICAgICAgaWYgKGF0dHJpYnV0ZXMud21sLmlkKVxuICAgICAgICAgICAgdmlldy5yZWdpc3RlcihhdHRyaWJ1dGVzLndtbC5pZCwgZSk7XG4gICAgcmV0dXJuIGU7XG59XG4vKipcbiAqIEF0dHJpYnV0ZXMgcHJvdmlkZXMgYW4gQVBJIGZvciByZWFkaW5nIHRoZVxuICogYXR0cmlidXRlcyBzdXBwbGllZCB0byBhbiBFbGVtZW50LlxuICogQHBhcmFtIHtvYmplY3R9IGF0dHJzXG4gKi9cbnZhciBBdHRyaWJ1dGVzID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBBdHRyaWJ1dGVzKF9hdHRycykge1xuICAgICAgICB0aGlzLl9hdHRycyA9IF9hdHRycztcbiAgICAgICAgdGhpcy5fYXR0cnMgPSBfYXR0cnM7XG4gICAgfVxuICAgIEF0dHJpYnV0ZXMucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uIChwYXRoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlYWQocGF0aCkgIT0gbnVsbDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIHJlYWQgYSB2YWx1ZSBmb3JtIHRoZSBpbnRlcm5hbCBsaXN0LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoXG4gICAgICogQHBhcmFtIHsqfSBkZWZhdWx0VmFsdWUgLSBUaGlzIHZhbHVlIGlzIHJldHVybmVkIGlmIHRoZSB2YWx1ZSBpcyBub3Qgc2V0LlxuICAgICAqL1xuICAgIEF0dHJpYnV0ZXMucHJvdG90eXBlLnJlYWQgPSBmdW5jdGlvbiAocGF0aCwgZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgIHZhciByZXQgPSAkJHByb3BlcnR5KHBhdGguc3BsaXQoJzonKS5qb2luKCcuJyksIHRoaXMuX2F0dHJzKTtcbiAgICAgICAgcmV0dXJuIChyZXQgIT0gbnVsbCkgPyByZXQgOiAoZGVmYXVsdFZhbHVlICE9IG51bGwpID8gZGVmYXVsdFZhbHVlIDogJyc7XG4gICAgfTtcbiAgICByZXR1cm4gQXR0cmlidXRlcztcbn0oKSk7XG4vKipcbiAqICQkd2lkZ2V0IGNyZWF0ZXMgYSB3bWwgd2lkZ2V0LlxuICogQHBhcmFtIHtmdW5jdGlvbn0gQ29uc3RydXRvclxuICogQHBhcmFtIHtvYmplY3R9IGF0dHJpYnV0ZXNcbiAqIEBwYXJhbSB7YXJyYXk8c3RyaW5nfG51bWJlcnxXaWRnZXQ+fSBjaGlsZHJlblxuICogQHBhcmFtIHtWaWV3fSB2aWV3XG4gKiBAcmV0dXJuIHtXaWRnZXR9XG4gKi9cbmZ1bmN0aW9uICQkd2lkZ2V0KENvbnN0cnVjdG9yLCBhdHRyaWJ1dGVzLCBjaGlsZHJlbiwgdmlldykge1xuICAgIHZhciBjaGlsZHMgPSBbXTtcbiAgICB2YXIgdztcbiAgICBjaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChjaGlsZCkgeyByZXR1cm4gQXJyYXkuaXNBcnJheShjaGlsZCkgP1xuICAgICAgICBjaGlsZHMucHVzaC5hcHBseShjaGlsZHMsIGNoaWxkKSA6IGNoaWxkcy5wdXNoKGNoaWxkKTsgfSk7XG4gICAgdyA9IG5ldyBDb25zdHJ1Y3RvcihuZXcgQXR0cmlidXRlcyhhdHRyaWJ1dGVzKSwgY2hpbGRzKTtcbiAgICBpZiAoYXR0cmlidXRlcy53bWwpXG4gICAgICAgIGlmIChhdHRyaWJ1dGVzLndtbC5pZClcbiAgICAgICAgICAgIHZpZXcucmVnaXN0ZXIoYXR0cmlidXRlcy53bWwuaWQsIHcpO1xuICAgIHZpZXcud2lkZ2V0cy5wdXNoKHcpO1xuICAgIHJldHVybiB3LnJlbmRlcigpO1xufVxuLyoqXG4gKiAkJGlmIGlzIGNhbGxlZCB0byBjcmVhdGUgYW4gaWYgY29uZGl0aW9uYWwgY29uc3RydWN0XG4gKiBAcGFyYW0geyp9IHByZWRpY2F0ZVxuICogQHBhcmFtIHtmdW5jdGlvbn0gcG9zaXRpdmVcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IG5lZ2F0aXZlXG4gKi9cbmZ1bmN0aW9uICQkaWYocHJlZGljYXRlLCBwb3NpdGl2ZSwgbmVnYXRpdmUpIHtcbiAgICByZXR1cm4gKHByZWRpY2F0ZSkgPyBwb3NpdGl2ZSgpIDogbmVnYXRpdmUoKTtcbn1cbi8qKlxuICogJCRmb3IgaXMgY2FsbGVkIHRvIGNyZWF0ZSBhIGZvciBsb29wIGNvbnN0cnVjdFxuICogQHBhcmFtIHtJdGVyYWJsZX0gY29sbGVjdGlvblxuICogQHBhcmFtIHtmdW5jdGlvbn0gY2JcbiAqL1xuZnVuY3Rpb24gJCRmb3IoY29sbGVjdGlvbiwgY2IpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShjb2xsZWN0aW9uKSkge1xuICAgICAgICByZXR1cm4gY29sbGVjdGlvbi5tYXAoY2IpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgY29sbGVjdGlvbiA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGNvbGxlY3Rpb24pLm1hcChmdW5jdGlvbiAoa2V5LCBfLCBhbGwpIHsgcmV0dXJuIGNiKGNvbGxlY3Rpb25ba2V5XSwga2V5LCBhbGwpOyB9KTtcbiAgICB9XG4gICAgcmV0dXJuIFtdO1xufVxuLyoqXG4gKiAkJHN3aXRjaCBzaW11bGF0ZXMgYSBzd2l0Y2ggc3RhdGVtZW50XG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ8Ym9vbGVhbn0gdmFsdWVcbiAqIEBwYXJhbSB7b2JqZWN0fSBjYXNlc1xuICovXG5mdW5jdGlvbiAkJHN3aXRjaCh2YWx1ZSwgY2FzZXMpIHtcbiAgICB2YXIgcmVzdWx0ID0gY2FzZXNbdmFsdWVdO1xuICAgIHZhciBkZWZhdWwgPSBjYXNlcy5kZWZhdWx0O1xuICAgIGlmIChyZXN1bHQpXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgaWYgKGRlZmF1bClcbiAgICAgICAgcmV0dXJuIGRlZmF1bDtcbn1cbnZhciBQYW5lbCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUGFuZWwoY29udGV4dCkge1xuICAgICAgICB2YXIgdmlldyA9IHRoaXM7XG4gICAgICAgIHRoaXMuaWRzID0ge307XG4gICAgICAgIHRoaXMud2lkZ2V0cyA9IFtdO1xuICAgICAgICB0aGlzLnRyZWUgPSBudWxsO1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuICQkbm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6IHV0aWxfMS5jb21iaW5lKFskJHJlc29sdmUoU3R5bGVzLCAnUEFORUwnKSwgdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3d3OnN0eWxlJywgJCRyZXNvbHZlKFN0eWxlcywgJ0RFRkFVTFQnKSldKSB9IH0sIFskJHJlc29sdmUodGhpcywgJ2NoaWxkcmVuJyldLCB2aWV3KTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgUGFuZWwucmVuZGVyID0gZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICAgICAgcmV0dXJuIChuZXcgUGFuZWwoY29udGV4dCkpLnJlbmRlcigpO1xuICAgIH07XG4gICAgUGFuZWwucHJvdG90eXBlLnJlZ2lzdGVyID0gZnVuY3Rpb24gKGlkLCB3KSB7XG4gICAgICAgIGlmICh0aGlzLmlkcy5oYXNPd25Qcm9wZXJ0eShpZCkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0R1cGxpY2F0ZSBpZCBcXCcnICsgaWQgKyAnXFwnIGRldGVjdGVkIScpO1xuICAgICAgICB0aGlzLmlkc1tpZF0gPSB3O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIFBhbmVsLnByb3RvdHlwZS5maW5kQnlJZCA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICByZXR1cm4gKHRoaXMuaWRzW2lkXSkgPyB0aGlzLmlkc1tpZF0gOiBudWxsO1xuICAgIH07XG4gICAgUGFuZWwucHJvdG90eXBlLmludmFsaWRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjaGlsZHM7XG4gICAgICAgIHZhciBwYXJlbnQgPSB0aGlzLnRyZWUucGFyZW50Tm9kZTtcbiAgICAgICAgdmFyIHJlYWxGaXJzdENoaWxkO1xuICAgICAgICB2YXIgcmVhbEZpcnN0Q2hpbGRJbmRleDtcbiAgICAgICAgaWYgKHRoaXMudHJlZSA9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKCdDYW5ub3QgaW52YWxpZGF0ZSBhIHZpZXcgdGhhdCBoYXMgbm90IGJlZW4gcmVuZGVyZWQhJyk7XG4gICAgICAgIGlmICh0aGlzLnRyZWUucGFyZW50Tm9kZSA9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKCdBdHRlbXB0IHRvIGludmFsaWRhdGUgYSB2aWV3IHRoYXQgaGFzIG5vdCBiZWVuIGluc2VydGVkIHRvIERPTSEnKTtcbiAgICAgICAgY2hpbGRzID0gdGhpcy50cmVlLnBhcmVudE5vZGUuY2hpbGRyZW47XG4gICAgICAgIC8vZm9yIHNvbWUgcmVhc29uIHRoZSByZWZlcmVuY2Ugc3RvcmVkIGRvZXMgbm90IGhhdmUgdGhlIGNvcnJlY3QgcGFyZW50IG5vZGUuXG4gICAgICAgIC8vd2UgZG8gdGhpcyB0byBnZXQgYSAnbGl2ZScgdmVyc2lvbiBvZiB0aGUgbm9kZS5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHMubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICBpZiAoY2hpbGRzW2ldID09PSB0aGlzLnRyZWUpIHtcbiAgICAgICAgICAgICAgICByZWFsRmlyc3RDaGlsZCA9IGNoaWxkc1tpXTtcbiAgICAgICAgICAgICAgICByZWFsRmlyc3RDaGlsZEluZGV4ID0gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgcGFyZW50LnJlcGxhY2VDaGlsZCh0aGlzLnJlbmRlcigpLCByZWFsRmlyc3RDaGlsZCk7XG4gICAgfTtcbiAgICBQYW5lbC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmlkcyA9IHt9O1xuICAgICAgICB0aGlzLndpZGdldHMuZm9yRWFjaChmdW5jdGlvbiAodykgeyByZXR1cm4gdy5yZW1vdmVkKCk7IH0pO1xuICAgICAgICB0aGlzLndpZGdldHMgPSBbXTtcbiAgICAgICAgdGhpcy50cmVlID0gdGhpcy50ZW1wbGF0ZS5jYWxsKHRoaXMuY29udGV4dCk7XG4gICAgICAgIHRoaXMuaWRzWydyb290J10gPSAodGhpcy5pZHNbJ3Jvb3QnXSkgPyB0aGlzLmlkc1sncm9vdCddIDogdGhpcy50cmVlO1xuICAgICAgICB0aGlzLndpZGdldHMuZm9yRWFjaChmdW5jdGlvbiAodykgeyByZXR1cm4gdy5yZW5kZXJlZCgpOyB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJlZTtcbiAgICB9O1xuICAgIHJldHVybiBQYW5lbDtcbn0oKSk7XG5leHBvcnRzLlBhbmVsID0gUGFuZWw7XG52YXIgSGVhZGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBIZWFkZXIoY29udGV4dCkge1xuICAgICAgICB2YXIgdmlldyA9IHRoaXM7XG4gICAgICAgIHRoaXMuaWRzID0ge307XG4gICAgICAgIHRoaXMud2lkZ2V0cyA9IFtdO1xuICAgICAgICB0aGlzLnRyZWUgPSBudWxsO1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuICQkbm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6ICQkcmVzb2x2ZShTdHlsZXMsICdQQU5FTF9IRUFERVInKSB9IH0sIFskJHJlc29sdmUodGhpcywgJ2NoaWxkcmVuJyldLCB2aWV3KTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgSGVhZGVyLnJlbmRlciA9IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgICAgIHJldHVybiAobmV3IEhlYWRlcihjb250ZXh0KSkucmVuZGVyKCk7XG4gICAgfTtcbiAgICBIZWFkZXIucHJvdG90eXBlLnJlZ2lzdGVyID0gZnVuY3Rpb24gKGlkLCB3KSB7XG4gICAgICAgIGlmICh0aGlzLmlkcy5oYXNPd25Qcm9wZXJ0eShpZCkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0R1cGxpY2F0ZSBpZCBcXCcnICsgaWQgKyAnXFwnIGRldGVjdGVkIScpO1xuICAgICAgICB0aGlzLmlkc1tpZF0gPSB3O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIEhlYWRlci5wcm90b3R5cGUuZmluZEJ5SWQgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmlkc1tpZF0pID8gdGhpcy5pZHNbaWRdIDogbnVsbDtcbiAgICB9O1xuICAgIEhlYWRlci5wcm90b3R5cGUuaW52YWxpZGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNoaWxkcztcbiAgICAgICAgdmFyIHBhcmVudCA9IHRoaXMudHJlZS5wYXJlbnROb2RlO1xuICAgICAgICB2YXIgcmVhbEZpcnN0Q2hpbGQ7XG4gICAgICAgIHZhciByZWFsRmlyc3RDaGlsZEluZGV4O1xuICAgICAgICBpZiAodGhpcy50cmVlID09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoJ0Nhbm5vdCBpbnZhbGlkYXRlIGEgdmlldyB0aGF0IGhhcyBub3QgYmVlbiByZW5kZXJlZCEnKTtcbiAgICAgICAgaWYgKHRoaXMudHJlZS5wYXJlbnROb2RlID09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoJ0F0dGVtcHQgdG8gaW52YWxpZGF0ZSBhIHZpZXcgdGhhdCBoYXMgbm90IGJlZW4gaW5zZXJ0ZWQgdG8gRE9NIScpO1xuICAgICAgICBjaGlsZHMgPSB0aGlzLnRyZWUucGFyZW50Tm9kZS5jaGlsZHJlbjtcbiAgICAgICAgLy9mb3Igc29tZSByZWFzb24gdGhlIHJlZmVyZW5jZSBzdG9yZWQgZG9lcyBub3QgaGF2ZSB0aGUgY29ycmVjdCBwYXJlbnQgbm9kZS5cbiAgICAgICAgLy93ZSBkbyB0aGlzIHRvIGdldCBhICdsaXZlJyB2ZXJzaW9uIG9mIHRoZSBub2RlLlxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcy5sZW5ndGg7IGkrKylcbiAgICAgICAgICAgIGlmIChjaGlsZHNbaV0gPT09IHRoaXMudHJlZSkge1xuICAgICAgICAgICAgICAgIHJlYWxGaXJzdENoaWxkID0gY2hpbGRzW2ldO1xuICAgICAgICAgICAgICAgIHJlYWxGaXJzdENoaWxkSW5kZXggPSBpO1xuICAgICAgICAgICAgfVxuICAgICAgICBwYXJlbnQucmVwbGFjZUNoaWxkKHRoaXMucmVuZGVyKCksIHJlYWxGaXJzdENoaWxkKTtcbiAgICB9O1xuICAgIEhlYWRlci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmlkcyA9IHt9O1xuICAgICAgICB0aGlzLndpZGdldHMuZm9yRWFjaChmdW5jdGlvbiAodykgeyByZXR1cm4gdy5yZW1vdmVkKCk7IH0pO1xuICAgICAgICB0aGlzLndpZGdldHMgPSBbXTtcbiAgICAgICAgdGhpcy50cmVlID0gdGhpcy50ZW1wbGF0ZS5jYWxsKHRoaXMuY29udGV4dCk7XG4gICAgICAgIHRoaXMuaWRzWydyb290J10gPSAodGhpcy5pZHNbJ3Jvb3QnXSkgPyB0aGlzLmlkc1sncm9vdCddIDogdGhpcy50cmVlO1xuICAgICAgICB0aGlzLndpZGdldHMuZm9yRWFjaChmdW5jdGlvbiAodykgeyByZXR1cm4gdy5yZW5kZXJlZCgpOyB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJlZTtcbiAgICB9O1xuICAgIHJldHVybiBIZWFkZXI7XG59KCkpO1xuZXhwb3J0cy5IZWFkZXIgPSBIZWFkZXI7XG52YXIgQm9keSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQm9keShjb250ZXh0KSB7XG4gICAgICAgIHZhciB2aWV3ID0gdGhpcztcbiAgICAgICAgdGhpcy5pZHMgPSB7fTtcbiAgICAgICAgdGhpcy53aWRnZXRzID0gW107XG4gICAgICAgIHRoaXMudHJlZSA9IG51bGw7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gJCRub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogJCRyZXNvbHZlKFN0eWxlcywgJ1BBTkVMX0JPRFknKSB9IH0sIFskJHJlc29sdmUodGhpcywgJ2NoaWxkcmVuJyldLCB2aWV3KTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgQm9keS5yZW5kZXIgPSBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgICAgICByZXR1cm4gKG5ldyBCb2R5KGNvbnRleHQpKS5yZW5kZXIoKTtcbiAgICB9O1xuICAgIEJvZHkucHJvdG90eXBlLnJlZ2lzdGVyID0gZnVuY3Rpb24gKGlkLCB3KSB7XG4gICAgICAgIGlmICh0aGlzLmlkcy5oYXNPd25Qcm9wZXJ0eShpZCkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0R1cGxpY2F0ZSBpZCBcXCcnICsgaWQgKyAnXFwnIGRldGVjdGVkIScpO1xuICAgICAgICB0aGlzLmlkc1tpZF0gPSB3O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIEJvZHkucHJvdG90eXBlLmZpbmRCeUlkID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5pZHNbaWRdKSA/IHRoaXMuaWRzW2lkXSA6IG51bGw7XG4gICAgfTtcbiAgICBCb2R5LnByb3RvdHlwZS5pbnZhbGlkYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY2hpbGRzO1xuICAgICAgICB2YXIgcGFyZW50ID0gdGhpcy50cmVlLnBhcmVudE5vZGU7XG4gICAgICAgIHZhciByZWFsRmlyc3RDaGlsZDtcbiAgICAgICAgdmFyIHJlYWxGaXJzdENoaWxkSW5kZXg7XG4gICAgICAgIGlmICh0aGlzLnRyZWUgPT0gbnVsbClcbiAgICAgICAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcignQ2Fubm90IGludmFsaWRhdGUgYSB2aWV3IHRoYXQgaGFzIG5vdCBiZWVuIHJlbmRlcmVkIScpO1xuICAgICAgICBpZiAodGhpcy50cmVlLnBhcmVudE5vZGUgPT0gbnVsbClcbiAgICAgICAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcignQXR0ZW1wdCB0byBpbnZhbGlkYXRlIGEgdmlldyB0aGF0IGhhcyBub3QgYmVlbiBpbnNlcnRlZCB0byBET00hJyk7XG4gICAgICAgIGNoaWxkcyA9IHRoaXMudHJlZS5wYXJlbnROb2RlLmNoaWxkcmVuO1xuICAgICAgICAvL2ZvciBzb21lIHJlYXNvbiB0aGUgcmVmZXJlbmNlIHN0b3JlZCBkb2VzIG5vdCBoYXZlIHRoZSBjb3JyZWN0IHBhcmVudCBub2RlLlxuICAgICAgICAvL3dlIGRvIHRoaXMgdG8gZ2V0IGEgJ2xpdmUnIHZlcnNpb24gb2YgdGhlIG5vZGUuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRzLmxlbmd0aDsgaSsrKVxuICAgICAgICAgICAgaWYgKGNoaWxkc1tpXSA9PT0gdGhpcy50cmVlKSB7XG4gICAgICAgICAgICAgICAgcmVhbEZpcnN0Q2hpbGQgPSBjaGlsZHNbaV07XG4gICAgICAgICAgICAgICAgcmVhbEZpcnN0Q2hpbGRJbmRleCA9IGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIHBhcmVudC5yZXBsYWNlQ2hpbGQodGhpcy5yZW5kZXIoKSwgcmVhbEZpcnN0Q2hpbGQpO1xuICAgIH07XG4gICAgQm9keS5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmlkcyA9IHt9O1xuICAgICAgICB0aGlzLndpZGdldHMuZm9yRWFjaChmdW5jdGlvbiAodykgeyByZXR1cm4gdy5yZW1vdmVkKCk7IH0pO1xuICAgICAgICB0aGlzLndpZGdldHMgPSBbXTtcbiAgICAgICAgdGhpcy50cmVlID0gdGhpcy50ZW1wbGF0ZS5jYWxsKHRoaXMuY29udGV4dCk7XG4gICAgICAgIHRoaXMuaWRzWydyb290J10gPSAodGhpcy5pZHNbJ3Jvb3QnXSkgPyB0aGlzLmlkc1sncm9vdCddIDogdGhpcy50cmVlO1xuICAgICAgICB0aGlzLndpZGdldHMuZm9yRWFjaChmdW5jdGlvbiAodykgeyByZXR1cm4gdy5yZW5kZXJlZCgpOyB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJlZTtcbiAgICB9O1xuICAgIHJldHVybiBCb2R5O1xufSgpKTtcbmV4cG9ydHMuQm9keSA9IEJvZHk7XG52YXIgRm9vdGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBGb290ZXIoY29udGV4dCkge1xuICAgICAgICB2YXIgdmlldyA9IHRoaXM7XG4gICAgICAgIHRoaXMuaWRzID0ge307XG4gICAgICAgIHRoaXMud2lkZ2V0cyA9IFtdO1xuICAgICAgICB0aGlzLnRyZWUgPSBudWxsO1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuICQkbm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6ICQkcmVzb2x2ZShTdHlsZXMsICdQQU5FTF9GT09URVInKSB9IH0sIFskJHJlc29sdmUodGhpcywgJ2NoaWxkcmVuJyldLCB2aWV3KTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgRm9vdGVyLnJlbmRlciA9IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgICAgIHJldHVybiAobmV3IEZvb3Rlcihjb250ZXh0KSkucmVuZGVyKCk7XG4gICAgfTtcbiAgICBGb290ZXIucHJvdG90eXBlLnJlZ2lzdGVyID0gZnVuY3Rpb24gKGlkLCB3KSB7XG4gICAgICAgIGlmICh0aGlzLmlkcy5oYXNPd25Qcm9wZXJ0eShpZCkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0R1cGxpY2F0ZSBpZCBcXCcnICsgaWQgKyAnXFwnIGRldGVjdGVkIScpO1xuICAgICAgICB0aGlzLmlkc1tpZF0gPSB3O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIEZvb3Rlci5wcm90b3R5cGUuZmluZEJ5SWQgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmlkc1tpZF0pID8gdGhpcy5pZHNbaWRdIDogbnVsbDtcbiAgICB9O1xuICAgIEZvb3Rlci5wcm90b3R5cGUuaW52YWxpZGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNoaWxkcztcbiAgICAgICAgdmFyIHBhcmVudCA9IHRoaXMudHJlZS5wYXJlbnROb2RlO1xuICAgICAgICB2YXIgcmVhbEZpcnN0Q2hpbGQ7XG4gICAgICAgIHZhciByZWFsRmlyc3RDaGlsZEluZGV4O1xuICAgICAgICBpZiAodGhpcy50cmVlID09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoJ0Nhbm5vdCBpbnZhbGlkYXRlIGEgdmlldyB0aGF0IGhhcyBub3QgYmVlbiByZW5kZXJlZCEnKTtcbiAgICAgICAgaWYgKHRoaXMudHJlZS5wYXJlbnROb2RlID09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoJ0F0dGVtcHQgdG8gaW52YWxpZGF0ZSBhIHZpZXcgdGhhdCBoYXMgbm90IGJlZW4gaW5zZXJ0ZWQgdG8gRE9NIScpO1xuICAgICAgICBjaGlsZHMgPSB0aGlzLnRyZWUucGFyZW50Tm9kZS5jaGlsZHJlbjtcbiAgICAgICAgLy9mb3Igc29tZSByZWFzb24gdGhlIHJlZmVyZW5jZSBzdG9yZWQgZG9lcyBub3QgaGF2ZSB0aGUgY29ycmVjdCBwYXJlbnQgbm9kZS5cbiAgICAgICAgLy93ZSBkbyB0aGlzIHRvIGdldCBhICdsaXZlJyB2ZXJzaW9uIG9mIHRoZSBub2RlLlxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcy5sZW5ndGg7IGkrKylcbiAgICAgICAgICAgIGlmIChjaGlsZHNbaV0gPT09IHRoaXMudHJlZSkge1xuICAgICAgICAgICAgICAgIHJlYWxGaXJzdENoaWxkID0gY2hpbGRzW2ldO1xuICAgICAgICAgICAgICAgIHJlYWxGaXJzdENoaWxkSW5kZXggPSBpO1xuICAgICAgICAgICAgfVxuICAgICAgICBwYXJlbnQucmVwbGFjZUNoaWxkKHRoaXMucmVuZGVyKCksIHJlYWxGaXJzdENoaWxkKTtcbiAgICB9O1xuICAgIEZvb3Rlci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmlkcyA9IHt9O1xuICAgICAgICB0aGlzLndpZGdldHMuZm9yRWFjaChmdW5jdGlvbiAodykgeyByZXR1cm4gdy5yZW1vdmVkKCk7IH0pO1xuICAgICAgICB0aGlzLndpZGdldHMgPSBbXTtcbiAgICAgICAgdGhpcy50cmVlID0gdGhpcy50ZW1wbGF0ZS5jYWxsKHRoaXMuY29udGV4dCk7XG4gICAgICAgIHRoaXMuaWRzWydyb290J10gPSAodGhpcy5pZHNbJ3Jvb3QnXSkgPyB0aGlzLmlkc1sncm9vdCddIDogdGhpcy50cmVlO1xuICAgICAgICB0aGlzLndpZGdldHMuZm9yRWFjaChmdW5jdGlvbiAodykgeyByZXR1cm4gdy5yZW5kZXJlZCgpOyB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJlZTtcbiAgICB9O1xuICAgIHJldHVybiBGb290ZXI7XG59KCkpO1xuZXhwb3J0cy5Gb290ZXIgPSBGb290ZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wYW5lbC5qcy5tYXAiLCJ2YXIga2luZG9mID0gcmVxdWlyZShcImtpbmRvZlwiKVxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZWdhbFxuZXhwb3J0cy5kZWVwRWdhbCA9IGRlZXBFZ2FsXG5cbmZ1bmN0aW9uIGVnYWwoYSwgYikge1xuICBpZiAoYSA9PT0gYikgcmV0dXJuIHRydWVcblxuICB2YXIgdHlwZVxuICBzd2l0Y2ggKHR5cGUgPSBraW5kb2ZQbGFpbihhKSkge1xuICAgIGNhc2UgXCJkYXRlXCI6XG4gICAgICBpZiAodHlwZSAhPT0ga2luZG9mKGIpKSByZXR1cm4gZmFsc2VcbiAgICAgIHJldHVybiBhLnZhbHVlT2YoKSA9PT0gYi52YWx1ZU9mKClcblxuICAgIGNhc2UgXCJyZWdleHBcIjpcbiAgICAgIGlmICh0eXBlICE9PSBraW5kb2YoYikpIHJldHVybiBmYWxzZVxuICAgICAgcmV0dXJuIGEudG9TdHJpbmcoKSA9PT0gYi50b1N0cmluZygpXG5cbiAgICBjYXNlIFwib2JqZWN0XCI6XG4gICAgICBpZiAodHlwZSAhPT0ga2luZG9mUGxhaW4oYikpIHJldHVybiBmYWxzZVxuXG4gICAgICB2YXIgY29uc3RydWN0b3IgPSBnZXRDb25zdHJ1Y3Rvck9mKGEpXG4gICAgICBpZiAoY29uc3RydWN0b3IgIT09IGdldENvbnN0cnVjdG9yT2YoYikpIHJldHVybiBmYWxzZVxuICAgICAgaWYgKCFoYXNWYWx1ZU9mKGEpIHx8ICFoYXNWYWx1ZU9mKGIpKSByZXR1cm4gZmFsc2VcbiAgICAgIHJldHVybiBkZWVwRWdhbChhLnZhbHVlT2YoKSwgYi52YWx1ZU9mKCkpXG5cbiAgICBkZWZhdWx0OiByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5mdW5jdGlvbiBtYXliZUVnYWwoYSwgYikge1xuICBpZiAoZWdhbChhLCBiKSkgcmV0dXJuIHRydWVcblxuICB2YXIgdHlwZSA9IGtpbmRvZlBsYWluKGEpXG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgXCJhcnJheVwiOlxuICAgIGNhc2UgXCJwbGFpblwiOiByZXR1cm4gdHlwZSA9PT0ga2luZG9mUGxhaW4oYikgPyBudWxsIDogZmFsc2VcbiAgICBkZWZhdWx0OiByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5mdW5jdGlvbiBkZWVwRWdhbChhLCBiLCBlZ2FsKSB7XG4gIHJldHVybiBkZWVwRWdhbFdpdGgodHlwZW9mIGVnYWwgPT09IFwiZnVuY3Rpb25cIiA/IGVnYWwgOiBtYXliZUVnYWwsIGEsIGIpXG59XG5cbmZ1bmN0aW9uIGRlZXBFZ2FsV2l0aChlZ2FsLCBhLCBiLCBhU3RhY2ssIGJTdGFjaykge1xuICB2YXIgZXF1YWwgPSBlZ2FsKGEsIGIpXG4gIGlmIChlcXVhbCAhPSBudWxsKSByZXR1cm4gQm9vbGVhbihlcXVhbClcblxuICB2YXIgdHlwZSA9IGtpbmRvZihhKVxuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAvKiBlc2xpbnQgbm8tZmFsbHRocm91Z2g6IDAgKi9cbiAgICBjYXNlIFwiYXJyYXlcIjpcbiAgICBjYXNlIFwib2JqZWN0XCI6IGlmICh0eXBlID09PSBraW5kb2YoYikpIGJyZWFrXG4gICAgZGVmYXVsdDogcmV0dXJuIGZhbHNlXG4gIH1cblxuICB2YXIgYVBvcyA9IGFTdGFjayAmJiBhU3RhY2suaW5kZXhPZihhKVxuICB2YXIgYlBvcyA9IGJTdGFjayAmJiBiU3RhY2suaW5kZXhPZihiKVxuICBpZiAoYVBvcyAhPT0gYlBvcykgcmV0dXJuIGZhbHNlXG4gIGlmIChhUG9zICE9IG51bGwgJiYgYVBvcyA+PSAwKSByZXR1cm4gdHJ1ZVxuXG4gIGFTdGFjayA9IGFTdGFjayA/IGFTdGFjay5jb25jYXQoW2FdKSA6IFthXVxuICBiU3RhY2sgPSBiU3RhY2sgPyBiU3RhY2suY29uY2F0KFtiXSkgOiBbYl1cblxuICB2YXIgaVxuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlIFwiYXJyYXlcIjpcbiAgICAgIGlmIChhLmxlbmd0aCAhPT0gYi5sZW5ndGgpIHJldHVybiBmYWxzZVxuICAgICAgaWYgKGEubGVuZ3RoID09PSAwKSByZXR1cm4gdHJ1ZVxuXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgYS5sZW5ndGg7ICsraSlcbiAgICAgICAgaWYgKCFkZWVwRWdhbFdpdGgoZWdhbCwgYVtpXSwgYltpXSwgYVN0YWNrLCBiU3RhY2spKSByZXR1cm4gZmFsc2VcblxuICAgICAgcmV0dXJuIHRydWVcblxuICAgIGNhc2UgXCJvYmplY3RcIjpcbiAgICAgIHZhciBhS2V5cyA9IGtleXMoYSlcbiAgICAgIHZhciBiS2V5cyA9IGtleXMoYilcbiAgICAgIGlmIChhS2V5cy5sZW5ndGggIT09IGJLZXlzLmxlbmd0aCkgcmV0dXJuIGZhbHNlXG4gICAgICBpZiAoYUtleXMubGVuZ3RoID09PSAwKSByZXR1cm4gdHJ1ZVxuXG4gICAgICBhS2V5cy5zb3J0KClcbiAgICAgIGJLZXlzLnNvcnQoKVxuICAgICAgZm9yIChpID0gMDsgaSA8IGFLZXlzLmxlbmd0aDsgKytpKSBpZiAoYUtleXNbaV0gIT09IGJLZXlzW2ldKSByZXR1cm4gZmFsc2VcblxuICAgICAgZm9yICh2YXIga2V5IGluIGEpXG4gICAgICAgIGlmICghZGVlcEVnYWxXaXRoKGVnYWwsIGFba2V5XSwgYltrZXldLCBhU3RhY2ssIGJTdGFjaykpIHJldHVybiBmYWxzZVxuXG4gICAgICByZXR1cm4gdHJ1ZVxuICB9XG59XG5cbmZ1bmN0aW9uIGtpbmRvZlBsYWluKG9iaikge1xuICB2YXIgdHlwZSA9IGtpbmRvZihvYmopXG4gIGlmICh0eXBlID09PSBcIm9iamVjdFwiICYmIGlzT2JqZWN0UGxhaW4ob2JqKSkgcmV0dXJuIFwicGxhaW5cIlxuICByZXR1cm4gdHlwZVxufVxuXG5mdW5jdGlvbiBpc09iamVjdFBsYWluKG9iaikge1xuICB2YXIgcHJvdG90eXBlID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iailcbiAgaWYgKHByb3RvdHlwZSA9PT0gbnVsbCkgcmV0dXJuIHRydWVcbiAgaWYgKCEoXCJjb25zdHJ1Y3RvclwiIGluIHByb3RvdHlwZSkpIHJldHVybiB0cnVlXG4gIHJldHVybiBwcm90b3R5cGUuY29uc3RydWN0b3IgPT09IE9iamVjdFxufVxuXG5mdW5jdGlvbiBnZXRDb25zdHJ1Y3Rvck9mKG9iaikge1xuICB2YXIgcHJvdG90eXBlID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iailcbiAgcmV0dXJuIHByb3RvdHlwZSA9PT0gbnVsbCA/IHVuZGVmaW5lZCA6IHByb3RvdHlwZS5jb25zdHJ1Y3RvclxufVxuXG5mdW5jdGlvbiBoYXNWYWx1ZU9mKG9iaikge1xuICB2YXIgdmFsdWVPZiA9IG9iai52YWx1ZU9mXG4gIHJldHVybiB0eXBlb2YgdmFsdWVPZiA9PT0gXCJmdW5jdGlvblwiICYmIHZhbHVlT2YgIT09IE9iamVjdC5wcm90b3R5cGUudmFsdWVPZlxufVxuXG5mdW5jdGlvbiBrZXlzKG9iaikge1xuICB2YXIgYWxsID0gW11cbiAgZm9yICh2YXIga2V5IGluIG9iaikgYWxsLnB1c2goa2V5KVxuICByZXR1cm4gYWxsXG59XG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBzdHJpbmdpZnlcbmV4cG9ydHMuZ2V0U2VyaWFsaXplID0gc2VyaWFsaXplclxuXG5mdW5jdGlvbiBzdHJpbmdpZnkob2JqLCByZXBsYWNlciwgc3BhY2VzLCBjeWNsZVJlcGxhY2VyKSB7XG4gIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmosIHNlcmlhbGl6ZXIocmVwbGFjZXIsIGN5Y2xlUmVwbGFjZXIpLCBzcGFjZXMpXG59XG5cbmZ1bmN0aW9uIHNlcmlhbGl6ZXIocmVwbGFjZXIsIGN5Y2xlUmVwbGFjZXIpIHtcbiAgdmFyIHN0YWNrID0gW10sIGtleXMgPSBbXVxuXG4gIGlmIChjeWNsZVJlcGxhY2VyID09IG51bGwpIGN5Y2xlUmVwbGFjZXIgPSBmdW5jdGlvbihrZXksIHZhbHVlKSB7XG4gICAgaWYgKHN0YWNrWzBdID09PSB2YWx1ZSkgcmV0dXJuIFwiW0NpcmN1bGFyIH5dXCJcbiAgICByZXR1cm4gXCJbQ2lyY3VsYXIgfi5cIiArIGtleXMuc2xpY2UoMCwgc3RhY2suaW5kZXhPZih2YWx1ZSkpLmpvaW4oXCIuXCIpICsgXCJdXCJcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbihrZXksIHZhbHVlKSB7XG4gICAgaWYgKHN0YWNrLmxlbmd0aCA+IDApIHtcbiAgICAgIHZhciB0aGlzUG9zID0gc3RhY2suaW5kZXhPZih0aGlzKVxuICAgICAgfnRoaXNQb3MgPyBzdGFjay5zcGxpY2UodGhpc1BvcyArIDEpIDogc3RhY2sucHVzaCh0aGlzKVxuICAgICAgfnRoaXNQb3MgPyBrZXlzLnNwbGljZSh0aGlzUG9zLCBJbmZpbml0eSwga2V5KSA6IGtleXMucHVzaChrZXkpXG4gICAgICBpZiAofnN0YWNrLmluZGV4T2YodmFsdWUpKSB2YWx1ZSA9IGN5Y2xlUmVwbGFjZXIuY2FsbCh0aGlzLCBrZXksIHZhbHVlKVxuICAgIH1cbiAgICBlbHNlIHN0YWNrLnB1c2godmFsdWUpXG5cbiAgICByZXR1cm4gcmVwbGFjZXIgPT0gbnVsbCA/IHZhbHVlIDogcmVwbGFjZXIuY2FsbCh0aGlzLCBrZXksIHZhbHVlKVxuICB9XG59XG4iLCJpZiAodHlwZW9mIG1vZHVsZSAhPSBcInVuZGVmaW5lZFwiKSBtb2R1bGUuZXhwb3J0cyA9IGtpbmRvZlxuXG5mdW5jdGlvbiBraW5kb2Yob2JqKSB7XG4gIHZhciB0eXBlXG4gIGlmIChvYmogPT09IHVuZGVmaW5lZCkgcmV0dXJuIFwidW5kZWZpbmVkXCJcbiAgaWYgKG9iaiA9PT0gbnVsbCkgcmV0dXJuIFwibnVsbFwiXG5cbiAgc3dpdGNoICh0eXBlID0gdHlwZW9mIG9iaikge1xuICAgIGNhc2UgXCJvYmplY3RcIjpcbiAgICAgIHN3aXRjaCAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikpIHtcbiAgICAgICAgY2FzZSBcIltvYmplY3QgUmVnRXhwXVwiOiByZXR1cm4gXCJyZWdleHBcIlxuICAgICAgICBjYXNlIFwiW29iamVjdCBEYXRlXVwiOiByZXR1cm4gXCJkYXRlXCJcbiAgICAgICAgY2FzZSBcIltvYmplY3QgQXJyYXldXCI6IHJldHVybiBcImFycmF5XCJcbiAgICAgIH1cblxuICAgIGRlZmF1bHQ6IHJldHVybiB0eXBlXG4gIH1cbn1cbiIsIi8qKlxuICogbG9kYXNoIDMuMi4wIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE2IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTYgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cbnZhciByb290ID0gcmVxdWlyZSgnbG9kYXNoLl9yb290Jyk7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgYml0bWFza3MgZm9yIHdyYXBwZXIgbWV0YWRhdGEuICovXG52YXIgQklORF9GTEFHID0gMSxcbiAgICBCSU5EX0tFWV9GTEFHID0gMixcbiAgICBDVVJSWV9CT1VORF9GTEFHID0gNCxcbiAgICBDVVJSWV9GTEFHID0gOCxcbiAgICBDVVJSWV9SSUdIVF9GTEFHID0gMTYsXG4gICAgUEFSVElBTF9GTEFHID0gMzIsXG4gICAgUEFSVElBTF9SSUdIVF9GTEFHID0gNjQsXG4gICAgQVJZX0ZMQUcgPSAxMjgsXG4gICAgRkxJUF9GTEFHID0gNTEyO1xuXG4vKiogVXNlZCBhcyB0aGUgYFR5cGVFcnJvcmAgbWVzc2FnZSBmb3IgXCJGdW5jdGlvbnNcIiBtZXRob2RzLiAqL1xudmFyIEZVTkNfRVJST1JfVEVYVCA9ICdFeHBlY3RlZCBhIGZ1bmN0aW9uJztcblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgSU5GSU5JVFkgPSAxIC8gMCxcbiAgICBNQVhfU0FGRV9JTlRFR0VSID0gOTAwNzE5OTI1NDc0MDk5MSxcbiAgICBNQVhfSU5URUdFUiA9IDEuNzk3NjkzMTM0ODYyMzE1N2UrMzA4LFxuICAgIE5BTiA9IDAgLyAwO1xuXG4vKiogVXNlZCBhcyB0aGUgaW50ZXJuYWwgYXJndW1lbnQgcGxhY2Vob2xkZXIuICovXG52YXIgUExBQ0VIT0xERVIgPSAnX19sb2Rhc2hfcGxhY2Vob2xkZXJfXyc7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJyxcbiAgICBnZW5UYWcgPSAnW29iamVjdCBHZW5lcmF0b3JGdW5jdGlvbl0nO1xuXG4vKiogVXNlZCB0byBtYXRjaCBsZWFkaW5nIGFuZCB0cmFpbGluZyB3aGl0ZXNwYWNlLiAqL1xudmFyIHJlVHJpbSA9IC9eXFxzK3xcXHMrJC9nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgYmFkIHNpZ25lZCBoZXhhZGVjaW1hbCBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNCYWRIZXggPSAvXlstK10weFswLTlhLWZdKyQvaTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGJpbmFyeSBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNCaW5hcnkgPSAvXjBiWzAxXSskL2k7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBvY3RhbCBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNPY3RhbCA9IC9eMG9bMC03XSskL2k7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCB1bnNpZ25lZCBpbnRlZ2VyIHZhbHVlcy4gKi9cbnZhciByZUlzVWludCA9IC9eKD86MHxbMS05XVxcZCopJC87XG5cbi8qKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB3aXRob3V0IGEgZGVwZW5kZW5jeSBvbiBgcm9vdGAuICovXG52YXIgZnJlZVBhcnNlSW50ID0gcGFyc2VJbnQ7XG5cbi8qKlxuICogQSBmYXN0ZXIgYWx0ZXJuYXRpdmUgdG8gYEZ1bmN0aW9uI2FwcGx5YCwgdGhpcyBmdW5jdGlvbiBpbnZva2VzIGBmdW5jYFxuICogd2l0aCB0aGUgYHRoaXNgIGJpbmRpbmcgb2YgYHRoaXNBcmdgIGFuZCB0aGUgYXJndW1lbnRzIG9mIGBhcmdzYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gaW52b2tlLlxuICogQHBhcmFtIHsqfSB0aGlzQXJnIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgZnVuY2AuXG4gKiBAcGFyYW0gey4uLip9IGFyZ3MgVGhlIGFyZ3VtZW50cyB0byBpbnZva2UgYGZ1bmNgIHdpdGguXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcmVzdWx0IG9mIGBmdW5jYC5cbiAqL1xuZnVuY3Rpb24gYXBwbHkoZnVuYywgdGhpc0FyZywgYXJncykge1xuICB2YXIgbGVuZ3RoID0gYXJncy5sZW5ndGg7XG4gIHN3aXRjaCAobGVuZ3RoKSB7XG4gICAgY2FzZSAwOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcpO1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCBhcmdzWzBdKTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgYXJnc1swXSwgYXJnc1sxXSk7XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pO1xuICB9XG4gIHJldHVybiBmdW5jLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBpbmRleC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcGFyYW0ge251bWJlcn0gW2xlbmd0aD1NQVhfU0FGRV9JTlRFR0VSXSBUaGUgdXBwZXIgYm91bmRzIG9mIGEgdmFsaWQgaW5kZXguXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGluZGV4LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSW5kZXgodmFsdWUsIGxlbmd0aCkge1xuICB2YWx1ZSA9ICh0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgfHwgcmVJc1VpbnQudGVzdCh2YWx1ZSkpID8gK3ZhbHVlIDogLTE7XG4gIGxlbmd0aCA9IGxlbmd0aCA9PSBudWxsID8gTUFYX1NBRkVfSU5URUdFUiA6IGxlbmd0aDtcbiAgcmV0dXJuIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPCBsZW5ndGg7XG59XG5cbi8qKlxuICogUmVwbGFjZXMgYWxsIGBwbGFjZWhvbGRlcmAgZWxlbWVudHMgaW4gYGFycmF5YCB3aXRoIGFuIGludGVybmFsIHBsYWNlaG9sZGVyXG4gKiBhbmQgcmV0dXJucyBhbiBhcnJheSBvZiB0aGVpciBpbmRleGVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gbW9kaWZ5LlxuICogQHBhcmFtIHsqfSBwbGFjZWhvbGRlciBUaGUgcGxhY2Vob2xkZXIgdG8gcmVwbGFjZS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGFycmF5IG9mIHBsYWNlaG9sZGVyIGluZGV4ZXMuXG4gKi9cbmZ1bmN0aW9uIHJlcGxhY2VIb2xkZXJzKGFycmF5LCBwbGFjZWhvbGRlcikge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5Lmxlbmd0aCxcbiAgICAgIHJlc0luZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSBbXTtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGlmIChhcnJheVtpbmRleF0gPT09IHBsYWNlaG9sZGVyKSB7XG4gICAgICBhcnJheVtpbmRleF0gPSBQTEFDRUhPTERFUjtcbiAgICAgIHJlc3VsdFsrK3Jlc0luZGV4XSA9IGluZGV4O1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlTWF4ID0gTWF0aC5tYXgsXG4gICAgbmF0aXZlTWluID0gTWF0aC5taW47XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uY3JlYXRlYCB3aXRob3V0IHN1cHBvcnQgZm9yIGFzc2lnbmluZ1xuICogcHJvcGVydGllcyB0byB0aGUgY3JlYXRlZCBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBwcm90b3R5cGUgVGhlIG9iamVjdCB0byBpbmhlcml0IGZyb20uXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBuZXcgb2JqZWN0LlxuICovXG52YXIgYmFzZUNyZWF0ZSA9IChmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gb2JqZWN0KCkge31cbiAgcmV0dXJuIGZ1bmN0aW9uKHByb3RvdHlwZSkge1xuICAgIGlmIChpc09iamVjdChwcm90b3R5cGUpKSB7XG4gICAgICBvYmplY3QucHJvdG90eXBlID0gcHJvdG90eXBlO1xuICAgICAgdmFyIHJlc3VsdCA9IG5ldyBvYmplY3Q7XG4gICAgICBvYmplY3QucHJvdG90eXBlID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0IHx8IHt9O1xuICB9O1xufSgpKTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IHRoYXQgaXMgdGhlIGNvbXBvc2l0aW9uIG9mIHBhcnRpYWxseSBhcHBsaWVkIGFyZ3VtZW50cyxcbiAqIHBsYWNlaG9sZGVycywgYW5kIHByb3ZpZGVkIGFyZ3VtZW50cyBpbnRvIGEgc2luZ2xlIGFycmF5IG9mIGFyZ3VtZW50cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGFyZ3MgVGhlIHByb3ZpZGVkIGFyZ3VtZW50cy5cbiAqIEBwYXJhbSB7QXJyYXl9IHBhcnRpYWxzIFRoZSBhcmd1bWVudHMgdG8gcHJlcGVuZCB0byB0aG9zZSBwcm92aWRlZC5cbiAqIEBwYXJhbSB7QXJyYXl9IGhvbGRlcnMgVGhlIGBwYXJ0aWFsc2AgcGxhY2Vob2xkZXIgaW5kZXhlcy5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGFycmF5IG9mIGNvbXBvc2VkIGFyZ3VtZW50cy5cbiAqL1xuZnVuY3Rpb24gY29tcG9zZUFyZ3MoYXJncywgcGFydGlhbHMsIGhvbGRlcnMpIHtcbiAgdmFyIGhvbGRlcnNMZW5ndGggPSBob2xkZXJzLmxlbmd0aCxcbiAgICAgIGFyZ3NJbmRleCA9IC0xLFxuICAgICAgYXJnc0xlbmd0aCA9IG5hdGl2ZU1heChhcmdzLmxlbmd0aCAtIGhvbGRlcnNMZW5ndGgsIDApLFxuICAgICAgbGVmdEluZGV4ID0gLTEsXG4gICAgICBsZWZ0TGVuZ3RoID0gcGFydGlhbHMubGVuZ3RoLFxuICAgICAgcmVzdWx0ID0gQXJyYXkobGVmdExlbmd0aCArIGFyZ3NMZW5ndGgpO1xuXG4gIHdoaWxlICgrK2xlZnRJbmRleCA8IGxlZnRMZW5ndGgpIHtcbiAgICByZXN1bHRbbGVmdEluZGV4XSA9IHBhcnRpYWxzW2xlZnRJbmRleF07XG4gIH1cbiAgd2hpbGUgKCsrYXJnc0luZGV4IDwgaG9sZGVyc0xlbmd0aCkge1xuICAgIHJlc3VsdFtob2xkZXJzW2FyZ3NJbmRleF1dID0gYXJnc1thcmdzSW5kZXhdO1xuICB9XG4gIHdoaWxlIChhcmdzTGVuZ3RoLS0pIHtcbiAgICByZXN1bHRbbGVmdEluZGV4KytdID0gYXJnc1thcmdzSW5kZXgrK107XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGlzIGxpa2UgYGNvbXBvc2VBcmdzYCBleGNlcHQgdGhhdCB0aGUgYXJndW1lbnRzIGNvbXBvc2l0aW9uXG4gKiBpcyB0YWlsb3JlZCBmb3IgYF8ucGFydGlhbFJpZ2h0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGFyZ3MgVGhlIHByb3ZpZGVkIGFyZ3VtZW50cy5cbiAqIEBwYXJhbSB7QXJyYXl9IHBhcnRpYWxzIFRoZSBhcmd1bWVudHMgdG8gYXBwZW5kIHRvIHRob3NlIHByb3ZpZGVkLlxuICogQHBhcmFtIHtBcnJheX0gaG9sZGVycyBUaGUgYHBhcnRpYWxzYCBwbGFjZWhvbGRlciBpbmRleGVzLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgYXJyYXkgb2YgY29tcG9zZWQgYXJndW1lbnRzLlxuICovXG5mdW5jdGlvbiBjb21wb3NlQXJnc1JpZ2h0KGFyZ3MsIHBhcnRpYWxzLCBob2xkZXJzKSB7XG4gIHZhciBob2xkZXJzSW5kZXggPSAtMSxcbiAgICAgIGhvbGRlcnNMZW5ndGggPSBob2xkZXJzLmxlbmd0aCxcbiAgICAgIGFyZ3NJbmRleCA9IC0xLFxuICAgICAgYXJnc0xlbmd0aCA9IG5hdGl2ZU1heChhcmdzLmxlbmd0aCAtIGhvbGRlcnNMZW5ndGgsIDApLFxuICAgICAgcmlnaHRJbmRleCA9IC0xLFxuICAgICAgcmlnaHRMZW5ndGggPSBwYXJ0aWFscy5sZW5ndGgsXG4gICAgICByZXN1bHQgPSBBcnJheShhcmdzTGVuZ3RoICsgcmlnaHRMZW5ndGgpO1xuXG4gIHdoaWxlICgrK2FyZ3NJbmRleCA8IGFyZ3NMZW5ndGgpIHtcbiAgICByZXN1bHRbYXJnc0luZGV4XSA9IGFyZ3NbYXJnc0luZGV4XTtcbiAgfVxuICB2YXIgb2Zmc2V0ID0gYXJnc0luZGV4O1xuICB3aGlsZSAoKytyaWdodEluZGV4IDwgcmlnaHRMZW5ndGgpIHtcbiAgICByZXN1bHRbb2Zmc2V0ICsgcmlnaHRJbmRleF0gPSBwYXJ0aWFsc1tyaWdodEluZGV4XTtcbiAgfVxuICB3aGlsZSAoKytob2xkZXJzSW5kZXggPCBob2xkZXJzTGVuZ3RoKSB7XG4gICAgcmVzdWx0W29mZnNldCArIGhvbGRlcnNbaG9sZGVyc0luZGV4XV0gPSBhcmdzW2FyZ3NJbmRleCsrXTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENvcGllcyB0aGUgdmFsdWVzIG9mIGBzb3VyY2VgIHRvIGBhcnJheWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IHNvdXJjZSBUaGUgYXJyYXkgdG8gY29weSB2YWx1ZXMgZnJvbS5cbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheT1bXV0gVGhlIGFycmF5IHRvIGNvcHkgdmFsdWVzIHRvLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGBhcnJheWAuXG4gKi9cbmZ1bmN0aW9uIGNvcHlBcnJheShzb3VyY2UsIGFycmF5KSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gc291cmNlLmxlbmd0aDtcblxuICBhcnJheSB8fCAoYXJyYXkgPSBBcnJheShsZW5ndGgpKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBhcnJheVtpbmRleF0gPSBzb3VyY2VbaW5kZXhdO1xuICB9XG4gIHJldHVybiBhcnJheTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCB3cmFwcyBgZnVuY2AgdG8gaW52b2tlIGl0IHdpdGggdGhlIG9wdGlvbmFsIGB0aGlzYFxuICogYmluZGluZyBvZiBgdGhpc0FyZ2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHdyYXAuXG4gKiBAcGFyYW0ge251bWJlcn0gYml0bWFzayBUaGUgYml0bWFzayBvZiB3cmFwcGVyIGZsYWdzLiBTZWUgYGNyZWF0ZVdyYXBwZXJgIGZvciBtb3JlIGRldGFpbHMuXG4gKiBAcGFyYW0geyp9IFt0aGlzQXJnXSBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGZ1bmNgLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgd3JhcHBlZCBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlQmFzZVdyYXBwZXIoZnVuYywgYml0bWFzaywgdGhpc0FyZykge1xuICB2YXIgaXNCaW5kID0gYml0bWFzayAmIEJJTkRfRkxBRyxcbiAgICAgIEN0b3IgPSBjcmVhdGVDdG9yV3JhcHBlcihmdW5jKTtcblxuICBmdW5jdGlvbiB3cmFwcGVyKCkge1xuICAgIHZhciBmbiA9ICh0aGlzICYmIHRoaXMgIT09IHJvb3QgJiYgdGhpcyBpbnN0YW5jZW9mIHdyYXBwZXIpID8gQ3RvciA6IGZ1bmM7XG4gICAgcmV0dXJuIGZuLmFwcGx5KGlzQmluZCA/IHRoaXNBcmcgOiB0aGlzLCBhcmd1bWVudHMpO1xuICB9XG4gIHJldHVybiB3cmFwcGVyO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IHByb2R1Y2VzIGFuIGluc3RhbmNlIG9mIGBDdG9yYCByZWdhcmRsZXNzIG9mXG4gKiB3aGV0aGVyIGl0IHdhcyBpbnZva2VkIGFzIHBhcnQgb2YgYSBgbmV3YCBleHByZXNzaW9uIG9yIGJ5IGBjYWxsYCBvciBgYXBwbHlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBDdG9yIFRoZSBjb25zdHJ1Y3RvciB0byB3cmFwLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgd3JhcHBlZCBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlQ3RvcldyYXBwZXIoQ3Rvcikge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgLy8gVXNlIGEgYHN3aXRjaGAgc3RhdGVtZW50IHRvIHdvcmsgd2l0aCBjbGFzcyBjb25zdHJ1Y3RvcnMuXG4gICAgLy8gU2VlIGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLWVjbWFzY3JpcHQtZnVuY3Rpb24tb2JqZWN0cy1jYWxsLXRoaXNhcmd1bWVudC1hcmd1bWVudHNsaXN0XG4gICAgLy8gZm9yIG1vcmUgZGV0YWlscy5cbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgICBjYXNlIDA6IHJldHVybiBuZXcgQ3RvcjtcbiAgICAgIGNhc2UgMTogcmV0dXJuIG5ldyBDdG9yKGFyZ3NbMF0pO1xuICAgICAgY2FzZSAyOiByZXR1cm4gbmV3IEN0b3IoYXJnc1swXSwgYXJnc1sxXSk7XG4gICAgICBjYXNlIDM6IHJldHVybiBuZXcgQ3RvcihhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKTtcbiAgICAgIGNhc2UgNDogcmV0dXJuIG5ldyBDdG9yKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10pO1xuICAgICAgY2FzZSA1OiByZXR1cm4gbmV3IEN0b3IoYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSwgYXJnc1s0XSk7XG4gICAgICBjYXNlIDY6IHJldHVybiBuZXcgQ3RvcihhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdLCBhcmdzWzRdLCBhcmdzWzVdKTtcbiAgICAgIGNhc2UgNzogcmV0dXJuIG5ldyBDdG9yKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10sIGFyZ3NbNF0sIGFyZ3NbNV0sIGFyZ3NbNl0pO1xuICAgIH1cbiAgICB2YXIgdGhpc0JpbmRpbmcgPSBiYXNlQ3JlYXRlKEN0b3IucHJvdG90eXBlKSxcbiAgICAgICAgcmVzdWx0ID0gQ3Rvci5hcHBseSh0aGlzQmluZGluZywgYXJncyk7XG5cbiAgICAvLyBNaW1pYyB0aGUgY29uc3RydWN0b3IncyBgcmV0dXJuYCBiZWhhdmlvci5cbiAgICAvLyBTZWUgaHR0cHM6Ly9lczUuZ2l0aHViLmlvLyN4MTMuMi4yIGZvciBtb3JlIGRldGFpbHMuXG4gICAgcmV0dXJuIGlzT2JqZWN0KHJlc3VsdCkgPyByZXN1bHQgOiB0aGlzQmluZGluZztcbiAgfTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCB3cmFwcyBgZnVuY2AgdG8gZW5hYmxlIGN1cnJ5aW5nLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byB3cmFwLlxuICogQHBhcmFtIHtudW1iZXJ9IGJpdG1hc2sgVGhlIGJpdG1hc2sgb2Ygd3JhcHBlciBmbGFncy4gU2VlIGBjcmVhdGVXcmFwcGVyYCBmb3IgbW9yZSBkZXRhaWxzLlxuICogQHBhcmFtIHtudW1iZXJ9IGFyaXR5IFRoZSBhcml0eSBvZiBgZnVuY2AuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyB3cmFwcGVkIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBjcmVhdGVDdXJyeVdyYXBwZXIoZnVuYywgYml0bWFzaywgYXJpdHkpIHtcbiAgdmFyIEN0b3IgPSBjcmVhdGVDdG9yV3JhcHBlcihmdW5jKTtcblxuICBmdW5jdGlvbiB3cmFwcGVyKCkge1xuICAgIHZhciBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoLFxuICAgICAgICBpbmRleCA9IGxlbmd0aCxcbiAgICAgICAgYXJncyA9IEFycmF5KGxlbmd0aCksXG4gICAgICAgIGZuID0gKHRoaXMgJiYgdGhpcyAhPT0gcm9vdCAmJiB0aGlzIGluc3RhbmNlb2Ygd3JhcHBlcikgPyBDdG9yIDogZnVuYyxcbiAgICAgICAgcGxhY2Vob2xkZXIgPSB3cmFwcGVyLnBsYWNlaG9sZGVyO1xuXG4gICAgd2hpbGUgKGluZGV4LS0pIHtcbiAgICAgIGFyZ3NbaW5kZXhdID0gYXJndW1lbnRzW2luZGV4XTtcbiAgICB9XG4gICAgdmFyIGhvbGRlcnMgPSAobGVuZ3RoIDwgMyAmJiBhcmdzWzBdICE9PSBwbGFjZWhvbGRlciAmJiBhcmdzW2xlbmd0aCAtIDFdICE9PSBwbGFjZWhvbGRlcilcbiAgICAgID8gW11cbiAgICAgIDogcmVwbGFjZUhvbGRlcnMoYXJncywgcGxhY2Vob2xkZXIpO1xuXG4gICAgbGVuZ3RoIC09IGhvbGRlcnMubGVuZ3RoO1xuICAgIHJldHVybiBsZW5ndGggPCBhcml0eVxuICAgICAgPyBjcmVhdGVSZWN1cnJ5V3JhcHBlcihmdW5jLCBiaXRtYXNrLCBjcmVhdGVIeWJyaWRXcmFwcGVyLCBwbGFjZWhvbGRlciwgdW5kZWZpbmVkLCBhcmdzLCBob2xkZXJzLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgYXJpdHkgLSBsZW5ndGgpXG4gICAgICA6IGFwcGx5KGZuLCB0aGlzLCBhcmdzKTtcbiAgfVxuICByZXR1cm4gd3JhcHBlcjtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCB3cmFwcyBgZnVuY2AgdG8gaW52b2tlIGl0IHdpdGggb3B0aW9uYWwgYHRoaXNgXG4gKiBiaW5kaW5nIG9mIGB0aGlzQXJnYCwgcGFydGlhbCBhcHBsaWNhdGlvbiwgYW5kIGN1cnJ5aW5nLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufHN0cmluZ30gZnVuYyBUaGUgZnVuY3Rpb24gb3IgbWV0aG9kIG5hbWUgdG8gd3JhcC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBiaXRtYXNrIFRoZSBiaXRtYXNrIG9mIHdyYXBwZXIgZmxhZ3MuIFNlZSBgY3JlYXRlV3JhcHBlcmAgZm9yIG1vcmUgZGV0YWlscy5cbiAqIEBwYXJhbSB7Kn0gW3RoaXNBcmddIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgZnVuY2AuXG4gKiBAcGFyYW0ge0FycmF5fSBbcGFydGlhbHNdIFRoZSBhcmd1bWVudHMgdG8gcHJlcGVuZCB0byB0aG9zZSBwcm92aWRlZCB0byB0aGUgbmV3IGZ1bmN0aW9uLlxuICogQHBhcmFtIHtBcnJheX0gW2hvbGRlcnNdIFRoZSBgcGFydGlhbHNgIHBsYWNlaG9sZGVyIGluZGV4ZXMuXG4gKiBAcGFyYW0ge0FycmF5fSBbcGFydGlhbHNSaWdodF0gVGhlIGFyZ3VtZW50cyB0byBhcHBlbmQgdG8gdGhvc2UgcHJvdmlkZWQgdG8gdGhlIG5ldyBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7QXJyYXl9IFtob2xkZXJzUmlnaHRdIFRoZSBgcGFydGlhbHNSaWdodGAgcGxhY2Vob2xkZXIgaW5kZXhlcy5cbiAqIEBwYXJhbSB7QXJyYXl9IFthcmdQb3NdIFRoZSBhcmd1bWVudCBwb3NpdGlvbnMgb2YgdGhlIG5ldyBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbYXJ5XSBUaGUgYXJpdHkgY2FwIG9mIGBmdW5jYC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbYXJpdHldIFRoZSBhcml0eSBvZiBgZnVuY2AuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyB3cmFwcGVkIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBjcmVhdGVIeWJyaWRXcmFwcGVyKGZ1bmMsIGJpdG1hc2ssIHRoaXNBcmcsIHBhcnRpYWxzLCBob2xkZXJzLCBwYXJ0aWFsc1JpZ2h0LCBob2xkZXJzUmlnaHQsIGFyZ1BvcywgYXJ5LCBhcml0eSkge1xuICB2YXIgaXNBcnkgPSBiaXRtYXNrICYgQVJZX0ZMQUcsXG4gICAgICBpc0JpbmQgPSBiaXRtYXNrICYgQklORF9GTEFHLFxuICAgICAgaXNCaW5kS2V5ID0gYml0bWFzayAmIEJJTkRfS0VZX0ZMQUcsXG4gICAgICBpc0N1cnJ5ID0gYml0bWFzayAmIENVUlJZX0ZMQUcsXG4gICAgICBpc0N1cnJ5UmlnaHQgPSBiaXRtYXNrICYgQ1VSUllfUklHSFRfRkxBRyxcbiAgICAgIGlzRmxpcCA9IGJpdG1hc2sgJiBGTElQX0ZMQUcsXG4gICAgICBDdG9yID0gaXNCaW5kS2V5ID8gdW5kZWZpbmVkIDogY3JlYXRlQ3RvcldyYXBwZXIoZnVuYyk7XG5cbiAgZnVuY3Rpb24gd3JhcHBlcigpIHtcbiAgICB2YXIgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aCxcbiAgICAgICAgaW5kZXggPSBsZW5ndGgsXG4gICAgICAgIGFyZ3MgPSBBcnJheShsZW5ndGgpO1xuXG4gICAgd2hpbGUgKGluZGV4LS0pIHtcbiAgICAgIGFyZ3NbaW5kZXhdID0gYXJndW1lbnRzW2luZGV4XTtcbiAgICB9XG4gICAgaWYgKHBhcnRpYWxzKSB7XG4gICAgICBhcmdzID0gY29tcG9zZUFyZ3MoYXJncywgcGFydGlhbHMsIGhvbGRlcnMpO1xuICAgIH1cbiAgICBpZiAocGFydGlhbHNSaWdodCkge1xuICAgICAgYXJncyA9IGNvbXBvc2VBcmdzUmlnaHQoYXJncywgcGFydGlhbHNSaWdodCwgaG9sZGVyc1JpZ2h0KTtcbiAgICB9XG4gICAgaWYgKGlzQ3VycnkgfHwgaXNDdXJyeVJpZ2h0KSB7XG4gICAgICB2YXIgcGxhY2Vob2xkZXIgPSB3cmFwcGVyLnBsYWNlaG9sZGVyLFxuICAgICAgICAgIGFyZ3NIb2xkZXJzID0gcmVwbGFjZUhvbGRlcnMoYXJncywgcGxhY2Vob2xkZXIpO1xuXG4gICAgICBsZW5ndGggLT0gYXJnc0hvbGRlcnMubGVuZ3RoO1xuICAgICAgaWYgKGxlbmd0aCA8IGFyaXR5KSB7XG4gICAgICAgIHJldHVybiBjcmVhdGVSZWN1cnJ5V3JhcHBlcihmdW5jLCBiaXRtYXNrLCBjcmVhdGVIeWJyaWRXcmFwcGVyLCBwbGFjZWhvbGRlciwgdGhpc0FyZywgYXJncywgYXJnc0hvbGRlcnMsIGFyZ1BvcywgYXJ5LCBhcml0eSAtIGxlbmd0aCk7XG4gICAgICB9XG4gICAgfVxuICAgIHZhciB0aGlzQmluZGluZyA9IGlzQmluZCA/IHRoaXNBcmcgOiB0aGlzLFxuICAgICAgICBmbiA9IGlzQmluZEtleSA/IHRoaXNCaW5kaW5nW2Z1bmNdIDogZnVuYztcblxuICAgIGlmIChhcmdQb3MpIHtcbiAgICAgIGFyZ3MgPSByZW9yZGVyKGFyZ3MsIGFyZ1Bvcyk7XG4gICAgfSBlbHNlIGlmIChpc0ZsaXAgJiYgYXJncy5sZW5ndGggPiAxKSB7XG4gICAgICBhcmdzLnJldmVyc2UoKTtcbiAgICB9XG4gICAgaWYgKGlzQXJ5ICYmIGFyeSA8IGFyZ3MubGVuZ3RoKSB7XG4gICAgICBhcmdzLmxlbmd0aCA9IGFyeTtcbiAgICB9XG4gICAgaWYgKHRoaXMgJiYgdGhpcyAhPT0gcm9vdCAmJiB0aGlzIGluc3RhbmNlb2Ygd3JhcHBlcikge1xuICAgICAgZm4gPSBDdG9yIHx8IGNyZWF0ZUN0b3JXcmFwcGVyKGZuKTtcbiAgICB9XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXNCaW5kaW5nLCBhcmdzKTtcbiAgfVxuICByZXR1cm4gd3JhcHBlcjtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCB3cmFwcyBgZnVuY2AgdG8gaW52b2tlIGl0IHdpdGggdGhlIG9wdGlvbmFsIGB0aGlzYFxuICogYmluZGluZyBvZiBgdGhpc0FyZ2AgYW5kIHRoZSBgcGFydGlhbHNgIHByZXBlbmRlZCB0byB0aG9zZSBwcm92aWRlZCB0b1xuICogdGhlIHdyYXBwZXIuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHdyYXAuXG4gKiBAcGFyYW0ge251bWJlcn0gYml0bWFzayBUaGUgYml0bWFzayBvZiB3cmFwcGVyIGZsYWdzLiBTZWUgYGNyZWF0ZVdyYXBwZXJgIGZvciBtb3JlIGRldGFpbHMuXG4gKiBAcGFyYW0geyp9IHRoaXNBcmcgVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBmdW5jYC5cbiAqIEBwYXJhbSB7QXJyYXl9IHBhcnRpYWxzIFRoZSBhcmd1bWVudHMgdG8gcHJlcGVuZCB0byB0aG9zZSBwcm92aWRlZCB0byB0aGUgbmV3IGZ1bmN0aW9uLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgd3JhcHBlZCBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlUGFydGlhbFdyYXBwZXIoZnVuYywgYml0bWFzaywgdGhpc0FyZywgcGFydGlhbHMpIHtcbiAgdmFyIGlzQmluZCA9IGJpdG1hc2sgJiBCSU5EX0ZMQUcsXG4gICAgICBDdG9yID0gY3JlYXRlQ3RvcldyYXBwZXIoZnVuYyk7XG5cbiAgZnVuY3Rpb24gd3JhcHBlcigpIHtcbiAgICB2YXIgYXJnc0luZGV4ID0gLTEsXG4gICAgICAgIGFyZ3NMZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoLFxuICAgICAgICBsZWZ0SW5kZXggPSAtMSxcbiAgICAgICAgbGVmdExlbmd0aCA9IHBhcnRpYWxzLmxlbmd0aCxcbiAgICAgICAgYXJncyA9IEFycmF5KGxlZnRMZW5ndGggKyBhcmdzTGVuZ3RoKSxcbiAgICAgICAgZm4gPSAodGhpcyAmJiB0aGlzICE9PSByb290ICYmIHRoaXMgaW5zdGFuY2VvZiB3cmFwcGVyKSA/IEN0b3IgOiBmdW5jO1xuXG4gICAgd2hpbGUgKCsrbGVmdEluZGV4IDwgbGVmdExlbmd0aCkge1xuICAgICAgYXJnc1tsZWZ0SW5kZXhdID0gcGFydGlhbHNbbGVmdEluZGV4XTtcbiAgICB9XG4gICAgd2hpbGUgKGFyZ3NMZW5ndGgtLSkge1xuICAgICAgYXJnc1tsZWZ0SW5kZXgrK10gPSBhcmd1bWVudHNbKythcmdzSW5kZXhdO1xuICAgIH1cbiAgICByZXR1cm4gYXBwbHkoZm4sIGlzQmluZCA/IHRoaXNBcmcgOiB0aGlzLCBhcmdzKTtcbiAgfVxuICByZXR1cm4gd3JhcHBlcjtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCB3cmFwcyBgZnVuY2AgdG8gY29udGludWUgY3VycnlpbmcuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHdyYXAuXG4gKiBAcGFyYW0ge251bWJlcn0gYml0bWFzayBUaGUgYml0bWFzayBvZiB3cmFwcGVyIGZsYWdzLiBTZWUgYGNyZWF0ZVdyYXBwZXJgIGZvciBtb3JlIGRldGFpbHMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB3cmFwRnVuYyBUaGUgZnVuY3Rpb24gdG8gY3JlYXRlIHRoZSBgZnVuY2Agd3JhcHBlci5cbiAqIEBwYXJhbSB7Kn0gcGxhY2Vob2xkZXIgVGhlIHBsYWNlaG9sZGVyIHRvIHJlcGxhY2UuXG4gKiBAcGFyYW0geyp9IFt0aGlzQXJnXSBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGZ1bmNgLlxuICogQHBhcmFtIHtBcnJheX0gW3BhcnRpYWxzXSBUaGUgYXJndW1lbnRzIHRvIHByZXBlbmQgdG8gdGhvc2UgcHJvdmlkZWQgdG8gdGhlIG5ldyBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7QXJyYXl9IFtob2xkZXJzXSBUaGUgYHBhcnRpYWxzYCBwbGFjZWhvbGRlciBpbmRleGVzLlxuICogQHBhcmFtIHtBcnJheX0gW2FyZ1Bvc10gVGhlIGFyZ3VtZW50IHBvc2l0aW9ucyBvZiB0aGUgbmV3IGZ1bmN0aW9uLlxuICogQHBhcmFtIHtudW1iZXJ9IFthcnldIFRoZSBhcml0eSBjYXAgb2YgYGZ1bmNgLlxuICogQHBhcmFtIHtudW1iZXJ9IFthcml0eV0gVGhlIGFyaXR5IG9mIGBmdW5jYC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IHdyYXBwZWQgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZVJlY3VycnlXcmFwcGVyKGZ1bmMsIGJpdG1hc2ssIHdyYXBGdW5jLCBwbGFjZWhvbGRlciwgdGhpc0FyZywgcGFydGlhbHMsIGhvbGRlcnMsIGFyZ1BvcywgYXJ5LCBhcml0eSkge1xuICB2YXIgaXNDdXJyeSA9IGJpdG1hc2sgJiBDVVJSWV9GTEFHLFxuICAgICAgbmV3QXJnUG9zID0gYXJnUG9zID8gY29weUFycmF5KGFyZ1BvcykgOiB1bmRlZmluZWQsXG4gICAgICBuZXdzSG9sZGVycyA9IGlzQ3VycnkgPyBob2xkZXJzIDogdW5kZWZpbmVkLFxuICAgICAgbmV3SG9sZGVyc1JpZ2h0ID0gaXNDdXJyeSA/IHVuZGVmaW5lZCA6IGhvbGRlcnMsXG4gICAgICBuZXdQYXJ0aWFscyA9IGlzQ3VycnkgPyBwYXJ0aWFscyA6IHVuZGVmaW5lZCxcbiAgICAgIG5ld1BhcnRpYWxzUmlnaHQgPSBpc0N1cnJ5ID8gdW5kZWZpbmVkIDogcGFydGlhbHM7XG5cbiAgYml0bWFzayB8PSAoaXNDdXJyeSA/IFBBUlRJQUxfRkxBRyA6IFBBUlRJQUxfUklHSFRfRkxBRyk7XG4gIGJpdG1hc2sgJj0gfihpc0N1cnJ5ID8gUEFSVElBTF9SSUdIVF9GTEFHIDogUEFSVElBTF9GTEFHKTtcblxuICBpZiAoIShiaXRtYXNrICYgQ1VSUllfQk9VTkRfRkxBRykpIHtcbiAgICBiaXRtYXNrICY9IH4oQklORF9GTEFHIHwgQklORF9LRVlfRkxBRyk7XG4gIH1cbiAgdmFyIHJlc3VsdCA9IHdyYXBGdW5jKGZ1bmMsIGJpdG1hc2ssIHRoaXNBcmcsIG5ld1BhcnRpYWxzLCBuZXdzSG9sZGVycywgbmV3UGFydGlhbHNSaWdodCwgbmV3SG9sZGVyc1JpZ2h0LCBuZXdBcmdQb3MsIGFyeSwgYXJpdHkpO1xuXG4gIHJlc3VsdC5wbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IGVpdGhlciBjdXJyaWVzIG9yIGludm9rZXMgYGZ1bmNgIHdpdGggb3B0aW9uYWxcbiAqIGB0aGlzYCBiaW5kaW5nIGFuZCBwYXJ0aWFsbHkgYXBwbGllZCBhcmd1bWVudHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb258c3RyaW5nfSBmdW5jIFRoZSBmdW5jdGlvbiBvciBtZXRob2QgbmFtZSB0byB3cmFwLlxuICogQHBhcmFtIHtudW1iZXJ9IGJpdG1hc2sgVGhlIGJpdG1hc2sgb2Ygd3JhcHBlciBmbGFncy5cbiAqICBUaGUgYml0bWFzayBtYXkgYmUgY29tcG9zZWQgb2YgdGhlIGZvbGxvd2luZyBmbGFnczpcbiAqICAgICAxIC0gYF8uYmluZGBcbiAqICAgICAyIC0gYF8uYmluZEtleWBcbiAqICAgICA0IC0gYF8uY3VycnlgIG9yIGBfLmN1cnJ5UmlnaHRgIG9mIGEgYm91bmQgZnVuY3Rpb25cbiAqICAgICA4IC0gYF8uY3VycnlgXG4gKiAgICAxNiAtIGBfLmN1cnJ5UmlnaHRgXG4gKiAgICAzMiAtIGBfLnBhcnRpYWxgXG4gKiAgICA2NCAtIGBfLnBhcnRpYWxSaWdodGBcbiAqICAgMTI4IC0gYF8ucmVhcmdgXG4gKiAgIDI1NiAtIGBfLmFyeWBcbiAqIEBwYXJhbSB7Kn0gW3RoaXNBcmddIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgZnVuY2AuXG4gKiBAcGFyYW0ge0FycmF5fSBbcGFydGlhbHNdIFRoZSBhcmd1bWVudHMgdG8gYmUgcGFydGlhbGx5IGFwcGxpZWQuXG4gKiBAcGFyYW0ge0FycmF5fSBbaG9sZGVyc10gVGhlIGBwYXJ0aWFsc2AgcGxhY2Vob2xkZXIgaW5kZXhlcy5cbiAqIEBwYXJhbSB7QXJyYXl9IFthcmdQb3NdIFRoZSBhcmd1bWVudCBwb3NpdGlvbnMgb2YgdGhlIG5ldyBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbYXJ5XSBUaGUgYXJpdHkgY2FwIG9mIGBmdW5jYC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbYXJpdHldIFRoZSBhcml0eSBvZiBgZnVuY2AuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyB3cmFwcGVkIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBjcmVhdGVXcmFwcGVyKGZ1bmMsIGJpdG1hc2ssIHRoaXNBcmcsIHBhcnRpYWxzLCBob2xkZXJzLCBhcmdQb3MsIGFyeSwgYXJpdHkpIHtcbiAgdmFyIGlzQmluZEtleSA9IGJpdG1hc2sgJiBCSU5EX0tFWV9GTEFHO1xuICBpZiAoIWlzQmluZEtleSAmJiB0eXBlb2YgZnVuYyAhPSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihGVU5DX0VSUk9SX1RFWFQpO1xuICB9XG4gIHZhciBsZW5ndGggPSBwYXJ0aWFscyA/IHBhcnRpYWxzLmxlbmd0aCA6IDA7XG4gIGlmICghbGVuZ3RoKSB7XG4gICAgYml0bWFzayAmPSB+KFBBUlRJQUxfRkxBRyB8IFBBUlRJQUxfUklHSFRfRkxBRyk7XG4gICAgcGFydGlhbHMgPSBob2xkZXJzID0gdW5kZWZpbmVkO1xuICB9XG4gIGFyeSA9IGFyeSA9PT0gdW5kZWZpbmVkID8gYXJ5IDogbmF0aXZlTWF4KHRvSW50ZWdlcihhcnkpLCAwKTtcbiAgYXJpdHkgPSBhcml0eSA9PT0gdW5kZWZpbmVkID8gYXJpdHkgOiB0b0ludGVnZXIoYXJpdHkpO1xuICBsZW5ndGggLT0gaG9sZGVycyA/IGhvbGRlcnMubGVuZ3RoIDogMDtcblxuICBpZiAoYml0bWFzayAmIFBBUlRJQUxfUklHSFRfRkxBRykge1xuICAgIHZhciBwYXJ0aWFsc1JpZ2h0ID0gcGFydGlhbHMsXG4gICAgICAgIGhvbGRlcnNSaWdodCA9IGhvbGRlcnM7XG5cbiAgICBwYXJ0aWFscyA9IGhvbGRlcnMgPSB1bmRlZmluZWQ7XG4gIH1cbiAgdmFyIG5ld0RhdGEgPSBbZnVuYywgYml0bWFzaywgdGhpc0FyZywgcGFydGlhbHMsIGhvbGRlcnMsIHBhcnRpYWxzUmlnaHQsIGhvbGRlcnNSaWdodCwgYXJnUG9zLCBhcnksIGFyaXR5XTtcblxuICBmdW5jID0gbmV3RGF0YVswXTtcbiAgYml0bWFzayA9IG5ld0RhdGFbMV07XG4gIHRoaXNBcmcgPSBuZXdEYXRhWzJdO1xuICBwYXJ0aWFscyA9IG5ld0RhdGFbM107XG4gIGhvbGRlcnMgPSBuZXdEYXRhWzRdO1xuICBhcml0eSA9IG5ld0RhdGFbOV0gPSBuZXdEYXRhWzldID09IG51bGxcbiAgICA/IChpc0JpbmRLZXkgPyAwIDogZnVuYy5sZW5ndGgpXG4gICAgOiBuYXRpdmVNYXgobmV3RGF0YVs5XSAtIGxlbmd0aCwgMCk7XG5cbiAgaWYgKCFhcml0eSAmJiBiaXRtYXNrICYgKENVUlJZX0ZMQUcgfCBDVVJSWV9SSUdIVF9GTEFHKSkge1xuICAgIGJpdG1hc2sgJj0gfihDVVJSWV9GTEFHIHwgQ1VSUllfUklHSFRfRkxBRyk7XG4gIH1cbiAgaWYgKCFiaXRtYXNrIHx8IGJpdG1hc2sgPT0gQklORF9GTEFHKSB7XG4gICAgdmFyIHJlc3VsdCA9IGNyZWF0ZUJhc2VXcmFwcGVyKGZ1bmMsIGJpdG1hc2ssIHRoaXNBcmcpO1xuICB9IGVsc2UgaWYgKGJpdG1hc2sgPT0gQ1VSUllfRkxBRyB8fCBiaXRtYXNrID09IENVUlJZX1JJR0hUX0ZMQUcpIHtcbiAgICByZXN1bHQgPSBjcmVhdGVDdXJyeVdyYXBwZXIoZnVuYywgYml0bWFzaywgYXJpdHkpO1xuICB9IGVsc2UgaWYgKChiaXRtYXNrID09IFBBUlRJQUxfRkxBRyB8fCBiaXRtYXNrID09IChCSU5EX0ZMQUcgfCBQQVJUSUFMX0ZMQUcpKSAmJiAhaG9sZGVycy5sZW5ndGgpIHtcbiAgICByZXN1bHQgPSBjcmVhdGVQYXJ0aWFsV3JhcHBlcihmdW5jLCBiaXRtYXNrLCB0aGlzQXJnLCBwYXJ0aWFscyk7XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ID0gY3JlYXRlSHlicmlkV3JhcHBlci5hcHBseSh1bmRlZmluZWQsIG5ld0RhdGEpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogUmVvcmRlciBgYXJyYXlgIGFjY29yZGluZyB0byB0aGUgc3BlY2lmaWVkIGluZGV4ZXMgd2hlcmUgdGhlIGVsZW1lbnQgYXRcbiAqIHRoZSBmaXJzdCBpbmRleCBpcyBhc3NpZ25lZCBhcyB0aGUgZmlyc3QgZWxlbWVudCwgdGhlIGVsZW1lbnQgYXRcbiAqIHRoZSBzZWNvbmQgaW5kZXggaXMgYXNzaWduZWQgYXMgdGhlIHNlY29uZCBlbGVtZW50LCBhbmQgc28gb24uXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byByZW9yZGVyLlxuICogQHBhcmFtIHtBcnJheX0gaW5kZXhlcyBUaGUgYXJyYW5nZWQgYXJyYXkgaW5kZXhlcy5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBgYXJyYXlgLlxuICovXG5mdW5jdGlvbiByZW9yZGVyKGFycmF5LCBpbmRleGVzKSB7XG4gIHZhciBhcnJMZW5ndGggPSBhcnJheS5sZW5ndGgsXG4gICAgICBsZW5ndGggPSBuYXRpdmVNaW4oaW5kZXhlcy5sZW5ndGgsIGFyckxlbmd0aCksXG4gICAgICBvbGRBcnJheSA9IGNvcHlBcnJheShhcnJheSk7XG5cbiAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgdmFyIGluZGV4ID0gaW5kZXhlc1tsZW5ndGhdO1xuICAgIGFycmF5W2xlbmd0aF0gPSBpc0luZGV4KGluZGV4LCBhcnJMZW5ndGgpID8gb2xkQXJyYXlbaW5kZXhdIDogdW5kZWZpbmVkO1xuICB9XG4gIHJldHVybiBhcnJheTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYEZ1bmN0aW9uYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGNvcnJlY3RseSBjbGFzc2lmaWVkLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNGdW5jdGlvbihfKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oL2FiYy8pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWx1ZSkge1xuICAvLyBUaGUgdXNlIG9mIGBPYmplY3QjdG9TdHJpbmdgIGF2b2lkcyBpc3N1ZXMgd2l0aCB0aGUgYHR5cGVvZmAgb3BlcmF0b3JcbiAgLy8gaW4gU2FmYXJpIDggd2hpY2ggcmV0dXJucyAnb2JqZWN0JyBmb3IgdHlwZWQgYXJyYXkgY29uc3RydWN0b3JzLCBhbmRcbiAgLy8gUGhhbnRvbUpTIDEuOSB3aGljaCByZXR1cm5zICdmdW5jdGlvbicgZm9yIGBOb2RlTGlzdGAgaW5zdGFuY2VzLlxuICB2YXIgdGFnID0gaXNPYmplY3QodmFsdWUpID8gb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgOiAnJztcbiAgcmV0dXJuIHRhZyA9PSBmdW5jVGFnIHx8IHRhZyA9PSBnZW5UYWc7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlIFtsYW5ndWFnZSB0eXBlXShodHRwczovL2VzNS5naXRodWIuaW8vI3g4KSBvZiBgT2JqZWN0YC5cbiAqIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiAhIXZhbHVlICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhbiBpbnRlZ2VyLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIGZ1bmN0aW9uIGlzIGxvb3NlbHkgYmFzZWQgb24gW2BUb0ludGVnZXJgXShodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtdG9pbnRlZ2VyKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgaW50ZWdlci5cbiAqIEBleGFtcGxlXG4gKlxuICogXy50b0ludGVnZXIoMyk7XG4gKiAvLyA9PiAzXG4gKlxuICogXy50b0ludGVnZXIoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiAwXG4gKlxuICogXy50b0ludGVnZXIoSW5maW5pdHkpO1xuICogLy8gPT4gMS43OTc2OTMxMzQ4NjIzMTU3ZSszMDhcbiAqXG4gKiBfLnRvSW50ZWdlcignMycpO1xuICogLy8gPT4gM1xuICovXG5mdW5jdGlvbiB0b0ludGVnZXIodmFsdWUpIHtcbiAgaWYgKCF2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gMCA/IHZhbHVlIDogMDtcbiAgfVxuICB2YWx1ZSA9IHRvTnVtYmVyKHZhbHVlKTtcbiAgaWYgKHZhbHVlID09PSBJTkZJTklUWSB8fCB2YWx1ZSA9PT0gLUlORklOSVRZKSB7XG4gICAgdmFyIHNpZ24gPSAodmFsdWUgPCAwID8gLTEgOiAxKTtcbiAgICByZXR1cm4gc2lnbiAqIE1BWF9JTlRFR0VSO1xuICB9XG4gIHZhciByZW1haW5kZXIgPSB2YWx1ZSAlIDE7XG4gIHJldHVybiB2YWx1ZSA9PT0gdmFsdWUgPyAocmVtYWluZGVyID8gdmFsdWUgLSByZW1haW5kZXIgOiB2YWx1ZSkgOiAwO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBudW1iZXIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgbnVtYmVyLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRvTnVtYmVyKDMpO1xuICogLy8gPT4gM1xuICpcbiAqIF8udG9OdW1iZXIoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiA1ZS0zMjRcbiAqXG4gKiBfLnRvTnVtYmVyKEluZmluaXR5KTtcbiAqIC8vID0+IEluZmluaXR5XG4gKlxuICogXy50b051bWJlcignMycpO1xuICogLy8gPT4gM1xuICovXG5mdW5jdGlvbiB0b051bWJlcih2YWx1ZSkge1xuICBpZiAoaXNPYmplY3QodmFsdWUpKSB7XG4gICAgdmFyIG90aGVyID0gaXNGdW5jdGlvbih2YWx1ZS52YWx1ZU9mKSA/IHZhbHVlLnZhbHVlT2YoKSA6IHZhbHVlO1xuICAgIHZhbHVlID0gaXNPYmplY3Qob3RoZXIpID8gKG90aGVyICsgJycpIDogb3RoZXI7XG4gIH1cbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gMCA/IHZhbHVlIDogK3ZhbHVlO1xuICB9XG4gIHZhbHVlID0gdmFsdWUucmVwbGFjZShyZVRyaW0sICcnKTtcbiAgdmFyIGlzQmluYXJ5ID0gcmVJc0JpbmFyeS50ZXN0KHZhbHVlKTtcbiAgcmV0dXJuIChpc0JpbmFyeSB8fCByZUlzT2N0YWwudGVzdCh2YWx1ZSkpXG4gICAgPyBmcmVlUGFyc2VJbnQodmFsdWUuc2xpY2UoMiksIGlzQmluYXJ5ID8gMiA6IDgpXG4gICAgOiAocmVJc0JhZEhleC50ZXN0KHZhbHVlKSA/IE5BTiA6ICt2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlV3JhcHBlcjtcbiIsIi8qKlxuICogbG9kYXNoIDMuMC4xIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE2IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTYgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cblxuLyoqIFVzZWQgdG8gZGV0ZXJtaW5lIGlmIHZhbHVlcyBhcmUgb2YgdGhlIGxhbmd1YWdlIHR5cGUgYE9iamVjdGAuICovXG52YXIgb2JqZWN0VHlwZXMgPSB7XG4gICdmdW5jdGlvbic6IHRydWUsXG4gICdvYmplY3QnOiB0cnVlXG59O1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGV4cG9ydHNgLiAqL1xudmFyIGZyZWVFeHBvcnRzID0gKG9iamVjdFR5cGVzW3R5cGVvZiBleHBvcnRzXSAmJiBleHBvcnRzICYmICFleHBvcnRzLm5vZGVUeXBlKVxuICA/IGV4cG9ydHNcbiAgOiB1bmRlZmluZWQ7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgbW9kdWxlYC4gKi9cbnZhciBmcmVlTW9kdWxlID0gKG9iamVjdFR5cGVzW3R5cGVvZiBtb2R1bGVdICYmIG1vZHVsZSAmJiAhbW9kdWxlLm5vZGVUeXBlKVxuICA/IG1vZHVsZVxuICA6IHVuZGVmaW5lZDtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gY2hlY2tHbG9iYWwoZnJlZUV4cG9ydHMgJiYgZnJlZU1vZHVsZSAmJiB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCk7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgc2VsZmAuICovXG52YXIgZnJlZVNlbGYgPSBjaGVja0dsb2JhbChvYmplY3RUeXBlc1t0eXBlb2Ygc2VsZl0gJiYgc2VsZik7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgd2luZG93YC4gKi9cbnZhciBmcmVlV2luZG93ID0gY2hlY2tHbG9iYWwob2JqZWN0VHlwZXNbdHlwZW9mIHdpbmRvd10gJiYgd2luZG93KTtcblxuLyoqIERldGVjdCBgdGhpc2AgYXMgdGhlIGdsb2JhbCBvYmplY3QuICovXG52YXIgdGhpc0dsb2JhbCA9IGNoZWNrR2xvYmFsKG9iamVjdFR5cGVzW3R5cGVvZiB0aGlzXSAmJiB0aGlzKTtcblxuLyoqXG4gKiBVc2VkIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0LlxuICpcbiAqIFRoZSBgdGhpc2AgdmFsdWUgaXMgdXNlZCBpZiBpdCdzIHRoZSBnbG9iYWwgb2JqZWN0IHRvIGF2b2lkIEdyZWFzZW1vbmtleSdzXG4gKiByZXN0cmljdGVkIGB3aW5kb3dgIG9iamVjdCwgb3RoZXJ3aXNlIHRoZSBgd2luZG93YCBvYmplY3QgaXMgdXNlZC5cbiAqL1xudmFyIHJvb3QgPSBmcmVlR2xvYmFsIHx8XG4gICgoZnJlZVdpbmRvdyAhPT0gKHRoaXNHbG9iYWwgJiYgdGhpc0dsb2JhbC53aW5kb3cpKSAmJiBmcmVlV2luZG93KSB8fFxuICAgIGZyZWVTZWxmIHx8IHRoaXNHbG9iYWwgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIGdsb2JhbCBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge251bGx8T2JqZWN0fSBSZXR1cm5zIGB2YWx1ZWAgaWYgaXQncyBhIGdsb2JhbCBvYmplY3QsIGVsc2UgYG51bGxgLlxuICovXG5mdW5jdGlvbiBjaGVja0dsb2JhbCh2YWx1ZSkge1xuICByZXR1cm4gKHZhbHVlICYmIHZhbHVlLk9iamVjdCA9PT0gT2JqZWN0KSA/IHZhbHVlIDogbnVsbDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSByb290O1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjEgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cbnZhciBjcmVhdGVXcmFwcGVyID0gcmVxdWlyZSgnbG9kYXNoLl9jcmVhdGV3cmFwcGVyJyk7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgYml0bWFza3MgZm9yIHdyYXBwZXIgbWV0YWRhdGEuICovXG52YXIgUEFSVElBTF9GTEFHID0gMzI7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgcHJvdmlkZXMgYHZhbHVlYCB0byB0aGUgd3JhcHBlciBmdW5jdGlvbiBhcyBpdHNcbiAqIGZpcnN0IGFyZ3VtZW50LiBBbnkgYWRkaXRpb25hbCBhcmd1bWVudHMgcHJvdmlkZWQgdG8gdGhlIGZ1bmN0aW9uIGFyZVxuICogYXBwZW5kZWQgdG8gdGhvc2UgcHJvdmlkZWQgdG8gdGhlIHdyYXBwZXIgZnVuY3Rpb24uIFRoZSB3cmFwcGVyIGlzIGludm9rZWRcbiAqIHdpdGggdGhlIGB0aGlzYCBiaW5kaW5nIG9mIHRoZSBjcmVhdGVkIGZ1bmN0aW9uLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHdyYXAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB3cmFwcGVyIFRoZSB3cmFwcGVyIGZ1bmN0aW9uLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBwID0gXy53cmFwKF8uZXNjYXBlLCBmdW5jdGlvbihmdW5jLCB0ZXh0KSB7XG4gKiAgIHJldHVybiAnPHA+JyArIGZ1bmModGV4dCkgKyAnPC9wPic7XG4gKiB9KTtcbiAqXG4gKiBwKCdmcmVkLCBiYXJuZXksICYgcGViYmxlcycpO1xuICogLy8gPT4gJzxwPmZyZWQsIGJhcm5leSwgJmFtcDsgcGViYmxlczwvcD4nXG4gKi9cbmZ1bmN0aW9uIHdyYXAodmFsdWUsIHdyYXBwZXIpIHtcbiAgd3JhcHBlciA9IHdyYXBwZXIgPT0gbnVsbCA/IGlkZW50aXR5IDogd3JhcHBlcjtcbiAgcmV0dXJuIGNyZWF0ZVdyYXBwZXIod3JhcHBlciwgUEFSVElBTF9GTEFHLCB1bmRlZmluZWQsIFt2YWx1ZV0sIFtdKTtcbn1cblxuLyoqXG4gKiBUaGlzIG1ldGhvZCByZXR1cm5zIHRoZSBmaXJzdCBhcmd1bWVudCBwcm92aWRlZCB0byBpdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IFV0aWxpdHlcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgQW55IHZhbHVlLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgYHZhbHVlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ3VzZXInOiAnZnJlZCcgfTtcbiAqXG4gKiBfLmlkZW50aXR5KG9iamVjdCkgPT09IG9iamVjdDtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaWRlbnRpdHkodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHdyYXA7XG4iLCJ2YXIgTyA9IHJlcXVpcmUoXCJvb2xvbmdcIilcbnZhciBGSVJTVF9MSU5FID0gL14uKiQvbVxubW9kdWxlLmV4cG9ydHMgPSBBc3NlcnRpb25FcnJvclxuXG4vKipcbiAqIEVycm9yIG9iamVjdCB0aHJvd24gd2hlbiBhbiBhc3NlcnRpb24gZmFpbHMuXG4gKlxuICogQGNsYXNzIEFzc2VydGlvbkVycm9yXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSBtZXNzYWdlXG4gKiBAcGFyYW0gW29wdGlvbnNdXG4gKi9cbmZ1bmN0aW9uIEFzc2VydGlvbkVycm9yKG1zZywgb3B0cykge1xuICB0aGlzLm1lc3NhZ2UgPSBtc2dcblxuICAvKipcbiAgICogVGhlIGFzc2VydGVkIG9iamVjdC5cbiAgICpcbiAgICogQHByb3BlcnR5IGFjdHVhbFxuICAgKi9cbiAgaWYgKG9wdHMgJiYgXCJhY3R1YWxcIiBpbiBvcHRzKSB0aGlzLmFjdHVhbCA9IG9wdHMuYWN0dWFsXG5cbiAgLyoqXG4gICAqIElmIHRoZSBtYXRjaGVyIHRvb2sgYW4gYXJndW1lbnQgb3IgYXNzZXJ0ZWQgYWdhaW5zdCBzb21ldGhpbmcgKGxpa2VcbiAgICogYGZvby5tdXN0LmJlLnRydWUoKWApLCB0aGVuIHRoaXMgaXMgdGhlIGV4cGVjdGVkIHZhbHVlLlxuICAgKlxuICAgKiBAcHJvcGVydHkgZXhwZWN0ZWRcbiAgICovXG4gIGlmIChvcHRzICYmIFwiZXhwZWN0ZWRcIiBpbiBvcHRzKSB0aGlzLmV4cGVjdGVkID0gb3B0cy5leHBlY3RlZFxuXG4gIC8qKlxuICAgKiBXaGV0aGVyIGl0IG1ha2VzIHNlbnNlIHRvIGNvbXBhcmUgb2JqZWN0cyBncmFudWxhcmx5IG9yIGV2ZW4gc2hvdyBhIGRpZmZcbiAgICogdmlldyBvZiB0aGUgb2JqZWN0cyBpbnZvbHZlZC4gIFxuICAgKlxuICAgKiBNb3N0IG1hdGNoZXJzIChlLmcuIFtgZW1wdHlgXSgjTXVzdC5wcm90b3R5cGUuZW1wdHkpIGFuZFxuICAgKiBbYHN0cmluZ2BdKCNNdXN0LnByb3RvdHlwZS5zdHJpbmcpKSBhcmUgY29uY3JldGUsIHN0cmljdCBhbmQgYXRvbWljIGFuZFxuICAgKiBkb24ndCBsZW5kIHRoZW1zZWx2ZXMgdG8gYmUgY29tcGFyZWQgcHJvcGVydHkgYnkgcHJvcGVydHkuICBPdGhlcnMgaG93ZXZlcixcbiAgICogbGlrZSBbYGVxbGBdKCNNdXN0LnByb3RvdHlwZS5lcWwpLCBhcmUgbW9yZSBncmFudWxhciBhbmQgY29tcGFyaW5nIHRoZW1cbiAgICogbGluZSBieSBsaW5lIGhlbHBzIHVuZGVyc3RhbmQgaG93IHRoZXkgZGlmZmVyLlxuICAgKlxuICAgKiBAcHJvcGVydHkgZGlmZmFibGVcbiAgICovXG4gIGlmIChvcHRzICYmIFwiZGlmZmFibGVcIiBpbiBvcHRzKSB0aGlzLmRpZmZhYmxlID0gb3B0cy5kaWZmYWJsZVxuXG4gIC8qKlxuICAgKiBUaGUgc3RhY2sgdHJhY2Ugc3RhcnRpbmcgZnJvbSB0aGUgY29kZSB0aGF0IGNhbGxlZCBgbXVzdGAuXG4gICAqXG4gICAqIEBwcm9wZXJ0eSBzdGFja1xuICAgKi9cbiAgaWYgKG9wdHMgJiYgb3B0cy5zdGFjayAhPSBudWxsKSBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJzdGFja1wiLCB7XG4gICAgdmFsdWU6IG9wdHMuc3RhY2sucmVwbGFjZShGSVJTVF9MSU5FLCB0aGlzKSxcbiAgICBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlXG4gIH0pXG4gIGVsc2UgaWYgKEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKVxuICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIG9wdHMgJiYgb3B0cy5jYWxsZXIgfHwgdGhpcy5jb25zdHJ1Y3Rvcilcbn1cblxuQXNzZXJ0aW9uRXJyb3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShFcnJvci5wcm90b3R5cGUsIHtcbiAgY29uc3RydWN0b3I6IHt2YWx1ZTogQXNzZXJ0aW9uRXJyb3IsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWV9XG59KVxuXG5Bc3NlcnRpb25FcnJvci5wcm90b3R5cGUubmFtZSA9IFwiQXNzZXJ0aW9uRXJyb3JcIlxuXG4vKipcbiAqIFNvbWUgdGVzdCBydW5uZXJzIChsaWtlIFtNb2NoYV0oaHR0cDovL3Zpc2lvbm1lZGlhLmdpdGh1Yi5pby9tb2NoYS8pKSBleHBlY3RcbiAqIHRoaXMgcHJvcGVydHkgaW5zdGVhZC5cbiAqXG4gKiBAcHJvcGVydHkgc2hvd0RpZmZcbiAqIEBhbGlhcyBkaWZmYWJsZVxuICovXG5PLmRlZmluZUdldHRlcihBc3NlcnRpb25FcnJvci5wcm90b3R5cGUsIFwic2hvd0RpZmZcIiwgZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmRpZmZhYmxlXG59KVxuIiwiZXhwb3J0cy5zZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbihvYmosIHByb3RvdHlwZSkge1xuICAvKiBlc2xpbnQgbm8tcHJvdG86IDAgKi9cbiAgb2JqLl9fcHJvdG9fXyA9IHByb3RvdHlwZVxuICByZXR1cm4gb2JqXG59XG5cbmV4cG9ydHMuc3RhcnRzV2l0aCA9IFN0cmluZy5wcm90b3R5cGUuc3RhcnRzV2l0aCA/XG4gIEZ1bmN0aW9uLmNhbGwuYmluZChTdHJpbmcucHJvdG90eXBlLnN0YXJ0c1dpdGgpIDpcbiAgZnVuY3Rpb24oaGF5c3RhY2ssIG5lZWRsZSkge1xuICByZXR1cm4gaGF5c3RhY2subGFzdEluZGV4T2YobmVlZGxlLCAwKSA9PT0gMFxufVxuXG5leHBvcnRzLmVuZHNXaXRoID0gU3RyaW5nLnByb3RvdHlwZS5lbmRzV2l0aCA/XG4gIEZ1bmN0aW9uLmNhbGwuYmluZChTdHJpbmcucHJvdG90eXBlLmVuZHNXaXRoKSA6XG4gIGZ1bmN0aW9uKGhheXN0YWNrLCBuZWVkbGUpIHtcbiAgcmV0dXJuIGhheXN0YWNrLmluZGV4T2YobmVlZGxlLCBoYXlzdGFjay5sZW5ndGggLSBuZWVkbGUubGVuZ3RoKSA+PSAwXG59XG4iLCJ2YXIga2luZG9mID0gcmVxdWlyZShcImtpbmRvZlwiKVxudmFyIGpzb25pZnkgPSByZXF1aXJlKFwianNvbi1zdHJpbmdpZnktc2FmZVwiKVxudmFyIHNldFByb3RvdHlwZU9mID0gcmVxdWlyZShcIi4vZXM2XCIpLnNldFByb3RvdHlwZU9mXG52YXIgSU5ERU5UID0gbnVsbFxuXG5leHBvcnRzLmNoYWluID0gZnVuY3Rpb24oc2VsZiwgZm4pIHtcbiAgaWYgKHR5cGVvZiBmbiAhPSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJOb3QgYSBmdW5jdGlvbjogXCIgKyBmbilcblxuICAvLyBEb24ndCBzZXQgdG9TdHJpbmcgYXMgaXQgc2VlbXMgdG8gYnJlYWsgXCJzb3VyY2UtbWFwLXN1cHBvcnRcIi4gVGhpcyBpc1xuICAvLyBhIGZ1bmN0aW9uIHdpdGggYW4gT2JqZWN0IHByb3RvdHlwZSwgYWZ0ZXIgYWxsLlxuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoc2V0UHJvdG90eXBlT2YoZm4uYmluZChzZWxmKSwgc2VsZiksIHtcbiAgICBiaW5kOiB7dmFsdWU6IEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseSwgY29uZmlndXJhYmxlOiB0cnVlLCB3cml0YWJsZTogdHJ1ZX0sXG4gICAgY2FsbDoge3ZhbHVlOiBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHksIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWV9LFxuICAgIGFwcGx5OiB7dmFsdWU6IEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseSwgY29uZmlndXJhYmxlOiB0cnVlLCB3cml0YWJsZTogdHJ1ZX1cbiAgfSlcbn1cblxuZXhwb3J0cy5zdHJpbmdpZnkgPSBmdW5jdGlvbiBzdHJpbmdpZnkob2JqKSB7XG4gIHZhciByb290ID0gb2JqXG5cbiAgc3dpdGNoIChraW5kb2Yob2JqKSkge1xuICAgIC8vIEFsbG93IGZhbGxpbmcgdGhyb3VnaDpcbiAgICAvKiBqc2hpbnQgLVcwODYgKi9cbiAgICAvKiBlc2xpbnQgbm8tZmFsbHRocm91Z2g6IDAgKi9cbiAgICBjYXNlIFwibnVsbFwiOiByZXR1cm4gXCJudWxsXCJcbiAgICBjYXNlIFwidW5kZWZpbmVkXCI6IHJldHVybiBcInVuZGVmaW5lZFwiXG4gICAgY2FzZSBcIm51bWJlclwiOiByZXR1cm4gb2JqLnRvU3RyaW5nKClcbiAgICBjYXNlIFwic3RyaW5nXCI6IHJldHVybiBKU09OLnN0cmluZ2lmeShvYmopXG4gICAgY2FzZSBcInN5bWJvbFwiOiByZXR1cm4gb2JqLnRvU3RyaW5nKClcbiAgICBjYXNlIFwicmVnZXhwXCI6IHJldHVybiBvYmoudG9TdHJpbmcoKVxuICAgIGNhc2UgXCJkYXRlXCI6IHJldHVybiBvYmoudG9JU09TdHJpbmcoKVxuICAgIGNhc2UgXCJmdW5jdGlvblwiOiByZXR1cm4gb2JqLnRvU3RyaW5nKClcblxuICAgIGNhc2UgXCJvYmplY3RcIjpcbiAgICAgIG9iaiA9IGNsb25lKG9iailcbiAgICAgIGlmIChyb290IGluc3RhbmNlb2YgRXJyb3IpIG9iai5tZXNzYWdlID0gcm9vdC5tZXNzYWdlXG4gICAgICAvLyBGYWxsIHRocm91Z2guXG5cbiAgICBkZWZhdWx0OiByZXR1cm4ganNvbmlmeShvYmosIHN0cmluZ2lmeVZhbHVlLCBJTkRFTlQpXG4gIH1cbn1cblxuZnVuY3Rpb24gY2xvbmUob2JqKSB7XG4gIHZhciBjbG9uZSA9IHt9LCB2YWx1ZVxuICBmb3IgKHZhciBrZXkgaW4gb2JqKSBjbG9uZVtrZXldID0gKHZhbHVlID0gb2JqW2tleV0pID09PSBvYmogPyBjbG9uZSA6IHZhbHVlXG4gIHJldHVybiBjbG9uZVxufVxuXG5mdW5jdGlvbiBzdHJpbmdpZnlWYWx1ZShrZXksIHZhbHVlKSB7XG4gIHN3aXRjaCAoa2luZG9mKHZhbHVlKSkge1xuICAgIGNhc2UgXCJ1bmRlZmluZWRcIjogcmV0dXJuIFwiW1VuZGVmaW5lZF1cIlxuICAgIGNhc2UgXCJudW1iZXJcIjogcmV0dXJuIGlzTmFOKHZhbHVlKSA/IFwiW05hTl1cIiA6IHZhbHVlXG4gICAgY2FzZSBcInN5bWJvbFwiOiByZXR1cm4gdmFsdWUudG9TdHJpbmcoKVxuICAgIGNhc2UgXCJyZWdleHBcIjogcmV0dXJuIHZhbHVlLnRvU3RyaW5nKClcbiAgICBkZWZhdWx0OiByZXR1cm4gdmFsdWVcbiAgfVxufVxuIiwidmFyIEFzc2VydGlvbkVycm9yID0gcmVxdWlyZShcIi4vYXNzZXJ0aW9uX2Vycm9yXCIpXG52YXIgVGhlbmFibGUgPSByZXF1aXJlKFwiLi90aGVuYWJsZVwiKVxudmFyIHRoZW4gPSBUaGVuYWJsZS5wcm90b3R5cGUudGhlblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG11c3QpIHtcbiAgcmV0dXJuIFRoZW5hYmxlKG11c3QsIHByb21pc2lmeSlcbn1cblxuZnVuY3Rpb24gcHJvbWlzaWZ5KGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiBtYXRjaGVyKCkge1xuICAgIHZhciBtdXN0ID0gT2JqZWN0LmNyZWF0ZSh0aGlzKVxuICAgIGlmIChFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSkgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UobXVzdCwgbWF0Y2hlcilcbiAgICByZXR1cm4gdGhpcy5hY3R1YWwudGhlbihyYWlzZSwgdGhlbi5iaW5kKG11c3QsIGZuLCBhcmd1bWVudHMpKVxuICB9XG59XG5cbmZ1bmN0aW9uIHJhaXNlKCkgeyB0aHJvdyBuZXcgQXNzZXJ0aW9uRXJyb3IoXCJSZXNvbHZlZFwiKSB9XG4iLCJ2YXIgVGhlbmFibGUgPSByZXF1aXJlKFwiLi90aGVuYWJsZVwiKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG11c3QpIHtcbiAgcmV0dXJuIFRoZW5hYmxlKG11c3QsIHByb21pc2lmeSlcbn1cblxuZnVuY3Rpb24gcHJvbWlzaWZ5KGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiBtYXRjaGVyKCkge1xuICAgIHZhciBtdXN0ID0gT2JqZWN0LmNyZWF0ZSh0aGlzKVxuICAgIGlmIChFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSkgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UobXVzdCwgbWF0Y2hlcilcbiAgICByZXR1cm4gdGhpcy5hY3R1YWwudGhlbihUaGVuYWJsZS5wcm90b3R5cGUudGhlbi5iaW5kKG11c3QsIGZuLCBhcmd1bWVudHMpKVxuICB9XG59XG4iLCJ2YXIgd3JhcCA9IHJlcXVpcmUoXCJsb2Rhc2gud3JhcFwiKVxudmFyIGxvb2t1cEdldHRlciA9IHJlcXVpcmUoXCJvb2xvbmdcIikubG9va3VwR2V0dGVyXG5cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG11c3QsIHByb21pc2lmeSkge1xuICBtdXN0ID0gT2JqZWN0LmNyZWF0ZShtdXN0KVxuXG4gIGZvciAodmFyIG5hbWUgaW4gbXVzdClcbiAgICBpZiAoaGFzRnVuY3Rpb24obXVzdCwgbmFtZSkpIG11c3RbbmFtZV0gPSBwcm9taXNpZnkobXVzdFtuYW1lXSlcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkobXVzdCwgXCJhc3NlcnRcIiwge1xuICAgIHZhbHVlOiB3cmFwKG11c3QuYXNzZXJ0LCBleHBvcnRzLnByb3RvdHlwZS5hc3NlcnQpLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWVcbiAgfSlcblxuICByZXR1cm4gbXVzdFxufVxuXG5leHBvcnRzLnByb3RvdHlwZS5hc3NlcnQgPSBmdW5jdGlvbiBhc3NlcnQob3JpZywgb2ssIG1zZywgb3B0cykge1xuICBvcHRzID0gb3B0cyA/IE9iamVjdC5jcmVhdGUob3B0cykgOiB7fVxuICBpZiAoXCJzdGFja1wiIGluIHRoaXMpIG9wdHMuc3RhY2sgPSB0aGlzLnN0YWNrXG4gIG9yaWcuY2FsbCh0aGlzLCBvaywgbXNnLCBvcHRzKVxufVxuXG5leHBvcnRzLnByb3RvdHlwZS50aGVuID0gZnVuY3Rpb24oZm4sIGFyZ3MsIGFjdHVhbCkge1xuICB0aGlzLmFjdHVhbCA9IGFjdHVhbFxuICBmbi5hcHBseSh0aGlzLCBhcmdzKVxufVxuXG5mdW5jdGlvbiBoYXNGdW5jdGlvbihvYmosIG5hbWUpIHtcbiAgcmV0dXJuICFsb29rdXBHZXR0ZXIob2JqLCBuYW1lKSAmJiB0eXBlb2Ygb2JqW25hbWVdID09IFwiZnVuY3Rpb25cIlxufVxuIiwidmFyIE8gPSByZXF1aXJlKFwib29sb25nXCIpXG52YXIgQXNzZXJ0aW9uRXJyb3IgPSByZXF1aXJlKFwiLi9saWIvYXNzZXJ0aW9uX2Vycm9yXCIpXG52YXIgUmVzb2x2YWJsZSA9IHJlcXVpcmUoXCIuL2xpYi9yZXNvbHZhYmxlXCIpXG52YXIgUmVqZWN0YWJsZSA9IHJlcXVpcmUoXCIuL2xpYi9yZWplY3RhYmxlXCIpXG52YXIga2luZG9mID0gcmVxdWlyZShcImtpbmRvZlwiKVxudmFyIGVnYWwgPSByZXF1aXJlKFwiZWdhbFwiKVxudmFyIGRlZXBFZ2FsID0gZWdhbC5kZWVwRWdhbFxudmFyIHN0cmluZ2lmeSA9IHJlcXVpcmUoXCIuL2xpYlwiKS5zdHJpbmdpZnlcbnZhciBjaGFpbiA9IHJlcXVpcmUoXCIuL2xpYlwiKS5jaGFpblxudmFyIGRlZmluZUdldHRlciA9IE8uZGVmaW5lR2V0dGVyXG52YXIgbG9va3VwR2V0dGVyID0gTy5sb29rdXBHZXR0ZXJcbnZhciBzdGFydHNXaXRoID0gcmVxdWlyZShcIi4vbGliL2VzNlwiKS5zdGFydHNXaXRoXG52YXIgZW5kc1dpdGggPSByZXF1aXJlKFwiLi9saWIvZXM2XCIpLmVuZHNXaXRoXG52YXIgaGFzT3duID0gRnVuY3Rpb24uY2FsbC5iaW5kKE9iamVjdC5oYXNPd25Qcm9wZXJ0eSlcbnZhciBBTlkgPSB7fVxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gTXVzdFxuZXhwb3J0cy5Bc3NlcnRpb25FcnJvciA9IEFzc2VydGlvbkVycm9yXG5leHBvcnRzLnN0cmluZ2lmeSA9IHN0cmluZ2lmeVxuZXhwb3J0cy5jaGFpbiA9IGNoYWluXG5cbi8qKlxuICogVGhlIG1haW4gY2xhc3MgdGhhdCB3cmFwcyB0aGUgYXNzZXJ0ZWQgb2JqZWN0IGFuZCB0aGF0IHlvdSBjYWxsIG1hdGNoZXJzIG9uLlxuICpcbiAqIFRvIGluY2x1ZGUgYSBjdXN0b20gZXJyb3IgbWVzc2FnZSBmb3IgZmFpbHVyZSBjYXNlcywgcGFzcyBhIHN0cmluZyBhcyB0aGVcbiAqIHNlY29uZCBhcmd1bWVudC5cbiAqXG4gKiBNb3N0IG9mIHRoZSB0aW1lIHlvdSdsbCBiZSB1c2luZ1xuICogW2BPYmplY3QucHJvdG90eXBlLm11c3RgXSgjT2JqZWN0LnByb3RvdHlwZS5tdXN0KSB0byBjcmVhdGUgdGhpcyB3cmFwcGVyLCBidXRcbiAqIG9jY2FzaW9uYWxseSB5b3UgbWlnaHQgd2FudCB0byBhc3NlcnQgYG51bGxgcyBvciBgdW5kZWZpbmVkYHMgYW5kIGluIHRob3NlXG4gKiBjYXNlcyBhc3NpZ25pbmcgYE11c3RgIHRvIHNvbWV0aGluZyBsaWtlIGBleHBlY3RgIG9yIGBkZW1hbmRgIHdvcmtzIG5pY2VseS5cbiAqXG4gKiBAZXhhbXBsZVxuICogdHJ1ZS5tdXN0LmJlLnRydWUoKVxuICogW10ubXVzdC5iZS5lbXB0eSgpXG4gKlxuICogdmFyIGV4cGVjdCA9IHJlcXVpcmUoXCJtdXN0XCIpXG4gKiBleHBlY3QobnVsbCkudG8uYmUubnVsbCgpXG4gKlxuICogdmFyIGRlbWFuZCA9IHJlcXVpcmUoXCJtdXN0XCIpXG4gKiBkZW1hbmQodW5kZWZpbmVkLCBcIlRoZSB1bmRlZmluZWQgdW5kZWZpbmVkc1wiKS5iZS51bmRlZmluZWQoKVxuICpcbiAqIEBjbGFzcyBNdXN0XG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSBhY3R1YWxcbiAqIEBwYXJhbSBbbWVzc2FnZV1cbiAqL1xuZnVuY3Rpb24gTXVzdChhY3R1YWwsIG1lc3NhZ2UpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIE11c3QpKSByZXR1cm4gbmV3IE11c3QoYWN0dWFsLCBtZXNzYWdlKVxuICB0aGlzLmFjdHVhbCA9IGFjdHVhbFxuICBpZiAobWVzc2FnZSAhPSBudWxsKSB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlXG59XG5cbi8qKlxuICAqIENhbiBhbHNvIGJlIHVzZWQgYSBwYXNzLXRocm91Z2ggcHJvcGVydHkgZm9yIGEgZmx1ZW50IGNoYWluLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBcIkhlbGxvXCIubXVzdC5iZS5hLnN0cmluZygpXG4gICogbmV3IERhdGUoKS5tdXN0LmJlLmEoRGF0ZSlcbiAgKlxuICAqIEBtZXRob2QgYVxuICAqIEBhbGlhcyBpbnN0YW5jZW9mXG4gICovXG5kZWZpbmVHZXR0ZXIoTXVzdC5wcm90b3R5cGUsIFwiYVwiLCBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIGNoYWluKHRoaXMsIHRoaXMuaW5zdGFuY2VvZilcbn0pXG5cbi8qKlxuICAqIENhbiBhbHNvIGJlIHVzZWQgYSBwYXNzLXRocm91Z2ggcHJvcGVydHkgZm9yIGEgZmx1ZW50IGNoYWluLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBbMSwgMl0ubXVzdC5iZS5hbi5hcnJheSgpXG4gICogbmV3IEF3ZXNvbWVDbGFzcygpLm11c3QuYmUuYW4oQXdlc29tZUNsYXNzKVxuICAqXG4gICogQG1ldGhvZCBhblxuICAqIEBhbGlhcyBpbnN0YW5jZW9mXG4gICovXG5kZWZpbmVHZXR0ZXIoTXVzdC5wcm90b3R5cGUsIFwiYW5cIiwgbG9va3VwR2V0dGVyKE11c3QucHJvdG90eXBlLCBcImFcIikpXG5cbi8qKlxuICAqIFBhc3MtdGhyb3VnaCBwcm9wZXJ0eSBmb3IgYSBmbHVlbnQgY2hhaW4uXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqICg0MikubXVzdC5iZS5hdC5tb3N0KDY5KVxuICAqICgxMzM3KS5tdXN0LmJlLmF0LmxlYXN0KDEzMzcpXG4gICpcbiAgKiBAcHJvcGVydHkgYXRcbiAgKiBAb24gcHJvdG90eXBlXG4gICovXG5kZWZpbmVHZXR0ZXIoTXVzdC5wcm90b3R5cGUsIFwiYXRcIiwgcGFzc3Rocm91Z2gpXG5cbi8qKlxuICAqIENhbiBhbHNvIGJlIHVzZWQgYXMgYSBwYXNzLXRocm91Z2ggcHJvcGVydHkgZm9yIGEgZmx1ZW50IGNoYWluLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiB0cnVlLm11c3QuYmUudHJ1ZSgpXG4gICogKDQyKS5tdXN0LmJlKDQyKVxuICAqXG4gICogQG1ldGhvZCBiZVxuICAqIEBhbGlhcyBlcXVhbFxuICAqL1xuZGVmaW5lR2V0dGVyKE11c3QucHJvdG90eXBlLCBcImJlXCIsIGZ1bmN0aW9uKCkge1xuICByZXR1cm4gY2hhaW4odGhpcywgdGhpcy5lcXVhbClcbn0pXG5cbi8qKlxuICAqIFBhc3MtdGhyb3VnaCBwcm9wZXJ0eSBmb3IgYSBmbHVlbnQgY2hhaW4uXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIFsxLCAyXS5tdXN0LmhhdmUubGVuZ3RoKDIpXG4gICpcbiAgKiBAcHJvcGVydHkgaGF2ZVxuICAqIEBvbiBwcm90b3R5cGVcbiAgKi9cbmRlZmluZUdldHRlcihNdXN0LnByb3RvdHlwZSwgXCJoYXZlXCIsIHBhc3N0aHJvdWdoKVxuXG4vKipcbiAgKiBJbnZlcnNlIHRoZSBhc3NlcnRpb24uICBcbiAgKiBVc2UgaXQgbXVsdGlwbGUgdGltZXMgdG8gY3JlYXRlIGxvdHMgb2YgZnVuIVxuICAqIGB0cnVlLm11c3Qubm90Lm5vdC5iZS50cnVlKClgIDotKVxuICAqXG4gICogQGV4YW1wbGVcbiAgKiB0cnVlLm11c3Qubm90LmJlLnRydWUoKVxuICAqIFtdLm11c3Qubm90LmJlLmVtcHR5KClcbiAgKlxuICAqIEBwcm9wZXJ0eSBub3RcbiAgKiBAb24gcHJvdG90eXBlXG4gICovXG5kZWZpbmVHZXR0ZXIoTXVzdC5wcm90b3R5cGUsIFwibm90XCIsIGZ1bmN0aW9uKCkge1xuICAvLyBOT1RFOiBEZWFyIHJlYWRlciBvciBwbHVnaW4gYXV0aG9yLCBwbGVhc2UgZG9uJ3QgZGVwZW5kIG9uIHRoaXMgcHJvcGVydHlcbiAgLy8gbmFtZSB3aWxsIHJlbWFpbiBhcy1pcy4gSWYgeW91IHJlYWxseSBuZWVkIHRvLCBsZXQgbWUga25vdyBob3cgeW91J2QgbGlrZVxuICAvLyB0byB1c2UgaXQuIFhPLlxuICB2YXIgc2VsZiA9IE9iamVjdC5jcmVhdGUodGhpcylcbiAgc2VsZi5uZWdhdGl2ZSA9ICFzZWxmLm5lZ2F0aXZlXG4gIHJldHVybiBzZWxmXG59KVxuXG4vKipcbiAgKiBQYXNzLXRocm91Z2ggcHJvcGVydHkgZm9yIGEgZmx1ZW50IGNoYWluLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiB2YXIgZXhwZWN0ID0gcmVxdWlyZShcIm11c3RcIilcbiAgKiBleHBlY3QodHJ1ZSkudG8uYmUudHJ1ZSgpXG4gICpcbiAgKiB2YXIgd2lzaCA9IHJlcXVpcmUoXCJtdXN0XCIpXG4gICogd2lzaChsaWZlKS50by5iZS50cnV0aHkoKVxuICAqXG4gICogQHByb3BlcnR5IHRvXG4gICogQG9uIHByb3RvdHlwZVxuICAqL1xuZGVmaW5lR2V0dGVyKE11c3QucHJvdG90eXBlLCBcInRvXCIsIHBhc3N0aHJvdWdoKVxuXG4vKipcbiAqIEFzc2VydCBvYmplY3QgaXMgYHRydWVgLiAgXG4gKiBBIGJveGVkIGJvb2xlYW4gb2JqZWN0IChgbmV3IEJvb2xlYW4odHJ1ZWApIGlzIF9ub3RfIGNvbnNpZGVyZWQgdHJ1ZS5cbiAqXG4gKiBAZXhhbXBsZVxuICogdHJ1ZS5tdXN0LmJlLnRydWUoKVxuICpcbiAqIEBtZXRob2QgdHJ1ZVxuICovXG5NdXN0LnByb3RvdHlwZS50cnVlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuYXNzZXJ0KHRoaXMuYWN0dWFsID09PSB0cnVlLCBcImJlXCIsIHtleHBlY3RlZDogdHJ1ZX0pXG59XG5cbi8qKlxuICogQXNzZXJ0IG9iamVjdCBpcyBgZmFsc2VgLiAgXG4gKiBBIGJveGVkIGJvb2xlYW4gb2JqZWN0IChgbmV3IEJvb2xlYW4oZmFsc2VgKSBpcyBfbm90XyBjb25zaWRlcmVkIGZhbHNlLlxuICpcbiAqIEBleGFtcGxlXG4gKiBmYWxzZS5tdXN0LmJlLmZhbHNlKClcbiAqIEBtZXRob2QgZmFsc2VcbiAqXG4gKi9cbk11c3QucHJvdG90eXBlLmZhbHNlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuYXNzZXJ0KHRoaXMuYWN0dWFsID09PSBmYWxzZSwgXCJiZVwiLCB7ZXhwZWN0ZWQ6IGZhbHNlfSlcbn1cblxuLyoqXG4gKiBBc3NlcnQgb2JqZWN0IGlzIGBOYU5gLlxuICpcbiAqIEBleGFtcGxlXG4gKiBOYU4ubXVzdC5iZS5uYW4oKVxuICpcbiAqIEBtZXRob2QgbmFuXG4gKi9cbk11c3QucHJvdG90eXBlLm5hbiA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmFzc2VydCh0aGlzLmFjdHVhbCAhPT0gdGhpcy5hY3R1YWwsIFwiYmVcIiwge2V4cGVjdGVkOiBOYU59KVxufVxuXG4vKipcbiAqIEFzc2VydCBvYmplY3QgaXMgYG51bGxgLlxuICpcbiAqIEJlY2F1c2UgSmF2YVNjcmlwdCBkb2VzIG5vdCBhbGxvdyBtZXRob2QgY2FsbHMgb24gYG51bGxgLCB5b3UnbGwgaGF2ZSB0b1xuICogd3JhcCBhbiBleHBlY3RlZCBudWxsIHdpdGggW2BNdXN0YF0oI011c3QpLiBBc3NpZ25pbmcgYHJlcXVpcmUoXCJtdXN0XCIpYCB0b1xuICogYGV4cGVjdGAgb3IgYGRlbWFuZGAgd29ya3Mgd2VsbC5cbiAqXG4gKiBJZiB5b3Ugd2FudCB0byBhc3NlcnQgdGhhdCBhbiBvYmplY3QncyBwcm9wZXJ0eSBpcyBgbnVsbGAsIHNlZVxuICogW2Bwcm9wZXJ0eWBdKCNNdXN0LnByb3RvdHlwZS5wcm9wZXJ0eSkuXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBkZW1hbmQgPSByZXF1aXJlKFwibXVzdFwiKVxuICogZGVtYW5kKG51bGwpLmJlLm51bGwoKVxuICpcbiAqIEBtZXRob2QgbnVsbFxuICovXG5NdXN0LnByb3RvdHlwZS5udWxsID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuYXNzZXJ0KHRoaXMuYWN0dWFsID09PSBudWxsLCBcImJlXCIsIHtleHBlY3RlZDogbnVsbH0pXG59XG5cbi8qKlxuICogQXNzZXJ0IG9iamVjdCBpcyBgdW5kZWZpbmVkYC5cbiAqXG4gKiBCZWNhdXNlIEphdmFTY3JpcHQgZG9lcyBub3QgYWxsb3cgbWV0aG9kIGNhbGxzIG9uIGB1bmRlZmluZWRgLCB5b3UnbGwgaGF2ZSB0b1xuICogd3JhcCBhbiBleHBlY3RlZCB1bmRlZmluZWQgd2l0aCBbYE11c3RgXSgjTXVzdCkuIEFzc2lnbmluZyBgcmVxdWlyZShcIm11c3RcIilgXG4gKiB0byBgZXhwZWN0YCBvciBgZGVtYW5kYCB3b3JrcyB3ZWxsLlxuICpcbiAqIElmIHlvdSB3YW50IHRvIGFzc2VydCB0aGF0IGFuIG9iamVjdCdzIHByb3BlcnR5IGlzIGB1bmRlZmluZWRgLCBzZWVcbiAqIFtgcHJvcGVydHlgXSgjTXVzdC5wcm90b3R5cGUucHJvcGVydHkpLlxuICpcbiAqIEBleGFtcGxlXG4gKiB2YXIgZGVtYW5kID0gcmVxdWlyZShcIm11c3RcIilcbiAqIGRlbWFuZCh1bmRlZmluZWQpLmJlLnVuZGVmaW5lZCgpXG4gKlxuICogQG1ldGhvZCB1bmRlZmluZWRcbiAqL1xuTXVzdC5wcm90b3R5cGUudW5kZWZpbmVkID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuYXNzZXJ0KHRoaXMuYWN0dWFsID09PSB1bmRlZmluZWQsIFwiYmVcIiwge2V4cGVjdGVkOiB1bmRlZmluZWR9KVxufVxuXG4vKipcbiAqIEFzc2VydCBvYmplY3QgaXMgYSBib29sZWFuIChgdHJ1ZWAgb3IgYGZhbHNlYCkuICBcbiAqIEJveGVkIGJvb2xlYW4gb2JqZWN0cyAoYG5ldyBCb29sZWFuYCkgYXJlIF9ub3RfIGNvbnNpZGVyZWQgYm9vbGVhbnMuXG4gKlxuICogQGV4YW1wbGVcbiAqIHRydWUubXVzdC5iZS5hLmJvb2xlYW4oKVxuICpcbiAqIEBtZXRob2QgYm9vbGVhblxuICovXG5NdXN0LnByb3RvdHlwZS5ib29sZWFuID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuYXNzZXJ0KHR5cGVvZiB0aGlzLmFjdHVhbCA9PSBcImJvb2xlYW5cIiwgXCJiZSBhIGJvb2xlYW5cIilcbn1cblxuLyoqXG4gKiBBc3NlcnQgb2JqZWN0IGlzIGEgbnVtYmVyLiAgXG4gKiBCb3hlZCBudW1iZXIgb2JqZWN0cyAoYG5ldyBOdW1iZXJgKSBhcmUgX25vdF8gY29uc2lkZXJlZCBudW1iZXJzLlxuICpcbiAqIEBleGFtcGxlXG4gKiAoNDIpLm11c3QuYmUuYS5udW1iZXIoKVxuICpcbiAqIEBtZXRob2QgbnVtYmVyXG4gKi9cbk11c3QucHJvdG90eXBlLm51bWJlciA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmFzc2VydCh0eXBlb2YgdGhpcy5hY3R1YWwgPT0gXCJudW1iZXJcIiwgXCJiZSBhIG51bWJlclwiKVxufVxuXG4vKipcbiAqIEFzc2VydCBvYmplY3QgaXMgYSBzdHJpbmcuICBcbiAqIEJveGVkIHN0cmluZyBvYmplY3RzIChgbmV3IFN0cmluZ2ApIGFyZSBfbm90XyBjb25zaWRlcmVkIHN0cmluZ3MuXG4gKlxuICogQGV4YW1wbGVcbiAqIFwiSGVsbG9cIi5tdXN0LmJlLmEuc3RyaW5nKClcbiAqXG4gKiBAbWV0aG9kIHN0cmluZ1xuICovXG5NdXN0LnByb3RvdHlwZS5zdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5hc3NlcnQodHlwZW9mIHRoaXMuYWN0dWFsID09IFwic3RyaW5nXCIsIFwiYmUgYSBzdHJpbmdcIilcbn1cblxuLyoqXG4gKiBBc3NlcnQgb2JqZWN0IGlzIGEgc3ltYm9sLlxuICpcbiAqIEBleGFtcGxlXG4gKiBTeW1ib2woKS5tdXN0LmJlLmEuc3ltYm9sKClcbiAqXG4gKiBAbWV0aG9kIHN5bWJvbFxuICovXG5NdXN0LnByb3RvdHlwZS5zeW1ib2wgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5hc3NlcnQodHlwZW9mIHRoaXMuYWN0dWFsID09IFwic3ltYm9sXCIsIFwiYmUgYSBzeW1ib2xcIilcbn1cblxuLyoqXG4gKiBBc3NlcnQgb2JqZWN0IGlzIGEgZGF0ZS5cbiAqXG4gKiBAZXhhbXBsZVxuICogbmV3IERhdGUoKS5tdXN0LmJlLmEuZGF0ZSgpXG4gKlxuICogQG1ldGhvZCBkYXRlXG4gKi9cbk11c3QucHJvdG90eXBlLmRhdGUgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5hc3NlcnQoa2luZG9mKHRoaXMuYWN0dWFsKSA9PSBcImRhdGVcIiwgXCJiZSBhIGRhdGVcIilcbn1cblxuLyoqXG4gKiBBc3NlcnQgb2JqZWN0IGlzIGEgcmVndWxhciBleHByZXNzaW9uLlxuICpcbiAqIEBleGFtcGxlXG4gKiAvW2Etel0vLm11c3QuYmUuYS5yZWdleHAoKVxuICpcbiAqIEBtZXRob2QgcmVnZXhwXG4gKi9cbk11c3QucHJvdG90eXBlLnJlZ2V4cCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmFzc2VydChraW5kb2YodGhpcy5hY3R1YWwpID09IFwicmVnZXhwXCIsIFwiYmUgYSByZWd1bGFyIGV4cHJlc3Npb25cIilcbn1cblxuLyoqXG4gKiBBc3NlcnQgb2JqZWN0IGlzIGFuIGFycmF5LlxuICpcbiAqIEBleGFtcGxlXG4gKiBbNDIsIDY5XS5tdXN0LmJlLmFuLmFycmF5KClcbiAqXG4gKiBAbWV0aG9kIGFycmF5XG4gKi9cbk11c3QucHJvdG90eXBlLmFycmF5ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuYXNzZXJ0KEFycmF5LmlzQXJyYXkodGhpcy5hY3R1YWwpLCBcImJlIGFuIGFycmF5XCIpXG59XG5cbi8qKlxuICogQXNzZXJ0IG9iamVjdCBpcyBhIGZ1bmN0aW9uLlxuICpcbiAqIEBleGFtcGxlXG4gKiAoZnVuY3Rpb24oKSB7fSkubXVzdC5iZS5hLmZ1bmN0aW9uKClcbiAqXG4gKiBAbWV0aG9kIGZ1bmN0aW9uXG4gKi9cbk11c3QucHJvdG90eXBlLmZ1bmN0aW9uID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuYXNzZXJ0KHR5cGVvZiB0aGlzLmFjdHVhbCA9PSBcImZ1bmN0aW9uXCIsIFwiYmUgYSBmdW5jdGlvblwiKVxufVxuXG4vKipcbiAqIEFzc2VydCBvYmplY3QgaXMgYW4uLiBvYmplY3QuXG4gKlxuICogQGV4YW1wbGVcbiAqICh7fSkubXVzdC5iZS5hbi5vYmplY3QoKVxuICpcbiAqIEBtZXRob2Qgb2JqZWN0XG4gKi9cbk11c3QucHJvdG90eXBlLm9iamVjdCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgb2sgPSB0aGlzLmFjdHVhbCAmJiB0eXBlb2YgdGhpcy5hY3R1YWwgPT0gXCJvYmplY3RcIlxuICB0aGlzLmFzc2VydChvaywgXCJiZSBhbiBvYmplY3RcIilcbn1cblxuLyoqXG4gKiBBc3NlcnQgb2JqZWN0IGlzIHRydXRoeSAoYCEhb2JqYCkuXG4gKlxuICogT25seSBgbnVsbGAsIGB1bmRlZmluZWRgLCBgMGAsIGBmYWxzZWAgYW5kIGBcIlwiYCBhcmUgZmFsc3kgaW4gSmF2YVNjcmlwdC5cbiAqIEV2ZXJ5dGhpbmcgZWxzZSBpcyB0cnV0aHkuXG4gKlxuICogQGV4YW1wbGVcbiAqICg0MikubXVzdC5iZS50cnV0aHkoKVxuICogXCJIZWxsb1wiLm11c3QuYmUudHJ1dGh5KClcbiAqXG4gKiBAbWV0aG9kIHRydXRoeVxuICovXG5NdXN0LnByb3RvdHlwZS50cnV0aHkgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5hc3NlcnQodGhpcy5hY3R1YWwsIFwiYmUgdHJ1dGh5XCIpXG59XG5cbi8qKlxuICogQXNzZXJ0IG9iamVjdCBpcyBmYWxzeSAoYCFvYmpgKS5cbiAqXG4gKiBPbmx5IGBudWxsYCwgYHVuZGVmaW5lZGAsIGAwYCwgYGZhbHNlYCBhbmQgYFwiXCJgIGFyZSBmYWxzeSBpbiBKYXZhU2NyaXB0LlxuICogRXZlcnl0aGluZyBlbHNlIGlzIHRydXRoeS5cbiAqXG4gKiBAZXhhbXBsZVxuICogMC5tdXN0LmJlLmZhbHN5KClcbiAqIFwiXCIubXVzdC5iZS5mYWxzeSgpXG4gKlxuICogQG1ldGhvZCBmYWxzeVxuICovXG5NdXN0LnByb3RvdHlwZS5mYWxzeSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmFzc2VydCghdGhpcy5hY3R1YWwsIFwiYmUgZmFsc3lcIilcbn1cblxuLyoqXG4gKiBBc3NlcnQgb2JqZWN0IGlzIGV4aXN0cyBhbmQgdGhlcmVieSBpcyBub3QgbnVsbCBvciB1bmRlZmluZWQuXG4gKlxuICogQGV4YW1wbGVcbiAqIDAubXVzdC5leGlzdCgpXG4gKiBcIlwiLm11c3QuZXhpc3QoKVxuICogKHt9KS5tdXN0LmV4aXN0KClcbiAqXG4gKiBAbWV0aG9kIGV4aXN0XG4gKi9cbk11c3QucHJvdG90eXBlLmV4aXN0ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuYXNzZXJ0KHRoaXMuYWN0dWFsICE9IG51bGwsIFwiZXhpc3RcIilcbn1cblxuLyoqXG4gKiBBc3NlcnQgdGhhdCBhbiBvYmplY3QgaXMgYW4gaW5zdGFuY2Ugb2Ygc29tZXRoaW5nLiAgXG4gKiBVc2VzIGBvYmogaW5zdGFuY2VvZiBleHBlY3RlZGAuXG4gKlxuICogQGV4YW1wbGVcbiAqIG5ldyBEYXRlKCkubXVzdC5iZS5hbi5pbnN0YW5jZW9mKERhdGUpXG4gKlxuICogQG1ldGhvZCBpbnN0YW5jZW9mXG4gKiBAcGFyYW0gY2xhc3NcbiAqL1xuTXVzdC5wcm90b3R5cGUuaW5zdGFuY2VvZiA9IGZ1bmN0aW9uKGV4cGVjdGVkKSB7XG4gIHZhciBvayA9IHRoaXMuYWN0dWFsIGluc3RhbmNlb2YgZXhwZWN0ZWRcbiAgdGhpcy5hc3NlcnQob2ssIGluc3RhbmNlb2ZNZXNzYWdlLmJpbmQodGhpcywgZXhwZWN0ZWQpLCB7ZXhwZWN0ZWQ6IGV4cGVjdGVkfSlcbn1cblxuZnVuY3Rpb24gaW5zdGFuY2VvZk1lc3NhZ2UoZXhwZWN0ZWQpIHtcbiAgdmFyIHR5cGUgPSBleHBlY3RlZC5kaXNwbGF5TmFtZSB8fCBleHBlY3RlZC5uYW1lIHx8IHN0cmluZ2lmeShleHBlY3RlZClcbiAgcmV0dXJuIFwiYmUgYW4gaW5zdGFuY2Ugb2YgXCIgKyB0eXBlXG59XG5cbi8qKlxuICogQG1ldGhvZCBpbnN0YW5jZU9mXG4gKiBAYWxpYXMgaW5zdGFuY2VvZlxuICovXG5NdXN0LnByb3RvdHlwZS5pbnN0YW5jZU9mID0gTXVzdC5wcm90b3R5cGUuaW5zdGFuY2VvZlxuXG4vKipcbiAqIEFzc2VydCB0aGF0IGFuIG9iamVjdCBpcyBlbXB0eS4gIFxuICogQ2hlY2tzIGVpdGhlciB0aGUgYGxlbmd0aGAgZm9yIGFycmF5cyBhbmQgc3RyaW5ncyBvciB0aGUgY291bnQgb2ZcbiAqIGVudW1lcmFibGUga2V5cy4gSW5oZXJpdGVkIGtleXMgYWxzbyBjb3VudGVkLlxuICpcbiAqIEBleGFtcGxlXG4gKiBcIlwiLm11c3QuYmUuZW1wdHkoKVxuICogW10ubXVzdC5iZS5lbXB0eSgpXG4gKiAoe30pLm11c3QuYmUuZW1wdHkoKVxuICpcbiAqIEBtZXRob2QgZW1wdHlcbiAqL1xuTXVzdC5wcm90b3R5cGUuZW1wdHkgPSBmdW5jdGlvbigpIHtcbiAgdmFyIG9rID0gZmFsc2VcbiAgaWYgKHR5cGVvZiB0aGlzLmFjdHVhbCA9PT0gXCJzdHJpbmdcIiB8fCBBcnJheS5pc0FycmF5KHRoaXMuYWN0dWFsKSlcbiAgICBvayA9IHRoaXMuYWN0dWFsLmxlbmd0aCA9PT0gMFxuICBlbHNlIGlmICh0eXBlb2YgdGhpcy5hY3R1YWwgPT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgdGhpcy5hY3R1YWwgPT0gXCJmdW5jdGlvblwiKVxuICAgIG9rID0gTy5pc0VtcHR5KHRoaXMuYWN0dWFsKVxuXG4gIHRoaXMuYXNzZXJ0KG9rLCBcImJlIGVtcHR5XCIpXG59XG5cbi8qKlxuICogQXNzZXJ0IGEgc3RyaW5nIGVuZHMgd2l0aCB0aGUgZ2l2ZW4gc3RyaW5nLlxuICpcbiAqIEBleGFtcGxlXG4gKiBcIkhlbGxvLCBKb2huXCIubXVzdC5lbmRXaXRoKFwiSm9oblwiKVxuICpcbiAqIEBtZXRob2QgZW5kV2l0aFxuICogQHBhcmFtIGV4cGVjdGVkXG4gKi9cbk11c3QucHJvdG90eXBlLmVuZFdpdGggPSBmdW5jdGlvbihleHBlY3RlZCkge1xuICB0aGlzLmFzc2VydChlbmRzV2l0aCh0aGlzLmFjdHVhbCwgZXhwZWN0ZWQpLCBcImVuZCB3aXRoXCIsIHtleHBlY3RlZDogZXhwZWN0ZWR9KVxufVxuXG4vKipcbiAqIEFzc2VydCBvYmplY3Qgc3RyaWN0IGVxdWFsaXR5IG9yIGlkZW50aXR5IChgPT09YCkuXG4gKlxuICogVG8gY29tcGFyZSB2YWx1ZSBvYmplY3RzIChsaWtlIGBEYXRlYCBvciBgUmVnRXhwYCkgYnkgdGhlaXIgdmFsdWUgcmF0aGVyXG4gKiB0aGFuIGlkZW50aXR5LCB1c2UgW2BlcWxgXSgjTXVzdC5wcm90b3R5cGUuZXFsKS4gIFxuICogVG8gY29tcGFyZSBhcnJheXMgYW5kIG9iamVjdHMgYnkgY29udGVudCwgYWxzbyB1c2VcbiAqIFtgZXFsYF0oI011c3QucHJvdG90eXBlLmVxbCkuXG4gKlxuICogQGV4YW1wbGVcbiAqICg0MikubXVzdC5lcXVhbCg0MilcbiAqXG4gKiB2YXIgZGF0ZSA9IG5ldyBEYXRlXG4gKiBkYXRlLm11c3QuZXF1YWwoZGF0ZSlcbiAqXG4gKiBAbWV0aG9kIGVxdWFsXG4gKiBAcGFyYW0gZXhwZWN0ZWRcbiAqL1xuTXVzdC5wcm90b3R5cGUuZXF1YWwgPSBmdW5jdGlvbihleHBlY3RlZCkge1xuICB0aGlzLmFzc2VydCh0aGlzLmFjdHVhbCA9PT0gZXhwZWN0ZWQsIFwiZXF1YWxcIiwge2V4cGVjdGVkOiBleHBlY3RlZH0pXG59XG5cbi8qKlxuICogQXNzZXJ0IHRoYXQgYW4gb2JqZWN0IGlzIGFuIGVycm9yIChpbnN0YW5jZSBvZiBgRXJyb3JgIGJ5IGRlZmF1bHQpLiAgXG4gKiBPcHRpb25hbGx5IGFzc2VydCBpdCBtYXRjaGVzIGBleHBlY3RlZGAgKGFuZC9vciBpcyBvZiBpbnN0YW5jZVxuICogYGNvbnN0cnVjdG9yYCkuICBcbiAqIFdoZW4geW91IGhhdmUgYSBmdW5jdGlvbiB0aGF0J3Mgc3VwcG9zZWQgdG8gdGhyb3csIHVzZVxuICogW2B0aHJvd2BdKCNNdXN0LnByb3RvdHlwZS50aHJvdykuXG4gKlxuICogR2l2ZW4gYGV4cGVjdGVkYCwgdGhlIGVycm9yIGlzIGFzc2VydGVkIGFzIGZvbGxvd3M6XG4gKiAtIEEgKipzdHJpbmcqKiBpcyBjb21wYXJlZCB3aXRoIHRoZSBleGNlcHRpb24ncyBgbWVzc2FnZWAgcHJvcGVydHkuXG4gKiAtIEEgKipyZWd1bGFyIGV4cHJlc3Npb24qKiBpcyBtYXRjaGVkIGFnYWluc3QgdGhlIGV4Y2VwdGlvbidzIGBtZXNzYWdlYFxuICogICBwcm9wZXJ0eS5cbiAqIC0gQSAqKmZ1bmN0aW9uKiogKGEuay5hLiBjb25zdHJ1Y3RvcikgaXMgdXNlZCB0byBjaGVjayBpZiB0aGUgZXJyb3JcbiAqICAgaXMgYW4gYGluc3RhbmNlb2ZgIHRoYXQgY29uc3RydWN0b3IuXG4gKiAtIEFsbCBvdGhlciBjYXNlcyBvZiBgZXhwZWN0ZWRgIGFyZSBsZWZ0IHVuc3BlY2lmaWVkIGZvciBub3cuXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBlcnIgPSB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIkV2ZXJ5dGhpbmcncyBhbWF6aW5nIGFuZCBub2JvZHkncyBoYXBweVwiKSB9XG4gKiBlcnIubXVzdC5iZS5hbi5lcnJvcigpXG4gKiBlcnIubXVzdC5iZS5hbi5lcnJvcihcIkV2ZXJ5dGhpbmcncyBhbWF6aW5nIGFuZCBub2JvZHkncyBoYXBweVwiKVxuICogZXJyLm11c3QuYmUuYW4uZXJyb3IoL2FtYXppbmcvKVxuICogZXJyLm11c3QuYmUuYW4uZXJyb3IoRXJyb3IpXG4gKiBlcnIubXVzdC5iZS5hbi5lcnJvcihSYW5nZUVycm9yKVxuICogZXJyLm11c3QuYmUuYW4uZXJyb3IoUmFuZ2VFcnJvciwgXCJFdmVyeXRoaW5nJ3MgYW1hemluZyBhbmQgbm9ib2R5J3MgaGFwcHlcIilcbiAqIGVyci5tdXN0LmJlLmFuLmVycm9yKFJhbmdlRXJyb3IsIC9hbWF6aW5nLylcbiAqXG4gKiBAbWV0aG9kIGVycm9yXG4gKiBAcGFyYW0gW2NvbnN0cnVjdG9yXVxuICogQHBhcmFtIFtleHBlY3RlZF1cbiAqL1xuTXVzdC5wcm90b3R5cGUuZXJyb3IgPSBmdW5jdGlvbih0eXBlLCBleHBlY3RlZCkge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8PSAxKSBleHBlY3RlZCA9IEFOWVxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PSAxICYmICFpc0ZuKHR5cGUpKSB7IGV4cGVjdGVkID0gdHlwZTsgdHlwZSA9IG51bGwgfVxuXG4gIHZhciBvayA9IGlzRXJyb3IodGhpcy5hY3R1YWwsIHR5cGUgfHwgRXJyb3IsIGV4cGVjdGVkKVxuICB2YXIgbXNnID0gZXhwZWN0ZWQgIT09IEFOWSA/IFwiYmUgYW4gZXJyb3IgbWF0Y2hpbmdcIiA6IFwiYmUgYW4gZXJyb3JcIlxuICB2YXIgb3B0cyA9IGV4cGVjdGVkICE9PSBBTlkgPyB7ZXhwZWN0ZWQ6IGV4cGVjdGVkfSA6IG51bGxcbiAgdGhpcy5hc3NlcnQob2ssIG1zZywgb3B0cylcbn1cblxuLyoqXG4gICogQ2FuIGFsc28gYmUgdXNlZCBhcyBhIHBhc3MtdGhyb3VnaCBwcm9wZXJ0eSBmb3IgYSBmbHVlbnQgY2hhaW4uXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIHZhciBjbGFpbSA9IHJlcXVpcmUoXCJtdXN0XCIpXG4gICogY2xhaW0odHJ1ZSkuaXMudHJ1ZSgpXG4gICogY2xhaW0oNDIpLmlzKDQyKVxuICAqXG4gICogQG1ldGhvZCBpc1xuICAqIEBhbGlhcyBlcXVhbFxuICAqL1xuZGVmaW5lR2V0dGVyKE11c3QucHJvdG90eXBlLCBcImlzXCIsIGxvb2t1cEdldHRlcihNdXN0LnByb3RvdHlwZSwgXCJiZVwiKSlcblxuLyoqXG4gKiBBc3NlcnQgb2JqZWN0IGVxdWFsaXR5IGJ5IGNvbnRlbnQgYW5kIGlmIHBvc3NpYmxlLCByZWN1cnNpdmVseS4gIFxuICogQWxzbyBoYW5kbGVzIGNpcmN1bGFyIGFuZCBzZWxmLXJlZmVyZW50aWFsIG9iamVjdHMuXG4gKlxuICogRm9yIG1vc3QgcGFydHMgaXQgYXNzZXJ0cyBzdHJpY3QgZXF1YWxpdHkgKGA9PT1gKSwgYnV0OlxuICogLSBgUmVnRXhwYCBvYmplY3RzIGFyZSBjb21wYXJlZCBieSB0aGVpciBwYXR0ZXJuIGFuZCBmbGFncy5cbiAqIC0gYERhdGVgIG9iamVjdHMgYXJlIGNvbXBhcmVkIGJ5IHRoZWlyIHZhbHVlLlxuICogLSBgQXJyYXlgIG9iamVjdHMgYXJlIGNvbXBhcmVkIHJlY3Vyc2l2ZWx5LlxuICogLSBgTmFOYHMgYXJlIGNvbnNpZGVyZWQgZXF1aXZhbGVudC5cbiAqIC0gSW5zdGFuY2VzIG9mIHRoZSBzYW1lIGNsYXNzIHdpdGggYSBgdmFsdWVPZmAgZnVuY3Rpb24gYXJlIGNvbXBhcmVkIGJ5IGl0c1xuICogICBvdXRwdXQuXG4gKiAtIFBsYWluIG9iamVjdHMgYW5kIGluc3RhbmNlcyBvZiB0aGUgc2FtZSBjbGFzcyBhcmUgY29tcGFyZWQgcmVjdXJzaXZlbHkuXG4gKlxuICogKipEb2VzIG5vdCBjb2VyY2UgdHlwZXMqKiBzbyAqKm1pc21hdGNoaW5nIHR5cGVzIGZhaWwqKi4gIFxuICogSW5oZXJpdGVkIGVudW1lcmFibGUgcHJvcGVydGllcyBhcmUgYWxzbyB0YWtlbiBpbnRvIGFjY291bnQuXG4gKlxuICogKipJbnN0YW5jZXMqKiBhcmUgb2JqZWN0cyB3aG9zZSBwcm90b3R5cGUncyBgY29uc3RydWN0b3JgIHByb3BlcnR5IGlzIHNldC5cbiAqIEUuZy4gYG5ldyBNeUNsYXNzYC4gIFxuICogT3RoZXJzLCBsaWtlIGB7fWAgb3IgYE9iamVjdC5jcmVhdGUoe30pYCwgYXJlICoqcGxhaW4gb2JqZWN0cyoqLlxuICpcbiAqIEBleGFtcGxlXG4gKiAvW2Etel0vLm11c3QuZXFsKC9bYS16XS8pXG4gKiBuZXcgRGF0ZSgxOTg3LCA1LCAxOCkubXVzdC5lcWwobmV3IERhdGUoMTk4NywgNSwgMTgpKVxuICogW1wiTGlzcFwiLCA0Ml0ubXVzdC5lcWwoW1wiTGlzcFwiLCA0Ml0pXG4gKiAoe2xpZmU6IDQyLCBsb3ZlOiA2OX0pLm11c3QuZXFsKHtsaWZlOiA0MiwgbG92ZTogNjl9KVxuICogTmFOLm11c3QuZXFsKE5hTilcbiAqXG4gKiBmdW5jdGlvbiBBbnN3ZXIoYW5zd2VyKSB7IHRoaXMuYW5zd2VyID0gYW5zd2VyIH1cbiAqIG5ldyBBbnN3ZXIoNDIpLm11c3QuZXFsKG5ldyBBbnN3ZXIoNDIpKVxuICpcbiAqIEBtZXRob2QgZXFsXG4gKiBAcGFyYW0gZXhwZWN0ZWRcbiAqL1xuTXVzdC5wcm90b3R5cGUuZXFsID0gZnVuY3Rpb24oZXhwZWN0ZWQpIHtcbiAgdmFyIG9rID0gZGVlcEVnYWwodGhpcy5hY3R1YWwsIGV4cGVjdGVkLCBlcWwpXG4gIHRoaXMuYXNzZXJ0KG9rLCBcImJlIGVxdWl2YWxlbnQgdG9cIiwge2V4cGVjdGVkOiBleHBlY3RlZCwgZGlmZmFibGU6IHRydWV9KVxufVxuXG4vKipcbiAqIEFzc2VydCBvYmplY3QgaW5jbHVkZXMgYGV4cGVjdGVkYC5cbiAqXG4gKiBGb3Igc3RyaW5ncyBpdCBjaGVja3MgdGhlIHRleHQsIGZvciBhcnJheXMgaXQgY2hlY2tzIGVsZW1lbnRzIGFuZCBmb3JcbiAqIG9iamVjdHMgdGhlIHByb3BlcnR5IHZhbHVlcy4gRXZlcnl0aGluZyBpcyBjaGVja2VkIHdpdGggc3RyaWN0IGVxdWFsc1xuICogKGA9PT1gKS5cbiAqXG4gKiBAZXhhbXBsZVxuICogXCJIZWxsbywgSm9obiFcIi5tdXN0LmluY2x1ZGUoXCJKb2huXCIpXG4gKiBbMSwgNDIsIDNdLm11c3QuaW5jbHVkZSg0MilcbiAqICh7bGlmZTogNDIsIGxvdmU6IDY5fSkubXVzdC5pbmNsdWRlKDQyKVxuICpcbiAqIEBtZXRob2QgaW5jbHVkZVxuICogQHBhcmFtIGV4cGVjdGVkXG4gKi9cbk11c3QucHJvdG90eXBlLmluY2x1ZGUgPSBmdW5jdGlvbihleHBlY3RlZCkge1xuICB2YXIgZm91bmRcbiAgaWYgKHR5cGVvZiB0aGlzLmFjdHVhbCA9PT0gXCJzdHJpbmdcIiB8fCBBcnJheS5pc0FycmF5KHRoaXMuYWN0dWFsKSlcbiAgICBmb3VuZCA9IHRoaXMuYWN0dWFsLmluZGV4T2YoZXhwZWN0ZWQpID49IDBcbiAgZWxzZVxuICAgIGZvciAodmFyIGtleSBpbiB0aGlzLmFjdHVhbClcbiAgICAgIGlmICh0aGlzLmFjdHVhbFtrZXldID09PSBleHBlY3RlZCkgeyBmb3VuZCA9IHRydWU7IGJyZWFrIH1cblxuICB0aGlzLmFzc2VydChmb3VuZCwgXCJpbmNsdWRlXCIsIHtleHBlY3RlZDogZXhwZWN0ZWR9KVxufVxuXG4vKipcbiAqIEBtZXRob2QgY29udGFpblxuICogQGFsaWFzIGluY2x1ZGVcbiAqL1xuTXVzdC5wcm90b3R5cGUuY29udGFpbiA9IE11c3QucHJvdG90eXBlLmluY2x1ZGVcblxuLyoqXG4gKiBBc3NlcnQgdGhhdCBhbiBhcnJheSBpcyBhIHBlcm11dGF0aW9uIG9mIHRoZSBnaXZlbiBhcnJheS5cbiAqXG4gKiBBbiBhcnJheSBpcyBhIHBlcm11dGF0aW9uIG9mIGFub3RoZXIgaWYgdGhleSBib3RoIGhhdmUgdGhlIHNhbWUgZWxlbWVudHNcbiAqIChpbmNsdWRpbmcgdGhlIHNhbWUgbnVtYmVyIG9mIGR1cGxpY2F0ZXMpIHJlZ2FyZGxlc3Mgb2YgdGhlaXIgb3JkZXIuXG4gKiBFbGVtZW50cyBhcmUgY2hlY2tlZCB3aXRoIHN0cmljdCBlcXVhbHMgKGA9PT1gKS5cbiAqXG4gKiBAZXhhbXBsZVxuICogWzEsIDEsIDIsIDNdLm11c3QuYmUuYS5wZXJtdXRhdGlvbk9mKFszLCAyLCAxLCAxXSlcbiAqIFs3LCA4LCA4LCA5XS5tdXN0Lm5vdC5iZS5hLnBlcm11dGF0aW9uT2YoWzksIDgsIDddKVxuICpcbiAqIEBtZXRob2QgcGVybXV0YXRpb25PZlxuICogQHBhcmFtIGV4cGVjdGVkXG4gKi9cbk11c3QucHJvdG90eXBlLnBlcm11dGF0aW9uT2YgPSBmdW5jdGlvbihleHBlY3RlZCkge1xuICB2YXIgb2sgPSBpc1Blcm11dGF0aW9uT2YodGhpcy5hY3R1YWwsIGV4cGVjdGVkKVxuICB0aGlzLmFzc2VydChvaywgXCJiZSBhIHBlcm11dGF0aW9uIG9mXCIsIHtleHBlY3RlZDogZXhwZWN0ZWQsIGRpZmZhYmxlOiB0cnVlfSlcbn1cblxuZnVuY3Rpb24gaXNQZXJtdXRhdGlvbk9mKGFjdHVhbCwgZXhwZWN0ZWQpIHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KGFjdHVhbCkgfHwgIUFycmF5LmlzQXJyYXkoZXhwZWN0ZWQpKSByZXR1cm4gZmFsc2VcbiAgaWYgKGFjdHVhbC5sZW5ndGggIT09IGV4cGVjdGVkLmxlbmd0aCkgcmV0dXJuIGZhbHNlXG5cbiAgYWN0dWFsID0gYWN0dWFsLnNsaWNlKCkuc29ydCgpXG4gIGV4cGVjdGVkID0gZXhwZWN0ZWQuc2xpY2UoKS5zb3J0KClcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhY3R1YWwubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoYWN0dWFsW2ldICE9PSBleHBlY3RlZFtpXSkgcmV0dXJuIGZhbHNlXG4gIH1cblxuICByZXR1cm4gdHJ1ZVxufVxuXG4vKipcbiAqIEFzc2VydCBvYmplY3QgbWF0Y2hlcyB0aGUgZ2l2ZW4gcmVndWxhciBleHByZXNzaW9uLlxuICpcbiAqIElmIHlvdSBwYXNzIGluIGEgbm9uIHJlZ3VsYXIgZXhwcmVzc2lvbiBvYmplY3QsIGl0J2xsIGJlIGNvbnZlcnRlZCB0byBvbmVcbiAqIHZpYSBgbmV3IFJlZ0V4cChyZWdleHApYC5cbiAqXG4gKiBAZXhhbXBsZVxuICogXCJIZWxsbywgSm9obiFcIi5tdXN0Lm1hdGNoKC9qb2huL2kpXG4gKiBcIldlaSB3dSB3ZWlcIi5tdXN0Lm1hdGNoKFwid3VcIilcbiAqXG4gKiBAbWV0aG9kIG1hdGNoXG4gKiBAcGFyYW0gcmVnZXhwXG4gKi9cbk11c3QucHJvdG90eXBlLm1hdGNoID0gZnVuY3Rpb24oZXhwZWN0ZWQpIHtcbiAgdmFyIHJlZ2V4cCA9IGV4cGVjdGVkIGluc3RhbmNlb2YgUmVnRXhwID8gZXhwZWN0ZWQgOiBuZXcgUmVnRXhwKGV4cGVjdGVkKVxuICB0aGlzLmFzc2VydChyZWdleHAuZXhlYyh0aGlzLmFjdHVhbCksIFwibWF0Y2hcIiwge2V4cGVjdGVkOiByZWdleHB9KVxufVxuXG4vKipcbiAgKiBQYXNzLXRocm91Z2ggcHJvcGVydHkgZm9yIGEgZmx1ZW50IGNoYWluLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiAoNDIpLm11c3QubXVzdC5tdXN0Lm11c3QuZXF1YWwoNDIpXG4gICpcbiAgKiBAcHJvcGVydHkgbXVzdFxuICAqIEBvbiBwcm90b3R5cGVcbiAgKi9cbmRlZmluZUdldHRlcihNdXN0LnByb3RvdHlwZSwgXCJtdXN0XCIsIHBhc3N0aHJvdWdoKVxuXG4vKipcbiAgKiBQYXNzLXRocm91Z2ggcHJvcGVydHkgZm9yIGEgZmx1ZW50IGNoYWluLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiAoNDIpLm11c3QuYmUudGhlLm51bWJlcigpXG4gICpcbiAgKiBAcHJvcGVydHkgdGhlXG4gICogQG9uIHByb3RvdHlwZVxuICAqL1xuZGVmaW5lR2V0dGVyKE11c3QucHJvdG90eXBlLCBcInRoZVwiLCBwYXNzdGhyb3VnaClcblxuLyoqXG4gKiBBc3NlcnQgdGhhdCBhIGZ1bmN0aW9uIHRocm93cy4gIFxuICogT3B0aW9uYWxseSBhc3NlcnQgaXQgdGhyb3dzIGBleHBlY3RlZGAgKGFuZC9vciBpcyBvZiBpbnN0YW5jZVxuICogYGNvbnN0cnVjdG9yYCkuICBcbiAqIFdoZW4geW91IGFscmVhZHkgaGF2ZSBhbiBlcnJvciByZWZlcmVuY2UsIHVzZVxuICogW2BlcnJvcmBdKCNNdXN0LnByb3RvdHlwZS5lcnJvcikuXG4gKlxuICogR2l2ZW4gYGV4cGVjdGVkYCwgdGhlIGVycm9yIGlzIGFzc2VydGVkIGFzIGZvbGxvd3M6XG4gKiAtIEEgKipzdHJpbmcqKiBpcyBjb21wYXJlZCB3aXRoIHRoZSBleGNlcHRpb24ncyBgbWVzc2FnZWAgcHJvcGVydHkuXG4gKiAtIEEgKipyZWd1bGFyIGV4cHJlc3Npb24qKiBpcyBtYXRjaGVkIGFnYWluc3QgdGhlIGV4Y2VwdGlvbidzIGBtZXNzYWdlYFxuICogICBwcm9wZXJ0eS5cbiAqIC0gQSAqKmZ1bmN0aW9uKiogKGEuay5hLiBjb25zdHJ1Y3RvcikgaXMgdXNlZCB0byBjaGVjayBpZiB0aGUgZXJyb3JcbiAqICAgaXMgYW4gYGluc3RhbmNlb2ZgIHRoYXQgY29uc3RydWN0b3IuXG4gKiAtIEFsbCBvdGhlciBjYXNlcyBvZiBgZXhwZWN0ZWRgIGFyZSBsZWZ0IHVuc3BlY2lmaWVkIGZvciBub3cuXG4gKlxuICogQmVjYXVzZSBvZiBob3cgSmF2YVNjcmlwdCB3b3JrcywgdGhlIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIGluIGBudWxsYFxuICogY29udGV4dCAoYHRoaXNgKS4gSWYgeW91IHdhbnQgdG8gdGVzdCBhbiBpbnN0YW5jZSBtZXRob2QsIGJpbmQgaXQ6XG4gKiBgb2JqLm1ldGhvZC5iaW5kKG9iaikubXVzdC50aHJvdygpYC5cbiAqXG4gKiBAZXhhbXBsZVxuICogZnVuY3Rpb24gb21nKCkge1xuICogICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIkV2ZXJ5dGhpbmcncyBhbWF6aW5nIGFuZCBub2JvZHkncyBoYXBweVwiKVxuICogfVxuICpcbiAqIG9tZy5tdXN0LnRocm93KClcbiAqIG9tZy5tdXN0LnRocm93KFwiRXZlcnl0aGluZydzIGFtYXppbmcgYW5kIG5vYm9keSdzIGhhcHB5XCIpXG4gKiBvbWcubXVzdC50aHJvdygvYW1hemluZy8pXG4gKiBvbWcubXVzdC50aHJvdyhFcnJvcilcbiAqIG9tZy5tdXN0LnRocm93KFJhbmdlRXJyb3IpXG4gKiBvbWcubXVzdC50aHJvdyhSYW5nZUVycm9yLCBcIkV2ZXJ5dGhpbmcncyBhbWF6aW5nIGFuZCBub2JvZHkncyBoYXBweVwiKVxuICogb21nLm11c3QudGhyb3coUmFuZ2VFcnJvciwgL2FtYXppbmcvKVxuICpcbiAqIEBtZXRob2QgdGhyb3dcbiAqIEBwYXJhbSBbY29uc3RydWN0b3JdXG4gKiBAcGFyYW0gW2V4cGVjdGVkXVxuICovXG5NdXN0LnByb3RvdHlwZS50aHJvdyA9IGZ1bmN0aW9uKHR5cGUsIGV4cGVjdGVkKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDw9IDEpIGV4cGVjdGVkID0gQU5ZXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09IDEgJiYgIWlzRm4odHlwZSkpIHsgZXhwZWN0ZWQgPSB0eXBlOyB0eXBlID0gbnVsbCB9XG5cbiAgdmFyIG9rID0gZmFsc2UsIGV4Y2VwdGlvblxuICB0cnkgeyB0aGlzLmFjdHVhbC5jYWxsKG51bGwpIH0gY2F0Y2ggKGV4KSB7IG9rID0gdHJ1ZTsgZXhjZXB0aW9uID0gZXggfVxuICBvayA9IG9rICYmIGlzRXJyb3IoZXhjZXB0aW9uLCB0eXBlLCBleHBlY3RlZClcblxuICB2YXIgb3B0cyA9IHthY3R1YWw6IGV4Y2VwdGlvbn1cbiAgaWYgKGV4cGVjdGVkICE9PSBBTlkpIG9wdHMuZXhwZWN0ZWQgPSBleHBlY3RlZFxuICB0aGlzLmFzc2VydChvaywgXCJ0aHJvd1wiLCBvcHRzKVxufVxuXG4vKipcbiAqIEFzc2VydCB0aGF0IGFuIG9iamVjdCBoYXMgYSBsZW5ndGggcHJvcGVydHkgZXF1YWwgdG8gYGV4cGVjdGVkYC5cbiAqXG4gKiBAZXhhbXBsZVxuICogXCJTb21ldGhpbmcgb3Igb3RoZXJcIi5tdXN0LmhhdmUubGVuZ3RoKDE4KVxuICogWzEsIDIsIDMsIFwiRm91ciBvJ2Nsb2NrIHJvY2tcIl0ubXVzdC5oYXZlLmxlbmd0aCg0KVxuICpcbiAqIEBtZXRob2QgbGVuZ3RoXG4gKiBAcGFyYW0gZXhwZWN0ZWRcbiAqL1xuTXVzdC5wcm90b3R5cGUubGVuZ3RoID0gZnVuY3Rpb24oZXhwZWN0ZWQpIHtcbiAgdmFyIG9rID0gdGhpcy5hY3R1YWwubGVuZ3RoID09IGV4cGVjdGVkXG4gIHRoaXMuYXNzZXJ0KG9rLCBcImhhdmUgbGVuZ3RoIG9mXCIsIHtleHBlY3RlZDogZXhwZWN0ZWR9KVxufVxuXG4vKipcbiAqIEFzc2VydCB0aGF0IGFuIG9iamVjdCBpcyBmcm96ZW4gd2l0aCBgT2JqZWN0LmlzRnJvemVuYC5cbiAqXG4gKiBAZXhhbXBsZVxuICogT2JqZWN0LmZyZWV6ZSh7fSkubXVzdC5iZS5mcm96ZW4oKVxuICpcbiAqIEBtZXRob2QgZnJvemVuXG4gKi9cbk11c3QucHJvdG90eXBlLmZyb3plbiA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmFzc2VydChPYmplY3QuaXNGcm96ZW4odGhpcy5hY3R1YWwpLCBcImJlIGZyb3plblwiKVxufVxuXG4vKipcbiAqIEFzc2VydCB0aGF0IGFuIG9iamVjdCBoYXMgYWxsIG9mIHRoZSBwcm9wZXJ0aWVzIGdpdmVuIGluIGBwcm9wZXJ0aWVzYCB3aXRoXG4gKiBlcXVhbCAoYD09PWApIHZhbHVlcy4gIEluIG90aGVyIHdvcmRzLCBhc3NlcnRzIHRoYXQgdGhlIGdpdmVuIG9iamVjdCBpc1xuICogYSBzdWJzZXQgb2YgdGhlIG9uZSBhc3NlcnRlZCBhZ2FpbnN0LlxuICpcbiAqIFRha2VzICoqaW5oZXJpdGVkIHByb3BlcnRpZXMqKiBpbnRvIGFjY291bnQuIFRvIG5vdCBkbyBzbywgc2VlXG4gKiBbYG93blByb3BlcnRpZXNgXSgjTXVzdC5wcm90b3R5cGUub3duUHJvcGVydGllcykuXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBqb2huID0ge25hbWU6IFwiSm9oblwiLCBhZ2U6IDQyLCBzZXg6IFwibWFsZVwifVxuICogam9obi5tdXN0LmhhdmUucHJvcGVydGllcyh7bmFtZTogXCJKb2huXCIsIHNleDogXCJtYWxlXCJ9KVxuICpcbiAqIEBtZXRob2QgcHJvcGVydGllc1xuICogQHBhcmFtIHByb3BlcnRpZXNcbiAqL1xuTXVzdC5wcm90b3R5cGUucHJvcGVydGllcyA9IGZ1bmN0aW9uKHByb3BzKSB7XG4gIHZhciBvYmogPSB0aGlzLmFjdHVhbFxuICB2YXIgb2sgPSB0aGlzLmFjdHVhbCAhPSBudWxsXG5cbiAgaWYgKG9rKSBmb3IgKHZhciBrZXkgaW4gcHJvcHMpIHtcbiAgICBvayA9IGtleSBpbiBvYmogJiYgb2JqW2tleV0gPT09IHByb3BzW2tleV1cbiAgICBpZiAoIW9rKSBicmVha1xuICB9XG5cbiAgdGhpcy5hc3NlcnQob2ssIFwiaGF2ZSBwcm9wZXJ0aWVzXCIsIHtleHBlY3RlZDogcHJvcHMsIGRpZmZhYmxlOiB0cnVlfSlcbn1cblxuLyoqXG4gKiBBc3NlcnQgdGhhdCBhbiBvYmplY3QgaGFzIGFsbCBvZiB0aGUgcHJvcGVydGllcyBnaXZlbiBpbiBgcHJvcGVydGllc2Agd2l0aFxuICogZXF1YWwgKGA9PT1gKSB2YWx1ZXMgYW5kIHRoYXQgdGhleSdyZSBvd24gcHJvcGVydGllcy4gIEluIG90aGVyIHdvcmRzLFxuICogYXNzZXJ0cyB0aGF0IHRoZSBnaXZlbiBvYmplY3QgaXMgYSBzdWJzZXQgb2YgdGhlIG9uZSBhc3NlcnRlZCBhZ2FpbnN0LlxuICpcbiAqICoqRG9lcyBub3QqKiB0YWtlICoqaW5oZXJpdGVkIHByb3BlcnRpZXMqKiBpbnRvIGFjY291bnQuIFRvIGRvIHNvLCBzZWVcbiAqIFtgcHJvcGVydGllc2BdKCNNdXN0LnByb3RvdHlwZS5wcm9wZXJ0aWVzKS5cbiAqXG4gKiBAZXhhbXBsZVxuICogdmFyIGpvaG4gPSB7bmFtZTogXCJKb2huXCIsIGFnZTogNDIsIHNleDogXCJtYWxlXCJ9XG4gKiBqb2huLm11c3QuaGF2ZS5vd25Qcm9wZXJ0aWVzKHtuYW1lOiBcIkpvaG5cIiwgc2V4OiBcIm1hbGVcIn0pXG4gKlxuICogQG1ldGhvZCBvd25Qcm9wZXJ0aWVzXG4gKiBAcGFyYW0gcHJvcGVydGllc1xuICovXG5NdXN0LnByb3RvdHlwZS5vd25Qcm9wZXJ0aWVzID0gZnVuY3Rpb24ocHJvcHMpIHtcbiAgdmFyIG9iaiA9IHRoaXMuYWN0dWFsXG4gIHZhciBvayA9IHRoaXMuYWN0dWFsICE9IG51bGxcblxuICBpZiAob2spIGZvciAodmFyIGtleSBpbiBwcm9wcykge1xuICAgIG9rID0ga2V5IGluIG9iaiAmJiBoYXNPd24ob2JqLCBrZXkpICYmIG9ialtrZXldID09PSBwcm9wc1trZXldXG4gICAgaWYgKCFvaykgYnJlYWtcbiAgfVxuXG4gIHRoaXMuYXNzZXJ0KG9rLCBcImhhdmUgb3duIHByb3BlcnRpZXNcIiwge2V4cGVjdGVkOiBwcm9wcywgZGlmZmFibGU6IHRydWV9KVxufVxuXG4vKipcbiAqIEFzc2VydCB0aGF0IGFuIG9iamVjdCBoYXMgcHJvcGVydHkgYHByb3BlcnR5YC4gIFxuICogT3B0aW9uYWxseSBhc3NlcnQgaXQgKmVxdWFscyogKGA9PT1gKSB0byBgdmFsdWVgLlxuICpcbiAqIFRha2VzICoqaW5oZXJpdGVkIHByb3BlcnRpZXMqKiBpbnRvIGFjY291bnQuIFRvIG5vdCBkbyBzbywgc2VlXG4gKiBbYG93blByb3BlcnR5YF0oI011c3QucHJvdG90eXBlLm93blByb3BlcnR5KS5cbiAqXG4gKiBAZXhhbXBsZVxuICogKGZ1bmN0aW9uKCkge30pLm11c3QuaGF2ZS5wcm9wZXJ0eShcImNhbGxcIilcbiAqICh7bGlmZTogNDIsIGxvdmU6IDY5fSkubXVzdC5oYXZlLnByb3BlcnR5KFwibG92ZVwiLCA2OSlcbiAqXG4gKiBAbWV0aG9kIHByb3BlcnR5XG4gKiBAcGFyYW0gcHJvcGVydHlcbiAqIEBwYXJhbSBbdmFsdWVdXG4gKi9cbk11c3QucHJvdG90eXBlLnByb3BlcnR5ID0gZnVuY3Rpb24ocHJvcGVydHksIGV4cGVjdGVkKSB7XG4gIHZhciBvayA9IHRoaXMuYWN0dWFsICE9IG51bGwgJiYgcHJvcGVydHkgaW4gT2JqZWN0KHRoaXMuYWN0dWFsKVxuICBpZiAob2sgJiYgYXJndW1lbnRzLmxlbmd0aCA+IDEpIG9rID0gdGhpcy5hY3R1YWxbcHJvcGVydHldID09PSBleHBlY3RlZFxuXG4gIHZhciBtc2cgPSBcImhhdmUgcHJvcGVydHkgXFxcIlwiICsgcHJvcGVydHkgKyBcIlxcXCJcIiwgb3B0c1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHsgbXNnICs9IFwiIGVxdWFsIHRvXCI7IG9wdHMgPSB7ZXhwZWN0ZWQ6IGV4cGVjdGVkfSB9XG4gIHRoaXMuYXNzZXJ0KG9rLCBtc2csIG9wdHMpXG59XG5cbi8qKlxuICogQXNzZXJ0IHRoYXQgYW4gb2JqZWN0IGhhcyBvd24gcHJvcGVydHkgYHByb3BlcnR5YC4gIFxuICogT3B0aW9uYWxseSBhc3NlcnQgaXQgKmVxdWFscyogKGA9PT1gKSB0byBgdmFsdWVgLlxuICpcbiAqICoqRG9lcyBub3QqKiB0YWtlICoqaW5oZXJpdGVkIHByb3BlcnRpZXMqKiBpbnRvIGFjY291bnQuIFRvIGRvIHNvLCBzZWVcbiAqIFtgcHJvcGVydHlgXSgjTXVzdC5wcm90b3R5cGUucHJvcGVydHkpLlxuICpcbiAqIEBleGFtcGxlXG4gKiAoe2xpZmU6IDQyLCBsb3ZlOiA2OX0pLm11c3QuaGF2ZS5vd25Qcm9wZXJ0eShcImxvdmVcIiwgNjkpXG4gKlxuICogQG1ldGhvZCBvd25Qcm9wZXJ0eVxuICogQHBhcmFtIHByb3BlcnR5XG4gKiBAcGFyYW0gW3ZhbHVlXVxuICovXG5NdXN0LnByb3RvdHlwZS5vd25Qcm9wZXJ0eSA9IGZ1bmN0aW9uKHByb3BlcnR5LCBleHBlY3RlZCkge1xuICB2YXIgb2sgPSB0aGlzLmFjdHVhbCAhPSBudWxsXG4gIG9rID0gb2sgJiYgaGFzT3duKHRoaXMuYWN0dWFsLCBwcm9wZXJ0eSlcbiAgaWYgKG9rICYmIGFyZ3VtZW50cy5sZW5ndGggPiAxKSBvayA9IHRoaXMuYWN0dWFsW3Byb3BlcnR5XSA9PT0gZXhwZWN0ZWRcblxuICB2YXIgbXNnID0gXCJoYXZlIG93biBwcm9wZXJ0eSBcXFwiXCIgKyBwcm9wZXJ0eSArIFwiXFxcIlwiLCBvcHRzXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkgeyBtc2cgKz0gXCIgZXF1YWwgdG9cIjsgb3B0cyA9IHtleHBlY3RlZDogZXhwZWN0ZWR9IH1cbiAgdGhpcy5hc3NlcnQob2ssIG1zZywgb3B0cylcbn1cblxuLyoqXG4gKiBAbWV0aG9kIG93blxuICogQGFsaWFzIG93blByb3BlcnR5XG4gKi9cbk11c3QucHJvdG90eXBlLm93biA9IE11c3QucHJvdG90eXBlLm93blByb3BlcnR5XG5cbi8qKlxuICogQXNzZXJ0IHRoYXQgYW4gb2JqZWN0IGhhcyBvbmx5IHRoZSBleHBlY3RlZCBlbnVtZXJhYmxlIGBrZXlzYC4gIFxuICogUGFzcyBhbiBhcnJheSBvZiBzdHJpbmdzIGFzIGBrZXlzYC5cbiAqXG4gKiBUYWtlcyAqKmluaGVyaXRlZCBwcm9wZXJ0aWVzKiogaW50byBhY2NvdW50LiBUbyBub3QgZG8gc28sIHNlZVxuICogW2Bvd25LZXlzYF0oI011c3QucHJvdG90eXBlLm93bktleXMpLlxuICpcbiAqIEBleGFtcGxlXG4gKiAoe2xpZmU6IDQyLCBsb3ZlOiA2OX0pLm11c3QuaGF2ZS5rZXlzKFtcImxpZmVcIiwgXCJsb3ZlXCJdKVxuICogT2JqZWN0LmNyZWF0ZSh7bGlmZTogNDJ9KS5tdXN0LmhhdmUua2V5cyhbXCJsaWZlXCJdKVxuICpcbiAqIEBtZXRob2Qga2V5c1xuICogQHBhcmFtIGtleXNcbiAqL1xuTXVzdC5wcm90b3R5cGUua2V5cyA9IGZ1bmN0aW9uKGV4cGVjdGVkKSB7XG4gIHZhciBvayA9IHRoaXMuYWN0dWFsICE9IG51bGxcbiAgb2sgPSBvayAmJiBpc1Blcm11dGF0aW9uT2YoTy5rZXlzKE9iamVjdCh0aGlzLmFjdHVhbCkpLCBleHBlY3RlZClcbiAgdGhpcy5hc3NlcnQob2ssIFwiaGF2ZSBrZXlzXCIsIHtleHBlY3RlZDogZXhwZWN0ZWR9KVxufVxuXG4vKipcbiAqIEFzc2VydCB0aGF0IGFuIG9iamVjdCBoYXMgb25seSB0aGUgZXhwZWN0ZWQgZW51bWVyYWJsZSBga2V5c2Agb2YgaXRzIG93bi4gIFxuICogUGFzcyBhbiBhcnJheSBvZiBzdHJpbmdzIGFzIGBrZXlzYC5cbiAqXG4gKiAqKkRvZXMgbm90KiogdGFrZSAqKmluaGVyaXRlZCBwcm9wZXJ0aWVzKiogaW50byBhY2NvdW50LiBUbyBkbyBzbywgc2VlXG4gKiBbYGtleXNgXSgjTXVzdC5wcm90b3R5cGUua2V5cykuXG4gKlxuICogQGV4YW1wbGVcbiAqICh7bGlmZTogNDIsIGxvdmU6IDY5fSkubXVzdC5oYXZlLm93bktleXMoW1wibGlmZVwiLCBcImxvdmVcIl0pXG4gKlxuICogQG1ldGhvZCBvd25LZXlzXG4gKiBAcGFyYW0ga2V5c1xuICovXG5NdXN0LnByb3RvdHlwZS5vd25LZXlzID0gZnVuY3Rpb24oZXhwZWN0ZWQpIHtcbiAgdmFyIG9rID0gdGhpcy5hY3R1YWwgIT0gbnVsbFxuICBvayA9IG9rICYmIGlzUGVybXV0YXRpb25PZihPYmplY3Qua2V5cyhPYmplY3QodGhpcy5hY3R1YWwpKSwgZXhwZWN0ZWQpXG4gIHRoaXMuYXNzZXJ0KG9rLCBcImhhdmUgb3duIGtleXNcIiwge2V4cGVjdGVkOiBleHBlY3RlZH0pXG59XG5cbi8qKlxuICogQXNzZXJ0IHRoYXQgYW4gb2JqZWN0IGhhcyBhbiBlbnVtZXJhYmxlIHByb3BlcnR5IGBwcm9wZXJ0eWAuICBcbiAqIEl0IHdpbGwgZmFpbCBpZiB0aGUgb2JqZWN0IGxhY2tzIHRoZSBwcm9wZXJ0eSBlbnRpcmVseS5cbiAqXG4gKiBUaGlzIGFsc28gY2hlY2tzIGluaGVyaXRlZCBwcm9wZXJ0aWVzIGluIHRoZSBwcm90b3R5cGUgY2hhaW4sIHNvbWV0aGluZyB3aGljaFxuICogYE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGVgIGl0c2VsZiBkb2VzIG5vdCBkby5cbiAqXG4gKiBGb3IgY2hlY2tpbmcgaWYgYSBwcm9wZXJ0eSBleGlzdHMgKmFuZCogaXMgbm9uLWVudW1lcmFibGUsIHNlZVxuICogW2Bub25lbnVtZXJhYmxlYF0oI011c3QucHJvdG90eXBlLm5vbmVudW1lcmFibGUpLlxuICpcbiAqIEBleGFtcGxlXG4gKiAoe2xpZmU6IDQyLCBsb3ZlOiA2OX0pLm11c3QuaGF2ZS5lbnVtZXJhYmxlKFwibG92ZVwiKVxuICpcbiAqIEBtZXRob2QgZW51bWVyYWJsZVxuICogQHBhcmFtIHByb3BlcnR5XG4gKi9cbk11c3QucHJvdG90eXBlLmVudW1lcmFibGUgPSBmdW5jdGlvbihwcm9wZXJ0eSkge1xuICB2YXIgb2sgPSB0aGlzLmFjdHVhbCAhPSBudWxsXG4gIG9rID0gb2sgJiYgaXNFbnVtZXJhYmxlKE9iamVjdCh0aGlzLmFjdHVhbCksIHByb3BlcnR5KVxuICB0aGlzLmFzc2VydChvaywgXCJoYXZlIGVudW1lcmFibGUgcHJvcGVydHkgXFxcIlwiICsgcHJvcGVydHkgKyBcIlxcXCJcIilcbn1cblxuLyoqXG4gKiBAbWV0aG9kIGVudW1lcmFibGVQcm9wZXJ0eVxuICogQGFsaWFzIGVudW1lcmFibGVcbiAqL1xuTXVzdC5wcm90b3R5cGUuZW51bWVyYWJsZVByb3BlcnR5ID0gTXVzdC5wcm90b3R5cGUuZW51bWVyYWJsZVxuXG4vKipcbiAqIEFzc2VydCB0aGF0IGFuIG9iamVjdCBoYXMgYSBub24tZW51bWVyYWJsZSBwcm9wZXJ0eSBgcHJvcGVydHlgLiAgXG4gKiBJdCB3aWxsIGZhaWwgaWYgdGhlIG9iamVjdCBsYWNrcyB0aGUgcHJvcGVydHkgZW50aXJlbHkuXG4gKlxuICogVGhpcyBhbHNvIGNoZWNrcyBpbmhlcml0ZWQgcHJvcGVydGllcyBpbiB0aGUgcHJvdG90eXBlIGNoYWluLCBzb21ldGhpbmcgd2hpY2hcbiAqIGBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlYCBpdHNlbGYgZG9lcyBub3QgZG8uXG4gKlxuICogSXQncyB0aGUgaW52ZXJzZSBvZiBbYGVudW1lcmFibGVgXSgjTXVzdC5wcm90b3R5cGUuZW51bWVyYWJsZSkuXG4gKlxuICogQGV4YW1wbGVcbiAqIChmdW5jdGlvbigpIHt9KS5tdXN0LmhhdmUubm9uZW51bWVyYWJsZShcImNhbGxcIilcbiAqIE9iamVjdC5jcmVhdGUoe30sIHtsb3ZlOiB7ZW51bWVyYWJsZTogMH19KS5tdXN0LmhhdmUubm9uZW51bWVyYWJsZShcImxvdmVcIilcbiAqXG4gKiBAbWV0aG9kIG5vbmVudW1lcmFibGVcbiAqIEBwYXJhbSBwcm9wZXJ0eVxuICovXG5NdXN0LnByb3RvdHlwZS5ub25lbnVtZXJhYmxlID0gZnVuY3Rpb24ocHJvcGVydHkpIHtcbiAgdmFyIG9rID0gdGhpcy5hY3R1YWwgIT0gbnVsbFxuICBvayA9IG9rICYmIHByb3BlcnR5IGluIE9iamVjdCh0aGlzLmFjdHVhbClcbiAgb2sgPSBvayAmJiAhaXNFbnVtZXJhYmxlKE9iamVjdCh0aGlzLmFjdHVhbCksIHByb3BlcnR5KVxuICB0aGlzLmFzc2VydChvaywgXCJoYXZlIG5vbmVudW1lcmFibGUgcHJvcGVydHkgXFxcIlwiICsgcHJvcGVydHkgKyBcIlxcXCJcIilcbn1cblxuZnVuY3Rpb24gaXNFbnVtZXJhYmxlKG9iaiwgbmFtZSkge1xuICAvLyBVc2luZyBwcm9wZXJ0eUlzRW51bWVyYWJsZSBzYXZlcyBhIHBvc3NpYmxlIGxvb3Bpbmcgb2YgYWxsIGtleXMuXG4gIGlmIChPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwob2JqLCBuYW1lKSkgcmV0dXJuIHRydWVcbiAgZm9yICh2YXIga2V5IGluIG9iaikgaWYgKGtleSA9PSBuYW1lKSByZXR1cm4gdHJ1ZVxuICByZXR1cm4gZmFsc2Vcbn1cblxuLyoqXG4gKiBAbWV0aG9kIG5vbmVudW1lcmFibGVQcm9wZXJ0eVxuICogQGFsaWFzIG5vbmVudW1lcmFibGVcbiAqL1xuTXVzdC5wcm90b3R5cGUubm9uZW51bWVyYWJsZVByb3BlcnR5ID0gTXVzdC5wcm90b3R5cGUubm9uZW51bWVyYWJsZVxuXG4vKipcbiAqIEFzc2VydCB0aGF0IGFuIG9iamVjdCBpcyBiZWxvdyBhbmQgbGVzcyB0aGFuIChgPGApIGBleHBlY3RlZGAuICBcbiAqIFVzZXMgYDxgIGZvciBjb21wYXJpc29uLCBzbyBpdCdsbCBhbHNvIHdvcmsgd2l0aCB2YWx1ZSBvYmplY3RzICh0aG9zZVxuICogaW1wbGVtZW50aW5nIFtgdmFsdWVPZmBdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC92YWx1ZU9mKSkgbGlrZSBgRGF0ZWAuXG4gKlxuICogQGV4YW1wbGVcbiAqICg0MikubXVzdC5iZS5iZWxvdyg2OSlcbiAqXG4gKiBAbWV0aG9kIGJlbG93XG4gKiBAcGFyYW0gZXhwZWN0ZWRcbiAqL1xuTXVzdC5wcm90b3R5cGUuYmVsb3cgPSBmdW5jdGlvbihleHBlY3RlZCkge1xuICB0aGlzLmFzc2VydCh0aGlzLmFjdHVhbCA8IGV4cGVjdGVkLCBcImJlIGJlbG93XCIsIHtleHBlY3RlZDogZXhwZWN0ZWR9KVxufVxuXG4vKipcbiAqIEBtZXRob2QgbHRcbiAqIEBhbGlhcyBiZWxvd1xuICovXG5NdXN0LnByb3RvdHlwZS5sdCA9IE11c3QucHJvdG90eXBlLmJlbG93XG5cbi8qKlxuICogV29ya3Mgd2VsbCB3aXRoIGRhdGVzIHdoZXJlIHNheWluZyAqYmVmb3JlKiBpcyBtb3JlIG5hdHVyYWwgdGhhbiAqYmVsb3cqIG9yXG4gKiAqbGVzcyB0aGFuKi5cbiAqXG4gKiBUbyBhc3NlcnQgdGhhdCBhIGRhdGUgaXMgZXF1aXZhbGVudCB0byBhbm90aGVyIGRhdGUsIHVzZVxuICogW2BlcWxgXSgjTXVzdC5wcm90b3R5cGUuZXFsKS4gRm9yIHJlZ3VsYXIgbnVtYmVycyxcbiAqIFtgZXF1YWxgXSgjTXVzdC5wcm90b3R5cGUuZXF1YWwpIGlzIGZpbmUuXG4gKlxuICogQGV4YW1wbGVcbiAqICg0MikubXVzdC5iZS5iZWZvcmUoMTMzNylcbiAqIG5ldyBEYXRlKDIwMDAsIDUsIDE4KS5tdXN0LmJlLmJlZm9yZShuZXcgRGF0ZSgyMDAxLCAwLCAxKSlcbiAqXG4gKiBAbWV0aG9kIGJlZm9yZVxuICogQGFsaWFzIGJlbG93XG4gKi9cbk11c3QucHJvdG90eXBlLmJlZm9yZSA9IE11c3QucHJvdG90eXBlLmJlbG93XG5cbi8qKlxuICogQXNzZXJ0IHRoYXQgYW4gb2JqZWN0IGlzIGF0IG1vc3QsIGxlc3MgdGhhbiBvciBlcXVhbCB0byAoYDw9YCksIGBleHBlY3RlZGAuICBcbiAqIFVzZXMgYDw9YCBmb3IgY29tcGFyaXNvbiwgc28gaXQnbGwgYWxzbyB3b3JrIHdpdGggdmFsdWUgb2JqZWN0cyAodGhvc2VcbiAqIGltcGxlbWVudGluZyBbYHZhbHVlT2ZgXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QvdmFsdWVPZikpIGxpa2UgYERhdGVgLlxuICpcbiAqIEBleGFtcGxlXG4gKiAoNDIpLm11c3QuYmUuYXQubW9zdCg2OSlcbiAqICg0MikubXVzdC5iZS5hdC5tb3N0KDQyKVxuICpcbiAqIEBtZXRob2QgbW9zdFxuICogQHBhcmFtIGV4cGVjdGVkXG4gKi9cbk11c3QucHJvdG90eXBlLm1vc3QgPSBmdW5jdGlvbihleHBlY3RlZCkge1xuICB0aGlzLmFzc2VydCh0aGlzLmFjdHVhbCA8PSBleHBlY3RlZCwgXCJiZSBhdCBtb3N0XCIsIHtleHBlY3RlZDogZXhwZWN0ZWR9KVxufVxuXG4vKipcbiAqIEBtZXRob2QgbHRlXG4gKiBAYWxpYXMgbW9zdFxuICovXG5NdXN0LnByb3RvdHlwZS5sdGUgPSBNdXN0LnByb3RvdHlwZS5tb3N0XG5cbi8qKlxuICogQXNzZXJ0IHRoYXQgYW4gb2JqZWN0IGlzIGFib3ZlIGFuZCBncmVhdGVyIHRoYW4gKGA+YCkgYGV4cGVjdGVkYC4gIFxuICogVXNlcyBgPmAgZm9yIGNvbXBhcmlzb24sIHNvIGl0J2xsIGFsc28gd29yayB3aXRoIHZhbHVlIG9iamVjdHMgKHRob3NlXG4gKiBpbXBsZW1lbnRpbmcgW2B2YWx1ZU9mYF0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvT2JqZWN0L3ZhbHVlT2YpKSBsaWtlIGBEYXRlYC5cbiAqXG4gKiBAZXhhbXBsZVxuICogKDY5KS5tdXN0LmJlLmFib3ZlKDQyKVxuICpcbiAqIEBtZXRob2QgYWJvdmVcbiAqIEBwYXJhbSBleHBlY3RlZFxuICovXG5NdXN0LnByb3RvdHlwZS5hYm92ZSA9IGZ1bmN0aW9uKGV4cGVjdGVkKSB7XG4gIHRoaXMuYXNzZXJ0KHRoaXMuYWN0dWFsID4gZXhwZWN0ZWQsIFwiYmUgYWJvdmVcIiwge2V4cGVjdGVkOiBleHBlY3RlZH0pXG59XG5cbi8qKlxuICogQG1ldGhvZCBndFxuICogQGFsaWFzIGFib3ZlXG4gKi9cbk11c3QucHJvdG90eXBlLmd0ID0gTXVzdC5wcm90b3R5cGUuYWJvdmVcblxuLyoqXG4gKiBXb3JrcyB3ZWxsIHdpdGggZGF0ZXMgd2hlcmUgc2F5aW5nICphZnRlciogaXMgbW9yZSBuYXR1cmFsIHRoYW4gKmFib3ZlKiBvclxuICogKmdyZWF0ZXIgdGhhbiouXG4gKlxuICogVG8gYXNzZXJ0IHRoYXQgYSBkYXRlIGlzIGVxdWl2YWxlbnQgdG8gYW5vdGhlciBkYXRlLCB1c2VcbiAqIFtgZXFsYF0oI011c3QucHJvdG90eXBlLmVxbCkuIEZvciByZWd1bGFyIG51bWJlcnMsXG4gKiBbYGVxdWFsYF0oI011c3QucHJvdG90eXBlLmVxdWFsKSBpcyBmaW5lLlxuICpcbiAqIEBleGFtcGxlXG4gKiAoMTMzNykubXVzdC5iZS5hZnRlcig0MilcbiAqIG5ldyBEYXRlKDIwMzAsIDUsIDE4KS5tdXN0LmJlLmFmdGVyKG5ldyBEYXRlKDIwMTMsIDksIDIzKSlcbiAqXG4gKiBAbWV0aG9kIGFmdGVyXG4gKiBAYWxpYXMgYWJvdmVcbiAqL1xuTXVzdC5wcm90b3R5cGUuYWZ0ZXIgPSBNdXN0LnByb3RvdHlwZS5hYm92ZVxuXG4vKipcbiAqIEFzc2VydCB0aGF0IGFuIG9iamVjdCBpcyBhdCBsZWFzdCwgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIChgPj1gKSxcbiAqIGBleHBlY3RlZGAuICBcbiAqIFVzZXMgYD49YCBmb3IgY29tcGFyaXNvbiwgc28gaXQnbGwgYWxzbyB3b3JrIHdpdGggdmFsdWUgb2JqZWN0cyAodGhvc2VcbiAqIGltcGxlbWVudGluZyBbYHZhbHVlT2ZgXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QvdmFsdWVPZikpIGxpa2UgYERhdGVgLlxuICpcbiAqIEBleGFtcGxlXG4gKiAoNjkpLm11c3QuYmUuYXQubGVhc3QoNDIpXG4gKiAoNDIpLm11c3QuYmUuYXQubGVhc3QoNDIpXG4gKlxuICogQG1ldGhvZCBsZWFzdFxuICogQHBhcmFtIGV4cGVjdGVkXG4gKi9cbk11c3QucHJvdG90eXBlLmxlYXN0ID0gZnVuY3Rpb24oZXhwZWN0ZWQpIHtcbiAgdGhpcy5hc3NlcnQodGhpcy5hY3R1YWwgPj0gZXhwZWN0ZWQsIFwiYmUgYXQgbGVhc3RcIiwge2V4cGVjdGVkOiBleHBlY3RlZH0pXG59XG5cbi8qKlxuICogQG1ldGhvZCBndGVcbiAqIEBhbGlhcyBsZWFzdFxuICovXG5NdXN0LnByb3RvdHlwZS5ndGUgPSBNdXN0LnByb3RvdHlwZS5sZWFzdFxuXG4vKipcbiAqIEFzc2VydCB0aGF0IGFuIG9iamVjdCBpcyBiZXR3ZWVuIGBiZWdpbmAgYW5kIGBlbmRgIChpbmNsdXNpdmUpLiAgXG4gKiBVc2VzIGA8YCBmb3IgY29tcGFyaXNvbiwgc28gaXQnbGwgYWxzbyB3b3JrIHdpdGggdmFsdWUgb2JqZWN0cyAodGhvc2VcbiAqIGltcGxlbWVudGluZyBbYHZhbHVlT2ZgXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QvdmFsdWVPZikpIGxpa2UgYERhdGVgLlxuICpcbiAqIEBleGFtcGxlXG4gKiAoMTMpLm11c3QuYmUuYmV0d2VlbigxMywgNjkpXG4gKiAoNDIpLm11c3QuYmUuYmV0d2VlbigxMywgNjkpXG4gKiAoNjkpLm11c3QuYmUuYmV0d2VlbigxMywgNjkpXG4gKlxuICogQG1ldGhvZCBiZXR3ZWVuXG4gKiBAcGFyYW0gYmVnaW5cbiAqIEBwYXJhbSBlbmRcbiAqL1xuTXVzdC5wcm90b3R5cGUuYmV0d2VlbiA9IGZ1bmN0aW9uKGJlZ2luLCBlbmQpIHtcbiAgdGhpcy5hc3NlcnQoYmVnaW4gPD0gdGhpcy5hY3R1YWwgJiYgdGhpcy5hY3R1YWwgPD0gZW5kLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gXCJiZSBiZXR3ZWVuIFwiICsgc3RyaW5naWZ5KGJlZ2luKSArIFwiIGFuZCBcIiArIHN0cmluZ2lmeShlbmQpXG4gIH0pXG59XG4vKipcbiAqIE1ha2VzIGFueSBtYXRjaGVyIGZvbGxvd2luZyB0aGUgdXNlIG9mIGByZXNvbHZlYCB3YWl0IHRpbGwgYSBwcm9taXNlXG4gKiByZXNvbHZlcyBiZWZvcmUgYXNzZXJ0aW5nLiAgXG4gKiBSZXR1cm5zIGEgbmV3IHByb21pc2UgdGhhdCB3aWxsIGVpdGhlciByZXNvbHZlIGlmIHRoZSBhc3NlcnRpb24gcGFzc2VkIG9yXG4gKiBmYWlsIHdpdGggYEFzc2VydGlvbkVycm9yYC5cbiAqXG4gKiBQcm9taXNlcyBhcmUgdHJhbnNwYXJlbnQgdG8gbWF0Y2hlcnMsIHNvIGV2ZXJ5dGhpbmcgd2lsbCBhbHNvIHdvcmsgd2l0aFxuICogY3VzdG9tZXIgbWF0Y2hlcnMgeW91J3ZlIGFkZGVkIHRvIGBNdXN0LnByb3RvdHlwZWAuIEludGVybmFsbHkgTXVzdCBqdXN0XG4gKiB3YWl0cyBvbiB0aGUgcHJvbWlzZSBhbmQgY2FsbHMgdGhlIG1hdGNoZXIgZnVuY3Rpb24gb25jZSBpdCdzIHJlc29sdmVkLlxuICpcbiAqIFdpdGggW01vY2hhXShodHRwOi8vbW9jaGFqcy5vcmcpLCB1c2luZyB0aGlzIHdpbGwgbG9vayBzb21ldGhpbmcgbGlrZTpcbiAqXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiBpdChcIm11c3QgcGFzc1wiLCBmdW5jdGlvbigpIHtcbiAqICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSg0MikubXVzdC5yZXNvbHZlLnRvLmVxdWFsKDQyKVxuICogfSlcbiAqIGBgYFxuICpcbiAqIFVzaW5nIFtDb01vY2hhXShodHRwczovL2dpdGh1Yi5jb20vYmxha2VlbWJyZXkvY28tbW9jaGEpLCBpdCdsbCBsb29rIGxpa2U6XG4gKiBgYGBqYXZhc2NyaXB0XG4gKiBpdChcIm11c3QgcGFzc1wiLCBmdW5jdGlvbiooKSB7XG4gKiAgIHlpZWxkIFByb21pc2UucmVzb2x2ZSg0MikubXVzdC5yZXNvbHZlLnRvLmVxdWFsKDQyKVxuICogICB5aWVsZCBQcm9taXNlLnJlc29sdmUoWzEsIDIsIDNdKS5tdXN0LnJlc29sdmUudG8ubm90LmluY2x1ZGUoNDIpXG4gKiB9KVxuICogYGBgXG4gKlxuICogQGV4YW1wbGVcbiAqIFByb21pc2UucmVzb2x2ZSg0MikubXVzdC5yZXNvbHZlLnRvLmVxdWFsKDQyKVxuICogUHJvbWlzZS5yZXNvbHZlKFsxLCAyLCAzXSkubXVzdC5yZXNvbHZlLnRvLm5vdC5pbmNsdWRlKDQyKVxuICpcbiAqIEBwcm9wZXJ0eSByZXNvbHZlXG4gKiBAb24gcHJvdG90eXBlXG4gKi9cbmRlZmluZUdldHRlcihNdXN0LnByb3RvdHlwZSwgXCJyZXNvbHZlXCIsIGZ1bmN0aW9uKCkge1xuICByZXR1cm4gUmVzb2x2YWJsZSh0aGlzKVxufSlcblxuLyoqXG4gKiBAZXhhbXBsZVxuICogUHJvbWlzZS5yZXNvbHZlKDQyKS5tdXN0LnRoZW4uZXF1YWwoNDIpXG4gKlxuICogQHByb3BlcnR5IHRoZW5cbiAqIEBvbiBwcm90b3R5cGVcbiAqIEBhbGlhcyByZXNvbHZlXG4gKi9cbmRlZmluZUdldHRlcihNdXN0LnByb3RvdHlwZSwgXCJ0aGVuXCIsIGxvb2t1cEdldHRlcihNdXN0LnByb3RvdHlwZSwgXCJyZXNvbHZlXCIpKVxuXG4vKipcbiAqIEBleGFtcGxlXG4gKiBQcm9taXNlLnJlc29sdmUoNDIpLm11c3QuZXZlbnR1YWxseS5lcXVhbCg0MilcbiAqXG4gKiBAcHJvcGVydHkgZXZlbnR1YWxseVxuICogQG9uIHByb3RvdHlwZVxuICogQGFsaWFzIHJlc29sdmVcbiAqL1xuZGVmaW5lR2V0dGVyKE11c3QucHJvdG90eXBlLCBcImV2ZW50dWFsbHlcIixcbiAgICAgICAgICAgICBsb29rdXBHZXR0ZXIoTXVzdC5wcm90b3R5cGUsIFwicmVzb2x2ZVwiKSlcblxuLyoqXG4gKiBNYWtlcyBhbnkgbWF0Y2hlciBmb2xsb3dpbmcgdGhlIHVzZSBvZiBgcmVqZWN0YCB3YWl0IHRpbGwgYSBwcm9taXNlXG4gKiBpcyByZWplY3RlZCBiZWZvcmUgYXNzZXJ0aW5nLiAgXG4gKiBSZXR1cm5zIGEgbmV3IHByb21pc2UgdGhhdCB3aWxsIGVpdGhlciByZXNvbHZlIGlmIHRoZSBhc3NlcnRpb24gcGFzc2VkIG9yXG4gKiBmYWlsIHdpdGggYEFzc2VydGlvbkVycm9yYC5cbiAqXG4gKiBQcm9taXNlcyBhcmUgdHJhbnNwYXJlbnQgdG8gbWF0Y2hlcnMsIHNvIGV2ZXJ5dGhpbmcgd2lsbCBhbHNvIHdvcmsgd2l0aFxuICogY3VzdG9tZXIgbWF0Y2hlcnMgeW91J3ZlIGFkZGVkIHRvIGBNdXN0LnByb3RvdHlwZWAuIEludGVybmFsbHkgTXVzdCBqdXN0XG4gKiB3YWl0cyBvbiB0aGUgcHJvbWlzZSBhbmQgY2FsbHMgdGhlIG1hdGNoZXIgZnVuY3Rpb24gb25jZSBpdCdzIHJlamVjdGVkLlxuICpcbiAqIFdpdGggW01vY2hhXShodHRwOi8vbW9jaGFqcy5vcmcpLCB1c2luZyB0aGlzIHdpbGwgbG9vayBzb21ldGhpbmcgbGlrZTpcbiAqXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiBpdChcIm11c3QgcGFzc1wiLCBmdW5jdGlvbigpIHtcbiAqICAgcmV0dXJuIFByb21pc2UucmVqZWN0KDQyKS5tdXN0LnJlamVjdC50by5lcXVhbCg0MilcbiAqIH0pXG4gKiBgYGBcbiAqXG4gKiBVc2luZyBbQ29Nb2NoYV0oaHR0cHM6Ly9naXRodWIuY29tL2JsYWtlZW1icmV5L2NvLW1vY2hhKSwgaXQnbGwgbG9vayBsaWtlOlxuICogYGBgamF2YXNjcmlwdFxuICogaXQoXCJtdXN0IHBhc3NcIiwgZnVuY3Rpb24qKCkge1xuICogICB5aWVsZCBQcm9taXNlLnJlamVjdCg0MikubXVzdC5yZWplY3QudG8uZXF1YWwoNDIpXG4gKiAgIHlpZWxkIFByb21pc2UucmVqZWN0KFsxLCAyLCAzXSkubXVzdC5yZWplY3QudG8ubm90LmluY2x1ZGUoNDIpXG4gKiB9KVxuICogYGBgXG4gKlxuICogQGV4YW1wbGVcbiAqIFByb21pc2UucmVqZWN0KDQyKS5tdXN0LnJlamVjdC50by5lcXVhbCg0MilcbiAqIFByb21pc2UucmVqZWN0KFsxLCAyLCAzXSkubXVzdC5yZWplY3QudG8ubm90LmluY2x1ZGUoNDIpXG4gKlxuICogQHByb3BlcnR5IHJlamVjdFxuICogQG9uIHByb3RvdHlwZVxuICovXG5kZWZpbmVHZXR0ZXIoTXVzdC5wcm90b3R5cGUsIFwicmVqZWN0XCIsIGZ1bmN0aW9uKCkge1xuICByZXR1cm4gUmVqZWN0YWJsZSh0aGlzKVxufSlcblxuLyoqXG4gKiBBc3NlcnQgYSBzdHJpbmcgc3RhcnRzIHdpdGggdGhlIGdpdmVuIHN0cmluZy5cbiAqXG4gKiBAZXhhbXBsZVxuICogXCJIZWxsbywgSm9oblwiLm11c3Quc3RhcnRXaXRoKFwiSGVsbG9cIilcbiAqXG4gKiBAbWV0aG9kIHN0YXJ0V2l0aFxuICogQHBhcmFtIGV4cGVjdGVkXG4gKi9cbk11c3QucHJvdG90eXBlLnN0YXJ0V2l0aCA9IGZ1bmN0aW9uKGV4cGVjdGVkKSB7XG4gIHZhciBvayA9IHN0YXJ0c1dpdGgodGhpcy5hY3R1YWwsIGV4cGVjdGVkKVxuICB0aGlzLmFzc2VydChvaywgXCJzdGFydCB3aXRoXCIsIHtleHBlY3RlZDogZXhwZWN0ZWR9KVxufVxuXG4vKipcbiAgKiBQYXNzLXRocm91Z2ggcHJvcGVydHkgZm9yIGEgZmx1ZW50IGNoYWluLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBQcm9taXNlLnJlc29sdmUoNDIpLm11c3QucmVzb2x2ZS53aXRoLm51bWJlcigpXG4gICpcbiAgKiBAcHJvcGVydHkgd2l0aFxuICAqIEBvbiBwcm90b3R5cGVcbiAgKi9cbmRlZmluZUdldHRlcihNdXN0LnByb3RvdHlwZSwgXCJ3aXRoXCIsIHBhc3N0aHJvdWdoKVxuXG5NdXN0LnByb3RvdHlwZS5hc3NlcnQgPSBmdW5jdGlvbiBhc3NlcnQob2ssIG1lc3NhZ2UsIG9wdHMpIHtcbiAgaWYgKCF0aGlzLm5lZ2F0aXZlID8gb2sgOiAhb2spIHJldHVyblxuXG4gIG9wdHMgPSBvcHRzID8gT2JqZWN0LmNyZWF0ZShvcHRzKSA6IHt9XG4gIGlmICghKFwiYWN0dWFsXCIgaW4gb3B0cykpIG9wdHMuYWN0dWFsID0gdGhpcy5hY3R1YWxcblxuICBpZiAoIShcImNhbGxlclwiIGluIG9wdHMpKSB7XG4gICAgLy8gQWNjZXNzaW5nIGNhbGxlciBpbiBzdHJpY3QgbW9kZSB0aHJvd3MgVHlwZUVycm9yLlxuICAgIHRyeSB7IG9wdHMuY2FsbGVyID0gYXNzZXJ0LmNhbGxlciB9XG4gICAgY2F0Y2ggKGV4KSB7IG9wdHMuY2FsbGVyID0gYXNzZXJ0IH1cbiAgfVxuXG4gIHZhciBtc2cgPSBzdHJpbmdpZnkodGhpcy5hY3R1YWwpICsgXCIgbXVzdCBcIiArICh0aGlzLm5lZ2F0aXZlID8gXCJub3QgXCIgOiBcIlwiKVxuICBpZiAodHlwZW9mIG1lc3NhZ2UgPT0gXCJmdW5jdGlvblwiKSBtc2cgKz0gbWVzc2FnZS5jYWxsKHRoaXMpXG4gIGVsc2UgbXNnICs9IG1lc3NhZ2UgKyAoXCJleHBlY3RlZFwiIGluIG9wdHMgPyBcIiBcIitzdHJpbmdpZnkob3B0cy5leHBlY3RlZCkgOiBcIlwiKVxuICBpZiAodGhpcy5tZXNzYWdlICE9IG51bGwpIG1zZyA9IHRoaXMubWVzc2FnZSArIFwiOiBcIiArIG1zZ1xuXG4gIHRocm93IG5ldyBBc3NlcnRpb25FcnJvcihtc2csIG9wdHMpXG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShNdXN0LnByb3RvdHlwZSwgXCJhc3NlcnRcIiwge2VudW1lcmFibGU6IGZhbHNlfSlcblxuZnVuY3Rpb24gZXFsKGEsIGIpIHtcbiAgaWYgKGVnYWwoYSwgYikpIHJldHVybiB0cnVlXG5cbiAgdmFyIHR5cGUgPSBraW5kb2ZQbGFpbihhKVxuICBpZiAodHlwZSAhPT0ga2luZG9mUGxhaW4oYikpIHJldHVybiBmYWxzZVxuICBpZiAoaXNOdW1iZXIoYSkgJiYgaXNOdW1iZXIoYikgJiYgaXNOYU4oK2EpICYmIGlzTmFOKCtiKSkgcmV0dXJuIHRydWVcblxuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlIFwiYXJyYXlcIjpcbiAgICBjYXNlIFwicGxhaW5cIjpcbiAgICAgIHJldHVybiBudWxsXG5cbiAgICBjYXNlIFwib2JqZWN0XCI6XG4gICAgICBpZiAoZ2V0Q29uc3RydWN0b3JPZihhKSAhPT0gZ2V0Q29uc3RydWN0b3JPZihiKSkgcmV0dXJuIGZhbHNlXG4gICAgICBpZiAoaGFzVmFsdWVPZihhKSAmJiBoYXNWYWx1ZU9mKGIpKSByZXR1cm4gZmFsc2VcbiAgICAgIHJldHVybiBudWxsXG5cbiAgICBkZWZhdWx0OiByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRDb25zdHJ1Y3Rvck9mKG9iaikge1xuICB2YXIgcHJvdG90eXBlID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iailcbiAgcmV0dXJuIHByb3RvdHlwZSA9PT0gbnVsbCA/IHVuZGVmaW5lZCA6IHByb3RvdHlwZS5jb25zdHJ1Y3RvclxufVxuXG5mdW5jdGlvbiBoYXNWYWx1ZU9mKG9iaikge1xuICB2YXIgdmFsdWVPZiA9IG9iai52YWx1ZU9mXG4gIHJldHVybiB0eXBlb2YgdmFsdWVPZiA9PT0gXCJmdW5jdGlvblwiICYmIHZhbHVlT2YgIT09IE9iamVjdC5wcm90b3R5cGUudmFsdWVPZlxufVxuXG5mdW5jdGlvbiBraW5kb2ZQbGFpbihvYmopIHtcbiAgdmFyIHR5cGUgPSBraW5kb2Yob2JqKVxuICBpZiAodHlwZSA9PT0gXCJvYmplY3RcIiAmJiBPLmlzUGxhaW5PYmplY3Qob2JqKSkgcmV0dXJuIFwicGxhaW5cIlxuICByZXR1cm4gdHlwZVxufVxuXG5mdW5jdGlvbiBpc0Vycm9yKGVyciwgY29uc3RydWN0b3IsIGV4cGVjdGVkKSB7XG4gIGlmIChjb25zdHJ1Y3RvciAhPSBudWxsICYmICEoZXJyIGluc3RhbmNlb2YgY29uc3RydWN0b3IpKSByZXR1cm4gZmFsc2VcbiAgaWYgKGV4cGVjdGVkID09PSBBTlkpIHJldHVybiB0cnVlXG5cbiAgc3dpdGNoIChraW5kb2YoZXhwZWN0ZWQpKSB7XG4gICAgY2FzZSBcInN0cmluZ1wiOiByZXR1cm4gbWVzc2FnZUZyb21FcnJvcihlcnIpID09PSBleHBlY3RlZFxuICAgIGNhc2UgXCJyZWdleHBcIjogcmV0dXJuIGV4cGVjdGVkLmV4ZWMobWVzc2FnZUZyb21FcnJvcihlcnIpKVxuICAgIGRlZmF1bHQ6IHJldHVybiBlcnIgPT09IGV4cGVjdGVkXG4gIH1cbn1cblxuZnVuY3Rpb24gbWVzc2FnZUZyb21FcnJvcihlcnIpIHtcbiAgLy8gVGhlIG1lc3NhZ2UgaW4gbmV3IEVycm9yKG1lc3NhZ2UpIGdldHMgY29udmVydGVkIHRvIGEgc3RyaW5nLlxuICByZXR1cm4gZXJyID09IG51bGwgfHwgdHlwZW9mIGVyciA9PSBcInN0cmluZ1wiID8gZXJyIDogZXJyLm1lc3NhZ2Vcbn1cblxuZnVuY3Rpb24gaXNGbihmbikgeyByZXR1cm4gdHlwZW9mIGZuID09PSBcImZ1bmN0aW9uXCIgfVxuZnVuY3Rpb24gaXNOdW1iZXIobikgeyByZXR1cm4gdHlwZW9mIG4gPT09IFwibnVtYmVyXCIgfHwgbiBpbnN0YW5jZW9mIE51bWJlciB9XG5mdW5jdGlvbiBwYXNzdGhyb3VnaCgpIHsgcmV0dXJuIHRoaXMgfVxuIiwidmFyIE11c3QgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuL211c3RcIilcbi8qIGVzbGludCBuby1leHRlbmQtbmF0aXZlOiAwICovXG5cbi8qKlxuICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBbYE11c3RgXSgjTXVzdCkgd2l0aCB0aGUgY3VycmVudCBvYmplY3QgZm9yIGFzc2VydGluZ1xuICogYW5kIGNhbGxpbmcgbWF0Y2hlcnMgb24uXG4gKlxuICogVGhpcyBwcm9wZXJ0eSBpcyBub24tZW51bWVyYWJsZSBqdXN0IGxpa2UgYnVpbHQtaW4gcHJvcGVydGllcywgc29cbiAqIGl0J2xsIG5ldmVyIGludGVyZmVyZSB3aXRoIGFueSByZWd1bGFyIHVzYWdlIG9mIG9iamVjdHMuXG4gKlxuICogUGxlYXNlIG5vdGUgdGhhdCBKYXZhU2NyaXB0IGRvZXMgbm90IGFsbG93IG1ldGhvZCBjYWxscyBvbiBgbnVsbGAgb3JcbiAqIGB1bmRlZmluZWRgLCBzbyB5b3UnbGwgc29tZXRpbWVzIGhhdmUgdG8gY2FsbCBbYE11c3RgXSgjTXVzdCkgb24gdGhlbSBieVxuICogaGFuZC4gIEFzc2lnbmluZyBgcmVxdWlyZShcIm11c3RcIilgIHRvIGBleHBlY3RgIG9yIGBkZW1hbmRgIHdvcmtzIHdlbGwgd2l0aFxuICogdGhvc2UgY2FzZXMuXG4gKlxuICogQGV4YW1wbGVcbiAqIHRydWUubXVzdC5iZS50cnVlKClcbiAqIFtdLm11c3QuYmUuZW1wdHkoKVxuICpcbiAqIEBwcm9wZXJ0eSBtdXN0XG4gKiBAZm9yIE9iamVjdFxuICogQG9uIHByb3RvdHlwZVxuICovXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoT2JqZWN0LnByb3RvdHlwZSwgXCJtdXN0XCIsIHtcbiAgZ2V0OiBmdW5jdGlvbigpIHsgXCJ1c2Ugc3RyaWN0XCI7IHJldHVybiBuZXcgTXVzdCh0aGlzKSB9LFxuXG4gIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJtdXN0XCIsIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIGVudW1yYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSlcbiAgfSxcblxuICAvLyBXaXRob3V0IGNvbmZpZ3VyYWJsZSwgY2FuJ3QgcmVkZWZpbmUgaXQgd2hlbiByZWxvYWRpbmcgdGhpcyBmaWxlLCBlLmcuXG4gIGNvbmZpZ3VyYWJsZTogdHJ1ZVxufSlcbiIsInZhciBoYXNPd24gPSBGdW5jdGlvbi5jYWxsLmJpbmQoT2JqZWN0Lmhhc093blByb3BlcnR5KVxudmFyIGlzRW51bWVyYWJsZSA9IEZ1bmN0aW9uLmNhbGwuYmluZChPYmplY3QucHJvcGVydHlJc0VudW1lcmFibGUpXG52YXIgZ2V0UHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZShcIi4vbGliL2VzNlwiKS5nZXRQcm9wZXJ0eURlc2NyaXB0b3JcbnZhciBsb29rdXBHZXR0ZXIgPSBPYmplY3QucHJvdG90eXBlLl9fbG9va3VwR2V0dGVyX19cbnZhciBsb29rdXBTZXR0ZXIgPSBPYmplY3QucHJvdG90eXBlLl9fbG9va3VwU2V0dGVyX19cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheVxudmFyIFNFVF9QUk9UT19PRl9OVUxMID0gXCJPb2xvbmcuc2V0UHJvdG90eXBlT2YgY2FsbGVkIG9uIG51bGwgb3IgdW5kZWZpbmVkXCJcblxuLyoqXG4gKiBAY2xhc3MgT29sb25nXG4gKi9cblxuLyoqXG4gKiBBc3NpZ25zIGFsbCBlbnVtZXJhYmxlIHByb3BlcnRpZXMgb24gYHNvdXJjZWAgb2JqZWN0cyB0byBgdGFyZ2V0YC4gIFxuICogU2ltaWxhciB0byBgT2JqZWN0LmFzc2lnbmAsIGJ1dCB0YWtlcyBpbmhlcml0ZWQgcHJvcGVydGllcyBpbnRvIGFjY291bnQuXG4gKiBEb2VzIG5vdCBtb2RpZnkgYW55dGhpbmcgaW4gdGhlIHNvdXJjZSBvYmplY3RzLiAgXG4gKiBSZXR1cm5zIGB0YXJnZXRgLlxuICpcbiAqIFRoaW5rIG9mIGl0IGFzIF9leHRlbmRpbmdfIHRoZSBmaXJzdCBvYmplY3Qgc3RlcCBieSBzdGVwIHdpdGggb3RoZXJzLlxuICpcbiAqIEBleGFtcGxlXG4gKiBPb2xvbmcuYXNzaWduKHtuYW1lOiBcIkpvaG5cIn0sIHthZ2U6IDMyfSwge3NoaXJ0OiBcImJsdWVcIn0pXG4gKiAvLyA9PiB7bmFtZTogXCJKb2huXCIsIGFnZTogMzIsIHNoaXJ0OiBcImJsdWVcIn1cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWV0aG9kIGFzc2lnblxuICogQHBhcmFtIHRhcmdldFxuICogQHBhcmFtIHNvdXJjZS4uLlxuICovXG5leHBvcnRzLmFzc2lnbiA9IGZ1bmN0aW9uIGFzc2lnbih0YXJnZXQpIHtcbiAgaWYgKHRhcmdldCAhPSBudWxsKSBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7ICsraSkge1xuICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV1cbiAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldXG4gIH1cblxuICByZXR1cm4gdGFyZ2V0XG59XG5cbi8qKlxuICogQXNzaWducyBhbGwgb3duIGVudW1lcmFibGUgcHJvcGVydGllcyBvbiBgc291cmNlYCBvYmplY3RzIHRvIGB0YXJnZXRgLiAgXG4gKiBMaWtlIGBPYmplY3QuYXNzaWduYC4gRG9lcyBub3QgbW9kaWZ5IGFueXRoaW5nIGluIHRoZSBzb3VyY2Ugb2JqZWN0cy4gIFxuICogUmV0dXJucyBgdGFyZ2V0YC5cbiAqXG4gKiBUaGluayBvZiBpdCBhcyBfZXh0ZW5kaW5nXyB0aGUgZmlyc3Qgb2JqZWN0IHN0ZXAgYnkgc3RlcCB3aXRoIG90aGVycy5cbiAqXG4gKiBAZXhhbXBsZVxuICogT29sb25nLmFzc2lnbk93bih7bmFtZTogXCJKb2huXCJ9LCB7YWdlOiAzMn0sIE9iamVjdC5jcmVhdGUoe3NoaXJ0OiBcImJsdWVcIn0pKVxuICogLy8gPT4ge25hbWU6IFwiSm9oblwiLCBhZ2U6IDMyfVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZXRob2QgYXNzaWduT3duXG4gKiBAcGFyYW0gdGFyZ2V0XG4gKiBAcGFyYW0gc291cmNlLi4uXG4gKi9cbmV4cG9ydHMuYXNzaWduT3duID0gZnVuY3Rpb24gYXNzaWduT3duKHRhcmdldCkge1xuICBpZiAodGFyZ2V0ICE9IG51bGwpIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXVxuICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIGlmIChoYXNPd24oc291cmNlLCBrZXkpKSB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldXG4gIH1cblxuICByZXR1cm4gdGFyZ2V0XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIHNoYWxsb3cgY2xvbmUgb2YgdGhlIGdpdmVuIG9iamVjdCwgdGFraW5nIGFsbCBlbnVtZXJhYmxlXG4gKiBwcm9wZXJ0aWVzIGludG8gYWNjb3VudC4gIFxuICogU2hhbGxvdyBtZWFucyBpZiB5b3UndmUgZ290IG5lc3RlZCBvYmplY3RzLCB0aG9zZSB3aWxsIGJlIHNoYXJlZC5cbiAqXG4gKiBAZXhhbXBsZVxuICogT29sb25nLmNsb25lKHtuYW1lOiBcIkpvaG5cIiwgYWdlOiAzMn0pXG4gKiAvLyA9PiB7bmFtZTogXCJKb2huXCIsIGFnZTogMzJ9XG4gKlxuICogQHN0YXRpY1xuICogQG1ldGhvZCBjbG9uZVxuICogQHBhcmFtIG9iamVjdFxuICovXG5leHBvcnRzLmNsb25lID0gZnVuY3Rpb24gY2xvbmUob2JqKSB7XG4gIHJldHVybiBvYmogPT0gbnVsbCA/IG9iaiA6IGV4cG9ydHMuYXNzaWduKHt9LCBvYmopXG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGRlZXAgY2xvbmUgb2YgdGhlIGdpdmVuIG9iamVjdCwgdGFraW5nIGFsbCBlbnVtZXJhYmxlIHByb3BlcnRpZXNcbiAqIGludG8gYWNjb3VudC5cbiAqXG4gKiBAZXhhbXBsZVxuICogT29sb25nLmNsb25lRGVlcCh7bmFtZTogXCJKb2huXCIsIGF0dHJpYnV0ZXM6IHthZ2U6IDQyfX0pXG4gKiAvLyA9PiB7bmFtZTogXCJKb2huXCIsIGF0dHJpYnV0ZXM6IHthZ2U6IDQyfX1cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWV0aG9kIGNsb25lRGVlcFxuICogQHBhcmFtIG9iamVjdFxuICovXG5leHBvcnRzLmNsb25lRGVlcCA9IGZ1bmN0aW9uIGNsb25lRGVlcChvYmopIHtcbiAgcmV0dXJuIG9iaiA9PSBudWxsID8gb2JqIDogZXhwb3J0cy5tZXJnZSh7fSwgb2JqKVxufVxuXG4vKipcbiAqIENyZWF0ZXMgYW5kIHJldHVybnMgYW4gb2JqZWN0IGluaGVyaXRpbmcgZnJvbSBgcHJvdG90eXBlYCBhbmQsIG9wdGlvbmFsbHksXG4gKiBhc3NpZ25zIGVudW1lcmFibGUgcHJvcGVydGllcyBmcm9tIGBzb3VyY2VgIG9iamVjdHMgdG8gdGhlIG5ldyBvYmplY3QuICBcbiAqIFVzZXMgYE9iamVjdC5jcmVhdGVgIGFuZCBbYE9vbG9uZy5hc3NpZ25gXSgjT29sb25nLmFzc2lnbilcbiAqIGludGVybmFsbHkuICBcbiAqIERvZXMgbm90IG1vZGlmeSB0aGUgZ2l2ZW4gYHByb3RvdHlwZWAgbm9yIHNvdXJjZSBvYmplY3RzLlxuICpcbiAqIEBleGFtcGxlXG4gKiB2YXIgUEVSU09OID0ge25hbWU6IFwiVW5rbm93blwiLCBhZ2U6IDB9XG4gKiBPb2xvbmcuY3JlYXRlKFBFUlNPTiwge25hbWU6IFwiSm9oblwifSwge3NoaXJ0OiBcImJsdWVcIn0pXG4gKiAvLyA9PiB7bmFtZTogXCJKb2huXCIsIGFnZTogMCwgc2hpcnQ6IFwiYmx1ZVwifVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZXRob2QgY3JlYXRlXG4gKiBAcGFyYW0gcHJvdG90eXBlXG4gKiBAcGFyYW0gW3NvdXJjZS4uLl1cbiAqL1xuZXhwb3J0cy5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUob2JqKSB7XG4gIG9iaiA9IGFyZ3VtZW50c1swXSA9IE9iamVjdC5jcmVhdGUob2JqKVxuICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA9PSAxID8gb2JqIDogZXhwb3J0cy5hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKVxufVxuXG4vKipcbiAqIEFzc2lnbnMgYWxsIGVudW1lcmFibGUgcHJvcGVydGllcyBvbiBgc291cmNlYCBvYmplY3RzIHRvIGB0YXJnZXRgIHRoYXQgdGhlXG4gKiBgdGFyZ2V0YCBhbHJlYWR5IF9kb2Vzbid0XyBoYXZlLiBVc2VzIGBrZXkgaW4gb2JqYCB0byBjaGVjayBmb3IgZXhpc3RlbmNlLiAgXG4gKiBEb2VzIG5vdCBtb2RpZnkgYW55dGhpbmcgaW4gdGhlIHNvdXJjZSBvYmplY3RzLiAgXG4gKiBSZXR1cm5zIGB0YXJnZXRgLlxuICpcbiAqIE5vdGUgdGhhdCBiZWNhdXNlICoqaW5oZXJpdGVkIHByb3BlcnRpZXMqKiBvbiBgdGFyZ2V0YCBhcmUgY2hlY2tlZCwgYW55XG4gKiBwcm9wZXJ0eSB0aGF0IGV4aXN0cyBvbiBgT2JqZWN0LnByb3RvdHlwZWAgKGUuZy4gYHRvU3RyaW5nYCwgYHZhbHVlT2ZgKVxuICogd2lsbCBiZSBza2lwcGVkLiBVc3VhbGx5IHRoYXQncyBub3QgYSBwcm9ibGVtLCBidXQgaWYgeW91IHdhbnQgdG8gdXNlXG4gKiBgT29sb25nLmRlZmF1bHRzYCBmb3IgaGFzaG1hcHMvZGljdGlvbmFyaWVzIHdpdGggdW5rbm93biBrZXlzLCBlbnN1cmVcbiAqIGB0YXJnZXRgIGluaGVyaXRzIGZyb20gYG51bGxgIGluc3RlYWQgKHVzZSBgT2JqZWN0LmNyZWF0ZShudWxsKWApLlxuICpcbiAqIEBleGFtcGxlXG4gKiB2YXIgUEVSU09OID0ge25hbWU6IFwiVW5rbm93blwiLCBhZ2U6IDAsIHNoaXJ0OiBcImJsdWVcIn1cbiAqIE9vbG9uZy5kZWZhdWx0cyh7bmFtZTogXCJKb2huXCIsIGFnZTogNDJ9LCBQRVJTT04pXG4gKiAvLyA9PiB7bmFtZTogXCJKb2huXCIsIGFnZTogNDIsIHNoaXJ0OiBcImJsdWVcIn1cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWV0aG9kIGRlZmF1bHRzXG4gKiBAcGFyYW0gdGFyZ2V0XG4gKiBAcGFyYW0gc291cmNlLi4uXG4gKi9cbmV4cG9ydHMuZGVmYXVsdHMgPSBmdW5jdGlvbiBkZWZhdWx0cyh0YXJnZXQpIHtcbiAgaWYgKHRhcmdldCAhPSBudWxsKSBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7ICsraSkge1xuICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV1cbiAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSBpZiAoIShrZXkgaW4gdGFyZ2V0KSkgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldFxufVxuXG4vKipcbiAqIERlZmluZXMgYSBnZXR0ZXIgb24gYW4gb2JqZWN0LiAgXG4gKiBTaW1pbGFyIHRvIFtgT2JqZWN0LnByb3RvdHlwZS5fX2RlZmluZUdldHRlcl9fYF1bX19kZWZpbmVHZXR0ZXJfX10sIGJ1dFxuICogd29ya3MgaW4gYSBzdGFuZGFyZHMgY29tcGxpYW50IHdheS4gIFxuICogUmV0dXJucyBgb2JqZWN0YC5cbiAqXG4gKiBUaGUgcHJvcGVydHkgaXMgYnkgZGVmYXVsdCBtYWRlICpjb25maWd1cmFibGUqIGFuZCAqZW51bWVyYWJsZSouIFNob3VsZCB0aGVcbiAqIHByb3BlcnR5IGV4aXN0IGJlZm9yZSwgaXQncyBlbnVtZXJhYmlsaXR5IHdpbGwgYmUgbGVmdCBhcyBpcy5cbiAqXG4gKiBbX19kZWZpbmVHZXR0ZXJfX106IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9fX2RlZmluZUdldHRlcl9fXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBwZXJzb24gPSB7YmlydGh5ZWFyOiAxOTg3fVxuICpcbiAqIE9vbG9uZy5kZWZpbmVHZXR0ZXIocGVyc29uLCBcImFnZVwiLCBmdW5jdGlvbigpIHtcbiAqICAgcmV0dXJuIG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKSAtIHRoaXMuYmlydGh5ZWFyXG4gKiB9KVxuICpcbiAqIHBlcnNvbi5hZ2UgLy8gPT4gMjggYXMgb2YgdG9kYXkgaW4gMjAxNS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWV0aG9kIGRlZmluZUdldHRlclxuICogQHBhcmFtIG9iamVjdFxuICogQHBhcmFtIHByb3BlcnR5XG4gKiBAcGFyYW0gZm5cbiAqL1xuZXhwb3J0cy5kZWZpbmVHZXR0ZXIgPSBmdW5jdGlvbiBkZWZpbmVHZXR0ZXIob2JqLCBuYW1lLCBmbikge1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgbmFtZSwge1xuICAgIGdldDogZm4sXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGVudW1lcmFibGU6ICFoYXNPd24ob2JqLCBuYW1lKSB8fCBpc0VudW1lcmFibGUob2JqLCBuYW1lKVxuICB9KVxufVxuXG4vKipcbiAqIERlZmluZXMgYSBzZXR0ZXIgb24gYW4gb2JqZWN0LiAgXG4gKiBTaW1pbGFyIHRvIFtgT2JqZWN0LnByb3RvdHlwZS5fX2RlZmluZVNldHRlcl9fYF1bX19kZWZpbmVTZXR0ZXJfX10sIGJ1dFxuICogd29ya3MgaW4gYSBzdGFuZGFyZHMgY29tcGxpYW50IHdheS4gIFxuICogUmV0dXJucyBgb2JqZWN0YC5cbiAqXG4gKiBUaGUgcHJvcGVydHkgaXMgYnkgZGVmYXVsdCBtYWRlICpjb25maWd1cmFibGUqIGFuZCAqZW51bWVyYWJsZSouIFNob3VsZCB0aGVcbiAqIHByb3BlcnR5IGV4aXN0IGJlZm9yZSwgaXQncyBlbnVtZXJhYmlsaXR5IHdpbGwgYmUgbGVmdCBhcyBpcy5cbiAqXG4gKiBbX19kZWZpbmVTZXR0ZXJfX106IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9fX2RlZmluZVNldHRlcl9fXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBwZXJzb24gPSB7fVxuICpcbiAqIE9vbG9uZy5kZWZpbmVTZXR0ZXIocGVyc29uLCBcImFnZVwiLCBmdW5jdGlvbihhZ2UpIHtcbiAqICAgdGhpcy5iaXJ0aHllYXIgPSBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkgLSBhZ2VcbiAqIH0pXG4gKlxuICogcGVyc29uLmFnZSA9IDI4XG4gKiBwZXJzb24uYmlydGh5ZWFyIC8vID0+IDE5ODcgYXMgb2YgdG9kYXkgaW4gMjAxNS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWV0aG9kIGRlZmluZVNldHRlclxuICogQHBhcmFtIG9iamVjdFxuICogQHBhcmFtIHByb3BlcnR5XG4gKiBAcGFyYW0gZm5cbiAqL1xuZXhwb3J0cy5kZWZpbmVTZXR0ZXIgPSBmdW5jdGlvbiBkZWZpbmVTZXR0ZXIob2JqLCBuYW1lLCBmbikge1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgbmFtZSwge1xuICAgIHNldDogZm4sXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGVudW1lcmFibGU6ICFoYXNPd24ob2JqLCBuYW1lKSB8fCBpc0VudW1lcmFibGUob2JqLCBuYW1lKVxuICB9KVxufVxuXG4vKipcbiAqIENhbGxzIHRoZSBnaXZlbiBmdW5jdGlvbiBmb3IgYWxsIGVudW1lcmFibGUgcHJvcGVydGllcy4gIFxuICogUmV0dXJucyB0aGUgZ2l2ZW4gb2JqZWN0LlxuICpcbiAqIFRoZSBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCB3aXRoIGFyZ3VtZW50cyBgdmFsdWVgLCBga2V5YCBhbmQgYG9iamVjdGAgYW5kXG4gKiBib3VuZCB0byBgdGhpc0FyZ2AuXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBvYmogPSB7bmFtZTogXCJKb2huXCIsIGFnZTogNDJ9XG4gKiBPb2xvbmcuZWFjaChvYmosIGZ1bmN0aW9uKHZhbCwga2V5KSB7IGNvbnNvbGUubG9nKGtleSArIFwiPVwiICsgdmFsKSB9KVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZXRob2QgZWFjaFxuICogQHBhcmFtIG9iamVjdFxuICogQHBhcmFtIGNhbGxiYWNrXG4gKiBAcGFyYW0gW3RoaXNBcmddXG4gKi9cbmV4cG9ydHMuZWFjaCA9IGZ1bmN0aW9uIGVhY2gob2JqLCBmbiwgY29udGV4dCkge1xuICBmb3IgKHZhciBrZXkgaW4gb2JqKSBmbi5jYWxsKGNvbnRleHQsIG9ialtrZXldLCBrZXksIG9iailcbiAgcmV0dXJuIG9ialxufVxuXG4vKipcbiAqIENhbGxzIHRoZSBnaXZlbiBmdW5jdGlvbiBmb3IgYWxsIF9vd25fIGVudW1lcmFibGUgcHJvcGVydGllcy4gIFxuICogUmV0dXJucyB0aGUgZ2l2ZW4gb2JqZWN0LlxuICpcbiAqIFRoZSBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCB3aXRoIGFyZ3VtZW50cyBgdmFsdWVgLCBga2V5YCBhbmQgYG9iamVjdGAgYW5kXG4gKiBib3VuZCB0byBgdGhpc0FyZ2AuXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBvYmogPSB7bmFtZTogXCJKb2huXCIsIGFnZTogNDJ9XG4gKiBPb2xvbmcuZWFjaE93bihvYmosIGZ1bmN0aW9uKHZhbCwga2V5KSB7IGNvbnNvbGUubG9nKGtleSArIFwiPVwiICsgdmFsKSB9KVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZXRob2QgZWFjaE93blxuICogQHBhcmFtIG9iamVjdFxuICogQHBhcmFtIGNhbGxiYWNrXG4gKiBAcGFyYW0gW3RoaXNBcmddXG4gKi9cbmV4cG9ydHMuZWFjaE93biA9IGZ1bmN0aW9uIGVhY2hPd24ob2JqLCBmbiwgY29udGV4dCkge1xuICBmb3IgKHZhciBrZXkgaW4gb2JqKVxuICAgIGlmIChoYXNPd24ob2JqLCBrZXkpKSBmbi5jYWxsKGNvbnRleHQsIG9ialtrZXldLCBrZXksIG9iailcblxuICByZXR1cm4gb2JqXG59XG5cbi8qKlxuICogRmlsdGVycyBhbGwgZW51bWVyYWJsZSBwcm9wZXJ0aWVzIGFuZCByZXR1cm5zIGEgbmV3IG9iamVjdCB3aXRoIG9ubHkgdGhvc2VcbiAqIHByb3BlcnRpZXMgZm9yIHdoaWNoIHRoZSBnaXZlbiBmdW5jdGlvbiByZXR1cm5lZCB0cnV0aHkgZm9yLlxuICpcbiAqIFRoZSBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCB3aXRoIGFyZ3VtZW50cyBgdmFsdWVgLCBga2V5YCBhbmQgYG9iamVjdGAgYW5kXG4gKiBib3VuZCB0byBgdGhpc0FyZ2AuXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBvYmogPSB7YTogMSwgYjogMiwgYzogMywgZDogNH1cbiAqIE9vbG9uZy5maWx0ZXIob2JqLCBmdW5jdGlvbih2YWx1ZSwga2V5KSB7IHJldHVybiB2YWx1ZSAlIDIgPT0gMCB9KVxuICogLy8gPT4ge2I6IDIsIGQ6IDR9XG4gKlxuICogQHN0YXRpY1xuICogQG1ldGhvZCBmaWx0ZXJcbiAqIEBwYXJhbSBvYmplY3RcbiAqIEBwYXJhbSBjYWxsYmFja1xuICogQHBhcmFtIFt0aGlzQXJnXVxuICovXG5leHBvcnRzLmZpbHRlciA9IGZ1bmN0aW9uIGZpbHRlcihvYmosIGZuLCBjb250ZXh0KSB7XG4gIHZhciBmaWx0ZXJlZCA9IHt9XG5cbiAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgIHZhciB2YWx1ZSA9IG9ialtrZXldXG4gICAgaWYgKGZuLmNhbGwoY29udGV4dCwgdmFsdWUsIGtleSwgb2JqKSkgZmlsdGVyZWRba2V5XSA9IHZhbHVlXG4gIH1cblxuICByZXR1cm4gZmlsdGVyZWRcbn1cblxuLyoqXG4gKiBAc3RhdGljXG4gKiBAbWV0aG9kIGZvckVhY2hcbiAqIEBhbGlhcyBlYWNoXG4gKi9cbmV4cG9ydHMuZm9yRWFjaCA9IGV4cG9ydHMuZWFjaFxuXG4vKipcbiAqIEBzdGF0aWNcbiAqIEBtZXRob2QgZm9yRWFjaE93blxuICogQGFsaWFzIGVhY2hPd25cbiAqL1xuZXhwb3J0cy5mb3JFYWNoT3duID0gZXhwb3J0cy5lYWNoT3duXG5cbi8qKlxuICogQ2hlY2tzIHdoZXRoZXIgdGhlIGdpdmVuIG9iamVjdCBoYXMgdGhlIGdpdmVuIHByb3BlcnR5LCBpbmhlcml0ZWQgb3Igbm90LiAgXG4gKiBHaXZlbiBhIHNldCwgYnV0IGB1bmRlZmluZWRgIHByb3BlcnR5IHdpbGwgc3RpbGwgcmV0dXJuIGB0cnVlYC5cbiAqXG4gKiBAZXhhbXBsZVxuICogT29sb25nLmhhcyh7bmFtZTogXCJKb2huXCJ9KSAvLyA9PiB0cnVlXG4gKiBPb2xvbmcuaGFzKE9iamVjdC5jcmVhdGUoe25hbWU6IFwiSm9oblwifSksIFwibmFtZVwiKSAvLyA9PiB0cnVlXG4gKiBPb2xvbmcuaGFzKHt9LCBcIm5hbWVcIikgLy8gPT4gZmFsc2VcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWV0aG9kIGhhc1xuICogQHBhcmFtIG9iamVjdFxuICogQHBhcmFtIGtleVxuICovXG5leHBvcnRzLmhhcyA9IGZ1bmN0aW9uIGhhcyhvYmosIGtleSkge1xuICByZXR1cm4ga2V5IGluIG9ialxufVxuXG4vKipcbiAqIENoZWNrcyB3aGV0aGVyIHRoZSBnaXZlbiBvYmplY3QgaGFzIHRoZSBnaXZlbiBwcm9wZXJ0eSBhcyBhbiBvd24gcHJvcGVydHkuICBcbiAqIEdpdmVuIGEgc2V0LCBidXQgYHVuZGVmaW5lZGAgcHJvcGVydHkgd2lsbCBzdGlsbCByZXR1cm4gYHRydWVgLlxuICpcbiAqIEBleGFtcGxlXG4gKiBPb2xvbmcuaGFzT3duKHtuYW1lOiBcIkpvaG5cIn0pIC8vID0+IHRydWVcbiAqIE9vbG9uZy5oYXNPd24oT2JqZWN0LmNyZWF0ZSh7bmFtZTogXCJKb2huXCJ9KSwgXCJuYW1lXCIpIC8vID0+IGZhbHNlXG4gKiBPb2xvbmcuaGFzT3duKHt9LCBcIm5hbWVcIikgLy8gPT4gZmFsc2VcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWV0aG9kIGhhc093blxuICogQHBhcmFtIG9iamVjdFxuICogQHBhcmFtIGtleVxuICovXG5leHBvcnRzLmhhc093biA9IGhhc093blxuXG4vKipcbiAqIENoZWNrcyB3aGV0aGVyIHRoZSBnaXZlbiBvYmplY3QgaGFzIGFueSBlbnVtZXJhYmxlIHByb3BlcnRpZXMsIGluaGVyaXRlZFxuICogb3Igbm90LlxuICpcbiAqIEBleGFtcGxlXG4gKiBPb2xvbmcuaXNFbXB0eSh7bmFtZTogXCJKb2huXCJ9KSAvLyA9PiBmYWxzZVxuICogT29sb25nLmlzRW1wdHkoT2JqZWN0LmNyZWF0ZSh7bmFtZTogXCJKb2huXCJ9KSkgLy8gPT4gZmFsc2VcbiAqIE9vbG9uZy5pc0VtcHR5KHt9KSAvLyA9PiB0cnVlXG4gKlxuICogQHN0YXRpY1xuICogQG1ldGhvZCBpc0VtcHR5XG4gKiBAcGFyYW0gb2JqZWN0XG4gKi9cbmV4cG9ydHMuaXNFbXB0eSA9IGZ1bmN0aW9uIGlzRW1wdHkob2JqKSB7XG4gIGZvciAob2JqIGluIG9iaikgcmV0dXJuIGZhbHNlXG4gIHJldHVybiB0cnVlXG59XG5cbi8qKlxuICogQHN0YXRpY1xuICogQG1ldGhvZCBpc0luXG4gKiBAYWxpYXMgaGFzXG4gKi9cbmV4cG9ydHMuaXNJbiA9IGV4cG9ydHMuaGFzXG5cbi8qKlxuICogQHN0YXRpY1xuICogQG1ldGhvZCBpc0luT3duXG4gKiBAYWxpYXMgaGFzT3duXG4gKi9cbmV4cG9ydHMuaXNJbk93biA9IGV4cG9ydHMuaGFzT3duXG5cbi8qKlxuICogQ2hlY2tzIHdoZXRoZXIgdGhlIGdpdmVuIG9iamVjdCBpcyBvZiB0eXBlIG9iamVjdCBhbmQgaXMgbm90IG51bGwuXG4gKlxuICogQGV4YW1wbGVcbiAqIE9vbG9uZy5pc09iamVjdCh7bmFtZTogXCJKb2huXCJ9KSAvLyA9PiB0cnVlXG4gKiBPb2xvbmcuaXNPYmplY3QobmV3IERhdGUpIC8vID0+IHRydWVcbiAqIE9vbG9uZy5pc09iamVjdCg0MikgLy8gPT4gZmFsc2VcbiAqIE9vbG9uZy5pc09iamVjdChudWxsKSAvLyA9PiBmYWxzZVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZXRob2QgaXNPYmplY3RcbiAqIEBwYXJhbSBvYmplY3RcbiAqL1xuZXhwb3J0cy5pc09iamVjdCA9IGZ1bmN0aW9uIGlzT2JqZWN0KG9iaikge1xuICByZXR1cm4gb2JqICE9IG51bGwgJiYgdHlwZW9mIG9iaiA9PSBcIm9iamVjdFwiXG59XG5cbi8qKlxuICogQ2hlY2tzIHdoZXRoZXIgdGhlIGdpdmVuIG9iamVjdCBoYXMgYW55IF9vd25fIGVudW1lcmFibGUgcHJvcGVydGllcy5cbiAqXG4gKiBAZXhhbXBsZVxuICogT29sb25nLmlzT3duRW1wdHkoe25hbWU6IFwiSm9oblwifSkgLy8gPT4gZmFsc2VcbiAqIE9vbG9uZy5pc093bkVtcHR5KE9iamVjdC5jcmVhdGUoe25hbWU6IFwiSm9oblwifSkpIC8vID0+IHRydWVcbiAqIE9vbG9uZy5pc093bkVtcHR5KHt9KSAvLyA9PiB0cnVlXG4gKlxuICogQHN0YXRpY1xuICogQG1ldGhvZCBpc093bkVtcHR5XG4gKiBAcGFyYW0gb2JqZWN0XG4gKi9cbmV4cG9ydHMuaXNPd25FbXB0eSA9IGZ1bmN0aW9uIGlzT3duRW1wdHkob2JqKSB7XG4gIGZvciAodmFyIGtleSBpbiBvYmopIGlmIChoYXNPd24ob2JqLCBrZXkpKSByZXR1cm4gZmFsc2VcbiAgcmV0dXJuIHRydWVcbn1cblxuLyoqXG4gKiBDaGVja3Mgd2hldGhlciB0aGUgZ2l2ZW4gb2JqZWN0IGlzIG9uZSBjb25zdHJ1Y3RlZCBieSBgT2JqZWN0YCBvciBpbmhlcml0aW5nXG4gKiBmcm9tIGBudWxsYC5cbiAqXG4gKiBBIG5vbi1wbGFpbiBvYmplY3QgaGFzIGEgYGNvbnN0cnVjdG9yYCBwcm9wZXJ0eSBzZXQgdG8gYW55dGhpbmcgYnV0IGBPYmplY3RgLlxuICogVGhhdCdzIHRoZSBjYXNlIHdoZW4geW91IGRvLCBmb3IgZXhhbXBsZSwgYG5ldyBNeU1vZGVsYCwgYG5ldyBEYXRlYC5cbiAqXG4gKiBgQXJyYXkucHJvdG90eXBlYCBpcyBub3QgY29uc2lkZXJlZCBhIHBsYWluIG9iamVjdCBqdXN0IGxpa2UgYW4gYXJyYXkgaXNuJ3RcbiAqIGEgcGxhaW4gb2JqZWN0LiBKYXZhU2NyaXB0IGlzIGEgcHJvdG90eXBpY2FsIGxhbmd1YWdlIGFuZCB0aGUgcHJvdG90eXBlIG9mXG4gKiBhbiBhcnJheSBzaG91bGQgYmUgY29uc2lkZXJlZCBhbiBhcnJheS5cbiAqXG4gKiBAZXhhbXBsZVxuICogT29sb25nLmlzUGxhaW5PYmplY3Qoe25hbWU6IFwiSm9oblwiLCBhZ2U6IDQyfSkgLy8gPT4gdHJ1ZVxuICogT29sb25nLmlzUGxhaW5PYmplY3QoT2JqZWN0LmNyZWF0ZShudWxsKSkgLy8gPT4gdHJ1ZVxuICogT29sb25nLmlzUGxhaW5PYmplY3QoTWF0aCkgLy8gPT4gdHJ1ZVxuICogT29sb25nLmlzUGxhaW5PYmplY3QoW10pIC8vID0+IGZhbHNlXG4gKiBPb2xvbmcuaXNQbGFpbk9iamVjdChBcnJheS5wcm90b3R5cGUpIC8vID0+IGZhbHNlXG4gKiBPb2xvbmcuaXNQbGFpbk9iamVjdChuZXcgRGF0ZSkgLy8gPT4gZmFsc2VcbiAqIE9vbG9uZy5pc1BsYWluT2JqZWN0KFwiSm9oblwiKSAvLyA9PiBmYWxzZVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZXRob2QgaXNQbGFpbk9iamVjdFxuICogQHBhcmFtIG9iamVjdFxuICovXG5leHBvcnRzLmlzUGxhaW5PYmplY3QgPSBmdW5jdGlvbiBpc1BsYWluT2JqZWN0KG9iaikge1xuICBpZiAob2JqID09IG51bGwpIHJldHVybiBmYWxzZVxuICBpZiAodHlwZW9mIG9iaiAhPSBcIm9iamVjdFwiKSByZXR1cm4gZmFsc2VcbiAgaWYgKGlzQXJyYXkob2JqKSkgcmV0dXJuIGZhbHNlXG5cbiAgdmFyIHByb3RvdHlwZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopXG4gIGlmIChwcm90b3R5cGUgPT09IG51bGwpIHJldHVybiB0cnVlXG4gIGlmICghKFwiY29uc3RydWN0b3JcIiBpbiBwcm90b3R5cGUpKSByZXR1cm4gdHJ1ZVxuICByZXR1cm4gcHJvdG90eXBlLmNvbnN0cnVjdG9yID09PSBPYmplY3Rcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGFsbCBlbnVtZXJhYmxlIGtleXMgb2YgYW4gb2JqZWN0IGFzIGFuIGFycmF5LlxuICogU2ltaWxhciB0byBgT2JqZWN0LmtleXNgLCBidXQgdGFrZXMgaW5oZXJpdGVkIHByb3BlcnRpZXMgaW50byBhY2NvdW50LlxuICpcbiAqIEBleGFtcGxlXG4gKiBPb2xvbmcua2V5cyh7bmFtZTogXCJKb2huXCIsIGFnZTogMzJ9KSAvLyA9PiBbXCJuYW1lXCIsIFwiYWdlXCJdXG4gKlxuICogQHN0YXRpY1xuICogQG1ldGhvZCBrZXlzXG4gKiBAcGFyYW0gb2JqZWN0XG4gKi9cbmV4cG9ydHMua2V5cyA9IGZ1bmN0aW9uIGtleXMob2JqKSB7XG4gIHZhciBrZXlzID0gW11cbiAgZm9yICh2YXIga2V5IGluIG9iaikga2V5cy5wdXNoKGtleSlcbiAgcmV0dXJuIGtleXNcbn1cblxuLyoqXG4gKiBMb29rcyB1cCBhbmQgcmV0dXJucyBhIGdldHRlciBvbiBhbiBvYmplY3QuICBcbiAqIFNpbWlsYXIgdG8gW2BPYmplY3QucHJvdG90eXBlLl9fbG9va3VwR2V0dGVyX19gXVtfX2xvb2t1cEdldHRlcl9fXSwgYnV0XG4gKiB3b3JrcyBpbiBhIHN0YW5kYXJkcyBjb21wbGlhbnQgd2F5LiAgXG4gKiBUYWtlcyBpbmhlcml0ZWQgZ2V0dGVycyBpbnRvIGFjY291bnQsIGp1c3QgbGlrZSBgX19sb29rdXBHZXR0ZXJfX2AuICBcbiAqXG4gKiBbX19sb29rdXBHZXR0ZXJfX106IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9fX2xvb2t1cEdldHRlcl9fXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBwZXJzb24gPSB7YmlydGh5ZWFyOiAxOTg3fVxuICpcbiAqIE9vbG9uZy5kZWZpbmVHZXR0ZXIocGVyc29uLCBcImFnZVwiLCBmdW5jdGlvbigpIHtcbiAqICAgcmV0dXJuIG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKSAtIHRoaXMuYmlydGh5ZWFyXG4gKiB9KVxuICpcbiAqIE9vbG9uZy5sb29rdXBHZXR0ZXIocGVyc29uLCBcImFnZVwiKSAvLyBSZXR1cm5zIHRoZSBmdW5jdGlvbiBhYm92ZS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWV0aG9kIGxvb2t1cEdldHRlclxuICogQHBhcmFtIG9iamVjdFxuICogQHBhcmFtIHByb3BlcnR5XG4gKi9cbmV4cG9ydHMubG9va3VwR2V0dGVyID0gbG9va3VwR2V0dGVyID8gRnVuY3Rpb24uY2FsbC5iaW5kKGxvb2t1cEdldHRlcikgOlxuICBmdW5jdGlvbiBsb29rdXBTZXR0ZXIob2JqLCBuYW1lKSB7XG4gIHZhciBkZXNjID0gZ2V0UHJvcGVydHlEZXNjcmlwdG9yKG9iaiwgbmFtZSlcbiAgcmV0dXJuIGRlc2MgJiYgZGVzYy5nZXRcbn1cblxuLyoqXG4gKiBMb29rcyB1cCBhbmQgcmV0dXJucyBhIHNldHRlciBvbiBhbiBvYmplY3QuICBcbiAqIFNpbWlsYXIgdG8gW2BPYmplY3QucHJvdG90eXBlLl9fbG9va3VwU2V0dGVyX19gXVtfX2xvb2t1cFNldHRlcl9fXSwgYnV0XG4gKiB3b3JrcyBpbiBhIHN0YW5kYXJkcyBjb21wbGlhbnQgd2F5LiAgXG4gKiBUYWtlcyBpbmhlcml0ZWQgc2V0dGVycyBpbnRvIGFjY291bnQsIGp1c3QgbGlrZSBgX19sb29rdXBTZXR0ZXJfX2AuICBcbiAqXG4gKiBbX19sb29rdXBTZXR0ZXJfX106IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9fX2xvb2t1cFNldHRlcl9fXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBwZXJzb24gPSB7YmlydGh5ZWFyOiAxOTg3fVxuICpcbiAqIE9vbG9uZy5kZWZpbmVTZXR0ZXIocGVyc29uLCBcImFnZVwiLCBmdW5jdGlvbihhZ2UpIHtcbiAqICAgdGhpcy5iaXJ0aHllYXIgPSBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkgLSBhZ2VcbiAqIH0pXG4gKlxuICogT29sb25nLmxvb2t1cFNldHRlcihwZXJzb24sIFwiYWdlXCIpIC8vIFJldHVybnMgdGhlIGZ1bmN0aW9uIGFib3ZlLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZXRob2QgbG9va3VwU2V0dGVyXG4gKiBAcGFyYW0gb2JqZWN0XG4gKiBAcGFyYW0gcHJvcGVydHlcbiAqL1xuZXhwb3J0cy5sb29rdXBTZXR0ZXIgPSBsb29rdXBTZXR0ZXIgPyBGdW5jdGlvbi5jYWxsLmJpbmQobG9va3VwU2V0dGVyKSA6XG4gIGZ1bmN0aW9uIGxvb2t1cFNldHRlcihvYmosIG5hbWUpIHtcbiAgdmFyIGRlc2MgPSBnZXRQcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBuYW1lKVxuICByZXR1cm4gZGVzYyAmJiBkZXNjLnNldFxufVxuXG4vKipcbiAqIE1hcHMgYWxsIGVudW1lcmFibGUgcHJvcGVydHkgdmFsdWVzIGFuZCByZXR1cm5zIGEgbmV3IG9iamVjdC5cbiAqXG4gKiBUaGUgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgd2l0aCBhcmd1bWVudHMgYHZhbHVlYCwgYGtleWAgYW5kIGBvYmplY3RgIGFuZFxuICogYm91bmQgdG8gYHRoaXNBcmdgLlxuICpcbiAqIEBleGFtcGxlXG4gKiB2YXIgb2JqID0ge2E6IDEsIGI6IDIsIGM6IDN9XG4gKiBPb2xvbmcubWFwKG9iaiwgZnVuY3Rpb24odmFsdWUsIGtleSkgeyByZXR1cm4gdmFsdWUgKiAyIH0pXG4gKiAvLyA9PiB7YTogMiwgYjogNCwgYzogNn1cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWV0aG9kIG1hcFxuICogQHBhcmFtIG9iamVjdFxuICogQHBhcmFtIGNhbGxiYWNrXG4gKiBAcGFyYW0gW3RoaXNBcmddXG4gKi9cbmV4cG9ydHMubWFwID0gZnVuY3Rpb24gbWFwKG9iaiwgZm4sIGNvbnRleHQpIHtcbiAgdmFyIG1hcHBlZCA9IHt9XG4gIGZvciAodmFyIGtleSBpbiBvYmopIG1hcHBlZFtrZXldID0gZm4uY2FsbChjb250ZXh0LCBvYmpba2V5XSwga2V5LCBvYmopXG4gIHJldHVybiBtYXBwZWRcbn1cblxuLyoqXG4gKiBUcmFuc2Zvcm1zIGFsbCBlbnVtZXJhYmxlIGtleXMgYW5kIHJldHVybnMgYSBuZXcgb2JqZWN0LlxuICpcbiAqIFRoZSBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCB3aXRoIGFyZ3VtZW50cyBga2V5YCwgYHZhbHVlYCBhbmQgYG9iamVjdGAgYW5kXG4gKiBib3VuZCB0byBgdGhpc0FyZ2AuXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBwZXJzb24gPSB7bmFtZTogXCJKb2huXCIsIGFnZTogMzJ9XG4gKiBPb2xvbmcubWFwS2V5cyhwZXJzb24sIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4ga2V5LnRvVXBwZXJDYXNlKCkgfSlcbiAqIC8vID0+IHtOQU1FOiBcIkpvaG5cIiwgQUdFOiAzMn1cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWV0aG9kIG1hcEtleXNcbiAqIEBwYXJhbSBvYmplY3RcbiAqIEBwYXJhbSBjYWxsYmFja1xuICogQHBhcmFtIFt0aGlzQXJnXVxuICovXG5leHBvcnRzLm1hcEtleXMgPSBmdW5jdGlvbiBtYXBLZXlzKG9iaiwgZm4sIGNvbnRleHQpIHtcblx0dmFyIHJlc3VsdCA9IHt9XG5cblx0Zm9yICh2YXIga2V5IGluIG9iaikge1xuICAgIHZhciB2YWx1ZSA9IG9ialtrZXldXG4gICAgcmVzdWx0W2ZuLmNhbGwoY29udGV4dCwga2V5LCB2YWx1ZSwgb2JqKV0gPSB2YWx1ZVxuICB9XG5cblx0cmV0dXJuIHJlc3VsdFxufVxuXG4vKipcbiAqIEFzc2lnbnMgYWxsIGVudW1lcmFibGUgcHJvcGVydGllcyBvbiBgc291cmNlYCBvYmplY3RzIHRvIGB0YXJnZXRgXG4gKiByZWN1cnNpdmVseS4gIFxuICogT25seSBwbGFpbiBvYmplY3RzIGEgbWVyZ2VkLiBSZWZlciB0b1xuICogW2BPb2xvbmcuaXNQbGFpbk9iamVjdGBdKCNPb2xvbmcuaXNQbGFpbk9iamVjdCkgZm9yIHRoZSBkZWZpbml0aW9uIG9mXG4gKiBhIHBsYWluIG9iamVjdC4gRG9lcyBub3QgbW9kaWZ5IGFueXRoaW5nIGluIHRoZSBzb3VyY2Ugb2JqZWN0cy5cbiAqXG4gKiBUaGluayBvZiBpdCBhcyBfZXh0ZW5kaW5nXyB0aGUgZmlyc3Qgb2JqZWN0IHN0ZXAgYnkgc3RlcCB3aXRoIG90aGVycy5cbiAqXG4gKiBAZXhhbXBsZVxuICogdmFyIHBlcnNvbiA9IHtuYW1lOiBcIkpvaG5cIiwgYXR0cmlidXRlczoge2FnZTogNDJ9fVxuICogT29sb25nLm1lcmdlKHBlcnNvbiwge2F0dHJpYnV0ZXM6IHtoZWlnaHQ6IDE5MH19KVxuICogcGVyc29uIC8vID0+IHtuYW1lOiBcIkpvaG5cIiwgYXR0cmlidXRlczoge2FnZTogNDIsIGhlaWdodDogMTkwfX1cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWV0aG9kIG1lcmdlXG4gKiBAcGFyYW0gdGFyZ2V0XG4gKiBAcGFyYW0gc291cmNlLi4uXG4gKi9cbmV4cG9ydHMubWVyZ2UgPSBmdW5jdGlvbiBtZXJnZSh0YXJnZXQpIHtcbiAgaWYgKHRhcmdldCAhPSBudWxsKSBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7ICsraSkge1xuICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV1cblxuICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgIHZhciBhID0gdGFyZ2V0W2tleV1cbiAgICAgIHZhciBiID0gc291cmNlW2tleV1cbiAgICAgIHZhciBhSXNPYmplY3QgPSBleHBvcnRzLmlzUGxhaW5PYmplY3QoYSlcbiAgICAgIHZhciBiSXNPYmplY3QgPSBleHBvcnRzLmlzUGxhaW5PYmplY3QoYilcblxuICAgICAgaWYgKGFJc09iamVjdCAmJiBiSXNPYmplY3QpIG1lcmdlKGEsIGIpXG4gICAgICBlbHNlIGlmIChiSXNPYmplY3QpIHRhcmdldFtrZXldID0gbWVyZ2Uoe30sIGIpXG4gICAgICBlbHNlIHRhcmdldFtrZXldID0gYlxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXRcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgbmV3IG9iamVjdCB3aXRoIGtleXMgdGFrZW4gZnJvbSB0aGUgYXJyYXkgYGtleXNgIGFuZCB2YWx1ZXNcbiAqIGZyb20gdGhlIHJlc3VsdCBvZiBjYWxsaW5nIHRoZSBnaXZlbiBmdW5jdGlvbiB3aXRoIGBrZXlgLCBgaW5kZXhgIGFuZFxuICogYGtleXNgLiAgXG4gKiBJdCdzIGxpa2UgdGhlIHJldmVyc2Ugb2YgaW5kZXhpbmcgYW4gYXJyYXkuXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBuYW1lcyA9IFtcIkFsaWNlXCIsIFwiQm9iXCIsIFwiQ2hhcmxpZVwiXVxuICogdmFyIGxlbmd0aHMgPSBPb2xvbmcub2JqZWN0KG5hbWVzLCBmdW5jdGlvbihuYW1lKSB7IHJldHVybiBuYW1lLmxlbmd0aCB9KVxuICogbGVuZ3RocyAvLyA9PiB7QWxpY2U6IDUsIEJvYjogMywgQ2hhcmxpZTogN31cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWV0aG9kIG9iamVjdFxuICogQHBhcmFtIGtleXNcbiAqIEBwYXJhbSBjYWxsYmFja1xuICogQHBhcmFtIFt0aGlzQXJnXVxuICovXG5leHBvcnRzLm9iamVjdCA9IGZ1bmN0aW9uIG9iamVjdChrZXlzLCBmbiwgdGhpc0FyZykge1xuICB2YXIgb2JqID0ge31cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIga2V5ID0ga2V5c1tpXVxuICAgIG9ialtrZXldID0gZm4uY2FsbCh0aGlzQXJnLCBrZXksIGksIGtleXMpXG4gIH1cblxuICByZXR1cm4gb2JqXG59XG5cbi8qKlxuICogUmV0dXJucyBhbGwgZW51bWVyYWJsZSBfb3duXyBrZXlzIG9mIGFuIG9iamVjdCBhcyBhbiBhcnJheS4gIFxuICogU2FtZSBhcyBgT2JqZWN0LmtleXNgLCByZWFsbHkuXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBwZXJzb24gPSBPYmplY3QuY3JlYXRlKHtuYW1lOiBcIkpvaG5cIn0pXG4gKiBwZXJzb24uYWdlID0gNDJcbiAqIE9vbG9uZy5vd25LZXlzKHBlcnNvbikgLy8gPT4gW1wiYWdlXCJdXG4gKlxuICogQHN0YXRpY1xuICogQG1ldGhvZCBvd25LZXlzXG4gKiBAcGFyYW0gb2JqZWN0XG4gKi9cbmV4cG9ydHMub3duS2V5cyA9IE9iamVjdC5rZXlzXG5cbi8qKlxuICogRmlsdGVycyB0aGUga2V5cyBvZiBhbiBvYmplY3QgdG8gb25seSB0aG9zZSBnaXZlbiBhcyBga2V5cy4uLmAuICBcbiAqIE9ubHkga2V5cyB0aGF0IGV4aXN0IGluIGBvYmplY3RgIGFyZSBpbmNsdWRlZC5cbiAqXG4gKiBAZXhhbXBsZVxuICogdmFyIHBlcnNvbiA9IHtuYW1lOiBcIkFsaWNlXCIsIGVtYWlsOiBcImFsaWNlQGV4YW1wbGUuY29tXCIsIGFnZTogNDJ9XG4gKiBPb2xvbmcucGljayhwZXJzb24sIFwibmFtZVwiLCBcImFnZVwiKSAvLyA9PiB7bmFtZTogXCJBbGljZVwiLCBhZ2U6IDQyfVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZXRob2QgcGlja1xuICogQHBhcmFtIG9iamVjdFxuICogQHBhcmFtIGtleXMuLi5cbiAqXG4gKi9cbmV4cG9ydHMucGljayA9IGZ1bmN0aW9uIHBpY2sob2JqKSB7XG4gIHZhciB0YXJnZXQgPSB7fVxuXG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIGtleSA9IGFyZ3VtZW50c1tpXVxuICAgIGlmIChrZXkgaW4gb2JqKSB0YXJnZXRba2V5XSA9IG9ialtrZXldXG4gIH1cblxuICByZXR1cm4gdGFyZ2V0XG59XG5cbi8qKlxuICogRmlsdGVycyB0aGUga2V5cyBvZiBhbiBvYmplY3QgdG8gb25seSB0aG9zZSBnaXZlbiBhcyBga2V5cy4uLmAgd2l0aCBzdXBwb3J0XG4gKiBmb3IgbmVzdGVkIGtleXMgaW4gYW4gYXJyYXkgKGBbXCJhXCIsIFwiYlwiLCBcImNcIl1gKS4gIFxuICogT25seSBrZXlzIHRoYXQgZXhpc3QgaW4gYG9iamVjdGAgYXJlIGluY2x1ZGVkLlxuICpcbiAqIElmIHlvdSdkIGxpa2UgdG8gdXNlIHNvbWUgb3RoZXIgcGF0aCBzeW50YXgsIGZlZWwgZnJlZSB0byBwcmVwcm9jZXNzIHlvdXJcbiAqIGtleXMgYmVmb3JlIHBhc3NpbmcgdGhlbSB0byBgcGlja0RlZXBgLiBGb3IgZXhhbXBsZSwgZm9yIGEgcGVyaW9kLXNlcGFyYXRlZFxuICogc3ludGF4IChgYS5iLmNgKSwgdXNlIGEgaGVscGVyOlxuICpcbiAqIGBgYGphdmFzY3JpcHRcbiAqIGZ1bmN0aW9uIHBhdGgocykgeyByZXR1cm4gcy5zcGxpdChcIi5cIikgfVxuICogT29sb25nLnBpY2tEZWVwKHBlcnNvbiwgXCJuYW1lXCIsIHBhdGgoXCJhZGRyZXNzLmNvdW50cnlcIikpXG4gKiBgYGBcbiAqXG4gKiBAZXhhbXBsZVxuICogdmFyIHBlcnNvbiA9IHtuYW1lOiBcIkFsaWNlXCIsIGFkZHJlc3M6IHtjb3VudHJ5OiBcIlVLXCIsIHN0cmVldDogXCJEb3duaW5nXCJ9fVxuICogdmFyIG9iaiA9IE9vbG9uZy5waWNrRGVlcChwZXJzb24sIFwibmFtZVwiLCBbXCJhZGRyZXNzXCIsIFwiY291bnRyeVwiXSlcbiAqIG9iaiAvLyA9PiB7bmFtZTogXCJBbGljZVwiLCBhZGRyZXNzOiB7Y291bnRyeTogXCJVS1wifX1cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWV0aG9kIHBpY2tEZWVwXG4gKiBAcGFyYW0gb2JqZWN0XG4gKiBAcGFyYW0ga2V5cy4uLlxuICpcbiAqL1xuZXhwb3J0cy5waWNrRGVlcCA9IGZ1bmN0aW9uIHBpY2tEZWVwKG9iaikge1xuICB2YXIgdGFyZ2V0ID0ge31cblxuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7ICsraSkge1xuICAgIHZhciBrZXlzID0gYXJyYXlpZnkoYXJndW1lbnRzW2ldKSwgbGVuZ3RoID0ga2V5cy5sZW5ndGhcbiAgICB2YXIga2V5LCB2YWx1ZSA9IG9iaiwgdCA9IHRhcmdldCwgalxuXG4gICAgZm9yIChqID0gMDsgaiA8IGxlbmd0aCAmJiAoa2V5ID0ga2V5c1tqXSkgaW4gdmFsdWU7ICsraikgdmFsdWUgPSB2YWx1ZVtrZXldXG4gICAgaWYgKGogIT09IGxlbmd0aCkgY29udGludWVcbiAgICBmb3IgKGogPSAwOyBqIDwgbGVuZ3RoIC0gMTsgKytqKSB0ID0gdFtrZXlzW2pdXSB8fCAodFtrZXlzW2pdXSA9IHt9KVxuICAgIHRba2V5c1tqXV0gPSB2YWx1ZVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldFxufVxuXG4vKipcbiAqIFJldHVybnMgYSBuZXcgb2JqZWN0IHdpdGggdGhlIHNhbWUga2V5cywgYnV0IHdpdGggdmFsdWVzIGJlaW5nIHRoZSB2YWx1ZSdzXG4gKiBwcm9wZXJ0eSBga2V5YC4gIFxuICogSW4gb3RoZXIgd29yZHMsIGl0J3MgdGhlIHNhbWUgYXMgYE9vbG9uZy5tYXAob2JqLCBPb2xvbmcucHJvcGVydHkoa2V5KSlgLlxuICpcbiAqIEBleGFtcGxlXG4gKiB2YXIgcGVvcGxlID0ge1xuICogICBhOiB7bmFtZTogXCJBbGljZVwifSxcbiAqICAgYjoge25hbWU6IFwiQm9iXCJ9LFxuICogICBjOiB7bmFtZTogXCJDaGFybGllXCJ9XG4gKiB9XG4gKlxuICogT29sb25nLnBsdWNrKHBlb3BsZSwgXCJuYW1lXCIpIC8vID0+IHthOiBcIkFsaWNlXCIsIGI6IFwiQm9iXCIsIGM6IFwiQ2hhcmxpZVwifVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZXRob2QgcGx1Y2tcbiAqIEBwYXJhbSBvYmplY3RcbiAqIEBwYXJhbSBrZXlcbiAqL1xuZXhwb3J0cy5wbHVjayA9IGZ1bmN0aW9uIHBsdWNrKG9iaiwga2V5KSB7XG4gIHJldHVybiBleHBvcnRzLm1hcChvYmosIGV4cG9ydHMucHJvcGVydHkoa2V5KSlcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBnaXZlbiBwcm9wZXJ0eSBvZiBhbiBvYmplY3QuXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBnZXROYW1lID0gT29sb25nLnByb3BlcnR5KFwibmFtZVwiKVxuICogZ2V0TmFtZSh7bmFtZTogXCJKb2huXCJ9KSAvLyA9PiBcIkpvaG5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWV0aG9kIHByb3BlcnR5XG4gKiBAcGFyYW0ga2V5XG4gKi9cbmV4cG9ydHMucHJvcGVydHkgPSBmdW5jdGlvbiBwcm9wZXJ0eShrZXkpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKG9iaikgeyByZXR1cm4gb2JqW2tleV0gfVxufVxuXG4vKipcbiAqIFJlamVjdHMgYWxsIGVudW1lcmFibGUgcHJvcGVydGllcyBhbmQgcmV0dXJucyBhIG5ldyBvYmplY3Qgd2l0aG91dCB0aG9zZVxuICogcHJvcGVydGllcyBmb3Igd2hpY2ggdGhlIGdpdmVuIGZ1bmN0aW9uIHJldHVybmVkIHRydXRoeSBmb3IuICBcbiAqIE9wcG9zaXRlIG9mIFtgZmlsdGVyYF0oI09vbG9uZy5maWx0ZXIpLlxuICpcbiAqIFRoZSBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCB3aXRoIGFyZ3VtZW50cyBgdmFsdWVgLCBga2V5YCBhbmQgYG9iamVjdGAgYW5kXG4gKiBib3VuZCB0byBgdGhpc0FyZ2AuXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBvYmogPSB7YTogMSwgYjogMiwgYzogMywgZDogNH1cbiAqIE9vbG9uZy5yZWplY3Qob2JqLCBmdW5jdGlvbih2YWx1ZSwga2V5KSB7IHJldHVybiB2YWx1ZSAlIDIgPT0gMCB9KVxuICogLy8gPT4ge2E6IDEsIGM6IDN9XG4gKlxuICogQHN0YXRpY1xuICogQG1ldGhvZCByZWplY3RcbiAqIEBwYXJhbSBvYmplY3RcbiAqIEBwYXJhbSBjYWxsYmFja1xuICogQHBhcmFtIFt0aGlzQXJnXVxuICovXG5leHBvcnRzLnJlamVjdCA9IGZ1bmN0aW9uIHJlamVjdChvYmosIGZuLCBjb250ZXh0KSB7XG4gIHJldHVybiBleHBvcnRzLmZpbHRlcihvYmosIG5vdChmbiksIGNvbnRleHQpXG59XG5cbi8qKlxuICogU2V0IHRoZSBwcm90b3R5cGUgb2YgdGhlIGdpdmVuIG9iamVjdCB0byB0aGUgZ2l2ZW4gcHJvdG90eXBlLiAgXG4gKiBQYXNzIGBudWxsYCBvciBhbm90aGVyIG9iamVjdCBmb3IgdGhlIHByb3RvdHlwZS4gIFxuICogUmV0dXJucyBgb2JqZWN0YC5cbiAqXG4gKiBVc2VzIGBPYmplY3Quc2V0UHJvdG90eXBlT2ZgIGlmIGl0IGV4aXN0cy4gT3RoZXJ3aXNlIHVzZXMgYSBwb2x5ZmlsbC5cbiAqXG4gKiBAZXhhbXBsZVxuICogdmFyIHBlcnNvbiA9IHtuYW1lOiBcIlVubmFtZWRcIiwgYWdlOiA0Mn1cbiAqIHZhciBtaWtlID0gT29sb25nLnNldFByb3RvdHlwZU9mKHtuYW1lOiBcIk1pa2VcIn0sIHBlcnNvbilcbiAqIG1pa2UubmFtZSAvLyA9PiBcIk1pa2VcbiAqIG1pa2UuYWdlICAvLyA9PiA0MlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZXRob2Qgc2V0UHJvdG90eXBlT2ZcbiAqIEBwYXJhbSBvYmplY3RcbiAqIEBwYXJhbSBwcm90b3R5cGVcbiAqL1xuZXhwb3J0cy5zZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICBmdW5jdGlvbiBzZXRQcm90b3R5cGVPZihvYmosIHByb3RvdHlwZSkge1xuICAvKiBlc2xpbnQgbm8tcHJvdG86IDAgKi9cbiAgaWYgKG9iaiA9PSBudWxsKSB0aHJvdyBuZXcgVHlwZUVycm9yKFNFVF9QUk9UT19PRl9OVUxMKVxuICBpZiAodHlwZW9mIG9iaiA9PSBcIm9iamVjdFwiKSBvYmouX19wcm90b19fID0gcHJvdG90eXBlXG4gIHJldHVybiBvYmpcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGFsbCBlbnVtZXJhYmxlIHByb3BlcnR5IHZhbHVlcyBhcyBhbiBhcnJheS5cbiAqXG4gKiBAZXhhbXBsZVxuICogT29sb25nLnZhbHVlcyh7bmFtZTogXCJKb2huXCIsIGFnZTogMzJ9KSAvLyA9PiBbXCJKb2huXCIsIDMyXVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZXRob2QgdmFsdWVzXG4gKiBAcGFyYW0gb2JqZWN0XG4gKi9cbmV4cG9ydHMudmFsdWVzID0gZnVuY3Rpb24gdmFsdWVzKG9iaikge1xuICB2YXIgdmFsdWVzID0gW11cbiAgZm9yICh2YXIga2V5IGluIG9iaikgdmFsdWVzLnB1c2gob2JqW2tleV0pXG4gIHJldHVybiB2YWx1ZXNcbn1cblxuLyoqXG4gKiBXcmFwcyBhIGdpdmVuIHZhbHVlIGluIGFuIG9iamVjdCB1bmRlciB0aGUgc3BlY2lmaWVkIGtleS4gIFxuICogV29ya3MgYWxzbyB3aXRoIFtFQ01BU2NyaXB0IDYgU3ltYm9sXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9TeW1ib2wpLlxuICpcbiAqIEBleGFtcGxlXG4gKiBPb2xvbmcud3JhcChcIkpvaG5cIiwgXCJuYW1lXCIpIC8vID0+IHtuYW1lOiBcIkpvaG5cIn1cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWV0aG9kIHdyYXBcbiAqIEBwYXJhbSB2YWx1ZVxuICogQHBhcmFtIGtleVxuICovXG5leHBvcnRzLndyYXAgPSBmdW5jdGlvbiB3cmFwKHZhbHVlLCBrZXkpIHtcbiAgdmFyIG9iaiA9IHt9XG4gIG9ialtrZXldID0gdmFsdWVcbiAgcmV0dXJuIG9ialxufVxuXG5mdW5jdGlvbiBub3QoZm4pIHsgcmV0dXJuIGZ1bmN0aW9uKCkgeyByZXR1cm4gIWZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfX1cbmZ1bmN0aW9uIGFycmF5aWZ5KHZhbHVlKSB7IHJldHVybiBpc0FycmF5KHZhbHVlKSA/IHZhbHVlIDogW3ZhbHVlXSB9XG4iLCJleHBvcnRzLmdldFByb3BlcnR5RGVzY3JpcHRvciA9IE9iamVjdC5nZXRQcm9wZXJ0eURlc2NyaXB0b3IgfHxcbiAgZnVuY3Rpb24ob2JqLCBuYW1lKSB7XG4gIGlmICghKG5hbWUgaW4gb2JqKSkgcmV0dXJuXG5cbiAgdmFyIGRlc2NcbiAgZG8geyBpZiAoZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBuYW1lKSkgcmV0dXJuIGRlc2MgfVxuICB3aGlsZSAob2JqID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaikpXG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG52YXIgbXVzdCA9IHJlcXVpcmUoXCJtdXN0L3JlZ2lzdGVyXCIpO1xudmFyIFN0eWxlcyA9IHJlcXVpcmUoXCJ3bWwtd2lkZ2V0cy1jb21tb24vU3R5bGVzXCIpO1xudmFyIHZpZXdfMSA9IHJlcXVpcmUoXCIuL3ZpZXdcIik7XG52YXIgY291bnQgPSAwO1xuO1xudmFyIEFwcGxpY2F0aW9uID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBBcHBsaWNhdGlvbigpIHtcbiAgICAgICAgdGhpcy5yZWNvcmRzID0gW3sgbmFtZTogJ0pvemFpbiBIdWxkdW0nLCBhbW91bnQ6IDMyMDAwIH1dO1xuICAgICAgICB0aGlzLnZpZXcgPSBuZXcgdmlld18xLk1haW4odGhpcyk7XG4gICAgfVxuICAgIEFwcGxpY2F0aW9uLnByb3RvdHlwZS50b2dnbGVEcmF3ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMudmlldy5maW5kQnlJZCgnbGF5b3V0JykudG9nZ2xlRHJhd2VyKCk7XG4gICAgfTtcbiAgICBBcHBsaWNhdGlvbi5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvL3RoaXMubW9kYWwucHV0KG5ldyBDcmVhdGVEaWFsb2codGhpcykpO1xuICAgICAgICAvLyAgICAgIHRoaXMudmlldy5pbnZhbGlkYXRlKCk7XG4gICAgfTtcbiAgICBBcHBsaWNhdGlvbi5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB3aW5kb3cuYXBwID0gdGhpcztcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21haW4nKS5hcHBlbmRDaGlsZCh0aGlzLnZpZXcucmVuZGVyKCkpO1xuICAgICAgICB0aGlzLmRyYXdlciA9IHRoaXMudmlldy5maW5kQnlJZCgnbGF5b3V0Jyk7XG4gICAgfTtcbiAgICBBcHBsaWNhdGlvbi5tYWluID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbmV3IHRoaXMoKTtcbiAgICB9O1xuICAgIHJldHVybiBBcHBsaWNhdGlvbjtcbn0oKSk7XG52YXIgYXBwO1xuZGVzY3JpYmUoJ0FwcGxpY2F0aW9uJywgZnVuY3Rpb24gKCkge1xuICAgIGJlZm9yZSgnc2hvdWxkIHJlbmRlcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYXBwID0gQXBwbGljYXRpb24ubWFpbigpO1xuICAgICAgICBhcHAucnVuKCk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJ0RyYXdlckxheW91dCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZGVzY3JpYmUoJ0RyYXdlckxheW91dCN0b2dnbGVEcmF3ZXIoKScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGl0KCdzaG91bGQgaGlkZSBhbmQgc2hvdyB0aGUgZHJhd2VyJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgICAgICB2YXIgbGF5b3V0ID0gYXBwLnZpZXcuZmluZEJ5SWQoJ2xheW91dCcpO1xuICAgICAgICAgICAgICAgIHZhciBkcmF3ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFN0eWxlcy5EUkFXRVIpWzBdO1xuICAgICAgICAgICAgICAgIG11c3QoZHJhd2VyLmNsaWVudFdpZHRoKS5ub3QuYmUoMCk7XG4gICAgICAgICAgICAgICAgbGF5b3V0LnRvZ2dsZURyYXdlcigpO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBtdXN0KGRyYXdlci5jbGllbnRXaWR0aCkuYmUoMCk7XG4gICAgICAgICAgICAgICAgICAgIGxheW91dC50b2dnbGVEcmF3ZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtdXN0KGRyYXdlci5jbGllbnRXaWR0aCkubm90LmJlKDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbnZhciBjb21wb25lbnRzXzEgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzXCIpO1xudmFyIGNvbXBvbmVudHNfMiA9IHJlcXVpcmUoXCJAcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHNcIik7XG52YXIgY29tcG9uZW50c18zID0gcmVxdWlyZShcIkBxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50c1wiKTtcbnZhciBjb21wb25lbnRzXzQgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC13aWRnZXRzL2xpYi9jb21wb25lbnRzXCIpO1xuZnVuY3Rpb24gJCRib3VuZGFyeV90b19kb3QodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUuc3BsaXQoJ11bJykuam9pbignLicpLnNwbGl0KCdbJykuam9pbignLicpO1xufVxuZnVuY3Rpb24gJCRzdHJpcF9icmFjZXModmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUuc3BsaXQoJ1snKS5qb2luKCcuJykuc3BsaXQoJ10nKS5qb2luKCcnKTtcbn1cbmZ1bmN0aW9uICQkZXNjYXBlX2RvdHModmFsdWUpIHtcbiAgICB2YWx1ZSA9IHZhbHVlLnNwbGl0KCdcXCcnKTtcbiAgICByZXR1cm4gKHZhbHVlLmxlbmd0aCA8IDMpID8gdmFsdWUuam9pbignXFwnJykgOiB2YWx1ZS5tYXAoZnVuY3Rpb24gKHNlZykge1xuICAgICAgICBpZiAoc2VnLmxlbmd0aCA8IDMpXG4gICAgICAgICAgICByZXR1cm4gc2VnO1xuICAgICAgICBpZiAoKHNlZ1swXSA9PT0gJy4nKSB8fCAoc2VnW3NlZy5sZW5ndGggLSAxXSA9PT0gJy4nKSlcbiAgICAgICAgICAgIHJldHVybiBzZWc7XG4gICAgICAgIHJldHVybiBzZWcuc3BsaXQoJy4nKS5qb2luKCcmJicpO1xuICAgIH0pLmpvaW4oJycpO1xufVxuZnVuY3Rpb24gJCR1bmVzY2FwZV9kb3RzKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlLnNwbGl0KCcmJicpLmpvaW4oJy4nKTtcbn1cbmZ1bmN0aW9uICQkcGFydGlmeSh2YWx1ZSkge1xuICAgIGlmICghdmFsdWUpXG4gICAgICAgIHJldHVybjtcbiAgICByZXR1cm4gJCRlc2NhcGVfZG90cygkJHN0cmlwX2JyYWNlcygkJGJvdW5kYXJ5X3RvX2RvdCgnJyArIHZhbHVlKSkpLnNwbGl0KCcuJyk7XG59XG5mdW5jdGlvbiAkJHByb3BlcnR5KHBhdGgsIG8pIHtcbiAgICB2YXIgcGFydHMgPSAkJHBhcnRpZnkocGF0aCk7XG4gICAgdmFyIGZpcnN0O1xuICAgIGlmICh0eXBlb2YgbyAhPT0gJ29iamVjdCcpXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2dldCgpOiBleHBlY3RzIGFuIG9iamVjdCBnb3QgJyArIHR5cGVvZiBvKTtcbiAgICBpZiAocGFydHMubGVuZ3RoID09PSAxKVxuICAgICAgICByZXR1cm4gb1skJHVuZXNjYXBlX2RvdHMocGFydHNbMF0pXTtcbiAgICBpZiAocGFydHMubGVuZ3RoID09PSAwKVxuICAgICAgICByZXR1cm47XG4gICAgZmlyc3QgPSBvW3BhcnRzLnNoaWZ0KCldO1xuICAgIHJldHVybiAoKHR5cGVvZiBvID09PSAnb2JqZWN0JykgJiYgKG8gIT09IG51bGwpKSA/XG4gICAgICAgIHBhcnRzLnJlZHVjZShmdW5jdGlvbiAodGFyZ2V0LCBwcm9wKSB7XG4gICAgICAgICAgICBpZiAodGFyZ2V0ID09IG51bGwpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICAgICAgICAgIHJldHVybiB0YXJnZXRbJCR1bmVzY2FwZV9kb3RzKHByb3ApXTtcbiAgICAgICAgfSwgZmlyc3QpIDogbnVsbDtcbn1cbmZ1bmN0aW9uICQkYWRvcHQoY2hpbGQsIGUpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShjaGlsZCkpXG4gICAgICAgIHJldHVybiBjaGlsZC5mb3JFYWNoKGZ1bmN0aW9uIChpbm5lckNoaWxkKSB7IHJldHVybiAkJGFkb3B0KGlubmVyQ2hpbGQsIGUpOyB9KTtcbiAgICBpZiAoY2hpbGQpXG4gICAgICAgIGUuYXBwZW5kQ2hpbGQoKHR5cGVvZiBjaGlsZCA9PT0gJ29iamVjdCcpID9cbiAgICAgICAgICAgIGNoaWxkIDogZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY2hpbGQgPT0gbnVsbCA/ICcnIDogY2hpbGQpKTtcbn1cbi8qKlxuICogJCR0ZXh0IGNyZWF0ZXMgYSBET01UZXh0Tm9kZVxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gKi9cbmZ1bmN0aW9uICQkdGV4dCh2YWx1ZSkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh2YWx1ZSA9PSBudWxsID8gJycgOiB2YWx1ZSk7XG59XG4vKipcbiAqICQkcmVzb2x2ZSBwcm9wZXJ0eSBhY2Nlc3MgZXhwcmVzc2lvbiB0byBhdm9pZFxuICogdGhvd2luZyBlcnJvcnMgaWYgaXQgZG9lcyBub3QgZXhpc3QuXG4gKiBAcGFyYW0ge29iamVjdH0gaGVhZFxuICogQHBhcmFtIHtzdHJpbmd9IHBhdGhcbiAqL1xuZnVuY3Rpb24gJCRyZXNvbHZlKGhlYWQsIHBhdGgpIHtcbiAgICB2YXIgcmV0ID0gJCRwcm9wZXJ0eShwYXRoLCBoZWFkKTtcbiAgICByZXR1cm4gKHJldCA9PSBudWxsKSA/ICcnIDogcmV0O1xufVxuLyoqXG4gKiAkJG5vZGUgaXMgY2FsbGVkIHRvIGNyZWF0ZSBhIHJlZ3VsYXIgRE9NIG5vZGVcbiAqIEBwYXJhbSB7c3RyaW5nfSB0YWdcbiAqIEBwYXJhbSB7b2JqZWN0fSBhdHRyaWJ1dGVzXG4gKiBAcGFyYW0ge2FycmF5PHN0cmluZ3xudW1iZXJ8V2lkZ2V0Pn0gY2hpbGRyZW5cbiAqIEBwYXJhbSB7Vmlld30gdmlld1xuICovXG5mdW5jdGlvbiAkJG5vZGUodGFnLCBhdHRyaWJ1dGVzLCBjaGlsZHJlbiwgdmlldykge1xuICAgIHZhciBlID0gKHRhZyA9PT0gJ2ZyYWdtZW50JykgPyBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCkgOiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XG4gICAgaWYgKHR5cGVvZiBhdHRyaWJ1dGVzLmh0bWwgPT09ICdvYmplY3QnKVxuICAgICAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzLmh0bWwpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBhdHRyaWJ1dGVzLmh0bWxba2V5XSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIGVba2V5XSA9IGF0dHJpYnV0ZXMuaHRtbFtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZS5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyaWJ1dGVzLmh0bWxba2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIGNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKGMpIHsgcmV0dXJuICQkYWRvcHQoYywgZSk7IH0pO1xuICAgIGlmIChhdHRyaWJ1dGVzLndtbClcbiAgICAgICAgaWYgKGF0dHJpYnV0ZXMud21sLmlkKVxuICAgICAgICAgICAgdmlldy5yZWdpc3RlcihhdHRyaWJ1dGVzLndtbC5pZCwgZSk7XG4gICAgcmV0dXJuIGU7XG59XG4vKipcbiAqIEF0dHJpYnV0ZXMgcHJvdmlkZXMgYW4gQVBJIGZvciByZWFkaW5nIHRoZVxuICogYXR0cmlidXRlcyBzdXBwbGllZCB0byBhbiBFbGVtZW50LlxuICogQHBhcmFtIHtvYmplY3R9IGF0dHJzXG4gKi9cbnZhciBBdHRyaWJ1dGVzID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBBdHRyaWJ1dGVzKF9hdHRycykge1xuICAgICAgICB0aGlzLl9hdHRycyA9IF9hdHRycztcbiAgICAgICAgdGhpcy5fYXR0cnMgPSBfYXR0cnM7XG4gICAgfVxuICAgIEF0dHJpYnV0ZXMucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uIChwYXRoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlYWQocGF0aCkgIT0gbnVsbDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIHJlYWQgYSB2YWx1ZSBmb3JtIHRoZSBpbnRlcm5hbCBsaXN0LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoXG4gICAgICogQHBhcmFtIHsqfSBkZWZhdWx0VmFsdWUgLSBUaGlzIHZhbHVlIGlzIHJldHVybmVkIGlmIHRoZSB2YWx1ZSBpcyBub3Qgc2V0LlxuICAgICAqL1xuICAgIEF0dHJpYnV0ZXMucHJvdG90eXBlLnJlYWQgPSBmdW5jdGlvbiAocGF0aCwgZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgIHZhciByZXQgPSAkJHByb3BlcnR5KHBhdGguc3BsaXQoJzonKS5qb2luKCcuJyksIHRoaXMuX2F0dHJzKTtcbiAgICAgICAgcmV0dXJuIChyZXQgIT0gbnVsbCkgPyByZXQgOiAoZGVmYXVsdFZhbHVlICE9IG51bGwpID8gZGVmYXVsdFZhbHVlIDogJyc7XG4gICAgfTtcbiAgICByZXR1cm4gQXR0cmlidXRlcztcbn0oKSk7XG4vKipcbiAqICQkd2lkZ2V0IGNyZWF0ZXMgYSB3bWwgd2lkZ2V0LlxuICogQHBhcmFtIHtmdW5jdGlvbn0gQ29uc3RydXRvclxuICogQHBhcmFtIHtvYmplY3R9IGF0dHJpYnV0ZXNcbiAqIEBwYXJhbSB7YXJyYXk8c3RyaW5nfG51bWJlcnxXaWRnZXQ+fSBjaGlsZHJlblxuICogQHBhcmFtIHtWaWV3fSB2aWV3XG4gKiBAcmV0dXJuIHtXaWRnZXR9XG4gKi9cbmZ1bmN0aW9uICQkd2lkZ2V0KENvbnN0cnVjdG9yLCBhdHRyaWJ1dGVzLCBjaGlsZHJlbiwgdmlldykge1xuICAgIHZhciBjaGlsZHMgPSBbXTtcbiAgICB2YXIgdztcbiAgICBjaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChjaGlsZCkgeyByZXR1cm4gQXJyYXkuaXNBcnJheShjaGlsZCkgP1xuICAgICAgICBjaGlsZHMucHVzaC5hcHBseShjaGlsZHMsIGNoaWxkKSA6IGNoaWxkcy5wdXNoKGNoaWxkKTsgfSk7XG4gICAgdyA9IG5ldyBDb25zdHJ1Y3RvcihuZXcgQXR0cmlidXRlcyhhdHRyaWJ1dGVzKSwgY2hpbGRzKTtcbiAgICBpZiAoYXR0cmlidXRlcy53bWwpXG4gICAgICAgIGlmIChhdHRyaWJ1dGVzLndtbC5pZClcbiAgICAgICAgICAgIHZpZXcucmVnaXN0ZXIoYXR0cmlidXRlcy53bWwuaWQsIHcpO1xuICAgIHZpZXcud2lkZ2V0cy5wdXNoKHcpO1xuICAgIHJldHVybiB3LnJlbmRlcigpO1xufVxuLyoqXG4gKiAkJGlmIGlzIGNhbGxlZCB0byBjcmVhdGUgYW4gaWYgY29uZGl0aW9uYWwgY29uc3RydWN0XG4gKiBAcGFyYW0geyp9IHByZWRpY2F0ZVxuICogQHBhcmFtIHtmdW5jdGlvbn0gcG9zaXRpdmVcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IG5lZ2F0aXZlXG4gKi9cbmZ1bmN0aW9uICQkaWYocHJlZGljYXRlLCBwb3NpdGl2ZSwgbmVnYXRpdmUpIHtcbiAgICByZXR1cm4gKHByZWRpY2F0ZSkgPyBwb3NpdGl2ZSgpIDogbmVnYXRpdmUoKTtcbn1cbi8qKlxuICogJCRmb3IgaXMgY2FsbGVkIHRvIGNyZWF0ZSBhIGZvciBsb29wIGNvbnN0cnVjdFxuICogQHBhcmFtIHtJdGVyYWJsZX0gY29sbGVjdGlvblxuICogQHBhcmFtIHtmdW5jdGlvbn0gY2JcbiAqL1xuZnVuY3Rpb24gJCRmb3IoY29sbGVjdGlvbiwgY2IpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShjb2xsZWN0aW9uKSkge1xuICAgICAgICByZXR1cm4gY29sbGVjdGlvbi5tYXAoY2IpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgY29sbGVjdGlvbiA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGNvbGxlY3Rpb24pLm1hcChmdW5jdGlvbiAoa2V5LCBfLCBhbGwpIHsgcmV0dXJuIGNiKGNvbGxlY3Rpb25ba2V5XSwga2V5LCBhbGwpOyB9KTtcbiAgICB9XG4gICAgcmV0dXJuIFtdO1xufVxuLyoqXG4gKiAkJHN3aXRjaCBzaW11bGF0ZXMgYSBzd2l0Y2ggc3RhdGVtZW50XG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ8Ym9vbGVhbn0gdmFsdWVcbiAqIEBwYXJhbSB7b2JqZWN0fSBjYXNlc1xuICovXG5mdW5jdGlvbiAkJHN3aXRjaCh2YWx1ZSwgY2FzZXMpIHtcbiAgICB2YXIgcmVzdWx0ID0gY2FzZXNbdmFsdWVdO1xuICAgIHZhciBkZWZhdWwgPSBjYXNlc1tcImRlZmF1bHRcIl07XG4gICAgaWYgKHJlc3VsdClcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICBpZiAoZGVmYXVsKVxuICAgICAgICByZXR1cm4gZGVmYXVsO1xufVxuZnVuY3Rpb24gQ3JlYXRlRGlhbG9nKHZpZXcpIHtcbiAgICByZXR1cm4gJCRub2RlKCdmcmFnbWVudCcsIHtcbiAgICAgICAgaHRtbDoge31cbiAgICB9LCBbXSwgdmlldyk7XG59XG5leHBvcnRzLkNyZWF0ZURpYWxvZyA9IENyZWF0ZURpYWxvZztcbmZ1bmN0aW9uIG5hdmlnYXRpb24odmlldykge1xuICAgIHJldHVybiAkJG5vZGUoJ3AnLCB7XG4gICAgICAgIGh0bWw6IHt9XG4gICAgfSwgWyQkdGV4dChcIlRoaXMgaXMgaW4gdGhlIGRyYXdlclwiKV0sIHZpZXcpO1xufVxuZXhwb3J0cy5uYXZpZ2F0aW9uID0gbmF2aWdhdGlvbjtcbmZ1bmN0aW9uIGNvbnRlbnQodmlldykge1xuICAgIHJldHVybiAkJG5vZGUoJ2ZyYWdtZW50Jywge1xuICAgICAgICBodG1sOiB7fVxuICAgIH0sIFskJHdpZGdldChjb21wb25lbnRzXzQuTW9kYWwsIHtcbiAgICAgICAgICAgIGh0bWw6IHt9LFxuICAgICAgICAgICAgd21sOiB7XG4gICAgICAgICAgICAgICAgJ2lkJzogXCJtb2RhbFwiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIFskJHdpZGdldChjb21wb25lbnRzXzQuTW9kYWxIZWFkZXIsIHtcbiAgICAgICAgICAgICAgICBodG1sOiB7fVxuICAgICAgICAgICAgfSwgWyQkdGV4dChcIkNyZWF0ZSByZWNvcmRcIildLCB2aWV3KSwgJCR3aWRnZXQoY29tcG9uZW50c180Lk1vZGFsQm9keSwge1xuICAgICAgICAgICAgICAgIGh0bWw6IHt9XG4gICAgICAgICAgICB9LCBbXSwgdmlldyldLCB2aWV3KSwgJCR3aWRnZXQoY29tcG9uZW50c18xLkFjdGlvbkFyZWEsIHtcbiAgICAgICAgICAgIGh0bWw6IHt9LFxuICAgICAgICAgICAgd21sOiB7XG4gICAgICAgICAgICAgICAgJ2lkJzogXCJhY3Rpb25zXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgWyQkd2lkZ2V0KGNvbXBvbmVudHNfMS5NZW51QnV0dG9uLCB7XG4gICAgICAgICAgICAgICAgaHRtbDoge30sXG4gICAgICAgICAgICAgICAgd3c6IHtcbiAgICAgICAgICAgICAgICAgICAgJ29uQ2xpY2snOiB0aGlzLnRvZ2dsZURyYXdlci5iaW5kKHRoaXMpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgW10sIHZpZXcpLCAkJHdpZGdldChjb21wb25lbnRzXzEuQnV0dG9uLCB7XG4gICAgICAgICAgICAgICAgaHRtbDoge30sXG4gICAgICAgICAgICAgICAgd21sOiB7XG4gICAgICAgICAgICAgICAgICAgICdpZCc6IFwiY3JlYXRlQnV0dG9uXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHd3OiB7XG4gICAgICAgICAgICAgICAgICAgICdzdHlsZSc6IFwiLWRhbmdlclwiLFxuICAgICAgICAgICAgICAgICAgICAndGV4dCc6IFwiQ3JlYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICdjbGFzcyc6IFwiLXJpZ2h0XCIsXG4gICAgICAgICAgICAgICAgICAgICdvbkNsaWNrJzogdGhpcy5jcmVhdGUuYmluZCh0aGlzKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIFtdLCB2aWV3KV0sIHZpZXcpLCAkJHdpZGdldChjb21wb25lbnRzXzEuTWFpblZpZXcsIHtcbiAgICAgICAgICAgIGh0bWw6IHt9LFxuICAgICAgICAgICAgd21sOiB7XG4gICAgICAgICAgICAgICAgJ2lkJzogXCJtYWluXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgWyQkd2lkZ2V0KGNvbXBvbmVudHNfMi5Db250YWluZXIsIHtcbiAgICAgICAgICAgICAgICBodG1sOiB7fVxuICAgICAgICAgICAgfSwgWyQkd2lkZ2V0KGNvbXBvbmVudHNfMi5Sb3csIHtcbiAgICAgICAgICAgICAgICAgICAgaHRtbDoge31cbiAgICAgICAgICAgICAgICB9LCBbJCR3aWRnZXQoY29tcG9uZW50c18yLkNvbHVtbiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDoge31cbiAgICAgICAgICAgICAgICAgICAgfSwgWyQkd2lkZ2V0KGNvbXBvbmVudHNfMy5QYW5lbCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGh0bWw6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd3OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdzdHlsZSc6IFwiLWluZm9cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIFskJHdpZGdldChjb21wb25lbnRzXzMuUGFuZWxIZWFkZXIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDoge31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBbJCR0ZXh0KFwiRGV0YWlsc1wiKV0sIHZpZXcpLCAkJHdpZGdldChjb21wb25lbnRzXzMuUGFuZWxCb2R5LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGh0bWw6IHt9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgWyQkdGV4dChcIlJlY29yZHM6XCIpXSwgdmlldyksICQkbm9kZSgndGFibGUnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGh0bWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdjbGFzcyc6IFwidGFibGUgdGFibGUtc3RyaXBlIHRhYmxlLWJvcmRlcmVkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIFskJG5vZGUoJ3RoZWFkJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDoge31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgWyQkbm9kZSgndHInLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDoge31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIFskJG5vZGUoJ3RoJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBodG1sOiB7fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIFskJHRleHQoXCJOdW1iZXJcIildLCB2aWV3KSwgJCRub2RlKCd0aCcsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDoge31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBbJCR0ZXh0KFwiTmFtZVwiKV0sIHZpZXcpLCAkJG5vZGUoJ3RoJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBodG1sOiB7fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIFskJHRleHQoXCJBbW91bnRcIildLCB2aWV3KV0sIHZpZXcpXSwgdmlldyksICQkbm9kZSgndGJvZHknLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBodG1sOiB7fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBbJCRmb3IoJCRyZXNvbHZlKHRoaXMsICdyZWNvcmRzJyksIGZ1bmN0aW9uIGZvcl8xKHJlY29yZCwgbnVtYmVyLCBhcnJheSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbJCRub2RlKCd0cicsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGh0bWw6IHt9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIFskJG5vZGUoJ3RkJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGh0bWw6IHt9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBbbnVtYmVyXSwgdmlldyksICQkbm9kZSgndGQnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDoge31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIFskJHJlc29sdmUocmVjb3JkLCAnbmFtZScpXSwgdmlldyksICQkbm9kZSgndGQnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDoge31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIFskJHJlc29sdmUocmVjb3JkLCAnYW1vdW50JyldLCB2aWV3KV0sIHZpZXcpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSldLCB2aWV3KV0sIHZpZXcpLCAkJHdpZGdldChjb21wb25lbnRzXzMuUGFuZWxGb290ZXIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDoge31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBbJCR0ZXh0KFwiXFxuICAgICAgICAgICAgICAgIDBcXG4gICAgICAgICAgICAgIFwiKV0sIHZpZXcpXSwgdmlldyldLCB2aWV3KV0sIHZpZXcpXSwgdmlldyldLCB2aWV3KV0sIHZpZXcpO1xufVxuZXhwb3J0cy5jb250ZW50ID0gY29udGVudDtcbnZhciBNYWluID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBNYWluKGNvbnRleHQpIHtcbiAgICAgICAgdmFyIHZpZXcgPSB0aGlzO1xuICAgICAgICB0aGlzLmlkcyA9IHt9O1xuICAgICAgICB0aGlzLndpZGdldHMgPSBbXTtcbiAgICAgICAgdGhpcy50cmVlID0gbnVsbDtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAkJHdpZGdldChjb21wb25lbnRzXzEuRHJhd2VyTGF5b3V0LCB7XG4gICAgICAgICAgICAgICAgaHRtbDoge30sXG4gICAgICAgICAgICAgICAgd21sOiB7XG4gICAgICAgICAgICAgICAgICAgICdpZCc6IFwibGF5b3V0XCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHd3OiB7XG4gICAgICAgICAgICAgICAgICAgICduYXZpZ2F0aW9uJzogbmF2aWdhdGlvbixcbiAgICAgICAgICAgICAgICAgICAgJ2NvbnRlbnQnOiBmdW5jdGlvbiBmdW5jdGlvbl9saXRlcmFsXzEodikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRlbnQuY2FsbCh0aGlzLCB2KTtcbiAgICAgICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgW10sIHZpZXcpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBNYWluLnJlbmRlciA9IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgICAgIHJldHVybiAobmV3IE1haW4oY29udGV4dCkpLnJlbmRlcigpO1xuICAgIH07XG4gICAgTWFpbi5wcm90b3R5cGUucmVnaXN0ZXIgPSBmdW5jdGlvbiAoaWQsIHcpIHtcbiAgICAgICAgaWYgKHRoaXMuaWRzLmhhc093blByb3BlcnR5KGlkKSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRHVwbGljYXRlIGlkIFxcJycgKyBpZCArICdcXCcgZGV0ZWN0ZWQhJyk7XG4gICAgICAgIHRoaXMuaWRzW2lkXSA9IHc7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgTWFpbi5wcm90b3R5cGUuZmluZEJ5SWQgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmlkc1tpZF0pID8gdGhpcy5pZHNbaWRdIDogbnVsbDtcbiAgICB9O1xuICAgIE1haW4ucHJvdG90eXBlLmludmFsaWRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjaGlsZHM7XG4gICAgICAgIHZhciBwYXJlbnQgPSB0aGlzLnRyZWUucGFyZW50Tm9kZTtcbiAgICAgICAgdmFyIHJlYWxGaXJzdENoaWxkO1xuICAgICAgICB2YXIgcmVhbEZpcnN0Q2hpbGRJbmRleDtcbiAgICAgICAgaWYgKHRoaXMudHJlZSA9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKCdDYW5ub3QgaW52YWxpZGF0ZSBhIHZpZXcgdGhhdCBoYXMgbm90IGJlZW4gcmVuZGVyZWQhJyk7XG4gICAgICAgIGlmICh0aGlzLnRyZWUucGFyZW50Tm9kZSA9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKCdBdHRlbXB0IHRvIGludmFsaWRhdGUgYSB2aWV3IHRoYXQgaGFzIG5vdCBiZWVuIGluc2VydGVkIHRvIERPTSEnKTtcbiAgICAgICAgY2hpbGRzID0gdGhpcy50cmVlLnBhcmVudE5vZGUuY2hpbGRyZW47XG4gICAgICAgIC8vZm9yIHNvbWUgcmVhc29uIHRoZSByZWZlcmVuY2Ugc3RvcmVkIGRvZXMgbm90IGhhdmUgdGhlIGNvcnJlY3QgcGFyZW50IG5vZGUuXG4gICAgICAgIC8vd2UgZG8gdGhpcyB0byBnZXQgYSAnbGl2ZScgdmVyc2lvbiBvZiB0aGUgbm9kZS5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHMubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICBpZiAoY2hpbGRzW2ldID09PSB0aGlzLnRyZWUpIHtcbiAgICAgICAgICAgICAgICByZWFsRmlyc3RDaGlsZCA9IGNoaWxkc1tpXTtcbiAgICAgICAgICAgICAgICByZWFsRmlyc3RDaGlsZEluZGV4ID0gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgcGFyZW50LnJlcGxhY2VDaGlsZCh0aGlzLnJlbmRlcigpLCByZWFsRmlyc3RDaGlsZCk7XG4gICAgfTtcbiAgICBNYWluLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuaWRzID0ge307XG4gICAgICAgIHRoaXMud2lkZ2V0cy5mb3JFYWNoKGZ1bmN0aW9uICh3KSB7IHJldHVybiB3LnJlbW92ZWQoKTsgfSk7XG4gICAgICAgIHRoaXMud2lkZ2V0cyA9IFtdO1xuICAgICAgICB0aGlzLnRyZWUgPSB0aGlzLnRlbXBsYXRlLmNhbGwodGhpcy5jb250ZXh0KTtcbiAgICAgICAgdGhpcy5pZHNbJ3Jvb3QnXSA9ICh0aGlzLmlkc1sncm9vdCddKSA/IHRoaXMuaWRzWydyb290J10gOiB0aGlzLnRyZWU7XG4gICAgICAgIHRoaXMud2lkZ2V0cy5mb3JFYWNoKGZ1bmN0aW9uICh3KSB7IHJldHVybiB3LnJlbmRlcmVkKCk7IH0pO1xuICAgICAgICByZXR1cm4gdGhpcy50cmVlO1xuICAgIH07XG4gICAgcmV0dXJuIE1haW47XG59KCkpO1xuZXhwb3J0cy5NYWluID0gTWFpbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXZpZXcuanMubWFwIl19
