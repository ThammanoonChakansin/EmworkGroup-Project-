import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(req){
    const data = await req.json()
    await prisma.work.create({
        data:data
    })
    return NextResponse.json({message:"Create Successfully"})
}

export async function GET(req){
    const work = await prisma.work.findMany()
    return NextResponse.json(work)
}