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

// So each action has a set of expected values associated with it
// So any value that hasn't been prescriptively associated to that action
// Will likely fail (will certainly fail?)
// So you're basically making this as predictable as possible
// It's higher overhead, but you're almost typing the transitions

function createStore () {
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
        return () => {
            listeners = listeners.filter((l) => l !== listener)
        }
    }

    return {
        getState,
        subscribe,
    }
}

const store = createStore();
store.subscribe(() => {

});