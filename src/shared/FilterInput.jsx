import styles from '../css/TodosPage.module.css'
function FilterInput({ filterTerm, onFilterChange }) {
    return (
        <div className={styles.filterContainer}>
            <label htmlFor="filterInput" className={styles.filterLabel}>Search todos</label>
            <input
                id='filterInput'
                className={styles.filterInput}
                type='text'
                value={filterTerm}
                onChange={((e) => onFilterChange(e.target.value))}
                placeholder='Search by title...'
            />
        </div>
    )

}
export default FilterInput;
