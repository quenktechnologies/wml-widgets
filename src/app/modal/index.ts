import * as wml from '@quenk/wml';
import * as views from './wml/modal';
import * as names from '../../common/names';
import {concat} from '../../common/util';
import {Group} from '../../content/Group';

export interface ModalAttrs extends wml.Attrs {
    ww?: {
      class?: string,
        onClick?: (e: Event) => void
    }
}

export interface HeaderAttrs extends wml.Attrs {

    ww?: {

        onClose?: () => void
    }

}

export interface BodyAttrs extends wml.Attrs { }

export interface FooterAttrs extends wml.Attrs { }

/**
 * Modal
 */
export class Modal extends Group<ModalAttrs> {

    view = new views.Modal(this);

  values = {

    id: {

      root:'root',
      content: 'content'

    },
    class: {

      root: concat(names.MODAL, this.attrs.ww ? this.attrs.ww.class :''),
      content: names.MODAL_CONTENT,
      dialog: names.MODAL_DIALOG

    }

  };

    /**
     * close the modal.
     */
    close(): void {

      this
      .view
      .findById('modal')
      .map((n:Node)=> n.parentNode.removeChild(n));

    }

}

/**
 * Header
 */
export class Header extends wml.Component<HeaderAttrs> {

    view = new views.Header(this);

  values = {

  id: {

    root: 'root'

  },

    class: {

      root: names.MODAL_HEADER

    }

  };

}

/**
 * Body
 */
export class Body extends Group<BodyAttrs> {

    view = new views.Body(this);

  values = {

    id: {

      root: 'root'

    },
    class : {

      root: names.MODAL_BODY

    }

  };

}

/**
 * Footer
 */
export class Footer extends Group<FooterAttrs> {

    view = new views.Footer(this);

  values = {

    id : {

      root: 'root'

    },

    class: {

      root: names.MODAL_FOOTER

    }

  };

}
