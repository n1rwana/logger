# Logger

A simple logger for React JS applications

# Guide

Open the main file of your application (for example, `App.js`). In `this.state`, add an empty `consoleHistory` array. Also add this function:

```
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
```

Pass this object to props to all panels that should be logged:

```
const console = {
      log: (type, ...body) => this.log(type, ...body),
      consoleHistory: consoleHistory
}
```

In `type`, you need to pass the type of the log (INFO, WARN, ERROR, etc.). In `body` — what, directly, you need to write to the log.

Example of use in the code
`this.log("INFO", "API responded:", data);`

**P.S. For more clarity, I recommend reading the code of the demo**

# Export logs

To export logs, you need to call the `exportLogs` function from `Logger.js` and pass the only parameter to it — the `consoleHistory` array.

# Demo

See the demo version here: https://vk.com/app51638251
