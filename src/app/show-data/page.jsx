'use client'
import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { toast } from 'sonner'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


export default function ShowData() {
    // สร้างตัวแปรเพื่อเก็บค่าข้อมูลเพื่อไปอัพเดท
    const [data, setData] = useState([])
    const [typeWork, setTypeWork] = useState("")
    const [name, setName] = useState("")
    const [time_start, setTime_s] = useState("")
    const [time_end, setTime_e] = useState("")
    const [status, setStatus] = useState("")
    const [dates, setDates] = useState("")

    useEffect(() => {
        getData()
    }, [])
// ดึงข้อมูลมาจาก API
    const getData = async () => {
        const response = await fetch('/api/works')
        const json = await response.json()
        setData(json)
    }
    // เก็บค่าข้อมูลจากการ Search
    const [search, setSearch] = useState("")
    const searchData = data.filter((item) => {
        return (
            (item.dates && String(item.dates).toUpperCase().includes(search.toUpperCase()))
        )
    })

    return (
        <div className='w-full h-fit p-5'>
            <div className='w-full h-fit p-5 flex justify-end gap-2 items-center'>
                <label htmlFor="">ค้นหาตาม วัน เดือน ปี</label>
                <input value={search} onChange={(e) => setSearch(e.target.value)} type="date" className='border w-1/4 h-[3rem] rounded-md px-2 outline-none' placeholder='ค้นหา วันที่ดำเนินการ' />
                <button onClick={()=>setSearch("")} className='px-10 py-2 bg-red-500 rounded-md text-white' type='reset'>รีเซ็ต</button>
            </div>
            <div className='w-full h-fit p-5 flex justify-end gap-2 items-center'>
                <label htmlFor="">ค้นหาตาม เดือน</label>
                <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" className='border w-1/4 h-[3rem] rounded-md px-2 outline-none' placeholder='ค้นหา วันที่ดำเนินการ' />
                <button onClick={()=>setSearch("")} className='px-10 py-2 bg-red-500 rounded-md text-white' type='reset'>รีเซ็ต</button>
            </div>
            
            <Table>
                {
                    data.length == 0 && search == "" && (<TableCaption>ไม่มีข้อมูล</TableCaption>)
                }
                {
                    search != "" && searchData.length == 0 && (<TableCaption>ไม่มีข้อมูล</TableCaption>)
                }
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">รหัสงาน</TableHead>
                        <TableHead>ชื่องานที่ดำเนินการ</TableHead>
                        <TableHead>ประเภทงานที่ดำเนินการ</TableHead>
                        <TableHead>เวลาที่เริ่มดำเนินการ</TableHead>
                        <TableHead>เวลาที่เสร็จสิ้น</TableHead>
                        <TableHead>สถานะ</TableHead>
                        <TableHead>วันที่บันทึกข้อมูล</TableHead>
                        <TableHead>วันที่สร้างข้อมูล</TableHead>
                        <TableHead>วันที่ปรับปรุงข้อมูลล่าสุด</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        search == "" && (
                            data.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{item.id}</TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.typeWork}</TableCell>
                                    <TableCell>{item.time_start} น.</TableCell>
                                    <TableCell>{item.time_end} น.</TableCell>
                                    <TableCell>{item.status}</TableCell>
                                    <TableCell>{item.dates}</TableCell>
                                    <TableCell>{item.save}</TableCell>
                                    <TableCell>{item.updateAt}</TableCell>
                                    <TableCell className="flex justify-center items-center gap-4">
                                        <AlertDialog>
                                            <AlertDialogTrigger>
                                                <button className="text-sm px-2 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600">ดูรายละเอียด</button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>รายละเอียดข้อมูล รหัส {item.id}</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        <h1>ชื่องานที่ดำเนินการ : {item.name}</h1>
                                                        <h1>ชื่อประเภทงานที่ดำเนินการ : {item.typeWork}</h1>
                                                        <h1>เวลาที่เริ่มดำเนินการ : {item.time_start}</h1>
                                                        <h1>เวลาที่เสร็จสิ้น : {item.time_end}</h1>
                                                        <h1>สถานะ : {item.status}</h1>
                                                        <h1>วันที่บันทึกข้อมูล : {item.dates}</h1>
                                                        <h1>วันที่สร้างข้อมูล : {item.save}</h1>
                                                        <h1>วันที่ปรับปรุงข้อมูลล่าสุด : {item.updateAt}</h1>
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>ปิด</AlertDialogCancel>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>

                                        <button onClick={async () => {
                                            const res = await fetch(`/api/works/${item.id}`, {
                                                method: 'DELETE'
                                            })
                                            if (res.ok) {
                                                toast('Deleted successfully', {
                                                    action: {
                                                        label: 'Undo'
                                                    }
                                                })
                                            }
                                            getData()
                                            return
                                        }} className="text-sm px-2 py-1 rounded-md bg-red-500 text-white hover:bg-red-600">ลบ</button>
                                        <AlertDialog>
                                            <AlertDialogTrigger>
                                                <button className="text-sm px-2 py-1 rounded-md bg-yellow-500 text-white hover:bg-yellow-600">แก้ไข</button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>แก้ไขข้อมูลไอดีที่ {item.id}</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        <div className='w-full h-fit  flex flex-col justify-center items-center gap-2'>
                                                            <div className='w-full'>
                                                                <label >รหัสงาน : </label>
                                                                <input type="text" value={item.id} className='border px-2 w-1/2 h-[2rem] rounded-md' disabled />
                                                            </div>
                                                            <div className='w-full'>
                                                                <label >ชื่องานที่ดำเนินการ : </label>
                                                                <input onChange={(e) => setName(e.target.value)} type="text" defaultValue={item.name} className='border px-2 w-1/2 h-[2rem] rounded-md' />
                                                            </div>
                                                            <div className='w-full'>
                                                                <label >ประเภทงานที่ดำเนินการ : </label>
                                                                <input disabled onChange={(e) => setName(e.target.value)} type="text" defaultValue={item.typeWork} className='border px-2 w-1/2 h-[2rem] rounded-md' />
                                                            </div>
                                                            <div className='w-full flex flex-row justify-start gap-2 items-center'>
                                                                <label className='text-green-500'>ประเภทงานที่ดำเนินการ : </label>
                                                                <Select onValueChange={(e) => setTypeWork(e)}>
                                                                    <SelectTrigger className="w-1/2">
                                                                        <SelectValue placeholder="เลือกประเภทงานใหม่" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectItem value="Development">Development</SelectItem>
                                                                        <SelectItem value="Test">Test</SelectItem>
                                                                        <SelectItem value="Document">Document</SelectItem>
                                                                    </SelectContent>
                                                                </Select>


                                                            </div>
                                                            <div className='w-full'>
                                                                <label >เวลาที่เริ่มดำเนินการ : </label>
                                                                <input onChange={(e) => setTime_s(e.target.value)} type="text" defaultValue={item.time_start} className='border px-2 w-1/2 h-[2rem] rounded-md' />
                                                            </div>
                                                            <div className='w-full'>
                                                                <label >เวลาที่เสร็จสิ้น : </label>
                                                                <input onChange={(e) => setTime_e(e.target.value)} type="text" defaultValue={item.time_end} className='border px-2 w-1/2 h-[2rem] rounded-md' />
                                                            </div>
                                                            <div className='w-full'>
                                                                <label >สถานะ : </label>
                                                                <input disabled onChange={(e) => setTime_e(e.target.value)} type="text" defaultValue={item.status} className='border px-2 w-1/2 h-[2rem] rounded-md' />
                                                            </div>
                                                            <div className='w-full flex flex-row justify-start gap-2 items-center'>
                                                                <label className='text-green-500'>สถานะ : </label>
                                                                <Select onValueChange={(e) => setStatus(e)}>
                                                                    <SelectTrigger className="w-1/2">
                                                                        <SelectValue placeholder="เลือกสถานะดำเนินงานใหม่" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectItem value="ดำเนินงาน">ดำเนินงาน</SelectItem>
                                                                        <SelectItem value="เสร็จสิ้น">เสร็จสิ้น</SelectItem>
                                                                        <SelectItem value="ยกเลิก">ยกเลิก</SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>
                                                            <div className='w-full'>
                                                                <label >วันที่สร้างข้อมูล : </label>
                                                                <input type="date" onChange={(e) => setDates(e.target.value)} defaultValue={item.dates} className='border px-2 w-1/2 h-[2rem] rounded-md' />
                                                            </div>
                                                            <div className='w-full'>
                                                                <label >วันที่บันทึกข้อมูล : </label>
                                                                <input type="text" value={item.save} className='border px-2 w-1/2 h-[2rem] rounded-md' disabled />
                                                            </div>
                                                            <div className='w-full'>
                                                                <label >วันที่ปรับปรุงข้อมูลล่าสุด : </label>
                                                                <input type="text" value={item.updateAt} className='border px-2 w-1/2 h-[2rem] rounded-md' disabled />
                                                            </div>
                                                        </div>
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>ปิด</AlertDialogCancel>
                                                    <AlertDialogAction>
                                                        <button onClick={async () => {
                                                            // เวลากดส่งข้อมูลก็จะอัพเดท
                                                            const res = await fetch('/api/works/' + item.id, {
                                                                method: 'PUT',
                                                                headers: { 'Content-Type': 'application/json' },
                                                                body: JSON.stringify({
                                                                    typeWork: typeWork == "" ? item.typeWork : typeWork,
                                                                    name: name == "" ? item.name : name,
                                                                    time_start: time_start == "" ? item.timeStart : time_start,
                                                                    time_end: time_end == "" ? item.time_end : time_end,
                                                                    status: status == "" ? item.status : status,
                                                                    dates: dates == "" ? item.dates : dates

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
                                                            toast('อัพเดทสำเร็จ', {
                                                                action: {
                                                                    label: "Undo"
                                                                }
                                                            })
                                                            getData()
                                                            return
                                                        }}>บันทึก</button>
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </TableCell>
                                </TableRow>
                            ))
                        )
                    }
                    {
                        search != "" && (
                            searchData.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{item.id}</TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.typeWork}</TableCell>
                                    <TableCell>{item.time_start} น.</TableCell>
                                    <TableCell>{item.time_end} น.</TableCell>
                                    <TableCell>{item.status}</TableCell>
                                    <TableCell>{item.dates}</TableCell>
                                    <TableCell>{item.save}</TableCell>
                                    <TableCell>{item.updateAt}</TableCell>
                                    <TableCell className="flex justify-center items-center gap-4">
                                        <AlertDialog>
                                            <AlertDialogTrigger>
                                                <button className="text-sm px-2 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600">ดูรายละเอียด</button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>รายละเอียดข้อมูล รหัส {item.id}</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        <h1>ชื่องานที่ดำเนินการ : {item.name}</h1>
                                                        <h1>ชื่อประเภทงานที่ดำเนินการ : {item.typeWork}</h1>
                                                        <h1>เวลาที่เริ่มดำเนินการ : {item.time_start}</h1>
                                                        <h1>เวลาที่เสร็จสิ้น : {item.time_end}</h1>
                                                        <h1>สถานะ : {item.status}</h1>
                                                        <h1>วันที่บันทึกข้อมูล : {item.dates}</h1>
                                                        <h1>วันที่สร้างข้อมูล : {item.save}</h1>
                                                        <h1>วันที่ปรับปรุงข้อมูลล่าสุด : {item.updateAt}</h1>
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>ปิด</AlertDialogCancel>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>

                                        <button onClick={async () => {
                                            const res = await fetch(`/api/works/${item.id}`, {
                                                method: 'DELETE'
                                            })
                                            if (res.ok) {
                                                toast('Deleted successfully', {
                                                    action: {
                                                        label: 'Undo'
                                                    }
                                                })
                                            }
                                            getData()
                                            return
                                        }} className="text-sm px-2 py-1 rounded-md bg-red-500 text-white hover:bg-red-600">ลบ</button>
                                        <AlertDialog>
                                            <AlertDialogTrigger>
                                                <button className="text-sm px-2 py-1 rounded-md bg-yellow-500 text-white hover:bg-yellow-600">แก้ไข</button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>แก้ไขข้อมูลไอดีที่ {item.id}</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        <div className='w-full h-fit  flex flex-col justify-center items-center gap-2'>
                                                            <div className='w-full'>
                                                                <label >รหัสงาน : </label>
                                                                <input type="text" value={item.id} className='border px-2 w-1/2 h-[2rem] rounded-md' disabled />
                                                            </div>
                                                            <div className='w-full'>
                                                                <label >ชื่องานที่ดำเนินการ : </label>
                                                                <input onChange={(e) => setName(e.target.value)} type="text" defaultValue={item.name} className='border px-2 w-1/2 h-[2rem] rounded-md' />
                                                            </div>
                                                            <div className='w-full'>
                                                                <label >ประเภทงานที่ดำเนินการ : </label>
                                                                <input disabled onChange={(e) => setName(e.target.value)} type="text" defaultValue={item.typeWork} className='border px-2 w-1/2 h-[2rem] rounded-md' />
                                                            </div>
                                                            <div className='w-full flex flex-row justify-start gap-2 items-center'>
                                                                <label className='text-green-500'>ประเภทงานที่ดำเนินการ : </label>
                                                                <Select onValueChange={(e) => setTypeWork(e)}>
                                                                    <SelectTrigger className="w-1/2">
                                                                        <SelectValue placeholder="เลือกประเภทงานใหม่" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectItem value="Development">Development</SelectItem>
                                                                        <SelectItem value="Test">Test</SelectItem>
                                                                        <SelectItem value="Document">Document</SelectItem>
                                                                    </SelectContent>
                                                                </Select>


                                                            </div>
                                                            <div className='w-full'>
                                                                <label >เวลาที่เริ่มดำเนินการ : </label>
                                                                <input onChange={(e) => setTime_s(e.target.value)} type="text" defaultValue={item.time_start} className='border px-2 w-1/2 h-[2rem] rounded-md' />
                                                            </div>
                                                            <div className='w-full'>
                                                                <label >เวลาที่เสร็จสิ้น : </label>
                                                                <input onChange={(e) => setTime_e(e.target.value)} type="text" defaultValue={item.time_end} className='border px-2 w-1/2 h-[2rem] rounded-md' />
                                                            </div>
                                                            <div className='w-full'>
                                                                <label >สถานะ : </label>
                                                                <input disabled onChange={(e) => setTime_e(e.target.value)} type="text" defaultValue={item.status} className='border px-2 w-1/2 h-[2rem] rounded-md' />
                                                            </div>
                                                            <div className='w-full flex flex-row justify-start gap-2 items-center'>
                                                                <label className='text-green-500'>สถานะ : </label>
                                                                <Select onValueChange={(e) => setStatus(e)}>
                                                                    <SelectTrigger className="w-1/2">
                                                                        <SelectValue placeholder="เลือกสถานะดำเนินงานใหม่" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectItem value="ดำเนินงาน">ดำเนินงาน</SelectItem>
                                                                        <SelectItem value="เสร็จสิ้น">เสร็จสิ้น</SelectItem>
                                                                        <SelectItem value="ยกเลิก">ยกเลิก</SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>
                                                            <div className='w-full'>
                                                                <label >วันที่บันทึกข้อมูล : </label>
                                                                <input type="date" onChange={(e) => setDates(e.target.value)} defaultValue={item.dates} className='border px-2 w-1/2 h-[2rem] rounded-md' />
                                                            </div>
                                                            <div className='w-full'>
                                                                <label >วันที่สร้างข้อมูล : </label>
                                                                <input type="text" value={item.save} className='border px-2 w-1/2 h-[2rem] rounded-md' disabled />
                                                            </div>
                                                            <div className='w-full'>
                                                                <label >วันที่ปรับปรุงข้อมูลล่าสุด : </label>
                                                                <input type="text" value={item.updateAt} className='border px-2 w-1/2 h-[2rem] rounded-md' disabled />
                                                            </div>
                                                        </div>
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>ปิด</AlertDialogCancel>
                                                    <AlertDialogAction>
                                                        <button onClick={async () => {
                                                            const res = await fetch('/api/works/' + item.id, {
                                                                method: 'PUT',
                                                                headers: { 'Content-Type': 'application/json' },
                                                                body: JSON.stringify({
                                                                    typeWork: typeWork == "" ? item.typeWork : typeWork,
                                                                    name: name == "" ? item.name : name,
                                                                    time_start: time_start == "" ? item.timeStart : time_start,
                                                                    time_end: time_end == "" ? item.time_end : time_end,
                                                                    status: status == "" ? item.status : status,

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
                                                            toast('อัพเดทสำเร็จ', {
                                                                action: {
                                                                    label: "Undo"
                                                                }
                                                            })
                                                            getData()
                                                            return
                                                        }}>บันทึก</button>
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </TableCell>
                                </TableRow>
                            ))
                        )
                    }
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={8}>ทั้งหมด</TableCell>
                        <TableCell className="text-right">{search == "" ? data.length : searchData.length} รายการ</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>

        </div>
    )
}
