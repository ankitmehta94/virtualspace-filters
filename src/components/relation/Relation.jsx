import { useState } from "react";
import Select from "../select/SelectControlledInput";



export default function Relation({optionsArray = [], value, setRelation, disabled, visible}) {
    if(visible){
        return (
            <Select
            // className={''}
            value={value}
            onChange={setRelation} 
            optionsArray={optionsArray}
            // placeholderOptionElement={true}
          />)
    }
    return null;
}