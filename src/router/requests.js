import axios from "axios";

class API {
  static fetchData(id = "") {
    return axios
      .get("/api/todo/" + id)
      .then(response => {
        return response.data;
      })
      .catch(error => console.log(error));
  }

  static fetchAllTaskLists = () => {
    return this.fetchData();
  };

  static fetchTaskListById = id => {
    return this.fetchData(id);
  };

  static addTaskList = req => {
    return axios
      .post("/api/todo", req)
      .then(response => {
        return response.data;
      })
      .catch(error => console.log(error));
  };

  static editTaskList = req => {
    return axios
      .put("/api/todo", req)
      .then(response => {
        return response.data;
      })
      .catch(error => console.log(error));
  };

  static deleteTaskListById = id => {
    return axios
      .delete("/api/todo/" + id)
      .then(response => {
        return response.data;
      })
      .catch(error => console.log(error));
  };
}

export { API };
