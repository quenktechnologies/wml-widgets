import { View, Widget } from 'wmljs/lib/runtime';
import layout from './wml/card_block.wml';


/**
 * CardBlock
 */
class CardBlock extends Widget {

    render() {

        return View.render(layout, this);

    }

}

export default CardBlock
