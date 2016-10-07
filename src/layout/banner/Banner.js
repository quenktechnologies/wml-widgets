import {View, Widget} from 'wmljs/lib/runtime';
import banner from './wml/banner.wml';

/**
 * Banner
 */
class Banner extends Widget {

    render() {

        return View.render(banner, this);

    }

}

export default Banner

