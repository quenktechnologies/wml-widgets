"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var $wml = require("@quenk/wml");
exports.label = function (id, text) { return function (___view) { return $wml.node('label', {
    html: {
        'for': id,
        'class': "control-label"
    },
    wml: {}
}, [$wml.domify(text)], ___view); }; };
;
exports.message = function (id, m) { return function (___view) { return $wml.ifthen(m.success, function then() {
    return $wml.node('span', {
        html: {
            'class': "help-text"
        },
        wml: {
            'id': id
        }
    }, [$wml.domify(m.success)], ___view);
}, function elseif() {
    return $wml.ifthen(m.error, function then() {
        return $wml.node('span', {
            html: {
                'class': "help-text"
            },
            wml: {
                'id': id
            }
        }, [$wml.domify(m.error)], ___view);
    }, function elseif() {
        return $wml.ifthen(m.warning, function then() {
            return $wml.node('span', {
                html: {
                    'class': "help-text"
                },
                wml: {
                    'id': id
                }
            }, [$wml.domify(m.warning)], ___view);
        }, function else_clause() {
            return $wml.domify("");
        });
    });
}); }; };
//# sourceMappingURL=index.js.map