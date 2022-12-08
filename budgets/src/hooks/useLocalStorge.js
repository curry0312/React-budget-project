import { useEffect, useState } from "react";

export default function useLocalStorge(key, defaultValue) {
    const [value, setValue] = useState(()=>{
        const JsonValue = localStorage.getItem(key)

        if(JsonValue !== null) return JSON.parse(JsonValue)
        return defaultValue
    })

    useEffect(()=>{
        localStorage.setItem(key, JSON.stringify(value))
    },[key, value])

    return [value, setValue]
}