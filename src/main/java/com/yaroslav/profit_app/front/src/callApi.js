const callApi = (...args) =>
  fetch(...args)
    .then(r => {
      if (r.ok) {
        return r.json()
      }

      const e = new Error(r.statusText)
      e.response = r

      return Promise.reject(e)
    })
    .catch(e => { console.error('API error:', e) })

export default callApi
