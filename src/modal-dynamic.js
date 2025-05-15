/*! See: https://github.com/FranBar1966/bootstrap-5-modal-dynamic */

/*
 * Bootstrap 5 .modal-dynamic
 * https://github.com/FranBar1966/bootstrap-5-modal-dynamic
 */

(function() {
    'use strict';

    function startDynamicModal() {
        document.body.removeEventListener('click', dynamicModalHandler);
        document.body.addEventListener('click', dynamicModalHandler);
    }

    function dynamicModalHandler(ev) {
        const target = ev.target.closest('.modal-dynamic');
        if (!target) return;

        if (ev.target.closest('a')) ev.preventDefault();

        const dModalId = ev.target.getAttribute('href');
        const dModalTplId = ev.target.dataset.template || '#modalTemplate';

        let modalElement = document.querySelector(dModalId);
        if (!modalElement) {
            const template = document.querySelector(dModalTplId);
            if (template) {
                modalElement = template.cloneNode(true);
                modalElement.id = dModalId.substring(1);
                document.body.appendChild(modalElement);
            }
        }

        if (!modalElement) return;

        const dModalClass    = ev.target.dataset.class;
        const dModalTitle    = ev.target.dataset.title;
        const dModalHeader   = ev.target.dataset.header;
        const dModalNoHead   = ev.target.dataset.noheader;
        const dModalUrl      = ev.target.dataset.url;
        const dModalFooter   = ev.target.dataset.footer;
        const dModalNoFooter = ev.target.dataset.nofooter;
        const dModalWidth    = ev.target.dataset.width || '';
        const dModalBackdrop = ev.target.dataset.backdrop || 'false';
        const dModalKeyboard = !ev.target.dataset.keyboard || ev.target.dataset.keyboard === 'true';

        if (dModalClass) modalElement.classList.add(...dModalClass.split(' '));

        if (dModalHeader) {
            const header = modalElement.querySelector('.modal-header');
            const source = document.querySelector(dModalHeader);
            if (header && source) header.innerHTML = source.innerHTML;
        }

        if (dModalNoHead) {
            const header = modalElement.querySelector('.modal-header');
            if (header) header.classList.add('hidden', 'd-none');
        }

        if (dModalTitle) {
            const title = modalElement.querySelector('.modal-title');
            if (title) title.innerHTML = dModalTitle;
        }

        if (dModalFooter) {
            const footer = modalElement.querySelector('.modal-footer');
            const source = document.querySelector(dModalFooter);
            if (footer && source) footer.innerHTML = source.innerHTML;
        }

        if (dModalNoFooter) {
            const footer = modalElement.querySelector('.modal-footer');
            if (footer) footer.classList.add('hidden', 'd-none');
        }

        if (dModalWidth) {
            const dialog = modalElement.querySelector('.modal-dialog');
            if (dialog) {
                const width = !isNaN(dModalWidth) && dModalWidth !== '' ? dModalWidth + 'px' : dModalWidth;
                dialog.style.maxWidth = width;
                dialog.style.width = 'auto';
            }
        }

        let currentModal = bootstrap.Modal.getInstance(modalElement);
        if (!currentModal) {
            currentModal = new bootstrap.Modal(modalElement, {
                keyboard: dModalKeyboard,
                backdrop: dModalBackdrop
            });
        }

        modalElement.addEventListener('hidden.bs.modal', ev => {
            /*
            * Prevent modal showing under others modals.
            */
            modalElement.remove();
        })

        modalElement.addEventListener('shown.bs.modal', ev => {
            /*
            * Prevent the under modal from remaining in focus
            */
            modalElement.focus();
        })

        currentModal.show();
        const modalBodyElement = modalElement.querySelector('.modal-body');

        if (dModalUrl.startsWith('#')) {
            const contentElement = document.querySelector(dModalUrl);
            modalBodyElement.innerHTML = contentElement ? contentElement.innerHTML : 'ERROR: Content not found';
        } else {
            fetch(dModalUrl, {
                method: 'GET',
                headers: {
                    'X-Requested-From-Modal': dModalId.substring(1),
                    'Requested-With-Ajax': 'ajax'
                }
            })
            .then(response => response.text())
            .then(html => {
                modalBodyElement.innerHTML = html;
                window.dispatchEvent(new CustomEvent('neutralFetchCompleted', {
                    detail: {
                        element: modalElement,
                        url: dModalUrl
                    }
                }));
            })
            .catch(error => {
                modalBodyElement.innerHTML = error.message;
                window.dispatchEvent(new CustomEvent('neutralFetchError', {
                    detail: {
                        element: modalElement,
                        url: dModalUrl
                    }
                }));
            });
        }
    }

    startDynamicModal();

    window.addEventListener('neutralFetchCompleted', () => {
        startDynamicModal();
    });
})();
