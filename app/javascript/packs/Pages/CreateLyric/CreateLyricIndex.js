import React,{Component} from 'react';
import {Link} from "react-router-dom";
import QuillEditor from "./QuillEditor";
import axios from 'axios';
import Url from '../apiOption/apiUrl';

export default class CreateLyricIndex extends Component{
    constructor() {
        super();
        this.state={
            link:'',
            body:'',
            title:'',
            allIndex:[],
            load:false
        }
    }
    componentDidMount() {
        axios.get(Url+"api/v1/contex").then(res=>{
            this.setState({allIndex:res.data});
        }).catch(err=>{
            console.log(err);
        });
    }
    onHandleSubmit=(e)=>{
        e.preventDefault();
        if(this.state.title && this.state.body){
            var index = this.state.title.trim().charAt(0).toUpperCase();
            console.log(index);
            this._handleCheck(index);
        }else {
            alert("Title and lyrics must be enter");
        }
    }
    _handleCheck(index){
        this.setState({load:true});
        var data = this.state.allIndex;
        var jsonData={
            title:this.state.title,
            body:this.state.body,
            link:this.state.link
        }
        var preIndex=null;
        for(var i=0;i<data.length;i++){
            if(data[i].value == index){
                preIndex=data[i];
                jsonData.contex_id=data[i].id;
                break;
            }
        }
        if(preIndex){
            this._handleAddOnSubmit(jsonData);
        }else {
            axios.post(Url+"api/v1/contex",{value:index}).then(res=>{
                preIndex=res.data.value;
                jsonData.contex_id=res.data.value.id;
                this._handleAddOnSubmit(jsonData)
            }).catch(err=>{
                console.log(err)
            })
        }
    }
    _handleAddOnSubmit(preIndexData){
        console.log("pre index ===>",preIndexData);
        axios.post(Url+"api/v1/contex/"+preIndexData.contex_id+"/lyrics",preIndexData).then(res=>{
            alert("create Success");
            this.setState({
                link:'',
                body:'',
                title:'',
                load:false
            });
            this.props.history.push('/');
        })
    }
    handleStateUpdate=(name,value)=>{
        this.setState({[name]:value})
    }
    render() {
        console.log(this.state);
        return (
            <div className="container">
                <div className="jumbotron mt-2">
                    <div  className="mb-5 d-flex justify-content-center align-items-center">
                        <h4>Create Lyric</h4>
                    </div>
                    <div className="form-group">
                        <div className="row mb-3">
                            <label className="col-md-2 ">Title</label>
                            <input
                                className="form-control col"
                                placeholder="Enter title "
                                value={this.state.title}
                                onChange={(e)=>
                                    this.setState({title:e.target.value})}
                            />
                        </div>
                        <div className="row mb-3">
                            <label className="col-md-2 ">Link</label>
                            <input
                                className="form-control col"
                                placeholder="Link eg: https://youetube.com"
                                value={this.state.link}
                                onChange={(e)=>
                                    this.setState({link:e.target.value})}
                            />
                        </div>
                        <div className="mb-3">
                            <label>Lyrics</label>
                            <QuillEditor
                             body={this.state.body}
                             handleStateUpdate={this.handleStateUpdate}
                            />
                        </div>
                        <div>
                            <button className="btn btn-primary mr-2" onClick={this.onHandleSubmit}>Create</button>
                            <Link to={"/"} className="btn btn-warning">Cancel</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}