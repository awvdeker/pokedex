var pokemonName = document.getElementById('pokemonName');
var searchButton = document.getElementById('searchButton');

searchButton.addEventListener('click', function(){
  searching (pokemonName.value);
});


function searching (pokename) {

  var xhr = new XMLHttpRequest();

  xhr.onload = function(){
    if(xhr.status === 200){
      responseObject = JSON.parse(xhr.responseText);
      //for (let i = 0 ; i<responseObject.results.length ; i++){

        //if (){break;}
      //}
      document.getElementById('pokedex').innerHTML += "Pokemon Name: "+responseObject.results[1].name;
    }
  };

  xhr.open('GET','https://pokeapi.co/api/v2/pokemon?limit=964',true);
  xhr.send(null);

}
