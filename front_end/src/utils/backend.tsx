import Axios from "axios";

export function fetchIndicatorsForCoordinates(token : string){
  const config = {
    headers: { Authorization: "Bearer " + token }
  };
  var stringIndicators = ''

  // if(indicators && indicators.length > 0){
  //   indicators.forEach(element => stringIndicators === '' ? stringIndicators = element : stringIndicators += "," + element);

  //   return new Promise((resolve, reject) => {
  //     Axios.get(`/profile/point?latitude=${coords.lat}&longitude=${coords.lng}&filter=${stringIndicators}`, config)
  //     .then(function(response) { 
  //         resolve ({
  //           data: { data : response.data, color : color, address : address}
  //         })
  //     })
  //     .catch(function(error) {
  //       console.log(error);
  //       reject();
  //     })
  //   });
  // }
  return new Promise((resolve, reject) => {
    resolve ({
     data: null
    })
  })
}