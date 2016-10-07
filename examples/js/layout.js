(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (make) {
  return make.widget(_layout.Container, { html: {} }, [make.widget(_layout.Drawer, { html: {}, wml: { 'id': "drawer" } }, [make.widget(_layout.Banner, { html: {}, wat: { 'image': "img/logo.svg" } }, []), make.widget(_layout.SideNavigation, { html: {} }, [make.widget(_layout.SideNavigationItem, { html: {}, wat: { 'href': "#/dashboard", 'title': "Dashboard", 'active': make.resolve(window, 'location.hash') === '#/dashboard', 'onClick': function function_literal_1(i) {
        return i.active();
      }.bind(this) } }, []), make.widget(_layout.SideNavigationItem, { html: {}, wat: { 'href': "#/messages", 'title': "Messages", 'active': make.resolve(window, 'location.hash') === '#/messages', 'onClick': function function_literal_2(i) {
        return i.active();
      }.bind(this) } }, []), make.widget(_layout.SideNavigationItem, { html: {}, wat: { 'href': "#/invoices", 'title': "Invoices", 'active': make.resolve(window, 'location.hash') === '#/invoices', 'onClick': function function_literal_3(i) {
        return i.active();
      }.bind(this) } }, []), make.widget(_layout.SideNavigationItem, { html: {}, wat: { 'href': "#/settings", 'title': "Settings", 'active': make.resolve(window, 'location.hash') === '#/settings', 'onClick': function function_literal_4(i) {
        return i.active();
      }.bind(this) } }, [])]), make.widget(_layout.AccountArea, { html: {}, wat: { 'title': "Jane Joe" } }, [])]), make.widget(_layout.MenuButton, { html: {}, wat: { 'onClick': this.menuButtonClicked.bind(this) } }, []), make.widget(_layout.ActionArea, { html: {}, wat: { 'onMenuButtonClicked': this.menuButtonClicked.bind(this) } }, [make.node('h3', { html: { 'class': "main-content" } }, [make.widget(_components.BreadCrumbMenu, { html: {} }, [make.widget(_components.BreadCrumb, { html: {}, wat: { 'href': "#" } }, [make.text('Home')]), make.widget(_components.BreadCrumb, { html: {}, wat: { 'href': "#", 'active': true } }, [make.text('Example')])])]), make.node('div', { html: { 'class': "secondary-content" } }, [make.node('button', { html: { 'class': "btn btn-default" } }, [make.text('Left')]), make.node('button', { html: { 'class': "btn btn-default" } }, [make.text('Right')]), make.node('button', { html: { 'class': "btn btn-primary" } }, [make.text('Save')])])]), make.widget(_layout.Main, { html: {} }, [])]);
};

var _layout = require('../../../../lib/layout');

var _components = require('../../../../lib/components');

module.exports = exports['default'];
},{"../../../../lib/components":7,"../../../../lib/layout":18}],2:[function(require,module,exports){
'use strict';

var _runtime = require('wmljs/lib/runtime');

var _layout = require('./wml/layout.wml');

var _layout2 = _interopRequireDefault(_layout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var context = {
    menuButtonClicked: function menuButtonClicked() {

        window.watLayout.findById('drawer').toggle();
    }
};

window.watLayout = new _runtime.View(_layout2.default, context);
document.body.insertBefore(watLayout.render(), document.body.firstChild);

},{"./wml/layout.wml":1,"wmljs/lib/runtime":32}],3:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _runtime = require('wmljs/lib/runtime');

var _item = require('./wml/item.wml');

var _item2 = _interopRequireDefault(_item);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

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

},{"./wml/item.wml":5,"wmljs/lib/runtime":32}],4:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _runtime = require('wmljs/lib/runtime');

var _menu = require('./wml/menu.wml');

var _menu2 = _interopRequireDefault(_menu);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

/**
 * BreadCrumbMenu
 */
var BreadCrumbMenu = function (_Widget) {
    _inherits(BreadCrumbMenu, _Widget);

    function BreadCrumbMenu() {
        _classCallCheck(this, BreadCrumbMenu);

        return _possibleConstructorReturn(this, (BreadCrumbMenu.__proto__ || Object.getPrototypeOf(BreadCrumbMenu)).apply(this, arguments));
    }

    _createClass(BreadCrumbMenu, [{
        key: 'render',
        value: function render() {

            return _runtime.View.render(_menu2.default, this);
        }
    }]);

    return BreadCrumbMenu;
}(_runtime.Widget);

exports.default = BreadCrumbMenu;

},{"./wml/menu.wml":6,"wmljs/lib/runtime":32}],5:[function(require,module,exports){
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
},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (make) {
  return make.node('ol', { html: { 'class': "breadcrumb" } }, [make.resolve(this, 'children')]);
};

module.exports = exports['default'];
},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BreadCrumb = exports.BreadCrumbMenu = undefined;

var _BreadCrumbMenu2 = require('./breadcrumbs/BreadCrumbMenu');

var _BreadCrumbMenu3 = _interopRequireDefault(_BreadCrumbMenu2);

var _BreadCrumb2 = require('./breadcrumbs/BreadCrumb');

var _BreadCrumb3 = _interopRequireDefault(_BreadCrumb2);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.BreadCrumbMenu = _BreadCrumbMenu3.default; /* jshint ignore:start */

exports.BreadCrumb = _BreadCrumb3.default;
/* jshint ignore:end */

},{"./breadcrumbs/BreadCrumb":3,"./breadcrumbs/BreadCrumbMenu":4}],8:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _runtime = require('wmljs/lib/runtime');

var _account_area = require('./wml/account_area.wml');

var _account_area2 = _interopRequireDefault(_account_area);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

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

},{"./wml/account_area.wml":9,"wmljs/lib/runtime":32}],9:[function(require,module,exports){
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
},{"wat-classes":27}],10:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _runtime = require('wmljs/lib/runtime');

var _action_area = require('./wml/action_area.wml');

var _action_area2 = _interopRequireDefault(_action_area);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

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

    _createClass(ActionArea, [{
        key: 'render',
        value: function render() {

            return this.view.render();
        }
    }]);

    return ActionArea;
}(_runtime.Widget);

exports.default = ActionArea;

},{"./wml/action_area.wml":11,"wmljs/lib/runtime":32}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (make) {
  return make.node('div', { html: { 'class': make.resolve(Class, 'LAYOUT_ACTION_AREA') } }, [make.widget(_MenuButton2.default, { html: {}, wat: { 'onClick': this.attributes.read('wat:onMenuButtonClicked', make.resolve(this, 'noop')) } }, []), make.node('div', { html: { 'class': make.resolve(Class, 'LAYOUT_ACTION_AREA_CONTENT') } }, [make.resolve(this, 'children')])]);
};

var _MenuButton = require("../../menu-button/MenuButton");

var _MenuButton2 = _interopRequireDefault(_MenuButton);

var _watClasses = require("wat-classes");

var Class = _interopRequireWildcard(_watClasses);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports["default"];
},{"../../menu-button/MenuButton":21,"wat-classes":27}],12:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _runtime = require('wmljs/lib/runtime');

var _banner = require('./wml/banner.wml');

var _banner2 = _interopRequireDefault(_banner);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

/**
 * Banner
 */
var Banner = function (_Widget) {
    _inherits(Banner, _Widget);

    function Banner() {
        _classCallCheck(this, Banner);

        return _possibleConstructorReturn(this, (Banner.__proto__ || Object.getPrototypeOf(Banner)).apply(this, arguments));
    }

    _createClass(Banner, [{
        key: 'render',
        value: function render() {

            return _runtime.View.render(_banner2.default, this);
        }
    }]);

    return Banner;
}(_runtime.Widget);

exports.default = Banner;

},{"./wml/banner.wml":13,"wmljs/lib/runtime":32}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (make) {
  return make.node('header', { html: { 'class': make.resolve(Class, 'LAYOUT_BANNER') } }, [make.$if(this.attributes.read('wat:image', false), function if_0() {
    return [make.node('h1', { html: {} }, [make.node('a', { html: { 'href': this.attributes.read('wat:href', '#') } }, [make.node('img', { html: { 'class': make.resolve(Class, 'LAYOUT_BANNER_IMAGE'), 'src': this.attributes.read('wat:image'), 'alt': "banner" } }, [])])])];
  }.bind(this), function else_0() {
    return [];
  }.bind(this))]);
};

var _watClasses = require('wat-classes');

var Class = _interopRequireWildcard(_watClasses);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

module.exports = exports['default'];
},{"wat-classes":27}],14:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _runtime = require('wmljs/lib/runtime');

var _container = require('./wml/container.wml');

var _container2 = _interopRequireDefault(_container);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

/**
 * Container provides the widget that wraps all the content together (Drawer and content area).
 */
var Container = function (_Widget) {
    _inherits(Container, _Widget);

    function Container() {
        _classCallCheck(this, Container);

        return _possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).apply(this, arguments));
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

},{"./wml/container.wml":15,"wmljs/lib/runtime":32}],15:[function(require,module,exports){
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
},{"wat-classes":27}],16:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _runtime = require('wmljs/lib/runtime');

var _drawer = require('./wml/drawer.wml');

var _drawer2 = _interopRequireDefault(_drawer);

var _watClasses = require('wat-classes');

var Class = _interopRequireWildcard(_watClasses);

function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    } else {
        var newObj = {};if (obj != null) {
            for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
            }
        }newObj.default = obj;return newObj;
    }
}

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

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

},{"./wml/drawer.wml":17,"wat-classes":27,"wmljs/lib/runtime":32}],17:[function(require,module,exports){
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
},{"wat-classes":27}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AccountArea = exports.SideNavigationItem = exports.SideNavigation = exports.Banner = exports.MenuButton = exports.ActionArea = exports.Main = exports.Drawer = exports.Container = undefined;

var _Container2 = require('./container/Container');

var _Container3 = _interopRequireDefault(_Container2);

var _Drawer2 = require('./drawer/Drawer');

var _Drawer3 = _interopRequireDefault(_Drawer2);

var _Main2 = require('./main/Main');

var _Main3 = _interopRequireDefault(_Main2);

var _ActionArea2 = require('./action-area/ActionArea');

var _ActionArea3 = _interopRequireDefault(_ActionArea2);

var _MenuButton2 = require('./menu-button/MenuButton');

var _MenuButton3 = _interopRequireDefault(_MenuButton2);

var _Banner2 = require('./banner/Banner');

var _Banner3 = _interopRequireDefault(_Banner2);

var _SideNavigation2 = require('./side-navigation/SideNavigation');

var _SideNavigation3 = _interopRequireDefault(_SideNavigation2);

var _SideNavigationItem2 = require('./side-navigation/SideNavigationItem');

var _SideNavigationItem3 = _interopRequireDefault(_SideNavigationItem2);

var _AccountArea2 = require('./account-area/AccountArea');

var _AccountArea3 = _interopRequireDefault(_AccountArea2);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.Container = _Container3.default; /* jshint ignore:start */

exports.Drawer = _Drawer3.default;
exports.Main = _Main3.default;
exports.ActionArea = _ActionArea3.default;
exports.MenuButton = _MenuButton3.default;
exports.Banner = _Banner3.default;
exports.SideNavigation = _SideNavigation3.default;
exports.SideNavigationItem = _SideNavigationItem3.default;
exports.AccountArea = _AccountArea3.default;
/* jshint ignore:end */

},{"./account-area/AccountArea":8,"./action-area/ActionArea":10,"./banner/Banner":12,"./container/Container":14,"./drawer/Drawer":16,"./main/Main":19,"./menu-button/MenuButton":21,"./side-navigation/SideNavigation":23,"./side-navigation/SideNavigationItem":24}],19:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _runtime = require('wmljs/lib/runtime');

