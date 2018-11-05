import createStore from './library';

const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';

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

const addTodoAction = (todo) => {
    return {
        type: ADD_TODO,
        todo,
    }
};

const removeTodoAction = (id) => {
    return {
        type: REMOVE_TODO,
        id
    }
};

const toggleTodoAction = (id) => ({
    type: TOGGLE_TODO,
    id
});

const addGoalAction = (goal) => ({
    type: ADD_GOAL,
    goal
});

const removeGoalAction = (id) => ({
    type: REMOVE_GOAL,
    id
});

/**
 * Characteristics of a pure funciton
 *
 * 1) Always return the same results
 * 2) Depend only on values inside of scope.
 * 3) Never product side effects.
 */

 // Reducer
 // Takes the state and action and reduces them into a new single state
const todos = (state = [], action) => {
     switch (action.type) {
        case ADD_TODO:
            return state.concat([action.todo]);
        case REMOVE_TODO:
            return state.filter((todo) => todo.id !== action.id)
        case TOGGLE_TODO :
            return state.map((todo) => todo.id !== action.id ? todo :
                Object.assign({}, todo, { complete: !todo.complete })
            )
        default:
            return state;
    }
 }

 const goals = (state = [], action) => {
     switch(action.type) {
        case ADD_GOAL:
            return state.concat([action.goal]);
        case REMOVE_GOAL:
            return state.filter((goal) => goal.id === action.id);
        default:
            return state;
     }
 }

 // So the reducer will fire for each action.
 // I.e. goals will get todos actions and vice-versa
 // But the key won't match up.
const app = (state = {}, action) => {
     return {
         goals: goals(state.goals, action),
         todos: todos(state.todos, action)
     }
}

const store = createStore(app);

const unsubscribe = store.subscribe(() => {
    console.log('The new state is: ', store.getState())
});

store.dispatch(addTodoAction({
    id: 0,
    name: "Learn Redux",
    complete: false,
}))
// unsubscribe();
store.dispatch(addTodoAction({
    id: 1,
    name: "bing bong",
    complete: false,
}));

store.dispatch(addTodoAction({
    id: 2,
    name: "Learn to snowboard",
    complete: false
}));

store.dispatch(removeTodoAction(2));

store.dispatch(toggleTodoAction(0));
