import { PieChart, Pie, Tooltip } from 'recharts'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

let dummy = [
  {
    description: "test",
    amt: 3000
  },
  {
    description: "test2",
    amt: 2000
  },
  {
    description: "test3",
    amt: 2700
  },
  {
    description: "test4",
    amt: 1500
  },
  {
    description: "test5",
    amt: 3200
  },
]

dummy = dummy.map(item => (
  {
    ...item,
    name: item.description,
  }

))

const Homepage = () => {
  const [expenses, setExpenses] = useState(null)

  const token = localStorage.getItem("token")

  useEffect(() => {
    const temp = async () => {
      try {
        const res = await fetch('/api/expense/month', {
          headers: {
            "authorization": "Bearer " + token
          }
        })
        if (res.ok) {
          const data = await res.json()
          console.log(data)
          const newData = data?.map(item => ({
            amt: item.amt,
            description: item.description,
            name: item.category.name,
            createdOn: new Date(item.createdAt).toLocaleDateString()
          }))
          setExpenses(newData)
        }
      } catch (error) {
        console.log(error)
      }
    }
    temp()
  }, [])

  console.log(expenses)

  return (
    <div className='p-4 h-[100%] rounded-md shadow-md'>
      <h1 className='text-center text-2xl text-slate-600 mb-10 p-2 border-b-2 border-red-500'>You've spent in this month</h1>
      <div className='flex items-center'>
      
        <div className='mr-10 border-r-2 border-red-300'>
        {expenses?.length === 0 && (
            <p className='text-center'>No current expenses, add one to proceed!</p>
          )}
          <PieChart width={400} height={400}>
            <Pie
              dataKey="amt"
              isAnimationActive={true}
              // data={dummy}
              data={expenses ? expenses : []}
              cx="50%"
              cy="50%"
              outerRadius={60}
              fill="#695828"
              label
            />
            {/* <Pie dataKey="value" data={data02} cx={500} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d" /> */}
            <Tooltip />
          </PieChart>
        </div>
        
        <div className='flex gap-20 flex-wrap'>
          
          {expenses && expenses.map(exp => (
            <div className='flex border gap-2 border-red-300 p-2 flex-col w-[200px] shadow-md h-[170px] items-center justify-center rounded-md'>
              <h2 className='font-bold text-xl'>{exp.name}</h2>
              <hr className="w-full" />
              <p>Spent: &#8377; {exp.amt ? exp.amt : "not spent"}</p>
              <p>on: {exp.createdOn}</p>
              <p className='text-xs text-center text-gray-500'>{exp.description}</p>
            </div>
          ))}
          {/* <div className='flex border gap-2 border-red-300 p-2 flex-col w-[200px] shadow-md h-[170px] items-center justify-center rounded-md'>
            <h2 className='font-bold text-xl'>Food</h2>
            <hr className="w-full"/>
            <p>Spent: 3000</p>
            <p>on: test-expense</p>
            <p className='text-xs text-center text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. In, tempore.</p>
          </div>
          <div className='flex border gap-2 border-red-300 p-2 flex-col w-[200px] shadow-md h-[170px] items-center justify-center rounded-md'>
            <h2 className='font-bold text-xl'>Food</h2>
            <hr className="w-full"/>
            <p>Spent: 3000</p>
            <p>on: test-expense</p>
            <p className='text-xs text-center text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. In, tempore.</p>
          </div>
          <div className='flex border gap-2 border-red-300 p-2 flex-col w-[200px] shadow-md h-[170px] items-center justify-center rounded-md'>
            <h2 className='font-bold text-xl'>Food</h2>
            <hr className="w-full"/>
            <p>Spent: 3000</p>
            <p>on: test-expense</p>
            <p className='text-xs text-center text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. In, tempore.</p>
          </div>
          <div className='flex border gap-2 border-red-300 p-2 flex-col w-[200px] shadow-md h-[170px] items-center justify-center rounded-md'>
            <h2 className='font-bold text-xl'>Food</h2>
            <hr className="w-full"/>
            <p>Spent: 3000</p>
            <p>on: test-expense</p>
            <p className='text-xs text-center text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. In, tempore.</p>
          </div> */}
          <div className='flex border text-center text-4xl gap-2 border-red-300 p-2 flex-col w-[200px] shadow-md h-[170px] items-center justify-center rounded-md'>

            <Link to="/new" ><span className='border text-gray-600 border-red-500 rounded-full px-6 py-5 hover:bg-red-200 flex items-center justify-center'>&#10010;</span></Link>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Homepage