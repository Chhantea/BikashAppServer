import React,{Component} from "react";
import LyricsList from "./LyricsList";

export default class IndexList extends Component{
    constructor() {
        super();
        this.state={
            open:false
        }
    }
    render() {
        return (
            <>
                <li className="list-group-item pointer" onClick={()=>this.setState({open:!this.state.open})}>{this.props.pData.value}</li>
                {this.state.open? <LyricsList
                      contexId={this.props.pData.id}
                />:null}
            </>
        );
    }
}