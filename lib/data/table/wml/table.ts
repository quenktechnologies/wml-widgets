import * as ___wml from '@quenk/wml';
import {
    concat
} from '../../../util';;
import {
    get
} from 'property-seek';;
import {
    Fragment
} from '../../../layout/fragment';;
import {
    ACTIVE
} from '../../../content/state/active';;
import {
    Column,
    Table as Table
} from '..';

export const thead = < C,
    R > (___context: Table < C, R > ) => (columns: Column < C, R > []) => (___view: ___wml.View) => ___wml.node('thead', {
        html: {},
        wml: {
            'id': ___context.values.table.thead.id
        }
    }, [___wml.domify(heads(___context)(columns)(___view))], ___view);;
export const heads = < C,
    R > (___context: Table < C, R > ) => (columns: Column < C, R > []) => (___view: ___wml.View) => ___wml.node('tr', {
        html: {},
        wml: {}
    }, [(___context.values.options.selectable) ? ___wml.box(___wml.domify(allSelectedCheckbox(___context)(___view)), ___wml.domify(headings(___context)(columns)(___view))) : ___wml.domify(headings(___context)(columns)(___view))], ___view);;
export const allSelectedCheckbox = < C,
    R > (___context: Table < C, R > ) => (___view: ___wml.View) => ___wml.node('th', {
        html: {},
        wml: {}
    }, [___wml.node('input', {
        html: {
            'type': `checkbox`,
            'onclick': ___context.values.table.thead.onCheck
        },
        wml: {}
    }, [], ___view)], ___view);;
export const headings = < C,
    R > (___context: Table < C, R > ) => (columns: Column < C, R > []) => (___view: ___wml.View) => ___wml.map(columns, function _map(field: Column < C, R > ) {
        return (field.sortAs) ? ___wml.node('th', {
            html: {
                'class': concat(___context.values.table.thead.th.class, ((___context.values.sortedOn === field.name)) ? ACTIVE : ``),
                'onclick': ___context.values.table.thead.th.onclick(field.name)
            },
            wml: {}
        }, [___wml.domify(field.heading), ((___context.values.sortedOn === field.name)) ? ___wml.domify(___context.values.arrow) : ___wml.domify(``)], ___view) : ___wml.node('th', {
            html: {
                'class': concat(___context.values.table.thead.th.class, ((___context.values.sortedOn === field.name)) ? ACTIVE : ``),
                'onclick': ___context.values.table.thead.th.onclick(field.name)
            },
            wml: {}
        }, [___wml.domify(field.heading), ___wml.domify(((___context.values.sortedOn === field.name)) ? ___context.values.arrow : ``)], ___view)
    }, function otherwise() {
        return document.createDocumentFragment();
    });;
export const tbody = < C,
    R > (___context: Table < C, R > ) => (data: R[]) => (columns: Column < C, R > []) => (___view: ___wml.View) => ___wml.node('tbody', {
        html: {},
        wml: {
            'id': ___context.values.table.tbody.id
        }
    }, [___wml.domify(rows(___context)(data)(columns)(___view))], ___view);;
export const rows = < C,
    R > (___context: Table < C, R > ) => (data: R[]) => (columns: Column < C, R > []) => (___view: ___wml.View) => ___wml.map(data, function _map(rowData: R, index: number) {
        return ___wml.node('tr', {
            html: {
                'class': ___context.values.table.tbody.tr.class,
                'onclick': ___context.values.table.tbody.tr.onclick(rowData, index, data)
            },
            wml: {}
        }, [___wml.domify(cells(___context)(rowData)(index)(columns)(___view))], ___view)
    }, function otherwise() {
        return document.createDocumentFragment();
    });;
export const cells = < C,
    R > (___context: Table < C, R > ) => (rowData: R) => (rowNumber: number) => (columns: Column < C, R > []) => (___view: ___wml.View) => ___wml.box((___context.values.options.selectable) ? ___wml.domify(rowSelectCheckbox(___context)(rowData)(rowNumber)(___view)) : ___wml.domify(``), ___wml.map(columns, function _map(field: Column < C, R > , index: number) {
        return ___wml.node('td', {
            html: {
                'class': ___context.values.table.tbody.td.class,
                'onclick': ___context.values.table.tbody.td.onclick(get(field.name, rowData), field.name, rowData, rowNumber)
            },
            wml: {
                'id': ___context.values.table.tbody.td.id(field.name, index, rowNumber)
            }
        }, [(field.fragment) ? ___wml.domify(field.fragment(get(field.name, rowData))(field.name)(rowData)(___view)) : ___wml.domify(get(field.name, rowData))], ___view)
    }, function otherwise() {
        return document.createDocumentFragment();
    }));;
export const rowSelectCheckbox = < C,
    R > (___context: Table < C, R > ) => (row: R) => (index: number) => (___view: ___wml.View) => (___context.values.options.selectable) ? ___wml.node('td', {
        html: {},
        wml: {}
    }, [___wml.node('input', {
        html: {
            'type': `checkbox`,
            'onclick': ___context.values.table.tbody.tr.onCheck(row, index, ___context.values.data)
        },
        wml: {}
    }, [], ___view)], ___view) : ___wml.domify(``);;
export const table = < C,
    R > (___context: Table < C, R > ) => (___view: ___wml.View) => ___wml.node('table', {
        html: {
            'class': ___context.values.table.class
        },
        wml: {
            'id': ___context.values.table.id
        }
    }, [___wml.domify(___context.values.table.thead.template(___context)(___context.values.columns)(___view)), ___wml.domify(___context.values.table.tbody.template(___context)(___context.values.data)(___context.values.columns)(___view))], ___view);

export class Main < C, R > extends ___wml.AppView < Table < C, R > > {

    constructor(___context: Table < C, R > ) {

        super(___context);

        this.template = (___view: ___wml.AppView < Table < C, R > > ) =>
            ___wml.widget(Fragment, {
                html: {},
                wml: {}
            }, [((___context.values.data.length === 0)) ? (___context.values.empty) ? ___wml.domify(___context.values.empty(___view)) : ___wml.domify(table(___context)(___view)) : ___wml.domify(table(___context)(___view))], ___view);

    }

}