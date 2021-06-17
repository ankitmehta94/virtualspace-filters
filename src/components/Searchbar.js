// component
import Filter from 'components/Filter'
import { useState } from 'react'

// style
import styles from './Searchbar.module.css'

export default function Searchbar({setFilters, filters}) {
  const [isAddOn, setIsAddOn] = useState(false);
  const setToOrignalFiltersArray = (index) => (newFilterArray) => {
    console.log(newFilterArray,'Searchbar','setFiltersArray')
    filters[index] = newFilterArray;
    const newArray = filters.slice()
    setFilters(newArray)
  }
  const removefromOrignalFilters = (filterArray) => {
    const index = filters.indexOf(filterArray);
    filters.splice(index, 1)
    const newArray = filters.slice()
    setFilters(newArray)
  }
  const addToOrignalFilters = (filterArray) => {
    filters.push(filterArray);
    const newArray = filters.slice()
    setFilters(newArray)
  }
  const createNewFilters = () => {
    setIsAddOn(true);
  }
  return (
    <div className={styles.Searchbar}>
      {filters.map((filter, index) => (
        <Filter
        setToOrignalFiltersArray={setToOrignalFiltersArray(index)}
        removefromOrignalFilters={removefromOrignalFilters}
        addToOrignalFilters={addToOrignalFilters}
          filter={filter}
          key={`filter-${index}`}
          isAddOn={isAddOn}
          setIsAddOn={setIsAddOn}
        />
      ))}
      <SearchAndFilterButton createNewFilters={createNewFilters} isAddOn={isAddOn} setIsAddOn={setIsAddOn} addToOrignalFilters={addToOrignalFilters}  />
    </div>
  )
}


function SearchAndFilterButton({createNewFilters,  isAddOn, setIsAddOn, addToOrignalFilters}) {
  if(!isAddOn){
    return <div onClick={createNewFilters}>Search or add filters</div>
  }
  return <Filter
    filter={['','','']}
    isAddOn={isAddOn}
    setIsAddOn={setIsAddOn}
    addToOrignalFilters={addToOrignalFilters}
  />
}