import { FC } from 'react';
import { NoImageTitle } from './NoImage.styled';

export const NoImage: FC = () => {
  return (
    <NoImageTitle>
      Nothing found for your request, please try searching for something else.
    </NoImageTitle>
  );
};
