import React, { Component, PropTypes } from 'react';
import { isEmpty, map } from 'lodash';
import { SwitchTab, FilterTable, Task, InlineLogin, Trophy, ProgressAll } from '../../components/';
import { Well, Col, Row, Label, ProgressBar } from 'react-bootstrap';
import { Components, Loading } from 'meteor/nova:core';

class Report extends Component {

    render() {
        if (this.props.loading && isEmpty(this.props.recordsArray)) {
            return <Loading />;
        }
        const user = this.props.currentUser;
        
        const divStyle = {
          flex:'1',
          flexDirection:'row-reverse',
          flexWrap:'wrap',
        };        
        console.log(this.props)        
        return (
            <Components.ShowIf
                check={(currentUser, document) => !!currentUser}
                failureComponent={<InlineLogin />}
                {...this.props}
            >
                {user && 
                <div className="report">   
                    <Row>
                        <Col sm={12} md={12}>
                            <Col md={6}>
                                <h2>{user.displayName}</h2>
                                <p><em>Sex: </em>{user.profile.sex}</p>
                                <p><em>Grade: </em>{user.profile.grade}</p>
                                <p><em>Class Number: </em>{user.profile.classNumber}</p>
                                {user.profile.Awards && <p><em>Awards: </em>{
                                    map(user.profile.Awards, (award, key) => {
                                        return <Label key={key} bsStyle="success">{award.name}</Label>
                                    })
                                }</p>}
                            </Col>
                            <Col md={1} mdOffset={5}>
                                <div>
                                    <div style={{width:'64px',position:'absolute', right:'0px'}}>
                                        <Trophy count={user.profile.trophy}/>
                                        <div style={{textAlign:'center'}}>Lv.{user.profile && user.profile.level}</div>
                                    </div>
                                </div>
                                {/*<h6 style={{textAlign:'center'}}>Lv.{user.profile && user.profile.level}</h6>*/}
                            </Col>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12} md={12} style={divStyle}>
                            <Col md={12}>
                                {this.props.overallProgress && <ProgressBar bsStyle="success" now={this.props.overallProgress} />}
                                <h5 style={{textAlign:'right'}}>{`${Math.round(this.props.overallProgress * 10) / 10}%  Completed`}</h5>
                            </Col>
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col sm={12} md={12}>
                            <Col md={6}>
                                <Task
                                    onClickTaskStart={this.props.taskToday.onStart}
                                    taskName={this.props.taskToday.name}
                                    taskStatus={this.props.taskToday.status}
                                    taskContent={this.props.taskToday.content}
                                />
                            </Col>
                            <Col md={6}>
                                <ProgressAll
                                    amountAll={this.props.totalQuizedKnowledgeCount}
                                />
                            </Col>                            
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col sm={12} md={12}>
                            <FilterTable tableHeads={this.props.quizRecordsTableHeads} tableContent={this.props.quizRecordsTableContent} />
                        </Col>
                    </Row>
                </div>}
            </Components.ShowIf>
        );
    }
}

Report.propTypes = {
    recordsArray: PropTypes.array
};

export default Report;