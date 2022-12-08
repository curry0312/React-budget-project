import React from 'react'
import { useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'
import useLocalStorge from '../hooks/useLocalStorge'

const ExpenseContext = React.createContext()

export function useExpense() {
   return useContext(ExpenseContext)
}

const EXPENSE_LOCALSTORGE_KEY = 'expense'

export default function ExpenseProvider({children}) {
    const [expenses, setExpenses] = useLocalStorge(EXPENSE_LOCALSTORGE_KEY, [])

    function addExpense(budgetId, description, amount) {
        setExpenses(prevExpense => {
            return [...prevExpense, { id: uuidv4(), budgetId: budgetId, description: description, amount: amount}]
        })
    }
    function deleteExpense(ExpenseId) {
        setExpenses(prevExpense => {
            return prevExpense.filter(eachExpense => {
                return eachExpense.id !== ExpenseId
            })
        })
    }
    function clearExpense(BudgetId) {
        setExpenses(prevExpense => {
            return prevExpense.filter(eachExpense => {
                return eachExpense.budgetId !== BudgetId
            })
        })
    }

    function integrateExpense(budget) {
        const budgetTargetArray = expenses.filter(expense => {
            return expense.budgetId === budget.id
          })
        const budgetExpenseArray = budgetTargetArray.map(e => {
            return parseFloat(e.amount)
        })
        const budgetExpenseTotal = budgetExpenseArray.reduce((total, each) => {
            return total = total + each
        },0) 
        return budgetExpenseTotal
    }
    
    return (
        <ExpenseContext.Provider value={{
            expenses,
            addExpense,
            deleteExpense,
            clearExpense,
            integrateExpense,
        }}>
            {children}
        </ExpenseContext.Provider>
    )
}
