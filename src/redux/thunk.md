# React Redux with Thunk — Detailed Teaching Notes

These notes are structured as a **teaching guide**, so you can use them for a classroom, bootcamp, or developer training session. The progression goes from **why Redux exists → Redux fundamentals → React-Redux → Redux Toolkit → asynchronous state with Thunk → a complete API project**.

---

# 1. Learning Objectives

By the end of the lesson, learners should be able to:

1. Explain why global state management is needed.
2. Distinguish **local state** from **global/application state**.
3. Explain Redux's unidirectional data flow.
4. Understand:

   * Store
   * State
   * Action
   * Reducer
   * Dispatch
   * Selector
5. Connect a React application to Redux.
6. Use **Redux Toolkit (RTK)** to write Redux logic.
7. Explain what middleware is.
8. Explain what Redux Thunk does.
9. Handle asynchronous API requests using `createAsyncThunk`.
10. Manage:

    * loading
    * success
    * error
11. Use normalized Redux state where appropriate.
12. Debug Redux applications.
13. Structure Redux code in a maintainable way.

---

# 2. The Problem Redux Solves

Start with a simple React application.

Suppose we have:

```text
App
├── Navbar
│   └── CartCount
├── ProductList
│   └── ProductCard
└── Cart
    └── CartItems
```

Suppose the cart is stored inside:

```jsx
const [cart, setCart] = useState([]);
```

inside `ProductList`.

Now `Navbar` also needs the cart count.

We have a problem.

```text
ProductList
    │
    └── cart
         │
         └── Navbar needs it
```

You could lift the state:

```text
App
├── Navbar
├── ProductList
└── Cart
```

and put:

```jsx
const [cart, setCart] = useState([]);
```

inside `App`.

But as applications grow, this becomes difficult.

You might end up with:

```text
App
 ↓
Dashboard
 ↓
Products
 ↓
ProductList
 ↓
ProductCard
```

passing state and callbacks through many components.

This is called **prop drilling**.

---

# 3. What Is Redux?

Redux is a **state management library**.

Its primary purpose is to provide a predictable way of managing application state.

Instead of having important application state scattered throughout components:

```text
Component A → state
Component B → state
Component C → state
Component D → state
```

Redux gives you a centralized store:

```text
                Redux Store
                    │
       ┌────────────┼────────────┐
       ↓            ↓            ↓
     users        products       cart
       ↑            ↑            ↑
       └──────── React components
```

The Redux store contains application state that needs to be shared.

---

# 4. Redux Is Not a Replacement for All React State

This distinction is important.

Do **not** teach students:

> "Redux replaces useState."

That's incorrect.

Use:

```jsx
useState()
```

for **local component state**.

Examples:

```text
Modal open/closed
Input value
Dropdown state
Hovered item
Temporary form state
```

Redux is appropriate for state shared across multiple parts of the application.

Examples:

```text
Authenticated user
Shopping cart
Products
Notifications
Application settings
Global filters
Server data
```

### Rule of thumb

Ask:

> "Does this state need to be accessed or modified by multiple unrelated components?"

If no:

```text
useState
```

If yes:

```text
Redux/global state
```

---

# 5. Redux's Core Architecture

Introduce the five important concepts:

```text
Store
State
Action
Reducer
Dispatch
```

The basic Redux flow is:

```text
User interaction
      ↓
   dispatch()
      ↓
    Action
      ↓
   Reducer
      ↓
New State
      ↓
 Redux Store
      ↓
React components
      ↓
 UI updates
```

This is Redux's **unidirectional data flow**.

---

# 6. Redux Store

The **store** contains the application's Redux state.

Conceptually:

```js
{
  users: [],
  products: [],
  cart: [],
  auth: {
    user: null
  }
}
```

In Redux Toolkit:

```js
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    // reducers go here
  },
});
```

The store becomes the central state container.

---

# 7. State

State is the actual data stored in Redux.

Example:

```js
{
  counter: {
    value: 10
  }
}
```

or:

```js
{
  products: {
    items: [],
    loading: false,
    error: null
  }
}
```

