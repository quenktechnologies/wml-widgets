import { Component, Attrs } from '@quenk/wml-runtime';
import * as Styles from 'wml-widgets-common/Styles';
import * as views from './wml/grid';

export interface GridAttrs extends Attrs {

    ww?: {

        class?: string

    }

}

export interface ColumnAttrs extends Attrs {

    ww?: {

        size?: 'string',
        width?: number,
        offset?: number,
        class?: string

    }

};

/**
 * Container
 */
export class Container extends Component<GridAttrs> {

    view = new views.Container(this);

}

export class Row extends Component<GridAttrs> {

    view = new views.Row(this);

}

export class Column extends Component<ColumnAttrs> {

    view = new views.Column(this);

    _getClass() {

        let classes = [Styles.GRID_COLUMN];
        let size = this.attributes.read('ww:size', 'md');
        let width = this.attributes.read('ww:width', 12);
        let offset = this.attributes.read('ww:offset', 0);

        classes.push(`col-${size}-${width}`);

        if (offset)
            classes.push(`col-${size}-offset-${offset}`);

        classes.push(this.attributes.read('ww:class'));

        return classes.filter(v => !(v == null)).join(' ');

    }

}
