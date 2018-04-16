import * as views from './wml/grid-layout';
import { View } from '@quenk/wml';
import { concat } from '../../util';
import { LAYOUT, LayoutAttrs, GenericLayout } from '../';

///classNames:begin
//@todo: refactor this to be inline with other class names
export const GRID_LAYOUT = 'ww-grid-layout';
export const GRID_LAYOUT_ROW = 'ww-grid-layout-row';
export const GRID_LAYOUT_COLUMN = 'ww-grid-layout-column';
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

  /**
   * span indicates the length of the row a Column should span.
   */
    span?: number

  /**
   * offset the column location in the row by the provided number
   * of columns (max 12).
   */
  offset?: number

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

            class: concat(GRID_LAYOUT_ROW, (this.attrs.ww && this.attrs.ww.class) ?
                this.attrs.ww.class : '')

        }

    }

}

export class Column extends GenericLayout<ColumnAttrs> {

    view: View = new views.Column(this);

    values = {

        content: {

            id: 'column',

            class: this.attrs.ww ?
          concat(GRID_LAYOUT_COLUMN, 
            this.attrs.ww.span ? `-span${this.attrs.ww.span}` : '-span12',
            this.attrs.ww.offset ? `-offset${this.attrs.ww.offset}` : '',
                this.attrs.ww.class) : concat(GRID_LAYOUT_COLUMN, '-span12')

        }

    }

}
