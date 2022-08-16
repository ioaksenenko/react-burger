import React, { useEffect, useState, FC } from 'react';
import styles from './ingredient.module.css';
import classNames from 'classnames';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useSelector, useDispatch } from '../../services/hooks';
import { useDrag } from "react-dnd";
import { openModal, setModalTitle, setModalContent, setModalCloseCallback } from '../../services/actions/modal';
import { setIngredientIsDrag, setIngredient } from '../../services/actions';
import { useHistory, useLocation } from 'react-router-dom';
import { TIngredient } from '../../services/types';

interface IIngredientProps {
    readonly ingredient: TIngredient;
}

const Ingredient : FC<IIngredientProps> = ({ ingredient }) => {
    const [count, setCount] = useState(0);
    const cart = useSelector(store => store.con.cart);
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const [{ isDrag }, dragRef] = useDrag({
        type: ingredient.type === 'bun' ? 'bun' : 'filling',
        item: ingredient,
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    useEffect(
        () => {
            dispatch(setIngredientIsDrag(isDrag));
        },
        [dispatch, isDrag]
    );

    const onCloseModal = () => {
        history.replace({
            pathname: '/',
            state: null
        });
    }

    const handleIngredientClick = () => {
        dispatch(setIngredient(ingredient));
        dispatch(setModalTitle('Детали ингредиента'));
        dispatch(setModalContent(<IngredientDetails />));
        dispatch(setModalCloseCallback(onCloseModal));
        dispatch(openModal());
        history.replace({
            pathname: `/ingredients/${ingredient._id}`,
            state: { background: location }
        });
    }

    useEffect(
        () => {
            const ingredients = cart.filter(cartIngredient => cartIngredient._id === ingredient._id);
            setCount(ingredients.length * (ingredient.type === 'bun' ? 2 : 1));
        },
        [cart, ingredient._id, ingredient.type]
    );

    return (
        <>
            <div ref={dragRef} className={classNames(styles.root, isDrag && styles.dragging)} onClick={handleIngredientClick} data-testid="ingredient">
                <img src={ingredient.image} alt={ingredient.name} />
                <div className={styles.priceBox}>
                    <p className={classNames("text text_type_digits-default", styles.price)}>{ingredient.price}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <p className={classNames("text text_type_main-default", styles.name)} data-testid="ingredient-name">{ingredient.name}</p>
                {count !== 0 && <Counter count={count} size="default" />}
            </div>
        </>
    );
};

export default Ingredient;