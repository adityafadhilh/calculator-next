import { CalculatorContainer } from "@/components/CalculatorContainer";
import Image from "next/image";

export default function Home() {

  // const buttons = [
  //   ['7', '8', '9', '/'],
  //   ['4', '5', '6', '*'],
  //   ['1', '2', '3', '-'],
  //   ['0', '.', '=', '+'],
  //   ['+/-', '(', ')', '%']
  // ];

  return (
    <div className="flex flex-col md:items-center md:justify-center h-screen">
      {/* <h1 className="text-5xl mx-2 my-8 md:my-16 font-bold">Calculator</h1> */}
      <CalculatorContainer />
    </div>
  );
}
