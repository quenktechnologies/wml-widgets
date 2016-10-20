'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = require('wmljs/lib/runtime');

var _drawer_navigation = require('./wml/drawer_navigation.wml');

var _drawer_navigation2 = _interopRequireDefault(_drawer_navigation);

var _watClasses = require('wat-classes');

var Class = _interopRequireWildcard(_watClasses);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * DrawerNavigation
 */
var DrawerNavigation = function (_Widget) {
    _inherits(DrawerNavigation, _Widget);

    function DrawerNavigation(attrs, children) {
        _classCallCheck(this, DrawerNavigation);

        var _this = _possibleConstructorReturn(this, (DrawerNavigation.__proto__ || Object.getPrototypeOf(DrawerNavigation)).call(this, attrs, children));

        _this.view = new _runtime.View(_drawer_navigation2.default, _this);

        return _this;
    }

    _createClass(DrawerNavigation, [{
        key: 'handleEvent',
        value: function handleEvent(e) {

            this.children.forEach(function (child) {

                if (child !== e.target) child.classList.remove(Class.ACTIVE);
            });
        }
    }, {
        key: 'onRendered',
        value: function onRendered() {
            var _this2 = this;

            this.children.forEach(function (child) {

                child.addEventListener('click', _this2);
            });
        }
    }, {
        key: 'render',
        value: function render() {

            return this.view.render();
        }
    }]);

    return DrawerNavigation;
}(_runtime.Widget);

exports.default = DrawerNavigation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXlvdXQvZHJhd2VyL0RyYXdlck5hdmlnYXRpb24uanMiXSwibmFtZXMiOlsiQ2xhc3MiLCJEcmF3ZXJOYXZpZ2F0aW9uIiwiYXR0cnMiLCJjaGlsZHJlbiIsInZpZXciLCJlIiwiZm9yRWFjaCIsImNoaWxkIiwidGFyZ2V0IiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiQUNUSVZFIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbmRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUNBOztJQUFZQSxLOzs7Ozs7Ozs7Ozs7QUFFWjs7O0lBR01DLGdCOzs7QUFFRiw4QkFBWUMsS0FBWixFQUFtQkMsUUFBbkIsRUFBNkI7QUFBQTs7QUFBQSx3SUFFbkJELEtBRm1CLEVBRVpDLFFBRlk7O0FBSXpCLGNBQUtDLElBQUwsR0FBWSxxREFBWjs7QUFKeUI7QUFNNUI7Ozs7b0NBRVdDLEMsRUFBRzs7QUFFWCxpQkFBS0YsUUFBTCxDQUFjRyxPQUFkLENBQXNCLGlCQUFTOztBQUUzQixvQkFBSUMsVUFBVUYsRUFBRUcsTUFBaEIsRUFDSUQsTUFBTUUsU0FBTixDQUFnQkMsTUFBaEIsQ0FBdUJWLE1BQU1XLE1BQTdCO0FBRVAsYUFMRDtBQU9IOzs7cUNBRVk7QUFBQTs7QUFFVCxpQkFBS1IsUUFBTCxDQUFjRyxPQUFkLENBQXNCLGlCQUFTOztBQUUzQkMsc0JBQU1LLGdCQUFOLENBQXVCLE9BQXZCO0FBRUgsYUFKRDtBQU1IOzs7aUNBRVE7O0FBRUwsbUJBQU8sS0FBS1IsSUFBTCxDQUFVUyxNQUFWLEVBQVA7QUFFSDs7Ozs7O2tCQUlVWixnQiIsImZpbGUiOiJEcmF3ZXJOYXZpZ2F0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmlldywgV2lkZ2V0IH0gZnJvbSAnd21sanMvbGliL3J1bnRpbWUnO1xuaW1wb3J0IGRyYXdlcl9uYXZpZ2F0aW9uIGZyb20gJy4vd21sL2RyYXdlcl9uYXZpZ2F0aW9uLndtbCc7XG5pbXBvcnQgKiBhcyBDbGFzcyBmcm9tICd3YXQtY2xhc3Nlcyc7XG5cbi8qKlxuICogRHJhd2VyTmF2aWdhdGlvblxuICovXG5jbGFzcyBEcmF3ZXJOYXZpZ2F0aW9uIGV4dGVuZHMgV2lkZ2V0IHtcblxuICAgIGNvbnN0cnVjdG9yKGF0dHJzLCBjaGlsZHJlbikge1xuXG4gICAgICAgIHN1cGVyKGF0dHJzLCBjaGlsZHJlbik7XG5cbiAgICAgICAgdGhpcy52aWV3ID0gbmV3IFZpZXcoZHJhd2VyX25hdmlnYXRpb24sIHRoaXMpO1xuXG4gICAgfVxuXG4gICAgaGFuZGxlRXZlbnQoZSkge1xuXG4gICAgICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG5cbiAgICAgICAgICAgIGlmIChjaGlsZCAhPT0gZS50YXJnZXQpXG4gICAgICAgICAgICAgICAgY2hpbGQuY2xhc3NMaXN0LnJlbW92ZShDbGFzcy5BQ1RJVkUpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgb25SZW5kZXJlZCgpIHtcblxuICAgICAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuXG4gICAgICAgICAgICBjaGlsZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiB0aGlzLnZpZXcucmVuZGVyKCk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgRHJhd2VyTmF2aWdhdGlvblxuIl19