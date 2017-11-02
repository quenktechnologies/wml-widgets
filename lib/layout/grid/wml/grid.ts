import * as $wml from '@quenk/wml';
import * as G from '../Grid';

export class Grid extends $wml.AppView < G.Grid > {

    constructor(context: G.Grid) {

        super(context);

        this.template = (___context: G.Grid, ___view: $wml.AppView < G.Grid > ) =>
            $wml.node('section', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [$wml.domify(___context.children)], ___view);

    }

};
export class Row extends $wml.AppView < G.Row > {

    constructor(context: G.Row) {

        super(context);

        this.template = (___context: G.Row, ___view: $wml.AppView < G.Row > ) =>
            $wml.node('div', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [$wml.domify(___context.children)], ___view);

    }

};
export class Column extends $wml.AppView < G.Column > {

    constructor(context: G.Column) {

        super(context);

        this.template = (___context: G.Column, ___view: $wml.AppView < G.Column > ) =>
            $wml.node('div', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [$wml.domify(___context.children)], ___view);

    }

}