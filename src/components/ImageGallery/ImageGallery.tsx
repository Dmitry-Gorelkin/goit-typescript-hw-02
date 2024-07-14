import { ImageCard } from '../ImageCard/ImageCard';
import { ImageGalleryList } from './ImageGallery.styled';
import { FC, useState } from 'react';
import { ModalImage } from '../UI/ModalImage/ModalImage';
import { Image } from '../types';

type ImageGalleryProps = {
  arrImage: Image[];
};

type ImgModal = {
  src: string;
  alt: string;
  status: boolean;
};

const initialModal: ImgModal = { src: '', alt: '', status: false };

export const ImageGallery: FC<ImageGalleryProps> = ({ arrImage }) => {
  const [imgModal, setImgModal] = useState<ImgModal>(initialModal);

  const openModal = ({ src, alt, status }: ImgModal): void => {
    setImgModal({ src, alt, status });
  };

  const closeModal = (): void => {
    setImgModal(initialModal);
  };

  return (
    <>
      <ImageGalleryList>
        {arrImage.map(({ id, src, alt, srcModal }) => (
          <ImageCard
            key={id}
            src={src}
            openModal={() => openModal({ src: srcModal, alt: alt, status: true })}
            alt={alt}
          />
        ))}
      </ImageGalleryList>
      <ModalImage
        src={imgModal.src}
        alt={imgModal.alt}
        isOpen={imgModal.status}
        closeModal={closeModal}
      />
    </>
  );
};
