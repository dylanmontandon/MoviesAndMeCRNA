// Components/FilmList.js

import FilmItem from './FilmItem'

import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import FilmList from './FilmList'

class SeenMovies extends React.Component {

    _displayDetailForFilm = (idFilm) => {
      console.log("Display film " + idFilm)
      // On a récupéré les informations de la navigation, on peut afficher le détail du film
      this.props.navigation.navigate("FilmDetail", {idFilm: idFilm})
   }

   render() {
     console.log("Seen movies: " + this.props.seenFilms)
     return (
       <View style={styles.main_container}>
         <FilmList
           films={this.props.seenFilms}
           navigation={this.props.navigation}
           //empêche l'appel à l'API
           seenList={true}
         />
       </View>
     )
   }
 }

   const styles = StyleSheet.create({
     main_container: {
       flex: 1
     },
   })

//permet de connecter le state de l'application au component FilmDetail.
//If this argument is specified, the new component will subscribe to Redux store updates.
//This means that any time the store is updated, mapStateToProps will be called.
//The results of mapStateToProps must be a plain object, which will be merged into the component’s props.
const mapStateToProps = state => {
  return {
    seenFilms: state.toggleSeen.seenFilms
  }
}

export default connect(mapStateToProps)(SeenMovies)
