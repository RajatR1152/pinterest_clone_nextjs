'use client'
import Header from '@/components/Header'
import React, { useContext, useEffect } from 'react'
import { auth, db } from "@/app/shared/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { UserContext } from '@/context/userContext';
import { LoginContext } from '@/context/LoginContext';
import PostLayout from '@/components/PostLayout'

export default function page() {

  const { userData, setUserData } = useContext(UserContext);
  const { isLogedIn, setIsLogedIn } = useContext(LoginContext);

  useEffect(() => {

    const logedIn = localStorage.getItem("isLogedIn");
    setIsLogedIn(logedIn);
    console.log("loged in ", logedIn);

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        let data = {
          username: user.displayName,
          email: user.email,
          image: user.photoURL
        }
        await setDoc(doc(db, 'users', uid), data);
        setUserData(user);
      }
      else {
        null
      }
    });
  }, [userData]);

  console.log(userData);

  return (
    <div className='bg-slate-100 py-1 h-screen'>
      <PostLayout />
    </div>
  )
}
