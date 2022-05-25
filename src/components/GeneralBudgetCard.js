import React from 'react'
import BudgetContainer from './BudgetContainer'
import { GENERAL_BUDGET_ID, useBudgets } from '../contexts/BudgetsContext'

export default function GeneralBudgetCard(props) {
	const { getBudgetExpenses } = useBudgets()

	const amount = getBudgetExpenses(GENERAL_BUDGET_ID).reduce(
		(total, expense) => total + expense.amount,
		0
	)

	if (amount === 0) return null

	return (
		<BudgetContainer amount={amount} name="general " gray {...props} />
	)
}
