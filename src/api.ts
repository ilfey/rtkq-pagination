import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IMessage } from "./etities/Message";

export const api = createApi({
    reducerPath: "",
    baseQuery: fetchBaseQuery({ baseUrl: "https://devback-pr-2.onrender.com/api/v1/" }),
    endpoints: (builder) => ({
        getMessages: builder.query<Array<IMessage>, number>({
            query: (cursor) => `messages?cursor=${cursor}&limit=10`,
            serializeQueryArgs: ({ endpointName }) => endpointName,
            merge: (currentCache, newItems) => {
                currentCache.unshift(...newItems);
            },
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg;
            }
        })
    })
});


export const { useGetMessagesQuery } = api;
