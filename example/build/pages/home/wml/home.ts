import * as $wml from '@quenk/wml';
import {
    HomePage
} from '../';



export class Main extends $wml.AppView < HomePage > {

    constructor(context: HomePage) {

        super(context);

        this.template = (___context: HomePage, ___view: $wml.AppView < HomePage > ) =>
            $wml.node('b', {
                html: {},
                wml: {}
            }, [$wml.text(`Index`)], ___view);

    }

}