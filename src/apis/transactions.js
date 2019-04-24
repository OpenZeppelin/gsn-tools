import immutable from 'immutable'

const location = 'api.etherscan.io'
const apiKey = 'Y35EQ8MWSNY547KX9EAUGUBPA4SXK8C7CN'
const module = 'account'
const action = 'txlist'

const settings = {
    method: 'GET',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
}

const getTransactions = async (address) => {
    return await fetch(`http://${location}/api?module=${module}&action=${action}&address=${address}&apikey=${apiKey}`, settings)
        .then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                return immutable.List()
            }
        })
        .then((json) => {
            if (json.message === 'NOTOK') {
                return immutable.List()
            } else {
                return immutable.fromJS(json.result)
            }
        })
        .catch(() => {
            return immutable.List()
        })
}

export {
    getTransactions,
}
