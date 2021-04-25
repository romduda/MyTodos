import './SelectedList.css';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentList } from '../AllLists/allListsSlice';
import { Section } from '../../Components/Section/Section';

export function SelectedList() {
  const currentList = useSelector(selectCurrentList);
  let sections;
  if (currentList) {
    sections = currentList.sections.map((section) => (
      <Section
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

  return (
    <div className="SelectedList">
      <h1>{currentList ? currentList.title : '' }</h1>
      {sections}
    </div>
  );
}
