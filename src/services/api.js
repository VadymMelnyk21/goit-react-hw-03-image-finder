import axios from 'axios';

const key = '26782517-d7749598e3fd4393206db4041';
axios.defaults.baseURL = 'https://pixabay.com/api'

export async function fetchImage(search, page) {
    const { data } = await axios.get(`/`,
        {
            params: {
                key: key,
                q: search,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                page: page,
                per_page: 12,
            }
        });
    return data;
}