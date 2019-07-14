import { WidgetAttrs } from '../';

///classNames:begin
/**
 * VERTICAL indicates an element is vertical rendererd.
 */
export const VERTICAL = '-vertical';

/**
 * PUSHABLE indicates an element supports being pushed 
 * and can have styles added to it around the concept.
 */
export const PUSHABLE = '-pushable';

/**
 * POSITIONED indicates an element is positioned and responds
 * to the left,right etc. properties.
 */
export const POSITIONED = '-positioned';

/**
 * BLOCK indicates an element should be block displayed.
 */
export const BLOCK = '-block';

/**
 * CLEARFIX hack.
 */
export const CLEARFIX = '-clearfix';

/**
 * JUSTIFIED content.
 */
export const JUSTIFIED = '-justified';

/**
 * LEFT indicates content floated or positioned to the left.
 */
export const LEFT = '-left';

/**
 * RIGHT indicates content floated or positioned to the right.
 */
export const RIGHT = '-right';

/**
 * HORIZONTAL indicates a horizontal alignment.
 */
export const HORIZONTAL = '-horizontal';

export const MIDDLE = '-middle';

export const BOTTOM = '-bottom';
///classNames:end

/**
 * getBlockClassName provides the __BLOCK__ class name if the attribute
 * value is set to true.
 */
export const getBlockClassName = (attrs: WidgetAttrs<{ block?: boolean }>) =>
    (attrs.ww && (attrs.ww.block === true)) ? BLOCK : '';
