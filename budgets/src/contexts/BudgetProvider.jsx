import React from 'react'
import { useContext } from 'react'
import useLocalStorge from '../hooks/useLocalStorge'
import { v4 as uuidv4 } from 'uuid';

const BudgetContext = React.createContext()

const BUDGET_LOCALSTORGE_KEY = 'budegts'

export function useBudget() {
  return useContext(BudgetContext)
}

export default function BudgetProvider({children}) {
  const [budgets, setBudegts] = useLocalStorge(BUDGET_LOCALSTORGE_KEY, [])

  function addBudget(name, max) {
    setBudegts(prevBudget => {return [...prevBudget, {id: uuidv4() , name: name, max: max}]})
  }

  function deleteBudget(budgetId) {
    setBudegts(prevBudget => {
      return prevBudget.filter(eachBudget => {
        return eachBudget.id !== budgetId} 
      )})
  }
  
  return (
    <>
      <BudgetContext.Provider value={{
        budgets,
        addBudget,
        deleteBudget,
      }}>
        {children}
      </BudgetContext.Provider>
    </>
  )
}
