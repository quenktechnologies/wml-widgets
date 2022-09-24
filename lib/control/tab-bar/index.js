"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TabBar = exports.Tab = exports.TabClickedEvent = exports.TAB_BAR = exports.TAB = void 0;
const views = require("./wml/tab-bar");
const dom_1 = require("@quenk/wml/lib/dom");
const wml_1 = require("@quenk/wml");
const active_1 = require("../../content/state/active");
const orientation_1 = require("../../content/orientation");
const util_1 = require("../../util");
const __1 = require("../../");
const __2 = require("../");
///classNames:begin
/**
 * TAB
 */
exports.TAB = 'ww-tab';
/**
 * TAB_BAR
 */
exports.TAB_BAR = 'ww-tab-bar';
/**
 * TabClickedEvent is fired when a user clicks on a tab.
 *
 * It contains information about the tab that was clicked.
 */
class TabClickedEvent extends __2.Event {
    constructor(name) {
        super(name, name);
        this.name = name;
    }
}
exports.TabClickedEvent = TabClickedEvent;
/**
 * Tab provides a single tab item.
 *
 * When a tab is clicked, it attempts to remove the active class from
 * it's siblings and apply it to itself. Therefore the sibling of a
 * tab should always be a Tab.
 */
class Tab extends __2.AbstractControl {
    constructor() {
        super(...arguments);
        this.view = new views.Tab(this);
        this.values = {
            root: {
                wml: {
                    id: 'root'
                },
                id: (0, __1.getId)(this.attrs),
                className: (0, util_1.concat)(exports.TAB, (0, __1.getClassName)(this.attrs), (this.attrs && this.attrs.active) ? active_1.ACTIVE : ''),
            },
            a: {
                wml: {
                    id: 'link'
                },
                content: (this.attrs && this.attrs.text) ?
                    [(0, dom_1.text)(this.attrs.text)] : this.children,
                clicked: (e) => {
                    e.preventDefault();
                    let maybeRoot = (0, util_1.getById)(this.view, this.values.root.wml.id);
                    if (maybeRoot.isNothing())
                        return;
                    let root = maybeRoot.get();
                    let parent = root.parentNode;
                    let sibs = parent.children;
                    for (var i = 0; i < sibs.length; i++)
                        sibs[i].classList.remove(active_1.ACTIVE);
                    root.classList.add(active_1.ACTIVE);
                    if (this.attrs && this.attrs.onClick)
                        this.attrs.onClick(new TabClickedEvent(`${this.attrs.name}`));
                }
            }
        };
    }
    /**
     * click this Tab
     */
    click() {
        (0, util_1.getById)(this.view, this.values.root.wml.id)
            .map(e => e.click());
        return this;
    }
}
exports.Tab = Tab;
/**
 * TabBar acts as a parent container for a group of Tab.
 *
 * Use it to create a tabbed navigation or view for main layout,
 * sub views or forms etc.
 */
class TabBar extends wml_1.Component {
    constructor() {
        super(...arguments);
        this.view = new views.TabBar(this);
        this.values = {
            root: {
                id: (0, __1.getId)(this.attrs),
                className: (0, util_1.concat)(exports.TAB_BAR, (0, __1.getClassName)(this.attrs), (this.attrs && this.attrs.justify) ? orientation_1.JUSTIFIED : '')
            }
        };
    }
}
exports.TabBar = TabBar;
//# sourceMappingURL=index.js.map