State should describe the **current condition of the application**.

---

# 8. Actions

An action describes **what happened**.

An action is an object with at least:

```js
{
  type: "counter/increment"
}
```

It can contain additional data:

```js
{
  type: "cart/addItem",
  payload: {
    id: 1,
    name: "Laptop"
  }
}
```

### Key teaching point

An action does not normally say:

> "Change state directly."

It says:

> "This event happened."

For example:

```text
USER_LOGGED_IN
PRODUCT_ADDED
ITEM_REMOVED
CART_CLEARED
```

---

# 9. Action Payload

The `payload` contains the data needed to process an action.

Example:

```js
dispatch({
  type: "cart/addItem",
  payload: product
});
```

Conceptually:

```text
action
├── type
│   └── "cart/addItem"
│
└── payload
    └── product
```

---

# 10. Reducers

A reducer determines how state changes in response to an action.

Conceptually:

```js
(previousState, action) => newState
```

Example:

```js
const counterReducer = (state, action) => {
  if (action.type === "increment") {
    return {
      ...state,
      value: state.value + 1
    };
  }

  return state;
};
```

The reducer:

* receives current state
* receives action
* calculates new state
* returns state

---

# 11. Important Redux Principle

Reducers should be **pure functions**.

A reducer should not:

```text
make API calls
generate random values
modify external variables
perform database operations
access localStorage directly
```

A reducer should essentially be:

```text
state + action
      ↓
new state
```

---

# 12. Dispatch

`dispatch()` sends an action to Redux.

Example:

```js
dispatch({
  type: "counter/increment"
});
```

The flow becomes:

```text
dispatch(action)
      ↓
Redux
      ↓
Reducer
      ↓
new state
```

With Redux Toolkit:

```js
dispatch(increment());
```

---

# 13. Selectors

A selector reads data from Redux state.

Example:

```js
const count = useSelector(
  state => state.counter.value
);
```

Think of:

```js
useSelector()
```

as:

> "Give me this piece of Redux state."

---

# 14. Redux and React

Redux itself does not require React.

React integration is provided by:

```text
react-redux
```

Install:

```bash
npm install @reduxjs/toolkit react-redux
```

Redux Toolkit is the modern recommended way to write Redux applications.

---

# 15. Provider

React needs access to the Redux store.

Wrap your application:

```jsx
import { Provider } from "react-redux";
import { store } from "./store";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

The `Provider` makes the Redux store available to React components.

Conceptually:

```text
Provider
   │
   └── Redux Store
         │
         ├── App
         ├── Navbar
         ├── Dashboard
         └── ProductList
```

Without `Provider`, components cannot use:

```js
useSelector()
useDispatch()
```

---

# 16. Redux Toolkit

Historically Redux required a lot of boilerplate.

Modern Redux uses **Redux Toolkit (RTK)**.

The major APIs students should know are:

```text
configureStore()
createSlice()
createAsyncThunk()
createSelector()
```

For Redux with Thunk, the most important are:

```text
configureStore()
createSlice()
createAsyncThunk()
```

---

# 17. Creating a Slice

Suppose we want a counter.

```js
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",

  initialState: {
    value: 0
  },

  reducers: {
    increment: (state) => {
      state.value += 1;
    },

    decrement: (state) => {
      state.value -= 1;
    },

    reset: (state) => {
      state.value = 0;
    }
  }
});

export const {
  increment,
  decrement,
  reset
} = counterSlice.actions;

export default counterSlice.reducer;
```

---

# 18. Why Can Redux Toolkit Mutate State?

Students will often ask:

> "Didn't you just say reducers must not mutate state?"

Correct.

Redux Toolkit uses **Immer** internally.

This:

```js
state.value += 1;
```

is translated internally into an immutable state update.

Conceptually:

```js
return {
  ...state,
  value: state.value + 1
};
```

So RTK gives us the convenient syntax while maintaining Redux's immutability guarantees.

---

# 19. Configure the Store

Create:

```text
src/
├── app/
│   └── store.js
└── features/
    └── counter/
        └── counterSlice.js
