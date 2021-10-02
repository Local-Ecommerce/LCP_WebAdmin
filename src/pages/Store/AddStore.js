import React, { Component } from 'react';

class AddStore extends Component {

    render() {
        return (
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
        );
    }
}

export default AddStore;