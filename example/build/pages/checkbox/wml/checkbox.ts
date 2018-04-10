import * as ___wml from '@quenk/wml';
import {
    PageExample
} from '../../../page-example';;
import {
    Checkbox
} from '../../../../../lib/control/checkbox';;
import {
    CheckboxPage
} from '../';



export class Main extends ___wml.AppView < CheckboxPage > {

    constructor(___context: CheckboxPage) {

        super(___context);

        this.template = (___view: ___wml.AppView < CheckboxPage > ) =>
            ___wml.widget(PageExample, {
                html: {},
                wml: {}
            }, [___wml.node('p', {
                html: {},
                wml: {}
            }, [___wml.text(`The checkbox is `), ___wml.node('b', {
                html: {},
                wml: {
                    'id': `content`
                }
            }, [___wml.text(`untouched`)], ___view), ___wml.text(`.`)], ___view), ___wml.node('p', {
                html: {},
                wml: {}
            }, [___wml.widget(Checkbox, {
                html: {},
                wml: {},
                ww: {
                    'name': `checkbox`,
                    'onChange': ___context.onChange
                }
            }, [], ___view)], ___view)], ___view);

    }

}