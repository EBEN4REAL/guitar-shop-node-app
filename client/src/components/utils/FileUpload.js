import React, {Component}  from 'react'
import DropZone from 'react-dropzone';
import axios from 'axios';

import FontAwesomeIcon from '@fortawesome/fontawesome';
import faPlusCircle from '@fortawesome/fontawesome-free-solid/faPlusCircle';
import CircularProgress from '@material-ui/core/CircularProgress';

class FileUpload extends Component {
    state = {
        uploadeFiles: [],
        uploading: true
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
                this.setState({
                    uploading: false,
                    uploadFiles: [
                        ...this.state.uploadeFiles,
                        res.data
                    ]
                })
            })
       
    }
    showUploadedImages = () => {

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
                        {this.showUploadedImages()}

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