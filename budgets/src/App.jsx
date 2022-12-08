import './assets/App.css'
import { useState } from 'react'
import {Container, Stack, Button} from 'react-bootstrap'
import BudgetCard from './component/BudgetCard'
import AddBudgetMenu from './component/AddBudgetMenu'
import { useAddBudgetMenu } from './contexts/AddBudgetMenuProvider'
import { useBudget } from './contexts/BudgetProvider'
import AddExpenseMenu from './component/AddExpenseMenu'
import { useAddExpenseMenu } from './contexts/AddExpenseMenuProvider'
import { useExpense } from './contexts/ExpenseProvider'
import ViewExpenseMenu from './component/ViewExpenseMenu'

// localStorage.clear()

function App() {

  const [defaultBudgetId, setDefaultBudgetId] = useState('')
  const [viewExpenseBudegtId, setViewExpenseBudgetId] = useState('')

  const {budgets} = useBudget()
  const {integrateExpense} = useExpense()
  const {ShowAddBudgetMenu} = useAddBudgetMenu()
  const {ShowAddExpenseMenu} = useAddExpenseMenu()

  function handleShowAddBudgetMenu() {
    ShowAddBudgetMenu()
  }
  
  function handleShowAddExpenseMenu() {
    ShowAddExpenseMenu()
  }

  return (
    <>
    <Container className='my-4'>
      <Stack direction='horizontal' className='justify-content-between'>
        <h1>Budgets</h1>
        <Stack direction='horizontal' gap={2}>
          <Button variant='primary' onClick={()=>handleShowAddBudgetMenu()}>Add Budget</Button>
          <Button variant='outline-primary' onClick={()=>handleShowAddExpenseMenu()}>Add Expense</Button>
        </Stack>
      </Stack>
      <div style={{
        display:"grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "1rem",
        alignItems: "flex-start",
      }}>
        {budgets.map(budget => {
          const amount = integrateExpense(budget) 
          return <BudgetCard 
          key={budget.id}
          budgetId={budget.id}
          name={budget.name}  
          max={budget.max}
          amount={amount}

          setDefaultBudgetId={setDefaultBudgetId}
          setViewExpenseBudgetId={setViewExpenseBudgetId}
          />
        })}
      </div>
    </Container>

    {/*Default: hide*/}
    <AddBudgetMenu />
    <AddExpenseMenu defaultBudgetId={defaultBudgetId}/>
    <ViewExpenseMenu viewExpenseBudegtId={viewExpenseBudegtId}/>
    </>
  )
}

export default App
