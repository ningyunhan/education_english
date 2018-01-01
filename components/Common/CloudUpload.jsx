import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactQiniu from 'react-qiniu';
import 'superagent';

const styles = { padding: 30 };
const dropZoneStyles = {
    margin: '20px auto',
    border: '2px dashed #ccc',
    borderRadius: '5px',
    width: '300px',
    height: '200px',
    color: '#aaa'
};

class CloudUpload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            progresses: null,
            files: [],
            token: null
        };
    }

    componentDidMount() {
        const uploadType = this.props.document && this.props.document.uploadType;
        Meteor.call('getQiniuUploadToken', uploadType, (error, token) => {
            if (!error) {
                this.setState({
                    token
                });
            }
        });
    }

    onUpload(files) {
        let progresses = {};
        let _this = this;
        files.map(function (f) {
            f.onprogress = function(e) {
            progresses[f.preview] = e.percent;
            console.log(e.percent);
            _this.setState({progresses: progresses});
            };
        });
    }

    onDrop(files) {
        console.log('Received files: ', files);
        // This will not work because onDrop called after uploadFiles, so
        // we need a function to set hook before call uploadFiles and attach file to function
        this.setState({
            files: files
        });
    }

    showFiles() {
        if (this.state.files.length <= 0) {
            return '';
        }

        const files = this.state.files;
        const progresses = this.state.progresses;
        const styles = {
            width: '600px',
            margin: '10px auto'
        }

        return (
            <div className='dropped-files' style={styles}>
                <h3>Dropped files: </h3>
                <ul>
                    {[].map.call(files, function (f, i) {
                        // f is a element of files
                        // f.uploadPromise => return a Promise to handle uploading status(what you can do when upload failed)
                        // f.request => return super-agent request with uploading file
                        var preview = '';
                        var progress = progresses && progresses[f.preview]
                        if (/image/.test(f.type)) {
                            preview = <img src={f.preview} />;
                        } else if (/audio/.test(f.type)) {
                            preview = <audio src={f.preview} controls preload> </audio>;
                        }
                        return <li key={i}>{preview} {f.name + ' : ' + f.size / 1000 + 'KB.'}   {(progress || 0) + '% uploaded'}</li>;
                    })}
                </ul>
            </div>
        );
    }

    render() {
        console.log(this.props);
        const maxSize = this.props.maxSize || this.props.document && this.props.document.maxSize || '5MB';
        return (
            <div className="qiniu-file-upload">
                <ReactQiniu onDrop={this.onDrop}
                    onUpload={this.onUpload}
                    size={300}
                    maxSize={maxSize}
                    token={this.state.token}
                    accept="image/*"
                    style={dropZoneStyles}>
                    <div style={styles}> Try dropping some files here, or click files to upload. </div>
                </ReactQiniu>
                {this.showFiles()}
            </div>
        );
    }
}

CloudUpload.propTypes = {

};

export default CloudUpload;