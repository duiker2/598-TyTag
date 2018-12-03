import React, { Component } from 'react'
import { Segment, Grid, Divider, Label, Card, Item, Button, Image, Checkbox } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import styles from './Title.scss'
import postData from '../../../../../data/input.json';
import Api from '../../Api.js';
const api = new Api();


class Title extends Component {

    constructor() {
        super()
        this.state = {
            share_enabled: new Array(25).fill(true)
        }
    }

    componentDidMount() {
        api.title()
    }

    handleShare(e, data, index) {
        api.share({'id': index})
        let i = parseInt(index)
        let a = this.state.share_enabled.slice();
        a[i-1] = false
        this.setState({ share_enabled: a})
    }

    render() {
        var data;
        // const loadData = () => JSON.parse(JSON.stringify(jsonData)); //uncomment to get a non-cached one
        let items = [];
        for(var i = 1; i < 26; i++)
        {
            let index = i.toString();
            items.push(
                <Grid celled>
                    <Grid.Row>
                        <Grid.Column width={3}>
                            <Checkbox label='Share' disabled={!this.state.share_enabled[i-1]} onClick={(e,data) => this.handleShare(e, data, index)}/>
                                <Label className='upvotes'> {postData[index]["upvotes"]} &#11014;</Label>
                        </Grid.Column>
                        <Grid.Column width={13}>
                            <a href={postData[index]["url"]} target="_blank" onClick={() => api.link({'id': index})}>
                                <Card.Description>
                                    <Label.Group>
                                        {postData[index]["title"]}
                                    </Label.Group>
                                </Card.Description>
                            </a>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            )
        }

        return (
            <div className="Title">
                <div className="container">
                    <h1> r/News </h1>
                    <Card.Group itemsPerRow={1}>{items}</Card.Group>
                </div>
            </div>
        )
    }
}

export default Title
