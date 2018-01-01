import { replaceComponent, withCurrentUser } from 'meteor/nova:core';

export { default as SwitchTab } from './Common/SwitchTab';
export { default as FilterTable } from './Common/FilterTable';
export { default as Questioning } from './Questioning';
export { default as FindGroup } from './FindGroup';
export { default as KnowledgeImage } from './KnowledgeImage';
export { default as KnowledgeEdit } from './KnowledgeEdit';
export { default as GraphQuestioning } from './GraphQuestioning';
export { default as Task } from './Common/Task';
export { default as Suggest } from './Common/Suggest';
export { default as Intro } from './Common/Intro';
export { default as Connector } from './Common/Connector';
export { default as InlineLogin } from './Common/InlineLogin';
export { default as RequireLogin } from './Common/RequireLogin';
export { default as Draggable } from './Common/Draggable';
export { default as Droppable } from './Common/Droppable';
export { default as Footer } from './Common/Footer';
export { default as Loading } from './Common/Loading';
export { default as Trophy } from './Common/Trophy';
export { default as Medal } from './Common/Medal';
export { default as PopUp } from './Common/PopUp';
export { default as KnowledgeGraph } from './Common/KnowledgeGraph';
export { default as RankBoard } from './Common/RankBoard';
export { default as ProgressAll} from './Common/ProgressAll';

import App from './App';
import NavBar from './Common/NavBar';
import UsersMenu from './Common/UsersMenu';
import Footer from './Common/Footer';
import Loading from './Common/Loading';

replaceComponent('App', App, withCurrentUser);
replaceComponent('Header', NavBar);
replaceComponent('UsersMenu', UsersMenu);
replaceComponent('Footer', Footer);
replaceComponent('Loading', Loading);