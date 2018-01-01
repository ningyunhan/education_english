import { Components, replaceComponent, getSetting, Strings } from 'meteor/nova:lib';
import React, { PropTypes, Component } from 'react';
import { IntlProvider, intlShape} from 'react-intl';
import { default as TouchBackend } from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

class App extends Component {

  getLocale() {
    return getSetting("locale", "en");
  }

  getChildContext() {
    
    const messages = Strings[this.getLocale()] || {};
    const intlProvider = new IntlProvider({locale: this.getLocale()}, messages);
    
    const {intl} = intlProvider.getChildContext();

    return {
      intl: intl
    };
  }

  render() {
    return (
      <IntlProvider locale={this.getLocale()} messages={Strings[this.getLocale()]}>
        {
          this.props.loading ? 
            <Components.Loading /> :
            <Components.Layout>{this.props.children}</Components.Layout>
        }
      </IntlProvider>
    )
  }

}

App.propTypes = {
  loading: React.PropTypes.bool,
}

App.childContextTypes = {
  intl: intlShape,
}

App.displayName = 'App';

export default DragDropContext(TouchBackend)(App);
