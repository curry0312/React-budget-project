import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css';

import AddBudgetMenuProvider from './contexts/AddBudgetMenuProvider'
import BudgetProvider from './contexts/BudgetProvider'
import ExpenseProvider from './contexts/ExpenseProvider';
import AddExpenseMenuProvider from './contexts/AddExpenseMenuProvider';
import ViewExpenseMenuProvider from './contexts/ViewExpenseMenuProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <BudgetProvider>
  <ExpenseProvider>
    <AddBudgetMenuProvider>
    <AddExpenseMenuProvider>
    <ViewExpenseMenuProvider>
      <App />
    </ViewExpenseMenuProvider>
    </AddExpenseMenuProvider>
    </AddBudgetMenuProvider>
  </ExpenseProvider>
  </BudgetProvider>
  
)
