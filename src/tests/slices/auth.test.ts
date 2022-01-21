import configureStore, { MockStore } from "redux-mock-store";
import { authSlice, login, logout, updateUser } from "../../slices/auth.slice";
import { AuthState } from "../../store/auth.i";

const initialState: AuthState = {
  email: null,
  followers: [],
  following: [],
  name: null,
  uid: null,
};

const mockStore = configureStore();

const bill = {
  uid: "123",
  name: "Bill",
  email: "bill@test.com",
};

const tim = {
  name: "Tim",
  uid: "321",
  email: "tim@test.com",
};

describe("auth.slice", () => {
  let store: MockStore;
  beforeEach(() => {
    store = mockStore(initialState);
  });
  describe("auth.actions", () => {
    describe("auth/login", () => {
      it("should generate login action object", () => {
        const action = login(bill);
        expect(action).toEqual({
          type: "auth/login",
          payload: bill,
        });
        const action2 = login(tim);
        expect(action2).toEqual({
          type: "auth/login",
          payload: tim,
        });
      });
      it("should dispatch login action in store", () => {
        store.dispatch(login(tim));
        const actions = store.getActions();
        expect(actions).toEqual([
          {
            type: "auth/login",
            payload: tim,
          },
        ]);
      });
    });
    describe("auth/logout", () => {
      it("should generate logout action object", () => {
        const action = logout();
        expect(action).toEqual({
          type: "auth/logout",
        });
      });
      it("should dispatch logout in store", () => {
        store.dispatch(logout());
        const actions = store.getActions();
        expect(actions).toEqual([
          {
            type: "auth/logout",
          },
        ]);
      });
    });
    describe("auth/updateUser", () => {
      it("should generate updateUser action object", () => {
        const action = updateUser(tim);
        expect(action).toEqual({
          type: "auth/updateUser",
          payload: tim,
        });

        const action2 = updateUser(bill);
        expect(action2).toEqual({
          type: "auth/updateUser",
          payload: bill,
        });
      });
      it("should dispatch updateUser action in store", () => {
        store.dispatch(updateUser({ followers: ["123"] }));
        const actions = store.getActions();
        expect(actions).toEqual([
          {
            type: "auth/updateUser",
            payload: {
              followers: ["123"],
            },
          },
        ]);
      });
    });
  });
  describe("auth.reducers", () => {
    describe("auth/login", () => {
      it("should set user credentials in store for login", () => {
        const action = {
          type: "auth/login",
          payload: {
            uid: "abc123",
          },
        };
        const state = authSlice.reducer(initialState, action);
        expect(state.uid).toEqual(action.payload.uid);
      });
    });
    describe("auth/logout", () => {
      it("should clear auth state to initialState for logout", () => {
        const action = {
          type: "auth/logout",
        };
        const state = authSlice.reducer(
          {
            name: "Bill",
            email: "test@test.com",
            followers: ["1", "2", "3"],
            following: ["1"],
            uid: "123",
          },
          action,
        );
        expect(state).toEqual(initialState);
      });
    });
    describe("auth/updateUser", () => {
      it("should update user in store for updateUser", () => {
        const action = {
          type: "auth/updateUser",
          payload: tim,
        };
        const state = authSlice.reducer(
          {
            ...bill,
            followers: [],
            following: [],
          },
          action,
        );
        expect(state).toEqual({
          ...tim,
          followers: [],
          following: [],
        });
      });
    });
  });
});
