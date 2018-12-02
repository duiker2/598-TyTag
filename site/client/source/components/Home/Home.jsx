import React, { Component } from 'react'
import { Button, Divider, Grid, Header, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import styles from './Home.scss'

class Home extends Component {

    render() {
        return(
            <div className='Home'>
                <Segment>
                    <Grid columns={2} stackable textAlign='center'>
                        <Divider vertical>Or</Divider>

                        <Grid.Row verticalAlign='middle'>
                            <Grid.Column>
                                <Header size='medium'>Participate Type 1</Header>
                                <Link to="/tag">
                                    <Button content='Click Here'/>
                                </Link>
                            </Grid.Column>

                            <Grid.Column>
                                <Link to="/title">
                                    <Header size='medium'>Participate Type 2</Header>
                                    <Button content='Click Here'/>
                                </Link>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </div>
        )
    }
}

export default Home
