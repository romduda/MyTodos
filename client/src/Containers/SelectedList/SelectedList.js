/* eslint-disable react/jsx-props-no-spreading */
import './SelectedList.css';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import {
  selectCurrentList,
  updateTasksOrderAsync,
  updateSectionsOrderAsync,
} from '../AllLists/allListsSlice';
import { selectShowAddSectionForm } from './selectedListSlice';
import { Section } from '../../Components/Section/Section';
import { ListMenu } from '../../Components/ListMenu/ListMenu';
import { AddSection } from '../../Components/AddSection/AddSection';

const SectionsWrap = styled.div`
  padding: 8px;
  `;

export function SelectedList() {
  const currentList = useSelector(selectCurrentList);
  const showAddSectionForm = useSelector(selectShowAddSectionForm);
  const dispatch = useDispatch();

  function onDragEnd(result) {
    const { destination, source, type } = result;
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId
      && destination.index === source.index
    ) {
      // eslint-disable-next-line no-useless-return
      return;
    }
    if (type === 'sections') {
      dispatch(updateSectionsOrderAsync({ source, destination }));
    }
    if (type === 'tasks') {
      dispatch(updateTasksOrderAsync({ source, destination }));
    }
  }

  let sections;
  if (currentList) {
    sections = currentList.sections.map((section, index) => (
      <Section
        key={section._id}
        sectionIndex={index}
        title={section.title}
        sectionId={section._id}
        listId={currentList._id}
        isDefaultSection={section.isDefaultSection}
        tasks={section.tasks}
      />
    ));
  } else {
    sections = '';
  }

  let addSectionForm;
  if (showAddSectionForm) {
    addSectionForm = (
      <AddSection listId={currentList ? currentList._id : ''} />
    );
  } else {
    addSectionForm = '';
  }

  let selectedListComponent;
  if (currentList) {
    selectedListComponent = (
      <div className="SelectedList">
        <div>Backbutton placeholder</div>
        <div className="SelectedList__header">
          <h1>{currentList ? currentList.title : '' }</h1>
          <ListMenu />
        </div>
        <DragDropContext
          onDragEnd={onDragEnd}
        >
          <Droppable droppableId={currentList._id} type="sections">
            {(provided) => (
              <SectionsWrap
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {sections}
                {provided.placeholder}
              </SectionsWrap>
            )}
          </Droppable>
        </DragDropContext>
        {addSectionForm}
      </div>
    );
  } else {
    selectedListComponent = '';
  }

  return (
    selectedListComponent
  );
}
