import { GO_KEY } from 'react-native-dotenv'
export const get = async (endpoint, fileID='') => {
    try {
        let response = await fetch(`https://gounlimited.to/api/${endpoint}/list?key=${GO_KEY}&fld_id=${fileID}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X x.y; rv:42.0) Gecko/20100101 Firefox/42.0'
            },
        })
        const res = await response.json()
        return res.result
    } catch (error) {
        alert(error);
    }
}
