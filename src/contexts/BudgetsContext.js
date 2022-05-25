import React, { useContext } from "react";
import { v4 as uuidV4 } from "uuid"
import useLocalStorage from "../hooks/useLocalStorage";

const BudgetsContext = React.createContext()

export const GENERAL_BUDGET_ID = "General"

export function useBudgets() {
	return useContext(BudgetsContext)
}

export const BudgetsProvider = ({ children }) => {
	const [budgets, setBudgets] = useLocalStorage("budgets", [])
	const [expenses, setExpenses] = useLocalStorage("expenses", [])

	function getBudgetExpenses(budgetId) {
		return expenses.filter(expense => expense.budgetId === budgetId)
	}

	function addExpense({ description, amount, budgetId }) {
		setExpenses(expenses => {
			return [...expenses, { id: uuidV4(), description, amount, budgetId }]
		})

	}

	function addBudget({ name, max }) {
		setBudgets(budgets => {
			if (budgets.find(budget => budget.name === name)) {
				return budgets
			}
			return [...budgets, { id: uuidV4(), name, max }]
		})
	}

	function deleteBudget({ id }) {
		setExpenses(expenses => {
			return expenses.map(expense => {
				if (expense.budgetId !== id) return expense
				return { ...expense, budgetId: GENERAL_BUDGET_ID }
			})
		})

		setBudgets(budgets => {
			return budgets.filter(budget => budget.id !== id)
		})
	}

	function deleteExpense({ id }) {
		setExpenses(expenses => {
			return expenses.filter(expense => expense.id !== id)
		})
	}


	return <BudgetsContext.Provider value={{
		budgets,
		expenses,
		getBudgetExpenses,
		addExpense,
		addBudget,
		deleteBudget,
		deleteExpense
	}}>
		{children}
	</BudgetsContext.Provider>
}