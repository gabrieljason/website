// @ts-check
import Index from './Index.js'

/**
* Decentral Ninja Main/Start Page
*
* @export
* @class Chat
* @type {CustomElementConstructor}
*/
export default class Chat extends Index {
  constructor (options = {}, ...args) {
    super({
      importMetaUrl: import.meta.url,
      ...options
    }, ...args)
  }

  connectedCallback () {
    this.hidden = true
    document.documentElement.setAttribute('invert', 'true')
    const showPromises = []
    if (this.shouldRenderCSS()) showPromises.push(this.renderCSS())
    if (this.shouldRenderHTML()) showPromises.push(this.renderHTML())
    Promise.all(showPromises).then(() => (this.hidden = false))
  }

  /**
  * renders the html
  *
  * @return {Promise<void>}
  */
  renderHTML () {
    return this.fetchModules([
      {
        path: `${this.importMetaUrl}../organisms/header/Header.js`,
        name: 'o-header'
      },
      {
        path: `${this.importMetaUrl}../atoms/logo/Logo.js`,
        name: 'a-logo'
      },
      {
        path: `${this.importMetaUrl}../organisms/body/Body.js`,
        name: 'o-body'
      },
      {
        path: `${this.importMetaUrl}../organisms/footer/Footer.js`,
        name: 'o-footer'
      },
      {
        path: `${this.importMetaUrl}../atoms/iconChat/IconChat.js`,
        name: 'a-icon-chat'
      },
      {
        path: `${this.importMetaUrl}../../event-driven-web-components-yjs/src/es/EventDrivenYjs.js`,
        name: 'c-event-driven-yjs'
      },
      {
        path: `${this.importMetaUrl}../../event-driven-web-components-yjs/src/es/controllers/Providers.js`,
        name: 'c-providers'
      },
      {
        path: `${this.importMetaUrl}../../event-driven-web-components-yjs/src/es/controllers/Users.js`,
        name: 'c-users'
      },
      {
        // TODO: yjs-awareness-change is inside yjs-details-awareness-change, this has nickname and room name functionality, which has to be split to one: user class and two: room class
        // TODO: Example artifact, properly redo with https://github.com/feross/p2p-graph event-driven-web-components-yjs/readme.md
        path: `${this.importMetaUrl}../../event-driven-web-components-yjs/tests/exampleOne/AwarenessChange.js`,
        name: 'yjs-awareness-change'
      },
      {
        // TODO: Example artifact, properly redo with https://github.com/feross/p2p-graph event-driven-web-components-yjs/readme.md
        path: `${this.importMetaUrl}../../event-driven-web-components-yjs/tests/exampleTwo/DetailsAwarenessChange.js`,
        name: 'yjs-details-awareness-change'
      },
      {
        // TODO: chat and chat update are typically view and model/controller in the chat repo, properly split to mvc
        // TODO: Example artifact, properly redo and move to chat sub-repo
        path: `${this.importMetaUrl}../../event-driven-web-components-yjs/tests/exampleTwo/controllers/YjsChat.js`,
        name: 'c-yjs-chat'
      },
      {
        // TODO: Example artifact, properly redo and move to chat sub-repo
        path: `${this.importMetaUrl}../../event-driven-web-components-yjs/tests/exampleTwo/YjsChatUpdate.js`,
        name: 'yjs-chat-update'
      },
      {
        // TODO: Example artifact, properly redo
        path: `${this.importMetaUrl}../../event-driven-web-components-yjs/tests/exampleTwo/Room.js`,
        name: 'yjs-room'
      },
      {
        // TODO: Example artifact, properly redo
        path: `${this.importMetaUrl}../../event-driven-web-components-yjs/tests/exampleTwo/ShareApi.js`,
        name: 'yjs-share-api'
      },
      {
        // TODO NEXT: Example artifact, properly redo
        path: `${this.importMetaUrl}../../chat/es/components/views/Input.js`,
        name: 'yjs-input'
      }
    ]).then((children) => {
      this.html = /* html */`
        <c-event-driven-yjs websocket-url="wss://the-decentral-web.herokuapp.com?keep-alive=86400000" indexeddb no-blur sw-url="${this.importMetaUrl}../../../../MasterServiceWorker.js">
          <c-providers>
            <c-users>
              <c-yjs-chat>
                <section>
                  <o-header toggle-once>
                    <yjs-share-api style="height: fit-content;">share this room:</yjs-share-api>
                    <a href="?page=/" route target="_self"><a-logo namespace="logo-invert-" invert></a-logo></a>
                  </o-header>
                  <o-body>
                    <yjs-chat-update></yjs-chat-update>
                  </o-body>
                  <o-footer>
                    <yjs-input style="order: -1; width: 100%;"></yjs-input>
                    <details open>
                      <summary><code>connection data</code></summary>
                      <yjs-details-awareness-change></yjs-details-awareness-change>
                      <yjs-room></yjs-room>
                    </details>
                  </o-footer>
                </section>
              </c-yjs-chat>
            </c-users>
          </c-providers>
        </c-event-driven-yjs>
      `
    })
  }
}