var _main = require('./wml/main.wml');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

/**
 * Main area for content in the layout.
 */
var Main = function (_Widget) {
    _inherits(Main, _Widget);

    function Main() {
        _classCallCheck(this, Main);

        return _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).apply(this, arguments));
    }

    _createClass(Main, [{
        key: 'render',
        value: function render() {

            return _runtime.View.render(_main2.default, this);
        }
    }]);

    return Main;
}(_runtime.Widget);

exports.default = Main;

},{"./wml/main.wml":20,"wmljs/lib/runtime":32}],20:[function(require,module,exports){
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
},{"wat-classes":27}],21:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _runtime = require('wmljs/lib/runtime');

var _menu_button = require('./wml/menu_button.wml');

var _menu_button2 = _interopRequireDefault(_menu_button);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

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

},{"./wml/menu_button.wml":22,"wmljs/lib/runtime":32}],22:[function(require,module,exports){
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
},{"wat-classes":27}],23:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _runtime = require('wmljs/lib/runtime');

var _side_navigation = require('./wml/side_navigation.wml');

var _side_navigation2 = _interopRequireDefault(_side_navigation);

var _watClasses = require('wat-classes');

var Class = _interopRequireWildcard(_watClasses);

function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    } else {
        var newObj = {};if (obj != null) {
            for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
            }
        }newObj.default = obj;return newObj;
    }
}

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

/**
 * SideNavigationItem
 */
var SideNavigation = function (_Widget) {
    _inherits(SideNavigation, _Widget);

    function SideNavigation(attrs, children) {
        _classCallCheck(this, SideNavigation);

        var _this = _possibleConstructorReturn(this, (SideNavigation.__proto__ || Object.getPrototypeOf(SideNavigation)).call(this, attrs, children));

        _this.view = new _runtime.View(_side_navigation2.default, _this);

        return _this;
    }

    _createClass(SideNavigation, [{
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

    return SideNavigation;
}(_runtime.Widget);

exports.default = SideNavigation;

},{"./wml/side_navigation.wml":25,"wat-classes":27,"wmljs/lib/runtime":32}],24:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _runtime = require('wmljs/lib/runtime');

var _watClasses = require('wat-classes');

var Class = _interopRequireWildcard(_watClasses);

var _side_navigation_item = require('./wml/side_navigation_item.wml');

var _side_navigation_item2 = _interopRequireDefault(_side_navigation_item);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    } else {
        var newObj = {};if (obj != null) {
            for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
            }
        }newObj.default = obj;return newObj;
    }
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

/**
 * SideNavigationItem
 */
var SideNavigationItem = function (_Widget) {
    _inherits(SideNavigationItem, _Widget);

    function SideNavigationItem(attrs, children) {
        _classCallCheck(this, SideNavigationItem);

        var _this = _possibleConstructorReturn(this, (SideNavigationItem.__proto__ || Object.getPrototypeOf(SideNavigationItem)).call(this, attrs, children));

        _this.view = new _runtime.View(_side_navigation_item2.default, _this);

        return _this;
    }

    /**
     * add the active state of this SideNavigationItem
     */

    _createClass(SideNavigationItem, [{
        key: 'active',
        value: function active() {

            this.view.findById('a').classList.remove(Class.ACTIVE);
            this.view.findById('a').classList.add(Class.ACTIVE);
        }
    }, {
        key: 'clicked',
        value: function clicked() {

            this.attributes.read('wat:onClick', function () {})(this);
        }
    }, {
        key: 'render',
        value: function render() {

            return this.view.render();
        }
    }]);

    return SideNavigationItem;
}(_runtime.Widget);

exports.default = SideNavigationItem;

},{"./wml/side_navigation_item.wml":26,"wat-classes":27,"wmljs/lib/runtime":32}],25:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (make) {
  return make.node('nav', { html: { 'class': make.resolve(Class, 'LAYOUT_SIDE_NAVIGATION') }, wml: { 'id': "nav" } }, [make.resolve(this, 'children')]);
};

var _watClasses = require('wat-classes');

var Class = _interopRequireWildcard(_watClasses);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

module.exports = exports['default'];
},{"wat-classes":27}],26:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (make) {
  return make.node('a', { html: { 'class': this.attributes.read('wat:active', false) ? make.resolve(Class, 'ACTIVE') : '', 'href': this.attributes.read('wat:href'), 'onclick': this.clicked.bind(this) }, wml: { 'id': "a" } }, [make.$if(this.attributes.read('wat:icon-class', false), function if_0() {
    return [make.node('i', { html: { 'class': make.resolve(Class, 'LAYOUT_SIDE_NAVIGATION_ICON') + this.attributes.read('wat:icon-class') } }, [])];
  }.bind(this), function else_0() {
    return [];
  }.bind(this)), this.attributes.read('wat:title'), make.resolve(this, 'children')]);
};

var _watClasses = require('wat-classes');

var Class = _interopRequireWildcard(_watClasses);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

