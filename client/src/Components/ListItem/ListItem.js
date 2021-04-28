/* eslint-disable react/jsx-props-no-spreading */
import './ListItem.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { showList, selectCurrentList } from '../../Containers/AllLists/allListsSlice';

const Container = styled.div`
border-radius: 3px;
border: 0px solid lightblue;
margin: 5px;
background-color: ${(props) => (props.isDragging ? ' rgb(200, 200, 200)' : 'white')};
`;

export function ListItem({ title, id, index }) {
  const dispatch = useDispatch();
  const currentList = useSelector(selectCurrentList);

  function onClickHandler() {
    dispatch(showList(id));
  }

  let boldClassName;
  if (currentList && currentList._id === id) {
    boldClassName = 'bold';
  } else {
    boldClassName = '';
  }

  return (
    <Draggable
      draggableId={id}
      index={index}
    >
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <div
            className="ListItem"
            onClick={onClickHandler}
            onKeyDown={onClickHandler}
            role="button"
            tabIndex={0}
          >
            <div className="ListItem__color" />
            <div className={`ListItem__title ${boldClassName}`}>{title}</div>
          </div>
        </Container>
      )}
    </Draggable>
  );
}
