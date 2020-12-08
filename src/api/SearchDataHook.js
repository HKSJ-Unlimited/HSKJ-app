import { useState, useEffect } from 'react';

export const useSearch = (query) => {
    const [data, setData] = useState([]);
    const [scrappedData, setScrappedData] = useState([]);
    const [status, setStatus] = useState('Start typing to search for a video');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://raw.githubusercontent.com/HKSJ-Unlimited/HKSJ-scrapper/master/scrapped.txt')
                const res = await response.text();
                let temp = res.split('$');
                setScrappedData(temp);
            }
            catch (error) {
                console.warn('useSearch error', error)
            };
        }
        fetchData();
    }, [])

    useEffect(() => {
        if (!query) {
            setStatus('Start typing to search for a video');
            setData([])
            return;
        }
        setStatus('Searching...');

        let temp = [];
        let count = 0;

        scrappedData.length && scrappedData.forEach((item, index) => {
            if (item.match(new RegExp(query, "gi"))) {
                count++;
                setStatus(`Found ${count} videos`);
                temp.push({ "name": item, "key": index });
                setData(temp);
            }
        })
        if (!temp.length)
            setStatus('No videos found');
    }, [query]);

    return { data, status }
}
