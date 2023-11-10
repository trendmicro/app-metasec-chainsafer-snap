import { panel, heading, divider,  text } from '@metamask/snaps-ui'
import { headingText, serviceError, transactionMethodIs } from '../../constants/content'
import { IResponseError } from '../../controllers/types/http.type'
import { IPostTransactionSimulationResponseParsed } from '../parser/pgw/types/postTransactionSimulation.type'

export function convertToTransactionMethodPanel(result: IPostTransactionSimulationResponseParsed,error: IResponseError){
    if (error) {
        return panel([
            heading(headingText.transactionMethod),
            divider(),
            text(serviceError.simulationError),
            text(`${JSON.stringify(error)}`),
        ])
    }
    if (result == null) {
        return panel([])
    }

    return panel([text(transactionMethodIs(result.txnMethodName))])
}