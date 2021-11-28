import React, { Component } from 'react';
import DirectionList from '../Direction/DirectionList';

class DirectionForm extends Component {

    render() {
        return (
            <div class="modal fade" id="directionModal" tabindex="-1" aria-labelledby="directionModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="directionModalLabel">Danh sách cửa hàng</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div class="modal-body">
                            <DirectionList />
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Quay lại</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DirectionForm;