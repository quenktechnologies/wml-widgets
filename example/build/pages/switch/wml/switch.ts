import * as ___wml from '@quenk/wml';
import {
    PageExample
} from '../../../page-example';;
import {
    Switch
} from '../../../../../lib/control/switch';;
import {
    SwitchPage
} from '../';



export class Main extends ___wml.AppView < SwitchPage > {

    constructor(___context: SwitchPage) {

        super(___context);

        this.template = (___view: ___wml.AppView < SwitchPage > ) =>
            ___wml.widget(PageExample, {
                html: {},
                wml: {}
            }, [___wml.node('p', {
                html: {},
                wml: {}
            }, [___wml.text(`The switch is `), ___wml.node('b', {
                html: {},
                wml: {
                    'id': `content`
                }
            }, [___wml.text(`untouched`)], ___view), ___wml.text(`.`)], ___view), ___wml.node('p', {
                html: {},
                wml: {}
            }, [___wml.widget(Switch, {
                html: {},
                wml: {},
                ww: {
                    'name': `switch`,
                    'onChange': ___context.onChange
                }
            }, [], ___view)], ___view)], ___view);

    }

}