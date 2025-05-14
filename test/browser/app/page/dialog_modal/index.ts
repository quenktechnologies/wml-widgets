import * as wml from '@quenk/wml';
import * as views from './wml/modal';
import { Modal } from '../../../../../lib/dialog/modal';

export class ModalPage {
    view: wml.View = new views.Main(this);

    v: wml.View = new views.Open(this);

    values = {
        open: () => {
            document.body.appendChild(<Node>this.v.render());
        },

        close: () => {
            this.v.findById<Modal>('open').map(m => m.close());
        }
    };
}

export default new ModalPage();