```

`store.js`:

```js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer
  }
});
```

The state now looks like:

```js
{
  counter: {
    value: 0
  }
}
```

---

# 20. Reading Redux State

In a React component:

```jsx
import { useSelector } from "react-redux";

const Counter = () => {
  const count = useSelector(
    state => state.counter.value
  );

  return <h1>{count}</h1>;
};
```

---

# 21. Dispatching Actions

```jsx
import { useDispatch } from "react-redux";
import {
  increment,
  decrement
} from "./counterSlice";

const Counter = () => {
  const dispatch = useDispatch();

  return (
    <>
      <button onClick={() => dispatch(increment())}>
        +
      </button>

      <button onClick={() => dispatch(decrement())}>
        -
      </button>
    </>
  );
};
```

---

# 22. Complete Synchronous Redux Flow

Teach students to trace this:

```text
Button clicked
     ↓
dispatch(increment())
     ↓
increment action
     ↓
counter reducer
     ↓
state.counter.value changes
     ↓
useSelector detects change
     ↓
Component re-renders
```

This is the foundation they need before introducing Thunk.

---

# 23. What Is Middleware?

Middleware sits between:

```text
dispatch()
```

and:

```text
reducer
```

Conceptually:

```text
dispatch(action)
      ↓
   Middleware
      ↓
    Reducer
      ↓
  New State
```

Middleware can:

* log actions
* handle asynchronous operations
* perform side effects
* modify/intercept actions
* integrate external systems

---

# 24. Why Do We Need Thunk?

Reducers should be pure.

Therefore this is not appropriate inside a reducer:

```js
const reducer = (state, action) => {
  fetch("/api/users");
};
```

API requests are asynchronous side effects.

We need a mechanism that can perform:

```text
API request
     ↓
wait
     ↓
response
     ↓
dispatch result
```

That's where **Thunk middleware** comes in.

---

# 25. What Is Redux Thunk?

Redux Thunk allows `dispatch()` to accept a **function**, rather than only an action object.

Normally:

```js
dispatch({
  type: "users/fetch"
});
```

Thunk allows:

```js
dispatch(async (dispatch) => {
  // asynchronous work
});
```

The function can:

```text
perform async work
      ↓
dispatch actions
      ↓
update Redux state
```

---

# 26. The Basic Thunk Pattern

Without `createAsyncThunk`, conceptually:

```js
const fetchUsers = () => async (dispatch) => {
  dispatch({ type: "users/loading" });

  try {
    const response = await fetch("/api/users");

    const users = await response.json();

    dispatch({
      type: "users/success",
      payload: users
    });
  } catch (error) {
    dispatch({
      type: "users/error",
      payload: error.message
    });
  }
};
```

Then:

```js
dispatch(fetchUsers());
```

---

# 27. Redux Toolkit Includes Thunk

This is important.

With:

```js
configureStore()
```

Redux Toolkit includes thunk middleware by default.

You normally **do not need to install `redux-thunk` separately**.

RTK's preferred API for asynchronous operations is:

```js
createAsyncThunk()
```

---

# 28. createAsyncThunk

Syntax:

```js
createAsyncThunk(
  "action/type",
  async () => {
    // async logic
  }
);
```

Example:

```js
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async () => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );

    return response.json();
  }
);
```

This automatically creates three lifecycle actions:

```text
pending
fulfilled
rejected
```

---

# 29. Async Thunk Lifecycle

This is one of the most important diagrams to teach.

```text
dispatch(fetchUsers())
          │
          ↓
       pending
          │
          ↓
     API request
       /     \
      /       \
 success      failure
    ↓            ↓
fulfilled      rejected
```

Redux Toolkit generates:

```js
fetchUsers.pending
fetchUsers.fulfilled
fetchUsers.rejected
```

---

# 30. Why Pending/Fulfilled/Rejected Matter

Your Redux state can represent:

```js
{
  users: [],
  loading: false,
  error: null
}
```

When request begins:

```js
{
  users: [],
  loading: true,
  error: null
}
```

When successful:

```js
{
  users: [...],
  loading: false,
  error: null
}
```

When failed:

```js
{
  users: [],
  loading: false,
  error: "Request failed"
}
```

This creates predictable asynchronous state management.

---

# 31. Complete Users Example

Create:

```text
src/
└── features/
    └── users/
        └── usersSlice.js
