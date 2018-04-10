import * as ___wml from '@quenk/wml';
import {
    Stack
} from '../';

export const content = < V > (___context: Stack < V > ) => (v: V) => (_: number) => (___view: ___wml.View) => ___wml.node('div', {
    html: {
        'class': ___context.values.element.content.class
    },
    wml: {}
}, [___wml.domify(___context.values.element.decorator(v))], ___view);

export class Main < V > extends ___wml.AppView < Stack < V > > {

    constructor(___context: Stack < V > ) {

        super(___context);

        this.template = (___view: ___wml.AppView < Stack < V > > ) =>
            ___wml.node('ul', {
                html: {
                    'class': ___context.values.root.class
                },
                wml: {}
            }, [___wml.map(___context.values.root.value, function _map(v, index: number) {
                return ___wml.node('li', {
                    html: {
                        'class': ___context.values.element.class
                    },
                    wml: {}
                }, [___wml.domify(___context.values.element.template()(v)(index)(___view)), ___wml.node('button', {
                    html: {
                        'class': ___context.values.close.class,
                        'onclick': ___context.values.element.close(index)
                    },
                    wml: {}
                }, [___wml.text(`×`)], ___view)], ___view)
            }, function otherwise() {
                return document.createDocumentFragment();
            })], ___view);

    }

}