import React, { FC } from 'react';

export type TOrderDatetimeProps = {
    readonly serializedDatetime: string;
};

export const OrderDatetime: FC<TOrderDatetimeProps> = ({serializedDatetime}) => {
    const createdAt = new Date(serializedDatetime);
    const createdFromNow = Date.now() - createdAt.getTime();
    const daysFromNow = Math.round(createdFromNow / (1000 * 60 * 60 * 24));

    const whenСreated = (
        daysFromNow === 0 
            ? 'Сегодня'
            : daysFromNow === 1
            ? 'Вчера'
            : daysFromNow < 5
            ?  `${daysFromNow} дня назад` 
            : `${daysFromNow} дней назад`
    );

    const time = createdAt.toLocaleTimeString('ru-RU', {
        hour: 'numeric', 
        minute: 'numeric', 
        timeZoneName: 'short'
    });

    const datetime = `${whenСreated}, ${time}`;

    return (
        <p className="text text_type_main-default text_color_inactive">{datetime}</p>
    );
}