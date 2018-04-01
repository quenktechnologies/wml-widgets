/**
 * ACTION_BAR class name. for the ActionBar root.
 */
export const ACTION_BAR = 'ww-action-bar';

/**
 * ACTION_BAR_CONTENT class name. 
 */
export const ACTION_BAR_CONTENT = 'ww-action-bar__content';

/**
 * ClassMap provides a map of class names constants.
 */
export interface ClassMap {

    [key: string]: string

}

/**
 * misc class names.
 */
export const misc: ClassMap = {
    /**
     * NO_HOVER means no effects on hover. 
     */
    NO_HOVER: '-no-hover'

}

/** 
 * states commonly used by the widgets. 
 */
export const states: ClassMap = {

    /**
     * ACTIVE usually means an element is active like a link.
     */
    ACTIVE: '-active',

    /**
     * HIDDEN means an element should not be visible but not removed
     * from the DOM.
     */
    HIDDEN: '-hidden',

    /**
     * DISABLED means an element should not be interactable.
     */
    DISABLED: '-disabled',

    /**
     * ON state.
     */
    ON: '-on',

    /**
     * OFF state.
     */
    OFF: '-off',

    /**
     * OPEN state.
     */
    OPEN: '-open'

}

/**
 * sizes used by widgets that ship with preset sizes.
 */
export const sizes: ClassMap = {
    EXTRA_SMALL: '-xs-small',
    SMALL: '-small',
    MEDIUM: '-medium',
    LARGE: '-large',
    EXTRA_LARGE: '-xs-large'
}

/**
 * styles preset for contexual widgets.
 */
export const styles: ClassMap = {

    /**
     * DEFAULT style.
     */
    DEFAULT: '-default',

    /**
     * PRIMARY style.
     */
    PRIMARY: '-primary',

    /**
     * SUCCESS style.
     */
    SUCCESS: '-success',

    /**
     * INFO style.
     */
    INFO: '-info',

    /**
     * WARNING style.
     */
    WARNING: '-warning',

    /**
     * DANGER style.
     */
    DANGER: '-danger'

}

/**
 * features provides class names used for indicating support for
 * particular features by a widget's DOM available to other widets.
 */
export const features: ClassMap = {
    /**
     * PUSHABLE usually means the widget can be moved by some margin.
     */
    PUSHABLE: '-pushable',

    /**
     * FIXED_PUSHABLE is PUSHABLE for position:fixed widgets.
     */
    FIXED_PUSHABLE: '-fixed-pushable',

    /**
     * BLOCK makes an element block scoped.
     */
    BLOCK: '-block',

    /**
     * OUTLINE indicates no background with only borders shown.
     */
    OUTLINE: '-outline',

    /**
     * LINK indicates an element should be styled like a link.
     */
    LINK: '-link',



};
/**
 * ICON_BUTTON clasess for IconButtons.
 */
export const ICON_BUTTON = 'ww-icon-button';


/**
 * @module control/feedback
 */

/**
 * SUCCESS
 */
export const SUCCESS = 'has-success';

/**
 * ERROR
 */
export const ERROR = 'has-error';

/**
 * WARNING
 */
export const WARNING = 'has-warning';
/**
 * TAB_BAR 
 */
export const TAB_BAR = 'ww-tab-bar';

/**
 * TAB_BAR_TAB
 */
export const TAB_BAR_TAB = 'ww-tab-bar__tab';


export const BUTTON = 'ww-button';

export const TAB_VIEW = 'ww-tabview';
