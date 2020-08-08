import React, { FunctionComponent, useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isEqual } from 'lodash-es';
import { triggerTransition } from '@uirouter/redux/lib/core/actions';

import { iRootState, Dispatch } from 'resources/store/store';
import { classNames } from 'common/helpers';
import Toggle from 'components/toggle';

import styles from './style.scss';

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;
type EventsProps = connectedProps;

const Events: FunctionComponent<EventsProps> = ({ triggerTransitionComms, chat }) => {
    const [messages, setMessages] = useState(chat);
    const [areNewMessages, setAreNewMessages] = useState(false);

    useEffect(() => {
        if (!isEqual(messages, chat)) {
            setMessages(chat);
            setAreNewMessages(true);
        }
    }, [chat]);

    const clickHandler = () => {
        triggerTransitionComms();
        setAreNewMessages(false);
    };

    return (
        <div className={classNames('nes-container', 'is-dark', 'with-title', styles.alarms_container)}>
            <h3 className="title">Alarms</h3>
            <div className={styles.alarms}>
                {/* <button type="button" className={classNames('nes-btn', 'is-success', 'nes-pointer')}>
                    Success
                </button> */}
                {areNewMessages && (
                    <button
                        type="button"
                        onClick={clickHandler}
                        className={classNames('nes-btn', 'is-warning', 'nes-pointer')}
                    >
                        Incoming message
                    </button>
                )}
                <Toggle />
                {/*  <button type="button" className={classNames('nes-btn', 'is-error', 'nes-pointer')}>
                    Error
                </button> */}
            </div>
        </div>
    );
};

const mapState = (state: iRootState) => ({
    chat: state.chat.chat,
});

const mapDispatch = (dispatch: Dispatch) => {
    const triggerTransitionAction = bindActionCreators(triggerTransition, dispatch);
    return {
        triggerTransitionComms: () => {
            return triggerTransitionAction('comms', {});
        },
    };
};

export default connect(mapState, mapDispatch)(Events);
