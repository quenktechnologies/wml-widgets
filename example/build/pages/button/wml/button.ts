import * as ___wml from '@quenk/wml';
import {
    GridLayout,
    Row,
    Column
} from '../../../../../lib/layout/grid-layout';;
import {
    Button
} from '../../../../../lib/control/button';;
import {
    ButtonPage
} from '../';



export class Main extends ___wml.AppView < ButtonPage > {

    constructor(___context: ButtonPage) {

        super(___context);

        this.template = (___view: ___wml.AppView < ButtonPage > ) =>
            ___wml.widget(GridLayout, {
                html: {},
                wml: {}
            }, [___wml.widget(Row, {
                html: {},
                wml: {}
            }, [___wml.widget(Column, {
                html: {},
                wml: {}
            }, [___wml.node('h1', {
                html: {},
                wml: {}
            }, [___wml.text(`Buttons`)], ___view), ___wml.node('p', {
                html: {},
                wml: {}
            }, [___wml.node('h2', {
                html: {},
                wml: {}
            }, [___wml.text(`Style`)], ___view), ___wml.map(___context.values.styles, function _map(v: string, k: string) {
                return ___wml.box(___wml.widget(Button, {
                    html: {},
                    wml: {},
                    ww: {
                        'name': v,
                        'style': v,
                        'text': ___context.values.capitalize(k)
                    }
                }, [], ___view), ___wml.domify(` `))
            }, function otherwise() {
                return document.createDocumentFragment();
            })], ___view)], ___view)], ___view), ___wml.widget(Row, {
                html: {},
                wml: {}
            }, [___wml.widget(Column, {
                html: {},
                wml: {}
            }, [___wml.node('h2', {
                html: {},
                wml: {}
            }, [___wml.text(`Outline`)], ___view), ___wml.map(___context.values.styles, function _map(style: string, text: string) {
                return ___wml.box(___wml.widget(Button, {
                    html: {},
                    wml: {},
                    ww: {
                        'style': style,
                        'outline': true,
                        'text': ___context.values.capitalize(text)
                    }
                }, [], ___view), ___wml.domify(` `))
            }, function otherwise() {
                return document.createDocumentFragment();
            })], ___view)], ___view), ___wml.widget(Row, {
                html: {},
                wml: {}
            }, [___wml.widget(Column, {
                html: {},
                wml: {}
            }, [___wml.node('p', {
                html: {},
                wml: {}
            }, [___wml.node('h2', {
                html: {},
                wml: {}
            }, [___wml.text(`Active`)], ___view), ___wml.map(___context.values.styles, function _map(v: string, k: string) {
                return ___wml.box(___wml.widget(Button, {
                    html: {},
                    wml: {},
                    ww: {
                        'name': v,
                        'active': true,
                        'style': v,
                        'text': ___context.values.capitalize(k)
                    }
                }, [], ___view), ___wml.domify(` `))
            }, function otherwise() {
                return document.createDocumentFragment();
            })], ___view)], ___view)], ___view), ___wml.widget(Row, {
                html: {},
                wml: {}
            }, [___wml.widget(Column, {
                html: {},
                wml: {}
            }, [___wml.node('p', {
                html: {},
                wml: {}
            }, [___wml.node('h2', {
                html: {},
                wml: {}
            }, [___wml.text(`Disabled`)], ___view), ___wml.map(___context.values.styles, function _map(v: string, k: string) {
                return ___wml.box(___wml.widget(Button, {
                    html: {},
                    wml: {},
                    ww: {
                        'name': v,
                        'disabled': true,
                        'style': v,
                        'text': ___context.values.capitalize(k)
                    }
                }, [], ___view), ___wml.domify(` `))
            }, function otherwise() {
                return document.createDocumentFragment();
            })], ___view)], ___view)], ___view), ___wml.widget(Row, {
                html: {},
                wml: {}
            }, [___wml.widget(Column, {
                html: {},
                wml: {}
            }, [___wml.node('h2', {
                html: {},
                wml: {}
            }, [___wml.text(`Size`)], ___view), ___wml.map(___context.values.styles, function _map(style: string, _: string) {
                return ___wml.node('p', {
                    html: {},
                    wml: {}
                }, [___wml.map(___context.values.sizes, function _map(sizeValue: string, size: string) {
                    return ___wml.box(___wml.widget(Button, {
                        html: {},
                        wml: {},
                        ww: {
                            'name': size,
                            'style': style,
                            'size': sizeValue,
                            'text': ___context.values.capitalize(size)
                        }
                    }, [], ___view), ___wml.domify(` `))
                }, function otherwise() {
                    return document.createDocumentFragment();
                })], ___view)
            }, function otherwise() {
                return document.createDocumentFragment();
            })], ___view)], ___view), ___wml.widget(Row, {
                html: {},
                wml: {}
            }, [___wml.widget(Column, {
                html: {},
                wml: {}
            }, [___wml.node('h2', {
                html: {},
                wml: {}
            }, [___wml.text(`Block`)], ___view), ___wml.map(___context.values.styles, function _map(style: string, text: string) {
                return ___wml.box(___wml.widget(Button, {
                    html: {},
                    wml: {},
                    ww: {
                        'style': style,
                        'block': true,
                        'text': ___context.values.capitalize(text)
                    }
                }, [], ___view), ___wml.domify(` `))
            }, function otherwise() {
                return document.createDocumentFragment();
            })], ___view)], ___view)], ___view);

    }

}