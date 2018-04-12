import * as ___wml from '@quenk/wml';
import {
    PageExample
} from '../../../page-example';;
import {
    TabLayout
} from '../../../../../lib/layout/tab-layout';;
import {
    TabLayoutPage
} from '../';

export const firstTab = (_: TabLayout) => (___view: ___wml.View) => ___wml.node('p', {
    html: {},
    wml: {}
}, [___wml.text(`Click a tab to change content.`)], ___view);;
export const secondTab = (_: TabLayout) => (___view: ___wml.View) => ___wml.node('p', {
    html: {},
    wml: {}
}, [___wml.text(`Second tab.`)], ___view);;
export const thirdTab = (_: TabLayout) => (___view: ___wml.View) => ___wml.node('p', {
    html: {},
    wml: {}
}, [___wml.text(`Third tab.`)], ___view);

export class Main extends ___wml.AppView < TabLayoutPage > {

    constructor(___context: TabLayoutPage) {

        super(___context);

        this.template = (___view: ___wml.AppView < TabLayoutPage > ) =>
            ___wml.widget(PageExample, {
                html: {},
                wml: {}
            }, [___wml.widget(TabLayout, {
                html: {},
                wml: {},
                ww: {
                    'tabs': ___context.tabs
                }
            }, [___wml.node('p', {
                html: {},
                wml: {}
            }, [___wml.text(`Click a tab to change content.`)], ___view)], ___view)], ___view);

    }

}