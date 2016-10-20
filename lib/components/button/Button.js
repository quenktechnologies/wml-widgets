'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = require('wmljs/lib/runtime');

var _button = require('./wml/button.wml');

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Button a bootstrap styled button.
 */
var Button = function (_Widget) {
    _inherits(Button, _Widget);

    function Button(attrs, children) {
        _classCallCheck(this, Button);

        var _this = _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this, attrs, children));

        _this.view = new _runtime.View(_button2.default, _this);

        return _this;
    }

    _createClass(Button, [{
        key: 'getClass',
        value: function getClass() {

            var variant = this.attributes.read('wat:variant', 'default');
            var cls = this.attributes.read('wat:class', '');
            return ('btn btn-' + variant + ' ' + cls).trim();
        }
    }, {
        key: 'clicked',
        value: function clicked(e) {

            this.attributes.read('wat:onClick', function () {})(e.target.name, this, e);
        }

        /**
         * disable this button.
         */

    }, {
        key: 'disable',
        value: function disable() {

            this.view.findById('root').setAttribute('disabled', 'disabled');
        }

        /**
         * enable this button.
         */

    }, {
        key: 'enable',
        value: function enable() {

            this.view.findById('root').removeAttribute('disabled');
        }
    }, {
        key: 'onRendered',
        value: function onRendered() {

            if (this.attributes.read('wat:disabled')) this.view.findById('root').setAttribute('disabled', 'disabled');
        }
    }, {
        key: 'render',
        value: function render() {

            return this.view.render();
        }
    }]);

    return Button;
}(_runtime.Widget);

exports.default = Button;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2J1dHRvbi9CdXR0b24uanMiXSwibmFtZXMiOlsiQnV0dG9uIiwiYXR0cnMiLCJjaGlsZHJlbiIsInZpZXciLCJ2YXJpYW50IiwiYXR0cmlidXRlcyIsInJlYWQiLCJjbHMiLCJ0cmltIiwiZSIsInRhcmdldCIsIm5hbWUiLCJmaW5kQnlJZCIsInNldEF0dHJpYnV0ZSIsInJlbW92ZUF0dHJpYnV0ZSIsInJlbmRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUE7OztJQUdNQSxNOzs7QUFFRixvQkFBWUMsS0FBWixFQUFtQkMsUUFBbkIsRUFBNkI7QUFBQTs7QUFBQSxvSEFFbkJELEtBRm1CLEVBRVpDLFFBRlk7O0FBSXpCLGNBQUtDLElBQUwsR0FBWSwwQ0FBWjs7QUFKeUI7QUFNNUI7Ozs7bUNBRVU7O0FBRVAsZ0JBQUlDLFVBQVUsS0FBS0MsVUFBTCxDQUFnQkMsSUFBaEIsQ0FBcUIsYUFBckIsRUFBb0MsU0FBcEMsQ0FBZDtBQUNBLGdCQUFJQyxNQUFNLEtBQUtGLFVBQUwsQ0FBZ0JDLElBQWhCLENBQXFCLFdBQXJCLEVBQWtDLEVBQWxDLENBQVY7QUFDQSxtQkFBTyxjQUFXRixPQUFYLFNBQXNCRyxHQUF0QixFQUE0QkMsSUFBNUIsRUFBUDtBQUVIOzs7Z0NBRU9DLEMsRUFBRzs7QUFFUCxpQkFBS0osVUFBTCxDQUFnQkMsSUFBaEIsQ0FBcUIsYUFBckIsRUFBb0MsWUFBVyxDQUFFLENBQWpELEVBQW1ERyxFQUFFQyxNQUFGLENBQVNDLElBQTVELEVBQWtFLElBQWxFLEVBQXdFRixDQUF4RTtBQUVIOztBQUVEOzs7Ozs7a0NBR1U7O0FBRU4saUJBQUtOLElBQUwsQ0FBVVMsUUFBVixDQUFtQixNQUFuQixFQUEyQkMsWUFBM0IsQ0FBd0MsVUFBeEMsRUFBb0QsVUFBcEQ7QUFFSDs7QUFFRDs7Ozs7O2lDQUdTOztBQUVMLGlCQUFLVixJQUFMLENBQVVTLFFBQVYsQ0FBbUIsTUFBbkIsRUFBMkJFLGVBQTNCLENBQTJDLFVBQTNDO0FBRUg7OztxQ0FFWTs7QUFFVCxnQkFBRyxLQUFLVCxVQUFMLENBQWdCQyxJQUFoQixDQUFxQixjQUFyQixDQUFILEVBQ0ksS0FBS0gsSUFBTCxDQUFVUyxRQUFWLENBQW1CLE1BQW5CLEVBQTJCQyxZQUEzQixDQUF3QyxVQUF4QyxFQUFvRCxVQUFwRDtBQUVQOzs7aUNBRVE7O0FBRUwsbUJBQU8sS0FBS1YsSUFBTCxDQUFVWSxNQUFWLEVBQVA7QUFFSDs7Ozs7O2tCQUlVZixNIiwiZmlsZSI6IkJ1dHRvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFZpZXcsIFdpZGdldCB9IGZyb20gJ3dtbGpzL2xpYi9ydW50aW1lJztcbmltcG9ydCBidXR0b24gZnJvbSAnLi93bWwvYnV0dG9uLndtbCc7XG5cbi8qKlxuICogQnV0dG9uIGEgYm9vdHN0cmFwIHN0eWxlZCBidXR0b24uXG4gKi9cbmNsYXNzIEJ1dHRvbiBleHRlbmRzIFdpZGdldCB7XG5cbiAgICBjb25zdHJ1Y3RvcihhdHRycywgY2hpbGRyZW4pIHtcblxuICAgICAgICBzdXBlcihhdHRycywgY2hpbGRyZW4pO1xuXG4gICAgICAgIHRoaXMudmlldyA9IG5ldyBWaWV3KGJ1dHRvbiwgdGhpcyk7XG5cbiAgICB9XG5cbiAgICBnZXRDbGFzcygpIHtcblxuICAgICAgICB2YXIgdmFyaWFudCA9IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3YXQ6dmFyaWFudCcsICdkZWZhdWx0Jyk7XG4gICAgICAgIHZhciBjbHMgPSB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd2F0OmNsYXNzJywgJycpO1xuICAgICAgICByZXR1cm4gYGJ0biBidG4tJHt2YXJpYW50fSAke2Nsc31gLnRyaW0oKTtcblxuICAgIH1cblxuICAgIGNsaWNrZWQoZSkge1xuXG4gICAgICAgIHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3YXQ6b25DbGljaycsIGZ1bmN0aW9uKCkge30pKGUudGFyZ2V0Lm5hbWUsIHRoaXMsIGUpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZGlzYWJsZSB0aGlzIGJ1dHRvbi5cbiAgICAgKi9cbiAgICBkaXNhYmxlKCkge1xuXG4gICAgICAgIHRoaXMudmlldy5maW5kQnlJZCgncm9vdCcpLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGVuYWJsZSB0aGlzIGJ1dHRvbi5cbiAgICAgKi9cbiAgICBlbmFibGUoKSB7XG5cbiAgICAgICAgdGhpcy52aWV3LmZpbmRCeUlkKCdyb290JykucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuXG4gICAgfVxuXG4gICAgb25SZW5kZXJlZCgpIHtcblxuICAgICAgICBpZih0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd2F0OmRpc2FibGVkJykpXG4gICAgICAgICAgICB0aGlzLnZpZXcuZmluZEJ5SWQoJ3Jvb3QnKS5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG5cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMudmlldy5yZW5kZXIoKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBCdXR0b25cbiJdfQ==