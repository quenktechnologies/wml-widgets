import { View, Widget } from '@quenk/wml/lib/runtime';
import search from './wml/search';

/**
 * Search
 */
class Search extends Widget {

    constructor() {

        super(...arguments);

        this.delegate = this.attributes.read('wat:delegate', {
            onInput() {},
            onSubmit(){},
            onSearch() {},
        });

    }

    render() {

        return View.render(search, this);

    }

}

export default Search
