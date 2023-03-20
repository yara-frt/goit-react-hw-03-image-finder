import React from 'react';
import css from './ImageGallery.module.css';

import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';



export function ImageGallery({images, showModal, modalUrl}) {
    return (
        <div>
            {images.length > 0 &&
                <ul className={css.ImageGallery}>
                    {images.map(({id, webformatURL, tags, largeImageURL}) => (
                        <ImageGalleryItem
                            key={id}
                            largeImageURL={largeImageURL}
                            webformatURL={webformatURL}
                            tags={tags}
                             showModal={showModal}
                            modalUrl={modalUrl}
                        />
                    ))}
            </ul>}
        </div>
            
    )

}


