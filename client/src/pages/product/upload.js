import React from 'react';
import { Upload, Icon, Modal,message } from 'antd';
import {reqDelUploadImg} from 'api'
import {imgUrl} from 'config'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [
      // {
      //   uid: '-1',
      //   name: 'image.png',
      //   status: 'done',
      //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      // },
    ],
  };
  constructor(props){
    super(props)
    const {imgSrc=[]} = this.props
    if(imgSrc.length){
     const fileList = imgSrc.map((img,index)=>{
        return {
          uid: -index,
          name: img,
          status: 'done',
          url: imgUrl+img,
        }
      })
      this.state={
        fileList
      }
    }
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };
  getImgs=()=>{
    return this.state.fileList.map(file=>file.name)
  }
  /**
   * @param file 当前操作的文件对象。file.response为当前请求的返回
   * @param fileList  当前的文件列表。
   * @param event  上传中的服务端响应内容，包含了上传进度等信息，高级浏览器支持。
   */
  handleChange = async ({ file,fileList,event }) => { //上传中、完成、失败都会调用这个函数。
    const {response,status} =  file
    // 上传成功
    if (status === 'done') { 
      const {data} = response 
      const {name,url}=data
      const currentFile = fileList[fileList.length - 1]
      currentFile.name = name
      currentFile.url = url
    } else if (status === 'removed') {
      const res = await reqDelUploadImg({name:file.name})
      if(res.status===0){
        message.success('删除成功！')
      }
    }
    this.setState({ fileList })
  };
  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">图片上传</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          accept='image/*'
          // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          action="/manage/img/upload" //上传的接口
          listType="picture-card"
          name='image' //img-name
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          showUploadList={true}
        >
          {fileList.length >= 4 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="upload_img" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
