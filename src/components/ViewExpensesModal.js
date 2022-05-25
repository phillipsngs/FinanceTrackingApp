import React from 'react'
import { Modal, ModalHeader, Stack } from 'react-bootstrap'
import { GENERAL_BUDGET_ID, useBudgets } from '../contexts/BudgetsContext'
import { currencyFormatter } from '../utils'
import { AnimatedButton } from '../App'

export default function ViewExpensesModal({ budgetId, handleClose }) {
	const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } = useBudgets()
	const expenses = getBudgetExpenses(budgetId)

	const budget = GENERAL_BUDGET_ID === budgetId ? {
		name: "General",
		id: GENERAL_BUDGET_ID
	} : budgets.find(b => b.id === budgetId)


	return (
		<Modal show={budgetId != null} onHide={handleClose}>
			<ModalHeader closebutton>
				<Modal.Title>
					<Stack direction="horizontal" gap="2">
						<div> Expenses - {budget?.name}  </div>
						{budgetId !== GENERAL_BUDGET_ID && (
							<AnimatedButton onClick={() => {
								deleteBudget(budget)
								handleClose()
							}} variant="outline-danger"> Delete </AnimatedButton>
						)}
					</Stack>
				</Modal.Title>
			</ModalHeader>
			<Modal.Body>
				<Stack direction="vertical" gap="3">
					{expenses.map(expense => (
						<Stack direction="horizontal" gap="3" key={expense.id}>
							<div className="me-auto fs-4"> {expense.description} </div>
							<div className="fs-5"> {currencyFormatter.format(expense.amount)}  </div>
							<AnimatedButton size="sm" variant="outline-danger" onClick={() => deleteExpense(expense)}>&times;</AnimatedButton>
						</Stack>
					))}
				</Stack>
			</Modal.Body>
		</Modal>
	)
}

