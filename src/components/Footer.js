import React from 'react'

import { Container } from 'decentraland-ui'

class Footer extends React.Component {

    render = () => {
        return (
            <Container className="dcl footer">
                <div className="main-footer">
                    <div className="links">
                        <a href="https://zeppelin.solutions/">Home</a>
                        <a href="https://zeppelin.solutions/about/">About</a>
                    </div>
                </div>
                <div className="secondary-footer">
                    <div className="social-links">
                        <a href="https://github.com/ZeppelinSolutions/">
                            <i className="social-icon github"/>
                        </a>
                        <a href="https://github.com/ZeppelinSolutions/">
                            <i className="social-icon twitter"/>
                        </a>
                    </div>
                    <div className="copyright">© 2019 Zeppelin</div>
                </div>
            </Container>
        )
    }
}

export default Footer
