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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXlvdXQvYWN0aW9uLWFyZWEvQWN0aW9uQXJlYS5qcyJdLCJuYW1lcyI6WyJBY3Rpb25BcmVhIiwiYXR0cnMiLCJjaGlsZHJlbiIsInZpZXciLCJyIiwiY29udGVudCIsImZpbmRCeUlkIiwibGFzdENoaWxkIiwicmVtb3ZlQ2hpbGQiLCJhcHBlbmRDaGlsZCIsInJlbmRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUE7OztJQUdNQSxVOzs7QUFFRix3QkFBWUMsS0FBWixFQUFtQkMsUUFBbkIsRUFBNkI7QUFBQTs7QUFBQSw0SEFFbkJELEtBRm1CLEVBRVpDLFFBRlk7O0FBSXpCLGNBQUtDLElBQUwsR0FBWSwrQ0FBWjs7QUFKeUI7QUFNNUI7O0FBRUQ7Ozs7Ozs7O21DQUlXQyxDLEVBQUc7O0FBRVYsZ0JBQUlDLFVBQVUsS0FBS0YsSUFBTCxDQUFVRyxRQUFWLENBQW1CLFNBQW5CLENBQWQ7O0FBRUEsbUJBQU9ELFFBQVFFLFNBQWY7QUFDSUYsd0JBQVFHLFdBQVIsQ0FBb0JILFFBQVFFLFNBQTVCO0FBREosYUFHQUYsUUFBUUksV0FBUixDQUFvQkwsRUFBRU0sTUFBRixFQUFwQjtBQUVIOzs7K0JBRU0sQ0FFTjs7O2lDQUVROztBQUVMLG1CQUFPLEtBQUtQLElBQUwsQ0FBVU8sTUFBVixFQUFQO0FBRUg7Ozs7OztrQkFJVVYsVSIsImZpbGUiOiJBY3Rpb25BcmVhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmlldywgV2lkZ2V0IH0gZnJvbSAnd21sanMvbGliL3J1bnRpbWUnO1xuaW1wb3J0IGFjdGlvbl9hcmVhIGZyb20gJy4vd21sL2FjdGlvbl9hcmVhLndtbCc7XG5cbi8qKlxuICogQWN0aW9uQXJlYVxuICovXG5jbGFzcyBBY3Rpb25BcmVhIGV4dGVuZHMgV2lkZ2V0IHtcblxuICAgIGNvbnN0cnVjdG9yKGF0dHJzLCBjaGlsZHJlbikge1xuXG4gICAgICAgIHN1cGVyKGF0dHJzLCBjaGlsZHJlbik7XG5cbiAgICAgICAgdGhpcy52aWV3ID0gbmV3IFZpZXcoYWN0aW9uX2FyZWEsIHRoaXMpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogc2V0Q29udGVudCByZXBsYWNlcyB0aGUgY29udGVudCBvZiB0aGlzIHZpZXcuXG4gICAgICogQHBhcmFtIHtSZW5kZXJhYmxlfSByXG4gICAgICovXG4gICAgc2V0Q29udGVudChyKSB7XG5cbiAgICAgICAgdmFyIGNvbnRlbnQgPSB0aGlzLnZpZXcuZmluZEJ5SWQoJ2NvbnRlbnQnKTtcblxuICAgICAgICB3aGlsZSAoY29udGVudC5sYXN0Q2hpbGQpXG4gICAgICAgICAgICBjb250ZW50LnJlbW92ZUNoaWxkKGNvbnRlbnQubGFzdENoaWxkKTtcblxuICAgICAgICBjb250ZW50LmFwcGVuZENoaWxkKHIucmVuZGVyKCkpO1xuXG4gICAgfVxuXG4gICAgbm9vcCgpIHtcblxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy52aWV3LnJlbmRlcigpO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEFjdGlvbkFyZWFcbiJdfQ==