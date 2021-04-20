import React,{Component} from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default class QuillEditor extends Component{
    constructor(props) {
        super(props);
        this.state={
            text:this.props.body? this.props.body:''
        }
    }
    onHandleChange=(value)=>{
        console.log(value);
        this.setState({ text: value });
        this.props.handleStateUpdate("body",value);
    }
    render() {
        return (
            <div style={{backgroundColor:'white'}}>
                <ReactQuill
                    value={this.state.text}
                    onChange={this.onHandleChange}
                />
            </div>
        );
    }
}