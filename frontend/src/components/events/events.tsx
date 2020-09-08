import React, { FunctionComponent, useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isEqual, isEmpty } from 'lodash-es';
import { triggerTransition } from '@uirouter/redux/lib/core/actions';

import { iRootState, Dispatch } from 'resources/store/store';
import { classNames } from 'common/helpers';
import Toggle from 'components/toggle';
import { Alarm } from 'resources/store/models/alarms';

import styles from './style.scss';

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;
type EventsProps = connectedProps;

const checkedBasedOnAllAlarms = (alarms: Alarm[]) => alarms.some((alarm) => alarm.resolved === false);

const Events: FunctionComponent<EventsProps> = ({ triggerTransitionComms, chat, alarms, resolveAlarms }) => {
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
        <div className={classNames('nes-container', 'is-dark', 'with-title', styles.events_container)}>
            <h3 className="title">Events</h3>
            <div className={styles.events}>
                {areNewMessages && (
                    <button
                        type="button"
                        onClick={clickHandler}
                        className={classNames('nes-btn', 'is-warning', 'nes-pointer')}
                    >
                        Incoming message
                    </button>
                )}
                {!isEmpty(alarms) && (
                    <>
                        <span>Resolve alarms:</span>
                        <Toggle
                            checked={checkedBasedOnAllAlarms(alarms)}
                            onClick={() => resolveAlarms()}
                            className={styles.alarms}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

const mapState = (state: iRootState) => ({
    chat: state.chat.chat,
    alarms: state.alarms,
});

const mapDispatch = (dispatch: Dispatch) => {
    const triggerTransitionAction = bindActionCreators(triggerTransition, dispatch);
    return {
        triggerTransitionComms: () => {
            return triggerTransitionAction('comms', {});
        },
        resolveAlarms: () => {
            return dispatch.alarms.resolveAlarms();
        },
    };
};

export default connect(mapState, mapDispatch)(Events);
