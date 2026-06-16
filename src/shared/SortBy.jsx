import styles from '../css/TodosPage.module.css'
function SortBy({ sortBy, sortDirection, onSortByChange, onSortDirectionChange }) {

    return (
        <div className={styles.sortContainer}>
            <label htmlFor="sortBy">Sort By</label>
            <select className={styles.sortBy} id="sortBy" value={sortBy} onChange={(e) => onSortByChange(e.target.value)}>
                <option value="createdAt">Creation Date</option>
                <option value="title">Title</option>
            </select>
            <label htmlFor="Order">Order </label>
            <select className={styles.order} id="Order" value={sortDirection} onChange={(e) => onSortDirectionChange(e.target.value)}>
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
            </select>
        </div>
    )

}
export default SortBy;