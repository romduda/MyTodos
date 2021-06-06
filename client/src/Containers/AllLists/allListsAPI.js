import firebase, { getIdToken } from '../../auth/firebase';

const { REACT_APP_SERVER_URL, REACT_APP_USER_ID } = process.env;
const baseUrl = REACT_APP_SERVER_URL;
// Before implement user authentication, get userId from .env
const userId = REACT_APP_USER_ID;

function getAuthHeader(idToken) {
  return `Bearer ${idToken}`;
}

export async function fetchAllLists() {
  try {
    const idToken = await getIdToken(firebase);
    const res = await fetch(`${baseUrl}/users/${userId}/lists`, {
      method: 'GET',
      headers: {
        Authorization: getAuthHeader(idToken),
        'Content-Type': 'application/json',
      },
    });
    return await res.json();
  } catch (error) {
    console.error('fetchAllLists failed', error); // eslint-disable-line
    return null;
  }
}

export async function addList(title) {
  try {
    const res = await fetch(`${baseUrl}/users/${userId}/lists`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    return await res.json();
  } catch (error) {
    console.error(error); // eslint-disable-line
    return null;
  }
}

export async function updateListsOrderInDb(lists) {
  try {
    const res = await fetch(`${baseUrl}/users/${userId}/lists`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lists }),
    });
    return await res.json();
  } catch (error) {
    console.error(error); // eslint-disable-line
    return null;
  }
}

export async function updateTasksOrderInDb(listId, sections) {
  try {
    const res = await fetch(`${baseUrl}/users/${userId}/lists/${listId}/order`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sections }),
    });
    return await res.json();
  } catch (error) {
    console.error(error); // eslint-disable-line
    return null;
  }
}

export async function deleteList(listId) {
  try {
    const res = await fetch(`${baseUrl}/users/${userId}/lists/${listId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    return await res.json();
  } catch (error) {
    console.error(error); // eslint-disable-line
    return null;
  }
}

export async function addSection({ title, listId }) {
  try {
    const res = await fetch(`${baseUrl}/users/${userId}/lists/${listId}/sections/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    return await res.json();
  } catch (error) {
    console.error(error); // eslint-disable-line
    return null;
  }
}

export async function deleteSection({ listId, sectionId }) {
  try {
    const res = await fetch(`${baseUrl}/users/${userId}/lists/${listId}/sections/${sectionId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    return await res.json();
  } catch (error) {
    console.error(error); // eslint-disable-line
    return null;
  }
}

export async function addNewTask({ title, listId, sectionId }) {
  try {
    const res = await fetch(`${baseUrl}/users/${userId}/lists/${listId}/sections/${sectionId}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    return await res.json();
  } catch (error) {
    console.error(error); // eslint-disable-line
    return null;
  }
}

export async function addExistingTask({ taskId, listId, sectionId }) {
  try {
    const res = await fetch(`${baseUrl}/users/${userId}/lists/${listId}/sections/${sectionId}/tasks`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ taskId }),
    });
    return await res.json();
  } catch (error) {
    console.error(error); // eslint-disable-line
    return null;
  }
}

export async function updateTask({ taskId, payload }) {
  try {
    const res = await fetch(`${baseUrl}/users/${userId}/tasks/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (error) {
    console.error(error); // eslint-disable-line
    return null;
  }
}
