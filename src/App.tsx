import { useState } from 'react'
import { IMessagesRequest, api, useGetMessagesQuery } from './api'
import Message from './components/Message'
import { useDispatch } from 'react-redux'

const
    LOAD_MORE = 'load-more',
    LOAD_MORE_INVERSED = 'load-more-inversed',
    INFINITY = 'infinity'


export function App() {
    const [layoutShiftType, setLayoutShiftType] = useState(LOAD_MORE)

    const dispatch = useDispatch()

    const [args, setArgs] = useState<IMessagesRequest>({
        cursor: 0,
        limit: 10,
        inverse: false,
    })

    const { data, isLoading, isError } = useGetMessagesQuery(args)

    return (
        <>
            {/* header for mobile */}
            <header className='border-b border-gray-500'>
                <p className='text-center'>
                    cursor: <b>{args.cursor}</b> <br />
                </p>

                <p className='text-center'>
                    item count: <b>{data?.length ?? 0}</b>
                </p>

                <select className='block mx-auto bg-transparent' value={layoutShiftType} onChange={e => {
                    const nextLayoutShiftType = e.currentTarget.value  
                    setLayoutShiftType(nextLayoutShiftType)
                    dispatch(api.util.resetApiState()) // for clear cache
                    if (nextLayoutShiftType === LOAD_MORE_INVERSED) {
                        setArgs({
                            ...args,
                            cursor: 0,
                            inverse: true
                        })
                    } else {
                        setArgs({
                            ...args,
                            cursor: 0,
                            inverse: false
                        })
                    }
                    }}>
                    <option value={LOAD_MORE} className='bg-gray-700'>Load more</option>
                    <option value={LOAD_MORE_INVERSED} className='bg-gray-700'>Load more inversed</option>
                    <option value={INFINITY} className='bg-gray-700'>Infinity</option>
                </select>
            </header>

            <main className='flex flex-col items-center'>
                {layoutShiftType === LOAD_MORE && (
                    <button className='rounded-md border border-gray-700 p-2  mt-3'
                        onClick={() => setArgs({
                            ...args,
                            ...{ cursor: data === undefined ? 0 : data[0].id }
                        })}>
                        {isError ? 'Retry...' : 'Load more...'}
                    </button>
                )}
                <div className='px-6 max-w-3xl w-full flex flex-col gap-4 mt-3'>
                    {isLoading ?
                        <p className='text-center'>Loading...</p> :
                        data?.map((msg, index) =>
                            <Message
                                index={index}
                                msg={msg}
                                key={`message-${msg.id}`} />
                        )
                    }
                </div>
                {layoutShiftType === LOAD_MORE_INVERSED && (
                    <button className='rounded-md border border-gray-700 p-2  mt-3'
                        onClick={() => setArgs({
                            ...args,
                            ...{ 
                                cursor: data === undefined ? 0 : data[data.length-1].id,
                                inverse: true
                             }
                        })}>
                        {isError ? 'Retry...' : 'Load more...'}
                    </button>
                )}
            </main>
        </>
    )
}