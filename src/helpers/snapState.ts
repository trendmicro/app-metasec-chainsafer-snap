import { TGetSnapState, TSnapState } from './types/snapState.type'
import Logger from '../controllers/logger'
const logger = new Logger('[helpers.snapState]')

export const getSnapState: TGetSnapState = async () => {
    const state = await snap.request({
        method: 'snap_manageState',
        params: {
            operation: 'get',
        },
    })
    logger.log('get state:', state)
    return state
}

export const setSnapState = async (newState: TSnapState) => {
    logger.log('set state:', newState)
    return snap.request({
        method: 'snap_manageState',
        params: {
            operation: 'update',
            newState: newState,
        },
    })
}

export const clearSnapState = async () => {
    logger.log('clearSnapState:')
    return snap.request({
        method: 'snap_manageState',
        params: { operation: 'clear' },
    })
}
