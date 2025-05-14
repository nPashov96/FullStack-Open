import axios from "axios";
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const addNew = newObject => {
    return axios.post(baseUrl, newObject)
}

const deletePerson = (id) => {
    return axios.delete(`http://localhost:3001/persons/${id}`)
}

const updatePerson = (id, newObject) => {
    return axios.put(`http://localhost:3001/persons/${id}`, newObject)
}

const getPerson = (id) => {
    return axios.get(`${baseUrl}/${id}`);
};

export default {
    getAll,
    addNew,
    deletePerson,
    updatePerson,
    getPerson
}
