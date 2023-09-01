'use client'
import { db } from '@/app/shared/firebaseConfig';
import { collection, getDocs, query } from 'firebase/firestore';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { BsBookmark } from 'react-icons/bs';
import PinsList from './PinsList';

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
    <PinsList data={postList} />
  )
}
