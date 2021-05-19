export const gihubAPI = async () => {
    try {
        let response = await fetch('https://api.github.com/repos/HKSJ-Unlimited/HSKJ-app/releases/latest')
        let res = response.json()
        return res
    } catch (e) {
        alert(e)
    }
}