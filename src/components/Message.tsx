import { IMessage } from '../etities/Message'

interface Props {
    index: number
    msg: IMessage
}
export default function Message({ index, msg }: Props) {
    return (
        <div className='rounded-xl border border-gray-500 p-3'>
            <span className='bg-blue-600 rounded-sm p-1 text-center text-white'>
                {index}/{msg.id}
            </span>
            <pre className='whitespace-pre-wrap overflow-hidden break-words'>
                {msg.content}
            </pre>
        </div>
    )
}
