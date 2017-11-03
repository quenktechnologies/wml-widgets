"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ___wml = require("@quenk/wml");
exports.label = function (id, text) { return function (___view) { return ___wml.node('label', {
    html: {
        'for': id,
        'class': "control-label"
    },
    wml: {}
}, [___wml.domify(text)], ___view); }; };
;
exports.message = function (id, m) { return function (___view) { return ___wml.ifthen(m.success, function then() {
    return ___wml.node('span', {
        html: {
            'class': "help-text"
        },
        wml: {
            'id': id
        }
    }, [___wml.domify(m.success)], ___view);
}, function elseif() {
    return ___wml.ifthen(m.error, function then() {
        return ___wml.node('span', {
            html: {
                'class': "help-text"
            },
            wml: {
                'id': id
            }
        }, [___wml.domify(m.error)], ___view);
    }, function elseif() {
        return ___wml.ifthen(m.warning, function then() {
            return ___wml.node('span', {
                html: {
                    'class': "help-text"
                },
                wml: {
                    'id': id
                }
            }, [___wml.domify(m.warning)], ___view);
        }, function else_clause() {
            return ___wml.domify("");
        });
    });
}); }; };
//# sourceMappingURL=index.js.map