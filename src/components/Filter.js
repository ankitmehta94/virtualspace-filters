import { Fragment, useEffect, useState } from "react";
import Relation from "./relation/Relation";
import Options from "./options/Options";
import Category from "./category/Category";
// const
import filterValues from "const/filterValues";
import {
  CATEGORY_KEY,
  KEY_OBJECT,
  RELATION_KEY,
  OPTION_KEY,
} from "const/KeyConstants";
// custom hook
import useHideOnClickOutside from "hook/useHideOnClickOutside";
const CATEGORY_INDEX = KEY_OBJECT[CATEGORY_KEY].index;
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
  addToOrignalFilters = () => {},
  isAddOn = false,
  setIsAddOn = () => {},
}) {
  const [isOnEdit, setIsOnEdit, ref] = useHideOnClickOutside(isAddOn);
  const [tempFilter, setTempFilter] = useState(filter);
  const [elementsVisibility, setElementsVisibility] = useState(
    filter[CATEGORY_INDEX] === "" ? false : true
  );
  const setTempFilterValue = (key, value) => {
    filter[KEY_OBJECT[key].index] = value;
    const newArray = filter.slice();
    setTempFilter(newArray);
  };
  const removeFilter = () => {
    if (isAddOn) {
      setIsAddOn(false);
    } else {
      removefromOrignalFilters(tempFilter);
    }
  };
  useEffect(() => {
    if (!isOnEdit && isAddOn) {
      setIsAddOn(false);
    }
  }, [isOnEdit]);
  useEffect(() => {
    if (!elementsVisibility) {
      setElementsVisibility(true);
    }
    setOption('');
  }, [tempFilter[CATEGORY_INDEX]]);
  useEffect(() => {
    if (elementsVisibility) {
      setRelation(Relation_Array[0].value);
    }
  }, [elementsVisibility]);
  const addFilter = () => {
    if (isAddOn) {
      console.log(tempFilter, "<-----------------tempFilter");
      addToOrignalFilters(tempFilter);
      setIsAddOn(false);
    } else {
      setIsOnEdit(false);
      setToOrignalFiltersArray(tempFilter);
    }
  };
  const setCategory = (value) => setTempFilterValue(CATEGORY_KEY, value);
  const setRelation = (value) => setTempFilterValue(RELATION_KEY, value);
  const setOption = (value) => setTempFilterValue(OPTION_KEY, value);
  const { categoryType, options } = filterValues[filter[CATEGORY_INDEX]] || {};
  const disableAddButton = false; //filter[KEY_OBJECT[OPTION_KEY].index] === "";
  if (isOnEdit) {
    return (
      <div ref={ref}>
        <Category
          value={tempFilter[0]}
          setCategory={setCategory}
          optionsArray={filterKeys}
        />
        <Relation
          value={tempFilter[1]}
          setRelation={setRelation}
          optionsArray={Relation_Array}
          visible={elementsVisibility}
        />
        <Options
          value={tempFilter[2]}
          setOption={setOption}
          optionsArray={options}
          inputType={categoryType}
          visible={elementsVisibility}
        />
        <Fragment>
          <AddButton
            disabled={disableAddButton}
            visible={elementsVisibility}
            addFilter={addFilter}
          />
          <button onClick={removeFilter}>✕</button>
        </Fragment>
      </div>
    );
  } else if (filter.join("") !== "") {
    console.log("Here", ref);
    return (
      <FilterPill
        removeFilter={removeFilter}
        setIsOnEdit={setIsOnEdit}
        filter={tempFilter}
      />
    );
  } else {
    return null;
  }
}

function AddButton({ visible, addFilter, disabled }) {
  if (visible) {
    return (
      <button disabled={disabled} onClick={addFilter}>
        Add
      </button>
    );
  }
  return null;
}
function FilterPill({ filter, removeFilter, setIsOnEdit }) {
  if (filter.join("") === "") {
    return <div></div>;
  }
  return (
    <Fragment>
      <button onClick={() => setIsOnEdit(true)}>{filter.join(" ")}</button>
      <button onClick={removeFilter}>✕</button>
    </Fragment>
  );
}
