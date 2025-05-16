# Bootstrap 5 Dynamic Modal Loader

**Dynamic loading of content in bootstrap 5 modal and modal on top of modal***

[![Demo](https://img.shields.io/badge/▶-Live_Demo-blue?style=flat)](https://franbar1966.github.io/bootstrap-5-modal-dynamic/example/)

A lightweight solution for loading dynamic content into Bootstrap 5 modals and handling modal stacking. Highly recommended for use with: [modal close on back buttom](https://github.com/FranBar1966/bootstrap-5-modal-close-on-back)

## Features

- **Preserves all native** Bootstrap modal functionality
- **No conflicts** with existing modal implementations
- Load modal content via AJAX or DOM elements
- Support for nested modals
- Dynamic template cloning
- Customizable modal options via data attributes
- No dependencies other than Bootstrap 5
- Lightweight (~5KB minified)
- Works seamlessly with [Modal Back Button Closer](https://github.com/FranBar1966/bootstrap-5-modal-close-on-back)

## Installation

### Via CDN

```html
<script src="https://cdn.jsdelivr.net/gh/FranBar1966/bootstrap-5-modal-dynamic@0.0.1/src/modal-dynamic.min.js"></script>
```

### Download

Download the script from GitHub repository: [modal dynamic](https://github.com/FranBar1966/bootstrap-5-modal-dynamic) and include in your HTML:

```html
<script src="path/to/modal-dynamic.min.js"></script>
```

## Configuration Options

All options are set via data attributes:

| Attribute               | Required | Description                                                                 |
|-------------------------|----------|-----------------------------------------------------------------------------|
| `href="#modal-id"`      | Yes      | Target modal ID (must start with #)                                         |
| `data-template="#id"`   | Yes      | Template modal ID to clone (must start with #)                              |
| `data-url="/url"`       | Yes*     | Load content from URL                                                       |
| `data-url="#id"`        | Yes*     | Load content from #id                                                       |
| `data-title="Text"`     | No       | Sets modal title text                                                       |
| `data-header="#id"`     | No       | Load header content from DOM element                                        |
| `data-noheader="true"`  | No       | Hides modal header when true                                                |
| `data-nofooter="true"`  | No       | Hides modal footer when true                                                |
| `data-width="500"`      | No       | Sets width (accepts px, %, or unitless values)                              |
| `data-class="class"`    | No       | Adds CSS classes to modal (multiple classes space-separated)                |
| `data-keyboard="false"` | No       | Disables ESC key close (default: true)                                      |
| `data-backdrop="static"`| No       | Backdrop behavior, default none                                             |

> *Note: Either `data-url` with URL or `data-url` with DOM selector (#element) is required

> *Note: that you cannot mix the options with Bootstrap's (data-bs..) native modal

## JavaScript Events

The library dispatches custom events when content loading completes or fails:

#### `neutralFetchCompleted`
Dispatched when content is successfully loaded.

**Event Properties:**
```javascript
detail: {
  element: HTMLElement,  // The modal element
  url: String            // The URL or selector used
}
```

**Usage Example:**
```javascript
window.addEventListener('neutralFetchCompleted', (event) => {
  const { element, url } = event.detail;
  console.log('Content loaded for:', url);
});
```

#### `neutralFetchError`

Dispatched when content loading fails.

**Event Properties:**
```javascript
detail: {
  element: HTMLElement,  // The modal element
  url: String,           // The URL or selector used
}
```

**Usage Example:**
```javascript
window.addEventListener('neutralFetchError', (event) => {
  const { element, url } = event.detail;
  console.error('Failed to load:', url);
  // Add error handling logic here
  element.querySelector('.modal-body').innerHTML = `
    <div class="alert alert-danger">
      Failed to load content
    </div>
  `;
});
```

## Usage

Add the .modal-dynamic class to the link to open the button, the following link has the minimum options:

```html
<a class="modal-dynamic" href="#modal-id" data-url="/url" data-template="#template-id">Open modal</a>

<div id="template-id" class="modal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>The content of body will be dynamically substituted by data-url.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
```

### Same modal with different dynamic content

You can group a modal with the same ID, to display different content loaded dynamically in the same modal. The [demo](https://franbar1966.github.io/bootstrap-5-modal-dynamic/example/) has included in the help button “?” a link to open another modal, I think this would be an acceptable example to open a modal inside another modal.

```html
<a type="button"
   class="btn btn-primary modal-dynamic"
   href="#modal-user"
   data-title="Sign up"
   data-url="login.html"
   data-width="475"
   data-class="fade"
   data-template="#templateUser"
   data-keyboard="true"
   data-backdrop="static"
   >
    Example login
</a>

<div class="modal fade" id="templateUser" tabindex="-1" aria-labelledby="template1Label" aria-hidden="true">
  <div class="modal-dialog shadow">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="template1Label">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body mx-4 my-3">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <div class="modal-footer">
        <div class="ms-md-0">
          <a type="button"
            class="btn btn-primary modal-dynamic"
            href="#modal-user"
            data-title="Reminder"
            data-url="reminder.html"
            data-width="475"
            data-class="fade"
            data-template="#templateUser"
            data-keyboard="true"
            data-backdrop="static">
              Reminder
          </a>
        </div>
        <div class="ms-md-auto">
          <a type="button"
            class="btn btn-primary modal-dynamic"
            href="#modal-user"
            data-title="Sign in"
            data-url="login.html"
            data-width="475"
            data-class="fade"
            data-template="#templateUser"
            data-keyboard="true"
            data-backdrop="static">
              Login
          </a>
          <a type="button"
              class="btn btn-primary modal-dynamic"
              href="#modal-user"
              data-title="Sign up"
              data-url="register.html"
              data-width="475"
              data-class="fade"
              data-template="#templateUser"
              data-keyboard="true"
              data-backdrop="static">
                Register
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
```

### Modal over modal

You can open a modal inside another modal. The container can be of any kind, but the one that is opened must be: modal-dynamic

```html
<!-- First modal -->
<button
  type="button"
  class="btn btn-primary"
  data-bs-toggle="modal"
  data-bs-target="#exampleModal2"
>
  Modal over modal
</button>

<!-- Within the first modal -->
<a type="button"
  class="btn btn-primary modal-dynamic"
  href="#modal-over-over"
  data-title="Modal over modal"
  data-url="#modal-content-over"
  data-width="400"
  data-class="fade"
  data-template="#template1"
  data-keyboard="true"
  data-backdrop="">
    Open modal
</a>
```

### See: [DEMO](https://franbar1966.github.io/bootstrap-5-modal-dynamic/example/)

## License

The MIT License (MIT)
