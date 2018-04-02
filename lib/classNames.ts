export const MODAL = 'ww-modal';
export const MODAL_DIALOG = 'ww-modal__dialog';
export const MODAL_CONTENT = 'ww-modal__content';
export const MODAL_HEADER = 'ww-modal__header';
export const MODAL_BODY = 'ww-modal__body';
export const MODAL_FOOTER = 'ww-modal__footer';

/**
 * ACTION_BAR class name. for the ActionBar root.
 */
export const ACTION_BAR = 'ww-action-bar';

/**
 * ACTION_BAR_CONTENT class name. 
 */
export const ACTION_BAR_CONTENT = 'ww-action-bar__content';
/**
 * DASH
 */
export const DASH = 'ww-dash';


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
 * TAB_BAR 
 */
export const TAB_BAR = 'ww-tab-bar';

/**
 * TAB_BAR_TAB
 */
export const TAB_BAR_TAB = 'ww-tab-bar__tab';


export const BUTTON = 'ww-button';

export const TABLE = 'table'; //@todo un-bootstrap
/**
 * MAIN_VIEW classnames.
 */
export const MAIN_LAYOUT = 'ww-main-layout';

export const DRAWER = 'ww-drawer';
export const DRAWER_CONTENT = 'ww-drawer__content';
/**
 * HEADER class name.
 */
export const HEADER = 'ww-header';


/**
 * DRAWER_LAYOUT
 */
export const DRAWER_LAYOUT = 'ww-drawer-layout';

/**
 * HORIZONTAL_LAYOUT
 */
export const HORIZONTAL_LAYOUT = 'ww-horizontal-layout';
/**
 * PANEL wrapper class.
 */
export const PANEL = 'ww-panel';

/**
 * PANEL_HEADER class name.
 */
export const PANEL_HEADER = 'ww-panel__header';

/**
 * PANEL_BODY class name.
 */
export const PANEL_BODY = 'ww-panel__body';

/**
 * PANEL_FOOTER class name.
 */
export const PANEL_FOOTER = 'ww-panel__footer';


export const TAB_VIEW = 'ww-tabview';

/**
 * VERTICAL indicates an element is vertical rendererd.
 */
export const VERTICAL = '-vertical';

/**
 * RIGHT_PUSHABLE indicates an element can supports being pushed right
 * by specifying styles around this class.
 */
export const RIGHT_PUSHABLE = '-right-pushable';

/**
 * POSITIONED indicates an element is positioned ie remove
 * from flow.
 */
export const POSITIONED = '-positioned';
/**
 * HIDDEN means an element should not be visible but not removed
 * from the DOM.
 */
export const HIDDEN =  '-hidden';

/**
 * OPEN state.
 */
export const OPEN = '-open';

/**
 * ACTIVE
 */
export const ACTIVE = '-active';
/**
 * DEFAULT style.
 */
export const DEFAULT = '-default';

/**
 * PRIMARY style.
 */
export const PRIMARY = '-primary';

/**
 * SUCCESS style.
 */
export const SUCCESS = '-success';

/**
 * INFO style.
 */
export const INFO = '-info';

/**
 * WARNING style.
 */
export const WARNING = '-warning';

/**
 * ERROR style.
 */
export const ERROR = '-error';

/**
 * LINK
 */
export const LINK = 'ww-link';

/**
 * NAV
 */
export const NAV = 'ww-nav';

/**
 * NAV_HEADER
 */
export const NAV_HEADER = 'ww-nav-header';

/**
 * ITEM
 */
export const ITEM = 'ww-item';
