import * as ___wml from '@quenk/wml';
import {
    BusyIndicator
} from '@package/wml-widgets/app/busy-indicator/BusyIndicator';;
import {
    Grid,
    Row,
    Column
} from '@package/wml-widgets/layout/grid/Grid';;
import {
    BusyIndicatorPage
} from '../';



export class Main extends ___wml.AppView < BusyIndicatorPage > {

    constructor(___context: BusyIndicatorPage) {

        super(___context);

        this.template = (___view: ___wml.AppView < BusyIndicatorPage > ) =>
            ___wml.widget(Grid, {
                html: {},
                wml: {}
            }, [___wml.widget(Row, {
                html: {},
                wml: {}
            }, [___wml.widget(Column, {
                html: {},
                wml: {}
            }, [___wml.widget(BusyIndicator, {
                html: {},
                wml: {}
            }, [], ___view)], ___view)], ___view)], ___view);

    }

}