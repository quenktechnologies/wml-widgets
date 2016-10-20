import * as Class from 'wat-classes';
import AutocompleteDelegate from './AutocompleteDelegate';

/**
 * RestDelegate is used when the autocomplete is not doing anything special.
 * It may have focus but that's it.
 */
class RestDelegate extends AutocompleteDelegate {

    handleKeyUp(e) {

        if (e.keyCode === 27)
            e.target.blur();

    }

    handleKeyDown(e) {

        if (e.keyCode !== 27)
            this.autocomplete.toSearch();

    }

    render() {

        var options = this.autocomplete.view.findById('options');

        while (options.lastChild)
            options.removeChild(options.lastChild);

        options.classList.toggle(Class.WAT_VISIBLE);

    }

}

export default RestDelegate
