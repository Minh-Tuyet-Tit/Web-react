export const adminReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case 'SETADMIN':
            return {
                ...state,
                ...payload,
            };

        default:
            return state;
    }
};

export const adminStoresReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case 'GETSTORE':
            return {
                ...state,
                ...payload,
            };
        case 'ADD_MAIN_CATE':
            return {
                ...state,
                categories: [...state.categories, payload],
            };
        case 'UPDATE_PRODUCT':
            for (let i = 0; i < state.products.length; i++) {
                if (state.products[i].id === payload.id) {
                    state.products[i] = { ...payload };
                    break;
                }
            }
            return {
                ...state,
            };
        case 'ADD_PRODUCT':
            return {
                ...state,
                products: [...state.products, payload],
            };
        case 'REMOVE_PRODUCT':
            const newProducts = state.products.filter(product=>product.id!==payload.id);

            return {
                ...state,
                products: [...newProducts],
            };
        default:
            return state;
    }
};
