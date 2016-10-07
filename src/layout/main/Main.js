import {View, Widget} from 'wmljs/lib/runtime';
import main from './wml/main.wml';

/**
 * Main area for content in the layout.
 */
class Main extends Widget {

    render() {

        return View.render(main, this);

    }

}
export default Main

