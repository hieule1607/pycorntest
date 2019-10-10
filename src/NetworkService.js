
var PycoApiClient = {

  async sendRequestToBackend(url, param, type, onDataReceived) {
    try {
      let response = await fetch(url, {
        method: type,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: (type != "GET") ? JSON.stringify(param) : null,
      })
      let responseJson = await response.json()
      return onDataReceived(responseJson)
    } catch (error) {
      console.warn(error)
    }
  }
}

module.exports = PycoApiClient;