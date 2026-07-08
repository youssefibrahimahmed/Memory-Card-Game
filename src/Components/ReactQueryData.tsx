import { useQuery } from '@tanstack/react-query'
import axios from 'axios'


const fetchData = async () => {
    const res = await axios.get("/cards.json")
    return res.data
}

export const ReactQueryData = () => {
    return useQuery({
        queryKey: ['cards'],
        queryFn: fetchData,

    })
}
