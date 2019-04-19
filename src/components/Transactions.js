import React from 'react'

import { Page } from 'decentraland-ui'
import Polls from "./Polls";

class Transactions extends React.Component {

    render = () => {
        return (
            <Page>
              <Polls />
            </Page>
        )
    }
}

export default Transactions
