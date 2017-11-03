import * as ___wml from '@quenk/wml';
import {
    BusyIndicator
} from '../BusyIndicator';



export class Main extends ___wml.AppView < BusyIndicator > {

    constructor(context: BusyIndicator) {

        super(context);

        this.template = (___context: BusyIndicator, ___view: ___wml.AppView < BusyIndicator > ) =>
            ___wml.node('div', {
                html: {
                    'class': ___context.values.class
                },
                wml: {}
            }, [], ___view);

    }

}