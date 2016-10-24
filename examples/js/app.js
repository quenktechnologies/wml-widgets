(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = require('wmljs/lib/runtime');

var _layout = require('./wml/layout.wml');

var _layout2 = _interopRequireDefault(_layout);

var _NewUserForm = require('./NewUserForm');

var _NewUserForm2 = _interopRequireDefault(_NewUserForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Application = function () {
    function Application() {
        _classCallCheck(this, Application);

        this.view = new _runtime.View(_layout2.default, this);
        this.drawer = null;
        this.actions = null;
        this.notifications = null;
        this.content = null;
        this.modal = null;
    }

    _createClass(Application, [{
        key: 'showNewUserDialog',
        value: function showNewUserDialog() {

            this.modal.put(new _NewUserForm2.default(this));
        }
    }, {
        key: 'menuButtonClicked',
        value: function menuButtonClicked() {

            this.drawer.toggle();
        }
    }, {
        key: 'navigate',
        value: function navigate(item) {

            item.active();
        }

        /**
         * searchUsers
         */

    }, {
        key: 'searchUsers',
        value: function searchUsers(value, autocomplete) {

            console.log('searching with ', value);
            autocomplete.update(['Paul', 'Litchie']);
        }
    }, {
        key: 'userSelected',
        value: function userSelected(value, name) {

            console.log('Selected: ' + name + '->' + value);
        }
    }, {
        key: 'run',
        value: function run() {

            window.app = this;
            document.body.insertBefore(this.view.render(), document.body.firstChild);

            this.drawer = this.view.findById('drawer');
            this.actions = this.view.findById('actions');
            this.notifications = this.view.findById('notifications');
            this.content = this.view.findById('main');
            this.modal = this.view.findById('modal');

            this.notifications.put('Application started!');
        }
    }], [{
        key: 'main',
        value: function main() {

            return new this().run();
        }
    }]);

    return Application;
}();

Application.main();

},{"./NewUserForm":2,"./wml/layout.wml":3,"wmljs/lib/runtime":83}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = require('wmljs/lib/runtime');

var _new_user_form = require('./wml/new_user_form.wml');

var _new_user_form2 = _interopRequireDefault(_new_user_form);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * NewUserForm
 */
var NewUserForm = function () {
    function NewUserForm(app) {
        _classCallCheck(this, NewUserForm);

        this.app = app;
        this.view = new _runtime.View(_new_user_form2.default, this);
    }

    _createClass(NewUserForm, [{
        key: 'save',
        value: function save() {}
    }, {
        key: 'cancel',
        value: function cancel() {

            this.app.modal.modal.hide();
        }
    }, {
        key: 'render',
        value: function render() {

            return this.view.render();
        }
    }]);

    return NewUserForm;
}();

exports.default = NewUserForm;

},{"./wml/new_user_form.wml":4,"wmljs/lib/runtime":83}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (make) {
  return make.widget(_layout.LayoutContainer, { html: {} }, [make.widget(_components.Modal, { html: {}, wml: { 'id': "modal" } }, []), make.widget(_layout.Drawer, { html: {}, wml: { 'id': "drawer" } }, [make.widget(_layout.LogoImage, { html: {}, wat: { 'image': "img/logo.svg" } }, []), make.widget(_layout.DrawerNavigation, { html: {} }, [make.widget(_layout.DrawerLink, { html: {}, wat: { 'href': "#/dashboard", 'title': "Dashboard", 'active': make.resolve(window, 'location.hash') === '#/dashboard', 'onClick': this.navigate.bind(this) } }, []), make.widget(_layout.DrawerLink, { html: {}, wat: { 'href': "#/messages", 'title': "Messages", 'active': make.resolve(window, 'location.hash') === '#/messages', 'onClick': this.navigate.bind(this) } }, []), make.widget(_layout.DrawerLink, { html: {}, wat: { 'href': "#/invoices", 'title': "Invoices", 'active': make.resolve(window, 'location.hash') === '#/invoices', 'onClick': this.navigate.bind(this) } }, []), make.widget(_layout.DrawerLink, { html: {}, wat: { 'href': "#/users", 'title': "Users", 'active': make.resolve(window, 'location.hash') === '#/users', 'onClick': this.navigate.bind(this) } }, [])]), make.widget(_layout.AccountArea, { html: {}, wat: { 'title': "Jane Joe" } }, [])]), make.widget(_layout.Main, { html: {}, wml: { 'id': "content" } }, [make.widget(_layout.ActionArea, { html: {}, wml: { 'id': "actions" }, wat: { 'onMenuButtonClicked': this.menuButtonClicked.bind(this) } }, [make.node('h3', { html: { 'class': "main-content" } }, [make.widget(_components.BreadCrumbMenu, { html: {} }, [make.widget(_components.BreadCrumb, { html: {}, wat: { 'href': "#" } }, [make.text('Home')]), make.widget(_components.BreadCrumb, { html: {}, wat: { 'href': "#", 'active': true } }, [make.text('Example')])])]), make.node('div', { html: { 'class': "secondary-content" } }, [make.widget(_components.Button, { html: {}, wat: { 'name': "new user", 'variant': "primary", 'text': "New User", 'onClick': this.showNewUserDialog.bind(this) } }, [])])]), make.widget(_components.Container, { html: {} }, [make.widget(_components.Row, { html: {} }, [make.widget(_components.Column, { html: {} }, [make.node('h3', { html: {} }, [make.text('Show disabled?')]), make.widget(_components.Switch, { html: {} }, [])])]), make.widget(_components.Row, { html: {} }, [make.widget(_components.Column, { html: {} }, [make.node('h4', { html: {} }, [make.text('Search Users')])])]), make.widget(_components.Row, { html: {} }, [make.widget(_components.Column, { html: {} }, [make.widget(_components.Autocomplete, { html: {}, wat: { 'inputClass': "form-control", 'name': "user", 'value': "Richard", 'set': this.userSelected.bind(this), 'search': this.searchUsers.bind(this) } }, [])])]), make.widget(_components.Row, { html: {} }, [make.widget(_components.Column, { html: {} }, [make.widget(_components.Select, { html: {}, wat: { 'name': "user", 'value': "Richard", 'options': [{ value: 1, label: 'First' }, { value: 2, label: 'Second' }] } }, [])])])])]), make.widget(_layout.Notification, { html: {}, wml: { 'id': "notifications" } }, [])]);
};

var _layout = require('layout');

var _components = require('components');
},{"components":36,"layout":70}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
        value: true
});

exports.default = function (make) {
        return make.node('fragment', { html: {} }, [make.widget(_components.ModalHeader, { html: {} }, [make.text('\n        Create a new user\n    ')]), make.widget(_components.ModalBody, { html: {} }, [make.node('p', { html: {} }, [make.text(' :O')])]), make.widget(_components.ModalFooter, { html: {} }, [make.widget(_components.Button, { html: {}, wat: { 'variant': "default", 'onClick': this.cancel.bind(this), 'text': "Cancel" } }, []), make.widget(_components.Button, { html: {}, wat: { 'variant': "primary", 'onClick': this.save.bind(this), 'text': "Save" } }, [])])]);
};

var _components = require('components');
},{"components":36}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var VISIBLE = exports.VISIBLE = 'wat-visible';
var HIDDEN = exports.HIDDEN = 'wat-hidden';
var ACTIVE = exports.ACTIVE = 'wat-active';
var DOWN_ARROW = exports.DOWN_ARROW = 'arrow-down';
var UP_ARROW = exports.UP_ARROW = 'arrow-up';
var LAYOUT_CONTAINER = exports.LAYOUT_CONTAINER = 'wat-layout-container';
var LAYOUT_DRAWER = exports.LAYOUT_DRAWER = 'wat-layout-drawer';
var LAYOUT_DRAWER_CONTENT = exports.LAYOUT_DRAWER_CONTENT = 'wat-layout-drawer-content';
var LAYOUT_MAIN = exports.LAYOUT_MAIN = 'wat-layout-main';
var LAYOUT_MAIN_CONTENT = exports.LAYOUT_MAIN_CONTENT = 'wat-layout-main-content';
var LAYOUT_ACTION_AREA = exports.LAYOUT_ACTION_AREA = 'wat-layout-action-area';
var LAYOUT_ACTION_AREA_CONTENT = exports.LAYOUT_ACTION_AREA_CONTENT = 'wat-layout-action-area-content';
var LAYOUT_MENU_BUTTON = exports.LAYOUT_MENU_BUTTON = 'wat-layout-menu-button';
var LAYOUT_BANNER = exports.LAYOUT_BANNER = 'wat-layout-banner';
var LAYOUT_BANNER_IMAGE = exports.LAYOUT_BANNER_IMAGE = 'wat-layout-banner-image';
var LAYOUT_DRAWER_NAVIGATION = exports.LAYOUT_DRAWER_NAVIGATION = 'wat-layout-drawer-navigation';
var LAYOUT_DRAWER_NAVIGATION_TITLE = exports.LAYOUT_DRAWER_NAVIGATION_TITLE = 'wat-layout-drawer-navigation-title';
var LAYOUT_ACCOUNT_AREA = exports.LAYOUT_ACCOUNT_AREA = 'wat-layout-account-area';
var LAYOUT_ACCOUNT_AREA_TITLE = exports.LAYOUT_ACCOUNT_AREA_TITLE = 'wat-layout-account-area-title';
var LAYOUT_ACCOUNT_AREA_TOGGLE = exports.LAYOUT_ACCOUNT_AREA_TOGGLE = 'wat-layout-account-area-toggle';
var LAYOUT_NOTIFICATION = exports.LAYOUT_NOTIFICATION = 'wat-layout-notification';
var WAT_KIT_AUTOCOMPLETE = exports.WAT_KIT_AUTOCOMPLETE = 'wat-kit-autocomplete';
var WAT_KIT_AUTOCOMPLETE_CONTAINER = exports.WAT_KIT_AUTOCOMPLETE_CONTAINER = 'wat-kit-autocomplete-container';
var WAT_KIT_AUTOCOMPLETE_INPUT_AREA = exports.WAT_KIT_AUTOCOMPLETE_INPUT_AREA = 'wat-kit-autocomplete-input-area';
var WAT_KIT_AUTOCOMPLETE_INPUT = exports.WAT_KIT_AUTOCOMPLETE_INPUT = 'wat-kit-autocomplete-input';
var WAT_KIT_AUTOCOMPLETE_OPTIONS = exports.WAT_KIT_AUTOCOMPLETE_OPTIONS = 'wat-kit-autocomplete-options';
var WAT_COMPONENTS_SWITCH = exports.WAT_COMPONENTS_SWITCH = 'wat-components-switch';
var WAT_COMPONENTS_SWITCH_SLIDER = exports.WAT_COMPONENTS_SWITCH_SLIDER = 'wat-components-switch-slider';

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * NullVariable does nothing ... really.
 * @implements {Variable}
 */
var NullVariable = function () {
    function NullVariable() {
        _classCallCheck(this, NullVariable);
    }

    _createClass(NullVariable, [{
        key: "boolean",
        value: function boolean() {

            return this;
        }
    }, {
        key: "number",
        value: function number() {

            return this;
        }
    }, {
        key: "string",
        value: function string() {

            return this;
        }
    }, {
        key: "array",
        value: function array() {

            return this;
        }
    }, {
        key: "date",
        value: function date() {

            return this;
        }
    }, {
        key: "regexp",
        value: function regexp() {

            return this;
        }
    }, {
        key: "function",
        value: function _function() {

            return this;
        }
    }, {
        key: "object",
        value: function object(value, name) {

            return this;
        }
    }, {
        key: "instance",
        value: function instance(cons) {

            return this;
        }
    }, {
        key: "interface",
        value: function _interface(Iface) {

            return this;
        }
    }, {
        key: "default",
        value: function _default(value) {

            return this;
        }
    }, {
        key: "optional",
        value: function optional(value) {

            return this;
        }
    }]);

    return NullVariable;
}();

exports.default = NullVariable;
module.exports = exports["default"];

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _NullVariable = require('./NullVariable');

var _NullVariable2 = _interopRequireDefault(_NullVariable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * TypedVariable
 * @param {object} map
 * @implements {Variable}
 */
var TypedVariable = function () {
    function TypedVariable(map) {
        _classCallCheck(this, TypedVariable);

        var keys = Object.keys(map);

        this.name = keys[0];
        this.value = map[keys[0]];
    }

    _createClass(TypedVariable, [{
        key: '_typeOf',
        value: function _typeOf(type) {

            if (_typeof(this.value) !== type) throw new TypeError('\'' + this.name + '\' must be typeof \'' + type + '\'! Got \'' + _typeof(this.value) + '\'!');

            return this;
        }
    }, {
        key: '_proto',
        value: function _proto(proto) {

            if (Object.prototype.toString.call(this.value) !== proto) throw new TypeError(this.name + ' must be typeof ' + proto + '! Got ' + _typeof(this.value) + '!');
            return this;
        }
    }, {
        key: 'boolean',
        value: function boolean() {

            return this._typeOf('boolean');
        }
    }, {
        key: 'number',
        value: function number() {

            return this._typeOf('number');
        }
    }, {
        key: 'string',
        value: function string() {

            return this._typeOf('string');
        }
    }, {
        key: 'array',
        value: function array() {

            if (!Array.isArray(this.value)) throw new TypeError('\'' + this.name + '\' must be an array! Got \'' + _typeof(this.value) + '\'!');

            return this;
        }
    }, {
        key: 'date',
        value: function date() {

            return this._proto('[object Date]');
        }
    }, {
        key: 'regexp',
        value: function regexp() {

            return this._proto('[object RegExp]');
        }
    }, {
        key: 'function',
        value: function _function() {

            return this._typeOf('function');
        }
    }, {
        key: 'object',
        value: function object(value, name) {

            //Arrays and null are not objects I don't care what yo mama say.
            if (Array.isArray(this.value) || this.value === null) throw new TypeError(this.value + ' must be type of object!');

            return this._typeOf('object');
        }
    }, {
        key: 'instance',
        value: function instance(cons) {

            if (typeof cons !== 'function') throw new TypeError('Cannot check instance of against type \'' + (typeof cons === 'undefined' ? 'undefined' : _typeof(cons)) + '\'');

            if (this.value instanceof cons) return this;

            throw new TypeError('Argument \'' + this.name + '\' must be instance of' + (' \'' + cons.name + '\' got type \'' + _typeof(this.value) + '\'!'));
        }
    }, {
        key: 'interface',
        value: function _interface(Iface) {
            var _this = this;

            if (typeof Iface !== 'function') throw new TypeError('Cannot use type \'' + (typeof Iface === 'undefined' ? 'undefined' : _typeof(Iface)) + '\' as an interface!');

            var o = new Iface();
            var proto = Object.getPrototypeOf(o);

            this.instance(Object);

            var missing = Object.getOwnPropertyNames(proto).filter(function (k) {
                return k === 'constructor' ? false : _typeof(_this.value[k]) === _typeof(proto[k]) ? false : true;
            });

            if (missing.length !== 0) {

                var meths = missing.join(',');

                throw new TypeError('Value passed for argument \'' + this.name + '\'' + (' (type : \'' + _typeof(this.value) + '\') does not satisfy ') + ('interface \'' + o.constructor.name + '\'! Missing methods: ' + meths + '!'));
            }

            return this;
        }
    }, {
        key: 'default',
        value: function _default(value) {
            if ([undefined, null].indexOf(this.value) > -1) this.value = value;
            return this;
        }
    }, {
        key: 'optional',
        value: function optional(value) {

            if ([undefined, null].indexOf(this.value) > -1) return new _NullVariable2.default();

            return this;
        }
    }]);

    return TypedVariable;
}();

exports.default = TypedVariable;
module.exports = exports['default'];

},{"./NullVariable":6}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = beof;

var _TypedVariable = require('./TypedVariable');

var _TypedVariable2 = _interopRequireDefault(_TypedVariable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function beof(o) {

    return new _TypedVariable2.default(o);
}
module.exports = exports['default'];

},{"./TypedVariable":7}],9:[function(require,module,exports){
(function (global){
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide `options` to indicate whether `func`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */
function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
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
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
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

module.exports = throttle;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],10:[function(require,module,exports){
'use strict';

function nop(){}

module.exports = nop;

},{}],11:[function(require,module,exports){
function boundary_to_dot(value) {
	return value.split('][').join('.').split('[').join('.');
}

function strip_braces(value) {
	return value.split('[').join('.').split(']').join('');
}

function escape_dots(value) {
	value = value.split('\'');
	return (value.length < 3) ? value.join('\'') : value.map(function(seg) {
		if (seg.length < 3) return seg;
		if ((seg[0] === '.') || (seg[seg.length - 1] === '.')) return seg;
		return seg.split('.').join('&&');
	}).join('');
}

function unescape_dots(value) {
	return value.split('&&').join('.');
}

function partify(value) {
	if (!value) return '';
	return escape_dots(strip_braces(boundary_to_dot('' + value))).split('.');
}

var get = function(o, path) {

	var parts = partify(path);
	if (parts.length === 1) return o[unescape_dots(parts[0])];
	if (parts.length === 0) return;

	var first = o[parts.shift()];

	return parts.reduce(function(target, prop) {
		if (!target) return target;
		return target[unescape_dots(prop)];
	}, first);
};

get.set = function(obj, path, value) {
	var parts = partify(path);
	parts.reduce(function(target, prop, i) {
		prop = unescape_dots(prop);
		if (parts.length - 1 === i) {
			target[prop] = value;
		} else {
			target[prop] = target[prop] || {};
		}
		return target[prop];


	}, obj);

	return obj;
};

module.exports = get;
module.exports.get = get;

},{}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = require('wmljs/lib/runtime');

var _column = require('./wml/column.wml');

var _column2 = _interopRequireDefault(_column);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Column
 */
var Column = function (_Widget) {
    _inherits(Column, _Widget);

    function Column(attrs, children) {
        _classCallCheck(this, Column);

        var _this = _possibleConstructorReturn(this, (Column.__proto__ || Object.getPrototypeOf(Column)).call(this, attrs, children));

        _this.className = attrs.read('wat:class', 'col-md-12');

        return _this;
    }

    _createClass(Column, [{
        key: 'render',
        value: function render() {

            return _runtime.View.render(_column2.default, this);
        }
    }]);

    return Column;
}(_runtime.Widget);

exports.default = Column;

},{"./wml/column.wml":55,"wmljs/lib/runtime":83}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = require('wmljs/lib/runtime');

var _container = require('./wml/container.wml');

var _container2 = _interopRequireDefault(_container);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Container
 */
var Container = function (_Widget) {
    _inherits(Container, _Widget);

    function Container(attrs, children) {
        _classCallCheck(this, Container);

        var _this = _possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).call(this, attrs, children));

        _this.className = ('container-fluid ' + attrs.read('wat:class', '')).trim();

        return _this;
    }

    _createClass(Container, [{
        key: 'render',
        value: function render() {

            return _runtime.View.render(_container2.default, this);
        }
    }]);

    return Container;
}(_runtime.Widget);

exports.default = Container;

},{"./wml/container.wml":56,"wmljs/lib/runtime":83}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = require('wmljs/lib/runtime');

var _row = require('./wml/row.wml');

var _row2 = _interopRequireDefault(_row);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Row
 */
var Row = function (_Widget) {
    _inherits(Row, _Widget);

    function Row(attrs, children) {
        _classCallCheck(this, Row);

        return _possibleConstructorReturn(this, (Row.__proto__ || Object.getPrototypeOf(Row)).call(this, attrs, children));
    }

    _createClass(Row, [{
        key: 'render',
        value: function render() {

            return _runtime.View.render(_row2.default, this);
        }
    }]);

    return Row;
}(_runtime.Widget);

exports.default = Row;

},{"./wml/row.wml":57,"wmljs/lib/runtime":83}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = require('wmljs/lib/runtime');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Table
 */
var Table = function (_Widget) {
    _inherits(Table, _Widget);

    function Table(attrs, children) {
        _classCallCheck(this, Table);

        var _this = _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this, attrs, children));

        _this.data = attrs.ns.bs.data;
        _this._layout = attrs.ns.bs.layout;
        _this.fields = attrs.ns.bs.fields || [];

        return _this;
    }

    /**
     * rowClicked
     */


    _createClass(Table, [{
        key: 'rowClicked',
        value: function rowClicked(e) {

            if (this.attributes.ns) if (this.attributes.ns.bs.onRowClicked) this.attributes.ns.bs.onRowClicked(e, this);
        }
    }, {
        key: 'render',
        value: function render() {

            if (!this._layout) throw new Error('Table: Layout not specified!');

            return new _runtime.View(this._layout, this).render();
        }
    }]);

    return Table;
}(_runtime.Widget);

exports.default = Table;

},{"wmljs/lib/runtime":83}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = require('wmljs/lib/runtime');

var _propertySeek = require('property-seek');

var _propertySeek2 = _interopRequireDefault(_propertySeek);

var _lodash = require('lodash.throttle');

var _lodash2 = _interopRequireDefault(_lodash);

var _nop = require('nop');

var _nop2 = _interopRequireDefault(_nop);

var _layout = require('./wml/layout.wml');

var _layout2 = _interopRequireDefault(_layout);

var _RestDelegate = require('./RestDelegate');

var _RestDelegate2 = _interopRequireDefault(_RestDelegate);

var _SearchDelegate = require('./SearchDelegate');

var _SearchDelegate2 = _interopRequireDefault(_SearchDelegate);

var _SelectionDelegate = require('./SelectionDelegate');

var _SelectionDelegate2 = _interopRequireDefault(_SelectionDelegate);

var _PopulatedDelegate = require('./PopulatedDelegate');

var _PopulatedDelegate2 = _interopRequireDefault(_PopulatedDelegate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Autocomplete = function (_Widget) {
    _inherits(Autocomplete, _Widget);

    function Autocomplete(attrs, children) {
        _classCallCheck(this, Autocomplete);

        var _this = _possibleConstructorReturn(this, (Autocomplete.__proto__ || Object.getPrototypeOf(Autocomplete)).call(this, attrs, children));

        _this.choice = null;
        _this.view = new _runtime.View(_layout2.default, _this);
        _this.restDelegate = new _RestDelegate2.default(_this);
        _this.searchDelegate = new _SearchDelegate2.default(_this);
        _this.selectionDelegate = new _SelectionDelegate2.default(_this);
        _this.populatedDelegate = new _PopulatedDelegate2.default(_this);
        _this.delegate = null;

        _this.search = (0, _lodash2.default)(function (input) {

            attrs.read('wat:search', _nop2.default)(input.value, _this);
        }, 500);

        return _this;
    }

    _createClass(Autocomplete, [{
        key: 'onRendered',
        value: function onRendered() {

            document.addEventListener('click', this);
        }
    }, {
        key: 'handleEvent',
        value: function handleEvent(e) {

            if (!this.view.findById('root').contains(e.target)) {
                this.toRest();
            }

            if (!document.body.contains(this.view.findById('root'))) document.removeEventListener('click', this);
        }
    }, {
        key: 'handleKeyUp',
        value: function handleKeyUp(e) {

            this.delegate.handleKeyUp(e);
        }
    }, {
        key: 'handleKeyDown',
        value: function handleKeyDown(e) {

            this.delegate.handleKeyDown(e);
        }
    }, {
        key: 'handleInput',
        value: function handleInput(e) {

            //For compatability reasons
            e.target.onkeydown = null;
            this.handleKeyDown(e);
        }

        /**
         * selected is called when an option has been clicked on
         * @param {number} index
         */

    }, {
        key: 'selected',
        value: function selected(index) {

            this.delegate.selected(index);
        }

        /**
         * toRest makes the Autocomplete behave.
         */

    }, {
        key: 'toRest',
        value: function toRest() {

            this.delegate = this.restDelegate;
            this.delegate.render();
        }

        /**
         * toSearch transitions the Autocomplete to the search phase.
         */

    }, {
        key: 'toSearch',
        value: function toSearch() {

            this.delegate = this.searchDelegate;
            this.delegate.render();
        }

        /**
         * toSelection transitions the autocomplete to the selection phase
         */

    }, {
        key: 'toSelection',
        value: function toSelection() {

            this.delegate = this.selectionDelegate;
            this.delegate.render();
        }

        /**
         * toPopulated transitions the autocomplete to a populate state
         * if is initialized with a value
         */

    }, {
        key: 'toPopulated',
        value: function toPopulated() {

            this.delegate = this.populatedDelegate;
            this.delegate.render();
        }

        /**
         * update the options displayed to the user
         * @param {array<object>} items
         */

    }, {
        key: 'update',
        value: function update(items) {

            this.delegate.update(items);
        }

        /**
         * set the value of the input
         * @param {string} value
         * @returns {Autocomplete}
         */

    }, {
        key: 'set',
        value: function set(value) {

            this.view.findById('input').value = value;
            return this;
        }
    }, {
        key: 'render',
        value: function render() {

            var tree = this.view.render();
            this.delegate = this.attributes.read('wat:value') ? this.populatedDelegate : this.restDelegate;
            this.delegate.render();
            return tree;
        }
    }]);

    return Autocomplete;
}(_runtime.Widget);

exports.default = Autocomplete;

},{"./PopulatedDelegate":18,"./RestDelegate":19,"./SearchDelegate":20,"./SelectionDelegate":21,"./wml/layout.wml":22,"lodash.throttle":9,"nop":10,"property-seek":11,"wmljs/lib/runtime":83}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * AutocompleteDelegate
 * @param {Autocomplete} autocomplete
 * @abstract
 */
var AutocompleteDelegate = function () {
  function AutocompleteDelegate(autocomplete) {
    _classCallCheck(this, AutocompleteDelegate);

    this.autocomplete = autocomplete;
  }

  _createClass(AutocompleteDelegate, [{
    key: "handleKeyDown",
    value: function handleKeyDown() {}
  }, {
    key: "handleKeyUp",
    value: function handleKeyUp() {}
  }, {
    key: "update",
    value: function update() {}

    /**
     * selected is called when an option has been clicked on
     * @param {number} index
     */

  }, {
    key: "selected",
    value: function selected(index) {}
  }]);

  return AutocompleteDelegate;
}();

exports.default = AutocompleteDelegate;

},{}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = require('wmljs/lib/runtime');

var _watClasses = require('wat-classes');

var Class = _interopRequireWildcard(_watClasses);

var _AutocompleteDelegate2 = require('./AutocompleteDelegate');

var _AutocompleteDelegate3 = _interopRequireDefault(_AutocompleteDelegate2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * PopulateDelegate for the searching phase.
 */
var PopulateDelegate = function (_AutocompleteDelegate) {
    _inherits(PopulateDelegate, _AutocompleteDelegate);

    function PopulateDelegate() {
        _classCallCheck(this, PopulateDelegate);

        return _possibleConstructorReturn(this, (PopulateDelegate.__proto__ || Object.getPrototypeOf(PopulateDelegate)).apply(this, arguments));
    }

    _createClass(PopulateDelegate, [{
        key: 'handleKeyUp',
        value: function handleKeyUp(e) {

            if (e.keyCode === 27) {
                this.autocomplete.toRest();
                e.target.blur();
            }
        }
    }, {
        key: 'handleKeyDown',
        value: function handleKeyDown(e) {

            if (e.keyCode !== 27) this.autocomplete.toSearch();
        }

        /**
         * selected is called when an option has been clicked on
         * @param {number} index
         */

    }, {
        key: 'selected',
        value: function selected(index) {

            throw new ReferenceError('PopulateDelegate: does not support selecting!');
        }
    }, {
        key: 'render',
        value: function render() {

            var display;
            var value = this.autocomplete.attributes.read('wat:value');
            var label = this.autocomplete.attributes.read('wat:labelField');
            var valueField = this.autocomplete.attributes.read('wat:valueField');

            if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {

                if (label) {
                    value = property(value, label);
                } else if (valueField) {
                    value = property(value, valueField);
                }
            }

            this.autocomplete.set(value);
        }
    }]);

    return PopulateDelegate;
}(_AutocompleteDelegate3.default);

exports.default = PopulateDelegate;

},{"./AutocompleteDelegate":17,"wat-classes":5,"wmljs/lib/runtime":83}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _watClasses = require('wat-classes');

var Class = _interopRequireWildcard(_watClasses);

var _AutocompleteDelegate2 = require('./AutocompleteDelegate');

var _AutocompleteDelegate3 = _interopRequireDefault(_AutocompleteDelegate2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * RestDelegate is used when the autocomplete is not doing anything special.
 * It may have focus but that's it.
 */
var RestDelegate = function (_AutocompleteDelegate) {
    _inherits(RestDelegate, _AutocompleteDelegate);

    function RestDelegate() {
        _classCallCheck(this, RestDelegate);

        return _possibleConstructorReturn(this, (RestDelegate.__proto__ || Object.getPrototypeOf(RestDelegate)).apply(this, arguments));
    }

    _createClass(RestDelegate, [{
        key: 'handleKeyUp',
        value: function handleKeyUp(e) {

            if (e.keyCode === 27) e.target.blur();
        }
    }, {
        key: 'handleKeyDown',
        value: function handleKeyDown(e) {

            if (e.keyCode !== 27) this.autocomplete.toSearch();
        }
    }, {
        key: 'render',
        value: function render() {

            var options = this.autocomplete.view.findById('options');

            while (options.lastChild) {
                options.removeChild(options.lastChild);
            }options.classList.toggle(Class.WAT_VISIBLE);
        }
    }]);

    return RestDelegate;
}(_AutocompleteDelegate3.default);

exports.default = RestDelegate;

},{"./AutocompleteDelegate":17,"wat-classes":5}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = require('wmljs/lib/runtime');

var _beof = require('beof');

var _beof2 = _interopRequireDefault(_beof);

var _watClasses = require('wat-classes');

var Class = _interopRequireWildcard(_watClasses);

var _nop = require('nop');

var _nop2 = _interopRequireDefault(_nop);

var _AutocompleteDelegate2 = require('./AutocompleteDelegate');

var _AutocompleteDelegate3 = _interopRequireDefault(_AutocompleteDelegate2);

var _options = require('./wml/options.wml');

var _options2 = _interopRequireDefault(_options);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * SearchDelegate for the searching phase.
 */
var SearchDelegate = function (_AutocompleteDelegate) {
    _inherits(SearchDelegate, _AutocompleteDelegate);

    function SearchDelegate(auto) {
        _classCallCheck(this, SearchDelegate);

        var _this = _possibleConstructorReturn(this, (SearchDelegate.__proto__ || Object.getPrototypeOf(SearchDelegate)).call(this, auto));

        _this.optionsView = new _runtime.View(_options2.default, _this);
        _this.options = [];

        return _this;
    }

    _createClass(SearchDelegate, [{
        key: 'update',
        value: function update(items) {

            (0, _beof2.default)({ items: items }).optional().array();

            this.options = items;
            this.render();
        }
    }, {
        key: 'handleKeyUp',
        value: function handleKeyUp(e) {

            if (e.keyCode === 27) {
                e.target.blur();
                this.autocomplete.toRest();
            }
        }
    }, {
        key: 'handleKeyDown',
        value: function handleKeyDown(e) {

            //@todo throttle searches?
            if (e.keyCode !== 27) this.autocomplete.search(e.target);
        }

        /**
         * selected is called when an option has been clicked on
         * @param {number} index
         */

    }, {
        key: 'selected',
        value: function selected(index) {

            var choice = this.options[index];
            var display = '';

            this.autocomplete.attributes.read('wat:set', function () {})(this.autocomplete.attributes.read('wat:valueField') ? property(this.options[index], this.autocomplete.attributes.read('wat:valueField')) : this.options[index], this.autocomplete.attributes.read('wat:name'));

            if (this.autocomplete.attributes.read('wat:labelField')) {
                display = property(choice, this.autocomplete.attributes.read('wat:labelField'));
            } else if (this.autocomplete.attributes.read('wat:valueField')) {
                display = property(choice, this.autocomplete.attributes.read('wat:valueField'));
            } else {
                display = choice;
            }

            this.autocomplete.set(display);
            this.autocomplete.choice = choice;
            this.autocomplete.toSelection();
        }
    }, {
        key: 'render',
        value: function render() {

            var options = this.autocomplete.view.findById('options');

            while (options.lastChild) {
                options.removeChild(options.lastChild);
            }options.classList.toggle(Class.WAT_VISIBLE);
            options.appendChild(this.optionsView.render(), this);
        }
    }]);

    return SearchDelegate;
}(_AutocompleteDelegate3.default);

exports.default = SearchDelegate;

},{"./AutocompleteDelegate":17,"./wml/options.wml":23,"beof":8,"nop":10,"wat-classes":5,"wmljs/lib/runtime":83}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = require('wmljs/lib/runtime');

var _watClasses = require('wat-classes');

var Class = _interopRequireWildcard(_watClasses);

var _AutocompleteDelegate2 = require('./AutocompleteDelegate');

var _AutocompleteDelegate3 = _interopRequireDefault(_AutocompleteDelegate2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * SelectionDelegate for the searching phase.
 */
var SelectionDelegate = function (_AutocompleteDelegate) {
    _inherits(SelectionDelegate, _AutocompleteDelegate);

    function SelectionDelegate() {
        _classCallCheck(this, SelectionDelegate);

        return _possibleConstructorReturn(this, (SelectionDelegate.__proto__ || Object.getPrototypeOf(SelectionDelegate)).apply(this, arguments));
    }

    _createClass(SelectionDelegate, [{
        key: 'handleKeyUp',
        value: function handleKeyUp(e) {

            if (e.keyCode === 27) this.autocomplete.toRest();
        }
    }, {
        key: 'handleKeyDown',
        value: function handleKeyDown(e) {

            if (e.keyCode !== 27) this.autocomplete.toSearch();
        }

        /**
         * selected is called when an option has been clicked on
         * @param {number} index
         */

    }, {
        key: 'selected',
        value: function selected(index) {

            throw new ReferenceError('SelectionDelegate: does not support selecting!');
        }
    }, {
        key: 'render',
        value: function render() {

            var options = this.autocomplete.view.findById('options');

            while (options.lastChild) {
                options.removeChild(options.lastChild);
            }options.classList.toggle(Class.WAT_VISIBLE);
        }
    }]);

    return SelectionDelegate;
}(_AutocompleteDelegate3.default);

exports.default = SelectionDelegate;

},{"./AutocompleteDelegate":17,"wat-classes":5,"wmljs/lib/runtime":83}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (make) {
  return make.node('div', { html: { 'class': make.resolve(Class, 'WAT_KIT_AUTOCOMPLETE') } }, [make.node('input', { html: { 'type': "text", 'class': this.attributes.read('wat:inputClass'), 'onkeydown': this.handleKeyDown.bind(this), 'onkeyup': this.handleKeyUp.bind(this), 'oninput': this.handleInput.bind(this), 'placeholder': this.attributes.read('wat:placeholder', 'Type here to search') }, wml: { 'id': "input" } }, []), make.node('div', { html: { 'class': make.resolve(Class, 'WAT_KIT_AUTOCOMPLETE_OPTIONS') }, wml: { 'id': "options" } }, [])]);
};

var _watClasses = require('wat-classes');

var Class = _interopRequireWildcard(_watClasses);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
},{"wat-classes":5}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (make) {
  return make.node('ul', { html: {} }, [make.$for(make.resolve(this, 'options'), function for_2(option, index, array) {
    return [make.node('li', { html: { 'class': make.resolve(Class, 'WAT_KIT_AUTOCOMPLETE_ITEM_WRAPPER'), 'onclick': this.selected.bind(this, index) } }, [make.$if(this.autocomplete.attributes.read('wat:optionTemplate'), function if0() {
      return [make.$if(this.autocomplete.attributes.read('wat:valueField'), function if0() {
        return [this.autocomplete.attributes.read('wat:optionTemplate').apply(this, [make].concat([(0, _propertySeek2.default)(option, this.autocomplete.read('wat:valueField')), index, option]))];
      }.bind(this), function else_clause4() {
        return [this.autocomplete.attributes.read('wat:optionTemplate').apply(this, [make].concat([option, index, make.resolve(this, 'options')]))];
      }.bind(this))];
    }.bind(this), function else_clause5() {
      return [make.$if(this.autocomplete.attributes.read('wat:valueField'), function if0() {
        return [(0, _propertySeek2.default)(option, this.autocomplete.attributes.read('wat:valueField'))];
      }.bind(this), function else_clause6() {
        return [option];
      }.bind(this))];
    }.bind(this))])];
  }.bind(this))]);
};

var _watClasses = require('wat-classes');

var Class = _interopRequireWildcard(_watClasses);

var _propertySeek = require('property-seek');

var _propertySeek2 = _interopRequireDefault(_propertySeek);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
},{"property-seek":11,"wat-classes":5}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = require('wmljs/lib/runtime');

var _item = require('./wml/item.wml');

var _item2 = _interopRequireDefault(_item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * BreadCrumb
 */
var BreadCrumb = function (_Widget) {
    _inherits(BreadCrumb, _Widget);

    function BreadCrumb() {
        _classCallCheck(this, BreadCrumb);

        return _possibleConstructorReturn(this, (BreadCrumb.__proto__ || Object.getPrototypeOf(BreadCrumb)).apply(this, arguments));
    }

    _createClass(BreadCrumb, [{
        key: 'render',
        value: function render() {

            return _runtime.View.render(_item2.default, this);
        }
    }]);

    return BreadCrumb;
}(_runtime.Widget);

exports.default = BreadCrumb;

},{"./wml/item.wml":26,"wmljs/lib/runtime":83}],25:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = require('wmljs/lib/runtime');

var _BreadCrumb = require('./BreadCrumb');

var _BreadCrumb2 = _interopRequireDefault(_BreadCrumb);

var _menu = require('./wml/menu.wml');

