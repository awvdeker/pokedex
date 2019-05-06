POKEDEX
=======

- search for a pokemon by name : if search button is clicked
a call to the pokeAPI is made and all 964 pokemons with their name
and url are loaded.

- if the input value matches one of the pokemons the following is shcown
 a call the url of that pokemon is made and of that json file :
  the id is retrieved,
  the picture via .sprites.front_default
  the first 4 moves of that pokemon

- the previous evolution was a bit more tricky, you go to .species url of
the pokemon (this is a third call), and then you take the .evolves_from_species of the json file
to know the name of the previous species.

- to get to the picture of the previous pokemon you need to do 2 other calls, to previous
species file and then to the corresponing pokemonfile whete you get to the url of the right
picture. 

- in total 5 calls to the API are done to get all the information

- no styling yet, this part of the exercise still has to be done!!
