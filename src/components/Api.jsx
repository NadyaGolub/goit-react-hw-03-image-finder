const BASE_URL = 'https://pixabay.com/api/';
const KEY = '32971749-6f722df3241990952229e902a';
export const api = (searchText) => {
  return fetch(
    `${BASE_URL}?q=${searchText}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
};
