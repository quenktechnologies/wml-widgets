'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = require('wmljs/lib/runtime');

var _propertySeek = require('property-seek');

var _propertySeek2 = _interopRequireDefault(_propertySeek);

var _table = require('./table.wml');

var _table2 = _interopRequireDefault(_table);

var _tbody = require('./tbody.wml');

var _tbody2 = _interopRequireDefault(_tbody);

var _thead = require('./thead.wml');

var _thead2 = _interopRequireDefault(_thead);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ASC = '\u21E7';
var DESC = '\u21E9';

var SORTS = {
    date: function date(a, b) {
        a = new Date(a).getTime();
        b = new Date(b).getTime();
        return a > b ? -1 : a < b ? 1 : 0;
    },
    string: function string(a, b) {

        if (typeof a === 'string') a = a.replace(/\s+/, '').toLowerCase();

        if (typeof b === 'string') b = b.replace(/\s+/, '').toLowerCase();

        return a > b ? -1 : a < b ? 1 : 0;
    },
    natural: function natural(a, b) {

        //Source: http://stackoverflow.com/questions/4340227/sort-mixed-alpha-numeric-array
        var reA = /[^a-zA-Z]/g;
        var reN = /[^0-9]/g;
        var AInt = parseInt(a, 10);
        var BInt = parseInt(b, 10);

        if (isNaN(AInt) && isNaN(BInt)) {
            var aA = a.replace(reA, '');
            var bA = b.replace(reA, '');
            if (aA === bA) {
                var aN = parseInt(a.replace(reN, ''), 10);
                var bN = parseInt(b.replace(reN, ''), 10);
                return aN === bN ? 0 : aN > bN ? -1 : 1;
            } else {
                return aA > bA ? -1 : 1;
            }
        } else if (isNaN(AInt)) {
            //A is not an Int
            return -1; //to make alphanumeric sort first return -1 here
        } else if (isNaN(BInt)) {
            //B is not an Int
            return 1; //to make alphanumeric sort first return 1 here
        } else {
            return AInt > BInt ? -1 : 1;
        }
    },
    number: function number(a, b) {

        a = parseFloat(a);
        b = parseFloat(b);

        a = isNaN(a) ? -Infinity : a;
        b = isNaN(b) ? -Infinity : b;

        return a > b ? -1 : a < b ? 1 : 0;
    }
};

var Table = function (_Widget) {
    _inherits(Table, _Widget);

    function Table() {
        _classCallCheck(this, Table);

        var _this = _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).apply(this, arguments));

        _this.class = 'table ' + _this.attributes.read('wat:class');
        _this.fields = _this.attributes.read('wat:fields', []);
        _this.originalData = _this.attributes.requireArray('wat:data', []);
        _this.data = _this.originalData.slice();
        _this.selectable = _this.attributes.read('wat:selectable', false);
        _this.sortedOn = '';
        _this.arrow = '';
        _this.view = new _runtime.View(_table2.default, _this);
        _this.rowClass = _this.attributes.read('wat:rowClass', '');
        _this.cellClass = _this.attributes.read('wat:cellClass', '');
        _this.headingClass = _this.attributes.read('wat:headingClass', '');
        _this.sortableHeadingClass = _this.attributes.read('wat:sortableHeadingClass', '');
        _this.onRowClicked = _this.attributes.read('wat:onRowClicked', function () {});
        _this.onCellClicked = _this.attributes.read('wat:onCellClicked', function () {});

        return _this;
    }

    /**
     * isSortedBy checks if the given field is what we are currently sorted by.
     * @param {string} name
     */


    _createClass(Table, [{
        key: 'isSortedBy',
        value: function isSortedBy(name) {

            return this.sortedOn === name;
        }

        /**
         * onHeadingClicked is called to sort the data displayed by
         * a particular field name.
         * @param {string} name
         * @param {string} [strategy='string']
         * @param {string} sorton
         */

    }, {
        key: 'onHeadingClicked',
        value: function onHeadingClicked(name, strategy, sorton) {

            var data;
            var body = this.view.findById('body');
            var head = this.view.findById('head');
            var sortOn = sorton || name;

            if (this.sortedOn === name) {

                this.data = this.data.reverse();
                this.arrow = this.arrow === ASC ? DESC : ASC;
            } else {

                strategy = strategy || 'string';
                this.arrow = DESC;
                this.data = this.originalData.slice().sort(function (a, b) {
                    return SORTS[strategy](_propertySeek2.default.get(a, sortOn), _propertySeek2.default.get(b, sortOn));
                });
            }

            this.sortedOn = name;

            while (body.lastChild) {
                body.removeChild(body.lastChild);
            }while (head.lastChild) {
                head.removeChild(head.lastChild);
            }head.appendChild(new _runtime.View(_thead2.default, this).render());
            body.appendChild(new _runtime.View(_tbody2.default, this).render());
        }
    }, {
        key: 'selectAll',
        value: function selectAll() {}
    }, {
        key: 'selectRow',
        value: function selectRow() {}
    }, {
        key: 'render',
        value: function render() {

            return this.view.render();
        }
    }]);

    return Table;
}(_runtime.Widget);

