export const FETCH_REQUEST = 'FETCH_REQUEST';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAILED = 'FETCH_FAILED';

export const request = (url, options = null) => dispatch => {
    dispatch({
        type: FETCH_REQUEST,
        url: url
    });
    fetch(url, options).then(
        res => res.json()
    ).then(data => {
        if (data.success) {
            dispatch({
                type: FETCH_SUCCESS, 
                data: data.data ? data.data : data,
                url: url
            });
        } else {
            dispatch({
                type: FETCH_FAILED, 
                error: data.error || 'Неизвестная ошибка'
            });
        }
    }).catch(error => {
        dispatch({
            type: FETCH_FAILED, 
            error: error.message || 'Неизвестная ошибка',
            url: url
        });
    });
}