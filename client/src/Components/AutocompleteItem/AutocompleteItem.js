// AutocompleteItem

import './AutocompleteItem.css';
import React from 'react';

export function AutocompleteItem({
  taskTitle,
  taskId,
  listId,
  sectionId,
  handleAddExistingTask,
}) {
  const taskDetails = {
    taskId,
    listId,
    sectionId,
  };
  return (
    <div
      className="AutocompleteItem"
      onClick={(e) => handleAddExistingTask(e, taskDetails)}
      onKeyDown={(e) => handleAddExistingTask(e, taskDetails)}
      tabIndex={0}
      role="button"
    >
      {taskTitle}
    </div>
  );
}
