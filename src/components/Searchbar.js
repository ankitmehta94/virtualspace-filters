// component
import Filter from './filter/Filter'
import { useState } from 'react'

// style
import styles from './Searchbar.module.css'

export default function Searchbar({setFilters, filters}) {
  const setToOrignalFiltersArray = (index) => (newFilterArray) => {
    console.log(newFilterArray,'Searchbar','setFiltersArray')
    filters[index] = newFilterArray;
    const newArray = filters.slice()
    setFilters(newArray)
  }
  const removefromOrignalFilters = (filterArray) => {
    const index = findIndex([...filters], [...filterArray]);
    console.log(JSON.stringify(filters),'<-----------------filters Before')
    console.log(index,'<-----------------index')
    filters.splice(index, 1)
    console.log(JSON.stringify(filters),'<-----------------filters')
    const newArray = filters.slice()
    setFilters(newArray)
  }
  const addToOrignalFilters = (filterArray) => {
    filters.push(filterArray);
    const newArray = filters.slice()
    setFilters(newArray)
  }
  console.log(JSON.stringify(filters),'<-----------------filters', 'dwedfesfdwefer')
  return (
    <div className={styles.Searchbar}>
      {filters.map((filter, index) => {
        console.log(JSON.stringify(filter),'sdhjewbdfhsbcsjhdbshdbfs')
        return (
          <Filter
          setToOrignalFiltersArray={setToOrignalFiltersArray(index)}
          removefromOrignalFilters={removefromOrignalFilters}
          addToOrignalFilters={addToOrignalFilters}
            filter={filter} 
            key={`filter-${index}`}
          />
        )
      })}
      <SearchAndFilterButton  addToOrignalFilters={addToOrignalFilters}  />
    </div>
  )
}


function SearchAndFilterButton({ addToOrignalFilters}) {
  const [isAddOn, setIsAddOn] = useState(false);
  const createNewFilters = () => {
    setIsAddOn(true);
  }
  if(!isAddOn){
    return <div onClick={createNewFilters} className={styles['searchAddText']}>Search or add filters</div>
  }
  return <Filter
    filter={['','','']}
    isAddOn={isAddOn}
    setIsAddOn={setIsAddOn}
    addToOrignalFilters={addToOrignalFilters}
  />
}

function findIndex(bigArray,smallArray) {
  if(Array.isArray(bigArray) && Array.isArray(smallArray)){
    return bigArray.map((d) => d.join('')).indexOf(smallArray.join(''))
  }else{
    return -1
  }
}