import { useState, useEffect } from 'react'
import { GOOGLE_API } from 'react-native-dotenv';

export const useFetch = (folderID) => {

    const [data, setRes] = useState([{
        "id": "xyz",
        "name": "Watch.mp4",
        "thumbnailLink": "https",
        "type": 'NORMAL'
    }]);

    const fetchData = async () => {
        const requestOptions = {
            method: 'GET',
            headers: {},
            redirect: 'follow',
        };

        const responseThumb = await fetch(
            `https://www.googleapis.com/drive/v3/files?q=%27${folderID}%27+in+parents&fields=files(id,name,thumbnailLink,modifiedTime)&key=${GOOGLE_API}&orderBy=createdTime%20desc`,
            requestOptions,
        );

        if (responseThumb) {
            const res = await responseThumb.json();
            const temp = [...res.files];
            for (let i = 0; i < temp.length; i++) {
                temp[i].type = 'NORMAL';
                if (temp[i].thumbnailLink)
                    temp[i].thumbnailLink = temp[i].thumbnailLink.replace('=s220', '=s720');
                else
                    temp[i].thumbnailLink = 'https://image.shutterstock.com/image-photo/grunge-black-background-texture-space-260nw-373662322.jpg'
            }
            setRes(temp);
        }
    };

    useEffect(() => {
        fetchData();
    }, [folderID]);

    return { data }
}

