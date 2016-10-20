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

},{"./NewUserForm":2,"./wml/layout.wml":3,"wmljs/lib/runtime":81}],2:[function(require,module,exports){
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

},{"./wml/new_user_form.wml":4,"wmljs/lib/runtime":81}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (make) {
  return make.widget(_layout.LayoutContainer, { html: {} }, [make.widget(_components.Modal, { html: {}, wml: { 'id': "modal" } }, []), make.widget(_layout.Drawer, { html: {}, wml: { 'id': "drawer" } }, [make.widget(_layout.LogoImage, { html: {}, wat: { 'image': "img/logo.svg" } }, []), make.widget(_layout.DrawerNavigation, { html: {} }, [make.widget(_layout.DrawerLink, { html: {}, wat: { 'href': "#/dashboard", 'title': "Dashboard", 'active': make.resolve(window, 'location.hash') === '#/dashboard', 'onClick': this.navigate.bind(this) } }, []), make.widget(_layout.DrawerLink, { html: {}, wat: { 'href': "#/messages", 'title': "Messages", 'active': make.resolve(window, 'location.hash') === '#/messages', 'onClick': this.navigate.bind(this) } }, []), make.widget(_layout.DrawerLink, { html: {}, wat: { 'href': "#/invoices", 'title': "Invoices", 'active': make.resolve(window, 'location.hash') === '#/invoices', 'onClick': this.navigate.bind(this) } }, []), make.widget(_layout.DrawerLink, { html: {}, wat: { 'href': "#/users", 'title': "Users", 'active': make.resolve(window, 'location.hash') === '#/users', 'onClick': this.navigate.bind(this) } }, [])]), make.widget(_layout.AccountArea, { html: {}, wat: { 'title': "Jane Joe" } }, [])]), make.widget(_layout.ActionArea, { html: {}, wml: { 'id': "actions" }, wat: { 'onMenuButtonClicked': this.menuButtonClicked.bind(this) } }, [make.node('h3', { html: { 'class': "main-content" } }, [make.widget(_components.BreadCrumbMenu, { html: {} }, [make.widget(_components.BreadCrumb, { html: {}, wat: { 'href': "#" } }, [make.text('Home')]), make.widget(_components.BreadCrumb, { html: {}, wat: { 'href': "#", 'active': true } }, [make.text('Example')])])]), make.node('div', { html: { 'class': "secondary-content" } }, [make.widget(_components.Button, { html: {}, wat: { 'name': "new user", 'variant': "primary", 'text': "New User", 'onClick': this.showNewUserDialog.bind(this) } }, [])])]), make.widget(_layout.Main, { html: {}, wml: { 'id': "content" } }, [make.widget(_components.Container, { html: {} }, [make.widget(_components.Row, { html: {} }, [make.widget(_components.Column, { html: {} }, [make.node('h3', { html: {} }, [make.text('Show disabled?')]), make.widget(_components.Switch, { html: {} }, [])])]), make.widget(_components.Row, { html: {} }, [make.widget(_components.Column, { html: {} }, [make.node('h4', { html: {} }, [make.text('Search Users')])])]), make.widget(_components.Row, { html: {} }, [make.widget(_components.Column, { html: {} }, [make.widget(_components.Autocomplete, { html: {}, wat: { 'inputClass': "form-control", 'name': "user", 'value': "Richard", 'set': this.userSelected.bind(this), 'search': this.searchUsers.bind(this) } }, [])])])])]), make.widget(_layout.Notification, { html: {}, wml: { 'id': "notifications" } }, [])]);
};

var _layout = require('layout');

var _components = require('components');

module.exports = exports['default'];
},{"components":36,"layout":68}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
        value: true
});

exports.default = function (make) {
        return make.node('fragment', { html: {} }, [make.widget(_components.ModalHeader, { html: {} }, [make.text('\n        Create a new user\n    ')]), make.widget(_components.ModalBody, { html: {} }, [make.node('p', { html: {} }, [make.text(' :O')])]), make.widget(_components.ModalFooter, { html: {} }, [make.widget(_components.Button, { html: {}, wat: { 'variant': "default", 'onClick': this.cancel.bind(this), 'text': "Cancel" } }, []), make.widget(_components.Button, { html: {}, wat: { 'variant': "primary", 'onClick': this.save.bind(this), 'text': "Save" } }, [])])]);
};

var _components = require('components');

module.exports = exports['default'];
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

},{"./wml/column.wml":53,"wmljs/lib/runtime":81}],13:[function(require,module,exports){
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

},{"./wml/container.wml":54,"wmljs/lib/runtime":81}],14:[function(require,module,exports){
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

},{"./wml/row.wml":55,"wmljs/lib/runtime":81}],15:[function(require,module,exports){
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

},{"wmljs/lib/runtime":81}],16:[function(require,module,exports){
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

},{"./PopulatedDelegate":18,"./RestDelegate":19,"./SearchDelegate":20,"./SelectionDelegate":21,"./wml/layout.wml":22,"lodash.throttle":9,"nop":10,"property-seek":11,"wmljs/lib/runtime":81}],17:[function(require,module,exports){
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

},{"./AutocompleteDelegate":17,"wat-classes":5,"wmljs/lib/runtime":81}],19:[function(require,module,exports){
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

},{"./AutocompleteDelegate":17,"./wml/options.wml":23,"beof":8,"nop":10,"wat-classes":5,"wmljs/lib/runtime":81}],21:[function(require,module,exports){
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

},{"./AutocompleteDelegate":17,"wat-classes":5,"wmljs/lib/runtime":81}],22:[function(require,module,exports){
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

module.exports = exports['default'];
},{"wat-classes":5}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (make) {
  return make.node('ul', { html: {} }, [make.$for(make.resolve(this, 'options'), function for_1(option, index, array) {
    return [make.node('li', { html: { 'class': make.resolve(Class, 'WAT_KIT_AUTOCOMPLETE_ITEM_WRAPPER'), 'onclick': this.selected.bind(this, index) } }, [make.$if(this.autocomplete.attributes.read('wat:optionTemplate'), function if_0() {
      return [make.$if(this.autocomplete.attributes.read('wat:valueField'), function if_0() {
        return [this.autocomplete.attributes.read('wat:optionTemplate').apply(this, [make].concat([(0, _propertySeek2.default)(option, this.autocomplete.read('wat:valueField')), index, option]))];
      }.bind(this), function else_0() {
        return [this.autocomplete.attributes.read('wat:optionTemplate').apply(this, [make].concat([option, index, make.resolve(this, 'options')]))];
      }.bind(this))];
    }.bind(this), function else_0() {
      return [make.$if(this.autocomplete.attributes.read('wat:valueField'), function if_0() {
        return [(0, _propertySeek2.default)(option, this.autocomplete.attributes.read('wat:valueField'))];
      }.bind(this), function else_0() {
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

module.exports = exports['default'];
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

},{"./wml/item.wml":26,"wmljs/lib/runtime":81}],25:[function(require,module,exports){
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

},{"./BreadCrumb":24,"./wml/menu.wml":27,"wmljs/lib/runtime":81}],26:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (make) {
  return make.node('li', { html: {} }, [make.$if(this.attributes.read('wat:active', false), function if_0() {
    return [make.resolve(this, 'children')];
  }.bind(this), function else_0() {
    return [make.node('a', { html: { 'href': this.attributes.read('wat:href', '#') } }, [make.resolve(this, 'children')])];
  }.bind(this))]);
};

module.exports = exports['default'];
},{}],27:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (make) {
  return make.node('ol', { html: { 'class': "breadcrumb" } }, [make.resolve(this, 'children')]);
};

module.exports = exports['default'];
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

            this.view.findById('root').setAttribute('disabled', 'disabled');
        }

        /**
         * enable this button.
         */

    }, {
        key: 'enable',
        value: function enable() {

            this.view.findById('root').removeAttribute('disabled');
        }
    }, {
        key: 'onRendered',
        value: function onRendered() {

            if (this.attributes.read('wat:disabled')) this.view.findById('root').setAttribute('disabled', 'disabled');
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

},{"./wml/button.wml":29,"wmljs/lib/runtime":81}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (make) {
  return make.node('button', { html: { 'name': this.attributes.read('wat:name'), 'class': this.getClass(), 'onclick': this.clicked.bind(this) } }, [this.attributes.read('wat:text'), make.resolve(this, 'children')]);
};

module.exports = exports['default'];
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

},{"./wml/card.wml":33,"wmljs/lib/runtime":81}],31:[function(require,module,exports){
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

},{"./wml/card_block.wml":34,"wmljs/lib/runtime":81}],32:[function(require,module,exports){
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

},{"./wml/card_image.wml":35,"wmljs/lib/runtime":81}],33:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (make) {
  return make.node('div', { html: { 'class': "card" } }, [make.resolve(this, 'children')]);
};

module.exports = exports['default'];
},{}],34:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (make) {
  return make.node('div', { html: { 'class': "card-block" } }, [make.resolve(this, 'children')]);
};

module.exports = exports['default'];
},{}],35:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (make) {
  return make.node('img', { html: { 'src': this.attributes.read('wat:src'), 'alt': this.attributes.read('wat:alt') } }, []);
};

module.exports = exports['default'];
},{}],36:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardBlock = exports.CardImage = exports.Card = exports.Well = exports.Jumbotron = exports.Switch = exports.Input = exports.Autocomplete = exports.Table = exports.Row = exports.Column = exports.Container = exports.ModalFooter = exports.ModalBody = exports.ModalHeader = exports.Modal = exports.Button = exports.BreadCrumb = exports.BreadCrumbMenu = undefined;

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
exports.Switch = _Switch3.default;
exports.Jumbotron = _Jumbotron3.default;
exports.Well = _Well3.default;
exports.Card = _Card3.default;
exports.CardImage = _CardImage3.default;
exports.CardBlock = _CardBlock3.default;
/* jshint ignore:end */

},{"./Column":12,"./Container":13,"./Row":14,"./Table":15,"./autocomplete/Autocomplete":16,"./breadcrumbs/BreadCrumb":24,"./breadcrumbs/BreadCrumbMenu":25,"./button/Button":28,"./card/Card":30,"./card/CardBlock":31,"./card/CardImage":32,"./input/Input":37,"./jumbotron/Jumbotron":39,"./modal/Modal":41,"./modal/ModalBody":42,"./modal/ModalFooter":43,"./modal/ModalHeader":44,"./switch/Switch":49,"./well/Well":51}],37:[function(require,module,exports){
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

},{"./wml/layout.wml":38,"wmljs/lib/runtime":81}],38:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (make) {
  return make.node('div', { html: { 'class': this.getClass() } }, [make.node('label', { html: { 'for': this.attributes.read('wat:id'), 'class': "control-label" } }, [this.attributes.read('wat:label')]), make.$if(this.attributes.read('wat:type', 'text') !== 'textarea', function if_0() {
    return [make.node('input', { html: { 'id': this.attributes.read('wat:id'), 'name': this.attributes.read('wat:name'), 'type': this.attributes.read('wat:type', 'text'), 'oninput': this.input.bind(this), 'value': this.attributes.read('wat:value'), 'class': "form-control" }, wml: { 'id': "input" } }, [])];
  }.bind(this), function else_0() {
    return [make.node('textarea', { html: { 'id': this.attributes.read('wat:id'), 'class': "form-control", 'name': this.attributes.read('wat:name'), 'type': this.attributes.read('wat:type', 'text'), 'oninput': this.input.bind(this), 'value': this.attributes.read('wat:value'), 'rows': this.attributes.read('wat:rows') } }, [])];
  }.bind(this)), make.node('span', { html: { 'class': "help-block" }, wml: { 'id': "message" } }, [this.attributes.read('message', '')])]);
};

module.exports = exports['default'];
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

},{"./wml/layout.wml":40,"wmljs/lib/runtime":81}],40:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (make) {
  return make.node('div', { html: { 'class': "jumbotron" } }, [make.resolve(this, 'children')]);
};

module.exports = exports['default'];
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

},{"./wml/modal.wml":45,"wmljs/lib/runtime":81}],42:[function(require,module,exports){
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

},{"./wml/modal_body.wml":46,"wmljs/lib/runtime":81}],43:[function(require,module,exports){
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

},{"./wml/modal_footer.wml":47,"wmljs/lib/runtime":81}],44:[function(require,module,exports){
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

},{"./wml/modal_header.wml":48,"wmljs/lib/runtime":81}],45:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (make) {
  return make.node('div', { html: { 'class': this.attributes.read('wat:class', 'modal fade'), 'tabindex': "-1", 'role': "dialog" } }, [make.node('div', { html: { 'class': 'modal-dialog ' + this.attributes.read('wat:sizeClass', 'modal-md'), 'role': "document" } }, [make.node('div', { html: { 'class': "modal-content" }, wml: { 'id': "root" } }, [make.resolve(this, 'children')])])]);
};

module.exports = exports['default'];
},{}],46:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (make) {
  return make.node('div', { html: { 'class': "modal-body" } }, [make.resolve(this, 'children')]);
};

module.exports = exports['default'];
},{}],47:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (make) {
  return make.node('div', { html: { 'class': "modal-footer" } }, [make.resolve(this, 'children')]);
};

module.exports = exports['default'];
},{}],48:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (make) {
  return make.node('div', { html: { 'class': "modal-header" } }, [make.node('button', { html: { 'type': "button", 'class': "close", 'data-dismiss': "modal", 'aria-label': "Close" } }, [make.node('span', { html: { 'aria-hidden': "true" } }, [make.text('×')])]), make.resolve(this, 'children')]);
};

module.exports = exports['default'];
},{}],49:[function(require,module,exports){
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

},{"./wml/layout.wml":50,"wmljs/lib/runtime":81}],50:[function(require,module,exports){
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

module.exports = exports['default'];
},{"wat-classes":5}],51:[function(require,module,exports){
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

},{"./wml/layout.wml":52,"wmljs/lib/runtime":81}],52:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (make) {
  return make.node('div', { html: { 'class': "well" } }, [make.resolve(this, 'children')]);
};

module.exports = exports['default'];
},{}],53:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (make) {
  return make.node('div', { html: { 'class': make.resolve(this, 'className') } }, [make.resolve(this, 'children')]);
};

module.exports = exports['default'];
},{}],54:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (make) {
  return make.node('section', { html: { 'class': make.resolve(this, 'className') } }, [make.resolve(this, 'children')]);
};

module.exports = exports['default'];
},{}],55:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (make) {
  return make.node('div', { html: { 'class': "row" } }, [make.resolve(this, 'children')]);
};

module.exports = exports['default'];
},{}],56:[function(require,module,exports){
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

},{"./wml/account_area.wml":57,"wmljs/lib/runtime":81}],57:[function(require,module,exports){
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

module.exports = exports['default'];
},{"wat-classes":5}],58:[function(require,module,exports){
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

},{"./wml/action_area.wml":59,"wmljs/lib/runtime":81}],59:[function(require,module,exports){
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

module.exports = exports["default"];
},{"../../menu-button/MenuButton":73,"wat-classes":5}],60:[function(require,module,exports){
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

},{"./wml/container.wml":61,"wmljs/lib/runtime":81}],61:[function(require,module,exports){
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

module.exports = exports['default'];
},{"wat-classes":5}],62:[function(require,module,exports){
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

},{"./wml/drawer.wml":65,"wat-classes":5,"wmljs/lib/runtime":81}],63:[function(require,module,exports){
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

},{"./wml/drawer_link.wml":66,"wat-classes":5,"wmljs/lib/runtime":81}],64:[function(require,module,exports){
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

},{"./wml/drawer_navigation.wml":67,"wat-classes":5,"wmljs/lib/runtime":81}],65:[function(require,module,exports){
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

module.exports = exports['default'];
},{"wat-classes":5}],66:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (make) {
  return make.node('a', { html: { 'class': this.attributes.read('wat:active', false) ? make.resolve(Class, 'ACTIVE') : '', 'href': this.attributes.read('wat:href'), 'onclick': this.clicked.bind(this) }, wml: { 'id': "a" } }, [make.$if(this.attributes.read('wat:icon-class', false), function if_0() {
    return [make.node('i', { html: { 'class': make.resolve(Class, 'LAYOUT_DRAWER_LINK_ICON') + this.attributes.read('wat:icon-class') } }, [])];
  }.bind(this), function else_0() {
    return [];
  }.bind(this)), this.attributes.read('wat:title'), make.resolve(this, 'children')]);
};

var _watClasses = require('wat-classes');

var Class = _interopRequireWildcard(_watClasses);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

module.exports = exports['default'];
},{"wat-classes":5}],67:[function(require,module,exports){
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

module.exports = exports['default'];
},{"wat-classes":5}],68:[function(require,module,exports){
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

},{"./account-area/AccountArea":56,"./action-area/ActionArea":58,"./container/LayoutContainer":60,"./drawer/Drawer":62,"./drawer/DrawerLink":63,"./drawer/DrawerNavigation":64,"./logoimage/LogoImage":69,"./main/Main":71,"./menu-button/MenuButton":73,"./notification/Notification":75}],69:[function(require,module,exports){
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

},{"./wml/logoimage.wml":70,"wmljs/lib/runtime":81}],70:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (make) {
  return make.node('header', { html: { 'class': make.resolve(Class, 'LAYOUT_LOGOIMAGE') } }, [make.$if(this.attributes.read('wat:image', false), function if_0() {
    return [make.node('h1', { html: {} }, [make.node('a', { html: { 'href': this.attributes.read('wat:href', '#') } }, [make.node('img', { html: { 'class': make.resolve(Class, 'LAYOUT_LOGOIMAGE_IMAGE'), 'src': this.attributes.read('wat:image'), 'alt': this.attributes.read('wat:alt') } }, [])])])];
  }.bind(this), function else_0() {
    return [];
  }.bind(this))]);
};

var _watClasses = require('wat-classes');

var Class = _interopRequireWildcard(_watClasses);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

module.exports = exports['default'];
},{"wat-classes":5}],71:[function(require,module,exports){
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

},{"./wml/main.wml":72,"wmljs/lib/runtime":81}],72:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (make) {
  return make.node('div', { html: { 'class': make.resolve(Class, 'LAYOUT_MAIN') } }, [make.node('div', { html: { 'class': make.resolve(Class, 'LAYOUT_MAIN_CONTENT') } }, [make.resolve(this, 'children')])]);
};

var _watClasses = require('wat-classes');

var Class = _interopRequireWildcard(_watClasses);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

