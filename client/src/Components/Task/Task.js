import './Task.css';
import React from 'react';
// import { useDispatch } from 'react-redux';
// import { showList } from '../../Containers/AllLists/allListsSlice';

export function Task({ title, id }) {
  // const dispatch = useDispatch();

  // function onClickHandler() {
  //   dispatch(showList(id));
  // }
  return (
    <div className="Task">
      <div className="Task__checkbox-wrap">
        <label htmlFor="check" id={id}>
          <input className="Task__checkbox" type="checkbox" name="check" id={id} />
        </label>
      </div>
      <div className="Task__title">{title}</div>
    </div>
  );
}
