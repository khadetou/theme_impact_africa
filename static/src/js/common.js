// @odoo-module ignore

(function () {
    function getHeaderNodes() {
        return {
            drawer: document.getElementById("drawer"),
            overlay: document.getElementById("drawerOverlay"),
            button: document.getElementById("hbgBtn"),
        };
    }

    function closeDrawer() {
        const { drawer, overlay, button } = getHeaderNodes();
        if (!drawer || !overlay || !button) {
            return;
        }
        drawer.classList.remove("open");
        overlay.classList.remove("open");
        button.classList.remove("open");
        document.body.style.overflow = "";
    }

    function toggleDrawer() {
        const { drawer, overlay, button } = getHeaderNodes();
        if (!drawer || !overlay || !button) {
            return;
        }
        const isOpen = drawer.classList.contains("open");
        if (isOpen) {
            closeDrawer();
            return;
        }
        drawer.classList.add("open");
        overlay.classList.add("open");
        button.classList.add("open");
        document.body.style.overflow = "hidden";
    }

    window.closeDrawer = closeDrawer;
    window.toggleDrawer = toggleDrawer;

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeDrawer();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth >= 860) {
            closeDrawer();
        }
    });

    function fitInvoiceIframe() {
        const iframe = document.getElementById("invoice_html");
        const wrapper = iframe && iframe.closest(".o_portal_html_view");
        if (!iframe || !wrapper) {
            return;
        }

        const isMobile = window.innerWidth <= 640;
        if (!isMobile) {
            wrapper.style.height = "";
            iframe.style.width = "";
            iframe.style.height = "";
            iframe.style.transform = "";
            iframe.style.transformOrigin = "";
            return;
        }

        let doc;
        try {
            doc = iframe.contentDocument || iframe.contentWindow.document;
        } catch {
            return;
        }
        if (!doc || !doc.documentElement || !doc.body) {
            return;
        }

        const page = doc.querySelector(".page");
        const footer = doc.querySelector(".footer");
        if (page) {
            page.style.minHeight = "0";
            page.style.height = "auto";
            page.style.marginBottom = "0";
            page.style.paddingBottom = "0";
        }
        if (footer) {
            footer.style.position = "relative";
            footer.style.bottom = "auto";
            footer.style.left = "auto";
            footer.style.right = "auto";
            footer.style.inset = "auto";
            footer.style.marginTop = "14px";
            footer.style.paddingBottom = "0";
        }
        doc.body.style.marginBottom = "0";
        doc.body.style.paddingBottom = "0";

        const contentWidth = Math.max(
            doc.documentElement.scrollWidth,
            doc.body.scrollWidth,
            doc.documentElement.offsetWidth,
            doc.body.offsetWidth,
            720
        );
        const contentHeight = Math.max(
            doc.documentElement.scrollHeight,
            doc.body.scrollHeight,
            doc.documentElement.offsetHeight,
            doc.body.offsetHeight
        );
        const availableWidth = wrapper.clientWidth;
        if (!availableWidth || !contentHeight) {
            return;
        }

        const scale = Math.min(availableWidth / contentWidth, 1);
        iframe.style.width = `${100 / scale}%`;
        iframe.style.height = `${contentHeight}px`;
        iframe.style.transform = `scale(${scale})`;
        iframe.style.transformOrigin = "top left";
        wrapper.style.height = `${Math.ceil(contentHeight * scale) + 12}px`;
    }

    function scheduleInvoiceFit() {
        window.requestAnimationFrame(() => {
            window.requestAnimationFrame(fitInvoiceIframe);
        });
    }

    const invoiceIframe = document.getElementById("invoice_html");
    if (invoiceIframe) {
        invoiceIframe.addEventListener("load", scheduleInvoiceFit);
        window.addEventListener("resize", scheduleInvoiceFit, { passive: true });
        scheduleInvoiceFit();
    }
})();
