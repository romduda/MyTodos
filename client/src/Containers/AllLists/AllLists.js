import './AllLists.css';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ListItem } from '../../Components/ListItem/ListItem';
import { AddList } from '../../Components/AddList/AddList';
import {
  fetchAllListsAsync,
  addListAsync,
  selectLists,
} from './allListsSlice';

export function AllLists() {
  const lists = useSelector(selectLists);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllListsAsync());
  }, [dispatch]);
  const renderedLists = lists.map((list) => <ListItem key={list._id} title={list.title} />);
  return (
    <div>
      <h1>Lists</h1>
      <AddList addListHandler={addListAsync} />
      <div>{renderedLists}</div>
    </div>
  );
}
