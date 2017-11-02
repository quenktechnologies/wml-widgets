import * as $wml from '@quenk/wml';
import {
    Message
} from './Message';

export const label = (id: string, text: string) => (___view: $wml.View) => $wml.node('label', {
    html: {
        'for': id,
        'class': `control-label`
    },
    wml: {}
}, [$wml.domify(text)], ___view);;
export const message = (id: string, m: Message) => (___view: $wml.View) => $wml.ifthen(m.success, function then() {
    return $wml.node('span', {
        html: {
            'class': `help-text`
        },
        wml: {
            'id': id
        }
    }, [$wml.domify(m.success)], ___view)
}, function elseif() {
    return $wml.ifthen(m.error, function then() {
        return $wml.node('span', {
            html: {
                'class': `help-text`
            },
            wml: {
                'id': id
            }
        }, [$wml.domify(m.error)], ___view);
    }, function elseif() {
        return $wml.ifthen(m.warning, function then() {
            return $wml.node('span', {
                html: {
                    'class': `help-text`
                },
                wml: {
                    'id': id
                }
            }, [$wml.domify(m.warning)], ___view);
        }, function else_clause() {
            return $wml.domify(``)
        });
    });
});