import { View, Widget } from 'wmljs/lib/runtime';
import layout from './wml/card.wml';


/**
 * Card
 */
class Card extends Widget {

    render() {

        return View.render(layout, this);

    }

}

export default Card
