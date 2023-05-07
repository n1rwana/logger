# Logger
A simple logger for React JS applications

# Guide
Open the main file of your application (for example, `App.js`). In `this.state`, add an empty `consoleHistory` array. Also add this function:
```
log(type, ...body) {
    const prefix = `[Logger] ${new Date().toISOString()} [${type}]`;
    const message = `${prefix} ${body.map(arg => (typeof arg === 'object' && arg !== null) ? JSON.stringify(arg) : String(arg)).join(' ')}`;
    this.setState({ consoleHistory: [...this.state.consoleHistory, message] });
    console.log(prefix, ...body);
}
```
In `type`, you need to pass the type of the log (INFO, WARN, ERROR, etc.). In `body` — what, directly, you need to write to the log.

Example of use in the code
`this.log("INFO", "API responded:", data);`

# Export logs
To export logs, you need to call the `exportLogs` function from `Logger.js` and pass the only parameter to it — the `consoleHistory` array.

# Demo
See the demo version here: ...
