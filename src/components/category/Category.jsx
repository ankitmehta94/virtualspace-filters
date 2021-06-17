import { useState } from "react";
import filterValues from "../../const/filterValues.json";
import Select from "../select/SelectControlledInput";


export default function Category({optionsArray = [], value, setCategory, disabled}) {

    return (
        <Select
        value={value}
        onChange={setCategory} 
        placeholderOptionElement={true}
        optionsArray={optionsArray}
      />

    )
}