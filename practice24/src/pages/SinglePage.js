import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import useMarvelService from "../services/MarvelService";
import ErrorMessage from "../components/error/ErrorMessage";
import Spinner from "../components/spinner/Spinner";

const SinglePage = ({Component, dataType}) => {
    const {id} = useParams();

    const [data, setData] = useState({});
    const {loading, error, getComics, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        loadData(id);
    }, [id]);

    const loadData = (id) => {
        clearError();
        if (!id) {
            return;
        }
        switch (dataType) {
            case 'comic' :
                getComics(id).then(onDataLoaded);
                break;
            case 'character' :
                getCharacter(id).then(onDataLoaded)
        }
    }

    const onDataLoaded = (data) => {
        setData(data);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading && error && !data) ? <Component data={data}/> : null;

    return (
        <>{errorMessage || spinner || content}</>
    );
}

export default SinglePage;