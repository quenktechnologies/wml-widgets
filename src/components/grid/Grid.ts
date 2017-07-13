import { AbstractWidget } from '@quenk/wml/lib/runtime';
import * as Styles from 'wml-widgets-common/Styles';
import * as views from './wml/grid';

/**
 * Container
 */
export class Container extends AbstractWidget {

    view = new views.Container(this);

}

export class Row extends AbstractWidget {

    view = new views.Row(this);

}

export class Column extends AbstractWidget {

    view = new views.Column(this);

    _getClass() {

        let classes = [Styles.GRID_COLUMN];
        let size = this.attributes.read('ww:size', 'md');
        let width = this.attributes.read('ww:width', 12);
        let offset = this.attributes.read('ww:offset', 0);

        classes.push(`col-${size}-${width}`);

        if (offset)
            classes.push(`col-${size}-offset-${offset}`);

        classes.push(this.attributes.read(Styles.CSS_CLASS));

        return classes.filter(v => !(v == null)).join(' ');

    }

}
