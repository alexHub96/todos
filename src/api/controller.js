const fs = require("fs");
const path = "./";
const file = "data.json";

const writeEncodedData = data => {
  return fs.writeFileSync(path + file, JSON.stringify(data));
};

const getDecodedData = () => {
  return JSON.parse(fs.readFileSync(path + file, "utf8"));
};

const getAllRecords = () => {
  return getDecodedData();
};

const getRecordById = id => {
  return getDecodedData().filter(item => item.cardId === id);
};

const addNewRecord = obj => {
  let data = getDecodedData();
  data.push(obj);
  writeEncodedData(data);
  return data;
};

const editRecord = obj => {
  let data = getDecodedData().filter(item => item.cardId !== obj.cardId);
  data.push(obj);
  let newData = data.sort((a, b) => {
    if (a.cardId < b.cardId) {
      return -1;
    }
    if (a.cardId > b.cardId) {
      return 1;
    }
    return 0;
  });
  writeEncodedData(newData);
  return newData;
};

const deleteRecord = id => {
  const data = getDecodedData().filter(item => item.cardId !== id);
  writeEncodedData(data);
  return data;
};

module.exports = {
  getAllRecords,
  getRecordById,
  addNewRecord,
  editRecord,
  deleteRecord
};
