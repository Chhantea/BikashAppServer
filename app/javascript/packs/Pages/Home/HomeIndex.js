import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import axios  from 'axios';
import Url from '../apiOption/apiUrl';
import IndexList from "./IndexList";

export default class HomeIndex extends Component{
    constructor() {
        super();
        this.state={
            data:[]
        }
    }
    componentDidMount() {
        this._getDataFromApi();
    }
    _getDataFromApi(){
        axios.get(Url+ "api/v1/contex").then(res=>{
            this.setState({data:res.data});
        })
    }
    _renderList(){
        var arr=[],data=this.state.data;
        for(var i=0;i<data.length;i++){
            arr.push(<IndexList
                key={"key+"+i}
                pData={data[i]}
            />)
        }

        return arr;
    }
    render() {
        return (
            <div className="container mt-2">
                <div className="jumbotron">
                    <h4>List:</h4>
                    <div>
                        <ul className="list-group">
                            {this._renderList()}
                        </ul>
                    </div>
                </div>
                <div>
                    <Link to={"/create"} className="btn btn-primary">Add new</Link>
                </div>
            </div>
        );
    }
}