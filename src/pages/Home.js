import React, { Component } from 'react';

class Home extends Component {
    render() {
        return (
            <div className="container-fluid">

                <div class="row">
                    <div class="col-md-8">
                        <div class="card mb-3">
                            <div class="card-header bg-white">Welcome, Admin</div>
                            <div class="card-body">
                                <h5 class="card-title">25/09/2021</h5>
                                <p class="card-text">• etc.</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <div class="card mb-3">
                            <div class="card-header bg-white">Bản tin mỗi ngày</div>
                            <div class="card-body">
                                <p class="card-text">• etc.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-4">
                        <div class="card mb-3">
                            <div class="card-header bg-white">Số lượng người dùng đã đăng kí</div>
                            <div class="card-body">
                                <p class="card-text">a chart.</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <div class="card mb-3">
                            <div class="card-header bg-white">Số lượng người đã install trong tháng</div>
                            <div class="card-body">
                                <p class="card-text">a chart.</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <div class="card mb-3">
                            <div class="card-header bg-white">Số lượng lượt download App trong tháng</div>
                            <div class="card-body">
                                <p class="card-text">a chart.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-4">
                        <div class="card mb-3">
                            <div class="card-header bg-white">Số lượng người đang download ứng dụng</div>
                            <div class="card-body">
                                <p class="card-text">a chart.</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-8">
                        <div class="card mb-3">
                            <div class="card-header bg-white">Các vùng đã cài đặt</div>
                            <div class="card-body">
                                <p class="card-text">a chart.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;