```

```js
import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async () => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    return response.json();
  }
);
```

---

# 32. Initial State

```js
const initialState = {
  users: [],
  loading: false,
  error: null
};
```

---

# 33. Handle the Async Lifecycle

```js
const usersSlice = createSlice({
  name: "users",

  initialState,

  reducers: {},

  extraReducers: (builder) => {

    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })

      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});
```

Export:

```js
export default usersSlice.reducer;
```

---

# 34. Why `extraReducers`?

`reducers` handles actions **created by the slice itself**.

Example:

```js
reducers: {
  clearUsers: ...
}
```

`extraReducers` handles actions created elsewhere.

`createAsyncThunk` generates its own actions:

```text
fetchUsers.pending
fetchUsers.fulfilled
fetchUsers.rejected
```

Therefore we handle them using:

```js
extraReducers
```

---

# 35. Add the Users Reducer to the Store

```js
import { configureStore } from "@reduxjs/toolkit";

import usersReducer from "../features/users/usersSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer
  }
});
```

Redux state becomes:

```js
{
  users: {
    users: [],
    loading: false,
    error: null
  }
}
```

---

# 36. Fetching Data from a Component

```jsx
import {
  useDispatch,
  useSelector
} from "react-redux";

import { fetchUsers } from "./usersSlice";

const Users = () => {
  const dispatch = useDispatch();

  const {
    users,
    loading,
    error
  } = useSelector(state => state.users);

  return (
    <div>
      <button onClick={() => dispatch(fetchUsers())}>
        Load Users
      </button>

      {loading && <p>Loading...</p>}

      {error && <p>{error}</p>}

      {users.map(user => (
        <p key={user.id}>
          {user.name}
        </p>
      ))}
    </div>
  );
};
```

---

# 37. Automatic API Flow

When the user clicks:

```jsx
dispatch(fetchUsers())
```

Redux Toolkit does:

```text
dispatch(fetchUsers())
       │
       ↓
pending
       │
       ↓
loading = true
       │
       ↓
HTTP request
       │
       ↓
response
       │
       ↓
fulfilled
       │
       ↓
users = response.data
loading = false
       │
       ↓
React re-renders
```

If the API fails:

```text
HTTP request
     ↓
Error
     ↓
rejected
     ↓
error = message
loading = false
     ↓
