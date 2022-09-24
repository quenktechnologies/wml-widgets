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
            tree: (0, maybe_1.nothing)(),
            results: (this.attrs && this.attrs.results) ?
                this.attrs.results : [],
            name: (this.attrs && this.attrs.name) ?
                this.attrs.name : '',
            className: (0, util_1.concat)(exports.RESULTS_MENU, (0, __1.getClassName)(this.attrs)),
            block: (this.attrs && this.attrs.block) ?
                this.attrs.block : false,
            hidden: (this.attrs && this.attrs.hidden) ?
                this.attrs.hidden : false,
            item: {
                stringifier: (this.attrs && this.attrs.stringifier) ?
                    this.attrs.stringifier : (v) => Object.toString.call(v),
                click: (index) => {
                    if (this.attrs && this.attrs.onSelect)
                        this.attrs.onSelect(new ItemSelectedEvent(this.attrs && this.attrs.name || '', this.values.results[index]));
                },
                template: (result, index) => (this.attrs && this.attrs.itemTemplate) ?
                    this.attrs.itemTemplate(result, index, this) :
                    new results_menu_1.ItemTemplateView({
                        option: this.values.item.stringifier(result)
                    }),
                noItemsTemplate: () => (this.attrs && this.attrs.noItemsTemplate) ?
                    this.attrs.noItemsTemplate : new results_menu_1.NoItemsTemplateView({}),
            }
        };
    }
    open() {
        (0, util_1.getById)(this.view, this.values.wml.id)
            .map((m) => m.show());
        this.values.hidden = false;
        if (this.attrs && this.attrs.onOpen)
            this.attrs.onOpen();
        return this;
    }
    close() {
        (0, util_1.getById)(this.view, this.values.wml.id)
            .map((m) => m.hide());
        this.values.hidden = true;
        if (this.attrs && this.attrs.onClose)
            this.attrs.onClose();
        return this;
    }
    toggle() {
        (0, util_1.getById)(this.view, this.values.wml.id)
            .map((m) => m.toggle());
        this.values.hidden = !this.values.hidden;
        if (this.values.hidden === true &&
            this.attrs &&
            this.attrs.onClose)
            this.attrs.onClose();
        else if (this.values.hidden === false &&
            this.attrs &&
            this.attrs.onOpen)
            this.attrs.onOpen();
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
        this.values.tree = (0, maybe_1.just)(this.view.render());
        window.removeEventListener('click', this);
        window.addEventListener('click', this);
        return this.values.tree.get();
    }
}
exports.ResultsMenu = ResultsMenu;
//# sourceMappingURL=index.js.map