import { View, Widget } from '@quenk/wml/lib/runtime';
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
