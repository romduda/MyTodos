/* eslint-disable react/jsx-props-no-spreading */
import './ListItem.css';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { showList } from '../../Containers/AllLists/allListsSlice';

const Container = styled.div`
border: 1px solid lightgrey;
border-radius: 2px;
padding: 8px;
margin-bottom: 8px;
background-color: white;
`;

export function ListItem({ title, id, index }) {
  const dispatch = useDispatch();

  function onClickHandler() {
    dispatch(showList(id));
  }

  return (
    <Draggable
      draggableId={id}
      index={index}
    >
      {(provided) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div
            className="ListItem"
            onClick={onClickHandler}
            onKeyDown={onClickHandler}
            role="button"
            tabIndex={0}
          >
            <div className="ListItem__color" />
            <div className="ListItem__title">{title}</div>
          </div>
        </Container>
      )}
    </Draggable>
  );
}
