import Axios from "axios";
import {receiveMessageOnPort} from "worker_threads";

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
      console.log(data)
      Axios.post(`/api/doctors/`, data, config)
        .then(response => {
          console.log(response);
          resolve(response);
        })
        .catch(error => {
          console.log(error)
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
      console.log(data)
      Axios.post(`/api/institutions/`, data, config)
        .then(response => {
          console.log(response);
          resolve(response);
        })
        .catch(error => {
          console.group(error)
          reject(error);
        })
    })
  }
}

export function SignIn(email : string, password : string, isDoctor : boolean){

  const data = {
    email,
    password
  }

  if(isDoctor){
    return new Promise((resolve, reject) => {
      Axios.post(`/api/doctors/session`, data)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        })
    })
  } else {
    return new Promise((resolve, reject) => {
      Axios.post(`/api/institutions/session`, data)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        })
    })
  }
}