module.exports = exports['default'];
},{"wat-classes":27}],27:[function(require,module,exports){
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
var LAYOUT_SIDE_NAVIGATION = exports.LAYOUT_SIDE_NAVIGATION = 'wat-layout-side-navigation';
var LAYOUT_SIDE_NAVIGATION_TITLE = exports.LAYOUT_SIDE_NAVIGATION_TITLE = 'wat-layout-side-navigation-title';
var LAYOUT_ACCOUNT_AREA = exports.LAYOUT_ACCOUNT_AREA = 'wat-layout-account-area';
var LAYOUT_ACCOUNT_AREA_TITLE = exports.LAYOUT_ACCOUNT_AREA_TITLE = 'wat-layout-account-area-title';
var LAYOUT_ACCOUNT_AREA_TOGGLE = exports.LAYOUT_ACCOUNT_AREA_TOGGLE = 'wat-layout-account-area-toggle';

},{}],28:[function(require,module,exports){
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

},{"property-seek":33}],29:[function(require,module,exports){
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

},{"./Attributes":28,"property-seek":33}],30:[function(require,module,exports){
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

},{"./Maker":29}],31:[function(require,module,exports){
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

},{}],32:[function(require,module,exports){
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

},{"./Attributes":28,"./View":30,"./Widget":31}],33:[function(require,module,exports){
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

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJleGFtcGxlcy9zcmMvbGF5b3V0L3dtbC9sYXlvdXQud21sIiwiZXhhbXBsZXMvc3JjL2luZGV4LmpzIiwic3JjL2NvbXBvbmVudHMvYnJlYWRjcnVtYnMvQnJlYWRDcnVtYi5qcyIsInNyYy9jb21wb25lbnRzL2JyZWFkY3J1bWJzL0JyZWFkQ3J1bWJNZW51LmpzIiwibGliL2NvbXBvbmVudHMvYnJlYWRjcnVtYnMvd21sL2l0ZW0ud21sIiwibGliL2NvbXBvbmVudHMvYnJlYWRjcnVtYnMvd21sL21lbnUud21sIiwic3JjL2NvbXBvbmVudHMvaW5kZXguanMiLCJzcmMvbGF5b3V0L2FjY291bnQtYXJlYS9BY2NvdW50QXJlYS5qcyIsImxpYi9sYXlvdXQvYWNjb3VudC1hcmVhL3dtbC9hY2NvdW50X2FyZWEud21sIiwic3JjL2xheW91dC9hY3Rpb24tYXJlYS9BY3Rpb25BcmVhLmpzIiwibGliL2xheW91dC9hY3Rpb24tYXJlYS93bWwvYWN0aW9uX2FyZWEud21sIiwic3JjL2xheW91dC9iYW5uZXIvQmFubmVyLmpzIiwibGliL2xheW91dC9iYW5uZXIvd21sL2Jhbm5lci53bWwiLCJzcmMvbGF5b3V0L2NvbnRhaW5lci9Db250YWluZXIuanMiLCJsaWIvbGF5b3V0L2NvbnRhaW5lci93bWwvY29udGFpbmVyLndtbCIsInNyYy9sYXlvdXQvZHJhd2VyL0RyYXdlci5qcyIsImxpYi9sYXlvdXQvZHJhd2VyL3dtbC9kcmF3ZXIud21sIiwic3JjL2xheW91dC9pbmRleC5qcyIsInNyYy9sYXlvdXQvbWFpbi9NYWluLmpzIiwibGliL2xheW91dC9tYWluL3dtbC9tYWluLndtbCIsInNyYy9sYXlvdXQvbWVudS1idXR0b24vTWVudUJ1dHRvbi5qcyIsImxpYi9sYXlvdXQvbWVudS1idXR0b24vd21sL21lbnVfYnV0dG9uLndtbCIsInNyYy9sYXlvdXQvc2lkZS1uYXZpZ2F0aW9uL1NpZGVOYXZpZ2F0aW9uLmpzIiwic3JjL2xheW91dC9zaWRlLW5hdmlnYXRpb24vU2lkZU5hdmlnYXRpb25JdGVtLmpzIiwibGliL2xheW91dC9zaWRlLW5hdmlnYXRpb24vd21sL3NpZGVfbmF2aWdhdGlvbi53bWwiLCJsaWIvbGF5b3V0L3NpZGUtbmF2aWdhdGlvbi93bWwvc2lkZV9uYXZpZ2F0aW9uX2l0ZW0ud21sIiwiLi4vc3JjL2xpYi93YXQtY2xhc3Nlcy9pbmRleC5qcyIsIi4uL3dtbC9zcmMvcnVudGltZS9BdHRyaWJ1dGVzLmpzIiwiLi4vd21sL3NyYy9ydW50aW1lL01ha2VyLmpzIiwiLi4vd21sL3NyYy9ydW50aW1lL1ZpZXcuanMiLCIuLi93bWwvc3JjL3J1bnRpbWUvV2lkZ2V0LmpzIiwiLi4vd21sL3NyYy9ydW50aW1lL2luZGV4LmpzIiwiLi4vd21sL25vZGVfbW9kdWxlcy9wcm9wZXJ0eS1zZWVrL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3RCQTs7QUFDQTs7Ozs7O0FBRUEsSUFBTSxVQUFVO0FBRVoscUJBRlksK0JBRVE7O0FBRWhCLGVBQU8sU0FBUCxDQUFpQixRQUFqQixDQUEwQixRQUExQixFQUFvQyxNQUFwQztBQUVIO0FBTlcsQ0FBaEI7O0FBVUEsT0FBTyxTQUFQLEdBQW1CLG9DQUFpQixPQUFqQixDQUFuQjtBQUNBLFNBQVMsSUFBVCxDQUFjLFlBQWQsQ0FBMkIsVUFBVSxNQUFWLEVBQTNCLEVBQStDLFNBQVMsSUFBVCxDQUFjLFVBQTdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNkQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQTs7O0ksQUFHTTs7Ozs7Ozs7Ozs7aUNBRU8sQUFFTDs7bUJBQU8sY0FBQSxBQUFLLHVC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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAobWFrZSkge1xuICByZXR1cm4gbWFrZS53aWRnZXQoX2xheW91dC5Db250YWluZXIsIHsgaHRtbDoge30gfSwgW21ha2Uud2lkZ2V0KF9sYXlvdXQuRHJhd2VyLCB7IGh0bWw6IHt9LCB3bWw6IHsgJ2lkJzogXCJkcmF3ZXJcIiB9IH0sIFttYWtlLndpZGdldChfbGF5b3V0LkJhbm5lciwgeyBodG1sOiB7fSwgd2F0OiB7ICdpbWFnZSc6IFwiaW1nL2xvZ28uc3ZnXCIgfSB9LCBbXSksIG1ha2Uud2lkZ2V0KF9sYXlvdXQuU2lkZU5hdmlnYXRpb24sIHsgaHRtbDoge30gfSwgW21ha2Uud2lkZ2V0KF9sYXlvdXQuU2lkZU5hdmlnYXRpb25JdGVtLCB7IGh0bWw6IHt9LCB3YXQ6IHsgJ2hyZWYnOiBcIiMvZGFzaGJvYXJkXCIsICd0aXRsZSc6IFwiRGFzaGJvYXJkXCIsICdhY3RpdmUnOiBtYWtlLnJlc29sdmUod2luZG93LCAnbG9jYXRpb24uaGFzaCcpID09PSAnIy9kYXNoYm9hcmQnLCAnb25DbGljayc6IGZ1bmN0aW9uIGZ1bmN0aW9uX2xpdGVyYWxfMShpKSB7XG4gICAgICAgIHJldHVybiBpLmFjdGl2ZSgpO1xuICAgICAgfS5iaW5kKHRoaXMpIH0gfSwgW10pLCBtYWtlLndpZGdldChfbGF5b3V0LlNpZGVOYXZpZ2F0aW9uSXRlbSwgeyBodG1sOiB7fSwgd2F0OiB7ICdocmVmJzogXCIjL21lc3NhZ2VzXCIsICd0aXRsZSc6IFwiTWVzc2FnZXNcIiwgJ2FjdGl2ZSc6IG1ha2UucmVzb2x2ZSh3aW5kb3csICdsb2NhdGlvbi5oYXNoJykgPT09ICcjL21lc3NhZ2VzJywgJ29uQ2xpY2snOiBmdW5jdGlvbiBmdW5jdGlvbl9saXRlcmFsXzIoaSkge1xuICAgICAgICByZXR1cm4gaS5hY3RpdmUoKTtcbiAgICAgIH0uYmluZCh0aGlzKSB9IH0sIFtdKSwgbWFrZS53aWRnZXQoX2xheW91dC5TaWRlTmF2aWdhdGlvbkl0ZW0sIHsgaHRtbDoge30sIHdhdDogeyAnaHJlZic6IFwiIy9pbnZvaWNlc1wiLCAndGl0bGUnOiBcIkludm9pY2VzXCIsICdhY3RpdmUnOiBtYWtlLnJlc29sdmUod2luZG93LCAnbG9jYXRpb24uaGFzaCcpID09PSAnIy9pbnZvaWNlcycsICdvbkNsaWNrJzogZnVuY3Rpb24gZnVuY3Rpb25fbGl0ZXJhbF8zKGkpIHtcbiAgICAgICAgcmV0dXJuIGkuYWN0aXZlKCk7XG4gICAgICB9LmJpbmQodGhpcykgfSB9LCBbXSksIG1ha2Uud2lkZ2V0KF9sYXlvdXQuU2lkZU5hdmlnYXRpb25JdGVtLCB7IGh0bWw6IHt9LCB3YXQ6IHsgJ2hyZWYnOiBcIiMvc2V0dGluZ3NcIiwgJ3RpdGxlJzogXCJTZXR0aW5nc1wiLCAnYWN0aXZlJzogbWFrZS5yZXNvbHZlKHdpbmRvdywgJ2xvY2F0aW9uLmhhc2gnKSA9PT0gJyMvc2V0dGluZ3MnLCAnb25DbGljayc6IGZ1bmN0aW9uIGZ1bmN0aW9uX2xpdGVyYWxfNChpKSB7XG4gICAgICAgIHJldHVybiBpLmFjdGl2ZSgpO1xuICAgICAgfS5iaW5kKHRoaXMpIH0gfSwgW10pXSksIG1ha2Uud2lkZ2V0KF9sYXlvdXQuQWNjb3VudEFyZWEsIHsgaHRtbDoge30sIHdhdDogeyAndGl0bGUnOiBcIkphbmUgSm9lXCIgfSB9LCBbXSldKSwgbWFrZS53aWRnZXQoX2xheW91dC5NZW51QnV0dG9uLCB7IGh0bWw6IHt9LCB3YXQ6IHsgJ29uQ2xpY2snOiB0aGlzLm1lbnVCdXR0b25DbGlja2VkLmJpbmQodGhpcykgfSB9LCBbXSksIG1ha2Uud2lkZ2V0KF9sYXlvdXQuQWN0aW9uQXJlYSwgeyBodG1sOiB7fSwgd2F0OiB7ICdvbk1lbnVCdXR0b25DbGlja2VkJzogdGhpcy5tZW51QnV0dG9uQ2xpY2tlZC5iaW5kKHRoaXMpIH0gfSwgW21ha2Uubm9kZSgnaDMnLCB7IGh0bWw6IHsgJ2NsYXNzJzogXCJtYWluLWNvbnRlbnRcIiB9IH0sIFttYWtlLndpZGdldChfY29tcG9uZW50cy5CcmVhZENydW1iTWVudSwgeyBodG1sOiB7fSB9LCBbbWFrZS53aWRnZXQoX2NvbXBvbmVudHMuQnJlYWRDcnVtYiwgeyBodG1sOiB7fSwgd2F0OiB7ICdocmVmJzogXCIjXCIgfSB9LCBbbWFrZS50ZXh0KCdIb21lJyldKSwgbWFrZS53aWRnZXQoX2NvbXBvbmVudHMuQnJlYWRDcnVtYiwgeyBodG1sOiB7fSwgd2F0OiB7ICdocmVmJzogXCIjXCIsICdhY3RpdmUnOiB0cnVlIH0gfSwgW21ha2UudGV4dCgnRXhhbXBsZScpXSldKV0pLCBtYWtlLm5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiBcInNlY29uZGFyeS1jb250ZW50XCIgfSB9LCBbbWFrZS5ub2RlKCdidXR0b24nLCB7IGh0bWw6IHsgJ2NsYXNzJzogXCJidG4gYnRuLWRlZmF1bHRcIiB9IH0sIFttYWtlLnRleHQoJ0xlZnQnKV0pLCBtYWtlLm5vZGUoJ2J1dHRvbicsIHsgaHRtbDogeyAnY2xhc3MnOiBcImJ0biBidG4tZGVmYXVsdFwiIH0gfSwgW21ha2UudGV4dCgnUmlnaHQnKV0pLCBtYWtlLm5vZGUoJ2J1dHRvbicsIHsgaHRtbDogeyAnY2xhc3MnOiBcImJ0biBidG4tcHJpbWFyeVwiIH0gfSwgW21ha2UudGV4dCgnU2F2ZScpXSldKV0pLCBtYWtlLndpZGdldChfbGF5b3V0Lk1haW4sIHsgaHRtbDoge30gfSwgW10pXSk7XG59O1xuXG52YXIgX2xheW91dCA9IHJlcXVpcmUoJy4uLy4uLy4uLy4uL2xpYi9sYXlvdXQnKTtcblxudmFyIF9jb21wb25lbnRzID0gcmVxdWlyZSgnLi4vLi4vLi4vLi4vbGliL2NvbXBvbmVudHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiaW1wb3J0IHsgVmlldyB9IGZyb20gJ3dtbGpzL2xpYi9ydW50aW1lJztcbmltcG9ydCBsYXlvdXQgZnJvbSAnLi93bWwvbGF5b3V0LndtbCc7XG5cbmNvbnN0IGNvbnRleHQgPSB7XG5cbiAgICBtZW51QnV0dG9uQ2xpY2tlZCgpIHtcblxuICAgICAgICB3aW5kb3cud2F0TGF5b3V0LmZpbmRCeUlkKCdkcmF3ZXInKS50b2dnbGUoKTtcblxuICAgIH1cblxufTtcblxud2luZG93LndhdExheW91dCA9IG5ldyBWaWV3KGxheW91dCwgY29udGV4dCk7XG5kb2N1bWVudC5ib2R5Lmluc2VydEJlZm9yZSh3YXRMYXlvdXQucmVuZGVyKCksIGRvY3VtZW50LmJvZHkuZmlyc3RDaGlsZCk7XG4iLCJpbXBvcnQgeyBWaWV3LCBXaWRnZXQgfSBmcm9tICd3bWxqcy9saWIvcnVudGltZSc7XG5pbXBvcnQgaXRlbSBmcm9tICcuL3dtbC9pdGVtLndtbCc7XG5cbi8qKlxuICogQnJlYWRDcnVtYlxuICovXG5jbGFzcyBCcmVhZENydW1iIGV4dGVuZHMgV2lkZ2V0IHtcblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gVmlldy5yZW5kZXIoaXRlbSwgdGhpcyk7XG5cbiAgICB9XG5cbn1cbmV4cG9ydCBkZWZhdWx0IEJyZWFkQ3J1bWJcblxuIiwiaW1wb3J0IHsgVmlldywgV2lkZ2V0IH0gZnJvbSAnd21sanMvbGliL3J1bnRpbWUnO1xuaW1wb3J0IG1lbnUgZnJvbSAnLi93bWwvbWVudS53bWwnO1xuXG4vKipcbiAqIEJyZWFkQ3J1bWJNZW51XG4gKi9cbmNsYXNzIEJyZWFkQ3J1bWJNZW51IGV4dGVuZHMgV2lkZ2V0IHtcblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gVmlldy5yZW5kZXIobWVudSwgdGhpcyk7XG5cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJyZWFkQ3J1bWJNZW51XG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChtYWtlKSB7XG4gIHJldHVybiBtYWtlLm5vZGUoJ2xpJywgeyBodG1sOiB7fSB9LCBbbWFrZS4kaWYodGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDphY3RpdmUnLCBmYWxzZSksIGZ1bmN0aW9uIGlmXzAoKSB7XG4gICAgcmV0dXJuIFttYWtlLnJlc29sdmUodGhpcywgJ2NoaWxkcmVuJyldO1xuICB9LmJpbmQodGhpcyksIGZ1bmN0aW9uIGVsc2VfMCgpIHtcbiAgICByZXR1cm4gW21ha2Uubm9kZSgnYScsIHsgaHRtbDogeyAnaHJlZic6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3YXQ6aHJlZicsICcjJykgfSB9LCBbbWFrZS5yZXNvbHZlKHRoaXMsICdjaGlsZHJlbicpXSldO1xuICB9LmJpbmQodGhpcykpXSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChtYWtlKSB7XG4gIHJldHVybiBtYWtlLm5vZGUoJ29sJywgeyBodG1sOiB7ICdjbGFzcyc6IFwiYnJlYWRjcnVtYlwiIH0gfSwgW21ha2UucmVzb2x2ZSh0aGlzLCAnY2hpbGRyZW4nKV0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiLyoganNoaW50IGlnbm9yZTpzdGFydCAqL1xuZXhwb3J0IEJyZWFkQ3J1bWJNZW51IGZyb20gJy4vYnJlYWRjcnVtYnMvQnJlYWRDcnVtYk1lbnUnO1xuZXhwb3J0IEJyZWFkQ3J1bWIgZnJvbSAnLi9icmVhZGNydW1icy9CcmVhZENydW1iJztcbi8qIGpzaGludCBpZ25vcmU6ZW5kICovXG4iLCJpbXBvcnQgeyBWaWV3LCBXaWRnZXQgfSBmcm9tICd3bWxqcy9saWIvcnVudGltZSc7XG5pbXBvcnQgYWNjb3VudF9hcmVhIGZyb20gJy4vd21sL2FjY291bnRfYXJlYS53bWwnO1xuXG4vKipcbiAqIEFjY291bnRBcmVhXG4gKi9cbmNsYXNzIEFjY291bnRBcmVhIGV4dGVuZHMgV2lkZ2V0IHtcblxuICAgIHRvZ2dsZSgpIHtcblxuXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiBWaWV3LnJlbmRlcihhY2NvdW50X2FyZWEsIHRoaXMpO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEFjY291bnRBcmVhXG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChtYWtlKSB7XG4gIHJldHVybiBtYWtlLm5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiBtYWtlLnJlc29sdmUoQ2xhc3MsICdMQVlPVVRfQUNDT1VOVF9BUkVBJykgfSwgd21sOiB7ICdpZCc6IFwicm9vdFwiIH0gfSwgW21ha2Uubm9kZSgnYnV0dG9uJywgeyBodG1sOiB7ICdvbmNsaWNrJzogdGhpcy50b2dnbGUuYmluZCh0aGlzKSB9IH0sIFttYWtlLm5vZGUoJ3NwYW4nLCB7IGh0bWw6IHsgJ2NsYXNzJzogbWFrZS5yZXNvbHZlKENsYXNzLCAnTEFZT1VUX0FDQ09VTlRfQVJFQV9USVRMRScpIH0gfSwgW3RoaXMuYXR0cmlidXRlcy5yZWFkKCd3YXQ6dGl0bGUnKV0pXSksIG1ha2UucmVzb2x2ZSh0aGlzLCAnY2hpbGRyZW4nKV0pO1xufTtcblxudmFyIF93YXRDbGFzc2VzID0gcmVxdWlyZSgnd2F0LWNsYXNzZXMnKTtcblxudmFyIENsYXNzID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX3dhdENsYXNzZXMpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChvYmopIHsgaWYgKG9iaiAmJiBvYmouX19lc01vZHVsZSkgeyByZXR1cm4gb2JqOyB9IGVsc2UgeyB2YXIgbmV3T2JqID0ge307IGlmIChvYmogIT0gbnVsbCkgeyBmb3IgKHZhciBrZXkgaW4gb2JqKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSBuZXdPYmpba2V5XSA9IG9ialtrZXldOyB9IH0gbmV3T2JqLmRlZmF1bHQgPSBvYmo7IHJldHVybiBuZXdPYmo7IH0gfVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCJpbXBvcnQgeyBWaWV3LCBXaWRnZXQgfSBmcm9tICd3bWxqcy9saWIvcnVudGltZSc7XG5pbXBvcnQgYWN0aW9uX2FyZWEgZnJvbSAnLi93bWwvYWN0aW9uX2FyZWEud21sJztcblxuLyoqXG4gKiBBY3Rpb25BcmVhXG4gKi9cbmNsYXNzIEFjdGlvbkFyZWEgZXh0ZW5kcyBXaWRnZXQge1xuXG4gICAgY29uc3RydWN0b3IoYXR0cnMsIGNoaWxkcmVuKSB7XG5cbiAgICAgICAgc3VwZXIoYXR0cnMsIGNoaWxkcmVuKTtcblxuICAgICAgICB0aGlzLnZpZXcgPSBuZXcgVmlldyhhY3Rpb25fYXJlYSwgdGhpcyk7XG5cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMudmlldy5yZW5kZXIoKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBBY3Rpb25BcmVhXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKG1ha2UpIHtcbiAgcmV0dXJuIG1ha2Uubm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6IG1ha2UucmVzb2x2ZShDbGFzcywgJ0xBWU9VVF9BQ1RJT05fQVJFQScpIH0gfSwgW21ha2Uud2lkZ2V0KF9NZW51QnV0dG9uMi5kZWZhdWx0LCB7IGh0bWw6IHt9LCB3YXQ6IHsgJ29uQ2xpY2snOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd2F0Om9uTWVudUJ1dHRvbkNsaWNrZWQnLCBtYWtlLnJlc29sdmUodGhpcywgJ25vb3AnKSkgfSB9LCBbXSksIG1ha2Uubm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6IG1ha2UucmVzb2x2ZShDbGFzcywgJ0xBWU9VVF9BQ1RJT05fQVJFQV9DT05URU5UJykgfSB9LCBbbWFrZS5yZXNvbHZlKHRoaXMsICdjaGlsZHJlbicpXSldKTtcbn07XG5cbnZhciBfTWVudUJ1dHRvbiA9IHJlcXVpcmUoXCIuLi8uLi9tZW51LWJ1dHRvbi9NZW51QnV0dG9uXCIpO1xuXG52YXIgX01lbnVCdXR0b24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfTWVudUJ1dHRvbik7XG5cbnZhciBfd2F0Q2xhc3NlcyA9IHJlcXVpcmUoXCJ3YXQtY2xhc3Nlc1wiKTtcblxudmFyIENsYXNzID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX3dhdENsYXNzZXMpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChvYmopIHsgaWYgKG9iaiAmJiBvYmouX19lc01vZHVsZSkgeyByZXR1cm4gb2JqOyB9IGVsc2UgeyB2YXIgbmV3T2JqID0ge307IGlmIChvYmogIT0gbnVsbCkgeyBmb3IgKHZhciBrZXkgaW4gb2JqKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSBuZXdPYmpba2V5XSA9IG9ialtrZXldOyB9IH0gbmV3T2JqLmRlZmF1bHQgPSBvYmo7IHJldHVybiBuZXdPYmo7IH0gfVxuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdOyIsImltcG9ydCB7VmlldywgV2lkZ2V0fSBmcm9tICd3bWxqcy9saWIvcnVudGltZSc7XG5pbXBvcnQgYmFubmVyIGZyb20gJy4vd21sL2Jhbm5lci53bWwnO1xuXG4vKipcbiAqIEJhbm5lclxuICovXG5jbGFzcyBCYW5uZXIgZXh0ZW5kcyBXaWRnZXQge1xuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiBWaWV3LnJlbmRlcihiYW5uZXIsIHRoaXMpO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEJhbm5lclxuXG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChtYWtlKSB7XG4gIHJldHVybiBtYWtlLm5vZGUoJ2hlYWRlcicsIHsgaHRtbDogeyAnY2xhc3MnOiBtYWtlLnJlc29sdmUoQ2xhc3MsICdMQVlPVVRfQkFOTkVSJykgfSB9LCBbbWFrZS4kaWYodGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDppbWFnZScsIGZhbHNlKSwgZnVuY3Rpb24gaWZfMCgpIHtcbiAgICByZXR1cm4gW21ha2Uubm9kZSgnaDEnLCB7IGh0bWw6IHt9IH0sIFttYWtlLm5vZGUoJ2EnLCB7IGh0bWw6IHsgJ2hyZWYnOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd2F0OmhyZWYnLCAnIycpIH0gfSwgW21ha2Uubm9kZSgnaW1nJywgeyBodG1sOiB7ICdjbGFzcyc6IG1ha2UucmVzb2x2ZShDbGFzcywgJ0xBWU9VVF9CQU5ORVJfSU1BR0UnKSwgJ3NyYyc6IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3YXQ6aW1hZ2UnKSwgJ2FsdCc6IFwiYmFubmVyXCIgfSB9LCBbXSldKV0pXTtcbiAgfS5iaW5kKHRoaXMpLCBmdW5jdGlvbiBlbHNlXzAoKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9LmJpbmQodGhpcykpXSk7XG59O1xuXG52YXIgX3dhdENsYXNzZXMgPSByZXF1aXJlKCd3YXQtY2xhc3NlcycpO1xuXG52YXIgQ2xhc3MgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfd2F0Q2xhc3Nlcyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKG9iaikgeyBpZiAob2JqICYmIG9iai5fX2VzTW9kdWxlKSB7IHJldHVybiBvYmo7IH0gZWxzZSB7IHZhciBuZXdPYmogPSB7fTsgaWYgKG9iaiAhPSBudWxsKSB7IGZvciAodmFyIGtleSBpbiBvYmopIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIG5ld09ialtrZXldID0gb2JqW2tleV07IH0gfSBuZXdPYmouZGVmYXVsdCA9IG9iajsgcmV0dXJuIG5ld09iajsgfSB9XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsImltcG9ydCB7IFZpZXcsIFdpZGdldCB9IGZyb20gJ3dtbGpzL2xpYi9ydW50aW1lJztcbmltcG9ydCBjb250YWluZXIgZnJvbSAnLi93bWwvY29udGFpbmVyLndtbCc7XG5cbi8qKlxuICogQ29udGFpbmVyIHByb3ZpZGVzIHRoZSB3aWRnZXQgdGhhdCB3cmFwcyBhbGwgdGhlIGNvbnRlbnQgdG9nZXRoZXIgKERyYXdlciBhbmQgY29udGVudCBhcmVhKS5cbiAqL1xuY2xhc3MgQ29udGFpbmVyIGV4dGVuZHMgV2lkZ2V0IHtcblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gVmlldy5yZW5kZXIoY29udGFpbmVyLCB0aGlzKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBDb250YWluZXJcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKG1ha2UpIHtcbiAgcmV0dXJuIG1ha2Uubm9kZSgnZGl2JywgeyBodG1sOiB7ICdjbGFzcyc6IG1ha2UucmVzb2x2ZShDbGFzcywgJ0xBWU9VVF9DT05UQUlORVInKSB9IH0sIFttYWtlLnJlc29sdmUodGhpcywgJ2NoaWxkcmVuJyldKTtcbn07XG5cbnZhciBfd2F0Q2xhc3NlcyA9IHJlcXVpcmUoJ3dhdC1jbGFzc2VzJyk7XG5cbnZhciBDbGFzcyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF93YXRDbGFzc2VzKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQob2JqKSB7IGlmIChvYmogJiYgb2JqLl9fZXNNb2R1bGUpIHsgcmV0dXJuIG9iajsgfSBlbHNlIHsgdmFyIG5ld09iaiA9IHt9OyBpZiAob2JqICE9IG51bGwpIHsgZm9yICh2YXIga2V5IGluIG9iaikgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkgbmV3T2JqW2tleV0gPSBvYmpba2V5XTsgfSB9IG5ld09iai5kZWZhdWx0ID0gb2JqOyByZXR1cm4gbmV3T2JqOyB9IH1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiaW1wb3J0IHsgVmlldywgV2lkZ2V0IH0gZnJvbSAnd21sanMvbGliL3J1bnRpbWUnO1xuaW1wb3J0IGRyYXdlciBmcm9tICcuL3dtbC9kcmF3ZXIud21sJztcbmltcG9ydCAqIGFzIENsYXNzIGZyb20gJ3dhdC1jbGFzc2VzJztcblxuLyoqXG4gKiBEcmF3ZXJcbiAqL1xuY2xhc3MgRHJhd2VyIGV4dGVuZHMgV2lkZ2V0IHtcblxuICAgIGNvbnN0cnVjdG9yKGF0dHJzLCBjaGlsZHJlbikge1xuXG4gICAgICAgIHN1cGVyKGF0dHJzLCBjaGlsZHJlbik7XG4gICAgICAgIHRoaXMudmlldyA9IG5ldyBWaWV3KGRyYXdlciwgdGhpcyk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiB0b2dnbGUgdGhlIHZpc2liaWxpdHkgb2YgdGhpcyBEcmF3ZXJcbiAgICAgKi9cbiAgICB0b2dnbGUoKSB7XG5cbiAgICAgICAgdGhpcy52aWV3LmZpbmRCeUlkKCdkcmF3ZXInKS5jbGFzc0xpc3QudG9nZ2xlKENsYXNzLlZJU0lCTEUpO1xuXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiB0aGlzLnZpZXcucmVuZGVyKCk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgRHJhd2VyXG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChtYWtlKSB7XG4gIHJldHVybiBtYWtlLm5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiBtYWtlLnJlc29sdmUoQ2xhc3MsICdMQVlPVVRfRFJBV0VSJykgfSwgd21sOiB7ICdpZCc6IFwiZHJhd2VyXCIgfSB9LCBbbWFrZS5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogbWFrZS5yZXNvbHZlKENsYXNzLCAnTEFZT1VUX0RSQVdFUl9DT05URU5UJykgfSB9LCBbbWFrZS5yZXNvbHZlKHRoaXMsICdjaGlsZHJlbicpXSldKTtcbn07XG5cbnZhciBfd2F0Q2xhc3NlcyA9IHJlcXVpcmUoJ3dhdC1jbGFzc2VzJyk7XG5cbnZhciBDbGFzcyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF93YXRDbGFzc2VzKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQob2JqKSB7IGlmIChvYmogJiYgb2JqLl9fZXNNb2R1bGUpIHsgcmV0dXJuIG9iajsgfSBlbHNlIHsgdmFyIG5ld09iaiA9IHt9OyBpZiAob2JqICE9IG51bGwpIHsgZm9yICh2YXIga2V5IGluIG9iaikgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkgbmV3T2JqW2tleV0gPSBvYmpba2V5XTsgfSB9IG5ld09iai5kZWZhdWx0ID0gb2JqOyByZXR1cm4gbmV3T2JqOyB9IH1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiLyoganNoaW50IGlnbm9yZTpzdGFydCAqL1xuZXhwb3J0IENvbnRhaW5lciBmcm9tICcuL2NvbnRhaW5lci9Db250YWluZXInO1xuZXhwb3J0IERyYXdlciBmcm9tICcuL2RyYXdlci9EcmF3ZXInO1xuZXhwb3J0IE1haW4gZnJvbSAnLi9tYWluL01haW4nO1xuZXhwb3J0IEFjdGlvbkFyZWEgZnJvbSAnLi9hY3Rpb24tYXJlYS9BY3Rpb25BcmVhJztcbmV4cG9ydCBNZW51QnV0dG9uIGZyb20gJy4vbWVudS1idXR0b24vTWVudUJ1dHRvbic7XG5leHBvcnQgQmFubmVyIGZyb20gJy4vYmFubmVyL0Jhbm5lcic7XG5leHBvcnQgU2lkZU5hdmlnYXRpb24gZnJvbSAnLi9zaWRlLW5hdmlnYXRpb24vU2lkZU5hdmlnYXRpb24nO1xuZXhwb3J0IFNpZGVOYXZpZ2F0aW9uSXRlbSBmcm9tICcuL3NpZGUtbmF2aWdhdGlvbi9TaWRlTmF2aWdhdGlvbkl0ZW0nO1xuZXhwb3J0IEFjY291bnRBcmVhIGZyb20gJy4vYWNjb3VudC1hcmVhL0FjY291bnRBcmVhJztcbi8qIGpzaGludCBpZ25vcmU6ZW5kICovXG4iLCJpbXBvcnQge1ZpZXcsIFdpZGdldH0gZnJvbSAnd21sanMvbGliL3J1bnRpbWUnO1xuaW1wb3J0IG1haW4gZnJvbSAnLi93bWwvbWFpbi53bWwnO1xuXG4vKipcbiAqIE1haW4gYXJlYSBmb3IgY29udGVudCBpbiB0aGUgbGF5b3V0LlxuICovXG5jbGFzcyBNYWluIGV4dGVuZHMgV2lkZ2V0IHtcblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gVmlldy5yZW5kZXIobWFpbiwgdGhpcyk7XG5cbiAgICB9XG5cbn1cbmV4cG9ydCBkZWZhdWx0IE1haW5cblxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAobWFrZSkge1xuICByZXR1cm4gbWFrZS5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogbWFrZS5yZXNvbHZlKENsYXNzLCAnTEFZT1VUX01BSU4nKSB9IH0sIFttYWtlLm5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiBtYWtlLnJlc29sdmUoQ2xhc3MsICdMQVlPVVRfTUFJTl9DT05URU5UJykgfSB9LCBbbWFrZS5yZXNvbHZlKHRoaXMsICdjaGlsZHJlbicpXSldKTtcbn07XG5cbnZhciBfd2F0Q2xhc3NlcyA9IHJlcXVpcmUoJ3dhdC1jbGFzc2VzJyk7XG5cbnZhciBDbGFzcyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF93YXRDbGFzc2VzKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQob2JqKSB7IGlmIChvYmogJiYgb2JqLl9fZXNNb2R1bGUpIHsgcmV0dXJuIG9iajsgfSBlbHNlIHsgdmFyIG5ld09iaiA9IHt9OyBpZiAob2JqICE9IG51bGwpIHsgZm9yICh2YXIga2V5IGluIG9iaikgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkgbmV3T2JqW2tleV0gPSBvYmpba2V5XTsgfSB9IG5ld09iai5kZWZhdWx0ID0gb2JqOyByZXR1cm4gbmV3T2JqOyB9IH1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiaW1wb3J0IHsgVmlldywgV2lkZ2V0IH0gZnJvbSAnd21sanMvbGliL3J1bnRpbWUnO1xuaW1wb3J0IG1lbnVfYnV0dG9uIGZyb20gJy4vd21sL21lbnVfYnV0dG9uLndtbCc7XG5cbi8qKlxuICogTWVudUJ1dHRvbiBwcm92aWRlcyBhICdoYW1idXJnZXInIG1lbnUgYnV0dG9uLlxuICovXG5jbGFzcyBNZW51QnV0dG9uIGV4dGVuZHMgV2lkZ2V0IHtcblxuICAgIGNsaWNrZWQoZSkge1xuXG4gICAgICAgIHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3YXQ6b25DbGljaycsIGZ1bmN0aW9uKCkge30pKCk7XG5cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIFZpZXcucmVuZGVyKG1lbnVfYnV0dG9uLCB0aGlzKTtcblxuICAgIH1cblxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IE1lbnVCdXR0b25cbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKG1ha2UpIHtcbiAgcmV0dXJuIG1ha2Uubm9kZSgnYnV0dG9uJywgeyBodG1sOiB7ICdjbGFzcyc6IG1ha2UucmVzb2x2ZShDbGFzcywgJ0xBWU9VVF9NRU5VX0JVVFRPTicpLCAnb25jbGljayc6IHRoaXMuY2xpY2tlZC5iaW5kKHRoaXMpIH0gfSwgW21ha2Uubm9kZSgnc3BhbicsIHsgaHRtbDogeyAnY2xhc3MnOiBcIlwiIH0gfSwgW10pLCBtYWtlLm5vZGUoJ3NwYW4nLCB7IGh0bWw6IHsgJ2NsYXNzJzogXCJcIiB9IH0sIFtdKSwgbWFrZS5ub2RlKCdzcGFuJywgeyBodG1sOiB7ICdjbGFzcyc6IFwiXCIgfSB9LCBbXSldKTtcbn07XG5cbnZhciBfd2F0Q2xhc3NlcyA9IHJlcXVpcmUoJ3dhdC1jbGFzc2VzJyk7XG5cbnZhciBDbGFzcyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF93YXRDbGFzc2VzKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQob2JqKSB7IGlmIChvYmogJiYgb2JqLl9fZXNNb2R1bGUpIHsgcmV0dXJuIG9iajsgfSBlbHNlIHsgdmFyIG5ld09iaiA9IHt9OyBpZiAob2JqICE9IG51bGwpIHsgZm9yICh2YXIga2V5IGluIG9iaikgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkgbmV3T2JqW2tleV0gPSBvYmpba2V5XTsgfSB9IG5ld09iai5kZWZhdWx0ID0gb2JqOyByZXR1cm4gbmV3T2JqOyB9IH1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiaW1wb3J0IHsgVmlldywgV2lkZ2V0IH0gZnJvbSAnd21sanMvbGliL3J1bnRpbWUnO1xuaW1wb3J0IHNpZGVfbmF2aWdhdGlvbiBmcm9tICcuL3dtbC9zaWRlX25hdmlnYXRpb24ud21sJztcbmltcG9ydCAqIGFzIENsYXNzIGZyb20gJ3dhdC1jbGFzc2VzJztcblxuLyoqXG4gKiBTaWRlTmF2aWdhdGlvbkl0ZW1cbiAqL1xuY2xhc3MgU2lkZU5hdmlnYXRpb24gZXh0ZW5kcyBXaWRnZXQge1xuXG4gICAgY29uc3RydWN0b3IoYXR0cnMsIGNoaWxkcmVuKSB7XG5cbiAgICAgICAgc3VwZXIoYXR0cnMsIGNoaWxkcmVuKTtcblxuICAgICAgICB0aGlzLnZpZXcgPSBuZXcgVmlldyhzaWRlX25hdmlnYXRpb24sIHRoaXMpO1xuXG4gICAgfVxuXG4gICAgaGFuZGxlRXZlbnQoZSkge1xuXG4gICAgICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG5cbiAgICAgICAgICAgIGlmIChjaGlsZCAhPT0gZS50YXJnZXQpXG4gICAgICAgICAgICAgICAgY2hpbGQuY2xhc3NMaXN0LnJlbW92ZShDbGFzcy5BQ1RJVkUpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgb25SZW5kZXJlZCgpIHtcblxuICAgICAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuXG4gICAgICAgICAgICBjaGlsZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiB0aGlzLnZpZXcucmVuZGVyKCk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2lkZU5hdmlnYXRpb25cbiIsImltcG9ydCB7IFZpZXcsIFdpZGdldCB9IGZyb20gJ3dtbGpzL2xpYi9ydW50aW1lJztcbmltcG9ydCAqIGFzIENsYXNzIGZyb20gJ3dhdC1jbGFzc2VzJztcbmltcG9ydCBzaWRlX25hdmlnYXRpb25faXRlbSBmcm9tICcuL3dtbC9zaWRlX25hdmlnYXRpb25faXRlbS53bWwnO1xuXG4vKipcbiAqIFNpZGVOYXZpZ2F0aW9uSXRlbVxuICovXG5jbGFzcyBTaWRlTmF2aWdhdGlvbkl0ZW0gZXh0ZW5kcyBXaWRnZXQge1xuXG4gICAgY29uc3RydWN0b3IoYXR0cnMsIGNoaWxkcmVuKSB7XG5cbiAgICAgICAgc3VwZXIoYXR0cnMsIGNoaWxkcmVuKTtcbiAgICAgICAgdGhpcy52aWV3ID0gbmV3IFZpZXcoc2lkZV9uYXZpZ2F0aW9uX2l0ZW0sIHRoaXMpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogYWRkIHRoZSBhY3RpdmUgc3RhdGUgb2YgdGhpcyBTaWRlTmF2aWdhdGlvbkl0ZW1cbiAgICAgKi9cbiAgICBhY3RpdmUoKSB7XG5cbiAgICAgICAgdGhpcy52aWV3LmZpbmRCeUlkKCdhJykuY2xhc3NMaXN0LnJlbW92ZShDbGFzcy5BQ1RJVkUpO1xuICAgICAgICB0aGlzLnZpZXcuZmluZEJ5SWQoJ2EnKS5jbGFzc0xpc3QuYWRkKENsYXNzLkFDVElWRSk7XG5cbiAgICB9XG5cbiAgICBjbGlja2VkKCkge1xuXG4gICAgICAgIHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3YXQ6b25DbGljaycsIGZ1bmN0aW9uKCkge30pKHRoaXMpO1xuXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiB0aGlzLnZpZXcucmVuZGVyKCk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2lkZU5hdmlnYXRpb25JdGVtXG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChtYWtlKSB7XG4gIHJldHVybiBtYWtlLm5vZGUoJ25hdicsIHsgaHRtbDogeyAnY2xhc3MnOiBtYWtlLnJlc29sdmUoQ2xhc3MsICdMQVlPVVRfU0lERV9OQVZJR0FUSU9OJykgfSwgd21sOiB7ICdpZCc6IFwibmF2XCIgfSB9LCBbbWFrZS5yZXNvbHZlKHRoaXMsICdjaGlsZHJlbicpXSk7XG59O1xuXG52YXIgX3dhdENsYXNzZXMgPSByZXF1aXJlKCd3YXQtY2xhc3NlcycpO1xuXG52YXIgQ2xhc3MgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfd2F0Q2xhc3Nlcyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKG9iaikgeyBpZiAob2JqICYmIG9iai5fX2VzTW9kdWxlKSB7IHJldHVybiBvYmo7IH0gZWxzZSB7IHZhciBuZXdPYmogPSB7fTsgaWYgKG9iaiAhPSBudWxsKSB7IGZvciAodmFyIGtleSBpbiBvYmopIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIG5ld09ialtrZXldID0gb2JqW2tleV07IH0gfSBuZXdPYmouZGVmYXVsdCA9IG9iajsgcmV0dXJuIG5ld09iajsgfSB9XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKG1ha2UpIHtcbiAgcmV0dXJuIG1ha2Uubm9kZSgnYScsIHsgaHRtbDogeyAnY2xhc3MnOiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd2F0OmFjdGl2ZScsIGZhbHNlKSA/IG1ha2UucmVzb2x2ZShDbGFzcywgJ0FDVElWRScpIDogJycsICdocmVmJzogdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDpocmVmJyksICdvbmNsaWNrJzogdGhpcy5jbGlja2VkLmJpbmQodGhpcykgfSwgd21sOiB7ICdpZCc6IFwiYVwiIH0gfSwgW21ha2UuJGlmKHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3YXQ6aWNvbi1jbGFzcycsIGZhbHNlKSwgZnVuY3Rpb24gaWZfMCgpIHtcbiAgICByZXR1cm4gW21ha2Uubm9kZSgnaScsIHsgaHRtbDogeyAnY2xhc3MnOiBtYWtlLnJlc29sdmUoQ2xhc3MsICdMQVlPVVRfU0lERV9OQVZJR0FUSU9OX0lDT04nKSArIHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3YXQ6aWNvbi1jbGFzcycpIH0gfSwgW10pXTtcbiAgfS5iaW5kKHRoaXMpLCBmdW5jdGlvbiBlbHNlXzAoKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9LmJpbmQodGhpcykpLCB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd2F0OnRpdGxlJyksIG1ha2UucmVzb2x2ZSh0aGlzLCAnY2hpbGRyZW4nKV0pO1xufTtcblxudmFyIF93YXRDbGFzc2VzID0gcmVxdWlyZSgnd2F0LWNsYXNzZXMnKTtcblxudmFyIENsYXNzID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX3dhdENsYXNzZXMpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChvYmopIHsgaWYgKG9iaiAmJiBvYmouX19lc01vZHVsZSkgeyByZXR1cm4gb2JqOyB9IGVsc2UgeyB2YXIgbmV3T2JqID0ge307IGlmIChvYmogIT0gbnVsbCkgeyBmb3IgKHZhciBrZXkgaW4gb2JqKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSBuZXdPYmpba2V5XSA9IG9ialtrZXldOyB9IH0gbmV3T2JqLmRlZmF1bHQgPSBvYmo7IHJldHVybiBuZXdPYmo7IH0gfVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCJleHBvcnQgY29uc3QgVklTSUJMRSA9ICd3YXQtdmlzaWJsZSc7XG5leHBvcnQgY29uc3QgSElEREVOID0gJ3dhdC1oaWRkZW4nO1xuZXhwb3J0IGNvbnN0IEFDVElWRSA9ICd3YXQtYWN0aXZlJztcbmV4cG9ydCBjb25zdCBET1dOX0FSUk9XID0gJ2Fycm93LWRvd24nO1xuZXhwb3J0IGNvbnN0IFVQX0FSUk9XID0gJ2Fycm93LXVwJztcbmV4cG9ydCBjb25zdCBMQVlPVVRfQ09OVEFJTkVSID0gJ3dhdC1sYXlvdXQtY29udGFpbmVyJztcbmV4cG9ydCBjb25zdCBMQVlPVVRfRFJBV0VSID0gJ3dhdC1sYXlvdXQtZHJhd2VyJztcbmV4cG9ydCBjb25zdCBMQVlPVVRfRFJBV0VSX0NPTlRFTlQgPSAnd2F0LWxheW91dC1kcmF3ZXItY29udGVudCc7XG5leHBvcnQgY29uc3QgTEFZT1VUX01BSU4gPSAnd2F0LWxheW91dC1tYWluJztcbmV4cG9ydCBjb25zdCBMQVlPVVRfTUFJTl9DT05URU5UID0gJ3dhdC1sYXlvdXQtbWFpbi1jb250ZW50JztcbmV4cG9ydCBjb25zdCBMQVlPVVRfQUNUSU9OX0FSRUEgPSAnd2F0LWxheW91dC1hY3Rpb24tYXJlYSc7XG5leHBvcnQgY29uc3QgTEFZT1VUX0FDVElPTl9BUkVBX0NPTlRFTlQgPSAnd2F0LWxheW91dC1hY3Rpb24tYXJlYS1jb250ZW50JztcbmV4cG9ydCBjb25zdCBMQVlPVVRfTUVOVV9CVVRUT04gPSAnd2F0LWxheW91dC1tZW51LWJ1dHRvbic7XG5leHBvcnQgY29uc3QgTEFZT1VUX0JBTk5FUiA9ICd3YXQtbGF5b3V0LWJhbm5lcic7XG5leHBvcnQgY29uc3QgTEFZT1VUX0JBTk5FUl9JTUFHRSA9ICd3YXQtbGF5b3V0LWJhbm5lci1pbWFnZSc7XG5leHBvcnQgY29uc3QgTEFZT1VUX1NJREVfTkFWSUdBVElPTiA9ICd3YXQtbGF5b3V0LXNpZGUtbmF2aWdhdGlvbic7XG5leHBvcnQgY29uc3QgTEFZT1VUX1NJREVfTkFWSUdBVElPTl9USVRMRSA9ICd3YXQtbGF5b3V0LXNpZGUtbmF2aWdhdGlvbi10aXRsZSc7XG5leHBvcnQgY29uc3QgTEFZT1VUX0FDQ09VTlRfQVJFQSA9ICd3YXQtbGF5b3V0LWFjY291bnQtYXJlYSc7XG5leHBvcnQgY29uc3QgTEFZT1VUX0FDQ09VTlRfQVJFQV9USVRMRSA9ICd3YXQtbGF5b3V0LWFjY291bnQtYXJlYS10aXRsZSc7XG5leHBvcnQgY29uc3QgTEFZT1VUX0FDQ09VTlRfQVJFQV9UT0dHTEUgPSAnd2F0LWxheW91dC1hY2NvdW50LWFyZWEtdG9nZ2xlJztcbiIsImltcG9ydCBwcm9wZXJ0eSBmcm9tICdwcm9wZXJ0eS1zZWVrJztcblxuLyoqXG4gKiBBdHRyaWJ1dGVzIHByb3ZpZGVzIGFuIEFQSSBmb3IgcmVhZGluZyB0aGUgXG4gKiBhdHRyaWJ1dGVzIHN1cHBsaWVkIHRvIGFuIEVsZW1lbnQuXG4gKiBAcGFyYW0ge29iamVjdH0gYXR0cnMgXG4gKi9cbmNsYXNzIEF0dHJpYnV0ZXMge1xuXG4gICAgY29uc3RydWN0b3IoYXR0cnMpIHtcblxuICAgICAgICB0aGlzLl9hdHRycyA9IGF0dHJzO1xuXG4gICAgfVxuXG4gICAgc3RhdGljIGlzc2V0KHZhbHVlKSB7XG5cbiAgICAgIHJldHVybiBbbnVsbCwgdW5kZWZpbmVkXS5pbmRleE9mKHZhbHVlKSA8IDA7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZWFkIGEgdmFsdWUgZm9ybSB0aGUgaW50ZXJuYWwgbGlzdC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aCBcbiAgICAgKiBAcGFyYW0geyp9IGRlZmF1bHRWYWx1ZSAtIFRoaXMgdmFsdWUgaXMgcmV0dXJuZWQgaWYgdGhlIHZhbHVlIGlzIG5vdCBzZXQuXG4gICAgICovXG4gICAgcmVhZChwYXRoLCBkZWZhdWx0VmFsdWUpIHtcblxuICAgICAgICB2YXIgcmV0ID0gcHJvcGVydHkodGhpcy5fYXR0cnMsIHBhdGguc3BsaXQoJzonKS5qb2luKCcuJykpO1xuXG4gICAgICAgIGRlZmF1bHRWYWx1ZSA9IEF0dHJpYnV0ZXMuaXNzZXQoZGVmYXVsdFZhbHVlKT8gZGVmYXVsdFZhbHVlIDogJyc7XG5cbiAgICAgICAgaWYoIUF0dHJpYnV0ZXMuaXNzZXQocmV0KSlcbiAgICAgICAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XG5cbiAgICAgICAgcmV0dXJuIHJldDtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJlcXVpcmUgaXMgbGlrZSByZWFkIGJ1dCB0aHJvd3MgYW4gRXJyb3IgaWYgdGhlIHZhbHVlIGlzIG5vdCBzdXBwbGllZC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aCBcbiAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgKi9cbiAgICByZXF1aXJlKHBhdGgpIHtcblxuICAgICAgICB2YXIgcmV0ID0gdGhpcy5yZWFkKHBhdGgpO1xuXG4gICAgICAgIGlmKCFBdHRyaWJ1dGVzLmlzc2V0KHJldCkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoYCR7cGF0aH0gaXMgcmVxdWlyZWQhYCk7XG5cbiAgICAgICAgcmV0dXJuIHJldDtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJlcXVpcmVBcnJheSByZXF1aXJlcyB0aGUgdmFsdWUgdG8gYmUgYW4gYXJyYXksIGlmIG5vIFxuICAgICAqIHZhbHVlIGlzIHJlYWQgdGhlbiBkZWZhdWx0IGlzIHByb3ZpZGVkLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIFxuICAgICAqIEBwYXJhbSB7Kn0gZGVmYXVsdFZhbHVlIFxuICAgICAqL1xuICAgIHJlcXVpcmVBcnJheShwYXRoLCBkZWZhdWx0VmFsdWUpIHtcblxuICAgICAgICB2YXIgcmV0ID0gdGhpcy5yZWFkKHBhdGgpO1xuXG4gICAgICAgIGlmKCFBdHRyaWJ1dGVzLmlzc2V0KHJldCkpIHtcblxuICAgICAgICAgICAgaWYgKEF0dHJpYnV0ZXMuaXNzZXQoZGVmYXVsdFZhbHVlKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVmYXVsdFZhbHVlO1xuXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoYCR7cGF0aH0gaXMgcmVxdWlyZWQhYCk7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocmV0KSlcbiAgICAgICAgICAgICAgICByZXR1cm4gcmV0O1xuXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGAke3BhdGh9IG11c3QgYmUgYW4gYXJyYXkgZ290ICR7dHlwZW9mIHJldH0hYCk7XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXR0cmlidXRlc1xuIiwiaW1wb3J0IEF0dHJpYnV0ZXMgZnJvbSAnLi9BdHRyaWJ1dGVzJztcbmltcG9ydCBwcm9wZXJ0eSBmcm9tICdwcm9wZXJ0eS1zZWVrJztcbi8qKlxuICogSW50ZXJmYWNlIGZvciBXaWRnZXRzXG4gKiBAaW50ZXJmYWNlIFdpZGdldFxuICovXG5cbi8qKlxuICogSW50ZXJmYWNlIGZvciBvYmplY3RzIHRoYXQgY3JlYXRlIFdpZGdldHNcbiAqIEBpbnRlcmZhY2UgRmFjdG9yeVxuICovXG5cbi8qKlxuICogXG4gKiBjcmVhdGUgdGhlIHdpZGdldFxuICpcbiAqIEBmdW5jdGlvblxuICogQG5hbWUgRmFjdG9yeS5jcmVhdGVcbiAqIEBwYXJhbSB7b2JqZWN0fSBodG1sQXR0cmlidXRlcyBBIGhhc2ggb2YgYXR0cmlidXRlcyBleHBlY3RlZCB0byBiZSBwYXNzZWQgaW50byBET00uXG4gKiBAcGFyYW0ge29iamVjdH0gbnNBdHRyaWJ1dGVzICAgQSBoYXNoIG9mIG5hbWVzcGFjZWQgYXR0cmlidXRlcyBmb3IgZnJhbWV3b3JrIHVzYWdlLlxuICovXG5cblxuLyoqXG4gKiBNYWtlciBpcyB1c2VkIGJ5IGEgd21sIGphdmFzY3JpcHQgdGVtcGxhdGUgdG8gY3JlYXRlIGFzc2V0cy5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHRlbXBsYXRlIFxuICogQHBhcmFtIHtvYmplY3R9IGNvbnRleHQgXG4gKiBAdG9kbyBDbGVhbiB1cCByZWxhdGlvbnNoaXAgYmV0d2VlbiBWaWV3cyBhbmQgdGhlaXIgTWFrZXJzLlxuICovXG5jbGFzcyBNYWtlciB7XG5cbiAgICBjb25zdHJ1Y3Rvcih0ZW1wbGF0ZSwgY29udGV4dCkge1xuXG4gICAgICAgIHRoaXMuX2lkcyA9IHt9O1xuICAgICAgICB0aGlzLl93aWRnZXRzID0gW107XG4gICAgICAgIHRoaXMuX3RlbXBsYXRlID0gdGVtcGxhdGU7XG4gICAgICAgIHRoaXMuX2NvbnRleHQgPSBjb250ZXh0O1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmVzb2x2ZSBhIHByb3BlcnR5IGFjY2VzcyBleHByZXNzaW9uIHRvIGF2b2lkXG4gICAgICogdGhvd2luZyBlcnJvcnMgaWYgaXQgZG9lcyBub3QgZXhpc3QuXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGhlYWQgXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGggXG4gICAgICovXG4gICAgcmVzb2x2ZShoZWFkLCBwYXRoKSB7XG5cbiAgICAgICAgdmFyIHJldCA9IHByb3BlcnR5KGhlYWQsIHBhdGgpO1xuXG4gICAgICAgIGlmICgocmV0ID09PSB1bmRlZmluZWQpIHx8IChyZXQgPT09IG51bGwpKVxuICAgICAgICAgICAgcmV0ID0gJyc7XG5cbiAgICAgICAgcmV0dXJuIHJldDtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqQHByaXZhdGVcbiAgICAgKi9cbiAgICBfYWRvcHQoY2hpbGQsIGUpIHtcblxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjaGlsZCkpXG4gICAgICAgICAgICByZXR1cm4gY2hpbGQuZm9yRWFjaChpbm5lckNoaWxkID0+IHRoaXMuX2Fkb3B0KGlubmVyQ2hpbGQsIGUpKTtcblxuICAgICAgICBpZiAoY2hpbGQpXG4gICAgICAgICAgICBlLmFwcGVuZENoaWxkKFxuICAgICAgICAgICAgICAgICh0eXBlb2YgY2hpbGQgPT09ICdvYmplY3QnKSA/XG4gICAgICAgICAgICAgICAgY2hpbGQgOiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjaGlsZCB8fCAnJykpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmVnaXN0ZXIgYSBXaWRnZXQgb3IgTm9kZSBieSB0aGUgc3BlY2lmaWVkIHdtbDppZFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZCBcbiAgICAgKiBAcGFyYW0ge1dpZGdldHxOb2RlfSB0YXJnZXRcbiAgICAgKi9cbiAgICByZWdpc3RlcihpZCwgdGFyZ2V0KSB7XG5cbiAgICAgICAgaWYgKHRoaXMuX2lkcy5oYXNPd25Qcm9wZXJ0eShpZCkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYER1cGxpY2F0ZSBpZCAnJHtpZH0nIGRldGVjdGVkIWApO1xuXG4gICAgICAgIHRoaXMuX2lkc1tpZF0gPSB0YXJnZXQ7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiB0ZXh0IGNyZWF0ZXMgYSBET01UZXh0Tm9kZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSBcbiAgICAgKi9cbiAgICB0ZXh0KHZhbHVlKSB7XG5cbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHZhbHVlIHx8ICcnKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIG5vZGUgaXMgY2FsbGVkIHRvIGNyZWF0ZSBhIHJlZ3VsYXIgRE9NIG5vZGVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGFnIFxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBhdHRyaWJ1dGVzIFxuICAgICAqIEBwYXJhbSB7YXJyYXk8c3RyaW5nfG51bWJlcnxXaWRnZXQ+fSBjaGlsZHJlbiBcbiAgICAgKi9cbiAgICBub2RlKHRhZywgYXR0cmlidXRlcywgY2hpbGRyZW4pIHtcblxuICAgICAgICB2YXIgZSA9ICh0YWcgPT09ICdmcmFnbWVudCcpID8gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpIDogZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgYXR0cmlidXRlcy5odG1sID09PSAnb2JqZWN0JylcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMuaHRtbCkuZm9yRWFjaChrZXkgPT4ge1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBhdHRyaWJ1dGVzLmh0bWxba2V5XSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICBlW2tleV0gPSBhdHRyaWJ1dGVzLmh0bWxba2V5XTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlLnNldEF0dHJpYnV0ZShrZXksIGF0dHJpYnV0ZXMuaHRtbFtrZXldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKGMgPT4gdGhpcy5fYWRvcHQoYywgZSkpO1xuXG4gICAgICAgIGlmIChhdHRyaWJ1dGVzLndtbClcbiAgICAgICAgICAgIGlmIChhdHRyaWJ1dGVzLndtbC5pZClcbiAgICAgICAgICAgICAgICB0aGlzLnJlZ2lzdGVyKGF0dHJpYnV0ZXMud21sLmlkLCBlKTtcblxuICAgICAgICByZXR1cm4gZTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHdpZGdldCBjcmVhdGVzIGEgd21sIHdpZGdldC5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBDb25zdHJ1dG9yIFxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBhdHRyaWJ1dGVzIFxuICAgICAqIEBwYXJhbSB7YXJyYXk8c3RyaW5nfG51bWJlcnxXaWRnZXQ+fSBjaGlsZHJlbiBcbiAgICAgKiBAcmV0dXJuIHtXaWRnZXR9XG4gICAgICovXG4gICAgd2lkZ2V0KENvbnN0cnVjdG9yLCBhdHRyaWJ1dGVzLCBjaGlsZHJlbikge1xuXG4gICAgICAgIHZhciBjaGlsZHMgPSBbXTtcbiAgICAgICAgdmFyIHc7XG5cbiAgICAgICAgY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiBBcnJheS5pc0FycmF5KGNoaWxkKSA/XG4gICAgICAgICAgICBjaGlsZHMucHVzaC5hcHBseShjaGlsZHMsIGNoaWxkKSA6IGNoaWxkcy5wdXNoKGNoaWxkKSk7XG5cbiAgICAgICAgdyA9IG5ldyBDb25zdHJ1Y3RvcihuZXcgQXR0cmlidXRlcyhhdHRyaWJ1dGVzKSwgY2hpbGRzKTtcblxuICAgICAgICBpZiAoYXR0cmlidXRlcy53bWwpXG4gICAgICAgICAgICBpZiAoYXR0cmlidXRlcy53bWwuaWQpXG4gICAgICAgICAgICAgICAgdGhpcy5yZWdpc3RlcihhdHRyaWJ1dGVzLndtbC5pZCwgdyk7XG5cbiAgICAgICAgdGhpcy5fd2lkZ2V0cy5wdXNoKHcpO1xuICAgICAgICByZXR1cm4gdy5yZW5kZXIoKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqICRpZiBpcyBjYWxsZWQgdG8gY3JlYXRlIGFuIGlmIGNvbmRpdGlvbmFsIGNvbnN0cnVjdFxuICAgICAqIEBwYXJhbSB7Kn0gcHJlZGljYXRlIFxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IHBvc2l0aXZlIFxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IG5lZ2F0aXZlIFxuICAgICAqL1xuICAgICRpZihwcmVkaWNhdGUsIHBvc2l0aXZlLCBuZWdhdGl2ZSkge1xuXG4gICAgICAgIHJldHVybiAocHJlZGljYXRlKSA/IHBvc2l0aXZlKCkgOiBuZWdhdGl2ZSgpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogJGZvciBpcyBjYWxsZWQgdG8gY3JlYXRlIGEgZm9yIGxvb3AgY29uc3RydWN0XG4gICAgICogQHBhcmFtIHtJdGVyYWJsZX0gY29sbGVjdGlvbiBcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYiBcbiAgICAgKi9cbiAgICAkZm9yKGNvbGxlY3Rpb24sIGNiKSB7XG5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY29sbGVjdGlvbikpIHtcblxuICAgICAgICAgICAgcmV0dXJuIGNvbGxlY3Rpb24ubWFwKGNiKTtcblxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBjb2xsZWN0aW9uID09PSAnb2JqZWN0Jykge1xuXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoY29sbGVjdGlvbikubWFwKChrZXksIGksIGFsbCkgPT4gY2IoY29sbGVjdGlvbltrZXldLCBrZXksIGFsbCkpO1xuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogJHN3aXRjaCBzaW11bGF0ZXMgYSBzd2l0Y2ggc3RhdGVtZW50XG4gICAgICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfGJvb2xlYW59IHZhbHVlIFxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBjYXNlcyBcbiAgICAgKi9cbiAgICAkc3dpdGNoKHZhbHVlLCBjYXNlcykge1xuXG4gICAgICAgIHZhciByZXN1bHQgPSBjYXNlc1t2YWx1ZV07XG4gICAgICAgIHZhciBkZWZhdWwgPSBjYXNlcy5kZWZhdWx0O1xuXG4gICAgICAgIGlmIChyZXN1bHQpIHJldHVybiByZXN1bHQ7XG5cbiAgICAgICAgaWYgKGRlZmF1bCkgcmV0dXJuIGRlYWZ1bDtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHNwcmVhZCBhIHZhcmlhYmxlIGludG8gYXR0cmlidXRlc1xuICAgICAqIEBwYXJhbSB7b2JqZWN0fGFycmF5fSB2YWx1ZSBcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gYXR0cnMgXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSBcbiAgICAgKi9cbiAgICBzcHJlYWQodmFsdWUsIGF0dHJzLCBrZXkpIHtcblxuICAgICAgdmFyIHRhcmdldDtcblxuICAgICAgICBhdHRycyA9IGF0dHJzIHx8IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcpXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBTcHJlYWQgdmFsdWVzIG11c3QgYmUgYW4gYXJyYXkgb3Igb2JqZWN0ISBHb3QgJyR7dHlwZW9mIHZhbHVlfSchYCk7XG5cbiAgICAgICAgaWYoa2V5ICE9PSAnJykge1xuXG4gICAgICAgICAgdGFyZ2V0ID0gcHJvcGVydHkoYXR0cnMsIGtleSkgfHwgT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgICBPYmplY3Qua2V5cyh2YWx1ZSkuZm9yRWFjaChrPT50YXJnZXRba10gPSB2YWx1ZVtrXSk7XG4gICAgICAgICAgcHJvcGVydHkuc2V0KGF0dHJzLCBrZXksICB0YXJnZXQpO1xuXG4gICAgICAgIH1lbHNlIHtcblxuICAgICAgICAgIE9iamVjdC5rZXlzKHZhbHVlKS5mb3JFYWNoKGs9PmF0dHJzW2tdID0gdmFsdWVba10pO1xuXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBhdHRycztcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGZpbmRCeUlkIHJldHVybnMgYSB3aWRnZXQgZnJvbSB0aGUgaW50ZXJuYWwgbGlzdC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgXG4gICAgICogQHJldHVybiB7b2JqZWN0fVxuICAgICAqL1xuICAgIGZpbmRCeUlkKGlkKSB7XG5cbiAgICAgICAgcmV0dXJuICh0aGlzLl9pZHNbaWRdKSA/IHRoaXMuX2lkc1tpZF0gOiBudWxsO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmVuZGVyIHRoZSBET00uXG4gICAgICogQHJldHVybiB7RE9NVHJlZX1cbiAgICAgKi9cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgdmFyIHRyZWUgPSBudWxsO1xuXG4gICAgICAgIHRoaXMuX2lkcyA9IHt9O1xuICAgICAgICB0aGlzLl93aWRnZXRzLmZvckVhY2godyA9PiB3Lm9uUmVtb3ZlZCgpKTtcbiAgICAgICAgdGhpcy5fd2lkZ2V0cyA9IFtdO1xuXG4gICAgICAgIHRyZWUgPSB0aGlzLl90ZW1wbGF0ZS5jYWxsKHRoaXMuX2NvbnRleHQsIHRoaXMpO1xuXG4gICAgICAgIHRoaXMuX3dpZGdldHMuZm9yRWFjaCh3ID0+IHcub25SZW5kZXJlZCgpKTtcblxuICAgICAgICByZXR1cm4gdHJlZTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBNYWtlclxuIiwiaW1wb3J0IE1ha2VyIGZyb20gJy4vTWFrZXInO1xuXG4vKipcbiAqIFZpZXcgcHJvdmlkZXMgYW4gQVBJIGZvciB0dXJuaW5nIHdtbCBpbnRvIGEgRE9NIHRyZWUuXG4gKiBBZGRpdGlvbmFsbHkgaXQgcHJvdmlkZXMgYSBjb252ZW5pZW50IEFQSSBmb3IgcmV0cmVpdmluZyBjcmVhdGVkXG4gKiB3aWRnZXRzIGNyZWF0ZWQgZHVyaW5nIHBhcnNpbmcgcHJvdmlkaW5nIGFuIG5lYXIgY3VzdG9tIGVsZW1lbnRzXG4gKiBsaWtlIGZlZWwuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSB0ZW1wbGF0ZSBBIGZ1bmN0aW9uIHRoYXQgd2lsbCBiZSB0cmVhdGVkIGFzIGEgd21sIHRlbXBsYXRlLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbnRleHQgQWxsIHJlZmVyZW5jZXMgdG8gYHRoaXNgIGluIHRoZSB0ZW1wbGF0ZSB3aWxsIHJlZmVyIHRvIHRoaXMgb2JqZWN0LlxuICogQHBhcmFtIHt9IGxpc3RlbmVyIFxuICovXG5jbGFzcyBWaWV3IHtcblxuICAgIGNvbnN0cnVjdG9yKHRlbXBsYXRlLCBjb250ZXh0KSB7XG5cbiAgICAgICAgdGhpcy5fbWFrZXIgPSBuZXcgTWFrZXIodGVtcGxhdGUsIGNvbnRleHQpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmVuZGVyIGlzIGEgZmFjdG9yeSBtZXRob2QgZm9yIGNyZWF0aW5nIGEgbmV3IFZpZXcgYW5kIHJlbmRlcmluZ1xuICAgICAqIGl0J3MgY29udGVudHMgaW1tZWRpYXRlbHkuXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gdGVtcGxhdGVcbiAgICAgKiBAcGFyYW0ge29iamVjdHxudWxsfSBjb250ZXh0IFxuICAgICAqIEByZXR1cm5zIHtEb2N1bWVudEZyYWdtZW50fVxuICAgICAqL1xuICAgIHN0YXRpYyByZW5kZXIodGVtcGxhdGUsIGNvbnRleHQpIHtcblxuICAgICAgICByZXR1cm4gKG5ldyBWaWV3KHRlbXBsYXRlLCBjb250ZXh0KSkucmVuZGVyKCk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBmaW5kQnlJZCByZXRyaWV2ZXMgYW4gZWxlbWVudCBieSBpdHMgd21sOmlkIGF0dHJpYnV0ZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBcbiAgICAgKi9cbiAgICBmaW5kQnlJZChpZCkge1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9tYWtlci5maW5kQnlJZChpZCk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiB1c2UgcmVwbGFjZXMgdGhlIHRlbXBsYXRlIChhbmQgb3B0aW9uYWxseSBjb250ZXh0KSB0aGlzIFZpZXcgdXNlcy5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSB0ZW1wbGF0ZSBcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gW2NvbnRleHRdIFxuICAgICAqIEByZXR1cm5zIHtWaWV3fVxuICAgICAqL1xuICAgIHVzZSh0ZW1wbGF0ZSwgY29udGV4dCkge1xuXG4gICAgICAgIHRoaXMuX21ha2VyID0gbmV3IE1ha2VyKHRlbXBsYXRlLCAoY29udGV4dCkgPyBjb250ZXh0IDogdGhpcy5jb250ZXh0KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZW5kZXIgcHJvdmlkZXMgdGhlIERPTSBvdXRwdXQgb2YgdGhpcyB2aWV3LlxuICAgICAqIEByZXR1cm4ge0RPTU5vZGV9IFxuICAgICAqL1xuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5fbWFrZXIucmVuZGVyKCk7XG5cbiAgICB9XG5cblxufVxuXG5leHBvcnQgZGVmYXVsdCBWaWV3XG4iLCIvKipcbiAqIFdpZGdldCBjbGFzcyByZXByZXNlbnRzXG4gKi9cbmNsYXNzIFdpZGdldCB7XG5cbiAgY29uc3RydWN0b3IoYXR0cnMsIGNoaWxkcmVuKSB7XG5cbiAgICB0aGlzLmF0dHJzID0gYXR0cnMuX2F0dHJzO1xuICAgIHRoaXMuYXR0cmlidXRlcyA9IGF0dHJzO1xuICAgIHRoaXMuY2hpbGRyZW4gPSBjaGlsZHJlbjtcblxuICB9XG5cbiAgb25SZW5kZXJlZCgpIHtcblxuICB9XG5cbiAgb25SZW1vdmVkKCkge1xuXG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBXaWRnZXRcblxuIiwiLypqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG5leHBvcnQgVmlldyBmcm9tICcuL1ZpZXcnO1xuZXhwb3J0IEF0dHJpYnV0ZXMgZnJvbSAnLi9BdHRyaWJ1dGVzJztcbmV4cG9ydCBXaWRnZXQgZnJvbSAnLi9XaWRnZXQnO1xuLypqc2hpbnQgaWdub3JlOmVuZCAqL1xuXG4iLCJmdW5jdGlvbiBib3VuZGFyeV90b19kb3QodmFsdWUpIHtcblx0cmV0dXJuIHZhbHVlLnNwbGl0KCddWycpLmpvaW4oJy4nKS5zcGxpdCgnWycpLmpvaW4oJy4nKTtcbn1cblxuZnVuY3Rpb24gc3RyaXBfYnJhY2VzKHZhbHVlKSB7XG5cdHJldHVybiB2YWx1ZS5zcGxpdCgnWycpLmpvaW4oJy4nKS5zcGxpdCgnXScpLmpvaW4oJycpO1xufVxuXG5mdW5jdGlvbiBlc2NhcGVfZG90cyh2YWx1ZSkge1xuXHR2YWx1ZSA9IHZhbHVlLnNwbGl0KCdcXCcnKTtcblx0cmV0dXJuICh2YWx1ZS5sZW5ndGggPCAzKSA/IHZhbHVlLmpvaW4oJ1xcJycpIDogdmFsdWUubWFwKGZ1bmN0aW9uKHNlZykge1xuXHRcdGlmIChzZWcubGVuZ3RoIDwgMykgcmV0dXJuIHNlZztcblx0XHRpZiAoKHNlZ1swXSA9PT0gJy4nKSB8fCAoc2VnW3NlZy5sZW5ndGggLSAxXSA9PT0gJy4nKSkgcmV0dXJuIHNlZztcblx0XHRyZXR1cm4gc2VnLnNwbGl0KCcuJykuam9pbignJiYnKTtcblx0fSkuam9pbignJyk7XG59XG5cbmZ1bmN0aW9uIHVuZXNjYXBlX2RvdHModmFsdWUpIHtcblx0cmV0dXJuIHZhbHVlLnNwbGl0KCcmJicpLmpvaW4oJy4nKTtcbn1cblxuZnVuY3Rpb24gcGFydGlmeSh2YWx1ZSkge1xuXHRpZiAoIXZhbHVlKSByZXR1cm4gJyc7XG5cdHJldHVybiBlc2NhcGVfZG90cyhzdHJpcF9icmFjZXMoYm91bmRhcnlfdG9fZG90KCcnICsgdmFsdWUpKSkuc3BsaXQoJy4nKTtcbn1cblxudmFyIGdldCA9IGZ1bmN0aW9uKG8sIHBhdGgpIHtcblxuXHR2YXIgcGFydHMgPSBwYXJ0aWZ5KHBhdGgpO1xuXHRpZiAocGFydHMubGVuZ3RoID09PSAxKSByZXR1cm4gb1t1bmVzY2FwZV9kb3RzKHBhcnRzWzBdKV07XG5cdGlmIChwYXJ0cy5sZW5ndGggPT09IDApIHJldHVybjtcblxuXHR2YXIgZmlyc3QgPSBvW3BhcnRzLnNoaWZ0KCldO1xuXG5cdHJldHVybiBwYXJ0cy5yZWR1Y2UoZnVuY3Rpb24odGFyZ2V0LCBwcm9wKSB7XG5cdFx0aWYgKCF0YXJnZXQpIHJldHVybiB0YXJnZXQ7XG5cdFx0cmV0dXJuIHRhcmdldFt1bmVzY2FwZV9kb3RzKHByb3ApXTtcblx0fSwgZmlyc3QpO1xufTtcblxuZ2V0LnNldCA9IGZ1bmN0aW9uKG9iaiwgcGF0aCwgdmFsdWUpIHtcblx0dmFyIHBhcnRzID0gcGFydGlmeShwYXRoKTtcblx0cGFydHMucmVkdWNlKGZ1bmN0aW9uKHRhcmdldCwgcHJvcCwgaSkge1xuXHRcdHByb3AgPSB1bmVzY2FwZV9kb3RzKHByb3ApO1xuXHRcdGlmIChwYXJ0cy5sZW5ndGggLSAxID09PSBpKSB7XG5cdFx0XHR0YXJnZXRbcHJvcF0gPSB2YWx1ZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGFyZ2V0W3Byb3BdID0gdGFyZ2V0W3Byb3BdIHx8IHt9O1xuXHRcdH1cblx0XHRyZXR1cm4gdGFyZ2V0W3Byb3BdO1xuXG5cblx0fSwgb2JqKTtcblxuXHRyZXR1cm4gb2JqO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBnZXQ7XG5tb2R1bGUuZXhwb3J0cy5nZXQgPSBnZXQ7XG4iXX0=
