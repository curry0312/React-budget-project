import React from 'react'
import { useRef } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useAddExpenseMenu } from '../contexts/AddExpenseMenuProvider'
import { useBudget } from '../contexts/BudgetProvider'
import { useExpense } from '../contexts/ExpenseProvider'

export default function AddExpenseMenu({defaultBudgetId}) {

  const {budgets} = useBudget()
  const {addExpense} = useExpense()
  const {addExpenseMenuState, CloseAddExpenseMenu} = useAddExpenseMenu()

  const descriptionInputRef = useRef()
  const amountInputRef = useRef()
  const selectBudgetInputRef = useRef()

  function handleSubmit() {
    addExpense(selectBudgetInputRef.current.value, descriptionInputRef.current.value, amountInputRef.current.value)
    CloseAddExpenseMenu()
  }
  function handleClose() {
    CloseAddExpenseMenu()
  }
  return (
    <Modal show={addExpenseMenuState} onHide={()=>handleClose()}>
      <Modal.Header closeButton>
        <Modal.Title>New Expense</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>

          <Form.Group controlId='description'>
            <Form.Label>Description</Form.Label>
            <Form.Control ref={descriptionInputRef} required/>
          </Form.Group>

          <Form.Group className='mt-3' controlId='amount'>
            <Form.Label>Amount</Form.Label>
            <Form.Control ref={amountInputRef} required/>
          </Form.Group>

          <Form.Group className='mt-3' controlId='budget'>
            <Form.Label>Budget</Form.Label>
            <Form.Select 
            ref={selectBudgetInputRef}
            defaultValue={defaultBudgetId}
            >
              {budgets.map(budget => {
                return <option key={budget.id} value={budget.id}>{budget.name}</option>
              })}
            </Form.Select>
          </Form.Group>

          <div className='d-flex justify-content-end mt-4'>
            <Button type='submit'>Add</Button>
          </div>

        </Form>
      </Modal.Body>
    </Modal>
  )
}
