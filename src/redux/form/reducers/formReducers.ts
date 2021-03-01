import { FormAction } from '../actionCreators';
import { SET_FILTER_BY_CONTENT } from '../actionTypes';

interface InitialFormState {
    searchValue: string;
}

const initialState: InitialFormState = {
    searchValue: '',
};

export const formReducer = (
    state: InitialFormState = initialState,
    action: FormAction,
): InitialFormState => {
    switch (action.type) {
        case SET_FILTER_BY_CONTENT:
            return {
                ...state,
                searchValue: action.payload,
            };
        default:
            return state;
    }
};
