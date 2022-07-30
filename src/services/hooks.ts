import {
    EqualityFn,
    useSelector as useSelectorHook,
    useDispatch as useDispatchHook
} from 'react-redux';

import { 
    TRootState, 
    TResponseDataDefault, 
    TResponseErrorDefault,
    TAppDispatch
} from './types';

interface TypedUseSelectorHook {
    <TSelected = null, TResponseData = TResponseDataDefault, TResponseError = TResponseErrorDefault>(
        selector: (
            state: TRootState<TResponseData, TResponseError>
        ) => TSelected, equalityFn?: EqualityFn<TSelected>
    ): TSelected;
}

export const useSelector: TypedUseSelectorHook = useSelectorHook;

export const useDispatch = () => useDispatchHook<TAppDispatch>();
