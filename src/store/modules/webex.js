const actions = {
  async inviteToSupportRoom ({getters, dispatch}, {email, showNotification = true}) {
    // metadata
    const group = 'webex'
    const type = 'invite'
    const action = 'Add user to the WFO Demo Support Webex Teams room'
    // set working state on
    dispatch('setWorking', {group, type, value: true})
    console.log('starting', action, 'using email', email, '...')
    // REST API endpoint URL
    try {
      // go REST
      const response = await fetch(getters.endpoints.webex, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + getters.jwt
        },
        body: JSON.stringify({
          personEmail: email
        })
      })
      // REST ok?
      if (response.ok) {
        console.log('successfully added user to Webex support room.')
        // show success message to user
        if (showNotification) {
          dispatch('successNotification', 'Successfully added you to the Webex Teams support room.')
        }
      } else if (response.status === 401) {
        // JWT expired
        console.log('JWT expired. logging out user locally.')
        dispatch('unsetJwt')
      } else if (response.status === 409) {
        // already in the room
        if (showNotification) {
          dispatch('successNotification', 'You are already in Webex Teams support room.')
        }
      } else {
        // not a 401 error
        console.log('Failed to add user to Webex Teams support room:', `${response.status} ${response.statusText} - ${text}`)
        const text = await response.text()
        dispatch('errorNotification', {
          title: 'Failed to add you to the Webex Teams support room',
          message: `${response.status} ${response.statusText} - ${text}`
        })
      }
    } catch (e) {
      console.log('Failed to add user to Webex Teams support room:', e)
      // show a Toast notification on error
      dispatch('errorNotification', {
        title: 'Failed to add you to the Webex Teams support room',
        message: e.message
      })
    } finally {
      // set working state off
      dispatch('setWorking', {group, type, value: false})
    }
  }
}

export default {
  actions
}
