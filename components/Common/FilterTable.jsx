import React, { Component, PropTypes } from 'react';
import { map } from 'lodash';
import { Table, DropdownButton, MenuItem, Col, Panel} from 'react-bootstrap';

class FilterTable extends Component {
    render() {

        const tableHead = {
            backgroundColor: '#18BC9C',
            padding:'10px 15px',
            fontSize:'17px',
            color: '#fff',
            fontWeight:'400'
        }
        const tableStyle = {
            borderRadius: '4px',
        }

        return (
            <div>
                {/*{
                    this.props.tableFilters && <DropdownButton bsStyle="info" title="Filter">
                        <MenuItem eventKey="1">Action</MenuItem>
                        <MenuItem eventKey="2">Another action</MenuItem>
                        <MenuItem eventKey="3" active>Active Item</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey="4">Separated link</MenuItem>
                    </DropdownButton>
                }*/}
                <Col md={12}>
                    <Table striped bordered condensed hover style={tableStyle}>
                        <thead>
                            <tr>
                                <th style={tableHead} colSpan={this.props.tableHeads.length + 1}>Quiz History</th>
                            </tr>
                            <tr>
                                <th>#</th>
                                {
                                    map(this.props.tableHeads, (head, key) => {
                                        return <th key={key}>{head.name}</th>
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                map(this.props.tableContent, (content, key) => {
                                    return <tr key={key} className={content.className}>
                                        {
                                            [
                                                <td key={-1}>{key + 1}</td>,
                                                ...map(this.props.tableHeads, (head, key) => {
                                                    return <td key={key}>{content[head.key]}</td>
                                                })
                                            ]
                                        }
                                    </tr>
                                })
                            }
                        </tbody>
                    </Table>
                </Col>
            </div>
        );
    }
}

FilterTable.propTypes = {
    tableFilters: PropTypes.arrayOf(PropTypes.shape({
        displayName: PropTypes.string
    })),
    tableHeads: PropTypes.array,
    tableContent: PropTypes.array
};

export default FilterTable;