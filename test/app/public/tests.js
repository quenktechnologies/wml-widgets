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
        this.template = function () { return $$node('div', { html: { 'class': $$resolve(Styles, 'DRAWER_LAYOUT') } }, [$$node('div', { html: { 'class': $$resolve(Styles, 'DRAWER') }, wml: { 'id': "drawer" } }, [$$node('div', { html: { 'class': $$resolve(Styles, 'DRAWER_CONTENT') } }, [this.drawerContent()], view)], view), $$node('div', { html: { 'class': $$resolve(Styles, 'MAIN_VIEW') } }, [this.mainViewContent()], view)], view); };
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
exports.DRAWER_BUTTON = 'ww-drawer__button';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi93bWwtY29yZS9zcmMvcnVudGltZS9BYnN0cmFjdFdpZGdldC5qcyIsIi4uL3dtbC1jb3JlL3NyYy9ydW50aW1lL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL0BxdWVuay93bWwtd2lkZ2V0cy9saWIvY29tcG9uZW50cy9kcmF3ZXItbGF5b3V0L0RyYXdlckxheW91dC5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvZHJhd2VyLWxheW91dC93bWwvdmlldy5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvY29tbW9uL1N0eWxlcy5qcyIsInRlc3QvYXBwL2FwcC5qcyIsInRlc3QvYXBwL3ZpZXcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7O0FDQUE7OztJQUdNLGM7QUFFSiwwQkFBWSxLQUFaLEVBQW1CLFFBQW5CLEVBQTZCO0FBQUE7O0FBRTNCLFNBQUssVUFBTCxHQUFrQixLQUFsQjtBQUNBLFNBQUssUUFBTCxHQUFnQixRQUFoQjtBQUNBLFNBQUssSUFBTCxHQUFZLElBQVo7QUFFRDs7OzsrQkFFVSxDQUVWOzs7OEJBRVMsQ0FFVDs7OzZCQUVROztBQUVQLGFBQU8sS0FBSyxJQUFMLENBQVUsTUFBVixFQUFQO0FBRUQ7Ozs7OztrQkFJWSxjOzs7Ozs7Ozs7Ozs7Ozs7O1FDNUJSLGM7QUFDUDtBQUZBOzs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcbiAqIEFic3RyYWN0V2lkZ2V0XG4gKi9cbmNsYXNzIEFic3RyYWN0V2lkZ2V0IHtcblxuICBjb25zdHJ1Y3RvcihhdHRycywgY2hpbGRyZW4pIHtcblxuICAgIHRoaXMuYXR0cmlidXRlcyA9IGF0dHJzO1xuICAgIHRoaXMuY2hpbGRyZW4gPSBjaGlsZHJlbjtcbiAgICB0aGlzLnZpZXcgPSBudWxsO1xuXG4gIH1cblxuICByZW5kZXJlZCgpIHtcblxuICB9XG5cbiAgcmVtb3ZlZCgpIHtcblxuICB9XG5cbiAgcmVuZGVyKCkge1xuXG4gICAgcmV0dXJuIHRoaXMudmlldy5yZW5kZXIoKTtcblxuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQWJzdHJhY3RXaWRnZXRcblxuIiwiLypqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG5leHBvcnQgQWJzdHJhY3RXaWRnZXQgZnJvbSAnLi9BYnN0cmFjdFdpZGdldCc7XG4vKmpzaGludCBpZ25vcmU6ZW5kICovXG5cbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgcnVudGltZV8xID0gcmVxdWlyZShcIkBxdWVuay93bWwvbGliL3J1bnRpbWVcIik7XG52YXIgU3R5bGVzID0gcmVxdWlyZShcImNvbW1vbi9TdHlsZXNcIik7XG52YXIgdmlld18xID0gcmVxdWlyZShcIi4vd21sL3ZpZXdcIik7XG4vKipcbiAqIERyYXdlckxheW91dCBwcm92aWRlcyBhIHRvcCBsZXZlbCBsYXlvdXQgY29uc2lzdGluZyBvZiBhIGRyYXdlciBhbmRcbiAqIGEgbWFpbiBjb250ZW50IHZpZXcuXG4gKi9cbnZhciBEcmF3ZXJMYXlvdXQgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhEcmF3ZXJMYXlvdXQsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gRHJhd2VyTGF5b3V0KCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMudmlldyA9IG5ldyB2aWV3XzEuTWFpbihfdGhpcyk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgRHJhd2VyTGF5b3V0LnByb3RvdHlwZS5fZ2V0RHJhd2VyRE9NID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52aWV3LmZpbmRCeUlkKCdkcmF3ZXInKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIGRyYXdlckNvbnRlbnQgcHJvdmlkZXMgdGhlIGNvbnRlbnQgZm9yIHRoaXMgbGF5b3V0J3MgRHJhd2VyLlxuICAgICAqL1xuICAgIERyYXdlckxheW91dC5wcm90b3R5cGUuZHJhd2VyQ29udGVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hpbGRyZW5bMF07XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBtYWluVmlld0NvbnRlbnQgcHJvdmlkZXMgdGhlIGNvbnRlbnQgZm9yIHRoaXMgbGF5b3V0J3MgTWFpblZpZXcuXG4gICAgICovXG4gICAgRHJhd2VyTGF5b3V0LnByb3RvdHlwZS5tYWluVmlld0NvbnRlbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNoaWxkcmVuWzFdO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogZHJhd2VyVmlzaWJsZSBxdWVyaWVzIHdoZXRoZXIgdGhlIERyYXdlciBpcyB2aXNpYmxlIG9yIG5vdC5cbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBEcmF3ZXJMYXlvdXQucHJvdG90eXBlLmRyYXdlclZpc2libGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAhdGhpcy5fZ2V0RHJhd2VyRE9NKCkuY2xhc3NMaXN0LmNvbnRhaW5zKFN0eWxlcy5ISURERU4pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogaGlkZURyYXdlciBoaWRlcyB0aGUgZHJhd2VyLlxuICAgICAqL1xuICAgIERyYXdlckxheW91dC5wcm90b3R5cGUuaGlkZURyYXdlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuZHJhd2VyVmlzaWJsZSgpKVxuICAgICAgICAgICAgdGhpcy5fZ2V0RHJhd2VyRE9NKCkuY2xhc3NMaXN0LmFkZChTdHlsZXMuSElEREVOKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIHNob3dEcmF3ZXIgc2hvd3MgdGhlIGRyYXdlclxuICAgICAqL1xuICAgIERyYXdlckxheW91dC5wcm90b3R5cGUuc2hvd0RyYXdlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRyYXdlclZpc2libGUoKSlcbiAgICAgICAgICAgIHRoaXMuX2dldERyYXdlckRPTSgpLmNsYXNzTGlzdC5yZW1vdmUoU3R5bGVzLkhJRERFTik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiB0b2dnbGUgdGhlIHZpc2liaWxpdHkgb2YgdGhpcyBEcmF3ZXJcbiAgICAgKi9cbiAgICBEcmF3ZXJMYXlvdXQucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fZ2V0RHJhd2VyRE9NKCkuY2xhc3NMaXN0LnRvZ2dsZShTdHlsZXMuSElEREVOKTtcbiAgICB9O1xuICAgIERyYXdlckxheW91dC5wcm90b3R5cGUucmVuZGVyZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh3aW5kb3cubWF0Y2hNZWRpYSgnKG1heC13aWR0aDogNDgwcHgnKS5tYXRjaGVzKVxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcyk7XG4gICAgfTtcbiAgICBEcmF3ZXJMYXlvdXQucHJvdG90eXBlLmhhbmRsZUV2ZW50ID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKGUgaW5zdGFuY2VvZiBNb3VzZUV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgZHJhd2VyID0gdGhpcy52aWV3LmZpbmRCeUlkKCdkcmF3ZXInKTtcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICAgICAgICAgIGlmICgodGFyZ2V0ICE9PSBkcmF3ZXIpICYmICghZHJhd2VyLmNvbnRhaW5zKHRhcmdldCkpKVxuICAgICAgICAgICAgICAgIGlmICghd2luZG93LmRvY3VtZW50LmNvbnRhaW5zKGRyYXdlcikpXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMpO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlRHJhd2VyKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIERyYXdlckxheW91dC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5jaGlsZHJlbi5sZW5ndGggIT09IDIpXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJEcmF3ZXJMYXlvdXQ6IEV4cGVjdGVkIDIgY2hpbGQgd2lkZ2V0cyBnb3QgXCIgKyB0aGlzLmNoaWxkcmVuLmxlbmd0aCArIFwiIVwiKTtcbiAgICAgICAgcmV0dXJuIHRoaXMudmlldy5yZW5kZXIoKTtcbiAgICB9O1xuICAgIHJldHVybiBEcmF3ZXJMYXlvdXQ7XG59KHJ1bnRpbWVfMS5BYnN0cmFjdFdpZGdldCkpO1xuZXhwb3J0cy5EcmF3ZXJMYXlvdXQgPSBEcmF3ZXJMYXlvdXQ7XG5leHBvcnRzLmRlZmF1bHQgPSBEcmF3ZXJMYXlvdXQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1EcmF3ZXJMYXlvdXQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgU3R5bGVzID0gcmVxdWlyZShcImNvbW1vbi9TdHlsZXNcIik7XG5mdW5jdGlvbiAkJGJvdW5kYXJ5X3RvX2RvdCh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZS5zcGxpdCgnXVsnKS5qb2luKCcuJykuc3BsaXQoJ1snKS5qb2luKCcuJyk7XG59XG5mdW5jdGlvbiAkJHN0cmlwX2JyYWNlcyh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZS5zcGxpdCgnWycpLmpvaW4oJy4nKS5zcGxpdCgnXScpLmpvaW4oJycpO1xufVxuZnVuY3Rpb24gJCRlc2NhcGVfZG90cyh2YWx1ZSkge1xuICAgIHZhbHVlID0gdmFsdWUuc3BsaXQoJ1xcJycpO1xuICAgIHJldHVybiAodmFsdWUubGVuZ3RoIDwgMykgPyB2YWx1ZS5qb2luKCdcXCcnKSA6IHZhbHVlLm1hcChmdW5jdGlvbiAoc2VnKSB7XG4gICAgICAgIGlmIChzZWcubGVuZ3RoIDwgMylcbiAgICAgICAgICAgIHJldHVybiBzZWc7XG4gICAgICAgIGlmICgoc2VnWzBdID09PSAnLicpIHx8IChzZWdbc2VnLmxlbmd0aCAtIDFdID09PSAnLicpKVxuICAgICAgICAgICAgcmV0dXJuIHNlZztcbiAgICAgICAgcmV0dXJuIHNlZy5zcGxpdCgnLicpLmpvaW4oJyYmJyk7XG4gICAgfSkuam9pbignJyk7XG59XG5mdW5jdGlvbiAkJHVuZXNjYXBlX2RvdHModmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUuc3BsaXQoJyYmJykuam9pbignLicpO1xufVxuZnVuY3Rpb24gJCRwYXJ0aWZ5KHZhbHVlKSB7XG4gICAgaWYgKCF2YWx1ZSlcbiAgICAgICAgcmV0dXJuO1xuICAgIHJldHVybiAkJGVzY2FwZV9kb3RzKCQkc3RyaXBfYnJhY2VzKCQkYm91bmRhcnlfdG9fZG90KCcnICsgdmFsdWUpKSkuc3BsaXQoJy4nKTtcbn1cbmZ1bmN0aW9uICQkcHJvcGVydHkocGF0aCwgbykge1xuICAgIHZhciBwYXJ0cyA9ICQkcGFydGlmeShwYXRoKTtcbiAgICB2YXIgZmlyc3Q7XG4gICAgaWYgKHR5cGVvZiBvICE9PSAnb2JqZWN0JylcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZ2V0KCk6IGV4cGVjdHMgYW4gb2JqZWN0IGdvdCAnICsgdHlwZW9mIG8pO1xuICAgIGlmIChwYXJ0cy5sZW5ndGggPT09IDEpXG4gICAgICAgIHJldHVybiBvWyQkdW5lc2NhcGVfZG90cyhwYXJ0c1swXSldO1xuICAgIGlmIChwYXJ0cy5sZW5ndGggPT09IDApXG4gICAgICAgIHJldHVybjtcbiAgICBmaXJzdCA9IG9bcGFydHMuc2hpZnQoKV07XG4gICAgcmV0dXJuICgodHlwZW9mIG8gPT09ICdvYmplY3QnKSAmJiAobyAhPT0gbnVsbCkpID9cbiAgICAgICAgcGFydHMucmVkdWNlKGZ1bmN0aW9uICh0YXJnZXQsIHByb3ApIHtcbiAgICAgICAgICAgIGlmICh0YXJnZXQgPT0gbnVsbClcbiAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgICAgICAgICAgcmV0dXJuIHRhcmdldFskJHVuZXNjYXBlX2RvdHMocHJvcCldO1xuICAgICAgICB9LCBmaXJzdCkgOiBudWxsO1xufVxuZnVuY3Rpb24gJCRhZG9wdChjaGlsZCwgZSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGNoaWxkKSlcbiAgICAgICAgcmV0dXJuIGNoaWxkLmZvckVhY2goZnVuY3Rpb24gKGlubmVyQ2hpbGQpIHsgcmV0dXJuICQkYWRvcHQoaW5uZXJDaGlsZCwgZSk7IH0pO1xuICAgIGlmIChjaGlsZClcbiAgICAgICAgZS5hcHBlbmRDaGlsZCgodHlwZW9mIGNoaWxkID09PSAnb2JqZWN0JykgP1xuICAgICAgICAgICAgY2hpbGQgOiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjaGlsZCB8fCAnJykpO1xufVxuLyoqXG4gKiAkJHJlZ2lzdGVyIGEgV2lkZ2V0IG9yIE5vZGUgYnkgdGhlIHNwZWNpZmllZCB3bWw6aWRcbiAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICogQHBhcmFtIHtXaWRnZXR8Tm9kZX0gdGFyZ2V0XG4gKiBAcGFyYW0ge29iamVjdH0gaWRzXG4gKi9cbmZ1bmN0aW9uICQkcmVnaXN0ZXIoaWQsIHRhcmdldCwgaWRzKSB7XG4gICAgaWYgKGlkcy5oYXNPd25Qcm9wZXJ0eShpZCkpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignRHVwbGljYXRlIGlkIFxcJycgKyBpZCArICdcXCcgZGV0ZWN0ZWQhJyk7XG4gICAgaWRzW2lkXSA9IHRhcmdldDtcbiAgICByZXR1cm4gdGFyZ2V0O1xufVxuLyoqXG4gKiAkJHRleHQgY3JlYXRlcyBhIERPTVRleHROb2RlXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAqL1xuZnVuY3Rpb24gJCR0ZXh0KHZhbHVlKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHZhbHVlIHx8ICcnKTtcbn1cbi8qKlxuICogJCRyZXNvbHZlIHByb3BlcnR5IGFjY2VzcyBleHByZXNzaW9uIHRvIGF2b2lkXG4gKiB0aG93aW5nIGVycm9ycyBpZiBpdCBkb2VzIG5vdCBleGlzdC5cbiAqIEBwYXJhbSB7b2JqZWN0fSBoZWFkXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0aFxuICovXG5mdW5jdGlvbiAkJHJlc29sdmUoaGVhZCwgcGF0aCkge1xuICAgIHZhciByZXQgPSAkJHByb3BlcnR5KHBhdGgsIGhlYWQpO1xuICAgIHJldHVybiAocmV0ID09IG51bGwpID8gJycgOiByZXQ7XG59XG4vKipcbiAqICQkbm9kZSBpcyBjYWxsZWQgdG8gY3JlYXRlIGEgcmVndWxhciBET00gbm9kZVxuICogQHBhcmFtIHtzdHJpbmd9IHRhZ1xuICogQHBhcmFtIHtvYmplY3R9IGF0dHJpYnV0ZXNcbiAqIEBwYXJhbSB7YXJyYXk8c3RyaW5nfG51bWJlcnxXaWRnZXQ+fSBjaGlsZHJlblxuICogQHBhcmFtIHtWaWV3fSB2aWV3XG4gKi9cbmZ1bmN0aW9uICQkbm9kZSh0YWcsIGF0dHJpYnV0ZXMsIGNoaWxkcmVuLCB2aWV3KSB7XG4gICAgdmFyIGUgPSAodGFnID09PSAnZnJhZ21lbnQnKSA/IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSA6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgICBpZiAodHlwZW9mIGF0dHJpYnV0ZXMuaHRtbCA9PT0gJ29iamVjdCcpXG4gICAgICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMuaHRtbCkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGF0dHJpYnV0ZXMuaHRtbFtrZXldID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgZVtrZXldID0gYXR0cmlidXRlcy5odG1sW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBlLnNldEF0dHJpYnV0ZShrZXksIGF0dHJpYnV0ZXMuaHRtbFtrZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoYykgeyByZXR1cm4gJCRhZG9wdChjLCBlKTsgfSk7XG4gICAgaWYgKGF0dHJpYnV0ZXMud21sKVxuICAgICAgICBpZiAoYXR0cmlidXRlcy53bWwuaWQpXG4gICAgICAgICAgICAkJHJlZ2lzdGVyKGF0dHJpYnV0ZXMud21sLmlkLCBlLCB2aWV3Lmlkcyk7XG4gICAgcmV0dXJuIGU7XG59XG4vKipcbiAqIEF0dHJpYnV0ZXMgcHJvdmlkZXMgYW4gQVBJIGZvciByZWFkaW5nIHRoZVxuICogYXR0cmlidXRlcyBzdXBwbGllZCB0byBhbiBFbGVtZW50LlxuICogQHBhcmFtIHtvYmplY3R9IGF0dHJzXG4gKi9cbnZhciBBdHRyaWJ1dGVzID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBBdHRyaWJ1dGVzKF9hdHRycykge1xuICAgICAgICB0aGlzLl9hdHRycyA9IF9hdHRycztcbiAgICAgICAgdGhpcy5fYXR0cnMgPSBfYXR0cnM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIHJlYWQgYSB2YWx1ZSBmb3JtIHRoZSBpbnRlcm5hbCBsaXN0LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoXG4gICAgICogQHBhcmFtIHsqfSBkZWZhdWx0VmFsdWUgLSBUaGlzIHZhbHVlIGlzIHJldHVybmVkIGlmIHRoZSB2YWx1ZSBpcyBub3Qgc2V0LlxuICAgICAqL1xuICAgIEF0dHJpYnV0ZXMucHJvdG90eXBlLnJlYWQgPSBmdW5jdGlvbiAocGF0aCwgZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgIHZhciByZXQgPSAkJHByb3BlcnR5KHBhdGguc3BsaXQoJzonKS5qb2luKCcuJyksIHRoaXMuX2F0dHJzKTtcbiAgICAgICAgcmV0dXJuIChyZXQgIT0gbnVsbCkgPyByZXQgOiAoZGVmYXVsdFZhbHVlICE9IG51bGwpID8gZGVmYXVsdFZhbHVlIDogJyc7XG4gICAgfTtcbiAgICByZXR1cm4gQXR0cmlidXRlcztcbn0oKSk7XG4vKipcbiAqICQkd2lkZ2V0IGNyZWF0ZXMgYSB3bWwgd2lkZ2V0LlxuICogQHBhcmFtIHtmdW5jdGlvbn0gQ29uc3RydXRvclxuICogQHBhcmFtIHtvYmplY3R9IGF0dHJpYnV0ZXNcbiAqIEBwYXJhbSB7YXJyYXk8c3RyaW5nfG51bWJlcnxXaWRnZXQ+fSBjaGlsZHJlblxuICogQHBhcmFtIHtWaWV3fSB2aWV3XG4gKiBAcmV0dXJuIHtXaWRnZXR9XG4gKi9cbmZ1bmN0aW9uICQkd2lkZ2V0KENvbnN0cnVjdG9yLCBhdHRyaWJ1dGVzLCBjaGlsZHJlbiwgdmlldykge1xuICAgIHZhciBjaGlsZHMgPSBbXTtcbiAgICB2YXIgdztcbiAgICBjaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChjaGlsZCkgeyByZXR1cm4gQXJyYXkuaXNBcnJheShjaGlsZCkgP1xuICAgICAgICBjaGlsZHMucHVzaC5hcHBseShjaGlsZHMsIGNoaWxkKSA6IGNoaWxkcy5wdXNoKGNoaWxkKTsgfSk7XG4gICAgdyA9IG5ldyBDb25zdHJ1Y3RvcihuZXcgQXR0cmlidXRlcyhhdHRyaWJ1dGVzKSwgY2hpbGRzKTtcbiAgICBpZiAoYXR0cmlidXRlcy53bWwpXG4gICAgICAgIGlmIChhdHRyaWJ1dGVzLndtbC5pZClcbiAgICAgICAgICAgICQkcmVnaXN0ZXIoYXR0cmlidXRlcy53bWwuaWQsIHcsIHZpZXcuaWRzKTtcbiAgICB2aWV3LndpZGdldHMucHVzaCh3KTtcbiAgICByZXR1cm4gdy5yZW5kZXIoKTtcbn1cbi8qKlxuICogJCRpZiBpcyBjYWxsZWQgdG8gY3JlYXRlIGFuIGlmIGNvbmRpdGlvbmFsIGNvbnN0cnVjdFxuICogQHBhcmFtIHsqfSBwcmVkaWNhdGVcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHBvc2l0aXZlXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBuZWdhdGl2ZVxuICovXG5mdW5jdGlvbiAkJGlmKHByZWRpY2F0ZSwgcG9zaXRpdmUsIG5lZ2F0aXZlKSB7XG4gICAgcmV0dXJuIChwcmVkaWNhdGUpID8gcG9zaXRpdmUoKSA6IG5lZ2F0aXZlKCk7XG59XG4vKipcbiAqICQkZm9yIGlzIGNhbGxlZCB0byBjcmVhdGUgYSBmb3IgbG9vcCBjb25zdHJ1Y3RcbiAqIEBwYXJhbSB7SXRlcmFibGV9IGNvbGxlY3Rpb25cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNiXG4gKi9cbmZ1bmN0aW9uICQkZm9yKGNvbGxlY3Rpb24sIGNiKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoY29sbGVjdGlvbikpIHtcbiAgICAgICAgcmV0dXJuIGNvbGxlY3Rpb24ubWFwKGNiKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGNvbGxlY3Rpb24gPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhjb2xsZWN0aW9uKS5tYXAoZnVuY3Rpb24gKGtleSwgXywgYWxsKSB7IHJldHVybiBjYihjb2xsZWN0aW9uW2tleV0sIGtleSwgYWxsKTsgfSk7XG4gICAgfVxuICAgIHJldHVybiBbXTtcbn1cbi8qKlxuICogJCRzd2l0Y2ggc2ltdWxhdGVzIGEgc3dpdGNoIHN0YXRlbWVudFxuICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfGJvb2xlYW59IHZhbHVlXG4gKiBAcGFyYW0ge29iamVjdH0gY2FzZXNcbiAqL1xuZnVuY3Rpb24gJCRzd2l0Y2godmFsdWUsIGNhc2VzKSB7XG4gICAgdmFyIHJlc3VsdCA9IGNhc2VzW3ZhbHVlXTtcbiAgICB2YXIgZGVmYXVsID0gY2FzZXMuZGVmYXVsdDtcbiAgICBpZiAocmVzdWx0KVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIGlmIChkZWZhdWwpXG4gICAgICAgIHJldHVybiBkZWZhdWw7XG59XG52YXIgTWFpbiA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTWFpbihjb250ZXh0KSB7XG4gICAgICAgIHZhciB2aWV3ID0gdGhpcztcbiAgICAgICAgdGhpcy5pZHMgPSB7fTtcbiAgICAgICAgdGhpcy53aWRnZXRzID0gW107XG4gICAgICAgIHRoaXMudHJlZSA9IG51bGw7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAkJG5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiAkJHJlc29sdmUoU3R5bGVzLCAnRFJBV0VSX0xBWU9VVCcpIH0gfSwgWyQkbm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6ICQkcmVzb2x2ZShTdHlsZXMsICdEUkFXRVInKSB9LCB3bWw6IHsgJ2lkJzogXCJkcmF3ZXJcIiB9IH0sIFskJG5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiAkJHJlc29sdmUoU3R5bGVzLCAnRFJBV0VSX0NPTlRFTlQnKSB9IH0sIFt0aGlzLmRyYXdlckNvbnRlbnQoKV0sIHZpZXcpXSwgdmlldyksICQkbm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6ICQkcmVzb2x2ZShTdHlsZXMsICdNQUlOX1ZJRVcnKSB9IH0sIFt0aGlzLm1haW5WaWV3Q29udGVudCgpXSwgdmlldyldLCB2aWV3KTsgfTtcbiAgICB9XG4gICAgTWFpbi5yZW5kZXIgPSBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgICAgICByZXR1cm4gKG5ldyBNYWluKGNvbnRleHQpKS5yZW5kZXIoKTtcbiAgICB9O1xuICAgIE1haW4ucHJvdG90eXBlLmZpbmRCeUlkID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5pZHNbaWRdKSA/IHRoaXMuaWRzW2lkXSA6IG51bGw7XG4gICAgfTtcbiAgICBNYWluLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB0cmVlID0gbnVsbDtcbiAgICAgICAgdGhpcy5pZHMgPSB7fTtcbiAgICAgICAgdGhpcy53aWRnZXRzLmZvckVhY2goZnVuY3Rpb24gKHcpIHsgcmV0dXJuIHcucmVtb3ZlZCgpOyB9KTtcbiAgICAgICAgdGhpcy53aWRnZXRzID0gW107XG4gICAgICAgIHRyZWUgPSB0aGlzLnRlbXBsYXRlLmNhbGwodGhpcy5jb250ZXh0KTtcbiAgICAgICAgdGhpcy5pZHNbJ3Jvb3QnXSA9ICh0aGlzLmlkc1sncm9vdCddKSA/IHRoaXMuaWRzWydyb290J10gOiB0cmVlO1xuICAgICAgICB0aGlzLndpZGdldHMuZm9yRWFjaChmdW5jdGlvbiAodykgeyByZXR1cm4gdy5yZW5kZXJlZCgpOyB9KTtcbiAgICAgICAgcmV0dXJuIHRyZWU7XG4gICAgfTtcbiAgICByZXR1cm4gTWFpbjtcbn0oKSk7XG5leHBvcnRzLk1haW4gPSBNYWluO1xuZXhwb3J0cy5kZWZhdWx0ID0gTWFpbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXZpZXcuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKiBqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG4vKlxuZXhwb3J0IEJyZWFkQ3J1bWJNZW51IGZyb20gJy4vYnJlYWRjcnVtYnMvQnJlYWRDcnVtYk1lbnUnO1xuZXhwb3J0IEJyZWFkQ3J1bWIgZnJvbSAnLi9icmVhZGNydW1icy9CcmVhZENydW1iJztcbmV4cG9ydCBCdXR0b24gZnJvbSAnLi9idXR0b24vQnV0dG9uJztcbmV4cG9ydCBNb2RhbCBmcm9tICcuL21vZGFsL01vZGFsJztcbmV4cG9ydCBNb2RhbEhlYWRlciBmcm9tICcuL21vZGFsL01vZGFsSGVhZGVyJztcbmV4cG9ydCBNb2RhbEJvZHkgZnJvbSAnLi9tb2RhbC9Nb2RhbEJvZHknO1xuZXhwb3J0IE1vZGFsRm9vdGVyIGZyb20gJy4vbW9kYWwvTW9kYWxGb290ZXInO1xuZXhwb3J0IENvbnRhaW5lciBmcm9tICcuL2NvbnRhaW5lci9Db250YWluZXInO1xuZXhwb3J0IENvbHVtbiBmcm9tICcuL2NvbHVtbi9Db2x1bW4nO1xuZXhwb3J0IFJvdyBmcm9tICcuL3Jvdy9Sb3cnO1xuZXhwb3J0IFRhYmxlIGZyb20gJy4vdGFibGUvVGFibGUnO1xuZXhwb3J0IEF1dG9jb21wbGV0ZSBmcm9tICcuL2F1dG9jb21wbGV0ZS9BdXRvY29tcGxldGUnO1xuZXhwb3J0IElucHV0IGZyb20gJy4vaW5wdXQvSW5wdXQnO1xuZXhwb3J0IFNlbGVjdCBmcm9tICcuL3NlbGVjdC9TZWxlY3QnO1xuZXhwb3J0IFN3aXRjaCBmcm9tICcuL3N3aXRjaC9Td2l0Y2gnO1xuZXhwb3J0IEp1bWJvdHJvbiBmcm9tICcuL2p1bWJvdHJvbi9KdW1ib3Ryb24nO1xuZXhwb3J0IFdlbGwgZnJvbSAnLi93ZWxsL1dlbGwnO1xuZXhwb3J0IFBhbmVsIGZyb20gJy4vcGFuZWwvUGFuZWwnO1xuZXhwb3J0IFBhbmVsSGVhZGVyIGZyb20gJy4vcGFuZWwvSGVhZGVyJztcbmV4cG9ydCBQYW5lbEJvZHkgZnJvbSAnLi9wYW5lbC9Cb2R5JztcbmV4cG9ydCBQYW5lbEZvb3RlciBmcm9tICcuL3BhbmVsL0Zvb3Rlcic7XG5leHBvcnQgQ2FyZCBmcm9tICcuL2NhcmQvQ2FyZCc7XG5leHBvcnQgQ2FyZEltYWdlIGZyb20gJy4vY2FyZC9DYXJkSW1hZ2UnO1xuZXhwb3J0IENhcmRUaXRsZSBmcm9tICcuL2NhcmQvQ2FyZFRpdGxlJztcbmV4cG9ydCBDYXJkQmxvY2sgZnJvbSAnLi9jYXJkL0NhcmRCbG9jayc7XG5leHBvcnQgVGFiIGZyb20gJy4vdGFicy9UYWInO1xuZXhwb3J0IFRhYnMgZnJvbSAnLi90YWJzL1RhYnMnO1xuZXhwb3J0IExpc3RHcm91cCBmcm9tICcuL2xpc3QtZ3JvdXAvTGlzdEdyb3VwJztcbmV4cG9ydCBMaXN0R3JvdXBJdGVtIGZyb20gJy4vbGlzdC1ncm91cC9MaXN0R3JvdXBJdGVtJztcbmV4cG9ydCBTZWFyY2ggZnJvbSAnLi9zZWFyY2gvU2VhcmNoJztcbiovXG52YXIgRHJhd2VyTGF5b3V0XzEgPSByZXF1aXJlKFwiLi9kcmF3ZXItbGF5b3V0L0RyYXdlckxheW91dFwiKTtcbmV4cG9ydHMuRHJhd2VyTGF5b3V0ID0gRHJhd2VyTGF5b3V0XzEuRHJhd2VyTGF5b3V0O1xuLyoganNoaW50IGlnbm9yZTplbmQgKi9cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5ISURERU4gPSAnLS13dy1oaWRkZW4nO1xuZXhwb3J0cy5EUkFXRVJfTEFZT1VUID0gJ3d3LWRyYXdlci1sYXlvdXQnO1xuZXhwb3J0cy5EUkFXRVIgPSAnd3ctZHJhd2VyJztcbmV4cG9ydHMuRFJBV0VSX0NPTlRFTlQgPSAnd3ctZHJhd2VyX19jb250ZW50JztcbmV4cG9ydHMuRFJBV0VSX0JVVFRPTiA9ICd3dy1kcmF3ZXJfX2J1dHRvbic7XG5leHBvcnRzLk1BSU5fVklFVyA9ICd3dy1tYWluLXZpZXcnO1xuZXhwb3J0cy5MQVlPVVQgPSAnd3ctbGF5b3V0JztcbmV4cG9ydHMuVklTSUJMRSA9ICd3YXQtdmlzaWJsZSc7XG5leHBvcnRzLkFDVElWRSA9ICd3YXQtYWN0aXZlJztcbmV4cG9ydHMuRE9XTl9BUlJPVyA9ICdhcnJvdy1kb3duJztcbmV4cG9ydHMuVVBfQVJST1cgPSAnYXJyb3ctdXAnO1xuZXhwb3J0cy5MQVlPVVRfTUFJTl9DT05URU5UID0gJ3dhdC1sYXlvdXQtbWFpbi1jb250ZW50JztcbmV4cG9ydHMuTEFZT1VUX0FDVElPTl9BUkVBID0gJ3dhdC1sYXlvdXQtYWN0aW9uLWFyZWEnO1xuZXhwb3J0cy5MQVlPVVRfQUNUSU9OX0FSRUFfQ09OVEVOVCA9ICd3YXQtbGF5b3V0LWFjdGlvbi1hcmVhLWNvbnRlbnQnO1xuZXhwb3J0cy5MQVlPVVRfTUVOVV9CVVRUT04gPSAnd2F0LWxheW91dC1tZW51LWJ1dHRvbic7XG5leHBvcnRzLkxBWU9VVF9CQU5ORVIgPSAnd2F0LWxheW91dC1iYW5uZXInO1xuZXhwb3J0cy5MQVlPVVRfQkFOTkVSX0lNQUdFID0gJ3dhdC1sYXlvdXQtYmFubmVyLWltYWdlJztcbmV4cG9ydHMuTEFZT1VUX0RSQVdFUl9OQVZJR0FUSU9OID0gJ3dhdC1sYXlvdXQtZHJhd2VyLW5hdmlnYXRpb24nO1xuZXhwb3J0cy5MQVlPVVRfRFJBV0VSX05BVklHQVRJT05fVElUTEUgPSAnd2F0LWxheW91dC1kcmF3ZXItbmF2aWdhdGlvbi10aXRsZSc7XG5leHBvcnRzLkxBWU9VVF9BQ0NPVU5UX0FSRUEgPSAnd2F0LWxheW91dC1hY2NvdW50LWFyZWEnO1xuZXhwb3J0cy5MQVlPVVRfQUNDT1VOVF9BUkVBX1RJVExFID0gJ3dhdC1sYXlvdXQtYWNjb3VudC1hcmVhLXRpdGxlJztcbmV4cG9ydHMuTEFZT1VUX0FDQ09VTlRfQVJFQV9UT0dHTEUgPSAnd2F0LWxheW91dC1hY2NvdW50LWFyZWEtdG9nZ2xlJztcbmV4cG9ydHMuTEFZT1VUX05PVElGSUNBVElPTiA9ICd3YXQtbGF5b3V0LW5vdGlmaWNhdGlvbic7XG5leHBvcnRzLkxBWU9VVF9PVkVSTEFZID0gJ3dheS1sYXlvdXQtb3ZlcmxheSc7XG5leHBvcnRzLkFVVE9DT01QTEVURSA9ICd3YXQta2l0LWF1dG9jb21wbGV0ZSc7XG5leHBvcnRzLkFVVE9DT01QTEVURV9DT05UQUlORVIgPSAnd2F0LWtpdC1hdXRvY29tcGxldGUtY29udGFpbmVyJztcbmV4cG9ydHMuQVVUT0NPTVBMRVRFX0lOUFVUX0FSRUEgPSAnd2F0LWtpdC1hdXRvY29tcGxldGUtaW5wdXQtYXJlYSc7XG5leHBvcnRzLkFVVE9DT01QTEVURV9JTlBVVCA9ICd3YXQta2l0LWF1dG9jb21wbGV0ZS1pbnB1dCc7XG5leHBvcnRzLkFVVE9DT01QTEVURV9PUFRJT05TID0gJ3dhdC1raXQtYXV0b2NvbXBsZXRlLW9wdGlvbnMnO1xuZXhwb3J0cy5BVVRPQ09NUExFVEVfSVRFTV9XUkFQUEVSID0gJ3dhdC1raXQtYXV0by1jb21wbGV0ZS1pdGVtLXdyYXBwZXInO1xuZXhwb3J0cy5TV0lUQ0ggPSAnd2F0LWNvbXBvbmVudHMtc3dpdGNoJztcbmV4cG9ydHMuU1dJVENIX1NMSURFUiA9ICd3YXQtY29tcG9uZW50cy1zd2l0Y2gtc2xpZGVyJztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVN0eWxlcy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG52YXIgdmlld18xID0gcmVxdWlyZShcIi4vdmlld1wiKTtcbnZhciBBcHBsaWNhdGlvbiA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQXBwbGljYXRpb24oKSB7XG4gICAgICAgIHRoaXMudmlldyA9IG5ldyB2aWV3XzEuTWFpbih0aGlzKTtcbiAgICB9XG4gICAgQXBwbGljYXRpb24ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgd2luZG93LmFwcCA9IHRoaXM7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYWluJykuYXBwZW5kQ2hpbGQodGhpcy52aWV3LnJlbmRlcigpKTtcbiAgICAgICAgdGhpcy5kcmF3ZXIgPSB0aGlzLnZpZXcuZmluZEJ5SWQoJ2RyYXdlcicpO1xuICAgIH07XG4gICAgQXBwbGljYXRpb24ubWFpbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIChuZXcgdGhpcygpKS5ydW4oKTtcbiAgICB9O1xuICAgIHJldHVybiBBcHBsaWNhdGlvbjtcbn0oKSk7XG5kZXNjcmliZSgnQXBwbGljYXRpb24nLCBmdW5jdGlvbiAoKSB7XG4gICAgaXQoJ3Nob3VsZCByZW5kZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIEFwcGxpY2F0aW9uLm1haW4oKTtcbiAgICB9KTtcbn0pO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xudmFyIGNvbXBvbmVudHNfMSA9IHJlcXVpcmUoXCJAcXVlbmsvd21sLXdpZGdldHMvbGliL2NvbXBvbmVudHNcIik7XG5mdW5jdGlvbiAkJGJvdW5kYXJ5X3RvX2RvdCh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZS5zcGxpdCgnXVsnKS5qb2luKCcuJykuc3BsaXQoJ1snKS5qb2luKCcuJyk7XG59XG5mdW5jdGlvbiAkJHN0cmlwX2JyYWNlcyh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZS5zcGxpdCgnWycpLmpvaW4oJy4nKS5zcGxpdCgnXScpLmpvaW4oJycpO1xufVxuZnVuY3Rpb24gJCRlc2NhcGVfZG90cyh2YWx1ZSkge1xuICAgIHZhbHVlID0gdmFsdWUuc3BsaXQoJ1xcJycpO1xuICAgIHJldHVybiAodmFsdWUubGVuZ3RoIDwgMykgPyB2YWx1ZS5qb2luKCdcXCcnKSA6IHZhbHVlLm1hcChmdW5jdGlvbiAoc2VnKSB7XG4gICAgICAgIGlmIChzZWcubGVuZ3RoIDwgMylcbiAgICAgICAgICAgIHJldHVybiBzZWc7XG4gICAgICAgIGlmICgoc2VnWzBdID09PSAnLicpIHx8IChzZWdbc2VnLmxlbmd0aCAtIDFdID09PSAnLicpKVxuICAgICAgICAgICAgcmV0dXJuIHNlZztcbiAgICAgICAgcmV0dXJuIHNlZy5zcGxpdCgnLicpLmpvaW4oJyYmJyk7XG4gICAgfSkuam9pbignJyk7XG59XG5mdW5jdGlvbiAkJHVuZXNjYXBlX2RvdHModmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUuc3BsaXQoJyYmJykuam9pbignLicpO1xufVxuZnVuY3Rpb24gJCRwYXJ0aWZ5KHZhbHVlKSB7XG4gICAgaWYgKCF2YWx1ZSlcbiAgICAgICAgcmV0dXJuO1xuICAgIHJldHVybiAkJGVzY2FwZV9kb3RzKCQkc3RyaXBfYnJhY2VzKCQkYm91bmRhcnlfdG9fZG90KCcnICsgdmFsdWUpKSkuc3BsaXQoJy4nKTtcbn1cbmZ1bmN0aW9uICQkcHJvcGVydHkocGF0aCwgbykge1xuICAgIHZhciBwYXJ0cyA9ICQkcGFydGlmeShwYXRoKTtcbiAgICB2YXIgZmlyc3Q7XG4gICAgaWYgKHR5cGVvZiBvICE9PSAnb2JqZWN0JylcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZ2V0KCk6IGV4cGVjdHMgYW4gb2JqZWN0IGdvdCAnICsgdHlwZW9mIG8pO1xuICAgIGlmIChwYXJ0cy5sZW5ndGggPT09IDEpXG4gICAgICAgIHJldHVybiBvWyQkdW5lc2NhcGVfZG90cyhwYXJ0c1swXSldO1xuICAgIGlmIChwYXJ0cy5sZW5ndGggPT09IDApXG4gICAgICAgIHJldHVybjtcbiAgICBmaXJzdCA9IG9bcGFydHMuc2hpZnQoKV07XG4gICAgcmV0dXJuICgodHlwZW9mIG8gPT09ICdvYmplY3QnKSAmJiAobyAhPT0gbnVsbCkpID9cbiAgICAgICAgcGFydHMucmVkdWNlKGZ1bmN0aW9uICh0YXJnZXQsIHByb3ApIHtcbiAgICAgICAgICAgIGlmICh0YXJnZXQgPT0gbnVsbClcbiAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgICAgICAgICAgcmV0dXJuIHRhcmdldFskJHVuZXNjYXBlX2RvdHMocHJvcCldO1xuICAgICAgICB9LCBmaXJzdCkgOiBudWxsO1xufVxuZnVuY3Rpb24gJCRhZG9wdChjaGlsZCwgZSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGNoaWxkKSlcbiAgICAgICAgcmV0dXJuIGNoaWxkLmZvckVhY2goZnVuY3Rpb24gKGlubmVyQ2hpbGQpIHsgcmV0dXJuICQkYWRvcHQoaW5uZXJDaGlsZCwgZSk7IH0pO1xuICAgIGlmIChjaGlsZClcbiAgICAgICAgZS5hcHBlbmRDaGlsZCgodHlwZW9mIGNoaWxkID09PSAnb2JqZWN0JykgP1xuICAgICAgICAgICAgY2hpbGQgOiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjaGlsZCB8fCAnJykpO1xufVxuLyoqXG4gKiAkJHJlZ2lzdGVyIGEgV2lkZ2V0IG9yIE5vZGUgYnkgdGhlIHNwZWNpZmllZCB3bWw6aWRcbiAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICogQHBhcmFtIHtXaWRnZXR8Tm9kZX0gdGFyZ2V0XG4gKiBAcGFyYW0ge29iamVjdH0gaWRzXG4gKi9cbmZ1bmN0aW9uICQkcmVnaXN0ZXIoaWQsIHRhcmdldCwgaWRzKSB7XG4gICAgaWYgKGlkcy5oYXNPd25Qcm9wZXJ0eShpZCkpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignRHVwbGljYXRlIGlkIFxcJycgKyBpZCArICdcXCcgZGV0ZWN0ZWQhJyk7XG4gICAgaWRzW2lkXSA9IHRhcmdldDtcbiAgICByZXR1cm4gdGFyZ2V0O1xufVxuLyoqXG4gKiAkJHRleHQgY3JlYXRlcyBhIERPTVRleHROb2RlXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAqL1xuZnVuY3Rpb24gJCR0ZXh0KHZhbHVlKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHZhbHVlIHx8ICcnKTtcbn1cbi8qKlxuICogJCRyZXNvbHZlIHByb3BlcnR5IGFjY2VzcyBleHByZXNzaW9uIHRvIGF2b2lkXG4gKiB0aG93aW5nIGVycm9ycyBpZiBpdCBkb2VzIG5vdCBleGlzdC5cbiAqIEBwYXJhbSB7b2JqZWN0fSBoZWFkXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0aFxuICovXG5mdW5jdGlvbiAkJHJlc29sdmUoaGVhZCwgcGF0aCkge1xuICAgIHZhciByZXQgPSAkJHByb3BlcnR5KHBhdGgsIGhlYWQpO1xuICAgIHJldHVybiAocmV0ID09IG51bGwpID8gJycgOiByZXQ7XG59XG4vKipcbiAqICQkbm9kZSBpcyBjYWxsZWQgdG8gY3JlYXRlIGEgcmVndWxhciBET00gbm9kZVxuICogQHBhcmFtIHtzdHJpbmd9IHRhZ1xuICogQHBhcmFtIHtvYmplY3R9IGF0dHJpYnV0ZXNcbiAqIEBwYXJhbSB7YXJyYXk8c3RyaW5nfG51bWJlcnxXaWRnZXQ+fSBjaGlsZHJlblxuICogQHBhcmFtIHtWaWV3fSB2aWV3XG4gKi9cbmZ1bmN0aW9uICQkbm9kZSh0YWcsIGF0dHJpYnV0ZXMsIGNoaWxkcmVuLCB2aWV3KSB7XG4gICAgdmFyIGUgPSAodGFnID09PSAnZnJhZ21lbnQnKSA/IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSA6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgICBpZiAodHlwZW9mIGF0dHJpYnV0ZXMuaHRtbCA9PT0gJ29iamVjdCcpXG4gICAgICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMuaHRtbCkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGF0dHJpYnV0ZXMuaHRtbFtrZXldID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgZVtrZXldID0gYXR0cmlidXRlcy5odG1sW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBlLnNldEF0dHJpYnV0ZShrZXksIGF0dHJpYnV0ZXMuaHRtbFtrZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoYykgeyByZXR1cm4gJCRhZG9wdChjLCBlKTsgfSk7XG4gICAgaWYgKGF0dHJpYnV0ZXMud21sKVxuICAgICAgICBpZiAoYXR0cmlidXRlcy53bWwuaWQpXG4gICAgICAgICAgICAkJHJlZ2lzdGVyKGF0dHJpYnV0ZXMud21sLmlkLCBlLCB2aWV3Lmlkcyk7XG4gICAgcmV0dXJuIGU7XG59XG4vKipcbiAqIEF0dHJpYnV0ZXMgcHJvdmlkZXMgYW4gQVBJIGZvciByZWFkaW5nIHRoZVxuICogYXR0cmlidXRlcyBzdXBwbGllZCB0byBhbiBFbGVtZW50LlxuICogQHBhcmFtIHtvYmplY3R9IGF0dHJzXG4gKi9cbnZhciBBdHRyaWJ1dGVzID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBBdHRyaWJ1dGVzKF9hdHRycykge1xuICAgICAgICB0aGlzLl9hdHRycyA9IF9hdHRycztcbiAgICAgICAgdGhpcy5fYXR0cnMgPSBfYXR0cnM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIHJlYWQgYSB2YWx1ZSBmb3JtIHRoZSBpbnRlcm5hbCBsaXN0LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoXG4gICAgICogQHBhcmFtIHsqfSBkZWZhdWx0VmFsdWUgLSBUaGlzIHZhbHVlIGlzIHJldHVybmVkIGlmIHRoZSB2YWx1ZSBpcyBub3Qgc2V0LlxuICAgICAqL1xuICAgIEF0dHJpYnV0ZXMucHJvdG90eXBlLnJlYWQgPSBmdW5jdGlvbiAocGF0aCwgZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgIHZhciByZXQgPSAkJHByb3BlcnR5KHBhdGguc3BsaXQoJzonKS5qb2luKCcuJyksIHRoaXMuX2F0dHJzKTtcbiAgICAgICAgcmV0dXJuIChyZXQgIT0gbnVsbCkgPyByZXQgOiAoZGVmYXVsdFZhbHVlICE9IG51bGwpID8gZGVmYXVsdFZhbHVlIDogJyc7XG4gICAgfTtcbiAgICByZXR1cm4gQXR0cmlidXRlcztcbn0oKSk7XG4vKipcbiAqICQkd2lkZ2V0IGNyZWF0ZXMgYSB3bWwgd2lkZ2V0LlxuICogQHBhcmFtIHtmdW5jdGlvbn0gQ29uc3RydXRvclxuICogQHBhcmFtIHtvYmplY3R9IGF0dHJpYnV0ZXNcbiAqIEBwYXJhbSB7YXJyYXk8c3RyaW5nfG51bWJlcnxXaWRnZXQ+fSBjaGlsZHJlblxuICogQHBhcmFtIHtWaWV3fSB2aWV3XG4gKiBAcmV0dXJuIHtXaWRnZXR9XG4gKi9cbmZ1bmN0aW9uICQkd2lkZ2V0KENvbnN0cnVjdG9yLCBhdHRyaWJ1dGVzLCBjaGlsZHJlbiwgdmlldykge1xuICAgIHZhciBjaGlsZHMgPSBbXTtcbiAgICB2YXIgdztcbiAgICBjaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChjaGlsZCkgeyByZXR1cm4gQXJyYXkuaXNBcnJheShjaGlsZCkgP1xuICAgICAgICBjaGlsZHMucHVzaC5hcHBseShjaGlsZHMsIGNoaWxkKSA6IGNoaWxkcy5wdXNoKGNoaWxkKTsgfSk7XG4gICAgdyA9IG5ldyBDb25zdHJ1Y3RvcihuZXcgQXR0cmlidXRlcyhhdHRyaWJ1dGVzKSwgY2hpbGRzKTtcbiAgICBpZiAoYXR0cmlidXRlcy53bWwpXG4gICAgICAgIGlmIChhdHRyaWJ1dGVzLndtbC5pZClcbiAgICAgICAgICAgICQkcmVnaXN0ZXIoYXR0cmlidXRlcy53bWwuaWQsIHcsIHZpZXcuaWRzKTtcbiAgICB2aWV3LndpZGdldHMucHVzaCh3KTtcbiAgICByZXR1cm4gdy5yZW5kZXIoKTtcbn1cbi8qKlxuICogJCRpZiBpcyBjYWxsZWQgdG8gY3JlYXRlIGFuIGlmIGNvbmRpdGlvbmFsIGNvbnN0cnVjdFxuICogQHBhcmFtIHsqfSBwcmVkaWNhdGVcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHBvc2l0aXZlXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBuZWdhdGl2ZVxuICovXG5mdW5jdGlvbiAkJGlmKHByZWRpY2F0ZSwgcG9zaXRpdmUsIG5lZ2F0aXZlKSB7XG4gICAgcmV0dXJuIChwcmVkaWNhdGUpID8gcG9zaXRpdmUoKSA6IG5lZ2F0aXZlKCk7XG59XG4vKipcbiAqICQkZm9yIGlzIGNhbGxlZCB0byBjcmVhdGUgYSBmb3IgbG9vcCBjb25zdHJ1Y3RcbiAqIEBwYXJhbSB7SXRlcmFibGV9IGNvbGxlY3Rpb25cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNiXG4gKi9cbmZ1bmN0aW9uICQkZm9yKGNvbGxlY3Rpb24sIGNiKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoY29sbGVjdGlvbikpIHtcbiAgICAgICAgcmV0dXJuIGNvbGxlY3Rpb24ubWFwKGNiKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGNvbGxlY3Rpb24gPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhjb2xsZWN0aW9uKS5tYXAoZnVuY3Rpb24gKGtleSwgXywgYWxsKSB7IHJldHVybiBjYihjb2xsZWN0aW9uW2tleV0sIGtleSwgYWxsKTsgfSk7XG4gICAgfVxuICAgIHJldHVybiBbXTtcbn1cbi8qKlxuICogJCRzd2l0Y2ggc2ltdWxhdGVzIGEgc3dpdGNoIHN0YXRlbWVudFxuICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfGJvb2xlYW59IHZhbHVlXG4gKiBAcGFyYW0ge29iamVjdH0gY2FzZXNcbiAqL1xuZnVuY3Rpb24gJCRzd2l0Y2godmFsdWUsIGNhc2VzKSB7XG4gICAgdmFyIHJlc3VsdCA9IGNhc2VzW3ZhbHVlXTtcbiAgICB2YXIgZGVmYXVsID0gY2FzZXNbXCJkZWZhdWx0XCJdO1xuICAgIGlmIChyZXN1bHQpXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgaWYgKGRlZmF1bClcbiAgICAgICAgcmV0dXJuIGRlZmF1bDtcbn1cbnZhciBNYWluID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBNYWluKGNvbnRleHQpIHtcbiAgICAgICAgdmFyIHZpZXcgPSB0aGlzO1xuICAgICAgICB0aGlzLmlkcyA9IHt9O1xuICAgICAgICB0aGlzLndpZGdldHMgPSBbXTtcbiAgICAgICAgdGhpcy50cmVlID0gbnVsbDtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAkJHdpZGdldChjb21wb25lbnRzXzEuRHJhd2VyTGF5b3V0LCB7XG4gICAgICAgICAgICAgICAgaHRtbDoge31cbiAgICAgICAgICAgIH0sIFskJG5vZGUoJ3AnLCB7XG4gICAgICAgICAgICAgICAgICAgIGh0bWw6IHt9XG4gICAgICAgICAgICAgICAgfSwgWyQkdGV4dChcIlRoaXMgaXMgaW4gdGhlIGRyYXdlclwiKV0sIHZpZXcpLCAkJG5vZGUoJ3AnLCB7XG4gICAgICAgICAgICAgICAgICAgIGh0bWw6IHt9XG4gICAgICAgICAgICAgICAgfSwgWyQkdGV4dChcIiBUaGlzIGlzIGluIG1haW5cIildLCB2aWV3KV0sIHZpZXcpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBNYWluLnJlbmRlciA9IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgICAgIHJldHVybiAobmV3IE1haW4oY29udGV4dCkpLnJlbmRlcigpO1xuICAgIH07XG4gICAgTWFpbi5wcm90b3R5cGUuZmluZEJ5SWQgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmlkc1tpZF0pID8gdGhpcy5pZHNbaWRdIDogbnVsbDtcbiAgICB9O1xuICAgIE1haW4ucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHRyZWUgPSBudWxsO1xuICAgICAgICB0aGlzLmlkcyA9IHt9O1xuICAgICAgICB0aGlzLndpZGdldHMuZm9yRWFjaChmdW5jdGlvbiAodykgeyByZXR1cm4gdy5yZW1vdmVkKCk7IH0pO1xuICAgICAgICB0aGlzLndpZGdldHMgPSBbXTtcbiAgICAgICAgdHJlZSA9IHRoaXMudGVtcGxhdGUuY2FsbCh0aGlzLmNvbnRleHQpO1xuICAgICAgICB0aGlzLmlkc1sncm9vdCddID0gKHRoaXMuaWRzWydyb290J10pID8gdGhpcy5pZHNbJ3Jvb3QnXSA6IHRyZWU7XG4gICAgICAgIHRoaXMud2lkZ2V0cy5mb3JFYWNoKGZ1bmN0aW9uICh3KSB7IHJldHVybiB3LnJlbmRlcmVkKCk7IH0pO1xuICAgICAgICByZXR1cm4gdHJlZTtcbiAgICB9O1xuICAgIHJldHVybiBNYWluO1xufSgpKTtcbmV4cG9ydHMuTWFpbiA9IE1haW47XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IE1haW47XG4iXX0=
