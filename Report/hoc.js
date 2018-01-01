import { map, countBy } from 'lodash';
import { compose, withProps, renameProp } from 'recompose';
import classNames from 'classnames';
import { withList } from 'meteor/nova:core';
import { getDaysSinceEpoch, answerStatusType, knowledgeType } from '../../components/utils';
import Records from '../../collections/records/';

export default compose(
    withProps(props => ({
        numOfQuestionNeedToQuiz: props.currentUser && props.currentUser.profile.studyInterval[knowledgeType.VOCABULARY] || 20
    })),
    withProps(props => {
        // set terms that used in withList to get quiz records by a date range.
        const user = props.currentUser;
        return {
            terms: {
                view: 'userQuizRecordsByUpdateDay',
                userId: user && user._id || 'unkown',
                date: getDaysSinceEpoch()
            }
        };
    }),
    withList({
        collection: Records,
        queryName: 'RecordsListQuery',
        fragmentName: 'RecordFragment'
    }),
    renameProp('results', 'recordsArray'),
    renameProp('totalCount', 'totalQuizedKnowledgeCount'),
    withProps(props => ({
        quizrecordsStatusOverall: countBy(props.recordsArray, record => {
            return record.knowledgeStudyRecords.status;
        })
    })),
    
    withProps(props => {
        const hasLearnedWordsCount = props.recordsArray && props.recordsArray.length;
        return {
            taskToday: {
                name: 'Today\'s Task',
                status: 'success',
                content: [
                    {
                        name: 'words need revise from yesterday',
                        content: hasLearnedWordsCount ? 'no' : props.numOfQuestionNeedToQuiz
                    },
                    {
                        name: 'new words need to learn',
                        content: hasLearnedWordsCount ? 'no' : props.numOfQuestionNeedToQuiz
                    },
                    {
                        name: 'Quiz all of them',
                        content: ''
                    }
                ],
                onStart: () => {
                    if (hasLearnedWordsCount) {
                        props.router.push('/game');
                    } else {
                        props.router.push('/learn');
                    }
                }
            }
        };
    }),
    withProps(props => ({
        quizRecordsTableHeads: [{
            key: 'title',
            name: 'Title'
        }, {
            key: 'difficulty',
            name: 'Difficulty level for you'
        }, {
            key: 'status',
            name: 'Performance'
        }, {
            key: 'timeUsed',
            name: 'Time Used'
        }]
    })),
    withProps(props => ({
        quizRecordsTableContent: map(props.recordsArray, (content, key) => {
            const {
                title
            } = content.knowledgeNode || {};
            const {
                difficulty,
                status,
                timeUsed,
            } = content.knowledgeStudyRecords || {};
            const className = classNames({
                'success': status === answerStatusType.CORRECT,
                'danger': status === answerStatusType.WRONG,
                'warning': status === answerStatusType.SKIPPED,
                'info': status === answerStatusType.TIME_OUT
            });
            return {
                className,
                title,
                difficulty: `${Math.round(difficulty * 10)} star(s)`,
                status,
                timeUsed
            };
        })
    })),
    withProps(props => ({
        overallProgress: parseFloat(props.currentUser && props.currentUser.profile.difficultyLevel || 0) * 100
    })),

)