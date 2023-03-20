import React from 'react';
import css from './ImageGalleryItem.module.css'


const ImageGalleryItem = ( {webformatURL, tags, largeImageURL, modalUrl, showModal}) => {
    return (
        <li
            className={css.ImageGalleryItem}
            onClick={() => modalUrl(largeImageURL)}
        >
            <img
                className={css.ImageGalleryItemImage}
                src={webformatURL}
                alt={tags} width='200'
                onClick={showModal}
            />
        </li>
    )
}


export default ImageGalleryItem;