import { FC, useEffect, useState } from 'react';
import { ErrorMessage } from './ErrorMessage/ErrorMessage';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { SearchBar } from './SearchBar/SearchBar';
import { Button } from './UI/Button/Button.styled';
import { ConteinerSection } from './UI/ConteinerSection/ConteinerSection.styled';
import { Loader } from './UI/Loader/Loader';
import toast from 'react-hot-toast';
import { fetchImage, ResponsImage } from '../api';
import { NoImage } from './NoImage/NoImage';
import { Image } from './types';
import { BackToTop } from './UI/BackToTop/BackToTop';

type Query = string;
type Page = number;

enum STATUS_PAGE {
  ideal = 'IDEAL',
  load = 'LOAD',
  error = 'ERROR',
  noimage = 'NOIMAGE',
  loadMore = 'LOADMORE',
}

const PER_PAGE = 12;

export const App: FC = () => {
  const [query, setQuery] = useState<Query>('');
  const [page, setPage] = useState<Page>(1);
  const [imageList, setImageList] = useState<Image[]>([]);
  const [status, setStatus] = useState(STATUS_PAGE.ideal);

  const totalImage = imageList.length; // особенность даного API отображает только максимум 500 изображений в бесплатной версии для учёбы

  const nextPage = () => {
    totalImage <= 500 ? setPage(page + 1) : setStatus(STATUS_PAGE.ideal); // особеностью этого API максимальное число бесплатных катинок 500 в бесплатной версии для учёбы
  };

  const handlQuery = (q: Query): void => {
    setQuery(q);
    setPage(1);
    setImageList([]);
  };

  useEffect(() => {
    if (query === '') return;

    const searchQyery = async (q: Query, p: Page): Promise<void> => {
      setStatus(STATUS_PAGE.load);

      try {
        const data = await fetchImage({ query: q, page: p, per_page: PER_PAGE });

        if (data.total === 0) {
          setStatus(STATUS_PAGE.noimage);
          return;
        }

        setImageList(prev => [
          ...prev,
          ...data.hits.map(
            ({
              id,
              webformatURL,
              tags,
              largeImageURL,
            }: Pick<ResponsImage, 'id' | 'webformatURL' | 'tags' | 'largeImageURL'>) => ({
              id,
              src: webformatURL,
              alt: tags,
              srcModal: largeImageURL,
            })
          ),
        ]);

        const totalPage = Math.ceil(data.total / PER_PAGE);

        page < totalPage ? setStatus(STATUS_PAGE.loadMore) : setStatus(STATUS_PAGE.ideal);
      } catch {
        setStatus(STATUS_PAGE.error);
        toast.error('Oops, something went wrong.');
      }
    };

    searchQyery(query, page);
  }, [query, page]);

  return (
    <>
      <SearchBar onQuery={handlQuery} value={query} />
      <ConteinerSection>
        {imageList.length > 0 && <ImageGallery arrImage={imageList} />}
        {status === STATUS_PAGE.noimage && <NoImage />}
        {status === STATUS_PAGE.error && <ErrorMessage />}
        {status === STATUS_PAGE.loadMore && (
          <Button type="button" onClick={nextPage}>
            Load more
          </Button>
        )}
        {status === STATUS_PAGE.load && <Loader />}
      </ConteinerSection>
      <BackToTop />
    </>
  );
};
