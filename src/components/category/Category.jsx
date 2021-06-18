import { useState } from "react";
import filterValues from "../../const/filterValues.json";
import InputWithDataList from "../text_input/InputWithDataList";


export default function Category({optionsArray = [], value, setCategory, disabled}) {



    
    return (
        <InputWithDataList
        disabled={disabled}
        value={value}
        onChange={setCategory} 
        placeholderOptionElement={true}
        optionsArray={optionsArray}
      />

    )
}