export default function ItemReducer(state, action) {
    if (action.type === 'get') {
        return action.allItems;
    }
}
