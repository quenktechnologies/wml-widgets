import { View, Widget } from 'wmljs/lib/runtime';
import item from './wml/item.wml';

/**
 * BreadCrumb
 */
class BreadCrumb extends Widget {

    render() {

        return View.render(item, this);

    }

}
export default BreadCrumb

