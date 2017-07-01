import { View, Widget } from '@quenk/wml/lib/runtime';
import property from 'property-seek';
import throttle from 'lodash.throttle';
import nop from 'nop';
import layout from './wml/layout.wml';
import RestDelegate from './RestDelegate';
import SearchDelegate from './SearchDelegate';
import SelectionDelegate from './SelectionDelegate';
import PopulatedDelegate from './PopulatedDelegate';

class Autocomplete extends Widget {

    constructor(attrs, children) {

        super(attrs, children);

        this.choice = null;
        this.view = new View(layout, this);
        this.restDelegate = new RestDelegate(this);
        this.searchDelegate = new SearchDelegate(this);
        this.selectionDelegate = new SelectionDelegate(this);
        this.populatedDelegate = new PopulatedDelegate(this);
        this.delegate = null;

        this.search = throttle(input => {

            attrs.read('wat:search', nop)(input.value, this);

        }, 500);

    }

    onRendered() {

        document.addEventListener('click', this);

    }

    handleEvent(e) {

        if (!this.view.findById('root').contains(e.target)) {
            this.toRest();
        }

        if (!document.body.contains(this.view.findById('root')))
            document.removeEventListener('click', this);

    }

    handleKeyUp(e) {

        this.delegate.handleKeyUp(e);

    }

    handleKeyDown(e) {

        this.delegate.handleKeyDown(e);

    }

    handleInput(e) {

        //For compatability reasons
        e.target.onkeydown = null;
        this.handleKeyDown(e);

    }

    /**
     * selected is called when an option has been clicked on
     * @param {number} index
     */
    selected(index) {

        this.delegate.selected(index);

    }

    /**
     * toRest makes the Autocomplete behave.
     */
    toRest() {

        this.delegate = this.restDelegate;
        this.delegate.render();

    }

    /**
     * toSearch transitions the Autocomplete to the search phase.
     */
    toSearch() {

        this.delegate = this.searchDelegate;
        this.delegate.render();

    }

    /**
     * toSelection transitions the autocomplete to the selection phase
     */
    toSelection() {

        this.delegate = this.selectionDelegate;
        this.delegate.render();

    }

    /**
     * toPopulated transitions the autocomplete to a populate state
     * if is initialized with a value
     */
    toPopulated() {

        this.delegate = this.populatedDelegate;
        this.delegate.render();

    }

    /**
     * update the options displayed to the user
     * @param {array<object>} items
     */
    update(items) {

        this.delegate.update(items);

    }

    /**
     * set the value of the input
     * @param {string} value
     * @returns {Autocomplete}
     */
    set(value) {

        this.view.findById('input').value = value;
        return this;

    }

    render() {

        var tree = this.view.render();
        this.delegate = (this.attributes.read('wat:value')) ? this.populatedDelegate : this.restDelegate;
        this.delegate.render();
        return tree;

    }

}

export default Autocomplete
