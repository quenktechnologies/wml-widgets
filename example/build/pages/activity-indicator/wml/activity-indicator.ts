import * as ___wml from '@quenk/wml';
import {
    ActivityIndicator
} from '../../../../../lib/app/indicator/activity';;
import {
    PageExample
} from '../../../page-example';;
import {
    ActivityIndicatorPage
} from '../';



export class Main extends ___wml.AppView < ActivityIndicatorPage > {

    constructor(___context: ActivityIndicatorPage) {

        super(___context);

        this.template = (___view: ___wml.AppView < ActivityIndicatorPage > ) =>
            ___wml.widget(PageExample, {
                html: {},
                wml: {}
            }, [___wml.widget(ActivityIndicator, {
                html: {},
                wml: {}
            }, [], ___view)], ___view);

    }

}