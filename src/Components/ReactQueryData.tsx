import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'


const fetchData = async () => {
    const res = await axios.get('http://localhost:4000/cards')
    return res.data
}

export const ReactQueryData = () => {
    return useQuery({
        queryKey: ['cards'],
        queryFn: fetchData,

    })
}
