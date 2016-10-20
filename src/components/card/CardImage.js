import { View, Widget } from 'wmljs/lib/runtime';
import layout from './wml/card_image.wml';


/**
 * CardImage
 */
class CardImage extends Widget {

    render() {

        return View.render(layout, this);

    }

}

export default CardImage
