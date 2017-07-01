'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = require('@quenk/wml/lib/runtime');

var _view = require('./wml/view');

var _view2 = _interopRequireDefault(_view);

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

            return _runtime.View.render(_view2.default, this);
        }
    }]);

    return LayoutContainer;
}(_runtime.Widget);

exports.default = LayoutContainer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2xheW91dC9MYXlvdXQuanMiXSwibmFtZXMiOlsiTGF5b3V0Q29udGFpbmVyIiwicmVuZGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQTs7O0lBR01BLGU7Ozs7Ozs7Ozs7O2lDQUVPOztBQUVMLG1CQUFPLGNBQUtDLE1BQUwsaUJBQWtCLElBQWxCLENBQVA7QUFFSDs7Ozs7O2tCQUlVRCxlIiwiZmlsZSI6IkxheW91dC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFZpZXcsIFdpZGdldCB9IGZyb20gJ0BxdWVuay93bWwvbGliL3J1bnRpbWUnO1xuaW1wb3J0IHZpZXcgZnJvbSAnLi93bWwvdmlldyc7XG5cbi8qKlxuICogTGF5b3V0Q29udGFpbmVyIHByb3ZpZGVzIHRoZSB3aWRnZXQgdGhhdCB3cmFwcyBhbGwgdGhlIGNvbnRlbnQgdG9nZXRoZXIgKERyYXdlciBhbmQgY29udGVudCBhcmVhKS5cbiAqL1xuY2xhc3MgTGF5b3V0Q29udGFpbmVyIGV4dGVuZHMgV2lkZ2V0IHtcblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gVmlldy5yZW5kZXIodmlldywgdGhpcyk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgTGF5b3V0Q29udGFpbmVyXG4iXX0=