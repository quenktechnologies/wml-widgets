'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = require('wmljs/lib/runtime');

var _beof = require('beof');

var _beof2 = _interopRequireDefault(_beof);

var _watClasses = require('wat-classes');

var Class = _interopRequireWildcard(_watClasses);

var _nop = require('nop');

var _nop2 = _interopRequireDefault(_nop);

var _AutocompleteDelegate2 = require('./AutocompleteDelegate');

var _AutocompleteDelegate3 = _interopRequireDefault(_AutocompleteDelegate2);

var _options = require('./wml/options.wml');

var _options2 = _interopRequireDefault(_options);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * SearchDelegate for the searching phase.
 */
var SearchDelegate = function (_AutocompleteDelegate) {
    _inherits(SearchDelegate, _AutocompleteDelegate);

    function SearchDelegate(auto) {
        _classCallCheck(this, SearchDelegate);

        var _this = _possibleConstructorReturn(this, (SearchDelegate.__proto__ || Object.getPrototypeOf(SearchDelegate)).call(this, auto));

        _this.optionsView = new _runtime.View(_options2.default, _this);
        _this.options = [];

        return _this;
    }

    _createClass(SearchDelegate, [{
        key: 'update',
        value: function update(items) {

            (0, _beof2.default)({ items: items }).optional().array();

            this.options = items;
            this.render();
        }
    }, {
        key: 'handleKeyUp',
        value: function handleKeyUp(e) {

            if (e.keyCode === 27) {
                e.target.blur();
                this.autocomplete.toRest();
            }
        }
    }, {
        key: 'handleKeyDown',
        value: function handleKeyDown(e) {

            //@todo throttle searches?
            if (e.keyCode !== 27) this.autocomplete.search(e.target);
        }

        /**
         * selected is called when an option has been clicked on
         * @param {number} index
         */

    }, {
        key: 'selected',
        value: function selected(index) {

            var choice = this.options[index];
            var display = '';

            this.autocomplete.attributes.read('wat:set', function () {})(this.autocomplete.attributes.read('wat:valueField') ? property(this.options[index], this.autocomplete.attributes.read('wat:valueField')) : this.options[index], this.autocomplete.attributes.read('wat:name'));

            if (this.autocomplete.attributes.read('wat:labelField')) {
                display = property(choice, this.autocomplete.attributes.read('wat:labelField'));
            } else if (this.autocomplete.attributes.read('wat:valueField')) {
                display = property(choice, this.autocomplete.attributes.read('wat:valueField'));
            } else {
                display = choice;
            }

            this.autocomplete.set(display);
            this.autocomplete.choice = choice;
            this.autocomplete.toSelection();
        }
    }, {
        key: 'render',
        value: function render() {

            var options = this.autocomplete.view.findById('options');

            while (options.lastChild) {
                options.removeChild(options.lastChild);
            }options.classList.toggle(Class.WAT_VISIBLE);
            options.appendChild(this.optionsView.render(), this);
        }
    }]);

    return SearchDelegate;
}(_AutocompleteDelegate3.default);

