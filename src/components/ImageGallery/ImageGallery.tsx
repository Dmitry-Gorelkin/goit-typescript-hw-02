import { ImageCard } from '../ImageCard/ImageCard';
import { ImageGalleryList } from './ImageGallery.styled';
import { FC, useState } from 'react';
import { ModalImage } from '../UI/ModalImage/ModalImage';

type Image = {
  id: string;
  webformatURL: string;
  tags: string;
  largeImageURL: string;
};

type ImageGalleryProps = {
  arrImage: Image[];
};

type ImgModal = {
  src: string;
  alt: string;
};

export const ImageGallery: FC<ImageGalleryProps> = ({ arrImage }) => {
  const [statusModal, setStatusModal] = useState<boolean>(false);
  const [imgModal, setImgModal] = useState<ImgModal>({ src: '', alt: '' });

  const openModal = ({ src, alt }: ImgModal): void => {
    setStatusModal(true);
    setImgModal({ src, alt });
  };

  const closeModal = (): void => {
    setStatusModal(false);
  };
  return (
    <>
      <ImageGalleryList>
        {arrImage.map(({ id, webformatURL, tags, largeImageURL }) => (
          <ImageCard
            key={id}
            src={webformatURL}
            openModal={() => openModal({ src: largeImageURL, alt: tags })}
            alt={tags}
          />
        ))}
      </ImageGalleryList>
      <ModalImage
        src={imgModal.src}
        alt={imgModal.alt}
        isOpen={statusModal}
        closeModal={closeModal}
      />
    </>
  );
};
