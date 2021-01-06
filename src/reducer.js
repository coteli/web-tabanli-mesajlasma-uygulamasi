//Context API içerisinde kullanılacak durum ve işlemlerin tanımlandığı bileşendir.

export const initialState = {
  // Değişkenlerin başlangıç durumları
  user: null,
};

export const actionTypes = {
  // Değişkenler için aksiyon durumları
  SET_USER: "SET_USER",
  DELETE_USER: "DELETE_USER",
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.SET_USER: // Kullanıcı tanımlama durumu
      return {
        ...state,
        user: action.user,
      };
    case actionTypes.DELETE_USER: // Kullanıcı silme durumu
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default reducer;
