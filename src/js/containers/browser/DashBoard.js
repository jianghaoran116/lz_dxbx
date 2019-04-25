import React, { Component } from "react";
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';

class DashBoard extends Component {
    render() {
        return (
            <WingBlank size="lg">
                <WhiteSpace size="lg" />
                <Card>
                    <Card.Header
                        title="javascript"
                    />
                    <Card.Body>
                        <div>重学前端之browser</div>
                    </Card.Body>
                </Card>
                <WhiteSpace size="lg" />
            </WingBlank>
        );
    }
}

export default DashBoard;