import * as ___wml from '@quenk/wml';
import {
    PageExample
} from '../../../page-example';;
import {
    TabBar,
    Tab
} from '../../../../../lib/control/tab-bar';;
import {
    TabBarPage
} from '../';



export class Main extends ___wml.AppView < TabBarPage > {

    constructor(___context: TabBarPage) {

        super(___context);

        this.template = (___view: ___wml.AppView < TabBarPage > ) =>
            ___wml.widget(PageExample, {
                html: {},
                wml: {}
            }, [___wml.widget(TabBar, {
                html: {},
                wml: {}
            }, [___wml.widget(Tab, {
                html: {},
                wml: {},
                ww: {
                    'active': (___context.tab === `First`),
                    'text': `First`,
                    'name': `First`,
                    'onClick': ___context.clicked
                }
            }, [], ___view), ___wml.widget(Tab, {
                html: {},
                wml: {},
                ww: {
                    'active': (___context.tab === `Second`),
                    'text': `Second`,
                    'name': `Second`,
                    'onClick': ___context.clicked
                }
            }, [], ___view), ___wml.widget(Tab, {
                html: {},
                wml: {},
                ww: {
                    'active': (___context.tab === `Third`),
                    'text': `Third`,
                    'name': `Third`,
                    'onClick': ___context.clicked
                }
            }, [], ___view)], ___view), ___wml.node('p', {
                html: {},
                wml: {
                    'id': `content`
                }
            }, [___wml.domify(___context.content)], ___view)], ___view);

    }

}