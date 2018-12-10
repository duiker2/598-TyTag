import React, { Component } from 'react'
import { Segment, Grid, Divider, Label, Card, Item, Button, Image, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import styles from './Title.scss'
import postData from '../../../../../data/input.json';
import Api from '../../Api.js';
const api = new Api();


class Title extends Component {

    constructor() {
        super()
        this.state = {
            share_enabled: new Array(25).fill(true),
            upvote_inverted: new Array(25).fill(true),
            downvote_inverted: new Array(25).fill(true)
        }
    }

    componentDidMount() {
        api.title()
    }

    handleShare(e, data, index) {
        api.share({'id': index}, {'selection' : data['value']})
    }

    handleUpvote(index) {
        api.upvote({'id': index})
        let i = parseInt(index)
        let a = this.state.downvote_inverted.slice();
        a[i-1] = true
        this.setState({ downvote_inverted: a})
        let b = this.state.upvote_inverted.slice();
        b[i-1] = false
        this.setState({ upvote_inverted: b})
    }

    handleDownvote(index) {
        api.downvote({'id': index})
        let i = parseInt(index)
        let a = this.state.upvote_inverted.slice();
        a[i-1] = true
        this.setState({ upvote_inverted: a})
        let b = this.state.downvote_inverted.slice();
        b[i-1] = false
        this.setState({ downvote_inverted: b})
    }

    render() {
        var data;
        // const loadData = () => JSON.parse(JSON.stringify(jsonData)); //uncomment to get a non-cached one
        let share_options = [
            {
                text: "Social Media",
                value: "Social Media"
            },
            {
                text: "SMS",
                value: "SMS"
            },
            {
                text: "Email",
                value: "Email"
            },
            {
                text: "In Person",
                value: "In Person"
            }
        ]
        let items = [];
        for(var i = 1; i < 26; i++)
        {
            let index = i.toString();
            items.push(
                <Grid celled key={i}>
                    <Grid.Row>
                        <Grid.Column width={5}>
                            <div className="share_up">
                                <Dropdown fluid placeholder='Share' className="sharebox" selection options = {share_options} onChange={(e,data) => this.handleShare(e, data, index)}/>
                                <Button as='div' labelPosition='left'>
                                    <Label as='a' basic>
                                        {postData[index]["upvotes"]}
                                    </Label>
                                    <Button.Group>
                                        <Button className="vote_button" color="green" onClick={() => this.handleUpvote(index)} inverted={this.state.upvote_inverted[i-1]}>&#11014;</Button>
                                        <Button className="vote_button" color="red" onClick={() => this.handleDownvote(index)} inverted={this.state.downvote_inverted[i-1]}>&#11015;</Button>
                                    </Button.Group>
                                </Button>
                            </div>
                        </Grid.Column>
                        <Grid.Column width={11}>
                            <Card.Description className='card-descrip'>
                                <a href={postData[index]["url"]} target="_blank" onClick={() => api.link({'id': index})}>
                                    <Button className='card-descrip-button' size="tiny" primary>Read Article</Button>
                                </a>
                                {"   " + postData[index]["title"]}
                            </Card.Description>
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
