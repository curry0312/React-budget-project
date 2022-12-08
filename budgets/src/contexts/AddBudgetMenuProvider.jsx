import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'

const AddBudgetMenuContext = React.createContext()

export function useAddBudgetMenu() {
    return useContext(AddBudgetMenuContext)
}

export default function AddBudgetMenuProvider({children}) {

    const [addBudgetMenuState, setaddBudgetMenuState] = useState(false)

    function ShowAddBudgetMenu() {
        setaddBudgetMenuState(true)
    }

    function CloseAddBudgetMenu() {
        setaddBudgetMenuState(false)
    }

    return (
        <AddBudgetMenuContext.Provider value={{
            addBudgetMenuState,
            ShowAddBudgetMenu,
            CloseAddBudgetMenu,
        }}>
            {children}
        </AddBudgetMenuContext.Provider>
    )
}
