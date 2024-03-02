import {useHttp} from "../hooks/http.hook";

const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp()

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=b25538f8b037222e67f8e9d911e130ff';
    const _baseOffset = 210;

    const getAllCharacters = async (offset = _baseOffset, name = '') => {
        const charNameParam = name ? `&name=${name}` : '';
        const offsetParam = name ? `&offset=0` : `&offset=${offset}`;
        const res = await request(`${_apiBase}characters?limit=9${offsetParam}${charNameParam}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    const getComics = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    }

    const getCharacterComics = async (charId) => {
        const res = await request(`${_apiBase}characters/${charId}/comics?${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    const _transformCharacter = (character) => {
        return {
            id: character.id,
            name: character.name,
            description: character.description,
            thumbnail: character.thumbnail.path + '.' + character.thumbnail.extension,
            homepage: character.urls[0].url,
            wiki: character.urls[1].url,
            comics: character.comics.items
        };
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description,
            pageCount: comics.pageCount,
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            language: comics.textObjects[0]?.language || 'en-us',
            price: comics.prices[0].price
        };
    }

    return {loading, error, getAllCharacters, getCharacter, clearError, getAllComics, getComics, getCharacterComics};
}

export default useMarvelService;