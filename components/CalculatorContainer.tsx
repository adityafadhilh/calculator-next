"use client"

import { useEffect, useState } from "react";
import { evaluate } from "mathjs";
import { openAsBlob } from "fs";

export const CalculatorContainer = () => {
    const [calcValue, setCalcValue] = useState<string>('');
    const [answer, setAnswer] = useState<string>('');

    const buttons = [
        ['7', '8', '9', '/'],
        ['4', '5', '6', '*'],
        ['1', '2', '3', '-'],
        ['0', '.', '=', '+'],
        ['+/-', '(', ')', '%'],
        ['c', 'del']
    ];

    const operations = ['+', '-', '*', '/'];
    const funcKey = ['(', ')', 'c', '=', '%', '+/-', '.', 'del'];

    const handleNumber = (num: string) => {
        if (calcValue == '0') {
            setCalcValue(num);
        } else {
            let lastcalcValue = calcValue.length >= 1 && calcValue[calcValue.length - 1];
            if (lastcalcValue == '/' || lastcalcValue == '*' || lastcalcValue == '-' || lastcalcValue == '+') {
                setCalcValue(calcValue + ' ' + num);
            } else if (lastcalcValue == '%') {
                setCalcValue(calcValue);
            } else {
                setCalcValue(calcValue + num);
            }
        }
    };

    const handleOperation = (op: string) => {
        if (calcValue.length > 0) {
            let lastcalcValue = calcValue.length >= 1 && calcValue[calcValue.length - 1];
            if (operations.includes(lastcalcValue.toString())) {
                setCalcValue(calcValue);
            } else
                setCalcValue(calcValue + ' ' + op);
        }
    };

    const handleInput = (value: string) => {
        if (operations.includes(value) && value !== "0") {
            handleOperation(value);
        } else if (funcKey.includes(value)) {
            switch (value) {
                case "=":
                    const res: number = evaluate(calcValue);
                    setCalcValue(res.toString());
                    break;
                case "c":
                    setCalcValue('');
                    setAnswer('');
                    break;
                case "del":
                    setCalcValue(calcValue.slice(0, calcValue.length - 1));
                    if (calcValue.length == 1) {
                        setAnswer('');
                    }
                    break;
                case ".":
                    if (calcValue.length > 0) {
                        let splitArr = calcValue.split(' ');
                        let lastcalcValue = splitArr && splitArr[splitArr.length - 1];
                        let lastChar = calcValue[calcValue.length - 1];
                        if (lastcalcValue.includes(value) || operations.includes(lastChar) || funcKey.includes(lastChar)) {
                            setCalcValue(calcValue);
                        } else
                            setCalcValue(calcValue + value);
                    }
                    break;
                case "%":
                    if (calcValue.length > 0) {
                        let splitArr = calcValue.split(' ');
                        let lastcalcValue = splitArr && splitArr[splitArr.length - 1];
                        let lastChar = calcValue[calcValue.length - 1];
                        if (lastcalcValue.includes(value) || operations.includes(lastChar) || funcKey.includes(lastChar)) {
                            setCalcValue(calcValue);
                        } else
                            setCalcValue(calcValue + value);
                    }
                    break;
                case "(":
                    setCalcValue(value);
                    break;
                case ")":
                    setCalcValue(value);
                    break;
                case "+/-":
                    break;
                default:
                    break;
            }
        } else {
            handleNumber(value);
        }
    };

    useEffect(() => {
        if (calcValue && (Number(calcValue[calcValue.length - 1]) || calcValue[calcValue.length - 1] == '0')) {
            console.log(calcValue);
            let res: number = evaluate(calcValue);
            console.log(res);
            setAnswer(res.toString());
        }
    }, [calcValue])

    const colors = (v: string) => {
        if (operations.includes(v)) {
            return 'text-white bg-orange-400'
        } else if (funcKey.includes(v)) {
            return 'text-white bg-[#622B14]'
        } else {
            return 'text-white bg-black'
        }
    };

    return (
        <div className="dark:bg-white dark:text-black flex flex-col border border-gray-600 w-screen md:w-1/3 rounded-t-2xl md:grow-0">
            <div className="bg-black p-4 text-white rounded-t-2xl text-4xl wrap-break-word">{calcValue || 0}</div>
            <div className="bg-black p-4 text-white text-4xl text-end">{answer ? '= ' + answer : ''}</div>
            {buttons.map((item, index) => {
                return (
                    <div className="flex flex-row" key={index}>
                        {item.map((number, idx) => {
                            return (
                                <button onClick={() => handleInput(number)} className={"flex-2 text-2xl md:text-5xl p-4 border border-gray-600 text-center hover:opacity-80 " + colors(number)} key={idx}>
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