import React from "react";
import {Upload, Icon, Modal, message} from 'antd';
import ProTypes from 'prop-types'

import {reqDeleteImg} from "../../api";
import {BASE_IMG_URL} from "../../utils/constants";


function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export default class PicturesWall extends React.Component {
    static proTypes = {
        imgs: ProTypes.array
    };
    state = {
        previewVisible: false,   //大图预览
        previewImage: '',//大图的URL
        fileList: [
            // {
            //     uid: '-1',
            //     name: 'image.png',
            //     status: 'done',  //图片状态  已上传图片
            //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            // },
        ],
    };

    constructor(props) {
        super(props);
        let fileList = [];
        const {imgs} = this.props;
        if (imgs && imgs.length > 0) {
            fileList = imgs.map((img, index) => ({
                uid: -index,
                name: img,
                status: 'done',  //图片状态  已上传图片
                url: BASE_IMG_URL + img,
            }));
            this.state = {
                previewVisible: false,   //大图预览
                previewImage: '',//大图的URL
                fileList  //所有已经上传图片数组
            }
        }


    }

    //获取所有上传图片文件名的数组
    getImgs = () => {
        return this.state.fileList.map(
            file => file.name
        )
    }
    //隐藏Model
    handleCancel = () => this.setState({previewVisible: false});

    handlePreview = async file => {
        //显示指定filed的大图
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };
    //file  当前操作的图片文件
    //fileList，所有以上传图片文件的数组
    handleChange = async ({file, fileList}) => {
        console.log(file, fileList,'---------------------------------');
        //操作过程中更新fileList的状态
        //上传成功对 file的信息修正
        if (file.status === 'done') {
            const result = file.response
            if (result.status === 0) {
                message.success('上传图片成功')
                const {name, url} = result.data
                file = fileList[fileList.length - 1];
                file.name = name
                file.url = url
            } else {
                message.error('上传图片失败')
            }
        } else if (file.status === 'removed') {//删除图片
            console.log(file.name,'name')
            const result = await reqDeleteImg(file.name);
            if (result.status === 0) {
                message.success('删除图片成功')
            } else {
                message.error('删除失败')
            }
        }
        this.setState({fileList})
    };
    // componentDidMount() {
    //    this.getImgs()
    // }

    render() {
        const {previewVisible, previewImage, fileList} = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus"/>
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div    style={{margin:'0 30px'}}>
                <Upload
                    action="/manage/img/upload" //上传图片的接口地址
                    listType="picture-card"  // 卡片样式
                    accept='image/*' //只接受图片
                    name='image'  //请求参数名
                    fileList={fileList}  //上传文件列表
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}

                >
                    {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                {/*//图片最大化*/}
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{width: '100%'}} src={previewImage}/>
                </Modal>
            </div>
        );
    }
}

