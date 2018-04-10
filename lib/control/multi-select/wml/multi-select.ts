import * as ___wml from '@quenk/wml';
import {
    Select
} from '../../select';;
import {
    Stack
} from '../../stack';;
import {
    MultiSelect
} from '../';



export class Main < V > extends ___wml.AppView < MultiSelect < V > > {

    constructor(___context: MultiSelect < V > ) {

        super(___context);

        this.template = (___view: ___wml.AppView < MultiSelect < V > > ) =>
            ___wml.node('div', {
                html: {
                    'class': ___context.values.root.class
                },
                wml: {}
            }, [___wml.widget(Select, {
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
            }, [], ___view), ___wml.widget(Stack, {
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
            }, [], ___view)], ___view);

    }

}