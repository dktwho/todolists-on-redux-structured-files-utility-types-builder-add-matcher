import {authSlice, authThunks } from "../authSlice";


describe('authReducer', () => {
    test('should handle login.fulfilled', () => {
        const initialState = {isLoggedIn: false};
        const action = {type: authThunks.login.fulfilled.type, payload: {isLoggedIn: true}};

        const nextState = authSlice(initialState, action);

        expect(nextState.isLoggedIn).toBe(true);
    });

    test('should handle logout.fulfilled', () => {
        const initialState = {isLoggedIn: true};
        const action = {type: authThunks.logout.fulfilled.type, payload: {isLoggedIn: false}};

        const nextState = authSlice(initialState, action);

        expect(nextState.isLoggedIn).toBe(false);
    });

    test('should handle initializeApp.fulfilled', () => {
        const initialState = {isLoggedIn: false};
        const action = {type: authThunks.initializeApp.fulfilled.type, payload: {isLoggedIn: true}};

        const nextState = authSlice(initialState, action);

        expect(nextState.isLoggedIn).toBe(true);
    });
});