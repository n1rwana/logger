import React, { Component } from 'react'
import { exportLogs } from './Logger';
import { Button, Div, FormItem, FormLayout, Group, Input, Select, Tabs, TabsItem } from '@vkontakte/vkui';
import Panel1 from './Panels/Panel1';
import Panel2 from './Panels/Panel2';

export default class Home extends Component {
    constructor(props) {
        super(props)

        this.state = { input: "", level: "INFO", activePanel: "Panel1" }

        this.onInputChanged = this.onInputChanged.bind(this);
        this.onLevelChanged = this.onLevelChanged.bind(this);
        this.sendLog = this.sendLog.bind(this);
    }

    async componentDidMount() {
        this.props.log("INFO", "Home did mount");
    }

    onInputChanged(e) { this.setState({ input: e.target.value }); }
    onLevelChanged(e) { this.setState({ level: e.target.value }); }

    sendLog() {
        const { level, input } = this.state;
        this.props.log(level, input);
    }

    onTabChanged(panel) {
        this.setState({ activePanel: panel });
    }

    render() {
        const { log, consoleHistory } = this.props;
        const { level, input, activePanel } = this.state;
        const levels = [
            { label: "INFO", value: "INFO" },
            { label: "WARN", value: "WARN" },
            { label: "ERROR", value: "ERROR" }
        ];

        return (
            <div>
                <Group>
                    <FormLayout>
                        <FormItem top={"Уровень"}>
                            <Select options={levels} value={level} onChange={this.onLevelChanged} />
                        </FormItem>
                        <FormItem top={"Лог"}>
                            <Input value={input} onChange={this.onInputChanged} />
                        </FormItem>
                        <FormItem>
                            <Button onClick={this.sendLog} size={"m"} stretched>Отправить</Button>
                        </FormItem>
                    </FormLayout>
                </Group>
                <Group>
                    <Div>В логах <b>{consoleHistory.length}</b> записей.</Div>
                    <Div>
                        <Button onClick={() => exportLogs(this.props.consoleHistory)} size={"m"} stretched>
                            Экспортировать логи
                        </Button>
                    </Div>
                </Group>
                <Group>
                    <Tabs>
                        <TabsItem selected={activePanel === "Panel1"} onClick={() => {
                            this.onTabChanged("Panel1");
                        }}>Panel1</TabsItem>
                        <TabsItem selected={activePanel === "Panel2"} onClick={() => {
                            this.onTabChanged("Panel2");
                        }}>Panel2</TabsItem>
                    </Tabs>

                    <Div>{activePanel === "Panel1" ? <Panel1 {...this.props} /> : <Panel2 {...this.props} />}</Div>
                </Group>
            </div>
        )
    }
}
