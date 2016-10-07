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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXlvdXQvbWVudS1idXR0b24vTWVudUJ1dHRvbi5qcyJdLCJuYW1lcyI6WyJNZW51QnV0dG9uIiwiZSIsImF0dHJpYnV0ZXMiLCJyZWFkIiwicmVuZGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQTs7O0lBR01BLFU7Ozs7Ozs7Ozs7O2dDQUVNQyxDLEVBQUc7O0FBRVAsaUJBQUtDLFVBQUwsQ0FBZ0JDLElBQWhCLENBQXFCLGFBQXJCLEVBQW9DLFlBQVcsQ0FBRSxDQUFqRDtBQUVIOzs7aUNBRVE7O0FBRUwsbUJBQU8sY0FBS0MsTUFBTCx3QkFBeUIsSUFBekIsQ0FBUDtBQUVIOzs7Ozs7a0JBS1VKLFUiLCJmaWxlIjoiTWVudUJ1dHRvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFZpZXcsIFdpZGdldCB9IGZyb20gJ3dtbGpzL2xpYi9ydW50aW1lJztcbmltcG9ydCBtZW51X2J1dHRvbiBmcm9tICcuL3dtbC9tZW51X2J1dHRvbi53bWwnO1xuXG4vKipcbiAqIE1lbnVCdXR0b24gcHJvdmlkZXMgYSAnaGFtYnVyZ2VyJyBtZW51IGJ1dHRvbi5cbiAqL1xuY2xhc3MgTWVudUJ1dHRvbiBleHRlbmRzIFdpZGdldCB7XG5cbiAgICBjbGlja2VkKGUpIHtcblxuICAgICAgICB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd2F0Om9uQ2xpY2snLCBmdW5jdGlvbigpIHt9KSgpO1xuXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiBWaWV3LnJlbmRlcihtZW51X2J1dHRvbiwgdGhpcyk7XG5cbiAgICB9XG5cblxufVxuXG5leHBvcnQgZGVmYXVsdCBNZW51QnV0dG9uXG4iXX0=