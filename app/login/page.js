'use client'
import { onAuthStateChanged, signInWithPopup } from 'firebase/auth'
import React, { useContext, useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { auth, db, provider } from '../shared/firebaseConfig'
import { doc, setDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import Spinner from '@/components/Spinner'
import { LoginContext } from '@/context/LoginContext'

export default function page() {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const {isLogedIn,setIsLogedIn} = useContext(LoginContext);

    function login() {

        setIsLoading(true);

        signInWithPopup(auth, provider).then((res) => {
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    const uid = user.uid;
                    let data = {
                        username: user.displayName,
                        email: user.email,
                        image: user.photoURL
                    }
                    await setDoc(doc(db, 'users', uid), data);
                }
                else {
                    null
                }
            });
            router.push('/');
        })
    }

    return (
        <div className="container bg-[url(https://img.freepik.com/premium-vector/modern-dynamic-stripes-colorful-abstract-geometric-design-background-business-card-presentation-brochure-banner-wallpaper_249611-1023.jpg?size=626&ext=jpg)] bg-no-repeat bg-cover w-full h-screen flex flex-row items-center justify-center">
            {
                isLoading ? (<Spinner size={15} color={"#1E4BF3"} />)
                    :
                    <button onClick={login} className='px-6 py-4 bg-black text-white font-semibold text-xl flex flex-row gap-5'><FcGoogle size={30} /> Login With Google</button>
            }
        </div>
    )
}
