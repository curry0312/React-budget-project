import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'

const AddExpenseMenuContext = React.createContext()

export function useAddExpenseMenu() {
    return useContext(AddExpenseMenuContext)
}

export default function AddExpenseMenuProvider({children}) {

    const [addExpenseMenuState, setaddExpenseMenuState] = useState(false)

    function ShowAddExpenseMenu() {
        setaddExpenseMenuState(true)
    }

    function CloseAddExpenseMenu() {
        setaddExpenseMenuState(false)
    }

    return (
        <AddExpenseMenuContext.Provider value={{
            addExpenseMenuState,
            ShowAddExpenseMenu,
            CloseAddExpenseMenu,
        }}>
            {children}
        </AddExpenseMenuContext.Provider>
    )
}