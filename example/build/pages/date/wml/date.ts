import * as ___wml from '@quenk/wml';
import {
    PageExample
} from '../../../page-example';;
import {
    Date
} from '../../../../../lib/control/date';;
import {
    DatePage
} from '../';



export class Main extends ___wml.AppView < DatePage > {

    constructor(___context: DatePage) {

        super(___context);

        this.template = (___view: ___wml.AppView < DatePage > ) =>
            ___wml.widget(PageExample, {
                html: {},
                wml: {}
            }, [___wml.node('p', {
                html: {},
                wml: {}
            }, [___wml.text(`The date is : `), ___wml.node('b', {
                html: {},
                wml: {
                    'id': `selected`
                }
            }, [___wml.text(`(None selected)`)], ___view), ___wml.text(`.`)], ___view), ___wml.node('p', {
                html: {},
                wml: {}
            }, [___wml.widget(Date, {
                html: {},
                wml: {
                    'id': `date`
                },
                ww: {
                    'name': `date`,
                    'onChange': ___context.onChange
                }
            }, [], ___view)], ___view)], ___view);

    }

}