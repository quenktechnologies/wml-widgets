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
var Styles = require("common/Styles");
var view_1 = require("./wml/view");
/**
 * DrawerLayout provides a top level layout consisting of a drawer and
 * a main content view.
 */
var DrawerLayout = (function (_super) {
    __extends(DrawerLayout, _super);
    function DrawerLayout() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new view_1.Main(_this);
        return _this;
    }
    DrawerLayout.prototype._getDrawerDOM = function () {
        return this.view.findById('drawer');
    };
    DrawerLayout.prototype._combine = function (classes) {
        return classes.join(' ');
    };
    /**
     * drawerContent provides the content for this layout's Drawer.
     */
    DrawerLayout.prototype.drawerContent = function () {
        return this.children[0];
    };
    /**
     * mainViewContent provides the content for this layout's MainView.
     */
    DrawerLayout.prototype.mainViewContent = function () {
        return this.children[1];
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
    DrawerLayout.prototype.toggle = function () {
        this._getDrawerDOM().classList.toggle(Styles.HIDDEN);
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
    DrawerLayout.prototype.render = function () {
        if (this.children.length !== 2)
            console.warn("DrawerLayout: Expected 2 child widgets got " + this.children.length + "!");
        return this.view.render();
    };
    return DrawerLayout;
}(runtime_1.AbstractWidget));
exports.DrawerLayout = DrawerLayout;
exports.default = DrawerLayout;

},{"./wml/view":4,"@quenk/wml/lib/runtime":2,"common/Styles":6}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Styles = require("common/Styles");
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
            child : document.createTextNode(child || ''));
}
/**
 * $$register a Widget or Node by the specified wml:id
 * @param {string} id
 * @param {Widget|Node} target
 * @param {object} ids
 */
function $$register(id, target, ids) {
    if (ids.hasOwnProperty(id))
        throw new Error('Duplicate id \'' + id + '\' detected!');
    ids[id] = target;
    return target;
}
/**
 * $$text creates a DOMTextNode
 * @param {string} value
 */
