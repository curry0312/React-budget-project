import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'

const ViewExpenseMenuContext = React.createContext()

export function useViewExpenseMenu() {
    return useContext(ViewExpenseMenuContext)
}

export default function ViewExpenseMenuProvider({children}) {

    const [viewExpenseMenuState, setViewExpenseMenuState] = useState(false)

    function ShowViewExpenseMenu() {
        setViewExpenseMenuState(true)
    }

    function CloseViewExpenseMenu() {
        setViewExpenseMenuState(false)
    }

    return (
        <ViewExpenseMenuContext.Provider value={{
            viewExpenseMenuState,
            ShowViewExpenseMenu,
            CloseViewExpenseMenu,
        }}>
            {children}
        </ViewExpenseMenuContext.Provider>
    )
}