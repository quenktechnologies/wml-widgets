import { View, Widget } from '@quenk/wml/lib/runtime';
import layout from './wml/card_title.wml';


/**
 * CardTitle
 */
class CardTitle extends Widget {

    render() {

        return View.render(layout, this);

    }

}

export default CardTitle
