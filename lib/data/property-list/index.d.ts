import { View, Component } from '@quenk/wml';
import { Record } from '@quenk/noni/lib/data/record';
import { HTMLElementAttrs } from '../../';
export declare const PROPERTY_LIST = "ww-property-list";
/**
 * DataContext
 */
export interface DataContext<D, R extends Record<D>> {
    /**
     * name of the field.
     */
    name: string;
    /**
     * data item being displyed.
     */
    data: D;
    /**
     * format turns the data into a string.
     */
    format: (v: D) => string;
    /**
     * value is the value of all the data fields.
     */
    value: R;
}
/**
 * Field describes a single field displayed in a PropertyList.
 */
export interface Field<D, R extends Record<D>> {
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
    dataFragment?: (c: DataContext<D, R>) => View;
}
/**
 * PropertyListAttrs
 */
export interface PropertyListAttrs<D, R extends Record<D>> extends HTMLElementAttrs {
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
 * DataCtx
 */
export declare class DataCtx<D, R extends Record<D>> implements DataContext<D, R> {
    data: D;
    name: string;
    value: R;
    format: (d: D) => string;
    constructor(data: D, name: string, value: R, format: (d: D) => string);
}
/**
 * PropertyList generates a description list using the properties of
 * an object.
 */
export declare class PropertyList<D, R extends Record<D>> extends Component<PropertyListAttrs<D, R>> {
    view: View;
    values: {
        root: {
            className: string;
        };
        fields: Field<D, R>[];
        data: {
            value: R;
            get: (f: Field<D, R>) => import("@quenk/wml").Content;
        };
    };
    /**
     * setData to be displayed.
     */
    setData(data: R): PropertyList<D, R>;
}
