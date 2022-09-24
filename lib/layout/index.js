"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doRemoveContent = exports.doSetContent = exports.AbstractLayout = exports.LAYOUT = void 0;
const wml_1 = require("@quenk/wml");
const util_1 = require("../util");
///classNames:begin
exports.LAYOUT = '-layout';
/**
 * AbstractLayout provides an implementation of Layout.
 */
class AbstractLayout extends wml_1.Component {
    setContent(c) {
        (0, exports.doSetContent)(this.view, this.values.content.wml.id, c);
        return this;
    }
    removeContent() {
        (0, exports.doRemoveContent)(this.view, this.values.content.wml.id);
        return this;
    }
}
exports.AbstractLayout = AbstractLayout;
/**
 * doSetContent on a Node found in a view.
 */
const doSetContent = (view, id, content) => {
    let maybeRoot = view.findById(id);
    if (maybeRoot.isNothing())
        return (0, util_1.warnMissing)(view, id);
    let n = maybeRoot.get();
    while (n.firstChild)
        n.removeChild(n.firstChild);
    content = Array.isArray(content) ? content : [content];
    for (let i = 0; i < content.length; i++)
        n.appendChild(content[i]);
};
exports.doSetContent = doSetContent;
/**
 * doRemoveContent from a View.
 */
const doRemoveContent = (view, id) => {
    let maybeNode = view.findById(id);
    if (maybeNode.isNothing())
        return (0, util_1.warnMissing)(view, id);
    let n = maybeNode.get();
    while (n.firstChild)
        n.removeChild(n.firstChild);
};
exports.doRemoveContent = doRemoveContent;
//# sourceMappingURL=index.js.map