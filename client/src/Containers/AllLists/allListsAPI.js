const baseUrl = 'http://localhost:3001';
const userId = '6082bc9b79cecad6de997c64';

// A mock function to mimic making an async request for data
export async function fetchAllLists() {
  try {
    const res = await fetch(`${baseUrl}/users/${userId}/lists`);
    return await res.json();
  } catch (error) {
    console.error(error);
  }
}
export async function addList(title) {
  try {
    const res = await fetch(`${baseUrl}/users/${userId}/lists`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({title})
    });
    return await res.json();
  } catch (error) {
    console.error(error);
  }
}
