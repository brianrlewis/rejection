import { withProps } from '../util/helpers';
import { Statuses } from '../../config/config';
import SelectField from './select-field-component';

export default withProps({
    options: Object.values(Statuses)
})(SelectField);