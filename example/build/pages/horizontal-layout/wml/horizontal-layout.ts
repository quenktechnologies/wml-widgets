import * as ___wml from '@quenk/wml';
import {
    Grid,
    Row,
    Column
} from '../../../../../lib/layout/grid';;
import {
    HorizontalLayout
} from '../../../../../lib/layout/horizontal-layout';;
import {
    HorizontalLayoutPage
} from '../';



export class Main extends ___wml.AppView < HorizontalLayoutPage > {

    constructor(___context: HorizontalLayoutPage) {

        super(___context);

        this.template = (___view: ___wml.AppView < HorizontalLayoutPage > ) =>
            ___wml.widget(Grid, {
                html: {},
                wml: {}
            }, [___wml.widget(Row, {
                html: {},
                wml: {}
            }, [___wml.widget(Column, {
                html: {},
                wml: {}
            }, [___wml.widget(HorizontalLayout, {
                html: {},
                wml: {}
            }, [___wml.node('textarea', {
                html: {},
                wml: {}
            }, [___wml.text(`Area 1`)], ___view), ___wml.node('textarea', {
                html: {},
                wml: {}
            }, [___wml.text(`Area 2`)], ___view), ___wml.node('textarea', {
                html: {},
                wml: {}
            }, [___wml.text(`Area 3`)], ___view)], ___view)], ___view)], ___view)], ___view);

    }

}