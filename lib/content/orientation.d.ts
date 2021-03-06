import { WidgetAttrs } from '../';
/**
 * VERTICAL indicates an element is vertical rendererd.
 */
export declare const VERTICAL = "-vertical";
/**
 * PUSHABLE indicates an element supports being pushed
 * and can have styles added to it around the concept.
 */
export declare const PUSHABLE = "-pushable";
/**
 * POSITIONED indicates an element is positioned and responds
 * to the left,right etc. properties.
 */
export declare const POSITIONED = "-positioned";
/**
 * BLOCK indicates an element should be block displayed.
 */
export declare const BLOCK = "-block";
/**
 * CLEARFIX hack.
 */
export declare const CLEARFIX = "-clearfix";
/**
 * JUSTIFIED content.
 */
export declare const JUSTIFIED = "-justified";
/**
 * LEFT indicates content floated or positioned to the left.
 */
export declare const LEFT = "-left";
/**
 * RIGHT indicates content floated or positioned to the right.
 */
export declare const RIGHT = "-right";
/**
 * HORIZONTAL indicates a horizontal alignment.
 */
export declare const HORIZONTAL = "-horizontal";
export declare const MIDDLE = "-middle";
export declare const BOTTOM = "-bottom";
/**
 * getBlockClassName provides the __BLOCK__ class name if the attribute
 * value is set to true.
 */
export declare const getBlockClassName: (attrs: WidgetAttrs<{
    block?: boolean;
}>) => "-block" | "";
