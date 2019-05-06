var pokedex = document.getElementById('pokedex');
var pokemonNameInput = document.getElementById('pokemonNameInput');
var searchButton = document.getElementById('searchButton');
var pokemonName = document.getElementById('pokemonName');
var pokemonId = document.getElementById('pokemonId');
var imageHolder = document.getElementById('imageHolder');
var pokemonMoves = document.getElementById('pokemonMoves');
var previousEvolution = document.getElementById('previousEvolution');
var previousEvolutionText = document.getElementById('previousEvolutionText');
var previousEvolutionImage = document.getElementById('previousEvolutionImage');

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
        pokemonMoves.innerHTML = "";
        previousEvolutionText.innerHTML = "";
        previousEvolutionImage.innerHTML = "";
      } else {
        pokemonName.innerHTML = "Pokemon name: "+ pokename;

        //nieuwe call om id nummer te weten en picture
        var xhr2 = new XMLHttpRequest();

        xhr2.onload = function(){
          if (xhr2.status === 200){
            var pokemonTypeObject = JSON.parse(xhr2.responseText);

            //id
            pokemonId.innerHTML = "ID: " + pokemonTypeObject.id;


            //picture
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


            //4 moves
            pokemonMoves.innerHTML = "";
            for (let i = 0 ; i < 4 ; i++){
              pokemonMoves.innerHTML += "move "+ (i+1) + ": " + pokemonTypeObject.moves[i].move.name + "<br/>";
            }

            //previous evolution
            var xhr3 = new XMLHttpRequest();

            xhr3.onload = function(){
              if(xhr3.status === 200){
                var evolutionObject = JSON.parse(xhr3.responseText);
                if (evolutionObject.evolves_from_species) {
                  previousEvolutionText.innerHTML = "Previous evolution: " + evolutionObject.evolves_from_species.name;

                  //picture of previous evolution

                  var xhr4 = new XMLHttpRequest();

                  xhr4.onload = function() {
                    if(xhr4.status === 200){
                      var evolution2Object = JSON.parse(xhr4.responseText);

                      //nieuwe call
                      var xhr5 = new XMLHttpRequest();

                      xhr5.onload = function() {
                        if(xhr5.status === 200){
                          var pokemonPictureObject = JSON.parse(xhr5.responseText);

                          //showing the previous picture
                          if (document.getElementById("previousPicture")){
                            pokemonImageRemove2=document.getElementById("previousPicture");
                            previousEvolutionImage.removeChild(pokemonImageRemove2);
                          }

                          var picture2 = document.createElement('img');
                          picture2.id="previousPicture";
                          picture2.src=pokemonPictureObject.sprites.front_default;
                          picture2.height="200";
                          picture2.width="200";
                          previousEvolutionImage.appendChild(picture2);

                        }
                      };
                      xhr5.open('GET',evolution2Object.varieties[0].pokemon.url,true);
                      xhr5.send(null);

                    }
                  };
                  xhr4.open('GET',evolutionObject.evolves_from_species.url,true);
                  xhr4.send(null);

                } else {
                  previousEvolutionText.innerHTML = "No previous evolution!";
                  if (document.getElementById("previousPicture")){
                    pokemonImageRemove3=document.getElementById("previousPicture");
                    previousEvolutionImage.removeChild(pokemonImageRemove3);
                  }
                }
              }
            };
            xhr3.open('GET',pokemonTypeObject.species.url,true);
            xhr3.send(null);
          }
        };

        xhr2.open('GET',url,true);
        xhr2.send(null);

      }
    }
  };

  xhr.open('GET','https://pokeapi.co/api/v2/pokemon?limit=964',true);
  xhr.send(null);

}
