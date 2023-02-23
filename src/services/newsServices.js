const baseUrl = 'http://localhost:5000'

export const getNews = () => {
    return fetch(baseUrl)
    .then(resp => resp.json())
}