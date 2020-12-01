import Axios from "axios";

export function Registration(token : string, name : string, email : string, password : string, inami : string){
  const config = {
    headers: { Authorization: "Bearer " + token }
  };

  var data = {};

  if(inami && inami !== ""){
    data = {
      fullName : name,
      email,
      password,
      inami
    }
    return new Promise((resolve, reject) => {
      Axios.post(`/api/doctors/`, data, config)
        .then(response => {
          resolve(response.data.token);
        })
        .catch(error => {
          reject(error);
        })
    })
  } else {
    data = {
      fullName : name,
      email,
      password
    }
    return new Promise((resolve, reject) => {
      Axios.post(`/api/institutions/`, data, config)
        .then(response => {
          resolve(response.data.token);
        })
        .catch(error => {
          reject(error);
        })
    })
  }
}

export function SignIn(token : string, email : string, password : string, isDoctor : boolean){
  const config = {
    headers: { Authorization: "Bearer " + token }
  };

  const data = {
    email,
    password
  }

  if(isDoctor){
    return new Promise((resolve, reject) => {
      Axios.post(`/api/doctors/login`, data, config)
        .then(response => {
          resolve(response.data.token);
        })
        .catch(error => {
          reject(error);
        })
    })
  } else {
    return new Promise((resolve, reject) => {
      Axios.post(`/api/institutions/login`, data, config)
        .then(response => {
          resolve(response.data.token);
        })
        .catch(error => {
          reject(error);
        })
    })
  }
}