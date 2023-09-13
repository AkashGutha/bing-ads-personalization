import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function ImageSearchLoading() {
    return (
        <>
            <div className="flex flex-col">
                <Skeleton height={100} count={1} className='w-1/3' />
                <Skeleton height={10} count={10} />

            </div>

            <Skeleton height={10} count={30} />
            <Skeleton height={500} count={1} />
        </>
    )
}