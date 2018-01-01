import { compose, withState, withHandlers } from 'recompose';
import { withCurrentUser } from 'meteor/nova:core';

export default compose(
    withState('isOpen', 'setIsOpen', false),
    withHandlers({
        toggle: props => () => {
            props.setIsOpen(!props.isOpen);
        },
        open: props => () => {
            props.setIsOpen(true);
        },
        close: props => () => {
            props.setIsOpen(false);
        }
    }),
    withCurrentUser
);