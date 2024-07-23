import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type StateMenuType = {
  currentIdx: number
  currentMenu: string
}

const initialState: StateMenuType = {
  currentIdx: 0,
  currentMenu: null,
}

const stateMenuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setStateMenu: (state, action: PayloadAction<StateMenuType>) => {
      const { currentIdx, currentMenu } = action.payload
      state.currentIdx = currentIdx
      state.currentMenu = currentMenu
    },
  },
})

export const { setStateMenu } = stateMenuSlice.actions

export const getMenuSlice = (state: { stateMenu: StateMenuType }) =>
  state.stateMenu

export default stateMenuSlice.reducer
