import Select from '../select/SelectControlledInput';
import DropdownControlledInput from "../dropdown/DropdownControlledInput";



export default function Options({value, setOption, optionsArray, inputType, visible}) {
    if(!visible){
        return null
    }
    if(inputType === 'text'){
        return <input value={value} onChange={(e) => setOption(e.target.value)} />
    }else if(inputType === 'select'){

        return  (<Select
        // className={''}
        defaultValue={value}
        value={value}
        onChange={setOption} 
        optionsArray={optionsArray.map((key, index) => ({
            value: key,
            name: key,
          }))}
        // placeholderOptionElement={true}
      />)
    }else if(inputType === 'checkbox'){
        return <DropdownControlledInput
        defaultValue={value}
        value={value}
        onChange={setOption}
        optionsArray={optionsArray} />
    }
    return null;
}