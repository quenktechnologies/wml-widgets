import * as $wml from '@quenk/wml';
import {
    BusyIndicator
} from '@package/self/app/busy-indicator/BusyIndicator';;
import {
    Grid,
    Row,
    Column
} from '@package/self/layout/grid/Grid';;
import {
    BusyIndicatorPage
} from '../';



export class Main extends $wml.AppView < BusyIndicatorPage > {

    constructor(context: BusyIndicatorPage) {

        super(context);

        this.template = (___context: BusyIndicatorPage, ___view: $wml.AppView < BusyIndicatorPage > ) =>
            $wml.widget(Grid, {
                html: {},
                wml: {}
            }, [$wml.widget(Row, {
                html: {},
                wml: {}
            }, [$wml.widget(Column, {
                html: {},
                wml: {}
            }, [$wml.widget(BusyIndicator, {
                html: {},
                wml: {}
            }, [], ___view)], ___view)], ___view)], ___view);

    }

}