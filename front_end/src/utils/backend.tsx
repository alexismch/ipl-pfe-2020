import Axios from "axios";
//import {receiveMessageOnPort} from "worker_threads";

export function doctorRegistration(firstName : string, lastName : string, email : string, password : string, inami : string){
  const data = {
    body : {
      "firstName": firstName,
      "lastName": lastName,
      "email": email,
      "password": password,
      "inami": inami
    }
  }

  return new Promise((resolve, reject) => {
    Axios.post("/api/doctors", data)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      })
  })
}

export function institutionRegistration(name : string, email : string, password : string, no : string){
  const data = {
    "name": name,
    "email": email,
    "password": password,
    "no": no
  }

  return new Promise((resolve, reject) => {
    Axios.post("/api/institutions", data)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      })
  })
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

export function getQRCodeToken(token:string){
  const config = {
    headers: { session: token }
  };

  //console.log(config.headers)
  return new Promise((resolve, reject) => {

    Axios.get(`/api/doctors/qrCodeToken`, config)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      })
  })
}
