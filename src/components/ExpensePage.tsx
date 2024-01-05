import React, { useState } from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ChevronRight } from "lucide-react";
import { DialogDemo } from "./DialogDemo";
import { useDispatch, useSelector } from "react-redux";
import { addTransaction } from '../store/TransactionSlice'; // Update with the correct path
import { RootState } from "@/store/store";
import AlertPage from "./AlertPage";

const ExpensePage = () => {
  const dispatch = useDispatch();
  const transactionDetails = useSelector((state:RootState) => state.transactions.transactions);

  const [text, setText] = useState("");
  const [amount, setAmount] = useState<string>("0");
  const [visible, setVisible] = useState<boolean>(false);
  const[show,setShow] = useState<boolean>(false);


  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove leading zeros when the user starts typing
    setAmount(e.target.value.replace(/^0+/, "") || "0");
  };

  const totalIncome = transactionDetails
    .filter(
      (transaction: { text: string; amount: number }) => transaction.amount > 0
    )
    .reduce(
      (acc: number, transaction: { text: string; amount: number }) =>
        acc + transaction.amount,
      0
    );

  const totalExpense = transactionDetails
    .filter(
      (transaction: { text: string; amount: number }) => transaction.amount < 0
    )
    .reduce(
      (acc: number, transaction: { text: string; amount: number }) =>
        acc + transaction.amount,
      0
    );

  const totalBalance = totalIncome + totalExpense;

  const handleAddTransaction = () => {
    // Convert the amount to a number before using it
    const numericAmount = Number(amount);

    if (numericAmount < 0 && Math.abs(numericAmount) > totalBalance) {
      setShow(true);
      return; // Do not add the transaction if invalid
    }

    // Add the new transaction to the list using Redux action
    const newTransaction = { text, amount: numericAmount };
    if (Math.abs(newTransaction.amount) > 0) {
      dispatch(addTransaction(newTransaction));
    }

    // Reset form after adding transaction
    setText("");
    setAmount("0");
  };

  return (
    <div className="">
      <Card className="my-3 w-[25em] ml-[10%] md:w-[35em] lg:w-[40em] md:ml-[15%] lg:ml-[55%]">
        <CardHeader>
          <CardTitle className="text-center uppercase text-[2em] font-bold">
            expense tracker
          </CardTitle>
        </CardHeader>
        <CardContent className="">
          <form>
            <div className="grid w-full items-center space-y-5">
              <div className="flex justify-between items-center shadow-md p-4 bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 rounded-md">
                <h1 className="text-[2em] uppercase">balance</h1>
                <h1 className={`text-[2em] uppercase`}>
                  ₹{Math.abs(totalBalance)}
                </h1>
              </div>
              <div className="flex h-[6em] mt-3 justify-center space-x-[3em] text-sm">
                <div className="uppercase shadow-md rounded-md md:min-w-[10em] p-4 text-center">
                  Income
                  {totalIncome > 0 ? (
                    <h1 className="text-[green]">₹{Math.abs(totalIncome)}</h1>
                  ) : (
                    ""
                  )}
                </div>
                <Separator orientation="vertical" />
                <div className="uppercase shadow-md rounded-md md:min-w-[10em]  text-center p-4">
                  Expense
                  {totalExpense < 0 ? (
                    <h1 className="text-[red]">
                      ₹{Math.abs(totalExpense)}
                    </h1>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              {show && <AlertPage />}
              <div className="flex">
                <h2 className="font-semibold text-lg">History &nbsp;</h2>
                <ChevronRight
                  className="cursor-pointer mt-1"
                  onClick={() => setVisible(!visible)}
                />
              </div>

              {visible &&
                transactionDetails.map(
                  (
                    transaction: { text: string; amount: number },
                    index: number
                  ) => (
                    <div
                      key={index}
                      className={`w-full shadow-lg border-1 p-3 border-r-4 items-center ${
                        transaction.amount > 0
                          ? "border-r-green-400"
                          : "border-r-[red]"
                      } flex justify-between`}
                    >
                      <DialogDemo />

                      <p className="text-sm">{transaction.text}</p>
                      <p className="text-sm">
                        {transaction.amount > 0 ? "+" : "-"}₹
                        {Math.abs(transaction.amount)}
                      </p>
                    </div>
                  )
                )}
              <Separator />
              <h2 className="font-semibold text-lg">Add New Transaction</h2>
              <Separator />
              <div className="flex flex-col space-y-2">
                <Label htmlFor="name">Text</Label>
                <Input
                  id="name"
                  placeholder="Name of transaction"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="amount">
                  Amount
                  <br />
                  (income - positive , expense - negative)
                </Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="amount"
                  value={amount}
                  onChange={handleAmountChange}
                  // className={show ? 'border-[green]' : 'border-[red]'}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button className="w-full" onClick={handleAddTransaction}>
            Add Transaction
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ExpensePage;
