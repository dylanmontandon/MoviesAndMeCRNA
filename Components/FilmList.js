// Components/FilmList.js

import FilmItem from './FilmItem'
import FilmItemSimple from './FilmItemSimple'

import React from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

class FilmList extends React.Component {

  constructor(props) {
      super(props)
      this.state = {
        films: []
      }
    }

    _displayDetailForFilm = (idFilm) => {
      //console.log("Display film " + idFilm)
      // On a récupéré les informations de la navigation, on peut afficher le détail du film
      this.props.navigation.navigate("FilmDetail", {idFilm: idFilm})
   }

   _renderItem(item) {
     //si c'est la liste de films vus, on affiche les items de façon simplifiée
     if(this.props.seenList) {
       return(
       <FilmItemSimple
         film={item}
         isFilmFavorite={(this.props.favoritesFilm.findIndex(film => film.id === item.id) !== -1) ? true : false}
         isFilmSeen={(this.props.seenFilms.findIndex(film => film.id === item.id) !== -1) ? true : false}
         displayDetailForFilm={this._displayDetailForFilm}
       />
     )
     } else {
       return (
       <FilmItem
         film={item}
         isFilmFavorite={(this.props.favoritesFilm.findIndex(film => film.id === item.id) !== -1) ? true : false}
         isFilmSeen={(this.props.seenFilms.findIndex(film => film.id === item.id) !== -1) ? true : false}
         displayDetailForFilm={this._displayDetailForFilm}
       />
     )
     }
   }

   render() {
       return (
           <FlatList
             style={styles.list}
             data={this.props.films}
             extraData={this.props.favoritesFilm}
             keyExtractor={(item) => item.id.toString()}
             renderItem={({item}) => (
               this._renderItem(item)
           )}
             onEndReachedThreshold={0.5}
             onEndReached={() => {
               if (!this.props.favoriteList && !this.props.seenList && this.props.page < this.props.totalPages) {
                 // On appelle la méthode loadFilm du component Search pour charger plus de films
                 this.props.loadFilms()
               }
             }}
           />
       )
     }
   }

   const styles = StyleSheet.create({
     list: {
       flex: 1
     }
   })

//permet de connecter le state de l'application au component FilmDetail.
//If this argument is specified, the new component will subscribe to Redux store updates.
//This means that any time the store is updated, mapStateToProps will be called.
//The results of mapStateToProps must be a plain object, which will be merged into the component’s props.
const mapStateToProps = state => {
  return {
      favoritesFilm: state.toggleFavorite.favoritesFilm,
      seenFilms: state.toggleSeen.seenFilms
  }
}

export default connect(mapStateToProps)(FilmList)
