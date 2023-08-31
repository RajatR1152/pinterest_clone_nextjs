'use client'
import { db } from '@/app/shared/firebaseConfig';
import { collection, getDocs, query } from 'firebase/firestore';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { BsBookmark } from 'react-icons/bs';

export default function PostLayout() {

  const [postList, setPostsList] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  async function getPosts() {
    setPostsList([]);
    const q = query(collection(db, 'posts'));
    const data = await getDocs(q);
    data.forEach((e) => {
      setPostsList(postsList => [...postsList, e.data()]);
    });
  }

  console.log(postList);

  return (
    <div className="container w-full h-screen bg-slate-100 md:columns-4 p-5">
      {
        postList.map((d) => {
          return (
            <div className="w-full bg-slate-100 rounded-md mt-3">

              <div className="container w-full">
                <div className="h-fit group">

                  <div className="relative rounded-md">
                    <Link href={`/img/${d.id}`} className="w-full">
                      <div className='relative'>
                        <img src={d.image} alt="" className="h-auto shadow-xl rounded-xl object-cover w-full" />
                      </div>
                      <div className="absolute h-full flex-col w-full bg-black/20 rounded-xl flex -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <BsBookmark size={30} className='text-white ms-auto m-5' />
                        <Link className='flex items-center text-white p-2 mt-auto flex-row gap-3' href={`/search-user/${d.email}`}>
                          <img src={d.authorImg} alt="" className="rounded-full w-8 h-8" />
                          <div className="container flex flex-col">
                            <h2 className="md:text-xl xl:text-xl lg:text-xl font-semibold">{d.author}</h2>
                            <h3 className="text-sm lg:text-md font-semibold">{d.email}</h3>
                          </div>
                        </Link>
                      </div>
                      {/* <h1 className="text-2xl text-center capitalize font-semibold my-3">{d.title}</h1> */}
                    </Link>
                  </div>

                  <div className="flex mt-3 w-full lg:w-fit rounded-md justify-center items-center gap-2 md:gap-3 lg:gap-5 flex-row">

                  </div>
                </div>
              </div>

            </div>
          )
        })
      }
    </div>
  )
}
