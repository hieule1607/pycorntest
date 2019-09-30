
var PycoApiClient = {
  sendRequestToBackend: function(url, param, type, onDataReceived) {
    //Will update for method POST later
    fetch(url, {
        method: type,
        headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
        },
        body: (type != "GET") ? JSON.stringify(param) : null,
    })
    .then((response) => response.json())
    .then((responseData) => {
        onDataReceived(responseData)
    })
    .catch((error) => {
        console.warn(error);
    })
    .done();
  },

}

module.exports = PycoApiClient;