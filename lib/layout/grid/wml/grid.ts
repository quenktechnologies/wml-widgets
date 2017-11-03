import * as ___wml from '@quenk/wml';
import * as G from '../Grid';

export class Grid extends ___wml.AppView < G.Grid > {

    constructor(context: G.Grid) {

        super(context);

        this.template = (___context: G.Grid, ___view: ___wml.AppView < G.Grid > ) =>
            ___wml.node('section', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [___wml.domify(___context.children)], ___view);

    }

};
export class Row extends ___wml.AppView < G.Row > {

    constructor(context: G.Row) {

        super(context);

        this.template = (___context: G.Row, ___view: ___wml.AppView < G.Row > ) =>
            ___wml.node('div', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [___wml.domify(___context.children)], ___view);

    }

};
export class Column extends ___wml.AppView < G.Column > {

    constructor(context: G.Column) {

        super(context);

        this.template = (___context: G.Column, ___view: ___wml.AppView < G.Column > ) =>
            ___wml.node('div', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [___wml.domify(___context.children)], ___view);

    }

}