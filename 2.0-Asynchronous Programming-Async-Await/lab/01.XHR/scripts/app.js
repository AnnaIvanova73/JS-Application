function loadRepos() {
   const request = new XMLHttpRequest();

   request.addEventListener('readystatechange', () => {
      if(request.readyState === 4 && request.status === 200) {
         let res = document.getElementById('res');
         res.innerHTML = request.responseText
      }
   })
   request.open('GET',`https://api.github.com/users/testnakov/repos`);
   request.send();

}

