
function SortBy({sortBy, sortDirection, onSortByChange, onSortDirectionChange}){

    return(
        <div className="sort-container">
            <label htmlFor="sortBy">Sort By</label>
            <select id="sortBy" value={sortBy} onChange={(e)=>onSortByChange(e.target.value)}>
                <option value="createdAt">Creation Date</option>
                <option value = "title">Title</option>
            </select>
             <label htmlFor="Order">Order</label>
            <select id="Order" value={sortDirection} onChange={(e)=>onSortDirectionChange(e.target.value)}>
                <option value = "desc">Descending</option>
                <option value = "asc">Ascending</option>
            </select>
        </div>
    )

}
export default SortBy;