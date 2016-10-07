'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = require('wmljs/lib/runtime');

var _side_navigation = require('./wml/side_navigation.wml');

var _side_navigation2 = _interopRequireDefault(_side_navigation);

var _watClasses = require('wat-classes');

var Class = _interopRequireWildcard(_watClasses);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXlvdXQvc2lkZS1uYXZpZ2F0aW9uL1NpZGVOYXZpZ2F0aW9uLmpzIl0sIm5hbWVzIjpbIkNsYXNzIiwiU2lkZU5hdmlnYXRpb24iLCJhdHRycyIsImNoaWxkcmVuIiwidmlldyIsImUiLCJmb3JFYWNoIiwiY2hpbGQiLCJ0YXJnZXQiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJBQ1RJVkUiLCJhZGRFdmVudExpc3RlbmVyIiwicmVuZGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztBQUNBOzs7O0FBQ0E7O0lBQVlBLEs7Ozs7Ozs7Ozs7OztBQUVaOzs7SUFHTUMsYzs7O0FBRUYsNEJBQVlDLEtBQVosRUFBbUJDLFFBQW5CLEVBQTZCO0FBQUE7O0FBQUEsb0lBRW5CRCxLQUZtQixFQUVaQyxRQUZZOztBQUl6QixjQUFLQyxJQUFMLEdBQVksbURBQVo7O0FBSnlCO0FBTTVCOzs7O29DQUVXQyxDLEVBQUc7O0FBRVgsaUJBQUtGLFFBQUwsQ0FBY0csT0FBZCxDQUFzQixpQkFBUzs7QUFFM0Isb0JBQUlDLFVBQVVGLEVBQUVHLE1BQWhCLEVBQ0lELE1BQU1FLFNBQU4sQ0FBZ0JDLE1BQWhCLENBQXVCVixNQUFNVyxNQUE3QjtBQUVQLGFBTEQ7QUFPSDs7O3FDQUVZO0FBQUE7O0FBRVQsaUJBQUtSLFFBQUwsQ0FBY0csT0FBZCxDQUFzQixpQkFBUzs7QUFFM0JDLHNCQUFNSyxnQkFBTixDQUF1QixPQUF2QjtBQUVILGFBSkQ7QUFNSDs7O2lDQUVROztBQUVMLG1CQUFPLEtBQUtSLElBQUwsQ0FBVVMsTUFBVixFQUFQO0FBRUg7Ozs7OztrQkFJVVosYyIsImZpbGUiOiJTaWRlTmF2aWdhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFZpZXcsIFdpZGdldCB9IGZyb20gJ3dtbGpzL2xpYi9ydW50aW1lJztcbmltcG9ydCBzaWRlX25hdmlnYXRpb24gZnJvbSAnLi93bWwvc2lkZV9uYXZpZ2F0aW9uLndtbCc7XG5pbXBvcnQgKiBhcyBDbGFzcyBmcm9tICd3YXQtY2xhc3Nlcyc7XG5cbi8qKlxuICogU2lkZU5hdmlnYXRpb25JdGVtXG4gKi9cbmNsYXNzIFNpZGVOYXZpZ2F0aW9uIGV4dGVuZHMgV2lkZ2V0IHtcblxuICAgIGNvbnN0cnVjdG9yKGF0dHJzLCBjaGlsZHJlbikge1xuXG4gICAgICAgIHN1cGVyKGF0dHJzLCBjaGlsZHJlbik7XG5cbiAgICAgICAgdGhpcy52aWV3ID0gbmV3IFZpZXcoc2lkZV9uYXZpZ2F0aW9uLCB0aGlzKTtcblxuICAgIH1cblxuICAgIGhhbmRsZUV2ZW50KGUpIHtcblxuICAgICAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuXG4gICAgICAgICAgICBpZiAoY2hpbGQgIT09IGUudGFyZ2V0KVxuICAgICAgICAgICAgICAgIGNoaWxkLmNsYXNzTGlzdC5yZW1vdmUoQ2xhc3MuQUNUSVZFKTtcblxuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIG9uUmVuZGVyZWQoKSB7XG5cbiAgICAgICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcblxuICAgICAgICAgICAgY2hpbGQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzKTtcblxuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy52aWV3LnJlbmRlcigpO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFNpZGVOYXZpZ2F0aW9uXG4iXX0=