// app/api/firebase-config/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  })
}
