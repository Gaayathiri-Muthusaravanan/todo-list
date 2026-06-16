
import styles from'../css/TodosPage.module.css';
function TextInputWithLabel({ elementId, labelText, onChange, ref, value }) {
    return (
        <div className={styles.todoInputGroup}>
            <label className={styles.todoLabel} htmlFor={elementId}>{labelText}</label>
            <input
                type="text"
                id={elementId}
                ref={ref}
                value={value}
                onChange={onChange}
                maxLength={80}
                className={styles.todoInput}
            />
        </div>
    );
}
export default TextInputWithLabel;