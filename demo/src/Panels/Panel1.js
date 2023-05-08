import React, { Component } from 'react'

export default class Panel1 extends Component {
    constructor(props) { super(props) }
    componentDidMount() { this.props.log("INFO", "Panel1 did mount"); }
    render() { return <div>Panel1</div>; }
}
