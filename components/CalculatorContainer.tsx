"use client"

import { useEffect, useState } from "react";
import { evaluate } from "mathjs";

export const CalculatorContainer = () => {
    const [calcValue, setCalcValue] = useState<string>('');
    const [answer, setAnswer] = useState<string>('');

    const buttons = [
        ['7', '8', '9', '/'],
        ['4', '5', '6', '*'],
        ['1', '2', '3', '-'],
        ['0', '.', '=', '+'],
        ['+/-', '(', ')', '%'],
        ['c']
    ];

    const handleInput = (value: string) => {
        if (!Number(value) && value !== "0") {
            switch (value) {
                case "=":
                    const res: number = evaluate(calcValue);
                    setCalcValue(res.toString());
                    break;
                case "c":
                    setCalcValue('');
                    setAnswer('');
                    break;
                case "/":
                    setCalcValue(calcValue + value);
                    break;
                case "+":
                    setCalcValue(calcValue + value);
                    break;
                case "-":
                    setCalcValue(calcValue + value);
                    break;
                case "*": 
                    setCalcValue(calcValue + value);
                    break;
                default: 
                    break;
            }
        } else {
            setCalcValue(calcValue + value);
        }
    };

    useEffect(() => {
        if (calcValue && (Number(calcValue[calcValue.length-1]) || calcValue[calcValue.length-1] == '0')) {
            console.log(calcValue);
            let res: number = evaluate(calcValue);
            console.log(res);
            setAnswer(res.toString());
        }
    }, [calcValue])

    return (
        <div className="dark:bg-white dark:text-black flex flex-col border border-gray-50 w-screen md:w-1/3 rounded-t-2xl">
            <div className="bg-black p-4 text-white rounded-t-2xl text-4xl wrap-break-word">{calcValue || 0}</div>
            <div className="bg-black p-4 text-white text-4xl text-end">{answer ? '= ' + answer : ''}</div>
            {buttons.map((item, index) => {
                return (
                    <div className="flex flex-row" key={index}>
                        {item.map((number, idx) => {
                            return (
                                <button onClick={() => handleInput(number)} className="flex-2 text-white bg-black text-4xl p-4 border text-center" key={idx}>
                                    {number}
                                </button>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}