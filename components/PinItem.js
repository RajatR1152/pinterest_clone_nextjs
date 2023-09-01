import React from 'react'
import Link from 'next/link'
import { BsBookmark } from 'react-icons/bs'

export default function PinItem({ data, isUser }) {

    return (
        <div className="w-full px-2 rounded-md mt-3">

            <div className="container w-full">
                <div className="h-fit group">

                    <div className="relative rounded-md">
                        <Link href={`/img/${data.id}`} className="w-full">
                            <div className='relative'>
                                <img src={data.image} alt="" className="h-auto shadow-xl rounded-xl object-cover w-full" />
                            </div>
                            <div className="absolute h-full flex-col w-full bg-black/20 rounded-xl flex -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                <BsBookmark size={30} className='text-white ms-auto m-5' />
                                <div className='flex items-center text-white p-2 mt-auto flex-row gap-3' onClick={() => { window.location.href = `/search-user/${data.email}` }}>
                                    <img src={data.authorImg} alt="" className="rounded-full w-4 h-4 md:w-8 md:h-8" />
                                    <div className="container flex flex-col">
                                        <h2 className="md:text-lg xl:text-xl lg:text-xl font-semibold">{data.author}</h2>
                                        <h3 className="text-xs lg:text-md font-semibold">{data.email}</h3>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>

                    <div className="flex mt-3 w-full lg:w-fit rounded-md justify-center items-center gap-2 md:gap-3 lg:gap-5 flex-row">

                    </div>
                </div>
            </div>

        </div>
    )
}
