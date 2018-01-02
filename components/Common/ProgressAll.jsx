import React, { Component, PropTypes } from 'react';
import { Well, Panel, Label, Col, Button } from 'react-bootstrap';

class ProgressAll extends Component {
    render() {

    	const divStyle= {
			textAlign:'center', 
			backgroundColor: '#18BC9C',
			color:'#fff',
			height:'95px',
			borderRadius:'6px',
			paddingTop:'29px',
			fontSize:'39px'
    	}
    	const center = {
    		textAlign:'center',
    	}

    	const {amountAll} = this.props;
        return (
            <Panel header={<h3>Overall Progress</h3>} bsStyle="success">
                <Col md={4}>
                    <h2 style={divStyle}>{amountAll}</h2>
                    <div style={center}>Quized</div>
                </Col>
                <Col md={4}>
                    <h2 style={divStyle}>{amountAll}</h2>
                    <div style={center}>Posted</div>
                </Col>
                <Col md={4}>
                    <h2 style={divStyle}>{amountAll}</h2>
                    <div style={center}>Commented</div>
                </Col>                                        
            </Panel>         
        );
    }
}

ProgressAll.propTypes = {
};

export default ProgressAll;