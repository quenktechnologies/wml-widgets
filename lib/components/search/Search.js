'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = require('wmljs/lib/runtime');

var _search = require('./search.wml');

var _search2 = _interopRequireDefault(_search);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Search
 */
var Search = function (_Widget) {
    _inherits(Search, _Widget);

    function Search() {
        _classCallCheck(this, Search);

        var _this = _possibleConstructorReturn(this, (Search.__proto__ || Object.getPrototypeOf(Search)).apply(this, arguments));

        _this.delegate = _this.attributes.read('wat:delegate', {
            onInput: function onInput() {},
            onSubmit: function onSubmit() {},
            onSearch: function onSearch() {}
        });

        return _this;
    }

    _createClass(Search, [{
        key: 'render',
        value: function render() {

            return _runtime.View.render(_search2.default, this);
        }
    }]);

    return Search;
}(_runtime.Widget);

exports.default = Search;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NlYXJjaC9TZWFyY2guanMiXSwibmFtZXMiOlsiU2VhcmNoIiwiYXJndW1lbnRzIiwiZGVsZWdhdGUiLCJhdHRyaWJ1dGVzIiwicmVhZCIsIm9uSW5wdXQiLCJvblN1Ym1pdCIsIm9uU2VhcmNoIiwicmVuZGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQTs7O0lBR01BLE07OztBQUVGLHNCQUFjO0FBQUE7O0FBQUEscUhBRURDLFNBRkM7O0FBSVYsY0FBS0MsUUFBTCxHQUFnQixNQUFLQyxVQUFMLENBQWdCQyxJQUFoQixDQUFxQixjQUFyQixFQUFxQztBQUNqREMsbUJBRGlELHFCQUN2QyxDQUFFLENBRHFDO0FBRWpEQyxvQkFGaUQsc0JBRXZDLENBQUUsQ0FGcUM7QUFHakRDLG9CQUhpRCxzQkFHdEMsQ0FBRTtBQUhvQyxTQUFyQyxDQUFoQjs7QUFKVTtBQVViOzs7O2lDQUVROztBQUVMLG1CQUFPLGNBQUtDLE1BQUwsbUJBQW9CLElBQXBCLENBQVA7QUFFSDs7Ozs7O2tCQUlVUixNIiwiZmlsZSI6IlNlYXJjaC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFZpZXcsIFdpZGdldCB9IGZyb20gJ3dtbGpzL2xpYi9ydW50aW1lJztcbmltcG9ydCBzZWFyY2ggZnJvbSAnLi9zZWFyY2gud21sJztcblxuLyoqXG4gKiBTZWFyY2hcbiAqL1xuY2xhc3MgU2VhcmNoIGV4dGVuZHMgV2lkZ2V0IHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG5cbiAgICAgICAgdGhpcy5kZWxlZ2F0ZSA9IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3YXQ6ZGVsZWdhdGUnLCB7XG4gICAgICAgICAgICBvbklucHV0KCkge30sXG4gICAgICAgICAgICBvblN1Ym1pdCgpe30sXG4gICAgICAgICAgICBvblNlYXJjaCgpIHt9LFxuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gVmlldy5yZW5kZXIoc2VhcmNoLCB0aGlzKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBTZWFyY2hcbiJdfQ==