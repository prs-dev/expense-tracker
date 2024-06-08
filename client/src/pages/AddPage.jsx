import React, { useEffect, useState } from 'react'
import { useUser } from '../context/UserContext'
import {useSearchParams, useNavigate} from 'react-router-dom'

const AddPage = () => {

    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState('')
    const [newCategory, setNewCategory] = useState('')
    const [amt, setAmt] = useState('')
    const [description, setDescription] = useState('')
    const [expense, setExpense] = useState(null)
    const [loading, setLoading] = useState(false)

    // const {setLoading} = useUser()

    const navigate = useNavigate()

    const [params] = useSearchParams()

    const updateExists = params.get("update")

    const token = localStorage.getItem("token")

    useEffect(() => {
        const temp = async () => {
            const res = await fetch("/api/category/all", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
            const data = await res.json()
            if (!data.error) setCategories(data?.categories)
        }
        temp()
    }, [newCategory])

    useEffect(() => {
        const temp = async () => {
            const res = await fetch(`/api/expense/${updateExists}`, {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
            const data = await res.json()
            console.log("single", data)
            if(res.ok) setExpense(data)
            // if (!data.error) setCategories(data?.categories)
        }
        temp()
    }, [updateExists])

    const obj = {
        amt: Number(amt), 
        description,
        category
    }

    const handleSubmitExp = async(e) => {
        e.preventDefault()
        try {
            // console.log(JSON.stringify(obj))
            const res = await fetch('/api/expense/create', {
                method: "POST",
                body: JSON.stringify(obj),
                headers: {
                  "content-type": "application/json",
                  "authorization": "Bearer " + token
                }
              })
              if(res.ok) {
                setCategory('')
                setAmt('')
                setDescription('')
                navigate('/expenses')
              }
            // const data = await res.json()
        } catch (error) {
            console.log(error)
        }
    }

    const updateSubmitExp = async(e) => {
        e.preventDefault()
        try {
            // console.log(JSON.stringify(obj))
            const res = await fetch(`/api/expense/update/${updateExists}`, {
                method: "PUT",
                body: JSON.stringify({
                    amt: expense?.amt,
                    description: expense?.description,
                    category: expense?.category
                }),
                headers: {
                  "content-type": "application/json",
                  "authorization": "Bearer " + token
                }
              })
              if(res.ok) {
                console.log("updated")
                navigate('/expenses')
              }
            // const data = await res.json()
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = e => {
        setExpense({
            ...expense,
            [e.target.name]: e.target.value
        })
    }

    console.log(setLoading)

    const handleSubmitCat = async(e) => {
        e.preventDefault()
        setLoading(true)
        try {
            // console.log(JSON.stringify(obj))
            const res = await fetch('/api/category/create', {
                method: "POST",
                body: JSON.stringify({
                    name: newCategory
                }),
                headers: {
                  "content-type": "application/json",
                  "authorization": "Bearer " + token
                }
              })
              if(res.ok) {
                setNewCategory('')
                // setLoading(false)
              }
            // const data = await res.json()
        } catch (error) {
            console.log(error)
            // setLoading(false)
        } finally {
            setLoading(false)
        }
    }

    console.log(amt, description, category)
    // console.log('params', params.entries())
    // for(let entry of params.entries()) {
    //     console.log(entry)
    // }

    console.log(expense)

    return (
        <div className='flex gap-20'>

            {/* add expense */}
            {!updateExists && <div className=' p-10 shadow-md border-r-2 border-red-200 rounded-md'>
                <h2 className='font-semibold mb-4 text-xl'>Add New Expense</h2>
                <form onSubmit={handleSubmitExp} className='flex flex-col gap-5 rounded-md'>
                    <label htmlFor="">
                        Amount
                    </label>
                    <input value={amt} onChange={e => setAmt(e.target.value)} className='p-1 border border-red-200 rounded-sm' type="number" name="" id="" />
                    <label htmlFor="">Description</label>
                    <textarea value={description} onChange={e => setDescription(e.target.value)} className='p-1 border border-red-200 rounded-sm' rows={5} cols={20} />
                    <label htmlFor="">Category</label>
                    <select value={category} onChange={e => setCategory(e.target.value)}>
                        <option value="" disabled>Select</option>
                        {categories && categories.map(cat => (
                            <option value={cat._id}>{cat.name}</option>
                        ))}
                    </select>
                    {/* <select value="">
                            <option value="" disabled>Select</option>
                            <option value="food">Food</option>
                            <option value="food">Food</option>
                            <option value="food">Food</option>
                        </select> */}
                    <button type="submit" className='border-2 p-2 border-red-300 rounded-md hover:bg-red-300 hover:text-white'>Save</button>
                </form>
            </div>}
            {/* update expense */}
            {updateExists && <div className=' p-10 shadow-md border-r-2 border-red-200 rounded-md'>
                <h2 className='font-semibold mb-4 text-xl'>Update Expense</h2>
                <form onSubmit={updateSubmitExp} className='flex flex-col gap-5 rounded-md'>
                    <label htmlFor="">
                        Amount
                    </label>
                    <input value={expense?.amt} onChange={handleChange} className='p-1 border border-red-200 rounded-sm' type="number" name="amt" id="" />
                    <label htmlFor="">Description</label>
                    <textarea name='description' value={expense?.description} onChange={handleChange} className='p-1 border border-red-200 rounded-sm' rows={5} cols={20} />
                    <label htmlFor="">Category</label>
                    <select name='category' value={expense?.category} onChange={handleChange}>
                        <option value="" disabled>Select</option>
                        {categories && categories.map(cat => (
                            <option value={cat._id}>{cat.name}</option>
                        ))}
                    </select>
                    <button type="submit" className='border-2 p-2 border-red-300 rounded-md hover:bg-red-300 hover:text-white'>Save</button>
                </form>
            </div>}
            {/* add category */}
            {!updateExists && <div className=' p-10 shadow-md border-l-2 border-red-200 rounded-md'>
                <form onSubmit={handleSubmitCat} className='flex flex-col justify-center h-full gap-5 rounded-md'>
                    <h2 className='font-semibold mb-4 text-xl'>Add New Category</h2>
                    <label htmlFor="">
                        Name
                    </label>
                    <input value={newCategory} onChange={e => setNewCategory(e.target.value)} className='p-1 border border-red-200 rounded-sm' type="text" name="" id="" />
                    <button disabled={loading} className='border-2 p-2 border-red-300 rounded-md hover:bg-red-300 hover:text-white' type='submit'>Save</button>
                </form>
                {loading && <p className='text-md text-red-400 font-bold text-center'>saving new category...</p>}
            </div>}
        </div>
    )
}

export default AddPage