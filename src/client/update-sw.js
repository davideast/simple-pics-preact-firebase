
self.addEventListener('message', event => {

  if(!event.data) { return; }

  switch(event.data) {
    case 'skipWaiting': 
      self.skipWaiting();
      return;
    default:
      break;
  }

});