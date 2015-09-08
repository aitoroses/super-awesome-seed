declare module 'redux-devtools/lib/react' {
  export var DevTools: __React.ComponentClass<any>
  export var DebugPanel: __React.ComponentClass<any>
  export var LogMonitor: __React.ComponentClass<any>
}

declare module 'redux-devtools' {
  export var devTools: () => Redux.Middleware
  export var persistState: (loc: RegExpMatchArray) => Redux.Middleware
}
