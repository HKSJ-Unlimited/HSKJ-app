import { BASE_URL } from 'react-native-dotenv'
export const get = async ( endpoint='' ) => {
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
