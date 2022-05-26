import { createSlice } from "@reduxjs/toolkit";


const notificationSlice = createSlice({
    name: "notification", 
    initialState: {
        error: null,
        notices: [],
    } as any,
    reducers: {
        apiError(state, action) {
            state.error = action.payload.error;
        },
        noticeStateSet(state,action) {
            console.log('noticeStateSet______noticeStateSet_11__');
            console.log(action.payload);
            
            state.notices = action.payload;
        },
        noticeStateAdd(state,action) {
            state.notices.push(action.payload.notice);
        },
        noticeStateRemove(state,action) {
            state.notices.filter((n: any) => n._id !== action.payload.noticeId)
        }
    }
});

export const notificationActions = notificationSlice.actions;

export default notificationSlice;