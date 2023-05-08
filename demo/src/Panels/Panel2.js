import React, { Component } from 'react'

export default class Panel1 extends Component {
    constructor(props) { super(props) }
    componentDidMount() { this.props.log("INFO", "Panel2 did mount"); }
    render() { return <div>Panel2</div>; }
}
