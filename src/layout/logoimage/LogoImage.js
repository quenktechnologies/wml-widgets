import { View, Widget } from 'wmljs/lib/runtime';
import logoimage from './wml/logoimage.wml';

/**
 * LogoImage
 */
class LogoImage extends Widget {

    render() {

        return View.render(logoimage, this);

    }

}

export default LogoImage
