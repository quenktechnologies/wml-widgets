'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = require('wmljs/lib/runtime');

var _watClasses = require('wat-classes');

var Class = _interopRequireWildcard(_watClasses);

var _side_navigation_item = require('./wml/side_navigation_item.wml');

var _side_navigation_item2 = _interopRequireDefault(_side_navigation_item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * SideNavigationItem
 */
var SideNavigationItem = function (_Widget) {
    _inherits(SideNavigationItem, _Widget);

    function SideNavigationItem(attrs, children) {
        _classCallCheck(this, SideNavigationItem);

        var _this = _possibleConstructorReturn(this, (SideNavigationItem.__proto__ || Object.getPrototypeOf(SideNavigationItem)).call(this, attrs, children));

        _this.view = new _runtime.View(_side_navigation_item2.default, _this);

        return _this;
    }

    /**
     * add the active state of this SideNavigationItem
     */


    _createClass(SideNavigationItem, [{
        key: 'active',
        value: function active() {

            this.view.findById('a').classList.remove(Class.ACTIVE);
            this.view.findById('a').classList.add(Class.ACTIVE);
        }
    }, {
        key: 'clicked',
        value: function clicked() {

            this.attributes.read('wat:onClick', function () {})(this);
        }
    }, {
        key: 'render',
        value: function render() {

            return this.view.render();
        }
    }]);

    return SideNavigationItem;
}(_runtime.Widget);

exports.default = SideNavigationItem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXlvdXQvc2lkZS1uYXZpZ2F0aW9uL1NpZGVOYXZpZ2F0aW9uSXRlbS5qcyJdLCJuYW1lcyI6WyJDbGFzcyIsIlNpZGVOYXZpZ2F0aW9uSXRlbSIsImF0dHJzIiwiY2hpbGRyZW4iLCJ2aWV3IiwiZmluZEJ5SWQiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJBQ1RJVkUiLCJhZGQiLCJhdHRyaWJ1dGVzIiwicmVhZCIsInJlbmRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFDQTs7SUFBWUEsSzs7QUFDWjs7Ozs7Ozs7Ozs7Ozs7QUFFQTs7O0lBR01DLGtCOzs7QUFFRixnQ0FBWUMsS0FBWixFQUFtQkMsUUFBbkIsRUFBNkI7QUFBQTs7QUFBQSw0SUFFbkJELEtBRm1CLEVBRVpDLFFBRlk7O0FBR3pCLGNBQUtDLElBQUwsR0FBWSx3REFBWjs7QUFIeUI7QUFLNUI7O0FBRUQ7Ozs7Ozs7aUNBR1M7O0FBRUwsaUJBQUtBLElBQUwsQ0FBVUMsUUFBVixDQUFtQixHQUFuQixFQUF3QkMsU0FBeEIsQ0FBa0NDLE1BQWxDLENBQXlDUCxNQUFNUSxNQUEvQztBQUNBLGlCQUFLSixJQUFMLENBQVVDLFFBQVYsQ0FBbUIsR0FBbkIsRUFBd0JDLFNBQXhCLENBQWtDRyxHQUFsQyxDQUFzQ1QsTUFBTVEsTUFBNUM7QUFFSDs7O2tDQUVTOztBQUVOLGlCQUFLRSxVQUFMLENBQWdCQyxJQUFoQixDQUFxQixhQUFyQixFQUFvQyxZQUFXLENBQUUsQ0FBakQsRUFBbUQsSUFBbkQ7QUFFSDs7O2lDQUVROztBQUVMLG1CQUFPLEtBQUtQLElBQUwsQ0FBVVEsTUFBVixFQUFQO0FBRUg7Ozs7OztrQkFJVVgsa0IiLCJmaWxlIjoiU2lkZU5hdmlnYXRpb25JdGVtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmlldywgV2lkZ2V0IH0gZnJvbSAnd21sanMvbGliL3J1bnRpbWUnO1xuaW1wb3J0ICogYXMgQ2xhc3MgZnJvbSAnd2F0LWNsYXNzZXMnO1xuaW1wb3J0IHNpZGVfbmF2aWdhdGlvbl9pdGVtIGZyb20gJy4vd21sL3NpZGVfbmF2aWdhdGlvbl9pdGVtLndtbCc7XG5cbi8qKlxuICogU2lkZU5hdmlnYXRpb25JdGVtXG4gKi9cbmNsYXNzIFNpZGVOYXZpZ2F0aW9uSXRlbSBleHRlbmRzIFdpZGdldCB7XG5cbiAgICBjb25zdHJ1Y3RvcihhdHRycywgY2hpbGRyZW4pIHtcblxuICAgICAgICBzdXBlcihhdHRycywgY2hpbGRyZW4pO1xuICAgICAgICB0aGlzLnZpZXcgPSBuZXcgVmlldyhzaWRlX25hdmlnYXRpb25faXRlbSwgdGhpcyk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBhZGQgdGhlIGFjdGl2ZSBzdGF0ZSBvZiB0aGlzIFNpZGVOYXZpZ2F0aW9uSXRlbVxuICAgICAqL1xuICAgIGFjdGl2ZSgpIHtcblxuICAgICAgICB0aGlzLnZpZXcuZmluZEJ5SWQoJ2EnKS5jbGFzc0xpc3QucmVtb3ZlKENsYXNzLkFDVElWRSk7XG4gICAgICAgIHRoaXMudmlldy5maW5kQnlJZCgnYScpLmNsYXNzTGlzdC5hZGQoQ2xhc3MuQUNUSVZFKTtcblxuICAgIH1cblxuICAgIGNsaWNrZWQoKSB7XG5cbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDpvbkNsaWNrJywgZnVuY3Rpb24oKSB7fSkodGhpcyk7XG5cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMudmlldy5yZW5kZXIoKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBTaWRlTmF2aWdhdGlvbkl0ZW1cbiJdfQ==