import { useEffect, useState } from "react";
import style from "./DropdownControlledInput.module.css";
import {CheckboxWithText} from "../CheckboxWithText";
//utils
import debounce from "../../utils/Debounce";

//hook
import useHideOnClickOutside from "../../hook/useHideOnClickOutside";

export default function DropdownControlledInput({
  defaultValue = [],
  value,
  optionsArray,
  onChange,
}) {
  const [optionObject, setOptionObject] = useState(optionObjectCreator(optionsArray, value));
//   const [isOpen, setIsOpen, ref] = useHideOnClickOutside(false);
  const [isOpen, setIsOpen] = useState(false);
  function checkDropdownItem(checked,item) {
    setOptionObject({...optionObject,[item]:checked})
  }
  function getOptionList(obj) {
    return Object.keys(obj).map((text, i) => {
    const checked = obj[text];
      return (<div className={style["optionDiv"]}>
          <CheckboxWithText text={text} onChange={(v) => checkDropdownItem(v.target.checked, text)} isChecked={checked} />
      </div>)
    });
  }
  function updateDropdown() {
      setIsOpen(false);
      onChange(Object.keys(optionObject).filter((k) => optionObject[k]).join(SPLIT_VALUE))

  }
  useEffect(() => {
    console.log(isOpen,'<-----------------isOpen')
  },[isOpen])
  let optContainerClass = style["optionsContainer"] + ' ';
  if (isOpen) {
    optContainerClass += style["openOptContainer"];
  }
  const onOptionSearch = debounce((str) => {
    const array = searchStringArray(optionsArray, str);
    const obj = optionObjectCreator(array,value,optionObject)
    setOptionObject(obj);
  }, 300);
  const buttonText = value || '(None)';
  console.log(optionObject, isOpen, "<-----------------optionObject");
  const optionDivList = isOpen ? getOptionList(optionObject) : null;
  return (
    <span className={style["multiSelectContainer"]}>
      <button className={''} onClick={() => setIsOpen(!isOpen)}>
        {buttonText} <Pointer isOpen={isOpen} />
      </button>
      <div className={optContainerClass} 
    //   ref={ref}
      >
        <input
          type={"text"}
          className={style["searchInput"]}
          onChange={(e) => onOptionSearch(e.target.value)}
          placeholder={"Search Options"}
        />
        <div className={style["optList"]}>{optionDivList}</div>
        <div>
          <button
            onClick={updateDropdown}
            className={style["updateButton"]}
          >
            Update
          </button>
        </div>
      </div>
    </span>
  );
}
const searchStringArray = (array, str) => {
  const newArray = [];
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    if (element.toUpperCase().includes(str.toUpperCase())) {
      newArray.push(element);
    }
  }
  return newArray;
};
const SPLIT_VALUE = ', '
// function addElementToString(string, element) {
//     const array = string.split(SPLIT_VALUE);
//     if(array.indexOf(element) === -1){
//         array.push(element);
//     }
//     return array.join(SPLIT_VALUE);
// }
// function removeElementFromString(string, element) {
//     const array = string.split(SPLIT_VALUE);
//     array.push(element);
//     return array.join(SPLIT_VALUE);
// }
function optionObjectCreator(array, string) {
    const dict = {};
    if(string !== ''){
        string.split(SPLIT_VALUE).forEach((val, index) => {
            if(array.indexOf(val) !== -1)
                dict[val] = true;
        })
    }
    array.forEach((val, index) => {
       dict[val] = dict[val] || false
    })
    return dict
    
}

function Pointer({isOpen}) {
    if(isOpen){
        return (<span >&#9650;</span>)
    }
    return (<span >&#9660;</span>)
}