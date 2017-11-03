import * as ___wml from '@quenk/wml';




export class Main extends ___wml.AppView < void > {

    constructor(context: void) {

        super(context);

        this.template = (___context: void, ___view: ___wml.AppView < void > ) =>
            ___wml.node('fragment', {
                html: {},
                wml: {}
            }, [], ___view);

    }

}