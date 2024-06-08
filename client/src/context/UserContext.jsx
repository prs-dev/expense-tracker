import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext()

export const useUser = () => {
    const {user, setUser, loading, setLoading} = useContext(UserContext)
    return {user, setUser, loading, setLoading}
}

export const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)

    const token = localStorage.getItem("token")

    useEffect(() => {
        const temp = async() => {
            // setLoading(true)
            try {
                const res = await fetch('/api/user', {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                })
                const data = await res.json()
                // console.log("data", data)
                if (data.error) {

                } else {
                    setUser(data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        temp()
    }, [loading])

    console.log(user)
    return (
        <UserContext.Provider value={{user, setUser, loading, setLoading}}>
            {children}
        </UserContext.Provider>
    )
}