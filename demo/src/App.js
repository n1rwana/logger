import { AdaptivityProvider, AppRoot, Avatar, Button, ButtonGroup, Cell, ConfigProvider, Div, FormItem, FormLayout, FormLayoutGroup, Group, Header, Input, ModalPage, ModalPageHeader, ModalRoot, Panel, PanelHeader, PanelHeaderBack, PanelHeaderClose, PanelSpinner, Placeholder, Separator, Snackbar, SplitCol, SplitLayout, Title } from '@vkontakte/vkui'
import React, { Component } from 'react'
import '@vkontakte/vkui/dist/vkui.css';
import { Icon56ErrorOutline } from '@vkontakte/icons';

import bridge from '@vkontakte/vk-bridge';
import Home from './Home';

export default class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
      consoleHistory: []
    }
  }

  log(type, ...body) {
    const prefix = `[Logger] ${new Date().toISOString()} [${type}]`;
    const message = `${prefix} ${body.map(arg => (typeof arg === 'object' && arg !== null) ? JSON.stringify(arg) : String(arg)).join(' ')}`;

    this.setState(prevState => ({ consoleHistory: [...prevState.consoleHistory, message] }));

    switch (type) {
      case "INFO": console.log(prefix, ...body); break;
      case "WARN": console.warn(prefix, ...body); break;
      case "ERROR": console.error(prefix, ...body); break;
      default: console.log(prefix, ...body);
    }
  }

  async componentDidMount() {
    this.log("INFO", "App did mount");
    this.log("INFO", "Checking is app running in iFrame");

    this.log("INFO", `App ${bridge.isIframe() ? "is" : "is not"} running in iFrame`);

    this.setState({ isLoading: false });
  }


  render() {
    const { isLoading, consoleHistory } = this.state;

    const console = {
      log: (type, ...body) => this.log(type, ...body),
      consoleHistory: consoleHistory
    }

    return (
      <ConfigProvider platform='vkcom'>
        <AdaptivityProvider>
          <AppRoot>
            <SplitLayout style={{ juistifyContent: "center" }}>
              <SplitCol maxWidth={"700px"} style={{ margin: "10px auto 0" }}>
                <Panel>
                  <PanelHeader>Demo</PanelHeader>
                  {isLoading ? <Group><PanelSpinner height={200} /></Group> : <Home log={this.log} {...console} />}
                </Panel>
              </SplitCol>
            </SplitLayout>
          </AppRoot>
        </AdaptivityProvider>
      </ConfigProvider>
    )
  }
} 
