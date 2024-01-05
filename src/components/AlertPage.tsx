import { Alert, AlertDescription, AlertTitle } from"../ui/alert";

const AlertPage = () => {
  return (
    <Alert variant="destructive">
      
      <AlertTitle>Low Balance</AlertTitle>
      <AlertDescription>
        Can not Perform Transaction due to insufficient Balance.
      </AlertDescription>
    </Alert>
  )
}

export default AlertPage
