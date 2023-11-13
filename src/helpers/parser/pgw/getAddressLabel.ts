import type {TGetAddressLabel,IGetAddressLabelsLabelInfosBody,IGetAddressLabelsNotesBody, IGetAddressLabelsLabelsBody} from '../../../helpers/parser/pgw/types/getAddressLabel.type'
import { parserMapping } from '../../../helpers/parser/parser'
import { IPostTransactionSimulationAssetChangeParsed } from './types/postTransactionSimulation.type'
//this import will remove
//import { getAddressLabel } from '../../../controllers/chainsafer'
// TODO
let addressLabel 
const getAddressLabel: TGetAddressLabel = (responseBody) => {
    addressLabel=parserMapping<string>(responseBody, 'address', '')
    return addressLabel
}

export default getAddressLabel