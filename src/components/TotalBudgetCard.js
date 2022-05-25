import React from 'react'
import BudgetContainer from './BudgetContainer'
import { useBudgets } from '../contexts/BudgetsContext'

export default function TotalBudgetCard() {
	const { expenses, budgets } = useBudgets()
	const amount = expenses.reduce((total, expense) => total + expense.amount, 0)
	const max = budgets.reduce((total, budget) => total + budget.max, 0 )
	if (max === 0) return null

	return ( <BudgetContainer amount={amount} name="Total " gray max={max} hideButtons/> )
}