function $$text(value) {
    return document.createTextNode(value || '');
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
            $$register(attributes.wml.id, e, view.ids);
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
            $$register(attributes.wml.id, w, view.ids);
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
        this.template = function () { return $$node('div', { html: { 'class': $$resolve(Styles, 'DRAWER_LAYOUT') } }, [$$node('div', { html: { 'class': $$resolve(Styles, 'DRAWER') }, wml: { 'id': "drawer" } }, [$$node('div', { html: { 'class': $$resolve(Styles, 'DRAWER_CONTENT') } }, [this.drawerContent()], view)], view), $$node('div', { html: { 'class': this._combine([$$resolve(Styles, 'MAIN_VIEW'), $$resolve(Styles, 'DRAWER_PUSHABLE')]) } }, [this.mainViewContent()], view)], view); };
    }
    Main.render = function (context) {
        return (new Main(context)).render();
    };
    Main.prototype.findById = function (id) {
        return (this.ids[id]) ? this.ids[id] : null;
    };
    Main.prototype.render = function () {
        var tree = null;
        this.ids = {};
        this.widgets.forEach(function (w) { return w.removed(); });
        this.widgets = [];
        tree = this.template.call(this.context);
        this.ids['root'] = (this.ids['root']) ? this.ids['root'] : tree;
        this.widgets.forEach(function (w) { return w.rendered(); });
        return tree;
    };
    return Main;
}());
exports.Main = Main;
exports.default = Main;

},{"common/Styles":6}],5:[function(require,module,exports){
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
/* jshint ignore:end */

},{"./drawer-layout/DrawerLayout":3}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HIDDEN = '--ww-hidden';
exports.DRAWER_LAYOUT = 'ww-drawer-layout';
exports.DRAWER = 'ww-drawer';
exports.DRAWER_CONTENT = 'ww-drawer__content';
exports.DRAWER_PUSHABLE = '--ww-drawer-pushable';
exports.DRAWER_PUSHABLE_FIXED = '--ww-drawer-pushable-fixed';
exports.MAIN_VIEW = 'ww-main-view';
exports.LAYOUT = 'ww-layout';
exports.VISIBLE = 'wat-visible';
exports.ACTIVE = 'wat-active';
exports.DOWN_ARROW = 'arrow-down';
exports.UP_ARROW = 'arrow-up';
exports.LAYOUT_MAIN_CONTENT = 'wat-layout-main-content';
exports.LAYOUT_ACTION_AREA = 'wat-layout-action-area';
exports.LAYOUT_ACTION_AREA_CONTENT = 'wat-layout-action-area-content';
exports.LAYOUT_MENU_BUTTON = 'wat-layout-menu-button';
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

},{}],7:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var view_1 = require("./view");
var Application = (function () {
    function Application() {
        this.view = new view_1.Main(this);
    }
    Application.prototype.run = function () {
        window.app = this;
        document.getElementById('main').appendChild(this.view.render());
        this.drawer = this.view.findById('drawer');
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

},{"./view":8}],8:[function(require,module,exports){
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
            child : document.createTextNode(child || ''));
}
/**
 * $$register a Widget or Node by the specified wml:id
 * @param {string} id
 * @param {Widget|Node} target
 * @param {object} ids
 */
function $$register(id, target, ids) {
    if (ids.hasOwnProperty(id))
        throw new Error('Duplicate id \'' + id + '\' detected!');
    ids[id] = target;
    return target;
}
/**
 * $$text creates a DOMTextNode
 * @param {string} value
 */
function $$text(value) {
    return document.createTextNode(value || '');
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
            $$register(attributes.wml.id, e, view.ids);
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
            $$register(attributes.wml.id, w, view.ids);
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
var Main = (function () {
    function Main(context) {
        var view = this;
        this.ids = {};
        this.widgets = [];
        this.tree = null;
        this.context = context;
        this.template = function () {
            return $$widget(components_1.DrawerLayout, {
                html: {}
            }, [$$node('p', {
                    html: {}
                }, [$$text("This is in the drawer")], view), $$node('p', {
                    html: {}
                }, [$$text(" This is in main")], view)], view);
        };
    }
    Main.render = function (context) {
        return (new Main(context)).render();
    };
    Main.prototype.findById = function (id) {
        return (this.ids[id]) ? this.ids[id] : null;
    };
    Main.prototype.render = function () {
        var tree = null;
        this.ids = {};
        this.widgets.forEach(function (w) { return w.removed(); });
        this.widgets = [];
        tree = this.template.call(this.context);
        this.ids['root'] = (this.ids['root']) ? this.ids['root'] : tree;
        this.widgets.forEach(function (w) { return w.rendered(); });
        return tree;
    };
    return Main;
}());
exports.Main = Main;
exports["default"] = Main;

},{"@quenk/wml-widgets/lib/components":5}]},{},[7])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi93bWwtY29yZS9zcmMvcnVudGltZS9BYnN0cmFjdFdpZGdldC5qcyIsIi4uL3dtbC1jb3JlL3NyYy9ydW50aW1lL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL0BxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50cy9kcmF3ZXItbGF5b3V0L0RyYXdlckxheW91dC5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvZHJhd2VyLWxheW91dC93bWwvdmlldy5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvY29tbW9uL1N0eWxlcy5qcyIsInRlc3QvYXBwL2FwcC5qcyIsInRlc3QvYXBwL3ZpZXcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7O0FDQUE7OztJQUdNLGM7QUFFSiwwQkFBWSxLQUFaLEVBQW1CLFFBQW5CLEVBQTZCO0FBQUE7O0FBRTNCLFNBQUssVUFBTCxHQUFrQixLQUFsQjtBQUNBLFNBQUssUUFBTCxHQUFnQixRQUFoQjtBQUNBLFNBQUssSUFBTCxHQUFZLElBQVo7QUFFRDs7OzsrQkFFVSxDQUVWOzs7OEJBRVMsQ0FFVDs7OzZCQUVROztBQUVQLGFBQU8sS0FBSyxJQUFMLENBQVUsTUFBVixFQUFQO0FBRUQ7Ozs7OztrQkFJWSxjOzs7Ozs7Ozs7Ozs7Ozs7O1FDNUJSLGM7QUFDUDtBQUZBOzs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxuICogQWJzdHJhY3RXaWRnZXRcbiAqL1xuY2xhc3MgQWJzdHJhY3RXaWRnZXQge1xuXG4gIGNvbnN0cnVjdG9yKGF0dHJzLCBjaGlsZHJlbikge1xuXG4gICAgdGhpcy5hdHRyaWJ1dGVzID0gYXR0cnM7XG4gICAgdGhpcy5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICAgIHRoaXMudmlldyA9IG51bGw7XG5cbiAgfVxuXG4gIHJlbmRlcmVkKCkge1xuXG4gIH1cblxuICByZW1vdmVkKCkge1xuXG4gIH1cblxuICByZW5kZXIoKSB7XG5cbiAgICByZXR1cm4gdGhpcy52aWV3LnJlbmRlcigpO1xuXG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBBYnN0cmFjdFdpZGdldFxuXG4iLCIvKmpzaGludCBpZ25vcmU6c3RhcnQgKi9cbmV4cG9ydCBBYnN0cmFjdFdpZGdldCBmcm9tICcuL0Fic3RyYWN0V2lkZ2V0Jztcbi8qanNoaW50IGlnbm9yZTplbmQgKi9cblxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBydW50aW1lXzEgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbC9saWIvcnVudGltZVwiKTtcbnZhciBTdHlsZXMgPSByZXF1aXJlKFwiY29tbW9uL1N0eWxlc1wiKTtcbnZhciB2aWV3XzEgPSByZXF1aXJlKFwiLi93bWwvdmlld1wiKTtcbi8qKlxuICogRHJhd2VyTGF5b3V0IHByb3ZpZGVzIGEgdG9wIGxldmVsIGxheW91dCBjb25zaXN0aW5nIG9mIGEgZHJhd2VyIGFuZFxuICogYSBtYWluIGNvbnRlbnQgdmlldy5cbiAqL1xudmFyIERyYXdlckxheW91dCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKERyYXdlckxheW91dCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBEcmF3ZXJMYXlvdXQoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IHZpZXdfMS5NYWluKF90aGlzKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBEcmF3ZXJMYXlvdXQucHJvdG90eXBlLl9nZXREcmF3ZXJET00gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZpZXcuZmluZEJ5SWQoJ2RyYXdlcicpO1xuICAgIH07XG4gICAgRHJhd2VyTGF5b3V0LnByb3RvdHlwZS5fY29tYmluZSA9IGZ1bmN0aW9uIChjbGFzc2VzKSB7XG4gICAgICAgIHJldHVybiBjbGFzc2VzLmpvaW4oJyAnKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIGRyYXdlckNvbnRlbnQgcHJvdmlkZXMgdGhlIGNvbnRlbnQgZm9yIHRoaXMgbGF5b3V0J3MgRHJhd2VyLlxuICAgICAqL1xuICAgIERyYXdlckxheW91dC5wcm90b3R5cGUuZHJhd2VyQ29udGVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hpbGRyZW5bMF07XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBtYWluVmlld0NvbnRlbnQgcHJvdmlkZXMgdGhlIGNvbnRlbnQgZm9yIHRoaXMgbGF5b3V0J3MgTWFpblZpZXcuXG4gICAgICovXG4gICAgRHJhd2VyTGF5b3V0LnByb3RvdHlwZS5tYWluVmlld0NvbnRlbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNoaWxkcmVuWzFdO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogZHJhd2VyVmlzaWJsZSBxdWVyaWVzIHdoZXRoZXIgdGhlIERyYXdlciBpcyB2aXNpYmxlIG9yIG5vdC5cbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBEcmF3ZXJMYXlvdXQucHJvdG90eXBlLmRyYXdlclZpc2libGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAhdGhpcy5fZ2V0RHJhd2VyRE9NKCkuY2xhc3NMaXN0LmNvbnRhaW5zKFN0eWxlcy5ISURERU4pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogaGlkZURyYXdlciBoaWRlcyB0aGUgZHJhd2VyLlxuICAgICAqL1xuICAgIERyYXdlckxheW91dC5wcm90b3R5cGUuaGlkZURyYXdlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuZHJhd2VyVmlzaWJsZSgpKVxuICAgICAgICAgICAgdGhpcy5fZ2V0RHJhd2VyRE9NKCkuY2xhc3NMaXN0LmFkZChTdHlsZXMuSElEREVOKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIHNob3dEcmF3ZXIgc2hvd3MgdGhlIGRyYXdlclxuICAgICAqL1xuICAgIERyYXdlckxheW91dC5wcm90b3R5cGUuc2hvd0RyYXdlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRyYXdlclZpc2libGUoKSlcbiAgICAgICAgICAgIHRoaXMuX2dldERyYXdlckRPTSgpLmNsYXNzTGlzdC5yZW1vdmUoU3R5bGVzLkhJRERFTik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiB0b2dnbGUgdGhlIHZpc2liaWxpdHkgb2YgdGhpcyBEcmF3ZXJcbiAgICAgKi9cbiAgICBEcmF3ZXJMYXlvdXQucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fZ2V0RHJhd2VyRE9NKCkuY2xhc3NMaXN0LnRvZ2dsZShTdHlsZXMuSElEREVOKTtcbiAgICB9O1xuICAgIERyYXdlckxheW91dC5wcm90b3R5cGUucmVuZGVyZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh3aW5kb3cubWF0Y2hNZWRpYSgnKG1heC13aWR0aDogNDgwcHgnKS5tYXRjaGVzKVxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcyk7XG4gICAgfTtcbiAgICBEcmF3ZXJMYXlvdXQucHJvdG90eXBlLmhhbmRsZUV2ZW50ID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKGUgaW5zdGFuY2VvZiBNb3VzZUV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgZHJhd2VyID0gdGhpcy52aWV3LmZpbmRCeUlkKCdkcmF3ZXInKTtcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICAgICAgICAgIGlmICgodGFyZ2V0ICE9PSBkcmF3ZXIpICYmICghZHJhd2VyLmNvbnRhaW5zKHRhcmdldCkpKVxuICAgICAgICAgICAgICAgIGlmICghd2luZG93LmRvY3VtZW50LmNvbnRhaW5zKGRyYXdlcikpXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMpO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlRHJhd2VyKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIERyYXdlckxheW91dC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5jaGlsZHJlbi5sZW5ndGggIT09IDIpXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJEcmF3ZXJMYXlvdXQ6IEV4cGVjdGVkIDIgY2hpbGQgd2lkZ2V0cyBnb3QgXCIgKyB0aGlzLmNoaWxkcmVuLmxlbmd0aCArIFwiIVwiKTtcbiAgICAgICAgcmV0dXJuIHRoaXMudmlldy5yZW5kZXIoKTtcbiAgICB9O1xuICAgIHJldHVybiBEcmF3ZXJMYXlvdXQ7XG59KHJ1bnRpbWVfMS5BYnN0cmFjdFdpZGdldCkpO1xuZXhwb3J0cy5EcmF3ZXJMYXlvdXQgPSBEcmF3ZXJMYXlvdXQ7XG5leHBvcnRzLmRlZmF1bHQgPSBEcmF3ZXJMYXlvdXQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1EcmF3ZXJMYXlvdXQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgU3R5bGVzID0gcmVxdWlyZShcImNvbW1vbi9TdHlsZXNcIik7XG5mdW5jdGlvbiAkJGJvdW5kYXJ5X3RvX2RvdCh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZS5zcGxpdCgnXVsnKS5qb2luKCcuJykuc3BsaXQoJ1snKS5qb2luKCcuJyk7XG59XG5mdW5jdGlvbiAkJHN0cmlwX2JyYWNlcyh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZS5zcGxpdCgnWycpLmpvaW4oJy4nKS5zcGxpdCgnXScpLmpvaW4oJycpO1xufVxuZnVuY3Rpb24gJCRlc2NhcGVfZG90cyh2YWx1ZSkge1xuICAgIHZhbHVlID0gdmFsdWUuc3BsaXQoJ1xcJycpO1xuICAgIHJldHVybiAodmFsdWUubGVuZ3RoIDwgMykgPyB2YWx1ZS5qb2luKCdcXCcnKSA6IHZhbHVlLm1hcChmdW5jdGlvbiAoc2VnKSB7XG4gICAgICAgIGlmIChzZWcubGVuZ3RoIDwgMylcbiAgICAgICAgICAgIHJldHVybiBzZWc7XG4gICAgICAgIGlmICgoc2VnWzBdID09PSAnLicpIHx8IChzZWdbc2VnLmxlbmd0aCAtIDFdID09PSAnLicpKVxuICAgICAgICAgICAgcmV0dXJuIHNlZztcbiAgICAgICAgcmV0dXJuIHNlZy5zcGxpdCgnLicpLmpvaW4oJyYmJyk7XG4gICAgfSkuam9pbignJyk7XG59XG5mdW5jdGlvbiAkJHVuZXNjYXBlX2RvdHModmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUuc3BsaXQoJyYmJykuam9pbignLicpO1xufVxuZnVuY3Rpb24gJCRwYXJ0aWZ5KHZhbHVlKSB7XG4gICAgaWYgKCF2YWx1ZSlcbiAgICAgICAgcmV0dXJuO1xuICAgIHJldHVybiAkJGVzY2FwZV9kb3RzKCQkc3RyaXBfYnJhY2VzKCQkYm91bmRhcnlfdG9fZG90KCcnICsgdmFsdWUpKSkuc3BsaXQoJy4nKTtcbn1cbmZ1bmN0aW9uICQkcHJvcGVydHkocGF0aCwgbykge1xuICAgIHZhciBwYXJ0cyA9ICQkcGFydGlmeShwYXRoKTtcbiAgICB2YXIgZmlyc3Q7XG4gICAgaWYgKHR5cGVvZiBvICE9PSAnb2JqZWN0JylcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZ2V0KCk6IGV4cGVjdHMgYW4gb2JqZWN0IGdvdCAnICsgdHlwZW9mIG8pO1xuICAgIGlmIChwYXJ0cy5sZW5ndGggPT09IDEpXG4gICAgICAgIHJldHVybiBvWyQkdW5lc2NhcGVfZG90cyhwYXJ0c1swXSldO1xuICAgIGlmIChwYXJ0cy5sZW5ndGggPT09IDApXG4gICAgICAgIHJldHVybjtcbiAgICBmaXJzdCA9IG9bcGFydHMuc2hpZnQoKV07XG4gICAgcmV0dXJuICgodHlwZW9mIG8gPT09ICdvYmplY3QnKSAmJiAobyAhPT0gbnVsbCkpID9cbiAgICAgICAgcGFydHMucmVkdWNlKGZ1bmN0aW9uICh0YXJnZXQsIHByb3ApIHtcbiAgICAgICAgICAgIGlmICh0YXJnZXQgPT0gbnVsbClcbiAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgICAgICAgICAgcmV0dXJuIHRhcmdldFskJHVuZXNjYXBlX2RvdHMocHJvcCldO1xuICAgICAgICB9LCBmaXJzdCkgOiBudWxsO1xufVxuZnVuY3Rpb24gJCRhZG9wdChjaGlsZCwgZSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGNoaWxkKSlcbiAgICAgICAgcmV0dXJuIGNoaWxkLmZvckVhY2goZnVuY3Rpb24gKGlubmVyQ2hpbGQpIHsgcmV0dXJuICQkYWRvcHQoaW5uZXJDaGlsZCwgZSk7IH0pO1xuICAgIGlmIChjaGlsZClcbiAgICAgICAgZS5hcHBlbmRDaGlsZCgodHlwZW9mIGNoaWxkID09PSAnb2JqZWN0JykgP1xuICAgICAgICAgICAgY2hpbGQgOiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjaGlsZCB8fCAnJykpO1xufVxuLyoqXG4gKiAkJHJlZ2lzdGVyIGEgV2lkZ2V0IG9yIE5vZGUgYnkgdGhlIHNwZWNpZmllZCB3bWw6aWRcbiAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICogQHBhcmFtIHtXaWRnZXR8Tm9kZX0gdGFyZ2V0XG4gKiBAcGFyYW0ge29iamVjdH0gaWRzXG4gKi9cbmZ1bmN0aW9uICQkcmVnaXN0ZXIoaWQsIHRhcmdldCwgaWRzKSB7XG4gICAgaWYgKGlkcy5oYXNPd25Qcm9wZXJ0eShpZCkpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignRHVwbGljYXRlIGlkIFxcJycgKyBpZCArICdcXCcgZGV0ZWN0ZWQhJyk7XG4gICAgaWRzW2lkXSA9IHRhcmdldDtcbiAgICByZXR1cm4gdGFyZ2V0O1xufVxuLyoqXG4gKiAkJHRleHQgY3JlYXRlcyBhIERPTVRleHROb2RlXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAqL1xuZnVuY3Rpb24gJCR0ZXh0KHZhbHVlKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHZhbHVlIHx8ICcnKTtcbn1cbi8qKlxuICogJCRyZXNvbHZlIHByb3BlcnR5IGFjY2VzcyBleHByZXNzaW9uIHRvIGF2b2lkXG4gKiB0aG93aW5nIGVycm9ycyBpZiBpdCBkb2VzIG5vdCBleGlzdC5cbiAqIEBwYXJhbSB7b2JqZWN0fSBoZWFkXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0aFxuICovXG5mdW5jdGlvbiAkJHJlc29sdmUoaGVhZCwgcGF0aCkge1xuICAgIHZhciByZXQgPSAkJHByb3BlcnR5KHBhdGgsIGhlYWQpO1xuICAgIHJldHVybiAocmV0ID09IG51bGwpID8gJycgOiByZXQ7XG59XG4vKipcbiAqICQkbm9kZSBpcyBjYWxsZWQgdG8gY3JlYXRlIGEgcmVndWxhciBET00gbm9kZVxuICogQHBhcmFtIHtzdHJpbmd9IHRhZ1xuICogQHBhcmFtIHtvYmplY3R9IGF0dHJpYnV0ZXNcbiAqIEBwYXJhbSB7YXJyYXk8c3RyaW5nfG51bWJlcnxXaWRnZXQ+fSBjaGlsZHJlblxuICogQHBhcmFtIHtWaWV3fSB2aWV3XG4gKi9cbmZ1bmN0aW9uICQkbm9kZSh0YWcsIGF0dHJpYnV0ZXMsIGNoaWxkcmVuLCB2aWV3KSB7XG4gICAgdmFyIGUgPSAodGFnID09PSAnZnJhZ21lbnQnKSA/IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSA6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgICBpZiAodHlwZW9mIGF0dHJpYnV0ZXMuaHRtbCA9PT0gJ29iamVjdCcpXG4gICAgICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMuaHRtbCkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGF0dHJpYnV0ZXMuaHRtbFtrZXldID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgZVtrZXldID0gYXR0cmlidXRlcy5odG1sW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBlLnNldEF0dHJpYnV0ZShrZXksIGF0dHJpYnV0ZXMuaHRtbFtrZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoYykgeyByZXR1cm4gJCRhZG9wdChjLCBlKTsgfSk7XG4gICAgaWYgKGF0dHJpYnV0ZXMud21sKVxuICAgICAgICBpZiAoYXR0cmlidXRlcy53bWwuaWQpXG4gICAgICAgICAgICAkJHJlZ2lzdGVyKGF0dHJpYnV0ZXMud21sLmlkLCBlLCB2aWV3Lmlkcyk7XG4gICAgcmV0dXJuIGU7XG59XG4vKipcbiAqIEF0dHJpYnV0ZXMgcHJvdmlkZXMgYW4gQVBJIGZvciByZWFkaW5nIHRoZVxuICogYXR0cmlidXRlcyBzdXBwbGllZCB0byBhbiBFbGVtZW50LlxuICogQHBhcmFtIHtvYmplY3R9IGF0dHJzXG4gKi9cbnZhciBBdHRyaWJ1dGVzID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBBdHRyaWJ1dGVzKF9hdHRycykge1xuICAgICAgICB0aGlzLl9hdHRycyA9IF9hdHRycztcbiAgICAgICAgdGhpcy5fYXR0cnMgPSBfYXR0cnM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIHJlYWQgYSB2YWx1ZSBmb3JtIHRoZSBpbnRlcm5hbCBsaXN0LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoXG4gICAgICogQHBhcmFtIHsqfSBkZWZhdWx0VmFsdWUgLSBUaGlzIHZhbHVlIGlzIHJldHVybmVkIGlmIHRoZSB2YWx1ZSBpcyBub3Qgc2V0LlxuICAgICAqL1xuICAgIEF0dHJpYnV0ZXMucHJvdG90eXBlLnJlYWQgPSBmdW5jdGlvbiAocGF0aCwgZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgIHZhciByZXQgPSAkJHByb3BlcnR5KHBhdGguc3BsaXQoJzonKS5qb2luKCcuJyksIHRoaXMuX2F0dHJzKTtcbiAgICAgICAgcmV0dXJuIChyZXQgIT0gbnVsbCkgPyByZXQgOiAoZGVmYXVsdFZhbHVlICE9IG51bGwpID8gZGVmYXVsdFZhbHVlIDogJyc7XG4gICAgfTtcbiAgICByZXR1cm4gQXR0cmlidXRlcztcbn0oKSk7XG4vKipcbiAqICQkd2lkZ2V0IGNyZWF0ZXMgYSB3bWwgd2lkZ2V0LlxuICogQHBhcmFtIHtmdW5jdGlvbn0gQ29uc3RydXRvclxuICogQHBhcmFtIHtvYmplY3R9IGF0dHJpYnV0ZXNcbiAqIEBwYXJhbSB7YXJyYXk8c3RyaW5nfG51bWJlcnxXaWRnZXQ+fSBjaGlsZHJlblxuICogQHBhcmFtIHtWaWV3fSB2aWV3XG4gKiBAcmV0dXJuIHtXaWRnZXR9XG4gKi9cbmZ1bmN0aW9uICQkd2lkZ2V0KENvbnN0cnVjdG9yLCBhdHRyaWJ1dGVzLCBjaGlsZHJlbiwgdmlldykge1xuICAgIHZhciBjaGlsZHMgPSBbXTtcbiAgICB2YXIgdztcbiAgICBjaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChjaGlsZCkgeyByZXR1cm4gQXJyYXkuaXNBcnJheShjaGlsZCkgP1xuICAgICAgICBjaGlsZHMucHVzaC5hcHBseShjaGlsZHMsIGNoaWxkKSA6IGNoaWxkcy5wdXNoKGNoaWxkKTsgfSk7XG4gICAgdyA9IG5ldyBDb25zdHJ1Y3RvcihuZXcgQXR0cmlidXRlcyhhdHRyaWJ1dGVzKSwgY2hpbGRzKTtcbiAgICBpZiAoYXR0cmlidXRlcy53bWwpXG4gICAgICAgIGlmIChhdHRyaWJ1dGVzLndtbC5pZClcbiAgICAgICAgICAgICQkcmVnaXN0ZXIoYXR0cmlidXRlcy53bWwuaWQsIHcsIHZpZXcuaWRzKTtcbiAgICB2aWV3LndpZGdldHMucHVzaCh3KTtcbiAgICByZXR1cm4gdy5yZW5kZXIoKTtcbn1cbi8qKlxuICogJCRpZiBpcyBjYWxsZWQgdG8gY3JlYXRlIGFuIGlmIGNvbmRpdGlvbmFsIGNvbnN0cnVjdFxuICogQHBhcmFtIHsqfSBwcmVkaWNhdGVcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHBvc2l0aXZlXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBuZWdhdGl2ZVxuICovXG5mdW5jdGlvbiAkJGlmKHByZWRpY2F0ZSwgcG9zaXRpdmUsIG5lZ2F0aXZlKSB7XG4gICAgcmV0dXJuIChwcmVkaWNhdGUpID8gcG9zaXRpdmUoKSA6IG5lZ2F0aXZlKCk7XG59XG4vKipcbiAqICQkZm9yIGlzIGNhbGxlZCB0byBjcmVhdGUgYSBmb3IgbG9vcCBjb25zdHJ1Y3RcbiAqIEBwYXJhbSB7SXRlcmFibGV9IGNvbGxlY3Rpb25cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNiXG4gKi9cbmZ1bmN0aW9uICQkZm9yKGNvbGxlY3Rpb24sIGNiKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoY29sbGVjdGlvbikpIHtcbiAgICAgICAgcmV0dXJuIGNvbGxlY3Rpb24ubWFwKGNiKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGNvbGxlY3Rpb24gPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhjb2xsZWN0aW9uKS5tYXAoZnVuY3Rpb24gKGtleSwgXywgYWxsKSB7IHJldHVybiBjYihjb2xsZWN0aW9uW2tleV0sIGtleSwgYWxsKTsgfSk7XG4gICAgfVxuICAgIHJldHVybiBbXTtcbn1cbi8qKlxuICogJCRzd2l0Y2ggc2ltdWxhdGVzIGEgc3dpdGNoIHN0YXRlbWVudFxuICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfGJvb2xlYW59IHZhbHVlXG4gKiBAcGFyYW0ge29iamVjdH0gY2FzZXNcbiAqL1xuZnVuY3Rpb24gJCRzd2l0Y2godmFsdWUsIGNhc2VzKSB7XG4gICAgdmFyIHJlc3VsdCA9IGNhc2VzW3ZhbHVlXTtcbiAgICB2YXIgZGVmYXVsID0gY2FzZXMuZGVmYXVsdDtcbiAgICBpZiAocmVzdWx0KVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIGlmIChkZWZhdWwpXG4gICAgICAgIHJldHVybiBkZWZhdWw7XG59XG52YXIgTWFpbiA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTWFpbihjb250ZXh0KSB7XG4gICAgICAgIHZhciB2aWV3ID0gdGhpcztcbiAgICAgICAgdGhpcy5pZHMgPSB7fTtcbiAgICAgICAgdGhpcy53aWRnZXRzID0gW107XG4gICAgICAgIHRoaXMudHJlZSA9IG51bGw7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAkJG5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiAkJHJlc29sdmUoU3R5bGVzLCAnRFJBV0VSX0xBWU9VVCcpIH0gfSwgWyQkbm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6ICQkcmVzb2x2ZShTdHlsZXMsICdEUkFXRVInKSB9LCB3bWw6IHsgJ2lkJzogXCJkcmF3ZXJcIiB9IH0sIFskJG5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiAkJHJlc29sdmUoU3R5bGVzLCAnRFJBV0VSX0NPTlRFTlQnKSB9IH0sIFt0aGlzLmRyYXdlckNvbnRlbnQoKV0sIHZpZXcpXSwgdmlldyksICQkbm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6IHRoaXMuX2NvbWJpbmUoWyQkcmVzb2x2ZShTdHlsZXMsICdNQUlOX1ZJRVcnKSwgJCRyZXNvbHZlKFN0eWxlcywgJ0RSQVdFUl9QVVNIQUJMRScpXSkgfSB9LCBbdGhpcy5tYWluVmlld0NvbnRlbnQoKV0sIHZpZXcpXSwgdmlldyk7IH07XG4gICAgfVxuICAgIE1haW4ucmVuZGVyID0gZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICAgICAgcmV0dXJuIChuZXcgTWFpbihjb250ZXh0KSkucmVuZGVyKCk7XG4gICAgfTtcbiAgICBNYWluLnByb3RvdHlwZS5maW5kQnlJZCA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICByZXR1cm4gKHRoaXMuaWRzW2lkXSkgPyB0aGlzLmlkc1tpZF0gOiBudWxsO1xuICAgIH07XG4gICAgTWFpbi5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdHJlZSA9IG51bGw7XG4gICAgICAgIHRoaXMuaWRzID0ge307XG4gICAgICAgIHRoaXMud2lkZ2V0cy5mb3JFYWNoKGZ1bmN0aW9uICh3KSB7IHJldHVybiB3LnJlbW92ZWQoKTsgfSk7XG4gICAgICAgIHRoaXMud2lkZ2V0cyA9IFtdO1xuICAgICAgICB0cmVlID0gdGhpcy50ZW1wbGF0ZS5jYWxsKHRoaXMuY29udGV4dCk7XG4gICAgICAgIHRoaXMuaWRzWydyb290J10gPSAodGhpcy5pZHNbJ3Jvb3QnXSkgPyB0aGlzLmlkc1sncm9vdCddIDogdHJlZTtcbiAgICAgICAgdGhpcy53aWRnZXRzLmZvckVhY2goZnVuY3Rpb24gKHcpIHsgcmV0dXJuIHcucmVuZGVyZWQoKTsgfSk7XG4gICAgICAgIHJldHVybiB0cmVlO1xuICAgIH07XG4gICAgcmV0dXJuIE1haW47XG59KCkpO1xuZXhwb3J0cy5NYWluID0gTWFpbjtcbmV4cG9ydHMuZGVmYXVsdCA9IE1haW47XG4vLyMgc291cmNlTWFwcGluZ1VSTD12aWV3LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoganNoaW50IGlnbm9yZTpzdGFydCAqL1xuLypcbmV4cG9ydCBCcmVhZENydW1iTWVudSBmcm9tICcuL2JyZWFkY3J1bWJzL0JyZWFkQ3J1bWJNZW51JztcbmV4cG9ydCBCcmVhZENydW1iIGZyb20gJy4vYnJlYWRjcnVtYnMvQnJlYWRDcnVtYic7XG5leHBvcnQgQnV0dG9uIGZyb20gJy4vYnV0dG9uL0J1dHRvbic7XG5leHBvcnQgTW9kYWwgZnJvbSAnLi9tb2RhbC9Nb2RhbCc7XG5leHBvcnQgTW9kYWxIZWFkZXIgZnJvbSAnLi9tb2RhbC9Nb2RhbEhlYWRlcic7XG5leHBvcnQgTW9kYWxCb2R5IGZyb20gJy4vbW9kYWwvTW9kYWxCb2R5JztcbmV4cG9ydCBNb2RhbEZvb3RlciBmcm9tICcuL21vZGFsL01vZGFsRm9vdGVyJztcbmV4cG9ydCBDb250YWluZXIgZnJvbSAnLi9jb250YWluZXIvQ29udGFpbmVyJztcbmV4cG9ydCBDb2x1bW4gZnJvbSAnLi9jb2x1bW4vQ29sdW1uJztcbmV4cG9ydCBSb3cgZnJvbSAnLi9yb3cvUm93JztcbmV4cG9ydCBUYWJsZSBmcm9tICcuL3RhYmxlL1RhYmxlJztcbmV4cG9ydCBBdXRvY29tcGxldGUgZnJvbSAnLi9hdXRvY29tcGxldGUvQXV0b2NvbXBsZXRlJztcbmV4cG9ydCBJbnB1dCBmcm9tICcuL2lucHV0L0lucHV0JztcbmV4cG9ydCBTZWxlY3QgZnJvbSAnLi9zZWxlY3QvU2VsZWN0JztcbmV4cG9ydCBTd2l0Y2ggZnJvbSAnLi9zd2l0Y2gvU3dpdGNoJztcbmV4cG9ydCBKdW1ib3Ryb24gZnJvbSAnLi9qdW1ib3Ryb24vSnVtYm90cm9uJztcbmV4cG9ydCBXZWxsIGZyb20gJy4vd2VsbC9XZWxsJztcbmV4cG9ydCBQYW5lbCBmcm9tICcuL3BhbmVsL1BhbmVsJztcbmV4cG9ydCBQYW5lbEhlYWRlciBmcm9tICcuL3BhbmVsL0hlYWRlcic7XG5leHBvcnQgUGFuZWxCb2R5IGZyb20gJy4vcGFuZWwvQm9keSc7XG5leHBvcnQgUGFuZWxGb290ZXIgZnJvbSAnLi9wYW5lbC9Gb290ZXInO1xuZXhwb3J0IENhcmQgZnJvbSAnLi9jYXJkL0NhcmQnO1xuZXhwb3J0IENhcmRJbWFnZSBmcm9tICcuL2NhcmQvQ2FyZEltYWdlJztcbmV4cG9ydCBDYXJkVGl0bGUgZnJvbSAnLi9jYXJkL0NhcmRUaXRsZSc7XG5leHBvcnQgQ2FyZEJsb2NrIGZyb20gJy4vY2FyZC9DYXJkQmxvY2snO1xuZXhwb3J0IFRhYiBmcm9tICcuL3RhYnMvVGFiJztcbmV4cG9ydCBUYWJzIGZyb20gJy4vdGFicy9UYWJzJztcbmV4cG9ydCBMaXN0R3JvdXAgZnJvbSAnLi9saXN0LWdyb3VwL0xpc3RHcm91cCc7XG5leHBvcnQgTGlzdEdyb3VwSXRlbSBmcm9tICcuL2xpc3QtZ3JvdXAvTGlzdEdyb3VwSXRlbSc7XG5leHBvcnQgU2VhcmNoIGZyb20gJy4vc2VhcmNoL1NlYXJjaCc7XG4qL1xudmFyIERyYXdlckxheW91dF8xID0gcmVxdWlyZShcIi4vZHJhd2VyLWxheW91dC9EcmF3ZXJMYXlvdXRcIik7XG5leHBvcnRzLkRyYXdlckxheW91dCA9IERyYXdlckxheW91dF8xLkRyYXdlckxheW91dDtcbi8qIGpzaGludCBpZ25vcmU6ZW5kICovXG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuSElEREVOID0gJy0td3ctaGlkZGVuJztcbmV4cG9ydHMuRFJBV0VSX0xBWU9VVCA9ICd3dy1kcmF3ZXItbGF5b3V0JztcbmV4cG9ydHMuRFJBV0VSID0gJ3d3LWRyYXdlcic7XG5leHBvcnRzLkRSQVdFUl9DT05URU5UID0gJ3d3LWRyYXdlcl9fY29udGVudCc7XG5leHBvcnRzLkRSQVdFUl9QVVNIQUJMRSA9ICctLXd3LWRyYXdlci1wdXNoYWJsZSc7XG5leHBvcnRzLkRSQVdFUl9QVVNIQUJMRV9GSVhFRCA9ICctLXd3LWRyYXdlci1wdXNoYWJsZS1maXhlZCc7XG5leHBvcnRzLk1BSU5fVklFVyA9ICd3dy1tYWluLXZpZXcnO1xuZXhwb3J0cy5MQVlPVVQgPSAnd3ctbGF5b3V0JztcbmV4cG9ydHMuVklTSUJMRSA9ICd3YXQtdmlzaWJsZSc7XG5leHBvcnRzLkFDVElWRSA9ICd3YXQtYWN0aXZlJztcbmV4cG9ydHMuRE9XTl9BUlJPVyA9ICdhcnJvdy1kb3duJztcbmV4cG9ydHMuVVBfQVJST1cgPSAnYXJyb3ctdXAnO1xuZXhwb3J0cy5MQVlPVVRfTUFJTl9DT05URU5UID0gJ3dhdC1sYXlvdXQtbWFpbi1jb250ZW50JztcbmV4cG9ydHMuTEFZT1VUX0FDVElPTl9BUkVBID0gJ3dhdC1sYXlvdXQtYWN0aW9uLWFyZWEnO1xuZXhwb3J0cy5MQVlPVVRfQUNUSU9OX0FSRUFfQ09OVEVOVCA9ICd3YXQtbGF5b3V0LWFjdGlvbi1hcmVhLWNvbnRlbnQnO1xuZXhwb3J0cy5MQVlPVVRfTUVOVV9CVVRUT04gPSAnd2F0LWxheW91dC1tZW51LWJ1dHRvbic7XG5leHBvcnRzLkxBWU9VVF9CQU5ORVIgPSAnd2F0LWxheW91dC1iYW5uZXInO1xuZXhwb3J0cy5MQVlPVVRfQkFOTkVSX0lNQUdFID0gJ3dhdC1sYXlvdXQtYmFubmVyLWltYWdlJztcbmV4cG9ydHMuTEFZT1VUX0RSQVdFUl9OQVZJR0FUSU9OID0gJ3dhdC1sYXlvdXQtZHJhd2VyLW5hdmlnYXRpb24nO1xuZXhwb3J0cy5MQVlPVVRfRFJBV0VSX05BVklHQVRJT05fVElUTEUgPSAnd2F0LWxheW91dC1kcmF3ZXItbmF2aWdhdGlvbi10aXRsZSc7XG5leHBvcnRzLkxBWU9VVF9BQ0NPVU5UX0FSRUEgPSAnd2F0LWxheW91dC1hY2NvdW50LWFyZWEnO1xuZXhwb3J0cy5MQVlPVVRfQUNDT1VOVF9BUkVBX1RJVExFID0gJ3dhdC1sYXlvdXQtYWNjb3VudC1hcmVhLXRpdGxlJztcbmV4cG9ydHMuTEFZT1VUX0FDQ09VTlRfQVJFQV9UT0dHTEUgPSAnd2F0LWxheW91dC1hY2NvdW50LWFyZWEtdG9nZ2xlJztcbmV4cG9ydHMuTEFZT1VUX05PVElGSUNBVElPTiA9ICd3YXQtbGF5b3V0LW5vdGlmaWNhdGlvbic7XG5leHBvcnRzLkxBWU9VVF9PVkVSTEFZID0gJ3dheS1sYXlvdXQtb3ZlcmxheSc7XG5leHBvcnRzLkFVVE9DT01QTEVURSA9ICd3YXQta2l0LWF1dG9jb21wbGV0ZSc7XG5leHBvcnRzLkFVVE9DT01QTEVURV9DT05UQUlORVIgPSAnd2F0LWtpdC1hdXRvY29tcGxldGUtY29udGFpbmVyJztcbmV4cG9ydHMuQVVUT0NPTVBMRVRFX0lOUFVUX0FSRUEgPSAnd2F0LWtpdC1hdXRvY29tcGxldGUtaW5wdXQtYXJlYSc7XG5leHBvcnRzLkFVVE9DT01QTEVURV9JTlBVVCA9ICd3YXQta2l0LWF1dG9jb21wbGV0ZS1pbnB1dCc7XG5leHBvcnRzLkFVVE9DT01QTEVURV9PUFRJT05TID0gJ3dhdC1raXQtYXV0b2NvbXBsZXRlLW9wdGlvbnMnO1xuZXhwb3J0cy5BVVRPQ09NUExFVEVfSVRFTV9XUkFQUEVSID0gJ3dhdC1raXQtYXV0by1jb21wbGV0ZS1pdGVtLXdyYXBwZXInO1xuZXhwb3J0cy5TV0lUQ0ggPSAnd2F0LWNvbXBvbmVudHMtc3dpdGNoJztcbmV4cG9ydHMuU1dJVENIX1NMSURFUiA9ICd3YXQtY29tcG9uZW50cy1zd2l0Y2gtc2xpZGVyJztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVN0eWxlcy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG52YXIgdmlld18xID0gcmVxdWlyZShcIi4vdmlld1wiKTtcbnZhciBBcHBsaWNhdGlvbiA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQXBwbGljYXRpb24oKSB7XG4gICAgICAgIHRoaXMudmlldyA9IG5ldyB2aWV3XzEuTWFpbih0aGlzKTtcbiAgICB9XG4gICAgQXBwbGljYXRpb24ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgd2luZG93LmFwcCA9IHRoaXM7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYWluJykuYXBwZW5kQ2hpbGQodGhpcy52aWV3LnJlbmRlcigpKTtcbiAgICAgICAgdGhpcy5kcmF3ZXIgPSB0aGlzLnZpZXcuZmluZEJ5SWQoJ2RyYXdlcicpO1xuICAgIH07XG4gICAgQXBwbGljYXRpb24ubWFpbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIChuZXcgdGhpcygpKS5ydW4oKTtcbiAgICB9O1xuICAgIHJldHVybiBBcHBsaWNhdGlvbjtcbn0oKSk7XG5kZXNjcmliZSgnQXBwbGljYXRpb24nLCBmdW5jdGlvbiAoKSB7XG4gICAgaXQoJ3Nob3VsZCByZW5kZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIEFwcGxpY2F0aW9uLm1haW4oKTtcbiAgICB9KTtcbn0pO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xudmFyIGNvbXBvbmVudHNfMSA9IHJlcXVpcmUoXCJAcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHNcIik7XG5mdW5jdGlvbiAkJGJvdW5kYXJ5X3RvX2RvdCh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZS5zcGxpdCgnXVsnKS5qb2luKCcuJykuc3BsaXQoJ1snKS5qb2luKCcuJyk7XG59XG5mdW5jdGlvbiAkJHN0cmlwX2JyYWNlcyh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZS5zcGxpdCgnWycpLmpvaW4oJy4nKS5zcGxpdCgnXScpLmpvaW4oJycpO1xufVxuZnVuY3Rpb24gJCRlc2NhcGVfZG90cyh2YWx1ZSkge1xuICAgIHZhbHVlID0gdmFsdWUuc3BsaXQoJ1xcJycpO1xuICAgIHJldHVybiAodmFsdWUubGVuZ3RoIDwgMykgPyB2YWx1ZS5qb2luKCdcXCcnKSA6IHZhbHVlLm1hcChmdW5jdGlvbiAoc2VnKSB7XG4gICAgICAgIGlmIChzZWcubGVuZ3RoIDwgMylcbiAgICAgICAgICAgIHJldHVybiBzZWc7XG4gICAgICAgIGlmICgoc2VnWzBdID09PSAnLicpIHx8IChzZWdbc2VnLmxlbmd0aCAtIDFdID09PSAnLicpKVxuICAgICAgICAgICAgcmV0dXJuIHNlZztcbiAgICAgICAgcmV0dXJuIHNlZy5zcGxpdCgnLicpLmpvaW4oJyYmJyk7XG4gICAgfSkuam9pbignJyk7XG59XG5mdW5jdGlvbiAkJHVuZXNjYXBlX2RvdHModmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUuc3BsaXQoJyYmJykuam9pbignLicpO1xufVxuZnVuY3Rpb24gJCRwYXJ0aWZ5KHZhbHVlKSB7XG4gICAgaWYgKCF2YWx1ZSlcbiAgICAgICAgcmV0dXJuO1xuICAgIHJldHVybiAkJGVzY2FwZV9kb3RzKCQkc3RyaXBfYnJhY2VzKCQkYm91bmRhcnlfdG9fZG90KCcnICsgdmFsdWUpKSkuc3BsaXQoJy4nKTtcbn1cbmZ1bmN0aW9uICQkcHJvcGVydHkocGF0aCwgbykge1xuICAgIHZhciBwYXJ0cyA9ICQkcGFydGlmeShwYXRoKTtcbiAgICB2YXIgZmlyc3Q7XG4gICAgaWYgKHR5cGVvZiBvICE9PSAnb2JqZWN0JylcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZ2V0KCk6IGV4cGVjdHMgYW4gb2JqZWN0IGdvdCAnICsgdHlwZW9mIG8pO1xuICAgIGlmIChwYXJ0cy5sZW5ndGggPT09IDEpXG4gICAgICAgIHJldHVybiBvWyQkdW5lc2NhcGVfZG90cyhwYXJ0c1swXSldO1xuICAgIGlmIChwYXJ0cy5sZW5ndGggPT09IDApXG4gICAgICAgIHJldHVybjtcbiAgICBmaXJzdCA9IG9bcGFydHMuc2hpZnQoKV07XG4gICAgcmV0dXJuICgodHlwZW9mIG8gPT09ICdvYmplY3QnKSAmJiAobyAhPT0gbnVsbCkpID9cbiAgICAgICAgcGFydHMucmVkdWNlKGZ1bmN0aW9uICh0YXJnZXQsIHByb3ApIHtcbiAgICAgICAgICAgIGlmICh0YXJnZXQgPT0gbnVsbClcbiAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgICAgICAgICAgcmV0dXJuIHRhcmdldFskJHVuZXNjYXBlX2RvdHMocHJvcCldO1xuICAgICAgICB9LCBmaXJzdCkgOiBudWxsO1xufVxuZnVuY3Rpb24gJCRhZG9wdChjaGlsZCwgZSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGNoaWxkKSlcbiAgICAgICAgcmV0dXJuIGNoaWxkLmZvckVhY2goZnVuY3Rpb24gKGlubmVyQ2hpbGQpIHsgcmV0dXJuICQkYWRvcHQoaW5uZXJDaGlsZCwgZSk7IH0pO1xuICAgIGlmIChjaGlsZClcbiAgICAgICAgZS5hcHBlbmRDaGlsZCgodHlwZW9mIGNoaWxkID09PSAnb2JqZWN0JykgP1xuICAgICAgICAgICAgY2hpbGQgOiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjaGlsZCB8fCAnJykpO1xufVxuLyoqXG4gKiAkJHJlZ2lzdGVyIGEgV2lkZ2V0IG9yIE5vZGUgYnkgdGhlIHNwZWNpZmllZCB3bWw6aWRcbiAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICogQHBhcmFtIHtXaWRnZXR8Tm9kZX0gdGFyZ2V0XG4gKiBAcGFyYW0ge29iamVjdH0gaWRzXG4gKi9cbmZ1bmN0aW9uICQkcmVnaXN0ZXIoaWQsIHRhcmdldCwgaWRzKSB7XG4gICAgaWYgKGlkcy5oYXNPd25Qcm9wZXJ0eShpZCkpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignRHVwbGljYXRlIGlkIFxcJycgKyBpZCArICdcXCcgZGV0ZWN0ZWQhJyk7XG4gICAgaWRzW2lkXSA9IHRhcmdldDtcbiAgICByZXR1cm4gdGFyZ2V0O1xufVxuLyoqXG4gKiAkJHRleHQgY3JlYXRlcyBhIERPTVRleHROb2RlXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAqL1xuZnVuY3Rpb24gJCR0ZXh0KHZhbHVlKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHZhbHVlIHx8ICcnKTtcbn1cbi8qKlxuICogJCRyZXNvbHZlIHByb3BlcnR5IGFjY2VzcyBleHByZXNzaW9uIHRvIGF2b2lkXG4gKiB0aG93aW5nIGVycm9ycyBpZiBpdCBkb2VzIG5vdCBleGlzdC5cbiAqIEBwYXJhbSB7b2JqZWN0fSBoZWFkXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0aFxuICovXG5mdW5jdGlvbiAkJHJlc29sdmUoaGVhZCwgcGF0aCkge1xuICAgIHZhciByZXQgPSAkJHByb3BlcnR5KHBhdGgsIGhlYWQpO1xuICAgIHJldHVybiAocmV0ID09IG51bGwpID8gJycgOiByZXQ7XG59XG4vKipcbiAqICQkbm9kZSBpcyBjYWxsZWQgdG8gY3JlYXRlIGEgcmVndWxhciBET00gbm9kZVxuICogQHBhcmFtIHtzdHJpbmd9IHRhZ1xuICogQHBhcmFtIHtvYmplY3R9IGF0dHJpYnV0ZXNcbiAqIEBwYXJhbSB7YXJyYXk8c3RyaW5nfG51bWJlcnxXaWRnZXQ+fSBjaGlsZHJlblxuICogQHBhcmFtIHtWaWV3fSB2aWV3XG4gKi9cbmZ1bmN0aW9uICQkbm9kZSh0YWcsIGF0dHJpYnV0ZXMsIGNoaWxkcmVuLCB2aWV3KSB7XG4gICAgdmFyIGUgPSAodGFnID09PSAnZnJhZ21lbnQnKSA/IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSA6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgICBpZiAodHlwZW9mIGF0dHJpYnV0ZXMuaHRtbCA9PT0gJ29iamVjdCcpXG4gICAgICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMuaHRtbCkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGF0dHJpYnV0ZXMuaHRtbFtrZXldID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgZVtrZXldID0gYXR0cmlidXRlcy5odG1sW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBlLnNldEF0dHJpYnV0ZShrZXksIGF0dHJpYnV0ZXMuaHRtbFtrZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoYykgeyByZXR1cm4gJCRhZG9wdChjLCBlKTsgfSk7XG4gICAgaWYgKGF0dHJpYnV0ZXMud21sKVxuICAgICAgICBpZiAoYXR0cmlidXRlcy53bWwuaWQpXG4gICAgICAgICAgICAkJHJlZ2lzdGVyKGF0dHJpYnV0ZXMud21sLmlkLCBlLCB2aWV3Lmlkcyk7XG4gICAgcmV0dXJuIGU7XG59XG4vKipcbiAqIEF0dHJpYnV0ZXMgcHJvdmlkZXMgYW4gQVBJIGZvciByZWFkaW5nIHRoZVxuICogYXR0cmlidXRlcyBzdXBwbGllZCB0byBhbiBFbGVtZW50LlxuICogQHBhcmFtIHtvYmplY3R9IGF0dHJzXG4gKi9cbnZhciBBdHRyaWJ1dGVzID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBBdHRyaWJ1dGVzKF9hdHRycykge1xuICAgICAgICB0aGlzLl9hdHRycyA9IF9hdHRycztcbiAgICAgICAgdGhpcy5fYXR0cnMgPSBfYXR0cnM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIHJlYWQgYSB2YWx1ZSBmb3JtIHRoZSBpbnRlcm5hbCBsaXN0LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoXG4gICAgICogQHBhcmFtIHsqfSBkZWZhdWx0VmFsdWUgLSBUaGlzIHZhbHVlIGlzIHJldHVybmVkIGlmIHRoZSB2YWx1ZSBpcyBub3Qgc2V0LlxuICAgICAqL1xuICAgIEF0dHJpYnV0ZXMucHJvdG90eXBlLnJlYWQgPSBmdW5jdGlvbiAocGF0aCwgZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgIHZhciByZXQgPSAkJHByb3BlcnR5KHBhdGguc3BsaXQoJzonKS5qb2luKCcuJyksIHRoaXMuX2F0dHJzKTtcbiAgICAgICAgcmV0dXJuIChyZXQgIT0gbnVsbCkgPyByZXQgOiAoZGVmYXVsdFZhbHVlICE9IG51bGwpID8gZGVmYXVsdFZhbHVlIDogJyc7XG4gICAgfTtcbiAgICByZXR1cm4gQXR0cmlidXRlcztcbn0oKSk7XG4vKipcbiAqICQkd2lkZ2V0IGNyZWF0ZXMgYSB3bWwgd2lkZ2V0LlxuICogQHBhcmFtIHtmdW5jdGlvbn0gQ29uc3RydXRvclxuICogQHBhcmFtIHtvYmplY3R9IGF0dHJpYnV0ZXNcbiAqIEBwYXJhbSB7YXJyYXk8c3RyaW5nfG51bWJlcnxXaWRnZXQ+fSBjaGlsZHJlblxuICogQHBhcmFtIHtWaWV3fSB2aWV3XG4gKiBAcmV0dXJuIHtXaWRnZXR9XG4gKi9cbmZ1bmN0aW9uICQkd2lkZ2V0KENvbnN0cnVjdG9yLCBhdHRyaWJ1dGVzLCBjaGlsZHJlbiwgdmlldykge1xuICAgIHZhciBjaGlsZHMgPSBbXTtcbiAgICB2YXIgdztcbiAgICBjaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChjaGlsZCkgeyByZXR1cm4gQXJyYXkuaXNBcnJheShjaGlsZCkgP1xuICAgICAgICBjaGlsZHMucHVzaC5hcHBseShjaGlsZHMsIGNoaWxkKSA6IGNoaWxkcy5wdXNoKGNoaWxkKTsgfSk7XG4gICAgdyA9IG5ldyBDb25zdHJ1Y3RvcihuZXcgQXR0cmlidXRlcyhhdHRyaWJ1dGVzKSwgY2hpbGRzKTtcbiAgICBpZiAoYXR0cmlidXRlcy53bWwpXG4gICAgICAgIGlmIChhdHRyaWJ1dGVzLndtbC5pZClcbiAgICAgICAgICAgICQkcmVnaXN0ZXIoYXR0cmlidXRlcy53bWwuaWQsIHcsIHZpZXcuaWRzKTtcbiAgICB2aWV3LndpZGdldHMucHVzaCh3KTtcbiAgICByZXR1cm4gdy5yZW5kZXIoKTtcbn1cbi8qKlxuICogJCRpZiBpcyBjYWxsZWQgdG8gY3JlYXRlIGFuIGlmIGNvbmRpdGlvbmFsIGNvbnN0cnVjdFxuICogQHBhcmFtIHsqfSBwcmVkaWNhdGVcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHBvc2l0aXZlXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBuZWdhdGl2ZVxuICovXG5mdW5jdGlvbiAkJGlmKHByZWRpY2F0ZSwgcG9zaXRpdmUsIG5lZ2F0aXZlKSB7XG4gICAgcmV0dXJuIChwcmVkaWNhdGUpID8gcG9zaXRpdmUoKSA6IG5lZ2F0aXZlKCk7XG59XG4vKipcbiAqICQkZm9yIGlzIGNhbGxlZCB0byBjcmVhdGUgYSBmb3IgbG9vcCBjb25zdHJ1Y3RcbiAqIEBwYXJhbSB7SXRlcmFibGV9IGNvbGxlY3Rpb25cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNiXG4gKi9cbmZ1bmN0aW9uICQkZm9yKGNvbGxlY3Rpb24sIGNiKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoY29sbGVjdGlvbikpIHtcbiAgICAgICAgcmV0dXJuIGNvbGxlY3Rpb24ubWFwKGNiKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGNvbGxlY3Rpb24gPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhjb2xsZWN0aW9uKS5tYXAoZnVuY3Rpb24gKGtleSwgXywgYWxsKSB7IHJldHVybiBjYihjb2xsZWN0aW9uW2tleV0sIGtleSwgYWxsKTsgfSk7XG4gICAgfVxuICAgIHJldHVybiBbXTtcbn1cbi8qKlxuICogJCRzd2l0Y2ggc2ltdWxhdGVzIGEgc3dpdGNoIHN0YXRlbWVudFxuICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfGJvb2xlYW59IHZhbHVlXG4gKiBAcGFyYW0ge29iamVjdH0gY2FzZXNcbiAqL1xuZnVuY3Rpb24gJCRzd2l0Y2godmFsdWUsIGNhc2VzKSB7XG4gICAgdmFyIHJlc3VsdCA9IGNhc2VzW3ZhbHVlXTtcbiAgICB2YXIgZGVmYXVsID0gY2FzZXNbXCJkZWZhdWx0XCJdO1xuICAgIGlmIChyZXN1bHQpXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgaWYgKGRlZmF1bClcbiAgICAgICAgcmV0dXJuIGRlZmF1bDtcbn1cbnZhciBNYWluID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBNYWluKGNvbnRleHQpIHtcbiAgICAgICAgdmFyIHZpZXcgPSB0aGlzO1xuICAgICAgICB0aGlzLmlkcyA9IHt9O1xuICAgICAgICB0aGlzLndpZGdldHMgPSBbXTtcbiAgICAgICAgdGhpcy50cmVlID0gbnVsbDtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAkJHdpZGdldChjb21wb25lbnRzXzEuRHJhd2VyTGF5b3V0LCB7XG4gICAgICAgICAgICAgICAgaHRtbDoge31cbiAgICAgICAgICAgIH0sIFskJG5vZGUoJ3AnLCB7XG4gICAgICAgICAgICAgICAgICAgIGh0bWw6IHt9XG4gICAgICAgICAgICAgICAgfSwgWyQkdGV4dChcIlRoaXMgaXMgaW4gdGhlIGRyYXdlclwiKV0sIHZpZXcpLCAkJG5vZGUoJ3AnLCB7XG4gICAgICAgICAgICAgICAgICAgIGh0bWw6IHt9XG4gICAgICAgICAgICAgICAgfSwgWyQkdGV4dChcIiBUaGlzIGlzIGluIG1haW5cIildLCB2aWV3KV0sIHZpZXcpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBNYWluLnJlbmRlciA9IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgICAgIHJldHVybiAobmV3IE1haW4oY29udGV4dCkpLnJlbmRlcigpO1xuICAgIH07XG4gICAgTWFpbi5wcm90b3R5cGUuZmluZEJ5SWQgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmlkc1tpZF0pID8gdGhpcy5pZHNbaWRdIDogbnVsbDtcbiAgICB9O1xuICAgIE1haW4ucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHRyZWUgPSBudWxsO1xuICAgICAgICB0aGlzLmlkcyA9IHt9O1xuICAgICAgICB0aGlzLndpZGdldHMuZm9yRWFjaChmdW5jdGlvbiAodykgeyByZXR1cm4gdy5yZW1vdmVkKCk7IH0pO1xuICAgICAgICB0aGlzLndpZGdldHMgPSBbXTtcbiAgICAgICAgdHJlZSA9IHRoaXMudGVtcGxhdGUuY2FsbCh0aGlzLmNvbnRleHQpO1xuICAgICAgICB0aGlzLmlkc1sncm9vdCddID0gKHRoaXMuaWRzWydyb290J10pID8gdGhpcy5pZHNbJ3Jvb3QnXSA6IHRyZWU7XG4gICAgICAgIHRoaXMud2lkZ2V0cy5mb3JFYWNoKGZ1bmN0aW9uICh3KSB7IHJldHVybiB3LnJlbmRlcmVkKCk7IH0pO1xuICAgICAgICByZXR1cm4gdHJlZTtcbiAgICB9O1xuICAgIHJldHVybiBNYWluO1xufSgpKTtcbmV4cG9ydHMuTWFpbiA9IE1haW47XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IE1haW47XG4iXX0=
