import React from 'react'
import { Form, Modal, Button, ModalHeader } from 'react-bootstrap'
import { useRef } from 'react'
import { useBudgets, GENERAL_BUDGET_ID } from '../contexts/BudgetsContext'
import { AnimatedButton } from '../App'


export default function AddExpenseModal({ show, handleClose, defaultBudgetId }) {
	const descriptionRef = useRef()
	const amountRef = useRef(0)
	const budgetIdRef = useRef()
	const { addExpense, budgets } = useBudgets()

	function handleSubmit(e) {
		e.preventDefault()
		addExpense(
			{
				description: descriptionRef.current.value,
				amount: parseFloat(amountRef.current.value),
				budgetId: budgetIdRef.current.value,
			})
		handleClose()
	}

	return (
		<Modal show={show} onHide={handleClose}>
			<Form onSubmit={handleSubmit}>
				<ModalHeader closebutton>
					<Modal.Title> New Expense </Modal.Title>
				</ModalHeader>
				<Modal.Body>
					<Form.Group className="mb-3" controlId="description">
						<Form.Label> Description </Form.Label>
						<Form.Control ref={descriptionRef} type="text" required />
					</Form.Group>
					<Form.Group className="mb-3" controlId="amount">
						<Form.Label> Amount </Form.Label>
						<Form.Control ref={amountRef} type="number" required min={0} step={0.01} />
					</Form.Group>
					<Form.Group className="mb-3" controlId="budgetId">
						<Form.Label> Budget </Form.Label>
						<Form.Select 
							defaultValue={defaultBudgetId} 
							ref={budgetIdRef}>
							<option id={GENERAL_BUDGET_ID}>
								{GENERAL_BUDGET_ID}
							</option>
							{budgets.map(budget =>
								<option key={budget.id} value={budget.id}>
									{budget.name}
								</option>
							)}
						</Form.Select>
					</Form.Group>
					<div className="d-flex justify-content-end">
						<AnimatedButton variant="primary" type="submit">
							Add
						</AnimatedButton>
					</div>
				</Modal.Body>
			</Form>
		</Modal >
	)
}
