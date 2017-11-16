import * as ___wml from '@quenk/wml';
import {
    Stack
} from '../Stack';;
import {
    Member
} from '../Member';

export const content = < M > (___context: Stack < M > ) => (m: Member < M > ) => (_: number) => (__: Member < M > []) => (___view: ___wml.View) => ___wml.node('span', {
    html: {
        'class': ___context.values.class.member
    },
    wml: {}
}, [___wml.domify(___context.values.item.decorator(m))], ___view);

export class Main < M > extends ___wml.AppView < Stack < M > > {

    constructor(___context: Stack < M > ) {

        super(___context);

        this.template = (___view: ___wml.AppView < Stack < M > > ) =>
            ___wml.node('ul', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [___wml.map(___context.values.value, function _map(m, index: number) {
                return ___wml.node('li', {
                    html: {},
                    wml: {}
                }, [___wml.domify(___context.values.item.template(___context)(m)(index)(___context.values.value)(___view)), ___wml.node('button', {
                    html: {
                        'class': ___context.values.class.close,
                        'onclick': ___context.values.item.close(index)
                    },
                    wml: {}
                }, [___wml.text(`×`)], ___view)], ___view)
            }, function otherwise() {
                return document.createDocumentFragment();
            })], ___view);

    }

}