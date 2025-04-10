import { collection, addDoc, getDocs, updateDoc, query, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const fetchTaskLists = async (userId: string) => {
    const taskListsCollection = query(collection(db, 'users', userId, 'taskLists'));
    const querySnapshot = await getDocs(taskListsCollection);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      name: doc.data().name, 
      tasks: doc.data().tasks || [],
      userId: userId
    }));
  };

  export const addTaskList = async (userId: string, listName: string) => {
    const docRef = await addDoc(collection(db, 'users', userId, 'taskLists'), {
      name: listName,
      tasks: [],
      userId,
    });
    return docRef.id;
  };

  export const updateTaskList = async (userId: string, listId: string, tasks: any[]) => {
    const listRef = doc(db, 'users', userId, 'taskLists', listId);
    await updateDoc(listRef, { tasks });
  };

  export const updateTaskListName = async (userId: string, listId: string, newName: string) => {
    const listRef = doc(db, 'users', userId, 'taskLists', listId);
    await updateDoc(listRef, { name: newName });
  };

  export const deleteTaskList = async (userId: string, listId: string) => {
    try {
      const listRef = doc(db, 'users', userId, 'taskLists', listId);
      await deleteDoc(listRef);
    } catch (e) {
      console.error('Error deleting task list: ', e);
    }
  };