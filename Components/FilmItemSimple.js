// Components/FilmItemSimple.js

import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { getImageFromApi } from '../API/TMDBApi'
import FadeIn from '../Animations/FadeIn'

class FilmItemSimple extends React.Component {

  _displayFavoriteImage() {
    //Test to display image
    if (this.props.isFilmFavorite) {
    return (
      <Image
        style={styles.favorite_image}
        source={require('../Images/ic_favorite.png')}
      />
      )
    }
  }

  render() {
    const film = this.props.film
    const displayDetailForFilm = this.props.displayDetailForFilm

    return (
      <FadeIn>
        <TouchableOpacity
          style={styles.main_container}
          onPress={() => displayDetailForFilm(film.id)}>
          <View style={styles.content_container}>
              <Image
                style={styles.image}
                source={{uri: getImageFromApi(film.poster_path)}}
              />
              {this._displayFavoriteImage()}
              <Text style={styles.title_text}>{film.title}</Text>
          </View>
        </TouchableOpacity>
      </FadeIn>
    )
  }
}

const styles = StyleSheet.create({
 main_container: {
   height: 80,
   flexDirection: 'row'
 },
 image: {
   flex: 1,
   width: 75,
   height: 75,
   //l'image n'est parfaitement ronde, je ne sais pas la cause de cela...
   borderRadius: 75/2,
   margin: 5,
   backgroundColor: 'gray'
 },
 content_container: {
   flex: 1,
   alignItems: 'center',
   flexDirection: 'row',
   margin: 5
 },
 title_text: {
   fontWeight: 'bold',
   color: 'gray',
   fontSize: 20,
   flex: 3,
   flexWrap: 'wrap',
   margin: 5
 },
 favorite_image: {
   margin: 5,
   width: 20,
   height: 20
 }
})

export default FilmItemSimple