module.exports = exports['default'];
},{"wat-classes":5}],73:[function(require,module,exports){
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

},{"./wml/menu_button.wml":74,"wmljs/lib/runtime":81}],74:[function(require,module,exports){
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

module.exports = exports['default'];
},{"wat-classes":5}],75:[function(require,module,exports){
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

},{"./wml/notification.wml":76,"wat-classes":5,"wmljs/lib/runtime":81}],76:[function(require,module,exports){
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

module.exports = exports['default'];
},{"wat-classes":5}],77:[function(require,module,exports){
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

},{"property-seek":82}],78:[function(require,module,exports){
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

},{"./Attributes":77,"property-seek":82}],79:[function(require,module,exports){
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

},{"./Maker":78}],80:[function(require,module,exports){
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

},{}],81:[function(require,module,exports){
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

},{"./Attributes":77,"./View":79,"./Widget":80}],82:[function(require,module,exports){
arguments[4][11][0].apply(exports,arguments)
},{"dup":11}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJleGFtcGxlcy9zcmMvQXBwbGljYXRpb24uanMiLCJleGFtcGxlcy9zcmMvTmV3VXNlckZvcm0uanMiLCJleGFtcGxlcy9zcmMvd21sL2xheW91dC53bWwiLCJleGFtcGxlcy9zcmMvd21sL25ld191c2VyX2Zvcm0ud21sIiwic3JjL2xpYi93YXQtY2xhc3Nlcy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9iZW9mL3NyYy9OdWxsVmFyaWFibGUuanMiLCJub2RlX21vZHVsZXMvYmVvZi9zcmMvVHlwZWRWYXJpYWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9iZW9mL3NyYy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gudGhyb3R0bGUvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbm9wL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3Byb3BlcnR5LXNlZWsvaW5kZXguanMiLCJzcmMvY29tcG9uZW50cy9Db2x1bW4uanMiLCJzcmMvY29tcG9uZW50cy9Db250YWluZXIuanMiLCJzcmMvY29tcG9uZW50cy9Sb3cuanMiLCJzcmMvY29tcG9uZW50cy9UYWJsZS5qcyIsInNyYy9jb21wb25lbnRzL2F1dG9jb21wbGV0ZS9BdXRvY29tcGxldGUuanMiLCJzcmMvY29tcG9uZW50cy9hdXRvY29tcGxldGUvQXV0b2NvbXBsZXRlRGVsZWdhdGUuanMiLCJzcmMvY29tcG9uZW50cy9hdXRvY29tcGxldGUvUG9wdWxhdGVkRGVsZWdhdGUuanMiLCJzcmMvY29tcG9uZW50cy9hdXRvY29tcGxldGUvUmVzdERlbGVnYXRlLmpzIiwic3JjL2NvbXBvbmVudHMvYXV0b2NvbXBsZXRlL1NlYXJjaERlbGVnYXRlLmpzIiwic3JjL2NvbXBvbmVudHMvYXV0b2NvbXBsZXRlL1NlbGVjdGlvbkRlbGVnYXRlLmpzIiwic3JjL2NvbXBvbmVudHMvYXV0b2NvbXBsZXRlL3dtbC9sYXlvdXQud21sIiwic3JjL2NvbXBvbmVudHMvYXV0b2NvbXBsZXRlL3dtbC9vcHRpb25zLndtbCIsInNyYy9jb21wb25lbnRzL2JyZWFkY3J1bWJzL0JyZWFkQ3J1bWIuanMiLCJzcmMvY29tcG9uZW50cy9icmVhZGNydW1icy9CcmVhZENydW1iTWVudS5qcyIsInNyYy9jb21wb25lbnRzL2JyZWFkY3J1bWJzL3dtbC9pdGVtLndtbCIsInNyYy9jb21wb25lbnRzL2JyZWFkY3J1bWJzL3dtbC9tZW51LndtbCIsInNyYy9jb21wb25lbnRzL2J1dHRvbi9CdXR0b24uanMiLCJzcmMvY29tcG9uZW50cy9idXR0b24vd21sL2J1dHRvbi53bWwiLCJzcmMvY29tcG9uZW50cy9jYXJkL0NhcmQuanMiLCJzcmMvY29tcG9uZW50cy9jYXJkL0NhcmRCbG9jay5qcyIsInNyYy9jb21wb25lbnRzL2NhcmQvQ2FyZEltYWdlLmpzIiwic3JjL2NvbXBvbmVudHMvY2FyZC93bWwvY2FyZC53bWwiLCJzcmMvY29tcG9uZW50cy9jYXJkL3dtbC9jYXJkX2Jsb2NrLndtbCIsInNyYy9jb21wb25lbnRzL2NhcmQvd21sL2NhcmRfaW1hZ2Uud21sIiwic3JjL2NvbXBvbmVudHMvaW5kZXguanMiLCJzcmMvY29tcG9uZW50cy9pbnB1dC9JbnB1dC5qcyIsInNyYy9jb21wb25lbnRzL2lucHV0L3dtbC9sYXlvdXQud21sIiwic3JjL2NvbXBvbmVudHMvanVtYm90cm9uL0p1bWJvdHJvbi5qcyIsInNyYy9jb21wb25lbnRzL2p1bWJvdHJvbi93bWwvbGF5b3V0LndtbCIsInNyYy9jb21wb25lbnRzL21vZGFsL01vZGFsLmpzIiwic3JjL2NvbXBvbmVudHMvbW9kYWwvTW9kYWxCb2R5LmpzIiwic3JjL2NvbXBvbmVudHMvbW9kYWwvTW9kYWxGb290ZXIuanMiLCJzcmMvY29tcG9uZW50cy9tb2RhbC9Nb2RhbEhlYWRlci5qcyIsInNyYy9jb21wb25lbnRzL21vZGFsL3dtbC9tb2RhbC53bWwiLCJzcmMvY29tcG9uZW50cy9tb2RhbC93bWwvbW9kYWxfYm9keS53bWwiLCJzcmMvY29tcG9uZW50cy9tb2RhbC93bWwvbW9kYWxfZm9vdGVyLndtbCIsInNyYy9jb21wb25lbnRzL21vZGFsL3dtbC9tb2RhbF9oZWFkZXIud21sIiwic3JjL2NvbXBvbmVudHMvc3dpdGNoL1N3aXRjaC5qcyIsInNyYy9jb21wb25lbnRzL3N3aXRjaC93bWwvbGF5b3V0LndtbCIsInNyYy9jb21wb25lbnRzL3dlbGwvV2VsbC5qcyIsInNyYy9jb21wb25lbnRzL3dlbGwvd21sL2xheW91dC53bWwiLCJzcmMvY29tcG9uZW50cy93bWwvY29sdW1uLndtbCIsInNyYy9jb21wb25lbnRzL3dtbC9jb250YWluZXIud21sIiwic3JjL2NvbXBvbmVudHMvd21sL3Jvdy53bWwiLCJzcmMvbGF5b3V0L2FjY291bnQtYXJlYS9BY2NvdW50QXJlYS5qcyIsInNyYy9sYXlvdXQvYWNjb3VudC1hcmVhL3dtbC9hY2NvdW50X2FyZWEud21sIiwic3JjL2xheW91dC9hY3Rpb24tYXJlYS9BY3Rpb25BcmVhLmpzIiwic3JjL2xheW91dC9hY3Rpb24tYXJlYS93bWwvYWN0aW9uX2FyZWEud21sIiwic3JjL2xheW91dC9jb250YWluZXIvTGF5b3V0Q29udGFpbmVyLmpzIiwic3JjL2xheW91dC9jb250YWluZXIvd21sL2NvbnRhaW5lci53bWwiLCJzcmMvbGF5b3V0L2RyYXdlci9EcmF3ZXIuanMiLCJzcmMvbGF5b3V0L2RyYXdlci9EcmF3ZXJMaW5rLmpzIiwic3JjL2xheW91dC9kcmF3ZXIvRHJhd2VyTmF2aWdhdGlvbi5qcyIsInNyYy9sYXlvdXQvZHJhd2VyL3dtbC9kcmF3ZXIud21sIiwic3JjL2xheW91dC9kcmF3ZXIvd21sL2RyYXdlcl9saW5rLndtbCIsInNyYy9sYXlvdXQvZHJhd2VyL3dtbC9kcmF3ZXJfbmF2aWdhdGlvbi53bWwiLCJzcmMvbGF5b3V0L2luZGV4LmpzIiwic3JjL2xheW91dC9sb2dvaW1hZ2UvTG9nb0ltYWdlLmpzIiwic3JjL2xheW91dC9sb2dvaW1hZ2Uvd21sL2xvZ29pbWFnZS53bWwiLCJzcmMvbGF5b3V0L21haW4vTWFpbi5qcyIsInNyYy9sYXlvdXQvbWFpbi93bWwvbWFpbi53bWwiLCJzcmMvbGF5b3V0L21lbnUtYnV0dG9uL01lbnVCdXR0b24uanMiLCJzcmMvbGF5b3V0L21lbnUtYnV0dG9uL3dtbC9tZW51X2J1dHRvbi53bWwiLCJzcmMvbGF5b3V0L25vdGlmaWNhdGlvbi9Ob3RpZmljYXRpb24uanMiLCJzcmMvbGF5b3V0L25vdGlmaWNhdGlvbi93bWwvbm90aWZpY2F0aW9uLndtbCIsIi4uL3dtbC9zcmMvcnVudGltZS9BdHRyaWJ1dGVzLmpzIiwiLi4vd21sL3NyYy9ydW50aW1lL01ha2VyLmpzIiwiLi4vd21sL3NyYy9ydW50aW1lL1ZpZXcuanMiLCIuLi93bWwvc3JjL3J1bnRpbWUvV2lkZ2V0LmpzIiwiLi4vd21sL3NyYy9ydW50aW1lL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztBQ0FBOztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0lBR00sVztBQUVGLDJCQUFjO0FBQUE7O0FBRVYsYUFBSyxJQUFMLEdBQVksb0NBQWlCLElBQWpCLENBQVo7QUFDQSxhQUFLLE1BQUwsR0FBYyxJQUFkO0FBQ0EsYUFBSyxPQUFMLEdBQWUsSUFBZjtBQUNBLGFBQUssYUFBTCxHQUFxQixJQUFyQjtBQUNBLGFBQUssT0FBTCxHQUFlLElBQWY7QUFDQSxhQUFLLEtBQUwsR0FBYSxJQUFiO0FBRUg7Ozs7NENBRW1COztBQUVoQixpQkFBSyxLQUFMLENBQVcsR0FBWCxDQUFlLDBCQUFnQixJQUFoQixDQUFmO0FBRUg7Ozs0Q0FFbUI7O0FBRWhCLGlCQUFLLE1BQUwsQ0FBWSxNQUFaO0FBRUg7OztpQ0FFUSxJLEVBQU07O0FBRVgsaUJBQUssTUFBTDtBQUVIOztBQUVEOzs7Ozs7b0NBR1ksSyxFQUFPLFksRUFBYzs7QUFFN0Isb0JBQVEsR0FBUixDQUFZLGlCQUFaLEVBQStCLEtBQS9CO0FBQ0EseUJBQWEsTUFBYixDQUFvQixDQUFDLE1BQUQsRUFBUyxTQUFU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NUIsV0FBTyw0QkFBa0IsQ0FBbEIsQ0FBUDtBQUVIOzs7OztBQ05EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN2YkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQzNEQTs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUE7OztJQUdNLE07OztBQUVGLG9CQUFZLEtBQVosRUFBbUIsUUFBbkIsRUFBNkI7QUFBQTs7QUFBQSxvSEFFbkIsS0FGbUIsRUFFWixRQUZZOztBQUl6QixjQUFLLFNB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QkFBVSxRQUFWLEVBQW9CLE9BQXBCLENBQWQ7QUFFSDs7QUFFRDs7Ozs7Ozs7Ozs7OztBQWFBOzs7OztpQ0FLUyxFLEVBQUk7O0FBRVQsbUJBQU8sS0FBSyxNQUFMLENBQVksUUFBWixDQUFxQixFQUFyQixDQUFQO0FBRUg7O0FBRUQ7Ozs7Ozs7Ozs0QkFNSSxRLEVBQVUsTyxFQUFTOztBQUVuQixpQkFBSyxNQUFMLEdBQWMsb0JBQVUsUUFBVixFQUFxQixPQUFELEdBQVksT0FBWixHQUFzQixLQUFLLE9BQS9DLENBQWQ7QUFDQSxtQkFBTyxJQUFQO0FBRUg7O0FBRUQ7Ozs7Ozs7aUNBSVM7O0FBRUwsbUJBQU8sS0FBSyxNQUFMLENBQVksTUFBWixFQUFQO0FBRUg7OzsrQkF0Q2EsUSxFQUFVLE8sRUFBUzs7QUFFN0IsbUJBQVEsSUFBSSxJQUFKLENBQVMsUUFBVCxFQUFtQixPQUFuQixDQUFELENBQThCLE1BQTlCLEVBQVA7QUFFSDs7Ozs7O2tCQXVDVSxJOzs7Ozs7Ozs7Ozs7OztBQ3JFZjs7O0lBR00sTTtBQUVKLGtCQUFZLEtBQVosRUFBbUIsUUFBbkIsRUFBNkI7QUFBQTs7QUFFM0IsU0FBSyxLQUFMLEdBQWEsTUFBTSxNQUFuQjtBQUNBLFNBQUssVUFBTCxHQUFrQixLQUFsQjtBQUNBLFNBQUssUUFBTCxHQUFnQixRQUFoQjtBQUVEOzs7O2lDQUVZLENBRVo7OztnQ0FFVyxDQUVYOzs7Ozs7a0JBSVksTTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQ3RCUixJLG1CQURQOztRQUVPLFU7UUFDQSxNO0FBQ1AiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHsgVmlldywgV2lkZ2V0IH0gZnJvbSAnd21sanMvbGliL3J1bnRpbWUnO1xuaW1wb3J0IGxheW91dCBmcm9tICcuL3dtbC9sYXlvdXQud21sJztcbmltcG9ydCBOZXdVc2VyRm9ybSBmcm9tICcuL05ld1VzZXJGb3JtJztcblxuXG5jbGFzcyBBcHBsaWNhdGlvbiB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcblxuICAgICAgICB0aGlzLnZpZXcgPSBuZXcgVmlldyhsYXlvdXQsIHRoaXMpO1xuICAgICAgICB0aGlzLmRyYXdlciA9IG51bGw7XG4gICAgICAgIHRoaXMuYWN0aW9ucyA9IG51bGw7XG4gICAgICAgIHRoaXMubm90aWZpY2F0aW9ucyA9IG51bGw7XG4gICAgICAgIHRoaXMuY29udGVudCA9IG51bGw7XG4gICAgICAgIHRoaXMubW9kYWwgPSBudWxsO1xuXG4gICAgfVxuXG4gICAgc2hvd05ld1VzZXJEaWFsb2coKSB7XG5cbiAgICAgICAgdGhpcy5tb2RhbC5wdXQobmV3IE5ld1VzZXJGb3JtKHRoaXMpKTtcblxuICAgIH1cblxuICAgIG1lbnVCdXR0b25DbGlja2VkKCkge1xuXG4gICAgICAgIHRoaXMuZHJhd2VyLnRvZ2dsZSgpO1xuXG4gICAgfVxuXG4gICAgbmF2aWdhdGUoaXRlbSkge1xuXG4gICAgICAgIGl0ZW0uYWN0aXZlKCk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzZWFyY2hVc2Vyc1xuICAgICAqL1xuICAgIHNlYXJjaFVzZXJzKHZhbHVlLCBhdXRvY29tcGxldGUpIHtcblxuICAgICAgICBjb25zb2xlLmxvZygnc2VhcmNoaW5nIHdpdGggJywgdmFsdWUpO1xuICAgICAgICBhdXRvY29tcGxldGUudXBkYXRlKFsnUGF1bCcsICdMaXRjaGllJ10pO1xuXG4gICAgfVxuXG4gICAgdXNlclNlbGVjdGVkKHZhbHVlLCBuYW1lKSB7XG5cbiAgICAgICAgY29uc29sZS5sb2coYFNlbGVjdGVkOiAke25hbWV9LT4ke3ZhbHVlfWApO1xuXG4gICAgfVxuXG4gICAgcnVuKCkge1xuXG4gICAgICAgIHdpbmRvdy5hcHAgPSB0aGlzO1xuICAgICAgICBkb2N1bWVudC5ib2R5Lmluc2VydEJlZm9yZSh0aGlzLnZpZXcucmVuZGVyKCksIGRvY3VtZW50LmJvZHkuZmlyc3RDaGlsZCk7XG5cbiAgICAgICAgdGhpcy5kcmF3ZXIgPSB0aGlzLnZpZXcuZmluZEJ5SWQoJ2RyYXdlcicpO1xuICAgICAgICB0aGlzLmFjdGlvbnMgPSB0aGlzLnZpZXcuZmluZEJ5SWQoJ2FjdGlvbnMnKTtcbiAgICAgICAgdGhpcy5ub3RpZmljYXRpb25zID0gdGhpcy52aWV3LmZpbmRCeUlkKCdub3RpZmljYXRpb25zJyk7XG4gICAgICAgIHRoaXMuY29udGVudCA9IHRoaXMudmlldy5maW5kQnlJZCgnbWFpbicpO1xuICAgICAgICB0aGlzLm1vZGFsID0gdGhpcy52aWV3LmZpbmRCeUlkKCdtb2RhbCcpO1xuXG4gICAgICAgIHRoaXMubm90aWZpY2F0aW9ucy5wdXQoJ0FwcGxpY2F0aW9uIHN0YXJ0ZWQhJyk7XG5cbiAgICB9XG5cbiAgICBzdGF0aWMgbWFpbigpIHtcblxuICAgICAgICByZXR1cm4gKG5ldyB0aGlzKCkpLnJ1bigpO1xuXG4gICAgfVxuXG59XG5cbkFwcGxpY2F0aW9uLm1haW4oKTtcbiIsImltcG9ydCB7IFZpZXcgfSBmcm9tICd3bWxqcy9saWIvcnVudGltZSc7XG5pbXBvcnQgbmV3X3VzZXJfZm9ybSBmcm9tICcuL3dtbC9uZXdfdXNlcl9mb3JtLndtbCc7XG5cbi8qKlxuICogTmV3VXNlckZvcm1cbiAqL1xuY2xhc3MgTmV3VXNlckZvcm0ge1xuXG4gICAgY29uc3RydWN0b3IoYXBwKSB7XG5cbiAgICAgICAgdGhpcy5hcHAgPSBhcHA7XG4gICAgICAgIHRoaXMudmlldyA9IG5ldyBWaWV3KG5ld191c2VyX2Zvcm0sIHRoaXMpO1xuXG4gICAgfVxuXG4gICAgc2F2ZSgpIHtcblxuICAgIH1cblxuICAgIGNhbmNlbCgpIHtcblxuICAgICAgICB0aGlzLmFwcC5tb2RhbC5tb2RhbC5oaWRlKCk7XG5cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMudmlldy5yZW5kZXIoKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBOZXdVc2VyRm9ybVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAobWFrZSkge1xuICByZXR1cm4gbWFrZS53aWRnZXQoX2xheW91dC5MYXlvdXRDb250YWluZXIsIHsgaHRtbDoge30gfSwgW21ha2Uud2lkZ2V0KF9jb21wb25lbnRzLk1vZGFsLCB7IGh0bWw6IHt9LCB3bWw6IHsgJ2lkJzogXCJtb2RhbFwiIH0gfSwgW10pLCBtYWtlLndpZGdldChfbGF5b3V0LkRyYXdlciwgeyBodG1sOiB7fSwgd21sOiB7ICdpZCc6IFwiZHJhd2VyXCIgfSB9LCBbbWFrZS53aWRnZXQoX2xheW91dC5Mb2dvSW1hZ2UsIHsgaHRtbDoge30sIHdhdDogeyAnaW1hZ2UnOiBcImltZy9sb2dvLnN2Z1wiIH0gfSwgW10pLCBtYWtlLndpZGdldChfbGF5b3V0LkRyYXdlck5hdmlnYXRpb24sIHsgaHRtbDoge30gfSwgW21ha2Uud2lkZ2V0KF9sYXlvdXQuRHJhd2VyTGluaywgeyBodG1sOiB7fSwgd2F0OiB7ICdocmVmJzogXCIjL2Rhc2hib2FyZFwiLCAndGl0bGUnOiBcIkRhc2hib2FyZFwiLCAnYWN0aXZlJzogbWFrZS5yZXNvbHZlKHdpbmRvdywgJ2xvY2F0aW9uLmhhc2gnKSA9PT0gJyMvZGFzaGJvYXJkJywgJ29uQ2xpY2snOiB0aGlzLm5hdmlnYXRlLmJpbmQodGhpcykgfSB9LCBbXSksIG1ha2Uud2lkZ2V0KF9sYXlvdXQuRHJhd2VyTGluaywgeyBodG1sOiB7fSwgd2F0OiB7ICdocmVmJzogXCIjL21lc3NhZ2VzXCIsICd0aXRsZSc6IFwiTWVzc2FnZXNcIiwgJ2FjdGl2ZSc6IG1ha2UucmVzb2x2ZSh3aW5kb3csICdsb2NhdGlvbi5oYXNoJykgPT09ICcjL21lc3NhZ2VzJywgJ29uQ2xpY2snOiB0aGlzLm5hdmlnYXRlLmJpbmQodGhpcykgfSB9LCBbXSksIG1ha2Uud2lkZ2V0KF9sYXlvdXQuRHJhd2VyTGluaywgeyBodG1sOiB7fSwgd2F0OiB7ICdocmVmJzogXCIjL2ludm9pY2VzXCIsICd0aXRsZSc6IFwiSW52b2ljZXNcIiwgJ2FjdGl2ZSc6IG1ha2UucmVzb2x2ZSh3aW5kb3csICdsb2NhdGlvbi5oYXNoJykgPT09ICcjL2ludm9pY2VzJywgJ29uQ2xpY2snOiB0aGlzLm5hdmlnYXRlLmJpbmQodGhpcykgfSB9LCBbXSksIG1ha2Uud2lkZ2V0KF9sYXlvdXQuRHJhd2VyTGluaywgeyBodG1sOiB7fSwgd2F0OiB7ICdocmVmJzogXCIjL3VzZXJzXCIsICd0aXRsZSc6IFwiVXNlcnNcIiwgJ2FjdGl2ZSc6IG1ha2UucmVzb2x2ZSh3aW5kb3csICdsb2NhdGlvbi5oYXNoJykgPT09ICcjL3VzZXJzJywgJ29uQ2xpY2snOiB0aGlzLm5hdmlnYXRlLmJpbmQodGhpcykgfSB9LCBbXSldKSwgbWFrZS53aWRnZXQoX2xheW91dC5BY2NvdW50QXJlYSwgeyBodG1sOiB7fSwgd2F0OiB7ICd0aXRsZSc6IFwiSmFuZSBKb2VcIiB9IH0sIFtdKV0pLCBtYWtlLndpZGdldChfbGF5b3V0LkFjdGlvbkFyZWEsIHsgaHRtbDoge30sIHdtbDogeyAnaWQnOiBcImFjdGlvbnNcIiB9LCB3YXQ6IHsgJ29uTWVudUJ1dHRvbkNsaWNrZWQnOiB0aGlzLm1lbnVCdXR0b25DbGlja2VkLmJpbmQodGhpcykgfSB9LCBbbWFrZS5ub2RlKCdoMycsIHsgaHRtbDogeyAnY2xhc3MnOiBcIm1haW4tY29udGVudFwiIH0gfSwgW21ha2Uud2lkZ2V0KF9jb21wb25lbnRzLkJyZWFkQ3J1bWJNZW51LCB7IGh0bWw6IHt9IH0sIFttYWtlLndpZGdldChfY29tcG9uZW50cy5CcmVhZENydW1iLCB7IGh0bWw6IHt9LCB3YXQ6IHsgJ2hyZWYnOiBcIiNcIiB9IH0sIFttYWtlLnRleHQoJ0hvbWUnKV0pLCBtYWtlLndpZGdldChfY29tcG9uZW50cy5CcmVhZENydW1iLCB7IGh0bWw6IHt9LCB3YXQ6IHsgJ2hyZWYnOiBcIiNcIiwgJ2FjdGl2ZSc6IHRydWUgfSB9LCBbbWFrZS50ZXh0KCdFeGFtcGxlJyldKV0pXSksIG1ha2Uubm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6IFwic2Vjb25kYXJ5LWNvbnRlbnRcIiB9IH0sIFttYWtlLndpZGdldChfY29tcG9uZW50cy5CdXR0b24sIHsgaHRtbDoge30sIHdhdDogeyAnbmFtZSc6IFwibmV3IHVzZXJcIiwgJ3ZhcmlhbnQnOiBcInByaW1hcnlcIiwgJ3RleHQnOiBcIk5ldyBVc2VyXCIsICdvbkNsaWNrJzogdGhpcy5zaG93TmV3VXNlckRpYWxvZy5iaW5kKHRoaXMpIH0gfSwgW10pXSldKSwgbWFrZS53aWRnZXQoX2xheW91dC5NYWluLCB7IGh0bWw6IHt9LCB3bWw6IHsgJ2lkJzogXCJjb250ZW50XCIgfSB9LCBbbWFrZS53aWRnZXQoX2NvbXBvbmVudHMuQ29udGFpbmVyLCB7IGh0bWw6IHt9IH0sIFttYWtlLndpZGdldChfY29tcG9uZW50cy5Sb3csIHsgaHRtbDoge30gfSwgW21ha2Uud2lkZ2V0KF9jb21wb25lbnRzLkNvbHVtbiwgeyBodG1sOiB7fSB9LCBbbWFrZS5ub2RlKCdoMycsIHsgaHRtbDoge30gfSwgW21ha2UudGV4dCgnU2hvdyBkaXNhYmxlZD8nKV0pLCBtYWtlLndpZGdldChfY29tcG9uZW50cy5Td2l0Y2gsIHsgaHRtbDoge30gfSwgW10pXSldKSwgbWFrZS53aWRnZXQoX2NvbXBvbmVudHMuUm93LCB7IGh0bWw6IHt9IH0sIFttYWtlLndpZGdldChfY29tcG9uZW50cy5Db2x1bW4sIHsgaHRtbDoge30gfSwgW21ha2Uubm9kZSgnaDQnLCB7IGh0bWw6IHt9IH0sIFttYWtlLnRleHQoJ1NlYXJjaCBVc2VycycpXSldKV0pLCBtYWtlLndpZGdldChfY29tcG9uZW50cy5Sb3csIHsgaHRtbDoge30gfSwgW21ha2Uud2lkZ2V0KF9jb21wb25lbnRzLkNvbHVtbiwgeyBodG1sOiB7fSB9LCBbbWFrZS53aWRnZXQoX2NvbXBvbmVudHMuQXV0b2NvbXBsZXRlLCB7IGh0bWw6IHt9LCB3YXQ6IHsgJ2lucHV0Q2xhc3MnOiBcImZvcm0tY29udHJvbFwiLCAnbmFtZSc6IFwidXNlclwiLCAndmFsdWUnOiBcIlJpY2hhcmRcIiwgJ3NldCc6IHRoaXMudXNlclNlbGVjdGVkLmJpbmQodGhpcyksICdzZWFyY2gnOiB0aGlzLnNlYXJjaFVzZXJzLmJpbmQodGhpcykgfSB9LCBbXSldKV0pXSldKSwgbWFrZS53aWRnZXQoX2xheW91dC5Ob3RpZmljYXRpb24sIHsgaHRtbDoge30sIHdtbDogeyAnaWQnOiBcIm5vdGlmaWNhdGlvbnNcIiB9IH0sIFtdKV0pO1xufTtcblxudmFyIF9sYXlvdXQgPSByZXF1aXJlKCdsYXlvdXQnKTtcblxudmFyIF9jb21wb25lbnRzID0gcmVxdWlyZSgnY29tcG9uZW50cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgICAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChtYWtlKSB7XG4gICAgICAgIHJldHVybiBtYWtlLm5vZGUoJ2ZyYWdtZW50JywgeyBodG1sOiB7fSB9LCBbbWFrZS53aWRnZXQoX2NvbXBvbmVudHMuTW9kYWxIZWFkZXIsIHsgaHRtbDoge30gfSwgW21ha2UudGV4dCgnXFxuICAgICAgICBDcmVhdGUgYSBuZXcgdXNlclxcbiAgICAnKV0pLCBtYWtlLndpZGdldChfY29tcG9uZW50cy5Nb2RhbEJvZHksIHsgaHRtbDoge30gfSwgW21ha2Uubm9kZSgncCcsIHsgaHRtbDoge30gfSwgW21ha2UudGV4dCgnIDpPJyldKV0pLCBtYWtlLndpZGdldChfY29tcG9uZW50cy5Nb2RhbEZvb3RlciwgeyBodG1sOiB7fSB9LCBbbWFrZS53aWRnZXQoX2NvbXBvbmVudHMuQnV0dG9uLCB7IGh0bWw6IHt9LCB3YXQ6IHsgJ3ZhcmlhbnQnOiBcImRlZmF1bHRcIiwgJ29uQ2xpY2snOiB0aGlzLmNhbmNlbC5iaW5kKHRoaXMpLCAndGV4dCc6IFwiQ2FuY2VsXCIgfSB9LCBbXSksIG1ha2Uud2lkZ2V0KF9jb21wb25lbnRzLkJ1dHRvbiwgeyBodG1sOiB7fSwgd2F0OiB7ICd2YXJpYW50JzogXCJwcmltYXJ5XCIsICdvbkNsaWNrJzogdGhpcy5zYXZlLmJpbmQodGhpcyksICd0ZXh0JzogXCJTYXZlXCIgfSB9LCBbXSldKV0pO1xufTtcblxudmFyIF9jb21wb25lbnRzID0gcmVxdWlyZSgnY29tcG9uZW50cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCJleHBvcnQgY29uc3QgVklTSUJMRSA9ICd3YXQtdmlzaWJsZSc7XG5leHBvcnQgY29uc3QgSElEREVOID0gJ3dhdC1oaWRkZW4nO1xuZXhwb3J0IGNvbnN0IEFDVElWRSA9ICd3YXQtYWN0aXZlJztcbmV4cG9ydCBjb25zdCBET1dOX0FSUk9XID0gJ2Fycm93LWRvd24nO1xuZXhwb3J0IGNvbnN0IFVQX0FSUk9XID0gJ2Fycm93LXVwJztcbmV4cG9ydCBjb25zdCBMQVlPVVRfQ09OVEFJTkVSID0gJ3dhdC1sYXlvdXQtY29udGFpbmVyJztcbmV4cG9ydCBjb25zdCBMQVlPVVRfRFJBV0VSID0gJ3dhdC1sYXlvdXQtZHJhd2VyJztcbmV4cG9ydCBjb25zdCBMQVlPVVRfRFJBV0VSX0NPTlRFTlQgPSAnd2F0LWxheW91dC1kcmF3ZXItY29udGVudCc7XG5leHBvcnQgY29uc3QgTEFZT1VUX01BSU4gPSAnd2F0LWxheW91dC1tYWluJztcbmV4cG9ydCBjb25zdCBMQVlPVVRfTUFJTl9DT05URU5UID0gJ3dhdC1sYXlvdXQtbWFpbi1jb250ZW50JztcbmV4cG9ydCBjb25zdCBMQVlPVVRfQUNUSU9OX0FSRUEgPSAnd2F0LWxheW91dC1hY3Rpb24tYXJlYSc7XG5leHBvcnQgY29uc3QgTEFZT1VUX0FDVElPTl9BUkVBX0NPTlRFTlQgPSAnd2F0LWxheW91dC1hY3Rpb24tYXJlYS1jb250ZW50JztcbmV4cG9ydCBjb25zdCBMQVlPVVRfTUVOVV9CVVRUT04gPSAnd2F0LWxheW91dC1tZW51LWJ1dHRvbic7XG5leHBvcnQgY29uc3QgTEFZT1VUX0JBTk5FUiA9ICd3YXQtbGF5b3V0LWJhbm5lcic7XG5leHBvcnQgY29uc3QgTEFZT1VUX0JBTk5FUl9JTUFHRSA9ICd3YXQtbGF5b3V0LWJhbm5lci1pbWFnZSc7XG5leHBvcnQgY29uc3QgTEFZT1VUX0RSQVdFUl9OQVZJR0FUSU9OID0gJ3dhdC1sYXlvdXQtZHJhd2VyLW5hdmlnYXRpb24nO1xuZXhwb3J0IGNvbnN0IExBWU9VVF9EUkFXRVJfTkFWSUdBVElPTl9USVRMRSA9ICd3YXQtbGF5b3V0LWRyYXdlci1uYXZpZ2F0aW9uLXRpdGxlJztcbmV4cG9ydCBjb25zdCBMQVlPVVRfQUNDT1VOVF9BUkVBID0gJ3dhdC1sYXlvdXQtYWNjb3VudC1hcmVhJztcbmV4cG9ydCBjb25zdCBMQVlPVVRfQUNDT1VOVF9BUkVBX1RJVExFID0gJ3dhdC1sYXlvdXQtYWNjb3VudC1hcmVhLXRpdGxlJztcbmV4cG9ydCBjb25zdCBMQVlPVVRfQUNDT1VOVF9BUkVBX1RPR0dMRSA9ICd3YXQtbGF5b3V0LWFjY291bnQtYXJlYS10b2dnbGUnO1xuZXhwb3J0IGNvbnN0IExBWU9VVF9OT1RJRklDQVRJT04gPSAnd2F0LWxheW91dC1ub3RpZmljYXRpb24nO1xuZXhwb3J0IGNvbnN0IFdBVF9LSVRfQVVUT0NPTVBMRVRFID0gJ3dhdC1raXQtYXV0b2NvbXBsZXRlJztcbmV4cG9ydCBjb25zdCBXQVRfS0lUX0FVVE9DT01QTEVURV9DT05UQUlORVIgPSAnd2F0LWtpdC1hdXRvY29tcGxldGUtY29udGFpbmVyJztcbmV4cG9ydCBjb25zdCBXQVRfS0lUX0FVVE9DT01QTEVURV9JTlBVVF9BUkVBID0gJ3dhdC1raXQtYXV0b2NvbXBsZXRlLWlucHV0LWFyZWEnO1xuZXhwb3J0IGNvbnN0IFdBVF9LSVRfQVVUT0NPTVBMRVRFX0lOUFVUID0gJ3dhdC1raXQtYXV0b2NvbXBsZXRlLWlucHV0JztcbmV4cG9ydCBjb25zdCBXQVRfS0lUX0FVVE9DT01QTEVURV9PUFRJT05TID0gJ3dhdC1raXQtYXV0b2NvbXBsZXRlLW9wdGlvbnMnO1xuZXhwb3J0IGNvbnN0IFdBVF9DT01QT05FTlRTX1NXSVRDSCA9ICd3YXQtY29tcG9uZW50cy1zd2l0Y2gnO1xuZXhwb3J0IGNvbnN0IFdBVF9DT01QT05FTlRTX1NXSVRDSF9TTElERVIgPSAnd2F0LWNvbXBvbmVudHMtc3dpdGNoLXNsaWRlcic7XG4iLCIvKipcbiAqIE51bGxWYXJpYWJsZSBkb2VzIG5vdGhpbmcgLi4uIHJlYWxseS5cbiAqIEBpbXBsZW1lbnRzIHtWYXJpYWJsZX1cbiAqL1xuY2xhc3MgTnVsbFZhcmlhYmxlIHtcblxuICAgIGJvb2xlYW4oKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICB9XG5cbiAgICBudW1iZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICB9XG5cbiAgICBzdHJpbmcoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICB9XG5cbiAgICBhcnJheSgpIHtcblxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgIH1cblxuICAgIGRhdGUoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICB9XG5cbiAgICByZWdleHAoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbigpIHtcblxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgIH1cblxuICAgIG9iamVjdCh2YWx1ZSwgbmFtZSkge1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfVxuXG4gICAgaW5zdGFuY2UoY29ucykge1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfVxuXG4gICAgaW50ZXJmYWNlKElmYWNlKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICB9XG5cbiAgICBkZWZhdWx0ICh2YWx1ZSkge1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfVxuXG4gICAgb3B0aW9uYWwodmFsdWUpIHtcblxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgIH1cblxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IE51bGxWYXJpYWJsZVxuIiwiaW1wb3J0IE51bGxWYXJpYWJsZSBmcm9tICcuL051bGxWYXJpYWJsZSc7XG5cbi8qKlxuICogVHlwZWRWYXJpYWJsZVxuICogQHBhcmFtIHtvYmplY3R9IG1hcFxuICogQGltcGxlbWVudHMge1ZhcmlhYmxlfVxuICovXG5jbGFzcyBUeXBlZFZhcmlhYmxlIHtcblxuICAgIGNvbnN0cnVjdG9yKG1hcCkge1xuXG4gICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMobWFwKTtcblxuICAgICAgICB0aGlzLm5hbWUgPSBrZXlzWzBdO1xuICAgICAgICB0aGlzLnZhbHVlID0gbWFwW2tleXNbMF1dO1xuXG4gICAgfVxuXG4gICAgX3R5cGVPZih0eXBlKSB7XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnZhbHVlICE9PSB0eXBlKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgJyR7dGhpcy5uYW1lfScgbXVzdCBiZSB0eXBlb2YgJyR7dHlwZX0nISBHb3QgJyR7dHlwZW9mIHRoaXMudmFsdWV9JyFgKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgIH1cblxuICAgIF9wcm90byhwcm90bykge1xuXG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodGhpcy52YWx1ZSkgIT09IHByb3RvKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgJHt0aGlzLm5hbWV9IG11c3QgYmUgdHlwZW9mICR7cHJvdG99ISBHb3QgJHt0eXBlb2YgdGhpcy52YWx1ZX0hYCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfVxuXG4gICAgYm9vbGVhbigpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5fdHlwZU9mKCdib29sZWFuJyk7XG5cbiAgICB9XG5cbiAgICBudW1iZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX3R5cGVPZignbnVtYmVyJyk7XG5cbiAgICB9XG5cbiAgICBzdHJpbmcoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX3R5cGVPZignc3RyaW5nJyk7XG5cbiAgICB9XG5cbiAgICBhcnJheSgpIHtcblxuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkodGhpcy52YWx1ZSkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGAnJHt0aGlzLm5hbWV9JyBtdXN0IGJlIGFuIGFycmF5ISBHb3QgJyR7dHlwZW9mIHRoaXMudmFsdWV9JyFgKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgIH1cblxuICAgIGRhdGUoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX3Byb3RvKCdbb2JqZWN0IERhdGVdJyk7XG5cbiAgICB9XG5cbiAgICByZWdleHAoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX3Byb3RvKCdbb2JqZWN0IFJlZ0V4cF0nKTtcblxuICAgIH1cblxuICAgIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHJldHVybiB0aGlzLl90eXBlT2YoJ2Z1bmN0aW9uJyk7XG5cbiAgICB9XG5cbiAgICBvYmplY3QodmFsdWUsIG5hbWUpIHtcblxuICAgICAgICAvL0FycmF5cyBhbmQgbnVsbCBhcmUgbm90IG9iamVjdHMgSSBkb24ndCBjYXJlIHdoYXQgeW8gbWFtYSBzYXkuXG4gICAgICAgIGlmICgoQXJyYXkuaXNBcnJheSh0aGlzLnZhbHVlKSB8fCB0aGlzLnZhbHVlID09PSBudWxsKSlcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYCR7dGhpcy52YWx1ZX0gbXVzdCBiZSB0eXBlIG9mIG9iamVjdCFgKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5fdHlwZU9mKCdvYmplY3QnKTtcblxuICAgIH1cblxuICAgIGluc3RhbmNlKGNvbnMpIHtcblxuICAgICAgICBpZiAodHlwZW9mIGNvbnMgIT09ICdmdW5jdGlvbicpXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBDYW5ub3QgY2hlY2sgaW5zdGFuY2Ugb2YgYWdhaW5zdCB0eXBlICcke3R5cGVvZiBjb25zfSdgKTtcblxuICAgICAgICBpZiAodGhpcy52YWx1ZSBpbnN0YW5jZW9mIGNvbnMpXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBBcmd1bWVudCAnJHt0aGlzLm5hbWV9JyBtdXN0IGJlIGluc3RhbmNlIG9mYCArXG4gICAgICAgICAgICBgICcke2NvbnMubmFtZX0nIGdvdCB0eXBlICcke3R5cGVvZiB0aGlzLnZhbHVlfSchYCk7XG5cbiAgICB9XG5cbiAgICBpbnRlcmZhY2UoSWZhY2UpIHtcblxuICAgICAgICBpZiAodHlwZW9mIElmYWNlICE9PSAnZnVuY3Rpb24nKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgQ2Fubm90IHVzZSB0eXBlICcke3R5cGVvZiBJZmFjZX0nIGFzIGFuIGludGVyZmFjZSFgKTtcblxuICAgICAgICB2YXIgbyA9IG5ldyBJZmFjZSgpO1xuICAgICAgICB2YXIgcHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yobyk7XG5cbiAgICAgICAgdGhpcy5pbnN0YW5jZShPYmplY3QpO1xuXG4gICAgICAgIHZhciBtaXNzaW5nID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMocHJvdG8pLlxuICAgICAgICBmaWx0ZXIoayA9PiAoayA9PT0gJ2NvbnN0cnVjdG9yJykgPyBmYWxzZSA6XG4gICAgICAgICAgICAodHlwZW9mIHRoaXMudmFsdWVba10gPT09IHR5cGVvZiBwcm90b1trXSkgP1xuICAgICAgICAgICAgZmFsc2UgOlxuICAgICAgICAgICAgdHJ1ZSk7XG5cbiAgICAgICAgaWYgKG1pc3NpbmcubGVuZ3RoICE9PSAwKSB7XG5cbiAgICAgICAgICAgIHZhciBtZXRocyA9IG1pc3Npbmcuam9pbignLCcpO1xuXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBWYWx1ZSBwYXNzZWQgZm9yIGFyZ3VtZW50ICcke3RoaXMubmFtZX0nYCArXG4gICAgICAgICAgICAgICAgYCAodHlwZSA6ICcke3R5cGVvZiB0aGlzLnZhbHVlfScpIGRvZXMgbm90IHNhdGlzZnkgYCArXG4gICAgICAgICAgICAgICAgYGludGVyZmFjZSAnJHtvLmNvbnN0cnVjdG9yLm5hbWV9JyEgTWlzc2luZyBtZXRob2RzOiAke21ldGhzfSFgKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICB9XG5cbiAgICBkZWZhdWx0ICh2YWx1ZSkge1xuICAgICAgICBpZiAoW3VuZGVmaW5lZCwgbnVsbF0uaW5kZXhPZih0aGlzLnZhbHVlKSA+IC0xKVxuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIG9wdGlvbmFsKHZhbHVlKSB7XG5cbiAgICAgICAgaWYgKFt1bmRlZmluZWQsIG51bGxdLmluZGV4T2YodGhpcy52YWx1ZSkgPiAtMSlcbiAgICAgICAgICAgIHJldHVybiBuZXcgTnVsbFZhcmlhYmxlKCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICB9XG5cblxufVxuXG5leHBvcnQgZGVmYXVsdCBUeXBlZFZhcmlhYmxlXG4iLCJpbXBvcnQgVHlwZWRWYXJpYWJsZSBmcm9tICcuL1R5cGVkVmFyaWFibGUnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBiZW9mKG8pIHtcblxuICAgIHJldHVybiBuZXcgVHlwZWRWYXJpYWJsZShvKTtcblxufVxuIiwiLyoqXG4gKiBsb2Rhc2ggKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCBqUXVlcnkgRm91bmRhdGlvbiBhbmQgb3RoZXIgY29udHJpYnV0b3JzIDxodHRwczovL2pxdWVyeS5vcmcvPlxuICogUmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICovXG5cbi8qKiBVc2VkIGFzIHRoZSBgVHlwZUVycm9yYCBtZXNzYWdlIGZvciBcIkZ1bmN0aW9uc1wiIG1ldGhvZHMuICovXG52YXIgRlVOQ19FUlJPUl9URVhUID0gJ0V4cGVjdGVkIGEgZnVuY3Rpb24nO1xuXG4vKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBOQU4gPSAwIC8gMDtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIHN5bWJvbFRhZyA9ICdbb2JqZWN0IFN5bWJvbF0nO1xuXG4vKiogVXNlZCB0byBtYXRjaCBsZWFkaW5nIGFuZCB0cmFpbGluZyB3aGl0ZXNwYWNlLiAqL1xudmFyIHJlVHJpbSA9IC9eXFxzK3xcXHMrJC9nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgYmFkIHNpZ25lZCBoZXhhZGVjaW1hbCBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNCYWRIZXggPSAvXlstK10weFswLTlhLWZdKyQvaTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGJpbmFyeSBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNCaW5hcnkgPSAvXjBiWzAxXSskL2k7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBvY3RhbCBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNPY3RhbCA9IC9eMG9bMC03XSskL2k7XG5cbi8qKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB3aXRob3V0IGEgZGVwZW5kZW5jeSBvbiBgcm9vdGAuICovXG52YXIgZnJlZVBhcnNlSW50ID0gcGFyc2VJbnQ7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsICYmIGdsb2JhbC5PYmplY3QgPT09IE9iamVjdCAmJiBnbG9iYWw7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgc2VsZmAuICovXG52YXIgZnJlZVNlbGYgPSB0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmICYmIHNlbGYuT2JqZWN0ID09PSBPYmplY3QgJiYgc2VsZjtcblxuLyoqIFVzZWQgYXMgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QuICovXG52YXIgcm9vdCA9IGZyZWVHbG9iYWwgfHwgZnJlZVNlbGYgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVNYXggPSBNYXRoLm1heCxcbiAgICBuYXRpdmVNaW4gPSBNYXRoLm1pbjtcblxuLyoqXG4gKiBHZXRzIHRoZSB0aW1lc3RhbXAgb2YgdGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdGhhdCBoYXZlIGVsYXBzZWQgc2luY2VcbiAqIHRoZSBVbml4IGVwb2NoICgxIEphbnVhcnkgMTk3MCAwMDowMDowMCBVVEMpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMi40LjBcbiAqIEBjYXRlZ29yeSBEYXRlXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSB0aW1lc3RhbXAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uZGVmZXIoZnVuY3Rpb24oc3RhbXApIHtcbiAqICAgY29uc29sZS5sb2coXy5ub3coKSAtIHN0YW1wKTtcbiAqIH0sIF8ubm93KCkpO1xuICogLy8gPT4gTG9ncyB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBpdCB0b29rIGZvciB0aGUgZGVmZXJyZWQgaW52b2NhdGlvbi5cbiAqL1xudmFyIG5vdyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gcm9vdC5EYXRlLm5vdygpO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgZGVib3VuY2VkIGZ1bmN0aW9uIHRoYXQgZGVsYXlzIGludm9raW5nIGBmdW5jYCB1bnRpbCBhZnRlciBgd2FpdGBcbiAqIG1pbGxpc2Vjb25kcyBoYXZlIGVsYXBzZWQgc2luY2UgdGhlIGxhc3QgdGltZSB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uIHdhc1xuICogaW52b2tlZC4gVGhlIGRlYm91bmNlZCBmdW5jdGlvbiBjb21lcyB3aXRoIGEgYGNhbmNlbGAgbWV0aG9kIHRvIGNhbmNlbFxuICogZGVsYXllZCBgZnVuY2AgaW52b2NhdGlvbnMgYW5kIGEgYGZsdXNoYCBtZXRob2QgdG8gaW1tZWRpYXRlbHkgaW52b2tlIHRoZW0uXG4gKiBQcm92aWRlIGBvcHRpb25zYCB0byBpbmRpY2F0ZSB3aGV0aGVyIGBmdW5jYCBzaG91bGQgYmUgaW52b2tlZCBvbiB0aGVcbiAqIGxlYWRpbmcgYW5kL29yIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIGB3YWl0YCB0aW1lb3V0LiBUaGUgYGZ1bmNgIGlzIGludm9rZWRcbiAqIHdpdGggdGhlIGxhc3QgYXJndW1lbnRzIHByb3ZpZGVkIHRvIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb24uIFN1YnNlcXVlbnRcbiAqIGNhbGxzIHRvIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb24gcmV0dXJuIHRoZSByZXN1bHQgb2YgdGhlIGxhc3QgYGZ1bmNgXG4gKiBpbnZvY2F0aW9uLlxuICpcbiAqICoqTm90ZToqKiBJZiBgbGVhZGluZ2AgYW5kIGB0cmFpbGluZ2Agb3B0aW9ucyBhcmUgYHRydWVgLCBgZnVuY2AgaXNcbiAqIGludm9rZWQgb24gdGhlIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQgb25seSBpZiB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uXG4gKiBpcyBpbnZva2VkIG1vcmUgdGhhbiBvbmNlIGR1cmluZyB0aGUgYHdhaXRgIHRpbWVvdXQuXG4gKlxuICogSWYgYHdhaXRgIGlzIGAwYCBhbmQgYGxlYWRpbmdgIGlzIGBmYWxzZWAsIGBmdW5jYCBpbnZvY2F0aW9uIGlzIGRlZmVycmVkXG4gKiB1bnRpbCB0byB0aGUgbmV4dCB0aWNrLCBzaW1pbGFyIHRvIGBzZXRUaW1lb3V0YCB3aXRoIGEgdGltZW91dCBvZiBgMGAuXG4gKlxuICogU2VlIFtEYXZpZCBDb3JiYWNobydzIGFydGljbGVdKGh0dHBzOi8vY3NzLXRyaWNrcy5jb20vZGVib3VuY2luZy10aHJvdHRsaW5nLWV4cGxhaW5lZC1leGFtcGxlcy8pXG4gKiBmb3IgZGV0YWlscyBvdmVyIHRoZSBkaWZmZXJlbmNlcyBiZXR3ZWVuIGBfLmRlYm91bmNlYCBhbmQgYF8udGhyb3R0bGVgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gZGVib3VuY2UuXG4gKiBAcGFyYW0ge251bWJlcn0gW3dhaXQ9MF0gVGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdG8gZGVsYXkuXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIFRoZSBvcHRpb25zIG9iamVjdC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMubGVhZGluZz1mYWxzZV1cbiAqICBTcGVjaWZ5IGludm9raW5nIG9uIHRoZSBsZWFkaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQuXG4gKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMubWF4V2FpdF1cbiAqICBUaGUgbWF4aW11bSB0aW1lIGBmdW5jYCBpcyBhbGxvd2VkIHRvIGJlIGRlbGF5ZWQgYmVmb3JlIGl0J3MgaW52b2tlZC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMudHJhaWxpbmc9dHJ1ZV1cbiAqICBTcGVjaWZ5IGludm9raW5nIG9uIHRoZSB0cmFpbGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZGVib3VuY2VkIGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiAvLyBBdm9pZCBjb3N0bHkgY2FsY3VsYXRpb25zIHdoaWxlIHRoZSB3aW5kb3cgc2l6ZSBpcyBpbiBmbHV4LlxuICogalF1ZXJ5KHdpbmRvdykub24oJ3Jlc2l6ZScsIF8uZGVib3VuY2UoY2FsY3VsYXRlTGF5b3V0LCAxNTApKTtcbiAqXG4gKiAvLyBJbnZva2UgYHNlbmRNYWlsYCB3aGVuIGNsaWNrZWQsIGRlYm91bmNpbmcgc3Vic2VxdWVudCBjYWxscy5cbiAqIGpRdWVyeShlbGVtZW50KS5vbignY2xpY2snLCBfLmRlYm91bmNlKHNlbmRNYWlsLCAzMDAsIHtcbiAqICAgJ2xlYWRpbmcnOiB0cnVlLFxuICogICAndHJhaWxpbmcnOiBmYWxzZVxuICogfSkpO1xuICpcbiAqIC8vIEVuc3VyZSBgYmF0Y2hMb2dgIGlzIGludm9rZWQgb25jZSBhZnRlciAxIHNlY29uZCBvZiBkZWJvdW5jZWQgY2FsbHMuXG4gKiB2YXIgZGVib3VuY2VkID0gXy5kZWJvdW5jZShiYXRjaExvZywgMjUwLCB7ICdtYXhXYWl0JzogMTAwMCB9KTtcbiAqIHZhciBzb3VyY2UgPSBuZXcgRXZlbnRTb3VyY2UoJy9zdHJlYW0nKTtcbiAqIGpRdWVyeShzb3VyY2UpLm9uKCdtZXNzYWdlJywgZGVib3VuY2VkKTtcbiAqXG4gKiAvLyBDYW5jZWwgdGhlIHRyYWlsaW5nIGRlYm91bmNlZCBpbnZvY2F0aW9uLlxuICogalF1ZXJ5KHdpbmRvdykub24oJ3BvcHN0YXRlJywgZGVib3VuY2VkLmNhbmNlbCk7XG4gKi9cbmZ1bmN0aW9uIGRlYm91bmNlKGZ1bmMsIHdhaXQsIG9wdGlvbnMpIHtcbiAgdmFyIGxhc3RBcmdzLFxuICAgICAgbGFzdFRoaXMsXG4gICAgICBtYXhXYWl0LFxuICAgICAgcmVzdWx0LFxuICAgICAgdGltZXJJZCxcbiAgICAgIGxhc3RDYWxsVGltZSxcbiAgICAgIGxhc3RJbnZva2VUaW1lID0gMCxcbiAgICAgIGxlYWRpbmcgPSBmYWxzZSxcbiAgICAgIG1heGluZyA9IGZhbHNlLFxuICAgICAgdHJhaWxpbmcgPSB0cnVlO1xuXG4gIGlmICh0eXBlb2YgZnVuYyAhPSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihGVU5DX0VSUk9SX1RFWFQpO1xuICB9XG4gIHdhaXQgPSB0b051bWJlcih3YWl0KSB8fCAwO1xuICBpZiAoaXNPYmplY3Qob3B0aW9ucykpIHtcbiAgICBsZWFkaW5nID0gISFvcHRpb25zLmxlYWRpbmc7XG4gICAgbWF4aW5nID0gJ21heFdhaXQnIGluIG9wdGlvbnM7XG4gICAgbWF4V2FpdCA9IG1heGluZyA/IG5hdGl2ZU1heCh0b051bWJlcihvcHRpb25zLm1heFdhaXQpIHx8IDAsIHdhaXQpIDogbWF4V2FpdDtcbiAgICB0cmFpbGluZyA9ICd0cmFpbGluZycgaW4gb3B0aW9ucyA/ICEhb3B0aW9ucy50cmFpbGluZyA6IHRyYWlsaW5nO1xuICB9XG5cbiAgZnVuY3Rpb24gaW52b2tlRnVuYyh0aW1lKSB7XG4gICAgdmFyIGFyZ3MgPSBsYXN0QXJncyxcbiAgICAgICAgdGhpc0FyZyA9IGxhc3RUaGlzO1xuXG4gICAgbGFzdEFyZ3MgPSBsYXN0VGhpcyA9IHVuZGVmaW5lZDtcbiAgICBsYXN0SW52b2tlVGltZSA9IHRpbWU7XG4gICAgcmVzdWx0ID0gZnVuYy5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gbGVhZGluZ0VkZ2UodGltZSkge1xuICAgIC8vIFJlc2V0IGFueSBgbWF4V2FpdGAgdGltZXIuXG4gICAgbGFzdEludm9rZVRpbWUgPSB0aW1lO1xuICAgIC8vIFN0YXJ0IHRoZSB0aW1lciBmb3IgdGhlIHRyYWlsaW5nIGVkZ2UuXG4gICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCB3YWl0KTtcbiAgICAvLyBJbnZva2UgdGhlIGxlYWRpbmcgZWRnZS5cbiAgICByZXR1cm4gbGVhZGluZyA/IGludm9rZUZ1bmModGltZSkgOiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiByZW1haW5pbmdXYWl0KHRpbWUpIHtcbiAgICB2YXIgdGltZVNpbmNlTGFzdENhbGwgPSB0aW1lIC0gbGFzdENhbGxUaW1lLFxuICAgICAgICB0aW1lU2luY2VMYXN0SW52b2tlID0gdGltZSAtIGxhc3RJbnZva2VUaW1lLFxuICAgICAgICByZXN1bHQgPSB3YWl0IC0gdGltZVNpbmNlTGFzdENhbGw7XG5cbiAgICByZXR1cm4gbWF4aW5nID8gbmF0aXZlTWluKHJlc3VsdCwgbWF4V2FpdCAtIHRpbWVTaW5jZUxhc3RJbnZva2UpIDogcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gc2hvdWxkSW52b2tlKHRpbWUpIHtcbiAgICB2YXIgdGltZVNpbmNlTGFzdENhbGwgPSB0aW1lIC0gbGFzdENhbGxUaW1lLFxuICAgICAgICB0aW1lU2luY2VMYXN0SW52b2tlID0gdGltZSAtIGxhc3RJbnZva2VUaW1lO1xuXG4gICAgLy8gRWl0aGVyIHRoaXMgaXMgdGhlIGZpcnN0IGNhbGwsIGFjdGl2aXR5IGhhcyBzdG9wcGVkIGFuZCB3ZSdyZSBhdCB0aGVcbiAgICAvLyB0cmFpbGluZyBlZGdlLCB0aGUgc3lzdGVtIHRpbWUgaGFzIGdvbmUgYmFja3dhcmRzIGFuZCB3ZSdyZSB0cmVhdGluZ1xuICAgIC8vIGl0IGFzIHRoZSB0cmFpbGluZyBlZGdlLCBvciB3ZSd2ZSBoaXQgdGhlIGBtYXhXYWl0YCBsaW1pdC5cbiAgICByZXR1cm4gKGxhc3RDYWxsVGltZSA9PT0gdW5kZWZpbmVkIHx8ICh0aW1lU2luY2VMYXN0Q2FsbCA+PSB3YWl0KSB8fFxuICAgICAgKHRpbWVTaW5jZUxhc3RDYWxsIDwgMCkgfHwgKG1heGluZyAmJiB0aW1lU2luY2VMYXN0SW52b2tlID49IG1heFdhaXQpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRpbWVyRXhwaXJlZCgpIHtcbiAgICB2YXIgdGltZSA9IG5vdygpO1xuICAgIGlmIChzaG91bGRJbnZva2UodGltZSkpIHtcbiAgICAgIHJldHVybiB0cmFpbGluZ0VkZ2UodGltZSk7XG4gICAgfVxuICAgIC8vIFJlc3RhcnQgdGhlIHRpbWVyLlxuICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCwgcmVtYWluaW5nV2FpdCh0aW1lKSk7XG4gIH1cblxuICBmdW5jdGlvbiB0cmFpbGluZ0VkZ2UodGltZSkge1xuICAgIHRpbWVySWQgPSB1bmRlZmluZWQ7XG5cbiAgICAvLyBPbmx5IGludm9rZSBpZiB3ZSBoYXZlIGBsYXN0QXJnc2Agd2hpY2ggbWVhbnMgYGZ1bmNgIGhhcyBiZWVuXG4gICAgLy8gZGVib3VuY2VkIGF0IGxlYXN0IG9uY2UuXG4gICAgaWYgKHRyYWlsaW5nICYmIGxhc3RBcmdzKSB7XG4gICAgICByZXR1cm4gaW52b2tlRnVuYyh0aW1lKTtcbiAgICB9XG4gICAgbGFzdEFyZ3MgPSBsYXN0VGhpcyA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gY2FuY2VsKCkge1xuICAgIGlmICh0aW1lcklkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcklkKTtcbiAgICB9XG4gICAgbGFzdEludm9rZVRpbWUgPSAwO1xuICAgIGxhc3RBcmdzID0gbGFzdENhbGxUaW1lID0gbGFzdFRoaXMgPSB0aW1lcklkID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgZnVuY3Rpb24gZmx1c2goKSB7XG4gICAgcmV0dXJuIHRpbWVySWQgPT09IHVuZGVmaW5lZCA/IHJlc3VsdCA6IHRyYWlsaW5nRWRnZShub3coKSk7XG4gIH1cblxuICBmdW5jdGlvbiBkZWJvdW5jZWQoKSB7XG4gICAgdmFyIHRpbWUgPSBub3coKSxcbiAgICAgICAgaXNJbnZva2luZyA9IHNob3VsZEludm9rZSh0aW1lKTtcblxuICAgIGxhc3RBcmdzID0gYXJndW1lbnRzO1xuICAgIGxhc3RUaGlzID0gdGhpcztcbiAgICBsYXN0Q2FsbFRpbWUgPSB0aW1lO1xuXG4gICAgaWYgKGlzSW52b2tpbmcpIHtcbiAgICAgIGlmICh0aW1lcklkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIGxlYWRpbmdFZGdlKGxhc3RDYWxsVGltZSk7XG4gICAgICB9XG4gICAgICBpZiAobWF4aW5nKSB7XG4gICAgICAgIC8vIEhhbmRsZSBpbnZvY2F0aW9ucyBpbiBhIHRpZ2h0IGxvb3AuXG4gICAgICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCwgd2FpdCk7XG4gICAgICAgIHJldHVybiBpbnZva2VGdW5jKGxhc3RDYWxsVGltZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aW1lcklkID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCwgd2FpdCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgZGVib3VuY2VkLmNhbmNlbCA9IGNhbmNlbDtcbiAgZGVib3VuY2VkLmZsdXNoID0gZmx1c2g7XG4gIHJldHVybiBkZWJvdW5jZWQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIHRocm90dGxlZCBmdW5jdGlvbiB0aGF0IG9ubHkgaW52b2tlcyBgZnVuY2AgYXQgbW9zdCBvbmNlIHBlclxuICogZXZlcnkgYHdhaXRgIG1pbGxpc2Vjb25kcy4gVGhlIHRocm90dGxlZCBmdW5jdGlvbiBjb21lcyB3aXRoIGEgYGNhbmNlbGBcbiAqIG1ldGhvZCB0byBjYW5jZWwgZGVsYXllZCBgZnVuY2AgaW52b2NhdGlvbnMgYW5kIGEgYGZsdXNoYCBtZXRob2QgdG9cbiAqIGltbWVkaWF0ZWx5IGludm9rZSB0aGVtLiBQcm92aWRlIGBvcHRpb25zYCB0byBpbmRpY2F0ZSB3aGV0aGVyIGBmdW5jYFxuICogc2hvdWxkIGJlIGludm9rZWQgb24gdGhlIGxlYWRpbmcgYW5kL29yIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIGB3YWl0YFxuICogdGltZW91dC4gVGhlIGBmdW5jYCBpcyBpbnZva2VkIHdpdGggdGhlIGxhc3QgYXJndW1lbnRzIHByb3ZpZGVkIHRvIHRoZVxuICogdGhyb3R0bGVkIGZ1bmN0aW9uLiBTdWJzZXF1ZW50IGNhbGxzIHRvIHRoZSB0aHJvdHRsZWQgZnVuY3Rpb24gcmV0dXJuIHRoZVxuICogcmVzdWx0IG9mIHRoZSBsYXN0IGBmdW5jYCBpbnZvY2F0aW9uLlxuICpcbiAqICoqTm90ZToqKiBJZiBgbGVhZGluZ2AgYW5kIGB0cmFpbGluZ2Agb3B0aW9ucyBhcmUgYHRydWVgLCBgZnVuY2AgaXNcbiAqIGludm9rZWQgb24gdGhlIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQgb25seSBpZiB0aGUgdGhyb3R0bGVkIGZ1bmN0aW9uXG4gKiBpcyBpbnZva2VkIG1vcmUgdGhhbiBvbmNlIGR1cmluZyB0aGUgYHdhaXRgIHRpbWVvdXQuXG4gKlxuICogSWYgYHdhaXRgIGlzIGAwYCBhbmQgYGxlYWRpbmdgIGlzIGBmYWxzZWAsIGBmdW5jYCBpbnZvY2F0aW9uIGlzIGRlZmVycmVkXG4gKiB1bnRpbCB0byB0aGUgbmV4dCB0aWNrLCBzaW1pbGFyIHRvIGBzZXRUaW1lb3V0YCB3aXRoIGEgdGltZW91dCBvZiBgMGAuXG4gKlxuICogU2VlIFtEYXZpZCBDb3JiYWNobydzIGFydGljbGVdKGh0dHBzOi8vY3NzLXRyaWNrcy5jb20vZGVib3VuY2luZy10aHJvdHRsaW5nLWV4cGxhaW5lZC1leGFtcGxlcy8pXG4gKiBmb3IgZGV0YWlscyBvdmVyIHRoZSBkaWZmZXJlbmNlcyBiZXR3ZWVuIGBfLnRocm90dGxlYCBhbmQgYF8uZGVib3VuY2VgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gdGhyb3R0bGUuXG4gKiBAcGFyYW0ge251bWJlcn0gW3dhaXQ9MF0gVGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdG8gdGhyb3R0bGUgaW52b2NhdGlvbnMgdG8uXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIFRoZSBvcHRpb25zIG9iamVjdC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMubGVhZGluZz10cnVlXVxuICogIFNwZWNpZnkgaW52b2tpbmcgb24gdGhlIGxlYWRpbmcgZWRnZSBvZiB0aGUgdGltZW91dC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMudHJhaWxpbmc9dHJ1ZV1cbiAqICBTcGVjaWZ5IGludm9raW5nIG9uIHRoZSB0cmFpbGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgdGhyb3R0bGVkIGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiAvLyBBdm9pZCBleGNlc3NpdmVseSB1cGRhdGluZyB0aGUgcG9zaXRpb24gd2hpbGUgc2Nyb2xsaW5nLlxuICogalF1ZXJ5KHdpbmRvdykub24oJ3Njcm9sbCcsIF8udGhyb3R0bGUodXBkYXRlUG9zaXRpb24sIDEwMCkpO1xuICpcbiAqIC8vIEludm9rZSBgcmVuZXdUb2tlbmAgd2hlbiB0aGUgY2xpY2sgZXZlbnQgaXMgZmlyZWQsIGJ1dCBub3QgbW9yZSB0aGFuIG9uY2UgZXZlcnkgNSBtaW51dGVzLlxuICogdmFyIHRocm90dGxlZCA9IF8udGhyb3R0bGUocmVuZXdUb2tlbiwgMzAwMDAwLCB7ICd0cmFpbGluZyc6IGZhbHNlIH0pO1xuICogalF1ZXJ5KGVsZW1lbnQpLm9uKCdjbGljaycsIHRocm90dGxlZCk7XG4gKlxuICogLy8gQ2FuY2VsIHRoZSB0cmFpbGluZyB0aHJvdHRsZWQgaW52b2NhdGlvbi5cbiAqIGpRdWVyeSh3aW5kb3cpLm9uKCdwb3BzdGF0ZScsIHRocm90dGxlZC5jYW5jZWwpO1xuICovXG5mdW5jdGlvbiB0aHJvdHRsZShmdW5jLCB3YWl0LCBvcHRpb25zKSB7XG4gIHZhciBsZWFkaW5nID0gdHJ1ZSxcbiAgICAgIHRyYWlsaW5nID0gdHJ1ZTtcblxuICBpZiAodHlwZW9mIGZ1bmMgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoRlVOQ19FUlJPUl9URVhUKTtcbiAgfVxuICBpZiAoaXNPYmplY3Qob3B0aW9ucykpIHtcbiAgICBsZWFkaW5nID0gJ2xlYWRpbmcnIGluIG9wdGlvbnMgPyAhIW9wdGlvbnMubGVhZGluZyA6IGxlYWRpbmc7XG4gICAgdHJhaWxpbmcgPSAndHJhaWxpbmcnIGluIG9wdGlvbnMgPyAhIW9wdGlvbnMudHJhaWxpbmcgOiB0cmFpbGluZztcbiAgfVxuICByZXR1cm4gZGVib3VuY2UoZnVuYywgd2FpdCwge1xuICAgICdsZWFkaW5nJzogbGVhZGluZyxcbiAgICAnbWF4V2FpdCc6IHdhaXQsXG4gICAgJ3RyYWlsaW5nJzogdHJhaWxpbmdcbiAgfSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlXG4gKiBbbGFuZ3VhZ2UgdHlwZV0oaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLWVjbWFzY3JpcHQtbGFuZ3VhZ2UtdHlwZXMpXG4gKiBvZiBgT2JqZWN0YC4gKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gISF2YWx1ZSAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLiBBIHZhbHVlIGlzIG9iamVjdC1saWtlIGlmIGl0J3Mgbm90IGBudWxsYFxuICogYW5kIGhhcyBhIGB0eXBlb2ZgIHJlc3VsdCBvZiBcIm9iamVjdFwiLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAhIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYFN5bWJvbGAgcHJpbWl0aXZlIG9yIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHN5bWJvbCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzU3ltYm9sKFN5bWJvbC5pdGVyYXRvcik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1N5bWJvbCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N5bWJvbCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdzeW1ib2wnIHx8XG4gICAgKGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gc3ltYm9sVGFnKTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgbnVtYmVyLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgbnVtYmVyLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRvTnVtYmVyKDMuMik7XG4gKiAvLyA9PiAzLjJcbiAqXG4gKiBfLnRvTnVtYmVyKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gNWUtMzI0XG4gKlxuICogXy50b051bWJlcihJbmZpbml0eSk7XG4gKiAvLyA9PiBJbmZpbml0eVxuICpcbiAqIF8udG9OdW1iZXIoJzMuMicpO1xuICogLy8gPT4gMy4yXG4gKi9cbmZ1bmN0aW9uIHRvTnVtYmVyKHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgaWYgKGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiBOQU47XG4gIH1cbiAgaWYgKGlzT2JqZWN0KHZhbHVlKSkge1xuICAgIHZhciBvdGhlciA9IHR5cGVvZiB2YWx1ZS52YWx1ZU9mID09ICdmdW5jdGlvbicgPyB2YWx1ZS52YWx1ZU9mKCkgOiB2YWx1ZTtcbiAgICB2YWx1ZSA9IGlzT2JqZWN0KG90aGVyKSA/IChvdGhlciArICcnKSA6IG90aGVyO1xuICB9XG4gIGlmICh0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IDAgPyB2YWx1ZSA6ICt2YWx1ZTtcbiAgfVxuICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UocmVUcmltLCAnJyk7XG4gIHZhciBpc0JpbmFyeSA9IHJlSXNCaW5hcnkudGVzdCh2YWx1ZSk7XG4gIHJldHVybiAoaXNCaW5hcnkgfHwgcmVJc09jdGFsLnRlc3QodmFsdWUpKVxuICAgID8gZnJlZVBhcnNlSW50KHZhbHVlLnNsaWNlKDIpLCBpc0JpbmFyeSA/IDIgOiA4KVxuICAgIDogKHJlSXNCYWRIZXgudGVzdCh2YWx1ZSkgPyBOQU4gOiArdmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRocm90dGxlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBub3AoKXt9XG5cbm1vZHVsZS5leHBvcnRzID0gbm9wO1xuIiwiZnVuY3Rpb24gYm91bmRhcnlfdG9fZG90KHZhbHVlKSB7XG5cdHJldHVybiB2YWx1ZS5zcGxpdCgnXVsnKS5qb2luKCcuJykuc3BsaXQoJ1snKS5qb2luKCcuJyk7XG59XG5cbmZ1bmN0aW9uIHN0cmlwX2JyYWNlcyh2YWx1ZSkge1xuXHRyZXR1cm4gdmFsdWUuc3BsaXQoJ1snKS5qb2luKCcuJykuc3BsaXQoJ10nKS5qb2luKCcnKTtcbn1cblxuZnVuY3Rpb24gZXNjYXBlX2RvdHModmFsdWUpIHtcblx0dmFsdWUgPSB2YWx1ZS5zcGxpdCgnXFwnJyk7XG5cdHJldHVybiAodmFsdWUubGVuZ3RoIDwgMykgPyB2YWx1ZS5qb2luKCdcXCcnKSA6IHZhbHVlLm1hcChmdW5jdGlvbihzZWcpIHtcblx0XHRpZiAoc2VnLmxlbmd0aCA8IDMpIHJldHVybiBzZWc7XG5cdFx0aWYgKChzZWdbMF0gPT09ICcuJykgfHwgKHNlZ1tzZWcubGVuZ3RoIC0gMV0gPT09ICcuJykpIHJldHVybiBzZWc7XG5cdFx0cmV0dXJuIHNlZy5zcGxpdCgnLicpLmpvaW4oJyYmJyk7XG5cdH0pLmpvaW4oJycpO1xufVxuXG5mdW5jdGlvbiB1bmVzY2FwZV9kb3RzKHZhbHVlKSB7XG5cdHJldHVybiB2YWx1ZS5zcGxpdCgnJiYnKS5qb2luKCcuJyk7XG59XG5cbmZ1bmN0aW9uIHBhcnRpZnkodmFsdWUpIHtcblx0aWYgKCF2YWx1ZSkgcmV0dXJuICcnO1xuXHRyZXR1cm4gZXNjYXBlX2RvdHMoc3RyaXBfYnJhY2VzKGJvdW5kYXJ5X3RvX2RvdCgnJyArIHZhbHVlKSkpLnNwbGl0KCcuJyk7XG59XG5cbnZhciBnZXQgPSBmdW5jdGlvbihvLCBwYXRoKSB7XG5cblx0dmFyIHBhcnRzID0gcGFydGlmeShwYXRoKTtcblx0aWYgKHBhcnRzLmxlbmd0aCA9PT0gMSkgcmV0dXJuIG9bdW5lc2NhcGVfZG90cyhwYXJ0c1swXSldO1xuXHRpZiAocGFydHMubGVuZ3RoID09PSAwKSByZXR1cm47XG5cblx0dmFyIGZpcnN0ID0gb1twYXJ0cy5zaGlmdCgpXTtcblxuXHRyZXR1cm4gcGFydHMucmVkdWNlKGZ1bmN0aW9uKHRhcmdldCwgcHJvcCkge1xuXHRcdGlmICghdGFyZ2V0KSByZXR1cm4gdGFyZ2V0O1xuXHRcdHJldHVybiB0YXJnZXRbdW5lc2NhcGVfZG90cyhwcm9wKV07XG5cdH0sIGZpcnN0KTtcbn07XG5cbmdldC5zZXQgPSBmdW5jdGlvbihvYmosIHBhdGgsIHZhbHVlKSB7XG5cdHZhciBwYXJ0cyA9IHBhcnRpZnkocGF0aCk7XG5cdHBhcnRzLnJlZHVjZShmdW5jdGlvbih0YXJnZXQsIHByb3AsIGkpIHtcblx0XHRwcm9wID0gdW5lc2NhcGVfZG90cyhwcm9wKTtcblx0XHRpZiAocGFydHMubGVuZ3RoIC0gMSA9PT0gaSkge1xuXHRcdFx0dGFyZ2V0W3Byb3BdID0gdmFsdWU7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRhcmdldFtwcm9wXSA9IHRhcmdldFtwcm9wXSB8fCB7fTtcblx0XHR9XG5cdFx0cmV0dXJuIHRhcmdldFtwcm9wXTtcblxuXG5cdH0sIG9iaik7XG5cblx0cmV0dXJuIG9iajtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0O1xubW9kdWxlLmV4cG9ydHMuZ2V0ID0gZ2V0O1xuIiwiaW1wb3J0IHsgVmlldywgV2lkZ2V0IH0gZnJvbSAnd21sanMvbGliL3J1bnRpbWUnO1xuaW1wb3J0IGxheW91dCBmcm9tICcuL3dtbC9jb2x1bW4ud21sJztcblxuLyoqXG4gKiBDb2x1bW5cbiAqL1xuY2xhc3MgQ29sdW1uIGV4dGVuZHMgV2lkZ2V0IHtcblxuICAgIGNvbnN0cnVjdG9yKGF0dHJzLCBjaGlsZHJlbikge1xuXG4gICAgICAgIHN1cGVyKGF0dHJzLCBjaGlsZHJlbik7XG5cbiAgICAgICAgdGhpcy5jbGFzc05hbWUgPSBhdHRycy5yZWFkKCd3YXQ6Y2xhc3MnLCAnY29sLW1kLTEyJyk7XG5cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIFZpZXcucmVuZGVyKGxheW91dCwgdGhpcyk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29sdW1uXG4iLCJpbXBvcnQgeyBWaWV3LCBXaWRnZXQgfSBmcm9tICd3bWxqcy9saWIvcnVudGltZSc7XG5pbXBvcnQgbGF5b3V0IGZyb20gJy4vd21sL2NvbnRhaW5lci53bWwnO1xuXG4vKipcbiAqIENvbnRhaW5lclxuICovXG5jbGFzcyBDb250YWluZXIgZXh0ZW5kcyBXaWRnZXQge1xuXG4gICAgY29uc3RydWN0b3IoYXR0cnMsIGNoaWxkcmVuKSB7XG5cbiAgICAgICAgc3VwZXIoYXR0cnMsIGNoaWxkcmVuKTtcblxuICAgICAgICB0aGlzLmNsYXNzTmFtZSA9ICgnY29udGFpbmVyLWZsdWlkICcrYXR0cnMucmVhZCgnd2F0OmNsYXNzJywgJycpKS50cmltKCk7XG5cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIFZpZXcucmVuZGVyKGxheW91dCwgdGhpcyk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29udGFpbmVyXG4iLCJpbXBvcnQgeyBWaWV3LCBXaWRnZXQgfSBmcm9tICd3bWxqcy9saWIvcnVudGltZSc7XG5pbXBvcnQgbGF5b3V0IGZyb20gJy4vd21sL3Jvdy53bWwnO1xuXG4vKipcbiAqIFJvd1xuICovXG5jbGFzcyBSb3cgZXh0ZW5kcyBXaWRnZXQge1xuXG4gICAgY29uc3RydWN0b3IoYXR0cnMsIGNoaWxkcmVuKSB7XG5cbiAgICAgICAgc3VwZXIoYXR0cnMsIGNoaWxkcmVuKTtcblxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gVmlldy5yZW5kZXIobGF5b3V0LCB0aGlzKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBSb3dcbiIsImltcG9ydCB7IFZpZXcsIFdpZGdldCB9IGZyb20gJ3dtbGpzL2xpYi9ydW50aW1lJztcblxuLyoqXG4gKiBUYWJsZVxuICovXG5jbGFzcyBUYWJsZSBleHRlbmRzIFdpZGdldCB7XG5cbiAgICBjb25zdHJ1Y3RvcihhdHRycywgY2hpbGRyZW4pIHtcblxuICAgICAgICBzdXBlcihhdHRycywgY2hpbGRyZW4pO1xuXG4gICAgICAgIHRoaXMuZGF0YSA9IGF0dHJzLm5zLmJzLmRhdGE7XG4gICAgICAgIHRoaXMuX2xheW91dCA9IGF0dHJzLm5zLmJzLmxheW91dDtcbiAgICAgICAgdGhpcy5maWVsZHMgPSBhdHRycy5ucy5icy5maWVsZHMgfHwgW107XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByb3dDbGlja2VkXG4gICAgICovXG4gICAgcm93Q2xpY2tlZChlKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuYXR0cmlidXRlcy5ucylcbiAgICAgICAgICAgIGlmICh0aGlzLmF0dHJpYnV0ZXMubnMuYnMub25Sb3dDbGlja2VkKVxuICAgICAgICAgICAgICAgIHRoaXMuYXR0cmlidXRlcy5ucy5icy5vblJvd0NsaWNrZWQoZSwgdGhpcyk7XG5cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgaWYgKCF0aGlzLl9sYXlvdXQpIHRocm93IG5ldyBFcnJvcignVGFibGU6IExheW91dCBub3Qgc3BlY2lmaWVkIScpO1xuXG4gICAgICAgIHJldHVybiAobmV3IFZpZXcodGhpcy5fbGF5b3V0LCB0aGlzKSkucmVuZGVyKCk7XG5cbiAgICB9XG5cbn1cbmV4cG9ydCBkZWZhdWx0IFRhYmxlXG4iLCJpbXBvcnQgeyBWaWV3LCBXaWRnZXQgfSBmcm9tICd3bWxqcy9saWIvcnVudGltZSc7XG5pbXBvcnQgcHJvcGVydHkgZnJvbSAncHJvcGVydHktc2Vlayc7XG5pbXBvcnQgdGhyb3R0bGUgZnJvbSAnbG9kYXNoLnRocm90dGxlJztcbmltcG9ydCBub3AgZnJvbSAnbm9wJztcbmltcG9ydCBsYXlvdXQgZnJvbSAnLi93bWwvbGF5b3V0LndtbCc7XG5pbXBvcnQgUmVzdERlbGVnYXRlIGZyb20gJy4vUmVzdERlbGVnYXRlJztcbmltcG9ydCBTZWFyY2hEZWxlZ2F0ZSBmcm9tICcuL1NlYXJjaERlbGVnYXRlJztcbmltcG9ydCBTZWxlY3Rpb25EZWxlZ2F0ZSBmcm9tICcuL1NlbGVjdGlvbkRlbGVnYXRlJztcbmltcG9ydCBQb3B1bGF0ZWREZWxlZ2F0ZSBmcm9tICcuL1BvcHVsYXRlZERlbGVnYXRlJztcblxuY2xhc3MgQXV0b2NvbXBsZXRlIGV4dGVuZHMgV2lkZ2V0IHtcblxuICAgIGNvbnN0cnVjdG9yKGF0dHJzLCBjaGlsZHJlbikge1xuXG4gICAgICAgIHN1cGVyKGF0dHJzLCBjaGlsZHJlbik7XG5cbiAgICAgICAgdGhpcy5jaG9pY2UgPSBudWxsO1xuICAgICAgICB0aGlzLnZpZXcgPSBuZXcgVmlldyhsYXlvdXQsIHRoaXMpO1xuICAgICAgICB0aGlzLnJlc3REZWxlZ2F0ZSA9IG5ldyBSZXN0RGVsZWdhdGUodGhpcyk7XG4gICAgICAgIHRoaXMuc2VhcmNoRGVsZWdhdGUgPSBuZXcgU2VhcmNoRGVsZWdhdGUodGhpcyk7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uRGVsZWdhdGUgPSBuZXcgU2VsZWN0aW9uRGVsZWdhdGUodGhpcyk7XG4gICAgICAgIHRoaXMucG9wdWxhdGVkRGVsZWdhdGUgPSBuZXcgUG9wdWxhdGVkRGVsZWdhdGUodGhpcyk7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICAgIHRoaXMuc2VhcmNoID0gdGhyb3R0bGUoaW5wdXQgPT4ge1xuXG4gICAgICAgICAgICBhdHRycy5yZWFkKCd3YXQ6c2VhcmNoJywgbm9wKShpbnB1dC52YWx1ZSwgdGhpcyk7XG5cbiAgICAgICAgfSwgNTAwKTtcblxuICAgIH1cblxuICAgIG9uUmVuZGVyZWQoKSB7XG5cbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzKTtcblxuICAgIH1cblxuICAgIGhhbmRsZUV2ZW50KGUpIHtcblxuICAgICAgICBpZiAoIXRoaXMudmlldy5maW5kQnlJZCgncm9vdCcpLmNvbnRhaW5zKGUudGFyZ2V0KSkge1xuICAgICAgICAgICAgdGhpcy50b1Jlc3QoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghZG9jdW1lbnQuYm9keS5jb250YWlucyh0aGlzLnZpZXcuZmluZEJ5SWQoJ3Jvb3QnKSkpXG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMpO1xuXG4gICAgfVxuXG4gICAgaGFuZGxlS2V5VXAoZSkge1xuXG4gICAgICAgIHRoaXMuZGVsZWdhdGUuaGFuZGxlS2V5VXAoZSk7XG5cbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duKGUpIHtcblxuICAgICAgICB0aGlzLmRlbGVnYXRlLmhhbmRsZUtleURvd24oZSk7XG5cbiAgICB9XG5cbiAgICBoYW5kbGVJbnB1dChlKSB7XG5cbiAgICAgICAgLy9Gb3IgY29tcGF0YWJpbGl0eSByZWFzb25zXG4gICAgICAgIGUudGFyZ2V0Lm9ua2V5ZG93biA9IG51bGw7XG4gICAgICAgIHRoaXMuaGFuZGxlS2V5RG93bihlKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHNlbGVjdGVkIGlzIGNhbGxlZCB3aGVuIGFuIG9wdGlvbiBoYXMgYmVlbiBjbGlja2VkIG9uXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4XG4gICAgICovXG4gICAgc2VsZWN0ZWQoaW5kZXgpIHtcblxuICAgICAgICB0aGlzLmRlbGVnYXRlLnNlbGVjdGVkKGluZGV4KTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHRvUmVzdCBtYWtlcyB0aGUgQXV0b2NvbXBsZXRlIGJlaGF2ZS5cbiAgICAgKi9cbiAgICB0b1Jlc3QoKSB7XG5cbiAgICAgICAgdGhpcy5kZWxlZ2F0ZSA9IHRoaXMucmVzdERlbGVnYXRlO1xuICAgICAgICB0aGlzLmRlbGVnYXRlLnJlbmRlcigpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogdG9TZWFyY2ggdHJhbnNpdGlvbnMgdGhlIEF1dG9jb21wbGV0ZSB0byB0aGUgc2VhcmNoIHBoYXNlLlxuICAgICAqL1xuICAgIHRvU2VhcmNoKCkge1xuXG4gICAgICAgIHRoaXMuZGVsZWdhdGUgPSB0aGlzLnNlYXJjaERlbGVnYXRlO1xuICAgICAgICB0aGlzLmRlbGVnYXRlLnJlbmRlcigpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogdG9TZWxlY3Rpb24gdHJhbnNpdGlvbnMgdGhlIGF1dG9jb21wbGV0ZSB0byB0aGUgc2VsZWN0aW9uIHBoYXNlXG4gICAgICovXG4gICAgdG9TZWxlY3Rpb24oKSB7XG5cbiAgICAgICAgdGhpcy5kZWxlZ2F0ZSA9IHRoaXMuc2VsZWN0aW9uRGVsZWdhdGU7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUucmVuZGVyKCk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiB0b1BvcHVsYXRlZCB0cmFuc2l0aW9ucyB0aGUgYXV0b2NvbXBsZXRlIHRvIGEgcG9wdWxhdGUgc3RhdGVcbiAgICAgKiBpZiBpcyBpbml0aWFsaXplZCB3aXRoIGEgdmFsdWVcbiAgICAgKi9cbiAgICB0b1BvcHVsYXRlZCgpIHtcblxuICAgICAgICB0aGlzLmRlbGVnYXRlID0gdGhpcy5wb3B1bGF0ZWREZWxlZ2F0ZTtcbiAgICAgICAgdGhpcy5kZWxlZ2F0ZS5yZW5kZXIoKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHVwZGF0ZSB0aGUgb3B0aW9ucyBkaXNwbGF5ZWQgdG8gdGhlIHVzZXJcbiAgICAgKiBAcGFyYW0ge2FycmF5PG9iamVjdD59IGl0ZW1zXG4gICAgICovXG4gICAgdXBkYXRlKGl0ZW1zKSB7XG5cbiAgICAgICAgdGhpcy5kZWxlZ2F0ZS51cGRhdGUoaXRlbXMpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogc2V0IHRoZSB2YWx1ZSBvZiB0aGUgaW5wdXRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAgICAgKiBAcmV0dXJucyB7QXV0b2NvbXBsZXRlfVxuICAgICAqL1xuICAgIHNldCh2YWx1ZSkge1xuXG4gICAgICAgIHRoaXMudmlldy5maW5kQnlJZCgnaW5wdXQnKS52YWx1ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICB2YXIgdHJlZSA9IHRoaXMudmlldy5yZW5kZXIoKTtcbiAgICAgICAgdGhpcy5kZWxlZ2F0ZSA9ICh0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd2F0OnZhbHVlJykpID8gdGhpcy5wb3B1bGF0ZWREZWxlZ2F0ZSA6IHRoaXMucmVzdERlbGVnYXRlO1xuICAgICAgICB0aGlzLmRlbGVnYXRlLnJlbmRlcigpO1xuICAgICAgICByZXR1cm4gdHJlZTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBBdXRvY29tcGxldGVcbiIsIi8qKlxuICogQXV0b2NvbXBsZXRlRGVsZWdhdGVcbiAqIEBwYXJhbSB7QXV0b2NvbXBsZXRlfSBhdXRvY29tcGxldGVcbiAqIEBhYnN0cmFjdFxuICovXG5jbGFzcyBBdXRvY29tcGxldGVEZWxlZ2F0ZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihhdXRvY29tcGxldGUpIHtcblxuICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZSA9IGF1dG9jb21wbGV0ZTtcblxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24oKSB7XG5cbiAgICB9XG5cbiAgICBoYW5kbGVLZXlVcCgpIHtcblxuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcblxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogc2VsZWN0ZWQgaXMgY2FsbGVkIHdoZW4gYW4gb3B0aW9uIGhhcyBiZWVuIGNsaWNrZWQgb25cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXhcbiAgICAgKi9cbiAgICBzZWxlY3RlZChpbmRleCkge1xuXG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXV0b2NvbXBsZXRlRGVsZWdhdGVcbiIsImltcG9ydCB7IFZpZXcgfSBmcm9tICd3bWxqcy9saWIvcnVudGltZSc7XG5pbXBvcnQgKiBhcyBDbGFzcyBmcm9tICd3YXQtY2xhc3Nlcyc7XG5pbXBvcnQgQXV0b2NvbXBsZXRlRGVsZWdhdGUgZnJvbSAnLi9BdXRvY29tcGxldGVEZWxlZ2F0ZSc7XG5cbi8qKlxuICogUG9wdWxhdGVEZWxlZ2F0ZSBmb3IgdGhlIHNlYXJjaGluZyBwaGFzZS5cbiAqL1xuY2xhc3MgUG9wdWxhdGVEZWxlZ2F0ZSBleHRlbmRzIEF1dG9jb21wbGV0ZURlbGVnYXRlIHtcblxuICAgIGhhbmRsZUtleVVwKGUpIHtcblxuICAgICAgICBpZiAoZS5rZXlDb2RlID09PSAyNykge1xuICAgICAgICAgICAgdGhpcy5hdXRvY29tcGxldGUudG9SZXN0KCk7XG4gICAgICAgICAgICBlLnRhcmdldC5ibHVyKCk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24oZSkge1xuXG4gICAgICAgIGlmIChlLmtleUNvZGUgIT09IDI3KVxuICAgICAgICAgICAgdGhpcy5hdXRvY29tcGxldGUudG9TZWFyY2goKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHNlbGVjdGVkIGlzIGNhbGxlZCB3aGVuIGFuIG9wdGlvbiBoYXMgYmVlbiBjbGlja2VkIG9uXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4XG4gICAgICovXG4gICAgc2VsZWN0ZWQoaW5kZXgpIHtcblxuICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoJ1BvcHVsYXRlRGVsZWdhdGU6IGRvZXMgbm90IHN1cHBvcnQgc2VsZWN0aW5nIScpO1xuXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHZhciBkaXNwbGF5O1xuICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLmF1dG9jb21wbGV0ZS5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDp2YWx1ZScpO1xuICAgICAgICB2YXIgbGFiZWwgPSB0aGlzLmF1dG9jb21wbGV0ZS5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDpsYWJlbEZpZWxkJyk7XG4gICAgICAgIHZhciB2YWx1ZUZpZWxkID0gdGhpcy5hdXRvY29tcGxldGUuYXR0cmlidXRlcy5yZWFkKCd3YXQ6dmFsdWVGaWVsZCcpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG5cbiAgICAgICAgICAgIGlmIChsYWJlbCkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gcHJvcGVydHkodmFsdWUsIGxhYmVsKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWVGaWVsZCkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gcHJvcGVydHkodmFsdWUsIHZhbHVlRmllbGQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZS5zZXQodmFsdWUpO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFBvcHVsYXRlRGVsZWdhdGVcbiIsImltcG9ydCAqIGFzIENsYXNzIGZyb20gJ3dhdC1jbGFzc2VzJztcbmltcG9ydCBBdXRvY29tcGxldGVEZWxlZ2F0ZSBmcm9tICcuL0F1dG9jb21wbGV0ZURlbGVnYXRlJztcblxuLyoqXG4gKiBSZXN0RGVsZWdhdGUgaXMgdXNlZCB3aGVuIHRoZSBhdXRvY29tcGxldGUgaXMgbm90IGRvaW5nIGFueXRoaW5nIHNwZWNpYWwuXG4gKiBJdCBtYXkgaGF2ZSBmb2N1cyBidXQgdGhhdCdzIGl0LlxuICovXG5jbGFzcyBSZXN0RGVsZWdhdGUgZXh0ZW5kcyBBdXRvY29tcGxldGVEZWxlZ2F0ZSB7XG5cbiAgICBoYW5kbGVLZXlVcChlKSB7XG5cbiAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMjcpXG4gICAgICAgICAgICBlLnRhcmdldC5ibHVyKCk7XG5cbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duKGUpIHtcblxuICAgICAgICBpZiAoZS5rZXlDb2RlICE9PSAyNylcbiAgICAgICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlLnRvU2VhcmNoKCk7XG5cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgdmFyIG9wdGlvbnMgPSB0aGlzLmF1dG9jb21wbGV0ZS52aWV3LmZpbmRCeUlkKCdvcHRpb25zJyk7XG5cbiAgICAgICAgd2hpbGUgKG9wdGlvbnMubGFzdENoaWxkKVxuICAgICAgICAgICAgb3B0aW9ucy5yZW1vdmVDaGlsZChvcHRpb25zLmxhc3RDaGlsZCk7XG5cbiAgICAgICAgb3B0aW9ucy5jbGFzc0xpc3QudG9nZ2xlKENsYXNzLldBVF9WSVNJQkxFKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBSZXN0RGVsZWdhdGVcbiIsImltcG9ydCB7IFZpZXcgfSBmcm9tICd3bWxqcy9saWIvcnVudGltZSc7XG5pbXBvcnQgYmVvZiBmcm9tICdiZW9mJztcbmltcG9ydCAqIGFzIENsYXNzIGZyb20gJ3dhdC1jbGFzc2VzJztcbmltcG9ydCBub3AgZnJvbSAnbm9wJztcbmltcG9ydCBBdXRvY29tcGxldGVEZWxlZ2F0ZSBmcm9tICcuL0F1dG9jb21wbGV0ZURlbGVnYXRlJztcbmltcG9ydCBvcHRpb25zIGZyb20gJy4vd21sL29wdGlvbnMud21sJztcblxuLyoqXG4gKiBTZWFyY2hEZWxlZ2F0ZSBmb3IgdGhlIHNlYXJjaGluZyBwaGFzZS5cbiAqL1xuY2xhc3MgU2VhcmNoRGVsZWdhdGUgZXh0ZW5kcyBBdXRvY29tcGxldGVEZWxlZ2F0ZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihhdXRvKSB7XG5cbiAgICAgICAgc3VwZXIoYXV0byk7XG5cbiAgICAgICAgdGhpcy5vcHRpb25zVmlldyA9IG5ldyBWaWV3KG9wdGlvbnMsIHRoaXMpO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBbXTtcblxuICAgIH1cblxuICAgIHVwZGF0ZShpdGVtcykge1xuXG4gICAgICAgIGJlb2YoeyBpdGVtcyB9KS5vcHRpb25hbCgpLmFycmF5KCk7XG5cbiAgICAgICAgdGhpcy5vcHRpb25zID0gaXRlbXM7XG4gICAgICAgIHRoaXMucmVuZGVyKCk7XG5cbiAgICB9XG5cbiAgICBoYW5kbGVLZXlVcChlKSB7XG5cbiAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMjcpIHtcbiAgICAgICAgICAgIGUudGFyZ2V0LmJsdXIoKTtcbiAgICAgICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlLnRvUmVzdCgpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duKGUpIHtcblxuICAgICAgICAvL0B0b2RvIHRocm90dGxlIHNlYXJjaGVzP1xuICAgICAgICBpZiAoZS5rZXlDb2RlICE9PSAyNylcbiAgICAgICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlLnNlYXJjaChlLnRhcmdldCk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzZWxlY3RlZCBpcyBjYWxsZWQgd2hlbiBhbiBvcHRpb24gaGFzIGJlZW4gY2xpY2tlZCBvblxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleFxuICAgICAqL1xuICAgIHNlbGVjdGVkKGluZGV4KSB7XG5cbiAgICAgICAgdmFyIGNob2ljZSA9IHRoaXMub3B0aW9uc1tpbmRleF07XG4gICAgICAgIHZhciBkaXNwbGF5ID0gJyc7XG5cbiAgICAgICAgdGhpcy5hdXRvY29tcGxldGUuYXR0cmlidXRlcy5yZWFkKCd3YXQ6c2V0JywgZnVuY3Rpb24oKSB7fSkoXG4gICAgICAgICAgICAodGhpcy5hdXRvY29tcGxldGUuYXR0cmlidXRlcy5yZWFkKCd3YXQ6dmFsdWVGaWVsZCcpKSA/XG4gICAgICAgICAgICBwcm9wZXJ0eSh0aGlzLm9wdGlvbnNbaW5kZXhdLCB0aGlzLmF1dG9jb21wbGV0ZS5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDp2YWx1ZUZpZWxkJykpIDpcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1tpbmRleF0sIHRoaXMuYXV0b2NvbXBsZXRlLmF0dHJpYnV0ZXMucmVhZCgnd2F0Om5hbWUnKSk7XG5cbiAgICAgICAgaWYgKHRoaXMuYXV0b2NvbXBsZXRlLmF0dHJpYnV0ZXMucmVhZCgnd2F0OmxhYmVsRmllbGQnKSkge1xuICAgICAgICAgICAgZGlzcGxheSA9IHByb3BlcnR5KGNob2ljZSwgdGhpcy5hdXRvY29tcGxldGUuYXR0cmlidXRlcy5yZWFkKCd3YXQ6bGFiZWxGaWVsZCcpKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmF1dG9jb21wbGV0ZS5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDp2YWx1ZUZpZWxkJykpIHtcbiAgICAgICAgICAgIGRpc3BsYXkgPSBwcm9wZXJ0eShjaG9pY2UsIHRoaXMuYXV0b2NvbXBsZXRlLmF0dHJpYnV0ZXMucmVhZCgnd2F0OnZhbHVlRmllbGQnKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkaXNwbGF5ID0gY2hvaWNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hdXRvY29tcGxldGUuc2V0KGRpc3BsYXkpO1xuICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZS5jaG9pY2UgPSBjaG9pY2U7XG4gICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlLnRvU2VsZWN0aW9uKCk7XG5cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgdmFyIG9wdGlvbnMgPSB0aGlzLmF1dG9jb21wbGV0ZS52aWV3LmZpbmRCeUlkKCdvcHRpb25zJyk7XG5cbiAgICAgICAgd2hpbGUgKG9wdGlvbnMubGFzdENoaWxkKVxuICAgICAgICAgICAgb3B0aW9ucy5yZW1vdmVDaGlsZChvcHRpb25zLmxhc3RDaGlsZCk7XG5cbiAgICAgICAgb3B0aW9ucy5jbGFzc0xpc3QudG9nZ2xlKENsYXNzLldBVF9WSVNJQkxFKTtcbiAgICAgICAgb3B0aW9ucy5hcHBlbmRDaGlsZCh0aGlzLm9wdGlvbnNWaWV3LnJlbmRlcigpLCB0aGlzKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBTZWFyY2hEZWxlZ2F0ZVxuIiwiaW1wb3J0IHsgVmlldyB9IGZyb20gJ3dtbGpzL2xpYi9ydW50aW1lJztcbmltcG9ydCAqIGFzIENsYXNzIGZyb20gJ3dhdC1jbGFzc2VzJztcbmltcG9ydCBBdXRvY29tcGxldGVEZWxlZ2F0ZSBmcm9tICcuL0F1dG9jb21wbGV0ZURlbGVnYXRlJztcblxuLyoqXG4gKiBTZWxlY3Rpb25EZWxlZ2F0ZSBmb3IgdGhlIHNlYXJjaGluZyBwaGFzZS5cbiAqL1xuY2xhc3MgU2VsZWN0aW9uRGVsZWdhdGUgZXh0ZW5kcyBBdXRvY29tcGxldGVEZWxlZ2F0ZSB7XG5cbiAgICBoYW5kbGVLZXlVcChlKSB7XG5cbiAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMjcpXG4gICAgICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZS50b1Jlc3QoKTtcblxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24oZSkge1xuXG4gICAgICAgIGlmIChlLmtleUNvZGUgIT09IDI3KVxuICAgICAgICAgICAgdGhpcy5hdXRvY29tcGxldGUudG9TZWFyY2goKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHNlbGVjdGVkIGlzIGNhbGxlZCB3aGVuIGFuIG9wdGlvbiBoYXMgYmVlbiBjbGlja2VkIG9uXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4XG4gICAgICovXG4gICAgc2VsZWN0ZWQoaW5kZXgpIHtcblxuICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoJ1NlbGVjdGlvbkRlbGVnYXRlOiBkb2VzIG5vdCBzdXBwb3J0IHNlbGVjdGluZyEnKTtcblxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICB2YXIgb3B0aW9ucyA9IHRoaXMuYXV0b2NvbXBsZXRlLnZpZXcuZmluZEJ5SWQoJ29wdGlvbnMnKTtcblxuICAgICAgICB3aGlsZSAob3B0aW9ucy5sYXN0Q2hpbGQpXG4gICAgICAgICAgICBvcHRpb25zLnJlbW92ZUNoaWxkKG9wdGlvbnMubGFzdENoaWxkKTtcblxuICAgICAgICBvcHRpb25zLmNsYXNzTGlzdC50b2dnbGUoQ2xhc3MuV0FUX1ZJU0lCTEUpO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFNlbGVjdGlvbkRlbGVnYXRlXG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChtYWtlKSB7XG4gIHJldHVybiBtYWtlLm5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiBtYWtlLnJlc29sdmUoQ2xhc3MsICdXQVRfS0lUX0FVVE9DT01QTEVURScpIH0gfSwgW21ha2Uubm9kZSgnaW5wdXQnLCB7IGh0bWw6IHsgJ3R5cGUnOiBcInRleHRcIiwgJ2NsYXNzJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDppbnB1dENsYXNzJyksICdvbmtleWRvd24nOiB0aGlzLmhhbmRsZUtleURvd24uYmluZCh0aGlzKSwgJ29ua2V5dXAnOiB0aGlzLmhhbmRsZUtleVVwLmJpbmQodGhpcyksICdvbmlucHV0JzogdGhpcy5oYW5kbGVJbnB1dC5iaW5kKHRoaXMpLCAncGxhY2Vob2xkZXInOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd2F0OnBsYWNlaG9sZGVyJywgJ1R5cGUgaGVyZSB0byBzZWFyY2gnKSB9LCB3bWw6IHsgJ2lkJzogXCJpbnB1dFwiIH0gfSwgW10pLCBtYWtlLm5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiBtYWtlLnJlc29sdmUoQ2xhc3MsICdXQVRfS0lUX0FVVE9DT01QTEVURV9PUFRJT05TJykgfSwgd21sOiB7ICdpZCc6IFwib3B0aW9uc1wiIH0gfSwgW10pXSk7XG59O1xuXG52YXIgX3dhdENsYXNzZXMgPSByZXF1aXJlKCd3YXQtY2xhc3NlcycpO1xuXG52YXIgQ2xhc3MgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfd2F0Q2xhc3Nlcyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKG9iaikgeyBpZiAob2JqICYmIG9iai5fX2VzTW9kdWxlKSB7IHJldHVybiBvYmo7IH0gZWxzZSB7IHZhciBuZXdPYmogPSB7fTsgaWYgKG9iaiAhPSBudWxsKSB7IGZvciAodmFyIGtleSBpbiBvYmopIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIG5ld09ialtrZXldID0gb2JqW2tleV07IH0gfSBuZXdPYmouZGVmYXVsdCA9IG9iajsgcmV0dXJuIG5ld09iajsgfSB9XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKG1ha2UpIHtcbiAgcmV0dXJuIG1ha2Uubm9kZSgndWwnLCB7IGh0bWw6IHt9IH0sIFttYWtlLiRmb3IobWFrZS5yZXNvbHZlKHRoaXMsICdvcHRpb25zJyksIGZ1bmN0aW9uIGZvcl8xKG9wdGlvbiwgaW5kZXgsIGFycmF5KSB7XG4gICAgcmV0dXJuIFttYWtlLm5vZGUoJ2xpJywgeyBodG1sOiB7ICdjbGFzcyc6IG1ha2UucmVzb2x2ZShDbGFzcywgJ1dBVF9LSVRfQVVUT0NPTVBMRVRFX0lURU1fV1JBUFBFUicpLCAnb25jbGljayc6IHRoaXMuc2VsZWN0ZWQuYmluZCh0aGlzLCBpbmRleCkgfSB9LCBbbWFrZS4kaWYodGhpcy5hdXRvY29tcGxldGUuYXR0cmlidXRlcy5yZWFkKCd3YXQ6b3B0aW9uVGVtcGxhdGUnKSwgZnVuY3Rpb24gaWZfMCgpIHtcbiAgICAgIHJldHVybiBbbWFrZS4kaWYodGhpcy5hdXRvY29tcGxldGUuYXR0cmlidXRlcy5yZWFkKCd3YXQ6dmFsdWVGaWVsZCcpLCBmdW5jdGlvbiBpZl8wKCkge1xuICAgICAgICByZXR1cm4gW3RoaXMuYXV0b2NvbXBsZXRlLmF0dHJpYnV0ZXMucmVhZCgnd2F0Om9wdGlvblRlbXBsYXRlJykuYXBwbHkodGhpcywgW21ha2VdLmNvbmNhdChbKDAsIF9wcm9wZXJ0eVNlZWsyLmRlZmF1bHQpKG9wdGlvbiwgdGhpcy5hdXRvY29tcGxldGUucmVhZCgnd2F0OnZhbHVlRmllbGQnKSksIGluZGV4LCBvcHRpb25dKSldO1xuICAgICAgfS5iaW5kKHRoaXMpLCBmdW5jdGlvbiBlbHNlXzAoKSB7XG4gICAgICAgIHJldHVybiBbdGhpcy5hdXRvY29tcGxldGUuYXR0cmlidXRlcy5yZWFkKCd3YXQ6b3B0aW9uVGVtcGxhdGUnKS5hcHBseSh0aGlzLCBbbWFrZV0uY29uY2F0KFtvcHRpb24sIGluZGV4LCBtYWtlLnJlc29sdmUodGhpcywgJ29wdGlvbnMnKV0pKV07XG4gICAgICB9LmJpbmQodGhpcykpXTtcbiAgICB9LmJpbmQodGhpcyksIGZ1bmN0aW9uIGVsc2VfMCgpIHtcbiAgICAgIHJldHVybiBbbWFrZS4kaWYodGhpcy5hdXRvY29tcGxldGUuYXR0cmlidXRlcy5yZWFkKCd3YXQ6dmFsdWVGaWVsZCcpLCBmdW5jdGlvbiBpZl8wKCkge1xuICAgICAgICByZXR1cm4gWygwLCBfcHJvcGVydHlTZWVrMi5kZWZhdWx0KShvcHRpb24sIHRoaXMuYXV0b2NvbXBsZXRlLmF0dHJpYnV0ZXMucmVhZCgnd2F0OnZhbHVlRmllbGQnKSldO1xuICAgICAgfS5iaW5kKHRoaXMpLCBmdW5jdGlvbiBlbHNlXzAoKSB7XG4gICAgICAgIHJldHVybiBbb3B0aW9uXTtcbiAgICAgIH0uYmluZCh0aGlzKSldO1xuICAgIH0uYmluZCh0aGlzKSldKV07XG4gIH0uYmluZCh0aGlzKSldKTtcbn07XG5cbnZhciBfd2F0Q2xhc3NlcyA9IHJlcXVpcmUoJ3dhdC1jbGFzc2VzJyk7XG5cbnZhciBDbGFzcyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF93YXRDbGFzc2VzKTtcblxudmFyIF9wcm9wZXJ0eVNlZWsgPSByZXF1aXJlKCdwcm9wZXJ0eS1zZWVrJyk7XG5cbnZhciBfcHJvcGVydHlTZWVrMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Byb3BlcnR5U2Vlayk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKG9iaikgeyBpZiAob2JqICYmIG9iai5fX2VzTW9kdWxlKSB7IHJldHVybiBvYmo7IH0gZWxzZSB7IHZhciBuZXdPYmogPSB7fTsgaWYgKG9iaiAhPSBudWxsKSB7IGZvciAodmFyIGtleSBpbiBvYmopIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIG5ld09ialtrZXldID0gb2JqW2tleV07IH0gfSBuZXdPYmouZGVmYXVsdCA9IG9iajsgcmV0dXJuIG5ld09iajsgfSB9XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsImltcG9ydCB7IFZpZXcsIFdpZGdldCB9IGZyb20gJ3dtbGpzL2xpYi9ydW50aW1lJztcbmltcG9ydCBpdGVtIGZyb20gJy4vd21sL2l0ZW0ud21sJztcblxuLyoqXG4gKiBCcmVhZENydW1iXG4gKi9cbmNsYXNzIEJyZWFkQ3J1bWIgZXh0ZW5kcyBXaWRnZXQge1xuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiBWaWV3LnJlbmRlcihpdGVtLCB0aGlzKTtcblxuICAgIH1cblxufVxuZXhwb3J0IGRlZmF1bHQgQnJlYWRDcnVtYlxuXG4iLCJpbXBvcnQgeyBWaWV3LCBXaWRnZXQgfSBmcm9tICd3bWxqcy9saWIvcnVudGltZSc7XG5pbXBvcnQgQnJlYWRDcnVtYiBmcm9tICcuL0JyZWFkQ3J1bWInO1xuaW1wb3J0IG1lbnUgZnJvbSAnLi93bWwvbWVudS53bWwnO1xuXG4vKipcbiAqIEJyZWFkQ3J1bWJNZW51XG4gKi9cbmNsYXNzIEJyZWFkQ3J1bWJNZW51IGV4dGVuZHMgV2lkZ2V0IHtcblxuICAgIGNvbnN0cnVjdG9yKGF0dHJzLCBjaGlsZHJlbikge1xuXG4gICAgICAgIHN1cGVyKGF0dHJzLCBjaGlsZHJlbik7XG5cbiAgICAgICAgdGhpcy52aWV3ID0gbmV3IFZpZXcobWVudSwgdGhpcyk7XG5cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMudmlldy5yZW5kZXIoKTtcblxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQnJlYWRDcnVtYk1lbnVcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKG1ha2UpIHtcbiAgcmV0dXJuIG1ha2Uubm9kZSgnbGknLCB7IGh0bWw6IHt9IH0sIFttYWtlLiRpZih0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd2F0OmFjdGl2ZScsIGZhbHNlKSwgZnVuY3Rpb24gaWZfMCgpIHtcbiAgICByZXR1cm4gW21ha2UucmVzb2x2ZSh0aGlzLCAnY2hpbGRyZW4nKV07XG4gIH0uYmluZCh0aGlzKSwgZnVuY3Rpb24gZWxzZV8wKCkge1xuICAgIHJldHVybiBbbWFrZS5ub2RlKCdhJywgeyBodG1sOiB7ICdocmVmJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDpocmVmJywgJyMnKSB9IH0sIFttYWtlLnJlc29sdmUodGhpcywgJ2NoaWxkcmVuJyldKV07XG4gIH0uYmluZCh0aGlzKSldKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKG1ha2UpIHtcbiAgcmV0dXJuIG1ha2Uubm9kZSgnb2wnLCB7IGh0bWw6IHsgJ2NsYXNzJzogXCJicmVhZGNydW1iXCIgfSB9LCBbbWFrZS5yZXNvbHZlKHRoaXMsICdjaGlsZHJlbicpXSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCJpbXBvcnQgeyBWaWV3LCBXaWRnZXQgfSBmcm9tICd3bWxqcy9saWIvcnVudGltZSc7XG5pbXBvcnQgYnV0dG9uIGZyb20gJy4vd21sL2J1dHRvbi53bWwnO1xuXG4vKipcbiAqIEJ1dHRvbiBhIGJvb3RzdHJhcCBzdHlsZWQgYnV0dG9uLlxuICovXG5jbGFzcyBCdXR0b24gZXh0ZW5kcyBXaWRnZXQge1xuXG4gICAgY29uc3RydWN0b3IoYXR0cnMsIGNoaWxkcmVuKSB7XG5cbiAgICAgICAgc3VwZXIoYXR0cnMsIGNoaWxkcmVuKTtcblxuICAgICAgICB0aGlzLnZpZXcgPSBuZXcgVmlldyhidXR0b24sIHRoaXMpO1xuXG4gICAgfVxuXG4gICAgZ2V0Q2xhc3MoKSB7XG5cbiAgICAgICAgdmFyIHZhcmlhbnQgPSB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd2F0OnZhcmlhbnQnLCAnZGVmYXVsdCcpO1xuICAgICAgICB2YXIgY2xzID0gdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDpjbGFzcycsICcnKTtcbiAgICAgICAgcmV0dXJuIGBidG4gYnRuLSR7dmFyaWFudH0gJHtjbHN9YC50cmltKCk7XG5cbiAgICB9XG5cbiAgICBjbGlja2VkKGUpIHtcblxuICAgICAgICB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd2F0Om9uQ2xpY2snLCBmdW5jdGlvbigpIHt9KShlLnRhcmdldC5uYW1lLCB0aGlzLCBlKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGRpc2FibGUgdGhpcyBidXR0b24uXG4gICAgICovXG4gICAgZGlzYWJsZSgpIHtcblxuICAgICAgICB0aGlzLnZpZXcuZmluZEJ5SWQoJ3Jvb3QnKS5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBlbmFibGUgdGhpcyBidXR0b24uXG4gICAgICovXG4gICAgZW5hYmxlKCkge1xuXG4gICAgICAgIHRoaXMudmlldy5maW5kQnlJZCgncm9vdCcpLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcblxuICAgIH1cblxuICAgIG9uUmVuZGVyZWQoKSB7XG5cbiAgICAgICAgaWYodGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDpkaXNhYmxlZCcpKVxuICAgICAgICAgICAgdGhpcy52aWV3LmZpbmRCeUlkKCdyb290Jykuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiB0aGlzLnZpZXcucmVuZGVyKCk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQnV0dG9uXG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChtYWtlKSB7XG4gIHJldHVybiBtYWtlLm5vZGUoJ2J1dHRvbicsIHsgaHRtbDogeyAnbmFtZSc6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3YXQ6bmFtZScpLCAnY2xhc3MnOiB0aGlzLmdldENsYXNzKCksICdvbmNsaWNrJzogdGhpcy5jbGlja2VkLmJpbmQodGhpcykgfSB9LCBbdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDp0ZXh0JyksIG1ha2UucmVzb2x2ZSh0aGlzLCAnY2hpbGRyZW4nKV0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiaW1wb3J0IHsgVmlldywgV2lkZ2V0IH0gZnJvbSAnd21sanMvbGliL3J1bnRpbWUnO1xuaW1wb3J0IGxheW91dCBmcm9tICcuL3dtbC9jYXJkLndtbCc7XG5cblxuLyoqXG4gKiBDYXJkXG4gKi9cbmNsYXNzIENhcmQgZXh0ZW5kcyBXaWRnZXQge1xuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiBWaWV3LnJlbmRlcihsYXlvdXQsIHRoaXMpO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IENhcmRcbiIsImltcG9ydCB7IFZpZXcsIFdpZGdldCB9IGZyb20gJ3dtbGpzL2xpYi9ydW50aW1lJztcbmltcG9ydCBsYXlvdXQgZnJvbSAnLi93bWwvY2FyZF9ibG9jay53bWwnO1xuXG5cbi8qKlxuICogQ2FyZEJsb2NrXG4gKi9cbmNsYXNzIENhcmRCbG9jayBleHRlbmRzIFdpZGdldCB7XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIFZpZXcucmVuZGVyKGxheW91dCwgdGhpcyk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2FyZEJsb2NrXG4iLCJpbXBvcnQgeyBWaWV3LCBXaWRnZXQgfSBmcm9tICd3bWxqcy9saWIvcnVudGltZSc7XG5pbXBvcnQgbGF5b3V0IGZyb20gJy4vd21sL2NhcmRfaW1hZ2Uud21sJztcblxuXG4vKipcbiAqIENhcmRJbWFnZVxuICovXG5jbGFzcyBDYXJkSW1hZ2UgZXh0ZW5kcyBXaWRnZXQge1xuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiBWaWV3LnJlbmRlcihsYXlvdXQsIHRoaXMpO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IENhcmRJbWFnZVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAobWFrZSkge1xuICByZXR1cm4gbWFrZS5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogXCJjYXJkXCIgfSB9LCBbbWFrZS5yZXNvbHZlKHRoaXMsICdjaGlsZHJlbicpXSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChtYWtlKSB7XG4gIHJldHVybiBtYWtlLm5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiBcImNhcmQtYmxvY2tcIiB9IH0sIFttYWtlLnJlc29sdmUodGhpcywgJ2NoaWxkcmVuJyldKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKG1ha2UpIHtcbiAgcmV0dXJuIG1ha2Uubm9kZSgnaW1nJywgeyBodG1sOiB7ICdzcmMnOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd2F0OnNyYycpLCAnYWx0JzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDphbHQnKSB9IH0sIFtdKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIi8qIGpzaGludCBpZ25vcmU6c3RhcnQgKi9cbmV4cG9ydCBCcmVhZENydW1iTWVudSBmcm9tICcuL2JyZWFkY3J1bWJzL0JyZWFkQ3J1bWJNZW51JztcbmV4cG9ydCBCcmVhZENydW1iIGZyb20gJy4vYnJlYWRjcnVtYnMvQnJlYWRDcnVtYic7XG5leHBvcnQgQnV0dG9uIGZyb20gJy4vYnV0dG9uL0J1dHRvbic7XG5leHBvcnQgTW9kYWwgZnJvbSAnLi9tb2RhbC9Nb2RhbCc7XG5leHBvcnQgTW9kYWxIZWFkZXIgZnJvbSAnLi9tb2RhbC9Nb2RhbEhlYWRlcic7XG5leHBvcnQgTW9kYWxCb2R5IGZyb20gJy4vbW9kYWwvTW9kYWxCb2R5JztcbmV4cG9ydCBNb2RhbEZvb3RlciBmcm9tICcuL21vZGFsL01vZGFsRm9vdGVyJztcbmV4cG9ydCBDb250YWluZXIgZnJvbSAnLi9Db250YWluZXInO1xuZXhwb3J0IENvbHVtbiBmcm9tICcuL0NvbHVtbic7XG5leHBvcnQgUm93IGZyb20gJy4vUm93JztcbmV4cG9ydCBUYWJsZSBmcm9tICcuL1RhYmxlJztcbmV4cG9ydCBBdXRvY29tcGxldGUgZnJvbSAnLi9hdXRvY29tcGxldGUvQXV0b2NvbXBsZXRlJztcbmV4cG9ydCBJbnB1dCBmcm9tICcuL2lucHV0L0lucHV0JztcbmV4cG9ydCBTd2l0Y2ggZnJvbSAnLi9zd2l0Y2gvU3dpdGNoJztcbmV4cG9ydCBKdW1ib3Ryb24gZnJvbSAnLi9qdW1ib3Ryb24vSnVtYm90cm9uJztcbmV4cG9ydCBXZWxsIGZyb20gJy4vd2VsbC9XZWxsJztcbmV4cG9ydCBDYXJkIGZyb20nLi9jYXJkL0NhcmQnO1xuZXhwb3J0IENhcmRJbWFnZSBmcm9tICcuL2NhcmQvQ2FyZEltYWdlJztcbmV4cG9ydCBDYXJkQmxvY2sgZnJvbSAnLi9jYXJkL0NhcmRCbG9jayc7XG4vKiBqc2hpbnQgaWdub3JlOmVuZCAqL1xuIiwiaW1wb3J0IHsgVmlldywgV2lkZ2V0IH0gZnJvbSAnd21sanMvbGliL3J1bnRpbWUnO1xuaW1wb3J0IGxheW91dCBmcm9tICcuL3dtbC9sYXlvdXQud21sJztcblxuY29uc3QgSU5QVVRfU1VDQ0VTUyA9ICdoYXMtc3VjY2VzJztcbmNvbnN0IElOUFVUX0VSUk9SID0gJ2hhcy1lcnJvcic7XG5jb25zdCBJTlBVVF9XQVJOSU5HID0gJ2hhcy13YXJuaW5nJztcblxuLyoqXG4gKiBJbnB1dFxuICovXG5jbGFzcyBJbnB1dCBleHRlbmRzIFdpZGdldCB7XG5cbiAgICBjb25zdHJ1Y3RvcihhdHRycywgY2hpbGRyZW4pIHtcblxuICAgICAgICBzdXBlcihhdHRycywgY2hpbGRyZW4pO1xuICAgICAgICB0aGlzLnZpZXcgPSBuZXcgVmlldyhsYXlvdXQsICB0aGlzKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGdldENsYXNzXG4gICAgICovXG4gICAgZ2V0Q2xhc3MoKSB7XG5cbiAgICAgICAgdmFyIGMgPSBgZm9ybS1ncm91cCAke3RoaXMuYXR0cmlidXRlcy5yZWFkKCd3YXQ6Y2xhc3MnKX1gO1xuXG4gICAgICAgIGlmICghdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDptZXNzYWdlJykpXG4gICAgICAgICAgICByZXR1cm4gYztcblxuICAgICAgICByZXR1cm4gYCR7Y30gaGFzLWVycm9yYDtcblxuICAgIH1cblxuICAgIGlucHV0KGUpIHtcblxuICAgICAgICB2YXIgc2V0ID0gdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDpzZXQnLCBmdW5jdGlvbigpIHt9KTtcblxuICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgIHNldChlLnRhcmdldC5uYW1lLCBlLnRhcmdldC52YWx1ZSwgdGhpcyk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzZXRNZXNzYWdlIHNldHMgdGhlIG1lc3NhZ2UgZm9yIHRoZSBtZXNzYWdlIHBvcnRpb24gb2ZcbiAgICAgKiB0aGlzIGlucHV0LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtc2dcbiAgICAgKi9cbiAgICBzZXRNZXNzYWdlKG1zZyA9ICcnKSB7XG5cbiAgICAgICAgdmFyIG1lc3NhZ2UgPSB0aGlzLnZpZXcuZmluZEJ5SWQoJ21lc3NhZ2UnKTtcbnZhciBub2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUobXNnKTtcblxuICAgICAgICBpZiAobWVzc2FnZS5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICBtZXNzYWdlLnJlcGxhY2VDaGlsZChtZXNzYWdlLmZpcnN0Q2hpbGQsIG5vZGUgICk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgbWVzc2FnZS5hcHBlbmRDaGlsZChub2RlKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogaXNGaWxsZWQgdGVsbHMgaWYgdGhpcyBJbnB1dCBoYXMgYSBmaWxsZWQgdmFsdWUuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgaXNGaWxsZWQoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMudmlldy5maW5kQnlJZCgnaW5wdXQnKS52YWx1ZTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGlzUmVxdWlyZWQgdGVsbHMgaWYgdGhlIElucHV0IHdhcyByZXF1aXJlZC5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBpc1JlcXVpcmVkKCkge1xuXG4gICAgICAgIGlmICh0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd2F0OnJlcXVpcmVkJykpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGlzVmFsaWQgcXVlcmllcyB3aGV0aGVyIHRoZSBJbnB1dCBoYXMgYmVlbiBpbnZhbGlkYXRlZFxuICAgICAqIG9yIG5vdC5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBpc1ZhbGlkKCkge1xuXG4gICAgICAgIHJldHVybiAodGhpcy52aWV3LmZpbmRCeUlkKCdyb290JykuY2xhc3NOYW1lLnNwbGl0KCcgJykuaW5kZXhPZihJTlBVVF9FUlJPUikgPT09IC0xKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGludmFsaWRhdGUgdGhpcyBJbnB1dCB3aXRoIGFuIG9wdGlvbmFsIG1lc3NhZ2UuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2VcbiAgICAgKiBAcmV0dXJucyB7SW5wdXR9XG4gICAgICovXG4gICAgaW52YWxpZGF0ZShtZXNzYWdlID0gJycpIHtcblxuICAgICAgICBpZiAobWVzc2FnZSlcbiAgICAgICAgICAgIHRoaXMuc2V0TWVzc2FnZShtZXNzYWdlKTtcblxuICAgICAgICB0aGlzLnZpZXcuZmluZEJ5SWQoJ3Jvb3QnKS5jbGFzc0xpc3QucmVtb3ZlKElOUFVUX0VSUk9SKTtcbiAgICAgICAgdGhpcy52aWV3LmZpbmRCeUlkKCdyb290JykuY2xhc3NMaXN0LmFkZChJTlBVVF9FUlJPUik7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiB2YWxpZGF0ZSB0aGlzIGlucHV0IHdpdGggYW4gb3B0aW9uYWwgbWVzc3NhZ2UuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2VcbiAgICAgKiBAcmV0dXJucyB7SW5wdXR9XG4gICAgICovXG4gICAgdmFsaWRhdGUobWVzc2FnZSA9ICcnKSB7XG5cbiAgICAgICAgaWYgKG1lc3NhZ2UpXG4gICAgICAgICAgICB0aGlzLnNldE1lc3NhZ2UobWVzc2FnZSk7XG5cbiAgICAgICAgdGhpcy52aWV3LmZpbmRCeUlkKCdyb290JykuY2xhc3NMaXN0LnJlbW92ZShJTlBVVF9TVUNDRVNTKTtcbiAgICAgICAgdGhpcy52aWV3LmZpbmRCeUlkKCdyb290JykuY2xhc3NMaXN0LmFkZChJTlBVVF9TVUNDRVNTKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHdhcm4gdGhpcyBpbnB1dCB3aXRoIGFuIG9wdGlvbmFsIG1lc3NhZ2UuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2VcbiAgICAgKiBAcmV0dXJucyB7SW5wdXR9XG4gICAgICovXG4gICAgd2FybihtZXNzYWdlID0gJycpIHtcblxuICAgICAgICBpZiAobWVzc2FnZSlcbiAgICAgICAgICAgIHRoaXMuc2V0TWVzc2FnZShtZXNzYWdlKTtcblxuICAgICAgICB0aGlzLnZpZXcuZmluZEJ5SWQoJ3Jvb3QnKS5jbGFzc0xpc3QucmVtb3ZlKElOUFVUX1dBUk5JTkcpO1xuICAgICAgICB0aGlzLnZpZXcuZmluZEJ5SWQoJ3Jvb3QnKS5jbGFzc0xpc3QuYWRkKElOUFVUX1dBUk5JTkcpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmVzZXQgdGhpcyBpbnB1dCB0byBhIGNsZWFuIHN0YXRlLlxuICAgICAqIFJlbW92ZXMgbWVzc2FnZXMsIHZhbGlkYXRpb24gc3RhdGUgZXRjLlxuICAgICAqIEByZXR1cm4ge0lucHV0fVxuICAgICAqL1xuICAgIHJlc2V0KCkge1xuXG4gICAgICAgIHZhciByb290ID0gdGhpcy52aWV3LmZpbmRCeUlkKCdyb290Jyk7XG5cbiAgICAgICAgcm9vdC5jbGFzc0xpc3QucmVtb3ZlKElOUFVUX1NVQ0NFU1MpO1xuICAgICAgICByb290LmNsYXNzTGlzdC5yZW1vdmUoSU5QVVRfRVJST1IpO1xuICAgICAgICByb290LmNsYXNzTGlzdC5yZW1vdmUoSU5QVVRfV0FSTklORyk7XG5cbiAgICAgICAgdGhpcy52aWV3LmZpbmRCeUlkKCdtZXNzYWdlJykuaW5uZXJIVE1MID0gJyc7XG5cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMudmlldy5yZW5kZXIoKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBJbnB1dFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAobWFrZSkge1xuICByZXR1cm4gbWFrZS5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogdGhpcy5nZXRDbGFzcygpIH0gfSwgW21ha2Uubm9kZSgnbGFiZWwnLCB7IGh0bWw6IHsgJ2Zvcic6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3YXQ6aWQnKSwgJ2NsYXNzJzogXCJjb250cm9sLWxhYmVsXCIgfSB9LCBbdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDpsYWJlbCcpXSksIG1ha2UuJGlmKHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3YXQ6dHlwZScsICd0ZXh0JykgIT09ICd0ZXh0YXJlYScsIGZ1bmN0aW9uIGlmXzAoKSB7XG4gICAgcmV0dXJuIFttYWtlLm5vZGUoJ2lucHV0JywgeyBodG1sOiB7ICdpZCc6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3YXQ6aWQnKSwgJ25hbWUnOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd2F0Om5hbWUnKSwgJ3R5cGUnOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd2F0OnR5cGUnLCAndGV4dCcpLCAnb25pbnB1dCc6IHRoaXMuaW5wdXQuYmluZCh0aGlzKSwgJ3ZhbHVlJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDp2YWx1ZScpLCAnY2xhc3MnOiBcImZvcm0tY29udHJvbFwiIH0sIHdtbDogeyAnaWQnOiBcImlucHV0XCIgfSB9LCBbXSldO1xuICB9LmJpbmQodGhpcyksIGZ1bmN0aW9uIGVsc2VfMCgpIHtcbiAgICByZXR1cm4gW21ha2Uubm9kZSgndGV4dGFyZWEnLCB7IGh0bWw6IHsgJ2lkJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDppZCcpLCAnY2xhc3MnOiBcImZvcm0tY29udHJvbFwiLCAnbmFtZSc6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3YXQ6bmFtZScpLCAndHlwZSc6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3YXQ6dHlwZScsICd0ZXh0JyksICdvbmlucHV0JzogdGhpcy5pbnB1dC5iaW5kKHRoaXMpLCAndmFsdWUnOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd2F0OnZhbHVlJyksICdyb3dzJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDpyb3dzJykgfSB9LCBbXSldO1xuICB9LmJpbmQodGhpcykpLCBtYWtlLm5vZGUoJ3NwYW4nLCB7IGh0bWw6IHsgJ2NsYXNzJzogXCJoZWxwLWJsb2NrXCIgfSwgd21sOiB7ICdpZCc6IFwibWVzc2FnZVwiIH0gfSwgW3RoaXMuYXR0cmlidXRlcy5yZWFkKCdtZXNzYWdlJywgJycpXSldKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsImltcG9ydCB7IFZpZXcsIFdpZGdldCB9IGZyb20gJ3dtbGpzL2xpYi9ydW50aW1lJztcbmltcG9ydCBsYXlvdXQgZnJvbSAnLi93bWwvbGF5b3V0LndtbCc7XG5cbi8qKlxuICogSnVtYm90cm9uXG4gKi9cbmNsYXNzIEp1bWJvdHJvbiBleHRlbmRzIFdpZGdldCB7XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIFZpZXcucmVuZGVyKGxheW91dCwgdGhpcyk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgSnVtYm90cm9uXG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChtYWtlKSB7XG4gIHJldHVybiBtYWtlLm5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiBcImp1bWJvdHJvblwiIH0gfSwgW21ha2UucmVzb2x2ZSh0aGlzLCAnY2hpbGRyZW4nKV0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiaW1wb3J0IHsgVmlldywgV2lkZ2V0IH0gZnJvbSAnd21sanMvbGliL3J1bnRpbWUnO1xuaW1wb3J0IG1vZGFsIGZyb20gJy4vd21sL21vZGFsLndtbCc7XG5cbi8qKlxuICogTW9kYWxcbiAqIE5PVEU6IFVzaW5nIHRoaXMgcmVxdWlyZXMgalF1ZXJ5IGFuZCBib29zdHJhcCBwbHVnaW4uXG4gKi9cbmNsYXNzIE1vZGFsIGV4dGVuZHMgV2lkZ2V0IHtcblxuICAgIGNvbnN0cnVjdG9yKGF0dHJzLCBjaGlsZHJlbikge1xuXG4gICAgICAgIHN1cGVyKGF0dHJzLCBjaGlsZHJlbik7XG5cbiAgICAgICAgdGhpcy52aWV3ID0gbmV3IFZpZXcobW9kYWwsIHRoaXMpO1xuICAgICAgICB0aGlzLm1vZGFsID0gbnVsbDtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHB1dCBjb250ZW50IG9uIHRvIHRoaXMgbW9kYWwuXG4gICAgICogQHBhcmFtIHtSZW5kZXJhYmxlfSByXG4gICAgICovXG4gICAgcHV0KHIpIHtcblxuICAgICAgICB2YXIgcm9vdCA9IHRoaXMudmlldy5maW5kQnlJZCgncm9vdCcpO1xuXG4gICAgICAgIHdoaWxlIChyb290Lmxhc3RDaGlsZClcbiAgICAgICAgICAgIHJvb3QucmVtb3ZlQ2hpbGQocm9vdC5sYXN0Q2hpbGQpO1xuXG4gICAgICAgIHJvb3QuYXBwZW5kQ2hpbGQoci5yZW5kZXIoKSk7XG5cbiAgICAgICAgdGhpcy5tb2RhbC5tb2RhbCh0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd2F0Om9wdGlvbnMnLCB7XG4gICAgICAgICAgICBiYWNrZHJvcDogZmFsc2UsXG4gICAgICAgICAgICBrZXlib2FyZDogdHJ1ZSxcbiAgICAgICAgICAgIGZhZGU6IHRydWUsXG4gICAgICAgICAgICBzaG93OiB0cnVlXG4gICAgICAgIH0pKTtcblxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICB2YXIgcmV0ID0gdGhpcy52aWV3LnJlbmRlcigpO1xuXG4gICAgICAgIHRoaXMubW9kYWwgPSBqUXVlcnkocmV0KTtcbiAgICAgICAgcmV0dXJuIHJldDtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBNb2RhbFxuIiwiaW1wb3J0IHsgVmlldywgV2lkZ2V0IH0gZnJvbSAnd21sanMvbGliL3J1bnRpbWUnO1xuaW1wb3J0IG1vZGFsX2JvZHkgZnJvbSAnLi93bWwvbW9kYWxfYm9keS53bWwnO1xuXG4vKipcbiAqIE1vZGFsQm9keVxuICovXG5jbGFzcyBNb2RhbEJvZHkgZXh0ZW5kcyBXaWRnZXQge1xuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAobmV3IFZpZXcobW9kYWxfYm9keSwgdGhpcykpLnJlbmRlcigpO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IE1vZGFsQm9keVxuIiwiaW1wb3J0IHsgVmlldywgV2lkZ2V0IH0gZnJvbSAnd21sanMvbGliL3J1bnRpbWUnO1xuaW1wb3J0IGZvb3RlciBmcm9tICcuL3dtbC9tb2RhbF9mb290ZXIud21sJztcblxuLyoqXG4gKiBNb2RhbEZvb3RlclxuICovXG5jbGFzcyBNb2RhbEZvb3RlciBleHRlbmRzIFdpZGdldCB7XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChuZXcgVmlldyhmb290ZXIsIHRoaXMpKS5yZW5kZXIoKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBNb2RhbEZvb3RlclxuIiwiaW1wb3J0IHsgVmlldywgV2lkZ2V0IH0gZnJvbSAnd21sanMvbGliL3J1bnRpbWUnO1xuaW1wb3J0IGhlYWRlciBmcm9tICcuL3dtbC9tb2RhbF9oZWFkZXIud21sJztcblxuLyoqXG4gKiBNb2RhbEhlYWRlclxuICovXG5jbGFzcyBNb2RhbEhlYWRlciBleHRlbmRzIFdpZGdldCB7XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIChuZXcgVmlldyhoZWFkZXIsIHRoaXMpKS5yZW5kZXIoKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBNb2RhbEhlYWRlclxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAobWFrZSkge1xuICByZXR1cm4gbWFrZS5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDpjbGFzcycsICdtb2RhbCBmYWRlJyksICd0YWJpbmRleCc6IFwiLTFcIiwgJ3JvbGUnOiBcImRpYWxvZ1wiIH0gfSwgW21ha2Uubm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6ICdtb2RhbC1kaWFsb2cgJyArIHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3YXQ6c2l6ZUNsYXNzJywgJ21vZGFsLW1kJyksICdyb2xlJzogXCJkb2N1bWVudFwiIH0gfSwgW21ha2Uubm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6IFwibW9kYWwtY29udGVudFwiIH0sIHdtbDogeyAnaWQnOiBcInJvb3RcIiB9IH0sIFttYWtlLnJlc29sdmUodGhpcywgJ2NoaWxkcmVuJyldKV0pXSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChtYWtlKSB7XG4gIHJldHVybiBtYWtlLm5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiBcIm1vZGFsLWJvZHlcIiB9IH0sIFttYWtlLnJlc29sdmUodGhpcywgJ2NoaWxkcmVuJyldKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKG1ha2UpIHtcbiAgcmV0dXJuIG1ha2Uubm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6IFwibW9kYWwtZm9vdGVyXCIgfSB9LCBbbWFrZS5yZXNvbHZlKHRoaXMsICdjaGlsZHJlbicpXSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChtYWtlKSB7XG4gIHJldHVybiBtYWtlLm5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiBcIm1vZGFsLWhlYWRlclwiIH0gfSwgW21ha2Uubm9kZSgnYnV0dG9uJywgeyBodG1sOiB7ICd0eXBlJzogXCJidXR0b25cIiwgJ2NsYXNzJzogXCJjbG9zZVwiLCAnZGF0YS1kaXNtaXNzJzogXCJtb2RhbFwiLCAnYXJpYS1sYWJlbCc6IFwiQ2xvc2VcIiB9IH0sIFttYWtlLm5vZGUoJ3NwYW4nLCB7IGh0bWw6IHsgJ2FyaWEtaGlkZGVuJzogXCJ0cnVlXCIgfSB9LCBbbWFrZS50ZXh0KCfDlycpXSldKSwgbWFrZS5yZXNvbHZlKHRoaXMsICdjaGlsZHJlbicpXSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCJpbXBvcnQgeyBWaWV3LCBXaWRnZXQgfSBmcm9tICd3bWxqcy9saWIvcnVudGltZSc7XG5pbXBvcnQgbGF5b3V0IGZyb20gJy4vd21sL2xheW91dC53bWwnO1xuXG4vKipcbiAqIFN3aXRjaFxuICovXG5jbGFzcyBTd2l0Y2ggZXh0ZW5kcyBXaWRnZXQge1xuXG4gICAgY29uc3RydWN0b3IoYXR0cnMsIGNoaWxkcmVuKSB7XG5cbiAgICAgICAgc3VwZXIoYXR0cnMsIGNoaWxkcmVuKTtcblxuICAgICAgICB0aGlzLnZpZXcgPSBuZXcgVmlldyhsYXlvdXQsIHRoaXMpO1xuXG4gICAgfVxuXG4gICAgY2hhbmdlZChlKSB7XG5cbiAgICAgICAgY29uc29sZS5sb2coZSk7XG5cbiAgICB9XG5cbiAgICBjYWxjdWxhdGVWYWx1ZSgpIHtcblxuICAgICAgICB2YXIgb25WYWx1ZSA9IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3YXQ6b25WYWx1ZScpO1xuXG4gICAgICAgIGlmKChvblZhbHVlID09PSB1bmRlZmluZWQpIHx8IChvblZhbHVlID09PSBudWxsKSlcbiAgICAgICAgICAgcmV0dXJuIHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3YXQ6dmFsdWUnKTtcblxuICAgICAgICBpZih0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd2F0OnZhbHVlJykgPT09IG9uVmFsdWUpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy52aWV3LnJlbmRlcigpO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFN3aXRjaFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAobWFrZSkge1xuICByZXR1cm4gbWFrZS5ub2RlKCdsYWJlbCcsIHsgaHRtbDogeyAnY2xhc3MnOiBtYWtlLnJlc29sdmUoQ2xhc3MsICdXQVRfQ09NUE9ORU5UU19TV0lUQ0gnKSB9IH0sIFttYWtlLm5vZGUoJ2lucHV0JywgeyBodG1sOiB7ICd0eXBlJzogXCJjaGVja2JveFwiLCAnbmFtZSc6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3YXQ6bmFtZScpLCAndmFsdWUnOiB0aGlzLmNhbGN1bGF0ZVZhbHVlKCksICdvbmNoYW5nZSc6IHRoaXMuY2hhbmdlZC5iaW5kKHRoaXMpIH0gfSwgW10pLCBtYWtlLm5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiBtYWtlLnJlc29sdmUoQ2xhc3MsICdXQVRfQ09NUE9ORU5UU19TV0lUQ0hfU0xJREVSJykgfSB9LCBbXSldKTtcbn07XG5cbnZhciBfd2F0Q2xhc3NlcyA9IHJlcXVpcmUoJ3dhdC1jbGFzc2VzJyk7XG5cbnZhciBDbGFzcyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF93YXRDbGFzc2VzKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQob2JqKSB7IGlmIChvYmogJiYgb2JqLl9fZXNNb2R1bGUpIHsgcmV0dXJuIG9iajsgfSBlbHNlIHsgdmFyIG5ld09iaiA9IHt9OyBpZiAob2JqICE9IG51bGwpIHsgZm9yICh2YXIga2V5IGluIG9iaikgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkgbmV3T2JqW2tleV0gPSBvYmpba2V5XTsgfSB9IG5ld09iai5kZWZhdWx0ID0gb2JqOyByZXR1cm4gbmV3T2JqOyB9IH1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiaW1wb3J0IHsgVmlldywgV2lkZ2V0IH0gZnJvbSAnd21sanMvbGliL3J1bnRpbWUnO1xuaW1wb3J0IGxheW91dCBmcm9tICcuL3dtbC9sYXlvdXQud21sJztcblxuLyoqXG4gKiBXZWxsXG4gKi9cbmNsYXNzIFdlbGwgZXh0ZW5kcyBXaWRnZXQge1xuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiBWaWV3LnJlbmRlcihsYXlvdXQsIHRoaXMpO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFdlbGxcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKG1ha2UpIHtcbiAgcmV0dXJuIG1ha2Uubm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6IFwid2VsbFwiIH0gfSwgW21ha2UucmVzb2x2ZSh0aGlzLCAnY2hpbGRyZW4nKV0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAobWFrZSkge1xuICByZXR1cm4gbWFrZS5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogbWFrZS5yZXNvbHZlKHRoaXMsICdjbGFzc05hbWUnKSB9IH0sIFttYWtlLnJlc29sdmUodGhpcywgJ2NoaWxkcmVuJyldKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKG1ha2UpIHtcbiAgcmV0dXJuIG1ha2Uubm9kZSgnc2VjdGlvbicsIHsgaHRtbDogeyAnY2xhc3MnOiBtYWtlLnJlc29sdmUodGhpcywgJ2NsYXNzTmFtZScpIH0gfSwgW21ha2UucmVzb2x2ZSh0aGlzLCAnY2hpbGRyZW4nKV0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAobWFrZSkge1xuICByZXR1cm4gbWFrZS5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogXCJyb3dcIiB9IH0sIFttYWtlLnJlc29sdmUodGhpcywgJ2NoaWxkcmVuJyldKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsImltcG9ydCB7IFZpZXcsIFdpZGdldCB9IGZyb20gJ3dtbGpzL2xpYi9ydW50aW1lJztcbmltcG9ydCBhY2NvdW50X2FyZWEgZnJvbSAnLi93bWwvYWNjb3VudF9hcmVhLndtbCc7XG5cbi8qKlxuICogQWNjb3VudEFyZWFcbiAqL1xuY2xhc3MgQWNjb3VudEFyZWEgZXh0ZW5kcyBXaWRnZXQge1xuXG4gICAgdG9nZ2xlKCkge1xuXG5cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIFZpZXcucmVuZGVyKGFjY291bnRfYXJlYSwgdGhpcyk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQWNjb3VudEFyZWFcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKG1ha2UpIHtcbiAgcmV0dXJuIG1ha2Uubm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6IG1ha2UucmVzb2x2ZShDbGFzcywgJ0xBWU9VVF9BQ0NPVU5UX0FSRUEnKSB9LCB3bWw6IHsgJ2lkJzogXCJyb290XCIgfSB9LCBbbWFrZS5ub2RlKCdidXR0b24nLCB7IGh0bWw6IHsgJ29uY2xpY2snOiB0aGlzLnRvZ2dsZS5iaW5kKHRoaXMpIH0gfSwgW21ha2Uubm9kZSgnc3BhbicsIHsgaHRtbDogeyAnY2xhc3MnOiBtYWtlLnJlc29sdmUoQ2xhc3MsICdMQVlPVVRfQUNDT1VOVF9BUkVBX1RJVExFJykgfSB9LCBbdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDp0aXRsZScpXSldKSwgbWFrZS5yZXNvbHZlKHRoaXMsICdjaGlsZHJlbicpXSk7XG59O1xuXG52YXIgX3dhdENsYXNzZXMgPSByZXF1aXJlKCd3YXQtY2xhc3NlcycpO1xuXG52YXIgQ2xhc3MgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfd2F0Q2xhc3Nlcyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKG9iaikgeyBpZiAob2JqICYmIG9iai5fX2VzTW9kdWxlKSB7IHJldHVybiBvYmo7IH0gZWxzZSB7IHZhciBuZXdPYmogPSB7fTsgaWYgKG9iaiAhPSBudWxsKSB7IGZvciAodmFyIGtleSBpbiBvYmopIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIG5ld09ialtrZXldID0gb2JqW2tleV07IH0gfSBuZXdPYmouZGVmYXVsdCA9IG9iajsgcmV0dXJuIG5ld09iajsgfSB9XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsImltcG9ydCB7IFZpZXcsIFdpZGdldCB9IGZyb20gJ3dtbGpzL2xpYi9ydW50aW1lJztcbmltcG9ydCBhY3Rpb25fYXJlYSBmcm9tICcuL3dtbC9hY3Rpb25fYXJlYS53bWwnO1xuXG4vKipcbiAqIEFjdGlvbkFyZWFcbiAqL1xuY2xhc3MgQWN0aW9uQXJlYSBleHRlbmRzIFdpZGdldCB7XG5cbiAgICBjb25zdHJ1Y3RvcihhdHRycywgY2hpbGRyZW4pIHtcblxuICAgICAgICBzdXBlcihhdHRycywgY2hpbGRyZW4pO1xuXG4gICAgICAgIHRoaXMudmlldyA9IG5ldyBWaWV3KGFjdGlvbl9hcmVhLCB0aGlzKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHNldENvbnRlbnQgcmVwbGFjZXMgdGhlIGNvbnRlbnQgb2YgdGhpcyB2aWV3LlxuICAgICAqIEBwYXJhbSB7UmVuZGVyYWJsZX0gclxuICAgICAqL1xuICAgIHNldENvbnRlbnQocikge1xuXG4gICAgICAgIHZhciBjb250ZW50ID0gdGhpcy52aWV3LmZpbmRCeUlkKCdjb250ZW50Jyk7XG5cbiAgICAgICAgd2hpbGUgKGNvbnRlbnQubGFzdENoaWxkKVxuICAgICAgICAgICAgY29udGVudC5yZW1vdmVDaGlsZChjb250ZW50Lmxhc3RDaGlsZCk7XG5cbiAgICAgICAgY29udGVudC5hcHBlbmRDaGlsZChyLnJlbmRlcigpKTtcblxuICAgIH1cblxuICAgIG5vb3AoKSB7XG5cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMudmlldy5yZW5kZXIoKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBBY3Rpb25BcmVhXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKG1ha2UpIHtcbiAgcmV0dXJuIG1ha2Uubm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6IG1ha2UucmVzb2x2ZShDbGFzcywgJ0xBWU9VVF9BQ1RJT05fQVJFQScpIH0gfSwgW21ha2Uud2lkZ2V0KF9NZW51QnV0dG9uMi5kZWZhdWx0LCB7IGh0bWw6IHt9LCB3YXQ6IHsgJ29uQ2xpY2snOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd2F0Om9uTWVudUJ1dHRvbkNsaWNrZWQnLCBtYWtlLnJlc29sdmUodGhpcywgJ25vb3AnKSkgfSB9LCBbXSksIG1ha2Uubm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6IG1ha2UucmVzb2x2ZShDbGFzcywgJ0xBWU9VVF9BQ1RJT05fQVJFQV9DT05URU5UJykgfSwgd21sOiB7ICdpZCc6IFwiY29udGVudFwiIH0gfSwgW21ha2UucmVzb2x2ZSh0aGlzLCAnY2hpbGRyZW4nKV0pXSk7XG59O1xuXG52YXIgX01lbnVCdXR0b24gPSByZXF1aXJlKFwiLi4vLi4vbWVudS1idXR0b24vTWVudUJ1dHRvblwiKTtcblxudmFyIF9NZW51QnV0dG9uMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX01lbnVCdXR0b24pO1xuXG52YXIgX3dhdENsYXNzZXMgPSByZXF1aXJlKFwid2F0LWNsYXNzZXNcIik7XG5cbnZhciBDbGFzcyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF93YXRDbGFzc2VzKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQob2JqKSB7IGlmIChvYmogJiYgb2JqLl9fZXNNb2R1bGUpIHsgcmV0dXJuIG9iajsgfSBlbHNlIHsgdmFyIG5ld09iaiA9IHt9OyBpZiAob2JqICE9IG51bGwpIHsgZm9yICh2YXIga2V5IGluIG9iaikgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkgbmV3T2JqW2tleV0gPSBvYmpba2V5XTsgfSB9IG5ld09iai5kZWZhdWx0ID0gb2JqOyByZXR1cm4gbmV3T2JqOyB9IH1cblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTsiLCJpbXBvcnQgeyBWaWV3LCBXaWRnZXQgfSBmcm9tICd3bWxqcy9saWIvcnVudGltZSc7XG5pbXBvcnQgY29udGFpbmVyIGZyb20gJy4vd21sL2NvbnRhaW5lci53bWwnO1xuXG4vKipcbiAqIExheW91dENvbnRhaW5lciBwcm92aWRlcyB0aGUgd2lkZ2V0IHRoYXQgd3JhcHMgYWxsIHRoZSBjb250ZW50IHRvZ2V0aGVyIChEcmF3ZXIgYW5kIGNvbnRlbnQgYXJlYSkuXG4gKi9cbmNsYXNzIExheW91dENvbnRhaW5lciBleHRlbmRzIFdpZGdldCB7XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIFZpZXcucmVuZGVyKGNvbnRhaW5lciwgdGhpcyk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgTGF5b3V0Q29udGFpbmVyXG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChtYWtlKSB7XG4gIHJldHVybiBtYWtlLm5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiBtYWtlLnJlc29sdmUoQ2xhc3MsICdMQVlPVVRfQ09OVEFJTkVSJykgfSB9LCBbbWFrZS5yZXNvbHZlKHRoaXMsICdjaGlsZHJlbicpXSk7XG59O1xuXG52YXIgX3dhdENsYXNzZXMgPSByZXF1aXJlKCd3YXQtY2xhc3NlcycpO1xuXG52YXIgQ2xhc3MgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfd2F0Q2xhc3Nlcyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKG9iaikgeyBpZiAob2JqICYmIG9iai5fX2VzTW9kdWxlKSB7IHJldHVybiBvYmo7IH0gZWxzZSB7IHZhciBuZXdPYmogPSB7fTsgaWYgKG9iaiAhPSBudWxsKSB7IGZvciAodmFyIGtleSBpbiBvYmopIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIG5ld09ialtrZXldID0gb2JqW2tleV07IH0gfSBuZXdPYmouZGVmYXVsdCA9IG9iajsgcmV0dXJuIG5ld09iajsgfSB9XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsImltcG9ydCB7IFZpZXcsIFdpZGdldCB9IGZyb20gJ3dtbGpzL2xpYi9ydW50aW1lJztcbmltcG9ydCBkcmF3ZXIgZnJvbSAnLi93bWwvZHJhd2VyLndtbCc7XG5pbXBvcnQgKiBhcyBDbGFzcyBmcm9tICd3YXQtY2xhc3Nlcyc7XG5cbi8qKlxuICogRHJhd2VyXG4gKi9cbmNsYXNzIERyYXdlciBleHRlbmRzIFdpZGdldCB7XG5cbiAgICBjb25zdHJ1Y3RvcihhdHRycywgY2hpbGRyZW4pIHtcblxuICAgICAgICBzdXBlcihhdHRycywgY2hpbGRyZW4pO1xuICAgICAgICB0aGlzLnZpZXcgPSBuZXcgVmlldyhkcmF3ZXIsIHRoaXMpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogdG9nZ2xlIHRoZSB2aXNpYmlsaXR5IG9mIHRoaXMgRHJhd2VyXG4gICAgICovXG4gICAgdG9nZ2xlKCkge1xuXG4gICAgICAgIHRoaXMudmlldy5maW5kQnlJZCgnZHJhd2VyJykuY2xhc3NMaXN0LnRvZ2dsZShDbGFzcy5WSVNJQkxFKTtcblxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy52aWV3LnJlbmRlcigpO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IERyYXdlclxuIiwiaW1wb3J0IHsgVmlldywgV2lkZ2V0IH0gZnJvbSAnd21sanMvbGliL3J1bnRpbWUnO1xuaW1wb3J0ICogYXMgQ2xhc3MgZnJvbSAnd2F0LWNsYXNzZXMnO1xuaW1wb3J0IGRyYXdlcl9saW5rIGZyb20gJy4vd21sL2RyYXdlcl9saW5rLndtbCc7XG5cbi8qKlxuICogRHJhd2VyTGlua1xuICovXG5jbGFzcyBEcmF3ZXJMaW5rIGV4dGVuZHMgV2lkZ2V0IHtcblxuICAgIGNvbnN0cnVjdG9yKGF0dHJzLCBjaGlsZHJlbikge1xuXG4gICAgICAgIHN1cGVyKGF0dHJzLCBjaGlsZHJlbik7XG4gICAgICAgIHRoaXMuaHJlZiA9IGF0dHJzLnJlYWQoJ3dhdDpocmVmJyk7XG4gICAgICAgIHRoaXMudmlldyA9IG5ldyBWaWV3KGRyYXdlcl9saW5rLCB0aGlzKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGFkZCB0aGUgYWN0aXZlIHN0YXRlIG9mIHRoaXMgRHJhd2VyTGlua1xuICAgICAqL1xuICAgIGFjdGl2YXRlKCkge1xuXG4gICAgICAgIHZhciBhID0gdGhpcy52aWV3LmZpbmRCeUlkKCdhJyk7XG4gICAgICAgIHZhciBjaGlsZHJlbiA9IHRoaXMudmlldy5maW5kQnlJZCgnYScpLnBhcmVudE5vZGUuY2hpbGRyZW47XG5cbiAgICAgICAgYS5jbGFzc0xpc3QucmVtb3ZlKENsYXNzLkFDVElWRSk7XG4gICAgICAgIGEuY2xhc3NMaXN0LmFkZChDbGFzcy5BQ1RJVkUpO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICBpZiAoY2hpbGRyZW5baV0ubm9kZU5hbWUgPT09ICdBJylcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGRyZW5baV0gIT09IGEpXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuW2ldLmNsYXNzTGlzdC5yZW1vdmUoQ2xhc3MuQUNUSVZFKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGRlYWN0aXZhdGUgdGhpcyBEcmF3ZXJMaW5rXG4gICAgICovXG4gICAgZGVhY3RpdmF0ZSgpIHtcblxuICAgICAgICB0aGlzLnZpZXcuZmluZEJ5SWQoJ2EnKS5jbGFzc0xpc3QucmVtb3ZlKENsYXNzLkFDVElWRSk7XG5cbiAgICB9XG5cbiAgICBjbGlja2VkKCkge1xuXG4gICAgICAgIHRoaXMuYWN0aXZhdGUoKTtcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDpvbkNsaWNrJywgZnVuY3Rpb24oKSB7fSkodGhpcyk7XG5cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMudmlldy5yZW5kZXIoKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBEcmF3ZXJMaW5rXG4iLCJpbXBvcnQgeyBWaWV3LCBXaWRnZXQgfSBmcm9tICd3bWxqcy9saWIvcnVudGltZSc7XG5pbXBvcnQgZHJhd2VyX25hdmlnYXRpb24gZnJvbSAnLi93bWwvZHJhd2VyX25hdmlnYXRpb24ud21sJztcbmltcG9ydCAqIGFzIENsYXNzIGZyb20gJ3dhdC1jbGFzc2VzJztcblxuLyoqXG4gKiBEcmF3ZXJOYXZpZ2F0aW9uXG4gKi9cbmNsYXNzIERyYXdlck5hdmlnYXRpb24gZXh0ZW5kcyBXaWRnZXQge1xuXG4gICAgY29uc3RydWN0b3IoYXR0cnMsIGNoaWxkcmVuKSB7XG5cbiAgICAgICAgc3VwZXIoYXR0cnMsIGNoaWxkcmVuKTtcblxuICAgICAgICB0aGlzLnZpZXcgPSBuZXcgVmlldyhkcmF3ZXJfbmF2aWdhdGlvbiwgdGhpcyk7XG5cbiAgICB9XG5cbiAgICBoYW5kbGVFdmVudChlKSB7XG5cbiAgICAgICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcblxuICAgICAgICAgICAgaWYgKGNoaWxkICE9PSBlLnRhcmdldClcbiAgICAgICAgICAgICAgICBjaGlsZC5jbGFzc0xpc3QucmVtb3ZlKENsYXNzLkFDVElWRSk7XG5cbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICBvblJlbmRlcmVkKCkge1xuXG4gICAgICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG5cbiAgICAgICAgICAgIGNoaWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcyk7XG5cbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMudmlldy5yZW5kZXIoKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBEcmF3ZXJOYXZpZ2F0aW9uXG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChtYWtlKSB7XG4gIHJldHVybiBtYWtlLm5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiBtYWtlLnJlc29sdmUoQ2xhc3MsICdMQVlPVVRfRFJBV0VSJykgfSwgd21sOiB7ICdpZCc6IFwiZHJhd2VyXCIgfSB9LCBbbWFrZS5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogbWFrZS5yZXNvbHZlKENsYXNzLCAnTEFZT1VUX0RSQVdFUl9DT05URU5UJykgfSB9LCBbbWFrZS5yZXNvbHZlKHRoaXMsICdjaGlsZHJlbicpXSldKTtcbn07XG5cbnZhciBfd2F0Q2xhc3NlcyA9IHJlcXVpcmUoJ3dhdC1jbGFzc2VzJyk7XG5cbnZhciBDbGFzcyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF93YXRDbGFzc2VzKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQob2JqKSB7IGlmIChvYmogJiYgb2JqLl9fZXNNb2R1bGUpIHsgcmV0dXJuIG9iajsgfSBlbHNlIHsgdmFyIG5ld09iaiA9IHt9OyBpZiAob2JqICE9IG51bGwpIHsgZm9yICh2YXIga2V5IGluIG9iaikgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkgbmV3T2JqW2tleV0gPSBvYmpba2V5XTsgfSB9IG5ld09iai5kZWZhdWx0ID0gb2JqOyByZXR1cm4gbmV3T2JqOyB9IH1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAobWFrZSkge1xuICByZXR1cm4gbWFrZS5ub2RlKCdhJywgeyBodG1sOiB7ICdjbGFzcyc6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3YXQ6YWN0aXZlJywgZmFsc2UpID8gbWFrZS5yZXNvbHZlKENsYXNzLCAnQUNUSVZFJykgOiAnJywgJ2hyZWYnOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd2F0OmhyZWYnKSwgJ29uY2xpY2snOiB0aGlzLmNsaWNrZWQuYmluZCh0aGlzKSB9LCB3bWw6IHsgJ2lkJzogXCJhXCIgfSB9LCBbbWFrZS4kaWYodGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDppY29uLWNsYXNzJywgZmFsc2UpLCBmdW5jdGlvbiBpZl8wKCkge1xuICAgIHJldHVybiBbbWFrZS5ub2RlKCdpJywgeyBodG1sOiB7ICdjbGFzcyc6IG1ha2UucmVzb2x2ZShDbGFzcywgJ0xBWU9VVF9EUkFXRVJfTElOS19JQ09OJykgKyB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd2F0Omljb24tY2xhc3MnKSB9IH0sIFtdKV07XG4gIH0uYmluZCh0aGlzKSwgZnVuY3Rpb24gZWxzZV8wKCkge1xuICAgIHJldHVybiBbXTtcbiAgfS5iaW5kKHRoaXMpKSwgdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDp0aXRsZScpLCBtYWtlLnJlc29sdmUodGhpcywgJ2NoaWxkcmVuJyldKTtcbn07XG5cbnZhciBfd2F0Q2xhc3NlcyA9IHJlcXVpcmUoJ3dhdC1jbGFzc2VzJyk7XG5cbnZhciBDbGFzcyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF93YXRDbGFzc2VzKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQob2JqKSB7IGlmIChvYmogJiYgb2JqLl9fZXNNb2R1bGUpIHsgcmV0dXJuIG9iajsgfSBlbHNlIHsgdmFyIG5ld09iaiA9IHt9OyBpZiAob2JqICE9IG51bGwpIHsgZm9yICh2YXIga2V5IGluIG9iaikgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkgbmV3T2JqW2tleV0gPSBvYmpba2V5XTsgfSB9IG5ld09iai5kZWZhdWx0ID0gb2JqOyByZXR1cm4gbmV3T2JqOyB9IH1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAobWFrZSkge1xuICByZXR1cm4gbWFrZS5ub2RlKCduYXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogbWFrZS5yZXNvbHZlKENsYXNzLCAnTEFZT1VUX0RSQVdFUl9OQVZJR0FUSU9OJykgfSwgd21sOiB7ICdpZCc6IFwibmF2XCIgfSB9LCBbbWFrZS5yZXNvbHZlKHRoaXMsICdjaGlsZHJlbicpXSk7XG59O1xuXG52YXIgX3dhdENsYXNzZXMgPSByZXF1aXJlKCd3YXQtY2xhc3NlcycpO1xuXG52YXIgQ2xhc3MgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfd2F0Q2xhc3Nlcyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKG9iaikgeyBpZiAob2JqICYmIG9iai5fX2VzTW9kdWxlKSB7IHJldHVybiBvYmo7IH0gZWxzZSB7IHZhciBuZXdPYmogPSB7fTsgaWYgKG9iaiAhPSBudWxsKSB7IGZvciAodmFyIGtleSBpbiBvYmopIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIG5ld09ialtrZXldID0gb2JqW2tleV07IH0gfSBuZXdPYmouZGVmYXVsdCA9IG9iajsgcmV0dXJuIG5ld09iajsgfSB9XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIi8qIGpzaGludCBpZ25vcmU6c3RhcnQgKi9cbmV4cG9ydCBMYXlvdXRDb250YWluZXIgZnJvbSAnLi9jb250YWluZXIvTGF5b3V0Q29udGFpbmVyJztcbmV4cG9ydCBEcmF3ZXIgZnJvbSAnLi9kcmF3ZXIvRHJhd2VyJztcbmV4cG9ydCBEcmF3ZXJOYXZpZ2F0aW9uIGZyb20gJy4vZHJhd2VyL0RyYXdlck5hdmlnYXRpb24nO1xuZXhwb3J0IERyYXdlckxpbmsgZnJvbSAnLi9kcmF3ZXIvRHJhd2VyTGluayc7XG5leHBvcnQgTWFpbiBmcm9tICcuL21haW4vTWFpbic7XG5leHBvcnQgQWN0aW9uQXJlYSBmcm9tICcuL2FjdGlvbi1hcmVhL0FjdGlvbkFyZWEnO1xuZXhwb3J0IE1lbnVCdXR0b24gZnJvbSAnLi9tZW51LWJ1dHRvbi9NZW51QnV0dG9uJztcbmV4cG9ydCBMb2dvSW1hZ2UgZnJvbSAnLi9sb2dvaW1hZ2UvTG9nb0ltYWdlJztcbmV4cG9ydCBBY2NvdW50QXJlYSBmcm9tICcuL2FjY291bnQtYXJlYS9BY2NvdW50QXJlYSc7XG5leHBvcnQgTm90aWZpY2F0aW9uIGZyb20gJy4vbm90aWZpY2F0aW9uL05vdGlmaWNhdGlvbic7XG4vKiBqc2hpbnQgaWdub3JlOmVuZCAqL1xuIiwiaW1wb3J0IHsgVmlldywgV2lkZ2V0IH0gZnJvbSAnd21sanMvbGliL3J1bnRpbWUnO1xuaW1wb3J0IGxvZ29pbWFnZSBmcm9tICcuL3dtbC9sb2dvaW1hZ2Uud21sJztcblxuLyoqXG4gKiBMb2dvSW1hZ2VcbiAqL1xuY2xhc3MgTG9nb0ltYWdlIGV4dGVuZHMgV2lkZ2V0IHtcblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gVmlldy5yZW5kZXIobG9nb2ltYWdlLCB0aGlzKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBMb2dvSW1hZ2VcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKG1ha2UpIHtcbiAgcmV0dXJuIG1ha2Uubm9kZSgnaGVhZGVyJywgeyBodG1sOiB7ICdjbGFzcyc6IG1ha2UucmVzb2x2ZShDbGFzcywgJ0xBWU9VVF9MT0dPSU1BR0UnKSB9IH0sIFttYWtlLiRpZih0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd2F0OmltYWdlJywgZmFsc2UpLCBmdW5jdGlvbiBpZl8wKCkge1xuICAgIHJldHVybiBbbWFrZS5ub2RlKCdoMScsIHsgaHRtbDoge30gfSwgW21ha2Uubm9kZSgnYScsIHsgaHRtbDogeyAnaHJlZic6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3YXQ6aHJlZicsICcjJykgfSB9LCBbbWFrZS5ub2RlKCdpbWcnLCB7IGh0bWw6IHsgJ2NsYXNzJzogbWFrZS5yZXNvbHZlKENsYXNzLCAnTEFZT1VUX0xPR09JTUFHRV9JTUFHRScpLCAnc3JjJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDppbWFnZScpLCAnYWx0JzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDphbHQnKSB9IH0sIFtdKV0pXSldO1xuICB9LmJpbmQodGhpcyksIGZ1bmN0aW9uIGVsc2VfMCgpIHtcbiAgICByZXR1cm4gW107XG4gIH0uYmluZCh0aGlzKSldKTtcbn07XG5cbnZhciBfd2F0Q2xhc3NlcyA9IHJlcXVpcmUoJ3dhdC1jbGFzc2VzJyk7XG5cbnZhciBDbGFzcyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF93YXRDbGFzc2VzKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQob2JqKSB7IGlmIChvYmogJiYgb2JqLl9fZXNNb2R1bGUpIHsgcmV0dXJuIG9iajsgfSBlbHNlIHsgdmFyIG5ld09iaiA9IHt9OyBpZiAob2JqICE9IG51bGwpIHsgZm9yICh2YXIga2V5IGluIG9iaikgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkgbmV3T2JqW2tleV0gPSBvYmpba2V5XTsgfSB9IG5ld09iai5kZWZhdWx0ID0gb2JqOyByZXR1cm4gbmV3T2JqOyB9IH1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiaW1wb3J0IHsgVmlldywgV2lkZ2V0IH0gZnJvbSAnd21sanMvbGliL3J1bnRpbWUnO1xuaW1wb3J0IG1haW4gZnJvbSAnLi93bWwvbWFpbi53bWwnO1xuXG4vKipcbiAqIE1haW4gYXJlYSBmb3IgY29udGVudCBpbiB0aGUgbGF5b3V0LlxuICovXG5jbGFzcyBNYWluIGV4dGVuZHMgV2lkZ2V0IHtcblxuICAgIGNvbnN0cnVjdG9yKGF0dHJzLCBjaGlsZHJlbikge1xuXG4gICAgICAgIHN1cGVyKGF0dHJzLCBjaGlsZHJlbik7XG4gICAgICAgIHRoaXMudmlldyA9IG5ldyBWaWV3KG1haW4sIHRoaXMpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogc2V0Q29udGVudCByZXBsYWNlcyB0aGUgY29udGVudCBvZiB0aGlzIE1haW4gdmlldy5cbiAgICAgKiBAcGFyYW0ge1JlbmRlcmFibGV9IHJcbiAgICAgKi9cbiAgICBzZXRDb250ZW50KHIpIHtcblxuICAgICAgICB2YXIgcm9vdCA9IHRoaXMudmlldy5maW5kQnlJZCgncm9vdCcpO1xuXG4gICAgICAgIHdoaWxlIChyb290Lmxhc3RDaGlsZClcbiAgICAgICAgICAgIHJvb3QucmVtb3ZlQ2hpbGQocm9vdC5sYXN0Q2hpbGQpO1xuXG4gICAgICAgIHJvb3QuYXBwZW5kQ2hpbGQoci5yZW5kZXIoKSk7XG5cblxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy52aWV3LnJlbmRlcigpO1xuXG4gICAgfVxuXG59XG5leHBvcnQgZGVmYXVsdCBNYWluXG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChtYWtlKSB7XG4gIHJldHVybiBtYWtlLm5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiBtYWtlLnJlc29sdmUoQ2xhc3MsICdMQVlPVVRfTUFJTicpIH0gfSwgW21ha2Uubm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6IG1ha2UucmVzb2x2ZShDbGFzcywgJ0xBWU9VVF9NQUlOX0NPTlRFTlQnKSB9IH0sIFttYWtlLnJlc29sdmUodGhpcywgJ2NoaWxkcmVuJyldKV0pO1xufTtcblxudmFyIF93YXRDbGFzc2VzID0gcmVxdWlyZSgnd2F0LWNsYXNzZXMnKTtcblxudmFyIENsYXNzID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX3dhdENsYXNzZXMpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChvYmopIHsgaWYgKG9iaiAmJiBvYmouX19lc01vZHVsZSkgeyByZXR1cm4gb2JqOyB9IGVsc2UgeyB2YXIgbmV3T2JqID0ge307IGlmIChvYmogIT0gbnVsbCkgeyBmb3IgKHZhciBrZXkgaW4gb2JqKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSBuZXdPYmpba2V5XSA9IG9ialtrZXldOyB9IH0gbmV3T2JqLmRlZmF1bHQgPSBvYmo7IHJldHVybiBuZXdPYmo7IH0gfVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCJpbXBvcnQgeyBWaWV3LCBXaWRnZXQgfSBmcm9tICd3bWxqcy9saWIvcnVudGltZSc7XG5pbXBvcnQgbWVudV9idXR0b24gZnJvbSAnLi93bWwvbWVudV9idXR0b24ud21sJztcblxuLyoqXG4gKiBNZW51QnV0dG9uIHByb3ZpZGVzIGEgJ2hhbWJ1cmdlcicgbWVudSBidXR0b24uXG4gKi9cbmNsYXNzIE1lbnVCdXR0b24gZXh0ZW5kcyBXaWRnZXQge1xuXG4gICAgY2xpY2tlZChlKSB7XG5cbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDpvbkNsaWNrJywgZnVuY3Rpb24oKSB7fSkoKTtcblxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gVmlldy5yZW5kZXIobWVudV9idXR0b24sIHRoaXMpO1xuXG4gICAgfVxuXG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWVudUJ1dHRvblxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAobWFrZSkge1xuICByZXR1cm4gbWFrZS5ub2RlKCdidXR0b24nLCB7IGh0bWw6IHsgJ2NsYXNzJzogbWFrZS5yZXNvbHZlKENsYXNzLCAnTEFZT1VUX01FTlVfQlVUVE9OJyksICdvbmNsaWNrJzogdGhpcy5jbGlja2VkLmJpbmQodGhpcykgfSB9LCBbbWFrZS5ub2RlKCdzcGFuJywgeyBodG1sOiB7ICdjbGFzcyc6IFwiXCIgfSB9LCBbXSksIG1ha2Uubm9kZSgnc3BhbicsIHsgaHRtbDogeyAnY2xhc3MnOiBcIlwiIH0gfSwgW10pLCBtYWtlLm5vZGUoJ3NwYW4nLCB7IGh0bWw6IHsgJ2NsYXNzJzogXCJcIiB9IH0sIFtdKV0pO1xufTtcblxudmFyIF93YXRDbGFzc2VzID0gcmVxdWlyZSgnd2F0LWNsYXNzZXMnKTtcblxudmFyIENsYXNzID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX3dhdENsYXNzZXMpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChvYmopIHsgaWYgKG9iaiAmJiBvYmouX19lc01vZHVsZSkgeyByZXR1cm4gb2JqOyB9IGVsc2UgeyB2YXIgbmV3T2JqID0ge307IGlmIChvYmogIT0gbnVsbCkgeyBmb3IgKHZhciBrZXkgaW4gb2JqKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSBuZXdPYmpba2V5XSA9IG9ialtrZXldOyB9IH0gbmV3T2JqLmRlZmF1bHQgPSBvYmo7IHJldHVybiBuZXdPYmo7IH0gfVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCJpbXBvcnQgeyBWaWV3LCBXaWRnZXQgfSBmcm9tICd3bWxqcy9saWIvcnVudGltZSc7XG5pbXBvcnQgKiBhcyBDbGFzcyBmcm9tICd3YXQtY2xhc3Nlcyc7XG5pbXBvcnQgbm90aWZpY2F0aW9uIGZyb20gJy4vd21sL25vdGlmaWNhdGlvbi53bWwnO1xuXG4vKipcbiAqIE5vdGlmaWNhdGlvblxuICovXG5jbGFzcyBOb3RpZmljYXRpb24gZXh0ZW5kcyBXaWRnZXQge1xuXG4gICAgY29uc3RydWN0b3IoYXR0cnMsIGNoaWxkcmVuKSB7XG5cbiAgICAgICAgc3VwZXIoYXR0cnMsIGNoaWxkcmVuKTtcblxuICAgICAgICB0aGlzLnZpZXcgPSBuZXcgVmlldyhub3RpZmljYXRpb24sIHRoaXMpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcHV0IGEgbWVzc2FnZSBpbnRvIHRoZSBub3RpZmljYXRpb24gd2lkZ2V0LlxuICAgICAqIE1lc3NhZ2VzIGFyZSBzaG93biBmb3IgYSBzcGVjaWZpYyB0aW1lIGJlZm9yZVxuICAgICAqIHRoZXkgYXJlIGhpZGRlbi5cbiAgICAgKi9cbiAgICBwdXQobWVzc2FnZSkge1xuXG4gICAgICAgIHZhciBub2RlID0gdGhpcy52aWV3LmZpbmRCeUlkKCdtZXNzYWdlJyk7XG5cbiAgICAgICAgbm9kZS5jbGFzc0xpc3QucmVtb3ZlKENsYXNzLlZJU0lCTEUpO1xuXG4gICAgICAgIHdoaWxlIChub2RlLmxhc3RDaGlsZClcbiAgICAgICAgICAgIG5vZGUucmVtb3ZlQ2hpbGQobm9kZS5sYXN0Q2hpbGQpO1xuXG4gICAgICAgIG5vZGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUobWVzc2FnZSkpO1xuXG4gICAgICAgIG5vZGUuY2xhc3NMaXN0LmFkZChDbGFzcy5WSVNJQkxFKTtcblxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICBub2RlLmNsYXNzTGlzdC5yZW1vdmUoQ2xhc3MuVklTSUJMRSk7XG5cbiAgICAgICAgfSwgdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDpkZWxheScsIDMpICogMTAwMCk7XG5cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMudmlldy5yZW5kZXIoKTtcblxuICAgIH1cblxufVxuZXhwb3J0IGRlZmF1bHQgTm90aWZpY2F0aW9uXG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChtYWtlKSB7XG4gIHJldHVybiBtYWtlLm5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiBtYWtlLnJlc29sdmUoQ2xhc3MsICdMQVlPVVRfTk9USUZJQ0FUSU9OJykgfSwgd21sOiB7ICdpZCc6IFwibWVzc2FnZVwiIH0gfSwgW10pO1xufTtcblxudmFyIF93YXRDbGFzc2VzID0gcmVxdWlyZSgnd2F0LWNsYXNzZXMnKTtcblxudmFyIENsYXNzID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX3dhdENsYXNzZXMpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChvYmopIHsgaWYgKG9iaiAmJiBvYmouX19lc01vZHVsZSkgeyByZXR1cm4gb2JqOyB9IGVsc2UgeyB2YXIgbmV3T2JqID0ge307IGlmIChvYmogIT0gbnVsbCkgeyBmb3IgKHZhciBrZXkgaW4gb2JqKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSBuZXdPYmpba2V5XSA9IG9ialtrZXldOyB9IH0gbmV3T2JqLmRlZmF1bHQgPSBvYmo7IHJldHVybiBuZXdPYmo7IH0gfVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCJpbXBvcnQgcHJvcGVydHkgZnJvbSAncHJvcGVydHktc2Vlayc7XG5cbi8qKlxuICogQXR0cmlidXRlcyBwcm92aWRlcyBhbiBBUEkgZm9yIHJlYWRpbmcgdGhlIFxuICogYXR0cmlidXRlcyBzdXBwbGllZCB0byBhbiBFbGVtZW50LlxuICogQHBhcmFtIHtvYmplY3R9IGF0dHJzIFxuICovXG5jbGFzcyBBdHRyaWJ1dGVzIHtcblxuICAgIGNvbnN0cnVjdG9yKGF0dHJzKSB7XG5cbiAgICAgICAgdGhpcy5fYXR0cnMgPSBhdHRycztcblxuICAgIH1cblxuICAgIHN0YXRpYyBpc3NldCh2YWx1ZSkge1xuXG4gICAgICByZXR1cm4gW251bGwsIHVuZGVmaW5lZF0uaW5kZXhPZih2YWx1ZSkgPCAwO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmVhZCBhIHZhbHVlIGZvcm0gdGhlIGludGVybmFsIGxpc3QuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGggXG4gICAgICogQHBhcmFtIHsqfSBkZWZhdWx0VmFsdWUgLSBUaGlzIHZhbHVlIGlzIHJldHVybmVkIGlmIHRoZSB2YWx1ZSBpcyBub3Qgc2V0LlxuICAgICAqL1xuICAgIHJlYWQocGF0aCwgZGVmYXVsdFZhbHVlKSB7XG5cbiAgICAgICAgdmFyIHJldCA9IHByb3BlcnR5KHRoaXMuX2F0dHJzLCBwYXRoLnNwbGl0KCc6Jykuam9pbignLicpKTtcblxuICAgICAgICBkZWZhdWx0VmFsdWUgPSBBdHRyaWJ1dGVzLmlzc2V0KGRlZmF1bHRWYWx1ZSk/IGRlZmF1bHRWYWx1ZSA6ICcnO1xuXG4gICAgICAgIGlmKCFBdHRyaWJ1dGVzLmlzc2V0KHJldCkpXG4gICAgICAgICAgICByZXR1cm4gZGVmYXVsdFZhbHVlO1xuXG4gICAgICAgIHJldHVybiByZXQ7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZXF1aXJlIGlzIGxpa2UgcmVhZCBidXQgdGhyb3dzIGFuIEVycm9yIGlmIHRoZSB2YWx1ZSBpcyBub3Qgc3VwcGxpZWQuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGggXG4gICAgICogQHJldHVybnMgeyp9XG4gICAgICovXG4gICAgcmVxdWlyZShwYXRoKSB7XG5cbiAgICAgICAgdmFyIHJldCA9IHRoaXMucmVhZChwYXRoKTtcblxuICAgICAgICBpZighQXR0cmlidXRlcy5pc3NldChyZXQpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKGAke3BhdGh9IGlzIHJlcXVpcmVkIWApO1xuXG4gICAgICAgIHJldHVybiByZXQ7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZXF1aXJlQXJyYXkgcmVxdWlyZXMgdGhlIHZhbHVlIHRvIGJlIGFuIGFycmF5LCBpZiBubyBcbiAgICAgKiB2YWx1ZSBpcyByZWFkIHRoZW4gZGVmYXVsdCBpcyBwcm92aWRlZC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aCBcbiAgICAgKiBAcGFyYW0geyp9IGRlZmF1bHRWYWx1ZSBcbiAgICAgKi9cbiAgICByZXF1aXJlQXJyYXkocGF0aCwgZGVmYXVsdFZhbHVlKSB7XG5cbiAgICAgICAgdmFyIHJldCA9IHRoaXMucmVhZChwYXRoKTtcblxuICAgICAgICBpZighQXR0cmlidXRlcy5pc3NldChyZXQpKSB7XG5cbiAgICAgICAgICAgIGlmIChBdHRyaWJ1dGVzLmlzc2V0KGRlZmF1bHRWYWx1ZSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcblxuICAgICAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKGAke3BhdGh9IGlzIHJlcXVpcmVkIWApO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJldCkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJldDtcblxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgJHtwYXRofSBtdXN0IGJlIGFuIGFycmF5IGdvdCAke3R5cGVvZiByZXR9IWApO1xuXG4gICAgICAgIH1cblxuICAgIH1cblxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEF0dHJpYnV0ZXNcbiIsImltcG9ydCBBdHRyaWJ1dGVzIGZyb20gJy4vQXR0cmlidXRlcyc7XG5pbXBvcnQgcHJvcGVydHkgZnJvbSAncHJvcGVydHktc2Vlayc7XG4vKipcbiAqIEludGVyZmFjZSBmb3IgV2lkZ2V0c1xuICogQGludGVyZmFjZSBXaWRnZXRcbiAqL1xuXG4vKipcbiAqIEludGVyZmFjZSBmb3Igb2JqZWN0cyB0aGF0IGNyZWF0ZSBXaWRnZXRzXG4gKiBAaW50ZXJmYWNlIEZhY3RvcnlcbiAqL1xuXG4vKipcbiAqXG4gKiBjcmVhdGUgdGhlIHdpZGdldFxuICpcbiAqIEBmdW5jdGlvblxuICogQG5hbWUgRmFjdG9yeS5jcmVhdGVcbiAqIEBwYXJhbSB7b2JqZWN0fSBodG1sQXR0cmlidXRlcyBBIGhhc2ggb2YgYXR0cmlidXRlcyBleHBlY3RlZCB0byBiZSBwYXNzZWQgaW50byBET00uXG4gKiBAcGFyYW0ge29iamVjdH0gbnNBdHRyaWJ1dGVzICAgQSBoYXNoIG9mIG5hbWVzcGFjZWQgYXR0cmlidXRlcyBmb3IgZnJhbWV3b3JrIHVzYWdlLlxuICovXG5cblxuLyoqXG4gKiBNYWtlciBpcyB1c2VkIGJ5IGEgd21sIGphdmFzY3JpcHQgdGVtcGxhdGUgdG8gY3JlYXRlIGFzc2V0cy5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHRlbXBsYXRlXG4gKiBAcGFyYW0ge29iamVjdH0gY29udGV4dFxuICogQHRvZG8gQ2xlYW4gdXAgcmVsYXRpb25zaGlwIGJldHdlZW4gVmlld3MgYW5kIHRoZWlyIE1ha2Vycy5cbiAqL1xuY2xhc3MgTWFrZXIge1xuXG4gIGNvbnN0cnVjdG9yKHRlbXBsYXRlLCBjb250ZXh0KSB7XG5cbiAgICB0aGlzLl9pZHMgPSB7fTtcbiAgICB0aGlzLl93aWRnZXRzID0gW107XG4gICAgdGhpcy5fdGVtcGxhdGUgPSB0ZW1wbGF0ZTtcbiAgICB0aGlzLl9jb250ZXh0ID0gY29udGV4dDtcblxuICB9XG5cbiAgLyoqXG4gICAqIHJlc29sdmUgYSBwcm9wZXJ0eSBhY2Nlc3MgZXhwcmVzc2lvbiB0byBhdm9pZFxuICAgKiB0aG93aW5nIGVycm9ycyBpZiBpdCBkb2VzIG5vdCBleGlzdC5cbiAgICogQHBhcmFtIHtvYmplY3R9IGhlYWRcbiAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGhcbiAgICovXG4gIHJlc29sdmUoaGVhZCwgcGF0aCkge1xuXG4gICAgdmFyIHJldCA9IHByb3BlcnR5KGhlYWQsIHBhdGgpO1xuXG4gICAgaWYgKChyZXQgPT09IHVuZGVmaW5lZCkgfHwgKHJldCA9PT0gbnVsbCkpXG4gICAgICByZXQgPSAnJztcblxuICAgIHJldHVybiByZXQ7XG5cbiAgfVxuXG4gIC8qKlxuICAgKkBwcml2YXRlXG4gICAqL1xuICBfYWRvcHQoY2hpbGQsIGUpIHtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KGNoaWxkKSlcbiAgICAgIHJldHVybiBjaGlsZC5mb3JFYWNoKGlubmVyQ2hpbGQgPT4gdGhpcy5fYWRvcHQoaW5uZXJDaGlsZCwgZSkpO1xuXG4gICAgaWYgKGNoaWxkKVxuICAgICAgZS5hcHBlbmRDaGlsZChcbiAgICAgICAgKHR5cGVvZiBjaGlsZCA9PT0gJ29iamVjdCcpID9cbiAgICAgICAgY2hpbGQgOiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjaGlsZCB8fCAnJykpO1xuXG4gIH1cblxuICAvKipcbiAgICogcmVnaXN0ZXIgYSBXaWRnZXQgb3IgTm9kZSBieSB0aGUgc3BlY2lmaWVkIHdtbDppZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICogQHBhcmFtIHtXaWRnZXR8Tm9kZX0gdGFyZ2V0XG4gICAqL1xuICByZWdpc3RlcihpZCwgdGFyZ2V0KSB7XG5cbiAgICBpZiAodGhpcy5faWRzLmhhc093blByb3BlcnR5KGlkKSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRHVwbGljYXRlIGlkICcke2lkfScgZGV0ZWN0ZWQhYCk7XG5cbiAgICB0aGlzLl9pZHNbaWRdID0gdGFyZ2V0O1xuXG4gIH1cblxuICAvKipcbiAgICogdGV4dCBjcmVhdGVzIGEgRE9NVGV4dE5vZGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gICAqL1xuICB0ZXh0KHZhbHVlKSB7XG5cbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodmFsdWUgfHwgJycpO1xuXG4gIH1cblxuICAvKipcbiAgICogbm9kZSBpcyBjYWxsZWQgdG8gY3JlYXRlIGEgcmVndWxhciBET00gbm9kZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGFnXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBhdHRyaWJ1dGVzXG4gICAqIEBwYXJhbSB7YXJyYXk8c3RyaW5nfG51bWJlcnxXaWRnZXQ+fSBjaGlsZHJlblxuICAgKi9cbiAgbm9kZSh0YWcsIGF0dHJpYnV0ZXMsIGNoaWxkcmVuKSB7XG5cbiAgICB2YXIgZSA9ICh0YWcgPT09ICdmcmFnbWVudCcpID8gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpIDogZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xuXG4gICAgaWYgKHR5cGVvZiBhdHRyaWJ1dGVzLmh0bWwgPT09ICdvYmplY3QnKVxuICAgICAgT2JqZWN0LmtleXMoYXR0cmlidXRlcy5odG1sKS5mb3JFYWNoKGtleSA9PiB7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBhdHRyaWJ1dGVzLmh0bWxba2V5XSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGVba2V5XSA9IGF0dHJpYnV0ZXMuaHRtbFtrZXldO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGUuc2V0QXR0cmlidXRlKGtleSwgYXR0cmlidXRlcy5odG1sW2tleV0pO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIGNoaWxkcmVuLmZvckVhY2goYyA9PiB0aGlzLl9hZG9wdChjLCBlKSk7XG5cbiAgICBpZiAoYXR0cmlidXRlcy53bWwpXG4gICAgICBpZiAoYXR0cmlidXRlcy53bWwuaWQpXG4gICAgICAgIHRoaXMucmVnaXN0ZXIoYXR0cmlidXRlcy53bWwuaWQsIGUpO1xuXG4gICAgcmV0dXJuIGU7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiB3aWRnZXQgY3JlYXRlcyBhIHdtbCB3aWRnZXQuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IENvbnN0cnV0b3JcbiAgICogQHBhcmFtIHtvYmplY3R9IGF0dHJpYnV0ZXNcbiAgICogQHBhcmFtIHthcnJheTxzdHJpbmd8bnVtYmVyfFdpZGdldD59IGNoaWxkcmVuXG4gICAqIEByZXR1cm4ge1dpZGdldH1cbiAgICovXG4gIHdpZGdldChDb25zdHJ1Y3RvciwgYXR0cmlidXRlcywgY2hpbGRyZW4pIHtcblxuICAgIHZhciBjaGlsZHMgPSBbXTtcbiAgICB2YXIgdztcblxuICAgIGNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4gQXJyYXkuaXNBcnJheShjaGlsZCkgP1xuICAgICAgY2hpbGRzLnB1c2guYXBwbHkoY2hpbGRzLCBjaGlsZCkgOiBjaGlsZHMucHVzaChjaGlsZCkpO1xuXG4gICAgdyA9IG5ldyBDb25zdHJ1Y3RvcihuZXcgQXR0cmlidXRlcyhhdHRyaWJ1dGVzKSwgY2hpbGRzKTtcblxuICAgIGlmIChhdHRyaWJ1dGVzLndtbClcbiAgICAgIGlmIChhdHRyaWJ1dGVzLndtbC5pZClcbiAgICAgICAgdGhpcy5yZWdpc3RlcihhdHRyaWJ1dGVzLndtbC5pZCwgdyk7XG5cbiAgICB0aGlzLl93aWRnZXRzLnB1c2godyk7XG4gICAgcmV0dXJuIHcucmVuZGVyKCk7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiAkaWYgaXMgY2FsbGVkIHRvIGNyZWF0ZSBhbiBpZiBjb25kaXRpb25hbCBjb25zdHJ1Y3RcbiAgICogQHBhcmFtIHsqfSBwcmVkaWNhdGVcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gcG9zaXRpdmVcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gbmVnYXRpdmVcbiAgICovXG4gICRpZihwcmVkaWNhdGUsIHBvc2l0aXZlLCBuZWdhdGl2ZSkge1xuXG4gICAgcmV0dXJuIChwcmVkaWNhdGUpID8gcG9zaXRpdmUoKSA6IG5lZ2F0aXZlKCk7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiAkZm9yIGlzIGNhbGxlZCB0byBjcmVhdGUgYSBmb3IgbG9vcCBjb25zdHJ1Y3RcbiAgICogQHBhcmFtIHtJdGVyYWJsZX0gY29sbGVjdGlvblxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYlxuICAgKi9cbiAgJGZvcihjb2xsZWN0aW9uLCBjYikge1xuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoY29sbGVjdGlvbikpIHtcblxuICAgICAgcmV0dXJuIGNvbGxlY3Rpb24ubWFwKGNiKTtcblxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGNvbGxlY3Rpb24gPT09ICdvYmplY3QnKSB7XG5cbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyhjb2xsZWN0aW9uKS5tYXAoKGtleSwgaSwgYWxsKSA9PiBjYihjb2xsZWN0aW9uW2tleV0sIGtleSwgYWxsKSk7XG5cbiAgICB9XG5cbiAgICByZXR1cm4gW107XG4gIH1cblxuICAvKipcbiAgICogJHN3aXRjaCBzaW11bGF0ZXMgYSBzd2l0Y2ggc3RhdGVtZW50XG4gICAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcnxib29sZWFufSB2YWx1ZVxuICAgKiBAcGFyYW0ge29iamVjdH0gY2FzZXNcbiAgICovXG4gICRzd2l0Y2godmFsdWUsIGNhc2VzKSB7XG5cbiAgICB2YXIgcmVzdWx0ID0gY2FzZXNbdmFsdWVdO1xuICAgIHZhciBkZWZhdWwgPSBjYXNlcy5kZWZhdWx0O1xuXG4gICAgaWYgKHJlc3VsdCkgcmV0dXJuIHJlc3VsdDtcblxuICAgIGlmIChkZWZhdWwpIHJldHVybiBkZWFmdWw7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBzcHJlYWQgYSB2YXJpYWJsZSBpbnRvIGF0dHJpYnV0ZXNcbiAgICogQHBhcmFtIHtvYmplY3R8YXJyYXl9IHZhbHVlXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBhdHRyc1xuICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAqL1xuICBzcHJlYWQodmFsdWUsIGF0dHJzLCBrZXkpIHtcblxuICAgIHZhciB0YXJnZXQ7XG5cbiAgICBhdHRycyA9IGF0dHJzIHx8IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0JylcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYFNwcmVhZCB2YWx1ZXMgbXVzdCBiZSBhbiBhcnJheSBvciBvYmplY3QhIEdvdCAnJHt0eXBlb2YgdmFsdWV9JyFgKTtcblxuICAgIGlmIChrZXkgIT09ICcnKSB7XG5cbiAgICAgIHRhcmdldCA9IHByb3BlcnR5KGF0dHJzLCBrZXkpIHx8IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICBPYmplY3Qua2V5cyh2YWx1ZSkuZm9yRWFjaChrID0+IHRhcmdldFtrXSA9IHZhbHVlW2tdKTtcbiAgICAgIHByb3BlcnR5LnNldChhdHRycywga2V5LCB0YXJnZXQpO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgT2JqZWN0LmtleXModmFsdWUpLmZvckVhY2goayA9PiBhdHRyc1trXSA9IHZhbHVlW2tdKTtcblxuICAgIH1cblxuICAgIHJldHVybiBhdHRycztcblxuICB9XG5cbiAgLyoqXG4gICAqIGZpbmRCeUlkIHJldHVybnMgYSB3aWRnZXQgZnJvbSB0aGUgaW50ZXJuYWwgbGlzdC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqIEByZXR1cm4ge29iamVjdH1cbiAgICovXG4gIGZpbmRCeUlkKGlkKSB7XG5cbiAgICByZXR1cm4gKHRoaXMuX2lkc1tpZF0pID8gdGhpcy5faWRzW2lkXSA6IG51bGw7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiByZW5kZXIgdGhlIERPTS5cbiAgICogQHJldHVybiB7RE9NVHJlZX1cbiAgICovXG4gIHJlbmRlcigpIHtcblxuICAgIHZhciB0cmVlID0gbnVsbDtcblxuICAgIHRoaXMuX2lkcyA9IHt9O1xuICAgIHRoaXMuX3dpZGdldHMuZm9yRWFjaCh3ID0+IHcub25SZW1vdmVkKCkpO1xuICAgIHRoaXMuX3dpZGdldHMgPSBbXTtcblxuICAgIHRyZWUgPSB0aGlzLl90ZW1wbGF0ZS5jYWxsKHRoaXMuX2NvbnRleHQsIHRoaXMpO1xuICAgIHRoaXMuX2lkcy5yb290ID0gKHRoaXMuX2lkcy5yb290KT8gdGhpcy5faWRzLnJvb3Q6dHJlZTtcbiAgICB0aGlzLl93aWRnZXRzLmZvckVhY2godyA9PiB3Lm9uUmVuZGVyZWQoKSk7XG5cbiAgICByZXR1cm4gdHJlZTtcblxuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWFrZXJcblxuIiwiaW1wb3J0IE1ha2VyIGZyb20gJy4vTWFrZXInO1xuXG4vKipcbiAqIFZpZXcgcHJvdmlkZXMgYW4gQVBJIGZvciB0dXJuaW5nIHdtbCBpbnRvIGEgRE9NIHRyZWUuXG4gKiBBZGRpdGlvbmFsbHkgaXQgcHJvdmlkZXMgYSBjb252ZW5pZW50IEFQSSBmb3IgcmV0cmVpdmluZyBjcmVhdGVkXG4gKiB3aWRnZXRzIGNyZWF0ZWQgZHVyaW5nIHBhcnNpbmcgcHJvdmlkaW5nIGFuIG5lYXIgY3VzdG9tIGVsZW1lbnRzXG4gKiBsaWtlIGZlZWwuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSB0ZW1wbGF0ZSBBIGZ1bmN0aW9uIHRoYXQgd2lsbCBiZSB0cmVhdGVkIGFzIGEgd21sIHRlbXBsYXRlLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbnRleHQgQWxsIHJlZmVyZW5jZXMgdG8gYHRoaXNgIGluIHRoZSB0ZW1wbGF0ZSB3aWxsIHJlZmVyIHRvIHRoaXMgb2JqZWN0LlxuICogQHBhcmFtIHt9IGxpc3RlbmVyIFxuICovXG5jbGFzcyBWaWV3IHtcblxuICAgIGNvbnN0cnVjdG9yKHRlbXBsYXRlLCBjb250ZXh0KSB7XG5cbiAgICAgICAgdGhpcy5fbWFrZXIgPSBuZXcgTWFrZXIodGVtcGxhdGUsIGNvbnRleHQpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmVuZGVyIGlzIGEgZmFjdG9yeSBtZXRob2QgZm9yIGNyZWF0aW5nIGEgbmV3IFZpZXcgYW5kIHJlbmRlcmluZ1xuICAgICAqIGl0J3MgY29udGVudHMgaW1tZWRpYXRlbHkuXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gdGVtcGxhdGVcbiAgICAgKiBAcGFyYW0ge29iamVjdHxudWxsfSBjb250ZXh0IFxuICAgICAqIEByZXR1cm5zIHtEb2N1bWVudEZyYWdtZW50fVxuICAgICAqL1xuICAgIHN0YXRpYyByZW5kZXIodGVtcGxhdGUsIGNvbnRleHQpIHtcblxuICAgICAgICByZXR1cm4gKG5ldyBWaWV3KHRlbXBsYXRlLCBjb250ZXh0KSkucmVuZGVyKCk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBmaW5kQnlJZCByZXRyaWV2ZXMgYW4gZWxlbWVudCBieSBpdHMgd21sOmlkIGF0dHJpYnV0ZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBcbiAgICAgKi9cbiAgICBmaW5kQnlJZChpZCkge1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9tYWtlci5maW5kQnlJZChpZCk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiB1c2UgcmVwbGFjZXMgdGhlIHRlbXBsYXRlIChhbmQgb3B0aW9uYWxseSBjb250ZXh0KSB0aGlzIFZpZXcgdXNlcy5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSB0ZW1wbGF0ZSBcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gW2NvbnRleHRdIFxuICAgICAqIEByZXR1cm5zIHtWaWV3fVxuICAgICAqL1xuICAgIHVzZSh0ZW1wbGF0ZSwgY29udGV4dCkge1xuXG4gICAgICAgIHRoaXMuX21ha2VyID0gbmV3IE1ha2VyKHRlbXBsYXRlLCAoY29udGV4dCkgPyBjb250ZXh0IDogdGhpcy5jb250ZXh0KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZW5kZXIgcHJvdmlkZXMgdGhlIERPTSBvdXRwdXQgb2YgdGhpcyB2aWV3LlxuICAgICAqIEByZXR1cm4ge0RPTU5vZGV9IFxuICAgICAqL1xuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5fbWFrZXIucmVuZGVyKCk7XG5cbiAgICB9XG5cblxufVxuXG5leHBvcnQgZGVmYXVsdCBWaWV3XG4iLCIvKipcbiAqIFdpZGdldCBjbGFzcyByZXByZXNlbnRzXG4gKi9cbmNsYXNzIFdpZGdldCB7XG5cbiAgY29uc3RydWN0b3IoYXR0cnMsIGNoaWxkcmVuKSB7XG5cbiAgICB0aGlzLmF0dHJzID0gYXR0cnMuX2F0dHJzO1xuICAgIHRoaXMuYXR0cmlidXRlcyA9IGF0dHJzO1xuICAgIHRoaXMuY2hpbGRyZW4gPSBjaGlsZHJlbjtcblxuICB9XG5cbiAgb25SZW5kZXJlZCgpIHtcblxuICB9XG5cbiAgb25SZW1vdmVkKCkge1xuXG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBXaWRnZXRcblxuIiwiLypqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG5leHBvcnQgVmlldyBmcm9tICcuL1ZpZXcnO1xuZXhwb3J0IEF0dHJpYnV0ZXMgZnJvbSAnLi9BdHRyaWJ1dGVzJztcbmV4cG9ydCBXaWRnZXQgZnJvbSAnLi9XaWRnZXQnO1xuLypqc2hpbnQgaWdub3JlOmVuZCAqL1xuXG4iXX0=
