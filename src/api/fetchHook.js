import { useState, useEffect } from 'react'
export const useFetch = (GOOGLE_API, BASE_URL, folderID, name) => {

    const [data, setRes] = useState([]);
    const get = async (endpoint = '') => {
        try {
            let response = await fetch(`${BASE_URL}${endpoint}/`, {
                method: 'POST',
            })
            const res = await response.json()
            return res.files
        } catch (error) {
            alert(error);
        }
    }
    const fetchData = async () => {
        const response = await get(name + '/');

        var requestOptions = {
            method: 'GET',
            headers: {},
            redirect: 'follow',
        };
        const responseThumb = await fetch(
            `https://www.googleapis.com/drive/v3/files?q=%27${folderID}%27+in+parents&fields=files(id,name,thumbnailLink)&key=${GOOGLE_API}`,
            requestOptions,
        );

        if (responseThumb) {
            const res = await responseThumb.json();
            _regex(response, res);
        }
    };

    const _regex = (response, res) => {

        let newList = response;
        let newthumbnais = res.files;
        const regexExp = /.mp4|.jpg|=s220/gi;

        for (let i = 0; i < newList.length; i++) {
            newList[i].name = newList[i].name.replace(regexExp, '')
        }
        for (let i = 0; i < newthumbnais.length; i++) {
            newthumbnais[i].name = newthumbnais[i].name.replace(regexExp, '')
        }
        _matchThumbsToCategory(newList, newthumbnais)
    }
    const _matchThumbsToCategory = (list, thumbnails) => {
        for (let i = 0; i < list.length; i++) {
            let obj = thumbnails.find(e => e.name === list[i].name);
            if (obj) {
                list[i].link = obj.thumbnailLink.replace('=s220', '=s720')
                list[i].type = 'NORMAL'
            }
            else {
                list[i].link = 'https://image.shutterstock.com/image-photo/grunge-black-background-texture-space-260nw-373662322.jpg'
                list[i].type = 'NORMAL'
            }
        };
        setRes(list);
    };

    useEffect(() => {
        fetchData();
    }, [folderID]);

    return { data }
}

