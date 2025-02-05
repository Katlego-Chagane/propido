"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import type { User } from "@supabase/supabase-js"
import { cn } from "@/lib/utils"

type AuthContextType = {
  user: User | null
  signOut: () => Promise<void>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        setUser(session?.user ?? null)
        router.push("/dashboard")
      } else if (event === "SIGNED_OUT") {
        setUser(null)
        router.push("/signin")
      }
    })

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [router])

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        const { data, error } = await supabase.from('profiles').select('name').eq('id', user.id).single()
        if (data) {
          setUser({ ...user, name: data.name })
        }
      }
    }

    fetchUserProfile()
  }, [user])

  useEffect(() => {
    const fetchUserProperties = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .eq('owner_id', user.id)

        if (data) {
          setUser((prevUser) => ({ ...prevUser, properties: data }))
        }
      }
    }

    fetchUserProperties()
  }, [user])

  const signOut = async () => {
    await supabase.auth.signOut()
    router.push("/signin")
  }

  const value = {
    user,
    signOut,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

