import * as ___wml from '@quenk/wml';
import {
    Select
} from '../';



export class Main < V > extends ___wml.AppView < Select < V > > {

    constructor(___context: Select < V > ) {

        super(___context);

        this.template = (___view: ___wml.AppView < Select < V > > ) =>
            ___wml.node('select', {
                html: {
                    'class': ___context.values.className,
                    'onchange': ___context.values.onchange,
                    'value': ___context.values.selected
                },
                wml: {}
            }, [___wml.node('option', {
                html: {
                    'disabled': `true`,
                    'selected': true
                },
                wml: {}
            }, [___wml.domify(___context.values.instruction)], ___view), ___wml.map(___context.values.options, function _map(opt, index: number) {
                return ___wml.node('option', {
                    html: {
                        'value': (`` + index)
                    },
                    wml: {}
                }, [___wml.domify(opt.title)], ___view)
            }, function otherwise() {
                return document.createDocumentFragment();
            })], ___view);

    }

}