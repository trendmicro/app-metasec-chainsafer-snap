import type {TGetAddressLabel,IGetAddressLabelsLabelInfosBody,IGetAddressLabelsNotesBody, IGetAddressLabelsLabelsBody, IGetAddressLabelsLabelsResponseParsed} from '../../../helpers/parser/pgw/types/getAddressLabel.type'
import { parserMapping } from '../../../helpers/parser/parser'
import { IPostTransactionSimulationAssetChangeParsed } from './types/postTransactionSimulation.type'
//this import will remove
import { getAddressLabel } from '../../../controllers/chainsafer'
// TODO
//const getAddressLabel: TGetAddressLabel = (responseBody) => {}

export default getAddressLabel