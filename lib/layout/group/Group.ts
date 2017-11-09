import * as wml from '@quenk/wml';
import * as views from './wml/group';

/**
 * GroupAttrs
 */
export interface GroupAttrs extends wml.Attrs {

    ww?: {

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
export abstract class Group extends wml.Component<GroupAttrs> {

    view = new views.Main(this);

    /**
     * content is dynamic content that can be changed 
     * after the Widget has been rendered. It's up
     * to the respective template to utilize this property or ignore it.
     */
    content: wml.Content;

    values = {

        root: {

            id: 'div',

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




