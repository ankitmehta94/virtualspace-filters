// component
import Filter from 'components/Filter'
import { useState } from 'react'

// style
import styles from './Searchbar.module.css'
import { useEffect } from 'react';

export default function Searchbar({setFilters, filters}) {
  const [tempFilters, setTempFilters] = useState(filters);
  const [isAddOn, setIsAddOn] = useState(false);
  const setToOrignalFiltersArray = (index) => (newFilterArray) => {
    console.log(newFilterArray,'Searchbar','setFiltersArray')
    filters[index] = newFilterArray;
    const newArray = filters.slice()
    setTempFilters(newArray)
    setFilters(newArray)
    setIsAddOn(false);
  }
  const setTempFilterValue = (index) => (innerIndex,value) => {
    tempFilters[index][innerIndex] = value;
    setTempFilters(tempFilters.slice());
  }
  const removefromOrignalFilters = (filterArray) => {
    const index = filters.indexOf(filterArray);
    filters.splice(index, 1)
    const newArray = filters.slice()
    console.log(newArray,'<-----------------newArray')
    setTempFilters(newArray)
    setFilters(newArray)
    setIsAddOn(false);
  }
  const createNewFilters = () => {
    const len = tempFilters.length;
    console.log(tempFilters,tempFilters[len-1].join(''),'<-----------------tempFilters[len-1].join')
    // if(tempFilters[len-1].join('') !== ''){
    //   tempFilters.push(['','','']);
    //   setTempFilters(tempFilters.slice())
    // }
    setIsAddOn(true);
    
  }
  /*
    filters: [
      [
        category: <string>,
        relation: <string>,
        option: <string>
      ],
      ...
    ],
    setFilters: fn(
      [
        [
          category: <string>,
          relation: <string>,
          option: <string>
        ],
        ...
      ]
    )
  */
  return (
    <div className={styles.Searchbar}>
      {filters.map((filter, index) => (
        <Filter
        setToOrignalFiltersArray={setToOrignalFiltersArray(index)}
        setTempFilterValue={setTempFilterValue}
        removefromOrignalFilters={removefromOrignalFilters}
          filter={filter}
          key={`filter-${index}`}
          isAddOn={isAddOn}
          setIsAddOn={setIsAddOn}
        />
      ))}
      {console.log(isAddOn,'jkdnbkjsf')}
      <SearchAndFilterButton createNewFilters={createNewFilters} isAddOn={isAddOn} setIsAddOn={setIsAddOn}  />
    </div>
  )
}


function SearchAndFilterButton({createNewFilters,  isAddOn, setIsAddOn}) {
  if(!isAddOn){
    return <div onClick={createNewFilters}>Search or add filters</div>
  }
  return       <Filter
  // setTempFilterValue={setTempFilterValue}
  // removefromOrignalFilters={removefromOrignalFilters}
    filter={['','','']}
    // key={filter}
    isAddOn={isAddOn}
    setIsAddOn={setIsAddOn}
  />
}