import * as $wml from '@quenk/wml';
import {
    Select
} from '../Select';;
import {
    label,
    message
} from '@package/self/control/wml';



export class Main extends $wml.AppView < Select > {

    constructor(context: Select) {

        super(context);

        this.template = (___context: Select, ___view: $wml.AppView < Select > ) =>
            $wml.node('div', {
                html: {
                    'class': ___context.values.root.class
                },
                wml: {}
            }, [$wml.domify(label(___context.values.label.id, ___context.values.label.text)(___view)), $wml.node('select', {
                html: {
                    'name': ___context.values.select.name,
                    'onchange': ___context.values.select.onChange,
                    'value': ___context.values.select.value,
                    'disabled': ___context.values.select.disabled,
                    'readonly': ___context.values.select.readOnly,
                    'class': ___context.values.select.class
                },
                wml: {
                    'id': ___context.values.select.id
                }
            }, [$wml.node('option', {
                html: {
                    'value': ``,
                    'disabeld': true
                },
                wml: {}
            }, [$wml.domify(___context.values.select.placeholder)], ___view), $wml.map(___context.values.select.options, function _map(opt) {
                return $wml.node('option', {
                    html: {
                        'value': ___context.values.select.optValue(opt),
                        'selected': ___context.values.select.isSelected(___context.values.select.optValue(opt))
                    },
                    wml: {}
                }, [$wml.domify(___context.values.select.optLabel(opt))], ___view)
            }, function otherwise() {
                return document.createDocumentFragment();
            })], ___view), $wml.domify(message(___context.values.help.id, ___context.values.help)(___view))], ___view);

    }

}