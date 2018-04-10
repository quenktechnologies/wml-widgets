import * as wml from '@quenk/wml';
import * as views from './wml/grid-layout';
import { Component } from '@quenk/wml';
import { WidgetAttrs, StylableAttrs } from '../../';
import { concat } from '../../util';

///classNames:begin
//@todo: refactor this to be inline with other class names
export const GRID_LAYOUT = 'container-fluid';
export const COLUMN = 'ww-column';
export const ROW = 'row';
///classNames:end

/**
 * GridLayoutAttrs
 */
export interface GridLayoutAttrs extends StylableAttrs { }

export interface ColumnAttrs extends StylableAttrs {

    size?: number

};

/**
 * GridLayout
 */
export class GridLayout extends Component<WidgetAttrs<GridLayoutAttrs>> {

    view: wml.View = new views.Grid(this);

    values = {

        class: {

            root: concat(GRID_LAYOUT, (this.attrs.ww && this.attrs.ww.class) ?
                this.attrs.ww.class : '')

        }

    }

}

export class Row extends Component<WidgetAttrs<StylableAttrs>> {

    view: wml.View = new views.Row(this);

    values = {

        class: {

            root: concat(ROW, (this.attrs.ww && this.attrs.ww.class) ?
                this.attrs.ww.class : '')

        }

    }

}

export class Column extends Component<WidgetAttrs<ColumnAttrs>> {

    view: wml.View = new views.Column(this);

    values = {

        class: {

            root: this.attrs.ww ? concat(this.attrs.ww.size ?
                `col-md-${this.attrs.ww.size}` : 'col-md-12',
                this.attrs.ww.class) : 'col-md-12'

        }

    }

}
