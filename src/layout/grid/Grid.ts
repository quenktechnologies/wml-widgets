import * as names from '@package/self/common/names';
import * as views from './wml/grid';
import { Component, Attrs } from '@quenk/wml';
import { concat } from '@package/self/common/util';

export interface GridAttrs extends Attrs {

    ww?: {

        class?: string

    }

}

export interface ColAttrs extends Attrs {

    ww?: {

        size?: number,
        class?: string

    }

};

/**
 * Grid
 */
export class Grid extends Component<GridAttrs> {

    view = new views.Grid(this);

    values = {

        class: {

            root: names.GRID

        }

    }

}

export class Row extends Component<GridAttrs> {

    view = new views.Row(this);

    values = {

        class: {

            root: names.GRID_ROW

        }

    }

}

export class Column extends Component<ColAttrs> {

    view = new views.Column(this);

    values = {

        class: {

            root: this.attrs.ww ?  concat(this.attrs.ww.size ? 
              `col-md-${this.attrs.ww.size}` : 'col-md-12',
            this.attrs.ww.class) : 'col-md-12'

        }

    }

}
