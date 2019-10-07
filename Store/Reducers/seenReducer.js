// Store/Reducers/seenReducer.js

const initialState = { seenFilms: [] }

function toggleSeen(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'TOGGLE_SEEN':
      const seenFilmIndex = state.seenFilms.findIndex(item => item.id === action.value.id)
      if (seenFilmIndex !== -1) {
        // Le film est déjà dans les la liste des films vus, on le supprime de la liste
        nextState = {
          ...state,
          seenFilms: state.seenFilms.filter( (item, index) => index !== seenFilmIndex)
        }
      }
      else {
        // Le film n'est pas dans la liste des films vus, on l'ajoute à la liste
        nextState = {
          ...state,
          seenFilms: [...state.seenFilms, action.value]
        }
      }
      return nextState || state
  default:
    return state
  }
}

export default toggleSeen
