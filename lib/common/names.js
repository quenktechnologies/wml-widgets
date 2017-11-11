"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * HIDDEN indicates an element should be hidden from sight.
 */
exports.HIDDEN = '-hidden';
/**
 * DISABLED indicates an element should appear to be inaccesible
 */
exports.DISABLED = '-disabled';
/**
 * ON indicates an 'on' state.
 */
exports.ON = '-on';
/**
 * OFF indicates an 'off' state.
 */
exports.OFF = '-off';
/**
 * open indicates an open state in collapsable widgets
 */
exports.OPEN = '-open';
/**
 * PUSHABLE is used by other styles to move an element around.
 */
exports.PUSHABLE = '-pushable';
/**
 * FIXED_PUSHABLE is like PUSHABLE but used for fixed elements.
 */
exports.FIXED_PUSHABLE = '-fixed-pushable';
/**
 * NO_HOVER indicates hover effects should be disabled.
 */
exports.NO_HOVER = '-no-hover';
/**
 * DEFAULT style modifier.
 */
exports.DEFAULT = '-default';
/**
 * PRIMARY style modifier.
 */
exports.PRIMARY = '-primary';
/**
 * SUCCESS style modifier.
 */
exports.SUCCESS = '-success';
/**
 * INFO style modifier.
 */
exports.INFO = '-info';
/**
 * WARNING style modifier.
 */
exports.WARNING = '-warning';
/**
 * DANGER style modifier.
 */
exports.DANGER = '-danger';
exports.LARGE = '-large';
exports.SMALL = '-small';
exports.EXTRA_SMALL = '-extra-small';
exports.ACTIVE = 'active'; //@todo: refactor to flag syntax
exports.DRAWER = 'ww-drawer-layout';
exports.ASIDE = 'ww-drawer';
exports.ASIDE_CONTENT = 'ww-drawer__content';
exports.ASIDE_PUSHABLE = '-drawer-pushable';
exports.ASIDE_PUSHABLE_FIXED = '-drawer-pushable-fixed';
/**
 * ACTION_BAR class name. for the ActionBar root.
 */
exports.ACTION_BAR = 'ww-action-bar';
/**
 * ACTION_BAR_CONTENT class name.
 */
exports.ACTION_BAR_CONTENT = 'ww-action-bar__content';
/**
 * ICON_BUTTON clasess for IconButtons.
 */
exports.ICON_BUTTON = 'ww-icon-button';
/**
 * BUTTON_MENU class name.
 */
exports.BUTTON_MENU = 'ww-button-menu btn-group';
/**
 * BUTTON_MENU_BUTTON class name.
 */
exports.BUTTON_MENU_BUTTON = exports.BUTTON_MENU + "__button";
/**
 * BUTTON_MENU_MENU class name.
 */
exports.BUTTON_MENU_MENU = exports.BUTTON_MENU_BUTTON + "__menu";
/**
 * BUTTON_SELECT
 */
exports.BUTTON_SELECT = 'btn-group';
exports.BUTTON_SELECT_OPTION = exports.BUTTON_SELECT + "__option btn";
exports.MAIN_VIEW = 'ww-main-view';
/**
 * MENU class name.
 */
exports.MENU = 'ww-menu';
/**
 * MENU_ITEM class name.
 */
exports.MENU_ITEM = exports.MENU + "__item";
/**
 * MENU_HEADER class name.
 */
exports.MENU_HEADER = exports.MENU + "__header";
/**
 * MENU_DIVIDER class name.
 */
exports.MENU_DIVIDER = exports.MENU + "__divider";
/**
 * DASH class name.
 */
exports.DASH = 'ww-dash';
/**
 * NAV class name.
 */
exports.NAV = 'ww-nav';
/**
 * NAV_LINK class name.
 */
exports.NAV_LINK = 'ww-nav-link';
/**
 * NAV_MENU class name.
 */
exports.NAV_MENU = 'ww-nav-menu';
/**
 * NAV_MENU_ITEM class name.
 */
exports.NAV_MENU_ITEM = 'ww-nav-menu__item';
/**
 * NAV_MENU_HEADER class name.
 */
