import * as wml from '@quenk/wml';
import * as views from './wml/overlay';
import { Overlay } from '../../../../../lib/content/overlay';

export class OverlayPage {
    view: wml.View = new views.Main(this);

    values = {
        onClick: () => {
            let mO = this.view.findById<Overlay>('overlay');

            if (mO.isJust()) mO.get().close();
        }
    };
}

export default new OverlayPage();
