import { useState, useEffect } from 'react';

export const useSearch = (query) => {
    const [data, setData] = useState([]);
    const [status, setStatus] = useState('Start typing to search for a video');

    useEffect(() => {
        if (!query) {
            setStatus('Start typing to search for a video');
            return;
        }
        const fetchData = async () => {
            try {
                setStatus('Searching...');
                const response = await fetch('https://raw.githubusercontent.com/HKSJ-Unlimited/HKSJ-scrapper/master/scrapped.txt')
                const res = await response.text()
                console.log('wew', res)
            }
            catch (error) {
                console.warn('useSearch error', error)
            };
        }
        fetchData();
    }, [query]);

    return { data, status }
}