var _menu2 = _interopRequireDefault(_menu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * BreadCrumbMenu
 */
var BreadCrumbMenu = function (_Widget) {
    _inherits(BreadCrumbMenu, _Widget);

    function BreadCrumbMenu(attrs, children) {
        _classCallCheck(this, BreadCrumbMenu);

        var _this = _possibleConstructorReturn(this, (BreadCrumbMenu.__proto__ || Object.getPrototypeOf(BreadCrumbMenu)).call(this, attrs, children));

        _this.view = new _runtime.View(_menu2.default, _this);

        return _this;
    }

    _createClass(BreadCrumbMenu, [{
        key: 'render',
        value: function render() {

            return this.view.render();
        }
    }]);

    return BreadCrumbMenu;
}(_runtime.Widget);

exports.default = BreadCrumbMenu;

},{"./BreadCrumb":24,"./wml/menu.wml":27,"wmljs/lib/runtime":83}],26:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (make) {
  return make.node('li', { html: {} }, [make.$if(this.attributes.read('wat:active', false), function if0() {
    return [make.resolve(this, 'children')];
  }.bind(this), function else_clause0() {
    return [make.node('a', { html: { 'href': this.attributes.read('wat:href', '#') } }, [make.resolve(this, 'children')])];
  }.bind(this))]);
};
},{}],27:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (make) {
  return make.node('ol', { html: { 'class': "breadcrumb" } }, [make.resolve(this, 'children')]);
};
},{}],28:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = require('wmljs/lib/runtime');

var _button = require('./wml/button.wml');

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Button a bootstrap styled button.
 */
var Button = function (_Widget) {
    _inherits(Button, _Widget);

    function Button(attrs, children) {
        _classCallCheck(this, Button);

        var _this = _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this, attrs, children));

        _this.view = new _runtime.View(_button2.default, _this);

        return _this;
    }

    _createClass(Button, [{
        key: 'getClass',
        value: function getClass() {

            var variant = this.attributes.read('wat:variant', 'default');
            var cls = this.attributes.read('wat:class', '');
            return ('btn btn-' + variant + ' ' + cls).trim();
        }
    }, {
        key: 'clicked',
        value: function clicked(e) {

            this.attributes.read('wat:onClick', function () {})(e.target.name, this, e);
        }

        /**
         * disable this button.
         */

    }, {
        key: 'disable',
        value: function disable() {

            this.view.findById('button').setAttribute('disabled', 'disabled');
        }

        /**
         * enable this button.
         */

    }, {
        key: 'enable',
        value: function enable() {

            this.view.findById('button').removeAttribute('disabled');
        }
    }, {
        key: 'onRendered',
        value: function onRendered() {

            if (this.attributes.read('wat:disabled')) this.view.findById('button').setAttribute('disabled', 'disabled');
        }
    }, {
        key: 'render',
        value: function render() {

            return this.view.render();
        }
    }]);

    return Button;
}(_runtime.Widget);

exports.default = Button;

},{"./wml/button.wml":29,"wmljs/lib/runtime":83}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (make) {
  return make.node('fragment', { html: {} }, [make.$if(this.attributes.read('wat:href'), function if0() {
    return [make.node('a', { html: { 'href': this.attributes.read('wat:href'), 'onclick': this.clicked.bind(this) }, wml: { 'id': "button" } }, [this.attributes.read('wat:text'), make.resolve(this, 'children')])];
  }.bind(this), function else_clause1() {
    return [make.node('button', { html: { 'name': this.attributes.read('wat:name'), 'class': this.getClass(), 'onclick': this.clicked.bind(this) }, wml: { 'id': "button" } }, [this.attributes.read('wat:text'), make.resolve(this, 'children')])];
  }.bind(this))]);
};
},{}],30:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = require('wmljs/lib/runtime');

var _card = require('./wml/card.wml');

var _card2 = _interopRequireDefault(_card);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Card
 */
var Card = function (_Widget) {
    _inherits(Card, _Widget);

    function Card() {
        _classCallCheck(this, Card);

        return _possibleConstructorReturn(this, (Card.__proto__ || Object.getPrototypeOf(Card)).apply(this, arguments));
    }

    _createClass(Card, [{
        key: 'render',
        value: function render() {

            return _runtime.View.render(_card2.default, this);
        }
    }]);

    return Card;
}(_runtime.Widget);

exports.default = Card;

},{"./wml/card.wml":33,"wmljs/lib/runtime":83}],31:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = require('wmljs/lib/runtime');

var _card_block = require('./wml/card_block.wml');

var _card_block2 = _interopRequireDefault(_card_block);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * CardBlock
 */
var CardBlock = function (_Widget) {
    _inherits(CardBlock, _Widget);

    function CardBlock() {
        _classCallCheck(this, CardBlock);

        return _possibleConstructorReturn(this, (CardBlock.__proto__ || Object.getPrototypeOf(CardBlock)).apply(this, arguments));
    }

    _createClass(CardBlock, [{
        key: 'render',
        value: function render() {

            return _runtime.View.render(_card_block2.default, this);
        }
    }]);

    return CardBlock;
}(_runtime.Widget);

exports.default = CardBlock;

},{"./wml/card_block.wml":34,"wmljs/lib/runtime":83}],32:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = require('wmljs/lib/runtime');

var _card_image = require('./wml/card_image.wml');

var _card_image2 = _interopRequireDefault(_card_image);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * CardImage
 */
var CardImage = function (_Widget) {
    _inherits(CardImage, _Widget);

    function CardImage() {
        _classCallCheck(this, CardImage);

        return _possibleConstructorReturn(this, (CardImage.__proto__ || Object.getPrototypeOf(CardImage)).apply(this, arguments));
    }

    _createClass(CardImage, [{
        key: 'render',
        value: function render() {

            return _runtime.View.render(_card_image2.default, this);
        }
    }]);

    return CardImage;
}(_runtime.Widget);

exports.default = CardImage;

},{"./wml/card_image.wml":35,"wmljs/lib/runtime":83}],33:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (make) {
  return make.node('div', { html: { 'class': "card" } }, [this.attributes.read('wat:children'), make.resolve(this, 'children')]);
};
},{}],34:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (make) {
  return make.node('div', { html: { 'class': "card-block" } }, [this.attributes.read('wat:children'), make.resolve(this, 'children')]);
};
},{}],35:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (make) {
  return make.node('img', { html: { 'src': this.attributes.read('wat:src'), 'alt': this.attributes.read('wat:alt') } }, []);
};
},{}],36:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardBlock = exports.CardImage = exports.Card = exports.Well = exports.Jumbotron = exports.Switch = exports.Select = exports.Input = exports.Autocomplete = exports.Table = exports.Row = exports.Column = exports.Container = exports.ModalFooter = exports.ModalBody = exports.ModalHeader = exports.Modal = exports.Button = exports.BreadCrumb = exports.BreadCrumbMenu = undefined;

var _BreadCrumbMenu2 = require('./breadcrumbs/BreadCrumbMenu');

var _BreadCrumbMenu3 = _interopRequireDefault(_BreadCrumbMenu2);

var _BreadCrumb2 = require('./breadcrumbs/BreadCrumb');

var _BreadCrumb3 = _interopRequireDefault(_BreadCrumb2);

var _Button2 = require('./button/Button');

var _Button3 = _interopRequireDefault(_Button2);

var _Modal2 = require('./modal/Modal');

var _Modal3 = _interopRequireDefault(_Modal2);

var _ModalHeader2 = require('./modal/ModalHeader');

var _ModalHeader3 = _interopRequireDefault(_ModalHeader2);

var _ModalBody2 = require('./modal/ModalBody');

var _ModalBody3 = _interopRequireDefault(_ModalBody2);

var _ModalFooter2 = require('./modal/ModalFooter');

var _ModalFooter3 = _interopRequireDefault(_ModalFooter2);

var _Container2 = require('./Container');

var _Container3 = _interopRequireDefault(_Container2);

var _Column2 = require('./Column');

var _Column3 = _interopRequireDefault(_Column2);

var _Row2 = require('./Row');

var _Row3 = _interopRequireDefault(_Row2);

var _Table2 = require('./Table');

var _Table3 = _interopRequireDefault(_Table2);

var _Autocomplete2 = require('./autocomplete/Autocomplete');

var _Autocomplete3 = _interopRequireDefault(_Autocomplete2);

var _Input2 = require('./input/Input');

var _Input3 = _interopRequireDefault(_Input2);

var _Select2 = require('./select/Select');

var _Select3 = _interopRequireDefault(_Select2);

var _Switch2 = require('./switch/Switch');

var _Switch3 = _interopRequireDefault(_Switch2);

var _Jumbotron2 = require('./jumbotron/Jumbotron');

var _Jumbotron3 = _interopRequireDefault(_Jumbotron2);

var _Well2 = require('./well/Well');

var _Well3 = _interopRequireDefault(_Well2);

var _Card2 = require('./card/Card');

var _Card3 = _interopRequireDefault(_Card2);

var _CardImage2 = require('./card/CardImage');

var _CardImage3 = _interopRequireDefault(_CardImage2);

var _CardBlock2 = require('./card/CardBlock');

var _CardBlock3 = _interopRequireDefault(_CardBlock2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.BreadCrumbMenu = _BreadCrumbMenu3.default; /* jshint ignore:start */

exports.BreadCrumb = _BreadCrumb3.default;
exports.Button = _Button3.default;
exports.Modal = _Modal3.default;
exports.ModalHeader = _ModalHeader3.default;
exports.ModalBody = _ModalBody3.default;
exports.ModalFooter = _ModalFooter3.default;
exports.Container = _Container3.default;
exports.Column = _Column3.default;
exports.Row = _Row3.default;
exports.Table = _Table3.default;
exports.Autocomplete = _Autocomplete3.default;
exports.Input = _Input3.default;
exports.Select = _Select3.default;
exports.Switch = _Switch3.default;
exports.Jumbotron = _Jumbotron3.default;
exports.Well = _Well3.default;
exports.Card = _Card3.default;
exports.CardImage = _CardImage3.default;
exports.CardBlock = _CardBlock3.default;
/* jshint ignore:end */

},{"./Column":12,"./Container":13,"./Row":14,"./Table":15,"./autocomplete/Autocomplete":16,"./breadcrumbs/BreadCrumb":24,"./breadcrumbs/BreadCrumbMenu":25,"./button/Button":28,"./card/Card":30,"./card/CardBlock":31,"./card/CardImage":32,"./input/Input":37,"./jumbotron/Jumbotron":39,"./modal/Modal":41,"./modal/ModalBody":42,"./modal/ModalFooter":43,"./modal/ModalHeader":44,"./select/Select":49,"./switch/Switch":51,"./well/Well":53}],37:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = require('wmljs/lib/runtime');

var _layout = require('./wml/layout.wml');

var _layout2 = _interopRequireDefault(_layout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var INPUT_SUCCESS = 'has-succes';
var INPUT_ERROR = 'has-error';
var INPUT_WARNING = 'has-warning';

/**
 * Input
 */

var Input = function (_Widget) {
    _inherits(Input, _Widget);

    function Input(attrs, children) {
        _classCallCheck(this, Input);

        var _this = _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this, attrs, children));

        _this.view = new _runtime.View(_layout2.default, _this);

        return _this;
    }

    /**
     * getClass
     */


    _createClass(Input, [{
        key: 'getClass',
        value: function getClass() {

            var c = 'form-group ' + this.attributes.read('wat:class');

            if (!this.attributes.read('wat:message')) return c;

            return c + ' has-error';
        }
    }, {
        key: 'input',
        value: function input(e) {

            var set = this.attributes.read('wat:set', function () {});

            this.reset();
            set(e.target.name, e.target.value, this);
        }

        /**
         * setMessage sets the message for the message portion of
         * this input.
         * @param {string} msg
         */

    }, {
        key: 'setMessage',
        value: function setMessage() {
            var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';


            var message = this.view.findById('message');
            var node = document.createTextNode(msg);

            if (message.firstChild) {
                message.replaceChild(message.firstChild, node);
            } else {
                message.appendChild(node);
            }
        }

        /**
         * isFilled tells if this Input has a filled value.
         * @returns {boolean}
         */

    }, {
        key: 'isFilled',
        value: function isFilled() {

            return this.view.findById('input').value;
        }

        /**
         * isRequired tells if the Input was required.
         * @returns {boolean}
         */

    }, {
        key: 'isRequired',
        value: function isRequired() {

            if (this.attributes.read('wat:required')) return true;
        }

        /**
         * isValid queries whether the Input has been invalidated
         * or not.
         * @returns {boolean}
         */

    }, {
        key: 'isValid',
        value: function isValid() {

            return this.view.findById('root').className.split(' ').indexOf(INPUT_ERROR) === -1;
        }

        /**
         * invalidate this Input with an optional message.
         * @param {string} message
         * @returns {Input}
         */

    }, {
        key: 'invalidate',
        value: function invalidate() {
            var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';


            if (message) this.setMessage(message);

            this.view.findById('root').classList.remove(INPUT_ERROR);
            this.view.findById('root').classList.add(INPUT_ERROR);
        }

        /**
         * validate this input with an optional messsage.
         * @param {string} message
         * @returns {Input}
         */

    }, {
        key: 'validate',
        value: function validate() {
            var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';


            if (message) this.setMessage(message);

            this.view.findById('root').classList.remove(INPUT_SUCCESS);
            this.view.findById('root').classList.add(INPUT_SUCCESS);
        }

        /**
         * warn this input with an optional message.
         * @param {string} message
         * @returns {Input}
         */

    }, {
        key: 'warn',
        value: function warn() {
            var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';


            if (message) this.setMessage(message);

            this.view.findById('root').classList.remove(INPUT_WARNING);
            this.view.findById('root').classList.add(INPUT_WARNING);
        }

        /**
         * reset this input to a clean state.
         * Removes messages, validation state etc.
         * @return {Input}
         */

    }, {
        key: 'reset',
        value: function reset() {

            var root = this.view.findById('root');

            root.classList.remove(INPUT_SUCCESS);
            root.classList.remove(INPUT_ERROR);
            root.classList.remove(INPUT_WARNING);

            this.view.findById('message').innerHTML = '';
        }
    }, {
        key: 'render',
        value: function render() {

            return this.view.render();
        }
    }]);

    return Input;
}(_runtime.Widget);

exports.default = Input;

},{"./wml/layout.wml":38,"wmljs/lib/runtime":83}],38:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (make) {
  return make.node('div', { html: { 'class': this.getClass() } }, [make.node('label', { html: { 'for': this.attributes.read('wat:id'), 'class': "control-label" } }, [this.attributes.read('wat:label')]), make.$if(this.attributes.read('wat:type', 'text') !== 'textarea', function if0() {
    return [make.node('input', { html: { 'id': this.attributes.read('wat:id'), 'name': this.attributes.read('wat:name'), 'type': this.attributes.read('wat:type', 'text'), 'oninput': this.attributes.read('wat:input'), 'value': this.attributes.read('wat:value'), 'class': "form-control" }, wml: { 'id': "input" } }, [])];
  }.bind(this), function else_clause2() {
    return [make.node('textarea', { html: { 'id': this.attributes.read('wat:id'), 'class': "form-control", 'name': this.attributes.read('wat:name'), 'type': this.attributes.read('wat:type', 'text'), 'oninput': this.input.bind(this), 'value': this.attributes.read('wat:value'), 'rows': this.attributes.read('wat:rows') } }, [])];
  }.bind(this)), make.node('span', { html: { 'class': "help-block" }, wml: { 'id': "message" } }, [this.attributes.read('message', '')])]);
};
},{}],39:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = require('wmljs/lib/runtime');

var _layout = require('./wml/layout.wml');

var _layout2 = _interopRequireDefault(_layout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Jumbotron
 */
var Jumbotron = function (_Widget) {
    _inherits(Jumbotron, _Widget);

    function Jumbotron() {
        _classCallCheck(this, Jumbotron);

        return _possibleConstructorReturn(this, (Jumbotron.__proto__ || Object.getPrototypeOf(Jumbotron)).apply(this, arguments));
    }

    _createClass(Jumbotron, [{
        key: 'render',
        value: function render() {

            return _runtime.View.render(_layout2.default, this);
        }
    }]);

    return Jumbotron;
}(_runtime.Widget);

exports.default = Jumbotron;

},{"./wml/layout.wml":40,"wmljs/lib/runtime":83}],40:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (make) {
  return make.node('div', { html: { 'class': "jumbotron" } }, [make.resolve(this, 'children')]);
};
},{}],41:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = require('wmljs/lib/runtime');

var _modal = require('./wml/modal.wml');

var _modal2 = _interopRequireDefault(_modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Modal
 * NOTE: Using this requires jQuery and boostrap plugin.
 */
var Modal = function (_Widget) {
    _inherits(Modal, _Widget);

    function Modal(attrs, children) {
        _classCallCheck(this, Modal);

        var _this = _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this, attrs, children));

        _this.view = new _runtime.View(_modal2.default, _this);
        _this.modal = null;

        return _this;
    }

    /**
     * put content on to this modal.
     * @param {Renderable} r
     */


    _createClass(Modal, [{
        key: 'put',
        value: function put(r) {

            var root = this.view.findById('root');

            while (root.lastChild) {
                root.removeChild(root.lastChild);
            }root.appendChild(r.render());

            this.modal.modal(this.attributes.read('wat:options', {
                backdrop: false,
                keyboard: true,
                fade: true,
                show: true
            }));
        }
    }, {
        key: 'render',
        value: function render() {

            var ret = this.view.render();

            this.modal = jQuery(ret);
            return ret;
        }
    }]);

    return Modal;
}(_runtime.Widget);

exports.default = Modal;

},{"./wml/modal.wml":45,"wmljs/lib/runtime":83}],42:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = require('wmljs/lib/runtime');

var _modal_body = require('./wml/modal_body.wml');

var _modal_body2 = _interopRequireDefault(_modal_body);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * ModalBody
 */
var ModalBody = function (_Widget) {
    _inherits(ModalBody, _Widget);

    function ModalBody() {
        _classCallCheck(this, ModalBody);

        return _possibleConstructorReturn(this, (ModalBody.__proto__ || Object.getPrototypeOf(ModalBody)).apply(this, arguments));
    }

    _createClass(ModalBody, [{
        key: 'render',
        value: function render() {

            return new _runtime.View(_modal_body2.default, this).render();
        }
    }]);

    return ModalBody;
}(_runtime.Widget);

exports.default = ModalBody;

},{"./wml/modal_body.wml":46,"wmljs/lib/runtime":83}],43:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = require('wmljs/lib/runtime');

var _modal_footer = require('./wml/modal_footer.wml');

var _modal_footer2 = _interopRequireDefault(_modal_footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * ModalFooter
 */
var ModalFooter = function (_Widget) {
    _inherits(ModalFooter, _Widget);

    function ModalFooter() {
        _classCallCheck(this, ModalFooter);

        return _possibleConstructorReturn(this, (ModalFooter.__proto__ || Object.getPrototypeOf(ModalFooter)).apply(this, arguments));
    }

    _createClass(ModalFooter, [{
        key: 'render',
        value: function render() {

            return new _runtime.View(_modal_footer2.default, this).render();
        }
    }]);

    return ModalFooter;
}(_runtime.Widget);

exports.default = ModalFooter;

},{"./wml/modal_footer.wml":47,"wmljs/lib/runtime":83}],44:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = require('wmljs/lib/runtime');

var _modal_header = require('./wml/modal_header.wml');

var _modal_header2 = _interopRequireDefault(_modal_header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * ModalHeader
 */
var ModalHeader = function (_Widget) {
    _inherits(ModalHeader, _Widget);

    function ModalHeader() {
        _classCallCheck(this, ModalHeader);

        return _possibleConstructorReturn(this, (ModalHeader.__proto__ || Object.getPrototypeOf(ModalHeader)).apply(this, arguments));
    }

    _createClass(ModalHeader, [{
        key: 'render',
        value: function render() {

            return new _runtime.View(_modal_header2.default, this).render();
        }
    }]);

    return ModalHeader;
}(_runtime.Widget);

exports.default = ModalHeader;

},{"./wml/modal_header.wml":48,"wmljs/lib/runtime":83}],45:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (make) {
  return make.node('div', { html: { 'class': this.attributes.read('wat:class', 'modal fade'), 'tabindex': "-1", 'role': "dialog" } }, [make.node('div', { html: { 'class': 'modal-dialog ' + this.attributes.read('wat:sizeClass', 'modal-md'), 'role': "document" } }, [make.node('div', { html: { 'class': "modal-content" }, wml: { 'id': "root" } }, [make.resolve(this, 'children')])])]);
};
},{}],46:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (make) {
  return make.node('div', { html: { 'class': "modal-body" } }, [make.resolve(this, 'children')]);
};
},{}],47:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (make) {
  return make.node('div', { html: { 'class': "modal-footer" } }, [make.resolve(this, 'children')]);
};
},{}],48:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (make) {
  return make.node('div', { html: { 'class': "modal-header" } }, [make.node('button', { html: { 'type': "button", 'class': "close", 'data-dismiss': "modal", 'aria-label': "Close" } }, [make.node('span', { html: { 'aria-hidden': "true" } }, [make.text('×')])]), make.resolve(this, 'children')]);
};
},{}],49:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _runtime = require('wmljs/lib/runtime');

var _Input2 = require('../input/Input');

var _Input3 = _interopRequireDefault(_Input2);

var _layout = require('./wml/layout.wml');

var _layout2 = _interopRequireDefault(_layout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Select = function (_Input) {
    _inherits(Select, _Input);

    function Select(attrs, children) {
        _classCallCheck(this, Select);

        var _this = _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, attrs, children));

        _this.view = new _runtime.View(_layout2.default, _this);

        return _this;
    }

    return Select;
}(_Input3.default);

exports.default = Select;

},{"../input/Input":37,"./wml/layout.wml":50,"wmljs/lib/runtime":83}],50:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (make) {
  return make.node('div', { html: { 'class': this.getClass() } }, [make.node('label', { html: { 'for': this.attributes.read('wat:id'), 'class': "control-label" } }, [this.attributes.read('wat:label')]), make.node('select', { html: _defineProperty({ 'name': this.attributes.read('wat:name'), 'class': "form-control", 'onchange': this.attributes.read('wat:onChange'), 'value': this.attributes.read('wat:value') }, 'class', "form-control"), wml: { 'id': "input" } }, [make.$for(this.attributes.read('wat:options', []), function for_1(opt, index, array) {
    return [make.$if(typeof opt === 'string', function if0() {
      return [make.node('option', { html: {} }, [opt])];
    }.bind(this), function else_clause3() {
      return [make.node('option', { html: { 'value': make.resolve(opt, 'value') } }, [make.resolve(opt, 'label')])];
    }.bind(this))];
  }.bind(this)), make.resolve(this, 'children')]), make.node('span', { html: { 'class': "help-block" }, wml: { 'id': "message" } }, [this.attributes.read('message', '')])]);
};

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
},{}],51:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = require('wmljs/lib/runtime');

var _layout = require('./wml/layout.wml');

var _layout2 = _interopRequireDefault(_layout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Switch
 */
var Switch = function (_Widget) {
    _inherits(Switch, _Widget);

    function Switch(attrs, children) {
        _classCallCheck(this, Switch);

        var _this = _possibleConstructorReturn(this, (Switch.__proto__ || Object.getPrototypeOf(Switch)).call(this, attrs, children));

        _this.view = new _runtime.View(_layout2.default, _this);

        return _this;
    }

    _createClass(Switch, [{
        key: 'changed',
        value: function changed(e) {

            console.log(e);
        }
    }, {
        key: 'calculateValue',
        value: function calculateValue() {

            var onValue = this.attributes.read('wat:onValue');

            if (onValue === undefined || onValue === null) return this.attributes.read('wat:value');

            if (this.attributes.read('wat:value') === onValue) return true;
        }
    }, {
        key: 'render',
        value: function render() {

            return this.view.render();
        }
    }]);

    return Switch;
}(_runtime.Widget);

exports.default = Switch;

},{"./wml/layout.wml":52,"wmljs/lib/runtime":83}],52:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (make) {
  return make.node('label', { html: { 'class': make.resolve(Class, 'WAT_COMPONENTS_SWITCH') } }, [make.node('input', { html: { 'type': "checkbox", 'name': this.attributes.read('wat:name'), 'value': this.calculateValue(), 'onchange': this.changed.bind(this) } }, []), make.node('div', { html: { 'class': make.resolve(Class, 'WAT_COMPONENTS_SWITCH_SLIDER') } }, [])]);
};

var _watClasses = require('wat-classes');

var Class = _interopRequireWildcard(_watClasses);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
},{"wat-classes":5}],53:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = require('wmljs/lib/runtime');

var _layout = require('./wml/layout.wml');

var _layout2 = _interopRequireDefault(_layout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Well
 */
var Well = function (_Widget) {
    _inherits(Well, _Widget);

    function Well() {
        _classCallCheck(this, Well);

        return _possibleConstructorReturn(this, (Well.__proto__ || Object.getPrototypeOf(Well)).apply(this, arguments));
    }

    _createClass(Well, [{
        key: 'render',
        value: function render() {

            return _runtime.View.render(_layout2.default, this);
        }
    }]);

    return Well;
}(_runtime.Widget);

exports.default = Well;

},{"./wml/layout.wml":54,"wmljs/lib/runtime":83}],54:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (make) {
  return make.node('div', { html: { 'class': "well" } }, [make.resolve(this, 'children')]);
};
},{}],55:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (make) {
  return make.node('div', { html: { 'class': make.resolve(this, 'className') } }, [make.resolve(this, 'children')]);
};
},{}],56:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (make) {
  return make.node('section', { html: { 'class': make.resolve(this, 'className') } }, [make.resolve(this, 'children')]);
};
},{}],57:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (make) {
  return make.node('div', { html: { 'class': "row" } }, [make.resolve(this, 'children')]);
};
},{}],58:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = require('wmljs/lib/runtime');

var _account_area = require('./wml/account_area.wml');

var _account_area2 = _interopRequireDefault(_account_area);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * AccountArea
 */
var AccountArea = function (_Widget) {
    _inherits(AccountArea, _Widget);

    function AccountArea() {
        _classCallCheck(this, AccountArea);

        return _possibleConstructorReturn(this, (AccountArea.__proto__ || Object.getPrototypeOf(AccountArea)).apply(this, arguments));
    }

    _createClass(AccountArea, [{
        key: 'toggle',
        value: function toggle() {}
    }, {
        key: 'render',
        value: function render() {

            return _runtime.View.render(_account_area2.default, this);
        }
    }]);

    return AccountArea;
}(_runtime.Widget);

exports.default = AccountArea;

},{"./wml/account_area.wml":59,"wmljs/lib/runtime":83}],59:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (make) {
  return make.node('div', { html: { 'class': make.resolve(Class, 'LAYOUT_ACCOUNT_AREA') }, wml: { 'id': "root" } }, [make.node('button', { html: { 'onclick': this.toggle.bind(this) } }, [make.node('span', { html: { 'class': make.resolve(Class, 'LAYOUT_ACCOUNT_AREA_TITLE') } }, [this.attributes.read('wat:title')])]), make.resolve(this, 'children')]);
};

var _watClasses = require('wat-classes');

var Class = _interopRequireWildcard(_watClasses);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
},{"wat-classes":5}],60:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = require('wmljs/lib/runtime');

var _action_area = require('./wml/action_area.wml');

var _action_area2 = _interopRequireDefault(_action_area);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * ActionArea
 */
var ActionArea = function (_Widget) {
    _inherits(ActionArea, _Widget);

    function ActionArea(attrs, children) {
        _classCallCheck(this, ActionArea);

        var _this = _possibleConstructorReturn(this, (ActionArea.__proto__ || Object.getPrototypeOf(ActionArea)).call(this, attrs, children));

        _this.view = new _runtime.View(_action_area2.default, _this);

        return _this;
    }

    /**
     * setContent replaces the content of this view.
     * @param {Renderable} r
     */


    _createClass(ActionArea, [{
        key: 'setContent',
        value: function setContent(r) {

            var content = this.view.findById('content');

            while (content.lastChild) {
                content.removeChild(content.lastChild);
            }content.appendChild(r.render());
        }
    }, {
        key: 'noop',
        value: function noop() {}
    }, {
        key: 'render',
        value: function render() {

            return this.view.render();
        }
    }]);

    return ActionArea;
}(_runtime.Widget);

exports.default = ActionArea;

},{"./wml/action_area.wml":61,"wmljs/lib/runtime":83}],61:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (make) {
  return make.node('div', { html: { 'class': make.resolve(Class, 'LAYOUT_ACTION_AREA') } }, [make.widget(_MenuButton2.default, { html: {}, wat: { 'onClick': this.attributes.read('wat:onMenuButtonClicked', make.resolve(this, 'noop')) } }, []), make.node('div', { html: { 'class': make.resolve(Class, 'LAYOUT_ACTION_AREA_CONTENT') }, wml: { 'id': "content" } }, [make.resolve(this, 'children')])]);
};

var _MenuButton = require("../../menu-button/MenuButton");

var _MenuButton2 = _interopRequireDefault(_MenuButton);

var _watClasses = require("wat-classes");

var Class = _interopRequireWildcard(_watClasses);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"../../menu-button/MenuButton":75,"wat-classes":5}],62:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = require('wmljs/lib/runtime');

var _container = require('./wml/container.wml');

var _container2 = _interopRequireDefault(_container);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * LayoutContainer provides the widget that wraps all the content together (Drawer and content area).
 */
var LayoutContainer = function (_Widget) {
    _inherits(LayoutContainer, _Widget);

    function LayoutContainer() {
        _classCallCheck(this, LayoutContainer);

        return _possibleConstructorReturn(this, (LayoutContainer.__proto__ || Object.getPrototypeOf(LayoutContainer)).apply(this, arguments));
    }

    _createClass(LayoutContainer, [{
        key: 'render',
        value: function render() {

            return _runtime.View.render(_container2.default, this);
        }
    }]);

    return LayoutContainer;
}(_runtime.Widget);

exports.default = LayoutContainer;

},{"./wml/container.wml":63,"wmljs/lib/runtime":83}],63:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (make) {
  return make.node('div', { html: { 'class': make.resolve(Class, 'LAYOUT_CONTAINER') } }, [make.resolve(this, 'children')]);
};

var _watClasses = require('wat-classes');

var Class = _interopRequireWildcard(_watClasses);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
},{"wat-classes":5}],64:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = require('wmljs/lib/runtime');

var _drawer = require('./wml/drawer.wml');

var _drawer2 = _interopRequireDefault(_drawer);

var _watClasses = require('wat-classes');

var Class = _interopRequireWildcard(_watClasses);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Drawer
 */
var Drawer = function (_Widget) {
    _inherits(Drawer, _Widget);

    function Drawer(attrs, children) {
        _classCallCheck(this, Drawer);

        var _this = _possibleConstructorReturn(this, (Drawer.__proto__ || Object.getPrototypeOf(Drawer)).call(this, attrs, children));

        _this.view = new _runtime.View(_drawer2.default, _this);

        return _this;
    }

    /**
     * toggle the visibility of this Drawer
     */


    _createClass(Drawer, [{
        key: 'toggle',
        value: function toggle() {

            this.view.findById('drawer').classList.toggle(Class.VISIBLE);
        }
    }, {
        key: 'render',
        value: function render() {

            return this.view.render();
        }
    }]);

    return Drawer;
}(_runtime.Widget);

exports.default = Drawer;

},{"./wml/drawer.wml":67,"wat-classes":5,"wmljs/lib/runtime":83}],65:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = require('wmljs/lib/runtime');

var _watClasses = require('wat-classes');

var Class = _interopRequireWildcard(_watClasses);

var _drawer_link = require('./wml/drawer_link.wml');

var _drawer_link2 = _interopRequireDefault(_drawer_link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * DrawerLink
 */
var DrawerLink = function (_Widget) {
    _inherits(DrawerLink, _Widget);

    function DrawerLink(attrs, children) {
        _classCallCheck(this, DrawerLink);

        var _this = _possibleConstructorReturn(this, (DrawerLink.__proto__ || Object.getPrototypeOf(DrawerLink)).call(this, attrs, children));

        _this.href = attrs.read('wat:href');
        _this.view = new _runtime.View(_drawer_link2.default, _this);

        return _this;
    }

    /**
     * add the active state of this DrawerLink
     */


    _createClass(DrawerLink, [{
        key: 'activate',
        value: function activate() {

            var a = this.view.findById('a');
            var children = this.view.findById('a').parentNode.children;

            a.classList.remove(Class.ACTIVE);
            a.classList.add(Class.ACTIVE);

            for (var i = 0; i < children.length; i++) {
                if (children[i].nodeName === 'A') if (children[i] !== a) children[i].classList.remove(Class.ACTIVE);
            }
        }

        /**
         * deactivate this DrawerLink
         */

    }, {
        key: 'deactivate',
        value: function deactivate() {

            this.view.findById('a').classList.remove(Class.ACTIVE);
        }
    }, {
        key: 'clicked',
        value: function clicked() {

            this.activate();
            this.attributes.read('wat:onClick', function () {})(this);
        }
    }, {
        key: 'render',
        value: function render() {

            return this.view.render();
        }
    }]);

    return DrawerLink;
}(_runtime.Widget);

exports.default = DrawerLink;

},{"./wml/drawer_link.wml":68,"wat-classes":5,"wmljs/lib/runtime":83}],66:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = require('wmljs/lib/runtime');

var _drawer_navigation = require('./wml/drawer_navigation.wml');

var _drawer_navigation2 = _interopRequireDefault(_drawer_navigation);

var _watClasses = require('wat-classes');

var Class = _interopRequireWildcard(_watClasses);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * DrawerNavigation
 */
var DrawerNavigation = function (_Widget) {
    _inherits(DrawerNavigation, _Widget);

    function DrawerNavigation(attrs, children) {
        _classCallCheck(this, DrawerNavigation);

        var _this = _possibleConstructorReturn(this, (DrawerNavigation.__proto__ || Object.getPrototypeOf(DrawerNavigation)).call(this, attrs, children));

        _this.view = new _runtime.View(_drawer_navigation2.default, _this);

        return _this;
    }

    _createClass(DrawerNavigation, [{
        key: 'handleEvent',
        value: function handleEvent(e) {

            this.children.forEach(function (child) {

                if (child !== e.target) child.classList.remove(Class.ACTIVE);
            });
        }
    }, {
        key: 'onRendered',
        value: function onRendered() {
            var _this2 = this;

            this.children.forEach(function (child) {

                child.addEventListener('click', _this2);
            });
        }
    }, {
        key: 'render',
        value: function render() {

            return this.view.render();
        }
    }]);

    return DrawerNavigation;
}(_runtime.Widget);

exports.default = DrawerNavigation;

},{"./wml/drawer_navigation.wml":69,"wat-classes":5,"wmljs/lib/runtime":83}],67:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (make) {
  return make.node('div', { html: { 'class': make.resolve(Class, 'LAYOUT_DRAWER') }, wml: { 'id': "drawer" } }, [make.node('div', { html: { 'class': make.resolve(Class, 'LAYOUT_DRAWER_CONTENT') } }, [make.resolve(this, 'children')])]);
};

var _watClasses = require('wat-classes');

var Class = _interopRequireWildcard(_watClasses);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
},{"wat-classes":5}],68:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (make) {
  return make.node('a', { html: { 'class': this.attributes.read('wat:active', false) ? make.resolve(Class, 'ACTIVE') : '', 'href': this.attributes.read('wat:href'), 'onclick': this.clicked.bind(this) }, wml: { 'id': "a" } }, [make.$if(this.attributes.read('wat:icon-class', false), function if0() {
    return [make.node('i', { html: { 'class': make.resolve(Class, 'LAYOUT_DRAWER_LINK_ICON') + this.attributes.read('wat:icon-class') } }, [])];
  }.bind(this), make.noop), this.attributes.read('wat:title'), make.resolve(this, 'children')]);
};

var _watClasses = require('wat-classes');

var Class = _interopRequireWildcard(_watClasses);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
},{"wat-classes":5}],69:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (make) {
  return make.node('nav', { html: { 'class': make.resolve(Class, 'LAYOUT_DRAWER_NAVIGATION') }, wml: { 'id': "nav" } }, [make.resolve(this, 'children')]);
};

var _watClasses = require('wat-classes');

var Class = _interopRequireWildcard(_watClasses);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
},{"wat-classes":5}],70:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Notification = exports.AccountArea = exports.LogoImage = exports.MenuButton = exports.ActionArea = exports.Main = exports.DrawerLink = exports.DrawerNavigation = exports.Drawer = exports.LayoutContainer = undefined;

var _LayoutContainer2 = require('./container/LayoutContainer');

var _LayoutContainer3 = _interopRequireDefault(_LayoutContainer2);

var _Drawer2 = require('./drawer/Drawer');

var _Drawer3 = _interopRequireDefault(_Drawer2);

var _DrawerNavigation2 = require('./drawer/DrawerNavigation');

var _DrawerNavigation3 = _interopRequireDefault(_DrawerNavigation2);

var _DrawerLink2 = require('./drawer/DrawerLink');

var _DrawerLink3 = _interopRequireDefault(_DrawerLink2);

var _Main2 = require('./main/Main');

var _Main3 = _interopRequireDefault(_Main2);

var _ActionArea2 = require('./action-area/ActionArea');

var _ActionArea3 = _interopRequireDefault(_ActionArea2);

var _MenuButton2 = require('./menu-button/MenuButton');

var _MenuButton3 = _interopRequireDefault(_MenuButton2);

var _LogoImage2 = require('./logoimage/LogoImage');

var _LogoImage3 = _interopRequireDefault(_LogoImage2);

