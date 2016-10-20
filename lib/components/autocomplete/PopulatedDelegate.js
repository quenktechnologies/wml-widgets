'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = require('wmljs/lib/runtime');

var _watClasses = require('wat-classes');

var Class = _interopRequireWildcard(_watClasses);

var _AutocompleteDelegate2 = require('./AutocompleteDelegate');

var _AutocompleteDelegate3 = _interopRequireDefault(_AutocompleteDelegate2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * PopulateDelegate for the searching phase.
 */
var PopulateDelegate = function (_AutocompleteDelegate) {
    _inherits(PopulateDelegate, _AutocompleteDelegate);

    function PopulateDelegate() {
        _classCallCheck(this, PopulateDelegate);

        return _possibleConstructorReturn(this, (PopulateDelegate.__proto__ || Object.getPrototypeOf(PopulateDelegate)).apply(this, arguments));
    }

    _createClass(PopulateDelegate, [{
        key: 'handleKeyUp',
        value: function handleKeyUp(e) {

            if (e.keyCode === 27) {
                this.autocomplete.toRest();
                e.target.blur();
            }
        }
    }, {
        key: 'handleKeyDown',
        value: function handleKeyDown(e) {

            if (e.keyCode !== 27) this.autocomplete.toSearch();
        }

        /**
         * selected is called when an option has been clicked on
         * @param {number} index
         */

    }, {
        key: 'selected',
        value: function selected(index) {

            throw new ReferenceError('PopulateDelegate: does not support selecting!');
        }
    }, {
        key: 'render',
        value: function render() {

            var display;
            var value = this.autocomplete.attributes.read('wat:value');
            var label = this.autocomplete.attributes.read('wat:labelField');
            var valueField = this.autocomplete.attributes.read('wat:valueField');

            if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {

                if (label) {
                    value = property(value, label);
                } else if (valueField) {
                    value = property(value, valueField);
                }
            }

            this.autocomplete.set(value);
        }
    }]);

    return PopulateDelegate;
}(_AutocompleteDelegate3.default);

exports.default = PopulateDelegate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2F1dG9jb21wbGV0ZS9Qb3B1bGF0ZWREZWxlZ2F0ZS5qcyJdLCJuYW1lcyI6WyJDbGFzcyIsIlBvcHVsYXRlRGVsZWdhdGUiLCJlIiwia2V5Q29kZSIsImF1dG9jb21wbGV0ZSIsInRvUmVzdCIsInRhcmdldCIsImJsdXIiLCJ0b1NlYXJjaCIsImluZGV4IiwiUmVmZXJlbmNlRXJyb3IiLCJkaXNwbGF5IiwidmFsdWUiLCJhdHRyaWJ1dGVzIiwicmVhZCIsImxhYmVsIiwidmFsdWVGaWVsZCIsInByb3BlcnR5Iiwic2V0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0lBQVlBLEs7O0FBQ1o7Ozs7Ozs7Ozs7Ozs7O0FBRUE7OztJQUdNQyxnQjs7Ozs7Ozs7Ozs7b0NBRVVDLEMsRUFBRzs7QUFFWCxnQkFBSUEsRUFBRUMsT0FBRixLQUFjLEVBQWxCLEVBQXNCO0FBQ2xCLHFCQUFLQyxZQUFMLENBQWtCQyxNQUFsQjtBQUNBSCxrQkFBRUksTUFBRixDQUFTQyxJQUFUO0FBQ0g7QUFFSjs7O3NDQUVhTCxDLEVBQUc7O0FBRWIsZ0JBQUlBLEVBQUVDLE9BQUYsS0FBYyxFQUFsQixFQUNJLEtBQUtDLFlBQUwsQ0FBa0JJLFFBQWxCO0FBRVA7O0FBRUQ7Ozs7Ozs7aUNBSVNDLEssRUFBTzs7QUFFWixrQkFBTSxJQUFJQyxjQUFKLENBQW1CLCtDQUFuQixDQUFOO0FBRUg7OztpQ0FFUTs7QUFFTCxnQkFBSUMsT0FBSjtBQUNBLGdCQUFJQyxRQUFRLEtBQUtSLFlBQUwsQ0FBa0JTLFVBQWxCLENBQTZCQyxJQUE3QixDQUFrQyxXQUFsQyxDQUFaO0FBQ0EsZ0JBQUlDLFFBQVEsS0FBS1gsWUFBTCxDQUFrQlMsVUFBbEIsQ0FBNkJDLElBQTdCLENBQWtDLGdCQUFsQyxDQUFaO0FBQ0EsZ0JBQUlFLGFBQWEsS0FBS1osWUFBTCxDQUFrQlMsVUFBbEIsQ0FBNkJDLElBQTdCLENBQWtDLGdCQUFsQyxDQUFqQjs7QUFFQSxnQkFBSSxRQUFPRixLQUFQLHlDQUFPQSxLQUFQLE9BQWlCLFFBQXJCLEVBQStCOztBQUUzQixvQkFBSUcsS0FBSixFQUFXO0FBQ1BILDRCQUFRSyxTQUFTTCxLQUFULEVBQWdCRyxLQUFoQixDQUFSO0FBQ0gsaUJBRkQsTUFFTyxJQUFJQyxVQUFKLEVBQWdCO0FBQ25CSiw0QkFBUUssU0FBU0wsS0FBVCxFQUFnQkksVUFBaEIsQ0FBUjtBQUNIO0FBRUo7O0FBRUQsaUJBQUtaLFlBQUwsQ0FBa0JjLEdBQWxCLENBQXNCTixLQUF0QjtBQUVIOzs7Ozs7a0JBSVVYLGdCIiwiZmlsZSI6IlBvcHVsYXRlZERlbGVnYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmlldyB9IGZyb20gJ3dtbGpzL2xpYi9ydW50aW1lJztcbmltcG9ydCAqIGFzIENsYXNzIGZyb20gJ3dhdC1jbGFzc2VzJztcbmltcG9ydCBBdXRvY29tcGxldGVEZWxlZ2F0ZSBmcm9tICcuL0F1dG9jb21wbGV0ZURlbGVnYXRlJztcblxuLyoqXG4gKiBQb3B1bGF0ZURlbGVnYXRlIGZvciB0aGUgc2VhcmNoaW5nIHBoYXNlLlxuICovXG5jbGFzcyBQb3B1bGF0ZURlbGVnYXRlIGV4dGVuZHMgQXV0b2NvbXBsZXRlRGVsZWdhdGUge1xuXG4gICAgaGFuZGxlS2V5VXAoZSkge1xuXG4gICAgICAgIGlmIChlLmtleUNvZGUgPT09IDI3KSB7XG4gICAgICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZS50b1Jlc3QoKTtcbiAgICAgICAgICAgIGUudGFyZ2V0LmJsdXIoKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93bihlKSB7XG5cbiAgICAgICAgaWYgKGUua2V5Q29kZSAhPT0gMjcpXG4gICAgICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZS50b1NlYXJjaCgpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogc2VsZWN0ZWQgaXMgY2FsbGVkIHdoZW4gYW4gb3B0aW9uIGhhcyBiZWVuIGNsaWNrZWQgb25cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXhcbiAgICAgKi9cbiAgICBzZWxlY3RlZChpbmRleCkge1xuXG4gICAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcignUG9wdWxhdGVEZWxlZ2F0ZTogZG9lcyBub3Qgc3VwcG9ydCBzZWxlY3RpbmchJyk7XG5cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgdmFyIGRpc3BsYXk7XG4gICAgICAgIHZhciB2YWx1ZSA9IHRoaXMuYXV0b2NvbXBsZXRlLmF0dHJpYnV0ZXMucmVhZCgnd2F0OnZhbHVlJyk7XG4gICAgICAgIHZhciBsYWJlbCA9IHRoaXMuYXV0b2NvbXBsZXRlLmF0dHJpYnV0ZXMucmVhZCgnd2F0OmxhYmVsRmllbGQnKTtcbiAgICAgICAgdmFyIHZhbHVlRmllbGQgPSB0aGlzLmF1dG9jb21wbGV0ZS5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDp2YWx1ZUZpZWxkJyk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcblxuICAgICAgICAgICAgaWYgKGxhYmVsKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBwcm9wZXJ0eSh2YWx1ZSwgbGFiZWwpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZUZpZWxkKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBwcm9wZXJ0eSh2YWx1ZSwgdmFsdWVGaWVsZCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlLnNldCh2YWx1ZSk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgUG9wdWxhdGVEZWxlZ2F0ZVxuIl19