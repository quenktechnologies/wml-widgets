'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = require('wmljs/lib/runtime');

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2JyZWFkY3J1bWJzL0JyZWFkQ3J1bWJNZW51LmpzIl0sIm5hbWVzIjpbIkJyZWFkQ3J1bWJNZW51IiwicmVuZGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQTs7O0lBR01BLGM7Ozs7Ozs7Ozs7O2lDQUVPOztBQUVMLG1CQUFPLGNBQUtDLE1BQUwsaUJBQWtCLElBQWxCLENBQVA7QUFFSDs7Ozs7O2tCQUdVRCxjIiwiZmlsZSI6IkJyZWFkQ3J1bWJNZW51LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmlldywgV2lkZ2V0IH0gZnJvbSAnd21sanMvbGliL3J1bnRpbWUnO1xuaW1wb3J0IG1lbnUgZnJvbSAnLi93bWwvbWVudS53bWwnO1xuXG4vKipcbiAqIEJyZWFkQ3J1bWJNZW51XG4gKi9cbmNsYXNzIEJyZWFkQ3J1bWJNZW51IGV4dGVuZHMgV2lkZ2V0IHtcblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gVmlldy5yZW5kZXIobWVudSwgdGhpcyk7XG5cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJyZWFkQ3J1bWJNZW51XG4iXX0=