var _AccountArea2 = require('./account-area/AccountArea');

var _AccountArea3 = _interopRequireDefault(_AccountArea2);

var _Notification2 = require('./notification/Notification');

var _Notification3 = _interopRequireDefault(_Notification2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.LayoutContainer = _LayoutContainer3.default; /* jshint ignore:start */

exports.Drawer = _Drawer3.default;
exports.DrawerNavigation = _DrawerNavigation3.default;
exports.DrawerLink = _DrawerLink3.default;
exports.Main = _Main3.default;
exports.ActionArea = _ActionArea3.default;
exports.MenuButton = _MenuButton3.default;
exports.LogoImage = _LogoImage3.default;
exports.AccountArea = _AccountArea3.default;
exports.Notification = _Notification3.default;
/* jshint ignore:end */

},{"./account-area/AccountArea":58,"./action-area/ActionArea":60,"./container/LayoutContainer":62,"./drawer/Drawer":64,"./drawer/DrawerLink":65,"./drawer/DrawerNavigation":66,"./logoimage/LogoImage":71,"./main/Main":73,"./menu-button/MenuButton":75,"./notification/Notification":77}],71:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = require('wmljs/lib/runtime');

var _logoimage = require('./wml/logoimage.wml');

var _logoimage2 = _interopRequireDefault(_logoimage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * LogoImage
 */
var LogoImage = function (_Widget) {
    _inherits(LogoImage, _Widget);

    function LogoImage() {
        _classCallCheck(this, LogoImage);

        return _possibleConstructorReturn(this, (LogoImage.__proto__ || Object.getPrototypeOf(LogoImage)).apply(this, arguments));
    }

    _createClass(LogoImage, [{
        key: 'render',
        value: function render() {

            return _runtime.View.render(_logoimage2.default, this);
        }
    }]);

    return LogoImage;
}(_runtime.Widget);

exports.default = LogoImage;

},{"./wml/logoimage.wml":72,"wmljs/lib/runtime":83}],72:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (make) {
  return make.node('header', { html: { 'class': make.resolve(Class, 'LAYOUT_LOGOIMAGE') } }, [make.$if(this.attributes.read('wat:image', false), function if0() {
    return [make.node('h1', { html: {} }, [make.node('a', { html: { 'href': this.attributes.read('wat:href', '#') } }, [make.node('img', { html: { 'class': make.resolve(Class, 'LAYOUT_LOGOIMAGE_IMAGE'), 'src': this.attributes.read('wat:image'), 'alt': this.attributes.read('wat:alt') } }, [])])])];
  }.bind(this), make.noop)]);
};

var _watClasses = require('wat-classes');

var Class = _interopRequireWildcard(_watClasses);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
},{"wat-classes":5}],73:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = require('wmljs/lib/runtime');

var _main = require('./wml/main.wml');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Main area for content in the layout.
 */
var Main = function (_Widget) {
    _inherits(Main, _Widget);

    function Main(attrs, children) {
        _classCallCheck(this, Main);

        var _this = _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).call(this, attrs, children));

        _this.view = new _runtime.View(_main2.default, _this);

        return _this;
    }

    /**
     * setContent replaces the content of this Main view.
     * @param {Renderable} r
     */


    _createClass(Main, [{
        key: 'setContent',
        value: function setContent(r) {

            var root = this.view.findById('root');

            while (root.lastChild) {
                root.removeChild(root.lastChild);
            }root.appendChild(r.render());
        }
    }, {
        key: 'render',
        value: function render() {

            return this.view.render();
        }
    }]);

    return Main;
}(_runtime.Widget);

exports.default = Main;

},{"./wml/main.wml":74,"wmljs/lib/runtime":83}],74:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (make) {
  return make.node('div', { html: { 'class': make.resolve(Class, 'LAYOUT_MAIN') } }, [make.resolve(this, 'children')]);
};

var _watClasses = require('wat-classes');

var Class = _interopRequireWildcard(_watClasses);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
},{"wat-classes":5}],75:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = require('wmljs/lib/runtime');

var _menu_button = require('./wml/menu_button.wml');

var _menu_button2 = _interopRequireDefault(_menu_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * MenuButton provides a 'hamburger' menu button.
 */
var MenuButton = function (_Widget) {
    _inherits(MenuButton, _Widget);

    function MenuButton() {
        _classCallCheck(this, MenuButton);

        return _possibleConstructorReturn(this, (MenuButton.__proto__ || Object.getPrototypeOf(MenuButton)).apply(this, arguments));
    }

    _createClass(MenuButton, [{
        key: 'clicked',
        value: function clicked(e) {

            this.attributes.read('wat:onClick', function () {})();
        }
    }, {
        key: 'render',
        value: function render() {

            return _runtime.View.render(_menu_button2.default, this);
        }
    }]);

    return MenuButton;
}(_runtime.Widget);

exports.default = MenuButton;

},{"./wml/menu_button.wml":76,"wmljs/lib/runtime":83}],76:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (make) {
  return make.node('button', { html: { 'class': make.resolve(Class, 'LAYOUT_MENU_BUTTON'), 'onclick': this.clicked.bind(this) } }, [make.node('span', { html: { 'class': "" } }, []), make.node('span', { html: { 'class': "" } }, []), make.node('span', { html: { 'class': "" } }, [])]);
};

var _watClasses = require('wat-classes');

var Class = _interopRequireWildcard(_watClasses);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
},{"wat-classes":5}],77:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = require('wmljs/lib/runtime');

var _watClasses = require('wat-classes');

var Class = _interopRequireWildcard(_watClasses);

var _notification = require('./wml/notification.wml');

var _notification2 = _interopRequireDefault(_notification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Notification
 */
var Notification = function (_Widget) {
    _inherits(Notification, _Widget);

    function Notification(attrs, children) {
        _classCallCheck(this, Notification);

        var _this = _possibleConstructorReturn(this, (Notification.__proto__ || Object.getPrototypeOf(Notification)).call(this, attrs, children));

        _this.view = new _runtime.View(_notification2.default, _this);

        return _this;
    }

    /**
     * put a message into the notification widget.
     * Messages are shown for a specific time before
     * they are hidden.
     */


    _createClass(Notification, [{
        key: 'put',
        value: function put(message) {

            var node = this.view.findById('message');

            node.classList.remove(Class.VISIBLE);

            while (node.lastChild) {
                node.removeChild(node.lastChild);
            }node.appendChild(document.createTextNode(message));

            node.classList.add(Class.VISIBLE);

            setTimeout(function () {

                node.classList.remove(Class.VISIBLE);
            }, this.attributes.read('wat:delay', 3) * 1000);
        }
    }, {
        key: 'render',
        value: function render() {

            return this.view.render();
        }
    }]);

    return Notification;
}(_runtime.Widget);

exports.default = Notification;

},{"./wml/notification.wml":78,"wat-classes":5,"wmljs/lib/runtime":83}],78:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (make) {
  return make.node('div', { html: { 'class': make.resolve(Class, 'LAYOUT_NOTIFICATION') }, wml: { 'id': "message" } }, []);
};

var _watClasses = require('wat-classes');

var Class = _interopRequireWildcard(_watClasses);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
},{"wat-classes":5}],79:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propertySeek = require('property-seek');

var _propertySeek2 = _interopRequireDefault(_propertySeek);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Attributes provides an API for reading the 
 * attributes supplied to an Element.
 * @param {object} attrs 
 */
var Attributes = function () {
    function Attributes(attrs) {
        _classCallCheck(this, Attributes);

        this._attrs = attrs;
    }

    _createClass(Attributes, [{
        key: 'read',


        /**
         * read a value form the internal list.
         * @param {string} path 
         * @param {*} defaultValue - This value is returned if the value is not set.
         */
        value: function read(path, defaultValue) {

            var ret = (0, _propertySeek2.default)(this._attrs, path.split(':').join('.'));

            defaultValue = Attributes.isset(defaultValue) ? defaultValue : '';

            if (!Attributes.isset(ret)) return defaultValue;

            return ret;
        }

        /**
         * require is like read but throws an Error if the value is not supplied.
         * @param {string} path 
         * @returns {*}
         */

    }, {
        key: 'require',
        value: function require(path) {

            var ret = this.read(path);

            if (!Attributes.isset(ret)) throw new ReferenceError(path + ' is required!');

            return ret;
        }

        /**
         * requireArray requires the value to be an array, if no 
         * value is read then default is provided.
         * @param {string} path 
         * @param {*} defaultValue 
         */

    }, {
        key: 'requireArray',
        value: function requireArray(path, defaultValue) {

            var ret = this.read(path);

            if (!Attributes.isset(ret)) {

                if (Attributes.isset(defaultValue)) return defaultValue;

                throw new ReferenceError(path + ' is required!');
            } else {

                if (Array.isArray(ret)) return ret;

                throw new TypeError(path + ' must be an array got ' + (typeof ret === 'undefined' ? 'undefined' : _typeof(ret)) + '!');
            }
        }
    }], [{
        key: 'isset',
        value: function isset(value) {

            return [null, undefined].indexOf(value) < 0;
        }
    }]);

    return Attributes;
}();

exports.default = Attributes;
module.exports = exports['default'];

},{"property-seek":84}],80:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Attributes = require('./Attributes');

var _Attributes2 = _interopRequireDefault(_Attributes);

var _propertySeek = require('property-seek');

var _propertySeek2 = _interopRequireDefault(_propertySeek);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Interface for Widgets
 * @interface Widget
 */

/**
 * Interface for objects that create Widgets
 * @interface Factory
 */

/**
 *
 * create the widget
 *
 * @function
 * @name Factory.create
 * @param {object} htmlAttributes A hash of attributes expected to be passed into DOM.
 * @param {object} nsAttributes   A hash of namespaced attributes for framework usage.
 */

/**
 * Maker is used by a wml javascript template to create assets.
 * @param {function} template
 * @param {object} context
 * @todo Clean up relationship between Views and their Makers.
 */
var Maker = function () {
  function Maker(template, context) {
    _classCallCheck(this, Maker);

    this._ids = {};
    this._widgets = [];
    this._template = template;
    this._context = context;
  }

  /**
   * resolve a property access expression to avoid
   * thowing errors if it does not exist.
   * @param {object} head
   * @param {string} path
   */


  _createClass(Maker, [{
    key: 'resolve',
    value: function resolve(head, path) {

      var ret = (0, _propertySeek2.default)(head, path);

      if (ret === undefined || ret === null) ret = '';

      return ret;
    }

    /**
     *@private
     */

  }, {
    key: '_adopt',
    value: function _adopt(child, e) {
      var _this = this;

      if (Array.isArray(child)) return child.forEach(function (innerChild) {
        return _this._adopt(innerChild, e);
      });

      if (child) e.appendChild((typeof child === 'undefined' ? 'undefined' : _typeof(child)) === 'object' ? child : document.createTextNode(child || ''));
    }

    /**
     * register a Widget or Node by the specified wml:id
     * @param {string} id
     * @param {Widget|Node} target
     */

  }, {
    key: 'register',
    value: function register(id, target) {

      if (this._ids.hasOwnProperty(id)) throw new Error('Duplicate id \'' + id + '\' detected!');

      this._ids[id] = target;
    }

    /**
     * noop is a function that does nothing.
     */

  }, {
    key: 'noop',
    value: function noop() {}

    /**
     * text creates a DOMTextNode
     * @param {string} value
     */

  }, {
    key: 'text',
    value: function text(value) {

      return document.createTextNode(value || '');
    }

    /**
     * node is called to create a regular DOM node
     * @param {string} tag
     * @param {object} attributes
     * @param {array<string|number|Widget>} children
     */

  }, {
    key: 'node',
    value: function node(tag, attributes, children) {
      var _this2 = this;

      var e = tag === 'fragment' ? document.createDocumentFragment() : document.createElement(tag);

      if (_typeof(attributes.html) === 'object') Object.keys(attributes.html).forEach(function (key) {

        if (typeof attributes.html[key] === 'function') {
          e[key] = attributes.html[key];
        } else {
          e.setAttribute(key, attributes.html[key]);
        }
      });

      children.forEach(function (c) {
        return _this2._adopt(c, e);
      });

      if (attributes.wml) if (attributes.wml.id) this.register(attributes.wml.id, e);

      return e;
    }

    /**
     * widget creates a wml widget.
     * @param {function} Construtor
     * @param {object} attributes
     * @param {array<string|number|Widget>} children
     * @return {Widget}
     */

  }, {
    key: 'widget',
    value: function widget(Constructor, attributes, children) {

      var childs = [];
      var w;

      children.forEach(function (child) {
        return Array.isArray(child) ? childs.push.apply(childs, child) : childs.push(child);
      });

      w = new Constructor(new _Attributes2.default(attributes), childs);

      if (attributes.wml) if (attributes.wml.id) this.register(attributes.wml.id, w);

      this._widgets.push(w);
      return w.render();
    }

    /**
     * $if is called to create an if conditional construct
     * @param {*} predicate
     * @param {function} positive
     * @param {function} negative
     */

  }, {
    key: '$if',
    value: function $if(predicate, positive, negative) {

      return predicate ? positive() : negative();
    }

    /**
     * $for is called to create a for loop construct
     * @param {Iterable} collection
     * @param {function} cb
     */

  }, {
    key: '$for',
    value: function $for(collection, cb) {

      if (Array.isArray(collection)) {

        return collection.map(cb);
      } else if ((typeof collection === 'undefined' ? 'undefined' : _typeof(collection)) === 'object') {

        return Object.keys(collection).map(function (key, i, all) {
          return cb(collection[key], key, all);
        });
      }

      return [];
    }

    /**
     * $switch simulates a switch statement
     * @param {string|number|boolean} value
     * @param {object} cases
     */

  }, {
    key: '$switch',
    value: function $switch(value, cases) {

      var result = cases[value];
      var defaul = cases.default;

      if (result) return result;

      if (defaul) return deaful;
    }

    /**
     * spread a variable into attributes
     * @param {object|array} value
     * @param {object} attrs
     * @param {string} key
     */

  }, {
    key: 'spread',
    value: function spread(value, attrs, key) {

      var target;

      attrs = attrs || Object.create(null);

      if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object') throw new TypeError('Spread values must be an array or object! Got \'' + (typeof value === 'undefined' ? 'undefined' : _typeof(value)) + '\'!');

      if (key !== '') {

        target = (0, _propertySeek2.default)(attrs, key) || Object.create(null);
        Object.keys(value).forEach(function (k) {
          return target[k] = value[k];
        });
        _propertySeek2.default.set(attrs, key, target);
      } else {

        Object.keys(value).forEach(function (k) {
          return attrs[k] = value[k];
        });
      }

      return attrs;
    }

    /**
     * findById returns a widget from the internal list.
     * @param {string} id
     * @return {object}
     */

  }, {
    key: 'findById',
    value: function findById(id) {

      return this._ids[id] ? this._ids[id] : null;
    }

    /**
     * render the DOM.
     * @return {DOMTree}
     */

  }, {
    key: 'render',
    value: function render() {

      var tree = null;

      this._ids = {};
      this._widgets.forEach(function (w) {
        return w.onRemoved();
      });
      this._widgets = [];

      tree = this._template.call(this._context, this);
      this._ids.root = this._ids.root ? this._ids.root : tree;
      this._widgets.forEach(function (w) {
        return w.onRendered();
      });

      return tree;
    }
  }]);

  return Maker;
}();

exports.default = Maker;
module.exports = exports['default'];

},{"./Attributes":79,"property-seek":84}],81:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Maker = require('./Maker');

var _Maker2 = _interopRequireDefault(_Maker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * View provides an API for turning wml into a DOM tree.
 * Additionally it provides a convenient API for retreiving created
 * widgets created during parsing providing an near custom elements
 * like feel.
 * @param {function} template A function that will be treated as a wml template.
 * @param {Object} context All references to `this` in the template will refer to this object.
 * @param {} listener 
 */
var View = function () {
    function View(template, context) {
        _classCallCheck(this, View);

        this._maker = new _Maker2.default(template, context);
    }

    /**
     * render is a factory method for creating a new View and rendering
     * it's contents immediately.
     * @param {function} template
     * @param {object|null} context 
     * @returns {DocumentFragment}
     */


    _createClass(View, [{
        key: 'findById',


        /**
         * findById retrieves an element by its wml:id attribute.
         * @param {string} id 
         * @return {Object} 
         */
        value: function findById(id) {

            return this._maker.findById(id);
        }

        /**
         * use replaces the template (and optionally context) this View uses.
         * @param {function} template 
         * @param {object} [context] 
         * @returns {View}
         */

    }, {
        key: 'use',
        value: function use(template, context) {

            this._maker = new _Maker2.default(template, context ? context : this.context);
            return this;
        }

        /**
         * render provides the DOM output of this view.
         * @return {DOMNode} 
         */

    }, {
        key: 'render',
        value: function render() {

            return this._maker.render();
        }
    }], [{
        key: 'render',
        value: function render(template, context) {

            return new View(template, context).render();
        }
    }]);

    return View;
}();

exports.default = View;
module.exports = exports['default'];

},{"./Maker":80}],82:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Widget class represents
 */
var Widget = function () {
  function Widget(attrs, children) {
    _classCallCheck(this, Widget);

    this.attrs = attrs._attrs;
    this.attributes = attrs;
    this.children = children;
  }

  _createClass(Widget, [{
    key: "onRendered",
    value: function onRendered() {}
  }, {
    key: "onRemoved",
    value: function onRemoved() {}
  }]);

  return Widget;
}();

exports.default = Widget;
module.exports = exports["default"];

},{}],83:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Widget = exports.Attributes = exports.View = undefined;

var _View2 = require('./View');

var _View3 = _interopRequireDefault(_View2);

var _Attributes2 = require('./Attributes');

var _Attributes3 = _interopRequireDefault(_Attributes2);

var _Widget2 = require('./Widget');

