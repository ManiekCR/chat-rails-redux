export const FETCH_MESSAGES = 'FETCH_MESSAGES';
export const MESSAGE_POSTED = 'MESSAGE_POSTED';
export const CHANNEL_SELECTED = 'CHANNEL_SELECTED';

export function fetchMessages(channel) {
  const url = `/api/v1/channels/${channel}/messages`;
  const promise = fetch(url, { credentials: "same-origin" })
    .then(r => r.json());
  return {
    type: FETCH_MESSAGES,
    payload: promise // Will be resolved by redux-promise
  };
}

export function createMessage(channel, content) {
  const csrfToken = document.querySelector('meta[name="csrf-token"]').attributes.content.value;
  const url = `/api/v1/channels/${channel}/messages`;
  const body = { content }; // ES6 destructuring
  const promise = fetch(url, {
    credentials: 'same-origin',
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken
    },
    body: JSON.stringify(body)
  }).then(r => r.json());

  return {
    type: MESSAGE_POSTED,
    payload: promise // Will be resolved by redux-promise
  };
}

export function selectChannel() {
  return {
    type: CHANNEL_SELECTED
  };
}