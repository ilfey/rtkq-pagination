import { useState } from 'react'
import { useGetMessagesQuery } from './api'


export function App() {
    const [cursor, setCursor] = useState(0)
    const [isInfinity, setIsInfinity] = useState(false)

    const { data, isLoading, isSuccess } = useGetMessagesQuery(cursor)

    return (
        <div className=''>
            <aside className='flex flex-col justify-center min-h-screen max-h-screen fixed w-60 bg-gray-600 text-white'>
                {isLoading &&
                    <p className='text-center'>Loading...</p>
                }
                {isSuccess &&
                    <>
                        <p className='text-center'>cursor: {cursor}</p>
                        <p className='text-center'>item count: {data.length}</p>
                        <select className='bg-transparent' value={isInfinity ? "'true'": 'false'} onChange={e => setIsInfinity(e.currentTarget.value === "true")}>
                            <option value="false" className='bg-gray-700'>Load more</option>
                            <option value="true" className='bg-gray-700'>Infinity</option>
                        </select>
                    </>
                }
            </aside>
            <main className='ml-60 flex flex-col items-center'>
                <button className='rounded-md border border-gray-700 p-2  mt-3'
                    onClick={() => setCursor(data === undefined ? 0 : data[0].id)}>
                    Load more...
                </button>
                <div className='messages w-fit px-6 flex flex-col'>
                    {isLoading ?
                        "Loading..." :
                        data?.map(({ id, content }) =>
                            <div className='max-w-1/3 rounded-xl border border-gray-500 p-3 my-3'
                                key={`message-${id}`}
                            >
                                <p>
                                    <span className='inline-block bg-blue-600 rounded-full w-8 h-8 text-center text-white'>{id}</span>
                                    {content}
                                </p>

                            </div>
                        )
                    }
                </div>
            </main>

        </div>
    )
}