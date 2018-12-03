import React, { Component } from 'react'
import { Segment, Grid, Divider, Label, Card, Item, Button, Image, Checkbox } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import styles from './Tag.scss'
import tagData from '../../../../../data/tags_tfidf.json';
import postData from '../../../../../data/input.json';
import Api from '../../Api.js';
const api = new Api();


class Tag extends Component {

    componentDidMount() {
        api.tag()
    }

    list_of_labels(data) {
        let labels = []
        for(var i = 1; i < data.length; i++)
        {
            labels.push(<Label key={i}>{data[i]}</Label>)
        }
        return labels
    }

    handleShare(e, data, index) {
        api.share({'id': index, 'checked': data.checked})
    }

    render() {
        var data;
        // const loadData = () => JSON.parse(JSON.stringify(jsonData)); //uncomment to get a non-cached one
        let items = [];
        for(var i = 1; i < 26; i++)
        {
            let index = i.toString();
            items.push(
                <Segment.Group horizontal key={i}>
                    <Segment>
                        <Checkbox label='Share' onClick={(e,data) => this.handleShare(e, data, index)}/>
                        <Label className='upvotes'> {postData[index]["upvotes"]} &#11014;</Label>
                    </Segment>
                    <Segment>
                        <a href={postData[index]["url"]} target="_blank" onClick={() => api.link({'id': index})}>
                            <Card.Description>
                                <Label.Group>
                                    {this.list_of_labels(tagData[index]["tags"])}
                                </Label.Group>
                            </Card.Description>
                        </a>
                    </Segment>
                  </Segment.Group>
            )
        }

        return (
            <div className="Tag">
                <div className="container">
                    <h1> r/News </h1>
                    <Card.Group stackable>{items}</Card.Group>
                </div>
            </div>
        )
    }
}

export default Tag
