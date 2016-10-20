/**
 * AutocompleteDelegate
 * @param {Autocomplete} autocomplete
 * @abstract
 */
class AutocompleteDelegate {

    constructor(autocomplete) {

        this.autocomplete = autocomplete;

    }

    handleKeyDown() {

    }

    handleKeyUp() {

    }

    update() {


    }

    /**
     * selected is called when an option has been clicked on
     * @param {number} index
     */
    selected(index) {


    }

}

export default AutocompleteDelegate
