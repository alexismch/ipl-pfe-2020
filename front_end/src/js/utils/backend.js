import Axios from "axios";

export function editModel(newObject, id, token, url) {
  return new Promise((resolve, reject) => {
    var config = {
      headers: { Authorization: "Bearer " + token }
    };
    Axios.put(url + "/" + id, newObject, config)
      .then(function(response) {
        resolve();
      })
      .catch(function(error) {
        reject();
      });
  });
}

export function addNewModel(newObject, token, url) {
  return new Promise((resolve, reject) => {
    var config = {
      headers: { Authorization: "Bearer " + token }
    };
    Axios.post(url, newObject, config)
      .then(function(response) {
        resolve();
      })
      .catch(function(error) {
        reject();
      });
  });
}


export function deleteModel(rowid, token, url) {
  return new Promise((resolve, reject) => {
    var config = {
      headers: { Authorization: "Bearer " + token }
    };
    Axios.delete(url+"/"+rowid, config)
      .then(function(response) {
        resolve();
      })
      .catch(function(error) {
        reject();
      });
  });
}

export function triggerBackend(
  token,
  url
) {
  return new Promise((resolve, reject) => {

    var config = {
      headers: { Authorization: "Bearer " + token }
    };
    Axios.get(url, config)
      .then(function(response) {
        resolve();
      })
      .catch(function(error) {
        reject();
      });
    });
  }

export function fetchAPI(url)
{
  return new Promise((resolve, reject) => {
  Axios.get(url)
    .then(function(response) {
      resolve(
        response.data
      );
    })
    .catch(function(error) {
      console.log(error);
      reject();
    });
  });
}

export function fetchData(
  token,
  query,
  baseURL,
  optionalFetchOptions
) {
  return new Promise((resolve, reject) => {

    let url = baseURL + "?";
    url += "pageSize=" + query.pageSize;
    url += "&pageNumber=" + (query.page + 1);
    url += "&search=" + query.search;

    if(optionalFetchOptions) { 
      url+= optionalFetchOptions    
    }

    if (query.orderBy) {
      url += "&orderBy=" + query.orderBy.field;
      url += "&dir=" + query.orderDirection;
    }
    var config = {
      headers: { Authorization: "Bearer " + token }
    };
    Axios.get(url, config)
      .then(function(response) {
        resolve({
          data: response.data.Data,
          page: response.data.PageIndex - 1,
          totalCount: response.data.TotalCount
        });
      })
      .catch(function(error) {
        resolve({ data: [], page: 0, totalCount: 0 });
      });
  });
}

export function fetchIndicatorsForCoordinates(token, coords, indicators, color, address){
  const config = {
    headers: { Authorization: "Bearer " + token }
  };
  var stringIndicators = ''

  if(indicators && indicators.length > 0){
    indicators.forEach(element => stringIndicators === '' ? stringIndicators = element : stringIndicators += "," + element);

    return new Promise((resolve, reject) => {
      Axios.get(`/profile/point?latitude=${coords.lat}&longitude=${coords.lng}&filter=${stringIndicators}`, config)
      .then(function(response) { 
          resolve ({
            data: { data : response.data, color : color, address : address}
          })
      })
      .catch(function(error) {
        console.log(error);
        reject();
      })
    });
  }
  return new Promise((resolve, reject) => {
    resolve ({
     data: null
    })
  })
}

export function fetchDensity(indicators, index, conf){
  const config = {
    headers: { Authorization: "Bearer " + conf.token },
    /*cancelToken: conf.source.token*/
};

  return new Promise((resolve, reject) => {
    let txt = ""
    indicators.forEach((e,idx, array)=> {
      if (idx === array.length - 1){ 
        txt += e.label;
      } else {
        txt += `${e.label},`;
      }
    })
    Axios.get(`/profile/density?filter=${txt}&count=1000&round=${index}`, config)
    .then(function(response) { 
        resolve(response.data)
    })
    .catch(function(error) {
      console.log(error);
      reject();
    })
  })
}