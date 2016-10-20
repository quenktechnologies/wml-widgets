'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = require('wmljs/lib/runtime');

var _watClasses = require('wat-classes');

var Class = _interopRequireWildcard(_watClasses);

var _notification = require('./wml/notification.wml');

var _notification2 = _interopRequireDefault(_notification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Notification
 */
var Notification = function (_Widget) {
    _inherits(Notification, _Widget);

    function Notification(attrs, children) {
        _classCallCheck(this, Notification);

        var _this = _possibleConstructorReturn(this, (Notification.__proto__ || Object.getPrototypeOf(Notification)).call(this, attrs, children));

        _this.view = new _runtime.View(_notification2.default, _this);

        return _this;
    }

    /**
     * put a message into the notification widget.
     * Messages are shown for a specific time before
     * they are hidden.
     */


    _createClass(Notification, [{
        key: 'put',
        value: function put(message) {

            var node = this.view.findById('message');

            node.classList.remove(Class.VISIBLE);

            while (node.lastChild) {
                node.removeChild(node.lastChild);
            }node.appendChild(document.createTextNode(message));

            node.classList.add(Class.VISIBLE);

            setTimeout(function () {

                node.classList.remove(Class.VISIBLE);
            }, this.attributes.read('wat:delay', 3) * 1000);
        }
    }, {
        key: 'render',
        value: function render() {

            return this.view.render();
        }
    }]);

    return Notification;
}(_runtime.Widget);

exports.default = Notification;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXlvdXQvbm90aWZpY2F0aW9uL05vdGlmaWNhdGlvbi5qcyJdLCJuYW1lcyI6WyJDbGFzcyIsIk5vdGlmaWNhdGlvbiIsImF0dHJzIiwiY2hpbGRyZW4iLCJ2aWV3IiwibWVzc2FnZSIsIm5vZGUiLCJmaW5kQnlJZCIsImNsYXNzTGlzdCIsInJlbW92ZSIsIlZJU0lCTEUiLCJsYXN0Q2hpbGQiLCJyZW1vdmVDaGlsZCIsImFwcGVuZENoaWxkIiwiZG9jdW1lbnQiLCJjcmVhdGVUZXh0Tm9kZSIsImFkZCIsInNldFRpbWVvdXQiLCJhdHRyaWJ1dGVzIiwicmVhZCIsInJlbmRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFDQTs7SUFBWUEsSzs7QUFDWjs7Ozs7Ozs7Ozs7Ozs7QUFFQTs7O0lBR01DLFk7OztBQUVGLDBCQUFZQyxLQUFaLEVBQW1CQyxRQUFuQixFQUE2QjtBQUFBOztBQUFBLGdJQUVuQkQsS0FGbUIsRUFFWkMsUUFGWTs7QUFJekIsY0FBS0MsSUFBTCxHQUFZLGdEQUFaOztBQUp5QjtBQU01Qjs7QUFFRDs7Ozs7Ozs7OzRCQUtJQyxPLEVBQVM7O0FBRVQsZ0JBQUlDLE9BQU8sS0FBS0YsSUFBTCxDQUFVRyxRQUFWLENBQW1CLFNBQW5CLENBQVg7O0FBRUFELGlCQUFLRSxTQUFMLENBQWVDLE1BQWYsQ0FBc0JULE1BQU1VLE9BQTVCOztBQUVBLG1CQUFPSixLQUFLSyxTQUFaO0FBQ0lMLHFCQUFLTSxXQUFMLENBQWlCTixLQUFLSyxTQUF0QjtBQURKLGFBR0FMLEtBQUtPLFdBQUwsQ0FBaUJDLFNBQVNDLGNBQVQsQ0FBd0JWLE9BQXhCLENBQWpCOztBQUVBQyxpQkFBS0UsU0FBTCxDQUFlUSxHQUFmLENBQW1CaEIsTUFBTVUsT0FBekI7O0FBRUFPLHVCQUFXLFlBQVc7O0FBRWxCWCxxQkFBS0UsU0FBTCxDQUFlQyxNQUFmLENBQXNCVCxNQUFNVSxPQUE1QjtBQUVILGFBSkQsRUFJRyxLQUFLUSxVQUFMLENBQWdCQyxJQUFoQixDQUFxQixXQUFyQixFQUFrQyxDQUFsQyxJQUF1QyxJQUoxQztBQU1IOzs7aUNBRVE7O0FBRUwsbUJBQU8sS0FBS2YsSUFBTCxDQUFVZ0IsTUFBVixFQUFQO0FBRUg7Ozs7OztrQkFHVW5CLFkiLCJmaWxlIjoiTm90aWZpY2F0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmlldywgV2lkZ2V0IH0gZnJvbSAnd21sanMvbGliL3J1bnRpbWUnO1xuaW1wb3J0ICogYXMgQ2xhc3MgZnJvbSAnd2F0LWNsYXNzZXMnO1xuaW1wb3J0IG5vdGlmaWNhdGlvbiBmcm9tICcuL3dtbC9ub3RpZmljYXRpb24ud21sJztcblxuLyoqXG4gKiBOb3RpZmljYXRpb25cbiAqL1xuY2xhc3MgTm90aWZpY2F0aW9uIGV4dGVuZHMgV2lkZ2V0IHtcblxuICAgIGNvbnN0cnVjdG9yKGF0dHJzLCBjaGlsZHJlbikge1xuXG4gICAgICAgIHN1cGVyKGF0dHJzLCBjaGlsZHJlbik7XG5cbiAgICAgICAgdGhpcy52aWV3ID0gbmV3IFZpZXcobm90aWZpY2F0aW9uLCB0aGlzKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHB1dCBhIG1lc3NhZ2UgaW50byB0aGUgbm90aWZpY2F0aW9uIHdpZGdldC5cbiAgICAgKiBNZXNzYWdlcyBhcmUgc2hvd24gZm9yIGEgc3BlY2lmaWMgdGltZSBiZWZvcmVcbiAgICAgKiB0aGV5IGFyZSBoaWRkZW4uXG4gICAgICovXG4gICAgcHV0KG1lc3NhZ2UpIHtcblxuICAgICAgICB2YXIgbm9kZSA9IHRoaXMudmlldy5maW5kQnlJZCgnbWVzc2FnZScpO1xuXG4gICAgICAgIG5vZGUuY2xhc3NMaXN0LnJlbW92ZShDbGFzcy5WSVNJQkxFKTtcblxuICAgICAgICB3aGlsZSAobm9kZS5sYXN0Q2hpbGQpXG4gICAgICAgICAgICBub2RlLnJlbW92ZUNoaWxkKG5vZGUubGFzdENoaWxkKTtcblxuICAgICAgICBub2RlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKG1lc3NhZ2UpKTtcblxuICAgICAgICBub2RlLmNsYXNzTGlzdC5hZGQoQ2xhc3MuVklTSUJMRSk7XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgbm9kZS5jbGFzc0xpc3QucmVtb3ZlKENsYXNzLlZJU0lCTEUpO1xuXG4gICAgICAgIH0sIHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3YXQ6ZGVsYXknLCAzKSAqIDEwMDApO1xuXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiB0aGlzLnZpZXcucmVuZGVyKCk7XG5cbiAgICB9XG5cbn1cbmV4cG9ydCBkZWZhdWx0IE5vdGlmaWNhdGlvblxuIl19