import * as ___wml from '@quenk/wml';
import {
    Grid,
    Row,
    Column
} from '@package/self/layout/grid/Grid';;
import {
    ListGroup,
    ListGroupItem
} from '@package/self/layout/list-group';;
import {
    ListGroupPage
} from '../';



export class Main extends ___wml.AppView < ListGroupPage > {

    constructor(context: ListGroupPage) {

        super(context);

        this.template = (___context: ListGroupPage, ___view: ___wml.AppView < ListGroupPage > ) =>
            ___wml.widget(Grid, {
                html: {},
                wml: {}
            }, [___wml.widget(Row, {
                html: {},
                wml: {}
            }, [___wml.widget(Column, {
                html: {},
                wml: {}
            }, [___wml.widget(ListGroup, {
                html: {},
                wml: {}
            }, [___wml.widget(ListGroupItem, {
                html: {},
                wml: {}
            }, [___wml.node('p', {
                html: {},
                wml: {}
            }, [___wml.text(`This is the first item.`)], ___view)], ___view), ___wml.widget(ListGroupItem, {
                html: {},
                wml: {}
            }, [___wml.node('b', {
                html: {},
                wml: {}
            }, [___wml.text(`This is the second item.`)], ___view)], ___view), ___wml.widget(ListGroupItem, {
                html: {},
                wml: {}
            }, [___wml.node('h3', {
                html: {},
                wml: {}
            }, [___wml.text(`Whoa!`)], ___view), ___wml.node('p', {
                html: {},
                wml: {}
            }, [___wml.text(`This is a third item!`)], ___view)], ___view)], ___view)], ___view)], ___view)], ___view);

    }

}