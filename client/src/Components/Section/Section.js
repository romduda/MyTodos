import './Section.css';
import React from 'react';
import { AddTask } from '../AddTask/AddTask';
import { Task } from '../Task/Task';
import { SectionMenu } from '../SectionMenu/SectionMenu';

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
  const renderedSectionMenu = isDefaultSection
    ? ''
    : (<SectionMenu sectionId={sectionId} />);
  const renderedTasks = tasks.map((task) => (
    <Task
      key={task._id}
      id={task._id}
      title={task.title}
      complete={task.complete}
      notes={task.notes}
      lists={task.lists}
      sectionId={sectionId}
      currentListId={listId}
    />
  ));
  return (
    <div className="Section">
      <div className={`Section__header ${isDefaultSection ? '' : 'Section__header--border-bottom'}`}>
        {renderedTitle}
        {renderedSectionMenu}
      </div>
      <AddTask sectionId={sectionId} listId={listId} />
      {renderedTasks}
    </div>
  );
}