var _Widget3 = _interopRequireDefault(_Widget2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.View = _View3.default; /*jshint ignore:start */

exports.Attributes = _Attributes3.default;
exports.Widget = _Widget3.default;
/*jshint ignore:end */

},{"./Attributes":79,"./View":81,"./Widget":82}],84:[function(require,module,exports){
arguments[4][11][0].apply(exports,arguments)
},{"dup":11}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJleGFtcGxlcy9zcmMvQXBwbGljYXRpb24uanMiLCJleGFtcGxlcy9zcmMvTmV3VXNlckZvcm0uanMiLCJleGFtcGxlcy9zcmMvd21sL2xheW91dC53bWwiLCJleGFtcGxlcy9zcmMvd21sL25ld191c2VyX2Zvcm0ud21sIiwic3JjL2xpYi93YXQtY2xhc3Nlcy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9iZW9mL3NyYy9OdWxsVmFyaWFibGUuanMiLCJub2RlX21vZHVsZXMvYmVvZi9zcmMvVHlwZWRWYXJpYWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9iZW9mL3NyYy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gudGhyb3R0bGUvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbm9wL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3Byb3BlcnR5LXNlZWsvaW5kZXguanMiLCJzcmMvY29tcG9uZW50cy9Db2x1bW4uanMiLCJzcmMvY29tcG9uZW50cy9Db250YWluZXIuanMiLCJzcmMvY29tcG9uZW50cy9Sb3cuanMiLCJzcmMvY29tcG9uZW50cy9UYWJsZS5qcyIsInNyYy9jb21wb25lbnRzL2F1dG9jb21wbGV0ZS9BdXRvY29tcGxldGUuanMiLCJzcmMvY29tcG9uZW50cy9hdXRvY29tcGxldGUvQXV0b2NvbXBsZXRlRGVsZWdhdGUuanMiLCJzcmMvY29tcG9uZW50cy9hdXRvY29tcGxldGUvUG9wdWxhdGVkRGVsZWdhdGUuanMiLCJzcmMvY29tcG9uZW50cy9hdXRvY29tcGxldGUvUmVzdERlbGVnYXRlLmpzIiwic3JjL2NvbXBvbmVudHMvYXV0b2NvbXBsZXRlL1NlYXJjaERlbGVnYXRlLmpzIiwic3JjL2NvbXBvbmVudHMvYXV0b2NvbXBsZXRlL1NlbGVjdGlvbkRlbGVnYXRlLmpzIiwic3JjL2NvbXBvbmVudHMvYXV0b2NvbXBsZXRlL3dtbC9sYXlvdXQud21sIiwic3JjL2NvbXBvbmVudHMvYXV0b2NvbXBsZXRlL3dtbC9vcHRpb25zLndtbCIsInNyYy9jb21wb25lbnRzL2JyZWFkY3J1bWJzL0JyZWFkQ3J1bWIuanMiLCJzcmMvY29tcG9uZW50cy9icmVhZGNydW1icy9CcmVhZENydW1iTWVudS5qcyIsInNyYy9jb21wb25lbnRzL2JyZWFkY3J1bWJzL3dtbC9pdGVtLndtbCIsInNyYy9jb21wb25lbnRzL2JyZWFkY3J1bWJzL3dtbC9tZW51LndtbCIsInNyYy9jb21wb25lbnRzL2J1dHRvbi9CdXR0b24uanMiLCJzcmMvY29tcG9uZW50cy9idXR0b24vd21sL2J1dHRvbi53bWwiLCJzcmMvY29tcG9uZW50cy9jYXJkL0NhcmQuanMiLCJzcmMvY29tcG9uZW50cy9jYXJkL0NhcmRCbG9jay5qcyIsInNyYy9jb21wb25lbnRzL2NhcmQvQ2FyZEltYWdlLmpzIiwic3JjL2NvbXBvbmVudHMvY2FyZC93bWwvY2FyZC53bWwiLCJzcmMvY29tcG9uZW50cy9jYXJkL3dtbC9jYXJkX2Jsb2NrLndtbCIsInNyYy9jb21wb25lbnRzL2NhcmQvd21sL2NhcmRfaW1hZ2Uud21sIiwic3JjL2NvbXBvbmVudHMvaW5kZXguanMiLCJzcmMvY29tcG9uZW50cy9pbnB1dC9JbnB1dC5qcyIsInNyYy9jb21wb25lbnRzL2lucHV0L3dtbC9sYXlvdXQud21sIiwic3JjL2NvbXBvbmVudHMvanVtYm90cm9uL0p1bWJvdHJvbi5qcyIsInNyYy9jb21wb25lbnRzL2p1bWJvdHJvbi93bWwvbGF5b3V0LndtbCIsInNyYy9jb21wb25lbnRzL21vZGFsL01vZGFsLmpzIiwic3JjL2NvbXBvbmVudHMvbW9kYWwvTW9kYWxCb2R5LmpzIiwic3JjL2NvbXBvbmVudHMvbW9kYWwvTW9kYWxGb290ZXIuanMiLCJzcmMvY29tcG9uZW50cy9tb2RhbC9Nb2RhbEhlYWRlci5qcyIsInNyYy9jb21wb25lbnRzL21vZGFsL3dtbC9tb2RhbC53bWwiLCJzcmMvY29tcG9uZW50cy9tb2RhbC93bWwvbW9kYWxfYm9keS53bWwiLCJzcmMvY29tcG9uZW50cy9tb2RhbC93bWwvbW9kYWxfZm9vdGVyLndtbCIsInNyYy9jb21wb25lbnRzL21vZGFsL3dtbC9tb2RhbF9oZWFkZXIud21sIiwic3JjL2NvbXBvbmVudHMvc2VsZWN0L1NlbGVjdC5qcyIsInNyYy9jb21wb25lbnRzL3NlbGVjdC93bWwvbGF5b3V0LndtbCIsInNyYy9jb21wb25lbnRzL3N3aXRjaC9Td2l0Y2guanMiLCJzcmMvY29tcG9uZW50cy9zd2l0Y2gvd21sL2xheW91dC53bWwiLCJzcmMvY29tcG9uZW50cy93ZWxsL1dlbGwuanMiLCJzcmMvY29tcG9uZW50cy93ZWxsL3dtbC9sYXlvdXQud21sIiwic3JjL2NvbXBvbmVudHMvd21sL2NvbHVtbi53bWwiLCJzcmMvY29tcG9uZW50cy93bWwvY29udGFpbmVyLndtbCIsInNyYy9jb21wb25lbnRzL3dtbC9yb3cud21sIiwic3JjL2xheW91dC9hY2NvdW50LWFyZWEvQWNjb3VudEFyZWEuanMiLCJzcmMvbGF5b3V0L2FjY291bnQtYXJlYS93bWwvYWNjb3VudF9hcmVhLndtbCIsInNyYy9sYXlvdXQvYWN0aW9uLWFyZWEvQWN0aW9uQXJlYS5qcyIsInNyYy9sYXlvdXQvYWN0aW9uLWFyZWEvd21sL2FjdGlvbl9hcmVhLndtbCIsInNyYy9sYXlvdXQvY29udGFpbmVyL0xheW91dENvbnRhaW5lci5qcyIsInNyYy9sYXlvdXQvY29udGFpbmVyL3dtbC9jb250YWluZXIud21sIiwic3JjL2xheW91dC9kcmF3ZXIvRHJhd2VyLmpzIiwic3JjL2xheW91dC9kcmF3ZXIvRHJhd2VyTGluay5qcyIsInNyYy9sYXlvdXQvZHJhd2VyL0RyYXdlck5hdmlnYXRpb24uanMiLCJzcmMvbGF5b3V0L2RyYXdlci93bWwvZHJhd2VyLndtbCIsInNyYy9sYXlvdXQvZHJhd2VyL3dtbC9kcmF3ZXJfbGluay53bWwiLCJzcmMvbGF5b3V0L2RyYXdlci93bWwvZHJhd2VyX25hdmlnYXRpb24ud21sIiwic3JjL2xheW91dC9pbmRleC5qcyIsInNyYy9sYXlvdXQvbG9nb2ltYWdlL0xvZ29JbWFnZS5qcyIsInNyYy9sYXlvdXQvbG9nb2ltYWdlL3dtbC9sb2dvaW1hZ2Uud21sIiwic3JjL2xheW91dC9tYWluL01haW4uanMiLCJzcmMvbGF5b3V0L21haW4vd21sL21haW4ud21sIiwic3JjL2xheW91dC9tZW51LWJ1dHRvbi9NZW51QnV0dG9uLmpzIiwic3JjL2xheW91dC9tZW51LWJ1dHRvbi93bWwvbWVudV9idXR0b24ud21sIiwic3JjL2xheW91dC9ub3RpZmljYXRpb24vTm90aWZpY2F0aW9uLmpzIiwic3JjL2xheW91dC9ub3RpZmljYXRpb24vd21sL25vdGlmaWNhdGlvbi53bWwiLCIuLi93bWwvc3JjL3J1bnRpbWUvQXR0cmlidXRlcy5qcyIsIi4uL3dtbC9zcmMvcnVudGltZS9NYWtlci5qcyIsIi4uL3dtbC9zcmMvcnVudGltZS9WaWV3LmpzIiwiLi4vd21sL3NyYy9ydW50aW1lL1dpZGdldC5qcyIsIi4uL3dtbC9zcmMvcnVudGltZS9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7QUNBQTs7QUFDQTs7OztBQUNBOzs7Ozs7OztJQUdNLFc7QUFFRiwyQkFBYztBQUFBOztBQUVWLGFBQUssSUFBTCxHQUFZLG9DQUFpQixJQUFqQixDQUFaO0FBQ0EsYUFBSyxNQUFMLEdBQWMsSUFBZDtBQUNBLGFBQUssT0FBTCxHQUFlLElBQWY7QUFDQSxhQUFLLGFBQUwsR0FBcUIsSUFBckI7QUFDQSxhQUFLLE9BQUwsR0FBZSxJQUFmO0FBQ0EsYUFBSyxLQUFMLEdBQWEsSUFBYjtBQUVIOzs7OzRDQUVtQjs7QUFFaEIsaUJBQUssS0FBTCxDQUFXLEdBQVgsQ0FBZSwwQkFBZ0IsSUFBaEIsQ0FBZjtBQUVIOzs7NENBRW1COztBQUVoQixpQkFBSyxNQUFMLENBQVksTUFBWjtBQUVIOzs7aUNBRVEsSSxFQUFNOztBQUVYLGlCQUFLLE1BQUw7QUFFSDs7QUFFRDs7Ozs7O29DQUdZLEssRUFBTyxZLEVBQWM7O0FBRTdCLG9C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ckpTLEk7O0FBRnhCOzs7Ozs7QUFFZSxTQUFTLElBQVQsQ0FBYyxDQUFkLEVBQWlCOztBQUU1QixXQUFPLDRCQUFrQixDQUFsQixDQUFQO0FBRUg7Ozs7O0FDTkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3ZiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDM0RBOztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQTs7O0lBR00sTTs7O0FBRUYsb0JBQVksS0FBWixFQUFtQixRQUFuQixF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c0IsT0FBdEIsRUFBK0I7QUFBQTs7QUFFM0IsYUFBSyxNQUFMLEdBQWMsb0JBQVUsUUFBVixFQUFvQixPQUFwQixDQUFkO0FBRUg7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7QUFhQTs7Ozs7aUNBS1MsRSxFQUFJOztBQUVULG1CQUFPLEtBQUssTUFBTCxDQUFZLFFBQVosQ0FBcUIsRUFBckIsQ0FBUDtBQUVIOztBQUVEOzs7Ozs7Ozs7NEJBTUksUSxFQUFVLE8sRUFBUzs7QUFFbkIsaUJBQUssTUFBTCxHQUFjLG9CQUFVLFFBQVYsRUFBcUIsT0FBRCxHQUFZLE9BQVosR0FBc0IsS0FBSyxPQUEvQyxDQUFkO0FBQ0EsbUJBQU8sSUFBUDtBQUVIOztBQUVEOzs7Ozs7O2lDQUlTOztBQUVMLG1CQUFPLEtBQUssTUFBTCxDQUFZLE1BQVosRUFBUDtBQUVIOzs7K0JBdENhLFEsRUFBVSxPLEVBQVM7O0FBRTdCLG1CQUFRLElBQUksSUFBSixDQUFTLFFBQVQsRUFBbUIsT0FBbkIsQ0FBRCxDQUE4QixNQUE5QixFQUFQO0FBRUg7Ozs7OztrQkF1Q1UsSTs7Ozs7Ozs7Ozs7Ozs7QUNyRWY7OztJQUdNLE07QUFFSixrQkFBWSxLQUFaLEVBQW1CLFFBQW5CLEVBQTZCO0FBQUE7O0FBRTNCLFNBQUssS0FBTCxHQUFhLE1BQU0sTUFBbkI7QUFDQSxTQUFLLFVBQUwsR0FBa0IsS0FBbEI7QUFDQSxTQUFLLFFBQUwsR0FBZ0IsUUFBaEI7QUFFRDs7OztpQ0FFWSxDQUVaOzs7Z0NBRVcsQ0FFWDs7Ozs7O2tCQUlZLE07Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUN0QlIsSSxtQkFEUDs7UUFFTyxVO1FBQ0EsTTtBQUNQIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB7IFZpZXcsIFdpZGdldCB9IGZyb20gJ3dtbGpzL2xpYi9ydW50aW1lJztcbmltcG9ydCBsYXlvdXQgZnJvbSAnLi93bWwvbGF5b3V0LndtbCc7XG5pbXBvcnQgTmV3VXNlckZvcm0gZnJvbSAnLi9OZXdVc2VyRm9ybSc7XG5cblxuY2xhc3MgQXBwbGljYXRpb24ge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG5cbiAgICAgICAgdGhpcy52aWV3ID0gbmV3IFZpZXcobGF5b3V0LCB0aGlzKTtcbiAgICAgICAgdGhpcy5kcmF3ZXIgPSBudWxsO1xuICAgICAgICB0aGlzLmFjdGlvbnMgPSBudWxsO1xuICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbnMgPSBudWxsO1xuICAgICAgICB0aGlzLmNvbnRlbnQgPSBudWxsO1xuICAgICAgICB0aGlzLm1vZGFsID0gbnVsbDtcblxuICAgIH1cblxuICAgIHNob3dOZXdVc2VyRGlhbG9nKCkge1xuXG4gICAgICAgIHRoaXMubW9kYWwucHV0KG5ldyBOZXdVc2VyRm9ybSh0aGlzKSk7XG5cbiAgICB9XG5cbiAgICBtZW51QnV0dG9uQ2xpY2tlZCgpIHtcblxuICAgICAgICB0aGlzLmRyYXdlci50b2dnbGUoKTtcblxuICAgIH1cblxuICAgIG5hdmlnYXRlKGl0ZW0pIHtcblxuICAgICAgICBpdGVtLmFjdGl2ZSgpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogc2VhcmNoVXNlcnNcbiAgICAgKi9cbiAgICBzZWFyY2hVc2Vycyh2YWx1ZSwgYXV0b2NvbXBsZXRlKSB7XG5cbiAgICAgICAgY29uc29sZS5sb2coJ3NlYXJjaGluZyB3aXRoICcsIHZhbHVlKTtcbiAgICAgICAgYXV0b2NvbXBsZXRlLnVwZGF0ZShbJ1BhdWwnLCAnTGl0Y2hpZSddKTtcblxuICAgIH1cblxuICAgIHVzZXJTZWxlY3RlZCh2YWx1ZSwgbmFtZSkge1xuXG4gICAgICAgIGNvbnNvbGUubG9nKGBTZWxlY3RlZDogJHtuYW1lfS0+JHt2YWx1ZX1gKTtcblxuICAgIH1cblxuICAgIHJ1bigpIHtcblxuICAgICAgICB3aW5kb3cuYXBwID0gdGhpcztcbiAgICAgICAgZG9jdW1lbnQuYm9keS5pbnNlcnRCZWZvcmUodGhpcy52aWV3LnJlbmRlcigpLCBkb2N1bWVudC5ib2R5LmZpcnN0Q2hpbGQpO1xuXG4gICAgICAgIHRoaXMuZHJhd2VyID0gdGhpcy52aWV3LmZpbmRCeUlkKCdkcmF3ZXInKTtcbiAgICAgICAgdGhpcy5hY3Rpb25zID0gdGhpcy52aWV3LmZpbmRCeUlkKCdhY3Rpb25zJyk7XG4gICAgICAgIHRoaXMubm90aWZpY2F0aW9ucyA9IHRoaXMudmlldy5maW5kQnlJZCgnbm90aWZpY2F0aW9ucycpO1xuICAgICAgICB0aGlzLmNvbnRlbnQgPSB0aGlzLnZpZXcuZmluZEJ5SWQoJ21haW4nKTtcbiAgICAgICAgdGhpcy5tb2RhbCA9IHRoaXMudmlldy5maW5kQnlJZCgnbW9kYWwnKTtcblxuICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbnMucHV0KCdBcHBsaWNhdGlvbiBzdGFydGVkIScpO1xuXG4gICAgfVxuXG4gICAgc3RhdGljIG1haW4oKSB7XG5cbiAgICAgICAgcmV0dXJuIChuZXcgdGhpcygpKS5ydW4oKTtcblxuICAgIH1cblxufVxuXG5BcHBsaWNhdGlvbi5tYWluKCk7XG4iLCJpbXBvcnQgeyBWaWV3IH0gZnJvbSAnd21sanMvbGliL3J1bnRpbWUnO1xuaW1wb3J0IG5ld191c2VyX2Zvcm0gZnJvbSAnLi93bWwvbmV3X3VzZXJfZm9ybS53bWwnO1xuXG4vKipcbiAqIE5ld1VzZXJGb3JtXG4gKi9cbmNsYXNzIE5ld1VzZXJGb3JtIHtcblxuICAgIGNvbnN0cnVjdG9yKGFwcCkge1xuXG4gICAgICAgIHRoaXMuYXBwID0gYXBwO1xuICAgICAgICB0aGlzLnZpZXcgPSBuZXcgVmlldyhuZXdfdXNlcl9mb3JtLCB0aGlzKTtcblxuICAgIH1cblxuICAgIHNhdmUoKSB7XG5cbiAgICB9XG5cbiAgICBjYW5jZWwoKSB7XG5cbiAgICAgICAgdGhpcy5hcHAubW9kYWwubW9kYWwuaGlkZSgpO1xuXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiB0aGlzLnZpZXcucmVuZGVyKCk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgTmV3VXNlckZvcm1cbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKG1ha2UpIHtcbiAgcmV0dXJuIG1ha2Uud2lkZ2V0KF9sYXlvdXQuTGF5b3V0Q29udGFpbmVyLCB7IGh0bWw6IHt9IH0sIFttYWtlLndpZGdldChfY29tcG9uZW50cy5Nb2RhbCwgeyBodG1sOiB7fSwgd21sOiB7ICdpZCc6IFwibW9kYWxcIiB9IH0sIFtdKSwgbWFrZS53aWRnZXQoX2xheW91dC5EcmF3ZXIsIHsgaHRtbDoge30sIHdtbDogeyAnaWQnOiBcImRyYXdlclwiIH0gfSwgW21ha2Uud2lkZ2V0KF9sYXlvdXQuTG9nb0ltYWdlLCB7IGh0bWw6IHt9LCB3YXQ6IHsgJ2ltYWdlJzogXCJpbWcvbG9nby5zdmdcIiB9IH0sIFtdKSwgbWFrZS53aWRnZXQoX2xheW91dC5EcmF3ZXJOYXZpZ2F0aW9uLCB7IGh0bWw6IHt9IH0sIFttYWtlLndpZGdldChfbGF5b3V0LkRyYXdlckxpbmssIHsgaHRtbDoge30sIHdhdDogeyAnaHJlZic6IFwiIy9kYXNoYm9hcmRcIiwgJ3RpdGxlJzogXCJEYXNoYm9hcmRcIiwgJ2FjdGl2ZSc6IG1ha2UucmVzb2x2ZSh3aW5kb3csICdsb2NhdGlvbi5oYXNoJykgPT09ICcjL2Rhc2hib2FyZCcsICdvbkNsaWNrJzogdGhpcy5uYXZpZ2F0ZS5iaW5kKHRoaXMpIH0gfSwgW10pLCBtYWtlLndpZGdldChfbGF5b3V0LkRyYXdlckxpbmssIHsgaHRtbDoge30sIHdhdDogeyAnaHJlZic6IFwiIy9tZXNzYWdlc1wiLCAndGl0bGUnOiBcIk1lc3NhZ2VzXCIsICdhY3RpdmUnOiBtYWtlLnJlc29sdmUod2luZG93LCAnbG9jYXRpb24uaGFzaCcpID09PSAnIy9tZXNzYWdlcycsICdvbkNsaWNrJzogdGhpcy5uYXZpZ2F0ZS5iaW5kKHRoaXMpIH0gfSwgW10pLCBtYWtlLndpZGdldChfbGF5b3V0LkRyYXdlckxpbmssIHsgaHRtbDoge30sIHdhdDogeyAnaHJlZic6IFwiIy9pbnZvaWNlc1wiLCAndGl0bGUnOiBcIkludm9pY2VzXCIsICdhY3RpdmUnOiBtYWtlLnJlc29sdmUod2luZG93LCAnbG9jYXRpb24uaGFzaCcpID09PSAnIy9pbnZvaWNlcycsICdvbkNsaWNrJzogdGhpcy5uYXZpZ2F0ZS5iaW5kKHRoaXMpIH0gfSwgW10pLCBtYWtlLndpZGdldChfbGF5b3V0LkRyYXdlckxpbmssIHsgaHRtbDoge30sIHdhdDogeyAnaHJlZic6IFwiIy91c2Vyc1wiLCAndGl0bGUnOiBcIlVzZXJzXCIsICdhY3RpdmUnOiBtYWtlLnJlc29sdmUod2luZG93LCAnbG9jYXRpb24uaGFzaCcpID09PSAnIy91c2VycycsICdvbkNsaWNrJzogdGhpcy5uYXZpZ2F0ZS5iaW5kKHRoaXMpIH0gfSwgW10pXSksIG1ha2Uud2lkZ2V0KF9sYXlvdXQuQWNjb3VudEFyZWEsIHsgaHRtbDoge30sIHdhdDogeyAndGl0bGUnOiBcIkphbmUgSm9lXCIgfSB9LCBbXSldKSwgbWFrZS53aWRnZXQoX2xheW91dC5NYWluLCB7IGh0bWw6IHt9LCB3bWw6IHsgJ2lkJzogXCJjb250ZW50XCIgfSB9LCBbbWFrZS53aWRnZXQoX2xheW91dC5BY3Rpb25BcmVhLCB7IGh0bWw6IHt9LCB3bWw6IHsgJ2lkJzogXCJhY3Rpb25zXCIgfSwgd2F0OiB7ICdvbk1lbnVCdXR0b25DbGlja2VkJzogdGhpcy5tZW51QnV0dG9uQ2xpY2tlZC5iaW5kKHRoaXMpIH0gfSwgW21ha2Uubm9kZSgnaDMnLCB7IGh0bWw6IHsgJ2NsYXNzJzogXCJtYWluLWNvbnRlbnRcIiB9IH0sIFttYWtlLndpZGdldChfY29tcG9uZW50cy5CcmVhZENydW1iTWVudSwgeyBodG1sOiB7fSB9LCBbbWFrZS53aWRnZXQoX2NvbXBvbmVudHMuQnJlYWRDcnVtYiwgeyBodG1sOiB7fSwgd2F0OiB7ICdocmVmJzogXCIjXCIgfSB9LCBbbWFrZS50ZXh0KCdIb21lJyldKSwgbWFrZS53aWRnZXQoX2NvbXBvbmVudHMuQnJlYWRDcnVtYiwgeyBodG1sOiB7fSwgd2F0OiB7ICdocmVmJzogXCIjXCIsICdhY3RpdmUnOiB0cnVlIH0gfSwgW21ha2UudGV4dCgnRXhhbXBsZScpXSldKV0pLCBtYWtlLm5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiBcInNlY29uZGFyeS1jb250ZW50XCIgfSB9LCBbbWFrZS53aWRnZXQoX2NvbXBvbmVudHMuQnV0dG9uLCB7IGh0bWw6IHt9LCB3YXQ6IHsgJ25hbWUnOiBcIm5ldyB1c2VyXCIsICd2YXJpYW50JzogXCJwcmltYXJ5XCIsICd0ZXh0JzogXCJOZXcgVXNlclwiLCAnb25DbGljayc6IHRoaXMuc2hvd05ld1VzZXJEaWFsb2cuYmluZCh0aGlzKSB9IH0sIFtdKV0pXSksIG1ha2Uud2lkZ2V0KF9jb21wb25lbnRzLkNvbnRhaW5lciwgeyBodG1sOiB7fSB9LCBbbWFrZS53aWRnZXQoX2NvbXBvbmVudHMuUm93LCB7IGh0bWw6IHt9IH0sIFttYWtlLndpZGdldChfY29tcG9uZW50cy5Db2x1bW4sIHsgaHRtbDoge30gfSwgW21ha2Uubm9kZSgnaDMnLCB7IGh0bWw6IHt9IH0sIFttYWtlLnRleHQoJ1Nob3cgZGlzYWJsZWQ/JyldKSwgbWFrZS53aWRnZXQoX2NvbXBvbmVudHMuU3dpdGNoLCB7IGh0bWw6IHt9IH0sIFtdKV0pXSksIG1ha2Uud2lkZ2V0KF9jb21wb25lbnRzLlJvdywgeyBodG1sOiB7fSB9LCBbbWFrZS53aWRnZXQoX2NvbXBvbmVudHMuQ29sdW1uLCB7IGh0bWw6IHt9IH0sIFttYWtlLm5vZGUoJ2g0JywgeyBodG1sOiB7fSB9LCBbbWFrZS50ZXh0KCdTZWFyY2ggVXNlcnMnKV0pXSldKSwgbWFrZS53aWRnZXQoX2NvbXBvbmVudHMuUm93LCB7IGh0bWw6IHt9IH0sIFttYWtlLndpZGdldChfY29tcG9uZW50cy5Db2x1bW4sIHsgaHRtbDoge30gfSwgW21ha2Uud2lkZ2V0KF9jb21wb25lbnRzLkF1dG9jb21wbGV0ZSwgeyBodG1sOiB7fSwgd2F0OiB7ICdpbnB1dENsYXNzJzogXCJmb3JtLWNvbnRyb2xcIiwgJ25hbWUnOiBcInVzZXJcIiwgJ3ZhbHVlJzogXCJSaWNoYXJkXCIsICdzZXQnOiB0aGlzLnVzZXJTZWxlY3RlZC5iaW5kKHRoaXMpLCAnc2VhcmNoJzogdGhpcy5zZWFyY2hVc2Vycy5iaW5kKHRoaXMpIH0gfSwgW10pXSldKSwgbWFrZS53aWRnZXQoX2NvbXBvbmVudHMuUm93LCB7IGh0bWw6IHt9IH0sIFttYWtlLndpZGdldChfY29tcG9uZW50cy5Db2x1bW4sIHsgaHRtbDoge30gfSwgW21ha2Uud2lkZ2V0KF9jb21wb25lbnRzLlNlbGVjdCwgeyBodG1sOiB7fSwgd2F0OiB7ICduYW1lJzogXCJ1c2VyXCIsICd2YWx1ZSc6IFwiUmljaGFyZFwiLCAnb3B0aW9ucyc6IFt7IHZhbHVlOiAxLCBsYWJlbDogJ0ZpcnN0JyB9LCB7IHZhbHVlOiAyLCBsYWJlbDogJ1NlY29uZCcgfV0gfSB9LCBbXSldKV0pXSldKSwgbWFrZS53aWRnZXQoX2xheW91dC5Ob3RpZmljYXRpb24sIHsgaHRtbDoge30sIHdtbDogeyAnaWQnOiBcIm5vdGlmaWNhdGlvbnNcIiB9IH0sIFtdKV0pO1xufTtcblxudmFyIF9sYXlvdXQgPSByZXF1aXJlKCdsYXlvdXQnKTtcblxudmFyIF9jb21wb25lbnRzID0gcmVxdWlyZSgnY29tcG9uZW50cycpOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgICAgIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKG1ha2UpIHtcbiAgICAgICAgcmV0dXJuIG1ha2Uubm9kZSgnZnJhZ21lbnQnLCB7IGh0bWw6IHt9IH0sIFttYWtlLndpZGdldChfY29tcG9uZW50cy5Nb2RhbEhlYWRlciwgeyBodG1sOiB7fSB9LCBbbWFrZS50ZXh0KCdcXG4gICAgICAgIENyZWF0ZSBhIG5ldyB1c2VyXFxuICAgICcpXSksIG1ha2Uud2lkZ2V0KF9jb21wb25lbnRzLk1vZGFsQm9keSwgeyBodG1sOiB7fSB9LCBbbWFrZS5ub2RlKCdwJywgeyBodG1sOiB7fSB9LCBbbWFrZS50ZXh0KCcgOk8nKV0pXSksIG1ha2Uud2lkZ2V0KF9jb21wb25lbnRzLk1vZGFsRm9vdGVyLCB7IGh0bWw6IHt9IH0sIFttYWtlLndpZGdldChfY29tcG9uZW50cy5CdXR0b24sIHsgaHRtbDoge30sIHdhdDogeyAndmFyaWFudCc6IFwiZGVmYXVsdFwiLCAnb25DbGljayc6IHRoaXMuY2FuY2VsLmJpbmQodGhpcyksICd0ZXh0JzogXCJDYW5jZWxcIiB9IH0sIFtdKSwgbWFrZS53aWRnZXQoX2NvbXBvbmVudHMuQnV0dG9uLCB7IGh0bWw6IHt9LCB3YXQ6IHsgJ3ZhcmlhbnQnOiBcInByaW1hcnlcIiwgJ29uQ2xpY2snOiB0aGlzLnNhdmUuYmluZCh0aGlzKSwgJ3RleHQnOiBcIlNhdmVcIiB9IH0sIFtdKV0pXSk7XG59O1xuXG52YXIgX2NvbXBvbmVudHMgPSByZXF1aXJlKCdjb21wb25lbnRzJyk7IiwiZXhwb3J0IGNvbnN0IFZJU0lCTEUgPSAnd2F0LXZpc2libGUnO1xuZXhwb3J0IGNvbnN0IEhJRERFTiA9ICd3YXQtaGlkZGVuJztcbmV4cG9ydCBjb25zdCBBQ1RJVkUgPSAnd2F0LWFjdGl2ZSc7XG5leHBvcnQgY29uc3QgRE9XTl9BUlJPVyA9ICdhcnJvdy1kb3duJztcbmV4cG9ydCBjb25zdCBVUF9BUlJPVyA9ICdhcnJvdy11cCc7XG5leHBvcnQgY29uc3QgTEFZT1VUX0NPTlRBSU5FUiA9ICd3YXQtbGF5b3V0LWNvbnRhaW5lcic7XG5leHBvcnQgY29uc3QgTEFZT1VUX0RSQVdFUiA9ICd3YXQtbGF5b3V0LWRyYXdlcic7XG5leHBvcnQgY29uc3QgTEFZT1VUX0RSQVdFUl9DT05URU5UID0gJ3dhdC1sYXlvdXQtZHJhd2VyLWNvbnRlbnQnO1xuZXhwb3J0IGNvbnN0IExBWU9VVF9NQUlOID0gJ3dhdC1sYXlvdXQtbWFpbic7XG5leHBvcnQgY29uc3QgTEFZT1VUX01BSU5fQ09OVEVOVCA9ICd3YXQtbGF5b3V0LW1haW4tY29udGVudCc7XG5leHBvcnQgY29uc3QgTEFZT1VUX0FDVElPTl9BUkVBID0gJ3dhdC1sYXlvdXQtYWN0aW9uLWFyZWEnO1xuZXhwb3J0IGNvbnN0IExBWU9VVF9BQ1RJT05fQVJFQV9DT05URU5UID0gJ3dhdC1sYXlvdXQtYWN0aW9uLWFyZWEtY29udGVudCc7XG5leHBvcnQgY29uc3QgTEFZT1VUX01FTlVfQlVUVE9OID0gJ3dhdC1sYXlvdXQtbWVudS1idXR0b24nO1xuZXhwb3J0IGNvbnN0IExBWU9VVF9CQU5ORVIgPSAnd2F0LWxheW91dC1iYW5uZXInO1xuZXhwb3J0IGNvbnN0IExBWU9VVF9CQU5ORVJfSU1BR0UgPSAnd2F0LWxheW91dC1iYW5uZXItaW1hZ2UnO1xuZXhwb3J0IGNvbnN0IExBWU9VVF9EUkFXRVJfTkFWSUdBVElPTiA9ICd3YXQtbGF5b3V0LWRyYXdlci1uYXZpZ2F0aW9uJztcbmV4cG9ydCBjb25zdCBMQVlPVVRfRFJBV0VSX05BVklHQVRJT05fVElUTEUgPSAnd2F0LWxheW91dC1kcmF3ZXItbmF2aWdhdGlvbi10aXRsZSc7XG5leHBvcnQgY29uc3QgTEFZT1VUX0FDQ09VTlRfQVJFQSA9ICd3YXQtbGF5b3V0LWFjY291bnQtYXJlYSc7XG5leHBvcnQgY29uc3QgTEFZT1VUX0FDQ09VTlRfQVJFQV9USVRMRSA9ICd3YXQtbGF5b3V0LWFjY291bnQtYXJlYS10aXRsZSc7XG5leHBvcnQgY29uc3QgTEFZT1VUX0FDQ09VTlRfQVJFQV9UT0dHTEUgPSAnd2F0LWxheW91dC1hY2NvdW50LWFyZWEtdG9nZ2xlJztcbmV4cG9ydCBjb25zdCBMQVlPVVRfTk9USUZJQ0FUSU9OID0gJ3dhdC1sYXlvdXQtbm90aWZpY2F0aW9uJztcbmV4cG9ydCBjb25zdCBXQVRfS0lUX0FVVE9DT01QTEVURSA9ICd3YXQta2l0LWF1dG9jb21wbGV0ZSc7XG5leHBvcnQgY29uc3QgV0FUX0tJVF9BVVRPQ09NUExFVEVfQ09OVEFJTkVSID0gJ3dhdC1raXQtYXV0b2NvbXBsZXRlLWNvbnRhaW5lcic7XG5leHBvcnQgY29uc3QgV0FUX0tJVF9BVVRPQ09NUExFVEVfSU5QVVRfQVJFQSA9ICd3YXQta2l0LWF1dG9jb21wbGV0ZS1pbnB1dC1hcmVhJztcbmV4cG9ydCBjb25zdCBXQVRfS0lUX0FVVE9DT01QTEVURV9JTlBVVCA9ICd3YXQta2l0LWF1dG9jb21wbGV0ZS1pbnB1dCc7XG5leHBvcnQgY29uc3QgV0FUX0tJVF9BVVRPQ09NUExFVEVfT1BUSU9OUyA9ICd3YXQta2l0LWF1dG9jb21wbGV0ZS1vcHRpb25zJztcbmV4cG9ydCBjb25zdCBXQVRfQ09NUE9ORU5UU19TV0lUQ0ggPSAnd2F0LWNvbXBvbmVudHMtc3dpdGNoJztcbmV4cG9ydCBjb25zdCBXQVRfQ09NUE9ORU5UU19TV0lUQ0hfU0xJREVSID0gJ3dhdC1jb21wb25lbnRzLXN3aXRjaC1zbGlkZXInO1xuIiwiLyoqXG4gKiBOdWxsVmFyaWFibGUgZG9lcyBub3RoaW5nIC4uLiByZWFsbHkuXG4gKiBAaW1wbGVtZW50cyB7VmFyaWFibGV9XG4gKi9cbmNsYXNzIE51bGxWYXJpYWJsZSB7XG5cbiAgICBib29sZWFuKCkge1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfVxuXG4gICAgbnVtYmVyKCkge1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfVxuXG4gICAgc3RyaW5nKCkge1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfVxuXG4gICAgYXJyYXkoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICB9XG5cbiAgICBkYXRlKCkge1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfVxuXG4gICAgcmVnZXhwKCkge1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICB9XG5cbiAgICBvYmplY3QodmFsdWUsIG5hbWUpIHtcblxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgIH1cblxuICAgIGluc3RhbmNlKGNvbnMpIHtcblxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgIH1cblxuICAgIGludGVyZmFjZShJZmFjZSkge1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfVxuXG4gICAgZGVmYXVsdCAodmFsdWUpIHtcblxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgIH1cblxuICAgIG9wdGlvbmFsKHZhbHVlKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICB9XG5cblxufVxuXG5leHBvcnQgZGVmYXVsdCBOdWxsVmFyaWFibGVcbiIsImltcG9ydCBOdWxsVmFyaWFibGUgZnJvbSAnLi9OdWxsVmFyaWFibGUnO1xuXG4vKipcbiAqIFR5cGVkVmFyaWFibGVcbiAqIEBwYXJhbSB7b2JqZWN0fSBtYXBcbiAqIEBpbXBsZW1lbnRzIHtWYXJpYWJsZX1cbiAqL1xuY2xhc3MgVHlwZWRWYXJpYWJsZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihtYXApIHtcblxuICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG1hcCk7XG5cbiAgICAgICAgdGhpcy5uYW1lID0ga2V5c1swXTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IG1hcFtrZXlzWzBdXTtcblxuICAgIH1cblxuICAgIF90eXBlT2YodHlwZSkge1xuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy52YWx1ZSAhPT0gdHlwZSlcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYCcke3RoaXMubmFtZX0nIG11c3QgYmUgdHlwZW9mICcke3R5cGV9JyEgR290ICcke3R5cGVvZiB0aGlzLnZhbHVlfSchYCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICB9XG5cbiAgICBfcHJvdG8ocHJvdG8pIHtcblxuICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHRoaXMudmFsdWUpICE9PSBwcm90bylcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYCR7dGhpcy5uYW1lfSBtdXN0IGJlIHR5cGVvZiAke3Byb3RvfSEgR290ICR7dHlwZW9mIHRoaXMudmFsdWV9IWApO1xuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgIH1cblxuICAgIGJvb2xlYW4oKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX3R5cGVPZignYm9vbGVhbicpO1xuXG4gICAgfVxuXG4gICAgbnVtYmVyKCkge1xuXG4gICAgICAgIHJldHVybiB0aGlzLl90eXBlT2YoJ251bWJlcicpO1xuXG4gICAgfVxuXG4gICAgc3RyaW5nKCkge1xuXG4gICAgICAgIHJldHVybiB0aGlzLl90eXBlT2YoJ3N0cmluZycpO1xuXG4gICAgfVxuXG4gICAgYXJyYXkoKSB7XG5cbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHRoaXMudmFsdWUpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgJyR7dGhpcy5uYW1lfScgbXVzdCBiZSBhbiBhcnJheSEgR290ICcke3R5cGVvZiB0aGlzLnZhbHVlfSchYCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICB9XG5cbiAgICBkYXRlKCkge1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9wcm90bygnW29iamVjdCBEYXRlXScpO1xuXG4gICAgfVxuXG4gICAgcmVnZXhwKCkge1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9wcm90bygnW29iamVjdCBSZWdFeHBdJyk7XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbigpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5fdHlwZU9mKCdmdW5jdGlvbicpO1xuXG4gICAgfVxuXG4gICAgb2JqZWN0KHZhbHVlLCBuYW1lKSB7XG5cbiAgICAgICAgLy9BcnJheXMgYW5kIG51bGwgYXJlIG5vdCBvYmplY3RzIEkgZG9uJ3QgY2FyZSB3aGF0IHlvIG1hbWEgc2F5LlxuICAgICAgICBpZiAoKEFycmF5LmlzQXJyYXkodGhpcy52YWx1ZSkgfHwgdGhpcy52YWx1ZSA9PT0gbnVsbCkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGAke3RoaXMudmFsdWV9IG11c3QgYmUgdHlwZSBvZiBvYmplY3QhYCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX3R5cGVPZignb2JqZWN0Jyk7XG5cbiAgICB9XG5cbiAgICBpbnN0YW5jZShjb25zKSB7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb25zICE9PSAnZnVuY3Rpb24nKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgQ2Fubm90IGNoZWNrIGluc3RhbmNlIG9mIGFnYWluc3QgdHlwZSAnJHt0eXBlb2YgY29uc30nYCk7XG5cbiAgICAgICAgaWYgKHRoaXMudmFsdWUgaW5zdGFuY2VvZiBjb25zKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgQXJndW1lbnQgJyR7dGhpcy5uYW1lfScgbXVzdCBiZSBpbnN0YW5jZSBvZmAgK1xuICAgICAgICAgICAgYCAnJHtjb25zLm5hbWV9JyBnb3QgdHlwZSAnJHt0eXBlb2YgdGhpcy52YWx1ZX0nIWApO1xuXG4gICAgfVxuXG4gICAgaW50ZXJmYWNlKElmYWNlKSB7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBJZmFjZSAhPT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYENhbm5vdCB1c2UgdHlwZSAnJHt0eXBlb2YgSWZhY2V9JyBhcyBhbiBpbnRlcmZhY2UhYCk7XG5cbiAgICAgICAgdmFyIG8gPSBuZXcgSWZhY2UoKTtcbiAgICAgICAgdmFyIHByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG8pO1xuXG4gICAgICAgIHRoaXMuaW5zdGFuY2UoT2JqZWN0KTtcblxuICAgICAgICB2YXIgbWlzc2luZyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHByb3RvKS5cbiAgICAgICAgZmlsdGVyKGsgPT4gKGsgPT09ICdjb25zdHJ1Y3RvcicpID8gZmFsc2UgOlxuICAgICAgICAgICAgKHR5cGVvZiB0aGlzLnZhbHVlW2tdID09PSB0eXBlb2YgcHJvdG9ba10pID9cbiAgICAgICAgICAgIGZhbHNlIDpcbiAgICAgICAgICAgIHRydWUpO1xuXG4gICAgICAgIGlmIChtaXNzaW5nLmxlbmd0aCAhPT0gMCkge1xuXG4gICAgICAgICAgICB2YXIgbWV0aHMgPSBtaXNzaW5nLmpvaW4oJywnKTtcblxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgVmFsdWUgcGFzc2VkIGZvciBhcmd1bWVudCAnJHt0aGlzLm5hbWV9J2AgK1xuICAgICAgICAgICAgICAgIGAgKHR5cGUgOiAnJHt0eXBlb2YgdGhpcy52YWx1ZX0nKSBkb2VzIG5vdCBzYXRpc2Z5IGAgK1xuICAgICAgICAgICAgICAgIGBpbnRlcmZhY2UgJyR7by5jb25zdHJ1Y3Rvci5uYW1lfSchIE1pc3NpbmcgbWV0aG9kczogJHttZXRoc30hYCk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfVxuXG4gICAgZGVmYXVsdCAodmFsdWUpIHtcbiAgICAgICAgaWYgKFt1bmRlZmluZWQsIG51bGxdLmluZGV4T2YodGhpcy52YWx1ZSkgPiAtMSlcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBvcHRpb25hbCh2YWx1ZSkge1xuXG4gICAgICAgIGlmIChbdW5kZWZpbmVkLCBudWxsXS5pbmRleE9mKHRoaXMudmFsdWUpID4gLTEpXG4gICAgICAgICAgICByZXR1cm4gbmV3IE51bGxWYXJpYWJsZSgpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfVxuXG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgVHlwZWRWYXJpYWJsZVxuIiwiaW1wb3J0IFR5cGVkVmFyaWFibGUgZnJvbSAnLi9UeXBlZFZhcmlhYmxlJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYmVvZihvKSB7XG5cbiAgICByZXR1cm4gbmV3IFR5cGVkVmFyaWFibGUobyk7XG5cbn1cbiIsIi8qKlxuICogbG9kYXNoIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgalF1ZXJ5IEZvdW5kYXRpb24gYW5kIG90aGVyIGNvbnRyaWJ1dG9ycyA8aHR0cHM6Ly9qcXVlcnkub3JnLz5cbiAqIFJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqL1xuXG4vKiogVXNlZCBhcyB0aGUgYFR5cGVFcnJvcmAgbWVzc2FnZSBmb3IgXCJGdW5jdGlvbnNcIiBtZXRob2RzLiAqL1xudmFyIEZVTkNfRVJST1JfVEVYVCA9ICdFeHBlY3RlZCBhIGZ1bmN0aW9uJztcblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgTkFOID0gMCAvIDA7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1ib2xUYWcgPSAnW29iamVjdCBTeW1ib2xdJztcblxuLyoqIFVzZWQgdG8gbWF0Y2ggbGVhZGluZyBhbmQgdHJhaWxpbmcgd2hpdGVzcGFjZS4gKi9cbnZhciByZVRyaW0gPSAvXlxccyt8XFxzKyQvZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGJhZCBzaWduZWQgaGV4YWRlY2ltYWwgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUlzQmFkSGV4ID0gL15bLStdMHhbMC05YS1mXSskL2k7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBiaW5hcnkgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUlzQmluYXJ5ID0gL14wYlswMV0rJC9pO1xuXG4vKiogVXNlZCB0byBkZXRlY3Qgb2N0YWwgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUlzT2N0YWwgPSAvXjBvWzAtN10rJC9pO1xuXG4vKiogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgd2l0aG91dCBhIGRlcGVuZGVuY3kgb24gYHJvb3RgLiAqL1xudmFyIGZyZWVQYXJzZUludCA9IHBhcnNlSW50O1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCAmJiBnbG9iYWwuT2JqZWN0ID09PSBPYmplY3QgJiYgZ2xvYmFsO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHNlbGZgLiAqL1xudmFyIGZyZWVTZWxmID0gdHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZiAmJiBzZWxmLk9iamVjdCA9PT0gT2JqZWN0ICYmIHNlbGY7XG5cbi8qKiBVc2VkIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0LiAqL1xudmFyIHJvb3QgPSBmcmVlR2xvYmFsIHx8IGZyZWVTZWxmIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlTWF4ID0gTWF0aC5tYXgsXG4gICAgbmF0aXZlTWluID0gTWF0aC5taW47XG5cbi8qKlxuICogR2V0cyB0aGUgdGltZXN0YW1wIG9mIHRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRoYXQgaGF2ZSBlbGFwc2VkIHNpbmNlXG4gKiB0aGUgVW5peCBlcG9jaCAoMSBKYW51YXJ5IDE5NzAgMDA6MDA6MDAgVVRDKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDIuNC4wXG4gKiBAY2F0ZWdvcnkgRGF0ZVxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgdGltZXN0YW1wLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmRlZmVyKGZ1bmN0aW9uKHN0YW1wKSB7XG4gKiAgIGNvbnNvbGUubG9nKF8ubm93KCkgLSBzdGFtcCk7XG4gKiB9LCBfLm5vdygpKTtcbiAqIC8vID0+IExvZ3MgdGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgaXQgdG9vayBmb3IgdGhlIGRlZmVycmVkIGludm9jYXRpb24uXG4gKi9cbnZhciBub3cgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHJvb3QuRGF0ZS5ub3coKTtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhIGRlYm91bmNlZCBmdW5jdGlvbiB0aGF0IGRlbGF5cyBpbnZva2luZyBgZnVuY2AgdW50aWwgYWZ0ZXIgYHdhaXRgXG4gKiBtaWxsaXNlY29uZHMgaGF2ZSBlbGFwc2VkIHNpbmNlIHRoZSBsYXN0IHRpbWUgdGhlIGRlYm91bmNlZCBmdW5jdGlvbiB3YXNcbiAqIGludm9rZWQuIFRoZSBkZWJvdW5jZWQgZnVuY3Rpb24gY29tZXMgd2l0aCBhIGBjYW5jZWxgIG1ldGhvZCB0byBjYW5jZWxcbiAqIGRlbGF5ZWQgYGZ1bmNgIGludm9jYXRpb25zIGFuZCBhIGBmbHVzaGAgbWV0aG9kIHRvIGltbWVkaWF0ZWx5IGludm9rZSB0aGVtLlxuICogUHJvdmlkZSBgb3B0aW9uc2AgdG8gaW5kaWNhdGUgd2hldGhlciBgZnVuY2Agc2hvdWxkIGJlIGludm9rZWQgb24gdGhlXG4gKiBsZWFkaW5nIGFuZC9vciB0cmFpbGluZyBlZGdlIG9mIHRoZSBgd2FpdGAgdGltZW91dC4gVGhlIGBmdW5jYCBpcyBpbnZva2VkXG4gKiB3aXRoIHRoZSBsYXN0IGFyZ3VtZW50cyBwcm92aWRlZCB0byB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uLiBTdWJzZXF1ZW50XG4gKiBjYWxscyB0byB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uIHJldHVybiB0aGUgcmVzdWx0IG9mIHRoZSBsYXN0IGBmdW5jYFxuICogaW52b2NhdGlvbi5cbiAqXG4gKiAqKk5vdGU6KiogSWYgYGxlYWRpbmdgIGFuZCBgdHJhaWxpbmdgIG9wdGlvbnMgYXJlIGB0cnVlYCwgYGZ1bmNgIGlzXG4gKiBpbnZva2VkIG9uIHRoZSB0cmFpbGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0IG9ubHkgaWYgdGhlIGRlYm91bmNlZCBmdW5jdGlvblxuICogaXMgaW52b2tlZCBtb3JlIHRoYW4gb25jZSBkdXJpbmcgdGhlIGB3YWl0YCB0aW1lb3V0LlxuICpcbiAqIElmIGB3YWl0YCBpcyBgMGAgYW5kIGBsZWFkaW5nYCBpcyBgZmFsc2VgLCBgZnVuY2AgaW52b2NhdGlvbiBpcyBkZWZlcnJlZFxuICogdW50aWwgdG8gdGhlIG5leHQgdGljaywgc2ltaWxhciB0byBgc2V0VGltZW91dGAgd2l0aCBhIHRpbWVvdXQgb2YgYDBgLlxuICpcbiAqIFNlZSBbRGF2aWQgQ29yYmFjaG8ncyBhcnRpY2xlXShodHRwczovL2Nzcy10cmlja3MuY29tL2RlYm91bmNpbmctdGhyb3R0bGluZy1leHBsYWluZWQtZXhhbXBsZXMvKVxuICogZm9yIGRldGFpbHMgb3ZlciB0aGUgZGlmZmVyZW5jZXMgYmV0d2VlbiBgXy5kZWJvdW5jZWAgYW5kIGBfLnRocm90dGxlYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRlYm91bmNlLlxuICogQHBhcmFtIHtudW1iZXJ9IFt3YWl0PTBdIFRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRvIGRlbGF5LlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSBUaGUgb3B0aW9ucyBvYmplY3QuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmxlYWRpbmc9ZmFsc2VdXG4gKiAgU3BlY2lmeSBpbnZva2luZyBvbiB0aGUgbGVhZGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0LlxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm1heFdhaXRdXG4gKiAgVGhlIG1heGltdW0gdGltZSBgZnVuY2AgaXMgYWxsb3dlZCB0byBiZSBkZWxheWVkIGJlZm9yZSBpdCdzIGludm9rZWQuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLnRyYWlsaW5nPXRydWVdXG4gKiAgU3BlY2lmeSBpbnZva2luZyBvbiB0aGUgdHJhaWxpbmcgZWRnZSBvZiB0aGUgdGltZW91dC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGRlYm91bmNlZCBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogLy8gQXZvaWQgY29zdGx5IGNhbGN1bGF0aW9ucyB3aGlsZSB0aGUgd2luZG93IHNpemUgaXMgaW4gZmx1eC5cbiAqIGpRdWVyeSh3aW5kb3cpLm9uKCdyZXNpemUnLCBfLmRlYm91bmNlKGNhbGN1bGF0ZUxheW91dCwgMTUwKSk7XG4gKlxuICogLy8gSW52b2tlIGBzZW5kTWFpbGAgd2hlbiBjbGlja2VkLCBkZWJvdW5jaW5nIHN1YnNlcXVlbnQgY2FsbHMuXG4gKiBqUXVlcnkoZWxlbWVudCkub24oJ2NsaWNrJywgXy5kZWJvdW5jZShzZW5kTWFpbCwgMzAwLCB7XG4gKiAgICdsZWFkaW5nJzogdHJ1ZSxcbiAqICAgJ3RyYWlsaW5nJzogZmFsc2VcbiAqIH0pKTtcbiAqXG4gKiAvLyBFbnN1cmUgYGJhdGNoTG9nYCBpcyBpbnZva2VkIG9uY2UgYWZ0ZXIgMSBzZWNvbmQgb2YgZGVib3VuY2VkIGNhbGxzLlxuICogdmFyIGRlYm91bmNlZCA9IF8uZGVib3VuY2UoYmF0Y2hMb2csIDI1MCwgeyAnbWF4V2FpdCc6IDEwMDAgfSk7XG4gKiB2YXIgc291cmNlID0gbmV3IEV2ZW50U291cmNlKCcvc3RyZWFtJyk7XG4gKiBqUXVlcnkoc291cmNlKS5vbignbWVzc2FnZScsIGRlYm91bmNlZCk7XG4gKlxuICogLy8gQ2FuY2VsIHRoZSB0cmFpbGluZyBkZWJvdW5jZWQgaW52b2NhdGlvbi5cbiAqIGpRdWVyeSh3aW5kb3cpLm9uKCdwb3BzdGF0ZScsIGRlYm91bmNlZC5jYW5jZWwpO1xuICovXG5mdW5jdGlvbiBkZWJvdW5jZShmdW5jLCB3YWl0LCBvcHRpb25zKSB7XG4gIHZhciBsYXN0QXJncyxcbiAgICAgIGxhc3RUaGlzLFxuICAgICAgbWF4V2FpdCxcbiAgICAgIHJlc3VsdCxcbiAgICAgIHRpbWVySWQsXG4gICAgICBsYXN0Q2FsbFRpbWUsXG4gICAgICBsYXN0SW52b2tlVGltZSA9IDAsXG4gICAgICBsZWFkaW5nID0gZmFsc2UsXG4gICAgICBtYXhpbmcgPSBmYWxzZSxcbiAgICAgIHRyYWlsaW5nID0gdHJ1ZTtcblxuICBpZiAodHlwZW9mIGZ1bmMgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoRlVOQ19FUlJPUl9URVhUKTtcbiAgfVxuICB3YWl0ID0gdG9OdW1iZXIod2FpdCkgfHwgMDtcbiAgaWYgKGlzT2JqZWN0KG9wdGlvbnMpKSB7XG4gICAgbGVhZGluZyA9ICEhb3B0aW9ucy5sZWFkaW5nO1xuICAgIG1heGluZyA9ICdtYXhXYWl0JyBpbiBvcHRpb25zO1xuICAgIG1heFdhaXQgPSBtYXhpbmcgPyBuYXRpdmVNYXgodG9OdW1iZXIob3B0aW9ucy5tYXhXYWl0KSB8fCAwLCB3YWl0KSA6IG1heFdhaXQ7XG4gICAgdHJhaWxpbmcgPSAndHJhaWxpbmcnIGluIG9wdGlvbnMgPyAhIW9wdGlvbnMudHJhaWxpbmcgOiB0cmFpbGluZztcbiAgfVxuXG4gIGZ1bmN0aW9uIGludm9rZUZ1bmModGltZSkge1xuICAgIHZhciBhcmdzID0gbGFzdEFyZ3MsXG4gICAgICAgIHRoaXNBcmcgPSBsYXN0VGhpcztcblxuICAgIGxhc3RBcmdzID0gbGFzdFRoaXMgPSB1bmRlZmluZWQ7XG4gICAgbGFzdEludm9rZVRpbWUgPSB0aW1lO1xuICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkodGhpc0FyZywgYXJncyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxlYWRpbmdFZGdlKHRpbWUpIHtcbiAgICAvLyBSZXNldCBhbnkgYG1heFdhaXRgIHRpbWVyLlxuICAgIGxhc3RJbnZva2VUaW1lID0gdGltZTtcbiAgICAvLyBTdGFydCB0aGUgdGltZXIgZm9yIHRoZSB0cmFpbGluZyBlZGdlLlxuICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCwgd2FpdCk7XG4gICAgLy8gSW52b2tlIHRoZSBsZWFkaW5nIGVkZ2UuXG4gICAgcmV0dXJuIGxlYWRpbmcgPyBpbnZva2VGdW5jKHRpbWUpIDogcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtYWluaW5nV2FpdCh0aW1lKSB7XG4gICAgdmFyIHRpbWVTaW5jZUxhc3RDYWxsID0gdGltZSAtIGxhc3RDYWxsVGltZSxcbiAgICAgICAgdGltZVNpbmNlTGFzdEludm9rZSA9IHRpbWUgLSBsYXN0SW52b2tlVGltZSxcbiAgICAgICAgcmVzdWx0ID0gd2FpdCAtIHRpbWVTaW5jZUxhc3RDYWxsO1xuXG4gICAgcmV0dXJuIG1heGluZyA/IG5hdGl2ZU1pbihyZXN1bHQsIG1heFdhaXQgLSB0aW1lU2luY2VMYXN0SW52b2tlKSA6IHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNob3VsZEludm9rZSh0aW1lKSB7XG4gICAgdmFyIHRpbWVTaW5jZUxhc3RDYWxsID0gdGltZSAtIGxhc3RDYWxsVGltZSxcbiAgICAgICAgdGltZVNpbmNlTGFzdEludm9rZSA9IHRpbWUgLSBsYXN0SW52b2tlVGltZTtcblxuICAgIC8vIEVpdGhlciB0aGlzIGlzIHRoZSBmaXJzdCBjYWxsLCBhY3Rpdml0eSBoYXMgc3RvcHBlZCBhbmQgd2UncmUgYXQgdGhlXG4gICAgLy8gdHJhaWxpbmcgZWRnZSwgdGhlIHN5c3RlbSB0aW1lIGhhcyBnb25lIGJhY2t3YXJkcyBhbmQgd2UncmUgdHJlYXRpbmdcbiAgICAvLyBpdCBhcyB0aGUgdHJhaWxpbmcgZWRnZSwgb3Igd2UndmUgaGl0IHRoZSBgbWF4V2FpdGAgbGltaXQuXG4gICAgcmV0dXJuIChsYXN0Q2FsbFRpbWUgPT09IHVuZGVmaW5lZCB8fCAodGltZVNpbmNlTGFzdENhbGwgPj0gd2FpdCkgfHxcbiAgICAgICh0aW1lU2luY2VMYXN0Q2FsbCA8IDApIHx8IChtYXhpbmcgJiYgdGltZVNpbmNlTGFzdEludm9rZSA+PSBtYXhXYWl0KSk7XG4gIH1cblxuICBmdW5jdGlvbiB0aW1lckV4cGlyZWQoKSB7XG4gICAgdmFyIHRpbWUgPSBub3coKTtcbiAgICBpZiAoc2hvdWxkSW52b2tlKHRpbWUpKSB7XG4gICAgICByZXR1cm4gdHJhaWxpbmdFZGdlKHRpbWUpO1xuICAgIH1cbiAgICAvLyBSZXN0YXJ0IHRoZSB0aW1lci5cbiAgICB0aW1lcklkID0gc2V0VGltZW91dCh0aW1lckV4cGlyZWQsIHJlbWFpbmluZ1dhaXQodGltZSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gdHJhaWxpbmdFZGdlKHRpbWUpIHtcbiAgICB0aW1lcklkID0gdW5kZWZpbmVkO1xuXG4gICAgLy8gT25seSBpbnZva2UgaWYgd2UgaGF2ZSBgbGFzdEFyZ3NgIHdoaWNoIG1lYW5zIGBmdW5jYCBoYXMgYmVlblxuICAgIC8vIGRlYm91bmNlZCBhdCBsZWFzdCBvbmNlLlxuICAgIGlmICh0cmFpbGluZyAmJiBsYXN0QXJncykge1xuICAgICAgcmV0dXJuIGludm9rZUZ1bmModGltZSk7XG4gICAgfVxuICAgIGxhc3RBcmdzID0gbGFzdFRoaXMgPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNhbmNlbCgpIHtcbiAgICBpZiAodGltZXJJZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZXJJZCk7XG4gICAgfVxuICAgIGxhc3RJbnZva2VUaW1lID0gMDtcbiAgICBsYXN0QXJncyA9IGxhc3RDYWxsVGltZSA9IGxhc3RUaGlzID0gdGltZXJJZCA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZsdXNoKCkge1xuICAgIHJldHVybiB0aW1lcklkID09PSB1bmRlZmluZWQgPyByZXN1bHQgOiB0cmFpbGluZ0VkZ2Uobm93KCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVib3VuY2VkKCkge1xuICAgIHZhciB0aW1lID0gbm93KCksXG4gICAgICAgIGlzSW52b2tpbmcgPSBzaG91bGRJbnZva2UodGltZSk7XG5cbiAgICBsYXN0QXJncyA9IGFyZ3VtZW50cztcbiAgICBsYXN0VGhpcyA9IHRoaXM7XG4gICAgbGFzdENhbGxUaW1lID0gdGltZTtcblxuICAgIGlmIChpc0ludm9raW5nKSB7XG4gICAgICBpZiAodGltZXJJZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBsZWFkaW5nRWRnZShsYXN0Q2FsbFRpbWUpO1xuICAgICAgfVxuICAgICAgaWYgKG1heGluZykge1xuICAgICAgICAvLyBIYW5kbGUgaW52b2NhdGlvbnMgaW4gYSB0aWdodCBsb29wLlxuICAgICAgICB0aW1lcklkID0gc2V0VGltZW91dCh0aW1lckV4cGlyZWQsIHdhaXQpO1xuICAgICAgICByZXR1cm4gaW52b2tlRnVuYyhsYXN0Q2FsbFRpbWUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGltZXJJZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aW1lcklkID0gc2V0VGltZW91dCh0aW1lckV4cGlyZWQsIHdhaXQpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIGRlYm91bmNlZC5jYW5jZWwgPSBjYW5jZWw7XG4gIGRlYm91bmNlZC5mbHVzaCA9IGZsdXNoO1xuICByZXR1cm4gZGVib3VuY2VkO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSB0aHJvdHRsZWQgZnVuY3Rpb24gdGhhdCBvbmx5IGludm9rZXMgYGZ1bmNgIGF0IG1vc3Qgb25jZSBwZXJcbiAqIGV2ZXJ5IGB3YWl0YCBtaWxsaXNlY29uZHMuIFRoZSB0aHJvdHRsZWQgZnVuY3Rpb24gY29tZXMgd2l0aCBhIGBjYW5jZWxgXG4gKiBtZXRob2QgdG8gY2FuY2VsIGRlbGF5ZWQgYGZ1bmNgIGludm9jYXRpb25zIGFuZCBhIGBmbHVzaGAgbWV0aG9kIHRvXG4gKiBpbW1lZGlhdGVseSBpbnZva2UgdGhlbS4gUHJvdmlkZSBgb3B0aW9uc2AgdG8gaW5kaWNhdGUgd2hldGhlciBgZnVuY2BcbiAqIHNob3VsZCBiZSBpbnZva2VkIG9uIHRoZSBsZWFkaW5nIGFuZC9vciB0cmFpbGluZyBlZGdlIG9mIHRoZSBgd2FpdGBcbiAqIHRpbWVvdXQuIFRoZSBgZnVuY2AgaXMgaW52b2tlZCB3aXRoIHRoZSBsYXN0IGFyZ3VtZW50cyBwcm92aWRlZCB0byB0aGVcbiAqIHRocm90dGxlZCBmdW5jdGlvbi4gU3Vic2VxdWVudCBjYWxscyB0byB0aGUgdGhyb3R0bGVkIGZ1bmN0aW9uIHJldHVybiB0aGVcbiAqIHJlc3VsdCBvZiB0aGUgbGFzdCBgZnVuY2AgaW52b2NhdGlvbi5cbiAqXG4gKiAqKk5vdGU6KiogSWYgYGxlYWRpbmdgIGFuZCBgdHJhaWxpbmdgIG9wdGlvbnMgYXJlIGB0cnVlYCwgYGZ1bmNgIGlzXG4gKiBpbnZva2VkIG9uIHRoZSB0cmFpbGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0IG9ubHkgaWYgdGhlIHRocm90dGxlZCBmdW5jdGlvblxuICogaXMgaW52b2tlZCBtb3JlIHRoYW4gb25jZSBkdXJpbmcgdGhlIGB3YWl0YCB0aW1lb3V0LlxuICpcbiAqIElmIGB3YWl0YCBpcyBgMGAgYW5kIGBsZWFkaW5nYCBpcyBgZmFsc2VgLCBgZnVuY2AgaW52b2NhdGlvbiBpcyBkZWZlcnJlZFxuICogdW50aWwgdG8gdGhlIG5leHQgdGljaywgc2ltaWxhciB0byBgc2V0VGltZW91dGAgd2l0aCBhIHRpbWVvdXQgb2YgYDBgLlxuICpcbiAqIFNlZSBbRGF2aWQgQ29yYmFjaG8ncyBhcnRpY2xlXShodHRwczovL2Nzcy10cmlja3MuY29tL2RlYm91bmNpbmctdGhyb3R0bGluZy1leHBsYWluZWQtZXhhbXBsZXMvKVxuICogZm9yIGRldGFpbHMgb3ZlciB0aGUgZGlmZmVyZW5jZXMgYmV0d2VlbiBgXy50aHJvdHRsZWAgYW5kIGBfLmRlYm91bmNlYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHRocm90dGxlLlxuICogQHBhcmFtIHtudW1iZXJ9IFt3YWl0PTBdIFRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRvIHRocm90dGxlIGludm9jYXRpb25zIHRvLlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSBUaGUgb3B0aW9ucyBvYmplY3QuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmxlYWRpbmc9dHJ1ZV1cbiAqICBTcGVjaWZ5IGludm9raW5nIG9uIHRoZSBsZWFkaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLnRyYWlsaW5nPXRydWVdXG4gKiAgU3BlY2lmeSBpbnZva2luZyBvbiB0aGUgdHJhaWxpbmcgZWRnZSBvZiB0aGUgdGltZW91dC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IHRocm90dGxlZCBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogLy8gQXZvaWQgZXhjZXNzaXZlbHkgdXBkYXRpbmcgdGhlIHBvc2l0aW9uIHdoaWxlIHNjcm9sbGluZy5cbiAqIGpRdWVyeSh3aW5kb3cpLm9uKCdzY3JvbGwnLCBfLnRocm90dGxlKHVwZGF0ZVBvc2l0aW9uLCAxMDApKTtcbiAqXG4gKiAvLyBJbnZva2UgYHJlbmV3VG9rZW5gIHdoZW4gdGhlIGNsaWNrIGV2ZW50IGlzIGZpcmVkLCBidXQgbm90IG1vcmUgdGhhbiBvbmNlIGV2ZXJ5IDUgbWludXRlcy5cbiAqIHZhciB0aHJvdHRsZWQgPSBfLnRocm90dGxlKHJlbmV3VG9rZW4sIDMwMDAwMCwgeyAndHJhaWxpbmcnOiBmYWxzZSB9KTtcbiAqIGpRdWVyeShlbGVtZW50KS5vbignY2xpY2snLCB0aHJvdHRsZWQpO1xuICpcbiAqIC8vIENhbmNlbCB0aGUgdHJhaWxpbmcgdGhyb3R0bGVkIGludm9jYXRpb24uXG4gKiBqUXVlcnkod2luZG93KS5vbigncG9wc3RhdGUnLCB0aHJvdHRsZWQuY2FuY2VsKTtcbiAqL1xuZnVuY3Rpb24gdGhyb3R0bGUoZnVuYywgd2FpdCwgb3B0aW9ucykge1xuICB2YXIgbGVhZGluZyA9IHRydWUsXG4gICAgICB0cmFpbGluZyA9IHRydWU7XG5cbiAgaWYgKHR5cGVvZiBmdW5jICE9ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKEZVTkNfRVJST1JfVEVYVCk7XG4gIH1cbiAgaWYgKGlzT2JqZWN0KG9wdGlvbnMpKSB7XG4gICAgbGVhZGluZyA9ICdsZWFkaW5nJyBpbiBvcHRpb25zID8gISFvcHRpb25zLmxlYWRpbmcgOiBsZWFkaW5nO1xuICAgIHRyYWlsaW5nID0gJ3RyYWlsaW5nJyBpbiBvcHRpb25zID8gISFvcHRpb25zLnRyYWlsaW5nIDogdHJhaWxpbmc7XG4gIH1cbiAgcmV0dXJuIGRlYm91bmNlKGZ1bmMsIHdhaXQsIHtcbiAgICAnbGVhZGluZyc6IGxlYWRpbmcsXG4gICAgJ21heFdhaXQnOiB3YWl0LFxuICAgICd0cmFpbGluZyc6IHRyYWlsaW5nXG4gIH0pO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZVxuICogW2xhbmd1YWdlIHR5cGVdKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1lY21hc2NyaXB0LWxhbmd1YWdlLXR5cGVzKVxuICogb2YgYE9iamVjdGAuIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChfLm5vb3ApO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICEhdmFsdWUgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBTeW1ib2xgIHByaW1pdGl2ZSBvciBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBzeW1ib2wsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1N5bWJvbChTeW1ib2wuaXRlcmF0b3IpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNTeW1ib2woJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTeW1ib2wodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnc3ltYm9sJyB8fFxuICAgIChpc09iamVjdExpa2UodmFsdWUpICYmIG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpID09IHN5bWJvbFRhZyk7XG59XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIG51bWJlci5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIG51bWJlci5cbiAqIEBleGFtcGxlXG4gKlxuICogXy50b051bWJlcigzLjIpO1xuICogLy8gPT4gMy4yXG4gKlxuICogXy50b051bWJlcihOdW1iZXIuTUlOX1ZBTFVFKTtcbiAqIC8vID0+IDVlLTMyNFxuICpcbiAqIF8udG9OdW1iZXIoSW5maW5pdHkpO1xuICogLy8gPT4gSW5maW5pdHlcbiAqXG4gKiBfLnRvTnVtYmVyKCczLjInKTtcbiAqIC8vID0+IDMuMlxuICovXG5mdW5jdGlvbiB0b051bWJlcih2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIGlmIChpc1N5bWJvbCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gTkFOO1xuICB9XG4gIGlmIChpc09iamVjdCh2YWx1ZSkpIHtcbiAgICB2YXIgb3RoZXIgPSB0eXBlb2YgdmFsdWUudmFsdWVPZiA9PSAnZnVuY3Rpb24nID8gdmFsdWUudmFsdWVPZigpIDogdmFsdWU7XG4gICAgdmFsdWUgPSBpc09iamVjdChvdGhlcikgPyAob3RoZXIgKyAnJykgOiBvdGhlcjtcbiAgfVxuICBpZiAodHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSAwID8gdmFsdWUgOiArdmFsdWU7XG4gIH1cbiAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKHJlVHJpbSwgJycpO1xuICB2YXIgaXNCaW5hcnkgPSByZUlzQmluYXJ5LnRlc3QodmFsdWUpO1xuICByZXR1cm4gKGlzQmluYXJ5IHx8IHJlSXNPY3RhbC50ZXN0KHZhbHVlKSlcbiAgICA/IGZyZWVQYXJzZUludCh2YWx1ZS5zbGljZSgyKSwgaXNCaW5hcnkgPyAyIDogOClcbiAgICA6IChyZUlzQmFkSGV4LnRlc3QodmFsdWUpID8gTkFOIDogK3ZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0aHJvdHRsZTtcbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gbm9wKCl7fVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5vcDtcbiIsImZ1bmN0aW9uIGJvdW5kYXJ5X3RvX2RvdCh2YWx1ZSkge1xuXHRyZXR1cm4gdmFsdWUuc3BsaXQoJ11bJykuam9pbignLicpLnNwbGl0KCdbJykuam9pbignLicpO1xufVxuXG5mdW5jdGlvbiBzdHJpcF9icmFjZXModmFsdWUpIHtcblx0cmV0dXJuIHZhbHVlLnNwbGl0KCdbJykuam9pbignLicpLnNwbGl0KCddJykuam9pbignJyk7XG59XG5cbmZ1bmN0aW9uIGVzY2FwZV9kb3RzKHZhbHVlKSB7XG5cdHZhbHVlID0gdmFsdWUuc3BsaXQoJ1xcJycpO1xuXHRyZXR1cm4gKHZhbHVlLmxlbmd0aCA8IDMpID8gdmFsdWUuam9pbignXFwnJykgOiB2YWx1ZS5tYXAoZnVuY3Rpb24oc2VnKSB7XG5cdFx0aWYgKHNlZy5sZW5ndGggPCAzKSByZXR1cm4gc2VnO1xuXHRcdGlmICgoc2VnWzBdID09PSAnLicpIHx8IChzZWdbc2VnLmxlbmd0aCAtIDFdID09PSAnLicpKSByZXR1cm4gc2VnO1xuXHRcdHJldHVybiBzZWcuc3BsaXQoJy4nKS5qb2luKCcmJicpO1xuXHR9KS5qb2luKCcnKTtcbn1cblxuZnVuY3Rpb24gdW5lc2NhcGVfZG90cyh2YWx1ZSkge1xuXHRyZXR1cm4gdmFsdWUuc3BsaXQoJyYmJykuam9pbignLicpO1xufVxuXG5mdW5jdGlvbiBwYXJ0aWZ5KHZhbHVlKSB7XG5cdGlmICghdmFsdWUpIHJldHVybiAnJztcblx0cmV0dXJuIGVzY2FwZV9kb3RzKHN0cmlwX2JyYWNlcyhib3VuZGFyeV90b19kb3QoJycgKyB2YWx1ZSkpKS5zcGxpdCgnLicpO1xufVxuXG52YXIgZ2V0ID0gZnVuY3Rpb24obywgcGF0aCkge1xuXG5cdHZhciBwYXJ0cyA9IHBhcnRpZnkocGF0aCk7XG5cdGlmIChwYXJ0cy5sZW5ndGggPT09IDEpIHJldHVybiBvW3VuZXNjYXBlX2RvdHMocGFydHNbMF0pXTtcblx0aWYgKHBhcnRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXG5cdHZhciBmaXJzdCA9IG9bcGFydHMuc2hpZnQoKV07XG5cblx0cmV0dXJuIHBhcnRzLnJlZHVjZShmdW5jdGlvbih0YXJnZXQsIHByb3ApIHtcblx0XHRpZiAoIXRhcmdldCkgcmV0dXJuIHRhcmdldDtcblx0XHRyZXR1cm4gdGFyZ2V0W3VuZXNjYXBlX2RvdHMocHJvcCldO1xuXHR9LCBmaXJzdCk7XG59O1xuXG5nZXQuc2V0ID0gZnVuY3Rpb24ob2JqLCBwYXRoLCB2YWx1ZSkge1xuXHR2YXIgcGFydHMgPSBwYXJ0aWZ5KHBhdGgpO1xuXHRwYXJ0cy5yZWR1Y2UoZnVuY3Rpb24odGFyZ2V0LCBwcm9wLCBpKSB7XG5cdFx0cHJvcCA9IHVuZXNjYXBlX2RvdHMocHJvcCk7XG5cdFx0aWYgKHBhcnRzLmxlbmd0aCAtIDEgPT09IGkpIHtcblx0XHRcdHRhcmdldFtwcm9wXSA9IHZhbHVlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0YXJnZXRbcHJvcF0gPSB0YXJnZXRbcHJvcF0gfHwge307XG5cdFx0fVxuXHRcdHJldHVybiB0YXJnZXRbcHJvcF07XG5cblxuXHR9LCBvYmopO1xuXG5cdHJldHVybiBvYmo7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGdldDtcbm1vZHVsZS5leHBvcnRzLmdldCA9IGdldDtcbiIsImltcG9ydCB7IFZpZXcsIFdpZGdldCB9IGZyb20gJ3dtbGpzL2xpYi9ydW50aW1lJztcbmltcG9ydCBsYXlvdXQgZnJvbSAnLi93bWwvY29sdW1uLndtbCc7XG5cbi8qKlxuICogQ29sdW1uXG4gKi9cbmNsYXNzIENvbHVtbiBleHRlbmRzIFdpZGdldCB7XG5cbiAgICBjb25zdHJ1Y3RvcihhdHRycywgY2hpbGRyZW4pIHtcblxuICAgICAgICBzdXBlcihhdHRycywgY2hpbGRyZW4pO1xuXG4gICAgICAgIHRoaXMuY2xhc3NOYW1lID0gYXR0cnMucmVhZCgnd2F0OmNsYXNzJywgJ2NvbC1tZC0xMicpO1xuXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiBWaWV3LnJlbmRlcihsYXlvdXQsIHRoaXMpO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IENvbHVtblxuIiwiaW1wb3J0IHsgVmlldywgV2lkZ2V0IH0gZnJvbSAnd21sanMvbGliL3J1bnRpbWUnO1xuaW1wb3J0IGxheW91dCBmcm9tICcuL3dtbC9jb250YWluZXIud21sJztcblxuLyoqXG4gKiBDb250YWluZXJcbiAqL1xuY2xhc3MgQ29udGFpbmVyIGV4dGVuZHMgV2lkZ2V0IHtcblxuICAgIGNvbnN0cnVjdG9yKGF0dHJzLCBjaGlsZHJlbikge1xuXG4gICAgICAgIHN1cGVyKGF0dHJzLCBjaGlsZHJlbik7XG5cbiAgICAgICAgdGhpcy5jbGFzc05hbWUgPSAoJ2NvbnRhaW5lci1mbHVpZCAnK2F0dHJzLnJlYWQoJ3dhdDpjbGFzcycsICcnKSkudHJpbSgpO1xuXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiBWaWV3LnJlbmRlcihsYXlvdXQsIHRoaXMpO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IENvbnRhaW5lclxuIiwiaW1wb3J0IHsgVmlldywgV2lkZ2V0IH0gZnJvbSAnd21sanMvbGliL3J1bnRpbWUnO1xuaW1wb3J0IGxheW91dCBmcm9tICcuL3dtbC9yb3cud21sJztcblxuLyoqXG4gKiBSb3dcbiAqL1xuY2xhc3MgUm93IGV4dGVuZHMgV2lkZ2V0IHtcblxuICAgIGNvbnN0cnVjdG9yKGF0dHJzLCBjaGlsZHJlbikge1xuXG4gICAgICAgIHN1cGVyKGF0dHJzLCBjaGlsZHJlbik7XG5cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIFZpZXcucmVuZGVyKGxheW91dCwgdGhpcyk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgUm93XG4iLCJpbXBvcnQgeyBWaWV3LCBXaWRnZXQgfSBmcm9tICd3bWxqcy9saWIvcnVudGltZSc7XG5cbi8qKlxuICogVGFibGVcbiAqL1xuY2xhc3MgVGFibGUgZXh0ZW5kcyBXaWRnZXQge1xuXG4gICAgY29uc3RydWN0b3IoYXR0cnMsIGNoaWxkcmVuKSB7XG5cbiAgICAgICAgc3VwZXIoYXR0cnMsIGNoaWxkcmVuKTtcblxuICAgICAgICB0aGlzLmRhdGEgPSBhdHRycy5ucy5icy5kYXRhO1xuICAgICAgICB0aGlzLl9sYXlvdXQgPSBhdHRycy5ucy5icy5sYXlvdXQ7XG4gICAgICAgIHRoaXMuZmllbGRzID0gYXR0cnMubnMuYnMuZmllbGRzIHx8IFtdO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcm93Q2xpY2tlZFxuICAgICAqL1xuICAgIHJvd0NsaWNrZWQoZSkge1xuXG4gICAgICAgIGlmICh0aGlzLmF0dHJpYnV0ZXMubnMpXG4gICAgICAgICAgICBpZiAodGhpcy5hdHRyaWJ1dGVzLm5zLmJzLm9uUm93Q2xpY2tlZClcbiAgICAgICAgICAgICAgICB0aGlzLmF0dHJpYnV0ZXMubnMuYnMub25Sb3dDbGlja2VkKGUsIHRoaXMpO1xuXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGlmICghdGhpcy5fbGF5b3V0KSB0aHJvdyBuZXcgRXJyb3IoJ1RhYmxlOiBMYXlvdXQgbm90IHNwZWNpZmllZCEnKTtcblxuICAgICAgICByZXR1cm4gKG5ldyBWaWV3KHRoaXMuX2xheW91dCwgdGhpcykpLnJlbmRlcigpO1xuXG4gICAgfVxuXG59XG5leHBvcnQgZGVmYXVsdCBUYWJsZVxuIiwiaW1wb3J0IHsgVmlldywgV2lkZ2V0IH0gZnJvbSAnd21sanMvbGliL3J1bnRpbWUnO1xuaW1wb3J0IHByb3BlcnR5IGZyb20gJ3Byb3BlcnR5LXNlZWsnO1xuaW1wb3J0IHRocm90dGxlIGZyb20gJ2xvZGFzaC50aHJvdHRsZSc7XG5pbXBvcnQgbm9wIGZyb20gJ25vcCc7XG5pbXBvcnQgbGF5b3V0IGZyb20gJy4vd21sL2xheW91dC53bWwnO1xuaW1wb3J0IFJlc3REZWxlZ2F0ZSBmcm9tICcuL1Jlc3REZWxlZ2F0ZSc7XG5pbXBvcnQgU2VhcmNoRGVsZWdhdGUgZnJvbSAnLi9TZWFyY2hEZWxlZ2F0ZSc7XG5pbXBvcnQgU2VsZWN0aW9uRGVsZWdhdGUgZnJvbSAnLi9TZWxlY3Rpb25EZWxlZ2F0ZSc7XG5pbXBvcnQgUG9wdWxhdGVkRGVsZWdhdGUgZnJvbSAnLi9Qb3B1bGF0ZWREZWxlZ2F0ZSc7XG5cbmNsYXNzIEF1dG9jb21wbGV0ZSBleHRlbmRzIFdpZGdldCB7XG5cbiAgICBjb25zdHJ1Y3RvcihhdHRycywgY2hpbGRyZW4pIHtcblxuICAgICAgICBzdXBlcihhdHRycywgY2hpbGRyZW4pO1xuXG4gICAgICAgIHRoaXMuY2hvaWNlID0gbnVsbDtcbiAgICAgICAgdGhpcy52aWV3ID0gbmV3IFZpZXcobGF5b3V0LCB0aGlzKTtcbiAgICAgICAgdGhpcy5yZXN0RGVsZWdhdGUgPSBuZXcgUmVzdERlbGVnYXRlKHRoaXMpO1xuICAgICAgICB0aGlzLnNlYXJjaERlbGVnYXRlID0gbmV3IFNlYXJjaERlbGVnYXRlKHRoaXMpO1xuICAgICAgICB0aGlzLnNlbGVjdGlvbkRlbGVnYXRlID0gbmV3IFNlbGVjdGlvbkRlbGVnYXRlKHRoaXMpO1xuICAgICAgICB0aGlzLnBvcHVsYXRlZERlbGVnYXRlID0gbmV3IFBvcHVsYXRlZERlbGVnYXRlKHRoaXMpO1xuICAgICAgICB0aGlzLmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgICB0aGlzLnNlYXJjaCA9IHRocm90dGxlKGlucHV0ID0+IHtcblxuICAgICAgICAgICAgYXR0cnMucmVhZCgnd2F0OnNlYXJjaCcsIG5vcCkoaW5wdXQudmFsdWUsIHRoaXMpO1xuXG4gICAgICAgIH0sIDUwMCk7XG5cbiAgICB9XG5cbiAgICBvblJlbmRlcmVkKCkge1xuXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcyk7XG5cbiAgICB9XG5cbiAgICBoYW5kbGVFdmVudChlKSB7XG5cbiAgICAgICAgaWYgKCF0aGlzLnZpZXcuZmluZEJ5SWQoJ3Jvb3QnKS5jb250YWlucyhlLnRhcmdldCkpIHtcbiAgICAgICAgICAgIHRoaXMudG9SZXN0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWRvY3VtZW50LmJvZHkuY29udGFpbnModGhpcy52aWV3LmZpbmRCeUlkKCdyb290JykpKVxuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzKTtcblxuICAgIH1cblxuICAgIGhhbmRsZUtleVVwKGUpIHtcblxuICAgICAgICB0aGlzLmRlbGVnYXRlLmhhbmRsZUtleVVwKGUpO1xuXG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93bihlKSB7XG5cbiAgICAgICAgdGhpcy5kZWxlZ2F0ZS5oYW5kbGVLZXlEb3duKGUpO1xuXG4gICAgfVxuXG4gICAgaGFuZGxlSW5wdXQoZSkge1xuXG4gICAgICAgIC8vRm9yIGNvbXBhdGFiaWxpdHkgcmVhc29uc1xuICAgICAgICBlLnRhcmdldC5vbmtleWRvd24gPSBudWxsO1xuICAgICAgICB0aGlzLmhhbmRsZUtleURvd24oZSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzZWxlY3RlZCBpcyBjYWxsZWQgd2hlbiBhbiBvcHRpb24gaGFzIGJlZW4gY2xpY2tlZCBvblxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleFxuICAgICAqL1xuICAgIHNlbGVjdGVkKGluZGV4KSB7XG5cbiAgICAgICAgdGhpcy5kZWxlZ2F0ZS5zZWxlY3RlZChpbmRleCk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiB0b1Jlc3QgbWFrZXMgdGhlIEF1dG9jb21wbGV0ZSBiZWhhdmUuXG4gICAgICovXG4gICAgdG9SZXN0KCkge1xuXG4gICAgICAgIHRoaXMuZGVsZWdhdGUgPSB0aGlzLnJlc3REZWxlZ2F0ZTtcbiAgICAgICAgdGhpcy5kZWxlZ2F0ZS5yZW5kZXIoKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHRvU2VhcmNoIHRyYW5zaXRpb25zIHRoZSBBdXRvY29tcGxldGUgdG8gdGhlIHNlYXJjaCBwaGFzZS5cbiAgICAgKi9cbiAgICB0b1NlYXJjaCgpIHtcblxuICAgICAgICB0aGlzLmRlbGVnYXRlID0gdGhpcy5zZWFyY2hEZWxlZ2F0ZTtcbiAgICAgICAgdGhpcy5kZWxlZ2F0ZS5yZW5kZXIoKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHRvU2VsZWN0aW9uIHRyYW5zaXRpb25zIHRoZSBhdXRvY29tcGxldGUgdG8gdGhlIHNlbGVjdGlvbiBwaGFzZVxuICAgICAqL1xuICAgIHRvU2VsZWN0aW9uKCkge1xuXG4gICAgICAgIHRoaXMuZGVsZWdhdGUgPSB0aGlzLnNlbGVjdGlvbkRlbGVnYXRlO1xuICAgICAgICB0aGlzLmRlbGVnYXRlLnJlbmRlcigpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogdG9Qb3B1bGF0ZWQgdHJhbnNpdGlvbnMgdGhlIGF1dG9jb21wbGV0ZSB0byBhIHBvcHVsYXRlIHN0YXRlXG4gICAgICogaWYgaXMgaW5pdGlhbGl6ZWQgd2l0aCBhIHZhbHVlXG4gICAgICovXG4gICAgdG9Qb3B1bGF0ZWQoKSB7XG5cbiAgICAgICAgdGhpcy5kZWxlZ2F0ZSA9IHRoaXMucG9wdWxhdGVkRGVsZWdhdGU7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUucmVuZGVyKCk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiB1cGRhdGUgdGhlIG9wdGlvbnMgZGlzcGxheWVkIHRvIHRoZSB1c2VyXG4gICAgICogQHBhcmFtIHthcnJheTxvYmplY3Q+fSBpdGVtc1xuICAgICAqL1xuICAgIHVwZGF0ZShpdGVtcykge1xuXG4gICAgICAgIHRoaXMuZGVsZWdhdGUudXBkYXRlKGl0ZW1zKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHNldCB0aGUgdmFsdWUgb2YgdGhlIGlucHV0XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gICAgICogQHJldHVybnMge0F1dG9jb21wbGV0ZX1cbiAgICAgKi9cbiAgICBzZXQodmFsdWUpIHtcblxuICAgICAgICB0aGlzLnZpZXcuZmluZEJ5SWQoJ2lucHV0JykudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgdmFyIHRyZWUgPSB0aGlzLnZpZXcucmVuZGVyKCk7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUgPSAodGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDp2YWx1ZScpKSA/IHRoaXMucG9wdWxhdGVkRGVsZWdhdGUgOiB0aGlzLnJlc3REZWxlZ2F0ZTtcbiAgICAgICAgdGhpcy5kZWxlZ2F0ZS5yZW5kZXIoKTtcbiAgICAgICAgcmV0dXJuIHRyZWU7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXV0b2NvbXBsZXRlXG4iLCIvKipcbiAqIEF1dG9jb21wbGV0ZURlbGVnYXRlXG4gKiBAcGFyYW0ge0F1dG9jb21wbGV0ZX0gYXV0b2NvbXBsZXRlXG4gKiBAYWJzdHJhY3RcbiAqL1xuY2xhc3MgQXV0b2NvbXBsZXRlRGVsZWdhdGUge1xuXG4gICAgY29uc3RydWN0b3IoYXV0b2NvbXBsZXRlKSB7XG5cbiAgICAgICAgdGhpcy5hdXRvY29tcGxldGUgPSBhdXRvY29tcGxldGU7XG5cbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duKCkge1xuXG4gICAgfVxuXG4gICAgaGFuZGxlS2V5VXAoKSB7XG5cbiAgICB9XG5cbiAgICB1cGRhdGUoKSB7XG5cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHNlbGVjdGVkIGlzIGNhbGxlZCB3aGVuIGFuIG9wdGlvbiBoYXMgYmVlbiBjbGlja2VkIG9uXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4XG4gICAgICovXG4gICAgc2VsZWN0ZWQoaW5kZXgpIHtcblxuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEF1dG9jb21wbGV0ZURlbGVnYXRlXG4iLCJpbXBvcnQgeyBWaWV3IH0gZnJvbSAnd21sanMvbGliL3J1bnRpbWUnO1xuaW1wb3J0ICogYXMgQ2xhc3MgZnJvbSAnd2F0LWNsYXNzZXMnO1xuaW1wb3J0IEF1dG9jb21wbGV0ZURlbGVnYXRlIGZyb20gJy4vQXV0b2NvbXBsZXRlRGVsZWdhdGUnO1xuXG4vKipcbiAqIFBvcHVsYXRlRGVsZWdhdGUgZm9yIHRoZSBzZWFyY2hpbmcgcGhhc2UuXG4gKi9cbmNsYXNzIFBvcHVsYXRlRGVsZWdhdGUgZXh0ZW5kcyBBdXRvY29tcGxldGVEZWxlZ2F0ZSB7XG5cbiAgICBoYW5kbGVLZXlVcChlKSB7XG5cbiAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMjcpIHtcbiAgICAgICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlLnRvUmVzdCgpO1xuICAgICAgICAgICAgZS50YXJnZXQuYmx1cigpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duKGUpIHtcblxuICAgICAgICBpZiAoZS5rZXlDb2RlICE9PSAyNylcbiAgICAgICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlLnRvU2VhcmNoKCk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzZWxlY3RlZCBpcyBjYWxsZWQgd2hlbiBhbiBvcHRpb24gaGFzIGJlZW4gY2xpY2tlZCBvblxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleFxuICAgICAqL1xuICAgIHNlbGVjdGVkKGluZGV4KSB7XG5cbiAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKCdQb3B1bGF0ZURlbGVnYXRlOiBkb2VzIG5vdCBzdXBwb3J0IHNlbGVjdGluZyEnKTtcblxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICB2YXIgZGlzcGxheTtcbiAgICAgICAgdmFyIHZhbHVlID0gdGhpcy5hdXRvY29tcGxldGUuYXR0cmlidXRlcy5yZWFkKCd3YXQ6dmFsdWUnKTtcbiAgICAgICAgdmFyIGxhYmVsID0gdGhpcy5hdXRvY29tcGxldGUuYXR0cmlidXRlcy5yZWFkKCd3YXQ6bGFiZWxGaWVsZCcpO1xuICAgICAgICB2YXIgdmFsdWVGaWVsZCA9IHRoaXMuYXV0b2NvbXBsZXRlLmF0dHJpYnV0ZXMucmVhZCgnd2F0OnZhbHVlRmllbGQnKTtcblxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuXG4gICAgICAgICAgICBpZiAobGFiZWwpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHByb3BlcnR5KHZhbHVlLCBsYWJlbCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlRmllbGQpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHByb3BlcnR5KHZhbHVlLCB2YWx1ZUZpZWxkKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hdXRvY29tcGxldGUuc2V0KHZhbHVlKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBQb3B1bGF0ZURlbGVnYXRlXG4iLCJpbXBvcnQgKiBhcyBDbGFzcyBmcm9tICd3YXQtY2xhc3Nlcyc7XG5pbXBvcnQgQXV0b2NvbXBsZXRlRGVsZWdhdGUgZnJvbSAnLi9BdXRvY29tcGxldGVEZWxlZ2F0ZSc7XG5cbi8qKlxuICogUmVzdERlbGVnYXRlIGlzIHVzZWQgd2hlbiB0aGUgYXV0b2NvbXBsZXRlIGlzIG5vdCBkb2luZyBhbnl0aGluZyBzcGVjaWFsLlxuICogSXQgbWF5IGhhdmUgZm9jdXMgYnV0IHRoYXQncyBpdC5cbiAqL1xuY2xhc3MgUmVzdERlbGVnYXRlIGV4dGVuZHMgQXV0b2NvbXBsZXRlRGVsZWdhdGUge1xuXG4gICAgaGFuZGxlS2V5VXAoZSkge1xuXG4gICAgICAgIGlmIChlLmtleUNvZGUgPT09IDI3KVxuICAgICAgICAgICAgZS50YXJnZXQuYmx1cigpO1xuXG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93bihlKSB7XG5cbiAgICAgICAgaWYgKGUua2V5Q29kZSAhPT0gMjcpXG4gICAgICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZS50b1NlYXJjaCgpO1xuXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHZhciBvcHRpb25zID0gdGhpcy5hdXRvY29tcGxldGUudmlldy5maW5kQnlJZCgnb3B0aW9ucycpO1xuXG4gICAgICAgIHdoaWxlIChvcHRpb25zLmxhc3RDaGlsZClcbiAgICAgICAgICAgIG9wdGlvbnMucmVtb3ZlQ2hpbGQob3B0aW9ucy5sYXN0Q2hpbGQpO1xuXG4gICAgICAgIG9wdGlvbnMuY2xhc3NMaXN0LnRvZ2dsZShDbGFzcy5XQVRfVklTSUJMRSk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgUmVzdERlbGVnYXRlXG4iLCJpbXBvcnQgeyBWaWV3IH0gZnJvbSAnd21sanMvbGliL3J1bnRpbWUnO1xuaW1wb3J0IGJlb2YgZnJvbSAnYmVvZic7XG5pbXBvcnQgKiBhcyBDbGFzcyBmcm9tICd3YXQtY2xhc3Nlcyc7XG5pbXBvcnQgbm9wIGZyb20gJ25vcCc7XG5pbXBvcnQgQXV0b2NvbXBsZXRlRGVsZWdhdGUgZnJvbSAnLi9BdXRvY29tcGxldGVEZWxlZ2F0ZSc7XG5pbXBvcnQgb3B0aW9ucyBmcm9tICcuL3dtbC9vcHRpb25zLndtbCc7XG5cbi8qKlxuICogU2VhcmNoRGVsZWdhdGUgZm9yIHRoZSBzZWFyY2hpbmcgcGhhc2UuXG4gKi9cbmNsYXNzIFNlYXJjaERlbGVnYXRlIGV4dGVuZHMgQXV0b2NvbXBsZXRlRGVsZWdhdGUge1xuXG4gICAgY29uc3RydWN0b3IoYXV0bykge1xuXG4gICAgICAgIHN1cGVyKGF1dG8pO1xuXG4gICAgICAgIHRoaXMub3B0aW9uc1ZpZXcgPSBuZXcgVmlldyhvcHRpb25zLCB0aGlzKTtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gW107XG5cbiAgICB9XG5cbiAgICB1cGRhdGUoaXRlbXMpIHtcblxuICAgICAgICBiZW9mKHsgaXRlbXMgfSkub3B0aW9uYWwoKS5hcnJheSgpO1xuXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IGl0ZW1zO1xuICAgICAgICB0aGlzLnJlbmRlcigpO1xuXG4gICAgfVxuXG4gICAgaGFuZGxlS2V5VXAoZSkge1xuXG4gICAgICAgIGlmIChlLmtleUNvZGUgPT09IDI3KSB7XG4gICAgICAgICAgICBlLnRhcmdldC5ibHVyKCk7XG4gICAgICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZS50b1Jlc3QoKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93bihlKSB7XG5cbiAgICAgICAgLy9AdG9kbyB0aHJvdHRsZSBzZWFyY2hlcz9cbiAgICAgICAgaWYgKGUua2V5Q29kZSAhPT0gMjcpXG4gICAgICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZS5zZWFyY2goZS50YXJnZXQpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogc2VsZWN0ZWQgaXMgY2FsbGVkIHdoZW4gYW4gb3B0aW9uIGhhcyBiZWVuIGNsaWNrZWQgb25cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXhcbiAgICAgKi9cbiAgICBzZWxlY3RlZChpbmRleCkge1xuXG4gICAgICAgIHZhciBjaG9pY2UgPSB0aGlzLm9wdGlvbnNbaW5kZXhdO1xuICAgICAgICB2YXIgZGlzcGxheSA9ICcnO1xuXG4gICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlLmF0dHJpYnV0ZXMucmVhZCgnd2F0OnNldCcsIGZ1bmN0aW9uKCkge30pKFxuICAgICAgICAgICAgKHRoaXMuYXV0b2NvbXBsZXRlLmF0dHJpYnV0ZXMucmVhZCgnd2F0OnZhbHVlRmllbGQnKSkgP1xuICAgICAgICAgICAgcHJvcGVydHkodGhpcy5vcHRpb25zW2luZGV4XSwgdGhpcy5hdXRvY29tcGxldGUuYXR0cmlidXRlcy5yZWFkKCd3YXQ6dmFsdWVGaWVsZCcpKSA6XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNbaW5kZXhdLCB0aGlzLmF1dG9jb21wbGV0ZS5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDpuYW1lJykpO1xuXG4gICAgICAgIGlmICh0aGlzLmF1dG9jb21wbGV0ZS5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDpsYWJlbEZpZWxkJykpIHtcbiAgICAgICAgICAgIGRpc3BsYXkgPSBwcm9wZXJ0eShjaG9pY2UsIHRoaXMuYXV0b2NvbXBsZXRlLmF0dHJpYnV0ZXMucmVhZCgnd2F0OmxhYmVsRmllbGQnKSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5hdXRvY29tcGxldGUuYXR0cmlidXRlcy5yZWFkKCd3YXQ6dmFsdWVGaWVsZCcpKSB7XG4gICAgICAgICAgICBkaXNwbGF5ID0gcHJvcGVydHkoY2hvaWNlLCB0aGlzLmF1dG9jb21wbGV0ZS5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDp2YWx1ZUZpZWxkJykpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGlzcGxheSA9IGNob2ljZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlLnNldChkaXNwbGF5KTtcbiAgICAgICAgdGhpcy5hdXRvY29tcGxldGUuY2hvaWNlID0gY2hvaWNlO1xuICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZS50b1NlbGVjdGlvbigpO1xuXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHZhciBvcHRpb25zID0gdGhpcy5hdXRvY29tcGxldGUudmlldy5maW5kQnlJZCgnb3B0aW9ucycpO1xuXG4gICAgICAgIHdoaWxlIChvcHRpb25zLmxhc3RDaGlsZClcbiAgICAgICAgICAgIG9wdGlvbnMucmVtb3ZlQ2hpbGQob3B0aW9ucy5sYXN0Q2hpbGQpO1xuXG4gICAgICAgIG9wdGlvbnMuY2xhc3NMaXN0LnRvZ2dsZShDbGFzcy5XQVRfVklTSUJMRSk7XG4gICAgICAgIG9wdGlvbnMuYXBwZW5kQ2hpbGQodGhpcy5vcHRpb25zVmlldy5yZW5kZXIoKSwgdGhpcyk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2VhcmNoRGVsZWdhdGVcbiIsImltcG9ydCB7IFZpZXcgfSBmcm9tICd3bWxqcy9saWIvcnVudGltZSc7XG5pbXBvcnQgKiBhcyBDbGFzcyBmcm9tICd3YXQtY2xhc3Nlcyc7XG5pbXBvcnQgQXV0b2NvbXBsZXRlRGVsZWdhdGUgZnJvbSAnLi9BdXRvY29tcGxldGVEZWxlZ2F0ZSc7XG5cbi8qKlxuICogU2VsZWN0aW9uRGVsZWdhdGUgZm9yIHRoZSBzZWFyY2hpbmcgcGhhc2UuXG4gKi9cbmNsYXNzIFNlbGVjdGlvbkRlbGVnYXRlIGV4dGVuZHMgQXV0b2NvbXBsZXRlRGVsZWdhdGUge1xuXG4gICAgaGFuZGxlS2V5VXAoZSkge1xuXG4gICAgICAgIGlmIChlLmtleUNvZGUgPT09IDI3KVxuICAgICAgICAgICAgdGhpcy5hdXRvY29tcGxldGUudG9SZXN0KCk7XG5cbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duKGUpIHtcblxuICAgICAgICBpZiAoZS5rZXlDb2RlICE9PSAyNylcbiAgICAgICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlLnRvU2VhcmNoKCk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzZWxlY3RlZCBpcyBjYWxsZWQgd2hlbiBhbiBvcHRpb24gaGFzIGJlZW4gY2xpY2tlZCBvblxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleFxuICAgICAqL1xuICAgIHNlbGVjdGVkKGluZGV4KSB7XG5cbiAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKCdTZWxlY3Rpb25EZWxlZ2F0ZTogZG9lcyBub3Qgc3VwcG9ydCBzZWxlY3RpbmchJyk7XG5cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgdmFyIG9wdGlvbnMgPSB0aGlzLmF1dG9jb21wbGV0ZS52aWV3LmZpbmRCeUlkKCdvcHRpb25zJyk7XG5cbiAgICAgICAgd2hpbGUgKG9wdGlvbnMubGFzdENoaWxkKVxuICAgICAgICAgICAgb3B0aW9ucy5yZW1vdmVDaGlsZChvcHRpb25zLmxhc3RDaGlsZCk7XG5cbiAgICAgICAgb3B0aW9ucy5jbGFzc0xpc3QudG9nZ2xlKENsYXNzLldBVF9WSVNJQkxFKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBTZWxlY3Rpb25EZWxlZ2F0ZVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAobWFrZSkge1xuICByZXR1cm4gbWFrZS5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogbWFrZS5yZXNvbHZlKENsYXNzLCAnV0FUX0tJVF9BVVRPQ09NUExFVEUnKSB9IH0sIFttYWtlLm5vZGUoJ2lucHV0JywgeyBodG1sOiB7ICd0eXBlJzogXCJ0ZXh0XCIsICdjbGFzcyc6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3YXQ6aW5wdXRDbGFzcycpLCAnb25rZXlkb3duJzogdGhpcy5oYW5kbGVLZXlEb3duLmJpbmQodGhpcyksICdvbmtleXVwJzogdGhpcy5oYW5kbGVLZXlVcC5iaW5kKHRoaXMpLCAnb25pbnB1dCc6IHRoaXMuaGFuZGxlSW5wdXQuYmluZCh0aGlzKSwgJ3BsYWNlaG9sZGVyJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDpwbGFjZWhvbGRlcicsICdUeXBlIGhlcmUgdG8gc2VhcmNoJykgfSwgd21sOiB7ICdpZCc6IFwiaW5wdXRcIiB9IH0sIFtdKSwgbWFrZS5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogbWFrZS5yZXNvbHZlKENsYXNzLCAnV0FUX0tJVF9BVVRPQ09NUExFVEVfT1BUSU9OUycpIH0sIHdtbDogeyAnaWQnOiBcIm9wdGlvbnNcIiB9IH0sIFtdKV0pO1xufTtcblxudmFyIF93YXRDbGFzc2VzID0gcmVxdWlyZSgnd2F0LWNsYXNzZXMnKTtcblxudmFyIENsYXNzID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX3dhdENsYXNzZXMpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChvYmopIHsgaWYgKG9iaiAmJiBvYmouX19lc01vZHVsZSkgeyByZXR1cm4gb2JqOyB9IGVsc2UgeyB2YXIgbmV3T2JqID0ge307IGlmIChvYmogIT0gbnVsbCkgeyBmb3IgKHZhciBrZXkgaW4gb2JqKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSBuZXdPYmpba2V5XSA9IG9ialtrZXldOyB9IH0gbmV3T2JqLmRlZmF1bHQgPSBvYmo7IHJldHVybiBuZXdPYmo7IH0gfSIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKG1ha2UpIHtcbiAgcmV0dXJuIG1ha2Uubm9kZSgndWwnLCB7IGh0bWw6IHt9IH0sIFttYWtlLiRmb3IobWFrZS5yZXNvbHZlKHRoaXMsICdvcHRpb25zJyksIGZ1bmN0aW9uIGZvcl8yKG9wdGlvbiwgaW5kZXgsIGFycmF5KSB7XG4gICAgcmV0dXJuIFttYWtlLm5vZGUoJ2xpJywgeyBodG1sOiB7ICdjbGFzcyc6IG1ha2UucmVzb2x2ZShDbGFzcywgJ1dBVF9LSVRfQVVUT0NPTVBMRVRFX0lURU1fV1JBUFBFUicpLCAnb25jbGljayc6IHRoaXMuc2VsZWN0ZWQuYmluZCh0aGlzLCBpbmRleCkgfSB9LCBbbWFrZS4kaWYodGhpcy5hdXRvY29tcGxldGUuYXR0cmlidXRlcy5yZWFkKCd3YXQ6b3B0aW9uVGVtcGxhdGUnKSwgZnVuY3Rpb24gaWYwKCkge1xuICAgICAgcmV0dXJuIFttYWtlLiRpZih0aGlzLmF1dG9jb21wbGV0ZS5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDp2YWx1ZUZpZWxkJyksIGZ1bmN0aW9uIGlmMCgpIHtcbiAgICAgICAgcmV0dXJuIFt0aGlzLmF1dG9jb21wbGV0ZS5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDpvcHRpb25UZW1wbGF0ZScpLmFwcGx5KHRoaXMsIFttYWtlXS5jb25jYXQoWygwLCBfcHJvcGVydHlTZWVrMi5kZWZhdWx0KShvcHRpb24sIHRoaXMuYXV0b2NvbXBsZXRlLnJlYWQoJ3dhdDp2YWx1ZUZpZWxkJykpLCBpbmRleCwgb3B0aW9uXSkpXTtcbiAgICAgIH0uYmluZCh0aGlzKSwgZnVuY3Rpb24gZWxzZV9jbGF1c2U0KCkge1xuICAgICAgICByZXR1cm4gW3RoaXMuYXV0b2NvbXBsZXRlLmF0dHJpYnV0ZXMucmVhZCgnd2F0Om9wdGlvblRlbXBsYXRlJykuYXBwbHkodGhpcywgW21ha2VdLmNvbmNhdChbb3B0aW9uLCBpbmRleCwgbWFrZS5yZXNvbHZlKHRoaXMsICdvcHRpb25zJyldKSldO1xuICAgICAgfS5iaW5kKHRoaXMpKV07XG4gICAgfS5iaW5kKHRoaXMpLCBmdW5jdGlvbiBlbHNlX2NsYXVzZTUoKSB7XG4gICAgICByZXR1cm4gW21ha2UuJGlmKHRoaXMuYXV0b2NvbXBsZXRlLmF0dHJpYnV0ZXMucmVhZCgnd2F0OnZhbHVlRmllbGQnKSwgZnVuY3Rpb24gaWYwKCkge1xuICAgICAgICByZXR1cm4gWygwLCBfcHJvcGVydHlTZWVrMi5kZWZhdWx0KShvcHRpb24sIHRoaXMuYXV0b2NvbXBsZXRlLmF0dHJpYnV0ZXMucmVhZCgnd2F0OnZhbHVlRmllbGQnKSldO1xuICAgICAgfS5iaW5kKHRoaXMpLCBmdW5jdGlvbiBlbHNlX2NsYXVzZTYoKSB7XG4gICAgICAgIHJldHVybiBbb3B0aW9uXTtcbiAgICAgIH0uYmluZCh0aGlzKSldO1xuICAgIH0uYmluZCh0aGlzKSldKV07XG4gIH0uYmluZCh0aGlzKSldKTtcbn07XG5cbnZhciBfd2F0Q2xhc3NlcyA9IHJlcXVpcmUoJ3dhdC1jbGFzc2VzJyk7XG5cbnZhciBDbGFzcyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF93YXRDbGFzc2VzKTtcblxudmFyIF9wcm9wZXJ0eVNlZWsgPSByZXF1aXJlKCdwcm9wZXJ0eS1zZWVrJyk7XG5cbnZhciBfcHJvcGVydHlTZWVrMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Byb3BlcnR5U2Vlayk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKG9iaikgeyBpZiAob2JqICYmIG9iai5fX2VzTW9kdWxlKSB7IHJldHVybiBvYmo7IH0gZWxzZSB7IHZhciBuZXdPYmogPSB7fTsgaWYgKG9iaiAhPSBudWxsKSB7IGZvciAodmFyIGtleSBpbiBvYmopIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIG5ld09ialtrZXldID0gb2JqW2tleV07IH0gfSBuZXdPYmouZGVmYXVsdCA9IG9iajsgcmV0dXJuIG5ld09iajsgfSB9IiwiaW1wb3J0IHsgVmlldywgV2lkZ2V0IH0gZnJvbSAnd21sanMvbGliL3J1bnRpbWUnO1xuaW1wb3J0IGl0ZW0gZnJvbSAnLi93bWwvaXRlbS53bWwnO1xuXG4vKipcbiAqIEJyZWFkQ3J1bWJcbiAqL1xuY2xhc3MgQnJlYWRDcnVtYiBleHRlbmRzIFdpZGdldCB7XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIFZpZXcucmVuZGVyKGl0ZW0sIHRoaXMpO1xuXG4gICAgfVxuXG59XG5leHBvcnQgZGVmYXVsdCBCcmVhZENydW1iXG5cbiIsImltcG9ydCB7IFZpZXcsIFdpZGdldCB9IGZyb20gJ3dtbGpzL2xpYi9ydW50aW1lJztcbmltcG9ydCBCcmVhZENydW1iIGZyb20gJy4vQnJlYWRDcnVtYic7XG5pbXBvcnQgbWVudSBmcm9tICcuL3dtbC9tZW51LndtbCc7XG5cbi8qKlxuICogQnJlYWRDcnVtYk1lbnVcbiAqL1xuY2xhc3MgQnJlYWRDcnVtYk1lbnUgZXh0ZW5kcyBXaWRnZXQge1xuXG4gICAgY29uc3RydWN0b3IoYXR0cnMsIGNoaWxkcmVuKSB7XG5cbiAgICAgICAgc3VwZXIoYXR0cnMsIGNoaWxkcmVuKTtcblxuICAgICAgICB0aGlzLnZpZXcgPSBuZXcgVmlldyhtZW51LCB0aGlzKTtcblxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy52aWV3LnJlbmRlcigpO1xuXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCcmVhZENydW1iTWVudVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAobWFrZSkge1xuICByZXR1cm4gbWFrZS5ub2RlKCdsaScsIHsgaHRtbDoge30gfSwgW21ha2UuJGlmKHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3YXQ6YWN0aXZlJywgZmFsc2UpLCBmdW5jdGlvbiBpZjAoKSB7XG4gICAgcmV0dXJuIFttYWtlLnJlc29sdmUodGhpcywgJ2NoaWxkcmVuJyldO1xuICB9LmJpbmQodGhpcyksIGZ1bmN0aW9uIGVsc2VfY2xhdXNlMCgpIHtcbiAgICByZXR1cm4gW21ha2Uubm9kZSgnYScsIHsgaHRtbDogeyAnaHJlZic6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3YXQ6aHJlZicsICcjJykgfSB9LCBbbWFrZS5yZXNvbHZlKHRoaXMsICdjaGlsZHJlbicpXSldO1xuICB9LmJpbmQodGhpcykpXSk7XG59OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKG1ha2UpIHtcbiAgcmV0dXJuIG1ha2Uubm9kZSgnb2wnLCB7IGh0bWw6IHsgJ2NsYXNzJzogXCJicmVhZGNydW1iXCIgfSB9LCBbbWFrZS5yZXNvbHZlKHRoaXMsICdjaGlsZHJlbicpXSk7XG59OyIsImltcG9ydCB7IFZpZXcsIFdpZGdldCB9IGZyb20gJ3dtbGpzL2xpYi9ydW50aW1lJztcbmltcG9ydCBidXR0b24gZnJvbSAnLi93bWwvYnV0dG9uLndtbCc7XG5cbi8qKlxuICogQnV0dG9uIGEgYm9vdHN0cmFwIHN0eWxlZCBidXR0b24uXG4gKi9cbmNsYXNzIEJ1dHRvbiBleHRlbmRzIFdpZGdldCB7XG5cbiAgICBjb25zdHJ1Y3RvcihhdHRycywgY2hpbGRyZW4pIHtcblxuICAgICAgICBzdXBlcihhdHRycywgY2hpbGRyZW4pO1xuXG4gICAgICAgIHRoaXMudmlldyA9IG5ldyBWaWV3KGJ1dHRvbiwgdGhpcyk7XG5cbiAgICB9XG5cbiAgICBnZXRDbGFzcygpIHtcblxuICAgICAgICB2YXIgdmFyaWFudCA9IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3YXQ6dmFyaWFudCcsICdkZWZhdWx0Jyk7XG4gICAgICAgIHZhciBjbHMgPSB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd2F0OmNsYXNzJywgJycpO1xuICAgICAgICByZXR1cm4gYGJ0biBidG4tJHt2YXJpYW50fSAke2Nsc31gLnRyaW0oKTtcblxuICAgIH1cblxuICAgIGNsaWNrZWQoZSkge1xuXG4gICAgICAgIHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3YXQ6b25DbGljaycsIGZ1bmN0aW9uKCkge30pKGUudGFyZ2V0Lm5hbWUsIHRoaXMsIGUpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZGlzYWJsZSB0aGlzIGJ1dHRvbi5cbiAgICAgKi9cbiAgICBkaXNhYmxlKCkge1xuXG4gICAgICAgIHRoaXMudmlldy5maW5kQnlJZCgnYnV0dG9uJykuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZW5hYmxlIHRoaXMgYnV0dG9uLlxuICAgICAqL1xuICAgIGVuYWJsZSgpIHtcblxuICAgICAgICB0aGlzLnZpZXcuZmluZEJ5SWQoJ2J1dHRvbicpLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcblxuICAgIH1cblxuICAgIG9uUmVuZGVyZWQoKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3YXQ6ZGlzYWJsZWQnKSlcbiAgICAgICAgICAgIHRoaXMudmlldy5maW5kQnlJZCgnYnV0dG9uJykuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiB0aGlzLnZpZXcucmVuZGVyKCk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQnV0dG9uXG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChtYWtlKSB7XG4gIHJldHVybiBtYWtlLm5vZGUoJ2ZyYWdtZW50JywgeyBodG1sOiB7fSB9LCBbbWFrZS4kaWYodGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDpocmVmJyksIGZ1bmN0aW9uIGlmMCgpIHtcbiAgICByZXR1cm4gW21ha2Uubm9kZSgnYScsIHsgaHRtbDogeyAnaHJlZic6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3YXQ6aHJlZicpLCAnb25jbGljayc6IHRoaXMuY2xpY2tlZC5iaW5kKHRoaXMpIH0sIHdtbDogeyAnaWQnOiBcImJ1dHRvblwiIH0gfSwgW3RoaXMuYXR0cmlidXRlcy5yZWFkKCd3YXQ6dGV4dCcpLCBtYWtlLnJlc29sdmUodGhpcywgJ2NoaWxkcmVuJyldKV07XG4gIH0uYmluZCh0aGlzKSwgZnVuY3Rpb24gZWxzZV9jbGF1c2UxKCkge1xuICAgIHJldHVybiBbbWFrZS5ub2RlKCdidXR0b24nLCB7IGh0bWw6IHsgJ25hbWUnOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd2F0Om5hbWUnKSwgJ2NsYXNzJzogdGhpcy5nZXRDbGFzcygpLCAnb25jbGljayc6IHRoaXMuY2xpY2tlZC5iaW5kKHRoaXMpIH0sIHdtbDogeyAnaWQnOiBcImJ1dHRvblwiIH0gfSwgW3RoaXMuYXR0cmlidXRlcy5yZWFkKCd3YXQ6dGV4dCcpLCBtYWtlLnJlc29sdmUodGhpcywgJ2NoaWxkcmVuJyldKV07XG4gIH0uYmluZCh0aGlzKSldKTtcbn07IiwiaW1wb3J0IHsgVmlldywgV2lkZ2V0IH0gZnJvbSAnd21sanMvbGliL3J1bnRpbWUnO1xuaW1wb3J0IGxheW91dCBmcm9tICcuL3dtbC9jYXJkLndtbCc7XG5cblxuLyoqXG4gKiBDYXJkXG4gKi9cbmNsYXNzIENhcmQgZXh0ZW5kcyBXaWRnZXQge1xuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiBWaWV3LnJlbmRlcihsYXlvdXQsIHRoaXMpO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IENhcmRcbiIsImltcG9ydCB7IFZpZXcsIFdpZGdldCB9IGZyb20gJ3dtbGpzL2xpYi9ydW50aW1lJztcbmltcG9ydCBsYXlvdXQgZnJvbSAnLi93bWwvY2FyZF9ibG9jay53bWwnO1xuXG5cbi8qKlxuICogQ2FyZEJsb2NrXG4gKi9cbmNsYXNzIENhcmRCbG9jayBleHRlbmRzIFdpZGdldCB7XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIFZpZXcucmVuZGVyKGxheW91dCwgdGhpcyk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2FyZEJsb2NrXG4iLCJpbXBvcnQgeyBWaWV3LCBXaWRnZXQgfSBmcm9tICd3bWxqcy9saWIvcnVudGltZSc7XG5pbXBvcnQgbGF5b3V0IGZyb20gJy4vd21sL2NhcmRfaW1hZ2Uud21sJztcblxuXG4vKipcbiAqIENhcmRJbWFnZVxuICovXG5jbGFzcyBDYXJkSW1hZ2UgZXh0ZW5kcyBXaWRnZXQge1xuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiBWaWV3LnJlbmRlcihsYXlvdXQsIHRoaXMpO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IENhcmRJbWFnZVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAobWFrZSkge1xuICByZXR1cm4gbWFrZS5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogXCJjYXJkXCIgfSB9LCBbdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDpjaGlsZHJlbicpLCBtYWtlLnJlc29sdmUodGhpcywgJ2NoaWxkcmVuJyldKTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAobWFrZSkge1xuICByZXR1cm4gbWFrZS5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogXCJjYXJkLWJsb2NrXCIgfSB9LCBbdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDpjaGlsZHJlbicpLCBtYWtlLnJlc29sdmUodGhpcywgJ2NoaWxkcmVuJyldKTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAobWFrZSkge1xuICByZXR1cm4gbWFrZS5ub2RlKCdpbWcnLCB7IGh0bWw6IHsgJ3NyYyc6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3YXQ6c3JjJyksICdhbHQnOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd2F0OmFsdCcpIH0gfSwgW10pO1xufTsiLCIvKiBqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG5leHBvcnQgQnJlYWRDcnVtYk1lbnUgZnJvbSAnLi9icmVhZGNydW1icy9CcmVhZENydW1iTWVudSc7XG5leHBvcnQgQnJlYWRDcnVtYiBmcm9tICcuL2JyZWFkY3J1bWJzL0JyZWFkQ3J1bWInO1xuZXhwb3J0IEJ1dHRvbiBmcm9tICcuL2J1dHRvbi9CdXR0b24nO1xuZXhwb3J0IE1vZGFsIGZyb20gJy4vbW9kYWwvTW9kYWwnO1xuZXhwb3J0IE1vZGFsSGVhZGVyIGZyb20gJy4vbW9kYWwvTW9kYWxIZWFkZXInO1xuZXhwb3J0IE1vZGFsQm9keSBmcm9tICcuL21vZGFsL01vZGFsQm9keSc7XG5leHBvcnQgTW9kYWxGb290ZXIgZnJvbSAnLi9tb2RhbC9Nb2RhbEZvb3Rlcic7XG5leHBvcnQgQ29udGFpbmVyIGZyb20gJy4vQ29udGFpbmVyJztcbmV4cG9ydCBDb2x1bW4gZnJvbSAnLi9Db2x1bW4nO1xuZXhwb3J0IFJvdyBmcm9tICcuL1Jvdyc7XG5leHBvcnQgVGFibGUgZnJvbSAnLi9UYWJsZSc7XG5leHBvcnQgQXV0b2NvbXBsZXRlIGZyb20gJy4vYXV0b2NvbXBsZXRlL0F1dG9jb21wbGV0ZSc7XG5leHBvcnQgSW5wdXQgZnJvbSAnLi9pbnB1dC9JbnB1dCc7XG5leHBvcnQgU2VsZWN0IGZyb20gJy4vc2VsZWN0L1NlbGVjdCc7XG5leHBvcnQgU3dpdGNoIGZyb20gJy4vc3dpdGNoL1N3aXRjaCc7XG5leHBvcnQgSnVtYm90cm9uIGZyb20gJy4vanVtYm90cm9uL0p1bWJvdHJvbic7XG5leHBvcnQgV2VsbCBmcm9tICcuL3dlbGwvV2VsbCc7XG5leHBvcnQgQ2FyZCBmcm9tICcuL2NhcmQvQ2FyZCc7XG5leHBvcnQgQ2FyZEltYWdlIGZyb20gJy4vY2FyZC9DYXJkSW1hZ2UnO1xuZXhwb3J0IENhcmRCbG9jayBmcm9tICcuL2NhcmQvQ2FyZEJsb2NrJztcbi8qIGpzaGludCBpZ25vcmU6ZW5kICovXG4iLCJpbXBvcnQgeyBWaWV3LCBXaWRnZXQgfSBmcm9tICd3bWxqcy9saWIvcnVudGltZSc7XG5pbXBvcnQgbGF5b3V0IGZyb20gJy4vd21sL2xheW91dC53bWwnO1xuXG5jb25zdCBJTlBVVF9TVUNDRVNTID0gJ2hhcy1zdWNjZXMnO1xuY29uc3QgSU5QVVRfRVJST1IgPSAnaGFzLWVycm9yJztcbmNvbnN0IElOUFVUX1dBUk5JTkcgPSAnaGFzLXdhcm5pbmcnO1xuXG4vKipcbiAqIElucHV0XG4gKi9cbmNsYXNzIElucHV0IGV4dGVuZHMgV2lkZ2V0IHtcblxuICAgIGNvbnN0cnVjdG9yKGF0dHJzLCBjaGlsZHJlbikge1xuXG4gICAgICAgIHN1cGVyKGF0dHJzLCBjaGlsZHJlbik7XG4gICAgICAgIHRoaXMudmlldyA9IG5ldyBWaWV3KGxheW91dCwgdGhpcyk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBnZXRDbGFzc1xuICAgICAqL1xuICAgIGdldENsYXNzKCkge1xuXG4gICAgICAgIHZhciBjID0gYGZvcm0tZ3JvdXAgJHt0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd2F0OmNsYXNzJyl9YDtcblxuICAgICAgICBpZiAoIXRoaXMuYXR0cmlidXRlcy5yZWFkKCd3YXQ6bWVzc2FnZScpKVxuICAgICAgICAgICAgcmV0dXJuIGM7XG5cbiAgICAgICAgcmV0dXJuIGAke2N9IGhhcy1lcnJvcmA7XG5cbiAgICB9XG5cbiAgICBpbnB1dChlKSB7XG5cbiAgICAgICAgdmFyIHNldCA9IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3YXQ6c2V0JywgZnVuY3Rpb24oKSB7fSk7XG5cbiAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICBzZXQoZS50YXJnZXQubmFtZSwgZS50YXJnZXQudmFsdWUsIHRoaXMpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogc2V0TWVzc2FnZSBzZXRzIHRoZSBtZXNzYWdlIGZvciB0aGUgbWVzc2FnZSBwb3J0aW9uIG9mXG4gICAgICogdGhpcyBpbnB1dC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbXNnXG4gICAgICovXG4gICAgc2V0TWVzc2FnZShtc2cgPSAnJykge1xuXG4gICAgICAgIHZhciBtZXNzYWdlID0gdGhpcy52aWV3LmZpbmRCeUlkKCdtZXNzYWdlJyk7XG52YXIgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKG1zZyk7XG5cbiAgICAgICAgaWYgKG1lc3NhZ2UuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgbWVzc2FnZS5yZXBsYWNlQ2hpbGQobWVzc2FnZS5maXJzdENoaWxkLCBub2RlICApO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIG1lc3NhZ2UuYXBwZW5kQ2hpbGQobm9kZSk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGlzRmlsbGVkIHRlbGxzIGlmIHRoaXMgSW5wdXQgaGFzIGEgZmlsbGVkIHZhbHVlLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGlzRmlsbGVkKCkge1xuXG4gICAgICAgIHJldHVybiB0aGlzLnZpZXcuZmluZEJ5SWQoJ2lucHV0JykudmFsdWU7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBpc1JlcXVpcmVkIHRlbGxzIGlmIHRoZSBJbnB1dCB3YXMgcmVxdWlyZWQuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgaXNSZXF1aXJlZCgpIHtcblxuICAgICAgICBpZiAodGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDpyZXF1aXJlZCcpKVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBpc1ZhbGlkIHF1ZXJpZXMgd2hldGhlciB0aGUgSW5wdXQgaGFzIGJlZW4gaW52YWxpZGF0ZWRcbiAgICAgKiBvciBub3QuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgaXNWYWxpZCgpIHtcblxuICAgICAgICByZXR1cm4gKHRoaXMudmlldy5maW5kQnlJZCgncm9vdCcpLmNsYXNzTmFtZS5zcGxpdCgnICcpLmluZGV4T2YoSU5QVVRfRVJST1IpID09PSAtMSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBpbnZhbGlkYXRlIHRoaXMgSW5wdXQgd2l0aCBhbiBvcHRpb25hbCBtZXNzYWdlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlXG4gICAgICogQHJldHVybnMge0lucHV0fVxuICAgICAqL1xuICAgIGludmFsaWRhdGUobWVzc2FnZSA9ICcnKSB7XG5cbiAgICAgICAgaWYgKG1lc3NhZ2UpXG4gICAgICAgICAgICB0aGlzLnNldE1lc3NhZ2UobWVzc2FnZSk7XG5cbiAgICAgICAgdGhpcy52aWV3LmZpbmRCeUlkKCdyb290JykuY2xhc3NMaXN0LnJlbW92ZShJTlBVVF9FUlJPUik7XG4gICAgICAgIHRoaXMudmlldy5maW5kQnlJZCgncm9vdCcpLmNsYXNzTGlzdC5hZGQoSU5QVVRfRVJST1IpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogdmFsaWRhdGUgdGhpcyBpbnB1dCB3aXRoIGFuIG9wdGlvbmFsIG1lc3NzYWdlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlXG4gICAgICogQHJldHVybnMge0lucHV0fVxuICAgICAqL1xuICAgIHZhbGlkYXRlKG1lc3NhZ2UgPSAnJykge1xuXG4gICAgICAgIGlmIChtZXNzYWdlKVxuICAgICAgICAgICAgdGhpcy5zZXRNZXNzYWdlKG1lc3NhZ2UpO1xuXG4gICAgICAgIHRoaXMudmlldy5maW5kQnlJZCgncm9vdCcpLmNsYXNzTGlzdC5yZW1vdmUoSU5QVVRfU1VDQ0VTUyk7XG4gICAgICAgIHRoaXMudmlldy5maW5kQnlJZCgncm9vdCcpLmNsYXNzTGlzdC5hZGQoSU5QVVRfU1VDQ0VTUyk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiB3YXJuIHRoaXMgaW5wdXQgd2l0aCBhbiBvcHRpb25hbCBtZXNzYWdlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlXG4gICAgICogQHJldHVybnMge0lucHV0fVxuICAgICAqL1xuICAgIHdhcm4obWVzc2FnZSA9ICcnKSB7XG5cbiAgICAgICAgaWYgKG1lc3NhZ2UpXG4gICAgICAgICAgICB0aGlzLnNldE1lc3NhZ2UobWVzc2FnZSk7XG5cbiAgICAgICAgdGhpcy52aWV3LmZpbmRCeUlkKCdyb290JykuY2xhc3NMaXN0LnJlbW92ZShJTlBVVF9XQVJOSU5HKTtcbiAgICAgICAgdGhpcy52aWV3LmZpbmRCeUlkKCdyb290JykuY2xhc3NMaXN0LmFkZChJTlBVVF9XQVJOSU5HKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJlc2V0IHRoaXMgaW5wdXQgdG8gYSBjbGVhbiBzdGF0ZS5cbiAgICAgKiBSZW1vdmVzIG1lc3NhZ2VzLCB2YWxpZGF0aW9uIHN0YXRlIGV0Yy5cbiAgICAgKiBAcmV0dXJuIHtJbnB1dH1cbiAgICAgKi9cbiAgICByZXNldCgpIHtcblxuICAgICAgICB2YXIgcm9vdCA9IHRoaXMudmlldy5maW5kQnlJZCgncm9vdCcpO1xuXG4gICAgICAgIHJvb3QuY2xhc3NMaXN0LnJlbW92ZShJTlBVVF9TVUNDRVNTKTtcbiAgICAgICAgcm9vdC5jbGFzc0xpc3QucmVtb3ZlKElOUFVUX0VSUk9SKTtcbiAgICAgICAgcm9vdC5jbGFzc0xpc3QucmVtb3ZlKElOUFVUX1dBUk5JTkcpO1xuXG4gICAgICAgIHRoaXMudmlldy5maW5kQnlJZCgnbWVzc2FnZScpLmlubmVySFRNTCA9ICcnO1xuXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiB0aGlzLnZpZXcucmVuZGVyKCk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgSW5wdXRcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKG1ha2UpIHtcbiAgcmV0dXJuIG1ha2Uubm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6IHRoaXMuZ2V0Q2xhc3MoKSB9IH0sIFttYWtlLm5vZGUoJ2xhYmVsJywgeyBodG1sOiB7ICdmb3InOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd2F0OmlkJyksICdjbGFzcyc6IFwiY29udHJvbC1sYWJlbFwiIH0gfSwgW3RoaXMuYXR0cmlidXRlcy5yZWFkKCd3YXQ6bGFiZWwnKV0pLCBtYWtlLiRpZih0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd2F0OnR5cGUnLCAndGV4dCcpICE9PSAndGV4dGFyZWEnLCBmdW5jdGlvbiBpZjAoKSB7XG4gICAgcmV0dXJuIFttYWtlLm5vZGUoJ2lucHV0JywgeyBodG1sOiB7ICdpZCc6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3YXQ6aWQnKSwgJ25hbWUnOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd2F0Om5hbWUnKSwgJ3R5cGUnOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd2F0OnR5cGUnLCAndGV4dCcpLCAnb25pbnB1dCc6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3YXQ6aW5wdXQnKSwgJ3ZhbHVlJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDp2YWx1ZScpLCAnY2xhc3MnOiBcImZvcm0tY29udHJvbFwiIH0sIHdtbDogeyAnaWQnOiBcImlucHV0XCIgfSB9LCBbXSldO1xuICB9LmJpbmQodGhpcyksIGZ1bmN0aW9uIGVsc2VfY2xhdXNlMigpIHtcbiAgICByZXR1cm4gW21ha2Uubm9kZSgndGV4dGFyZWEnLCB7IGh0bWw6IHsgJ2lkJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDppZCcpLCAnY2xhc3MnOiBcImZvcm0tY29udHJvbFwiLCAnbmFtZSc6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3YXQ6bmFtZScpLCAndHlwZSc6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3YXQ6dHlwZScsICd0ZXh0JyksICdvbmlucHV0JzogdGhpcy5pbnB1dC5iaW5kKHRoaXMpLCAndmFsdWUnOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd2F0OnZhbHVlJyksICdyb3dzJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDpyb3dzJykgfSB9LCBbXSldO1xuICB9LmJpbmQodGhpcykpLCBtYWtlLm5vZGUoJ3NwYW4nLCB7IGh0bWw6IHsgJ2NsYXNzJzogXCJoZWxwLWJsb2NrXCIgfSwgd21sOiB7ICdpZCc6IFwibWVzc2FnZVwiIH0gfSwgW3RoaXMuYXR0cmlidXRlcy5yZWFkKCdtZXNzYWdlJywgJycpXSldKTtcbn07IiwiaW1wb3J0IHsgVmlldywgV2lkZ2V0IH0gZnJvbSAnd21sanMvbGliL3J1bnRpbWUnO1xuaW1wb3J0IGxheW91dCBmcm9tICcuL3dtbC9sYXlvdXQud21sJztcblxuLyoqXG4gKiBKdW1ib3Ryb25cbiAqL1xuY2xhc3MgSnVtYm90cm9uIGV4dGVuZHMgV2lkZ2V0IHtcblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gVmlldy5yZW5kZXIobGF5b3V0LCB0aGlzKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBKdW1ib3Ryb25cbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKG1ha2UpIHtcbiAgcmV0dXJuIG1ha2Uubm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6IFwianVtYm90cm9uXCIgfSB9LCBbbWFrZS5yZXNvbHZlKHRoaXMsICdjaGlsZHJlbicpXSk7XG59OyIsImltcG9ydCB7IFZpZXcsIFdpZGdldCB9IGZyb20gJ3dtbGpzL2xpYi9ydW50aW1lJztcbmltcG9ydCBtb2RhbCBmcm9tICcuL3dtbC9tb2RhbC53bWwnO1xuXG4vKipcbiAqIE1vZGFsXG4gKiBOT1RFOiBVc2luZyB0aGlzIHJlcXVpcmVzIGpRdWVyeSBhbmQgYm9vc3RyYXAgcGx1Z2luLlxuICovXG5jbGFzcyBNb2RhbCBleHRlbmRzIFdpZGdldCB7XG5cbiAgICBjb25zdHJ1Y3RvcihhdHRycywgY2hpbGRyZW4pIHtcblxuICAgICAgICBzdXBlcihhdHRycywgY2hpbGRyZW4pO1xuXG4gICAgICAgIHRoaXMudmlldyA9IG5ldyBWaWV3KG1vZGFsLCB0aGlzKTtcbiAgICAgICAgdGhpcy5tb2RhbCA9IG51bGw7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBwdXQgY29udGVudCBvbiB0byB0aGlzIG1vZGFsLlxuICAgICAqIEBwYXJhbSB7UmVuZGVyYWJsZX0gclxuICAgICAqL1xuICAgIHB1dChyKSB7XG5cbiAgICAgICAgdmFyIHJvb3QgPSB0aGlzLnZpZXcuZmluZEJ5SWQoJ3Jvb3QnKTtcblxuICAgICAgICB3aGlsZSAocm9vdC5sYXN0Q2hpbGQpXG4gICAgICAgICAgICByb290LnJlbW92ZUNoaWxkKHJvb3QubGFzdENoaWxkKTtcblxuICAgICAgICByb290LmFwcGVuZENoaWxkKHIucmVuZGVyKCkpO1xuXG4gICAgICAgIHRoaXMubW9kYWwubW9kYWwodGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDpvcHRpb25zJywge1xuICAgICAgICAgICAgYmFja2Ryb3A6IGZhbHNlLFxuICAgICAgICAgICAga2V5Ym9hcmQ6IHRydWUsXG4gICAgICAgICAgICBmYWRlOiB0cnVlLFxuICAgICAgICAgICAgc2hvdzogdHJ1ZVxuICAgICAgICB9KSk7XG5cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgdmFyIHJldCA9IHRoaXMudmlldy5yZW5kZXIoKTtcblxuICAgICAgICB0aGlzLm1vZGFsID0galF1ZXJ5KHJldCk7XG4gICAgICAgIHJldHVybiByZXQ7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgTW9kYWxcbiIsImltcG9ydCB7IFZpZXcsIFdpZGdldCB9IGZyb20gJ3dtbGpzL2xpYi9ydW50aW1lJztcbmltcG9ydCBtb2RhbF9ib2R5IGZyb20gJy4vd21sL21vZGFsX2JvZHkud21sJztcblxuLyoqXG4gKiBNb2RhbEJvZHlcbiAqL1xuY2xhc3MgTW9kYWxCb2R5IGV4dGVuZHMgV2lkZ2V0IHtcblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKG5ldyBWaWV3KG1vZGFsX2JvZHksIHRoaXMpKS5yZW5kZXIoKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBNb2RhbEJvZHlcbiIsImltcG9ydCB7IFZpZXcsIFdpZGdldCB9IGZyb20gJ3dtbGpzL2xpYi9ydW50aW1lJztcbmltcG9ydCBmb290ZXIgZnJvbSAnLi93bWwvbW9kYWxfZm9vdGVyLndtbCc7XG5cbi8qKlxuICogTW9kYWxGb290ZXJcbiAqL1xuY2xhc3MgTW9kYWxGb290ZXIgZXh0ZW5kcyBXaWRnZXQge1xuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAobmV3IFZpZXcoZm9vdGVyLCB0aGlzKSkucmVuZGVyKCk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgTW9kYWxGb290ZXJcbiIsImltcG9ydCB7IFZpZXcsIFdpZGdldCB9IGZyb20gJ3dtbGpzL2xpYi9ydW50aW1lJztcbmltcG9ydCBoZWFkZXIgZnJvbSAnLi93bWwvbW9kYWxfaGVhZGVyLndtbCc7XG5cbi8qKlxuICogTW9kYWxIZWFkZXJcbiAqL1xuY2xhc3MgTW9kYWxIZWFkZXIgZXh0ZW5kcyBXaWRnZXQge1xuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAobmV3IFZpZXcoaGVhZGVyLCB0aGlzKSkucmVuZGVyKCk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgTW9kYWxIZWFkZXJcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKG1ha2UpIHtcbiAgcmV0dXJuIG1ha2Uubm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3YXQ6Y2xhc3MnLCAnbW9kYWwgZmFkZScpLCAndGFiaW5kZXgnOiBcIi0xXCIsICdyb2xlJzogXCJkaWFsb2dcIiB9IH0sIFttYWtlLm5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiAnbW9kYWwtZGlhbG9nICcgKyB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd2F0OnNpemVDbGFzcycsICdtb2RhbC1tZCcpLCAncm9sZSc6IFwiZG9jdW1lbnRcIiB9IH0sIFttYWtlLm5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiBcIm1vZGFsLWNvbnRlbnRcIiB9LCB3bWw6IHsgJ2lkJzogXCJyb290XCIgfSB9LCBbbWFrZS5yZXNvbHZlKHRoaXMsICdjaGlsZHJlbicpXSldKV0pO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChtYWtlKSB7XG4gIHJldHVybiBtYWtlLm5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiBcIm1vZGFsLWJvZHlcIiB9IH0sIFttYWtlLnJlc29sdmUodGhpcywgJ2NoaWxkcmVuJyldKTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAobWFrZSkge1xuICByZXR1cm4gbWFrZS5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogXCJtb2RhbC1mb290ZXJcIiB9IH0sIFttYWtlLnJlc29sdmUodGhpcywgJ2NoaWxkcmVuJyldKTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAobWFrZSkge1xuICByZXR1cm4gbWFrZS5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogXCJtb2RhbC1oZWFkZXJcIiB9IH0sIFttYWtlLm5vZGUoJ2J1dHRvbicsIHsgaHRtbDogeyAndHlwZSc6IFwiYnV0dG9uXCIsICdjbGFzcyc6IFwiY2xvc2VcIiwgJ2RhdGEtZGlzbWlzcyc6IFwibW9kYWxcIiwgJ2FyaWEtbGFiZWwnOiBcIkNsb3NlXCIgfSB9LCBbbWFrZS5ub2RlKCdzcGFuJywgeyBodG1sOiB7ICdhcmlhLWhpZGRlbic6IFwidHJ1ZVwiIH0gfSwgW21ha2UudGV4dCgnw5cnKV0pXSksIG1ha2UucmVzb2x2ZSh0aGlzLCAnY2hpbGRyZW4nKV0pO1xufTsiLCJpbXBvcnQgeyBWaWV3IH0gZnJvbSAnd21sanMvbGliL3J1bnRpbWUnO1xuaW1wb3J0IElucHV0IGZyb20gJy4uL2lucHV0L0lucHV0JztcbmltcG9ydCBsYXlvdXQgZnJvbSAnLi93bWwvbGF5b3V0LndtbCc7XG5cbmNsYXNzIFNlbGVjdCBleHRlbmRzIElucHV0IHtcblxuICAgIGNvbnN0cnVjdG9yKGF0dHJzLCBjaGlsZHJlbikge1xuXG4gICAgICAgIHN1cGVyKGF0dHJzLCBjaGlsZHJlbik7XG4gICAgICAgIHRoaXMudmlldyA9IG5ldyBWaWV3KGxheW91dCwgdGhpcyk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2VsZWN0XG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChtYWtlKSB7XG4gIHJldHVybiBtYWtlLm5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiB0aGlzLmdldENsYXNzKCkgfSB9LCBbbWFrZS5ub2RlKCdsYWJlbCcsIHsgaHRtbDogeyAnZm9yJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDppZCcpLCAnY2xhc3MnOiBcImNvbnRyb2wtbGFiZWxcIiB9IH0sIFt0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd2F0OmxhYmVsJyldKSwgbWFrZS5ub2RlKCdzZWxlY3QnLCB7IGh0bWw6IF9kZWZpbmVQcm9wZXJ0eSh7ICduYW1lJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDpuYW1lJyksICdjbGFzcyc6IFwiZm9ybS1jb250cm9sXCIsICdvbmNoYW5nZSc6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3YXQ6b25DaGFuZ2UnKSwgJ3ZhbHVlJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDp2YWx1ZScpIH0sICdjbGFzcycsIFwiZm9ybS1jb250cm9sXCIpLCB3bWw6IHsgJ2lkJzogXCJpbnB1dFwiIH0gfSwgW21ha2UuJGZvcih0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd2F0Om9wdGlvbnMnLCBbXSksIGZ1bmN0aW9uIGZvcl8xKG9wdCwgaW5kZXgsIGFycmF5KSB7XG4gICAgcmV0dXJuIFttYWtlLiRpZih0eXBlb2Ygb3B0ID09PSAnc3RyaW5nJywgZnVuY3Rpb24gaWYwKCkge1xuICAgICAgcmV0dXJuIFttYWtlLm5vZGUoJ29wdGlvbicsIHsgaHRtbDoge30gfSwgW29wdF0pXTtcbiAgICB9LmJpbmQodGhpcyksIGZ1bmN0aW9uIGVsc2VfY2xhdXNlMygpIHtcbiAgICAgIHJldHVybiBbbWFrZS5ub2RlKCdvcHRpb24nLCB7IGh0bWw6IHsgJ3ZhbHVlJzogbWFrZS5yZXNvbHZlKG9wdCwgJ3ZhbHVlJykgfSB9LCBbbWFrZS5yZXNvbHZlKG9wdCwgJ2xhYmVsJyldKV07XG4gICAgfS5iaW5kKHRoaXMpKV07XG4gIH0uYmluZCh0aGlzKSksIG1ha2UucmVzb2x2ZSh0aGlzLCAnY2hpbGRyZW4nKV0pLCBtYWtlLm5vZGUoJ3NwYW4nLCB7IGh0bWw6IHsgJ2NsYXNzJzogXCJoZWxwLWJsb2NrXCIgfSwgd21sOiB7ICdpZCc6IFwibWVzc2FnZVwiIH0gfSwgW3RoaXMuYXR0cmlidXRlcy5yZWFkKCdtZXNzYWdlJywgJycpXSldKTtcbn07XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHsgaWYgKGtleSBpbiBvYmopIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7IHZhbHVlOiB2YWx1ZSwgZW51bWVyYWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlLCB3cml0YWJsZTogdHJ1ZSB9KTsgfSBlbHNlIHsgb2JqW2tleV0gPSB2YWx1ZTsgfSByZXR1cm4gb2JqOyB9IiwiaW1wb3J0IHsgVmlldywgV2lkZ2V0IH0gZnJvbSAnd21sanMvbGliL3J1bnRpbWUnO1xuaW1wb3J0IGxheW91dCBmcm9tICcuL3dtbC9sYXlvdXQud21sJztcblxuLyoqXG4gKiBTd2l0Y2hcbiAqL1xuY2xhc3MgU3dpdGNoIGV4dGVuZHMgV2lkZ2V0IHtcblxuICAgIGNvbnN0cnVjdG9yKGF0dHJzLCBjaGlsZHJlbikge1xuXG4gICAgICAgIHN1cGVyKGF0dHJzLCBjaGlsZHJlbik7XG5cbiAgICAgICAgdGhpcy52aWV3ID0gbmV3IFZpZXcobGF5b3V0LCB0aGlzKTtcblxuICAgIH1cblxuICAgIGNoYW5nZWQoZSkge1xuXG4gICAgICAgIGNvbnNvbGUubG9nKGUpO1xuXG4gICAgfVxuXG4gICAgY2FsY3VsYXRlVmFsdWUoKSB7XG5cbiAgICAgICAgdmFyIG9uVmFsdWUgPSB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd2F0Om9uVmFsdWUnKTtcblxuICAgICAgICBpZigob25WYWx1ZSA9PT0gdW5kZWZpbmVkKSB8fCAob25WYWx1ZSA9PT0gbnVsbCkpXG4gICAgICAgICAgIHJldHVybiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd2F0OnZhbHVlJyk7XG5cbiAgICAgICAgaWYodGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDp2YWx1ZScpID09PSBvblZhbHVlKVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMudmlldy5yZW5kZXIoKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBTd2l0Y2hcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKG1ha2UpIHtcbiAgcmV0dXJuIG1ha2Uubm9kZSgnbGFiZWwnLCB7IGh0bWw6IHsgJ2NsYXNzJzogbWFrZS5yZXNvbHZlKENsYXNzLCAnV0FUX0NPTVBPTkVOVFNfU1dJVENIJykgfSB9LCBbbWFrZS5ub2RlKCdpbnB1dCcsIHsgaHRtbDogeyAndHlwZSc6IFwiY2hlY2tib3hcIiwgJ25hbWUnOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd2F0Om5hbWUnKSwgJ3ZhbHVlJzogdGhpcy5jYWxjdWxhdGVWYWx1ZSgpLCAnb25jaGFuZ2UnOiB0aGlzLmNoYW5nZWQuYmluZCh0aGlzKSB9IH0sIFtdKSwgbWFrZS5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogbWFrZS5yZXNvbHZlKENsYXNzLCAnV0FUX0NPTVBPTkVOVFNfU1dJVENIX1NMSURFUicpIH0gfSwgW10pXSk7XG59O1xuXG52YXIgX3dhdENsYXNzZXMgPSByZXF1aXJlKCd3YXQtY2xhc3NlcycpO1xuXG52YXIgQ2xhc3MgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfd2F0Q2xhc3Nlcyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKG9iaikgeyBpZiAob2JqICYmIG9iai5fX2VzTW9kdWxlKSB7IHJldHVybiBvYmo7IH0gZWxzZSB7IHZhciBuZXdPYmogPSB7fTsgaWYgKG9iaiAhPSBudWxsKSB7IGZvciAodmFyIGtleSBpbiBvYmopIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIG5ld09ialtrZXldID0gb2JqW2tleV07IH0gfSBuZXdPYmouZGVmYXVsdCA9IG9iajsgcmV0dXJuIG5ld09iajsgfSB9IiwiaW1wb3J0IHsgVmlldywgV2lkZ2V0IH0gZnJvbSAnd21sanMvbGliL3J1bnRpbWUnO1xuaW1wb3J0IGxheW91dCBmcm9tICcuL3dtbC9sYXlvdXQud21sJztcblxuLyoqXG4gKiBXZWxsXG4gKi9cbmNsYXNzIFdlbGwgZXh0ZW5kcyBXaWRnZXQge1xuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiBWaWV3LnJlbmRlcihsYXlvdXQsIHRoaXMpO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFdlbGxcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKG1ha2UpIHtcbiAgcmV0dXJuIG1ha2Uubm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6IFwid2VsbFwiIH0gfSwgW21ha2UucmVzb2x2ZSh0aGlzLCAnY2hpbGRyZW4nKV0pO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChtYWtlKSB7XG4gIHJldHVybiBtYWtlLm5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiBtYWtlLnJlc29sdmUodGhpcywgJ2NsYXNzTmFtZScpIH0gfSwgW21ha2UucmVzb2x2ZSh0aGlzLCAnY2hpbGRyZW4nKV0pO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChtYWtlKSB7XG4gIHJldHVybiBtYWtlLm5vZGUoJ3NlY3Rpb24nLCB7IGh0bWw6IHsgJ2NsYXNzJzogbWFrZS5yZXNvbHZlKHRoaXMsICdjbGFzc05hbWUnKSB9IH0sIFttYWtlLnJlc29sdmUodGhpcywgJ2NoaWxkcmVuJyldKTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAobWFrZSkge1xuICByZXR1cm4gbWFrZS5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogXCJyb3dcIiB9IH0sIFttYWtlLnJlc29sdmUodGhpcywgJ2NoaWxkcmVuJyldKTtcbn07IiwiaW1wb3J0IHsgVmlldywgV2lkZ2V0IH0gZnJvbSAnd21sanMvbGliL3J1bnRpbWUnO1xuaW1wb3J0IGFjY291bnRfYXJlYSBmcm9tICcuL3dtbC9hY2NvdW50X2FyZWEud21sJztcblxuLyoqXG4gKiBBY2NvdW50QXJlYVxuICovXG5jbGFzcyBBY2NvdW50QXJlYSBleHRlbmRzIFdpZGdldCB7XG5cbiAgICB0b2dnbGUoKSB7XG5cblxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gVmlldy5yZW5kZXIoYWNjb3VudF9hcmVhLCB0aGlzKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBBY2NvdW50QXJlYVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAobWFrZSkge1xuICByZXR1cm4gbWFrZS5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogbWFrZS5yZXNvbHZlKENsYXNzLCAnTEFZT1VUX0FDQ09VTlRfQVJFQScpIH0sIHdtbDogeyAnaWQnOiBcInJvb3RcIiB9IH0sIFttYWtlLm5vZGUoJ2J1dHRvbicsIHsgaHRtbDogeyAnb25jbGljayc6IHRoaXMudG9nZ2xlLmJpbmQodGhpcykgfSB9LCBbbWFrZS5ub2RlKCdzcGFuJywgeyBodG1sOiB7ICdjbGFzcyc6IG1ha2UucmVzb2x2ZShDbGFzcywgJ0xBWU9VVF9BQ0NPVU5UX0FSRUFfVElUTEUnKSB9IH0sIFt0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd2F0OnRpdGxlJyldKV0pLCBtYWtlLnJlc29sdmUodGhpcywgJ2NoaWxkcmVuJyldKTtcbn07XG5cbnZhciBfd2F0Q2xhc3NlcyA9IHJlcXVpcmUoJ3dhdC1jbGFzc2VzJyk7XG5cbnZhciBDbGFzcyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF93YXRDbGFzc2VzKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQob2JqKSB7IGlmIChvYmogJiYgb2JqLl9fZXNNb2R1bGUpIHsgcmV0dXJuIG9iajsgfSBlbHNlIHsgdmFyIG5ld09iaiA9IHt9OyBpZiAob2JqICE9IG51bGwpIHsgZm9yICh2YXIga2V5IGluIG9iaikgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkgbmV3T2JqW2tleV0gPSBvYmpba2V5XTsgfSB9IG5ld09iai5kZWZhdWx0ID0gb2JqOyByZXR1cm4gbmV3T2JqOyB9IH0iLCJpbXBvcnQgeyBWaWV3LCBXaWRnZXQgfSBmcm9tICd3bWxqcy9saWIvcnVudGltZSc7XG5pbXBvcnQgYWN0aW9uX2FyZWEgZnJvbSAnLi93bWwvYWN0aW9uX2FyZWEud21sJztcblxuLyoqXG4gKiBBY3Rpb25BcmVhXG4gKi9cbmNsYXNzIEFjdGlvbkFyZWEgZXh0ZW5kcyBXaWRnZXQge1xuXG4gICAgY29uc3RydWN0b3IoYXR0cnMsIGNoaWxkcmVuKSB7XG5cbiAgICAgICAgc3VwZXIoYXR0cnMsIGNoaWxkcmVuKTtcblxuICAgICAgICB0aGlzLnZpZXcgPSBuZXcgVmlldyhhY3Rpb25fYXJlYSwgdGhpcyk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzZXRDb250ZW50IHJlcGxhY2VzIHRoZSBjb250ZW50IG9mIHRoaXMgdmlldy5cbiAgICAgKiBAcGFyYW0ge1JlbmRlcmFibGV9IHJcbiAgICAgKi9cbiAgICBzZXRDb250ZW50KHIpIHtcblxuICAgICAgICB2YXIgY29udGVudCA9IHRoaXMudmlldy5maW5kQnlJZCgnY29udGVudCcpO1xuXG4gICAgICAgIHdoaWxlIChjb250ZW50Lmxhc3RDaGlsZClcbiAgICAgICAgICAgIGNvbnRlbnQucmVtb3ZlQ2hpbGQoY29udGVudC5sYXN0Q2hpbGQpO1xuXG4gICAgICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQoci5yZW5kZXIoKSk7XG5cbiAgICB9XG5cbiAgICBub29wKCkge1xuXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiB0aGlzLnZpZXcucmVuZGVyKCk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQWN0aW9uQXJlYVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChtYWtlKSB7XG4gIHJldHVybiBtYWtlLm5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiBtYWtlLnJlc29sdmUoQ2xhc3MsICdMQVlPVVRfQUNUSU9OX0FSRUEnKSB9IH0sIFttYWtlLndpZGdldChfTWVudUJ1dHRvbjIuZGVmYXVsdCwgeyBodG1sOiB7fSwgd2F0OiB7ICdvbkNsaWNrJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDpvbk1lbnVCdXR0b25DbGlja2VkJywgbWFrZS5yZXNvbHZlKHRoaXMsICdub29wJykpIH0gfSwgW10pLCBtYWtlLm5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiBtYWtlLnJlc29sdmUoQ2xhc3MsICdMQVlPVVRfQUNUSU9OX0FSRUFfQ09OVEVOVCcpIH0sIHdtbDogeyAnaWQnOiBcImNvbnRlbnRcIiB9IH0sIFttYWtlLnJlc29sdmUodGhpcywgJ2NoaWxkcmVuJyldKV0pO1xufTtcblxudmFyIF9NZW51QnV0dG9uID0gcmVxdWlyZShcIi4uLy4uL21lbnUtYnV0dG9uL01lbnVCdXR0b25cIik7XG5cbnZhciBfTWVudUJ1dHRvbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9NZW51QnV0dG9uKTtcblxudmFyIF93YXRDbGFzc2VzID0gcmVxdWlyZShcIndhdC1jbGFzc2VzXCIpO1xuXG52YXIgQ2xhc3MgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfd2F0Q2xhc3Nlcyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKG9iaikgeyBpZiAob2JqICYmIG9iai5fX2VzTW9kdWxlKSB7IHJldHVybiBvYmo7IH0gZWxzZSB7IHZhciBuZXdPYmogPSB7fTsgaWYgKG9iaiAhPSBudWxsKSB7IGZvciAodmFyIGtleSBpbiBvYmopIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIG5ld09ialtrZXldID0gb2JqW2tleV07IH0gfSBuZXdPYmouZGVmYXVsdCA9IG9iajsgcmV0dXJuIG5ld09iajsgfSB9XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9IiwiaW1wb3J0IHsgVmlldywgV2lkZ2V0IH0gZnJvbSAnd21sanMvbGliL3J1bnRpbWUnO1xuaW1wb3J0IGNvbnRhaW5lciBmcm9tICcuL3dtbC9jb250YWluZXIud21sJztcblxuLyoqXG4gKiBMYXlvdXRDb250YWluZXIgcHJvdmlkZXMgdGhlIHdpZGdldCB0aGF0IHdyYXBzIGFsbCB0aGUgY29udGVudCB0b2dldGhlciAoRHJhd2VyIGFuZCBjb250ZW50IGFyZWEpLlxuICovXG5jbGFzcyBMYXlvdXRDb250YWluZXIgZXh0ZW5kcyBXaWRnZXQge1xuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiBWaWV3LnJlbmRlcihjb250YWluZXIsIHRoaXMpO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IExheW91dENvbnRhaW5lclxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAobWFrZSkge1xuICByZXR1cm4gbWFrZS5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogbWFrZS5yZXNvbHZlKENsYXNzLCAnTEFZT1VUX0NPTlRBSU5FUicpIH0gfSwgW21ha2UucmVzb2x2ZSh0aGlzLCAnY2hpbGRyZW4nKV0pO1xufTtcblxudmFyIF93YXRDbGFzc2VzID0gcmVxdWlyZSgnd2F0LWNsYXNzZXMnKTtcblxudmFyIENsYXNzID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX3dhdENsYXNzZXMpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChvYmopIHsgaWYgKG9iaiAmJiBvYmouX19lc01vZHVsZSkgeyByZXR1cm4gb2JqOyB9IGVsc2UgeyB2YXIgbmV3T2JqID0ge307IGlmIChvYmogIT0gbnVsbCkgeyBmb3IgKHZhciBrZXkgaW4gb2JqKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSBuZXdPYmpba2V5XSA9IG9ialtrZXldOyB9IH0gbmV3T2JqLmRlZmF1bHQgPSBvYmo7IHJldHVybiBuZXdPYmo7IH0gfSIsImltcG9ydCB7IFZpZXcsIFdpZGdldCB9IGZyb20gJ3dtbGpzL2xpYi9ydW50aW1lJztcbmltcG9ydCBkcmF3ZXIgZnJvbSAnLi93bWwvZHJhd2VyLndtbCc7XG5pbXBvcnQgKiBhcyBDbGFzcyBmcm9tICd3YXQtY2xhc3Nlcyc7XG5cbi8qKlxuICogRHJhd2VyXG4gKi9cbmNsYXNzIERyYXdlciBleHRlbmRzIFdpZGdldCB7XG5cbiAgICBjb25zdHJ1Y3RvcihhdHRycywgY2hpbGRyZW4pIHtcblxuICAgICAgICBzdXBlcihhdHRycywgY2hpbGRyZW4pO1xuICAgICAgICB0aGlzLnZpZXcgPSBuZXcgVmlldyhkcmF3ZXIsIHRoaXMpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogdG9nZ2xlIHRoZSB2aXNpYmlsaXR5IG9mIHRoaXMgRHJhd2VyXG4gICAgICovXG4gICAgdG9nZ2xlKCkge1xuXG4gICAgICAgIHRoaXMudmlldy5maW5kQnlJZCgnZHJhd2VyJykuY2xhc3NMaXN0LnRvZ2dsZShDbGFzcy5WSVNJQkxFKTtcblxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy52aWV3LnJlbmRlcigpO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IERyYXdlclxuIiwiaW1wb3J0IHsgVmlldywgV2lkZ2V0IH0gZnJvbSAnd21sanMvbGliL3J1bnRpbWUnO1xuaW1wb3J0ICogYXMgQ2xhc3MgZnJvbSAnd2F0LWNsYXNzZXMnO1xuaW1wb3J0IGRyYXdlcl9saW5rIGZyb20gJy4vd21sL2RyYXdlcl9saW5rLndtbCc7XG5cbi8qKlxuICogRHJhd2VyTGlua1xuICovXG5jbGFzcyBEcmF3ZXJMaW5rIGV4dGVuZHMgV2lkZ2V0IHtcblxuICAgIGNvbnN0cnVjdG9yKGF0dHJzLCBjaGlsZHJlbikge1xuXG4gICAgICAgIHN1cGVyKGF0dHJzLCBjaGlsZHJlbik7XG4gICAgICAgIHRoaXMuaHJlZiA9IGF0dHJzLnJlYWQoJ3dhdDpocmVmJyk7XG4gICAgICAgIHRoaXMudmlldyA9IG5ldyBWaWV3KGRyYXdlcl9saW5rLCB0aGlzKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGFkZCB0aGUgYWN0aXZlIHN0YXRlIG9mIHRoaXMgRHJhd2VyTGlua1xuICAgICAqL1xuICAgIGFjdGl2YXRlKCkge1xuXG4gICAgICAgIHZhciBhID0gdGhpcy52aWV3LmZpbmRCeUlkKCdhJyk7XG4gICAgICAgIHZhciBjaGlsZHJlbiA9IHRoaXMudmlldy5maW5kQnlJZCgnYScpLnBhcmVudE5vZGUuY2hpbGRyZW47XG5cbiAgICAgICAgYS5jbGFzc0xpc3QucmVtb3ZlKENsYXNzLkFDVElWRSk7XG4gICAgICAgIGEuY2xhc3NMaXN0LmFkZChDbGFzcy5BQ1RJVkUpO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICBpZiAoY2hpbGRyZW5baV0ubm9kZU5hbWUgPT09ICdBJylcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGRyZW5baV0gIT09IGEpXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuW2ldLmNsYXNzTGlzdC5yZW1vdmUoQ2xhc3MuQUNUSVZFKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGRlYWN0aXZhdGUgdGhpcyBEcmF3ZXJMaW5rXG4gICAgICovXG4gICAgZGVhY3RpdmF0ZSgpIHtcblxuICAgICAgICB0aGlzLnZpZXcuZmluZEJ5SWQoJ2EnKS5jbGFzc0xpc3QucmVtb3ZlKENsYXNzLkFDVElWRSk7XG5cbiAgICB9XG5cbiAgICBjbGlja2VkKCkge1xuXG4gICAgICAgIHRoaXMuYWN0aXZhdGUoKTtcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDpvbkNsaWNrJywgZnVuY3Rpb24oKSB7fSkodGhpcyk7XG5cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMudmlldy5yZW5kZXIoKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBEcmF3ZXJMaW5rXG4iLCJpbXBvcnQgeyBWaWV3LCBXaWRnZXQgfSBmcm9tICd3bWxqcy9saWIvcnVudGltZSc7XG5pbXBvcnQgZHJhd2VyX25hdmlnYXRpb24gZnJvbSAnLi93bWwvZHJhd2VyX25hdmlnYXRpb24ud21sJztcbmltcG9ydCAqIGFzIENsYXNzIGZyb20gJ3dhdC1jbGFzc2VzJztcblxuLyoqXG4gKiBEcmF3ZXJOYXZpZ2F0aW9uXG4gKi9cbmNsYXNzIERyYXdlck5hdmlnYXRpb24gZXh0ZW5kcyBXaWRnZXQge1xuXG4gICAgY29uc3RydWN0b3IoYXR0cnMsIGNoaWxkcmVuKSB7XG5cbiAgICAgICAgc3VwZXIoYXR0cnMsIGNoaWxkcmVuKTtcblxuICAgICAgICB0aGlzLnZpZXcgPSBuZXcgVmlldyhkcmF3ZXJfbmF2aWdhdGlvbiwgdGhpcyk7XG5cbiAgICB9XG5cbiAgICBoYW5kbGVFdmVudChlKSB7XG5cbiAgICAgICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcblxuICAgICAgICAgICAgaWYgKGNoaWxkICE9PSBlLnRhcmdldClcbiAgICAgICAgICAgICAgICBjaGlsZC5jbGFzc0xpc3QucmVtb3ZlKENsYXNzLkFDVElWRSk7XG5cbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICBvblJlbmRlcmVkKCkge1xuXG4gICAgICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG5cbiAgICAgICAgICAgIGNoaWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcyk7XG5cbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMudmlldy5yZW5kZXIoKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBEcmF3ZXJOYXZpZ2F0aW9uXG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChtYWtlKSB7XG4gIHJldHVybiBtYWtlLm5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiBtYWtlLnJlc29sdmUoQ2xhc3MsICdMQVlPVVRfRFJBV0VSJykgfSwgd21sOiB7ICdpZCc6IFwiZHJhd2VyXCIgfSB9LCBbbWFrZS5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogbWFrZS5yZXNvbHZlKENsYXNzLCAnTEFZT1VUX0RSQVdFUl9DT05URU5UJykgfSB9LCBbbWFrZS5yZXNvbHZlKHRoaXMsICdjaGlsZHJlbicpXSldKTtcbn07XG5cbnZhciBfd2F0Q2xhc3NlcyA9IHJlcXVpcmUoJ3dhdC1jbGFzc2VzJyk7XG5cbnZhciBDbGFzcyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF93YXRDbGFzc2VzKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQob2JqKSB7IGlmIChvYmogJiYgb2JqLl9fZXNNb2R1bGUpIHsgcmV0dXJuIG9iajsgfSBlbHNlIHsgdmFyIG5ld09iaiA9IHt9OyBpZiAob2JqICE9IG51bGwpIHsgZm9yICh2YXIga2V5IGluIG9iaikgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkgbmV3T2JqW2tleV0gPSBvYmpba2V5XTsgfSB9IG5ld09iai5kZWZhdWx0ID0gb2JqOyByZXR1cm4gbmV3T2JqOyB9IH0iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChtYWtlKSB7XG4gIHJldHVybiBtYWtlLm5vZGUoJ2EnLCB7IGh0bWw6IHsgJ2NsYXNzJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDphY3RpdmUnLCBmYWxzZSkgPyBtYWtlLnJlc29sdmUoQ2xhc3MsICdBQ1RJVkUnKSA6ICcnLCAnaHJlZic6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3YXQ6aHJlZicpLCAnb25jbGljayc6IHRoaXMuY2xpY2tlZC5iaW5kKHRoaXMpIH0sIHdtbDogeyAnaWQnOiBcImFcIiB9IH0sIFttYWtlLiRpZih0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd2F0Omljb24tY2xhc3MnLCBmYWxzZSksIGZ1bmN0aW9uIGlmMCgpIHtcbiAgICByZXR1cm4gW21ha2Uubm9kZSgnaScsIHsgaHRtbDogeyAnY2xhc3MnOiBtYWtlLnJlc29sdmUoQ2xhc3MsICdMQVlPVVRfRFJBV0VSX0xJTktfSUNPTicpICsgdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDppY29uLWNsYXNzJykgfSB9LCBbXSldO1xuICB9LmJpbmQodGhpcyksIG1ha2Uubm9vcCksIHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3YXQ6dGl0bGUnKSwgbWFrZS5yZXNvbHZlKHRoaXMsICdjaGlsZHJlbicpXSk7XG59O1xuXG52YXIgX3dhdENsYXNzZXMgPSByZXF1aXJlKCd3YXQtY2xhc3NlcycpO1xuXG52YXIgQ2xhc3MgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfd2F0Q2xhc3Nlcyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKG9iaikgeyBpZiAob2JqICYmIG9iai5fX2VzTW9kdWxlKSB7IHJldHVybiBvYmo7IH0gZWxzZSB7IHZhciBuZXdPYmogPSB7fTsgaWYgKG9iaiAhPSBudWxsKSB7IGZvciAodmFyIGtleSBpbiBvYmopIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIG5ld09ialtrZXldID0gb2JqW2tleV07IH0gfSBuZXdPYmouZGVmYXVsdCA9IG9iajsgcmV0dXJuIG5ld09iajsgfSB9IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAobWFrZSkge1xuICByZXR1cm4gbWFrZS5ub2RlKCduYXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogbWFrZS5yZXNvbHZlKENsYXNzLCAnTEFZT1VUX0RSQVdFUl9OQVZJR0FUSU9OJykgfSwgd21sOiB7ICdpZCc6IFwibmF2XCIgfSB9LCBbbWFrZS5yZXNvbHZlKHRoaXMsICdjaGlsZHJlbicpXSk7XG59O1xuXG52YXIgX3dhdENsYXNzZXMgPSByZXF1aXJlKCd3YXQtY2xhc3NlcycpO1xuXG52YXIgQ2xhc3MgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfd2F0Q2xhc3Nlcyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKG9iaikgeyBpZiAob2JqICYmIG9iai5fX2VzTW9kdWxlKSB7IHJldHVybiBvYmo7IH0gZWxzZSB7IHZhciBuZXdPYmogPSB7fTsgaWYgKG9iaiAhPSBudWxsKSB7IGZvciAodmFyIGtleSBpbiBvYmopIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIG5ld09ialtrZXldID0gb2JqW2tleV07IH0gfSBuZXdPYmouZGVmYXVsdCA9IG9iajsgcmV0dXJuIG5ld09iajsgfSB9IiwiLyoganNoaW50IGlnbm9yZTpzdGFydCAqL1xuZXhwb3J0IExheW91dENvbnRhaW5lciBmcm9tICcuL2NvbnRhaW5lci9MYXlvdXRDb250YWluZXInO1xuZXhwb3J0IERyYXdlciBmcm9tICcuL2RyYXdlci9EcmF3ZXInO1xuZXhwb3J0IERyYXdlck5hdmlnYXRpb24gZnJvbSAnLi9kcmF3ZXIvRHJhd2VyTmF2aWdhdGlvbic7XG5leHBvcnQgRHJhd2VyTGluayBmcm9tICcuL2RyYXdlci9EcmF3ZXJMaW5rJztcbmV4cG9ydCBNYWluIGZyb20gJy4vbWFpbi9NYWluJztcbmV4cG9ydCBBY3Rpb25BcmVhIGZyb20gJy4vYWN0aW9uLWFyZWEvQWN0aW9uQXJlYSc7XG5leHBvcnQgTWVudUJ1dHRvbiBmcm9tICcuL21lbnUtYnV0dG9uL01lbnVCdXR0b24nO1xuZXhwb3J0IExvZ29JbWFnZSBmcm9tICcuL2xvZ29pbWFnZS9Mb2dvSW1hZ2UnO1xuZXhwb3J0IEFjY291bnRBcmVhIGZyb20gJy4vYWNjb3VudC1hcmVhL0FjY291bnRBcmVhJztcbmV4cG9ydCBOb3RpZmljYXRpb24gZnJvbSAnLi9ub3RpZmljYXRpb24vTm90aWZpY2F0aW9uJztcbi8qIGpzaGludCBpZ25vcmU6ZW5kICovXG4iLCJpbXBvcnQgeyBWaWV3LCBXaWRnZXQgfSBmcm9tICd3bWxqcy9saWIvcnVudGltZSc7XG5pbXBvcnQgbG9nb2ltYWdlIGZyb20gJy4vd21sL2xvZ29pbWFnZS53bWwnO1xuXG4vKipcbiAqIExvZ29JbWFnZVxuICovXG5jbGFzcyBMb2dvSW1hZ2UgZXh0ZW5kcyBXaWRnZXQge1xuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiBWaWV3LnJlbmRlcihsb2dvaW1hZ2UsIHRoaXMpO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IExvZ29JbWFnZVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAobWFrZSkge1xuICByZXR1cm4gbWFrZS5ub2RlKCdoZWFkZXInLCB7IGh0bWw6IHsgJ2NsYXNzJzogbWFrZS5yZXNvbHZlKENsYXNzLCAnTEFZT1VUX0xPR09JTUFHRScpIH0gfSwgW21ha2UuJGlmKHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3YXQ6aW1hZ2UnLCBmYWxzZSksIGZ1bmN0aW9uIGlmMCgpIHtcbiAgICByZXR1cm4gW21ha2Uubm9kZSgnaDEnLCB7IGh0bWw6IHt9IH0sIFttYWtlLm5vZGUoJ2EnLCB7IGh0bWw6IHsgJ2hyZWYnOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd2F0OmhyZWYnLCAnIycpIH0gfSwgW21ha2Uubm9kZSgnaW1nJywgeyBodG1sOiB7ICdjbGFzcyc6IG1ha2UucmVzb2x2ZShDbGFzcywgJ0xBWU9VVF9MT0dPSU1BR0VfSU1BR0UnKSwgJ3NyYyc6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3YXQ6aW1hZ2UnKSwgJ2FsdCc6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3YXQ6YWx0JykgfSB9LCBbXSldKV0pXTtcbiAgfS5iaW5kKHRoaXMpLCBtYWtlLm5vb3ApXSk7XG59O1xuXG52YXIgX3dhdENsYXNzZXMgPSByZXF1aXJlKCd3YXQtY2xhc3NlcycpO1xuXG52YXIgQ2xhc3MgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfd2F0Q2xhc3Nlcyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKG9iaikgeyBpZiAob2JqICYmIG9iai5fX2VzTW9kdWxlKSB7IHJldHVybiBvYmo7IH0gZWxzZSB7IHZhciBuZXdPYmogPSB7fTsgaWYgKG9iaiAhPSBudWxsKSB7IGZvciAodmFyIGtleSBpbiBvYmopIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIG5ld09ialtrZXldID0gb2JqW2tleV07IH0gfSBuZXdPYmouZGVmYXVsdCA9IG9iajsgcmV0dXJuIG5ld09iajsgfSB9IiwiaW1wb3J0IHsgVmlldywgV2lkZ2V0IH0gZnJvbSAnd21sanMvbGliL3J1bnRpbWUnO1xuaW1wb3J0IG1haW4gZnJvbSAnLi93bWwvbWFpbi53bWwnO1xuXG4vKipcbiAqIE1haW4gYXJlYSBmb3IgY29udGVudCBpbiB0aGUgbGF5b3V0LlxuICovXG5jbGFzcyBNYWluIGV4dGVuZHMgV2lkZ2V0IHtcblxuICAgIGNvbnN0cnVjdG9yKGF0dHJzLCBjaGlsZHJlbikge1xuXG4gICAgICAgIHN1cGVyKGF0dHJzLCBjaGlsZHJlbik7XG4gICAgICAgIHRoaXMudmlldyA9IG5ldyBWaWV3KG1haW4sIHRoaXMpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogc2V0Q29udGVudCByZXBsYWNlcyB0aGUgY29udGVudCBvZiB0aGlzIE1haW4gdmlldy5cbiAgICAgKiBAcGFyYW0ge1JlbmRlcmFibGV9IHJcbiAgICAgKi9cbiAgICBzZXRDb250ZW50KHIpIHtcblxuICAgICAgICB2YXIgcm9vdCA9IHRoaXMudmlldy5maW5kQnlJZCgncm9vdCcpO1xuXG4gICAgICAgIHdoaWxlIChyb290Lmxhc3RDaGlsZClcbiAgICAgICAgICAgIHJvb3QucmVtb3ZlQ2hpbGQocm9vdC5sYXN0Q2hpbGQpO1xuXG4gICAgICAgIHJvb3QuYXBwZW5kQ2hpbGQoci5yZW5kZXIoKSk7XG5cblxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy52aWV3LnJlbmRlcigpO1xuXG4gICAgfVxuXG59XG5leHBvcnQgZGVmYXVsdCBNYWluXG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChtYWtlKSB7XG4gIHJldHVybiBtYWtlLm5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiBtYWtlLnJlc29sdmUoQ2xhc3MsICdMQVlPVVRfTUFJTicpIH0gfSwgW21ha2UucmVzb2x2ZSh0aGlzLCAnY2hpbGRyZW4nKV0pO1xufTtcblxudmFyIF93YXRDbGFzc2VzID0gcmVxdWlyZSgnd2F0LWNsYXNzZXMnKTtcblxudmFyIENsYXNzID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX3dhdENsYXNzZXMpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChvYmopIHsgaWYgKG9iaiAmJiBvYmouX19lc01vZHVsZSkgeyByZXR1cm4gb2JqOyB9IGVsc2UgeyB2YXIgbmV3T2JqID0ge307IGlmIChvYmogIT0gbnVsbCkgeyBmb3IgKHZhciBrZXkgaW4gb2JqKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSBuZXdPYmpba2V5XSA9IG9ialtrZXldOyB9IH0gbmV3T2JqLmRlZmF1bHQgPSBvYmo7IHJldHVybiBuZXdPYmo7IH0gfSIsImltcG9ydCB7IFZpZXcsIFdpZGdldCB9IGZyb20gJ3dtbGpzL2xpYi9ydW50aW1lJztcbmltcG9ydCBtZW51X2J1dHRvbiBmcm9tICcuL3dtbC9tZW51X2J1dHRvbi53bWwnO1xuXG4vKipcbiAqIE1lbnVCdXR0b24gcHJvdmlkZXMgYSAnaGFtYnVyZ2VyJyBtZW51IGJ1dHRvbi5cbiAqL1xuY2xhc3MgTWVudUJ1dHRvbiBleHRlbmRzIFdpZGdldCB7XG5cbiAgICBjbGlja2VkKGUpIHtcblxuICAgICAgICB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd2F0Om9uQ2xpY2snLCBmdW5jdGlvbigpIHt9KSgpO1xuXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiBWaWV3LnJlbmRlcihtZW51X2J1dHRvbiwgdGhpcyk7XG5cbiAgICB9XG5cblxufVxuXG5leHBvcnQgZGVmYXVsdCBNZW51QnV0dG9uXG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChtYWtlKSB7XG4gIHJldHVybiBtYWtlLm5vZGUoJ2J1dHRvbicsIHsgaHRtbDogeyAnY2xhc3MnOiBtYWtlLnJlc29sdmUoQ2xhc3MsICdMQVlPVVRfTUVOVV9CVVRUT04nKSwgJ29uY2xpY2snOiB0aGlzLmNsaWNrZWQuYmluZCh0aGlzKSB9IH0sIFttYWtlLm5vZGUoJ3NwYW4nLCB7IGh0bWw6IHsgJ2NsYXNzJzogXCJcIiB9IH0sIFtdKSwgbWFrZS5ub2RlKCdzcGFuJywgeyBodG1sOiB7ICdjbGFzcyc6IFwiXCIgfSB9LCBbXSksIG1ha2Uubm9kZSgnc3BhbicsIHsgaHRtbDogeyAnY2xhc3MnOiBcIlwiIH0gfSwgW10pXSk7XG59O1xuXG52YXIgX3dhdENsYXNzZXMgPSByZXF1aXJlKCd3YXQtY2xhc3NlcycpO1xuXG52YXIgQ2xhc3MgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfd2F0Q2xhc3Nlcyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKG9iaikgeyBpZiAob2JqICYmIG9iai5fX2VzTW9kdWxlKSB7IHJldHVybiBvYmo7IH0gZWxzZSB7IHZhciBuZXdPYmogPSB7fTsgaWYgKG9iaiAhPSBudWxsKSB7IGZvciAodmFyIGtleSBpbiBvYmopIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIG5ld09ialtrZXldID0gb2JqW2tleV07IH0gfSBuZXdPYmouZGVmYXVsdCA9IG9iajsgcmV0dXJuIG5ld09iajsgfSB9IiwiaW1wb3J0IHsgVmlldywgV2lkZ2V0IH0gZnJvbSAnd21sanMvbGliL3J1bnRpbWUnO1xuaW1wb3J0ICogYXMgQ2xhc3MgZnJvbSAnd2F0LWNsYXNzZXMnO1xuaW1wb3J0IG5vdGlmaWNhdGlvbiBmcm9tICcuL3dtbC9ub3RpZmljYXRpb24ud21sJztcblxuLyoqXG4gKiBOb3RpZmljYXRpb25cbiAqL1xuY2xhc3MgTm90aWZpY2F0aW9uIGV4dGVuZHMgV2lkZ2V0IHtcblxuICAgIGNvbnN0cnVjdG9yKGF0dHJzLCBjaGlsZHJlbikge1xuXG4gICAgICAgIHN1cGVyKGF0dHJzLCBjaGlsZHJlbik7XG5cbiAgICAgICAgdGhpcy52aWV3ID0gbmV3IFZpZXcobm90aWZpY2F0aW9uLCB0aGlzKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHB1dCBhIG1lc3NhZ2UgaW50byB0aGUgbm90aWZpY2F0aW9uIHdpZGdldC5cbiAgICAgKiBNZXNzYWdlcyBhcmUgc2hvd24gZm9yIGEgc3BlY2lmaWMgdGltZSBiZWZvcmVcbiAgICAgKiB0aGV5IGFyZSBoaWRkZW4uXG4gICAgICovXG4gICAgcHV0KG1lc3NhZ2UpIHtcblxuICAgICAgICB2YXIgbm9kZSA9IHRoaXMudmlldy5maW5kQnlJZCgnbWVzc2FnZScpO1xuXG4gICAgICAgIG5vZGUuY2xhc3NMaXN0LnJlbW92ZShDbGFzcy5WSVNJQkxFKTtcblxuICAgICAgICB3aGlsZSAobm9kZS5sYXN0Q2hpbGQpXG4gICAgICAgICAgICBub2RlLnJlbW92ZUNoaWxkKG5vZGUubGFzdENoaWxkKTtcblxuICAgICAgICBub2RlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKG1lc3NhZ2UpKTtcblxuICAgICAgICBub2RlLmNsYXNzTGlzdC5hZGQoQ2xhc3MuVklTSUJMRSk7XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgbm9kZS5jbGFzc0xpc3QucmVtb3ZlKENsYXNzLlZJU0lCTEUpO1xuXG4gICAgICAgIH0sIHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3YXQ6ZGVsYXknLCAzKSAqIDEwMDApO1xuXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiB0aGlzLnZpZXcucmVuZGVyKCk7XG5cbiAgICB9XG5cbn1cbmV4cG9ydCBkZWZhdWx0IE5vdGlmaWNhdGlvblxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAobWFrZSkge1xuICByZXR1cm4gbWFrZS5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogbWFrZS5yZXNvbHZlKENsYXNzLCAnTEFZT1VUX05PVElGSUNBVElPTicpIH0sIHdtbDogeyAnaWQnOiBcIm1lc3NhZ2VcIiB9IH0sIFtdKTtcbn07XG5cbnZhciBfd2F0Q2xhc3NlcyA9IHJlcXVpcmUoJ3dhdC1jbGFzc2VzJyk7XG5cbnZhciBDbGFzcyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF93YXRDbGFzc2VzKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQob2JqKSB7IGlmIChvYmogJiYgb2JqLl9fZXNNb2R1bGUpIHsgcmV0dXJuIG9iajsgfSBlbHNlIHsgdmFyIG5ld09iaiA9IHt9OyBpZiAob2JqICE9IG51bGwpIHsgZm9yICh2YXIga2V5IGluIG9iaikgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkgbmV3T2JqW2tleV0gPSBvYmpba2V5XTsgfSB9IG5ld09iai5kZWZhdWx0ID0gb2JqOyByZXR1cm4gbmV3T2JqOyB9IH0iLCJpbXBvcnQgcHJvcGVydHkgZnJvbSAncHJvcGVydHktc2Vlayc7XG5cbi8qKlxuICogQXR0cmlidXRlcyBwcm92aWRlcyBhbiBBUEkgZm9yIHJlYWRpbmcgdGhlIFxuICogYXR0cmlidXRlcyBzdXBwbGllZCB0byBhbiBFbGVtZW50LlxuICogQHBhcmFtIHtvYmplY3R9IGF0dHJzIFxuICovXG5jbGFzcyBBdHRyaWJ1dGVzIHtcblxuICAgIGNvbnN0cnVjdG9yKGF0dHJzKSB7XG5cbiAgICAgICAgdGhpcy5fYXR0cnMgPSBhdHRycztcblxuICAgIH1cblxuICAgIHN0YXRpYyBpc3NldCh2YWx1ZSkge1xuXG4gICAgICByZXR1cm4gW251bGwsIHVuZGVmaW5lZF0uaW5kZXhPZih2YWx1ZSkgPCAwO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmVhZCBhIHZhbHVlIGZvcm0gdGhlIGludGVybmFsIGxpc3QuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGggXG4gICAgICogQHBhcmFtIHsqfSBkZWZhdWx0VmFsdWUgLSBUaGlzIHZhbHVlIGlzIHJldHVybmVkIGlmIHRoZSB2YWx1ZSBpcyBub3Qgc2V0LlxuICAgICAqL1xuICAgIHJlYWQocGF0aCwgZGVmYXVsdFZhbHVlKSB7XG5cbiAgICAgICAgdmFyIHJldCA9IHByb3BlcnR5KHRoaXMuX2F0dHJzLCBwYXRoLnNwbGl0KCc6Jykuam9pbignLicpKTtcblxuICAgICAgICBkZWZhdWx0VmFsdWUgPSBBdHRyaWJ1dGVzLmlzc2V0KGRlZmF1bHRWYWx1ZSk/IGRlZmF1bHRWYWx1ZSA6ICcnO1xuXG4gICAgICAgIGlmKCFBdHRyaWJ1dGVzLmlzc2V0KHJldCkpXG4gICAgICAgICAgICByZXR1cm4gZGVmYXVsdFZhbHVlO1xuXG4gICAgICAgIHJldHVybiByZXQ7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZXF1aXJlIGlzIGxpa2UgcmVhZCBidXQgdGhyb3dzIGFuIEVycm9yIGlmIHRoZSB2YWx1ZSBpcyBub3Qgc3VwcGxpZWQuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGggXG4gICAgICogQHJldHVybnMgeyp9XG4gICAgICovXG4gICAgcmVxdWlyZShwYXRoKSB7XG5cbiAgICAgICAgdmFyIHJldCA9IHRoaXMucmVhZChwYXRoKTtcblxuICAgICAgICBpZighQXR0cmlidXRlcy5pc3NldChyZXQpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKGAke3BhdGh9IGlzIHJlcXVpcmVkIWApO1xuXG4gICAgICAgIHJldHVybiByZXQ7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZXF1aXJlQXJyYXkgcmVxdWlyZXMgdGhlIHZhbHVlIHRvIGJlIGFuIGFycmF5LCBpZiBubyBcbiAgICAgKiB2YWx1ZSBpcyByZWFkIHRoZW4gZGVmYXVsdCBpcyBwcm92aWRlZC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aCBcbiAgICAgKiBAcGFyYW0geyp9IGRlZmF1bHRWYWx1ZSBcbiAgICAgKi9cbiAgICByZXF1aXJlQXJyYXkocGF0aCwgZGVmYXVsdFZhbHVlKSB7XG5cbiAgICAgICAgdmFyIHJldCA9IHRoaXMucmVhZChwYXRoKTtcblxuICAgICAgICBpZighQXR0cmlidXRlcy5pc3NldChyZXQpKSB7XG5cbiAgICAgICAgICAgIGlmIChBdHRyaWJ1dGVzLmlzc2V0KGRlZmF1bHRWYWx1ZSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcblxuICAgICAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKGAke3BhdGh9IGlzIHJlcXVpcmVkIWApO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJldCkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJldDtcblxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgJHtwYXRofSBtdXN0IGJlIGFuIGFycmF5IGdvdCAke3R5cGVvZiByZXR9IWApO1xuXG4gICAgICAgIH1cblxuICAgIH1cblxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEF0dHJpYnV0ZXNcbiIsImltcG9ydCBBdHRyaWJ1dGVzIGZyb20gJy4vQXR0cmlidXRlcyc7XG5pbXBvcnQgcHJvcGVydHkgZnJvbSAncHJvcGVydHktc2Vlayc7XG4vKipcbiAqIEludGVyZmFjZSBmb3IgV2lkZ2V0c1xuICogQGludGVyZmFjZSBXaWRnZXRcbiAqL1xuXG4vKipcbiAqIEludGVyZmFjZSBmb3Igb2JqZWN0cyB0aGF0IGNyZWF0ZSBXaWRnZXRzXG4gKiBAaW50ZXJmYWNlIEZhY3RvcnlcbiAqL1xuXG4vKipcbiAqXG4gKiBjcmVhdGUgdGhlIHdpZGdldFxuICpcbiAqIEBmdW5jdGlvblxuICogQG5hbWUgRmFjdG9yeS5jcmVhdGVcbiAqIEBwYXJhbSB7b2JqZWN0fSBodG1sQXR0cmlidXRlcyBBIGhhc2ggb2YgYXR0cmlidXRlcyBleHBlY3RlZCB0byBiZSBwYXNzZWQgaW50byBET00uXG4gKiBAcGFyYW0ge29iamVjdH0gbnNBdHRyaWJ1dGVzICAgQSBoYXNoIG9mIG5hbWVzcGFjZWQgYXR0cmlidXRlcyBmb3IgZnJhbWV3b3JrIHVzYWdlLlxuICovXG5cblxuLyoqXG4gKiBNYWtlciBpcyB1c2VkIGJ5IGEgd21sIGphdmFzY3JpcHQgdGVtcGxhdGUgdG8gY3JlYXRlIGFzc2V0cy5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHRlbXBsYXRlXG4gKiBAcGFyYW0ge29iamVjdH0gY29udGV4dFxuICogQHRvZG8gQ2xlYW4gdXAgcmVsYXRpb25zaGlwIGJldHdlZW4gVmlld3MgYW5kIHRoZWlyIE1ha2Vycy5cbiAqL1xuY2xhc3MgTWFrZXIge1xuXG4gIGNvbnN0cnVjdG9yKHRlbXBsYXRlLCBjb250ZXh0KSB7XG5cbiAgICB0aGlzLl9pZHMgPSB7fTtcbiAgICB0aGlzLl93aWRnZXRzID0gW107XG4gICAgdGhpcy5fdGVtcGxhdGUgPSB0ZW1wbGF0ZTtcbiAgICB0aGlzLl9jb250ZXh0ID0gY29udGV4dDtcblxuICB9XG5cbiAgLyoqXG4gICAqIHJlc29sdmUgYSBwcm9wZXJ0eSBhY2Nlc3MgZXhwcmVzc2lvbiB0byBhdm9pZFxuICAgKiB0aG93aW5nIGVycm9ycyBpZiBpdCBkb2VzIG5vdCBleGlzdC5cbiAgICogQHBhcmFtIHtvYmplY3R9IGhlYWRcbiAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGhcbiAgICovXG4gIHJlc29sdmUoaGVhZCwgcGF0aCkge1xuXG4gICAgdmFyIHJldCA9IHByb3BlcnR5KGhlYWQsIHBhdGgpO1xuXG4gICAgaWYgKChyZXQgPT09IHVuZGVmaW5lZCkgfHwgKHJldCA9PT0gbnVsbCkpXG4gICAgICByZXQgPSAnJztcblxuICAgIHJldHVybiByZXQ7XG5cbiAgfVxuXG4gIC8qKlxuICAgKkBwcml2YXRlXG4gICAqL1xuICBfYWRvcHQoY2hpbGQsIGUpIHtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KGNoaWxkKSlcbiAgICAgIHJldHVybiBjaGlsZC5mb3JFYWNoKGlubmVyQ2hpbGQgPT4gdGhpcy5fYWRvcHQoaW5uZXJDaGlsZCwgZSkpO1xuXG4gICAgaWYgKGNoaWxkKVxuICAgICAgZS5hcHBlbmRDaGlsZChcbiAgICAgICAgKHR5cGVvZiBjaGlsZCA9PT0gJ29iamVjdCcpID9cbiAgICAgICAgY2hpbGQgOiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjaGlsZCB8fCAnJykpO1xuXG4gIH1cblxuICAvKipcbiAgICogcmVnaXN0ZXIgYSBXaWRnZXQgb3IgTm9kZSBieSB0aGUgc3BlY2lmaWVkIHdtbDppZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICogQHBhcmFtIHtXaWRnZXR8Tm9kZX0gdGFyZ2V0XG4gICAqL1xuICByZWdpc3RlcihpZCwgdGFyZ2V0KSB7XG5cbiAgICBpZiAodGhpcy5faWRzLmhhc093blByb3BlcnR5KGlkKSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRHVwbGljYXRlIGlkICcke2lkfScgZGV0ZWN0ZWQhYCk7XG5cbiAgICB0aGlzLl9pZHNbaWRdID0gdGFyZ2V0O1xuXG4gIH1cblxuICAvKipcbiAgICogbm9vcCBpcyBhIGZ1bmN0aW9uIHRoYXQgZG9lcyBub3RoaW5nLlxuICAgKi9cbiAgbm9vcCgpIHtcblxuICB9XG5cbiAgLyoqXG4gICAqIHRleHQgY3JlYXRlcyBhIERPTVRleHROb2RlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICAgKi9cbiAgdGV4dCh2YWx1ZSkge1xuXG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHZhbHVlIHx8ICcnKTtcblxuICB9XG5cbiAgLyoqXG4gICAqIG5vZGUgaXMgY2FsbGVkIHRvIGNyZWF0ZSBhIHJlZ3VsYXIgRE9NIG5vZGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRhZ1xuICAgKiBAcGFyYW0ge29iamVjdH0gYXR0cmlidXRlc1xuICAgKiBAcGFyYW0ge2FycmF5PHN0cmluZ3xudW1iZXJ8V2lkZ2V0Pn0gY2hpbGRyZW5cbiAgICovXG4gIG5vZGUodGFnLCBhdHRyaWJ1dGVzLCBjaGlsZHJlbikge1xuXG4gICAgdmFyIGUgPSAodGFnID09PSAnZnJhZ21lbnQnKSA/IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSA6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcblxuICAgIGlmICh0eXBlb2YgYXR0cmlidXRlcy5odG1sID09PSAnb2JqZWN0JylcbiAgICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMuaHRtbCkuZm9yRWFjaChrZXkgPT4ge1xuXG4gICAgICAgIGlmICh0eXBlb2YgYXR0cmlidXRlcy5odG1sW2tleV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBlW2tleV0gPSBhdHRyaWJ1dGVzLmh0bWxba2V5XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlLnNldEF0dHJpYnV0ZShrZXksIGF0dHJpYnV0ZXMuaHRtbFtrZXldKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICBjaGlsZHJlbi5mb3JFYWNoKGMgPT4gdGhpcy5fYWRvcHQoYywgZSkpO1xuXG4gICAgaWYgKGF0dHJpYnV0ZXMud21sKVxuICAgICAgaWYgKGF0dHJpYnV0ZXMud21sLmlkKVxuICAgICAgICB0aGlzLnJlZ2lzdGVyKGF0dHJpYnV0ZXMud21sLmlkLCBlKTtcblxuICAgIHJldHVybiBlO1xuXG4gIH1cblxuICAvKipcbiAgICogd2lkZ2V0IGNyZWF0ZXMgYSB3bWwgd2lkZ2V0LlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBDb25zdHJ1dG9yXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBhdHRyaWJ1dGVzXG4gICAqIEBwYXJhbSB7YXJyYXk8c3RyaW5nfG51bWJlcnxXaWRnZXQ+fSBjaGlsZHJlblxuICAgKiBAcmV0dXJuIHtXaWRnZXR9XG4gICAqL1xuICB3aWRnZXQoQ29uc3RydWN0b3IsIGF0dHJpYnV0ZXMsIGNoaWxkcmVuKSB7XG5cbiAgICB2YXIgY2hpbGRzID0gW107XG4gICAgdmFyIHc7XG5cbiAgICBjaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IEFycmF5LmlzQXJyYXkoY2hpbGQpID9cbiAgICAgIGNoaWxkcy5wdXNoLmFwcGx5KGNoaWxkcywgY2hpbGQpIDogY2hpbGRzLnB1c2goY2hpbGQpKTtcblxuICAgIHcgPSBuZXcgQ29uc3RydWN0b3IobmV3IEF0dHJpYnV0ZXMoYXR0cmlidXRlcyksIGNoaWxkcyk7XG5cbiAgICBpZiAoYXR0cmlidXRlcy53bWwpXG4gICAgICBpZiAoYXR0cmlidXRlcy53bWwuaWQpXG4gICAgICAgIHRoaXMucmVnaXN0ZXIoYXR0cmlidXRlcy53bWwuaWQsIHcpO1xuXG4gICAgdGhpcy5fd2lkZ2V0cy5wdXNoKHcpO1xuICAgIHJldHVybiB3LnJlbmRlcigpO1xuXG4gIH1cblxuICAvKipcbiAgICogJGlmIGlzIGNhbGxlZCB0byBjcmVhdGUgYW4gaWYgY29uZGl0aW9uYWwgY29uc3RydWN0XG4gICAqIEBwYXJhbSB7Kn0gcHJlZGljYXRlXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IHBvc2l0aXZlXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IG5lZ2F0aXZlXG4gICAqL1xuICAkaWYocHJlZGljYXRlLCBwb3NpdGl2ZSwgbmVnYXRpdmUpIHtcblxuICAgIHJldHVybiAocHJlZGljYXRlKSA/IHBvc2l0aXZlKCkgOiBuZWdhdGl2ZSgpO1xuXG4gIH1cblxuICAvKipcbiAgICogJGZvciBpcyBjYWxsZWQgdG8gY3JlYXRlIGEgZm9yIGxvb3AgY29uc3RydWN0XG4gICAqIEBwYXJhbSB7SXRlcmFibGV9IGNvbGxlY3Rpb25cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2JcbiAgICovXG4gICRmb3IoY29sbGVjdGlvbiwgY2IpIHtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KGNvbGxlY3Rpb24pKSB7XG5cbiAgICAgIHJldHVybiBjb2xsZWN0aW9uLm1hcChjYik7XG5cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBjb2xsZWN0aW9uID09PSAnb2JqZWN0Jykge1xuXG4gICAgICByZXR1cm4gT2JqZWN0LmtleXMoY29sbGVjdGlvbikubWFwKChrZXksIGksIGFsbCkgPT4gY2IoY29sbGVjdGlvbltrZXldLCBrZXksIGFsbCkpO1xuXG4gICAgfVxuXG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgLyoqXG4gICAqICRzd2l0Y2ggc2ltdWxhdGVzIGEgc3dpdGNoIHN0YXRlbWVudFxuICAgKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ8Ym9vbGVhbn0gdmFsdWVcbiAgICogQHBhcmFtIHtvYmplY3R9IGNhc2VzXG4gICAqL1xuICAkc3dpdGNoKHZhbHVlLCBjYXNlcykge1xuXG4gICAgdmFyIHJlc3VsdCA9IGNhc2VzW3ZhbHVlXTtcbiAgICB2YXIgZGVmYXVsID0gY2FzZXMuZGVmYXVsdDtcblxuICAgIGlmIChyZXN1bHQpIHJldHVybiByZXN1bHQ7XG5cbiAgICBpZiAoZGVmYXVsKSByZXR1cm4gZGVhZnVsO1xuXG4gIH1cblxuICAvKipcbiAgICogc3ByZWFkIGEgdmFyaWFibGUgaW50byBhdHRyaWJ1dGVzXG4gICAqIEBwYXJhbSB7b2JqZWN0fGFycmF5fSB2YWx1ZVxuICAgKiBAcGFyYW0ge29iamVjdH0gYXR0cnNcbiAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgKi9cbiAgc3ByZWFkKHZhbHVlLCBhdHRycywga2V5KSB7XG5cbiAgICB2YXIgdGFyZ2V0O1xuXG4gICAgYXR0cnMgPSBhdHRycyB8fCBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcpXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBTcHJlYWQgdmFsdWVzIG11c3QgYmUgYW4gYXJyYXkgb3Igb2JqZWN0ISBHb3QgJyR7dHlwZW9mIHZhbHVlfSchYCk7XG5cbiAgICBpZiAoa2V5ICE9PSAnJykge1xuXG4gICAgICB0YXJnZXQgPSBwcm9wZXJ0eShhdHRycywga2V5KSB8fCBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgT2JqZWN0LmtleXModmFsdWUpLmZvckVhY2goayA9PiB0YXJnZXRba10gPSB2YWx1ZVtrXSk7XG4gICAgICBwcm9wZXJ0eS5zZXQoYXR0cnMsIGtleSwgdGFyZ2V0KTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIE9iamVjdC5rZXlzKHZhbHVlKS5mb3JFYWNoKGsgPT4gYXR0cnNba10gPSB2YWx1ZVtrXSk7XG5cbiAgICB9XG5cbiAgICByZXR1cm4gYXR0cnM7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBmaW5kQnlJZCByZXR1cm5zIGEgd2lkZ2V0IGZyb20gdGhlIGludGVybmFsIGxpc3QuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKiBAcmV0dXJuIHtvYmplY3R9XG4gICAqL1xuICBmaW5kQnlJZChpZCkge1xuXG4gICAgcmV0dXJuICh0aGlzLl9pZHNbaWRdKSA/IHRoaXMuX2lkc1tpZF0gOiBudWxsO1xuXG4gIH1cblxuICAvKipcbiAgICogcmVuZGVyIHRoZSBET00uXG4gICAqIEByZXR1cm4ge0RPTVRyZWV9XG4gICAqL1xuICByZW5kZXIoKSB7XG5cbiAgICB2YXIgdHJlZSA9IG51bGw7XG5cbiAgICB0aGlzLl9pZHMgPSB7fTtcbiAgICB0aGlzLl93aWRnZXRzLmZvckVhY2godyA9PiB3Lm9uUmVtb3ZlZCgpKTtcbiAgICB0aGlzLl93aWRnZXRzID0gW107XG5cbiAgICB0cmVlID0gdGhpcy5fdGVtcGxhdGUuY2FsbCh0aGlzLl9jb250ZXh0LCB0aGlzKTtcbiAgICB0aGlzLl9pZHMucm9vdCA9ICh0aGlzLl9pZHMucm9vdCk/IHRoaXMuX2lkcy5yb290OnRyZWU7XG4gICAgdGhpcy5fd2lkZ2V0cy5mb3JFYWNoKHcgPT4gdy5vblJlbmRlcmVkKCkpO1xuXG4gICAgcmV0dXJuIHRyZWU7XG5cbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IE1ha2VyXG5cbiIsImltcG9ydCBNYWtlciBmcm9tICcuL01ha2VyJztcblxuLyoqXG4gKiBWaWV3IHByb3ZpZGVzIGFuIEFQSSBmb3IgdHVybmluZyB3bWwgaW50byBhIERPTSB0cmVlLlxuICogQWRkaXRpb25hbGx5IGl0IHByb3ZpZGVzIGEgY29udmVuaWVudCBBUEkgZm9yIHJldHJlaXZpbmcgY3JlYXRlZFxuICogd2lkZ2V0cyBjcmVhdGVkIGR1cmluZyBwYXJzaW5nIHByb3ZpZGluZyBhbiBuZWFyIGN1c3RvbSBlbGVtZW50c1xuICogbGlrZSBmZWVsLlxuICogQHBhcmFtIHtmdW5jdGlvbn0gdGVtcGxhdGUgQSBmdW5jdGlvbiB0aGF0IHdpbGwgYmUgdHJlYXRlZCBhcyBhIHdtbCB0ZW1wbGF0ZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb250ZXh0IEFsbCByZWZlcmVuY2VzIHRvIGB0aGlzYCBpbiB0aGUgdGVtcGxhdGUgd2lsbCByZWZlciB0byB0aGlzIG9iamVjdC5cbiAqIEBwYXJhbSB7fSBsaXN0ZW5lciBcbiAqL1xuY2xhc3MgVmlldyB7XG5cbiAgICBjb25zdHJ1Y3Rvcih0ZW1wbGF0ZSwgY29udGV4dCkge1xuXG4gICAgICAgIHRoaXMuX21ha2VyID0gbmV3IE1ha2VyKHRlbXBsYXRlLCBjb250ZXh0KTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJlbmRlciBpcyBhIGZhY3RvcnkgbWV0aG9kIGZvciBjcmVhdGluZyBhIG5ldyBWaWV3IGFuZCByZW5kZXJpbmdcbiAgICAgKiBpdCdzIGNvbnRlbnRzIGltbWVkaWF0ZWx5LlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IHRlbXBsYXRlXG4gICAgICogQHBhcmFtIHtvYmplY3R8bnVsbH0gY29udGV4dCBcbiAgICAgKiBAcmV0dXJucyB7RG9jdW1lbnRGcmFnbWVudH1cbiAgICAgKi9cbiAgICBzdGF0aWMgcmVuZGVyKHRlbXBsYXRlLCBjb250ZXh0KSB7XG5cbiAgICAgICAgcmV0dXJuIChuZXcgVmlldyh0ZW1wbGF0ZSwgY29udGV4dCkpLnJlbmRlcigpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZmluZEJ5SWQgcmV0cmlldmVzIGFuIGVsZW1lbnQgYnkgaXRzIHdtbDppZCBhdHRyaWJ1dGUuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkIFxuICAgICAqIEByZXR1cm4ge09iamVjdH0gXG4gICAgICovXG4gICAgZmluZEJ5SWQoaWQpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5fbWFrZXIuZmluZEJ5SWQoaWQpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogdXNlIHJlcGxhY2VzIHRoZSB0ZW1wbGF0ZSAoYW5kIG9wdGlvbmFsbHkgY29udGV4dCkgdGhpcyBWaWV3IHVzZXMuXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gdGVtcGxhdGUgXG4gICAgICogQHBhcmFtIHtvYmplY3R9IFtjb250ZXh0XSBcbiAgICAgKiBAcmV0dXJucyB7Vmlld31cbiAgICAgKi9cbiAgICB1c2UodGVtcGxhdGUsIGNvbnRleHQpIHtcblxuICAgICAgICB0aGlzLl9tYWtlciA9IG5ldyBNYWtlcih0ZW1wbGF0ZSwgKGNvbnRleHQpID8gY29udGV4dCA6IHRoaXMuY29udGV4dCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmVuZGVyIHByb3ZpZGVzIHRoZSBET00gb3V0cHV0IG9mIHRoaXMgdmlldy5cbiAgICAgKiBAcmV0dXJuIHtET01Ob2RlfSBcbiAgICAgKi9cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX21ha2VyLnJlbmRlcigpO1xuXG4gICAgfVxuXG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgVmlld1xuIiwiLyoqXG4gKiBXaWRnZXQgY2xhc3MgcmVwcmVzZW50c1xuICovXG5jbGFzcyBXaWRnZXQge1xuXG4gIGNvbnN0cnVjdG9yKGF0dHJzLCBjaGlsZHJlbikge1xuXG4gICAgdGhpcy5hdHRycyA9IGF0dHJzLl9hdHRycztcbiAgICB0aGlzLmF0dHJpYnV0ZXMgPSBhdHRycztcbiAgICB0aGlzLmNoaWxkcmVuID0gY2hpbGRyZW47XG5cbiAgfVxuXG4gIG9uUmVuZGVyZWQoKSB7XG5cbiAgfVxuXG4gIG9uUmVtb3ZlZCgpIHtcblxuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgV2lkZ2V0XG5cbiIsIi8qanNoaW50IGlnbm9yZTpzdGFydCAqL1xuZXhwb3J0IFZpZXcgZnJvbSAnLi9WaWV3JztcbmV4cG9ydCBBdHRyaWJ1dGVzIGZyb20gJy4vQXR0cmlidXRlcyc7XG5leHBvcnQgV2lkZ2V0IGZyb20gJy4vV2lkZ2V0Jztcbi8qanNoaW50IGlnbm9yZTplbmQgKi9cblxuIl19
