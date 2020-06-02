import axios from "axios";


function fetchData(id = "") {
  return axios
      .get("/api/todo" + id)
      .then(response => {return response.data})
      .catch(error => console.log(error))
}

const fetchAllTaskLists = () => {
  return fetchData()
};

const fetchTaskListById = id => {
  return fetchData(id)
};

const addTaskList = req => {
  return axios
      .get("/api/todo", req)
      .then(response => {return response.data})
      .catch(error => console.log(error))
};

const editTaskList = req => {
  return axios
      .get("/api/todo", req)
      .then(response => {return response.data})
      .catch(error => console.log(error))
};

const deleteTaskListById = id => {
  return axios
      .delete("/api/todo" + id)
      .then(response => {return response.data})
      .catch(error => console.log(error))
};

module.exports = {
  fetchAllTaskLists,
  fetchTaskListById,
  addTaskList,
  editTaskList,
  deleteTaskListById
};
