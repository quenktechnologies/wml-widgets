'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = require('wmljs/lib/runtime');

var _list_group_item = require('./list_group_item.wml');

var _list_group_item2 = _interopRequireDefault(_list_group_item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * ListGroupItem
 */
var ListGroupItem = function (_Widget) {
    _inherits(ListGroupItem, _Widget);

    function ListGroupItem() {
        _classCallCheck(this, ListGroupItem);

        var _this = _possibleConstructorReturn(this, (ListGroupItem.__proto__ || Object.getPrototypeOf(ListGroupItem)).apply(this, arguments));

        _this.view = new _runtime.View(_list_group_item2.default, _this);

        return _this;
    }

    _createClass(ListGroupItem, [{
        key: 'getClass',
        value: function getClass() {

            var cls = 'list-group';
            var variant = 'list-group-item-' + this.attributes.read('wat:variant', 'default');

            return cls + ' ' + variant;
        }
    }, {
        key: 'render',
        value: function render() {

            return this.view.render();
        }
    }]);

    return ListGroupItem;
}(_runtime.Widget);

exports.default = ListGroupItem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2xpc3QtZ3JvdXAvTGlzdEdyb3VwSXRlbS5qcyJdLCJuYW1lcyI6WyJMaXN0R3JvdXBJdGVtIiwiYXJndW1lbnRzIiwidmlldyIsImNscyIsInZhcmlhbnQiLCJhdHRyaWJ1dGVzIiwicmVhZCIsInJlbmRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUE7OztJQUdNQSxhOzs7QUFFRiw2QkFBYztBQUFBOztBQUFBLG1JQUVEQyxTQUZDOztBQUlWLGNBQUtDLElBQUwsR0FBWSxtREFBWjs7QUFKVTtBQU1iOzs7O21DQUVVOztBQUVQLGdCQUFJQyxNQUFNLFlBQVY7QUFDQSxnQkFBSUMsK0JBQTZCLEtBQUtDLFVBQUwsQ0FBZ0JDLElBQWhCLENBQXFCLGFBQXJCLEVBQW9DLFNBQXBDLENBQWpDOztBQUVBLG1CQUFVSCxHQUFWLFNBQWlCQyxPQUFqQjtBQUVIOzs7aUNBRVE7O0FBRUwsbUJBQU8sS0FBS0YsSUFBTCxDQUFVSyxNQUFWLEVBQVA7QUFFSDs7Ozs7O2tCQUlVUCxhIiwiZmlsZSI6Ikxpc3RHcm91cEl0ZW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWaWV3LCBXaWRnZXQgfSBmcm9tICd3bWxqcy9saWIvcnVudGltZSc7XG5pbXBvcnQgbGlzdF9ncm91cF9pdGVtIGZyb20gJy4vbGlzdF9ncm91cF9pdGVtLndtbCc7XG5cbi8qKlxuICogTGlzdEdyb3VwSXRlbVxuICovXG5jbGFzcyBMaXN0R3JvdXBJdGVtIGV4dGVuZHMgV2lkZ2V0IHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG5cbiAgICAgICAgdGhpcy52aWV3ID0gbmV3IFZpZXcobGlzdF9ncm91cF9pdGVtLCB0aGlzKTtcblxuICAgIH1cblxuICAgIGdldENsYXNzKCkge1xuXG4gICAgICAgIHZhciBjbHMgPSAnbGlzdC1ncm91cCc7XG4gICAgICAgIHZhciB2YXJpYW50ID0gYGxpc3QtZ3JvdXAtaXRlbS0ke3RoaXMuYXR0cmlidXRlcy5yZWFkKCd3YXQ6dmFyaWFudCcsICdkZWZhdWx0Jyl9YDtcblxuICAgICAgICByZXR1cm4gYCR7Y2xzfSAke3ZhcmlhbnR9YDtcblxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy52aWV3LnJlbmRlcigpO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IExpc3RHcm91cEl0ZW1cbiJdfQ==