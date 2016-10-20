import { View } from 'wmljs/lib/runtime';
import beof from 'beof';
import * as Class from 'wat-classes';
import nop from 'nop';
import AutocompleteDelegate from './AutocompleteDelegate';
import options from './wml/options.wml';

/**
 * SearchDelegate for the searching phase.
 */
class SearchDelegate extends AutocompleteDelegate {

    constructor(auto) {

        super(auto);

        this.optionsView = new View(options, this);
        this.options = [];

    }

    update(items) {

        beof({ items }).optional().array();

        this.options = items;
        this.render();

    }

    handleKeyUp(e) {

        if (e.keyCode === 27) {
            e.target.blur();
            this.autocomplete.toRest();
        }

    }

    handleKeyDown(e) {

        //@todo throttle searches?
        if (e.keyCode !== 27)
            this.autocomplete.search(e.target);

    }

    /**
     * selected is called when an option has been clicked on
     * @param {number} index
     */
    selected(index) {

        var choice = this.options[index];
        var display = '';

        this.autocomplete.attributes.read('wat:set', function() {})(
            (this.autocomplete.attributes.read('wat:valueField')) ?
            property(this.options[index], this.autocomplete.attributes.read('wat:valueField')) :
            this.options[index], this.autocomplete.attributes.read('wat:name'));

        if (this.autocomplete.attributes.read('wat:labelField')) {
            display = property(choice, this.autocomplete.attributes.read('wat:labelField'));
        } else if (this.autocomplete.attributes.read('wat:valueField')) {
            display = property(choice, this.autocomplete.attributes.read('wat:valueField'));
        } else {
            display = choice;
        }

        this.autocomplete.set(display);
        this.autocomplete.choice = choice;
        this.autocomplete.toSelection();

    }

    render() {

        var options = this.autocomplete.view.findById('options');

        while (options.lastChild)
            options.removeChild(options.lastChild);

        options.classList.toggle(Class.WAT_VISIBLE);
        options.appendChild(this.optionsView.render(), this);

    }

}

export default SearchDelegate
