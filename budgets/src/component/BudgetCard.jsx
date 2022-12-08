import React, {} from 'react'
import { Card, Stack, Button, ProgressBar } from 'react-bootstrap'
import { useAddExpenseMenu } from '../contexts/AddExpenseMenuProvider'
import { useBudget } from '../contexts/BudgetProvider'
import { useExpense } from '../contexts/ExpenseProvider'
import { useViewExpenseMenu } from '../contexts/ViewExpenseMenuProvider'
import { currencyFormmatter } from '../util/utli'


export default function BudgetCard({name, amount, max, budgetId, setDefaultBudgetId, setViewExpenseBudgetId}) {

    const {ShowAddExpenseMenu} = useAddExpenseMenu()
    const {ShowViewExpenseMenu} = useViewExpenseMenu()
    const {budgets, deleteBudget} = useBudget()
    const {expenses, clearExpense} = useExpense()
    
    function handleAddExpense() {
        ShowAddExpenseMenu()
        setDefaultBudgetId(budgetId)
    }

    function handleViewExpense() {
        ShowViewExpenseMenu()
        setViewExpenseBudgetId(budgetId)
    }

    function handleDeleteBudget() {
        deleteBudget(budgetId)
        clearExpense(budgetId)
        setViewExpenseBudgetId('')
    }

    const className = []
    if(amount/max > .5) {
        className.push("bg-warning bg-opacity-10")
    }
    if(amount > max) {
        className.push("bg-danger bg-opacity-10")
    }

    return (
    <>
    <Card className={className.join(' ')}>
        <Card.Body>
            <Card.Title className='fw-normal d-flex justify-content-between align-items-baseline mb-3'>
                <div>{name}</div>
                <div className='d-flex align-items-baseline'>
                    <span className='me-1'>
                        {currencyFormmatter.format(amount)}
                    </span>
                    /
                    <span className='text-muted fs-6 ms-1'>
                        {currencyFormmatter.format(max)}
                    </span>
                </div>
            </Card.Title>

            <ProgressBar 
                className='rounded-pill mb-3' 
                variant={getProgressBarVariant({amount, max})}
                min={0}
                max={max}
                now={amount}
            />

            <Stack direction='horizontal' className='d-flex justify-content-between' gap={2}>
                <div className='d-flex'>
                    <Button variant='primary'className='me-1' onClick={()=>handleAddExpense()}>Add Expense</Button>
                    <Button variant='outline-secondary' onClick={()=>handleViewExpense()}>View Expense</Button>
                </div>
                <div>
                    <Button variant='outline-danger' onClick={()=>handleDeleteBudget()}>Delete Budget</Button>
                </div>
            </Stack>

        </Card.Body>
    </Card>
    </>
    )
}

function getProgressBarVariant({amount, max}) {
    const ratio = amount / max
    if(ratio < .5) return "primary"
    if(ratio < .75) return "warning"
    return "danger"
}
