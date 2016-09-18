// import { MENU_REDUCERS } from './services/auth';
import { ActionReducer, Action } from '@ngrx/store';
import { menuActionType } from './menu.action';

export interface MenuState {
  isOpen: Boolean;
}

let initalState: MenuState = {
  isOpen: false
};


export const menuReducer: ActionReducer<any> = (state: any = initalState, action: Action) => {
    switch (action.type) {
        case menuActionType.OPEN_MENU:
            return Object.assign({}, state, {
                isOpen: true
            });
        case menuActionType.CLOSE_MENU:
            return Object.assign({}, state, {
                isOpen: false
            });
        case menuActionType.TOGGLE_MENU:
            return Object.assign({}, state, {
                isOpen: !state.isOpen
            });
        default:
            return state;
    }
};