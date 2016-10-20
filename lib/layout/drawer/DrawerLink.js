'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = require('wmljs/lib/runtime');

var _watClasses = require('wat-classes');

var Class = _interopRequireWildcard(_watClasses);

var _drawer_link = require('./wml/drawer_link.wml');

var _drawer_link2 = _interopRequireDefault(_drawer_link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * DrawerLink
 */
var DrawerLink = function (_Widget) {
    _inherits(DrawerLink, _Widget);

    function DrawerLink(attrs, children) {
        _classCallCheck(this, DrawerLink);

        var _this = _possibleConstructorReturn(this, (DrawerLink.__proto__ || Object.getPrototypeOf(DrawerLink)).call(this, attrs, children));

        _this.href = attrs.read('wat:href');
        _this.view = new _runtime.View(_drawer_link2.default, _this);

        return _this;
    }

    /**
     * add the active state of this DrawerLink
     */


    _createClass(DrawerLink, [{
        key: 'activate',
        value: function activate() {

            var a = this.view.findById('a');
            var children = this.view.findById('a').parentNode.children;

            a.classList.remove(Class.ACTIVE);
            a.classList.add(Class.ACTIVE);

            for (var i = 0; i < children.length; i++) {
                if (children[i].nodeName === 'A') if (children[i] !== a) children[i].classList.remove(Class.ACTIVE);
            }
        }

        /**
         * deactivate this DrawerLink
         */

    }, {
        key: 'deactivate',
        value: function deactivate() {

            this.view.findById('a').classList.remove(Class.ACTIVE);
        }
    }, {
        key: 'clicked',
        value: function clicked() {

            this.activate();
            this.attributes.read('wat:onClick', function () {})(this);
        }
    }, {
        key: 'render',
        value: function render() {

            return this.view.render();
        }
    }]);

    return DrawerLink;
}(_runtime.Widget);

exports.default = DrawerLink;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXlvdXQvZHJhd2VyL0RyYXdlckxpbmsuanMiXSwibmFtZXMiOlsiQ2xhc3MiLCJEcmF3ZXJMaW5rIiwiYXR0cnMiLCJjaGlsZHJlbiIsImhyZWYiLCJyZWFkIiwidmlldyIsImEiLCJmaW5kQnlJZCIsInBhcmVudE5vZGUiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJBQ1RJVkUiLCJhZGQiLCJpIiwibGVuZ3RoIiwibm9kZU5hbWUiLCJhY3RpdmF0ZSIsImF0dHJpYnV0ZXMiLCJyZW5kZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0lBQVlBLEs7O0FBQ1o7Ozs7Ozs7Ozs7Ozs7O0FBRUE7OztJQUdNQyxVOzs7QUFFRix3QkFBWUMsS0FBWixFQUFtQkMsUUFBbkIsRUFBNkI7QUFBQTs7QUFBQSw0SEFFbkJELEtBRm1CLEVBRVpDLFFBRlk7O0FBR3pCLGNBQUtDLElBQUwsR0FBWUYsTUFBTUcsSUFBTixDQUFXLFVBQVgsQ0FBWjtBQUNBLGNBQUtDLElBQUwsR0FBWSwrQ0FBWjs7QUFKeUI7QUFNNUI7O0FBRUQ7Ozs7Ozs7bUNBR1c7O0FBRVAsZ0JBQUlDLElBQUksS0FBS0QsSUFBTCxDQUFVRSxRQUFWLENBQW1CLEdBQW5CLENBQVI7QUFDQSxnQkFBSUwsV0FBVyxLQUFLRyxJQUFMLENBQVVFLFFBQVYsQ0FBbUIsR0FBbkIsRUFBd0JDLFVBQXhCLENBQW1DTixRQUFsRDs7QUFFQUksY0FBRUcsU0FBRixDQUFZQyxNQUFaLENBQW1CWCxNQUFNWSxNQUF6QjtBQUNBTCxjQUFFRyxTQUFGLENBQVlHLEdBQVosQ0FBZ0JiLE1BQU1ZLE1BQXRCOztBQUVBLGlCQUFLLElBQUlFLElBQUksQ0FBYixFQUFnQkEsSUFBSVgsU0FBU1ksTUFBN0IsRUFBcUNELEdBQXJDO0FBQ0ksb0JBQUlYLFNBQVNXLENBQVQsRUFBWUUsUUFBWixLQUF5QixHQUE3QixFQUNJLElBQUliLFNBQVNXLENBQVQsTUFBZ0JQLENBQXBCLEVBQ0lKLFNBQVNXLENBQVQsRUFBWUosU0FBWixDQUFzQkMsTUFBdEIsQ0FBNkJYLE1BQU1ZLE1BQW5DO0FBSFo7QUFLSDs7QUFFRDs7Ozs7O3FDQUdhOztBQUVULGlCQUFLTixJQUFMLENBQVVFLFFBQVYsQ0FBbUIsR0FBbkIsRUFBd0JFLFNBQXhCLENBQWtDQyxNQUFsQyxDQUF5Q1gsTUFBTVksTUFBL0M7QUFFSDs7O2tDQUVTOztBQUVOLGlCQUFLSyxRQUFMO0FBQ0EsaUJBQUtDLFVBQUwsQ0FBZ0JiLElBQWhCLENBQXFCLGFBQXJCLEVBQW9DLFlBQVcsQ0FBRSxDQUFqRCxFQUFtRCxJQUFuRDtBQUVIOzs7aUNBRVE7O0FBRUwsbUJBQU8sS0FBS0MsSUFBTCxDQUFVYSxNQUFWLEVBQVA7QUFFSDs7Ozs7O2tCQUlVbEIsVSIsImZpbGUiOiJEcmF3ZXJMaW5rLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmlldywgV2lkZ2V0IH0gZnJvbSAnd21sanMvbGliL3J1bnRpbWUnO1xuaW1wb3J0ICogYXMgQ2xhc3MgZnJvbSAnd2F0LWNsYXNzZXMnO1xuaW1wb3J0IGRyYXdlcl9saW5rIGZyb20gJy4vd21sL2RyYXdlcl9saW5rLndtbCc7XG5cbi8qKlxuICogRHJhd2VyTGlua1xuICovXG5jbGFzcyBEcmF3ZXJMaW5rIGV4dGVuZHMgV2lkZ2V0IHtcblxuICAgIGNvbnN0cnVjdG9yKGF0dHJzLCBjaGlsZHJlbikge1xuXG4gICAgICAgIHN1cGVyKGF0dHJzLCBjaGlsZHJlbik7XG4gICAgICAgIHRoaXMuaHJlZiA9IGF0dHJzLnJlYWQoJ3dhdDpocmVmJyk7XG4gICAgICAgIHRoaXMudmlldyA9IG5ldyBWaWV3KGRyYXdlcl9saW5rLCB0aGlzKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGFkZCB0aGUgYWN0aXZlIHN0YXRlIG9mIHRoaXMgRHJhd2VyTGlua1xuICAgICAqL1xuICAgIGFjdGl2YXRlKCkge1xuXG4gICAgICAgIHZhciBhID0gdGhpcy52aWV3LmZpbmRCeUlkKCdhJyk7XG4gICAgICAgIHZhciBjaGlsZHJlbiA9IHRoaXMudmlldy5maW5kQnlJZCgnYScpLnBhcmVudE5vZGUuY2hpbGRyZW47XG5cbiAgICAgICAgYS5jbGFzc0xpc3QucmVtb3ZlKENsYXNzLkFDVElWRSk7XG4gICAgICAgIGEuY2xhc3NMaXN0LmFkZChDbGFzcy5BQ1RJVkUpO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICBpZiAoY2hpbGRyZW5baV0ubm9kZU5hbWUgPT09ICdBJylcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGRyZW5baV0gIT09IGEpXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuW2ldLmNsYXNzTGlzdC5yZW1vdmUoQ2xhc3MuQUNUSVZFKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGRlYWN0aXZhdGUgdGhpcyBEcmF3ZXJMaW5rXG4gICAgICovXG4gICAgZGVhY3RpdmF0ZSgpIHtcblxuICAgICAgICB0aGlzLnZpZXcuZmluZEJ5SWQoJ2EnKS5jbGFzc0xpc3QucmVtb3ZlKENsYXNzLkFDVElWRSk7XG5cbiAgICB9XG5cbiAgICBjbGlja2VkKCkge1xuXG4gICAgICAgIHRoaXMuYWN0aXZhdGUoKTtcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDpvbkNsaWNrJywgZnVuY3Rpb24oKSB7fSkodGhpcyk7XG5cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMudmlldy5yZW5kZXIoKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBEcmF3ZXJMaW5rXG4iXX0=