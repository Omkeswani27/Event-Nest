import { useState, useCallback } from "react"
import FilterBox from "../../components/FilterBox/FilterBox"
import SearchEventList from "../../components/SearchEventList/SearchEventList"
import './FilterEvents.css'


function FilterEvents() {
    const [monthYear, setMonthYear] = useState({
        selectedMonth: null,
        selectedYear: null
    })

    const getMonthYear = useCallback((selectedMonth,selectedYear)=>{
        setMonthYear({selectedYear,selectedMonth})
     },[])
    return (
        <div className="find-events-wrapper ">
            <FilterBox getMonthYear={getMonthYear}/>
            <SearchEventList monthYear={monthYear}/>
        </div>
    )
}

export default FilterEvents
