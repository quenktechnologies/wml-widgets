import * as ___wml from '@quenk/wml';
import {
    Select
} from '../../select';;
import {
    Stack
} from '../../stack';;
import {
    label,
    message
} from '../../wml';;
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
            }, [___wml.domify(label(___context.values.label.id)(___context.values.label.text)(___view)), ___wml.widget(Select, {
                html: {},
                wml: {
                    'id': ___context.values.search.id
                },
                ww: {
                    'name': ___context.values.search.name,
                    'value': ___context.values.search.value,
                    'stringifier': ___context.values.stack.decorator,
                    'onSearch': ___context.values.search.onSearch,
                    'onChange': ___context.values.search.onChange
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
            }, [], ___view), ___wml.domify(message(___context.values.messages.id)(___context.values.messages)(___view))], ___view);

    }

}