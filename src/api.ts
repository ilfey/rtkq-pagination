import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    reducerPath: "",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api/v1/" }),
    endpoints: (builder) => ({
        getMessages: builder.query<Array<{
            id: number,
            content: string,
            reply_to: number | null,
            modified_at: string,
            created_at: string,
        }>, number>({
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
