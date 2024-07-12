import { FC } from 'react';
import { ImageCardItem, ImageCardImg } from './ImageCard.styled';

type ImageCardProps = {
  src: string;
  alt: string;
  openModal: () => void;
};

export const ImageCard: FC<ImageCardProps> = ({ src, alt, openModal }) => {
  return (
    <ImageCardItem onClick={openModal}>
      <ImageCardImg src={src} alt={alt} />
    </ImageCardItem>
  );
};
