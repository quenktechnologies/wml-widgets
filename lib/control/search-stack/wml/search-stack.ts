import * as ___wml from '@quenk/wml';
import {
    Autocomplete
} from '../../../control/autocomplete';;
import {
    Stack
} from '../../../control/stack';;
import {
    SearchStack
} from '../SearchStack';



export class Main < V > extends ___wml.AppView < SearchStack < V > > {

    constructor(___context: SearchStack < V > ) {

        super(___context);

        this.template = (___view: ___wml.AppView < SearchStack < V > > ) =>
            ___wml.node('div', {
                html: {
                    'class': ___context.values.root.class
                },
                wml: {}
            }, [___wml.widget(Stack, {
                html: {},
                wml: {
                    'id': ___context.values.stack.id
                },
                ww: {
                    'name': ___context.values.stack.name,
                    'value': ___context.values.stack.value,
                    'decorator': ___context.values.stack.decorator,
                    'onChange': ___context.values.stack.onChange
                }
            }, [], ___view), ___wml.widget(Autocomplete, {
                html: {},
                wml: {
                    'id': ___context.values.search.id
                },
                ww: {
                    'name': ___context.values.search.name,
                    'value': ___context.values.search.value,
                    'stringifier': ___context.values.stack.decorator,
                    'onSearch': ___context.values.search.onSearch,
                    'onSelect': ___context.values.search.onSelect
                }
            }, [], ___view)], ___view);

    }

}