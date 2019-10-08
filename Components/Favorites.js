// Components/Favorites.js

import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import FilmList from './FilmList'
import Avatar from './Avatar'
import { connect } from 'react-redux'

class Favorites extends React.Component {

  _displayDetailForFilm = (idFilm) => {
    console.log("Display film " + idFilm)
    // On a récupéré les informations de la navigation, on peut afficher le détail du film
    this.props.navigation.navigate("FilmDetail", {idFilm: idFilm})
 }

  render() {
    console.log("favorites film: " + this.props.favoritesFilm)
    return (
      <View style={styles.main_container}>
        <View style={styles.avatar_container}>
          <Avatar/>
        </View>
        <FilmList
          films={this.props.favoritesFilm}
          navigation={this.props.navigation}
          //empêche l'appel à l'API
          favoriteList={true}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  avatar_container: {
    alignItems: 'center'
  }
})

//permet de connecter le state de l'application au component FilmDetail.
//If this argument is specified, the new component will subscribe to Redux store updates.
//This means that any time the store is updated, mapStateToProps will be called.
//The results of mapStateToProps must be a plain object, which will be merged into the component’s props.
const mapStateToProps = state => {
  return {
    favoritesFilm: state.toggleFavorite.favoritesFilm
  }
}

export default connect(mapStateToProps)(Favorites)
