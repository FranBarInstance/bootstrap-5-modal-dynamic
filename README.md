Bootstrap 5 modal dynamic content
=================================
### Modals with dynamically loaded content an modals over modals

Highly recommended for use with: [modal close on back buttom](https://github.com/FranBar1966/bootstrap-5-modal-close-on-back)

## Installation

Add the script to your page, you can download it from [here](https://github.com/FranBar1966/bootstrap-5-modal-dynamic)

```html
<script src="modal-dynamic.min.js"></script>
```

Or from CDN:

```html
<script src="https://cdn.jsdelivr.net/gh/FranBar1966/bootstrap-5-modal-dynamic@master/src/modal-dynamic.min.js"></script>
```

### See: [DEMO](https://franbar1966.github.io/bootstrap-5-modal-dynamic/example/)


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

Note that you cannot mix the options with Bootstrap's native modal.

### Options

```code
href="#modal-id"         set #modal-id to modal (REQUIRED)
data-template="#id"      ID of the modal  (REQUIRED)
data-url="#id"           modal content by html from #id (REQUIRED #id or /url)
data-url="/url"          modal content by ajax /url (REQUIRED #id or /url)
data-title="Title"       modal title
data-header="#di"        header html content
data-noheader="true"     remove modal header if true
data-nofooter="true"     remove modal footer if true
data-width="100"         modal size width in px
data-width="100px"       modal size width in px
data-width="100%"        modal size width in %
data-class="fade"        add class to modal
data-keyboard="false"    default true
data-backdrop="static"   default none
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
