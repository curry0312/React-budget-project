import React from 'react'
import { useRef } from 'react'
import { Form, FormGroup, Modal, Button } from 'react-bootstrap'
import { useAddBudgetMenu } from '../contexts/AddBudgetMenuProvider'
import { useBudget } from '../contexts/BudgetProvider'


export default function AddBudgetMenu() {

    const {addBudgetMenuState, CloseAddBudgetMenu} = useAddBudgetMenu()
    const {addBudget} = useBudget()

    const nameInputRef = useRef()
    const maxInputRef = useRef()

    function handleClose() {
        CloseAddBudgetMenu()
    }

    function handleSubmit(e) {
        addBudget(nameInputRef.current.value, maxInputRef.current.value)
        CloseAddBudgetMenu()
    }

    return (
        <Modal show={addBudgetMenuState} onHide={()=>handleClose()}>
            <Modal.Header closeButton>
                <Modal.Title>New Budget</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <FormGroup className='mb-3' controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='text' ref={nameInputRef} required />
                    </FormGroup>
                    <FormGroup controlId='number'>
                        <Form.Label>Maximum Spending</Form.Label>
                        <Form.Control type='number' ref={maxInputRef} min={0} required/>
                    </FormGroup>
                    <div className='d-flex mt-3 justify-content-end'>
                        <Button className='primary' type='submit'>Add</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
