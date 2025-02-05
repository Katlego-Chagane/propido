"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"

export default function Home() {
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      router.push("/dashboard")
    } else {
      router.push("/signin")
    }
  }, [user, router])

  return null
}