React displays error
```

---

# 38. Axios + Redux Thunk

Since many React projects use Axios, demonstrate it as well.

```js
import axios from "axios";
import {
  createAsyncThunk
} from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",

  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );

      return response.data;

    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
        "Failed to fetch users"
      );
    }
  }
);
```

Then:

```js
.addCase(fetchUsers.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
});
```

This is preferable when you want a controlled error payload.

---

# 39. `thunkAPI`

`createAsyncThunk` provides useful information through:

```js
thunkAPI
```

Important properties include:

```text
thunkAPI.dispatch
thunkAPI.getState
thunkAPI.rejectWithValue
thunkAPI.signal
```

### `dispatch`

Allows the thunk to dispatch another action:

```js
thunkAPI.dispatch(...)
```

### `getState`

Allows access to Redux state:

```js
const state = thunkAPI.getState();
```

### `rejectWithValue`

Allows you to return a custom error payload:

```js
return thunkAPI.rejectWithValue(
  "Invalid credentials"
);
```

---

# 40. Passing Parameters to a Thunk

Suppose you want to fetch weather by city.

```js
export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",

  async (city) => {
    const response = await axios.get(
      `/api/weather?city=${city}`
    );

    return response.data;
  }
);
```

Dispatch:

```js
dispatch(fetchWeather("Nairobi"));
```

The argument:

```text
"Nairobi"
```

becomes the first argument of the thunk:

```js
async (city) => {}
```

---

# 41. A Real Weather Redux Example

This fits particularly well with the weather application you've been building.

### State

```js
const initialState = {
  data: null,
  loading: false,
  error: null
};
```

### Thunk

```js
export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",

  async (city, thunkAPI) => {
    try {
      const API_KEY = import.meta.env.VITE_API_KEY;

      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );

      return response.data;

    } catch (error) {
      return thunkAPI.rejectWithValue(
        "City not found"
      );
    }
  }
);
```

### Reducer

```js
extraReducers: (builder) => {

  builder.addCase(
    fetchWeather.pending,
    (state) => {
      state.loading = true;
      state.error = null;
    }
  );

  builder.addCase(
    fetchWeather.fulfilled,
    (state, action) => {
      state.loading = false;
      state.data = action.payload;
    }
  );

  builder.addCase(
    fetchWeather.rejected,
    (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  );
}
```

---

# 42. Component Becomes Much Simpler

Instead of:

```jsx
const [weather, setWeather] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
```

the component gets:

```js
const {
  data,
  loading,
  error
} = useSelector(
  state => state.weather
);
```

And:

```js
const dispatch = useDispatch();
```

Search:

```js
dispatch(fetchWeather(city));
```

The component focuses primarily on **presentation and user interaction**.

---

# 43. Why This Architecture Is Useful

Without Redux:

```text
Component
   │
   ├── API request
   ├── loading state
   ├── error state
   ├── response state
   └── UI
```

With Redux:

```text
Component
   │
   └── dispatch(fetchWeather())
                │
                ↓
          Redux Thunk
                │
                ↓
             API
                │
                ↓
             Redux
                │
                ↓
             State
                │
                ↓
           Component
```

This separates:

```text
UI
```

from:

```text
state management
```

and:

```text
server interaction
```

---

# 44. Redux vs Context API

Students frequently ask:

> "Why not just use Context?"

Context is useful for relatively simple global values:

```text
Theme
Authentication
Language
```

Redux becomes attractive when state involves:

```text
many components
many state transitions
complex update logic
async operations
debugging requirements
large application state
```

Context:

```text
Provider
  ↓
Consumers
```

Redux:

```text
Components
   ↓
Actions
   ↓
Middleware
   ↓
Reducers
   ↓
Store
   ↓
Selectors
   ↓
Components
```

---

# 45. Redux vs useState

| Feature                   | useState                | Redux                |
| ------------------------- | ----------------------- | -------------------- |
| Local state               | Excellent               | Overkill             |
| Global state              | Limited                 | Excellent            |
| Simple UI state           | Excellent               | Overkill             |
| Complex state transitions | Can become difficult    | Excellent            |
| Async workflows           | Manual                  | Excellent with Thunk |
| Debugging                 | Basic                   | Redux DevTools       |
| Multiple components       | Prop drilling may occur | Centralized          |
| Boilerplate               | Very low                | Higher               |

---

# 46. Common Mistakes

### Mistake 1 — Putting everything into Redux

Don't do:

```js
redux.form.inputValue
redux.modal.isOpen
redux.button.hovered
```

unless there is a genuine reason for global state.

---

### Mistake 2 — API calls inside reducers

Bad:

```js
reducers: {
  fetchUsers: async (state) => {
    const response = await fetch(...);
  }
}
```

Reducers should remain synchronous/pure.

Use:

```js
createAsyncThunk()
```

---

### Mistake 3 — Forgetting `<Provider>`

If students see:

```text
could not find react-redux context value
```

check:

```jsx
<Provider store={store}>
  <App />
</Provider>
```

---

### Mistake 4 — Incorrect selector

If the store contains:

```js
reducer: {
  users: usersReducer
}
```

the selector is:

```js
state.users
```

not:

```js
state.user
```

---

### Mistake 5 — Forgetting `extraReducers`

Creating:

```js
createAsyncThunk(...)
```

doesn't automatically put the result into your state.

You still need:

```js
extraReducers
```

to respond to:

```text
pending
fulfilled
rejected
```

---

# 47. Recommended Folder Structure

For a larger React application:

```text
src/
│
├── app/
│   ├── store.js
│   └── hooks.js
│
├── features/
│   │
│   ├── auth/
│   │   ├── authSlice.js
│   │   └── authService.js
│   │
│   ├── users/
│   │   ├── usersSlice.js
│   │   └── usersService.js
│   │
│   ├── products/
│   │   ├── productsSlice.js
│   │   └── productsService.js
│   │
│   └── cart/
│       └── cartSlice.js
│
├── components/
│
├── pages/
│
└── main.jsx
```

This is **feature-based organization**.

It scales better than putting all Redux files into one enormous folder.

---

# 48. Redux DevTools

Redux Toolkit works well with Redux DevTools.

It allows developers to inspect:

```text
Actions
State
Action payloads
State changes
```

You can demonstrate:

```text
fetchUsers/pending
fetchUsers/fulfilled
cart/addItem
cart/removeItem
```

Students can see exactly how state changes.

This is one of Redux's biggest educational advantages.

---

# 49. A Useful Mental Model

Teach students this analogy:

### Store = Database

The Redux store contains application state.

### Action = Event

Something happened:

```text
USER_LOGGED_IN
PRODUCT_ADDED
```

### Reducer = State transition function

Determines:

> Given the current state and event, what should the new state be?

### Dispatch = Messenger

Sends the event into Redux.

### Selector = Query

Retrieves information from the store.

### Thunk = Coordinator

Handles asynchronous workflows and side effects.

This mental model makes Redux much easier to understand.

---

# 50. The Complete Redux + Thunk Architecture

End the lesson with this:

```text
                       React UI
                          │
                 ┌────────┴────────┐
                 │                 │
             useSelector       useDispatch
                 │                 │
                 ↓                 ↓
              Redux Store ←──── Actions
                 │                 │
                 │             Thunk
                 │                 │
                 │                 ↓
                 │             API call
                 │                 │
                 │                 ↓
                 │              Server
                 │                 │
                 │                 ↓
                 │          API response
                 │                 │
                 │                 ↓
                 │        fulfilled/rejected
                 │                 │
                 ↓                 ↓
              Reducer ←───────────┘
                 │
                 ↓
             New State
                 │
                 ↓
             React UI
```

The central principle is:

> **React dispatches events. Thunks handle asynchronous work. Reducers update state. Selectors read state. React renders the result.**

---

# 51. Suggested Teaching Sequence

For a practical class, I would teach this in **four sessions**.

### Session 1 — Redux Fundamentals

Cover:

```text
Why state management?
Local vs global state
Redux architecture
Store
State
Actions
Reducers
Dispatch
Selectors
Provider
```

Build:

**Counter application**

---

### Session 2 — Redux Toolkit

Cover:

```text
configureStore
createSlice
Immer
useSelector
useDispatch
Feature-based architecture
Redux DevTools
```

Build:

**Shopping cart**

Features:

```text
Add product
Remove product
Increase quantity
Decrease quantity
Clear cart
Calculate total
```

---

### Session 3 — Redux Thunk

Cover:

```text
Middleware
Why asynchronous state is different
Thunk
createAsyncThunk
pending
fulfilled
rejected
loading
error
```

Build:

**Users API application**

---

### Session 4 — Real Application

Combine everything:

```text
Authentication
Products
API
Loading
Error handling
Search
Filtering
Pagination
CRUD
```

A good capstone would be your **weather application**:

```text
React
   +
Redux Toolkit
   +
createAsyncThunk
   +
OpenWeather API
   +
Firebase
```

Architecture:

```text
Weather Component
       │
       ↓
dispatch(fetchWeather(city))
       │
       ↓
weatherThunk
       │
       ├────────────→ OpenWeather API
       │                    │
       │                    ↓
       │              Weather response
       │
       └────────────→ Firestore search_logs
                            │
                            ↓
                       Redux state
                            │
                            ↓
                     Weather Component
```

That gives learners a realistic reason to use Redux rather than learning Redux as an isolated counter exercise.
