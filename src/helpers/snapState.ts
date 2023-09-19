import { TGetSnapState, TSnapState } from './types/snapState.type'
import Logger from '../controllers/logger'
const looger = new Logger('[helpers.snapState]')

export const getSnapState: TGetSnapState = async () => {
    const state = await snap.request({
        method: 'snap_manageState',
        params: {
            operation: 'get',
        },
    })
    looger.log('get state:', state)
    return state
}

export const setSnapState = async (newState: TSnapState) => {
    looger.log('set state:', newState)
    return snap.request({
        method: 'snap_manageState',
        params: {
            operation: 'update',
            newState: newState,
        },
    })
}

export const clearSnapState = async () => {
    looger.log('clearSnapState:')
    return snap.request({
        method: 'snap_manageState',
        params: { operation: 'clear' },
    })
}
