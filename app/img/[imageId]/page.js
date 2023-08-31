'use client'
import { db } from '@/app/shared/firebaseConfig';
import PostInfo from '@/components/PostInfo';
import Spinner from '@/components/Spinner';
import { data } from 'autoprefixer';
import { collection, doc, getDocs, getDoc, getFirestore, query, where } from 'firebase/firestore'
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function page() {

  const param = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPins();
  }, [])

  const getPins = async () => {
    const q = query(collection(db, 'posts'), where("id", "==", param.imageId));

    const querySnapShot = await getDocs(q);
    querySnapShot.forEach((doc) => {
      setData(doc.data());
      setLoading(false)
    })
  }

  return (
    <>
      {
        loading ?
          <div className="container flex flex-col items-center justify-center mt-44 p-5">
            <Spinner size={30} color={'blue'} />
          </div>
          :
          <PostInfo data={data} />
      }
    </>
  )
}
