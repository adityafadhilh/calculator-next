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
        ['1/x', 'sqrt(x)', 'x^y'],
        ['c', 'del', 'x^2']
    ];

    const operations = ['+', '-', '*', '/'];
    const funcKey = ['(', ')', 'c', '=', '%', '+/-', '.', 'del', '1/x', 'sqrt(x)', 'x^y', 'x^2'];

    const handleNumber = (num: string) => {
        if (calcValue == '0') {
            setCalcValue(num);
        } else {
            let lastcalcValue = calcValue.length >= 1 && calcValue[calcValue.length - 1];
            if (lastcalcValue == '/' || lastcalcValue == '*' || lastcalcValue == '-' || lastcalcValue == '+') {
                setCalcValue(calcValue + ' ' + num);
            } else if (lastcalcValue == '%' || lastcalcValue == ')') {
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

    const handleFuncKey = (v: string) => {
        if (calcValue.length > 0) {
            let splitArr = calcValue.split(' ');
            let lastcalcValue = splitArr && splitArr[splitArr.length - 1];
            let lastChar = calcValue[calcValue.length - 1];
            if (lastcalcValue.includes(v) || operations.includes(lastChar) || funcKey.includes(lastChar)) {
                setCalcValue(calcValue);
            } else
                setCalcValue(calcValue + v);
        }
    };

    const validParentheses = (v: string) => {
        let arr = [];
        for (let i = 0; i < v.length; i++) {
            if (v[i] == "(") {
                arr.push("(");
            } else if (v[i] == ")") {
                arr.pop();
            }
        }
        return arr.length > 0 ? false : true;
    };

    const handleInput = (value: string) => {
        if (operations.includes(value) && value !== "0") {
            handleOperation(value);
        } else if (funcKey.includes(value)) {
            switch (value) {
                case "=":
                    try {
                        const res: number = evaluate(calcValue);
                        setCalcValue(res.toString());
                    } catch (error) {
                        console.log(error);
                    }
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
                        if (lastcalcValue.includes(value) || operations.includes(lastChar) || (!lastcalcValue.startsWith("(-") && funcKey.includes(lastChar))) {
                            setCalcValue(calcValue);
                        } else
                            setCalcValue(calcValue + value);
                    }
                    break;
                case "(":
                    // let lastcalcValue = calcValue.length >= 1 && calcValue[calcValue.length - 1];
                    setCalcValue(calcValue + ' ' + value);
                    // setCalcValue(value);
                    break;
                case ")":
                    if (!validParentheses(calcValue)) {
                        if (calcValue.length > 0) {
                            let lastcalcValue = calcValue.length >= 1 && calcValue[calcValue.length - 1];
                            if (operations.includes(lastcalcValue.toString())) {
                                setCalcValue(calcValue);
                            } else
                                setCalcValue(calcValue + value);
                        }
                    }

                    // setCalcValue(value);
                    break;
                case "+/-":
                    if (calcValue.length > 0) {
                        let splitArr = calcValue.split(' ');
                        let lastcalcValue = splitArr && splitArr[splitArr.length - 1];
                        let lastChar = calcValue[calcValue.length - 1];
                        console.log(lastChar);
                        if (lastcalcValue.includes(value) || operations.includes(lastChar) || (!lastcalcValue.startsWith("(-") && funcKey.includes(lastChar)) || lastcalcValue == '') {
                            setCalcValue(calcValue);
                        } else {
                            console.log(splitArr);
                            console.log(splitArr[splitArr.length - 1]);
                            if (splitArr[splitArr.length - 1].startsWith("(-")) {
                                console.log('here');
                                splitArr[splitArr.length - 1] = `${splitArr[splitArr.length - 1].slice(2, splitArr[splitArr.length - 1].length - 1)}`;
                            } else {
                                splitArr[splitArr.length - 1] = `(-${splitArr[splitArr.length - 1]})`
                            }
                            setCalcValue(splitArr.join(' '));
                        }
                    }
                    break;
                case "1/x":
                    if (calcValue.length > 0) {
                        let splitArr = calcValue.split(' ');
                        let lastcalcValue = splitArr && splitArr[splitArr.length - 1];
                        let lastChar = calcValue[calcValue.length - 1];
                        if (lastcalcValue.includes(value) || operations.includes(lastChar) || funcKey.includes(lastChar)) {
                            setCalcValue(calcValue);
                        } else
                            setCalcValue(calcValue + "^-1");
                    }
                    break;
                case "sqrt(x)":
                    if (calcValue.length > 0) {
                        let splitArr = calcValue.split(' ');
                        let lastcalcValue = splitArr && splitArr[splitArr.length - 1];
                        let lastChar = calcValue[calcValue.length - 1];
                        if (lastcalcValue.includes(value) || operations.includes(lastChar) || (!lastcalcValue.startsWith("(-") && funcKey.includes(lastChar)) || lastcalcValue == '') {
                            setCalcValue(calcValue);
                        } else
                            splitArr[splitArr.length - 1] = `sqrt(${splitArr[splitArr.length - 1]})`;
                        setCalcValue(splitArr.join(' '));
                    }
                    break;
                case "x^y":
                    if (calcValue.length > 0) {
                        let splitArr = calcValue.split(' ');
                        let lastcalcValue = splitArr && splitArr[splitArr.length - 1];
                        let lastChar = calcValue[calcValue.length - 1];
                        if (lastcalcValue.includes(value) || operations.includes(lastChar) || (!lastcalcValue.startsWith("(-") && funcKey.includes(lastChar))) {
                            setCalcValue(calcValue);
                        } else
                            setCalcValue(calcValue + " ^ ");
                    }
                    break;
                case "x^2":
                    if (calcValue.length > 0) {
                        let splitArr = calcValue.split(' ');
                        let lastcalcValue = splitArr && splitArr[splitArr.length - 1];
                        let lastChar = calcValue[calcValue.length - 1];
                        if (lastcalcValue.includes(value) || operations.includes(lastChar) || (!lastcalcValue.startsWith("(-") && funcKey.includes(lastChar))) {
                            setCalcValue(calcValue);
                        } else
                            setCalcValue(calcValue + "^2");
                    }
                    break;
                default:
                    break;
            }
        } else {
            handleNumber(value);
        }
    };

    // useEffect(() => {
    //     if (calcValue && (Number(calcValue[calcValue.length - 1]) || calcValue[calcValue.length - 1] == '0')) {
    //         console.log(calcValue);
    //         let res: number = evaluate(calcValue);
    //         console.log(res);
    //         setAnswer(res.toString());
    //     }
    // }, [calcValue])

    // useEffect(() => {
    //     if (calcValue && (Number(calcValue[calcValue.length - 1]) || calcValue[calcValue.length - 1] == '0')) {
    //         let splitArr = calcValue.split(' ');
    //         let formatted = splitArr.map((it) => {
    //             if (Number(it)) {
    //                 return Number(it).toLocaleString();
    //             } else {
    //                 return it
    //             }
    //         });
    //         setCalcValue(formatted.join(' '));
    //     }
    // }, [calcValue])

    const colors = (v: string) => {
        if (operations.includes(v)) {
            return 'text-white bg-orange-400'
        } else if (funcKey.includes(v)) {
            return 'text-white bg-[#622B14]'
        } else {
            return 'text-white bg-black border border-gray-700'
        }
    };

    return (
        <div className="dark:bg-white dark:text-black flex flex-col w-screen md:w-1/3 md:grow-0 md:rounded-t-4xl">
            <div className="bg-black p-4 text-white text-4xl wrap-break-word md:rounded-t-4xl">{calcValue || 0}</div>
            <div className="bg-black p-4 text-white text-4xl text-end">{answer ? '= ' + answer : ''}</div>
            {buttons.map((item, index) => {
                return (
                    <div className="flex flex-row bg-black" key={index}>
                        {item.map((number, idx) => {
                            return (
                                <button key={idx} onClick={() => handleInput(number)} className={"mx-1 my-1 rounded-4xl flex-2 text-2xl md:text-4xl p-4 text-center hover:opacity-80 " + colors(number)}>
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