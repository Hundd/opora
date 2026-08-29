function handler(event) {
  var request = event.request
  var uri = request.uri
  if (uri.includes('.')) {
    return request
  }
  if (uri.endsWith('/')) {
    request.uri = uri + 'index.html'
  } else {
    request.uri = uri + '/index.html'
  }
  return request
}