exports.default = Table;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3RhYmxlL1RhYmxlLmpzIl0sIm5hbWVzIjpbIkFTQyIsIkRFU0MiLCJTT1JUUyIsImRhdGUiLCJhIiwiYiIsIkRhdGUiLCJnZXRUaW1lIiwic3RyaW5nIiwicmVwbGFjZSIsInRvTG93ZXJDYXNlIiwibmF0dXJhbCIsInJlQSIsInJlTiIsIkFJbnQiLCJwYXJzZUludCIsIkJJbnQiLCJpc05hTiIsImFBIiwiYkEiLCJhTiIsImJOIiwibnVtYmVyIiwicGFyc2VGbG9hdCIsIkluZmluaXR5IiwiVGFibGUiLCJhcmd1bWVudHMiLCJjbGFzcyIsImF0dHJpYnV0ZXMiLCJyZWFkIiwiZmllbGRzIiwib3JpZ2luYWxEYXRhIiwicmVxdWlyZUFycmF5IiwiZGF0YSIsInNsaWNlIiwic2VsZWN0YWJsZSIsInNvcnRlZE9uIiwiYXJyb3ciLCJ2aWV3Iiwicm93Q2xhc3MiLCJjZWxsQ2xhc3MiLCJoZWFkaW5nQ2xhc3MiLCJzb3J0YWJsZUhlYWRpbmdDbGFzcyIsIm9uUm93Q2xpY2tlZCIsIm9uQ2VsbENsaWNrZWQiLCJuYW1lIiwic3RyYXRlZ3kiLCJzb3J0b24iLCJib2R5IiwiZmluZEJ5SWQiLCJoZWFkIiwic29ydE9uIiwicmV2ZXJzZSIsInNvcnQiLCJnZXQiLCJsYXN0Q2hpbGQiLCJyZW1vdmVDaGlsZCIsImFwcGVuZENoaWxkIiwicmVuZGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxNQUFNLFFBQVo7QUFDQSxJQUFNQyxPQUFPLFFBQWI7O0FBRUEsSUFBTUMsUUFBUTtBQUVWQyxRQUZVLGdCQUVMQyxDQUZLLEVBRUZDLENBRkUsRUFFQztBQUNQRCxZQUFJLElBQUlFLElBQUosQ0FBU0YsQ0FBVCxFQUFZRyxPQUFaLEVBQUo7QUFDQUYsWUFBSSxJQUFJQyxJQUFKLENBQVNELENBQVQsRUFBWUUsT0FBWixFQUFKO0FB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QUFoQixDQUFELENBQXdCQyxNQUF4QixFQUFqQjtBQUVIOzs7b0NBRVcsQ0FFWDs7O29DQUVXLENBR1g7OztpQ0FFUTs7QUFFTCxtQkFBTyxLQUFLcEIsSUFBTCxDQUFVb0IsTUFBVixFQUFQO0FBRUg7Ozs7OztrQkFJVWpDLEsiLCJmaWxlIjoiVGFibGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWaWV3LCBXaWRnZXQgfSBmcm9tICd3bWxqcy9saWIvcnVudGltZSc7XG5pbXBvcnQgUHJvcGVydHkgZnJvbSAncHJvcGVydHktc2Vlayc7XG5pbXBvcnQgdGFibGUgZnJvbSAnLi90YWJsZS53bWwnO1xuaW1wb3J0IHRib2R5IGZyb20gJy4vdGJvZHkud21sJztcbmltcG9ydCB0aGVhZCBmcm9tICcuL3RoZWFkLndtbCc7XG5cbmNvbnN0IEFTQyA9ICdcXHUyMWU3JztcbmNvbnN0IERFU0MgPSAnXFx1MjFlOSc7XG5cbmNvbnN0IFNPUlRTID0ge1xuXG4gICAgZGF0ZShhLCBiKSB7XG4gICAgICAgIGEgPSBuZXcgRGF0ZShhKS5nZXRUaW1lKCk7XG4gICAgICAgIGIgPSBuZXcgRGF0ZShiKS5nZXRUaW1lKCk7XG4gICAgICAgIHJldHVybiBhID4gYiA/IC0xIDogYSA8IGIgPyAxIDogMDtcbiAgICB9LFxuICAgIHN0cmluZyhhLCBiKSB7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBhID09PSAnc3RyaW5nJylcbiAgICAgICAgICAgIGEgPSBhLnJlcGxhY2UoL1xccysvLCAnJykudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICBpZiAodHlwZW9mIGIgPT09ICdzdHJpbmcnKVxuICAgICAgICAgICAgYiA9IGIucmVwbGFjZSgvXFxzKy8sICcnKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIHJldHVybiAoYSA+IGIpID8gLTEgOiAoYSA8IGIpID8gMSA6IDA7XG5cbiAgICB9LFxuICAgIG5hdHVyYWwoYSwgYikge1xuXG4gICAgICAgIC8vU291cmNlOiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzQzNDAyMjcvc29ydC1taXhlZC1hbHBoYS1udW1lcmljLWFycmF5XG4gICAgICAgIHZhciByZUEgPSAvW15hLXpBLVpdL2c7XG4gICAgICAgIHZhciByZU4gPSAvW14wLTldL2c7XG4gICAgICAgIHZhciBBSW50ID0gcGFyc2VJbnQoYSwgMTApO1xuICAgICAgICB2YXIgQkludCA9IHBhcnNlSW50KGIsIDEwKTtcblxuICAgICAgICBpZiAoaXNOYU4oQUludCkgJiYgaXNOYU4oQkludCkpIHtcbiAgICAgICAgICAgIHZhciBhQSA9IGEucmVwbGFjZShyZUEsICcnKTtcbiAgICAgICAgICAgIHZhciBiQSA9IGIucmVwbGFjZShyZUEsICcnKTtcbiAgICAgICAgICAgIGlmIChhQSA9PT0gYkEpIHtcbiAgICAgICAgICAgICAgICB2YXIgYU4gPSBwYXJzZUludChhLnJlcGxhY2UocmVOLCAnJyksIDEwKTtcbiAgICAgICAgICAgICAgICB2YXIgYk4gPSBwYXJzZUludChiLnJlcGxhY2UocmVOLCAnJyksIDEwKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYU4gPT09IGJOID8gMCA6IGFOID4gYk4gPyAtMSA6IDE7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBhQSA+IGJBID8gLTEgOiAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGlzTmFOKEFJbnQpKSB7IC8vQSBpcyBub3QgYW4gSW50XG4gICAgICAgICAgICByZXR1cm4gLTE7IC8vdG8gbWFrZSBhbHBoYW51bWVyaWMgc29ydCBmaXJzdCByZXR1cm4gLTEgaGVyZVxuICAgICAgICB9IGVsc2UgaWYgKGlzTmFOKEJJbnQpKSB7IC8vQiBpcyBub3QgYW4gSW50XG4gICAgICAgICAgICByZXR1cm4gMTsgLy90byBtYWtlIGFscGhhbnVtZXJpYyBzb3J0IGZpcnN0IHJldHVybiAxIGhlcmVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBBSW50ID4gQkludCA/IC0xIDogMTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgbnVtYmVyKGEsIGIpIHtcblxuICAgICAgICBhID0gcGFyc2VGbG9hdChhKTtcbiAgICAgICAgYiA9IHBhcnNlRmxvYXQoYik7XG5cbiAgICAgICAgYSA9IChpc05hTihhKSkgPyAtSW5maW5pdHkgOiBhO1xuICAgICAgICBiID0gKGlzTmFOKGIpKSA/IC1JbmZpbml0eSA6IGI7XG5cbiAgICAgICAgcmV0dXJuIChhID4gYikgPyAtMSA6IChhIDwgYikgPyAxIDogMDtcblxuICAgIH1cblxufVxuXG5jbGFzcyBUYWJsZSBleHRlbmRzIFdpZGdldCB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcblxuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuXG4gICAgICAgIHRoaXMuY2xhc3MgPSBgdGFibGUgJHt0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd2F0OmNsYXNzJyl9YDtcbiAgICAgICAgdGhpcy5maWVsZHMgPSB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd2F0OmZpZWxkcycsIFtdKTtcbiAgICAgICAgdGhpcy5vcmlnaW5hbERhdGEgPSB0aGlzLmF0dHJpYnV0ZXMucmVxdWlyZUFycmF5KCd3YXQ6ZGF0YScsIFtdKTtcbiAgICAgICAgdGhpcy5kYXRhID0gdGhpcy5vcmlnaW5hbERhdGEuc2xpY2UoKTtcbiAgICAgICAgdGhpcy5zZWxlY3RhYmxlID0gdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDpzZWxlY3RhYmxlJywgZmFsc2UpO1xuICAgICAgICB0aGlzLnNvcnRlZE9uID0gJyc7XG4gICAgICAgIHRoaXMuYXJyb3cgPSAnJztcbiAgICAgICAgdGhpcy52aWV3ID0gbmV3IFZpZXcodGFibGUsIHRoaXMpO1xuICAgICAgICB0aGlzLnJvd0NsYXNzID0gdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDpyb3dDbGFzcycsICcnKTtcbiAgICAgICAgdGhpcy5jZWxsQ2xhc3MgPSB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd2F0OmNlbGxDbGFzcycsICcnKTtcbiAgICAgICAgdGhpcy5oZWFkaW5nQ2xhc3MgPSB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd2F0OmhlYWRpbmdDbGFzcycsICcnKTtcbiAgICAgICAgdGhpcy5zb3J0YWJsZUhlYWRpbmdDbGFzcyA9IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3YXQ6c29ydGFibGVIZWFkaW5nQ2xhc3MnLCAnJyk7XG4gICAgICAgIHRoaXMub25Sb3dDbGlja2VkID0gdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDpvblJvd0NsaWNrZWQnLCBmdW5jdGlvbigpIHt9KTtcbiAgICAgICAgdGhpcy5vbkNlbGxDbGlja2VkID0gdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDpvbkNlbGxDbGlja2VkJywgZnVuY3Rpb24oKSB7fSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBpc1NvcnRlZEJ5IGNoZWNrcyBpZiB0aGUgZ2l2ZW4gZmllbGQgaXMgd2hhdCB3ZSBhcmUgY3VycmVudGx5IHNvcnRlZCBieS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgICAqL1xuICAgIGlzU29ydGVkQnkobmFtZSkge1xuXG4gICAgICAgIHJldHVybiAodGhpcy5zb3J0ZWRPbiA9PT0gbmFtZSlcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIG9uSGVhZGluZ0NsaWNrZWQgaXMgY2FsbGVkIHRvIHNvcnQgdGhlIGRhdGEgZGlzcGxheWVkIGJ5XG4gICAgICogYSBwYXJ0aWN1bGFyIGZpZWxkIG5hbWUuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW3N0cmF0ZWd5PSdzdHJpbmcnXVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzb3J0b25cbiAgICAgKi9cbiAgICBvbkhlYWRpbmdDbGlja2VkKG5hbWUsIHN0cmF0ZWd5LCBzb3J0b24pIHtcblxuICAgICAgICB2YXIgZGF0YTtcbiAgICAgICAgdmFyIGJvZHkgPSB0aGlzLnZpZXcuZmluZEJ5SWQoJ2JvZHknKTtcbiAgICAgICAgdmFyIGhlYWQgPSB0aGlzLnZpZXcuZmluZEJ5SWQoJ2hlYWQnKTtcbiAgICAgICAgdmFyIHNvcnRPbiA9IHNvcnRvbiB8fCBuYW1lO1xuXG4gICAgICAgIGlmICh0aGlzLnNvcnRlZE9uID09PSBuYW1lKSB7XG5cbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IHRoaXMuZGF0YS5yZXZlcnNlKCk7XG4gICAgICAgICAgICB0aGlzLmFycm93ID0gKHRoaXMuYXJyb3cgPT09IEFTQykgPyBERVNDIDogQVNDO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHN0cmF0ZWd5ID0gc3RyYXRlZ3kgfHwgJ3N0cmluZyc7XG4gICAgICAgICAgICB0aGlzLmFycm93ID0gREVTQztcbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IHRoaXMub3JpZ2luYWxEYXRhLnNsaWNlKCkuXG4gICAgICAgICAgICBzb3J0KChhLCBiKSA9PlxuICAgICAgICAgICAgICAgIFNPUlRTW3N0cmF0ZWd5XShQcm9wZXJ0eS5nZXQoYSwgc29ydE9uKSwgUHJvcGVydHkuZ2V0KGIsIHNvcnRPbikpKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zb3J0ZWRPbiA9IG5hbWU7XG5cbiAgICAgICAgd2hpbGUgKGJvZHkubGFzdENoaWxkKVxuICAgICAgICAgICAgYm9keS5yZW1vdmVDaGlsZChib2R5Lmxhc3RDaGlsZCk7XG5cbiAgICAgICAgd2hpbGUgKGhlYWQubGFzdENoaWxkKVxuICAgICAgICAgICAgaGVhZC5yZW1vdmVDaGlsZChoZWFkLmxhc3RDaGlsZCk7XG5cbiAgICAgICAgaGVhZC5hcHBlbmRDaGlsZCgobmV3IFZpZXcodGhlYWQsIHRoaXMpKS5yZW5kZXIoKSk7XG4gICAgICAgIGJvZHkuYXBwZW5kQ2hpbGQoKG5ldyBWaWV3KHRib2R5LCB0aGlzKSkucmVuZGVyKCkpO1xuXG4gICAgfVxuXG4gICAgc2VsZWN0QWxsKCkge1xuXG4gICAgfVxuXG4gICAgc2VsZWN0Um93KCkge1xuXG5cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMudmlldy5yZW5kZXIoKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBUYWJsZTtcbiJdfQ==