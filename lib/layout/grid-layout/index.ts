import * as views from './wml/grid-layout';
import { View } from '@quenk/wml';
import { concat } from '../../util';
import { LAYOUT, LayoutAttrs, GenericLayout } from '../';

///classNames:begin
//@todo: refactor this to be inline with other class names
export const GRID_LAYOUT = 'container-fluid';
export const COLUMN = 'ww-column';
export const ROW = 'row';
///classNames:end

/**
 * GridLayoutAttrs
 */
export interface GridLayoutAttrs extends LayoutAttrs { }

/**
 * RowAttrs
 */
export interface RowAttrs extends LayoutAttrs { }

/**
 * ColumnAttrs
 */
export interface ColumnAttrs extends LayoutAttrs {

    size?: number

};

/**
 * GridLayout
 */
export class GridLayout extends GenericLayout<GridLayoutAttrs> {

    view: View = new views.Grid(this);

    values = {

        content: {

            id: 'root',

            class: concat(GRID_LAYOUT, LAYOUT, (this.attrs.ww && this.attrs.ww.class) ?
                this.attrs.ww.class : '')
        }

    }

}

export class Row extends GenericLayout<RowAttrs> {

    view: View = new views.Row(this);

    values = {

        content: {

            id: 'row',

            class: concat(ROW, (this.attrs.ww && this.attrs.ww.class) ?
                this.attrs.ww.class : '')

        }

    }

}

export class Column extends GenericLayout<ColumnAttrs> {

    view: View = new views.Column(this);

    values = {

        content: {

            id: 'column',

            class: this.attrs.ww ? concat(this.attrs.ww.size ?
                `col-md-${this.attrs.ww.size}` : 'col-md-12',
                this.attrs.ww.class) : 'col-md-12'

        }

    }

}
