// const baseUrl = '/api/api/'
const baseUrl = window.location.protocol + '//' + window.api + '/api/'
import axios from 'axios'
export function http(url, val) {
  const params = {
    method: 'post',
    timeout: 15000,
    headers: {
      "Content-Type": "application/json"
    },
    data: JSON.stringify(val),
  }

  url = getRestFulUrl(url, val)
  if (window.METHOD) return post(url, params)
  return get(url)
}

function get(url, index = 0) {
  let domain = window.api[index]
  let baseUrl = window.location.protocol + '//' + domain + '/api/'
  console.log('ttt url >', url)
  return axios.get(`${baseUrl}${url}`)
    .then(res => {
      return res.data
    }).catch(error => {
      // eslint-disable-next-line no-undef
      if (index == window.api.length - 1) return Promise.reject(error)
      return get(url, index + 1)
    })
}

function post(url, params) {
  return axios(`${baseUrl}${url}`, params)
    .then(res => {
      return res.data
    })
    // eslint-disable-next-line no-undef
    .catch(error => { return Promise.reject(error) })
}

function getRestFulUrl(url, val) {
  if (window.METHOD) return url
  switch (url) {
    case 'CurrentInfo':
      url = `${url}/${val.lotteryId}`
      break;
    case 'IssueOpenInfo':
      url = `${url}/${val.lotteryId}/${val.issue}`
      break;
    case 'HistoryOpenInfo':
      url = `${url}/${val.lotteryId}/${val.issueNum}`
      break;
    case 'VideoPlayback':
      url = `${url}/${val.lotteryId}/${val.whichDay}`
      break;
    case 'GetNotice':
      url = `${url}/${val.id}`
      break;
    default:
      break;
  }
  return url
}