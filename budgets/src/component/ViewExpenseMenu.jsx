import React from 'react'
import { Modal, Stack, Button } from 'react-bootstrap'
import { useBudget } from '../contexts/BudgetProvider'
import { useExpense } from '../contexts/ExpenseProvider'
import { useViewExpenseMenu } from '../contexts/ViewExpenseMenuProvider'
import { currencyFormmatter } from '../util/utli'


export default function ViewExpenseMenu({viewExpenseBudegtId}) {

    const {budgets} = useBudget()
    const {expenses, deleteExpense} = useExpense()
    const {viewExpenseMenuState, CloseViewExpenseMenu} = useViewExpenseMenu()

    function handleClose() {
        CloseViewExpenseMenu()
    }
    function handleDelete(ExpenseId) {
        deleteExpense(ExpenseId)
    }

    const expenseBudgetName = budgets.filter(budget => {
        if(viewExpenseBudegtId === '') return budget
        if(viewExpenseBudegtId !== '') return budget.id === viewExpenseBudegtId
    })
    console.log(viewExpenseBudegtId)
    console.log(expenseBudgetName)

    return (
        <Modal show={viewExpenseMenuState} onHide={()=>handleClose()}>
            <Modal.Header closeButton>
                <Modal.Title>{`Expense-${viewExpenseBudegtId === '' ? '' : expenseBudgetName[0].name}`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {expenses.map(expense => {
                    if(expense.budgetId === viewExpenseBudegtId){
                        return <Stack direction='horizontal' key={expense.id} className='d-flex justify-content-between my-3 fs-4'>
                                    <div>{expense.description}</div>
                                    <div className='d-flex align-items-baseline'>
                                        <div className='me-3'>{currencyFormmatter.format(expense.amount)}</div>
                                        <Button variant='outline-danger' onClick={()=>handleDelete(expense.id)}>x</Button>
                                    </div>
                                </Stack>
                    }
                })}
            </Modal.Body>
        </Modal>
    )
}
