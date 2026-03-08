# -*- coding: utf-8 -*-
{
    "name": "Theme Impact Africa",
    "version": "19.0.1.0.0",
    "category": "Theme/Corporate",
    "summary": "Impact Africa corporate website theme for aluminium and glass expertise",
    "description": "Impact Africa is a custom Odoo website theme built from the brand's static HTML template. "
                   "It includes a dark split-screen hero, responsive drawer navigation, custom cursor, "
                   "animated counters, dedicated service and partner pages, a custom blog experience, and a professional contact flow.",
    "author": "Impact Africa",
    "company": "Impact Africa",
    "maintainer": "Impact Africa",
    "website": "https://impact-africa.sn",
    "depends": [
        "website",
        "website_crm",
        "website_blog",
        "account"
    ],
    "data": [
        "data/ir_asset.xml",
        "views/layout_templates.xml",
        "views/header_templates.xml",
        "views/footer_templates.xml",
        "views/login_templates.xml",
        "views/portal.xml",
        "views/snippets.xml",
        "views/blog_cleanup.xml",
        "views/blog_native_templates.xml",
        "views/impact_africa_homepage.xml",
        "views/about_page.xml",
        "views/services_page.xml",
        "views/partenaires_page.xml",
        "views/contact_page.xml",
        "views/connexion_page.xml",
        "views/menues.xml",
    ],
    "assets": {
        "web.assets_frontend": [
            "theme_impact_africa/static/src/scss/common.scss",
            "theme_impact_africa/static/src/scss/snippets.scss",
            "theme_impact_africa/static/src/scss/portal.scss",
            "theme_impact_africa/static/src/js/common.js",
            "theme_impact_africa/static/src/js/snippets.js",
        ],
        "web._assets_primary_variables": [
            "theme_impact_africa/static/src/scss/primary_variables.scss",
        ],
        "theme_impact_africa.assets_index": [
            "theme_impact_africa/static/src/css/index.css",
            "theme_impact_africa/static/src/js/index.js",
        ],
        "theme_impact_africa.assets_about": [
            "theme_impact_africa/static/src/css/about.css",
            "theme_impact_africa/static/src/js/about.js",
        ],
        "theme_impact_africa.assets_services": [
            "theme_impact_africa/static/src/css/services.css",
            "theme_impact_africa/static/src/js/services.js",
        ],
        "theme_impact_africa.assets_partenaires": [
            "theme_impact_africa/static/src/css/partenaires.css",
            "theme_impact_africa/static/src/js/partenaires.js",
        ],
        "theme_impact_africa.assets_contact": [
            "theme_impact_africa/static/src/css/contact.css",
            "theme_impact_africa/static/src/js/contact.js",
        ],
        "theme_impact_africa.assets_blog": [
            "theme_impact_africa/static/src/css/blog.css",
            "theme_impact_africa/static/src/js/blog.js",
        ],
        "theme_impact_africa.assets_blog_article": [
            "theme_impact_africa/static/src/css/blog-article.css",
            "theme_impact_africa/static/src/js/blog-article.js",
        ],
        "theme_impact_africa.assets_connexion": [
            "theme_impact_africa/static/src/css/connexion.css",
            "theme_impact_africa/static/src/js/connexion.js",
        ],
    },
    "images": [
        "static/src/img/logo.png",
    ],
    "license": "LGPL-3",
    "installable": True,
    "auto_install": False,
    "application": False,
}
