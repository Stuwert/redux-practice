// So at Havenly, the state tree is immutable JS.
 // Cool


// So each action has a set of expected values associated with it
// So any value that hasn't been prescriptively associated to that action
// Will likely fail (will certainly fail?)
// So you're basically making this as predictable as possible
// It's higher overhead, but you're almost typing the transitions

const createStore = (reducer) => {
    // Four parts
    // 1. The state
    // 2. Get the state
    // 3. Listen to changes on the state
    // 4. Update the state

    let state = {};
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

export default createStore;