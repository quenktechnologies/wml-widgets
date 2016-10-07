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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2JyZWFkY3J1bWJzL0JyZWFkQ3J1bWIuanMiXSwibmFtZXMiOlsiQnJlYWRDcnVtYiIsInJlbmRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUE7OztJQUdNQSxVOzs7Ozs7Ozs7OztpQ0FFTzs7QUFFTCxtQkFBTyxjQUFLQyxNQUFMLGlCQUFrQixJQUFsQixDQUFQO0FBRUg7Ozs7OztrQkFHVUQsVSIsImZpbGUiOiJCcmVhZENydW1iLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmlldywgV2lkZ2V0IH0gZnJvbSAnd21sanMvbGliL3J1bnRpbWUnO1xuaW1wb3J0IGl0ZW0gZnJvbSAnLi93bWwvaXRlbS53bWwnO1xuXG4vKipcbiAqIEJyZWFkQ3J1bWJcbiAqL1xuY2xhc3MgQnJlYWRDcnVtYiBleHRlbmRzIFdpZGdldCB7XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIFZpZXcucmVuZGVyKGl0ZW0sIHRoaXMpO1xuXG4gICAgfVxuXG59XG5leHBvcnQgZGVmYXVsdCBCcmVhZENydW1iXG5cbiJdfQ==