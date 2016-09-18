import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

const ACTION_PREFIX = '[Menu]';
export const menuActionType = {
    OPEN_MENU: `${ACTION_PREFIX} Open Menu`,
    CLOSE_MENU: `${ACTION_PREFIX} Close Menu`,
    TOGGLE_MENU: `${ACTION_PREFIX} Toggle Menu`
};

@Injectable()
export class MenuAction {
    openMenu(): Action {
        return {
            type: menuActionType.OPEN_MENU,
        };
    }
    closeMenu(): Action {
        return {
            type: menuActionType.CLOSE_MENU,
        };
    }
    toggleMenu(): Action {
        return {
            type: menuActionType.TOGGLE_MENU,
        };
    }
}
