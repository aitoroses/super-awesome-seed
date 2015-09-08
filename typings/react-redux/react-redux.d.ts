declare module __ReactRedux {

  /**
   * Props of the Redux Provider Class
   */
  interface Props {
    store: Redux.Store
  }

  /**
   * Provider Component
   */
  var Provider: __React.ComponentClass<Props>

  /**
   * Connect decorator for React classes
   */
  let connect: <TFunction extends Function>(mapper: TFunction) => <TComponent extends __React.ComponentClass<any>>(klass: TComponent) => TComponent
}

declare module 'react-redux' {
  export = __ReactRedux
}
