function FilterInput({filterTerm, onFilterChange})
{
    return(
        <div>
            <label htmlFor="filterInput"></label>
            <input 
                id='filterInput' 
                type='text'
                value ={filterTerm}
                onChange = {((e)=>onFilterChange(e.target.value))}
                placeholder='Search by title...' 
            />
        </div>
    )

}
export default FilterInput;
