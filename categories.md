---
layout: base
title: Categories
permalink: /categories/
---
<ul>
  {% assign all_categories = site.categories | sort %}
  {% for category in all_categories %}
    <li>{{ category[0] }}</li>
  {% endfor %}
</ul>