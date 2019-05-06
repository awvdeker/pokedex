var pokedex = document.getElementById('pokedex');
var pokemonNameInput = document.getElementById('pokemonNameInput');
var searchButton = document.getElementById('searchButton');
var pokemonName = document.getElementById('pokemonName');
var pokemonId = document.getElementById('pokemonId');
var imageHolder = document.getElementById('imageHolder');

searchButton.addEventListener('click', function(){
  searching (pokemonNameInput.value);
});


function searching (pokename) {
  var xhr = new XMLHttpRequest();

  xhr.onload = function(){
    if(xhr.status === 200){
      var pokemonObject = JSON.parse(xhr.responseText);
      var found = false;
      for (let i = 0 ; i<pokemonObject.results.length ; i++){

        if (pokemonObject.results[i].name == pokename){
          found = true;
          var url = pokemonObject.results[i].url;
          break;
        }
      }
      if (!found) {
        pokemonName.innerHTML = 'Not found!';
        pokemonId.innerHTML = "";
        imageHolder.innerHTML = "";
      } else {
        pokemonName.innerHTML = "Pokemon name: "+ pokename;

        //nieuwe call om id nummer te weten en picture
        var xhr2 = new XMLHttpRequest();

        xhr2.onload = function(){
          if (xhr2.status === 200){
            var pokemonTypeObject = JSON.parse(xhr2.responseText);
            pokemonId.innerHTML = pokemonTypeObject.id;

            if (document.getElementById("shownPicture")){
              pokemonImageRemove=document.getElementById("shownPicture");
              imageHolder.removeChild(pokemonImageRemove);
            }

            var picture = document.createElement('img');
            picture.id="shownPicture";
            picture.src=pokemonTypeObject.sprites.front_default;
            picture.height="200";
            picture.width="200";
            imageHolder.appendChild(picture);

          }
        }

        xhr2.open('GET',url,true);
        xhr2.send(null);

      }
    }
  };

  xhr.open('GET','https://pokeapi.co/api/v2/pokemon?limit=964',true);
  xhr.send(null);

}
