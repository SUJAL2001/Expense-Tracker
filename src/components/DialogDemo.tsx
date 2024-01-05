import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import {RootState} from '../store/store'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { removeTransaction } from "../store/TransactionSlice";
export function DialogDemo() {

  const transactionDetails = useSelector((state:RootState)=>state.transactions.transactions);
  const dispatch = useDispatch();

  const handleDeleteTransaction = (index:number)=>{
    dispatch(removeTransaction(index));
  }

  const handleDeleteButtonClick = () => {
    // Provide the appropriate index here, such as transactionDetails.length - 1
    const indexToDelete = transactionDetails.length - 1;
    handleDeleteTransaction(indexToDelete);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" >X</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Transaction</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the last Transaction ?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button type="submit" onClick={handleDeleteButtonClick}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
