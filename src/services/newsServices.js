const baseUrl = 'https://agro-tech-market.herokuapp.com/'

export const getNews = () => {
    return fetch(baseUrl)
    .then(resp => resp.json())
}