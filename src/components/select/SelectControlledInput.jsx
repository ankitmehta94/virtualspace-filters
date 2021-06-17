const defaultPlaceholderOptionElement = (<option selected={true}></option>) 

export default function Select({optionsArray = [], value, onChange, disabled, placeholderOptionElement = null, defaultValue}) {
    const optionElementArray = optionsArray.map((opt,i) => {
        let selected = false;
        if(value === opt.value){
            selected = true;
        }
        return (<option selected={selected} key={`opt-${i}`} value={opt.value}  >{opt.name}</option>)
    })
    return (
        <select
        defaultValue={defaultValue}
        className={''}
        value={value}
        onChange={e => onChange(e.target.value)} 
        disabled={disabled}
      >
        {placeholderOptionElement === true?defaultPlaceholderOptionElement:placeholderOptionElement}
          {optionElementArray}
        </select>
    )
}