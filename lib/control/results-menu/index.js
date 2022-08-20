"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultsMenu = exports.ItemSelectedEvent = exports.RESULTS_MENU = void 0;
const maybe_1 = require("@quenk/noni/lib/data/maybe");
const wml_1 = require("@quenk/wml");
const __1 = require("../../");
const util_1 = require("../../util");
const __2 = require("../");
const results_menu_1 = require("./wml/results-menu");
///classNames:begin
exports.RESULTS_MENU = 'ww-results-menu';
/**
 * ItemSelectedEvent
 */
class ItemSelectedEvent extends __2.Event {
}
exports.ItemSelectedEvent = ItemSelectedEvent;
/**
 * ResultsMenu used to display results in select styled controls.
 */
class ResultsMenu extends wml_1.Component {
    constructor() {
        super(...arguments);
        this.view = new results_menu_1.Main(this);
        this.values = {
            wml: {
                id: 'menu'
            },
            tree: maybe_1.nothing(),
            results: (this.attrs.ww && this.attrs.ww.results) ?
                this.attrs.ww.results : [],
            name: (this.attrs.ww && this.attrs.ww.name) ?
                this.attrs.ww.name : '',
            className: util_1.concat(exports.RESULTS_MENU, __1.getClassName(this.attrs)),
            block: (this.attrs.ww && this.attrs.ww.block) ?
                this.attrs.ww.block : false,
            hidden: (this.attrs.ww && this.attrs.ww.hidden) ?
                this.attrs.ww.hidden : false,
            item: {
                stringifier: (this.attrs.ww && this.attrs.ww.stringifier) ?
                    this.attrs.ww.stringifier : (v) => Object.toString.call(v),
                click: (index) => {
                    if (this.attrs.ww && this.attrs.ww.onSelect)
                        this.attrs.ww.onSelect(new ItemSelectedEvent(this.attrs.ww && this.attrs.ww.name || '', this.values.results[index]));
                },
                template: (result, index) => (this.attrs.ww && this.attrs.ww.itemTemplate) ?
                    this.attrs.ww.itemTemplate(result, index, this) :
                    new results_menu_1.ItemTemplateView({
                        option: this.values.item.stringifier(result)
                    }),
                noItemsTemplate: () => (this.attrs.ww && this.attrs.ww.noItemsTemplate) ?
                    this.attrs.ww.noItemsTemplate : new results_menu_1.NoItemsTemplateView({}),
            }
        };
    }
    open() {
        util_1.getById(this.view, this.values.wml.id)
            .map((m) => m.show());
        this.values.hidden = false;
        if (this.attrs.ww && this.attrs.ww.onOpen)
            this.attrs.ww.onOpen();
        return this;
    }
    close() {
        util_1.getById(this.view, this.values.wml.id)
            .map((m) => m.hide());
        this.values.hidden = true;
        if (this.attrs.ww && this.attrs.ww.onClose)
            this.attrs.ww.onClose();
        return this;
    }
    toggle() {
        util_1.getById(this.view, this.values.wml.id)
            .map((m) => m.toggle());
        this.values.hidden = !this.values.hidden;
        if (this.values.hidden === true &&
            this.attrs.ww &&
            this.attrs.ww.onClose)
            this.attrs.ww.onClose();
        else if (this.values.hidden === false &&
            this.attrs.ww &&
            this.attrs.ww.onOpen)
            this.attrs.ww.onOpen();
        return this;
    }
    handleEvent(e) {
        if (this.values.tree.isJust()) {
            let root = this.values.tree.get();
            if (!document.body.contains(root))
                document.removeEventListener('click', this);
            if ((!root.contains(e.target)))
                this.close();
        }
    }
    /**
     * update will cause the menu to be displayed.
     */
    update(results) {
        this.values.results = results;
        this.values.hidden = false;
        this.view.invalidate();
        return this;
    }
    render() {
        this.values.tree = maybe_1.just(this.view.render());
        window.removeEventListener('click', this);
        window.addEventListener('click', this);
        return this.values.tree.get();
    }
}
exports.ResultsMenu = ResultsMenu;
//# sourceMappingURL=index.js.map