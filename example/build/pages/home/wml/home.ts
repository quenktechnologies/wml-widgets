import * as ___wml from '@quenk/wml';
import {
    HomePage
} from '../';



export class Main extends ___wml.AppView < HomePage > {

    constructor(context: HomePage) {

        super(context);

        this.template = (___context: HomePage, ___view: ___wml.AppView < HomePage > ) =>
            ___wml.node('b', {
                html: {},
                wml: {}
            }, [___wml.text(`Index`)], ___view);

    }

}