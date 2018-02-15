import * as ___wml from '@quenk/wml';
import {
    Grid,
    Row,
    Column
} from '@package/wml-widgets/layout/grid/Grid';;
import {
    Button
} from '@package/wml-widgets/control/button';;
import {
    ButtonPage
} from '../';



export class Main extends ___wml.AppView < ButtonPage > {

    constructor(___context: ButtonPage) {

        super(___context);

        this.template = (___view: ___wml.AppView < ButtonPage > ) =>
            ___wml.widget(Grid, {
                html: {},
                wml: {}
            }, [___wml.widget(Row, {
                html: {},
                wml: {}
            }, [___wml.widget(Column, {
                html: {},
                wml: {}
            }, [___wml.node('p', {
                html: {},
                wml: {}
            }, [___wml.map(___context.values.styles, function _map(v: string, k: string) {
                return ___wml.widget(Button, {
                    html: {},
                    wml: {},
                    ww: {
                        'name': v,
                        'text': ___context.values.capitalize(k)
                    }
                }, [], ___view)
            }, function otherwise() {
                return document.createDocumentFragment();
            })], ___view)], ___view)], ___view)], ___view);

    }

}