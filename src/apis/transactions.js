import immutable from 'immutable'

const location = 'api.etherscan.io'
const apiKey = 'Y35EQ8MWSNY547KX9EAUGUBPA4SXK8C7CN'
const address = '0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a'
const module = 'account'
const action = 'txlist'

const settings = {
    method: 'GET',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
}

const getTransactions = async () => {
    return await fetch(`http://${location}/api?module=${module}&action=${action}&address=${address}&apikey=${apiKey}`, settings)
        .then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error('Transactions not found')
            }
        })
        .then((json) => {
            if (json.message === 'NOTOK') {
                throw new Error('Transactions not found')
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
