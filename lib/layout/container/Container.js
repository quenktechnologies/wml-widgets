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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXlvdXQvY29udGFpbmVyL0NvbnRhaW5lci5qcyJdLCJuYW1lcyI6WyJDb250YWluZXIiLCJyZW5kZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBOzs7SUFHTUEsUzs7Ozs7Ozs7Ozs7aUNBRU87O0FBRUwsbUJBQU8sY0FBS0MsTUFBTCxzQkFBdUIsSUFBdkIsQ0FBUDtBQUVIOzs7Ozs7a0JBSVVELFMiLCJmaWxlIjoiQ29udGFpbmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmlldywgV2lkZ2V0IH0gZnJvbSAnd21sanMvbGliL3J1bnRpbWUnO1xuaW1wb3J0IGNvbnRhaW5lciBmcm9tICcuL3dtbC9jb250YWluZXIud21sJztcblxuLyoqXG4gKiBDb250YWluZXIgcHJvdmlkZXMgdGhlIHdpZGdldCB0aGF0IHdyYXBzIGFsbCB0aGUgY29udGVudCB0b2dldGhlciAoRHJhd2VyIGFuZCBjb250ZW50IGFyZWEpLlxuICovXG5jbGFzcyBDb250YWluZXIgZXh0ZW5kcyBXaWRnZXQge1xuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiBWaWV3LnJlbmRlcihjb250YWluZXIsIHRoaXMpO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IENvbnRhaW5lclxuIl19