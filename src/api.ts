import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IMessage } from "./etities/Message";

export interface IMessagesRequest {
    cursor: number
    limit: number
    inverse: boolean
}

export const api = createApi({
    reducerPath: "",
    baseQuery: fetchBaseQuery({ baseUrl: "https://devback-pr-2.onrender.com/api/v1/" }),
    endpoints: (builder) => ({
        getMessages: builder.query<Array<IMessage>, IMessagesRequest>({
            query: ({ cursor, limit, inverse }) => `messages?cursor=${cursor}&limit=${inverse ? limit + '&inverse' : limit}`,
            serializeQueryArgs: ({ endpointName }) => endpointName,
            merge: (currentCache, newItems) => {
                if (newItems.length === 0) {
                    return
                }
                
                if (currentCache[0].id > newItems[0].id) {
                    currentCache.unshift(...newItems);
                } else if (currentCache[0].id < newItems[0].id) {
                    currentCache.push(...newItems);
                } 
            },
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg;
            }
        })
    })
});


export const { useGetMessagesQuery } = api;
