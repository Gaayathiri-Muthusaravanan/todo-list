
import '../css/TodosPage.module.css';
function TextInputWithLabel({ elementId, labelText, onChange, ref, value }) {
    return (
        <div className="todo-input-group">
            <label htmlFor={elementId}>{labelText}</label>
            <input
                type="text"
                id={elementId}
                ref={ref}
                value={value}
                onChange={onChange}
                className="todoInput"
            />
        </div>
    );
}
export default TextInputWithLabel;