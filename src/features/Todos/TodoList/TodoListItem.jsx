import { useState } from "react";
import styles from '../../../css/TodosPage.module.css'
import TextInputWithLabel from "../../../shared/TextInputWithLabel";
import { isValidTodoTitle } from "../../../utils/todoValidation";
import { useEditableTitle } from "../../../hooks/useEditableTitle";
import { sanitizeInput } from "../../../utils/sanitize";
function TodoListItem({ todo, onCompleteTodo, onUpdateTodo, onDeleteTodo }) {

    const {
        isEditing,
        workingTitle,
        startEditing,
        cancelEdit,
        updateTitle,
        finishEdit
    } = useEditableTitle(todo.title);
    const handleCancel = cancelEdit;

    const handleEdit = (event) => {
        updateTitle(event.target.value);
    }
    const handleUpdate = (event) => {
        if (!isEditing) {
            return;
        }
        event.preventDefault();
        const finalTitle = sanitizeInput(finishEdit());
        onUpdateTodo({ ...todo, title: finalTitle });

    }
    return (
        <li className={styles.listTodo}>
            <form onSubmit={handleUpdate} className={styles.todoEditRow}>
                {isEditing ?
                    (<>
                        <div className={styles.todoInputGroup}>
                            <TextInputWithLabel
                                value={workingTitle}
                                onChange={handleEdit}
                                labelText="Todo"
                                elementId={`editTitle${todo.id}`} />
                        </div>
                        <button type="button" className={styles.cancelButton} onClick={handleCancel}> Cancel </button>
                        <button type="button" className={styles.updateButton} onClick={handleUpdate} disabled={!isValidTodoTitle(workingTitle)}> Update </button>
                        <button
                            type="button"
                            className={styles.deleteButton}

                            onClick={() => onDeleteTodo(todo.id)}
                        >
                            Delete
                        </button>
                    </>)
                    :
                    (<div className={styles.checkboxWrapper}>
                        <label>
                            <input
                                type="checkbox"
                                id={`checkbox${todo.id}`}
                                checked={todo.isCompleted}
                                onChange={() => onCompleteTodo(todo.id)}
                            />
                        </label>
                        <span onClick={startEditing}>{todo.title}</span>


                    </div>
                    )
                }

            </form>
        </li>
    )
}
export default TodoListItem;