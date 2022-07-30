import classNames from 'classnames';
import React, { FC } from 'react';
import styles from './rounded-image.module.css';

export type TRoundedImageProps = {
    readonly src: string;
    readonly alt: string;
    readonly classes?: {
        readonly root?: string;
        readonly image?: string;
    };
};

export const RoundedImage: FC<TRoundedImageProps> = ({src, alt, classes}) => (
    <div className={classNames(styles.root, classes?.root)}>
        <img className={classNames(styles.image, classes?.image)} src={src} alt={alt} />
    </div>
);