import * as wml from '@quenk/wml';
import * as views from './wml/group';
import { concat } from '@package/wml-widgets/common/util';

/**
 * GroupAttrs
 */
export interface GroupAttrs extends wml.Attrs {

    ww?: {

        /**
         * class name to apply to the rendered DOM.
         */
        class?: string,

        /**
         * content allows the content of a Group to passed
         * via attributes.
         */
        content?: wml.Renderable

    }

}

/**
 * Group is a generic container for child content.
 */
export class Group extends wml.Component<GroupAttrs> {

    view: wml.View = new views.Main(this);

    /**
     * content is dynamic content that can be changed 
     * after the Widget has been rendered. It's up
     * to the respective template to utilize this property or ignore it.
     */
    content: wml.Content;

    values = {

        root: {

          id: 'group',

            class: concat(this.attrs.ww && this.attrs.ww.class) ? this.attrs.ww.class : '',

            content: (this.attrs.ww && this.attrs.ww.content) ? this.attrs.ww.content : this.children

        }

    };

    /**
     * setContent changes the content displayed.
     */
    setContent(content: wml.Content): Group {

        this
            .view
            .findById(this.values.root.id)
            .map((e: HTMLElement) => {

                while (e.lastChild)
                    e.removeChild(e.lastChild);

                e.appendChild(content);

            });

        return this;

    }

}




