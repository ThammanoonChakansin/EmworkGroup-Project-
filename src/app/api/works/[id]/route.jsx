import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()


export async function GET(req, { params }) {
    const id = parseInt(params.id)
    const work = await prisma.work.findUnique({
        where:{id}
    })
    return NextResponse.json(work)
}

export async function DELETE(req, { params }) {
    const id = parseInt(params.id)
    await prisma.work.delete({
        where:{id}
    })
    return NextResponse.json({'DELETE Success': true})
}

export async function PUT(req, { params }) {
    const id = parseInt(params.id)
    const data = await req.json()
    await prisma.work.update({
        where:{id},
        data:data
    })
    return NextResponse.json({'Update Success': true})
}