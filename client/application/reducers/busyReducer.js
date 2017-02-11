/**
 * Created by igor on 11.02.17.
 */

const map = ['disabled', 'track', 'sedan'];
const bysyCan = {
    disabled: [0, 2, 1],
    sedan: [2, 1],
    track: [1]
};

export default function reducer (store = localStorage.getItem('savePark') ? JSON.parse(localStorage.getItem('savePark')) : {
    all: {
        track: 10,
        disabled: 5,
        sedan: 15
    },
    busy: {
        track: [],
        disabled: [],
        sedan: []
    },
    notFree: false
}, action) {
    switch (action.type) {
        case 'ADD_CAR' : {
            const typeCar = map[action.car];
            let addTo = null;

            for (const can of bysyCan[typeCar]) {
                if (addTo == null && store.busy[map[can]].length < store.all[map[can]]) {
                    addTo = map[can];
                }
            }

            if (addTo != null) {
                store.busy[addTo] = [...store.busy[addTo], typeCar];
                store = { ...store, ...{ busy: store.busy } };
            } else {
                store = { ...store, ...{ notFree: true } };
            }
            break;
        }

        case 'CLOSE_MODAL' : {
            store = { ...store, ...{ notFree: false } };
            break;
        }

        case 'REMOVE_CAR' : {
            const newArr = [...store.busy[action.parkType]];
            newArr.splice(action.index, 1);
            store.busy[action.parkType] = newArr;
            store = { ...store, ...{ busy: store.busy } };
            break;
        }
    }

    localStorage.setItem('savePark', JSON.stringify(store));

    return store;
}
