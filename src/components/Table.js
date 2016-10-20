import { View, Widget } from 'wmljs/lib/runtime';

/**
 * Table
 */
class Table extends Widget {

    constructor(attrs, children) {

        super(attrs, children);

        this.data = attrs.ns.bs.data;
        this._layout = attrs.ns.bs.layout;
        this.fields = attrs.ns.bs.fields || [];

    }

    /**
     * rowClicked
     */
    rowClicked(e) {

        if (this.attributes.ns)
            if (this.attributes.ns.bs.onRowClicked)
                this.attributes.ns.bs.onRowClicked(e, this);

    }

    render() {

        if (!this._layout) throw new Error('Table: Layout not specified!');

        return (new View(this._layout, this)).render();

    }

}
export default Table
