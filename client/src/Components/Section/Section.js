/* eslint-disable react/jsx-props-no-spreading */
import './Section.css';
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { AddTask } from '../AddTask/AddTask';
import { Task } from '../Task/Task';
import { SectionMenu } from '../SectionMenu/SectionMenu';

const TasksWrap = styled.div`
  padding: 8px;
  `;

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
  const renderedTasks = tasks.map((task, index) => (
    <Task
      key={task._id}
      id={task._id}
      title={task.title}
      complete={task.complete}
      notes={task.notes}
      lists={task.lists}
      sectionId={sectionId}
      currentListId={listId}
      index={index}
    />
  ));
  return (
    <div className="Section">
      <div className={`Section__header ${isDefaultSection ? '' : 'Section__header--border-bottom'}`}>
        {renderedTitle}
        {renderedSectionMenu}
      </div>
      <AddTask sectionId={sectionId} listId={listId} />
      <Droppable droppableId={sectionId}>
        {(provided) => (
          <TasksWrap
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {renderedTasks}
            {provided.placeholder}
          </TasksWrap>
        )}
      </Droppable>
    </div>
  );
}
