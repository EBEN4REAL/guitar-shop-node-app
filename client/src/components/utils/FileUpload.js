import React, {Component}  from 'react'
import DropZone from 'react-dropzone';
import axios from 'axios';

import FontAwesomeIcon from '@fortawesome/fontawesome';
import faPlusCircle from '@fortawesome/fontawesome-free-solid/faPlusCircle';
import CircularProgress from '@material-ui/core/CircularProgress';

class FileUpload extends Component {
    state = {
        uploadFiles: [],
        uploading: false
    }
    onDrop = (files) => {
        console.log(files);
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