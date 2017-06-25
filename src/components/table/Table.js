import { View, Widget } from '@quenk/wml/lib/runtime';
import Property from 'property-seek';
import table from './table.wml';
import tbody from './tbody.wml';
import thead from './thead.wml';

const ASC = '\u21e7';
const DESC = '\u21e9';

const SORTS = {

    date(a, b) {
        a = new Date(a).getTime();
        b = new Date(b).getTime();
        return a > b ? -1 : a < b ? 1 : 0;
    },
    string(a, b) {

        if (typeof a === 'string')
            a = a.replace(/\s+/, '').toLowerCase();

        if (typeof b === 'string')
            b = b.replace(/\s+/, '').toLowerCase();

        return (a > b) ? -1 : (a < b) ? 1 : 0;

    },
    natural(a, b) {

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
        } else if (isNaN(AInt)) { //A is not an Int
            return -1; //to make alphanumeric sort first return -1 here
        } else if (isNaN(BInt)) { //B is not an Int
            return 1; //to make alphanumeric sort first return 1 here
        } else {
            return AInt > BInt ? -1 : 1;
        }
    },
    number(a, b) {

        a = parseFloat(a);
        b = parseFloat(b);

        a = (isNaN(a)) ? -Infinity : a;
        b = (isNaN(b)) ? -Infinity : b;

        return (a > b) ? -1 : (a < b) ? 1 : 0;

    }

}

class Table extends Widget {

    constructor() {

        super(...arguments);

        this.class = `table ${this.attributes.read('wat:class')}`;
        this.fields = this.attributes.read('wat:fields', []);
        this.originalData = this.attributes.requireArray('wat:data', []);
        this.data = this.originalData.slice();
        this.selectable = this.attributes.read('wat:selectable', false);
        this.sortedOn = '';
        this.arrow = '';
        this.view = new View(table, this);
        this.rowClass = this.attributes.read('wat:rowClass', '');
        this.cellClass = this.attributes.read('wat:cellClass', '');
        this.headingClass = this.attributes.read('wat:headingClass', '');
        this.sortableHeadingClass = this.attributes.read('wat:sortableHeadingClass', '');
        this.onRowClicked = this.attributes.read('wat:onRowClicked', function() {});
        this.onCellClicked = this.attributes.read('wat:onCellClicked', function() {});

    }

    /**
     * isSortedBy checks if the given field is what we are currently sorted by.
     * @param {string} name
     */
    isSortedBy(name) {

        return (this.sortedOn === name)

    }

    /**
     * onHeadingClicked is called to sort the data displayed by
     * a particular field name.
     * @param {string} name
     * @param {string} [strategy='string']
     * @param {string} sorton
     */
    onHeadingClicked(name, strategy, sorton) {

        var data;
        var body = this.view.findById('body');
        var head = this.view.findById('head');
        var sortOn = sorton || name;

        if (this.sortedOn === name) {

            this.data = this.data.reverse();
            this.arrow = (this.arrow === ASC) ? DESC : ASC;

        } else {

            strategy = strategy || 'string';
            this.arrow = DESC;
            this.data = this.originalData.slice().
            sort((a, b) =>
                SORTS[strategy](Property.get(a, sortOn), Property.get(b, sortOn)));

        }

        this.sortedOn = name;

        while (body.lastChild)
            body.removeChild(body.lastChild);

        while (head.lastChild)
            head.removeChild(head.lastChild);

        head.appendChild((new View(thead, this)).render());
        body.appendChild((new View(tbody, this)).render());

    }

    selectAll() {

    }

    selectRow() {


    }

    render() {

        return this.view.render();

    }

}

export default Table;
