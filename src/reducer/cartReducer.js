export const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case 'ADD':
            if(!payload.id) return state
            const newState = [...state, payload];

            const countProductsByNames = () => {
                return newState.reduce((acc, product) => {
                    if (!acc[product.id]) {
                        acc[product.id] = 0;
                    }
                    if (product.count) {
                        acc[product.id] += product.count;
                    } else {
                        acc[product.id]++;
                    }

                    return acc;
                }, {});
            };
            const listCount = countProductsByNames();
            const filter = newState.filter(
                (product, index, self) =>
                    index === self.findIndex((p) => p.id === product.id),
            );
            const listProductsState = filter.map((product) => {
                return {
                    ...product,
                    count: listCount[product.id],
                };
            });

            return listProductsState;
        case 'REMOVE':
            const filteredProducts = state.filter(
                (product) => product.id !== payload.id,
            );
            return [...filteredProducts];
        default:
            return state;
    }
};
