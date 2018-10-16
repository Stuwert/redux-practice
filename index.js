let action = {
    type: 'ADD_TODO',
    todo: {
        id: 0,
        name: "Learn Redux",
        complete: false,
    },
};

let otherAction = {
    type: 'REMOVE_TODO',
    id: 0,
};

let lastAction = {
    type: 'TOGGLE_TODO',
    id: 0,
};

let goalAdd = {
    type: 'ADD_GOAL',
    goal: {
        id: 0,
        name: 'Run a Marathon',
    },
};

let goalRemove = {
    type: 'REMOVE_GOAL',
    id: 0
};

/**
 * Characteristics of a pure funciton
 *
 * 1) Always return the same results
 * 2) Depend only on values inside of scope.
 * 3) Never product side effects.
 */

 // Reducer
 // Takes the state and action and reduces them into a new single state
 function todos (state = [], action) {
     if (action.type === 'ADD_TODO') {
         // It's looking for a particular value of the param provided
         return state.concat([action.todo]);
     }

     return state;
 }


// So each action has a set of expected values associated with it
// So any value that hasn't been prescriptively associated to that action
// Will likely fail (will certainly fail?)
// So you're basically making this as predictable as possible
// It's higher overhead, but you're almost typing the transitions

function createStore (reducer) {
    // Four parts
    // 1. The state
    // 2. Get the state
    // 3. Listen to changes on the state
    // 4. Update the state

    let state;
    let listeners = [];

    const getState = () => state;

    // I'm still not exactly sure what this listener is supposed to do

    const subscribe = (listener) => {
        // Push the listener onto the stack
        listeners.push(listener);

        // Return a function which filters out the listener you pushed
        // From the ones there
        // Key is that this only happens when invoked.
        return () => {
            listeners = listeners.filter((l) => l !== listener)
        }
    }

    const dispatch = (action) => {
        // call todos
        // loop over listeners and invoke them.

        state = reducer(state, action);

        // Where the hell does the listener get hooked up?
        listeners.forEach((listener) => listener());
    }

    return {
        getState,
        subscribe,
        dispatch
    }
}

const store = createStore(todos);

const unsubscribe = store.subscribe(() => {
    console.log('The new state is: ', store.getState())
});

store.dispatch({
    type: 'ADD_TODO',
    todo: {
        id: 0,
        name: "Learn Redux",
        complete: false,
    },
})
// unsubscribe();
store.dispatch({
    type: 'ADD_TODO',
    todo: {
        id: 1,
        name: "bing bong",
        complete: false,
    }
})

console.log(store);