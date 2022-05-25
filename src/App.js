import { Container, Stack, Button } from "react-bootstrap"
import styled from "styled-components";
import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from "./components/AddExpenseModal";
import BudgetContainer from "./components/BudgetContainer";
import { useState } from "react";
import { GENERAL_BUDGET_ID, useBudgets } from "./contexts/BudgetsContext";
import GeneralBudgetCard from "./components/GeneralBudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";
import ViewExpensesModal from "./components/ViewExpensesModal";

const Layout = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	gap: 2rem;
	alignItems: flex-start;
`;

export const AnimatedButton = styled(Button)`
	&:hover {
		transform: scale(1.1);
	}

	&:active {
		transform: scale(0.5);
		transition: transform 0.5s linear;
	}
`;


function App() {
	const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
	const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
	const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState()
	const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()

	const { budgets, getBudgetExpenses } = useBudgets()

	function openAddExpenseModal(budgetId) {
		setShowAddExpenseModal(true)
		setAddExpenseModalBudgetId(budgetId)
	}

	return (
		<>

			<Container className="my-4">
				<Stack direction="horizontal" gap="2" className="mb-4">
					<h1 className="me-auto">Expenses</h1>
					<AnimatedButton variant="dark" onClick={() => setShowAddBudgetModal(true)}> Add Budget </AnimatedButton>
					<AnimatedButton variant="outline-primary" onClick={openAddExpenseModal}> Add Expense </AnimatedButton>
				</Stack>
				<Layout>
					{
						budgets.map(budget => {
							const amount = getBudgetExpenses(budget.id).reduce(
								(total, expense) => total + expense.amount, 0
							)
							return (
								<BudgetContainer
									name={budget.name}
									key={budget.id}
									amount={amount}
									max={budget.max}
									openAddExpenseClick={() => openAddExpenseModal(budget.id)}
									onViewExpensesClick={() => setViewExpensesModalBudgetId(budget.id)}

								/>)
						})
					}
					<GeneralBudgetCard openAddExpenseClick={openAddExpenseModal} onViewExpensesClick={() => setViewExpensesModalBudgetId(GENERAL_BUDGET_ID)} />
					<TotalBudgetCard />
				</Layout>
			</Container>
			<AddBudgetModal
				show={showAddBudgetModal}
				handleClose={() => setShowAddBudgetModal(false)}
			/>

			<AddExpenseModal
				show={showAddExpenseModal}
				defaultBudgetId={addExpenseModalBudgetId}
				handleClose={() => setShowAddExpenseModal(false)}
			/>

			{
				viewExpensesModalBudgetId &&
				<ViewExpensesModal
					budgetId={viewExpensesModalBudgetId}
					handleClose={() => setViewExpensesModalBudgetId()}
				/>

			}

		</>

	);
}

export default App;
