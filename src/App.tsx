import { useState } from 'react'
import { useGetMessagesQuery } from './api'
import Message from './components/Message'


export function App() {
    const [cursor, setCursor] = useState(0)
    const [isInfinity, setIsInfinity] = useState(false)

    const { data, isLoading, isSuccess, isError } = useGetMessagesQuery(cursor)

    return (
        <>
            {/* header for mobile */}
            <header className='border-b border-gray-500'>
                    <p className='text-center'>
                        cursor: <b>{cursor}</b> <br />
                    </p>

                    <p className='text-center'>
                        item count: <b>{data?.length ?? 0}</b>
                    </p>
                
                <select className='block mx-auto bg-transparent' value={isInfinity ? 'true' : 'false'} onChange={e => setIsInfinity(e.currentTarget.value === "true")}>
                    <option value="false" className='bg-gray-700'>Load more</option>
                    <option value="true" className='bg-gray-700'>Infinity</option>
                </select>
            </header>

            <main className='flex flex-col items-center'>
                {!isInfinity && (
                    <button className='rounded-md border border-gray-700 p-2  mt-3'
                        onClick={() => setCursor(data === undefined ? 0 : data[0].id)}>
                        {isError ? 'Retry...' : 'Load more...'}
                    </button>
                )}
                <div className='px-6 max-w-3xl w-full flex flex-col gap-4 mt-3'>
                    {isLoading ?
                        "Loading..." :
                        data?.map((msg, index) =>
                            <Message
                                index={index}
                                msg={msg}
                                key={`message-${msg.id}`} />
                        )
                    }
                </div>
            </main>
        </>
    )
}