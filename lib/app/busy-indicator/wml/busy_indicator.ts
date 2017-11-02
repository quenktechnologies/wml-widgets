import * as $wml from '@quenk/wml';
import {
    BusyIndicator
} from '../BusyIndicator';



export class Main extends $wml.AppView < BusyIndicator > {

    constructor(context: BusyIndicator) {

        super(context);

        this.template = (___context: BusyIndicator, ___view: $wml.AppView < BusyIndicator > ) =>
            $wml.node('div', {
                html: {
                    'class': ___context.values.class
                },
                wml: {}
            }, [], ___view);

    }

}