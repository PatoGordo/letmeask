import firebase from 'firebase'
import React, { createContext, useState, useEffect, ReactNode } from 'react'
import { auth } from '../services/firebase'

interface User {
  id: string;
  name: string;
  avatar: string;
}

interface AuthContextType {
  user: User | undefined;
  signInWithGoogle(): Promise<void>;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<User>()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if(user) {
        const { displayName, photoURL, uid } = user

        if(!displayName || !photoURL) {
          throw new Error('Missing information from Google Account')
        }
  
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider()
    
    const res = await auth.signInWithPopup(provider)
    
    if(res.user) {
      const { displayName, photoURL, uid } = res.user

      if(!displayName || !photoURL) {
        throw new Error('Missing information from Google Account')
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }
  }
  
  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {props.children}
    </AuthContext.Provider>
  )
}