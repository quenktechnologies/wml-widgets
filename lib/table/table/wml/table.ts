import * as $wml from '@quenk/wml';
import * as T from '../Table';;
import * as names from '@package/self/common/names';;
import {
    concat
} from '@package/self/common/util';;
import {
    CellClickedEvent
} from '../CellClickedEvent';;
import {
    RowClickedEvent
} from '../RowClickedEvent';;
import {
    RowSelectedEvent
} from '../RowSelectedEvent';;
import {
    HeadingClickedEvent
} from '../HeadingClickedEvent';;
import {
    get
} from 'property-seek';;
import {
    Fragment
} from '@package/self/layout/fragment/Fragment';;
import {
    Field
} from '../Table';

export const allSelectedCheckbox = < D > () => (___context: T.Table < D > ) => (___view: $wml.View) => $wml.node('th', {
    html: {},
    wml: {}
}, [$wml.node('input', {
    html: {
        'type': `checkbox`,
        'onclick': () => ___context.model.allSelected()
    },
    wml: {}
}, [], ___view)], ___view);;
export const headings = < D > (fields: Field < D > []) => (___context: T.Table < D > ) => (___view: $wml.View) => $wml.map(fields, function _map(field: Field < D > ) {
    return $wml.ifthen(field.sortAs, function then() {
        return $wml.node('th', {
            html: {
                'class': concat(___context.values.class.heading, ((___context.values.sortedOn === field.name)) ? names.ACTIVE : ``),
                'onclick': () => ___context.model.headingClicked(new HeadingClickedEvent(field.name, field))
            },
            wml: {}
        }, [$wml.domify(field.heading), $wml.ifthen((___context.values.sortedOn === field.name), function then() {
            return $wml.domify(___context.values.arrow)
        }, function else_clause() {
            return $wml.domify(``)
        })], ___view)
    }, function else_clause() {
        return $wml.node('th', {
            html: {
                'class': concat(___context.values.class.heading, ((___context.values.sortedOn === field.name)) ? names.ACTIVE : ``),
                'onclick': () => ___context.model.headingClicked(new HeadingClickedEvent(field.name, field))
            },
            wml: {}
        }, [$wml.domify(field.heading), $wml.domify(((___context.values.sortedOn === field.name)) ? ___context.values.arrow : ``)], ___view)
    })
}, function otherwise() {
    return document.createDocumentFragment();
});;
export const thead = < D > (fields: Field < D > []) => (___context: T.Table < D > ) => (___view: $wml.View) => $wml.node('tr', {
    html: {},
    wml: {}
}, [$wml.ifthen(___context.values.options.selectable, function then() {
    return $wml.box($wml.domify(allSelectedCheckbox()(___context)(___view)), $wml.domify(headings(fields)(___context)(___view)))
}, function else_clause() {
    return $wml.domify(headings(fields)(___context)(___view))
})], ___view);;
export const rowSelectCheckbox = < D > (row: D, index: string, data: D[]) => (___context: T.Table < D > ) => (___view: $wml.View) => $wml.ifthen(___context.values.options.selectable, function then() {
    return $wml.node('td', {
        html: {},
        wml: {}
    }, [$wml.node('input', {
        html: {
            'type': `checkbox`,
            'onclick': () => ___context.model.rowSelected(new RowSelectedEvent(row, index, data))
        },
        wml: {}
    }, [], ___view)], ___view)
}, function else_clause() {
    return $wml.domify(null)
});;
export const rows = < D > (row: D, index: string, fields: T.Field < D > []) => (___context: T.Table < D > ) => (___view: $wml.View) => $wml.map(fields, function _map(field: T.Field < D > ) {
    return $wml.node('td', {
        html: {
            'class': ___context.values.class.cell,
            'onclick': () => ___context.model.cellClicked(new CellClickedEvent(get(field.name, row), field.name, index, row))
        },
        wml: {}
    }, [$wml.ifthen(field.fragment, function then() {
        return $wml.domify(field.fragment(get(field.name, row), field.name, row, field)(___view))
    }, function else_clause() {
        return $wml.domify(get(field.name, row))
    })], ___view)
}, function otherwise() {
    return document.createDocumentFragment();
});;
export const tbody = < D > (data: D[], fields: T.Field < D > []) => (___context: T.Table < D > ) => (___view: $wml.View) => $wml.map(data, function _map(row: D, index: string) {
    return $wml.node('tr', {
        html: {
            'class': ___context.values.class.row,
            'onclick': () => ___context.model.rowClicked(new RowClickedEvent(row, index, data))
        },
        wml: {}
    }, [$wml.ifthen(___context.values.options.selectable, function then() {
        return $wml.box($wml.domify(rowSelectCheckbox(row, index, data)(___context)(___view)), $wml.domify(rows(row, index, fields)(___context)(___view)))
    }, function else_clause() {
        return $wml.domify(rows(row, index, fields)(___context)(___view))
    })], ___view)
}, function otherwise() {
    return document.createDocumentFragment();
});;
export const table = < D > () => (___context: T.Table < D > ) => (___view: $wml.View) => $wml.node('table', {
    html: {
        'class': ___context.values.class.root
    },
    wml: {
        'id': ___context.values.id.root
    }
}, [$wml.node('thead', {
    html: {},
    wml: {
        'id': `head`
    }
}, [$wml.domify(thead(___context.values.fields)(___context)(___view))], ___view), $wml.node('tbody', {
    html: {},
    wml: {
        'id': `body`
    }
}, [$wml.domify(tbody(___context.values.data, ___context.values.fields)(___context)(___view))], ___view)], ___view);;
export class Table < D > extends $wml.AppView < T.Table < D > > {

    constructor(context: T.Table < D > ) {

        super(context);

        this.template = (___context: T.Table < D > , ___view: $wml.AppView < T.Table < D > > ) =>
            $wml.widget(Fragment, {
                html: {},
                wml: {}
            }, [$wml.ifthen((___context.values.data.length === 0), function then() {
                return $wml.ifthen(___context.values.fragment.empty, function then() {
                    return $wml.domify(___context.values.fragment.empty.render())
                }, function else_clause() {
                    return $wml.domify(table()(___context)(___view))
                })
            }, function else_clause() {
                return $wml.domify(table()(___context)(___view))
            })], ___view);

    }

}