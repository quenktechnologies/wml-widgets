"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ___wml = require("@quenk/wml");
exports.label = function (id) { return function (text) { return function (___view) { return ___wml.node('label', {
    html: {
        'for': id,
        'class': "control-label"
    },
    wml: {}
}, [___wml.domify(text)], ___view); }; }; };
;
exports.message = function (id) { return function (m) { return function (___view) { return (m.success) ? ___wml.node('span', {
    html: {
        'class': "help-text"
    },
    wml: {
        'id': id
    }
}, [___wml.domify(m.success)], ___view) : (m.error) ? ___wml.node('span', {
    html: {
        'class': "help-text"
    },
    wml: {
        'id': id
    }
}, [___wml.domify(m.error)], ___view) : (m.warning) ? ___wml.node('span', {
    html: {
        'class': "help-text"
    },
    wml: {
        'id': id
    }
}, [___wml.domify(m.warning)], ___view) : ___wml.node('span', {
    html: {
        'class': "help-text"
    },
    wml: {
        'id': id
    }
}, [], ___view); }; }; };
//# sourceMappingURL=index.js.map