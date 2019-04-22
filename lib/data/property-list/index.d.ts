import { Fun, Component } from '@quenk/wml';
import { Record } from '@quenk/noni/lib/data/record';
import { WidgetAttrs, HTMLElementAttrs } from '../../';
import { Main } from './wml/property-list';
export declare const PROPERTY_LIST = "ww-property-list";
/**
 * Field describes a single field displayed in a PropertyList.
 */
export interface Field<D, R> {
    /**
     * heading to display for the field.
     */
    heading: string;
    /**
     * name of the property to retrieve from the data item.
     */
    name: string;
    /**
     * format if specified will be applied to the value
     * before display.
     */
    format?: (v: D) => string;
    /**
     * dataFragment can be specified to customise the rendering
     * of the data value.
     */
    dataFragment?: (value: D, key: string, data: R) => Fun;
}
/**
 * PropertyListAttrs
 */
export interface PropertyListAttrs<D, R> extends HTMLElementAttrs {
    /**
     * fields used to generate the data.
     */
    fields: Field<D, R>[];
    /**
     * data type  used to source properties from.
     */
    data: R;
}
/**
 * PropertyList generates a description list using the properties of
 * an object.
 */
export declare class PropertyList<D, R extends Record<D>> extends Component<WidgetAttrs<PropertyListAttrs<D, R>>> {
    view: Main<D, R>;
    values: {
        root: {
            className: string;
        };
        fields: Field<D, R>[];
        data: {
            value: R;
            get: (f: Field<D, R>) => import("@quenk/wml").Content[];
        };
    };
    /**
     * setData to be displayed.
     */
    setData(data: R): PropertyList<D, R>;
}
