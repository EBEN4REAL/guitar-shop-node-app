import React, {Component}  from 'react'
import DropZone from 'react-dropzone';
import axios from 'axios';

import FontAwesomeIcon from '@fortawesome/fontawesome';
import faPlusCircle from '@fortawesome/fontawesome-free-solid/faPlusCircle';
import CircularProgress from '@material-ui/core/CircularProgress';

class FileUpload extends Component {
    state = {
        uploadedFiles: [],
        uploading: false
    }
    onDrop = (files) => {
        this.setState({uploading: true});
        let formdata = new FormData();
        const config = {
            header: {'content-type': 'multipart/form-data'}
        }
        formdata.append("file", files[0]);
        
        console.log(formdata);
        axios.post('/api/users/uploadimage',formdata, config)
            .then(res => {
                console.log(res.data);
                this.setState({
                    uploading: false,
                    uploadedFiles: [
                        ...this.state.uploadedFiles,
                        res.data
                    ]
                }, () => {
                    this.props.imagesHandler(this.state.uploadedFiles)
                })
            })
       
    }
    showUploadedImages = () => {
        console.log("The pics");
        console.log(this.state.uploadedFiles);
        this.state.uploadedFiles.map(item => (
            <div className="dropzone_box" 
                key={item.public_id}
                onClick={() => this.onRemove(item.public_id)}>
                    <div className="wrap" 
                    style={{ background: `url(${item.url}) no-repeat` }}>
                    
                    </div>
            </div>
        ))
    }
    render(){
        return (
            <div>
                <section>
                    <div className="dropzone clear">
                        <DropZone
                            onDrop={(e) => this.onDrop(e)}
                            multiple={true}
                        >

                        
                        </DropZone>
                        <div>
                          {this.state.uploadedFiles.map((item,index) => (
                            <div className="dropzone_box" 
                                key={item.public_id}
                                onClick={() => this.onRemove(item.public_id)}>
                                    <div className="wrap" 
                                    style={{ background: `url(${item.url}) no-repeat` }}
                                        key={index}>
                                    
                                    </div>
                            </div>
                        ))}
                        </div>
                        

                        {
                            this.state.uploading ? 
                            <div className="dropzone_box" style={{ 
                                textAlign: 'center',
                                paddingTop: '60px'
                             }}>
                                <CircularProgress 
                                 style={{ color: "#00bcd4" }}
                                 thickness={7}
                                 />
                             </div>
                         :null
                        }
                    </div>
                </section>
            </div>
        )
    }
}
export default FileUpload