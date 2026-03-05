import React from "react";
import numeral from "numeral";

const CurrencyFormat = ({amount}) =>{
    const formattendAmount = numeral(amount).format("$0,0.00")
    return <div>{formattendAmount}</div>
}
export default CurrencyFormat;