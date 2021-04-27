// AutocompleteItem

import './AutocompleteItem.css';
import React from 'react';

export function AutocompleteItem({
  task,
  listId,
  sectionId,
  handleAddExistingTask,
}) {
  const taskDetails = {
    taskId: task._id,
    listId,
    sectionId,
  };
  console.log('task inside AutocompleteItem component', task);
  console.log('task.lists inside AutocompleteItem component', task.lists);
  const lists = task.lists.map((list) => (
    <div className="AutocompleteItem__other-list-task-is-in">{list.title}</div>
  ));

  return (
    <div
      className="AutocompleteItem"
      onClick={(e) => handleAddExistingTask(e, taskDetails)}
      onKeyDown={(e) => handleAddExistingTask(e, taskDetails)}
      tabIndex={0}
      role="button"
    >
      <div className="AutocompleteItem__taskTitle">{task.title}</div>
      {lists}
    </div>
  );
}
