import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'

const dummy = [
    {
        amt: 2000,
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem, provident?',
        category: "Food",
        createdOn: '2024/06/07'
    },
    {
        amt: 2000,
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem, provident?',
        category: "Food",
        createdOn: '2024/06/07'
    },
    {
        amt: 2000,
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem, provident?',
        category: "Food",
        createdOn: '2024/06/07'
    },
    {
        amt: 2000,
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem, provident?',
        category: "Food",
        createdOn: '2024/06/07'
    },
]

const Expenses = () => {

    const [expenses, setExpenses] = useState(null)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const token = localStorage.getItem("token")

    useEffect(() => {
        const temp = async () => {
            try {
                const res = await fetch("/api/expense/all", {
                    headers: {
                        "authorization": "Bearer " + token
                    }
                })
                if (res.ok) {
                    const data = await res.json()
                    setExpenses(data?.expenses)
                }
            } catch (error) {
                console.log(error)
            }
        }
        temp()
    }, [loading])

    console.log('expenses', expenses)

    const returnDate = (date) => new Date(date).toLocaleDateString()

    const deleteExpense = async (id) => {
        setLoading(true)
        try {
            const res = await fetch(`/api/expense/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "authorization": "Bearer " + token
                }
            })
            if (res.ok) {

            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <table className='table-auto'>
                <thead className=''>
                    <tr className=''>
                        <th className='bg-red-100 px-8 py-4 border border-red-300'>Amount</th>
                        <th className='bg-red-100 px-8 py-4 border border-red-300'>Description</th>
                        <th className='bg-red-100 px-8 py-4 border border-red-300'>Category</th>
                        <th className='bg-red-100 px-8 py-4 border border-red-300'>Created On</th>
                        <th className='bg-red-100 px-8 py-4 border border-red-300'>Operations</th>
                    </tr>
                </thead>
                <tbody>

                    {expenses && expenses.map(item => (
                        <tr>
                            <td className='px-8 py-4 border border-red-300'>{item.amt}</td>
                            <td className='px-8 py-4 border border-red-300'>{item.description}</td>
                            <td className='px-8 py-4 border border-red-300'>{item.category.name}</td>
                            <td className='px-8 py-4 border border-red-300'>{returnDate(item.createdAt)}</td>
                            <td className='px-8 py-4 border flex gap-4 border-red-300'>
                                <button disabled={loading} onClick={() => navigate(`/new?update=${item._id}`)} className='text-blue-500 font-bold text-2xl'>&#9998;</button>
                                <button disabled={loading} onClick={() => deleteExpense(item._id)} className='font-bold text-2xl'>&#128465;</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {expenses?.length === 0 && (

                <p className='text-center mt-2'>No expenses recorded!</p>

            )}
            {loading && <Loader />}

        </div>
    )
}

export default Expenses