'use client'

import PinItem from "./PinItem"

export default function PinsList({ data, isUser }) {

    return (
        <div className="md:columns-3 gap-3 lg:columns-3 xl:columns-4 mt-10 w-screen">
            {
                data.map((d, i) => {
                    return (
                        <div className='bg-slate-200 my-5 rounded-lg h-fit' key={i}>
                            <PinItem isUser={isUser} data={d} />
                        </div>
                    )
                })

            }
        </div>
    )
}
