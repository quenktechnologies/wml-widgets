import * as ___wml from '@quenk/wml';
import {
    PageExample
} from '../../../page-example';;
import {
    ListLayout,
    ListLayoutItem
} from '../../../../../lib/layout/list-layout';;
import {
    ListLayoutPage
} from '../';



export class Main extends ___wml.AppView < ListLayoutPage > {

    constructor(___context: ListLayoutPage) {

        super(___context);

        this.template = (___view: ___wml.AppView < ListLayoutPage > ) =>
            ___wml.widget(PageExample, {
                html: {},
                wml: {}
            }, [___wml.widget(ListLayout, {
                html: {},
                wml: {}
            }, [___wml.widget(ListLayoutItem, {
                html: {},
                wml: {}
            }, [___wml.node('p', {
                html: {},
                wml: {}
            }, [___wml.text(`This is the first item.`)], ___view)], ___view), ___wml.widget(ListLayoutItem, {
                html: {},
                wml: {}
            }, [___wml.node('b', {
                html: {},
                wml: {}
            }, [___wml.text(`This is the second item.`)], ___view)], ___view), ___wml.widget(ListLayoutItem, {
                html: {},
                wml: {}
            }, [___wml.node('h3', {
                html: {},
                wml: {}
            }, [___wml.text(`Whoa!`)], ___view), ___wml.node('p', {
                html: {},
                wml: {}
            }, [___wml.text(`This is a third item!`)], ___view)], ___view)], ___view)], ___view);

    }

}