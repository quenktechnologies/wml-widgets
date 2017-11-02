import * as $wml from '@quenk/wml';




export class Main extends $wml.AppView < void > {

    constructor(context: void) {

        super(context);

        this.template = (___context: void, ___view: $wml.AppView < void > ) =>
            $wml.node('fragment', {
                html: {},
                wml: {}
            }, [], ___view);

    }

}