import React, { Component } from 'react';

class AddStoreForm extends Component {

    render() {
        return (
            <div class="modal fade" id="addstoreModal" tabindex="-1" aria-labelledby="notificationModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="notificationModalLabel">Thêm cửa hàng</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <form>
                            <div class="modal-body">
                                <div class="form-group">
                                    <label for="code">Mã cửa hàng</label>
                                    <input type="text" class="form-control" id="code" aria-describedby="codeHelp" placeholder="Nhập mã cửa hàng" />
                                    <small id="codeHelp" class="form-text text-muted ml-1">xxx-0000</small>
                                </div>

                                <div class="form-group">
                                    <label for="name">Tên cửa hàng</label>
                                    <input type="text" class="form-control" id="name" aria-describedby="nameHelp" placeholder="Nhập tên cửa hàng" />
                                    <small id="nameHelp" class="form-text text-muted ml-1">Tối đa 30 kí tự</small>
                                </div>

                                <div class="form-group">
                                    <label for="shortName">Tên rút gọn</label>
                                    <input type="text" class="form-control" id="shortName" aria-describedby="shortNameHelp" placeholder="Nhập tên rút gọn" />
                                    <small id="shortNameHelp" class="form-text text-muted ml-1">Tối đa 15 kí tự</small>
                                </div>

                                <div class="form-group">
                                    <label for="openTime">Giờ mở cửa</label>
                                    <input type="text" class="form-control" id="openTime" aria-describedby="openTimeHelp" placeholder="Nhập giờ mở cửa" />
                                    <small id="openTimeHelp" class="form-text text-muted ml-1">HH:mm</small>
                                </div>

                                <div class="form-group">
                                    <label for="closeTime">Giờ đóng cửa</label>
                                    <input type="text" class="form-control" id="closeTime" aria-describedby="closeTimeHelp" placeholder="Nhập giờ đóng cửa" />
                                    <small id="closeTimeHelp" class="form-text text-muted ml-1">HH:mm</small>
                                </div>
                            </div>

                            <div class="modal-footer">
                                <button type="submit" class="btn btn-primary px-4 mr-2">Thêm</button>
                                <button type="button" class="btn btn-secondary px-4" data-dismiss="modal">Quay lại</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddStoreForm;