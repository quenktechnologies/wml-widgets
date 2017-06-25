import { View } from '@quenk/wml/lib/runtime';
import * as Class from 'wat-classes';
import property from 'property-seek';
import AutocompleteDelegate from './AutocompleteDelegate';

/**
 * PopulateDelegate for the searching phase.
 */
class PopulateDelegate extends AutocompleteDelegate {

    handleKeyUp(e) {

        if (e.keyCode === 27) {
            this.autocomplete.toRest();
            e.target.blur();
        }

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

        throw new ReferenceError('PopulateDelegate: does not support selecting!');

    }

    render() {

        var display;
        var value = this.autocomplete.attributes.read('wat:value');
        var label = this.autocomplete.attributes.read('wat:labelField');
        var valueField = this.autocomplete.attributes.read('wat:valueField');

        if (typeof value === 'object') {

            if (label) {
                value = property(value, label);
            } else if (valueField) {
                value = property(value, valueField);
            }

        }

        this.autocomplete.set(value);

    }

}

export default PopulateDelegate
