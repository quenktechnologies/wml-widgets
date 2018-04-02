import * as ___wml from '@quenk/wml';




export class Main extends ___wml.AppView < void > {

    constructor(___context: void) {

        super(___context);

        this.template = (___view: ___wml.AppView < void > ) =>
            ___wml.node('fragment', {
                html: {},
                wml: {}
            }, [], ___view);

    }

}