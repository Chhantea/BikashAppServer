import React,{Component} from 'react';
import axios from 'axios';
import Url from '../apiOption/apiUrl';
import {Link} from "react-router-dom";

export default class LyricsList extends Component{
    constructor() {
        super();
        this.state={
            data:[],
            loading:true
        }
    }
    componentDidMount() {
        axios.get(Url + 'api/v1/contex/' + this.props.contexId + '/lyrics').then(res => {
            this.setState({data:res.data,loading:false});
        }).catch(err=>{
            console.log(err);
        })
    }
    _renderList(){
        var arr=[],data=this.state.data;
        for(var i=0;i<data.length;i++){
            arr.push(<li  className="list-group-item pointer" key={"key-data-"+i}>
                <span>
                     {data[i].title}
                </span>
                <span className="float-right">
                    <Link to={{
                        pathname:'/edit',
                        state:data[i]
                    }}>Edit</Link>
                </span>
            </li>)
        }
        if(arr.length>0){
            return arr;
        }else {
            return (
                <li className='list-group-item'>Empty</li>
            )
        }
    }
    render() {
        return (
            <div style={{paddingLeft:10,paddingRight:10}}>
                <ul className="list-group">
                    {this.state.loading?(
                        <li className='list-group-item'>Loading...</li>
                    ):this._renderList()}
                </ul>
            </div>
        );
    }
}