import * as ___wml from '@quenk/wml';
import * as G from '../Grid';

export class Grid extends ___wml.AppView < G.Grid > {

    constructor(___context: G.Grid) {

        super(___context);

        this.template = (___view: ___wml.AppView < G.Grid > ) =>
            ___wml.node('section', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [___wml.domify(___context.children)], ___view);

    }

};
export class Row extends ___wml.AppView < G.Row > {

    constructor(___context: G.Row) {

        super(___context);

        this.template = (___view: ___wml.AppView < G.Row > ) =>
            ___wml.node('div', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [___wml.domify(___context.children)], ___view);

    }

};
export class Column extends ___wml.AppView < G.Column > {

    constructor(___context: G.Column) {

        super(___context);

        this.template = (___view: ___wml.AppView < G.Column > ) =>
            ___wml.node('div', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [___wml.domify(___context.children)], ___view);

    }

}