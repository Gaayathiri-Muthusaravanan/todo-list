function SortBy({sortBy, sortDirection, onSortByChange, onSortDirectionChange}){

    return(
        <>
            <label htmlFor="sortBy">Sort By</label>
            <select id="sortBy" value={sortBy} onChange={(e)=>onSortByChange(e.target.value)}>
                <option>Creation Date</option>
                <option>Title</option>
            </select>
             <label htmlFor="Order">Order</label>
            <select id="Order" value={sortDirection} onChange={(e)=>onSortDirectionChange(e.target.value)}>
                <option>Descending</option>
                <option>Ascending</option>
            </select>
        </>
    )

}
export default SortBy;