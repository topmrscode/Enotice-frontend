import { createStore } from 'redux';
import reducers from './reducers';

export function configureStore() {

    const store = createStore(
        reducers
    );


    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const nextRootReducer = require('./reducers');
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
