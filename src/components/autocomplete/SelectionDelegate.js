import { View } from 'wmljs/lib/runtime';
import * as Class from 'wat-classes';
import AutocompleteDelegate from './AutocompleteDelegate';

/**
 * SelectionDelegate for the searching phase.
 */
class SelectionDelegate extends AutocompleteDelegate {

    handleKeyUp(e) {

        if (e.keyCode === 27)
            this.autocomplete.toRest();

    }

    handleKeyDown(e) {

        if (e.keyCode !== 27)
            this.autocomplete.toSearch();

    }

    /**
     * selected is called when an option has been clicked on
     * @param {number} index
     */
    selected(index) {

        throw new ReferenceError('SelectionDelegate: does not support selecting!');

    }

    render() {

        var options = this.autocomplete.view.findById('options');

        while (options.lastChild)
            options.removeChild(options.lastChild);

        options.classList.toggle(Class.WAT_VISIBLE);

    }

}

export default SelectionDelegate
