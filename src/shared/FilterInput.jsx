
function FilterInput({filterTerm, onFilterChange})
{
    return(
        <div className="filter-container">
            <label htmlFor="filterInput" className="filter-label">Search todos</label>
            <input 
                id='filterInput' 
                className="filter-input"
                type='text'
                value ={filterTerm}
                onChange = {((e)=>onFilterChange(e.target.value))}
                placeholder='Search by title...' 
            />
        </div>
    )

}
export default FilterInput;
