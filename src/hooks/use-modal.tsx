import { ReactNode } from 'react';
import { useDispatch } from '../services/hooks';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { ILocationState, IReactRouterDomParams } from '../services/types';
import { setModalTitle, setModalContent, setModalCloseCallback, openModal as open } from '../services/actions';

export const useModal = (
    modalContent: ReactNode, 
    modalTitle: string | ReactNode | null = null
) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation<ILocationState>();
    const params = useParams<IReactRouterDomParams>();

    const onCloseModal = () => {
        const index = location.pathname.indexOf(params.id);
        const pathname = (
            index !== -1 
                ? location.pathname.substring(0, index - 1) 
                : location.pathname
        );
        history.replace({
            pathname: pathname,
            state: null
        });
    }

    const openModal = (id: string | null = null) => {
        if (id || location.state?.background) {
            dispatch(setModalTitle(modalTitle));
            dispatch(setModalContent(modalContent));
            dispatch(setModalCloseCallback(onCloseModal));
            dispatch(open());
            history.replace({
                pathname: id ? `${location.pathname}/${id}` : location.pathname,
                state: { background: location }
            });
        }
    }

    return openModal;
};