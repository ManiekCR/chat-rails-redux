import React from 'react';
import ChannelList from '../containers/channel_list';
import MessageList from '../containers/message_list';

const App = (props) => {
  return (
    <div className="container-fluid">
      <div className="messaging-wrapper row">
        <div className="logo-container col-12 col-sm-1 pt-4">
          <img className="messaging-logo" src="https://www.flaticon.com/svg/static/icons/svg/1005/1005513.svg" alt="logo" />
        </div>
        <ChannelList selectedChannel={props.match.params.channel} />
        <MessageList selectedChannel={props.match.params.channel} />
      </div>
    </div>

  );
};

export default App;
