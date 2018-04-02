import * as ___wml from '@quenk/wml';
import {
    BusyIndicator
} from '..';



export class Main extends ___wml.AppView < BusyIndicator > {

    constructor(___context: BusyIndicator) {

        super(___context);

        this.template = (___view: ___wml.AppView < BusyIndicator > ) =>
            ___wml.node('div', {
                html: {
                    'class': ___context.values.class
                },
                wml: {}
            }, [], ___view);

    }

}