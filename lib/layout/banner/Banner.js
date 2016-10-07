'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = require('wmljs/lib/runtime');

var _banner = require('./wml/banner.wml');

var _banner2 = _interopRequireDefault(_banner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXlvdXQvYmFubmVyL0Jhbm5lci5qcyJdLCJuYW1lcyI6WyJCYW5uZXIiLCJyZW5kZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBOzs7SUFHTUEsTTs7Ozs7Ozs7Ozs7aUNBRU87O0FBRUwsbUJBQU8sY0FBS0MsTUFBTCxtQkFBb0IsSUFBcEIsQ0FBUDtBQUVIOzs7Ozs7a0JBSVVELE0iLCJmaWxlIjoiQmFubmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtWaWV3LCBXaWRnZXR9IGZyb20gJ3dtbGpzL2xpYi9ydW50aW1lJztcbmltcG9ydCBiYW5uZXIgZnJvbSAnLi93bWwvYmFubmVyLndtbCc7XG5cbi8qKlxuICogQmFubmVyXG4gKi9cbmNsYXNzIEJhbm5lciBleHRlbmRzIFdpZGdldCB7XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIFZpZXcucmVuZGVyKGJhbm5lciwgdGhpcyk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQmFubmVyXG5cbiJdfQ==