import React, { Component } from 'react'
import { Segment, Grid, Divider, Label, Card, Item, Button, Image, Checkbox } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import styles from './Tag.scss'
import tagData from '../../../../data/tags_tfidf.json';
import postData from '../../../../data/input.json';

class Tag extends Component {

    temp(data) {
        let labels = []
        for(var i = 1; i < data.length; i++)
        {
            labels.push(<Label key={i}>{data[i]}</Label>)
        }
        return labels
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
                        <Checkbox label='Share' />
                        <Label className='upvotes'> {postData[index]["upvotes"]} &#11014;</Label>
                    </Segment>
                    <Segment>
                        <a href={postData[index]["url"]} target="_blank">
                            <Card.Description>
                                <Label.Group>
                                    {this.temp(tagData[index]["tags"])}
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
