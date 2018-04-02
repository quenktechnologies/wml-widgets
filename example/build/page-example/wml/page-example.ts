import * as ___wml from '@quenk/wml';
import {
    GridLayout,
    Row,
    Column
} from '../../../../lib/layout/grid-layout';;
import {
    PageExample
} from '..';



export class Main extends ___wml.AppView < PageExample > {

    constructor(___context: PageExample) {

        super(___context);

        this.template = (___view: ___wml.AppView < PageExample > ) =>
            ___wml.widget(GridLayout, {
                html: {},
                wml: {}
            }, [___wml.widget(Row, {
                html: {},
                wml: {}
            }, [___wml.widget(Column, {
                html: {},
                wml: {}
            }, [___wml.domify(___context.children)], ___view)], ___view)], ___view);

    }

}