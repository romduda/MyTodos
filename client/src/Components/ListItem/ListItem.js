import './ListItem.css';
import React from 'react';
import { useDispatch } from 'react-redux';
import { showList } from '../../Containers/AllLists/allListsSlice';

export function ListItem({ title, id }) {
  const dispatch = useDispatch();

  function onClickHandler() {
    dispatch(showList(id));
  }
  return (
    <div
      onClick={onClickHandler}
      onKeyDown={onClickHandler}
      className="ListItem"
      role="button"
      tabIndex={0}
    >
      <div className="ListItem__color" />
      <div className="ListItem__title">{title}</div>
    </div>
  );
}
