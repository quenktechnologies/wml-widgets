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

    _createClass(ActionArea, [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXlvdXQvYWN0aW9uLWFyZWEvQWN0aW9uQXJlYS5qcyJdLCJuYW1lcyI6WyJBY3Rpb25BcmVhIiwiYXR0cnMiLCJjaGlsZHJlbiIsInZpZXciLCJyZW5kZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBOzs7SUFHTUEsVTs7O0FBRUYsd0JBQVlDLEtBQVosRUFBbUJDLFFBQW5CLEVBQTZCO0FBQUE7O0FBQUEsNEhBRW5CRCxLQUZtQixFQUVaQyxRQUZZOztBQUl6QixjQUFLQyxJQUFMLEdBQVksK0NBQVo7O0FBSnlCO0FBTTVCOzs7OytCQUVNLENBRU47OztpQ0FFUTs7QUFFTCxtQkFBTyxLQUFLQSxJQUFMLENBQVVDLE1BQVYsRUFBUDtBQUVIOzs7Ozs7a0JBSVVKLFUiLCJmaWxlIjoiQWN0aW9uQXJlYS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFZpZXcsIFdpZGdldCB9IGZyb20gJ3dtbGpzL2xpYi9ydW50aW1lJztcbmltcG9ydCBhY3Rpb25fYXJlYSBmcm9tICcuL3dtbC9hY3Rpb25fYXJlYS53bWwnO1xuXG4vKipcbiAqIEFjdGlvbkFyZWFcbiAqL1xuY2xhc3MgQWN0aW9uQXJlYSBleHRlbmRzIFdpZGdldCB7XG5cbiAgICBjb25zdHJ1Y3RvcihhdHRycywgY2hpbGRyZW4pIHtcblxuICAgICAgICBzdXBlcihhdHRycywgY2hpbGRyZW4pO1xuXG4gICAgICAgIHRoaXMudmlldyA9IG5ldyBWaWV3KGFjdGlvbl9hcmVhLCB0aGlzKTtcblxuICAgIH1cblxuICAgIG5vb3AoKSB7XG5cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMudmlldy5yZW5kZXIoKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBBY3Rpb25BcmVhXG4iXX0=