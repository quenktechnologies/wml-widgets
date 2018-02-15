
/**
 * misc class names.
 */
export const misc = {
/**
 * NO_HOVER means no effects on hover. 
 */
    NO_HOVER: '-no-hover'

}

/** 
 * states commonly used by the widgets. 
 */
export const states = {

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
 * sizes 
 */
export const sizes = { 
 LARGE : '-large',
 SMALL : '-small',
 EXTRA_SMALL : '-extra-small'
}

/**
 * styles preset for contexual widgets.
 */
export const styles: { [key: string]: string } = {

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
 * typeClasses provides class names used for indicating support for
 * particular features by a widget's DOM available to other widets.
 */
export const typeClasses = {
    /**
     * PUSHABLE usually means the widget can be moved by some margin.
     */
    PUSHABLE: '-pushable',

    /**
     * FIXED_PUSHABLE is PUSHABLE for position:fixed widgets.
     */
    FIXED_PUSHABLE: '-fixed-pushable'

};
