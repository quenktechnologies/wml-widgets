import { View, Widget } from 'wmljs/lib/runtime';

/**
 * Table
 */
class Table extends Widget {

    constructor(attrs, children) {

        super(attrs, children);

        this.data = attrs.read('wat:data', []);
        this._layout = attrs.require('wat:layout');
        this.fields = attrs.read('wat:fields',   []);

    }

    /**
     * rowClicked
     */
    rowClicked(e) {

                this.attributes.read('wat:onRowClicked', function(){})(e, this);

    }

    render() {

        if (!this._layout) throw new Error('Table: Layout not specified!');
        return View.render(this._layout, this);

    }

}
export default Table