exports.default = SearchDelegate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2F1dG9jb21wbGV0ZS9TZWFyY2hEZWxlZ2F0ZS5qcyJdLCJuYW1lcyI6WyJDbGFzcyIsIlNlYXJjaERlbGVnYXRlIiwiYXV0byIsIm9wdGlvbnNWaWV3Iiwib3B0aW9ucyIsIml0ZW1zIiwib3B0aW9uYWwiLCJhcnJheSIsInJlbmRlciIsImUiLCJrZXlDb2RlIiwidGFyZ2V0IiwiYmx1ciIsImF1dG9jb21wbGV0ZSIsInRvUmVzdCIsInNlYXJjaCIsImluZGV4IiwiY2hvaWNlIiwiZGlzcGxheSIsImF0dHJpYnV0ZXMiLCJyZWFkIiwicHJvcGVydHkiLCJzZXQiLCJ0b1NlbGVjdGlvbiIsInZpZXciLCJmaW5kQnlJZCIsImxhc3RDaGlsZCIsInJlbW92ZUNoaWxkIiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwiV0FUX1ZJU0lCTEUiLCJhcHBlbmRDaGlsZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUNBOztJQUFZQSxLOztBQUNaOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUFFQTs7O0lBR01DLGM7OztBQUVGLDRCQUFZQyxJQUFaLEVBQWtCO0FBQUE7O0FBQUEsb0lBRVJBLElBRlE7O0FBSWQsY0FBS0MsV0FBTCxHQUFtQiwyQ0FBbkI7QUFDQSxjQUFLQyxPQUFMLEdBQWUsRUFBZjs7QUFMYztBQU9qQjs7OzsrQkFFTUMsSyxFQUFPOztBQUVWLGdDQUFLLEVBQUVBLFlBQUYsRUFBTCxFQUFnQkMsUUFBaEIsR0FBMkJDLEtBQTNCOztBQUVBLGlCQUFLSCxPQUFMLEdBQWVDLEtBQWY7QUFDQSxpQkFBS0csTUFBTDtBQUVIOzs7b0NBRVdDLEMsRUFBRzs7QUFFWCxnQkFBSUEsRUFBRUMsT0FBRixLQUFjLEVBQWxCLEVBQXNCO0FBQ2xCRCxrQkFBRUUsTUFBRixDQUFTQyxJQUFUO0FBQ0EscUJBQUtDLFlBQUwsQ0FBa0JDLE1BQWxCO0FBQ0g7QUFFSjs7O3NDQUVhTCxDLEVBQUc7O0FBRWI7QUFDQSxnQkFBSUEsRUFBRUMsT0FBRixLQUFjLEVBQWxCLEVBQ0ksS0FBS0csWUFBTCxDQUFrQkUsTUFBbEIsQ0FBeUJOLEVBQUVFLE1BQTNCO0FBRVA7O0FBRUQ7Ozs7Ozs7aUNBSVNLLEssRUFBTzs7QUFFWixnQkFBSUMsU0FBUyxLQUFLYixPQUFMLENBQWFZLEtBQWIsQ0FBYjtBQUNBLGdCQUFJRSxVQUFVLEVBQWQ7O0FBRUEsaUJBQUtMLFlBQUwsQ0FBa0JNLFVBQWxCLENBQTZCQyxJQUE3QixDQUFrQyxTQUFsQyxFQUE2QyxZQUFXLENBQUUsQ0FBMUQsRUFDSyxLQUFLUCxZQUFMLENBQWtCTSxVQUFsQixDQUE2QkMsSUFBN0IsQ0FBa0MsZ0JBQWxDLENBQUQsR0FDQUMsU0FBUyxLQUFLakIsT0FBTCxDQUFhWSxLQUFiLENBQVQsRUFBOEIsS0FBS0gsWUFBTCxDQUFrQk0sVUFBbEIsQ0FBNkJDLElBQTdCLENBQWtDLGdCQUFsQyxDQUE5QixDQURBLEdBRUEsS0FBS2hCLE9BQUwsQ0FBYVksS0FBYixDQUhKLEVBR3lCLEtBQUtILFlBQUwsQ0FBa0JNLFVBQWxCLENBQTZCQyxJQUE3QixDQUFrQyxVQUFsQyxDQUh6Qjs7QUFLQSxnQkFBSSxLQUFLUCxZQUFMLENBQWtCTSxVQUFsQixDQUE2QkMsSUFBN0IsQ0FBa0MsZ0JBQWxDLENBQUosRUFBeUQ7QUFDckRGLDBCQUFVRyxTQUFTSixNQUFULEVBQWlCLEtBQUtKLFlBQUwsQ0FBa0JNLFVBQWxCLENBQTZCQyxJQUE3QixDQUFrQyxnQkFBbEMsQ0FBakIsQ0FBVjtBQUNILGFBRkQsTUFFTyxJQUFJLEtBQUtQLFlBQUwsQ0FBa0JNLFVBQWxCLENBQTZCQyxJQUE3QixDQUFrQyxnQkFBbEMsQ0FBSixFQUF5RDtBQUM1REYsMEJBQVVHLFNBQVNKLE1BQVQsRUFBaUIsS0FBS0osWUFBTCxDQUFrQk0sVUFBbEIsQ0FBNkJDLElBQTdCLENBQWtDLGdCQUFsQyxDQUFqQixDQUFWO0FBQ0gsYUFGTSxNQUVBO0FBQ0hGLDBCQUFVRCxNQUFWO0FBQ0g7O0FBRUQsaUJBQUtKLFlBQUwsQ0FBa0JTLEdBQWxCLENBQXNCSixPQUF0QjtBQUNBLGlCQUFLTCxZQUFMLENBQWtCSSxNQUFsQixHQUEyQkEsTUFBM0I7QUFDQSxpQkFBS0osWUFBTCxDQUFrQlUsV0FBbEI7QUFFSDs7O2lDQUVROztBQUVMLGdCQUFJbkIsVUFBVSxLQUFLUyxZQUFMLENBQWtCVyxJQUFsQixDQUF1QkMsUUFBdkIsQ0FBZ0MsU0FBaEMsQ0FBZDs7QUFFQSxtQkFBT3JCLFFBQVFzQixTQUFmO0FBQ0l0Qix3QkFBUXVCLFdBQVIsQ0FBb0J2QixRQUFRc0IsU0FBNUI7QUFESixhQUdBdEIsUUFBUXdCLFNBQVIsQ0FBa0JDLE1BQWxCLENBQXlCN0IsTUFBTThCLFdBQS9CO0FBQ0ExQixvQkFBUTJCLFdBQVIsQ0FBb0IsS0FBSzVCLFdBQUwsQ0FBaUJLLE1BQWpCLEVBQXBCLEVBQStDLElBQS9DO0FBRUg7Ozs7OztrQkFJVVAsYyIsImZpbGUiOiJTZWFyY2hEZWxlZ2F0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFZpZXcgfSBmcm9tICd3bWxqcy9saWIvcnVudGltZSc7XG5pbXBvcnQgYmVvZiBmcm9tICdiZW9mJztcbmltcG9ydCAqIGFzIENsYXNzIGZyb20gJ3dhdC1jbGFzc2VzJztcbmltcG9ydCBub3AgZnJvbSAnbm9wJztcbmltcG9ydCBBdXRvY29tcGxldGVEZWxlZ2F0ZSBmcm9tICcuL0F1dG9jb21wbGV0ZURlbGVnYXRlJztcbmltcG9ydCBvcHRpb25zIGZyb20gJy4vd21sL29wdGlvbnMud21sJztcblxuLyoqXG4gKiBTZWFyY2hEZWxlZ2F0ZSBmb3IgdGhlIHNlYXJjaGluZyBwaGFzZS5cbiAqL1xuY2xhc3MgU2VhcmNoRGVsZWdhdGUgZXh0ZW5kcyBBdXRvY29tcGxldGVEZWxlZ2F0ZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihhdXRvKSB7XG5cbiAgICAgICAgc3VwZXIoYXV0byk7XG5cbiAgICAgICAgdGhpcy5vcHRpb25zVmlldyA9IG5ldyBWaWV3KG9wdGlvbnMsIHRoaXMpO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBbXTtcblxuICAgIH1cblxuICAgIHVwZGF0ZShpdGVtcykge1xuXG4gICAgICAgIGJlb2YoeyBpdGVtcyB9KS5vcHRpb25hbCgpLmFycmF5KCk7XG5cbiAgICAgICAgdGhpcy5vcHRpb25zID0gaXRlbXM7XG4gICAgICAgIHRoaXMucmVuZGVyKCk7XG5cbiAgICB9XG5cbiAgICBoYW5kbGVLZXlVcChlKSB7XG5cbiAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMjcpIHtcbiAgICAgICAgICAgIGUudGFyZ2V0LmJsdXIoKTtcbiAgICAgICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlLnRvUmVzdCgpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duKGUpIHtcblxuICAgICAgICAvL0B0b2RvIHRocm90dGxlIHNlYXJjaGVzP1xuICAgICAgICBpZiAoZS5rZXlDb2RlICE9PSAyNylcbiAgICAgICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlLnNlYXJjaChlLnRhcmdldCk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzZWxlY3RlZCBpcyBjYWxsZWQgd2hlbiBhbiBvcHRpb24gaGFzIGJlZW4gY2xpY2tlZCBvblxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleFxuICAgICAqL1xuICAgIHNlbGVjdGVkKGluZGV4KSB7XG5cbiAgICAgICAgdmFyIGNob2ljZSA9IHRoaXMub3B0aW9uc1tpbmRleF07XG4gICAgICAgIHZhciBkaXNwbGF5ID0gJyc7XG5cbiAgICAgICAgdGhpcy5hdXRvY29tcGxldGUuYXR0cmlidXRlcy5yZWFkKCd3YXQ6c2V0JywgZnVuY3Rpb24oKSB7fSkoXG4gICAgICAgICAgICAodGhpcy5hdXRvY29tcGxldGUuYXR0cmlidXRlcy5yZWFkKCd3YXQ6dmFsdWVGaWVsZCcpKSA/XG4gICAgICAgICAgICBwcm9wZXJ0eSh0aGlzLm9wdGlvbnNbaW5kZXhdLCB0aGlzLmF1dG9jb21wbGV0ZS5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDp2YWx1ZUZpZWxkJykpIDpcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1tpbmRleF0sIHRoaXMuYXV0b2NvbXBsZXRlLmF0dHJpYnV0ZXMucmVhZCgnd2F0Om5hbWUnKSk7XG5cbiAgICAgICAgaWYgKHRoaXMuYXV0b2NvbXBsZXRlLmF0dHJpYnV0ZXMucmVhZCgnd2F0OmxhYmVsRmllbGQnKSkge1xuICAgICAgICAgICAgZGlzcGxheSA9IHByb3BlcnR5KGNob2ljZSwgdGhpcy5hdXRvY29tcGxldGUuYXR0cmlidXRlcy5yZWFkKCd3YXQ6bGFiZWxGaWVsZCcpKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmF1dG9jb21wbGV0ZS5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDp2YWx1ZUZpZWxkJykpIHtcbiAgICAgICAgICAgIGRpc3BsYXkgPSBwcm9wZXJ0eShjaG9pY2UsIHRoaXMuYXV0b2NvbXBsZXRlLmF0dHJpYnV0ZXMucmVhZCgnd2F0OnZhbHVlRmllbGQnKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkaXNwbGF5ID0gY2hvaWNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hdXRvY29tcGxldGUuc2V0KGRpc3BsYXkpO1xuICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZS5jaG9pY2UgPSBjaG9pY2U7XG4gICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlLnRvU2VsZWN0aW9uKCk7XG5cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgdmFyIG9wdGlvbnMgPSB0aGlzLmF1dG9jb21wbGV0ZS52aWV3LmZpbmRCeUlkKCdvcHRpb25zJyk7XG5cbiAgICAgICAgd2hpbGUgKG9wdGlvbnMubGFzdENoaWxkKVxuICAgICAgICAgICAgb3B0aW9ucy5yZW1vdmVDaGlsZChvcHRpb25zLmxhc3RDaGlsZCk7XG5cbiAgICAgICAgb3B0aW9ucy5jbGFzc0xpc3QudG9nZ2xlKENsYXNzLldBVF9WSVNJQkxFKTtcbiAgICAgICAgb3B0aW9ucy5hcHBlbmRDaGlsZCh0aGlzLm9wdGlvbnNWaWV3LnJlbmRlcigpLCB0aGlzKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBTZWFyY2hEZWxlZ2F0ZVxuIl19