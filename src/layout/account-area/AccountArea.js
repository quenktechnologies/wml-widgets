import { View, Widget } from '@quenk/wml/lib/runtime';
import account_area from './wml/account_area.wml';

/**
 * AccountArea
 */
class AccountArea extends Widget {

    toggle() {


    }

    render() {

        return View.render(account_area, this);

    }

}

export default AccountArea
