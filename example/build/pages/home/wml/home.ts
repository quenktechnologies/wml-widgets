import * as ___wml from '@quenk/wml';
import {
    HomePage
} from '../';



export class Main extends ___wml.AppView < HomePage > {

    constructor(___context: HomePage) {

        super(___context);

        this.template = (___view: ___wml.AppView < HomePage > ) =>
            ___wml.node('b', {
                html: {},
                wml: {}
            }, [___wml.text(`Index`)], ___view);

    }

}