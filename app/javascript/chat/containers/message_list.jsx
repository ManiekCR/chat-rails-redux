import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import consumer from "../../channels/consumer";

import { fetchMessages, appendMessage } from '../actions';
import Message from '../components/message';
import MessageForm from '../containers/message_form';

class MessageList extends Component {
  componentWillMount() {
    this.fetchMessages();
  }

  componentDidMount() { // For the first channel
    this.initChatroomCable(this.props);
  }

  componentWillReceiveProps(nextProps) { // For after switching channels
    if (this.props.selectedChannel != nextProps.selectedChannel) {
      this.initChatroomCable(nextProps);
    }
  }

  componentWillUnmount() {
    clearInterval(this.refresher);
  }

  componentDidUpdate() {
    this.list.scrollTop = this.list.scrollHeight;
  }

  fetchMessages = () => {
    this.props.fetchMessages(this.props.selectedChannel);
  }

  initChatroomCable = (props) => {
    consumer.subscriptions.create(
      { channel: "ChannelsChannel", name: props.selectedChannel },
      {
      received(message) {
        if (message.channel === props.selectedChannel) {
          props.appendMessage(message);
        }
       },
    });
  }

  render () {
    return (
      <div className="channel-container col-12 col-sm-8 col-md-8 pt-4">
        <div className="channel-title pb-4">
          <span>Channel #{this.props.selectedChannel}</span>
        </div>
        <div className="channel-content" ref={(list) => { this.list = list; }}>
          {
            this.props.messages.map((message) => {
              return <Message key={message.id} {...message} />;
            })
          }
        </div>
        <MessageForm selectedChannel={this.props.selectedChannel} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    messages: state.messages,
    channels: state.channels
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchMessages, appendMessage }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