exports.NAV_MENU_HEADER = 'ww-nav-menu__header';
/**
 * NAV_MENU_LINK class name.
 */
exports.NAV_MENU_LINK = 'ww-nav-menu__link';
/**
 * NAV_MENU_SUBMENU class name.
 */
exports.NAV_MENU_SUBMENU = 'ww-nav-menu__submenu';
exports.BUTTON = 'ww-button';
exports.BUTTON_GROUP = 'ww-button-group';
//@todo: refactor this to be inline with other class names
exports.GRID = 'container-fluid';
exports.GRID_COLUMN = 'ww-grid-column';
exports.GRID_ROW = 'row';
/**
 * PANEL wrapper class.
 */
exports.PANEL = 'ww-panel';
/**
 * PANEL_HEADER class name.
 */
exports.PANEL_HEADER = 'ww-panel__header';
/**
 * PANEL_BODY class name.
 */
exports.PANEL_BODY = 'ww-panel__body';
/**
 * PANEL_FOOTER class name.
 */
exports.PANEL_FOOTER = 'ww-panel__footer';
/**
 * HEADER class name.
 */
exports.HEADER = 'ww-header';
exports.MODAL = 'ww-modal';
exports.MODAL_DIALOG = 'ww-modal__dialog';
exports.MODAL_CONTENT = 'ww-modal__content';
exports.MODAL_HEADER = 'ww-modal__header';
exports.MODAL_BODY = 'ww-modal__body';
exports.MODAL_FOOTER = 'ww-moadl__footer';
exports.FORM_GROUP = 'form-group';
exports.CONTROL_LABEL = 'control-label';
exports.INPUT = 'form-control';
exports.TEXTAREA = 'form-control';
exports.SELECT = 'form-control';
/**
 * TABS class name.
 */
exports.TABS = 'ww-tabs';
/**
 * TABS_TAB class name.
 */
exports.TABS_TAB = 'ww-tabs__tab';
/**
 * SWITCH class name.
 */
exports.SWITCH = 'ww-switch';
/**
 * SWITCH_SLIDER class name.
 */
exports.SWITCH_SLIDER = 'ww-switch__slider';
/**
 * CHECKBOX class name.
 */
exports.CHECKBOX = 'checkbox';
exports.TABLE = 'table'; //@todo un-bootstrap
/**
 * BREAD_CRUMBS clasess
 */
exports.BREAD_CRUMBS = 'breadcrumb'; //@todo un-bootstrap
/**
 * BREAD_CRUMBS_ITEM class name.
 */
exports.BREAD_CRUMBS_ITEM = exports.BREAD_CRUMBS + "__item";
exports.LIST = 'ww-list';
exports.LIST_ITEM = 'ww-list__item';
/**
 * SEARCH class name.
 */
exports.SEARCH = 'ww-search';
/**
 * SEARCH_INPUT class name.
 */
exports.SEARCH_INPUT = 'ww-search__input';
/**
 * DATE class name.
 */
exports.DATE = 'ww-date';
/**
 * DATE_DAY class name.
 */
exports.DATE_DAY = exports.DATE + "__day";
/**
 * DATE_MONTH class name.
 */
exports.DATE_MONTH = exports.DATE + "_month";
/**
 * DATE_YEAR class name.
 */
exports.DATE_YEAR = exports.DATE + "__year";
/**
 * STACK class name.
 */
exports.STACK = 'ww-stack';
/**
 * STACK_CLOSE class name.
 */
exports.STACK_CLOSE = exports.STACK + "__close";
/**
 * STACK_MEMBER class name.
 */
exports.STACK_MEMBER = exports.STACK + "__member";
/**
 * SEARCH_STACK class name.
 */
exports.SEARCH_STACK = 'ww-search-stack';
/**
 * LIST_GROUP class name.
 */
exports.LIST_GROUP = 'list-group';
/**
 * LIST_GROUP_ITEM class name.
 */
exports.LIST_GROUP_ITEM = 'list-group-item';
//# sourceMappingURL=names.js.map