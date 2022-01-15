import axios from 'axios';

const apiUrl = "http://localhost:8080/api/stories";

export function getStories() {
    return axios.get(apiUrl);
}

export function addStory(story){
return axios.post(apiUrl, story)
}

export function updateStory(id, story) {
    return axios.put(apiUrl + "/" + id, story)
}

export function deleteStory(id){
    return axios.delete(apiUrl) + "/" + id
}