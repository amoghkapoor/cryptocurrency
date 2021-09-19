import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const newsApiHeaders = {
    'x-bingapis-sdk': 'true',
    'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
    'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY
}

const baseUrl = "https://bing-news-search1.p.rapidapi.com"

const createRequest = (url) => ({ url, headers: newsApiHeaders })

export const newsApi = createApi({
    reducerPath: "NewsApi",
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builders) => ({
        getNews: builders.query({
            query: ({ newsCategory, count }) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`)
        })
    })
})

export const {
    useGetNewsQuery,
} = newsApi