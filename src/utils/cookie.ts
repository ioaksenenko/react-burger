interface IGetCookie {
    (name: string): string | undefined;
};

export const getCookie: IGetCookie = (name) => {
    const matches = document.cookie.match(
        new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[]\/+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

interface ISetCookie {
    (
        name: string, 
        value: string | null, 
        props?: { 
            [key: string]: any 
        }
    ): void;
};

export const setCookie: ISetCookie = (name, value, props) => {
    props = props || {};
    let exp = props.expires;
    if (typeof exp == 'number' && exp) {
        const d = new Date();
        d.setTime(d.getTime() + exp * 1000);
        exp = props.expires = d;
    }
    if (exp && exp.toUTCString) {
        props.expires = exp.toUTCString();
    }
    if (value) {
        value = encodeURIComponent(value);
    }
    let updatedCookie = name + '=' + value;
    for (const propName in props) {
        updatedCookie += '; ' + propName;
        const propValue = props[propName];
        if (propValue !== true) {
            updatedCookie += '=' + propValue;
        }
    }
    document.cookie = updatedCookie;
}

interface IDeleteCookie {
    (name: string): void;
};

export const deleteCookie: IDeleteCookie = (name) => {
    setCookie(name, null, { expires: -1 });
}