'use client'
import React, { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from 'sonner'

export default function HomePage() {
  const [typeWork, setTypeWork] = useState("")
  const [name, setName] = useState("")
  const [time_start, setTime_s] = useState("")
  const [time_end, setTime_e] = useState("")
  const [status, setStatus] = useState("")
  const [dates, setDate] = useState("")

  const handleSubmit = async () => {
    // ส่วนตรวจจับ Error
    if (
      typeWork === "" ||
      name === "" ||
      time_start === "" ||
      time_end === "" ||
      status === ""||
      dates === ""
    ) {
      toast('กรอกข้อมูลไม่ครบ', {
        action: {
          label: "Undo"
        }
      })
      return
    }
    // ส่วนส่งข้อมูลไปยัง API
    const res = await fetch('/api/works', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        typeWork,
        name,
        time_start,
        time_end,
        status,
        dates,
      }),
    })
    if (!res.ok) {
      toast('ส่งข้อมูลไม่สำเร็จ', {
        action: {
          label: "Undo"
        }
      })
      return
    }
    toast('ส่งข้อมูลสำเร็จ', {
      action: {
        label: "Undo"
      }
    })
    return
  }
  return (
    <div className='flex justify-center items-start p-10'>
      <div className='shadow-md p-5 w-[30%] h-fit flex flex-col justify-center items-center gap-3'>
        <p className='w-full text-3xl text-center'>บันทึกรายการการปฎิบัติงานประจำวัน</p>
        <Select onValueChange={(e) => setTypeWork(e)}>
          <SelectTrigger className="w-full h-[3rem]">
            <SelectValue placeholder="เลือกประเภทงาน" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Development">Development</SelectItem>
            <SelectItem value="Test">Test</SelectItem>
            <SelectItem value="Document">Document</SelectItem>
          </SelectContent>
        </Select>

        <input onChange={(e) => setName(e.target.value)} type="text" placeholder='ชื่องาน' className='border w-full h-[3rem] px-3 outline-none rounded-md' />
        <div className='w-full h-fit flex justify-center items-center gap-2'>
          <input onChange={(e) => setTime_s(e.target.value)} type="time" className='border w-full h-[3rem] px-3 outline-none rounded-md' />
          <h1>ถึง</h1>
          <input onChange={(e) => setTime_e(e.target.value)} type="time" className='border w-full h-[3rem] px-3 outline-none rounded-md' />
        </div>
        <Select onValueChange={(e) => setStatus(e)}>
          <SelectTrigger className="w-full h-[3rem]">
            <SelectValue placeholder="เลือกสถานะดำเนินงาน" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ดำเนินงาน">ดำเนินงาน</SelectItem>
            <SelectItem value="เสร็จสิ้น">เสร็จสิ้น</SelectItem>
            <SelectItem value="ยกเลิก">ยกเลิก</SelectItem>
          </SelectContent>
        </Select>
        <input onChange={(e) => setDate(e.target.value)} type="date" className='border w-full h-[3rem] px-3 outline-none rounded-md' />
        <button onClick={handleSubmit} className='w-full h-[3rem] bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md'>บันทึกข้อมูล</button>
      </div>
    </div>
  )
}
