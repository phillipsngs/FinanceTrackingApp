import React from 'react'
import { Card, ProgressBar, Stack, Button } from 'react-bootstrap'
import { currencyFormatter } from '../utils'
import { AnimatedButton } from '../App'
import styled from "styled-components";


const AnimatedCard = styled(Card)`
	&:hover {
		transform: scale(1.1);
		transition: transform 0.5s ease-in;
	}
`
export default function BudgetContainer({
	name,
	amount,
	max,
	gray,
	openAddExpenseClick,
	hideButtons,
	onViewExpensesClick,
}) {
	const classNames = []
	if (amount > max) {
		classNames.push("bg-danger", "bg-opacity-10")
	} else if (gray) {
		classNames.push("bg-light")
	}

	return (
		<AnimatedCard className={classNames.join(" ")}>
			<Card.Body>
				<Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
					<div className="me-2">{name}</div>
					<div className="d-flex align-items-baseline">{currencyFormatter.format(amount)}
						{max && (
							<span className="text-muted fs-6 ms-1">
								/ {currencyFormatter.format(max)}
							</span>

						)}
					</div>
				</Card.Title>
				{max && (<ProgressBar animated
					className="rounded-pill progress-bar-striped"
					variant={getProgressBarVariant(amount, max)}
					min={0}
					max={max}
					now={amount}
				/>)
				}
				{!hideButtons &&
					<Stack direction="horizontal" gap="2" className="mt-4">
						<AnimatedButton variant="outline-primary" className="ms-auto" onClick={openAddExpenseClick}> Add Expense </AnimatedButton>
						<AnimatedButton variant="outline-secondary" onClick={onViewExpensesClick}> View Expense </AnimatedButton>
					</Stack>
				}
			</Card.Body>
		</AnimatedCard>
	)
}

function getProgressBarVariant(amount, max) {
	const ratio = amount / max
	if (ratio < 0.5) return "success";
	if (ratio < 0.75) return "warning";
	return "danger"

}
