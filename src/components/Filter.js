import { Fragment, useEffect, useCallback } from "react";
import Relation from "./relation/Relation";
import Options from "./options/Options";
import Category from "./category/Category";
// const
import filterValues from "const/filterValues";

// custom hook
import useHideOnClickOutside from "hook/useHideOnClickOutside";
import { CATEGORY_KEY, KEY_OBJECT, RELATION_KEY } from "const/KeyConstants";
import { OPTION_KEY } from "../const/KeyConstants";
const filterKeys = Object.keys(filterValues).map((key, index) => ({
  value: key,
  name: key,
}));
const Relation_Array = [
  { name: "is", value: "is" },
  { name: "is not", value: "is not" },
];
export default function Filter({
  filter,
  removefromOrignalFilters = () => {},
  setToOrignalFiltersArray = () => {},
  setTempFilterValue,
  isAddOn,
  setIsAddOn
}) {
  const [isOnEdit, setIsOnEdit, ref] = useHideOnClickOutside(false);
  const removeFilter = useCallback(() => {
    removefromOrignalFilters(filter);
  },[]);
  useEffect(() => {
     console.log(isAddOn,'<-----------------1')
    if(filter.join('') === ""){
      setIsOnEdit(true);
    }
    return () => {
     
      // removeFilter();
    }
  },[])
  useEffect(() => {
    console.log(3,'<-----------------3')
    if(!isOnEdit && filter.join('') === ""){
      console.log(2,'<-----------------2',isOnEdit)
      setIsAddOn(false);
    }
    return () => {

    }
  },[isOnEdit])
  const addFilter = () => {
    setToOrignalFiltersArray(filter)
  };
  const setCategory = (value) => setTempFilterValue(KEY_OBJECT[CATEGORY_KEY].index, value);
  const setRelation = (value) => setTempFilterValue(KEY_OBJECT[RELATION_KEY].index, value);
  const setOption = (value) => setTempFilterValue(KEY_OBJECT[OPTION_KEY].index, value);
  const secondaryElementsVisible =
    filter[KEY_OBJECT[RELATION_KEY].dependent] !== "";
  const {categoryType, options} = filterValues[filter[KEY_OBJECT[CATEGORY_KEY].index]] || {};
  const disableAddButton = filter[KEY_OBJECT[OPTION_KEY].index] === "";
  if(isOnEdit){
  return (
        <div ref={ref}>
          <Category
            value={filter[0]}
            setCategory={setCategory}
            optionsArray={filterKeys}
          />
          <Relation
            value={filter[1]}
            setRelation={setRelation}
            optionsArray={Relation_Array}
            visible={secondaryElementsVisible}
          />
          <Options value={filter[2]} setOption={setOption} optionsArray={options} inputType={categoryType} visible={secondaryElementsVisible}/>
          <Fragment>
            <AddButton
              disabled={disableAddButton}
              visible={secondaryElementsVisible}
              addFilter={addFilter}
            />
            <button onClick={removeFilter}>✕</button>
          </Fragment>
        </div>

  );
}else if(filter.join('') !== ""){
  console.log('Here',ref)
return <FilterPill  removeFilter={removeFilter} setIsOnEdit={setIsOnEdit} filter={filter} />
}else{
  return null;
}
}

function AddButton({ visible, addFilter, disabled }) {
  if (visible) {
    return <button disabled={disabled} onClick={addFilter}>Add</button>;
  }
  return null;
}
function FilterPill({filter, removeFilter, setIsOnEdit}) {
  if(filter.join('') === ""){
 
    return <div></div>;
  }
  return <Fragment>
  <button onClick={() => setIsOnEdit(true)}>{filter.join(" ")}</button>
  <button onClick={removeFilter}>✕</button>
</Fragment>
}