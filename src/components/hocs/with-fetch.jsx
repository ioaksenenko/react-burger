import React, { useEffect, useState } from 'react';
import FadeLoader from "react-spinners/FadeLoader";

const withFetch = url => WrappedComponent => props => {
    const [ingredients, setIngredients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setLoading(false);
                if (data.success) {
                    setIngredients(data.data);
                } else {
                    setHasError(true);
                }
            })
            .catch(e => {
                setLoading(false);
                setHasError(true);
                console.log(e.message);
            });
        }, []);

    return (
        loading ? (
            <FadeLoader color="#F2F2F3" loading={loading} />
        ) : hasError ? (
            <p className="text text_type_main-large mt-5 text-center">Во время загрузки данных произошла ошибка. Попробуйте обновить страницу позже.</p>
        ) : (
            <WrappedComponent ingredients={ingredients} {...props} />
        )
    )
};

export default withFetch;
