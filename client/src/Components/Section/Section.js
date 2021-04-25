import './Section.css';
import React from 'react';
import { AddTask } from '../AddTask/AddTask';
import { Task } from '../Task/Task';

export function Section({
  title,
  sectionId,
  listId,
  isDefaultSection,
  tasks,
}) {
  const renderedTitle = isDefaultSection
    ? ''
    : (<h3 className="Section__title">{title}</h3>);
  const renderedTasks = tasks.map((task) => (<Task key={task._id} title={task.title} />));
  return (
    <div className="Section">
      {renderedTitle}
      <AddTask sectionId={sectionId} listId={listId} />
      {renderedTasks}
    </div>
  );
}
