import * as wml from '@quenk/wml';
import * as names from '../../common/names';
import * as views from './wml/grid';
import { Component, Attrs } from '@quenk/wml';
import { concat } from '../../common/util';

export interface GridAttrs extends Attrs {

    ww?: {

        class?: string

    }

}

export interface ColumnAttrs extends Attrs {

    ww?: {

        size?: number,
        class?: string

    }

};

/**
 * Grid
 */
export class Grid extends Component<GridAttrs> {

  view: wml.View = new views.Grid(this);

    values = {

        class: {

            root: concat(names.GRID, (this.attrs.ww && this.attrs.ww.class) ?
                this.attrs.ww.class : '')

        }

    }

}

export class Row extends Component<GridAttrs> {

  view : wml.View = new views.Row(this);

    values = {

        class: {

            root: concat(names.GRID_ROW, (this.attrs.ww && this.attrs.ww.class) ?
                this.attrs.ww.class : '')

        }

    }

}

export class Column extends Component<ColumnAttrs> {

  view : wml.View = new views.Column(this);

    values = {

        class: {

            root: this.attrs.ww ? concat(this.attrs.ww.size ?
                `col-md-${this.attrs.ww.size}` : 'col-md-12',
                this.attrs.ww.class) : 'col-md-12'

        }

    }

}
