const initialState = {
  menu: [],
  loading: true,
  error: false,
  items: [],
  totalPrice: 0
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'MENU_LOADED':
      return {
        ...state,
        menu: action.payload,
        loading: false,
        error: false
      };
    case 'MENU_REQUESTED':
      return {
        ...state,
        loading: true
      };
    case 'MENU_ERROR':
      return {
        ...state,
        loading: false,
        error: true
      };
    case 'ITEM_ADD_TO_CART':
      const id = action.payload;

      // item already exist
      const itemInd = state.items.findIndex(item => item.id === id);
      if (itemInd >= 0) {
        const existItem = state.items[itemInd];
        const newItem = {
          ...existItem,
          qtty: ++existItem.qtty
        }
        return {
          ...state,
          items: [
            ...state.items.slice(0, itemInd),
            newItem,
            ...state.items.slice(itemInd + 1)
          ],
          totalPrice: state.totalPrice + newItem.price
        }
      }

      // new item
      const item = state.menu.find(item => item.id === id);
      const newItem = {
        title: item.title,
        price: item.price,
        url: item.url,
        id: item.id,
        qtty: 1
      };

      return {
        ...state,
        items: [
          ...state.items,
          newItem
        ],
        totalPrice: state.totalPrice + newItem.price
      };
    case 'ITEM_DELETE_FROM_CART':
      const idx = action.payload;
      const itemIndex = state.items.findIndex(item => item.id === idx);
      const price = state.items[itemIndex]['price'] * state.items[itemIndex]['qtty'];
      return {
        ...state,
        items: [
          ...state.items.slice(0, itemIndex),
          ...state.items.slice(itemIndex + 1)
        ],
        totalPrice: state.totalPrice - price
      }
    default:
      return state;
  }
}

export default reducer;